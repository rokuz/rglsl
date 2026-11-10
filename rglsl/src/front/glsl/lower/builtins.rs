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
    Barrier, BinaryOperator, DerivativeAxis, DerivativeControl, Expression, Handle, ImageQuery,
    Literal, MathFunction, PredeclaredType, RelationalFunction, SampleLevel, ShaderStage, Span,
    Statement, SwizzleComponent, UnaryOperator,
};

fn math(name: &str, arguments: usize) -> Option<MathFunction> {
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

fn derivative(name: &str) -> Option<(DerivativeAxis, DerivativeControl)> {
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
}

const fn coordinate_count(opaque: Opaque) -> u32 {
    match opaque.dimension {
        TextureDimension::D1 | TextureDimension::Buffer => 1,
        TextureDimension::D2 => 2,
        TextureDimension::D3 | TextureDimension::Cube => 3,
    }
}

impl FunctionLowerer<'_, '_> {
    fn math_call(
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

    fn binary_op(
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
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let analysis = self.lw.analysis;
        let function = analysis.builtins.function(id).ok_or_else(|| internal(at))?;
        let name = function.name.as_str();
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
            | "textureGatherOffset" => self.sample(name, function, arguments, at).map(Some),
            "texelFetch" => self.fetch(arguments, false, at).map(Some),
            "texelFetchOffset" => self.fetch(arguments, true, at).map(Some),
            "textureSize" | "textureQueryLevels" | "textureSamples" | "imageSize" => {
                self.query(name, arguments, at).map(Some)
            }
            "imageLoad" | "imageStore" => self.image(name, arguments, at),
            "barrier" => {
                self.push(Statement::ControlBarrier(Barrier::WORK_GROUP), at);
                Ok(None)
            }
            "modf" | "frexp" => self.split(name, arguments, at).map(Some),
            _ => self.generic(name, function, arguments, at).map(Some),
        }
    }

    fn generic(
        &mut self,
        name: &str,
        function: &Function,
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
        let result = &function.return_type;
        let first_ty = types.first().cloned().unwrap_or(GlslType::VOID);
        let vector = match result.kind {
            TypeKind::Vector { size, .. } => Some(size),
            _ => None,
        };
        let arg = |index: usize| values.get(index).copied().ok_or_else(|| internal(at));
        if let Some((axis, ctrl)) = derivative(name) {
            return self.add(
                Expression::Derivative {
                    axis,
                    ctrl,
                    expr: arg(0)?,
                },
                at,
            );
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
            "floatBitsToInt" | "floatBitsToUint" | "intBitsToFloat" | "uintBitsToFloat" => {
                let kind = match name {
                    "floatBitsToInt" => crate::ScalarKind::Sint,
                    "floatBitsToUint" => crate::ScalarKind::Uint,
                    _ => crate::ScalarKind::Float,
                };
                return self.add(
                    Expression::As {
                        expr: arg(0)?,
                        kind,
                        convert: None,
                    },
                    at,
                );
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
                "refract" => {
                    return Err(unsupported("`refract` on scalars", at));
                }
                _ => {}
            }
        }
        let fun = math(name, values.len())
            .ok_or_else(|| unsupported(format!("the built-in function `{name}`"), at))?;
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
        let unsigned_input = first_ty.base_scalar() == Some(GlslScalar::Uint);
        if matches!(name, "bitCount" | "findLSB" | "findMSB") && unsigned_input {
            return self.as_kind(value, crate::Scalar::I32, at);
        }
        Ok(value)
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
        self.lw.module.generate_predeclared_type(special);
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

    fn sampled(&mut self, argument: &AstExpression, at: Span) -> Result<Sampled> {
        let inner = strip(argument);
        let analysis = self.lw.analysis;
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
                });
            }
        }
        let ty = self.info(argument)?.ty.clone();
        match ty.as_opaque() {
            Some(opaque)
                if opaque.kind == OpaqueKind::Image
                    || opaque.kind == OpaqueKind::CombinedSampler =>
            {
                Ok(Sampled {
                    image: self.rvalue(argument)?,
                    sampler: None,
                    opaque,
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

    fn split_coordinate(
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

    fn sample(
        &mut self,
        name: &str,
        function: &Function,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled {
            image,
            sampler,
            opaque,
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
            let offset_argument = arguments.get(next).ok_or_else(|| internal(at))?;
            if !self.info(offset_argument)?.is_constant {
                return Err(unsupported("non-constant texture offsets", at));
            }
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
        if matches!(level, SampleLevel::Auto) && self.lw.options.stage != ShaderStage::Fragment {
            level = SampleLevel::Zero;
        }
        self.add(
            Expression::ImageSample {
                image,
                sampler,
                gather: gather_component,
                coordinate: point,
                array_index,
                offset: sample_offset,
                level,
                depth_ref,
                clamp_to_edge: false,
            },
            at,
        )
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
        let Sampled { image, opaque, .. } = self.sampled(first, at)?;
        if opaque.is_buffer() {
            return Err(unsupported("buffer textures", at));
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

    fn image(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let first = arguments.first().ok_or_else(|| internal(at))?;
        let Sampled { image, opaque, .. } = self.sampled(first, at)?;
        if opaque.dimension == TextureDimension::Cube {
            return Err(unsupported("cube storage images", at));
        }
        let coordinate_argument = arguments.get(1).ok_or_else(|| internal(at))?;
        let (coordinate, ty) = self.typed(coordinate_argument)?;
        let size = ty.component_count().ok_or_else(|| internal(at))?;
        let (point, array_index) = self.split_coordinate(coordinate, size, opaque, false, at)?;
        if name == "imageLoad" {
            return self
                .add(
                    Expression::ImageLoad {
                        image,
                        coordinate: point,
                        array_index,
                        sample: None,
                        level: None,
                    },
                    at,
                )
                .map(Some);
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
        let Sampled { image, opaque, .. } = self.sampled(first, at)?;
        if opaque.is_buffer() {
            return Err(unsupported("buffer textures", at));
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
