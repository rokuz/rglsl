use std::collections::{BTreeMap, BTreeSet};
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::{Duration, Instant};

use anyhow::{Result, bail};

use super::{Outcome, Set, UnitResult, Variant};
use crate::bench::stats;
use crate::exec::batch::{
    CHECK_ERROR, Capture, Job, JobError, JobResult, Outputs, STATISTICS, TIMED_ERROR, TIMING,
};
use crate::exec::harness::ShaderKind;
use crate::exec::plan::Plan;
use crate::exec::statistics::{self, Report};
use crate::exec::{self, Executor, TargetSpec, amber, reflect};
use crate::oracles;

pub const VARIANTS: [Variant; 4] = [
    Variant::Rglsl,
    Variant::RglslO,
    Variant::SpirvOptO,
    Variant::GlslangO,
];
const CHECKED: [Variant; 3] = [Variant::RglslO, Variant::SpirvOptO, Variant::GlslangO];
const REFERENCES: [Variant; 2] = [Variant::Rglsl, Variant::GlslangO];
const PIPELINE: &str = "main";
const SYNTHETIC_TIMEOUT: Duration = Duration::from_secs(120);
const PERF_RUNS: usize = 20;
const PERF_ROUNDS: usize = 3;
const LISTED: usize = 60;

const fn tag(variant: Variant) -> &'static str {
    match variant {
        Variant::Rglsl => "rglsl",
        Variant::RglslO => "rglsl-O",
        Variant::RglslOs => "rglsl-Os",
        Variant::SpirvOptO => "spirv-opt-O",
        Variant::SpirvOptOs => "spirv-opt-Os",
        Variant::GlslangO => "glslang-O",
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Equivalence {
    Same { tolerated: usize },
    Differs(String),
    Fails(String),
    Nondeterministic(String),
    ReferenceFails(String),
    NotRun(String),
}

impl Equivalence {
    const KINDS: [&'static str; 6] = [
        "same",
        "differs",
        "fails",
        "nondeterministic",
        "reference-fails",
        "not-run",
    ];

    const fn code(&self) -> &'static str {
        match self {
            Self::Same { .. } => "same",
            Self::Differs(_) => "differs",
            Self::Fails(_) => "fails",
            Self::Nondeterministic(_) => "nondeterministic",
            Self::ReferenceFails(_) => "reference-fails",
            Self::NotRun(_) => "not-run",
        }
    }

    fn detail(&self) -> &str {
        match self {
            Self::Same { .. } => "",
            Self::Differs(text)
            | Self::Fails(text)
            | Self::Nondeterministic(text)
            | Self::ReferenceFails(text)
            | Self::NotRun(text) => text,
        }
    }
}

#[derive(Debug, Clone, Default, PartialEq)]
pub struct Measured {
    pub error: Option<String>,
    pub statistics: BTreeMap<String, f64>,
    pub gpu_ms: Option<f64>,
    pub gpu_times: Vec<f64>,
    pub round_minima: Vec<f64>,
    pub create_ms: Option<f64>,
}

impl Measured {
    pub fn spread(&self) -> Option<f64> {
        if self.round_minima.len() < 2 {
            return spread(&self.gpu_times);
        }
        let fastest = stats::minimum(&self.round_minima)?;
        let slowest = self.round_minima.iter().copied().reduce(f64::max)?;
        stats::ratio(slowest - fastest, fastest)
    }
}

fn spread(times: &[f64]) -> Option<f64> {
    if times.len() < 2 {
        return None;
    }
    let (first, second) = times.split_at(times.len() / 2);
    let (first, second) = (stats::minimum(first)?, stats::minimum(second)?);
    stats::ratio((first - second).abs(), first.min(second))
}

#[derive(Debug, Clone, PartialEq)]
pub struct UnitRun {
    pub unit: usize,
    pub skipped: Option<String>,
    pub measured: BTreeMap<Variant, Measured>,
    pub equivalence: BTreeMap<Variant, Equivalence>,
}

#[derive(Debug, Clone, PartialEq)]
pub struct TargetRun {
    pub label: String,
    pub device: String,
    pub statistics: Option<String>,
    pub executable_properties: bool,
    pub shader_info_amd: bool,
    pub runs: Vec<UnitRun>,
}

struct Staged {
    unit: usize,
    plan: Plan,
    stage: ShaderKind,
    reference: Variant,
    alone: bool,
    checks: Vec<(Variant, Job)>,
    timed: Vec<(Variant, Job)>,
    refused: Vec<(Variant, String)>,
}

pub fn timed_script(script: &str, runs: usize) -> String {
    let mut out = String::with_capacity(script.len());
    for line in script.lines() {
        match line.strip_prefix("RUN ") {
            Some(rest) => {
                for _ in 0..runs.max(1) {
                    let _ = writeln!(out, "RUN TIMED_EXECUTION {rest}");
                }
            }
            None => {
                out.push_str(line);
                out.push('\n');
            }
        }
    }
    out
}

fn module(result: &UnitResult, variant: Variant) -> Option<&Path> {
    match result.outcome(variant) {
        Outcome::Module {
            path,
            invalid: None,
            ..
        } => Some(path),
        _ => None,
    }
}

fn stage_unit(
    executor: &Executor,
    index: usize,
    result: &UnitResult,
    capture: bool,
    runs: usize,
) -> Result<Staged, String> {
    let rglsl = module(result, Variant::Rglsl).ok_or("rglsl's module is not valid")?;
    if let Some(why) = executor.driver_bugs.get(&result.unit.case) {
        return Err(format!("known driver bug: {why}"));
    }
    let bytes = fs::read(rglsl).map_err(|e| e.to_string())?;
    let reflection = reflect::reflect_bytes(&bytes).map_err(|e| format!("reflection: {e}"))?;
    let plan = executor
        .plan_sized(
            result.unit.seed(),
            &reflection,
            result.unit.size.groups,
            result.unit.size.framebuffer,
        )
        .map_err(|outcome| match outcome {
            exec::Outcome::Skip { reason, detail } => format!("{}: {detail}", reason.code()),
            exec::Outcome::Fail(detail) => detail,
            exec::Outcome::Pass { .. } => "not planned".into(),
        })?;
    let dir = executor.work_dir().join(&result.unit.name);
    let harness = executor
        .prepare(&plan, &dir)
        .map_err(|error| format!("harness: {error}"))?;
    let mut checks = Vec::new();
    let mut timed = Vec::new();
    let mut refused = Vec::new();
    for variant in VARIANTS {
        let Some(path) = module(result, variant) else {
            continue;
        };
        if let Some(why) = executor
            .driver_bugs
            .variant(&result.unit.case, tag(variant))
        {
            refused.push((variant, format!("not run on this driver: {why}")));
            continue;
        }
        let variant_plan = match variant_plan(executor, &plan, path) {
            Ok(variant_plan) => variant_plan,
            Err(why) if variant == Variant::Rglsl => return Err(why),
            Err(why) => {
                refused.push((variant, why));
                continue;
            }
        };
        let mut check = Executor::stage(&variant_plan, &dir, &harness, path, tag(variant))?;
        check.capture = Capture {
            statistics: capture,
            timing: false,
        };
        check.timeout = Some(if result.unit.set == Set::Synthetic {
            SYNTHETIC_TIMEOUT
        } else {
            exec::JOB_TIMEOUT
        });
        let script = fs::read_to_string(dir.join(&check.script)).map_err(|e| e.to_string())?;
        let name = format!("{}.timed.amber", tag(variant));
        let repeats = if result.unit.set == Set::Perf {
            runs.max(PERF_RUNS)
        } else {
            runs
        };
        fs::write(dir.join(&name), timed_script(&script, repeats)).map_err(|e| e.to_string())?;
        timed.push((
            variant,
            Job {
                timed: Some(name),
                capture: Capture {
                    statistics: capture,
                    timing: true,
                },
                timeout: check.timeout.map(|timeout| timeout * 2),
                ..check.clone()
            },
        ));
        checks.push((variant, check));
    }
    let reference = REFERENCES
        .into_iter()
        .find(|reference| checks.iter().any(|(variant, _)| variant == reference))
        .ok_or("neither rglsl's module nor glslang -O's runs as the reference")?;
    Ok(Staged {
        unit: index,
        stage: plan.stage,
        reference,
        alone: result.unit.set == Set::Perf,
        plan,
        checks,
        timed,
        refused,
    })
}

fn variant_plan(executor: &Executor, plan: &Plan, path: &Path) -> Result<Plan, String> {
    let bytes = fs::read(path).map_err(|e| e.to_string())?;
    let reflection = reflect::reflect_bytes(&bytes).map_err(|e| format!("reflection: {e}"))?;
    let mut needs = exec::plan::requirements(&reflection)
        .map_err(|refusal| format!("its module needs what the plan cannot give: {refusal:?}"))?;
    needs.extend(exec::requirements::stage_needs(reflection.model));
    if let Some(need) = executor.missing(&needs) {
        return Err(format!(
            "its module needs {}, which the device does not support",
            need.line()
        ));
    }
    let mut variant_plan = plan.clone();
    variant_plan.needs.extend(needs);
    Ok(variant_plan)
}

fn report_of(outputs: &Outputs) -> Option<Report> {
    outputs
        .get(STATISTICS)
        .and_then(|bytes| Report::parse(bytes).ok())
}

#[derive(Debug, Clone, PartialEq)]
struct Ran {
    check: JobResult,
    timed: JobResult,
}

fn split(combined: &Job, result: JobResult) -> (Option<JobResult>, Option<JobResult>) {
    let Ok(outputs) = result else {
        return (None, None);
    };
    let error = |key: &str| {
        outputs
            .get(key)
            .map(|bytes| String::from_utf8_lossy(bytes).into_owned())
    };
    let statistics = |script: &str| {
        outputs
            .get(STATISTICS)
            .and_then(|bytes| statistics::of_script(bytes, script).ok())
    };
    let check = match error(CHECK_ERROR) {
        Some(_) => None,
        None => {
            let mut check: Outputs = outputs
                .iter()
                .filter(|(key, _)| !key.starts_with('#'))
                .map(|(key, value)| (key.clone(), value.clone()))
                .collect();
            if let Some(bytes) = statistics(&combined.script) {
                check.insert(STATISTICS.to_string(), bytes);
            }
            Some(Ok(check))
        }
    };
    let timed = match error(TIMED_ERROR) {
        Some(message) if crate::exec::batch::transient(&message) => None,
        Some(message) => Some(Err(JobError::Failed(message))),
        None => {
            let mut timed = Outputs::new();
            if let Some(stdout) = outputs.get(TIMING) {
                timed.insert(TIMING.to_string(), stdout.clone());
            }
            if let Some(bytes) = combined.timed.as_deref().and_then(statistics) {
                timed.insert(STATISTICS.to_string(), bytes);
            }
            Some(Ok(timed))
        }
    };
    (check, timed)
}

fn timed_alone(combined: &Job) -> Option<Job> {
    let script = combined.timed.clone()?;
    Some(Job {
        script,
        dumps: Vec::new(),
        timed: None,
        ..combined.clone()
    })
}

fn check_alone(combined: &Job) -> Job {
    Job {
        timed: None,
        timeout: combined.timeout.map(|timeout| timeout / 2),
        capture: Capture {
            timing: false,
            ..combined.capture
        },
        ..combined.clone()
    }
}

fn serially(executor: &Executor, jobs: &[Job], alone: &[bool]) -> Vec<JobResult> {
    let pick = |wanted: bool| -> (Vec<usize>, Vec<Job>) {
        jobs.iter()
            .enumerate()
            .filter(|(index, _)| alone.get(*index).copied().unwrap_or(false) == wanted)
            .map(|(index, job)| (index, job.clone()))
            .unzip()
    };
    let (shared_at, shared) = pick(false);
    let (alone_at, own) = pick(true);
    let mut results: Vec<Option<JobResult>> = vec![None; jobs.len()];
    let ran = executor
        .run_serial(&shared)
        .into_iter()
        .zip(shared_at)
        .chain(executor.run_alone(&own).into_iter().zip(alone_at));
    for (result, index) in ran {
        if let Some(slot) = results.get_mut(index) {
            *slot = Some(result);
        }
    }
    results
        .into_iter()
        .map(|result| result.unwrap_or_else(|| Err(JobError::missing("batch"))))
        .collect()
}

fn more_rounds(executor: &Executor, combined: &[Job], alone: &[bool]) -> Vec<Vec<JobResult>> {
    let mut rounds: Vec<Vec<JobResult>> = vec![Vec::new(); combined.len()];
    let jobs: Vec<(usize, Job)> = combined
        .iter()
        .enumerate()
        .filter(|(index, _)| alone.get(*index).copied().unwrap_or(false))
        .filter_map(|(index, job)| Some((index, timed_alone(job)?)))
        .collect();
    let list: Vec<Job> = jobs.iter().map(|(_, job)| job.clone()).collect();
    for _ in 1..PERF_ROUNDS {
        for ((index, _), result) in jobs.iter().zip(executor.run_alone(&list)) {
            if let Some(slot) = rounds.get_mut(*index) {
                slot.push(result);
            }
        }
    }
    rounds
}

fn run_combined(executor: &Executor, combined: &[Job], alone: &[bool]) -> Vec<Ran> {
    let mut split: Vec<(Option<JobResult>, Option<JobResult>)> = if executor.workers() == 1 {
        combined
            .iter()
            .zip(serially(executor, combined, alone))
            .map(|(job, result)| self::split(job, result))
            .collect()
    } else {
        vec![(None, None); combined.len()]
    };
    let missing = || Err(JobError::missing("batch"));
    let checks: Vec<(usize, Job)> = split
        .iter()
        .enumerate()
        .filter(|(_, (check, _))| check.is_none())
        .filter_map(|(index, _)| Some((index, check_alone(combined.get(index)?))))
        .collect();
    let jobs: Vec<Job> = checks.iter().map(|(_, job)| job.clone()).collect();
    for ((index, _), result) in checks.iter().zip(executor.run_jobs(&jobs)) {
        if let Some((check, _)) = split.get_mut(*index) {
            *check = Some(result);
        }
    }
    let timed: Vec<(usize, Job)> = split
        .iter()
        .enumerate()
        .filter(|(_, (_, timed))| timed.is_none())
        .filter_map(|(index, _)| Some((index, timed_alone(combined.get(index)?)?)))
        .collect();
    let jobs: Vec<Job> = timed.iter().map(|(_, job)| job.clone()).collect();
    let timed_alone_flags: Vec<bool> = timed
        .iter()
        .map(|(index, _)| alone.get(*index).copied().unwrap_or(false))
        .collect();
    for ((index, _), result) in timed
        .iter()
        .zip(serially(executor, &jobs, &timed_alone_flags))
    {
        if let Some((_, slot)) = split.get_mut(*index) {
            *slot = Some(result);
        }
    }
    split
        .into_iter()
        .map(|(check, timed)| Ran {
            check: check.unwrap_or_else(missing),
            timed: timed.unwrap_or_else(missing),
        })
        .collect()
}

fn measure(stage: ShaderKind, check: &JobResult, rounds: &[JobResult]) -> Measured {
    let mut measured = Measured::default();
    match check {
        Ok(outputs) => {
            if let Some(report) = report_of(outputs) {
                measured.statistics = report.values(PIPELINE, stage.amber());
                measured.create_ms = stats::median(&report.create_times(PIPELINE));
            }
        }
        Err(error) => measured.error = Some(error.to_string()),
    }
    for outputs in rounds.iter().filter_map(|round| round.as_ref().ok()) {
        if let Some(stdout) = outputs.get(TIMING) {
            let times = amber::parse_timing(&String::from_utf8_lossy(stdout));
            if times.iter().any(|time| *time > 0.0)
                && let Some(fastest) = stats::minimum(&times)
            {
                measured.round_minima.push(fastest);
                measured.gpu_times.extend(times);
            }
        }
    }
    measured.gpu_ms = stats::minimum(&measured.round_minima);
    if let Some(Ok(outputs)) = rounds.first()
        && let Some(report) = report_of(outputs)
    {
        let times = report.create_times(PIPELINE);
        if !times.is_empty() {
            measured.create_ms = stats::median(&times);
        }
    }
    measured
}

fn judge(
    plan: &Plan,
    first: &JobResult,
    variant: &JobResult,
    again: Option<(&JobResult, &JobResult)>,
) -> Equivalence {
    if let Some(error) = [
        Some(first),
        Some(variant),
        again.map(|(r, _)| r),
        again.map(|(_, v)| v),
    ]
    .into_iter()
    .flatten()
    .find_map(|result| result.as_ref().err().filter(|error| !error.ran()))
    {
        return Equivalence::NotRun(error.to_string());
    }
    let reference = match first {
        Ok(outputs) => outputs,
        Err(error) => return Equivalence::ReferenceFails(error.to_string()),
    };
    if let Ok(actual) = variant
        && let Ok(tolerated) = exec::compare_outputs(plan, reference, actual)
    {
        return Equivalence::Same { tolerated };
    }
    let Some((reference_again, variant_again)) = again else {
        return Equivalence::NotRun("not confirmed".into());
    };
    let reference_again = match reference_again {
        Ok(outputs) => outputs,
        Err(error) => return Equivalence::ReferenceFails(format!("confirmed alone: {error}")),
    };
    if let Err(difference) = exec::compare_outputs(plan, reference, reference_again) {
        return Equivalence::Nondeterministic(difference.to_string());
    }
    match variant_again {
        Err(error) => Equivalence::Fails(format!("confirmed alone: {error}")),
        Ok(actual) => match exec::compare_outputs(plan, reference_again, actual) {
            Ok(tolerated) => Equivalence::Same { tolerated },
            Err(difference) => Equivalence::Differs(format!("{difference} (confirmed alone)")),
        },
    }
}

fn run_target(
    executor: &Executor,
    results: &[UnitResult],
    runs: usize,
    probe: &Result<Outputs, String>,
) -> TargetRun {
    let label = executor.target.label().to_string();
    let (statistics, report) = match &probe {
        Ok(outputs) => (None, report_of(outputs).unwrap_or_default()),
        Err(error) => (Some(error.clone()), Report::default()),
    };
    if let Some(error) = &statistics {
        eprintln!(
            "[xtask] warning: Amber on the `{label}` target cannot write pipeline statistics ({error}); build an Amber with --pipeline-stats (`cargo xtask oracles`, or RGLSL_AMBER locally); measuring GPU time and equivalence only"
        );
    }
    let capture = statistics.is_none();
    let started = Instant::now();
    let staged = exec::parallel_map(&(0..results.len()).collect::<Vec<_>>(), |&index| {
        results
            .get(index)
            .ok_or_else(|| "no unit".to_string())
            .and_then(|result| stage_unit(executor, index, result, capture, runs))
    });
    let ready: Vec<&Staged> = staged.iter().filter_map(|s| s.as_ref().ok()).collect();
    eprintln!(
        "[xtask] {label}: {} of {} shaders staged ({:.0}s); running the checks and timed runs",
        ready.len(),
        results.len(),
        started.elapsed().as_secs_f64()
    );
    let combined: Vec<Job> = ready
        .iter()
        .flat_map(|s| s.timed.iter().map(|(_, job)| job.clone()))
        .collect();
    let alone: Vec<bool> = ready
        .iter()
        .flat_map(|s| s.timed.iter().map(|_| s.alone))
        .collect();
    let mut ran = run_combined(executor, &combined, &alone).into_iter();
    let mut extra = more_rounds(executor, &combined, &alone).into_iter();
    eprintln!(
        "[xtask] {label}: checks and timed runs done ({:.0}s)",
        started.elapsed().as_secs_f64()
    );
    let mut first: Vec<BTreeMap<Variant, JobResult>> = Vec::with_capacity(ready.len());
    let mut timing: Vec<BTreeMap<Variant, Vec<JobResult>>> = Vec::with_capacity(ready.len());
    for staged in &ready {
        let mut checks = BTreeMap::new();
        let mut timed = BTreeMap::new();
        for (variant, _) in &staged.timed {
            let Ran {
                check,
                timed: timing,
            } = ran.next().unwrap_or_else(|| Ran {
                check: Err(JobError::missing("batch")),
                timed: Err(JobError::missing("batch")),
            });
            let mut rounds = vec![timing];
            rounds.extend(extra.next().unwrap_or_default());
            checks.insert(*variant, check);
            timed.insert(*variant, rounds);
        }
        first.push(checks);
        timing.push(timed);
    }
    let mut again_jobs = Vec::new();
    let mut again_slots = Vec::new();
    for (position, staged) in ready.iter().enumerate() {
        let Some(results) = first.get(position) else {
            continue;
        };
        let Some(Ok(reference)) = results.get(&staged.reference) else {
            continue;
        };
        let job = |variant: Variant| {
            staged
                .checks
                .iter()
                .find(|(v, _)| *v == variant)
                .map(|(_, job)| job.clone())
        };
        for variant in CHECKED {
            if variant == staged.reference {
                continue;
            }
            let Some(result) = results.get(&variant) else {
                continue;
            };
            let same = result
                .as_ref()
                .is_ok_and(|actual| exec::compare_outputs(&staged.plan, reference, actual).is_ok());
            if same {
                continue;
            }
            if let (Some(reference_job), Some(variant_job)) = (job(staged.reference), job(variant))
            {
                again_slots.push((position, variant, again_jobs.len()));
                again_jobs.push(reference_job);
                again_jobs.push(variant_job);
            }
        }
    }
    let again = executor.confirm_jobs(&again_jobs);
    let mut runs_out: Vec<UnitRun> = Vec::with_capacity(results.len());
    let mut ready_position = 0;
    for (index, entry) in staged.iter().enumerate() {
        let staged = match entry {
            Err(why) => {
                runs_out.push(UnitRun {
                    unit: index,
                    skipped: Some(why.clone()),
                    measured: BTreeMap::new(),
                    equivalence: BTreeMap::new(),
                });
                continue;
            }
            Ok(staged) => staged,
        };
        let position = ready_position;
        ready_position += 1;
        let empty = BTreeMap::new();
        let no_rounds = BTreeMap::new();
        let checks = first.get(position).unwrap_or(&empty);
        let timed = timing.get(position).unwrap_or(&no_rounds);
        let mut measured = BTreeMap::new();
        for (variant, check) in checks {
            let rounds = timed.get(variant).map_or(&[][..], Vec::as_slice);
            measured.insert(*variant, measure(staged.stage, check, rounds));
        }
        let mut equivalence: BTreeMap<Variant, Equivalence> = staged
            .refused
            .iter()
            .map(|(variant, why)| (*variant, Equivalence::NotRun(why.clone())))
            .collect();
        if let Some(reference) = checks.get(&staged.reference) {
            for variant in CHECKED {
                if variant == staged.reference {
                    continue;
                }
                let Some(result) = checks.get(&variant) else {
                    continue;
                };
                let confirmation = again_slots
                    .iter()
                    .find(|(p, v, _)| *p == position && *v == variant)
                    .and_then(|(_, _, at)| Some((again.get(*at)?, again.get(*at + 1)?)));
                equivalence.insert(
                    variant,
                    judge(&staged.plan, reference, result, confirmation),
                );
            }
        }
        runs_out.push(UnitRun {
            unit: staged.unit,
            skipped: None,
            measured,
            equivalence,
        });
    }
    eprintln!(
        "[xtask] {label}: done ({:.0}s)",
        started.elapsed().as_secs_f64()
    );
    TargetRun {
        label,
        device: executor.describe(),
        statistics,
        executable_properties: report.executable_properties,
        shader_info_amd: report.shader_info_amd,
        runs: runs_out,
    }
}

pub fn run(
    root: &Path,
    results: &[UnitResult],
    specs: &[TargetSpec],
    runs: usize,
    timeout: Duration,
) -> Result<()> {
    let glslang = oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?;
    let work = work_dir(root);
    let executors = exec::open_executors(
        specs,
        root,
        &glslang.path,
        &work,
        timeout.min(exec::JOB_TIMEOUT),
    )?;
    for executor in &executors {
        for (name, listed) in executor.driver_bugs.variant_tags() {
            if !Variant::ALL
                .into_iter()
                .any(|variant| tag(variant) == listed)
            {
                bail!(
                    "{}: `{name}` lists the unknown variant `{listed}`",
                    exec::drivers::DIR
                );
            }
        }
    }
    let wanted = Capture {
        statistics: true,
        timing: true,
    };
    let probes = exec::parallel_map(&executors, |executor| executor.probe_capture(wanted))
        .into_iter()
        .collect::<Result<Vec<_>>>()?;
    let targets: Vec<TargetRun> = std::thread::scope(|scope| {
        let handles: Vec<_> = executors
            .iter()
            .zip(&probes)
            .map(|(executor, probe)| scope.spawn(|| run_target(executor, results, runs, probe)))
            .collect();
        handles
            .into_iter()
            .filter_map(|handle| handle.join().ok())
            .collect()
    });
    let report = markdown(results, &targets, runs);
    let xtask_dir = root.join("target").join("xtask");
    let report_path = xtask_dir.join("opt-quality-exec.md");
    let table_path = xtask_dir.join("opt-quality-exec.tsv");
    fs::write(&report_path, &report)?;
    fs::write(&table_path, tsv(results, &targets))?;
    print!("{report}");
    eprintln!(
        "[xtask] driver report: {}\n[xtask] per-shader driver numbers: {}\n[xtask] Amber scripts and statistics: {}",
        report_path.display(),
        table_path.display(),
        work.display()
    );
    Ok(())
}

fn smoothed(value: f64, reference: f64) -> f64 {
    (value + 1.0) / (reference + 1.0)
}

fn format_ratio(ratio: Option<f64>) -> String {
    ratio.map_or_else(|| "-".into(), |ratio| format!("{ratio:.3}"))
}

fn unit_name(results: &[UnitResult], index: usize) -> String {
    results
        .get(index)
        .map_or_else(|| format!("#{index}"), |result| result.unit.name.clone())
}

fn statistic_names(target: &TargetRun) -> BTreeSet<String> {
    target
        .runs
        .iter()
        .flat_map(|run| run.measured.values())
        .flat_map(|measured| measured.statistics.keys().cloned())
        .collect()
}

fn pairs<'a>(
    target: &'a TargetRun,
    variant: Variant,
    value: impl Fn(&Measured) -> Option<f64> + 'a,
) -> impl Iterator<Item = (&'a UnitRun, f64, f64)> + 'a {
    target.runs.iter().filter_map(move |run| {
        let reference = value(run.measured.get(&Variant::SpirvOptO)?)?;
        let own = value(run.measured.get(&variant)?)?;
        Some((run, own, reference))
    })
}

fn markdown(results: &[UnitResult], targets: &[TargetRun], runs: usize) -> String {
    let mut out = String::from(
        "# Driver statistics and GPU time: rglsl, rglsl -O, spirv-opt -O and glslang -O\n\n",
    );
    let _ = writeln!(
        out,
        "Every shader the exec planner can run (`xtask/src/exec`, the harness of `cargo xtask test`) is staged once per \
         variant with the plan of rglsl's module: *rglsl*, *rglsl -O*, *spirv-opt -O(rglsl)* and *glslang -O*. A check run \
         (`amber --pipeline-stats`) gives the outputs and the driver's statistics of the tested stage of the \
         pipeline `main` (VK_KHR_pipeline_executable_properties; VK_AMD_shader_info values are prefixed `amd:`); \
         a timed run repeats every `RUN` {runs} times as `RUN TIMED_EXECUTION` and \
         gives the GPU time (the fastest repeat: clock and scheduling noise only adds time) and the median `vkCreate*Pipelines` wall time (with the statistics capture \
         flags when the driver has them). Timed runs never share the GPU with another Amber process. On a target \
         that runs one Amber process at a time, the timed script runs first, on its own buffers, and the check \
         script after it in the same process and on the same device; a check that fails there is run again in a \
         process of its own, and a timed run that fails or loses the device is run again alone. On a target that \
         runs several, the checks run in parallel and the timed runs one at a time after them. Jobs with the \
         same device requirements share an Amber process, one script after another; \
         a job whose script fails there, or every job of a process that crashes or times out, is run again in a \
         process of its own. *Equivalence*: the outputs of rglsl -O, spirv-opt -O(rglsl) and glslang -O \
         against rglsl's module with the comparison of `cargo xtask test`; a difference or a failure is rerun \
         alone with rglsl's module, and rglsl's module is checked to give the same outputs again. A variant \
         listed for a shader in `xtask/exec-drivers` (`variants`) is not run on that driver; when it is rglsl's module, \
         glslang -O's is the reference instead. A difference \
         of rglsl -O is our bug; of the others, a spirv-opt or driver bug. Ratios are to spirv-opt -O(rglsl): statistics per shader as \
         (value + 1) / (reference + 1), times as plain ratios; below 1: smaller than spirv-opt -O.\n"
    );
    for target in targets {
        let _ = writeln!(out, "## Target `{}`: {}\n", target.label, target.device);
        let _ = writeln!(
            out,
            "- pipeline statistics: {}\n- VK_KHR_pipeline_executable_properties: {}\n- VK_AMD_shader_info: {}",
            target.statistics.as_ref().map_or_else(
                || "written by Amber".to_string(),
                |error| format!("not available ({error})")
            ),
            if target.executable_properties {
                "yes"
            } else {
                "no"
            },
            if target.shader_info_amd { "yes" } else { "no" },
        );
        let staged = target
            .runs
            .iter()
            .filter(|run| run.skipped.is_none())
            .count();
        let timed = target
            .runs
            .iter()
            .filter(|run| {
                run.measured
                    .get(&Variant::Rglsl)
                    .is_some_and(|m| m.gpu_ms.is_some())
            })
            .count();
        let _ = writeln!(
            out,
            "- GPU time: measured on {timed} of {staged} staged shaders (a stage whose timestamps read 0 ms counts as not measured)"
        );
        let with_statistics = target
            .runs
            .iter()
            .filter(|run| {
                run.measured
                    .get(&Variant::Rglsl)
                    .is_some_and(|m| !m.statistics.is_empty())
            })
            .count();
        let _ = writeln!(
            out,
            "- shaders: {} with a valid rglsl module, {staged} staged, {with_statistics} with driver statistics ({})\n",
            target.runs.len(),
            stats::ratio(with_statistics as f64, staged as f64)
                .map_or_else(|| "-".into(), |r| format!("{:.1} %", r * 100.0))
        );
        let mut skipped: BTreeMap<String, usize> = BTreeMap::new();
        for run in &target.runs {
            if let Some(why) = &run.skipped {
                let kind = why.split(':').next().unwrap_or_default().to_string();
                *skipped.entry(kind).or_default() += 1;
            }
        }
        if !skipped.is_empty() {
            out.push_str("Not staged: ");
            let parts: Vec<String> = skipped
                .iter()
                .map(|(kind, count)| format!("{kind} {count}"))
                .collect();
            out.push_str(&parts.join(", "));
            out.push_str(".\n\n");
        }

        out.push_str("### Equivalence with rglsl's module\n\n| variant |");
        for kind in Equivalence::KINDS {
            let _ = write!(out, " {kind} |");
        }
        out.push_str("\n|---|");
        out.push_str(&"--:|".repeat(Equivalence::KINDS.len()));
        out.push('\n');
        for variant in CHECKED {
            let _ = write!(out, "| {} |", variant.label());
            for kind in Equivalence::KINDS {
                let count = target
                    .runs
                    .iter()
                    .filter(|run| {
                        run.equivalence
                            .get(&variant)
                            .is_some_and(|e| e.code() == kind)
                    })
                    .count();
                let _ = write!(out, " {count} |");
            }
            out.push('\n');
        }
        for variant in CHECKED {
            let listed: Vec<String> = target
                .runs
                .iter()
                .filter_map(|run| {
                    let equivalence = run.equivalence.get(&variant)?;
                    matches!(
                        equivalence,
                        Equivalence::Differs(_)
                            | Equivalence::Fails(_)
                            | Equivalence::Nondeterministic(_)
                    )
                    .then(|| {
                        format!(
                            "- `{}`: {}: {}",
                            unit_name(results, run.unit),
                            equivalence.code(),
                            equivalence.detail()
                        )
                    })
                })
                .collect();
            if !listed.is_empty() {
                let _ = writeln!(out, "\n{}:\n", variant.label());
                for line in listed {
                    let _ = writeln!(out, "{line}");
                }
            }
        }

        out.push_str(
            "\n### Times\n\n| measure | rglsl | rglsl -O | glslang -O | shaders |\n|---|--:|--:|--:|--:|\n",
        );
        for (label, value) in [
            (
                "GPU time",
                (|m: &Measured| m.gpu_ms) as fn(&Measured) -> Option<f64>,
            ),
            ("pipeline creation", |m: &Measured| m.create_ms),
        ] {
            let geomean = |variant: Variant| {
                let ratios: Vec<f64> = pairs(target, variant, value)
                    .filter_map(|(_, own, reference)| stats::ratio(own, reference))
                    .filter(|ratio| *ratio > 0.0)
                    .collect();
                (stats::geometric_mean(&ratios), ratios.len())
            };
            let (rglsl, count) = geomean(Variant::Rglsl);
            let (optimized, _) = geomean(Variant::RglslO);
            let (glslang, _) = geomean(Variant::GlslangO);
            let _ = writeln!(
                out,
                "| {label} | {} | {} | {} | {count} |",
                format_ratio(rglsl),
                format_ratio(optimized),
                format_ratio(glslang)
            );
        }
        gpu_time_sections(&mut out, results, target);

        let names = statistic_names(target);
        if names.is_empty() {
            out.push_str("\nNo driver statistics on this target.\n\n");
            continue;
        }
        out.push_str("\n### Driver statistics of the tested stage\n\n| statistic | shaders | rglsl | glslang -O | rglsl worse / same / better than spirv-opt -O |\n|---|--:|--:|--:|--:|\n");
        for name in &names {
            let value = |m: &Measured| m.statistics.get(name).copied();
            let ratios = |variant: Variant| -> Vec<f64> {
                pairs(target, variant, value)
                    .map(|(_, own, reference)| smoothed(own, reference))
                    .collect()
            };
            let rglsl = ratios(Variant::Rglsl);
            let mut worse = 0;
            let mut same = 0;
            let mut better = 0;
            for (_, own, reference) in pairs(target, Variant::Rglsl, value) {
                match own.total_cmp(&reference) {
                    std::cmp::Ordering::Greater => worse += 1,
                    std::cmp::Ordering::Equal => same += 1,
                    std::cmp::Ordering::Less => better += 1,
                }
            }
            let _ = writeln!(
                out,
                "| {name} | {} | {} | {} | {worse} / {same} / {better} |",
                rglsl.len(),
                format_ratio(stats::geometric_mean(&rglsl)),
                format_ratio(stats::geometric_mean(&ratios(Variant::GlslangO))),
            );
        }

        let mut better: Vec<(f64, String)> = target
            .runs
            .iter()
            .filter_map(|run| {
                let own = run.measured.get(&Variant::Rglsl)?;
                let reference = run.measured.get(&Variant::SpirvOptO)?;
                let mut worst: f64 = 1.0;
                let mut reasons = Vec::new();
                for (name, value) in &own.statistics {
                    let Some(other) = reference.statistics.get(name) else {
                        continue;
                    };
                    if other < value {
                        worst = worst.max(smoothed(*value, *other));
                        reasons.push(format!("{name} {value} → {other}"));
                    }
                }
                (!reasons.is_empty()).then(|| {
                    (
                        worst,
                        format!(
                            "- `{}` ({worst:.2}): {}",
                            unit_name(results, run.unit),
                            reasons.join(", ")
                        ),
                    )
                })
            })
            .collect();
        better.sort_by(|a, b| b.0.total_cmp(&a.0));
        let _ = writeln!(
            out,
            "\n### Shaders where spirv-opt -O(rglsl) is better by the driver ({}; the {} furthest, rglsl → spirv-opt -O)\n",
            better.len(),
            LISTED.min(better.len())
        );
        for (_, line) in better.iter().take(LISTED) {
            let _ = writeln!(out, "{line}");
        }
        out.push('\n');
    }
    out
}

fn set_of(results: &[UnitResult], run: &UnitRun) -> Option<Set> {
    results.get(run.unit).map(|result| result.unit.set)
}

fn gpu_ratio(run: &UnitRun, variant: Variant) -> Option<f64> {
    let reference = run.measured.get(&Variant::SpirvOptO)?.gpu_ms?;
    let own = run.measured.get(&variant)?.gpu_ms?;
    stats::ratio(own, reference).filter(|ratio| *ratio > 0.0)
}

fn gpu_time_sections(out: &mut String, results: &[UnitResult], target: &TargetRun) {
    out.push_str(
        "\n### GPU time per set (ratio to spirv-opt -O(rglsl), geometric mean)\n\n| set | shaders | rglsl | rglsl -O | glslang -O |\n|---|--:|--:|--:|--:|\n",
    );
    for set in Set::ALL {
        let runs: Vec<&UnitRun> = target
            .runs
            .iter()
            .filter(|run| set_of(results, run) == Some(set))
            .collect();
        let ratios = |variant: Variant| -> Vec<f64> {
            runs.iter()
                .filter_map(|run| gpu_ratio(run, variant))
                .collect()
        };
        let optimized = ratios(Variant::RglslO);
        if optimized.is_empty() {
            continue;
        }
        let _ = writeln!(
            out,
            "| {} | {} | {} | {} | {} |",
            set.label(),
            optimized.len(),
            format_ratio(stats::geometric_mean(&ratios(Variant::Rglsl))),
            format_ratio(stats::geometric_mean(&optimized)),
            format_ratio(stats::geometric_mean(&ratios(Variant::GlslangO))),
        );
    }
    let perf: Vec<&UnitRun> = target
        .runs
        .iter()
        .filter(|run| set_of(results, run) == Some(Set::Perf) && run.skipped.is_none())
        .collect();
    if perf.is_empty() {
        return;
    }
    let _ = writeln!(
        out,
        "\n### {}: GPU time of {PERF_ROUNDS} rounds of {PERF_RUNS} or more repeats, each round in an Amber process of its own and the variants in turn (ms, the fastest repeat), ratios to spirv-opt -O(rglsl), spread = (slowest − fastest) / fastest of the rounds' fastest repeats\n\n| shader | spirv-opt -O ms | rglsl | rglsl -O | glslang -O | largest spread |\n|---|--:|--:|--:|--:|--:|",
        Set::Perf.label()
    );
    let mut spreads = Vec::new();
    for run in &perf {
        let spread = run.measured.values().filter_map(Measured::spread).fold(
            None,
            |largest: Option<f64>, spread| {
                Some(largest.map_or(spread, |largest| largest.max(spread)))
            },
        );
        spreads.extend(spread);
        let reference = run
            .measured
            .get(&Variant::SpirvOptO)
            .and_then(|measured| measured.gpu_ms);
        let _ = writeln!(
            out,
            "| `{}` | {} | {} | {} | {} | {} |",
            unit_name(results, run.unit),
            reference.map_or_else(|| "-".into(), |ms| format!("{ms:.3}")),
            format_ratio(gpu_ratio(run, Variant::Rglsl)),
            format_ratio(gpu_ratio(run, Variant::RglslO)),
            format_ratio(gpu_ratio(run, Variant::GlslangO)),
            spread.map_or_else(|| "-".into(), |spread| format!("{:.2} %", spread * 100.0)),
        );
    }
    let optimized: Vec<f64> = perf
        .iter()
        .filter_map(|run| gpu_ratio(run, Variant::RglslO))
        .collect();
    let _ = writeln!(
        out,
        "\nrglsl -O / spirv-opt -O(rglsl): {} (geometric mean of {}); largest spread {}\n",
        format_ratio(stats::geometric_mean(&optimized)),
        optimized.len(),
        spreads
            .iter()
            .copied()
            .reduce(f64::max)
            .map_or_else(|| "-".into(), |spread| format!("{:.2} %", spread * 100.0)),
    );
}

fn tsv(results: &[UnitResult], targets: &[TargetRun]) -> String {
    let mut out = String::from(
        "target\tshader\tset\tvariant\tstatus\tequivalence\tgpu_ms\tgpu_spread\tcreate_ms\tstatistics\tdetail\n",
    );
    let number = |value: Option<f64>| value.map_or_else(String::new, |v| format!("{v:.6}"));
    for target in targets {
        for run in &target.runs {
            let (name, set) = results.get(run.unit).map_or_else(
                || (String::new(), ""),
                |result| (result.unit.name.clone(), result.unit.set.key()),
            );
            if let Some(why) = &run.skipped {
                let _ = writeln!(
                    out,
                    "{}\t{name}\t{set}\t\tskipped\t\t\t\t\t\t{}",
                    target.label,
                    why.replace(['\t', '\n'], " ")
                );
                continue;
            }
            for (variant, measured) in &run.measured {
                let equivalence = run.equivalence.get(variant);
                let statistics: Vec<String> = measured
                    .statistics
                    .iter()
                    .map(|(key, value)| format!("{key}={value}"))
                    .collect();
                let detail = measured
                    .error
                    .as_deref()
                    .or_else(|| equivalence.map(Equivalence::detail))
                    .unwrap_or_default()
                    .replace(['\t', '\n'], " ");
                let _ = writeln!(
                    out,
                    "{}\t{name}\t{set}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{detail}",
                    target.label,
                    tag(*variant),
                    if measured.error.is_some() {
                        "failed"
                    } else {
                        "ok"
                    },
                    equivalence.map_or("", Equivalence::code),
                    number(measured.gpu_ms),
                    number(measured.spread()),
                    number(measured.create_ms),
                    statistics.join(";").replace(['\t', '\n'], " "),
                );
            }
        }
    }
    out
}

pub fn work_dir(root: &Path) -> PathBuf {
    root.join("target")
        .join("xtask")
        .join("opt-quality")
        .join("exec")
}

#[cfg(test)]
mod tests {
    use super::*;

    fn job() -> Job {
        Job {
            dir: PathBuf::from("/w/a.frag"),
            script: "rglsl.amber".into(),
            dumps: vec!["dump:0:0".into()],
            tensor_layer: false,
            capture: Capture {
                statistics: true,
                timing: true,
            },
            timed: Some("rglsl.timed.amber".into()),
            timeout: None,
            members: Vec::new(),
        }
    }

    const STATISTICS_JSON: &str = r#"{"pipelines": [{"script": "rglsl.timed.amber", "pipeline": "main", "create_time_ms": 2.0}, {"script": "rglsl.amber", "pipeline": "main", "create_time_ms": 1.0}]}"#;

    fn combined(extra: &[(&str, &str)]) -> JobResult {
        Ok([
            ("dump:0:0", "x"),
            (STATISTICS, STATISTICS_JSON),
            (
                TIMING,
                "Execution timing (in script-order):\n    0.5, 0.25\n",
            ),
        ]
        .iter()
        .chain(extra)
        .map(|(key, value)| ((*key).to_string(), value.as_bytes().to_vec()))
        .collect())
    }

    fn create_times(result: Option<&JobResult>) -> Vec<f64> {
        result
            .and_then(|result| result.as_ref().ok())
            .and_then(report_of)
            .map(|report| report.create_times(PIPELINE))
            .unwrap_or_default()
    }

    #[test]
    fn splits_a_combined_run_into_its_check_and_its_timed_run() -> Result<()> {
        let job = job();
        let (check, timed) = split(&job, combined(&[]));
        let outputs = check
            .as_ref()
            .and_then(|check| check.as_ref().ok())
            .ok_or_else(|| anyhow::anyhow!("no check outputs"))?;
        assert_eq!(outputs.get("dump:0:0").map(Vec::as_slice), Some(&b"x"[..]));
        assert!(!outputs.contains_key(TIMING));
        assert_eq!(create_times(check.as_ref()), [1.0]);
        assert_eq!(create_times(timed.as_ref()), [2.0]);
        let times = timed
            .as_ref()
            .and_then(|timed| timed.as_ref().ok())
            .and_then(|timed| timed.get(TIMING))
            .map(|stdout| amber::parse_timing(&String::from_utf8_lossy(stdout)))
            .unwrap_or_default();
        assert_eq!(times, [0.5, 0.25]);

        let (check, timed) = split(&job, combined(&[(CHECK_ERROR, "amber exited with 1: x")]));
        assert!(check.is_none());
        assert!(timed.is_some_and(|timed| timed.is_ok()));

        let (check, timed) = split(
            &job,
            combined(&[(TIMED_ERROR, "amber exited with 1: slow")]),
        );
        assert!(check.is_some_and(|check| check.is_ok()));
        assert_eq!(
            timed,
            Some(Err(JobError::Failed("amber exited with 1: slow".into())))
        );

        let lost = "amber exited with 1: rglsl.timed.amber: DEVICE_LOST";
        let (check, timed) = split(&job, combined(&[(TIMED_ERROR, lost)]));
        assert!(check.is_some());
        assert!(timed.is_none());

        assert_eq!(
            split(&job, Err(JobError::Failed("amber timed out".into()))),
            (None, None)
        );
        assert_eq!(check_alone(&job).timed, None);
        assert!(!check_alone(&job).capture.timing);
        assert!(check_alone(&job).capture.statistics);
        let alone = timed_alone(&job).ok_or_else(|| anyhow::anyhow!("no timed job"))?;
        assert_eq!(alone.script, "rglsl.timed.amber");
        assert!(alone.dumps.is_empty() && alone.timed.is_none());
        Ok(())
    }

    #[test]
    fn timed_scripts_repeat_every_run() {
        let script = "#!amber\nCLEAR main\nRUN main DRAW_RECT POS 0 0 SIZE 4 4\n";
        assert_eq!(
            timed_script(script, 2),
            "#!amber\nCLEAR main\nRUN TIMED_EXECUTION main DRAW_RECT POS 0 0 SIZE 4 4\nRUN TIMED_EXECUTION main DRAW_RECT POS 0 0 SIZE 4 4\n"
        );
        assert_eq!(
            timed_script("RUN p 1 1 1", 0),
            "RUN TIMED_EXECUTION p 1 1 1\n"
        );
    }

    fn measured(values: &[(&str, f64)]) -> Measured {
        Measured {
            statistics: values
                .iter()
                .map(|(name, value)| ((*name).to_string(), *value))
                .collect(),
            gpu_ms: Some(1.0),
            create_ms: Some(2.0),
            ..Measured::default()
        }
    }

    #[test]
    fn spread_compares_the_fastest_repeats_of_both_halves() {
        assert_eq!(spread(&[]), None);
        assert_eq!(spread(&[2.0]), None);
        let times = [9.0, 2.0, 2.2, 1.8, 2.0];
        assert!(spread(&times).is_some_and(|value| (value - 0.2 / 1.8).abs() < 1e-9));
        let rounds = Measured {
            gpu_times: times.to_vec(),
            round_minima: vec![2.0, 2.04, 2.02],
            ..Measured::default()
        };
        assert!(
            rounds
                .spread()
                .is_some_and(|value| (value - 0.02).abs() < 1e-9)
        );
    }

    #[test]
    fn report_lists_driver_differences() {
        let target = TargetRun {
            label: "amd".into(),
            device: "GPU".into(),
            statistics: None,
            executable_properties: true,
            shader_info_amd: false,
            runs: vec![
                UnitRun {
                    unit: 0,
                    skipped: None,
                    measured: [
                        (Variant::Rglsl, measured(&[("VGPRs", 31.0)])),
                        (
                            Variant::RglslO,
                            Measured {
                                gpu_ms: Some(0.5),
                                gpu_times: vec![0.5, 0.6, 0.5, 0.7, 0.5],
                                ..measured(&[("VGPRs", 15.0)])
                            },
                        ),
                        (Variant::SpirvOptO, measured(&[("VGPRs", 15.0)])),
                        (Variant::GlslangO, measured(&[("VGPRs", 15.0)])),
                    ]
                    .into_iter()
                    .collect(),
                    equivalence: [
                        (Variant::SpirvOptO, Equivalence::Same { tolerated: 0 }),
                        (Variant::GlslangO, Equivalence::Differs("byte 0".into())),
                    ]
                    .into_iter()
                    .collect(),
                },
                UnitRun {
                    unit: 1,
                    skipped: Some("stage: tessellation".into()),
                    measured: BTreeMap::new(),
                    equivalence: BTreeMap::new(),
                },
            ],
        };
        let report = markdown(&[], std::slice::from_ref(&target), 5);
        assert!(report.contains("| VGPRs | 1 | 2.000 | 1.000 | 1 / 0 / 0 |"));
        assert!(report.contains("| spirv-opt -O(rglsl) | 1 | 0 | 0 | 0 | 0 | 0 |"));
        assert!(report.contains("- `#0`: differs: byte 0"));
        assert!(report.contains("- `#0` (2.00): VGPRs 31 → 15"));
        assert!(report.contains("| GPU time | 1.000 | 0.500 | 1.000 | 1 |"));
        assert!(report.contains("Not staged: stage 1."));
        let table = tsv(&[], &[target]);
        assert_eq!(table.lines().count(), 6);
        assert!(table.contains("amd\t\t\tspirv-opt-O\tok\tsame\t1.000000\t\t2.000000\tVGPRs=15\t"));
        assert!(table.contains("amd\t\t\trglsl-O\tok\t\t0.500000\t0.000000\t2.000000\t"));
    }
}
