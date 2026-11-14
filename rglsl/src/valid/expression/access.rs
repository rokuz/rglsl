use super::super::{ShaderStages, TypeFlags};
use super::{ExpressionError, ExpressionTypeResolver};
use crate::arena::Handle;

impl super::super::Validator {
    pub(super) fn validate_access(
        &self,
        base: Handle<crate::Expression>,
        index: Handle<crate::Expression>,
        function: &crate::Function,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Literal as L, Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        let base_type = resolver.resolve(base)?;
        match *base_type {
            Ti::Matrix { .. }
            | Ti::Vector { .. }
            | Ti::LongVector { .. }
            | Ti::CooperativeMatrix { .. }
            | Ti::Array { .. }
            | Ti::Pointer { .. }
            | Ti::ValuePointer { size: Some(_), .. }
            | Ti::BindingArray { .. } => {}
            ref other @ (Ti::ValuePointer { size: None, .. }
            | Ti::Scalar(_)
            | Ti::TensorLayout { .. }
            | Ti::TensorView { .. }
            | Ti::Tensor { .. }
            | Ti::Atomic(_)
            | Ti::Struct { .. }
            | Ti::Image { .. }
            | Ti::Sampler { .. }
            | Ti::SampledImage { .. }
            | Ti::AccelerationStructure
            | Ti::RayQuery
            | Ti::HitObject { .. }
            | Ti::BufferDescriptor { .. }
            | Ti::Spirv { .. }) => {
                log::debug!("Indexing of {other:?}");
                return Err(ExpressionError::InvalidBaseType(base));
            }
        }
        let index_ty = resolver.resolve(index)?;
        if !matches!(
            *index_ty,
            Ti::Scalar(Sc {
                kind: Sk::Sint | Sk::Uint,
                ..
            })
        ) {
            log::debug!("Indexing by {index_ty:?}");
            return Err(ExpressionError::InvalidIndexType(index));
        }

        let behind_pointer = matches!(
            *base_type,
            Ti::Pointer { base, .. } if matches!(module.types[base].inner, Ti::Array { .. })
        );
        match module
            .to_ctx()
            .get_const_val_from(index, &function.expressions)
        {
            Ok(value) => {
                let length = if self.overrides_resolved {
                    base_type.indexable_length_resolved(module)
                } else {
                    base_type.indexable_length_pending(module)
                }?;
                if let crate::proc::IndexableLength::Known(known_length) = length
                    && value >= known_length
                    && !behind_pointer
                {
                    return Err(ExpressionError::IndexOutOfBounds(base, value));
                }
            }
            Err(crate::proc::ConstValueError::Negative) => {
                return Err(ExpressionError::NegativeIndex(base));
            }
            Err(crate::proc::ConstValueError::NonConst) => {}
            Err(crate::proc::ConstValueError::InvalidType) => {
                let crate::Expression::Literal(literal) = function.expressions[index] else {
                    return Err(ExpressionError::InvalidIndexType(index));
                };
                match literal {
                    L::I64(value) if value < 0 => {
                        return Err(ExpressionError::NegativeIndex(base));
                    }
                    L::I64(_) | L::U64(_) => {}
                    L::F64(_)
                    | L::F32(_)
                    | L::F16(_)
                    | L::U8(_)
                    | L::I8(_)
                    | L::U16(_)
                    | L::I16(_)
                    | L::U32(_)
                    | L::I32(_)
                    | L::Bool(_)
                    | L::BF16(_)
                    | L::FE4M3(_)
                    | L::FE5M2(_)
                    | L::FE2M1(_)
                    | L::FE3M2(_)
                    | L::FE2M3(_)
                    | L::FUE8M0(_)
                    | L::FMXINT8(_) => return Err(ExpressionError::InvalidIndexType(index)),
                }
            }
        }

        Ok(ShaderStages::all())
    }

    pub(super) fn validate_access_index(
        base: Handle<crate::Expression>,
        index: u32,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        let base_ty = resolver.resolve(base)?;
        let inner_ty = if let Ti::Pointer { base: ptr_base, .. } = *base_ty {
            &module.types[ptr_base].inner
        } else {
            base_ty
        };
        let limit = match *inner_ty {
            Ti::Vector { size, .. }
            | Ti::ValuePointer {
                size: Some(size), ..
            } => size as u32,
            Ti::Matrix { columns, .. } => columns as u32,
            Ti::LongVector { size, .. } => size.known().unwrap_or(u32::MAX),
            Ti::CooperativeMatrix { .. } => u32::MAX,
            Ti::Array {
                size: crate::ArraySize::Constant(len),
                ..
            } => len.get(),
            Ti::Array {
                size: crate::ArraySize::Pending(_) | crate::ArraySize::Dynamic,
                ..
            }
            | Ti::BindingArray { .. } => u32::MAX,
            Ti::Struct { ref members, .. } => members.len() as u32,
            ref other @ (Ti::Pointer { .. }
            | Ti::ValuePointer { size: None, .. }
            | Ti::Scalar(_)
            | Ti::TensorLayout { .. }
            | Ti::TensorView { .. }
            | Ti::Tensor { .. }
            | Ti::Atomic(_)
            | Ti::Image { .. }
            | Ti::Sampler { .. }
            | Ti::SampledImage { .. }
            | Ti::AccelerationStructure
            | Ti::RayQuery
            | Ti::HitObject { .. }
            | Ti::BufferDescriptor { .. }
            | Ti::Spirv { .. }) => {
                log::debug!("Indexing of {other:?}");
                return Err(ExpressionError::InvalidBaseType(base));
            }
        };

        if index >= limit {
            return Err(ExpressionError::IndexOutOfBounds(base, index));
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_splat(
        value: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        let other = resolver.resolve(value)?;
        let crate::TypeInner::Scalar(_) = *other else {
            log::debug!("Splat scalar type {other:?}");
            return Err(ExpressionError::InvalidSplatType(value));
        };
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_swizzle(
        size: crate::VectorSize,
        vector: Handle<crate::Expression>,
        pattern: [crate::SwizzleComponent; 4],
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        let other = resolver.resolve(vector)?;
        let crate::TypeInner::Vector { size: vec_size, .. } = *other else {
            log::debug!("Swizzle vector type {other:?}");
            return Err(ExpressionError::InvalidVectorType(vector));
        };
        for &sc in pattern[..size as usize].iter() {
            if sc as u8 >= vec_size as u8 {
                return Err(ExpressionError::InvalidSwizzleComponent(sc, vec_size));
            }
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_load(
        &self,
        pointer: Handle<crate::Expression>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        match *resolver.resolve(pointer)? {
            Ti::Pointer { base, .. }
                if self.types[base.index()]
                    .flags
                    .contains(TypeFlags::SIZED | TypeFlags::DATA) => {}
            Ti::Pointer {
                base,
                space: crate::AddressSpace::DescriptorHeap(_),
            } if matches!(
                module.types[base].inner,
                Ti::Image { .. }
                    | Ti::Sampler { .. }
                    | Ti::AccelerationStructure
                    | Ti::Tensor { .. }
            ) => {}
            Ti::ValuePointer { .. } => {}
            ref other @ (Ti::Pointer { .. }
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
                log::debug!("Loading {other:?}");
                return Err(ExpressionError::InvalidPointerType(pointer));
            }
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_array_length(
        expr: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        let other = resolver.resolve(expr)?;
        let Ti::Pointer { base, .. } = *other else {
            log::debug!("Array length of {other:?}");
            return Err(ExpressionError::InvalidArrayType(expr));
        };
        let base_ty = &resolver.types[base];
        if let Ti::Array {
            size: crate::ArraySize::Dynamic,
            ..
        } = base_ty.inner
        {
            Ok(ShaderStages::all())
        } else {
            Err(ExpressionError::InvalidArrayType(expr))
        }
    }

    pub(super) fn validate_physical_pointer(
        value: Handle<crate::Expression>,
        ty: Handle<crate::Type>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        let target = matches!(
            module.types[ty].inner,
            Ti::Pointer {
                space: crate::AddressSpace::PhysicalStorage { .. },
                ..
            }
        );
        let source = matches!(
            *resolver.resolve(value)?,
            Ti::Scalar(crate::Scalar::U64)
                | Ti::Vector {
                    size: crate::VectorSize::Bi,
                    scalar: crate::Scalar::U32,
                }
                | Ti::Pointer {
                    space: crate::AddressSpace::PhysicalStorage { .. },
                    ..
                }
                | Ti::ValuePointer {
                    space: crate::AddressSpace::PhysicalStorage { .. },
                    ..
                }
        );
        if !target || !source {
            return Err(ExpressionError::InvalidPhysicalPointer(value));
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_physical_address(
        pointer: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        let crate::TypeInner::Pointer {
            space: crate::AddressSpace::PhysicalStorage { .. },
            ..
        } = *resolver.resolve(pointer)?
        else {
            return Err(ExpressionError::InvalidPhysicalPointer(pointer));
        };
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_buffer_pointer(
        descriptor: Handle<crate::Expression>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        let Ti::Pointer {
            base,
            space: crate::AddressSpace::DescriptorHeap(crate::DescriptorHeap::Resource),
        } = *resolver.resolve(descriptor)?
        else {
            return Err(ExpressionError::InvalidHeapPointer(descriptor));
        };
        if !matches!(module.types[base].inner, Ti::BufferDescriptor { .. }) {
            return Err(ExpressionError::InvalidHeapPointer(descriptor));
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_heap_offset(
        pointer: Handle<crate::Expression>,
        offset: Handle<crate::Expression>,
        function: &crate::Function,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Expression as E, Scalar as Sc, ScalarKind as Sk, TypeInner as Ti};

        let root = if let E::GlobalVariable(global) = function.expressions[pointer] {
            matches!(
                module.global_variables[global].space,
                crate::AddressSpace::DescriptorHeap(_)
            )
        } else {
            false
        };
        if !root {
            return Err(ExpressionError::InvalidHeapPointer(pointer));
        }
        let Ti::Scalar(Sc {
            kind: Sk::Sint | Sk::Uint,
            ..
        }) = *resolver.resolve(offset)?
        else {
            return Err(ExpressionError::InvalidIndexType(offset));
        };
        Ok(ShaderStages::all())
    }
}
