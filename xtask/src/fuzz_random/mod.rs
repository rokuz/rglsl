pub mod classify;
mod generate;
mod quarantine;
mod report;

use std::collections::{BTreeMap, BTreeSet};
use std::fs;
use std::path::{Path, PathBuf};
use std::process::Command;
use std::time::Duration;

use anyhow::{Context, Result, bail};

use self::classify::{
    Class, Consensus, Image, Ran, ReferenceVerdict, Side, Watch, consensus, failure,
    judge_reference,
};
use self::quarantine::Mode;
use crate::exec::batch::Job;
use crate::exec::plan::Plan;
use crate::exec::{self, Executor, Outputs, TargetSpec};
use crate::fuzz::{self, Verdict};
use crate::fuzz_exec::{self, Staged};
use crate::oracles;
use crate::process::{self, Exit};

pub const DEFAULT_FAMILIES: usize = 29;
pub const DEFAULT_VARIANTS: u32 = 16;

#[derive(Debug)]
pub struct Options {
    pub seed: Option<u64>,
    pub families: usize,
    pub variants: u32,
    pub timeout_secs: u64,
    pub exec: Vec<TargetSpec>,
    pub optimize: bool,
    pub args: String,
}

#[derive(Debug)]
pub struct Shader {
    pub name: String,
    pub reference: Option<usize>,
    pub hash: u64,
    pub outcome: fuzz::Outcome,
    pub glslang_optimized: Result<(), String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Compiler {
    Glslang,
    Rglsl,
}

impl Shader {
    fn family(&self) -> &str {
        self.name.split('/').next().unwrap_or_default()
    }

    fn module(&self, compiler: Compiler, mode: Mode) -> PathBuf {
        let spirv = &self.outcome.spirv;
        match (compiler, mode) {
            (Compiler::Rglsl, Mode::Unoptimized) => spirv.clone(),
            (Compiler::Rglsl, Mode::Optimized) => fuzz::optimized_module(spirv),
            (Compiler::Glslang, Mode::Unoptimized) => spirv.with_extension("glslang.spv"),
            (Compiler::Glslang, Mode::Optimized) => spirv.with_extension("glslang.O.spv"),
        }
    }
}

type Key = (Mode, usize);

#[derive(Debug, Clone)]
pub struct Cell {
    pub class: Class,
    pub note: String,
    pub entry: Option<PathBuf>,
    pub rglsl: Option<(Verdict, String)>,
}

impl Cell {
    const fn new(class: Class, note: String) -> Self {
        Self {
            class,
            note,
            entry: None,
            rglsl: None,
        }
    }
}

#[derive(Debug)]
pub struct TargetRun {
    pub label: String,
    pub driver: String,
    pub cells: BTreeMap<Key, Cell>,
    pub stopped: Option<String>,
    pub problems: Vec<String>,
    pub resets: usize,
}

struct Run<'a> {
    root: &'a Path,
    shaders: &'a [Shader],
    modes: &'a [Mode],
    seed: u64,
    generator: &'a str,
}

fn clock_seed() -> u64 {
    std::time::SystemTime::now()
        .duration_since(std::time::UNIX_EPOCH)
        .map_or(0, |d| u64::try_from(d.as_micros()).unwrap_or(u64::MAX))
}

pub fn run(root: &Path, options: &Options) -> Result<bool> {
    let seed = options.seed.unwrap_or_else(clock_seed);
    eprintln!("[xtask] random fuzzing with seed {seed}");
    let base = crate::fuzz_libfuzzer::fuzz_root(root).join("random");
    let _ = fs::remove_dir_all(&base);
    let dir = base.join(seed.to_string());
    fs::create_dir_all(&dir)?;
    let generator = generate::generator_hash(root)?;
    let generation = generate::Generation {
        seed,
        families: options.families,
        variants: options.variants,
        args: options.args.clone(),
        generator: generator.clone(),
    };
    let shaders_dir = dir.join("shaders");
    let generated = generate::generate(root, &shaders_dir, &generation)?;
    for failure in &generated.failures {
        eprintln!("[xtask] warning: {failure}");
    }
    if generated.families.is_empty() {
        bail!("rglsl-fuzz generated no shader family");
    }
    eprintln!(
        "[xtask] generated {} shader families in {} (generator {generator})",
        generated.families.len(),
        shaders_dir.display()
    );

    let timeout = Duration::from_secs(options.timeout_secs);
    let shaders = compile_all(root, &dir, &shaders_dir, options.optimize, timeout)?;
    let modes: Vec<Mode> = if options.optimize {
        vec![Mode::Unoptimized, Mode::Optimized]
    } else {
        vec![Mode::Unoptimized]
    };
    let glslang = oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?;
    let executors = exec::open_executors(
        &options.exec,
        root,
        &glslang.path,
        &dir.join("exec"),
        timeout,
    )?;
    let context = Run {
        root,
        shaders: &shaders,
        modes: &modes,
        seed,
        generator: &generator,
    };
    let context = &context;
    let mut targets = std::thread::scope(|scope| {
        let handles: Vec<_> = executors
            .iter()
            .map(|executor| scope.spawn(move || start_target(context, executor)))
            .collect();
        handles
            .into_iter()
            .map(|handle| {
                handle
                    .join()
                    .map_err(|_| anyhow::anyhow!("an exec target's thread panicked"))?
            })
            .collect::<Result<Vec<_>>>()
    })?;
    apply_consensus(&mut targets)?;
    let runs = finish_targets(targets)?;

    let report = report::Report {
        seed,
        generator: &generator,
        args: &options.args,
        shaders: &shaders,
        modes: &modes,
        targets: &runs,
        generation_failures: &generated.failures,
    };
    let markdown = dir.join("report.md");
    let table = dir.join("report.tsv");
    fs::write(&markdown, report.markdown())?;
    fs::write(&table, report.tsv())?;
    print!("{}", report.summary());
    eprintln!(
        "[xtask] report: {} and {}",
        markdown.display(),
        table.display()
    );
    Ok(report.passed())
}

fn compile_all(
    root: &Path,
    dir: &Path,
    shaders_dir: &Path,
    optimize: bool,
    timeout: Duration,
) -> Result<Vec<Shader>> {
    let glslang = oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?.path;
    let spirv_val = oracles::find_tool(root, "spirv-val", "RGLSL_SPIRV_VAL")?.path;
    let glslang_opt = if optimize {
        Some(oracles::find_tool(root, "glslang-opt", "RGLSL_GLSLANG_OPT")?.path)
    } else {
        None
    };
    let self_exe = std::env::current_exe().context("locating the xtask binary")?;
    let spirv_dir = dir.join("spirv");
    fs::create_dir_all(&spirv_dir)?;
    let paths = fuzz::collect_shaders(shaders_dir)?;
    let indices: Vec<usize> = (0..paths.len()).collect();
    let compiled = exec::parallel_map(&indices, |index| -> Result<Shader> {
        let path = paths.get(*index).context("shader index")?;
        let spirv = spirv_dir.join(format!("{index}.spv"));
        let outcome = fuzz::compare(
            &glslang, &spirv_val, &self_exe, path, &spirv, timeout, optimize,
        )
        .with_context(|| path.display().to_string())?;
        let glslang_optimized = match (&glslang_opt, outcome.verdict) {
            (Some(tool), Verdict::Agree) => {
                glslang_optimize(tool, path, &spirv.with_extension("glslang.O.spv"), timeout)
            }
            (Some(_), _) => Err("not compiled".into()),
            (None, _) => Err("-O is off".into()),
        };
        let reference = fuzz_exec::family_of(path).and_then(|r| paths.iter().position(|p| *p == r));
        let name = path
            .strip_prefix(shaders_dir)
            .unwrap_or(path)
            .to_string_lossy()
            .replace('\\', "/");
        Ok(Shader {
            name,
            reference,
            hash: quarantine::shader_hash(path)?,
            outcome,
            glslang_optimized,
        })
    });
    compiled.into_iter().collect()
}

fn glslang_optimize(
    tool: &Path,
    shader: &Path,
    out: &Path,
    timeout: Duration,
) -> Result<(), String> {
    let mut command = Command::new(tool);
    command
        .args(["--target-env", "vulkan1.0", "-O", "-o"])
        .arg(out)
        .arg(shader);
    let output = process::run(command, timeout).map_err(|e| format!("{e:#}"))?;
    if matches!(output.exit, Exit::Code(0)) {
        return Ok(());
    }
    Err(format!(
        "glslang -O failed: {}",
        exec::amber::first_line(&output.stdout, &output.stderr)
    ))
}

type Prepared = Result<(Box<Plan>, Job), (Class, String)>;

fn stage(
    executor: &Executor,
    shader: &Shader,
    index: usize,
    compiler: Compiler,
    mode: Mode,
) -> Prepared {
    let dir = executor
        .work_dir()
        .join("fuzz")
        .join(format!("s{index}-{}", mode.label()));
    let tag = match (compiler, mode) {
        (Compiler::Glslang, Mode::Unoptimized) => "glslang",
        (Compiler::Glslang, Mode::Optimized) => "glslang-O",
        (Compiler::Rglsl, Mode::Unoptimized) => "rglsl",
        (Compiler::Rglsl, Mode::Optimized) => "rglsl-O",
    };
    let json = fuzz_exec::job_json(&shader.outcome.shader);
    match fuzz_exec::stage_module(
        executor,
        &shader.module(compiler, mode),
        json.as_deref(),
        &dir,
        tag,
    ) {
        Staged::Ready { plan, job } => Ok((plan, job)),
        Staged::Refused(why) => Err((Class::Refused, why)),
    }
}

fn run_keys(
    watch: &mut Watch<'_>,
    ready: &BTreeMap<Key, (Box<Plan>, Job)>,
    keys: &[Key],
    alone: bool,
) -> BTreeMap<Key, Ran> {
    let mut chosen = Vec::new();
    let mut jobs = Vec::new();
    for key in keys {
        if let Some((_, job)) = ready.get(key) {
            chosen.push(*key);
            jobs.push(job.clone());
        }
    }
    chosen.into_iter().zip(watch.run(&jobs, alone)).collect()
}

type Expected = BTreeMap<usize, (Box<Plan>, Outputs)>;

fn qualify(
    context: &Run<'_>,
    key: Key,
    ran: &Ran,
    plan: &Plan,
    expected: &Expected,
) -> (Class, String) {
    if let Some(failed) = failure(ran) {
        return failed;
    }
    let (mode, index) = key;
    let Ok(outputs) = &ran.result else {
        return (Class::NotRun, "no result".into());
    };
    let reference = context.shaders.get(index).and_then(|s| s.reference);
    if mode == Mode::Unoptimized && reference == Some(index) {
        return (Class::Pass, String::new());
    }
    let Some((reference_plan, reference_outputs)) = reference.and_then(|r| expected.get(&r)) else {
        return (
            Class::ReferenceNotQualified,
            "not run: reference not qualified".into(),
        );
    };
    match fuzz_exec::compare_runs((reference_plan, reference_outputs), (plan, outputs)) {
        Ok(_) => (Class::Pass, String::new()),
        Err(difference) => (
            Class::GlslangWrong,
            format!("differs from glslang's reference: {difference}"),
        ),
    }
}

fn start_target<'a, 'b>(
    context: &'a Run<'b>,
    executor: &'a Executor,
) -> Result<Qualification<'a, 'b>> {
    let label = executor.target.label().to_string();
    let mut known = BTreeMap::new();
    for mode in context.modes {
        known.insert(*mode, quarantine::load(context.root, &label, *mode)?);
    }
    let mut cells: BTreeMap<Key, Cell> = BTreeMap::new();
    let keys: Vec<Key> = context
        .modes
        .iter()
        .flat_map(|mode| {
            context
                .shaders
                .iter()
                .enumerate()
                .filter(|(_, shader)| shader.outcome.verdict == Verdict::Agree)
                .map(|(index, _)| (*mode, index))
        })
        .collect();
    let prepared: Vec<Option<Prepared>> = exec::parallel_map(&keys, |(mode, index)| {
        let shader = context.shaders.get(*index)?;
        if known
            .get(mode)
            .is_some_and(|hashes| hashes.contains(&shader.hash))
        {
            return Some(Err((
                Class::Quarantined,
                format!(
                    "in {}",
                    quarantine::mode_dir(Path::new(""), &label, *mode).display()
                ),
            )));
        }
        if *mode == Mode::Optimized
            && let Err(why) = &shader.glslang_optimized
        {
            return Some(Err((Class::NotCompiled, why.clone())));
        }
        Some(stage(executor, shader, *index, Compiler::Glslang, *mode))
    });
    let mut ready: BTreeMap<Key, (Box<Plan>, Job)> = BTreeMap::new();
    for (key, prepared) in keys.iter().zip(prepared) {
        match prepared {
            Some(Ok(staged)) => {
                ready.insert(*key, staged);
            }
            Some(Err((class, note))) => {
                cells.insert(*key, Cell::new(class, note));
            }
            None => {}
        }
    }
    let mut qualification = Qualification {
        context,
        executor,
        label,
        watch: Watch::new(executor),
        ready,
        cells,
        runs: BTreeMap::new(),
        firsts: BTreeMap::new(),
        verdicts: BTreeMap::new(),
        expected: Expected::new(),
    };
    qualification.references()?;
    Ok(qualification)
}

fn references_of(shaders: &[Shader]) -> BTreeSet<usize> {
    shaders
        .iter()
        .filter_map(|shader| shader.reference)
        .collect()
}

fn apply_consensus(targets: &mut [Qualification<'_, '_>]) -> Result<()> {
    let Some(first) = targets.first() else {
        return Ok(());
    };
    let references = references_of(first.context.shaders);
    let labels: Vec<String> = targets.iter().map(|target| target.label.clone()).collect();
    for reference in references {
        let verdicts = {
            let images: Vec<Option<Image<'_>>> = targets
                .iter()
                .map(|target| target.reference_image(reference))
                .collect();
            consensus(&images)
        };
        for (index, verdict) in verdicts.into_iter().enumerate() {
            let (class, note) = match verdict {
                Consensus::Agrees => continue,
                Consensus::Differs { consensus, detail } => {
                    let names: Vec<&str> = consensus
                        .iter()
                        .filter_map(|member| labels.get(*member).map(String::as_str))
                        .collect();
                    (
                        Class::ReferenceDiffers,
                        format!(
                            "reference differs from {}' consensus: {detail}",
                            names.join(", ")
                        ),
                    )
                }
                Consensus::NoMajority { detail } => (
                    Class::GlslangWrong,
                    format!(
                        "the targets' references render differently and no image has a majority: {detail}"
                    ),
                ),
            };
            if let Some(target) = targets.get_mut(index) {
                target.reject_reference(reference, class, &note)?;
            }
        }
    }
    Ok(())
}

fn finish_targets(targets: Vec<Qualification<'_, '_>>) -> Result<Vec<TargetRun>> {
    std::thread::scope(|scope| {
        let handles: Vec<_> = targets
            .into_iter()
            .map(|target| scope.spawn(move || target.finish()))
            .collect();
        handles
            .into_iter()
            .map(|handle| {
                handle
                    .join()
                    .map_err(|_| anyhow::anyhow!("an exec target's thread panicked"))?
            })
            .collect()
    })
}

struct Qualification<'a, 'b> {
    context: &'a Run<'b>,
    executor: &'a Executor,
    label: String,
    watch: Watch<'a>,
    ready: BTreeMap<Key, (Box<Plan>, Job)>,
    cells: BTreeMap<Key, Cell>,
    runs: BTreeMap<Key, Ran>,
    firsts: BTreeMap<Key, (Class, String)>,
    verdicts: BTreeMap<usize, ReferenceVerdict>,
    expected: Expected,
}

impl Qualification<'_, '_> {
    fn confirm(&mut self, seen: BTreeMap<Key, (Class, String)>) {
        if seen.is_empty() {
            return;
        }
        let keys: Vec<Key> = seen.keys().copied().collect();
        for (key, ran) in run_keys(&mut self.watch, &self.ready, &keys, true) {
            self.runs.insert(key, ran);
        }
        self.firsts.extend(seen);
    }

    fn side<'s>(&'s self, key: Key, failed: Option<&'s (Class, String)>) -> Side<'s> {
        if let Some((class, note)) = failed {
            return Side::Failed(*class, note);
        }
        match (self.ready.get(&key), self.runs.get(&key)) {
            (
                Some((plan, _)),
                Some(Ran {
                    result: Ok(outputs),
                    ..
                }),
            ) => Side::Ran(plan, outputs),
            (Some(_), _) => Side::Failed(Class::NotRun, "no result"),
            (None, _) => match self.cells.get(&key) {
                Some(cell) => Side::Failed(cell.class, &cell.note),
                None => Side::Failed(Class::NotCompiled, "glslang did not compile it"),
            },
        }
    }

    fn verdict(&self, reference: usize) -> ReferenceVerdict {
        let failed = |key: Key| {
            self.runs
                .get(&key)
                .and_then(failure)
                .filter(|_| self.ready.contains_key(&key))
        };
        let unoptimized_key = (Mode::Unoptimized, reference);
        let optimized_key = (Mode::Optimized, reference);
        let unoptimized_failure = failed(unoptimized_key);
        let optimized_failure = failed(optimized_key);
        let unoptimized = self.side(unoptimized_key, unoptimized_failure.as_ref());
        let optimized = self
            .context
            .modes
            .contains(&Mode::Optimized)
            .then(|| self.side(optimized_key, optimized_failure.as_ref()));
        judge_reference(unoptimized, optimized)
    }

    fn reference_image(&self, reference: usize) -> Option<Image<'_>> {
        self.expected
            .get(&reference)
            .map(|(plan, outputs)| (plan.as_ref(), outputs))
    }

    fn references(&mut self) -> Result<()> {
        let references = references_of(self.context.shaders);
        let keys: Vec<Key> = self
            .ready
            .keys()
            .filter(|key| references.contains(&key.1))
            .copied()
            .collect();
        eprintln!(
            "[xtask] qualifying {} glslang reference modules on the {} target",
            keys.len(),
            self.label
        );
        self.runs = run_keys(&mut self.watch, &self.ready, &keys, false);
        let failing: BTreeMap<Key, (Class, String)> = keys
            .iter()
            .filter_map(|key| {
                let failed = self.runs.get(key).and_then(failure)?;
                failed.0.needs_confirmation().then_some((*key, failed))
            })
            .collect();
        self.confirm(failing);
        let mut disagreeing = BTreeMap::new();
        for reference in &references {
            let verdict = self.verdict(*reference);
            if verdict.unoptimized.0 == Class::GlslangWrong {
                for mode in [Mode::Unoptimized, Mode::Optimized] {
                    let key = (mode, *reference);
                    if !self.firsts.contains_key(&key) {
                        disagreeing.insert(key, verdict.unoptimized.clone());
                    }
                }
            }
        }
        self.confirm(disagreeing);
        for reference in references {
            let verdict = self.verdict(reference);
            let key = (Mode::Unoptimized, reference);
            if verdict.qualified()
                && let (
                    Some((plan, _)),
                    Some(Ran {
                        result: Ok(outputs),
                        ..
                    }),
                ) = (self.ready.get(&key), self.runs.get(&key))
            {
                self.expected
                    .insert(reference, (plan.clone(), outputs.clone()));
            }
            let sides = [
                (Mode::Unoptimized, Some(verdict.unoptimized.clone())),
                (Mode::Optimized, verdict.optimized.clone()),
            ];
            for (mode, side) in sides {
                let key = (mode, reference);
                if let (Some((class, note)), true) = (side, self.ready.contains_key(&key)) {
                    let cell = self.finish_cell(key, class, note)?;
                    self.cells.insert(key, cell);
                }
            }
            self.verdicts.insert(reference, verdict);
        }
        Ok(())
    }

    fn reject_reference(&mut self, reference: usize, class: Class, note: &str) -> Result<()> {
        self.expected.remove(&reference);
        let shader = self
            .context
            .shaders
            .get(reference)
            .map_or("?", |shader| shader.name.as_str());
        eprintln!(
            "[xtask] the reference {shader} is not qualified on the {} target: {note}",
            self.label
        );
        for mode in self.context.modes {
            let key = (*mode, reference);
            if !self.ready.contains_key(&key) {
                continue;
            }
            let mut cell = Cell::new(class, note.to_string());
            if class == Class::ReferenceDiffers {
                cell.entry = Some(add_to_quarantine(
                    self.context,
                    self.executor,
                    &self.label,
                    key,
                    &cell,
                    note,
                )?);
            }
            self.cells.insert(key, cell);
        }
        if let Some(verdict) = self.verdicts.get_mut(&reference) {
            verdict.unoptimized = (class, note.to_string());
            if let Some(optimized) = verdict.optimized.as_mut() {
                *optimized = (class, note.to_string());
            }
        }
        Ok(())
    }

    fn finish(mut self) -> Result<TargetRun> {
        let mut variants = Vec::new();
        let keys: Vec<Key> = self.ready.keys().copied().collect();
        for key in keys {
            let reference = self.context.shaders.get(key.1).and_then(|s| s.reference);
            if reference == Some(key.1) {
                continue;
            }
            let why = match reference.and_then(|r| self.verdicts.get(&r)) {
                Some(verdict) if verdict.qualified() => {
                    variants.push(key);
                    continue;
                }
                Some(verdict) => verdict.reason(),
                None => "glslang did not compile it".into(),
            };
            self.cells.insert(
                key,
                Cell::new(
                    Class::ReferenceNotQualified,
                    format!("not run: reference not qualified: {why}"),
                ),
            );
        }
        self.variants(&variants)?;
        run_rglsl(
            self.context,
            self.executor,
            &mut self.watch,
            &mut self.cells,
            &self.expected,
        );
        Ok(TargetRun {
            label: self.label,
            driver: format!(
                "{} ({})",
                self.executor.device.driver, self.executor.device.name
            ),
            cells: self.cells,
            stopped: self.watch.stopped.clone(),
            problems: self.watch.problems.clone(),
            resets: self.watch.resets(),
        })
    }

    fn variants(&mut self, keys: &[Key]) -> Result<()> {
        eprintln!(
            "[xtask] qualifying {} glslang variant modules on the {} target",
            keys.len(),
            self.label
        );
        let runs = run_keys(&mut self.watch, &self.ready, keys, false);
        self.runs.extend(runs);
        let classify = |this: &Self, key: &Key| {
            let (plan, _) = this.ready.get(key)?;
            let ran = this.runs.get(key)?;
            Some(qualify(this.context, *key, ran, plan, &this.expected))
        };
        let mut classes: BTreeMap<Key, (Class, String)> = keys
            .iter()
            .filter_map(|key| Some((*key, classify(self, key)?)))
            .collect();
        let suspects: BTreeMap<Key, (Class, String)> = classes
            .iter()
            .filter(|(_, (class, _))| class.needs_confirmation())
            .map(|(key, seen)| (*key, seen.clone()))
            .collect();
        if !suspects.is_empty() {
            eprintln!(
                "[xtask] confirming {} glslang modules alone on the {} target",
                suspects.len(),
                self.label
            );
        }
        let confirmed: Vec<Key> = suspects.keys().copied().collect();
        self.confirm(suspects);
        for key in confirmed {
            if let Some(class) = classify(self, &key) {
                classes.insert(key, class);
            }
        }
        for (key, (class, note)) in classes {
            let cell = self.finish_cell(key, class, note)?;
            self.cells.insert(key, cell);
        }
        Ok(())
    }

    fn finish_cell(&self, key: Key, class: Class, note: String) -> Result<Cell> {
        let mut cell = Cell::new(class, note);
        if let Some((first, first_note)) = self.firsts.get(&key) {
            if first.hangs_the_driver() && class.hangs_the_driver() {
                cell.entry = Some(add_to_quarantine(
                    self.context,
                    self.executor,
                    &self.label,
                    key,
                    &cell,
                    first_note,
                )?);
            } else if *first != class || class == Class::Pass {
                cell.note = format!(
                    "{}{}in the batch: {}: {first_note}",
                    cell.note,
                    if cell.note.is_empty() { "" } else { "; " },
                    first.label()
                );
            }
        }
        Ok(cell)
    }
}

fn add_to_quarantine(
    context: &Run<'_>,
    executor: &Executor,
    label: &str,
    key: Key,
    cell: &Cell,
    first: &str,
) -> Result<PathBuf> {
    let (mode, index) = key;
    let shader = context.shaders.get(index).context("shader index")?;
    let source = &shader.outcome.shader;
    let seconds = exec::amber::now_ms() / 1000;
    let reason = quarantine::Reason {
        verdict: cell.class.label().to_string(),
        first: first.to_string(),
        confirmed: cell.note.clone(),
        exit: exit_of(&cell.note),
        seed: context.seed,
        generator: context.generator.to_string(),
        date: quarantine::utc_date(seconds),
        driver: executor.device.driver.clone(),
        device: executor.device.name.clone(),
        shader: shader.name.clone(),
    };
    let name = quarantine::entry_name(shader.family(), source, shader.hash);
    let entry = quarantine::add(context.root, label, mode, &name, source, &reason)?;
    eprintln!(
        "[xtask] quarantined {} on {label} {}: {}",
        shader.name,
        mode.label(),
        cell.class.label()
    );
    Ok(entry
        .strip_prefix(context.root)
        .map_or(entry.clone(), Path::to_path_buf))
}

fn exit_of(note: &str) -> String {
    note.split(" [")
        .nth(1)
        .and_then(|rest| rest.split(']').next())
        .map_or_else(
            || {
                note.split(": ")
                    .next()
                    .unwrap_or_default()
                    .chars()
                    .take(120)
                    .collect()
            },
            str::to_string,
        )
}

const fn wrong(mode: Mode) -> Verdict {
    match mode {
        Mode::Unoptimized => Verdict::WrongResult,
        Mode::Optimized => Verdict::WrongResultOptimized,
    }
}

const fn failed(mode: Mode) -> Verdict {
    match mode {
        Mode::Unoptimized => Verdict::ExecFailed,
        Mode::Optimized => Verdict::ExecFailedOptimized,
    }
}

fn judge(
    context: &Run<'_>,
    key: Key,
    ran: &Ran,
    plan: &Plan,
    expected: &Expected,
) -> (Verdict, String) {
    let (mode, index) = key;
    if let Some((class, note)) = failure(ran) {
        return if class == Class::NotRun {
            (
                Verdict::ExecError,
                format!("the target did not run rglsl's module: {note}"),
            )
        } else {
            (
                failed(mode),
                format!(
                    "rglsl's module: {}: {note}; glslang's module runs",
                    class.label()
                ),
            )
        };
    }
    let Ok(outputs) = &ran.result else {
        return (Verdict::ExecError, "no result".into());
    };
    let reference = context.shaders.get(index).and_then(|s| s.reference);
    let Some((reference_plan, reference_outputs)) = reference.and_then(|r| expected.get(&r)) else {
        return (
            Verdict::ExecError,
            "the family's reference has no expected output".into(),
        );
    };
    match fuzz_exec::compare_runs((reference_plan, reference_outputs), (plan, outputs)) {
        Ok(_) => (Verdict::Agree, String::new()),
        Err(difference) => (
            wrong(mode),
            format!("differs from glslang's reference: {difference}"),
        ),
    }
}

fn run_rglsl(
    context: &Run<'_>,
    executor: &Executor,
    watch: &mut Watch<'_>,
    cells: &mut BTreeMap<Key, Cell>,
    expected: &Expected,
) {
    let qualified: Vec<Key> = cells
        .iter()
        .filter(|(_, cell)| cell.class == Class::Pass)
        .map(|(key, _)| *key)
        .collect();
    let prepared: Vec<Option<Prepared>> = exec::parallel_map(&qualified, |(mode, index)| {
        let shader = context.shaders.get(*index)?;
        Some(stage(executor, shader, *index, Compiler::Rglsl, *mode))
    });
    let mut ready: BTreeMap<Key, (Box<Plan>, Job)> = BTreeMap::new();
    for (key, prepared) in qualified.iter().zip(prepared) {
        let verdict = match prepared {
            Some(Ok(staged)) => {
                ready.insert(*key, staged);
                continue;
            }
            Some(Err((_, why))) => (
                Verdict::ExecError,
                format!("the harness cannot run rglsl's module, glslang's runs: {why}"),
            ),
            None => (Verdict::ExecError, "no shader".into()),
        };
        if let Some(cell) = cells.get_mut(key) {
            cell.rglsl = Some(verdict);
        }
    }
    eprintln!(
        "[xtask] running {} rglsl modules on the {} target",
        ready.len(),
        executor.target.label()
    );
    let all: Vec<Key> = ready.keys().copied().collect();
    let runs = run_keys(watch, &ready, &all, false);
    let mut verdicts: BTreeMap<Key, (Verdict, String)> = BTreeMap::new();
    for (key, ran) in &runs {
        if let Some((plan, _)) = ready.get(key) {
            verdicts.insert(*key, judge(context, *key, ran, plan, expected));
        }
    }
    let failing: Vec<Key> = verdicts
        .iter()
        .filter(|(_, (verdict, _))| verdict.is_failure() && *verdict != Verdict::ExecError)
        .map(|(key, _)| *key)
        .collect();
    if !failing.is_empty() {
        eprintln!(
            "[xtask] confirming {} failing rglsl modules alone on the {} target",
            failing.len(),
            executor.target.label()
        );
    }
    for (key, ran) in run_keys(watch, &ready, &failing, true) {
        let Some((plan, _)) = ready.get(&key) else {
            continue;
        };
        let (verdict, note) = judge(context, key, &ran, plan, expected);
        let first = verdicts.get(&key).cloned();
        let judged = match (verdict.is_failure(), first) {
            (true, _) => (verdict, format!("{note} (confirmed alone)")),
            (false, Some((first, first_note))) => (
                verdict,
                format!("in the batch: {}: {first_note}", first.label()),
            ),
            (false, None) => (verdict, note),
        };
        verdicts.insert(key, judged);
    }
    for (key, verdict) in verdicts {
        if let Some(cell) = cells.get_mut(&key) {
            cell.rglsl = Some(verdict);
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reads_the_exit_from_a_note() {
        assert_eq!(
            exit_of("amber crashed (0xC0000005): x [exit code 0xC0000005] | last output: y"),
            "exit code 0xC0000005"
        );
        assert_eq!(exit_of("amber timed out"), "amber timed out");
        assert_eq!(
            exit_of("nvlddmkm event 153 at 5 ms; device lost"),
            "nvlddmkm event 153 at 5 ms; device lost"
        );
    }
}
