use alloc::{
    collections::{BTreeMap, BTreeSet},
    vec::Vec,
};

use rglsl_ast::ast::{Expression, ExpressionKind, FunctionDefinition, Node};
use rglsl_sema::scope::{Origin, SymbolKind};
use rglsl_sema::types::OpaqueKind;
use rglsl_sema::{Callee, FunctionId, SymbolId};

use super::{semantic, Lowerer, Result};

pub(super) fn strip(expression: &Expression) -> &Expression {
    let mut current = expression;
    while let ExpressionKind::Parenthesized(ref inner) = current.kind {
        current = inner;
    }
    current
}

pub(super) const CLIP_DISTANCES: [&str; 2] = ["gl_ClipDistance", "gl_CullDistance"];

impl<'a> Lowerer<'a> {
    pub(super) fn variable_symbol(&self, expression: &Expression) -> Option<SymbolId> {
        let expression = strip(expression);
        match expression.kind {
            ExpressionKind::Variable(_) => self.analysis.references.get(&expression.id).copied(),
            _ => None,
        }
    }

    pub(super) fn is_builtin_symbol(&self, id: SymbolId) -> bool {
        match self.symbol(id).map(|symbol| &symbol.kind) {
            Some(&SymbolKind::Variable(ref variable)) => variable.origin == Origin::BuiltIn,
            Some(&SymbolKind::BlockMember { instance, .. }) => self
                .variable(instance)
                .is_some_and(|variable| variable.origin == Origin::BuiltIn),
            _ => false,
        }
    }

    pub(super) fn prepass(&mut self, _definitions: &[&'a Node<FunctionDefinition>]) {
        let analysis = self.analysis;
        let mut edges: Vec<(SymbolId, SymbolId)> = Vec::new();
        for expression in rglsl_ast::expressions(self.unit) {
            match expression.kind {
                ExpressionKind::Variable(_) => {
                    let Some(&symbol) = analysis.references.get(&expression.id) else {
                        continue;
                    };
                    if self.is_per_vertex_member(symbol) {
                        if let Some(symbol) = self.symbol(symbol) {
                            self.per_vertex_used.insert(symbol.name.clone());
                        }
                    }
                }
                ExpressionKind::FunctionCall(ref call) => {
                    match analysis.calls.get(&expression.id) {
                        Some(&Callee::Constructor(ref ty)) => {
                            let Some(opaque) = ty.as_opaque() else {
                                continue;
                            };
                            if opaque.kind != OpaqueKind::CombinedSampler || !opaque.shadow {
                                continue;
                            }
                            if let Some(texture) =
                                call.arguments.first().and_then(|a| self.variable_symbol(a))
                            {
                                self.depth.insert(texture);
                            }
                            if let Some(sampler) =
                                call.arguments.get(1).and_then(|a| self.variable_symbol(a))
                            {
                                self.comparison.insert(sampler);
                            }
                        }
                        Some(&Callee::Function(id)) => {
                            let Some(parameters) = self.parameters.get(&id) else {
                                continue;
                            };
                            for (argument, parameter) in call.arguments.iter().zip(parameters) {
                                if let (Some(argument), &Some(parameter)) =
                                    (self.variable_symbol(argument), parameter)
                                {
                                    edges.push((argument, parameter));
                                }
                            }
                        }
                        _ => {}
                    }
                }
                ExpressionKind::Subscript {
                    ref base,
                    ref index,
                } => {
                    let Some(symbol) = self.variable_symbol(base) else {
                        continue;
                    };
                    let value = analysis
                        .expression(index.id)
                        .and_then(|info| info.value.as_ref())
                        .and_then(rglsl_sema::constant::Constant::scalar_i64)
                        .and_then(|value| u32::try_from(value).ok())
                        .and_then(|value| value.checked_add(1));
                    let Some(size) = value else {
                        continue;
                    };
                    let entry = self.implicit_sizes.entry(symbol).or_insert(0);
                    *entry = (*entry).max(size);
                    if !self.is_builtin_symbol(symbol) {
                        continue;
                    }
                    let Some(name) = self.symbol(symbol).map(|symbol| symbol.name.clone()) else {
                        continue;
                    };
                    if CLIP_DISTANCES.contains(&name.as_str()) {
                        let entry = self.builtin_sizes.entry(name).or_insert(0);
                        *entry = (*entry).max(size);
                    }
                }
                _ => {}
            }
        }
        loop {
            let mut changed = false;
            for &(argument, parameter) in &edges {
                for set in [&mut self.depth, &mut self.comparison] {
                    if set.contains(&argument) != set.contains(&parameter) {
                        set.insert(argument);
                        set.insert(parameter);
                        changed = true;
                    }
                }
            }
            if !changed {
                break;
            }
        }
    }

    pub(super) fn function_order(
        &self,
        definitions: &[&'a Node<FunctionDefinition>],
    ) -> Result<Vec<(FunctionId, &'a Node<FunctionDefinition>)>> {
        let analysis = self.analysis;
        let main = self.main_function();
        let mut defined: BTreeMap<FunctionId, &'a Node<FunctionDefinition>> = BTreeMap::new();
        let mut spans: Vec<(u32, u32, FunctionId)> = Vec::new();
        for definition in definitions {
            let Some(&id) = analysis.function_declarations.get(&definition.id) else {
                continue;
            };
            defined.insert(id, definition);
            spans.push((definition.span.start, definition.span.end, id));
        }
        let mut calls: BTreeMap<FunctionId, BTreeSet<FunctionId>> = BTreeMap::new();
        for expression in rglsl_ast::expressions(self.unit) {
            let Some(&Callee::Function(callee)) = analysis.calls.get(&expression.id) else {
                continue;
            };
            if Some(callee) == main {
                return Err(semantic(
                    "`main` cannot be called",
                    self.at(expression.span),
                ));
            }
            let caller = spans
                .iter()
                .find(|&&(start, end, _)| {
                    start <= expression.span.start && expression.span.end <= end
                })
                .map(|&(_, _, id)| id);
            if let Some(caller) = caller {
                calls.entry(caller).or_default().insert(callee);
            }
        }
        let mut state: BTreeMap<FunctionId, bool> = BTreeMap::new();
        let mut order = Vec::new();
        for definition in definitions {
            let Some(&root) = analysis.function_declarations.get(&definition.id) else {
                continue;
            };
            if state.contains_key(&root) {
                continue;
            }
            let mut stack: Vec<(FunctionId, Vec<FunctionId>)> = Vec::new();
            state.insert(root, false);
            stack.push((
                root,
                calls.get(&root).into_iter().flatten().copied().collect(),
            ));
            while let Some(&mut (current, ref mut pending)) = stack.last_mut() {
                match pending.pop() {
                    Some(next) => match state.get(&next).copied() {
                        Some(false) => {
                            return Err(semantic(
                                "recursive function calls are not allowed",
                                self.at(definition.span),
                            ));
                        }
                        Some(true) => {}
                        None => {
                            if defined.contains_key(&next) {
                                state.insert(next, false);
                                let callees =
                                    calls.get(&next).into_iter().flatten().copied().collect();
                                stack.push((next, callees));
                            }
                        }
                    },
                    None => {
                        state.insert(current, true);
                        stack.pop();
                        if Some(current) != main {
                            if let Some(definition) = defined.get(&current) {
                                order.push((current, *definition));
                            }
                        }
                    }
                }
            }
        }
        Ok(order)
    }
}
