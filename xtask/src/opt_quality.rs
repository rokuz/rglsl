use std::collections::BTreeMap;
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::time::{Duration, Instant};

use anyhow::{Context as _, Result, bail};

use crate::bench::{self, stats, synthetic};
use crate::corpus::{self, Case, Kind};
use crate::process::{self, Exit};
use crate::{cli, exec, groups, oracles, runner};

mod gpu;

#[derive(Debug)]
pub struct Options {
    pub glslang_dir: Option<PathBuf>,
    pub filter: Option<String>,
    pub timeout_secs: u64,
    pub exec: Vec<exec::TargetSpec>,
    pub runs: usize,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum Set {
    Vulkan,
    OpenGlAsVulkan,
    Link,
    Exec,
    Synthetic,
}

impl Set {
    const ALL: [Self; 5] = [
        Self::Vulkan,
        Self::OpenGlAsVulkan,
        Self::Link,
        Self::Exec,
        Self::Synthetic,
    ];

    const fn key(self) -> &'static str {
        match self {
            Self::Vulkan => "vulkan",
            Self::OpenGlAsVulkan => "gl-as-vulkan",
            Self::Link => "link",
            Self::Exec => "exec",
            Self::Synthetic => "synthetic",
        }
    }

    const fn label(self) -> &'static str {
        match self {
            Self::Vulkan => "glslang corpus, Vulkan tests",
            Self::OpenGlAsVulkan => "glslang corpus, OpenGL tests as Vulkan",
            Self::Link => "tests/link single-file references",
            Self::Exec => "tests/exec shaders",
            Self::Synthetic => "synthetic large shaders",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum Variant {
    Rglsl,
    RglslO,
    RglslOs,
    SpirvOptO,
    SpirvOptOs,
    GlslangO,
}

impl Variant {
    pub const ALL: [Self; 6] = [
        Self::Rglsl,
        Self::RglslO,
        Self::RglslOs,
        Self::SpirvOptO,
        Self::SpirvOptOs,
        Self::GlslangO,
    ];

    pub const REFERENCE: Self = Self::SpirvOptO;

    pub const fn label(self) -> &'static str {
        match self {
            Self::Rglsl => "rglsl",
            Self::RglslO => "rglsl -O",
            Self::RglslOs => "rglsl -Os",
            Self::SpirvOptO => "spirv-opt -O(rglsl)",
            Self::SpirvOptOs => "spirv-opt -Os(rglsl)",
            Self::GlslangO => "glslang -O",
        }
    }

    pub const fn key(self) -> &'static str {
        match self {
            Self::Rglsl => "rglsl",
            Self::RglslO => "rglsl_O",
            Self::RglslOs => "rglsl_Os",
            Self::SpirvOptO => "rglsl_opt_O",
            Self::SpirvOptOs => "rglsl_opt_Os",
            Self::GlslangO => "glslang_O",
        }
    }

    const fn spirv_opt_flag(self) -> Option<&'static str> {
        match self {
            Self::SpirvOptO => Some("-O"),
            Self::SpirvOptOs => Some("-Os"),
            Self::Rglsl | Self::RglslO | Self::RglslOs | Self::GlslangO => None,
        }
    }

    const fn rglsl_flag(self) -> Option<&'static str> {
        match self {
            Self::RglslO => Some("-O"),
            Self::RglslOs => Some("-Os"),
            Self::Rglsl | Self::SpirvOptO | Self::SpirvOptOs | Self::GlslangO => None,
        }
    }
}

#[derive(Debug, Clone)]
pub struct Unit {
    pub name: String,
    pub case: String,
    pub set: Set,
    pub dir: PathBuf,
    pub rglsl_args: Vec<String>,
    pub glslang_args: Vec<String>,
    pub input: String,
    pub target_env: String,
    pub validator: Vec<String>,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct Metrics {
    pub instructions: usize,
    pub function_variables: usize,
    pub loads: usize,
    pub stores: usize,
    pub blocks: usize,
    pub functions: usize,
    pub words: usize,
}

type Metric = (&'static str, &'static str, fn(&Metrics) -> usize);

pub const METRICS: [Metric; 7] = [
    ("instructions", "instructions in functions", |m| {
        m.instructions
    }),
    ("function_variables", "`Function` variables", |m| {
        m.function_variables
    }),
    ("loads", "`OpLoad`", |m| m.loads),
    ("stores", "`OpStore`", |m| m.stores),
    ("blocks", "blocks", |m| m.blocks),
    ("functions", "functions", |m| m.functions),
    ("words", "words", |m| m.words),
];

impl Metrics {
    pub fn of(words: &[u32]) -> Result<Self> {
        use spirv::Op;
        if words.first() != Some(&spirv::MAGIC_NUMBER) || words.len() < 5 {
            bail!("not a SPIR-V module");
        }
        let mut metrics = Self {
            words: words.len(),
            ..Self::default()
        };
        let mut non_semantic = Vec::new();
        let mut in_function = false;
        let mut at = 5;
        while let Some(&first) = words.get(at) {
            let count = (first >> 16) as usize;
            let operands = words
                .get(at + 1..at + count.max(1))
                .context("truncated instruction")?;
            if count == 0 {
                bail!("instruction with a word count of 0 at word {at}");
            }
            at += count;
            let Some(op) = Op::from_u32(first & 0xffff) else {
                if in_function {
                    metrics.instructions += 1;
                }
                continue;
            };
            match op {
                Op::ExtInstImport => {
                    if let Some((&id, name)) = operands.split_first()
                        && literal_string(name).starts_with("NonSemantic.")
                    {
                        non_semantic.push(id);
                    }
                }
                Op::Function => {
                    in_function = true;
                    metrics.functions += 1;
                }
                Op::FunctionEnd => in_function = false,
                Op::Label => metrics.blocks += 1,
                Op::FunctionParameter | Op::Line | Op::NoLine => {}
                Op::ExtInst
                    if operands
                        .get(2)
                        .is_some_and(|set| non_semantic.contains(set)) => {}
                _ if in_function => {
                    metrics.instructions += 1;
                    match op {
                        Op::Load => metrics.loads += 1,
                        Op::Store => metrics.stores += 1,
                        Op::Variable
                            if operands.get(2) == Some(&(spirv::StorageClass::Function as u32)) =>
                        {
                            metrics.function_variables += 1;
                        }
                        _ => {}
                    }
                }
                _ => {}
            }
        }
        Ok(metrics)
    }

    pub fn read(path: &Path) -> Result<Self> {
        let bytes = fs::read(path).with_context(|| format!("reading {}", path.display()))?;
        if !bytes.len().is_multiple_of(4) {
            bail!("{} is not a whole number of words", path.display());
        }
        let words: Vec<u32> = bytes
            .chunks_exact(4)
            .map(|chunk| u32::from_le_bytes([chunk[0], chunk[1], chunk[2], chunk[3]]))
            .collect();
        Self::of(&words).with_context(|| path.display().to_string())
    }
}

fn literal_string(words: &[u32]) -> String {
    let bytes: Vec<u8> = words
        .iter()
        .flat_map(|word| word.to_le_bytes())
        .take_while(|&byte| byte != 0)
        .collect();
    String::from_utf8_lossy(&bytes).into_owned()
}

#[derive(Debug, Clone)]
pub enum Outcome {
    Module {
        path: PathBuf,
        metrics: Metrics,
        invalid: Option<String>,
    },
    Failed(String),
    Skipped,
}

impl Outcome {
    pub const fn valid(&self) -> Option<&Metrics> {
        match self {
            Self::Module {
                metrics,
                invalid: None,
                ..
            } => Some(metrics),
            _ => None,
        }
    }

    const fn status(&self) -> &'static str {
        match self {
            Self::Module { invalid: None, .. } => "ok",
            Self::Module { .. } => "invalid",
            Self::Failed(_) => "failed",
            Self::Skipped => "skipped",
        }
    }
}

#[derive(Debug, Clone)]
pub struct UnitResult {
    pub unit: Unit,
    pub outcomes: BTreeMap<Variant, Outcome>,
}

impl UnitResult {
    pub fn outcome(&self, variant: Variant) -> &Outcome {
        self.outcomes.get(&variant).unwrap_or(&Outcome::Skipped)
    }

    pub fn metrics(&self, variant: Variant) -> Option<&Metrics> {
        self.outcome(variant).valid()
    }
}

#[derive(Debug)]
pub struct Tools {
    pub rglsl: PathBuf,
    pub glslang_opt: PathBuf,
    pub spirv_opt: PathBuf,
    pub spirv_val: PathBuf,
    pub timeout: Duration,
}

impl Tools {
    pub fn find(root: &Path, timeout: Duration) -> Result<Self> {
        let pinned = |name: &str, variable: &str| -> Result<PathBuf> {
            let tool = oracles::find_tool(root, name, variable)?;
            if !tool.pinned {
                eprintln!(
                    "[xtask] warning: using unpinned {} (run `cargo xtask oracles`)",
                    tool.path.display()
                );
            }
            Ok(tool.path)
        };
        Ok(Self {
            glslang_opt: pinned("glslang-opt", "RGLSL_GLSLANG_OPT")?,
            spirv_opt: pinned("spirv-opt", "RGLSL_SPIRV_OPT")?,
            spirv_val: pinned("spirv-val", "RGLSL_SPIRV_VAL")?,
            rglsl: cli::build_rglsl(root)?,
            timeout,
        })
    }

    fn run(&self, command: Command) -> Result<Option<String>> {
        let output = process::run(command, self.timeout)?;
        Ok(match output.exit {
            Exit::Code(0) => None,
            Exit::Code(code) => Some(first_message(&output, &format!("exit code {code}"))),
            Exit::Signal => Some(first_message(&output, "killed by a signal")),
            Exit::Timeout => Some("timeout".into()),
        })
    }

    fn module(&self, unit: &Unit, path: PathBuf, failure: Option<String>) -> Result<Outcome> {
        if let Some(message) = failure {
            return Ok(Outcome::Failed(message));
        }
        let metrics = match Metrics::read(&path) {
            Ok(metrics) => metrics,
            Err(error) => return Ok(Outcome::Failed(format!("{error:#}"))),
        };
        let mut validate = Command::new(&self.spirv_val);
        validate.args(&unit.validator).arg(&path);
        let invalid = self.run(validate)?;
        Ok(Outcome::Module {
            path,
            metrics,
            invalid,
        })
    }

    pub fn produce(&self, unit: &Unit, out_dir: &Path) -> Result<UnitResult> {
        let path = |variant: Variant| -> Result<PathBuf> {
            let path = out_dir
                .join(variant.key())
                .join(format!("{}.spv", unit.name));
            if let Some(parent) = path.parent() {
                fs::create_dir_all(parent)?;
            }
            let _ = fs::remove_file(&path);
            Ok(path)
        };
        let mut outcomes = BTreeMap::new();
        let rglsl = path(Variant::Rglsl)?;
        let mut command = Command::new(&self.rglsl);
        command
            .current_dir(&unit.dir)
            .args(&unit.rglsl_args)
            .arg("-o")
            .arg(&rglsl)
            .arg(&unit.input);
        let failure = self.run(command)?;
        let outcome = self.module(unit, rglsl.clone(), failure)?;
        let rglsl_valid = outcome.valid().is_some();
        let rglsl_compiled = matches!(outcome, Outcome::Module { .. });
        outcomes.insert(Variant::Rglsl, outcome);
        if !rglsl_compiled {
            return Ok(UnitResult {
                unit: unit.clone(),
                outcomes,
            });
        }
        for variant in [Variant::RglslO, Variant::RglslOs] {
            let Some(flag) = variant.rglsl_flag() else {
                continue;
            };
            let out = path(variant)?;
            let mut command = Command::new(&self.rglsl);
            command
                .current_dir(&unit.dir)
                .args(&unit.rglsl_args)
                .arg(flag)
                .arg("-o")
                .arg(&out)
                .arg(&unit.input);
            let failure = self.run(command)?;
            outcomes.insert(variant, self.module(unit, out, failure)?);
        }
        for variant in [Variant::SpirvOptO, Variant::SpirvOptOs] {
            let Some(flag) = variant.spirv_opt_flag() else {
                continue;
            };
            if !rglsl_valid {
                outcomes.insert(variant, Outcome::Skipped);
                continue;
            }
            let out = path(variant)?;
            let mut command = Command::new(&self.spirv_opt);
            command
                .arg(flag)
                .arg("--skip-validation")
                .arg(format!("--target-env={}", unit.target_env))
                .arg(&rglsl)
                .arg("-o")
                .arg(&out);
            let failure = self.run(command)?;
            outcomes.insert(variant, self.module(unit, out, failure)?);
        }
        let out = path(Variant::GlslangO)?;
        let mut command = Command::new(&self.glslang_opt);
        command
            .current_dir(&unit.dir)
            .arg("-O")
            .args(&unit.glslang_args)
            .arg("-o")
            .arg(&out)
            .arg(&unit.input);
        let failure = self.run(command)?;
        outcomes.insert(Variant::GlslangO, self.module(unit, out, failure)?);
        Ok(UnitResult {
            unit: unit.clone(),
            outcomes,
        })
    }
}

fn first_message(output: &process::Output, fallback: &str) -> String {
    let lines = || {
        output
            .stdout
            .lines()
            .chain(output.stderr.lines())
            .map(str::trim)
    };
    lines()
        .find(|line| line.contains("ERROR") || line.contains("error"))
        .or_else(|| {
            output
                .stderr
                .lines()
                .map(str::trim)
                .find(|line| !line.is_empty())
        })
        .or_else(|| lines().find(|line| !line.is_empty()))
        .map_or_else(|| fallback.to_string(), str::to_string)
}

pub fn units(root: &Path, glslang_dir: &Path, work: &Path) -> Result<Vec<Unit>> {
    let test_dir = glslang_dir.join("Test");
    let mut units = Vec::new();
    for case in corpus::load(glslang_dir)? {
        if !case.kind.is_file() || case.target.compile_only || case.target.ast_only {
            continue;
        }
        let item = bench::corpus_item(&case, &test_dir, None);
        let mut glslang_args = item.options.clone();
        glslang_args.extend(item.glslang_options.iter().cloned());
        units.push(Unit {
            set: match case.corpus {
                corpus::Corpus::Vulkan => Set::Vulkan,
                _ => Set::OpenGlAsVulkan,
            },
            dir: item.dir.clone(),
            rglsl_args: item.options.clone(),
            glslang_args,
            input: case.name.clone(),
            target_env: case.target.spirv_val_env(),
            validator: runner::validator_args(&case, &case.path),
            case: case.name.clone(),
            name: case.name,
        });
    }
    for case in groups::load_own(root)? {
        let Kind::Own {
            ref dir,
            ref expectation,
            reference: Some(ref reference),
            ..
        } = case.kind
        else {
            continue;
        };
        if expectation.accept {
            units.push(file_unit(&case, dir, reference, Set::Link, &[]));
        }
    }
    for case in groups::load_exec(root)? {
        let Kind::Script {
            ref dir,
            ref files,
            ref options,
            ..
        } = case.kind
        else {
            continue;
        };
        for file in files {
            units.push(file_unit(&case, dir, file, Set::Exec, options));
        }
    }
    let synthetic_dir = work.join("synthetic");
    fs::create_dir_all(&synthetic_dir)?;
    for (name, text) in synthetic::shaders(synthetic::Sizes::DEFAULT) {
        fs::write(synthetic_dir.join(&name), text)?;
        units.push(Unit {
            name: format!("synthetic/{name}"),
            case: format!("synthetic/{name}"),
            set: Set::Synthetic,
            dir: synthetic_dir.clone(),
            rglsl_args: vec!["-V".into()],
            glslang_args: vec!["-V".into()],
            input: name,
            target_env: "vulkan1.0".into(),
            validator: vec!["--target-env".into(), "vulkan1.0".into()],
        });
    }
    Ok(units)
}

fn file_unit(case: &Case, dir: &Path, file: &str, set: Set, options: &[String]) -> Unit {
    let mut rglsl_args = vec!["-V".to_string()];
    rglsl_args.extend(case.target.rglsl_args());
    rglsl_args.extend(options.iter().cloned());
    let mut glslang_args = rglsl_args.clone();
    glslang_args.extend(case.target.glslang_only_args());
    Unit {
        name: format!("{}/{file}", case.name),
        case: case.name.clone(),
        set,
        dir: dir.to_path_buf(),
        rglsl_args,
        glslang_args,
        input: file.to_string(),
        target_env: case.target.spirv_val_env(),
        validator: runner::validator_args(case, &dir.join(file)),
    }
}

pub fn run(root: &Path, options: &Options) -> Result<i32> {
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
    let tools = Tools::find(root, Duration::from_secs(options.timeout_secs))?;
    let work = root.join("target").join("xtask").join("opt-quality");
    let modules = work.join("modules");
    let _ = fs::remove_dir_all(&modules);
    fs::create_dir_all(&modules)?;
    let mut units = units(root, &glslang_dir, &work)?;
    if let Some(filter) = &options.filter {
        units.retain(|unit| filter.split(',').any(|part| unit.name.contains(part)));
    }
    if units.is_empty() {
        bail!("no shaders selected");
    }
    let started = Instant::now();
    let done = AtomicUsize::new(0);
    let results = exec::parallel_map(&units, |unit| {
        let result = tools.produce(unit, &modules);
        let count = done.fetch_add(1, Ordering::Relaxed) + 1;
        if count.is_multiple_of(200) {
            eprintln!(
                "[xtask] {count} / {} ({:.0}s)",
                units.len(),
                started.elapsed().as_secs_f64()
            );
        }
        result.with_context(|| unit.name.clone())
    });
    let results = results.into_iter().collect::<Result<Vec<_>>>()?;
    let report = markdown(&results, started.elapsed());
    let xtask_dir = root.join("target").join("xtask");
    let report_path = xtask_dir.join("opt-quality.md");
    let table_path = xtask_dir.join("opt-quality.tsv");
    fs::write(&report_path, &report)?;
    fs::write(&table_path, tsv(&results))?;
    print!("{report}");
    eprintln!(
        "[xtask] report: {}\n[xtask] per-shader numbers: {}\n[xtask] modules: {}",
        report_path.display(),
        table_path.display(),
        modules.display()
    );
    if !options.exec.is_empty() {
        gpu::run(
            root,
            &results,
            &options.exec,
            options.runs,
            Duration::from_secs(options.timeout_secs),
        )?;
    }
    Ok(0)
}

fn smoothed_ratio(value: usize, reference: usize) -> f64 {
    (value as f64 + 1.0) / (reference as f64 + 1.0)
}

fn pairs(
    results: &[UnitResult],
    variant: Variant,
) -> impl Iterator<Item = (&UnitResult, &Metrics, &Metrics)> {
    results.iter().filter_map(move |result| {
        Some((
            result,
            result.metrics(variant)?,
            result.metrics(Variant::REFERENCE)?,
        ))
    })
}

fn geomean(results: &[UnitResult], variant: Variant, metric: fn(&Metrics) -> usize) -> String {
    let ratios: Vec<f64> = pairs(results, variant)
        .map(|(_, value, reference)| smoothed_ratio(metric(value), metric(reference)))
        .collect();
    stats::geometric_mean(&ratios).map_or_else(|| "-".into(), |ratio| format!("{ratio:.3}"))
}

fn markdown(results: &[UnitResult], elapsed: Duration) -> String {
    let mut out = String::from("# SPIR-V after optimization: rglsl, spirv-opt and glslang -O\n\n");
    out.push_str(
        "Every shader rglsl compiles is built in six variants: *rglsl* (the `rglsl` command-line tool), \
         *rglsl -O* and *rglsl -Os* (the same command line with `-O` or `-Os`), *spirv-opt -O(rglsl)* and *spirv-opt -Os(rglsl)* (the pinned `spirv-opt` on rglsl's module, \
         `--skip-validation` as `glslang -O` runs it, only when rglsl's module is valid), and *glslang -O* \
         (`target/oracles/bin/glslang-opt -O` with the command line of the corpus run). Each module is \
         checked with `spirv-val` with the options of the corpus run. Counts: *instructions in functions* \
         leaves out `OpFunction`, `OpFunctionParameter`, `OpFunctionEnd`, `OpLabel`, `OpLine`, `OpNoLine` \
         and non-semantic extended instructions; *`Function` variables* are `OpVariable` with storage \
         class `Function`; *blocks* are `OpLabel`; *words* is the module size. Ratios are to \
         *spirv-opt -O(rglsl)*, per shader as (value + 1) / (reference + 1), so that zero counts stay \
         defined; below 1: fewer than spirv-opt -O. Driver statistics and GPU times: `--exec`, in \
         opt-quality-exec.md.\n\n",
    );

    out.push_str("## Shaders\n\n");
    out.push_str("| shader set | shaders | rglsl rejects | rglsl invalid | every variant valid |\n|---|--:|--:|--:|--:|\n");
    let every_valid = |result: &UnitResult| {
        Variant::ALL
            .iter()
            .all(|&variant| result.metrics(variant).is_some())
    };
    let count_row = |out: &mut String, label: &str, selected: &[&UnitResult]| {
        let rejects = selected
            .iter()
            .filter(|result| matches!(result.outcome(Variant::Rglsl), Outcome::Failed(_)))
            .count();
        let invalid = selected
            .iter()
            .filter(|result| {
                matches!(
                    result.outcome(Variant::Rglsl),
                    Outcome::Module {
                        invalid: Some(_),
                        ..
                    }
                )
            })
            .count();
        let valid = selected.iter().filter(|result| every_valid(result)).count();
        let _ = writeln!(
            out,
            "| {label} | {} | {rejects} | {invalid} | {valid} |",
            selected.len()
        );
    };
    for set in Set::ALL {
        let selected: Vec<&UnitResult> = results
            .iter()
            .filter(|result| result.unit.set == set)
            .collect();
        if !selected.is_empty() {
            count_row(&mut out, set.label(), &selected);
        }
    }
    let all: Vec<&UnitResult> = results.iter().collect();
    count_row(&mut out, "**all**", &all);

    out.push_str("\n## Failures and invalid modules\n\n");
    out.push_str("A failure is a tool that exits with an error (for rglsl: the shader is rejected); *invalid* is a module `spirv-val` rejects; *skipped*: rglsl's module is invalid, so `spirv-opt` does not run on it.\n\n");
    out.push_str("| variant | modules | failed | invalid | skipped |\n|---|--:|--:|--:|--:|\n");
    for variant in Variant::ALL {
        let count = |status: &str| {
            results
                .iter()
                .filter(|result| result.outcomes.contains_key(&variant))
                .filter(|result| result.outcome(variant).status() == status)
                .count()
        };
        let _ = writeln!(
            out,
            "| {} | {} | {} | {} | {} |",
            variant.label(),
            count("ok") + count("invalid"),
            count("failed"),
            count("invalid"),
            count("skipped"),
        );
    }
    for variant in [
        Variant::RglslO,
        Variant::RglslOs,
        Variant::SpirvOptO,
        Variant::SpirvOptOs,
        Variant::GlslangO,
    ] {
        let problems: Vec<String> = results
            .iter()
            .filter_map(|result| match result.outcome(variant) {
                Outcome::Failed(message) => Some(format!(
                    "- `{}` ({}): fails: {}",
                    result.unit.name,
                    result.unit.set.key(),
                    message
                )),
                Outcome::Module {
                    invalid: Some(message),
                    path,
                    ..
                } => Some(format!(
                    "- `{}` ({}): invalid: {} (`{}`)",
                    result.unit.name,
                    result.unit.set.key(),
                    message,
                    path.display()
                )),
                _ => None,
            })
            .collect();
        if !problems.is_empty() {
            let _ = writeln!(out, "\n### {}\n", variant.label());
            for line in problems {
                let _ = writeln!(out, "{line}");
            }
        }
    }
    let rglsl_invalid: Vec<String> = results
        .iter()
        .filter_map(|result| match result.outcome(Variant::Rglsl) {
            Outcome::Module {
                invalid: Some(message),
                path,
                ..
            } => Some(format!(
                "- `{}`: {message} (`{}`)",
                result.unit.name,
                path.display()
            )),
            _ => None,
        })
        .collect();
    if !rglsl_invalid.is_empty() {
        out.push_str("\n### rglsl modules spirv-val rejects\n\n");
        for line in rglsl_invalid {
            let _ = writeln!(out, "{line}");
        }
    }

    let common: Vec<&UnitResult> = results.iter().filter(|r| every_valid(r)).collect();
    let _ = writeln!(
        out,
        "\n## Totals\n\nSums over the {} shaders whose six modules are all valid, and their ratio to spirv-opt -O(rglsl).\n",
        common.len()
    );
    out.push_str("| metric |");
    for variant in Variant::ALL {
        let _ = write!(out, " {} |", variant.label());
    }
    out.push_str("\n|---|");
    out.push_str(&"--:|".repeat(Variant::ALL.len()));
    out.push('\n');
    for (_, label, metric) in METRICS {
        let total = |variant: Variant| -> usize {
            common
                .iter()
                .filter_map(|result| result.metrics(variant))
                .map(metric)
                .sum()
        };
        let reference = total(Variant::REFERENCE);
        let _ = write!(out, "| {label} |");
        for variant in Variant::ALL {
            let value = total(variant);
            let _ = write!(
                out,
                " {value} ({}) |",
                stats::ratio(value as f64, reference as f64)
                    .map_or_else(|| "-".into(), |ratio| format!("{ratio:.3}×"))
            );
        }
        out.push('\n');
    }

    out.push_str("\n## Memory accesses in functions\n\n");
    out.push_str("Shaders whose `OpLoad` + `OpStore` count is at most that of spirv-opt -O(rglsl), over the shaders where both modules are valid.\n\n| variant | at most spirv-opt -O | shaders | share |\n|---|--:|--:|--:|\n");
    for variant in [
        Variant::Rglsl,
        Variant::RglslO,
        Variant::RglslOs,
        Variant::GlslangO,
    ] {
        let accesses = |metrics: &Metrics| metrics.loads + metrics.stores;
        let (fewer, total) =
            pairs(results, variant).fold((0, 0), |(fewer, total), (_, value, reference)| {
                (
                    fewer + usize::from(accesses(value) <= accesses(reference)),
                    total + 1,
                )
            });
        let _ = writeln!(
            out,
            "| {} | {fewer} | {total} | {} |",
            variant.label(),
            stats::ratio(fewer as f64 * 100.0, total as f64)
                .map_or_else(|| "-".into(), |share| format!("{share:.1} %"))
        );
    }

    out.push_str("\n## Geometric means of the per-shader ratios to spirv-opt -O(rglsl)\n\n");
    out.push_str("Over the shaders where both modules are valid.\n\n| metric |");
    for variant in Variant::ALL {
        let _ = write!(
            out,
            " {} ({} shaders) |",
            variant.label(),
            pairs(results, variant).count()
        );
    }
    out.push_str("\n|---|");
    out.push_str(&"--:|".repeat(Variant::ALL.len()));
    out.push('\n');
    for (_, label, metric) in METRICS {
        let _ = write!(out, "| {label} |");
        for variant in Variant::ALL {
            let _ = write!(out, " {} |", geomean(results, variant, metric));
        }
        out.push('\n');
    }

    out.push_str("\n### Instructions in functions by shader set\n\n| shader set |");
    for variant in Variant::ALL {
        let _ = write!(out, " {} |", variant.label());
    }
    out.push_str(" glslang -O: fewer / same / more than spirv-opt -O(rglsl) |\n|---|");
    out.push_str(&"--:|".repeat(Variant::ALL.len() + 1));
    out.push('\n');
    let instructions = |metrics: &Metrics| metrics.instructions;
    let set_rows: Vec<(&str, Vec<UnitResult>)> = Set::ALL
        .iter()
        .map(|&set| {
            (
                set.label(),
                results
                    .iter()
                    .filter(|result| result.unit.set == set)
                    .cloned()
                    .collect::<Vec<_>>(),
            )
        })
        .filter(|(_, selected)| !selected.is_empty())
        .chain([("**all**", results.to_vec())])
        .collect();
    for (label, selected) in &set_rows {
        let _ = write!(out, "| {label} |");
        for variant in Variant::ALL {
            let _ = write!(out, " {} |", geomean(selected, variant, instructions));
        }
        let mut fewer = 0;
        let mut same = 0;
        let mut more = 0;
        for (_, value, reference) in pairs(selected, Variant::GlslangO) {
            match value.instructions.cmp(&reference.instructions) {
                std::cmp::Ordering::Less => fewer += 1,
                std::cmp::Ordering::Equal => same += 1,
                std::cmp::Ordering::Greater => more += 1,
            }
        }
        let _ = writeln!(out, " {fewer} / {same} / {more} |");
    }

    let shader_table = |out: &mut String, title: &str, ranked: &[(&UnitResult, f64)]| {
        let _ = writeln!(out, "\n### {title}\n");
        out.push_str("| shader | set | rglsl | rglsl -O | spirv-opt -O(rglsl) | spirv-opt -Os(rglsl) | glslang -O | ratio |\n|---|---|--:|--:|--:|--:|--:|--:|\n");
        for (result, ratio) in ranked {
            let cell = |variant: Variant| {
                result
                    .metrics(variant)
                    .map_or_else(|| "-".into(), |m| m.instructions.to_string())
            };
            let _ = writeln!(
                out,
                "| `{}` | {} | {} | {} | {} | {} | {} | {ratio:.2} |",
                result.unit.name,
                result.unit.set.key(),
                cell(Variant::Rglsl),
                cell(Variant::RglslO),
                cell(Variant::SpirvOptO),
                cell(Variant::SpirvOptOs),
                cell(Variant::GlslangO),
            );
        }
    };
    out.push_str("\n## Shaders\n\nInstructions in functions.\n");
    let ranked = |variant: Variant, inverse: bool| {
        let mut ranked: Vec<(&UnitResult, f64)> = pairs(results, variant)
            .map(|(result, value, reference)| {
                let ratio = smoothed_ratio(value.instructions, reference.instructions);
                (result, if inverse { 1.0 / ratio } else { ratio })
            })
            .collect();
        ranked.sort_by(|a, b| b.1.total_cmp(&a.1));
        ranked.truncate(15);
        ranked
    };
    shader_table(
        &mut out,
        "spirv-opt -O(rglsl) furthest above glslang -O (ratio: spirv-opt -O(rglsl) / glslang -O)",
        &ranked(Variant::GlslangO, true),
    );
    shader_table(
        &mut out,
        "glslang -O furthest above spirv-opt -O(rglsl) (ratio: glslang -O / spirv-opt -O(rglsl))",
        &ranked(Variant::GlslangO, false),
    );
    shader_table(
        &mut out,
        "Most shrunk by spirv-opt -O (ratio: rglsl / spirv-opt -O(rglsl))",
        &ranked(Variant::Rglsl, false),
    );
    shader_table(
        &mut out,
        "rglsl -O furthest above spirv-opt -O(rglsl) (ratio: rglsl -O / spirv-opt -O(rglsl))",
        &ranked(Variant::RglslO, false),
    );
    let _ = writeln!(out, "\nWall time: {:.0} s.", elapsed.as_secs_f64());
    out
}

fn tsv(results: &[UnitResult]) -> String {
    let mut out = String::from("shader\tset");
    for variant in Variant::ALL {
        let _ = write!(out, "\t{}_status", variant.key());
        for (key, _, _) in METRICS {
            let _ = write!(out, "\t{}_{key}", variant.key());
        }
    }
    for variant in Variant::ALL {
        if variant != Variant::REFERENCE {
            for key in ["instructions", "words"] {
                let _ = write!(out, "\t{}_{key}_ratio", variant.key());
            }
        }
    }
    out.push('\n');
    for result in results {
        let _ = write!(out, "{}\t{}", result.unit.name, result.unit.set.key());
        for variant in Variant::ALL {
            let outcome = result.outcome(variant);
            let _ = write!(out, "\t{}", outcome.status());
            let metrics = match outcome {
                Outcome::Module { metrics, .. } => Some(metrics),
                Outcome::Failed(_) | Outcome::Skipped => None,
            };
            for (_, _, metric) in METRICS {
                let _ = write!(
                    out,
                    "\t{}",
                    metrics.map_or_else(String::new, |m| metric(m).to_string())
                );
            }
        }
        let reference = result.metrics(Variant::REFERENCE);
        for variant in Variant::ALL {
            if variant == Variant::REFERENCE {
                continue;
            }
            for metric in [
                (|m: &Metrics| m.instructions) as fn(&Metrics) -> usize,
                |m| m.words,
            ] {
                let ratio = match (result.metrics(variant), reference) {
                    (Some(value), Some(reference)) => {
                        format!("{:.4}", smoothed_ratio(metric(value), metric(reference)))
                    }
                    _ => String::new(),
                };
                let _ = write!(out, "\t{ratio}");
            }
        }
        out.push('\n');
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    fn instruction(op: spirv::Op, operands: &[u32]) -> Vec<u32> {
        let mut words = vec![((operands.len() as u32 + 1) << 16) | op as u32];
        words.extend(operands);
        words
    }

    fn string(text: &str) -> Vec<u32> {
        let mut bytes = text.as_bytes().to_vec();
        bytes.push(0);
        while !bytes.len().is_multiple_of(4) {
            bytes.push(0);
        }
        bytes
            .chunks_exact(4)
            .map(|chunk| u32::from_le_bytes([chunk[0], chunk[1], chunk[2], chunk[3]]))
            .collect()
    }

    #[test]
    fn counts_function_contents() -> Result<()> {
        use spirv::Op;
        let mut words = vec![spirv::MAGIC_NUMBER, 0x0001_0000, 0, 100, 0];
        let mut import = vec![9];
        import.extend(string("NonSemantic.Shader.DebugInfo.100"));
        words.extend(instruction(Op::ExtInstImport, &import));
        words.extend(instruction(Op::Variable, &[2, 3, 6]));
        words.extend(instruction(Op::Function, &[1, 4, 0, 5]));
        words.extend(instruction(Op::FunctionParameter, &[2, 6]));
        words.extend(instruction(Op::Label, &[7]));
        words.extend(instruction(
            Op::Variable,
            &[2, 8, spirv::StorageClass::Function as u32],
        ));
        words.extend(instruction(Op::ExtInst, &[1, 10, 9, 1]));
        words.extend(instruction(Op::Line, &[1, 2, 3]));
        words.extend(instruction(Op::Load, &[1, 11, 8]));
        words.extend(instruction(Op::Store, &[8, 11]));
        words.extend(instruction(Op::Branch, &[12]));
        words.extend(instruction(Op::Label, &[12]));
        words.extend(instruction(Op::Return, &[]));
        words.extend(instruction(Op::FunctionEnd, &[]));
        let metrics = Metrics::of(&words)?;
        assert_eq!(
            metrics,
            Metrics {
                instructions: 5,
                function_variables: 1,
                loads: 1,
                stores: 1,
                blocks: 2,
                functions: 1,
                words: words.len(),
            }
        );
        assert!(Metrics::of(&words[..words.len() - 2]).is_ok());
        let mut truncated = words.clone();
        truncated.push(5 << 16);
        assert!(Metrics::of(&truncated).is_err());
        assert!(Metrics::of(&[1, 2, 3]).is_err());
        Ok(())
    }

    fn result(name: &str, counts: [Option<usize>; 6]) -> UnitResult {
        let mut outcomes = BTreeMap::new();
        for (variant, count) in Variant::ALL.into_iter().zip(counts) {
            outcomes.insert(
                variant,
                match count {
                    Some(instructions) => Outcome::Module {
                        path: PathBuf::new(),
                        metrics: Metrics {
                            instructions,
                            words: instructions * 4,
                            ..Metrics::default()
                        },
                        invalid: None,
                    },
                    None => Outcome::Failed("spirv-opt: boom".into()),
                },
            );
        }
        UnitResult {
            unit: Unit {
                name: name.into(),
                case: name.into(),
                set: Set::Vulkan,
                dir: PathBuf::new(),
                rglsl_args: Vec::new(),
                glslang_args: Vec::new(),
                input: name.into(),
                target_env: "vulkan1.0".into(),
                validator: Vec::new(),
            },
            outcomes,
        }
    }

    #[test]
    fn report_has_ratios_and_failures() {
        let results = [
            result(
                "a.frag",
                [Some(19), Some(13), Some(13), Some(9), Some(9), Some(9)],
            ),
            result(
                "b.frag",
                [Some(39), Some(19), Some(19), Some(9), None, Some(19)],
            ),
        ];
        let report = markdown(&results, Duration::from_secs(1));
        assert!(report.contains("| **all** | 2 | 0 | 0 | 1 |"));
        assert!(report.contains("| spirv-opt -Os(rglsl) | 1 | 1 | 0 | 0 |"));
        assert!(report.contains("- `b.frag` (vulkan): fails: spirv-opt: boom"));
        assert!(report.contains(
            "| instructions in functions | 19 (2.111×) | 13 (1.444×) | 13 (1.444×) | 9 (1.000×) | 9 (1.000×) | 9 (1.000×) |"
        ));
        assert!(report.contains(
            "| instructions in functions | 2.828 | 1.673 | 1.673 | 1.000 | 1.000 | 1.414 |"
        ));
        assert!(report.contains("| `b.frag` | vulkan | 39 | 19 | 9 | - | 19 | 2.00 |"));
        let table = tsv(&results);
        assert_eq!(table.lines().count(), 3);
        assert!(table.contains("b.frag\tvulkan\tok\t39\t"));
        assert!(table.contains("\tfailed\t\t\t\t\t\t\t\tok\t19\t"));
        assert!(
            table.ends_with(
                "\t4.0000\t4.2432\t2.0000\t2.0811\t2.0000\t2.0811\t\t\t2.0000\t2.0811\n"
            )
        );
    }
}
