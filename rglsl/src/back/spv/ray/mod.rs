pub mod hit_object;
pub mod pipeline;
pub mod query;

use super::{Error, Writer};

impl Writer {
    pub(super) fn require_ray_queries(&mut self) -> Result<(), Error> {
        self.require_any("ray queries", &[spirv::Capability::RayQueryKHR])?;
        self.use_extension("SPV_KHR_ray_query");
        Ok(())
    }

    pub(super) fn require_hit_objects(&mut self, kind: crate::HitObjectKind) -> Result<(), Error> {
        match kind {
            crate::HitObjectKind::Nv => {
                self.require_any(
                    "hit objects",
                    &[spirv::Capability::ShaderInvocationReorderNV],
                )?;
                self.use_extension("SPV_NV_shader_invocation_reorder");
            }
            crate::HitObjectKind::Ext => {
                self.require_any(
                    "hit objects",
                    &[spirv::Capability::ShaderInvocationReorderEXT],
                )?;
                self.use_extension("SPV_EXT_shader_invocation_reorder");
            }
        }
        Ok(())
    }

    pub(super) fn require_cluster_acceleration_structure(&mut self) -> Result<(), Error> {
        self.require_any(
            "cluster acceleration structures",
            &[spirv::Capability::RayTracingClusterAccelerationStructureNV],
        )?;
        self.use_extension("SPV_NV_cluster_acceleration_structure");
        Ok(())
    }

    pub(super) fn require_sphere_geometry(&mut self) -> Result<(), Error> {
        self.require_any(
            "sphere geometry",
            &[spirv::Capability::RayTracingSpheresGeometryNV],
        )?;
        self.use_extension("SPV_NV_linear_swept_spheres");
        Ok(())
    }

    pub(super) fn require_lss_geometry(&mut self) -> Result<(), Error> {
        self.require_any(
            "linear swept sphere geometry",
            &[spirv::Capability::RayTracingLinearSweptSpheresGeometryNV],
        )?;
        self.use_extension("SPV_NV_linear_swept_spheres");
        Ok(())
    }

    pub(super) fn require_ray_tracing(&mut self) -> Result<(), Error> {
        if self
            .ray_tracing_features
            .contains(crate::RayTracingFeatures::NV)
        {
            self.require_any("ray tracing pipelines", &[spirv::Capability::RayTracingNV])?;
            self.use_extension("SPV_NV_ray_tracing");
        } else {
            self.require_any("ray tracing pipelines", &[spirv::Capability::RayTracingKHR])?;
            self.use_extension("SPV_KHR_ray_tracing");
        }
        Ok(())
    }
}

impl Writer {
    pub(super) fn write_ray_tracing_features(&mut self) -> Result<(), Error> {
        use crate::RayTracingFeatures as F;
        let features = self.ray_tracing_features;
        let pipeline = self.has_ray_tracing_pipeline;
        if pipeline && features.contains(F::CULL_MASK) {
            self.require_any("ray cull mask", &[spirv::Capability::RayCullMaskKHR])?;
            self.use_extension("SPV_KHR_ray_cull_mask");
        }
        if pipeline && features.contains(F::POSITION_FETCH) {
            self.require_any(
                "ray tracing position fetch",
                &[spirv::Capability::RayTracingPositionFetchKHR],
            )?;
            self.use_extension("SPV_KHR_ray_tracing_position_fetch");
        }
        if features.contains(F::PRIMITIVE_CULLING) {
            self.require_any(
                "ray primitive culling",
                &[spirv::Capability::RayTraversalPrimitiveCullingKHR],
            )?;
        }
        if features.contains(F::OPACITY_MICROMAP) {
            self.require_any(
                "opacity micromaps",
                &[spirv::Capability::RayTracingOpacityMicromapEXT],
            )?;
            self.use_extension("SPV_EXT_opacity_micromap");
        }
        Ok(())
    }
}

const OPACITY_MICROMAP_ID: spirv::Word = 6031;
const OPACITY_MICROMAP_EXECUTION_MODE: spirv::Word = 6032;

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
        self.raw_capabilities
            .insert(OPACITY_MICROMAP_EXECUTION_MODE);
        self.use_extension("SPV_KHR_opacity_micromap");
        let mut instruction = super::Instruction::new(spirv::Op::ExecutionModeId);
        instruction.add_operand(function_id);
        instruction.add_operand(OPACITY_MICROMAP_ID);
        instruction.add_operand(enable);
        instruction.to_words(&mut self.logical_layout.execution_modes);
        Ok(())
    }
}
