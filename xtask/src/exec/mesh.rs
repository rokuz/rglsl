use super::data::Rng;
use super::glsl::{self, Types};
use super::reflect::{DataType, Interpolation, Scalar, ScalarKind, Varying, VaryingType};

const PREAMBLE: &str = "#version 460\n#extension GL_EXT_mesh_shader : require\n";

pub fn task_for_mesh(payload: Option<&DataType>, rng: &mut Rng) -> Result<String, String> {
    let mut types = Types::default();
    let mut declarations = String::new();
    let mut init = String::new();
    if let Some(payload) = payload {
        let declarator = types.declarator(payload)?;
        declarations = format!(
            "taskPayloadSharedEXT {};\n",
            declarator.declare("rglsl_payload")
        );
        glsl::assign_literals("rglsl_payload", payload, rng, &mut init)?;
    }
    Ok(format!(
        "{PREAMBLE}{}{}layout(local_size_x = 1) in;\n{declarations}void main() {{\n{init}    EmitMeshTasksEXT(1u, 1u, 1u);\n}}\n",
        types.extensions(),
        types.definitions()
    ))
}

pub const MESH_FOR_TASK: &str = "#version 460
#extension GL_EXT_mesh_shader : require
layout(local_size_x = 1) in;
layout(triangles, max_vertices = 3, max_primitives = 1) out;
layout(location = 0) flat out uint v0[];
void main() {
    uint id = gl_WorkGroupID.x + gl_WorkGroupID.y * 8u + gl_WorkGroupID.z * 64u;
    vec2 corner = vec2(float(id % 8u), float((id / 8u) % 8u)) * 0.25 - 1.0;
    SetMeshOutputsEXT(3u, 1u);
    gl_MeshVerticesEXT[0].gl_Position = vec4(corner, 0.5, 1.0);
    gl_MeshVerticesEXT[1].gl_Position = vec4(corner + vec2(0.25, 0.0), 0.5, 1.0);
    gl_MeshVerticesEXT[2].gl_Position = vec4(corner + vec2(0.0, 0.25), 0.5, 1.0);
    v0[0] = id + 1u;
    v0[1] = id + 1u;
    v0[2] = id + 1u;
    gl_PrimitiveTriangleIndicesEXT[0] = uvec3(0u, 1u, 2u);
}
";

pub const MESH_FOR_TASK_NV: &str = "#version 460
#extension GL_NV_mesh_shader : require
layout(local_size_x = 1) in;
layout(triangles, max_vertices = 3, max_primitives = 1) out;
layout(location = 0) flat out uint v0[];
void main() {
    uint id = gl_WorkGroupID.x;
    vec2 corner = vec2(float(id % 8u), float((id / 8u) % 8u)) * 0.25 - 1.0;
    gl_PrimitiveCountNV = 1u;
    gl_MeshVerticesNV[0].gl_Position = vec4(corner, 0.5, 1.0);
    gl_MeshVerticesNV[1].gl_Position = vec4(corner + vec2(0.25, 0.0), 0.5, 1.0);
    gl_MeshVerticesNV[2].gl_Position = vec4(corner + vec2(0.0, 0.25), 0.5, 1.0);
    v0[0] = id + 1u;
    v0[1] = id + 1u;
    v0[2] = id + 1u;
    gl_PrimitiveIndicesNV[0] = 0u;
    gl_PrimitiveIndicesNV[1] = 1u;
    gl_PrimitiveIndicesNV[2] = 2u;
}
";

pub fn mesh_for_task_outputs() -> Vec<Varying> {
    vec![Varying {
        location: 0,
        component: 0,
        ty: VaryingType::Simple {
            scalar: Scalar {
                kind: ScalarKind::Uint,
                width: 32,
            },
            count: 1,
        },
        array: None,
        interpolation: Interpolation::Flat,
        centroid: false,
        sample: false,
        patch: false,
        per_primitive: false,
    }]
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn task_writes_the_mesh_payload() -> anyhow::Result<()> {
        let payload = DataType::Struct(vec![
            DataType::Array {
                element: Box::new(DataType::Scalar(Scalar {
                    kind: ScalarKind::Float,
                    width: 32,
                })),
                length: 2,
            },
            DataType::Vector {
                scalar: Scalar {
                    kind: ScalarKind::Float,
                    width: 32,
                },
                count: 4,
            },
        ]);
        let source = task_for_mesh(Some(&payload), &mut Rng::new(5)).map_err(anyhow::Error::msg)?;
        assert!(source.contains("taskPayloadSharedEXT RglslStruct0 rglsl_payload;"));
        assert!(source.contains("    rglsl_payload.m0[1] = "));
        assert!(source.contains("    rglsl_payload.m1 = vec4("));
        assert!(source.ends_with("    EmitMeshTasksEXT(1u, 1u, 1u);\n}\n"));
        let empty = task_for_mesh(None, &mut Rng::new(5)).map_err(anyhow::Error::msg)?;
        assert!(!empty.contains("taskPayloadSharedEXT"));
        Ok(())
    }

    #[test]
    fn mesh_for_task_marks_each_workgroup() {
        assert!(MESH_FOR_TASK.contains("SetMeshOutputsEXT(3u, 1u);"));
        assert_eq!(mesh_for_task_outputs().len(), 1);
    }
}
