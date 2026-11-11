use std::sync::Arc;

use rglsl_ast::TranslationUnit;
use rglsl_sema::{analyze, analyze_with_builtins, Analysis, Builtins, Options, Stage};

use crate::donate::Donor;
use crate::error::Error;
use crate::fuzzer::GenerationParams;
use crate::job::{
    add_braces, add_injection_switch_if_not_present, node_count, parse_unit, ShaderJob,
};
use crate::macros::{emit, expand_macros};
use crate::pipeline::{uniform_declarators, UniformType};
use crate::random::Random;
use crate::strip::strip_unused;
use crate::transformation::{
    self, EnabledTransformations, PassInput, Probabilities, Transformation,
};

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct GeneratorOptions {
    pub small: bool,
    pub max_uniforms: usize,
    pub add_injection_switch: bool,
    pub push_constant_probability: f32,
    pub min_nodes: u32,
    pub max_nodes: u32,
    pub enabled: EnabledTransformations,
}

impl Default for GeneratorOptions {
    fn default() -> Self {
        Self {
            small: false,
            max_uniforms: 0,
            add_injection_switch: true,
            push_constant_probability: 0.5,
            min_nodes: 5000,
            max_nodes: 22000,
            enabled: EnabledTransformations::all(),
        }
    }
}

pub fn analyze_shader(
    unit: &TranslationUnit,
    stage: Stage,
    relaxed_uniforms: bool,
    builtins: Option<&Arc<Builtins>>,
) -> Analysis {
    let expanded = expand_macros(unit);
    let mut options = Options::new(stage);
    options.relaxed_uniforms = relaxed_uniforms;
    match builtins {
        Some(builtins) => analyze_with_builtins(&expanded, &options, builtins),
        None => analyze(&expanded, &options),
    }
}

fn shader_large_enough(
    unit: &TranslationUnit,
    options: &GeneratorOptions,
    random: &mut Random,
) -> bool {
    let span = options.max_nodes.saturating_sub(options.min_nodes).max(1);
    let limit = random.next_int(span) + options.min_nodes;
    node_count(unit) > usize::try_from(limit).unwrap_or(usize::MAX)
}

#[allow(clippy::too_many_arguments)]
fn apply_transformation(
    transformation: Transformation,
    unit: &mut TranslationUnit,
    stage: Stage,
    builtins: &mut Option<Arc<Builtins>>,
    probabilities: &Probabilities,
    params: GenerationParams,
    donors: &[Donor],
    random: &mut Random,
) -> bool {
    let analysis = analyze_shader(unit, stage, true, builtins.as_ref());
    if builtins.is_none() {
        *builtins = Some(Arc::clone(&analysis.builtins));
    }
    let input = PassInput {
        unit,
        analysis: &analysis,
        probabilities,
        params,
        donors,
    };
    let Some(transformed) = transformation::apply(transformation, &input, random) else {
        return false;
    };
    let Ok(mut reparsed) = parse_unit("variant", &emit(&transformed)) else {
        return false;
    };
    if let Some(stripped) = strip_unused(&reparsed) {
        match parse_unit("variant", &emit(&stripped)) {
            Ok(stripped) => reparsed = stripped,
            Err(_) => return false,
        }
    }
    *unit = reparsed;
    true
}

fn available_transformations(
    stage: Stage,
    options: &GeneratorOptions,
    donors: &[Donor],
) -> Vec<Transformation> {
    let has_donors = donors.iter().any(|donor| donor.stage() == stage);
    Transformation::ALL
        .into_iter()
        .filter(|transformation| options.enabled.contains(*transformation))
        .filter(|transformation| match transformation {
            Transformation::DonateDeadCode | Transformation::DonateLiveCode => has_donors,
            Transformation::AddDeadOutputWrite => stage == Stage::Fragment,
            Transformation::AddDeadBarrier => stage == Stage::Compute,
            _ => true,
        })
        .collect()
}

pub fn transform_shader(
    unit: &mut TranslationUnit,
    stage: Stage,
    options: &GeneratorOptions,
    donors: &[Donor],
    random: &mut Random,
) -> Vec<&'static str> {
    let mut params = if options.small {
        GenerationParams::small(stage)
    } else {
        GenerationParams::normal(stage)
    };
    params.injection_switch = options.add_injection_switch;
    let probabilities = Probabilities::random_multi_pass(random);
    let mut candidates = available_transformations(stage, options, donors);
    let mut transformations = Vec::new();
    while !candidates.is_empty() {
        let index = random.next_index(candidates.len());
        let candidate = candidates.remove(index);
        let keep = if candidate == Transformation::AddSwitch {
            random.next_int(8) == 0
        } else {
            random.next_bool()
        };
        if (candidates.is_empty() && transformations.is_empty()) || keep {
            transformations.push(candidate);
        }
    }
    let mut applied = Vec::new();
    let mut next_round = Vec::new();
    let mut builtins = None;
    while !transformations.is_empty() && !shader_large_enough(unit, options, random) {
        let index = random.next_index(transformations.len());
        let transformation = transformations.remove(index);
        applied.push(transformation.name());
        let mut child = random.spawn_child();
        if apply_transformation(
            transformation,
            unit,
            stage,
            &mut builtins,
            &probabilities,
            params,
            donors,
            &mut child,
        ) {
            next_round.push(transformation);
        }
        if transformations.is_empty() {
            transformations = core::mem::take(&mut next_round);
        }
    }
    applied
}

fn push_constant_candidates(job: &ShaderJob) -> Vec<String> {
    let mut names: Vec<String> = Vec::new();
    for shader in &job.shaders {
        let Ok(declarators) = uniform_declarators(&shader.unit) else {
            continue;
        };
        for declarator in declarators {
            if matches!(declarator.ty, UniformType::Basic(_)) && !names.contains(&declarator.name) {
                names.push(declarator.name);
            }
        }
    }
    names
}

pub fn generate_variant(
    reference: &ShaderJob,
    options: &GeneratorOptions,
    random: &mut Random,
) -> Result<ShaderJob, Error> {
    generate_variant_with_donors(reference, options, &[], random)
}

pub fn generate_variant_with_donors(
    reference: &ShaderJob,
    options: &GeneratorOptions,
    donors: &[Donor],
    random: &mut Random,
) -> Result<ShaderJob, Error> {
    let mut job = reference.clone();
    let prepared = prepare_reference(reference, options.max_uniforms.saturating_sub(1), true)?;
    for name in prepared.pipeline.uniform_names() {
        if let Some(binding) = prepared.pipeline.binding(&name) {
            if !job.pipeline.has_binding_or_is_push_constant(&name) {
                job.pipeline.add_uniform_binding(&name, false, binding);
            }
        }
    }
    if options.add_injection_switch {
        for shader in &mut job.shaders {
            add_injection_switch_if_not_present(&mut shader.unit)?;
        }
        job.pipeline.set_injection_switch()?;
    }
    for index in 0..job.shaders.len() {
        let mut child = random.spawn_child();
        let Some(shader) = job.shaders.get_mut(index) else {
            continue;
        };
        job.pipeline.zero_unset_uniforms(&shader.unit)?;
        let stage = shader.stage();
        transform_shader(&mut shader.unit, stage, options, donors, &mut child);
        let mut uniforms = child.spawn_child();
        job.pipeline
            .randomise_unset_uniforms(&shader.unit, &mut uniforms)?;
    }
    if options.max_uniforms > 0 {
        job.prune_uniforms(options.max_uniforms)?;
    }
    let mut push_constant = None;
    let supports_push_constants = job
        .shaders
        .iter()
        .all(|shader| shader.version() == Some(460));
    if supports_push_constants && random.next_float() <= options.push_constant_probability {
        let candidates = push_constant_candidates(&job);
        if !candidates.is_empty() {
            push_constant = candidates.get(random.next_index(candidates.len())).cloned();
        }
    }
    job.make_uniform_bindings(push_constant.as_deref())?;
    Ok(job)
}

pub fn prepare_reference(
    reference: &ShaderJob,
    max_uniforms: usize,
    vulkan: bool,
) -> Result<ShaderJob, Error> {
    let mut job = reference.clone();
    for shader in &mut job.shaders {
        job.pipeline.zero_unset_uniforms(&shader.unit)?;
        add_braces(&mut shader.unit);
        shader.unit = crate::job::renumber(&shader.unit)?;
    }
    if max_uniforms > 0 {
        job.prune_uniforms(max_uniforms)?;
    }
    if vulkan {
        job.make_uniform_bindings(None)?;
    }
    Ok(job)
}

#[derive(Debug, Clone, PartialEq)]
pub struct FamilyOptions {
    pub variants: u32,
    pub max_bytes: usize,
    pub generator: GeneratorOptions,
    pub donors: Vec<Donor>,
}

impl Default for FamilyOptions {
    fn default() -> Self {
        Self {
            variants: 10,
            max_bytes: 500_000,
            generator: GeneratorOptions::default(),
            donors: Vec::new(),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Family {
    pub reference: ShaderJob,
    pub variants: Vec<ShaderJob>,
    pub tried: u32,
    pub failures: Vec<String>,
}

pub fn generate_family(
    reference: &ShaderJob,
    options: &FamilyOptions,
    random: &mut Random,
) -> Result<Family, Error> {
    let prepared = prepare_reference(
        reference,
        options.generator.max_uniforms.saturating_sub(1),
        true,
    )?;
    let mut variants = Vec::new();
    let mut failures = Vec::new();
    let mut tried = 0;
    let max_tries = options.variants.saturating_mul(10).max(10);
    while u32::try_from(variants.len()).unwrap_or(u32::MAX) < options.variants && tried < max_tries
    {
        tried += 1;
        let mut child = random.spawn_child();
        match generate_variant_with_donors(
            reference,
            &options.generator,
            &options.donors,
            &mut child,
        ) {
            Ok(variant) => {
                let too_large = variant
                    .emit()
                    .shaders
                    .iter()
                    .any(|(_, text)| text.len() > options.max_bytes);
                if !too_large {
                    variants.push(variant);
                }
            }
            Err(error) => failures.push(format!("{}: {error}", child.description())),
        }
    }
    Ok(Family {
        reference: prepared,
        variants,
        tried,
        failures,
    })
}
