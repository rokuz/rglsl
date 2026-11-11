use alloc::collections::{BTreeMap, BTreeSet};
use alloc::vec::Vec;

use rglsl_ast::ast::{
    AssignmentOperator, BinaryOperator, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FunctionIdentifier, Initializer, JumpStatement, NodeId,
    PrecisionQualifier, Statement, StatementKind, UnaryOperator,
};
use rglsl_ast::TranslationUnit;

use super::{Analysis, Callee};
use crate::scope::{SymbolId, SymbolKind};
use crate::types::{Scalar, Type, TypeKind};

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, PartialOrd, Ord)]
enum Precision {
    #[default]
    None,
    Low,
    Medium,
    High,
}

impl Precision {
    const fn of(qualifier: Option<PrecisionQualifier>) -> Self {
        match qualifier {
            None => Self::None,
            Some(PrecisionQualifier::Low) => Self::Low,
            Some(PrecisionQualifier::Medium) => Self::Medium,
            Some(PrecisionQualifier::High) => Self::High,
        }
    }

    const fn relaxed(self) -> bool {
        matches!(self, Self::Low | Self::Medium)
    }
}

#[derive(Debug, Clone, Default)]
pub struct RelaxedPrecision {
    pub results: BTreeSet<NodeId>,
    pub conversions: BTreeSet<NodeId>,
}

const HIGHP_PARAMETERS: [&str; 19] = [
    "floatBitsToInt",
    "floatBitsToUint",
    "intBitsToFloat",
    "uintBitsToFloat",
    "frexp",
    "ldexp",
    "unpackUnorm2x16",
    "unpackSnorm2x16",
    "unpackHalf2x16",
    "unpackSnorm4x8",
    "unpackUnorm4x8",
    "findMSB",
    "uaddCarry",
    "usubBorrow",
    "umulExtended",
    "imulExtended",
    "bitfieldReverse",
    "packDouble2x32",
    "unpackDouble2x32",
];

const fn builtin_result(name: &str) -> Precision {
    match name.as_bytes() {
        b"packUnorm2x16" | b"packSnorm2x16" | b"packHalf2x16" | b"packSnorm4x8"
        | b"packUnorm4x8" => Precision::High,
        b"stencilAttachmentReadEXT" => Precision::Low,
        _ => Precision::None,
    }
}

fn is_sampling(name: &str) -> bool {
    let texture = name.starts_with("texture") || name.starts_with("texel");
    let query = matches!(
        name,
        "textureSize" | "textureQueryLod" | "textureQueryLevels" | "textureSamples"
    );
    (texture && !query)
        || name.starts_with("sparseTex")
        || matches!(name, "fragmentFetchAMD" | "fragmentMaskFetchAMD")
}

fn is_image_or_texture(name: &str) -> bool {
    [
        "texture",
        "texel",
        "image",
        "sparse",
        "subpassLoad",
        "fragment",
    ]
    .iter()
    .any(|prefix| name.starts_with(prefix))
}

fn counted_arguments(name: &str, count: usize) -> usize {
    match name {
        "bitfieldExtract"
        | "interpolateAtCentroid"
        | "interpolateAtOffset"
        | "interpolateAtSample" => count.min(1),
        "bitfieldInsert" => count.min(2),
        "debugPrintfEXT" | "abortEXT" => 0,
        _ => count,
    }
}

pub(crate) fn relaxed_precision(unit: &TranslationUnit, analysis: &Analysis) -> RelaxedPrecision {
    let mut pass = Pass {
        analysis,
        own: BTreeMap::new(),
        operation: BTreeMap::new(),
        conversion: BTreeMap::new(),
        return_precision: Precision::None,
    };
    for declaration in &unit.external_declarations {
        match declaration {
            ExternalDeclaration::FunctionDefinition(definition) => {
                pass.return_precision = analysis
                    .function_declarations
                    .get(&definition.id)
                    .and_then(|id| analysis.function(*id))
                    .map_or(Precision::None, |function| {
                        Precision::of(function.return_qualifiers.precision)
                    });
                for statement in &definition.body.statements {
                    pass.statement(statement);
                }
            }
            ExternalDeclaration::Declaration(declaration) => pass.declaration(declaration),
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
    let mut relaxed = RelaxedPrecision::default();
    for (&id, &precision) in &pass.own {
        let decorated = pass.operation.get(&id).copied().unwrap_or(precision);
        if decorated.relaxed() {
            relaxed.results.insert(id);
        }
    }
    for (&id, &precision) in &pass.conversion {
        if precision.relaxed() {
            relaxed.conversions.insert(id);
        }
    }
    relaxed
}

struct Pass<'a> {
    analysis: &'a Analysis,
    own: BTreeMap<NodeId, Precision>,
    operation: BTreeMap<NodeId, Precision>,
    conversion: BTreeMap<NodeId, Precision>,
    return_precision: Precision,
}

fn strip(expression: &Expression) -> &Expression {
    match expression.kind {
        ExpressionKind::Parenthesized(ref inner) => strip(inner),
        _ => expression,
    }
}

const fn participates(ty: &Type, half: bool) -> bool {
    match ty.base_scalar() {
        Some(Scalar::Int | Scalar::Uint | Scalar::Float) => true,
        Some(Scalar::Float16) => half,
        _ => false,
    }
}

impl<'a> Pass<'a> {
    fn ty(&self, expression: &Expression) -> Option<&'a Type> {
        self.analysis.type_of(expression.id)
    }

    fn converted(&self, expression: &Expression) -> Option<&'a Type> {
        let info = self.analysis.expression(expression.id)?;
        info.conversion
            .as_ref()
            .filter(|target| target.base_scalar() != info.ty.base_scalar())
    }

    fn own_of(&self, expression: &Expression) -> Precision {
        self.own
            .get(&strip(expression).id)
            .copied()
            .unwrap_or_default()
    }

    fn visible(&self, expression: &Expression) -> Precision {
        if self.converted(expression).is_some() {
            return self
                .conversion
                .get(&expression.id)
                .copied()
                .unwrap_or_default();
        }
        self.own_of(expression)
    }

    fn set_own(&mut self, expression: &'a Expression, precision: Precision) {
        self.own.insert(strip(expression).id, precision);
    }

    fn symbol_precision(&self, symbol: SymbolId) -> Precision {
        let Some(found) = self.analysis.symbol(symbol) else {
            return Precision::None;
        };
        match found.kind {
            SymbolKind::Variable(ref variable) => Precision::of(variable.qualifiers.precision),
            SymbolKind::BlockMember { instance, index } => {
                let Some(TypeKind::Block(block)) = self
                    .analysis
                    .symbol(instance)
                    .and_then(|symbol| symbol.variable())
                    .map(|variable| variable.ty.kind)
                else {
                    return Precision::None;
                };
                self.analysis
                    .types
                    .block(block)
                    .and_then(|block| block.members.get(usize::try_from(index).ok()?))
                    .map_or(Precision::None, |member| {
                        Precision::of(member.qualifiers.precision)
                    })
            }
            _ => Precision::None,
        }
    }

    fn member_precision(&self, base: &Expression, field: &str) -> Option<Precision> {
        let ty = self.ty(base)?;
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
        members
            .iter()
            .find(|member| member.name == field)
            .map(|member| Precision::of(member.qualifiers.precision))
    }

    fn propagate(&mut self, expression: &'a Expression, precision: Precision) {
        self.spread(Vec::from([(expression, true)]), precision);
    }

    fn propagate_inner(&mut self, expression: &'a Expression, precision: Precision) {
        self.spread(Vec::from([(expression, false)]), precision);
    }

    fn spread(&mut self, mut pending: Vec<(&'a Expression, bool)>, precision: Precision) {
        while let Some((expression, converting)) = pending.pop() {
            if converting {
                if let Some(target) = self.converted(expression) {
                    let current = self
                        .conversion
                        .get(&expression.id)
                        .copied()
                        .unwrap_or_default();
                    if current != Precision::None || !participates(target, true) {
                        continue;
                    }
                    self.conversion.insert(expression.id, precision);
                }
            }
            let inner = strip(expression);
            if self.own_of(inner) != Precision::None
                || !self.ty(inner).is_some_and(|ty| participates(ty, true))
            {
                continue;
            }
            self.set_own(inner, precision);
            let operands: &[&'a Expression] = &match inner.kind {
                ExpressionKind::Binary {
                    ref left,
                    ref right,
                    ..
                }
                | ExpressionKind::Assignment {
                    target: ref left,
                    value: ref right,
                    ..
                }
                | ExpressionKind::Subscript {
                    base: ref left,
                    index: ref right,
                }
                | ExpressionKind::Conditional {
                    then_expression: ref left,
                    else_expression: ref right,
                    ..
                } => Vec::from([&**left, &**right]),
                ExpressionKind::FieldSelection {
                    base: ref operand, ..
                }
                | ExpressionKind::Unary { ref operand, .. }
                | ExpressionKind::Postfix { ref operand, .. } => Vec::from([&**operand]),
                ExpressionKind::FunctionCall(ref call) => call.arguments.iter().collect(),
                ExpressionKind::Sequence(ref expressions) => expressions.iter().collect(),
                ExpressionKind::Variable(_)
                | ExpressionKind::Number(_)
                | ExpressionKind::Bool(_)
                | ExpressionKind::String(_)
                | ExpressionKind::Parenthesized(_) => Vec::new(),
            };
            pending.extend(operands.iter().rev().map(|operand| (*operand, true)));
        }
    }

    fn update_binary(
        &mut self,
        node: &'a Expression,
        left: &'a Expression,
        right: &'a Expression,
        shift: bool,
    ) {
        if !self.ty(node).is_some_and(|ty| participates(ty, false)) {
            self.set_own(node, Precision::None);
            return;
        }
        if shift {
            let precision = self.visible(left);
            self.set_own(node, precision);
            return;
        }
        let precision = self.visible(left).max(self.visible(right));
        self.set_own(node, precision);
        if precision != Precision::None {
            self.propagate(left, precision);
            self.propagate(right, precision);
        }
    }

    fn expression(&mut self, expression: &'a Expression) {
        let mut pending = Vec::from([(expression, false)]);
        while let Some((expression, visited)) = pending.pop() {
            let inner = strip(expression);
            if visited {
                self.finish(inner);
                continue;
            }
            pending.push((inner, true));
            let start = pending.len();
            match inner.kind {
                ExpressionKind::FunctionCall(ref call) => {
                    if let FunctionIdentifier::Method { ref object, .. } = call.function.node {
                        pending.push((object, false));
                    }
                    pending.extend(call.arguments.iter().map(|argument| (argument, false)));
                }
                ExpressionKind::Variable(_)
                | ExpressionKind::Number(_)
                | ExpressionKind::Bool(_)
                | ExpressionKind::String(_)
                | ExpressionKind::Parenthesized(_) => {}
                _ => pending.extend(
                    inner
                        .kind
                        .children()
                        .into_iter()
                        .map(|child| (child, false)),
                ),
            }
            if let Some(children) = pending.get_mut(start..) {
                children.reverse();
            }
        }
    }

    fn finish(&mut self, inner: &'a Expression) {
        match inner.kind {
            ExpressionKind::Variable(_) => {
                let precision = self
                    .analysis
                    .references
                    .get(&inner.id)
                    .map_or(Precision::None, |symbol| self.symbol_precision(*symbol));
                self.set_own(inner, precision);
            }
            ExpressionKind::Number(_) | ExpressionKind::Bool(_) | ExpressionKind::String(_) => {
                self.set_own(inner, Precision::None);
            }
            ExpressionKind::Parenthesized(_) => {}
            ExpressionKind::Subscript { ref base, .. } => {
                let precision = self.visible(base);
                self.set_own(inner, precision);
            }
            ExpressionKind::FieldSelection {
                ref base,
                ref field,
            } => {
                let precision = self
                    .member_precision(base, &field.node)
                    .unwrap_or_else(|| self.visible(base));
                self.set_own(inner, precision);
            }
            ExpressionKind::Unary {
                operator,
                ref operand,
            } => {
                let precision = match operator {
                    UnaryOperator::Plus => self.visible(operand),
                    _ if self.ty(inner).is_some_and(|ty| participates(ty, false)) => {
                        self.visible(operand)
                    }
                    _ => Precision::None,
                };
                self.set_own(inner, precision);
            }
            ExpressionKind::Postfix { ref operand, .. } => {
                let precision = if self.ty(inner).is_some_and(|ty| participates(ty, false)) {
                    self.visible(operand)
                } else {
                    Precision::None
                };
                self.set_own(inner, precision);
            }
            ExpressionKind::Binary {
                operator,
                ref left,
                ref right,
            } => {
                let shift = matches!(
                    operator,
                    BinaryOperator::ShiftLeft | BinaryOperator::ShiftRight
                );
                self.update_binary(inner, left, right, shift);
            }
            ExpressionKind::Assignment {
                operator,
                ref target,
                ref value,
            } => {
                let shift = matches!(
                    operator,
                    AssignmentOperator::ShiftLeft | AssignmentOperator::ShiftRight
                );
                self.update_binary(inner, target, value, shift);
            }
            ExpressionKind::Conditional {
                ref then_expression,
                ref else_expression,
                ..
            } => {
                let precision = self
                    .visible(then_expression)
                    .max(self.visible(else_expression));
                self.set_own(inner, precision);
            }
            ExpressionKind::Sequence(ref expressions) => {
                let precision = expressions
                    .last()
                    .map_or(Precision::None, |last| self.visible(last));
                self.set_own(inner, precision);
            }
            ExpressionKind::FunctionCall(ref call) => self.call(inner, &call.arguments),
        }
    }

    fn call(&mut self, node: &'a Expression, arguments: &'a [Expression]) {
        let analysis = self.analysis;
        match analysis.calls.get(&node.id) {
            Some(Callee::Builtin(id)) => {
                let Some(function) = analysis.builtins.function(*id) else {
                    self.set_own(node, Precision::None);
                    return;
                };
                let name = function.name.as_str();
                let counted = counted_arguments(name, arguments.len());
                let mut operation = arguments
                    .iter()
                    .take(counted)
                    .map(|argument| self.visible(argument))
                    .max()
                    .unwrap_or_default();
                if HIGHP_PARAMETERS.contains(&name) {
                    operation = Precision::High;
                }
                let result = if is_sampling(name) || matches!(name, "imageLoad" | "imageStore") {
                    arguments
                        .first()
                        .map_or(Precision::None, |first| self.visible(first))
                } else if function.return_type.is_bool() {
                    Precision::None
                } else {
                    match builtin_result(name) {
                        Precision::None => operation,
                        declared => declared,
                    }
                };
                self.set_own(node, Precision::None);
                if operation != Precision::None {
                    self.propagate_inner(node, operation);
                    if !is_image_or_texture(name) {
                        self.operation.insert(node.id, operation);
                    }
                }
                self.set_own(node, result);
            }
            Some(Callee::Function(id)) => {
                let precision = analysis.function(*id).map_or(Precision::None, |function| {
                    Precision::of(function.return_qualifiers.precision)
                });
                self.set_own(node, precision);
            }
            Some(Callee::Constructor(ty)) => {
                let aggregate = (ty.is_array()
                    || matches!(ty.kind, TypeKind::Vector { .. } | TypeKind::Matrix { .. }))
                    && arguments.len() > 1;
                if aggregate && participates(ty, false) {
                    let precision = arguments
                        .iter()
                        .map(|argument| self.visible(argument))
                        .max()
                        .unwrap_or_default();
                    self.set_own(node, precision);
                    if precision != Precision::None {
                        for argument in arguments {
                            self.propagate(argument, precision);
                        }
                    }
                } else if ty.is_scalar() && participates(ty, false) && arguments.len() == 1 {
                    let precision = arguments
                        .first()
                        .filter(|argument| self.ty(argument).is_some_and(Type::is_scalar))
                        .map_or(Precision::None, |argument| self.visible(argument));
                    self.set_own(node, precision);
                } else {
                    self.set_own(node, Precision::None);
                }
            }
            Some(Callee::NonUniform) => {
                let precision = arguments
                    .first()
                    .map_or(Precision::None, |argument| self.visible(argument));
                self.set_own(node, precision);
            }
            _ => self.set_own(node, Precision::None),
        }
    }

    fn assign_initializer(&mut self, symbol: Option<SymbolId>, initializer: &'a Initializer) {
        self.initializer(initializer);
        let Some(symbol) = symbol else {
            return;
        };
        let folded = self
            .analysis
            .symbol(symbol)
            .and_then(|symbol| symbol.variable())
            .is_some_and(|variable| variable.value.is_some());
        if folded {
            return;
        }
        let Initializer::Expression(ref value) = *initializer else {
            return;
        };
        let participating = self
            .analysis
            .symbol(symbol)
            .and_then(|symbol| symbol.variable())
            .is_some_and(|variable| participates(&variable.ty, false));
        if !participating {
            return;
        }
        let precision = self.symbol_precision(symbol).max(self.visible(value));
        if precision != Precision::None {
            self.propagate(value, precision);
        }
    }

    fn initializer(&mut self, initializer: &'a Initializer) {
        match initializer {
            Initializer::Expression(expression) => self.expression(expression),
            Initializer::List(items) => {
                for item in items {
                    self.initializer(item);
                }
            }
        }
    }

    fn declaration(&mut self, declaration: &'a Declaration) {
        let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind else {
            return;
        };
        for declarator in &list.declarators {
            if let Some(ref initializer) = declarator.initializer {
                let symbol = self.analysis.declarations.get(&declarator.id).copied();
                self.assign_initializer(symbol, initializer);
            }
        }
        for declarator in &list.declarators {
            if let Some(ref array) = declarator.array {
                for dimension in &array.dimensions {
                    if let rglsl_ast::ast::ArrayDimension::Sized(ref size) = dimension.node {
                        self.expression(size);
                    }
                }
            }
        }
    }

    fn condition(&mut self, condition: &'a Condition) {
        match condition {
            Condition::Expression(expression) => self.expression(expression),
            Condition::Declaration(declaration) => {
                let symbol = self.analysis.declarations.get(&declaration.id).copied();
                self.assign_initializer(symbol, &declaration.initializer);
            }
        }
    }

    fn statement(&mut self, statement: &'a Statement) {
        match statement.kind {
            StatementKind::Compound(ref compound) => {
                for inner in &compound.statements {
                    self.statement(inner);
                }
            }
            StatementKind::Declaration(ref declaration) => self.declaration(declaration),
            StatementKind::Expression(ref expression) => {
                if let Some(expression) = expression {
                    self.expression(expression);
                }
            }
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => {
                self.expression(condition);
                self.statement(then_branch);
                if let Some(else_branch) = else_branch {
                    self.statement(else_branch);
                }
            }
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => {
                self.expression(selector);
                for inner in statements {
                    self.statement(inner);
                }
            }
            StatementKind::CaseLabel(ref label) => {
                if let rglsl_ast::ast::CaseLabel::Case(ref value) = *label {
                    self.expression(value);
                }
            }
            StatementKind::While {
                ref condition,
                ref body,
            } => {
                self.condition(condition);
                self.statement(body);
            }
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => {
                self.statement(body);
                self.expression(condition);
            }
            StatementKind::For(ref looping) => {
                self.statement(&looping.init);
                if let Some(ref condition) = looping.condition {
                    self.condition(condition);
                }
                if let Some(ref increment) = looping.increment {
                    self.expression(increment);
                }
                self.statement(&looping.body);
            }
            StatementKind::Jump(JumpStatement::Return(Some(ref value))) => {
                self.expression(value);
                let participating = self.ty(value).is_some_and(|ty| participates(ty, false));
                if participating
                    && self.return_precision != Precision::None
                    && self.visible(value) == Precision::None
                {
                    let precision = self.return_precision;
                    self.propagate(value, precision);
                }
            }
            StatementKind::Jump(_) => {}
            StatementKind::Attributed { ref statement, .. } => self.statement(statement),
        }
    }
}
