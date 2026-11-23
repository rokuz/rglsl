#![expect(
    unsafe_code,
    reason = "the tests call the C functions of rglsl-capi through their Rust declarations"
)]

use std::ffi::{CStr, c_char};
use std::ptr;

use rglsl_c::{
    Blob, CompileOptions, Diagnostics, Object, PipelineLayout, Program,
    RGLSL_DESCRIPTOR_HEAP_RESOURCE, RGLSL_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER,
    RGLSL_DESCRIPTOR_TYPE_SAMPLER, RGLSL_DESCRIPTOR_TYPE_STORAGE_BUFFER,
    RGLSL_DESCRIPTOR_TYPE_UNIFORM_BUFFER, RGLSL_INTERFACE_INPUT, RGLSL_INTERFACE_OUTPUT,
    RGLSL_RESULT_INVALID_ARGUMENT, RGLSL_RESULT_INVALID_SPIRV, RGLSL_RESULT_LINK_FAILED,
    RGLSL_RESULT_OK, RGLSL_SCALAR_KIND_BOOL, RGLSL_SCALAR_KIND_FLOAT, RGLSL_SCALAR_KIND_INT,
    RGLSL_SCALAR_KIND_UINT, RGLSL_STAGE_COMPUTE, RGLSL_STAGE_FRAGMENT, RGLSL_STAGE_VERTEX,
    Reflection, ResultCode, Stage,
};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const VERTEX: &CStr = c"#version 450
layout(set = 0, binding = 0) uniform Camera { mat4 viewProjection; } camera;
layout(push_constant) uniform Model { mat4 model; } model;
layout(location = 0) in vec3 position;
layout(location = 1) in ivec2 ids[2];
layout(location = 0) out vec4 tint;
void main() {
    tint = vec4(ids[1], 0.0, 1.0);
    gl_Position = camera.viewProjection * model.model * vec4(position, 1.0);
}
";

const FRAGMENT: &CStr = c"#version 450
layout(set = 0, binding = 0) uniform Camera { mat4 viewProjection; } camera;
layout(set = 0, binding = 1) uniform sampler2D albedo;
layout(push_constant) uniform Material { layout(offset = 64) vec4 tint; } material;
layout(location = 0) in vec4 tint;
layout(location = 0) out vec4 color;
void main() {
    color = texture(albedo, vec2(0.5)) * material.tint * tint + camera.viewProjection[0];
}
";

const CONFLICT: &CStr = c"#version 450
layout(set = 0, binding = 0) uniform sampler plain;
layout(location = 0) out vec4 color;
void main() { color = vec4(1.0); }
";

const COMPUTE: &CStr = c"#version 450
layout(local_size_x_id = 2, local_size_y = 8) in;
layout(constant_id = 0) const int count = -4;
layout(constant_id = 1) const bool enabled = true;
layout(set = 1, binding = 3) buffer Values { uint header; float values[]; } values;
void main() {
    if (enabled) {
        values.values[gl_LocalInvocationIndex] = float(count + int(values.header));
    }
}
";

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

fn result<T>(
    code: ResultCode,
    value: *mut T,
    destroy: unsafe extern "C" fn(*mut T),
    diagnostics: *mut Diagnostics,
) -> TestResult<Result<Owned<T>, (ResultCode, String)>> {
    if code == RGLSL_RESULT_OK {
        assert!(diagnostics.is_null());
        return Ok(Ok(Owned::new(value, destroy)?));
    }
    assert!(value.is_null());
    let diagnostics = Owned::new(diagnostics, rglsl_c::rglsl_diagnostics_destroy)?;
    let text = string(unsafe { rglsl_c::rglsl_diagnostics_text(diagnostics.as_const()) })?;
    Ok(Err((code, text)))
}

fn done<T>(outcome: Result<Owned<T>, (ResultCode, String)>) -> TestResult<Owned<T>> {
    outcome.map_err(|(code, text)| format!("rglsl failed with {code:?}: {text}").into())
}

fn compile(source: &CStr, name: &CStr, stage: Stage) -> TestResult<Owned<Object>> {
    let mut options = ptr::null_mut();
    let code =
        unsafe { rglsl_c::rglsl_compile_options_create(name.as_ptr(), stage, &raw mut options) };
    assert_eq!(code, RGLSL_RESULT_OK);
    let options: Owned<CompileOptions> =
        Owned::new(options, rglsl_c::rglsl_compile_options_destroy)?;
    let mut object = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_compile(
            source.as_ptr(),
            options.as_const(),
            &raw mut object,
            &raw mut diagnostics,
        )
    };
    done(result(
        code,
        object,
        rglsl_c::rglsl_object_destroy,
        diagnostics,
    )?)
}

fn link(objects: &[&Owned<Object>]) -> TestResult<Owned<Program>> {
    let pointers: Vec<*const Object> = objects.iter().map(|object| object.as_const()).collect();
    let mut program = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_link(
            pointers.as_ptr(),
            pointers.len(),
            ptr::null(),
            &raw mut program,
            &raw mut diagnostics,
        )
    };
    done(result(
        code,
        program,
        rglsl_c::rglsl_program_destroy,
        diagnostics,
    )?)
}

fn program(sources: &[(&CStr, &CStr, Stage)]) -> TestResult<Owned<Program>> {
    let objects = sources
        .iter()
        .map(|&(source, name, stage)| compile(source, name, stage))
        .collect::<TestResult<Vec<_>>>()?;
    link(&objects.iter().collect::<Vec<_>>())
}

fn blob_text(blob: &Owned<Blob>) -> TestResult<String> {
    string(unsafe { rglsl_c::rglsl_blob_text(blob.as_const()) })
}

#[derive(Debug, PartialEq, Eq)]
struct BindingRow {
    set: u32,
    binding: u32,
    descriptor_type: u32,
    count: u32,
    name: String,
}

fn reflection_bindings(reflection: *const Reflection) -> TestResult<Vec<BindingRow>> {
    let count = unsafe { rglsl_c::rglsl_reflection_binding_count(reflection) };
    (0..count)
        .map(|index| {
            let mut row = BindingRow {
                set: 0,
                binding: 0,
                descriptor_type: 0,
                count: 0,
                name: string(unsafe { rglsl_c::rglsl_reflection_binding_name(reflection, index) })?,
            };
            let mut descriptor_type = RGLSL_DESCRIPTOR_TYPE_SAMPLER;
            let code = unsafe {
                rglsl_c::rglsl_reflection_binding(
                    reflection,
                    index,
                    &raw mut row.set,
                    &raw mut row.binding,
                    &raw mut descriptor_type,
                    &raw mut row.count,
                    ptr::null_mut(),
                )
            };
            assert_eq!(code, RGLSL_RESULT_OK);
            row.descriptor_type = descriptor_type.raw();
            Ok(row)
        })
        .collect()
}

#[test]
fn program_stages_carry_their_reflection() -> TestResult {
    let program = program(&[
        (VERTEX, c"main.vert", RGLSL_STAGE_VERTEX),
        (FRAGMENT, c"main.frag", RGLSL_STAGE_FRAGMENT),
    ])?;
    let vertex = unsafe { rglsl_c::rglsl_program_stage_reflection(program.as_const(), 0) };
    let fragment = unsafe { rglsl_c::rglsl_program_stage_reflection(program.as_const(), 1) };
    assert!(!vertex.is_null() && !fragment.is_null());
    assert!(unsafe { rglsl_c::rglsl_program_stage_reflection(program.as_const(), 2) }.is_null());
    let mut stage = RGLSL_STAGE_COMPUTE;
    assert_eq!(
        unsafe { rglsl_c::rglsl_reflection_stage(fragment, &raw mut stage) },
        RGLSL_RESULT_OK
    );
    assert_eq!(stage, RGLSL_STAGE_FRAGMENT);
    assert_eq!(
        string(unsafe { rglsl_c::rglsl_reflection_entry_point(fragment) })?,
        "main"
    );
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_local_size(
                fragment,
                0,
                ptr::null_mut(),
                ptr::null_mut(),
                ptr::null_mut(),
            )
        },
        RGLSL_RESULT_INVALID_ARGUMENT
    );
    assert_eq!(
        reflection_bindings(fragment)?,
        [
            BindingRow {
                set: 0,
                binding: 0,
                descriptor_type: RGLSL_DESCRIPTOR_TYPE_UNIFORM_BUFFER.raw(),
                count: 1,
                name: String::from("camera"),
            },
            BindingRow {
                set: 0,
                binding: 1,
                descriptor_type: RGLSL_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER.raw(),
                count: 1,
                name: String::from("albedo"),
            },
        ]
    );
    let (mut size, mut stride) = (0, 7);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_binding_block(fragment, 0, &raw mut size, &raw mut stride)
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((size, stride), (64, 0));
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_binding_block(fragment, 1, &raw mut size, &raw mut stride)
        },
        RGLSL_RESULT_INVALID_ARGUMENT
    );
    assert_eq!(
        unsafe { rglsl_c::rglsl_reflection_descriptor_heaps(fragment) },
        0
    );
    assert_eq!(
        unsafe { rglsl_c::rglsl_reflection_push_constant_count(fragment) },
        1
    );
    let (mut offset, mut size) = (0, 0);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_push_constant(
                fragment,
                0,
                &raw mut offset,
                &raw mut size,
                ptr::null_mut(),
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((offset, size), (64, 16));
    assert_eq!(
        string(unsafe { rglsl_c::rglsl_reflection_push_constant_name(fragment, 0) })?,
        "material"
    );
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_push_constant_bank(
                fragment,
                0,
                ptr::null_mut(),
                ptr::null_mut(),
            )
        },
        RGLSL_RESULT_INVALID_ARGUMENT
    );

    assert_eq!(
        unsafe { rglsl_c::rglsl_reflection_interface_count(vertex, RGLSL_INTERFACE_INPUT) },
        2
    );
    assert_eq!(
        unsafe { rglsl_c::rglsl_reflection_interface_count(vertex, RGLSL_INTERFACE_OUTPUT) },
        1
    );
    let (mut location, mut component) = (0, 9);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_interface(
                vertex,
                RGLSL_INTERFACE_INPUT,
                1,
                &raw mut location,
                &raw mut component,
                ptr::null_mut(),
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((location, component), (1, 0));
    assert_eq!(
        string(unsafe {
            rglsl_c::rglsl_reflection_interface_name(vertex, RGLSL_INTERFACE_INPUT, 1)
        })?,
        "ids"
    );
    let mut kind = RGLSL_SCALAR_KIND_BOOL;
    let (mut width, mut vector_size, mut columns) = (0, 0, 0);
    let mut array: *const u32 = ptr::null();
    let mut rank = 0;
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_interface_type(
                vertex,
                RGLSL_INTERFACE_INPUT,
                1,
                &raw mut kind,
                &raw mut width,
                &raw mut vector_size,
                &raw mut columns,
                &raw mut array,
                &raw mut rank,
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!(kind, RGLSL_SCALAR_KIND_INT);
    assert_eq!((width, vector_size, columns, rank), (32, 2, 1, 1));
    assert!(!array.is_null());
    assert_eq!(unsafe { std::slice::from_raw_parts(array, rank) }, [2]);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_interface_count(vertex, rglsl_c::Interface::from_raw(7))
        },
        0
    );

    let mut layout = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_program_pipeline_layout(
            program.as_const(),
            &raw mut layout,
            &raw mut diagnostics,
        )
    };
    let layout: Owned<PipelineLayout> = done(result(
        code,
        layout,
        rglsl_c::rglsl_pipeline_layout_destroy,
        diagnostics,
    )?)?;
    assert_eq!(
        unsafe { rglsl_c::rglsl_pipeline_layout_binding_count(layout.as_const()) },
        2
    );
    let mut stages = 0;
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_pipeline_layout_binding(
                layout.as_const(),
                0,
                ptr::null_mut(),
                ptr::null_mut(),
                ptr::null_mut(),
                ptr::null_mut(),
                &raw mut stages,
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!(stages, 0x11);
    assert_eq!(
        string(unsafe { rglsl_c::rglsl_pipeline_layout_binding_name(layout.as_const(), 1) })?,
        "albedo"
    );
    assert_eq!(
        unsafe { rglsl_c::rglsl_pipeline_layout_push_constant_range_count(layout.as_const()) },
        2
    );
    let (mut offset, mut size) = (0, 0);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_pipeline_layout_push_constant_range(
                layout.as_const(),
                1,
                &raw mut stages,
                &raw mut offset,
                &raw mut size,
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((stages, offset, size), (0x10, 64, 16));
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_pipeline_layout_push_constant_range_bank(
                layout.as_const(),
                1,
                ptr::null_mut(),
            )
        },
        RGLSL_RESULT_INVALID_ARGUMENT
    );

    let mut json = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_program_reflection_json(
            program.as_const(),
            &raw mut json,
            &raw mut diagnostics,
        )
    };
    let json = done(result(
        code,
        json,
        rglsl_c::rglsl_blob_destroy,
        diagnostics,
    )?)?;
    let text = blob_text(&json)?;
    assert!(text.contains("\"pipeline_layout\""), "{text}");
    assert!(text.contains("\"name\": \"albedo\""), "{text}");
    Ok(())
}

#[test]
fn reflects_spirv_words() -> TestResult {
    let program = program(&[(COMPUTE, c"main.comp", RGLSL_STAGE_COMPUTE)])?;
    let mut words = ptr::null();
    let mut word_count = 0;
    let code = unsafe {
        rglsl_c::rglsl_program_spirv(program.as_const(), 0, &raw mut words, &raw mut word_count)
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    let mut reflection = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_reflect(words, word_count, &raw mut reflection, &raw mut diagnostics)
    };
    let reflection = done(result(
        code,
        reflection,
        rglsl_c::rglsl_reflection_destroy,
        diagnostics,
    )?)?;
    let reflection = reflection.as_const();
    let mut sizes = Vec::new();
    for dimension in 0..3 {
        let (mut size, mut specialized, mut id) = (0, false, 0);
        let code = unsafe {
            rglsl_c::rglsl_reflection_local_size(
                reflection,
                dimension,
                &raw mut size,
                &raw mut specialized,
                &raw mut id,
            )
        };
        assert_eq!(code, RGLSL_RESULT_OK);
        sizes.push((size, specialized, id));
    }
    assert_eq!(sizes, [(1, true, 2), (8, false, 0), (1, false, 0)]);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_local_size(
                reflection,
                3,
                ptr::null_mut(),
                ptr::null_mut(),
                ptr::null_mut(),
            )
        },
        RGLSL_RESULT_INVALID_ARGUMENT
    );
    let (mut size, mut stride) = (0, 0);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_reflection_binding_block(reflection, 0, &raw mut size, &raw mut stride)
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((size, stride), (4, 4));
    let rows = reflection_bindings(reflection)?;
    assert_eq!(
        rows.iter()
            .map(|row| (row.set, row.binding, row.descriptor_type))
            .collect::<Vec<_>>(),
        [(1, 3, RGLSL_DESCRIPTOR_TYPE_STORAGE_BUFFER.raw())]
    );
    let count = unsafe { rglsl_c::rglsl_reflection_specialization_count(reflection) };
    let mut constants = Vec::new();
    for index in 0..count {
        let (mut id, mut width, mut bits) = (0, 0, 0);
        let mut kind = RGLSL_SCALAR_KIND_FLOAT;
        let code = unsafe {
            rglsl_c::rglsl_reflection_specialization(
                reflection,
                index,
                &raw mut id,
                &raw mut kind,
                &raw mut width,
                &raw mut bits,
                ptr::null_mut(),
            )
        };
        assert_eq!(code, RGLSL_RESULT_OK);
        let name = unsafe { rglsl_c::rglsl_reflection_specialization_name(reflection, index) };
        let name = (!name.is_null()).then(|| string(name)).transpose()?;
        constants.push((id, name, kind.raw(), width, bits));
    }
    assert_eq!(
        constants,
        [
            (
                0,
                Some(String::from("count")),
                RGLSL_SCALAR_KIND_INT.raw(),
                32,
                0xffff_fffc
            ),
            (
                1,
                Some(String::from("enabled")),
                RGLSL_SCALAR_KIND_BOOL.raw(),
                32,
                1
            ),
            (2, None, RGLSL_SCALAR_KIND_UINT.raw(), 32, 1),
        ]
    );
    assert_eq!(
        unsafe { rglsl_c::rglsl_reflection_descriptor_heaps(reflection) }
            & RGLSL_DESCRIPTOR_HEAP_RESOURCE,
        0
    );
    let mut json = ptr::null_mut();
    assert_eq!(
        unsafe { rglsl_c::rglsl_reflection_json(reflection, &raw mut json) },
        RGLSL_RESULT_OK
    );
    let json = Owned::new(json, rglsl_c::rglsl_blob_destroy)?;
    assert!(blob_text(&json)?.contains("\"stage\": \"compute\""));
    Ok(())
}

#[test]
fn invalid_spirv_is_reported() -> TestResult {
    for words in [
        &[][..],
        &[0x0723_0203, 0, 0][..],
        &[0xdead_beef, 0, 0, 0, 0][..],
        &[0x0723_0203, 0, 0, 0, 0, 0][..],
        &[0x0723_0203, 0, 0, 0, 0, 0x0005_000f][..],
    ] {
        let mut reflection = ptr::null_mut();
        let mut diagnostics = ptr::null_mut();
        let code = unsafe {
            rglsl_c::rglsl_reflect(
                words.as_ptr(),
                words.len(),
                &raw mut reflection,
                &raw mut diagnostics,
            )
        };
        let Err((code, text)) = result(
            code,
            reflection,
            rglsl_c::rglsl_reflection_destroy,
            diagnostics,
        )?
        else {
            return Err(format!("{words:?} was reflected").into());
        };
        assert_eq!(code, RGLSL_RESULT_INVALID_SPIRV);
        assert!(text.contains("invalid SPIR-V"), "{text}");
    }
    let mut reflection = ptr::null_mut();
    let code =
        unsafe { rglsl_c::rglsl_reflect(ptr::null(), 4, &raw mut reflection, ptr::null_mut()) };
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert!(reflection.is_null());
    assert_eq!(
        unsafe { rglsl_c::rglsl_reflection_binding_count(ptr::null()) },
        0
    );
    assert!(unsafe { rglsl_c::rglsl_reflection_entry_point(ptr::null()) }.is_null());
    unsafe { rglsl_c::rglsl_reflection_destroy(ptr::null_mut()) };
    unsafe { rglsl_c::rglsl_pipeline_layout_destroy(ptr::null_mut()) };
    Ok(())
}

#[test]
fn conflicting_stages_do_not_make_a_layout() -> TestResult {
    let vertex = program(&[(VERTEX, c"main.vert", RGLSL_STAGE_VERTEX)])?;
    let fragment = program(&[(CONFLICT, c"main.frag", RGLSL_STAGE_FRAGMENT)])?;
    let reflections = [
        unsafe { rglsl_c::rglsl_program_stage_reflection(vertex.as_const(), 0) },
        unsafe { rglsl_c::rglsl_program_stage_reflection(fragment.as_const(), 0) },
    ];
    let mut layout = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_pipeline_layout_create(
            reflections.as_ptr(),
            reflections.len(),
            &raw mut layout,
            &raw mut diagnostics,
        )
    };
    let Err((code, text)) = result(
        code,
        layout,
        rglsl_c::rglsl_pipeline_layout_destroy,
        diagnostics,
    )?
    else {
        return Err("conflicting stages made a layout".into());
    };
    assert_eq!(code, RGLSL_RESULT_LINK_FAILED);
    assert!(text.contains("set 0 binding 0"), "{text}");
    let mut layout = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_pipeline_layout_create(
            reflections.as_ptr(),
            1,
            &raw mut layout,
            &raw mut diagnostics,
        )
    };
    let layout = done(result(
        code,
        layout,
        rglsl_c::rglsl_pipeline_layout_destroy,
        diagnostics,
    )?)?;
    assert_eq!(
        unsafe { rglsl_c::rglsl_pipeline_layout_binding_count(layout.as_const()) },
        1
    );
    let null_entry = [reflections[0], ptr::null()];
    let mut layout = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_pipeline_layout_create(
            null_entry.as_ptr(),
            null_entry.len(),
            &raw mut layout,
            ptr::null_mut(),
        )
    };
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    Ok(())
}
