use crate::scope::QualifierFlags;
use alloc::collections::{BTreeMap, BTreeSet};
use alloc::vec::Vec;

use rglsl_ast::TranslationUnit;
use rglsl_ast::ast::{
    AssignmentOperator, BinaryOperator, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FunctionIdentifier, Initializer, JumpStatement, NodeId,
    Statement, StatementKind, UnaryOperator,
};
use rglsl_types::FastHashSet;
use rglsl_types::stack::recurse;

use super::{Analysis, Callee};
use crate::builtins::BuiltinFlags;
use crate::scope::{SymbolId, SymbolKind};
use crate::types::{Scalar, TypeKind};

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

pub(crate) fn no_contraction(unit: &TranslationUnit, analysis: &Analysis) -> FastHashSet<NodeId> {
    let mut pass = Precise {
        analysis,
        chains: BTreeMap::new(),
        definitions: BTreeMap::new(),
        objects: BTreeSet::new(),
        added: BTreeSet::new(),
        marked: BTreeSet::new(),
        returns: Vec::new(),
        result: FastHashSet::default(),
        precise_return: false,
        remained: Vec::new(),
    };
    if !pass.any_precise() {
        return FastHashSet::default();
    }
    pass.pass(unit);
    pass.result
}

struct Precise<'a> {
    analysis: &'a Analysis,
    chains: BTreeMap<NodeId, AccessPath>,
    definitions: BTreeMap<SymbolId, Vec<Definition<'a>>>,
    objects: BTreeSet<AccessPath>,
    added: BTreeSet<AccessPath>,
    marked: BTreeSet<NodeId>,
    returns: Vec<&'a Expression>,
    result: FastHashSet<NodeId>,
    precise_return: bool,
    remained: Vec<u32>,
}

#[derive(Clone, Debug, PartialEq, Eq, PartialOrd, Ord)]
struct AccessPath {
    root: SymbolId,
    fields: Vec<u32>,
}

impl AccessPath {
    const fn of(root: SymbolId) -> Self {
        Self {
            root,
            fields: Vec::new(),
        }
    }

    fn strip_prefix(&self, prefix: &Self) -> Option<&[u32]> {
        if self.root == prefix.root {
            self.fields.strip_prefix(prefix.fields.as_slice())
        } else {
            None
        }
    }
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
        self.analysis.symbols.modified_or_added().any(|symbol| {
            symbol
                .variable()
                .is_some_and(|variable| variable.qualifiers.flags.contains(QualifierFlags::PRECISE))
        }) || self.analysis.functions.iter().any(|function| {
            function
                .return_qualifiers
                .flags
                .contains(QualifierFlags::PRECISE)
        }) || self.analysis.types.blocks().any(|block| {
            block.qualifiers.flags.contains(QualifierFlags::PRECISE)
                || block
                    .members
                    .iter()
                    .any(|member| member.qualifiers.flags.contains(QualifierFlags::PRECISE))
        }) || self.analysis.types.structs().any(|structure| {
            structure
                .members
                .iter()
                .any(|member| member.qualifiers.flags.contains(QualifierFlags::PRECISE))
        })
    }

    fn symbol_precise(&self, symbol: SymbolId) -> bool {
        let Some(found) = self.analysis.symbol(symbol) else {
            return false;
        };
        match found.kind {
            SymbolKind::Variable(ref variable) => {
                variable.qualifiers.flags.contains(QualifierFlags::PRECISE)
                    || self.type_precise(&variable.ty)
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
                .is_some_and(|block| block.qualifiers.flags.contains(QualifierFlags::PRECISE)),
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
            .is_some_and(|member| member.qualifiers.flags.contains(QualifierFlags::PRECISE))
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
        let precise = members
            .get(index)?
            .qualifiers
            .flags
            .contains(QualifierFlags::PRECISE);
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

    fn variable_chain(&self, expression: &Expression) -> Option<AccessPath> {
        let symbol = *self.analysis.references.get(&expression.id)?;
        match self.analysis.symbol(symbol)?.kind {
            SymbolKind::BlockMember { instance, index } => Some(AccessPath {
                root: instance,
                fields: Vec::from([index]),
            }),
            _ => Some(AccessPath::of(symbol)),
        }
    }

    fn define_collected(
        &mut self,
        target: &'a Expression,
        chain: Option<AccessPath>,
        definition: Definition<'a>,
    ) {
        let Some(chain) = chain else {
            return;
        };
        let root = chain.root;
        if self.is_precise(target) {
            self.objects.insert(chain);
        }
        self.definitions.entry(root).or_default().push(definition);
    }

    fn check_target(&mut self, target: &Expression, object: &AccessPath) {
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

    fn check(&mut self, definition: Definition<'a>, object: &AccessPath) -> Option<Vec<u32>> {
        let assignee = match definition {
            Definition::Assignment { target, .. }
            | Definition::Step {
                operand: target, ..
            } => {
                self.check_target(target, object);
                if self.is_precise(target) {
                    return Some(Vec::new());
                }
                self.chains.get(&target.id)?.clone()
            }
            Definition::Initializer { symbol, .. } => {
                if self.symbol_precise(symbol) {
                    return Some(Vec::new());
                }
                AccessPath::of(symbol)
            }
        };
        if assignee.strip_prefix(object).is_some() {
            Some(Vec::new())
        } else {
            object.strip_prefix(&assignee).map(<[u32]>::to_vec)
        }
    }

    fn object(&mut self, expression: &Expression) {
        if self.remained.is_empty() {
            self.marked.insert(expression.id);
        }
        let Some(mut chain) = self.chains.get(&expression.id).cloned() else {
            return;
        };
        chain.fields.extend_from_slice(&self.remained);
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

    fn propagate_node<'e>(
        &mut self,
        expression: &'e Expression,
        pending: &mut Vec<&'e Expression>,
    ) -> Option<(&'e Expression, Vec<u32>)> {
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
                if let (Some(Callee::Constructor(ty)), Some((&index, rest))) =
                    (callee, self.remained.split_first())
                    && !ty.is_array()
                    && matches!(ty.kind, TypeKind::Struct(_))
                {
                    let argument = call.arguments.get(usize::try_from(index).ok()?)?;
                    return Some((argument, rest.to_vec()));
                }
                if let Some(Callee::Builtin(id)) = callee {
                    let arithmetic = self
                        .analysis
                        .builtin_functions
                        .entry(*id)
                        .is_some_and(|entry| entry.has(BuiltinFlags::PRECISE_ARITHMETIC));
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
        None
    }

    fn record_initializer(&mut self, symbol: Option<SymbolId>, initializer: &'a Initializer) {
        let folded = symbol
            .and_then(|symbol| self.analysis.symbol(symbol))
            .and_then(|symbol| symbol.variable())
            .is_some_and(|variable| variable.value.is_some());
        if let (Some(symbol), false) = (symbol, folded) {
            if self.symbol_precise(symbol) {
                self.objects.insert(AccessPath::of(symbol));
            }
            self.definitions
                .entry(symbol)
                .or_default()
                .push(Definition::Initializer {
                    symbol,
                    value: initializer,
                });
        }
    }

    fn collect_variable(&mut self, expression: &Expression) -> Option<AccessPath> {
        let chain = self.variable_chain(expression)?;
        self.chains.insert(expression.id, chain.clone());
        Some(chain)
    }

    fn collect_link(
        &mut self,
        node: &'a Expression,
        inner: Option<AccessPath>,
    ) -> Option<AccessPath> {
        match node.kind {
            ExpressionKind::Subscript { .. } => {
                let chain = inner?;
                self.chains.insert(node.id, chain.clone());
                Some(chain)
            }
            ExpressionKind::FieldSelection {
                ref base,
                ref field,
            } => {
                let mut chain = inner?;
                if let Some((index, _)) = self.member(base, &field.node) {
                    chain.fields.push(index);
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
            _ => None,
        }
    }

    fn definition_type(&self, definition: Definition<'a>) -> Option<crate::types::Type> {
        match definition {
            Definition::Initializer { symbol, .. } => self
                .analysis
                .symbol(symbol)
                .and_then(|symbol| symbol.variable())
                .map(|variable| variable.ty.clone()),
            Definition::Assignment { .. } | Definition::Step { .. } => None,
        }
    }

    fn pass(&mut self, unit: &'a TranslationUnit) {
        for declaration in &unit.external_declarations {
            match declaration {
                ExternalDeclaration::FunctionDefinition(definition) => {
                    self.precise_return = self
                        .analysis
                        .function_declarations
                        .get(&definition.id)
                        .and_then(|id| self.analysis.function(*id))
                        .is_some_and(|function| {
                            function
                                .return_qualifiers
                                .flags
                                .contains(QualifierFlags::PRECISE)
                        });
                    for statement in &definition.kind.body.node.statements {
                        self.collect_statement(statement);
                    }
                    self.precise_return = false;
                }
                ExternalDeclaration::Declaration(declaration) => {
                    self.collect_declaration(declaration);
                }
                ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
            }
        }
        self.propagate_all();
    }

    fn collect_declaration(&mut self, declaration: &'a Declaration) {
        let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind else {
            return;
        };
        for declarator in &list.declarators {
            let Some(ref initializer) = declarator.kind.initializer else {
                continue;
            };
            let symbol = self.analysis.declarations.get(&declarator.id).copied();
            self.initialized(symbol, &initializer.node);
        }
    }

    fn initialized(&mut self, symbol: Option<SymbolId>, initializer: &'a Initializer) {
        self.record_initializer(symbol, initializer);
        self.collect_initializer(initializer);
    }

    fn collect_initializer(&mut self, initializer: &'a Initializer) {
        recurse(|| match initializer {
            Initializer::Expression(expression) => {
                self.collect(expression);
            }
            Initializer::List(items) => {
                for item in items {
                    self.collect_initializer(&item.node);
                }
            }
        });
    }

    fn collect_statement(&mut self, statement: &'a Statement) {
        recurse(|| match statement.kind {
            StatementKind::Compound(ref compound) => {
                for inner in &compound.statements {
                    self.collect_statement(inner);
                }
            }
            StatementKind::Declaration(ref declaration) => {
                self.collect_declaration(declaration);
            }
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
                let precise = self.precise_return;
                if precise {
                    self.returns.push(value);
                    self.collect(value);
                }
            }
            StatementKind::Jump(_) => {}
            StatementKind::Attributed { ref statement, .. } => {
                self.collect_statement(statement);
            }
        });
    }

    fn collect_condition(&mut self, condition: &'a Condition) {
        match condition {
            Condition::Expression(expression) => {
                self.collect(expression);
            }
            Condition::Declaration(declaration) => {
                let symbol = self.analysis.declarations.get(&declaration.id).copied();
                self.initialized(symbol, &declaration.kind.initializer.node);
            }
        }
    }

    fn collect(&mut self, expression: &'a Expression) -> Option<AccessPath> {
        recurse(|| match expression.kind {
            ExpressionKind::Variable(_) => self.collect_variable(expression),
            ExpressionKind::Parenthesized(ref inner) => {
                let chain = self.collect(inner);
                if let Some(ref chain) = chain {
                    self.chains.insert(expression.id, chain.clone());
                }
                chain
            }
            ExpressionKind::Subscript {
                base: ref inner, ..
            }
            | ExpressionKind::FieldSelection {
                base: ref inner, ..
            }
            | ExpressionKind::Postfix {
                operand: ref inner, ..
            }
            | ExpressionKind::Unary {
                operand: ref inner, ..
            } => {
                let chain = self.collect(inner);
                self.collect_link(expression, chain)
            }
            ExpressionKind::Binary {
                ref left,
                ref right,
                ..
            } => {
                self.collect(left);
                self.collect(right);
                None
            }
            ExpressionKind::Assignment {
                operator,
                ref target,
                ref value,
            } => {
                let chain = self.collect(target);
                let definition = Definition::Assignment {
                    node: expression,
                    operator,
                    target,
                    value,
                };
                self.define_collected(target, chain, definition);
                self.collect(value);
                None
            }
            ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ref else_expression,
            } => {
                self.collect(condition);
                self.collect(then_expression);
                self.collect(else_expression);
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
        })
    }

    fn propagate_all(&mut self) {
        let returns = core::mem::take(&mut self.returns);
        for value in returns {
            self.remained.clear();
            self.propagate(value);
        }
        while let Some(object) = self.objects.pop_first() {
            let definitions = self
                .definitions
                .get(&object.root)
                .cloned()
                .unwrap_or_default();
            for definition in definitions {
                if let Some(remained) = self.check(definition, &object) {
                    self.propagate_definition(definition, remained);
                }
            }
        }
    }

    fn propagate_definition(&mut self, definition: Definition<'a>, remained: Vec<u32>) {
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
            Definition::Initializer { value, .. } => {
                let ty = self.definition_type(definition);
                self.propagate_initializer(value, ty);
            }
        }
    }

    fn propagate_initializer(
        &mut self,
        initializer: &'a Initializer,
        ty: Option<crate::types::Type>,
    ) {
        recurse(|| match initializer {
            Initializer::Expression(expression) => {
                self.propagate(expression);
            }
            Initializer::List(items) => {
                let structure = ty.is_some_and(|ty| {
                    !ty.is_array() && matches!(ty.kind, TypeKind::Struct(_) | TypeKind::Block(_))
                });
                let remained = self.remained.clone();
                if let (true, Some((&index, rest))) = (structure, remained.split_first()) {
                    let Some(item) = usize::try_from(index)
                        .ok()
                        .and_then(|index| items.get(index))
                    else {
                        return;
                    };
                    let rest = rest.to_vec();
                    let outer = core::mem::replace(&mut self.remained, rest);
                    self.propagate_initializer(&item.node, None);
                    self.remained = outer;
                    return;
                }
                for item in items {
                    self.propagate_initializer(&item.node, None);
                }
            }
        });
    }

    fn propagate(&mut self, expression: &'a Expression) {
        recurse(|| {
            let mut pending = Vec::from([expression]);
            while let Some(expression) = pending.pop() {
                let nested = self.propagate_node(expression, &mut pending);
                if let Some((argument, rest)) = nested {
                    let outer = core::mem::replace(&mut self.remained, rest);
                    self.propagate(argument);
                    self.remained = outer;
                }
            }
        });
    }
}
