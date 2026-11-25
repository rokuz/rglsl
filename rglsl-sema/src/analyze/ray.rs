use crate::scope::QualifierFlags;
use alloc::string::String;

use rglsl_ast::Span;
use rglsl_ast::ast::StorageQualifier;
use rglsl_types::extension::Extension;

use super::{Analyzer, Operand};
use crate::builtins::kind::{HitObject, HitObjectFlavor, Ray};
use crate::constant::Constant;
use crate::diagnostic::DiagnosticKind;
use crate::layout_id::LayoutId;
use crate::scope::{Origin, Qualifiers, Storage};
use crate::types::{BlockStorage, OpaqueKind, Scalar, Type, TypeKind};
use rglsl_types::ShaderStageMask;

const RT_NV_ONLY: &[Extension] = &[Extension::NvRayTracing];
const RT_EXT_OR_QUERY: &[Extension] = &[Extension::ExtRayTracing, Extension::ExtRayQuery];
const SIR_NV: &[Extension] = &[Extension::NvShaderInvocationReorder];
const SIR_EXT: &[Extension] = &[Extension::ExtShaderInvocationReorder];

pub(crate) const fn ray_storage(
    qualifier: StorageQualifier,
) -> Option<(Storage, &'static [Extension])> {
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

const fn storage_stages(storage: Storage) -> ShaderStageMask {
    match storage {
        Storage::RayPayload => ShaderStageMask::RAY_GENERATION
            .union(ShaderStageMask::CLOSEST_HIT)
            .union(ShaderStageMask::ANY_HIT)
            .union(ShaderStageMask::MISS),
        Storage::RayPayloadIn => ShaderStageMask::CLOSEST_HIT
            .union(ShaderStageMask::ANY_HIT)
            .union(ShaderStageMask::MISS),
        Storage::HitAttribute => ShaderStageMask::INTERSECTION
            .union(ShaderStageMask::CLOSEST_HIT)
            .union(ShaderStageMask::ANY_HIT),
        Storage::CallableData => ShaderStageMask::RAY_GENERATION
            .union(ShaderStageMask::CLOSEST_HIT)
            .union(ShaderStageMask::MISS)
            .union(ShaderStageMask::CALLABLE),
        Storage::CallableDataIn => ShaderStageMask::CALLABLE,
        Storage::HitObjectAttributeNv | Storage::HitObjectAttributeExt => {
            ShaderStageMask::RAY_GENERATION
                .union(ShaderStageMask::CLOSEST_HIT)
                .union(ShaderStageMask::MISS)
        }
        _ => ShaderStageMask::empty(),
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

fn location_operand(ray: Ray, count: usize) -> Option<(usize, usize)> {
    let last = count.checked_sub(1)?;
    Some(match ray {
        Ray::HitObject(
            _,
            HitObject::ExecuteShader
            | HitObject::TraceRay { .. }
            | HitObject::TraceReorderExecute { .. }
            | HitObject::ReorderExecute,
        ) => (last, 0),
        Ray::HitObject(_, HitObject::GetAttributes | HitObject::RecordHit { .. }) => (last, 2),
        Ray::HitObject(_, HitObject::RecordFromQuery) => (3, 2),
        Ray::HitObject(
            _,
            HitObject::Value(_)
            | HitObject::RecordMiss
            | HitObject::RecordEmpty
            | HitObject::SetShaderBindingTableRecordIndex
            | HitObject::ReorderThread,
        )
        | Ray::Intersection(_)
        | Ray::Query(_)
        | Ray::QueryFunction(_)
        | Ray::TraceRay { .. }
        | Ray::ExecuteCallable { .. }
        | Ray::ReportIntersection
        | Ray::IgnoreIntersection
        | Ray::TerminateRay
        | Ray::MicroTriangle(_) => return None,
    })
}

pub fn is_shader_record(qualifiers: &Qualifiers) -> bool {
    qualifiers
        .layout
        .iter()
        .filter_map(|entry| entry.id)
        .any(LayoutId::is_shader_record)
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
    pub(crate) fn require_stage(
        &mut self,
        span: Span,
        stages: ShaderStageMask,
        what: &str,
    ) -> bool {
        !self.stage_check(span, |stage| {
            (!stages.has(stage)).then(|| DiagnosticKind::NotSupportedInStage {
                feature: String::from(what),
                stage: stage.name(),
            })
        })
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
        if qualifiers.has_layout(LayoutId::Binding) {
            self.error(
                span,
                invalid("binding", "cannot be used with shaderRecordNV"),
            );
        }
        if qualifiers.has_layout(LayoutId::Set) {
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
            .layout_entry(LayoutId::Location)
            .and_then(|entry| entry.value.constant())
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
        if qualifiers.storage != Storage::None
            || qualifiers.flags.contains(QualifierFlags::CONSTANT)
        {
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

    pub(crate) fn is_ray_query(ty: &Type) -> bool {
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

    fn linker_resolves_location(&self, operand: Option<&Operand>) -> bool {
        let signed_integer =
            |ty: &Type| !ty.is_array() && matches!(ty.kind, TypeKind::Scalar(Scalar::Int));
        !self.defines_main
            && operand.is_some_and(|operand| {
                signed_integer(&operand.ty)
                    && operand
                        .root
                        .and_then(|id| self.symbol(id))
                        .and_then(|symbol| symbol.variable())
                        .is_some_and(|variable| {
                            variable.origin == Origin::Parameter
                                && variable.qualifiers.flags.contains(QualifierFlags::CONSTANT)
                                && signed_integer(&variable.ty)
                        })
            })
    }

    pub(crate) fn ray_builtin_checks(
        &mut self,
        span: Span,
        ray: Ray,
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
        let (index, description, missing, set) = match ray {
            Ray::TraceRay { nv: true, .. } => {
                (operands.len().saturating_sub(1), "payload number", None, 0)
            }
            Ray::TraceRay { nv: false, .. } => (
                operands.len().saturating_sub(1),
                "payload number",
                Some("no rayPayloadEXT/rayPayloadInEXT declared"),
                0,
            ),
            Ray::ExecuteCallable { nv: true } => (1, "callable data number", None, 1),
            Ray::ExecuteCallable { nv: false } => (
                1,
                "callable data number",
                Some("no callableDataEXT/callableDataInEXT declared"),
                1,
            ),
            Ray::Intersection(_) => {
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
            Ray::HitObject(flavor, _) => match location_operand(ray, operands.len()) {
                Some((index, 0)) => (
                    index,
                    "payload number",
                    Some("no rayPayloadEXT/rayPayloadInEXT declared"),
                    0,
                ),
                Some((index, set)) => (
                    index,
                    "hitobjectattribute number",
                    Some(match flavor {
                        HitObjectFlavor::Nv => "no hitObjectAttributeNV declared",
                        HitObjectFlavor::Ext => "no hitObjectAttributeEXT declared",
                    }),
                    set,
                ),
                None => return true,
            },
            Ray::Query(_)
            | Ray::QueryFunction(_)
            | Ray::ReportIntersection
            | Ray::IgnoreIntersection
            | Ray::TerminateRay
            | Ray::MicroTriangle(_) => return true,
        };
        match location(index) {
            None => true,
            Some(None) if self.linker_resolves_location(operands.get(index)) => true,
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
        if self.require_extension(span, Extension::ExtRayTracing, keyword) {
            self.require_stage(span, ShaderStageMask::ANY_HIT, keyword);
        }
    }

    pub(crate) fn primitive_culling(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        standalone: bool,
    ) {
        if !qualifiers.has_layout(LayoutId::PrimitiveCulling) {
            return;
        }
        if !self.require_extensions(
            span,
            &[Extension::ExtRayFlagsPrimitiveCulling],
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
        let entry = qualifiers.layout_entry(LayoutId::ConstantId).cloned();
        let valid = entry.is_some()
            && qualifiers.storage == Storage::None
            && !qualifiers.flags.contains(QualifierFlags::CONSTANT)
            && qualifiers.layout.len() == 1;
        if !valid {
            self.opacity_micromap_error(span);
            return true;
        }
        if let Some(crate::scope::SymbolKind::Variable(variable)) =
            self.symbol_mut(id).map(|symbol| &mut symbol.kind)
        {
            variable
                .qualifiers
                .flags
                .insert(QualifierFlags::SPECIALIZATION);
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
        if qualifiers.has_layout(LayoutId::ConstantId) {
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
            qualifiers.flags.contains(QualifierFlags::CONSTANT)
                && qualifiers.storage == Storage::None
                && *ty == Type::BOOL
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
        self.builtin_name(ENABLE_OPACITY_MICROMAP);
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
