use alloc::string::ToString;

use super::{round_trip, statement, statements};
use crate::ast::{CaseLabel, Condition, DeclarationKind, JumpStatement, StatementKind};

#[test]
fn compound_and_empty_statements() {
    let block = statement("{ ; { } a; }");
    let StatementKind::Compound(compound) = &block.kind else {
        panic!("{block:?}");
    };
    assert_eq!(compound.statements.len(), 3);
    assert!(matches!(
        compound.statements.first().map(|first| &first.kind),
        Some(StatementKind::Expression(None))
    ));
    assert_eq!(block.to_string(), "{\n    ;\n    {\n    }\n    a;\n}\n");
}

#[test]
fn declaration_statement() {
    let parsed = statement("const float a = 1.0, b[2] = float[2](1.0, 2.0);");
    let StatementKind::Declaration(declaration) = &parsed.kind else {
        panic!("{parsed:?}");
    };
    let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
        panic!("{declaration:?}");
    };
    assert_eq!(list.declarators.len(), 2);
    assert_eq!(
        parsed.to_string(),
        "const float a = 1.0, b[2] = float[2](1.0, 2.0);\n"
    );
}

#[test]
fn selection_with_and_without_else() {
    let plain = statement("if (a) b = 1;");
    assert!(matches!(
        plain.kind,
        StatementKind::Selection {
            else_branch: None,
            ..
        }
    ));
    assert_eq!(plain.to_string(), "if (a)\n    b = 1;\n");
    let chained = statement("if (a) { b; } else if (c) d; else { e; }");
    assert_eq!(
        chained.to_string(),
        "if (a) {\n    b;\n} else if (c)\n    d;\nelse {\n    e;\n}\n"
    );
}

#[test]
fn dangling_else_belongs_to_the_nearest_if() {
    let parsed = statement("if (a) if (b) c; else d;");
    let StatementKind::Selection {
        then_branch,
        else_branch,
        ..
    } = &parsed.kind
    else {
        panic!("{parsed:?}");
    };
    assert!(else_branch.is_none());
    assert!(matches!(
        then_branch.kind,
        StatementKind::Selection {
            else_branch: Some(_),
            ..
        }
    ));
}

#[test]
fn switch_with_labels_and_fallthrough() {
    let parsed =
        statement("switch (a + 1) { case 0: case 1: b = 1; break; case 2: { c; } default: d; }");
    let StatementKind::Switch { statements, .. } = &parsed.kind else {
        panic!("{parsed:?}");
    };
    let labels = statements
        .iter()
        .filter(|inner| matches!(inner.kind, StatementKind::CaseLabel(_)))
        .count();
    assert_eq!(labels, 4);
    assert!(matches!(
        statements.last().map(|last| &last.kind),
        Some(StatementKind::Expression(Some(_)))
    ));
    assert!(statements
        .iter()
        .any(|inner| matches!(inner.kind, StatementKind::CaseLabel(CaseLabel::Default))));
    assert_eq!(
        parsed.to_string(),
        "switch (a + 1) {\n    case 0:\n    case 1:\n        b = 1;\n        break;\n    case 2:\n        {\n            c;\n        }\n    default:\n        d;\n}\n"
    );
}

#[test]
fn for_with_declaration_expression_and_missing_parts() {
    let declared = statement("for (int i = 0, j = 1; i < 3; i++, j--) { a; }");
    let StatementKind::For(statement_parts) = &declared.kind else {
        panic!("{declared:?}");
    };
    assert!(matches!(
        statement_parts.init.kind,
        StatementKind::Declaration(_)
    ));
    assert_eq!(
        declared.to_string(),
        "for (int i = 0, j = 1; i < 3; i++, j--) {\n    a;\n}\n"
    );
    let expressed = statement("for (i = 0; i < 3; ++i) a;");
    assert_eq!(expressed.to_string(), "for (i = 0; i < 3; ++i)\n    a;\n");
    let bare = statement("for (;;) { break; }");
    let StatementKind::For(bare_parts) = &bare.kind else {
        panic!("{bare:?}");
    };
    assert!(bare_parts.condition.is_none() && bare_parts.increment.is_none());
    assert!(matches!(
        bare_parts.init.kind,
        StatementKind::Expression(None)
    ));
    assert_eq!(bare.to_string(), "for (;;) {\n    break;\n}\n");
    let partial = statement("for (; a;) ;");
    assert_eq!(partial.to_string(), "for (; a;)\n    ;\n");
}

#[test]
fn declarations_in_loop_conditions() {
    let in_while = statement("while (bool again = f()) { a; }");
    let StatementKind::While { condition, .. } = &in_while.kind else {
        panic!("{in_while:?}");
    };
    assert!(matches!(condition, Condition::Declaration(_)));
    assert_eq!(
        in_while.to_string(),
        "while (bool again = f()) {\n    a;\n}\n"
    );
    let in_for = statement("for (int i = 0; bool more = i < 3; i++) a;");
    let StatementKind::For(for_parts) = &in_for.kind else {
        panic!("{in_for:?}");
    };
    let Some(Condition::Declaration(declaration)) = &for_parts.condition else {
        panic!("{for_parts:?}");
    };
    assert_eq!(declaration.name.node, "more");
    assert_eq!(
        in_for.to_string(),
        "for (int i = 0; bool more = i < 3; i++)\n    a;\n"
    );
}

#[test]
fn while_and_do_while() {
    assert_eq!(
        statement("while (a < 3) a++;").to_string(),
        "while (a < 3)\n    a++;\n"
    );
    assert_eq!(
        statement("do { a++; } while (a < 3);").to_string(),
        "do {\n    a++;\n} while (a < 3);\n"
    );
    assert_eq!(
        statement("do a++; while (a < 3);").to_string(),
        "do\n    a++;\nwhile (a < 3);\n"
    );
}

#[test]
fn jump_statements() {
    let parsed = statements("for (;;) { continue; break; }\ndiscard;\nreturn;\nreturn a + 1;");
    let jumps: alloc::vec::Vec<_> = parsed
        .iter()
        .filter_map(|inner| match &inner.kind {
            StatementKind::Jump(jump) => Some(jump),
            _ => None,
        })
        .collect();
    assert!(matches!(
        jumps.as_slice(),
        [
            JumpStatement::Discard,
            JumpStatement::Return(None),
            JumpStatement::Return(Some(_)),
        ]
    ));
    assert_eq!(
        statement("for (;;) { continue; break; }").to_string(),
        "for (;;) {\n    continue;\n    break;\n}\n"
    );
}

#[test]
fn type_led_statements_are_told_apart_from_expressions() {
    let parsed = statements(
        "float a;\nfloat(a);\nfloat[2] b;\nfloat[2](a, a).length();\nint c[2], d;\nvec2(a).x;",
    );
    let kinds: alloc::vec::Vec<bool> = parsed
        .iter()
        .map(|inner| matches!(inner.kind, StatementKind::Declaration(_)))
        .collect();
    assert_eq!(kinds, [true, false, true, false, true, false]);
}

#[test]
fn a_whole_function_round_trips() {
    let printed = round_trip(
        "#version 450\nstruct S { int a; vec2 b[2]; };\nint g(in int x, out float y, inout S s, const highp vec2);\nvoid main() {\n  S s = S(1, vec2[2](vec2(0.0), vec2(1.0)));\n  S t[2];\n  for (int i = 0; i < 2; i++) { t[i] = s; if (i == 1) continue; else s.a += i; }\n  do { s.a--; } while (s.a > 0);\n  switch (s.a) { case 0: discard; default: break; }\n  return;\n}\n",
    );
    assert!(printed.starts_with("#version 450\n\nstruct S {\n    int a;\n    vec2 b[2];\n};\n\nint g(in int x, out float y, inout S s, const highp vec2);\n\nvoid main() {\n"));
}

#[test]
fn attributes_precede_selections_switches_and_loops() {
    let parsed = statement("[[unroll, dependency_length(1 + 3)]] for (;;) {}");
    let StatementKind::Attributed {
        attributes,
        statement: inner,
    } = &parsed.kind
    else {
        panic!("{parsed:?}");
    };
    let names: alloc::vec::Vec<&str> = attributes
        .iter()
        .map(|attribute| attribute.name.node.as_str())
        .collect();
    assert_eq!(names, ["unroll", "dependency_length"]);
    assert!(attributes[1].argument.is_some());
    assert!(matches!(inner.kind, StatementKind::For(_)));
    assert_eq!(
        parsed.to_string(),
        "[[unroll, dependency_length(1 + 3)]] for (;;) {\n}\n"
    );
    let spaced = statement("[ [ flatten ] ] if (a) b;");
    assert!(matches!(spaced.kind, StatementKind::Attributed { .. }));
    statement("[[multiple_wait_queuesQCOM(2)]] while (a) {}");
    statement("[[dont_flatten]] switch (a) { default: break; }");
    assert!(crate::parse("void f() { [[unroll]] a = 1; }").is_err());
}
