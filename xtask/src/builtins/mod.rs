mod expected;
mod generate;
mod glslang;
mod summary;

use std::collections::{BTreeMap, BTreeSet};
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::{Arc, Mutex, PoisonError};
use std::time::{Duration, Instant};

use anyhow::{Context, Result, bail};
use rglsl_sema::{Builtins, ResourceLimits};
use rglsl_types::ShaderStage as Stage;

use crate::oracles;
use crate::process::{self, Exit};
use crate::worker::{EXIT_ACCEPTED, EXIT_BACKEND_FAILED, EXIT_REJECTED};
use expected::Expectations;
use generate::{Case, Source, Subject, stage_extension};
use summary::Summary;

pub const VERSIONS: [u32; 2] = [450, 460];
const HOME: Stage = Stage::Fragment;

#[derive(Debug)]
pub struct Options {
    pub filter: Option<String>,
    pub versions: Vec<u32>,
    pub stages: Option<Vec<String>>,
    pub all_overloads: bool,
    pub jobs: Option<usize>,
    pub timeout_secs: u64,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum Verdict {
    Match,
    BothReject,
    GlslangCrash,
    RglslCrash,
    GlslangOnly,
    GlslangOnlyInvalid,
    RglslOnly,
    RglslOnlyInvalid,
    RglslBackendFailed,
    RglslInvalid,
    GlslangInvalid,
    BothInvalid,
    ExtensionsDiffer,
    CapabilitiesDiffer,
    OperationsDiffer,
    Generator,
}

impl Verdict {
    pub const ALL: [Self; 16] = [
        Self::Match,
        Self::BothReject,
        Self::GlslangCrash,
        Self::RglslCrash,
        Self::GlslangOnly,
        Self::GlslangOnlyInvalid,
        Self::RglslOnly,
        Self::RglslOnlyInvalid,
        Self::RglslBackendFailed,
        Self::RglslInvalid,
        Self::GlslangInvalid,
        Self::BothInvalid,
        Self::ExtensionsDiffer,
        Self::CapabilitiesDiffer,
        Self::OperationsDiffer,
        Self::Generator,
    ];

    pub const fn label(self) -> &'static str {
        match self {
            Self::Match => "match",
            Self::BothReject => "both-reject",
            Self::GlslangCrash => "glslang-crash",
            Self::RglslCrash => "rglsl-crash",
            Self::GlslangOnly => "only-glslang-accepts",
            Self::RglslOnly => "only-rglsl-accepts",
            Self::GlslangOnlyInvalid => "only-glslang-accepts-invalid",
            Self::RglslOnlyInvalid => "only-rglsl-accepts-invalid",
            Self::RglslBackendFailed => "rglsl-backend-failed",
            Self::RglslInvalid => "rglsl-invalid",
            Self::GlslangInvalid => "glslang-invalid",
            Self::BothInvalid => "both-invalid",
            Self::ExtensionsDiffer => "extensions-differ",
            Self::CapabilitiesDiffer => "capabilities-differ",
            Self::OperationsDiffer => "operations-differ",
            Self::Generator => "generator-failed",
        }
    }

    pub fn parse(text: &str) -> Option<Self> {
        Self::ALL
            .into_iter()
            .find(|verdict| verdict.label() == text)
    }

    pub const fn is_agreement(self) -> bool {
        matches!(self, Self::Match | Self::BothReject)
    }

    pub const fn is_informational(self) -> bool {
        matches!(
            self,
            Self::GlslangCrash
                | Self::GlslangInvalid
                | Self::GlslangOnlyInvalid
                | Self::BothInvalid
                | Self::OperationsDiffer
        )
    }

    pub const fn is_divergence(self) -> bool {
        !self.is_agreement() && !self.is_informational()
    }
}

#[derive(Debug)]
struct Outcome {
    case: usize,
    verdict: Verdict,
    extensions: Vec<String>,
    constants: &'static str,
    learned: Vec<String>,
    glslang: String,
    rglsl: String,
    detail: String,
    shader: Option<PathBuf>,
    expected: Option<String>,
}

struct Tools {
    glslang: PathBuf,
    spirv_val: PathBuf,
    xtask: PathBuf,
    timeout: Duration,
}

const fn spirv_version(version: u32) -> (u8, u8) {
    if version >= 460 { (1, 6) } else { (1, 3) }
}

const fn target_env(version: u32) -> &'static str {
    if version >= 460 {
        "vulkan1.3"
    } else {
        "vulkan1.1"
    }
}

fn validator_env(version: u32, module: (u8, u8)) -> &'static str {
    match target_env(version) {
        "vulkan1.1" if module >= (1, 4) => "vulkan1.1spv1.4",
        other => other,
    }
}

fn available(version: u32, stage: Stage) -> bool {
    version >= 460 || !(stage.ray_tracing() || matches!(stage, Stage::Mesh | Stage::Task))
}

fn parse_stage(name: &str) -> Result<Stage> {
    Stage::from_extension(name).with_context(|| format!("unknown stage `{name}`"))
}

pub fn run(root: &Path, options: &Options) -> Result<i32> {
    let started = Instant::now();
    let tools = Tools {
        glslang: oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?.path,
        spirv_val: oracles::find_tool(root, "spirv-val", "RGLSL_SPIRV_VAL")?.path,
        xtask: std::env::current_exe().context("locating the xtask binary")?,
        timeout: Duration::from_secs(options.timeout_secs),
    };
    let expectations = Expectations::load(&root.join("xtask").join("builtins-expected.toml"))?;
    let stages: Vec<Stage> = match &options.stages {
        Some(names) => names
            .iter()
            .map(|name| parse_stage(name))
            .collect::<Result<_>>()?,
        None => Stage::ALL.to_vec(),
    };
    let filters: Vec<&str> = options
        .filter
        .as_deref()
        .map(|filter| filter.split(',').filter(|part| !part.is_empty()).collect())
        .unwrap_or_default();
    let work = root.join("target").join("xtask").join("builtins");
    let _ = fs::remove_dir_all(&work);
    fs::create_dir_all(&work)?;
    let mut tables: BTreeMap<(u32, Stage), Arc<Builtins>> = BTreeMap::new();
    let mut cases = Vec::new();
    let mut coverage = Vec::new();
    let reduce = !options.all_overloads && stages.contains(&HOME);
    for &version in &options.versions {
        let home = Builtins::new(version, HOME, &ResourceLimits::default());
        let home_signatures: BTreeSet<String> = generate::cases(version, HOME, &home)
            .into_iter()
            .map(|case| case.signature)
            .collect();
        for &stage in &stages {
            if !available(version, stage) {
                continue;
            }
            let builtins = Arc::new(Builtins::new(version, stage, &ResourceLimits::default()));
            let dump = glslang::dump(
                &tools.glslang,
                &work.join("dumps"),
                version,
                stage,
                target_env(version),
                tools.timeout,
            )?;
            let table = glslang::parse(&dump, builtins.types());
            let mut ours = generate::cases(version, stage, &builtins);
            let merged = merge(version, stage, &builtins, &mut ours, &table, &mut coverage);
            let mut names = BTreeSet::new();
            cases.extend(
                ours.into_iter()
                    .chain(merged)
                    .filter(|case| {
                        filters.is_empty() || filters.iter().any(|part| case.name.contains(part))
                    })
                    .filter(|case| {
                        let first = names.insert(case.name.clone());
                        !reduce
                            || stage == HOME
                            || first
                            || (case.source != Source::Glslang
                                && !home_signatures.contains(&case.signature))
                    }),
            );
            tables.insert((version, stage), builtins);
        }
    }
    coverage.retain(|row: &Coverage| {
        filters.is_empty() || filters.iter().any(|part| row.name.contains(part))
    });
    if cases.is_empty() {
        bail!("no built-ins match the filter");
    }
    eprintln!(
        "[xtask] {} built-in cases ({} stages, versions {:?})",
        cases.len(),
        stages.len(),
        options.versions
    );

    let jobs = options
        .jobs
        .unwrap_or_else(|| std::thread::available_parallelism().map_or(4, |n| n.get()))
        .max(1);
    let next = AtomicUsize::new(0);
    let done = AtomicUsize::new(0);
    let outcomes: Mutex<Vec<Outcome>> = Mutex::new(Vec::with_capacity(cases.len()));
    let errors: Mutex<Vec<anyhow::Error>> = Mutex::new(Vec::new());
    std::thread::scope(|scope| {
        for _ in 0..jobs {
            scope.spawn(|| {
                loop {
                    let index = next.fetch_add(1, Ordering::Relaxed);
                    let Some(case) = cases.get(index) else {
                        break;
                    };
                    let Some(builtins) = tables.get(&(case.version, case.stage)) else {
                        break;
                    };
                    match check(&tools, builtins, case, index, &work) {
                        Ok(outcome) => outcomes
                            .lock()
                            .unwrap_or_else(PoisonError::into_inner)
                            .push(outcome),
                        Err(error) => errors
                            .lock()
                            .unwrap_or_else(PoisonError::into_inner)
                            .push(error.context(case.signature.clone())),
                    }
                    let finished = done.fetch_add(1, Ordering::Relaxed) + 1;
                    if finished.is_multiple_of(2000) {
                        eprintln!("[xtask] {finished}/{}", cases.len());
                    }
                }
            });
        }
    });
    if let Some(error) = errors
        .into_inner()
        .unwrap_or_else(PoisonError::into_inner)
        .into_iter()
        .next()
    {
        return Err(error);
    }
    let mut outcomes = outcomes
        .into_inner()
        .unwrap_or_else(PoisonError::into_inner);
    outcomes.sort_by_key(|outcome| outcome.case);

    let mut used = vec![false; expectations.len()];
    for outcome in &mut outcomes {
        if outcome.verdict.is_agreement() {
            continue;
        }
        let Some(case) = cases.get(outcome.case) else {
            continue;
        };
        if let Some((index, reason)) = expectations.find(case, outcome.verdict) {
            outcome.expected = Some(reason.to_string());
            if let Some(slot) = used.get_mut(index) {
                *slot = true;
            }
        }
    }
    let stale: Vec<String> =
        if filters.is_empty() && options.stages.is_none() && options.versions == VERSIONS {
            used.iter()
                .enumerate()
                .filter(|(_, used)| !**used)
                .filter_map(|(index, _)| expectations.describe(index))
                .collect()
        } else {
            Vec::new()
        };

    let report = root.join("target").join("xtask").join("builtins.tsv");
    fs::write(&report, table(&cases, &outcomes))?;
    let coverage_report = root
        .join("target")
        .join("xtask")
        .join("builtins-coverage.tsv");
    fs::write(&coverage_report, coverage_table(&coverage))?;
    print_coverage(&coverage);
    eprintln!(
        "[xtask] declared by one side only: {}",
        coverage_report.display()
    );
    let unexpected = print_summary(&cases, &outcomes, &stale, started.elapsed());
    eprintln!("[xtask] per-case results: {}", report.display());
    Ok(i32::from(unexpected > 0 || !stale.is_empty()))
}

#[derive(Debug)]
struct Coverage {
    version: u32,
    stage: Stage,
    kind: &'static str,
    source: Source,
    name: String,
    text: String,
    generated: bool,
}

fn merge(
    version: u32,
    stage: Stage,
    builtins: &Builtins,
    ours: &mut [Case],
    table: &glslang::Table,
    coverage: &mut Vec<Coverage>,
) -> Vec<Case> {
    let mut known = BTreeSet::new();
    let unparsed: BTreeSet<&str> = table
        .prototypes
        .values()
        .filter(|prototype| prototype.function.is_none())
        .map(|prototype| prototype.name.as_str())
        .collect();
    let our_names: BTreeSet<String> = ours.iter().map(|case| case.name.clone()).collect();
    for case in ours.iter_mut() {
        let Some(key) = case.key.clone() else {
            case.source = Source::Both;
            continue;
        };
        let theirs = match case.subject {
            Subject::Function(_) => table.prototypes.contains_key(&key),
            _ => table.variables.contains_key(&key),
        };
        let ambiguous =
            matches!(case.subject, Subject::Function(_)) && unparsed.contains(case.name.as_str());
        if theirs || ambiguous {
            case.source = Source::Both;
        } else {
            coverage.push(Coverage {
                version,
                stage,
                kind: case.kind(),
                source: Source::Rglsl,
                name: case.name.clone(),
                text: case.signature.clone(),
                generated: true,
            });
        }
        known.insert(key);
    }
    let mut merged = Vec::new();
    for (key, prototype) in &table.prototypes {
        if known.contains(key) {
            continue;
        }
        let generated = prototype.function.is_some();
        if !generated && our_names.contains(&prototype.name) {
            continue;
        }
        coverage.push(Coverage {
            version,
            stage,
            kind: "function",
            source: Source::Glslang,
            name: prototype.name.clone(),
            text: prototype.text.clone(),
            generated,
        });
        if let Some(function) = &prototype.function {
            merged.push(Case {
                version,
                stage,
                subject: Subject::Function(Arc::new(function.clone())),
                name: prototype.name.clone(),
                signature: generate::signature(function, builtins.types()),
                key: Some(key.clone()),
                source: Source::Glslang,
                seed: generate::preferred(
                    &prototype.extensions.join(","),
                    prototype.name.ends_with("NV"),
                )
                .into_iter()
                .collect(),
            });
        }
    }
    for variable in table.variables.values() {
        let name = &variable.name;
        if known.contains(name) {
            continue;
        }
        coverage.push(Coverage {
            version,
            stage,
            kind: "variable",
            source: Source::Glslang,
            name: name.clone(),
            text: variable.text.clone(),
            generated: variable.ty.is_some(),
        });
        if let Some(ty) = &variable.ty {
            merged.push(Case {
                version,
                stage,
                subject: Subject::Foreign {
                    access: name.clone(),
                    ty: ty.clone(),
                    output: variable.output,
                },
                name: name.clone(),
                signature: format!("{} {name}", ty.display(builtins.types())),
                key: Some(name.clone()),
                source: Source::Glslang,
                seed: generate::preferred(&variable.extensions.join(","), name.ends_with("NV"))
                    .into_iter()
                    .collect(),
            });
        }
    }
    merged
}

fn coverage_table(coverage: &[Coverage]) -> String {
    let mut out = String::from("version\tstage\tkind\tdeclared-by\tname\tdeclaration\tgenerated\n");
    for row in coverage {
        let _ = writeln!(
            out,
            "{}\t{}\t{}\t{}\t{}\t{}\t{}",
            row.version,
            stage_extension(row.stage),
            row.kind,
            row.source.label(),
            clean(&row.name),
            clean(&row.text),
            if row.generated { "yes" } else { "no" },
        );
    }
    out
}

fn print_coverage(coverage: &[Coverage]) {
    for (source, generated, title) in [
        (Source::Glslang, true, "declared by glslang only"),
        (
            Source::Glslang,
            false,
            "declared by glslang only, with a type the sweep does not spell (not compiled)",
        ),
        (Source::Rglsl, true, "declared by rglsl only"),
    ] {
        for kind in ["function", "variable"] {
            let mut names: BTreeMap<&str, (usize, BTreeSet<String>)> = BTreeMap::new();
            for row in coverage.iter().filter(|row| {
                row.source == source && row.kind == kind && row.generated == generated
            }) {
                let entry = names.entry(row.name.as_str()).or_default();
                entry.0 += 1;
                entry
                    .1
                    .insert(format!("{}/{}", row.version, stage_extension(row.stage)));
            }
            if names.is_empty() {
                continue;
            }
            let total: usize = names.values().map(|(count, _)| count).sum();
            println!(
                "{title}, {kind}s ({} names, {total} declarations):",
                names.len()
            );
            let listed: Vec<String> = names
                .iter()
                .map(|(name, (count, _))| format!("{name} x{count}"))
                .collect();
            println!("  {}", listed.join(", "));
        }
    }
}

fn without_line(text: &str) -> String {
    let Some(start) = text.find("line ") else {
        return text.to_string();
    };
    let rest = text.get(start + 5..).unwrap_or_default();
    let digits = rest.len() - rest.trim_start_matches(|c: char| c.is_ascii_digit()).len();
    if digits == 0 {
        return text.to_string();
    }
    let after = rest.get(digits..).unwrap_or_default();
    let after = after.strip_prefix(": ").unwrap_or(after);
    format!("{}{after}", text.get(..start).unwrap_or_default())
}

fn rglsl_diagnostic(line: &str) -> String {
    let mut parts = line.splitn(3, ' ');
    match (parts.next(), parts.next(), parts.next()) {
        (Some(phase), Some(_), Some(message)) => format!("{phase}: {message}"),
        _ => line.to_string(),
    }
}

fn first_line(text: &str, prefix: &str) -> String {
    text.lines()
        .find(|line| line.starts_with(prefix))
        .or_else(|| text.lines().find(|line| !line.trim().is_empty()))
        .unwrap_or_default()
        .trim()
        .to_string()
}

enum Compiled {
    Accepted(PathBuf),
    Rejected(String),
    BackendFailed(String),
    Crashed(String),
}

fn run_glslang(
    tools: &Tools,
    version: u32,
    shader: &Path,
    spirv: &Path,
) -> Result<(Compiled, String)> {
    let mut command = Command::new(&tools.glslang);
    command
        .args(["--target-env", target_env(version), "-o"])
        .arg(spirv)
        .arg(shader);
    let output = process::run(command, tools.timeout)?;
    let text = format!("{}\n{}", output.stdout, output.stderr)
        .replace(&format!("{}:", shader.display()), "");
    let compiled = match output.exit {
        Exit::Code(0) => Compiled::Accepted(spirv.to_path_buf()),
        Exit::Code(code @ (1 | 2)) => {
            let line = first_line(&text, "ERROR");
            let line = line.strip_prefix("ERROR: ").unwrap_or(&line);
            let line = line
                .trim_start_matches(|c: char| c.is_ascii_digit())
                .trim_start_matches(':')
                .trim()
                .to_string();
            if line.is_empty() {
                Compiled::Rejected(format!("exit {code}"))
            } else {
                Compiled::Rejected(line)
            }
        }
        Exit::Code(code) => Compiled::Crashed(format!("exit {code}: {}", first_line(&text, ""))),
        Exit::Signal => Compiled::Crashed(format!("signal: {}", first_line(&text, ""))),
        Exit::Timeout => Compiled::Crashed(String::from("timeout")),
    };
    Ok((compiled, text))
}

fn glslang_extension(text: &str, vendor_nv: bool) -> Option<String> {
    let (_, after) = text.split_once("required extension not requested:")?;
    let names: Vec<&str> = after
        .lines()
        .take_while(|line| !line.starts_with("ERROR"))
        .flat_map(|line| {
            line.split(|character: char| !(character.is_ascii_alphanumeric() || character == '_'))
        })
        .filter(|word| word.starts_with("GL_"))
        .collect();
    generate::preferred(&names.join(","), vendor_nv)
}

fn wants_constant(text: &str) -> bool {
    text.lines()
        .filter(|line| line.starts_with("ERROR"))
        .any(|line| line.contains("constant"))
}

fn run_rglsl(
    tools: &Tools,
    version: u32,
    stage: &str,
    shader: &Path,
    spirv: &Path,
) -> Result<Compiled> {
    let (major, minor) = spirv_version(version);
    let mut command = Command::new(&tools.xtask);
    command
        .arg("compile-one")
        .args([
            "--stage",
            stage,
            "--spv",
            &format!("{major}.{minor}"),
            "--out",
        ])
        .arg(spirv)
        .arg(shader);
    let output = process::run(command, tools.timeout)?;
    let diagnostic = output
        .stdout
        .lines()
        .find_map(|line| line.strip_prefix("E "))
        .map(rglsl_diagnostic)
        .unwrap_or_default();
    Ok(match output.exit {
        Exit::Code(EXIT_ACCEPTED) => Compiled::Accepted(spirv.to_path_buf()),
        Exit::Code(EXIT_REJECTED) => Compiled::Rejected(diagnostic),
        Exit::Code(EXIT_BACKEND_FAILED) => Compiled::BackendFailed(diagnostic),
        Exit::Code(code) => {
            Compiled::Crashed(format!("exit {code}: {}", first_line(&output.stderr, "")))
        }
        Exit::Signal => Compiled::Crashed(format!("signal: {}", first_line(&output.stderr, ""))),
        Exit::Timeout => Compiled::Crashed(String::from("timeout")),
    })
}

fn validate(tools: &Tools, version: u32, spirv: &Path) -> Result<(Result<(), String>, Summary)> {
    let bytes = fs::read(spirv).with_context(|| format!("reading {}", spirv.display()))?;
    let summary = summary::summarize(&bytes)?;
    let mut command = Command::new(&tools.spirv_val);
    command
        .args(["--target-env", validator_env(version, summary.version)])
        .arg(spirv);
    let output = process::run(command, tools.timeout)?;
    let verdict = if matches!(output.exit, Exit::Code(0)) {
        Ok(())
    } else {
        Err(without_line(&first_line(
            &format!("{}\n{}", output.stderr, output.stdout),
            "error",
        )))
    };
    Ok((verdict, summary))
}

fn check(
    tools: &Tools,
    builtins: &Arc<Builtins>,
    case: &Case,
    index: usize,
    work: &Path,
) -> Result<Outcome> {
    let mut outcome = Outcome {
        case: index,
        verdict: Verdict::Generator,
        extensions: Vec::new(),
        constants: "",
        learned: Vec::new(),
        glslang: String::new(),
        rglsl: String::new(),
        detail: String::new(),
        shader: None,
        expected: None,
    };
    let stage = stage_extension(case.stage);
    let directory = work.join(case.version.to_string()).join(stage);
    fs::create_dir_all(&directory)?;
    let shader = directory.join(format!("{index}.{stage}"));
    let glslang_spirv = shader.with_extension(format!("{stage}.glslang.spv"));
    let rglsl_spirv = shader.with_extension(format!("{stage}.rglsl.spv"));
    let mut hints = generate::Hints {
        extensions: case.seed.clone(),
        ..generate::Hints::default()
    };
    let mut attempts = 0;
    let theirs = loop {
        attempts += 1;
        let generated =
            match generate::generate(builtins, case, spirv_version(case.version), &hints) {
                Ok(generated) => generated,
                Err(error) => {
                    outcome.detail = error;
                    return Ok(outcome);
                }
            };
        outcome.extensions.clone_from(&generated.extensions);
        outcome.constants = if generated.constants && !hints.constants {
            "sema"
        } else if generated.constants {
            "glslang"
        } else {
            ""
        };
        fs::write(&shader, &generated.source)?;
        let (theirs, text) = run_glslang(tools, case.version, &shader, &glslang_spirv)?;
        if !matches!(theirs, Compiled::Rejected(_)) || attempts > MAX_ATTEMPTS {
            break theirs;
        }
        if let Some(extension) = glslang_extension(&text, case.prefers_nv())
            .filter(|extension| !generated.extensions.contains(extension))
        {
            outcome.learned.push(extension.clone());
            hints.extensions.push(extension);
        } else if wants_constant(&text) && !generated.constants {
            hints.constants = true;
        } else if text.contains("derivative_group") && !hints.derivatives {
            hints.derivatives = true;
            let extension = String::from("GL_KHR_compute_shader_derivatives");
            if !hints.extensions.contains(&extension) {
                hints.extensions.push(extension);
            }
        } else {
            break theirs;
        }
    };
    let ours = run_rglsl(tools, case.version, stage, &shader, &rglsl_spirv)?;
    let describe = |compiled: &Compiled| match compiled {
        Compiled::Accepted(_) => String::from("accepted"),
        Compiled::Rejected(why) => format!("rejected: {why}"),
        Compiled::BackendFailed(why) => format!("backend failed: {why}"),
        Compiled::Crashed(why) => format!("crashed: {why}"),
    };
    outcome.glslang = describe(&theirs);
    outcome.rglsl = describe(&ours);
    outcome.verdict = match (&theirs, &ours) {
        (Compiled::Crashed(_), _) => Verdict::GlslangCrash,
        (_, Compiled::Crashed(_)) => Verdict::RglslCrash,
        (
            Compiled::Rejected(_) | Compiled::BackendFailed(_),
            Compiled::Rejected(_) | Compiled::BackendFailed(_),
        ) => Verdict::BothReject,
        (Compiled::Rejected(_) | Compiled::BackendFailed(_), Compiled::Accepted(ours)) => {
            match validate(tools, case.version, ours)?.0 {
                Ok(()) => Verdict::RglslOnly,
                Err(why) => {
                    outcome.rglsl = format!("invalid: {why}");
                    Verdict::RglslOnlyInvalid
                }
            }
        }
        (Compiled::Accepted(theirs), Compiled::Rejected(_)) => {
            match validate(tools, case.version, theirs)?.0 {
                Ok(()) => Verdict::GlslangOnly,
                Err(why) => {
                    outcome.glslang = format!("invalid: {why}");
                    Verdict::GlslangOnlyInvalid
                }
            }
        }
        (Compiled::Accepted(_), Compiled::BackendFailed(_)) => Verdict::RglslBackendFailed,
        (Compiled::Accepted(theirs), Compiled::Accepted(ours)) => {
            let (their_validity, their_summary) = validate(tools, case.version, theirs)?;
            let (our_validity, our_summary) = validate(tools, case.version, ours)?;
            if let Err(why) = &their_validity {
                outcome.glslang = format!("invalid: {why}");
            }
            if let Err(why) = &our_validity {
                outcome.rglsl = format!("invalid: {why}");
            }
            match (their_validity.is_ok(), our_validity.is_ok()) {
                (true, false) => Verdict::RglslInvalid,
                (false, true) => Verdict::GlslangInvalid,
                (false, false) => Verdict::BothInvalid,
                (true, true) => {
                    compare_summaries(&their_summary, &our_summary, &mut outcome.detail)
                }
            }
        }
    };
    if outcome.verdict != Verdict::Match {
        outcome.shader = Some(shader);
    } else {
        let _ = fs::remove_file(&shader);
        let _ = fs::remove_file(&glslang_spirv);
        let _ = fs::remove_file(&rglsl_spirv);
    }
    Ok(outcome)
}

fn compare_summaries(theirs: &Summary, ours: &Summary, detail: &mut String) -> Verdict {
    let mut verdict = Verdict::Match;
    let mut note = |label: &str, difference: String, candidate: Verdict| {
        if difference.is_empty() {
            return;
        }
        if !detail.is_empty() {
            detail.push_str("; ");
        }
        let _ = write!(detail, "{label}: {difference}");
        if verdict == Verdict::Match {
            verdict = candidate;
        }
    };
    note(
        "extensions",
        summary::difference(&ours.extensions, &theirs.extensions),
        Verdict::ExtensionsDiffer,
    );
    note(
        "capabilities",
        summary::difference(&ours.capabilities, &theirs.capabilities),
        Verdict::CapabilitiesDiffer,
    );
    note(
        "operations",
        summary::difference(&ours.operations, &theirs.operations),
        Verdict::OperationsDiffer,
    );
    if theirs.version != ours.version {
        note(
            "version",
            format!(
                "-{}.{} +{}.{}",
                theirs.version.0, theirs.version.1, ours.version.0, ours.version.1
            ),
            Verdict::CapabilitiesDiffer,
        );
    }
    verdict
}

fn clean(text: &str) -> String {
    text.replace(['\t', '\n', '\r'], " ")
}

fn table(cases: &[Case], outcomes: &[Outcome]) -> String {
    let mut out = String::from(
        "version\tstage\tkind\tdeclared-by\tname\tsignature\tverdict\texpected\textensions\textensions-only-glslang-asks\tconstants\tglslang\trglsl\tdetail\tshader\n",
    );
    for outcome in outcomes {
        let Some(case) = cases.get(outcome.case) else {
            continue;
        };
        let _ = writeln!(
            out,
            "{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}",
            case.version,
            stage_extension(case.stage),
            case.kind(),
            case.source.label(),
            clean(&case.name),
            clean(&case.signature),
            outcome.verdict.label(),
            clean(outcome.expected.as_deref().unwrap_or_default()),
            outcome.extensions.join(","),
            outcome.learned.join(","),
            outcome.constants,
            clean(&outcome.glslang),
            clean(&outcome.rglsl),
            clean(&outcome.detail),
            outcome
                .shader
                .as_ref()
                .map(|path| path.display().to_string())
                .unwrap_or_default(),
        );
    }
    out
}

const LISTED: usize = 40;
const MAX_ATTEMPTS: usize = 6;

fn reason(verdict: Verdict, outcome: &Outcome) -> &str {
    if !outcome.detail.is_empty() {
        &outcome.detail
    } else if matches!(
        verdict,
        Verdict::RglslOnly
            | Verdict::GlslangCrash
            | Verdict::GlslangInvalid
            | Verdict::GlslangOnlyInvalid
    ) {
        &outcome.glslang
    } else {
        &outcome.rglsl
    }
}

fn print_summary(
    cases: &[Case],
    outcomes: &[Outcome],
    stale: &[String],
    elapsed: Duration,
) -> usize {
    let mut counts: BTreeMap<Verdict, (usize, usize)> = BTreeMap::new();
    for outcome in outcomes {
        let entry = counts.entry(outcome.verdict).or_default();
        if outcome.expected.is_some() {
            entry.1 += 1;
        } else {
            entry.0 += 1;
        }
    }
    println!("built-ins: {} cases in {:.0?}", outcomes.len(), elapsed);
    for verdict in Verdict::ALL {
        if let Some((unexpected, expected)) = counts.get(&verdict) {
            if *expected > 0 {
                println!(
                    "  {:<22} {unexpected} (+{expected} expected)",
                    verdict.label()
                );
            } else {
                println!("  {:<22} {unexpected}", verdict.label());
            }
        }
    }
    let mut unexpected = 0;
    for verdict in Verdict::ALL
        .into_iter()
        .filter(|verdict| verdict.is_divergence())
    {
        let listed: Vec<&Outcome> = outcomes
            .iter()
            .filter(|outcome| outcome.verdict == verdict && outcome.expected.is_none())
            .collect();
        if listed.is_empty() {
            continue;
        }
        unexpected += listed.len();
        let mut groups: BTreeMap<(&str, &str), (usize, BTreeSet<String>)> = BTreeMap::new();
        for outcome in &listed {
            let Some(case) = cases.get(outcome.case) else {
                continue;
            };
            let entry = groups
                .entry((case.name.as_str(), reason(verdict, outcome)))
                .or_default();
            entry.0 += 1;
            entry
                .1
                .insert(format!("{}/{}", case.version, stage_extension(case.stage)));
        }
        println!("{} ({} cases):", verdict.label(), listed.len());
        for ((name, why), (count, places)) in groups.iter().take(LISTED) {
            let places: Vec<&str> = places.iter().map(String::as_str).collect();
            println!("  {name} x{count} [{}]: {why}", places.join(" "));
        }
        if groups.len() > LISTED {
            println!("  ... {} more groups", groups.len() - LISTED);
        }
    }
    for entry in stale {
        println!("stale expectation (no longer diverges): {entry}");
    }
    unexpected
}
