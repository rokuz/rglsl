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

use rglsl::ShaderStage;
use rglsl::back::spv;
use rglsl::front::glsl;

pub const EXIT_ACCEPTED: i32 = 0;
pub const EXIT_REJECTED: i32 = 1;
pub const EXIT_BACKEND_FAILED: i32 = 2;

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

pub struct OneOptions<'a> {
    pub stage: &'a str,
    pub spv_version: &'a str,
    pub auto_map: bool,
    pub object: bool,
    pub via_object: bool,
    pub hlsl_offsets: bool,
    pub include_dirs: &'a [String],
    pub preamble: Option<String>,
    pub debug: Option<&'a str>,
    pub options: &'a [String],
}

fn debug_options(debug: Option<&str>) -> Option<spv::DebugInfo<'static>> {
    let (level, source_text) = match debug? {
        "g" => (spv::DebugLevel::Lines, true),
        "gV" => (spv::DebugLevel::NonSemantic, false),
        _ => (spv::DebugLevel::NonSemantic, true),
    };
    Some(spv::DebugInfo {
        level,
        source_text,
        processes: &[],
        entry_point: Some(spv::DebugEntryPoint {
            signature: "rglsl",
            arguments: "",
            directory: Some("."),
        }),
    })
}

pub fn compile_one(input: &Path, one: &OneOptions<'_>, out: &Path) -> i32 {
    let OneOptions {
        stage,
        spv_version,
        auto_map,
        object,
        via_object,
        hlsl_offsets,
        include_dirs,
        ref preamble,
        debug,
        options: extra,
    } = *one;
    let source = match std::fs::read(input) {
        Ok(bytes) => String::from_utf8_lossy(&bytes).into_owned(),
        Err(err) => {
            diagnostic("io", None, &err.to_string());
            return EXIT_REJECTED;
        }
    };
    let Some(stage) = ShaderStage::from_extension(stage) else {
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

    let has = |name: &str| extra.iter().any(|option| option == name);
    if let Some(unknown) = extra.iter().find(|option| {
        !matches!(
            option.as_str(),
            "--invert-y" | "--nan-clamp" | "--discard-is-terminate"
        )
    }) {
        diagnostic("options", None, &format!("unknown option `{unknown}`"));
        return EXIT_REJECTED;
    }
    let options = glsl::Options {
        invert_y: has("--invert-y"),
        nan_clamp: has("--nan-clamp"),
        discard_is_terminate: has("--discard-is-terminate"),
        auto_map_bindings: auto_map,
        auto_map_locations: auto_map,
        spirv_version: Some(lang_version),
        hlsl_offsets,
        debug_info: debug.is_some(),
        source_name: Some(input.to_string_lossy().into_owned()),
        preamble: preamble.clone(),
        export_functions: object,
        ..glsl::Options::from(stage)
    };
    let mut includer = rglsl_pp::FileSystemIncluder::new(include_dirs);
    let root = includer.add_root(input);
    if object {
        return compile_only(
            &options,
            &source,
            root,
            &mut includer,
            (lang_version, debug),
            out,
        );
    }
    if via_object {
        return compile_through_object(
            &options,
            &source,
            root,
            &mut includer,
            (lang_version, debug),
            out,
        );
    }
    match rglsl_link::compile_program(&options, &source, root, &mut includer) {
        Ok(linked) => write_spirv(&linked.module, &linked.info, lang_version, debug, out),
        Err(error) => {
            report(&error, &source);
            EXIT_REJECTED
        }
    }
}

fn report(error: &rglsl_link::CompileError, source: &str) {
    match *error {
        rglsl_link::CompileError::Frontend(ref errors) => {
            for error in &errors.errors {
                let line = error
                    .meta
                    .is_defined()
                    .then(|| error.meta.location(source).line_number);
                diagnostic("parse", line, &full_message(error));
            }
        }
        rglsl_link::CompileError::Invalid(ref invalid) => {
            let line = invalid
                .error
                .spans()
                .next()
                .and_then(|&(span, _)| invalid.module.span_sources.locate(span))
                .map(|location| location.line);
            diagnostic("validate", line, &full_message(invalid.error.as_inner()));
        }
        rglsl_link::CompileError::Object(ref errors) => {
            for error in errors.iter() {
                diagnostic("validate", None, &error.to_string());
            }
        }
        rglsl_link::CompileError::Link(ref errors) => {
            for error in errors.iter() {
                diagnostic("link", None, &error.to_string());
            }
        }
    }
}

fn spirv_options(lang_version: (u8, u8), debug: Option<&str>) -> spv::Options<'static> {
    spv::Options {
        lang_version,
        debug_info: debug_options(debug),
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    }
}

fn write_spirv(
    module: &rglsl::Module,
    info: &rglsl::valid::ModuleInfo,
    lang_version: (u8, u8),
    debug: Option<&str>,
    out: &Path,
) -> i32 {
    write_words(module, info, &spirv_options(lang_version, debug), out)
}

fn write_words(
    module: &rglsl::Module,
    info: &rglsl::valid::ModuleInfo,
    options: &spv::Options<'_>,
    out: &Path,
) -> i32 {
    let words = match spv::write_vec(module, info, options, None) {
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
    pub debug: Option<String>,
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
            ShaderStage::from_extension(extension).or(library.then_some(ShaderStage::Compute))
        else {
            diagnostic("stage", None, &format!("no shader stage for `{input}`"));
            return EXIT_REJECTED;
        };
        let frontend_options = glsl::Options {
            auto_map_bindings: options.auto_map_bindings,
            auto_map_locations: options.auto_map_locations,
            spirv_version: Some(lang_version),
            library,
            debug_info: options.debug.is_some(),
            source_name: Some(input.clone()),
            ..glsl::Options::from(stage)
        };
        let mut includer = rglsl_pp::FileSystemIncluder::new(Vec::<String>::new());
        let root = includer.add_root(path);
        match rglsl_link::compile_object(&frontend_options, &source, root, &mut includer) {
            Ok(rglsl_link::CompiledObject { mut object, .. }) => {
                object.name = path
                    .file_name()
                    .map(|name| name.to_string_lossy().into_owned());
                objects.push(object);
            }
            Err(error) => {
                report(&error, &source);
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
        ..rglsl_link::Options::default()
    };
    let linked = match rglsl_link::link_program(
        rglsl_link::group_objects_by_stage(objects),
        &link_options,
    ) {
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
            .join(format!("{}.spv", stage.stage.extension()));
        let code = write_spirv(
            &stage.module,
            &stage.info,
            lang_version,
            options.debug.as_deref(),
            &out,
        );
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

fn compile_only(
    options: &glsl::Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut rglsl_pp::FileSystemIncluder,
    (lang_version, debug): ((u8, u8), Option<&str>),
    out: &Path,
) -> i32 {
    let rglsl_link::CompiledObject { object, info } =
        match rglsl_link::compile_object(options, source, root, includer) {
            Ok(compiled) => compiled,
            Err(error) => {
                report(&error, source);
                return EXIT_REJECTED;
            }
        };
    let mut options = spirv_options(lang_version, debug);
    options.flags |= spv::WriterFlags::EXPORT_FUNCTIONS;
    write_words(&object.unit.module, &info, &options, out)
}

fn compile_through_object(
    options: &glsl::Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut rglsl_pp::FileSystemIncluder,
    (lang_version, debug): ((u8, u8), Option<&str>),
    out: &Path,
) -> i32 {
    let object = match rglsl_link::compile_object(options, source, root, includer) {
        Ok(compiled) => compiled.object,
        Err(error) => {
            report(&error, source);
            return EXIT_REJECTED;
        }
    };
    let object = match rglsl_link::encode(&object).and_then(|text| rglsl_link::decode(&text)) {
        Ok(object) => object,
        Err(error) => {
            diagnostic("object-file", None, &full_message(&error));
            return EXIT_REJECTED;
        }
    };
    let link_options = rglsl_link::Options {
        auto_map_locations: options.auto_map_locations,
        auto_map_bindings: options.auto_map_bindings,
        ..rglsl_link::Options::default()
    };
    let linked = match rglsl_link::link_program(vec![vec![object]], &link_options) {
        Ok(linked) => linked,
        Err(errors) => {
            for error in errors.iter() {
                diagnostic("link", None, &error.to_string());
            }
            return EXIT_REJECTED;
        }
    };
    let [ref stage] = *linked.as_slice() else {
        diagnostic(
            "link",
            None,
            &format!("{} stages linked from one shader", linked.len()),
        );
        return EXIT_REJECTED;
    };
    write_spirv(&stage.module, &stage.info, lang_version, debug, out)
}
