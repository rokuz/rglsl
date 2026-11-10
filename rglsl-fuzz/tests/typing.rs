use std::fs;
use std::path::{Path, PathBuf};

use rglsl_ast::expressions;
use rglsl_fuzz::{parse, TranslationUnit};
use rglsl_sema::{analyze, Analysis, Options, Stage};

const NEEDS_PREPROCESSOR: [&str; 1] = ["matrices_many_loops.frag"];

fn parseable_samples() -> Vec<(String, String)> {
    let directory = Path::new(env!("CARGO_MANIFEST_DIR")).join("tests/data/450");
    let mut paths: Vec<PathBuf> = fs::read_dir(directory)
        .expect("the sample directory exists")
        .map(|entry| entry.expect("a readable directory entry").path())
        .filter(|path| {
            path.extension()
                .is_some_and(|extension| extension == "frag")
        })
        .collect();
    paths.sort();
    paths
        .into_iter()
        .map(|path| {
            let name = path
                .file_name()
                .and_then(|name| name.to_str())
                .expect("a UTF-8 file name")
                .to_owned();
            let source = fs::read_to_string(&path).expect("a readable shader");
            (name, source)
        })
        .filter(|(name, _)| !NEEDS_PREPROCESSOR.contains(&name.as_str()))
        .collect()
}

fn analyzed(source: &str, relaxed_uniforms: bool) -> (TranslationUnit, Analysis) {
    let unit = parse(source).expect("the sample parses");
    let mut options = Options::new(Stage::Fragment);
    options.relaxed_uniforms = relaxed_uniforms;
    let analysis = analyze(&unit, &options);
    (unit, analysis)
}

#[test]
fn every_sample_is_accepted_with_relaxed_uniforms() {
    let samples = parseable_samples();
    assert_eq!(samples.len(), 43);
    for (name, source) in samples {
        let (_, analysis) = analyzed(&source, true);
        assert!(
            analysis.diagnostics.is_empty(),
            "{name}: {:?}",
            analysis.diagnostics
        );
        assert_eq!(analysis.version, Some(450), "{name}");
    }
}

#[test]
fn every_expression_of_every_sample_has_a_type() {
    let mut total = 0;
    for (name, source) in parseable_samples() {
        let (unit, analysis) = analyzed(&source, true);
        let found = expressions(&unit);
        assert!(!found.is_empty(), "{name}");
        for expression in found {
            total += 1;
            let ty = analysis
                .type_of(expression.id)
                .unwrap_or_else(|| panic!("{name}: expression {} has no type", expression.id));
            assert!(
                !ty.is_error(),
                "{name}: expression {} has an error type",
                expression.id
            );
        }
    }
    assert!(total > 10_000, "{total}");
}

#[test]
fn loose_uniforms_are_the_only_diagnostics_without_the_relaxed_option() {
    let mut reported = 0;
    for (name, source) in parseable_samples() {
        let (_, analysis) = analyzed(&source, false);
        for diagnostic in &analysis.diagnostics {
            reported += 1;
            assert_eq!(
                diagnostic.kind,
                rglsl_sema::DiagnosticKind::UniformOutsideBlock,
                "{name}"
            );
        }
    }
    assert!(reported > 0);
}
