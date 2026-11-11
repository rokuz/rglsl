use alloc::{string::String, vec::Vec};

use rglsl_ast::ast::{Expression as AstExpression, SingleTypeQualifier, Spanned, TypeQualifier};
use rglsl_sema::layout::{block_layout, member_row_major};
use rglsl_sema::scope::{Qualifiers, Storage};
use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockId, BlockStorage, Member, OpaqueKind, Packing, StructId,
    Type as GlslType, TypeKind,
};
use rglsl_sema::SymbolId;

use super::globals::{image_access, image_format, storage_access};
use super::types::{image_dimension, matrix_layout};
use super::{internal, unsupported, GlobalRef, Lowerer, Result};
use crate::proc::Alignment;
use crate::{
    AddressSpace, DescriptorHeap, Expression, GlobalVariable, Handle, HeapMember, ImageClass,
    Literal, MemoryDecorations, Span, StructMember, Type, TypeInner,
};

pub(super) const HEAP_EXTENSION: &str = "GL_EXT_descriptor_heap";

#[derive(Clone, Copy, Debug)]
pub(super) enum HeapOffset<'a> {
    None,
    Fixed(Handle<Expression>),
    Runtime(&'a AstExpression),
}

fn heap_offset_expression(qualifier: &Spanned<TypeQualifier>) -> Option<&AstExpression> {
    qualifier
        .qualifiers
        .iter()
        .filter_map(|single| match single.node {
            SingleTypeQualifier::Layout(ref layout) => Some(layout),
            _ => None,
        })
        .flat_map(|layout| layout.ids.iter())
        .filter(|id| id.name.node == "heap_offset")
        .filter_map(|id| id.value.as_ref())
        .next_back()
}

fn explicit_packing(qualifiers: &Qualifiers) -> Option<Packing> {
    qualifiers
        .layout
        .iter()
        .rev()
        .find_map(|entry| match entry.name.as_str() {
            "std140" => Some(Packing::Std140),
            "std430" => Some(Packing::Std430),
            "scalar" => Some(Packing::Scalar),
            _ => None,
        })
}

fn layout_u32(qualifiers: &Qualifiers, name: &str, at: Span) -> Result<Option<u32>> {
    match qualifiers.layout_entry(name).and_then(|entry| entry.value) {
        Some(value) => u32::try_from(value).map(Some).map_err(|_| internal(at)),
        None => Ok(None),
    }
}

impl<'a> Lowerer<'a> {
    fn contains_descriptor(&self, ty: &GlslType) -> bool {
        let mut pending = alloc::vec![ty];
        while let Some(ty) = pending.pop() {
            match ty.kind {
                TypeKind::Opaque(_) | TypeKind::Tensor { .. } => return true,
                TypeKind::Block(id) => {
                    if self
                        .analysis
                        .types
                        .block(id)
                        .is_some_and(|block| block.buffer_type)
                    {
                        return true;
                    }
                }
                TypeKind::Struct(id) => {
                    if let Some(structure) = self.analysis.types.structure(id) {
                        pending.extend(structure.members.iter().map(|member| &member.ty));
                    }
                }
                _ => {}
            }
        }
        false
    }

    fn heap_members(
        &mut self,
        block: Option<&Qualifiers>,
        members: &[Member],
        packing: Option<Packing>,
        row_major: bool,
        at: Span,
    ) -> Result<Vec<StructMember>> {
        super::function::lowerer_on_heap!(self, |cx| cx
            .heap_members(block, members, packing, row_major, at))
    }

    pub(super) fn is_heap_view(&self, qualifiers: &Qualifiers) -> bool {
        self.analysis.extensions.contains(HEAP_EXTENSION)
            && !qualifiers.has_layout("set")
            && !qualifiers.has_layout("binding")
            && (qualifiers.has_layout("descriptor_heap")
                || matches!(
                    qualifiers.storage,
                    Storage::ResourceHeap | Storage::SamplerHeap
                ))
    }

    pub(super) fn heap_offset(
        &mut self,
        qualifier: Option<&'a Spanned<TypeQualifier>>,
        at: Span,
    ) -> Result<HeapOffset<'a>> {
        let Some(expression) = qualifier.and_then(heap_offset_expression) else {
            return Ok(HeapOffset::None);
        };
        let info = self
            .analysis
            .expression(expression.id)
            .ok_or_else(|| internal(at))?;
        if !info.is_constant {
            return Ok(HeapOffset::Runtime(expression));
        }
        if !info.is_specialization {
            let value = info
                .value
                .as_ref()
                .and_then(|value| value.scalar_i64())
                .ok_or_else(|| internal(at))?;
            if value == 0 {
                return Ok(HeapOffset::None);
            }
            let value = u32::try_from(value).map_err(|_| internal(at))?;
            let literal = self
                .module
                .global_expressions
                .append(Expression::Literal(Literal::U32(value)), at);
            return Ok(HeapOffset::Fixed(literal));
        }
        let handle = self.specialization(expression, None, at)?;
        let value = self
            .module
            .global_expressions
            .append(Expression::Override(handle), at);
        let scalar = match self.module.types[self.module.overrides[handle].ty].inner {
            TypeInner::Scalar(scalar) => scalar,
            _ => return Err(internal(at)),
        };
        if scalar.width >= 4 {
            return Ok(HeapOffset::Fixed(value));
        }
        let converted = self.module.global_expressions.append(
            Expression::As {
                expr: value,
                kind: scalar.kind,
                convert: Some(4),
            },
            at,
        );
        Ok(HeapOffset::Fixed(converted))
    }

    fn heap_view(
        &mut self,
        symbol: SymbolId,
        name: String,
        heap: DescriptorHeap,
        ty: Handle<Type>,
        offset: HeapOffset<'a>,
        at: Span,
    ) {
        let heap_offset = match offset {
            HeapOffset::Fixed(expression) => Some(expression),
            HeapOffset::None | HeapOffset::Runtime(_) => None,
        };
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::DescriptorHeap(heap),
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
            },
            at,
        );
        if let HeapOffset::Runtime(expression) = offset {
            self.heap_runtime_offsets.insert(handle, expression);
        }
        self.globals.insert(symbol, GlobalRef::Variable(handle));
    }

    fn heap_image(
        &mut self,
        ty: &GlslType,
        qualifiers: &Qualifiers,
        at: Span,
    ) -> Result<TypeInner> {
        let opaque = match ty.kind {
            TypeKind::Opaque(opaque) => opaque,
            TypeKind::Tensor { scalar, rank } => {
                return Ok(TypeInner::Tensor {
                    scalar: super::types::scalar(scalar),
                    rank,
                })
            }
            _ => return Err(internal(at)),
        };
        match opaque.kind {
            OpaqueKind::Image => {
                let format = qualifiers
                    .layout
                    .iter()
                    .rev()
                    .find_map(|entry| image_format(&entry.name))
                    .unwrap_or_else(|| super::globals::unknown_format(opaque.sampled));
                Ok(TypeInner::Image {
                    dim: image_dimension(opaque),
                    arrayed: opaque.arrayed,
                    class: ImageClass::Storage {
                        format,
                        access: image_access(qualifiers),
                        multi: opaque.multisample,
                    },
                })
            }
            OpaqueKind::CombinedSampler
            | OpaqueKind::SubpassInput
            | OpaqueKind::TileImage
            | OpaqueKind::RayQuery
            | OpaqueKind::HitObjectNv
            | OpaqueKind::HitObjectExt => Err(internal(at)),
            OpaqueKind::Sampler | OpaqueKind::Texture | OpaqueKind::AccelerationStructure => {
                self.opaque_inner(opaque, false, false, at)
            }
        }
    }

    fn descriptor_arrays(
        &mut self,
        base: Handle<Type>,
        dimensions: &[GlslArraySize],
        stride: u32,
        at: Span,
    ) -> Result<Handle<Type>> {
        let mut ty = base;
        let last = dimensions.len().saturating_sub(1);
        for (position, dimension) in dimensions.iter().enumerate().rev() {
            let size = self.array_size(*dimension, at)?;
            let stride = if position == last { stride } else { 0 };
            ty = self.insert_type(TypeInner::Array {
                base: ty,
                size,
                stride,
            });
        }
        Ok(ty)
    }

    pub(super) fn buffer_descriptor(&mut self, id: BlockId, at: Span) -> Result<Handle<Type>> {
        let block = self.analysis.types.block(id).ok_or_else(|| internal(at))?;
        let buffer = block.storage == BlockStorage::Buffer;
        let (packing, row_major) = self.block_packing(&block.qualifiers, buffer, false);
        let base = self.block_struct(id, packing, row_major, at)?;
        let space = if buffer {
            AddressSpace::Storage {
                access: storage_access(&block.qualifiers),
            }
        } else {
            AddressSpace::Uniform
        };
        Ok(self.insert_type(TypeInner::BufferDescriptor { base, space }))
    }

    fn packed_offsets(
        &self,
        block: Option<&Qualifiers>,
        members: &[Member],
        packing: Packing,
        row_major: bool,
        at: Span,
    ) -> Result<Vec<u32>> {
        let unqualified = Qualifiers::default();
        let lengths = self.lowered_lengths();
        let layout = block_layout(
            &self.analysis.types,
            block.unwrap_or(&unqualified),
            members,
            packing,
            row_major,
            &lengths,
        )
        .ok_or_else(|| internal(at))?;
        Ok(layout.members.iter().map(|member| member.offset).collect())
    }

    fn heap_data_type(&mut self, ty: &GlslType, at: Span) -> Result<Handle<Type>> {
        if ty.contains_scalar(&self.analysis.types, rglsl_sema::types::Scalar::Bool) {
            return Err(unsupported("booleans in descriptor heaps", at));
        }
        self.ir_type(ty, at)
    }

    fn data_heap_struct(
        &mut self,
        name: &str,
        block: &Qualifiers,
        members: &[Member],
        packing: Option<Packing>,
        row_major: bool,
        at: Span,
    ) -> Result<Handle<Type>> {
        let mut laid = Vec::with_capacity(members.len());
        for member in members {
            layout_u32(&member.qualifiers, "offset", at)?;
            let member_row_major = member_row_major(&member.qualifiers, row_major);
            let ty = self.heap_data_type(&member.ty, at)?;
            laid.push(self.laid_out(&member.ty, ty, Packing::Scalar, member_row_major, at)?);
        }
        let offsets = self.packed_offsets(
            Some(block),
            members,
            packing.unwrap_or(Packing::Scalar),
            row_major,
            at,
        )?;
        let mut lowered = Vec::with_capacity(members.len());
        let mut end = 0_u32;
        let mut alignment = Alignment::ONE;
        for ((member, (ty, layout)), start) in members.iter().zip(laid).zip(offsets) {
            end = end.max(start.saturating_add(layout.size));
            alignment = Alignment::new(layout.alignment).map_or(alignment, |member_alignment| {
                member_alignment.max(alignment)
            });
            lowered.push(StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: None,
                offset: start,
                matrix_layout: matrix_layout(&layout),
                xfb_offset: None,
                heap: None,
                memory_decorations: MemoryDecorations::empty(),
                relaxed_precision: false,
            });
        }
        let span = alignment.round_up(end);
        Ok(self.module.types.insert(
            Type {
                name: Some(String::from(name)),
                inner: TypeInner::Struct {
                    members: lowered,
                    span,
                },
            },
            at,
        ))
    }

    pub(super) fn heap_resource(
        &mut self,
        symbol: SymbolId,
        name: String,
        qualifier: Option<&'a Spanned<TypeQualifier>>,
        at: Span,
    ) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let qualifiers = &variable.qualifiers;
        let ty = &variable.ty;
        let heap = if matches!(ty.kind, TypeKind::Opaque(opaque) if opaque.kind == OpaqueKind::Sampler)
        {
            DescriptorHeap::Sampler
        } else {
            DescriptorHeap::Resource
        };
        let element = GlslType::new(ty.kind);
        let inner = self.heap_image(&element, qualifiers, at)?;
        let base = self.insert_type(inner);
        let stride = layout_u32(qualifiers, "descriptor_stride", at)?.unwrap_or(0);
        let dimensions = ty.array.clone();
        let view = self.descriptor_arrays(base, &dimensions, stride, at)?;
        let offset = self.heap_offset(qualifier, at)?;
        self.heap_view(symbol, name, heap, view, offset, at);
        Ok(())
    }

    pub(super) fn heap_buffer_array(
        &mut self,
        symbol: SymbolId,
        name: String,
        id: BlockId,
        qualifier: Option<&'a Spanned<TypeQualifier>>,
        at: Span,
    ) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let dimensions = variable.ty.array.clone();
        let stride = layout_u32(&variable.qualifiers, "descriptor_stride", at)?.unwrap_or(0);
        let base = self.buffer_descriptor(id, at)?;
        let view = self.descriptor_arrays(base, &dimensions, stride, at)?;
        let offset = self.heap_offset(qualifier, at)?;
        self.heap_view(symbol, name, DescriptorHeap::Resource, view, offset, at);
        Ok(())
    }

    pub(super) fn structured_heap(
        &mut self,
        symbol: SymbolId,
        id: BlockId,
        name: String,
        qualifier: Option<&'a Spanned<TypeQualifier>>,
        at: Span,
    ) -> Result<()> {
        let analysis = self.analysis;
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let heap = if block.storage == BlockStorage::SamplerHeap {
            DescriptorHeap::Sampler
        } else {
            DescriptorHeap::Resource
        };
        let row_major = block.qualifiers.has_layout("row_major");
        let packing = explicit_packing(&block.qualifiers);
        let descriptors = block
            .members
            .iter()
            .any(|member| self.contains_descriptor(&member.ty));
        let ty = if descriptors {
            let members = self.heap_members(
                Some(&block.qualifiers),
                &block.members,
                packing,
                row_major,
                at,
            )?;
            self.module.types.insert(
                Type {
                    name: Some(block.name.clone()),
                    inner: TypeInner::Struct { members, span: 0 },
                },
                at,
            )
        } else {
            self.data_heap_struct(
                &block.name,
                &block.qualifiers,
                &block.members,
                packing,
                row_major,
                at,
            )?
        };
        let offset = self.heap_offset(qualifier, at)?;
        self.heap_view(symbol, name, heap, ty, offset, at);
        Ok(())
    }

    pub(super) fn heap_offset_value(
        &self,
        global: Handle<GlobalVariable>,
    ) -> Option<&'a AstExpression> {
        self.heap_runtime_offsets.get(&global).copied()
    }
}

#[allow(clippy::await_holding_refcell_ref)]
impl<'b, 'a> super::function::LowererCx<'b, 'a> {
    async fn heap_leaf(
        self,
        ty: GlslType,
        qualifiers: &'b Qualifiers,
        at: Span,
    ) -> Result<Handle<Type>> {
        let ty = &ty;
        let mut this = self.lowerer();
        match ty.kind {
            TypeKind::Opaque(_) | TypeKind::Tensor { .. } => {
                let inner = this.heap_image(ty, qualifiers, at)?;
                Ok(this.insert_type(inner))
            }
            TypeKind::Block(id) => this.buffer_descriptor(id, at),
            TypeKind::Struct(id) => {
                let frame = self.clone().heap_struct(id, at);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
            _ => Err(internal(at)),
        }
    }

    async fn heap_struct(self, id: StructId, at: Span) -> Result<Handle<Type>> {
        let mut this = self.lowerer();
        if let Some(&handle) = this.heap_structs.get(&id) {
            return Ok(handle);
        }
        let analysis = this.analysis;
        let structure = analysis.types.structure(id).ok_or_else(|| internal(at))?;
        let members = {
            let frame = self
                .clone()
                .heap_members(None, &structure.members, None, false, at);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        let handle = this.module.types.insert(
            Type {
                name: structure.name.clone(),
                inner: TypeInner::Struct { members, span: 0 },
            },
            at,
        );
        this.heap_structs.insert(id, handle);
        Ok(handle)
    }

    async fn heap_members(
        self,
        block: Option<&'b Qualifiers>,
        members: &'b [Member],
        packing: Option<Packing>,
        row_major: bool,
        at: Span,
    ) -> Result<Vec<StructMember>> {
        let mut this = self.lowerer();
        let offsets = match packing {
            Some(packing) => Some(this.packed_offsets(block, members, packing, row_major, at)?),
            None => None,
        };
        let mut lowered = Vec::with_capacity(members.len());
        for (index, member) in members.iter().enumerate() {
            let qualifiers = &member.qualifiers;
            let member_row_major = member_row_major(qualifiers, row_major);
            let explicit = layout_u32(qualifiers, "offset", at)?;
            let offset = match offsets {
                Some(ref offsets) => Some(*offsets.get(index).ok_or_else(|| internal(at))?),
                None => explicit,
            };
            let size = layout_u32(qualifiers, "descriptor_size", at)?;
            let (ty, matrix_layout) = if this.contains_descriptor(&member.ty) {
                let element = GlslType::new(member.ty.kind);
                let leaf = {
                    let frame = self.clone().heap_leaf(element.clone(), qualifiers, at);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let stride = if member.ty.is_array() {
                    size.unwrap_or(0)
                } else {
                    0
                };
                (
                    this.descriptor_arrays(leaf, &member.ty.array, stride, at)?,
                    None,
                )
            } else {
                let ty = this.heap_data_type(&member.ty, at)?;
                let (ty, layout) =
                    this.laid_out(&member.ty, ty, Packing::Scalar, member_row_major, at)?;
                (ty, matrix_layout(&layout))
            };
            lowered.push(StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: None,
                offset: offset.unwrap_or(0),
                matrix_layout,
                xfb_offset: None,
                heap: Some(HeapMember { offset, size }),
                memory_decorations: MemoryDecorations::empty(),
                relaxed_precision: false,
            });
        }
        Ok(lowered)
    }
}
