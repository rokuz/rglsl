pub mod amber;
pub mod compare;
pub mod data;
pub mod harness;
pub mod known;
pub mod plan;
pub mod reflect;
pub mod requirements;

use std::collections::BTreeMap;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::{Mutex, PoisonError};
use std::time::Duration;

use anyhow::{bail, Result};
use spirv::ExecutionModel;

use self::amber::{Amber, Device};
use self::compare::{compare, Comparison};
use self::plan::{Inputs, Plan, Refusal, ScriptPaths, Stage};
use self::reflect::Reflection;
use crate::oracles;
use crate::process::{self, Exit};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum SkipReason {
    Stage,
    Capability,
    DeviceFeature,
    Binding,
    ReferenceInvalid,
    ReferenceFails,
    Nondeterministic,
    Undefined,
}

impl SkipReason {
    pub const ALL: [Self; 8] = [
        Self::Stage,
        Self::Capability,
        Self::DeviceFeature,
        Self::Binding,
        Self::ReferenceInvalid,
        Self::ReferenceFails,
        Self::Nondeterministic,
        Self::Undefined,
    ];

    pub const fn label(self) -> &'static str {
        match self {
            Self::Stage => "stage not executed by the harness",
            Self::Capability => "capability or extension the harness cannot enable",
            Self::DeviceFeature => "device feature missing on the driver",
            Self::Binding => "resource or interface the harness cannot bind",
            Self::ReferenceInvalid => "glslang's module is not valid SPIR-V",
            Self::ReferenceFails => "glslang's module fails on the driver",
            Self::Nondeterministic => "nondeterministic (glslang's module differs between runs)",
            Self::Undefined => "the shader reads undefined values",
        }
    }

    pub const fn code(self) -> &'static str {
        match self {
            Self::Stage => "stage",
            Self::Capability => "capability",
            Self::DeviceFeature => "device-feature",
            Self::Binding => "binding",
            Self::ReferenceInvalid => "reference-invalid",
            Self::ReferenceFails => "reference-fails",
            Self::Nondeterministic => "nondeterministic",
            Self::Undefined => "undefined",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Outcome {
    Pass { tolerated: usize },
    Fail(String),
    Skip { reason: SkipReason, detail: String },
}

impl Outcome {
    pub fn skip(reason: SkipReason, detail: impl Into<String>) -> Self {
        Self::Skip {
            reason,
            detail: detail.into(),
        }
    }

    pub fn passed(&self) -> Option<bool> {
        match self {
            Self::Pass { .. } => Some(true),
            Self::Fail(_) => Some(false),
            Self::Skip { .. } => None,
        }
    }
}

fn refusal(refusal: Refusal) -> Outcome {
    match refusal {
        Refusal::Stage(stage) => Outcome::skip(SkipReason::Stage, stage),
        Refusal::Capability(what) => Outcome::skip(SkipReason::Capability, what),
        Refusal::Binding(what) => Outcome::skip(SkipReason::Binding, what),
    }
}

pub type Outputs = BTreeMap<String, Vec<u8>>;

const DUMP_FILE: &str = "dump.comp.spv";

#[derive(Debug, Clone, PartialEq)]
pub struct TargetDifference {
    pub target: String,
    pub difference: compare::Difference,
}

impl std::fmt::Display for TargetDifference {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        write!(
            f,
            "{}, byte {}: {} vs {} ({} values differ)",
            self.target,
            self.difference.offset,
            self.difference.expected,
            self.difference.actual,
            self.difference.count
        )
    }
}

pub fn compare_outputs(
    plan: &Plan,
    expected: &Outputs,
    actual: &Outputs,
) -> Result<usize, TargetDifference> {
    let mut tolerated = 0;
    for target in &plan.targets {
        let missing = Vec::new();
        let a = expected.get(&target.dump).unwrap_or(&missing);
        let b = actual.get(&target.dump).unwrap_or(&missing);
        match compare(a, b, &target.slots) {
            Comparison::Equal { tolerated: t } => tolerated += t,
            Comparison::Differ(difference) => {
                return Err(TargetDifference {
                    target: target.name.clone(),
                    difference,
                })
            }
        }
    }
    Ok(tolerated)
}

#[derive(Debug)]
pub struct Executor {
    amber: Amber,
    glslang: PathBuf,
    work: PathBuf,
    dump_shader: PathBuf,
    support: Mutex<BTreeMap<&'static str, bool>>,
    pub device: Device,
}

pub fn amber_tool(root: &Path) -> Option<PathBuf> {
    if let Some(path) = std::env::var_os("RGLSL_AMBER") {
        return Some(PathBuf::from(path));
    }
    let built = oracles::oracles_dir(root).join("bin").join("amber");
    built.is_file().then_some(built)
}

pub fn icd_manifest(root: &Path) -> Option<PathBuf> {
    if let Some(path) = std::env::var_os("RGLSL_VK_ICD") {
        return Some(PathBuf::from(path));
    }
    let built = oracles::kosmickrisp_dir(root).join("icd.json");
    built.is_file().then_some(built)
}

impl Executor {
    pub fn new(root: &Path, glslang: &Path, work: PathBuf, timeout: Duration) -> Result<Self> {
        let (Some(binary), Some(icd)) = (amber_tool(root), icd_manifest(root)) else {
            bail!("the exec oracles (Amber, KosmicKrisp) are missing: run `cargo xtask oracles` or pass --no-exec");
        };
        let amber = Amber {
            binary,
            icd,
            timeout,
        };
        let device = amber
            .device()
            .map_err(|error| anyhow::anyhow!("no Vulkan device through Amber: {error}"))?;
        let _ = fs::remove_dir_all(&work);
        fs::create_dir_all(&work)?;
        let dump_shader = compile_glsl(
            glslang,
            &work,
            "dump",
            "comp",
            harness::DUMP_SHADER,
            timeout,
        )
        .map_err(|error| anyhow::anyhow!("compiling the dump shader: {error}"))?;
        Ok(Self {
            amber,
            glslang: glslang.to_path_buf(),
            work,
            dump_shader,
            support: Mutex::new(BTreeMap::new()),
            device,
        })
    }

    pub fn supports(&self, feature: &'static str) -> bool {
        if let Some(known) = self
            .support
            .lock()
            .unwrap_or_else(PoisonError::into_inner)
            .get(feature)
        {
            return *known;
        }
        let dir = self.work.join("probes");
        let _ = fs::create_dir_all(&dir);
        let stem = feature.replace('.', "_");
        let script = dir.join(format!("{stem}.amber"));
        let text = format!(
            "#!amber\nDEVICE_FEATURE {feature}\nSHADER compute probe SPIRV-BIN FILE {stem}.spv\nPIPELINE compute p\n  ATTACH probe\nEND\nRUN p 1 1 1\n"
        );
        let supported = fs::copy(&self.dump_shader, dir.join(format!("{stem}.spv"))).is_ok()
            && fs::write(&script, text).is_ok()
            && self.amber.run(&script, &[], &dir.join("probe.txt")).is_ok();
        self.support
            .lock()
            .unwrap_or_else(PoisonError::into_inner)
            .insert(feature, supported);
        supported
    }

    pub fn missing_feature(&self, plan: &Plan) -> Option<&'static str> {
        plan.features.iter().copied().find(|f| !self.supports(f))
    }

    pub fn prepare(&self, plan: &Plan, dir: &Path) -> Result<Option<PathBuf>, String> {
        let data = dir.join("data");
        fs::create_dir_all(&data).map_err(|e| e.to_string())?;
        fs::copy(&self.dump_shader, dir.join(DUMP_FILE)).map_err(|e| e.to_string())?;
        for (name, bytes) in &plan.files {
            fs::write(data.join(name), bytes).map_err(|e| e.to_string())?;
        }
        match &plan.harness {
            Some(source) => {
                let extension = if plan.stage == Stage::Fragment {
                    "vert"
                } else {
                    "frag"
                };
                compile_glsl(
                    &self.glslang,
                    dir,
                    "harness",
                    extension,
                    source,
                    self.amber.timeout,
                )?;
                Ok(Some(PathBuf::from(format!("harness.{extension}.spv"))))
            }
            None => Ok(None),
        }
    }

    pub fn run(
        &self,
        plan: &Plan,
        dir: &Path,
        harness: Option<&Path>,
        spirv: &Path,
        tag: &str,
    ) -> Result<Outputs, String> {
        let tested = PathBuf::from(format!("{tag}.spv"));
        fs::copy(spirv, dir.join(&tested)).map_err(|e| e.to_string())?;
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness,
            dump: Path::new(DUMP_FILE),
            data: Path::new("data"),
        });
        let path = dir.join(format!("{tag}.amber"));
        fs::write(&path, script).map_err(|e| e.to_string())?;
        self.amber
            .run(&path, &plan.dumps(), &dir.join(format!("{tag}.dump.txt")))
    }

    pub fn exec(&self, name: &str, ours: &Path, reference: &Path) -> Outcome {
        let reflect = |path: &Path| -> Result<Reflection, String> {
            let bytes = fs::read(path).map_err(|e| e.to_string())?;
            reflect::reflect_bytes(&bytes)
        };
        let theirs = match reflect(reference) {
            Ok(reflection) => reflection,
            Err(error) => return Outcome::skip(SkipReason::Capability, error),
        };
        let mine = match reflect(ours) {
            Ok(reflection) => reflection,
            Err(error) => return Outcome::Fail(format!("reflecting our module: {error}")),
        };
        let stage_feature = match theirs.model {
            ExecutionModel::Geometry => Some("geometryShader"),
            ExecutionModel::TessellationControl | ExecutionModel::TessellationEvaluation => {
                Some("tessellationShader")
            }
            _ => None,
        };
        if let Some(feature) = stage_feature.filter(|f| !self.supports(f)) {
            return Outcome::skip(SkipReason::DeviceFeature, feature);
        }
        let inputs = Inputs {
            seed: name.to_string(),
            ..Inputs::default()
        };
        let plan = match Plan::new(&theirs, &inputs) {
            Ok(plan) => plan,
            Err(error) => return refusal(error),
        };
        if let Some(feature) = self.missing_feature(&plan) {
            return Outcome::skip(SkipReason::DeviceFeature, feature);
        }
        if let Some(shared) = shared_binding(&theirs) {
            return Outcome::skip(SkipReason::Binding, shared);
        }
        if let Some(why) = known::undefined(name) {
            return Outcome::skip(SkipReason::Undefined, why);
        }
        if let Some(difference) = interface_difference(&theirs, &mine) {
            return Outcome::Fail(format!("interface differs: {difference}"));
        }
        let mut our_plan = match Plan::new(&mine, &inputs) {
            Ok(plan) => plan,
            Err(error) => {
                return Outcome::Fail(format!(
                    "our module needs what glslang's does not: {}",
                    match refusal(error) {
                        Outcome::Skip { detail, .. } => detail,
                        other => format!("{other:?}"),
                    }
                ))
            }
        };
        if let Some(feature) = self.missing_feature(&our_plan) {
            return Outcome::Fail(format!(
                "our module needs the device feature {feature}, glslang's does not"
            ));
        }
        our_plan.features.extend(plan.features.iter().copied());
        let dir = self.work.join(name);
        let harness = match self.prepare(&plan, &dir) {
            Ok(harness) => harness,
            Err(error) => return Outcome::skip(SkipReason::Binding, format!("harness: {error}")),
        };
        let expected = match self.run(&plan, &dir, harness.as_deref(), reference, "glslang") {
            Ok(outputs) => outputs,
            Err(error) => return Outcome::skip(SkipReason::ReferenceFails, error),
        };
        let actual = match self.run(&our_plan, &dir, harness.as_deref(), ours, "rglsl") {
            Ok(outputs) => outputs,
            Err(error) => return Outcome::Fail(format!("our module fails on the driver: {error}")),
        };
        match compare_outputs(&plan, &expected, &actual) {
            Ok(tolerated) => Outcome::Pass { tolerated },
            Err(difference) => {
                match self.run(&plan, &dir, harness.as_deref(), reference, "glslang-again") {
                    Ok(again) if compare_outputs(&plan, &expected, &again).is_ok() => {
                        Outcome::Fail(format!("{difference} (glslang vs rglsl)"))
                    }
                    Ok(_) => Outcome::skip(SkipReason::Nondeterministic, difference.to_string()),
                    Err(error) => Outcome::skip(SkipReason::ReferenceFails, error),
                }
            }
        }
    }
}

fn shared_binding(reflection: &Reflection) -> Option<String> {
    reflection
        .resources
        .windows(2)
        .find(|pair| pair[0].set == pair[1].set && pair[0].binding == pair[1].binding)
        .map(|pair| {
            format!(
                "several resources share set {} binding {}",
                pair[0].set, pair[0].binding
            )
        })
}

fn interface_difference(theirs: &Reflection, mine: &Reflection) -> Option<String> {
    if theirs.model != mine.model {
        return Some(format!("stage {:?} vs {:?}", theirs.model, mine.model));
    }
    if theirs.local_size != mine.local_size {
        return Some(format!(
            "local size {:?} vs {:?}",
            theirs.local_size, mine.local_size
        ));
    }
    for resource in &theirs.resources {
        match mine
            .resources
            .iter()
            .find(|r| r.set == resource.set && r.binding == resource.binding)
        {
            None => {
                return Some(format!(
                    "set {} binding {} ({}) is missing",
                    resource.set,
                    resource.binding,
                    resource.kind.describe()
                ))
            }
            Some(other) if other.kind != resource.kind => {
                return Some(format!(
                    "set {} binding {}: {:?} vs {:?}",
                    resource.set, resource.binding, resource.kind, other.kind
                ))
            }
            Some(_) => {}
        }
    }
    if let Some(extra) = mine.resources.iter().find(|r| {
        !theirs
            .resources
            .iter()
            .any(|t| t.set == r.set && t.binding == r.binding)
    }) {
        return Some(format!(
            "set {} binding {} ({}) is extra",
            extra.set,
            extra.binding,
            extra.kind.describe()
        ));
    }
    if theirs.push_constants != mine.push_constants {
        return Some(format!(
            "push constants {:?} vs {:?}",
            theirs.push_constants, mine.push_constants
        ));
    }
    for (what, a, b) in [
        ("input", &theirs.inputs, &mine.inputs),
        ("output", &theirs.outputs, &mine.outputs),
    ] {
        let shape = |v: &reflect::Varying| (v.location, v.component, v.ty.clone());
        let a: Vec<_> = a.iter().map(shape).collect();
        let b: Vec<_> = b.iter().map(shape).collect();
        if a == b {
            continue;
        }
        let position = a.iter().zip(&b).position(|(x, y)| x != y);
        return Some(match position {
            Some(index) => format!("{what} {:?} vs {:?}", a.get(index), b.get(index)),
            None => format!("{} {what}s vs {}", a.len(), b.len()),
        });
    }
    None
}

pub fn compile_glsl(
    glslang: &Path,
    dir: &Path,
    name: &str,
    extension: &str,
    source: &str,
    timeout: Duration,
) -> Result<PathBuf, String> {
    fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    let input = dir.join(format!("{name}.{extension}"));
    let output = dir.join(format!("{name}.{extension}.spv"));
    fs::write(&input, source).map_err(|e| e.to_string())?;
    let mut command = Command::new(glslang);
    command
        .args(["-V", "--target-env", "vulkan1.0", "-o"])
        .arg(&output)
        .arg(&input);
    let result = process::run(command, timeout).map_err(|e| format!("{e:#}"))?;
    if !matches!(result.exit, Exit::Code(0)) {
        let message = result
            .stdout
            .lines()
            .chain(result.stderr.lines())
            .find(|line| line.starts_with("ERROR"))
            .unwrap_or("glslang failed")
            .to_string();
        return Err(message);
    }
    Ok(output)
}
