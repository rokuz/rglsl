use alloc::string::String;

use rglsl_ast::ast::StorageQualifier;
use rglsl_ast::Span;

use super::{Analyzer, Operand};
use crate::builtins::Stage;
use crate::constant::Constant;
use crate::diagnostic::{Diagnostic, DiagnosticKind};
use crate::scope::{Qualifiers, Storage};
use crate::types::{BlockStorage, OpaqueKind, Scalar, Type, TypeKind};

const RT_NV: &str = "GL_NV_ray_tracing";
const RT_EXT: &str = "GL_EXT_ray_tracing";
const RAY_QUERY: &str = "GL_EXT_ray_query";

pub(crate) const fn ray_storage(qualifier: StorageQualifier) -> Option<(Storage, bool)> {
    Some(match qualifier {
        StorageQualifier::RayPayloadNV => (Storage::RayPayload, true),
        StorageQualifier::RayPayloadEXT => (Storage::RayPayload, false),
        StorageQualifier::RayPayloadInNV => (Storage::RayPayloadIn, true),
        StorageQualifier::RayPayloadInEXT => (Storage::RayPayloadIn, false),
        StorageQualifier::HitAttributeNV => (Storage::HitAttribute, true),
        StorageQualifier::HitAttributeEXT => (Storage::HitAttribute, false),
        StorageQualifier::CallableDataNV => (Storage::CallableData, true),
        StorageQualifier::CallableDataEXT => (Storage::CallableData, false),
        StorageQualifier::CallableDataInNV => (Storage::CallableDataIn, true),
        StorageQualifier::CallableDataInEXT => (Storage::CallableDataIn, false),
        _ => return None,
    })
}

const fn storage_stages(storage: Storage) -> &'static [Stage] {
    match storage {
        Storage::RayPayload => &[
            Stage::RayGeneration,
            Stage::ClosestHit,
            Stage::AnyHit,
            Stage::Miss,
        ],
        Storage::RayPayloadIn => &[Stage::ClosestHit, Stage::AnyHit, Stage::Miss],
        Storage::HitAttribute => &[Stage::Intersection, Stage::ClosestHit, Stage::AnyHit],
        Storage::CallableData => &[
            Stage::RayGeneration,
            Stage::ClosestHit,
            Stage::Miss,
            Stage::Callable,
        ],
        Storage::CallableDataIn => &[Stage::Callable],
        _ => &[],
    }
}

pub(crate) const fn block_storage(storage: Storage) -> Option<BlockStorage> {
    Some(match storage {
        Storage::RayPayload => BlockStorage::RayPayload,
        Storage::RayPayloadIn => BlockStorage::RayPayloadIn,
        Storage::HitAttribute => BlockStorage::HitAttribute,
        Storage::CallableData => BlockStorage::CallableData,
        Storage::CallableDataIn => BlockStorage::CallableDataIn,
        _ => return None,
    })
}

pub(crate) const fn storage_of_block(storage: BlockStorage) -> Option<Storage> {
    Some(match storage {
        BlockStorage::RayPayload => Storage::RayPayload,
        BlockStorage::RayPayloadIn => Storage::RayPayloadIn,
        BlockStorage::HitAttribute => Storage::HitAttribute,
        BlockStorage::CallableData => Storage::CallableData,
        BlockStorage::CallableDataIn => Storage::CallableDataIn,
        _ => return None,
    })
}

pub fn is_shader_record(qualifiers: &Qualifiers) -> bool {
    qualifiers.layout.iter().any(|entry| {
        entry.name.eq_ignore_ascii_case("shaderRecordNV")
            || entry.name.eq_ignore_ascii_case("shaderRecordEXT")
    })
}

pub(crate) const fn location_set(storage: Storage) -> Option<usize> {
    match storage {
        Storage::RayPayload | Storage::RayPayloadIn => Some(0),
        Storage::CallableData | Storage::CallableDataIn => Some(1),
        _ => None,
    }
}

impl Analyzer<'_> {
    pub(crate) fn require_extensions(
        &mut self,
        span: Span,
        names: &'static [&'static str],
        what: &str,
    ) -> bool {
        match self.extensions.request(names) {
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
                        extensions: names.join(", "),
                    },
                );
                false
            }
        }
    }

    pub(crate) fn require_stage(&mut self, span: Span, stages: &[Stage], what: &str) -> bool {
        let stage = self.options.stage;
        if stages.contains(&stage) {
            return true;
        }
        self.error(
            span,
            DiagnosticKind::NotSupportedInStage {
                feature: String::from(what),
                stage: stage.name(),
            },
        );
        false
    }

    pub(crate) fn ray_storage_qualifier(
        &mut self,
        span: Span,
        qualifier: StorageQualifier,
    ) -> Storage {
        let Some((storage, nv)) = ray_storage(qualifier) else {
            return Storage::None;
        };
        let keyword = qualifier.keyword();
        let extensions: &'static [&'static str] = if nv { &[RT_NV] } else { &[RT_EXT, RAY_QUERY] };
        if self.require_extensions(span, extensions, keyword) {
            self.require_stage(span, storage_stages(storage), keyword);
        }
        storage
    }

    pub(crate) fn ray_block_storage(&mut self, span: Span, storage: Storage) -> BlockStorage {
        block_storage(storage).unwrap_or_else(|| {
            self.error(
                span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "block",
                    reason: "a block needs `uniform`, `buffer`, `in` or `out`",
                },
            );
            BlockStorage::Uniform
        })
    }

    pub(crate) fn shader_record_checks(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        block: bool,
    ) {
        if !is_shader_record(qualifiers) {
            return;
        }
        let invalid = |qualifier, reason| DiagnosticKind::InvalidQualifier { qualifier, reason };
        if !block {
            self.error(
                span,
                invalid("shaderRecordNV", "can only be used with a block"),
            );
            return;
        }
        if qualifiers.storage != Storage::Buffer {
            self.error(
                span,
                invalid("shaderRecordNV", "can only be used with a buffer"),
            );
        }
        if qualifiers.has_layout("binding") {
            self.error(
                span,
                invalid("binding", "cannot be used with shaderRecordNV"),
            );
        }
        if qualifiers.has_layout("set") {
            self.error(span, invalid("set", "cannot be used with shaderRecordNV"));
        }
    }

    pub(crate) fn ray_variable_checks(&mut self, span: Span, qualifiers: &Qualifiers) {
        if qualifiers.storage == Storage::HitAttribute && !qualifiers.layout.is_empty() {
            self.error(
                span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "hitAttributeNV",
                    reason: "cannot apply layout qualifiers to hitAttributeNV variable",
                },
            );
        }
        let Some(set) = location_set(qualifiers.storage) else {
            return;
        };
        let Some(location) = qualifiers
            .layout_entry("location")
            .and_then(|entry| entry.value)
            .and_then(|value| u32::try_from(value).ok())
        else {
            return;
        };
        let Some(used) = self.ray_locations.get_mut(set) else {
            return;
        };
        if used.contains(&location) {
            self.error(span, DiagnosticKind::OverlappingLocation(location));
        } else {
            used.push(location);
        }
    }

    pub(crate) fn opaque_outside_uniform(&self, ty: &Type) -> bool {
        ty.contains_opaque(&self.types) && !self.is_ray_query(ty)
    }

    pub(crate) fn is_ray_query(&self, ty: &Type) -> bool {
        matches!(ty.kind, TypeKind::Opaque(opaque) if opaque.kind == OpaqueKind::RayQuery)
    }

    pub(crate) fn acceleration_structure_constructor(&mut self, operands: &[Operand]) -> bool {
        match operands {
            [operand] => {
                !operand.ty.is_array()
                    && match operand.ty.kind {
                        TypeKind::Scalar(Scalar::Uint64) => true,
                        TypeKind::Vector {
                            scalar: Scalar::Uint,
                            size: 2,
                        } => true,
                        _ => false,
                    }
            }
            _ => false,
        }
    }

    pub(crate) fn ray_builtin_checks(
        &mut self,
        span: Span,
        name: &str,
        operands: &[Operand],
    ) -> bool {
        let location = |index: usize| -> Option<Option<u32>> {
            let operand = operands.get(index)?;
            if !operand.constant || operand.specialization {
                return Some(None);
            }
            Some(
                operand
                    .value
                    .as_ref()
                    .and_then(Constant::scalar_i64)
                    .and_then(|value| u32::try_from(value).ok()),
            )
        };
        let (index, description, missing, set) = match name {
            "traceNV" => (10, "payload number", None, 0),
            "traceRayEXT" => (
                10,
                "payload number",
                Some("no rayPayloadEXT/rayPayloadInEXT declared"),
                0,
            ),
            "traceRayMotionNV" => (
                11,
                "payload number",
                Some("no rayPayloadEXT/rayPayloadInEXT declared"),
                0,
            ),
            "executeCallableNV" => (1, "callable data number", None, 1),
            "executeCallableEXT" => (
                1,
                "callable data number",
                Some("no callableDataEXT/callableDataInEXT declared"),
                1,
            ),
            _ if name.starts_with("rayQueryGetIntersection")
                && name != "rayQueryGetIntersectionCandidateAABBOpaqueEXT" =>
            {
                let constant = operands
                    .get(1)
                    .is_none_or(|operand| operand.constant && !operand.specialization);
                if !constant {
                    self.error(
                        span,
                        DiagnosticKind::InvalidBuiltinCall {
                            name: String::from(name),
                            reason: "`committed` must be a compile-time constant",
                        },
                    );
                }
                return constant;
            }
            _ => return true,
        };
        match location(index) {
            None => true,
            Some(None) => {
                self.error(
                    span,
                    DiagnosticKind::InvalidBuiltinCall {
                        name: String::from(name),
                        reason: if description == "payload number" {
                            "the payload number must be a compile-time constant"
                        } else {
                            "the callable data number must be a compile-time constant"
                        },
                    },
                );
                false
            }
            Some(Some(location)) => {
                let declared = self
                    .ray_locations
                    .get(set)
                    .is_some_and(|used| used.contains(&location));
                match missing {
                    Some(what) if !declared => {
                        self.error(
                            span,
                            DiagnosticKind::RayLocationNotDeclared { what, location },
                        );
                        false
                    }
                    _ => true,
                }
            }
        }
    }

    pub(crate) fn ray_jump(&mut self, span: Span, keyword: &'static str) {
        if self.require_extensions(span, &[RT_EXT], keyword) {
            self.require_stage(span, &[Stage::AnyHit], keyword);
        }
    }

    pub(crate) fn primitive_culling(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        standalone: bool,
    ) {
        if !qualifiers
            .layout
            .iter()
            .any(|entry| entry.name.eq_ignore_ascii_case("primitive_culling"))
        {
            return;
        }
        if !self.require_extensions(
            span,
            &["GL_EXT_ray_flags_primitive_culling"],
            "primitive culling",
        ) {
            return;
        }
        let invalid = |reason| DiagnosticKind::InvalidQualifier {
            qualifier: "primitive_culling",
            reason,
        };
        if !standalone {
            self.error(span, invalid("can only be applied as standalone"));
        } else if qualifiers.storage != Storage::None {
            self.error(
                span,
                invalid("layout qualifier cannot have storage qualifiers"),
            );
        } else {
            self.primitive_culling = true;
        }
    }
}

impl Analyzer<'_> {
    pub(crate) fn shader_record_default(&mut self, span: Span, qualifiers: &Qualifiers) {
        if is_shader_record(qualifiers) {
            self.error(
                span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "shaderRecordNV",
                    reason: "cannot declare a default, can only be used on a block",
                },
            );
        }
    }
}
