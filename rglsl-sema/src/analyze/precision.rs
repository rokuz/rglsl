use alloc::vec::Vec;
use rglsl_types::{FastHashMap, FastHashSet};

use rglsl_ast::TranslationUnit;
use rglsl_ast::ast::{
    AssignmentOperator, BinaryOperator, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FunctionIdentifier, Initializer, JumpStatement, NodeId,
    PrecisionQualifier, Statement, StatementKind, UnaryOperator,
};

use super::{Analysis, Callee};
use crate::builtins::{BuiltinFlags, BuiltinFunction};
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
    pub results: FastHashSet<NodeId>,
    pub conversions: FastHashSet<NodeId>,
}

fn builtin_result(entry: Option<&BuiltinFunction>, name: &str) -> Precision {
    match entry {
        Some(entry) if entry.has(BuiltinFlags::HIGHP_RESULT) => Precision::High,
        Some(entry) if entry.has(BuiltinFlags::LOWP_RESULT) => Precision::Low,
        None if name == "stencilAttachmentReadEXT" => Precision::Low,
        Some(_) | None => Precision::None,
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

fn counted_arguments(entry: Option<&BuiltinFunction>, name: &str, count: usize) -> usize {
    match entry.and_then(|entry| entry.precision_operands) {
        Some(limit) => count.min(limit),
        None if name.starts_with("interpolateAt") => count.min(1),
        None => count,
    }
}

fn symbol_precision(analysis: &Analysis, symbol: SymbolId) -> Precision {
    let Some(found) = analysis.symbol(symbol) else {
        return Precision::None;
    };
    match found.kind {
        SymbolKind::Variable(ref variable) => Precision::of(variable.qualifiers.precision),
        SymbolKind::BlockMember { instance, index } => {
            let Some(TypeKind::Block(block)) = analysis
                .symbol(instance)
                .and_then(|symbol| symbol.variable())
                .map(|variable| variable.ty.kind)
            else {
                return Precision::None;
            };
            analysis
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

fn relaxes_symbols(analysis: &Analysis) -> bool {
    analysis
        .references
        .values()
        .chain(analysis.declarations.values())
        .any(|&symbol| symbol_precision(analysis, symbol).relaxed())
}

fn relaxes_members(analysis: &Analysis) -> bool {
    let structs = analysis
        .types
        .structs()
        .iter()
        .flat_map(|structure| &structure.members);
    let blocks = analysis
        .types
        .blocks()
        .iter()
        .flat_map(|block| &block.members);
    structs
        .chain(blocks)
        .any(|member| Precision::of(member.qualifiers.precision).relaxed())
}

fn relaxes_returns(analysis: &Analysis) -> bool {
    analysis
        .functions
        .iter()
        .any(|function| Precision::of(function.return_qualifiers.precision).relaxed())
}

fn relaxes_builtin_results(analysis: &Analysis) -> bool {
    analysis.calls.values().any(|callee| match *callee {
        Callee::Builtin(id) => analysis.builtins.function(id).is_some_and(|function| {
            builtin_result(analysis.builtins.entry(id), &function.name).relaxed()
        }),
        _ => false,
    })
}

fn has_relaxed_source(analysis: &Analysis) -> bool {
    relaxes_symbols(analysis)
        || relaxes_members(analysis)
        || relaxes_returns(analysis)
        || relaxes_builtin_results(analysis)
}

pub(crate) fn relaxed_precision(unit: &TranslationUnit, analysis: &Analysis) -> RelaxedPrecision {
    if has_relaxed_source(analysis) {
        walk(unit, analysis)
    } else {
        RelaxedPrecision::default()
    }
}

fn walk(unit: &TranslationUnit, analysis: &Analysis) -> RelaxedPrecision {
    let mut pass = Pass {
        analysis,
        own: FastHashMap::default(),
        operation: FastHashMap::default(),
        conversion: FastHashMap::default(),
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
                for statement in &definition.kind.body.node.statements {
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
    own: FastHashMap<NodeId, Precision>,
    operation: FastHashMap<NodeId, Precision>,
    conversion: FastHashMap<NodeId, Precision>,
    return_precision: Precision,
}

fn strip(expression: &Expression) -> &Expression {
    let mut current = expression;
    while let ExpressionKind::Parenthesized(ref inner) = current.kind {
        current = inner;
    }
    current
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
            .as_deref()
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
            if converting && let Some(target) = self.converted(expression) {
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
                    .map_or(Precision::None, |symbol| {
                        symbol_precision(self.analysis, *symbol)
                    });
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
                let entry = analysis.builtins.entry(*id);
                let counted = counted_arguments(entry, name, arguments.len());
                let mut operation = arguments
                    .iter()
                    .take(counted)
                    .map(|argument| self.visible(argument))
                    .max()
                    .unwrap_or_default();
                if entry.is_some_and(|entry| entry.has(BuiltinFlags::HIGHP_OPERANDS)) {
                    operation = Precision::High;
                }
                let result = if is_sampling(name) || matches!(name, "imageLoad" | "imageStore") {
                    arguments
                        .first()
                        .map_or(Precision::None, |first| self.visible(first))
                } else if function.return_type.is_bool() {
                    Precision::None
                } else {
                    match builtin_result(entry, name) {
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
        let precision = symbol_precision(self.analysis, symbol).max(self.visible(value));
        if precision != Precision::None {
            self.propagate(value, precision);
        }
    }

    fn initializer(&mut self, initializer: &'a Initializer) {
        let mut pending = Vec::from([initializer]);
        while let Some(initializer) = pending.pop() {
            match initializer {
                Initializer::Expression(expression) => self.expression(expression),
                Initializer::List(items) => {
                    pending.extend(items.iter().rev().map(|item| &item.node));
                }
            }
        }
    }

    fn declaration(&mut self, declaration: &'a Declaration) {
        let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind else {
            return;
        };
        for declarator in &list.declarators {
            if let Some(ref initializer) = declarator.kind.initializer {
                let symbol = self.analysis.declarations.get(&declarator.id).copied();
                self.assign_initializer(symbol, &initializer.node);
            }
        }
        for declarator in &list.declarators {
            if let Some(ref array) = declarator.kind.array {
                for dimension in &array.node.dimensions {
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
                self.assign_initializer(symbol, &declaration.kind.initializer.node);
            }
        }
    }

    fn statement(&mut self, statement: &'a Statement) {
        let mut pending = Vec::from([Step::Statement(statement)]);
        while let Some(step) = pending.pop() {
            match step {
                Step::Statement(statement) => self.statement_step(statement, &mut pending),
                Step::Expression(expression) => self.expression(expression),
                Step::Condition(condition) => self.condition(condition),
            }
        }
    }

    fn statement_step(&mut self, statement: &'a Statement, pending: &mut Vec<Step<'a>>) {
        match statement.kind {
            StatementKind::Compound(ref compound) => {
                pending.extend(compound.statements.iter().rev().map(Step::Statement));
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
                if let Some(else_branch) = else_branch {
                    pending.push(Step::Statement(else_branch));
                }
                pending.push(Step::Statement(then_branch));
            }
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => {
                self.expression(selector);
                pending.extend(statements.iter().rev().map(Step::Statement));
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
                pending.push(Step::Statement(body));
            }
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => {
                pending.push(Step::Expression(condition));
                pending.push(Step::Statement(body));
            }
            StatementKind::For(ref looping) => {
                pending.push(Step::Statement(&looping.body));
                if let Some(ref increment) = looping.increment {
                    pending.push(Step::Expression(increment));
                }
                if let Some(ref condition) = looping.condition {
                    pending.push(Step::Condition(condition));
                }
                pending.push(Step::Statement(&looping.init));
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
            StatementKind::Attributed { ref statement, .. } => {
                pending.push(Step::Statement(statement));
            }
        }
    }
}

enum Step<'a> {
    Statement(&'a Statement),
    Expression(&'a Expression),
    Condition(&'a Condition),
}

#[cfg(test)]
mod tests {
    use alloc::boxed::Box;
    use alloc::collections::BTreeMap;
    use alloc::format;
    use alloc::sync::Arc;

    use rglsl_types::ShaderStage;

    use super::{has_relaxed_source, walk};
    use crate::{Builtins, Options, ResourceLimits, analyze, analyze_with_builtins};

    type TestResult<T = ()> = Result<T, Box<dyn core::error::Error>>;

    const FRAGMENT: &str =
        "#version 450\nlayout(location = 0) in float v;\nlayout(location = 0) out vec4 o;\n";

    fn sources(source: &str, stage: ShaderStage) -> TestResult<(bool, bool)> {
        let unit = rglsl_ast::parse(source)?;
        let analysis = analyze(&unit, &Options::new(stage));
        if !analysis.is_ok() {
            return Err(format!("{source}: {:?}", analysis.diagnostics).into());
        }
        let walked = walk(&unit, &analysis);
        let relaxed = !walked.results.is_empty() || !walked.conversions.is_empty();
        Ok((has_relaxed_source(&analysis), relaxed))
    }

    #[test]
    fn every_kind_of_relaxed_source_is_found() -> TestResult {
        let fragment = [
            "void main() { mediump float a = v; o = vec4(a + a); }",
            "precision mediump float;\nvoid main() { float a = v; o = vec4(a * a); }",
            "struct S { mediump float x; };\nvoid main() { S s; s.x = v; o = vec4(s.x * 2.0); }",
            "layout(binding = 0) uniform B { mediump float x; } b;\nvoid main() { o = vec4(b.x * v); }",
            "mediump float f(float x) { return x * 2.0; }\nvoid main() { o = vec4(f(v)); }",
        ];
        for body in fragment {
            let source = format!("{FRAGMENT}{body}\n");
            assert_eq!(
                sources(&source, ShaderStage::Fragment)?,
                (true, true),
                "{source}"
            );
        }
        let subgroup = "#version 450\n#extension GL_KHR_shader_subgroup_basic : require\nlayout(local_size_x = 1) in;\nlayout(binding = 0) buffer B { uint r; };\nvoid main() { r = gl_SubgroupSize * 2u; }\n";
        assert_eq!(sources(subgroup, ShaderStage::Compute)?, (true, true));
        let tile = "#version 460\n#extension GL_EXT_shader_tile_image : require\nlayout(location = 0) out uvec4 s;\nvoid main() { uint value = stencilAttachmentReadEXT(); s = uvec4(value + 1u); }\n";
        assert_eq!(sources(tile, ShaderStage::Fragment)?, (true, true));
        Ok(())
    }

    #[test]
    fn without_a_relaxed_source_nothing_is_relaxed() -> TestResult {
        let mut builtins: BTreeMap<(bool, ShaderStage), Arc<Builtins>> = BTreeMap::new();
        let mut skipped = 0;
        for case in crate::tests::cases()? {
            let Ok(unit) = rglsl_ast::parse(&case.source) else {
                continue;
            };
            let glsl_460 = case.source.starts_with("#version 460");
            let table = builtins.entry((glsl_460, case.stage)).or_insert_with(|| {
                let version = if glsl_460 { 460 } else { 450 };
                Arc::new(Builtins::new(
                    version,
                    case.stage,
                    &ResourceLimits::default(),
                ))
            });
            let analysis = analyze_with_builtins(&unit, &Options::new(case.stage), table);
            if has_relaxed_source(&analysis) {
                continue;
            }
            skipped += 1;
            let walked = walk(&unit, &analysis);
            assert!(
                walked.results.is_empty() && walked.conversions.is_empty(),
                "{}",
                case.source
            );
        }
        assert!(skipped > 100, "{skipped}");
        Ok(())
    }
}
