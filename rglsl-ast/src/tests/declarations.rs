use alloc::string::{String, ToString};
use alloc::vec::Vec;

use super::{declaration, round_trip, unit};
use crate::ast::{
    ArrayDimension, BasicType, DeclarationKind, Dimension, DirectiveKind, ExtensionBehavior,
    ExternalDeclaration, FullySpecifiedType, Initializer, InterpolationQualifier,
    PrecisionQualifier, ScalarType, SingleTypeQualifier, StorageQualifier, TypeSpecifierNonArray,
};
use crate::keywords::{is_keyword, is_opaque_type_keyword, is_reserved_word, is_unavailable_word};

fn qualifiers(ty: &FullySpecifiedType) -> Vec<SingleTypeQualifier> {
    ty.qualifier
        .iter()
        .flat_map(|qualifier| qualifier.qualifiers.iter())
        .map(|single| single.node.clone())
        .collect()
}

fn variables(source: &str) -> crate::ast::InitDeclaratorList {
    match declaration(source).kind {
        DeclarationKind::InitDeclaratorList(list) => list,
        other => panic!("{other:?}"),
    }
}

#[test]
fn qualifier_lists_keep_source_order() {
    let list = variables("layout(location = 0) flat centroid in highp ivec2 a;\n");
    let found = qualifiers(&list.ty);
    assert!(matches!(
        found.first(),
        Some(SingleTypeQualifier::Layout(_))
    ));
    assert_eq!(
        found.get(1..),
        Some(
            [
                SingleTypeQualifier::Interpolation(InterpolationQualifier::Flat),
                SingleTypeQualifier::Storage(StorageQualifier::Centroid),
                SingleTypeQualifier::Storage(StorageQualifier::In),
                SingleTypeQualifier::Precision(PrecisionQualifier::High),
            ]
            .as_slice()
        )
    );
}

#[test]
fn every_simple_qualifier_round_trips() {
    for storage in StorageQualifier::ALL {
        let source = alloc::format!("{} float a;\n", storage.keyword());
        let list = variables(&source);
        assert_eq!(
            qualifiers(&list.ty),
            [SingleTypeQualifier::Storage(storage)],
            "{source}"
        );
        assert_eq!(round_trip(&source), source);
    }
    for word in [
        "smooth",
        "flat",
        "noperspective",
        "highp",
        "mediump",
        "lowp",
        "invariant",
        "precise",
        "subroutine",
        "subroutine(first, second)",
    ] {
        let source = alloc::format!("{word} float a;\n");
        assert_eq!(round_trip(&source), source);
    }
}

#[test]
fn layout_qualifier_ids_keep_their_expressions() {
    let list = variables(
        "layout(set = 1, binding = 2 * N + 1, rgba8, shared, offset = (4)) uniform readonly image2D a;\n",
    );
    let found = qualifiers(&list.ty);
    let Some(SingleTypeQualifier::Layout(layout)) = found.first() else {
        panic!("{found:?}");
    };
    let rendered: Vec<String> = layout
        .ids
        .iter()
        .map(|id| match &id.value {
            Some(value) => alloc::format!("{}={value}", id.name.node),
            None => id.name.node.clone(),
        })
        .collect();
    assert_eq!(
        rendered,
        [
            "set=1",
            "binding=2 * N + 1",
            "rgba8",
            "shared",
            "offset=(4)"
        ]
    );
    assert_eq!(
        round_trip("layout(local_size_x = 8, local_size_y = 8) in;\n"),
        "layout(local_size_x = 8, local_size_y = 8) in;\n"
    );
}

#[test]
fn qualifier_only_declarations() {
    assert!(matches!(
        declaration("layout(early_fragment_tests) in;\n").kind,
        DeclarationKind::Qualifier(_)
    ));
    let DeclarationKind::QualifiedIdentifiers { identifiers, .. } =
        declaration("invariant gl_Position, other;\n").kind
    else {
        panic!("expected qualified identifiers");
    };
    let names: Vec<&str> = identifiers.iter().map(|name| name.node.as_str()).collect();
    assert_eq!(names, ["gl_Position", "other"]);
    assert_eq!(round_trip("precise a;\n"), "precise a;\n");
}

#[test]
fn precision_declaration() {
    let DeclarationKind::Precision { qualifier, ty } =
        declaration("precision mediump sampler2D;\n").kind
    else {
        panic!("expected a precision declaration");
    };
    assert_eq!(qualifier.node, PrecisionQualifier::Medium);
    assert_eq!(
        ty.non_array,
        TypeSpecifierNonArray::Opaque(String::from("sampler2D"))
    );
}

#[test]
fn array_specifiers_on_types_and_on_declarators_are_distinct() {
    let on_type = variables("int[3] a;\n");
    let on_name = variables("int a[3];\n");
    assert_ne!(on_type, on_name);
    assert!(on_type.ty.specifier.array.is_some());
    assert!(on_type
        .declarators
        .iter()
        .all(|declarator| declarator.array.is_none()));
    assert!(on_name.ty.specifier.array.is_none());
    assert!(on_name
        .declarators
        .iter()
        .all(|declarator| declarator.array.is_some()));
    assert_eq!(
        round_trip("int[3] a;\nint b[3];\n"),
        "int[3] a;\nint b[3];\n"
    );
}

#[test]
fn arrays_of_arrays_and_unsized_arrays() {
    let list = variables("float[2][3] a[4][], b, c[N + 1];\n");
    let dimensions =
        |array: &Option<crate::ast::Spanned<crate::ast::ArraySpecifier>>| -> Vec<bool> {
            array
                .iter()
                .flat_map(|specifier| specifier.dimensions.iter())
                .map(|dimension| matches!(dimension.node, ArrayDimension::Sized(_)))
                .collect()
        };
    assert_eq!(dimensions(&list.ty.specifier.array), [true, true]);
    let per_declarator: Vec<Vec<bool>> = list
        .declarators
        .iter()
        .map(|declarator| dimensions(&declarator.array))
        .collect();
    assert_eq!(
        per_declarator,
        [alloc::vec![true, false], alloc::vec![], alloc::vec![true]]
    );
    assert_eq!(
        round_trip("float[2][3] a[4][], b, c[N + 1];\n"),
        "float[2][3] a[4][], b, c[N + 1];\n"
    );
    assert_eq!(
        round_trip("float[] f(int[2] a[3], float[]);\n"),
        "float[] f(int[2] a[3], float[]);\n"
    );
}

#[test]
fn initializer_lists() {
    let list = variables("float a[2][2] = {{1.0, 2.0}, {3.0, 4.0,},}, b = 1.0, c[] = {};\n");
    let shapes: Vec<String> = list
        .declarators
        .iter()
        .map(
            |declarator| match declarator.initializer.as_ref().map(|found| &found.node) {
                Some(Initializer::List(elements)) => alloc::format!("list of {}", elements.len()),
                Some(Initializer::Expression(_)) => String::from("expression"),
                None => String::from("none"),
            },
        )
        .collect();
    assert_eq!(shapes, ["list of 2", "expression", "list of 0"]);
    assert_eq!(
        round_trip("float a[2][2] = {{1.0, 2.0}, {3.0, 4.0,},}, b = 1.0, c[] = {};\n"),
        "float a[2][2] = {{1.0, 2.0}, {3.0, 4.0}}, b = 1.0, c[] = {};\n"
    );
}

#[test]
fn struct_declarations() {
    let source = "struct Light {\n    vec3 position, color;\n    float weights[4];\n    struct Inner {\n        int a;\n    } inner;\n};\n\nconst struct {\n    int a;\n} anonymous = {1}, other;\n\nLight lights[2];\n";
    assert_eq!(round_trip(source), source);
    let parsed = unit(source);
    let Some(ExternalDeclaration::Declaration(first)) = parsed.external_declarations.first() else {
        panic!("{parsed:?}");
    };
    let DeclarationKind::InitDeclaratorList(list) = &first.kind else {
        panic!("{first:?}");
    };
    let TypeSpecifierNonArray::Struct(specifier) = &list.ty.specifier.non_array else {
        panic!("{list:?}");
    };
    assert_eq!(
        specifier.name.as_ref().map(|name| name.node.as_str()),
        Some("Light")
    );
    assert_eq!(specifier.declarations.len(), 3);
    assert!(list.declarators.is_empty());
}

#[test]
fn struct_names_become_type_names_in_their_scope() {
    assert!(crate::parse("void f() { struct S { int a; }; S s; }\nS t;\n").is_err());
    assert!(crate::parse("struct S { int a; };\nvoid f() { S s; }\nS t;\n").is_ok());
}

#[test]
fn interface_blocks() {
    let source = "layout(std140, binding = 0) uniform Camera {\n    mat4 view;\n    layout(offset = 64) vec3 eye;\n    float planes[2];\n} camera;\n\nbuffer Data {\n    readonly int count;\n    float values[];\n} data[3][];\n\nin Varyings {\n    flat int id;\n};\n";
    assert_eq!(round_trip(source), source);
    let parsed = unit(source);
    let instances: Vec<Option<(String, usize)>> = parsed
        .external_declarations
        .iter()
        .map(|external| match external {
            ExternalDeclaration::Declaration(found) => match &found.kind {
                DeclarationKind::Block { instance, .. } => instance.as_ref().map(|instance| {
                    let dimensions = instance
                        .array
                        .as_ref()
                        .map_or(0, |array| array.dimensions.len());
                    (instance.name.node.clone(), dimensions)
                }),
                other => panic!("{other:?}"),
            },
            other => panic!("{other:?}"),
        })
        .collect();
    assert_eq!(
        instances,
        [
            Some((String::from("camera"), 0)),
            Some((String::from("data"), 2)),
            None
        ]
    );
}

#[test]
fn function_prototypes_and_definitions() {
    let source = "float f(in float a, out vec2 b[2], inout highp int, const mat3x2 m);\n\nvoid g();\n\nint[2] h(void) {\n    return int[2](1, 2);\n}\n";
    let printed = round_trip(source);
    assert_eq!(
        printed,
        "float f(in float a, out vec2 b[2], inout highp int, const mat3x2 m);\nvoid g();\n\nint[2] h() {\n    return int[2](1, 2);\n}\n"
    );
    let DeclarationKind::FunctionPrototype(prototype) = declaration("void f(int a, float);\n").kind
    else {
        panic!("expected a prototype");
    };
    let names: Vec<Option<&str>> = prototype
        .parameters
        .iter()
        .map(|parameter| parameter.name.as_ref().map(|name| name.node.as_str()))
        .collect();
    assert_eq!(names, [Some("a"), None]);
}

#[test]
fn basic_type_keywords() {
    assert_eq!(
        BasicType::from_keyword("double"),
        Some(BasicType::Scalar(ScalarType::Double))
    );
    assert_eq!(
        BasicType::from_keyword("uvec3"),
        Some(BasicType::Vector {
            scalar: ScalarType::Uint,
            size: Dimension::Three
        })
    );
    assert_eq!(
        BasicType::from_keyword("dmat4x2"),
        Some(BasicType::Matrix {
            scalar: ScalarType::Double,
            columns: Dimension::Four,
            rows: Dimension::Two
        })
    );
    assert_eq!(
        BasicType::from_keyword("mat3").map(|basic| basic.to_string()),
        Some(String::from("mat3"))
    );
    for word in ["vec5", "mat2x", "mat5", "imat2", "bmat2", "vec", "floats"] {
        assert_eq!(BasicType::from_keyword(word), None, "{word}");
    }
    let source = "bool a;\nint b;\nuint c;\nfloat d;\ndouble e;\nbvec2 f;\nivec3 g;\nuvec4 h;\nvec2 i;\ndvec3 j;\nmat2 k;\nmat3x4 l;\ndmat4 m;\ndmat2x3 n;\n";
    assert_eq!(round_trip(source), source);
}

#[test]
fn opaque_type_keywords() {
    for word in [
        "sampler2D",
        "sampler1DArrayShadow",
        "samplerCubeArrayShadow",
        "isampler2DMSArray",
        "usamplerBuffer",
        "texture2D",
        "itextureCubeArray",
        "utexture1D",
        "image3D",
        "iimage2DMS",
        "uimageBuffer",
        "sampler",
        "samplerShadow",
        "subpassInput",
        "isubpassInputMS",
        "usubpassInput",
        "atomic_uint",
    ] {
        assert!(is_opaque_type_keyword(word), "{word}");
        assert!(is_keyword(word), "{word}");
        let source = alloc::format!("uniform {word} a;\n");
        assert_eq!(round_trip(&source), source);
    }
    for word in [
        "isampler2DShadow",
        "texture2DShadow",
        "sampler4D",
        "image",
        "texture",
        "isampler",
        "texture2DRect",
        "packed",
    ] {
        assert!(!is_reserved_word(word), "{word}");
        let source = alloc::format!("int {word};\n");
        assert_eq!(round_trip(&source), source);
    }
}

#[test]
fn reserved_words_cannot_be_names() {
    for word in [
        "sampler2DRect",
        "image2DRect",
        "sampler3DRect",
        "resource",
        "superp",
        "goto",
        "inline",
        "pervertexNV",
        "attachmentEXT",
    ] {
        assert!(is_unavailable_word(word), "{word}");
        for source in [
            alloc::format!("int {word};"),
            alloc::format!("{word} a;"),
            alloc::format!("void f() {{ {word}; }}"),
        ] {
            let error = crate::parse(&source).expect_err(&source);
            assert_eq!(
                error.kind,
                crate::ParseErrorKind::ReservedWord(String::from(word))
            );
        }
    }
    for word in [
        "float",
        "struct",
        "in",
        "attribute",
        "subroutine",
        "while",
        "true",
        "sampler2D",
    ] {
        assert!(is_keyword(word), "{word}");
        assert!(
            crate::parse(&alloc::format!("int {word};")).is_err(),
            "{word}"
        );
    }
}

#[test]
fn directives_are_parsed_and_kept_verbatim() {
    let source = "#version 460 core\n# extension GL_GOOGLE_include_directive : require\n#pragma optimize(off)\n#pragma STDGL invariant(all)\nvoid main() {\n}\n";
    let parsed = unit(source);
    let kinds: Vec<DirectiveKind> = parsed
        .external_declarations
        .iter()
        .filter_map(|external| match external {
            ExternalDeclaration::Directive(directive) => Some(directive.kind.clone()),
            _ => None,
        })
        .collect();
    let words = |tokens: &[&str]| tokens.iter().map(|token| String::from(*token)).collect();
    assert_eq!(
        kinds,
        [
            DirectiveKind::Version {
                number: 460,
                profile: Some(String::from("core"))
            },
            DirectiveKind::Extension {
                name: String::from("GL_GOOGLE_include_directive"),
                behavior: ExtensionBehavior::Require
            },
            DirectiveKind::Pragma {
                tokens: words(&["optimize", "(", "off", ")"])
            },
            DirectiveKind::Pragma {
                tokens: words(&["STDGL", "invariant", "(", "all", ")"])
            },
        ]
    );
    assert_eq!(
        round_trip(source),
        "#version 460 core\n# extension GL_GOOGLE_include_directive : require\n#pragma optimize(off)\n#pragma STDGL invariant(all)\n\nvoid main() {\n}\n"
    );
    assert_eq!(
        round_trip("#version 450 // trailing\n/* lead */ #pragma once\n"),
        "#version 450\n#pragma once\n"
    );
}

#[test]
fn stray_semicolons_and_empty_sources() {
    assert_eq!(round_trip(";\nint a;\n;\n"), ";\nint a;\n;\n");
    assert!(unit("").external_declarations.is_empty());
    assert!(unit(" \n// nothing\n/* at all */\n")
        .external_declarations
        .is_empty());
}
