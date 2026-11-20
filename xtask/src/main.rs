//! Project automation for rglsl.
//!
//! - `cargo xtask oracles` fetches and builds the pinned reference tools
//!   (glslang, spirv-val) into `target/oracles/`.
//! - `cargo xtask test` runs the conformance corpora against the oracles and
//!   writes `PROGRESS.md`.

mod bench;
mod builtins;
mod capi;
mod cli;
mod corpus;
mod debuginfo;
mod exec;
mod fuzz;
mod fuzz_exec;
mod fuzz_libfuzzer;
mod fuzz_random;
mod fuzz_reduce;
mod gen_spirv;
mod groups;
mod interface;
mod object_path;
mod opt_quality;
mod optimized;
mod oracles;
mod process;
mod recursion;
mod renamed;
mod report;
mod runner;
mod snapshots;
mod worker;

use std::path::{Path, PathBuf};

use anyhow::{Context, Result, bail};

const USAGE: &str = "\
usage: cargo xtask <command> [options]

commands:
  oracles             fetch and build the pinned oracles into target/oracles: glslang,
                      spirv-val, spirv-as, spirv-dis, spirv-opt, glslang-opt (glslang with the
                      optimizer, for bench and opt-quality), and on macOS arm64 the exec oracles (KosmicKrisp, Amber,
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
      --filter TEXT       only run shaders whose file name contains TEXT (or one of the
                          comma-separated TEXTs)
      --jobs N            number of parallel jobs (default: number of CPUs)
      --timeout SECS      per-process timeout (default: 30)
      --no-progress-file  do not rewrite PROGRESS.md (for filtered or local runs)
      --no-exec           do not run shaders on any Vulkan target; PROGRESS.md keeps the
                          exec results of the last run that had them
      --no-local-exec     do not run shaders on KosmicKrisp on this Mac
      --no-remote-exec    do not run shaders on the remote Windows targets
  snapshots           assemble the SPIR-V snapshots in rglsl/tests/out/spv with spirv-as and
                      validate them with spirv-val for the Vulkan version of their SPIR-V
  recursion           build the workspace's LLVM IR (opt-level 0, one codegen unit) into
                      target/xtask/recursion, build its call graph (direct calls and functions
                      whose address is taken, through vtables and function pointers) and fail
                      on every cycle that touches the workspace, does not go through
                      rglsl_types::stack::recurse and is not allowed, with its reason and
                      bound, in xtask/recursion-allowed.toml; drop glue (drop_in_place<T>)
                      is cut where T has a Drop impl that reaches recurse, and a drop glue
                      cycle without one names the recursive types to give such a Drop impl
      --no-build          reuse the LLVM IR of the last build
      --verbose           also list the allowed cycles
  capi-header         generate rglsl-capi/include/rglsl.h with cbindgen
      --check             only check that the committed header is up to date
  gen-spirv           generate the SPIR-V tables from the pinned sources in target/oracles:
                      rglsl/src/back/spv/grammar.rs (enumerants the `spirv` crate lacks, from
                      SPIRV-Headers' grammar, else glslang's headers),
                      rglsl-dis/src/glslang/glslang_tables.rs (the -H tables of glslang's
                      SPIRV/doc.cpp and disassemble.cpp) and rglsl-dis/src/standard/grammar.rs
                      (the --spirv-dis tables of SPIRV-Headers' grammars and spir-v.xml)
      --glslang-dir DIR   glslang checkout to read (default: target/oracles/src/glslang;
                          its HEAD must be the pinned commit)
      --check             only check that the committed files are up to date
  builtins            compile a minimal shader for every prototype of a built-in function and
                      every built-in variable in rglsl-sema's tables and in glslang's symbol
                      table (--dump-builtin-symbols), for GLSL 450 (Vulkan 1.1) and 460
                      (Vulkan 1.3) and every stage, with glslang and rglsl, and compare
                      acceptance, spirv-val, and the SPIR-V capabilities, extensions and
                      operations; known divergences are listed in xtask/builtins-expected.toml;
                      report in target/xtask/builtins.tsv, built-ins declared by one side only
                      in target/xtask/builtins-coverage.tsv; exits with 1 on an unexpected
                      divergence or, on a full run, on an expectation that no longer diverges
      --filter TEXT       only built-ins whose name contains TEXT (or one of the
                          comma-separated TEXTs)
      --version N         only GLSL version N (450 or 460)
      --stage EXT         only the stages with these file extensions (comma-separated)
      --all-overloads     every overload in every stage; by default every overload is
                          compiled as a fragment shader and, in the other stages, the first
                          overload of each name and the overloads a fragment shader lacks
      --jobs N            number of parallel jobs (default: number of CPUs)
      --timeout SECS      per-process timeout (default: 30)
  cli                 run glslangValidator command lines with glslang and with the rglsl
                      command-line tool and compare exit codes, messages and outputs
                      (docs/design/cli.md); report in target/xtask/cli/report.tsv
      --glslang-dir DIR   glslang checkout whose Test/ is used
      --filter TEXT       only run cases whose name contains TEXT
      --timeout SECS      per-process timeout (default: 30)
  bench               compare the compile time of the rglsl command-line tool (release build)
                      with glslangValidator (target/oracles/bin/glslang) on the corpus shaders
                      both accept, the link tests and large synthetic shaders, one process at a
                      time; report in target/xtask/bench.md, per-shader numbers in bench.tsv
      --glslang-dir DIR   glslang checkout whose Test/ and gtests/ are used
      --filter TEXT       only run shaders whose name contains TEXT (or one of the
                          comma-separated TEXTs)
      --runs N            timed runs per shader and compiler after a warm-up run (default 10)
      --debug-info MODE   add -g or -gVS (MODE: g, gVS) to every command line; the report
                          goes to target/xtask/bench-MODE.md
      --timeout SECS      per-process timeout of the warm-up run (default: 60)
      --in-process        compile in one process each instead: rglsl through its library
                          (with a phase breakdown), glslang through a C++ harness linked
                          against target/oracles/build; first and steady-state compiles of
                          the Vulkan and gl-as-vulkan corpus shaders and the synthetic ones;
                          report in target/xtask/bench-in-process.md and .tsv
  opt-quality         build every shader rglsl compiles (glslang corpus, tests/link references,
                      tests/exec, synthetic) as rglsl, rglsl -O and -Os, spirv-opt -O and -Os of
                      rglsl's module and glslang -O (target/oracles/bin/glslang-opt), validate each with spirv-val and
                      count SPIR-V instructions, Function variables, loads, stores, blocks,
                      functions and words; report in target/xtask/opt-quality.md and .tsv, modules
                      in target/xtask/opt-quality/modules
      --glslang-dir DIR   glslang checkout whose Test/ and gtests/ are used
      --filter TEXT       only shaders whose name contains TEXT (or one of the comma-separated TEXTs)
      --timeout SECS      per-process timeout (default: 120); an Amber run of --exec has at most
                          30 seconds (a synthetic shader 120), a timed run twice that
      --exec              also run every shader the exec planner can execute on the Vulkan
                          targets (local and remote, as for `test`) as rglsl, rglsl -O,
                          spirv-opt -O(rglsl) and glslang -O with Amber's --pipeline-stats:
                          driver statistics (VK_KHR_pipeline_executable_properties,
                          VK_AMD_shader_info), pipeline creation time, GPU time of repeated
                          TIMED_EXECUTION runs, and whether rglsl -O, spirv-opt -O(rglsl) and
                          glslang -O compute what rglsl's module does; report in target/xtask/opt-quality-exec.md and .tsv (RGLSL_AMBER: a
                          locally built Amber)
      --exec-target T     with --exec, run on these targets only: local, remote or an entry of
                          RGLSL_EXEC_REMOTE
      --runs N            with --exec, timed runs of each shader (default 10)
  fuzz                compare rglsl with glslang on a directory of shaders
                      (accepted or not, valid SPIR-V, crashes); findings go to
                      target/xtask/fuzz/differential/report.tsv
      --shaders DIR       the shaders to compare (searched recursively)
      --random            instead of --shaders: generate a fresh set of shader families with
                          rglsl-fuzz (references and donors from rglsl-fuzz/tests/data/450)
                          into target/xtask/fuzz/random/<seed>/ (the previous set is deleted),
                          compile them with glslang and rglsl and, with --exec, qualify every
                          shader on every exec target and mode (O0: glslang, with --opt also O:
                          glslang-opt -O) by running glslang's module: it must run and render
                          the image of glslang's unoptimized reference; a hang, driver reset
                          or driver crash that repeats alone is added to
                          tests/fuzz-quarantine/<target>/<mode>/, Amber crashes and glslang's
                          wrong results are reported to fix or analyse; rglsl (with -O in mode
                          O) then runs on the qualified shaders not in quarantine, and every
                          failure of rglsl fails the run; driver resets of the Windows targets
                          are read from the System log after every batch, and a target with
                          too many of them is stopped; report in
                          target/xtask/fuzz/random/<seed>/report.md and report.tsv
      --seed N            with --random: the generator's seed (default: from the clock, printed)
      --families K        with --random: shader families to generate (default 29)
      --variants V        with --random: variants per family (default 16)
      --exec              also run every shader family of rglsl-fuzz on the Vulkan targets
                          (local and remote, as for `test`): a variant whose image differs
                          from its reference is a wrong result; failures are rerun alone
      --exec-target T     with --exec, run on these targets only: local, remote (every remote
                          target) or an entry of RGLSL_EXEC_REMOTE (`alias` or `alias@device`);
                          with --reduce it must name one target
      --exec-glslang      with --exec, also run the modules glslang compiles
      --opt               also compile every shader with -O and validate it; with --exec, run
                          the -O module too: it must compute what the unoptimized one does
                          (with --random: qualify and run the O mode too)
      --reduce JOB        reduce the variant shader job JOB (a .json next to its shader) with
                          rglsl-fuzz's reducer instead of comparing a directory
      --interesting K     with --reduce: crash, reject, invalid-spirv (glslang accepts and
                          rglsl crashes, rejects or emits invalid SPIR-V), rglsl-fails
                          (glslang accepts and rglsl crashes or rejects the shader, compiled
                          alone or as an object linked alone), differs-from-glslang
                          (rglsl's module renders differently from glslang's on the exec
                          target), differs-from-reference (rglsl's variant renders
                          differently from rglsl's reference, glslang's does not) or
                          exec-fails (rglsl's module fails on the driver, glslang's runs),
                          optimizer-differs (rglsl -O renders differently from rglsl or fails
                          on the driver while rglsl's module runs), optimizer-fails (rglsl -O
                          fails on the driver while rglsl's module runs), optimizer-hangs (rglsl's
                          unoptimized module runs, then rglsl -O's module hangs) or exec-hangs
                          (glslang's module runs, then rglsl's module hangs); each module of the
                          hang criteria runs alone, and it hangs when Amber times out, the device
                          is lost (DEVICE_LOST) or a driver reset event of a Windows target falls
                          into its run
      --preserve-semantics  with --reduce: only undo the generator's transformations
      --max-steps N       with --reduce: interestingness tests to run at most (default 2000)
      --repeats N         with --reduce and an exec criterion: a candidate is interesting only
                          if it is interesting on N runs in a row (default 3)
      --no-ub-guards      with --reduce and without --preserve-semantics: do not guard every
                          candidate against undefined behaviour (by default: every local and
                          private global without an initializer is zero-initialised, whatever
                          its type, indices are clamped and loops bounded when the input stays
                          interesting with bounded loops; an input that is interesting only
                          without the guards is an error)
      --output DIR        with --reduce: where the reproducer goes
                          (default target/xtask/fuzz/reduce/<family>-<variant>/result)
      --libfuzzer T       run the cargo-fuzz target T of rglsl-fuzz/fuzz (glsl_parser,
                          ir, object, glsl_variant) with cargo +nightly fuzz;
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
  RGLSL_SPIRV_AS, RGLSL_SPIRV_OPT
  RGLSL_GLSLANG_OPT
  RGLSL_AMBER, RGLSL_VK_ICD        override Amber and the Vulkan driver manifest
  RGLSL_EXEC_REMOTE                remote exec targets: comma-separated SSH host aliases of Windows
                                   machines with Vulkan, each optionally followed by @DEVICE, a
                                   substring of the GPU's name (unset: the remote targets are
                                   skipped with a warning); a target is named after its GPU vendor
  RGLSL_EXEC_REMOTE_DIR            work directory on each machine (default C:/rglsl-exec); one
                                   value, or comma-separated ALIAS=DIR entries and a default
  RGLSL_EXEC_REMOTE_JOBS           parallel Amber processes per machine (default 4 on an AMD GPU, 1
                                   on any other; an NVIDIA GPU always runs one at a time); same
                                   syntax
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
        "recursion" => {
            let options = recursion::Options {
                build: !args.flag("--no-build"),
                verbose: args.flag("--verbose"),
            };
            args.finish()?;
            recursion::run(&workspace_root()?, &options)
        }
        "snapshots" => {
            args.finish()?;
            snapshots::run(&workspace_root()?)
        }
        "capi-header" => {
            let check = args.flag("--check");
            args.finish()?;
            capi::run(&workspace_root()?, check)
        }
        "gen-spirv" => {
            let glslang_dir = args.value("--glslang-dir")?.map(PathBuf::from);
            let check = args.flag("--check");
            args.finish()?;
            gen_spirv::run(&workspace_root()?, glslang_dir.as_deref(), check)
        }
        "builtins" => {
            let versions = match args.parsed::<u32>("--version")? {
                Some(version) if builtins::VERSIONS.contains(&version) => vec![version],
                Some(version) => bail!("--version must be 450 or 460, not {version}"),
                None => builtins::VERSIONS.to_vec(),
            };
            let options = builtins::Options {
                filter: args.value("--filter")?,
                versions,
                stages: args
                    .value("--stage")?
                    .map(|stages| stages.split(',').map(String::from).collect()),
                all_overloads: args.flag("--all-overloads"),
                jobs: args.parsed("--jobs")?,
                timeout_secs: args.parsed("--timeout")?.unwrap_or(30),
            };
            args.finish()?;
            builtins::run(&workspace_root()?, &options)
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
        "bench" => {
            let options =
                bench::Options {
                    glslang_dir: args.value("--glslang-dir")?.map(PathBuf::from),
                    filter: args.value("--filter")?,
                    runs: args.parsed("--runs")?.unwrap_or(10),
                    debug_info: match args.value("--debug-info")? {
                        Some(mode) => Some(bench::DebugInfo::parse(&mode).with_context(|| {
                            format!("--debug-info must be g or gVS, not `{mode}`")
                        })?),
                        None => None,
                    },
                    timeout_secs: args.parsed("--timeout")?.unwrap_or(60),
                    in_process: args.flag("--in-process"),
                };
            args.finish()?;
            bench::run(&workspace_root()?, &options)
        }
        "opt-quality" => {
            let options = opt_quality::Options {
                glslang_dir: args.value("--glslang-dir")?.map(PathBuf::from),
                filter: args.value("--filter")?,
                timeout_secs: args.parsed("--timeout")?.unwrap_or(120),
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
                runs: args.parsed("--runs")?.unwrap_or(10),
            };
            args.finish()?;
            opt_quality::run(&workspace_root()?, &options)
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
        "fuzz" if args.has("--random") => {
            let command_line = std::iter::once("cargo xtask fuzz".to_string())
                .chain(args.args.iter().cloned())
                .collect::<Vec<_>>()
                .join(" ");
            let _ = args.flag("--random");
            let options = fuzz_random::Options {
                seed: args.parsed("--seed")?,
                families: args
                    .parsed("--families")?
                    .unwrap_or(fuzz_random::DEFAULT_FAMILIES),
                variants: args
                    .parsed("--variants")?
                    .unwrap_or(fuzz_random::DEFAULT_VARIANTS),
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
                optimize: args.flag("--opt"),
                args: command_line,
            };
            args.finish()?;
            if options.families == 0 || options.variants == 0 {
                bail!("--families and --variants must be at least 1");
            }
            Ok(if fuzz_random::run(&workspace_root()?, &options)? {
                0
            } else {
                1
            })
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
                repeats: args.parsed("--repeats")?.unwrap_or(3),
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
                optimize: args.flag("--opt"),
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
            let via_object = args.flag("--via-object");
            let hlsl_offsets = args.flag("--hlsl-offsets");
            let debug = args.value("--debug")?;
            let optimize = args
                .value("--opt")?
                .map(|level| worker::opt_level(&level))
                .transpose()?;
            let mut include_dirs = Vec::new();
            while let Some(directory) = args.value("--include-dir")? {
                include_dirs.push(directory);
            }
            let mut preamble = String::new();
            while let Some(line) = args.value("--preamble")? {
                preamble.push_str(&line);
                preamble.push('\n');
            }
            let mut options = Vec::new();
            while let Some(option) = args.value("--option")? {
                options.push(option);
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
                    via_object,
                    hlsl_offsets,
                    include_dirs: &include_dirs,
                    preamble: (!preamble.is_empty()).then_some(preamble),
                    debug: debug.as_deref(),
                    options: &options,
                    optimize,
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
            let optimize = args
                .value("--opt")?
                .map(|level| worker::opt_level(&level))
                .transpose()?;
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
                    optimize,
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
