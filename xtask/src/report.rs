//! `PROGRESS.md` and the per-shader results table.

use std::collections::{BTreeMap, BTreeSet};
use std::fmt::Write as _;

use crate::corpus::{Corpus, Kind, STAGE_EXTENSIONS};
use crate::exec::{Outcome, SkipReason, TargetId};
use crate::runner::{CaseResult, Environment, OracleResult, OursResult};

fn table_header(sources: &[(TargetId, ExecSource)]) -> String {
    let mut header = String::from("| Stage | Files | accept | diag | valid | interface |");
    let mut rule = String::from("|---|---:|---:|---:|---:|---:|");
    for (target, _) in sources {
        let _ = write!(header, " {} |", column(target));
        rule.push_str("---:|");
    }
    format!("{header} link | crashes |\n{rule}---:|---:|\n")
}

const LEGACY_DETAIL: &str = "`exec` in detail";
const LEGACY_LINE: &str = "Exec: ";

fn detail_title(target: &TargetId) -> String {
    format!("`exec {}` in detail", target.label())
}

fn oracle_prefix(target: &TargetId) -> String {
    format!("Exec {}: ", target.label())
}

fn column(target: &TargetId) -> String {
    format!("exec {}", target.label())
}

#[derive(Default, Clone, Copy)]
struct Score {
    passed: usize,
    total: usize,
}

impl Score {
    fn add(&mut self, outcome: Option<bool>) {
        if let Some(passed) = outcome {
            self.total += 1;
            self.passed += usize::from(passed);
        }
    }

    fn cell(self) -> String {
        if self.total == 0 {
            return "–".into();
        }
        let percent = 100.0 * self.passed as f64 / self.total as f64;
        format!("{} / {} ({percent:.1} %)", self.passed, self.total)
    }
}

#[derive(Default, Clone)]
struct Row {
    files: usize,
    accept: Score,
    diag: Score,
    valid: Score,
    exec: BTreeMap<TargetId, Score>,
    link: Score,
    crashes: usize,
}

impl Row {
    fn add(&mut self, result: &CaseResult) {
        self.crashes += usize::from(matches!(result.ours, OursResult::Crashed));
        self.link.add(result.link());
        if matches!(result.case.kind, Kind::Group { .. }) {
            return;
        }
        self.files += 1;
        self.accept.add(result.accept());
        self.diag.add(result.diag());
        self.valid.add(result.valid());
        for (target, outcome) in &result.exec {
            self.exec
                .entry(target.clone())
                .or_default()
                .add(outcome.passed());
        }
    }

    fn exec_cell(&self, target: &TargetId) -> String {
        self.exec.get(target).copied().unwrap_or_default().cell()
    }

    fn line(&self, label: &str, exec: &[String]) -> String {
        format!(
            "| {label} | {} | {} | {} | {} | – | {} | {} | {} |\n",
            self.files,
            self.accept.cell(),
            self.diag.cell(),
            self.valid.cell(),
            exec.join(" | "),
            self.link.cell(),
            self.crashes
        )
    }
}

fn counted(result: &CaseResult) -> bool {
    !matches!(result.case.kind, Kind::Group { .. })
}

#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct Carried {
    targets: BTreeSet<TargetId>,
    oracle_lines: BTreeMap<TargetId, String>,
    cells: BTreeMap<(TargetId, String, String), String>,
    details: BTreeMap<(String, TargetId), String>,
}

fn header_target(cell: &str) -> Option<TargetId> {
    if cell == "exec" {
        return Some(TargetId::Local);
    }
    TargetId::parse(cell.strip_prefix("exec ")?)
}

fn detail_target(line: &str) -> Option<TargetId> {
    if line.starts_with(LEGACY_DETAIL) {
        return Some(TargetId::Local);
    }
    let (label, _) = line.strip_prefix("`exec ")?.split_once("` in detail")?;
    TargetId::parse(label)
}

fn oracle_target(line: &str) -> Option<TargetId> {
    let (label, rest) = line.strip_prefix("Exec ")?.split_once(": ")?;
    rest.starts_with("Amber ")
        .then(|| TargetId::parse(label))
        .flatten()
}

impl Carried {
    pub fn parse(text: &str) -> Self {
        let mut carried = Self::default();
        let mut section = String::new();
        let mut columns: Vec<(usize, TargetId)> = Vec::new();
        let mut detail: Option<(TargetId, String)> = None;
        for line in text.lines() {
            if let Some(title) = line.strip_prefix("## ") {
                carried.finish(&section, detail.take());
                section = title.trim().to_string();
                continue;
            }
            if let Some(rest) = line.strip_prefix(LEGACY_LINE) {
                carried.oracle_lines.insert(
                    TargetId::Local,
                    format!("{}{rest}", oracle_prefix(&TargetId::Local)),
                );
                continue;
            }
            if let Some(target) = oracle_target(line) {
                carried.oracle_lines.insert(target, line.to_string());
                continue;
            }
            if let Some(target) = detail_target(line) {
                carried.finish(&section, detail.take());
                let rest = line.split_once(" in detail").map_or("", |(_, rest)| rest);
                let title = detail_title(&target);
                detail = Some((target, format!("{title}{rest}\n")));
                continue;
            }
            if let Some((_, block)) = detail.as_mut() {
                if line.starts_with('|') || line.is_empty() {
                    block.push_str(line);
                    block.push('\n');
                    continue;
                }
                carried.finish(&section, detail.take());
            }
            if !line.starts_with("| ") {
                continue;
            }
            let cells: Vec<&str> = line.split('|').map(str::trim).collect();
            if cells.get(1) == Some(&"Stage") {
                columns = cells
                    .iter()
                    .enumerate()
                    .filter_map(|(index, cell)| header_target(cell).map(|t| (index, t)))
                    .collect();
                carried
                    .targets
                    .extend(columns.iter().map(|(_, target)| target.clone()));
                continue;
            }
            let Some(label) = cells.get(1) else {
                continue;
            };
            for (index, target) in &columns {
                if let Some(cell) = cells.get(*index) {
                    carried.cells.insert(
                        (target.clone(), section.clone(), (*label).to_string()),
                        (*cell).to_string(),
                    );
                }
            }
        }
        carried.finish(&section, detail.take());
        carried
    }

    fn finish(&mut self, section: &str, detail: Option<(TargetId, String)>) {
        if let Some((target, block)) = detail {
            self.details
                .insert((section.to_string(), target), block.trim_end().to_string());
        }
    }

    fn cell(&self, target: &TargetId, section: &str, label: &str) -> String {
        self.cells
            .get(&(target.clone(), section.to_string(), label.to_string()))
            .cloned()
            .unwrap_or_else(|| "–".into())
    }
}

enum ExecSource<'a> {
    Ran,
    Carried(&'a Carried),
    Absent,
}

fn short(commit: &str) -> &str {
    &commit[..commit.len().min(8)]
}

fn exec_sources<'a>(
    ran: &[TargetId],
    carried: Option<&'a Carried>,
) -> Vec<(TargetId, ExecSource<'a>)> {
    let source = |target: &TargetId| {
        if ran.contains(target) {
            ExecSource::Ran
        } else {
            carried.map_or(ExecSource::Absent, ExecSource::Carried)
        }
    };
    let mut targets = vec![TargetId::Local];
    let remotes: BTreeSet<TargetId> = if ran.iter().any(TargetId::is_remote) {
        ran.iter().filter(|t| t.is_remote()).cloned().collect()
    } else {
        carried
            .map(|c| {
                c.targets
                    .iter()
                    .filter(|t| t.is_remote())
                    .cloned()
                    .collect()
            })
            .unwrap_or_default()
    };
    targets.extend(remotes);
    targets
        .into_iter()
        .map(|target| {
            let source = source(&target);
            (target, source)
        })
        .collect()
}

pub fn progress(env: &Environment, results: &[CaseResult], carried: Option<&Carried>) -> String {
    let ran: Vec<TargetId> = env.executors.iter().map(|e| e.target.clone()).collect();
    let sources = exec_sources(&ran, carried);
    let mut out = String::new();
    out.push_str("# Progress\n\n");
    out.push_str("Generated by `cargo xtask test`; do not edit by hand.\n\n");
    let _ = writeln!(
        out,
        "Oracles: glslang `{}`, SPIRV-Tools `{}` (pinned in `oracles.toml`).",
        short(&env.pins.glslang.commit),
        short(&env.pins.spirv_tools.commit)
    );
    for (target, source) in &sources {
        let executor = env.executors.iter().find(|e| &e.target == target);
        match (source, executor) {
            (ExecSource::Ran, Some(executor)) => {
                let device = &executor.device;
                let _ = match target {
                    TargetId::Local => writeln!(
                        out,
                        "{}Amber `{}` with KosmicKrisp `{}` on {} (Vulkan {}).",
                        oracle_prefix(target),
                        short(&env.pins.exec.amber.commit),
                        env.pins.exec.kosmickrisp.tag,
                        device.name,
                        device.api_version
                    ),
                    TargetId::Remote(_) => writeln!(
                        out,
                        "{}Amber `{}` on {}, {} (Vulkan {}), Windows over SSH.",
                        oracle_prefix(target),
                        short(&env.pins.exec.amber.commit),
                        device.name,
                        device.driver,
                        device.api_version
                    ),
                };
            }
            (ExecSource::Carried(carried), _) => {
                if let Some(line) = carried.oracle_lines.get(target) {
                    let _ = writeln!(out, "{line}");
                }
            }
            _ => {}
        }
    }
    let mut caveats = Vec::new();
    if env.glslang_commit.as_deref() != Some(env.pins.glslang.commit.as_str()) {
        caveats.push("the glslang corpus checkout was not at the pinned commit".to_string());
    }
    for (name, tool) in [("glslang", &env.glslang), ("spirv-val", &env.spirv_val)] {
        if !tool.pinned {
            caveats.push(format!("`{name}` was not the pinned build"));
        }
    }
    if !caveats.is_empty() {
        let _ = writeln!(out, "\n**Not a reference run:** {}.", caveats.join("; "));
    }

    for corpus in Corpus::ALL.into_iter().chain([Corpus::Link]) {
        let results: Vec<&CaseResult> =
            results.iter().filter(|r| r.case.corpus == corpus).collect();
        if !results.is_empty() {
            corpus_section(&mut out, corpus, &results, &sources);
        }
    }

    let remotes: Vec<String> = sources
        .iter()
        .filter(|(target, _)| target.is_remote())
        .map(|(target, _)| format!("`{}`", column(target)))
        .collect();
    let remote_columns = if remotes.is_empty() {
        "`exec <gpu>`".to_string()
    } else {
        remotes.join(", ")
    };
    let _ = write!(
        out,
        "
## Modes

| Mode | Passes when | Counted over |
|---|---|---|
| `accept` | we accept the shader exactly when glslang does | every shader glslang compiles without crashing |
| `diag` | we reject it and our first error is on a line glslang reports an error on | shaders glslang rejects |
| `valid` | we produce SPIR-V and `spirv-val` accepts it | shaders we accept |
| `interface` | reflection matches glslang | not implemented yet (M9) |
| `exec local` | our module and glslang's, run by Amber on KosmicKrisp on the Mac with the same inputs, write the same buffers, images and color attachments | shaders both accept and that we could execute; skips are counted apart |
| {remote_columns} | the same on each remote Windows target (a real GPU and its vendor's Vulkan driver), driven over SSH; the column is named after the GPU's vendor, or after the GPU when two targets share a vendor | as for `exec local` |
| `link` | a group of files compiled and linked into one program gives glslang's verdict (accept, diag and valid as above, exec when the program has one stage); for our own tests, the verdict and the errors their `expect` file names | glslang's link tests (`gtests/Link.FromFile*.cpp`) in scope, and our tests in `tests/link` |

`crashes` counts panics, aborts and timeouts of our compiler; each one is a bug.

`exec` binds every resource of the module from its reflection and fills it with the same
pseudo-random data for both modules; compute shaders run one workgroup, fragment shaders draw a
full-screen rectangle behind a generated vertex shader, vertex shaders draw twelve vertices in
front of a generated fragment shader that writes their outputs to color attachments. Geometry
and tessellation shaders run between generated vertex, tessellation and fragment stages that
forward their varyings to color attachments. Mesh shaders run one workgroup before a generated
fragment shader (and after a generated task shader when they read a task payload); task shaders
run before a generated mesh shader that marks each workgroup they launch. Ray tracing stages
trace 4×4 rays into a one-triangle or one-box scene: ray generation shaders with generated miss,
hit and callable shaders, every other stage behind a generated ray generation shader whose
payload has the stage's type and is written to a compared buffer; shader record buffers are
filled like any other buffer. Ray queries run in any stage against the same scene. A field of a
push constant, uniform, storage or shader record block that the shader turns into an
acceleration structure holds the scene's address and is not compared. Integers must
be equal; floats may differ by NaN
payload, the sign of zero, or 4 ULP. A shader whose results differ is run again alone before it
is counted as a failure. A shader is skipped, not failed, when the harness cannot bind it, the
driver lacks a feature, glslang's own module fails on the driver, or glslang's module gives
different results on two runs. A shader whose results are undefined (uninitialized reads, races,
implementation-defined values, unwritten tessellation levels) is listed in
`xtask/exec-ub/undefined.toml` with a twin next to it that removes the undefined behaviour by the
smallest edit; the original is still compiled and validated, but `exec` runs the twin, three
times for each module: glslang's twin must give the same results on every run (otherwise the
twin is broken and the shader fails), and ours must match it on every run. A shader that a
driver cannot run because of a proven bug of that driver is listed, with the reason, in
`xtask/exec-drivers/<driver>.toml` and skipped on that driver only. A target that is not
run keeps the results of its last run. See
`docs/PLAN.md` (Testing).

Only shaders with `#version 450` or `460` are run. Per-shader results are written to
`target/xtask/results.tsv`.
"
    );
    out
}

const fn corpus_title(corpus: Corpus) -> (&'static str, &'static str) {
    match corpus {
        Corpus::Vulkan => (
            "glslang Vulkan tests",
            "Shaders that glslang's own test suite (`gtests/*.FromFile.cpp`) compiles under Vulkan \
             semantics. Each one is compiled the way its test does: target environment, automatic \
             bindings and locations, linking.",
        ),
        Corpus::OpenGlAsVulkan => (
            "glslang OpenGL tests, compiled for Vulkan",
            "Shaders that glslang's own test suite compiles under OpenGL semantics. Here glslang \
             compiles them for Vulkan 1.0 with automatic bindings and locations, so most of them \
             test that OpenGL-only constructs are rejected, and on which lines.",
        ),
        Corpus::Link => (
            "rglsl link tests",
            "Our own tests of the rglsl-specific linking rules (`tests/link`): imports, \
             libraries without a stage, duplicate and missing definitions, recursion through \
             linking, merged globals, shared headers. Each test is a group of modules compiled \
             and linked by rglsl; `accept` and `diag` compare with the test's `expect` file, and \
             `exec` runs the linked program against glslang's build of the same program written \
             as one file (`reference.*`).",
        ),
    }
}

fn corpus_rows(results: &[&CaseResult]) -> Vec<(String, Row)> {
    let mut all = Row::default();
    for result in results {
        all.add(result);
    }
    let mut rows = vec![("**all**".to_string(), all)];
    for stage in STAGE_EXTENSIONS {
        let mut row = Row::default();
        for result in results.iter().filter(|r| r.case.stage == *stage) {
            row.add(result);
        }
        if row.files > 0 || row.link.total > 0 {
            rows.push(((*stage).to_string(), row));
        }
    }
    rows
}

fn exec_cells(
    sources: &[(TargetId, ExecSource)],
    title: &str,
    label: &str,
    row: &Row,
) -> Vec<String> {
    sources
        .iter()
        .map(|(target, source)| match source {
            ExecSource::Ran => row.exec_cell(target),
            ExecSource::Carried(carried) => carried.cell(target, title, label),
            ExecSource::Absent => "–".into(),
        })
        .collect()
}

#[derive(Default)]
struct ExecCounts {
    passed: usize,
    tolerated: usize,
    failed: usize,
    skipped: BTreeMap<SkipReason, usize>,
}

impl ExecCounts {
    fn new(results: &[&CaseResult], target: &TargetId) -> Self {
        let mut counts = Self::default();
        for result in results {
            match result.exec.get(target) {
                Some(Outcome::Pass { tolerated }) => {
                    counts.passed += 1;
                    counts.tolerated += usize::from(*tolerated > 0);
                }
                Some(Outcome::Fail(_)) => counts.failed += 1,
                Some(Outcome::Skip { reason, .. }) => {
                    *counts.skipped.entry(*reason).or_default() += 1;
                }
                None => {}
            }
        }
        counts
    }

    fn table(&self, target: &TargetId) -> String {
        let mut out = format!(
            "{}:\n\n| | shaders |\n|---|---:|\n| executed | {} |\n| passed | {} |\n| passed within the float tolerance | {} |\n| failed | {} |\n",
            detail_title(target),
            self.passed + self.failed,
            self.passed,
            self.tolerated,
            self.failed
        );
        for reason in SkipReason::ALL {
            if let Some(count) = self.skipped.get(&reason) {
                let _ = writeln!(out, "| skipped: {} | {count} |", reason.label());
            }
        }
        out
    }
}

fn corpus_section(
    out: &mut String,
    corpus: Corpus,
    results: &[&CaseResult],
    sources: &[(TargetId, ExecSource)],
) {
    let (title, intro) = corpus_title(corpus);
    let _ = writeln!(out, "\n## {title}\n\n{intro}\n");
    out.push_str(&table_header(sources));
    for (label, row) in corpus_rows(results) {
        out.push_str(&row.line(&label, &exec_cells(sources, title, &label, &row)));
    }

    let count = |oracle: bool, ours: bool| {
        results
            .iter()
            .filter(|r| r.case.kind.is_file())
            .filter(|r| {
                let o = match r.oracle {
                    OracleResult::Accepted => true,
                    OracleResult::Rejected { .. } => false,
                    OracleResult::Broken(_) => return false,
                };
                let u = matches!(r.ours, OursResult::Accepted | OursResult::BackendFailed);
                o == oracle && u == ours && !matches!(r.ours, OursResult::Crashed)
            })
            .count()
    };
    let _ = write!(
        out,
        "
`accept` in detail:

| | we accept | we reject |
|---|---:|---:|
| glslang accepts | {} | {} |
| glslang rejects | {} | {} |
",
        count(true, true),
        count(true, false),
        count(false, true),
        count(false, false)
    );
    let counted_results: Vec<&CaseResult> =
        results.iter().copied().filter(|r| counted(r)).collect();
    for (target, source) in sources {
        match source {
            ExecSource::Ran => {
                let _ = write!(
                    out,
                    "\n{}",
                    ExecCounts::new(&counted_results, target).table(target)
                );
            }
            ExecSource::Carried(carried) => {
                if let Some(block) = carried.details.get(&(title.to_string(), target.clone())) {
                    let _ = writeln!(out, "\n{block}");
                }
            }
            ExecSource::Absent => {}
        }
    }
}

/// A short per-corpus summary for the terminal.
pub fn summary(results: &[CaseResult], ran: &[TargetId]) -> String {
    let mut out = String::new();
    let sources = exec_sources(ran, None);
    for corpus in Corpus::ALL.into_iter().chain([Corpus::Link]) {
        let results: Vec<&CaseResult> =
            results.iter().filter(|r| r.case.corpus == corpus).collect();
        if results.is_empty() {
            continue;
        }
        let title = corpus_title(corpus).0;
        let _ = writeln!(out, "{title}\n");
        out.push_str(&table_header(&sources));
        for (label, row) in corpus_rows(&results) {
            out.push_str(&row.line(&label, &exec_cells(&sources, title, &label, &row)));
        }
        out.push('\n');
        let counted_results: Vec<&CaseResult> =
            results.iter().copied().filter(|r| counted(r)).collect();
        for target in ran {
            out.push_str(&exec_summary(&counted_results, target));
            out.push('\n');
        }
        let compared: Vec<&CaseResult> = results.iter().copied().filter(|r| r.debug.is_some()).collect();
        if !compared.is_empty() {
            let same = compared.iter().filter(|r| r.debug == Some(true)).count();
            let _ = writeln!(
                out,
                "debug information as glslang's: {same} / {}\n",
                compared.len()
            );
            for result in compared.iter().filter(|r| r.debug == Some(false)) {
                let _ = writeln!(out, "  debug FAIL {}: {}", result.case.name, result.note);
            }
        }
        for result in &results {
            if result.link() == Some(false) {
                let _ = writeln!(out, "  link FAIL {}: {}", result.case.name, result.note);
            }
        }
    }
    out
}

fn exec_summary(results: &[&CaseResult], target: &TargetId) -> String {
    let counts = ExecCounts::new(results, target);
    let mut out = format!(
        "exec {}: {} executed, {} passed ({} within the float tolerance), {} failed, {} skipped\n",
        target.label(),
        counts.passed + counts.failed,
        counts.passed,
        counts.tolerated,
        counts.failed,
        counts.skipped.values().sum::<usize>()
    );
    for reason in SkipReason::ALL {
        if let Some(count) = counts.skipped.get(&reason) {
            let _ = writeln!(out, "  skipped {count:>4}: {}", reason.label());
        }
    }
    for result in results {
        if let Some(Outcome::Fail(why)) = result.exec.get(target) {
            let _ = writeln!(out, "  FAIL {}: {why}", result.case.name);
        }
    }
    out
}

fn exec_columns(outcome: Option<&Outcome>) -> (String, String) {
    match outcome {
        None => ("-".into(), String::new()),
        Some(Outcome::Pass { tolerated: 0 }) => ("pass".into(), String::new()),
        Some(Outcome::Pass { tolerated }) => (
            "pass".into(),
            format!("{tolerated} values within the float tolerance"),
        ),
        Some(Outcome::Fail(why)) => ("FAIL".into(), why.clone()),
        Some(Outcome::Skip { reason, detail }) => {
            (format!("skip:{}", reason.code()), detail.clone())
        }
    }
}

fn twin_note(twin: Option<&str>, (cell, note): (String, String)) -> (String, String) {
    let Some(name) = twin.filter(|_| cell != "-") else {
        return (cell, note);
    };
    let verb = if cell.starts_with("skip") {
        "skipped"
    } else {
        "ran"
    };
    let prefix = format!(
        "{verb} the twin {}/{name} without undefined behaviour",
        crate::exec::known::DIR
    );
    if note.is_empty() {
        (cell, prefix)
    } else {
        (cell, format!("{prefix}; {note}"))
    }
}

pub fn details(results: &[CaseResult]) -> String {
    let mut targets: BTreeSet<TargetId> = BTreeSet::from([TargetId::Local]);
    for r in results {
        targets.extend(r.exec.keys().cloned());
    }
    let mut out = String::from(
        "file\tcorpus\tversion\tstage\ttarget\tsuite\tglslang\tours\taccept\tdiag\tvalid\tdebug",
    );
    for target in &targets {
        let _ = write!(out, "\texec_{}", target.label());
    }
    out.push_str("\tnote");
    for target in &targets {
        let _ = write!(out, "\texec_{}_note", target.label());
    }
    out.push('\n');
    let mark = |outcome: Option<bool>| match outcome {
        Some(true) => "pass",
        Some(false) => "FAIL",
        None => "-",
    };
    for r in results {
        let oracle = match &r.oracle {
            OracleResult::Accepted => "accept".to_string(),
            OracleResult::Rejected { lines } => {
                let lines: Vec<String> = lines.iter().map(u32::to_string).collect();
                format!("reject@{}", lines.join(","))
            }
            OracleResult::Broken(why) => format!("broken: {why}"),
        };
        let ours = match r.ours {
            OursResult::Accepted => "accept",
            OursResult::Rejected { .. } => "reject",
            OursResult::BackendFailed => "backend-failed",
            OursResult::Crashed => "crash",
        };
        let twin = r
            .exec_input
            .as_ref()
            .is_some_and(|input| input.twin.is_some())
            .then_some(r.case.name.as_str());
        let columns: Vec<(String, String)> = targets
            .iter()
            .map(|target| twin_note(twin, exec_columns(r.exec.get(target))))
            .collect();
        let _ = write!(
            out,
            "{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}\t{}",
            r.case.name,
            match r.case.corpus {
                Corpus::Vulkan => "vulkan",
                Corpus::OpenGlAsVulkan => "opengl-as-vulkan",
                Corpus::Link => "link",
            },
            r.case.version,
            r.case.stage,
            r.case.target.describe(),
            r.case.suite.as_deref().unwrap_or("-"),
            oracle,
            ours,
            mark(r.accept()),
            mark(r.diag()),
            mark(r.valid()),
            mark(r.debug),
        );
        for (cell, _) in &columns {
            let _ = write!(out, "\t{cell}");
        }
        let _ = write!(out, "\t{}", r.note.replace(['\t', '\n'], " "));
        for (_, note) in &columns {
            let _ = write!(out, "\t{}", note.replace(['\t', '\n'], " "));
        }
        out.push('\n');
    }
    out
}

#[cfg(test)]
mod tests {
    use super::*;

    fn remote() -> TargetId {
        TargetId::Remote("remote".into())
    }

    fn labels(sources: &[(TargetId, ExecSource)]) -> Vec<String> {
        sources
            .iter()
            .map(|(target, source)| {
                let how = match source {
                    ExecSource::Ran => "ran",
                    ExecSource::Carried(_) => "carried",
                    ExecSource::Absent => "absent",
                };
                format!("{}:{how}", target.label())
            })
            .collect()
    }

    const LEGACY: &str = "# Progress

Oracles: glslang `b411a8fb`, SPIRV-Tools `ef96ed76` (pinned in `oracles.toml`).
Exec: Amber `c9f1e287` with KosmicKrisp `mesa-mesa-26.2.1` on Apple M4 Max (Vulkan 1.4.354).

## glslang Vulkan tests

intro

| Stage | Files | accept | diag | valid | interface | exec | link | crashes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|
| **all** | 694 | 458 / 694 (66.0 %) | 96 / 143 (67.1 %) | 315 / 315 (100.0 %) | – | 200 / 210 (95.2 %) | – | 0 |
| comp | 296 | 199 / 296 (67.2 %) | 42 / 75 (56.0 %) | 124 / 124 (100.0 %) | – | 100 / 101 (99.0 %) | – | 0 |

`accept` in detail:

| | we accept | we reject |
|---|---:|---:|
| glslang accepts | 315 | 236 |

`exec` in detail:

| | shaders |
|---|---:|
| executed | 210 |

## Modes
";

    const CURRENT: &str = "# Progress

Exec local: Amber `c9f1e287` with KosmicKrisp `mesa-mesa-26.2.1` on Apple M4 Max (Vulkan 1.4.354).
Exec remote: Amber `c9f1e287` on GPU, driver (Vulkan 1.4.349), Windows over SSH.

## glslang Vulkan tests

| Stage | Files | accept | diag | valid | interface | exec local | exec remote | link | crashes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **all** | 694 | 1 | 2 | 3 | – | 10 / 10 (100.0 %) | 20 / 21 (95.2 %) | – | 0 |

`exec local` in detail:

| | shaders |
|---|---:|
| executed | 10 |

`exec remote` in detail:

| | shaders |
|---|---:|
| executed | 21 |

## Modes
";

    #[test]
    fn carries_legacy_exec_results_over_as_the_local_target() {
        let carried = Carried::parse(LEGACY);
        assert_eq!(
            carried.oracle_lines[&TargetId::Local],
            "Exec local: Amber `c9f1e287` with KosmicKrisp `mesa-mesa-26.2.1` on Apple M4 Max (Vulkan 1.4.354)."
        );
        assert_eq!(
            carried.cell(&TargetId::Local, "glslang Vulkan tests", "**all**"),
            "200 / 210 (95.2 %)"
        );
        assert_eq!(
            carried.cell(&TargetId::Local, "glslang Vulkan tests", "comp"),
            "100 / 101 (99.0 %)"
        );
        assert_eq!(carried.cell(&remote(), "glslang Vulkan tests", "comp"), "–");
        assert_eq!(
            carried.details[&("glslang Vulkan tests".to_string(), TargetId::Local)],
            "`exec local` in detail:\n\n| | shaders |\n|---|---:|\n| executed | 210 |"
        );
        assert!(!carried
            .details
            .contains_key(&("Modes".to_string(), TargetId::Local)));
    }

    #[test]
    fn carries_each_target_on_its_own() {
        let carried = Carried::parse(CURRENT);
        assert!(carried.oracle_lines[&remote()].starts_with("Exec remote: Amber"));
        assert_eq!(
            carried.cell(&TargetId::Local, "glslang Vulkan tests", "**all**"),
            "10 / 10 (100.0 %)"
        );
        assert_eq!(
            carried.cell(&remote(), "glslang Vulkan tests", "**all**"),
            "20 / 21 (95.2 %)"
        );
        assert_eq!(
            carried.details[&("glslang Vulkan tests".to_string(), remote())],
            "`exec remote` in detail:\n\n| | shaders |\n|---|---:|\n| executed | 21 |"
        );
    }

    const SEVERAL: &str = "# Progress

Exec local: Amber `c9f1e287` with KosmicKrisp `mesa-mesa-26.2.1` on Apple M4 Max (Vulkan 1.4.354).
Exec amd: Amber `c9f1e287` on AMD Radeon(TM) 8060S Graphics, AMD proprietary driver (Vulkan 1.4.359), Windows over SSH.
Exec nvidia: Amber `c9f1e287` on NVIDIA GeForce RTX 4090, NVIDIA 617.14 (Vulkan 1.4.329), Windows over SSH.

## glslang Vulkan tests

| Stage | Files | accept | diag | valid | interface | exec local | exec amd | exec nvidia | link | crashes |
|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|
| **all** | 694 | 1 | 2 | 3 | – | 10 / 10 (100.0 %) | 20 / 21 (95.2 %) | 30 / 30 (100.0 %) | – | 0 |

`exec nvidia` in detail:

| | shaders |
|---|---:|
| executed | 30 |

## Modes
";

    #[test]
    fn carries_every_remote_target_by_its_label() {
        let carried = Carried::parse(SEVERAL);
        let nvidia = TargetId::Remote("nvidia".into());
        let amd = TargetId::Remote("amd".into());
        assert_eq!(
            carried.cell(&nvidia, "glslang Vulkan tests", "**all**"),
            "30 / 30 (100.0 %)"
        );
        assert_eq!(
            carried.cell(&amd, "glslang Vulkan tests", "**all**"),
            "20 / 21 (95.2 %)"
        );
        assert!(carried.oracle_lines[&nvidia].starts_with("Exec nvidia: Amber"));
        assert!(carried
            .details
            .contains_key(&("glslang Vulkan tests".to_string(), nvidia.clone())));
        assert_eq!(
            labels(&exec_sources(&[], Some(&carried))),
            ["local:carried", "amd:carried", "nvidia:carried"]
        );
        assert_eq!(
            labels(&exec_sources(&[TargetId::Local], Some(&carried))),
            ["local:ran", "amd:carried", "nvidia:carried"]
        );
        assert_eq!(
            labels(&exec_sources(&[nvidia], Some(&carried))),
            ["local:carried", "nvidia:ran"]
        );
        assert_eq!(labels(&exec_sources(&[], None)), ["local:absent"]);
        let header = table_header(&exec_sources(&[], Some(&carried)));
        assert!(header.starts_with(
            "| Stage | Files | accept | diag | valid | interface | exec local | exec amd | exec nvidia | link | crashes |\n|---|---:|---:|---:|---:|---:|---:|---:|---:|---:|---:|\n"
        ));
    }

    #[test]
    fn exec_columns_name_the_outcome() {
        assert_eq!(exec_columns(None).0, "-");
        assert_eq!(
            exec_columns(Some(&Outcome::Pass { tolerated: 2 })),
            (
                "pass".to_string(),
                "2 values within the float tolerance".to_string()
            )
        );
        assert_eq!(
            exec_columns(Some(&Outcome::Skip {
                reason: SkipReason::DeviceFeature,
                detail: "shaderFloat64".into()
            })),
            (
                "skip:device-feature".to_string(),
                "shaderFloat64".to_string()
            )
        );
    }
}
