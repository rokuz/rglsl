use alloc::collections::BTreeSet;
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{
    AssignmentOperator, Expression, ExpressionKind, Identifier, NodeId, StorageQualifier,
};
use rglsl_ast::{Span, TranslationUnit};

use super::{Analyzer, Callee};
use crate::builtins::Stage;
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Direction, Origin, Qualifiers, Storage, SymbolKind};
use crate::types::{ArraySize, BlockStorage, Type, TypeKind};

pub const MESH_EXT: &str = "GL_EXT_mesh_shader";
pub const MESH_NV: &str = "GL_NV_mesh_shader";
const MESH_ANY: [&str; 2] = [MESH_NV, MESH_EXT];

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

fn variable_extension(name: &str) -> Option<&'static [&'static str]> {
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
        | "gl_MaxMeshViewCountNV" => &[MESH_NV],
        "gl_MeshVerticesEXT"
        | "gl_MeshPrimitivesEXT"
        | "gl_PrimitivePointIndicesEXT"
        | "gl_PrimitiveLineIndicesEXT"
        | "gl_PrimitiveTriangleIndicesEXT"
        | "gl_NumWorkGroups" => &[MESH_EXT],
        "gl_WorkGroupSize"
        | "gl_WorkGroupID"
        | "gl_LocalInvocationID"
        | "gl_GlobalInvocationID"
        | "gl_LocalInvocationIndex" => &MESH_ANY,
        _ => return None,
    })
}

pub fn function_extension(name: &str) -> Option<&'static str> {
    match name {
        "SetMeshOutputsEXT" | "EmitMeshTasksEXT" => Some(MESH_EXT),
        "writePackedPrimitiveIndices4x8NV" => Some(MESH_NV),
        _ => None,
    }
}

impl Analyzer<'_> {
    pub(crate) fn mesh_qualifier(&mut self, span: Span, storage: StorageQualifier) {
        let keyword = storage.keyword();
        if !self.scopes.is_global() {
            self.error(span, invalid(keyword, "not allowed in nested scope"));
        }
        let stage = self.options.stage;
        let allowed = match storage {
            StorageQualifier::PerPrimitiveNV | StorageQualifier::PerPrimitiveEXT => {
                matches!(stage, Stage::Fragment | Stage::Mesh)
            }
            StorageQualifier::PerViewNV => stage == Stage::Mesh,
            _ => matches!(stage, Stage::Task | Stage::Mesh),
        };
        if !allowed {
            self.error(span, invalid(keyword, "not supported in this stage"));
            return;
        }
        if stage == Stage::Fragment {
            let extension = if storage == StorageQualifier::PerPrimitiveEXT {
                MESH_EXT
            } else {
                MESH_NV
            };
            self.require_extension(span, extension, keyword);
        }
    }

    pub(crate) fn mesh_variable_extension(&mut self, span: Span, name: &str) {
        if !matches!(self.options.stage, Stage::Mesh | Stage::Task) {
            return;
        }
        if let Some(extensions) = variable_extension(name) {
            self.require_extensions(span, extensions, name);
        }
        if self.options.stage != Stage::Mesh {
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
        if field != "gl_PrimitiveShadingRateEXT" || self.options.stage != Stage::Mesh {
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
            self.require_extension(span, "GL_EXT_fragment_shading_rate", field);
        }
    }

    pub(crate) fn mesh_function_extension(&mut self, span: Span, name: &str) {
        if let Some(extension) = function_extension(name) {
            self.require_extension(span, extension, name);
        }
    }

    pub(crate) fn mesh_ext(&self) -> bool {
        self.extensions.is_on(MESH_EXT)
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
            _ if qualifiers.per_primitive => primitives,
            _ => vertices,
        })
    }

    pub(crate) fn mesh_interface_array(
        &mut self,
        name: &Identifier,
        qualifiers: &Qualifiers,
        ty: &mut Type,
    ) {
        if self.options.stage != Stage::Mesh
            || qualifiers.storage != Storage::Out
            || qualifiers.per_task
        {
            return;
        }
        if !ty.is_array() {
            if !name.node.starts_with("gl_") {
                self.error(
                    name.span,
                    DiagnosticKind::InvalidInterfaceArray {
                        name: name.node.clone(),
                        reason: "the type must be an array",
                    },
                );
            }
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
        if self.options.stage != Stage::Mesh {
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
            if let TypeKind::Block(id) = variable.ty.kind {
                if let Some(block) = self.types.block(id) {
                    if block.storage != BlockStorage::Out {
                        continue;
                    }
                    qualifiers.storage = Storage::Out;
                    qualifiers.per_primitive |= block.qualifiers.per_primitive;
                    qualifiers.per_task |= block.qualifiers.per_task;
                }
            }
            if qualifiers.storage != Storage::Out || qualifiers.per_task || !variable.ty.is_array()
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
        if !qualifiers.per_view || self.options.stage != Stage::Mesh {
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
        let stage = self.options.stage;
        match qualifiers.storage {
            Storage::In if stage == Stage::Mesh && !qualifiers.per_task => self.error(
                span,
                invalid("in", "input blocks cannot be used in a mesh shader"),
            ),
            Storage::Out if stage == Stage::Mesh && qualifiers.per_task => self.error(
                span,
                invalid("taskNV", "can only use on input blocks in mesh shader"),
            ),
            Storage::Out if stage == Stage::Task && !qualifiers.per_task => self.error(
                span,
                invalid("out", "output blocks cannot be used in a task shader"),
            ),
            _ => {}
        }
    }

    pub(crate) fn mesh_output_reads(&mut self, unit: &TranslationUnit) {
        if self.options.stage != Stage::Mesh || !self.mesh_ext() {
            return;
        }
        let expressions = rglsl_ast::expressions(unit);
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
                        block.storage == BlockStorage::Out && !block.qualifiers.per_task
                    }),
                    _ => {
                        variable.qualifiers.storage == Storage::Out && !variable.qualifiers.per_task
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
