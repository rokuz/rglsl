use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::Duration;

use anyhow::{Context, Result, bail};
use rglsl_fuzz::amber::amber_script;
use rglsl_fuzz::reduce::{ReduceOptions, finalise, reduce};
use rglsl_fuzz::{STAGE_EXTENSIONS, ShaderJob};

use crate::exec::{Executor, TargetSpec};
use crate::fuzz::{Verdict, compare};
use crate::fuzz_exec::{self, Run};
use crate::fuzz_random::classify::{self, Class};
use crate::oracles;
use crate::process::{self, Exit};
use crate::worker::EXIT_ACCEPTED;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Interesting {
    Crash,
    Reject,
    InvalidSpirv,
    RglslFails,
    DiffersFromGlslang,
    DiffersFromReference,
    ExecFails,
    OptimizerDiffers,
    OptimizerHangs,
    ExecHangs,
}

impl Interesting {
    pub fn parse(text: &str) -> Option<Self> {
        match text {
            "crash" => Some(Self::Crash),
            "reject" => Some(Self::Reject),
            "invalid-spirv" => Some(Self::InvalidSpirv),
            "rglsl-fails" => Some(Self::RglslFails),
            "differs-from-glslang" => Some(Self::DiffersFromGlslang),
            "differs-from-reference" => Some(Self::DiffersFromReference),
            "exec-fails" => Some(Self::ExecFails),
            "optimizer-differs" => Some(Self::OptimizerDiffers),
            "optimizer-hangs" => Some(Self::OptimizerHangs),
            "exec-hangs" => Some(Self::ExecHangs),
            _ => None,
        }
    }

    const fn needs_exec(self) -> bool {
        matches!(
            self,
            Self::DiffersFromGlslang
                | Self::DiffersFromReference
                | Self::ExecFails
                | Self::OptimizerDiffers
                | Self::OptimizerHangs
                | Self::ExecHangs
        )
    }

    const fn optimizes(self) -> bool {
        matches!(self, Self::OptimizerDiffers | Self::OptimizerHangs)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
enum Outcome {
    Ran,
    Hung(String),
    Failed(String),
}

impl Outcome {
    fn of(ran: &classify::Ran) -> Result<Self> {
        match classify::failure(ran) {
            None => Ok(Self::Ran),
            Some((Class::NotRun, why)) => bail!("{why}"),
            Some((Class::Hang | Class::DriverReset, note)) => Ok(Self::Hung(note)),
            Some((_, note)) => Ok(Self::Failed(note)),
        }
    }

    fn describe(&self) -> String {
        match self {
            Self::Ran => String::from("ran"),
            Self::Hung(note) => format!("hung: {note}"),
            Self::Failed(note) => format!("failed: {note}"),
        }
    }
}

fn only_second_hangs(first: &Outcome, second: &Outcome) -> bool {
    *first == Outcome::Ran && matches!(second, Outcome::Hung(_))
}

fn run_alone(
    executor: &Executor,
    spirv: &Path,
    json: &Path,
    dir: &Path,
    tag: &str,
) -> Result<Outcome> {
    let job = match fuzz_exec::stage_module(executor, spirv, Some(json), dir, tag) {
        fuzz_exec::Staged::Refused(why) => return Ok(Outcome::Failed(format!("refused: {why}"))),
        fuzz_exec::Staged::Ready { job, .. } => job,
    };
    let (ran, problems) = classify::run_alone(executor, &job);
    for problem in problems {
        eprintln!("[xtask] {problem}");
    }
    Outcome::of(&ran).with_context(|| {
        format!(
            "the {} target did not run the {tag} module",
            executor.target.label()
        )
    })
}

#[derive(Debug)]
pub struct Options {
    pub job: PathBuf,
    pub interesting: Interesting,
    pub target: TargetSpec,
    pub preserve_semantics: bool,
    pub max_steps: u32,
    pub repeats: u32,
    pub guards: bool,
    pub output: Option<PathBuf>,
    pub timeout_secs: u64,
}

fn read_job(json: &Path) -> Result<ShaderJob> {
    let text = fs::read_to_string(json).with_context(|| format!("reading {}", json.display()))?;
    let mut sources = Vec::new();
    for extension in STAGE_EXTENSIONS {
        let shader = json.with_extension(extension);
        if shader.is_file() {
            sources.push((extension.to_owned(), fs::read_to_string(&shader)?));
        }
    }
    if sources.len() != 1 {
        bail!(
            "{}: the reducer needs exactly one shader next to the job",
            json.display()
        );
    }
    Ok(ShaderJob::parse(&text, &sources)?)
}

fn write_job(job: &ShaderJob, json: &Path) -> Result<PathBuf> {
    let emitted = job.emit()?;
    fs::write(json, emitted.json)?;
    let mut shader = json.to_path_buf();
    for (extension, text) in emitted.shaders {
        shader = json.with_extension(extension);
        fs::write(&shader, text)?;
    }
    Ok(shader)
}

struct Tools {
    glslang: PathBuf,
    spirv_val: PathBuf,
    self_exe: PathBuf,
    timeout: Duration,
}

impl Tools {
    fn verdict(&self, shader: &Path, optimize: bool) -> Result<(Verdict, PathBuf)> {
        let spirv = shader.with_extension("spv");
        let outcome = compare(
            &self.glslang,
            &self.spirv_val,
            &self.self_exe,
            shader,
            &spirv,
            self.timeout,
            optimize,
        )?;
        Ok((outcome.verdict, spirv))
    }

    fn linked_alone_fails(&self, shader: &Path) -> Result<bool> {
        let out_dir = shader.with_extension("linked");
        let _ = fs::remove_dir_all(&out_dir);
        fs::create_dir_all(&out_dir)?;
        let mut command = Command::new(&self.self_exe);
        command
            .args(["compile-group", "--spv", "1.0", "--out-dir"])
            .arg(&out_dir)
            .arg(shader);
        let output = process::run(command, self.timeout)?;
        Ok(!matches!(output.exit, Exit::Code(EXIT_ACCEPTED)))
    }
}

fn run_module(
    executor: &Executor,
    spirv: &Path,
    json: &Path,
    dir: &Path,
    tag: &str,
) -> Result<Run> {
    let staged = fuzz_exec::stage_module(executor, spirv, Some(json), dir, tag);
    let result = match &staged {
        fuzz_exec::Staged::Ready { job, .. } => executor
            .confirm_jobs(std::slice::from_ref(job))
            .into_iter()
            .next(),
        fuzz_exec::Staged::Refused(_) => None,
    };
    match fuzz_exec::finish(&staged, result) {
        Run::NotExecuted(why) => bail!(
            "the {} target did not run the {tag} module: {why}",
            executor.target.label()
        ),
        run => Ok(run),
    }
}

fn differs(reference: &Run, variant: &Run, tolerance: fuzz_exec::Tolerance) -> Option<bool> {
    match (reference, variant) {
        (
            Run::Ran {
                plan: reference_plan,
                outputs: reference_outputs,
            },
            Run::Ran { plan, outputs },
        ) => Some(
            fuzz_exec::compare_runs(
                (reference_plan, reference_outputs),
                (plan, outputs),
                tolerance,
            )
            .is_err(),
        ),
        _ => None,
    }
}

fn copy_tree(from: &Path, to: &Path) -> Result<()> {
    let mut pending = vec![(from.to_path_buf(), to.to_path_buf())];
    while let Some((from, to)) = pending.pop() {
        let Ok(entries) = fs::read_dir(&from) else {
            continue;
        };
        fs::create_dir_all(&to)?;
        for entry in entries.flatten() {
            let path = entry.path();
            let Some(name) = path.file_name() else {
                continue;
            };
            let target = to.join(name);
            if path.is_dir() {
                pending.push((path, target));
            } else {
                fs::copy(&path, target)?;
            }
        }
    }
    Ok(())
}

struct ReferenceRuns {
    ours: Run,
    theirs: Run,
}

pub fn run(root: &Path, options: Options) -> Result<()> {
    let tools = Tools {
        glslang: oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?.path,
        spirv_val: oracles::find_tool(root, "spirv-val", "RGLSL_SPIRV_VAL")?.path,
        self_exe: std::env::current_exe().context("locating the xtask binary")?,
        timeout: Duration::from_secs(options.timeout_secs),
    };
    let job = read_job(&options.job)?;
    let stem = options
        .job
        .file_stem()
        .and_then(|stem| stem.to_str())
        .unwrap_or("shader")
        .to_owned();
    let family = options
        .job
        .parent()
        .and_then(|dir| dir.file_name())
        .and_then(|name| name.to_str())
        .unwrap_or("job")
        .to_owned();
    let work = crate::fuzz_libfuzzer::fuzz_root(root)
        .join("reduce")
        .join(format!("{family}-{stem}"));
    let _ = fs::remove_dir_all(&work);
    fs::create_dir_all(&work)?;
    let executor = if options.interesting.needs_exec() {
        Some(Executor::new(
            &options.target,
            root,
            &tools.glslang,
            &work.join("exec"),
            tools.timeout,
        )?)
    } else {
        None
    };
    let reference = match (&executor, options.interesting) {
        (Some(executor), Interesting::DiffersFromReference) => {
            let shader = job
                .shaders
                .first()
                .map(|shader| options.job.with_extension(&shader.extension))
                .context("no shader")?;
            let reference = fuzz_exec::family_of(&shader)
                .context("the job is not a variant of a shader family with a reference")?;
            let (verdict, spirv) = tools.verdict(&reference, false)?;
            if verdict != Verdict::Agree {
                bail!("the reference does not compile: {}", verdict.label());
            }
            let json = reference.with_extension("json");
            let dir = executor.work_dir().join("fuzz").join("reference");
            Some(ReferenceRuns {
                ours: run_module(executor, &spirv, &json, &dir, "rglsl")?,
                theirs: run_module(
                    executor,
                    &spirv.with_extension("glslang.spv"),
                    &json,
                    &dir,
                    "glslang",
                )?,
            })
        }
        _ => None,
    };
    let candidate_json = work.join("candidate.json");
    let stage_dir = executor.as_ref().map_or_else(
        || work.join("stage"),
        |executor| executor.work_dir().join("fuzz").join("stage"),
    );
    let mut first = true;
    let mut judge_once = |candidate: &ShaderJob| -> Result<bool> {
        let shader = write_job(candidate, &candidate_json)?;
        let optimize = options.interesting.optimizes();
        let (verdict, spirv) = tools.verdict(&shader, optimize)?;
        let interesting = match options.interesting {
            Interesting::Crash => verdict == Verdict::Crash,
            Interesting::Reject => matches!(verdict, Verdict::WeReject | Verdict::BackendFailed),
            Interesting::InvalidSpirv => verdict == Verdict::InvalidSpirv,
            Interesting::RglslFails => match verdict {
                Verdict::Crash | Verdict::WeReject | Verdict::BackendFailed => true,
                Verdict::Agree | Verdict::InvalidSpirv => tools.linked_alone_fails(&shader)?,
                _ => false,
            },
            Interesting::OptimizerDiffers => {
                let Some(executor) = &executor else {
                    return Ok(false);
                };
                if verdict != Verdict::Agree {
                    return Ok(false);
                }
                let _ = fs::remove_dir_all(&stage_dir);
                let ours = run_module(executor, &spirv, &candidate_json, &stage_dir, "rglsl")?;
                let optimized = run_module(
                    executor,
                    &crate::fuzz::optimized_module(&spirv),
                    &candidate_json,
                    &stage_dir,
                    "rglsl-O",
                )?;
                match (&ours, &optimized) {
                    (Run::Ran { .. }, Run::Failed(_)) => true,
                    _ => differs(&ours, &optimized, fuzz_exec::Tolerance::OneLevel) == Some(true),
                }
            }
            Interesting::OptimizerHangs | Interesting::ExecHangs => {
                let Some(executor) = &executor else {
                    return Ok(false);
                };
                if verdict != Verdict::Agree {
                    return Ok(false);
                }
                let _ = fs::remove_dir_all(&stage_dir);
                let (runs, hangs) = if options.interesting == Interesting::OptimizerHangs {
                    (
                        (spirv.clone(), "rglsl"),
                        (crate::fuzz::optimized_module(&spirv), "rglsl-O"),
                    )
                } else {
                    (
                        (spirv.with_extension("glslang.spv"), "glslang"),
                        (spirv.clone(), "rglsl"),
                    )
                };
                let first_outcome =
                    run_alone(executor, &runs.0, &candidate_json, &stage_dir, runs.1)?;
                let second_outcome = if first_outcome == Outcome::Ran {
                    Some(run_alone(
                        executor,
                        &hangs.0,
                        &candidate_json,
                        &stage_dir,
                        hangs.1,
                    )?)
                } else {
                    None
                };
                if first {
                    eprintln!(
                        "[xtask] the input's {} module {}",
                        runs.1,
                        first_outcome.describe()
                    );
                    if let Some(outcome) = &second_outcome {
                        eprintln!(
                            "[xtask] the input's {} module {}",
                            hangs.1,
                            outcome.describe()
                        );
                    }
                    first = false;
                }
                second_outcome.is_some_and(|second| only_second_hangs(&first_outcome, &second))
            }
            Interesting::DiffersFromGlslang
            | Interesting::DiffersFromReference
            | Interesting::ExecFails => {
                let Some(executor) = &executor else {
                    return Ok(false);
                };
                if verdict != Verdict::Agree {
                    return Ok(false);
                }
                let _ = fs::remove_dir_all(&stage_dir);
                let ours = run_module(executor, &spirv, &candidate_json, &stage_dir, "rglsl")?;
                let theirs = run_module(
                    executor,
                    &spirv.with_extension("glslang.spv"),
                    &candidate_json,
                    &stage_dir,
                    "glslang",
                )?;
                if first {
                    for (tag, run) in [("rglsl", &ours), ("glslang", &theirs)] {
                        if let Run::Failed(why) | Run::Refused(why) = run {
                            eprintln!("[xtask] the input's {tag} module did not run: {why}");
                        }
                    }
                    first = false;
                }
                match &reference {
                    _ if options.interesting == Interesting::ExecFails => {
                        matches!(ours, Run::Failed(_)) && matches!(theirs, Run::Ran { .. })
                    }
                    Some(reference) => {
                        differs(&reference.ours, &ours, fuzz_exec::Tolerance::Exact) == Some(true)
                            && differs(&reference.theirs, &theirs, fuzz_exec::Tolerance::Exact)
                                == Some(false)
                    }
                    None => differs(&theirs, &ours, fuzz_exec::Tolerance::Exact) == Some(true),
                }
            }
        };
        Ok(interesting)
    };
    let repeats = if options.interesting.needs_exec() {
        options.repeats.max(1)
    } else {
        1
    };
    let mut judge = |candidate: &ShaderJob| -> Result<bool> {
        for _ in 0..repeats {
            if !judge_once(candidate)? {
                return Ok(false);
            }
        }
        Ok(true)
    };
    let mut adapter = |candidate: &ShaderJob| {
        judge(candidate).map_err(|error| rglsl_fuzz::Error::Generation(format!("{error:#}")))
    };
    let reduce_options = ReduceOptions {
        preserve_semantics: options.preserve_semantics,
        max_steps: options.max_steps,
        guards: options.guards,
    };
    let reduction = reduce(&job, reduce_options, &mut adapter)?;
    let finalised = finalise(&reduction.job)?;
    let reduced = if adapter(&finalised)? {
        finalised
    } else {
        adapter(&reduction.job)?;
        reduction.job
    };
    let output = options.output.unwrap_or_else(|| work.join("result"));
    fs::create_dir_all(&output)?;
    let final_json = output.join(format!("{stem}_reduced.json"));
    let shader = write_job(&reduced, &final_json)?;
    match amber_script(&reduced) {
        Ok(script) => fs::write(output.join(format!("{stem}_reduced.amber")), script)?,
        Err(error) => eprintln!("[xtask] no GLSL Amber script: {error}"),
    }
    if options.interesting.needs_exec() {
        let modules = output.join("modules");
        let _ = fs::remove_dir_all(&modules);
        fs::create_dir_all(&modules)?;
        copy_tree(&stage_dir, &modules)?;
    }
    let lines = fs::read_to_string(&shader)?.lines().count();
    println!(
        "{} steps, {} interesting; {lines}-line reproducer: {}",
        reduction.steps,
        reduction.successes,
        shader.display()
    );
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::exec::Outputs;
    use crate::exec::batch::{Ending, JobError, JobResult, Trace};

    fn ran(result: JobResult, ending: Option<Ending>, resets: &[&str]) -> classify::Ran {
        classify::Ran {
            result,
            trace: Trace {
                ending,
                ..Trace::default()
            },
            resets: resets.iter().map(|reset| (*reset).to_string()).collect(),
            crash_module: None,
        }
    }

    fn failed(message: &str) -> JobResult {
        Err(JobError::Failed(message.into()))
    }

    fn outcome(ran: &classify::Ran) -> Result<&'static str> {
        Ok(match Outcome::of(ran)? {
            Outcome::Ran => "ran",
            Outcome::Hung(_) => "hung",
            Outcome::Failed(_) => "failed",
        })
    }

    #[test]
    fn hangs_are_timeouts_lost_devices_and_resets() -> Result<()> {
        let exited = Some(Ending::Exited(1));
        let cases = [
            (ran(Ok(Outputs::new()), Some(Ending::Exited(0)), &[]), "ran"),
            (
                ran(failed("amber timed out"), Some(Ending::TimedOut), &[]),
                "hung",
            ),
            (
                ran(
                    failed("amber exited with 1: vkQueueSubmit Fail (DEVICE_LOST)"),
                    exited,
                    &[],
                ),
                "hung",
            ),
            (ran(failed("device lost after RUN"), exited, &[]), "hung"),
            (
                ran(
                    Ok(Outputs::new()),
                    Some(Ending::Exited(0)),
                    &["nvlddmkm event 153 at 2 ms"],
                ),
                "hung",
            ),
            (
                ran(
                    failed("amber exited with 1: probe failed"),
                    exited,
                    &["Display event 4101 at 2 ms"],
                ),
                "hung",
            ),
            (
                ran(failed("amber exited with 1: probe failed"), exited, &[]),
                "failed",
            ),
            (
                ran(
                    failed("amber crashed: signal"),
                    Some(Ending::Crashed(None)),
                    &[],
                ),
                "failed",
            ),
        ];
        for (run, expected) in cases {
            assert_eq!(outcome(&run)?, expected, "{run:?}");
        }
        let not_run = ran(Err(JobError::NotRun("ssh".into())), None, &[]);
        assert!(Outcome::of(&not_run).is_err());
        Ok(())
    }

    #[test]
    fn only_a_hang_after_a_clean_run_is_interesting() {
        let hung = Outcome::Hung(String::from("amber timed out"));
        let failed = Outcome::Failed(String::from("probe failed"));
        assert!(only_second_hangs(&Outcome::Ran, &hung));
        assert!(!only_second_hangs(&Outcome::Ran, &Outcome::Ran));
        assert!(!only_second_hangs(&Outcome::Ran, &failed));
        assert!(!only_second_hangs(&hung, &hung));
        assert!(!only_second_hangs(&failed, &hung));
    }

    #[test]
    fn the_hang_criteria_run_on_the_exec_target() {
        for (name, optimizes) in [("optimizer-hangs", true), ("exec-hangs", false)] {
            let Some(interesting) = Interesting::parse(name) else {
                panic!("{name} is not a criterion");
            };
            assert!(interesting.needs_exec());
            assert_eq!(interesting.optimizes(), optimizes);
        }
    }
}
