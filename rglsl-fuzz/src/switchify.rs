use std::collections::BTreeSet;

use rglsl_ast::ast::{
    JumpStatement, Statement, StatementKind, TranslationUnit, TypeSpecifierNonArray,
};

use crate::basic::INT;
use crate::build::Builder;
use crate::constants::GLF_SWITCH;
use crate::context::Context;
use crate::injection::{
    apply_edits, choose, contains_top_level_break, declared_variables, injection_points, Edit,
    InjectionPoint,
};
use crate::random::Random;
use crate::scope::Variable;
use crate::statements::{ReturnType, StatementFuzzer};
use crate::transformation::PassInput;

pub const NAME: &str = "add_switch";

fn block_without_top_level_breaks(statement: &Statement) -> bool {
    matches!(statement.kind, StatementKind::Compound(_)) && !contains_top_level_break(statement)
}

pub fn suitable(point: &InjectionPoint<'_>) -> bool {
    let Some(next) = point.next else {
        return false;
    };
    match &next.kind {
        StatementKind::Compound(_) => block_without_top_level_breaks(next),
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            block_without_top_level_breaks(then_branch)
                || else_branch
                    .as_deref()
                    .is_some_and(block_without_top_level_breaks)
        }
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
            block_without_top_level_breaks(body)
        }
        StatementKind::For(for_statement) => block_without_top_level_breaks(&for_statement.body),
        _ => false,
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Target {
    Whole,
    Then,
    Else,
    Body,
}

struct Content {
    target: Target,
    before: Vec<Statement>,
    labels: Vec<Vec<Statement>>,
    after: Vec<Statement>,
    selector: rglsl_ast::ast::Expression,
    builder: Builder,
}

fn statements_of(statement: &Statement) -> &[Statement] {
    match &statement.kind {
        StatementKind::Compound(compound) => &compound.statements,
        _ => &[],
    }
}

fn next_switch_id(unit: &TranslationUnit) -> u32 {
    let prefix = format!("{GLF_SWITCH}_");
    let mut next = 0;
    for expression in rglsl_ast::expressions(unit) {
        if let rglsl_ast::ast::ExpressionKind::Variable(name) = &expression.kind {
            if let Some(rest) = name.strip_prefix(&prefix) {
                let digits: String = rest.chars().take_while(char::is_ascii_digit).collect();
                if let Ok(id) = digits.parse::<u32>() {
                    next = next.max(id + 1);
                }
            }
        }
    }
    next
}

fn return_type(point: &InjectionPoint<'_>) -> ReturnType {
    let specifier = &point.function.prototype.return_type.specifier;
    if specifier.array.is_some() {
        return ReturnType::Other;
    }
    match &specifier.non_array {
        TypeSpecifierNonArray::Void => ReturnType::Void,
        TypeSpecifierNonArray::Basic(_) => {
            crate::basic::from_specifier(specifier).map_or(ReturnType::Other, ReturnType::Basic)
        }
        _ => ReturnType::Other,
    }
}

fn case_label(used: &mut BTreeSet<u32>, random: &mut Random) -> u32 {
    loop {
        let label = random.next_positive_int(100);
        if used.insert(label) {
            return label;
        }
    }
}

pub fn apply(input: &PassInput<'_>, random: &mut Random) -> Option<TranslationUnit> {
    let points: Vec<_> = injection_points(input.unit, input.analysis)
        .into_iter()
        .filter(suitable)
        .collect();
    let points = choose(points, input.probabilities.switchify, random);
    if points.is_empty() {
        return None;
    }
    let mut context = Context::new(input.unit, input.analysis, input.params);
    let mut next_id = next_switch_id(input.unit);
    let mut edits = Vec::new();
    for point in &points {
        let Some(next) = point.next else {
            continue;
        };
        let mut targets = Vec::new();
        let mut for_scope = Vec::new();
        match &next.kind {
            StatementKind::Compound(_) => targets.push((Target::Whole, next)),
            StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
                targets.push((Target::Body, &**body));
            }
            StatementKind::For(for_statement) => {
                if let StatementKind::Declaration(declaration) = &for_statement.init.kind {
                    for_scope = declared_variables(input.analysis, declaration);
                }
                targets.push((Target::Body, &for_statement.body));
            }
            StatementKind::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                let then_ok = block_without_top_level_breaks(then_branch);
                let else_ok = else_branch
                    .as_deref()
                    .is_some_and(block_without_top_level_breaks);
                match (then_ok, else_branch.as_deref()) {
                    (true, Some(else_branch)) if else_ok => loop {
                        if random.next_bool() {
                            targets.push((Target::Then, &**then_branch));
                        }
                        if random.next_bool() {
                            targets.push((Target::Else, else_branch));
                        }
                        if !targets.is_empty() {
                            break;
                        }
                    },
                    (true, _) => targets.push((Target::Then, &**then_branch)),
                    (false, Some(else_branch)) => targets.push((Target::Else, else_branch)),
                    (false, None) => {}
                }
            }
            _ => {}
        }
        let mut contents = Vec::new();
        for (target, block) in targets {
            let statements = statements_of(block);
            if statements.is_empty() {
                continue;
            }
            let mut scope: Vec<Variable> = point.scope.to_vec();
            for variable in &for_scope {
                scope.retain(|existing| existing.name != variable.name);
                scope.push(variable.clone());
            }
            contents.push(switch_content(
                &mut context,
                random,
                point,
                &scope,
                target,
                statements,
                &mut next_id,
            ));
        }
        if contents.is_empty() {
            continue;
        }
        edits.push((
            point.location,
            Edit::Replace(Box::new(move |statement| {
                let mut statement = statement;
                for content in contents {
                    statement = switchify(statement, content);
                }
                statement
            })),
        ));
    }
    if edits.is_empty() {
        return None;
    }
    let mut result = input.unit.clone();
    apply_edits(&mut result, edits, &mut context.builder);
    Some(result)
}

fn switch_content(
    context: &mut Context<'_>,
    random: &mut Random,
    point: &InjectionPoint<'_>,
    scope: &[Variable],
    target: Target,
    statements: &[Statement],
    next_id: &mut u32,
) -> Content {
    let params = context.params;
    let before_count = random.next_int(params.max_switch_cases_before);
    let during_count = random.next_int(params.max_switch_cases_during);
    let after_count = random.next_int(params.max_switch_cases_after);
    let prefix = format!("{GLF_SWITCH}_{next_id}");
    *next_id += 1;
    let mut used = BTreeSet::new();
    let mut fuzzer = StatementFuzzer::new(
        &context.templates,
        params,
        scope,
        prefix,
        return_type(point),
    );
    let mut before = Vec::new();
    for _ in 0..before_count {
        let label = case_label(&mut used, random);
        before.push(context.builder.case(i64::from(label)));
        before.push(fuzzer.fuzz_statement(random, &mut context.builder));
    }
    let mut labels: Vec<Vec<u32>> = vec![Vec::new(); statements.len()];
    if let Some(first) = labels.first_mut() {
        first.push(0);
    }
    for _ in 0..during_count {
        let index = random.next_index(statements.len());
        let label = case_label(&mut used, random);
        if let Some(slot) = labels.get_mut(index) {
            slot.push(label);
        }
    }
    for statement in statements {
        if let StatementKind::Declaration(declaration) = &statement.kind {
            for variable in declared_variables(context.analysis, declaration) {
                fuzzer.add_variable(variable);
            }
        }
    }
    let mut after = Vec::new();
    for _ in 0..after_count {
        let label = case_label(&mut used, random);
        after.push(context.builder.case(i64::from(label)));
        after.push(fuzzer.fuzz_statement(random, &mut context.builder));
    }
    let default = context.builder.default_label();
    after.push(default);
    let one = context.builder.int(1);
    let one = context.builder.expression_statement(one);
    after.push(one);
    let labels = labels
        .into_iter()
        .map(|set| {
            set.into_iter()
                .map(|label| context.builder.case(i64::from(label)))
                .collect()
        })
        .collect();
    let zero = context
        .opaque(random, scope)
        .make_opaque_zero(INT, false, 0);
    let selector = context.builder.call(GLF_SWITCH, vec![zero]);
    let builder = context.builder.reserve(4);
    Content {
        target,
        before,
        labels,
        after,
        selector,
        builder,
    }
}

fn switchify(statement: Statement, content: Content) -> Statement {
    let mut statement = statement;
    let block = match (&mut statement.kind, content.target) {
        (StatementKind::Compound(_), Target::Whole) => Some(&mut statement),
        (StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. }, Target::Body) => {
            Some(&mut **body)
        }
        (StatementKind::For(for_statement), Target::Body) => Some(&mut for_statement.body),
        (StatementKind::Selection { then_branch, .. }, Target::Then) => Some(&mut **then_branch),
        (
            StatementKind::Selection {
                else_branch: Some(else_branch),
                ..
            },
            Target::Else,
        ) => Some(&mut **else_branch),
        _ => None,
    };
    let Some(block) = block else {
        return statement;
    };
    let StatementKind::Compound(compound) = &mut block.kind else {
        return statement;
    };
    let original = core::mem::take(&mut compound.statements);
    let mut builder = content.builder;
    let mut body = content.before;
    let mut labels = content.labels.into_iter();
    for inner in original {
        body.extend(labels.next().unwrap_or_default());
        body.push(inner);
    }
    body.push(builder.jump(JumpStatement::Break));
    body.extend(content.after);
    compound.statements = vec![builder.switch(content.selector, body)];
    statement
}
