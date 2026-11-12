use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};
use std::time::{Duration, SystemTime};

use anyhow::{bail, Context, Result};
use rglsl_fuzz::decisions::decode;
use rglsl_fuzz::ShaderJob;
use serde_json::json;

use crate::process::{self, Exit};

pub const VARIANT_TARGET: &str = "glsl_variant";
pub const ABORT_MARKER: &str = "glsl_variant: ";
const REJECTED_MARKER: &str = "but not its variant";

struct Target {
    name: &'static str,
    trace_compares: bool,
    extra: &'static [&'static str],
}

const TARGETS: [Target; 5] = [
    Target {
        name: "glsl_parser",
        trace_compares: true,
        extra: &[],
    },
    Target {
        name: "spv_parser",
        trace_compares: true,
        extra: &[],
    },
    Target {
        name: "ir",
        trace_compares: true,
        extra: &[],
    },
    Target {
        name: "object",
        trace_compares: true,
        extra: &[],
    },
    Target {
        name: VARIANT_TARGET,
        trace_compares: false,
        extra: &["-entropic=0", "-max_len=4096"],
    },
];

const ARTIFACT_KINDS: [&str; 5] = ["crash", "timeout", "oom", "leak", "slow-unit"];

#[derive(Debug)]
pub struct Options {
    pub target: String,
    pub time_secs: u64,
    pub jobs: Option<usize>,
    pub timeout_secs: u64,
    pub rss_limit_mb: u64,
}

pub fn fuzz_root(root: &Path) -> PathBuf {
    root.join("target").join("xtask").join("fuzz")
}

fn fuzz_dir(root: &Path) -> PathBuf {
    root.join("rglsl-fuzz").join("fuzz")
}

fn cargo_fuzz(root: &Path) -> Command {
    let mut command = Command::new("cargo");
    command
        .arg("+nightly")
        .arg("fuzz")
        .current_dir(root)
        .env_remove("CARGO")
        .env_remove("RUSTUP_TOOLCHAIN")
        .env_remove("RUSTC")
        .env_remove("RUSTC_WRAPPER");
    command
}

fn build_dir(root: &Path, target: &Target) -> PathBuf {
    fuzz_root(root)
        .join("build")
        .join(if target.trace_compares {
            "trace-compares"
        } else {
            "no-trace-compares"
        })
}

fn build_flags(command: &mut Command, root: &Path, target: &Target) {
    command
        .arg("--fuzz-dir")
        .arg(fuzz_dir(root))
        .arg("--target-dir")
        .arg(build_dir(root, target))
        .args(["--sanitizer", "none", "--debug-assertions"]);
    if !target.trace_compares {
        command.arg("--no-trace-compares");
    }
}

pub fn run(root: &Path, options: &Options) -> Result<()> {
    let Some(target) = TARGETS.iter().find(|target| target.name == options.target) else {
        let names: Vec<&str> = TARGETS.iter().map(|target| target.name).collect();
        bail!(
            "unknown libFuzzer target `{}` (known: {})",
            options.target,
            names.join(", ")
        );
    };
    let work = fuzz_root(root).join(target.name);
    let corpus = work.join("corpus");
    let artifacts = work.join("artifacts");
    fs::create_dir_all(&corpus)?;
    fs::create_dir_all(&artifacts)?;
    let log = work.join("libfuzzer.log");
    let jobs = options
        .jobs
        .unwrap_or_else(|| {
            std::thread::available_parallelism().map_or(1, |count| (count.get() / 2).max(1))
        })
        .max(1);

    let mut build = cargo_fuzz(root);
    build.arg("build");
    build_flags(&mut build, root, target);
    build.arg(target.name);
    let status = build
        .status()
        .context("running `cargo +nightly fuzz build` (needs nightly and cargo-fuzz)")?;
    if !status.success() {
        bail!("`cargo +nightly fuzz build {}` failed", target.name);
    }

    let started = SystemTime::now();
    let mut fuzz = cargo_fuzz(root);
    fuzz.arg("run");
    build_flags(&mut fuzz, root, target);
    fuzz.arg(target.name)
        .arg(&corpus)
        .arg("--")
        .arg(format!("-artifact_prefix={}/", artifacts.display()))
        .arg(format!("-max_total_time={}", options.time_secs))
        .arg(format!("-rss_limit_mb={}", options.rss_limit_mb))
        .arg(format!("-timeout={}", options.timeout_secs))
        .arg(format!("-fork={jobs}"))
        .args([
            "-ignore_crashes=1",
            "-ignore_timeouts=1",
            "-ignore_ooms=1",
            "-print_final_stats=1",
        ])
        .args(target.extra);
    let log_file = fs::File::create(&log)?;
    fuzz.stdin(Stdio::null())
        .stdout(log_file.try_clone()?)
        .stderr(log_file);
    eprintln!(
        "[xtask] libFuzzer {} for {}s on {jobs} jobs; log: {}",
        target.name,
        options.time_secs,
        log.display()
    );
    let status = fuzz.status().context("running `cargo +nightly fuzz run`")?;
    let text = fs::read_to_string(&log).unwrap_or_default();
    if let Some(stats) = text.lines().rev().find(|line| line.contains("cov:")) {
        println!("{}: {}", target.name, stats.trim());
    }
    if let Some(runs) = text
        .lines()
        .rev()
        .find(|line| line.starts_with("Done ") || line.contains("stat::number_of_executed_units"))
    {
        println!("{}: {}", target.name, runs.trim());
    }
    if !status.success() {
        eprintln!(
            "[xtask] libFuzzer exited with {status}; the end of {} says why",
            log.display()
        );
    }
    report(
        root,
        target,
        &work,
        &artifacts,
        started,
        options.timeout_secs,
    )
}

struct Finding {
    input: PathBuf,
    verdict: String,
    note: String,
    new: bool,
}

fn binary(build: &Path, name: &str) -> Option<PathBuf> {
    let entries = fs::read_dir(build).ok()?;
    entries
        .flatten()
        .map(|entry| entry.path().join("release").join(name))
        .filter(|path| path.is_file())
        .max_by_key(|path| fs::metadata(path).and_then(|meta| meta.modified()).ok())
}

fn first_rust_panic(stderr: &str) -> Option<String> {
    let mut lines = stderr.lines();
    while let Some(line) = lines.next() {
        if let Some(position) = line.find("panicked at ") {
            let location = line
                .get(position + "panicked at ".len()..)
                .unwrap_or_default()
                .trim_end_matches(':');
            let message = lines.next().unwrap_or_default();
            return Some(format!("{message} ({location})"));
        }
    }
    None
}

fn classify(kind: &str, stderr: &str) -> (String, String) {
    if let Some(line) = stderr.lines().find(|line| line.starts_with(ABORT_MARKER)) {
        let note = line
            .get(ABORT_MARKER.len()..)
            .unwrap_or_default()
            .to_owned();
        let verdict = if line.contains(REJECTED_MARKER) {
            "we-reject"
        } else {
            "crash"
        };
        return (verdict.to_owned(), note);
    }
    if let Some(panic) = first_rust_panic(stderr) {
        return (String::from("crash"), panic);
    }
    let note = stderr
        .lines()
        .find(|line| line.contains("==ERROR:") || line.contains("ALARM:"))
        .map(|line| line.trim().to_owned())
        .unwrap_or_default();
    (kind.to_owned(), note)
}

fn report(
    root: &Path,
    target: &Target,
    work: &Path,
    artifacts: &Path,
    started: SystemTime,
    timeout_secs: u64,
) -> Result<()> {
    let mut paths: Vec<PathBuf> = fs::read_dir(artifacts)?
        .flatten()
        .map(|entry| entry.path())
        .filter(|path| {
            path.is_file()
                && path
                    .file_name()
                    .and_then(|name| name.to_str())
                    .is_some_and(|name| {
                        ARTIFACT_KINDS
                            .iter()
                            .any(|kind| name.starts_with(&format!("{kind}-")))
                    })
        })
        .collect();
    paths.sort();
    let executable = binary(&build_dir(root, target), target.name);
    let self_exe = std::env::current_exe().context("locating the xtask binary")?;
    let mut findings = Vec::new();
    for path in paths {
        let name = path
            .file_name()
            .and_then(|name| name.to_str())
            .unwrap_or_default()
            .to_owned();
        let kind = ARTIFACT_KINDS
            .iter()
            .find(|kind| name.starts_with(&format!("{kind}-")))
            .copied()
            .unwrap_or("crash");
        let new = fs::metadata(&path)
            .and_then(|meta| meta.modified())
            .is_ok_and(|modified| modified >= started);
        let stderr = match &executable {
            Some(executable) => {
                let mut command = Command::new(executable);
                command
                    .arg(format!("-timeout={timeout_secs}"))
                    .arg("-runs=1")
                    .arg(&path);
                process::run(command, Duration::from_secs(timeout_secs.saturating_mul(2)))
                    .map(|output| match output.exit {
                        Exit::Timeout => String::from("==ERROR: libFuzzer: timeout"),
                        _ => output.stderr,
                    })
                    .unwrap_or_default()
            }
            None => String::new(),
        };
        let (verdict, mut note) = classify(kind, &stderr);
        if target.name == VARIANT_TARGET {
            let family = work.join("findings").join(&name);
            let mut command = Command::new(&self_exe);
            command
                .args(["fuzz", "--decode"])
                .arg(&path)
                .arg("--output")
                .arg(&family);
            match process::run(command, Duration::from_secs(timeout_secs.saturating_mul(2))) {
                Ok(output) if matches!(output.exit, Exit::Code(0)) => {
                    let _ = write!(note, "; decoded: {}", family.display());
                }
                _ => note.push_str("; the decisions do not decode"),
            }
        }
        findings.push(Finding {
            input: path,
            verdict,
            note,
            new,
        });
    }
    let fuzz = fuzz_root(root);
    let mut table = String::from("input\tverdict\tnote\n");
    for finding in &findings {
        let input = finding.input.strip_prefix(&fuzz).unwrap_or(&finding.input);
        let _ = writeln!(
            table,
            "{}\t{}\t{}",
            input.display(),
            finding.verdict,
            finding.note.replace(['\t', '\n'], " ")
        );
    }
    let report = work.join("report.tsv");
    fs::write(&report, table)?;
    let fresh = findings.iter().filter(|finding| finding.new).count();
    println!(
        "{}: {} findings ({fresh} from this run)",
        target.name,
        findings.len()
    );
    for finding in &findings {
        println!(
            "  {}{}  {}  {}",
            if finding.new { "new " } else { "" },
            finding.verdict,
            finding
                .input
                .file_name()
                .and_then(|name| name.to_str())
                .unwrap_or_default(),
            finding.note
        );
    }
    eprintln!("[xtask] findings: {}", report.display());
    Ok(())
}

fn write_job(job: &ShaderJob, json: &Path) -> Result<()> {
    let emitted = job.emit();
    fs::write(json, emitted.json)?;
    for (extension, text) in emitted.shaders {
        fs::write(json.with_extension(extension), text)?;
    }
    Ok(())
}

pub fn decode_artifact(root: &Path, artifact: &Path, output: Option<PathBuf>) -> Result<()> {
    let bytes = fs::read(artifact).with_context(|| format!("reading {}", artifact.display()))?;
    let name = artifact
        .file_name()
        .and_then(|name| name.to_str())
        .unwrap_or("input")
        .to_owned();
    let output = output.unwrap_or_else(|| {
        fuzz_root(root)
            .join(VARIANT_TARGET)
            .join("findings")
            .join(name)
    });
    let decoded = decode(&bytes).map_err(|error| anyhow::anyhow!("{error}"))?;
    fs::create_dir_all(&output)?;
    write_job(&decoded.reference, &output.join("reference.json"))?;
    write_job(&decoded.variant, &output.join("variant_000.json"))?;
    let info = json!({
        "seed": decoded.seed,
        "donors": decoded.donors,
        "link": decoded.link,
        "small": decoded.options.small,
        "add_injection_switch": decoded.options.add_injection_switch,
        "min_nodes": decoded.options.min_nodes,
        "max_nodes": decoded.options.max_nodes,
        "input": artifact.display().to_string(),
    });
    fs::write(
        output.join("infolog.json"),
        serde_json::to_string_pretty(&info)?,
    )?;
    println!(
        "{}: variant of {} with {} donor(s){}",
        output.display(),
        decoded.seed,
        decoded.donors.len(),
        if decoded.link { ", linked" } else { "" }
    );
    println!(
        "reduce: cargo xtask fuzz --reduce {} --interesting rglsl-fails",
        output.join("variant_000.json").display()
    );
    Ok(())
}
