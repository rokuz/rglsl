use std::collections::BTreeMap;
use std::fmt::Write as _;

use super::classify::Class;
use super::quarantine::Mode;
use super::{Cell, Shader, TargetRun};
use crate::fuzz::Verdict;

pub struct Report<'a> {
    pub seed: u64,
    pub generator: &'a str,
    pub args: &'a str,
    pub shaders: &'a [Shader],
    pub modes: &'a [Mode],
    pub targets: &'a [TargetRun],
    pub generation_failures: &'a [String],
}

#[derive(Debug, Default, Clone, PartialEq, Eq)]
pub struct Counts {
    pub shaders: usize,
    pub qualified: usize,
    pub quarantined_new: usize,
    pub quarantined_known: usize,
    pub amber: usize,
    pub glslang_wrong: usize,
    pub other: usize,
    pub not_run: usize,
    pub rglsl_agree: usize,
    pub rglsl_failures: usize,
    pub rglsl_other: usize,
}

pub fn count<'a>(cells: impl Iterator<Item = &'a Cell>) -> Counts {
    let mut counts = Counts::default();
    for cell in cells {
        counts.shaders += 1;
        match (cell.class, &cell.entry) {
            (_, Some(_)) => counts.quarantined_new += 1,
            (Class::Pass, None) => counts.qualified += 1,
            (Class::Quarantined, None) => counts.quarantined_known += 1,
            (Class::AmberCrash | Class::AmberError, None) => counts.amber += 1,
            (Class::GlslangWrong, None) => counts.glslang_wrong += 1,
            (Class::NotRun, None) => counts.not_run += 1,
            _ => counts.other += 1,
        }
        match &cell.rglsl {
            Some((Verdict::Agree, _)) => counts.rglsl_agree += 1,
            Some((verdict, _)) if verdict.is_failure() => counts.rglsl_failures += 1,
            Some(_) => counts.rglsl_other += 1,
            None => {}
        }
    }
    counts
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Section {
    Quarantined,
    Amber,
    GlslangWrong,
    Other,
    Rglsl,
}

impl Section {
    const ALL: [Self; 5] = [
        Self::Quarantined,
        Self::Amber,
        Self::GlslangWrong,
        Self::Other,
        Self::Rglsl,
    ];

    const fn title(self) -> &'static str {
        match self {
            Self::Quarantined => "Quarantined (new)",
            Self::Amber => "amber-crash / amber-error (to fix)",
            Self::GlslangWrong => "glslang-wrong (to analyse)",
            Self::Other => "Not qualified for other reasons",
            Self::Rglsl => "rglsl failures (ours)",
        }
    }

    fn wants(self, cell: &Cell) -> bool {
        let quarantined = cell.entry.is_some();
        match self {
            Self::Quarantined => quarantined,
            Self::Amber => {
                !quarantined && matches!(cell.class, Class::AmberCrash | Class::AmberError)
            }
            Self::GlslangWrong => cell.class == Class::GlslangWrong,
            Self::Other => {
                !quarantined
                    && !matches!(
                        cell.class,
                        Class::Pass
                            | Class::Quarantined
                            | Class::AmberCrash
                            | Class::AmberError
                            | Class::GlslangWrong
                    )
            }
            Self::Rglsl => cell
                .rglsl
                .as_ref()
                .is_some_and(|(verdict, _)| verdict.is_failure()),
        }
    }
}

fn clean(text: &str) -> String {
    text.replace(['\t', '\n', '\r'], " ").replace('|', "\\|")
}

impl Report<'_> {
    fn name(&self, index: usize) -> &str {
        self.shaders
            .get(index)
            .map_or("?", |shader| shader.name.as_str())
    }

    fn cells(target: &TargetRun, mode: Mode) -> Counts {
        count(
            target
                .cells
                .iter()
                .filter(|((cell_mode, _), _)| *cell_mode == mode)
                .map(|(_, cell)| cell),
        )
    }

    fn compile_counts(&self) -> BTreeMap<Verdict, usize> {
        let mut counts = BTreeMap::new();
        for shader in self.shaders {
            *counts.entry(shader.outcome.verdict).or_default() += 1;
        }
        counts
    }

    pub fn passed(&self) -> bool {
        let compiled = self
            .shaders
            .iter()
            .all(|shader| !shader.outcome.verdict.is_failure());
        let ran = self.targets.iter().all(|target| {
            target.stopped.is_none()
                && target.cells.values().all(|cell| {
                    cell.class != Class::NotRun
                        && !cell
                            .rglsl
                            .as_ref()
                            .is_some_and(|(verdict, _)| verdict.is_failure())
                })
        });
        compiled && ran
    }

    fn listed(&self, wanted: impl Fn(&Cell) -> bool) -> Vec<(String, Mode, String, &Cell)> {
        let mut rows = Vec::new();
        for target in self.targets {
            for ((mode, index), cell) in &target.cells {
                if wanted(cell) {
                    rows.push((
                        target.label.clone(),
                        *mode,
                        self.name(*index).to_string(),
                        cell,
                    ));
                }
            }
        }
        rows
    }

    pub fn markdown(&self) -> String {
        let mut out = format!("# Random differential fuzzing, seed {}\n\n", self.seed);
        let families = {
            let mut names: Vec<&str> = self
                .shaders
                .iter()
                .map(|shader| shader.name.split('/').next().unwrap_or_default())
                .collect();
            names.dedup();
            names.len()
        };
        let _ = writeln!(out, "- command: `{}`", self.args);
        let _ = writeln!(out, "- generator: `{}`", self.generator);
        let _ = writeln!(
            out,
            "- shaders: {} in {families} families",
            self.shaders.len()
        );
        let compile: Vec<String> = self
            .compile_counts()
            .iter()
            .map(|(verdict, count)| format!("{count} {}", verdict.label()))
            .collect();
        let _ = writeln!(out, "- compiled: {}", compile.join(", "));
        for failure in self.generation_failures {
            let _ = writeln!(out, "- generation failed: {}", clean(failure));
        }
        let _ = writeln!(
            out,
            "- result: {}\n",
            if self.passed() { "passed" } else { "FAILED" }
        );

        let compile_failures: Vec<&Shader> = self
            .shaders
            .iter()
            .filter(|shader| shader.outcome.verdict.is_failure())
            .collect();
        if !compile_failures.is_empty() {
            out.push_str(
                "## rglsl compile failures\n\n| shader | verdict | note |\n|---|---|---|\n",
            );
            for shader in compile_failures {
                let _ = writeln!(
                    out,
                    "| {} | {} | {} |",
                    shader.name,
                    shader.outcome.verdict.label(),
                    clean(&shader.outcome.note)
                );
            }
            out.push('\n');
        }

        if self.targets.is_empty() {
            out.push_str("No exec target was run (pass --exec).\n");
            return out;
        }
        out.push_str("## Targets\n\n| target | mode | shaders | qualified | quarantined (new) | quarantined (known) | amber (to fix) | glslang-wrong (to analyse) | not run | other | rglsl agree | rglsl failures |\n|---|---|---|---|---|---|---|---|---|---|---|---|\n");
        for target in self.targets {
            for mode in self.modes {
                let c = Self::cells(target, *mode);
                let _ = writeln!(
                    out,
                    "| {} | {} | {} | {} | {} | {} | {} | {} | {} | {} | {} | {} |",
                    target.label,
                    mode.label(),
                    c.shaders,
                    c.qualified,
                    c.quarantined_new,
                    c.quarantined_known,
                    c.amber,
                    c.glslang_wrong,
                    c.not_run,
                    c.other,
                    c.rglsl_agree,
                    c.rglsl_failures
                );
            }
        }
        out.push('\n');
        for target in self.targets {
            let _ = writeln!(
                out,
                "- {}: {}; {} driver resets observed{}",
                target.label,
                clean(&target.driver),
                target.resets,
                target
                    .stopped
                    .as_ref()
                    .map_or_else(String::new, |why| format!("; STOPPED: {}", clean(why)))
            );
            for problem in &target.problems {
                let _ = writeln!(out, "  - {}", clean(problem));
            }
        }
        out.push('\n');

        for section in Section::ALL {
            let title = section.title();
            let rows = self.listed(|cell| section.wants(cell));
            if rows.is_empty() {
                continue;
            }
            let _ = writeln!(
                out,
                "## {title}\n\n| target | mode | shader | verdict | note |\n|---|---|---|---|---|"
            );
            for (target, mode, shader, cell) in rows {
                let (verdict, note) = match (&cell.rglsl, section == Section::Rglsl) {
                    (Some((verdict, note)), true) => (verdict.label().to_string(), note.clone()),
                    _ => (
                        cell.class.label().to_string(),
                        match &cell.entry {
                            Some(entry) => format!("{}: {}", entry.display(), cell.note),
                            None => cell.note.clone(),
                        },
                    ),
                };
                let _ = writeln!(
                    out,
                    "| {target} | {} | {shader} | {verdict} | {} |",
                    mode.label(),
                    clean(&note)
                );
            }
            out.push('\n');
        }
        out
    }

    pub fn tsv(&self) -> String {
        let mut out = String::from(
            "shader\tcompile\tcompile_note\ttarget\tmode\tqualification\tqualification_note\tquarantine\trglsl\trglsl_note\n",
        );
        for (index, shader) in self.shaders.iter().enumerate() {
            let compile = format!(
                "{}\t{}\t{}",
                shader.name,
                shader.outcome.verdict.label(),
                clean(&shader.outcome.note)
            );
            let mut rows = 0;
            for target in self.targets {
                for mode in self.modes {
                    let Some(cell) = target.cells.get(&(*mode, index)) else {
                        continue;
                    };
                    rows += 1;
                    let (rglsl, rglsl_note) = cell
                        .rglsl
                        .as_ref()
                        .map_or(("", String::new()), |(verdict, note)| {
                            (verdict.label(), clean(note))
                        });
                    let _ = writeln!(
                        out,
                        "{compile}\t{}\t{}\t{}\t{}\t{}\t{rglsl}\t{rglsl_note}",
                        target.label,
                        mode.label(),
                        cell.class.label(),
                        clean(&cell.note),
                        cell.entry
                            .as_ref()
                            .map_or_else(String::new, |entry| entry.display().to_string())
                    );
                }
            }
            if rows == 0 {
                let _ = writeln!(out, "{compile}\t\t\t\t\t\t\t");
            }
        }
        out
    }

    pub fn summary(&self) -> String {
        let mut out = format!(
            "seed {}: {} shaders, generator {}\n",
            self.seed,
            self.shaders.len(),
            self.generator
        );
        for (verdict, count) in self.compile_counts() {
            let _ = writeln!(out, "{count:>6}  {}", verdict.label());
        }
        for target in self.targets {
            for mode in self.modes {
                let c = Self::cells(target, *mode);
                let _ = writeln!(
                    out,
                    "{:>8} {:<2}  qualified {}/{}, quarantined {} new + {} known, amber to fix {}, glslang-wrong {}, not run {}, other {}; rglsl agree {}, failures {}",
                    target.label,
                    mode.label(),
                    c.qualified,
                    c.shaders,
                    c.quarantined_new,
                    c.quarantined_known,
                    c.amber,
                    c.glslang_wrong,
                    c.not_run,
                    c.other,
                    c.rglsl_agree,
                    c.rglsl_failures
                );
            }
            if let Some(why) = &target.stopped {
                let _ = writeln!(out, "{:>8}     STOPPED: {why}", target.label);
            }
        }
        let _ = writeln!(out, "{}", if self.passed() { "passed" } else { "FAILED" });
        out
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    fn cell(class: Class, rglsl: Option<Verdict>, quarantined: bool) -> Cell {
        Cell {
            class,
            note: String::new(),
            entry: quarantined.then(|| "tests/fuzz-quarantine/x".into()),
            rglsl: rglsl.map(|verdict| (verdict, String::new())),
        }
    }

    #[test]
    fn counts_qualification_and_rglsl_verdicts() {
        let cells = [
            cell(Class::Pass, Some(Verdict::Agree), false),
            cell(Class::Pass, Some(Verdict::WrongResultOptimized), false),
            cell(Class::Pass, Some(Verdict::ExecSkipped), false),
            cell(Class::Hang, None, true),
            cell(Class::Hang, None, false),
            cell(Class::Quarantined, None, false),
            cell(Class::AmberCrash, None, false),
            cell(Class::AmberError, None, false),
            cell(Class::GlslangWrong, None, false),
            cell(Class::NotRun, None, false),
        ];
        let counts = count(cells.iter());
        assert_eq!(
            counts,
            Counts {
                shaders: 10,
                qualified: 3,
                quarantined_new: 1,
                quarantined_known: 1,
                amber: 2,
                glslang_wrong: 1,
                other: 1,
                not_run: 1,
                rglsl_agree: 1,
                rglsl_failures: 1,
                rglsl_other: 1,
            }
        );
    }
}
