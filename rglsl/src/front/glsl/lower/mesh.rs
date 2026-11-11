use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::scope::{Qualifiers, Storage};
use rglsl_sema::SymbolId;

use super::function::FunctionLowerer;
use super::{internal, semantic, GlobalRef, Lowerer, Result};
use crate::{
    AddressSpace, Binding, BuiltIn, GlobalVariable, MemoryDecorations, MeshFunction,
    MeshOutputLayout, MeshOutputTopology, MeshShaderExtension, MeshShaderInfo, ShaderStage, Span,
    Statement, TypeInner,
};

pub(super) const MESH_EXT: &str = "GL_EXT_mesh_shader";
pub(super) const MESH_NV: &str = "GL_NV_mesh_shader";

pub(super) const MESH_BLOCKS: [&str; 4] = [
    "gl_MeshPerVertexNV",
    "gl_MeshPerPrimitiveNV",
    "gl_MeshPerVertexEXT",
    "gl_MeshPerPrimitiveEXT",
];

pub(super) const fn mesh_topology(name: &str) -> Option<MeshOutputTopology> {
    Some(match name.as_bytes() {
        b"points" => MeshOutputTopology::Points,
        b"lines" => MeshOutputTopology::Lines,
        b"triangles" => MeshOutputTopology::Triangles,
        _ => return None,
    })
}

pub(super) fn mesh_builtin(name: &str) -> Option<BuiltIn> {
    Some(match name {
        "gl_CullPrimitiveEXT" => BuiltIn::CullPrimitive,
        "gl_PrimitiveShadingRateEXT" => BuiltIn::PrimitiveShadingRate,
        "gl_ViewportMask" => BuiltIn::ViewportMaskNV,
        "gl_PositionPerViewNV" => BuiltIn::PositionPerViewNV,
        "gl_ClipDistancePerViewNV" => BuiltIn::ClipDistancePerViewNV,
        "gl_CullDistancePerViewNV" => BuiltIn::CullDistancePerViewNV,
        "gl_LayerPerViewNV" => BuiltIn::LayerPerViewNV,
        "gl_ViewportMaskPerViewNV" => BuiltIn::ViewportMaskPerViewNV,
        "gl_PrimitiveCountNV" => BuiltIn::PrimitiveCountNV,
        "gl_PrimitiveIndicesNV" => BuiltIn::PrimitiveIndicesNV,
        "gl_PrimitivePointIndicesEXT" => BuiltIn::PointIndex,
        "gl_PrimitiveLineIndicesEXT" => BuiltIn::LineIndices,
        "gl_PrimitiveTriangleIndicesEXT" => BuiltIn::TriangleIndices,
        "gl_MeshViewCountNV" => BuiltIn::MeshViewCountNV,
        "gl_MeshViewIndicesNV" => BuiltIn::MeshViewIndicesNV,
        "gl_TaskCountNV" => BuiltIn::TaskCountNV,
        "gl_ViewIndex" => BuiltIn::ViewIndex,
        "gl_DrawIDARB" => BuiltIn::DrawIndex,
        _ => return None,
    })
}

impl Lowerer<'_> {
    pub(super) fn mesh_extension(&self) -> MeshShaderExtension {
        if self.analysis.extensions.contains(MESH_EXT) {
            MeshShaderExtension::Ext
        } else {
            MeshShaderExtension::Nv
        }
    }

    pub(super) fn per_primitive_binding(&self, qualifiers: &Qualifiers) -> bool {
        qualifiers.per_primitive
            && match self.options.stage {
                ShaderStage::Mesh => qualifiers.storage == Storage::Out,
                ShaderStage::Fragment => qualifiers.storage == Storage::In,
                _ => false,
            }
    }

    pub(super) fn member_location_count(&self, member: &crate::StructMember) -> u32 {
        let ty = match (&member.binding, &self.module.types[member.ty].inner) {
            (&Some(Binding::Location { per_view: true, .. }), &TypeInner::Array { base, .. }) => {
                base
            }
            _ => member.ty,
        };
        super::globals::location_count(&self.module, ty)
    }

    pub(super) fn task_payload_variable(
        &mut self,
        symbol: SymbolId,
        name: String,
        at: Span,
    ) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let ty = self.ir_type(&variable.ty, at)?;
        if self.task_payload.is_some() {
            return Err(semantic(
                "only one taskPayloadSharedEXT variable can be declared",
                at,
            ));
        }
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::TaskPayload,
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
            },
            at,
        );
        self.task_payload = Some(handle);
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
    }

    pub(super) fn mesh_shader_info(&self) -> Option<MeshShaderInfo> {
        let extension = self.mesh_extension();
        match self.options.stage {
            ShaderStage::Task => Some(MeshShaderInfo {
                extension,
                output: None,
                task_memory: self.task_memory.clone(),
            }),
            ShaderStage::Mesh => {
                let layout = &self.stage_layout;
                Some(MeshShaderInfo {
                    extension,
                    output: match (layout.mesh_topology, layout.vertices, layout.primitives) {
                        (Some(topology), Some(max_vertices), Some(max_primitives)) => {
                            Some(MeshOutputLayout {
                                topology,
                                max_vertices,
                                max_primitives,
                            })
                        }
                        _ if self.object => None,
                        _ => return None,
                    },
                    task_memory: self.task_memory.clone(),
                })
            }
            ShaderStage::Fragment => {
                let per_primitive = |binding: Option<&Binding>| {
                    matches!(
                        binding,
                        Some(&Binding::Location {
                            per_primitive: true,
                            ..
                        })
                    )
                };
                let used = self.interface.iter().any(|&handle| {
                    let global = &self.module.global_variables[handle];
                    per_primitive(global.io.as_ref())
                        || match crate::proc::interface_block(&self.module.types, global.ty) {
                            Some(block) => match self.module.types[block.structure].inner {
                                TypeInner::Struct { ref members, .. } => members
                                    .iter()
                                    .any(|member| per_primitive(member.binding.as_ref())),
                                _ => false,
                            },
                            None => false,
                        }
                });
                used.then(|| MeshShaderInfo {
                    extension: if self.analysis.extensions.contains(MESH_NV) {
                        MeshShaderExtension::Nv
                    } else {
                        MeshShaderExtension::Ext
                    },
                    output: None,
                    task_memory: Vec::new(),
                })
            }
            _ => None,
        }
    }
}

impl FunctionLowerer<'_, '_> {
    pub(super) fn mesh_statement(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<()> {
        let mut values = Vec::with_capacity(arguments.len());
        for argument in arguments {
            values.push(self.rvalue(argument)?);
        }
        let function = match (name, values.as_slice()) {
            ("SetMeshOutputsEXT", &[vertex_count, primitive_count]) => {
                MeshFunction::SetMeshOutputs {
                    vertex_count,
                    primitive_count,
                }
            }
            ("EmitMeshTasksEXT", &[x, y, z]) => MeshFunction::EmitMeshTasks {
                group_count: [x, y, z],
            },
            ("writePackedPrimitiveIndices4x8NV", &[index_offset, packed_indices]) => {
                MeshFunction::WritePackedPrimitiveIndices {
                    index_offset,
                    packed_indices,
                }
            }
            _ => return Err(internal(at)),
        };
        self.push(Statement::MeshFunction(function), at);
        Ok(())
    }
}
