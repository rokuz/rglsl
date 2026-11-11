//! Project automation for rglsl.
//!
//! - `cargo xtask oracles` fetches and builds the pinned reference tools
//!   (glslang, spirv-val) into `target/oracles/`.
//! - `cargo xtask test` runs the conformance corpora against the oracles and
//!   writes `PROGRESS.md`.

mod corpus;
mod exec;
mod fuzz;
mod fuzz_exec;
mod groups;
mod oracles;
mod process;
mod report;
mod runner;
mod worker;

use std::path::{Path, PathBuf};

use anyhow::{bail, Context, Result};

const USAGE: &str = "\
usage: cargo xtask <command> [options]

commands:
  oracles             fetch and build the pinned oracles into target/oracles: glslang and
                      spirv-val, and on macOS arm64 the exec oracles (KosmicKrisp, Amber)
      --glslang-dir DIR   use an existing glslang checkout instead of cloning it
                          (its HEAD must be the pinned commit)
      --no-exec           do not install KosmicKrisp and Amber
      --exec-only         only install KosmicKrisp and Amber
      --remote            only build Amber on the remote Windows target named by
                          RGLSL_EXEC_REMOTE (an SSH host alias), from the pins in oracles.toml
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
      --no-remote-exec    do not run shaders on the remote Windows target
  fuzz                compare rglsl with glslang on a directory of shaders
                      (accepted or not, valid SPIR-V, crashes)
      --shaders DIR       the shaders to compare (searched recursively)
      --exec              also run every shader family of rglsl-fuzz on the Vulkan targets
                          (local and remote, as for `test`): a variant whose image differs
                          from its reference is a wrong result; failures are rerun alone
      --exec-target T     with --exec, run on one target only: local or remote
      --exec-glslang      with --exec, also run the modules glslang compiles
      --jobs N            number of parallel jobs (default: number of CPUs)
      --timeout SECS      per-process timeout (default: 30)

environment:
  RGLSL_GLSLANG, RGLSL_SPIRV_VAL   override the oracle binaries
  RGLSL_AMBER, RGLSL_VK_ICD        override Amber and the Vulkan driver manifest
  RGLSL_EXEC_REMOTE                SSH host alias of a Windows machine with Vulkan: the remote
                                   exec target (unset: the remote target is skipped with a warning)
  RGLSL_EXEC_REMOTE_DIR            work directory on that machine (default C:/rglsl-exec)
  RGLSL_EXEC_REMOTE_JOBS           parallel Amber processes there (default 4)
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
                        exec::select_targets(local, remote)
                    }
                },
            };
            args.finish()?;
            runner::run(&workspace_root()?, options)?;
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
                        (true, None) => exec::select_targets(true, true),
                        (true, Some(name)) => vec![exec::TargetId::parse(&name)
                            .with_context(|| format!("unknown exec target `{name}`"))?],
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
            let mut include_dirs = Vec::new();
            while let Some(directory) = args.value("--include-dir")? {
                include_dirs.push(directory);
            }
            let input = args.next_positional().context("input file is required")?;
            args.finish()?;
            Ok(worker::compile_one(
                Path::new(&input),
                &stage,
                &spv,
                auto_map,
                object,
                hlsl_offsets,
                &include_dirs,
                Path::new(&out),
            ))
        }
        "compile-group" => {
            let spv = args.value("--spv")?.context("--spv is required")?;
            let out_dir = args.value("--out-dir")?.context("--out-dir is required")?;
            let auto_map_locations = args.flag("--auto-map-locations");
            let auto_map_bindings = args.flag("--auto-map-bindings");
            let mut inputs = Vec::new();
            while let Some(input) = args.next_positional() {
                inputs.push(input);
            }
            args.finish()?;
            Ok(worker::compile_group(
                &inputs,
                &worker::GroupOptions {
                    spv_version: &spv,
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
