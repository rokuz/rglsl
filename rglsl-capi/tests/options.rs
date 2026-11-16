#![expect(
    unsafe_code,
    reason = "the tests call the C functions of rglsl-capi through their Rust declarations"
)]

use std::ffi::{CStr, CString, c_char};
use std::ptr;

use rglsl_c::{
    Blob, CompileOptions, Compiler, Diagnostics, Limits, Object, Program, ProgramOptions,
    RGLSL_DEBUG_INFO_LINES, RGLSL_DEBUG_INFO_STRIPPED, RGLSL_DISASSEMBLY_GLSLANG,
    RGLSL_DISASSEMBLY_STANDARD, RGLSL_FORMAT_ERROR_COLUMN, RGLSL_FORMAT_UNNAMED_SOURCE,
    RGLSL_REFLECT_ALL_BLOCK_VARIABLES, RGLSL_RESOURCE_TEXTURE, RGLSL_RESULT_COMPILE_FAILED,
    RGLSL_RESULT_INVALID_ARGUMENT, RGLSL_RESULT_INVALID_SPIRV, RGLSL_RESULT_OK,
    RGLSL_STAGE_COMPUTE, RGLSL_STAGE_FRAGMENT, RGLSL_STAGE_VERTEX, ResultCode, Stage,
};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const VERTEX: &CStr = c"#version 450
layout(location = 0) in vec3 position;
layout(location = 0) out vec2 coordinate;
void main() {
    coordinate = position.xy;
    gl_Position = vec4(position, 1.0);
}
";

const FRAGMENT: &CStr = c"#version 450
layout(location = 0) in vec2 coordinate;
layout(location = 0) out vec4 color;
layout(binding = 1) uniform texture2D image;
layout(binding = 2) uniform sampler linear;
layout(binding = 3) uniform Tint { vec4 tint; };
void main() {
    color = tint * texture(sampler2D(image, linear), coordinate);
}
";

const COMPUTE: &CStr = c"#version 450
layout(local_size_x = 1) in;
layout(binding = 0) buffer Data { float value; };
void work() { value = QUALITY; }
void main() {
#ifndef HIDDEN
    work();
#endif
}
";

const BROKEN: &CStr = c"#version 450\nvoid main() {\n    float x = missing;\n}\n";

struct Owned<T> {
    pointer: *mut T,
    destroy: unsafe extern "C" fn(*mut T),
}

impl<T> Owned<T> {
    fn new(pointer: *mut T, destroy: unsafe extern "C" fn(*mut T)) -> TestResult<Self> {
        if pointer.is_null() {
            return Err("rglsl returned a NULL handle".into());
        }
        Ok(Self { pointer, destroy })
    }

    fn as_const(&self) -> *const T {
        self.pointer.cast_const()
    }
}

impl<T> Drop for Owned<T> {
    fn drop(&mut self) {
        unsafe { (self.destroy)(self.pointer) };
    }
}

fn string(pointer: *const c_char) -> TestResult<String> {
    if pointer.is_null() {
        return Err("rglsl returned a NULL string".into());
    }
    Ok(unsafe { CStr::from_ptr(pointer) }.to_str()?.to_owned())
}

fn text(blob: *mut Blob) -> TestResult<String> {
    let blob = Owned::new(blob, rglsl_c::rglsl_blob_destroy)?;
    let text = string(unsafe { rglsl_c::rglsl_blob_text(blob.as_const()) })?;
    assert_eq!(text.len(), unsafe {
        rglsl_c::rglsl_blob_size(blob.as_const())
    });
    Ok(text)
}

fn options(name: &CStr, stage: Stage) -> TestResult<Owned<CompileOptions>> {
    let mut options = ptr::null_mut();
    let code =
        unsafe { rglsl_c::rglsl_compile_options_create(name.as_ptr(), stage, &raw mut options) };
    assert_eq!(code, RGLSL_RESULT_OK);
    Owned::new(options, rglsl_c::rglsl_compile_options_destroy)
}

fn program_options() -> TestResult<Owned<ProgramOptions>> {
    let mut options = ptr::null_mut();
    let code = unsafe { rglsl_c::rglsl_program_options_create(&raw mut options) };
    assert_eq!(code, RGLSL_RESULT_OK);
    Owned::new(options, rglsl_c::rglsl_program_options_destroy)
}

fn compiler() -> TestResult<Owned<Compiler>> {
    let mut compiler = ptr::null_mut();
    let code = unsafe { rglsl_c::rglsl_compiler_create(&raw mut compiler) };
    assert_eq!(code, RGLSL_RESULT_OK);
    Owned::new(compiler, rglsl_c::rglsl_compiler_destroy)
}

fn build(
    compiler: &Owned<Compiler>,
    sources: &[&CStr],
    options: &[&Owned<CompileOptions>],
    program_options: &Owned<ProgramOptions>,
) -> (ResultCode, *mut Program, *mut Diagnostics) {
    let sources: Vec<*const c_char> = sources.iter().map(|source| source.as_ptr()).collect();
    let options: Vec<*const CompileOptions> =
        options.iter().map(|options| options.as_const()).collect();
    let mut program = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_compiler_build(
            compiler.as_const(),
            sources.as_ptr(),
            options.as_ptr(),
            sources.len(),
            program_options.as_const(),
            &raw mut program,
            &raw mut diagnostics,
        )
    };
    (code, program, diagnostics)
}

fn compile(
    compiler: &Owned<Compiler>,
    source: &CStr,
    options: &Owned<CompileOptions>,
) -> (ResultCode, *mut Object, *mut Diagnostics) {
    let mut object = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_compiler_compile(
            compiler.as_const(),
            source.as_ptr(),
            options.as_const(),
            &raw mut object,
            &raw mut diagnostics,
        )
    };
    (code, object, diagnostics)
}

fn spirv(program: &Owned<Program>, index: usize) -> TestResult<Vec<u32>> {
    let mut words = ptr::null();
    let mut count = 0;
    let code = unsafe {
        rglsl_c::rglsl_program_spirv(program.as_const(), index, &raw mut words, &raw mut count)
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    if words.is_null() {
        return Err("a stage without SPIR-V".into());
    }
    Ok(unsafe { std::slice::from_raw_parts(words, count) }.to_vec())
}

fn disassembly(words: &[u32]) -> TestResult<String> {
    let mut blob = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_disassemble(
            words.as_ptr(),
            words.len(),
            RGLSL_DISASSEMBLY_GLSLANG,
            &raw mut blob,
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    text(blob)
}

#[test]
fn builds_a_program_with_reflection_and_every_option() -> TestResult {
    let compiler = compiler()?;
    let vertex = options(c"shader.vert", RGLSL_STAGE_VERTEX)?;
    let fragment = options(c"shader.frag", RGLSL_STAGE_FRAGMENT)?;
    let codes = unsafe {
        [
            rglsl_c::rglsl_compile_options_set_entry_point(fragment.pointer, c"shade".as_ptr()),
            rglsl_c::rglsl_compile_options_set_binding_shift(
                fragment.pointer,
                RGLSL_RESOURCE_TEXTURE,
                10,
            ),
            rglsl_c::rglsl_compile_options_set_vulkan_version(fragment.pointer, 1, 1),
            rglsl_c::rglsl_compile_options_set_spirv_version(fragment.pointer, 1, 3),
            rglsl_c::rglsl_compile_options_set_debug_info(fragment.pointer, RGLSL_DEBUG_INFO_LINES),
            rglsl_c::rglsl_compile_options_set_vulkan_version(vertex.pointer, 1, 1),
            rglsl_c::rglsl_compile_options_set_spirv_version(vertex.pointer, 1, 3),
        ]
    };
    assert_eq!(codes, [RGLSL_RESULT_OK; 7]);
    let program_options = program_options()?;
    let codes = unsafe {
        [
            rglsl_c::rglsl_program_options_set_reflection(
                program_options.pointer,
                true,
                RGLSL_REFLECT_ALL_BLOCK_VARIABLES,
            ),
            rglsl_c::rglsl_program_options_set_spirv_version(program_options.pointer, 1, 3),
            rglsl_c::rglsl_program_options_set_debug_info(
                program_options.pointer,
                RGLSL_DEBUG_INFO_LINES,
            ),
            rglsl_c::rglsl_program_options_set_command_line(
                program_options.pointer,
                c"-V shader.vert shader.frag".as_ptr(),
            ),
        ]
    };
    assert_eq!(codes, [RGLSL_RESULT_OK; 4]);
    let (code, program, diagnostics) = build(
        &compiler,
        &[VERTEX, FRAGMENT],
        &[&vertex, &fragment],
        &program_options,
    );
    assert_eq!(code, RGLSL_RESULT_OK);
    assert!(diagnostics.is_null());
    let program = Owned::new(program, rglsl_c::rglsl_program_destroy)?;
    assert_eq!(
        unsafe { rglsl_c::rglsl_program_stage_count(program.as_const()) },
        2
    );
    let reflection = string(unsafe { rglsl_c::rglsl_program_reflection(program.as_const()) })?;
    assert!(
        reflection.starts_with("Uniform reflection:\n"),
        "{reflection}"
    );
    assert!(reflection.contains("tint"), "{reflection}");
    let fragment_text = disassembly(&spirv(&program, 1)?)?;
    assert!(fragment_text.contains("\"shade\""), "{fragment_text}");
    assert!(
        fragment_text.contains("Decorate 13(image) Binding 11"),
        "{fragment_text}"
    );
    assert!(
        fragment_text.contains("ModuleProcessed  \"entry-point shade\""),
        "{fragment_text}"
    );
    assert!(
        fragment_text.contains("ModuleProcessed  \"shift-texture-binding 10\""),
        "{fragment_text}"
    );
    assert!(fragment_text.contains("Line "), "{fragment_text}");
    Ok(())
}

#[test]
fn build_failures_carry_diagnostics() -> TestResult {
    let compiler = compiler()?;
    let broken = options(c"broken.comp", RGLSL_STAGE_COMPUTE)?;
    let program_options = program_options()?;
    let (code, program, diagnostics) = build(&compiler, &[BROKEN], &[&broken], &program_options);
    assert_eq!(code, RGLSL_RESULT_COMPILE_FAILED);
    assert!(program.is_null());
    let diagnostics = Owned::new(diagnostics, rglsl_c::rglsl_diagnostics_destroy)?;
    let mut blob = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_diagnostics_info_log(
            diagnostics.as_const(),
            RGLSL_FORMAT_UNNAMED_SOURCE,
            &raw mut blob,
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    let log = text(blob)?;
    assert!(log.starts_with("ERROR: 0:3: "), "{log}");
    assert!(
        log.ends_with("ERROR: 1 compilation errors.  No code generated.\n\n"),
        "{log}"
    );
    let mut blob = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_diagnostics_format(
            diagnostics.as_const(),
            RGLSL_FORMAT_ERROR_COLUMN,
            &raw mut blob,
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    let lines = text(blob)?;
    assert!(lines.starts_with("ERROR: broken.comp:3:"), "{lines}");
    assert_eq!(lines.lines().count(), 1);
    Ok(())
}

#[test]
fn compiles_with_macros_and_reports_the_files_read() -> TestResult {
    let compiler = compiler()?;
    let compute = options(c"work.comp", RGLSL_STAGE_COMPUTE)?;
    let codes = unsafe {
        [
            rglsl_c::rglsl_compile_options_add_preamble_text(
                compute.pointer,
                c"#extension GL_GOOGLE_include_directive : require".as_ptr(),
            ),
            rglsl_c::rglsl_compile_options_add_define(
                compute.pointer,
                c"QUALITY".as_ptr(),
                c"2.0".as_ptr(),
            ),
            rglsl_c::rglsl_compile_options_add_define(
                compute.pointer,
                c"HIDDEN".as_ptr(),
                c"".as_ptr(),
            ),
            rglsl_c::rglsl_compile_options_add_undefine(compute.pointer, c"HIDDEN".as_ptr()),
            rglsl_c::rglsl_compile_options_add_include(
                compute.pointer,
                c"extra.h".as_ptr(),
                c"".as_ptr(),
            ),
            rglsl_c::rglsl_compile_options_set_keep_uncalled(compute.pointer, true),
            rglsl_c::rglsl_compile_options_set_debug_info(
                compute.pointer,
                RGLSL_DEBUG_INFO_STRIPPED,
            ),
        ]
    };
    assert_eq!(codes, [RGLSL_RESULT_OK; 7]);
    let source = CString::new(COMPUTE.to_str()?.replacen(
        "#version 450\n",
        "#version 450\n#include \"extra.h\"\n",
        1,
    ))?;
    let (code, object, diagnostics) = compile(&compiler, &source, &compute);
    assert_eq!(code, RGLSL_RESULT_OK, "{diagnostics:?}");
    let object = Owned::new(object, rglsl_c::rglsl_object_destroy)?;
    assert_eq!(
        unsafe { rglsl_c::rglsl_object_file_count(object.as_const()) },
        1
    );
    assert_eq!(
        string(unsafe { rglsl_c::rglsl_object_file(object.as_const(), 0) })?,
        "./extra.h"
    );
    let mut blob = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_compiler_preprocess(
            compiler.as_const(),
            source.as_ptr(),
            compute.as_const(),
            &raw mut blob,
            &raw mut diagnostics,
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    let preprocessed = text(blob)?;
    assert!(preprocessed.contains("value = 2.0;"), "{preprocessed}");
    assert!(preprocessed.contains("work();"), "{preprocessed}");
    Ok(())
}

#[test]
fn limits_decode_and_apply() -> TestResult {
    let mut limits = ptr::null_mut();
    let configuration = b"MaxDrawBuffers 1\nFoo 2\n";
    let code = unsafe {
        rglsl_c::rglsl_limits_decode(configuration.as_ptr(), configuration.len(), &raw mut limits)
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    let limits: Owned<Limits> = Owned::new(limits, rglsl_c::rglsl_limits_destroy)?;
    assert_eq!(
        unsafe { rglsl_c::rglsl_limits_message_count(limits.as_const()) },
        1
    );
    assert_eq!(
        string(unsafe { rglsl_c::rglsl_limits_message(limits.as_const(), 0) })?,
        "Warning: unrecognized limit (Foo) in configuration file."
    );
    let mut value = -1;
    let code = unsafe {
        rglsl_c::rglsl_limits_get(limits.as_const(), c"MaxLights".as_ptr(), &raw mut value)
    };
    assert_eq!((code, value), (RGLSL_RESULT_OK, 0));
    let code = unsafe { rglsl_c::rglsl_limits_set(limits.pointer, c"Bogus".as_ptr(), 1) };
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    let mut defaults = ptr::null_mut();
    assert_eq!(
        unsafe { rglsl_c::rglsl_limits_create(&raw mut defaults) },
        RGLSL_RESULT_OK
    );
    let defaults: Owned<Limits> = Owned::new(defaults, rglsl_c::rglsl_limits_destroy)?;
    let mut blob = ptr::null_mut();
    let code = unsafe { rglsl_c::rglsl_limits_configuration(defaults.as_const(), &raw mut blob) };
    assert_eq!(code, RGLSL_RESULT_OK);
    assert!(text(blob)?.starts_with("MaxLights 32\nMaxClipPlanes 6\n"));
    let compiler = compiler()?;
    let fragment = options(c"targets.frag", RGLSL_STAGE_FRAGMENT)?;
    let code =
        unsafe { rglsl_c::rglsl_compile_options_set_limits(fragment.pointer, limits.as_const()) };
    assert_eq!(code, RGLSL_RESULT_OK);
    let source = c"#version 450\nlayout(location = 1) out vec4 second;\nvoid main() { second = vec4(1.0); }\n";
    let (code, object, diagnostics) = compile(&compiler, source, &fragment);
    assert_eq!(code, RGLSL_RESULT_COMPILE_FAILED);
    assert!(object.is_null());
    drop(Owned::new(diagnostics, rglsl_c::rglsl_diagnostics_destroy)?);
    Ok(())
}

#[test]
fn text_forms_of_spirv() -> TestResult {
    let words = [0x0723_0203_u32, 0x0001_0000, 0x0008_000b, 2, 0];
    let mut blob = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_hex_text(
            words.as_ptr(),
            words.len(),
            c"module".as_ptr(),
            &raw mut blob,
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    let hex = text(blob)?;
    assert!(hex.contains("const uint32_t module[] = {"), "{hex}");
    assert!(
        hex.contains("0x07230203,0x00010000,0x0008000b,0x00000002,0x00000000"),
        "{hex}"
    );
    let disassembled = disassembly(&words)?;
    assert!(
        disassembled.starts_with("// Module Version 10000\n"),
        "{disassembled}"
    );
    let mut blob = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_disassemble(
            words.as_ptr(),
            words.len(),
            RGLSL_DISASSEMBLY_STANDARD,
            &raw mut blob,
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    assert_eq!(
        text(blob)?,
        "; SPIR-V\n; Version: 1.0\n; Generator: Khronos Glslang Reference Front End; 11\n; Bound: 2\n; Schema: 0\n"
    );
    let truncated = [0x0723_0203_u32, 0x0001_0000];
    let mut blob = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_disassemble(
            truncated.as_ptr(),
            truncated.len(),
            RGLSL_DISASSEMBLY_GLSLANG,
            &raw mut blob,
        )
    };
    assert_eq!(code, RGLSL_RESULT_INVALID_SPIRV);
    assert!(text(blob)?.contains("Disassembly failed"));
    let targets = [c"out.spv".as_ptr()];
    let dependencies = [c"a b.frag".as_ptr(), c"inc.h".as_ptr()];
    let mut blob = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_depfile(
            targets.as_ptr(),
            targets.len(),
            dependencies.as_ptr(),
            dependencies.len(),
            &raw mut blob,
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    assert_eq!(text(blob)?, "out.spv: a\\ b.frag inc.h\n");
    Ok(())
}

#[test]
fn code_generation_options() -> TestResult {
    let compiler = compiler()?;
    let vertex = options(c"shader.vert", RGLSL_STAGE_VERTEX)?;
    let codes = unsafe {
        [
            rglsl_c::rglsl_compile_options_set_invert_y(vertex.pointer, true),
            rglsl_c::rglsl_compile_options_set_nan_clamp(vertex.pointer, true),
            rglsl_c::rglsl_compile_options_set_discard_is_terminate(vertex.pointer, true),
            rglsl_c::rglsl_compile_options_set_no_storage_format(vertex.pointer, true),
        ]
    };
    assert_eq!(codes, [RGLSL_RESULT_OK; 4]);
    let source = c"#version 450
layout(location = 0) in vec3 position;
void main() {
    gl_Position = vec4(min(position, vec3(1.0)), 1.0);
}
";
    let program_options = program_options()?;
    let (code, program, _) = build(&compiler, &[source], &[&vertex], &program_options);
    assert_eq!(code, RGLSL_RESULT_OK);
    let program = Owned::new(program, rglsl_c::rglsl_program_destroy)?;
    let text = disassembly(&spirv(&program, 0)?)?;
    assert!(text.contains("FNegate"), "{text}");
    assert!(text.contains("(NMin)"), "{text}");
    Ok(())
}

#[test]
fn validate_io_rejects_inputs_without_outputs() -> TestResult {
    let compiler = compiler()?;
    let vertex = options(c"plain.vert", RGLSL_STAGE_VERTEX)?;
    let fragment = options(c"tinted.frag", RGLSL_STAGE_FRAGMENT)?;
    let program_options = program_options()?;
    let code =
        unsafe { rglsl_c::rglsl_program_options_set_validate_io(program_options.pointer, true) };
    assert_eq!(code, RGLSL_RESULT_OK);
    let sources = [
        c"#version 450\nvoid main() { gl_Position = vec4(0.0); }\n",
        c"#version 450\nlayout(location = 2) in vec4 tint;\nlayout(location = 0) out vec4 color;\nvoid main() { color = tint; }\n",
    ];
    let (code, program, diagnostics) =
        build(&compiler, &sources, &[&vertex, &fragment], &program_options);
    assert_eq!(code, rglsl_c::RGLSL_RESULT_LINK_FAILED);
    assert!(program.is_null());
    let diagnostics = Owned::new(diagnostics, rglsl_c::rglsl_diagnostics_destroy)?;
    let text = string(unsafe { rglsl_c::rglsl_diagnostics_text(diagnostics.as_const()) })?;
    assert!(text.contains("statically used input: tint"), "{text}");
    Ok(())
}

#[test]
fn auto_sampled_textures_option() -> TestResult {
    let compiler = compiler()?;
    let fragment = options(c"separate.frag", RGLSL_STAGE_FRAGMENT)?;
    let code =
        unsafe { rglsl_c::rglsl_compile_options_set_auto_sampled_textures(fragment.pointer, true) };
    assert_eq!(code, RGLSL_RESULT_OK);
    let source = c"#version 450
layout(binding = 0) uniform texture2D image;
layout(binding = 1) uniform sampler linear;
layout(location = 0) in vec2 uv;
layout(location = 0) out vec4 color;
void main() {
    color = texture(sampler2D(image, linear), uv);
}
";
    let program_options = program_options()?;
    let (code, program, _) = build(&compiler, &[source], &[&fragment], &program_options);
    assert_eq!(code, RGLSL_RESULT_OK);
    let program = Owned::new(program, rglsl_c::rglsl_program_destroy)?;
    let text = disassembly(&spirv(&program, 0)?)?;
    assert!(text.contains("TypeSampledImage"), "{text}");
    assert!(!text.contains("TypeSampler"), "{text}");
    assert!(!text.contains("linear"), "{text}");
    Ok(())
}
