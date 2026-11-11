//! `xtask compile-one`: compiles one shader in its own process.
//!
//! Protocol (stdout), one diagnostic per line:
//!
//! ```text
//! E <phase> <line or -> <message>
//! ```
//!
//! Exit codes: 0 = SPIR-V written, 1 = rejected by the frontend or the
//! validator, 2 = accepted but the SPIR-V backend failed. Anything else
//! (a panic, a signal) is a crash.

use std::path::Path;

use rglsl::back::spv;
use rglsl::front::glsl;
use rglsl::valid::{Capabilities, ValidationFlags, Validator};
use rglsl::ShaderStage;

pub const EXIT_ACCEPTED: i32 = 0;
pub const EXIT_REJECTED: i32 = 1;
pub const EXIT_BACKEND_FAILED: i32 = 2;

fn stage_from_extension(ext: &str) -> Option<ShaderStage> {
    Some(match ext {
        "vert" => ShaderStage::Vertex,
        "tesc" => ShaderStage::TessControl,
        "tese" => ShaderStage::TessEvaluation,
        "geom" => ShaderStage::Geometry,
        "frag" => ShaderStage::Fragment,
        "comp" => ShaderStage::Compute,
        "task" => ShaderStage::Task,
        "mesh" => ShaderStage::Mesh,
        "rgen" => ShaderStage::RayGeneration,
        "rmiss" => ShaderStage::Miss,
        "rahit" => ShaderStage::AnyHit,
        "rchit" => ShaderStage::ClosestHit,
        "rint" => ShaderStage::Intersection,
        "rcall" => ShaderStage::Callable,
        _ => return None,
    })
}

fn diagnostic(phase: &str, line: Option<u32>, message: &str) {
    let line = line.map_or_else(|| "-".to_string(), |l| l.to_string());
    let message = message.replace(['\n', '\r'], " ");
    println!("E {phase} {line} {message}");
}

fn full_message(err: &dyn std::error::Error) -> String {
    let mut message = err.to_string();
    let mut source = err.source();
    while let Some(inner) = source {
        message.push_str(": ");
        message.push_str(&inner.to_string());
        source = inner.source();
    }
    message
}

pub fn compile_one(
    input: &Path,
    stage: &str,
    spv_version: &str,
    auto_map: bool,
    object: bool,
    hlsl_offsets: bool,
    include_dirs: &[String],
    out: &Path,
) -> i32 {
    let source = match std::fs::read(input) {
        Ok(bytes) => String::from_utf8_lossy(&bytes).into_owned(),
        Err(err) => {
            diagnostic("io", None, &err.to_string());
            return EXIT_REJECTED;
        }
    };
    let Some(stage) = stage_from_extension(stage) else {
        diagnostic(
            "stage",
            None,
            &format!("unsupported shader stage `{stage}`"),
        );
        return EXIT_REJECTED;
    };
    let lang_version = match spv_version.split_once('.') {
        Some((major, minor)) => match (major.parse(), minor.parse()) {
            (Ok(major), Ok(minor)) => (major, minor),
            _ => (1, 0),
        },
        None => (1, 0),
    };

    // Frontend
    let mut frontend = glsl::Frontend::default();
    let options = glsl::Options {
        auto_map_bindings: auto_map,
        auto_map_locations: auto_map,
        spirv_version: Some(lang_version),
        hlsl_offsets,
        ..glsl::Options::from(stage)
    };
    let mut includer = rglsl_pp::FileSystemIncluder::new(include_dirs);
    let root = includer.add_root(input);
    if object {
        return compile_object(&mut frontend, &options, &source, root, &mut includer, out);
    }
    let module = match frontend.parse_with_includer(&options, &source, root, &mut includer) {
        Ok(module) => module,
        Err(errors) => {
            for error in &errors.errors {
                let line = error
                    .meta
                    .is_defined()
                    .then(|| error.meta.location(&source).line_number);
                diagnostic("parse", line, &full_message(error));
            }
            return EXIT_REJECTED;
        }
    };

    // Validator
    let info = match Validator::new(ValidationFlags::all(), Capabilities::all()).validate(&module) {
        Ok(info) => info,
        Err(error) => {
            let line = error
                .spans()
                .next()
                .and_then(|(span, _)| span.to_range().map(|_| span.location(&source).line_number));
            diagnostic("validate", line, &full_message(error.as_inner()));
            return EXIT_REJECTED;
        }
    };

    write_spirv(&module, &info, lang_version, out)
}

fn spirv_options(lang_version: (u8, u8)) -> spv::Options<'static> {
    spv::Options {
        lang_version,
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        force_loop_bounding: false,
        zero_initialize_workgroup_memory: spv::ZeroInitializeWorkgroupMemoryMode::None,
        mesh_shader_primitive_indices_clamp: false,
        emit_int_div_checks: false,
        ..spv::Options::default()
    }
}

fn write_spirv(
    module: &rglsl::Module,
    info: &rglsl::valid::ModuleInfo,
    lang_version: (u8, u8),
    out: &Path,
) -> i32 {
    let options = spirv_options(lang_version);
    let words = match spv::write_vec(module, info, &options, None) {
        Ok(words) => words,
        Err(error) => {
            diagnostic("spv-out", None, &full_message(&error));
            return EXIT_BACKEND_FAILED;
        }
    };
    let bytes: Vec<u8> = words.iter().flat_map(|w| w.to_le_bytes()).collect();
    if let Err(err) = std::fs::write(out, bytes) {
        diagnostic("io", None, &err.to_string());
        return EXIT_BACKEND_FAILED;
    }
    EXIT_ACCEPTED
}

pub struct GroupOptions<'a> {
    pub spv_version: &'a str,
    pub auto_map_locations: bool,
    pub auto_map_bindings: bool,
    pub out_dir: &'a Path,
}

pub fn compile_group(inputs: &[String], options: &GroupOptions) -> i32 {
    let lang_version = parse_version(options.spv_version);
    let mut objects: Vec<rglsl::object::ObjectModule> = Vec::new();
    let mut rejected = false;
    for input in inputs {
        let path = Path::new(input);
        let source = match std::fs::read(path) {
            Ok(bytes) => String::from_utf8_lossy(&bytes).into_owned(),
            Err(err) => {
                diagnostic("io", None, &err.to_string());
                return EXIT_REJECTED;
            }
        };
        let extension = path
            .extension()
            .and_then(|extension| extension.to_str())
            .unwrap_or_default();
        let library = extension == "glsl";
        let Some(stage) =
            stage_from_extension(extension).or(library.then_some(ShaderStage::Compute))
        else {
            diagnostic("stage", None, &format!("no shader stage for `{input}`"));
            return EXIT_REJECTED;
        };
        let frontend_options = glsl::Options {
            auto_map_bindings: options.auto_map_bindings,
            auto_map_locations: options.auto_map_locations,
            spirv_version: Some(lang_version),
            library,
            ..glsl::Options::from(stage)
        };
        let mut includer = rglsl_pp::FileSystemIncluder::new(Vec::<String>::new());
        let root = includer.add_root(path);
        match glsl::Frontend::default().compile_with_includer(
            &frontend_options,
            &source,
            root,
            &mut includer,
        ) {
            Ok(mut object) => {
                object.name = path
                    .file_name()
                    .map(|name| name.to_string_lossy().into_owned());
                if let Err(errors) = rglsl_link::validate_object(&object) {
                    for error in errors.iter() {
                        diagnostic("validate", None, &error.to_string());
                    }
                    rejected = true;
                    continue;
                }
                objects.push(object);
            }
            Err(errors) => {
                for error in &errors.errors {
                    let line = error
                        .meta
                        .is_defined()
                        .then(|| error.meta.location(&source).line_number);
                    diagnostic("parse", line, &full_message(error));
                }
                rejected = true;
            }
        }
    }
    if rejected {
        return EXIT_REJECTED;
    }
    let link_options = rglsl_link::Options {
        auto_map_locations: options.auto_map_locations,
        auto_map_bindings: options.auto_map_bindings,
    };
    let linked = match rglsl_link::link_objects(&objects, &link_options) {
        Ok(linked) => linked,
        Err(errors) => {
            for error in errors.iter() {
                diagnostic("link", None, &error.to_string());
            }
            return EXIT_REJECTED;
        }
    };
    for stage in &linked {
        let out = options
            .out_dir
            .join(format!("{}.spv", stage_extension(stage.stage)));
        let code = write_spirv(&stage.module, &stage.info, lang_version, &out);
        if code != EXIT_ACCEPTED {
            return code;
        }
    }
    EXIT_ACCEPTED
}

fn parse_version(spv_version: &str) -> (u8, u8) {
    match spv_version.split_once('.') {
        Some((major, minor)) => match (major.parse(), minor.parse()) {
            (Ok(major), Ok(minor)) => (major, minor),
            _ => (1, 0),
        },
        None => (1, 0),
    }
}

pub const fn stage_extension(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Vertex => "vert",
        ShaderStage::TessControl => "tesc",
        ShaderStage::TessEvaluation => "tese",
        ShaderStage::Geometry => "geom",
        ShaderStage::Fragment => "frag",
        ShaderStage::Compute => "comp",
        ShaderStage::Task => "task",
        ShaderStage::Mesh => "mesh",
        ShaderStage::RayGeneration => "rgen",
        ShaderStage::Miss => "rmiss",
        ShaderStage::AnyHit => "rahit",
        ShaderStage::ClosestHit => "rchit",
        ShaderStage::Intersection => "rint",
        ShaderStage::Callable => "rcall",
    }
}

fn compile_object(
    frontend: &mut glsl::Frontend,
    options: &glsl::Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut rglsl_pp::FileSystemIncluder,
    out: &Path,
) -> i32 {
    let object = match frontend.compile_with_includer(options, source, root, includer) {
        Ok(object) => object,
        Err(errors) => {
            for error in &errors.errors {
                let line = error
                    .meta
                    .is_defined()
                    .then(|| error.meta.location(source).line_number);
                diagnostic("parse", line, &full_message(error));
            }
            return EXIT_REJECTED;
        }
    };
    if let Err(errors) = rglsl_link::validate_object(&object) {
        for error in errors.iter() {
            diagnostic("validate", None, &error.to_string());
        }
        return EXIT_REJECTED;
    }
    let text = match rglsl_link::encode(&object) {
        Ok(text) => text,
        Err(error) => {
            diagnostic("object", None, &error.to_string());
            return EXIT_BACKEND_FAILED;
        }
    };
    if let Err(err) = std::fs::write(out, text) {
        diagnostic("io", None, &err.to_string());
        return EXIT_BACKEND_FAILED;
    }
    EXIT_ACCEPTED
}
