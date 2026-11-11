#![allow(
    clippy::unwrap_used,
    clippy::expect_used,
    clippy::panic,
    reason = "tests fail by panicking"
)]

#[path = "support/samples.rs"]
mod samples;

use rglsl_fuzz::reduce::{finalise, reduce, ReduceOptions};
use rglsl_fuzz::{
    analyze_shader, generate_variant_with_donors, parse_shader, GeneratorOptions, Random, ShaderJob,
};
use rglsl_sema::Stage;
use samples::{sample_donors, sample_jobs};

const MARKER: &str = "800";

fn variant() -> (ShaderJob, ShaderJob) {
    let (_, reference) = sample_jobs()
        .into_iter()
        .find(|(name, _)| name == "colorgrid_modulo")
        .unwrap();
    let options = GeneratorOptions {
        min_nodes: 3000,
        max_nodes: 6000,
        ..GeneratorOptions::default()
    };
    let variant =
        generate_variant_with_donors(&reference, &options, &sample_donors(), &mut Random::new(5))
            .unwrap();
    (reference, variant)
}

fn text(job: &ShaderJob) -> String {
    job.emit().shaders.into_iter().next().unwrap().1
}

fn valid_with_marker(job: &ShaderJob) -> bool {
    let text = text(job);
    let Ok(unit) = parse_shader(&text) else {
        return false;
    };
    analyze_shader(&unit, Stage::Fragment, false, None)
        .diagnostics
        .is_empty()
        && text.contains(MARKER)
}

#[test]
fn a_planted_feature_reduces_to_a_small_reproducer() {
    let (_, variant) = variant();
    assert!(text(&variant).lines().count() > 200);
    let mut judge = |job: &ShaderJob| Ok(valid_with_marker(job));
    let reduction = reduce(&variant, ReduceOptions::default(), &mut judge).unwrap();
    let reduced = finalise(&reduction.job);
    let reduced_text = text(&reduced);
    assert!(valid_with_marker(&reduced), "{reduced_text}");
    assert_eq!(reduction.loop_bound, Some(100), "{reduced_text}");
    assert!(
        !rglsl_fuzz::macros::uses_macros(&parse_shader(&reduced_text).unwrap()),
        "{reduced_text}"
    );
    assert!(
        reduced_text.contains("_GLF_global_loop_count++"),
        "{reduced_text}"
    );
    let lines = reduced_text
        .lines()
        .filter(|line| !line.trim().is_empty())
        .count();
    assert!(lines <= 25, "{lines} lines:\n{reduced_text}");
    let script = rglsl_fuzz::amber::amber_script(&reduced).unwrap();
    assert!(script.contains(reduced_text.trim_end()), "{script}");
    assert!(script.contains("RUN pipeline DRAW_RECT POS 0 0 SIZE 256 256"));
    assert!(script.contains("BUFFER injectionSwitch DATA_TYPE vec2<float> STD140 DATA"));
}

#[test]
fn preserving_semantics_undoes_the_transformations() {
    let (reference, variant) = variant();
    let mut judge = |job: &ShaderJob| Ok(valid_with_marker(job));
    let options = ReduceOptions {
        preserve_semantics: true,
        ..ReduceOptions::default()
    };
    let reduction = reduce(&variant, options, &mut judge).unwrap();
    let reduced = text(&reduction.job);
    for marker in [
        "_GLF_DEAD",
        "_GLF_IDENTITY",
        "_GLF_SWITCH",
        "_GLF_WRAPPED",
        "GLF_live",
        "GLF_dead",
        "_GLF_outlined_",
        "_GLF_struct_",
        "GLF_merged",
        "_GLF_outVarBackup",
    ] {
        assert!(!reduced.contains(marker), "{marker} left in\n{reduced}");
    }
    let reference_lines = text(&reference).lines().count();
    let reduced_lines = reduced.lines().count();
    assert!(
        reduced_lines <= reference_lines + 40,
        "{reduced_lines} lines against {reference_lines}:\n{reduced}"
    );
}

#[test]
fn an_uninteresting_input_is_an_error() {
    let (_, variant) = variant();
    let mut judge = |_: &ShaderJob| Ok(false);
    assert!(reduce(&variant, ReduceOptions::default(), &mut judge).is_err());
}
