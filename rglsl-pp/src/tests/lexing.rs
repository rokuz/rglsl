use alloc::string::String;

use super::{code, errors, expect_code, first_error, lex, run};
use crate::DiagnosticKind;

#[test]
fn numeric_literals_pass_through() {
    expect_code(
        "#version 450\ndouble a = 1.0lf + 2.5LF + 1e5 + .5 + 5. + 0x1F + 017 + 3u + 4U + 1.0f + 0.0 + 1e-3 + 2E+4;\nint64_t b = 1l + 0x1ul + 7us;\nfloat16_t c = 1.0hf;\n",
        "double a = 1.0lf + 2.5LF + 1e5 + .5 + 5. + 0x1F + 017 + 3u + 4U + 1.0f + 0.0 + 1e-3 + 2E+4; int64_t b = 1l + 0x1ul + 7us; float16_t c = 1.0hf;",
    );
}

#[test]
fn invalid_suffixes_split_like_glslang() {
    let result = run("#version 450\nfloat a = 1.5l + 2.5h + 3.0fe2m1;\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(
        code(&result.text),
        ["float", "a", "=", "1.5", "l", "+", "2.5", "h", "+", "3.0fe2m1", ";"]
    );
}

#[test]
fn literal_errors() {
    let cases = [
        ("int a = 09;", "octal literal digit too large"),
        ("int a = 99999999999;", "numeric literal too big"),
        ("int a = 0x100000000;", "hexadecimal literal too big"),
        ("int a = 0x;", "bad digit in hexadecimal literal"),
        ("int a = 040000000000;", "octal literal too big"),
        (
            "float a = 1f;",
            "float literal needs a decimal point or exponent",
        ),
        ("float a = 1e;", "bad character in float exponent"),
    ];
    for (body, reason) in cases {
        let (kind, line) = first_error(&alloc::format!("#version 450\n{body}\n"));
        assert_eq!(kind, DiagnosticKind::InvalidLiteral { reason }, "{body}");
        assert_eq!(line, 2);
    }
    let result = run("#version 450\n#if 0\nfloat a = 1f;\n#endif\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
}

#[test]
fn large_values_wrap_like_glslang() {
    expect_code(
        "#version 450\n#if 4294967295 == -1 && 0xffffffff == -1 && 037777777777 == -1\nint ok;\n#endif\n",
        "int ok;",
    );
}

#[test]
fn strings_keep_their_escapes() {
    let result = run("#version 450\nprint(\"a\\tb\\\"c\\x41\\101\");\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(
        code(&result.text),
        ["print", "(", "\"a\\tb\\\"cAA\"", ")", ";"]
    );
    let (kind, _) = first_error("#version 450\nprint(\"\\q\");\n");
    assert_eq!(kind, DiagnosticKind::InvalidEscape);
    let (kind, _) = first_error("#version 450\nprint(\"\\x\");\n");
    assert_eq!(kind, DiagnosticKind::HexEscapeWithoutDigits);
    let (kind, line) = first_error("#version 450\nprint(\"open\n);\n");
    assert_eq!(kind, DiagnosticKind::UnterminatedString);
    assert_eq!(line, 2);
}

#[test]
fn operators_are_split_longest_first() {
    expect_code(
        "#version 450\na<<=b>>=c<=d>=e==f!=g&&h||i^^j++k--l+=m-=n*=o/=p%=q&=r|=s^=t::u;\n",
        "a <<= b >>= c <= d >= e == f != g && h || i ^^ j ++ k -- l += m -= n *= o /= p %= q &= r |= s ^= t :: u;",
    );
}

#[test]
fn byte_order_mark_is_skipped() {
    let result = run("\u{feff}#version 450\nint a;\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert!(result.text.starts_with("#version 450\n"));
}

#[test]
fn carriage_returns_end_lines() {
    let result = run("#version 450\r\n#define A 1\r\nint a = A;\r\nint b = __LINE__;\r\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(code(&result.text), lex("int a = 1; int b = 4;"));
}

#[test]
fn unknown_characters_pass_through() {
    let result = run("#version 450\nint a = 1 @ 2 $ \u{e9};\n// \u{4e2d}\u{6587}\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(
        code(&result.text),
        ["int", "a", "=", "1", "@", "2", "$", "\u{e9}", ";"]
    );
}

#[test]
fn identifiers_longer_than_glslang_allows() {
    let mut source = String::from("#version 450\nint ");
    for _ in 0..1100 {
        source.push('a');
    }
    source.push_str(";\n");
    let (kind, _) = first_error(&source);
    assert_eq!(kind, DiagnosticKind::NameTooLong);
}
