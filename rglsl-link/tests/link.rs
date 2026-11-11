#![allow(clippy::unwrap_used, clippy::expect_used, clippy::panic)]

use rglsl::back::spv;
use rglsl::compact::{compact, KeepUnused};
use rglsl::front::glsl::{Frontend, Options};
use rglsl::object::ObjectModule;
use rglsl::valid::{Capabilities, ValidationFlags, ValidationMode, Validator};
use rglsl::{AddressSpace, ArraySize, Linkage, ShaderStage, TypeInner};
use rglsl_link::{decode, encode, link, link_objects, LinkError, Linked, Options as LinkOptions};

fn object(stage: ShaderStage, source: &str) -> ObjectModule {
    let options = Options::from(stage);
    match Frontend::default().compile(&options, source) {
        Ok(object) => object,
        Err(errors) => panic!("{source}\n{errors:?}"),
    }
}

fn library(source: &str) -> ObjectModule {
    let options = Options {
        library: true,
        ..Options::from(ShaderStage::Compute)
    };
    match Frontend::default().compile(&options, source) {
        Ok(object) => object,
        Err(errors) => panic!("{source}\n{errors:?}"),
    }
}

fn library_errors(source: &str) -> Vec<String> {
    let options = Options {
        library: true,
        ..Options::from(ShaderStage::Compute)
    };
    match Frontend::default().compile(&options, source) {
        Ok(_) => Vec::new(),
        Err(errors) => errors.errors.iter().map(ToString::to_string).collect(),
    }
}

fn linked(objects: &[ObjectModule]) -> Linked {
    match link(objects, &LinkOptions::default()) {
        Ok(linked) => linked,
        Err(errors) => panic!("{errors}"),
    }
}

fn errors(objects: &[ObjectModule]) -> Vec<LinkError> {
    match link(objects, &LinkOptions::default()) {
        Ok(_) => panic!("linking succeeded"),
        Err(errors) => errors.errors,
    }
}

fn spirv(linked: &Linked) -> Vec<u32> {
    spv::write_vec(&linked.module, &linked.info, &spv::Options::default(), None).unwrap()
}

const MAIN: &str = "#version 450
layout(location = 0) out vec4 color;
float helper(float x);
void main() { color = vec4(helper(1.0)); }
";

const HELPER: &str = "#version 450
float helper(float x) { return x * 2.0; }
";

#[test]
fn prototypes_become_imports() {
    let main = object(ShaderStage::Fragment, MAIN);
    let imports: Vec<_> = main
        .module
        .functions
        .iter()
        .filter(|(_, function)| function.linkage == Linkage::Import)
        .collect();
    assert_eq!(imports.len(), 1);
    assert_eq!(main.functions[0].signature, "helper(float)");
    rglsl_link::validate_object(&main).unwrap();
}

#[test]
fn modules_without_main_and_prototype_only_modules_compile() {
    let helper = object(ShaderStage::Fragment, HELPER);
    assert!(!helper.has_entry_point());
    let prototypes = object(
        ShaderStage::Fragment,
        "#version 450\nfloat a(float x);\nint b(ivec2 v);\n",
    );
    assert_eq!(prototypes.module.functions.len(), 2);
    assert!(prototypes
        .module
        .functions
        .iter()
        .all(|(_, function)| function.linkage.is_import()));
    let lib = library(HELPER);
    assert!(lib.is_library());
    rglsl_link::validate_object(&prototypes).unwrap();
}

#[test]
fn executable_validation_and_the_backend_refuse_imports() {
    let main = object(ShaderStage::Fragment, MAIN);
    let mut validator = Validator::new(ValidationFlags::all(), Capabilities::all());
    assert!(validator.validate(&main.module).is_err());
    validator.mode(ValidationMode::Object);
    let info = validator.validate(&main.module).unwrap();
    let error = spv::write_vec(&main.module, &info, &spv::Options::default(), None).unwrap_err();
    assert!(matches!(error, spv::Error::Import(ref name) if name == "helper"));
}

#[test]
fn compact_keeps_imports() {
    let mut main = object(ShaderStage::Fragment, MAIN);
    compact(&mut main.module, KeepUnused::No).unwrap();
    assert_eq!(main.module.functions.len(), 1);
    let mut prototypes = object(ShaderStage::Fragment, "#version 450\nfloat a(float x);\n");
    compact(&mut prototypes.module, KeepUnused::Yes).unwrap();
    assert_eq!(prototypes.module.functions.len(), 1);
}

#[test]
fn links_functions_across_modules() {
    let result = linked(&[
        object(ShaderStage::Fragment, MAIN),
        object(ShaderStage::Fragment, HELPER),
    ]);
    assert_eq!(result.stage, ShaderStage::Fragment);
    assert!(result
        .module
        .functions
        .iter()
        .all(|(_, function)| function.linkage.is_definition()));
    assert!(!spirv(&result).is_empty());
}

#[test]
fn object_modules_round_trip_through_the_file_format() {
    let main = object(ShaderStage::Fragment, MAIN);
    let text = encode(&main).unwrap();
    let decoded = decode(&text).unwrap();
    assert_eq!(decoded.functions, main.functions);
    linked(&[decoded, library(HELPER)]);
    let current = format!("format_version:{}", rglsl::object::FORMAT_VERSION);
    let future = text.replacen(&current, "format_version:99", 1);
    assert!(matches!(
        decode(&future),
        Err(rglsl_link::FileError::Version { found: 99, .. })
    ));
}

#[test]
fn reports_every_missing_reachable_definition() {
    let main = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
float a(float x);
float b(float x);
float unused(float x);
void main() { color = vec4(a(1.0) + b(2.0)); }
",
    );
    let found = errors(&[main]);
    assert_eq!(
        found,
        [
            LinkError::MissingDefinition("a(float)".into()),
            LinkError::MissingDefinition("b(float)".into()),
        ]
    );
}

#[test]
fn unreachable_imports_are_dropped() {
    let lib = library(
        "#version 450
float missing(float x);
float uses_missing(float x) { return missing(x); }
float helper(float x) { return x; }
",
    );
    let result = linked(&[object(ShaderStage::Fragment, MAIN), lib]);
    assert_eq!(result.module.functions.len(), 1);
}

#[test]
fn duplicate_definitions() {
    let found = errors(&[
        object(ShaderStage::Fragment, MAIN),
        library(HELPER),
        library("#version 450\nfloat helper(float x) { return x; }\n"),
    ]);
    assert_eq!(
        found,
        [LinkError::DuplicateDefinition("helper(float)".into())]
    );
    let unreachable = errors(&[
        object(ShaderStage::Fragment, MAIN),
        library(HELPER),
        library("#version 450\nint spare(int x) { return x; }\n"),
        library("#version 450\nint spare(int x) { return -x; }\n"),
    ]);
    assert_eq!(
        unreachable,
        [LinkError::DuplicateDefinition("spare(int)".into())]
    );
}

#[test]
fn overloads_link_by_parameter_types() {
    let main = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
float f(float x);
float f(vec2 x);
void main() { color = vec4(f(1.0) + f(vec2(2.0))); }
",
    );
    linked(&[
        main,
        library("#version 450\nfloat f(float x) { return x; }\n"),
        library("#version 450\nfloat f(vec2 x) { return x.y; }\n"),
    ]);
}

#[test]
fn signatures_must_match() {
    let main = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
void f(out float x);
void main() { float v; f(v); color = vec4(v); }
",
    );
    let found = errors(&[
        main,
        library("#version 450\nvoid f(inout float x) { x += 1.0; }\n"),
    ]);
    assert_eq!(found, [LinkError::SignatureMismatch("f(float)".into())]);
}

#[test]
fn recursion_created_by_linking() {
    let main = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
float f(float x);
void main() { color = vec4(f(1.0)); }
",
    );
    let found = errors(&[
        main,
        library("#version 450\nfloat g(float x);\nfloat f(float x) { return g(x); }\n"),
        library("#version 450\nfloat f(float x);\nfloat g(float x) { return f(x); }\n"),
    ]);
    assert!(matches!(found.as_slice(), [LinkError::Recursion(_)]));
}

#[test]
fn entry_points() {
    assert_eq!(errors(&[library(HELPER)]), [LinkError::MissingEntryPoint]);
    assert_eq!(
        errors(&[
            object(ShaderStage::Fragment, MAIN),
            object(ShaderStage::Fragment, "#version 450\nvoid main() {}\n"),
            library(HELPER),
        ]),
        [LinkError::MultipleEntryPoints]
    );
}

#[test]
fn matching_globals_are_one_variable() {
    let main = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
layout(push_constant) uniform Constants { vec4 tint; } a;
layout(set = 0, binding = 0) uniform Block { float scale; } block;
float accumulated;
float helper(float x);
void main() { accumulated = block.scale; color = a.tint * helper(1.0) * accumulated; }
",
    );
    let lib = library(
        "#version 450
layout(push_constant) uniform Constants { vec4 tint; } b;
layout(set = 0, binding = 0) uniform Block { float scale; } other;
float accumulated;
float helper(float x) { accumulated += x; return x * b.tint.x * other.scale; }
",
    );
    let result = linked(&[main, lib]);
    let count = |space: AddressSpace| {
        result
            .module
            .global_variables
            .iter()
            .filter(|(_, global)| global.space == space)
            .count()
    };
    assert_eq!(count(AddressSpace::Immediate), 1);
    assert_eq!(count(AddressSpace::Uniform), 1);
    assert_eq!(count(AddressSpace::Private), 1);
}

#[test]
fn differing_globals_are_errors() {
    let main = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
layout(set = 0, binding = 0) uniform Block { float scale; } block;
float helper(float x);
void main() { color = vec4(helper(block.scale)); }
",
    );
    let lib = library(
        "#version 450
layout(set = 0, binding = 0) uniform Block { int scale; } block;
float helper(float x) { return x * float(block.scale); }
",
    );
    assert_eq!(
        errors(&[main, lib]),
        [LinkError::GlobalMismatch {
            name: "Block".into(),
            what: "types"
        }]
    );
}

#[test]
fn two_push_constant_blocks_are_an_error() {
    let main = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
layout(push_constant) uniform A { vec4 tint; } a;
float helper(float x);
void main() { color = a.tint * helper(1.0); }
",
    );
    let lib = library(
        "#version 450
layout(push_constant) uniform B { float scale; } b;
float helper(float x) { return x * b.scale; }
",
    );
    assert_eq!(errors(&[main, lib]), [LinkError::PushConstants]);
}

#[test]
fn implicit_array_sizes_merge() {
    let main = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
float values[];
float helper();
void main() { values[1] = 1.0; color = vec4(helper()); }
",
    );
    let lib = library(
        "#version 450
float values[];
float helper() { return values[5]; }
",
    );
    let result = linked(&[main, lib]);
    let (_, values) = result
        .module
        .global_variables
        .iter()
        .find(|(_, global)| global.name.as_deref() == Some("values"))
        .unwrap();
    match result.module.types[values.ty].inner {
        TypeInner::Array {
            size: ArraySize::Constant(size),
            ..
        } => assert_eq!(size.get(), 6),
        ref other => panic!("{other:?}"),
    }
    let explicit = library(
        "#version 450
float values[3];
float helper() { return values[2]; }
",
    );
    assert_eq!(
        errors(&[
            object(
                ShaderStage::Fragment,
                "#version 450
layout(location = 0) out vec4 color;
float values[];
float helper();
void main() { values[4] = 1.0; color = vec4(helper()); }
"
            ),
            explicit
        ]),
        [LinkError::ImplicitSize("values".into())]
    );
}

#[test]
fn contradictory_stage_layouts() {
    let main = object(
        ShaderStage::Compute,
        "#version 450
layout(local_size_x = 4) in;
void work();
void main() { work(); }
",
    );
    let other = object(
        ShaderStage::Compute,
        "#version 450
layout(local_size_x = 8) in;
void work() {}
",
    );
    assert_eq!(
        errors(&[main, other]),
        [LinkError::Contradictory("local size")]
    );
}

#[test]
fn a_stage_module_without_main_may_declare_stage_inputs() {
    let main = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
vec4 incoming();
void main() { color = incoming(); }
",
    );
    let other = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 1) in vec4 value;
vec4 incoming() { return value; }
",
    );
    let result = linked(&[main, other]);
    let entry = &result.module.entry_points[0];
    assert_eq!(entry.interface.len(), 2);
}

#[test]
fn libraries_record_the_stages_they_link_into() {
    let fragment_only = library("#version 450\nvec4 f() { return gl_FragCoord; }\n");
    assert!(fragment_only.is_library());
    assert!(fragment_only.supports(ShaderStage::Fragment));
    assert!(!fragment_only.supports(ShaderStage::Vertex));
    let rejection = fragment_only.for_stage(ShaderStage::Vertex).unwrap_err();
    assert_eq!(rejection.line, Some(2));
    assert_eq!(
        rejection.message,
        "`gl_FragCoord` is not available in vertex shaders"
    );
    let neutral = library(
        "#version 450
layout(set = 0, binding = 0) uniform sampler2D tex;
layout(set = 0, binding = 1) uniform Block { vec4 v; } block;
layout(constant_id = 0) const int N = 4;
vec4 f(vec2 uv) { return texture(tex, uv) * block.v * float(N); }
",
    );
    for stage in [
        ShaderStage::Vertex,
        ShaderStage::TessControl,
        ShaderStage::TessEvaluation,
        ShaderStage::Geometry,
        ShaderStage::Fragment,
        ShaderStage::Compute,
        ShaderStage::Task,
        ShaderStage::Mesh,
    ] {
        assert!(neutral.supports(stage), "{stage:?}");
    }
    assert!(neutral.variants.is_empty());
    let interface = object(
        ShaderStage::Vertex,
        "#version 450\nlayout(location = 0) in vec4 value;\nvec4 f() { return value; }\n",
    );
    assert!(interface.is_library());
    assert!(interface.supports(ShaderStage::Vertex));
    assert!(interface.supports(ShaderStage::Fragment));
    assert!(!interface.supports(ShaderStage::Compute));
    assert!(library_errors("#version 450\nvoid main() {}\n")
        .join("\n")
        .contains("cannot define `main`"));
    let text = library_errors(
        "#version 450
shared float cache;
vec4 f() { return gl_FragCoord + vec4(cache); }
",
    )
    .join("\n");
    assert!(!text.is_empty());
}

#[test]
fn library_sampling_is_fixed_up_for_the_stage() {
    let lib = library(
        "#version 450
layout(set = 0, binding = 0) uniform sampler2D tex;
vec4 fetch(vec2 uv) { return texture(tex, uv); }
",
    );
    let vertex = object(
        ShaderStage::Vertex,
        "#version 450
vec4 fetch(vec2 uv);
void main() { gl_Position = fetch(vec2(0.5)); }
",
    );
    let result = linked(&[vertex, lib.clone()]);
    let level = |result: &Linked| {
        result
            .module
            .functions
            .iter()
            .flat_map(|(_, function)| function.expressions.iter())
            .find_map(|(_, expression)| match *expression {
                rglsl::Expression::ImageSample { level, .. } => Some(level),
                _ => None,
            })
    };
    assert!(matches!(level(&result), Some(rglsl::SampleLevel::Zero)));
    let fragment = object(
        ShaderStage::Fragment,
        "#version 450
layout(location = 0) out vec4 color;
vec4 fetch(vec2 uv);
void main() { color = fetch(vec2(0.5)); }
",
    );
    let result = linked(&[fragment, lib]);
    assert!(matches!(level(&result), Some(rglsl::SampleLevel::Auto)));
}

#[test]
fn libraries_link_into_every_stage_of_a_program() {
    let vertex = object(
        ShaderStage::Vertex,
        "#version 450
layout(location = 0) out vec4 shaded;
float helper(float x);
void main() { gl_Position = vec4(helper(1.0)); shaded = vec4(0.0); }
",
    );
    let fragment = object(ShaderStage::Fragment, MAIN);
    let stages = match link_objects(
        &[vertex, library(HELPER), fragment],
        &LinkOptions::default(),
    ) {
        Ok(stages) => stages,
        Err(errors) => panic!("{errors}"),
    };
    let found: Vec<ShaderStage> = stages.iter().map(|stage| stage.stage).collect();
    assert_eq!(found, [ShaderStage::Vertex, ShaderStage::Fragment]);
}

#[test]
fn cross_stage_implicit_sizes_must_agree() {
    let vertex = object(
        ShaderStage::Vertex,
        "#version 460
layout(location = 0) out float a[];
void main() { a[0] = 1.0; gl_Position = vec4(0.0); }
",
    );
    let fragment = object(
        ShaderStage::Fragment,
        "#version 460
layout(location = 0) in float a[];
layout(location = 0) out vec4 color;
void main() { color = vec4(a[1]); }
",
    );
    match link_objects(&[vertex, fragment], &LinkOptions::default()) {
        Ok(_) => panic!("linking succeeded"),
        Err(errors) => assert_eq!(errors.errors, [LinkError::ImplicitSize("a".into())]),
    }
}

#[test]
fn library_layouts_are_merged_into_the_program() {
    let main = object(
        ShaderStage::Compute,
        "#version 460
#extension GL_QCOM_tile_shading : enable
layout(local_size_x = 16, local_size_y = 16) in;
float f(float x);
layout(set = 0, binding = 0) buffer Data { float v[]; } data;
void main() { data.v[gl_LocalInvocationIndex] = f(1.0); }
",
    );
    let lib = library(
        "#version 460
#extension GL_QCOM_tile_shading : enable
layout(shading_rate_xQCOM = 2, shading_rate_yQCOM = 4) in;
layout(local_size_z_id = 7) in;
float f(float x) { return x; }
",
    );
    assert!(lib.supports(ShaderStage::Compute));
    assert!(!lib.supports(ShaderStage::Fragment));
    let result = linked(&[main, lib]);
    let entry = &result.module.entry_points[0];
    assert_eq!(entry.workgroup_size, [16, 16, 1]);
    assert_eq!(entry.tile_shading.rate, Some([2, 4, 1]));
    let overrides = entry.workgroup_size_overrides.unwrap();
    assert!(overrides[0].is_none() && overrides[1].is_none());
    let id = match result.module.global_expressions[overrides[2].unwrap()] {
        rglsl::Expression::Override(handle) => result.module.overrides[handle].id,
        _ => None,
    };
    assert_eq!(id, Some(7));
    assert!(!spirv(&result).is_empty());
}

#[test]
fn contradictory_invocations_use_glslang_wording() {
    let main = object(
        ShaderStage::Geometry,
        "#version 450
layout(triangles, invocations = 2) in;
layout(points, max_vertices = 1) out;
void f();
void main() { f(); }
",
    );
    let lib = library("#version 450\nlayout(invocations = 3) in;\nvoid f() {}\n");
    assert_eq!(
        errors(&[main, lib])
            .iter()
            .map(ToString::to_string)
            .collect::<Vec<_>>(),
        ["number of invocations must match between compilation units"]
    );
}
