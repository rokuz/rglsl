use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{BlockStructure, Spanned, StructDeclaration};
use rglsl_ast::Span;

use super::reference::{matrix_of, packing_of};
use super::Analyzer;
use crate::diagnostic::DiagnosticKind;
use crate::layout::block_size;
use crate::scope::{Qualifiers, Storage, SymbolKind};
use crate::types::{BlockStorage, BlockType, Member, ReferenceLayout, Type, TypeKind};

pub(crate) const DESCRIPTOR_HEAP: &str = "GL_EXT_descriptor_heap";
pub(crate) const STRUCTURED_DESCRIPTOR_HEAP: &str = "GL_EXT_structured_descriptor_heap";

const fn invalid(qualifier: &'static str, reason: &'static str) -> DiagnosticKind {
    DiagnosticKind::InvalidQualifier { qualifier, reason }
}

pub(crate) fn is_heap_storage(storage: Storage) -> bool {
    matches!(storage, Storage::ResourceHeap | Storage::SamplerHeap)
}

impl Analyzer<'_> {
    pub(crate) fn heap_layout_check(&mut self, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            match entry.name.as_str() {
                "descriptor_heap" => {
                    self.require_extension(entry.span, DESCRIPTOR_HEAP, "descriptor_heap");
                }
                "descriptor_stride" => {
                    self.require_extension(entry.span, DESCRIPTOR_HEAP, "descriptor_stride");
                    if entry
                        .value
                        .is_some_and(|value| value <= 0 || (value & (value - 1)) != 0)
                    {
                        self.error(
                            entry.span,
                            invalid("descriptor_stride", "must be a power of 2"),
                        );
                    }
                }
                "descriptor_size" | "heap_offset" => {
                    let what = if entry.name == "heap_offset" {
                        "heap_offset"
                    } else {
                        "descriptor_size"
                    };
                    if self.require_extension(entry.span, DESCRIPTOR_HEAP, what) {
                        self.require_extension(entry.span, STRUCTURED_DESCRIPTOR_HEAP, what);
                    }
                }
                "buffer_type" => {
                    self.require_extension(entry.span, STRUCTURED_DESCRIPTOR_HEAP, "buffer_type");
                }
                _ => {}
            }
        }
    }

    pub(crate) fn heap_object_check(&mut self, span: Span, qualifiers: &Qualifiers) {
        if let Some(entry) = qualifiers.layout_entry("descriptor_stride") {
            if !qualifiers.has_layout("descriptor_heap") {
                self.error(
                    entry.span,
                    invalid(
                        "descriptor_stride",
                        "must specify 'descriptor_heap' to use 'descriptor_stride'",
                    ),
                );
            }
        }
        if let Some(entry) = qualifiers.layout_entry("heap_offset") {
            let offset = entry.value != Some(0) || entry.has_value && entry.value.is_none();
            if offset
                && !qualifiers.has_layout("descriptor_heap")
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
        self.extension_enabled(DESCRIPTOR_HEAP)
            && !qualifiers.has_layout("set")
            && !qualifiers.has_layout("binding")
            && (qualifiers.has_layout("descriptor_heap") || is_heap_storage(qualifiers.storage))
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
            Some("layout(descriptor_heap) decorated block should be explicitly declared with a run-time sized array type")
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
        if self.require_extension(span, STRUCTURED_DESCRIPTOR_HEAP, what) {
            self.require_extension(span, DESCRIPTOR_HEAP, what);
        }
        block
    }

    pub(crate) fn inline_reference(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        members: &[Spanned<StructDeclaration>],
        in_heap: bool,
    ) -> Type {
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
            return Type::ERROR;
        }
        let members = self.struct_members(members, Some(qualifiers));
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

    pub(crate) fn heap_member_checks(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        in_heap: bool,
    ) {
        if in_heap {
            return;
        }
        let names: Vec<&'static str> = [
            ("descriptor_size", "descriptor_size"),
            ("descriptor_heap", "descriptor heap member"),
        ]
        .into_iter()
        .filter(|(layout, _)| qualifiers.has_layout(layout))
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
}
