use std::collections::BTreeSet;
use std::fmt::Write as _;

use spirv::{Capability, Op, StorageClass};

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

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Api {
    Khr,
    Nv,
}

impl Api {
    pub fn of(reflection: &Reflection) -> Self {
        if reflection.capabilities.contains(&Capability::RayTracingNV) {
            Self::Nv
        } else {
            Self::Khr
        }
    }

    const fn preamble(self) -> &'static str {
        match self {
            Self::Khr => "#version 460\n#extension GL_EXT_ray_tracing : require\n",
            Self::Nv => "#version 460\n#extension GL_NV_ray_tracing : require\n",
        }
    }

    const fn suffix(self) -> &'static str {
        match self {
            Self::Khr => "EXT",
            Self::Nv => "NV",
        }
    }

    pub fn empty_shader(self) -> String {
        format!("{}void main() {{}}\n", self.preamble())
    }

    fn trace(self, hit: usize, miss: usize) -> String {
        let call = match self {
            Self::Khr => "traceRayEXT",
            Self::Nv => "traceNV",
        };
        format!(
            "    {call}(rglsl_tlas, gl_RayFlagsNone{}, 0xff, {hit}, 0, {miss}, vec3(xy, 0.0), 0.0, vec3(0.0, 0.0, 1.0), 10.0, 0);\n",
            self.suffix()
        )
    }

    fn execute(self, call: usize) -> String {
        format!("    executeCallable{}({call}, 0);\n", self.suffix())
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Geometry {
    Triangles,
    Boxes,
}

impl Geometry {
    pub fn declarations(self, api: Api, motion: bool) -> String {
        let geometry = match self {
            Self::Triangles => {
                "  GEOMETRY TRIANGLES\n    -1.0 -1.0 0.5\n    1.0 -1.0 0.5\n    0.0 1.0 0.5\n  END\n"
            }
            Self::Boxes => "  GEOMETRY AABBS\n    -0.5 -0.5 0.4 0.5 0.5 0.6\n  END\n",
        };
        let mut options = String::new();
        if api == Api::Nv {
            options.push_str("  API NV\n");
        }
        if motion {
            options.push_str("  MOTION\n");
        }
        format!(
            "ACCELERATION_STRUCTURE BOTTOM_LEVEL blas\n{geometry}END\nACCELERATION_STRUCTURE TOP_LEVEL {SCENE_TLAS}\n{options}  BOTTOM_LEVEL_INSTANCE blas\n  END\nEND\n"
        )
    }
}

pub fn motion(reflection: &Reflection) -> bool {
    reflection
        .capabilities
        .contains(&Capability::RayTracingMotionBlurNV)
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

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct Slots {
    pub miss: usize,
    pub hit: usize,
    pub call: usize,
}

impl Slots {
    fn of(stage: ShaderKind, reflection: &Reflection) -> Self {
        let free = |used: &BTreeSet<u32>| {
            (0..RECORDS)
                .find(|slot| u32::try_from(*slot).is_ok_and(|slot| !used.contains(&slot)))
                .unwrap_or(0)
        };
        let indices = &reflection.ray_indices;
        let mut slots = Self::default();
        match stage {
            ShaderKind::Miss => slots.miss = free(&indices.misses),
            ShaderKind::ClosestHit | ShaderKind::AnyHit | ShaderKind::Intersection => {
                slots.hit = free(&indices.hit_offsets);
            }
            ShaderKind::Callable => slots.call = free(&indices.callables),
            _ => {}
        }
        slots
    }

    const fn get(self, table: Table) -> usize {
        match table {
            Table::RayGeneration => 0,
            Table::Miss => self.miss,
            Table::Hit => self.hit,
            Table::Callable => self.call,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct RayPipeline {
    pub groups: Vec<Group>,
    pub record: Option<(Table, String)>,
    pub recursion: u32,
    pub slots: Slots,
    pub api: Api,
    pub motion: bool,
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
        if self.api == Api::Nv {
            out.push_str("  API NV\n");
        }
        if self.motion {
            out.push_str("  FLAGS ALLOW_MOTION\n");
        }
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
                Some((t, buffer)) if *t == table => format!(" SHADER_RECORD {buffer}"),
                _ => String::new(),
            };
            let count = if table == Table::RayGeneration {
                1
            } else {
                RECORDS
            };
            for slot in 0..count {
                if slot == self.slots.get(table) {
                    let _ = writeln!(out, "    {first}{record}");
                } else {
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
    api: Api,
    slots: Slots,
    rng: &mut Rng,
) -> Result<String, String> {
    let mut types = Types::default();
    let declarator = types.declarator(payload)?;
    let mut init = String::new();
    glsl::assign_literals("rglsl_payload", payload, rng, &mut init)?;
    let suffix = api.suffix();
    let (storage, call) = if callable {
        (format!("callableData{suffix}"), api.execute(slots.call))
    } else {
        (
            format!("rayPayload{suffix}"),
            api.trace(slots.hit, slots.miss),
        )
    };
    Ok(format!(
        "{}{}{}layout(set = {set}, binding = 0) uniform accelerationStructure{suffix} rglsl_tlas;\nlayout(set = {set}, binding = 1, std430) buffer RglslOut {{\n    {};\n}};\nlayout(location = 0) {storage} {};\nvoid main() {{\n    uint index = gl_LaunchID{suffix}.x + gl_LaunchID{suffix}.y * gl_LaunchSize{suffix}.x;\n    vec2 xy = (vec2(gl_LaunchID{suffix}.xy) + 0.5) / vec2(gl_LaunchSize{suffix}.xy) * 2.0 - 1.0;\n{init}{call}    rglsl_out[index] = rglsl_payload;\n}}\n",
        api.preamble(),
        types.extensions(),
        types.definitions(),
        declarator.declare("rglsl_out[]"),
        declarator.declare("rglsl_payload"),
    ))
}

pub fn closest_hit_for_intersection(
    attributes: Option<&DataType>,
    api: Api,
) -> Result<String, String> {
    let mut types = Types::default();
    let attribute = attributes.map(|a| types.declarator(a)).transpose()?;
    let payload = types.declarator(&hit_info(attributes))?;
    let suffix = api.suffix();
    let mut body = format!(
        "    rglsl_payload.m0 = gl_HitT{suffix};\n    rglsl_payload.m1 = gl_HitKind{suffix};\n    rglsl_payload.m2 = gl_PrimitiveID;\n"
    );
    let mut declarations = format!(
        "layout(location = 0) rayPayloadIn{suffix} {};\n",
        payload.declare("rglsl_payload")
    );
    if let Some(attribute) = attribute {
        let _ = writeln!(
            declarations,
            "hitAttribute{suffix} {};",
            attribute.declare("rglsl_attributes")
        );
        body.push_str("    rglsl_payload.m3 = rglsl_attributes;\n");
    }
    Ok(format!(
        "{}{}{}{declarations}void main() {{\n{body}}}\n",
        api.preamble(),
        types.extensions(),
        types.definitions()
    ))
}

pub fn intersection_for_hit(
    attributes: &DataType,
    api: Api,
    rng: &mut Rng,
) -> Result<String, String> {
    let mut types = Types::default();
    let declarator = types.declarator(attributes)?;
    let mut init = String::new();
    glsl::assign_literals("rglsl_attributes", attributes, rng, &mut init)?;
    let suffix = api.suffix();
    Ok(format!(
        "{}{}{}hitAttribute{suffix} {};\nvoid main() {{\n{init}    reportIntersection{suffix}(0.5, 0u);\n}}\n",
        api.preamble(),
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

fn empty_shaders(api: Api) -> Vec<(ShaderKind, String)> {
    vec![
        (ShaderKind::Miss, api.empty_shader()),
        (ShaderKind::ClosestHit, api.empty_shader()),
        (ShaderKind::Callable, api.empty_shader()),
    ]
}

pub fn harness(
    stage: ShaderKind,
    reflection: &Reflection,
    set: u32,
    record: Option<String>,
    rng: &mut Rng,
) -> Result<RayHarness, String> {
    let api = Api::of(reflection);
    let motion = motion(reflection);
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
                slots: Slots::default(),
                api,
                motion,
            },
            shaders: empty_shaders(api),
            geometry: Geometry::Triangles,
            output: None,
        });
    }
    let slots = Slots::of(stage, reflection);
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
        ray_generation(&payload, callable, set, api, slots, rng)?,
    )];
    shaders.extend(empty_shaders(api));
    let (miss, hit, call) = (1, 2, 3);
    let mut geometry = Geometry::Triangles;
    let mut tested_group = vec![ShaderRef::Tested];
    match stage {
        ShaderKind::Intersection => {
            geometry = Geometry::Boxes;
            shaders.push((
                ShaderKind::ClosestHit,
                closest_hit_for_intersection(attributes.as_ref(), api)?,
            ));
            tested_group.insert(0, ShaderRef::Harness(shaders.len() - 1));
        }
        ShaderKind::ClosestHit | ShaderKind::AnyHit => {
            if let Some(attributes) = attributes.as_ref().filter(|a| **a != barycentrics()) {
                geometry = Geometry::Boxes;
                shaders.push((
                    ShaderKind::Intersection,
                    intersection_for_hit(attributes, api, rng)?,
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
            slots,
            api,
            motion,
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
    fn closest_hit_gets_a_typed_ray_generation() -> anyhow::Result<()> {
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
            Some("rec".into()),
            &mut Rng::new(3),
        )
        .map_err(anyhow::Error::msg)?;
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
            "  SHADER_BINDING_TABLE sbt_hit\n    g_hit SHADER_RECORD rec\n    g_hit_empty\n"
        ));
        assert_eq!(script.matches("    g_miss_empty\n").count(), RECORDS - 1);
        assert!(!script.contains("MAX_RAY_RECURSION_DEPTH"));
        Ok(())
    }

    #[test]
    fn intersection_reports_into_a_generated_closest_hit() -> anyhow::Result<()> {
        let mut module = Reflection::new(ExecutionModel::IntersectionKHR);
        module.ray_variables.push(RayVariable {
            class: StorageClass::HitAttributeKHR,
            location: 0,
            ty: Ok(DataType::Vector {
                scalar: F32,
                count: 4,
            }),
        });
        let harness = harness(ShaderKind::Intersection, &module, 0, None, &mut Rng::new(3))
            .map_err(anyhow::Error::msg)?;
        assert_eq!(harness.geometry, Geometry::Boxes);
        assert_eq!(harness.shaders.len(), 5);
        let (kind, hit) = &harness.shaders[4];
        assert_eq!(*kind, ShaderKind::ClosestHit);
        assert!(hit.contains("hitAttributeEXT vec4 rglsl_attributes;"));
        assert!(hit.contains("rglsl_payload.m3 = rglsl_attributes;"));
        let script = harness.pipeline.script(&names);
        assert!(script.contains("  SHADER_GROUP g_hit harness4 tested\n"));
        assert!(harness
            .geometry
            .declarations(Api::Khr, false)
            .contains("GEOMETRY AABBS"));
        Ok(())
    }

    #[test]
    fn hit_shaders_with_custom_attributes_get_an_intersection_shader() -> anyhow::Result<()> {
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
        let harness = harness(ShaderKind::AnyHit, &module, 0, None, &mut Rng::new(3))
            .map_err(anyhow::Error::msg)?;
        assert_eq!(harness.geometry, Geometry::Boxes);
        let (kind, rint) = &harness.shaders[4];
        assert_eq!(*kind, ShaderKind::Intersection);
        assert!(rint.contains("reportIntersectionEXT(0.5, 0u);"));
        let script = harness.pipeline.script(&names);
        assert!(script.contains("  SHADER_GROUP g_hit tested harness4\n"));
        assert!(script.contains("  MAX_RAY_RECURSION_DEPTH 2\n"));
        Ok(())
    }

    #[test]
    fn callable_data_flows_through_execute_callable() -> anyhow::Result<()> {
        let module = Reflection::new(ExecutionModel::CallableKHR);
        let harness = harness(ShaderKind::Callable, &module, 0, None, &mut Rng::new(3))
            .map_err(anyhow::Error::msg)?;
        assert!(harness.shaders[0]
            .1
            .contains("callableDataEXT uint rglsl_payload;"));
        assert!(harness.shaders[0].1.contains("executeCallableEXT(0, 0);"));
        assert_eq!(harness.output, Some(DataType::Scalar(U32)));
        assert!(harness.pipeline.run().contains("CALL sbt_call 4 4 1"));
        Ok(())
    }
    #[test]
    fn nv_modules_get_an_nv_pipeline_and_nv_harness_shaders() -> anyhow::Result<()> {
        let mut module = Reflection::new(ExecutionModel::MissKHR);
        module.capabilities.insert(Capability::RayTracingNV);
        module.ray_variables.push(RayVariable {
            class: StorageClass::IncomingRayPayloadKHR,
            location: 1,
            ty: Ok(DataType::Vector {
                scalar: F32,
                count: 4,
            }),
        });
        let harness = harness(ShaderKind::Miss, &module, 1, None, &mut Rng::new(3))
            .map_err(anyhow::Error::msg)?;
        assert_eq!(harness.pipeline.api, Api::Nv);
        let (_, rgen) = &harness.shaders[0];
        assert!(rgen.contains("#extension GL_NV_ray_tracing : require\n"));
        assert!(rgen.contains("uniform accelerationStructureNV rglsl_tlas;"));
        assert!(rgen.contains("layout(location = 0) rayPayloadNV vec4 rglsl_payload;"));
        assert!(rgen.contains("gl_LaunchIDNV.x + gl_LaunchIDNV.y * gl_LaunchSizeNV.x"));
        assert!(rgen.contains("traceNV(rglsl_tlas, gl_RayFlagsNoneNV, 0xff, 0, 0, 0,"));
        assert!(harness
            .shaders
            .iter()
            .skip(1)
            .all(|(_, source)| source.contains("GL_NV_ray_tracing")));
        assert!(harness.pipeline.script(&names).starts_with("  API NV\n"));
        let scene = harness.geometry.declarations(Api::Nv, false);
        assert!(scene
            .contains("ACCELERATION_STRUCTURE TOP_LEVEL tlas\n  API NV\n  BOTTOM_LEVEL_INSTANCE"));
        Ok(())
    }

    #[test]
    fn motion_modules_allow_motion_on_a_motion_scene() -> anyhow::Result<()> {
        let mut module = Reflection::new(ExecutionModel::RayGenerationKHR);
        module.capabilities.insert(Capability::RayTracingKHR);
        module
            .capabilities
            .insert(Capability::RayTracingMotionBlurNV);
        let harness = harness(
            ShaderKind::RayGeneration,
            &module,
            0,
            None,
            &mut Rng::new(3),
        )
        .map_err(anyhow::Error::msg)?;
        assert_eq!(harness.pipeline.api, Api::Khr);
        assert!(motion(&module));
        assert!(harness
            .pipeline
            .script(&names)
            .starts_with("  FLAGS ALLOW_MOTION\n  SHADER_GROUP g_raygen tested\n"));
        let scene = harness.geometry.declarations(Api::Khr, true);
        assert!(scene.contains("TOP_LEVEL tlas\n  MOTION\n  BOTTOM_LEVEL_INSTANCE blas\n"));
        Ok(())
    }

    #[test]
    fn tested_groups_avoid_the_records_their_own_traces_use() -> anyhow::Result<()> {
        let mut module = Reflection::new(ExecutionModel::MissKHR);
        module.capabilities.insert(Capability::RayTracingKHR);
        module.body_opcodes.insert(Op::TraceRayKHR as u32);
        module.ray_indices.misses.extend([0, 1]);
        let harness = harness(ShaderKind::Miss, &module, 0, None, &mut Rng::new(3))
            .map_err(anyhow::Error::msg)?;
        assert_eq!(harness.pipeline.slots.miss, 2);
        assert!(harness.shaders[0]
            .1
            .contains("traceRayEXT(rglsl_tlas, gl_RayFlagsNoneEXT, 0xff, 0, 0, 2,"));
        let script = harness.pipeline.script(&names);
        assert!(script.contains(
            "  SHADER_BINDING_TABLE sbt_miss\n    g_miss_empty\n    g_miss_empty\n    g_miss\n    g_miss_empty\n"
        ));

        let mut hit = Reflection::new(ExecutionModel::ClosestHitKHR);
        hit.ray_indices.hit_offsets.insert(0);
        let harness = harness_for(ShaderKind::ClosestHit, &hit)?;
        assert_eq!(harness.pipeline.slots.hit, 1);
        assert!(harness.shaders[0].1.contains("0xff, 1, 0, 0,"));

        let mut callable = Reflection::new(ExecutionModel::CallableKHR);
        callable.ray_indices.callables.insert(0);
        let harness = harness_for(ShaderKind::Callable, &callable)?;
        assert!(harness.shaders[0].1.contains("executeCallableEXT(1, 0);"));
        Ok(())
    }

    fn harness_for(stage: ShaderKind, module: &Reflection) -> anyhow::Result<RayHarness> {
        harness(stage, module, 0, None, &mut Rng::new(3)).map_err(anyhow::Error::msg)
    }
}
