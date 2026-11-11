use alloc::format;
use alloc::string::{String, ToString};
use alloc::vec::Vec;
use std::thread;

use super::{parse_options, preprocess, sema_options, Lowerer, Mode};
use crate::front::glsl::Options;
use crate::ShaderStage;

const ANALYSIS_STACK: usize = 4 << 30;
const LOWERING_STACK: usize = 256 << 10;
const DEPTH: usize = 3_000;
const TYPE_DEPTH: usize = 60;

fn options() -> Options {
    Options {
        nesting_limits: false,
        ..Options::from(ShaderStage::Fragment)
    }
}

fn lowered_on_a_small_stack(source: String) -> Result<(), String> {
    let analyzed = thread::Builder::new()
        .stack_size(ANALYSIS_STACK)
        .spawn(move || {
            let options = options();
            let preprocessed = preprocess(
                &options,
                Some(options.stage),
                &source,
                rglsl_pp::FileId(0),
                &mut rglsl_pp::NoIncluder,
            );
            let text = preprocessed.text.clone();
            let (unit, failure) = rglsl_ast::parse_prefix_with(&text, &parse_options(&options));
            let analysis = rglsl_sema::analyze(&unit, &sema_options(&options, &text));
            let errors: Vec<String> = failure
                .map(|error| error.to_string())
                .into_iter()
                .chain(
                    analysis
                        .diagnostics
                        .iter()
                        .map(|diagnostic| diagnostic.kind.to_string()),
                )
                .collect();
            (preprocessed, unit, analysis, errors)
        })
        .unwrap()
        .join()
        .unwrap();
    let (preprocessed, unit, analysis, errors) = analyzed;
    if !errors.is_empty() {
        core::mem::forget((preprocessed, unit, analysis));
        return Err(errors.join("\n"));
    }
    let result = thread::Builder::new()
        .stack_size(LOWERING_STACK)
        .spawn(move || {
            let options = options();
            let lowered = Lowerer::new(
                &unit,
                &analysis,
                &options,
                &preprocessed.source_map,
                Mode::Program,
            )
            .run();
            let outcome = match lowered {
                Ok(object) => {
                    core::mem::forget(object);
                    Ok(())
                }
                Err(errors) => Err(format!("{errors:?}")),
            };
            core::mem::forget((preprocessed, unit, analysis));
            outcome
        })
        .unwrap()
        .join()
        .unwrap();
    result
}

fn shader(globals: &str, body: &str) -> String {
    format!(
        "#version 450\n#extension GL_EXT_nonuniform_qualifier : enable\n\
         #extension GL_EXT_control_flow_attributes : enable\n\
         layout(location = 0) out vec4 color;\n\
         int f(int a) {{ return a; }}\n\
         void g(inout int a) {{ a += 1; }}\n\
         {globals}\n\
         void main() {{\n\
         int b = 1; bool t = true; vec4 v = vec4(1.0); int c[2] = int[2](0, 1);\n\
         {body}\n\
         color = vec4(float(b)) + v;\n}}\n"
    )
}

fn nested(open: &str, core: &str, close: &str) -> String {
    nested_to(open, core, close, DEPTH)
}

fn nested_to(open: &str, core: &str, close: &str, depth: usize) -> String {
    format!("{}{core}{}", open.repeat(depth), close.repeat(depth))
}

fn struct_chain(count: usize) -> String {
    let mut globals = String::from("struct S0 { int a; };\n");
    for level in 1..count {
        globals.push_str(&format!(
            "struct S{level} {{ S{} a; int b; }};\n",
            level - 1
        ));
    }
    globals
}

#[test]
fn lowering_handles_deep_nesting_on_a_small_stack() {
    let expressions = [
        ("b = ", "(", "b", ")"),
        ("b = ", "-(", "b", ")"),
        ("t = ", "!(", "t", ")"),
        ("b = ", "b + (", "b", ")"),
        ("b = ", "b + b * (", "b", ")"),
        ("t = ", "t && (", "t", ")"),
        ("t = ", "t || (b++ > 0) && (", "t", ")"),
        ("", "b = (", "2", ")"),
        ("", "b += (", "2", ")"),
        ("b = ", "t ? b : (", "b", ")"),
        ("b = ", "t ? ", "b", " : b"),
        ("b = ", "b > 2 ? b++ : (", "b", ")"),
        ("b = ", "f(", "b", ")"),
        ("b = ", "abs(", "b", ")"),
        ("b = ", "max(b, ", "b", ")"),
        ("b = ", "int(", "b", ")"),
        ("v = ", "vec4(", "v", ")"),
        ("b = ", "nonuniformEXT(", "b", ")"),
        ("b = ", "c[", "0", "]"),
        ("v = ", "(", "v", ").wzyx"),
        ("b = ", "b++ + (", "b", ")"),
        ("b = ", "(b, ", "b", ")"),
    ];
    let mut failures = Vec::new();
    for (prefix, open, core, close) in expressions {
        let source = shader("", &format!("{prefix}{};", nested(open, core, close)));
        if let Err(error) = lowered_on_a_small_stack(source) {
            failures.push(format!("{open}: {}", error.get(..300).unwrap_or(&error)));
        }
    }
    let statements = [
        ("{ ", "b = 2;", " }"),
        ("if (t) ", "b = 2;", ""),
        ("if (t) { ", "b = 2;", " }"),
        ("if (b > 3) b = 4; else ", "b = 2;", ""),
        ("for (int i = 0; i < 2; i++) ", "b = 2;", ""),
        ("while (t) ", "break;", ""),
        ("do { ", "b = 2;", " } while (b > 5);"),
        ("switch (b) { case 1: ", "b = 2;", " break; }"),
        ("[[unroll]] for (int i = 0; i < 2; i++) { ", "b = 2;", " }"),
        ("if (t) g(b); else { ", "b = 2;", " }"),
    ];
    for (open, core, close) in statements {
        if let Err(error) = lowered_on_a_small_stack(shader("", &nested(open, core, close))) {
            failures.push(format!("{open}: {}", error.get(..300).unwrap_or(&error)));
        }
    }
    let declarations = [
        shader(
            "",
            &format!(
                "int a{} = {}; b = a{};",
                "[1]".repeat(TYPE_DEPTH),
                nested_to("{", "2", "}", TYPE_DEPTH),
                "[0]".repeat(TYPE_DEPTH)
            ),
        ),
        shader(
            &struct_chain(TYPE_DEPTH),
            &format!("S{0} s; s.b = 1; S{0} r = s; b = r.b;", TYPE_DEPTH - 1),
        ),
        shader(&struct_chain(TYPE_DEPTH), &{
            let mut constructor = String::from("S0(2)");
            for level in 1..TYPE_DEPTH {
                constructor = format!("S{level}({constructor}, 0)");
            }
            format!(
                "S{} s = {constructor}; b = s{};",
                TYPE_DEPTH - 1,
                ".a".repeat(TYPE_DEPTH)
            )
        }),
        shader(
            "",
            &format!(
                "int a{0}; int r{0} = a; b = r.length();",
                "[1]".repeat(TYPE_DEPTH)
            ),
        ),
    ];
    for (index, source) in declarations.into_iter().enumerate() {
        if let Err(error) = lowered_on_a_small_stack(source) {
            failures.push(format!(
                "declaration {index}: {}",
                error.get(..300).unwrap_or(&error)
            ));
        }
    }
    assert!(failures.is_empty(), "{}", failures.join("\n"));
}
