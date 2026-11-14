use super::super::ShaderStages;
use super::{ExpressionError, ExpressionTypeResolver};
use crate::arena::Handle;

impl super::super::Validator {
    pub(super) fn validate_ray_query_get(
        query: Handle<crate::Expression>,
        value: crate::RayQueryValue,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        let is_query = if let Ti::Pointer { base, .. } = *resolver.resolve(query)? {
            matches!(resolver.types[base].inner, Ti::RayQuery)
        } else {
            false
        };
        if !is_query {
            return Err(ExpressionError::InvalidRayQueryType(query));
        }
        if let crate::RayQueryValue::Intersection {
            value: crate::RayQueryIntersectionValue::TriangleVertexPositions,
            ..
        } = value
            && module.special_types.ray_vertex_return.is_none()
        {
            return Err(ExpressionError::InvalidRayQueryType(query));
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_hit_object_get(
        object: Handle<crate::Expression>,
        value: crate::HitObjectValue,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{HitObjectValue as Hv, TypeInner as Ti};

        let flavor = if let Ti::Pointer { base, .. } = *resolver.resolve(object)?
            && let Ti::HitObject { flavor } = resolver.types[base].inner
        {
            Some(flavor)
        } else {
            None
        };
        let Some(flavor) = flavor else {
            return Err(ExpressionError::InvalidHitObjectType(object));
        };
        let required = match value {
            Hv::ClusterId
            | Hv::SpherePosition
            | Hv::SphereRadius
            | Hv::LssPositions
            | Hv::LssRadii
            | Hv::IsSphereHit
            | Hv::IsLssHit => Some(crate::HitObjectFlavor::Nv),
            Hv::RayFlags | Hv::TriangleVertexPositions => Some(crate::HitObjectFlavor::Ext),
            Hv::IsEmpty
            | Hv::IsHit
            | Hv::IsMiss
            | Hv::RayTMin
            | Hv::RayTMax
            | Hv::WorldRayOrigin
            | Hv::WorldRayDirection
            | Hv::ObjectRayOrigin
            | Hv::ObjectRayDirection
            | Hv::ObjectToWorld
            | Hv::WorldToObject
            | Hv::InstanceCustomIndex
            | Hv::InstanceId
            | Hv::GeometryIndex
            | Hv::PrimitiveIndex
            | Hv::HitKind
            | Hv::CurrentTime
            | Hv::ShaderBindingTableRecordIndex
            | Hv::ShaderRecordBufferHandle => None,
        };
        if required.is_some_and(|required| required != flavor) {
            return Err(ExpressionError::InvalidHitObjectType(object));
        }
        Ok(ShaderStages::RAY_GENERATION | ShaderStages::CLOSEST_HIT | ShaderStages::MISS)
    }

    pub(super) fn validate_fetch_micro_triangle_vertex(
        acceleration_structure: Handle<crate::Expression>,
        instance_id: Handle<crate::Expression>,
        geometry_index: Handle<crate::Expression>,
        primitive_index: Handle<crate::Expression>,
        barycentric: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{Scalar as Sc, TypeInner as Ti};

        if !matches!(
            *resolver.resolve(acceleration_structure)?,
            Ti::AccelerationStructure
        ) {
            return Err(ExpressionError::InvalidMicroTriangleOperand(
                acceleration_structure,
            ));
        }
        for index in [instance_id, geometry_index, primitive_index] {
            if *resolver.resolve(index)? != Ti::Scalar(Sc::I32) {
                return Err(ExpressionError::InvalidMicroTriangleOperand(index));
            }
        }
        if *resolver.resolve(barycentric)?
            != (Ti::Vector {
                size: crate::VectorSize::Bi,
                scalar: Sc::I32,
            })
        {
            return Err(ExpressionError::InvalidMicroTriangleOperand(barycentric));
        }
        Ok(ShaderStages::RAY_GENERATION | ShaderStages::COMPUTE | ShaderStages::MESH)
    }

    pub(super) fn validate_acceleration_structure_from_address(
        address: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        if !matches!(
            *resolver.resolve(address)?,
            Ti::Scalar(crate::Scalar::U64)
                | Ti::Vector {
                    size: crate::VectorSize::Bi,
                    scalar: crate::Scalar::U32,
                }
        ) {
            return Err(ExpressionError::InvalidAccelerationStructureAddress(
                address,
            ));
        }
        Ok(ShaderStages::all())
    }
}
