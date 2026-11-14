use std::collections::BTreeMap;
use std::fmt::Write as _;
use std::fs;
use std::io::{BufRead as _, BufReader, Write as _};
use std::path::{Path, PathBuf};
use std::process::{Child, ChildStdin, ChildStdout, Command, Stdio};
use std::time::{Duration, Instant};

use anyhow::{Context as _, Result, bail};

use super::{
    DebugInfo, Environment, Excluded, Group, Options, Summary, cmake_value, milliseconds, seconds,
    stats, summary_row, synthetic, times,
};
use crate::corpus::{self, Corpus};
use crate::oracles::{self, Tool};
use crate::process;

const GROUPS: [Group; 3] = [Group::Vulkan, Group::OpenGlAsVulkan, Group::Synthetic];

#[derive(Debug, Clone)]
struct Job {
    name: String,
    group: Group,
    path: PathBuf,
    stage: String,
    vulkan: (u8, u8),
    spirv: (u8, u8),
    automap: bool,
    relax: bool,
    hlsl_offsets: bool,
    debug: Option<&'static str>,
    include_dirs: Vec<PathBuf>,
    preamble: String,
}

impl Job {
    fn synthetic(name: &str, path: PathBuf, debug_info: Option<DebugInfo>) -> Self {
        Self {
            name: format!("synthetic/{name}"),
            group: Group::Synthetic,
            stage: path
                .extension()
                .map(|extension| extension.to_string_lossy().into_owned())
                .unwrap_or_default(),
            path,
            vulkan: (1, 0),
            spirv: (1, 0),
            automap: false,
            relax: false,
            hlsl_offsets: false,
            debug: debug_info.map(DebugInfo::mode),
            include_dirs: Vec::new(),
            preamble: String::new(),
        }
    }

    fn line(&self, runs: usize) -> String {
        let flag = |value: bool| String::from(if value { "1" } else { "0" });
        let version = |(major, minor): (u8, u8)| format!("{major}.{minor}");
        let mut fields = vec![
            ("path", self.path.to_string_lossy().into_owned()),
            ("stage", self.stage.clone()),
            ("vulkan", version(self.vulkan)),
            ("spirv", version(self.spirv)),
            ("automap", flag(self.automap)),
            ("relax", flag(self.relax)),
            ("hlsl-offsets", flag(self.hlsl_offsets)),
            ("debug", self.debug.unwrap_or_default().to_string()),
            ("preamble", self.preamble.clone()),
            ("runs", runs.to_string()),
        ];
        fields.extend(
            self.include_dirs
                .iter()
                .map(|directory| ("include", directory.to_string_lossy().into_owned())),
        );
        fields
            .iter()
            .map(|(key, value)| format!("{key}={}", escape(value)))
            .collect::<Vec<_>>()
            .join("\t")
    }

    fn command_line(&self) -> String {
        let mut words = vec![
            "-V".to_string(),
            "--target-env".into(),
            format!("vulkan{}.{}", self.vulkan.0, self.vulkan.1),
            "--target-env".into(),
            format!("spirv{}.{}", self.spirv.0, self.spirv.1),
        ];
        if self.automap {
            words.push("--auto-map-locations".into());
            words.push("--auto-map-bindings".into());
        }
        if self.relax {
            words.push("--relax-set-binding-limits".into());
        }
        if self.hlsl_offsets {
            words.push("--hlsl-offsets".into());
        }
        if let Some(debug) = self.debug {
            words.push(format!("-{debug}"));
        }
        for directory in &self.include_dirs {
            words.push(format!("-I{}", directory.display()));
        }
        for line in self.preamble.lines() {
            words.push("--preamble-text".into());
            words.push(format!("'{line}'"));
        }
        words.push(self.name.clone());
        words.join(" ")
    }
}

fn escape(text: &str) -> String {
    text.replace('\\', "\\\\")
        .replace('\t', "\\t")
        .replace('\n', "\\n")
}

fn unescape(text: &str) -> String {
    let mut out = String::with_capacity(text.len());
    let mut characters = text.chars();
    while let Some(character) = characters.next() {
        if character != '\\' {
            out.push(character);
            continue;
        }
        match characters.next() {
            Some('n') => out.push('\n'),
            Some('t') => out.push('\t'),
            Some(other) => out.push(other),
            None => out.push('\\'),
        }
    }
    out
}

#[derive(Debug, Default)]
struct Fields {
    numbers: BTreeMap<String, Vec<f64>>,
    notes: BTreeMap<String, String>,
}

impl Fields {
    fn values(&self, key: &str) -> Result<&[f64]> {
        self.numbers
            .get(key)
            .map(Vec::as_slice)
            .with_context(|| format!("the harness reply has no `{key}`"))
    }

    fn median(&self, key: &str) -> Result<f64> {
        stats::median(self.values(key)?).with_context(|| format!("no values of `{key}`"))
    }

    fn optional_median(&self, key: &str) -> Option<f64> {
        self.numbers
            .get(key)
            .and_then(|values| stats::median(values))
    }
}

#[derive(Debug)]
enum Reply {
    Accepted(Fields),
    Rejected(String),
    Crashed(String),
}

impl Reply {
    fn parse(line: &str) -> Result<Self> {
        let mut parts = line.split('\t');
        match parts.next() {
            Some("ok") => {
                let mut fields = Fields::default();
                for part in parts {
                    let (key, value) = part
                        .split_once('=')
                        .with_context(|| format!("bad harness reply field `{part}`"))?;
                    let numbers: Result<Vec<f64>, _> = value.split(',').map(str::parse).collect();
                    match numbers {
                        Ok(numbers) => {
                            fields.numbers.insert(key.to_string(), numbers);
                        }
                        Err(_) => {
                            fields.notes.insert(key.to_string(), unescape(value));
                        }
                    }
                }
                Ok(Self::Accepted(fields))
            }
            Some("rejected") => Ok(Self::Rejected(unescape(
                &parts.collect::<Vec<_>>().join("\t"),
            ))),
            _ => bail!("unexpected harness reply: {line}"),
        }
    }
}

#[derive(Debug)]
struct Running {
    child: Child,
    input: ChildStdin,
    output: BufReader<ChildStdout>,
}

impl Running {
    fn spawn(program: &Path) -> Result<Self> {
        let mut child = Command::new(program)
            .stdin(Stdio::piped())
            .stdout(Stdio::piped())
            .stderr(Stdio::inherit())
            .spawn()
            .with_context(|| format!("starting {}", program.display()))?;
        let input = child.stdin.take().context("no stdin of the harness")?;
        let output = child.stdout.take().context("no stdout of the harness")?;
        Ok(Self {
            child,
            input,
            output: BufReader::new(output),
        })
    }

    fn exchange(&mut self, line: &str) -> Result<Option<String>> {
        writeln!(self.input, "{line}")?;
        self.input.flush()?;
        let mut answer = String::new();
        if self.output.read_line(&mut answer)? == 0 {
            return Ok(None);
        }
        Ok(Some(answer.trim_end_matches(['\n', '\r']).to_string()))
    }
}

#[derive(Debug)]
struct Harness {
    program: PathBuf,
    running: Running,
}

impl Harness {
    fn start(program: PathBuf) -> Result<Self> {
        let running = Running::spawn(&program)?;
        Ok(Self { program, running })
    }

    fn request(&mut self, line: &str) -> Result<Reply> {
        match self.running.exchange(line) {
            Ok(Some(answer)) => Reply::parse(&answer),
            Ok(None) | Err(_) => {
                let status = self
                    .running
                    .child
                    .wait()
                    .map_or_else(|error| error.to_string(), |status| status.to_string());
                self.running = Running::spawn(&self.program)?;
                Ok(Reply::Crashed(status))
            }
        }
    }

    fn finish(self) -> Result<()> {
        let Running {
            mut child, input, ..
        } = self.running;
        drop(input);
        child.wait()?;
        Ok(())
    }
}

#[derive(Debug, Clone)]
struct GlslangSample {
    first: f64,
    steady: f64,
    parse: f64,
    link: f64,
    spv: f64,
    words: f64,
}

impl GlslangSample {
    fn new(fields: &Fields) -> Result<Self> {
        Ok(Self {
            first: fields.median("first")?,
            steady: fields.median("steady")?,
            parse: fields.median("parse")?,
            link: fields.median("link")?,
            spv: fields.median("spv")?,
            words: fields.median("words")?,
        })
    }
}

#[derive(Debug, Clone)]
struct RglslSample {
    first: f64,
    steady: f64,
    fresh: f64,
    pp: f64,
    parse: f64,
    sema: f64,
    lowering: f64,
    validate: f64,
    link: f64,
    spv: f64,
    words: f64,
    compiler_first: Option<f64>,
    compiler: Option<f64>,
}

impl RglslSample {
    fn new(fields: &Fields) -> Result<Self> {
        let pp = fields.values("pp")?;
        let parse = fields.values("parse")?;
        let sema = fields.values("sema")?;
        let lowering: Vec<f64> = fields
            .values("frontend")?
            .iter()
            .zip(pp.iter().zip(parse.iter().zip(sema)))
            .map(|(frontend, (pp, (parse, sema)))| frontend - pp - parse - sema)
            .collect();
        Ok(Self {
            first: fields.median("first")?,
            steady: fields.median("steady")?,
            fresh: fields.median("fresh")?,
            pp: fields.median("pp")?,
            parse: fields.median("parse")?,
            sema: fields.median("sema")?,
            lowering: stats::median(&lowering).context("no lowering times")?,
            validate: fields.median("validate")?,
            link: fields.median("link")?,
            spv: fields.median("spv")?,
            words: fields.median("words")?,
            compiler_first: fields.optional_median("compiler_first"),
            compiler: fields.optional_median("compiler"),
        })
    }
}

#[derive(Debug, Clone)]
struct Measured {
    name: String,
    group: Group,
    command_line: String,
    glslang: GlslangSample,
    rglsl: RglslSample,
}

impl Measured {
    fn steady_ratio(&self) -> Option<f64> {
        stats::ratio(self.rglsl.steady, self.glslang.steady)
    }

    fn first_ratio(&self) -> Option<f64> {
        stats::ratio(self.rglsl.first, self.glslang.first)
    }
}

#[derive(Debug, Clone)]
struct Crash {
    group: Group,
    compiler: &'static str,
    name: String,
    status: String,
}

#[derive(Debug, Default)]
struct Outcome {
    measured: Vec<Measured>,
    rejected: Vec<(Group, Excluded, String)>,
    crashes: Vec<Crash>,
    compiler_rejects: Vec<(String, String)>,
    no_link: Vec<String>,
    load_before: Option<String>,
    load_after: Option<String>,
    elapsed: Duration,
}

pub fn run(root: &Path, glslang_dir: &Path, options: &Options) -> Result<i32> {
    let bench_dir = root.join("target").join("xtask").join("bench-in-process");
    fs::create_dir_all(&bench_dir)?;
    let compiler = std::env::var("CXX").unwrap_or_else(|_| "c++".into());
    let glslang_program = build_glslang_harness(root, &bench_dir, &compiler)?;
    let rglsl_program = build_rglsl_harness(root)?;

    let synthetic_dir = bench_dir.join("synthetic");
    fs::create_dir_all(&synthetic_dir)?;
    let mut synthetic_jobs = Vec::new();
    for (name, text) in synthetic::shaders(synthetic::Sizes::DEFAULT) {
        let path = synthetic_dir.join(&name);
        fs::write(&path, text)?;
        synthetic_jobs.push(Job::synthetic(&name, path, options.debug_info));
    }
    let warm_up = synthetic_jobs
        .first()
        .cloned()
        .context("no synthetic shaders")?;
    let (mut jobs, mut no_link) = collect(glslang_dir, options.debug_info)?;
    jobs.extend(synthetic_jobs);
    if let Some(filter) = &options.filter {
        let selected = |name: &String| filter.split(',').any(|part| name.contains(part));
        jobs.retain(|job| selected(&job.name));
        no_link.retain(selected);
    }
    if jobs.is_empty() {
        bail!("no shaders selected");
    }

    let tool = Tool {
        path: oracles::oracles_dir(root)
            .join("bin")
            .join(format!("glslang{}", std::env::consts::EXE_SUFFIX)),
        pinned: true,
    };
    let mut environment = Environment::describe(
        root,
        glslang_dir,
        &tool,
        "cargo --release -p rglsl-bench-harness (workspace release profile)",
    );
    environment.glslang.push((
        "harness".into(),
        format!(
            "xtask/harness/glslang.cpp, built with `{compiler} -O2` against libglslang.a of target/oracles/build/glslang"
        ),
    ));

    let mut glslang = Harness::start(glslang_program)?;
    let mut rglsl = Harness::start(rglsl_program)?;
    let warm_line = warm_up.line(1);
    for (name, harness) in [("glslang", &mut glslang), ("rglsl", &mut rglsl)] {
        match harness.request(&warm_line)? {
            Reply::Accepted(_) => {}
            Reply::Rejected(reason) | Reply::Crashed(reason) => {
                bail!(
                    "the {name} harness fails on {}: {reason}",
                    warm_up.path.display()
                );
            }
        }
    }

    let mut outcome = Outcome {
        no_link,
        load_before: load_average(),
        ..Outcome::default()
    };
    let started = Instant::now();
    for (index, job) in jobs.iter().enumerate() {
        if index > 0 && index % 100 == 0 {
            eprintln!(
                "[xtask] {index} / {} ({:.0}s)",
                jobs.len(),
                started.elapsed().as_secs_f64()
            );
        }
        let line = job.line(options.runs);
        let glslang_reply = glslang.request(&line)?;
        let rglsl_reply = rglsl.request(&line)?;
        record(&mut outcome, job, glslang_reply, rglsl_reply)?;
    }
    outcome.elapsed = started.elapsed();
    outcome.load_after = load_average();
    glslang.finish()?;
    rglsl.finish()?;
    if outcome.measured.is_empty() {
        bail!("neither compiler accepted any selected shader");
    }

    let suffix = options
        .debug_info
        .map(|debug| format!("-{}", debug.mode()))
        .unwrap_or_default();
    let report = markdown(&environment, &outcome, options);
    let xtask_dir = root.join("target").join("xtask");
    let report_path = xtask_dir.join(format!("bench-in-process{suffix}.md"));
    let table_path = xtask_dir.join(format!("bench-in-process{suffix}.tsv"));
    fs::write(&report_path, &report)?;
    fs::write(&table_path, tsv(&outcome.measured))?;
    print!("{report}");
    eprintln!(
        "[xtask] report: {}\n[xtask] per-shader numbers: {}",
        report_path.display(),
        table_path.display()
    );
    Ok(0)
}

fn record(outcome: &mut Outcome, job: &Job, glslang: Reply, rglsl: Reply) -> Result<()> {
    let mut crashed = false;
    for (compiler, reply) in [("glslang", &glslang), ("rglsl", &rglsl)] {
        if let Reply::Crashed(ref status) = *reply {
            outcome.crashes.push(Crash {
                group: job.group,
                compiler,
                name: job.name.clone(),
                status: status.clone(),
            });
            crashed = true;
        }
    }
    if crashed {
        return Ok(());
    }
    let excluded = match (glslang, rglsl) {
        (Reply::Accepted(glslang), Reply::Accepted(rglsl)) => {
            if let Some(reason) = rglsl.notes.get("compiler_rejects") {
                outcome
                    .compiler_rejects
                    .push((job.name.clone(), first_line(reason)));
            }
            outcome.measured.push(Measured {
                name: job.name.clone(),
                group: job.group,
                command_line: job.command_line(),
                glslang: GlslangSample::new(&glslang)
                    .with_context(|| format!("glslang on {}", job.name))?,
                rglsl: RglslSample::new(&rglsl)
                    .with_context(|| format!("rglsl on {}", job.name))?,
            });
            return Ok(());
        }
        (Reply::Accepted(_), _) => Excluded::RglslRejects,
        (_, Reply::Accepted(_)) => Excluded::GlslangRejects,
        _ => Excluded::BothReject,
    };
    outcome
        .rejected
        .push((job.group, excluded, job.name.clone()));
    Ok(())
}

fn first_line(text: &str) -> String {
    let line = text.lines().next().unwrap_or_default();
    match line.char_indices().nth(160) {
        Some((cut, _)) => format!("{}…", &line[..cut]),
        None => line.to_string(),
    }
}

fn collect(glslang_dir: &Path, debug_info: Option<DebugInfo>) -> Result<(Vec<Job>, Vec<String>)> {
    let test_dir = glslang_dir.join("Test");
    let mut jobs = Vec::new();
    let mut no_link = Vec::new();
    for case in corpus::load(glslang_dir)? {
        if !case.kind.is_file() {
            continue;
        }
        if case.target.compile_only {
            no_link.push(case.name);
            continue;
        }
        let runtests = corpus::runtests_options(&case.name);
        jobs.push(Job {
            group: match case.corpus {
                Corpus::Vulkan => Group::Vulkan,
                Corpus::OpenGlAsVulkan | Corpus::Link | Corpus::Exec => Group::OpenGlAsVulkan,
            },
            path: case.path.clone(),
            stage: case.stage.to_string(),
            vulkan: case.target.vulkan,
            spirv: case.target.spirv,
            automap: case.target.automap,
            relax: case.target.relax_set_binding_limits,
            hlsl_offsets: runtests.hlsl_offsets,
            debug: debug_info.map(DebugInfo::mode).or(case.target.debug),
            include_dirs: runtests
                .include_dirs
                .iter()
                .map(|directory| test_dir.join(directory))
                .collect(),
            preamble: runtests
                .preamble
                .iter()
                .map(|line| format!("{line}\n"))
                .collect(),
            name: case.name,
        });
    }
    Ok((jobs, no_link))
}

fn build_rglsl_harness(root: &Path) -> Result<PathBuf> {
    let cargo = std::env::var_os("CARGO").unwrap_or_else(|| "cargo".into());
    process::checked(
        Command::new(cargo).current_dir(root).args([
            "build",
            "--release",
            "-p",
            "rglsl-bench-harness",
        ]),
        "building the in-process rglsl harness",
    )?;
    Ok(root.join("target").join("release").join(format!(
        "rglsl-bench-harness{}",
        std::env::consts::EXE_SUFFIX
    )))
}

fn build_glslang_harness(root: &Path, out_dir: &Path, compiler: &str) -> Result<PathBuf> {
    if cfg!(windows) {
        bail!(
            "--in-process builds its glslang harness with a Unix C++ compiler driver; Windows is not supported"
        );
    }
    let build = oracles::oracles_dir(root).join("build").join("glslang");
    let libraries = [
        build.join("glslang").join("libglslang.a"),
        build
            .join("glslang")
            .join("libglslang-default-resource-limits.a"),
    ];
    if let Some(missing) = libraries.iter().find(|library| !library.is_file()) {
        bail!(
            "{} not found: run `cargo xtask oracles` to build the pinned glslang",
            missing.display()
        );
    }
    let cache_path = build.join("CMakeCache.txt");
    let cache = fs::read_to_string(&cache_path).with_context(|| {
        format!(
            "reading {}: run `cargo xtask oracles` to build the pinned glslang",
            cache_path.display()
        )
    })?;
    let source = PathBuf::from(
        cmake_value(&cache, "CMAKE_HOME_DIRECTORY")
            .with_context(|| format!("{} names no source directory", cache_path.display()))?,
    );
    if !source.join("SPIRV").join("GlslangToSpv.h").is_file() {
        bail!(
            "{} has no SPIRV/GlslangToSpv.h: the glslang checkout target/oracles/build/glslang was built from is gone; run `cargo xtask oracles`",
            source.display()
        );
    }
    let program = out_dir.join("glslang-harness");
    let mut command = Command::new(compiler);
    command
        .args(["-O2", "-std=c++17", "-I"])
        .arg(&source)
        .arg("-I")
        .arg(build.join("include"))
        .arg(root.join("xtask").join("harness").join("glslang.cpp"))
        .args(&libraries)
        .arg("-o")
        .arg(&program);
    if cfg!(target_os = "linux") {
        command.arg("-lpthread");
    }
    process::checked(
        &mut command,
        &format!("building the in-process glslang harness with {compiler} (set CXX to change it)"),
    )?;
    Ok(program)
}

fn load_average() -> Option<String> {
    match std::env::consts::OS {
        "macos" => process::capture(Command::new("sysctl").args(["-n", "vm.loadavg"]))
            .ok()
            .map(|text| text.trim_matches(['{', '}', ' ']).to_string()),
        "linux" => fs::read_to_string("/proc/loadavg").ok().map(|text| {
            text.split_whitespace()
                .take(3)
                .collect::<Vec<_>>()
                .join(" ")
        }),
        _ => None,
    }
}

fn summary(pairs: &[(f64, f64)]) -> Summary {
    let glslang: Vec<f64> = pairs.iter().map(|&(glslang, _)| glslang).collect();
    let rglsl: Vec<f64> = pairs.iter().map(|&(_, rglsl)| rglsl).collect();
    let ratios: Vec<f64> = pairs
        .iter()
        .filter_map(|&(glslang, rglsl)| stats::ratio(rglsl, glslang))
        .collect();
    Summary {
        count: pairs.len(),
        glslang_total: glslang.iter().sum(),
        rglsl_total: rglsl.iter().sum(),
        glslang_median: stats::median(&glslang),
        rglsl_median: stats::median(&rglsl),
        geomean: stats::geometric_mean(&ratios),
    }
}

fn summary_table(out: &mut String, measured: &[Measured], pair: impl Fn(&Measured) -> (f64, f64)) {
    out.push_str("| shader set | shaders | glslang total | rglsl total | rglsl/glslang (totals) | glslang median | rglsl median | geometric mean of rglsl/glslang |\n|---|--:|--:|--:|--:|--:|--:|--:|\n");
    for group in GROUPS {
        let pairs: Vec<(f64, f64)> = measured
            .iter()
            .filter(|shader| shader.group == group)
            .map(&pair)
            .collect();
        if !pairs.is_empty() {
            summary_row(out, group.label(), summary(&pairs));
        }
    }
    let pairs: Vec<(f64, f64)> = measured.iter().map(&pair).collect();
    summary_row(out, "**all**", summary(&pairs));
}

fn sum(shaders: &[&Measured], value: impl Fn(&Measured) -> f64) -> f64 {
    shaders.iter().map(|shader| value(shader)).sum::<f64>() + 0.0
}

fn groups_with_all(measured: &[Measured]) -> Vec<(&'static str, Vec<&Measured>)> {
    let mut rows: Vec<(&'static str, Vec<&Measured>)> = GROUPS
        .iter()
        .map(|&group| {
            (
                group.label(),
                measured
                    .iter()
                    .filter(|shader| shader.group == group)
                    .collect::<Vec<_>>(),
            )
        })
        .filter(|(_, shaders)| !shaders.is_empty())
        .collect();
    rows.push(("**all**", measured.iter().collect()));
    rows
}

fn milliseconds_total(value: f64) -> String {
    if value >= 1000.0 {
        seconds(value)
    } else {
        milliseconds(value)
    }
}

fn variants_table(out: &mut String, measured: &[Measured]) {
    out.push_str("| shader set | shaders | rglsl steady | rglsl with fresh tables | fresh/steady | shaders the Compiler API compiles | rglsl steady on them | Compiler steady | Compiler/steady | Compiler first |\n|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|\n");
    for (label, shaders) in groups_with_all(measured) {
        let steady = sum(&shaders, |shader| shader.rglsl.steady);
        let fresh = sum(&shaders, |shader| shader.rglsl.fresh);
        let with_compiler: Vec<&Measured> = shaders
            .iter()
            .copied()
            .filter(|shader| shader.rglsl.compiler.is_some())
            .collect();
        let steady_subset = sum(&with_compiler, |shader| shader.rglsl.steady);
        let compiler = sum(&with_compiler, |shader| {
            shader.rglsl.compiler.unwrap_or_default()
        });
        let compiler_first = sum(&with_compiler, |shader| {
            shader.rglsl.compiler_first.unwrap_or_default()
        });
        let subset = |value: f64| {
            if with_compiler.is_empty() {
                "-".to_string()
            } else {
                milliseconds_total(value)
            }
        };
        let _ = writeln!(
            out,
            "| {label} | {} | {} | {} | {} | {} | {} | {} | {} | {} |",
            shaders.len(),
            milliseconds_total(steady),
            milliseconds_total(fresh),
            times(stats::ratio(fresh, steady)),
            with_compiler.len(),
            subset(steady_subset),
            subset(compiler),
            times(stats::ratio(compiler, steady_subset)),
            subset(compiler_first),
        );
    }
}

fn share(part: f64, whole: f64) -> String {
    stats::ratio(part, whole).map_or_else(|| "-".into(), |ratio| format!("{:.0}%", ratio * 100.0))
}

fn phases_tables(out: &mut String, measured: &[Measured]) {
    out.push_str("| shader set | preprocessor | parser | sema | lowering | validator | linker | SPIR-V | total | built-in tables (fresh − steady) |\n|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|\n");
    for (label, shaders) in groups_with_all(measured) {
        let phases = [
            sum(&shaders, |shader| shader.rglsl.pp),
            sum(&shaders, |shader| shader.rglsl.parse),
            sum(&shaders, |shader| shader.rglsl.sema),
            sum(&shaders, |shader| shader.rglsl.lowering),
            sum(&shaders, |shader| shader.rglsl.validate),
            sum(&shaders, |shader| shader.rglsl.link),
            sum(&shaders, |shader| shader.rglsl.spv),
        ];
        let total: f64 = phases.iter().sum();
        let cells: Vec<String> = phases
            .iter()
            .map(|&phase| format!("{} ({})", milliseconds_total(phase), share(phase, total)))
            .collect();
        let tables = sum(&shaders, |shader| shader.rglsl.fresh - shader.rglsl.steady);
        let _ = writeln!(
            out,
            "| {label} | {} | {} | {} |",
            cells.join(" | "),
            milliseconds_total(total),
            milliseconds_total(tables),
        );
    }
    out.push_str("\nglslang, steady state:\n\n| shader set | parse (preprocessor, parser, semantics) | link and mapIO | SPIR-V | total |\n|---|--:|--:|--:|--:|\n");
    for (label, shaders) in groups_with_all(measured) {
        let phases = [
            sum(&shaders, |shader| shader.glslang.parse),
            sum(&shaders, |shader| shader.glslang.link),
            sum(&shaders, |shader| shader.glslang.spv),
        ];
        let total: f64 = phases.iter().sum();
        let cells: Vec<String> = phases
            .iter()
            .map(|&phase| format!("{} ({})", milliseconds_total(phase), share(phase, total)))
            .collect();
        let _ = writeln!(
            out,
            "| {label} | {} | {} |",
            cells.join(" | "),
            milliseconds_total(total),
        );
    }
}

fn steady_shader_table(out: &mut String, title: &str, shaders: &[&Measured]) {
    let _ = writeln!(out, "\n### {title}\n");
    out.push_str("| shader | set | glslang | rglsl | rglsl/glslang | preprocessor | parser | sema | lowering | validator | linker | SPIR-V |\n|---|---|--:|--:|--:|--:|--:|--:|--:|--:|--:|--:|\n");
    for shader in shaders {
        let rglsl = &shader.rglsl;
        let _ = writeln!(
            out,
            "| `{}` | {} | {} | {} | {} | {} | {} | {} | {} | {} | {} | {} |",
            shader.name,
            shader.group.key(),
            milliseconds(shader.glslang.steady),
            milliseconds(rglsl.steady),
            times(shader.steady_ratio()),
            milliseconds(rglsl.pp),
            milliseconds(rglsl.parse),
            milliseconds(rglsl.sema),
            milliseconds(rglsl.lowering),
            milliseconds(rglsl.validate),
            milliseconds(rglsl.link),
            milliseconds(rglsl.spv),
        );
    }
}

fn first_shader_table(out: &mut String, title: &str, shaders: &[&Measured]) {
    let _ = writeln!(out, "\n### {title}\n");
    out.push_str(
        "| shader | set | glslang first | rglsl first | rglsl/glslang |\n|---|---|--:|--:|--:|\n",
    );
    for shader in shaders {
        let _ = writeln!(
            out,
            "| `{}` | {} | {} | {} | {} |",
            shader.name,
            shader.group.key(),
            milliseconds(shader.glslang.first),
            milliseconds(shader.rglsl.first),
            times(shader.first_ratio()),
        );
    }
}

fn sorted_by(measured: &[Measured], key: impl Fn(&Measured) -> f64, top: usize) -> Vec<&Measured> {
    let mut shaders: Vec<&Measured> = measured.iter().collect();
    shaders.sort_by(|a, b| key(b).total_cmp(&key(a)));
    shaders.truncate(top);
    shaders
}

fn markdown(environment: &Environment, outcome: &Outcome, options: &Options) -> String {
    let measured = &outcome.measured;
    let mut out = String::from("# In-process compile time: rglsl vs glslang\n\n");
    let mode = options.debug_info.map_or_else(
        || "no extra debug information (corpus cases keep their own `-g`/`-gVS`)".to_string(),
        |debug| format!("`-{}` added to every shader", debug.mode()),
    );
    let _ = writeln!(
        out,
        "Each compiler runs in one long-lived process, so process start-up, reading the shader and \
         writing the SPIR-V are not measured. glslang: `xtask/harness/glslang.cpp`, linked against the \
         pinned glslang libraries, compiles a shader as `glslangValidator -V` does (`TShader::parse`, \
         `TProgram::link` and `mapIO`, `GlslangToSpv`). rglsl: `rglsl-bench-harness` (`xtask/harness`) \
         does through the public API what the `rglsl` command-line tool does for one shader \
         (`Frontend::parse_with_includer`, the validator, the SPIR-V writer). Both get the same options; \
         the shaders alternate between the two harnesses, one thread each.\n\n\
         Per shader: the *first* compile runs with no built-in tables: glslang right after \
         `FinalizeProcess` and `InitializeProcess`, rglsl with `FreshTables` (it builds them for every \
         compile, as one run of the command-line tool does). Then one untimed warm-up compile and {} timed \
         compiles: *steady* is their median, with the built-in tables cached (glslang's per-process symbol \
         tables, rglsl's shared `BuiltinCache`, the one `rglsl_link::Compiler` keeps). Debug information: \
         {mode}.\n",
        options.runs
    );
    for (title, facts) in [
        ("Machine", &environment.machine),
        ("glslang", &environment.glslang),
        ("rglsl", &environment.rglsl),
    ] {
        let _ = writeln!(out, "**{title}**\n");
        for (key, value) in facts {
            let _ = writeln!(out, "- {key}: {value}");
        }
        if title == "Machine" {
            let unknown = || "unknown".to_string();
            let _ = writeln!(
                out,
                "- load average (1, 5, 15 min) at the start: {}; at the end: {}",
                outcome.load_before.clone().unwrap_or_else(unknown),
                outcome.load_after.clone().unwrap_or_else(unknown)
            );
        }
        out.push('\n');
    }

    out.push_str("## Steady state\n\n");
    out.push_str("Built-in tables cached. Totals are sums of the per-shader medians; \"median\" is the median shader; the geometric mean is over the per-shader rglsl/glslang ratios (below 1: rglsl is faster).\n\n");
    summary_table(&mut out, measured, |shader| {
        (shader.glslang.steady, shader.rglsl.steady)
    });

    out.push_str("\n## First compile\n\n");
    out.push_str("Built-in tables built during the compile: what one run of a command-line tool pays, without process start-up.\n\n");
    summary_table(&mut out, measured, |shader| {
        (shader.glslang.first, shader.rglsl.first)
    });

    out.push_str("\n## rglsl: built-in tables and the Compiler API\n\n");
    out.push_str("*Fresh tables* is the median of compiles that build the built-in tables each time (`FreshTables`, as the command-line tool does). *Compiler* is `rglsl_link::Compiler::compile` and `link_spirv` (object module, link, SPIR-V) with one `Compiler` for the whole run; it has no preamble and no HLSL offsets, so shaders that need them are left out of its columns.\n\n");
    variants_table(&mut out, measured);

    out.push_str("\n## Phases\n\n");
    out.push_str("rglsl, steady state, totals of the per-shader medians and their share. The preprocessor, the parser and sema are timed by calling `rglsl_pp::preprocess`, `rglsl_ast::parse_prefix` and `rglsl_sema::analyze_with_tables` on their own; lowering is the rest of `Frontend::compile_program` (per run: frontend − preprocessor − parser − sema, so it can be slightly negative for tiny shaders); the validator checks the program's object module and the linker finishes it alone (`rglsl_link::compile_program`, as the command-line tool does: compaction, and a second validation only when compaction removed something); SPIR-V includes freeing the module.\n\n");
    phases_tables(&mut out, measured);

    out.push_str("\n## Shaders\n");
    let top = 15;
    let highest = sorted_by(measured, |shader| shader.steady_ratio().unwrap_or(0.0), top);
    steady_shader_table(
        &mut out,
        "Highest rglsl/glslang ratios, steady state",
        &highest,
    );
    let slowest = sorted_by(measured, |shader| shader.rglsl.steady, 10);
    steady_shader_table(&mut out, "Slowest for rglsl, steady state", &slowest);
    let lowest = sorted_by(
        measured,
        |shader| -shader.steady_ratio().unwrap_or(f64::INFINITY),
        10,
    );
    steady_shader_table(
        &mut out,
        "Lowest rglsl/glslang ratios, steady state",
        &lowest,
    );
    let first = sorted_by(measured, |shader| shader.first_ratio().unwrap_or(0.0), 10);
    first_shader_table(
        &mut out,
        "Highest rglsl/glslang ratios, first compile",
        &first,
    );

    not_measured(&mut out, outcome);
    let _ = writeln!(
        out,
        "\nBenchmark wall time: {:.0} s.",
        outcome.elapsed.as_secs_f64()
    );
    out
}

fn not_measured(out: &mut String, outcome: &Outcome) {
    out.push_str("\n## Not measured\n\n");
    out.push_str("Shaders that one of the compilers rejects are left out.\n\n");
    out.push_str(
        "| shader set | glslang rejects | rglsl rejects | both reject |\n|---|--:|--:|--:|\n",
    );
    for group in GROUPS {
        let count = |kind: Excluded| {
            outcome
                .rejected
                .iter()
                .filter(|&&(g, k, _)| g == group && k == kind)
                .count()
        };
        let _ = writeln!(
            out,
            "| {} | {} | {} | {} |",
            group.label(),
            count(Excluded::GlslangRejects),
            count(Excluded::RglslRejects),
            count(Excluded::BothReject)
        );
    }
    for (kind, title) in [
        (Excluded::GlslangRejects, "Only glslang rejects"),
        (Excluded::RglslRejects, "Only rglsl rejects"),
    ] {
        let names: Vec<String> = outcome
            .rejected
            .iter()
            .filter(|&&(_, k, _)| k == kind)
            .map(|(_, _, name)| format!("`{name}`"))
            .collect();
        if !names.is_empty() {
            let _ = writeln!(out, "\n{title}: {}.", names.join(", "));
        }
    }
    if !outcome.no_link.is_empty() {
        let _ = writeln!(
            out,
            "\nCompiled without linking (`--no-link`) by glslang's tests, not reproduced in process: {} shaders.",
            outcome.no_link.len()
        );
    }
    if !outcome.crashes.is_empty() {
        out.push_str("\n**Harness crashes** (the harness was restarted):\n\n");
        for crash in &outcome.crashes {
            let _ = writeln!(
                out,
                "- {} on `{}` ({}): {}",
                crash.compiler,
                crash.name,
                crash.group.key(),
                crash.status
            );
        }
    }
    if !outcome.compiler_rejects.is_empty() {
        let _ = writeln!(
            out,
            "\nThe Compiler API does not compile {} shaders the command-line path accepts:\n",
            outcome.compiler_rejects.len()
        );
        for (name, reason) in &outcome.compiler_rejects {
            let _ = writeln!(out, "- `{name}`: {reason}");
        }
    }
}

fn tsv(measured: &[Measured]) -> String {
    let mut out = String::from(
        "shader\tset\tglslang_first_ms\tglslang_steady_ms\tglslang_parse_ms\tglslang_link_ms\tglslang_spv_ms\trglsl_first_ms\trglsl_steady_ms\trglsl_fresh_ms\trglsl_pp_ms\trglsl_parse_ms\trglsl_sema_ms\trglsl_lowering_ms\trglsl_validate_ms\trglsl_link_ms\trglsl_spv_ms\tcompiler_first_ms\tcompiler_steady_ms\tsteady_ratio\tfirst_ratio\tglslang_words\trglsl_words\tcommand_line\n",
    );
    let optional =
        |value: Option<f64>| value.map_or_else(String::new, |value| format!("{value:.4}"));
    for shader in measured {
        let glslang = &shader.glslang;
        let rglsl = &shader.rglsl;
        let _ = writeln!(
            out,
            "{}\t{}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{:.4}\t{}\t{}\t{}\t{}\t{:.0}\t{:.0}\t{}",
            shader.name,
            shader.group.key(),
            glslang.first,
            glslang.steady,
            glslang.parse,
            glslang.link,
            glslang.spv,
            rglsl.first,
            rglsl.steady,
            rglsl.fresh,
            rglsl.pp,
            rglsl.parse,
            rglsl.sema,
            rglsl.lowering,
            rglsl.validate,
            rglsl.link,
            rglsl.spv,
            optional(rglsl.compiler_first),
            optional(rglsl.compiler),
            optional(shader.steady_ratio()),
            optional(shader.first_ratio()),
            glslang.words,
            rglsl.words,
            shader.command_line,
        );
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    fn job() -> Job {
        Job {
            name: "a.frag".into(),
            group: Group::Vulkan,
            path: PathBuf::from("/t/a.frag"),
            stage: "frag".into(),
            vulkan: (1, 1),
            spirv: (1, 3),
            automap: true,
            relax: false,
            hlsl_offsets: false,
            debug: Some("gVS"),
            include_dirs: vec![PathBuf::from("/t/inc")],
            preamble: "#define A\tB\n".into(),
        }
    }

    fn reply(text: &str) -> Result<Fields> {
        match Reply::parse(text)? {
            Reply::Accepted(fields) => Ok(fields),
            other => bail!("not accepted: {other:?}"),
        }
    }

    #[test]
    fn escaping_round_trips() {
        for text in ["plain", "a\tb\nc\\d", "\\n", ""] {
            assert_eq!(unescape(&escape(text)), text);
        }
    }

    #[test]
    fn job_line_has_every_option() {
        let line = job().line(7);
        assert!(line.starts_with("path=/t/a.frag\tstage=frag\tvulkan=1.1\tspirv=1.3\tautomap=1\t"));
        assert!(line.contains("\tdebug=gVS\t"));
        assert!(line.contains("\tpreamble=#define A\\tB\\n\t"));
        assert!(line.contains("\truns=7\t"));
        assert!(line.ends_with("\tinclude=/t/inc"));
        assert_eq!(line.lines().count(), 1);
        assert_eq!(
            job().command_line(),
            "-V --target-env vulkan1.1 --target-env spirv1.3 --auto-map-locations --auto-map-bindings -gVS -I/t/inc --preamble-text '#define A\tB' a.frag"
        );
    }

    #[test]
    fn replies_parse_numbers_notes_and_rejections() -> Result<()> {
        let fields = reply("ok\tfirst=2.5\tsteady=1,3,2\tcompiler_rejects=no\\tway")?;
        assert_eq!(fields.median("steady")?, 2.0);
        assert_eq!(fields.median("first")?, 2.5);
        assert_eq!(
            fields.notes.get("compiler_rejects").map(String::as_str),
            Some("no\tway")
        );
        assert!(fields.median("missing").is_err());
        assert!(matches!(
            Reply::parse("rejected\tERROR: x\\nERROR: y")?,
            Reply::Rejected(ref reason) if reason == "ERROR: x\nERROR: y"
        ));
        assert!(Reply::parse("what").is_err());
        Ok(())
    }

    fn rglsl_fields() -> Result<Fields> {
        reply(
            "ok\tfirst=8\tfresh=5,5,5\tsteady=2,2,2\tpp=1,0.5,0.5\tparse=0.25,0.25,0.25\tsema=0.25,0.25,0.25\tfrontend=2,1.5,1.25\tvalidate=0.1,0.1,0.1\tlink=0.1,0.1,0.1\tspv=0.2,0.2,0.2\twords=100",
        )
    }

    #[test]
    fn lowering_is_the_rest_of_the_frontend_per_run() -> Result<()> {
        let sample = RglslSample::new(&rglsl_fields()?)?;
        assert!((sample.lowering - 0.5).abs() < 1e-9);
        assert_eq!(sample.compiler, None);
        Ok(())
    }

    #[test]
    fn report_has_every_section() -> Result<()> {
        let glslang = GlslangSample::new(&reply(
            "ok\tfirst=40\tsteady=4,4\tparse=3,3\tlink=0.5,0.5\tspv=0.5,0.5\twords=90",
        )?)?;
        let rglsl = RglslSample::new(&rglsl_fields()?)?;
        let measured = Measured {
            name: "a.frag".into(),
            group: Group::Vulkan,
            command_line: job().command_line(),
            glslang,
            rglsl,
        };
        let outcome = Outcome {
            measured: vec![measured],
            rejected: vec![(Group::Synthetic, Excluded::RglslRejects, "x.frag".into())],
            no_link: vec!["n.frag".into()],
            load_before: Some("1.00 2.00 3.00".into()),
            ..Outcome::default()
        };
        let options = Options {
            glslang_dir: None,
            filter: None,
            runs: 3,
            debug_info: None,
            timeout_secs: 1,
            in_process: true,
        };
        let environment = Environment {
            machine: Vec::new(),
            glslang: Vec::new(),
            rglsl: Vec::new(),
        };
        let report = markdown(&environment, &outcome, &options);
        for section in [
            "## Steady state",
            "## First compile",
            "## Phases",
            "## Not measured",
            "Only rglsl rejects: `x.frag`.",
            "(`--no-link`) by glslang's tests, not reproduced in process: 1 shaders",
            "at the start: 1.00 2.00 3.00; at the end: unknown",
            "| glslang corpus, Vulkan tests | 1 | 0.00 s | 0.00 s | 0.50× |",
            "| glslang corpus, Vulkan tests | 1 | 0.04 s | 0.01 s | 0.20× |",
        ] {
            assert!(report.contains(section), "missing {section}\n{report}");
        }
        let table = tsv(&outcome.measured);
        assert_eq!(table.lines().count(), 2);
        assert!(table.contains("a.frag\tvulkan\t40.0000\t4.0000\t"));
        Ok(())
    }
}
