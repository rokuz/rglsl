#![allow(clippy::panic)]

use rglsl_ast::parse;
use rglsl_sema::{analyze, Options, Stage};

type TestResult = Result<(), Box<dyn std::error::Error>>;

const STACK: usize = 256 << 10;
const DEPTHS: [usize; 2] = [10_000, 100_000];

fn shader(globals: &str, body: &str) -> String {
    format!(
        "#version 450\n#extension GL_EXT_nonuniform_qualifier : enable\n\
         #extension GL_EXT_control_flow_attributes : enable\n\
         layout(location = 0) out vec4 color;\n\
         int f(int a) {{ return a; }}\n\
         {globals}\n\
         void main() {{\n\
         int b = 1; bool t = true; vec4 v = vec4(1.0); int c[2] = int[2](0, 1);\n\
         {body}\n\
         color = vec4(float(b)) + v;\n}}\n"
    )
}

fn analyzed(name: &str, source: String) -> TestResult {
    analyzed_with(name, source, true)
}

fn analyzed_with(name: &str, source: String, clean: bool) -> TestResult {
    let label = name.to_owned();
    let name = name.to_owned();
    std::thread::Builder::new()
        .stack_size(STACK)
        .spawn(move || -> Result<(), String> {
            let unit = parse(&source).map_err(|error| format!("{name}: {error}"))?;
            let options = Options::new(Stage::Fragment);
            let analysis = analyze(&unit, &options);
            let errors: Vec<String> = analysis
                .diagnostics
                .iter()
                .map(|diagnostic| diagnostic.kind.to_string())
                .collect();
            assert_eq!(errors.is_empty(), clean, "{name}: {errors:?}");
            Ok(())
        })?
        .join()
        .map_err(|_| format!("{label}: the analysis thread panicked"))??;
    Ok(())
}

fn nested(open: &str, core: &str, close: &str, count: usize) -> String {
    format!("{}{core}{}", open.repeat(count), close.repeat(count))
}

#[test]
fn deep_expressions_are_analysed_on_a_small_stack() -> TestResult {
    let cases = [
        ("parentheses", "b = ", "(", "b", ")"),
        ("negation", "b = ", "-(", "b", ")"),
        ("logical not", "t = ", "!(", "t", ")"),
        ("binary right operand", "b = ", "b + b * (", "b", ")"),
        ("comparison", "t = ", "t == (", "t", ")"),
        ("assignment", "", "b = (", "2", ")"),
        ("conditional else", "b = ", "t ? b : (", "b", ")"),
        ("conditional then", "b = ", "t ? ", "b", " : b"),
        ("user call", "b = ", "f(", "b", ")"),
        ("built-in call", "b = ", "abs(", "b", ")"),
        ("two-argument built-in", "b = ", "max(b, ", "b", ")"),
        ("constructor", "b = ", "int(", "b", ")"),
        ("vector constructor", "v = ", "vec4(", "v", ")"),
        ("nonuniformEXT", "b = ", "nonuniformEXT(", "b", ")"),
        ("subscript", "b = ", "c[", "0", "]"),
        ("swizzle", "v = ", "(", "v", ").wzyx"),
        ("increment", "b = ", "b++ + (", "b", ")"),
        ("sequence", "b = ", "(b, ", "b", ")"),
    ];
    for depth in DEPTHS {
        for (name, prefix, open, core, close) in cases {
            let body = format!("{prefix}{};", nested(open, core, close, depth));
            analyzed(&format!("{name} at {depth}"), shader("", &body))?;
        }
    }
    Ok(())
}

#[test]
fn deep_statements_are_analysed_on_a_small_stack() -> TestResult {
    let cases = [
        ("blocks", "{ ", " }"),
        ("if", "if (t) ", ""),
        ("else", "if (b > 3) b = 4; else ", ""),
        ("for", "for (int i = 0; i < 2; i++) ", ""),
        ("while", "while (t) ", ""),
        ("do while", "do { ", " } while (b > 5);"),
        ("switch", "switch (b) { case 1: ", " break; }"),
        (
            "loop control",
            "[[unroll]] for (int i = 0; i < 2; i++) { ",
            " }",
        ),
    ];
    for depth in DEPTHS {
        for (name, open, close) in cases {
            analyzed(
                &format!("{name} at {depth}"),
                shader("", &nested(open, "b = 2;", close, depth)),
            )?;
        }
    }
    Ok(())
}

fn struct_chain(count: usize) -> String {
    let mut chain = String::from("struct S0 { int a; };\n");
    for level in 1..count {
        chain.push_str(&format!(
            "struct S{level} {{ S{} a; int b; }};\n",
            level - 1
        ));
    }
    chain
}

#[test]
fn deep_declarations_are_analysed_on_a_small_stack() -> TestResult {
    analyzed(
        "array initializer lists at 10000",
        shader(
            "",
            &format!(
                "int a{} = {}2{}; b = a{};",
                "[1]".repeat(10_000),
                "{".repeat(10_000),
                "}".repeat(10_000),
                "[0]".repeat(10_000)
            ),
        ),
    )?;
    for depth in DEPTHS {
        let chain = struct_chain(depth);
        let last = depth - 1;
        analyzed(
            &format!("struct chains at {depth}"),
            shader(
                &chain,
                &format!("S{last} s; s.b = 1; S{last} r = s; b = r.b;"),
            ),
        )?;
        analyzed(
            &format!("struct chains in a block at {depth}"),
            shader(
                &format!("{chain}layout(std430, binding = 0) buffer B {{ S{last} s; }};"),
                "b = s.b;",
            ),
        )?;
        let mut initializer = String::from("{2}");
        let mut constructor = String::from("S0(2)");
        for level in 1..depth {
            initializer = format!("{{{initializer}, 0}}");
            constructor = format!("S{level}({constructor}, 0)");
        }
        analyzed(
            &format!("struct initializers at {depth}"),
            shader(&chain, &format!("S{last} s = {initializer}; b = s.b;")),
        )?;
        analyzed(
            &format!("struct constructors at {depth}"),
            shader(&chain, &format!("S{last} s = {constructor}; b = s.b;")),
        )?;
        analyzed_with(
            &format!("inline structs at {depth}"),
            shader(
                &format!(
                    "{}int a; {}",
                    "struct { ".repeat(depth),
                    "} a; ".repeat(depth)
                ),
                "",
            ),
            false,
        )?;
        analyzed(
            &format!("array dimensions at {depth}"),
            shader(
                "",
                &format!(
                    "int a{0}; int r{0} = a; b = r.length();",
                    "[1]".repeat(depth)
                ),
            ),
        )?;
    }
    Ok(())
}
