use alloc::{string::String, vec::Vec};

use rglsl_ast::ast::{Expression as AstExpression, SingleTypeQualifier, Spanned, TypeQualifier};
use rglsl_sema::layout::{layout_of, member_row_major};
use rglsl_sema::scope::{Qualifiers, Storage};
use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockId, BlockStorage, Member, OpaqueKind, Packing, StructId,
    Type as GlslType, TypeKind,
};
use rglsl_sema::SymbolId;

use super::globals::{image_access, image_format, storage_access};
use super::types::{image_dimension, sampled_kind};
use super::{internal, unsupported, GlobalRef, Lowerer, Result};
use crate::proc::Alignment;
use crate::{
    AddressSpace, DescriptorHeap, Expression, GlobalVariable, Handle, HeapMember, ImageClass,
    Literal, MatrixLayout, MemoryDecorations, Span, StructMember, Type, TypeInner,
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

    fn contains_descriptor(&self, ty: &GlslType) -> bool {
        match ty.kind {
            TypeKind::Opaque(_) => true,
            TypeKind::Block(id) => self
                .analysis
                .types
                .block(id)
                .is_some_and(|block| block.buffer_type),
            TypeKind::Struct(id) => self.analysis.types.structure(id).is_some_and(|structure| {
                structure
                    .members
                    .iter()
                    .any(|member| self.contains_descriptor(&member.ty))
            }),
            _ => false,
        }
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
        let TypeKind::Opaque(opaque) = ty.kind else {
            return Err(internal(at));
        };
        match opaque.kind {
            OpaqueKind::Image => {
                let format = qualifiers
                    .layout
                    .iter()
                    .rev()
                    .find_map(|entry| image_format(&entry.name))
                    .ok_or_else(|| unsupported("storage images without a format qualifier", at))?;
                let _ = sampled_kind(opaque.sampled);
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
            OpaqueKind::CombinedSampler | OpaqueKind::SubpassInput | OpaqueKind::RayQuery => {
                Err(internal(at))
            }
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

    fn heap_leaf(
        &mut self,
        ty: &GlslType,
        qualifiers: &Qualifiers,
        at: Span,
    ) -> Result<Handle<Type>> {
        match ty.kind {
            TypeKind::Opaque(_) => {
                let inner = self.heap_image(ty, qualifiers, at)?;
                Ok(self.insert_type(inner))
            }
            TypeKind::Block(id) => self.buffer_descriptor(id, at),
            TypeKind::Struct(id) => self.heap_struct(id, at),
            _ => Err(internal(at)),
        }
    }

    fn heap_struct(&mut self, id: StructId, at: Span) -> Result<Handle<Type>> {
        if let Some(&handle) = self.heap_structs.get(&id) {
            return Ok(handle);
        }
        let analysis = self.analysis;
        let structure = analysis.types.structure(id).ok_or_else(|| internal(at))?;
        let members = self.heap_members(&structure.members, None, false, at)?;
        let handle = self.module.types.insert(
            Type {
                name: structure.name.clone(),
                inner: TypeInner::Struct { members, span: 0 },
            },
            at,
        );
        self.heap_structs.insert(id, handle);
        Ok(handle)
    }

    fn heap_members(
        &mut self,
        members: &[Member],
        packing: Option<Packing>,
        row_major: bool,
        at: Span,
    ) -> Result<Vec<StructMember>> {
        let analysis = self.analysis;
        let mut lowered = Vec::with_capacity(members.len());
        let mut packed_offset = 0_u32;
        for member in members {
            let qualifiers = &member.qualifiers;
            let member_row_major = member_row_major(qualifiers, row_major);
            let explicit = layout_u32(qualifiers, "offset", at)?;
            let offset = match packing {
                Some(packing) => {
                    let layout = layout_of(&analysis.types, &member.ty, packing, member_row_major)
                        .ok_or_else(|| internal(at))?;
                    let start = explicit.unwrap_or(packed_offset);
                    let start = Alignment::new(layout.alignment)
                        .map_or(start, |alignment| alignment.round_up(start));
                    packed_offset = start.saturating_add(layout.size);
                    Some(start)
                }
                None => explicit,
            };
            let size = layout_u32(qualifiers, "descriptor_size", at)?;
            let (ty, matrix_layout) = if self.contains_descriptor(&member.ty) {
                let element = GlslType::new(member.ty.kind);
                let leaf = self.heap_leaf(&element, qualifiers, at)?;
                let stride = if member.ty.is_array() {
                    size.unwrap_or(0)
                } else {
                    0
                };
                (
                    self.descriptor_arrays(leaf, &member.ty.array, stride, at)?,
                    None,
                )
            } else {
                let ty = self.heap_data_type(&member.ty, at)?;
                let info = self.heap_layout(ty, member_row_major, at)?;
                (info.0, info.1)
            };
            lowered.push(StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: None,
                offset: offset.unwrap_or(0),
                matrix_layout,
                xfb_offset: None,
                heap: Some(HeapMember { offset, size }),
            });
        }
        Ok(lowered)
    }

    fn heap_data_type(&mut self, ty: &GlslType, at: Span) -> Result<Handle<Type>> {
        if ty.contains_scalar(&self.analysis.types, rglsl_sema::types::Scalar::Bool) {
            return Err(unsupported("booleans in descriptor heaps", at));
        }
        self.ir_type(ty, at)
    }

    fn heap_layout(
        &mut self,
        ty: Handle<Type>,
        row_major: bool,
        at: Span,
    ) -> Result<(Handle<Type>, Option<MatrixLayout>)> {
        let info = self.layout(ty, Packing::Scalar, row_major, at)?;
        Ok((info.ty, info.matrix_layout))
    }

    fn data_heap_struct(
        &mut self,
        name: &str,
        members: &[Member],
        packing: Option<Packing>,
        row_major: bool,
        at: Span,
    ) -> Result<Handle<Type>> {
        let analysis = self.analysis;
        let mut lowered = Vec::with_capacity(members.len());
        let mut offset = 0_u32;
        let mut end = 0_u32;
        let mut alignment = Alignment::ONE;
        for member in members {
            let qualifiers = &member.qualifiers;
            let member_row_major = member_row_major(qualifiers, row_major);
            let ty = self.heap_data_type(&member.ty, at)?;
            let info = self.layout(ty, Packing::Scalar, member_row_major, at)?;
            let explicit = layout_u32(qualifiers, "offset", at)?;
            let start = match packing {
                Some(packing) => {
                    let layout = layout_of(&analysis.types, &member.ty, packing, member_row_major)
                        .ok_or_else(|| internal(at))?;
                    let start = explicit.unwrap_or(offset);
                    let start = Alignment::new(layout.alignment)
                        .map_or(start, |alignment| alignment.round_up(start));
                    offset = start.saturating_add(layout.size);
                    start
                }
                None => {
                    let start = explicit.unwrap_or_else(|| info.align.round_up(offset));
                    offset = start.saturating_add(info.span);
                    start
                }
            };
            end = end.max(start.saturating_add(info.span));
            alignment = info.align.max(alignment);
            lowered.push(StructMember {
                name: Some(member.name.clone()),
                ty: info.ty,
                binding: None,
                offset: start,
                matrix_layout: info.matrix_layout,
                xfb_offset: None,
                heap: None,
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
        let TypeKind::Opaque(opaque) = ty.kind else {
            return Err(internal(at));
        };
        let heap = if opaque.kind == OpaqueKind::Sampler {
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
            let members = self.heap_members(&block.members, packing, row_major, at)?;
            self.module.types.insert(
                Type {
                    name: Some(block.name.clone()),
                    inner: TypeInner::Struct { members, span: 0 },
                },
                at,
            )
        } else {
            self.data_heap_struct(&block.name, &block.members, packing, row_major, at)?
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
