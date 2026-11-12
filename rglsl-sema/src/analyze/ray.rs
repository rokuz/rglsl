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
const SHADER_INVOCATION_REORDER_NV: &str = "GL_NV_shader_invocation_reorder";
const SHADER_INVOCATION_REORDER_EXT: &str = "GL_EXT_shader_invocation_reorder";

const RT_NV_ONLY: &[&str] = &[RT_NV];
const RT_EXT_OR_QUERY: &[&str] = &[RT_EXT, RAY_QUERY];
const SIR_NV: &[&str] = &[SHADER_INVOCATION_REORDER_NV];
const SIR_EXT: &[&str] = &[SHADER_INVOCATION_REORDER_EXT];

pub(crate) const fn ray_storage(
    qualifier: StorageQualifier,
) -> Option<(Storage, &'static [&'static str])> {
    Some(match qualifier {
        StorageQualifier::RayPayloadNV => (Storage::RayPayload, RT_NV_ONLY),
        StorageQualifier::RayPayloadEXT => (Storage::RayPayload, RT_EXT_OR_QUERY),
        StorageQualifier::RayPayloadInNV => (Storage::RayPayloadIn, RT_NV_ONLY),
        StorageQualifier::RayPayloadInEXT => (Storage::RayPayloadIn, RT_EXT_OR_QUERY),
        StorageQualifier::HitAttributeNV => (Storage::HitAttribute, RT_NV_ONLY),
        StorageQualifier::HitAttributeEXT => (Storage::HitAttribute, RT_EXT_OR_QUERY),
        StorageQualifier::CallableDataNV => (Storage::CallableData, RT_NV_ONLY),
        StorageQualifier::CallableDataEXT => (Storage::CallableData, RT_EXT_OR_QUERY),
        StorageQualifier::CallableDataInNV => (Storage::CallableDataIn, RT_NV_ONLY),
        StorageQualifier::CallableDataInEXT => (Storage::CallableDataIn, RT_EXT_OR_QUERY),
        StorageQualifier::HitObjectAttributeNV => (Storage::HitObjectAttributeNv, SIR_NV),
        StorageQualifier::HitObjectAttributeEXT => (Storage::HitObjectAttributeExt, SIR_EXT),
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
        Storage::HitObjectAttributeNv | Storage::HitObjectAttributeExt => {
            &[Stage::RayGeneration, Stage::ClosestHit, Stage::Miss]
        }
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
        Storage::HitObjectAttributeNv => BlockStorage::HitObjectAttributeNv,
        Storage::HitObjectAttributeExt => BlockStorage::HitObjectAttributeExt,
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
        BlockStorage::HitObjectAttributeNv => Storage::HitObjectAttributeNv,
        BlockStorage::HitObjectAttributeExt => Storage::HitObjectAttributeExt,
        _ => return None,
    })
}

fn hit_object_location(name: &str, count: usize) -> Option<(usize, usize)> {
    Some(match name {
        "hitObjectExecuteShaderNV" | "hitObjectExecuteShaderEXT" => (1, 0),
        "hitObjectTraceRayNV" | "hitObjectTraceRayEXT" => (11, 0),
        "hitObjectTraceRayMotionNV" | "hitObjectTraceRayMotionEXT" => (12, 0),
        "hitObjectReorderExecuteEXT"
        | "hitObjectTraceReorderExecuteEXT"
        | "hitObjectTraceMotionReorderExecuteEXT" => (count.checked_sub(1)?, 0),
        "hitObjectGetAttributesNV" | "hitObjectGetAttributesEXT" => (1, 2),
        "hitObjectRecordFromQueryEXT" => (3, 2),
        "hitObjectRecordHitNV" | "hitObjectRecordHitWithIndexMotionNV" => (12, 2),
        "hitObjectRecordHitMotionNV" => (13, 2),
        "hitObjectRecordHitWithIndexNV" => (11, 2),
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
        Storage::HitObjectAttributeNv | Storage::HitObjectAttributeExt => Some(2),
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
        let stage = self.stage();
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
        let Some((storage, extensions)) = ray_storage(qualifier) else {
            return Storage::None;
        };
        let keyword = qualifier.keyword();
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
        ty.contains_opaque(&self.types)
            && !matches!(ty.kind, TypeKind::Opaque(opaque) if opaque.is_private_object())
    }

    fn contained_hit_object(&self, ty: &Type) -> Option<OpaqueKind> {
        self.types.find_in_members(ty, |ty| match ty.kind {
            TypeKind::Opaque(opaque) if opaque.is_hit_object() => Some(opaque.kind),
            _ => None,
        })
    }

    pub(crate) fn hit_object_checks(
        &mut self,
        span: Span,
        name: &str,
        qualifiers: &Qualifiers,
        ty: &Type,
        initialized: bool,
    ) -> bool {
        let Some(kind) = self.contained_hit_object(ty) else {
            return false;
        };
        let keyword = if kind == OpaqueKind::HitObjectNv {
            "hitObjectNV"
        } else {
            "hitObjectEXT"
        };
        if let TypeKind::Struct(id) = ty.kind {
            let structure = self
                .types
                .structure(id)
                .and_then(|structure| structure.name.clone())
                .unwrap_or_default();
            self.error(
                span,
                DiagnosticKind::StructContainsHitObject {
                    structure,
                    keyword,
                    name: String::from(name),
                },
            );
            return true;
        }
        if qualifiers.storage != Storage::None || qualifiers.constant {
            self.error(
                span,
                DiagnosticKind::HitObjectStorage {
                    keyword,
                    name: String::from(name),
                },
            );
        }
        if initialized {
            self.error(
                span,
                DiagnosticKind::HitObjectInitializer(String::from(name)),
            );
        }
        true
    }

    pub(crate) fn is_ray_query(&self, ty: &Type) -> bool {
        matches!(ty.kind, TypeKind::Opaque(opaque) if opaque.kind == OpaqueKind::RayQuery)
    }

    pub(crate) fn acceleration_structure_constructor(operands: &[Operand]) -> bool {
        match operands {
            [operand] => {
                !operand.ty.is_array()
                    && matches!(
                        operand.ty.kind,
                        TypeKind::Scalar(Scalar::Uint64)
                            | TypeKind::Vector {
                                scalar: Scalar::Uint,
                                size: 2,
                            }
                    )
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
        let hit_object = hit_object_location(name, operands.len());
        let (index, description, missing, set) = match (name, hit_object) {
            ("traceNV", _) => (10, "payload number", None, 0),
            ("traceRayEXT", _) => (
                10,
                "payload number",
                Some("no rayPayloadEXT/rayPayloadInEXT declared"),
                0,
            ),
            ("traceRayMotionNV", _) => (
                11,
                "payload number",
                Some("no rayPayloadEXT/rayPayloadInEXT declared"),
                0,
            ),
            ("executeCallableNV", _) => (1, "callable data number", None, 1),
            ("executeCallableEXT", _) => (
                1,
                "callable data number",
                Some("no callableDataEXT/callableDataInEXT declared"),
                1,
            ),
            (_, Some((index, 0))) => (
                index,
                "payload number",
                Some("no rayPayloadEXT/rayPayloadInEXT declared"),
                0,
            ),
            (_, Some((index, _))) => (
                index,
                "hitobjectattribute number",
                Some(if name.ends_with("NV") {
                    "no hitObjectAttributeNV declared"
                } else {
                    "no hitObjectAttributeEXT declared"
                }),
                2,
            ),
            _ if (name.starts_with("rayQueryGetIntersection")
                || name.starts_with("rayQueryIs"))
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
                        reason: match description {
                            "payload number" => {
                                "the payload number must be a compile-time constant"
                            }
                            "hitobjectattribute number" => {
                                "the hit object attribute number must be a compile-time constant"
                            }
                            _ => "the callable data number must be a compile-time constant",
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

pub(crate) const ENABLE_OPACITY_MICROMAP: &str = "gl_EnableOpacityMicromapEXT";

impl Analyzer<'_> {
    pub(crate) fn opacity_micromap_specialization(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        identifier: &str,
    ) -> bool {
        if identifier != ENABLE_OPACITY_MICROMAP {
            return false;
        }
        let Some(id) = self.redeclared_opacity_micromap() else {
            return false;
        };
        let entry = qualifiers.layout_entry("constant_id").cloned();
        let valid = entry.is_some()
            && qualifiers.storage == Storage::None
            && !qualifiers.constant
            && qualifiers.layout.len() == 1;
        if !valid {
            self.opacity_micromap_error(span);
            return true;
        }
        if let Some(crate::scope::SymbolKind::Variable(variable)) =
            self.symbol_mut(id).map(|symbol| &mut symbol.kind)
        {
            variable.qualifiers.specialization = true;
            variable.qualifiers.layout.extend(entry);
        }
        true
    }

    pub(crate) fn opacity_micromap_constant(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        ty: &Type,
        value: Option<&Constant>,
    ) -> Option<crate::scope::SymbolId> {
        let id = self.redeclared_opacity_micromap()?;
        if qualifiers.has_layout("constant_id") {
            self.error(
                span,
                DiagnosticKind::InvalidQualifier {
                    qualifier: ENABLE_OPACITY_MICROMAP,
                    reason: "cannot restate the type or specify a value with constant_id; use `layout(constant_id = N) gl_EnableOpacityMicromapEXT;`",
                },
            );
            return Some(id);
        }
        let value = value.filter(|_| {
            qualifiers.constant && qualifiers.storage == Storage::None && *ty == Type::BOOL
        });
        let Some(value) = value else {
            self.opacity_micromap_error(span);
            return Some(id);
        };
        if let Some(crate::scope::SymbolKind::Variable(variable)) =
            self.symbol_mut(id).map(|symbol| &mut symbol.kind)
        {
            variable.value = Some(value.clone());
        }
        Some(id)
    }

    fn redeclared_opacity_micromap(&self) -> Option<crate::scope::SymbolId> {
        if !self.scopes.is_global() {
            return None;
        }
        match self.scopes.lookup_level(ENABLE_OPACITY_MICROMAP) {
            Some((0, crate::scope::Lookup::Symbol(id))) => Some(id),
            _ => None,
        }
    }

    fn opacity_micromap_error(&mut self, span: Span) {
        self.error(
            span,
            DiagnosticKind::InvalidQualifier {
                qualifier: ENABLE_OPACITY_MICROMAP,
                reason: "can only be redeclared as `const bool gl_EnableOpacityMicromapEXT = <true|false>;` or `layout(constant_id = N) gl_EnableOpacityMicromapEXT;`",
            },
        );
    }
}
