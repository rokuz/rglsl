use alloc::format;
use alloc::string::String;

use crate::{expressions, parse_with, print, ParseOptions};

const STACK: usize = 256 << 10;
const DEPTHS: [usize; 2] = [10_000, 100_000];
const PRINTED_DEPTH: usize = 1_000;

fn unlimited() -> ParseOptions {
    ParseOptions {
        nesting_limit: None,
    }
}

fn exercise(source: String, round_trip: bool) -> super::TestResult {
    std::thread::Builder::new()
        .stack_size(STACK)
        .spawn(move || {
            let parsed = match parse_with(&source, &unlimited()) {
                Ok(parsed) => parsed,
                Err(error) => panic!("{error}"),
            };
            if round_trip {
                let printed = print(&parsed);
                let reparsed = match parse_with(&printed, &unlimited()) {
                    Ok(reparsed) => reparsed,
                    Err(error) => panic!("{error}"),
                };
                assert!(reparsed == parsed);
            }
            let copy = parsed.clone();
            assert!(copy == parsed);
            assert!(!expressions(&copy).is_empty());
            drop(copy);
            drop(parsed);
        })?
        .join()
        .map_err(|_| "the parser thread panicked")?;
    Ok(())
}

fn nested(open: &str, core: &str, close: &str, count: usize) -> String {
    format!("{}{core}{}", open.repeat(count), close.repeat(count))
}

fn in_function(body: &str) -> String {
    format!("void f() {{ {body} }}")
}

#[test]
fn deep_expressions_parse_print_clone_and_drop_on_a_small_stack() -> super::TestResult {
    let cases = [
        ("a = ", "(", "a", ")"),
        ("a = ", "-(", "a", ")"),
        ("a = ", "a + (", "a", ")"),
        ("a = ", "f(", "a", ")"),
        ("a = ", "vec4(", "a", ")"),
        ("a = ", "a[", "0", "]"),
        ("a = ", "a ? ", "a", " : a"),
        ("", "a[a = ", "0", "] = 1"),
        ("a = ", "(a, ", "a", ")"),
        ("a = ", "a.x[", "0", "].y"),
    ];
    for depth in DEPTHS {
        for (prefix, open, core, close) in cases {
            let expression = nested(open, core, close, depth);
            exercise(in_function(&format!("{prefix}{expression};")), true)?;
        }
        exercise(
            format!("int a = {}1{};", "{".repeat(depth), "}".repeat(depth)),
            true,
        )?;
        exercise(
            format!("int a[{}1{}];", "a[".repeat(depth), "]".repeat(depth)),
            true,
        )?;
    }
    Ok(())
}

#[test]
fn deep_statements_and_structs_parse_clone_and_drop_on_a_small_stack() -> super::TestResult {
    let cases = [
        ("{ ", " }"),
        ("if (a) ", ""),
        ("if (a) a = 1; else ", ""),
        ("while (a) ", ""),
        ("for (;;) ", ""),
        ("do { ", " } while (a);"),
        ("switch (a) { case 0: ", " }"),
        ("[[unroll]] for (;;) ", ""),
    ];
    for depth in DEPTHS.into_iter().chain([PRINTED_DEPTH]) {
        let round_trip = depth == PRINTED_DEPTH;
        for (open, close) in cases {
            exercise(
                in_function(&nested(open, "a = 1;", close, depth)),
                round_trip,
            )?;
        }
        exercise(
            format!(
                "{}int a[1]; {}",
                "struct { ".repeat(depth),
                "} a; ".repeat(depth)
            ),
            round_trip,
        )?;
    }
    Ok(())
}
