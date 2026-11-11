use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

use super::errors;
use crate::{preprocess, DiagnosticKind, Limits, MemoryIncluder, Options, Preprocessed};

const SEEDS: [&str; 3] = [
    "#version 450\n#extension GL_GOOGLE_include_directive : enable\n#define F(a, b) a ## b + #a\n#define G(x) F(x, 1) * __LINE__\n#if defined(G) && G(2) > 0 || (1 << 3) / 2\nint F(v, w) = G(3);\n#elif 0\n#error no\n#else\n#line 20 \"x\"\n#endif\n#include \"a.h\"\n/* c */ int s = __FILE__; // e\n",
    "#version 460 core\n#define A(x) B(x) x\n#define B(x) A(x) x\n#ifdef A\nfloat f = A(1.5e3f) + 0x1Fu + 017 + .5;\n#endif\n#pragma optimize(on)\n#undef A\n#ifndef A\nint g = \"str\\n\";\n#endif\nvoid main() { f(A, B(\n1)); }\n",
    "#version 450\n#if 1\n#if 0\n#else\n#define EMPTY\n#define CAT(a,b) a##b\nint CAT(EMPTY, x) = CAT(, y);\n#endif\n#endif\n#line 5\nint l = __LINE__ \\\n + 1;\n#include <b.h>\n",
];

fn limited() -> Options {
    Options {
        limits: Limits {
            max_tokens: 200_000,
            max_output_bytes: 1 << 20,
            ..Limits::default()
        },
        ..Options::default()
    }
}

fn run_limited(source: &str) -> Preprocessed {
    let options = limited();
    let mut includer = MemoryIncluder::new();
    let root = includer.add_file("main.frag", source);
    includer.add_file(
        "a.h",
        "#define FROM_A 1\nint a = FROM_A;\n#include \"a.h\"\n",
    );
    includer.add_file("b.h", "#ifndef B_H\n#define B_H\nint b;\n#endif\n");
    includer.add_file("self.h", "int s;\n#include \"self.h\"\n");
    let result = preprocess(source, root, &options, &mut includer);
    assert!(result.text.len() <= options.limits.max_output_bytes + 4096);
    for diagnostic in &result.diagnostics {
        let _ = result
            .source_map
            .locate(usize::try_from(diagnostic.location.offset).unwrap_or(0));
    }
    let _ = result.source_map.line(result.text.len() / 2);
    result
}

#[test]
fn truncations_at_every_boundary() {
    for seed in SEEDS {
        for (index, _) in seed.char_indices() {
            run_limited(seed.get(..index).unwrap_or(""));
        }
    }
}

#[test]
fn inserted_characters_at_every_position() {
    let inserts = [
        '#', '\\', '"', '(', ')', '\n', '/', '*', '\'', '\0', '\r', ',', '\u{e9}',
    ];
    for seed in SEEDS {
        for (index, _) in seed.char_indices() {
            for insert in inserts {
                let mut mutated = String::with_capacity(seed.len() + 4);
                mutated.push_str(seed.get(..index).unwrap_or(""));
                mutated.push(insert);
                mutated.push_str(seed.get(index..).unwrap_or(""));
                run_limited(&mutated);
            }
        }
    }
}

#[test]
fn deleted_lines() {
    for seed in SEEDS {
        let lines: Vec<&str> = seed.lines().collect();
        for skip in 0..lines.len() {
            let mutated: Vec<&str> = lines
                .iter()
                .enumerate()
                .filter(|(index, _)| *index != skip)
                .map(|(_, line)| *line)
                .collect();
            run_limited(&mutated.join("\n"));
        }
    }
}

#[test]
fn deeply_nested_conditionals() {
    let mut source = String::from("#version 450\n");
    for _ in 0..5_000 {
        source.push_str("#if 1\n");
    }
    let result = run_limited(&source);
    assert!(errors(&result).contains(&DiagnosticKind::NestingTooDeep { directive: "#if" }));
    let mut skipped = String::from("#version 450\n#if 0\n");
    for _ in 0..5_000 {
        skipped.push_str("#ifdef X\n");
    }
    let result = run_limited(&skipped);
    assert!(!errors(&result).is_empty());
}

#[test]
fn deeply_nested_expressions() {
    let depth = 50_000;
    let source = format!(
        "#version 450\n#if {}1{} == 1\nint yes;\n#endif\n",
        "(".repeat(depth),
        ")".repeat(depth)
    );
    let result = run_limited(&source);
    assert!(errors(&result).is_empty());
    assert!(result.text.contains("int yes;"));
    let source = format!(
        "#version 450\n#if {}1\nint yes;\n#endif\n",
        "- - ".repeat(depth)
    );
    let result = run_limited(&source);
    assert!(errors(&result).is_empty());
    assert!(result.text.contains("int yes;"));
    let source = format!(
        "#version 450\n#if {}1{}\n#endif\n",
        "(".repeat(depth),
        ")".repeat(depth - 1)
    );
    let result = run_limited(&source);
    assert!(errors(&result).contains(&DiagnosticKind::ExpectedCloseParen));
}

#[test]
fn recursive_macros_terminate() {
    let cases = [
        "#version 450\n#define A A\nA A A\n",
        "#version 450\n#define A B\n#define B A\nA B\n",
        "#version 450\n#define F(x) F(x) G(x)\n#define G(x) F(x)\nF(G(F(1)))\n",
        "#version 450\n#define A(x) B(x)(x)\n#define B(x) A(x)(x)\nA(1)(2)(3)\n",
        "#version 450\n#define A A\n#if A\n#endif\n",
        "#version 450\n#define F(x) F\nF(1)(2)(3)(4)\n",
    ];
    for source in cases {
        run_limited(source);
    }
}

#[test]
fn exponential_expansion_hits_the_limits() {
    let mut source = String::from("#version 450\n#define A0 x\n");
    for level in 1..48 {
        source.push_str(&format!("#define A{level} A{} A{}\n", level - 1, level - 1));
    }
    source.push_str("int y = A47;\n");
    let result = run_limited(&source);
    assert!(errors(&result).iter().any(|kind| matches!(
        kind,
        DiagnosticKind::TokenLimitExceeded | DiagnosticKind::OutputLimitExceeded
    )));
    let in_condition = source.replace("int y = A47;\n", "#if A47\n#endif\n");
    let result = run_limited(&in_condition);
    assert!(!errors(&result).is_empty());
    let mut arguments = String::from("#version 450\n#define D(x) x x\nint z = ");
    for _ in 0..40 {
        arguments.push_str("D(");
    }
    arguments.push('1');
    for _ in 0..40 {
        arguments.push(')');
    }
    arguments.push_str(";\n");
    let result = run_limited(&arguments);
    assert!(errors(&result).contains(&DiagnosticKind::TokenLimitExceeded));
}

#[test]
fn deeply_nested_invocations() {
    let mut source = String::from("#version 450\n#define F(x) (x)\nint a = ");
    for _ in 0..20_000 {
        source.push_str("F(");
    }
    source.push('1');
    for _ in 0..20_000 {
        source.push(')');
    }
    source.push_str(";\n");
    let result = run_limited(&source);
    assert!(!errors(&result).is_empty());
}

#[test]
fn self_including_files_terminate() {
    let source = "#version 450\n#include \"self.h\"\nint after;\n";
    let result = run_limited(source);
    assert!(errors(&result)
        .iter()
        .any(|kind| matches!(kind, DiagnosticKind::RecursiveInclude { .. })));
}

#[test]
fn pathological_lexing() {
    let cases = [
        String::from("\\\n\\\n\\"),
        "\"".repeat(1000),
        "/*".repeat(1000),
        "#".repeat(1000),
        "0x".repeat(1000),
        "1e".repeat(1000),
        "9".repeat(5000),
        "\r".repeat(1000),
        String::from("#version 450\n#define F(x) x\nF(\n"),
        String::from("#version 450\n#include \""),
        String::from(
            "#version 450\n#line 4294967295\nint a = __LINE__;\n#line -5\nint b = __LINE__;\n",
        ),
    ];
    for source in cases {
        run_limited(&source);
    }
}
