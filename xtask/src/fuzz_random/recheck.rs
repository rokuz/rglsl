use std::collections::BTreeMap;
use std::fmt::Write as _;
use std::fs;
use std::path::{Path, PathBuf};
use std::time::Duration;

use anyhow::{Context, Result};

use super::classify::{Class, Consensus, Ran, Watch, consensus, failure};
use super::quarantine::{self, Mode};
use super::{exit_of, failed, generate, glslang_optimize, wrong};
use crate::exec::batch::Job;
use crate::exec::plan::Plan;
use crate::exec::{self, Executor, Outputs, TargetSpec};
use crate::fuzz::{self, Verdict};
use crate::fuzz_exec::{self, Staged, Tolerance};
use crate::oracles;

pub const REFERENCE_DIFFERS: &str = "reference-differs";

#[derive(Debug)]
pub struct Options {
    pub exec: Vec<TargetSpec>,
    pub filter: Option<String>,
    pub timeout_secs: u64,
    pub pause_secs: u64,
    pub max_resets: usize,
}

struct Tools {
    glslang: PathBuf,
    glslang_opt: PathBuf,
    spirv_val: PathBuf,
    self_exe: PathBuf,
    timeout: Duration,
}

#[derive(Debug, Clone)]
struct Entry {
    target: String,
    mode: Mode,
    dir: PathBuf,
    name: String,
    shader: PathBuf,
    hash: u64,
    reason: toml::Table,
}

impl Entry {
    fn field(&self, key: &str) -> &str {
        self.reason
            .get(key)
            .and_then(toml::Value::as_str)
            .unwrap_or_default()
    }

    fn verdict(&self) -> &str {
        self.field("verdict")
    }

    fn path(&self) -> String {
        format!("{}/{}/{}", self.target, self.mode.label(), self.name)
    }

    fn is_reference(&self) -> bool {
        self.shader
            .file_stem()
            .is_some_and(|stem| stem == "reference")
    }

    fn family(&self) -> Option<&str> {
        family_of_entry(&self.name)
    }
}

fn family_of_entry(name: &str) -> Option<&str> {
    let family = name.rsplitn(3, '-').nth(2)?;
    let (number, reference) = family.split_once('_')?;
    let numbered = number
        .strip_prefix('f')
        .is_some_and(|digits| !digits.is_empty() && digits.chars().all(|c| c.is_ascii_digit()));
    (numbered && !reference.is_empty()).then_some(reference)
}

fn matches_filter(path: &str, filter: Option<&str>) -> bool {
    filter.is_none_or(|filter| {
        filter
            .split(',')
            .map(str::trim)
            .filter(|text| !text.is_empty())
            .any(|text| path.contains(text))
    })
}

fn entries(root: &Path, target: &str, filter: Option<&str>) -> Result<Vec<Entry>> {
    let mut found = Vec::new();
    for mode in [Mode::Unoptimized, Mode::Optimized] {
        let dir = quarantine::mode_dir(root, target, mode);
        if !dir.is_dir() {
            continue;
        }
        let mut dirs: Vec<PathBuf> = fs::read_dir(&dir)
            .with_context(|| format!("reading {}", dir.display()))?
            .map(|entry| entry.map(|entry| entry.path()))
            .collect::<std::io::Result<_>>()?;
        dirs.sort();
        for dir in dirs.into_iter().filter(|dir| dir.is_dir()) {
            let name = dir
                .file_name()
                .and_then(|name| name.to_str())
                .unwrap_or_default()
                .to_string();
            if !matches_filter(&format!("{target}/{}/{name}", mode.label()), filter) {
                continue;
            }
            let Some(shader) = quarantine::entry_shader(&dir)? else {
                eprintln!("[xtask] warning: {} has no shader", dir.display());
                continue;
            };
            let reason_path = dir.join("reason.toml");
            let reason: toml::Table = fs::read_to_string(&reason_path)
                .with_context(|| format!("reading {}", reason_path.display()))?
                .parse()
                .with_context(|| format!("parsing {}", reason_path.display()))?;
            found.push(Entry {
                target: target.to_string(),
                mode,
                hash: quarantine::shader_hash(&shader)?,
                dir,
                name,
                shader,
                reason,
            });
        }
    }
    Ok(found)
}

struct Modules {
    glslang: Result<PathBuf, String>,
    unoptimized: Option<PathBuf>,
    rglsl: Result<PathBuf, (Verdict, String)>,
    json: Option<PathBuf>,
}

fn compile(tools: &Tools, shader: &Path, work: &Path, mode: Mode) -> Result<Modules> {
    fs::create_dir_all(work).with_context(|| format!("creating {}", work.display()))?;
    let file_name = shader
        .file_name()
        .with_context(|| format!("{} has no file name", shader.display()))?;
    let copy = work.join(file_name);
    fs::copy(shader, &copy).with_context(|| format!("copying {}", shader.display()))?;
    let json = shader.with_extension("json");
    if json.is_file() {
        fs::copy(&json, copy.with_extension("json"))
            .with_context(|| format!("copying {}", json.display()))?;
    }
    let spirv = work.join("module.spv");
    let outcome = fuzz::compare(
        &tools.glslang,
        &tools.spirv_val,
        &tools.self_exe,
        &copy,
        &spirv,
        tools.timeout,
        mode == Mode::Optimized,
    )?;
    let rejected = outcome.verdict == Verdict::GlslangRejects;
    let unoptimized = spirv.with_extension("glslang.spv");
    let glslang = match mode {
        _ if rejected => Err(format!("glslang rejects it: {}", outcome.note)),
        Mode::Unoptimized => Ok(unoptimized.clone()),
        Mode::Optimized => {
            let out = spirv.with_extension("glslang.O.spv");
            glslang_optimize(&tools.glslang_opt, &copy, &out, tools.timeout).map(|()| out)
        }
    };
    let rglsl = match (outcome.verdict, mode) {
        (Verdict::Agree, Mode::Unoptimized) => Ok(spirv),
        (Verdict::Agree, Mode::Optimized) => Ok(fuzz::optimized_module(&spirv)),
        (verdict, _) => Err((verdict, outcome.note)),
    };
    Ok(Modules {
        glslang,
        unoptimized: (!rejected).then_some(unoptimized),
        rglsl,
        json: fuzz_exec::job_json(&copy),
    })
}

type Image = (Box<Plan>, Outputs);

struct Runner<'a> {
    executor: &'a Executor,
    watch: Watch<'a>,
    pause: Duration,
    max_resets: usize,
    runs: usize,
}

impl<'a> Runner<'a> {
    fn new(executor: &'a Executor, options: &Options) -> Self {
        Self {
            executor,
            watch: Watch::new(executor),
            pause: Duration::from_secs(options.pause_secs),
            max_resets: options.max_resets,
            runs: 0,
        }
    }

    fn label(&self) -> &str {
        self.executor.target.label()
    }

    fn stopped(&self) -> Option<String> {
        if let Some(why) = &self.watch.stopped {
            return Some(why.clone());
        }
        (self.watch.resets() >= self.max_resets).then(|| {
            format!(
                "{} driver resets on this target (limit {})",
                self.watch.resets(),
                self.max_resets
            )
        })
    }

    fn run(&mut self, job: &Job) -> Ran {
        if let Some(why) = self.stopped() {
            return Ran::not_run(format!("the target was stopped: {why}"));
        }
        if self.runs > 0 && !self.pause.is_zero() {
            std::thread::sleep(self.pause);
        }
        self.runs += 1;
        self.watch
            .run(std::slice::from_ref(job), true)
            .into_iter()
            .next()
            .unwrap_or_else(|| Ran::not_run("the target returned no result".into()))
    }

    fn image(
        &mut self,
        module: &Path,
        json: Option<&Path>,
        dir: &Path,
        tag: &str,
    ) -> Result<Image, (Class, String)> {
        match fuzz_exec::stage_module(self.executor, module, json, dir, tag) {
            Staged::Refused(why) => Err((Class::Refused, why)),
            Staged::Ready { plan, job } => {
                let ran = self.run(&job);
                if let Some(failed) = failure(&ran) {
                    return Err(failed);
                }
                match ran.result {
                    Ok(outputs) => Ok((plan, outputs)),
                    Err(error) => Err((Class::NotRun, error.to_string())),
                }
            }
        }
    }
}

#[derive(Debug, Clone)]
enum Finding {
    Reproduced {
        class: Class,
        note: String,
    },
    Gone {
        glslang_wrong: Option<String>,
        rglsl: Option<(Verdict, String)>,
    },
    Inconclusive(String),
}

fn compare(expected: &Image, actual: &Image, tolerance: Tolerance) -> Result<usize, String> {
    fuzz_exec::compare_runs(
        (&expected.0, &expected.1),
        (&actual.0, &actual.1),
        tolerance,
    )
}

fn reference_image(
    runner: &mut Runner<'_>,
    tools: &Tools,
    root: &Path,
    entry: &Entry,
    modules: &Modules,
    work: &Path,
) -> Result<Result<Image, String>> {
    let (module, json) = if entry.is_reference() {
        let Some(module) = &modules.unoptimized else {
            return Ok(Err("glslang does not compile the reference".into()));
        };
        (module.clone(), modules.json.clone())
    } else {
        let Some(family) = entry.family() else {
            return Ok(Err(format!("no family reference for {}", entry.name)));
        };
        let shader = generate::write_reference(root, family, &work.join("reference"))?;
        let built = compile(
            tools,
            &shader,
            &work.join("reference-build"),
            Mode::Unoptimized,
        )?;
        match built.glslang {
            Ok(module) => (module, built.json),
            Err(why) => return Ok(Err(format!("the family's reference: {why}"))),
        }
    };
    Ok(runner
        .image(
            &module,
            json.as_deref(),
            &work.join("run-reference"),
            "glslang",
        )
        .map_err(|(class, note)| {
            format!(
                "glslang's module of the family's reference: {}: {note}",
                class.label()
            )
        }))
}

struct RglslRun {
    verdict: (Verdict, String),
    image: Option<Image>,
}

fn rglsl_run(
    runner: &mut Runner<'_>,
    modules: &Modules,
    mode: Mode,
    expected: &Image,
    work: &Path,
) -> RglslRun {
    let module = match &modules.rglsl {
        Ok(module) => module,
        Err((verdict, note)) => {
            return RglslRun {
                verdict: (*verdict, note.clone()),
                image: None,
            };
        }
    };
    let tag = match mode {
        Mode::Unoptimized => "rglsl",
        Mode::Optimized => "rglsl-O",
    };
    let failing = |verdict: Verdict, note: String| RglslRun {
        verdict: (verdict, note),
        image: None,
    };
    match runner.image(
        module,
        modules.json.as_deref(),
        &work.join("run-rglsl"),
        tag,
    ) {
        Ok(ours) => RglslRun {
            verdict: match compare(
                expected,
                &ours,
                Tolerance::optimized(mode == Mode::Optimized),
            ) {
                Ok(_) => (Verdict::Agree, String::new()),
                Err(difference) => (
                    wrong(mode),
                    format!("differs from glslang's reference: {difference}"),
                ),
            },
            image: Some(ours),
        },
        Err((Class::Refused, why)) => failing(
            Verdict::ExecError,
            format!("the harness cannot run rglsl's module, glslang's runs: {why}"),
        ),
        Err((Class::NotRun, why)) => failing(
            Verdict::ExecError,
            format!("the target did not run rglsl's module: {why}"),
        ),
        Err((class, note)) => failing(
            failed(mode),
            format!(
                "rglsl's module: {}: {note}; glslang's module runs",
                class.label()
            ),
        ),
    }
}

struct Checked {
    finding: Finding,
    reference: Option<Image>,
    rglsl: Option<Image>,
}

impl Checked {
    const fn only(finding: Finding) -> Self {
        Self {
            finding,
            reference: None,
            rglsl: None,
        }
    }
}

fn recheck(
    runner: &mut Runner<'_>,
    tools: &Tools,
    root: &Path,
    entry: &Entry,
    work: &Path,
) -> Result<Checked> {
    let modules = compile(tools, &entry.shader, &work.join("entry"), entry.mode)?;
    let glslang = match &modules.glslang {
        Ok(module) => module.clone(),
        Err(why) => return Ok(Checked::only(Finding::Inconclusive(why.clone()))),
    };
    let tag = match entry.mode {
        Mode::Unoptimized => "glslang",
        Mode::Optimized => "glslang-O",
    };
    let image = match runner.image(
        &glslang,
        modules.json.as_deref(),
        &work.join("run-glslang"),
        tag,
    ) {
        Ok(image) => image,
        Err((class, note)) if class.hangs_the_driver() => {
            return Ok(Checked::only(Finding::Reproduced { class, note }));
        }
        Err((class, note)) => {
            return Ok(Checked::only(Finding::Inconclusive(format!(
                "glslang's module: {}: {note}",
                class.label()
            ))));
        }
    };
    let own_reference = entry.is_reference() && entry.mode == Mode::Unoptimized;
    let expected = if own_reference {
        image.clone()
    } else {
        match reference_image(runner, tools, root, entry, &modules, work)? {
            Ok(expected) => expected,
            Err(why) => return Ok(Checked::only(Finding::Inconclusive(why))),
        }
    };
    let reference = entry.is_reference().then(|| expected.clone());
    let tolerance = Tolerance::optimized(entry.mode == Mode::Optimized);
    if !own_reference && let Err(difference) = compare(&expected, &image, tolerance) {
        return Ok(Checked {
            finding: Finding::Gone {
                glslang_wrong: Some(format!("differs from glslang's reference: {difference}")),
                rglsl: None,
            },
            reference,
            rglsl: None,
        });
    }
    let rglsl = rglsl_run(runner, &modules, entry.mode, &expected, work);
    Ok(Checked {
        finding: Finding::Gone {
            glslang_wrong: None,
            rglsl: Some(rglsl.verdict),
        },
        reference,
        rglsl: rglsl.image,
    })
}

fn refresh(entry: &Entry, executor: &Executor, class: Class, note: &str) -> Result<()> {
    let mut table = entry.reason.clone();
    let mut put = |key: &str, value: String| {
        table.insert(key.to_string(), toml::Value::String(value));
    };
    put("verdict", class.label().to_string());
    put("confirmed_alone", note.to_string());
    put("exit", exit_of(note));
    put("driver", executor.device.driver.clone());
    put("device", executor.device.name.clone());
    put(
        "rechecked",
        quarantine::utc_date(exec::amber::now_ms() / 1000),
    );
    let path = entry.dir.join("reason.toml");
    fs::write(&path, table.to_string()).with_context(|| format!("writing {}", path.display()))
}

#[derive(Debug)]
struct Row {
    entry: String,
    old: String,
    outcome: &'static str,
    now: String,
    rglsl: Option<(Verdict, String)>,
}

impl Row {
    fn failed(&self) -> bool {
        self.rglsl
            .as_ref()
            .is_some_and(|(verdict, _)| verdict.is_failure())
    }

    fn line(&self) -> String {
        let rglsl = self
            .rglsl
            .as_ref()
            .map_or_else(String::new, |(verdict, note)| {
                if note.is_empty() {
                    format!("; rglsl: {}", verdict.label())
                } else {
                    format!("; rglsl: {}: {note}", verdict.label())
                }
            });
        format!(
            "{}: {} -> {}: {}{rglsl}",
            self.entry, self.old, self.outcome, self.now
        )
    }
}

fn settle(entry: &Entry, executor: &Executor, finding: &Finding) -> Result<Row> {
    let (outcome, now, rglsl) = match finding {
        Finding::Reproduced { class, note } => {
            refresh(entry, executor, *class, note)?;
            ("kept", format!("{}: {note}", class.label()), None)
        }
        Finding::Inconclusive(why) => ("unchanged", format!("inconclusive: {why}"), None),
        Finding::Gone {
            glslang_wrong,
            rglsl,
        } => {
            fs::remove_dir_all(&entry.dir)
                .with_context(|| format!("removing {}", entry.dir.display()))?;
            let now = match glslang_wrong {
                Some(difference) => format!("glslang-wrong: {difference}"),
                None => "glslang's module runs and renders the reference's image".to_string(),
            };
            ("removed", now, rglsl.clone())
        }
    };
    Ok(Row {
        entry: entry.path(),
        old: entry.verdict().to_string(),
        outcome,
        now,
        rglsl,
    })
}

struct Pending<'e> {
    entry: &'e Entry,
    target: usize,
    checked: Checked,
}

struct Disputed {
    shader: PathBuf,
    images: BTreeMap<usize, Option<Image>>,
}

fn reference_images(
    runners: &mut [Runner<'_>],
    tools: &Tools,
    disputed: &mut BTreeMap<u64, Disputed>,
) -> Result<()> {
    for (hash, reference) in disputed.iter_mut() {
        for (index, runner) in runners.iter_mut().enumerate() {
            if reference.images.contains_key(&index) {
                continue;
            }
            let dir = runner
                .executor
                .work_dir()
                .join("recheck")
                .join("consensus")
                .join(format!("{hash:016x}"));
            let modules = compile(
                tools,
                &reference.shader,
                &dir.join("build"),
                Mode::Unoptimized,
            )?;
            let image = match &modules.glslang {
                Ok(module) => {
                    match runner.image(module, modules.json.as_deref(), &dir.join("run"), "glslang")
                    {
                        Ok(image) => Some(image),
                        Err((class, note)) => {
                            eprintln!(
                                "[xtask] glslang's reference {} on the {} target: {}: {note}",
                                reference.shader.display(),
                                runner.label(),
                                class.label()
                            );
                            None
                        }
                    }
                }
                Err(_) => None,
            };
            reference.images.insert(index, image);
        }
    }
    Ok(())
}

fn decide_disputed(
    pending: Pending<'_>,
    runners: &[Runner<'_>],
    disputed: &BTreeMap<u64, Disputed>,
) -> Result<Row> {
    let Pending {
        entry,
        target,
        checked,
    } = pending;
    let executor = runners
        .get(target)
        .map(|runner| runner.executor)
        .context("target index")?;
    let images: Vec<Option<(&Plan, &Outputs)>> = (0..runners.len())
        .map(|index| {
            disputed
                .get(&entry.hash)
                .and_then(|reference| reference.images.get(&index))
                .and_then(Option::as_ref)
                .map(|(plan, outputs)| (plan.as_ref(), outputs))
        })
        .collect();
    let ran = images.iter().flatten().count();
    let verdicts = consensus(&images);
    let own = images.get(target).copied().flatten();
    let unchanged = |why: String| Row {
        entry: entry.path(),
        old: entry.verdict().to_string(),
        outcome: "unchanged",
        now: format!("inconclusive: {why}"),
        rglsl: None,
    };
    match (own, verdicts.get(target)) {
        (None, _) => Ok(unchanged("the reference did not run on its target".into())),
        (Some(_), _) if ran < 2 => Ok(unchanged(
            "the reference ran on no other target to compare with".into(),
        )),
        (Some(_), Some(Consensus::Agrees)) => settle(entry, executor, &checked.finding),
        (Some(_), Some(Consensus::Differs { consensus, detail })) => {
            let names: Vec<&str> = consensus
                .iter()
                .filter_map(|member| runners.get(*member).map(Runner::label))
                .collect();
            let note = format!(
                "reference differs from {}' consensus: {detail}",
                names.join(", ")
            );
            refresh(entry, executor, Class::ReferenceDiffers, &note)?;
            let majority = consensus
                .first()
                .and_then(|member| images.get(*member).copied().flatten());
            let rglsl = match (&checked.rglsl, majority) {
                (Some(ours), Some(majority)) => {
                    match fuzz_exec::compare_runs(majority, (&ours.0, &ours.1), Tolerance::OneLevel)
                    {
                        Ok(_) => "; rglsl's module renders the consensus image".to_string(),
                        Err(difference) => {
                            format!(
                                "; rglsl's module differs from the consensus image: {difference}"
                            )
                        }
                    }
                }
                _ => String::new(),
            };
            Ok(Row {
                entry: entry.path(),
                old: entry.verdict().to_string(),
                outcome: "kept",
                now: format!("{}: {note}{rglsl}", Class::ReferenceDiffers.label()),
                rglsl: None,
            })
        }
        (Some(_), Some(Consensus::NoMajority { detail })) => Ok(unchanged(format!(
            "the targets' references render differently and no image has a majority: {detail}"
        ))),
        (Some(_), None) => Ok(unchanged("no consensus".into())),
    }
}

pub fn run(root: &Path, options: &Options) -> Result<bool> {
    let tools = Tools {
        glslang: oracles::find_tool(root, "glslang", "RGLSL_GLSLANG")?.path,
        glslang_opt: oracles::find_tool(root, "glslang-opt", "RGLSL_GLSLANG_OPT")?.path,
        spirv_val: oracles::find_tool(root, "spirv-val", "RGLSL_SPIRV_VAL")?.path,
        self_exe: std::env::current_exe().context("locating the xtask binary")?,
        timeout: Duration::from_secs(options.timeout_secs),
    };
    let work = crate::fuzz_libfuzzer::fuzz_root(root).join("recheck");
    let _ = fs::remove_dir_all(&work);
    fs::create_dir_all(&work)?;
    let executors = exec::open_executors(
        &options.exec,
        root,
        &tools.glslang,
        &work.join("exec"),
        tools.timeout,
    )?;
    let mut runners: Vec<Runner<'_>> = executors
        .iter()
        .map(|executor| Runner::new(executor, options))
        .collect();
    let mut rows = Vec::new();
    let mut disputed: BTreeMap<u64, Disputed> = BTreeMap::new();
    let mut found = Vec::new();
    for runner in &runners {
        found.push(entries(root, runner.label(), options.filter.as_deref())?);
    }
    let mut pending = Vec::new();
    for (index, (runner, found)) in runners.iter_mut().zip(&found).enumerate() {
        let label = runner.label().to_string();
        eprintln!(
            "[xtask] rechecking {} quarantine entries on the {label} target",
            found.len()
        );
        for entry in found {
            if let Some(why) = runner.stopped() {
                rows.push(Row {
                    entry: entry.path(),
                    old: entry.verdict().to_string(),
                    outcome: "unchecked",
                    now: format!("the target was stopped: {why}"),
                    rglsl: None,
                });
                continue;
            }
            let dir = runner
                .executor
                .work_dir()
                .join("recheck")
                .join(entry.mode.label())
                .join(&entry.name);
            let checked = recheck(runner, &tools, root, entry, &dir)?;
            let is_disputed = entry.verdict() == REFERENCE_DIFFERS
                && matches!(checked.finding, Finding::Gone { .. });
            if !is_disputed {
                let row = settle(entry, runner.executor, &checked.finding)?;
                eprintln!("[xtask] {}", row.line());
                rows.push(row);
                continue;
            }
            let reference = disputed.entry(entry.hash).or_insert_with(|| Disputed {
                shader: dir
                    .join("entry")
                    .join(entry.shader.file_name().unwrap_or_default()),
                images: BTreeMap::new(),
            });
            reference
                .images
                .entry(index)
                .or_insert_with(|| checked.reference.clone());
            pending.push(Pending {
                entry,
                target: index,
                checked,
            });
        }
    }
    reference_images(&mut runners, &tools, &mut disputed)?;
    for pending in pending {
        let row = decide_disputed(pending, &runners, &disputed)?;
        eprintln!("[xtask] {}", row.line());
        rows.push(row);
    }

    let mut text = String::new();
    for row in &rows {
        let _ = writeln!(text, "{}", row.line());
    }
    let mut table = String::from("entry\told\toutcome\tnow\trglsl\n");
    for row in &rows {
        let rglsl = row
            .rglsl
            .as_ref()
            .map_or_else(String::new, |(verdict, note)| {
                format!("{}: {note}", verdict.label())
            });
        let _ = writeln!(
            table,
            "{}\t{}\t{}\t{}\t{}",
            row.entry,
            row.old,
            row.outcome,
            row.now.replace(['\t', '\n'], " "),
            rglsl.replace(['\t', '\n'], " ")
        );
    }
    let report = work.join("report.tsv");
    fs::write(&report, table)?;
    fs::write(work.join("report.txt"), &text)?;
    print!("{text}");
    for runner in &runners {
        if let Some(why) = runner.stopped() {
            println!("{}: STOPPED: {why}", runner.label());
        }
    }
    let passed = !rows.iter().any(Row::failed);
    let count = |outcome: &str| rows.iter().filter(|row| row.outcome == outcome).count();
    println!(
        "kept {}, removed {}, unchanged {}, unchecked {}; {}",
        count("kept"),
        count("removed"),
        count("unchanged"),
        count("unchecked"),
        if passed { "passed" } else { "FAILED" }
    );
    eprintln!("[xtask] report: {}", report.display());
    Ok(passed)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn reads_the_family_of_an_entry() {
        assert_eq!(
            family_of_entry("f16_prefix_sum-variant_002-77c39cc364017e5d"),
            Some("prefix_sum")
        );
        assert_eq!(
            family_of_entry("f07_muller-reference-95ed924a243a134b"),
            Some("muller")
        );
        assert_eq!(
            family_of_entry("f19_colorgrid_modulo_intfunctions-variant_009-3a2fd313486f5cd8"),
            Some("colorgrid_modulo_intfunctions")
        );
        assert_eq!(family_of_entry("muller-reference-95ed"), None);
        assert_eq!(family_of_entry("fx_muller-reference-95ed"), None);
        assert_eq!(family_of_entry("reference"), None);
    }

    #[test]
    fn filters_entries_by_path() {
        let path = "nvidia/O0/f10_binarysearch_bw-reference-8b0b42c186587542";
        assert!(matches_filter(path, None));
        assert!(matches_filter(path, Some("nvidia/O0/")));
        assert!(matches_filter(path, Some("amd, binarysearch_bw")));
        assert!(!matches_filter(path, Some("nvidia/O/")));
        assert!(!matches_filter(path, Some(",")));
    }
}
