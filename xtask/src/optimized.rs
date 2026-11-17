use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::Duration;

use anyhow::Result;

use crate::corpus::Case;
use crate::process::{self, Exit};
use crate::runner::Environment;
use crate::worker::{EXIT_ACCEPTED, EXIT_BACKEND_FAILED, EXIT_REJECTED};

pub const LEVEL: &str = "O";

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Outcome {
    pub passed: bool,
    pub identical: bool,
    pub note: String,
}

impl Outcome {
    fn fail(note: impl Into<String>) -> Self {
        Self {
            passed: false,
            identical: false,
            note: note.into(),
        }
    }
}

pub fn check_file(
    env: &Environment,
    self_exe: &Path,
    case: &Case,
    unoptimized: &Path,
    timeout: Duration,
) -> Result<Outcome> {
    let out = unoptimized.with_extension(format!("{LEVEL}.spv"));
    let mut command = crate::runner::ours_command(env, self_exe, case, &case.path, &out);
    command.arg(format!("--opt={LEVEL}"));
    check(
        env,
        case,
        command,
        &[(unoptimized.to_path_buf(), out)],
        timeout,
    )
}

pub fn check_group(
    env: &Environment,
    case: &Case,
    mut command: Command,
    modules: &[(PathBuf, PathBuf)],
    timeout: Duration,
) -> Result<Outcome> {
    command.arg(format!("--opt={LEVEL}"));
    check(env, case, command, modules, timeout)
}

fn check(
    env: &Environment,
    case: &Case,
    command: Command,
    modules: &[(PathBuf, PathBuf)],
    timeout: Duration,
) -> Result<Outcome> {
    let output = process::run(command, timeout)?;
    let first = output
        .stdout
        .lines()
        .find_map(|line| line.strip_prefix("E "))
        .unwrap_or_default()
        .to_string();
    match output.exit {
        Exit::Code(EXIT_ACCEPTED) => {}
        Exit::Code(EXIT_REJECTED) => return Ok(Outcome::fail(format!("rejected: {first}"))),
        Exit::Code(EXIT_BACKEND_FAILED) => return Ok(Outcome::fail(format!("failed: {first}"))),
        Exit::Code(code) => {
            return Ok(Outcome::fail(format!(
                "crash (exit {code}): {}",
                output.stderr.lines().next().unwrap_or_default()
            )));
        }
        Exit::Signal => return Ok(Outcome::fail("crash (signal)")),
        Exit::Timeout => return Ok(Outcome::fail("timeout")),
    }
    let mut identical = true;
    for (unoptimized, optimized) in modules {
        if !optimized.is_file() {
            return Ok(Outcome::fail(format!(
                "no module {}",
                optimized
                    .file_name()
                    .map_or_else(String::new, |name| name.to_string_lossy().into_owned())
            )));
        }
        if let Some(message) = crate::runner::validate(env, case, optimized, timeout)? {
            return Ok(Outcome::fail(format!("spirv-val: {message}")));
        }
        identical &= std::fs::read(unoptimized)? == std::fs::read(optimized)?;
    }
    Ok(Outcome {
        passed: true,
        identical,
        note: String::new(),
    })
}
