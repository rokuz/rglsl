use alloc::vec::Vec;

use super::{Block, BlockContext, Error, Instruction, Writer};
use crate::{
    GeometryInfo, GeometryInputPrimitive, GeometryOutputPrimitive, Handle, ShaderStage,
    TessellationInfo, TessellationPrimitive, TessellationSpacing, TessellationVertexOrder,
};
use spirv::{Capability, ExecutionMode, Word};

impl Writer {
    pub(super) fn require_layer_capability(
        &mut self,
        stage: ShaderStage,
        layer: bool,
    ) -> Result<(), Error> {
        match stage {
            ShaderStage::Geometry | ShaderStage::Fragment => {
                if layer {
                    self.require_any("`gl_Layer`", &[Capability::Geometry])
                } else {
                    self.require_any("`gl_ViewportIndex`", &[Capability::MultiViewport])
                }
            }
            ShaderStage::Vertex | ShaderStage::TessControl | ShaderStage::TessEvaluation => {
                if self.lang_version() >= (1, 5) {
                    if layer {
                        self.require_any("`gl_Layer`", &[Capability::ShaderLayer])
                    } else {
                        self.require_any("`gl_ViewportIndex`", &[Capability::ShaderViewportIndex])
                    }
                } else {
                    self.use_extension("SPV_EXT_shader_viewport_index_layer");
                    self.require_any(
                        "`gl_Layer` or `gl_ViewportIndex` before rasterization",
                        &[Capability::ShaderViewportIndexLayerEXT],
                    )
                }
            }
            ShaderStage::Mesh
            | ShaderStage::Task
            | ShaderStage::Compute
            | ShaderStage::RayGeneration
            | ShaderStage::AnyHit
            | ShaderStage::ClosestHit
            | ShaderStage::Miss
            | ShaderStage::Intersection
            | ShaderStage::Callable => Ok(()),
        }
    }

    fn write_mode(&mut self, function_id: Word, mode: ExecutionMode, operands: &[Word]) {
        Instruction::execution_mode(function_id, mode, operands)
            .to_words(&mut self.logical_layout.execution_modes);
    }

    pub(super) fn write_geometry_modes(
        &mut self,
        function_id: Word,
        info: Option<&GeometryInfo>,
    ) -> Result<(), Error> {
        self.require_any("geometry shaders", &[Capability::Geometry])?;
        let info = info.ok_or(Error::Validation(
            "a geometry entry point has no geometry info",
        ))?;
        let input = match info.input {
            GeometryInputPrimitive::Points => ExecutionMode::InputPoints,
            GeometryInputPrimitive::Lines => ExecutionMode::InputLines,
            GeometryInputPrimitive::LinesAdjacency => ExecutionMode::InputLinesAdjacency,
            GeometryInputPrimitive::Triangles => ExecutionMode::Triangles,
            GeometryInputPrimitive::TrianglesAdjacency => ExecutionMode::InputTrianglesAdjacency,
        };
        self.write_mode(function_id, input, &[]);
        self.write_mode(function_id, ExecutionMode::Invocations, &[info.invocations]);
        let output = match info.output {
            GeometryOutputPrimitive::Points => ExecutionMode::OutputPoints,
            GeometryOutputPrimitive::LineStrip => ExecutionMode::OutputLineStrip,
            GeometryOutputPrimitive::TriangleStrip => ExecutionMode::OutputTriangleStrip,
        };
        self.write_mode(function_id, output, &[]);
        self.write_mode(
            function_id,
            ExecutionMode::OutputVertices,
            &[info.max_vertices],
        );
        Ok(())
    }

    pub(super) fn write_tessellation_modes(
        &mut self,
        function_id: Word,
        info: Option<&TessellationInfo>,
    ) -> Result<(), Error> {
        self.require_any("tessellation shaders", &[Capability::Tessellation])?;
        let info = info.copied().unwrap_or_default();
        if let Some(vertices) = info.output_vertices {
            self.write_mode(function_id, ExecutionMode::OutputVertices, &[vertices]);
        }
        if let Some(primitive) = info.primitive {
            let mode = match primitive {
                TessellationPrimitive::Triangles => ExecutionMode::Triangles,
                TessellationPrimitive::Quads => ExecutionMode::Quads,
                TessellationPrimitive::Isolines => ExecutionMode::Isolines,
            };
            self.write_mode(function_id, mode, &[]);
        }
        if let Some(spacing) = info.spacing {
            let mode = match spacing {
                TessellationSpacing::Equal => ExecutionMode::SpacingEqual,
                TessellationSpacing::FractionalEven => ExecutionMode::SpacingFractionalEven,
                TessellationSpacing::FractionalOdd => ExecutionMode::SpacingFractionalOdd,
            };
            self.write_mode(function_id, mode, &[]);
        }
        if let Some(order) = info.vertex_order {
            let mode = match order {
                TessellationVertexOrder::Cw => ExecutionMode::VertexOrderCw,
                TessellationVertexOrder::Ccw => ExecutionMode::VertexOrderCcw,
            };
            self.write_mode(function_id, mode, &[]);
        }
        if info.point_mode {
            self.write_mode(function_id, ExecutionMode::PointMode, &[]);
        }
        Ok(())
    }

    pub(super) fn write_streams(
        &mut self,
        streams: &[(Handle<crate::GlobalVariable>, u32)],
    ) -> Result<(), Error> {
        if streams.is_empty() {
            return Ok(());
        }
        self.require_any("geometry streams", &[Capability::GeometryStreams])?;
        for &(handle, stream) in streams {
            let id = self.global_variables[handle].var_id;
            if id != 0 {
                self.decorate(id, spirv::Decoration::Stream, &[stream]);
            }
        }
        Ok(())
    }
}

impl Writer {
    pub(super) fn write_passthrough(
        &mut self,
        passthrough: &[Handle<crate::GlobalVariable>],
    ) -> Result<(), Error> {
        if passthrough.is_empty() {
            return Ok(());
        }
        self.require_any(
            "geometry shader passthrough",
            &[Capability::GeometryShaderPassthroughNV],
        )?;
        self.use_extension("SPV_NV_geometry_shader_passthrough");
        for &handle in passthrough {
            let id = self.global_variables[handle].var_id;
            if id != 0 {
                self.decorate(id, spirv::Decoration::PassthroughNV, &[]);
            }
        }
        Ok(())
    }
}

impl BlockContext<'_> {
    pub(super) fn write_primitive_operation(
        &mut self,
        block: &mut Block,
        emit: bool,
        stream: Option<u32>,
    ) -> Result<(), Error> {
        let instruction = match stream {
            None if emit => Instruction::new(spirv::Op::EmitVertex),
            None => Instruction::new(spirv::Op::EndPrimitive),
            Some(stream) => {
                self.writer
                    .require_any("geometry streams", &[Capability::GeometryStreams])?;
                let value = i32::try_from(stream)
                    .map_err(|_| Error::Validation("a geometry stream is out of range"))?;
                let id = self.writer.get_constant_scalar(crate::Literal::I32(value));
                let op = if emit {
                    spirv::Op::EmitStreamVertex
                } else {
                    spirv::Op::EndStreamPrimitive
                };
                let mut instruction = Instruction::new(op);
                instruction.add_operand(id);
                instruction
            }
        };
        block.body.push(instruction);
        Ok(())
    }
}

impl BlockContext<'_> {
    pub(super) fn write_mesh_function(
        &mut self,
        mut block: Block,
        function: &crate::MeshFunction,
    ) -> Result<Option<Block>, Error> {
        let mut operands = Vec::new();
        for operand in function.operands() {
            operands.push(self.cached.get(operand)?);
        }
        let op = match *function {
            crate::MeshFunction::SetMeshOutputs { .. } => spirv::Op::SetMeshOutputsEXT,
            crate::MeshFunction::EmitMeshTasks { .. } => spirv::Op::EmitMeshTasksEXT,
            crate::MeshFunction::WritePackedPrimitiveIndices { .. } => {
                spirv::Op::WritePackedPrimitiveIndices4x8NV
            }
        };
        let mut instruction = Instruction::new(op);
        for operand in operands {
            instruction.add_operand(operand);
        }
        if !function.is_terminator() {
            block.body.push(instruction);
            return Ok(Some(block));
        }
        let payload = self
            .ir_module
            .global_variables
            .iter()
            .find(|&(_, global)| global.space == crate::AddressSpace::TaskPayload)
            .map(|(handle, _)| self.writer.global_variables[handle].var_id)
            .filter(|&id| id != 0);
        if let Some(payload) = payload {
            instruction.add_operand(payload);
        }
        self.function.consume(block, instruction);
        Ok(None)
    }
}

impl Writer {
    pub(super) fn write_mesh_shader_modes(
        &mut self,
        function_id: Word,
        entry_point: &crate::EntryPoint,
    ) -> Result<spirv::ExecutionModel, Error> {
        let info = entry_point.mesh_shader.as_ref().ok_or(Error::Validation(
            "a GLSL mesh or task entry point has no mesh shader info",
        ))?;
        self.write_workgroup_size(function_id, entry_point)?;
        if let Some(output) = info.output {
            self.write_mode(
                function_id,
                ExecutionMode::OutputVertices,
                &[output.max_vertices],
            );
            self.write_mode(
                function_id,
                ExecutionMode::OutputPrimitivesEXT,
                &[output.max_primitives],
            );
            let topology = match output.topology {
                crate::MeshOutputTopology::Points => ExecutionMode::OutputPoints,
                crate::MeshOutputTopology::Lines => ExecutionMode::OutputLinesEXT,
                crate::MeshOutputTopology::Triangles => ExecutionMode::OutputTrianglesEXT,
            };
            self.write_mode(function_id, topology, &[]);
        }
        let nv = info.extension == crate::MeshShaderExtension::Nv;
        Ok(match (entry_point.stage, nv) {
            (ShaderStage::Task, false) => spirv::ExecutionModel::TaskEXT,
            (ShaderStage::Task, true) => spirv::ExecutionModel::TaskNV,
            (_, false) => spirv::ExecutionModel::MeshEXT,
            (_, true) => spirv::ExecutionModel::MeshNV,
        })
    }
}

impl Writer {
    pub(super) fn write_task_memory_member(
        &mut self,
        ir_module: &crate::Module,
        struct_id: Word,
        index: u32,
        member: &crate::StructMember,
    ) -> Result<(), Error> {
        self.annotations.push(Instruction::member_decorate(
            struct_id,
            index,
            spirv::Decoration::Offset,
            &[member.offset],
        ));
        self.annotations.push(Instruction::member_decorate(
            struct_id,
            index,
            spirv::Decoration::PerTaskNV,
            &[],
        ));
        self.plain_types.insert(struct_id, struct_id);
        let mut ty = member.ty;
        while let crate::TypeInner::Array { base, stride, .. } = ir_module.types[ty].inner {
            let id = self.get_handle_type_id(ty)?;
            self.plain_types.insert(id, id);
            if !self.laid_out_types.contains(ty) && self.task_memory_strides.insert(ty) {
                self.decorate(id, spirv::Decoration::ArrayStride, &[stride]);
            }
            ty = base;
        }
        Ok(())
    }
}
