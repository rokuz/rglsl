use std::fmt::Write as _;
use std::fs;
use std::path::Path;
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Mutex;

use anyhow::{anyhow, Result};
use rglsl_cli::disassemble::{disassemble, disassemble_bytes};

use super::{spirv_words, Case, Environment, Run};
use crate::corpus::{self, Corpus};
use crate::process::{self, Exit};

const MODULE_START: &str = "// Module Version";
const OPERAND_COUNT_ERROR: &str = " ERROR, incorrect number of operands consumed.";
const DISASSEMBLY_FAILED: &str = "Disassembly failed: ";

pub(super) fn prints_disassembly(case: &Case) -> bool {
    case.args
        .iter()
        .any(|&arg| arg == "-H" || arg == "--spirv-dis")
}

fn uses_spirv_tools_disassembler(args: &[&str]) -> bool {
    args.contains(&"--spirv-dis")
}

pub(super) fn check_case(
    env: &Environment,
    case: &Case,
    glslang: &Run,
    problems: &mut Vec<String>,
) -> Result<()> {
    let directory = env.work.join(case.name).join("glslang");
    let mut expected = Vec::new();
    if !uses_spirv_tools_disassembler(&case.args) {
        for name in &glslang.files {
            if let Some(words) = spirv_words(&directory.join(name)) {
                expected.push(disassemble(&words));
            }
        }
    }
    if let Some(problem) = compare(&glslang.raw_stdout, &expected) {
        problems.push(format!("disassembly: {problem}"));
    }
    Ok(())
}

fn module_starts(stdout: &str) -> Vec<usize> {
    stdout
        .match_indices(MODULE_START)
        .map(|(position, _)| position)
        .filter(|&position| position == 0 || stdout[..position].ends_with('\n'))
        .collect()
}

fn first_line_difference(reference: &str, ours: &str) -> String {
    let mut ours_lines = ours.lines();
    for (number, line) in reference.lines().enumerate() {
        match ours_lines.next() {
            Some(our_line) if our_line == line => {}
            Some(our_line) => {
                return format!("line {}: glslang `{line}`, rglsl `{our_line}`", number + 1)
            }
            None => return format!("line {}: rglsl ends before glslang's `{line}`", number + 1),
        }
    }
    String::from("glslang's output ends early")
}

fn compare(stdout: &str, expected: &[String]) -> Option<String> {
    let starts = module_starts(stdout);
    if starts.len() != expected.len() {
        return Some(format!(
            "glslang printed {} disassemblies for {} modules",
            starts.len(),
            expected.len()
        ));
    }
    let mut unmatched: Vec<&String> = expected.iter().collect();
    for start in starts {
        let rest = stdout.get(start..).unwrap_or_default();
        match unmatched
            .iter()
            .position(|text| rest.starts_with(text.as_str()))
        {
            Some(index) => {
                unmatched.remove(index);
            }
            None => {
                let candidate = unmatched.first().map_or("", |text| text.as_str());
                return Some(first_line_difference(rest, candidate));
            }
        }
    }
    None
}

#[derive(Default)]
struct Tally {
    identical: usize,
    glslang_rejected: usize,
    round_trips: usize,
    rglsl_rejected: usize,
    failures: Vec<(String, String)>,
}

fn command(tool: &Path, case: &corpus::Case, test_dir: &Path, module: &Path) -> Command {
    let mut command = Command::new(tool);
    command
        .current_dir(test_dir)
        .args(case.target.glslang_args())
        .arg("-H")
        .arg("-o")
        .arg(module);
    let runtests = corpus::runtests_options(&case.name);
    for directory in runtests.include_dirs {
        command.arg(format!("-I{directory}"));
    }
    for line in runtests.preamble {
        command.args(["--preamble-text", line]);
    }
    if runtests.hlsl_offsets {
        command.arg("--hlsl-offsets");
    }
    command.arg(&case.name);
    command
}

enum Outcome {
    GlslangRejected,
    Compared {
        mismatch: Option<String>,
        rglsl: Option<Result<(), String>>,
    },
}

fn sweep_one(env: &Environment, case: &corpus::Case, work: &Path) -> Result<Outcome> {
    let directory = work.join(&case.name);
    fs::create_dir_all(&directory)?;
    let reference = directory.join("glslang.spv");
    let ours = directory.join("rglsl.spv");
    for module in [&reference, &ours] {
        if module.exists() {
            fs::remove_file(module)?;
        }
    }
    let output = process::run(
        command(&env.glslang.path, case, &env.test_dir, &reference),
        env.timeout,
    )?;
    let Some(words) = spirv_words(&reference).filter(|_| matches!(output.exit, Exit::Code(0)))
    else {
        return Ok(Outcome::GlslangRejected);
    };
    let mismatch = compare(&output.stdout, &[disassemble(&words)]);
    let output = process::run(command(&env.rglsl, case, &env.test_dir, &ours), env.timeout)?;
    let rglsl = match (output.exit, spirv_words(&ours)) {
        (Exit::Code(0), Some(words)) => Some(round_trip(&words, &output.stdout)),
        (Exit::Code(0), None) => Some(Err(String::from("rglsl wrote no SPIR-V module"))),
        _ => None,
    };
    Ok(Outcome::Compared { mismatch, rglsl })
}

fn round_trip(words: &[u32], stdout: &str) -> Result<(), String> {
    let disassembly = disassemble_bytes(words);
    let text = String::from_utf8_lossy(&disassembly.text);
    if disassembly.failed {
        let reason = text
            .lines()
            .find_map(|line| line.strip_prefix(DISASSEMBLY_FAILED))
            .unwrap_or("unknown");
        return Err(format!("rglsl's module does not disassemble: {reason}"));
    }
    if let Some(line) = text.lines().find(|line| line.contains(OPERAND_COUNT_ERROR)) {
        return Err(format!("rglsl's module: `{}`", line.trim()));
    }
    if !stdout.contains(text.as_ref()) {
        return Err(String::from(
            "rglsl -H does not print the disassembly of the module it writes",
        ));
    }
    Ok(())
}

pub(super) fn sweep(env: &Environment, filter: Option<&str>, report: &mut String) -> Result<usize> {
    let glslang_dir = env
        .test_dir
        .parent()
        .ok_or_else(|| anyhow!("{} has no parent", env.test_dir.display()))?;
    let mut cases = corpus::load(glslang_dir)?;
    cases.retain(|case| {
        Corpus::ALL.contains(&case.corpus) && filter.is_none_or(|filter| case.name.contains(filter))
    });
    if cases.is_empty() {
        return Ok(0);
    }
    let work = env.work.join("disassembly");
    let next = AtomicUsize::new(0);
    let tally = Mutex::new(Tally::default());
    let errors = Mutex::new(Vec::new());
    let jobs = std::thread::available_parallelism().map_or(4, |count| count.get());
    std::thread::scope(|scope| {
        for _ in 0..jobs {
            scope.spawn(|| loop {
                let index = next.fetch_add(1, Ordering::Relaxed);
                let Some(case) = cases.get(index) else {
                    break;
                };
                let outcome = sweep_one(env, case, &work);
                let Ok(mut tally) = tally.lock() else {
                    break;
                };
                match outcome {
                    Ok(Outcome::GlslangRejected) => tally.glslang_rejected += 1,
                    Ok(Outcome::Compared { mismatch, rglsl }) => {
                        match mismatch {
                            Some(problem) => tally.failures.push((case.name.clone(), problem)),
                            None => tally.identical += 1,
                        }
                        match rglsl {
                            Some(Ok(())) => tally.round_trips += 1,
                            Some(Err(problem)) => {
                                tally.failures.push((case.name.clone(), problem));
                            }
                            None => tally.rglsl_rejected += 1,
                        }
                    }
                    Err(error) => {
                        if let Ok(mut errors) = errors.lock() {
                            errors.push(format!("{}: {error:#}", case.name));
                        }
                    }
                }
            });
        }
    });
    let errors = errors
        .into_inner()
        .map_err(|_| anyhow!("a disassembly sweep worker panicked"))?;
    if let Some(error) = errors.first() {
        return Err(anyhow!("disassembly sweep: {error}"));
    }
    let mut tally = tally
        .into_inner()
        .map_err(|_| anyhow!("a disassembly sweep worker panicked"))?;
    tally.failures.sort();
    for (name, problem) in &tally.failures {
        println!("{:8} {:36} {problem}", "FAIL", format!("dis:{name}"));
        let _ = writeln!(report, "dis:{name}\tFAIL\t-H\t{problem}");
    }
    println!(
        "\ndisassembly sweep over {} shaders: {} identical to glslang's -H, {} rejected by glslang; \
         {} rglsl modules round-trip, {} not compiled by rglsl; {} failed",
        cases.len(),
        tally.identical,
        tally.glslang_rejected,
        tally.round_trips,
        tally.rglsl_rejected,
        tally.failures.len()
    );
    let _ = writeln!(
        report,
        "dis:*\tsweep\t-H\t{} identical, {} glslang rejects, {} rglsl round-trips, {} rglsl rejects, {} failed",
        tally.identical,
        tally.glslang_rejected,
        tally.round_trips,
        tally.rglsl_rejected,
        tally.failures.len()
    );
    Ok(tally.failures.len())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn compares_every_printed_module() {
        let first = String::from("// Module Version 10000\n  Capability Shader\n");
        let second = String::from("// Module Version 10300\n  Capability Shader\n");
        let stdout = format!("a.vert\n{first}b.frag\n{second}");
        assert_eq!(compare(&stdout, &[second.clone(), first.clone()]), None);
        assert!(compare(&stdout, std::slice::from_ref(&first)).is_some());
        assert!(compare("a.vert\n", &[]).is_none());
        let changed = stdout.replace("10300", "10400");
        let problem = compare(&changed, &[first, second]).unwrap_or_default();
        assert!(problem.starts_with("line 1: glslang `// Module Version 10400`"));
    }
}
