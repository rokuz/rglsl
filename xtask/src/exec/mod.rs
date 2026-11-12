pub mod amber;
pub mod batch;
pub mod compare;
pub mod cooperative;
pub mod data;
pub mod drivers;
pub mod glsl;
pub mod harness;
pub mod known;
pub mod mesh;
pub mod module;
pub mod plan;
pub mod rays;
pub mod reflect;
pub mod remote;
pub mod requirements;
pub mod twin;

use std::collections::{BTreeMap, BTreeSet};
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Mutex, PoisonError};
use std::time::Duration;

use anyhow::{anyhow, bail, Result};

use self::amber::{Amber, Device};
pub use self::batch::Outputs;
use self::batch::{Job, JobResult};
use self::compare::{compare, Comparison};
use self::harness::ShaderKind;
use self::plan::{Inputs, Plan, Refusal, ScriptPaths};
use self::reflect::Reflection;
use self::remote::{Remote, RemoteSpec};
use self::requirements::Need;
use crate::oracles;
use crate::process::{self, Exit};

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum TargetId {
    Local,
    Remote(String),
}

impl TargetId {
    pub fn label(&self) -> &str {
        match self {
            Self::Local => "local",
            Self::Remote(label) => label,
        }
    }

    pub fn parse(text: &str) -> Option<Self> {
        let text = text.trim();
        if text.is_empty() || text.contains(|c: char| c.is_whitespace() || c == '|') {
            return None;
        }
        Some(if text == "local" {
            Self::Local
        } else {
            Self::Remote(text.to_string())
        })
    }

    pub const fn is_remote(&self) -> bool {
        matches!(self, Self::Remote(_))
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum TargetSpec {
    Local,
    Remote(RemoteSpec),
}

impl TargetSpec {
    pub fn describe(&self) -> String {
        match self {
            Self::Local => "local".into(),
            Self::Remote(spec) => format!("remote {}", spec.entry()),
        }
    }

    fn work_name(&self) -> String {
        match self {
            Self::Local => "local".into(),
            Self::Remote(spec) => spec.work_name(),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum SkipReason {
    Stage,
    Capability,
    DeviceFeature,
    Binding,
    ReferenceInvalid,
    ReferenceFails,
    DriverBug,
    Nondeterministic,
}

impl SkipReason {
    pub const ALL: [Self; 8] = [
        Self::Stage,
        Self::Capability,
        Self::DeviceFeature,
        Self::Binding,
        Self::ReferenceInvalid,
        Self::ReferenceFails,
        Self::DriverBug,
        Self::Nondeterministic,
    ];

    pub const fn label(self) -> &'static str {
        match self {
            Self::Stage => "stage not executed by the harness",
            Self::Capability => "capability or extension the harness cannot enable",
            Self::DeviceFeature => "device feature missing on the driver",
            Self::Binding => "resource or interface the harness cannot bind",
            Self::ReferenceInvalid => "glslang's module is not valid SPIR-V",
            Self::ReferenceFails => "glslang's module fails on the driver",
            Self::DriverBug => "known driver bug (xtask/exec-drivers)",
            Self::Nondeterministic => "nondeterministic (glslang's module differs between runs)",
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
            Self::DriverBug => "driver-bug",
            Self::Nondeterministic => "nondeterministic",
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

pub fn refusal_text(refusal: &Refusal) -> &str {
    match refusal {
        Refusal::Stage(what) | Refusal::Capability(what) | Refusal::Binding(what) => what,
    }
}

fn refusal(refusal: Refusal) -> Outcome {
    match refusal {
        Refusal::Stage(stage) => Outcome::skip(SkipReason::Stage, stage),
        Refusal::Capability(what) => Outcome::skip(SkipReason::Capability, what),
        Refusal::Binding(what) => Outcome::skip(SkipReason::Binding, what),
    }
}

const DUMP_FILE: &str = "dump.comp.spv";
const LOCAL_GPU_JOBS: usize = 2;

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
enum Backend {
    Local(Amber),
    Remote(Remote),
}

#[derive(Debug)]
pub struct Executor {
    pub target: TargetId,
    backend: Backend,
    glslang: PathBuf,
    work: PathBuf,
    dump_shader: PathBuf,
    timeout: Duration,
    support: BTreeMap<Need, Option<String>>,
    pub device: Device,
    pub driver_bugs: drivers::DriverBugs,
}

#[derive(Debug, Clone)]
pub struct ExecCase {
    pub name: String,
    pub ours: PathBuf,
    pub reference: PathBuf,
    pub twin: bool,
}

#[derive(Debug)]
struct Ready {
    plan: Plan,
    theirs: Job,
    ours: Job,
    twin: bool,
}

pub fn select_targets(local: bool, remote: bool) -> Result<Vec<TargetSpec>> {
    let mut targets = Vec::new();
    if local {
        if oracles::EXEC_PLATFORM {
            targets.push(TargetSpec::Local);
        } else {
            eprintln!("[xtask] warning: the local exec target was skipped: KosmicKrisp runs on macOS on arm64 only");
        }
    }
    if remote {
        let specs = RemoteSpec::from_env()?;
        if specs.is_empty() {
            eprintln!(
                "[xtask] warning: the remote Windows exec targets were skipped: set {} to the SSH host aliases of Windows machines with Vulkan (or pass --no-remote-exec)",
                remote::HOST_VAR
            );
        }
        targets.extend(specs.into_iter().map(TargetSpec::Remote));
    }
    Ok(targets)
}

pub fn named_targets(name: &str) -> Result<Vec<TargetSpec>> {
    let name = name.trim();
    if name == "local" {
        return select_targets(true, false);
    }
    let specs = RemoteSpec::from_env()?;
    let chosen: Vec<TargetSpec> = specs
        .iter()
        .filter(|spec| name == "remote" || spec.matches(name))
        .cloned()
        .map(TargetSpec::Remote)
        .collect();
    if chosen.is_empty() {
        let listed: Vec<String> = specs.iter().map(RemoteSpec::entry).collect();
        bail!(
            "unknown exec target `{name}`: use local, remote (every entry of {}) or one of its entries ({})",
            remote::HOST_VAR,
            if listed.is_empty() { "none set".to_string() } else { listed.join(", ") }
        );
    }
    Ok(chosen)
}

pub fn open_executors(
    specs: &[TargetSpec],
    root: &Path,
    glslang: &Path,
    work: &Path,
    timeout: Duration,
) -> Result<Vec<Executor>> {
    let opened = parallel_map(specs, |spec| {
        Executor::new(spec, root, glslang, work, timeout)
            .map_err(|error| error.context(format!("the {} exec target", spec.describe())))
    });
    let mut executors = opened.into_iter().collect::<Result<Vec<_>>>()?;
    let devices: Vec<(TargetId, Device)> = executors
        .iter()
        .map(|e| (e.target.clone(), e.device.clone()))
        .collect();
    for (executor, label) in executors.iter_mut().zip(target_labels(&devices)) {
        executor.target = label;
    }
    for (executor, spec) in executors.iter().zip(specs) {
        eprintln!(
            "[xtask] exec target `{}` ({}): {}",
            executor.target.label(),
            spec.describe(),
            executor.describe()
        );
    }
    Ok(executors)
}

pub fn target_labels(devices: &[(TargetId, Device)]) -> Vec<TargetId> {
    let first: Vec<TargetId> = devices
        .iter()
        .map(|(target, device)| match target {
            TargetId::Local => TargetId::Local,
            TargetId::Remote(_) => TargetId::Remote(device.vendor()),
        })
        .collect();
    let shared = |label: &TargetId| first.iter().filter(|l| *l == label).count() > 1;
    let second: Vec<TargetId> = first
        .iter()
        .zip(devices)
        .map(|(label, (_, device))| match label {
            TargetId::Remote(_) if shared(label) => TargetId::Remote(remote::slug(&device.name)),
            other => other.clone(),
        })
        .collect();
    second
        .iter()
        .enumerate()
        .map(|(index, label)| {
            let earlier = second
                .get(..index)
                .unwrap_or_default()
                .iter()
                .filter(|l| *l == label)
                .count();
            match label {
                TargetId::Remote(name) if earlier > 0 => {
                    TargetId::Remote(format!("{name}-{}", earlier + 1))
                }
                other => other.clone(),
            }
        })
        .collect()
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

pub fn parallel_map<T: Sync, R: Send>(items: &[T], run: impl Fn(&T) -> R + Sync) -> Vec<R> {
    let workers = std::thread::available_parallelism()
        .map_or(4, |n| n.get())
        .min(items.len().max(1));
    let next = AtomicUsize::new(0);
    let results: Mutex<Vec<(usize, R)>> = Mutex::new(Vec::with_capacity(items.len()));
    std::thread::scope(|scope| {
        for _ in 0..workers {
            scope.spawn(|| loop {
                let index = next.fetch_add(1, Ordering::Relaxed);
                let Some(item) = items.get(index) else { break };
                let result = run(item);
                results
                    .lock()
                    .unwrap_or_else(PoisonError::into_inner)
                    .push((index, result));
            });
        }
    });
    let mut results = results.into_inner().unwrap_or_else(PoisonError::into_inner);
    results.sort_by_key(|(index, _)| *index);
    results.into_iter().map(|(_, result)| result).collect()
}

impl Executor {
    pub fn new(
        spec: &TargetSpec,
        root: &Path,
        glslang: &Path,
        work: &Path,
        timeout: Duration,
    ) -> Result<Self> {
        let backend = match spec {
            TargetSpec::Local => {
                let (Some(binary), Some(icd)) = (amber_tool(root), icd_manifest(root)) else {
                    bail!("the local exec oracles (Amber, KosmicKrisp) are missing: run `cargo xtask oracles` or pass --no-exec");
                };
                Backend::Local(Amber {
                    binary,
                    icd,
                    timeout,
                })
            }
            TargetSpec::Remote(spec) => Backend::Remote(Remote::new(spec, timeout)),
        };
        let device = match &backend {
            Backend::Local(amber) => amber.device(),
            Backend::Remote(remote) => remote.device(),
        }
        .map_err(|error| {
            anyhow!(
                "no Vulkan device through Amber on the {} target: {error}",
                spec.describe()
            )
        })?;
        let target = match spec {
            TargetSpec::Local => TargetId::Local,
            TargetSpec::Remote(_) => TargetId::Remote(device.vendor()),
        };
        let work = work.join(spec.work_name());
        let _ = fs::remove_dir_all(&work);
        fs::create_dir_all(&work)?;
        let dump_shader = compile_glsl(
            glslang,
            &work,
            "dump",
            ShaderKind::Compute,
            ShaderKind::Compute.target_env(),
            harness::DUMP_SHADER,
            timeout,
        )
        .map_err(|error| anyhow!("compiling the dump shader: {error}"))?;
        let mut executor = Self {
            target,
            backend,
            glslang: glslang.to_path_buf(),
            work,
            dump_shader,
            timeout,
            support: BTreeMap::new(),
            driver_bugs: drivers::DriverBugs::load(root, &device.driver)?,
            device,
        };
        executor.probe(&requirements::probes())?;
        Ok(executor)
    }

    pub fn describe(&self) -> String {
        format!(
            "{} (Vulkan {}, {})",
            self.device.name, self.device.api_version, self.device.driver
        )
    }

    fn probe(&mut self, needs: &[Need]) -> Result<()> {
        let dir = self.work.join("probes");
        let mut jobs = Vec::new();
        for (index, need) in needs.iter().enumerate() {
            let job_dir = dir.join(index.to_string());
            fs::create_dir_all(&job_dir)?;
            fs::copy(&self.dump_shader, job_dir.join("probe.spv"))?;
            fs::write(
                job_dir.join("probe.amber"),
                format!(
                    "#!amber\n{}\nSHADER compute probe SPIRV-BIN FILE probe.spv\nPIPELINE compute p\n  ATTACH probe\nEND\nRUN p 1 1 1\n",
                    need.line()
                ),
            )?;
            jobs.push(Job {
                dir: job_dir,
                script: "probe.amber".into(),
                dumps: Vec::new(),
            });
        }
        let results = self.confirm_jobs(&jobs);
        if !results.is_empty() && results.iter().all(Result::is_err) {
            let reason = results
                .iter()
                .find_map(|r| r.as_ref().err().cloned())
                .unwrap_or_default();
            bail!(
                "every feature probe failed on the {} target: {reason}",
                self.target.label()
            );
        }
        for (need, result) in needs.iter().zip(results) {
            self.support.insert(*need, result.err());
        }
        let missing: Vec<String> = self
            .support
            .iter()
            .filter_map(|(need, error)| {
                error
                    .as_ref()
                    .map(|error| format!("{} ({error})", need.name()))
            })
            .collect();
        eprintln!(
            "[xtask] {} target: {} of {} probed device features and extensions available; missing: {}",
            self.target.label(),
            self.support.len() - missing.len(),
            self.support.len(),
            if missing.is_empty() { "none".to_string() } else { missing.join(", ") }
        );
        Ok(())
    }

    pub fn supports(&self, need: Need) -> bool {
        matches!(self.support.get(&need), Some(None))
    }

    pub fn why_missing(&self, need: Need) -> String {
        match self.support.get(&need) {
            Some(Some(error)) => format!("{}: {error}", need.name()),
            Some(None) => need.name().to_string(),
            None => format!("{}: not probed", need.name()),
        }
    }

    pub fn missing(&self, needs: &BTreeSet<Need>) -> Option<Need> {
        needs.iter().copied().find(|need| !self.supports(*need))
    }

    pub fn run_jobs(&self, jobs: &[Job]) -> Vec<JobResult> {
        self.run_with(jobs, None)
    }

    pub fn confirm_jobs(&self, jobs: &[Job]) -> Vec<JobResult> {
        self.run_with(jobs, Some(1))
    }

    fn run_with(&self, jobs: &[Job], workers: Option<usize>) -> Vec<JobResult> {
        if jobs.is_empty() {
            return Vec::new();
        }
        match &self.backend {
            Backend::Local(amber) => {
                batch::run_local(amber, jobs, workers.unwrap_or(LOCAL_GPU_JOBS))
            }
            Backend::Remote(remote) => match workers {
                Some(workers) => {
                    let single = Remote {
                        jobs: workers,
                        ..remote.clone()
                    };
                    single.run(&self.work, jobs)
                }
                None => remote.run(&self.work, jobs),
            },
        }
    }

    pub fn work_dir(&self) -> &Path {
        &self.work
    }

    pub fn prepare(&self, plan: &Plan, dir: &Path) -> Result<Vec<(ShaderKind, PathBuf)>, String> {
        let data = dir.join("data");
        fs::create_dir_all(&data).map_err(|e| e.to_string())?;
        fs::copy(&self.dump_shader, dir.join(DUMP_FILE)).map_err(|e| e.to_string())?;
        for (name, bytes) in &plan.files {
            fs::write(data.join(name), bytes).map_err(|e| e.to_string())?;
        }
        let mut harness = Vec::new();
        for (index, (kind, source)) in plan.harness.iter().enumerate() {
            let name = format!("harness{index}");
            let env = plan.harness_env.unwrap_or_else(|| kind.target_env());
            compile_glsl(&self.glslang, dir, &name, *kind, env, source, self.timeout)?;
            harness.push((
                *kind,
                PathBuf::from(format!("{name}.{}.spv", kind.extension())),
            ));
        }
        Ok(harness)
    }

    pub fn stage(
        &self,
        plan: &Plan,
        dir: &Path,
        harness: &[(ShaderKind, PathBuf)],
        spirv: &Path,
        tag: &str,
    ) -> Result<Job, String> {
        let tested = PathBuf::from(format!("{tag}.spv"));
        fs::copy(spirv, dir.join(&tested)).map_err(|e| e.to_string())?;
        let script = plan.script(ScriptPaths {
            tested: &tested,
            harness,
            dump: Path::new(DUMP_FILE),
            data: Path::new("data"),
        });
        let name = format!("{tag}.amber");
        fs::write(dir.join(&name), script).map_err(|e| e.to_string())?;
        Ok(Job {
            dir: dir.to_path_buf(),
            script: name,
            dumps: plan.dumps().into_iter().map(str::to_string).collect(),
        })
    }

    fn stage_case(&self, case: &ExecCase) -> Result<Ready, Outcome> {
        let reflect = |path: &Path| -> Result<Reflection, String> {
            let bytes = fs::read(path).map_err(|e| e.to_string())?;
            reflect::reflect_bytes(&bytes)
        };
        let theirs = reflect(&case.reference).map_err(|e| Outcome::skip(SkipReason::Binding, e))?;
        let mine = reflect(&case.ours)
            .map_err(|e| Outcome::Fail(format!("reflecting our module: {e}")))?;
        let stage_needs = requirements::stage_needs(theirs.model);
        if let Some(need) = stage_needs.into_iter().find(|n| !self.supports(*n)) {
            return Err(Outcome::skip(
                SkipReason::DeviceFeature,
                self.why_missing(need),
            ));
        }
        let inputs = Inputs {
            seed: case.name.clone(),
            ..Inputs::default()
        };
        let plan = Plan::new(&theirs, &inputs).map_err(refusal)?;
        if let Some(need) = self.missing(&plan.needs) {
            return Err(Outcome::skip(
                SkipReason::DeviceFeature,
                self.why_missing(need),
            ));
        }
        if let Some(shape) =
            cooperative::unsupported(&theirs.cooperative_matrices, &self.device.cooperative)
        {
            return Err(Outcome::skip(SkipReason::DeviceFeature, shape));
        }
        if let Some(shared) = shared_binding(&theirs) {
            return Err(Outcome::skip(SkipReason::Binding, shared));
        }
        if let Some(difference) = interface_difference(&theirs, &mine) {
            return Err(Outcome::Fail(format!("interface differs: {difference}")));
        }
        let mut our_plan = Plan::new(&mine, &inputs).map_err(|error| {
            Outcome::Fail(format!(
                "our module needs what glslang's does not: {}",
                refusal_text(&error)
            ))
        })?;
        if let Some(need) = self.missing(&our_plan.needs) {
            return Err(Outcome::Fail(format!(
                "our module needs {}, glslang's does not",
                need.line()
            )));
        }
        our_plan.needs.extend(plan.needs.iter().copied());
        let dir = self.work.join(&case.name);
        let harness = self
            .prepare(&plan, &dir)
            .map_err(|error| Outcome::skip(SkipReason::Binding, format!("harness: {error}")))?;
        let theirs_job = self
            .stage(&plan, &dir, &harness, &case.reference, "glslang")
            .map_err(|error| Outcome::skip(SkipReason::Binding, error))?;
        let ours_job = self
            .stage(&our_plan, &dir, &harness, &case.ours, "rglsl")
            .map_err(|error| Outcome::skip(SkipReason::Binding, error))?;
        Ok(Ready {
            plan,
            theirs: theirs_job,
            ours: ours_job,
            twin: case.twin,
        })
    }

    pub fn exec_all(&self, cases: &[ExecCase]) -> Vec<Outcome> {
        let staged = parallel_map(cases, |case| {
            self.stage_case(case).map_err(|outcome| {
                if case.twin {
                    twin::refused(outcome)
                } else {
                    outcome
                }
            })
        });
        let mut jobs = Vec::new();
        for ready in staged.iter().flatten() {
            jobs.push(ready.theirs.clone());
            jobs.push(ready.ours.clone());
        }
        let mut first = self.run_jobs(&jobs).into_iter();
        let mut outcomes: Vec<Option<Outcome>> = Vec::with_capacity(staged.len());
        let mut pending: Vec<(usize, Option<Outputs>)> = Vec::new();
        let mut twins: Vec<(usize, Vec<(JobResult, JobResult)>)> = Vec::new();
        for (index, entry) in staged.iter().enumerate() {
            match entry {
                Err(outcome) => outcomes.push(Some(outcome.clone())),
                Ok(ready) => {
                    let expected = first
                        .next()
                        .unwrap_or_else(|| Err("no result from the batch".into()));
                    let actual = first
                        .next()
                        .unwrap_or_else(|| Err("no result from the batch".into()));
                    if ready.twin {
                        outcomes.push(None);
                        twins.push((index, vec![(expected, actual)]));
                        continue;
                    }
                    if let (Ok(e), Ok(a)) = (&expected, &actual) {
                        if let Ok(tolerated) = compare_outputs(&ready.plan, e, a) {
                            outcomes.push(Some(Outcome::Pass { tolerated }));
                            continue;
                        }
                    }
                    outcomes.push(None);
                    pending.push((index, expected.ok()));
                }
            }
        }
        let mut again = Vec::new();
        for (index, _) in &pending {
            if let Some(Ok(ready)) = staged.get(*index) {
                again.push(ready.theirs.clone());
                again.push(ready.ours.clone());
            }
        }
        let mut confirmed = self.confirm_jobs(&again).into_iter();
        for (index, expected_first) in pending {
            let Some(Ok(ready)) = staged.get(index) else {
                continue;
            };
            let expected = confirmed
                .next()
                .unwrap_or_else(|| Err("no result from the confirmation".into()));
            let actual = confirmed
                .next()
                .unwrap_or_else(|| Err("no result from the confirmation".into()));
            let outcome = confirm(&ready.plan, expected_first.as_ref(), expected, actual);
            if let Some(slot) = outcomes.get_mut(index) {
                *slot = Some(outcome);
            }
        }
        self.repeat_twins(&staged, &mut twins);
        for (index, runs) in twins {
            if let (Some(Ok(ready)), Some(slot)) = (staged.get(index), outcomes.get_mut(index)) {
                *slot = Some(twin::judge(&ready.plan, runs));
            }
        }
        outcomes
            .into_iter()
            .map(|o| o.unwrap_or_else(|| Outcome::skip(SkipReason::ReferenceFails, "no result")))
            .collect()
    }
}

impl Executor {
    fn repeat_twins(
        &self,
        staged: &[Result<Ready, Outcome>],
        twins: &mut [(usize, Vec<(JobResult, JobResult)>)],
    ) {
        for _ in 1..twin::RUNS {
            let mut jobs = Vec::new();
            for (index, _) in twins.iter() {
                if let Some(Ok(ready)) = staged.get(*index) {
                    jobs.push(ready.theirs.clone());
                    jobs.push(ready.ours.clone());
                }
            }
            let mut results = self.run_jobs(&jobs).into_iter();
            for (_, runs) in twins.iter_mut() {
                let expected = results
                    .next()
                    .unwrap_or_else(|| Err("no result from the batch".into()));
                let actual = results
                    .next()
                    .unwrap_or_else(|| Err("no result from the batch".into()));
                runs.push((expected, actual));
            }
        }
    }
}

fn confirm(
    plan: &Plan,
    expected_first: Option<&Outputs>,
    expected: JobResult,
    actual: JobResult,
) -> Outcome {
    let expected = match expected {
        Ok(outputs) => outputs,
        Err(error) => return Outcome::skip(SkipReason::ReferenceFails, error),
    };
    let actual = match actual {
        Ok(outputs) => outputs,
        Err(error) => {
            return Outcome::Fail(format!(
                "our module fails on the driver (confirmed alone): {error}"
            ))
        }
    };
    if let Some(first) = expected_first {
        if let Err(difference) = compare_outputs(plan, first, &expected) {
            return Outcome::skip(SkipReason::Nondeterministic, difference.to_string());
        }
    }
    match compare_outputs(plan, &expected, &actual) {
        Ok(tolerated) => Outcome::Pass { tolerated },
        Err(difference) => {
            Outcome::Fail(format!("{difference} (glslang vs rglsl, confirmed alone)"))
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
    if theirs.ray_variables != mine.ray_variables {
        return Some(format!(
            "ray tracing variables {:?} vs {:?}",
            theirs.ray_variables, mine.ray_variables
        ));
    }
    if theirs.shader_record != mine.shader_record {
        return Some(format!(
            "shader record buffer {:?} vs {:?}",
            theirs.shader_record, mine.shader_record
        ));
    }
    if theirs.addresses != mine.addresses {
        return Some(format!(
            "acceleration structure addresses at {:?} vs {:?}",
            theirs.addresses, mine.addresses
        ));
    }
    if theirs.task_payload != mine.task_payload {
        return Some(format!(
            "task payload {:?} vs {:?}",
            theirs.task_payload, mine.task_payload
        ));
    }
    for (what, a, b) in [
        ("input", &theirs.inputs, &mine.inputs),
        ("output", &theirs.outputs, &mine.outputs),
    ] {
        let shape = |v: &reflect::Varying| {
            (
                v.location,
                v.component,
                v.patch,
                v.per_primitive,
                v.ty.clone(),
            )
        };
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
    kind: ShaderKind,
    target_env: &str,
    source: &str,
    timeout: Duration,
) -> Result<PathBuf, String> {
    fs::create_dir_all(dir).map_err(|e| e.to_string())?;
    let extension = kind.extension();
    let input = dir.join(format!("{name}.{extension}"));
    let output = dir.join(format!("{name}.{extension}.spv"));
    fs::write(&input, source).map_err(|e| e.to_string())?;
    let mut command = Command::new(glslang);
    command
        .args(["-V", "--target-env", target_env, "-o"])
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

#[cfg(test)]
mod tests {
    use super::*;
    use crate::exec::plan::Target;
    use crate::exec::reflect::{Scalar, ScalarKind, Slot};

    fn plan() -> anyhow::Result<Plan> {
        let reflection = Reflection::new(spirv::ExecutionModel::GLCompute);
        let mut plan = Plan::new(&reflection, &Inputs::default())
            .map_err(|refusal| anyhow::anyhow!("{refusal:?}"))?;
        plan.targets.push(Target {
            name: "buffer".into(),
            buffer: "b".into(),
            dump: "dump:0:0".into(),
            slots: vec![Slot {
                offset: 0,
                scalar: Scalar {
                    kind: ScalarKind::Uint,
                    width: 32,
                },
            }],
        });
        Ok(plan)
    }

    fn outputs(value: u32) -> Outputs {
        [("dump:0:0".to_string(), value.to_le_bytes().to_vec())]
            .into_iter()
            .collect()
    }

    #[test]
    fn confirmation_decides_the_verdict() -> anyhow::Result<()> {
        let plan = plan()?;
        assert_eq!(
            confirm(&plan, Some(&outputs(1)), Ok(outputs(1)), Ok(outputs(1))),
            Outcome::Pass { tolerated: 0 }
        );
        assert!(matches!(
            confirm(&plan, Some(&outputs(1)), Ok(outputs(1)), Ok(outputs(2))),
            Outcome::Fail(_)
        ));
        assert!(matches!(
            confirm(&plan, Some(&outputs(3)), Ok(outputs(1)), Ok(outputs(2))),
            Outcome::Skip {
                reason: SkipReason::Nondeterministic,
                ..
            }
        ));
        assert!(matches!(
            confirm(&plan, None, Err("lost".into()), Ok(outputs(2))),
            Outcome::Skip {
                reason: SkipReason::ReferenceFails,
                ..
            }
        ));
        assert!(matches!(
            confirm(&plan, None, Ok(outputs(2)), Err("lost".into())),
            Outcome::Fail(_)
        ));
        Ok(())
    }

    #[test]
    fn targets_have_stable_labels() {
        assert_eq!(
            TargetId::parse("nvidia"),
            Some(TargetId::Remote("nvidia".into()))
        );
        assert_eq!(TargetId::parse(" local"), Some(TargetId::Local));
        assert_eq!(TargetId::parse("a b"), None);
        assert_eq!(TargetId::parse(""), None);
    }

    #[test]
    fn remote_targets_are_named_after_their_gpu() {
        let device = |name: &str, driver: &str| Device {
            name: name.into(),
            api_version: "1.4".into(),
            driver: driver.into(),
            cooperative: Vec::new(),
        };
        let remote = || TargetId::Remote(String::new());
        let labels = target_labels(&[
            (TargetId::Local, device("Apple M4 Max", "KosmicKrisp")),
            (
                remote(),
                device("AMD Radeon(TM) 8060S Graphics", "AMD proprietary driver"),
            ),
            (remote(), device("NVIDIA GeForce RTX 4090", "NVIDIA 617.14")),
        ]);
        let names: Vec<&str> = labels.iter().map(TargetId::label).collect();
        assert_eq!(names, ["local", "amd", "nvidia"]);
        let labels = target_labels(&[
            (
                remote(),
                device("AMD Radeon(TM) 8060S Graphics", "AMD proprietary driver"),
            ),
            (
                remote(),
                device("AMD Radeon RX 9060 XT", "AMD proprietary driver"),
            ),
            (
                remote(),
                device("AMD Radeon RX 9060 XT", "AMD proprietary driver"),
            ),
        ]);
        let names: Vec<&str> = labels.iter().map(TargetId::label).collect();
        assert_eq!(
            names,
            [
                "amd-radeon-tm-8060s-graphics",
                "amd-radeon-rx-9060-xt",
                "amd-radeon-rx-9060-xt-2"
            ]
        );
    }
}
