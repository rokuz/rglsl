use alloc::collections::{BTreeMap, BTreeSet};
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{
    AssignmentOperator, BinaryOperator, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FunctionIdentifier, Initializer, JumpStatement, NodeId,
    Statement, StatementKind, UnaryOperator,
};
use rglsl_ast::{Spine, TranslationUnit};

use super::{Analysis, Callee};
use crate::scope::{SymbolId, SymbolKind};
use crate::types::{Scalar, TypeKind};

const DELIMITER: char = '/';

const ARITHMETIC_BUILTINS: [&str; 6] = [
    "dot",
    "mod",
    "dotEXT",
    "dotPacked4x8EXT",
    "dotAccSatEXT",
    "dotPacked4x8AccSatEXT",
];

#[derive(Clone, Copy)]
enum Definition<'a> {
    Assignment {
        node: &'a Expression,
        operator: AssignmentOperator,
        target: &'a Expression,
        value: &'a Expression,
    },
    Step {
        node: &'a Expression,
        operand: &'a Expression,
    },
    Initializer {
        symbol: SymbolId,
        value: &'a Initializer,
    },
}

pub(crate) fn no_contraction(unit: &TranslationUnit, analysis: &Analysis) -> BTreeSet<NodeId> {
    let mut pass = Precise {
        analysis,
        chains: BTreeMap::new(),
        definitions: BTreeMap::new(),
        objects: BTreeSet::new(),
        added: BTreeSet::new(),
        marked: BTreeSet::new(),
        returns: Vec::new(),
        result: BTreeSet::new(),
        precise_return: false,
        remained: String::new(),
    };
    if !pass.any_precise() {
        return BTreeSet::new();
    }
    for declaration in &unit.external_declarations {
        match declaration {
            ExternalDeclaration::FunctionDefinition(definition) => {
                pass.precise_return = analysis
                    .function_declarations
                    .get(&definition.id)
                    .and_then(|id| analysis.function(*id))
                    .is_some_and(|function| function.return_qualifiers.precise);
                for statement in &definition.body.statements {
                    pass.collect_statement(statement);
                }
                pass.precise_return = false;
            }
            ExternalDeclaration::Declaration(declaration) => pass.collect_declaration(declaration),
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
    pass.propagate_all();
    pass.result
}

struct Precise<'a> {
    analysis: &'a Analysis,
    chains: BTreeMap<NodeId, String>,
    definitions: BTreeMap<String, Vec<Definition<'a>>>,
    objects: BTreeSet<String>,
    added: BTreeSet<String>,
    marked: BTreeSet<NodeId>,
    returns: Vec<&'a Expression>,
    result: BTreeSet<NodeId>,
    precise_return: bool,
    remained: String,
}

fn front(chain: &str) -> &str {
    chain
        .split_once(DELIMITER)
        .map_or(chain, |(first, _)| first)
}

fn after_front(chain: &str) -> &str {
    chain.split_once(DELIMITER).map_or("", |(_, rest)| rest)
}

const fn arithmetic_assignment(operator: AssignmentOperator) -> bool {
    matches!(
        operator,
        AssignmentOperator::Add
            | AssignmentOperator::Subtract
            | AssignmentOperator::Multiply
            | AssignmentOperator::Divide
            | AssignmentOperator::Modulo
    )
}

const fn arithmetic_binary(operator: BinaryOperator) -> bool {
    matches!(
        operator,
        BinaryOperator::Add
            | BinaryOperator::Subtract
            | BinaryOperator::Multiply
            | BinaryOperator::Divide
            | BinaryOperator::Modulo
    )
}

impl<'a> Precise<'a> {
    fn any_precise(&self) -> bool {
        self.analysis.symbols.iter().any(|symbol| {
            symbol
                .variable()
                .is_some_and(|variable| variable.qualifiers.precise)
        }) || self
            .analysis
            .functions
            .iter()
            .any(|function| function.return_qualifiers.precise)
            || self.analysis.types.blocks().iter().any(|block| {
                block.qualifiers.precise
                    || block.members.iter().any(|member| member.qualifiers.precise)
            })
            || self.analysis.types.structs().iter().any(|structure| {
                structure
                    .members
                    .iter()
                    .any(|member| member.qualifiers.precise)
            })
    }

    fn label(&self, symbol: SymbolId) -> String {
        let name = self
            .analysis
            .symbol(symbol)
            .map_or("", |symbol| symbol.name.as_str());
        format!("{}({name})", symbol.index())
    }

    fn symbol_precise(&self, symbol: SymbolId) -> bool {
        let Some(found) = self.analysis.symbol(symbol) else {
            return false;
        };
        match found.kind {
            SymbolKind::Variable(ref variable) => {
                variable.qualifiers.precise || self.type_precise(&variable.ty)
            }
            SymbolKind::BlockMember { instance, index } => {
                self.symbol_precise(instance) || self.block_member_precise(instance, index)
            }
            _ => false,
        }
    }

    fn type_precise(&self, ty: &crate::types::Type) -> bool {
        match ty.kind {
            TypeKind::Block(id) => self
                .analysis
                .types
                .block(id)
                .is_some_and(|block| block.qualifiers.precise),
            _ => false,
        }
    }

    fn block_member_precise(&self, instance: SymbolId, index: u32) -> bool {
        let Some(variable) = self
            .analysis
            .symbol(instance)
            .and_then(|symbol| symbol.variable())
        else {
            return false;
        };
        let TypeKind::Block(id) = variable.ty.kind else {
            return false;
        };
        self.analysis
            .types
            .block(id)
            .and_then(|block| block.members.get(usize::try_from(index).ok()?))
            .is_some_and(|member| member.qualifiers.precise)
    }

    fn member(&self, base: &Expression, field: &str) -> Option<(u32, bool)> {
        let ty = &self.analysis.type_of(base.id)?;
        if ty.is_array() {
            return None;
        }
        let members = match ty.kind {
            TypeKind::Struct(id) => &self.analysis.types.structure(id)?.members,
            TypeKind::Block(id) | TypeKind::Reference(id) => {
                &self.analysis.types.block(id)?.members
            }
            _ => return None,
        };
        let index = members.iter().position(|member| member.name == field)?;
        let precise = members.get(index)?.qualifiers.precise;
        Some((u32::try_from(index).ok()?, precise))
    }

    fn is_precise(&self, expression: &Expression) -> bool {
        let mut current = expression;
        loop {
            if self.marked.contains(&current.id) {
                return true;
            }
            match current.kind {
                ExpressionKind::Parenthesized(ref inner)
                | ExpressionKind::Subscript {
                    base: ref inner, ..
                } => {
                    current = inner;
                }
                ExpressionKind::Variable(_) => {
                    return self
                        .analysis
                        .references
                        .get(&current.id)
                        .is_some_and(|symbol| self.symbol_precise(*symbol));
                }
                ExpressionKind::FieldSelection {
                    ref base,
                    ref field,
                } => {
                    if self
                        .member(base, &field.node)
                        .is_some_and(|(_, precise)| precise)
                    {
                        return true;
                    }
                    current = base;
                }
                _ => return false,
            }
        }
    }

    fn variable_chain(&self, expression: &Expression) -> Option<String> {
        let symbol = *self.analysis.references.get(&expression.id)?;
        match self.analysis.symbol(symbol)?.kind {
            SymbolKind::BlockMember { instance, index } => {
                Some(format!("{}{DELIMITER}{index}", self.label(instance)))
            }
            _ => Some(self.label(symbol)),
        }
    }

    fn collect_declaration(&mut self, declaration: &'a Declaration) {
        let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind else {
            return;
        };
        for declarator in &list.declarators {
            let Some(ref initializer) = declarator.initializer else {
                continue;
            };
            let symbol = self.analysis.declarations.get(&declarator.id).copied();
            self.initialized(symbol, initializer);
        }
    }

    fn initialized(&mut self, symbol: Option<SymbolId>, initializer: &'a Initializer) {
        let folded = symbol
            .and_then(|symbol| self.analysis.symbol(symbol))
            .and_then(|symbol| symbol.variable())
            .is_some_and(|variable| variable.value.is_some());
        if let (Some(symbol), false) = (symbol, folded) {
            let label = self.label(symbol);
            if self.symbol_precise(symbol) {
                self.objects.insert(label.clone());
            }
            self.definitions
                .entry(label)
                .or_default()
                .push(Definition::Initializer {
                    symbol,
                    value: initializer,
                });
        }
        self.collect_initializer(initializer);
    }

    fn collect_initializer(&mut self, initializer: &'a Initializer) {
        match initializer {
            Initializer::Expression(expression) => {
                self.collect(expression);
            }
            Initializer::List(items) => {
                for item in items {
                    self.collect_initializer(item);
                }
            }
        }
    }

    fn collect_statement(&mut self, statement: &'a Statement) {
        match statement.kind {
            StatementKind::Compound(ref compound) => {
                for inner in &compound.statements {
                    self.collect_statement(inner);
                }
            }
            StatementKind::Declaration(ref declaration) => self.collect_declaration(declaration),
            StatementKind::Expression(ref expression) => {
                if let Some(expression) = expression {
                    self.collect(expression);
                }
            }
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => {
                self.collect(condition);
                self.collect_statement(then_branch);
                if let Some(else_branch) = else_branch {
                    self.collect_statement(else_branch);
                }
            }
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => {
                self.collect(selector);
                for inner in statements {
                    self.collect_statement(inner);
                }
            }
            StatementKind::CaseLabel(_) => {}
            StatementKind::While {
                ref condition,
                ref body,
            } => {
                self.collect_condition(condition);
                self.collect_statement(body);
            }
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => {
                self.collect_statement(body);
                self.collect(condition);
            }
            StatementKind::For(ref looping) => {
                self.collect_statement(&looping.init);
                if let Some(ref condition) = looping.condition {
                    self.collect_condition(condition);
                }
                if let Some(ref increment) = looping.increment {
                    self.collect(increment);
                }
                self.collect_statement(&looping.body);
            }
            StatementKind::Jump(JumpStatement::Return(Some(ref value))) => {
                if self.precise_return {
                    self.returns.push(value);
                    self.collect(value);
                }
            }
            StatementKind::Jump(_) => {}
            StatementKind::Attributed { ref statement, .. } => self.collect_statement(statement),
        }
    }

    fn collect_condition(&mut self, condition: &'a Condition) {
        match condition {
            Condition::Expression(expression) => {
                self.collect(expression);
            }
            Condition::Declaration(declaration) => {
                let symbol = self.analysis.declarations.get(&declaration.id).copied();
                self.initialized(symbol, &declaration.initializer);
            }
        }
    }

    fn define(&mut self, target: &'a Expression, definition: Definition<'a>) {
        let chain = self.collect(target);
        self.define_collected(target, chain, definition);
    }

    fn define_collected(
        &mut self,
        target: &'a Expression,
        chain: Option<String>,
        definition: Definition<'a>,
    ) {
        let chain = chain.unwrap_or_default();
        if self.is_precise(target) {
            self.objects.insert(chain.clone());
        }
        self.definitions
            .entry(String::from(front(&chain)))
            .or_default()
            .push(definition);
    }

    fn collect(&mut self, expression: &'a Expression) -> Option<String> {
        match expression.kind {
            ExpressionKind::Variable(_) => {
                let chain = self.variable_chain(expression)?;
                self.chains.insert(expression.id, chain.clone());
                Some(chain)
            }
            ExpressionKind::Parenthesized(ref inner) => {
                let chain = self.collect(inner);
                if let Some(ref chain) = chain {
                    self.chains.insert(expression.id, chain.clone());
                }
                chain
            }
            ExpressionKind::Subscript { .. }
            | ExpressionKind::FieldSelection { .. }
            | ExpressionKind::Postfix { .. }
            | ExpressionKind::Unary { .. }
            | ExpressionKind::Binary { .. } => self.collect_left(expression),
            ExpressionKind::Assignment { .. } | ExpressionKind::Conditional { .. } => {
                let spine = Spine::of(expression);
                for node in spine.links {
                    self.collect_right(node);
                }
                self.collect(spine.head);
                None
            }
            ExpressionKind::Sequence(ref expressions) => {
                for inner in expressions {
                    self.collect(inner);
                }
                None
            }
            ExpressionKind::FunctionCall(ref call) => {
                match call.function.node {
                    FunctionIdentifier::Method { ref object, .. } => {
                        self.collect(object);
                    }
                    FunctionIdentifier::Expression(ref callee) => {
                        self.collect(callee);
                    }
                    FunctionIdentifier::Constructor(_)
                    | FunctionIdentifier::Cast(_)
                    | FunctionIdentifier::Function(_) => {}
                }
                for argument in &call.arguments {
                    self.collect(argument);
                }
                None
            }
            ExpressionKind::Number(_) | ExpressionKind::Bool(_) | ExpressionKind::String(_) => None,
        }
    }

    fn collect_left(&mut self, expression: &'a Expression) -> Option<String> {
        let spine = Spine::of(expression);
        let mut chain = self.collect(spine.head);
        for node in spine.links.into_iter().rev() {
            chain = self.collect_link(node, chain);
        }
        chain
    }

    fn collect_link(&mut self, node: &'a Expression, inner: Option<String>) -> Option<String> {
        match node.kind {
            ExpressionKind::Subscript { .. } => {
                let chain = inner.unwrap_or_default();
                self.chains.insert(node.id, chain.clone());
                Some(chain)
            }
            ExpressionKind::FieldSelection {
                ref base,
                ref field,
            } => {
                let mut chain = inner.unwrap_or_default();
                if let Some((index, _)) = self.member(base, &field.node) {
                    chain.push(DELIMITER);
                    chain.push_str(&format!("{index}"));
                }
                self.chains.insert(node.id, chain.clone());
                Some(chain)
            }
            ExpressionKind::Unary {
                operator: UnaryOperator::Increment | UnaryOperator::Decrement,
                ref operand,
            }
            | ExpressionKind::Postfix { ref operand, .. } => {
                self.define_collected(operand, inner, Definition::Step { node, operand });
                None
            }
            ExpressionKind::Binary { ref right, .. } => {
                self.collect(right);
                None
            }
            _ => None,
        }
    }

    fn collect_right(&mut self, node: &'a Expression) {
        match node.kind {
            ExpressionKind::Assignment {
                operator,
                ref target,
                ref value,
            } => self.define(
                target,
                Definition::Assignment {
                    node,
                    operator,
                    target,
                    value,
                },
            ),
            ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ..
            } => {
                self.collect(condition);
                self.collect(then_expression);
            }
            _ => {}
        }
    }

    fn propagate_all(&mut self) {
        for value in core::mem::take(&mut self.returns) {
            self.remained.clear();
            self.propagate(value);
        }
        while let Some(object) = self.objects.pop_first() {
            let symbol = String::from(front(&object));
            let definitions = self.definitions.get(&symbol).cloned().unwrap_or_default();
            for definition in definitions {
                if let Some(remained) = self.check(definition, &object) {
                    self.propagate_definition(definition, remained);
                }
            }
        }
    }

    fn check_target(&mut self, target: &Expression, object: &str) {
        let mut path = Vec::new();
        let mut current = target;
        while let ExpressionKind::Parenthesized(ref inner)
        | ExpressionKind::Subscript {
            base: ref inner, ..
        }
        | ExpressionKind::FieldSelection {
            base: ref inner, ..
        } = current.kind
        {
            path.push(current);
            current = inner;
        }
        if matches!(current.kind, ExpressionKind::Variable(_))
            && self
                .chains
                .get(&current.id)
                .is_some_and(|chain| chain == object)
        {
            self.marked.insert(current.id);
        }
        while let Some(node) = path.pop() {
            let (inner, named) = match node.kind {
                ExpressionKind::Parenthesized(ref inner) => (&**inner, false),
                ExpressionKind::Subscript { ref base, .. }
                | ExpressionKind::FieldSelection { ref base, .. } => (&**base, true),
                _ => continue,
            };
            if self.is_precise(inner)
                || (named
                    && self
                        .chains
                        .get(&node.id)
                        .is_some_and(|chain| chain == object))
            {
                self.marked.insert(node.id);
            }
        }
    }

    fn check(&mut self, definition: Definition<'a>, object: &str) -> Option<String> {
        let assignee = match definition {
            Definition::Assignment { target, .. }
            | Definition::Step {
                operand: target, ..
            } => {
                self.check_target(target, object);
                if self.is_precise(target) {
                    return Some(String::new());
                }
                self.chains.get(&target.id).cloned().unwrap_or_default()
            }
            Definition::Initializer { symbol, .. } => {
                if self.symbol_precise(symbol) {
                    return Some(String::new());
                }
                self.label(symbol)
            }
        };
        if assignee.starts_with(object) {
            Some(String::new())
        } else if object.starts_with(assignee.as_str()) {
            Some(String::from(
                object
                    .get(assignee.len() + DELIMITER.len_utf8()..)
                    .unwrap_or(""),
            ))
        } else {
            None
        }
    }

    fn propagate_definition(&mut self, definition: Definition<'a>, remained: String) {
        self.remained = remained;
        match definition {
            Definition::Assignment {
                node,
                operator,
                value,
                ..
            } => {
                self.propagate(value);
                if arithmetic_assignment(operator) {
                    self.result.insert(node.id);
                }
            }
            Definition::Step { node, operand } => {
                self.propagate(operand);
                self.result.insert(node.id);
            }
            Definition::Initializer { symbol, value } => {
                let ty = self
                    .analysis
                    .symbol(symbol)
                    .and_then(|symbol| symbol.variable())
                    .map(|variable| variable.ty.clone());
                self.propagate_initializer(value, ty.as_ref());
            }
        }
    }

    fn propagate_initializer(
        &mut self,
        initializer: &Initializer,
        ty: Option<&crate::types::Type>,
    ) {
        match initializer {
            Initializer::Expression(expression) => self.propagate(expression),
            Initializer::List(items) => {
                let structure = ty.is_some_and(|ty| {
                    !ty.is_array() && matches!(ty.kind, TypeKind::Struct(_) | TypeKind::Block(_))
                });
                if structure && !self.remained.is_empty() {
                    let index: usize = front(&self.remained).parse().unwrap_or(usize::MAX);
                    let Some(item) = items.get(index) else {
                        return;
                    };
                    let rest = String::from(after_front(&self.remained));
                    let outer = core::mem::replace(&mut self.remained, rest);
                    self.propagate_initializer(item, None);
                    self.remained = outer;
                    return;
                }
                for item in items {
                    self.propagate_initializer(item, None);
                }
            }
        }
    }

    fn object(&mut self, expression: &Expression) {
        let mut chain = self.chains.get(&expression.id).cloned().unwrap_or_default();
        if self.remained.is_empty() {
            self.marked.insert(expression.id);
        } else {
            chain.push(DELIMITER);
            chain.push_str(&self.remained);
        }
        if self.added.insert(chain.clone()) {
            self.objects.insert(chain);
        }
    }

    fn is_int(&self, expression: &Expression) -> bool {
        self.analysis
            .type_of(expression.id)
            .and_then(crate::types::Type::base_scalar)
            == Some(Scalar::Int)
    }

    fn propagate(&mut self, expression: &Expression) {
        let mut pending = Vec::from([expression]);
        while let Some(expression) = pending.pop() {
            self.propagate_node(expression, &mut pending);
        }
    }

    fn propagate_node<'e>(
        &mut self,
        expression: &'e Expression,
        pending: &mut Vec<&'e Expression>,
    ) {
        match expression.kind {
            ExpressionKind::Parenthesized(ref inner) => pending.push(inner),
            ExpressionKind::Variable(_)
            | ExpressionKind::Subscript { .. }
            | ExpressionKind::FieldSelection { .. } => self.object(expression),
            ExpressionKind::Assignment {
                operator,
                ref target,
                ref value,
            } => {
                if arithmetic_assignment(operator) && !self.is_int(expression) {
                    self.result.insert(expression.id);
                }
                pending.push(value);
                pending.push(target);
            }
            ExpressionKind::Binary {
                operator,
                ref left,
                ref right,
            } => {
                if arithmetic_binary(operator) && !self.is_int(expression) {
                    self.result.insert(expression.id);
                }
                pending.push(right);
                pending.push(left);
            }
            ExpressionKind::Unary {
                operator,
                ref operand,
            } => {
                if matches!(
                    operator,
                    UnaryOperator::Minus | UnaryOperator::Increment | UnaryOperator::Decrement
                ) {
                    self.result.insert(expression.id);
                }
                pending.push(operand);
            }
            ExpressionKind::Postfix { ref operand, .. } => {
                self.result.insert(expression.id);
                pending.push(operand);
            }
            ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ref else_expression,
            } => {
                pending.push(else_expression);
                pending.push(then_expression);
                pending.push(condition);
            }
            ExpressionKind::Sequence(ref expressions) => {
                pending.extend(expressions.iter().rev());
            }
            ExpressionKind::FunctionCall(ref call) => {
                let callee = self.analysis.calls.get(&expression.id);
                if !self.remained.is_empty() {
                    if let Some(Callee::Constructor(ty)) = callee {
                        if !ty.is_array() && matches!(ty.kind, TypeKind::Struct(_)) {
                            let index: usize = front(&self.remained).parse().unwrap_or(usize::MAX);
                            let Some(argument) = call.arguments.get(index) else {
                                return;
                            };
                            let rest = String::from(after_front(&self.remained));
                            let outer = core::mem::replace(&mut self.remained, rest);
                            self.propagate(argument);
                            self.remained = outer;
                            return;
                        }
                    }
                }
                if let Some(Callee::Builtin(id)) = callee {
                    let arithmetic = self
                        .analysis
                        .builtins
                        .function(*id)
                        .is_some_and(|function| {
                            ARITHMETIC_BUILTINS.contains(&function.name.as_str())
                        });
                    if arithmetic {
                        self.result.insert(expression.id);
                    }
                }
                pending.extend(call.arguments.iter().rev());
                if let FunctionIdentifier::Method { ref object, .. } = call.function.node {
                    pending.push(object);
                }
            }
            ExpressionKind::Number(_) | ExpressionKind::Bool(_) | ExpressionKind::String(_) => {}
        }
    }
}
