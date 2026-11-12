use alloc::{
    collections::{BTreeMap, BTreeSet},
    vec::Vec,
};

use rglsl_ast::ast::{Expression, ExpressionKind, FunctionDefinition, Node, NodeId};
use rglsl_sema::scope::{Origin, SymbolKind};
use rglsl_sema::types::{BlockId, OpaqueKind, TypeKind};
use rglsl_sema::{Callee, FunctionId, SymbolId};

use super::{semantic, Lowerer, Result};

pub(super) fn strip(expression: &Expression) -> &Expression {
    let mut current = expression;
    while let ExpressionKind::Parenthesized(ref inner) = current.kind {
        current = inner;
    }
    current
}

fn subscript_chain<'e>(
    chains: &mut BTreeMap<NodeId, (usize, &'e Expression)>,
    start: &'e Expression,
) -> (usize, &'e Expression) {
    let mut path = Vec::new();
    let mut current = start;
    let (mut depth, root) = loop {
        if let Some(&known) = chains.get(&current.id) {
            break known;
        }
        match current.kind {
            ExpressionKind::Subscript {
                base: ref outer, ..
            } => {
                path.push(current.id);
                current = strip(outer);
            }
            _ => break (0, current),
        }
    };
    while let Some(id) = path.pop() {
        depth += 1;
        chains.insert(id, (depth, root));
    }
    (depth, root)
}

pub(super) const CLIP_DISTANCES: [&str; 2] = ["gl_ClipDistance", "gl_CullDistance"];

pub(super) const IMPLICITLY_SIZED: [&str; 8] = [
    "gl_ClipDistance",
    "gl_CullDistance",
    "gl_ViewportMask",
    "gl_SecondaryViewportMaskNV",
    "gl_PositionPerViewNV",
    "gl_ViewportMaskPerViewNV",
    "gl_SampleMask",
    "gl_SampleMaskIn",
];

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

    fn block_member_of(&self, expression: &Expression) -> Option<(BlockId, u32)> {
        let expression = strip(expression);
        let block_of = |ty: &rglsl_sema::types::Type| match ty.kind {
            TypeKind::Block(id) if !ty.is_array() => Some(id),
            _ => None,
        };
        match expression.kind {
            ExpressionKind::Variable(_) => {
                let symbol = self.analysis.references.get(&expression.id)?;
                let SymbolKind::BlockMember { instance, index } = self.symbol(*symbol)?.kind else {
                    return None;
                };
                let variable = self.variable(instance)?;
                let id = match variable.ty.kind {
                    TypeKind::Block(id) => id,
                    _ => return None,
                };
                Some((id, index))
            }
            ExpressionKind::FieldSelection {
                ref base,
                ref field,
            } => {
                let id = block_of(self.analysis.type_of(base.id)?)?;
                let (index, _) = self.analysis.types.block(id)?.member(&field.node)?;
                Some((id, u32::try_from(index).ok()?))
            }
            _ => None,
        }
    }

    pub(super) fn prepass(&mut self, _definitions: &[&'a Node<FunctionDefinition>]) {
        let analysis = self.analysis;
        let mut edges: Vec<(SymbolId, SymbolId)> = Vec::new();
        let mut plain: BTreeSet<SymbolId> = BTreeSet::new();
        let mut chains = BTreeMap::new();
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
                        let start = expression.span.start;
                        self.per_vertex_first_use = Some(
                            self.per_vertex_first_use
                                .map_or(start, |first| first.min(start)),
                        );
                    }
                }
                ExpressionKind::FunctionCall(ref call) => {
                    match analysis.calls.get(&expression.id) {
                        Some(&Callee::Constructor(ref ty)) => {
                            let Some(opaque) = ty.as_opaque() else {
                                continue;
                            };
                            if opaque.kind != OpaqueKind::CombinedSampler {
                                continue;
                            }
                            let texture =
                                call.arguments.first().and_then(|a| self.variable_symbol(a));
                            if !opaque.shadow {
                                plain.extend(texture);
                                continue;
                            }
                            if let Some(texture) = texture {
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
                    let symbol = self.variable_symbol(base);
                    let variable_index = analysis
                        .expression(index.id)
                        .is_some_and(|info| !info.is_constant || info.is_specialization);
                    if let (true, Some(symbol)) = (variable_index, symbol) {
                        self.variably_indexed.insert(symbol);
                    }
                    let value = analysis
                        .expression(index.id)
                        .and_then(|info| info.value.as_ref())
                        .and_then(rglsl_sema::constant::Constant::scalar_i64)
                        .and_then(|value| u32::try_from(value).ok())
                        .and_then(|value| value.checked_add(1));
                    let Some(size) = value else {
                        continue;
                    };
                    if let Some(member) = self.block_member_of(base) {
                        let entry = self.member_sizes.entry(member).or_insert(0);
                        *entry = (*entry).max(size);
                    }
                    let (depth, inner) = subscript_chain(&mut chains, strip(base));
                    if depth > 0 {
                        if let Some((block, member)) = self.block_member_of(inner) {
                            let entry = self
                                .member_dimension_sizes
                                .entry((block, member, depth))
                                .or_insert(0);
                            *entry = (*entry).max(size);
                        }
                    }
                    let Some(symbol) = symbol else {
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
                    if IMPLICITLY_SIZED.contains(&name.as_str()) {
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
                for set in [&mut self.depth, &mut self.comparison, &mut plain] {
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
        self.depth.retain(|texture| !plain.contains(texture));
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
        if let (Some(main), false) = (main, self.object) {
            let mut reachable = BTreeSet::from([main]);
            let mut pending = Vec::from([main]);
            while let Some(caller) = pending.pop() {
                for &callee in calls.get(&caller).into_iter().flatten() {
                    if reachable.insert(callee) {
                        pending.push(callee);
                    }
                }
            }
            order.retain(|&(id, _)| reachable.contains(&id));
        }
        Ok(order)
    }
}
