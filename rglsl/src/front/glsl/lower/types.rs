use alloc::vec::Vec;
use core::num::NonZeroU32;

use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockId, BlockStorage, CooperativeUse, Opaque, OpaqueKind,
    SampledType, Scalar as GlslScalar, StructId, TextureDimension, Type as GlslType, TypeKind,
};

use alloc::collections::BTreeMap;
use rglsl_ast::ast::NodeId;
use rglsl_sema::SymbolId;
use rglsl_sema::layout::{
    ArrayLengths, MemberLayout, MemberPlacer, Shape, TypeLayout, member_row_major, type_layout,
};
use rglsl_sema::types::SpecializedSize;

use super::GlobalRef;
use super::globals::member_memory;
use crate::front::glsl::{Error, ErrorKind};
use crate::{MatrixLayout, MemoryDecorations, Override};
use rglsl_ast::extensions::Feature;
use rglsl_types::extension::Extension;

use super::{Lowerer, Packing, Result, internal, unsupported};
use crate::{
    ArraySize, CooperativeMatrixClass, CooperativeRole, CooperativeSize, Handle, ImageClass,
    ImageDimension, LongVectorClass, Scalar, ScalarKind, Span, StructMember, Type, TypeInner,
    VectorSize, proc::Alignment,
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
        GlslScalar::FloatE2M1 => Scalar::FE2M1,
        GlslScalar::FloatE3M2 => Scalar::FE3M2,
        GlslScalar::FloatE2M3 => Scalar::FE2M3,
        GlslScalar::FloatUE8M0 => Scalar::FUE8M0,
        GlslScalar::FloatMXINT8 => Scalar::FMXINT8,
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
    pub(super) fn block_struct(
        &mut self,
        id: BlockId,
        packing: Packing,
        row_major: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        super::function::lowerer_on_heap!(self, |cx| cx.block_struct(id, packing, row_major, span))
    }

    fn apply_layout_inner(
        &mut self,
        ty: Handle<Type>,
        layout: &TypeLayout,
        span: Span,
    ) -> Result<Handle<Type>> {
        enum Pending<'t> {
            Array {
                ty: Handle<Type>,
                size: ArraySize,
                stride: u32,
            },
            Struct {
                ty: Handle<Type>,
                members: Vec<StructMember>,
                laid: &'t [MemberLayout],
                size: u32,
                next: usize,
            },
        }
        let mut stack: Vec<Pending<'_>> = Vec::new();
        let mut request = Some((ty, layout));
        let mut result = None;
        loop {
            if let Some((ty, layout)) = request.take() {
                let laid = match (&self.module.types[ty].inner, &layout.shape) {
                    (
                        &TypeInner::Array { base, size, .. },
                        &Shape::Array {
                            stride,
                            ref element,
                        },
                    ) => {
                        stack.push(Pending::Array { ty, size, stride });
                        request = Some((base, &**element));
                        continue;
                    }
                    (&TypeInner::Struct { ref members, .. }, &Shape::Struct(ref laid)) => {
                        if members.len() != laid.len() {
                            return Err(internal(span));
                        }
                        stack.push(Pending::Struct {
                            ty,
                            members: members.clone(),
                            laid,
                            size: layout.size,
                            next: 0,
                        });
                        None
                    }
                    (&TypeInner::Array { .. } | &TypeInner::Struct { .. }, _) => {
                        return Err(internal(span));
                    }
                    (&TypeInner::Scalar(Scalar::BOOL), &Shape::Plain) => {
                        Some(self.laid_type(ty, TypeInner::Scalar(Scalar::U32)))
                    }
                    (
                        &TypeInner::Vector {
                            size,
                            scalar: Scalar::BOOL,
                        },
                        &Shape::Plain,
                    ) => Some(self.laid_type(
                        ty,
                        TypeInner::Vector {
                            size,
                            scalar: Scalar::U32,
                        },
                    )),
                    (_, &Shape::Plain | &Shape::Matrix { .. }) => Some(ty),
                    (_, &Shape::Array { .. } | &Shape::Struct(_)) => {
                        return Err(invalid_member(span));
                    }
                };
                result = laid;
            }
            let done = match stack.last_mut() {
                None => return result.ok_or_else(|| internal(span)),
                Some(&mut Pending::Array { ty, size, stride }) => {
                    let base = result.take().ok_or_else(|| internal(span))?;
                    stack.pop();
                    self.laid_type(ty, TypeInner::Array { base, size, stride })
                }
                Some(&mut Pending::Struct {
                    ty,
                    ref mut members,
                    laid,
                    size,
                    ref mut next,
                }) => {
                    if let Some(done) = result.take() {
                        let (Some(member), Some(laid)) = (members.get_mut(*next), laid.get(*next))
                        else {
                            return Err(internal(span));
                        };
                        member.ty = done;
                        member.offset = laid.offset;
                        member.matrix_layout = matrix_layout(&laid.layout);
                        *next += 1;
                    }
                    if let (Some(member), Some(laid)) = (members.get(*next), laid.get(*next)) {
                        request = Some((member.ty, &laid.layout));
                        continue;
                    }
                    let members = core::mem::take(members);
                    stack.pop();
                    self.laid_type(
                        ty,
                        TypeInner::Struct {
                            members,
                            span: size,
                        },
                    )
                }
            };
            result = Some(done);
        }
    }

    fn laid_type(&mut self, ty: Handle<Type>, inner: TypeInner) -> Handle<Type> {
        let name = self.module.types[ty].name.clone();
        let span = self.module.types.get_span(ty);
        self.module.types.insert(Type { name, inner }, span)
    }

    pub(super) fn array_size(&mut self, size: GlslArraySize, span: Span) -> Result<ArraySize> {
        super::function::lowerer_on_heap!(self, |cx| cx.array_size(size, span))
    }

    pub(super) fn wrap_arrays(
        &mut self,
        base: Handle<Type>,
        dimensions: &[GlslArraySize],
        span: Span,
    ) -> Result<Handle<Type>> {
        super::function::lowerer_on_heap!(self, |cx| cx.wrap_arrays(
            base,
            dimensions.to_vec(),
            span
        ))
    }

    fn plain_inner(
        kind: TypeKind,
        depth: bool,
        comparison: bool,
        span: Span,
    ) -> Option<Result<TypeInner>> {
        Some(match kind {
            TypeKind::Scalar(s) => Ok(TypeInner::Scalar(scalar(s))),
            TypeKind::Vector { scalar: s, size } => vector_size(size)
                .map(|size| TypeInner::Vector {
                    size,
                    scalar: scalar(s),
                })
                .ok_or_else(|| internal(span)),
            TypeKind::Matrix {
                scalar: s,
                columns,
                rows,
            } => match (vector_size(columns), vector_size(rows)) {
                (Some(columns), Some(rows)) => Ok(TypeInner::Matrix {
                    columns,
                    rows,
                    scalar: scalar(s),
                }),
                _ => Err(internal(span)),
            },
            TypeKind::Opaque(opaque) => Self::opaque_inner(opaque, depth, comparison, span),
            _ => return None,
        })
    }

    pub(super) fn plain_type(
        &mut self,
        ty: &GlslType,
        depth: bool,
        comparison: bool,
        span: Span,
    ) -> Option<Result<Handle<Type>>> {
        if ty.is_array() {
            return None;
        }
        if let TypeKind::Struct(id) = ty.kind {
            return self.structs.get(&id).copied().map(Ok);
        }
        let inner = Self::plain_inner(ty.kind, depth, comparison, span)?;
        Some(inner.map(|inner| self.insert_type(inner)))
    }

    pub(super) fn ir_type_with(
        &mut self,
        ty: &GlslType,
        depth: bool,
        comparison: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        if let Some(result) = self.plain_type(ty, depth, comparison, span) {
            return result;
        }
        super::function::lowerer_on_heap!(self, |cx| cx.ir_type_with(
            ty.clone(),
            depth,
            comparison,
            span
        ))
    }

    pub(super) fn ir_type(&mut self, ty: &GlslType, span: Span) -> Result<Handle<Type>> {
        if let Some(result) = self.plain_type(ty, false, false, span) {
            return result;
        }
        super::function::lowerer_on_heap!(self, |cx| cx.ir_type(ty.clone(), span))
    }

    pub(super) fn plain_ir_type(&mut self, ty: &GlslType, span: Span) -> Result<Handle<Type>> {
        self.plain_type(ty, false, false, span)
            .unwrap_or_else(|| Err(internal(span)))
    }

    pub(super) fn lowered_type(&mut self, ty: &GlslType, span: Span) -> Result<Handle<Type>> {
        if let Some(result) = self.plain_type(ty, false, false, span) {
            return result;
        }
        if ty.is_array() && ty.is_opaque() {
            return Err(unsupported(
                "arrays of opaque types outside uniform declarations",
                span,
            ));
        }
        let base = self.lowered_base(ty.kind, span)?;
        let mut pending = Vec::new();
        let mut current = ty.clone();
        let mut handle = base;
        while let Some(shared) = current.shared_dimensions() {
            let key = (shared, base);
            if let Some(&found) = self.array_types.get(&key) {
                handle = found;
                break;
            }
            let outer = current.outer_size().ok_or_else(|| internal(span))?;
            current = current.element_type().ok_or_else(|| internal(span))?;
            pending.push((key, outer));
        }
        while let Some((key, outer)) = pending.pop() {
            let size = self.lowered_array_size(outer, span)?;
            self.layouter
                .update(self.module.to_ctx())
                .map_err(|_| internal(span))?;
            let stride = self.layouter[handle].to_stride();
            handle = self.insert_type(TypeInner::Array {
                base: handle,
                size,
                stride,
            });
            self.array_types.insert(key, handle);
        }
        Ok(handle)
    }

    pub(super) fn lowerable(&self, ty: &GlslType) -> bool {
        let sized = |size: GlslArraySize| match size {
            GlslArraySize::Specialized(size) => {
                self.lowered_override(size, Span::UNDEFINED).is_ok()
            }
            GlslArraySize::Sized(_) | GlslArraySize::Unsized => true,
        };
        let base = match ty.kind {
            TypeKind::Struct(id) => self.structs.contains_key(&id),
            TypeKind::Reference(block) => self
                .reference_space(block, Span::UNDEFINED)
                .is_ok_and(|(_, qualifiers)| self.references.contains_key(&(block, qualifiers))),
            TypeKind::Spirv(id) => self.spirv_types.contains_key(&id),
            TypeKind::Error | TypeKind::Void | TypeKind::String | TypeKind::Block(_) => false,
            TypeKind::Scalar(_)
            | TypeKind::Vector { .. }
            | TypeKind::Matrix { .. }
            | TypeKind::Opaque(_) => true,
            TypeKind::CooperativeMatrix(matrix) => {
                sized(matrix.columns) && sized(matrix.rows) && sized(matrix.scope)
            }
            TypeKind::LongVector { size, .. }
            | TypeKind::CooperativeVector { size, .. }
            | TypeKind::TensorView {
                dimensions: size, ..
            }
            | TypeKind::Tensor { rank: size, .. } => sized(size),
            TypeKind::TensorLayout {
                dimensions,
                clamp_mode,
            } => sized(dimensions) && sized(clamp_mode),
        };
        base && ty.dimensions().iter().all(|&size| sized(size))
    }

    fn lowered_override(&self, size: SpecializedSize, span: Span) -> Result<Handle<Override>> {
        match size {
            SpecializedSize::Constant { symbol, .. } => match self.globals.get(&symbol) {
                Some(&GlobalRef::Override(handle)) => Ok(handle),
                _ => Err(internal(span)),
            },
            SpecializedSize::Expression(node) => self
                .specialized_sizes
                .get(&node)
                .copied()
                .ok_or_else(|| internal(span)),
        }
    }

    fn lowered_array_size(&self, size: GlslArraySize, span: Span) -> Result<ArraySize> {
        match size {
            GlslArraySize::Sized(size) => NonZeroU32::new(size)
                .map(ArraySize::Constant)
                .ok_or_else(|| internal(span)),
            GlslArraySize::Unsized => Ok(ArraySize::Dynamic),
            GlslArraySize::Specialized(size) => {
                self.lowered_override(size, span).map(ArraySize::Pending)
            }
        }
    }

    fn lowered_cooperative_size(&self, size: GlslArraySize, span: Span) -> Result<CooperativeSize> {
        match size {
            GlslArraySize::Sized(size) => NonZeroU32::new(size)
                .map(CooperativeSize::Constant)
                .ok_or_else(|| internal(span)),
            GlslArraySize::Specialized(size) => self
                .lowered_override(size, span)
                .map(CooperativeSize::Pending),
            GlslArraySize::Unsized => Err(internal(span)),
        }
    }

    fn lowered_base(&mut self, kind: TypeKind, span: Span) -> Result<Handle<Type>> {
        let inner = match kind {
            TypeKind::Struct(id) => {
                return self.structs.get(&id).copied().ok_or_else(|| internal(span));
            }
            TypeKind::Reference(block) => return self.lowered_reference(block, span),
            TypeKind::Block(_) => return Err(unsupported("blocks used as values", span)),
            TypeKind::Spirv(id) => {
                return self
                    .spirv_types
                    .get(&id)
                    .copied()
                    .ok_or_else(|| internal(span));
            }
            TypeKind::Error | TypeKind::Void | TypeKind::String => return Err(internal(span)),
            TypeKind::Scalar(_)
            | TypeKind::Vector { .. }
            | TypeKind::Matrix { .. }
            | TypeKind::Opaque(_) => {
                Self::plain_inner(kind, false, false, span).ok_or_else(|| internal(span))??
            }
            TypeKind::CooperativeMatrix(matrix) => TypeInner::CooperativeMatrix {
                columns: self.lowered_cooperative_size(matrix.columns, span)?,
                rows: self.lowered_cooperative_size(matrix.rows, span)?,
                scalar: scalar(matrix.scalar),
                role: cooperative_role(matrix.usage),
                scope: self.lowered_cooperative_size(matrix.scope, span)?,
                class: cooperative_class(matrix.usage),
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
                size: self.lowered_cooperative_size(size, span)?,
                scalar: scalar(s),
                class: LongVectorClass::Plain,
            },
            TypeKind::CooperativeVector { scalar: s, size } => TypeInner::LongVector {
                size: self.lowered_cooperative_size(size, span)?,
                scalar: scalar(s),
                class: LongVectorClass::CooperativeNv,
            },
            TypeKind::TensorLayout {
                dimensions,
                clamp_mode,
            } => TypeInner::TensorLayout {
                dimensions: self.lowered_cooperative_size(dimensions, span)?,
                clamp_mode: match clamp_mode {
                    GlslArraySize::Sized(0) => None,
                    other => Some(self.lowered_cooperative_size(other, span)?),
                },
            },
            TypeKind::TensorView {
                dimensions,
                has_dimensions,
                permutation,
            } => {
                let count = dimensions.nominal().unwrap_or(1).min(5);
                TypeInner::TensorView {
                    dimensions: self.lowered_cooperative_size(dimensions, span)?,
                    has_dimensions,
                    permutation: tensor_permutation(&permutation, count),
                }
            }
            TypeKind::Tensor { scalar: s, rank } => TypeInner::Tensor {
                scalar: scalar(s),
                rank: self.lowered_cooperative_size(rank, span)?,
            },
        };
        Ok(self.insert_type(inner))
    }

    fn record_relayout(&mut self, laid: Handle<Type>, plain: Handle<Type>) {
        let mut pending = alloc::vec![(laid, plain, false)];
        while let Some((laid, plain, without_booleans)) = pending.pop() {
            if laid == plain || (!without_booleans && self.holds_booleans(plain)) {
                continue;
            }
            if self.relayout.insert(laid, plain).is_some() {
                continue;
            }
            let types = &self.module.types;
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
                ) => pending.extend(
                    laid_members
                        .iter()
                        .zip(plain_members)
                        .map(|(laid, plain)| (laid.ty, plain.ty, false))
                        .rev(),
                ),
                (&TypeInner::Array { base: laid, .. }, &TypeInner::Array { base: plain, .. }) => {
                    pending.push((laid, plain, true));
                }
                _ => {}
            }
        }
    }

    fn holds_booleans(&self, ty: Handle<Type>) -> bool {
        let mut ty = ty;
        loop {
            match self.module.types[ty].inner {
                TypeInner::Scalar(scalar) | TypeInner::Vector { scalar, .. } => {
                    return scalar.kind == ScalarKind::Bool;
                }
                TypeInner::Array { base, .. } => ty = base,
                _ => return false,
            }
        }
    }

    pub(super) fn folds_conversions_to(&self, target: Scalar) -> bool {
        let feature = match (target.kind, target.width) {
            (ScalarKind::Float, 2) => Feature::Float16Arithmetic,
            (_, 2) => Feature::Int16Arithmetic,
            (_, 1) => Feature::Int8Arithmetic,
            _ => return true,
        };
        self.analysis.extensions.contains_any(feature.extensions())
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
                    memory_decorations: MemoryDecorations::empty(),
                    relaxed_precision: false,
                },
                StructMember {
                    name: None,
                    ty: texel,
                    binding: None,
                    offset,
                    matrix_layout: None,
                    xfb_offset: None,
                    heap: None,
                    memory_decorations: MemoryDecorations::empty(),
                    relaxed_precision: false,
                },
            ],
            span,
        })
    }

    pub(super) fn footprint_result_type(&mut self, three: bool) -> Handle<Type> {
        let (size, offsets, span) = if three {
            (VectorSize::Tri, [0, 16, 32, 48, 56, 60], 64)
        } else {
            (VectorSize::Bi, [0, 8, 16, 24, 32, 36], 40)
        };
        let boolean = self.insert_type(TypeInner::Scalar(Scalar::BOOL));
        let vector = self.vector_type(size, Scalar::U32);
        let mask = self.vector_type(VectorSize::Bi, Scalar::U32);
        let scalar = self.insert_type(TypeInner::Scalar(Scalar::U32));
        let members = [boolean, vector, vector, mask, scalar, scalar]
            .into_iter()
            .zip(offsets)
            .map(|(ty, offset)| StructMember {
                name: None,
                ty,
                binding: None,
                offset,
                matrix_layout: None,
                xfb_offset: None,
                heap: None,
                memory_decorations: MemoryDecorations::empty(),
                relaxed_precision: false,
            })
            .collect();
        self.insert_type(TypeInner::Struct { members, span })
    }

    pub(super) fn vector_type(&mut self, size: VectorSize, scalar: Scalar) -> Handle<Type> {
        self.insert_type(TypeInner::Vector { size, scalar })
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

    pub(super) fn opaque_inner(
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
            OpaqueKind::AccelerationStructure => Ok(TypeInner::AccelerationStructure),
            OpaqueKind::RayQuery => Ok(TypeInner::RayQuery),
            OpaqueKind::HitObjectNv => Ok(TypeInner::HitObject {
                flavor: crate::HitObjectFlavor::Nv,
            }),
            OpaqueKind::HitObjectExt => Ok(TypeInner::HitObject {
                flavor: crate::HitObjectFlavor::Ext,
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

    fn struct_member(
        &mut self,
        member: &rglsl_sema::types::Member,
        ty: Handle<Type>,
        offset: &mut u32,
        alignment: &mut Alignment,
        span: Span,
    ) -> Result<StructMember> {
        self.layouter
            .update(self.module.to_ctx())
            .map_err(|_| internal(span))?;
        let layout = self.layouter[ty];
        *offset = layout.alignment.round_up(*offset);
        *alignment = layout.alignment.max(*alignment);
        let lowered = StructMember {
            name: Some(member.name.clone()),
            ty,
            binding: None,
            offset: *offset,
            matrix_layout: None,
            xfb_offset: None,
            heap: None,
            memory_decorations: MemoryDecorations::empty(),
            relaxed_precision: super::relaxed(&member.qualifiers),
        };
        *offset = offset.saturating_add(layout.size);
        Ok(lowered)
    }

    fn finish_struct(
        &mut self,
        id: StructId,
        name: Option<alloc::string::String>,
        members: Vec<StructMember>,
        span_bytes: u32,
        span: Span,
    ) -> Result<Handle<Type>> {
        let handle = self.module.types.insert(
            Type {
                name,
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
}

impl<'b, 'l, 'a> super::function::LowererCx<'b, 'l, 'a> {
    pub(super) async fn ir_type(self, ty: GlslType, span: Span) -> Result<Handle<Type>> {
        let ty = &ty;
        {
            let frame = self.clone().ir_type_with(ty.clone(), false, false, span);
            self.nest(frame).await
        }
    }

    pub(super) async fn ir_type_with(
        self,
        ty: GlslType,
        depth: bool,
        comparison: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        let ty = &ty;
        if ty.is_array() && ty.is_opaque() {
            return Err(unsupported(
                "arrays of opaque types outside uniform declarations",
                span,
            ));
        }
        let base = match ty.kind {
            TypeKind::Struct(id) => {
                let frame = self.clone().struct_type(id, span);
                self.nest(frame).await
            }?,
            kind => {
                let frame = self.clone().base_type(kind, depth, comparison, span);
                self.nest(frame).await
            }?,
        };
        let mut pending = Vec::new();
        let mut current = ty.clone();
        let mut handle = base;
        while let Some(shared) = current.shared_dimensions() {
            let key = (shared, base);
            if let Some(found) = self.with(|this| this.array_types.get(&key).copied())? {
                handle = found;
                break;
            }
            let outer = current.outer_size().ok_or_else(|| internal(span))?;
            current = current.element_type().ok_or_else(|| internal(span))?;
            pending.push((key, outer));
        }
        while let Some((key, outer)) = pending.pop() {
            handle = {
                let frame = self.clone().wrap_arrays(handle, Vec::from([outer]), span);
                self.nest(frame).await
            }?;
            self.with(|this| this.array_types.insert(key, handle))?;
        }
        Ok(handle)
    }

    pub(super) async fn wrap_arrays(
        self,
        base: Handle<Type>,
        dimensions: Vec<GlslArraySize>,
        span: Span,
    ) -> Result<Handle<Type>> {
        let dimensions = dimensions.as_slice();
        let mut ty = base;
        for dimension in dimensions.iter().rev() {
            let size = {
                let frame = self.clone().array_size(*dimension, span);
                self.nest(frame).await
            }?;
            self.with(|lowerer| lowerer.layouter.update(lowerer.module.to_ctx()))?
                .map_err(|_| internal(span))?;
            let stride = self.with(|this| this.layouter[ty].to_stride())?;
            ty = self.with(|this| {
                this.insert_type(TypeInner::Array {
                    base: ty,
                    size,
                    stride,
                })
            })?;
        }
        Ok(ty)
    }

    pub(super) async fn array_size(self, size: GlslArraySize, span: Span) -> Result<ArraySize> {
        match size {
            GlslArraySize::Sized(size) => NonZeroU32::new(size)
                .map(ArraySize::Constant)
                .ok_or_else(|| internal(span)),
            GlslArraySize::Unsized => Ok(ArraySize::Dynamic),
            GlslArraySize::Specialized(size) => {
                let frame = self.clone().specialized_size(size, span);
                self.nest(frame).await
            }
            .map(ArraySize::Pending),
        }
    }

    pub(super) async fn cooperative_size(
        self,
        size: GlslArraySize,
        span: Span,
    ) -> Result<CooperativeSize> {
        match size {
            GlslArraySize::Sized(size) => NonZeroU32::new(size)
                .map(CooperativeSize::Constant)
                .ok_or_else(|| internal(span)),
            GlslArraySize::Specialized(size) => {
                let frame = self.clone().specialized_size(size, span);
                self.nest(frame).await
            }
            .map(CooperativeSize::Pending),
            GlslArraySize::Unsized => Err(internal(span)),
        }
    }

    async fn base_type(
        self,
        kind: TypeKind,
        depth: bool,
        comparison: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        let inner = match kind {
            TypeKind::Error | TypeKind::Void | TypeKind::String => return Err(internal(span)),
            TypeKind::Scalar(_)
            | TypeKind::Vector { .. }
            | TypeKind::Matrix { .. }
            | TypeKind::Opaque(_) => Lowerer::plain_inner(kind, depth, comparison, span)
                .ok_or_else(|| internal(span))??,
            TypeKind::Struct(id) => {
                return {
                    let frame = self.clone().struct_type(id, span);
                    self.nest(frame).await
                };
            }
            TypeKind::Block(_) => {
                return Err(unsupported("blocks used as values", span));
            }
            TypeKind::Reference(block) => {
                return {
                    let frame = self.clone().reference_type(block, span);
                    self.nest(frame).await
                };
            }
            TypeKind::CooperativeMatrix(matrix) => TypeInner::CooperativeMatrix {
                columns: {
                    let frame = self.clone().cooperative_size(matrix.columns, span);
                    self.nest(frame).await
                }?,
                rows: {
                    let frame = self.clone().cooperative_size(matrix.rows, span);
                    self.nest(frame).await
                }?,
                scalar: scalar(matrix.scalar),
                role: cooperative_role(matrix.usage),
                scope: {
                    let frame = self.clone().cooperative_size(matrix.scope, span);
                    self.nest(frame).await
                }?,
                class: cooperative_class(matrix.usage),
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
                size: {
                    let frame = self.clone().cooperative_size(size, span);
                    self.nest(frame).await
                }?,
                scalar: scalar(s),
                class: LongVectorClass::Plain,
            },
            TypeKind::CooperativeVector { scalar: s, size } => TypeInner::LongVector {
                size: {
                    let frame = self.clone().cooperative_size(size, span);
                    self.nest(frame).await
                }?,
                scalar: scalar(s),
                class: LongVectorClass::CooperativeNv,
            },
            TypeKind::TensorLayout {
                dimensions,
                clamp_mode,
            } => TypeInner::TensorLayout {
                dimensions: {
                    let frame = self.clone().cooperative_size(dimensions, span);
                    self.nest(frame).await
                }?,
                clamp_mode: match clamp_mode {
                    GlslArraySize::Sized(0) => None,
                    other => Some({
                        let frame = self.clone().cooperative_size(other, span);
                        self.nest(frame).await
                    }?),
                },
            },
            TypeKind::TensorView {
                dimensions,
                has_dimensions,
                permutation,
            } => {
                let count = dimensions.nominal().unwrap_or(1).min(5);
                TypeInner::TensorView {
                    dimensions: {
                        let frame = self.clone().cooperative_size(dimensions, span);
                        self.nest(frame).await
                    }?,
                    has_dimensions,
                    permutation: tensor_permutation(&permutation, count),
                }
            }
            TypeKind::Tensor { scalar: s, rank } => TypeInner::Tensor {
                scalar: scalar(s),
                rank: {
                    let frame = self.clone().cooperative_size(rank, span);
                    self.nest(frame).await
                }?,
            },
            TypeKind::Spirv(id) => {
                let frame = self.clone().spirv_type(id, span);
                self.nest(frame).await
            }?,
        };
        self.with(|this| {
            let handle = this.insert_type(inner);
            if let TypeKind::Spirv(id) = kind {
                this.spirv_types.insert(id, handle);
            }
            handle
        })
    }

    pub(super) async fn struct_type(self, id: StructId, span: Span) -> Result<Handle<Type>> {
        if let Some(handle) = self.with(|this| this.structs.get(&id).copied())? {
            return Ok(handle);
        }
        let structure = self.with(|this| {
            this.analysis
                .types
                .structure(id)
                .ok_or_else(|| internal(span))
        })??;
        let mut members = Vec::with_capacity(structure.members.len());
        let mut offset = 0;
        let mut alignment = Alignment::ONE;
        for member in &structure.members {
            let ty = {
                let frame = self.clone().ir_type(member.ty.clone(), span);
                self.nest(frame).await
            }?;
            let member = self
                .with(|this| this.struct_member(member, ty, &mut offset, &mut alignment, span))??;
            members.push(member);
        }
        self.with(|this| {
            this.finish_struct(
                id,
                structure.name.clone(),
                members,
                alignment.round_up(offset),
                span,
            )
        })?
    }

    pub(super) async fn block_struct(
        self,
        id: BlockId,
        packing: Packing,
        row_major: bool,
        span: Span,
    ) -> Result<Handle<Type>> {
        let analysis = self.with(|this| this.analysis)?;
        let block = analysis.types.block(id).ok_or_else(|| internal(span))?;
        let mut members = Vec::with_capacity(block.members.len());
        let mut placer = MemberPlacer::new(&block.qualifiers, packing)
            .with_hlsl_offsets(self.with(|this| this.options.hlsl_offsets)?);
        let last = block.members.len().saturating_sub(1);
        let is_plain_ubo = block.storage == BlockStorage::Uniform
            && block.qualifiers.storage == rglsl_sema::scope::Storage::Uniform
            && !block
                .qualifiers
                .has_layout(rglsl_sema::LayoutId::PushConstant)
            && !rglsl_sema::analyze::is_shader_record(&block.qualifiers);
        for (position, member) in block.members.iter().enumerate() {
            let index = u32::try_from(position).map_err(|_| internal(span))?;
            let uniform_runtime = is_plain_ubo
                && analysis
                    .extensions
                    .contains(Extension::ExtUniformBufferUnsizedArray)
                && self.with(|this| this.variably_indexed_members.contains(&(id, index)))?;
            let runtime =
                position == last && (block.storage == BlockStorage::Buffer || uniform_runtime);
            let mut member_ty = member.ty.clone();
            if !runtime && member_ty.outer_size() == Some(GlslArraySize::Unsized) {
                let size =
                    self.with(|this| this.member_sizes.get(&(id, index)).copied().unwrap_or(1))?;
                member_ty.set_outer_size(GlslArraySize::Sized(size));
            }
            let lowered = match member_ty.kind {
                TypeKind::Scalar(GlslScalar::Bool) => {
                    Some(GlslType::scalar(GlslScalar::Uint).with_dimensions(member_ty.dimensions()))
                }
                TypeKind::Vector {
                    scalar: GlslScalar::Bool,
                    size,
                } => Some(
                    GlslType::vector(GlslScalar::Uint, size)
                        .with_dimensions(member_ty.dimensions()),
                ),
                _ => None,
            };
            let ty = match lowered {
                Some(lowered) => {
                    self.with(|this| this.block_bools.insert((id, index)))?;
                    {
                        let frame = self.clone().ir_type(lowered.clone(), span);
                        self.nest(frame).await
                    }?
                }
                None => {
                    if member_ty.contains_opaque(&analysis.types) {
                        return Err(unsupported("opaque types in blocks", span));
                    }
                    {
                        let frame = self.clone().ir_type(member_ty.clone(), span);
                        self.nest(frame).await
                    }?
                }
            };
            let member_row_major = member_row_major(&member.qualifiers, row_major);
            let layout =
                self.with(|this| this.type_layout(&member_ty, packing, member_row_major, span))??;
            let offset = placer
                .place(&member.qualifiers, &member_ty, &layout, member_row_major)
                .ok_or_else(|| invalid_member(span))?;
            let ty = self.with(|this| this.apply_layout(ty, &layout, span))??;
            let memory_decorations = if block.storage == BlockStorage::Buffer {
                member_memory(&block.qualifiers, &member.qualifiers)
            } else {
                MemoryDecorations::empty()
            };
            members.push(StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: None,
                offset,
                matrix_layout: matrix_layout(&layout),
                xfb_offset: None,
                heap: None,
                memory_decorations,
                relaxed_precision: super::relaxed(&member.qualifiers),
            });
        }
        let span_bytes = Alignment::new(placer.alignment()).map_or(placer.extent(), |alignment| {
            alignment.round_up(placer.extent())
        });
        let handle = self.with(|this| {
            this.module.types.insert(
                Type {
                    name: Some(block.name.clone()),
                    inner: TypeInner::Struct {
                        members,
                        span: span_bytes,
                    },
                },
                span,
            )
        })?;
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

const fn cooperative_role(usage: CooperativeUse) -> CooperativeRole {
    match usage {
        CooperativeUse::A => CooperativeRole::A,
        CooperativeUse::B => CooperativeRole::B,
        CooperativeUse::Accumulator | CooperativeUse::Nv => CooperativeRole::C,
    }
}

const fn cooperative_class(usage: CooperativeUse) -> CooperativeMatrixClass {
    match usage {
        CooperativeUse::Nv => CooperativeMatrixClass::Nv,
        CooperativeUse::A | CooperativeUse::B | CooperativeUse::Accumulator => {
            CooperativeMatrixClass::Khr
        }
    }
}

fn tensor_permutation(permutation: &[u8], count: u32) -> Vec<u32> {
    permutation
        .iter()
        .take(usize::try_from(count).unwrap_or(5))
        .map(|&index| u32::from(index))
        .collect()
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
