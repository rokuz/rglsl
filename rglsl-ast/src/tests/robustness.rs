use alloc::collections::BTreeSet;
use alloc::string::String;
use alloc::vec::Vec;

use super::{body_of, round_trip, unit};
use crate::ast::{DeclarationKind, ExpressionKind, ExternalDeclaration, NodeId, StatementKind};
use crate::{parse, print};

const SHADER: &str = "#version 450\n#extension GL_EXT_scalar_block_layout : enable\nprecision highp float;\nlayout(location = 0) out vec4 color;\nlayout(set = 0, binding = 1, std140) uniform Params {\n    vec2 resolution;\n    float weights[4];\n} params[2];\nstruct Item { int key; float value[2]; };\nconst int COUNT = 0x10, MASK = 077;\nuniform sampler2D image;\nfloat weigh(in Item item, inout float total, const uint steps);\nfloat weigh(in Item item, inout float total, const uint steps) {\n    for (uint i = 0u; i < steps; ++i) {\n        total += item.value[i % 2u] * 1.5e-1f;\n        if (total > 1e3) break; else continue;\n    }\n    return total;\n}\nvoid main() {\n    Item items[2] = Item[2](Item(1, float[2](0.5, .25)), Item(2, float[](1., 2.0)));\n    float grid[2][2] = {{0.0, 1.0}, {2.0, 3.0}};\n    float total = 0.0lf > 1.0LF ? 1.0 : -grid[1][0];\n    int index = COUNT & MASK | 1 ^ 2 << 3 >> 1;\n    bool flag = !(index == 3) && total >= 0.0 || index != 4 ^^ true;\n    while (bool more = index-- > 0) { total = weigh(items[index % 2], total, 3u); }\n    do { index++, total -= 1.0; } while (index < items.length());\n    switch (index) {\n        case 0:\n        case 1: color = vec4(total); break;\n        default: { discard; }\n    }\n    color = flag ? texture(image, gl_FragCoord.xy / params[0].resolution) : vec4(grid[0], ~index, +total);\n    ;\n}\n";

#[test]
fn a_shader_using_every_construct_round_trips() {
    let printed = round_trip(SHADER);
    assert_eq!(printed, print(&unit(&printed)));
}

#[test]
fn layout_does_not_change_the_tree() {
    let spaced: String = SHADER
        .lines()
        .map(|line| {
            if line.starts_with('#') {
                alloc::format!("{line}\n")
            } else {
                alloc::format!("  /* pad */  {}  // tail\n\n", line.replace(' ', "  "))
            }
        })
        .collect();
    let (plain, padded) = (unit(SHADER), unit(&spaced));
    assert_eq!(plain, padded);
    assert_eq!(plain.next_id(), padded.next_id());
    assert_eq!(print(&plain), print(&padded));
}

#[test]
fn node_ids_are_unique_and_below_the_next_id() {
    let mut parsed = unit(SHADER);
    let debug = alloc::format!("{parsed:?}");
    let ids: Vec<u32> = debug
        .split("NodeId(")
        .skip(1)
        .filter_map(|rest| rest.split(')').next())
        .filter_map(|digits| digits.parse().ok())
        .collect();
    let distinct: BTreeSet<u32> = ids.iter().copied().collect();
    assert!(ids.len() > 150, "{}", ids.len());
    assert_eq!(ids.len(), distinct.len());
    let next = parsed.next_id();
    assert_eq!(u32::try_from(ids.len()).ok(), Some(next.index()));
    assert!(distinct.iter().all(|id| *id < next.index()));
    assert_eq!(parsed.allocate_id(), Some(next));
    assert_eq!(parsed.next_id(), NodeId::new(next.index() + 1));
}

#[test]
fn spans_point_at_the_source_text() {
    let source = "uniform  float[2] scale [3] = X;\nvoid main() {\n    x = a +\n b * 2;\n}\n";
    let parsed = unit(source);
    let text = |span: crate::Span| span.text(source).unwrap_or("<invalid>");
    let Some(ExternalDeclaration::Declaration(first)) = parsed.external_declarations.first() else {
        panic!("{parsed:?}");
    };
    assert_eq!(text(first.span), "uniform  float[2] scale [3] = X;");
    let DeclarationKind::InitDeclaratorList(list) = &first.kind else {
        panic!("{first:?}");
    };
    assert_eq!(text(list.ty.span), "uniform  float[2]");
    assert_eq!(text(list.ty.specifier.span), "float[2]");
    let qualifier_spans: Vec<&str> = list
        .ty
        .qualifier
        .iter()
        .flat_map(|qualifier| qualifier.qualifiers.iter())
        .map(|single| text(single.span))
        .collect();
    assert_eq!(qualifier_spans, ["uniform"]);
    let declarator_spans: Vec<(&str, &str)> = list
        .declarators
        .iter()
        .map(|declarator| (text(declarator.span), text(declarator.name.span)))
        .collect();
    assert_eq!(declarator_spans, [("scale [3] = X", "scale")]);
    let body = body_of(source);
    let Some(statement) = body.first() else {
        panic!("{body:?}");
    };
    assert_eq!(text(statement.span), "x = a +\n b * 2;");
    let StatementKind::Expression(Some(assignment)) = &statement.kind else {
        panic!("{statement:?}");
    };
    assert_eq!(text(assignment.span), "x = a +\n b * 2");
    let ExpressionKind::Assignment { value, .. } = &assignment.kind else {
        panic!("{assignment:?}");
    };
    assert_eq!(text(value.span), "a +\n b * 2");
    let ExpressionKind::Binary { right, .. } = &value.kind else {
        panic!("{value:?}");
    };
    assert_eq!(text(right.span), "b * 2");
}

#[test]
fn every_prefix_of_a_shader_parses_or_fails_without_panicking() {
    let mut accepted = 0_usize;
    let mut rejected = 0_usize;
    for (end, _) in SHADER.char_indices() {
        let prefix = SHADER.get(..end).unwrap_or("");
        match parse(prefix) {
            Ok(unit) => {
                accepted += 1;
                assert_eq!(parse(&print(&unit)).ok(), Some(unit));
            }
            Err(error) => {
                rejected += 1;
                assert!(error.span.start <= error.span.end);
                assert!(usize::try_from(error.span.end).is_ok_and(|end| end <= prefix.len()));
            }
        }
    }
    assert!(accepted > 10);
    assert!(rejected > 1000);
}

#[test]
fn mutated_shaders_parse_or_fail_without_panicking() {
    let replacements = [
        "(", ")", "{", "}", "[", "]", ";", ",", "=", "?", ":", ".", "#", "/*", "0x", "1e",
        "\u{e9}", "struct", "void", "case", "",
    ];
    let mut outcomes = 0_usize;
    for (step, (start, character)) in SHADER.char_indices().enumerate() {
        let Some(replacement) = replacements.get(step % replacements.len()) else {
            continue;
        };
        let before = SHADER.get(..start).unwrap_or("");
        let after = SHADER.get(start + character.len_utf8()..).unwrap_or("");
        let mutated = alloc::format!("{before}{replacement}{after}");
        if let Ok(unit) = parse(&mutated) {
            assert_eq!(parse(&print(&unit)).ok(), Some(unit), "{mutated}");
        }
        outcomes += 1;
    }
    assert!(outcomes > 1000);
}

struct Nest {
    open: &'static str,
    core: &'static str,
    close: &'static str,
    tail: &'static str,
    levels_per_repeat: usize,
}

const fn nest(
    open: &'static str,
    core: &'static str,
    close: &'static str,
    tail: &'static str,
    levels_per_repeat: usize,
) -> Nest {
    Nest {
        open,
        core,
        close,
        tail,
        levels_per_repeat,
    }
}

const ALL_PRECEDENCES: &str = "a || b ^^ c && d | e ^ f & g == h < i << j + k * (";

const NESTS: [Nest; 15] = [
    nest("(", "a", ")", ";", 2),
    nest("a ? ", "a", " : a", ";", 2),
    nest("-(", "a", ")", ";", 2),
    nest("a = (", "a", ")", ";", 2),
    nest("f(", "a", ")", ";", 2),
    nest("a[", "a", "]", ";", 2),
    nest(ALL_PRECEDENCES, "a", ")", ";", 12),
    nest("float[", "1", "](1).length()", ";", 2),
    nest("{", "", "}", "", 1),
    nest("if (a) ", ";", "", "", 1),
    nest("if (a) ; else ", ";", "", "", 1),
    nest("for (;;) ", ";", "", "", 1),
    nest("while (a) ", ";", "", "", 1),
    nest("do ", ";", " while (a);", "", 1),
    nest("switch (a) { case 1: ", ";", " }", "", 1),
];

impl Nest {
    fn source(&self, count: usize) -> String {
        alloc::format!(
            "void f() {{ {}{}{}{} }}",
            self.open.repeat(count),
            self.core,
            self.close.repeat(count),
            self.tail
        )
    }
}

#[test]
fn deep_nesting_parses_and_unbalanced_nesting_is_an_error() {
    let huge = 20_000;
    for case in &NESTS {
        assert!(parse(&case.source(huge)).is_ok(), "{}", case.open);
        let unbalanced = alloc::format!("void f() {{ {}", case.open.repeat(huge));
        assert!(parse(&unbalanced).is_err(), "{}", case.open);
    }
    for source in [
        alloc::format!(
            "{}int a; {}",
            "struct { ".repeat(huge),
            "} a; ".repeat(huge)
        ),
        alloc::format!("int a = {}1{};", "{".repeat(huge), "}".repeat(huge)),
    ] {
        assert!(parse(&source).is_ok());
    }
    for source in [
        alloc::format!("int a = {}", "{".repeat(huge)),
        alloc::format!("layout(a = {}", "(".repeat(huge)),
        alloc::format!("int a[{}", "a[".repeat(huge)),
    ] {
        assert!(parse(&source).is_err());
    }
}

#[test]
fn nested_sources_round_trip() {
    let limit = 120;
    for case in &NESTS {
        let deepest = limit / case.levels_per_repeat;
        let source = case.source(deepest);
        let parsed = unit(&source);
        round_trip(&source);
        let copy = parsed.clone();
        assert_eq!(copy, parsed);
        assert!(alloc::format!("{copy:?}").len() > source.len());
    }
    let structures = alloc::format!(
        "{}int a; {}",
        "struct { ".repeat(limit - 8),
        "} a; ".repeat(limit - 8)
    );
    round_trip(&structures);
    let lists = alloc::format!(
        "int a = {}1{};",
        "{".repeat(limit - 8),
        "}".repeat(limit - 8)
    );
    round_trip(&lists);
}

#[test]
fn flat_chains_parse_and_round_trip() {
    let huge = 20_000;
    let chain =
        |link: &str, links: usize| alloc::format!("void f() {{ a = a{}; }}", link.repeat(links));
    for link in [
        " + a",
        " * a - a",
        " * a + a * a",
        " && a || a",
        " == a",
        ", a",
        ".x",
        "[0]",
        "++",
        ".x[0].y",
    ] {
        let source = chain(link, huge);
        let parsed = unit(&source);
        assert_eq!(parsed.clone(), parsed, "{link}");
        round_trip(&source);
    }
    for (open, core) in [
        ("-", "a"),
        ("- ", "a"),
        ("!", "a"),
        ("~-", "a"),
        ("a = ", "a"),
        ("a += ", "a"),
        ("a ? a : ", "a"),
        ("a == a ? a + a : ", "a"),
    ] {
        let source = alloc::format!("void f() {{ {}{core}; }}", open.repeat(huge));
        let parsed = unit(&source);
        assert_eq!(parsed.clone(), parsed, "{open}");
        round_trip(&source);
    }
    let nested_in_chain = alloc::format!(
        "void f() {{ a = {}a{}; }}",
        "a + (a + ".repeat(70),
        ")".repeat(70)
    );
    round_trip(&nested_in_chain);
}

#[test]
fn nested_operands_of_chains_round_trip() {
    let limit = 1_000;
    let chain =
        |link: &str, links: usize| alloc::format!("void f() {{ a = a{}; }}", link.repeat(links));
    for (link, height_per_link) in [("(a)", 1), (".length()", 1)] {
        let source = chain(link, (limit - 8) / height_per_link);
        let parsed = unit(&source);
        round_trip(&source);
        assert!(alloc::format!("{:?}", parsed.clone()).len() > source.len());
    }
    for (open, close, per_level) in [
        ("a + (", ")", 2),
        ("a * a + (", ")", 2),
        ("a + a * (", ")", 3),
        ("-(", ")", 2),
        ("a ? a : (", ")", 2),
        ("a ? (", ") : a", 3),
        ("a = (", ")", 2),
        ("a[(", ")]", 4),
    ] {
        let fits = limit / per_level;
        let source = |count: usize| {
            alloc::format!(
                "void f() {{ {}a{}; }}",
                open.repeat(count),
                close.repeat(count)
            )
        };
        round_trip(&source(fits));
    }
    for source in [
        alloc::format!("void f() {{ g({}a); }}", "a, ".repeat(100_000)),
        alloc::format!("void f() {{ {}a; }}", "a, ".repeat(100_000)),
        alloc::format!("void f() {{ {} }}", "a = 1; ".repeat(100_000)),
        alloc::format!("int a{};", ", a".repeat(100_000)),
    ] {
        assert!(parse(&source).is_ok());
    }
}
