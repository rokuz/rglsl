//! Project automation for rglsl.
//!
//! - `cargo xtask oracles` fetches and builds the pinned reference tools
//!   (glslang, spirv-val) into `target/oracles/`.
//! - `cargo xtask test` runs the conformance corpora against the oracles and
//!   writes `PROGRESS.md`.

mod cli;
mod corpus;
mod debuginfo;
mod exec;
mod fuzz;
mod fuzz_exec;
mod fuzz_libfuzzer;
mod fuzz_reduce;
mod groups;
mod interface;
mod oracles;
mod process;
mod renamed;
mod report;
mod runner;
mod worker;

use std::path::{Path, PathBuf};

use anyhow::{bail, Context, Result};

const USAGE: &str = "\
usage: cargo xtask <command> [options]

commands:
  oracles             fetch and build the pinned oracles into target/oracles: glslang and
                      spirv-val, and on macOS arm64 the exec oracles (KosmicKrisp, Amber,
                      the ML emulation layer's tensor library)
      --glslang-dir DIR   use an existing glslang checkout instead of cloning it
                          (its HEAD must be the pinned commit)
      --no-exec           do not install the exec oracles
      --exec-only         only install the exec oracles
      --remote            only build Amber and the tensor layer on every remote Windows target
                          listed in RGLSL_EXEC_REMOTE, from the pins in oracles.toml, and smoke
                          check them (RGLSL_AMBER_SRC: build Amber from a local working copy)
  test                run the glslang corpus and write PROGRESS.md
      --glslang-dir DIR   glslang checkout whose Test/ and gtests/ are used
                          (default: target/oracles/src/glslang)
      --filter TEXT       only run shaders whose file name contains TEXT
      --jobs N            number of parallel jobs (default: number of CPUs)
      --timeout SECS      per-process timeout (default: 30)
      --no-progress-file  do not rewrite PROGRESS.md (for filtered or local runs)
      --no-exec           do not run shaders on any Vulkan target; PROGRESS.md keeps the
                          exec results of the last run that had them
      --no-local-exec     do not run shaders on KosmicKrisp on this Mac
      --no-remote-exec    do not run shaders on the remote Windows targets
  cli                 run glslangValidator command lines with glslang and with the rglsl
                      command-line tool and compare exit codes, messages and outputs
                      (docs/design/cli.md); report in target/xtask/cli/report.tsv
      --glslang-dir DIR   glslang checkout whose Test/ is used
      --filter TEXT       only run cases whose name contains TEXT
      --timeout SECS      per-process timeout (default: 30)
  fuzz                compare rglsl with glslang on a directory of shaders
                      (accepted or not, valid SPIR-V, crashes); findings go to
                      target/xtask/fuzz/differential/report.tsv
      --shaders DIR       the shaders to compare (searched recursively)
      --exec              also run every shader family of rglsl-fuzz on the Vulkan targets
                          (local and remote, as for `test`): a variant whose image differs
                          from its reference is a wrong result; failures are rerun alone
      --exec-target T     with --exec, run on these targets only: local, remote (every remote
                          target) or an entry of RGLSL_EXEC_REMOTE (`alias` or `alias@device`);
                          with --reduce it must name one target
      --exec-glslang      with --exec, also run the modules glslang compiles
      --reduce JOB        reduce the variant shader job JOB (a .json next to its shader) with
                          rglsl-fuzz's reducer instead of comparing a directory
      --interesting K     with --reduce: crash, reject, invalid-spirv (glslang accepts and
                          rglsl crashes, rejects or emits invalid SPIR-V), rglsl-fails
                          (glslang accepts and rglsl crashes or rejects the shader, compiled
                          alone or as an object linked alone), differs-from-glslang
                          (rglsl's module renders differently from glslang's on the exec
                          target), differs-from-reference (rglsl's variant renders
                          differently from rglsl's reference, glslang's does not) or
                          exec-fails (rglsl's module fails on the driver, glslang's runs)
      --preserve-semantics  with --reduce: only undo the generator's transformations
      --max-steps N       with --reduce: interestingness tests to run at most (default 2000)
      --no-ub-guards      with --reduce and without --preserve-semantics: do not bound loops,
                          clamp indices and initialise locals in every candidate
      --output DIR        with --reduce: where the reproducer goes
                          (default target/xtask/fuzz/reduce/<family>-<variant>/result)
      --libfuzzer T       run the cargo-fuzz target T of rglsl-fuzz/fuzz (glsl_parser,
                          spv_parser, ir, object, glsl_variant) with cargo +nightly fuzz;
                          corpus, artifacts, log and report.tsv in target/xtask/fuzz/T/
      --time SECS         with --libfuzzer: how long to fuzz (default 600)
      --rss-limit-mb MB   with --libfuzzer: memory limit per input (default 4096)
      --decode INPUT      turn a glsl_variant input into its shader family (reference and
                          variant_000 shader jobs) for --reduce
      --output DIR        with --decode: where the family goes
                          (default target/xtask/fuzz/glsl_variant/findings/<input>)
      --jobs N            number of parallel jobs (default: number of CPUs; for
                          --libfuzzer, libFuzzer's -fork, default half the CPUs)
      --timeout SECS      per-process timeout (default: 30)

environment:
  RGLSL_GLSLANG, RGLSL_SPIRV_VAL   override the oracle binaries
  RGLSL_AMBER, RGLSL_VK_ICD        override Amber and the Vulkan driver manifest
  RGLSL_EXEC_REMOTE                remote exec targets: comma-separated SSH host aliases of Windows
                                   machines with Vulkan, each optionally followed by @DEVICE, a
                                   substring of the GPU's name (unset: the remote targets are
                                   skipped with a warning); a target is named after its GPU vendor
  RGLSL_EXEC_REMOTE_DIR            work directory on each machine (default C:/rglsl-exec); one
                                   value, or comma-separated ALIAS=DIR entries and a default
  RGLSL_EXEC_REMOTE_JOBS           parallel Amber processes per machine (default 4); same syntax
";

fn main() {
    let args: Vec<String> = std::env::args().skip(1).collect();
    let code = match run(args) {
        Ok(code) => code,
        Err(err) => {
            eprintln!("error: {err:#}");
            2
        }
    };
    std::process::exit(code);
}

fn run(args: Vec<String>) -> Result<i32> {
    let mut args = Args::new(args);
    let Some(command) = args.next_positional() else {
        eprint!("{USAGE}");
        return Ok(2);
    };
    match command.as_str() {
        "oracles" => {
            let glslang_dir = args.value("--glslang-dir")?.map(PathBuf::from);
            let no_exec = args.flag("--no-exec");
            let exec_only = args.flag("--exec-only");
            let remote = args.flag("--remote");
            args.finish()?;
            if no_exec && exec_only {
                bail!("--no-exec and --exec-only exclude each other");
            }
            if remote {
                oracles::build_remote(&workspace_root()?)?;
                return Ok(0);
            }
            let selection = oracles::Selection {
                reference: !exec_only,
                exec: !no_exec,
            };
            oracles::build(&workspace_root()?, glslang_dir.as_deref(), selection)?;
            Ok(0)
        }
        "test" => {
            let options = runner::Options {
                glslang_dir: args.value("--glslang-dir")?.map(PathBuf::from),
                filter: args.value("--filter")?,
                jobs: args.parsed("--jobs")?,
                timeout_secs: args.parsed("--timeout")?.unwrap_or(30),
                write_progress: !args.flag("--no-progress-file"),
                targets: {
                    let none = args.flag("--no-exec");
                    let local = !args.flag("--no-local-exec");
                    let remote = !args.flag("--no-remote-exec");
                    if none {
                        Vec::new()
                    } else {
                        exec::select_targets(local, remote)?
                    }
                },
            };
            args.finish()?;
            runner::run(&workspace_root()?, options)?;
            Ok(0)
        }
        "cli" => {
            let options = cli::Options {
                glslang_dir: args.value("--glslang-dir")?.map(PathBuf::from),
                filter: args.value("--filter")?,
                timeout_secs: args.parsed("--timeout")?.unwrap_or(30),
            };
            args.finish()?;
            cli::run(&workspace_root()?, &options)
        }
        "fuzz" if args.has("--libfuzzer") => {
            let options = fuzz_libfuzzer::Options {
                target: args
                    .value("--libfuzzer")?
                    .context("--libfuzzer needs a target")?,
                time_secs: args.parsed("--time")?.unwrap_or(600),
                jobs: args.parsed("--jobs")?,
                timeout_secs: args.parsed("--timeout")?.unwrap_or(30),
                rss_limit_mb: args.parsed("--rss-limit-mb")?.unwrap_or(4096),
            };
            args.finish()?;
            fuzz_libfuzzer::run(&workspace_root()?, &options)?;
            Ok(0)
        }
        "fuzz" if args.has("--decode") => {
            let input = args
                .value("--decode")?
                .context("--decode needs a glsl_variant input")?;
            let output = args.value("--output")?.map(PathBuf::from);
            args.finish()?;
            fuzz_libfuzzer::decode_artifact(&workspace_root()?, Path::new(&input), output)?;
            Ok(0)
        }
        "fuzz" if args.has("--reduce") => {
            let job = args
                .value("--reduce")?
                .context("--reduce needs a shader job")?;
            let interesting = args
                .value("--interesting")?
                .context("--reduce needs --interesting")?;
            let options = fuzz_reduce::Options {
                job: PathBuf::from(job),
                interesting: fuzz_reduce::Interesting::parse(&interesting)
                    .with_context(|| format!("unknown interestingness test `{interesting}`"))?,
                target: match args.value("--exec-target")? {
                    Some(name) => {
                        let mut targets = exec::named_targets(&name)?;
                        match (targets.pop(), targets.is_empty()) {
                            (Some(target), true) => target,
                            _ => bail!("--exec-target `{name}` names several targets; name one"),
                        }
                    }
                    None => exec::TargetSpec::Local,
                },
                preserve_semantics: args.flag("--preserve-semantics"),
                max_steps: args.parsed("--max-steps")?.unwrap_or(2000),
                guards: !args.flag("--no-ub-guards"),
                output: args.value("--output")?.map(PathBuf::from),
                timeout_secs: args.parsed("--timeout")?.unwrap_or(30),
            };
            args.finish()?;
            fuzz_reduce::run(&workspace_root()?, options)?;
            Ok(0)
        }
        "fuzz" => {
            let options = fuzz::Options {
                shaders: args
                    .value("--shaders")?
                    .map(PathBuf::from)
                    .context("--shaders is required")?,
                jobs: args.parsed("--jobs")?,
                timeout_secs: args.parsed("--timeout")?.unwrap_or(30),
                exec: {
                    let exec = args.flag("--exec");
                    let only = args.value("--exec-target")?;
                    match (exec, only) {
                        (false, Some(_)) => bail!("--exec-target needs --exec"),
                        (false, None) => Vec::new(),
                        (true, None) => exec::select_targets(true, true)?,
                        (true, Some(name)) => exec::named_targets(&name)?,
                    }
                },
                exec_glslang: args.flag("--exec-glslang"),
            };
            args.finish()?;
            if options.exec_glslang && options.exec.is_empty() {
                bail!("--exec-glslang needs --exec");
            }
            fuzz::run(&workspace_root()?, options)?;
            Ok(0)
        }
        // Internal: compiles one shader in a child process, so that a panic,
        // a stack overflow or a hang affects only that shader.
        "compile-one" => {
            let stage = args.value("--stage")?.context("--stage is required")?;
            let spv = args.value("--spv")?.context("--spv is required")?;
            let out = args.value("--out")?.context("--out is required")?;
            let auto_map = args.flag("--auto-map");
            let object = args.flag("--object");
            let hlsl_offsets = args.flag("--hlsl-offsets");
            let debug = args.value("--debug")?;
            let mut include_dirs = Vec::new();
            while let Some(directory) = args.value("--include-dir")? {
                include_dirs.push(directory);
            }
            let mut preamble = String::new();
            while let Some(line) = args.value("--preamble")? {
                preamble.push_str(&line);
                preamble.push('\n');
            }
            let input = args.next_positional().context("input file is required")?;
            args.finish()?;
            Ok(worker::compile_one(
                Path::new(&input),
                &worker::OneOptions {
                    stage: &stage,
                    spv_version: &spv,
                    auto_map,
                    object,
                    hlsl_offsets,
                    include_dirs: &include_dirs,
                    preamble: (!preamble.is_empty()).then_some(preamble),
                    debug: debug.as_deref(),
                },
                Path::new(&out),
            ))
        }
        "debug-compare" => {
            let ours = args.next_positional().context("our module is required")?;
            let reference = args
                .next_positional()
                .context("glslang's module is required")?;
            args.finish()?;
            let comparison = debuginfo::compare(Path::new(&ours), Path::new(&reference))?;
            for fact in &comparison.missing {
                println!("- {fact}");
            }
            for fact in &comparison.extra {
                println!("+ {fact}");
            }
            Ok(i32::from(!comparison.matches()))
        }
        "compile-group" => {
            let spv = args.value("--spv")?.context("--spv is required")?;
            let out_dir = args.value("--out-dir")?.context("--out-dir is required")?;
            let auto_map_locations = args.flag("--auto-map-locations");
            let auto_map_bindings = args.flag("--auto-map-bindings");
            let debug = args.value("--debug")?;
            let mut inputs = Vec::new();
            while let Some(input) = args.next_positional() {
                inputs.push(input);
            }
            args.finish()?;
            Ok(worker::compile_group(
                &inputs,
                &worker::GroupOptions {
                    spv_version: &spv,
                    debug,
                    auto_map_locations,
                    auto_map_bindings,
                    out_dir: Path::new(&out_dir),
                },
            ))
        }
        "help" | "--help" | "-h" => {
            print!("{USAGE}");
            Ok(0)
        }
        other => bail!("unknown command `{other}`\n\n{USAGE}"),
    }
}

fn workspace_root() -> Result<PathBuf> {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .map(Path::to_path_buf)
        .context("xtask must live in a subdirectory of the workspace")
}

/// A minimal argument parser: `--name value`, `--name=value`, `--flag` and positionals.
struct Args {
    args: Vec<String>,
}

impl Args {
    fn new(args: Vec<String>) -> Self {
        Self { args }
    }

    fn next_positional(&mut self) -> Option<String> {
        let index = self.args.iter().position(|a| !a.starts_with("--"))?;
        Some(self.args.remove(index))
    }

    fn has(&self, name: &str) -> bool {
        let prefix = format!("{name}=");
        self.args
            .iter()
            .any(|arg| arg == name || arg.starts_with(&prefix))
    }

    fn flag(&mut self, name: &str) -> bool {
        match self.args.iter().position(|a| a == name) {
            Some(index) => {
                self.args.remove(index);
                true
            }
            None => false,
        }
    }

    fn value(&mut self, name: &str) -> Result<Option<String>> {
        let prefix = format!("{name}=");
        if let Some(index) = self.args.iter().position(|a| a.starts_with(&prefix)) {
            let arg = self.args.remove(index);
            return Ok(Some(arg[prefix.len()..].to_string()));
        }
        let Some(index) = self.args.iter().position(|a| a == name) else {
            return Ok(None);
        };
        if index + 1 >= self.args.len() {
            bail!("{name} needs a value");
        }
        self.args.remove(index);
        Ok(Some(self.args.remove(index)))
    }

    fn parsed<T: std::str::FromStr>(&mut self, name: &str) -> Result<Option<T>> {
        match self.value(name)? {
            Some(v) => match v.parse() {
                Ok(v) => Ok(Some(v)),
                Err(_) => bail!("invalid value for {name}: `{v}`"),
            },
            None => Ok(None),
        }
    }

    fn finish(self) -> Result<()> {
        if !self.args.is_empty() {
            bail!("unexpected arguments: {}", self.args.join(" "));
        }
        Ok(())
    }
}
