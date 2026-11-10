//! `cargo xtask test`: runs the glslang corpus against the oracles.

use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Mutex, PoisonError};
use std::time::{Duration, Instant};

use anyhow::{bail, Context, Result};

use crate::corpus::{self, Case};
use crate::oracles::{self, Tool};
use crate::process::{self, Exit};
use crate::report;
use crate::worker::{EXIT_ACCEPTED, EXIT_BACKEND_FAILED, EXIT_REJECTED};

#[derive(Debug)]
pub struct Options {
    pub glslang_dir: Option<PathBuf>,
    pub filter: Option<String>,
    pub jobs: Option<usize>,
    pub timeout_secs: u64,
    pub write_progress: bool,
}

/// What glslang did with a shader.
#[derive(Debug, Clone)]
pub enum OracleResult {
    Accepted,
    /// Rejected, with the line numbers of its errors (errors without a line are skipped).
    Rejected {
        lines: Vec<u32>,
    },
    /// glslang itself crashed or hung; the shader is left out of the comparison.
    Broken(String),
}

/// What we did with a shader.
#[derive(Debug, Clone)]
pub enum OursResult {
    /// SPIR-V was produced.
    Accepted,
    /// Rejected by the frontend or validator; line of the first error, if known.
    Rejected { first_line: Option<u32> },
    /// Accepted by the frontend and validator, but the backend failed.
    BackendFailed,
    /// Panic, signal or timeout. Always a bug.
    Crashed,
}

#[derive(Debug, Clone)]
pub struct CaseResult {
    pub case: Case,
    pub oracle: OracleResult,
    pub ours: OursResult,
    /// `Some(ok)` when spirv-val ran on our output.
    pub spirv_val: Option<bool>,
    /// First diagnostic, for the per-file report.
    pub note: String,
}

impl CaseResult {
    /// `accept`: we accept exactly what glslang accepts.
    pub fn accept(&self) -> Option<bool> {
        let oracle = match self.oracle {
            OracleResult::Accepted => true,
            OracleResult::Rejected { .. } => false,
            OracleResult::Broken(_) => return None,
        };
        let ours = match self.ours {
            OursResult::Accepted | OursResult::BackendFailed => Some(true),
            OursResult::Rejected { .. } => Some(false),
            OursResult::Crashed => None,
        };
        Some(ours == Some(oracle))
    }

    /// `diag`: when glslang rejects, we reject too and our first error is on
    /// one of the lines glslang reports.
    pub fn diag(&self) -> Option<bool> {
        let OracleResult::Rejected { lines } = &self.oracle else {
            return None;
        };
        Some(match self.ours {
            OursResult::Rejected {
                first_line: Some(line),
            } => lines.contains(&line),
            _ => false,
        })
    }

    /// `valid`: everything we accept becomes SPIR-V that passes spirv-val.
    pub fn valid(&self) -> Option<bool> {
        match self.ours {
            OursResult::Accepted => self.spirv_val,
            OursResult::BackendFailed => Some(false),
            OursResult::Rejected { .. } | OursResult::Crashed => None,
        }
    }
}

pub struct Environment {
    pub glslang_dir: PathBuf,
    pub glslang_commit: Option<String>,
    pub glslang: Tool,
    pub spirv_val: Tool,
    pub pins: oracles::Pins,
}

pub fn run(root: &Path, options: Options) -> Result<()> {
    let pins = oracles::load_pins(root)?;
    let glslang_dir = options
        .glslang_dir
        .clone()
        .unwrap_or_else(|| oracles::default_glslang_src(root));
    if !glslang_dir.join("Test").is_dir() {
        bail!(
            "{} has no Test/ directory: run `cargo xtask oracles` or pass --glslang-dir",
            glslang_dir.display()
        );
    }
    let env = Environment {
        glslang_commit: oracles::git_head(&glslang_dir).ok(),
        glslang: oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?,
        spirv_val: oracles::find_tool(root, "spirv-val", "RGLSL_SPIRV_VAL")?,
        glslang_dir,
        pins,
    };
    if env.glslang_commit.as_deref() != Some(env.pins.glslang.commit.as_str()) {
        eprintln!(
            "[xtask] warning: the corpus checkout is not at the pinned glslang commit {}",
            env.pins.glslang.commit
        );
    }
    for tool in [&env.glslang, &env.spirv_val] {
        if !tool.pinned {
            eprintln!(
                "[xtask] warning: using unpinned {} (run `cargo xtask oracles` for the pinned build)",
                tool.path.display()
            );
        }
    }

    let mut cases = corpus::load(&env.glslang_dir)?;
    if let Some(filter) = &options.filter {
        cases.retain(|c| c.name.contains(filter.as_str()));
    }
    if cases.is_empty() {
        bail!("no shaders selected");
    }

    let work_dir = root.join("target").join("xtask").join("corpus");
    let _ = fs::remove_dir_all(&work_dir);
    fs::create_dir_all(work_dir.join("glslang"))?;
    fs::create_dir_all(work_dir.join("ours"))?;

    let self_exe = std::env::current_exe().context("locating the xtask binary")?;
    let timeout = Duration::from_secs(options.timeout_secs);
    let jobs = options
        .jobs
        .unwrap_or_else(|| std::thread::available_parallelism().map_or(4, |n| n.get()))
        .max(1);

    let started = Instant::now();
    let next = AtomicUsize::new(0);
    let done = AtomicUsize::new(0);
    let results: Mutex<Vec<(usize, CaseResult)>> = Mutex::new(Vec::with_capacity(cases.len()));
    let errors: Mutex<Vec<anyhow::Error>> = Mutex::new(Vec::new());
    std::thread::scope(|scope| {
        for _ in 0..jobs {
            scope.spawn(|| loop {
                let index = next.fetch_add(1, Ordering::Relaxed);
                let Some(case) = cases.get(index) else { break };
                match run_case(&env, &self_exe, &work_dir, case, timeout) {
                    Ok(result) => results
                        .lock()
                        .unwrap_or_else(PoisonError::into_inner)
                        .push((index, result)),
                    Err(err) => errors
                        .lock()
                        .unwrap_or_else(PoisonError::into_inner)
                        .push(err.context(case.name.clone())),
                }
                let finished = done.fetch_add(1, Ordering::Relaxed) + 1;
                if finished.is_multiple_of(200) {
                    eprintln!("[xtask] {finished} / {}", cases.len());
                }
            });
        }
    });
    if let Some(err) = errors
        .into_inner()
        .unwrap_or_else(PoisonError::into_inner)
        .into_iter()
        .next()
    {
        return Err(err);
    }
    let mut results = results.into_inner().unwrap_or_else(PoisonError::into_inner);
    results.sort_by_key(|&(index, _)| index);
    let results: Vec<CaseResult> = results.into_iter().map(|(_, result)| result).collect();
    eprintln!(
        "[xtask] ran {} shaders in {:.1}s",
        results.len(),
        started.elapsed().as_secs_f64()
    );

    let details = root.join("target").join("xtask").join("results.tsv");
    fs::write(&details, report::details(&results))?;
    let summary = report::progress(&env, &results);
    if options.write_progress && options.filter.is_none() {
        fs::write(root.join("PROGRESS.md"), &summary)?;
        eprintln!("[xtask] wrote PROGRESS.md");
    }
    print!("{}", report::summary(&results));
    eprintln!("[xtask] per-shader results: {}", details.display());
    Ok(())
}

fn run_case(
    env: &Environment,
    self_exe: &Path,
    work_dir: &Path,
    case: &Case,
    timeout: Duration,
) -> Result<CaseResult> {
    let oracle = run_oracle(env, work_dir, case, timeout)?;

    let out = work_dir.join("ours").join(format!("{}.spv", case.name));
    let mut command = Command::new(self_exe);
    command
        .arg("compile-one")
        .args(["--stage", case.stage])
        .args([
            "--spv",
            &format!("{}.{}", case.target.spirv.0, case.target.spirv.1),
        ])
        .arg("--out")
        .arg(&out);
    if case.target.automap {
        command.arg("--auto-map");
    }
    command.arg(&case.path);
    let output = process::run(command, timeout)?;
    let first = output.stdout.lines().find_map(|l| l.strip_prefix("E "));
    let first_line = first
        .and_then(|d| d.split(' ').nth(1))
        .and_then(|l| l.parse().ok());
    let mut note = first.unwrap_or_default().to_string();
    let ours = match output.exit {
        Exit::Code(EXIT_ACCEPTED) => OursResult::Accepted,
        Exit::Code(EXIT_REJECTED) => OursResult::Rejected { first_line },
        Exit::Code(EXIT_BACKEND_FAILED) => OursResult::BackendFailed,
        Exit::Code(code) => {
            note = format!("crash (exit {code}): {}", first_stderr_line(&output.stderr));
            OursResult::Crashed
        }
        Exit::Signal => {
            note = format!("crash (signal): {}", first_stderr_line(&output.stderr));
            OursResult::Crashed
        }
        Exit::Timeout => {
            note = "timeout".into();
            OursResult::Crashed
        }
    };

    let spirv_val = match ours {
        OursResult::Accepted => {
            let mut command = Command::new(&env.spirv_val.path);
            command.args(["--target-env", &case.target.spirv_val_env()]);
            if enables_extension(&case.path, "GL_EXT_texture_offset_non_const") {
                command.arg("--allow-offset-texture-operand");
            }
            if enables_extension(&case.path, "GL_EXT_scalar_block_layout") {
                command.arg("--scalar-block-layout");
            }
            command.arg(&out);
            let output = process::run(command, timeout)?;
            let ok = matches!(output.exit, Exit::Code(0));
            if !ok {
                let message = output
                    .stderr
                    .lines()
                    .chain(output.stdout.lines())
                    .find(|l| !l.trim().is_empty())
                    .unwrap_or("spirv-val failed");
                note = format!("spirv-val: {message}");
            }
            Some(ok)
        }
        _ => None,
    };

    Ok(CaseResult {
        case: case.clone(),
        oracle,
        ours,
        spirv_val,
        note,
    })
}

fn run_oracle(
    env: &Environment,
    work_dir: &Path,
    case: &Case,
    timeout: Duration,
) -> Result<OracleResult> {
    let mut command = Command::new(&env.glslang.path);
    command
        .current_dir(env.glslang_dir.join("Test"))
        .args(case.target.glslang_args());
    if !case.target.ast_only || case.target.semantics == corpus::Semantics::Vulkan {
        command
            .arg("-o")
            .arg(work_dir.join("glslang").join(format!("{}.spv", case.name)));
    }
    command.arg(&case.name);
    let output = process::run(command, timeout)?;
    Ok(match output.exit {
        Exit::Code(0) => OracleResult::Accepted,
        // glslangValidator exits with 1 (usage), 2 (compile) or 3 (link) for
        // errors in the shader.
        Exit::Code(1..=3) => OracleResult::Rejected {
            // Errors go to stdout or stderr depending on the mode.
            lines: glslang_error_lines(&format!("{}\n{}", output.stdout, output.stderr)),
        },
        Exit::Code(code) => OracleResult::Broken(format!("glslang exited with {code}")),
        Exit::Signal => OracleResult::Broken("glslang crashed".into()),
        Exit::Timeout => OracleResult::Broken("glslang timed out".into()),
    })
}

/// Line numbers from `ERROR: <string>:<line>: ...` messages.
fn glslang_error_lines(stdout: &str) -> Vec<u32> {
    stdout
        .lines()
        .filter_map(|l| l.strip_prefix("ERROR: "))
        .filter_map(|rest| rest.split(':').nth(1)?.trim().parse().ok())
        .collect()
}

fn first_stderr_line(stderr: &str) -> String {
    stderr
        .lines()
        .find(|l| !l.trim().is_empty())
        .unwrap_or("")
        .trim()
        .to_string()
}

fn enables_extension(path: &Path, extension: &str) -> bool {
    fs::read_to_string(path).is_ok_and(|source| {
        source.lines().any(|line| {
            let line = line.trim_start();
            line.starts_with("#extension") && line.contains(extension)
        })
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn parses_glslang_errors() {
        let out = "100.frag\nERROR: 0:3: 'x' : bad\nERROR: 0:14: 'y' : worse\nERROR: Linking fragment stage: Missing entry point\nERROR: 3 compilation errors.  No code generated.\n";
        assert_eq!(glslang_error_lines(out), [3, 14]);
    }
}
