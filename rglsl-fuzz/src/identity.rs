use std::collections::{BTreeMap, BTreeSet};

use rglsl_ast::ast::TranslationUnit;
use rglsl_sema::Analysis;

use crate::basic;
use crate::build::Builder;
use crate::constants::{GL_FRAG_COORD, INJECTION_SWITCH};
use crate::fuzzer::{Fuzzer, GenerationParams, Templates};
use crate::opaque::OpaqueGenerator;
use crate::random::Random;
use crate::rewrite::{rewrite_expressions, take_expression};
use crate::scope::{find_points, function_names, Point};

pub const NAME: &str = "identity";

pub fn hidden_names(unit: &TranslationUnit, analysis: &Analysis) -> BTreeSet<String> {
    let mut hidden = function_names(unit);
    hidden.extend(analysis.symbols.iter().map(|symbol| symbol.name.clone()));
    hidden
}

pub fn apply(
    unit: &TranslationUnit,
    analysis: &Analysis,
    probability: u32,
    params: GenerationParams,
    random: &mut Random,
) -> Option<TranslationUnit> {
    let points = find_points(unit, analysis);
    let chosen: BTreeMap<_, Point> = points
        .into_iter()
        .filter(|_| random.next_int(100) < probability)
        .map(|point| (point.id, point))
        .collect();
    if chosen.is_empty() {
        return None;
    }
    let hidden = hidden_names(unit, analysis);
    let templates = Templates::new(&analysis.builtins, &hidden);
    let mut builder = Builder::new(unit.next_id());
    let mut result = unit.clone();
    rewrite_expressions(&mut result, &mut |expression| {
        let Some(point) = chosen.get(&expression.id) else {
            return;
        };
        let injection_switch = point
            .scope
            .iter()
            .any(|variable| variable.name == INJECTION_SWITCH && variable.ty == Some(basic::VEC2));
        let frag_coord = params.fragment
            && !point
                .scope
                .iter()
                .any(|variable| variable.name == GL_FRAG_COORD);
        let original = take_expression(expression);
        let mut generator = OpaqueGenerator {
            random,
            builder: &mut builder,
            fuzzer: Fuzzer::new(&templates, &point.scope, params),
            builtins: &analysis.builtins,
            hidden: &hidden,
            injection_switch,
            frag_coord,
        };
        *expression =
            generator.apply_identity_function(original, point.ty, point.constant_context, 0);
    });
    Some(TranslationUnit::new(
        result.external_declarations,
        builder.next_id(),
    ))
}
