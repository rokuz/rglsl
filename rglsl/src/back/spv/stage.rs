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
