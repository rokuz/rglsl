pub mod pipeline;
pub mod query;

use super::{Error, Writer};

impl Writer {
    pub(super) fn require_ray_queries(&mut self) -> Result<(), Error> {
        self.require_any("ray queries", &[spirv::Capability::RayQueryKHR])?;
        self.use_extension("SPV_KHR_ray_query");
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
