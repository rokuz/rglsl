#![expect(
    unsafe_code,
    reason = "the tests call the C functions of rglsl-capi through their Rust declarations"
)]

mod common;

use std::ffi::CStr;
use std::ptr;

use common::{Outcome, Owned, TestResult, compile, compile_options, link, string};
use rglsl_c::{
    Blob, Object, PipelineLayout, Program, RGLSL_DESCRIPTOR_HEAP_RESOURCE,
    RGLSL_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER, RGLSL_DESCRIPTOR_TYPE_SAMPLER,
    RGLSL_DESCRIPTOR_TYPE_STORAGE_BUFFER, RGLSL_DESCRIPTOR_TYPE_UNIFORM_BUFFER,
    RGLSL_INTERFACE_INPUT, RGLSL_INTERFACE_OUTPUT, RGLSL_RESULT_INVALID_ARGUMENT,
    RGLSL_RESULT_INVALID_SPIRV, RGLSL_RESULT_LINK_FAILED, RGLSL_RESULT_OK, RGLSL_SCALAR_KIND_BOOL,
    RGLSL_SCALAR_KIND_ENCODED_FLOAT, RGLSL_SCALAR_KIND_FLOAT, RGLSL_SCALAR_KIND_INT,
    RGLSL_SCALAR_KIND_UINT, RGLSL_STAGE_COMPUTE, RGLSL_STAGE_FRAGMENT, RGLSL_STAGE_VERTEX,
    ResultCode, ScalarKind, SpirvReflection, Stage,
};

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

const BFLOAT16: &CStr = c"#version 450
#extension GL_EXT_bfloat16 : require
layout(local_size_x = 1) in;
layout(constant_id = 0) const bfloat16_t scale = bfloat16_t(2.0);
layout(set = 0, binding = 0) buffer Out { float value; };
void main() { value = float(scale); }
";

fn program(sources: &[(&CStr, &CStr, Stage)]) -> TestResult<Owned<Program>> {
    let objects = sources
        .iter()
        .map(|&(source, name, stage)| compile(source, &compile_options(name, stage)?)?.done())
        .collect::<TestResult<Vec<Owned<Object>>>>()?;
    let pointers: Vec<*const Object> = objects.iter().map(Owned::as_const).collect();
    link(&pointers, ptr::null())?.done()
}

fn stage_reflection(
    program: &Owned<Program>,
    index: usize,
) -> TestResult<Outcome<SpirvReflection>> {
    let mut reflection = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_program_spirv_reflection(
            program.as_const(),
            index,
            &raw mut reflection,
            &raw mut diagnostics,
        )
    };
    Outcome::new(
        code,
        reflection,
        rglsl_c::rglsl_spirv_reflection_destroy,
        diagnostics,
    )
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

fn reflection_bindings(reflection: *const SpirvReflection) -> TestResult<Vec<BindingRow>> {
    let count = unsafe { rglsl_c::rglsl_spirv_reflection_binding_count(reflection) };
    (0..count)
        .map(|index| {
            let mut row = BindingRow {
                set: 0,
                binding: 0,
                descriptor_type: 0,
                count: 0,
                name: string(unsafe {
                    rglsl_c::rglsl_spirv_reflection_binding_name(reflection, index)
                })?,
            };
            let mut descriptor_type = RGLSL_DESCRIPTOR_TYPE_SAMPLER;
            let mut variable_id = 0;
            let code = unsafe {
                rglsl_c::rglsl_spirv_reflection_binding(
                    reflection,
                    index,
                    &raw mut row.set,
                    &raw mut row.binding,
                    &raw mut descriptor_type,
                    &raw mut row.count,
                    &raw mut variable_id,
                )
            };
            assert_eq!(code, RGLSL_RESULT_OK);
            assert_ne!(variable_id, 0);
            row.descriptor_type = descriptor_type.raw();
            Ok(row)
        })
        .collect()
}

#[derive(Debug, Default, PartialEq, Eq)]
struct LocalSize {
    present: bool,
    size: u32,
    specialized: bool,
    spec_id: u32,
}

fn local_size(reflection: *const SpirvReflection, dimension: u32) -> (ResultCode, LocalSize) {
    let mut value = LocalSize {
        present: true,
        size: 9,
        specialized: true,
        spec_id: 9,
    };
    let code = unsafe {
        rglsl_c::rglsl_spirv_reflection_local_size(
            reflection,
            dimension,
            &raw mut value.present,
            &raw mut value.size,
            &raw mut value.specialized,
            &raw mut value.spec_id,
        )
    };
    (code, value)
}

#[derive(Debug, PartialEq, Eq)]
struct ScalarRow {
    kind: u32,
    encoding: u32,
    width: u32,
}

type SpecializationRow = (u32, Option<String>, ScalarRow, u64);

fn specializations(reflection: *const SpirvReflection) -> TestResult<Vec<SpecializationRow>> {
    let count = unsafe { rglsl_c::rglsl_spirv_reflection_specialization_count(reflection) };
    (0..count)
        .map(|index| {
            let (mut id, mut encoding, mut width, mut bits, mut result_id) = (0, 0, 0, 0, 0);
            let mut kind = RGLSL_SCALAR_KIND_FLOAT;
            let code = unsafe {
                rglsl_c::rglsl_spirv_reflection_specialization(
                    reflection,
                    index,
                    &raw mut id,
                    &raw mut kind,
                    &raw mut encoding,
                    &raw mut width,
                    &raw mut bits,
                    &raw mut result_id,
                )
            };
            assert_eq!(code, RGLSL_RESULT_OK);
            assert_ne!(result_id, 0);
            let name =
                unsafe { rglsl_c::rglsl_spirv_reflection_specialization_name(reflection, index) };
            let name = (!name.is_null()).then(|| string(name)).transpose()?;
            Ok((
                id,
                name,
                ScalarRow {
                    kind: kind.raw(),
                    encoding,
                    width,
                },
                bits,
            ))
        })
        .collect()
}

#[test]
fn program_stages_are_reflected_on_request() -> TestResult {
    let program = program(&[
        (VERTEX, c"main.vert", RGLSL_STAGE_VERTEX),
        (FRAGMENT, c"main.frag", RGLSL_STAGE_FRAGMENT),
    ])?;
    let vertex = stage_reflection(&program, 0)?.done()?;
    let fragment = stage_reflection(&program, 1)?.done()?;
    let (code, text) = stage_reflection(&program, 2)?.failed()?;
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert!(text.contains("stage 2 is out of range"), "{text}");
    let (vertex, fragment) = (vertex.as_const(), fragment.as_const());
    let mut stage = RGLSL_STAGE_COMPUTE;
    assert_eq!(
        unsafe { rglsl_c::rglsl_spirv_reflection_stage(fragment, &raw mut stage) },
        RGLSL_RESULT_OK
    );
    assert_eq!(stage, RGLSL_STAGE_FRAGMENT);
    assert_eq!(
        string(unsafe { rglsl_c::rglsl_spirv_reflection_entry_point(fragment) })?,
        "main"
    );
    assert_eq!(
        local_size(fragment, 0),
        (RGLSL_RESULT_OK, LocalSize::default())
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
    let (mut is_block, mut size, mut stride) = (false, 0, 7);
    for (index, expected) in [(0, (true, 64, 0)), (1, (false, 0, 0))] {
        assert_eq!(
            unsafe {
                rglsl_c::rglsl_spirv_reflection_binding_block(
                    fragment,
                    index,
                    &raw mut is_block,
                    &raw mut size,
                    &raw mut stride,
                )
            },
            RGLSL_RESULT_OK
        );
        assert_eq!((is_block, size, stride), expected);
    }
    assert_eq!(
        unsafe { rglsl_c::rglsl_spirv_reflection_descriptor_heaps(fragment) },
        0
    );
    assert_eq!(
        unsafe { rglsl_c::rglsl_spirv_reflection_push_constant_count(fragment) },
        1
    );
    let (mut offset, mut size, mut variable_id) = (0, 0, 0);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_spirv_reflection_push_constant(
                fragment,
                0,
                &raw mut offset,
                &raw mut size,
                &raw mut variable_id,
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((offset, size), (64, 16));
    assert_eq!(
        string(unsafe { rglsl_c::rglsl_spirv_reflection_push_constant_name(fragment, 0) })?,
        "material"
    );
    let (mut banked, mut bank, mut bank_offset) = (true, 5, 5);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_spirv_reflection_push_constant_bank(
                fragment,
                0,
                &raw mut banked,
                &raw mut bank,
                &raw mut bank_offset,
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((banked, bank, bank_offset), (false, 0, 0));

    assert_eq!(
        unsafe { rglsl_c::rglsl_spirv_reflection_interface_count(vertex, RGLSL_INTERFACE_INPUT) },
        2
    );
    assert_eq!(
        unsafe { rglsl_c::rglsl_spirv_reflection_interface_count(vertex, RGLSL_INTERFACE_OUTPUT) },
        1
    );
    let (mut location, mut component) = (0, 9);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_spirv_reflection_interface(
                vertex,
                RGLSL_INTERFACE_INPUT,
                1,
                &raw mut location,
                &raw mut component,
                &raw mut variable_id,
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((location, component), (1, 0));
    assert_eq!(
        string(unsafe {
            rglsl_c::rglsl_spirv_reflection_interface_name(vertex, RGLSL_INTERFACE_INPUT, 1)
        })?,
        "ids"
    );
    let mut kind = RGLSL_SCALAR_KIND_BOOL;
    let (mut encoding, mut width, mut vector_size, mut columns) = (7, 0, 0, 0);
    let mut array: *const u32 = ptr::null();
    let mut rank = 0;
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_spirv_reflection_interface_type(
                vertex,
                RGLSL_INTERFACE_INPUT,
                1,
                &raw mut kind,
                &raw mut encoding,
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
    assert_eq!(
        (encoding, width, vector_size, columns, rank),
        (0, 32, 2, 1, 1)
    );
    assert!(!array.is_null());
    assert_eq!(unsafe { std::slice::from_raw_parts(array, rank) }, [2]);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_spirv_reflection_interface_count(vertex, rglsl_c::Interface::from_raw(7))
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
    let layout: Owned<PipelineLayout> = Outcome::new(
        code,
        layout,
        rglsl_c::rglsl_pipeline_layout_destroy,
        diagnostics,
    )?
    .done()?;
    assert_eq!(
        unsafe { rglsl_c::rglsl_pipeline_layout_binding_count(layout.as_const()) },
        2
    );
    let (mut set, mut binding, mut count, mut stages) = (9, 9, 9, 0);
    let mut descriptor_type = RGLSL_DESCRIPTOR_TYPE_SAMPLER;
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_pipeline_layout_binding(
                layout.as_const(),
                0,
                &raw mut set,
                &raw mut binding,
                &raw mut descriptor_type,
                &raw mut count,
                &raw mut stages,
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((set, binding, count, stages), (0, 0, 1, 0x11));
    assert_eq!(descriptor_type, RGLSL_DESCRIPTOR_TYPE_UNIFORM_BUFFER);
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
    let (mut banked, mut bank) = (true, 3);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_pipeline_layout_push_constant_range_bank(
                layout.as_const(),
                1,
                &raw mut banked,
                &raw mut bank,
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((banked, bank), (false, 0));

    let mut json = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_program_spirv_reflection_json(
            program.as_const(),
            &raw mut json,
            &raw mut diagnostics,
        )
    };
    let json = Outcome::new(code, json, rglsl_c::rglsl_blob_destroy, diagnostics)?.done()?;
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
        rglsl_c::rglsl_spirv_reflect(words, word_count, &raw mut reflection, &raw mut diagnostics)
    };
    let reflection = Outcome::new(
        code,
        reflection,
        rglsl_c::rglsl_spirv_reflection_destroy,
        diagnostics,
    )?
    .done()?;
    let reflection = reflection.as_const();
    let sizes: Vec<(ResultCode, LocalSize)> = (0..3)
        .map(|dimension| local_size(reflection, dimension))
        .collect();
    let present = |size, spec_id: Option<u32>| {
        (
            RGLSL_RESULT_OK,
            LocalSize {
                present: true,
                size,
                specialized: spec_id.is_some(),
                spec_id: spec_id.unwrap_or(0),
            },
        )
    };
    assert_eq!(
        sizes,
        [present(1, Some(2)), present(8, None), present(1, None)]
    );
    assert_eq!(
        local_size(reflection, 3),
        (RGLSL_RESULT_INVALID_ARGUMENT, LocalSize::default())
    );
    let (mut is_block, mut size, mut stride) = (false, 0, 0);
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_spirv_reflection_binding_block(
                reflection,
                0,
                &raw mut is_block,
                &raw mut size,
                &raw mut stride,
            )
        },
        RGLSL_RESULT_OK
    );
    assert_eq!((is_block, size, stride), (true, 4, 4));
    let rows = reflection_bindings(reflection)?;
    assert_eq!(
        rows.iter()
            .map(|row| (row.set, row.binding, row.descriptor_type))
            .collect::<Vec<_>>(),
        [(1, 3, RGLSL_DESCRIPTOR_TYPE_STORAGE_BUFFER.raw())]
    );
    let scalar = |kind: ScalarKind| ScalarRow {
        kind: kind.raw(),
        encoding: 0,
        width: 32,
    };
    assert_eq!(
        specializations(reflection)?,
        [
            (
                0,
                Some(String::from("count")),
                scalar(RGLSL_SCALAR_KIND_INT),
                0xffff_fffc
            ),
            (
                1,
                Some(String::from("enabled")),
                scalar(RGLSL_SCALAR_KIND_BOOL),
                1
            ),
            (2, None, scalar(RGLSL_SCALAR_KIND_UINT), 1),
        ]
    );
    assert_eq!(
        unsafe { rglsl_c::rglsl_spirv_reflection_descriptor_heaps(reflection) }
            & RGLSL_DESCRIPTOR_HEAP_RESOURCE,
        0
    );
    let mut json = ptr::null_mut();
    assert_eq!(
        unsafe { rglsl_c::rglsl_spirv_reflection_json(reflection, &raw mut json) },
        RGLSL_RESULT_OK
    );
    let json = Owned::new(json, rglsl_c::rglsl_blob_destroy)?;
    assert!(blob_text(&json)?.contains("\"stage\": \"comp\""));
    Ok(())
}

#[test]
fn encoded_floats_carry_their_encoding() -> TestResult {
    let program = program(&[(BFLOAT16, c"bfloat.comp", RGLSL_STAGE_COMPUTE)])?;
    let reflection = stage_reflection(&program, 0)?.done()?;
    assert_eq!(
        specializations(reflection.as_const())?,
        [(
            0,
            Some(String::from("scale")),
            ScalarRow {
                kind: RGLSL_SCALAR_KIND_ENCODED_FLOAT.raw(),
                encoding: 0,
                width: 16,
            },
            0x4000
        )]
    );
    Ok(())
}

#[test]
fn outputs_are_required_and_zeroed() -> TestResult {
    let program = program(&[(FRAGMENT, c"main.frag", RGLSL_STAGE_FRAGMENT)])?;
    let reflection = stage_reflection(&program, 0)?.done()?;
    let reflection = reflection.as_const();
    let (mut set, mut binding, mut count) = (7, 7, 7);
    let mut descriptor_type = RGLSL_DESCRIPTOR_TYPE_STORAGE_BUFFER;
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_spirv_reflection_binding(
                reflection,
                0,
                &raw mut set,
                &raw mut binding,
                &raw mut descriptor_type,
                &raw mut count,
                ptr::null_mut(),
            )
        },
        RGLSL_RESULT_INVALID_ARGUMENT
    );
    let mut variable_id = 7;
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_spirv_reflection_binding(
                reflection,
                9,
                &raw mut set,
                &raw mut binding,
                &raw mut descriptor_type,
                &raw mut count,
                &raw mut variable_id,
            )
        },
        RGLSL_RESULT_INVALID_ARGUMENT
    );
    assert_eq!((set, binding, count, variable_id), (0, 0, 0, 0));
    assert_eq!(descriptor_type, RGLSL_DESCRIPTOR_TYPE_SAMPLER);
    let mut present = true;
    assert_eq!(
        unsafe {
            rglsl_c::rglsl_spirv_reflection_local_size(
                reflection,
                0,
                &raw mut present,
                ptr::null_mut(),
                ptr::null_mut(),
                ptr::null_mut(),
            )
        },
        RGLSL_RESULT_INVALID_ARGUMENT
    );
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
            rglsl_c::rglsl_spirv_reflect(
                words.as_ptr(),
                words.len(),
                &raw mut reflection,
                &raw mut diagnostics,
            )
        };
        let (code, text) = Outcome::new(
            code,
            reflection,
            rglsl_c::rglsl_spirv_reflection_destroy,
            diagnostics,
        )?
        .failed()?;
        assert_eq!(code, RGLSL_RESULT_INVALID_SPIRV);
        assert!(text.contains("invalid SPIR-V"), "{text}");
    }
    let mut reflection = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_spirv_reflect(ptr::null(), 4, &raw mut reflection, ptr::null_mut())
    };
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert!(reflection.is_null());
    assert_eq!(
        unsafe { rglsl_c::rglsl_spirv_reflection_binding_count(ptr::null()) },
        0
    );
    assert!(unsafe { rglsl_c::rglsl_spirv_reflection_entry_point(ptr::null()) }.is_null());
    unsafe { rglsl_c::rglsl_spirv_reflection_destroy(ptr::null_mut()) };
    unsafe { rglsl_c::rglsl_pipeline_layout_destroy(ptr::null_mut()) };
    Ok(())
}

fn pipeline_layout(reflections: &[*const SpirvReflection]) -> TestResult<Outcome<PipelineLayout>> {
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
    Outcome::new(
        code,
        layout,
        rglsl_c::rglsl_pipeline_layout_destroy,
        diagnostics,
    )
}

#[test]
fn conflicting_stages_do_not_make_a_layout() -> TestResult {
    let vertex = program(&[(VERTEX, c"main.vert", RGLSL_STAGE_VERTEX)])?;
    let fragment = program(&[(CONFLICT, c"main.frag", RGLSL_STAGE_FRAGMENT)])?;
    let vertex = stage_reflection(&vertex, 0)?.done()?;
    let fragment = stage_reflection(&fragment, 0)?.done()?;
    let (code, text) = pipeline_layout(&[vertex.as_const(), fragment.as_const()])?.failed()?;
    assert_eq!(code, RGLSL_RESULT_LINK_FAILED);
    assert!(
        text.contains("set 0 binding 0 is uniform_buffer x1 in the vertex stage"),
        "{text}"
    );
    let layout = pipeline_layout(&[vertex.as_const()])?.done()?;
    assert_eq!(
        unsafe { rglsl_c::rglsl_pipeline_layout_binding_count(layout.as_const()) },
        1
    );
    let (code, text) = pipeline_layout(&[vertex.as_const(), ptr::null()])?.failed()?;
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert!(text.contains("reflections[1] is NULL"), "{text}");
    Ok(())
}
