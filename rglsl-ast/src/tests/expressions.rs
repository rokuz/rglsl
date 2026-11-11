use alloc::format;
use alloc::string::ToString;

use super::{expression, shape_of, statement};
use crate::ast::{
    AssignmentOperator, BinaryOperator, ExpressionKind, FunctionIdentifier, NumericKind,
    StatementKind, TypeSpecifierNonArray,
};
use crate::{parse, ParseErrorKind};

#[test]
fn multiplicative_binds_tighter_than_additive() {
    assert_eq!(shape_of("a + b * c"), "(+ a (* b c))");
    assert_eq!(shape_of("a * b + c"), "(+ (* a b) c)");
    assert_eq!(shape_of("a + b % c - d / e"), "(- (+ a (% b c)) (/ d e))");
}

#[test]
fn binary_operators_associate_to_the_left() {
    assert_eq!(shape_of("a - b - c"), "(- (- a b) c)");
    assert_eq!(shape_of("a / b * c"), "(* (/ a b) c)");
    assert_eq!(shape_of("a << b >> c"), "(>> (<< a b) c)");
    assert_eq!(shape_of("a < b < c"), "(< (< a b) c)");
}

#[test]
fn every_precedence_level_is_ordered() {
    assert_eq!(
        shape_of("a || b ^^ c && d | e ^ f & g == h < i << j + k * l"),
        "(|| a (^^ b (&& c (| d (^ e (& f (== g (< h (<< i (+ j (* k l)))))))))))"
    );
    assert_eq!(
        shape_of("a * b + c << d < e == f & g ^ h | i && j ^^ k || l"),
        "(|| (^^ (&& (| (^ (& (== (< (<< (+ (* a b) c) d) e) f) g) h) i) j) k) l)"
    );
    assert_eq!(shape_of("a < b == c > d"), "(== (< a b) (> c d))");
    assert_eq!(shape_of("a <= b != c >= d"), "(!= (<= a b) (>= c d))");
}

#[test]
fn assignment_associates_to_the_right() {
    assert_eq!(shape_of("a = b = c"), "(= a (= b c))");
    assert_eq!(shape_of("a += b *= c + d"), "(+= a (*= b (+ c d)))");
    assert_eq!(shape_of("a = b ? c : d"), "(= a (? b c d))");
}

#[test]
fn conditional_associates_to_the_right() {
    assert_eq!(shape_of("a ? b : c ? d : e"), "(? a b (? c d e))");
    assert_eq!(shape_of("a ? b ? c : d : e"), "(? a (? b c d) e)");
    assert_eq!(shape_of("a || b ? c : d"), "(? (|| a b) c d)");
    assert_eq!(shape_of("a ? b, c : d = e"), "(? a (, b c) (= d e))");
}

#[test]
fn sequence_is_flat_and_binds_loosest() {
    assert_eq!(shape_of("a = b, c = d, e"), "(, (= a b) (= c d) e)");
    assert_eq!(shape_of("f((a, b), c)"), "(call f (paren (, a b)) c)");
}

#[test]
fn unary_and_postfix_bind_tighter_than_binary() {
    assert_eq!(shape_of("-a * b"), "(* (pre- a) b)");
    assert_eq!(shape_of("!a && ~b == c"), "(&& (pre! a) (== (pre~ b) c))");
    assert_eq!(
        shape_of("-a.b[1]++"),
        "(pre- (post++ (index (field a b) 1)))"
    );
    assert_eq!(shape_of("++a--"), "(pre++ (post-- a))");
    assert_eq!(shape_of("a+++b"), "(+ (post++ a) b)");
    assert_eq!(shape_of("a - -b"), "(- a (pre- b))");
    assert_eq!(shape_of("+-!~a"), "(pre+ (pre- (pre! (pre~ a))))");
}

#[test]
fn nested_signs_are_printed_apart() {
    assert_eq!(expression("- -a").to_string(), "- -a");
    assert_eq!(expression("- --a").to_string(), "- --a");
    assert_eq!(expression("+ +a").to_string(), "+ +a");
    assert_eq!(expression("-+a").to_string(), "- +a");
    assert_eq!(expression("!-a").to_string(), "!-a");
    assert_eq!(expression("a - - b").to_string(), "a - -b");
}

#[test]
fn parentheses_are_kept() {
    assert_eq!(shape_of("(a + b) * c"), "(* (paren (+ a b)) c)");
    assert_eq!(shape_of("((a))"), "(paren (paren a))");
    assert_eq!(expression("( a+b )*c").to_string(), "(a + b) * c");
}

#[test]
fn every_binary_operator_round_trips() {
    for operator in BinaryOperator::ALL {
        let text = format!("a {} b", operator.symbol());
        let parsed = expression(&text);
        assert!(
            matches!(parsed.kind, ExpressionKind::Binary { operator: found, .. } if found == operator),
            "{text}"
        );
        assert_eq!(parsed.to_string(), text);
    }
}

#[test]
fn every_assignment_operator_round_trips() {
    for operator in AssignmentOperator::ALL {
        let text = format!("a {} b", operator.symbol());
        let parsed = expression(&text);
        assert!(
            matches!(parsed.kind, ExpressionKind::Assignment { operator: found, .. } if found == operator),
            "{text}"
        );
        assert_eq!(parsed.to_string(), text);
    }
}

#[test]
fn postfix_forms() {
    assert_eq!(shape_of("a.b.c"), "(field (field a b) c)");
    assert_eq!(shape_of("a[1][2]"), "(index (index a 1) 2)");
    assert_eq!(shape_of("a.xyz.length()"), "(method (field a xyz) length )");
    assert_eq!(shape_of("f(a)[0].x"), "(field (index (call f a) 0) x)");
    assert_eq!(shape_of("f()"), "(call f )");
    assert_eq!(shape_of("f(void)"), "(call f )");
    assert_eq!(expression("a . length ( )").to_string(), "a.length()");
}

#[test]
fn constructors() {
    assert_eq!(shape_of("vec3(1.0, a, b)"), "(construct 1.0 a b)");
    assert_eq!(
        expression("float[3](1.0, 2.0, 3.0)").to_string(),
        "float[3](1.0, 2.0, 3.0)"
    );
    assert_eq!(
        expression("float[](1.0, 2.0)").to_string(),
        "float[](1.0, 2.0)"
    );
    assert_eq!(expression("mat2x2(1.0)").to_string(), "mat2(1.0)");
    assert_eq!(expression("dmat3x4(1.0lf)").to_string(), "dmat3x4(1.0lf)");
    assert_eq!(
        expression("int[2][3](int[3](1, 2, 3), int[3](4, 5, 6)).length()").to_string(),
        "int[2][3](int[3](1, 2, 3), int[3](4, 5, 6)).length()"
    );
    let array = expression("uvec2[2](a, b)");
    let ExpressionKind::FunctionCall(call) = &array.kind else {
        panic!("{array:?}");
    };
    let FunctionIdentifier::Constructor(specifier) = &call.function.node else {
        panic!("{call:?}");
    };
    assert!(matches!(
        specifier.non_array,
        TypeSpecifierNonArray::Basic(_)
    ));
    assert!(specifier.array.is_some());
}

#[test]
fn struct_names_construct_and_other_names_call() {
    let source =
        "struct S { int a; };\nvoid f() {\n    S(1);\n    S[2](S(1), S(2));\n    g(1);\n}\n";
    let body = super::body_of(source);
    let functions: alloc::vec::Vec<_> = body
        .iter()
        .map(|statement| match &statement.kind {
            StatementKind::Expression(Some(expression)) => match &expression.kind {
                ExpressionKind::FunctionCall(call) => call.function.node.clone(),
                other => panic!("{other:?}"),
            },
            other => panic!("{other:?}"),
        })
        .collect();
    assert!(matches!(
        functions.as_slice(),
        [
            FunctionIdentifier::Constructor(_),
            FunctionIdentifier::Constructor(_),
            FunctionIdentifier::Function(_),
        ]
    ));
    super::round_trip(source);
}

#[test]
fn numeric_literals_keep_their_text_and_suffix() {
    let cases = [
        ("0", NumericKind::Int, ""),
        ("123", NumericKind::Int, ""),
        ("017", NumericKind::Int, ""),
        ("0x1F", NumericKind::Int, ""),
        ("0XabcU", NumericKind::Uint, "U"),
        ("1u", NumericKind::Uint, "u"),
        ("07u", NumericKind::Uint, "u"),
        ("1.0", NumericKind::Float, ""),
        ("1.", NumericKind::Float, ""),
        (".5", NumericKind::Float, ""),
        ("1e5", NumericKind::Float, ""),
        ("1E+5", NumericKind::Float, ""),
        ("1.5e-3f", NumericKind::Float, "f"),
        ("2.0F", NumericKind::Float, "F"),
        ("3.0lf", NumericKind::Double, "lf"),
        (".5e1LF", NumericKind::Double, "LF"),
        ("09.5", NumericKind::Float, ""),
        ("10.fe2m1", NumericKind::FloatE2M1, "fe2m1"),
        ("1.0fe3m2", NumericKind::FloatE3M2, "fe3m2"),
        ("1e2fe2m3", NumericKind::FloatE2M3, "fe2m3"),
        ("1.0fue8m0", NumericKind::FloatUE8M0, "fue8m0"),
        ("0.5fmxint8", NumericKind::FloatMXINT8, "fmxint8"),
    ];
    for (text, kind, suffix) in cases {
        let parsed = expression(text);
        let ExpressionKind::Number(literal) = &parsed.kind else {
            panic!("{text}: {parsed:?}");
        };
        assert_eq!(literal.kind, kind, "{text}");
        assert_eq!(literal.text, text);
        assert_eq!(literal.suffix(), suffix, "{text}");
        assert_eq!(format!("{}{}", literal.digits(), literal.suffix()), text);
        assert_eq!(parsed.to_string(), text);
    }
}

#[test]
fn malformed_numeric_literals_are_errors() {
    for text in [
        "08",
        "1f",
        "0x",
        "1.0lff",
        "1e",
        "1.0fu",
        "12abc",
        "1.x",
        "0x1.0",
        "1.0Fe2m1",
        "1.0fe2m1x",
        "1.0fe4m3",
    ] {
        let source = format!("void f() {{ a = {text}; }}");
        match parse(&source) {
            Err(error) => assert!(
                matches!(
                    error.kind,
                    ParseErrorKind::InvalidNumber(_) | ParseErrorKind::UnexpectedToken { .. }
                ),
                "{text}: {error}"
            ),
            Ok(unit) => panic!("{text} parsed as {unit}"),
        }
    }
}

#[test]
fn boolean_literals() {
    assert!(matches!(
        expression("true").kind,
        ExpressionKind::Bool(true)
    ));
    assert!(matches!(
        expression("false").kind,
        ExpressionKind::Bool(false)
    ));
}

#[test]
fn expression_statement_wraps_the_expression() {
    let parsed = statement("a = b + 1;");
    assert!(matches!(parsed.kind, StatementKind::Expression(Some(_))));
}
