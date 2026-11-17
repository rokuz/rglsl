use std::fmt::Write as _;

use super::{Group, milliseconds, stats, times};

#[derive(Debug, Clone, Copy)]
pub struct Row<'a> {
    pub name: &'a str,
    pub group: Group,
    pub glslang: f64,
    pub glslang_opt: f64,
    pub optimizer: f64,
    pub rglsl: f64,
}

impl Row<'_> {
    pub fn budget(&self) -> f64 {
        self.glslang_opt - self.rglsl
    }
}

fn spread(values: &[f64]) -> String {
    let minimum = stats::minimum(values);
    let maximum = values.iter().copied().max_by(f64::total_cmp);
    match (minimum, stats::median(values), maximum) {
        (Some(minimum), Some(median), Some(maximum)) => format!(
            "{} / {} / {}",
            milliseconds(minimum),
            milliseconds(median),
            milliseconds(maximum)
        ),
        _ => "-".into(),
    }
}

fn summary_row(out: &mut String, label: &str, rows: &[&Row]) {
    let budgets: Vec<f64> = rows.iter().map(|row| row.budget()).collect();
    let optimizer: Vec<f64> = rows.iter().map(|row| row.optimizer).collect();
    let ratios: Vec<f64> = rows
        .iter()
        .filter_map(|row| stats::ratio(row.rglsl, row.glslang_opt))
        .collect();
    let negative = budgets.iter().filter(|&&budget| budget <= 0.0).count();
    let _ = writeln!(
        out,
        "| {label} | {} | {} | {} | {} | {} | {} |",
        rows.len(),
        spread(&budgets),
        spread(&optimizer),
        times(stats::geometric_mean(&ratios)),
        times(stats::ratio(
            rows.iter().map(|row| row.rglsl).sum(),
            rows.iter().map(|row| row.glslang_opt).sum()
        )),
        negative,
    );
}

pub fn section(out: &mut String, rows: &[Row], groups: &[Group], optimizer: &str, missing: usize) {
    out.push_str("\n## Optimizer budget: `glslang -O` − rglsl\n\n");
    let _ = writeln!(
        out,
        "`glslang -O` is the pinned glslang built with the optimizer (`target/oracles/bin/glslang-opt`), which runs \
         `spirv-opt`'s performance passes after `GlslangToSpv`. The budget of a shader is its `glslang -O` time minus \
         its rglsl time: what an rglsl optimizer may spend and still be no slower than `glslang -O`. \
         *Optimizer* is {optimizer}. Min / median / max over the shaders.\n"
    );
    if rows.is_empty() {
        out.push_str("No shader was measured with `glslang -O`.\n");
        return;
    }
    out.push_str("| shader set | shaders | budget min / median / max | optimizer min / median / max | geometric mean of rglsl/(glslang -O) | rglsl/(glslang -O) (totals) | budget ≤ 0 |\n|---|--:|--:|--:|--:|--:|--:|\n");
    for &group in groups {
        let selected: Vec<&Row> = rows.iter().filter(|row| row.group == group).collect();
        if !selected.is_empty() {
            summary_row(out, group.label(), &selected);
        }
    }
    let all: Vec<&Row> = rows.iter().collect();
    summary_row(out, "**all**", &all);
    if missing > 0 {
        let _ = writeln!(
            out,
            "\n`glslang -O` fails on {missing} shaders that plain glslang compiles; they are left out of this section."
        );
    }
    let table = |out: &mut String, title: &str, selected: &[&Row]| {
        let _ = writeln!(out, "\n### {title}\n");
        out.push_str("| shader | set | glslang | glslang -O | optimizer | rglsl | budget | budget/rglsl |\n|---|---|--:|--:|--:|--:|--:|--:|\n");
        for row in selected {
            let _ = writeln!(
                out,
                "| `{}` | {} | {} | {} | {} | {} | {} | {} |",
                row.name,
                row.group.key(),
                milliseconds(row.glslang),
                milliseconds(row.glslang_opt),
                milliseconds(row.optimizer),
                milliseconds(row.rglsl),
                milliseconds(row.budget()),
                times(stats::ratio(row.budget(), row.rglsl)),
            );
        }
    };
    let mut by_budget: Vec<&Row> = rows.iter().collect();
    by_budget.sort_by(|a, b| {
        stats::ratio(a.budget(), a.rglsl)
            .unwrap_or(f64::INFINITY)
            .total_cmp(&stats::ratio(b.budget(), b.rglsl).unwrap_or(f64::INFINITY))
    });
    by_budget.truncate(15);
    table(out, "Smallest budgets relative to rglsl", &by_budget);
    let mut by_optimizer: Vec<&Row> = rows.iter().collect();
    by_optimizer.sort_by(|a, b| b.optimizer.total_cmp(&a.optimizer));
    by_optimizer.truncate(10);
    table(out, "Slowest optimizer", &by_optimizer);
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn section_summarizes_budgets() {
        let rows = [
            Row {
                name: "a.frag",
                group: Group::Vulkan,
                glslang: 2.0,
                glslang_opt: 5.0,
                optimizer: 3.0,
                rglsl: 1.0,
            },
            Row {
                name: "b.frag",
                group: Group::Vulkan,
                glslang: 2.0,
                glslang_opt: 3.0,
                optimizer: 1.0,
                rglsl: 3.0,
            },
        ];
        let mut out = String::new();
        section(&mut out, &rows, &[Group::Vulkan], "the optimizer", 2);
        assert!(out.contains(
            "| glslang corpus, Vulkan tests | 2 | 0.00 ms / 2.00 ms / 4.00 ms | 1.00 ms / 2.00 ms / 3.00 ms |"
        ));
        assert!(out.contains("| 0.45× | 0.50× | 1 |"));
        assert!(out.contains("fails on 2 shaders"));
        assert!(out.contains(
            "| `b.frag` | vulkan | 2.00 ms | 3.00 ms | 1.00 ms | 3.00 ms | 0.00 ms | 0.00× |"
        ));
    }
}
