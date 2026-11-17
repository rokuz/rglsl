use std::collections::BTreeSet;
use std::ffi::OsString;
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};
use std::time::{Duration, Instant};

use anyhow::{Context, Result, bail};

use crate::cli;
use crate::corpus::{self, Case, Corpus, Kind};
use crate::groups;
use crate::oracles::{self, Tool};
use crate::process::{self, Exit};

mod budget;
mod in_process;
pub mod stats;
pub mod synthetic;

#[derive(Debug)]
pub struct Options {
    pub glslang_dir: Option<PathBuf>,
    pub filter: Option<String>,
    pub runs: usize,
    pub debug_info: Option<DebugInfo>,
    pub timeout_secs: u64,
    pub in_process: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DebugInfo {
    Basic,
    NonSemantic,
}

impl DebugInfo {
    pub fn parse(text: &str) -> Option<Self> {
        match text {
            "g" => Some(Self::Basic),
            "gVS" => Some(Self::NonSemantic),
            _ => None,
        }
    }

    const fn mode(self) -> &'static str {
        match self {
            Self::Basic => "g",
            Self::NonSemantic => "gVS",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
enum Group {
    Vulkan,
    OpenGlAsVulkan,
    GlslangLink,
    OwnLink,
    Synthetic,
}

impl Group {
    const ALL: [Self; 5] = [
        Self::Vulkan,
        Self::OpenGlAsVulkan,
        Self::GlslangLink,
        Self::OwnLink,
        Self::Synthetic,
    ];

    const fn label(self) -> &'static str {
        match self {
            Self::Vulkan => "glslang corpus, Vulkan tests",
            Self::OpenGlAsVulkan => "glslang corpus, OpenGL tests as Vulkan",
            Self::GlslangLink => "glslang link tests",
            Self::OwnLink => "rglsl link tests",
            Self::Synthetic => "synthetic large shaders",
        }
    }

    const fn key(self) -> &'static str {
        match self {
            Self::Vulkan => "vulkan",
            Self::OpenGlAsVulkan => "gl-as-vulkan",
            Self::GlslangLink => "glslang-link",
            Self::OwnLink => "rglsl-link",
            Self::Synthetic => "synthetic",
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Output {
    File,
    WorkingDirectory,
}

#[derive(Debug, Clone)]
pub struct Item {
    name: String,
    group: Group,
    pub dir: PathBuf,
    pub options: Vec<String>,
    pub glslang_options: Vec<String>,
    pub inputs: Vec<String>,
    output: Output,
    copy_from: Option<PathBuf>,
}

impl Item {
    fn arguments(&self, compiler: Compiler, output: &Path) -> Vec<OsString> {
        let mut arguments: Vec<OsString> = Vec::new();
        if let Compiler::GlslangOpt = compiler {
            arguments.push("-O".into());
        }
        arguments.extend(self.options.iter().map(OsString::from));
        if let Compiler::Glslang | Compiler::GlslangOpt = compiler {
            arguments.extend(self.glslang_options.iter().map(OsString::from));
        }
        if self.output == Output::File {
            arguments.push("-o".into());
            arguments.push(output.into());
        }
        arguments.extend(self.inputs.iter().map(OsString::from));
        arguments
    }

    fn command_line(&self) -> String {
        let mut words = self.options.clone();
        if self.output == Output::File {
            words.push("-o".into());
            words.push("OUT.spv".into());
        }
        words.extend(self.inputs.iter().cloned());
        words.join(" ")
    }
}

#[derive(Debug, Clone, Copy)]
enum Compiler {
    Glslang,
    GlslangOpt,
    Rglsl,
}

impl Compiler {
    const fn name(self) -> &'static str {
        match self {
            Self::Glslang => "glslang",
            Self::GlslangOpt => "glslang -O",
            Self::Rglsl => "rglsl",
        }
    }

    const fn file(self) -> &'static str {
        match self {
            Self::Glslang => "glslang",
            Self::GlslangOpt => "glslang-opt",
            Self::Rglsl => "rglsl",
        }
    }
}

#[derive(Debug)]
struct Tools {
    glslang: Tool,
    glslang_opt: Option<Tool>,
    rglsl: PathBuf,
    time: Option<TimeWrapper>,
    out_dir: PathBuf,
    timeout: Duration,
}

impl Tools {
    fn program(&self, compiler: Compiler) -> &Path {
        match compiler {
            Compiler::Glslang => &self.glslang.path,
            Compiler::GlslangOpt => self
                .glslang_opt
                .as_ref()
                .map_or(&self.glslang.path, |tool| &tool.path),
            Compiler::Rglsl => &self.rglsl,
        }
    }

    fn output(&self, compiler: Compiler) -> PathBuf {
        self.out_dir.join(format!("{}.spv", compiler.file()))
    }

    fn command(&self, compiler: Compiler, item: &Item) -> Command {
        let mut command = Command::new(self.program(compiler));
        command
            .current_dir(&item.dir)
            .args(item.arguments(compiler, &self.output(compiler)));
        command
    }

    fn warm_up(&self, compiler: Compiler, item: &Item) -> Result<WarmUp> {
        let command = match self.time {
            Some(time) => {
                let mut command = Command::new(time.program);
                command
                    .current_dir(&item.dir)
                    .arg(time.flag)
                    .arg(self.program(compiler))
                    .args(item.arguments(compiler, &self.output(compiler)));
                command
            }
            None => self.command(compiler, item),
        };
        let output = process::run(command, self.timeout)?;
        Ok(WarmUp {
            accepted: matches!(output.exit, Exit::Code(0)),
            peak_rss: self
                .time
                .and_then(|_| stats::peak_rss_bytes(&output.stderr)),
        })
    }

    fn timed(&self, compiler: Compiler, item: &Item) -> Result<f64> {
        let mut command = self.command(compiler, item);
        command
            .stdin(Stdio::null())
            .stdout(Stdio::null())
            .stderr(Stdio::null());
        let started = Instant::now();
        let status = command
            .status()
            .with_context(|| format!("starting {} on {}", compiler.name(), item.name))?;
        let elapsed = started.elapsed();
        if !status.success() {
            bail!(
                "{} failed on {} ({status}) after accepting it in the warm-up run",
                compiler.name(),
                item.name
            );
        }
        Ok(elapsed.as_secs_f64() * 1000.0)
    }
}

#[derive(Debug, Clone, Copy)]
struct TimeWrapper {
    program: &'static str,
    flag: &'static str,
}

impl TimeWrapper {
    fn find() -> Option<Self> {
        let flag = match std::env::consts::OS {
            "macos" => "-l",
            "linux" => "-v",
            _ => return None,
        };
        let program = "/usr/bin/time";
        Path::new(program)
            .is_file()
            .then_some(Self { program, flag })
    }
}

#[derive(Debug, Clone, Copy)]
struct WarmUp {
    accepted: bool,
    peak_rss: Option<u64>,
}

#[derive(Debug, Clone, Copy)]
struct Sample {
    median: f64,
    min: f64,
    peak_rss: Option<u64>,
}

#[derive(Debug, Clone)]
struct Measured {
    name: String,
    group: Group,
    command_line: String,
    glslang: Sample,
    glslang_opt: Option<Sample>,
    rglsl: Sample,
}

impl Measured {
    fn ratio(&self) -> Option<f64> {
        stats::ratio(self.rglsl.median, self.glslang.median)
    }

    fn budget_row(&self) -> Option<budget::Row<'_>> {
        let glslang_opt = self.glslang_opt?;
        Some(budget::Row {
            name: &self.name,
            group: self.group,
            glslang: self.glslang.median,
            glslang_opt: glslang_opt.median,
            optimizer: glslang_opt.median - self.glslang.median,
            rglsl: self.rglsl.median,
            rglsl_opt: None,
        })
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
enum Excluded {
    GlslangRejects,
    RglslRejects,
    BothReject,
}

pub fn run(root: &Path, options: &Options) -> Result<i32> {
    if options.runs == 0 {
        bail!("--runs must be at least 1");
    }
    let glslang_dir = corpus_dir(root, options)?;
    if options.in_process {
        return in_process::run(root, &glslang_dir, options);
    }
    let glslang = oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?;
    if !glslang.pinned {
        eprintln!(
            "[xtask] warning: using unpinned {} (run `cargo xtask oracles` for the pinned Release build)",
            glslang.path.display()
        );
    }
    let glslang_opt = match oracles::find_tool(root, "glslang-opt", "RGLSL_GLSLANG_OPT") {
        Ok(tool) => Some(tool),
        Err(error) => {
            eprintln!("[xtask] warning: {error}; `glslang -O` is not measured");
            None
        }
    };
    let rglsl = cli::build_rglsl(root)?;

    let bench_dir = root.join("target").join("xtask").join("bench");
    let work = bench_dir.join("work");
    let _ = fs::remove_dir_all(&work);
    fs::create_dir_all(work.join("out"))?;

    let mut items = collect(root, &glslang_dir, &work, options.debug_info)?;
    if let Some(filter) = &options.filter {
        items.retain(|item| filter.split(',').any(|part| item.name.contains(part)));
    }
    if items.is_empty() {
        bail!("no shaders selected");
    }
    for item in &items {
        if let Some(source) = &item.copy_from {
            fs::create_dir_all(&item.dir)?;
            for input in &item.inputs {
                fs::copy(source.join(input), item.dir.join(input))
                    .with_context(|| format!("copying {input} for {}", item.name))?;
            }
        }
    }

    let tools = Tools {
        glslang,
        glslang_opt,
        rglsl,
        time: TimeWrapper::find(),
        out_dir: work.join("out"),
        timeout: Duration::from_secs(options.timeout_secs),
    };
    let rglsl_build = if std::env::var_os("RGLSL_CLI").is_some() {
        "RGLSL_CLI (as given)"
    } else {
        "cargo --release (workspace release profile)"
    };
    let environment = Environment::describe(root, &glslang_dir, &tools.glslang, rglsl_build);

    let started = Instant::now();
    let mut measured = Vec::new();
    let mut excluded: Vec<(Group, Excluded, String)> = Vec::new();
    let mut optimizer_failures = Vec::new();
    for (index, item) in items.iter().enumerate() {
        if index > 0 && index % 100 == 0 {
            eprintln!(
                "[xtask] {index} / {} ({:.0}s)",
                items.len(),
                started.elapsed().as_secs_f64()
            );
        }
        let glslang_warm = tools.warm_up(Compiler::Glslang, item)?;
        let rglsl_warm = tools.warm_up(Compiler::Rglsl, item)?;
        match (glslang_warm.accepted, rglsl_warm.accepted) {
            (true, true) => {}
            (false, true) => {
                excluded.push((item.group, Excluded::GlslangRejects, item.name.clone()));
                continue;
            }
            (true, false) => {
                excluded.push((item.group, Excluded::RglslRejects, item.name.clone()));
                continue;
            }
            (false, false) => {
                excluded.push((item.group, Excluded::BothReject, item.name.clone()));
                continue;
            }
        }
        let mut glslang_opt_warm = None;
        if tools.glslang_opt.is_some() {
            let warm = tools.warm_up(Compiler::GlslangOpt, item)?;
            if warm.accepted {
                glslang_opt_warm = Some(warm);
            } else {
                optimizer_failures.push(item.name.clone());
            }
        }
        let mut glslang_times = Vec::with_capacity(options.runs);
        let mut glslang_opt_times = Vec::with_capacity(options.runs);
        let mut rglsl_times = Vec::with_capacity(options.runs);
        for _ in 0..options.runs {
            glslang_times.push(tools.timed(Compiler::Glslang, item)?);
            if glslang_opt_warm.is_some() {
                glslang_opt_times.push(tools.timed(Compiler::GlslangOpt, item)?);
            }
            rglsl_times.push(tools.timed(Compiler::Rglsl, item)?);
        }
        measured.push(Measured {
            name: item.name.clone(),
            group: item.group,
            command_line: item.command_line(),
            glslang: sample(&glslang_times, glslang_warm.peak_rss)?,
            glslang_opt: glslang_opt_warm
                .map(|warm| sample(&glslang_opt_times, warm.peak_rss))
                .transpose()?,
            rglsl: sample(&rglsl_times, rglsl_warm.peak_rss)?,
        });
    }
    let elapsed = started.elapsed();
    if measured.is_empty() {
        bail!("neither compiler accepted any selected shader");
    }

    let suffix = options
        .debug_info
        .map(|debug| format!("-{}", debug.mode()))
        .unwrap_or_default();
    let report = markdown(
        &environment,
        &measured,
        &excluded,
        &optimizer_failures,
        options,
        elapsed,
    );
    let xtask_dir = root.join("target").join("xtask");
    let report_path = xtask_dir.join(format!("bench{suffix}.md"));
    let table_path = xtask_dir.join(format!("bench{suffix}.tsv"));
    fs::write(&report_path, &report)?;
    fs::write(&table_path, tsv(&measured))?;
    print!("{report}");
    eprintln!(
        "[xtask] report: {}\n[xtask] per-shader numbers: {}",
        report_path.display(),
        table_path.display()
    );
    Ok(0)
}

fn corpus_dir(root: &Path, options: &Options) -> Result<PathBuf> {
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
    Ok(glslang_dir)
}

fn sample(times: &[f64], peak_rss: Option<u64>) -> Result<Sample> {
    Ok(Sample {
        median: stats::median(times).context("no timed runs")?,
        min: stats::minimum(times).context("no timed runs")?,
        peak_rss,
    })
}

fn collect(
    root: &Path,
    glslang_dir: &Path,
    work: &Path,
    debug_info: Option<DebugInfo>,
) -> Result<Vec<Item>> {
    let debug_flag = debug_info.map(|debug| format!("-{}", debug.mode()));
    let test_dir = glslang_dir.join("Test");
    let mut items = Vec::new();
    for case in corpus::load(glslang_dir)? {
        items.push(corpus_item(&case, &test_dir, debug_info));
    }
    for case in groups::load_groups(glslang_dir)? {
        let Kind::Group {
            ref files,
            auto_map_bindings,
        } = case.kind
        else {
            continue;
        };
        let mut options: Vec<String> = [
            "-V",
            "--target-env",
            "vulkan1.0",
            "--target-env",
            "spirv1.0",
            "--auto-map-locations",
        ]
        .map(String::from)
        .to_vec();
        if auto_map_bindings {
            options.push("--auto-map-bindings".into());
        }
        options.extend(debug_flag.clone());
        items.push(Item {
            name: case.name.clone(),
            group: Group::GlslangLink,
            dir: work.join("link").join(case.name.replace(['/', '+'], "_")),
            options,
            glslang_options: Vec::new(),
            inputs: files.clone(),
            output: Output::WorkingDirectory,
            copy_from: Some(test_dir.clone()),
        });
    }
    for case in groups::load_own(root)? {
        let Kind::Own {
            ref dir,
            ref files,
            ref expectation,
            ..
        } = case.kind
        else {
            continue;
        };
        if !expectation.accept {
            continue;
        }
        let stages: BTreeSet<&str> = files
            .iter()
            .filter_map(|file| groups::stage_of(file))
            .collect();
        let mut options = vec!["-V".to_string()];
        options.extend(case.target.rglsl_args());
        if let (Some(stage), 1) = (stages.first(), stages.len()) {
            options.push("-S".into());
            options.push((*stage).into());
        }
        options.push("-l".into());
        options.extend(debug_flag.clone());
        items.push(Item {
            name: case.name.clone(),
            group: Group::OwnLink,
            dir: dir.clone(),
            options,
            glslang_options: Vec::new(),
            inputs: files.clone(),
            output: Output::File,
            copy_from: None,
        });
    }
    let synthetic_dir = work.join("synthetic");
    fs::create_dir_all(&synthetic_dir)?;
    for (name, text) in synthetic::shaders(synthetic::Sizes::DEFAULT) {
        fs::write(synthetic_dir.join(&name), text)?;
        let mut options = vec!["-V".to_string()];
        options.extend(debug_flag.clone());
        items.push(Item {
            name: format!("synthetic/{name}"),
            group: Group::Synthetic,
            dir: synthetic_dir.clone(),
            options,
            glslang_options: Vec::new(),
            inputs: vec![name],
            output: Output::File,
            copy_from: None,
        });
    }
    Ok(items)
}

pub fn corpus_item(case: &Case, test_dir: &Path, debug_info: Option<DebugInfo>) -> Item {
    let mut target = case.target;
    if let Some(debug) = debug_info {
        target.debug = Some(debug.mode());
    }
    let mut options = vec!["-V".to_string()];
    options.extend(target.rglsl_args());
    let runtests = corpus::runtests_options(&case.name);
    for directory in runtests.include_dirs {
        options.push(format!("-I{directory}"));
    }
    for line in runtests.preamble {
        options.push("--preamble-text".into());
        options.push((*line).into());
    }
    if runtests.hlsl_offsets {
        options.push("--hlsl-offsets".into());
    }
    Item {
        name: case.name.clone(),
        group: match case.corpus {
            Corpus::Vulkan => Group::Vulkan,
            Corpus::OpenGlAsVulkan | Corpus::Link | Corpus::Exec => Group::OpenGlAsVulkan,
        },
        dir: test_dir.to_path_buf(),
        options,
        glslang_options: target.glslang_only_args(),
        inputs: vec![case.name.clone()],
        output: Output::File,
        copy_from: None,
    }
}

#[derive(Debug)]
struct Environment {
    machine: Vec<(String, String)>,
    glslang: Vec<(String, String)>,
    rglsl: Vec<(String, String)>,
}

impl Environment {
    fn describe(root: &Path, glslang_dir: &Path, tool: &Tool, rglsl_build: &str) -> Self {
        let mut machine = Vec::new();
        if let Some(cpu) = cpu_model() {
            machine.push(("CPU".into(), cpu));
        }
        if let Ok(cpus) = std::thread::available_parallelism() {
            machine.push(("logical CPUs".into(), cpus.to_string()));
        }
        if let Some(memory) = memory_bytes() {
            machine.push((
                "memory".into(),
                format!("{:.0} GiB", memory as f64 / f64::from(1u32 << 30)),
            ));
        }
        machine.push(("OS".into(), os_description()));

        let mut glslang = Vec::new();
        let pinned =
            oracles::load_pins(root).map_or_else(|_| "unknown".into(), |pins| pins.glslang.commit);
        glslang.push(("pinned commit (oracles.toml)".into(), pinned));
        if tool.pinned {
            let cache = oracles::oracles_dir(root)
                .join("build")
                .join("glslang")
                .join("CMakeCache.txt");
            if let Ok(text) = fs::read_to_string(&cache) {
                if let Some(head) = cmake_value(&text, "CMAKE_HOME_DIRECTORY")
                    .and_then(|source| oracles::git_head(Path::new(&source)).ok())
                {
                    glslang.push(("built from commit".into(), head));
                }
                let build_type = cmake_value(&text, "CMAKE_BUILD_TYPE").unwrap_or_default();
                let flags = cmake_value(
                    &text,
                    &format!("CMAKE_CXX_FLAGS_{}", build_type.to_uppercase()),
                )
                .unwrap_or_default();
                glslang.push(("build type".into(), format!("{build_type} (`{flags}`)")));
            }
        } else {
            glslang.push((
                "binary".into(),
                "unpinned (not built by `cargo xtask oracles`)".into(),
            ));
        }
        if let Ok(version) = process::capture(Command::new(&tool.path).arg("--version"))
            && let Some(line) = version.lines().next()
        {
            glslang.push(("version".into(), line.trim().to_string()));
        }
        if let Ok(head) = oracles::git_head(glslang_dir) {
            glslang.push(("corpus checkout".into(), head));
        }

        let mut rglsl = Vec::new();
        let commit = oracles::git_head(root).unwrap_or_else(|_| "unknown".into());
        let dirty = process::capture(Command::new("git").arg("-C").arg(root).args([
            "status",
            "--porcelain",
            "--untracked-files=no",
        ]))
        .is_ok_and(|status| !status.is_empty());
        rglsl.push((
            "commit".into(),
            if dirty {
                format!("{commit} (with uncommitted changes)")
            } else {
                commit
            },
        ));
        rglsl.push(("build".into(), rglsl_build.into()));
        if let Ok(version) = process::capture(Command::new("rustc").arg("--version")) {
            rglsl.push(("rustc".into(), version));
        }
        Self {
            machine,
            glslang,
            rglsl,
        }
    }
}

fn cmake_value(cache: &str, name: &str) -> Option<String> {
    cache.lines().find_map(|line| {
        let (key, value) = line.split_once('=')?;
        let (key, _) = key.split_once(':')?;
        (key == name).then(|| value.trim().to_string())
    })
}

fn cpu_model() -> Option<String> {
    match std::env::consts::OS {
        "macos" => {
            process::capture(Command::new("sysctl").args(["-n", "machdep.cpu.brand_string"])).ok()
        }
        "linux" => fs::read_to_string("/proc/cpuinfo").ok().and_then(|text| {
            text.lines().find_map(|line| {
                let (key, value) = line.split_once(':')?;
                (key.trim() == "model name").then(|| value.trim().to_string())
            })
        }),
        "windows" => std::env::var("PROCESSOR_IDENTIFIER").ok(),
        _ => None,
    }
}

fn memory_bytes() -> Option<u64> {
    match std::env::consts::OS {
        "macos" => process::capture(Command::new("sysctl").args(["-n", "hw.memsize"]))
            .ok()?
            .parse()
            .ok(),
        "linux" => fs::read_to_string("/proc/meminfo").ok().and_then(|text| {
            text.lines().find_map(|line| {
                let rest = line.strip_prefix("MemTotal:")?;
                let kib: u64 = rest.trim().strip_suffix("kB")?.trim().parse().ok()?;
                Some(kib * 1024)
            })
        }),
        _ => None,
    }
}

fn os_description() -> String {
    let arch = std::env::consts::ARCH;
    match std::env::consts::OS {
        "macos" => {
            let version = process::capture(Command::new("sw_vers").arg("-productVersion"))
                .unwrap_or_default();
            let build =
                process::capture(Command::new("sw_vers").arg("-buildVersion")).unwrap_or_default();
            format!("macOS {version} ({build}), {arch}")
        }
        "linux" => {
            let name = fs::read_to_string("/etc/os-release")
                .ok()
                .and_then(|text| {
                    text.lines().find_map(|line| {
                        line.strip_prefix("PRETTY_NAME=")
                            .map(|value| value.trim_matches('"').to_string())
                    })
                })
                .unwrap_or_else(|| "Linux".into());
            format!("{name}, {arch}")
        }
        other => format!("{other}, {arch}"),
    }
}

fn milliseconds(value: f64) -> String {
    format!("{value:.2} ms")
}

fn seconds(value_ms: f64) -> String {
    format!("{:.2} s", value_ms / 1000.0)
}

fn times(value: Option<f64>) -> String {
    value.map_or_else(|| "-".into(), |value| format!("{value:.2}×"))
}

fn mebibytes(value: Option<f64>) -> String {
    value.map_or_else(
        || "-".into(),
        |value| format!("{:.1} MiB", value / f64::from(1u32 << 20)),
    )
}

#[derive(Debug, Clone, Copy)]
struct Summary {
    count: usize,
    glslang_total: f64,
    rglsl_total: f64,
    glslang_median: Option<f64>,
    rglsl_median: Option<f64>,
    geomean: Option<f64>,
}

fn summarize<'a>(measured: impl Iterator<Item = &'a Measured>) -> Summary {
    let mut glslang = Vec::new();
    let mut rglsl = Vec::new();
    let mut ratios = Vec::new();
    for shader in measured {
        glslang.push(shader.glslang.median);
        rglsl.push(shader.rglsl.median);
        ratios.extend(shader.ratio());
    }
    Summary {
        count: glslang.len(),
        glslang_total: glslang.iter().sum(),
        rglsl_total: rglsl.iter().sum(),
        glslang_median: stats::median(&glslang),
        rglsl_median: stats::median(&rglsl),
        geomean: stats::geometric_mean(&ratios),
    }
}

fn summary_row(out: &mut String, label: &str, summary: Summary) {
    let _ = writeln!(
        out,
        "| {label} | {} | {} | {} | {} | {} | {} | {} |",
        summary.count,
        seconds(summary.glslang_total),
        seconds(summary.rglsl_total),
        times(stats::ratio(summary.rglsl_total, summary.glslang_total)),
        summary
            .glslang_median
            .map_or_else(|| "-".into(), milliseconds),
        summary
            .rglsl_median
            .map_or_else(|| "-".into(), milliseconds),
        times(summary.geomean),
    );
}

fn shader_table(out: &mut String, title: &str, shaders: &[&Measured]) {
    let _ = writeln!(out, "\n### {title}\n");
    out.push_str("| shader | set | glslang | rglsl | rglsl/glslang |\n|---|---|--:|--:|--:|\n");
    for shader in shaders {
        let _ = writeln!(
            out,
            "| `{}` | {} | {} | {} | {} |",
            shader.name,
            shader.group.key(),
            milliseconds(shader.glslang.median),
            milliseconds(shader.rglsl.median),
            times(shader.ratio()),
        );
    }
}

fn markdown(
    environment: &Environment,
    measured: &[Measured],
    excluded: &[(Group, Excluded, String)],
    optimizer_failures: &[String],
    options: &Options,
    elapsed: Duration,
) -> String {
    let mut out = String::from("# Compile time: rglsl vs glslang\n\n");
    let mode = options.debug_info.map_or_else(
        || "no extra debug information (corpus cases keep their own `-g`/`-gVS`)".to_string(),
        |debug| format!("`-{}` added to every command line", debug.mode()),
    );
    let _ = writeln!(
        out,
        "Each compiler runs as a command-line tool with the same command line, writing SPIR-V to a file, \
         one process at a time on this machine. Per shader: one warm-up run of each (it also decides \
         whether both accept the shader and measures peak RSS with `/usr/bin/time`), then {} timed runs \
         alternating glslang, `glslang -O` (the pinned glslang with the optimizer, `glslang-opt -O`, \
         when it is built) and rglsl; the time of a shader is the median wall time of its runs, \
         process start-up included. Debug information: {mode}.\n",
        options.runs
    );
    for (title, facts) in [
        ("Machine", &environment.machine),
        ("glslang (glslangValidator)", &environment.glslang),
        ("rglsl", &environment.rglsl),
    ] {
        let _ = writeln!(out, "**{title}**\n");
        for (key, value) in facts {
            let _ = writeln!(out, "- {key}: {value}");
        }
        out.push('\n');
    }

    out.push_str("## Summary\n\n");
    out.push_str("Totals are sums of the per-shader medians; \"median\" is the median shader; the geometric mean is over the per-shader rglsl/glslang ratios (below 1: rglsl is faster).\n\n");
    out.push_str("| shader set | shaders | glslang total | rglsl total | rglsl/glslang (totals) | glslang median | rglsl median | geometric mean of rglsl/glslang |\n|---|--:|--:|--:|--:|--:|--:|--:|\n");
    for group in Group::ALL {
        let summary = summarize(measured.iter().filter(|shader| shader.group == group));
        if summary.count > 0 {
            summary_row(&mut out, group.label(), summary);
        }
    }
    summary_row(&mut out, "**all**", summarize(measured.iter()));

    let glslang_rss: Vec<f64> = measured
        .iter()
        .filter_map(|shader| shader.glslang.peak_rss.map(|rss| rss as f64))
        .collect();
    let rglsl_rss: Vec<f64> = measured
        .iter()
        .filter_map(|shader| shader.rglsl.peak_rss.map(|rss| rss as f64))
        .collect();
    if !glslang_rss.is_empty() || !rglsl_rss.is_empty() {
        out.push_str("\n## Peak resident memory per process\n\n");
        out.push_str("| | glslang | rglsl |\n|---|--:|--:|\n");
        let _ = writeln!(
            out,
            "| median shader | {} | {} |",
            mebibytes(stats::median(&glslang_rss)),
            mebibytes(stats::median(&rglsl_rss))
        );
        let maximum = |values: &[f64]| values.iter().copied().max_by(f64::total_cmp);
        let _ = writeln!(
            out,
            "| largest | {} | {} |",
            mebibytes(maximum(&glslang_rss)),
            mebibytes(maximum(&rglsl_rss))
        );
    }

    let rows: Vec<budget::Row> = measured.iter().filter_map(Measured::budget_row).collect();
    budget::section(
        &mut out,
        &rows,
        &Group::ALL,
        "`glslang -O` − glslang per shader, process start-up cancelled out (noisy for tiny shaders)",
        optimizer_failures.len(),
    );
    if !optimizer_failures.is_empty() {
        let names: Vec<String> = optimizer_failures
            .iter()
            .map(|name| format!("`{name}`"))
            .collect();
        let _ = writeln!(out, "\n`glslang -O` fails on: {}.", names.join(", "));
    }

    out.push_str("\n## Shaders\n");
    let top = 10;
    let mut by_glslang: Vec<&Measured> = measured.iter().collect();
    by_glslang.sort_by(|a, b| b.glslang.median.total_cmp(&a.glslang.median));
    by_glslang.truncate(top);
    shader_table(&mut out, "Slowest for glslang", &by_glslang);
    let mut by_rglsl: Vec<&Measured> = measured.iter().collect();
    by_rglsl.sort_by(|a, b| b.rglsl.median.total_cmp(&a.rglsl.median));
    by_rglsl.truncate(top);
    shader_table(&mut out, "Slowest for rglsl", &by_rglsl);
    let mut by_ratio: Vec<&Measured> = measured.iter().collect();
    by_ratio.sort_by(|a, b| {
        b.ratio()
            .unwrap_or(0.0)
            .total_cmp(&a.ratio().unwrap_or(0.0))
    });
    let highest: Vec<&Measured> = by_ratio.iter().take(top).copied().collect();
    shader_table(&mut out, "Highest rglsl/glslang ratios", &highest);
    let lowest: Vec<&Measured> = by_ratio.iter().rev().take(top).copied().collect();
    shader_table(&mut out, "Lowest rglsl/glslang ratios", &lowest);

    out.push_str("\n## Not measured\n\n");
    out.push_str(
        "Shaders that one of the compilers rejects with this command line are left out.\n\n",
    );
    if excluded.is_empty() {
        out.push_str("None.\n");
    } else {
        out.push_str(
            "| shader set | glslang rejects | rglsl rejects | both reject |\n|---|--:|--:|--:|\n",
        );
    }
    for group in Group::ALL {
        let count = |kind: Excluded| {
            excluded
                .iter()
                .filter(|(g, k, _)| *g == group && *k == kind)
                .count()
        };
        let counts = [
            count(Excluded::GlslangRejects),
            count(Excluded::RglslRejects),
            count(Excluded::BothReject),
        ];
        if counts.iter().any(|&count| count > 0) {
            let _ = writeln!(
                out,
                "| {} | {} | {} | {} |",
                group.label(),
                counts[0],
                counts[1],
                counts[2]
            );
        }
    }
    for (kind, title) in [
        (Excluded::GlslangRejects, "Only glslang rejects"),
        (Excluded::RglslRejects, "Only rglsl rejects"),
    ] {
        let names: Vec<String> = excluded
            .iter()
            .filter(|(_, k, _)| *k == kind)
            .map(|(_, _, name)| format!("`{name}`"))
            .collect();
        if !names.is_empty() {
            let _ = writeln!(out, "\n{title}: {}.", names.join(", "));
        }
    }
    let _ = writeln!(
        out,
        "\nBenchmark wall time: {:.0} s.",
        elapsed.as_secs_f64()
    );
    out
}

fn tsv(measured: &[Measured]) -> String {
    let mut out = String::from(
        "shader\tset\tglslang_median_ms\trglsl_median_ms\tratio\tglslang_min_ms\trglsl_min_ms\tglslang_peak_rss_kib\trglsl_peak_rss_kib\tglslang_opt_median_ms\tglslang_opt_min_ms\tglslang_opt_peak_rss_kib\tbudget_ms\tcommand_line\n",
    );
    let kib = |rss: Option<u64>| rss.map_or_else(String::new, |rss| (rss / 1024).to_string());
    let optional =
        |value: Option<f64>| value.map_or_else(String::new, |value| format!("{value:.3}"));
    for shader in measured {
        let opt = shader.glslang_opt;
        let _ = writeln!(
            out,
            "{}\t{}\t{:.3}\t{:.3}\t{}\t{:.3}\t{:.3}\t{}\t{}\t{}\t{}\t{}\t{}\t{}",
            shader.name,
            shader.group.key(),
            shader.glslang.median,
            shader.rglsl.median,
            shader
                .ratio()
                .map_or_else(String::new, |ratio| format!("{ratio:.3}")),
            shader.glslang.min,
            shader.rglsl.min,
            kib(shader.glslang.peak_rss),
            kib(shader.rglsl.peak_rss),
            optional(opt.map(|sample| sample.median)),
            optional(opt.map(|sample| sample.min)),
            kib(opt.and_then(|sample| sample.peak_rss)),
            optional(shader.budget_row().map(|row| row.budget())),
            shader.command_line,
        );
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    fn shader(name: &str, group: Group, glslang: f64, rglsl: f64) -> Measured {
        let sample = |median| Sample {
            median,
            min: median,
            peak_rss: Some(4 << 20),
        };
        Measured {
            name: name.into(),
            group,
            command_line: String::new(),
            glslang: sample(glslang),
            glslang_opt: Some(sample(glslang * 2.0)),
            rglsl: sample(rglsl),
        }
    }

    #[test]
    fn summary_uses_totals_medians_and_geometric_mean() {
        let measured = [
            shader("a.frag", Group::Vulkan, 10.0, 5.0),
            shader("b.frag", Group::Vulkan, 20.0, 40.0),
            shader("c.frag", Group::Synthetic, 30.0, 30.0),
        ];
        let summary = summarize(measured.iter());
        assert_eq!(summary.count, 3);
        assert!((summary.glslang_total - 60.0).abs() < 1e-9);
        assert!((summary.rglsl_total - 75.0).abs() < 1e-9);
        assert_eq!(summary.glslang_median, Some(20.0));
        assert_eq!(summary.rglsl_median, Some(30.0));
        assert!(summary.geomean.is_some_and(|g| (g - 1.0).abs() < 1e-9));
    }

    #[test]
    fn debug_info_modes() {
        assert_eq!(DebugInfo::parse("g"), Some(DebugInfo::Basic));
        assert_eq!(DebugInfo::parse("gVS"), Some(DebugInfo::NonSemantic));
        assert_eq!(DebugInfo::parse("gV"), None);
    }

    #[test]
    fn command_line_names_the_output() {
        let item = Item {
            name: "x.frag".into(),
            group: Group::Vulkan,
            dir: PathBuf::from("."),
            options: vec!["-V".into(), "-gVS".into()],
            glslang_options: Vec::new(),
            inputs: vec!["x.frag".into()],
            output: Output::File,
            copy_from: None,
        };
        assert_eq!(item.command_line(), "-V -gVS -o OUT.spv x.frag");
        assert_eq!(
            item.arguments(Compiler::Glslang, Path::new("o.spv")),
            ["-V", "-gVS", "-o", "o.spv", "x.frag"].map(OsString::from)
        );
        assert_eq!(
            item.arguments(Compiler::GlslangOpt, Path::new("o.spv")),
            ["-O", "-V", "-gVS", "-o", "o.spv", "x.frag"].map(OsString::from)
        );
    }

    #[test]
    fn reads_cmake_cache_values() {
        let cache = "// comment\nCMAKE_BUILD_TYPE:STRING=Release\nCMAKE_CXX_FLAGS_RELEASE:STRING=-O3 -DNDEBUG\n";
        assert_eq!(
            cmake_value(cache, "CMAKE_BUILD_TYPE").as_deref(),
            Some("Release")
        );
        assert_eq!(
            cmake_value(cache, "CMAKE_CXX_FLAGS_RELEASE").as_deref(),
            Some("-O3 -DNDEBUG")
        );
        assert_eq!(cmake_value(cache, "MISSING"), None);
    }

    #[test]
    fn report_lists_every_set_and_the_exclusions() {
        let measured = [
            shader("a.frag", Group::Vulkan, 10.0, 5.0),
            shader("link/x", Group::OwnLink, 20.0, 10.0),
        ];
        let options = Options {
            glslang_dir: None,
            filter: None,
            runs: 3,
            debug_info: Some(DebugInfo::NonSemantic),
            timeout_secs: 1,
            in_process: false,
        };
        let environment = Environment {
            machine: vec![("CPU".into(), "test".into())],
            glslang: Vec::new(),
            rglsl: Vec::new(),
        };
        let report = markdown(
            &environment,
            &measured,
            &[(
                Group::Synthetic,
                Excluded::RglslRejects,
                "synthetic/x.frag".into(),
            )],
            &["o.frag".into()],
            &options,
            Duration::from_secs(1),
        );
        assert!(report.contains("| glslang corpus, Vulkan tests | 1 |"));
        assert!(report.contains("| rglsl link tests | 1 |"));
        assert!(report.contains("| synthetic large shaders | 0 | 1 | 0 |"));
        assert!(report.contains("`-gVS` added"));
        assert!(report.contains("Only rglsl rejects: `synthetic/x.frag`."));
        assert!(report.contains("0.50×"));
        assert!(report.contains("## Optimizer budget"));
        assert!(report.contains("`glslang -O` fails on: `o.frag`."));
        let table = tsv(&measured);
        assert_eq!(table.lines().count(), 3);
        assert!(table.contains("a.frag\tvulkan\t10.000\t5.000\t0.500"));
        assert!(table.contains("\t20.000\t20.000\t4096\t15.000\t"));
    }
}
