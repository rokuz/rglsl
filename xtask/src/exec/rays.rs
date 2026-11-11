use std::fmt::Write as _;

use spirv::{Op, StorageClass};

use super::data::Rng;
use super::glsl::{self, Types};
use super::harness::ShaderKind;
use super::reflect::{DataType, Reflection, Scalar, ScalarKind};

pub const LAUNCH_SIZE: u32 = 4;
pub const RECORDS: usize = 16;
pub const SCENE_TLAS: &str = "tlas";

const F32: Scalar = Scalar {
    kind: ScalarKind::Float,
    width: 32,
};
const U32: Scalar = Scalar {
    kind: ScalarKind::Uint,
    width: 32,
};
const I32: Scalar = Scalar {
    kind: ScalarKind::Sint,
    width: 32,
};

const PREAMBLE: &str = "#version 460\n#extension GL_EXT_ray_tracing : require\n";

pub const MISS_SHADER: &str =
    "#version 460\n#extension GL_EXT_ray_tracing : require\nvoid main() {}\n";
pub const HIT_SHADER: &str =
    "#version 460\n#extension GL_EXT_ray_tracing : require\nvoid main() {}\n";
pub const CALLABLE_SHADER: &str =
    "#version 460\n#extension GL_EXT_ray_tracing : require\nvoid main() {}\n";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Geometry {
    Triangles,
    Boxes,
}

impl Geometry {
    pub fn declarations(self) -> String {
        let geometry = match self {
            Self::Triangles => {
                "  GEOMETRY TRIANGLES\n    -1.0 -1.0 0.5\n    1.0 -1.0 0.5\n    0.0 1.0 0.5\n  END\n"
            }
            Self::Boxes => "  GEOMETRY AABBS\n    -0.5 -0.5 0.4 0.5 0.5 0.6\n  END\n",
        };
        format!(
            "ACCELERATION_STRUCTURE BOTTOM_LEVEL blas\n{geometry}END\nACCELERATION_STRUCTURE TOP_LEVEL {SCENE_TLAS}\n  BOTTOM_LEVEL_INSTANCE blas\n  END\nEND\n"
        )
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ShaderRef {
    Tested,
    Harness(usize),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Table {
    RayGeneration,
    Miss,
    Hit,
    Callable,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Group {
    pub name: &'static str,
    pub shaders: Vec<ShaderRef>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ShaderRecord {
    pub buffer: String,
    pub addresses: Vec<u32>,
}

impl ShaderRecord {
    fn script(&self) -> String {
        let mut out = format!(" SHADER_RECORD {}", self.buffer);
        for offset in &self.addresses {
            let _ = write!(out, " ACCELERATION_STRUCTURE {SCENE_TLAS} OFFSET {offset}");
        }
        out
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RayPipeline {
    pub groups: Vec<Group>,
    pub record: Option<(Table, ShaderRecord)>,
    pub recursion: u32,
}

impl RayPipeline {
    fn table(table: Table) -> (&'static str, &'static str, &'static str) {
        match table {
            Table::RayGeneration => ("sbt_raygen", "g_raygen", "g_raygen"),
            Table::Miss => ("sbt_miss", "g_miss", "g_miss_empty"),
            Table::Hit => ("sbt_hit", "g_hit", "g_hit_empty"),
            Table::Callable => ("sbt_call", "g_call", "g_call_empty"),
        }
    }

    pub fn script(&self, names: &dyn Fn(ShaderRef) -> String) -> String {
        let mut out = String::new();
        for group in &self.groups {
            let shaders: Vec<String> = group.shaders.iter().map(|s| names(*s)).collect();
            let _ = writeln!(out, "  SHADER_GROUP {} {}", group.name, shaders.join(" "));
        }
        for table in [
            Table::RayGeneration,
            Table::Miss,
            Table::Hit,
            Table::Callable,
        ] {
            let (name, first, rest) = Self::table(table);
            let _ = writeln!(out, "  SHADER_BINDING_TABLE {name}");
            let record = match &self.record {
                Some((t, record)) if *t == table => record.script(),
                _ => String::new(),
            };
            let _ = writeln!(out, "    {first}{record}");
            if table != Table::RayGeneration {
                for _ in 1..RECORDS {
                    let _ = writeln!(out, "    {rest}");
                }
            }
            out.push_str("  END\n");
        }
        if self.recursion > 1 {
            let _ = writeln!(out, "  MAX_RAY_RECURSION_DEPTH {}", self.recursion);
        }
        out
    }

    pub fn run(&self) -> String {
        format!(
            "RUN main RAYGEN sbt_raygen MISS sbt_miss HIT sbt_hit CALL sbt_call {LAUNCH_SIZE} {LAUNCH_SIZE} 1\n"
        )
    }
}

#[derive(Debug, Clone, PartialEq)]
pub struct RayHarness {
    pub pipeline: RayPipeline,
    pub shaders: Vec<(ShaderKind, String)>,
    pub geometry: Geometry,
    pub output: Option<DataType>,
}

pub fn traces(reflection: &Reflection) -> bool {
    [
        Op::TraceRayKHR,
        Op::TraceNV,
        Op::TraceRayMotionNV,
        Op::ExecuteCallableKHR,
        Op::ExecuteCallableNV,
    ]
    .into_iter()
    .any(|op| reflection.uses(op))
}

fn incoming(reflection: &Reflection, class: StorageClass) -> Result<DataType, String> {
    match reflection.ray_variable(class) {
        Some(variable) => variable.ty.clone(),
        None => Ok(DataType::Scalar(U32)),
    }
}

fn barycentrics() -> DataType {
    DataType::Vector {
        scalar: F32,
        count: 2,
    }
}

fn hit_info(attributes: Option<&DataType>) -> DataType {
    let mut members = vec![
        DataType::Scalar(F32),
        DataType::Scalar(U32),
        DataType::Scalar(I32),
    ];
    members.extend(attributes.cloned());
    DataType::Struct(members)
}

pub fn ray_generation(
    payload: &DataType,
    callable: bool,
    set: u32,
    rng: &mut Rng,
) -> Result<String, String> {
    let mut types = Types::default();
    let declarator = types.declarator(payload)?;
    let mut init = String::new();
    glsl::assign_literals("rglsl_payload", payload, rng, &mut init)?;
    let (storage, call) = if callable {
        (
            "callableDataEXT",
            "    executeCallableEXT(0, 0);\n".to_string(),
        )
    } else {
        (
            "rayPayloadEXT",
            "    traceRayEXT(rglsl_tlas, gl_RayFlagsNoneEXT, 0xff, 0, 0, 0, vec3(xy, 0.0), 0.0, vec3(0.0, 0.0, 1.0), 10.0, 0);\n"
                .to_string(),
        )
    };
    Ok(format!(
        "{PREAMBLE}{}{}layout(set = {set}, binding = 0) uniform accelerationStructureEXT rglsl_tlas;\nlayout(set = {set}, binding = 1, std430) buffer RglslOut {{\n    {};\n}};\nlayout(location = 0) {storage} {};\nvoid main() {{\n    uint index = gl_LaunchIDEXT.x + gl_LaunchIDEXT.y * gl_LaunchSizeEXT.x;\n    vec2 xy = (vec2(gl_LaunchIDEXT.xy) + 0.5) / vec2(gl_LaunchSizeEXT.xy) * 2.0 - 1.0;\n{init}{call}    rglsl_out[index] = rglsl_payload;\n}}\n",
        types.extensions(),
        types.definitions(),
        declarator.declare("rglsl_out[]"),
        declarator.declare("rglsl_payload"),
    ))
}

pub fn closest_hit_for_intersection(attributes: Option<&DataType>) -> Result<String, String> {
    let mut types = Types::default();
    let attribute = attributes.map(|a| types.declarator(a)).transpose()?;
    let payload = types.declarator(&hit_info(attributes))?;
    let mut body = String::from(
        "    rglsl_payload.m0 = gl_HitTEXT;\n    rglsl_payload.m1 = gl_HitKindEXT;\n    rglsl_payload.m2 = gl_PrimitiveID;\n",
    );
    let mut declarations = format!(
        "layout(location = 0) rayPayloadInEXT {};\n",
        payload.declare("rglsl_payload")
    );
    if let Some(attribute) = attribute {
        let _ = writeln!(
            declarations,
            "hitAttributeEXT {};",
            attribute.declare("rglsl_attributes")
        );
        body.push_str("    rglsl_payload.m3 = rglsl_attributes;\n");
    }
    Ok(format!(
        "{PREAMBLE}{}{}{declarations}void main() {{\n{body}}}\n",
        types.extensions(),
        types.definitions()
    ))
}

pub fn intersection_for_hit(attributes: &DataType, rng: &mut Rng) -> Result<String, String> {
    let mut types = Types::default();
    let declarator = types.declarator(attributes)?;
    let mut init = String::new();
    glsl::assign_literals("rglsl_attributes", attributes, rng, &mut init)?;
    Ok(format!(
        "{PREAMBLE}{}{}hitAttributeEXT {};\nvoid main() {{\n{init}    reportIntersectionEXT(0.5, 0u);\n}}\n",
        types.extensions(),
        types.definitions(),
        declarator.declare("rglsl_attributes")
    ))
}

fn empty_groups(miss: usize, hit: usize, call: usize) -> Vec<Group> {
    vec![
        Group {
            name: "g_miss_empty",
            shaders: vec![ShaderRef::Harness(miss)],
        },
        Group {
            name: "g_hit_empty",
            shaders: vec![ShaderRef::Harness(hit)],
        },
        Group {
            name: "g_call_empty",
            shaders: vec![ShaderRef::Harness(call)],
        },
    ]
}

fn empty_shaders() -> Vec<(ShaderKind, String)> {
    vec![
        (ShaderKind::Miss, MISS_SHADER.to_string()),
        (ShaderKind::ClosestHit, HIT_SHADER.to_string()),
        (ShaderKind::Callable, CALLABLE_SHADER.to_string()),
    ]
}

pub fn harness(
    stage: ShaderKind,
    reflection: &Reflection,
    set: u32,
    record: Option<ShaderRecord>,
    rng: &mut Rng,
) -> Result<RayHarness, String> {
    let recursion = if stage != ShaderKind::RayGeneration && traces(reflection) {
        2
    } else {
        1
    };
    if stage == ShaderKind::RayGeneration {
        let mut groups = vec![
            Group {
                name: "g_raygen",
                shaders: vec![ShaderRef::Tested],
            },
            Group {
                name: "g_miss",
                shaders: vec![ShaderRef::Harness(0)],
            },
            Group {
                name: "g_hit",
                shaders: vec![ShaderRef::Harness(1)],
            },
            Group {
                name: "g_call",
                shaders: vec![ShaderRef::Harness(2)],
            },
        ];
        groups.extend(empty_groups(0, 1, 2));
        return Ok(RayHarness {
            pipeline: RayPipeline {
                groups,
                record: record.map(|r| (Table::RayGeneration, r)),
                recursion,
            },
            shaders: empty_shaders(),
            geometry: Geometry::Triangles,
            output: None,
        });
    }
    let attributes = reflection
        .ray_variable(StorageClass::HitAttributeKHR)
        .map(|v| v.ty.clone())
        .transpose()?;
    let (payload, callable) = match stage {
        ShaderKind::Callable => (
            incoming(reflection, StorageClass::IncomingCallableDataKHR)?,
            true,
        ),
        ShaderKind::Intersection => (hit_info(attributes.as_ref()), false),
        _ => (
            incoming(reflection, StorageClass::IncomingRayPayloadKHR)?,
            false,
        ),
    };
    let mut shaders = vec![(
        ShaderKind::RayGeneration,
        ray_generation(&payload, callable, set, rng)?,
    )];
    shaders.extend(empty_shaders());
    let (miss, hit, call) = (1, 2, 3);
    let mut geometry = Geometry::Triangles;
    let mut tested_group = vec![ShaderRef::Tested];
    match stage {
        ShaderKind::Intersection => {
            geometry = Geometry::Boxes;
            shaders.push((
                ShaderKind::ClosestHit,
                closest_hit_for_intersection(attributes.as_ref())?,
            ));
            tested_group.insert(0, ShaderRef::Harness(shaders.len() - 1));
        }
        ShaderKind::ClosestHit | ShaderKind::AnyHit => {
            if let Some(attributes) = attributes.as_ref().filter(|a| **a != barycentrics()) {
                geometry = Geometry::Boxes;
                shaders.push((
                    ShaderKind::Intersection,
                    intersection_for_hit(attributes, rng)?,
                ));
                tested_group.push(ShaderRef::Harness(shaders.len() - 1));
            }
        }
        _ => {}
    }
    let group = |name, tested: bool, empty: usize| Group {
        name,
        shaders: if tested {
            tested_group.clone()
        } else {
            vec![ShaderRef::Harness(empty)]
        },
    };
    let mut groups = vec![
        Group {
            name: "g_raygen",
            shaders: vec![ShaderRef::Harness(0)],
        },
        group("g_miss", stage == ShaderKind::Miss, miss),
        group(
            "g_hit",
            matches!(
                stage,
                ShaderKind::ClosestHit | ShaderKind::AnyHit | ShaderKind::Intersection
            ),
            hit,
        ),
        group("g_call", stage == ShaderKind::Callable, call),
    ];
    groups.extend(empty_groups(miss, hit, call));
    let table = match stage {
        ShaderKind::Miss => Table::Miss,
        ShaderKind::Callable => Table::Callable,
        _ => Table::Hit,
    };
    Ok(RayHarness {
        pipeline: RayPipeline {
            groups,
            record: record.map(|r| (table, r)),
            recursion,
        },
        shaders,
        geometry,
        output: Some(payload),
    })
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::exec::reflect::RayVariable;
    use spirv::ExecutionModel;

    fn names(shader: ShaderRef) -> String {
        match shader {
            ShaderRef::Tested => "tested".into(),
            ShaderRef::Harness(index) => format!("harness{index}"),
        }
    }

    #[test]
    fn closest_hit_gets_a_typed_ray_generation() {
        let mut module = Reflection::new(ExecutionModel::ClosestHitKHR);
        module.ray_variables.push(RayVariable {
            class: StorageClass::IncomingRayPayloadKHR,
            location: 1,
            ty: Ok(DataType::Vector {
                scalar: F32,
                count: 4,
            }),
        });
        let harness = harness(
            ShaderKind::ClosestHit,
            &module,
            1,
            Some(ShaderRecord {
                buffer: "rec".into(),
                addresses: vec![8, 16],
            }),
            &mut Rng::new(3),
        )
        .unwrap();
        assert_eq!(harness.geometry, Geometry::Triangles);
        let (kind, rgen) = &harness.shaders[0];
        assert_eq!(*kind, ShaderKind::RayGeneration);
        assert!(rgen.contains(
            "layout(set = 1, binding = 1, std430) buffer RglslOut {\n    vec4 rglsl_out[];\n};"
        ));
        assert!(rgen.contains("layout(location = 0) rayPayloadEXT vec4 rglsl_payload;"));
        assert!(rgen.contains("    rglsl_payload = vec4("));
        assert!(rgen.contains("traceRayEXT(rglsl_tlas"));
        let script = harness.pipeline.script(&names);
        assert!(script.contains("  SHADER_GROUP g_raygen harness0\n"));
        assert!(script.contains("  SHADER_GROUP g_hit tested\n"));
        assert!(script.contains(
            "  SHADER_BINDING_TABLE sbt_hit\n    g_hit SHADER_RECORD rec ACCELERATION_STRUCTURE tlas OFFSET 8 ACCELERATION_STRUCTURE tlas OFFSET 16\n    g_hit_empty\n"
        ));
        assert_eq!(script.matches("    g_miss_empty\n").count(), RECORDS - 1);
        assert!(!script.contains("MAX_RAY_RECURSION_DEPTH"));
    }

    #[test]
    fn intersection_reports_into_a_generated_closest_hit() {
        let mut module = Reflection::new(ExecutionModel::IntersectionKHR);
        module.ray_variables.push(RayVariable {
            class: StorageClass::HitAttributeKHR,
            location: 0,
            ty: Ok(DataType::Vector {
                scalar: F32,
                count: 4,
            }),
        });
        let harness =
            harness(ShaderKind::Intersection, &module, 0, None, &mut Rng::new(3)).unwrap();
        assert_eq!(harness.geometry, Geometry::Boxes);
        assert_eq!(harness.shaders.len(), 5);
        let (kind, hit) = &harness.shaders[4];
        assert_eq!(*kind, ShaderKind::ClosestHit);
        assert!(hit.contains("hitAttributeEXT vec4 rglsl_attributes;"));
        assert!(hit.contains("rglsl_payload.m3 = rglsl_attributes;"));
        let script = harness.pipeline.script(&names);
        assert!(script.contains("  SHADER_GROUP g_hit harness4 tested\n"));
        assert!(harness.geometry.declarations().contains("GEOMETRY AABBS"));
    }

    #[test]
    fn hit_shaders_with_custom_attributes_get_an_intersection_shader() {
        let mut module = Reflection::new(ExecutionModel::AnyHitKHR);
        module.ray_variables.push(RayVariable {
            class: StorageClass::HitAttributeKHR,
            location: 0,
            ty: Ok(DataType::Vector {
                scalar: F32,
                count: 3,
            }),
        });
        module.body_opcodes.insert(Op::TraceRayKHR as u32);
        let harness = harness(ShaderKind::AnyHit, &module, 0, None, &mut Rng::new(3)).unwrap();
        assert_eq!(harness.geometry, Geometry::Boxes);
        let (kind, rint) = &harness.shaders[4];
        assert_eq!(*kind, ShaderKind::Intersection);
        assert!(rint.contains("reportIntersectionEXT(0.5, 0u);"));
        let script = harness.pipeline.script(&names);
        assert!(script.contains("  SHADER_GROUP g_hit tested harness4\n"));
        assert!(script.contains("  MAX_RAY_RECURSION_DEPTH 2\n"));
    }

    #[test]
    fn callable_data_flows_through_execute_callable() {
        let module = Reflection::new(ExecutionModel::CallableKHR);
        let harness = harness(ShaderKind::Callable, &module, 0, None, &mut Rng::new(3)).unwrap();
        assert!(harness.shaders[0]
            .1
            .contains("callableDataEXT uint rglsl_payload;"));
        assert!(harness.shaders[0].1.contains("executeCallableEXT(0, 0);"));
        assert_eq!(harness.output, Some(DataType::Scalar(U32)));
        assert!(harness.pipeline.run().contains("CALL sbt_call 4 4 1"));
    }
}
