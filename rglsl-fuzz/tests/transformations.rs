#[path = "support/samples.rs"]
mod samples;

use std::collections::BTreeMap;
use std::error::Error;
use std::path::Path;

use rglsl_fuzz::{
    Donor, EnabledTransformations, GeneratorOptions, Random, ShaderJob, Transformation,
    analyze_shader, generate_variant_with_donors, parse_shader, reduce::add_guards_to_job,
};
use rglsl_types::ShaderStage;
use samples::{TestResult, glslang, glslang_accepts, sample_donors, sample_jobs};

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
) -> TestResult {
    let options = options(transformation);
    let mut markers = 0;
    for (index, (name, reference)) in jobs.iter().enumerate() {
        let seed = 7 + u64::try_from(index)?;
        let variant =
            generate_variant_with_donors(reference, &options, donors, &mut Random::new(seed))
                .map_err(|error| format!("{name}: {error}"))?;
        let again =
            generate_variant_with_donors(reference, &options, donors, &mut Random::new(seed))?;
        assert_eq!(variant.emit()?, again.emit()?, "{name}: not deterministic");
        let (extension, text) = variant
            .emit()?
            .shaders
            .into_iter()
            .next()
            .ok_or_else(|| format!("{name}: the variant has no shaders"))?;
        markers += text.matches(marker).count();
        let unit = parse_shader(&text).map_err(|error| format!("{name}: {error}\n{text}"))?;
        let analysis = analyze_shader(&unit, ShaderStage::Fragment, false, None);
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
                )?,
                "{} on {name}: glslang rejects\n{text}",
                transformation.name()
            );
        }
    }
    assert!(markers > 0, "{} never applied", transformation.name());
    Ok(())
}

fn run(transformation: Transformation, marker: &str) -> TestResult {
    let jobs = sample_jobs()?;
    let donors = sample_donors()?;
    check(transformation, marker, &donors, &jobs, glslang().as_deref())
}

#[test]
fn jumps() -> TestResult {
    run(Transformation::AddJump, "_GLF_DEAD")
}

#[test]
fn wrapping_conditionals() -> TestResult {
    run(Transformation::AddWrappingConditional, "_GLF_WRAPPED_")
}

#[test]
fn switches() -> TestResult {
    run(Transformation::AddSwitch, "_GLF_SWITCH")
}

#[test]
fn dead_output_writes() -> TestResult {
    run(Transformation::AddDeadOutputWrite, "_GLF_DEAD")
}

#[test]
fn live_output_writes() -> TestResult {
    run(Transformation::AddLiveOutputWrite, "_GLF_outVarBackup")
}

#[test]
fn dead_code_donation() -> TestResult {
    run(Transformation::DonateDeadCode, "GLF_dead")
}

#[test]
fn live_code_donation() -> TestResult {
    run(Transformation::DonateLiveCode, "GLF_live")
}

fn donated_initialised_declarations(text: &str) -> BTreeMap<String, usize> {
    let mut found = BTreeMap::new();
    for line in text.lines() {
        let Some((head, _)) = line.trim().split_once(" = ") else {
            continue;
        };
        let mut words = head.split_whitespace();
        let (Some(ty), Some(name)) = (words.next(), words.next()) else {
            continue;
        };
        let identifier = |word: &str| word.chars().all(|c| c.is_ascii_alphanumeric() || c == '_');
        let donated = name.starts_with("GLF_live") || name.starts_with("GLF_dead");
        if donated && identifier(ty) && !head.contains('(') {
            *found.entry(head.to_owned()).or_insert(0) += 1;
        }
    }
    found
}

fn uninitialised_donated_variables(job: &ShaderJob) -> Result<Vec<String>, Box<dyn Error>> {
    let guarded = add_guards_to_job(job, None)?.ok_or("the guards do not apply")?;
    let mut found = Vec::new();
    for ((_, text), (_, guarded)) in job
        .emit()?
        .shaders
        .iter()
        .zip(guarded.emit()?.shaders.iter())
    {
        let before = donated_initialised_declarations(text);
        for (head, count) in donated_initialised_declarations(guarded) {
            if before.get(&head).copied().unwrap_or(0) < count {
                found.push(head);
            }
        }
    }
    Ok(found)
}

#[test]
fn uninitialised_donated_variables_are_found() -> TestResult {
    let source = "#version 450\nlayout(location = 0) out vec4 _GLF_color;\n\
        struct GLF_live4BST {\n    int data;\n    int leftIndex;\n    int rightIndex;\n};\n\
        GLF_live4BST GLF_live4tree[10];\n\
        int GLF_live1map[16 * 16];\n\
        void main() {\n    GLF_live4BST GLF_live4currentNode;\n    float GLF_live2x = 1.0;\n\
        _GLF_color = vec4(float(GLF_live4tree[1].data + GLF_live1map[2] + GLF_live4currentNode.data) + GLF_live2x);\n}\n";
    let job = ShaderJob::parse("{}", &[("frag".to_owned(), source.to_owned())])?;
    let mut found = uninitialised_donated_variables(&job)?;
    found.sort();
    assert_eq!(
        found,
        [
            "GLF_live4BST GLF_live4currentNode",
            "GLF_live4BST GLF_live4tree[10]",
            "int GLF_live1map[16 * 16]"
        ]
    );
    Ok(())
}

#[test]
fn donated_variables_are_always_initialised() -> TestResult {
    let jobs = sample_jobs()?;
    let donors = sample_donors()?;
    let options = GeneratorOptions {
        min_nodes: 1500,
        max_nodes: 3000,
        enabled: EnabledTransformations::none()
            .with(Transformation::DonateLiveCode)
            .with(Transformation::DonateDeadCode),
        ..GeneratorOptions::default()
    };
    let mut donated = 0;
    for (index, (name, reference)) in jobs.iter().enumerate() {
        let seed = 11 + u64::try_from(index)?;
        let variant =
            generate_variant_with_donors(reference, &options, &donors, &mut Random::new(seed))?;
        for (_, text) in variant.emit()?.shaders {
            donated += text.matches("GLF_live").count() + text.matches("GLF_dead").count();
        }
        let uninitialised = uninitialised_donated_variables(&variant)?;
        assert!(
            uninitialised.is_empty(),
            "{name}: donated variables without an initializer: {uninitialised:?}"
        );
    }
    assert!(donated > 0, "nothing was donated");
    Ok(())
}

#[test]
fn outlining() -> TestResult {
    run(Transformation::OutlineStatement, "_GLF_outlined_")
}

#[test]
fn loop_splitting() -> TestResult {
    run(Transformation::SplitForLoop, "_GLF_SPLIT_LOOP_COUNTER")
}

#[test]
fn structification() -> TestResult {
    run(Transformation::Structification, "_GLF_struct_replacement_")
}

#[test]
fn vectorization() -> TestResult {
    run(Transformation::Vectorize, "GLF_merged")
}

#[test]
fn merged_vector_names_decode_into_their_components() -> TestResult {
    let components = rglsl_fuzz::vectorize::component_data("GLF_merged3_0_1_1_1_2_3_3_1_4abcdefgh")
        .ok_or("the merged name does not decode")?;
    let decoded: Vec<(u32, u32, &str)> = components
        .iter()
        .map(|component| (component.offset, component.width, component.name.as_str()))
        .collect();
    assert_eq!(decoded, [(0, 1, "a"), (1, 2, "bcd"), (3, 1, "efgh")]);
    assert!(rglsl_fuzz::vectorize::component_data("GLF_merged2_0_1_1x").is_none());
    Ok(())
}

#[test]
fn transformation_names_round_trip() -> TestResult {
    for transformation in Transformation::ALL {
        assert_eq!(
            Transformation::from_name(transformation.name()),
            Some(transformation)
        );
    }
    let enabled = EnabledTransformations::parse_list("identity,add_jump")?;
    assert_eq!(enabled, [Transformation::Identity, Transformation::AddJump]);
    assert!(EnabledTransformations::parse_list("nonsense").is_err());
    Ok(())
}
