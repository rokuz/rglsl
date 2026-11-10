use alloc::string::String;

use crate::{line_column, parse, LineColumn, ParseError, ParseErrorKind, Span};

fn error(source: &str) -> ParseError {
    match parse(source) {
        Err(error) => error,
        Ok(unit) => panic!("expected an error, parsed:\n{unit}"),
    }
}

fn position(line: u32, column: u32) -> LineColumn {
    LineColumn { line, column }
}

#[test]
fn unterminated_block() {
    let found = error("void main() {\n    int a;\n");
    assert!(matches!(found.kind, ParseErrorKind::UnexpectedToken { .. }));
    assert_eq!(found.position, position(3, 1));
    assert_eq!(found.span, Span::new(25, 25));
    assert_eq!(
        alloc::format!("{found}"),
        "3:1: expected `}`, found the end of the source"
    );
}

#[test]
fn unexpected_token() {
    let found = error("void main() {\n    int a = ;\n}\n");
    assert_eq!(
        found.kind,
        ParseErrorKind::UnexpectedToken {
            expected: String::from("an expression"),
            found: String::from("`;`"),
        }
    );
    assert_eq!(found.position, position(2, 13));
    assert_eq!(
        found.span.text("void main() {\n    int a = ;\n}\n"),
        Some(";")
    );
}

#[test]
fn unsupported_directives() {
    for (source, name) in [
        ("#version 450\n#define A 1\n", "define"),
        ("#version 450\n  #  ifdef A\n#endif\n", "ifdef"),
        ("#include \"a.glsl\"\n", "include"),
        ("#line 3\n", "line"),
        ("#\n", ""),
        ("#define A(x) \\\n  x\n", "define"),
    ] {
        let found = error(source);
        assert_eq!(
            found.kind,
            ParseErrorKind::UnsupportedDirective(String::from(name))
        );
        assert!(alloc::format!("{found}").contains("preprocessor directives are not supported yet"));
    }
    assert_eq!(
        error("#version 450\n#define A 1\n").position,
        position(2, 1)
    );
    assert_eq!(
        error("#version 450\n  #  ifdef A\n").position,
        position(2, 3)
    );
}

#[test]
fn malformed_directives() {
    for source in [
        "#version\n",
        "#version core\n",
        "#version 450 core extra\n",
        "#extension GL_EXT_foo\n",
        "#extension GL_EXT_foo : sometimes\n",
        "#extension : enable\n",
        "#pragma a \\\n b\n",
    ] {
        assert!(
            matches!(error(source).kind, ParseErrorKind::MalformedDirective(_)),
            "{source}"
        );
    }
    assert_eq!(
        error("void main() {\n    a = 1 # 2;\n}\n").kind,
        ParseErrorKind::UnexpectedCharacter('#')
    );
}

#[test]
fn unterminated_comment() {
    let found = error("int a;\n  /* never closed\nint b;\n");
    assert_eq!(found.kind, ParseErrorKind::UnterminatedComment);
    assert_eq!(found.position, position(2, 3));
    assert_eq!(error("/*/").kind, ParseErrorKind::UnterminatedComment);
}

#[test]
fn comments_are_skipped() {
    let with = parse("int /* a */ a // b\n= /* c\n */ 1; // d");
    let without = parse("int a = 1;");
    assert!(with.is_ok());
    assert_eq!(with, without);
}

#[test]
fn unexpected_characters() {
    assert_eq!(
        error("int a = 1 @ 2;").kind,
        ParseErrorKind::UnexpectedCharacter('@')
    );
    let found = error("int a;\nint \u{e9}t\u{e9};\n");
    assert_eq!(found.kind, ParseErrorKind::UnexpectedCharacter('\u{e9}'));
    assert_eq!(found.position, position(2, 5));
    assert_eq!(
        error("int a = \"text").kind,
        ParseErrorKind::UnterminatedString
    );
}

#[test]
fn unknown_types_and_reserved_names() {
    assert_eq!(
        error("Unknown a;").kind,
        ParseErrorKind::UnknownType(String::from("Unknown"))
    );
    assert_eq!(
        error("int float;").kind,
        ParseErrorKind::ReservedWord(String::from("float"))
    );
    assert_eq!(
        error("void f() { a.in; }").kind,
        ParseErrorKind::ReservedWord(String::from("in"))
    );
}

#[test]
fn assignment_needs_a_unary_expression_on_the_left() {
    assert!(parse("void f() { a + b = c; }").is_err());
    assert!(parse("void f() { a ? b : c = d; }").is_ok());
    assert!(parse("void f() { (a + b) = c; }").is_ok());
    assert!(parse("void f() { -a = c; }").is_ok());
    assert!(parse("void f() { a[0].x++ += c; }").is_ok());
}

#[test]
fn rejected_constructs() {
    for source in [
        "void f() { void g() { } }",
        "void f() { int g() { return 1; } }",
        "struct S { };",
        "uniform B { } b;",
        "struct S { int a = 1; };",
        "void f() { while (int a) { } }",
        "void f() { for (int a = 0; int b; ) { } }",
        "void f() { if (int a = 1) { } }",
        "void f() { do a; while (int b = 1); }",
        "void f() { switch (a) case 1: break; }",
        "void f() { float a = float[2; }",
        "void f() { a = (1; }",
        "void f() { a.; }",
        "void f() { case 1 }",
        "void f() { return 1 }",
        "void f(int a,) { }",
        "void f() { g(a,); }",
        "layout() in;",
        "layout(a = ) in;",
        "layout(location = 0, in) in vec4 a;",
        "int a[;",
        "int a = {1, 2;",
        "int a b;",
        "precision float;",
        "precision highp;",
        "void f() { else a; }",
        "void f() { } }",
        "int;;int",
        "#version 450\nvoid main() {\n#pragma inside\n}\n",
    ] {
        assert!(parse(source).is_err(), "{source}");
    }
}

#[test]
fn accepted_oddities_of_the_grammar() {
    for source in [
        "void f() { case 1: ; default: ; }",
        "void f() { (g)(1); a[0](2); g(1)(2); a.b.c(3); }",
        "void f() { float(1).x; vec2(1)[0]; }",
        "int;",
        "struct S { int a; } ;",
        "const;",
        "void f() { if (a) ; else ; }",
        "void f() { float a, b = a, c[2]; }",
        "void f() { for (a, b; ; a++, b++) ; }",
        "void f(const in highp float[2] a[3]);",
        "void f() { switch (a) { } }",
    ] {
        assert!(parse(source).is_ok(), "{source}");
        super::round_trip(source);
    }
}

#[test]
fn line_and_column_from_offsets() {
    let source = "ab\nc\u{e9}d\n\nx";
    assert_eq!(line_column(source, 0), position(1, 1));
    assert_eq!(line_column(source, 2), position(1, 3));
    assert_eq!(line_column(source, 3), position(2, 1));
    assert_eq!(line_column(source, 6), position(2, 3));
    assert_eq!(line_column(source, 8), position(3, 1));
    assert_eq!(line_column(source, 9), position(4, 1));
    assert_eq!(line_column(source, 1000), position(4, 2));
    assert_eq!(line_column("", 0), position(1, 1));
}
