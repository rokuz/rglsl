use alloc::format;
use alloc::string::String;

use super::{code, errors, expect_code, first_error, lex, run};
use crate::DiagnosticKind;

#[test]
fn if_elif_else_chains() {
    expect_code(
        "#version 450\n#define V 3\n#if V == 1\nint one;\n#elif V == 2\nint two;\n#elif V == 3\nint three;\n#else\nint other;\n#endif\n#ifdef V\nint def;\n#else\nint undef;\n#endif\n#ifndef V\nint nope;\n#elif 1\nint yes;\n#endif\n",
        "int three; int def; int yes;",
    );
}

#[test]
fn nested_groups_inside_skipped_groups() {
    expect_code(
        "#version 450\n#if 0\n#if 1\nint a;\n#else\nint b;\n#endif\n#elif 1\nint c;\n#endif\n",
        "int c;",
    );
}

#[test]
fn skipped_groups_ignore_unknown_directives() {
    expect_code(
        "#version 450\n#if 0\n#foo\n#define\n  #  pragma whatever\n@ $ `\n#endif\nint ok;\n",
        "int ok;",
    );
}

#[test]
fn skipped_groups_still_scan_literals_like_glslang() {
    let (kind, line) = first_error("#version 450\n#if 0\nint a = 09;\n#endif\n");
    assert_eq!(
        kind,
        DiagnosticKind::InvalidLiteral {
            reason: "octal literal digit too large"
        }
    );
    assert_eq!(line, 3);
}

#[test]
fn defined_operator_forms() {
    expect_code(
        "#version 450\n#define X\n#if defined X && defined(X) && !defined Y && !defined ( Y )\nint ok;\n#endif\n",
        "int ok;",
    );
}

#[test]
fn defined_produced_by_a_macro_is_an_error() {
    let (kind, line) = first_error("#version 450\n#define D defined(X)\n#if D\n#endif\n");
    assert_eq!(kind, DiagnosticKind::DefinedFromMacro);
    assert_eq!(line, 3);
}

#[test]
fn defined_from_a_macro_argument_is_accepted() {
    expect_code(
        "#version 450\n#define ID(x) x\n#if !ID(defined Y)\nint yes;\n#endif\n",
        "int yes;",
    );
    let (kind, _) =
        first_error("#version 450\n#define ID(x) x\n#define X\n#if ID(defined X)\n#endif\n");
    assert_eq!(kind, DiagnosticKind::DefinedWithoutIdentifier);
}

#[test]
fn defined_without_identifier() {
    let (kind, _) = first_error("#version 450\n#if defined(1)\n#endif\n");
    assert_eq!(kind, DiagnosticKind::DefinedWithoutIdentifier);
    let (kind, _) = first_error("#version 450\n#if defined(X\n#endif\n");
    assert_eq!(kind, DiagnosticKind::ExpectedCloseParen);
}

#[test]
fn integer_arithmetic_matches_glslang() {
    expect_code(
        "#version 450\n#if (1 << 31) < 0\nint a;\n#endif\n#if 4294967295 == -1\nint b;\n#endif\n#if 0x7fffffff + 1 < 0\nint c;\n#endif\n#if -2147483648 / -1 == 0\nint d;\n#endif\n#if (5 % 3) == 2 && (7 >> 1) == 3 && (~0) == -1 && !0\nint e;\n#endif\n#if (1 << 32) == 0 && (-8 >> 40) == -1 && (8 >> -1) == 0\nint f;\n#endif\n",
        "int a; int b; int c; int d; int e; int f;",
    );
}

#[test]
fn operator_precedence() {
    expect_code(
        "#version 450\n#if 1 + 2 * 3 == 7 && (1 | 2 ^ 3 & 4) == 3 && 1 < 2 == 1 && -2 + +3 == 1\nint ok;\n#endif\n#if 0 || 1 && 0\nint wrong;\n#endif\n",
        "int ok;",
    );
}

#[test]
fn undefined_identifiers_are_zero() {
    expect_code(
        "#version 450\n#if UNDEFINED == 0 && !UNDEFINED\nint a;\n#endif\n#define FN(x) x\n#if FN(3) == 3\nint b;\n#endif\n",
        "int a; int b;",
    );
}

#[test]
fn expression_errors() {
    let cases = [
        ("#if 1 / 0\n#endif\n", DiagnosticKind::DivisionByZero),
        ("#if 1 % 0\n#endif\n", DiagnosticKind::DivisionByZero),
        ("#if 1u\n#endif\n", DiagnosticKind::BadExpression),
        ("#if 1.0\n#endif\n", DiagnosticKind::BadExpression),
        ("#if\n#endif\n", DiagnosticKind::BadExpression),
        ("#if (1\n#endif\n", DiagnosticKind::ExpectedCloseParen),
        (
            "#if 1 ? 2 : 3\n#endif\n",
            DiagnosticKind::ExtraTokens { directive: "#if" },
        ),
        (
            "#define FN(x) x\n#if FN\n#endif\n",
            DiagnosticKind::CannotEvaluate,
        ),
    ];
    for (body, expected) in cases {
        let (kind, _) = first_error(&format!("#version 450\n{body}"));
        assert_eq!(kind, expected, "{body}");
    }
}

#[test]
fn division_by_zero_is_reported_even_when_short_circuited() {
    let (kind, _) = first_error("#version 450\n#if 0 && (1 / 0)\n#endif\n");
    assert_eq!(kind, DiagnosticKind::DivisionByZero);
}

#[test]
fn unbalanced_groups() {
    let (kind, line) = first_error("#version 450\n#endif\n");
    assert_eq!(
        kind,
        DiagnosticKind::Mismatched {
            directive: "#endif"
        }
    );
    assert_eq!(line, 2);
    let (kind, _) = first_error("#version 450\n#else\n");
    assert_eq!(kind, DiagnosticKind::Mismatched { directive: "#else" });
    let (kind, _) = first_error("#version 450\n#elif 1\n");
    assert_eq!(kind, DiagnosticKind::Mismatched { directive: "#elif" });
    let (kind, line) = first_error("#version 450\n#if 1\nint a;\n");
    assert_eq!(kind, DiagnosticKind::MissingEndif);
    assert_eq!(line, 4);
    let (kind, _) = first_error("#version 450\n#if 0\nint a;\n");
    assert_eq!(kind, DiagnosticKind::MissingEndif);
}

#[test]
fn else_ordering_errors() {
    let (kind, line) = first_error("#version 450\n#if 1\n#else\n#else\n#endif\n");
    assert_eq!(kind, DiagnosticKind::ElseAfterElse);
    assert_eq!(line, 4);
    let (kind, _) = first_error("#version 450\n#if 0\n#else\n#elif 1\n#endif\n");
    assert_eq!(kind, DiagnosticKind::ElifAfterElse);
    let (kind, _) = first_error("#version 450\n#if 1\n#else\n#elif 1\n#endif\n");
    assert_eq!(kind, DiagnosticKind::ElifAfterElse);
}

#[test]
fn trailing_tokens_after_directives() {
    let (kind, _) = first_error("#version 450\n#if 1\n#endif junk\n");
    assert_eq!(
        kind,
        DiagnosticKind::ExtraTokens {
            directive: "#endif"
        }
    );
    let (kind, _) = first_error("#version 450\n#if 1\n#else junk\n#endif\n");
    assert_eq!(kind, DiagnosticKind::ExtraTokens { directive: "#else" });
    let (kind, _) = first_error("#version 450\n#ifdef A B\n#endif\n");
    assert_eq!(kind, DiagnosticKind::IfdefExtraTokens);
    let (kind, _) = first_error("#version 450\n#ifdef 1\n#endif\n");
    assert_eq!(
        kind,
        DiagnosticKind::MissingMacroName {
            directive: "#ifdef"
        }
    );
    let (kind, _) = first_error("#version 450\n#ifndef\n#endif\n");
    assert_eq!(
        kind,
        DiagnosticKind::MissingMacroName {
            directive: "#ifndef"
        }
    );
}

fn nested(depth: usize) -> String {
    let mut source = String::from("#version 450\n");
    for _ in 0..depth {
        source.push_str("#if 1\n");
    }
    source.push_str("int inner;\n");
    for _ in 0..depth {
        source.push_str("#endif\n");
    }
    source
}

#[test]
fn nesting_limit_matches_glslang() {
    let result = run(&nested(65));
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(code(&result.text), lex("int inner;"));
    let result = run(&nested(66));
    assert_eq!(
        errors(&result).first(),
        Some(&DiagnosticKind::NestingTooDeep { directive: "#if" })
    );
}

#[test]
fn long_elif_chains_do_not_recurse() {
    let mut source = String::from("#version 450\n#if 0\n");
    for _ in 0..20_000 {
        source.push_str("#elif 0\n");
    }
    source.push_str("#else\nint last;\n#endif\n");
    let result = run(&source);
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(code(&result.text), lex("int last;"));
}
