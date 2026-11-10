use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{BlockStructure, Identifier, Spanned, TypeQualifier};
use rglsl_ast::extensions::names;
use rglsl_ast::Span;

use super::Analyzer;
use crate::diagnostic::{Diagnostic, DiagnosticKind};
use crate::layout::block_size;
use crate::scope::{Lookup, Qualifiers, Storage, SymbolKind};
use crate::types::{BlockId, BlockStorage, BlockType, Member, Packing, ReferenceLayout};

pub(crate) const DEFAULT_REFERENCE_ALIGNMENT: u32 = 16;

pub(crate) const fn invalid(reason: &'static str) -> DiagnosticKind {
    DiagnosticKind::InvalidQualifier {
        qualifier: "buffer_reference",
        reason,
    }
}

fn packing_of(qualifiers: &Qualifiers) -> Option<Packing> {
    qualifiers
        .layout
        .iter()
        .rev()
        .find_map(|entry| match entry.name.as_str() {
            "std140" | "shared" | "packed" => Some(Packing::Std140),
            "std430" => Some(Packing::Std430),
            "scalar" => Some(Packing::Scalar),
            _ => None,
        })
}

fn matrix_of(qualifiers: &Qualifiers) -> Option<bool> {
    qualifiers
        .layout
        .iter()
        .rev()
        .find_map(|entry| match entry.name.as_str() {
            "row_major" => Some(true),
            "column_major" => Some(false),
            _ => None,
        })
}

impl Analyzer<'_> {
    pub(crate) fn require_extension(&mut self, span: Span, name: &'static str, what: &str) -> bool {
        match self.extensions.request(&[name]) {
            rglsl_ast::extensions::Request::Enabled => true,
            rglsl_ast::extensions::Request::Warned(extension) => {
                self.warnings.push(Diagnostic {
                    span,
                    kind: DiagnosticKind::ExtensionWarned {
                        extension,
                        feature: String::from(what),
                    },
                });
                true
            }
            rglsl_ast::extensions::Request::Missing => {
                self.error(
                    span,
                    DiagnosticKind::ExtensionRequired {
                        feature: String::from(what),
                        extensions: String::from(name),
                    },
                );
                false
            }
        }
    }

    pub(crate) fn require_scope_extension(&mut self, span: Span, what: &str) {
        self.require_extension(span, "GL_KHR_memory_scope_semantics", what);
    }

    pub(crate) fn buffer_reference_layout(&mut self, qualifiers: &Qualifiers) -> bool {
        let mut reference = false;
        for entry in &qualifiers.layout {
            if entry.name.eq_ignore_ascii_case("buffer_reference") {
                reference = true;
                self.require_extension(entry.span, names::BUFFER_REFERENCE, "buffer_reference");
            } else if entry.name.eq_ignore_ascii_case("buffer_reference_align") {
                self.require_extension(
                    entry.span,
                    names::BUFFER_REFERENCE,
                    "buffer_reference_align",
                );
                if let Some(value) = entry.value {
                    if value <= 0 || (value & (value - 1)) != 0 {
                        self.error(
                            entry.span,
                            DiagnosticKind::InvalidQualifier {
                                qualifier: "buffer_reference_align",
                                reason: "must be a power of 2",
                            },
                        );
                    }
                }
            }
        }
        reference
    }

    pub(crate) fn record_buffer_defaults(&mut self, qualifiers: &Qualifiers) {
        if qualifiers.storage != Storage::Buffer {
            return;
        }
        if let Some(packing) = packing_of(qualifiers) {
            self.buffer_packing = packing;
        }
        if let Some(row_major) = matrix_of(qualifiers) {
            self.buffer_row_major = row_major;
        }
    }

    fn reference_alignment(qualifiers: &Qualifiers) -> u32 {
        qualifiers
            .layout_entry("buffer_reference_align")
            .and_then(|entry| entry.value)
            .and_then(|value| u32::try_from(value).ok())
            .filter(|value| value.is_power_of_two())
            .unwrap_or(DEFAULT_REFERENCE_ALIGNMENT)
    }

    pub(crate) fn reference_block(
        &mut self,
        structure: &BlockStructure,
        storage: BlockStorage,
        qualifiers: &Qualifiers,
        members: &[Member],
    ) -> Option<BlockId> {
        if !self.buffer_reference_layout(qualifiers) {
            return None;
        }
        let name = &structure.name;
        if storage != BlockStorage::Buffer {
            self.error(name.span, invalid("can only be used with buffer"));
        }
        if qualifiers.needs_vulkan_memory_model()
            || members
                .iter()
                .any(|member| member.qualifiers.needs_vulkan_memory_model())
        {
            self.vulkan_memory_model = true;
        }
        let packing = packing_of(qualifiers).unwrap_or(self.buffer_packing);
        let row_major = matrix_of(qualifiers).unwrap_or(self.buffer_row_major);
        let mut block = BlockType {
            name: name.node.clone(),
            storage,
            qualifiers: qualifiers.clone(),
            members: members.to_vec(),
            reference: None,
        };
        let size = block_size(&self.types, &block, packing, row_major);
        block.reference = Some(ReferenceLayout {
            alignment: Self::reference_alignment(qualifiers),
            packing,
            row_major,
            size,
            defined: true,
        });
        let forward = match self.scopes.lookup_in_current(&name.node) {
            None => None,
            Some(Lookup::Symbol(id)) => {
                let existing = match self.symbol(id).map(|symbol| &symbol.kind) {
                    Some(&SymbolKind::Reference(block)) => {
                        self.types.block(block).and_then(|declared| {
                            let undefined = declared
                                .reference
                                .is_some_and(|reference| !reference.defined);
                            (undefined && declared.storage == storage).then_some(block)
                        })
                    }
                    _ => None,
                };
                if existing.is_none() {
                    self.error(
                        name.span,
                        DiagnosticKind::InvalidBlock {
                            name: name.node.clone(),
                            reason: "block name cannot be redefined",
                        },
                    );
                }
                existing
            }
            Some(Lookup::Function(_)) => {
                self.error(
                    name.span,
                    DiagnosticKind::InvalidBlock {
                        name: name.node.clone(),
                        reason: "block name cannot be redefined",
                    },
                );
                None
            }
        };
        if let Some(id) = forward {
            if let Some(declared) = self.types.block_mut(id) {
                *declared = block;
            }
            return Some(id);
        }
        let id = self.types.add_block(block)?;
        let symbol = self.add_symbol(&name.node, name.span, SymbolKind::Reference(id));
        let _ = self.scopes.declare(&name.node, symbol);
        Some(id)
    }

    pub(crate) fn forward_references(
        &mut self,
        qualifier: &Spanned<TypeQualifier>,
        qualifiers: &Qualifiers,
        identifiers: &[Identifier],
    ) -> bool {
        if !self.buffer_reference_layout(qualifiers) {
            return false;
        }
        let storage = match qualifiers.storage {
            Storage::Buffer => BlockStorage::Buffer,
            Storage::Uniform => BlockStorage::Uniform,
            Storage::In => BlockStorage::In,
            Storage::Out => BlockStorage::Out,
            _ => BlockStorage::Buffer,
        };
        if qualifiers.storage != Storage::Buffer {
            self.error(qualifier.span, invalid("can only be used with buffer"));
        }
        for identifier in identifiers {
            if self.lookup(&identifier.node).is_some() {
                self.error(
                    identifier.span,
                    DiagnosticKind::InvalidBlock {
                        name: identifier.node.clone(),
                        reason: "block name cannot redefine a non-block name",
                    },
                );
                continue;
            }
            for (layout, what) in [
                ("buffer_reference_align", "the buffer_reference_align layout is ignored when defined in forward declaration"),
                ("std140", "the packing layout (scalar, std430, etc) is ignored when defined in forward declaration"),
            ] {
                let present = if layout == "std140" {
                    packing_of(qualifiers).is_some()
                } else {
                    qualifiers.has_layout(layout)
                };
                if present {
                    self.warnings.push(Diagnostic {
                        span: identifier.span,
                        kind: DiagnosticKind::Warning(String::from(what)),
                    });
                }
            }
            let block = BlockType {
                name: identifier.node.clone(),
                storage,
                qualifiers: qualifiers.clone(),
                members: Vec::new(),
                reference: Some(ReferenceLayout {
                    alignment: Self::reference_alignment(qualifiers),
                    packing: self.buffer_packing,
                    row_major: self.buffer_row_major,
                    size: Some(0),
                    defined: false,
                }),
            };
            let Some(id) = self.types.add_block(block) else {
                continue;
            };
            let symbol =
                self.add_symbol(&identifier.node, identifier.span, SymbolKind::Reference(id));
            let _ = self.scopes.declare(&identifier.node, symbol);
        }
        true
    }
}
