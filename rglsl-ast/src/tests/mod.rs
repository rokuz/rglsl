mod declarations;
mod errors;
mod expressions;
mod extensions;
mod robustness;
mod statements;
mod strings;

use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

use crate::ast::{
    Declaration, Expression, ExpressionKind, ExternalDeclaration, FunctionIdentifier, Statement,
    StatementKind, TranslationUnit,
};
use crate::{parse, print};

fn unit(source: &str) -> TranslationUnit {
    match parse(source) {
        Ok(unit) => unit,
        Err(error) => panic!("{error}\n{source}"),
    }
}

fn round_trip(source: &str) -> String {
    let first = unit(source);
    let printed = print(&first);
    let second = unit(&printed);
    assert_eq!(first, second, "{printed}");
    assert_eq!(printed, print(&second));
    printed
}

fn body_of(source: &str) -> Vec<Statement> {
    let parsed = unit(source);
    match parsed.external_declarations.last() {
        Some(ExternalDeclaration::FunctionDefinition(definition)) => {
            definition.body.statements.clone()
        }
        other => panic!("expected a function definition, found {other:?}"),
    }
}

fn statements(body: &str) -> Vec<Statement> {
    let source = format!("void f() {{\n{body}\n}}\n");
    round_trip(&source);
    body_of(&source)
}

fn statement(body: &str) -> Statement {
    let mut parsed = statements(body);
    assert_eq!(parsed.len(), 1, "{body}");
    parsed.remove(0)
}

fn expression(text: &str) -> Expression {
    match statement(&format!("{text};")).kind {
        StatementKind::Expression(Some(expression)) => expression,
        other => panic!("expected an expression statement, found {other:?}"),
    }
}

fn declaration(source: &str) -> Declaration {
    round_trip(source);
    let mut parsed = unit(source);
    assert_eq!(parsed.external_declarations.len(), 1, "{source}");
    match parsed.external_declarations.remove(0) {
        ExternalDeclaration::Declaration(declaration) => declaration,
        other => panic!("expected a declaration, found {other:?}"),
    }
}

fn shape(expression: &Expression) -> String {
    let join =
        |expressions: &[Expression]| expressions.iter().map(shape).collect::<Vec<_>>().join(" ");
    match &expression.kind {
        ExpressionKind::Variable(name) => name.clone(),
        ExpressionKind::Number(literal) => literal.text.clone(),
        ExpressionKind::Bool(value) => format!("{value}"),
        ExpressionKind::String(value) => format!("{value:?}"),
        ExpressionKind::Parenthesized(inner) => format!("(paren {})", shape(inner)),
        ExpressionKind::Subscript { base, index } => {
            format!("(index {} {})", shape(base), shape(index))
        }
        ExpressionKind::FunctionCall(call) => match &call.function.node {
            FunctionIdentifier::Constructor(_) => {
                format!("(construct {})", join(&call.arguments))
            }
            FunctionIdentifier::Cast(_) => {
                format!("(cast {})", join(&call.arguments))
            }
            FunctionIdentifier::Function(name) => {
                format!("(call {name} {})", join(&call.arguments))
            }
            FunctionIdentifier::Expression(callee) => {
                format!("(apply {} {})", shape(callee), join(&call.arguments))
            }
            FunctionIdentifier::Method { object, name } => {
                format!(
                    "(method {} {} {})",
                    shape(object),
                    name.node,
                    join(&call.arguments)
                )
            }
        },
        ExpressionKind::FieldSelection { base, field } => {
            format!("(field {} {})", shape(base), field.node)
        }
        ExpressionKind::Postfix { operand, operator } => {
            format!("(post{} {})", operator.symbol(), shape(operand))
        }
        ExpressionKind::Unary { operator, operand } => {
            format!("(pre{} {})", operator.symbol(), shape(operand))
        }
        ExpressionKind::Binary {
            operator,
            left,
            right,
        } => format!("({} {} {})", operator.symbol(), shape(left), shape(right)),
        ExpressionKind::Conditional {
            condition,
            then_expression,
            else_expression,
        } => format!(
            "(? {} {} {})",
            shape(condition),
            shape(then_expression),
            shape(else_expression)
        ),
        ExpressionKind::Assignment {
            operator,
            target,
            value,
        } => format!("({} {} {})", operator.symbol(), shape(target), shape(value)),
        ExpressionKind::Sequence(expressions) => format!("(, {})", join(expressions)),
    }
}

fn shape_of(text: &str) -> String {
    shape(&expression(text))
}
