use super::{LSS_ARRAY_LENGTH, ResolveContext, ResolveError, TypeResolution};

impl ResolveContext<'_> {
    fn f32_array(
        &self,
        size: Option<crate::VectorSize>,
        length: core::num::NonZeroU32,
    ) -> Result<TypeResolution, ResolveError> {
        self.special_types
            .predeclared_types
            .get(&crate::PredeclaredType::F32Array { size, length })
            .map(|&handle| TypeResolution::Handle(handle))
            .ok_or(ResolveError::MissingSpecialType)
    }

    pub(super) fn resolve_ray_query_get(
        &self,
        value: crate::RayQueryValue,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::RayQueryIntersectionValue as Iv;
        use crate::TypeInner as Ti;

        let vector = |size, scalar| Ti::Vector { size, scalar };
        let f32_3 = vector(crate::VectorSize::Tri, crate::Scalar::F32);
        let matrix = Ti::Matrix {
            columns: crate::VectorSize::Quad,
            rows: crate::VectorSize::Tri,
            scalar: crate::Scalar::F32,
        };
        Ok(match value {
            crate::RayQueryValue::RayFlags => TypeResolution::Value(Ti::Scalar(crate::Scalar::U32)),
            crate::RayQueryValue::RayTMin => TypeResolution::Value(Ti::Scalar(crate::Scalar::F32)),
            crate::RayQueryValue::WorldRayOrigin | crate::RayQueryValue::WorldRayDirection => {
                TypeResolution::Value(f32_3)
            }
            crate::RayQueryValue::CandidateAabbOpaque => {
                TypeResolution::Value(Ti::Scalar(crate::Scalar::BOOL))
            }
            crate::RayQueryValue::Intersection { value, .. } => match value {
                Iv::Type | Iv::InstanceShaderBindingTableRecordOffset => {
                    TypeResolution::Value(Ti::Scalar(crate::Scalar::U32))
                }
                Iv::T => TypeResolution::Value(Ti::Scalar(crate::Scalar::F32)),
                Iv::InstanceCustomIndex
                | Iv::InstanceId
                | Iv::GeometryIndex
                | Iv::PrimitiveIndex => TypeResolution::Value(Ti::Scalar(crate::Scalar::I32)),
                Iv::Barycentrics => {
                    TypeResolution::Value(vector(crate::VectorSize::Bi, crate::Scalar::F32))
                }
                Iv::FrontFace => TypeResolution::Value(Ti::Scalar(crate::Scalar::BOOL)),
                Iv::ObjectRayDirection | Iv::ObjectRayOrigin => TypeResolution::Value(f32_3),
                Iv::ObjectToWorld | Iv::WorldToObject => TypeResolution::Value(matrix),
                Iv::TriangleVertexPositions => TypeResolution::Handle(
                    self.special_types
                        .ray_vertex_return
                        .ok_or(ResolveError::MissingSpecialType)?,
                ),
                Iv::ClusterId => TypeResolution::Value(Ti::Scalar(crate::Scalar::I32)),
                Iv::SpherePosition => TypeResolution::Value(f32_3),
                Iv::SphereRadius | Iv::LssHitValue => {
                    TypeResolution::Value(Ti::Scalar(crate::Scalar::F32))
                }
                Iv::IsSphereHit | Iv::IsLssHit => {
                    TypeResolution::Value(Ti::Scalar(crate::Scalar::BOOL))
                }
                Iv::LssPositions => {
                    self.f32_array(Some(crate::VectorSize::Tri), LSS_ARRAY_LENGTH)?
                }
                Iv::LssRadii => self.f32_array(None, LSS_ARRAY_LENGTH)?,
            },
        })
    }

    pub(super) fn resolve_hit_object_get(
        &self,
        value: crate::HitObjectValue,
    ) -> Result<TypeResolution, ResolveError> {
        use crate::HitObjectValue as Hv;
        use crate::TypeInner as Ti;

        let scalar = |scalar| TypeResolution::Value(Ti::Scalar(scalar));
        let f32_3 = TypeResolution::Value(Ti::Vector {
            size: crate::VectorSize::Tri,
            scalar: crate::Scalar::F32,
        });
        Ok(match value {
            Hv::IsEmpty | Hv::IsHit | Hv::IsMiss | Hv::IsSphereHit | Hv::IsLssHit => {
                scalar(crate::Scalar::BOOL)
            }
            Hv::RayTMin | Hv::RayTMax | Hv::CurrentTime | Hv::SphereRadius => {
                scalar(crate::Scalar::F32)
            }
            Hv::RayFlags | Hv::HitKind | Hv::ShaderBindingTableRecordIndex => {
                scalar(crate::Scalar::U32)
            }
            Hv::InstanceCustomIndex
            | Hv::InstanceId
            | Hv::GeometryIndex
            | Hv::PrimitiveIndex
            | Hv::ClusterId => scalar(crate::Scalar::I32),
            Hv::WorldRayOrigin
            | Hv::WorldRayDirection
            | Hv::ObjectRayOrigin
            | Hv::ObjectRayDirection
            | Hv::SpherePosition => f32_3,
            Hv::ObjectToWorld | Hv::WorldToObject => TypeResolution::Value(Ti::Matrix {
                columns: crate::VectorSize::Quad,
                rows: crate::VectorSize::Tri,
                scalar: crate::Scalar::F32,
            }),
            Hv::ShaderRecordBufferHandle => TypeResolution::Value(Ti::Vector {
                size: crate::VectorSize::Bi,
                scalar: crate::Scalar::U32,
            }),
            Hv::LssPositions => self.f32_array(Some(crate::VectorSize::Tri), LSS_ARRAY_LENGTH)?,
            Hv::LssRadii => self.f32_array(None, LSS_ARRAY_LENGTH)?,
            Hv::TriangleVertexPositions => TypeResolution::Handle(
                self.special_types
                    .ray_vertex_return
                    .ok_or(ResolveError::MissingSpecialType)?,
            ),
        })
    }

    pub(super) const fn resolve_fetch_micro_triangle_vertex(
        value: crate::MicroTriangleVertexValue,
    ) -> TypeResolution {
        let size = match value {
            crate::MicroTriangleVertexValue::Position => crate::VectorSize::Tri,
            crate::MicroTriangleVertexValue::Barycentric => crate::VectorSize::Bi,
        };
        TypeResolution::Value(crate::TypeInner::Vector {
            size,
            scalar: crate::Scalar::F32,
        })
    }
}
