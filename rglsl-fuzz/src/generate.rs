use std::sync::Arc;

use rglsl_ast::TranslationUnit;
use rglsl_sema::{analyze, analyze_with_builtins, Analysis, Builtins, Options, Stage};

use crate::error::Error;
use crate::fuzzer::GenerationParams;
use crate::identity;
use crate::job::{
    add_braces, add_injection_switch_if_not_present, node_count, parse_unit, ShaderJob,
};
use crate::macros::{emit, expand_macros};
use crate::pipeline::{uniform_declarators, UniformType};
use crate::random::Random;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Probabilities {
    pub substitute_free_variable: u32,
    pub donate_dead_code_at_statement: u32,
    pub donate_live_code_at_statement: u32,
    pub inject_jump_at_statement: u32,
    pub wrap_statement_in_conditional: u32,
    pub mutate_point: u32,
    pub vectorize_statements: u32,
    pub split_loops: u32,
    pub structify: u32,
    pub outline: u32,
    pub add_live_frag_color_writes: u32,
    pub add_dead_frag_color_writes: u32,
    pub switchify: u32,
    pub inject_dead_barrier_at_statement: u32,
}

fn random_probability(random: &mut Random, min: u32, max: u32) -> u32 {
    random.next_int(max - min) + min
}

impl Probabilities {
    pub fn random_multi_pass(random: &mut Random) -> Self {
        Self {
            substitute_free_variable: random_probability(random, 0, 100),
            donate_dead_code_at_statement: random_probability(random, 2, 10),
            donate_live_code_at_statement: random_probability(random, 2, 10),
            inject_jump_at_statement: random_probability(random, 2, 15),
            wrap_statement_in_conditional: random_probability(random, 2, 15),
            mutate_point: random_probability(random, 2, 8),
            vectorize_statements: random_probability(random, 2, 30),
            split_loops: random_probability(random, 2, 15),
            structify: random_probability(random, 2, 8),
            outline: random_probability(random, 2, 15),
            add_live_frag_color_writes: random_probability(random, 2, 10),
            add_dead_frag_color_writes: random_probability(random, 2, 10),
            switchify: random_probability(random, 2, 10),
            inject_dead_barrier_at_statement: random_probability(random, 2, 20),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub struct GeneratorOptions {
    pub small: bool,
    pub max_uniforms: usize,
    pub add_injection_switch: bool,
    pub push_constant_probability: f32,
    pub min_nodes: u32,
    pub max_nodes: u32,
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
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Transformation {
    Identity,
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

fn apply_transformation(
    transformation: Transformation,
    unit: &mut TranslationUnit,
    stage: Stage,
    builtins: &mut Option<Arc<Builtins>>,
    probabilities: &Probabilities,
    params: GenerationParams,
    random: &mut Random,
) -> bool {
    match transformation {
        Transformation::Identity => {
            let analysis = analyze_shader(unit, stage, true, builtins.as_ref());
            if builtins.is_none() {
                *builtins = Some(Arc::clone(&analysis.builtins));
            }
            let Some(transformed) =
                identity::apply(unit, &analysis, probabilities.mutate_point, params, random)
            else {
                return false;
            };
            match parse_unit("variant", &emit(&transformed)) {
                Ok(reparsed) => {
                    *unit = reparsed;
                    true
                }
                Err(_) => false,
            }
        }
    }
}

pub fn transform_shader(
    unit: &mut TranslationUnit,
    stage: Stage,
    options: &GeneratorOptions,
    random: &mut Random,
) -> Vec<&'static str> {
    let fragment = stage == Stage::Fragment;
    let params = if options.small {
        GenerationParams::small(fragment)
    } else {
        GenerationParams::normal(fragment)
    };
    let probabilities = Probabilities::random_multi_pass(random);
    let mut candidates = vec![Transformation::Identity];
    let mut transformations = Vec::new();
    while !candidates.is_empty() {
        let index = random.next_index(candidates.len());
        let candidate = candidates.remove(index);
        if (candidates.is_empty() && transformations.is_empty()) || random.next_bool() {
            transformations.push(candidate);
        }
    }
    let mut applied = Vec::new();
    let mut next_round = Vec::new();
    let mut builtins = None;
    while !transformations.is_empty() && !shader_large_enough(unit, options, random) {
        let index = random.next_index(transformations.len());
        let transformation = transformations.remove(index);
        applied.push(match transformation {
            Transformation::Identity => identity::NAME,
        });
        let mut child = random.spawn_child();
        if apply_transformation(
            transformation,
            unit,
            stage,
            &mut builtins,
            &probabilities,
            params,
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
    let mut job = reference.clone();
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
        transform_shader(&mut shader.unit, stage, options, &mut child);
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
}

impl Default for FamilyOptions {
    fn default() -> Self {
        Self {
            variants: 10,
            max_bytes: 500_000,
            generator: GeneratorOptions::default(),
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
        match generate_variant(reference, &options.generator, &mut child) {
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
