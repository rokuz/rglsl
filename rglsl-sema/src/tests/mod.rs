mod api;
mod builtins;
mod dimensions;

use alloc::format;
use alloc::string::{String, ToString};
use alloc::vec::Vec;

use crate::{analyze, Analysis, DiagnosticKind, Options, Stage};

const CASES: &str = include_str!("cases.txt");

type TestResult<T = ()> = Result<T, alloc::boxed::Box<dyn core::error::Error>>;

pub(crate) struct Case {
    pub name: String,
    pub stage: Stage,
    pub source: String,
    pub expected: Vec<(u32, String)>,
}

pub(crate) fn kind_name(kind: &DiagnosticKind) -> String {
    format!("{kind:?}")
        .chars()
        .take_while(char::is_ascii_alphanumeric)
        .collect()
}

fn is_lineless(kind: &DiagnosticKind) -> bool {
    matches!(
        kind,
        DiagnosticKind::MissingEntryPoint
            | DiagnosticKind::MissingVersion
            | DiagnosticKind::MissingFunctionBody(_)
    )
}

pub(crate) fn reported(analysis: &Analysis, source: &str) -> Vec<(u32, String)> {
    let mut found: Vec<(u32, String)> = analysis
        .diagnostics
        .iter()
        .map(|diagnostic| {
            let line = if is_lineless(&diagnostic.kind) {
                0
            } else {
                diagnostic.line(source)
            };
            (line, kind_name(&diagnostic.kind))
        })
        .collect();
    found.sort();
    found
}

pub(crate) fn cases() -> TestResult<Vec<Case>> {
    let mut cases = Vec::new();
    for block in CASES.split("### ").skip(1) {
        let (header, body) = block.split_once('\n').ok_or("a case has no header line")?;
        let fields: Vec<&str> = header.split(" | ").collect();
        let [name, target, expectations] = fields.as_slice() else {
            return Err(format!("malformed case header: {header}").into());
        };
        let mut target = target.split(' ');
        let stage = target
            .next()
            .and_then(Stage::from_extension)
            .ok_or_else(|| format!("unknown stage in: {header}"))?;
        let version = target.next().unwrap_or("450");
        let mut expected: Vec<(u32, String)> = if *expectations == "ok" {
            Vec::new()
        } else {
            expectations
                .split(", ")
                .map(|expectation| -> TestResult<(u32, String)> {
                    let (line, kind) = expectation
                        .split_once(':')
                        .ok_or_else(|| format!("malformed expectation in: {header}"))?;
                    let line = line
                        .parse()
                        .map_err(|_| format!("malformed line in: {header}"))?;
                    Ok((line, kind.to_string()))
                })
                .collect::<TestResult<_>>()?
        };
        expected.sort();
        cases.push(Case {
            name: name.to_string(),
            stage,
            source: format!("#version {version}\n{body}"),
            expected,
        });
    }
    Ok(cases)
}

fn run(filter: impl Fn(&Case) -> bool) -> TestResult<usize> {
    let mut failures = Vec::new();
    let mut count = 0;
    for case in cases()?.into_iter().filter(|case| filter(case)) {
        count += 1;
        let unit = match rglsl_ast::parse(&case.source) {
            Ok(unit) => unit,
            Err(error) => {
                failures.push(format!("{}: does not parse: {error}", case.name));
                continue;
            }
        };
        let analysis = analyze(&unit, &Options::new(case.stage));
        let found = reported(&analysis, &case.source);
        if found != case.expected {
            failures.push(format!(
                "{}: expected {:?}, found {:?} ({:?})",
                case.name, case.expected, found, analysis.diagnostics
            ));
        }
    }
    assert!(failures.is_empty(), "{}", failures.join("\n"));
    Ok(count)
}

#[test]
fn accepted_shaders_have_no_diagnostics() -> TestResult {
    let count = run(|case| case.expected.is_empty())?;
    assert!(count >= 100, "{count}");
    Ok(())
}

#[test]
fn rejected_shaders_report_the_expected_kind_on_the_expected_line() -> TestResult {
    let count = run(|case| !case.expected.is_empty())?;
    assert!(count >= 150, "{count}");
    Ok(())
}

#[test]
fn case_names_are_unique() -> TestResult {
    let mut names: Vec<String> = cases()?.into_iter().map(|case| case.name).collect();
    let total = names.len();
    names.sort();
    names.dedup();
    assert_eq!(names.len(), total);
    Ok(())
}

fn words(source: &str) -> Vec<&str> {
    let mut found = Vec::new();
    let mut start = 0;
    let mut in_word = false;
    for (index, character) in source.char_indices() {
        let is_word = character.is_ascii_alphanumeric() || character == '_' || character == '.';
        if is_word != in_word || !is_word {
            if index > start {
                found.extend(source.get(start..index));
            }
            start = index;
            in_word = is_word;
        }
    }
    found.extend(source.get(start..));
    found
}

#[test]
fn mutated_shaders_are_analysed_without_panicking() -> TestResult {
    use alloc::collections::BTreeMap;
    use alloc::sync::Arc;

    use crate::{analyze_with_builtins, Builtins, ResourceLimits};

    let mut cache: BTreeMap<(u32, Stage), Arc<Builtins>> = BTreeMap::new();
    let mut state = 0x2545_f491_4f6c_dd1d_u64;
    let mut next = move |bound: usize| {
        state ^= state << 13;
        state ^= state >> 7;
        state ^= state << 17;
        usize::try_from(state % u64::try_from(bound.max(1)).unwrap_or(1)).unwrap_or(0)
    };
    let mut analysed = 0;
    let mut rejected = 0;
    for case in cases()? {
        let version = if case.source.starts_with("#version 460") {
            460
        } else {
            450
        };
        let builtins = cache.entry((version, case.stage)).or_insert_with(|| {
            Arc::new(Builtins::new(
                version,
                case.stage,
                &ResourceLimits::default(),
            ))
        });
        let tokens = words(&case.source);
        for _ in 0..6 {
            let mut mutated: Vec<&str> = tokens.clone();
            let target = 3 + next(mutated.len().saturating_sub(3));
            let source = next(mutated.len());
            let replacement = mutated.get(source).copied().unwrap_or(";");
            match next(3) {
                0 => {
                    if let Some(slot) = mutated.get_mut(target) {
                        *slot = replacement;
                    }
                }
                1 => {
                    if target < mutated.len() {
                        mutated.remove(target);
                    }
                }
                _ => mutated.insert(target.min(mutated.len()), replacement),
            }
            let text: String = mutated.concat();
            let Ok(unit) = rglsl_ast::parse(&text) else {
                continue;
            };
            let analysis = analyze_with_builtins(&unit, &Options::new(case.stage), builtins);
            analysed += 1;
            rejected += usize::from(!analysis.is_ok());
            for expression in rglsl_ast::expressions(&unit) {
                if let Some(info) = analysis.expression(expression.id) {
                    assert!(!info.is_lvalue || !info.ty.is_error(), "{text}");
                }
            }
        }
    }
    assert!(analysed > 1000, "{analysed}");
    assert!(rejected > 300, "{rejected}");
    Ok(())
}
