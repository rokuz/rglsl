use std::collections::BTreeMap;

use serde_json::Value;

pub const EXECUTABLE_PROPERTIES: &str = "VK_KHR_pipeline_executable_properties";
pub const SHADER_INFO_AMD: &str = "VK_AMD_shader_info";

#[derive(Debug, Clone, PartialEq)]
pub struct Executable {
    pub source: String,
    pub name: String,
    pub stages: Vec<String>,
    pub subgroup_size: u32,
    pub statistics: Vec<(String, f64)>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Pipeline {
    pub name: String,
    pub kind: String,
    pub create_time_ms: f64,
    pub executables: Vec<Executable>,
}

#[derive(Debug, Clone, Default, PartialEq)]
pub struct Report {
    pub executable_properties: bool,
    pub shader_info_amd: bool,
    pub pipelines: Vec<Pipeline>,
}

fn text(value: &Value, key: &str) -> String {
    value
        .get(key)
        .and_then(Value::as_str)
        .unwrap_or_default()
        .to_string()
}

fn number(value: &Value) -> Option<f64> {
    match value {
        Value::Number(number) => number.as_f64(),
        Value::Bool(flag) => Some(f64::from(u8::from(*flag))),
        Value::String(text) => text.parse().ok(),
        _ => None,
    }
}

fn executable(value: &Value) -> Executable {
    let statistics = value
        .get("statistics")
        .and_then(Value::as_array)
        .map(|list| {
            list.iter()
                .filter_map(|statistic| {
                    let name = text(statistic, "name");
                    let value = number(statistic.get("value")?)?;
                    (!name.is_empty() && value.is_finite()).then_some((name, value))
                })
                .collect()
        })
        .unwrap_or_default();
    Executable {
        source: text(value, "source"),
        name: text(value, "name"),
        stages: value
            .get("stages")
            .and_then(Value::as_array)
            .map(|stages| {
                stages
                    .iter()
                    .filter_map(Value::as_str)
                    .map(str::to_string)
                    .collect()
            })
            .unwrap_or_default(),
        subgroup_size: value
            .get("subgroup_size")
            .and_then(Value::as_u64)
            .and_then(|size| u32::try_from(size).ok())
            .unwrap_or(0),
        statistics,
    }
}

pub fn of_script(bytes: &[u8], script: &str) -> Result<Vec<u8>, String> {
    let mut root: Value = serde_json::from_slice(bytes)
        .map_err(|error| format!("reading the pipeline statistics: {error}"))?;
    let pipelines = root
        .get_mut("pipelines")
        .and_then(Value::as_array_mut)
        .ok_or("the pipeline statistics have no `pipelines` list")?;
    pipelines.retain(|pipeline| pipeline.get("script").and_then(Value::as_str) == Some(script));
    serde_json::to_vec(&root).map_err(|error| format!("writing the pipeline statistics: {error}"))
}

pub fn renamed(bytes: &[u8], names: &[(String, String)]) -> Result<Vec<u8>, String> {
    let mut root: Value = serde_json::from_slice(bytes)
        .map_err(|error| format!("reading the pipeline statistics: {error}"))?;
    let pipelines = root
        .get_mut("pipelines")
        .and_then(Value::as_array_mut)
        .ok_or("the pipeline statistics have no `pipelines` list")?;
    pipelines.retain_mut(|pipeline| {
        let script = pipeline.get("script").and_then(Value::as_str);
        let Some((_, name)) = names.iter().find(|(from, _)| Some(from.as_str()) == script) else {
            return false;
        };
        if let Some(object) = pipeline.as_object_mut() {
            object.insert("script".into(), Value::String(name.clone()));
        }
        true
    });
    serde_json::to_vec(&root).map_err(|error| format!("writing the pipeline statistics: {error}"))
}

impl Report {
    pub fn parse(bytes: &[u8]) -> Result<Self, String> {
        let root: Value = serde_json::from_slice(bytes)
            .map_err(|error| format!("reading the pipeline statistics: {error}"))?;
        let flag = |key: &str| root.get(key).and_then(Value::as_bool).unwrap_or(false);
        let pipelines = root
            .get("pipelines")
            .and_then(Value::as_array)
            .ok_or("the pipeline statistics have no `pipelines` list")?
            .iter()
            .map(|pipeline| Pipeline {
                name: text(pipeline, "pipeline"),
                kind: text(pipeline, "type"),
                create_time_ms: pipeline
                    .get("create_time_ms")
                    .and_then(number)
                    .unwrap_or(f64::NAN),
                executables: pipeline
                    .get("executables")
                    .and_then(Value::as_array)
                    .map(|list| list.iter().map(executable).collect())
                    .unwrap_or_default(),
            })
            .collect();
        Ok(Self {
            executable_properties: flag("pipeline_executable_properties"),
            shader_info_amd: flag("shader_info_amd"),
            pipelines,
        })
    }

    pub fn create_times(&self, pipeline: &str) -> Vec<f64> {
        self.pipelines
            .iter()
            .filter(|p| p.name == pipeline && p.create_time_ms.is_finite())
            .map(|p| p.create_time_ms)
            .collect()
    }

    pub fn values(&self, pipeline: &str, stage: &str) -> BTreeMap<String, f64> {
        let mut values = BTreeMap::new();
        let Some(first) = self.pipelines.iter().find(|p| p.name == pipeline) else {
            return values;
        };
        for executable in &first.executables {
            if !executable.stages.iter().any(|s| s == stage) {
                continue;
            }
            let prefix = if executable.source == SHADER_INFO_AMD {
                "amd:"
            } else {
                ""
            };
            for (name, value) in &executable.statistics {
                *values.entry(format!("{prefix}{name}")).or_insert(0.0) += value;
            }
            if executable.source == EXECUTABLE_PROPERTIES && executable.subgroup_size > 0 {
                values.insert(
                    "subgroup size".to_string(),
                    f64::from(executable.subgroup_size),
                );
            }
        }
        values
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    const SAMPLE: &str = r#"{
  "pipeline_executable_properties": true,
  "shader_info_amd": true,
  "pipelines": [
    {"script": "rglsl.amber", "pipeline": "main", "type": "graphics", "create_time_ms": 1.5, "executables": [
      {"source": "VK_KHR_pipeline_executable_properties", "name": "Vertex Shader", "description": "", "stages": ["vertex"], "subgroup_size": 64, "statistics": [
        {"name": "VGPRs", "description": "", "format": "uint64", "value": 8}]},
      {"source": "VK_KHR_pipeline_executable_properties", "name": "Fragment Shader", "description": "", "stages": ["fragment"], "subgroup_size": 64, "statistics": [
        {"name": "VGPRs", "description": "", "format": "uint64", "value": 24},
        {"name": "Spills", "description": "", "format": "bool32", "value": false},
        {"name": "Odd", "description": "", "format": "float64", "value": "nan"}], "internal_representations": []},
      {"source": "VK_AMD_shader_info", "name": "fragment", "description": "", "stages": ["fragment"], "subgroup_size": 0, "statistics": [
        {"name": "numUsedVgprs", "description": "", "format": "uint64", "value": 24}]}
    ]},
    {"script": "rglsl.amber", "pipeline": "main", "type": "graphics", "create_time_ms": 0.5, "executables": []},
    {"script": "rglsl.amber", "pipeline": "dump", "type": "compute", "create_time_ms": 0.1, "executables": []},
    {"script": "rglsl.timed.amber", "pipeline": "main", "type": "graphics", "create_time_ms": 2.5, "executables": []}
  ]
}"#;

    #[test]
    fn reads_the_statistics_of_the_tested_stage() -> Result<(), String> {
        let report = Report::parse(SAMPLE.as_bytes())?;
        assert!(report.executable_properties && report.shader_info_amd);
        assert_eq!(report.create_times("main"), [1.5, 0.5, 2.5]);
        let timed = Report::parse(&of_script(SAMPLE.as_bytes(), "rglsl.timed.amber")?)?;
        assert_eq!(timed.create_times("main"), [2.5]);
        assert!(timed.shader_info_amd);
        assert!(of_script(b"{}", "rglsl.amber").is_err());
        let report = Report::parse(&of_script(SAMPLE.as_bytes(), "rglsl.amber")?)?;
        assert_eq!(report.create_times("main"), [1.5, 0.5]);
        assert!(report.executable_properties);
        let values = report.values("main", "fragment");
        let expected: BTreeMap<String, f64> = [
            ("VGPRs", 24.0),
            ("Spills", 0.0),
            ("amd:numUsedVgprs", 24.0),
            ("subgroup size", 64.0),
        ]
        .into_iter()
        .map(|(name, value)| (name.to_string(), value))
        .collect();
        assert_eq!(values, expected);
        assert!(report.values("dump", "compute").is_empty());
        assert!(Report::parse(b"{}").is_err());
        assert!(Report::parse(b"not json").is_err());
        let empty = Report::parse(br#"{"pipelines": []}"#)?;
        assert!(!empty.executable_properties);
        Ok(())
    }
}
