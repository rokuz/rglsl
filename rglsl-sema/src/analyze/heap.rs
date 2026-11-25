use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::Span;
use rglsl_ast::ast::{BlockStructure, Spanned, StructDeclaration};
use rglsl_types::extension::Extension;

use super::Analyzer;
use super::reference::{matrix_of, packing_of};
use crate::diagnostic::DiagnosticKind;
use crate::layout::block_size;
use crate::layout_id::LayoutId;
use crate::scope::{LayoutValue, QualifierFlags, Qualifiers, Storage, SymbolKind};
use crate::types::{
    BlockStorage, BlockType, Member, OpaqueKind, ReferenceLayout, Type, TypeKind, TypeRegistry,
};

const fn invalid(qualifier: &'static str, reason: &'static str) -> DiagnosticKind {
    DiagnosticKind::InvalidQualifier { qualifier, reason }
}

pub(crate) const fn is_heap_storage(storage: Storage) -> bool {
    matches!(storage, Storage::ResourceHeap | Storage::SamplerHeap)
}

pub(crate) fn heap_member_reason(
    types: &TypeRegistry,
    ty: &Type,
    storage: Storage,
) -> Option<&'static str> {
    types.find_in_members(ty, |member| match member.kind {
        TypeKind::Opaque(opaque) => opaque_member_reason(opaque.kind, storage),
        _ => None,
    })
}

const fn opaque_member_reason(opaque: OpaqueKind, storage: Storage) -> Option<&'static str> {
    match (opaque, storage) {
        (
            OpaqueKind::Texture | OpaqueKind::Image | OpaqueKind::AccelerationStructure,
            Storage::ResourceHeap,
        )
        | (OpaqueKind::Sampler, Storage::SamplerHeap) => None,
        (OpaqueKind::CombinedSampler, _) => Some(
            "a heap block cannot hold a combined image sampler: declare the texture in a resourceheap block, the sampler in a samplerheap block, and combine them at the use",
        ),
        (OpaqueKind::SubpassInput, _) => {
            Some("a heap block cannot hold a subpass input: declare it with set and binding")
        }
        (OpaqueKind::Texture | OpaqueKind::Image | OpaqueKind::AccelerationStructure, _) => Some(
            "a samplerheap block can only hold samplers: textures, images and acceleration structures belong in a resourceheap block",
        ),
        (OpaqueKind::Sampler, _) => {
            Some("a resourceheap block cannot hold samplers: they belong in a samplerheap block")
        }
        (
            OpaqueKind::RayQuery
            | OpaqueKind::HitObjectNv
            | OpaqueKind::HitObjectExt
            | OpaqueKind::TileImage,
            _,
        ) => Some("a heap block can only hold descriptors, plain data and buffer references"),
    }
}

impl Analyzer<'_> {
    pub(crate) fn heap_layout_check(&mut self, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            match entry.id {
                Some(LayoutId::DescriptorHeap) => {
                    self.require_extension(
                        entry.span,
                        Extension::ExtDescriptorHeap,
                        "descriptor_heap",
                    );
                }
                Some(LayoutId::DescriptorStride) => {
                    self.require_extension(
                        entry.span,
                        Extension::ExtDescriptorHeap,
                        "descriptor_stride",
                    );
                    if entry
                        .value
                        .constant()
                        .is_some_and(|value| value <= 0 || (value & (value - 1)) != 0)
                    {
                        self.error(
                            entry.span,
                            invalid("descriptor_stride", "must be a power of 2"),
                        );
                    }
                }
                Some(id @ (LayoutId::DescriptorSize | LayoutId::HeapOffset)) => {
                    let what = id.name();
                    if self.require_extension(entry.span, Extension::ExtDescriptorHeap, what) {
                        self.require_extension(
                            entry.span,
                            Extension::ExtStructuredDescriptorHeap,
                            what,
                        );
                    }
                }
                Some(LayoutId::BufferType) => {
                    self.require_extension(
                        entry.span,
                        Extension::ExtStructuredDescriptorHeap,
                        "buffer_type",
                    );
                }
                _ => {}
            }
        }
    }

    pub(crate) fn heap_object_check(&mut self, span: Span, qualifiers: &Qualifiers) {
        if let Some(entry) = qualifiers.layout_entry(LayoutId::DescriptorStride)
            && !qualifiers.has_layout(LayoutId::DescriptorHeap)
        {
            self.error(
                entry.span,
                invalid(
                    "descriptor_stride",
                    "must specify 'descriptor_heap' to use 'descriptor_stride'",
                ),
            );
        }
        if let Some(entry) = qualifiers.layout_entry(LayoutId::HeapOffset) {
            let offset = entry.value != LayoutValue::Constant(0);
            if offset
                && !qualifiers.has_layout(LayoutId::DescriptorHeap)
                && !is_heap_storage(qualifiers.storage)
            {
                self.error(
                    span,
                    invalid(
                        "heap_offset",
                        "must specify 'descriptor_heap' to use 'heap_offset'",
                    ),
                );
            }
        }
    }

    pub(crate) fn heap_requested(&self, qualifiers: &Qualifiers) -> bool {
        self.extension_enabled(Extension::ExtDescriptorHeap)
            && !qualifiers.has_layout(LayoutId::Set)
            && !qualifiers.has_layout(LayoutId::Binding)
            && (qualifiers.has_layout(LayoutId::DescriptorHeap)
                || is_heap_storage(qualifiers.storage))
    }

    pub(crate) fn heap_declaration_check(
        &mut self,
        span: Span,
        ty: &Type,
        qualifiers: &Qualifiers,
        anonymous: bool,
    ) -> bool {
        if !self.heap_requested(qualifiers) {
            return true;
        }
        let heap_block = is_heap_storage(qualifiers.storage);
        let block = matches!(ty.kind, TypeKind::Block(_));
        let reason = if anonymous
            && (block || matches!(qualifiers.storage, Storage::Uniform | Storage::Buffer))
        {
            Some(
                "layout(descriptor_heap) decorated block should be explicitly declared with a run-time sized array type",
            )
        } else if ty
            .as_opaque()
            .or_else(|| ty.element_type().and_then(|element| element.as_opaque()))
            .is_some_and(|opaque| opaque.is_combined())
        {
            Some("layout(descriptor_heap) cannot be used with combined image samplers")
        } else if !heap_block && !ty.is_array() {
            Some("layout(descriptor_heap) decorated variable could only be declared as an array")
        } else if heap_block && ty.is_array() {
            Some("resourceheap / samplerheap block cannot itself be an array")
        } else {
            None
        };
        match reason {
            Some(reason) => {
                self.error(span, invalid("descriptor_heap", reason));
                false
            }
            None => true,
        }
    }

    pub(crate) fn heap_block_storage(&mut self, span: Span, storage: Storage) -> BlockStorage {
        let (block, what) = if storage == Storage::SamplerHeap {
            (BlockStorage::SamplerHeap, "samplerheap block")
        } else {
            (BlockStorage::ResourceHeap, "resourceheap block")
        };
        if self.require_extension(span, Extension::ExtStructuredDescriptorHeap, what) {
            self.require_extension(span, Extension::ExtDescriptorHeap, what);
        }
        block
    }

    fn inline_reference_allowed(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        in_heap: bool,
    ) -> bool {
        if !in_heap {
            self.error(
                span,
                invalid(
                    "descriptor heap member",
                    "can only be used on resourceheap or samplerheap block members",
                ),
            );
        }
        if !self.buffer_reference_layout(qualifiers) {
            self.error(
                span,
                invalid(
                    "buffer_reference",
                    "only buffer_reference blocks can be declared inline inside a heap block",
                ),
            );
            return false;
        }
        true
    }

    fn inline_reference_with(&mut self, qualifiers: &Qualifiers, members: Vec<Member>) -> Type {
        let packing = packing_of(qualifiers).unwrap_or(self.buffer_packing);
        let row_major = matrix_of(qualifiers).unwrap_or(self.buffer_row_major);
        let mut block = BlockType {
            name: String::new(),
            storage: BlockStorage::Buffer,
            qualifiers: qualifiers.clone(),
            members,
            reference: None,
            buffer_type: false,
        };
        let size = block_size(&self.types, &block, packing, row_major);
        block.reference = Some(ReferenceLayout {
            alignment: Self::reference_alignment(qualifiers),
            packing,
            row_major,
            size,
            defined: true,
        });
        if qualifiers.needs_vulkan_memory_model() {
            self.vulkan_memory_model = true;
        }
        self.types
            .add_block(block)
            .map_or(Type::ERROR, Type::reference)
    }

    pub(crate) fn buffer_type_block(
        &mut self,
        structure: &BlockStructure,
        storage: BlockStorage,
        qualifiers: &Qualifiers,
        members: Vec<Member>,
    ) {
        let name = &structure.name;
        let block = BlockType {
            name: name.node.clone(),
            storage,
            qualifiers: qualifiers.clone(),
            members,
            reference: None,
            buffer_type: true,
        };
        let Some(id) = self.types.add_block(block) else {
            return;
        };
        let symbol = self.add_symbol(&name.node, name.span, SymbolKind::BufferType(id));
        if self.scopes.declare(&name.node, symbol).is_err() {
            self.error(
                name.span,
                DiagnosticKind::InvalidBlock {
                    name: name.node.clone(),
                    reason: "block name cannot be redefined",
                },
            );
        }
    }

    pub(crate) fn heap_image_format_check(
        &mut self,
        qualifiers: &Qualifiers,
        ty: &Type,
        span: Span,
    ) {
        let image = self
            .types
            .find_in_members(ty, |member| match member.kind {
                TypeKind::Opaque(opaque) if opaque.is_image() => Some(()),
                _ => None,
            })
            .is_some();
        if image
            && !qualifiers.flags.contains(QualifierFlags::WRITEONLY)
            && qualifiers.image_format().is_none()
            && !self.extension_enabled(Extension::ExtShaderImageLoadFormatted)
        {
            self.error(
                span,
                invalid("image", "an image needs a format unless it is `writeonly`"),
            );
        }
    }

    pub(crate) fn heap_member_checks(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        in_heap: bool,
        in_block: bool,
    ) {
        if in_block
            && let Some(entry) = qualifiers.layout_entry(LayoutId::DescriptorStride)
            && !qualifiers.has_layout(LayoutId::DescriptorHeap)
        {
            self.error(
                entry.span,
                invalid(
                    "descriptor_stride",
                    "must specify 'descriptor_heap' to use 'descriptor_stride'",
                ),
            );
        }
        if in_heap {
            return;
        }
        let names: Vec<&'static str> = [
            (LayoutId::DescriptorSize, "descriptor_size"),
            (LayoutId::DescriptorHeap, "descriptor heap member"),
        ]
        .into_iter()
        .filter(|&(layout, _)| qualifiers.has_layout(layout))
        .map(|(_, what)| what)
        .collect();
        for what in names {
            self.error(
                span,
                invalid(
                    what,
                    "can only be used on resourceheap or samplerheap block members",
                ),
            );
        }
    }

    pub(crate) fn inline_reference(
        &mut self,
        span: Span,
        qualifiers: Qualifiers,
        members: &[Spanned<StructDeclaration>],
        in_heap: bool,
    ) -> Type {
        if !self.inline_reference_allowed(span, &qualifiers, in_heap) {
            return Type::ERROR;
        }
        let members = self.struct_members(members, Some(&qualifiers));
        self.inline_reference_with(&qualifiers, members)
    }
}
