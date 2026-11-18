use std::collections::{BTreeMap, BTreeSet};
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::{Duration, Instant};

use anyhow::Result;

use super::{Outcome, UnitResult, Variant};
use crate::bench::stats;
use crate::exec::batch::{Capture, Job, JobError, JobResult, Outputs, STATISTICS, TIMING};
use crate::exec::harness::ShaderKind;
use crate::exec::plan::Plan;
use crate::exec::statistics::Report;
use crate::exec::{self, Executor, TargetSpec, amber, reflect};
use crate::oracles;

pub const VARIANTS: [Variant; 4] = [
    Variant::Rglsl,
    Variant::RglslO,
    Variant::SpirvOptO,
    Variant::GlslangO,
];
const CHECKED: [Variant; 3] = [Variant::RglslO, Variant::SpirvOptO, Variant::GlslangO];
const PIPELINE: &str = "main";
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
    pub create_ms: Option<f64>,
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
        .plan_module(result.unit.seed(), &reflection)
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
        let script = fs::read_to_string(dir.join(&check.script)).map_err(|e| e.to_string())?;
        let name = format!("{}.timed.amber", tag(variant));
        fs::write(dir.join(&name), timed_script(&script, runs)).map_err(|e| e.to_string())?;
        timed.push((
            variant,
            Job {
                dir: dir.clone(),
                script: name,
                dumps: Vec::new(),
                tensor_layer: check.tensor_layer,
                capture: Capture {
                    statistics: capture,
                    timing: true,
                },
            },
        ));
        checks.push((variant, check));
    }
    Ok(Staged {
        unit: index,
        stage: plan.stage,
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

fn measure(stage: ShaderKind, check: &JobResult, timed: Option<&JobResult>) -> Measured {
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
    if let Some(Ok(outputs)) = timed {
        if let Some(stdout) = outputs.get(TIMING) {
            let times = amber::parse_timing(&String::from_utf8_lossy(stdout));
            if times.iter().any(|time| *time > 0.0) {
                measured.gpu_ms = stats::median(&times);
            }
        }
        if let Some(report) = report_of(outputs) {
            let times = report.create_times(PIPELINE);
            if !times.is_empty() {
                measured.create_ms = stats::median(&times);
            }
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

fn run_target(executor: &Executor, results: &[UnitResult], runs: usize) -> TargetRun {
    let label = executor.target.label().to_string();
    let wanted = Capture {
        statistics: true,
        timing: true,
    };
    let probe = executor.probe_capture(wanted);
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
        "[xtask] {label}: {} of {} shaders staged ({:.0}s); running the checks",
        ready.len(),
        results.len(),
        started.elapsed().as_secs_f64()
    );
    let checks: Vec<Job> = ready
        .iter()
        .flat_map(|s| s.checks.iter().map(|(_, job)| job.clone()))
        .collect();
    let mut check_results = executor.run_jobs(&checks).into_iter();
    eprintln!(
        "[xtask] {label}: checks done ({:.0}s); timed runs, one at a time",
        started.elapsed().as_secs_f64()
    );
    let timed: Vec<Job> = ready
        .iter()
        .flat_map(|s| s.timed.iter().map(|(_, job)| job.clone()))
        .collect();
    let mut timed_results = executor.confirm_jobs(&timed).into_iter();
    let mut first: Vec<BTreeMap<Variant, JobResult>> = Vec::with_capacity(ready.len());
    let mut timing: Vec<BTreeMap<Variant, JobResult>> = Vec::with_capacity(ready.len());
    for staged in &ready {
        let mut by_variant = BTreeMap::new();
        for (variant, _) in &staged.checks {
            by_variant.insert(
                *variant,
                check_results
                    .next()
                    .unwrap_or_else(|| Err(JobError::missing("batch"))),
            );
        }
        first.push(by_variant);
        let mut by_variant = BTreeMap::new();
        for (variant, _) in &staged.timed {
            by_variant.insert(
                *variant,
                timed_results
                    .next()
                    .unwrap_or_else(|| Err(JobError::missing("batch"))),
            );
        }
        timing.push(by_variant);
    }
    let mut again_jobs = Vec::new();
    let mut again_slots = Vec::new();
    for (position, staged) in ready.iter().enumerate() {
        let Some(results) = first.get(position) else {
            continue;
        };
        let Some(Ok(reference)) = results.get(&Variant::Rglsl) else {
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
            let Some(result) = results.get(&variant) else {
                continue;
            };
            let same = result
                .as_ref()
                .is_ok_and(|actual| exec::compare_outputs(&staged.plan, reference, actual).is_ok());
            if same {
                continue;
            }
            if let (Some(reference_job), Some(variant_job)) = (job(Variant::Rglsl), job(variant)) {
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
        let checks = first.get(position).unwrap_or(&empty);
        let timed = timing.get(position).unwrap_or(&empty);
        let mut measured = BTreeMap::new();
        for (variant, check) in checks {
            measured.insert(*variant, measure(staged.stage, check, timed.get(variant)));
        }
        let mut equivalence: BTreeMap<Variant, Equivalence> = staged
            .refused
            .iter()
            .map(|(variant, why)| (*variant, Equivalence::NotRun(why.clone())))
            .collect();
        if let Some(reference) = checks.get(&Variant::Rglsl) {
            for variant in CHECKED {
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
    let executors = exec::open_executors(specs, root, &glslang.path, &work, timeout)?;
    let targets: Vec<TargetRun> = std::thread::scope(|scope| {
        let handles: Vec<_> = executors
            .iter()
            .map(|executor| scope.spawn(|| run_target(executor, results, runs)))
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
         a timed run repeats every `RUN` {runs} times as `RUN TIMED_EXECUTION` (one Amber process at a time) and \
         gives the median GPU time and the median `vkCreate*Pipelines` wall time (with the statistics capture \
         flags when the driver has them). *Equivalence*: the outputs of rglsl -O, spirv-opt -O(rglsl) and glslang -O \
         against rglsl's module with the comparison of `cargo xtask test`; a difference or a failure is rerun \
         alone with rglsl's module, and rglsl's module is checked to give the same outputs again. A difference \
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
            "\n### Times\n\n| measure | rglsl | glslang -O | shaders |\n|---|--:|--:|--:|\n",
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
            let (glslang, _) = geomean(Variant::GlslangO);
            let _ = writeln!(
                out,
                "| {label} | {} | {} | {count} |",
                format_ratio(rglsl),
                format_ratio(glslang)
            );
        }

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

fn tsv(results: &[UnitResult], targets: &[TargetRun]) -> String {
    let mut out = String::from(
        "target\tshader\tset\tvariant\tstatus\tequivalence\tgpu_ms\tcreate_ms\tstatistics\tdetail\n",
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
                    "{}\t{name}\t{set}\t\tskipped\t\t\t\t\t{}",
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
                    "{}\t{name}\t{set}\t{}\t{}\t{}\t{}\t{}\t{}\t{detail}",
                    target.label,
                    tag(*variant),
                    if measured.error.is_some() {
                        "failed"
                    } else {
                        "ok"
                    },
                    equivalence.map_or("", Equivalence::code),
                    number(measured.gpu_ms),
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
        assert!(report.contains("| GPU time | 1.000 | 1.000 | 1 |"));
        assert!(report.contains("Not staged: stage 1."));
        let table = tsv(&[], &[target]);
        assert_eq!(table.lines().count(), 5);
        assert!(table.contains("amd\t\t\tspirv-opt-O\tok\tsame\t1.000000\t2.000000\tVGPRs=15\t"));
    }
}
