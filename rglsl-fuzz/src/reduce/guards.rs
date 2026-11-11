use rglsl_ast::ast::{
    BinaryOperator, Condition, DeclarationKind, Expression, ExpressionKind, ExternalDeclaration,
    Initializer, PostfixOperator, Spanned, Statement, StatementKind, TranslationUnit,
};
use rglsl_ast::Span;
use rglsl_sema::Stage;

use crate::basic;
use crate::build::Builder;
use crate::constants::{GLF_GLOBAL_LOOP_BOUND, GLF_GLOBAL_LOOP_COUNT};
use crate::donate::in_bounds;
use crate::fuzzer::literal_zero_or_one;
use crate::generate::analyze_shader;
use crate::job::parse_unit;
use crate::macros::emit;
use crate::rewrite::rewrite_statements;

const MAX_INITIALISED_ARRAY: u32 = 1024;

fn counted(body: &Statement) -> bool {
    let StatementKind::Compound(compound) = &body.kind else {
        return false;
    };
    compound.statements.first().is_some_and(|first| match &first.kind {
        StatementKind::Expression(Some(expression)) => matches!(
            &expression.kind,
            ExpressionKind::Postfix { operand, .. }
                if matches!(&operand.kind, ExpressionKind::Variable(name) if name == GLF_GLOBAL_LOOP_COUNT)
        ),
        _ => false,
    })
}

fn bounded(builder: &mut Builder, condition: Option<Expression>) -> Expression {
    let count = builder.variable(GLF_GLOBAL_LOOP_COUNT);
    let bound = builder.variable(GLF_GLOBAL_LOOP_BOUND);
    let test = builder.binary(BinaryOperator::Less, count, bound);
    match condition {
        Some(condition) => {
            let condition = builder.paren(condition);
            let test = builder.paren(test);
            builder.binary(BinaryOperator::LogicalAnd, condition, test)
        }
        None => test,
    }
}

fn count_in(builder: &mut Builder, body: &mut Statement) {
    let count = builder.variable(GLF_GLOBAL_LOOP_COUNT);
    let increment = builder.postfix(count, PostfixOperator::Increment);
    let increment = builder.expression_statement(increment);
    let placeholder = builder.null_statement();
    let original = core::mem::replace(body, placeholder);
    *body = builder.block(vec![increment, original]);
}

fn truncate_loops(unit: &mut TranslationUnit, builder: &mut Builder) -> bool {
    let mut any = false;
    rewrite_statements(unit, &mut |statement| match &mut statement.kind {
        StatementKind::While {
            condition: Condition::Expression(condition),
            body,
        } => {
            if counted(body) {
                return;
            }
            let original = crate::rewrite::take_expression(condition);
            *condition = bounded(builder, Some(original));
            count_in(builder, body);
            any = true;
        }
        StatementKind::DoWhile { body, condition } => {
            if counted(body) {
                return;
            }
            let original = crate::rewrite::take_expression(condition);
            *condition = bounded(builder, Some(original));
            count_in(builder, body);
            any = true;
        }
        StatementKind::For(for_statement) => {
            if counted(&for_statement.body) {
                return;
            }
            match &mut for_statement.condition {
                Some(Condition::Expression(condition)) => {
                    let original = crate::rewrite::take_expression(condition);
                    *condition = bounded(builder, Some(original));
                }
                Some(Condition::Declaration(_)) => return,
                None => {
                    for_statement.condition = Some(Condition::Expression(bounded(builder, None)));
                }
            }
            count_in(builder, &mut for_statement.body);
            any = true;
        }
        _ => {}
    });
    any
}

fn initialise(unit: &mut TranslationUnit, builder: &mut Builder) {
    rewrite_statements(unit, &mut |statement| {
        let StatementKind::Declaration(declaration) = &mut statement.kind else {
            return;
        };
        let DeclarationKind::InitDeclaratorList(list) = &mut declaration.kind else {
            return;
        };
        if list.ty.qualifier.is_some() {
            return;
        }
        let Some(ty) = basic::from_specifier(&list.ty.specifier) else {
            return;
        };
        for declarator in &mut list.declarators {
            if declarator.initializer.is_some() {
                continue;
            }
            let value = match &declarator.array {
                None => literal_zero_or_one(builder, true, ty),
                Some(array) => {
                    let [dimension] = array.dimensions.as_slice() else {
                        continue;
                    };
                    let rglsl_ast::ast::ArrayDimension::Sized(size) = &dimension.node else {
                        continue;
                    };
                    let ExpressionKind::Number(literal) = &size.kind else {
                        continue;
                    };
                    let Ok(count) = literal.digits().parse::<u32>() else {
                        continue;
                    };
                    if count > MAX_INITIALISED_ARRAY {
                        continue;
                    }
                    let elements = (0..count)
                        .map(|_| literal_zero_or_one(builder, true, ty))
                        .collect();
                    let mut specifier = basic::specifier(ty);
                    specifier.array = Some(array.clone());
                    builder.construct_specifier(specifier, elements)
                }
            };
            declarator.initializer = Some(Spanned::new(
                Span::new(0, 0),
                Initializer::Expression(value),
            ));
        }
    });
}

fn declares_counter(unit: &TranslationUnit) -> bool {
    unit.external_declarations
        .iter()
        .any(|external| match external {
            ExternalDeclaration::Declaration(declaration) => {
                crate::injection::declared_names(declaration)
                    .iter()
                    .any(|name| name == GLF_GLOBAL_LOOP_COUNT)
            }
            _ => false,
        })
}

pub fn add_guards(unit: &TranslationUnit, stage: Stage, bound: u32) -> Option<TranslationUnit> {
    let analysis = analyze_shader(unit, stage, true, None);
    let mut result = in_bounds(unit, &analysis);
    let mut builder = Builder::new(result.next_id());
    let looped = truncate_loops(&mut result, &mut builder);
    initialise(&mut result, &mut builder);
    if looped && !declares_counter(&result) {
        let declarations = parse_unit(
            "guards",
            &format!(
                "const int {GLF_GLOBAL_LOOP_BOUND} = {bound};\nint {GLF_GLOBAL_LOOP_COUNT} = 0;\n"
            ),
        )
        .ok()?;
        let position = result
            .external_declarations
            .iter()
            .position(|external| match external {
                ExternalDeclaration::Directive(_) => false,
                ExternalDeclaration::Declaration(declaration) => {
                    !matches!(declaration.kind, DeclarationKind::Precision { .. })
                }
                _ => true,
            })
            .unwrap_or(result.external_declarations.len());
        let tail = result.external_declarations.split_off(position);
        result
            .external_declarations
            .extend(declarations.external_declarations);
        result.external_declarations.extend(tail);
    }
    parse_unit("guards", &emit(&result)).ok()
}
