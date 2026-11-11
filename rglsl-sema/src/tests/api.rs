use alloc::format;
use alloc::string::{String, ToString};
use alloc::sync::Arc;
use alloc::vec::Vec;

use rglsl_ast::ast::Expression;
use rglsl_ast::TranslationUnit;

use crate::scope::{Direction, Origin, Storage, SymbolKind};
use crate::types::{ArraySize, Scalar, Type, TypeKind};
use crate::{
    analyze, analyze_with_builtins, Analysis, Builtins, Callee, DiagnosticKind, Options,
    ResourceLimits, Stage,
};

struct Checked {
    source: String,
    unit: TranslationUnit,
    analysis: Analysis,
}

fn check(stage: Stage, body: &str) -> Checked {
    let source = format!("#version 450\n{body}");
    let unit = rglsl_ast::parse(&source).expect("the test shader parses");
    let analysis = analyze(&unit, &Options::new(stage));
    Checked {
        source,
        unit,
        analysis,
    }
}

fn accepted(stage: Stage, body: &str) -> Checked {
    let checked = check(stage, body);
    assert!(
        checked.analysis.is_ok(),
        "{:?}",
        checked.analysis.diagnostics
    );
    checked
}

impl Checked {
    fn expression(&self, text: &str) -> &Expression {
        rglsl_ast::expressions(&self.unit)
            .into_iter()
            .find(|expression| expression.span.text(&self.source) == Some(text))
            .unwrap_or_else(|| panic!("no expression `{text}`"))
    }

    fn ty(&self, text: &str) -> String {
        let expression = self.expression(text);
        let ty = self
            .analysis
            .type_of(expression.id)
            .unwrap_or_else(|| panic!("`{text}` has no type"));
        ty.display(&self.analysis.types).to_string()
    }

    fn conversion(&self, text: &str) -> Option<String> {
        let info = self.analysis.expression(self.expression(text).id)?;
        info.conversion
            .as_ref()
            .map(|ty| ty.display(&self.analysis.types).to_string())
    }

    fn is_lvalue(&self, text: &str) -> bool {
        self.analysis
            .expression(self.expression(text).id)
            .is_some_and(|info| info.is_lvalue)
    }

    fn is_constant(&self, text: &str) -> bool {
        self.analysis
            .expression(self.expression(text).id)
            .is_some_and(|info| info.is_constant)
    }

    fn integer(&self, text: &str) -> Option<i64> {
        self.analysis
            .expression(self.expression(text).id)?
            .value
            .as_ref()?
            .scalar_i64()
    }
}

#[test]
fn expressions_have_types() {
    let checked = accepted(
        Stage::Fragment,
        "struct S { vec3 position; float weights[4]; };
layout(binding = 0) uniform sampler2D image;
layout(location = 0) in vec2 uv;
layout(location = 0) out vec4 color;
void main() {
    S s;
    mat3 m = mat3(1.0);
    ivec2 size = textureSize(image, 0);
    color = texture(image, uv) * vec4(m * s.position, s.weights[2]);
    bool inside = uv.x < 0.5 && size.y > 1;
    double wide = uv.y;
    uint count = 3u + size.x;
}
",
    );
    assert_eq!(checked.ty("mat3(1.0)"), "mat3");
    assert_eq!(checked.ty("textureSize(image, 0)"), "ivec2");
    assert_eq!(checked.ty("texture(image, uv)"), "vec4");
    assert_eq!(checked.ty("m * s.position"), "vec3");
    assert_eq!(checked.ty("s.weights"), "float[4]");
    assert_eq!(checked.ty("s.weights[2]"), "float");
    assert_eq!(checked.ty("s"), "S");
    assert_eq!(checked.ty("image"), "sampler2D");
    assert_eq!(checked.ty("uv.x < 0.5"), "bool");
    assert_eq!(checked.ty("uv.x < 0.5 && size.y > 1"), "bool");
    assert_eq!(checked.ty("3u + size.x"), "uint");
    assert_eq!(
        checked.ty("color = texture(image, uv) * vec4(m * s.position, s.weights[2])"),
        "vec4"
    );
}

#[test]
fn erroneous_expressions_have_the_error_type_and_do_not_cascade() {
    let checked = check(
        Stage::Fragment,
        "void main() {
    float a = missing * 2.0 + sin(missing) - vec3(missing).x;
}
",
    );
    let kinds: Vec<&DiagnosticKind> = checked
        .analysis
        .diagnostics
        .iter()
        .map(|diagnostic| &diagnostic.kind)
        .collect();
    assert_eq!(kinds.len(), 1, "{kinds:?}");
    assert!(kinds.iter().all(
        |kind| matches!(kind, DiagnosticKind::UndeclaredIdentifier(name) if name == "missing")
    ));
    assert_eq!(checked.ty("missing * 2.0"), "<error>");
    assert_eq!(checked.ty("2.0"), "float");
}

#[test]
fn analysis_continues_after_errors() {
    let checked = check(
        Stage::Fragment,
        "void main() {
    int a = 1.5;
    bool b = 1;
    float c = nothing;
    break;
}
",
    );
    let lines: Vec<u32> = checked
        .analysis
        .diagnostics
        .iter()
        .map(|diagnostic| diagnostic.line(&checked.source))
        .collect();
    assert_eq!(lines, [3, 4, 5, 6]);
}

#[test]
fn identifiers_refer_to_symbols() {
    let checked = accepted(
        Stage::Fragment,
        "const int limit = 4;
layout(binding = 0) uniform Block { float scale; } block;
layout(binding = 1) uniform Loose { vec2 offset; };
float helper(float value) {
    return value * block.scale;
}
void main() {
    float local = helper(float(limit)) + offset.x + gl_FragCoord.x;
}
",
    );
    let symbol = |text: &str| {
        let id = checked
            .analysis
            .references
            .get(&checked.expression(text).id)
            .unwrap_or_else(|| panic!("`{text}` refers to nothing"));
        checked.analysis.symbol(*id).expect("a declared symbol")
    };
    let limit = symbol("limit").variable().expect("a variable");
    assert_eq!(limit.origin, Origin::Global);
    assert!(limit.qualifiers.constant);
    assert_eq!(limit.ty, Type::INT);
    let value = symbol("value").variable().expect("a variable");
    assert_eq!(value.origin, Origin::Parameter);
    let block = symbol("block").variable().expect("a variable");
    assert!(matches!(block.ty.kind, TypeKind::Block(_)));
    assert_eq!(block.qualifiers.storage, Storage::Uniform);
    assert_eq!(
        block
            .qualifiers
            .layout_entry("binding")
            .and_then(|entry| entry.value),
        Some(0)
    );
    assert!(matches!(
        symbol("offset").kind,
        SymbolKind::BlockMember { index: 0, .. }
    ));
    let coordinate = symbol("gl_FragCoord").variable().expect("a variable");
    assert_eq!(coordinate.origin, Origin::BuiltIn);
    assert_eq!(coordinate.qualifiers.storage, Storage::In);
}

#[test]
fn calls_resolve_to_functions_built_ins_and_constructors() {
    let checked = accepted(
        Stage::Fragment,
        "float pick(float a) { return a; }
int pick(int a) { return a; }
void main() {
    float a = pick(1.0);
    int b = pick(2);
    float c = max(a, 3.0);
    vec3 d = vec3(a, c, 1.0);
    float values[2] = float[](a, c);
    int e = values.length();
}
",
    );
    let callee = |text: &str| {
        checked
            .analysis
            .calls
            .get(&checked.expression(text).id)
            .unwrap_or_else(|| panic!("`{text}` resolves to nothing"))
    };
    let user = |text: &str| match callee(text) {
        Callee::Function(id) => checked.analysis.function(*id).expect("a user function"),
        other => panic!("{other:?}"),
    };
    assert_eq!(user("pick(1.0)").return_type, Type::FLOAT);
    assert_eq!(user("pick(2)").return_type, Type::INT);
    assert!(user("pick(2)").defined);
    match callee("max(a, 3.0)") {
        Callee::Builtin(id) => {
            let function = checked
                .analysis
                .builtins
                .function(*id)
                .expect("a built-in function");
            assert_eq!(function.name, "max");
            assert_eq!(function.return_type, Type::FLOAT);
            assert_eq!(function.parameters.len(), 2);
        }
        other => panic!("{other:?}"),
    }
    assert_eq!(
        *callee("vec3(a, c, 1.0)"),
        Callee::Constructor(Type::vector(Scalar::Float, 3))
    );
    assert_eq!(
        *callee("float[](a, c)"),
        Callee::Constructor(Type::FLOAT.array_of(ArraySize::Sized(2)))
    );
    assert_eq!(*callee("values.length()"), Callee::Length);
}

#[test]
fn implicit_conversions_are_recorded() {
    let checked = accepted(
        Stage::Fragment,
        "float half_of(float value) { return value / 2; }
void store(out int target) { target = 0; }
double widen() { return 1.5; }
void main() {
    float a = 1;
    uint b = 2u + 3;
    float c = half_of(4);
    float d;
    store(d);
    vec2 e = true ? vec2(1.0) : ivec2(5);
    a += 6;
    float f = max(a, 7);
    a = 8;
}
",
    );
    assert_eq!(checked.conversion("1").as_deref(), Some("float"));
    assert_eq!(checked.conversion("3").as_deref(), Some("uint"));
    assert_eq!(checked.conversion("2u"), None);
    assert_eq!(checked.conversion("4").as_deref(), Some("float"));
    assert_eq!(checked.conversion("2").as_deref(), Some("float"));
    assert_eq!(checked.conversion("1.5").as_deref(), Some("double"));
    assert_eq!(checked.conversion("ivec2(5)").as_deref(), Some("vec2"));
    assert_eq!(checked.conversion("6").as_deref(), Some("float"));
    assert_eq!(checked.conversion("7").as_deref(), Some("float"));
    assert_eq!(checked.conversion("8").as_deref(), Some("float"));
    let stored = checked
        .analysis
        .expression(checked.expression("d").id)
        .expect("an analysed argument");
    assert_eq!(stored.output_conversion, Some(Type::INT));
    assert_eq!(stored.conversion, None);
}

#[test]
fn lvalues_are_marked() {
    let checked = accepted(
        Stage::Fragment,
        "layout(location = 0) in vec4 input_color;
layout(location = 0) out vec4 output_color;
layout(binding = 0) uniform U { float factor; };
void main() {
    vec4 local = input_color * factor;
    const float fixed_value = 2.0;
    output_color = local.zyxw + local.xxyy * fixed_value;
    local.xy = vec2(0.0);
}
",
    );
    assert!(checked.is_lvalue("local"));
    assert!(checked.is_lvalue("output_color"));
    assert!(checked.is_lvalue("local.zyxw"));
    assert!(checked.is_lvalue("local.xy"));
    assert!(!checked.is_lvalue("local.xxyy"));
    assert!(!checked.is_lvalue("input_color"));
    assert!(!checked.is_lvalue("factor"));
    assert!(!checked.is_lvalue("fixed_value"));
    assert!(!checked.is_lvalue("input_color * factor"));
    assert!(!checked.is_lvalue("vec2(0.0)"));
}

#[test]
fn constant_expressions_are_marked_and_folded() {
    let checked = accepted(
        Stage::Fragment,
        "const int base = 3;
const ivec2 pair = ivec2(base, base * 2);
layout(location = 0) flat in int dynamic;
void main() {
    int a = base * 4 + 1;
    int b = pair.y - pair.x;
    int c = dynamic + 1;
    int d = max(base, 7) << 1;
    int e = int[3](5, 6, 7)[2];
    int f = int(floor(2.7)) + int(true);
    bool g = base < 4 || dynamic > 0;
    float h = sin(1.0);
    int i = (base, 9);
}
",
    );
    assert_eq!(checked.integer("base * 4 + 1"), Some(13));
    assert_eq!(checked.integer("pair.y - pair.x"), Some(3));
    assert_eq!(checked.integer("max(base, 7) << 1"), Some(14));
    assert_eq!(checked.integer("int[3](5, 6, 7)[2]"), Some(7));
    assert_eq!(checked.integer("int(floor(2.7)) + int(true)"), Some(3));
    assert!(checked.is_constant("base * 4 + 1"));
    assert!(!checked.is_constant("dynamic + 1"));
    assert!(!checked.is_constant("base < 4 || dynamic > 0"));
    assert!(checked.is_constant("base < 4"));
    assert!(checked.is_constant("sin(1.0)"));
    assert_eq!(checked.integer("dynamic + 1"), None);
    assert!(!checked.is_constant("(base, 9)"));
}

#[test]
fn declared_symbols_keep_their_types_and_qualifiers() {
    let checked = accepted(
        Stage::Vertex,
        "struct Light { vec3 position; float intensity; };
layout(location = 2) in vec3 normal;
layout(location = 1) flat out ivec2 cell;
layout(set = 1, binding = 3) uniform Scene { Light lights[4]; mat4 view; } scene;
void transform(in vec3 point, out vec4 result, inout float weight, const float bias) {
    result = scene.view * vec4(point, weight + bias);
}
void main() {
    float weight = scene.lights[1].intensity;
    transform(normal, gl_Position, weight, 0.5);
    cell = ivec2(0);
}
",
    );
    let analysis = &checked.analysis;
    let variable = |name: &str| {
        analysis
            .symbols
            .iter()
            .find(|symbol| symbol.name == name)
            .and_then(|symbol| symbol.variable())
            .unwrap_or_else(|| panic!("no variable `{name}`"))
    };
    let normal = variable("normal");
    assert_eq!(normal.qualifiers.storage, Storage::In);
    assert_eq!(
        normal
            .qualifiers
            .layout_entry("location")
            .and_then(|entry| entry.value),
        Some(2)
    );
    let cell = variable("cell");
    assert_eq!(cell.qualifiers.storage, Storage::Out);
    assert!(cell.qualifiers.interpolation.is_some());
    assert_eq!(cell.ty, Type::vector(Scalar::Int, 2));
    let scene = variable("scene");
    assert_eq!(
        scene
            .qualifiers
            .layout_entry("set")
            .and_then(|entry| entry.value),
        Some(1)
    );
    let TypeKind::Block(block) = scene.ty.kind else {
        panic!("{:?}", scene.ty);
    };
    let block = analysis.types.block(block).expect("the block type");
    assert_eq!(block.name, "Scene");
    let lights = &block.member("lights").expect("a member").1.ty;
    assert_eq!(lights.display(&analysis.types).to_string(), "Light[4]");
    let TypeKind::Struct(light) = lights.kind else {
        panic!("{lights:?}");
    };
    let light = analysis.types.structure(light).expect("the struct type");
    assert_eq!(light.name.as_deref(), Some("Light"));
    assert_eq!(light.member("intensity").map(|(index, _)| index), Some(1));
    let transform = analysis
        .functions
        .iter()
        .find(|function| function.name == "transform")
        .expect("the function");
    let directions: Vec<Direction> = transform
        .parameters
        .iter()
        .map(|parameter| parameter.direction)
        .collect();
    assert_eq!(
        directions,
        [
            Direction::In,
            Direction::Out,
            Direction::Inout,
            Direction::In
        ]
    );
    assert!(transform
        .parameters
        .last()
        .is_some_and(|bias| bias.qualifiers.constant));
    assert!(transform.defined);
    assert!(transform.return_type.is_void());
}

#[test]
fn structs_are_nominal() {
    let checked = accepted(
        Stage::Fragment,
        "struct A { float x; };
struct B { float x; };
void main() {
    A a = A(1.0);
    B b = B(1.0);
}
",
    );
    let a = checked.analysis.type_of(checked.expression("A(1.0)").id);
    let b = checked.analysis.type_of(checked.expression("B(1.0)").id);
    assert_ne!(a, b);
    assert_eq!(checked.ty("A(1.0)"), "A");
}

fn versioned(source: &str) -> Analysis {
    let unit = rglsl_ast::parse(source).expect("the test shader parses");
    analyze(&unit, &Options::new(Stage::Fragment))
}

fn first_kind(analysis: &Analysis) -> Option<&DiagnosticKind> {
    analysis
        .diagnostics
        .first()
        .map(|diagnostic| &diagnostic.kind)
}

#[test]
fn the_version_comes_from_the_directive() {
    let analysis = versioned("#version 450\nvoid main() {}\n");
    assert_eq!(analysis.version, Some(450));
    assert!(analysis.is_ok());
    let analysis = versioned("#version 460 core\nvoid main() {}\n");
    assert_eq!(analysis.version, Some(460));
    assert_eq!(analysis.builtins.version(), 460);
    assert!(analysis.is_ok());
}

#[test]
fn a_missing_version_is_an_error() {
    let analysis = versioned("void main() {}\n");
    assert_eq!(analysis.version, None);
    assert_eq!(first_kind(&analysis), Some(&DiagnosticKind::MissingVersion));
    assert_eq!(analysis.diagnostics.len(), 1);
}

#[test]
fn other_versions_are_errors() {
    for version in [110, 330, 440, 300, 470] {
        let analysis = versioned(&format!("#version {version}\nvoid main() {{}}\n"));
        assert_eq!(
            first_kind(&analysis),
            Some(&DiagnosticKind::UnsupportedVersion(version))
        );
    }
}

#[test]
fn only_the_core_profile_is_accepted() {
    for profile in ["compatibility", "es"] {
        let analysis = versioned(&format!("#version 450 {profile}\nvoid main() {{}}\n"));
        assert_eq!(
            first_kind(&analysis),
            Some(&DiagnosticKind::UnsupportedProfile(profile.to_string()))
        );
    }
}

#[test]
fn extensions_are_recorded() {
    let analysis = versioned(
        "#version 450\n#extension GL_EXT_scalar_block_layout : enable\n#extension GL_EXT_demo : disable\nvoid main() {}\n",
    );
    let names: Vec<&str> = analysis.extensions.iter().map(String::as_str).collect();
    assert_eq!(names, ["GL_EXT_scalar_block_layout"]);
}

#[test]
fn relaxed_uniforms_allow_loose_uniforms() {
    let source = "#version 450\nuniform float time;\nvoid main() { float t = time; }\n";
    let unit = rglsl_ast::parse(source).expect("the test shader parses");
    let mut options = Options::new(Stage::Fragment);
    let strict = analyze(&unit, &options);
    assert_eq!(
        first_kind(&strict),
        Some(&DiagnosticKind::UniformOutsideBlock)
    );
    options.relaxed_uniforms = true;
    assert!(analyze(&unit, &options).is_ok());
}

#[test]
fn resource_limits_set_the_built_in_constants() {
    let source =
        "#version 450\nfloat values[gl_MaxDrawBuffers];\nvoid main() { values[5] = 1.0; }\n";
    let unit = rglsl_ast::parse(source).expect("the test shader parses");
    let mut options = Options::new(Stage::Fragment);
    assert!(analyze(&unit, &options).is_ok());
    options.limits.max_draw_buffers = 4;
    let analysis = analyze(&unit, &options);
    assert!(matches!(
        first_kind(&analysis),
        Some(DiagnosticKind::IndexOutOfRange { index: 5, .. })
    ));
}

#[test]
fn cached_built_ins_are_reused_when_they_fit() {
    let source = "#version 450\nvoid main() { float a = sin(1.0); }\n";
    let unit = rglsl_ast::parse(source).expect("the test shader parses");
    let options = Options::new(Stage::Fragment);
    let builtins = Arc::new(Builtins::new(
        450,
        Stage::Fragment,
        &ResourceLimits::default(),
    ));
    let analysis = analyze_with_builtins(&unit, &options, &builtins);
    assert!(analysis.is_ok());
    assert!(Arc::ptr_eq(&analysis.builtins, &builtins));
    let other_stage = analyze_with_builtins(&unit, &Options::new(Stage::Vertex), &builtins);
    assert!(other_stage.is_ok());
    assert!(!Arc::ptr_eq(&other_stage.builtins, &builtins));
    assert_eq!(other_stage.builtins.stage(), Stage::Vertex);
}

#[test]
fn every_stage_can_be_analysed() {
    for stage in Stage::ALL {
        let source = "#version 460\nvoid main() { float a = sqrt(4.0); }\n";
        let unit = rglsl_ast::parse(source).expect("the test shader parses");
        let analysis = analyze(&unit, &Options::new(stage));
        assert!(analysis.is_ok(), "{stage:?}: {:?}", analysis.diagnostics);
        assert_eq!(analysis.stage, stage);
    }
}

#[test]
fn diagnostics_have_messages() {
    let checked = check(Stage::Fragment, "void main() { int a = 1.5; }\n");
    let message = checked
        .analysis
        .diagnostics
        .first()
        .map(|diagnostic| diagnostic.kind.to_string());
    assert_eq!(message.as_deref(), Some("cannot convert `float` to `int`"));
}

const ALL_PRECEDENCES: &str = "a || b ^^ c && d | e ^ f & g == h < i << j + k * (";

const NESTS: [(&str, &str, &str, &str, usize); 17] = [
    ("(", "a", ")", ";", 2),
    ("!", "a", "", ";", 1),
    ("-+", "a", "", ";", 2),
    ("a = ", "a", "", ";", 1),
    ("a ? a : ", "a", "", ";", 1),
    ("a ? ", "a", " : a", ";", 2),
    ("f(", "a", ")", ";", 2),
    ("a[", "a", "]", ";", 2),
    (ALL_PRECEDENCES, "a", ")", ";", 12),
    ("float[", "1", "](1).length()", ";", 2),
    ("{", "", "}", "", 1),
    ("if (a) ", ";", "", "", 1),
    ("if (a) ; else ", ";", "", "", 1),
    ("for (;;) ", ";", "", "", 1),
    ("while (a) ", ";", "", "", 1),
    ("do ", ";", " while (a);", "", 1),
    ("switch (a) { case 1: ", ";", " }", "", 1),
];

#[test]
fn nesting_up_to_the_parser_limit_is_analysed() {
    let limit = usize::try_from(rglsl_ast::MAX_NESTING_DEPTH).unwrap_or(0);
    for (open, core, close, tail, levels_per_repeat) in NESTS {
        let count = (limit - 8) / levels_per_repeat;
        let source = format!(
            "#version 450\nint f(int a) {{ return a; }}\nvoid main() {{ bool a; int b, c, d, e, g, h, i, j, k; {}{core}{}{tail} }}\n",
            open.repeat(count),
            close.repeat(count),
        );
        let unit = rglsl_ast::parse(&source).expect("the nested shader parses");
        let analysis = analyze(&unit, &Options::new(Stage::Fragment));
        assert_eq!(analysis.version, Some(450), "{open}");
    }
    let structures = format!(
        "#version 450\n{}int a; {}\nvoid main() {{}}\n",
        "struct { ".repeat(limit - 8),
        "} a; ".repeat(limit - 8)
    );
    let unit = rglsl_ast::parse(&structures).expect("the nested structures parse");
    assert!(!analyze(&unit, &Options::new(Stage::Fragment)).is_ok());
    let lists = format!(
        "#version 450\nint a = {}1{};\nvoid main() {{}}\n",
        "{".repeat(limit - 8),
        "}".repeat(limit - 8)
    );
    let unit = rglsl_ast::parse(&lists).expect("the nested lists parse");
    assert!(!analyze(&unit, &Options::new(Stage::Fragment)).is_ok());
}

#[test]
fn extension_warnings_and_implied_extensions_are_recorded() {
    let analysis = versioned(
        "#version 450\n#extension GL_EXT_demo : enable\n#extension GL_EXT_shader_subgroup_extended_types_int16 : enable\n#extension GL_EXT_shader_explicit_arithmetic_types_int64 : warn\nvoid main() { int64_t x = 1l; }\n",
    );
    assert!(analysis.is_ok(), "{:?}", analysis.diagnostics);
    let names: Vec<&str> = analysis.extensions.iter().map(String::as_str).collect();
    assert_eq!(
        names,
        [
            "GL_EXT_shader_explicit_arithmetic_types_int16",
            "GL_EXT_shader_explicit_arithmetic_types_int64",
            "GL_EXT_shader_subgroup_extended_types_int16",
        ]
    );
    let warnings: Vec<&DiagnosticKind> = analysis
        .warnings
        .iter()
        .map(|warning| &warning.kind)
        .collect();
    assert_eq!(
        warnings,
        [
            &DiagnosticKind::UnsupportedExtension("GL_EXT_demo".to_string()),
            &DiagnosticKind::ExtensionWarned {
                extension: "GL_EXT_shader_explicit_arithmetic_types_int64",
                feature: "64-bit literal".to_string(),
            },
        ]
    );
}

#[test]
fn explicit_types_choose_glslang_common_types() {
    let checked = check(
        Stage::Fragment,
        "#extension GL_EXT_shader_explicit_arithmetic_types : enable\nvoid main() {\n    int8_t a = int8_t(1);\n    uint16_t b = uint16_t(2);\n    int64_t c = 3l;\n    uint d = 4u;\n    float16_t h = 1.0hf;\n    a + b;\n    c + d;\n    a + d;\n    b + h;\n    h + 1.0;\n    a * 2;\n}\n",
    );
    assert!(
        checked.analysis.is_ok(),
        "{:?}",
        checked.analysis.diagnostics
    );
    let types: Vec<Type> = statement_expression_types(&checked);
    assert_eq!(
        types,
        [
            Type::scalar(Scalar::Uint16),
            Type::scalar(Scalar::Int64),
            Type::UINT,
            Type::scalar(Scalar::Float16),
            Type::FLOAT,
            Type::INT,
        ]
    );
}

#[test]
fn sized_literals_fold_with_their_width() {
    use crate::constant::Value;
    let checked = check(
        Stage::Fragment,
        "#extension GL_EXT_shader_explicit_arithmetic_types : enable\nvoid main() {\n    0xFFFFFFFFFFFFFFFFul + 2ul;\n    int16_t(-32768s - 1s);\n    uint8_t(250) + uint8_t(10);\n    0.1hf;\n    -0x8000000000000000l;\n}\n",
    );
    assert!(
        checked.analysis.is_ok(),
        "{:?}",
        checked.analysis.diagnostics
    );
    let values: Vec<Option<Value>> = statement_expressions(&checked)
        .iter()
        .map(|expression| {
            checked
                .analysis
                .expression(expression.id)
                .and_then(|info| info.value.as_ref())
                .and_then(crate::constant::Constant::first)
        })
        .collect();
    assert_eq!(
        values,
        [
            Some(Value::Uint64(1)),
            Some(Value::Int16(32767)),
            Some(Value::Uint8(4)),
            Some(Value::Float16(half::f16::from_f64(0.1).to_f64())),
            Some(Value::Int64(i64::MIN)),
        ]
    );
}

#[test]
fn matrix_comp_mult_folds() {
    use crate::constant::Value;
    let checked = accepted(
        Stage::Fragment,
        "void main() {\n    matrixCompMult(mat2(1.0, 2.0, 3.0, 4.0), mat2(2.0));\n    matrixCompMult(dmat2x3(1.5), dmat2x3(3.0));\n}\n",
    );
    let values: Vec<Vec<Value>> = statement_expressions(&checked)
        .iter()
        .map(|expression| {
            checked
                .analysis
                .expression(expression.id)
                .and_then(|info| info.value.as_ref())
                .map(|constant| constant.values.clone())
                .unwrap_or_default()
        })
        .collect();
    assert_eq!(
        values,
        [
            [2.0, 0.0, 0.0, 8.0].map(Value::Float).to_vec(),
            [4.5, 0.0, 0.0, 0.0, 4.5, 0.0].map(Value::Double).to_vec(),
        ]
    );
}

fn statement_expressions(checked: &Checked) -> Vec<Expression> {
    use rglsl_ast::ast::{ExternalDeclaration, StatementKind};
    let Some(ExternalDeclaration::FunctionDefinition(definition)) =
        checked.unit.external_declarations.last()
    else {
        panic!("the shader ends with a function");
    };
    definition
        .body
        .statements
        .iter()
        .filter_map(|statement| match &statement.kind {
            StatementKind::Expression(Some(expression)) => Some(expression.clone()),
            _ => None,
        })
        .collect()
}

fn statement_expression_types(checked: &Checked) -> Vec<Type> {
    statement_expressions(checked)
        .iter()
        .filter_map(|expression| checked.analysis.type_of(expression.id).cloned())
        .collect()
}

#[test]
fn nonuniform_propagates_as_in_glslang() {
    let checked = accepted(
        Stage::Fragment,
        "#extension GL_EXT_nonuniform_qualifier : enable
layout(location = 0) flat in int i;
layout(location = 1) nonuniformEXT flat in int ni;
layout(binding = 0) uniform sampler2D textures[];
layout(binding = 1) uniform U { vec4 v; } blocks[];
layout(location = 0) out vec4 o;
struct S { int a; float b[2]; };
nonuniformEXT int f(int x) { return x; }
int g(int x) { return x; }
void main() {
    nonuniformEXT vec4 nv = vec4(1.0);
    nonuniformEXT S ns;
    int u = i;
    vec4 uv = vec4(0.0);
    bool c = u > 0;
    float f1 = ni + 1.0;
    float f2 = float(ni) * 2.0;
    int t1 = c ? ni : u;
    int t2 = (u, ni);
    int t3 = -ni;
    bool t4 = ni == u;
    bool t5 = ni < u && c;
    vec2 t6 = nv.xy;
    int t7 = abs(ni);
    ivec2 t8 = ivec2(ni);
    int t9 = f(u);
    int t10 = g(ni);
    int t11 = ns.a;
    float t12 = ns.b[u];
    float t13 = uv[ni];
    vec4 t14 = blocks[ni].v;
    vec4 t15 = blocks[u].v;
    vec4 t16 = texture(textures[nonuniformEXT(u)], vec2(0.5));
    int t17 = nonuniformEXT(u) + u;
    int t18 = u++;
    nonuniformEXT int nl = i;
    int t19 = nl++;
    u = ni;
    o = vec4(t17);
}
",
    );
    let non_uniform = |text: &str| {
        checked
            .analysis
            .expression(checked.expression(text).id)
            .is_some_and(|info| info.non_uniform)
    };
    for text in [
        "ni",
        "nv",
        "ns",
        "-ni",
        "ni == u",
        "ni < u",
        "ni < u && c",
        "nv.xy",
        "f(u)",
        "ns.a",
        "ns.b",
        "ns.b[u]",
        "uv[ni]",
        "blocks[ni]",
        "blocks[ni].v",
        "nonuniformEXT(u)",
        "textures[nonuniformEXT(u)]",
        "nonuniformEXT(u) + u",
        "nl++",
    ] {
        assert!(non_uniform(text), "{text} should be non-uniform");
    }
    for text in [
        "u",
        "ni + 1.0",
        "float(ni)",
        "float(ni) * 2.0",
        "c ? ni : u",
        "abs(ni)",
        "ivec2(ni)",
        "g(ni)",
        "blocks[u].v",
        "texture(textures[nonuniformEXT(u)], vec2(0.5))",
        "u++",
        "u = ni",
        "(u, ni)",
    ] {
        assert!(!non_uniform(text), "{text} should be uniform");
    }
    assert!(!checked.is_constant("nonuniformEXT(u)"));
}

#[test]
fn nonuniform_matrix_products_are_uniform_as_in_glslang() {
    let checked = accepted(
        Stage::Fragment,
        "#extension GL_EXT_nonuniform_qualifier : enable
layout(location = 0) in vec2 v;
void main() {
    nonuniformEXT mat2 m = mat2(1.0);
    mat2 a = m * mat2(2.0);
    vec2 b = m * v;
    vec2 c = v * m;
    mat2 d = m * 2.0;
    mat2 e = m + mat2(2.0);
}
",
    );
    let non_uniform = |text: &str| {
        checked
            .analysis
            .expression(checked.expression(text).id)
            .is_some_and(|info| info.non_uniform)
    };
    assert!(!non_uniform("m * mat2(2.0)"));
    assert!(non_uniform("m * v"));
    assert!(non_uniform("v * m"));
    assert!(non_uniform("m * 2.0"));
    assert!(non_uniform("m + mat2(2.0)"));
}
