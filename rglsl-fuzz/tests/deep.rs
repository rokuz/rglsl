#![allow(
    clippy::unwrap_used,
    clippy::expect_used,
    clippy::panic,
    reason = "tests fail by panicking"
)]

use std::collections::BTreeMap;

use rglsl_ast::ast::{ExpressionKind, StatementKind, TranslationUnit};
use rglsl_ast::{parse_with, ParseOptions};
use rglsl_fuzz::build::Builder;
use rglsl_fuzz::injection::{apply_edits, contains_top_level_break, injection_points};
use rglsl_fuzz::job::{add_braces, node_count};
use rglsl_fuzz::rename::{rename_all, NameKind};
use rglsl_fuzz::rewrite::{
    function_statements, rewrite_expressions, rewrite_statements, statement_expression_ids,
};
use rglsl_fuzz::scope::find_points;
use rglsl_sema::{analyze, Options, Stage};

const SMALL_STACK: usize = 256 << 10;
const SEMA_STACK: usize = 1 << 30;
const DEPTH: usize = 10_000;

fn on_stack<T: Send + 'static>(size: usize, run: impl FnOnce() -> T + Send + 'static) -> T {
    std::thread::Builder::new()
        .stack_size(size)
        .spawn(run)
        .unwrap()
        .join()
        .unwrap()
}

fn shader() -> String {
    let mut body = String::new();
    for kind in 0..DEPTH {
        body.push_str(match kind % 5 {
            0 => "{ ",
            1 => "if (b > 0) ",
            2 => "for (int i = 0; i < 2; i++) ",
            3 => "while (b > 3) ",
            _ => "if (b > 1) b = 2; else ",
        });
    }
    body.push_str(&format!(
        "{{ b = {}b{}; break; }}",
        "(".repeat(DEPTH),
        ")".repeat(DEPTH)
    ));
    for kind in 0..DEPTH {
        if kind % 5 == 0 {
            body.push_str(" }");
        }
    }
    format!(
        "#version 450\nlayout(location = 0) out vec4 color;\nvoid main() {{\nint b = 1;\n{body}\ncolor = vec4(float(b));\n}}\n"
    )
}

fn parse(source: &str) -> TranslationUnit {
    parse_with(
        source,
        &ParseOptions {
            nesting_limit: None,
        },
    )
    .unwrap()
}

#[test]
fn walkers_handle_deep_nesting_on_a_small_stack() {
    let source = shader();
    on_stack(SMALL_STACK, move || {
        let mut unit = parse(&source);
        let statements = function_statements(&unit).len();
        assert!(statements > DEPTH);
        assert!(node_count(&unit) > 2 * DEPTH);
        assert!(function_statements(&unit)
            .iter()
            .any(|(_, statement)| contains_top_level_break(statement)));
        let deepest = function_statements(&unit)
            .last()
            .map(|(_, statement)| statement_expression_ids(statement).len());
        assert!(deepest.is_some());
        let mut visited = 0;
        rewrite_expressions(&mut unit, &mut |expression| {
            visited += 1;
            if let ExpressionKind::Variable(name) = &mut expression.kind {
                if name == "b" {
                    *name = String::from("c");
                }
            }
        });
        assert!(visited > DEPTH);
        rename_all(&mut unit, &|kind: NameKind, name: &str| {
            (kind == NameKind::Variable && name == "c").then(|| String::from("b"))
        });
        let mut blocks = 0;
        rewrite_statements(&mut unit, &mut |statement| {
            if matches!(statement.kind, StatementKind::Compound(_)) {
                blocks += 1;
            }
        });
        assert!(blocks > 0);
        add_braces(&mut unit);
        let mut builder = Builder::new(unit.next_id());
        apply_edits(&mut unit, Vec::new(), &mut builder);
        assert!(function_statements(&unit).len() > statements);
        drop(unit);
    });
}

#[test]
fn scope_walks_handle_deep_nesting_on_a_small_stack() {
    let source = shader();
    let (unit, analysis) = on_stack(SEMA_STACK, move || {
        let unit = parse(&source);
        let analysis = analyze(&unit, &Options::new(Stage::Fragment));
        (unit, analysis)
    });
    on_stack(SMALL_STACK, move || {
        assert!(find_points(&unit, &analysis).len() > DEPTH);
        let points = injection_points(&unit, &analysis);
        assert!(points.len() > DEPTH);
        let mut locations = BTreeMap::new();
        for point in &points {
            locations.insert(point.location, ());
        }
        assert_eq!(locations.len(), points.len());
        drop(points);
        drop(unit);
        drop(analysis);
    });
}
