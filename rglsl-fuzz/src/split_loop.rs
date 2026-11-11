use std::collections::BTreeSet;

use rglsl_ast::ast::{
    BinaryOperator, Condition, DeclarationKind, Expression, ExpressionKind, Initializer, NodeId,
    NumericKind, PostfixOperator, Statement, StatementKind, TranslationUnit, UnaryOperator,
};
use rglsl_sema::Analysis;

use crate::basic::{INT, UINT};
use crate::build::Builder;
use crate::constants::SPLIT_LOOP_COUNTER_PREFIX;
use crate::injection::{
    apply_edits, choose, contains_top_level_break, injection_points, Edit, InjectionPoint,
};
use crate::random::Random;
use crate::rewrite::rewrite_statement_expressions;
use crate::scope::output_parameters;
use crate::transformation::PassInput;

pub const NAME: &str = "split_for_loop";

#[derive(Debug, Clone)]
struct LoopSplitInfo {
    counter: String,
    unsigned: bool,
    start: i64,
    end: i64,
    increasing: bool,
    references: BTreeSet<NodeId>,
}

fn root_variable(expression: &Expression) -> Option<&Expression> {
    match &expression.kind {
        ExpressionKind::Variable(_) => Some(expression),
        ExpressionKind::Parenthesized(inner)
        | ExpressionKind::Subscript { base: inner, .. }
        | ExpressionKind::FieldSelection { base: inner, .. } => root_variable(inner),
        _ => None,
    }
}

pub fn writes_symbol(
    statement: &Statement,
    analysis: &Analysis,
    symbol: rglsl_sema::scope::SymbolId,
) -> bool {
    let mut probe = statement.clone();
    let mut writes = false;
    let refers = |expression: &Expression| {
        root_variable(expression)
            .and_then(|root| analysis.references.get(&root.id))
            .is_some_and(|id| *id == symbol)
    };
    rewrite_statement_expressions(&mut probe, &mut |expression| match &expression.kind {
        ExpressionKind::Assignment { target, .. } => writes |= refers(target),
        ExpressionKind::Postfix { operand, .. } => writes |= refers(operand),
        ExpressionKind::Unary {
            operator: UnaryOperator::Increment | UnaryOperator::Decrement,
            operand,
        } => writes |= refers(operand),
        ExpressionKind::FunctionCall(call) => {
            let outputs = output_parameters(analysis, expression.id, call.arguments.len());
            for (argument, output) in call.arguments.iter().zip(outputs) {
                if output {
                    writes |= refers(argument);
                }
            }
        }
        _ => {}
    });
    writes
}

fn literal_value(expression: &Expression) -> Option<(i64, bool)> {
    let ExpressionKind::Number(literal) = &expression.kind else {
        return None;
    };
    let unsigned = match literal.kind {
        NumericKind::Int => false,
        NumericKind::Uint => true,
        _ => return None,
    };
    let digits = literal.digits();
    let value = if let Some(hex) = digits
        .strip_prefix("0x")
        .or_else(|| digits.strip_prefix("0X"))
    {
        i64::from_str_radix(hex, 16).ok()?
    } else if digits.len() > 1 && digits.starts_with('0') {
        i64::from_str_radix(digits, 8).ok()?
    } else {
        digits.parse().ok()?
    };
    (value <= i64::from(i32::MAX)).then_some((value, unsigned))
}

fn split_info(statement: &Statement, analysis: &Analysis) -> Option<LoopSplitInfo> {
    let StatementKind::For(for_statement) = &statement.kind else {
        return None;
    };
    if contains_top_level_break(&for_statement.body) {
        return None;
    }
    let StatementKind::Declaration(declaration) = &for_statement.init.kind else {
        return None;
    };
    let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
        return None;
    };
    let [declarator] = list.declarators.as_slice() else {
        return None;
    };
    if declarator.array.is_some() || list.ty.specifier.array.is_some() {
        return None;
    }
    let ty = crate::basic::from_specifier(&list.ty.specifier)?;
    if ty != INT && ty != UINT {
        return None;
    }
    let counter = declarator.name.node.clone();
    let Some(Initializer::Expression(initial)) = declarator.initializer.as_ref().map(|i| &i.node)
    else {
        return None;
    };
    let (start, start_unsigned) = literal_value(initial)?;
    if start_unsigned != (ty == UINT) {
        return None;
    }
    let increment = for_statement.increment.as_ref()?;
    let (operand, increasing) = match &increment.kind {
        ExpressionKind::Postfix { operand, operator } => {
            (operand, *operator == PostfixOperator::Increment)
        }
        ExpressionKind::Unary {
            operator: UnaryOperator::Increment,
            operand,
        } => (operand, true),
        ExpressionKind::Unary {
            operator: UnaryOperator::Decrement,
            operand,
        } => (operand, false),
        _ => return None,
    };
    if !matches!(&operand.kind, ExpressionKind::Variable(name) if *name == counter) {
        return None;
    }
    let Some(Condition::Expression(condition)) = &for_statement.condition else {
        return None;
    };
    let ExpressionKind::Binary {
        operator,
        left,
        right,
    } = &condition.kind
    else {
        return None;
    };
    let is_counter = |expression: &Expression| matches!(&expression.kind, ExpressionKind::Variable(name) if *name == counter);
    let (end, variable_first) = if is_counter(left) {
        (literal_value(right)?, true)
    } else if is_counter(right) {
        (literal_value(left)?, false)
    } else {
        return None;
    };
    if end.1 != start_unsigned {
        return None;
    }
    let end = end.0;
    use BinaryOperator::{Greater, GreaterEqual, Less, LessEqual, NotEqual};
    let consistent = match (increasing, variable_first) {
        (true, true) => start < end && matches!(operator, Less | LessEqual | NotEqual),
        (true, false) => start < end && matches!(operator, Greater | GreaterEqual | NotEqual),
        (false, true) => start > end && matches!(operator, Greater | GreaterEqual | NotEqual),
        (false, false) => start > end && matches!(operator, Less | LessEqual | NotEqual),
    };
    if !consistent {
        return None;
    }
    let symbol = *analysis.declarations.get(&declarator.id)?;
    if writes_symbol(&for_statement.body, analysis, symbol) {
        return None;
    }
    let mut references = BTreeSet::new();
    let mut probe = statement.clone();
    rewrite_statement_expressions(&mut probe, &mut |expression| {
        if analysis.references.get(&expression.id) == Some(&symbol) {
            references.insert(expression.id);
        }
    });
    Some(LoopSplitInfo {
        counter,
        unsigned: start_unsigned,
        start,
        end,
        increasing,
        references,
    })
}

fn literal(builder: &mut Builder, value: i64, unsigned: bool) -> Expression {
    if unsigned {
        builder.uint(value.unsigned_abs())
    } else {
        builder.int(value)
    }
}

fn renamed(statement: &Statement, info: &LoopSplitInfo, name: &str) -> Statement {
    let mut copy = statement.clone();
    rewrite_statement_expressions(&mut copy, &mut |expression| {
        if info.references.contains(&expression.id) {
            if let ExpressionKind::Variable(variable) = &mut expression.kind {
                name.clone_into(variable);
            }
        }
    });
    if let StatementKind::For(for_statement) = &mut copy.kind {
        if let StatementKind::Declaration(declaration) = &mut for_statement.init.kind {
            if let DeclarationKind::InitDeclaratorList(list) = &mut declaration.kind {
                for declarator in &mut list.declarators {
                    if declarator.name.node == info.counter {
                        name.clone_into(&mut declarator.name.node);
                    }
                }
            }
        }
    }
    copy
}

fn split(
    statement: Statement,
    info: &LoopSplitInfo,
    split_after: i64,
    mut builder: Builder,
) -> Statement {
    let name = format!("{SPLIT_LOOP_COUNTER_PREFIX}{}", info.counter);
    let direction = if info.increasing { 1 } else { -1 };
    let middle = info.start + direction * split_after;
    let mut first = renamed(&statement, info, &name);
    if let StatementKind::For(for_statement) = &mut first.kind {
        let counter = builder.variable(&name);
        let bound = literal(&mut builder, middle, info.unsigned);
        let operator = if info.increasing {
            BinaryOperator::Less
        } else {
            BinaryOperator::Greater
        };
        let test = builder.binary(operator, counter, bound);
        for_statement.condition = Some(Condition::Expression(test));
    }
    let mut second = renamed(&statement, info, &name);
    if let StatementKind::For(for_statement) = &mut second.kind {
        if let StatementKind::Declaration(declaration) = &mut for_statement.init.kind {
            if let DeclarationKind::InitDeclaratorList(list) = &mut declaration.kind {
                for declarator in &mut list.declarators {
                    let start = literal(&mut builder, middle, info.unsigned);
                    declarator.initializer = Some(rglsl_ast::ast::Spanned::new(
                        rglsl_ast::Span::new(0, 0),
                        Initializer::Expression(start),
                    ));
                }
            }
        }
    }
    builder.block(vec![first, second])
}

pub fn suitable(point: &InjectionPoint<'_>, analysis: &Analysis) -> bool {
    point
        .next
        .is_some_and(|next| split_info(next, analysis).is_some())
}

pub fn apply(input: &PassInput<'_>, random: &mut Random) -> Option<TranslationUnit> {
    let points: Vec<_> = injection_points(input.unit, input.analysis)
        .into_iter()
        .filter(|point| suitable(point, input.analysis))
        .collect();
    let points = choose(points, input.probabilities.split_loops, random);
    if points.is_empty() {
        return None;
    }
    let mut builder = Builder::new(input.unit.next_id());
    let mut edits = Vec::new();
    for point in &points {
        let Some(info) = point.next.and_then(|next| split_info(next, input.analysis)) else {
            continue;
        };
        let span = u32::try_from((info.start - info.end).unsigned_abs()).unwrap_or(0);
        let split_after = i64::from(random.next_int(span.saturating_add(1)));
        let reserved = builder.reserve(8);
        edits.push((
            point.location,
            Edit::Replace(Box::new(move |statement| {
                split(statement, &info, split_after, reserved)
            })),
        ));
    }
    let mut result = input.unit.clone();
    apply_edits(&mut result, edits, &mut builder);
    Some(result)
}
