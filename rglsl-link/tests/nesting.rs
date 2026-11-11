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

const REJECTIONS: [&str; 7] = [
    "nested too deeply",
    "maximum nesting depth exceeded",
    "macro expansion depth limit exceeded",
    "include depth limit exceeded",
    "expression nested too deeply",
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
            file: FileId(u32::try_from(depth).unwrap() + 1),
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
    let cases: [(&str, &str, &str, &str, &str, usize); 22] = [
        ("parentheses", "b = ", "(", "b", ")", 2),
        ("negation", "b = ", "- ", "b", "", 1),
        ("logical not", "t = ", "!", "t", "", 1),
        ("bitwise not", "b = ", "~", "b", "", 1),
        ("binary chain", "b = b", " + b", "", "", 1),
        ("mixed precedence", "b = b", " * b + b", "", "", 1),
        ("comparison chain", "t = t", " == t", "", "", 1),
        ("logical chain", "t = t", " && t", "", "", 1),
        ("assignment chain", "", "b = ", "2", "", 1),
        ("compound assignment", "", "b += ", "2", "", 1),
        ("conditional else", "b = ", "t ? b : ", "b", "", 1),
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
        ("swizzle", "v = v", ".wzyx", "", "", 1),
        ("increment", "b = b", "++ + b", "", "", 1),
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
    assert!(deepest("#if expression", parentheses, false) >= limits.max_expression_depth - 2);
    let include = shader(
        "#extension GL_GOOGLE_include_directive : enable\n#include \"first.h\"",
        "",
    );
    assert_eq!(check(include, true), Outcome::TooDeep);
}

#[test]
fn long_flat_inputs_compile_on_a_small_stack() {
    let long = [
        shader("", &"b = b + 1;\n".repeat(LONG)),
        shader("", &format!("b = (b{});", ", b".repeat(LONG))),
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
