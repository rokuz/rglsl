use std::io::{self, BufRead as _, Write as _};
use std::path::{Path, PathBuf};
use std::sync::Arc;
use std::time::Instant;

use anyhow::{Context as _, Result, anyhow, bail};
use rglsl::ShaderStage;
use rglsl::back::spv;
use rglsl::front::glsl::{self, BuiltinTables, FreshTables};
use rglsl::valid::{ValidationFlags, Validator};
use rglsl_link::{
    BuiltinCache, CompileOptions, Compiler, IncludeKind, IncludeRequest, ProgramOptions,
    ResolvedInclude,
};
use rglsl_pp::FileSystemIncluder;

type Tables = Arc<dyn BuiltinTables + Send + Sync>;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Debug {
    Lines,
    NonSemantic,
}

#[derive(Debug)]
struct Job {
    path: String,
    stage: ShaderStage,
    spirv: (u8, u8),
    automap: bool,
    hlsl_offsets: bool,
    debug: Option<Debug>,
    include_dirs: Vec<String>,
    preamble: String,
    runs: usize,
}

impl Job {
    fn parse(line: &str) -> Result<Self> {
        let mut path = None;
        let mut stage = None;
        let mut spirv = (1, 0);
        let mut automap = false;
        let mut hlsl_offsets = false;
        let mut debug = None;
        let mut include_dirs = Vec::new();
        let mut preamble = String::new();
        let mut runs = 1;
        for field in line.split('\t') {
            let (key, value) = field
                .split_once('=')
                .with_context(|| format!("job field without `=`: {field}"))?;
            let value = unescape(value)?;
            match key {
                "path" => path = Some(value),
                "stage" => {
                    stage = Some(
                        ShaderStage::from_extension(&value)
                            .with_context(|| format!("unknown stage `{value}`"))?,
                    );
                }
                "spirv" => spirv = version(&value)?,
                "vulkan" | "relax" => {}
                "automap" => automap = flag(&value)?,
                "hlsl-offsets" => hlsl_offsets = flag(&value)?,
                "debug" => {
                    debug = match value.as_str() {
                        "" => None,
                        "g" => Some(Debug::Lines),
                        "gVS" => Some(Debug::NonSemantic),
                        other => bail!("unknown debug mode `{other}`"),
                    };
                }
                "include" => include_dirs.push(value),
                "preamble" => preamble = value,
                "runs" => runs = value.parse().with_context(|| format!("runs `{value}`"))?,
                other => bail!("unknown job field `{other}`"),
            }
        }
        Ok(Self {
            path: path.context("job without a path")?,
            stage: stage.context("job without a stage")?,
            spirv,
            automap,
            hlsl_offsets,
            debug,
            include_dirs,
            preamble,
            runs,
        })
    }

    fn frontend_options(&self, tables: Tables) -> glsl::Options {
        glsl::Options {
            preamble: Some(self.preamble.clone()),
            auto_map_bindings: self.automap,
            auto_map_locations: self.automap,
            spirv_version: Some(self.spirv),
            hlsl_offsets: self.hlsl_offsets,
            debug_info: self.debug.is_some(),
            source_name: Some(self.path.clone()),
            builtin_tables: tables,
            ..glsl::Options::from(self.stage)
        }
    }

    fn spv_options(&self) -> spv::Options<'static> {
        let debug_info = self.debug.map(|debug| spv::DebugInfo {
            level: match debug {
                Debug::Lines => spv::DebugLevel::Lines,
                Debug::NonSemantic => spv::DebugLevel::NonSemantic,
            },
            source_text: true,
            processes: &[],
            entry_point: Some(spv::DebugEntryPoint {
                signature: "rglsl",
                arguments: "",
                directory: None,
            }),
        });
        spv::Options {
            lang_version: self.spirv,
            debug_info,
            flags: spv::WriterFlags::LABEL_VARYINGS
                | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE
                | spv::WriterFlags::DEBUG,
            ..spv::Options::default()
        }
    }

    fn includer(&self) -> (FileSystemIncluder, rglsl_pp::FileId) {
        let mut includer = FileSystemIncluder::new(&self.include_dirs);
        let root = includer.add_root(&self.path);
        (includer, root)
    }
}

fn flag(value: &str) -> Result<bool> {
    match value {
        "0" => Ok(false),
        "1" => Ok(true),
        other => bail!("expected 0 or 1, not `{other}`"),
    }
}

fn version(value: &str) -> Result<(u8, u8)> {
    let (major, minor) = value
        .split_once('.')
        .with_context(|| format!("version `{value}`"))?;
    Ok((major.parse()?, minor.parse()?))
}

fn unescape(text: &str) -> Result<String> {
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
            Some('\\') => out.push('\\'),
            other => bail!("bad escape `\\{}`", other.unwrap_or(' ')),
        }
    }
    Ok(out)
}

fn escape(text: &str) -> String {
    text.replace('\\', "\\\\")
        .replace('\t', "\\t")
        .replace('\n', "\\n")
}

fn milliseconds(started: Instant) -> f64 {
    started.elapsed().as_secs_f64() * 1000.0
}

#[derive(Debug)]
struct CliRun {
    frontend: f64,
    validate: f64,
    link: f64,
    spv: f64,
    words: usize,
}

impl CliRun {
    fn total(&self) -> f64 {
        self.frontend + self.validate + self.link + self.spv
    }
}

fn cli(job: &Job, source: &str, tables: Tables) -> Result<CliRun> {
    let options = job.frontend_options(tables);
    let spv_options = job.spv_options();
    let (mut includer, root) = job.includer();
    let started = Instant::now();
    let compiled = glsl::Frontend::default().compile_program(&options, source, root, &mut includer);
    let frontend = milliseconds(started);
    let object = compiled.map_err(|errors| anyhow!("{errors}"))?;
    let started = Instant::now();
    let info = Validator::new(ValidationFlags::all()).validate(&object.unit.module);
    let validate = milliseconds(started);
    let info = info.map_err(|error| anyhow!("validation: {error}"))?;
    let started = Instant::now();
    let linked = rglsl_link::finish_program(object, info);
    let link = milliseconds(started);
    let linked = linked.map_err(|errors| anyhow!("link: {errors}"))?;
    let started = Instant::now();
    let words = spv::write_vec(&linked.module, &linked.info, &spv_options, None);
    drop(linked);
    let spv = milliseconds(started);
    let words = words.map_err(|error| anyhow!("SPIR-V: {error}"))?;
    Ok(CliRun {
        frontend,
        validate,
        link,
        spv,
        words: words.len(),
    })
}

#[derive(Debug)]
struct FrontPhases {
    pp: f64,
    parse: f64,
    sema: f64,
}

fn front_phases(job: &Job, source: &str, tables: &dyn BuiltinTables) -> Result<FrontPhases> {
    let (mut includer, root) = job.includer();
    let pp_options = rglsl_pp::Options {
        vulkan_client_version: Some(100),
        stage: Some(job.stage),
        preamble: Some(job.preamble.clone()),
        ..rglsl_pp::Options::default()
    };
    let started = Instant::now();
    let preprocessed = rglsl_pp::preprocess(source, root, &pp_options, &mut includer);
    let mut pp = milliseconds(started);
    if preprocessed.has_errors() {
        bail!("the preprocessor reports errors");
    }
    let text = preprocessed.text.as_str();
    let started = Instant::now();
    let (unit, failure) = rglsl_ast::parse_prefix(text);
    let mut parse = milliseconds(started);
    if failure.is_some() {
        bail!("the parser reports an error");
    }
    let sema_options = rglsl_sema::Options {
        spirv_version: Some(job.spirv),
        end_of_input: u32::try_from(text.len()).ok(),
        require_bindings: !job.automap,
        ..rglsl_sema::Options::new(job.stage)
    };
    let started = Instant::now();
    let analysis = rglsl_sema::analyze_with_tables(&unit, &sema_options, tables);
    drop(analysis);
    let sema = milliseconds(started);
    let started = Instant::now();
    drop(unit);
    parse += milliseconds(started);
    let started = Instant::now();
    drop(preprocessed);
    pp += milliseconds(started);
    Ok(FrontPhases { pp, parse, sema })
}

fn resolve_from_disk(job: &Job, request: &IncludeRequest<'_>) -> Option<ResolvedInclude> {
    let local = match request.kind {
        IncludeKind::Local => request
            .includer
            .map(Path::new)
            .and_then(Path::parent)
            .map(Path::to_path_buf),
        IncludeKind::System => None,
    };
    local
        .into_iter()
        .chain(job.include_dirs.iter().map(PathBuf::from))
        .map(|directory| directory.join(request.requested))
        .find_map(|path| {
            std::fs::read_to_string(&path)
                .ok()
                .map(|source| ResolvedInclude {
                    name: path.to_string_lossy().into_owned(),
                    source,
                })
        })
}

fn facade(compiler: &Compiler, job: &Job, source: &str) -> Result<f64> {
    if !job.preamble.is_empty() || job.hlsl_offsets {
        bail!("CompileOptions has no preamble and no HLSL offsets");
    }
    let options = CompileOptions {
        auto_map_bindings: job.automap,
        auto_map_locations: job.automap,
        debug_info: job.debug.is_some(),
        spirv_version: job.spirv,
        ..CompileOptions::new(job.path.clone(), job.stage)
    };
    let program_options = ProgramOptions {
        auto_map_bindings: job.automap,
        auto_map_locations: job.automap,
        debug_info: job.debug.is_some(),
        spirv_version: job.spirv,
    };
    let started = Instant::now();
    let object = compiler
        .compile_with_includer(source, &options, &mut |request| {
            resolve_from_disk(job, &request)
        })
        .map_err(|diagnostics| anyhow!("{diagnostics}"))?;
    let program = rglsl_link::link_spirv(&[object], &program_options)
        .map_err(|diagnostics| anyhow!("{diagnostics}"))?;
    let elapsed = milliseconds(started);
    drop(program);
    Ok(elapsed)
}

#[derive(Debug, Default)]
struct Reply {
    fields: Vec<(&'static str, Vec<f64>)>,
    notes: Vec<(&'static str, String)>,
}

impl Reply {
    fn push(&mut self, key: &'static str, value: f64) {
        match self.fields.iter_mut().find(|(name, _)| *name == key) {
            Some((_, values)) => values.push(value),
            None => self.fields.push((key, vec![value])),
        }
    }

    fn line(&self) -> String {
        let mut line = String::from("ok");
        for (key, values) in &self.fields {
            let values: Vec<String> = values.iter().map(|value| format!("{value:.4}")).collect();
            line.push_str(&format!("\t{key}={}", values.join(",")));
        }
        for (key, note) in &self.notes {
            line.push_str(&format!("\t{key}={}", escape(note)));
        }
        line
    }
}

#[derive(Debug, Default)]
struct Harness {
    cache: Arc<BuiltinCache>,
    compiler: Compiler,
}

impl Harness {
    fn measure(&self, job: &Job) -> Result<Reply> {
        let source =
            std::fs::read_to_string(&job.path).with_context(|| format!("reading {}", job.path))?;
        let fresh: Tables = Arc::new(FreshTables);
        let cached: Tables = Arc::clone(&self.cache) as Tables;
        let mut reply = Reply::default();
        let first = cli(job, &source, Arc::clone(&fresh))?;
        reply.push("first", first.total());
        reply.push("words", first.words as f64);
        let compiler_first = facade(&Compiler::new(), job, &source);
        cli(job, &source, Arc::clone(&cached))?;
        let compiler_warm = facade(&self.compiler, job, &source);
        let with_compiler = match (compiler_first, compiler_warm) {
            (Ok(first), Ok(_)) => {
                reply.push("compiler_first", first);
                true
            }
            (Err(error), _) | (_, Err(error)) => {
                reply.notes.push(("compiler_rejects", error.to_string()));
                false
            }
        };
        for _ in 0..job.runs {
            let run = cli(job, &source, Arc::clone(&cached))?;
            reply.push("steady", run.total());
            reply.push("frontend", run.frontend);
            reply.push("validate", run.validate);
            reply.push("link", run.link);
            reply.push("spv", run.spv);
        }
        for _ in 0..job.runs {
            let phases = front_phases(job, &source, &*self.cache)?;
            reply.push("pp", phases.pp);
            reply.push("parse", phases.parse);
            reply.push("sema", phases.sema);
        }
        for _ in 0..job.runs {
            reply.push("fresh", cli(job, &source, Arc::clone(&fresh))?.total());
        }
        if with_compiler {
            for _ in 0..job.runs {
                reply.push("compiler", facade(&self.compiler, job, &source)?);
            }
        }
        Ok(reply)
    }
}

fn main() -> Result<()> {
    let harness = Harness::default();
    let mut output = io::stdout().lock();
    for line in io::stdin().lock().lines() {
        let line = line?;
        let job = Job::parse(&line)?;
        let reply = match harness.measure(&job) {
            Ok(reply) => reply.line(),
            Err(error) => format!("rejected\t{}", escape(&format!("{error:#}"))),
        };
        writeln!(output, "{reply}")?;
        output.flush()?;
    }
    Ok(())
}
