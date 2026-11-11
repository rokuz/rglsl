#![allow(
    clippy::unwrap_used,
    clippy::expect_used,
    clippy::panic,
    reason = "tests fail by panicking"
)]

#[path = "support/samples.rs"]
mod samples;

use std::path::Path;

use rglsl_fuzz::{
    analyze_shader, generate_variant_with_donors, parse_shader, Donor, EnabledTransformations,
    GeneratorOptions, Random, ShaderJob, Transformation,
};
use rglsl_sema::Stage;
use samples::{glslang, glslang_accepts, sample_donors, sample_jobs};

fn options(transformation: Transformation) -> GeneratorOptions {
    GeneratorOptions {
        min_nodes: 1500,
        max_nodes: 3000,
        enabled: EnabledTransformations::none().with(transformation),
        ..GeneratorOptions::default()
    }
}

fn check(
    transformation: Transformation,
    marker: &str,
    donors: &[Donor],
    jobs: &[(String, ShaderJob)],
    glslang: Option<&Path>,
) {
    let options = options(transformation);
    let mut markers = 0;
    for (index, (name, reference)) in jobs.iter().enumerate() {
        let seed = 7 + u64::try_from(index).unwrap();
        let variant =
            generate_variant_with_donors(reference, &options, donors, &mut Random::new(seed))
                .unwrap_or_else(|error| panic!("{name}: {error}"));
        let again =
            generate_variant_with_donors(reference, &options, donors, &mut Random::new(seed))
                .unwrap();
        assert_eq!(variant.emit(), again.emit(), "{name}: not deterministic");
        let (extension, text) = variant.emit().shaders.into_iter().next().unwrap();
        markers += text.matches(marker).count();
        let unit = parse_shader(&text).unwrap_or_else(|error| panic!("{name}: {error}\n{text}"));
        let analysis = analyze_shader(&unit, Stage::Fragment, false, None);
        assert!(
            analysis.diagnostics.is_empty(),
            "{} on {name}: {:?}\n{text}",
            transformation.name(),
            analysis.diagnostics
        );
        if let Some(glslang) = glslang {
            assert!(
                glslang_accepts(
                    glslang,
                    &text,
                    &extension,
                    &format!("{}-{name}", transformation.name())
                ),
                "{} on {name}: glslang rejects\n{text}",
                transformation.name()
            );
        }
    }
    assert!(markers > 0, "{} never applied", transformation.name());
}

fn run(transformation: Transformation, marker: &str) {
    let jobs = sample_jobs();
    let donors = sample_donors();
    check(transformation, marker, &donors, &jobs, glslang().as_deref());
}

#[test]
fn jumps() {
    run(Transformation::AddJump, "_GLF_DEAD");
}

#[test]
fn wrapping_conditionals() {
    run(Transformation::AddWrappingConditional, "_GLF_WRAPPED_");
}

#[test]
fn switches() {
    run(Transformation::AddSwitch, "_GLF_SWITCH");
}

#[test]
fn dead_output_writes() {
    run(Transformation::AddDeadOutputWrite, "_GLF_DEAD");
}

#[test]
fn live_output_writes() {
    run(Transformation::AddLiveOutputWrite, "_GLF_outVarBackup");
}

#[test]
fn dead_code_donation() {
    run(Transformation::DonateDeadCode, "GLF_dead");
}

#[test]
fn live_code_donation() {
    run(Transformation::DonateLiveCode, "GLF_live");
}

#[test]
fn outlining() {
    run(Transformation::OutlineStatement, "_GLF_outlined_");
}

#[test]
fn loop_splitting() {
    run(Transformation::SplitForLoop, "_GLF_SPLIT_LOOP_COUNTER");
}

#[test]
fn structification() {
    run(Transformation::Structification, "_GLF_struct_replacement_");
}

#[test]
fn vectorization() {
    run(Transformation::Vectorize, "GLF_merged");
}
