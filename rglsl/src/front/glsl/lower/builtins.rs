use alloc::{format, vec::Vec};

use rglsl_ast::ast::{Expression as AstExpression, ExpressionKind};
use rglsl_sema::scope::Function;
use rglsl_sema::types::{
    Opaque, OpaqueKind, Scalar as GlslScalar, TextureDimension, Type as GlslType, TypeKind,
};
use rglsl_sema::{BuiltinFunctionId, Callee};

use super::function::FunctionLowerer;
use super::prepass::strip;
use super::types::{scalar, vector_size};
use super::{internal, unsupported, Result};
use crate::{
    BinaryOperator, BlockMatchMetric, BlockMatchSearch, DerivativeAxis, DerivativeControl,
    Expression, Handle, ImageGatherPattern, ImageProcessingOperation, ImageQuery, Literal,
    MathFunction, NonUniform, PredeclaredType, RelationalFunction, SampleLevel, ShaderStage, Span,
    Statement, SwizzleComponent, UnaryOperator,
};

pub(super) fn math(name: &str, arguments: usize) -> Option<MathFunction> {
    use MathFunction as Mf;
    Some(match name {
        "radians" => Mf::Radians,
        "degrees" => Mf::Degrees,
        "sin" => Mf::Sin,
        "cos" => Mf::Cos,
        "tan" => Mf::Tan,
        "asin" => Mf::Asin,
        "acos" => Mf::Acos,
        "atan" if arguments == 2 => Mf::Atan2,
        "atan" => Mf::Atan,
        "sinh" => Mf::Sinh,
        "cosh" => Mf::Cosh,
        "tanh" => Mf::Tanh,
        "asinh" => Mf::Asinh,
        "acosh" => Mf::Acosh,
        "atanh" => Mf::Atanh,
        "pow" => Mf::Pow,
        "exp" => Mf::Exp,
        "log" => Mf::Log,
        "exp2" => Mf::Exp2,
        "log2" => Mf::Log2,
        "sqrt" => Mf::Sqrt,
        "inversesqrt" => Mf::InverseSqrt,
        "abs" => Mf::Abs,
        "sign" => Mf::Sign,
        "floor" => Mf::Floor,
        "trunc" => Mf::Trunc,
        "round" | "roundEven" => Mf::Round,
        "ceil" => Mf::Ceil,
        "fract" => Mf::Fract,
        "min" => Mf::Min,
        "max" => Mf::Max,
        "clamp" => Mf::Clamp,
        "mix" => Mf::Mix,
        "step" => Mf::Step,
        "smoothstep" => Mf::SmoothStep,
        "fma" => Mf::Fma,
        "ldexp" => Mf::Ldexp,
        "length" => Mf::Length,
        "distance" => Mf::Distance,
        "dot" => Mf::Dot,
        "cross" => Mf::Cross,
        "normalize" => Mf::Normalize,
        "faceforward" => Mf::FaceForward,
        "reflect" => Mf::Reflect,
        "refract" => Mf::Refract,
        "outerProduct" => Mf::Outer,
        "transpose" => Mf::Transpose,
        "determinant" => Mf::Determinant,
        "inverse" => Mf::Inverse,
        "bitfieldReverse" => Mf::ReverseBits,
        "bitCount" => Mf::CountOneBits,
        "findLSB" => Mf::FirstTrailingBit,
        "findMSB" => Mf::FirstLeadingBit,
        "packUnorm2x16" => Mf::Pack2x16unorm,
        "packSnorm2x16" => Mf::Pack2x16snorm,
        "packUnorm4x8" => Mf::Pack4x8unorm,
        "packSnorm4x8" => Mf::Pack4x8snorm,
        "unpackUnorm2x16" => Mf::Unpack2x16unorm,
        "unpackSnorm2x16" => Mf::Unpack2x16snorm,
        "unpackUnorm4x8" => Mf::Unpack4x8unorm,
        "unpackSnorm4x8" => Mf::Unpack4x8snorm,
        "packHalf2x16" => Mf::Pack2x16float,
        "unpackHalf2x16" => Mf::Unpack2x16float,
        _ => return None,
    })
}

fn gather_pattern(name: &str) -> Option<(&'static str, ImageGatherPattern)> {
    let rest = name.strip_prefix("textureGather")?.strip_suffix("QCOM")?;
    let (mode, base) = match rest.strip_suffix("Offset") {
        Some(mode) => (mode, "textureGatherOffset"),
        None => (rest, "textureGather"),
    };
    let pattern = match mode {
        "4x1" => ImageGatherPattern::Linear4x1,
        "V2" => ImageGatherPattern::Vertical2,
        "H2" => ImageGatherPattern::Horizontal2,
        "D" => ImageGatherPattern::Diagonal,
        _ => return None,
    };
    Some((base, pattern))
}

fn image_processing(name: &str) -> Option<ImageProcessingOperation> {
    use BlockMatchMetric as Metric;
    use BlockMatchSearch as Search;
    let block_match = |metric, search| ImageProcessingOperation::BlockMatch { metric, search };
    Some(match name {
        "textureWeightedQCOM" => ImageProcessingOperation::SampleWeighted,
        "textureBoxFilterQCOM" => ImageProcessingOperation::BoxFilter,
        "textureBlockMatchSADQCOM" => block_match(Metric::SumOfAbsoluteDifferences, Search::Block),
        "textureBlockMatchSSDQCOM" => block_match(Metric::SumOfSquaredDifferences, Search::Block),
        "textureBlockMatchWindowSADQCOM" => {
            block_match(Metric::SumOfAbsoluteDifferences, Search::Window)
        }
        "textureBlockMatchWindowSSDQCOM" => {
            block_match(Metric::SumOfSquaredDifferences, Search::Window)
        }
        "textureBlockMatchGatherSADQCOM" => {
            block_match(Metric::SumOfAbsoluteDifferences, Search::Gather)
        }
        "textureBlockMatchGatherSSDQCOM" => {
            block_match(Metric::SumOfSquaredDifferences, Search::Gather)
        }
        _ => return None,
    })
}

pub(super) fn derivative(name: &str) -> Option<(DerivativeAxis, DerivativeControl)> {
    let (axis, rest) = if let Some(rest) = name.strip_prefix("dFdx") {
        (DerivativeAxis::X, rest)
    } else if let Some(rest) = name.strip_prefix("dFdy") {
        (DerivativeAxis::Y, rest)
    } else if let Some(rest) = name.strip_prefix("fwidth") {
        (DerivativeAxis::Width, rest)
    } else {
        return None;
    };
    let control = match rest {
        "" => DerivativeControl::None,
        "Fine" => DerivativeControl::Fine,
        "Coarse" => DerivativeControl::Coarse,
        _ => return None,
    };
    Some((axis, control))
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
    pub(super) fn math_call(
        &mut self,
        fun: MathFunction,
        arguments: &[Handle<Expression>],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let mut iterator = arguments.iter().copied();
        let arg = iterator.next().ok_or_else(|| internal(at))?;
        self.add(
            Expression::Math {
                fun,
                arg,
                arg1: iterator.next(),
                arg2: iterator.next(),
                arg3: iterator.next(),
            },
            at,
        )
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

    pub(super) fn builtin_call(
        &mut self,
        id: BuiltinFunctionId,
        call_type: &GlslType,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let analysis = self.lw.analysis;
        let function = analysis.builtins.function(id).ok_or_else(|| internal(at))?;
        let name = function.name.as_str();
        if let Some(result) = self.ray_builtin_call(name, arguments, at)? {
            return Ok(result);
        }
        match name {
            "texture"
            | "textureProj"
            | "textureLod"
            | "textureOffset"
            | "textureProjOffset"
            | "textureLodOffset"
            | "textureProjLod"
            | "textureProjLodOffset"
            | "textureGrad"
            | "textureGradOffset"
            | "textureProjGrad"
            | "textureProjGradOffset"
            | "textureGather"
            | "textureGatherOffset" => self
                .sample(name, function, arguments, ImageGatherPattern::Quad, at)
                .map(Some),
            _ if gather_pattern(name).is_some() => {
                let (base, pattern) = gather_pattern(name).ok_or_else(|| internal(at))?;
                self.sample(base, function, arguments, pattern, at)
                    .map(Some)
            }
            _ if image_processing(name).is_some() => {
                let operation = image_processing(name).ok_or_else(|| internal(at))?;
                self.image_processing(operation, arguments, at).map(Some)
            }
            "texelFetch" => self.fetch(arguments, false, at).map(Some),
            "texelFetchOffset" => self.fetch(arguments, true, at).map(Some),
            "textureSize" | "textureQueryLevels" | "textureSamples" | "imageSize" => {
                self.query(name, arguments, at).map(Some)
            }
            "imageLoad" | "imageStore" => self.image(name, arguments, at),
            _ if name.starts_with("imageAtomic") => {
                let first = arguments.first().ok_or_else(|| internal(at))?;
                let Sampled {
                    image,
                    opaque,
                    non_uniform,
                    ..
                } = self.sampled(first, at)?;
                self.image_atomic(name, image, opaque, non_uniform, arguments, at)
            }
            "subpassLoad" => self.subpass_load(arguments, at).map(Some),
            "barrier"
            | "memoryBarrier"
            | "memoryBarrierBuffer"
            | "memoryBarrierShared"
            | "memoryBarrierImage"
            | "groupMemoryBarrier"
            | "controlBarrier" => {
                self.barrier(name, arguments, at)?;
                Ok(None)
            }
            "SetMeshOutputsEXT" | "EmitMeshTasksEXT" | "writePackedPrimitiveIndices4x8NV" => {
                self.mesh_statement(name, arguments, at)?;
                Ok(None)
            }
            "EmitVertex" | "EndPrimitive" | "EmitStreamVertex" | "EndStreamPrimitive" => {
                self.primitive_statement(name, arguments, at)?;
                Ok(None)
            }
            "expectEXT" => {
                let value = self.rvalue(arguments.first().ok_or_else(|| internal(at))?)?;
                let expected = self.rvalue(arguments.get(1).ok_or_else(|| internal(at))?)?;
                self.add(Expression::Expect { value, expected }, at)
                    .map(Some)
            }
            "assumeEXT" => {
                let condition = self.rvalue(arguments.first().ok_or_else(|| internal(at))?)?;
                self.flush();
                self.push(Statement::Assume { condition }, at);
                Ok(None)
            }
            "modf" | "frexp" => self.split(name, arguments, at).map(Some),
            "atomicAdd" | "atomicMin" | "atomicMax" | "atomicAnd" | "atomicOr" | "atomicXor"
            | "atomicExchange" | "atomicCompSwap" | "atomicLoad" | "atomicStore" => {
                self.atomic(name, arguments, at)
            }
            "uaddCarry" | "usubBorrow" | "umulExtended" | "imulExtended" => {
                self.wide(name, arguments, at)
            }
            _ if super::subgroup::is_subgroup_function(name) => self.subgroup(name, arguments, at),
            _ => self
                .generic(name, function, call_type, arguments, at)
                .map(Some),
        }
    }

    fn generic(
        &mut self,
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
            let (value, ty) = self.typed(argument)?;
            values.push(value);
            types.push(ty);
        }
        let long_shape = types
            .iter()
            .find(|ty| ty.sized_vector_length().is_some())
            .cloned();
        if let Some(ref shape) = long_shape {
            return self.long_generic(name, call_type, shape, values, types, at);
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
        if let (Some(element), true) = (
            narrow,
            matches!(
                name,
                "findMSB"
                    | "findLSB"
                    | "bitCount"
                    | "bitfieldReverse"
                    | "bitfieldExtract"
                    | "bitfieldInsert"
            ),
        ) {
            return self.narrow_bit_operation(name, &values, element, result, vector, at);
        }
        let wide = first_ty
            .base_scalar()
            .filter(|element| element.is_integer() && element.bits() == 64);
        if let (Some(element), true) = (wide, matches!(name, "findMSB" | "findLSB" | "bitCount")) {
            return self.wide_bit_operation(name, arg(0)?, element, result, vector, at);
        }
        if let Some((axis, ctrl)) = derivative(name) {
            let half = first_ty.base_scalar() == Some(GlslScalar::Float16);
            let mut expr = arg(0)?;
            if half {
                expr = self.as_kind(expr, crate::Scalar::F32, at)?;
            }
            let value = self.add(Expression::Derivative { axis, ctrl, expr }, at)?;
            return if half {
                self.as_kind(value, crate::Scalar::F16, at)
            } else {
                Ok(value)
            };
        }
        match name {
            "isnan" | "isinf" => {
                let fun = if name == "isnan" {
                    RelationalFunction::IsNan
                } else {
                    RelationalFunction::IsInf
                };
                return self.add(
                    Expression::Relational {
                        fun,
                        argument: arg(0)?,
                    },
                    at,
                );
            }
            "any" | "all" => {
                let fun = if name == "any" {
                    RelationalFunction::Any
                } else {
                    RelationalFunction::All
                };
                return self.add(
                    Expression::Relational {
                        fun,
                        argument: arg(0)?,
                    },
                    at,
                );
            }
            "not" => {
                return self.add(
                    Expression::Unary {
                        op: UnaryOperator::LogicalNot,
                        expr: arg(0)?,
                    },
                    at,
                );
            }
            "lessThan" | "lessThanEqual" | "greaterThan" | "greaterThanEqual" | "equal"
            | "notEqual" => {
                let op = match name {
                    "lessThan" => BinaryOperator::Less,
                    "lessThanEqual" => BinaryOperator::LessEqual,
                    "greaterThan" => BinaryOperator::Greater,
                    "greaterThanEqual" => BinaryOperator::GreaterEqual,
                    "equal" => BinaryOperator::Equal,
                    _ => BinaryOperator::NotEqual,
                };
                return self.binary_op(op, arg(0)?, arg(1)?, at);
            }
            "floatBitsToInt"
            | "floatBitsToUint"
            | "intBitsToFloat"
            | "uintBitsToFloat"
            | "doubleBitsToInt64"
            | "doubleBitsToUint64"
            | "int64BitsToDouble"
            | "uint64BitsToDouble"
            | "halfBitsToInt16"
            | "halfBitsToUint16"
            | "float16BitsToInt16"
            | "float16BitsToUint16"
            | "int16BitsToFloat16"
            | "uint16BitsToFloat16"
            | "int16BitsToHalf"
            | "uint16BitsToHalf"
            | "bfloat16BitsToIntEXT"
            | "bfloat16BitsToUintEXT"
            | "intBitsToBFloat16EXT"
            | "uintBitsToBFloat16EXT"
            | "floate4m3BitsToIntEXT"
            | "floate4m3BitsToUintEXT"
            | "intBitsToFloate4m3EXT"
            | "uintBitsToFloate4m3EXT"
            | "floate5m2BitsToIntEXT"
            | "floate5m2BitsToUintEXT"
            | "intBitsToFloate5m2EXT"
            | "uintBitsToFloate5m2EXT" => {
                let kind = scalar(result.base_scalar().ok_or_else(|| internal(at))?).kind;
                return self.add(
                    Expression::As {
                        expr: arg(0)?,
                        kind,
                        convert: None,
                    },
                    at,
                );
            }
            "packFloat2x16" => {
                let wide = self.as_kind(arg(0)?, crate::Scalar::F32, at)?;
                return self.math_call(MathFunction::Pack2x16float, &[wide], at);
            }
            "unpackFloat2x16" => {
                let wide = self.math_call(MathFunction::Unpack2x16float, &[arg(0)?], at)?;
                return self.as_kind(wide, crate::Scalar::F16, at);
            }
            "packInt2x32" | "packUint2x32" | "packInt2x16" | "packUint2x16" | "packInt4x16"
            | "packUint4x16" | "pack16" | "pack32" | "pack64" => {
                return self.pack_bits(arg(0)?, &first_ty, result, at);
            }
            "unpackInt2x32" | "unpackUint2x32" | "unpackInt2x16" | "unpackUint2x16"
            | "unpackInt4x16" | "unpackUint4x16" | "unpack8" | "unpack16" | "unpack32" => {
                return self.unpack_bits(arg(0)?, &first_ty, result, at);
            }
            "mod" => {
                let x = arg(0)?;
                let mut y = arg(1)?;
                if let (Some(size), true) = (vector, types.get(1).is_some_and(GlslType::is_scalar))
                {
                    y = self.splat(y, size, at)?;
                }
                let divided = self.binary_op(BinaryOperator::Divide, x, y, at)?;
                let floor = self.math_call(MathFunction::Floor, &[divided], at)?;
                let product = self.binary_op(BinaryOperator::Multiply, floor, y, at)?;
                return self.binary_op(BinaryOperator::Subtract, x, product, at);
            }
            "mix" if types.get(2).and_then(GlslType::base_scalar) == Some(GlslScalar::Bool) => {
                return self.add(
                    Expression::Select {
                        condition: arg(2)?,
                        accept: arg(1)?,
                        reject: arg(0)?,
                    },
                    at,
                );
            }
            "matrixCompMult" => {
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
                let ty = self.lw.ir_type(result, at)?;
                return self.add(Expression::Compose { ty, components }, at);
            }
            "bitfieldExtract" | "bitfieldInsert" => {
                let mut converted = values.clone();
                let start = if name == "bitfieldExtract" { 1 } else { 2 };
                for slot in converted.iter_mut().skip(start) {
                    *slot = self.as_kind(*slot, crate::Scalar::U32, at)?;
                }
                let fun = if name == "bitfieldExtract" {
                    MathFunction::ExtractBits
                } else {
                    MathFunction::InsertBits
                };
                return self.math_call(fun, &converted, at);
            }
            _ => {}
        }
        if first_ty.is_scalar() {
            match name {
                "dot" => return self.binary_op(BinaryOperator::Multiply, arg(0)?, arg(1)?, at),
                "normalize" => return self.math_call(MathFunction::Sign, &[arg(0)?], at),
                "faceforward" => {
                    let (n, i, reference) = (arg(0)?, arg(1)?, arg(2)?);
                    let product = self.binary_op(BinaryOperator::Multiply, reference, i, at)?;
                    let base = first_ty.base_scalar().ok_or_else(|| internal(at))?;
                    let zero = Literal::zero(scalar(base)).ok_or_else(|| internal(at))?;
                    let zero = self.literal(zero, at)?;
                    let condition = self.binary_op(BinaryOperator::Less, product, zero, at)?;
                    let negated = self.add(
                        Expression::Unary {
                            op: UnaryOperator::Negate,
                            expr: n,
                        },
                        at,
                    )?;
                    return self.add(
                        Expression::Select {
                            condition,
                            accept: n,
                            reject: negated,
                        },
                        at,
                    );
                }
                "reflect" => {
                    let (i, n) = (arg(0)?, arg(1)?);
                    let base = first_ty.base_scalar().ok_or_else(|| internal(at))?;
                    let two = Literal::new(2, scalar(base)).ok_or_else(|| internal(at))?;
                    let two = self.literal(two, at)?;
                    let dot = self.binary_op(BinaryOperator::Multiply, n, i, at)?;
                    let scaled = self.binary_op(BinaryOperator::Multiply, two, dot, at)?;
                    let product = self.binary_op(BinaryOperator::Multiply, scaled, n, at)?;
                    return self.binary_op(BinaryOperator::Subtract, i, product, at);
                }
                _ => {}
            }
        }
        let fun = math(name, values.len())
            .ok_or_else(|| unsupported(format!("the built-in function `{name}`"), at))?;
        if name == "ldexp" {
            let narrow = types
                .get(1)
                .and_then(GlslType::base_scalar)
                .is_some_and(|exponent| exponent.bits() < 32);
            if narrow {
                if let Some(exponent) = values.get_mut(1) {
                    *exponent = self.as_kind(*exponent, crate::Scalar::I32, at)?;
                }
            }
        }
        if let Some(size) = vector {
            let splatted = matches!(
                name,
                "min" | "max" | "clamp" | "mix" | "step" | "smoothstep"
            );
            if splatted {
                for (value, ty) in values.iter_mut().zip(&types) {
                    if ty.is_scalar() {
                        *value = self.splat(*value, size, at)?;
                    }
                }
            }
        }
        let value = self.math_call(fun, &values, at)?;
        let unsigned_input = first_ty.base_scalar().is_some_and(GlslScalar::is_unsigned);
        if matches!(name, "bitCount" | "findLSB" | "findMSB") && unsigned_input {
            let target = scalar(result.base_scalar().ok_or_else(|| internal(at))?);
            return self.as_kind(value, target, at);
        }
        Ok(value)
    }

    fn wide_bit_operation(
        &mut self,
        name: &str,
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
        let mut source = value;
        if name == "findMSB" && element.is_signed() {
            let amount = filled(self, Literal::U32(63))?;
            let sign = self.binary_op(BinaryOperator::ShiftRight, source, amount, at)?;
            source = self.binary_op(BinaryOperator::ExclusiveOr, source, sign, at)?;
        }
        let unsigned = self.bitcast(source, crate::ScalarKind::Uint, at)?;
        let low = self.as_kind(unsigned, crate::Scalar::U32, at)?;
        let amount = filled(self, Literal::U32(32))?;
        let shifted = self.binary_op(BinaryOperator::ShiftRight, unsigned, amount, at)?;
        let high = self.as_kind(shifted, crate::Scalar::U32, at)?;
        let combined = match name {
            "bitCount" => {
                let low = self.math_call(MathFunction::CountOneBits, &[low], at)?;
                let high = self.math_call(MathFunction::CountOneBits, &[high], at)?;
                self.binary_op(BinaryOperator::Add, low, high, at)?
            }
            _ => {
                let fun = if name == "findMSB" {
                    MathFunction::FirstLeadingBit
                } else {
                    MathFunction::FirstTrailingBit
                };
                let low_bit = self.math_call(fun, &[low], at)?;
                let high_bit = self.math_call(fun, &[high], at)?;
                let thirty_two = filled(self, Literal::U32(32))?;
                let high_bit = self.binary_op(BinaryOperator::Add, high_bit, thirty_two, at)?;
                let zero = filled(self, Literal::U32(0))?;
                let (tested, chosen, other) = if name == "findMSB" {
                    (high, high_bit, low_bit)
                } else {
                    (low, low_bit, high_bit)
                };
                let condition = self.binary_op(BinaryOperator::NotEqual, tested, zero, at)?;
                let fallback = if name == "findMSB" {
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
            }
        };
        self.as_kind(combined, result_scalar, at)
    }

    fn narrow_bit_operation(
        &mut self,
        name: &str,
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
        match name {
            "findMSB" | "findLSB" => {
                let extended = self.as_kind(arg(0)?, wide, at)?;
                let fun = if name == "findMSB" {
                    MathFunction::FirstLeadingBit
                } else {
                    MathFunction::FirstTrailingBit
                };
                let found = self.math_call(fun, &[extended], at)?;
                self.as_kind(found, result_scalar, at)
            }
            "bitCount" => {
                let unsigned = self.bitcast(arg(0)?, crate::ScalarKind::Uint, at)?;
                let extended = self.as_kind(unsigned, crate::Scalar::U32, at)?;
                let counted = self.math_call(MathFunction::CountOneBits, &[extended], at)?;
                self.as_kind(counted, result_scalar, at)
            }
            "bitfieldReverse" => {
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
            "bitfieldExtract" => {
                let extended = self.as_kind(arg(0)?, wide, at)?;
                let offset = self.as_kind(arg(1)?, crate::Scalar::U32, at)?;
                let count = self.as_kind(arg(2)?, crate::Scalar::U32, at)?;
                let extracted =
                    self.math_call(MathFunction::ExtractBits, &[extended, offset, count], at)?;
                self.as_kind(extracted, narrow, at)
            }
            _ => {
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
        let (Some(element), Some(count), Some(target)) = (
            source.base_scalar(),
            source.component_count(),
            result.base_scalar(),
        ) else {
            return Err(internal(at));
        };
        let element_bits = element.bits();
        let width = scalar(target).width;
        let unsigned = self.bitcast(value, crate::ScalarKind::Uint, at)?;
        let wide = self.as_kind(
            unsigned,
            crate::Scalar {
                kind: crate::ScalarKind::Uint,
                width,
            },
            at,
        )?;
        let mut packed = self.add(
            Expression::AccessIndex {
                base: wide,
                index: 0,
            },
            at,
        )?;
        for index in 1..count {
            let part = self.add(Expression::AccessIndex { base: wide, index }, at)?;
            let amount = self.shift_amount(index * element_bits, at)?;
            let shifted = self.binary_op(BinaryOperator::ShiftLeft, part, amount, at)?;
            packed = self.binary_op(BinaryOperator::InclusiveOr, packed, shifted, at)?;
        }
        let kind = scalar(target).kind;
        if kind == crate::ScalarKind::Uint {
            Ok(packed)
        } else {
            self.bitcast(packed, kind, at)
        }
    }

    fn unpack_bits(
        &mut self,
        value: Handle<Expression>,
        source: &GlslType,
        result: &GlslType,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let (Some(element), Some(count)) = (result.base_scalar(), result.component_count()) else {
            return Err(internal(at));
        };
        if source.base_scalar().is_none() {
            return Err(internal(at));
        }
        let element_scalar = scalar(element);
        let unsigned_element = crate::Scalar {
            kind: crate::ScalarKind::Uint,
            width: element_scalar.width,
        };
        let unsigned = self.bitcast(value, crate::ScalarKind::Uint, at)?;
        let mut components = Vec::with_capacity(usize::try_from(count).unwrap_or(0));
        for index in 0..count {
            let part = if index == 0 {
                unsigned
            } else {
                let amount = self.shift_amount(index * element.bits(), at)?;
                self.binary_op(BinaryOperator::ShiftRight, unsigned, amount, at)?
            };
            components.push(self.as_kind(part, unsigned_element, at)?);
        }
        let unsigned_ty = result.with_scalar(match element {
            GlslScalar::Int8 => GlslScalar::Uint8,
            GlslScalar::Int16 => GlslScalar::Uint16,
            GlslScalar::Int64 => GlslScalar::Uint64,
            GlslScalar::Int => GlslScalar::Uint,
            other => other,
        });
        let ty = self.lw.ir_type(&unsigned_ty, at)?;
        let composed = self.add(Expression::Compose { ty, components }, at)?;
        if element_scalar.kind == crate::ScalarKind::Uint {
            Ok(composed)
        } else {
            self.bitcast(composed, element_scalar.kind, at)
        }
    }

    fn split(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let &[ref value, ref output] = arguments else {
            return Err(internal(at));
        };
        let (value, ty) = self.typed(value)?;
        let base = ty.base_scalar().ok_or_else(|| internal(at))?;
        let size = match ty.kind {
            TypeKind::Vector { size, .. } => vector_size(size),
            _ => None,
        };
        let (special, fun) = if name == "modf" {
            (
                PredeclaredType::ModfResult {
                    size,
                    scalar: scalar(base),
                },
                MathFunction::Modf,
            )
        } else {
            (
                PredeclaredType::FrexpResult {
                    size,
                    scalar: scalar(base),
                },
                MathFunction::Frexp,
            )
        };
        if ty.sized_vector_length().is_some() {
            self.long_math_result(fun, &ty, at)?;
        } else {
            self.lw.module.generate_predeclared_type(special);
        }
        let result = self.math_call(fun, &[value], at)?;
        let fraction = self.add(
            Expression::AccessIndex {
                base: result,
                index: 0,
            },
            at,
        )?;
        let other = self.add(
            Expression::AccessIndex {
                base: result,
                index: 1,
            },
            at,
        )?;
        let output_ty = self.info(output)?.ty.clone();
        let place = self.place(output)?;
        let other_ty = if name == "modf" {
            ty.clone()
        } else {
            ty.with_scalar(GlslScalar::Int)
        };
        let other = self.convert(other, &other_ty, &output_ty, at)?;
        self.store(&place, other, at)?;
        Ok(fraction)
    }

    fn wide(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let &[ref x, ref y, ref outputs @ ..] = arguments else {
            return Err(internal(at));
        };
        let (x, ty) = self.typed(x)?;
        let (y, _) = self.typed(y)?;
        let base = ty.base_scalar().ok_or_else(|| internal(at))?;
        let size = match ty.kind {
            TypeKind::Vector { size, .. } => vector_size(size),
            _ => None,
        };
        let fun = match name {
            "uaddCarry" => MathFunction::AddCarry,
            "usubBorrow" => MathFunction::SubBorrow,
            _ => MathFunction::MulExtended,
        };
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
        let high = self.add(
            Expression::AccessIndex {
                base: result,
                index: 1,
            },
            at,
        )?;
        let low = self.add(
            Expression::AccessIndex {
                base: result,
                index: 0,
            },
            at,
        )?;
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
            let place = self.place(output)?;
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
                    Some(&Callee::Constructor(_))
                ) | (&ExpressionKind::FunctionCall(_), Some(&Callee::NonUniform))
            );
            if !is_constructor {
                break;
            }
            inner = constructed;
            non_uniform = true;
        }
        if let (&ExpressionKind::FunctionCall(ref call), Some(&Callee::Constructor(ref ty))) =
            (&inner.kind, analysis.calls.get(&inner.id))
        {
            if let Some(opaque) = ty.as_opaque() {
                let &[ref texture, ref sampler] = call.arguments.as_slice() else {
                    return Err(internal(at));
                };
                if let Some(symbol) = self.lw.variable_symbol(texture) {
                    if self.lw.depth.contains(&symbol) && !opaque.shadow {
                        return Err(unsupported(
                            "a texture used both with and without a shadow sampler",
                            at,
                        ));
                    }
                }
                let image = self.rvalue(texture)?;
                let sampler = self.rvalue(sampler)?;
                return Ok(Sampled {
                    image,
                    sampler: Some(sampler),
                    opaque,
                    non_uniform,
                });
            }
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
                    image: self.rvalue(argument)?,
                    sampler: None,
                    opaque,
                    non_uniform: false,
                })
            }
            _ => Err(unsupported("this texture argument", at)),
        }
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

    fn image_processing(
        &mut self,
        operation: ImageProcessingOperation,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        let source = self.sampled(argument(0)?, at)?;
        let coordinate = self.rvalue(argument(1)?)?;
        let (reference, reference_coordinate, size) = match operation {
            ImageProcessingOperation::SampleWeighted => {
                (Some(self.sampled(argument(2)?, at)?), None, None)
            }
            ImageProcessingOperation::BoxFilter => (None, None, Some(self.rvalue(argument(2)?)?)),
            ImageProcessingOperation::BlockMatch { .. } => {
                let reference = self.sampled(argument(2)?, at)?;
                let reference_coordinate = self.rvalue(argument(3)?)?;
                let size = self.rvalue(argument(4)?)?;
                (Some(reference), Some(reference_coordinate), Some(size))
            }
        };
        let non_uniform = source.non_uniform
            || reference
                .as_ref()
                .is_some_and(|reference| reference.non_uniform);
        let result = self.add(
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
        )?;
        if non_uniform {
            self.mark(result, NonUniform::SAMPLED_IMAGE);
        }
        Ok(result)
    }

    fn sample(
        &mut self,
        name: &str,
        function: &Function,
        arguments: &[AstExpression],
        gather_pattern: ImageGatherPattern,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            sampler,
            opaque,
            non_uniform,
        } = self.sampled(first, at)?;
        if sampler.is_none() && opaque.kind != OpaqueKind::CombinedSampler {
            return Err(internal(at));
        }
        let gather = name.starts_with("textureGather");
        let proj = name.contains("Proj");
        let lod = name.contains("Lod");
        let grad = name.contains("Grad");
        let offset = name.ends_with("Offset");
        let coordinate_argument = arguments.get(1).ok_or_else(|| internal(at))?;
        let (coordinate, coordinate_ty) = self.typed(coordinate_argument)?;
        let mut size = u32::from(match coordinate_ty.kind {
            TypeKind::Vector { size, .. } => size,
            _ => 1,
        });
        let mut next = 2;
        let separate_reference = opaque.shadow
            && (gather || (opaque.dimension == TextureDimension::Cube && opaque.arrayed));
        let reference_argument = if separate_reference {
            Some(self.next_argument(arguments, &mut next, at)?)
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
            level = SampleLevel::Exact(self.next_argument(arguments, &mut next, at)?);
        }
        if grad {
            let x = self.next_argument(arguments, &mut next, at)?;
            let y = self.next_argument(arguments, &mut next, at)?;
            level = SampleLevel::Gradient { x, y };
        }
        let mut sample_offset = None;
        if offset {
            sample_offset = Some(self.next_argument(arguments, &mut next, at)?);
        }
        let mut gather_component = None;
        if gather {
            level = SampleLevel::Zero;
            let component = if opaque.shadow {
                SwizzleComponent::X
            } else {
                match arguments.get(next) {
                    Some(component) => match self.constant_index(component) {
                        Some(1) => SwizzleComponent::Y,
                        Some(2) => SwizzleComponent::Z,
                        Some(3) => SwizzleComponent::W,
                        _ => SwizzleComponent::X,
                    },
                    None => SwizzleComponent::X,
                }
            };
            gather_component = Some(component);
        } else if !lod && !grad && next < function.parameters.len() {
            level = SampleLevel::Bias(self.next_argument(arguments, &mut next, at)?);
        }
        if matches!(level, SampleLevel::Auto)
            && !self.lw.options.library
            && self.lw.options.stage != ShaderStage::Fragment
        {
            level = SampleLevel::Zero;
        }
        let sample = self.add(
            Expression::ImageSample {
                image,
                sampler,
                gather: gather_component,
                gather_pattern,
                coordinate: point,
                array_index,
                offset: sample_offset,
                level,
                depth_ref,
                clamp_to_edge: false,
            },
            at,
        )?;
        if non_uniform {
            self.mark(sample, NonUniform::SAMPLED_IMAGE);
        }
        Ok(sample)
    }

    fn next_argument(
        &mut self,
        arguments: &[AstExpression],
        next: &mut usize,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let value = arguments.get(*next).ok_or_else(|| internal(at))?;
        *next += 1;
        self.rvalue(value)
    }

    fn fetch(
        &mut self,
        arguments: &[AstExpression],
        offset: bool,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            opaque,
            non_uniform,
            ..
        } = self.sampled(first, at)?;
        if non_uniform {
            self.mark(image, NonUniform::VALUE);
        }
        let coordinate_argument = arguments.get(1).ok_or_else(|| internal(at))?;
        let (coordinate, ty) = self.typed(coordinate_argument)?;
        let size = ty.component_count().ok_or_else(|| internal(at))?;
        let (mut point, array_index) =
            self.split_coordinate(coordinate, size, opaque, false, at)?;
        let extra = match arguments.get(2) {
            Some(argument) => Some(self.rvalue(argument)?),
            None => None,
        };
        if offset {
            let offset = arguments.get(3).ok_or_else(|| internal(at))?;
            let offset = self.rvalue(offset)?;
            point = self.binary_op(BinaryOperator::Add, point, offset, at)?;
        }
        let (sample, level) = if opaque.multisample {
            (extra, None)
        } else {
            (None, extra)
        };
        self.add(
            Expression::ImageLoad {
                image,
                coordinate: point,
                array_index,
                sample,
                level,
            },
            at,
        )
    }

    fn subpass_load(
        &mut self,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let image = self.rvalue(first)?;
        let sample = match arguments.get(1) {
            Some(argument) => Some(self.rvalue(argument)?),
            None => None,
        };
        let zero = self.literal(Literal::I32(0), at)?;
        let ty = self
            .lw
            .vector_type(crate::VectorSize::Bi, crate::Scalar::I32);
        let coordinate = self.add(
            Expression::Compose {
                ty,
                components: alloc::vec![zero, zero],
            },
            at,
        )?;
        self.add(
            Expression::ImageLoad {
                image,
                coordinate,
                array_index: None,
                sample,
                level: None,
            },
            at,
        )
    }

    fn image(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            opaque,
            non_uniform,
            ..
        } = self.sampled(first, at)?;
        if non_uniform {
            self.mark(image, NonUniform::VALUE);
        }
        if opaque.dimension == TextureDimension::Cube {
            return Err(unsupported("cube storage images", at));
        }
        let coordinate_argument = arguments.get(1).ok_or_else(|| internal(at))?;
        let (coordinate, ty) = self.typed(coordinate_argument)?;
        let size = ty.component_count().ok_or_else(|| internal(at))?;
        let (point, array_index) = self.split_coordinate(coordinate, size, opaque, false, at)?;
        if name == "imageLoad" {
            let sample = if opaque.multisample {
                let sample = arguments.get(2).ok_or_else(|| internal(at))?;
                Some(self.rvalue(sample)?)
            } else {
                None
            };
            return self
                .add(
                    Expression::ImageLoad {
                        image,
                        coordinate: point,
                        array_index,
                        sample,
                        level: None,
                    },
                    at,
                )
                .map(Some);
        }
        if opaque.multisample {
            return Err(unsupported("`imageStore` to multisampled images", at));
        }
        let value = arguments.get(2).ok_or_else(|| internal(at))?;
        let value = self.rvalue(value)?;
        self.push(
            Statement::ImageStore {
                image,
                coordinate: point,
                array_index,
                value,
            },
            at,
        );
        Ok(None)
    }

    fn query(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            opaque,
            non_uniform,
            ..
        } = self.sampled(first, at)?;
        if non_uniform {
            self.mark(image, NonUniform::VALUE);
        }
        let query = match name {
            "textureQueryLevels" => ImageQuery::NumLevels,
            "textureSamples" => ImageQuery::NumSamples,
            _ => {
                let level = match arguments.get(1) {
                    Some(level) => Some(self.rvalue(level)?),
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
            components.push(self.add(
                Expression::ImageQuery {
                    image,
                    query: ImageQuery::NumLayers,
                },
                at,
            )?);
            let size =
                vector_size(u8::try_from(base + 1).unwrap_or(0)).ok_or_else(|| internal(at))?;
            let ty = self.lw.vector_type(size, crate::Scalar::U32);
            value = self.add(Expression::Compose { ty, components }, at)?;
        }
        self.as_kind(value, crate::Scalar::I32, at)
    }
}
