use std::collections::BTreeMap;
use std::env;
use std::fs;
use std::path::Path;
use std::process::ExitCode;

use rglsl_ast::ast::{DirectiveKind, ExternalDeclaration};
use rglsl_sema::{analyze, DiagnosticKind, Options, Stage};

struct Outcome {
    file: String,
    extensions: Vec<String>,
    diagnostics: Vec<(Option<u32>, String)>,
}

fn extensions(unit: &rglsl_ast::TranslationUnit) -> Vec<String> {
    unit.external_declarations
        .iter()
        .filter_map(|declaration| match declaration {
            ExternalDeclaration::Directive(directive) => match &directive.kind {
                DirectiveKind::Extension { name, .. } => Some(name.clone()),
                _ => None,
            },
            _ => None,
        })
        .collect()
}

fn check(directory: &Path, file: &str) -> Option<Outcome> {
    let source = fs::read_to_string(directory.join(file)).ok()?;
    let unit = rglsl_ast::parse(&source).ok()?;
    let stage = Stage::from_extension(Path::new(file).extension()?.to_str()?)?;
    let analysis = analyze(&unit, &Options::new(stage));
    let diagnostics = analysis
        .diagnostics
        .iter()
        .map(|diagnostic| {
            let line = match diagnostic.kind {
                DiagnosticKind::MissingEntryPoint
                | DiagnosticKind::MissingVersion
                | DiagnosticKind::MissingFunctionBody(_) => None,
                _ => Some(diagnostic.line(&source)),
            };
            (line, format!("{:?}", diagnostic.kind))
        })
        .collect();
    Some(Outcome {
        file: file.to_owned(),
        extensions: extensions(&unit),
        diagnostics,
    })
}

fn describe(outcome: &Outcome) -> String {
    match outcome.diagnostics.first() {
        Some((Some(line), kind)) => format!("{}:{line} {kind}", outcome.file),
        Some((None, kind)) => format!("{} {kind}", outcome.file),
        None => format!("{} (no diagnostics)", outcome.file),
    }
}

fn main() -> ExitCode {
    let arguments: Vec<String> = env::args().collect();
    let (Some(directory), Some(verdicts)) = (arguments.get(1), arguments.get(2)) else {
        eprintln!("usage: check <corpus directory> <verdicts.tsv>");
        return ExitCode::FAILURE;
    };
    let Ok(verdicts) = fs::read_to_string(verdicts) else {
        eprintln!("cannot read {verdicts}");
        return ExitCode::FAILURE;
    };
    let verdicts: BTreeMap<&str, &str> = verdicts
        .lines()
        .filter_map(|line| line.split_once('\t'))
        .collect();
    let directory = Path::new(directory);
    let mut parsed = 0_u32;
    let mut accepted = Vec::new();
    let mut rejected = Vec::new();
    for (file, verdict) in &verdicts {
        let Some(outcome) = check(directory, file) else {
            continue;
        };
        parsed += 1;
        match verdict.strip_prefix("reject@") {
            None => accepted.push(outcome),
            Some(lines) => {
                let lines: Vec<u32> = lines
                    .split(',')
                    .filter_map(|line| line.parse().ok())
                    .collect();
                rejected.push((outcome, lines));
            }
        }
    }
    println!("shaders: {}, parsed by rglsl-ast: {parsed}", verdicts.len());

    let clean = accepted
        .iter()
        .filter(|outcome| outcome.diagnostics.is_empty())
        .count();
    println!();
    println!(
        "(a) glslang accepts {}: rglsl-sema reports no diagnostics for {clean}",
        accepted.len()
    );
    let (with_extensions, without_extensions): (Vec<&Outcome>, Vec<&Outcome>) = accepted
        .iter()
        .filter(|outcome| !outcome.diagnostics.is_empty())
        .partition(|outcome| !outcome.extensions.is_empty());
    println!(
        "    false diagnostics without #extension: {}",
        without_extensions.len()
    );
    for outcome in &without_extensions {
        println!("      {}", describe(outcome));
    }
    println!(
        "    false diagnostics in shaders that enable extensions: {}",
        with_extensions.len()
    );
    let mut names: BTreeMap<&str, u32> = BTreeMap::new();
    for outcome in &with_extensions {
        println!(
            "      {} [{}]",
            describe(outcome),
            outcome.extensions.join(", ")
        );
        for name in &outcome.extensions {
            *names.entry(name).or_default() += 1;
        }
    }
    if !names.is_empty() {
        let listed: Vec<String> = names
            .iter()
            .map(|(name, count)| format!("{name} ({count})"))
            .collect();
        println!("    extensions involved: {}", listed.join(", "));
    }

    let also_rejected: Vec<&(Outcome, Vec<u32>)> = rejected
        .iter()
        .filter(|(outcome, _)| !outcome.diagnostics.is_empty())
        .collect();
    let same_line = |(outcome, lines): &(Outcome, Vec<u32>)| match outcome.diagnostics.first() {
        Some((Some(line), _)) => lines.contains(line),
        Some((None, _)) => lines.is_empty(),
        None => false,
    };
    let matched = also_rejected
        .iter()
        .filter(|entry| same_line(entry))
        .count();
    println!();
    println!(
        "(b) glslang rejects {}: rglsl-sema also rejects {}, first diagnostic on a glslang line for {matched}",
        rejected.len(),
        also_rejected.len()
    );
    println!("    accepted by rglsl-sema:");
    for (outcome, lines) in &rejected {
        if outcome.diagnostics.is_empty() {
            println!("      {} (glslang: {lines:?})", outcome.file);
        }
    }
    println!("    rejected on another line:");
    for entry in &also_rejected {
        if !same_line(entry) {
            println!("      {} (glslang: {:?})", describe(&entry.0), entry.1);
        }
    }
    ExitCode::SUCCESS
}
