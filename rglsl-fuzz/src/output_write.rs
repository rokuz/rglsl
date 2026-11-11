use std::collections::BTreeMap;

use rglsl_ast::ast::{BasicType, Statement, TranslationUnit};

use crate::basic::{self, BOOL, FLOAT};
use crate::constants::{GLF_OUT_VAR_BACKUP_PREFIX, GLF_WRAPPED_IF_TRUE};
use crate::context::Context;
use crate::fuzzer::random_constant;
use crate::injection::{apply_edits, choose, injection_points, Edit, InjectionPoint};
use crate::jump::dead_conditional;
use crate::random::Random;
use crate::transformation::PassInput;

pub const DEAD_NAME: &str = "add_dead_output_write";
pub const LIVE_NAME: &str = "add_live_output_write";

const GL_POSITION: &str = "gl_Position";
const GL_POINT_SIZE: &str = "gl_PointSize";

fn output_variables(
    point: &InjectionPoint<'_>,
    input: &PassInput<'_>,
) -> BTreeMap<String, BasicType> {
    let mut result = BTreeMap::new();
    if input.params.vertex() {
        result.insert(
            GL_POSITION.to_owned(),
            basic::vector(rglsl_ast::ast::ScalarType::Float, 4),
        );
        result.insert(GL_POINT_SIZE.to_owned(), FLOAT);
    }
    for variable in point.scope.iter() {
        if variable.output {
            if let Some(ty) = variable.ty {
                result.insert(variable.name.clone(), ty);
            } else {
                result.remove(&variable.name);
            }
        } else {
            result.remove(&variable.name);
        }
    }
    result
}

fn choose_output(
    outputs: &BTreeMap<String, BasicType>,
    random: &mut Random,
) -> Option<(String, BasicType)> {
    let index = random.next_index(outputs.len());
    outputs
        .iter()
        .nth(index)
        .map(|(name, ty)| (name.clone(), *ty))
}

pub fn apply(input: &PassInput<'_>, random: &mut Random, live: bool) -> Option<TranslationUnit> {
    let probability = if live {
        input.probabilities.add_live_frag_color_writes
    } else {
        input.probabilities.add_dead_frag_color_writes
    };
    let points: Vec<_> = injection_points(input.unit, input.analysis)
        .into_iter()
        .filter(|point| !output_variables(point, input).is_empty())
        .collect();
    let points = choose(points, probability, random);
    if points.is_empty() {
        return None;
    }
    let mut context = Context::new(input.unit, input.analysis, input.params);
    let mut edits = Vec::new();
    for point in &points {
        let outputs = output_variables(point, input);
        let Some((name, ty)) = choose_output(&outputs, random) else {
            continue;
        };
        let statement = if live {
            live_write(&mut context, random, point, &name, ty)
        } else {
            dead_write(&mut context, random, point, &name, ty)
        };
        edits.push((point.location, Edit::Inject(statement)));
    }
    let mut result = input.unit.clone();
    apply_edits(&mut result, edits, &mut context.builder);
    Some(result)
}

fn fuzzed(
    context: &mut Context<'_>,
    random: &mut Random,
    scope: &[crate::scope::Variable],
    ty: BasicType,
) -> rglsl_ast::ast::Expression {
    let fuzzer = context.fuzzer(scope);
    let mut builder = context.builder;
    let expression = fuzzer
        .fuzz_expression(random, &mut builder, ty, false, 0)
        .unwrap_or_else(|| random_constant(random, &mut builder, ty));
    context.builder = builder;
    expression
}

fn dead_write(
    context: &mut Context<'_>,
    random: &mut Random,
    point: &InjectionPoint<'_>,
    name: &str,
    ty: BasicType,
) -> Statement {
    let value = fuzzed(context, random, &point.scope, ty);
    let target = context.builder.variable(name);
    let assignment = context.builder.assign(target, value);
    let statement = context.builder.expression_statement(assignment);
    dead_conditional(context, random, point, statement)
}

fn live_write(
    context: &mut Context<'_>,
    random: &mut Random,
    point: &InjectionPoint<'_>,
    name: &str,
    ty: BasicType,
) -> Statement {
    let backup = format!("{GLF_OUT_VAR_BACKUP_PREFIX}{name}");
    let builder = &mut context.builder;
    let declaration = builder.declare(basic::specifier(ty), &backup, None);
    let backup_target = builder.variable(&backup);
    let output = builder.variable(name);
    let save = builder.assign(backup_target, output);
    let save = builder.expression_statement(save);
    let value = fuzzed(context, random, &[], ty);
    let builder = &mut context.builder;
    let output = builder.variable(name);
    let overwrite = builder.assign(output, value);
    let overwrite = builder.expression_statement(overwrite);
    let truth = context
        .opaque(random, &point.scope)
        .make_opaque_boolean(true, BOOL, false, 0);
    let builder = &mut context.builder;
    let condition = builder.call(GLF_WRAPPED_IF_TRUE, vec![truth]);
    let output = builder.variable(name);
    let backup_value = builder.variable(&backup);
    let restore = builder.assign(output, backup_value);
    let restore = builder.expression_statement(restore);
    let restore = builder.block(vec![restore]);
    let conditional = builder.if_statement(condition, restore, None);
    builder.block(vec![declaration, save, overwrite, conditional])
}
