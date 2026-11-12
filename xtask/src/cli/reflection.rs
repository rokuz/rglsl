use std::fmt::Write as _;
use std::fs;
use std::path::Path;
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Mutex;

use anyhow::Result;

use super::{exit_code, Case, Environment};
use crate::corpus::{self, Corpus};
use crate::process;

pub const OWN_DIR: &str = "tests/cli";

const ALL_OPTIONS: [&str; 9] = [
    "--reflect-strict-array-suffix",
    "--reflect-basic-array-suffix",
    "--reflect-intermediate-io",
    "--reflect-separate-buffers",
    "--reflect-all-block-variables",
    "--reflect-unwrap-io-blocks",
    "--reflect-all-io-variables",
    "--reflect-shared-std140-ubo",
    "--reflect-shared-std140-ssbo",
];

const SWEEP_EXPECTED: &[(&str, bool, &str)] = &[(
    "spv.GeometryShaderPassthrough.geom",
    true,
    "a `passthrough` redeclaration of gl_PerVertex is not a declaration in rglsl's analysis, so --reflect-all-io-variables does not see it",
)];

const BLOCKS: &str = "reflection/blocks.frag";
const LEGACY: &str = "reflection/legacy.frag";
const STRESS: &str = "reflection/stress.vert";
const LINK_VERT: &str = "reflection/link.vert";
const LINK_FRAG: &str = "reflection/link.frag";
const MAIN_COMP: &str = "reflection/main.comp";
const HELPER_COMP: &str = "reflection/helper.comp";
const UNBOUND: &str = "reflection/unbound.frag";
const ERROR: &str = "reflection/error.frag";
const GLOBALS: &str = "reflection/globals.comp";

pub fn glslang_cases() -> Vec<Case> {
    vec![
        Case::new(
            "reflection",
            &["-l", "-q", super::TARGET_SHADER],
            &[super::TARGET_SHADER],
        )
        .exits(
            0,
            "Vulkan rules always: glslang links the Vulkan shader with OpenGL rules and rejects it",
        ),
        Case::new(
            "reflection-V",
            &["-V", "-q", super::TARGET_SHADER],
            &[super::TARGET_SHADER],
        ),
    ]
}

fn with_options(base: &[&'static str], files: &[&'static str]) -> Vec<&'static str> {
    let mut args = base.to_vec();
    args.extend(ALL_OPTIONS);
    args.extend(files);
    args
}

fn own(name: &'static str, args: &[&'static str]) -> Case {
    Case::new(name, args, &[]).dir("reflection")
}

pub fn own_cases() -> Vec<Case> {
    let mut cases = vec![
        own("reflect-V", &["-V", "-q", BLOCKS]),
        own("reflect-V-options", &with_options(&["-V", "-q"], &[BLOCKS])),
        own("reflect-stress", &["-V", "-q", STRESS]),
        own(
            "reflect-stress-options",
            &with_options(&["-V", "-q"], &[STRESS]),
        ),
        own("reflect-l", &["-l", "-q", LEGACY]),
        own("reflect-l-options", &with_options(&["-l", "-q"], &[LEGACY])),
        own("reflect-link", &["-V", "-q", LINK_VERT, LINK_FRAG]),
        own("reflect-link-l", &["-l", "-q", LINK_VERT, LINK_FRAG]),
        own(
            "reflect-link-io",
            &[
                "-V",
                "-q",
                "--reflect-intermediate-io",
                "--reflect-all-io-variables",
                LINK_VERT,
                LINK_FRAG,
            ],
        ),
        own(
            "reflect-link-options",
            &with_options(&["-V", "-q"], &[LINK_VERT, LINK_FRAG]),
        ),
        own(
            "reflect-link-l-options",
            &with_options(&["-l", "-q"], &[LINK_VERT, LINK_FRAG]),
        ),
        own("reflect-units", &["-V", "-q", MAIN_COMP, HELPER_COMP]),
        own(
            "reflect-units-ku",
            &["-V", "-q", "--ku", MAIN_COMP, HELPER_COMP],
        ),
        own("reflect-units-l", &["-l", "-q", MAIN_COMP, HELPER_COMP]),
        own("reflect-missing-body", &["-V", "-q", MAIN_COMP]),
        own("reflect-globals", &["-V", "-q", GLOBALS]),
        own("reflect-amb", &["-V", "-q", "--amb", UNBOUND]),
        own(
            "reflect-amb-shift",
            &[
                "-V", "-q", "--amb", "--sub", "10", "--sbb", "20", "--stb", "5", UNBOUND,
            ],
        ),
        own(
            "reflect-shift",
            &["-V", "-q", "--sub", "10", "--sbb", "20", BLOCKS],
        ),
        own("reflect-H", &["-H", "-q", BLOCKS]),
        own("reflect-compile-error", &["-V", "-q", ERROR]),
        own(
            "reflect-compile-error-link",
            &["-V", "-q", LINK_VERT, ERROR],
        ),
        own("reflect-requires-link", &["-q", BLOCKS]),
        own("reflect-E", &["-E", "-q", BLOCKS]),
    ];
    for option in ALL_OPTIONS {
        cases.push(own(
            option.trim_start_matches("--"),
            &["-V", "-q", option, STRESS],
        ));
    }
    cases
}

pub fn text(stdout: &str) -> Option<String> {
    let start = stdout.find("Uniform reflection:\n")?;
    let mut lines = stdout.get(start..)?.split_inclusive('\n').peekable();
    let mut text = String::new();
    let mut sections = 0;
    while sections < 6 {
        let line = lines.next()?;
        text.push_str(line);
        if line == "\n" {
            sections += 1;
        }
    }
    while lines.peek().is_some_and(|line| {
        line.starts_with("Local size ") || line.starts_with("Tile shading rate QCOM ")
    }) {
        for line in lines.by_ref() {
            text.push_str(line);
            if line == "\n" {
                break;
            }
        }
    }
    Some(text)
}

pub fn compare(glslang: &str, ours: &str) -> Option<String> {
    let reference = text(glslang);
    let mine = text(ours);
    if reference == mine {
        return None;
    }
    let reference_lines: Vec<String> = reference
        .unwrap_or_default()
        .lines()
        .map(str::to_owned)
        .collect();
    let mine_lines: Vec<String> = mine
        .unwrap_or_default()
        .lines()
        .map(str::to_owned)
        .collect();
    Some(format!(
        "reflection: {}",
        super::first_difference(&reference_lines, &mine_lines)
    ))
}

#[derive(Debug, Default)]
pub struct Sweep {
    pub passed: usize,
    pub expected: usize,
    pub failed: usize,
    pub skipped: usize,
    pub report: String,
}

enum Outcome {
    Same,
    Expected(&'static str),
    Skipped(String),
    Different(String),
}

fn sweep_one(
    env: &Environment,
    case: &corpus::Case,
    options: bool,
    work: &Path,
) -> Result<Outcome> {
    let runtests = corpus::runtests_options(&case.name);
    let mut args = case.target.glslang_args();
    args.push(String::from("-q"));
    if options {
        args.extend(ALL_OPTIONS.iter().map(|&option| String::from(option)));
    }
    for directory in runtests.include_dirs {
        args.push(format!("-I{}", env.test_dir.join(directory).display()));
    }
    for line in runtests.preamble {
        args.push(String::from("--preamble-text"));
        args.push((*line).to_owned());
    }
    if runtests.hlsl_offsets {
        args.push(String::from("--hlsl-offsets"));
    }
    args.push(case.path.to_string_lossy().into_owned());
    let mut outputs = Vec::new();
    for (tool, side) in [(&env.glslang.path, "glslang"), (&env.rglsl, "rglsl")] {
        let directory = work.join(side);
        if directory.exists() {
            fs::remove_dir_all(&directory)?;
        }
        fs::create_dir_all(&directory)?;
        let mut command = Command::new(tool);
        command.current_dir(&directory).args(&args);
        outputs.push(process::run(command, env.timeout)?);
    }
    let (Some(glslang), Some(ours)) = (outputs.first(), outputs.get(1)) else {
        return Ok(Outcome::Skipped(String::from("no output")));
    };
    let (Some(reference_code), Some(our_code)) = (exit_code(&glslang.exit), exit_code(&ours.exit))
    else {
        return Ok(Outcome::Different(format!(
            "abnormal exit: glslang {:?}, rglsl {:?}",
            glslang.exit, ours.exit
        )));
    };
    if reference_code != 0 {
        return Ok(Outcome::Skipped(format!("glslang exits {reference_code}")));
    }
    if our_code != 0 {
        return Ok(Outcome::Skipped(format!(
            "rglsl exits {our_code} (a compile difference, see the corpus run)"
        )));
    }
    match compare(&glslang.stdout, &ours.stdout) {
        None => Ok(Outcome::Same),
        Some(problem) => Ok(SWEEP_EXPECTED
            .iter()
            .find(|&&(name, all, _)| name == case.name && all == options)
            .map_or(Outcome::Different(problem), |&(_, _, why)| {
                Outcome::Expected(why)
            })),
    }
}

pub fn sweep(env: &Environment, glslang_dir: &Path, filter: Option<&str>) -> Result<Sweep> {
    let cases: Vec<corpus::Case> = corpus::load(glslang_dir)?
        .into_iter()
        .filter(|case| {
            case.corpus == Corpus::Vulkan
                && case.kind.is_file()
                && !case.target.ast_only
                && !case.target.compile_only
        })
        .collect();
    let mut jobs = Vec::new();
    for options in [false, true] {
        let label = if options { "sweep-options" } else { "sweep" };
        for case in &cases {
            let name = format!("{label}:{}", case.name);
            if filter.is_none_or(|filter| name.contains(filter)) {
                jobs.push((name, case, options));
            }
        }
    }
    let next = AtomicUsize::new(0);
    let results = Mutex::new(Vec::new());
    let workers = std::thread::available_parallelism().map_or(4, std::num::NonZero::get);
    std::thread::scope(|scope| {
        for _ in 0..workers {
            scope.spawn(|| loop {
                let index = next.fetch_add(1, Ordering::Relaxed);
                let Some((name, case, options)) = jobs.get(index) else {
                    break;
                };
                let work = env.work.join("reflection").join(name.replace(':', "-"));
                let outcome = sweep_one(env, case, *options, &work)
                    .unwrap_or_else(|error| Outcome::Different(format!("{error:#}")));
                if let Ok(mut results) = results.lock() {
                    results.push((index, outcome));
                }
            });
        }
    });
    let mut results = results.into_inner().unwrap_or_default();
    results.sort_by_key(|&(index, _)| index);
    let mut sweep = Sweep::default();
    for (index, outcome) in results {
        let Some((name, case, options)) = jobs.get(index) else {
            continue;
        };
        let command = format!(
            "{} -q{} {}",
            case.target.glslang_args().join(" "),
            if *options {
                " <all --reflect-* options>"
            } else {
                ""
            },
            case.name
        );
        let (label, note) = match outcome {
            Outcome::Same => {
                sweep.passed += 1;
                continue;
            }
            Outcome::Skipped(why) => {
                sweep.skipped += 1;
                ("skipped", why)
            }
            Outcome::Expected(why) => {
                sweep.expected += 1;
                ("expected", String::from(why))
            }
            Outcome::Different(problem) => {
                sweep.failed += 1;
                ("FAIL", problem)
            }
        };
        if label != "skipped" {
            println!("{label:8} {name:36} {note}");
        }
        let _ = writeln!(sweep.report, "{name}\t{label}\t{command}\t{note}");
    }
    println!(
        "reflection sweep: {} same, {} with deliberate differences, {} failed, {} not compared",
        sweep.passed, sweep.expected, sweep.failed, sweep.skipped
    );
    Ok(sweep)
}
