use alloc::format;

use crate::{arena::Handle, common::ForDebugWithTypes};

use super::{ResolveContext, ResolveError, TypeResolution};

impl<'a> ResolveContext<'a> {
    pub(super) fn resolve_binary(
        &self,
        op: crate::BinaryOperator,
        left: Handle<crate::Expression>,
        right: Handle<crate::Expression>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        let types = self.types;
        Ok(match op {
            crate::BinaryOperator::Add
            | crate::BinaryOperator::Subtract
            | crate::BinaryOperator::Divide
            | crate::BinaryOperator::Modulo => past(left)?.clone(),
            crate::BinaryOperator::Multiply => {
                let (res_left, res_right) = (past(left)?, past(right)?);
                match (res_left.inner_with(types), res_right.inner_with(types)) {
                    (
                        &Ti::Matrix {
                            columns: _,
                            rows,
                            scalar,
                        },
                        &Ti::Matrix { columns, .. },
                    ) => TypeResolution::Value(Ti::Matrix {
                        columns,
                        rows,
                        scalar,
                    }),
                    (
                        &Ti::Matrix {
                            columns: _,
                            rows,
                            scalar,
                        },
                        &Ti::Vector { .. },
                    ) => TypeResolution::Value(Ti::Vector { size: rows, scalar }),
                    (
                        &Ti::Vector { .. },
                        &Ti::Matrix {
                            columns,
                            rows: _,
                            scalar,
                        },
                    ) => TypeResolution::Value(Ti::Vector {
                        size: columns,
                        scalar,
                    }),
                    (&Ti::Scalar { .. }, _) => res_right.clone(),
                    (_, &Ti::Scalar { .. }) => res_left.clone(),
                    (&Ti::Vector { .. }, &Ti::Vector { .. })
                    | (&Ti::LongVector { .. }, &Ti::LongVector { .. })
                    | (&Ti::CooperativeMatrix { .. }, &Ti::CooperativeMatrix { .. }) => {
                        res_left.clone()
                    }
                    (tl, tr) => {
                        return Err(ResolveError::IncompatibleOperands(format!(
                            "{tl:?} * {tr:?}"
                        )));
                    }
                }
            }
            crate::BinaryOperator::Equal
            | crate::BinaryOperator::NotEqual
            | crate::BinaryOperator::Less
            | crate::BinaryOperator::LessEqual
            | crate::BinaryOperator::Greater
            | crate::BinaryOperator::GreaterEqual => {
                let scalar = crate::Scalar::BOOL;
                let ty = past(left)?.inner_with(types);
                let inner = match *ty {
                    Ti::Scalar { .. } => Ti::Scalar(scalar),
                    Ti::Vector { size, .. } => Ti::Vector { size, scalar },
                    Ti::LongVector { size, class, .. } => Ti::LongVector {
                        size,
                        scalar,
                        class,
                    },
                    Ti::Matrix { .. }
                    | Ti::CooperativeMatrix { .. }
                    | Ti::TensorLayout { .. }
                    | Ti::TensorView { .. }
                    | Ti::Tensor { .. }
                    | Ti::Atomic(_)
                    | Ti::Pointer { .. }
                    | Ti::ValuePointer { .. }
                    | Ti::Array { .. }
                    | Ti::Struct { .. }
                    | Ti::Image { .. }
                    | Ti::Sampler { .. }
                    | Ti::SampledImage { .. }
                    | Ti::AccelerationStructure
                    | Ti::RayQuery
                    | Ti::HitObject { .. }
                    | Ti::BindingArray { .. }
                    | Ti::BufferDescriptor { .. }
                    | Ti::Spirv { .. } => {
                        return Err(ResolveError::IncompatibleOperands(format!(
                            "{op:?}({ty:?}, _)"
                        )));
                    }
                };
                TypeResolution::Value(inner)
            }
            crate::BinaryOperator::LogicalAnd | crate::BinaryOperator::LogicalOr => {
                let bool = Ti::Scalar(crate::Scalar::BOOL);
                let ty = past(left)?.inner_with(types);
                if *ty == bool {
                    TypeResolution::Value(bool)
                } else {
                    return Err(ResolveError::IncompatibleOperands(format!(
                        "{op:?}({:?}, _)",
                        ty.for_debug(types),
                    )));
                }
            }
            crate::BinaryOperator::And
            | crate::BinaryOperator::ExclusiveOr
            | crate::BinaryOperator::InclusiveOr
            | crate::BinaryOperator::ShiftLeft
            | crate::BinaryOperator::ShiftRight => past(left)?.clone(),
        })
    }

    pub(super) fn resolve_relational(
        &self,
        fun: crate::RelationalFunction,
        argument: Handle<crate::Expression>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        Ok(match fun {
            crate::RelationalFunction::All | crate::RelationalFunction::Any => {
                TypeResolution::Value(Ti::Scalar(crate::Scalar::BOOL))
            }
            crate::RelationalFunction::IsNan | crate::RelationalFunction::IsInf => {
                let ty = past(argument)?.inner_with(self.types);
                match *ty {
                    Ti::Scalar { .. } => TypeResolution::Value(Ti::Scalar(crate::Scalar::BOOL)),
                    Ti::Vector { size, .. } => TypeResolution::Value(Ti::Vector {
                        scalar: crate::Scalar::BOOL,
                        size,
                    }),
                    Ti::LongVector { size, class, .. } => TypeResolution::Value(Ti::LongVector {
                        scalar: crate::Scalar::BOOL,
                        size,
                        class,
                    }),
                    Ti::Matrix { .. }
                    | Ti::CooperativeMatrix { .. }
                    | Ti::TensorLayout { .. }
                    | Ti::TensorView { .. }
                    | Ti::Tensor { .. }
                    | Ti::Atomic(_)
                    | Ti::Pointer { .. }
                    | Ti::ValuePointer { .. }
                    | Ti::Array { .. }
                    | Ti::Struct { .. }
                    | Ti::Image { .. }
                    | Ti::Sampler { .. }
                    | Ti::SampledImage { .. }
                    | Ti::AccelerationStructure
                    | Ti::RayQuery
                    | Ti::HitObject { .. }
                    | Ti::BindingArray { .. }
                    | Ti::BufferDescriptor { .. }
                    | Ti::Spirv { .. } => {
                        return Err(ResolveError::IncompatibleOperands(format!(
                            "{fun:?}({ty:?})"
                        )));
                    }
                }
            }
        })
    }

    pub(super) fn resolve_math(
        &self,
        fun: crate::MathFunction,
        arg: Handle<crate::Expression>,
        arg1: Option<Handle<crate::Expression>>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::MathFunction as Mf;
        use crate::TypeInner as Ti;
        use crate::proc::OverloadSet as _;

        let types = self.types;
        if let (
            Mf::Dot,
            &Ti::Vector {
                scalar:
                    scalar @ crate::Scalar {
                        kind: crate::ScalarKind::BFloat,
                        ..
                    },
                ..
            },
        ) = (fun, past(arg)?.inner_with(types))
        {
            return Ok(TypeResolution::Value(Ti::Scalar(scalar)));
        }
        if let Ti::LongVector { scalar, .. } = *past(arg)?.inner_with(types) {
            if let Some(result) =
                crate::proc::long_math_result(fun, past(arg)?.inner_with(types), types)
            {
                return types
                    .get(&result)
                    .map(TypeResolution::Handle)
                    .ok_or(ResolveError::BuiltinArgumentsInvalid(format!("{fun:?}")));
            }
            return Ok(match fun {
                Mf::Dot | Mf::Length | Mf::Distance => TypeResolution::Value(Ti::Scalar(scalar)),
                Mf::Abs
                | Mf::Min
                | Mf::Max
                | Mf::Clamp
                | Mf::Min3
                | Mf::Max3
                | Mf::Mid3
                | Mf::CubeFaceIndex
                | Mf::CubeFaceCoord
                | Mf::IntelCountLeadingZeros
                | Mf::IntelCountTrailingZeros
                | Mf::AbsoluteDifference
                | Mf::AddSaturate
                | Mf::SubtractSaturate
                | Mf::Average
                | Mf::AverageRounded
                | Mf::Multiply32x16
                | Mf::Cos
                | Mf::Cosh
                | Mf::Sin
                | Mf::Sinh
                | Mf::Tan
                | Mf::Tanh
                | Mf::Acos
                | Mf::Asin
                | Mf::Atan
                | Mf::Atan2
                | Mf::Asinh
                | Mf::Acosh
                | Mf::Atanh
                | Mf::Radians
                | Mf::Degrees
                | Mf::Ceil
                | Mf::Floor
                | Mf::Round
                | Mf::RoundEven
                | Mf::Fract
                | Mf::Trunc
                | Mf::Modf
                | Mf::Frexp
                | Mf::Ldexp
                | Mf::Exp
                | Mf::Exp2
                | Mf::Log
                | Mf::Log2
                | Mf::Pow
                | Mf::Dot4I8Packed
                | Mf::Dot4U8Packed
                | Mf::IntegerDot
                | Mf::IntegerDotAccSat
                | Mf::PackedIntegerDot4x8
                | Mf::PackedIntegerDot4x8AccSat
                | Mf::Outer
                | Mf::Cross
                | Mf::Normalize
                | Mf::FaceForward
                | Mf::Reflect
                | Mf::Refract
                | Mf::Sign
                | Mf::Fma
                | Mf::Mix
                | Mf::Step
                | Mf::SmoothStep
                | Mf::Sqrt
                | Mf::InverseSqrt
                | Mf::Inverse
                | Mf::Transpose
                | Mf::Determinant
                | Mf::CountTrailingZeros
                | Mf::CountLeadingZeros
                | Mf::CountOneBits
                | Mf::ReverseBits
                | Mf::ExtractBits
                | Mf::InsertBits
                | Mf::FirstTrailingBit
                | Mf::FirstLeadingBit
                | Mf::AddCarry
                | Mf::SubBorrow
                | Mf::MulExtended
                | Mf::Pack4x8snorm
                | Mf::Pack4x8unorm
                | Mf::Pack2x16snorm
                | Mf::Pack2x16unorm
                | Mf::Pack2x16float
                | Mf::Pack4xI8
                | Mf::Pack4xU8
                | Mf::Pack4xI8Clamp
                | Mf::Pack4xU8Clamp
                | Mf::PackDouble2x32
                | Mf::Unpack4x8snorm
                | Mf::Unpack4x8unorm
                | Mf::Unpack2x16snorm
                | Mf::Unpack2x16unorm
                | Mf::Unpack2x16float
                | Mf::Unpack4xI8
                | Mf::Unpack4xU8
                | Mf::UnpackDouble2x32 => past(arg)?.clone(),
            });
        }

        let mut overloads = fun.overloads();
        log::debug!(
            "initial overloads for {fun:?}, {:#?}",
            overloads.for_debug(types)
        );

        let res_arg = past(arg)?;
        overloads = overloads.arg(0, res_arg.inner_with(types), types);
        log::debug!(
            "overloads after arg 0 of type {:?}: {:#?}",
            res_arg.for_debug(types),
            overloads.for_debug(types)
        );

        if let Some(arg1) = arg1 {
            let res_arg1 = past(arg1)?;
            overloads = overloads.arg(1, res_arg1.inner_with(types), types);
            log::debug!(
                "overloads after arg 1 of type {:?}: {:#?}",
                res_arg1.for_debug(types),
                overloads.for_debug(types)
            );
        }

        if overloads.is_empty() {
            return Err(ResolveError::BuiltinArgumentsInvalid(format!("{fun:?}")));
        }

        let rule = overloads
            .most_preferred()
            .ok_or_else(|| ResolveError::BuiltinArgumentsInvalid(format!("{fun:?}")))?;

        Ok(rule.conclusion.into_resolution(self.special_types)?)
    }

    pub(super) fn resolve_as(
        &self,
        expr: Handle<crate::Expression>,
        kind: crate::ScalarKind,
        convert: Option<crate::Bytes>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        let ty = past(expr)?.inner_with(self.types);
        Ok(match *ty {
            Ti::Scalar(crate::Scalar { width, .. }) => {
                TypeResolution::Value(Ti::Scalar(crate::Scalar {
                    kind,
                    width: convert.unwrap_or(width),
                }))
            }
            Ti::Vector {
                size,
                scalar: crate::Scalar { kind: _, width },
            } => TypeResolution::Value(Ti::Vector {
                size,
                scalar: crate::Scalar {
                    kind,
                    width: convert.unwrap_or(width),
                },
            }),
            Ti::Matrix {
                columns,
                rows,
                mut scalar,
            } => {
                if let Some(width) = convert {
                    scalar.width = width;
                }
                TypeResolution::Value(Ti::Matrix {
                    columns,
                    rows,
                    scalar,
                })
            }
            Ti::LongVector {
                size,
                scalar: crate::Scalar { kind: _, width },
                class,
            } => TypeResolution::Value(Ti::LongVector {
                size,
                scalar: crate::Scalar {
                    kind,
                    width: convert.unwrap_or(width),
                },
                class,
            }),
            Ti::CooperativeMatrix {
                columns,
                rows,
                scalar: crate::Scalar { kind: _, width },
                role,
                scope,
                class,
            } => TypeResolution::Value(Ti::CooperativeMatrix {
                columns,
                rows,
                scalar: crate::Scalar {
                    kind,
                    width: convert.unwrap_or(width),
                },
                role,
                scope,
                class,
            }),
            Ti::TensorLayout { .. }
            | Ti::TensorView { .. }
            | Ti::Tensor { .. }
            | Ti::Atomic(_)
            | Ti::Pointer { .. }
            | Ti::ValuePointer { .. }
            | Ti::Array { .. }
            | Ti::Struct { .. }
            | Ti::Image { .. }
            | Ti::Sampler { .. }
            | Ti::SampledImage { .. }
            | Ti::AccelerationStructure
            | Ti::RayQuery
            | Ti::HitObject { .. }
            | Ti::BindingArray { .. }
            | Ti::BufferDescriptor { .. }
            | Ti::Spirv { .. } => {
                return Err(ResolveError::IncompatibleOperands(format!(
                    "{ty:?} as {kind:?}"
                )));
            }
        })
    }
}
