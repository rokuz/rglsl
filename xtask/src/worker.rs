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
        // No IR stage yet: rint, rcall (M8).
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
        ..glsl::Options::from(stage)
    };
    let module = match frontend.parse(&options, &source) {
        Ok(module) => module,
        Err(errors) => {
            for error in &errors.errors {
                let line = error.meta.location(&source).line_number;
                diagnostic("parse", Some(line), &full_message(error));
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

    // SPIR-V backend, configured like glslang: no coordinate flip, no
    // injected bounds or loop checks, workgroup memory left uninitialized.
    let options = spv::Options {
        lang_version,
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        force_loop_bounding: false,
        zero_initialize_workgroup_memory: spv::ZeroInitializeWorkgroupMemoryMode::None,
        ray_query_initialization_tracking: false,
        trace_ray_argument_validation: false,
        mesh_shader_primitive_indices_clamp: false,
        emit_int_div_checks: false,
        ..spv::Options::default()
    };
    let words = match spv::write_vec(&module, &info, &options, None) {
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
