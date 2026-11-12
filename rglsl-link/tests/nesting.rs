#![allow(clippy::panic)]

use rglsl::back::spv;
use rglsl::compact::{compact, KeepUnused};
use rglsl::front::glsl::{Frontend, Options};
use rglsl::valid::{Capabilities, ValidationFlags, Validator};
use rglsl::ShaderStage;
use rglsl_link::{decode, encode, link, Options as LinkOptions};
use rglsl_pp::{FileId, IncludeError, IncludeKind, IncludedFile, Includer, Limits};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error + Send + Sync>>;

const STACK: usize = 256 << 10;
const DEFAULT_DEPTH: usize = 10_000;
const DEEP_DEPTH: usize = 100_000;
const SUBSCRIPTS: usize = 1_000;
const WORKERS: usize = 2;
const FLAT: usize = 20_000;
const LONG: usize = 4_000;

#[derive(Debug, PartialEq, Eq)]
enum Outcome {
    Compiled,
    Rejected(String),
    Failed(String),
}

impl Outcome {
    fn rejected_with(&self, expected: &str) -> bool {
        matches!(self, Self::Rejected(message) if message.contains(expected))
    }
}

struct IncludeChain {
    levels: usize,
}

impl Includer for IncludeChain {
    fn include(
        &mut self,
        _requested: &str,
        _kind: IncludeKind,
        _from: FileId,
        depth: usize,
    ) -> Result<IncludedFile, IncludeError> {
        let source = if depth < self.levels {
            String::from("#include \"next.h\"\n")
        } else {
            String::from("int g(int a) { return a; }\n")
        };
        Ok(IncludedFile {
            file: FileId(
                u32::try_from(depth).map_err(|error| IncludeError::new(error.to_string()))?,
            ),
            name: format!("level{depth}.h"),
            source,
        })
    }
}

struct Recursive;

impl Includer for Recursive {
    fn include(
        &mut self,
        _requested: &str,
        _kind: IncludeKind,
        _from: FileId,
        depth: usize,
    ) -> Result<IncludedFile, IncludeError> {
        Ok(IncludedFile {
            file: FileId(1),
            name: format!("level{depth}.h"),
            source: String::from("#include \"next.h\"\nint f(int a) { return a; }\n"),
        })
    }
}

#[derive(Clone, Copy)]
enum Includes {
    None,
    Chain(usize),
    Recursive,
}

fn on_small_stack<T: Send + 'static>(run: impl FnOnce() -> T + Send + 'static) -> TestResult<T> {
    std::thread::Builder::new()
        .stack_size(STACK)
        .spawn(run)?
        .join()
        .map_err(|_| "the thread on the small stack panicked".into())
}

fn front(options: &Options, source: &str, includes: Includes) -> Result<rglsl::Module, Outcome> {
    let parsed = match includes {
        Includes::None => Frontend::default().parse(options, source),
        Includes::Chain(levels) => Frontend::default().parse_with_includer(
            options,
            source,
            FileId(0),
            &mut IncludeChain { levels },
        ),
        Includes::Recursive => {
            Frontend::default().parse_with_includer(options, source, FileId(0), &mut Recursive)
        }
    };
    parsed.map_err(|errors| {
        let messages: Vec<String> = errors.errors.iter().map(ToString::to_string).collect();
        Outcome::Rejected(messages.join("\n"))
    })
}

fn pipeline(source: &str, includes: Includes, paths: Paths) -> Outcome {
    let options = Options::from(ShaderStage::Fragment);
    let outcome = direct(&options, source, includes);
    if outcome != Outcome::Compiled || paths == Paths::Direct {
        return outcome;
    }
    linked(&options, source)
}

fn direct(options: &Options, source: &str, includes: Includes) -> Outcome {
    let mut module = match front(options, source, includes) {
        Ok(module) => module,
        Err(outcome) => return outcome,
    };
    let mut validator = Validator::new(ValidationFlags::all(), Capabilities::all());
    if let Err(error) = validator.validate(&module) {
        return Outcome::Failed(format!("validation: {error:?}"));
    }
    if let Err(error) = compact(&mut module, KeepUnused::No) {
        return Outcome::Failed(format!("compaction: {error:?}"));
    }
    let info = match validator.validate(&module) {
        Ok(info) => info,
        Err(error) => return Outcome::Failed(format!("validation: {error:?}")),
    };
    match spv::write_vec(&module, &info, &spv::Options::default(), None) {
        Ok(_) => Outcome::Compiled,
        Err(error) => Outcome::Failed(format!("SPIR-V: {error}")),
    }
}

fn linked(options: &Options, source: &str) -> Outcome {
    let object = match Frontend::default().compile(options, source) {
        Ok(object) => object,
        Err(errors) => {
            let messages: Vec<String> = errors.errors.iter().map(ToString::to_string).collect();
            return Outcome::Rejected(messages.join("\n"));
        }
    };
    let object = match encode(&object).map(|text| decode(&text)) {
        Ok(Ok(object)) => object,
        Ok(Err(error)) | Err(error) => return Outcome::Failed(format!("object file: {error}")),
    };
    let linked = match link(&[object], &LinkOptions::default()) {
        Ok(linked) => linked,
        Err(errors) => return Outcome::Failed(format!("link: {errors}")),
    };
    match spv::write_vec(&linked.module, &linked.info, &spv::Options::default(), None) {
        Ok(_) => Outcome::Compiled,
        Err(error) => Outcome::Failed(format!("linked SPIR-V: {error}")),
    }
}

#[derive(Clone, Copy, PartialEq, Eq)]
enum Paths {
    Direct,
    Both,
}

fn check(source: String) -> TestResult<Outcome> {
    on_small_stack(move || pipeline(&source, Includes::None, Paths::Both))
}

fn check_including(source: String, includes: Includes) -> TestResult<Outcome> {
    on_small_stack(move || pipeline(&source, includes, Paths::Direct))
}

fn compiles_at(depth: usize, name: &str, source: impl Fn(usize) -> String) -> TestResult {
    assert_eq!(
        check(source(depth))?,
        Outcome::Compiled,
        "{name} at {depth}"
    );
    Ok(())
}

fn shader(globals: &str, body: &str) -> String {
    format!(
        "#version 450\n#extension GL_EXT_nonuniform_qualifier : enable\n\
         #extension GL_EXT_control_flow_attributes : enable\n\
         layout(location = 0) out vec4 color;\n\
         int f(int a) {{ return a; }}\n\
         int o(out int a) {{ a = 1; return 2; }}\n\
         {globals}\n\
         void main() {{\n\
         int b = 1; bool t = true; vec4 v = vec4(1.0); int c[2] = int[2](0, 1);\n\
         {body}\n\
         color = vec4(float(b)) + v;\n}}\n"
    )
}

fn nested_body(prefix: &str, open: &str, core: &str, close: &str) -> impl Fn(usize) -> String {
    let (prefix, open, core, close) = (
        prefix.to_owned(),
        open.to_owned(),
        core.to_owned(),
        close.to_owned(),
    );
    move |count| {
        shader(
            "",
            &format!(
                "{prefix}{}{core}{};",
                open.repeat(count),
                close.repeat(count)
            ),
        )
    }
}

fn chain_of(prefix: &str, count: usize, level: impl Fn(usize) -> String) -> String {
    let mut globals = String::from(prefix);
    for index in 1..count {
        globals.push_str(&level(index));
    }
    globals
}

fn struct_chain(count: usize) -> String {
    chain_of("struct S0 { int a; };\n", count, |level| {
        format!("struct S{level} {{ S{} a; int b; }};\n", level - 1)
    })
}

fn struct_constructor(count: usize) -> String {
    let mut constructor = String::from("S0(2)");
    for level in 1..count {
        constructor = format!("S{level}({constructor}, 0)");
    }
    constructor
}

fn deep_expressions_compile_on_a_small_stack(depth: usize) -> TestResult {
    let cases = [
        ("parentheses", "b = ", "(", "b", ")"),
        ("negation", "b = ", "-(", "b", ")"),
        ("logical not", "t = ", "!(", "t", ")"),
        ("bitwise not", "b = ", "~(", "b", ")"),
        ("binary chain", "b = ", "b + (", "b", ")"),
        ("mixed precedence", "b = ", "b * b + (", "b", ")"),
        ("right operand", "b = ", "b + b * (", "b", ")"),
        ("comparison", "t = ", "t == (", "t", ")"),
        ("logical and", "t = ", "t && (", "t", ")"),
        (
            "short-circuit with effects",
            "t = ",
            "(b++ > 0) || (",
            "t",
            ")",
        ),
        ("assignment", "", "b = (", "2", ")"),
        ("compound assignment", "", "b += (", "2", ")"),
        ("conditional else", "b = ", "t ? b : (", "b", ")"),
        ("conditional then", "b = ", "t ? ", "b", " : b"),
        (
            "conditional with effects",
            "b = ",
            "b > 2 ? b++ : (",
            "b",
            ")",
        ),
        ("user call", "b = ", "f(", "b", ")"),
        ("out argument", "b = ", "o(b) + (", "b", ")"),
        ("built-in call", "b = ", "abs(", "b", ")"),
        ("two-argument built-in", "b = ", "max(b, ", "b", ")"),
        ("constructor", "b = ", "int(", "b", ")"),
        ("vector constructor", "v = ", "vec4(", "v", ")"),
        ("nonuniformEXT", "b = ", "nonuniformEXT(", "b", ")"),
        ("subscript", "b = ", "c[", "0", "]"),
        (
            "array length",
            "b = ",
            "c[int[2](",
            "0",
            ", 0).length() - 2]",
        ),
        ("swizzle", "v = ", "(", "v", ").wzyx"),
        ("increment", "b = ", "b++ + (", "b", ")"),
        ("sequence", "b = ", "(b, ", "b", ")"),
    ];
    for (name, prefix, open, core, close) in cases {
        compiles_at(depth, name, nested_body(prefix, open, core, close))?;
    }
    Ok(())
}

fn deep_statements_compile_on_a_small_stack(depth: usize) -> TestResult {
    let cases = [
        ("blocks", "{ ", " }"),
        ("if", "if (t) ", ""),
        ("if blocks", "if (t) { ", " }"),
        ("else if", "if (b > 3) b = 4; else ", ""),
        ("else blocks", "if (b > 3) b = 4; else { ", " }"),
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
    for (name, open, close) in cases {
        compiles_at(depth, name, nested_body("", open, "b = 2;", close))?;
    }
    Ok(())
}

fn deep_types_compile_on_a_small_stack(depth: usize) -> TestResult {
    compiles_at(depth, "struct chains", |count| {
        shader(
            &struct_chain(count),
            &format!("S{0} s; s.b = 1; S{0} r = s; b = r.b;", count - 1),
        )
    })?;
    compiles_at(depth, "array dimensions", |count| {
        shader(
            "",
            &format!(
                "int a{0}; int r{0} = a; b = r.length();",
                "[1]".repeat(count)
            ),
        )
    })?;
    compiles_at(depth, "struct parameters and results", |count| {
        let last = count - 1;
        shader(
            &format!(
                "{}int p(S{last} s) {{ return s.b; }} S{last} q() {{ S{last} r; r.b = 3; return r; }}",
                struct_chain(count)
            ),
            "b = p(q());",
        )
    })?;
    compiles_at(depth, "uniform block members", |count| {
        shader(
            &format!(
                "{}layout(std140, binding = 0) uniform U {{ S{} s; }} u;",
                struct_chain(count),
                count - 1
            ),
            "b = u.s.b;",
        )
    })?;
    compiles_at(depth, "storage block members", |count| {
        shader(
            &format!(
                "{}layout(std430, binding = 1) buffer B {{ S{} s; }} bb;",
                struct_chain(count),
                count - 1
            ),
            "bb.s.b = b; b = bb.s.b;",
        )
    })?;
    compiles_at(depth, "push constant members", |count| {
        shader(
            &format!(
                "{}layout(push_constant) uniform P {{ S{} s; }} pc;",
                struct_chain(count),
                count - 1
            ),
            "b = pc.s.b;",
        )
    })?;
    compiles_at(depth, "storage block array dimensions", |count| {
        shader(
            &format!(
                "layout(std430, binding = 2) buffer A {{ int a{}; }} ab;",
                "[1]".repeat(count)
            ),
            &format!(
                "b = ab.a{}.length();",
                "[0]".repeat(count.min(SUBSCRIPTS) - 1)
            ),
        )
    })?;
    compiles_at(depth, "uniform matrix array dimensions", |count| {
        shader(
            &format!(
                "layout(std140, binding = 3) uniform M {{ mat2 m{}; }} um;",
                "[1]".repeat(count)
            ),
            &format!(
                "b = um.m{}.length();",
                "[0]".repeat(count.min(SUBSCRIPTS) - 1)
            ),
        )
    })?;
    compiles_at(depth, "input structs", |count| {
        shader(
            &format!(
                "{}layout(location = 1) flat in I{} si;",
                chain_of("struct I0 { int a; };\n", count, |level| {
                    format!("struct I{level} {{ I{} a; }};\n", level - 1)
                }),
                count - 1
            ),
            &format!("b = si{};", ".a".repeat(count)),
        )
    })?;
    compiles_at(depth, "16-bit members", |count| {
        shader(
            &format!(
                "#extension GL_EXT_shader_explicit_arithmetic_types : enable\n{}layout(std430, binding = 5) buffer H {{ H{} h; }} hb;",
                chain_of("struct H0 { float16_t a; };\n", count, |level| {
                    format!("struct H{level} {{ H{} a; int b; }};\n", level - 1)
                }),
                count - 1
            ),
            "b = hb.h.b;",
        )
    })?;
    compiles_at(depth, "buffer references", |count| {
        shader(
            &format!(
                "#extension GL_EXT_buffer_reference : enable\n{}layout(std430, binding = 6) buffer RB {{ R{} r; }} rb;",
                chain_of(
                    "layout(buffer_reference) buffer R0 { int a; };\n",
                    count,
                    |level| format!(
                        "layout(buffer_reference) buffer R{level} {{ R{} n; int a; }};\n",
                        level - 1
                    )
                ),
                count - 1
            ),
            "b = rb.r.a;",
        )
    })?;
    {
        let source = shader(
            &format!(
                "{}int a; {}",
                "struct { ".repeat(depth),
                "} a; ".repeat(depth)
            ),
            "",
        );
        assert!(
            matches!(check(source)?, Outcome::Rejected(_)),
            "inline structs at {depth}"
        );
    }
    Ok(())
}

fn deep_initializers_compile_on_a_small_stack(depth: usize) -> TestResult {
    compiles_at(depth, "struct initializer lists", |count| {
        let mut initializer = String::from("{2}");
        for _ in 1..count {
            initializer = format!("{{{initializer}, 0}}");
        }
        shader(
            &struct_chain(count),
            &format!("S{} s = {initializer}; b = s.b;", count - 1),
        )
    })?;
    compiles_at(depth, "struct constructors", |count| {
        shader(
            &struct_chain(count),
            &format!("S{} s = {}; b = s.b;", count - 1, struct_constructor(count)),
        )
    })?;
    compiles_at(depth, "constant structs", |count| {
        shader(
            &format!(
                "{}const S{} k = {};",
                struct_chain(count),
                count - 1,
                struct_constructor(count)
            ),
            "b = k.b;",
        )
    })?;
    Ok(())
}

fn array_initializer_lists(depth: usize) -> TestResult {
    let source = shader(
        "",
        &format!(
            "int a{} = {}2{}; b = a{};",
            "[1]".repeat(depth),
            "{".repeat(depth),
            "}".repeat(depth),
            "[0]".repeat(depth)
        ),
    );
    assert_eq!(check(source)?, Outcome::Compiled, "array initializer lists");
    Ok(())
}

fn deep_calls_compile_on_a_small_stack(depth: usize) -> TestResult {
    compiles_at(depth, "call chains", |count| {
        shader(
            &chain_of("int h0(int a) { return a + 1; }\n", count, |index| {
                format!("int h{index}(int a) {{ return h{}(a) + 1; }}\n", index - 1)
            }),
            &format!("b = h{}(b);", count - 1),
        )
    })?;
    let combined = |count: usize| {
        let depth = 24;
        let mut globals = String::from("struct T0 { int a; };\n");
        for level in 1..depth {
            globals.push_str(&format!("struct T{level} {{ T{} a; }};\n", level - 1));
        }
        let mut constructor = String::new();
        for level in (0..depth).rev() {
            constructor.push_str(&format!("T{level}("));
        }
        let body = format!(
            "{}T{} s = {constructor}{}2{}{}; b = s{} + {}b{};{}",
            "for (int i = 0; i < 2; i++) { ".repeat(count),
            depth - 1,
            "f(".repeat(count),
            ")".repeat(count),
            ")".repeat(depth),
            ".a".repeat(depth),
            "abs(".repeat(count),
            ")".repeat(count),
            " }".repeat(count)
        );
        shader(&globals, &body)
    };
    assert_eq!(
        check(combined(depth))?,
        Outcome::Compiled,
        "statements, types and calls together at {depth}"
    );
    Ok(())
}

fn preprocessor_limits_match_glslang_on_a_small_stack(depth: usize) -> TestResult {
    let limits = Limits::default();
    {
        let macros = shader(
            "#define F(x) x",
            &format!("b = {}b{};", "F(".repeat(depth), ")".repeat(depth)),
        );
        let outcome = check(macros)?;
        assert!(
            outcome.rejected_with("macro expansion depth limit exceeded")
                || outcome.rejected_with("preprocessing token limit exceeded"),
            "macro arguments at {depth}: {outcome:?}"
        );
        let definitions = shader(
            &chain_of("#define M0(x) x\n", depth, |level| {
                format!("#define M{level}(x) M{}(x)\n", level - 1)
            }),
            &format!("b = M{}(b);", depth - 1),
        );
        assert_eq!(
            check(definitions)?,
            Outcome::Compiled,
            "macro definitions at {depth}"
        );
        let conditions = shader(
            &format!("{}\n{}", "#if 1\n".repeat(depth), "#endif\n".repeat(depth)),
            "",
        );
        let outcome = check(conditions)?;
        assert!(
            outcome.rejected_with("maximum nesting depth exceeded"),
            "#if at {depth}: {outcome:?}"
        );
        let parentheses = shader(
            &format!("#if {}1{}\n#endif", "(".repeat(depth), ")".repeat(depth)),
            "",
        );
        assert_eq!(check(parentheses)?, Outcome::Compiled, "#if expressions");
        let operators = shader(&format!("#if {}1\n#endif", "- ~ ".repeat(depth)), "");
        assert_eq!(check(operators)?, Outcome::Compiled, "#if operators");
        let include = shader(
            "#extension GL_GOOGLE_include_directive : enable\n#include \"first.h\"",
            "",
        );
        assert_eq!(
            check_including(include, Includes::Chain(depth))?,
            Outcome::Compiled,
            "includes at {depth}"
        );
    }
    let deepest_macro = shader(
        &chain_of(
            "#define M0(x) x\n",
            limits.max_macro_expansion_depth - 2,
            |level| format!("#define M{level}(x) M{}(x)\n", level - 1),
        ),
        &format!("b = M{}(b);", limits.max_macro_expansion_depth - 3),
    );
    assert_eq!(check(deepest_macro)?, Outcome::Compiled);
    let deepest_if = shader(
        &format!(
            "{}\n{}",
            "#if 1\n".repeat(limits.max_if_nesting - 1),
            "#endif\n".repeat(limits.max_if_nesting - 1)
        ),
        "",
    );
    assert_eq!(check(deepest_if)?, Outcome::Compiled);
    let include = shader(
        "#extension GL_GOOGLE_include_directive : enable\n#include \"first.h\"",
        "",
    );
    assert!(check_including(include, Includes::Recursive)?.rejected_with("recursive include"));
    Ok(())
}

fn the_preprocessor_without_limits_handles_deep_input_on_a_small_stack(depth: usize) -> TestResult {
    struct NoIncludes;
    impl Includer for NoIncludes {
        fn include(
            &mut self,
            requested: &str,
            _kind: IncludeKind,
            _from: FileId,
            _depth: usize,
        ) -> Result<IncludedFile, IncludeError> {
            Err(IncludeError::new(format!("no {requested}")))
        }
    }
    {
        let sources = [
            format!(
                "{}int b = M{}(1);\n",
                chain_of("#define M0(x) x\n", depth, |level| {
                    format!("#define M{level}(x) M{}(x)\n", level - 1)
                }),
                depth - 1
            ),
            format!(
                "#define F(x) x\nint b = {}1{};\n",
                "F(".repeat(depth),
                ")".repeat(depth)
            ),
            format!(
                "{}int b;\n{}",
                "#if 1\n".repeat(depth),
                "#endif\n".repeat(depth)
            ),
        ];
        for source in sources {
            let result = on_small_stack(move || {
                let options = rglsl_pp::Options {
                    limits: Limits {
                        max_if_nesting: usize::MAX,
                        max_macro_expansion_depth: usize::MAX,
                        ..Limits::default()
                    },
                    ..rglsl_pp::Options::default()
                };
                let preprocessed = rglsl_pp::preprocess(
                    &format!("#version 450\n{source}"),
                    FileId(0),
                    &options,
                    &mut NoIncludes,
                );
                let messages: Vec<String> = preprocessed
                    .diagnostics
                    .iter()
                    .map(|diagnostic| format!("{:?}", diagnostic.kind))
                    .collect();
                (preprocessed.text.contains("int b"), messages)
            })?;
            assert!(
                result.0
                    || result
                        .1
                        .iter()
                        .any(|message| message.contains("TokenLimit")),
                "{depth}: {:?}",
                result.1
            );
        }
    }
    Ok(())
}

fn repeated(open: &str, core: &str, close: &str) -> String {
    format!("{}{core}{}", open.repeat(FLAT), close.repeat(FLAT))
}

fn flat_chains_compile_on_a_small_stack() -> TestResult {
    let cases = [
        (
            "binary chain",
            "",
            format!("b = {};", repeated("b + ", "b", "")),
        ),
        (
            "every binary operator",
            "",
            format!(
                "b = b{};",
                " + b - b * b / 3 % 5 << 1 >> 1 & b | b ^ b".repeat(FLAT / 10)
            ),
        ),
        (
            "mixed precedence",
            "",
            format!("b = b * b{};", " + b * b".repeat(FLAT)),
        ),
        (
            "implicit conversions",
            "",
            format!("v.x = v.x{};", " + b * 2u + 1.0".repeat(FLAT / 3)),
        ),
        (
            "comparison chain",
            "",
            format!("t = t{};", " == t != t".repeat(FLAT / 2)),
        ),
        ("logical and", "", format!("t = t{};", " && t".repeat(FLAT))),
        ("logical or", "", format!("t = t{};", " || t".repeat(FLAT))),
        (
            "short-circuit with effects",
            "",
            format!("t = t{};", " && (b++ > 0) || f(b) > 1".repeat(FLAT / 2)),
        ),
        ("logical xor", "", format!("t = t{};", " ^^ t".repeat(FLAT))),
        (
            "constant chain",
            "",
            format!("const int k = 1{}; b = k;", " + 2 * 3".repeat(FLAT)),
        ),
        (
            "global constant chain",
            &format!("const int k = 1{};", " + 2 * 3".repeat(FLAT)),
            String::from("b = k;"),
        ),
        (
            "specialization constant chain",
            &format!(
                "layout(constant_id = 0) const int s = 1; const int k = s{};",
                " + s * 2".repeat(FLAT)
            ),
            String::from("b = k + c[k & 1];"),
        ),
        ("sequence", "", format!("b = (b{});", ", b".repeat(FLAT))),
        (
            "sequence statement",
            "",
            format!("b++{};", ", b++".repeat(FLAT)),
        ),
        ("assignment chain", "", format!("{}2;", "b = ".repeat(FLAT))),
        (
            "compound assignment chain",
            "",
            format!("{}2;", "b += b -= ".repeat(FLAT / 2)),
        ),
        (
            "converting assignment chain",
            "",
            format!("v.x = {}b;", "b = ".repeat(FLAT)),
        ),
        (
            "conditional chain",
            "",
            format!("b = {}b;", "t ? b : ".repeat(FLAT)),
        ),
        (
            "conditional chain with effects",
            "",
            format!("b = {}b;", "b > 2 ? b++ : ".repeat(FLAT)),
        ),
        (
            "constant conditional chain",
            "",
            format!("b = {}3;", "false ? 1 : ".repeat(FLAT)),
        ),
        ("negation chain", "", format!("b = {}b;", "- ".repeat(FLAT))),
        (
            "logical not chain",
            "",
            format!("t = {}t;", "!".repeat(FLAT)),
        ),
        (
            "unary chain",
            "",
            format!("b = {}b;", "-~+".repeat(FLAT / 3)),
        ),
        (
            "swizzle chain",
            "",
            format!("v = v{};", ".wzyx".repeat(FLAT)),
        ),
        (
            "swizzle store chain",
            "",
            format!("v{} = vec4(2.0);", ".wzyx".repeat(FLAT)),
        ),
        (
            "scalar swizzle chain",
            "",
            format!("v.x = v.x{};", ".x".repeat(FLAT)),
        ),
        (
            "member and subscript chain",
            "struct S { vec4 m[2]; };",
            format!(
                "S s = S(vec4[2](v, v)); s.m[1]{0}[2] = 2.0; v.x = s.m[1]{1}[0]; v.y = s.m[1].x;",
                ".wzyx.yxwz".repeat(FLAT / 2),
                ".wzyx[1].xxxx".repeat(FLAT / 2)
            ),
        ),
        (
            "nonuniform chain",
            "",
            format!("b = nonuniformEXT(b){}; b = c[b & 1];", " + b".repeat(FLAT)),
        ),
        (
            "precise chain",
            "",
            format!(
                "precise float p; float q = v.y; p = q{}; v.x = p;",
                " * q + 1.0".repeat(FLAT)
            ),
        ),
        (
            "precision chain",
            "",
            format!(
                "mediump float m = v.y; highp float h = m{}; v.x = h;",
                " * m + 1.0".repeat(FLAT)
            ),
        ),
        (
            "chain in a loop condition",
            "",
            format!(
                "for (int i = 0; i{} < 4; i++) {{ b++; }}",
                " + 0".repeat(FLAT)
            ),
        ),
        (
            "chain in a user call",
            "",
            format!("b = f(b{});", " + b".repeat(FLAT)),
        ),
        (
            "chain in a function",
            &format!("int k(int a) {{ return a{}; }}", " * a - 1".repeat(FLAT)),
            String::from("b = k(b);"),
        ),
    ];
    for (name, globals, body) in cases {
        let outcome = check(shader(globals, &body))?;
        assert_eq!(outcome, Outcome::Compiled, "{name}");
    }
    Ok(())
}

fn long_flat_inputs_compile_on_a_small_stack() -> TestResult {
    let long = [
        shader("", &"b = b + 1;\n".repeat(LONG)),
        shader(
            "",
            &format!("if (t) b = 2;{}", " else b = 3; if (t) b = 2;".repeat(LONG)),
        ),
        shader(
            &chain_of(
                "layout(constant_id = 0) const int k0 = 1;\n",
                LONG,
                |index| format!("const int k{index} = k{} + 1;\n", index - 1),
            ),
            &format!("b = k{};", LONG - 1),
        ),
        shader(
            &chain_of("const int k0 = 1;\n", LONG, |index| {
                format!("const int k{index} = k{} * 3 + 1;\n", index - 1)
            }),
            &format!("b = k{};", LONG - 1),
        ),
        shader(
            "",
            &format!(
                "{}p = a{}; v.x = p;",
                chain_of("precise float p; float a0 = v.x;\n", LONG, |index| format!(
                    "float a{index} = a{} * 2.0 + 1.0;\n",
                    index - 1
                )),
                LONG - 1
            ),
        ),
        shader(
            &chain_of("#define M0 1\n", LONG, |index| {
                format!("#define M{index} M{}\n", index - 1)
            }),
            &format!("b = M{};", LONG - 1),
        ),
    ];
    for source in long {
        assert_eq!(check(source)?, Outcome::Compiled);
    }
    Ok(())
}

fn nested_object(depth: usize) -> TestResult<String> {
    let options = Options::from(ShaderStage::Fragment);
    let mut object = Frontend::default()
        .compile(&options, &shader("", "b = 2;"))
        .map_err(|errors| format!("{errors:?}"))?;
    let function = &mut object.module.entry_points[0].function;
    let condition = function.expressions.append(
        rglsl::Expression::Literal(rglsl::Literal::Bool(true)),
        rglsl::Span::default(),
    );
    let mut body = core::mem::take(&mut function.body);
    for _ in 1..depth {
        let mut outer = rglsl::Block::new();
        outer.push(
            rglsl::Statement::If {
                condition,
                accept: body,
                reject: rglsl::Block::new(),
                control: rglsl::SelectionControl::None,
            },
            rglsl::Span::default(),
        );
        body = outer;
    }
    function.body = body;
    Ok(encode(&object)?)
}

fn deep_object_files_link_on_a_small_stack(depth: usize) -> TestResult {
    {
        let text = on_small_stack(move || nested_object(depth))??;
        let outcome = on_small_stack(move || {
            let object = match decode(&text) {
                Ok(object) => object,
                Err(error) => return Outcome::Failed(error.to_string()),
            };
            if let Err(error) = rglsl_link::validate_object(&object) {
                return Outcome::Failed(format!("{error}"));
            }
            let copy = object.clone();
            let linked = match link(&[copy], &LinkOptions::default()) {
                Ok(linked) => linked,
                Err(errors) => return Outcome::Failed(format!("link: {errors}")),
            };
            match spv::write_vec(&linked.module, &linked.info, &spv::Options::default(), None) {
                Ok(_) => Outcome::Compiled,
                Err(error) => Outcome::Failed(format!("linked SPIR-V: {error}")),
            }
        })?;
        assert_eq!(
            outcome,
            Outcome::Compiled,
            "object file nested {depth} deep"
        );
    }
    Ok(())
}

type Group = (fn(usize) -> TestResult, usize);

fn every_kind(depth: usize) -> Vec<Group> {
    Vec::from([
        (
            deep_expressions_compile_on_a_small_stack as fn(usize) -> TestResult,
            depth,
        ),
        (deep_statements_compile_on_a_small_stack, depth),
        (deep_types_compile_on_a_small_stack, depth),
        (deep_initializers_compile_on_a_small_stack, depth),
        (deep_calls_compile_on_a_small_stack, depth),
        (preprocessor_limits_match_glslang_on_a_small_stack, depth),
        (
            the_preprocessor_without_limits_handles_deep_input_on_a_small_stack,
            depth,
        ),
        (deep_object_files_link_on_a_small_stack, depth),
        (deep_spirv_inputs_compile_on_a_small_stack, depth),
    ])
}

fn run_groups(groups: Vec<Group>) -> TestResult {
    let pending = std::sync::Mutex::new(groups);
    let failures = std::sync::Mutex::new(Vec::new());
    std::thread::scope(|scope| {
        for _ in 0..WORKERS {
            scope.spawn(|| loop {
                let next = match pending.lock() {
                    Ok(mut pending) => pending.pop(),
                    Err(_) => None,
                };
                let Some((group, depth)) = next else {
                    break;
                };
                if let Err(error) = group(depth) {
                    if let Ok(mut failures) = failures.lock() {
                        failures.push(error.to_string());
                    }
                }
            });
        }
    });
    let failures = failures
        .into_inner()
        .map_err(|_| "a worker panicked while recording a failure")?;
    if failures.is_empty() {
        Ok(())
    } else {
        Err(failures.join("\n").into())
    }
}

#[test]
fn nesting_10_000_levels_deep_on_a_small_stack() -> TestResult {
    let mut groups = every_kind(DEFAULT_DEPTH);
    groups.push((|_| flat_chains_compile_on_a_small_stack(), 0));
    groups.push((|_| long_flat_inputs_compile_on_a_small_stack(), 0));
    groups.push((|_| hostile_object_files_are_rejected_on_a_small_stack(), 0));
    run_groups(groups)
}

#[test]
#[ignore = "minutes in a debug build: run with `cargo test --release -p rglsl-link --test nesting -- --ignored`"]
fn nesting_100_000_levels_deep_on_a_small_stack() -> TestResult {
    let mut groups = every_kind(DEEP_DEPTH);
    groups.push((array_initializer_lists, DEFAULT_DEPTH));
    run_groups(groups)
}

fn spirv_words(source: &str) -> Result<Vec<u32>, String> {
    let options = Options::from(ShaderStage::Fragment);
    let mut module =
        front(&options, source, Includes::None).map_err(|outcome| format!("{outcome:?}"))?;
    let mut validator = Validator::new(ValidationFlags::all(), Capabilities::all());
    validator
        .validate(&module)
        .map_err(|error| format!("validation: {error:?}"))?;
    compact(&mut module, KeepUnused::No).map_err(|error| format!("compaction: {error:?}"))?;
    let info = validator
        .validate(&module)
        .map_err(|error| format!("validation: {error:?}"))?;
    spv::write_vec(&module, &info, &spv::Options::default(), None)
        .map_err(|error| format!("SPIR-V: {error}"))
}

fn through_spirv(words: &[u32]) -> Outcome {
    let bytes: Vec<u8> = words.iter().flat_map(|word| word.to_le_bytes()).collect();
    let module =
        match rglsl::front::spv::parse_u8_slice(&bytes, &rglsl::front::spv::Options::default()) {
            Ok(module) => module,
            Err(error) => return Outcome::Rejected(format!("SPIR-V input: {error}")),
        };
    let mut validator = Validator::new(ValidationFlags::all(), Capabilities::all());
    let info = match validator.validate(&module) {
        Ok(info) => info,
        Err(error) => return Outcome::Failed(format!("validation: {error:?}")),
    };
    match spv::write_vec(&module, &info, &spv::Options::default(), None) {
        Ok(_) => Outcome::Compiled,
        Err(error) => Outcome::Failed(format!("SPIR-V: {error}")),
    }
}

fn instruction(words: &mut Vec<u32>, op: u32, operands: &[u32]) -> TestResult {
    let count = u32::try_from(operands.len() + 1)?;
    words.push(count << 16 | op);
    words.extend_from_slice(operands);
    Ok(())
}

fn composite_insert_module(depth: usize) -> TestResult<Vec<u32>> {
    let depth = u32::try_from(depth)?;
    let (void, function_type, int, one, main, label, undef, result) = (1, 2, 3, 4, 5, 6, 7, 8);
    let first_struct = 9;
    let last_struct = first_struct + depth - 1;
    let mut words = Vec::from([0x0723_0203, 0x0001_0000, 0, last_struct + 1, 0]);
    instruction(&mut words, 17, &[1])?;
    instruction(&mut words, 14, &[0, 1])?;
    instruction(&mut words, 15, &[4, main, u32::from_le_bytes(*b"main"), 0])?;
    instruction(&mut words, 16, &[main, 7])?;
    instruction(&mut words, 19, &[void])?;
    instruction(&mut words, 33, &[function_type, void])?;
    instruction(&mut words, 21, &[int, 32, 1])?;
    instruction(&mut words, 43, &[int, one, 1])?;
    instruction(&mut words, 30, &[first_struct, int])?;
    for id in first_struct + 1..=last_struct {
        instruction(&mut words, 30, &[id, id - 1])?;
    }
    instruction(&mut words, 1, &[last_struct, undef])?;
    instruction(&mut words, 54, &[void, main, 0, function_type])?;
    instruction(&mut words, 248, &[label])?;
    let mut operands = Vec::from([last_struct, result, one, undef]);
    operands.extend(core::iter::repeat_n(0, usize::try_from(depth)?));
    instruction(&mut words, 82, &operands)?;
    instruction(&mut words, 253, &[])?;
    instruction(&mut words, 56, &[])?;
    Ok(words)
}

fn deep_spirv_inputs_compile_on_a_small_stack(depth: usize) -> TestResult {
    let cases = [
        (
            "if blocks",
            nested_body("", "if (t) { ", "b = 2;", " }")(depth),
        ),
        (
            "loops",
            nested_body("", "for (int i = 0; i < 2; i++) { ", "b = 2;", " }")(depth),
        ),
        (
            "switch",
            nested_body("", "switch (b) { case 1: ", "b = 2;", " break; }")(depth),
        ),
        (
            "do while",
            nested_body("", "do { ", "b = 2;", " } while (b > 5);")(depth),
        ),
        (
            "struct chains",
            shader(
                &struct_chain(depth),
                &format!("S{0} s; s.b = 1; S{0} r = s; b = r.b;", depth - 1),
            ),
        ),
        (
            "array dimensions",
            shader(
                "",
                &format!(
                    "int a{0}; int r{0} = a; b = r.length();",
                    "[1]".repeat(depth)
                ),
            ),
        ),
    ];
    for (name, source) in cases {
        let outcome = on_small_stack(move || match spirv_words(&source) {
            Ok(words) => through_spirv(&words),
            Err(message) => Outcome::Failed(message),
        })?;
        assert_eq!(
            outcome,
            Outcome::Compiled,
            "SPIR-V input: {name} at {depth}"
        );
    }
    let inserts = depth.min(60_000);
    let words = composite_insert_module(inserts)?;
    let outcome = on_small_stack(move || through_spirv(&words))?;
    assert_eq!(
        outcome,
        Outcome::Compiled,
        "SPIR-V input: composite insert {inserts} deep"
    );
    Ok(())
}

fn hostile_object_files_are_rejected_on_a_small_stack() -> TestResult {
    let options = Options::from(ShaderStage::Fragment);
    let object = Frontend::default()
        .compile(&options, &shader("", "if (t) { b = 2; }"))
        .map_err(|errors| format!("{errors:?}"))?;
    let text = encode(&object)?;
    let shell = "accept:[],reject:[]";
    let at = text
        .find(shell)
        .ok_or("the object file has no if statement")?;
    let condition = text[..at]
        .rfind("If(condition:")
        .ok_or("the object file has no if statement")?;
    let head = &text[condition..at];
    for depth in [3, 5, 8, 100, 1_000, DEEP_DEPTH] {
        let inner = format!(
            "{}{head}accept:[],reject:[]){}",
            format!("{head}accept:[").repeat(depth - 1),
            "],reject:[])".repeat(depth - 1)
        );
        let hostile = format!(
            "{}accept:[{inner}],reject:[]{}",
            text.get(..at).unwrap_or_default(),
            text.get(at + shell.len()..).unwrap_or_default()
        );
        let decoded = on_small_stack(move || {
            decode(&hostile)
                .map(drop)
                .map_err(|error| error.to_string())
        })?;
        assert!(
            decoded.is_err() || depth < 100,
            "a hostile object file nested {depth} deep: {decoded:?}"
        );
    }
    Ok(())
}
