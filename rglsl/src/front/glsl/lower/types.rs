use alloc::vec::Vec;
use core::num::NonZeroU32;

use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockId, Opaque, OpaqueKind, SampledType, Scalar as GlslScalar,
    StructId, TextureDimension, Type as GlslType, TypeKind,
};

use super::offset::{calculate_offset, TypeAlignSpan};
use super::{internal, unsupported, Lowerer, Packing, Result};
use crate::{
    proc::Alignment, ArraySize, Handle, ImageClass, ImageDimension, Scalar, ScalarKind, Span,
    StructMember, Type, TypeInner, VectorSize,
};

pub(super) const fn scalar(scalar: GlslScalar) -> Scalar {
    match scalar {
        GlslScalar::Bool => Scalar::BOOL,
        GlslScalar::Int => Scalar::I32,
        GlslScalar::Uint => Scalar::U32,
        GlslScalar::Float => Scalar::F32,
        GlslScalar::Double => Scalar::F64,
    }
}

pub(super) const fn vector_size(size: u8) -> Option<VectorSize> {
    match size {
        2 => Some(VectorSize::Bi),
        3 => Some(VectorSize::Tri),
        4 => Some(VectorSize::Quad),
        _ => None,
    }
}

pub(super) const fn sampled_kind(sampled: SampledType) -> ScalarKind {
    match sampled {
        SampledType::Float => ScalarKind::Float,
        SampledType::Int => ScalarKind::Sint,
        SampledType::Uint => ScalarKind::Uint,
    }
}

pub(super) const fn image_dimension(opaque: Opaque) -> ImageDimension {
    match opaque.dimension {
        TextureDimension::D1 => ImageDimension::D1,
        TextureDimension::D2 => ImageDimension::D2,
        TextureDimension::D3 => ImageDimension::D3,
        TextureDimension::Cube => ImageDimension::Cube,
        TextureDimension::Buffer => ImageDimension::Buffer,
    }
}

fn contains_bool(ty: &GlslType, registry: &rglsl_sema::TypeRegistry) -> bool {
    match ty.kind {
        TypeKind::Scalar(GlslScalar::Bool)
        | TypeKind::Vector {
            scalar: GlslScalar::Bool,
            ..
        } => true,
        TypeKind::Struct(id) => registry
            .structure(id)
            .is_some_and(|structure| structure.scalars.contains(&GlslScalar::Bool)),
        _ => false,
    }
}

impl Lowerer<'_> {
    pub(super) fn insert_type(&mut self, inner: TypeInner) -> Handle<Type> {
        self.module
            .types
            .insert(Type { name: None, inner }, Span::UNDEFINED)
    }

    pub(super) fn vector_type(&mut self, size: VectorSize, scalar: Scalar) -> Handle<Type> {
        self.insert_type(TypeInner::Vector { size, scalar })
    }

    pub(super) fn ir_type(&mut self, ty: &GlslType, span: Span) -> Result<Handle<Type>> {
        self.ir_type_with(ty, false, false, span)
    }

    pub(super) fn ir_type_with(
        &mut self,
        ty: &GlslType,
        depth: bool,
        comparison: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        if ty.is_array() && ty.is_opaque() {
            return Err(unsupported(
                "arrays of opaque types outside uniform declarations",
                span,
            ));
        }
        let base = self.base_type(ty.kind, depth, comparison, span)?;
        self.wrap_arrays(base, &ty.array, span)
    }

    pub(super) fn wrap_arrays(
        &mut self,
        base: Handle<Type>,
        dimensions: &[GlslArraySize],
        span: Span,
    ) -> Result<Handle<Type>> {
        let mut ty = base;
        for dimension in dimensions.iter().rev() {
            let size = self.array_size(*dimension, span)?;
            self.layouter
                .update(self.module.to_ctx())
                .map_err(|_| internal(span))?;
            let stride = self.layouter[ty].to_stride();
            ty = self.insert_type(TypeInner::Array {
                base: ty,
                size,
                stride,
            });
        }
        Ok(ty)
    }

    pub(super) fn array_size(&self, size: GlslArraySize, span: Span) -> Result<ArraySize> {
        match size {
            GlslArraySize::Sized(size) => NonZeroU32::new(size)
                .map(ArraySize::Constant)
                .ok_or_else(|| internal(span)),
            GlslArraySize::Unsized => Ok(ArraySize::Dynamic),
            GlslArraySize::Specialized => Err(unsupported(
                "arrays sized by specialization constants",
                span,
            )),
        }
    }

    fn base_type(
        &mut self,
        kind: TypeKind,
        depth: bool,
        comparison: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        let inner = match kind {
            TypeKind::Error | TypeKind::Void => return Err(internal(span)),
            TypeKind::Scalar(s) => TypeInner::Scalar(scalar(s)),
            TypeKind::Vector { scalar: s, size } => TypeInner::Vector {
                size: vector_size(size).ok_or_else(|| internal(span))?,
                scalar: scalar(s),
            },
            TypeKind::Matrix {
                scalar: s,
                columns,
                rows,
            } => TypeInner::Matrix {
                columns: vector_size(columns).ok_or_else(|| internal(span))?,
                rows: vector_size(rows).ok_or_else(|| internal(span))?,
                scalar: scalar(s),
            },
            TypeKind::Struct(id) => return self.struct_type(id, span),
            TypeKind::Block(_) => {
                return Err(unsupported("blocks used as values", span));
            }
            TypeKind::Opaque(opaque) => self.opaque_inner(opaque, depth, comparison, span)?,
        };
        Ok(self.insert_type(inner))
    }

    pub(super) fn opaque_inner(
        &self,
        opaque: Opaque,
        depth: bool,
        comparison: bool,
        span: Span,
    ) -> Result<TypeInner> {
        match opaque.kind {
            OpaqueKind::Sampler => Ok(TypeInner::Sampler {
                comparison: opaque.shadow || comparison,
            }),
            OpaqueKind::Texture => {
                let dim = image_dimension(opaque);
                let class = if depth {
                    if opaque.sampled != SampledType::Float {
                        return Err(unsupported(
                            "integer textures sampled with a shadow sampler",
                            span,
                        ));
                    }
                    ImageClass::Depth {
                        multi: opaque.multisample,
                    }
                } else {
                    ImageClass::Sampled {
                        kind: sampled_kind(opaque.sampled),
                        multi: opaque.multisample,
                    }
                };
                Ok(TypeInner::Image {
                    dim,
                    arrayed: opaque.arrayed,
                    class,
                })
            }
            OpaqueKind::CombinedSampler => {
                let class = if opaque.shadow {
                    if opaque.sampled != SampledType::Float {
                        return Err(internal(span));
                    }
                    ImageClass::Depth {
                        multi: opaque.multisample,
                    }
                } else {
                    ImageClass::Sampled {
                        kind: sampled_kind(opaque.sampled),
                        multi: opaque.multisample,
                    }
                };
                Ok(TypeInner::SampledImage {
                    dim: image_dimension(opaque),
                    arrayed: opaque.arrayed,
                    class,
                })
            }
            OpaqueKind::Image => Err(unsupported(
                "storage images outside uniform declarations",
                span,
            )),
            OpaqueKind::SubpassInput => Err(unsupported("subpass inputs", span)),
        }
    }

    pub(super) fn struct_type(&mut self, id: StructId, span: Span) -> Result<Handle<Type>> {
        if let Some(&handle) = self.structs.get(&id) {
            return Ok(handle);
        }
        let structure = self
            .analysis
            .types
            .structure(id)
            .ok_or_else(|| internal(span))?;
        let mut members = Vec::with_capacity(structure.members.len());
        let mut offset = 0;
        let mut alignment = Alignment::ONE;
        for member in &structure.members {
            let ty = self.ir_type(&member.ty, span)?;
            self.layouter
                .update(self.module.to_ctx())
                .map_err(|_| internal(span))?;
            let layout = self.layouter[ty];
            offset = layout.alignment.round_up(offset);
            alignment = layout.alignment.max(alignment);
            members.push(StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: None,
                offset,
                matrix_layout: None,
                xfb_offset: None,
            });
            offset = offset.saturating_add(layout.size);
        }
        let span_bytes = alignment.round_up(offset);
        let handle = self.module.types.insert(
            Type {
                name: structure.name.clone(),
                inner: TypeInner::Struct {
                    members,
                    span: span_bytes,
                },
            },
            span,
        );
        self.structs.insert(id, handle);
        Ok(handle)
    }

    fn layout(
        &mut self,
        ty: Handle<Type>,
        packing: Packing,
        row_major: bool,
        span: Span,
    ) -> Result<TypeAlignSpan> {
        let mut errors = Vec::new();
        let info = calculate_offset(
            ty,
            span,
            packing,
            row_major,
            &mut self.module.types,
            &mut errors,
        );
        match errors.into_iter().next() {
            Some(error) => Err(error),
            None => {
                self.record_relayout(info.ty, ty);
                Ok(info)
            }
        }
    }

    fn record_relayout(&mut self, laid: Handle<Type>, plain: Handle<Type>) {
        if laid == plain || self.relayout.insert(laid, plain).is_some() {
            return;
        }
        let types = &self.module.types;
        let pairs: Vec<(Handle<Type>, Handle<Type>)> =
            match (&types[laid].inner, &types[plain].inner) {
                (
                    &TypeInner::Struct {
                        members: ref laid_members,
                        ..
                    },
                    &TypeInner::Struct {
                        members: ref plain_members,
                        ..
                    },
                ) => laid_members
                    .iter()
                    .zip(plain_members)
                    .map(|(laid, plain)| (laid.ty, plain.ty))
                    .collect(),
                (&TypeInner::Array { base: laid, .. }, &TypeInner::Array { base: plain, .. }) => {
                    alloc::vec![(laid, plain)]
                }
                _ => Vec::new(),
            };
        for (laid, plain) in pairs {
            self.record_relayout(laid, plain);
        }
    }

    pub(super) fn block_struct(
        &mut self,
        id: BlockId,
        packing: Packing,
        row_major: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        let analysis = self.analysis;
        let block = analysis.types.block(id).ok_or_else(|| internal(span))?;
        let mut members = Vec::with_capacity(block.members.len());
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        for (index, member) in block.members.iter().enumerate() {
            let index = u32::try_from(index).map_err(|_| internal(span))?;
            let lowered = match member.ty.kind {
                TypeKind::Scalar(GlslScalar::Bool) if !member.ty.is_array() => {
                    Some(GlslType::scalar(GlslScalar::Uint))
                }
                TypeKind::Vector {
                    scalar: GlslScalar::Bool,
                    size,
                } if !member.ty.is_array() => Some(GlslType::vector(GlslScalar::Uint, size)),
                _ => None,
            };
            let ty = match lowered {
                Some(lowered) => {
                    self.block_bools.insert((id, index));
                    self.ir_type(&lowered, span)?
                }
                None => {
                    if contains_bool(&member.ty, &analysis.types) {
                        return Err(unsupported(
                            "booleans inside arrays or structures in a block",
                            span,
                        ));
                    }
                    if member.ty.contains_opaque(&analysis.types) {
                        return Err(unsupported("opaque types in blocks", span));
                    }
                    self.ir_type(&member.ty, span)?
                }
            };
            let qualifiers = &member.qualifiers;
            if qualifiers.has_layout("align") {
                return Err(unsupported("the `align` layout qualifier", span));
            }
            let member_row_major = if qualifiers.has_layout("row_major") {
                true
            } else if qualifiers.has_layout("column_major") {
                false
            } else {
                row_major
            };
            let info = self.layout(ty, packing, member_row_major, span)?;
            offset = match qualifiers
                .layout_entry("offset")
                .and_then(|entry| entry.value)
            {
                Some(explicit) => u32::try_from(explicit).map_err(|_| internal(span))?,
                None => info.align.round_up(offset),
            };
            alignment = info.align.max(alignment);
            members.push(StructMember {
                name: Some(member.name.clone()),
                ty: info.ty,
                binding: None,
                offset,
                matrix_layout: info.matrix_layout,
                xfb_offset: None,
            });
            offset = offset.saturating_add(info.span);
        }
        let span_bytes = alignment.round_up(offset);
        Ok(self.module.types.insert(
            Type {
                name: Some(block.name.clone()),
                inner: TypeInner::Struct {
                    members,
                    span: span_bytes,
                },
            },
            span,
        ))
    }
}
