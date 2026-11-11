use std::fs;
use std::path::{Path, PathBuf};
use std::time::Duration;

use anyhow::{bail, Context, Result};
use rglsl_fuzz::amber::amber_script;
use rglsl_fuzz::reduce::{finalise, reduce, ReduceOptions};
use rglsl_fuzz::{ShaderJob, STAGE_EXTENSIONS};

use crate::exec::{Executor, TargetId};
use crate::fuzz::{compare, Verdict};
use crate::fuzz_exec::{self, Run};
use crate::oracles;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Interesting {
    Crash,
    Reject,
    InvalidSpirv,
    DiffersFromGlslang,
    DiffersFromReference,
}

impl Interesting {
    pub fn parse(text: &str) -> Option<Self> {
        match text {
            "crash" => Some(Self::Crash),
            "reject" => Some(Self::Reject),
            "invalid-spirv" => Some(Self::InvalidSpirv),
            "differs-from-glslang" => Some(Self::DiffersFromGlslang),
            "differs-from-reference" => Some(Self::DiffersFromReference),
            _ => None,
        }
    }

    const fn needs_exec(self) -> bool {
        matches!(self, Self::DiffersFromGlslang | Self::DiffersFromReference)
    }
}

#[derive(Debug)]
pub struct Options {
    pub job: PathBuf,
    pub interesting: Interesting,
    pub target: TargetId,
    pub preserve_semantics: bool,
    pub max_steps: u32,
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
    let emitted = job.emit();
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
    fn verdict(&self, shader: &Path) -> Result<(Verdict, PathBuf)> {
        let spirv = shader.with_extension("spv");
        let outcome = compare(
            &self.glslang,
            &self.spirv_val,
            &self.self_exe,
            shader,
            &spirv,
            self.timeout,
        )?;
        Ok((outcome.verdict, spirv))
    }
}

fn run_module(executor: &Executor, spirv: &Path, json: &Path, dir: &Path, tag: &str) -> Run {
    let staged = fuzz_exec::stage_module(executor, spirv, Some(json), dir, tag);
    let result = match &staged {
        fuzz_exec::Staged::Ready { job, .. } => executor
            .confirm_jobs(std::slice::from_ref(job))
            .into_iter()
            .next(),
        fuzz_exec::Staged::Refused(_) => None,
    };
    fuzz_exec::finish(&staged, result)
}

fn differs(reference: &Run, variant: &Run) -> Option<bool> {
    match (reference, variant) {
        (
            Run::Ran {
                plan: reference_plan,
                outputs: reference_outputs,
            },
            Run::Ran { plan, outputs },
        ) => Some(
            fuzz_exec::compare_runs((reference_plan, reference_outputs), (plan, outputs)).is_err(),
        ),
        _ => None,
    }
}

fn copy_tree(from: &Path, to: &Path) -> Result<()> {
    let Ok(entries) = fs::read_dir(from) else {
        return Ok(());
    };
    fs::create_dir_all(to)?;
    for entry in entries.flatten() {
        let path = entry.path();
        let Some(name) = path.file_name() else {
            continue;
        };
        if path.is_dir() {
            copy_tree(&path, &to.join(name))?;
        } else {
            fs::copy(&path, to.join(name))?;
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
    let work = root
        .join("target")
        .join("fuzz")
        .join("reduce")
        .join(format!("{family}-{stem}"));
    let _ = fs::remove_dir_all(&work);
    fs::create_dir_all(&work)?;
    let executor = if options.interesting.needs_exec() {
        Some(Executor::new(
            options.target,
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
            let (verdict, spirv) = tools.verdict(&reference)?;
            if verdict != Verdict::Agree {
                bail!("the reference does not compile: {}", verdict.label());
            }
            let json = reference.with_extension("json");
            let dir = work.join("reference");
            Some(ReferenceRuns {
                ours: run_module(executor, &spirv, &json, &dir, "rglsl"),
                theirs: run_module(
                    executor,
                    &spirv.with_extension("glslang.spv"),
                    &json,
                    &dir,
                    "glslang",
                ),
            })
        }
        _ => None,
    };
    let candidate_json = work.join("candidate.json");
    let stage_dir = work.join("stage");
    let judge = |candidate: &ShaderJob| -> Result<bool> {
        let shader = write_job(candidate, &candidate_json)?;
        let (verdict, spirv) = tools.verdict(&shader)?;
        let interesting = match options.interesting {
            Interesting::Crash => verdict == Verdict::Crash,
            Interesting::Reject => matches!(verdict, Verdict::WeReject | Verdict::BackendFailed),
            Interesting::InvalidSpirv => verdict == Verdict::InvalidSpirv,
            Interesting::DiffersFromGlslang | Interesting::DiffersFromReference => {
                let Some(executor) = &executor else {
                    return Ok(false);
                };
                if verdict != Verdict::Agree {
                    return Ok(false);
                }
                let _ = fs::remove_dir_all(&stage_dir);
                let ours = run_module(executor, &spirv, &candidate_json, &stage_dir, "rglsl");
                let theirs = run_module(
                    executor,
                    &spirv.with_extension("glslang.spv"),
                    &candidate_json,
                    &stage_dir,
                    "glslang",
                );
                match &reference {
                    Some(reference) => {
                        differs(&reference.ours, &ours) == Some(true)
                            && differs(&reference.theirs, &theirs) == Some(false)
                    }
                    None => differs(&theirs, &ours) == Some(true),
                }
            }
        };
        Ok(interesting)
    };
    let mut adapter = |candidate: &ShaderJob| {
        judge(candidate).map_err(|error| rglsl_fuzz::Error::Generation(format!("{error:#}")))
    };
    let reduce_options = ReduceOptions {
        preserve_semantics: options.preserve_semantics,
        max_steps: options.max_steps,
    };
    let reduction = reduce(&job, reduce_options, &mut adapter)?;
    let finalised = finalise(&reduction.job);
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
