use super::super::{FunctionInfo, ShaderStages};
use super::{ExpressionError, ExpressionTypeResolver};
use crate::arena::Handle;

pub(super) struct ImageSampleParams {
    pub(super) image: Handle<crate::Expression>,
    pub(super) sampler: Option<Handle<crate::Expression>>,
    pub(super) gather: Option<crate::SwizzleComponent>,
    pub(super) gather_pattern: crate::ImageGatherPattern,
    pub(super) coordinate: Handle<crate::Expression>,
    pub(super) array_index: Option<Handle<crate::Expression>>,
    pub(super) offset: Option<Handle<crate::Expression>>,
    pub(super) level: crate::SampleLevel,
    pub(super) depth_ref: Option<Handle<crate::Expression>>,
    pub(super) min_lod: Option<Handle<crate::Expression>>,
    pub(super) sparse: Option<Handle<crate::Type>>,
}

pub(super) struct ImageProcessingParams {
    pub(super) operation: crate::ImageProcessingOperation,
    pub(super) image: Handle<crate::Expression>,
    pub(super) sampler: Option<Handle<crate::Expression>>,
    pub(super) coordinate: Handle<crate::Expression>,
    pub(super) reference: Option<Handle<crate::Expression>>,
    pub(super) reference_sampler: Option<Handle<crate::Expression>>,
    pub(super) reference_coordinate: Option<Handle<crate::Expression>>,
    pub(super) size: Option<Handle<crate::Expression>>,
}

impl super::super::Validator {
    pub(super) fn validate_image_sample(
        params: ImageSampleParams,
        function: &crate::Function,
        module: &crate::Module,
        info: &FunctionInfo,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{ImageClass as Ic, Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        let ImageSampleParams {
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
        } = params;

        let image_ty = Self::global_var_ty(module, function, info, image)?;
        let comparison = match sampler {
            Some(sampler) => {
                let sampler_ty = Self::global_var_ty(module, function, info, sampler)?;
                let Ti::Sampler { comparison } = module.types[sampler_ty].inner else {
                    return Err(ExpressionError::ExpectedSamplerType(sampler_ty));
                };
                Some(comparison)
            }
            None => None,
        };

        let (class, dim, comparison) = match (comparison, &module.types[image_ty].inner) {
            (
                Some(_),
                &Ti::Image {
                    class,
                    arrayed,
                    dim,
                },
            )
            | (
                None,
                &Ti::SampledImage {
                    class,
                    arrayed,
                    dim,
                },
            ) => {
                let comparison = comparison.unwrap_or(matches!(class, Ic::Depth { .. }));
                if arrayed != array_index.is_some() {
                    return Err(ExpressionError::InvalidImageArrayIndex);
                }
                if let Some(expr) = array_index {
                    let Ti::Scalar(Sc {
                        kind: Sk::Sint | Sk::Uint,
                        ..
                    }) = *resolver.resolve(expr)?
                    else {
                        return Err(ExpressionError::InvalidImageArrayIndexType(expr));
                    };
                }
                (class, dim, comparison)
            }
            _ => return Err(ExpressionError::ExpectedImageType(image_ty)),
        };

        let image_depth = match class {
            Ic::Sampled {
                kind: Sk::Float | Sk::Uint | Sk::Sint,
                multi: false,
            } => false,
            Ic::Depth { multi: false } => true,
            Ic::Sampled {
                kind:
                    Sk::Bool
                    | Sk::BFloat
                    | Sk::FloatE4M3
                    | Sk::FloatE5M2
                    | Sk::FloatE2M1
                    | Sk::FloatE3M2
                    | Sk::FloatE2M3
                    | Sk::FloatUE8M0
                    | Sk::FloatMXINT8,
                multi: false,
            }
            | Ic::Sampled { multi: true, .. }
            | Ic::Depth { multi: true }
            | Ic::Storage { .. } => return Err(ExpressionError::InvalidImageClass(class)),
        };
        let compared_float = sampler.is_some()
            && matches!(
                class,
                Ic::Sampled {
                    kind: Sk::Float,
                    multi: false,
                }
            );
        if comparison != depth_ref.is_some() || (comparison && !image_depth && !compared_float) {
            return Err(ExpressionError::ComparisonSamplingMismatch {
                image: class,
                sampler: comparison,
                has_ref: depth_ref.is_some(),
            });
        }

        let num_components = match dim {
            crate::ImageDimension::D1 => 1,
            crate::ImageDimension::D2 => 2,
            crate::ImageDimension::D3 | crate::ImageDimension::Cube => 3,
            crate::ImageDimension::Buffer
            | crate::ImageDimension::Subpass
            | crate::ImageDimension::TileImageData => {
                return Err(ExpressionError::InvalidImageCoordinateType(dim, coordinate));
            }
        };
        if !float_coordinate_matches(resolver.resolve(coordinate)?, num_components) {
            return Err(ExpressionError::InvalidImageCoordinateType(dim, coordinate));
        }

        if let Some(const_expr) = offset {
            let offset_ok = match *resolver.resolve(const_expr)? {
                Ti::Array {
                    base,
                    size: crate::ArraySize::Constant(size),
                    ..
                } => {
                    gather.is_some()
                        && size.get() == 4
                        && dim == crate::ImageDimension::D2
                        && module.types[base].inner
                            == (Ti::Vector {
                                size: crate::VectorSize::Bi,
                                scalar: Sc::I32,
                            })
                }
                Ti::Scalar(Sc { kind: Sk::Sint, .. }) => num_components == 1,
                Ti::Vector {
                    size,
                    scalar: Sc { kind: Sk::Sint, .. },
                } => size as u32 == num_components,
                Ti::Array {
                    size: crate::ArraySize::Pending(_) | crate::ArraySize::Dynamic,
                    ..
                }
                | Ti::Scalar(Sc {
                    kind:
                        Sk::Uint
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
                                Sk::Uint
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
            if !offset_ok {
                return Err(ExpressionError::InvalidSampleOffset(dim, const_expr));
            }
        }

        if let Some(expr) = depth_ref {
            let Ti::Scalar(Sc {
                kind: Sk::Float, ..
            }) = *resolver.resolve(expr)?
            else {
                return Err(ExpressionError::InvalidDepthReference(expr));
            };
        }

        if let Some(component) = gather {
            match dim {
                crate::ImageDimension::D2 | crate::ImageDimension::Cube => {}
                crate::ImageDimension::D1
                | crate::ImageDimension::D3
                | crate::ImageDimension::Buffer
                | crate::ImageDimension::Subpass
                | crate::ImageDimension::TileImageData => {
                    return Err(ExpressionError::InvalidGatherDimension(dim));
                }
            }
            let max_component = match class {
                Ic::Depth { .. } => crate::SwizzleComponent::X,
                Ic::Sampled { .. } | Ic::Storage { .. } => crate::SwizzleComponent::W,
            };
            if component > max_component {
                return Err(ExpressionError::InvalidGatherComponent(component));
            }
            if gather_pattern != crate::ImageGatherPattern::Quad
                && (dim != crate::ImageDimension::D2 || matches!(class, Ic::Depth { .. }))
            {
                return Err(ExpressionError::InvalidGatherPattern(gather_pattern));
            }
            match level {
                crate::SampleLevel::Zero => {}
                crate::SampleLevel::Exact(_) | crate::SampleLevel::Bias(_)
                    if depth_ref.is_none() && gather_pattern == crate::ImageGatherPattern::Quad => {
                }
                crate::SampleLevel::Exact(_)
                | crate::SampleLevel::Bias(_)
                | crate::SampleLevel::Auto
                | crate::SampleLevel::Gradient { .. } => {
                    return Err(ExpressionError::InvalidGatherLevel);
                }
            }
        }

        if let Some(min_lod) = min_lod {
            let implicit_or_gradient = match level {
                crate::SampleLevel::Auto
                | crate::SampleLevel::Bias(_)
                | crate::SampleLevel::Gradient { .. } => true,
                crate::SampleLevel::Zero | crate::SampleLevel::Exact(_) => false,
            };
            if gather.is_some()
                || !implicit_or_gradient
                || !matches!(*resolver.resolve(min_lod)?, Ti::Scalar(Sc::F32))
            {
                return Err(ExpressionError::InvalidMinLod(min_lod));
            }
        }

        if let Some(ty) = sparse {
            let texel = if gather.is_some() {
                Ti::Vector {
                    size: crate::VectorSize::Quad,
                    scalar: Sc {
                        kind: match class {
                            Ic::Sampled { kind, .. } => kind,
                            Ic::Depth { .. } | Ic::Storage { .. } => Sk::Float,
                        },
                        width: 4,
                    },
                }
            } else {
                sampled_texel(class)
            };
            if !is_sparse_result(module, ty, &texel) {
                return Err(ExpressionError::InvalidSparseResultType(ty));
            }
        }

        if gather.is_none() && gather_pattern != crate::ImageGatherPattern::Quad {
            return Err(ExpressionError::InvalidGatherPattern(gather_pattern));
        }

        let stages = match level {
            crate::SampleLevel::Auto => ShaderStages::FRAGMENT | ShaderStages::COMPUTE_LIKE,
            crate::SampleLevel::Zero => ShaderStages::all(),
            crate::SampleLevel::Exact(expr) => {
                match class {
                    Ic::Depth { .. } => {
                        let Ti::Scalar(Sc {
                            kind: Sk::Sint | Sk::Uint | Sk::Float,
                            ..
                        }) = *resolver.resolve(expr)?
                        else {
                            return Err(ExpressionError::InvalidSampleLevelExactType(expr));
                        };
                    }
                    Ic::Sampled { .. } | Ic::Storage { .. } => {
                        let Ti::Scalar(Sc {
                            kind: Sk::Float, ..
                        }) = *resolver.resolve(expr)?
                        else {
                            return Err(ExpressionError::InvalidSampleLevelExactType(expr));
                        };
                    }
                }
                ShaderStages::all()
            }
            crate::SampleLevel::Bias(expr) => {
                let Ti::Scalar(Sc {
                    kind: Sk::Float, ..
                }) = *resolver.resolve(expr)?
                else {
                    return Err(ExpressionError::InvalidSampleLevelBiasType(expr));
                };
                match class {
                    Ic::Sampled { multi: false, .. } | Ic::Depth { multi: false } => {}
                    Ic::Sampled { multi: true, .. }
                    | Ic::Depth { multi: true }
                    | Ic::Storage { .. } => {
                        return Err(ExpressionError::InvalidImageClass(class));
                    }
                }
                ShaderStages::FRAGMENT | ShaderStages::COMPUTE_LIKE
            }
            crate::SampleLevel::Gradient { x, y } => {
                for grad in [x, y] {
                    if !float_coordinate_matches(resolver.resolve(grad)?, num_components) {
                        return Err(ExpressionError::InvalidSampleLevelGradientType(dim, grad));
                    }
                }
                ShaderStages::all()
            }
        };
        Ok(stages)
    }

    #[expect(
        clippy::too_many_arguments,
        reason = "image load expression fields plus function, module, info, and resolver"
    )]
    pub(super) fn validate_image_load(
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        array_index: Option<Handle<crate::Expression>>,
        sample: Option<Handle<crate::Expression>>,
        level: Option<Handle<crate::Expression>>,
        sparse: Option<Handle<crate::Type>>,
        function: &crate::Function,
        module: &crate::Module,
        info: &FunctionInfo,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{ImageClass as Ic, Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        let ty = Self::global_var_ty(module, function, info, image)?;
        let (Ti::Image {
            class,
            arrayed,
            dim,
        }
        | Ti::SampledImage {
            class,
            arrayed,
            dim,
        }) = module.types[ty].inner
        else {
            return Err(ExpressionError::ExpectedImageType(ty));
        };

        if !resolver.resolve(coordinate)?.addresses_image(dim) {
            return Err(ExpressionError::InvalidImageCoordinateType(dim, coordinate));
        }
        if super::super::image_array_index_expected(dim, arrayed, class) != array_index.is_some() {
            return Err(ExpressionError::InvalidImageArrayIndex);
        }
        if let Some(expr) = array_index
            && !matches!(*resolver.resolve(expr)?, Ti::Scalar(Sc::I32 | Sc::U32))
        {
            return Err(ExpressionError::InvalidImageArrayIndexType(expr));
        }

        match (sample, class.is_multisampled()) {
            (None, false) => {}
            (Some(sample), true) => {
                if !matches!(*resolver.resolve(sample)?, Ti::Scalar(Sc::I32 | Sc::U32)) {
                    return Err(ExpressionError::InvalidImageOtherIndexType(sample));
                }
            }
            (Some(_), false) => {
                return Err(ExpressionError::InvalidImageSampleSelector);
            }
            (None, true) => {
                return Err(ExpressionError::MissingImageSampleSelector);
            }
        }

        match (level, class.has_levels(dim), class.has_optional_level(dim)) {
            (None, false, _) => {}
            (Some(level), true, _) | (Some(level), false, true) => {
                let Ti::Scalar(Sc {
                    kind: Sk::Sint | Sk::Uint,
                    width: _,
                }) = *resolver.resolve(level)?
                else {
                    return Err(ExpressionError::InvalidImageArrayIndexType(level));
                };
            }
            (Some(_), false, false) => {
                return Err(ExpressionError::InvalidImageLevelSelector);
            }
            (None, true, _) => {
                return Err(ExpressionError::MissingImageLevelSelector);
            }
        }
        if let Some(sparse) = sparse {
            let texel = match class {
                Ic::Storage { format, .. } => Ti::Vector {
                    size: crate::VectorSize::Quad,
                    scalar: format.into(),
                },
                Ic::Sampled { .. } | Ic::Depth { .. } => sampled_texel(class),
            };
            if dim == crate::ImageDimension::Subpass || !is_sparse_result(module, sparse, &texel) {
                return Err(ExpressionError::InvalidSparseResultType(sparse));
            }
        }
        Ok(if dim == crate::ImageDimension::Subpass {
            ShaderStages::FRAGMENT
        } else {
            ShaderStages::all()
        })
    }

    pub(super) fn validate_image_query(
        image: Handle<crate::Expression>,
        query: crate::ImageQuery,
        function: &crate::Function,
        module: &crate::Module,
        info: &FunctionInfo,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, TypeInner as Ti};

        let ty = Self::global_var_ty(module, function, info, image)?;
        let (Ti::Image {
            class,
            arrayed,
            dim,
        }
        | Ti::SampledImage {
            class,
            arrayed,
            dim,
        }) = module.types[ty].inner
        else {
            return Err(ExpressionError::ExpectedImageType(ty));
        };

        let good = match query {
            crate::ImageQuery::NumLayers => arrayed,
            crate::ImageQuery::Size { level: None } => true,
            crate::ImageQuery::Size { level: Some(level) } => {
                let Ti::Scalar(Sc::I32 | Sc::U32) = *resolver.resolve(level)? else {
                    return Err(ExpressionError::InvalidImageOtherIndexType(level));
                };
                class.has_levels(dim)
            }
            crate::ImageQuery::NumLevels => class.has_levels(dim),
            crate::ImageQuery::NumSamples => class.is_multisampled(),
            crate::ImageQuery::Lod {
                sampler,
                coordinate,
            } => {
                let combined = matches!(module.types[ty].inner, Ti::SampledImage { .. });
                let paired = match sampler {
                    Some(sampler) => matches!(
                        module.types[Self::global_var_ty(module, function, info, sampler)?].inner,
                        Ti::Sampler { .. }
                    ),
                    None => false,
                };
                let components = match dim {
                    crate::ImageDimension::D1 => 1,
                    crate::ImageDimension::D2 => 2,
                    crate::ImageDimension::D3 | crate::ImageDimension::Cube => 3,
                    crate::ImageDimension::Buffer
                    | crate::ImageDimension::Subpass
                    | crate::ImageDimension::TileImageData => 0,
                };
                let coordinate_good = match *resolver.resolve(coordinate)? {
                    Ti::Scalar(Sc::F32) => components == 1,
                    Ti::Vector {
                        size,
                        scalar: Sc::F32,
                    } => size as u32 == components,
                    Ti::Scalar(_)
                    | Ti::Vector { .. }
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
                if combined == paired
                    || !coordinate_good
                    || !matches!(
                        class,
                        crate::ImageClass::Sampled { multi: false, .. }
                            | crate::ImageClass::Depth { multi: false }
                    )
                {
                    return Err(ExpressionError::InvalidLodQuery(ty, coordinate));
                }
                true
            }
        };
        if !good || dim == crate::ImageDimension::Subpass {
            return Err(ExpressionError::InvalidImageClass(class));
        }
        Ok(if matches!(query, crate::ImageQuery::Lod { .. }) {
            ShaderStages::FRAGMENT | ShaderStages::COMPUTE_LIKE
        } else {
            ShaderStages::all()
        })
    }

    pub(super) fn validate_image_sparse_resident(
        code: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        if !matches!(
            *resolver.resolve(code)?,
            crate::TypeInner::Scalar(crate::Scalar::I32)
        ) {
            return Err(ExpressionError::InvalidResidencyCode(code));
        }
        Ok(ShaderStages::all())
    }

    #[expect(
        clippy::too_many_arguments,
        reason = "image footprint expression fields plus module and resolver"
    )]
    pub(super) fn validate_image_footprint(
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        granularity: Handle<crate::Expression>,
        coarse: Handle<crate::Expression>,
        level: crate::SampleLevel,
        min_lod: Option<Handle<crate::Expression>>,
        ty: Handle<crate::Type>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, TypeInner as Ti};

        let Ti::SampledImage {
            dim,
            class: crate::ImageClass::Sampled { multi: false, .. },
            arrayed: false,
        } = *resolver.resolve(image)?
        else {
            return Err(ExpressionError::ExpectedGlobalVariable);
        };
        if !resolver.resolve(coordinate)?.addresses_image(dim)
            && !matches!(
                *resolver.resolve(coordinate)?,
                Ti::Vector {
                    scalar: Sc::F32,
                    ..
                }
            )
        {
            return Err(ExpressionError::InvalidImageCoordinateType(dim, coordinate));
        }
        if !matches!(*resolver.resolve(granularity)?, Ti::Scalar(Sc::I32)) {
            return Err(ExpressionError::InvalidImageOtherIndexType(granularity));
        }
        if !matches!(*resolver.resolve(coarse)?, Ti::Scalar(Sc::BOOL)) {
            return Err(ExpressionError::InvalidImageOtherIndexType(coarse));
        }
        if let Some(min_lod) = min_lod {
            if !matches!(*resolver.resolve(min_lod)?, Ti::Scalar(Sc::F32)) {
                return Err(ExpressionError::InvalidImageOtherIndexType(min_lod));
            }
            if matches!(
                level,
                crate::SampleLevel::Zero | crate::SampleLevel::Exact(_)
            ) {
                return Err(ExpressionError::InvalidMinLod(min_lod));
            }
        }
        if !matches!(module.types[ty].inner, Ti::Struct { .. }) {
            return Err(ExpressionError::InvalidSparseResultType(ty));
        }
        Ok(match level {
            crate::SampleLevel::Auto | crate::SampleLevel::Bias(_) => {
                ShaderStages::FRAGMENT | ShaderStages::COMPUTE_LIKE
            }
            crate::SampleLevel::Zero
            | crate::SampleLevel::Exact(_)
            | crate::SampleLevel::Gradient { .. } => ShaderStages::all(),
        })
    }

    pub(super) fn validate_fragment_fetch(
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        fragment: Option<Handle<crate::Expression>>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, TypeInner as Ti};

        if !matches!(
            *resolver.resolve(image)?,
            Ti::Image {
                class: crate::ImageClass::Sampled { multi: true, .. },
                ..
            } | Ti::SampledImage {
                class: crate::ImageClass::Sampled { multi: true, .. },
                ..
            }
        ) {
            return Err(ExpressionError::ExpectedGlobalVariable);
        }
        if !matches!(
            *resolver.resolve(coordinate)?,
            Ti::Vector {
                scalar: Sc::I32,
                ..
            }
        ) {
            return Err(ExpressionError::InvalidImageOtherIndexType(coordinate));
        }
        if let Some(fragment) = fragment
            && !matches!(*resolver.resolve(fragment)?, Ti::Scalar(Sc::U32))
        {
            return Err(ExpressionError::InvalidImageOtherIndexType(fragment));
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_attachment_read(
        aspect: crate::AttachmentAspect,
        sample: Option<Handle<crate::Expression>>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, TypeInner as Ti};

        if let crate::AttachmentAspect::Color(image) = aspect
            && !matches!(
                *resolver.resolve(image)?,
                Ti::Image {
                    dim: crate::ImageDimension::TileImageData,
                    ..
                }
            )
        {
            return Err(ExpressionError::ExpectedGlobalVariable);
        }
        if let Some(sample) = sample
            && !matches!(*resolver.resolve(sample)?, Ti::Scalar(Sc::I32 | Sc::U32))
        {
            return Err(ExpressionError::InvalidImageOtherIndexType(sample));
        }
        Ok(ShaderStages::FRAGMENT)
    }

    pub(super) fn validate_image_processing(
        params: ImageProcessingParams,
        function: &crate::Function,
        module: &crate::Module,
        info: &FunctionInfo,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        let ImageProcessingParams {
            operation,
            image,
            sampler,
            coordinate,
            reference,
            reference_sampler,
            reference_coordinate,
            size,
        } = params;

        let invalid = |reason| Err(ExpressionError::InvalidImageProcessing(operation, reason));
        let sampled = |image, sampler: Option<Handle<crate::Expression>>| {
            let image_ty = Self::global_var_ty(module, function, info, image)?;
            let ((
                Some(_),
                &Ti::Image {
                    dim,
                    arrayed,
                    class,
                },
            )
            | (
                None,
                &Ti::SampledImage {
                    dim,
                    arrayed,
                    class,
                },
            )) = (sampler, &module.types[image_ty].inner)
            else {
                return Err(ExpressionError::ExpectedImageType(image_ty));
            };
            if let Some(sampler) = sampler {
                let sampler_ty = Self::global_var_ty(module, function, info, sampler)?;
                if !matches!(module.types[sampler_ty].inner, Ti::Sampler { .. }) {
                    return Err(ExpressionError::ExpectedSamplerType(sampler_ty));
                }
            }
            let float = matches!(
                class,
                crate::ImageClass::Sampled {
                    kind: Sk::Float,
                    multi: false
                }
            );
            Ok((dim, arrayed, float))
        };
        let vector2 = |handle: Handle<crate::Expression>, kind: Sk| {
            resolver.resolve(handle).map(|inner| {
                matches!(
                    *inner,
                    Ti::Vector {
                        size: crate::VectorSize::Bi,
                        scalar: Sc { kind: found, width: 4 },
                    } if found == kind
                )
            })
        };
        if sampled(image, sampler)? != (crate::ImageDimension::D2, false, true) {
            return invalid("the source must be a sampled 2D float image");
        }
        match operation {
            crate::ImageProcessingOperation::SampleWeighted => {
                let Some(weights) = reference else {
                    return invalid("missing weights");
                };
                let (dim, arrayed, float) = sampled(weights, reference_sampler)?;
                if !float
                    || !arrayed
                    || !matches!(dim, crate::ImageDimension::D1 | crate::ImageDimension::D2)
                    || !vector2(coordinate, Sk::Float)?
                    || reference_coordinate.is_some()
                    || size.is_some()
                {
                    return invalid("wrong operands");
                }
            }
            crate::ImageProcessingOperation::BoxFilter => {
                let Some(size) = size else {
                    return invalid("missing box size");
                };
                if reference.is_some()
                    || reference_sampler.is_some()
                    || reference_coordinate.is_some()
                    || !vector2(coordinate, Sk::Float)?
                    || !vector2(size, Sk::Float)?
                {
                    return invalid("wrong operands");
                }
            }
            crate::ImageProcessingOperation::BlockMatch { .. } => {
                let (Some(reference), Some(reference_coordinate), Some(size)) =
                    (reference, reference_coordinate, size)
                else {
                    return invalid("missing operands");
                };
                if sampled(reference, reference_sampler)?
                    != (crate::ImageDimension::D2, false, true)
                    || !vector2(coordinate, Sk::Uint)?
                    || !vector2(reference_coordinate, Sk::Uint)?
                    || !vector2(size, Sk::Uint)?
                {
                    return invalid("wrong operands");
                }
            }
        }
        Ok(ShaderStages::all())
    }

    fn global_var_ty(
        module: &crate::Module,
        function: &crate::Function,
        info: &FunctionInfo,
        expr: Handle<crate::Expression>,
    ) -> Result<Handle<crate::Type>, ExpressionError> {
        use crate::Expression as Ex;

        match function.expressions[expr] {
            Ex::GlobalVariable(var_handle) => Ok(module.global_variables[var_handle].ty),
            Ex::Load { pointer } => {
                let crate::TypeInner::Pointer {
                    base,
                    space: crate::AddressSpace::DescriptorHeap(_),
                } = *info[pointer].ty.inner_with(&module.types)
                else {
                    return Err(ExpressionError::ExpectedGlobalVariable);
                };
                Ok(base)
            }
            Ex::FunctionArgument(i) => Ok(function.arguments[i as usize].ty),
            Ex::Access { base, .. } | Ex::AccessIndex { base, .. } => {
                let Ex::GlobalVariable(var_handle) = function.expressions[base] else {
                    return Err(ExpressionError::ExpectedGlobalVariable);
                };
                let array_ty = module.global_variables[var_handle].ty;
                let crate::TypeInner::BindingArray { base, .. } = module.types[array_ty].inner
                else {
                    return Err(ExpressionError::ExpectedBindingArrayType(array_ty));
                };
                Ok(base)
            }
            Ex::Literal(_)
            | Ex::Constant(_)
            | Ex::Override(_)
            | Ex::ZeroValue(_)
            | Ex::Compose { .. }
            | Ex::Splat { .. }
            | Ex::Swizzle { .. }
            | Ex::LocalVariable(_)
            | Ex::ImageSample { .. }
            | Ex::ImageLoad { .. }
            | Ex::ImageQuery { .. }
            | Ex::Unary { .. }
            | Ex::Binary { .. }
            | Ex::Select { .. }
            | Ex::Derivative { .. }
            | Ex::Relational { .. }
            | Ex::Math { .. }
            | Ex::As { .. }
            | Ex::CallResult(_)
            | Ex::AtomicResult { .. }
            | Ex::ArrayLength(_)
            | Ex::WideArrayLength(_)
            | Ex::PhysicalPointer { .. }
            | Ex::PhysicalAddress { .. }
            | Ex::BufferPointer { .. }
            | Ex::HeapOffset { .. }
            | Ex::RayQueryProceedResult
            | Ex::RayQueryGet { .. }
            | Ex::ReportIntersectionResult
            | Ex::AccelerationStructureFromAddress { .. }
            | Ex::HitObjectGet { .. }
            | Ex::FetchMicroTriangleVertex { .. }
            | Ex::SubgroupBallotResult
            | Ex::SubgroupOperationResult { .. }
            | Ex::SpirvInstructionResult { .. }
            | Ex::CooperativeLoad { .. }
            | Ex::CooperativeMultiplyAdd { .. }
            | Ex::CooperativeMatrixLength { .. }
            | Ex::Replicate { .. }
            | Ex::Expect { .. }
            | Ex::ImageSparseResident { .. }
            | Ex::IsHelperInvocation
            | Ex::ReadClock { .. }
            | Ex::InterpolateAt { .. }
            | Ex::FragmentFetch { .. }
            | Ex::ImageFootprint { .. }
            | Ex::AttachmentRead { .. }
            | Ex::CooperativeVectorLoad { .. }
            | Ex::CooperativeVectorMatMul { .. }
            | Ex::Convert { .. }
            | Ex::CooperativeMatrixResult { .. }
            | Ex::TensorCreate { .. }
            | Ex::ImageProcessing { .. }
            | Ex::ArrayConversion { .. }
            | Ex::Bitcast { .. }
            | Ex::TensorSet { .. }
            | Ex::TensorRead { .. }
            | Ex::TensorQuerySize { .. } => Err(ExpressionError::ExpectedGlobalVariable),
        }
    }
}

const fn float_coordinate_matches(inner: &crate::TypeInner, num_components: u32) -> bool {
    use crate::{Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

    match *inner {
        Ti::Scalar(Sc {
            kind: Sk::Float, ..
        }) => num_components == 1,
        Ti::Vector {
            size,
            scalar: Sc {
                kind: Sk::Float, ..
            },
        } => size as u32 == num_components,
        Ti::Scalar(Sc {
            kind:
                Sk::Sint
                | Sk::Uint
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
                        | Sk::Uint
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
        | Ti::Spirv { .. } => false,
    }
}

fn sampled_texel(class: crate::ImageClass) -> crate::TypeInner {
    match class {
        crate::ImageClass::Depth { .. } => crate::TypeInner::Scalar(crate::Scalar::F32),
        crate::ImageClass::Sampled { kind, .. } => crate::TypeInner::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar { kind, width: 4 },
        },
        crate::ImageClass::Storage { format, .. } => crate::TypeInner::Vector {
            size: crate::VectorSize::Quad,
            scalar: format.into(),
        },
    }
}

fn is_sparse_result(
    module: &crate::Module,
    ty: Handle<crate::Type>,
    texel: &crate::TypeInner,
) -> bool {
    let Some(ty) = module.types.get_handle(ty).ok() else {
        return false;
    };
    let crate::TypeInner::Struct { ref members, .. } = ty.inner else {
        return false;
    };
    let [ref code, ref value] = members[..] else {
        return false;
    };
    matches!(
        module.types[code.ty].inner,
        crate::TypeInner::Scalar(crate::Scalar::I32)
    ) && module.types[value.ty].inner == *texel
}
