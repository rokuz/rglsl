use super::{BlockContext, ExpressionError, FunctionError};
use crate::arena::Handle;
use crate::span::{AddSpan as _, WithSpan};

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum AtomicError {
    #[error("Pointer {0:?} to atomic is invalid.")]
    InvalidPointer(Handle<crate::Expression>),
    #[error("Address space {0:?} is not supported.")]
    InvalidAddressSpace(crate::AddressSpace),
    #[error("Operand {0:?} has invalid type.")]
    InvalidOperand(Handle<crate::Expression>),
    #[error("Operator {0:?} is not supported.")]
    InvalidOperator(crate::AtomicFunction),
    #[error("Result expression {0:?} is not an `AtomicResult` expression")]
    InvalidResultExpression(Handle<crate::Expression>),
    #[error("Result expression {0:?} is marked as an `exchange`")]
    ResultExpressionExchange(Handle<crate::Expression>),
    #[error("Result expression {0:?} is not marked as an `exchange`")]
    ResultExpressionNotExchange(Handle<crate::Expression>),
    #[error("Result type for {0:?} doesn't match the statement")]
    ResultTypeMismatch(Handle<crate::Expression>),
    #[error("Exchange operations must return a value")]
    MissingReturnValue,
    #[error("Result expression {0:?} is populated by multiple `Atomic` statements")]
    ResultAlreadyPopulated(Handle<crate::Expression>),
}

impl super::super::Validator {
    pub(super) fn validate_texel(
        &self,
        texel: &crate::Texel,
        context: &BlockContext,
    ) -> Result<(crate::StorageFormat, crate::StorageAccess), WithSpan<FunctionError>> {
        use crate::Expression as E;
        let image = texel.image;
        let is_handle = match *context.get_expression(image) {
            E::GlobalVariable(_) | E::FunctionArgument(_) => true,
            E::Access { base, .. } | E::AccessIndex { base, .. } => {
                matches!(*context.get_expression(base), E::GlobalVariable(_))
            }
            E::Literal(_)
            | E::Constant(_)
            | E::Override(_)
            | E::ZeroValue(_)
            | E::Compose { .. }
            | E::Splat { .. }
            | E::Swizzle { .. }
            | E::LocalVariable(_)
            | E::Load { .. }
            | E::ImageSample { .. }
            | E::ImageLoad { .. }
            | E::ImageQuery { .. }
            | E::Unary { .. }
            | E::Binary { .. }
            | E::Select { .. }
            | E::Derivative { .. }
            | E::Relational { .. }
            | E::Math { .. }
            | E::As { .. }
            | E::CallResult(_)
            | E::AtomicResult { .. }
            | E::ArrayLength(_)
            | E::WideArrayLength(_)
            | E::PhysicalPointer { .. }
            | E::PhysicalAddress { .. }
            | E::BufferPointer { .. }
            | E::HeapOffset { .. }
            | E::RayQueryProceedResult
            | E::RayQueryGet { .. }
            | E::ReportIntersectionResult
            | E::AccelerationStructureFromAddress { .. }
            | E::HitObjectGet { .. }
            | E::FetchMicroTriangleVertex { .. }
            | E::SubgroupBallotResult
            | E::SubgroupOperationResult { .. }
            | E::SpirvInstructionResult { .. }
            | E::CooperativeLoad { .. }
            | E::CooperativeMultiplyAdd { .. }
            | E::CooperativeMatrixLength { .. }
            | E::Replicate { .. }
            | E::Expect { .. }
            | E::ImageSparseResident { .. }
            | E::IsHelperInvocation
            | E::ReadClock { .. }
            | E::InterpolateAt { .. }
            | E::FragmentFetch { .. }
            | E::ImageFootprint { .. }
            | E::AttachmentRead { .. }
            | E::CooperativeVectorLoad { .. }
            | E::CooperativeVectorMatMul { .. }
            | E::Convert { .. }
            | E::CooperativeMatrixResult { .. }
            | E::TensorCreate { .. }
            | E::ImageProcessing { .. }
            | E::ArrayConversion { .. }
            | E::Bitcast { .. }
            | E::TensorSet { .. }
            | E::TensorRead { .. }
            | E::TensorQuerySize { .. } => context.heap_image(image).is_some(),
        };
        if !is_handle {
            return Err(
                FunctionError::InvalidImageAtomic(ExpressionError::ExpectedGlobalVariable)
                    .with_span_handle(image, context.expressions),
            );
        }
        let crate::TypeInner::Image {
            class,
            arrayed,
            dim,
        } = *context.resolve_type_inner(image, &self.valid_expression_set)?
        else {
            return Err(
                FunctionError::InvalidImageAtomic(ExpressionError::ExpectedGlobalVariable)
                    .with_span_handle(image, context.expressions),
            );
        };
        let crate::ImageClass::Storage {
            format,
            access,
            multi,
        } = class
        else {
            return Err(
                FunctionError::InvalidImageAtomic(ExpressionError::InvalidImageClass(class))
                    .with_span_handle(image, context.expressions),
            );
        };
        if !context
            .resolve_type_inner(texel.coordinate, &self.valid_expression_set)?
            .addresses_image(dim)
        {
            return Err(FunctionError::InvalidImageAtomic(
                ExpressionError::InvalidImageCoordinateType(dim, texel.coordinate),
            )
            .with_span_handle(texel.coordinate, context.expressions));
        }
        if super::super::image_array_index_expected(dim, arrayed, class)
            != texel.array_index.is_some()
        {
            return Err(
                FunctionError::InvalidImageAtomic(ExpressionError::InvalidImageArrayIndex)
                    .with_span_handle(texel.coordinate, context.expressions),
            );
        }
        for index in texel.array_index.into_iter().chain(texel.sample) {
            if !matches!(
                *context.resolve_type_inner(index, &self.valid_expression_set)?,
                crate::TypeInner::Scalar(crate::Scalar {
                    kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                    width: 4,
                })
            ) {
                return Err(FunctionError::InvalidImageAtomic(
                    ExpressionError::InvalidImageOtherIndexType(index),
                )
                .with_span_handle(index, context.expressions));
            }
        }
        match (texel.sample, multi) {
            (Some(_), true) | (None, false) => {}
            (Some(_), false) => {
                return Err(FunctionError::InvalidImageAtomic(
                    ExpressionError::InvalidImageSampleSelector,
                )
                .with_span_handle(image, context.expressions));
            }
            (None, true) => {
                return Err(FunctionError::InvalidImageAtomic(
                    ExpressionError::MissingImageSampleSelector,
                )
                .with_span_handle(image, context.expressions));
            }
        }
        Ok((format, access))
    }

    pub(super) fn validate_atomic_location(
        &self,
        location: &crate::AtomicLocation,
        context: &BlockContext,
    ) -> Result<crate::Scalar, WithSpan<FunctionError>> {
        use crate::{StorageFormat as Sf, TypeInner as Ti};
        match *location {
            crate::AtomicLocation::Pointer(pointer) => {
                let scalar =
                    match *context.resolve_type_inner(pointer, &self.valid_expression_set)? {
                        Ti::Pointer { base, .. } => match context.types[base].inner {
                            Ti::Atomic(scalar) | Ti::Scalar(scalar) => Some(scalar),
                            Ti::Vector { .. }
                            | Ti::Matrix { .. }
                            | Ti::CooperativeMatrix { .. }
                            | Ti::LongVector { .. }
                            | Ti::TensorLayout { .. }
                            | Ti::TensorView { .. }
                            | Ti::Tensor { .. }
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
                        },
                        Ti::ValuePointer {
                            size: None, scalar, ..
                        } => Some(scalar),
                        Ti::ValuePointer { size: Some(_), .. }
                        | Ti::Scalar(_)
                        | Ti::Vector { .. }
                        | Ti::Matrix { .. }
                        | Ti::CooperativeMatrix { .. }
                        | Ti::LongVector { .. }
                        | Ti::TensorLayout { .. }
                        | Ti::TensorView { .. }
                        | Ti::Tensor { .. }
                        | Ti::Atomic(_)
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
                    };
                match scalar {
                    Some(
                        scalar @ (crate::Scalar {
                            kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                            width: 4 | 8,
                        }
                        | crate::Scalar {
                            kind: crate::ScalarKind::Float,
                            width: 2 | 4 | 8,
                        }),
                    ) => Ok(scalar),
                    _ => Err(AtomicError::InvalidPointer(pointer)
                        .with_span_handle(pointer, context.expressions)
                        .into_other()),
                }
            }
            crate::AtomicLocation::Texel(ref texel) => {
                let (format, _) = self.validate_texel(texel, context)?;
                match format {
                    Sf::R32Sint | Sf::R32Uint | Sf::R32Float | Sf::R64Uint | Sf::R64Sint => {
                        Ok(format.into())
                    }
                    Sf::R8Unorm
                    | Sf::R8Snorm
                    | Sf::R8Uint
                    | Sf::R8Sint
                    | Sf::R16Uint
                    | Sf::R16Sint
                    | Sf::R16Float
                    | Sf::Rg8Unorm
                    | Sf::Rg8Snorm
                    | Sf::Rg8Uint
                    | Sf::Rg8Sint
                    | Sf::Rg16Uint
                    | Sf::Rg16Sint
                    | Sf::Rg16Float
                    | Sf::Rgba8Unorm
                    | Sf::Rgba8Snorm
                    | Sf::Rgba8Uint
                    | Sf::Rgba8Sint
                    | Sf::Bgra8Unorm
                    | Sf::Rgb10a2Uint
                    | Sf::Rgb10a2Unorm
                    | Sf::Rg11b10Ufloat
                    | Sf::Rg32Uint
                    | Sf::Rg32Sint
                    | Sf::Rg32Float
                    | Sf::Rgba16Uint
                    | Sf::Rgba16Sint
                    | Sf::Rgba16Float
                    | Sf::Rgba32Uint
                    | Sf::Rgba32Sint
                    | Sf::Rgba32Float
                    | Sf::R16Unorm
                    | Sf::R16Snorm
                    | Sf::Rg16Unorm
                    | Sf::Rg16Snorm
                    | Sf::Rgba16Unorm
                    | Sf::Rgba16Snorm
                    | Sf::Unknown(_) => Err(FunctionError::InvalidImageAtomic(
                        ExpressionError::InvalidImageFormat(format),
                    )
                    .with_span_handle(texel.image, context.expressions)),
                }
            }
        }
    }

    pub(super) fn validate_atomic_result(
        &mut self,
        result: Handle<crate::Expression>,
        scalar: crate::Scalar,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let crate::Expression::AtomicResult {
            ty,
            comparison: false,
        } = context.expressions[result]
        else {
            return Err(AtomicError::InvalidResultExpression(result)
                .with_span_handle(result, context.expressions)
                .into_other());
        };
        if !self.needs_visit.remove(result) {
            return Err(AtomicError::ResultAlreadyPopulated(result)
                .with_span_handle(result, context.expressions)
                .into_other());
        }
        if context.types[ty].inner != crate::TypeInner::Scalar(scalar) {
            return Err(AtomicError::ResultTypeMismatch(result)
                .with_span_handle(result, context.expressions)
                .into_other());
        }
        self.emit_expression(result, context)
    }

    pub(super) fn validate_atomic(
        &mut self,
        pointer: Handle<crate::Expression>,
        fun: crate::AtomicFunction,
        value: Handle<crate::Expression>,
        result: Option<Handle<crate::Expression>>,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::TypeInner as Ti;
        let pointer_inner = context.resolve_type_inner(pointer, &self.valid_expression_set)?;
        let plain_float = matches!(
            *pointer_inner,
            Ti::Pointer { base, .. }
                if matches!(
                    context.types[base].inner,
                    Ti::Scalar(crate::Scalar {
                        kind: crate::ScalarKind::Float,
                        width: 2 | 4 | 8,
                    }) | Ti::Vector {
                        size: crate::VectorSize::Bi | crate::VectorSize::Quad,
                        scalar: crate::Scalar::F16,
                    }
                )
        ) || matches!(
            *pointer_inner,
            Ti::ValuePointer {
                size: None,
                scalar: crate::Scalar {
                    kind: crate::ScalarKind::Float,
                    width: 2 | 4 | 8,
                },
                ..
            } | Ti::ValuePointer {
                size: Some(crate::VectorSize::Bi | crate::VectorSize::Quad),
                scalar: crate::Scalar::F16,
                ..
            }
        );
        let (pointer_scalar, pointer_space, pointee_size) = match *pointer_inner {
            Ti::Pointer { base, space } => match context.types[base].inner {
                Ti::Atomic(scalar) => (scalar, space, None),
                Ti::Scalar(
                    scalar @ (crate::Scalar {
                        kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                        width: 4 | 8,
                    }
                    | crate::Scalar {
                        kind: crate::ScalarKind::Float,
                        width: 2 | 4 | 8,
                    }),
                ) => (scalar, space, None),
                Ti::Vector {
                    size: size @ (crate::VectorSize::Bi | crate::VectorSize::Quad),
                    scalar: scalar @ crate::Scalar::F16,
                } => (scalar, space, Some(size)),
                ref other @ (Ti::Scalar(_)
                | Ti::Vector { .. }
                | Ti::Matrix { .. }
                | Ti::CooperativeMatrix { .. }
                | Ti::LongVector { .. }
                | Ti::TensorLayout { .. }
                | Ti::TensorView { .. }
                | Ti::Tensor { .. }
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
                    log::error!("Atomic pointer to type {other:?}");
                    return Err(AtomicError::InvalidPointer(pointer)
                        .with_span_handle(pointer, context.expressions)
                        .into_other());
                }
            },
            Ti::ValuePointer {
                size: None,
                scalar:
                    scalar @ (crate::Scalar {
                        kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                        width: 4 | 8,
                    }
                    | crate::Scalar {
                        kind: crate::ScalarKind::Float,
                        width: 2 | 4 | 8,
                    }),
                space,
            } => (scalar, space, None),
            Ti::ValuePointer {
                size: Some(size @ (crate::VectorSize::Bi | crate::VectorSize::Quad)),
                scalar: scalar @ crate::Scalar::F16,
                space,
            } => (scalar, space, Some(size)),
            ref other @ (Ti::ValuePointer { .. }
            | Ti::Scalar(_)
            | Ti::Vector { .. }
            | Ti::Matrix { .. }
            | Ti::CooperativeMatrix { .. }
            | Ti::LongVector { .. }
            | Ti::TensorLayout { .. }
            | Ti::TensorView { .. }
            | Ti::Tensor { .. }
            | Ti::Atomic(_)
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
                log::error!("Atomic operation on type {other:?}");
                return Err(AtomicError::InvalidPointer(pointer)
                    .with_span_handle(pointer, context.expressions)
                    .into_other());
            }
        };

        let value_inner = context.resolve_type_inner(value, &self.valid_expression_set)?;
        let value_scalar = match (value_inner, pointee_size) {
            (&Ti::Scalar(scalar), None) => scalar,
            (&Ti::Vector { size, scalar }, Some(pointee)) if size == pointee => scalar,
            _ => {
                log::error!("Atomic operand type {:?}", *value_inner);
                return Err(AtomicError::InvalidOperand(value)
                    .with_span_handle(value, context.expressions)
                    .into_other());
            }
        };
        if pointer_scalar != value_scalar {
            log::error!("Atomic operand type {:?}", *value_inner);
            return Err(AtomicError::InvalidOperand(value)
                .with_span_handle(value, context.expressions)
                .into_other());
        }

        match pointer_scalar {
            _ if plain_float => {
                if !matches!(
                    fun,
                    crate::AtomicFunction::Add
                        | crate::AtomicFunction::Min
                        | crate::AtomicFunction::Max
                        | crate::AtomicFunction::Exchange { compare: None }
                ) {
                    return Err(AtomicError::InvalidOperator(fun)
                        .with_span_handle(value, context.expressions)
                        .into_other());
                }
            }
            crate::Scalar::I64 | crate::Scalar::U64 => {}
            crate::Scalar::F32 => {
                if !matches!(
                    fun,
                    crate::AtomicFunction::Add
                        | crate::AtomicFunction::Subtract
                        | crate::AtomicFunction::Exchange { compare: None }
                ) {
                    log::error!("Float32 atomic operation {fun:?} is not supported");
                    return Err(AtomicError::InvalidOperator(fun)
                        .with_span_handle(value, context.expressions)
                        .into_other());
                }
                if !matches!(pointer_space, crate::AddressSpace::Storage { .. }) {
                    log::error!(
                        "Float32 atomic operations are only supported in the Storage address space"
                    );
                    return Err(AtomicError::InvalidAddressSpace(pointer_space)
                        .with_span_handle(value, context.expressions)
                        .into_other());
                }
            }
            _ => {}
        }

        match result {
            Some(result) => {
                let crate::Expression::AtomicResult {
                    ty: result_ty,
                    comparison,
                } = context.expressions[result]
                else {
                    return Err(AtomicError::InvalidResultExpression(result)
                        .with_span_handle(result, context.expressions)
                        .into_other());
                };

                if !self.needs_visit.remove(result) {
                    return Err(AtomicError::ResultAlreadyPopulated(result)
                        .with_span_handle(result, context.expressions)
                        .into_other());
                }

                if let crate::AtomicFunction::Exchange {
                    compare: Some(compare),
                } = fun
                {
                    let compare_inner =
                        context.resolve_type_inner(compare, &self.valid_expression_set)?;
                    if !compare_inner.non_struct_equivalent(value_inner, context.types) {
                        log::error!(
                            "Atomic exchange comparison has a different type from the value"
                        );
                        return Err(AtomicError::InvalidOperand(compare)
                            .with_span_handle(compare, context.expressions)
                            .into_other());
                    }

                    let Ti::Struct { ref members, .. } = context.types[result_ty].inner else {
                        return Err(AtomicError::ResultTypeMismatch(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    };
                    if !super::super::validate_atomic_compare_exchange_struct(
                        context.types,
                        members,
                        |ty: &Ti| *ty == Ti::Scalar(pointer_scalar),
                    ) {
                        return Err(AtomicError::ResultTypeMismatch(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    }

                    if !comparison {
                        return Err(AtomicError::ResultExpressionNotExchange(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    }
                } else {
                    let result_inner = &context.types[result_ty].inner;
                    if !result_inner.non_struct_equivalent(value_inner, context.types) {
                        return Err(AtomicError::ResultTypeMismatch(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    }

                    if comparison {
                        return Err(AtomicError::ResultExpressionExchange(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    }
                }
                self.emit_expression(result, context)?;
            }

            None => {
                if let crate::AtomicFunction::Exchange { compare: None } = fun {
                    log::error!("Atomic exchange's value is unused");
                    return Err(AtomicError::MissingReturnValue
                        .with_span_static(span, "atomic exchange operation")
                        .into_other());
                }
            }
        }

        Ok(())
    }

    #[expect(
        clippy::too_many_arguments,
        reason = "the arguments are the fields of Statement::ImageAtomic"
    )]
    pub(super) fn validate_image_atomic(
        &mut self,
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        array_index: Option<Handle<crate::Expression>>,
        fun: crate::AtomicFunction,
        value: Handle<crate::Expression>,
        sample: Option<Handle<crate::Expression>>,
        result: Option<Handle<crate::Expression>>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::{StorageFormat as Sf, TypeInner as Ti};
        let texel = crate::Texel {
            image,
            coordinate,
            array_index,
            sample,
        };
        let (format, access) = self.validate_texel(&texel, context)?;
        if !access.contains(crate::StorageAccess::ATOMIC) {
            return Err(FunctionError::InvalidImageAtomic(
                ExpressionError::InvalidImageStorageAccess(access),
            )
            .with_span_handle(image, context.expressions));
        }
        let supported = match format {
            Sf::R64Uint | Sf::R64Sint | Sf::R32Sint | Sf::R32Uint => {
                !matches!(fun, crate::AtomicFunction::Subtract)
            }
            Sf::R32Float => matches!(
                fun,
                crate::AtomicFunction::Exchange { compare: None }
                    | crate::AtomicFunction::Add
                    | crate::AtomicFunction::Min
                    | crate::AtomicFunction::Max
            ),
            Sf::R8Unorm
            | Sf::R8Snorm
            | Sf::R8Uint
            | Sf::R8Sint
            | Sf::R16Uint
            | Sf::R16Sint
            | Sf::R16Float
            | Sf::Rg8Unorm
            | Sf::Rg8Snorm
            | Sf::Rg8Uint
            | Sf::Rg8Sint
            | Sf::Rg16Uint
            | Sf::Rg16Sint
            | Sf::Rg16Float
            | Sf::Rgba8Unorm
            | Sf::Rgba8Snorm
            | Sf::Rgba8Uint
            | Sf::Rgba8Sint
            | Sf::Bgra8Unorm
            | Sf::Rgb10a2Uint
            | Sf::Rgb10a2Unorm
            | Sf::Rg11b10Ufloat
            | Sf::Rg32Uint
            | Sf::Rg32Sint
            | Sf::Rg32Float
            | Sf::Rgba16Uint
            | Sf::Rgba16Sint
            | Sf::Rgba16Float
            | Sf::Rgba32Uint
            | Sf::Rgba32Sint
            | Sf::Rgba32Float
            | Sf::R16Unorm
            | Sf::R16Snorm
            | Sf::Rg16Unorm
            | Sf::Rg16Snorm
            | Sf::Rgba16Unorm
            | Sf::Rgba16Snorm
            | Sf::Unknown(_) => {
                return Err(FunctionError::InvalidImageAtomic(
                    ExpressionError::InvalidImageFormat(format),
                )
                .with_span_handle(image, context.expressions));
            }
        };
        if !supported {
            return Err(FunctionError::InvalidImageAtomicFunction(fun)
                .with_span_handle(image, context.expressions));
        }
        let value_ty = Ti::Scalar(format.into());
        if *context.resolve_type_inner(value, &self.valid_expression_set)? != value_ty {
            return Err(FunctionError::InvalidImageAtomicValue(value)
                .with_span_handle(value, context.expressions));
        }
        if let crate::AtomicFunction::Exchange {
            compare: Some(compare),
        } = fun
            && *context.resolve_type_inner(compare, &self.valid_expression_set)? != value_ty
        {
            return Err(FunctionError::InvalidImageAtomicValue(compare)
                .with_span_handle(compare, context.expressions));
        }
        if let Some(result) = result {
            self.validate_atomic_result(result, format.into(), context)?;
        }
        Ok(())
    }

    pub(super) fn validate_atomic_load(
        &mut self,
        location: &crate::AtomicLocation,
        result: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let scalar = self.validate_atomic_location(location, context)?;
        self.validate_atomic_result(result, scalar, context)
    }

    pub(super) fn validate_atomic_store(
        &self,
        location: &crate::AtomicLocation,
        value: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let scalar = self.validate_atomic_location(location, context)?;
        if *context.resolve_type_inner(value, &self.valid_expression_set)?
            != crate::TypeInner::Scalar(scalar)
        {
            return Err(AtomicError::InvalidOperand(value)
                .with_span_handle(value, context.expressions)
                .into_other());
        }
        Ok(())
    }
}
