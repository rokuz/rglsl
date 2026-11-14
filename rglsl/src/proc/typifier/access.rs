use crate::arena::Handle;

use super::{ResolveContext, ResolveError, TypeResolution};

impl<'a> ResolveContext<'a> {
    pub(super) fn resolve_access(
        &self,
        base: Handle<crate::Expression>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        let types = self.types;
        let ty = past(base)?.inner_with(types);
        Ok(match *ty {
            Ti::Array { base, .. } | Ti::BindingArray { base, .. } => TypeResolution::Handle(base),
            Ti::Matrix { rows, scalar, .. } => {
                TypeResolution::Value(Ti::Vector { size: rows, scalar })
            }
            Ti::Vector { size: _, scalar }
            | Ti::LongVector { scalar, .. }
            | Ti::CooperativeMatrix { scalar, .. } => TypeResolution::Value(Ti::Scalar(scalar)),
            Ti::ValuePointer {
                size: Some(_),
                scalar,
                space,
            } => TypeResolution::Value(Ti::ValuePointer {
                size: None,
                scalar,
                space,
            }),
            Ti::Pointer { base, space } => {
                let sub = &types[base].inner;
                TypeResolution::Value(match *sub {
                    Ti::Array { base, .. } | Ti::BindingArray { base, .. } => {
                        Ti::Pointer { base, space }
                    }
                    Ti::Vector { size: _, scalar }
                    | Ti::LongVector { scalar, .. }
                    | Ti::CooperativeMatrix { scalar, .. } => Ti::ValuePointer {
                        size: None,
                        scalar,
                        space,
                    },
                    Ti::Matrix {
                        columns: _,
                        rows,
                        scalar,
                    } => Ti::ValuePointer {
                        size: Some(rows),
                        scalar,
                        space,
                    },
                    Ti::Scalar(_)
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
                    | Ti::BufferDescriptor { .. }
                    | Ti::Spirv { .. } => {
                        log::error!("Access sub-type {sub:?}");
                        return Err(ResolveError::InvalidSubAccess {
                            ty: base,
                            indexed: false,
                        });
                    }
                })
            }
            Ti::Scalar(_)
            | Ti::TensorLayout { .. }
            | Ti::TensorView { .. }
            | Ti::Tensor { .. }
            | Ti::Atomic(_)
            | Ti::ValuePointer { size: None, .. }
            | Ti::Struct { .. }
            | Ti::Image { .. }
            | Ti::Sampler { .. }
            | Ti::SampledImage { .. }
            | Ti::AccelerationStructure
            | Ti::RayQuery
            | Ti::HitObject { .. }
            | Ti::BufferDescriptor { .. }
            | Ti::Spirv { .. } => {
                log::error!("Access type {ty:?}");
                return Err(ResolveError::InvalidAccess {
                    expr: base,
                    indexed: false,
                });
            }
        })
    }

    pub(super) fn resolve_access_index(
        &self,
        base: Handle<crate::Expression>,
        index: u32,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        let types = self.types;
        let ty = past(base)?.inner_with(types);
        Ok(match *ty {
            Ti::Vector { size, scalar } => {
                if index >= size as u32 {
                    return Err(ResolveError::OutOfBoundsIndex { expr: base, index });
                }
                TypeResolution::Value(Ti::Scalar(scalar))
            }
            Ti::LongVector { size, scalar, .. } => {
                if size.known().is_some_and(|size| index >= size) {
                    return Err(ResolveError::OutOfBoundsIndex { expr: base, index });
                }
                TypeResolution::Value(Ti::Scalar(scalar))
            }
            Ti::CooperativeMatrix { scalar, .. } => TypeResolution::Value(Ti::Scalar(scalar)),
            Ti::Matrix {
                columns,
                rows,
                scalar,
            } => {
                if index >= columns as u32 {
                    return Err(ResolveError::OutOfBoundsIndex { expr: base, index });
                }
                TypeResolution::Value(Ti::Vector { size: rows, scalar })
            }
            Ti::Array { base, .. } | Ti::BindingArray { base, .. } => TypeResolution::Handle(base),
            Ti::Struct { ref members, .. } => {
                let member = members
                    .get(index as usize)
                    .ok_or(ResolveError::OutOfBoundsIndex { expr: base, index })?;
                TypeResolution::Handle(member.ty)
            }
            Ti::ValuePointer {
                size: Some(size),
                scalar,
                space,
            } => {
                if index >= size as u32 {
                    return Err(ResolveError::OutOfBoundsIndex { expr: base, index });
                }
                TypeResolution::Value(Ti::ValuePointer {
                    size: None,
                    scalar,
                    space,
                })
            }
            Ti::Pointer {
                base: ty_base,
                space,
            } => TypeResolution::Value(
                self.resolve_pointer_access_index(base, ty_base, space, index)?,
            ),
            Ti::Scalar(_)
            | Ti::TensorLayout { .. }
            | Ti::TensorView { .. }
            | Ti::Tensor { .. }
            | Ti::Atomic(_)
            | Ti::ValuePointer { size: None, .. }
            | Ti::Image { .. }
            | Ti::Sampler { .. }
            | Ti::SampledImage { .. }
            | Ti::AccelerationStructure
            | Ti::RayQuery
            | Ti::HitObject { .. }
            | Ti::BufferDescriptor { .. }
            | Ti::Spirv { .. } => {
                log::error!("Access index type {ty:?}");
                return Err(ResolveError::InvalidAccess {
                    expr: base,
                    indexed: true,
                });
            }
        })
    }

    fn resolve_pointer_access_index(
        &self,
        expr_base: Handle<crate::Expression>,
        ty_base: Handle<crate::Type>,
        space: crate::AddressSpace,
        index: u32,
    ) -> Result<crate::TypeInner, ResolveError> {
        use crate::TypeInner as Ti;
        let sub = &self.types[ty_base].inner;
        Ok(match *sub {
            Ti::Array { base, .. } | Ti::BindingArray { base, .. } => Ti::Pointer { base, space },
            Ti::Vector { size, scalar } => {
                if index >= size as u32 {
                    return Err(ResolveError::OutOfBoundsIndex {
                        expr: expr_base,
                        index,
                    });
                }
                Ti::ValuePointer {
                    size: None,
                    scalar,
                    space,
                }
            }
            Ti::LongVector { size, scalar, .. } => {
                if size.known().is_some_and(|size| index >= size) {
                    return Err(ResolveError::OutOfBoundsIndex {
                        expr: expr_base,
                        index,
                    });
                }
                Ti::ValuePointer {
                    size: None,
                    scalar,
                    space,
                }
            }
            Ti::CooperativeMatrix { scalar, .. } => Ti::ValuePointer {
                size: None,
                scalar,
                space,
            },
            Ti::Matrix {
                rows,
                columns,
                scalar,
            } => {
                if index >= columns as u32 {
                    return Err(ResolveError::OutOfBoundsIndex {
                        expr: expr_base,
                        index,
                    });
                }
                Ti::ValuePointer {
                    size: Some(rows),
                    scalar,
                    space,
                }
            }
            Ti::Struct { ref members, .. } => {
                let member = members
                    .get(index as usize)
                    .ok_or(ResolveError::OutOfBoundsIndex {
                        expr: expr_base,
                        index,
                    })?;
                Ti::Pointer {
                    base: member.ty,
                    space,
                }
            }
            Ti::Scalar(_)
            | Ti::TensorLayout { .. }
            | Ti::TensorView { .. }
            | Ti::Tensor { .. }
            | Ti::Atomic(_)
            | Ti::Pointer { .. }
            | Ti::ValuePointer { .. }
            | Ti::Image { .. }
            | Ti::Sampler { .. }
            | Ti::SampledImage { .. }
            | Ti::AccelerationStructure
            | Ti::RayQuery
            | Ti::HitObject { .. }
            | Ti::BufferDescriptor { .. }
            | Ti::Spirv { .. } => {
                log::error!("Access index sub-type {sub:?}");
                return Err(ResolveError::InvalidSubAccess {
                    ty: ty_base,
                    indexed: true,
                });
            }
        })
    }

    pub(super) fn resolve_splat(
        &self,
        size: crate::VectorSize,
        value: Handle<crate::Expression>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        let ty = past(value)?.inner_with(self.types);
        let crate::TypeInner::Scalar(scalar) = *ty else {
            log::error!("Scalar type {ty:?}");
            return Err(ResolveError::InvalidScalar(value));
        };
        Ok(TypeResolution::Value(crate::TypeInner::Vector {
            size,
            scalar,
        }))
    }

    pub(super) fn resolve_swizzle(
        &self,
        size: crate::VectorSize,
        vector: Handle<crate::Expression>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        let ty = past(vector)?.inner_with(self.types);
        let crate::TypeInner::Vector { size: _, scalar } = *ty else {
            log::error!("Vector type {ty:?}");
            return Err(ResolveError::InvalidVector(vector));
        };
        Ok(TypeResolution::Value(crate::TypeInner::Vector {
            size,
            scalar,
        }))
    }

    pub(super) fn resolve_load(
        &self,
        pointer: Handle<crate::Expression>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        let types = self.types;
        let ty = past(pointer)?.inner_with(types);
        Ok(match *ty {
            Ti::Pointer { base, space: _ } => {
                if let Ti::Atomic(scalar) = types[base].inner {
                    TypeResolution::Value(Ti::Scalar(scalar))
                } else {
                    TypeResolution::Handle(base)
                }
            }
            Ti::ValuePointer {
                size,
                scalar,
                space: _,
            } => TypeResolution::Value(match size {
                Some(size) => Ti::Vector { size, scalar },
                None => Ti::Scalar(scalar),
            }),
            Ti::Scalar(_)
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
            | Ti::Spirv { .. } => {
                log::error!("Pointer {pointer:?} type {ty:?}");
                return Err(ResolveError::InvalidPointer(pointer));
            }
        })
    }

    pub(super) fn resolve_buffer_pointer(
        &self,
        descriptor: Handle<crate::Expression>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        let ty = past(descriptor)?.inner_with(self.types);
        let crate::TypeInner::Pointer { base, .. } = *ty else {
            log::error!("Buffer pointer of {ty:?}");
            return Err(ResolveError::InvalidPointer(descriptor));
        };
        let sub = &self.types[base].inner;
        let crate::TypeInner::BufferDescriptor { base, space } = *sub else {
            log::error!("Buffer pointer of {sub:?}");
            return Err(ResolveError::InvalidPointer(descriptor));
        };
        Ok(TypeResolution::Value(crate::TypeInner::Pointer {
            base,
            space,
        }))
    }

    pub(super) fn resolve_interpolate_at(
        &self,
        pointer: Handle<crate::Expression>,
        past: impl Fn(Handle<crate::Expression>) -> Result<&'a TypeResolution, ResolveError>,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::TypeInner as Ti;
        let ty = past(pointer)?.inner_with(self.types);
        Ok(match *ty {
            Ti::Pointer { base, .. } => TypeResolution::Handle(base),
            Ti::ValuePointer { size, scalar, .. } => TypeResolution::Value(match size {
                Some(size) => Ti::Vector { size, scalar },
                None => Ti::Scalar(scalar),
            }),
            Ti::Scalar(_)
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
            | Ti::Spirv { .. } => {
                log::error!("Interpolant type {ty:?}");
                return Err(ResolveError::InvalidPointer(pointer));
            }
        })
    }
}
