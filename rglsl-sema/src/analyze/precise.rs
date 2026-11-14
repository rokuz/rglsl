use crate::scope::QualifierFlags;
use alloc::collections::{BTreeMap, BTreeSet};
use alloc::vec::Vec;
use core::cell::RefCell;

use rglsl_ast::ast::{
    AssignmentOperator, BinaryOperator, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FunctionIdentifier, Initializer, JumpStatement, NodeId,
    Statement, StatementKind, UnaryOperator,
};
use rglsl_ast::{Spine, TranslationUnit};
use rglsl_types::FastHashSet;
use rglsl_types::stack::{Stalled, run};

use super::frames::Cx;
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

pub(crate) fn no_contraction(
    unit: &TranslationUnit,
    analysis: &Analysis,
) -> Result<FastHashSet<NodeId>, Stalled> {
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
        return Ok(FastHashSet::default());
    }
    let finished = {
        let context = RefCell::new(&mut pass);
        run(|stack| Cx::new(&context, stack).pass(unit))
    };
    finished.ok_or(Stalled)?;
    Ok(pass.result)
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
}

impl<'b, 'a: 'b> Cx<'b, Precise<'a>> {
    async fn pass(self, unit: &'a TranslationUnit) {
        for declaration in &unit.external_declarations {
            match declaration {
                ExternalDeclaration::FunctionDefinition(definition) => {
                    self.with(|pass| {
                        pass.precise_return = pass
                            .analysis
                            .function_declarations
                            .get(&definition.id)
                            .and_then(|id| pass.analysis.function(*id))
                            .is_some_and(|function| {
                                function
                                    .return_qualifiers
                                    .flags
                                    .contains(QualifierFlags::PRECISE)
                            });
                    });
                    for statement in &definition.kind.body.node.statements {
                        self.call(self.clone().collect_statement(statement)).await;
                    }
                    self.with(|pass| pass.precise_return = false);
                }
                ExternalDeclaration::Declaration(declaration) => {
                    self.call(self.clone().collect_declaration(declaration))
                        .await;
                }
                ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
            }
        }
        self.call(self.clone().propagate_all()).await;
    }

    async fn collect_declaration(self, declaration: &'a Declaration) {
        let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind else {
            return;
        };
        for declarator in &list.declarators {
            let Some(ref initializer) = declarator.kind.initializer else {
                continue;
            };
            let symbol = self.with(|pass| pass.analysis.declarations.get(&declarator.id).copied());
            self.call(self.clone().initialized(symbol, &initializer.node))
                .await;
        }
    }

    async fn initialized(self, symbol: Option<SymbolId>, initializer: &'a Initializer) {
        self.with(|pass| pass.record_initializer(symbol, initializer));
        self.call(self.clone().collect_initializer(initializer))
            .await;
    }

    async fn collect_initializer(self, initializer: &'a Initializer) {
        match initializer {
            Initializer::Expression(expression) => {
                self.call(self.clone().collect(expression)).await;
            }
            Initializer::List(items) => {
                for item in items {
                    self.call(self.clone().collect_initializer(&item.node))
                        .await;
                }
            }
        }
    }

    async fn collect_statement(self, statement: &'a Statement) {
        match statement.kind {
            StatementKind::Compound(ref compound) => {
                for inner in &compound.statements {
                    self.call(self.clone().collect_statement(inner)).await;
                }
            }
            StatementKind::Declaration(ref declaration) => {
                self.call(self.clone().collect_declaration(declaration))
                    .await;
            }
            StatementKind::Expression(ref expression) => {
                if let Some(expression) = expression {
                    self.call(self.clone().collect(expression)).await;
                }
            }
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => {
                self.call(self.clone().collect(condition)).await;
                self.call(self.clone().collect_statement(then_branch)).await;
                if let Some(else_branch) = else_branch {
                    self.call(self.clone().collect_statement(else_branch)).await;
                }
            }
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => {
                self.call(self.clone().collect(selector)).await;
                for inner in statements {
                    self.call(self.clone().collect_statement(inner)).await;
                }
            }
            StatementKind::CaseLabel(_) => {}
            StatementKind::While {
                ref condition,
                ref body,
            } => {
                self.call(self.clone().collect_condition(condition)).await;
                self.call(self.clone().collect_statement(body)).await;
            }
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => {
                self.call(self.clone().collect_statement(body)).await;
                self.call(self.clone().collect(condition)).await;
            }
            StatementKind::For(ref looping) => {
                self.call(self.clone().collect_statement(&looping.init))
                    .await;
                if let Some(ref condition) = looping.condition {
                    self.call(self.clone().collect_condition(condition)).await;
                }
                if let Some(ref increment) = looping.increment {
                    self.call(self.clone().collect(increment)).await;
                }
                self.call(self.clone().collect_statement(&looping.body))
                    .await;
            }
            StatementKind::Jump(JumpStatement::Return(Some(ref value))) => {
                let precise = self.with(|pass| pass.precise_return);
                if precise {
                    self.with(|pass| pass.returns.push(value));
                    self.call(self.clone().collect(value)).await;
                }
            }
            StatementKind::Jump(_) => {}
            StatementKind::Attributed { ref statement, .. } => {
                self.call(self.clone().collect_statement(statement)).await;
            }
        }
    }

    async fn collect_condition(self, condition: &'a Condition) {
        match condition {
            Condition::Expression(expression) => {
                self.call(self.clone().collect(expression)).await;
            }
            Condition::Declaration(declaration) => {
                let symbol =
                    self.with(|pass| pass.analysis.declarations.get(&declaration.id).copied());
                self.call(
                    self.clone()
                        .initialized(symbol, &declaration.kind.initializer.node),
                )
                .await;
            }
        }
    }

    async fn define(self, target: &'a Expression, definition: Definition<'a>) {
        let chain = self.call(self.clone().collect(target)).await;
        self.with(|pass| pass.define_collected(target, chain, definition));
    }

    async fn collect(self, expression: &'a Expression) -> Option<AccessPath> {
        match expression.kind {
            ExpressionKind::Variable(_) => self.with(|pass| pass.collect_variable(expression)),
            ExpressionKind::Parenthesized(ref inner) => {
                let chain = self.call(self.clone().collect(inner)).await;
                if let Some(ref chain) = chain {
                    self.with(|pass| pass.chains.insert(expression.id, chain.clone()));
                }
                chain
            }
            ExpressionKind::Subscript { .. }
            | ExpressionKind::FieldSelection { .. }
            | ExpressionKind::Postfix { .. }
            | ExpressionKind::Unary { .. }
            | ExpressionKind::Binary { .. } => {
                self.call(self.clone().collect_left(expression)).await
            }
            ExpressionKind::Assignment { .. } | ExpressionKind::Conditional { .. } => {
                let spine = Spine::of(expression);
                for node in spine.links {
                    self.call(self.clone().collect_right(node)).await;
                }
                self.call(self.clone().collect(spine.head)).await;
                None
            }
            ExpressionKind::Sequence(ref expressions) => {
                for inner in expressions {
                    self.call(self.clone().collect(inner)).await;
                }
                None
            }
            ExpressionKind::FunctionCall(ref call) => {
                match call.function.node {
                    FunctionIdentifier::Method { ref object, .. } => {
                        self.call(self.clone().collect(object)).await;
                    }
                    FunctionIdentifier::Expression(ref callee) => {
                        self.call(self.clone().collect(callee)).await;
                    }
                    FunctionIdentifier::Constructor(_)
                    | FunctionIdentifier::Cast(_)
                    | FunctionIdentifier::Function(_) => {}
                }
                for argument in &call.arguments {
                    self.call(self.clone().collect(argument)).await;
                }
                None
            }
            ExpressionKind::Number(_) | ExpressionKind::Bool(_) | ExpressionKind::String(_) => None,
        }
    }

    async fn collect_left(self, expression: &'a Expression) -> Option<AccessPath> {
        let spine = Spine::of(expression);
        let mut chain = self.call(self.clone().collect(spine.head)).await;
        for node in spine.links.into_iter().rev() {
            chain = match node.kind {
                ExpressionKind::Binary { ref right, .. } => {
                    self.call(self.clone().collect(right)).await;
                    None
                }
                _ => self.with(|pass| pass.collect_link(node, chain)),
            };
        }
        chain
    }

    async fn collect_right(self, node: &'a Expression) {
        match node.kind {
            ExpressionKind::Assignment {
                operator,
                ref target,
                ref value,
            } => {
                self.call(self.clone().define(
                    target,
                    Definition::Assignment {
                        node,
                        operator,
                        target,
                        value,
                    },
                ))
                .await;
            }
            ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ..
            } => {
                self.call(self.clone().collect(condition)).await;
                self.call(self.clone().collect(then_expression)).await;
            }
            _ => {}
        }
    }

    async fn propagate_all(self) {
        let returns = self.with(|pass| core::mem::take(&mut pass.returns));
        for value in returns {
            self.with(|pass| pass.remained.clear());
            self.call(self.clone().propagate(value)).await;
        }
        while let Some(object) = self.with(|pass| pass.objects.pop_first()) {
            let definitions = self.with(|pass| {
                pass.definitions
                    .get(&object.root)
                    .cloned()
                    .unwrap_or_default()
            });
            for definition in definitions {
                if let Some(remained) = self.with(|pass| pass.check(definition, &object)) {
                    self.call(self.clone().propagate_definition(definition, remained))
                        .await;
                }
            }
        }
    }

    async fn propagate_definition(self, definition: Definition<'a>, remained: Vec<u32>) {
        self.with(|pass| pass.remained = remained);
        match definition {
            Definition::Assignment {
                node,
                operator,
                value,
                ..
            } => {
                self.call(self.clone().propagate(value)).await;
                if arithmetic_assignment(operator) {
                    self.with(|pass| pass.result.insert(node.id));
                }
            }
            Definition::Step { node, operand } => {
                self.call(self.clone().propagate(operand)).await;
                self.with(|pass| pass.result.insert(node.id));
            }
            Definition::Initializer { value, .. } => {
                let ty = self.with(|pass| pass.definition_type(definition));
                self.call(self.clone().propagate_initializer(value, ty))
                    .await;
            }
        }
    }

    async fn propagate_initializer(
        self,
        initializer: &'a Initializer,
        ty: Option<crate::types::Type>,
    ) {
        match initializer {
            Initializer::Expression(expression) => {
                self.call(self.clone().propagate(expression)).await;
            }
            Initializer::List(items) => {
                let structure = ty.is_some_and(|ty| {
                    !ty.is_array() && matches!(ty.kind, TypeKind::Struct(_) | TypeKind::Block(_))
                });
                let remained = self.with(|pass| pass.remained.clone());
                if let (true, Some((&index, rest))) = (structure, remained.split_first()) {
                    let Some(item) = usize::try_from(index)
                        .ok()
                        .and_then(|index| items.get(index))
                    else {
                        return;
                    };
                    let rest = rest.to_vec();
                    let outer = self.with(|pass| core::mem::replace(&mut pass.remained, rest));
                    self.call(self.clone().propagate_initializer(&item.node, None))
                        .await;
                    self.with(|pass| pass.remained = outer);
                    return;
                }
                for item in items {
                    self.call(self.clone().propagate_initializer(&item.node, None))
                        .await;
                }
            }
        }
    }

    async fn propagate(self, expression: &'a Expression) {
        let mut pending = Vec::from([expression]);
        while let Some(expression) = pending.pop() {
            let nested = self.with(|pass| pass.propagate_node(expression, &mut pending));
            if let Some((argument, rest)) = nested {
                let outer = self.with(|pass| core::mem::replace(&mut pass.remained, rest));
                self.call(self.clone().propagate(argument)).await;
                self.with(|pass| pass.remained = outer);
            }
        }
    }
}
