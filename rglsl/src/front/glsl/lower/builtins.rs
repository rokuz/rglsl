use alloc::{format, vec::Vec};

use rglsl_ast::ast::{Expression as AstExpression, ExpressionKind};
use rglsl_sema::builtins::kind::{
    self, AtomicOperation, Attachment, Axis, Barrier, BitOperation, BuiltinKind, Comparison,
    Control, Decompose, GatherOffsets, GatherPattern, ImageProcessing, InterpolateAt, Math, Mesh,
    Primitive, Pure, Relation, Sample, Texture, TextureGather, TextureLevel, TextureQuery, Wide,
};
use rglsl_sema::scope::Function;
use rglsl_sema::types::{
    Opaque, OpaqueKind, Scalar as GlslScalar, TextureDimension, Type as GlslType, TypeKind,
};
use rglsl_sema::{BuiltinFunctionId, Callee};
use rglsl_types::stack::recurse;

use super::function::FunctionLowerer;
use super::prepass::strip;
use super::types::{scalar, vector_size};
use super::{Result, internal, semantic, unsupported};
use crate::{
    BinaryOperator, BlockMatchMetric, BlockMatchSearch, DerivativeAxis, DerivativeControl,
    Expression, Handle, ImageGatherPattern, ImageProcessingOperation, ImageQuery, Literal,
    MathFunction, NonUniform, PredeclaredType, RelationalFunction, SampleLevel, ShaderStage, Span,
    Statement, SwizzleComponent, UnaryOperator,
};

pub(super) const fn math_function(math: Math) -> MathFunction {
    use MathFunction as Mf;
    match math {
        Math::Radians => Mf::Radians,
        Math::Degrees => Mf::Degrees,
        Math::Sin => Mf::Sin,
        Math::Cos => Mf::Cos,
        Math::Tan => Mf::Tan,
        Math::Asin => Mf::Asin,
        Math::Acos => Mf::Acos,
        Math::Atan => Mf::Atan,
        Math::Atan2 => Mf::Atan2,
        Math::Sinh => Mf::Sinh,
        Math::Cosh => Mf::Cosh,
        Math::Tanh => Mf::Tanh,
        Math::Asinh => Mf::Asinh,
        Math::Acosh => Mf::Acosh,
        Math::Atanh => Mf::Atanh,
        Math::Pow => Mf::Pow,
        Math::Exp => Mf::Exp,
        Math::Log => Mf::Log,
        Math::Exp2 => Mf::Exp2,
        Math::Log2 => Mf::Log2,
        Math::Sqrt => Mf::Sqrt,
        Math::InverseSqrt => Mf::InverseSqrt,
        Math::Abs => Mf::Abs,
        Math::Sign => Mf::Sign,
        Math::Floor => Mf::Floor,
        Math::Trunc => Mf::Trunc,
        Math::Round => Mf::Round,
        Math::RoundEven => Mf::RoundEven,
        Math::Ceil => Mf::Ceil,
        Math::Fract => Mf::Fract,
        Math::Min => Mf::Min,
        Math::Max => Mf::Max,
        Math::Clamp => Mf::Clamp,
        Math::Min3 => Mf::Min3,
        Math::Max3 => Mf::Max3,
        Math::Mid3 => Mf::Mid3,
        Math::CubeFaceIndex => Mf::CubeFaceIndex,
        Math::CubeFaceCoord => Mf::CubeFaceCoord,
        Math::IntelCountLeadingZeros => Mf::IntelCountLeadingZeros,
        Math::IntelCountTrailingZeros => Mf::IntelCountTrailingZeros,
        Math::AbsoluteDifference => Mf::AbsoluteDifference,
        Math::AddSaturate => Mf::AddSaturate,
        Math::SubtractSaturate => Mf::SubtractSaturate,
        Math::Average => Mf::Average,
        Math::AverageRounded => Mf::AverageRounded,
        Math::Multiply32x16 => Mf::Multiply32x16,
        Math::Mix => Mf::Mix,
        Math::Step => Mf::Step,
        Math::SmoothStep => Mf::SmoothStep,
        Math::Fma => Mf::Fma,
        Math::Ldexp => Mf::Ldexp,
        Math::Length => Mf::Length,
        Math::Distance => Mf::Distance,
        Math::Dot => Mf::Dot,
        Math::IntegerDot => Mf::IntegerDot,
        Math::IntegerDotAccSat => Mf::IntegerDotAccSat,
        Math::PackedIntegerDot4x8 => Mf::PackedIntegerDot4x8,
        Math::PackedIntegerDot4x8AccSat => Mf::PackedIntegerDot4x8AccSat,
        Math::Cross => Mf::Cross,
        Math::Normalize => Mf::Normalize,
        Math::FaceForward => Mf::FaceForward,
        Math::Reflect => Mf::Reflect,
        Math::Refract => Mf::Refract,
        Math::Outer => Mf::Outer,
        Math::Transpose => Mf::Transpose,
        Math::Determinant => Mf::Determinant,
        Math::Inverse => Mf::Inverse,
        Math::Pack2x16unorm => Mf::Pack2x16unorm,
        Math::Pack2x16snorm => Mf::Pack2x16snorm,
        Math::Pack4x8unorm => Mf::Pack4x8unorm,
        Math::Pack4x8snorm => Mf::Pack4x8snorm,
        Math::Unpack2x16unorm => Mf::Unpack2x16unorm,
        Math::Unpack2x16snorm => Mf::Unpack2x16snorm,
        Math::Unpack4x8unorm => Mf::Unpack4x8unorm,
        Math::Unpack4x8snorm => Mf::Unpack4x8snorm,
        Math::Pack2x16float => Mf::Pack2x16float,
        Math::Unpack2x16float => Mf::Unpack2x16float,
        Math::PackDouble2x32 => Mf::PackDouble2x32,
        Math::UnpackDouble2x32 => Mf::UnpackDouble2x32,
    }
}

pub(super) const fn bit_function(operation: BitOperation) -> MathFunction {
    match operation {
        BitOperation::Extract => MathFunction::ExtractBits,
        BitOperation::Insert => MathFunction::InsertBits,
        BitOperation::Reverse => MathFunction::ReverseBits,
        BitOperation::Count => MathFunction::CountOneBits,
        BitOperation::FindLsb => MathFunction::FirstTrailingBit,
        BitOperation::FindMsb => MathFunction::FirstLeadingBit,
    }
}

pub(super) const fn relational_function(relation: Relation) -> RelationalFunction {
    match relation {
        Relation::IsNan => RelationalFunction::IsNan,
        Relation::IsInf => RelationalFunction::IsInf,
        Relation::Any => RelationalFunction::Any,
        Relation::All => RelationalFunction::All,
    }
}

pub(super) const fn comparison_operator(comparison: Comparison) -> BinaryOperator {
    match comparison {
        Comparison::Less => BinaryOperator::Less,
        Comparison::LessEqual => BinaryOperator::LessEqual,
        Comparison::Greater => BinaryOperator::Greater,
        Comparison::GreaterEqual => BinaryOperator::GreaterEqual,
        Comparison::Equal => BinaryOperator::Equal,
        Comparison::NotEqual => BinaryOperator::NotEqual,
    }
}

pub(super) const fn derivative(
    axis: Axis,
    control: Control,
) -> (DerivativeAxis, DerivativeControl) {
    let axis = match axis {
        Axis::X => DerivativeAxis::X,
        Axis::Y => DerivativeAxis::Y,
        Axis::Width => DerivativeAxis::Width,
    };
    let control = match control {
        Control::Plain => DerivativeControl::None,
        Control::Fine => DerivativeControl::Fine,
        Control::Coarse => DerivativeControl::Coarse,
    };
    (axis, control)
}

const fn wide_function(wide: Wide) -> MathFunction {
    match wide {
        Wide::AddCarry => MathFunction::AddCarry,
        Wide::SubBorrow => MathFunction::SubBorrow,
        Wide::MulExtended { .. } => MathFunction::MulExtended,
    }
}

const fn gather_pattern(pattern: GatherPattern) -> ImageGatherPattern {
    match pattern {
        GatherPattern::Quad => ImageGatherPattern::Quad,
        GatherPattern::Linear4x1 => ImageGatherPattern::Linear4x1,
        GatherPattern::Vertical2 => ImageGatherPattern::Vertical2,
        GatherPattern::Horizontal2 => ImageGatherPattern::Horizontal2,
        GatherPattern::Diagonal => ImageGatherPattern::Diagonal,
    }
}

const fn image_processing(operation: ImageProcessing) -> ImageProcessingOperation {
    match operation {
        ImageProcessing::Weighted => ImageProcessingOperation::SampleWeighted,
        ImageProcessing::BoxFilter => ImageProcessingOperation::BoxFilter,
        ImageProcessing::BlockMatch { metric, search } => ImageProcessingOperation::BlockMatch {
            metric: match metric {
                kind::BlockMatchMetric::AbsoluteDifferences => {
                    BlockMatchMetric::SumOfAbsoluteDifferences
                }
                kind::BlockMatchMetric::SquaredDifferences => {
                    BlockMatchMetric::SumOfSquaredDifferences
                }
            },
            search: match search {
                kind::BlockMatchSearch::Block => BlockMatchSearch::Block,
                kind::BlockMatchSearch::Window => BlockMatchSearch::Window,
                kind::BlockMatchSearch::Gather => BlockMatchSearch::Gather,
            },
        },
    }
}

#[derive(Clone, Copy)]
struct Sampling {
    gather: Option<ImageGatherPattern>,
    proj: bool,
    lod: bool,
    grad: bool,
    offset: bool,
    clamp: bool,
    sparse: bool,
}

impl Sampling {
    const fn sample(sample: Sample) -> Self {
        let (lod, grad) = match sample.level {
            TextureLevel::Implicit => (false, false),
            TextureLevel::Lod => (true, false),
            TextureLevel::Gradient => (false, true),
        };
        Self {
            gather: None,
            proj: sample.proj,
            lod,
            grad,
            offset: sample.offset,
            clamp: sample.clamp,
            sparse: sample.sparse,
        }
    }

    const fn gather(gather: TextureGather) -> Self {
        Self {
            gather: Some(gather_pattern(gather.pattern)),
            proj: false,
            lod: gather.lod,
            grad: false,
            offset: match gather.offsets {
                GatherOffsets::None => false,
                GatherOffsets::One | GatherOffsets::Four => true,
            },
            clamp: false,
            sparse: gather.sparse,
        }
    }
}

#[derive(Clone, Copy)]
enum ImageAccess {
    Load { sparse: bool },
    Store,
}

struct Sampled {
    image: Handle<Expression>,
    sampler: Option<Handle<Expression>>,
    opaque: Opaque,
    non_uniform: bool,
}

const fn coordinate_count(opaque: Opaque) -> u32 {
    match opaque.dimension {
        TextureDimension::D1 | TextureDimension::Buffer => 1,
        TextureDimension::D2 => 2,
        TextureDimension::D3 | TextureDimension::Cube => 3,
    }
}

impl FunctionLowerer<'_, '_> {
    pub(super) const fn nan_clamped(&self, fun: MathFunction) -> MathFunction {
        if !self.lw.options.nan_clamp {
            return fun;
        }
        match fun {
            MathFunction::Min => MathFunction::NMin,
            MathFunction::Max => MathFunction::NMax,
            MathFunction::Clamp => MathFunction::NClamp,
            _ => fun,
        }
    }

    pub(super) fn math_call(
        &mut self,
        fun: MathFunction,
        arguments: &[Handle<Expression>],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let mut iterator = arguments.iter().copied();
        let arg = iterator.next().ok_or_else(|| internal(at))?;
        let expression = Expression::Math {
            fun,
            arg,
            arg1: iterator.next(),
            arg2: iterator.next(),
            arg3: iterator.next(),
        };
        if arguments
            .iter()
            .all(|&argument| self.tracker.is_const(argument))
        {
            return Ok(self.unemitted(expression, at));
        }
        self.add(expression, at)
    }

    pub(super) fn binary_op(
        &mut self,
        op: BinaryOperator,
        left: Handle<Expression>,
        right: Handle<Expression>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        self.add(Expression::Binary { op, left, right }, at)
    }

    fn barrier_call(
        &mut self,
        barrier: Barrier,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        self.barrier(barrier, arguments, at)?;
        Ok(None)
    }

    fn interlock_call(&mut self, begin: bool, at: Span) -> Result<Option<Handle<Expression>>> {
        self.flush();
        let statement = if begin {
            Statement::BeginInvocationInterlock
        } else {
            Statement::EndInvocationInterlock
        };
        self.push(statement, at);
        Ok(None)
    }

    fn primitive_statement_call(
        &mut self,
        primitive: Primitive,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        self.primitive_statement(primitive, arguments, at)?;
        Ok(None)
    }

    fn generic_values(
        &mut self,
        pure: Pure,
        function: &Function,
        call_type: &GlslType,
        at: Span,
        mut values: Vec<Handle<Expression>>,
        types: Vec<GlslType>,
    ) -> Result<Handle<Expression>> {
        let name = function.name.as_str();
        if let Pure::PackedBitcast { extract } = pure {
            let ty = self.lw.lowered_type(call_type, at)?;
            let expr = values.first().copied().ok_or_else(|| internal(at))?;
            let offset = if extract {
                let offset = values.get(1).copied().ok_or_else(|| internal(at))?;
                let unsigned =
                    types.get(1).and_then(GlslType::base_scalar) == Some(GlslScalar::Uint);
                Some(if unsigned {
                    offset
                } else {
                    self.as_kind(offset, crate::Scalar::U32, at)?
                })
            } else {
                None
            };
            return self.add(Expression::Bitcast { expr, ty, offset }, at);
        }
        let long_shape = types
            .iter()
            .find(|ty| ty.sized_vector_length().is_some())
            .cloned();
        if let Some(ref shape) = long_shape {
            return self
                .long_generic(pure, call_type, shape, values, &types, at)?
                .ok_or_else(|| unsupported(format!("the built-in function `{name}`"), at));
        }
        let result = &function.return_type;
        let first_ty = types.first().cloned().unwrap_or(GlslType::VOID);
        let vector = match result.kind {
            TypeKind::Vector { size, .. } => Some(size),
            _ => None,
        };
        let arg = |index: usize| values.get(index).copied().ok_or_else(|| internal(at));
        let narrow = first_ty
            .base_scalar()
            .filter(|element| element.is_integer() && element.bits() < 32);
        if let (Some(element), Pure::Bits(operation)) = (narrow, pure) {
            return self.narrow_bit_operation(operation, &values, element, result, vector, at);
        }
        let wide = first_ty
            .base_scalar()
            .filter(|element| element.is_integer() && element.bits() == 64);
        if let (
            Some(element),
            Pure::Bits(
                operation @ (BitOperation::Count | BitOperation::FindLsb | BitOperation::FindMsb),
            ),
        ) = (wide, pure)
        {
            return self.wide_bit_operation(operation, arg(0)?, element, result, vector, at);
        }
        match pure {
            Pure::Derivative(axis, control) => {
                if first_ty.base_scalar() == Some(GlslScalar::Double) {
                    return Err(semantic(
                        format!(
                            "`{name}` of a double is not supported: SPIR-V derivatives take 16- or 32-bit floats"
                        ),
                        at,
                    ));
                }
                let (axis, ctrl) = derivative(axis, control);
                self.add(
                    Expression::Derivative {
                        axis,
                        ctrl,
                        expr: arg(0)?,
                    },
                    at,
                )
            }
            Pure::Select => self.add(
                Expression::Select {
                    condition: arg(2)?,
                    accept: arg(1)?,
                    reject: arg(0)?,
                },
                at,
            ),
            Pure::Relational(relation) => self.add(
                Expression::Relational {
                    fun: relational_function(relation),
                    argument: arg(0)?,
                },
                at,
            ),
            Pure::Not => self.add(
                Expression::Unary {
                    op: UnaryOperator::LogicalNot,
                    expr: arg(0)?,
                },
                at,
            ),
            Pure::Compare(comparison) => {
                self.binary_op(comparison_operator(comparison), arg(0)?, arg(1)?, at)
            }
            Pure::Bitcast => {
                let kind = scalar(result.base_scalar().ok_or_else(|| internal(at))?).kind;
                self.add(
                    Expression::As {
                        expr: arg(0)?,
                        kind,
                        convert: None,
                    },
                    at,
                )
            }
            Pure::RepackBits => self.pack_bits(arg(0)?, &first_ty, result, at),
            Pure::Modulo => {
                let x = arg(0)?;
                let mut y = arg(1)?;
                if let (Some(size), true) = (vector, types.get(1).is_some_and(GlslType::is_scalar))
                {
                    y = self.splat(y, size, at)?;
                }
                self.binary_op(BinaryOperator::Modulo, x, y, at)
            }
            Pure::MatrixCompMult => {
                let TypeKind::Matrix { columns, .. } = result.kind else {
                    return Err(internal(at));
                };
                let (left, right) = (arg(0)?, arg(1)?);
                let mut components = Vec::with_capacity(usize::from(columns));
                for index in 0..u32::from(columns) {
                    let l = self.add(Expression::AccessIndex { base: left, index }, at)?;
                    let r = self.add(Expression::AccessIndex { base: right, index }, at)?;
                    components.push(self.binary_op(BinaryOperator::Multiply, l, r, at)?);
                }
                let ty = self.lw.plain_ir_type(result, at)?;
                self.add(Expression::Compose { ty, components }, at)
            }
            Pure::Bits(operation @ (BitOperation::Extract | BitOperation::Insert)) => {
                let mut converted = values.clone();
                let start = if operation == BitOperation::Extract {
                    1
                } else {
                    2
                };
                for slot in converted.iter_mut().skip(start) {
                    *slot = self.as_kind(*slot, crate::Scalar::U32, at)?;
                }
                self.math_call(bit_function(operation), &converted, at)
            }
            Pure::Bits(
                operation @ (BitOperation::Reverse
                | BitOperation::Count
                | BitOperation::FindLsb
                | BitOperation::FindMsb),
            ) => {
                let value = self.math_call(bit_function(operation), &values, at)?;
                let unsigned_input = first_ty.base_scalar().is_some_and(GlslScalar::is_unsigned);
                if operation != BitOperation::Reverse && unsigned_input {
                    let target = scalar(result.base_scalar().ok_or_else(|| internal(at))?);
                    return self.as_kind(value, target, at);
                }
                Ok(value)
            }
            Pure::Math(Math::Dot) if first_ty.is_scalar() => {
                self.binary_op(BinaryOperator::Multiply, arg(0)?, arg(1)?, at)
            }
            Pure::Math(math) => {
                if let Some(size) = vector
                    && pure.replicates_scalars()
                {
                    for (value, ty) in values.iter_mut().zip(&types) {
                        if ty.is_scalar() {
                            *value = self.splat(*value, size, at)?;
                        }
                    }
                }
                self.math_call(self.nan_clamped(math_function(math)), &values, at)
            }
            Pure::PackedBitcast { .. } => Err(internal(at)),
        }
    }

    fn wide_bit_operation(
        &mut self,
        operation: BitOperation,
        value: Handle<Expression>,
        element: GlslScalar,
        result: &GlslType,
        vector: Option<u8>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let result_scalar = scalar(result.base_scalar().ok_or_else(|| internal(at))?);
        let filled = |lowerer: &mut Self, literal: Literal| -> Result<Handle<Expression>> {
            let value = lowerer.literal(literal, at)?;
            match vector {
                Some(size) => lowerer.splat(value, size, at),
                None => Ok(value),
            }
        };
        let msb = operation == BitOperation::FindMsb;
        let mut source = value;
        if msb && element.is_signed() {
            let amount = filled(self, Literal::U32(63))?;
            let sign = self.binary_op(BinaryOperator::ShiftRight, source, amount, at)?;
            source = self.binary_op(BinaryOperator::ExclusiveOr, source, sign, at)?;
        }
        let unsigned = self.bitcast(source, crate::ScalarKind::Uint, at)?;
        let low = self.as_kind(unsigned, crate::Scalar::U32, at)?;
        let amount = filled(self, Literal::U32(32))?;
        let shifted = self.binary_op(BinaryOperator::ShiftRight, unsigned, amount, at)?;
        let high = self.as_kind(shifted, crate::Scalar::U32, at)?;
        let combined = if operation == BitOperation::Count {
            let low = self.math_call(MathFunction::CountOneBits, &[low], at)?;
            let high = self.math_call(MathFunction::CountOneBits, &[high], at)?;
            self.binary_op(BinaryOperator::Add, low, high, at)?
        } else {
            let fun = bit_function(operation);
            let low_bit = self.math_call(fun, &[low], at)?;
            let high_bit = self.math_call(fun, &[high], at)?;
            let thirty_two = filled(self, Literal::U32(32))?;
            let high_bit = self.binary_op(BinaryOperator::Add, high_bit, thirty_two, at)?;
            let zero = filled(self, Literal::U32(0))?;
            let (tested, chosen, other) = if msb {
                (high, high_bit, low_bit)
            } else {
                (low, low_bit, high_bit)
            };
            let condition = self.binary_op(BinaryOperator::NotEqual, tested, zero, at)?;
            let fallback = if msb {
                other
            } else {
                let none = filled(self, Literal::U32(u32::MAX))?;
                let high_zero = self.binary_op(BinaryOperator::Equal, high, zero, at)?;
                self.add(
                    Expression::Select {
                        condition: high_zero,
                        accept: none,
                        reject: other,
                    },
                    at,
                )?
            };
            let selected = self.add(
                Expression::Select {
                    condition,
                    accept: chosen,
                    reject: fallback,
                },
                at,
            )?;
            self.bitcast(selected, crate::ScalarKind::Sint, at)?
        };
        self.as_kind(combined, result_scalar, at)
    }

    fn narrow_bit_operation(
        &mut self,
        operation: BitOperation,
        values: &[Handle<Expression>],
        element: GlslScalar,
        result: &GlslType,
        vector: Option<u8>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let arg = |index: usize| values.get(index).copied().ok_or_else(|| internal(at));
        let narrow = scalar(element);
        let unsigned_narrow = crate::Scalar {
            kind: crate::ScalarKind::Uint,
            width: narrow.width,
        };
        let wide = crate::Scalar {
            kind: narrow.kind,
            width: 4,
        };
        let result_scalar = scalar(result.base_scalar().ok_or_else(|| internal(at))?);
        match operation {
            BitOperation::FindMsb | BitOperation::FindLsb => {
                let extended = self.as_kind(arg(0)?, wide, at)?;
                let found = self.math_call(bit_function(operation), &[extended], at)?;
                self.as_kind(found, result_scalar, at)
            }
            BitOperation::Count => {
                let unsigned = self.bitcast(arg(0)?, crate::ScalarKind::Uint, at)?;
                let extended = self.as_kind(unsigned, crate::Scalar::U32, at)?;
                let counted = self.math_call(MathFunction::CountOneBits, &[extended], at)?;
                self.as_kind(counted, result_scalar, at)
            }
            BitOperation::Reverse => {
                let unsigned = self.bitcast(arg(0)?, crate::ScalarKind::Uint, at)?;
                let extended = self.as_kind(unsigned, crate::Scalar::U32, at)?;
                let reversed = self.math_call(MathFunction::ReverseBits, &[extended], at)?;
                let amount = self.shift_amount(32 - element.bits(), at)?;
                let amount = match vector {
                    Some(size) => self.splat(amount, size, at)?,
                    None => amount,
                };
                let shifted = self.binary_op(BinaryOperator::ShiftRight, reversed, amount, at)?;
                let truncated = self.as_kind(shifted, unsigned_narrow, at)?;
                self.bitcast(truncated, narrow.kind, at)
            }
            BitOperation::Extract => {
                let extended = self.as_kind(arg(0)?, wide, at)?;
                let offset = self.as_kind(arg(1)?, crate::Scalar::U32, at)?;
                let count = self.as_kind(arg(2)?, crate::Scalar::U32, at)?;
                let extracted =
                    self.math_call(MathFunction::ExtractBits, &[extended, offset, count], at)?;
                self.as_kind(extracted, narrow, at)
            }
            BitOperation::Insert => {
                let base = self.as_kind(arg(0)?, wide, at)?;
                let insert = self.as_kind(arg(1)?, wide, at)?;
                let offset = self.as_kind(arg(2)?, crate::Scalar::U32, at)?;
                let count = self.as_kind(arg(3)?, crate::Scalar::U32, at)?;
                let inserted =
                    self.math_call(MathFunction::InsertBits, &[base, insert, offset, count], at)?;
                self.as_kind(inserted, narrow, at)
            }
        }
    }

    fn bitcast(
        &mut self,
        value: Handle<Expression>,
        kind: crate::ScalarKind,
        at: Span,
    ) -> Result<Handle<Expression>> {
        self.add(
            Expression::As {
                expr: value,
                kind,
                convert: None,
            },
            at,
        )
    }

    fn shift_amount(&mut self, amount: u32, at: Span) -> Result<Handle<Expression>> {
        self.literal(Literal::U32(amount), at)
    }

    pub(super) fn pack_bits(
        &mut self,
        value: Handle<Expression>,
        source: &GlslType,
        result: &GlslType,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if source.base_scalar().is_none() {
            return Err(internal(at));
        }
        let ty = self.lw.lowered_type(result, at)?;
        self.add(
            Expression::Bitcast {
                expr: value,
                ty,
                offset: None,
            },
            at,
        )
    }

    fn resize(
        &mut self,
        vector: Handle<Expression>,
        size: u32,
        target: u32,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if size == target {
            return Ok(vector);
        }
        if target == 1 {
            return self.component(vector, 0, at);
        }
        let size = vector_size(u8::try_from(target).unwrap_or(0)).ok_or_else(|| internal(at))?;
        self.add(
            Expression::Swizzle {
                size,
                vector,
                pattern: SwizzleComponent::XYZW,
            },
            at,
        )
    }

    fn layer(
        &mut self,
        value: Handle<Expression>,
        float: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        if !float {
            return Ok(value);
        }
        let half = self.literal(Literal::F32(0.5), at)?;
        let shifted = self.binary_op(BinaryOperator::Add, value, half, at)?;
        let floor = self.math_call(MathFunction::Floor, &[shifted], at)?;
        self.as_kind(floor, crate::Scalar::I32, at)
    }

    pub(super) fn split_coordinate(
        &mut self,
        coordinate: Handle<Expression>,
        size: u32,
        opaque: Opaque,
        float: bool,
        at: Span,
    ) -> Result<(Handle<Expression>, Option<Handle<Expression>>)> {
        let dimensions = coordinate_count(opaque);
        let point = if size == 1 {
            coordinate
        } else {
            self.resize(coordinate, size, dimensions, at)?
        };
        let array_index = if opaque.arrayed {
            let layer = self.component(coordinate, dimensions, at)?;
            Some(self.layer(layer, float, at)?)
        } else {
            None
        };
        Ok((point, array_index))
    }

    pub(super) fn split_storage_coordinate(
        &mut self,
        coordinate: Handle<Expression>,
        size: u32,
        opaque: Opaque,
        at: Span,
    ) -> Result<(Handle<Expression>, Option<Handle<Expression>>)> {
        if opaque.dimension == TextureDimension::Cube {
            return Ok((coordinate, None));
        }
        self.split_coordinate(coordinate, size, opaque, false, at)
    }

    pub(super) fn builtin_call(
        &mut self,
        id: BuiltinFunctionId,
        call_type: &GlslType,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let analysis = self.lw.analysis;
        let function = analysis
            .builtin_functions
            .function(id)
            .ok_or_else(|| internal(at))?;
        let name = function.name.as_str();
        match analysis
            .builtin_functions
            .kind(id)
            .ok_or_else(|| internal(at))?
        {
            BuiltinKind::Subgroup(kind) => recurse(|| self.subgroup(kind, arguments, at)),
            BuiltinKind::Ray(kind) => recurse(|| self.ray_call(kind, arguments, at)),
            BuiltinKind::Texture(kind) => {
                recurse(|| self.texture_call(kind, function, arguments, at))
            }
            BuiltinKind::Pure(pure) => {
                recurse(|| self.generic(pure, name, function, call_type, arguments, at)).map(Some)
            }
            BuiltinKind::Decompose(decompose) => {
                recurse(|| self.split(decompose, arguments, at)).map(Some)
            }
            BuiltinKind::Wide(wide) => recurse(|| self.wide(wide, arguments, at)),
            BuiltinKind::Expect => recurse(|| self.expect_call(arguments, at)),
            BuiltinKind::Assume => recurse(|| self.assume_call(arguments, at)),
            BuiltinKind::Atomic(operation) => recurse(|| self.atomic(operation, arguments, at)),
            BuiltinKind::Barrier(barrier) => self.barrier_call(barrier, arguments, at),
            BuiltinKind::Interlock { begin } => self.interlock_call(begin, at),
            BuiltinKind::HelperInvocation => self.add(Expression::IsHelperInvocation, at).map(Some),
            BuiltinKind::Clock { source, pair } => {
                let source = match source {
                    kind::ClockSource::Subgroup => crate::ClockSource::Subgroup,
                    kind::ClockSource::Device => crate::ClockSource::Device,
                    kind::ClockSource::AmdTime => crate::ClockSource::AmdTime,
                };
                {
                    self.add(Expression::ReadClock { source, pair }, at)
                        .map(Some)
                }
            }
            BuiltinKind::Interpolate(location) => {
                recurse(|| self.interpolate(location, arguments, at)).map(Some)
            }
            BuiltinKind::AttachmentRead(attachment) => {
                recurse(|| self.attachment_read_call(attachment, arguments, at))
            }
            BuiltinKind::Mesh(mesh) => recurse(|| self.mesh_statement_call(mesh, arguments, at)),
            BuiltinKind::Primitive(primitive) => {
                self.primitive_statement_call(primitive, arguments, at)
            }
        }
    }

    fn texture_call(
        &mut self,
        kind: Texture,
        function: &Function,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        match kind {
            Texture::Footprint { level, clamp } => {
                { recurse(|| self.footprint(level, clamp, arguments, at)) }.map(Some)
            }
            Texture::Sample(sample) => {
                { recurse(|| self.sample(Sampling::sample(sample), function, arguments, at)) }
                    .map(Some)
            }
            Texture::Gather(gather) => {
                { recurse(|| self.sample(Sampling::gather(gather), function, arguments, at)) }
                    .map(Some)
            }
            Texture::Fetch { offset, sparse } => {
                { recurse(|| self.fetch(function, arguments, offset, sparse, at)) }.map(Some)
            }
            Texture::ImageLoad { lod, sparse } => {
                let access = ImageAccess::Load { sparse };
                recurse(|| self.image(access, lod, function, arguments, at))
            }
            Texture::ImageStore { lod } => {
                let access = ImageAccess::Store;
                recurse(|| self.image(access, lod, function, arguments, at))
            }
            Texture::ImageAtomic(operation) => {
                recurse(|| self.image_atomic_call(operation, arguments, at))
            }
            Texture::Query(query) => recurse(|| self.query(query, arguments, at)).map(Some),
            Texture::QueryLod => recurse(|| self.query_lod(arguments, at)).map(Some),
            Texture::SparseTexelsResident => {
                recurse(|| self.sparse_texels_resident_call(arguments, at))
            }
            Texture::ImageProcessing(operation) => {
                { recurse(|| self.image_processing(image_processing(operation), arguments, at)) }
                    .map(Some)
            }
            Texture::SubpassLoad => recurse(|| self.subpass_load(arguments, at)).map(Some),
            Texture::FragmentFetch { mask } => {
                recurse(|| self.fragment_fetch_call(mask, arguments, at))
            }
        }
    }

    fn sparse_texels_resident_call(
        &mut self,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let code = recurse(|| self.rvalue(arguments.first().ok_or_else(|| internal(at))?))?;
        {
            self.add(Expression::ImageSparseResident { code }, at)
                .map(Some)
        }
    }

    fn image_atomic_call(
        &mut self,
        operation: AtomicOperation,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            opaque,
            non_uniform,
            ..
        } = recurse(|| self.sampled(first, at))?;
        recurse(|| self.image_atomic(operation, image, opaque, non_uniform, arguments, at))
    }

    fn fragment_fetch_call(
        &mut self,
        mask: bool,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let subpass = self
            .lw
            .analysis
            .type_of(first.id)
            .and_then(GlslType::as_opaque)
            .is_some_and(|opaque| opaque.kind == OpaqueKind::SubpassInput);
        let image = recurse(|| self.rvalue(first))?;
        let mut rest = arguments.iter().skip(1);
        let coordinate = if subpass {
            let zero = self.literal(Literal::I32(0), at)?;
            let ty = self
                .lw
                .vector_type(crate::VectorSize::Bi, crate::Scalar::I32);
            (self.add(
                Expression::Compose {
                    ty,
                    components: alloc::vec![zero, zero],
                },
                at,
            ))?
        } else {
            let coordinate = rest.next().ok_or_else(|| internal(at))?;
            { recurse(|| self.rvalue(coordinate)) }?
        };
        let fragment = match rest.next() {
            Some(fragment) if !mask => Some(recurse(|| self.rvalue(fragment))?),
            _ => None,
        };
        {
            self.add(
                Expression::FragmentFetch {
                    image,
                    coordinate,
                    fragment,
                },
                at,
            )
            .map(Some)
        }
    }

    fn attachment_read_call(
        &mut self,
        attachment: Attachment,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let mut rest = arguments.iter();
        let aspect = match attachment {
            Attachment::Color => {
                let image = rest.next().ok_or_else(|| internal(at))?;
                crate::AttachmentAspect::Color(recurse(|| self.rvalue(image))?)
            }
            Attachment::Depth => crate::AttachmentAspect::Depth,
            Attachment::Stencil => crate::AttachmentAspect::Stencil,
        };
        let sample = match rest.next() {
            Some(sample) => Some(recurse(|| self.rvalue(sample))?),
            None => None,
        };
        {
            self.add(Expression::AttachmentRead { aspect, sample }, at)
                .map(Some)
        }
    }

    fn mesh_statement_call(
        &mut self,
        mesh: Mesh,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        recurse(|| self.mesh_statement(mesh, arguments, at))?;
        Ok(None)
    }

    fn expect_call(
        &mut self,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let value = recurse(|| self.rvalue(arguments.first().ok_or_else(|| internal(at))?))?;
        let expected = recurse(|| self.rvalue(arguments.get(1).ok_or_else(|| internal(at))?))?;
        {
            self.add(Expression::Expect { value, expected }, at)
                .map(Some)
        }
    }

    fn assume_call(
        &mut self,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let condition = recurse(|| self.rvalue(arguments.first().ok_or_else(|| internal(at))?))?;
        self.flush();
        self.push(Statement::Assume { condition }, at);
        Ok(None)
    }

    fn generic(
        &mut self,
        pure: Pure,
        name: &str,
        function: &Function,
        call_type: &GlslType,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        if function
            .parameters
            .iter()
            .any(|parameter| parameter.direction.is_output())
        {
            return Err(unsupported(format!("the built-in function `{name}`"), at));
        }
        let mut values = Vec::with_capacity(arguments.len());
        let mut types = Vec::with_capacity(arguments.len());
        for argument in arguments {
            let (value, ty) = recurse(|| self.typed(argument))?;
            values.push(value);
            types.push(ty);
        }
        self.generic_values(pure, function, call_type, at, values, types)
    }

    fn split(
        &mut self,
        decompose: Decompose,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let &[ref value, ref output] = arguments else {
            return Err(internal(at));
        };
        let (value, ty) = recurse(|| self.typed(value))?;
        let base = ty.base_scalar().ok_or_else(|| internal(at))?;
        let size = match ty.kind {
            TypeKind::Vector { size, .. } => vector_size(size),
            _ => None,
        };
        let (special, fun) = match decompose {
            Decompose::Modf => (
                PredeclaredType::ModfResult {
                    size,
                    scalar: scalar(base),
                },
                MathFunction::Modf,
            ),
            Decompose::Frexp => (
                PredeclaredType::FrexpResult {
                    size,
                    scalar: scalar(base),
                },
                MathFunction::Frexp,
            ),
        };
        if ty.sized_vector_length().is_some() {
            self.long_math_result(fun, &ty, at)?;
        } else {
            self.lw.module.generate_predeclared_type(special);
        }
        let result = self.math_call(fun, &[value], at)?;
        let fraction = (self.add(
            Expression::AccessIndex {
                base: result,
                index: 0,
            },
            at,
        ))?;
        let other = (self.add(
            Expression::AccessIndex {
                base: result,
                index: 1,
            },
            at,
        ))?;
        let output_ty = self.info(output)?.ty.clone();
        let place = recurse(|| self.place(output))?;
        let other_ty = match decompose {
            Decompose::Modf => ty.clone(),
            Decompose::Frexp => ty.with_scalar(GlslScalar::Int),
        };
        let other = self.convert(other, &other_ty, &output_ty, at)?;
        self.store(&place, other, at)?;
        Ok(fraction)
    }

    fn wide(
        &mut self,
        wide: Wide,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let &[ref x, ref y, ref outputs @ ..] = arguments else {
            return Err(internal(at));
        };
        let (x, ty) = recurse(|| self.typed(x))?;
        let (y, _) = recurse(|| self.typed(y))?;
        let base = ty.base_scalar().ok_or_else(|| internal(at))?;
        let size = match ty.kind {
            TypeKind::Vector { size, .. } => vector_size(size),
            _ => None,
        };
        let fun = wide_function(wide);
        if ty.sized_vector_length().is_some() {
            self.long_math_result(fun, &ty, at)?;
        } else {
            self.lw
                .module
                .generate_predeclared_type(PredeclaredType::WideResult {
                    size,
                    scalar: scalar(base),
                });
        }
        let result = self.math_call(fun, &[x, y], at)?;
        let high = (self.add(
            Expression::AccessIndex {
                base: result,
                index: 1,
            },
            at,
        ))?;
        let low = (self.add(
            Expression::AccessIndex {
                base: result,
                index: 0,
            },
            at,
        ))?;
        let (stored, returned) = if fun == MathFunction::MulExtended {
            (&[high, low][..], None)
        } else {
            (&[high][..], Some(low))
        };
        if outputs.len() != stored.len() {
            return Err(internal(at));
        }
        for (output, &half) in outputs.iter().zip(stored) {
            let output_ty = self.info(output)?.ty.clone();
            let place = recurse(|| self.place(output))?;
            let half = self.convert(half, &ty, &output_ty, at)?;
            self.store(&place, half, at)?;
        }
        Ok(returned)
    }

    fn sampled(&mut self, argument: &AstExpression, at: Span) -> Result<Sampled> {
        let analysis = self.lw.analysis;
        let mut inner = strip(argument);
        let mut non_uniform = false;
        while let (&ExpressionKind::FunctionCall(ref call), Some(&Callee::NonUniform)) =
            (&inner.kind, analysis.calls.get(&inner.id))
        {
            let Some(constructed) = call.arguments.first().map(strip) else {
                break;
            };
            let is_constructor = matches!(
                (&constructed.kind, analysis.calls.get(&constructed.id)),
                (
                    &ExpressionKind::FunctionCall(_),
                    Some(&Callee::Constructor(_) | &Callee::NonUniform)
                )
            );
            if !is_constructor {
                break;
            }
            inner = constructed;
            non_uniform = true;
        }
        if let (&ExpressionKind::FunctionCall(ref call), Some(&Callee::Constructor(ref ty))) =
            (&inner.kind, analysis.calls.get(&inner.id))
            && let Some(opaque) = ty.as_opaque()
        {
            let &[ref texture, ref sampler] = call.arguments.as_slice() else {
                return Err(internal(at));
            };
            let image = recurse(|| self.rvalue(texture))?;
            let sampler = recurse(|| self.rvalue(sampler))?;
            return Ok(Sampled {
                image,
                sampler: Some(sampler),
                opaque,
                non_uniform,
            });
        }
        let ty = self.info(argument)?.ty.clone();
        match ty.as_opaque() {
            Some(opaque)
                if opaque.kind == OpaqueKind::Image
                    || opaque.kind == OpaqueKind::CombinedSampler
                    || opaque.kind == OpaqueKind::Texture
                    || opaque.kind == OpaqueKind::SubpassInput =>
            {
                Ok(Sampled {
                    image: { recurse(|| self.rvalue(argument)) }?,
                    sampler: None,
                    opaque,
                    non_uniform: false,
                })
            }
            _ => Err(unsupported("this texture argument", at)),
        }
    }

    fn image_processing(
        &mut self,
        operation: ImageProcessingOperation,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        let source = recurse(|| self.sampled(argument(0)?, at))?;
        let coordinate = recurse(|| self.rvalue(argument(1)?))?;
        let (reference, reference_coordinate, size) = match operation {
            ImageProcessingOperation::SampleWeighted => (
                Some(recurse(|| self.sampled(argument(2)?, at))?),
                None,
                None,
            ),
            ImageProcessingOperation::BoxFilter => {
                (None, None, Some(recurse(|| self.rvalue(argument(2)?))?))
            }
            ImageProcessingOperation::BlockMatch { .. } => {
                let reference = recurse(|| self.sampled(argument(2)?, at))?;
                let reference_coordinate = recurse(|| self.rvalue(argument(3)?))?;
                let size = recurse(|| self.rvalue(argument(4)?))?;
                (Some(reference), Some(reference_coordinate), Some(size))
            }
        };
        let non_uniform = source.non_uniform
            || reference
                .as_ref()
                .is_some_and(|reference| reference.non_uniform);
        let result = (self.add(
            Expression::ImageProcessing {
                operation,
                image: source.image,
                sampler: source.sampler,
                coordinate,
                reference: reference.as_ref().map(|reference| reference.image),
                reference_sampler: reference.as_ref().and_then(|reference| reference.sampler),
                reference_coordinate,
                size,
            },
            at,
        ))?;
        if non_uniform {
            self.mark(result, NonUniform::SAMPLED_IMAGE);
        }
        Ok(result)
    }

    fn sample(
        &mut self,
        call: Sampling,
        function: &Function,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            sampler,
            opaque,
            non_uniform,
        } = recurse(|| self.sampled(first, at))?;
        if sampler.is_none() && opaque.kind != OpaqueKind::CombinedSampler {
            return Err(internal(at));
        }
        let Sampling {
            gather: gather_pattern,
            proj,
            lod,
            grad,
            offset,
            ..
        } = call;
        let gather = gather_pattern.is_some();
        let coordinate_argument = arguments.get(1).ok_or_else(|| internal(at))?;
        let (coordinate, coordinate_ty) = recurse(|| self.typed(coordinate_argument))?;
        let mut size = u32::from(match coordinate_ty.kind {
            TypeKind::Vector { size, .. } => size,
            _ => 1,
        });
        let mut next = 2;
        let separate_reference = opaque.shadow
            && (gather || (opaque.dimension == TextureDimension::Cube && opaque.arrayed));
        let reference_argument = if separate_reference {
            Some(recurse(|| {
                self.next_argument(
                    arguments,
                    {
                        next += 1;
                        next - 1
                    },
                    at,
                )
            })?)
        } else {
            None
        };
        let mut coordinate = coordinate;
        if proj {
            let last = size.checked_sub(1).ok_or_else(|| internal(at))?;
            let q = self.component(coordinate, last, at)?;
            let head = self.resize(coordinate, size, last, at)?;
            let divisor = if last > 1 {
                self.splat(q, u8::try_from(last).unwrap_or(0), at)?
            } else {
                q
            };
            coordinate = self.binary_op(BinaryOperator::Divide, head, divisor, at)?;
            size = last;
        }
        let depth_ref = match reference_argument {
            Some(reference) => Some(reference),
            None if opaque.shadow => {
                let last = size.checked_sub(1).ok_or_else(|| internal(at))?;
                let reference = self.component(coordinate, last, at)?;
                Some(reference)
            }
            None => None,
        };
        let (point, array_index) = self.split_coordinate(coordinate, size, opaque, true, at)?;
        let mut level = SampleLevel::Auto;
        if lod {
            level = SampleLevel::Exact(recurse(|| {
                self.next_argument(
                    arguments,
                    {
                        next += 1;
                        next - 1
                    },
                    at,
                )
            })?);
        }
        if grad {
            let x = recurse(|| {
                self.next_argument(
                    arguments,
                    {
                        next += 1;
                        next - 1
                    },
                    at,
                )
            })?;
            let y = recurse(|| {
                self.next_argument(
                    arguments,
                    {
                        next += 1;
                        next - 1
                    },
                    at,
                )
            })?;
            level = SampleLevel::Gradient { x, y };
        }
        let mut sample_offset = None;
        if offset {
            sample_offset = Some(recurse(|| {
                self.next_argument(
                    arguments,
                    {
                        next += 1;
                        next - 1
                    },
                    at,
                )
            })?);
        }
        let mut min_lod = None;
        if call.clamp {
            min_lod = Some(recurse(|| {
                self.next_argument(
                    arguments,
                    {
                        next += 1;
                        next - 1
                    },
                    at,
                )
            })?);
        }
        let texel_out = if call.sparse {
            let index = next;
            next += 1;
            Some(index)
        } else {
            None
        };
        let mut gather_component = None;
        if gather {
            if !lod {
                level = SampleLevel::Zero;
            }
            let component = if opaque.shadow {
                SwizzleComponent::X
            } else {
                match arguments.get(next) {
                    Some(component) => {
                        next += 1;
                        match self.constant_index(component) {
                            Some(0) => SwizzleComponent::X,
                            Some(1) => SwizzleComponent::Y,
                            Some(2) => SwizzleComponent::Z,
                            Some(3) => SwizzleComponent::W,
                            _ => {
                                return Err(unsupported(
                                    "a gather component that is not a constant",
                                    at,
                                ));
                            }
                        }
                    }
                    None => SwizzleComponent::X,
                }
            };
            gather_component = Some(component);
            if !lod && next < function.parameters.len() {
                level = SampleLevel::Bias(recurse(|| {
                    self.next_argument(
                        arguments,
                        {
                            next += 1;
                            next - 1
                        },
                        at,
                    )
                })?);
            }
        } else if !lod && !grad && next < function.parameters.len() {
            level = SampleLevel::Bias(recurse(|| {
                self.next_argument(
                    arguments,
                    {
                        next += 1;
                        next - 1
                    },
                    at,
                )
            })?);
        }
        let implicit = match level {
            SampleLevel::Auto => !self.lw.library,
            SampleLevel::Bias(_) => true,
            SampleLevel::Zero | SampleLevel::Exact(_) | SampleLevel::Gradient { .. } => false,
        };
        let derivatives = implicit && !gather && {
            let group = self.lw.analysis.derivative_group.is_some();
            let deferred = self.lw.library
                && !group
                && min_lod.is_none()
                && matches!(level, SampleLevel::Bias(_));
            if deferred {
                self.lw.deferred_bias = true;
                true
            } else {
                self.lw.stage_map(|stage| {
                    stage == ShaderStage::Fragment || (stage == ShaderStage::Compute && group)
                })
            }
        };
        if implicit && !gather && !derivatives {
            level = SampleLevel::Zero;
            if let Some(clamp) = min_lod.take() {
                let zero = self.literal(Literal::F32(0.0), at)?;
                level =
                    SampleLevel::Exact(self.math_call(MathFunction::Max, &[clamp, zero], at)?);
            }
        }
        let sparse = match texel_out {
            Some(_) => {
                let texel = if opaque.shadow && !gather {
                    crate::TypeInner::Scalar(crate::Scalar::F32)
                } else {
                    crate::TypeInner::Vector {
                        size: crate::VectorSize::Quad,
                        scalar: super::types::sampled_scalar(opaque.sampled),
                    }
                };
                Some(self.lw.sparse_result_type(texel))
            }
            None => None,
        };
        let sample = (self.add(
            Expression::ImageSample {
                image,
                sampler,
                gather: gather_component,
                gather_pattern: gather_pattern.unwrap_or(ImageGatherPattern::Quad),
                coordinate: point,
                array_index,
                offset: sample_offset,
                level,
                depth_ref,
                min_lod,
                sparse,
            },
            at,
        ))?;
        if non_uniform {
            self.mark(sample, NonUniform::SAMPLED_IMAGE);
        }
        match texel_out {
            Some(index) => recurse(|| self.sparse_result(sample, function, arguments, index, at)),
            None => Ok(sample),
        }
    }

    pub(super) fn sparse_result(
        &mut self,
        result: Handle<Expression>,
        function: &Function,
        arguments: &[AstExpression],
        index: usize,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let output = arguments.get(index).ok_or_else(|| internal(at))?;
        let parameter = function.parameters.get(index).ok_or_else(|| internal(at))?;
        let texel = (self.add(
            Expression::AccessIndex {
                base: result,
                index: 1,
            },
            at,
        ))?;
        let output_ty = self.info(output)?.ty.clone();
        let place = recurse(|| self.place(output))?;
        let texel = self.convert(texel, &parameter.ty, &output_ty, at)?;
        self.store(&place, texel, at)?;
        {
            self.add(
                Expression::AccessIndex {
                    base: result,
                    index: 0,
                },
                at,
            )
        }
    }

    fn next_argument(
        &mut self,
        arguments: &[AstExpression],
        index: usize,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let value = arguments.get(index).ok_or_else(|| internal(at))?;
        recurse(|| self.rvalue(value))
    }

    fn fetch(
        &mut self,
        function: &Function,
        arguments: &[AstExpression],
        offset: bool,
        sparse: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            opaque,
            non_uniform,
            ..
        } = recurse(|| self.sampled(first, at))?;
        if non_uniform {
            self.mark(image, NonUniform::VALUE);
        }
        let coordinate_argument = arguments.get(1).ok_or_else(|| internal(at))?;
        let (coordinate, ty) = recurse(|| self.typed(coordinate_argument))?;
        let size = ty.component_count().ok_or_else(|| internal(at))?;
        let (mut point, array_index) =
            self.split_coordinate(coordinate, size, opaque, false, at)?;
        let extra = match arguments.get(2) {
            Some(argument) => Some(recurse(|| self.rvalue(argument))?),
            None => None,
        };
        if offset {
            let offset = arguments.get(3).ok_or_else(|| internal(at))?;
            let offset = recurse(|| self.rvalue(offset))?;
            point = self.binary_op(BinaryOperator::Add, point, offset, at)?;
        }
        let (sample, level) = if opaque.multisample {
            (extra, None)
        } else {
            (None, extra)
        };
        let sparse_type = sparse.then(|| {
            self.lw.sparse_result_type(crate::TypeInner::Vector {
                size: crate::VectorSize::Quad,
                scalar: super::types::sampled_scalar(opaque.sampled),
            })
        });
        let result = (self.add(
            Expression::ImageLoad {
                image,
                coordinate: point,
                array_index,
                sample,
                level,
                sparse: sparse_type,
            },
            at,
        ))?;
        if sparse {
            let index = if offset { 4 } else { 3 };
            recurse(|| self.sparse_result(result, function, arguments, index, at))
        } else {
            Ok(result)
        }
    }

    fn query_lod(&mut self, arguments: &[AstExpression], at: Span) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            sampler,
            non_uniform,
            ..
        } = recurse(|| self.sampled(first, at))?;
        let coordinate = recurse(|| self.rvalue(arguments.get(1).ok_or_else(|| internal(at))?))?;
        let query = (self.add(
            Expression::ImageQuery {
                image,
                query: ImageQuery::Lod {
                    sampler,
                    coordinate,
                },
            },
            at,
        ))?;
        if non_uniform {
            self.mark(query, NonUniform::SAMPLED_IMAGE);
        }
        Ok(query)
    }

    fn footprint(
        &mut self,
        footprint: TextureLevel,
        clamp: bool,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let mut next = 0;
        let image = recurse(|| {
            self.next_argument(
                arguments,
                {
                    next += 1;
                    next - 1
                },
                at,
            )
        })?;
        let coordinate = recurse(|| {
            self.next_argument(
                arguments,
                {
                    next += 1;
                    next - 1
                },
                at,
            )
        })?;
        let mut level = SampleLevel::Auto;
        let mut min_lod = None;
        match footprint {
            TextureLevel::Lod => {
                level = SampleLevel::Exact(recurse(|| {
                    self.next_argument(
                        arguments,
                        {
                            next += 1;
                            next - 1
                        },
                        at,
                    )
                })?);
            }
            TextureLevel::Gradient => {
                let x = recurse(|| {
                    self.next_argument(
                        arguments,
                        {
                            next += 1;
                            next - 1
                        },
                        at,
                    )
                })?;
                let y = recurse(|| {
                    self.next_argument(
                        arguments,
                        {
                            next += 1;
                            next - 1
                        },
                        at,
                    )
                })?;
                level = SampleLevel::Gradient { x, y };
                if clamp {
                    min_lod = Some(recurse(|| {
                        self.next_argument(
                            arguments,
                            {
                                next += 1;
                                next - 1
                            },
                            at,
                        )
                    })?);
                }
            }
            TextureLevel::Implicit if clamp => {
                min_lod = Some(recurse(|| {
                    self.next_argument(
                        arguments,
                        {
                            next += 1;
                            next - 1
                        },
                        at,
                    )
                })?);
            }
            TextureLevel::Implicit => {}
        }
        let granularity = recurse(|| {
            self.next_argument(
                arguments,
                {
                    next += 1;
                    next - 1
                },
                at,
            )
        })?;
        let coarse = recurse(|| {
            self.next_argument(
                arguments,
                {
                    next += 1;
                    next - 1
                },
                at,
            )
        })?;
        let output = arguments.get(next).ok_or_else(|| internal(at))?;
        next += 1;
        if let Some(bias) = arguments.get(next) {
            level = SampleLevel::Bias(recurse(|| self.rvalue(bias))?);
        }
        if matches!(level, SampleLevel::Auto | SampleLevel::Bias(_)) {
            let group = self.lw.analysis.derivative_group.is_some();
            let derivatives = self.lw.stage_map(|stage| {
                stage == ShaderStage::Fragment || (stage == ShaderStage::Compute && group)
            });
            if !derivatives {
                level = match min_lod.take() {
                    Some(clamp) => {
                        let zero = self.literal(Literal::F32(0.0), at)?;
                        SampleLevel::Exact((self.math_call(MathFunction::Max, &[clamp, zero], at))?)
                    }
                    None => SampleLevel::Zero,
                };
            }
        }
        let output_ty = self.info(output)?.ty.clone();
        let footprint = self.ir_type(&output_ty, at)?;
        let three = matches!(
            self.lw.module.types[footprint].inner,
            crate::TypeInner::Struct { ref members, .. }
                if members.first().is_some_and(|member| matches!(
                    self.lw.module.types[member.ty].inner,
                    crate::TypeInner::Vector { size: crate::VectorSize::Tri, .. }
                ))
        );
        let ty = self.lw.footprint_result_type(three);
        let result = (self.add(
            Expression::ImageFootprint {
                image,
                coordinate,
                granularity,
                coarse,
                level,
                min_lod,
                ty,
            },
            at,
        ))?;
        let mut components = Vec::with_capacity(5);
        for index in 1..6 {
            components.push(
                (self.add(
                    Expression::AccessIndex {
                        base: result,
                        index,
                    },
                    at,
                ))?,
            );
        }
        let value = (self.add(
            Expression::Compose {
                ty: footprint,
                components,
            },
            at,
        ))?;
        let place = recurse(|| self.place(output))?;
        self.store(&place, value, at)?;
        {
            self.add(
                Expression::AccessIndex {
                    base: result,
                    index: 0,
                },
                at,
            )
        }
    }

    fn interpolate(
        &mut self,
        interpolation: InterpolateAt,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let double = self.info(first)?.ty.base_scalar() == Some(GlslScalar::Double);
        if double {
            let name = match interpolation {
                InterpolateAt::Centroid => "interpolateAtCentroid",
                InterpolateAt::Sample => "interpolateAtSample",
                InterpolateAt::Offset => "interpolateAtOffset",
                InterpolateAt::Vertex => "interpolateAtVertexAMD",
            };
            return Err(semantic(
                format!(
                    "`{name}` on a double-precision interpolant is not supported: the GLSL.std.450 interpolation instructions take 32-bit floats"
                ),
                at,
            ));
        }
        let super::expression::Chain::Place(place) = recurse(|| self.chain(first))? else {
            return Err(internal(at));
        };
        let location = match (interpolation, arguments.get(1)) {
            (InterpolateAt::Sample, Some(sample)) => {
                crate::InterpolationLocation::Sample(recurse(|| self.rvalue(sample))?)
            }
            (InterpolateAt::Offset, Some(offset)) => {
                crate::InterpolationLocation::Offset(recurse(|| self.rvalue(offset))?)
            }
            (InterpolateAt::Vertex, Some(vertex)) => {
                crate::InterpolationLocation::VertexAmd(recurse(|| self.rvalue(vertex))?)
            }
            (InterpolateAt::Centroid, _)
            | (InterpolateAt::Sample | InterpolateAt::Offset | InterpolateAt::Vertex, None) => {
                crate::InterpolationLocation::Centroid
            }
        };
        let value = (self.add(
            Expression::InterpolateAt {
                pointer: place.pointer,
                location,
            },
            at,
        ))?;
        match place.swizzle {
            None => Ok(value),
            Some(ref components) if components.len() == 1 => {
                let index = components.first().copied().ok_or_else(|| internal(at))?;
                self.add(Expression::AccessIndex { base: value, index }, at)
            }
            Some(ref components) => {
                let size = vector_size(u8::try_from(components.len()).unwrap_or(0))
                    .ok_or_else(|| internal(at))?;
                {
                    self.add(
                        Expression::Swizzle {
                            size,
                            vector: value,
                            pattern: super::expression::pattern(components),
                        },
                        at,
                    )
                }
            }
        }
    }

    fn subpass_load(
        &mut self,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let image = recurse(|| self.rvalue(first))?;
        let sample = match arguments.get(1) {
            Some(argument) => Some(recurse(|| self.rvalue(argument))?),
            None => None,
        };
        let zero = self.literal(Literal::I32(0), at)?;
        let ty = self
            .lw
            .vector_type(crate::VectorSize::Bi, crate::Scalar::I32);
        let coordinate = (self.add(
            Expression::Compose {
                ty,
                components: alloc::vec![zero, zero],
            },
            at,
        ))?;
        {
            self.add(
                Expression::ImageLoad {
                    image,
                    coordinate,
                    array_index: None,
                    sample,
                    level: None,
                    sparse: None,
                },
                at,
            )
        }
    }

    fn image(
        &mut self,
        access: ImageAccess,
        lod: bool,
        function: &Function,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            opaque,
            non_uniform,
            ..
        } = recurse(|| self.sampled(first, at))?;
        if non_uniform {
            self.mark(image, NonUniform::VALUE);
        }
        let coordinate_argument = arguments.get(1).ok_or_else(|| internal(at))?;
        let (coordinate, ty) = recurse(|| self.typed(coordinate_argument))?;
        let size = ty.component_count().ok_or_else(|| internal(at))?;
        let (point, array_index) = self.split_storage_coordinate(coordinate, size, opaque, at)?;
        let sample = if opaque.multisample {
            let sample = arguments.get(2).ok_or_else(|| internal(at))?;
            Some(recurse(|| self.rvalue(sample))?)
        } else {
            None
        };
        let level = if lod {
            let level = arguments.get(2).ok_or_else(|| internal(at))?;
            Some(recurse(|| self.rvalue(level))?)
        } else {
            None
        };
        let operands = 2 + usize::from(opaque.multisample) + usize::from(lod);
        match access {
            ImageAccess::Load { sparse: true } => {
                let texel = crate::TypeInner::Vector {
                    size: crate::VectorSize::Quad,
                    scalar: super::types::sampled_scalar(opaque.sampled),
                };
                let sparse = Some(self.lw.sparse_result_type(texel));
                let result = (self.add(
                    Expression::ImageLoad {
                        image,
                        coordinate: point,
                        array_index,
                        sample,
                        level,
                        sparse,
                    },
                    at,
                ))?;
                return recurse(|| self.sparse_result(result, function, arguments, operands, at))
                    .map(Some);
            }
            ImageAccess::Load { sparse: false } => {
                return self
                    .add(
                        Expression::ImageLoad {
                            image,
                            coordinate: point,
                            array_index,
                            sample,
                            level,
                            sparse: None,
                        },
                        at,
                    )
                    .map(Some);
            }
            ImageAccess::Store => {}
        }
        let value = arguments.get(operands).ok_or_else(|| internal(at))?;
        let value = recurse(|| self.rvalue(value))?;
        self.push(
            Statement::ImageStore {
                image,
                coordinate: point,
                array_index,
                sample,
                level,
                value,
            },
            at,
        );
        Ok(None)
    }

    fn query(
        &mut self,
        query: TextureQuery,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            opaque,
            non_uniform,
            ..
        } = recurse(|| self.sampled(first, at))?;
        if non_uniform {
            self.mark(image, NonUniform::VALUE);
        }
        let query = match query {
            TextureQuery::Levels => ImageQuery::NumLevels,
            TextureQuery::Samples => ImageQuery::NumSamples,
            TextureQuery::Size => {
                let level = match arguments.get(1) {
                    Some(level) => Some(recurse(|| self.rvalue(level))?),
                    None => None,
                };
                ImageQuery::Size { level }
            }
        };
        let sized = matches!(query, ImageQuery::Size { .. });
        let mut value = self.add(Expression::ImageQuery { image, query }, at)?;
        if sized && opaque.arrayed {
            let base =
                coordinate_count(opaque) - u32::from(opaque.dimension == TextureDimension::Cube);
            let mut components = Vec::with_capacity(4);
            if base == 1 {
                components.push(value);
            } else {
                for index in 0..base {
                    components.push(self.component(value, index, at)?);
                }
            }
            components.push(
                (self.add(
                    Expression::ImageQuery {
                        image,
                        query: ImageQuery::NumLayers,
                    },
                    at,
                ))?,
            );
            let size =
                vector_size(u8::try_from(base + 1).unwrap_or(0)).ok_or_else(|| internal(at))?;
            let ty = self.lw.vector_type(size, crate::Scalar::U32);
            value = self.add(Expression::Compose { ty, components }, at)?;
        }
        self.as_kind(value, crate::Scalar::I32, at)
    }
}
