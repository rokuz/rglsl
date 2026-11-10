//! Running child processes with a timeout.

use std::io::Read;
use std::path::Path;
use std::process::{Command, Stdio};
use std::thread;
use std::time::{Duration, Instant};

use anyhow::{bail, Context, Result};

#[derive(Debug)]
pub enum Exit {
    Code(i32),
    /// Killed by a signal (on Unix) or exited without a code.
    Signal,
    Timeout,
}

#[derive(Debug)]
pub struct Output {
    pub exit: Exit,
    pub stdout: String,
    pub stderr: String,
}

/// Runs `command` to completion, killing it after `timeout`.
pub fn run(mut command: Command, timeout: Duration) -> Result<Output> {
    command
        .stdin(Stdio::null())
        .stdout(Stdio::piped())
        .stderr(Stdio::piped());
    let program = command.get_program().to_string_lossy().into_owned();
    let mut child = command
        .spawn()
        .with_context(|| format!("failed to start `{program}`"))?;

    // Drain the pipes on their own threads so a chatty child never blocks.
    let (Some(mut stdout), Some(mut stderr)) = (child.stdout.take(), child.stderr.take()) else {
        let _ = child.kill();
        let _ = child.wait();
        bail!("`{program}` was started without piped output");
    };
    let out_reader = thread::spawn(move || {
        let mut buf = Vec::new();
        let _ = stdout.read_to_end(&mut buf);
        buf
    });
    let err_reader = thread::spawn(move || {
        let mut buf = Vec::new();
        let _ = stderr.read_to_end(&mut buf);
        buf
    });

    let deadline = Instant::now() + timeout;
    let exit = loop {
        if let Some(status) = child.try_wait()? {
            break match status.code() {
                Some(code) => Exit::Code(code),
                None => Exit::Signal,
            };
        }
        if Instant::now() >= deadline {
            let _ = child.kill();
            let _ = child.wait();
            break Exit::Timeout;
        }
        thread::sleep(Duration::from_millis(5));
    };

    let stdout = out_reader.join().unwrap_or_default();
    let stderr = err_reader.join().unwrap_or_default();
    Ok(Output {
        exit,
        stdout: String::from_utf8_lossy(&stdout).into_owned(),
        stderr: String::from_utf8_lossy(&stderr).into_owned(),
    })
}

/// Runs a build step, failing with its output if it does not succeed.
pub fn checked(command: &mut Command, what: &str) -> Result<()> {
    eprintln!("[xtask] {what}");
    let status = command
        .status()
        .with_context(|| format!("failed to start: {what}"))?;
    if !status.success() {
        bail!("failed ({status}): {what}");
    }
    Ok(())
}

/// Runs a command and returns its trimmed stdout.
pub fn capture(command: &mut Command) -> Result<String> {
    let output = command.output()?;
    if !output.status.success() {
        bail!(
            "command failed: {}",
            String::from_utf8_lossy(&output.stderr).trim()
        );
    }
    Ok(String::from_utf8_lossy(&output.stdout).trim().to_string())
}

/// Finds `name` on `PATH`.
pub fn which(name: &str) -> Option<std::path::PathBuf> {
    let path = std::env::var_os("PATH")?;
    std::env::split_paths(&path)
        .map(|dir| dir.join(name))
        .find(|candidate| is_executable(candidate))
}

pub fn is_executable(path: &Path) -> bool {
    path.is_file()
}
