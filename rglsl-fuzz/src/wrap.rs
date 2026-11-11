use rglsl_ast::ast::{BinaryOperator, PostfixOperator, Statement, StatementKind, TranslationUnit};

use crate::basic::{self, BOOL, INT};
use crate::constants::{
    GLF_WRAPPED_IF_FALSE, GLF_WRAPPED_IF_TRUE, GLF_WRAPPED_LOOP, INJECTED_LOOP_COUNTER,
};
use crate::context::Context;
use crate::injection::{
    apply_edits, choose, contains_top_level_break, contains_top_level_continue, injection_points,
    Edit, InjectionPoint,
};
use crate::random::Random;
use crate::transformation::PassInput;

pub const NAME: &str = "add_wrapping_conditional";

pub fn suitable(point: &InjectionPoint<'_>) -> bool {
    let Some(next) = point.next else {
        return false;
    };
    !matches!(
        next.kind,
        StatementKind::Declaration(_) | StatementKind::CaseLabel(_)
    ) && !contains_top_level_break(next)
        && !contains_top_level_continue(next)
}

enum Wrapper {
    IfTrue(rglsl_ast::ast::Expression),
    IfFalse(rglsl_ast::ast::Expression),
    For {
        init: Statement,
        condition: rglsl_ast::ast::Expression,
        increment: rglsl_ast::ast::Expression,
    },
    DoWhile(rglsl_ast::ast::Expression),
}

pub fn apply(input: &PassInput<'_>, random: &mut Random) -> Option<TranslationUnit> {
    let points: Vec<_> = injection_points(input.unit, input.analysis)
        .into_iter()
        .filter(suitable)
        .collect();
    let points = choose(
        points,
        input.probabilities.wrap_statement_in_conditional,
        random,
    );
    if points.is_empty() {
        return None;
    }
    let mut context = Context::new(input.unit, input.analysis, input.params);
    let mut edits = Vec::new();
    for point in &points {
        let wrapper = make_wrapper(&mut context, random, point);
        let mut builder = context.builder.reserve(4);
        let replace = move |statement: Statement| {
            let body = match statement.kind {
                StatementKind::Compound(_) => statement,
                _ => builder.block(vec![statement]),
            };
            match wrapper {
                Wrapper::IfTrue(condition) => {
                    let empty = builder.block(Vec::new());
                    builder.if_statement(condition, body, Some(empty))
                }
                Wrapper::IfFalse(condition) => {
                    let empty = builder.block(Vec::new());
                    builder.if_statement(condition, empty, Some(body))
                }
                Wrapper::For {
                    init,
                    condition,
                    increment,
                } => builder.for_statement(init, Some(condition), Some(increment), body),
                Wrapper::DoWhile(condition) => builder.do_while(body, condition),
            }
        };
        edits.push((point.location, Edit::Replace(Box::new(replace))));
    }
    let mut result = input.unit.clone();
    apply_edits(&mut result, edits, &mut context.builder);
    Some(result)
}

fn make_wrapper(
    context: &mut Context<'_>,
    random: &mut Random,
    point: &InjectionPoint<'_>,
) -> Wrapper {
    match random.next_int(4) {
        0 => {
            let value = context
                .opaque(random, &point.scope)
                .make_opaque_boolean(true, BOOL, false, 0);
            Wrapper::IfTrue(context.builder.call(GLF_WRAPPED_IF_TRUE, vec![value]))
        }
        1 => {
            let value = context
                .opaque(random, &point.scope)
                .make_opaque_boolean(false, BOOL, false, 0);
            Wrapper::IfFalse(context.builder.call(GLF_WRAPPED_IF_FALSE, vec![value]))
        }
        2 => {
            let up = random.next_bool();
            let start = context
                .opaque(random, &point.scope)
                .make_opaque_zero_or_one(up, INT, false, 0);
            let init =
                context
                    .builder
                    .declare(basic::specifier(INT), INJECTED_LOOP_COUNTER, Some(start));
            let end = context
                .opaque(random, &point.scope)
                .make_opaque_zero_or_one(!up, INT, false, 0);
            let operator = if random.next_bool() {
                if up {
                    BinaryOperator::Less
                } else {
                    BinaryOperator::Greater
                }
            } else {
                BinaryOperator::NotEqual
            };
            let counter = context.builder.variable(INJECTED_LOOP_COUNTER);
            let test = context.builder.binary(operator, counter, end);
            let condition = context.builder.call(GLF_WRAPPED_LOOP, vec![test]);
            let counter = context.builder.variable(INJECTED_LOOP_COUNTER);
            let increment = context.builder.postfix(
                counter,
                if up {
                    PostfixOperator::Increment
                } else {
                    PostfixOperator::Decrement
                },
            );
            Wrapper::For {
                init,
                condition,
                increment,
            }
        }
        _ => {
            let value = context
                .opaque(random, &point.scope)
                .make_opaque_boolean(false, BOOL, false, 0);
            Wrapper::DoWhile(context.builder.call(GLF_WRAPPED_LOOP, vec![value]))
        }
    }
}
