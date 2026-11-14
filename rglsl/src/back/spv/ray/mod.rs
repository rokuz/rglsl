pub mod hit_object;
pub mod pipeline;
pub mod query;

use super::{Error, Writer, feature, grammar};

impl Writer {
    pub(super) fn require_hit_objects(
        &mut self,
        flavor: crate::HitObjectFlavor,
    ) -> Result<(), Error> {
        self.require(match flavor {
            crate::HitObjectFlavor::Nv => &feature::HIT_OBJECT_NV,
            crate::HitObjectFlavor::Ext => &feature::HIT_OBJECT_EXT,
        })
    }

    pub(super) fn require_ray_tracing(&mut self) -> Result<(), Error> {
        self.require(
            if self
                .ray_tracing_features
                .contains(crate::RayTracingFeatures::NV)
            {
                &feature::RAY_TRACING_NV
            } else {
                &feature::RAY_TRACING_KHR
            },
        )
    }
}

impl Writer {
    pub(super) fn write_ray_tracing_features(&mut self) -> Result<(), Error> {
        use crate::RayTracingFeatures as F;
        let features = self.ray_tracing_features;
        let pipeline = self.has_ray_tracing_pipeline;
        if pipeline && features.contains(F::CULL_MASK) {
            self.require(&feature::RAY_CULL_MASK)?;
        }
        if pipeline && features.contains(F::POSITION_FETCH) {
            self.require(&feature::RAY_TRACING_POSITION_FETCH)?;
        }
        if features.contains(F::PRIMITIVE_CULLING) {
            self.require_any(
                "ray primitive culling",
                &[spirv::Capability::RayTraversalPrimitiveCullingKHR],
            )?;
        }
        if features.contains(F::OPACITY_MICROMAP) {
            self.require(&feature::OPACITY_MICROMAP)?;
        }
        Ok(())
    }
}

impl Writer {
    pub(super) fn write_opacity_micromap_mode(
        &mut self,
        function_id: spirv::Word,
        entry_point: &crate::EntryPoint,
    ) -> Result<(), Error> {
        let Some(enable) = entry_point.opacity_micromap else {
            return Ok(());
        };
        let enable = self.written(enable)?;
        self.use_feature(&feature::OPACITY_MICROMAP_EXECUTION_MODE);
        let mut instruction = super::Instruction::new(spirv::Op::ExecutionModeId);
        instruction.add_operand(function_id);
        instruction.add_operand(grammar::execution_mode::OpacityMicromapIdKHR);
        instruction.add_operand(enable);
        instruction.to_words(&mut self.logical_layout.execution_modes);
        Ok(())
    }
}
