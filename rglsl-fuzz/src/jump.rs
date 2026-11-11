use rglsl_ast::ast::{JumpStatement, Statement, TranslationUnit, TypeSpecifierNonArray};

use crate::build::Builder;
use crate::context::Context;
use crate::injection::{apply_edits, choose, injection_points, Edit, InjectionPoint};
use crate::random::Random;
use crate::structs::{canonical_constant, global_structs, Structs};
use crate::transformation::PassInput;

pub const NAME: &str = "add_jump";

pub fn apply(input: &PassInput<'_>, random: &mut Random) -> Option<TranslationUnit> {
    let points = choose(
        injection_points(input.unit, input.analysis),
        input.probabilities.inject_jump_at_statement,
        random,
    );
    if points.is_empty() {
        return None;
    }
    let structs = global_structs(input.unit);
    let mut context = Context::new(input.unit, input.analysis, input.params);
    let mut edits = Vec::new();
    for point in &points {
        let jump = if point.in_loop {
            let kinds = if input.params.fragment { 4 } else { 3 };
            match random.next_int(kinds) {
                0 => context.builder.jump(JumpStatement::Break),
                1 => context.builder.jump(JumpStatement::Continue),
                2 => return_statement(point, &structs, &mut context.builder),
                _ => context.builder.jump(JumpStatement::Discard),
            }
        } else {
            return_statement(point, &structs, &mut context.builder)
        };
        let statement = dead_conditional(&mut context, random, point, jump);
        edits.push((point.location, Edit::Inject(statement)));
    }
    let mut result = input.unit.clone();
    apply_edits(&mut result, edits, &mut context.builder);
    Some(result)
}

pub fn dead_conditional(
    context: &mut Context<'_>,
    random: &mut Random,
    point: &InjectionPoint<'_>,
    then_branch: Statement,
) -> Statement {
    let condition = context.opaque(random, &point.scope).make_dead_condition();
    let then_branch = match then_branch.kind {
        rglsl_ast::ast::StatementKind::Compound(_) => then_branch,
        _ => context.builder.block(vec![then_branch]),
    };
    context.builder.if_statement(condition, then_branch, None)
}

fn return_statement(
    point: &InjectionPoint<'_>,
    structs: &Structs,
    builder: &mut Builder,
) -> Statement {
    let specifier = &point.function.prototype.return_type.specifier;
    if specifier.non_array == TypeSpecifierNonArray::Void && specifier.array.is_none() {
        return builder.jump(JumpStatement::Return(None));
    }
    match canonical_constant(specifier, structs, builder) {
        Some(value) => builder.jump(JumpStatement::Return(Some(value))),
        None => builder.block(Vec::new()),
    }
}
