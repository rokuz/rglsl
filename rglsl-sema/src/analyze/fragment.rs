use alloc::string::String;

use rglsl_ast::Span;
use rglsl_ast::ast::StorageQualifier;
use rglsl_types::extension::Extension;

use super::Analyzer;
use crate::diagnostic::DiagnosticKind;
use crate::layout_id::LayoutId;
use crate::scope::{PerVertex, Qualifiers, Storage};
use rglsl_types::ShaderStage;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Interlock {
    PixelOrdered,
    PixelUnordered,
    SampleOrdered,
    SampleUnordered,
    ShadingRateOrdered,
    ShadingRateUnordered,
}

impl Interlock {
    const fn from_layout(id: LayoutId) -> Option<Self> {
        Some(match id {
            LayoutId::PixelInterlockOrdered => Self::PixelOrdered,
            LayoutId::PixelInterlockUnordered => Self::PixelUnordered,
            LayoutId::SampleInterlockOrdered => Self::SampleOrdered,
            LayoutId::SampleInterlockUnordered => Self::SampleUnordered,
            LayoutId::ShadingRateInterlockOrdered => Self::ShadingRateOrdered,
            LayoutId::ShadingRateInterlockUnordered => Self::ShadingRateUnordered,
            _ => return None,
        })
    }

    const fn name(self) -> &'static str {
        match self {
            Self::PixelOrdered => "pixel_interlock_ordered",
            Self::PixelUnordered => "pixel_interlock_unordered",
            Self::SampleOrdered => "sample_interlock_ordered",
            Self::SampleUnordered => "sample_interlock_unordered",
            Self::ShadingRateOrdered => "shading_rate_interlock_ordered",
            Self::ShadingRateUnordered => "shading_rate_interlock_unordered",
        }
    }

    pub const fn is_ordered(self) -> bool {
        matches!(
            self,
            Self::PixelOrdered | Self::SampleOrdered | Self::ShadingRateOrdered
        )
    }
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct FragmentLayout {
    pub interlock: Option<Interlock>,
    pub post_depth_coverage: bool,
    pub early_fragment_tests: bool,
    pub early_and_late_fragment_tests: bool,
    pub non_coherent_color_attachment_read: bool,
    pub non_coherent_depth_attachment_read: bool,
    pub non_coherent_stencil_attachment_read: bool,
    interlock_begun: u32,
    interlock_ended: u32,
}

const POST_DEPTH_COVERAGE: [Extension; 2] = [
    Extension::ArbPostDepthCoverage,
    Extension::ExtPostDepthCoverage,
];

const fn invalid(qualifier: &'static str, reason: &'static str) -> DiagnosticKind {
    DiagnosticKind::InvalidQualifier { qualifier, reason }
}

impl Analyzer<'_> {
    pub(crate) fn fragment_layouts(&mut self, qualifiers: &Qualifiers) {
        let relevant = qualifiers
            .layout
            .iter()
            .filter_map(|entry| entry.id)
            .any(|id| {
                Interlock::from_layout(id).is_some()
                    || matches!(
                        id,
                        LayoutId::PostDepthCoverage
                            | LayoutId::EarlyFragmentTests
                            | LayoutId::EarlyAndLateFragmentTestsAmd
                            | LayoutId::NonCoherentColorAttachmentReadExt
                            | LayoutId::NonCoherentDepthAttachmentReadExt
                            | LayoutId::NonCoherentStencilAttachmentReadExt
                    )
            });
        if !relevant || !self.stage_is(ShaderStage::Fragment) {
            return;
        }
        let input = qualifiers.storage == Storage::In;
        let entries: alloc::vec::Vec<(LayoutId, Span)> = qualifiers
            .layout
            .iter()
            .filter_map(|entry| Some((entry.id?, entry.span)))
            .collect();
        for (id, span) in entries {
            if let Some(interlock) = Interlock::from_layout(id) {
                self.require_extension(
                    span,
                    Extension::ArbFragmentShaderInterlock,
                    interlock.name(),
                );
                if matches!(
                    interlock,
                    Interlock::ShadingRateOrdered | Interlock::ShadingRateUnordered
                ) {
                    self.require_extension(span, Extension::NvShadingRateImage, interlock.name());
                }
                if !input {
                    self.error(span, invalid(interlock.name(), "can only apply to 'in'"));
                    continue;
                }
                match self.fragment_layout.interlock {
                    Some(previous) if previous != interlock => self.error(
                        span,
                        invalid(
                            interlock.name(),
                            "cannot change previously set fragment shader interlock ordering",
                        ),
                    ),
                    _ => self.fragment_layout.interlock = Some(interlock),
                }
                continue;
            }
            let (qualifier, slot) = match id {
                LayoutId::PostDepthCoverage => {
                    self.post_depth_coverage_extension(span);
                    ("post_depth_coverage", 0)
                }
                LayoutId::EarlyFragmentTests => ("early_fragment_tests", 1),
                LayoutId::EarlyAndLateFragmentTestsAmd => ("early_and_late_fragment_tests_amd", 5),
                LayoutId::NonCoherentColorAttachmentReadExt => {
                    self.require_extension(
                        span,
                        Extension::ExtShaderTileImage,
                        "non_coherent_color_attachment_readEXT",
                    );
                    ("non_coherent_color_attachment_readEXT", 2)
                }
                LayoutId::NonCoherentDepthAttachmentReadExt => {
                    self.require_extension(
                        span,
                        Extension::ExtShaderTileImage,
                        "non_coherent_depth_attachment_readEXT",
                    );
                    ("non_coherent_depth_attachment_readEXT", 3)
                }
                LayoutId::NonCoherentStencilAttachmentReadExt => {
                    self.require_extension(
                        span,
                        Extension::ExtShaderTileImage,
                        "non_coherent_stencil_attachment_readEXT",
                    );
                    ("non_coherent_stencil_attachment_readEXT", 4)
                }
                _ => continue,
            };
            if !input {
                if slot != 1 {
                    self.error(span, invalid(qualifier, "can only apply to 'in'"));
                }
                continue;
            }
            let layout = &mut self.fragment_layout;
            match slot {
                0 => {
                    layout.post_depth_coverage = true;
                    if self.extension_enabled(Extension::ArbPostDepthCoverage) {
                        self.fragment_layout.early_fragment_tests = true;
                    }
                }
                1 => layout.early_fragment_tests = true,
                5 => layout.early_and_late_fragment_tests = true,
                2 => layout.non_coherent_color_attachment_read = true,
                3 => layout.non_coherent_depth_attachment_read = true,
                _ => layout.non_coherent_stencil_attachment_read = true,
            }
        }
    }

    fn post_depth_coverage_extension(&mut self, span: Span) {
        self.require_extensions(span, &POST_DEPTH_COVERAGE, "post depth coverage");
    }

    pub(crate) fn interlock_call(&mut self, span: Span, begin: bool, name: &str) {
        let report = |analyzer: &mut Self, reason: &'static str| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidBuiltinCall {
                    name: String::from(name),
                    reason,
                },
            );
        };
        let (main, after_return, flow, once) = (
            "must be in main()",
            "cannot be placed after a return from main()",
            "cannot be placed within flow control",
            "must only be called once",
        );
        if !self.in_main() {
            report(self, main);
        } else if self.stage_layout.returned_from_main {
            report(self, after_return);
        }
        if self.stage_layout.selections > 0 || self.loop_depth > 0 || !self.switches.is_empty() {
            report(self, flow);
        }
        let layout = self.fragment_layout;
        if begin {
            if layout.interlock_begun > 0 {
                report(self, once);
            }
            if layout.interlock_ended > 0 {
                report(
                    self,
                    "beginInvocationInterlockARB() must be called before endInvocationInterlockARB()",
                );
            }
            self.fragment_layout.interlock_begun = layout.interlock_begun.saturating_add(1);
            if self.fragment_layout.interlock.is_none() {
                self.fragment_layout.interlock = Some(Interlock::PixelOrdered);
            }
        } else {
            if layout.interlock_ended > 0 {
                report(self, once);
            }
            if layout.interlock_begun == 0 {
                report(
                    self,
                    "beginInvocationInterlockARB() must be called before endInvocationInterlockARB()",
                );
            }
            self.fragment_layout.interlock_ended = layout.interlock_ended.saturating_add(1);
        }
    }

    pub(crate) fn is_tile_image(ty: &crate::types::Type) -> bool {
        ty.as_opaque()
            .or_else(|| ty.element_type().and_then(|element| element.as_opaque()))
            .is_some_and(|opaque| opaque.kind == crate::types::OpaqueKind::TileImage)
    }

    pub(crate) fn tile_image_declaration(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        ty: &crate::types::Type,
    ) {
        if qualifiers.storage != Storage::TileImage {
            self.error(
                span,
                DiagnosticKind::OpaqueNotAllowed(alloc::format!("{ty:?}")),
            );
            return;
        }
        if !Self::is_tile_image(ty) {
            self.error(
                span,
                invalid("tileImageEXT", "can only be used with attachmentEXT types"),
            );
            return;
        }
        self.stage_check(span, |stage| {
            (stage != ShaderStage::Fragment).then(|| DiagnosticKind::NotSupportedInStage {
                feature: String::from("tileImageEXT"),
                stage: stage.name(),
            })
        });
        if !self.scopes.is_global() {
            self.error(span, invalid("tileImageEXT", "not allowed in nested scope"));
        }
        if qualifiers.has_layout(LayoutId::Set) {
            self.error(span, invalid("set", "cannot be used with tileImageEXT"));
        }
        let Some(location) = qualifiers
            .layout_entry(LayoutId::Location)
            .and_then(|entry| entry.value.constant())
            .and_then(|value| u32::try_from(value).ok())
        else {
            self.error(
                span,
                invalid("tileImageEXT", "can only be used with an explicit location"),
            );
            return;
        };
        let count = match ty.outer_size() {
            Some(crate::types::ArraySize::Sized(size)) => size.max(1),
            _ => 1,
        };
        let end = location.saturating_add(count);
        let overlap = self
            .tile_image_locations
            .iter()
            .find(|&&(start, stop)| location < stop && start < end)
            .map(|&(start, _)| start.max(location));
        match overlap {
            Some(found) => self.error(span, DiagnosticKind::OverlappingLocation(found)),
            None => self.tile_image_locations.push((location, end)),
        }
    }

    pub(crate) fn demote(&mut self, span: Span) {
        self.stage_check(span, |stage| {
            (stage != ShaderStage::Fragment).then(|| DiagnosticKind::NotSupportedInStage {
                feature: String::from("demote"),
                stage: stage.name(),
            })
        });
        self.require_extension(span, Extension::ExtDemoteToHelperInvocation, "demote");
    }
}

impl Analyzer<'_> {
    pub(crate) fn per_vertex_qualifier(
        &mut self,
        span: Span,
        storage: StorageQualifier,
    ) -> Option<PerVertex> {
        let qualifier = storage.keyword();
        let (per_vertex, extension) = if storage == StorageQualifier::PerVertexNV {
            (PerVertex::Nv, Extension::NvFragmentShaderBarycentric)
        } else {
            (PerVertex::Ext, Extension::ExtFragmentShaderBarycentric)
        };
        let reason = if !self.scopes.is_global() {
            "not allowed in nested scope"
        } else if !self.stage_is(ShaderStage::Fragment) {
            "only fragment shader inputs can be per-vertex"
        } else {
            self.require_extension(span, extension, qualifier);
            return Some(per_vertex);
        };
        self.error(span, DiagnosticKind::InvalidQualifier { qualifier, reason });
        None
    }
}
