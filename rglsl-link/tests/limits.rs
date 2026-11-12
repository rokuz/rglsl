use rglsl::front::glsl::{ErrorKind, Frontend, Options, ResourceLimits};
use rglsl::object::ObjectModule;
use rglsl::valid::{Capabilities, ValidationFlags, Validator};
use rglsl::ShaderStage;
use rglsl_link::LinkError;

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const CAPTURE_MAIN: &str = "#version 450
void capture();
void main() { capture(); gl_Position = vec4(0.0); }
";

const CAPTURE: &str = "#version 450
layout(location = 0, xfb_buffer = 0, xfb_offset = 380) out vec4 captured;
void capture() { captured = vec4(1.0); }
";

const CAPTURE_PROGRAM: &str = "#version 450
layout(location = 0, xfb_buffer = 0, xfb_offset = 380) out vec4 captured;
void main() { captured = vec4(1.0); gl_Position = vec4(0.0); }
";

fn wide_feedback() -> ResourceLimits {
    ResourceLimits {
        max_transform_feedback_interleaved_components: 128,
        ..ResourceLimits::default()
    }
}

fn options(stage: ShaderStage, limits: ResourceLimits) -> Options {
    Options {
        limits,
        ..Options::from(stage)
    }
}

fn object(source: &str, options: &Options) -> TestResult<ObjectModule> {
    Frontend::default()
        .compile(options, source)
        .map_err(|errors| errors.to_string().into())
}

#[test]
fn an_implicit_stride_over_the_limit_is_a_link_error_of_a_program() -> TestResult {
    let errors = match Frontend::default().parse(
        &options(ShaderStage::Vertex, ResourceLimits::default()),
        CAPTURE_PROGRAM,
    ) {
        Ok(_) => return Err("the stride of 396 bytes passed the default limit".into()),
        Err(errors) => errors,
    };
    assert!(errors.errors.iter().any(|error| matches!(
        error.kind,
        ErrorKind::Link(ref message) if message.starts_with("xfb_stride is too large:\n    xfb_buffer 0, components (1/4 stride) needed are 99, gl_MaxTransformFeedbackInterleavedComponents is 64")
    )));
    let module = Frontend::default()
        .parse(
            &options(ShaderStage::Vertex, wide_feedback()),
            CAPTURE_PROGRAM,
        )
        .map_err(|errors| errors.to_string())?;
    Validator::new(ValidationFlags::all(), Capabilities::all()).validate(&module)?;
    Ok(())
}

#[test]
fn the_linker_checks_the_merged_stride_against_its_limits() -> TestResult {
    let compile = |limits: ResourceLimits| -> TestResult<Vec<ObjectModule>> {
        Ok(vec![
            object(CAPTURE_MAIN, &options(ShaderStage::Vertex, limits))?,
            object(CAPTURE, &options(ShaderStage::Vertex, limits))?,
        ])
    };
    let objects = compile(ResourceLimits::default())?;
    let errors = match rglsl_link::link_objects(&objects, &rglsl_link::Options::default()) {
        Ok(_) => return Err("the merged stride passed the default limit".into()),
        Err(errors) => errors,
    };
    assert!(errors.iter().any(|error| *error
        == LinkError::XfbStride {
            buffer: 0,
            components: 99,
            limit: 64,
        }));
    let objects = compile(wide_feedback())?;
    let linked = rglsl_link::link_objects(
        &objects,
        &rglsl_link::Options {
            limits: wide_feedback(),
            ..rglsl_link::Options::default()
        },
    )
    .map_err(|errors| format!("{errors:?}"))?;
    assert_eq!(linked.len(), 1);
    Ok(())
}

#[test]
fn libraries_see_the_configured_constants() -> TestResult {
    let library =
        "#version 450\nfloat clip[gl_MaxClipDistances - 9];\nfloat first() { return clip[0]; }\n";
    let library_options = |limits: ResourceLimits| Options {
        library: true,
        ..options(ShaderStage::Vertex, limits)
    };
    assert!(Frontend::default()
        .compile(&library_options(ResourceLimits::default()), library)
        .is_err());
    let limits = ResourceLimits {
        max_clip_distances: 10,
        ..ResourceLimits::default()
    };
    object(library, &library_options(limits))?;
    Ok(())
}

#[test]
fn clip_distances_follow_the_limits() -> TestResult {
    let source = "#version 450\nout float gl_ClipDistance[10];\nvoid main() { gl_ClipDistance[9] = 1.0; gl_Position = vec4(0.0); }\n";
    assert!(Frontend::default()
        .parse(
            &options(ShaderStage::Vertex, ResourceLimits::default()),
            source
        )
        .is_err());
    let limits = ResourceLimits {
        max_clip_distances: 10,
        ..ResourceLimits::default()
    };
    let module = Frontend::default()
        .parse(&options(ShaderStage::Vertex, limits), source)
        .map_err(|errors| errors.to_string())?;
    Validator::new(ValidationFlags::all(), Capabilities::all()).validate(&module)?;
    Ok(())
}

#[test]
fn outputs_of_a_unit_without_transform_feedback_join_buffer_zero() -> TestResult {
    let main =
        "#version 450\nvoid capture();\nvoid main() { capture(); gl_Position = vec4(0.0); }\n";
    let capture = "#version 450\nlayout(location = 0, xfb_buffer = 1, xfb_offset = 16) out vec4 captured;\nvoid capture() { captured = vec4(1.0); }\n";
    let limits = ResourceLimits::default();
    let objects = vec![
        object(main, &options(ShaderStage::Vertex, limits))?,
        object(capture, &options(ShaderStage::Vertex, limits))?,
    ];
    let linked = rglsl_link::link_objects(&objects, &rglsl_link::Options::default())
        .map_err(|errors| format!("{errors:?}"))?;
    let stage = linked.first().ok_or("no linked stage")?;
    let mut buffers: Vec<(u32, u32)> = stage
        .module
        .global_variables
        .iter()
        .filter(|(_, global)| global.space == rglsl::AddressSpace::Output)
        .map(|(_, global)| {
            global
                .xfb
                .as_ref()
                .map_or((u32::MAX, 0), |xfb| (xfb.buffer, xfb.stride))
        })
        .collect();
    buffers.sort_unstable();
    assert_eq!(buffers, [(0, 0), (1, 32)]);
    Ok(())
}
