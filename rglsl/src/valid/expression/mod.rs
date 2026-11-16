mod access;
mod cooperative;
mod image;
mod math;
mod ops;
mod ray;

use super::{FunctionInfo, ModuleInfo, ShaderStages, TypeFlags, compose::validate_compose};
use crate::arena::{Handle, UniqueArena};
use crate::proc::{IndexableLengthError, ResolveError};

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum ExpressionError {
    #[error(
        "Used by a statement before it was introduced into the scope by any of the dominating blocks"
    )]
    NotInScope,
    #[error("Depends on {0:?}, which has not been processed yet")]
    NotYetProcessed(Handle<crate::Expression>),
    #[error("Base type {0:?} is not compatible with this expression")]
    InvalidBaseType(Handle<crate::Expression>),
    #[error("Accessing with index {0:?} can't be done")]
    InvalidIndexType(Handle<crate::Expression>),
    #[error("Accessing {0:?} via a negative index is invalid")]
    NegativeIndex(Handle<crate::Expression>),
    #[error("Accessing index {1} is out of {0:?} bounds")]
    IndexOutOfBounds(Handle<crate::Expression>, u32),
    #[error("Function argument {0:?} doesn't exist")]
    FunctionArgumentDoesntExist(u32),
    #[error("Loading of {0:?} can't be done")]
    InvalidPointerType(Handle<crate::Expression>),
    #[error("Array length of {0:?} can't be done")]
    InvalidArrayType(Handle<crate::Expression>),
    #[error("Expression {0:?} cannot be converted to or from a physical storage buffer pointer")]
    InvalidPhysicalPointer(Handle<crate::Expression>),
    #[error("Expression {0:?} is not a pointer into a descriptor heap of the expected kind")]
    InvalidHeapPointer(Handle<crate::Expression>),
    #[error("Get intersection of {0:?} can't be done")]
    InvalidRayQueryType(Handle<crate::Expression>),
    #[error("Expression {0:?} is not a hit object of the kind the operation needs")]
    InvalidHitObjectType(Handle<crate::Expression>),
    #[error("Operand {0:?} of a micro-triangle fetch has the wrong type")]
    InvalidMicroTriangleOperand(Handle<crate::Expression>),
    #[error("Splatting {0:?} can't be done")]
    InvalidSplatType(Handle<crate::Expression>),
    #[error("Swizzling {0:?} can't be done")]
    InvalidVectorType(Handle<crate::Expression>),
    #[error("Swizzle component {0:?} is outside of vector size {1:?}")]
    InvalidSwizzleComponent(crate::SwizzleComponent, crate::VectorSize),
    #[error(transparent)]
    Compose(#[from] super::ComposeError),
    #[error("Cannot construct zero value of {0:?} because it is not a constructible type")]
    InvalidZeroValue(Handle<crate::Type>),
    #[error(transparent)]
    IndexableLength(#[from] IndexableLengthError),
    #[error("Operation {0:?} can't work with {1:?}")]
    InvalidUnaryOperandType(crate::UnaryOperator, Handle<crate::Expression>),
    #[error(
        "Operation {:?} can't work with {:?} (of type {:?}) and {:?} (of type {:?})",
        op,
        lhs_expr,
        lhs_type,
        rhs_expr,
        rhs_type
    )]
    InvalidBinaryOperandTypes {
        op: crate::BinaryOperator,
        lhs_expr: Handle<crate::Expression>,
        lhs_type: crate::TypeInner,
        rhs_expr: Handle<crate::Expression>,
        rhs_type: crate::TypeInner,
    },
    #[error(
        "Expected selection argument types to match, but reject value of type {reject:?} does not match accept value of value {accept:?}"
    )]
    SelectValuesTypeMismatch {
        accept: crate::TypeInner,
        reject: crate::TypeInner,
    },
    #[error("Expected selection condition to be a boolean value, got {actual:?}")]
    SelectConditionNotABool { actual: crate::TypeInner },
    #[error("Relational argument {0:?} is not a boolean vector")]
    InvalidBooleanVector(Handle<crate::Expression>),
    #[error("Relational argument {0:?} is not a float")]
    InvalidFloatArgument(Handle<crate::Expression>),
    #[error("Type resolution failed")]
    Type(#[from] ResolveError),
    #[error("The address {0:?} of an acceleration structure must be a `u64` or a `vec2<u32>`")]
    InvalidAccelerationStructureAddress(Handle<crate::Expression>),
    #[error("Not a global variable")]
    ExpectedGlobalVariable,
    #[error("Not a global variable or a function argument")]
    ExpectedGlobalOrArgument,
    #[error("Needs to be an binding array instead of {0:?}")]
    ExpectedBindingArrayType(Handle<crate::Type>),
    #[error("Needs to be an image instead of {0:?}")]
    ExpectedImageType(Handle<crate::Type>),
    #[error("Needs to be an image instead of {0:?}")]
    ExpectedSamplerType(Handle<crate::Type>),
    #[error("Unable to operate on image class {0:?}")]
    InvalidImageClass(crate::ImageClass),
    #[error("Image atomics are not supported for storage format {0:?}")]
    InvalidImageFormat(crate::StorageFormat),
    #[error("Image atomics require atomic storage access, {0:?} is insufficient")]
    InvalidImageStorageAccess(crate::StorageAccess),
    #[error("Derivatives can only be taken from scalar and vector floats")]
    InvalidDerivative,
    #[error("Image array index parameter is misplaced")]
    InvalidImageArrayIndex,
    #[error("Cannot textureLoad from a specific multisample sample on a non-multisampled image.")]
    InvalidImageSampleSelector,
    #[error("Cannot textureLoad from a multisampled image without specifying a sample.")]
    MissingImageSampleSelector,
    #[error("Cannot textureLoad with a specific mip level on a non-mipmapped image.")]
    InvalidImageLevelSelector,
    #[error("Cannot textureLoad from a mipmapped image without specifying a level.")]
    MissingImageLevelSelector,
    #[error("Image array index type of {0:?} is not an integer scalar")]
    InvalidImageArrayIndexType(Handle<crate::Expression>),
    #[error("Image sample or level-of-detail index's type of {0:?} is not an integer scalar")]
    InvalidImageOtherIndexType(Handle<crate::Expression>),
    #[error("Image coordinate type of {1:?} does not match dimension {0:?}")]
    InvalidImageCoordinateType(crate::ImageDimension, Handle<crate::Expression>),
    #[error(
        "Comparison sampling mismatch: image has class {image:?}, but the sampler is comparison={sampler}, and the reference was provided={has_ref}"
    )]
    ComparisonSamplingMismatch {
        image: crate::ImageClass,
        sampler: bool,
        has_ref: bool,
    },
    #[error("Sample offset constant {1:?} doesn't match the image dimension {0:?}")]
    InvalidSampleOffset(crate::ImageDimension, Handle<crate::Expression>),
    #[error("Depth reference {0:?} is not a scalar float")]
    InvalidDepthReference(Handle<crate::Expression>),
    #[error("Gather level can only be Zero, an explicit level or a bias")]
    InvalidGatherLevel,
    #[error("Sparse result type {0:?} must be a struct of an `i32` and the texel")]
    InvalidSparseResultType(Handle<crate::Type>),
    #[error(
        "Minimum level of detail {0:?} must be a float scalar on an implicit or gradient level"
    )]
    InvalidMinLod(Handle<crate::Expression>),
    #[error("Residency code {0:?} must be an `i32`")]
    InvalidResidencyCode(Handle<crate::Expression>),
    #[error("Level of detail query on {0:?} needs a sampled image and a coordinate {1:?}")]
    InvalidLodQuery(Handle<crate::Type>, Handle<crate::Expression>),
    #[error("Gather component {0:?} doesn't exist in the image")]
    InvalidGatherComponent(crate::SwizzleComponent),
    #[error("Gather can't be done for image dimension {0:?}")]
    InvalidGatherDimension(crate::ImageDimension),
    #[error("Gather pattern {0:?} requires a gather on a sampled two-dimensional image")]
    InvalidGatherPattern(crate::ImageGatherPattern),
    #[error("Image processing operation {0:?} is invalid: {1}")]
    InvalidImageProcessing(crate::ImageProcessingOperation, &'static str),
    #[error("Array conversion {0:?} is invalid: {1}")]
    InvalidArrayConversion(crate::ArrayConversion, &'static str),
    #[error("Bitcast is invalid: {0}")]
    InvalidBitcast(&'static str),
    #[error("Sample level (exact) type {0:?} has an invalid type")]
    InvalidSampleLevelExactType(Handle<crate::Expression>),
    #[error("Sample level (bias) type {0:?} is not a scalar float")]
    InvalidSampleLevelBiasType(Handle<crate::Expression>),
    #[error("Sample level (gradient) of {1:?} doesn't match the image dimension {0:?}")]
    InvalidSampleLevelGradientType(crate::ImageDimension, Handle<crate::Expression>),
    #[error("Unable to cast")]
    InvalidCastArgument,
    #[error("Invalid argument count for {0:?}")]
    WrongArgumentCount(crate::MathFunction),
    #[error("Argument [{1}] to {0:?} as expression {2:?} has an invalid type.")]
    InvalidArgumentType(crate::MathFunction, u32, Handle<crate::Expression>),
    #[error(transparent)]
    Literal(#[from] LiteralError),
    #[error(
        "{0:?} is not supported for Width {2} {1:?} arguments yet, see https://github.com/gfx-rs/wgpu/issues/5276"
    )]
    UnsupportedWidth(crate::MathFunction, crate::ScalarKind, crate::Bytes),
    #[error("Invalid operand for cooperative op")]
    InvalidCooperativeOperand(Handle<crate::Expression>),
    #[error("Invalid operand {0:?} for a tensor operation")]
    InvalidTensorOperand(Handle<crate::Expression>),
}

#[derive(Clone, Copy)]
pub(super) enum TensorData {
    Scalar,
    Array(Option<u32>),
}

impl TensorData {
    pub(super) fn coordinates_of(self, rank: crate::CooperativeSize) -> bool {
        match self {
            Self::Scalar => false,
            Self::Array(Some(length)) => rank.known().is_none_or(|rank| rank == length),
            Self::Array(None) => true,
        }
    }
}

pub(super) fn tensor_shape(
    inner: &crate::TypeInner,
    types: &UniqueArena<crate::Type>,
) -> Option<(crate::Scalar, TensorData)> {
    use crate::TypeInner as Ti;

    match *inner {
        Ti::Scalar(scalar) => Some((scalar, TensorData::Scalar)),
        Ti::Array { base, size, .. } => {
            let length = match size {
                crate::ArraySize::Constant(length) => Some(length.get()),
                crate::ArraySize::Pending(_) => None,
                crate::ArraySize::Dynamic => return None,
            };
            let Ti::Scalar(scalar) = types[base].inner else {
                return None;
            };
            Some((scalar, TensorData::Array(length)))
        }
        _ => None,
    }
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum ConstExpressionError {
    #[error("The expression is not a constant or override expression")]
    NonConstOrOverride,
    #[error("The expression is not a fully evaluated constant expression")]
    NonFullyEvaluatedConst,
    #[error(transparent)]
    Compose(#[from] super::ComposeError),
    #[error("Splatting {0:?} can't be done")]
    InvalidSplatType(Handle<crate::Expression>),
    #[error("Type resolution failed")]
    Type(#[from] ResolveError),
    #[error(transparent)]
    Literal(#[from] LiteralError),
    #[error(transparent)]
    Width(#[from] super::r#type::WidthError),
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum LiteralError {
    #[error("Float literal is NaN")]
    NaN,
    #[error("Float literal is infinite")]
    Infinity,
    #[error(transparent)]
    Width(#[from] super::r#type::WidthError),
}

struct ExpressionTypeResolver<'a> {
    root: Handle<crate::Expression>,
    types: &'a UniqueArena<crate::Type>,
    info: &'a FunctionInfo,
}

impl ExpressionTypeResolver<'_> {
    fn resolve(
        &self,
        handle: Handle<crate::Expression>,
    ) -> Result<&crate::TypeInner, ExpressionError> {
        if handle < self.root
            && let Some(info) = self.info.expression_info(handle)
        {
            return Ok(info.ty.inner_with(self.types));
        }
        Err(ExpressionError::NotYetProcessed(handle))
    }
}

impl super::Validator {
    fn validate_long_expression(
        expression: &crate::Expression,
        resolver: &ExpressionTypeResolver,
    ) -> Result<Option<ShaderStages>, ExpressionError> {
        use crate::{Expression as E, TypeInner as Ti};
        let long = |handle: Handle<crate::Expression>| -> Result<bool, ExpressionError> {
            let inner = resolver.resolve(handle)?;
            let encoded = inner.scalar_kind().is_some_and(|kind| {
                matches!(
                    kind,
                    crate::ScalarKind::BFloat
                        | crate::ScalarKind::FloatE4M3
                        | crate::ScalarKind::FloatE5M2
                )
            });
            Ok(encoded || matches!(*inner, Ti::LongVector { .. } | Ti::CooperativeMatrix { .. }))
        };
        let shape = |handle: Handle<crate::Expression>| {
            resolver.resolve(handle).map(|inner| match *inner {
                Ti::LongVector { size, class, .. } => Some((Some(size), Some(class), None)),
                Ti::Vector { size, .. } => Some((None, None, Some(size))),
                Ti::Scalar(_) => None,
                _ => Some((None, None, None)),
            })
        };
        let operands: arrayvec::ArrayVec<Handle<crate::Expression>, 4> = match *expression {
            E::Unary { expr, .. }
            | E::Derivative { expr, .. }
            | E::As { expr, .. }
            | E::Relational { argument: expr, .. } => [expr].into_iter().collect(),
            E::Binary { left, right, .. } => [left, right].into_iter().collect(),
            E::Select { accept, reject, .. } => [accept, reject].into_iter().collect(),
            E::Math {
                arg,
                arg1,
                arg2,
                arg3,
                ..
            } => [Some(arg), arg1, arg2, arg3]
                .into_iter()
                .flatten()
                .collect(),
            E::Literal(_)
            | E::Constant(_)
            | E::Override(_)
            | E::ZeroValue(_)
            | E::Compose { .. }
            | E::Access { .. }
            | E::AccessIndex { .. }
            | E::Splat { .. }
            | E::Swizzle { .. }
            | E::FunctionArgument(_)
            | E::GlobalVariable(_)
            | E::LocalVariable(_)
            | E::Load { .. }
            | E::ImageSample { .. }
            | E::ImageLoad { .. }
            | E::ImageQuery { .. }
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
            | E::TensorQuerySize { .. } => return Ok(None),
        };
        let mut any_long = false;
        for &operand in &operands {
            any_long |= long(operand)?;
        }
        if !any_long {
            return Ok(None);
        }
        let mut expected = None;
        for &operand in &operands {
            let Some(current) = shape(operand)? else {
                continue;
            };
            match expected {
                None => expected = Some(current),
                Some(previous) if previous == current => {}
                Some(_) => {
                    if let E::Math {
                        fun: crate::MathFunction::Ldexp | crate::MathFunction::Frexp,
                        ..
                    } = *expression
                    {
                        continue;
                    }
                    return Err(ExpressionError::InvalidCooperativeOperand(operand));
                }
            }
        }
        Ok(Some(if matches!(*expression, E::Derivative { .. }) {
            ShaderStages::FRAGMENT
        } else {
            ShaderStages::all()
        }))
    }

    pub(super) fn validate_const_expression(
        &self,
        handle: Handle<crate::Expression>,
        gctx: crate::proc::GlobalCtx,
        mod_info: &ModuleInfo,
        global_expr_kind: &crate::proc::ExpressionKindTracker,
    ) -> Result<(), ConstExpressionError> {
        use crate::Expression as E;

        if !global_expr_kind.is_const_or_override(handle) {
            return Err(ConstExpressionError::NonConstOrOverride);
        }

        match gctx.global_expressions[handle] {
            E::Literal(literal) => {
                self.validate_literal(literal)?;
            }
            E::Constant(_) | E::ZeroValue(_) => {}
            E::Compose { ref components, ty } => {
                validate_compose(
                    ty,
                    gctx,
                    components.iter().map(|&handle| mod_info[handle].clone()),
                )?;
            }
            E::Splat { value, .. } => {
                let crate::TypeInner::Scalar(_) = *mod_info[value].inner_with(gctx.types) else {
                    return Err(ConstExpressionError::InvalidSplatType(value));
                };
            }
            E::Override(_)
            | E::Access { .. }
            | E::AccessIndex { .. }
            | E::Swizzle { .. }
            | E::FunctionArgument(_)
            | E::GlobalVariable(_)
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
            | E::TensorQuerySize { .. } => {
                if global_expr_kind.is_const(handle) || self.overrides_resolved {
                    return Err(ConstExpressionError::NonFullyEvaluatedConst);
                }
            }
        }

        Ok(())
    }

    pub(super) fn validate_expression(
        &self,
        root: Handle<crate::Expression>,
        expression: &crate::Expression,
        function: &crate::Function,
        module: &crate::Module,
        info: &FunctionInfo,
        mod_info: &ModuleInfo,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::Expression as E;

        let resolver = ExpressionTypeResolver {
            root,
            types: &module.types,
            info,
        };

        if let Some(stages) = Self::validate_long_expression(expression, &resolver)? {
            return Ok(stages);
        }

        let stages = match *expression {
            E::Access { base, index } => {
                self.validate_access(base, index, function, module, &resolver)?
            }
            E::AccessIndex { base, index } => {
                Self::validate_access_index(base, index, module, &resolver)?
            }
            E::Splat { size: _, value } => Self::validate_splat(value, &resolver)?,
            E::Swizzle {
                size,
                vector,
                pattern,
            } => Self::validate_swizzle(size, vector, pattern, &resolver)?,
            E::Literal(literal) => {
                self.validate_literal(literal)?;
                ShaderStages::all()
            }
            E::Constant(_) | E::Override(_) => ShaderStages::all(),
            E::ZeroValue(ty) => {
                if !mod_info[ty].contains(TypeFlags::CONSTRUCTIBLE) {
                    return Err(ExpressionError::InvalidZeroValue(ty));
                }
                ShaderStages::all()
            }
            E::Compose { ref components, ty } => {
                validate_compose(
                    ty,
                    module.to_ctx(),
                    components.iter().map(|&handle| info[handle].ty.clone()),
                )?;
                ShaderStages::all()
            }
            E::FunctionArgument(index) => {
                if index >= function.arguments.len() as u32 {
                    return Err(ExpressionError::FunctionArgumentDoesntExist(index));
                }
                ShaderStages::all()
            }
            E::GlobalVariable(_) | E::LocalVariable(_) => ShaderStages::all(),
            E::Load { pointer } => self.validate_load(pointer, module, &resolver)?,
            E::ImageSample {
                image,
                sampler,
                gather,
                gather_pattern,
                coordinate,
                array_index,
                offset,
                level,
                depth_ref,
                min_lod,
                sparse,
            } => Self::validate_image_sample(
                image::ImageSampleParams {
                    image,
                    sampler,
                    gather,
                    gather_pattern,
                    coordinate,
                    array_index,
                    offset,
                    level,
                    depth_ref,
                    min_lod,
                    sparse,
                },
                function,
                module,
                info,
                &resolver,
            )?,
            E::ImageLoad {
                image,
                coordinate,
                array_index,
                sample,
                level,
                sparse,
            } => Self::validate_image_load(
                image,
                coordinate,
                array_index,
                sample,
                level,
                sparse,
                function,
                module,
                info,
                &resolver,
            )?,
            E::ImageQuery { image, query } => {
                Self::validate_image_query(image, query, function, module, info, &resolver)?
            }
            E::ImageSparseResident { code } => {
                Self::validate_image_sparse_resident(code, &resolver)?
            }
            E::Unary { op, expr } => Self::validate_unary(op, expr, &resolver)?,
            E::Binary { op, left, right } => {
                Self::validate_binary(op, left, right, function, &resolver)?
            }
            E::Select {
                condition,
                accept,
                reject,
            } => Self::validate_select(condition, accept, reject, &resolver)?,
            E::Derivative { expr, .. } => Self::validate_derivative(expr, &resolver)?,
            E::Relational { fun, argument } => Self::validate_relational(fun, argument, &resolver)?,
            E::Math {
                fun,
                arg,
                arg1,
                arg2,
                arg3,
            } => Self::validate_math(fun, arg, arg1, arg2, arg3, module, &resolver)?,
            E::As {
                expr,
                kind,
                convert,
            } => Self::validate_as(expr, kind, convert, &resolver)?,
            E::CallResult(function) => mod_info.functions[function.index()].available_stages,
            E::AtomicResult { .. } => ShaderStages::all(),
            E::ArrayLength(expr) | E::WideArrayLength(expr) => {
                Self::validate_array_length(expr, &resolver)?
            }
            E::PhysicalPointer { value, ty } => {
                Self::validate_physical_pointer(value, ty, module, &resolver)?
            }
            E::PhysicalAddress { pointer, split: _ } => {
                Self::validate_physical_address(pointer, &resolver)?
            }
            E::BufferPointer { descriptor } => {
                Self::validate_buffer_pointer(descriptor, module, &resolver)?
            }
            E::HeapOffset { pointer, offset } => {
                Self::validate_heap_offset(pointer, offset, function, module, &resolver)?
            }
            E::RayQueryProceedResult => ShaderStages::all(),
            E::RayQueryGet { query, value } => {
                Self::validate_ray_query_get(query, value, module, &resolver)?
            }
            E::ReportIntersectionResult => ShaderStages::INTERSECTION,
            E::HitObjectGet { object, value } => {
                Self::validate_hit_object_get(object, value, &resolver)?
            }
            E::FetchMicroTriangleVertex {
                acceleration_structure,
                instance_id,
                geometry_index,
                primitive_index,
                barycentric,
                value: _,
            } => Self::validate_fetch_micro_triangle_vertex(
                acceleration_structure,
                instance_id,
                geometry_index,
                primitive_index,
                barycentric,
                &resolver,
            )?,
            E::AccelerationStructureFromAddress { address } => {
                Self::validate_acceleration_structure_from_address(address, &resolver)?
            }
            E::SubgroupBallotResult | E::SubgroupOperationResult { .. } => ShaderStages::all(),
            E::IsHelperInvocation => ShaderStages::FRAGMENT,
            E::ReadClock { .. } => ShaderStages::all(),
            E::InterpolateAt { pointer, location } => {
                Self::validate_interpolate_at(pointer, location, &resolver)?
            }
            E::ImageFootprint {
                image,
                coordinate,
                granularity,
                coarse,
                level,
                min_lod,
                ty,
            } => Self::validate_image_footprint(
                image,
                coordinate,
                granularity,
                coarse,
                level,
                min_lod,
                ty,
                module,
                &resolver,
            )?,
            E::FragmentFetch {
                image,
                coordinate,
                fragment,
            } => Self::validate_fragment_fetch(image, coordinate, fragment, &resolver)?,
            E::AttachmentRead { aspect, sample } => {
                Self::validate_attachment_read(aspect, sample, &resolver)?
            }
            E::SpirvInstructionResult { .. } => ShaderStages::all(),
            E::CooperativeLoad { ref data, .. } => {
                Self::validate_cooperative_load(data, module, &resolver)?
            }
            E::CooperativeMultiplyAdd { a, b, c, .. } => {
                Self::validate_cooperative_multiply_add(a, b, c, &resolver)?
            }
            E::CooperativeMatrixLength { ty } => {
                Self::validate_cooperative_matrix_length(root, ty, module)?
            }
            E::CooperativeMatrixResult { .. } | E::TensorCreate { .. } => ShaderStages::all(),
            E::TensorSet { base, .. } => Self::validate_tensor_set(base, &resolver)?,
            E::ImageProcessing {
                operation,
                image,
                sampler,
                coordinate,
                reference,
                reference_sampler,
                reference_coordinate,
                size,
            } => Self::validate_image_processing(
                image::ImageProcessingParams {
                    operation,
                    image,
                    sampler,
                    coordinate,
                    reference,
                    reference_sampler,
                    reference_coordinate,
                    size,
                },
                function,
                module,
                info,
                &resolver,
            )?,
            E::ArrayConversion {
                conversion,
                expr,
                index,
                ty,
            } => Self::validate_array_conversion(conversion, expr, index, ty, module, &resolver)?,
            E::Bitcast { expr, ty, offset } => {
                Self::validate_bitcast(expr, ty, offset, module, &resolver)?
            }
            E::Convert { expr, ty, .. } => Self::validate_convert(expr, ty, module, &resolver)?,
            E::CooperativeVectorLoad { ty, .. } | E::CooperativeVectorMatMul { ty, .. } => {
                Self::validate_cooperative_vector_op(root, ty, module)?
            }
            E::TensorRead {
                ty,
                tensor,
                coordinates,
                out_of_bounds,
                ..
            } => Self::validate_tensor_read(
                root,
                ty,
                tensor,
                coordinates,
                out_of_bounds,
                module,
                &resolver,
            )?,
            E::TensorQuerySize { tensor, dimension } => {
                Self::validate_tensor_query_size(tensor, dimension, &resolver)?
            }
            E::Expect { value, expected } => Self::validate_expect(value, expected, &resolver)?,
            E::Replicate { ty, value } => {
                Self::validate_replicate(root, ty, value, module, &resolver)?
            }
        };
        Ok(stages)
    }

    pub fn validate_literal(&self, literal: crate::Literal) -> Result<(), LiteralError> {
        let _ = Self::check_width(literal.scalar())?;
        Ok(())
    }
}

pub const fn check_literal_value(literal: crate::Literal) -> Result<(), LiteralError> {
    use crate::Literal as L;

    let is_nan = match literal {
        L::F64(v) => v.is_nan(),
        L::F32(v) => v.is_nan(),
        _ => false,
    };
    if is_nan {
        return Err(LiteralError::NaN);
    }

    let is_infinite = match literal {
        L::F64(v) => v.is_infinite(),
        L::F32(v) => v.is_infinite(),
        _ => false,
    };
    if is_infinite {
        return Err(LiteralError::Infinity);
    }

    Ok(())
}

#[cfg(test)]
fn validate_with_expression(
    expr: crate::Expression,
) -> Result<ModuleInfo, crate::span::WithSpan<super::ValidationError>> {
    use crate::span::Span;

    let mut function = crate::Function::default();
    function.expressions.append(expr, Span::default());
    function.body.push(
        crate::Statement::Emit(function.expressions.range_from(0)),
        Span::default(),
    );

    let mut module = crate::Module::default();
    module.functions.append(function, Span::default());

    let mut validator = super::Validator::new(super::ValidationFlags::EXPRESSIONS);

    validator.validate(&module)
}

#[cfg(test)]
fn validate_with_const_expression(
    expr: crate::Expression,
) -> Result<ModuleInfo, crate::span::WithSpan<super::ValidationError>> {
    use crate::span::Span;

    let mut module = crate::Module::default();
    module.global_expressions.append(expr, Span::default());

    let mut validator = super::Validator::new(super::ValidationFlags::CONSTANTS);

    validator.validate(&module)
}

#[test]
fn f64_runtime_literals() -> crate::TestResult {
    validate_with_expression(crate::Expression::Literal(crate::Literal::F64(
        0.57721_56649,
    )))?;
    Ok(())
}

#[test]
fn f64_const_literals() -> crate::TestResult {
    validate_with_const_expression(crate::Expression::Literal(crate::Literal::F64(
        0.57721_56649,
    )))?;
    Ok(())
}

#[test]
fn types_of_unprocessed_expressions_are_errors() -> crate::TestResult {
    use crate::span::Span;

    let mut function = crate::Function::default();
    let one = function.expressions.append(
        crate::Expression::Literal(crate::Literal::I32(1)),
        Span::default(),
    );
    let two = function.expressions.append(
        crate::Expression::Literal(crate::Literal::I32(2)),
        Span::default(),
    );
    let mut module = crate::Module::default();
    let handle = module.functions.append(function, Span::default());
    let info = super::Validator::new(super::ValidationFlags::all()).validate(&module)?;
    let resolver = ExpressionTypeResolver {
        root: two,
        types: &module.types,
        info: &info[handle],
    };
    assert!(matches!(
        resolver.resolve(one),
        Ok(&crate::TypeInner::Scalar(crate::Scalar::I32))
    ));
    assert!(matches!(
        resolver.resolve(two),
        Err(ExpressionError::NotYetProcessed(found)) if found == two
    ));
    Ok(())
}
