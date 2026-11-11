use alloc::vec::Vec;
use core::num::NonZeroU32;

use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockId, BlockStorage, CooperativeUse, Opaque, OpaqueKind,
    SampledType, Scalar as GlslScalar, StructId, TextureDimension, Type as GlslType, TypeKind,
};

use alloc::collections::BTreeMap;
use rglsl_ast::ast::NodeId;
use rglsl_sema::layout::{
    member_row_major, type_layout, ArrayLengths, MemberPlacer, Shape, TypeLayout,
};
use rglsl_sema::types::SpecializedSize;
use rglsl_sema::SymbolId;

use super::GlobalRef;
use crate::front::glsl::{Error, ErrorKind};
use crate::{MatrixLayout, Override};
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
        SampledType::Int => ScalarKind::Sint,
        SampledType::Uint => ScalarKind::Uint,
    }
}

pub(super) const fn image_dimension(opaque: Opaque) -> ImageDimension {
    if matches!(opaque.kind, OpaqueKind::SubpassInput) {
        return ImageDimension::Subpass;
    }
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
        symbol: SymbolId,
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

    pub(super) fn type_layout(
        &self,
        ty: &GlslType,
        packing: Packing,
        row_major: bool,
        span: Span,
    ) -> Result<TypeLayout> {
        let lengths = self.lowered_lengths();
        type_layout(&self.analysis.types, ty, packing, row_major, &lengths)
            .ok_or_else(|| invalid_member(span))
    }

    pub(super) fn lowered_lengths(&self) -> LoweredLengths<'_> {
        LoweredLengths {
            globals: &self.globals,
            specialized: &self.specialized_sizes,
            pending: self.pending_lengths(),
        }
    }

    pub(super) fn laid_out(
        &mut self,
        glsl: &GlslType,
        ty: Handle<Type>,
        packing: Packing,
        row_major: bool,
        span: Span,
    ) -> Result<(Handle<Type>, TypeLayout)> {
        let layout = self.type_layout(glsl, packing, row_major, span)?;
        let laid = self.apply_layout(ty, &layout, span)?;
        Ok((laid, layout))
    }

    pub(super) fn apply_layout(
        &mut self,
        ty: Handle<Type>,
        layout: &TypeLayout,
        span: Span,
    ) -> Result<Handle<Type>> {
        let laid = self.apply_layout_inner(ty, layout, span)?;
        self.record_relayout(laid, ty);
        Ok(laid)
    }

    fn apply_layout_inner(
        &mut self,
        ty: Handle<Type>,
        layout: &TypeLayout,
        span: Span,
    ) -> Result<Handle<Type>> {
        let name = self.module.types[ty].name.clone();
        let ty_span = self.module.types.get_span(ty);
        let inner = match (&self.module.types[ty].inner, &layout.shape) {
            (
                &TypeInner::Array { base, size, .. },
                &Shape::Array {
                    stride,
                    ref element,
                },
            ) => {
                let base = self.apply_layout_inner(base, element, span)?;
                TypeInner::Array { base, size, stride }
            }
            (&TypeInner::Struct { ref members, .. }, &Shape::Struct(ref laid)) => {
                if members.len() != laid.len() {
                    return Err(internal(span));
                }
                let mut members = members.clone();
                for (member, laid) in members.iter_mut().zip(laid) {
                    member.ty = self.apply_layout_inner(member.ty, &laid.layout, span)?;
                    member.offset = laid.offset;
                    member.matrix_layout = matrix_layout(&laid.layout);
                }
                TypeInner::Struct {
                    members,
                    span: layout.size,
                }
            }
            (&TypeInner::Array { .. } | &TypeInner::Struct { .. }, _) => {
                return Err(internal(span))
            }
            (_, &Shape::Plain | &Shape::Matrix { .. }) => return Ok(ty),
            (_, &Shape::Array { .. } | &Shape::Struct(_)) => return Err(invalid_member(span)),
        };
        Ok(self.module.types.insert(Type { name, inner }, ty_span))
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
        let mut placer = MemberPlacer::new(&block.qualifiers);
        let last = block.members.len().saturating_sub(1);
        for (position, member) in block.members.iter().enumerate() {
            let index = u32::try_from(position).map_err(|_| internal(span))?;
            let runtime = block.storage == BlockStorage::Buffer && position == last;
            let mut member_ty = member.ty.clone();
            if !runtime && member_ty.outer_size() == Some(GlslArraySize::Unsized) {
                let size = self.member_sizes.get(&(id, index)).copied().unwrap_or(1);
                if let Some(first) = member_ty.array.first_mut() {
                    *first = GlslArraySize::Sized(size);
                }
            }
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
                    if contains_bool(&member_ty, &analysis.types) {
                        return Err(unsupported(
                            "booleans inside arrays or structures in a block",
                            span,
                        ));
                    }
                    if member_ty.contains_opaque(&analysis.types) {
                        return Err(unsupported("opaque types in blocks", span));
                    }
                    self.ir_type(&member_ty, span)?
                }
            };
            let member_row_major = member_row_major(&member.qualifiers, row_major);
            let layout = self.type_layout(&member_ty, packing, member_row_major, span)?;
            let offset = placer
                .place(&member.qualifiers, &layout)
                .ok_or_else(|| invalid_member(span))?;
            let ty = self.apply_layout(ty, &layout, span)?;
            members.push(StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: None,
                offset,
                matrix_layout: matrix_layout(&layout),
                xfb_offset: None,
                heap: None,
            });
        }
        let span_bytes = Alignment::new(placer.alignment())
            .map_or(placer.end(), |alignment| alignment.round_up(placer.end()));
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
        Ok(handle)
    }
}

pub(super) struct LoweredLengths<'l> {
    globals: &'l BTreeMap<SymbolId, GlobalRef>,
    specialized: &'l BTreeMap<NodeId, Handle<Override>>,
    pending: Vec<u32>,
}

impl LoweredLengths<'_> {
    fn pending(&self, handle: Handle<Override>) -> u32 {
        self.pending.get(handle.index()).copied().unwrap_or(1)
    }
}

impl ArrayLengths for LoweredLengths<'_> {
    fn length(&self, size: GlslArraySize) -> Option<u32> {
        Some(match size {
            GlslArraySize::Sized(size) => size,
            GlslArraySize::Unsized => 1,
            GlslArraySize::Specialized(SpecializedSize::Constant { symbol, default }) => {
                match self.globals.get(&symbol) {
                    Some(&GlobalRef::Override(handle)) => self.pending(handle),
                    _ => default,
                }
            }
            GlslArraySize::Specialized(SpecializedSize::Expression(node)) => self
                .specialized
                .get(&node)
                .map_or(1, |&handle| self.pending(handle)),
        })
    }
}

pub(super) fn matrix_layout(layout: &TypeLayout) -> Option<MatrixLayout> {
    layout.matrix().map(|matrix| MatrixLayout {
        stride: matrix.stride,
        row_major: matrix.row_major,
    })
}

fn invalid_member(span: Span) -> Error {
    Error {
        kind: ErrorKind::SemanticError("Invalid struct member type".into()),
        meta: span,
    }
}
