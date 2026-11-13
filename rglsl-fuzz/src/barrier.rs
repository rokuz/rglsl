use rglsl_ast::Stalled;
use rglsl_ast::ast::TranslationUnit;

use crate::context::Context;
use crate::injection::{Edit, apply_edits, choose, injection_points};
use crate::jump::dead_conditional;
use crate::random::Random;
use crate::transformation::PassInput;

pub const NAME: &str = "add_dead_barrier";

pub fn apply(
    input: &PassInput<'_>,
    random: &mut Random,
) -> Result<Option<TranslationUnit>, Stalled> {
    if !input.params.compute() {
        return Ok(None);
    }
    let points = choose(
        injection_points(input.unit, input.analysis)?,
        input.probabilities.inject_dead_barrier_at_statement,
        random,
    );
    if points.is_empty() {
        return Ok(None);
    }
    let mut context = Context::new(input.unit, input.analysis, input.params);
    let mut edits = Vec::new();
    for point in &points {
        let call = context.builder.call("barrier", Vec::new());
        let statement = context.builder.expression_statement(call);
        let statement = dead_conditional(&mut context, random, point, statement);
        edits.push((point.location, Edit::Inject(statement)));
    }
    let mut result = input.unit.clone();
    apply_edits(&mut result, edits, &mut context.builder)?;
    Ok(Some(result))
}
