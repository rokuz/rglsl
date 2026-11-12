#![allow(clippy::panic)]

use rglsl::back::spv;
use rglsl::compact::{compact, KeepUnused};
use rglsl::front::glsl::{Frontend, Options};
use rglsl::valid::{Capabilities, ValidationFlags, Validator};
use rglsl::ShaderStage;
use rglsl_link::{decode, encode, link, Options as LinkOptions};
use rglsl_pp::{FileId, IncludeError, IncludeKind, IncludedFile, Includer, Limits};
use std::sync::{Condvar, Mutex};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error + Send + Sync>>;

const STACK: usize = 256 << 10;
const DEPTHS: [usize; 2] = [10_000, 100_000];
const FLAT: usize = 20_000;
const LONG: usize = 4_000;
const CONCURRENT: usize = 4;

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

static RUNNING: Mutex<usize> = Mutex::new(0);
static FINISHED: Condvar = Condvar::new();

struct Slot;

impl Slot {
    fn take() -> TestResult<Self> {
        let mut running = RUNNING.lock().map_err(|_| "the slot lock is poisoned")?;
        while *running >= CONCURRENT {
            running = FINISHED
                .wait(running)
                .map_err(|_| "the slot lock is poisoned")?;
        }
        *running += 1;
        Ok(Self)
    }
}

impl Drop for Slot {
    fn drop(&mut self) {
        if let Ok(mut running) = RUNNING.lock() {
            *running = running.saturating_sub(1);
        }
        FINISHED.notify_one();
    }
}

fn on_small_stack<T: Send + 'static>(run: impl FnOnce() -> T + Send + 'static) -> TestResult<T> {
    let slot = Slot::take()?;
    let result = std::thread::Builder::new()
        .stack_size(STACK)
        .spawn(run)?
        .join()
        .map_err(|_| "the thread on the small stack panicked".into());
    drop(slot);
    result
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
    if paths == Paths::Direct || paths == Paths::Both {
        let outcome = direct(&options, source, includes);
        if outcome != Outcome::Compiled || paths == Paths::Direct {
            return outcome;
        }
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
    Linked,
    Both,
}

fn check(source: String) -> TestResult<Outcome> {
    on_small_stack(move || pipeline(&source, Includes::None, Paths::Both))
}

fn check_at(source: String, depth: usize) -> TestResult<Outcome> {
    let paths = if depth > DEPTHS[0] {
        Paths::Linked
    } else {
        Paths::Both
    };
    on_small_stack(move || pipeline(&source, Includes::None, paths))
}

fn check_including(source: String, includes: Includes) -> TestResult<Outcome> {
    on_small_stack(move || pipeline(&source, includes, Paths::Direct))
}

fn compiles_at_every_depth(name: &str, source: impl Fn(usize) -> String) -> TestResult {
    for depth in DEPTHS {
        assert_eq!(
            check_at(source(depth), depth)?,
            Outcome::Compiled,
            "{name} at {depth}"
        );
    }
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

#[test]
fn deep_expressions_compile_on_a_small_stack() -> TestResult {
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
        compiles_at_every_depth(name, nested_body(prefix, open, core, close))?;
    }
    Ok(())
}

#[test]
fn deep_statements_compile_on_a_small_stack() -> TestResult {
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
        compiles_at_every_depth(name, nested_body("", open, "b = 2;", close))?;
    }
    Ok(())
}

#[test]
fn deep_types_compile_on_a_small_stack() -> TestResult {
    compiles_at_every_depth("struct chains", |count| {
        shader(
            &struct_chain(count),
            &format!("S{0} s; s.b = 1; S{0} r = s; b = r.b;", count - 1),
        )
    })?;
    compiles_at_every_depth("array dimensions", |count| {
        shader(
            "",
            &format!(
                "int a{0}; int r{0} = a; b = r.length();",
                "[1]".repeat(count)
            ),
        )
    })?;
    compiles_at_every_depth("struct parameters and results", |count| {
        let last = count - 1;
        shader(
            &format!(
                "{}int p(S{last} s) {{ return s.b; }} S{last} q() {{ S{last} r; r.b = 3; return r; }}",
                struct_chain(count)
            ),
            "b = p(q());",
        )
    })?;
    compiles_at_every_depth("uniform block members", |count| {
        shader(
            &format!(
                "{}layout(std140, binding = 0) uniform U {{ S{} s; }} u;",
                struct_chain(count),
                count - 1
            ),
            "b = u.s.b;",
        )
    })?;
    compiles_at_every_depth("storage block members", |count| {
        shader(
            &format!(
                "{}layout(std430, binding = 1) buffer B {{ S{} s; }} bb;",
                struct_chain(count),
                count - 1
            ),
            "bb.s.b = b; b = bb.s.b;",
        )
    })?;
    compiles_at_every_depth("push constant members", |count| {
        shader(
            &format!(
                "{}layout(push_constant) uniform P {{ S{} s; }} pc;",
                struct_chain(count),
                count - 1
            ),
            "b = pc.s.b;",
        )
    })?;
    compiles_at_every_depth("storage block array dimensions", |count| {
        shader(
            &format!(
                "layout(std430, binding = 2) buffer A {{ int a{}; }} ab;",
                "[1]".repeat(count)
            ),
            &format!("b = ab.a{};", "[0]".repeat(count)),
        )
    })?;
    compiles_at_every_depth("uniform matrix array dimensions", |count| {
        shader(
            &format!(
                "layout(std140, binding = 3) uniform M {{ mat2 m{}; }} um;",
                "[1]".repeat(count)
            ),
            &format!("v.x = um.m{}[0].x;", "[0]".repeat(count)),
        )
    })?;
    compiles_at_every_depth("input structs", |count| {
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
    compiles_at_every_depth("16-bit members", |count| {
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
    compiles_at_every_depth("buffer references", |count| {
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
    for depth in DEPTHS {
        let source = shader(
            &format!(
                "{}int a; {}",
                "struct { ".repeat(depth),
                "} a; ".repeat(depth)
            ),
            "",
        );
        assert!(
            matches!(check_at(source, depth)?, Outcome::Rejected(_)),
            "inline structs at {depth}"
        );
    }
    Ok(())
}

#[test]
fn deep_initializers_compile_on_a_small_stack() -> TestResult {
    compiles_at_every_depth("struct initializer lists", |count| {
        let mut initializer = String::from("{2}");
        for _ in 1..count {
            initializer = format!("{{{initializer}, 0}}");
        }
        shader(
            &struct_chain(count),
            &format!("S{} s = {initializer}; b = s.b;", count - 1),
        )
    })?;
    compiles_at_every_depth("struct constructors", |count| {
        shader(
            &struct_chain(count),
            &format!("S{} s = {}; b = s.b;", count - 1, struct_constructor(count)),
        )
    })?;
    compiles_at_every_depth("constant structs", |count| {
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
    let depth = DEPTHS[0];
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

#[test]
fn deep_calls_compile_on_a_small_stack() -> TestResult {
    compiles_at_every_depth("call chains", |count| {
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
    let count = DEPTHS[0];
    assert_eq!(
        check(combined(count))?,
        Outcome::Compiled,
        "statements, types and calls together at {count}"
    );
    Ok(())
}

#[test]
fn preprocessor_limits_match_glslang_on_a_small_stack() -> TestResult {
    let limits = Limits::default();
    for depth in DEPTHS {
        let macros = shader(
            "#define F(x) x",
            &format!("b = {}b{};", "F(".repeat(depth), ")".repeat(depth)),
        );
        let outcome = check_at(macros, depth)?;
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
            check_at(definitions, depth)?,
            Outcome::Compiled,
            "macro definitions at {depth}"
        );
        let conditions = shader(
            &format!("{}\n{}", "#if 1\n".repeat(depth), "#endif\n".repeat(depth)),
            "",
        );
        let outcome = check_at(conditions, depth)?;
        assert!(
            outcome.rejected_with("maximum nesting depth exceeded"),
            "#if at {depth}: {outcome:?}"
        );
        let parentheses = shader(
            &format!("#if {}1{}\n#endif", "(".repeat(depth), ")".repeat(depth)),
            "",
        );
        assert_eq!(
            check_at(parentheses, depth)?,
            Outcome::Compiled,
            "#if expressions"
        );
        let operators = shader(&format!("#if {}1\n#endif", "- ~ ".repeat(depth)), "");
        assert_eq!(
            check_at(operators, depth)?,
            Outcome::Compiled,
            "#if operators"
        );
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

#[test]
fn the_preprocessor_without_limits_handles_deep_input_on_a_small_stack() -> TestResult {
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
    for depth in DEPTHS {
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

#[test]
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

#[test]
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

#[test]
fn deep_object_files_link_on_a_small_stack() -> TestResult {
    for depth in DEPTHS {
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
