use alloc::format;
use alloc::string::String;

use super::{round_trip, unit};
use crate::ast::{ExpressionKind, ExternalDeclaration, StatementKind};
use crate::{parse, print, ParseErrorKind};

fn with_extension(extension: &str, body: &str) -> String {
    format!("#version 450\n#extension {extension} : enable\nvoid f() {{\n{body}\n}}\n")
}

fn first_string(source: &str) -> String {
    let parsed = unit(source);
    let Some(ExternalDeclaration::FunctionDefinition(definition)) =
        parsed.external_declarations.last()
    else {
        panic!("expected a function definition in {source}");
    };
    let Some(StatementKind::Expression(Some(expression))) = definition
        .body
        .statements
        .first()
        .map(|statement| &statement.kind)
    else {
        panic!("expected an expression statement in {source}");
    };
    let mut current = expression;
    loop {
        match &current.kind {
            ExpressionKind::String(value) => return value.clone(),
            ExpressionKind::FunctionCall(call) => match call.arguments.first() {
                Some(argument) => current = argument,
                None => panic!("expected an argument in {source}"),
            },
            other => panic!("expected a string, found {other:?}"),
        }
    }
}

fn error_kind(source: &str) -> ParseErrorKind {
    match parse(source) {
        Ok(_) => panic!("expected an error for {source}"),
        Err(error) => error.kind,
    }
}

#[test]
fn string_literals_parse_without_extensions() {
    let source = "#version 450\nvoid f() {\n\"x\";\n}\n";
    assert_eq!(first_string(source), "x");
}

#[test]
fn escape_sequences_follow_glslang() {
    let cases = [
        (r#""ASDF \\ \? \x5C %d""#, "ASDF \\ ? \\ %d"),
        (r#""\x41\x000042\x41\x8Z""#, "ABA\u{8}Z"),
        (r#""\102\043\44\7\1021Z""#, "B#$\u{7}B1Z"),
        (r#""\'\"\a\b\f\n\r\t\v""#, "'\"\u{7}\u{8}\u{c}\n\r\t\u{b}"),
        (r#""ab\0cd""#, "ab"),
        (r#""\x141""#, "A"),
        (r#""""#, ""),
        (r#""// not a comment /*""#, "// not a comment /*"),
    ];
    for (literal, value) in cases {
        let source = with_extension("GL_EXT_debug_printf", &format!("{literal};"));
        assert_eq!(first_string(&source), value, "{literal}");
    }
}

#[test]
fn bad_strings_are_errors() {
    let unterminated = with_extension("GL_EXT_debug_printf", "\"abc\n\";");
    assert_eq!(
        error_kind(&unterminated),
        ParseErrorKind::UnterminatedString
    );
    let hex = with_extension("GL_EXT_debug_printf", r#""\xZ";"#);
    assert_eq!(error_kind(&hex), ParseErrorKind::HexEscapeWithoutDigits);
    let invalid = with_extension("GL_EXT_debug_printf", r#""\8";"#);
    assert_eq!(error_kind(&invalid), ParseErrorKind::InvalidEscape);
}

#[test]
fn strings_round_trip_through_the_printer() {
    let body = r#"debugPrintfEXT("quote \" backslash \\ bell \a tab \t \x01 \x7f \351 end", 1);
"plain";
abortEXT();
(1, "sequence");"#;
    let source = with_extension("GL_EXT_debug_printf", body);
    let printed = round_trip(&source);
    assert!(printed.contains(r#""quote \" backslash \\ bell \a tab \t \001 \177 é end""#));
    assert_eq!(print(&unit(&printed)), printed);
}

#[test]
fn a_string_where_an_expression_is_not_allowed_is_a_syntax_error() {
    let source = with_extension("GL_EXT_debug_printf", r#"debugPrintfEXT("a" "b");"#);
    assert!(matches!(
        error_kind(&source),
        ParseErrorKind::UnexpectedToken { ref found, .. } if found == "a string literal"
    ));
}
