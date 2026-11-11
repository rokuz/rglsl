use alloc::vec::Vec;
use core::num::NonZeroU32;

use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockId, BlockStorage, CooperativeUse, Opaque, OpaqueKind,
    SampledType, Scalar as GlslScalar, StructId, TextureDimension, Type as GlslType, TypeKind,
};

use super::offset::{calculate_offset, TypeAlignSpan};
use rglsl_ast::extensions::Feature;

use super::{internal, unsupported, Lowerer, Packing, Result};
use crate::{
    proc::Alignment, ArraySize, CooperativeMatrixClass, CooperativeRole, CooperativeSize, Handle,
    ImageClass, ImageDimension, LongVectorClass, Scalar, ScalarKind, Span, StructMember, Type,
    TypeInner, VectorSize,
};

pub(super) const fn scalar(scalar: GlslScalar) -> Scalar {
    match scalar {
        GlslScalar::Bool => Scalar::BOOL,
        GlslScalar::Int => Scalar::I32,
        GlslScalar::Uint => Scalar::U32,
        GlslScalar::Float => Scalar::F32,
        GlslScalar::Double => Scalar::F64,
        GlslScalar::Float16 => Scalar::F16,
        GlslScalar::Int16 => Scalar::I16,
        GlslScalar::Uint16 => Scalar::U16,
        GlslScalar::Int64 => Scalar::I64,
        GlslScalar::Uint64 => Scalar::U64,
        GlslScalar::Int8 => Scalar::I8,
        GlslScalar::Uint8 => Scalar::U8,
        GlslScalar::BFloat16 => Scalar::BF16,
        GlslScalar::FloatE4M3 => Scalar::FE4M3,
        GlslScalar::FloatE5M2 => Scalar::FE5M2,
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
        SampledType::Int | SampledType::Int64 => ScalarKind::Sint,
        SampledType::Uint | SampledType::Uint64 => ScalarKind::Uint,
    }
}

pub(super) const fn sampled_scalar(sampled: SampledType) -> Scalar {
    Scalar {
        kind: sampled_kind(sampled),
        width: match sampled {
            SampledType::Int64 | SampledType::Uint64 => 8,
            SampledType::Float | SampledType::Int | SampledType::Uint => 4,
        },
    }
}

pub(super) const fn image_dimension(opaque: Opaque) -> ImageDimension {
    if matches!(opaque.kind, OpaqueKind::SubpassInput) {
        return ImageDimension::Subpass;
    }
    if matches!(opaque.kind, OpaqueKind::TileImage) {
        return ImageDimension::TileImageData;
    }
    match opaque.dimension {
        TextureDimension::D1 => ImageDimension::D1,
        TextureDimension::D2 => ImageDimension::D2,
        TextureDimension::D3 => ImageDimension::D3,
        TextureDimension::Cube => ImageDimension::Cube,
        TextureDimension::Buffer => ImageDimension::Buffer,
    }
}

impl Lowerer<'_> {
    pub(super) fn folds_conversions_to(&self, target: Scalar) -> bool {
        let feature = match (target.kind, target.width) {
            (ScalarKind::Float, 2) => Feature::Float16Arithmetic,
            (_, 2) => Feature::Int16Arithmetic,
            (_, 1) => Feature::Int8Arithmetic,
            _ => return true,
        };
        feature
            .extensions()
            .iter()
            .any(|name| self.analysis.extensions.contains(*name))
    }

    pub(super) fn insert_type(&mut self, inner: TypeInner) -> Handle<Type> {
        self.module
            .types
            .insert(Type { name: None, inner }, Span::UNDEFINED)
    }

    pub(super) fn sparse_result_type(&mut self, texel: TypeInner) -> Handle<Type> {
        let (offset, span) = match texel {
            TypeInner::Vector { scalar, .. } if scalar.width == 8 => (32, 64),
            TypeInner::Vector { .. } => (16, 32),
            _ => (4, 8),
        };
        let code = self.insert_type(TypeInner::Scalar(Scalar::I32));
        let texel = self.insert_type(texel);
        self.insert_type(TypeInner::Struct {
            members: alloc::vec![
                StructMember {
                    name: None,
                    ty: code,
                    binding: None,
                    offset: 0,
                    matrix_layout: None,
                    xfb_offset: None,
                    heap: None,
                },
                StructMember {
                    name: None,
                    ty: texel,
                    binding: None,
                    offset,
                    matrix_layout: None,
                    xfb_offset: None,
                    heap: None,
                },
            ],
            span,
        })
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

    pub(super) fn array_size(&mut self, size: GlslArraySize, span: Span) -> Result<ArraySize> {
        match size {
            GlslArraySize::Sized(size) => NonZeroU32::new(size)
                .map(ArraySize::Constant)
                .ok_or_else(|| internal(span)),
            GlslArraySize::Unsized => Ok(ArraySize::Dynamic),
            GlslArraySize::Specialized(size) => {
                self.specialized_size(size, span).map(ArraySize::Pending)
            }
        }
    }

    pub(super) fn cooperative_size(
        &mut self,
        size: GlslArraySize,
        span: Span,
    ) -> Result<CooperativeSize> {
        match size {
            GlslArraySize::Sized(size) => NonZeroU32::new(size)
                .map(CooperativeSize::Constant)
                .ok_or_else(|| internal(span)),
            GlslArraySize::Specialized(size) => self
                .specialized_size(size, span)
                .map(CooperativeSize::Pending),
            GlslArraySize::Unsized => Err(internal(span)),
        }
    }

    pub(super) fn unsized_binding_array(
        &mut self,
        symbol: rglsl_sema::SymbolId,
        span: Span,
    ) -> Result<ArraySize> {
        if self.variably_indexed.contains(&symbol) {
            return Ok(ArraySize::Dynamic);
        }
        let size = self.implicit_sizes.get(&symbol).copied().unwrap_or(1);
        self.array_size(GlslArraySize::Sized(size), span)
    }

    fn base_type(
        &mut self,
        kind: TypeKind,
        depth: bool,
        comparison: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        let inner = match kind {
            TypeKind::Error | TypeKind::Void | TypeKind::String => return Err(internal(span)),
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
            TypeKind::Reference(block) => return self.reference_type(block, span),
            TypeKind::Opaque(opaque) => self.opaque_inner(opaque, depth, comparison, span)?,
            TypeKind::CooperativeMatrix(matrix) => TypeInner::CooperativeMatrix {
                columns: self.cooperative_size(matrix.columns, span)?,
                rows: self.cooperative_size(matrix.rows, span)?,
                scalar: scalar(matrix.scalar),
                role: match matrix.usage {
                    CooperativeUse::A => CooperativeRole::A,
                    CooperativeUse::B => CooperativeRole::B,
                    CooperativeUse::Accumulator | CooperativeUse::Nv => CooperativeRole::C,
                },
                scope: self.cooperative_size(matrix.scope, span)?,
                class: match matrix.usage {
                    CooperativeUse::Nv => CooperativeMatrixClass::Nv,
                    CooperativeUse::A | CooperativeUse::B | CooperativeUse::Accumulator => {
                        CooperativeMatrixClass::Khr
                    }
                },
            },
            TypeKind::LongVector {
                scalar: s,
                size: GlslArraySize::Sized(size),
            } if (2..=4).contains(&size) => TypeInner::Vector {
                size: u8::try_from(size)
                    .ok()
                    .and_then(vector_size)
                    .ok_or_else(|| internal(span))?,
                scalar: scalar(s),
            },
            TypeKind::LongVector { scalar: s, size } => TypeInner::LongVector {
                size: self.cooperative_size(size, span)?,
                scalar: scalar(s),
                class: LongVectorClass::Plain,
            },
            TypeKind::CooperativeVector { scalar: s, size } => TypeInner::LongVector {
                size: self.cooperative_size(size, span)?,
                scalar: scalar(s),
                class: LongVectorClass::CooperativeNv,
            },
            TypeKind::TensorLayout {
                dimensions,
                clamp_mode,
            } => TypeInner::TensorLayout {
                dimensions: self.cooperative_size(dimensions, span)?,
                clamp_mode: match clamp_mode {
                    GlslArraySize::Sized(0) => None,
                    other => Some(self.cooperative_size(other, span)?),
                },
            },
            TypeKind::TensorView {
                dimensions,
                has_dimensions,
                permutation,
            } => {
                let count = dimensions.nominal().unwrap_or(1).min(5);
                TypeInner::TensorView {
                    dimensions: self.cooperative_size(dimensions, span)?,
                    has_dimensions,
                    permutation: permutation
                        .iter()
                        .take(usize::try_from(count).unwrap_or(5))
                        .map(|&index| u32::from(index))
                        .collect(),
                }
            }
            TypeKind::Tensor { scalar: s, rank } => TypeInner::Tensor {
                scalar: scalar(s),
                rank,
            },
            TypeKind::Spirv(id) => self.spirv_type(id, span)?,
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
            OpaqueKind::AccelerationStructure => Ok(TypeInner::AccelerationStructure {
                vertex_return: false,
            }),
            OpaqueKind::RayQuery => Ok(TypeInner::RayQuery {
                vertex_return: false,
            }),
            OpaqueKind::HitObjectNv => Ok(TypeInner::HitObject {
                kind: crate::HitObjectKind::Nv,
            }),
            OpaqueKind::HitObjectExt => Ok(TypeInner::HitObject {
                kind: crate::HitObjectKind::Ext,
            }),
            OpaqueKind::TileImage => Ok(TypeInner::Image {
                dim: ImageDimension::TileImageData,
                arrayed: false,
                class: ImageClass::Sampled {
                    kind: sampled_kind(opaque.sampled),
                    multi: false,
                },
            }),
            OpaqueKind::SubpassInput => Ok(TypeInner::Image {
                dim: ImageDimension::Subpass,
                arrayed: false,
                class: ImageClass::Sampled {
                    kind: sampled_kind(opaque.sampled),
                    multi: opaque.multisample,
                },
            }),
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
                heap: None,
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

    pub(super) fn pending_lengths(&self) -> Vec<u32> {
        self.module
            .overrides
            .iter()
            .map(|(_, item)| {
                item.init
                    .and_then(|init| match self.module.global_expressions[init] {
                        crate::Expression::Literal(crate::Literal::I32(value)) => {
                            u32::try_from(value).ok()
                        }
                        crate::Expression::Literal(crate::Literal::U32(value)) => Some(value),
                        _ => self.module.to_ctx().get_const_val::<u32, _>(init).ok(),
                    })
                    .filter(|value| *value > 0)
                    .unwrap_or(1)
            })
            .collect()
    }

    pub(super) fn layout(
        &mut self,
        ty: Handle<Type>,
        packing: Packing,
        row_major: bool,
        span: Span,
    ) -> Result<TypeAlignSpan> {
        let mut errors = Vec::new();
        let pending = self.pending_lengths();
        let info = calculate_offset(
            ty,
            span,
            packing,
            row_major,
            &mut self.module.types,
            &pending,
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
        if laid == plain || self.holds_booleans(plain) {
            return;
        }
        if self.relayout.insert(laid, plain).is_some() {
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

    fn holds_booleans(&self, ty: Handle<Type>) -> bool {
        match self.module.types[ty].inner {
            TypeInner::Scalar(scalar) | TypeInner::Vector { scalar, .. } => {
                scalar.kind == ScalarKind::Bool
            }
            TypeInner::Array { base, .. } => self.holds_booleans(base),
            _ => false,
        }
    }

    pub(super) fn block_struct(
        &mut self,
        id: BlockId,
        packing: Packing,
        row_major: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        self.block_struct_with_end(id, packing, row_major, span)
            .map(|(handle, _)| handle)
    }

    pub(super) fn block_struct_with_end(
        &mut self,
        id: BlockId,
        packing: Packing,
        row_major: bool,
        span: Span,
    ) -> Result<(Handle<Type>, u32)> {
        let analysis = self.analysis;
        let block = analysis.types.block(id).ok_or_else(|| internal(span))?;
        let mut members = Vec::with_capacity(block.members.len());
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        let last = block.members.len().saturating_sub(1);
        for (position, member) in block.members.iter().enumerate() {
            let index = u32::try_from(position).map_err(|_| internal(span))?;
            let runtime = block.storage == BlockStorage::Buffer && position == last;
            let sized;
            let member_ty = match member.ty.outer_size() {
                Some(GlslArraySize::Unsized) if !runtime => {
                    let size = self.member_sizes.get(&(id, index)).copied().unwrap_or(1);
                    let mut ty = member.ty.clone();
                    if let Some(first) = ty.array.first_mut() {
                        *first = GlslArraySize::Sized(size);
                    }
                    sized = ty;
                    &sized
                }
                _ => &member.ty,
            };
            let lowered = match member_ty.kind {
                TypeKind::Scalar(GlslScalar::Bool) => {
                    Some(GlslType::scalar(GlslScalar::Uint).with_dimensions(&member_ty.array))
                }
                TypeKind::Vector {
                    scalar: GlslScalar::Bool,
                    size,
                } => {
                    Some(GlslType::vector(GlslScalar::Uint, size).with_dimensions(&member_ty.array))
                }
                _ => None,
            };
            let ty = match lowered {
                Some(lowered) => {
                    self.block_bools.insert((id, index));
                    self.ir_type(&lowered, span)?
                }
                None => {
                    if member_ty.contains_opaque(&analysis.types) {
                        return Err(unsupported("opaque types in blocks", span));
                    }
                    self.ir_type(member_ty, span)?
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
                heap: None,
            });
            offset = offset.saturating_add(info.span);
        }
        let span_bytes = alignment.round_up(offset);
        let handle = self.module.types.insert(
            Type {
                name: Some(block.name.clone()),
                inner: TypeInner::Struct {
                    members,
                    span: span_bytes,
                },
            },
            span,
        );
        Ok((handle, offset))
    }
}
