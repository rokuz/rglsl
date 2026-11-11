use rglsl_ast::ast::{
    BinaryOperator, Expression, ExpressionKind, FunctionIdentifier, TranslationUnit,
};
use rglsl_ast::{expressions, parse, print, ParseError};

use crate::build::Builder;
use crate::constants::{
    END_OF_GENERATED_HEADER, GLF_DEAD, GLF_FALSE, GLF_FUZZED, GLF_IDENTITY, GLF_MAKE_IN_BOUNDS_INT,
    GLF_MAKE_IN_BOUNDS_UINT, GLF_ONE, GLF_SWITCH, GLF_TRUE, GLF_WRAPPED_IF_FALSE,
    GLF_WRAPPED_IF_TRUE, GLF_WRAPPED_LOOP, GLF_ZERO,
};
use crate::rewrite::{rewrite_expressions, take_expression};

const RECORDING_MACROS: [&str; 5] = [GLF_ZERO, GLF_ONE, GLF_FALSE, GLF_TRUE, GLF_IDENTITY];
const VALUE_MACROS: [&str; 2] = [GLF_DEAD, GLF_FUZZED];
const BARE_MACROS: [&str; 4] = [
    GLF_WRAPPED_LOOP,
    GLF_WRAPPED_IF_TRUE,
    GLF_WRAPPED_IF_FALSE,
    GLF_SWITCH,
];

pub fn macro_name(expression: &Expression) -> Option<&str> {
    let ExpressionKind::FunctionCall(call) = &expression.kind else {
        return None;
    };
    let FunctionIdentifier::Function(name) = &call.function.node else {
        return None;
    };
    is_macro(name).then_some(name.as_str())
}

pub fn is_macro(name: &str) -> bool {
    RECORDING_MACROS.contains(&name)
        || VALUE_MACROS.contains(&name)
        || BARE_MACROS.contains(&name)
        || name == GLF_MAKE_IN_BOUNDS_INT
        || name == GLF_MAKE_IN_BOUNDS_UINT
}

pub fn uses_macros(unit: &TranslationUnit) -> bool {
    expressions(unit)
        .into_iter()
        .any(|expression| macro_name(expression).is_some())
}

pub fn header() -> String {
    let mut header = String::from("\n#ifndef REDUCER\n");
    let defines: [(&str, &str, &str); 11] = [
        (GLF_ZERO, "(X, Y)", "(Y)"),
        (GLF_ONE, "(X, Y)", "(Y)"),
        (GLF_FALSE, "(X, Y)", "(Y)"),
        (GLF_TRUE, "(X, Y)", "(Y)"),
        (GLF_IDENTITY, "(X, Y)", "(Y)"),
        (GLF_DEAD, "(X)", "(X)"),
        (GLF_FUZZED, "(X)", "(X)"),
        (GLF_WRAPPED_LOOP, "(X)", "X"),
        (GLF_WRAPPED_IF_TRUE, "(X)", "X"),
        (GLF_WRAPPED_IF_FALSE, "(X)", "X"),
        (GLF_SWITCH, "(X)", "X"),
    ];
    for (name, parameters, body) in defines {
        let head = format!("{name}{parameters}");
        header.push_str(&format!("#define {head:<34}{body}\n"));
    }
    header.push_str(&format!(
        "#define {GLF_MAKE_IN_BOUNDS_INT}(IDX, SZ)  clamp(IDX, 0, SZ - 1)\n"
    ));
    header.push_str(&format!(
        "#define {GLF_MAKE_IN_BOUNDS_UINT}(IDX, SZ) clamp(IDX, 0u, SZ - 1u)\n"
    ));
    header.push_str("#endif\n\n");
    header.push_str(END_OF_GENERATED_HEADER);
    header.push('\n');
    header
}

fn is_version_line(line: &str) -> bool {
    let trimmed = line.trim_start();
    trimmed
        .strip_prefix('#')
        .is_some_and(|rest| rest.trim_start().starts_with("version"))
}

pub fn emit(unit: &TranslationUnit) -> String {
    let printed = print(unit);
    if !uses_macros(unit) {
        return printed;
    }
    let mut output = String::with_capacity(printed.len() + 1024);
    let mut lines = printed.split_inclusive('\n').peekable();
    if let Some(first) = lines.peek() {
        if is_version_line(first) {
            output.push_str(first);
            lines.next();
        }
    }
    output.push_str(&header());
    for line in lines {
        output.push_str(line);
    }
    output
}

pub fn strip_header(source: &str) -> String {
    let has_header = source
        .lines()
        .any(|line| line.trim().starts_with(END_OF_GENERATED_HEADER));
    if !has_header {
        return source.to_owned();
    }
    let mut output = String::with_capacity(source.len());
    let mut passed = false;
    for line in source.lines() {
        if passed || is_version_line(line) {
            output.push_str(line);
            output.push('\n');
        } else if line.trim().starts_with(END_OF_GENERATED_HEADER) {
            passed = true;
        }
    }
    output
}

pub fn parse_shader(source: &str) -> Result<TranslationUnit, ParseError> {
    parse(&strip_header(source))
}

pub fn expand_macros(unit: &TranslationUnit) -> TranslationUnit {
    let mut expanded = unit.clone();
    let mut builder = Builder::new(expanded.next_id());
    rewrite_expressions(&mut expanded, &mut |expression| {
        let Some(name) = macro_name(expression) else {
            return;
        };
        let keep = if RECORDING_MACROS.contains(&name) {
            Some((1, true))
        } else if VALUE_MACROS.contains(&name) {
            Some((0, true))
        } else if BARE_MACROS.contains(&name) {
            Some((0, false))
        } else {
            None
        };
        let Some((position, parenthesize)) = keep else {
            let unsigned = name == GLF_MAKE_IN_BOUNDS_UINT;
            expand_in_bounds(expression, unsigned, &mut builder);
            return;
        };
        let ExpressionKind::FunctionCall(call) = &expression.kind else {
            return;
        };
        if call.arguments.len() <= position {
            return;
        }
        let id = expression.id;
        let span = expression.span;
        let ExpressionKind::FunctionCall(call) = take_expression(expression).kind else {
            return;
        };
        let Some(argument) = call.arguments.into_iter().nth(position) else {
            return;
        };
        *expression = if parenthesize {
            Expression::new(id, span, ExpressionKind::Parenthesized(Box::new(argument)))
        } else {
            argument
        };
    });
    TranslationUnit::new(expanded.external_declarations, builder.next_id())
}

fn expand_in_bounds(expression: &mut Expression, unsigned: bool, builder: &mut Builder) {
    let ExpressionKind::FunctionCall(call) = &mut expression.kind else {
        return;
    };
    if call.arguments.len() != 2 {
        return;
    }
    let mut arguments = core::mem::take(&mut call.arguments).into_iter();
    let (Some(index), Some(size)) = (arguments.next(), arguments.next()) else {
        return;
    };
    let (zero, one) = if unsigned {
        (builder.uint(0), builder.uint(1))
    } else {
        (builder.int(0), builder.int(1))
    };
    let last = builder.binary(BinaryOperator::Subtract, size, one);
    call.function.node = FunctionIdentifier::Function(String::from("clamp"));
    call.arguments = vec![index, zero, last];
}
