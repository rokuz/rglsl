use alloc::string::String;
use alloc::vec::Vec;
use rglsl_sema::scope::QualifierFlags;
use rglsl_types::extension::Extension;

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::builtins::kind::Mesh;
use rglsl_sema::scope::{Qualifiers, Storage};
use rglsl_sema::{LayoutId, SymbolId};

use super::function::FunctionLowerer;
use super::{GlobalRef, Lowerer, Result, internal, semantic};
use crate::{
    AddressSpace, Binding, GlobalVariable, MemoryDecorations, MeshFlavor, MeshFunction,
    MeshOutputLayout, MeshOutputTopology, MeshShaderInfo, ShaderStage, Span, Statement, TypeInner,
};

pub(super) const fn mesh_topology(id: LayoutId) -> Option<MeshOutputTopology> {
    Some(match id {
        LayoutId::Points => MeshOutputTopology::Points,
        LayoutId::Lines => MeshOutputTopology::Lines,
        LayoutId::Triangles => MeshOutputTopology::Triangles,
        _ => return None,
    })
}

impl Lowerer<'_> {
    pub(super) const fn mesh_flavor(&self) -> MeshFlavor {
        if self.analysis.extensions.contains(Extension::ExtMeshShader) {
            MeshFlavor::Ext
        } else {
            MeshFlavor::Nv
        }
    }

    pub(super) fn per_primitive_binding(&self, qualifiers: &Qualifiers) -> bool {
        qualifiers.flags.contains(QualifierFlags::PER_PRIMITIVE)
            && match self.stage() {
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
                block: None,
            },
            at,
        );
        self.task_payload = Some(handle);
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
    }

    pub(super) fn mesh_shader_info(&self) -> Option<MeshShaderInfo> {
        let flavor = self.mesh_flavor();
        match self.stage() {
            ShaderStage::Task => Some(MeshShaderInfo {
                flavor,
                output: None,
                task_memory: self.task_memory.clone(),
            }),
            ShaderStage::Mesh => {
                let layout = &self.stage_layout;
                Some(MeshShaderInfo {
                    flavor,
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
                    flavor: if self.analysis.extensions.contains(Extension::NvMeshShader) {
                        MeshFlavor::Nv
                    } else {
                        MeshFlavor::Ext
                    },
                    output: None,
                    task_memory: Vec::new(),
                })
            }
            _ => None,
        }
    }
}

impl FunctionLowerer<'_, '_> {}

impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    pub(super) async fn mesh_statement(
        self,
        mesh: Mesh,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<()> {
        let mut values = Vec::with_capacity(arguments.len());
        for argument in arguments {
            values.push({
                let frame = self.clone().rvalue(argument);
                self.nest(frame).await
            }?);
        }
        let function = match (mesh, values.as_slice()) {
            (Mesh::SetOutputs, &[vertex_count, primitive_count]) => MeshFunction::SetMeshOutputs {
                vertex_count,
                primitive_count,
            },
            (Mesh::EmitTasks, &[x, y, z]) => MeshFunction::EmitMeshTasks {
                group_count: [x, y, z],
            },
            (Mesh::WritePackedPrimitiveIndices, &[index_offset, packed_indices]) => {
                MeshFunction::WritePackedPrimitiveIndices {
                    index_offset,
                    packed_indices,
                }
            }
            (Mesh::SetOutputs | Mesh::EmitTasks | Mesh::WritePackedPrimitiveIndices, _) => {
                return Err(internal(at));
            }
        };
        self.with(|this| this.push(Statement::MeshFunction(function), at))?;
        Ok(())
    }
}
