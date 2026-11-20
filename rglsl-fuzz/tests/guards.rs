use rglsl_fuzz::ast::{DeclarationKind, ExternalDeclaration, StatementKind};
use rglsl_fuzz::reduce::guards::add_guards;
use rglsl_fuzz::reduce::{ReduceOptions, reduce};
use rglsl_fuzz::rewrite::rewrite_statements;
use rglsl_fuzz::{ShaderJob, TranslationUnit, analyze_shader, emit, parse_shader};
use rglsl_types::ShaderStage;

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const SHADER: &str = "#version 450
precision highp float;
layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform Buf {
    vec2 injectionSwitch;
};
struct Inner {
    float f;
    ivec2 v[2];
};
struct Outer {
    Inner inner[3];
    mat3 m;
    bool b;
};
const int N = 4;
float g;
Outer globalOuter[2];
int ga, gb = 2;
void main() {
    vec3 data[16];
    highp float h;
    double d;
    dmat2 dm;
    int a, b = 1, c[N];
    float grid[2][3];
    vec3[4] prefixed;
    Inner inner;
    Outer outer[2];
    uint u;
    bvec4 bv;
    for (int i; i < 2; i++) {
        mat2x3 m;
        g += m[0][0];
    }
    vec3 sum = data[1] + vec3(h) + vec3(float(d)) + vec3(float(dm[0][0]));
    sum += vec3(float(a + b + c[3]) + grid[1][2] + prefixed[3].x + inner.f);
    sum += vec3(outer[1].m[0][0] + outer[1].inner[2].f + float(outer[0].inner[0].v[1].y));
    sum += vec3(float(u) + float(bv.x) + globalOuter[1].m[2][2] + float(ga + gb));
    _GLF_color = vec4(sum, 1.0);
}
";

fn uninitialised(unit: &TranslationUnit) -> Vec<String> {
    let mut names = Vec::new();
    let mut collect = |kind: &DeclarationKind| {
        let DeclarationKind::InitDeclaratorList(list) = kind else {
            return;
        };
        let qualified = list.ty.node.qualifier.as_ref().is_some_and(|qualifier| {
            !qualifier.node.qualifiers.iter().all(|single| {
                matches!(
                    single.node,
                    rglsl_fuzz::ast::SingleTypeQualifier::Precision(_)
                )
            })
        });
        if qualified {
            return;
        }
        for declarator in &list.declarators {
            if declarator.kind.initializer.is_none() {
                names.push(declarator.kind.name.node.clone());
            }
        }
    };
    for external in &unit.external_declarations {
        if let ExternalDeclaration::Declaration(declaration) = external {
            collect(&declaration.kind);
        }
    }
    let mut copy = unit.clone();
    rewrite_statements(&mut copy, &mut |statement| {
        if let StatementKind::Declaration(declaration) = &statement.kind {
            collect(&declaration.kind);
        }
    });
    names
}

fn guarded(bound: Option<u32>) -> TestResult<(TranslationUnit, String)> {
    let unit = parse_shader(SHADER)?;
    let analysis = analyze_shader(&unit, ShaderStage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{:?}",
        analysis.diagnostics
    );
    assert!(!uninitialised(&unit).is_empty());
    let guarded = add_guards(&unit, ShaderStage::Fragment, bound)?.ok_or("no guarded unit")?;
    let text = emit(&guarded)?;
    let analysis = analyze_shader(&guarded, ShaderStage::Fragment, false, None);
    assert!(
        analysis.diagnostics.is_empty(),
        "{:?}\n{text}",
        analysis.diagnostics
    );
    Ok((guarded, text))
}

#[test]
fn every_variable_without_an_initializer_is_initialised() -> TestResult {
    for bound in [None, Some(100)] {
        let (unit, text) = guarded(bound)?;
        let left = uninitialised(&unit);
        assert!(left.is_empty(), "{left:?} left uninitialised:\n{text}");
        for expected in [
            "vec3 data[16] = vec3[16](vec3(0.0, 0.0, 0.0)",
            "float grid[2][3] = float[2][3](float[3](0.0, 0.0, 0.0)",
            "vec3[4] prefixed = vec3[4](",
            "Inner inner = Inner(0.0, ivec2[2](ivec2(0, 0), ivec2(0, 0)))",
            "Outer outer[2] = Outer[2](Outer(Inner[3](Inner(0.0, ivec2[2](",
            "Outer globalOuter[2] = Outer[2](",
            "float g = 0.0;",
            "int ga = 0, gb = 2;",
            "int a = 0, b = 1, c[N] = int[4](0, 0, 0, 0);",
            "double d = double(0.0);",
            "dmat2 dm = dmat2(0.0, 0.0, 0.0, 0.0);",
            "highp float h = 0.0;",
            "uint u = 0u;",
            "bvec4 bv = bvec4(false, false, false, false);",
            "mat2x3 m = mat2x3(",
            "int i = 0;",
        ] {
            assert!(text.contains(expected), "no `{expected}` in\n{text}");
        }
        assert!(text.contains("out vec4 _GLF_color;"), "{text}");
        assert!(text.contains("vec2 injectionSwitch;"), "{text}");
        assert_eq!(
            text.contains("_GLF_global_loop_count"),
            bound.is_some(),
            "{text}"
        );
    }
    Ok(())
}

const LOOPING: &str = "#version 450
precision highp float;
layout(location = 0) out vec4 _GLF_color;
void main() {
    vec3 data[16];
    vec3 sum = vec3(1.0, 1.0, 1.0);
    int i = 0;
    while (i < 4) {
        sum += vec3(float(i));
        i++;
    }
    sum += data[1];
    _GLF_color = vec4(sum, 1.0);
}
";

fn job(source: &str) -> TestResult<ShaderJob> {
    Ok(ShaderJob::parse(
        "{}",
        &[(String::from("frag"), String::from(source))],
    )?)
}

fn shader_text(job: &ShaderJob) -> Result<String, rglsl_fuzz::Error> {
    job.emit()?
        .shaders
        .into_iter()
        .next()
        .map(|(_, text)| text)
        .ok_or_else(|| rglsl_fuzz::Error::Generation(String::from("no shader")))
}

#[test]
fn the_guards_stay_when_bounded_loops_hide_the_failure() -> TestResult {
    let mut judge = |candidate: &ShaderJob| -> Result<bool, rglsl_fuzz::Error> {
        let text = shader_text(candidate)?;
        let valid = parse_shader(&text).is_ok_and(|unit| {
            analyze_shader(&unit, ShaderStage::Fragment, false, None)
                .diagnostics
                .is_empty()
        });
        Ok(valid && text.contains("data[1]") && !text.contains("_GLF_global_loop_count"))
    };
    let reduction = reduce(&job(LOOPING)?, ReduceOptions::default(), &mut judge)?;
    let text = shader_text(&reduction.job)?;
    assert!(reduction.guarded, "{text}");
    assert_eq!(reduction.loop_bound, None, "{text}");
    assert!(text.contains("vec3 data[16] = vec3[16]("), "{text}");
    Ok(())
}

#[test]
fn a_failure_that_needs_undefined_behaviour_is_an_error() -> TestResult {
    let mut judge = |candidate: &ShaderJob| -> Result<bool, rglsl_fuzz::Error> {
        Ok(shader_text(candidate)?.contains("vec3 data[16];"))
    };
    assert!(reduce(&job(LOOPING)?, ReduceOptions::default(), &mut judge).is_err());
    let options = ReduceOptions {
        guards: false,
        ..ReduceOptions::default()
    };
    let reduction = reduce(&job(LOOPING)?, options, &mut judge)?;
    assert!(!reduction.guarded);
    assert!(shader_text(&reduction.job)?.contains("vec3 data[16];"));
    Ok(())
}

const FALLING_OFF: &str = "#version 450
precision highp float;
layout(location = 0) out vec4 _GLF_color;
layout(set = 0, binding = 0) uniform Buf {
    vec2 injectionSwitch;
};
struct Pair {
    float f;
    ivec2 v;
};
vec2 loose(vec2 coord) {
    for (int i = 1; i != int(injectionSwitch.x); i--) {
        return coord;
    }
}
Pair pair(int k) {
    if (k > 0) {
        return Pair(1.0, ivec2(k));
    }
}
float ended(float x) {
    return x;
}
void nothing() {
}
void main() {
    nothing();
    _GLF_color = vec4(loose(vec2(1.0)), pair(1).f, ended(1.0));
}
";

#[test]
fn a_function_that_can_fall_off_its_end_returns_zero() -> TestResult {
    let unit = parse_shader(FALLING_OFF)?;
    for bound in [None, Some(100)] {
        let guarded = add_guards(&unit, ShaderStage::Fragment, bound)?.ok_or("no guarded unit")?;
        let text = emit(&guarded)?;
        let analysis = analyze_shader(&guarded, ShaderStage::Fragment, false, None);
        assert!(
            analysis.diagnostics.is_empty(),
            "{:?}\n{text}",
            analysis.diagnostics
        );
        for expected in [
            "    }\n    return vec2(0.0, 0.0);\n}",
            "return Pair(0.0, ivec2(0, 0));\n}",
            "float ended(float x) {\n    return x;\n}",
            "void nothing() {\n}",
        ] {
            assert!(text.contains(expected), "no `{expected}` in\n{text}");
        }
        let again = add_guards(&guarded, ShaderStage::Fragment, bound)?.ok_or("no guarded unit")?;
        let again = emit(&again)?;
        assert_eq!(
            again.matches("return vec2(0.0, 0.0);").count(),
            1,
            "{again}"
        );
    }
    Ok(())
}
