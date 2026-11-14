use crate::scope::QualifierFlags;
use alloc::collections::BTreeSet;
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{
    AssignmentOperator, Expression, ExpressionKind, Identifier, NodeId, StorageQualifier,
};
use rglsl_ast::{Span, TranslationUnit};
use rglsl_types::extension::Extension;

use super::{Analyzer, Callee};
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Direction, Origin, Qualifiers, Storage, SymbolKind};
use crate::types::{ArraySize, BlockStorage, Type, TypeKind};
use rglsl_types::ShaderStage;

pub(crate) const MESH_ANY: [Extension; 2] = [Extension::NvMeshShader, Extension::ExtMeshShader];

pub const MESH_BLOCK_NAMES: [(&str, &str); 4] = [
    ("gl_MeshPerVertexNV", "gl_MeshVerticesNV"),
    ("gl_MeshPerPrimitiveNV", "gl_MeshPrimitivesNV"),
    ("gl_MeshPerVertexEXT", "gl_MeshVerticesEXT"),
    ("gl_MeshPerPrimitiveEXT", "gl_MeshPrimitivesEXT"),
];

const fn invalid(qualifier: &'static str, reason: &'static str) -> DiagnosticKind {
    DiagnosticKind::InvalidQualifier { qualifier, reason }
}

pub fn primitive_vertices(primitive: &str) -> Option<u32> {
    match primitive {
        "points" => Some(1),
        "lines" => Some(2),
        "triangles" => Some(3),
        _ => None,
    }
}

fn variable_extension(name: &str) -> Option<&'static [Extension]> {
    Some(match name {
        "gl_MeshVerticesNV"
        | "gl_MeshPrimitivesNV"
        | "gl_PrimitiveCountNV"
        | "gl_PrimitiveIndicesNV"
        | "gl_MeshViewCountNV"
        | "gl_MeshViewIndicesNV"
        | "gl_TaskCountNV"
        | "gl_MaxMeshOutputVerticesNV"
        | "gl_MaxMeshOutputPrimitivesNV"
        | "gl_MaxMeshWorkGroupSizeNV"
        | "gl_MaxTaskWorkGroupSizeNV"
        | "gl_MaxMeshViewCountNV" => &[Extension::NvMeshShader],
        "gl_MeshVerticesEXT"
        | "gl_MeshPrimitivesEXT"
        | "gl_PrimitivePointIndicesEXT"
        | "gl_PrimitiveLineIndicesEXT"
        | "gl_PrimitiveTriangleIndicesEXT"
        | "gl_NumWorkGroups" => &[Extension::ExtMeshShader],
        "gl_WorkGroupSize"
        | "gl_WorkGroupID"
        | "gl_LocalInvocationID"
        | "gl_GlobalInvocationID"
        | "gl_LocalInvocationIndex" => &MESH_ANY,
        _ => return None,
    })
}

pub fn function_extension(name: &str) -> Option<Extension> {
    match name {
        "SetMeshOutputsEXT" | "EmitMeshTasksEXT" => Some(Extension::ExtMeshShader),
        "writePackedPrimitiveIndices4x8NV" => Some(Extension::NvMeshShader),
        _ => None,
    }
}

impl Analyzer<'_> {
    pub(crate) fn mesh_qualifier(&mut self, span: Span, storage: StorageQualifier) {
        let keyword = storage.keyword();
        if !self.scopes.is_global() {
            self.error(span, invalid(keyword, "not allowed in nested scope"));
        }
        let stage = self.stage();
        let allowed = match storage {
            StorageQualifier::PerPrimitiveNV | StorageQualifier::PerPrimitiveEXT => {
                matches!(stage, ShaderStage::Fragment | ShaderStage::Mesh)
            }
            StorageQualifier::PerViewNV => stage == ShaderStage::Mesh,
            _ => matches!(stage, ShaderStage::Task | ShaderStage::Mesh),
        };
        if !allowed {
            self.error(span, invalid(keyword, "not supported in this stage"));
            return;
        }
        if stage == ShaderStage::Fragment {
            let extension = if storage == StorageQualifier::PerPrimitiveEXT {
                Extension::ExtMeshShader
            } else {
                Extension::NvMeshShader
            };
            self.require_extension(span, extension, keyword);
        }
    }

    pub(crate) fn mesh_variable_extension(&mut self, span: Span, name: &str) {
        let indices = matches!(
            name,
            "gl_PrimitivePointIndicesEXT"
                | "gl_PrimitiveLineIndicesEXT"
                | "gl_PrimitiveTriangleIndicesEXT"
        );
        if variable_extension(name).is_none() && !indices {
            return;
        }
        if let Some(extensions) = variable_extension(name) {
            self.require_stage_extensions(span, name, |stage| {
                matches!(stage, ShaderStage::Mesh | ShaderStage::Task).then_some(extensions)
            });
        }
        if !indices || !self.stage_is(ShaderStage::Mesh) {
            return;
        }
        let required = match name {
            "gl_PrimitivePointIndicesEXT" => "points",
            "gl_PrimitiveLineIndicesEXT" => "lines",
            "gl_PrimitiveTriangleIndicesEXT" => "triangles",
            _ => return,
        };
        if self.stage_layout.output_primitive() != Some(required) {
            self.error(
                span,
                invalid(
                    "output primitive",
                    "cannot be used (output primitive type mismatch)",
                ),
            );
        }
    }

    pub(crate) fn mesh_member_extension(&mut self, span: Span, base: &Type, field: &str) {
        if field != "gl_PrimitiveShadingRateEXT" || !self.stage_is(ShaderStage::Mesh) {
            return;
        }
        let builtin = match base.kind {
            TypeKind::Block(id) => self
                .types
                .block(id)
                .is_some_and(|block| block.name == "gl_MeshPerPrimitiveEXT"),
            _ => false,
        };
        if builtin {
            self.require_extension(span, Extension::ExtFragmentShadingRate, field);
        }
    }

    pub(crate) fn mesh_function_extension(&mut self, span: Span, name: &str) {
        if let Some(extension) = function_extension(name) {
            self.require_extension(span, extension, name);
        }
    }

    pub(crate) fn mesh_ext(&self) -> bool {
        self.extensions.is_on(Extension::ExtMeshShader)
    }

    fn mesh_array_size(&self, qualifiers: &Qualifiers, name: &str) -> Option<u32> {
        let vertices = self
            .stage_layout
            .mesh_vertices()
            .and_then(|value| u32::try_from(value).ok())?;
        let primitives = self
            .stage_layout
            .mesh_primitives()
            .and_then(|value| u32::try_from(value).ok())?;
        let primitive = self.stage_layout.output_primitive()?;
        Some(match name {
            "gl_PrimitiveIndicesNV" => primitives.saturating_mul(primitive_vertices(primitive)?),
            "gl_PrimitivePointIndicesEXT"
            | "gl_PrimitiveLineIndicesEXT"
            | "gl_PrimitiveTriangleIndicesEXT" => primitives,
            _ if qualifiers.flags.contains(QualifierFlags::PER_PRIMITIVE) => primitives,
            _ => vertices,
        })
    }

    pub(crate) fn mesh_interface_array(
        &mut self,
        name: &Identifier,
        qualifiers: &Qualifiers,
        ty: &mut Type,
    ) {
        if qualifiers.storage != Storage::Out || qualifiers.flags.contains(QualifierFlags::PER_TASK)
        {
            return;
        }
        if !ty.is_array() {
            if !name.node.starts_with("gl_") {
                self.stage_check(name.span, |stage| {
                    (stage == ShaderStage::Mesh).then(|| DiagnosticKind::InvalidInterfaceArray {
                        name: name.node.clone(),
                        reason: "the type must be an array",
                    })
                });
            }
            return;
        }
        if !self.stage_is(ShaderStage::Mesh) {
            return;
        }
        let Some(size) = self.mesh_array_size(qualifiers, &name.node) else {
            return;
        };
        match ty.outer_size() {
            Some(ArraySize::Unsized) => ty.set_outer_size(ArraySize::Sized(size)),
            Some(ArraySize::Sized(declared)) if declared != size => self.error(
                name.span,
                DiagnosticKind::InvalidInterfaceArray {
                    name: name.node.clone(),
                    reason: "inconsistent output array size",
                },
            ),
            _ => {}
        }
    }

    pub(crate) fn resize_mesh_arrays(&mut self, span: Span) {
        let candidates = self.symbols.iter().any(|symbol| {
            symbol.variable().is_some_and(|variable| {
                variable.origin != Origin::Parameter
                    && variable.origin != Origin::Local
                    && variable.ty.is_array()
                    && (variable.qualifiers.storage == Storage::Out
                        || matches!(variable.ty.kind, TypeKind::Block(_)))
            })
        });
        if !candidates || !self.stage_is(ShaderStage::Mesh) {
            return;
        }
        let mut updates = Vec::new();
        for (index, symbol) in self.symbols.iter().enumerate() {
            let SymbolKind::Variable(variable) = &symbol.kind else {
                continue;
            };
            if variable.origin == Origin::Parameter || variable.origin == Origin::Local {
                continue;
            }
            let mut qualifiers = variable.qualifiers.clone();
            if let TypeKind::Block(id) = variable.ty.kind
                && let Some(block) = self.types.block(id)
            {
                if block.storage != BlockStorage::Out {
                    continue;
                }
                qualifiers.storage = Storage::Out;
                qualifiers.flags |= block.qualifiers.flags
                    & (QualifierFlags::PER_PRIMITIVE | QualifierFlags::PER_TASK);
            }
            if qualifiers.storage != Storage::Out
                || qualifiers.flags.contains(QualifierFlags::PER_TASK)
                || !variable.ty.is_array()
            {
                continue;
            }
            if let Some(size) = self.mesh_array_size(&qualifiers, &symbol.name) {
                updates.push((index, size));
            }
        }
        let mut mismatched = Vec::new();
        for (index, size) in updates {
            let Some(symbol) = self.symbols.get_mut(index) else {
                continue;
            };
            let name = symbol.name.clone();
            let SymbolKind::Variable(variable) = &mut symbol.kind else {
                continue;
            };
            match variable.ty.outer_size() {
                Some(ArraySize::Unsized) => variable.ty.set_outer_size(ArraySize::Sized(size)),
                Some(ArraySize::Sized(declared)) if declared != size => mismatched.push(name),
                _ => {}
            }
        }
        for name in mismatched {
            self.error(
                span,
                DiagnosticKind::InvalidInterfaceArray {
                    name,
                    reason: "inconsistent output array size",
                },
            );
        }
    }

    pub(crate) fn per_view_dimension(
        &mut self,
        span: Span,
        qualifiers: &Qualifiers,
        ty: &mut Type,
        member: bool,
    ) {
        if !qualifiers.flags.contains(QualifierFlags::PER_VIEW) || !self.stage_is(ShaderStage::Mesh)
        {
            return;
        }
        let dimension = usize::from(!member);
        let view_count = u32::try_from(self.options.limits.max_mesh_view_count_nv).unwrap_or(0);
        match ty.dimensions().get(dimension).copied() {
            Some(ArraySize::Unsized) => ty.set_dimension(dimension, ArraySize::Sized(view_count)),
            Some(ArraySize::Sized(size)) if size == view_count => {}
            Some(_) => self.error(
                span,
                invalid(
                    "[]",
                    "mesh view output array size must be gl_MaxMeshViewCountNV or implicitly sized",
                ),
            ),
            None => self.error(
                span,
                invalid("perviewNV", "requires a view array dimension"),
            ),
        }
    }

    pub(crate) fn task_payload_checks(&mut self, span: Span, qualifiers: &Qualifiers, block: bool) {
        if qualifiers.storage != Storage::TaskPayloadShared {
            return;
        }
        if block {
            self.error(
                span,
                invalid(
                    "taskPayloadSharedEXT",
                    "taskPayloadSharedEXT variables should not be declared as interface blocks",
                ),
            );
        }
    }

    pub(crate) fn task_payload_type_only(&mut self, span: Span, qualifiers: &Qualifiers) {
        if qualifiers.storage == Storage::TaskPayloadShared {
            self.error(
                span,
                invalid(
                    "taskPayloadSharedEXT",
                    "can only be used when declaring a variable",
                ),
            );
        }
    }

    pub(crate) fn mesh_block_storage(&mut self, span: Span, qualifiers: &Qualifiers) {
        let storage = qualifiers.storage;
        let per_task = qualifiers.flags.contains(QualifierFlags::PER_TASK);
        self.stage_check(span, |stage| match (storage, stage) {
            (Storage::In, ShaderStage::Mesh) if !per_task => Some(invalid(
                "in",
                "input blocks cannot be used in a mesh shader",
            )),
            (Storage::Out, ShaderStage::Mesh) if per_task => Some(invalid(
                "taskNV",
                "can only use on input blocks in mesh shader",
            )),
            (Storage::Out, ShaderStage::Task) if !per_task => Some(invalid(
                "out",
                "output blocks cannot be used in a task shader",
            )),
            _ => None,
        });
    }

    pub(crate) fn mesh_output_reads(&mut self, unit: &TranslationUnit) {
        if !self.mesh_ext() || !self.stage_is(ShaderStage::Mesh) {
            return;
        }
        let Ok(expressions) = rglsl_ast::expressions(unit) else {
            self.stalled(());
            return;
        };
        let mut written: BTreeSet<NodeId> = BTreeSet::new();
        for expression in &expressions {
            match &expression.kind {
                ExpressionKind::Assignment {
                    operator: AssignmentOperator::Assign,
                    target,
                    ..
                } => mark_written(target, &mut written),
                ExpressionKind::FunctionCall(call) => {
                    let directions = self.call_directions(expression.id);
                    for (argument, direction) in call.arguments.iter().zip(directions) {
                        if direction == Direction::Out {
                            mark_written(argument, &mut written);
                        }
                    }
                }
                _ => {}
            }
        }
        let mut reads: Vec<(Span, String)> = Vec::new();
        for expression in &expressions {
            let ExpressionKind::Variable(name) = &expression.kind else {
                continue;
            };
            if written.contains(&expression.id) {
                continue;
            }
            let Some(&symbol) = self.references.get(&expression.id) else {
                continue;
            };
            if self.is_mesh_output(symbol) {
                reads.push((expression.span, name.clone()));
            }
        }
        reads.sort_by_key(|(span, _)| span.start);
        for (span, name) in reads {
            self.error(span, DiagnosticKind::MeshOutputRead(name));
        }
    }

    fn call_directions(&self, id: NodeId) -> Vec<Direction> {
        match self.calls.get(&id) {
            Some(Callee::Function(function)) => self
                .function(*function)
                .map(|function| {
                    function
                        .parameters
                        .iter()
                        .map(|parameter| parameter.direction)
                        .collect()
                })
                .unwrap_or_default(),
            Some(Callee::Builtin(builtin)) => self
                .builtins
                .function(*builtin)
                .map(|function| {
                    function
                        .parameters
                        .iter()
                        .map(|parameter| parameter.direction)
                        .collect()
                })
                .unwrap_or_default(),
            _ => Vec::new(),
        }
    }

    fn is_mesh_output(&self, symbol: crate::scope::SymbolId) -> bool {
        match self.symbol(symbol).map(|symbol| &symbol.kind) {
            Some(SymbolKind::Variable(variable)) => {
                if variable.origin == Origin::Parameter || variable.origin == Origin::Local {
                    return false;
                }
                match variable.ty.kind {
                    TypeKind::Block(id) => self.types.block(id).is_some_and(|block| {
                        block.storage == BlockStorage::Out
                            && !block.qualifiers.flags.contains(QualifierFlags::PER_TASK)
                    }),
                    _ => {
                        variable.qualifiers.storage == Storage::Out
                            && !variable.qualifiers.flags.contains(QualifierFlags::PER_TASK)
                    }
                }
            }
            Some(SymbolKind::BlockMember { instance, .. }) => self.is_mesh_output(*instance),
            _ => false,
        }
    }
}

fn mark_written(target: &Expression, written: &mut BTreeSet<NodeId>) {
    let mut current = target;
    loop {
        match &current.kind {
            ExpressionKind::Parenthesized(inner) => current = inner,
            ExpressionKind::Subscript { base, .. }
            | ExpressionKind::FieldSelection { base, .. } => {
                current = base;
            }
            ExpressionKind::Variable(_) => {
                written.insert(current.id);
                return;
            }
            _ => return,
        }
    }
}
