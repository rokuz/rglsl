#![allow(clippy::unwrap_used, clippy::expect_used, clippy::panic)]

use rglsl::back::spv;
use rglsl::compact::{compact, KeepUnused};
use rglsl::front::glsl::{Frontend, Options};
use rglsl::valid::{Capabilities, ValidationFlags, Validator};
use rglsl::ShaderStage;
use rglsl_link::{decode, encode, link, Options as LinkOptions, MAX_BLOCK_DEPTH};
use rglsl_pp::{FileId, IncludeError, IncludeKind, IncludedFile, Includer, Limits};

const STACK: usize = 1 << 20;
const LIMIT: usize = 128;
const TYPE_LIMIT: usize = 64;
const HUGE: usize = 20_000;
const LONG: usize = 4_000;

const REJECTIONS: [&str; 6] = [
    "nested too deeply",
    "maximum nesting depth exceeded",
    "macro expansion depth limit exceeded",
    "recursive include",
    "preprocessing token limit exceeded",
    "a function body is nested too deeply",
];

#[derive(Debug, PartialEq, Eq)]
enum Outcome {
    Compiled,
    TooDeep,
    Failed(String),
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

fn on_small_stack<T: Send + 'static>(run: impl FnOnce() -> T + Send + 'static) -> T {
    std::thread::Builder::new()
        .stack_size(STACK)
        .spawn(run)
        .unwrap()
        .join()
        .unwrap()
}

fn rejection(messages: &[String]) -> Outcome {
    if messages
        .iter()
        .any(|message| REJECTIONS.iter().any(|known| message.contains(known)))
    {
        Outcome::TooDeep
    } else {
        Outcome::Failed(messages.join("\n"))
    }
}

fn pipeline(source: &str, includes: bool) -> Outcome {
    let options = Options::from(ShaderStage::Fragment);
    let parsed = if includes {
        Frontend::default().parse_with_includer(&options, source, FileId(0), &mut Recursive)
    } else {
        Frontend::default().parse(&options, source)
    };
    let mut module = match parsed {
        Ok(module) => module,
        Err(errors) => {
            let messages: Vec<String> = errors.errors.iter().map(ToString::to_string).collect();
            return rejection(&messages);
        }
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
    if let Err(error) = spv::write_vec(&module, &info, &spv::Options::default(), None) {
        return Outcome::Failed(format!("SPIR-V: {error}"));
    }
    let object = match Frontend::default().compile(&options, source) {
        Ok(object) => object,
        Err(errors) => return Outcome::Failed(format!("{errors:?}")),
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

fn wrapped(open: &str, core: &str, close: &str) -> impl Fn(usize) -> String {
    let (open, core, close) = (open.to_owned(), core.to_owned(), close.to_owned());
    move |count| {
        shader(
            "",
            &format!("{}{core}{}", open.repeat(count), close.repeat(count)),
        )
    }
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

fn deepest(name: &str, source: impl Fn(usize) -> String, includes: bool) -> usize {
    let mut accepted = 0;
    let mut rejected = HUGE;
    let outcome = check(source(rejected), includes);
    assert_eq!(outcome, Outcome::TooDeep, "{name} at {rejected}");
    while rejected - accepted > 1 {
        let middle = accepted + (rejected - accepted) / 2;
        match check(source(middle), includes) {
            Outcome::Compiled => accepted = middle,
            Outcome::TooDeep => rejected = middle,
            Outcome::Failed(message) => panic!("{name} at {middle}: {message}"),
        }
    }
    accepted
}

fn check(source: String, includes: bool) -> Outcome {
    on_small_stack(move || pipeline(&source, includes))
}

fn assert_deep(name: &str, source: impl Fn(usize) -> String, minimum: usize) {
    let accepted = deepest(name, source, false);
    assert!(
        accepted >= minimum,
        "{name}: only {accepted} levels compile, expected at least {minimum}"
    );
}

#[test]
fn expressions_at_the_nesting_limit_compile_on_a_small_stack() {
    let cases: [(&str, &str, &str, &str, &str, usize); 24] = [
        ("parentheses", "b = ", "(", "b", ")", 2),
        ("negation", "b = ", "-(", "b", ")", 2),
        ("logical not", "t = ", "!(", "t", ")", 2),
        ("bitwise not", "b = ", "~(", "b", ")", 2),
        ("binary chain", "b = ", "b + (", "b", ")", 2),
        ("mixed precedence", "b = ", "b * b + (", "b", ")", 2),
        ("right operand", "b = ", "b + b * (", "b", ")", 3),
        ("comparison chain", "t = ", "t == (", "t", ")", 2),
        ("logical chain", "t = ", "t && (", "t", ")", 2),
        ("assignment chain", "", "b = (", "2", ")", 2),
        ("compound assignment", "", "b += (", "2", ")", 2),
        ("conditional else", "b = ", "t ? b : (", "b", ")", 2),
        ("conditional then", "b = ", "t ? ", "b", " : b", 1),
        ("user call", "b = ", "f(", "b", ")", 2),
        ("built-in call", "b = ", "abs(", "b", ")", 2),
        ("two-argument built-in", "b = ", "max(b, ", "b", ")", 2),
        ("constructor", "b = ", "int(", "b", ")", 2),
        ("vector constructor", "v = ", "vec4(", "v", ")", 2),
        ("nonuniformEXT", "b = ", "nonuniformEXT(", "b", ")", 2),
        ("subscript", "b = ", "c[", "0", "]", 2),
        (
            "array length",
            "b = ",
            "c[int[2](",
            "0",
            ", 0).length() - 2]",
            4,
        ),
        ("swizzle", "v = ", "(", "v", ").wzyx", 2),
        ("increment", "b = ", "b++ + (", "b", ")", 2),
        ("sequence", "b = ", "(b, ", "b", ")", 2),
    ];
    for (name, prefix, open, core, close, units) in cases {
        let source = move |count: usize| {
            shader(
                "",
                &format!(
                    "{prefix}{}{core}{};",
                    open.repeat(count),
                    close.repeat(count)
                ),
            )
        };
        assert_deep(name, source, (LIMIT - 8) / units);
    }
}

#[test]
fn statements_at_the_nesting_limit_compile_on_a_small_stack() {
    let cases: [(&str, &str, &str, &str, usize); 10] = [
        ("blocks", "{ ", "b = 2;", " }", 1),
        ("if", "if (t) ", "b = 2;", "", 1),
        ("if blocks", "if (t) { ", "b = 2;", " }", 2),
        ("else if", "if (b > 3) b = 4; else ", "b = 2;", "", 1),
        (
            "else blocks",
            "if (b > 3) b = 4; else { ",
            "b = 2;",
            " }",
            2,
        ),
        ("for", "for (int i = 0; i < 2; i++) ", "b = 2;", "", 1),
        ("while", "while (t) ", "break;", "", 1),
        ("do while", "do { ", "b = 2;", " } while (b > 5);", 2),
        ("switch", "switch (b) { case 1: ", "b = 2;", " break; }", 1),
        (
            "loop control",
            "[[unroll]] for (int i = 0; i < 2; i++) { ",
            "b = 2;",
            " }",
            2,
        ),
    ];
    for (name, open, core, close, units) in cases {
        assert_deep(name, wrapped(open, core, close), (LIMIT - 8) / units);
    }
}

#[test]
fn nested_declarations_compile_on_a_small_stack() {
    assert_deep(
        "initializer lists",
        |count| {
            shader(
                "",
                &format!(
                    "int a{} = {}2{}; b = a{};",
                    "[1]".repeat(count),
                    "{".repeat(count),
                    "}".repeat(count),
                    "[0]".repeat(count)
                ),
            )
        },
        TYPE_LIMIT - 2,
    );
    assert_deep(
        "struct chains",
        |count| {
            shader(
                &struct_chain(count),
                &format!(
                    "S{0} s; s.b = 1; S{0} r = s; b = r.b;",
                    count.saturating_sub(1).max(1)
                ),
            )
        },
        TYPE_LIMIT - 2,
    );
    assert_deep(
        "struct initializers",
        |count| {
            let mut initializer = String::from("{2}");
            for _ in 1..count {
                initializer = format!("{{{initializer}, 0}}");
            }
            shader(
                &struct_chain(count),
                &format!(
                    "S{} s = {initializer}; b = s{};",
                    count.saturating_sub(1),
                    ".a".repeat(count)
                ),
            )
        },
        TYPE_LIMIT - 2,
    );
    assert_deep(
        "struct constructors",
        |count| {
            let mut constructor = String::from("S0(2)");
            for level in 1..count {
                constructor = format!("S{level}({constructor}, 0)");
            }
            shader(
                &struct_chain(count),
                &format!(
                    "S{} s = {constructor}; b = s{};",
                    count.saturating_sub(1),
                    ".a".repeat(count)
                ),
            )
        },
        TYPE_LIMIT - 2,
    );
    assert_deep(
        "array dimensions",
        |count| {
            shader(
                "",
                &format!(
                    "int a{0}; int r{0} = a; b = r.length();",
                    "[1]".repeat(count)
                ),
            )
        },
        TYPE_LIMIT - 2,
    );
    for count in [LIMIT - 8, HUGE] {
        let source = shader(
            &format!(
                "{}int a; {}",
                "struct { ".repeat(count),
                "} a; ".repeat(count)
            ),
            "",
        );
        let outcome = check(source, false);
        assert!(!matches!(outcome, Outcome::Compiled), "inline structs");
        if count == HUGE {
            assert_eq!(outcome, Outcome::TooDeep);
        }
    }
}

#[test]
fn the_worst_combination_compiles_on_a_small_stack() {
    let depth = 24;
    let mut globals = String::from("struct S0 { int a; };\n");
    for level in 1..depth {
        globals.push_str(&format!("struct S{level} {{ S{} a; }};\n", level - 1));
    }
    let mut constructor = String::new();
    for level in (0..depth).rev() {
        constructor.push_str(&format!("S{level}("));
    }
    let combined = move |count: usize| {
        let body = format!(
            "{}S{} s = {constructor}{}2{}{}; b = s{} + {}b{};{}",
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
    assert_deep("statements, types and calls together", combined, 16);
}

#[test]
fn preprocessor_nesting_is_bounded_on_a_small_stack() {
    let limits = Limits::default();
    let macros = |count: usize| {
        shader(
            "#define F(x) x",
            &format!("b = {}b{};", "F(".repeat(count), ")".repeat(count)),
        )
    };
    assert!(deepest("macro arguments", macros, false) >= limits.max_macro_expansion_depth - 2);
    let conditions = |count: usize| {
        shader(
            &format!("{}\n{}", "#if 1\n".repeat(count), "#endif\n".repeat(count)),
            "",
        )
    };
    assert!(deepest("#if", conditions, false) >= limits.max_if_nesting - 2);
    let parentheses = |count: usize| {
        shader(
            &format!("#if {}1{}\n#endif", "(".repeat(count), ")".repeat(count)),
            "",
        )
    };
    assert_eq!(check(parentheses(HUGE), false), Outcome::Compiled);
    let include = shader(
        "#extension GL_GOOGLE_include_directive : enable\n#include \"first.h\"",
        "",
    );
    assert_eq!(check(include, true), Outcome::TooDeep);
}

fn repeated(open: &str, core: &str, close: &str) -> String {
    format!("{}{core}{}", open.repeat(HUGE), close.repeat(HUGE))
}

#[test]
fn flat_chains_compile_on_a_small_stack() {
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
                " + b - b * b / 3 % 5 << 1 >> 1 & b | b ^ b".repeat(HUGE / 10)
            ),
        ),
        (
            "mixed precedence",
            "",
            format!("b = b * b{};", " + b * b".repeat(HUGE)),
        ),
        (
            "implicit conversions",
            "",
            format!("v.x = v.x{};", " + b * 2u + 1.0".repeat(HUGE / 3)),
        ),
        (
            "comparison chain",
            "",
            format!("t = t{};", " == t != t".repeat(HUGE / 2)),
        ),
        ("logical and", "", format!("t = t{};", " && t".repeat(HUGE))),
        ("logical or", "", format!("t = t{};", " || t".repeat(HUGE))),
        (
            "short-circuit with effects",
            "",
            format!("t = t{};", " && (b++ > 0) || f(b) > 1".repeat(HUGE / 2)),
        ),
        ("logical xor", "", format!("t = t{};", " ^^ t".repeat(HUGE))),
        (
            "constant chain",
            "",
            format!("const int k = 1{}; b = k;", " + 2 * 3".repeat(HUGE)),
        ),
        (
            "global constant chain",
            &format!("const int k = 1{};", " + 2 * 3".repeat(HUGE)),
            String::from("b = k;"),
        ),
        (
            "specialization constant chain",
            &format!(
                "layout(constant_id = 0) const int s = 1; const int k = s{};",
                " + s * 2".repeat(HUGE)
            ),
            String::from("b = k + c[k & 1];"),
        ),
        ("sequence", "", format!("b = (b{});", ", b".repeat(HUGE))),
        (
            "sequence statement",
            "",
            format!("b++{};", ", b++".repeat(HUGE)),
        ),
        ("assignment chain", "", format!("{}2;", "b = ".repeat(HUGE))),
        (
            "compound assignment chain",
            "",
            format!("{}2;", "b += b -= ".repeat(HUGE / 2)),
        ),
        (
            "converting assignment chain",
            "",
            format!("v.x = {}b;", "b = ".repeat(HUGE)),
        ),
        (
            "conditional chain",
            "",
            format!("b = {}b;", "t ? b : ".repeat(HUGE)),
        ),
        (
            "conditional chain with effects",
            "",
            format!("b = {}b;", "b > 2 ? b++ : ".repeat(HUGE)),
        ),
        (
            "constant conditional chain",
            "",
            format!("b = {}3;", "false ? 1 : ".repeat(HUGE)),
        ),
        ("negation chain", "", format!("b = {}b;", "- ".repeat(HUGE))),
        (
            "logical not chain",
            "",
            format!("t = {}t;", "!".repeat(HUGE)),
        ),
        (
            "unary chain",
            "",
            format!("b = {}b;", "-~+".repeat(HUGE / 3)),
        ),
        (
            "swizzle chain",
            "",
            format!("v = v{};", ".wzyx".repeat(HUGE)),
        ),
        (
            "swizzle store chain",
            "",
            format!("v{} = vec4(2.0);", ".wzyx".repeat(HUGE)),
        ),
        (
            "scalar swizzle chain",
            "",
            format!("v.x = v.x{};", ".x".repeat(HUGE)),
        ),
        (
            "member and subscript chain",
            "struct S { vec4 m[2]; };",
            format!(
                "S s = S(vec4[2](v, v)); s.m[1]{0}[2] = 2.0; v.x = s.m[1]{1}[0]; v.y = s.m[1].x;",
                ".wzyx.yxwz".repeat(HUGE / 2),
                ".wzyx[1].xxxx".repeat(HUGE / 2)
            ),
        ),
        (
            "nonuniform chain",
            "",
            format!("b = nonuniformEXT(b){}; b = c[b & 1];", " + b".repeat(HUGE)),
        ),
        (
            "precise chain",
            "",
            format!(
                "precise float p; float q = v.y; p = q{}; v.x = p;",
                " * q + 1.0".repeat(HUGE)
            ),
        ),
        (
            "precision chain",
            "",
            format!(
                "mediump float m = v.y; highp float h = m{}; v.x = h;",
                " * m + 1.0".repeat(HUGE)
            ),
        ),
        (
            "chain in a loop condition",
            "",
            format!(
                "for (int i = 0; i{} < 4; i++) {{ b++; }}",
                " + 0".repeat(HUGE)
            ),
        ),
        (
            "chain in a user call",
            "",
            format!("b = f(b{});", " + b".repeat(HUGE)),
        ),
        (
            "chain in a function",
            &format!("int g(int a) {{ return a{}; }}", " * a - 1".repeat(HUGE)),
            String::from("b = g(b);"),
        ),
    ];
    for (name, globals, body) in cases {
        let outcome = check(shader(globals, &body), false);
        assert_eq!(outcome, Outcome::Compiled, "{name}");
    }
}

#[test]
fn long_flat_inputs_compile_on_a_small_stack() {
    let long = [
        shader("", &"b = b + 1;\n".repeat(LONG)),
        shader(
            "",
            &format!("if (t) b = 2;{}", " else b = 3; if (t) b = 2;".repeat(LONG)),
        ),
        {
            let mut globals = String::from("int g0(int a) { return a + 1; }\n");
            for index in 1..2000 {
                globals.push_str(&format!(
                    "int g{index}(int a) {{ return g{}(a) + 1; }}\n",
                    index - 1
                ));
            }
            shader(&globals, "b = g1999(b);")
        },
        {
            let mut globals = String::from("layout(constant_id = 0) const int k0 = 1;\n");
            for index in 1..2000 {
                globals.push_str(&format!("const int k{index} = k{} + 1;\n", index - 1));
            }
            shader(&globals, "b = k1999;")
        },
        {
            let mut globals = String::from("const int k0 = 1;\n");
            for index in 1..2000 {
                globals.push_str(&format!("const int k{index} = k{} * 3 + 1;\n", index - 1));
            }
            shader(&globals, "b = k1999;")
        },
        {
            let mut body = String::from("precise float p; float a0 = v.x;\n");
            for index in 1..2000 {
                body.push_str(&format!("float a{index} = a{} * 2.0 + 1.0;\n", index - 1));
            }
            body.push_str("p = a1999; v.x = p;");
            shader("", &body)
        },
        {
            let mut globals = String::from("#define M0 1\n");
            for index in 1..2000 {
                globals.push_str(&format!("#define M{index} M{}\n", index - 1));
            }
            shader(&globals, "b = M1999;")
        },
    ];
    for source in long {
        assert_eq!(check(source, false), Outcome::Compiled);
    }
}

fn nested_object(depth: usize) -> String {
    let options = Options::from(ShaderStage::Fragment);
    let mut object = Frontend::default()
        .compile(&options, &shader("", "b = 2;"))
        .unwrap();
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
    encode(&object).unwrap()
}

fn linked_object(text: String) -> Outcome {
    on_small_stack(move || {
        let object = match decode(&text) {
            Ok(object) => object,
            Err(error) => return rejection(&[error.to_string()]),
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
    })
}

#[test]
fn object_files_are_bounded_on_a_small_stack() {
    let deepest = on_small_stack(|| nested_object(MAX_BLOCK_DEPTH));
    assert_eq!(linked_object(deepest), Outcome::Compiled);
    let deeper = on_small_stack(|| nested_object(MAX_BLOCK_DEPTH + 1));
    assert_eq!(linked_object(deeper), Outcome::TooDeep);
    let hostile = on_small_stack(|| nested_object(4 * MAX_BLOCK_DEPTH));
    assert_eq!(linked_object(hostile), Outcome::TooDeep);
}

const FRONTEND_STACK: usize = 256 << 10;
const FRONTEND_DEPTHS: [usize; 2] = [10_000, 100_000];
const RESOURCE_LIMITS: [&str; 2] = [
    "preprocessing token limit exceeded",
    "preprocessed output limit exceeded",
];

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
            file: FileId(u32::try_from(depth).unwrap()),
            name: format!("level{depth}.h"),
            source,
        })
    }
}

#[derive(Debug, PartialEq, Eq)]
enum Lowering {
    Lowered,
    ResourceLimit,
    Rejected(String),
}

fn frontend(source: String, includes: Option<usize>) -> Lowering {
    std::thread::Builder::new()
        .stack_size(FRONTEND_STACK)
        .spawn(move || {
            let options = Options {
                nesting_limits: false,
                ..Options::from(ShaderStage::Fragment)
            };
            let parsed = match includes {
                Some(levels) => Frontend::default().parse_with_includer(
                    &options,
                    &source,
                    FileId(0),
                    &mut IncludeChain { levels },
                ),
                None => Frontend::default().parse(&options, &source),
            };
            match parsed {
                Ok(module) => {
                    core::mem::forget(module);
                    Lowering::Lowered
                }
                Err(errors) => {
                    let messages: Vec<String> =
                        errors.errors.iter().map(ToString::to_string).collect();
                    if messages
                        .iter()
                        .any(|message| RESOURCE_LIMITS.iter().any(|limit| message.contains(limit)))
                    {
                        Lowering::ResourceLimit
                    } else {
                        Lowering::Rejected(messages.join("\n"))
                    }
                }
            }
        })
        .unwrap()
        .join()
        .unwrap()
}

fn frontend_case(name: &str, source: impl Fn(usize) -> String, expected: &Lowering) {
    for depth in FRONTEND_DEPTHS {
        assert_eq!(
            &frontend(source(depth), None),
            expected,
            "{name} at {depth}"
        );
    }
}

#[test]
fn the_frontend_handles_deep_preprocessor_nesting_on_a_small_stack() {
    frontend_case(
        "macro arguments",
        |count| {
            shader(
                "#define F(x) x",
                &format!("b = {}b{};", "F(".repeat(count), ")".repeat(count)),
            )
        },
        &Lowering::ResourceLimit,
    );
    frontend_case(
        "macro definitions",
        |count| {
            let mut globals = String::from("#define F0(x) x\n");
            for level in 1..count {
                globals.push_str(&format!("#define F{level}(x) F{}(x)\n", level - 1));
            }
            shader(&globals, &format!("b = F{}(b);", count - 1))
        },
        &Lowering::Lowered,
    );
    frontend_case(
        "#if expressions",
        |count| {
            shader(
                &format!("#if {}1{}\n#endif", "(".repeat(count), ")".repeat(count)),
                "",
            )
        },
        &Lowering::Lowered,
    );
    frontend_case(
        "#if operators",
        |count| shader(&format!("#if {}1\n#endif", "- ~ ".repeat(count)), ""),
        &Lowering::Lowered,
    );
    for depth in FRONTEND_DEPTHS {
        let source = shader(
            "#extension GL_GOOGLE_include_directive : enable\n#include \"first.h\"",
            "",
        );
        assert_eq!(
            frontend(source, Some(depth)),
            Lowering::Lowered,
            "includes at {depth}"
        );
    }
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
            "int g(out int a) { a = 1; return 2; }",
            &format!(
                "{prefix}{}{core}{};",
                open.repeat(count),
                close.repeat(count)
            ),
        )
    }
}

#[test]
fn the_frontend_handles_deep_expressions_on_a_small_stack() {
    let cases = [
        ("parentheses", "b = ", "(", "b", ")"),
        ("negation", "b = ", "-(", "b", ")"),
        ("logical not", "t = ", "!(", "t", ")"),
        ("bitwise not", "b = ", "~(", "b", ")"),
        ("binary chain", "b = ", "b + (", "b", ")"),
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
        ("out argument", "b = ", "g(b) + (", "b", ")"),
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
    for (name, prefix, open, core, close) in cases {
        frontend_case(
            name,
            nested_body(prefix, open, core, close),
            &Lowering::Lowered,
        );
    }
}

#[test]
fn the_frontend_handles_deep_statements_on_a_small_stack() {
    let cases = [
        ("blocks", "{ ", " }"),
        ("if", "if (t) ", ""),
        ("if blocks", "if (t) { ", " }"),
        ("else if", "if (b > 3) b = 4; else ", ""),
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
        frontend_case(
            name,
            nested_body("", open, "b = 2;", close),
            &Lowering::Lowered,
        );
    }
}

#[test]
fn the_frontend_handles_deep_declarations_on_a_small_stack() {
    let initializer_lists = |count: usize| {
        shader(
            "",
            &format!(
                "int a{} = {}2{}; b = a{};",
                "[1]".repeat(count),
                "{".repeat(count),
                "}".repeat(count),
                "[0]".repeat(count)
            ),
        )
    };
    assert_eq!(
        frontend(initializer_lists(FRONTEND_DEPTHS[0]), None),
        Lowering::Lowered,
        "array initializer lists"
    );
    frontend_case(
        "struct chains",
        |count| {
            shader(
                &struct_chain(count),
                &format!("S{0} s; s.b = 1; S{0} r = s; b = r.b;", count - 1),
            )
        },
        &Lowering::Lowered,
    );
    frontend_case(
        "struct initializers",
        |count| {
            let mut initializer = String::from("{2}");
            for _ in 1..count {
                initializer = format!("{{{initializer}, 0}}");
            }
            shader(
                &struct_chain(count),
                &format!("S{} s = {initializer}; b = s.b;", count - 1),
            )
        },
        &Lowering::Lowered,
    );
    frontend_case(
        "struct constructors",
        |count| {
            let mut constructor = String::from("S0(2)");
            for level in 1..count {
                constructor = format!("S{level}({constructor}, 0)");
            }
            shader(
                &struct_chain(count),
                &format!("S{} s = {constructor}; b = s.b;", count - 1),
            )
        },
        &Lowering::Lowered,
    );
    frontend_case(
        "array dimensions",
        |count| {
            shader(
                "",
                &format!(
                    "int a{0}; int r{0} = a; b = r.length();",
                    "[1]".repeat(count)
                ),
            )
        },
        &Lowering::Lowered,
    );
    for depth in FRONTEND_DEPTHS {
        let source = shader(
            &format!(
                "{}int a; {}",
                "struct { ".repeat(depth),
                "} a; ".repeat(depth)
            ),
            "",
        );
        assert!(
            matches!(frontend(source, None), Lowering::Rejected(_)),
            "inline structs at {depth}"
        );
    }
}
