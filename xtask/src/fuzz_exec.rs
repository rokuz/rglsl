use std::collections::BTreeMap;
use std::fs;
use std::path::{Path, PathBuf};

use serde_json::Value as Json;

use crate::exec::batch::{Job, JobResult};
use crate::exec::data::Value;
use crate::exec::plan::{Inputs, Plan};
use crate::exec::reflect::{ScalarKind, Slot};
use crate::exec::{reflect, refusal_text, Executor, Outputs, TargetDifference};

pub const FRAMEBUFFER: u32 = 256;
const SEED: &str = "graphicsfuzz";

#[derive(Debug, Clone)]
pub enum Run {
    Ran { plan: Box<Plan>, outputs: Outputs },
    Refused(String),
    Failed(String),
}

pub fn uniform_values(json: &str) -> Result<BTreeMap<(u32, u32), Vec<Value>>, String> {
    let root: Json = serde_json::from_str(json).map_err(|e| e.to_string())?;
    let Json::Object(entries) = root else {
        return Err("the shader job is not a JSON object".into());
    };
    let mut values = BTreeMap::new();
    for (name, entry) in entries {
        let Some(binding) = entry.get("binding").and_then(Json::as_u64) else {
            continue;
        };
        let Some(args) = entry.get("args").and_then(Json::as_array) else {
            continue;
        };
        let function = entry.get("func").and_then(Json::as_str).unwrap_or_default();
        let integer = function.ends_with('i')
            || function.ends_with("iv")
            || function.ends_with("ui")
            || function.ends_with("uiv");
        let mut list = Vec::new();
        for arg in args {
            let value = if integer {
                arg.as_i64().map(Value::Int)
            } else {
                arg.as_f64().map(Value::Float)
            };
            list.push(value.ok_or_else(|| format!("uniform {name}: bad value {arg}"))?);
        }
        let binding = u32::try_from(binding).map_err(|_| format!("uniform {name}: binding"))?;
        values.insert((0, binding), list);
    }
    Ok(values)
}

pub fn job_json(shader: &Path) -> Option<PathBuf> {
    let json = shader.with_extension("json");
    json.is_file().then_some(json)
}

#[derive(Debug, Clone)]
pub enum Staged {
    Ready { plan: Box<Plan>, job: Job },
    Refused(String),
}

pub fn stage_module(
    executor: &Executor,
    spirv: &Path,
    json: Option<&Path>,
    dir: &Path,
    tag: &str,
) -> Staged {
    let values = match json.map(fs::read_to_string) {
        Some(Ok(text)) => match uniform_values(&text) {
            Ok(values) => values,
            Err(error) => return Staged::Refused(format!("shader job: {error}")),
        },
        Some(Err(error)) => return Staged::Refused(format!("shader job: {error}")),
        None => BTreeMap::new(),
    };
    let reflection = match fs::read(spirv)
        .map_err(|e| e.to_string())
        .and_then(|bytes| reflect::reflect_bytes(&bytes))
    {
        Ok(reflection) => reflection,
        Err(error) => return Staged::Refused(error),
    };
    let inputs = Inputs {
        seed: SEED.to_string(),
        values,
        framebuffer: Some(FRAMEBUFFER),
    };
    let plan = match Plan::new(&reflection, &inputs) {
        Ok(plan) => plan,
        Err(refusal) => return Staged::Refused(refusal_text(&refusal).to_string()),
    };
    if let Some(need) = executor.missing(&plan.needs) {
        return Staged::Refused(format!("device lacks {}", need.line()));
    }
    let harness = match executor.prepare(&plan, dir) {
        Ok(harness) => harness,
        Err(error) => return Staged::Refused(format!("harness: {error}")),
    };
    match executor.stage(&plan, dir, &harness, spirv, tag) {
        Ok(job) => Staged::Ready {
            plan: Box::new(plan),
            job,
        },
        Err(error) => Staged::Refused(format!("staging: {error}")),
    }
}

pub fn finish(staged: &Staged, result: Option<JobResult>) -> Run {
    match (staged, result) {
        (Staged::Refused(why), _) => Run::Refused(why.clone()),
        (Staged::Ready { plan, .. }, Some(Ok(outputs))) => Run::Ran {
            plan: plan.clone(),
            outputs,
        },
        (Staged::Ready { .. }, Some(Err(error))) => Run::Failed(error),
        (Staged::Ready { .. }, None) => Run::Failed("no result from the batch".into()),
    }
}

pub fn compare_runs(
    reference: (&Plan, &Outputs),
    variant: (&Plan, &Outputs),
) -> Result<usize, String> {
    let (reference_plan, reference_outputs) = reference;
    let (variant_plan, variant_outputs) = variant;
    let mut tolerated = 0;
    for target in &reference_plan.targets {
        let Some(other) = variant_plan.targets.iter().find(|t| t.name == target.name) else {
            return Err(format!("{} is missing from the variant", target.name));
        };
        let empty = Vec::new();
        let a = quantize(
            reference_outputs.get(&target.dump).unwrap_or(&empty),
            &target.slots,
        );
        let b = quantize(
            variant_outputs.get(&other.dump).unwrap_or(&empty),
            &target.slots,
        );
        match crate::exec::compare::compare(&a, &b, &target.slots) {
            crate::exec::compare::Comparison::Equal { tolerated: t } => tolerated += t,
            crate::exec::compare::Comparison::Differ(difference) => {
                return Err(TargetDifference {
                    target: target.name.clone(),
                    difference,
                }
                .to_string())
            }
        }
    }
    Ok(tolerated)
}

pub fn quantize(bytes: &[u8], slots: &[Slot]) -> Vec<u8> {
    let mut out = bytes.to_vec();
    for slot in slots {
        if slot.scalar.kind != ScalarKind::Float || slot.scalar.width != 32 {
            continue;
        }
        let Ok(start) = usize::try_from(slot.offset) else {
            continue;
        };
        let Some(raw) = out.get_mut(start..start + 4) else {
            continue;
        };
        let value = f32::from_le_bytes([raw[0], raw[1], raw[2], raw[3]]);
        let level = if value.is_nan() {
            0.0
        } else {
            (value.clamp(0.0, 1.0) * 255.0).round()
        };
        raw.copy_from_slice(&level.to_le_bytes());
    }
    out
}

pub fn family_of(shader: &Path) -> Option<PathBuf> {
    let dir = shader.parent()?;
    let extension = shader.extension()?;
    let reference = dir.join("reference").with_extension(extension);
    reference.is_file().then_some(reference)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reads_uniform_values_from_shader_jobs() {
        let json = r#"{
            "injectionSwitch": {"func": "glUniform2f", "args": [0.0, 1.0], "binding": 0},
            "count": {"func": "glUniform1i", "args": [3], "binding": 2},
            "tex": {"func": "sampler2D", "texture": "DEFAULT", "binding": 1},
            "unbound": {"func": "glUniform1f", "args": [1.0]}
        }"#;
        let values = uniform_values(json).unwrap();
        assert_eq!(values.len(), 2);
        assert_eq!(values[&(0, 0)], [Value::Float(0.0), Value::Float(1.0)]);
        assert_eq!(values[&(0, 2)], [Value::Int(3)]);
        assert!(uniform_values("[1]").is_err());
        assert!(
            uniform_values(r#"{"a": {"func": "glUniform1i", "args": ["x"], "binding": 0}}"#)
                .is_err()
        );
    }

    #[test]
    fn quantizes_floats_to_eight_bits() {
        let slots: Vec<Slot> = (0..4)
            .map(|i| Slot {
                offset: i * 4,
                scalar: crate::exec::reflect::Scalar {
                    kind: ScalarKind::Float,
                    width: 32,
                },
            })
            .collect();
        let bytes: Vec<u8> = [0.5f32, 0.500_001, 2.0, -1.0]
            .iter()
            .flat_map(|v| v.to_le_bytes())
            .collect();
        let quantized = quantize(&bytes, &slots);
        let values: Vec<f32> = quantized
            .chunks_exact(4)
            .map(|c| f32::from_le_bytes([c[0], c[1], c[2], c[3]]))
            .collect();
        assert_eq!(values, [128.0, 128.0, 255.0, 0.0]);
    }

    #[test]
    fn finds_the_family_reference() {
        let dir = std::env::temp_dir().join(format!("rglsl-family-{}", std::process::id()));
        fs::create_dir_all(&dir).unwrap();
        fs::write(dir.join("reference.frag"), "").unwrap();
        fs::write(dir.join("variant_000.frag"), "").unwrap();
        assert_eq!(
            family_of(&dir.join("variant_000.frag")),
            Some(dir.join("reference.frag"))
        );
        assert_eq!(family_of(&dir.join("variant_000.vert")), None);
        fs::remove_dir_all(&dir).unwrap();
    }
}
