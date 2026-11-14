use super::super::ShaderStages;
use super::{ExpressionError, ExpressionTypeResolver};
use crate::arena::Handle;

impl super::super::Validator {
    pub(super) fn validate_unary(
        op: crate::UnaryOperator,
        expr: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{ScalarKind as Sk, UnaryOperator as Uo};

        let Some((_, scalar)) = resolver.resolve(expr)?.vector_size_and_scalar() else {
            return Err(ExpressionError::InvalidUnaryOperandType(op, expr));
        };
        let allowed = match op {
            Uo::Negate => match scalar.kind {
                Sk::Float | Sk::Sint => true,
                Sk::Uint
                | Sk::Bool
                | Sk::BFloat
                | Sk::FloatE4M3
                | Sk::FloatE5M2
                | Sk::FloatE2M1
                | Sk::FloatE3M2
                | Sk::FloatE2M3
                | Sk::FloatUE8M0
                | Sk::FloatMXINT8 => false,
            },
            Uo::LogicalNot => match scalar.kind {
                Sk::Bool => true,
                Sk::Sint
                | Sk::Uint
                | Sk::Float
                | Sk::BFloat
                | Sk::FloatE4M3
                | Sk::FloatE5M2
                | Sk::FloatE2M1
                | Sk::FloatE3M2
                | Sk::FloatE2M3
                | Sk::FloatUE8M0
                | Sk::FloatMXINT8 => false,
            },
            Uo::BitwiseNot => match scalar.kind {
                Sk::Sint | Sk::Uint => true,
                Sk::Float
                | Sk::Bool
                | Sk::BFloat
                | Sk::FloatE4M3
                | Sk::FloatE5M2
                | Sk::FloatE2M1
                | Sk::FloatE3M2
                | Sk::FloatE2M3
                | Sk::FloatUE8M0
                | Sk::FloatMXINT8 => false,
            },
        };
        if !allowed {
            return Err(ExpressionError::InvalidUnaryOperandType(op, expr));
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_binary(
        op: crate::BinaryOperator,
        left: Handle<crate::Expression>,
        right: Handle<crate::Expression>,
        function: &crate::Function,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{BinaryOperator as Bo, Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        let left_inner = resolver.resolve(left)?;
        let right_inner = resolver.resolve(right)?;
        let good = match op {
            Bo::Add | Bo::Subtract => match *left_inner {
                Ti::Scalar(scalar) | Ti::Vector { scalar, .. } => match scalar.kind {
                    Sk::Uint | Sk::Sint | Sk::Float => left_inner == right_inner,
                    Sk::Bool
                    | Sk::BFloat
                    | Sk::FloatE4M3
                    | Sk::FloatE5M2
                    | Sk::FloatE2M1
                    | Sk::FloatE3M2
                    | Sk::FloatE2M3
                    | Sk::FloatUE8M0
                    | Sk::FloatMXINT8 => false,
                },
                Ti::Matrix { .. } | Ti::CooperativeMatrix { .. } => left_inner == right_inner,
                Ti::LongVector { .. }
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
                | Ti::Spirv { .. } => false,
            },
            Bo::Divide | Bo::Modulo => match *left_inner {
                Ti::Scalar(scalar) | Ti::Vector { scalar, .. } => match scalar.kind {
                    Sk::Uint | Sk::Sint | Sk::Float => left_inner == right_inner,
                    Sk::Bool
                    | Sk::BFloat
                    | Sk::FloatE4M3
                    | Sk::FloatE5M2
                    | Sk::FloatE2M1
                    | Sk::FloatE3M2
                    | Sk::FloatE2M3
                    | Sk::FloatUE8M0
                    | Sk::FloatMXINT8 => false,
                },
                Ti::Matrix { .. }
                | Ti::CooperativeMatrix { .. }
                | Ti::LongVector { .. }
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
                | Ti::Spirv { .. } => false,
            },
            Bo::Multiply => {
                let kind_allowed = match left_inner.scalar_kind() {
                    Some(Sk::Uint | Sk::Sint | Sk::Float) => true,
                    Some(
                        Sk::Bool
                        | Sk::BFloat
                        | Sk::FloatE4M3
                        | Sk::FloatE5M2
                        | Sk::FloatE2M1
                        | Sk::FloatE3M2
                        | Sk::FloatE2M3
                        | Sk::FloatUE8M0
                        | Sk::FloatMXINT8,
                    )
                    | None => false,
                };
                let types_match = match (left_inner, right_inner) {
                    (
                        &Ti::Scalar(scalar1)
                        | &Ti::Vector {
                            scalar: scalar1, ..
                        },
                        &Ti::Scalar(scalar2),
                    )
                    | (
                        &Ti::Scalar(scalar1),
                        &Ti::Vector {
                            scalar: scalar2, ..
                        },
                    ) => scalar1 == scalar2,
                    (
                        &Ti::Scalar(Sc {
                            kind: Sk::Float, ..
                        }),
                        &Ti::Matrix { .. },
                    )
                    | (
                        &Ti::Matrix { .. },
                        &Ti::Scalar(Sc {
                            kind: Sk::Float, ..
                        }),
                    ) => true,
                    (
                        &Ti::Vector {
                            size: size1,
                            scalar: scalar1,
                        },
                        &Ti::Vector {
                            size: size2,
                            scalar: scalar2,
                        },
                    ) => scalar1 == scalar2 && size1 == size2,
                    (
                        &Ti::Matrix { columns, .. },
                        &Ti::Vector {
                            size,
                            scalar:
                                Sc {
                                    kind: Sk::Float, ..
                                },
                        },
                    ) => columns == size,
                    (
                        &Ti::Vector {
                            size,
                            scalar:
                                Sc {
                                    kind: Sk::Float, ..
                                },
                        },
                        &Ti::Matrix { rows, .. },
                    ) => size == rows,
                    (&Ti::Matrix { columns, .. }, &Ti::Matrix { rows, .. }) => columns == rows,
                    (&Ti::Scalar(s1), &Ti::CooperativeMatrix { scalar: s2, .. })
                    | (&Ti::CooperativeMatrix { scalar: s1, .. }, &Ti::Scalar(s2)) => s1 == s2,
                    _ => false,
                };
                let left_width = left_inner.scalar_width().unwrap_or(0);
                let right_width = right_inner.scalar_width().unwrap_or(0);
                kind_allowed && types_match && left_width == right_width
            }
            Bo::Equal | Bo::NotEqual => left_inner.is_sized() && left_inner == right_inner,
            Bo::Less | Bo::LessEqual | Bo::Greater | Bo::GreaterEqual => match *left_inner {
                Ti::Scalar(scalar) | Ti::Vector { scalar, .. } => match scalar.kind {
                    Sk::Uint | Sk::Sint | Sk::Float => left_inner == right_inner,
                    Sk::Bool
                    | Sk::BFloat
                    | Sk::FloatE4M3
                    | Sk::FloatE5M2
                    | Sk::FloatE2M1
                    | Sk::FloatE3M2
                    | Sk::FloatE2M3
                    | Sk::FloatUE8M0
                    | Sk::FloatMXINT8 => false,
                },
                ref other @ (Ti::Matrix { .. }
                | Ti::CooperativeMatrix { .. }
                | Ti::LongVector { .. }
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
                | Ti::Spirv { .. }) => {
                    log::debug!("Op {op:?} left type {other:?}");
                    false
                }
            },
            Bo::LogicalAnd | Bo::LogicalOr => match *left_inner {
                Ti::Scalar(Sc { kind: Sk::Bool, .. })
                | Ti::Vector {
                    scalar: Sc { kind: Sk::Bool, .. },
                    ..
                } => left_inner == right_inner,
                ref other @ (Ti::Scalar(Sc {
                    kind:
                        Sk::Sint
                        | Sk::Uint
                        | Sk::Float
                        | Sk::BFloat
                        | Sk::FloatE4M3
                        | Sk::FloatE5M2
                        | Sk::FloatE2M1
                        | Sk::FloatE3M2
                        | Sk::FloatE2M3
                        | Sk::FloatUE8M0
                        | Sk::FloatMXINT8,
                    ..
                })
                | Ti::Vector {
                    scalar:
                        Sc {
                            kind:
                                Sk::Sint
                                | Sk::Uint
                                | Sk::Float
                                | Sk::BFloat
                                | Sk::FloatE4M3
                                | Sk::FloatE5M2
                                | Sk::FloatE2M1
                                | Sk::FloatE3M2
                                | Sk::FloatE2M3
                                | Sk::FloatUE8M0
                                | Sk::FloatMXINT8,
                            ..
                        },
                    ..
                }
                | Ti::Matrix { .. }
                | Ti::CooperativeMatrix { .. }
                | Ti::LongVector { .. }
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
                | Ti::Spirv { .. }) => {
                    log::debug!("Op {op:?} left type {other:?}");
                    false
                }
            },
            Bo::And | Bo::InclusiveOr => match *left_inner {
                Ti::Scalar(scalar) | Ti::Vector { scalar, .. } => match scalar.kind {
                    Sk::Bool | Sk::Sint | Sk::Uint => left_inner == right_inner,
                    Sk::Float
                    | Sk::BFloat
                    | Sk::FloatE4M3
                    | Sk::FloatE5M2
                    | Sk::FloatE2M1
                    | Sk::FloatE3M2
                    | Sk::FloatE2M3
                    | Sk::FloatUE8M0
                    | Sk::FloatMXINT8 => false,
                },
                ref other @ (Ti::Matrix { .. }
                | Ti::CooperativeMatrix { .. }
                | Ti::LongVector { .. }
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
                | Ti::Spirv { .. }) => {
                    log::debug!("Op {op:?} left type {other:?}");
                    false
                }
            },
            Bo::ExclusiveOr => match *left_inner {
                Ti::Scalar(scalar) | Ti::Vector { scalar, .. } => match scalar.kind {
                    Sk::Sint | Sk::Uint => left_inner == right_inner,
                    Sk::Bool
                    | Sk::Float
                    | Sk::BFloat
                    | Sk::FloatE4M3
                    | Sk::FloatE5M2
                    | Sk::FloatE2M1
                    | Sk::FloatE3M2
                    | Sk::FloatE2M3
                    | Sk::FloatUE8M0
                    | Sk::FloatMXINT8 => false,
                },
                ref other @ (Ti::Matrix { .. }
                | Ti::CooperativeMatrix { .. }
                | Ti::LongVector { .. }
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
                | Ti::Spirv { .. }) => {
                    log::debug!("Op {op:?} left type {other:?}");
                    false
                }
            },
            Bo::ShiftLeft | Bo::ShiftRight => {
                let (base_size, base_scalar) = match *left_inner {
                    Ti::Scalar(scalar) => (Ok(None), scalar),
                    Ti::Vector { size, scalar } => (Ok(Some(size)), scalar),
                    ref other @ (Ti::Matrix { .. }
                    | Ti::CooperativeMatrix { .. }
                    | Ti::LongVector { .. }
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
                    | Ti::Spirv { .. }) => {
                        log::debug!("Op {op:?} base type {other:?}");
                        (Err(()), Sc::BOOL)
                    }
                };
                let shift_size = match *right_inner {
                    Ti::Scalar(Sc { kind: Sk::Uint, .. }) => Ok(None),
                    Ti::Vector {
                        size,
                        scalar: Sc { kind: Sk::Uint, .. },
                    } => Ok(Some(size)),
                    ref other @ (Ti::Scalar(Sc {
                        kind:
                            Sk::Sint
                            | Sk::Float
                            | Sk::Bool
                            | Sk::BFloat
                            | Sk::FloatE4M3
                            | Sk::FloatE5M2
                            | Sk::FloatE2M1
                            | Sk::FloatE3M2
                            | Sk::FloatE2M3
                            | Sk::FloatUE8M0
                            | Sk::FloatMXINT8,
                        ..
                    })
                    | Ti::Vector {
                        scalar:
                            Sc {
                                kind:
                                    Sk::Sint
                                    | Sk::Float
                                    | Sk::Bool
                                    | Sk::BFloat
                                    | Sk::FloatE4M3
                                    | Sk::FloatE5M2
                                    | Sk::FloatE2M1
                                    | Sk::FloatE3M2
                                    | Sk::FloatE2M3
                                    | Sk::FloatUE8M0
                                    | Sk::FloatMXINT8,
                                ..
                            },
                        ..
                    }
                    | Ti::Matrix { .. }
                    | Ti::CooperativeMatrix { .. }
                    | Ti::LongVector { .. }
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
                    | Ti::Spirv { .. }) => {
                        log::debug!("Op {op:?} shift type {other:?}");
                        Err(())
                    }
                };
                match base_scalar.kind {
                    Sk::Sint | Sk::Uint => base_size.is_ok() && base_size == shift_size,
                    Sk::Float
                    | Sk::Bool
                    | Sk::BFloat
                    | Sk::FloatE4M3
                    | Sk::FloatE5M2
                    | Sk::FloatE2M1
                    | Sk::FloatE3M2
                    | Sk::FloatE2M3
                    | Sk::FloatUE8M0
                    | Sk::FloatMXINT8 => false,
                }
            }
        };
        if !good {
            log::debug!(
                "Left: {:?} of type {:?}",
                function.expressions[left],
                left_inner
            );
            log::debug!(
                "Right: {:?} of type {:?}",
                function.expressions[right],
                right_inner
            );
            return Err(ExpressionError::InvalidBinaryOperandTypes {
                op,
                lhs_expr: left,
                lhs_type: left_inner.clone(),
                rhs_expr: right,
                rhs_type: right_inner.clone(),
            });
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_select(
        condition: Handle<crate::Expression>,
        accept: Handle<crate::Expression>,
        reject: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        let accept_inner = resolver.resolve(accept)?;
        let reject_inner = resolver.resolve(reject)?;
        let condition_ty = resolver.resolve(condition)?;
        let condition_good = match *condition_ty {
            Ti::Scalar(Sc {
                kind: Sk::Bool,
                width: _,
            }) => matches!(*accept_inner, Ti::Scalar(_) | Ti::Vector { .. }),
            Ti::Vector {
                size,
                scalar:
                    Sc {
                        kind: Sk::Bool,
                        width: _,
                    },
            } => matches!(*accept_inner, Ti::Vector { size: other_size, .. } if size == other_size),
            Ti::Scalar(Sc {
                kind:
                    Sk::Sint
                    | Sk::Uint
                    | Sk::Float
                    | Sk::BFloat
                    | Sk::FloatE4M3
                    | Sk::FloatE5M2
                    | Sk::FloatE2M1
                    | Sk::FloatE3M2
                    | Sk::FloatE2M3
                    | Sk::FloatUE8M0
                    | Sk::FloatMXINT8,
                ..
            })
            | Ti::Vector {
                scalar:
                    Sc {
                        kind:
                            Sk::Sint
                            | Sk::Uint
                            | Sk::Float
                            | Sk::BFloat
                            | Sk::FloatE4M3
                            | Sk::FloatE5M2
                            | Sk::FloatE2M1
                            | Sk::FloatE3M2
                            | Sk::FloatE2M3
                            | Sk::FloatUE8M0
                            | Sk::FloatMXINT8,
                        ..
                    },
                ..
            }
            | Ti::Matrix { .. }
            | Ti::CooperativeMatrix { .. }
            | Ti::LongVector { .. }
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
            | Ti::Spirv { .. } => false,
        };
        if accept_inner != reject_inner {
            return Err(ExpressionError::SelectValuesTypeMismatch {
                accept: accept_inner.clone(),
                reject: reject_inner.clone(),
            });
        }
        if !condition_good {
            return Err(ExpressionError::SelectConditionNotABool {
                actual: condition_ty.clone(),
            });
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_derivative(
        expr: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        let Some((_, scalar)) = resolver.resolve(expr)?.vector_size_and_scalar() else {
            return Err(ExpressionError::InvalidDerivative);
        };
        if scalar.kind != crate::ScalarKind::Float || scalar.width < 2 {
            return Err(ExpressionError::InvalidDerivative);
        }
        Ok(ShaderStages::FRAGMENT | ShaderStages::COMPUTE_LIKE)
    }

    pub(super) fn validate_relational(
        fun: crate::RelationalFunction,
        argument: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{RelationalFunction as Rf, Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        let argument_inner = resolver.resolve(argument)?;
        match fun {
            Rf::All | Rf::Any => {
                let Ti::Vector {
                    scalar: Sc { kind: Sk::Bool, .. },
                    ..
                } = *argument_inner
                else {
                    log::debug!("All/Any of type {argument_inner:?}");
                    return Err(ExpressionError::InvalidBooleanVector(argument));
                };
            }
            Rf::IsNan | Rf::IsInf => {
                if !matches!(
                    *argument_inner,
                    Ti::Scalar(Sc {
                        kind: Sk::Float,
                        ..
                    }) | Ti::Vector {
                        scalar: Sc {
                            kind: Sk::Float,
                            ..
                        },
                        ..
                    }
                ) {
                    log::debug!("Float test of type {argument_inner:?}");
                    return Err(ExpressionError::InvalidFloatArgument(argument));
                }
            }
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_as(
        expr: Handle<crate::Expression>,
        kind: crate::ScalarKind,
        convert: Option<crate::Bytes>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        let mut base_scalar = match *resolver.resolve(expr)? {
            Ti::Scalar(scalar) | Ti::Vector { scalar, .. } | Ti::Matrix { scalar, .. } => scalar,
            Ti::CooperativeMatrix { .. }
            | Ti::LongVector { .. }
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
            | Ti::Spirv { .. } => return Err(ExpressionError::InvalidCastArgument),
        };
        base_scalar.kind = kind;
        if let Some(width) = convert {
            base_scalar.width = width;
        }
        if Self::check_width(base_scalar).is_err() {
            return Err(ExpressionError::InvalidCastArgument);
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_interpolate_at(
        pointer: Handle<crate::Expression>,
        location: crate::InterpolationLocation,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, TypeInner as Ti};

        if !matches!(
            *resolver.resolve(pointer)?,
            Ti::Pointer {
                space: crate::AddressSpace::Input,
                ..
            } | Ti::ValuePointer {
                space: crate::AddressSpace::Input,
                ..
            }
        ) {
            return Err(ExpressionError::InvalidPointerType(pointer));
        }
        match location {
            crate::InterpolationLocation::Centroid => {}
            crate::InterpolationLocation::Sample(sample) => {
                if !matches!(*resolver.resolve(sample)?, Ti::Scalar(Sc::I32)) {
                    return Err(ExpressionError::InvalidImageOtherIndexType(sample));
                }
            }
            crate::InterpolationLocation::VertexAmd(vertex) => {
                if !matches!(*resolver.resolve(vertex)?, Ti::Scalar(Sc::U32)) {
                    return Err(ExpressionError::InvalidImageOtherIndexType(vertex));
                }
            }
            crate::InterpolationLocation::Offset(offset) => {
                if !matches!(
                    *resolver.resolve(offset)?,
                    Ti::Vector {
                        size: crate::VectorSize::Bi,
                        scalar: Sc::F32 | Sc::F16,
                    }
                ) {
                    return Err(ExpressionError::InvalidImageOtherIndexType(offset));
                }
            }
        }
        Ok(ShaderStages::FRAGMENT)
    }

    pub(super) fn validate_array_conversion(
        conversion: crate::ArrayConversion,
        expr: Handle<crate::Expression>,
        index: Option<Handle<crate::Expression>>,
        ty: Handle<crate::Type>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        let invalid = |reason| Err(ExpressionError::InvalidArrayConversion(conversion, reason));
        let array_of_scalars = |inner: &Ti| {
            if let Ti::Array { base, .. } = *inner {
                module.types[base].inner.scalar()
            } else {
                None
            }
        };
        let source = resolver.resolve(expr)?;
        let target = &module.types[ty].inner;
        let valid = match conversion {
            crate::ArrayConversion::Bitcast => {
                array_of_scalars(source).is_some() && array_of_scalars(target).is_some()
            }
            crate::ArrayConversion::SubArray => {
                let index_valid = match index {
                    Some(index) => matches!(
                        *resolver.resolve(index)?,
                        Ti::Scalar(Sc {
                            kind: Sk::Uint | Sk::Sint,
                            ..
                        })
                    ),
                    None => false,
                };
                index_valid
                    && array_of_scalars(source).is_some()
                    && array_of_scalars(source) == array_of_scalars(target)
            }
            crate::ArrayConversion::ToCooperativeMatrix => {
                array_of_scalars(source).is_some()
                    && matches!(*target, Ti::CooperativeMatrix { .. })
            }
            crate::ArrayConversion::FromCooperativeMatrix => {
                matches!(*source, Ti::CooperativeMatrix { .. })
                    && array_of_scalars(target).is_some()
            }
        };
        if !valid {
            return invalid("wrong operand types");
        }
        if index.is_some() != (conversion == crate::ArrayConversion::SubArray) {
            return invalid("only a sub-array extraction takes an index");
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_bitcast(
        expr: Handle<crate::Expression>,
        ty: Handle<crate::Type>,
        offset: Option<Handle<crate::Expression>>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        if let (
            None,
            &Ti::LongVector {
                size: source_size,
                scalar: source_scalar,
                ..
            },
            &Ti::LongVector {
                size: target_size,
                scalar: target_scalar,
                ..
            },
        ) = (offset, resolver.resolve(expr)?, &module.types[ty].inner)
        {
            if source_size != target_size || source_scalar.bit_width() != target_scalar.bit_width()
            {
                return Err(ExpressionError::InvalidBitcast("sizes differ"));
            }
            return Ok(ShaderStages::all());
        }
        let shape = |inner: &Ti| -> Option<(u32, Sc)> {
            match *inner {
                Ti::Scalar(scalar) => Some((1, scalar)),
                Ti::Vector { size, scalar } => Some((u32::from(size as u8), scalar)),
                Ti::LongVector {
                    size: crate::CooperativeSize::Constant(size),
                    scalar,
                    ..
                } => Some((size.get(), scalar)),
                Ti::LongVector {
                    size: crate::CooperativeSize::Pending(_),
                    ..
                }
                | Ti::Matrix { .. }
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
                | Ti::Spirv { .. } => None,
            }
        };
        let (Some((source_count, source)), Some((target_count, target))) = (
            shape(resolver.resolve(expr)?),
            shape(&module.types[ty].inner),
        ) else {
            return Err(ExpressionError::InvalidBitcast("operands are not numeric"));
        };
        match offset {
            None => {
                if source_count * source.bit_width() != target_count * target.bit_width() {
                    return Err(ExpressionError::InvalidBitcast("sizes differ"));
                }
            }
            Some(offset) => {
                if !matches!(
                    *resolver.resolve(offset)?,
                    Ti::Scalar(Sc {
                        kind: Sk::Uint | Sk::Sint,
                        ..
                    })
                ) || !matches!(source.kind, Sk::Uint | Sk::Sint)
                    || target.bit_width() > source.bit_width()
                {
                    return Err(ExpressionError::InvalidBitcast(
                        "an extraction takes integers and a scalar offset",
                    ));
                }
            }
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_convert(
        expr: Handle<crate::Expression>,
        ty: Handle<crate::Type>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        let source = resolver.resolve(expr)?.scalar();
        let target = module.types[ty].inner.scalar();
        if source.is_none() || target.is_none() {
            return Err(ExpressionError::InvalidCastArgument);
        }
        Ok(ShaderStages::all())
    }
}
