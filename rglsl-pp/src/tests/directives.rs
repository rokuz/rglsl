use alloc::string::String;
use alloc::vec::Vec;

use super::{code, errors, expect_code, first_error, lex, run, run_with, warnings};
use crate::{DiagnosticKind, Options, Phase, Profile};

fn without_vulkan() -> Options {
    Options {
        vulkan_client_version: None,
        ..Options::default()
    }
}

fn directive_lines(text: &str) -> Vec<String> {
    text.lines()
        .filter(|line| line.starts_with('#'))
        .map(String::from)
        .collect()
}

#[test]
fn version_extension_and_pragma_lines_are_kept() {
    let result = run(
        "#version 450 core\n#extension GL_EXT_control_flow_attributes : require\n#extension all : warn\n#pragma optimize(on)\n#define P on\n#pragma custom P\nint a;\n",
    );
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(
        directive_lines(&result.text),
        [
            "#version 450 core",
            "#extension GL_EXT_control_flow_attributes : require",
            "#extension all : warn",
            "#pragma optimize ( on )",
            "#pragma custom P",
        ]
    );
}

#[test]
fn removed_lines_keep_the_line_structure() {
    let source = "#version 450\n#define A 1\n\n#ifdef A\nint a = A;\n#else\nint b;\n#endif\n// comment\n  float c;\n#undef A\nint d;\n";
    let result = run(source);
    let lines: Vec<&str> = result.text.lines().collect();
    assert_eq!(lines.first(), Some(&"#version 450"));
    assert_eq!(lines.get(4), Some(&"int a = 1;"));
    assert_eq!(lines.get(9), Some(&"  float c;"));
    assert_eq!(lines.get(11), Some(&"int d;"));
    assert_eq!(
        lines.iter().filter(|line| !line.trim().is_empty()).count(),
        4
    );
}

#[test]
fn version_must_come_first() {
    let (kind, line) = first_error("int a;\n#version 450\n");
    assert_eq!(kind, DiagnosticKind::VersionNotFirst);
    assert_eq!(line, 2);
    let (kind, _) = first_error("#define X\n#version 450\n");
    assert_eq!(kind, DiagnosticKind::VersionNotFirst);
    let (kind, line) = first_error("#version 450\n#version 450\n");
    assert_eq!(kind, DiagnosticKind::VersionNotFirst);
    assert_eq!(line, 2);
    let result = run("// leading comment\n/* block\n comment */\n#version 450\nint a;\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
}

#[test]
fn version_syntax_errors() {
    let missing = run_with("#version\n", &without_vulkan());
    assert!(errors(&missing).contains(&DiagnosticKind::VersionWithoutNumber));
    let (kind, _) = first_error("#version 450 foo\n");
    assert_eq!(kind, DiagnosticKind::BadProfile);
    let (kind, _) = first_error("#version 450 core extra\n");
    assert_eq!(kind, DiagnosticKind::VersionExtraTokens);
}

#[test]
fn version_number_and_profile_are_deduced() {
    let result = run("#version 460\nint v = __VERSION__;\n");
    assert_eq!(result.version.number, 460);
    assert_eq!(result.version.profile, Some(Profile::Core));
    assert_eq!(code(&result.text), lex("int v = 460;"));
    let result = run_with("#version 451\nint v = __VERSION__;\n", &without_vulkan());
    assert_eq!(
        errors(&result).first(),
        Some(&DiagnosticKind::VersionUnsupported {
            message: "version not supported"
        })
    );
    assert_eq!(code(&result.text), lex("int v = 450;"));
    let result = run_with("int v = __VERSION__;\n", &without_vulkan());
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(code(&result.text), lex("int v = 100;"));
    let result = run("#version 130\nint a;\n");
    assert_eq!(
        errors(&result).first(),
        Some(&DiagnosticKind::VersionUnsupported {
            message: "#version: Desktop shaders for Vulkan SPIR-V require version 140 or higher"
        })
    );
}

#[test]
fn extension_syntax() {
    let cases = [
        ("#extension\n", DiagnosticKind::ExtensionNameMissing),
        (
            "#extension 1 : enable\n",
            DiagnosticKind::ExtensionNameExpected,
        ),
        ("#extension GL_FOO\n", DiagnosticKind::ExtensionColonMissing),
        (
            "#extension GL_FOO :\n",
            DiagnosticKind::ExtensionBehaviorMissing,
        ),
        (
            "#extension GL_FOO : enable x\n",
            DiagnosticKind::ExtensionExtraTokens,
        ),
        (
            "#extension all : enable\n",
            DiagnosticKind::ExtensionAllEnabled,
        ),
    ];
    for (body, expected) in cases {
        let (kind, _) = first_error(&alloc::format!("#version 450\n{body}"));
        assert_eq!(kind, expected, "{body}");
    }
    let result = run("#version 450\n#extension GL_FOO : maybe\n");
    let error = result
        .errors()
        .next()
        .map(|diagnostic| diagnostic.kind.clone());
    assert!(matches!(
        &error,
        Some(DiagnosticKind::ExtensionBehaviorUnknown { behavior }) if behavior == "maybe"
    ));
    assert!(error.is_some_and(|kind| kind.phase() == Phase::Compiler));
}

#[test]
fn pragmas() {
    let result = run("#version 450\n#pragma once\nint a;\n");
    assert!(errors(&result).is_empty());
    assert_eq!(
        warnings(&result),
        [DiagnosticKind::PragmaOnceNotImplemented]
    );
    assert!(directive_lines(&result.text).contains(&String::from("#pragma once")));
    let (kind, _) = first_error("#version 450\n#pragma foo");
    assert_eq!(kind, DiagnosticKind::PragmaWithoutNewline);
    let result = run("#version 450\n#pragma\n#\nint a;\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
}

#[test]
fn error_directive() {
    let (kind, line) = first_error("#version 450\n\n#error this is \"bad\" 42\nint a;\n");
    assert_eq!(
        kind,
        DiagnosticKind::ErrorDirective {
            message: String::from("this is bad 42 ")
        }
    );
    assert_eq!(line, 3);
    let skipped = run("#version 450\n#if 0\n#error never\n#endif\n");
    assert!(errors(&skipped).is_empty());
}

#[test]
fn invalid_directives() {
    let (kind, _) = first_error("#version 450\n#foo bar\n");
    assert_eq!(
        kind,
        DiagnosticKind::InvalidDirective {
            name: Some(String::from("foo"))
        }
    );
    let (kind, _) = first_error("#version 450\n#1\n");
    assert_eq!(kind, DiagnosticKind::InvalidDirective { name: None });
    let (kind, line) = first_error("#version 450\nint a; #define X\n");
    assert_eq!(kind, DiagnosticKind::DirectiveAfterToken);
    assert_eq!(line, 2);
}

#[test]
fn directives_allow_whitespace() {
    expect_code(
        "#version 450\n  #  define   A   1\n\t#\tifdef\tA\nint a = A;\n  #  endif\n",
        "int a = 1;",
    );
    let result = run("   #   version   450   core\nint a;\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(directive_lines(&result.text), ["#version 450 core"]);
}

#[test]
fn line_directive_forms() {
    expect_code(
        "#version 450\n#line 100\nint a = __LINE__;\n#line 200 5\nint b = __LINE__ + __FILE__;\n#define L 300\n#line L\nint c = __LINE__;\n#line 10 + 20\nint d = __LINE__;\n",
        "int a = 100; int b = 200 + 5; int c = 300; int d = 30;",
    );
}

#[test]
fn line_directive_before_330_sets_the_current_line() {
    let result = run_with(
        "#version 120\n#line 50\nint a = __LINE__;\n",
        &without_vulkan(),
    );
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(code(&result.text), lex("int a = 51;"));
}

#[test]
fn line_directive_with_a_file_name() {
    let result = run(
        "#version 450\n#extension GL_GOOGLE_cpp_style_line_directive : enable\n#line 7 \"other.glsl\"\nint a = __LINE__;\nint b = __FILE__;\n",
    );
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(
        code(&result.text),
        lex("int a = 7; int b = \"other.glsl\";")
    );
    let offset = result.text.find("int b").unwrap_or(0);
    let (source, line) = result.source_map.presumed(offset);
    assert_eq!(source, crate::PresumedSource::Name("other.glsl"));
    assert_eq!(line, 8);
    let (kind, line) = first_error("#version 450\n#line 7 \"other.glsl\"\n");
    assert_eq!(
        kind,
        DiagnosticKind::ExtensionRequired {
            feature: "filename-based #line",
            extension: "GL_GOOGLE_cpp_style_line_directive"
        }
    );
    assert_eq!(line, 2);
    let (kind, _) = first_error("#version 450\n#line\n");
    assert_eq!(kind, DiagnosticKind::LineWithoutNumber);
    let (kind, _) = first_error("#version 450\n#line 1 2 3\n");
    assert_eq!(kind, DiagnosticKind::ExtraTokens { directive: "#line" });
}

#[test]
fn line_continuation() {
    let result = run(
        "#version 450\n#define LONG(a) a + \\\n  a\nint x = LONG(1); int \\\ny = 2;\n// comment \\\nstill comment\nint z = __LINE__;\n",
    );
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(
        code(&result.text),
        lex("int x = 1 + 1; int y = 2; int z = 8;")
    );
    assert_eq!(
        warnings(&result),
        [DiagnosticKind::ContinuationInComment { allowed: true }]
    );
    let old = run_with("#version 330\nint \\\ny;\n", &without_vulkan());
    assert_eq!(errors(&old), [DiagnosticKind::ContinuationNotAllowed]);
    assert_eq!(
        DiagnosticKind::ContinuationNotAllowed.phase(),
        Phase::Compiler
    );
    let extension = run_with(
        "#version 330\n#extension GL_ARB_shading_language_420pack : enable\nint \\\ny;\n",
        &without_vulkan(),
    );
    assert!(errors(&extension).is_empty(), "{:?}", extension.diagnostics);
    assert_eq!(code(&extension.text), lex("int y;"));
}

#[test]
fn comments_separate_tokens() {
    expect_code(
        "#version 450\n#define A /* c */ 1 /* d */ + 2 // tail\nint/**/x = A;\n/* multi\n   line */ int y = __LINE__;\n",
        "int x = 1 + 2; int y = 5;",
    );
    let (kind, line) = first_error("#version 450\nint a; /* never closed\n");
    assert_eq!(kind, DiagnosticKind::UnterminatedComment);
    assert_eq!(line, 2);
}

#[test]
fn character_literals_are_rejected() {
    let (kind, _) = first_error("#version 450\nint a = 'x';\n");
    assert_eq!(kind, DiagnosticKind::CharacterLiteral);
}
