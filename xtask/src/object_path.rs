use std::collections::BTreeSet;
use std::path::Path;
use std::time::Duration;

use anyhow::Result;
use spirv::Op;

use crate::corpus::Case;
use crate::exec::module::{self, Module};
use crate::interface;
use crate::process::{self, Exit};
use crate::runner::Environment;
use crate::worker::{EXIT_ACCEPTED, EXIT_BACKEND_FAILED, EXIT_REJECTED};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Outcome {
    pub passed: bool,
    pub note: String,
}

impl Outcome {
    fn fail(note: impl Into<String>) -> Self {
        Self {
            passed: false,
            note: note.into(),
        }
    }
}

pub fn check(
    env: &Environment,
    self_exe: &Path,
    case: &Case,
    direct: &Path,
    timeout: Duration,
) -> Result<Outcome> {
    let out = direct.with_extension("object.spv");
    let mut command = crate::runner::ours_command(env, self_exe, case, &case.path, &out);
    command.arg("--via-object");
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
        Exit::Code(EXIT_BACKEND_FAILED) => {
            return Ok(Outcome::fail(format!("backend failed: {first}")));
        }
        Exit::Code(code) => {
            return Ok(Outcome::fail(format!(
                "crash (exit {code}): {}",
                output.stderr.lines().next().unwrap_or_default()
            )));
        }
        Exit::Signal => return Ok(Outcome::fail("crash (signal)")),
        Exit::Timeout => return Ok(Outcome::fail("timeout")),
    }
    if let Some(message) = crate::runner::validate(env, case, &out, timeout)? {
        return Ok(Outcome::fail(format!("spirv-val: {message}")));
    }
    let differences = compare(direct, &out);
    if differences.is_empty() {
        Ok(Outcome {
            passed: true,
            note: String::new(),
        })
    } else {
        Ok(Outcome::fail(format!(
            "differs from the direct path: {}",
            differences.join("; ")
        )))
    }
}

fn compare(direct: &Path, linked: &Path) -> Vec<String> {
    let read = |path: &Path| -> Result<Module, String> {
        let bytes = std::fs::read(path).map_err(|error| error.to_string())?;
        module::parse_bytes(&bytes)
    };
    let (direct, linked) = match (read(direct), read(linked)) {
        (Ok(direct), Ok(linked)) => (direct, linked),
        (Err(error), _) | (_, Err(error)) => return vec![format!("cannot parse: {error}")],
    };
    let mut differences = Vec::new();
    for (what, op) in [
        ("capabilities", Op::Capability),
        ("extensions", Op::Extension),
        ("instruction sets", Op::ExtInstImport),
    ] {
        let direct_set = operands(&direct, op);
        let linked_set = operands(&linked, op);
        if direct_set != linked_set {
            differences.push(format!(
                "{what}: direct only {:?}, linked only {:?}",
                direct_set.difference(&linked_set).collect::<Vec<_>>(),
                linked_set.difference(&direct_set).collect::<Vec<_>>()
            ));
        }
    }
    match (interface::reflect(&direct), interface::reflect(&linked)) {
        (Ok(direct), Ok(linked)) => {
            differences.extend(interface::compare(&direct, &linked).iter().map(|mismatch| {
                mismatch
                    .to_string()
                    .replacen("glslang `", "direct `", 1)
                    .replacen("ours `", "linked `", 1)
            }));
        }
        (Err(error), _) | (_, Err(error)) => differences.push(format!("cannot reflect: {error}")),
    }
    differences
}

fn operands(module: &Module, op: Op) -> BTreeSet<String> {
    module
        .globals
        .iter()
        .filter(|instruction| instruction.is(op))
        .map(|instruction| {
            if op == Op::Capability {
                return instruction.word(0).map_or_else(String::new, |word| {
                    spirv::Capability::from_u32(word)
                        .map_or_else(|| word.to_string(), |capability| format!("{capability:?}"))
                });
            }
            let start = usize::from(op == Op::ExtInstImport);
            module::literal_string(instruction.rest(start))
                .map_or_else(|| format!("{:?}", instruction.operands), |(text, _)| text)
        })
        .collect()
}
