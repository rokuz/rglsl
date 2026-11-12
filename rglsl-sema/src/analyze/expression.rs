use alloc::string::String;
use alloc::vec::Vec;
use core::cell::RefCell;

use rglsl_types::stack::run;

use rglsl_ast::ast::{
    AssignmentOperator, BinaryOperator, Expression, ExpressionKind, FunctionIdentifier, Identifier,
    NumericKind, NumericLiteral, UnaryOperator,
};
use rglsl_ast::{Chain, Span, Spine};

use super::frames::Cx;
use super::{Analyzer, ExpressionInfo, Operand, Place};
use crate::builtins::Stage;
use crate::constant::{fold_binary, fold_linear, fold_unary, Constant, Linear, Value};
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Lookup, Origin, Qualifiers, Storage, SymbolId, SymbolKind};
use crate::types::{ArraySize, BlockStorage, NumericFeatures, Scalar, Type, TypeKind};

impl<'b> Cx<'b, Analyzer<'_>> {
    pub(crate) async fn value_expression(self, expression: &'b Expression) -> Operand {
        self.call(self.clone().expression(expression)).await
    }

    pub(crate) async fn expression(self, expression: &'b Expression) -> Operand {
        match expression.kind.chain() {
            Some(Chain::Binary) => self.call(self.clone().binary_chain(expression)).await,
            Some(Chain::Unary | Chain::Postfix) => {
                self.call(self.clone().operand_chain(expression)).await
            }
            Some(Chain::Assignment | Chain::Conditional) => {
                self.call(self.clone().right_chain(expression)).await
            }
            None => {
                let uses = self.with(|analyzer| analyzer.specialization_uses);
                let operand = self.call(self.clone().expression_kind(expression)).await;
                self.with(|analyzer| analyzer.recorded(expression, uses, operand))
            }
        }
    }

    async fn binary_chain(self, expression: &'b Expression) -> Operand {
        let uses = self.with(|analyzer| analyzer.specialization_uses);
        let spine = Spine::of(expression);
        let mut operand = self.call(self.clone().value_expression(spine.head)).await;
        for node in spine.links.into_iter().rev() {
            if let ExpressionKind::Binary {
                operator,
                left,
                right,
            } = &node.kind
            {
                let span = Span::new(left.span.end, right.span.start);
                let right_operand = self.call(self.clone().value_expression(right)).await;
                operand = self.with(|analyzer| {
                    analyzer.binary_checked(*operator, left, right, span, operand, right_operand)
                });
            }
            operand = self.with(|analyzer| analyzer.recorded(node, uses, operand));
        }
        operand
    }

    async fn operand_chain(self, expression: &'b Expression) -> Operand {
        let uses = self.with(|analyzer| analyzer.specialization_uses);
        let spine = Spine::of(expression);
        let mut operand = self.call(self.clone().expression(spine.head)).await;
        for node in spine.links.into_iter().rev() {
            operand = self.call(self.clone().operand_link(node, operand)).await;
            operand = self.with(|analyzer| analyzer.recorded(node, uses, operand));
        }
        operand
    }

    async fn operand_link(self, node: &'b Expression, operand: Operand) -> Operand {
        let span = node.span;
        match &node.kind {
            ExpressionKind::Unary {
                operator: operator @ (UnaryOperator::Increment | UnaryOperator::Decrement),
                operand: inner,
            } => self.with(|analyzer| {
                analyzer.increment_checked(span, inner, operator.symbol(), operand)
            }),
            ExpressionKind::Unary { operator, .. } => {
                self.with(|analyzer| analyzer.unary_checked(span, *operator, operand))
            }
            ExpressionKind::Subscript { base, index } => {
                let span = Span::new(base.span.end, index.span.start);
                let index_operand = self.call(self.clone().value_expression(index)).await;
                self.with(|analyzer| {
                    analyzer.subscript_checked(base, index, span, operand, index_operand)
                })
            }
            ExpressionKind::FieldSelection { field, .. } => {
                self.with(|analyzer| analyzer.field_checked(field, operand))
            }
            ExpressionKind::Postfix {
                operand: inner,
                operator,
            } => self.with(|analyzer| {
                analyzer.increment_checked(
                    Span::new(inner.span.end, span.end),
                    inner,
                    operator.symbol(),
                    operand,
                )
            }),
            _ => operand,
        }
    }

    async fn right_chain(self, expression: &'b Expression) -> Operand {
        let spine = Spine::of(expression);
        let mut pending = Vec::with_capacity(spine.links.len());
        for node in spine.links {
            let uses = self.with(|analyzer| analyzer.specialization_uses);
            let first = match &node.kind {
                ExpressionKind::Assignment { target, .. } => {
                    self.call(self.clone().expression(target)).await
                }
                ExpressionKind::Conditional {
                    condition,
                    then_expression,
                    ..
                } => {
                    let condition_operand =
                        self.call(self.clone().value_expression(condition)).await;
                    let then_operand = self.call(self.clone().expression(then_expression)).await;
                    pending.push((node, uses, condition_operand));
                    then_operand
                }
                _ => Operand::error(),
            };
            pending.push((node, uses, first));
        }
        let mut operand = self.call(self.clone().expression(spine.head)).await;
        while let Some((node, uses, first)) = pending.pop() {
            operand = match &node.kind {
                ExpressionKind::Assignment {
                    operator,
                    target,
                    value,
                } => {
                    let span = Span::new(target.span.end, value.span.start);
                    self.with(|analyzer| {
                        analyzer.assignment_checked(*operator, target, value, span, first, operand)
                    })
                }
                ExpressionKind::Conditional {
                    condition,
                    then_expression,
                    else_expression,
                } => {
                    let condition_operand = pending
                        .pop()
                        .map_or_else(Operand::error, |(_, _, condition)| condition);
                    let span = Span::new(condition.span.end, then_expression.span.start);
                    self.with(|analyzer| {
                        analyzer.conditional_checked(
                            then_expression,
                            else_expression,
                            span,
                            condition_operand,
                            first,
                            operand,
                        )
                    })
                }
                _ => operand,
            };
            operand = self.with(|analyzer| analyzer.recorded(node, uses, operand));
        }
        operand
    }

    async fn expression_kind(self, expression: &'b Expression) -> Operand {
        let span = expression.span;
        match &expression.kind {
            ExpressionKind::Variable(name) => {
                self.with(|analyzer| analyzer.variable(expression, name))
            }
            ExpressionKind::Number(number) => self.with(|analyzer| analyzer.number(span, number)),
            ExpressionKind::Bool(value) => {
                Operand::constant(Type::BOOL, Some(Constant::single(Value::Bool(*value))))
            }
            ExpressionKind::String(_) => Operand::constant(Type::STRING, None),
            ExpressionKind::Parenthesized(inner) => self.call(self.clone().expression(inner)).await,
            ExpressionKind::FunctionCall(call) => {
                self.call(self.clone().call_expression(expression, call))
                    .await
            }
            ExpressionKind::Sequence(expressions) => {
                self.call(self.clone().sequence(expressions)).await
            }
            ExpressionKind::Subscript { .. }
            | ExpressionKind::FieldSelection { .. }
            | ExpressionKind::Postfix { .. }
            | ExpressionKind::Unary { .. }
            | ExpressionKind::Binary { .. }
            | ExpressionKind::Conditional { .. }
            | ExpressionKind::Assignment { .. } => Operand::error(),
        }
    }

    async fn sequence(self, expressions: &'b [Expression]) -> Operand {
        let mut last = Operand::error();
        for expression in expressions {
            last = self.call(self.clone().expression(expression)).await;
        }
        Operand::temporary(last.ty)
    }
}

pub(crate) const SHADER_64BIT_INDEXING: &str = "GL_EXT_shader_64bit_indexing";
use rglsl_ast::extensions::Feature;

const SWIZZLE_SETS: [&str; 3] = ["xyzw", "rgba", "stpq"];

fn parse_integer(digits: &str) -> Option<u64> {
    if let Some(hex) = digits
        .strip_prefix("0x")
        .or_else(|| digits.strip_prefix("0X"))
    {
        u64::from_str_radix(hex, 16).ok()
    } else if digits.len() > 1 && digits.starts_with('0') {
        u64::from_str_radix(digits, 8).ok()
    } else {
        digits.parse::<u64>().ok()
    }
}

pub(crate) fn literal(number: &NumericLiteral) -> Option<Operand> {
    let digits = number.digits();
    let integer = |scalar: Scalar, limit: u64| {
        let parsed = parse_integer(digits)?;
        let decimal = !digits.starts_with('0') || digits.len() == 1;
        if parsed > limit && (decimal || parsed > u64::from(u32::MAX)) {
            return None;
        }
        let value = Value::integer(scalar, i128::from(parsed));
        Some(Operand::constant(
            Type::scalar(scalar),
            Some(Constant::single(value)),
        ))
    };
    let floating = |scalar: Scalar| {
        let value = digits
            .parse::<f64>()
            .ok()
            .map(|value| Constant::single(Value::floating(scalar, value)));
        Some(Operand::constant(Type::scalar(scalar), value))
    };
    match number.kind {
        NumericKind::Int => integer(Scalar::Int, u64::from(u32::MAX)),
        NumericKind::Uint => integer(Scalar::Uint, u64::from(u32::MAX)),
        NumericKind::Int16 => integer(Scalar::Int16, u64::from(u16::MAX)),
        NumericKind::Uint16 => integer(Scalar::Uint16, u64::from(u16::MAX)),
        NumericKind::Int64 => integer(Scalar::Int64, u64::MAX),
        NumericKind::Uint64 => integer(Scalar::Uint64, u64::MAX),
        NumericKind::Float => floating(Scalar::Float),
        NumericKind::Double => floating(Scalar::Double),
        NumericKind::Float16 => floating(Scalar::Float16),
        NumericKind::FloatE2M1 => floating(Scalar::FloatE2M1),
        NumericKind::FloatE3M2 => floating(Scalar::FloatE3M2),
        NumericKind::FloatE2M3 => floating(Scalar::FloatE2M3),
        NumericKind::FloatUE8M0 => floating(Scalar::FloatUE8M0),
        NumericKind::FloatMXINT8 => floating(Scalar::FloatMXINT8),
    }
}

const fn literal_feature(kind: NumericKind) -> Option<(Feature, &'static str)> {
    match kind {
        NumericKind::Int64 => Some((Feature::Int64Literal, "64-bit literal")),
        NumericKind::Uint64 => Some((Feature::Int64Literal, "64-bit unsigned literal")),
        NumericKind::Int16 => Some((Feature::Int16Literal, "16-bit literal")),
        NumericKind::Uint16 => Some((Feature::Int16Literal, "16-bit unsigned literal")),
        NumericKind::Float16 => Some((Feature::Float16Literal, "half floating-point suffix")),
        NumericKind::FloatE2M1 => Some((Feature::FloatE2M1Type, "fe2m1 literal")),
        NumericKind::FloatE3M2 => Some((Feature::FloatE3M2Type, "fe3m2 literal")),
        NumericKind::FloatE2M3 => Some((Feature::FloatE2M3Type, "fe2m3 literal")),
        NumericKind::FloatUE8M0 => Some((Feature::FloatUE8M0Type, "fue8m0 literal")),
        NumericKind::FloatMXINT8 => Some((Feature::FloatMXINT8Type, "fmxint8 literal")),
        NumericKind::Int | NumericKind::Uint | NumericKind::Float | NumericKind::Double => None,
    }
}

fn componentwise_shape(left: &Type, right: &Type, scalar: Scalar) -> Option<Type> {
    match (left.kind, right.kind) {
        (TypeKind::Scalar(_), _) => Some(right.with_scalar(scalar)),
        (_, TypeKind::Scalar(_)) => Some(left.with_scalar(scalar)),
        _ if left.same_shape(right) => Some(left.with_scalar(scalar)),
        _ => None,
    }
}

fn multiply_shape(left: &Type, right: &Type, scalar: Scalar) -> Option<Type> {
    match (left.kind, right.kind) {
        (
            TypeKind::Matrix {
                columns: left_columns,
                rows: left_rows,
                ..
            },
            TypeKind::Matrix {
                columns: right_columns,
                rows: right_rows,
                ..
            },
        ) => (left_columns == right_rows).then(|| Type::matrix(scalar, right_columns, left_rows)),
        (TypeKind::Matrix { columns, rows, .. }, TypeKind::Vector { size, .. }) => {
            (columns == size).then(|| Type::vector(scalar, rows))
        }
        (TypeKind::Vector { size, .. }, TypeKind::Matrix { columns, rows, .. }) => {
            (rows == size).then(|| Type::vector(scalar, columns))
        }
        _ => componentwise_shape(left, right, scalar),
    }
}

pub(crate) struct BinaryResult {
    pub ty: Type,
    pub left: Type,
    pub right: Type,
    pub foldable: bool,
}

const fn linear_shape(ty: &Type) -> Option<Linear> {
    match ty.kind {
        TypeKind::Vector { size, .. } => Some(Linear::Vector(size as usize)),
        TypeKind::Matrix { columns, rows, .. } => Some(Linear::Matrix {
            columns: columns as usize,
            rows: rows as usize,
        }),
        _ => None,
    }
}

pub(crate) fn binary_types(
    operator: BinaryOperator,
    left: &Type,
    right: &Type,
    features: NumericFeatures,
) -> Option<BinaryResult> {
    let common_scalar = |left: Scalar, right: Scalar| left.common(right, features);
    use BinaryOperator as Op;
    if left.is_array() || right.is_array() {
        return None;
    }
    let encoded = |ty: &Type| ty.base_scalar().is_some_and(Scalar::is_encoded_float);
    if encoded(left) || encoded(right) {
        return None;
    }
    if let Some(result) = cooperative_binary_types(operator, left, right, features) {
        return result;
    }
    let left_scalar = left.base_scalar()?;
    let right_scalar = right.base_scalar()?;
    let is_matrix = |ty: &Type| matches!(ty.kind, TypeKind::Matrix { .. });
    let converted = |scalar: Scalar, ty: Type, foldable: bool| BinaryResult {
        ty,
        left: left.with_scalar(scalar),
        right: right.with_scalar(scalar),
        foldable,
    };
    match operator {
        Op::Add | Op::Subtract | Op::Divide => {
            let scalar = common_scalar(left_scalar, right_scalar)?;
            let ty = componentwise_shape(left, right, scalar)?;
            Some(converted(scalar, ty, true))
        }
        Op::Multiply => {
            let scalar = common_scalar(left_scalar, right_scalar)?;
            let ty = multiply_shape(left, right, scalar)?;
            let linear =
                (is_matrix(left) && !right.is_scalar()) || (is_matrix(right) && !left.is_scalar());
            Some(converted(scalar, ty, !linear))
        }
        Op::Modulo | Op::BitAnd | Op::BitOr | Op::BitXor => {
            if !left_scalar.is_integer()
                || !right_scalar.is_integer()
                || is_matrix(left)
                || is_matrix(right)
            {
                return None;
            }
            let scalar = common_scalar(left_scalar, right_scalar)?;
            let ty = componentwise_shape(left, right, scalar)?;
            Some(converted(scalar, ty, true))
        }
        Op::ShiftLeft | Op::ShiftRight => {
            if !left_scalar.is_integer()
                || !right_scalar.is_integer()
                || is_matrix(left)
                || is_matrix(right)
            {
                return None;
            }
            if !right.is_scalar() && !left.same_shape(right) {
                return None;
            }
            Some(BinaryResult {
                ty: left.clone(),
                left: left.clone(),
                right: right.clone(),
                foldable: true,
            })
        }
        Op::Less | Op::Greater | Op::LessEqual | Op::GreaterEqual => {
            if !left.is_scalar() || !right.is_scalar() {
                return None;
            }
            let scalar = common_scalar(left_scalar, right_scalar)?;
            Some(converted(scalar, Type::BOOL, true))
        }
        Op::LogicalAnd | Op::LogicalOr | Op::LogicalXor => (left.is_bool() && right.is_bool())
            .then_some(BinaryResult {
                ty: Type::BOOL,
                left: Type::BOOL,
                right: Type::BOOL,
                foldable: true,
            }),
        Op::Equal | Op::NotEqual => None,
    }
}

fn cooperative_binary_types(
    operator: BinaryOperator,
    left: &Type,
    right: &Type,
    features: NumericFeatures,
) -> Option<Option<BinaryResult>> {
    use BinaryOperator as Op;
    if left.is_cooperative_vector() || right.is_cooperative_vector() {
        return Some(cooperative_vector_binary_types(
            operator, left, right, features,
        ));
    }
    let left_matrix = left.as_cooperative_matrix();
    let right_matrix = right.as_cooperative_matrix();
    if left_matrix.is_none() && right_matrix.is_none() {
        return None;
    }
    let arithmetic = matches!(operator, Op::Add | Op::Subtract | Op::Multiply | Op::Divide);
    Some(match (left_matrix, right_matrix) {
        (Some(_), Some(_)) => (arithmetic && left == right).then(|| BinaryResult {
            ty: left.clone(),
            left: left.clone(),
            right: right.clone(),
            foldable: false,
        }),
        (Some(matrix), None) | (None, Some(matrix)) => {
            let (scalar, matrix_ty) = if left_matrix.is_some() {
                (right, left)
            } else {
                (left, right)
            };
            let target = Type::scalar(matrix.scalar);
            (operator == Op::Multiply
                && scalar.is_scalar()
                && scalar.converts_with(&target, features))
            .then(|| BinaryResult {
                ty: matrix_ty.clone(),
                left: if left_matrix.is_some() {
                    left.clone()
                } else {
                    target.clone()
                },
                right: if right_matrix.is_some() {
                    right.clone()
                } else {
                    target
                },
                foldable: false,
            })
        }
        (None, None) => None,
    })
}

fn cooperative_vector_binary_types(
    operator: BinaryOperator,
    left: &Type,
    right: &Type,
    features: NumericFeatures,
) -> Option<BinaryResult> {
    use BinaryOperator as Op;
    let same = |ty: &Type| BinaryResult {
        ty: ty.clone(),
        left: ty.clone(),
        right: ty.clone(),
        foldable: true,
    };
    if left.is_cooperative_vector() && right.is_cooperative_vector() {
        if left != right {
            return None;
        }
        let integer = left.base_scalar().is_some_and(Scalar::is_integer);
        return match operator {
            Op::Add | Op::Subtract | Op::Multiply | Op::Divide => Some(same(left)),
            Op::Modulo | Op::BitAnd | Op::BitOr | Op::BitXor | Op::ShiftLeft | Op::ShiftRight
                if integer =>
            {
                Some(same(left))
            }
            _ => None,
        };
    }
    if operator != Op::Multiply {
        return None;
    }
    let (vector, scalar) = if left.is_cooperative_vector() {
        (left, right)
    } else {
        (right, left)
    };
    let target = Type::scalar(vector.base_scalar()?);
    if !scalar.is_scalar() || !scalar.converts_with(&target, features) {
        return None;
    }
    let converted = |ty: &Type| {
        if ty.is_cooperative_vector() {
            ty.clone()
        } else {
            target.clone()
        }
    };
    Some(BinaryResult {
        ty: vector.clone(),
        left: converted(left),
        right: converted(right),
        foldable: true,
    })
}

const fn compound_operator(operator: AssignmentOperator) -> Option<BinaryOperator> {
    Some(match operator {
        AssignmentOperator::Assign => return None,
        AssignmentOperator::Multiply => BinaryOperator::Multiply,
        AssignmentOperator::Divide => BinaryOperator::Divide,
        AssignmentOperator::Modulo => BinaryOperator::Modulo,
        AssignmentOperator::Add => BinaryOperator::Add,
        AssignmentOperator::Subtract => BinaryOperator::Subtract,
        AssignmentOperator::ShiftLeft => BinaryOperator::ShiftLeft,
        AssignmentOperator::ShiftRight => BinaryOperator::ShiftRight,
        AssignmentOperator::BitAnd => BinaryOperator::BitAnd,
        AssignmentOperator::BitXor => BinaryOperator::BitXor,
        AssignmentOperator::BitOr => BinaryOperator::BitOr,
    })
}

impl Analyzer<'_> {
    pub(crate) fn value_expression(&mut self, expression: &Expression) -> Operand {
        self.expression(expression)
    }

    pub(crate) fn expression(&mut self, expression: &Expression) -> Operand {
        let finished = {
            let analyzer = RefCell::new(&mut *self);
            run(|stack| Cx::new(&analyzer, stack).expression(expression))
        };
        finished.unwrap_or_else(|| self.stalled(Operand::error()))
    }

    fn forget_component_values(&mut self, expression: &Expression) {
        let ExpressionKind::FunctionCall(ref call) = expression.kind else {
            return;
        };
        if !matches!(call.function.node, FunctionIdentifier::Constructor(_)) {
            return;
        }
        for argument in &call.arguments {
            if let Some(info) = self.expressions.get_mut(&argument.id) {
                info.value = None;
            }
        }
    }

    fn recorded(&mut self, expression: &Expression, uses: u32, operand: Operand) -> Operand {
        let mut operand = operand;
        let direct = matches!(
            expression.kind,
            ExpressionKind::Variable(_) | ExpressionKind::Parenthesized(_)
        );
        if self.specialization_uses != uses && !direct {
            operand.specialization = operand.constant;
            operand.value = None;
        }
        if operand.value.is_some() && !operand.ty.contains_reference(&self.types) {
            self.forget_component_values(expression);
        }
        self.expressions.insert(
            expression.id,
            ExpressionInfo {
                ty: operand.ty.clone(),
                is_lvalue: operand.place == Place::Writable,
                is_constant: operand.constant,
                is_specialization: operand.constant && operand.specialization,
                non_uniform: operand.non_uniform,
                value: operand.value.clone(),
                conversion: None,
                output_conversion: None,
            },
        );
        operand
    }

    fn number(&mut self, span: Span, number: &rglsl_ast::ast::NumericLiteral) -> Operand {
        if let Some((feature, what)) = literal_feature(number.kind) {
            self.require_feature(span, feature, what);
        }
        literal(number).unwrap_or_else(|| {
            self.error(span, DiagnosticKind::LiteralTooBig(number.text.clone()));
            Operand::error()
        })
    }

    fn variable_place(&self, id: SymbolId) -> (Place, Storage) {
        let Some(symbol) = self.symbol(id) else {
            return (Place::Temporary, Storage::None);
        };
        match &symbol.kind {
            SymbolKind::Variable(variable) => {
                let qualifiers = &variable.qualifiers;
                let block_storage = match variable.ty.kind {
                    TypeKind::Block(block) => self.types.block(block).map(|block| block.storage),
                    _ => None,
                };
                let storage = match block_storage {
                    Some(BlockStorage::Uniform) => Storage::Uniform,
                    Some(BlockStorage::Buffer) => Storage::Buffer,
                    Some(BlockStorage::In) => Storage::In,
                    Some(BlockStorage::Out) => Storage::Out,
                    Some(BlockStorage::ResourceHeap) => Storage::ResourceHeap,
                    Some(BlockStorage::SamplerHeap) => Storage::SamplerHeap,
                    Some(ray) => super::ray::storage_of_block(ray).unwrap_or(Storage::None),
                    None => qualifiers.storage,
                };
                let shader_record = match variable.ty.kind {
                    TypeKind::Block(block) => self
                        .types
                        .block(block)
                        .is_some_and(|block| super::ray::is_shader_record(&block.qualifiers)),
                    _ => false,
                };
                let place = if qualifiers.constant {
                    Place::ReadOnly("it is `const`")
                } else if matches!(storage, Storage::ResourceHeap | Storage::SamplerHeap) {
                    Place::ReadOnly("it is a descriptor heap")
                } else if storage == Storage::Uniform {
                    Place::ReadOnly("it is a uniform")
                } else if shader_record {
                    Place::ReadOnly("can't modify a shaderrecordnv qualified buffer")
                } else if storage == Storage::HitAttribute && !self.stage_is(Stage::Intersection) {
                    Place::ReadOnly("cannot modify hitAttributeNV in this stage")
                } else if storage == Storage::TaskPayloadShared && self.stage_is(Stage::Mesh) {
                    Place::ReadOnly(
                        "can't modify variable with storage qualifier taskPayloadSharedEXT in mesh shaders",
                    )
                } else if storage == Storage::In && variable.origin != Origin::Parameter {
                    Place::ReadOnly("it is a shader input")
                } else if qualifiers.readonly && !variable.ty.is_opaque() {
                    Place::ReadOnly("it is read-only")
                } else if variable.ty.is_opaque() {
                    Place::ReadOnly("it has an opaque type")
                } else {
                    Place::Writable
                };
                (place, storage)
            }
            SymbolKind::BlockMember { instance, index } => {
                let (place, storage) = self.variable_place(*instance);
                let readonly = self
                    .symbol(*instance)
                    .and_then(|symbol| symbol.variable())
                    .and_then(|variable| match variable.ty.kind {
                        TypeKind::Block(block) => self.types.block(block),
                        _ => None,
                    })
                    .and_then(|block| block.members.get(usize::try_from(*index).ok()?))
                    .is_some_and(|member| member.qualifiers.readonly);
                if readonly && place == Place::Writable {
                    (Place::ReadOnly("it is read-only"), storage)
                } else {
                    (place, storage)
                }
            }
            SymbolKind::Struct(_)
            | SymbolKind::Reference(_)
            | SymbolKind::BufferType(_)
            | SymbolKind::BlockName => (Place::Temporary, Storage::None),
        }
    }

    fn is_writeonly(&self, id: SymbolId) -> bool {
        match self.symbol(id).map(|symbol| &symbol.kind) {
            Some(SymbolKind::Variable(variable)) => {
                variable.qualifiers.writeonly && !variable.ty.is_opaque()
            }
            Some(SymbolKind::BlockMember { instance, index }) => {
                self.is_writeonly(*instance)
                    || self
                        .symbol(*instance)
                        .and_then(|symbol| symbol.variable())
                        .and_then(|variable| match variable.ty.kind {
                            TypeKind::Block(block) => self.types.block(block),
                            _ => None,
                        })
                        .and_then(|block| block.members.get(usize::try_from(*index).ok()?))
                        .is_some_and(|member| member.qualifiers.writeonly)
            }
            _ => false,
        }
    }

    fn is_non_uniform(&self, id: SymbolId) -> bool {
        match self.symbol(id).map(|symbol| &symbol.kind) {
            Some(SymbolKind::Variable(variable)) => variable.qualifiers.nonuniform,
            Some(SymbolKind::BlockMember { instance, .. }) => self.is_non_uniform(*instance),
            _ => false,
        }
    }

    pub(crate) fn readable(&mut self, span: Span, operand: &Operand) -> bool {
        if operand.writeonly {
            self.error(span, DiagnosticKind::WriteOnlyRead);
        }
        !operand.writeonly
    }

    fn variable(&mut self, expression: &Expression, name: &str) -> Operand {
        let block_name = |analyzer: &Self, id| {
            matches!(
                analyzer.symbol(id).map(|symbol| &symbol.kind),
                Some(SymbolKind::BlockName)
            )
        };
        let id = match self.lookup(name) {
            Some(Lookup::Symbol(id)) if !block_name(self, id) => id,
            found => {
                let unknown = found.is_none();
                self.error(
                    expression.span,
                    DiagnosticKind::UndeclaredIdentifier(String::from(name)),
                );
                if unknown {
                    let recovery = self.add_variable(
                        name,
                        expression.span,
                        Type::ERROR,
                        Qualifiers::default(),
                        Origin::Local,
                        None,
                    );
                    if self.scopes.declare(name, recovery).is_ok() {
                        self.recovered.insert(recovery);
                    }
                }
                return Operand::error();
            }
        };
        self.references.insert(expression.id, id);
        let builtin = self
            .symbol(id)
            .and_then(|symbol| symbol.variable())
            .is_some_and(|variable| variable.origin == Origin::BuiltIn);
        if builtin {
            if let Some(extensions) =
                self.stage_map(|stage| crate::builtins::ray::variable_extensions(name, stage))
            {
                if !self.require_extensions(expression.span, extensions, name) {
                    return Operand::error();
                }
            }
        }
        if crate::builtins::needs_memory_scope_semantics(name)
            && self
                .symbol(id)
                .and_then(|symbol| symbol.variable())
                .is_some_and(|variable| variable.origin == Origin::BuiltIn)
        {
            self.require_scope_extension(expression.span, name);
        }
        if let Some(extension) = crate::builtins::subgroup::variable_extension(name) {
            if self
                .symbol(id)
                .and_then(|symbol| symbol.variable())
                .is_some_and(|variable| variable.origin == Origin::BuiltIn)
            {
                self.require_extension(expression.span, extension, name);
            }
        }
        if self
            .symbol(id)
            .and_then(|symbol| symbol.variable())
            .is_some_and(|variable| variable.origin == Origin::BuiltIn)
        {
            self.viewport_layer_extension(expression.span, name);
            self.mesh_variable_extension(expression.span, name);
            if let Some(extension) = crate::builtins::view_extension(name) {
                self.require_extension(expression.span, extension, name);
            }
            if let Some(extension) = crate::builtins::variable_extension(name) {
                self.require_extension(expression.span, extension, name);
            }
            if let Some(extension) = super::qcom::variable_extension(name) {
                self.require_extension(expression.span, extension, name);
            }
        }
        let (constant, value) = match self.symbol(id).map(|symbol| &symbol.kind) {
            Some(SymbolKind::Struct(_) | SymbolKind::Reference(_)) => {
                self.error(
                    expression.span,
                    DiagnosticKind::TypeUsedAsValue(String::from(name)),
                );
                return Operand::error();
            }
            Some(SymbolKind::Variable(variable)) => (
                variable.qualifiers.constant && variable.origin != Origin::Parameter,
                variable.value.clone(),
            ),
            _ => (false, None),
        };
        if self.work_group_size == Some(id) && !self.local_size_declared {
            self.error(expression.span, DiagnosticKind::WorkGroupSizeNotDeclared);
            return Operand::error();
        }
        if self.work_group_size == Some(id) {
            self.work_group_size_read = true;
        }
        let work_group_size = self.work_group_size == Some(id)
            && (self.options.specialize_work_group_size
                || self
                    .local_size_specialized
                    .iter()
                    .any(|specialized| *specialized));
        let specialization = constant
            && (work_group_size
                || self
                    .symbol(id)
                    .and_then(|symbol| symbol.variable())
                    .is_some_and(|variable| {
                        variable.qualifiers.specialization
                            || variable.qualifiers.has_layout("constant_id")
                    }));
        if specialization {
            self.specialization_uses += 1;
        }
        let ty = self.symbol_type(id);
        if ty.is_error() {
            return Operand::error();
        }
        let (place, storage) = self.variable_place(id);
        let writeonly = self.is_writeonly(id);
        let non_uniform = self.is_non_uniform(id);
        if ty.is_reference()
            && self
                .symbol(id)
                .and_then(|symbol| symbol.variable())
                .is_some_and(|variable| variable.qualifiers.needs_vulkan_memory_model())
        {
            self.vulkan_memory_model = true;
        }
        Operand {
            ty,
            constant,
            value,
            place,
            root: Some(id),
            storage,
            specialization,
            writeonly,
            non_uniform,
            through_reference: false,
        }
    }

    fn builtin_array_limit(&self, base: &Expression) -> Option<i64> {
        let name = match &base.kind {
            ExpressionKind::Variable(name) => name.as_str(),
            ExpressionKind::FieldSelection { field, .. } => field.node.as_str(),
            _ => return None,
        };
        let limits = &self.options.limits;
        let limit = match name {
            "gl_ClipDistance" => limits.max_clip_distances,
            "gl_CullDistance" => limits.max_cull_distances,
            "gl_SampleMask" | "gl_SampleMaskIn" => limits.max_samples.saturating_add(31) / 32,
            _ => return None,
        };
        Some(i64::from(limit))
    }

    pub(crate) fn per_vertex_output_check(&mut self, target: &Expression) {
        let mut current = target;
        loop {
            match &current.kind {
                ExpressionKind::Parenthesized(inner) => current = inner,
                ExpressionKind::FieldSelection { base, .. } => current = base,
                ExpressionKind::Subscript { base, index } => {
                    if let ExpressionKind::Variable(name) = &base.kind {
                        let per_vertex = match self.lookup(name) {
                            Some(Lookup::Symbol(id)) => self
                                .symbol(id)
                                .and_then(|symbol| symbol.variable())
                                .is_some_and(|variable| {
                                    variable.qualifiers.storage == Storage::Out
                                        && !variable.qualifiers.patch
                                        && variable.origin != Origin::Parameter
                                        && variable.origin != Origin::Local
                                }),
                            _ => false,
                        };
                        let mut index = index.as_ref();
                        while let ExpressionKind::Parenthesized(inner) = &index.kind {
                            index = inner;
                        }
                        let by_invocation = matches!(
                            &index.kind,
                            ExpressionKind::Variable(index) if index == "gl_InvocationID"
                        );
                        if per_vertex && !by_invocation && self.stage_is(Stage::TessControl) {
                            self.error(target.span, DiagnosticKind::PerVertexOutputIndex);
                        }
                    }
                    current = base;
                }
                _ => return,
            }
        }
    }

    fn subscript_checked(
        &mut self,
        base: &Expression,
        index: &Expression,
        span: Span,
        base_operand: Operand,
        index_operand: Operand,
    ) -> Operand {
        if base_operand.ty.is_error() {
            return Operand::error();
        }
        if let Some(block) = base_operand.ty.as_reference() {
            return self.reference_index(span, &base_operand, block, &index_operand, index);
        }
        let Some(element) = base_operand.ty.element_type() else {
            self.error(
                span,
                DiagnosticKind::NotIndexable(self.show(&base_operand.ty)),
            );
            return Operand::error();
        };
        if index_operand.ty.is_error() {
            return Operand::error();
        }
        if !self.valid_index(&index_operand.ty) {
            self.error(
                index.span,
                DiagnosticKind::IndexNotInteger(self.show(&index_operand.ty)),
            );
            return Operand::error();
        }
        let known = index_operand
            .value
            .as_ref()
            .filter(|_| index_operand.constant)
            .and_then(Constant::scalar_i64);
        let unsized_array = base_operand.ty.outer_size() == Some(ArraySize::Unsized);
        if let Some(value) = known {
            let builtin_limit = if unsized_array {
                self.builtin_array_limit(base)
            } else {
                None
            };
            let limit = base_operand
                .ty
                .outer_size()
                .and_then(ArraySize::nominal)
                .or_else(|| base_operand.ty.length())
                .or_else(|| {
                    base_operand
                        .ty
                        .is_cooperative_vector()
                        .then(|| base_operand.ty.sized_vector_length())
                        .flatten()
                        .and_then(ArraySize::nominal)
                })
                .map(i64::from)
                .or(builtin_limit);
            if value < 0 || limit.is_some_and(|limit| value >= limit) {
                self.error(
                    span,
                    DiagnosticKind::IndexOutOfRange {
                        index: value,
                        ty: self.show(&base_operand.ty),
                    },
                );
            }
        } else if unsized_array && !index_operand.constant {
            let name = base_operand
                .root
                .and_then(|id| self.symbol(id))
                .map(|symbol| symbol.name.as_str());
            let allowed = base_operand.storage == Storage::Buffer
                || matches!(name, Some("gl_SampleMask" | "gl_SampleMaskIn"))
                || self.extension_enabled("GL_EXT_nonuniform_qualifier");
            if !allowed {
                self.error(span, DiagnosticKind::VariableIndexIntoUnsizedArray);
            }
        }
        if base_operand.ty.is_vector() {
            self.require_small_arithmetic(
                span,
                &base_operand.ty,
                "[",
                "does not operate on types containing {}",
            );
        }
        let constant = base_operand.constant && index_operand.constant;
        let value = if constant {
            let size = element
                .flattened_size(&self.types)
                .and_then(|size| usize::try_from(size).ok());
            match (&base_operand.value, known, size) {
                (Some(constant), Some(index), Some(size)) => usize::try_from(index)
                    .ok()
                    .and_then(|index| index.checked_mul(size))
                    .and_then(|start| constant.slice(start, size)),
                _ => None,
            }
        } else {
            None
        };
        Operand {
            ty: element,
            constant,
            value,
            place: base_operand.place,
            root: base_operand.root,
            storage: base_operand.storage,
            specialization: false,
            writeonly: base_operand.writeonly,
            non_uniform: base_operand.non_uniform || index_operand.non_uniform,
            through_reference: base_operand.through_reference,
        }
    }

    fn swizzle(&mut self, base: &Operand, field: &Identifier) -> Option<Operand> {
        let (scalar, size) = match base.ty.kind {
            TypeKind::Scalar(scalar) => (scalar, 1_u8),
            TypeKind::Vector { scalar, size } => (scalar, size),
            _ => return None,
        };
        let name = field.node.as_str();
        let letters: Vec<Option<(usize, usize)>> =
            name.chars()
                .map(|character| {
                    SWIZZLE_SETS.iter().enumerate().find_map(|(set, letters)| {
                        letters.find(character).map(|index| (set, index))
                    })
                })
                .collect();
        let mut indices: Vec<usize> = letters.iter().flatten().map(|(_, index)| *index).collect();
        let mut valid = name.chars().count() <= 4;
        for (position, index) in indices.iter().enumerate() {
            let set = letters.get(position).copied().flatten().map(|(set, _)| set);
            let previous = position
                .checked_sub(1)
                .and_then(|previous| letters.get(previous).copied().flatten())
                .map(|(set, _)| set);
            if set.is_none() || *index >= usize::from(size) || (position > 0 && set != previous) {
                valid = false;
            }
        }
        if !valid {
            self.error(
                field.span,
                DiagnosticKind::InvalidSwizzle(field.node.clone()),
            );
            return Some(Operand::error());
        }
        if base.ty.is_vector() && indices.len() != 1 {
            self.require_small_arithmetic(
                field.span,
                &base.ty,
                ".",
                "can't swizzle types containing {}",
            );
        }
        if indices.is_empty() {
            indices.push(0);
        }
        let has_duplicates = indices
            .iter()
            .enumerate()
            .any(|(position, index)| indices.iter().take(position).any(|other| other == index));
        let place = match base.place {
            Place::Writable if has_duplicates => Place::ReadOnly("the swizzle repeats a component"),
            place => place,
        };
        let value = base.value.as_ref().and_then(|constant| {
            indices
                .iter()
                .map(|index| constant.values.get(*index).copied())
                .collect::<Option<Vec<Value>>>()
                .map(Constant::new)
        });
        let count = u8::try_from(indices.len()).unwrap_or(1);
        Some(Operand {
            ty: Type::vector(scalar, count),
            constant: base.constant,
            value,
            place,
            root: base.root,
            storage: base.storage,
            specialization: false,
            writeonly: base.writeonly,
            non_uniform: base.non_uniform,
            through_reference: base.through_reference,
        })
    }

    fn field_checked(&mut self, field: &Identifier, base_operand: Operand) -> Operand {
        if base_operand.ty.is_error() {
            return Operand::error();
        }
        let invalid = |analyzer: &mut Self| {
            analyzer.error(
                field.span,
                DiagnosticKind::InvalidFieldSelection {
                    ty: analyzer.show(&base_operand.ty),
                    field: field.node.clone(),
                },
            );
            Operand::error()
        };
        if base_operand.ty.is_array() {
            return invalid(self);
        }
        if let Some(operand) = self.swizzle(&base_operand, field) {
            return operand;
        }
        if let TypeKind::Reference(id) = base_operand.ty.kind {
            return self.reference_field(&base_operand, id, field);
        }
        self.mesh_member_extension(field.span, &base_operand.ty, &field.node);
        let per_vertex_member = match base_operand.ty.kind {
            TypeKind::Block(id) => self.types.block(id).is_some_and(|block| {
                block.name == "gl_PerVertex" && block.member(&field.node).is_some()
            }),
            _ => false,
        };
        if let Some(extension) =
            crate::builtins::view_extension(&field.node).filter(|_| per_vertex_member)
        {
            self.require_extension(field.span, extension, &field.node);
        }
        let members = match base_operand.ty.kind {
            TypeKind::Struct(id) => self.types.structure(id).map(|structure| &structure.members),
            TypeKind::Block(id) => self.types.block(id).map(|block| &block.members),
            _ => None,
        };
        let Some(members) = members else {
            return invalid(self);
        };
        let Some(position) = members.iter().position(|member| member.name == field.node) else {
            self.error(
                field.span,
                DiagnosticKind::NoSuchField {
                    ty: self.show(&base_operand.ty),
                    field: field.node.clone(),
                },
            );
            return Operand::error();
        };
        let mut offset = Some(0_usize);
        for member in members.iter().take(position) {
            offset = match (
                offset,
                member
                    .ty
                    .flattened_size(&self.types)
                    .and_then(|size| usize::try_from(size).ok()),
            ) {
                (Some(offset), Some(size)) => offset.checked_add(size),
                _ => None,
            };
        }
        let Some(member) = members.get(position) else {
            return Operand::error();
        };
        let size = member
            .ty
            .flattened_size(&self.types)
            .and_then(|size| usize::try_from(size).ok());
        let value = match (&base_operand.value, offset, size) {
            (Some(constant), Some(offset), Some(size)) => constant.slice(offset, size),
            _ => None,
        };
        let is_block = matches!(base_operand.ty.kind, TypeKind::Block(_));
        let buffer_type = match base_operand.ty.kind {
            TypeKind::Block(id) => self
                .types
                .block(id)
                .filter(|block| block.buffer_type)
                .map(|block| block.storage),
            _ => None,
        };
        let (place, storage) = match buffer_type {
            Some(BlockStorage::Uniform) => (Place::ReadOnly("it is a uniform"), Storage::Uniform),
            Some(_) if member.qualifiers.readonly => {
                (Place::ReadOnly("it is read-only"), Storage::Buffer)
            }
            Some(_) => (Place::Writable, Storage::Buffer),
            None if is_block
                && member.qualifiers.readonly
                && base_operand.place == Place::Writable =>
            {
                (Place::ReadOnly("it is read-only"), base_operand.storage)
            }
            None => (base_operand.place, base_operand.storage),
        };
        Operand {
            ty: member.ty.clone(),
            constant: base_operand.constant,
            value,
            place,
            root: base_operand.root,
            storage,
            specialization: false,
            writeonly: base_operand.writeonly || member.qualifiers.writeonly,
            non_uniform: base_operand.non_uniform,
            through_reference: base_operand.through_reference,
        }
    }

    pub(crate) fn valid_index(&self, ty: &Type) -> bool {
        ty.is_scalar_integer()
            && (ty.scalar_type().is_some_and(|scalar| scalar.bits() != 64)
                || self.extensions.is_on(SHADER_64BIT_INDEXING))
    }

    pub(crate) fn require_lvalue(&mut self, span: Span, operand: &Operand) -> bool {
        match operand.place {
            Place::Writable => true,
            Place::Temporary => {
                self.error(span, DiagnosticKind::NotAnLValue("it is a temporary value"));
                false
            }
            Place::ReadOnly(reason) => {
                self.error(span, DiagnosticKind::NotAnLValue(reason));
                false
            }
        }
    }

    fn increment_checked(
        &mut self,
        span: Span,
        operand: &Expression,
        symbol: &'static str,
        value: Operand,
    ) -> Operand {
        if value.ty.is_error() {
            return Operand::error();
        }
        self.per_vertex_output_check(operand);
        if !self.require_lvalue(span, &value) {
            return Operand::error();
        }
        if !value.ty.is_arithmetic() || !self.small_arithmetic_allowed(&[&value.ty]) {
            self.error(
                span,
                DiagnosticKind::InvalidOperand {
                    operator: symbol,
                    operand: self.show(&value.ty),
                },
            );
            return Operand::error();
        }
        Operand {
            non_uniform: value.non_uniform,
            ..Operand::temporary(value.ty)
        }
    }

    fn unary_checked(&mut self, span: Span, operator: UnaryOperator, value: Operand) -> Operand {
        if value.ty.is_error() || !self.readable(span, &value) {
            return Operand::error();
        }
        let valid = match operator {
            UnaryOperator::Plus | UnaryOperator::Minus => value.ty.is_arithmetic(),
            UnaryOperator::LogicalNot => value.ty.is_bool(),
            UnaryOperator::BitNot => {
                value.ty.is_integer() && !matches!(value.ty.kind, TypeKind::Matrix { .. })
            }
            UnaryOperator::Increment | UnaryOperator::Decrement => false,
        };
        if !valid || !self.small_arithmetic_allowed(&[&value.ty]) {
            self.error(
                span,
                DiagnosticKind::InvalidOperand {
                    operator: operator.symbol(),
                    operand: self.show(&value.ty),
                },
            );
            return Operand::error();
        }
        let folded = value
            .value
            .as_ref()
            .filter(|_| value.constant)
            .and_then(|constant| fold_unary(operator, constant));
        let floating_specialization =
            value.specialization && value.ty.base_scalar().is_some_and(Scalar::is_floating);
        Operand {
            constant: value.constant && !floating_specialization,
            value: folded,
            non_uniform: value.non_uniform,
            ..Operand::temporary(value.ty)
        }
    }

    fn invalid_operands(
        &mut self,
        span: Span,
        operator: &'static str,
        left: &Type,
        right: &Type,
    ) -> Operand {
        self.error(
            span,
            DiagnosticKind::InvalidOperands {
                operator,
                left: self.show(left),
                right: self.show(right),
            },
        );
        Operand::error()
    }

    fn equality_type(&self, left: &Type, right: &Type) -> Option<Type> {
        let comparable = |ty: &Type| {
            !ty.is_void()
                && !ty.is_string()
                && !ty.contains_opaque(&self.types)
                && !ty.contains_tensor_nv(&self.types)
                && !matches!(ty.kind, TypeKind::Block(_))
        };
        if !comparable(left) || !comparable(right) {
            return None;
        }
        let cooperative_vector = |ty: &Type| {
            self.types
                .find_in_members(ty, |member| {
                    matches!(member.kind, TypeKind::CooperativeVector { .. }).then_some(())
                })
                .is_some()
        };
        if cooperative_vector(left) || cooperative_vector(right) {
            return None;
        }
        if left == right {
            return Some(left.clone());
        }
        if left.is_array() || right.is_array() || !left.same_shape(right) {
            return None;
        }
        let scalar = left
            .base_scalar()?
            .common(right.base_scalar()?, self.numeric_features())?;
        Some(left.with_scalar(scalar))
    }

    fn binary_checked(
        &mut self,
        operator: BinaryOperator,
        left: &Expression,
        right: &Expression,
        span: Span,
        left_operand: Operand,
        right_operand: Operand,
    ) -> Operand {
        if left_operand.ty.is_error() || right_operand.ty.is_error() {
            return Operand::error();
        }
        if !self.readable(span, &left_operand) || !self.readable(span, &right_operand) {
            return Operand::error();
        }
        if left_operand.ty.contains_reference(&self.types)
            || right_operand.ty.contains_reference(&self.types)
        {
            return self.reference_binary(span, operator, &left_operand, &right_operand);
        }
        let constant = left_operand.constant && right_operand.constant;
        let small_allowed = self.small_arithmetic_allowed(&[&left_operand.ty, &right_operand.ty]);
        let result = if !small_allowed {
            None
        } else if matches!(operator, BinaryOperator::Equal | BinaryOperator::NotEqual) {
            self.equality_type(&left_operand.ty, &right_operand.ty)
                .map(|common| BinaryResult {
                    ty: Type::BOOL,
                    left: common.clone(),
                    right: common,
                    foldable: true,
                })
        } else {
            binary_types(
                operator,
                &left_operand.ty,
                &right_operand.ty,
                self.numeric_features(),
            )
        };
        let Some(result) = result else {
            return self.invalid_operands(
                span,
                operator.symbol(),
                &left_operand.ty,
                &right_operand.ty,
            );
        };
        self.record_conversion(left, &left_operand.ty, &result.left);
        self.record_conversion(right, &right_operand.ty, &result.right);
        let matrix_product = operator == BinaryOperator::Multiply
            && matches!(left_operand.ty.kind, TypeKind::Matrix { .. })
            && matches!(right_operand.ty.kind, TypeKind::Matrix { .. });
        let non_uniform = !matrix_product
            && ((left_operand.non_uniform && left_operand.ty == result.left)
                || (right_operand.non_uniform && right_operand.ty == result.right));
        let floating_specialization = (left_operand.specialization || right_operand.specialization)
            && result.left.base_scalar().is_some_and(Scalar::is_floating);
        let constant = constant && !floating_specialization;
        let convert = |operand: &Operand, target: &Type| {
            let scalar = target.base_scalar();
            operand.value.as_ref().map(|constant| match scalar {
                Some(scalar) => constant.convert(scalar),
                None => constant.clone(),
            })
        };
        let linear = match (linear_shape(&result.left), linear_shape(&result.right)) {
            (Some(left), Some(right)) if operator == BinaryOperator::Multiply => {
                Some((left, right))
            }
            _ => None,
        };
        let value = if !constant {
            None
        } else if let (Some((left_shape, right_shape)), true) = (linear, !result.foldable) {
            match (
                convert(&left_operand, &result.left),
                convert(&right_operand, &result.right),
            ) {
                (Some(left), Some(right)) => fold_linear(&left, left_shape, &right, right_shape),
                _ => None,
            }
        } else if result.foldable {
            match (
                convert(&left_operand, &result.left),
                convert(&right_operand, &result.right),
            ) {
                (Some(left), Some(right)) => fold_binary(operator, &left, &right),
                _ => None,
            }
        } else {
            None
        };
        Operand {
            constant,
            value,
            non_uniform,
            ..Operand::temporary(result.ty)
        }
    }

    fn conditional_checked(
        &mut self,
        then_expression: &Expression,
        else_expression: &Expression,
        span: Span,
        condition_operand: Operand,
        then_operand: Operand,
        else_operand: Operand,
    ) -> Operand {
        if !condition_operand.ty.is_error() && !condition_operand.ty.is_bool() {
            self.error(
                span,
                DiagnosticKind::ConditionNotBool(self.show(&condition_operand.ty)),
            );
            return Operand::error();
        }
        if condition_operand.ty.is_error()
            || then_operand.ty.is_error()
            || else_operand.ty.is_error()
        {
            return Operand::error();
        }
        if !self.readable(span, &condition_operand)
            || !self.readable(span, &then_operand)
            || !self.readable(span, &else_operand)
        {
            return Operand::error();
        }
        if then_operand.ty.contains_opaque(&self.types)
            || else_operand.ty.contains_opaque(&self.types)
            || then_operand.ty.is_string()
            || else_operand.ty.is_string()
        {
            return self.invalid_operands(span, "?:", &then_operand.ty, &else_operand.ty);
        }
        let ty = if self.converts(&then_operand.ty, &else_operand.ty) {
            else_operand.ty.clone()
        } else if self.converts(&else_operand.ty, &then_operand.ty) {
            then_operand.ty.clone()
        } else {
            return self.invalid_operands(span, "?:", &then_operand.ty, &else_operand.ty);
        };
        self.record_conversion(then_expression, &then_operand.ty, &ty);
        self.record_conversion(else_expression, &else_operand.ty, &ty);
        let constant = condition_operand.constant && then_operand.constant && else_operand.constant;
        let value = if constant {
            let chosen = condition_operand
                .value
                .as_ref()
                .and_then(Constant::first)
                .and_then(Value::as_bool);
            let branch = match chosen {
                Some(true) => then_operand.value,
                Some(false) => else_operand.value,
                None => None,
            };
            match (branch, ty.base_scalar()) {
                (Some(value), Some(scalar)) => Some(value.convert(scalar)),
                (value, _) => value,
            }
        } else {
            None
        };
        Operand {
            constant,
            value,
            ..Operand::temporary(ty)
        }
    }

    fn assignment_checked(
        &mut self,
        operator: AssignmentOperator,
        target: &Expression,
        value: &Expression,
        span: Span,
        target_operand: Operand,
        value_operand: Operand,
    ) -> Operand {
        if target_operand.ty.is_error() {
            return Operand::error();
        }
        self.per_vertex_output_check(target);
        if !self.require_lvalue(span, &target_operand) {
            return Operand::error();
        }
        if value_operand.ty.is_error() || !self.readable(span, &value_operand) {
            return Operand::error();
        }
        let target_type = &target_operand.ty;
        if target_type.is_reference() {
            if let Some(binary) = compound_operator(operator) {
                return self.reference_compound(span, binary, &target_operand, &value_operand);
            }
        }
        let Some(binary) = compound_operator(operator) else {
            self.assignment_small_check(span, target_type, "=");
            let assignable = self.converts(&value_operand.ty, target_type)
                && !target_type.is_void()
                && !target_type.contains_opaque(&self.types)
                && !matches!(target_type.kind, TypeKind::Block(_));
            if !assignable {
                self.error(
                    span,
                    DiagnosticKind::CannotConvert {
                        from: self.show(&value_operand.ty),
                        to: self.show(target_type),
                    },
                );
                return Operand::error();
            }
            self.record_conversion(value, &value_operand.ty, target_type);
            return Operand::temporary(target_type.clone());
        };
        let result = binary_types(
            binary,
            target_type,
            &value_operand.ty,
            self.numeric_features(),
        )
        .filter(|result| result.ty == *target_type && result.left == *target_type);
        let Some(result) = result else {
            return self.invalid_operands(span, operator.symbol(), target_type, &value_operand.ty);
        };
        self.record_conversion(value, &value_operand.ty, &result.right);
        Operand::temporary(target_type.clone())
    }
}
