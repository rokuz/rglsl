use alloc::string::String;
use alloc::vec;

use super::{code, errors, expect_code, first_error, lex, run, run_with, warnings};
use crate::{Define, DiagnosticKind, Options, Redefinition, Stage};

#[test]
fn object_like_macros_expand() {
    expect_code(
        "#version 450\n#define A 1 + 2\n#define B A * A\nint x = B;\n",
        "int x = 1 + 2 * 1 + 2;",
    );
}

#[test]
fn empty_object_like_macro() {
    expect_code(
        "#version 450\n#define EMPTY\nint EMPTY b EMPTY;\n",
        "int b;",
    );
}

#[test]
fn function_like_macros_expand() {
    expect_code(
        "#version 450\n#define F(a, b) (a) * (b)\nint x = F(1 + 2, f(3, 4));\n",
        "int x = (1 + 2) * (f(3, 4));",
    );
}

#[test]
fn function_like_macro_without_parenthesis_is_not_expanded() {
    expect_code(
        "#version 450\n#define F(x) (x)\nint a = F\n;\nint b = F\n(1);\n",
        "int a = F; int b = (1);",
    );
}

#[test]
fn arguments_may_span_lines() {
    expect_code(
        "#version 450\n#define F(a, b) a + b\nint x = F(1,\n\n 2\n);\n",
        "int x = 1 + 2;",
    );
}

#[test]
fn nested_parentheses_and_empty_arguments() {
    expect_code(
        "#version 450\n#define Z() zero\n#define O(x) [x]\n#define T(x, y) {x|y}\nint a = Z();\nint b = O((1, 2));\nint c = T(,);\nint d = T((a,b),c);\n",
        "int a = zero; int b = [(1, 2)]; int c = {|}; int d = {(a,b)|c};",
    );
}

#[test]
fn single_empty_argument_is_too_few() {
    let (kind, line) = first_error("#version 450\n#define O(x) [x]\nint e = O( );\n");
    assert!(matches!(kind, DiagnosticKind::TooFewArguments { name } if name == "O"));
    assert_eq!(line, 3);
}

#[test]
fn wrong_argument_counts() {
    let (kind, _) = first_error("#version 450\n#define T(x, y) x\nint a = T(1);\n");
    assert!(matches!(kind, DiagnosticKind::TooFewArguments { .. }));
    let (kind, _) = first_error("#version 450\n#define T(x, y) x\nint a = T(1, 2, 3);\n");
    assert!(matches!(kind, DiagnosticKind::TooManyArguments { .. }));
    let (kind, _) = first_error("#version 450\n#define Z() 0\nint a = Z(1);\n");
    assert!(matches!(kind, DiagnosticKind::TooManyArguments { .. }));
}

#[test]
fn unterminated_invocation_stops_preprocessing() {
    let result = run("#version 450\n#define F(x) x\nint a = F(1, \nint b;\n");
    assert!(matches!(
        errors(&result).first(),
        Some(DiagnosticKind::MacroEndOfInput { .. })
    ));
    assert_eq!(code(&result.text), lex("int a ="));
}

#[test]
fn hash_inside_arguments_is_an_error() {
    let (kind, _) = first_error("#version 450\n#define H(x) x\nH(#)\n");
    assert!(matches!(kind, DiagnosticKind::MacroUnexpectedHash { .. }));
}

#[test]
fn self_reference_is_not_expanded_again() {
    expect_code(
        "#version 450\n#define f(x) x f\nint a = f(1)(2)(3);\n#define A B\n#define B A\nint b = A + B;\n#define g(x) g(x) + x\nint c = g(g(1));\n#define h(x) x\nint d = h(h)(4);\n",
        "int a = 1 f(2) (3); int b = A + B; int c = g(g(1) + 1) + g(1) + 1; int d = h(4);",
    );
}

#[test]
fn nested_invocations() {
    expect_code(
        "#version 450\n#define F(x) (x)\n#define G(x, y) F(x) + F(y)\nint a = G(F(1), G(2, 3));\n#define H(x) x x\nint b = H(H(H(1)));\n",
        "int a = ((1)) + ((2) + (3)); int b = 1 1 1 1 1 1 1 1;",
    );
}

#[test]
fn object_like_macro_naming_a_function_like_macro() {
    expect_code(
        "#version 450\n#define B(x) x\n#define C B\nint a = C(2);\n",
        "int a = 2;",
    );
}

#[test]
fn token_pasting() {
    expect_code(
        "#version 450\n#define P(a,b) a##b\nint P(x,1);\nint P(x,);\nint q = 1 P(+,=) 2;\n#define Q(a) a ## 3A\nint Q(v);\n#define R x ## y ## z\nint R;\n#define T(a,b,c) a ## b ## c\nint T(p,q,r);\n",
        "int x1; int x int q = 1 += 2; int v3A; int xyz; int pqr;",
    );
}

#[test]
fn pasting_operators() {
    expect_code(
        "#version 450\n#define P(a,b) a ## b\nint x = 1 P(<,<) 2 P(&,&) 3 P(|,=) P(=,=);\n",
        "int x = 1 << 2 && 3 |= ==;",
    );
}

#[test]
fn pasting_errors() {
    let (kind, line) = first_error("#version 450\n#define P(a,b) a##b\nint z = P(1,2);\n");
    assert_eq!(kind, DiagnosticKind::PasteNotSupported);
    assert_eq!(line, 3);
    let (kind, _) = first_error("#version 450\n#define P(a,b) a ## b\nint x = 1 P(-,>) 2;\n");
    assert_eq!(kind, DiagnosticKind::PasteInvalid);
    let (kind, _) = first_error("#version 450\n#define P(a,b) a##b\nint P(,y);\n");
    assert_eq!(kind, DiagnosticKind::PasteAtStart);
    let (kind, _) = first_error("#version 450\n#define P(a) a ##\n");
    assert_eq!(kind, DiagnosticKind::IncompletePaste);
}

#[test]
fn stringification_follows_glslang() {
    let source = "#version 450\n#define S(x) #x\n#define E(x) S(x)\n#define V 42\nS(a + b) E(V) S( spaced  out )\n";
    let result = run(source);
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(
        code(&result.text),
        vec!["\"a +b\"", "\" 42\"", "\"spacedout\""]
    );
}

#[test]
fn stringification_errors() {
    let (kind, _) = first_error("#version 450\n#define S(x) #y\n");
    assert_eq!(kind, DiagnosticKind::StringifyWithoutParameter);
    let (kind, _) = first_error("#version 450\n#define S(x) ### x\n");
    assert_eq!(kind, DiagnosticKind::PasteStringifyMix);
    let old = run_with(
        "#version 120\n#define S(x) a ## x\n",
        &Options {
            vulkan_client_version: None,
            ..Options::default()
        },
    );
    assert!(matches!(
        errors(&old).first(),
        Some(DiagnosticKind::FeatureRequiresVersion { version: 130, .. })
    ));
}

#[test]
fn identical_redefinition_is_allowed() {
    expect_code(
        "#version 450\n#define A 1 + 2\n#define A  1  +   2\n#define F(x) x\n#define F(x) x\nint a = A;\n",
        "int a = 1 + 2;",
    );
}

#[test]
fn different_redefinitions_are_errors() {
    let cases = [
        (
            "#define A 1 + 2\n#define A 1 - 2\n",
            Redefinition::Substitution,
        ),
        (
            "#define A 1+2\n#define A 1 + 2\n",
            Redefinition::Substitution,
        ),
        (
            "#define F(x) x\n#define F(y) y\n",
            Redefinition::ParameterNames,
        ),
        (
            "#define F(x) x\n#define F(x, y) x\n",
            Redefinition::ParameterCount,
        ),
        (
            "#define F(x) x\n#define F x\n",
            Redefinition::FunctionLikeVersusObjectLike,
        ),
    ];
    for (body, expected) in cases {
        let source = alloc::format!("#version 450\n{body}");
        let (kind, line) = first_error(&source);
        assert!(
            matches!(&kind, DiagnosticKind::MacroRedefined { how, .. } if *how == expected),
            "{body}: {kind:?}"
        );
        assert_eq!(line, 3);
    }
}

#[test]
fn undef_allows_redefinition() {
    expect_code(
        "#version 450\n#define A 1\n#undef A\n#define A 2\n#undef NEVER_DEFINED\nint a = A;\n",
        "int a = 2;",
    );
    let (kind, _) = first_error("#version 450\n#define A\n#undef A B\n");
    assert_eq!(kind, DiagnosticKind::UndefExtraTokens);
    let (kind, _) = first_error("#version 450\n#undef 1\n");
    assert!(matches!(
        kind,
        DiagnosticKind::MissingMacroName {
            directive: "#undef"
        }
    ));
}

#[test]
fn reserved_names() {
    let (kind, _) = first_error("#version 450\n#define GL_FOO 1\n");
    assert!(matches!(kind, DiagnosticKind::ReservedGlPrefix { .. }));
    let (kind, _) = first_error("#version 450\n#undef GL_core_profile\n");
    assert!(matches!(
        kind,
        DiagnosticKind::ReservedGlPrefix {
            directive: "#undef",
            ..
        }
    ));
    let (kind, _) = first_error("#version 450\n#define defined\n");
    assert!(matches!(kind, DiagnosticKind::DefinedRedefined { .. }));
    let result = run("#version 450\n#define MY__NAME 1\nint a = MY__NAME;\n");
    assert!(errors(&result).is_empty());
    assert!(matches!(
        warnings(&result).first(),
        Some(DiagnosticKind::ReservedDoubleUnderscore { .. })
    ));
    let allowed = run("#version 450\n#extension GL_EXT_spirv_intrinsics : enable\n#define GL_FOO 1\nint a = GL_FOO;\n");
    assert!(errors(&allowed).is_empty(), "{:?}", allowed.diagnostics);
    assert_eq!(code(&allowed.text), lex("int a = 1;"));
}

#[test]
fn missing_space_after_name_drops_the_definition() {
    let result = run("#version 450\n#define A+1\nint a = A;\n");
    assert!(errors(&result).is_empty());
    assert_eq!(
        warnings(&result),
        vec![DiagnosticKind::MissingSpaceAfterMacroName]
    );
    assert_eq!(code(&result.text), lex("int a = A;"));
}

#[test]
fn bad_parameter_lists() {
    let (kind, _) = first_error("#version 450\n#define F(1) x\n");
    assert_eq!(kind, DiagnosticKind::BadMacroParameter);
    let (kind, _) = first_error("#version 450\n#define F(a, a) a\n");
    assert_eq!(kind, DiagnosticKind::DuplicateMacroParameter);
    let (kind, _) = first_error("#version 450\n#define F(a b) a\n");
    assert_eq!(kind, DiagnosticKind::MissingParenthesis);
    let (kind, _) = first_error("#version 450\n#define\n");
    assert!(matches!(
        kind,
        DiagnosticKind::MissingMacroName {
            directive: "#define"
        }
    ));
}

#[test]
fn line_file_and_version_macros() {
    let result = run("#version 450\nint a = __LINE__;\nint b = __FILE__;\nint c = __VERSION__;\n");
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(
        code(&result.text),
        lex("int a = 2; int b = 0; int c = 450;")
    );
}

#[test]
fn line_macro_inside_multi_line_arguments() {
    expect_code(
        "#version 450\n#define F(a, b) a + b + __LINE__\nint x = F(__LINE__,\n  __LINE__\n  );\nint y = __LINE__;\n",
        "int x = 3 + 4 + 5; int y = 6;",
    );
}

#[test]
fn file_macro_with_a_source_name_requires_the_extension() {
    let options = Options {
        source_name: Some(String::from("shader.frag")),
        ..Options::default()
    };
    let result = run_with("#version 450\nint b = __FILE__;\n", &options);
    assert!(matches!(
        errors(&result).first(),
        Some(DiagnosticKind::ExtensionRequired {
            feature: "filename-based __FILE__",
            ..
        })
    ));
    let result = run_with(
        "#version 450\n#extension GL_GOOGLE_include_directive : enable\nint b = __FILE__;\n",
        &options,
    );
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(code(&result.text), lex("int b = \"shader.frag\";"));
}

#[test]
fn predefined_macros() {
    let options = Options {
        stage: Some(Stage::Fragment),
        gl_spirv: true,
        ..Options::default()
    };
    let result = run_with(
        "#version 450\nint a = GL_core_profile + VULKAN + GL_SPIRV + GL_FRAGMENT_SHADER + GL_FRAGMENT_PRECISION_HIGH;\n#if defined(GL_ARB_shading_language_420pack) && defined GL_EXT_ray_tracing && defined GL_GOOGLE_include_directive\nint b;\n#endif\n#ifdef GL_compatibility_profile\nint c;\n#endif\n#ifdef GL_ARB_bindless_texture\nint d;\n#endif\n",
        &options,
    );
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(
        code(&result.text),
        lex("int a = 1 + 100 + 100 + 1 + 1; int b;")
    );
    let without = run_with(
        "#version 450\n#ifdef VULKAN\nint v;\n#endif\n",
        &Options {
            vulkan_client_version: None,
            ..Options::default()
        },
    );
    assert!(code(&without.text).is_empty());
    let compatibility = run("#version 450 compatibility\nint c = GL_compatibility_profile;\n");
    assert_eq!(code(&compatibility.text), lex("int c = 1;"));
}

#[test]
fn user_defines() {
    let options = Options {
        defines: vec![
            Define::new("FLAG", None),
            Define::new("VALUE", Some("4 * 2")),
            Define::new("TWICE(x)", Some("(x + x)")),
        ],
        ..Options::default()
    };
    let result = run_with(
        "#version 450\n#ifdef FLAG\nint a = VALUE + TWICE(3);\n#endif\n",
        &options,
    );
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
    assert_eq!(code(&result.text), lex("int a = 4 * 2 + (3 + 3);"));
}

#[test]
fn reserved_user_define_is_accepted_like_glslang() {
    let options = Options {
        defines: vec![Define::new("GL_ARB_bindless_texture", Some("1"))],
        ..Options::default()
    };
    let result = run_with("#version 450\nint a = GL_ARB_bindless_texture;\n", &options);
    assert!(errors(&result).is_empty(), "{:?}", result.diagnostics);
}

#[test]
fn expansion_depth_is_limited() {
    let mut source = String::from("#version 450\n#define F(x) x\nint a = ");
    for _ in 0..300 {
        source.push_str("F(");
    }
    source.push('1');
    for _ in 0..300 {
        source.push(')');
    }
    source.push_str(";\n");
    let result = run(&source);
    assert!(errors(&result)
        .iter()
        .any(|kind| matches!(kind, DiagnosticKind::ExpansionTooDeep { .. })));
}
