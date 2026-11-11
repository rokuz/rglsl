use alloc::vec::Vec;

use crate::ast::{
    BasicType, Declaration, DeclarationKind, Dimension, ExpressionKind, ExtensionBehavior,
    ExternalDeclaration, FunctionIdentifier, NumericKind, ScalarType, SingleTypeQualifier,
    TypeSpecifierNonArray,
};
use crate::extensions::{
    is_known, ExtensionIssue, ExtensionState, Feature, Request, EXPLICIT_ARITHMETIC, KNOWN,
};
use crate::{parse, ParseErrorKind};

use super::{expression, round_trip, unit};

fn declared_types(source: &str) -> Vec<TypeSpecifierNonArray> {
    unit(source)
        .external_declarations
        .into_iter()
        .filter_map(|declaration| match declaration {
            ExternalDeclaration::Declaration(Declaration {
                kind: DeclarationKind::InitDeclaratorList(mut list),
                ..
            }) => Some(core::mem::replace(
                &mut list.ty.node.specifier.node.non_array,
                TypeSpecifierNonArray::Void,
            )),
            _ => None,
        })
        .collect()
}

#[test]
fn the_registry_knows_every_glslang_extension() {
    assert_eq!(KNOWN.len(), 233);
    assert!(KNOWN.windows(2).all(|pair| pair[0] < pair[1]));
    for name in EXPLICIT_ARITHMETIC {
        assert!(is_known(name), "{name}");
    }
    assert!(is_known("GL_EXT_shader_16bit_storage"));
    assert!(is_known("GL_ARB_gpu_shader_int64"));
    assert!(!is_known("GL_FOO_bar"));
}

#[test]
fn directives_follow_glslang_behaviour_rules() {
    let mut state = ExtensionState::new();
    assert_eq!(
        state.apply("GL_FOO_bar", ExtensionBehavior::Require),
        [ExtensionIssue::UnknownRequired("GL_FOO_bar".into())]
    );
    let issues = state.apply("GL_FOO_bar", ExtensionBehavior::Enable);
    assert!(issues.iter().all(|issue| !issue.is_error()));
    assert_eq!(issues.len(), 1);
    let issues = state.apply("all", ExtensionBehavior::Enable);
    assert!(issues.iter().all(ExtensionIssue::is_error));
    assert!(!state.is_on("GL_EXT_shader_16bit_storage"));
    assert!(state.apply("all", ExtensionBehavior::Warn).is_empty());
    assert!(state.is_on("GL_EXT_shader_16bit_storage"));
    assert!(state.apply("all", ExtensionBehavior::Disable).is_empty());
    assert!(!state.is_on("GL_EXT_shader_16bit_storage"));
}

#[test]
fn implied_extensions_follow_the_chain() {
    let mut state = ExtensionState::new();
    state.apply(
        "GL_EXT_shader_subgroup_extended_types_float16",
        ExtensionBehavior::Enable,
    );
    assert!(state.is_on("GL_EXT_shader_explicit_arithmetic_types_float16"));
    assert!(state.explicit_arithmetic());
    state.apply("GL_KHR_shader_subgroup_ballot", ExtensionBehavior::Require);
    assert!(state.is_on("GL_KHR_shader_subgroup_basic"));
    state.apply(
        "GL_EXT_shader_subgroup_extended_types_float16",
        ExtensionBehavior::Disable,
    );
    assert!(!state.is_on("GL_EXT_shader_explicit_arithmetic_types_float16"));
}

#[test]
fn requests_distinguish_enabled_and_warned_extensions() {
    let mut state = ExtensionState::new();
    let names = Feature::Int64Literal.extensions();
    assert_eq!(state.request(names), Request::Missing);
    state.apply(
        "GL_EXT_shader_explicit_arithmetic_types_int64",
        ExtensionBehavior::Warn,
    );
    assert_eq!(
        state.request(names),
        Request::Warned("GL_EXT_shader_explicit_arithmetic_types_int64")
    );
    state.apply("GL_ARB_gpu_shader_int64", ExtensionBehavior::Enable);
    assert_eq!(state.request(names), Request::Enabled);
}

#[test]
fn type_keywords_depend_on_their_extensions() {
    let mut state = ExtensionState::new();
    assert!(state.keyword_enabled("float"));
    assert!(!state.keyword_enabled("float16_t"));
    state.apply("GL_EXT_shader_16bit_storage", ExtensionBehavior::Enable);
    assert!(state.keyword_enabled("float16_t"));
    assert!(state.keyword_enabled("u16vec3"));
    assert!(!state.keyword_enabled("f16mat2x3"));
    assert!(!state.keyword_enabled("int8_t"));
    assert!(!state.keyword_enabled("float64_t"));
    state.apply("GL_NV_gpu_shader5", ExtensionBehavior::Enable);
    assert!(!state.keyword_enabled("f64vec2"));
    state.apply("GL_ARB_gpu_shader_fp64", ExtensionBehavior::Enable);
    assert!(state.keyword_enabled("f64vec2"));
    assert!(!state.keyword_enabled("f64mat2"));
    assert_eq!(
        Feature::of_type_keyword("i64vec4"),
        Some(Feature::Int64Type)
    );
    assert_eq!(
        Feature::of_type_keyword("f32mat4x2"),
        Some(Feature::Float32Matrix)
    );
    assert_eq!(Feature::of_type_keyword("f32mat5"), None);
}

#[test]
fn extension_keywords_are_never_names() {
    for prefix in [
        "",
        "#extension GL_EXT_shader_explicit_arithmetic_types : enable\n",
    ] {
        for (source, word) in [
            ("float float16_t = 1.0;\n", "float16_t"),
            ("void int64_t() {}\n", "int64_t"),
            ("struct S { int u8vec2; };\n", "u8vec2"),
            ("void f(int f64mat3) {}\n", "f64mat3"),
            ("int rayPayloadEXT;\n", "rayPayloadEXT"),
            (
                "int accelerationStructureEXT;\n",
                "accelerationStructureEXT",
            ),
            ("void f() { int demote = 1; }\n", "demote"),
            ("int nonuniformEXT;\n", "nonuniformEXT"),
            ("int coopmat;\n", "coopmat"),
        ] {
            let error = parse(&alloc::format!("{prefix}{source}"))
                .expect_err("an extension keyword is not a name");
            assert_eq!(
                error.kind,
                ParseErrorKind::ReservedWord(word.into()),
                "{source}"
            );
        }
    }
}

#[test]
fn extension_types_without_their_extension_are_rejected() {
    let error = parse("#version 450\nvoid main() {\n    float16_t x;\n}\n")
        .expect_err("float16_t needs an extension");
    assert_eq!(error.position.line, 3);
    let ParseErrorKind::ExtensionRequired { word, extensions } = error.kind else {
        panic!("{error}");
    };
    assert_eq!(word, "float16_t");
    assert!(
        extensions.contains("GL_EXT_shader_explicit_arithmetic_types_float16"),
        "{extensions}"
    );
    let error = parse("#version 450\nvoid main() { i64vec2 v = i64vec2(1); }\n")
        .expect_err("i64vec2 needs an extension");
    assert!(matches!(
        error.kind,
        ParseErrorKind::ExtensionRequired { .. }
    ));
}

#[test]
fn explicit_type_keywords_are_types_with_the_extension() {
    let source = "#version 450\n#extension GL_EXT_shader_explicit_arithmetic_types : enable\n\
        float16_t a;\nf16mat2x3 b;\ni64vec4 c;\nuint8_t d;\nfloat32_t e;\nf64vec2 f;\nu32vec3 g;\n";
    let types = declared_types(source);
    let basic = |basic| TypeSpecifierNonArray::Basic(basic);
    assert_eq!(
        types,
        [
            basic(BasicType::Scalar(ScalarType::Float16)),
            basic(BasicType::Matrix {
                scalar: ScalarType::Float16,
                columns: Dimension::Two,
                rows: Dimension::Three,
            }),
            basic(BasicType::Vector {
                scalar: ScalarType::Int64,
                size: Dimension::Four,
            }),
            basic(BasicType::Scalar(ScalarType::Uint8)),
            basic(BasicType::Scalar(ScalarType::Float)),
            basic(BasicType::Vector {
                scalar: ScalarType::Double,
                size: Dimension::Two,
            }),
            basic(BasicType::Vector {
                scalar: ScalarType::Uint,
                size: Dimension::Three,
            }),
        ]
    );
    let printed = round_trip(source);
    assert!(printed.contains("f16mat2x3 b;"), "{printed}");
    let error =
        parse("#extension GL_EXT_shader_explicit_arithmetic_types : enable\nint float16_t;\n")
            .expect_err("a keyword with the extension");
    assert_eq!(error.kind, ParseErrorKind::ReservedWord("float16_t".into()));
    unit(
        "#version 450\n#extension GL_EXT_shader_16bit_storage : enable\nfloat16_t a;\nu16vec2 b;\n",
    );
}

#[test]
fn storage_extension_does_not_enable_half_matrices() {
    let error = parse("#extension GL_EXT_shader_16bit_storage : enable\nf16mat2 m;\n")
        .expect_err("matrices need arithmetic");
    assert!(
        matches!(error.kind, ParseErrorKind::ExtensionRequired { ref word, .. } if word == "f16mat2"),
        "{error}"
    );
    let disabled = "#extension GL_EXT_shader_16bit_storage : enable\n\
        #extension GL_EXT_shader_16bit_storage : disable\nfloat16_t x;\n";
    assert!(parse(disabled).is_err());
}

#[test]
fn sized_literal_suffixes_are_lexed_like_glslang() {
    let cases = [
        ("1l", NumericKind::Int64, "1", "l"),
        ("2UL", NumericKind::Uint64, "2", "UL"),
        ("0x10ul", NumericKind::Uint64, "0x10", "ul"),
        ("3s", NumericKind::Int16, "3", "s"),
        ("4us", NumericKind::Uint16, "4", "us"),
        ("0x8001US", NumericKind::Uint16, "0x8001", "US"),
        ("1.5hf", NumericKind::Float16, "1.5", "hf"),
        ("2.0HF", NumericKind::Float16, "2.0", "HF"),
        ("2.5Lf", NumericKind::Double, "2.5", "Lf"),
        ("1e3lF", NumericKind::Double, "1e3", "lF"),
        ("0x1F", NumericKind::Int, "0x1F", ""),
        ("7u", NumericKind::Uint, "7", "u"),
    ];
    for (text, kind, digits, suffix) in cases {
        match &expression(text).kind {
            ExpressionKind::Number(number) => {
                assert_eq!(number.kind, kind, "{text}");
                assert_eq!(number.digits(), digits, "{text}");
                assert_eq!(number.suffix(), suffix, "{text}");
            }
            other => panic!("{text}: {other:?}"),
        }
    }
    assert!(parse("void f() { 1h; }").is_err());
    assert!(parse("void f() { 1.0l; }").is_err());
}

#[test]
fn a_prefix_is_returned_with_the_first_syntax_error() {
    let (unit, error) = crate::parse_prefix("float a;\nvoid f() {}\nfloat16_t b;\nint c;\n");
    assert!(matches!(
        error.as_ref().map(|error| &error.kind),
        Some(ParseErrorKind::ExtensionRequired { .. })
    ));
    assert_eq!(unit.external_declarations.len(), 2);
    let error = error.expect("float16_t is not a type here");
    assert_eq!(error.position.line, 3);
    let (unit, error) = crate::parse_prefix("float a;\n");
    assert_eq!(unit.external_declarations.len(), 1);
    assert!(error.is_none());
}

#[test]
fn nonuniform_needs_its_extension() {
    for (source, line) in [
        ("#version 450\nnonuniformEXT float g;\n", 2),
        (
            "#version 450\nvoid main() {\n    int a = 1;\n    int b = nonuniformEXT(a);\n}\n",
            4,
        ),
        ("#version 450\nvoid f(nonuniformEXT int a) {}\n", 2),
    ] {
        let error = parse(source).expect_err("nonuniformEXT needs an extension");
        assert_eq!(error.position.line, line, "{source}");
        assert_eq!(
            error.kind,
            ParseErrorKind::ExtensionRequired {
                word: "nonuniformEXT".into(),
                extensions: "GL_EXT_nonuniform_qualifier".into(),
            },
            "{source}"
        );
    }
}

#[test]
fn nonuniform_is_a_qualifier_and_a_constructor() {
    let source = "#version 450\n#extension GL_EXT_nonuniform_qualifier : enable\n\
        layout(location = 0) nonuniformEXT in flat int i;\n\
        nonuniformEXT int f(nonuniformEXT in int a) {\n    return a;\n}\n\
        void main() {\n    nonuniformEXT int b = nonuniformEXT(i);\n    nonuniformEXT(b);\n}\n";
    let printed = round_trip(source);
    assert!(printed.contains("nonuniformEXT in flat int i"), "{printed}");
    assert!(printed.contains("nonuniformEXT(i)"), "{printed}");
    let parsed = unit(source);
    let qualifiers = parsed
        .external_declarations
        .iter()
        .filter_map(|declaration| match declaration {
            ExternalDeclaration::Declaration(Declaration {
                kind: DeclarationKind::InitDeclaratorList(list),
                ..
            }) => list.ty.qualifier.clone(),
            _ => None,
        })
        .flat_map(|qualifier| qualifier.node.qualifiers)
        .map(|single| single.node)
        .collect::<Vec<_>>();
    assert!(qualifiers.contains(&SingleTypeQualifier::NonUniform));
    let call = crate::expressions(&parsed)
        .into_iter()
        .find_map(|expression| match &expression.kind {
            ExpressionKind::FunctionCall(call) => match &call.function.node {
                FunctionIdentifier::Function(name) if name == "nonuniformEXT" => {
                    Some(call.arguments.len())
                }
                _ => None,
            },
            _ => None,
        });
    assert_eq!(call, Some(1));
}
