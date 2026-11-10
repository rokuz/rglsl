//! Project automation for rglsl.
//!
//! - `cargo xtask oracles` fetches and builds the pinned reference tools
//!   (glslang, spirv-val) into `target/oracles/`.
//! - `cargo xtask test` runs the conformance corpora against the oracles and
//!   writes `PROGRESS.md`.

mod corpus;
mod fuzz;
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
  oracles             fetch and build the pinned glslang and spirv-val into target/oracles
      --glslang-dir DIR   use an existing glslang checkout instead of cloning it
                          (its HEAD must be the pinned commit)
  test                run the glslang corpus and write PROGRESS.md
      --glslang-dir DIR   glslang checkout whose Test/ and gtests/ are used
                          (default: target/oracles/src/glslang)
      --filter TEXT       only run shaders whose file name contains TEXT
      --jobs N            number of parallel jobs (default: number of CPUs)
      --timeout SECS      per-process timeout (default: 30)
      --no-progress-file  do not rewrite PROGRESS.md (for filtered or local runs)
      --pipeline P        GLSL frontend pipeline: legacy (default) or ast
  fuzz                compare rglsl with glslang on a directory of shaders
                      (accepted or not, valid SPIR-V, crashes)
      --shaders DIR       the shaders to compare (searched recursively)
      --jobs N            number of parallel jobs (default: number of CPUs)
      --timeout SECS      per-process timeout (default: 30)

environment:
  RGLSL_GLSLANG, RGLSL_SPIRV_VAL   override the oracle binaries
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
            args.finish()?;
            oracles::build(&workspace_root(), glslang_dir.as_deref())?;
            Ok(0)
        }
        "test" => {
            let options = runner::Options {
                glslang_dir: args.value("--glslang-dir")?.map(PathBuf::from),
                filter: args.value("--filter")?,
                jobs: args.parsed("--jobs")?,
                timeout_secs: args.parsed("--timeout")?.unwrap_or(30),
                write_progress: !args.flag("--no-progress-file"),
                pipeline: pipeline(&mut args)?,
            };
            args.finish()?;
            runner::run(&workspace_root(), options)?;
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
            };
            args.finish()?;
            fuzz::run(&workspace_root(), options)?;
            Ok(0)
        }
        // Internal: compiles one shader in a child process, so that a panic,
        // a stack overflow or a hang affects only that shader.
        "compile-one" => {
            let stage = args.value("--stage")?.context("--stage is required")?;
            let spv = args.value("--spv")?.context("--spv is required")?;
            let out = args.value("--out")?.context("--out is required")?;
            let auto_map = args.flag("--auto-map");
            let pipeline = pipeline(&mut args)?;
            let input = args.next_positional().context("input file is required")?;
            args.finish()?;
            Ok(worker::compile_one(
                Path::new(&input),
                &stage,
                &spv,
                auto_map,
                &pipeline,
                Path::new(&out),
            ))
        }
        "help" | "--help" | "-h" => {
            print!("{USAGE}");
            Ok(0)
        }
        other => bail!("unknown command `{other}`\n\n{USAGE}"),
    }
}

fn pipeline(args: &mut Args) -> Result<String> {
    let pipeline = args
        .value("--pipeline")?
        .unwrap_or_else(|| "legacy".to_string());
    match pipeline.as_str() {
        "legacy" | "ast" => Ok(pipeline),
        other => bail!("unknown pipeline `{other}`, expected `legacy` or `ast`"),
    }
}

fn workspace_root() -> PathBuf {
    Path::new(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .expect("xtask lives in a subdirectory of the workspace")
        .to_path_buf()
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
