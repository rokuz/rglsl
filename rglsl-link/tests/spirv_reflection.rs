use std::path::{Path, PathBuf};
use std::process::Command;

use rglsl_link::spirv_reflection::{
    self, BindingUse, BlockLayout, DescriptorHeap, DescriptorType, Format, InterfaceVariable,
    PipelineLayout, Reflection, ScalarKind, ScalarType, ScalarValue, ShaderStageMask,
    WorkgroupDimension, vulkan_stage_flags,
};
use rglsl_link::{
    CompileOptions, OptLevel, OptOptions, ProgramOptions, ShaderStage, compile_and_link,
    spirv_version_of_vulkan,
};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const VULKAN_1_0: (u8, u8) = (1, 0);
const VULKAN_1_2: (u8, u8) = (1, 2);
const VULKAN_1_3: (u8, u8) = (1, 3);

fn options(stage: ShaderStage, vulkan: (u8, u8)) -> CompileOptions {
    CompileOptions::new(format!("shader.{}", stage.extension()), stage)
        .target_vulkan(vulkan.0, vulkan.1)
}

fn program_options(vulkan: (u8, u8)) -> ProgramOptions {
    ProgramOptions {
        spirv_version: spirv_version_of_vulkan(vulkan),
        ..ProgramOptions::default()
    }
}

fn reflect_rglsl(source: &str, stage: ShaderStage, vulkan: (u8, u8)) -> TestResult<Reflection> {
    let program = compile_and_link(
        &[(source, options(stage, vulkan))],
        &program_options(vulkan),
    )?;
    let binary = program.stage(stage).ok_or("missing stage")?;
    let reflection = binary.spirv_reflection()?;
    assert_eq!(reflection, spirv_reflection::reflect(&binary.words)?);
    Ok(reflection)
}

fn glslang() -> TestResult<Option<PathBuf>> {
    let configured = std::env::var_os("RGLSL_GLSLANG").map(PathBuf::from);
    let pinned = Path::new(env!("CARGO_MANIFEST_DIR")).join("../target/oracles/bin/glslang");
    let found = configured.or(Some(pinned)).filter(|path| path.is_file());
    if found.is_none() && std::env::var_os("RGLSL_REQUIRE_ORACLES").is_some() {
        return Err(
            "RGLSL_REQUIRE_ORACLES is set but there is no glslang at target/oracles/bin/glslang or in RGLSL_GLSLANG"
                .into(),
        );
    }
    Ok(found)
}

fn reflect_glslang(
    name: &str,
    source: &str,
    stage: ShaderStage,
    vulkan: (u8, u8),
) -> TestResult<Option<Reflection>> {
    let Some(glslang) = glslang()? else {
        println!(
            "skipped the glslang cross-check: no glslang at target/oracles/bin/glslang or in RGLSL_GLSLANG"
        );
        return Ok(None);
    };
    let directory = Path::new(env!("CARGO_TARGET_TMPDIR")).join("spirv_reflection");
    std::fs::create_dir_all(&directory)?;
    let input = directory.join(format!("{name}.{}", stage.extension()));
    let output = directory.join(format!("{name}.{}.spv", stage.extension()));
    std::fs::write(&input, source)?;
    let result = Command::new(glslang)
        .arg("-V")
        .arg("--target-env")
        .arg(format!("vulkan{}.{}", vulkan.0, vulkan.1))
        .arg(&input)
        .arg("-o")
        .arg(&output)
        .output()?;
    if !result.status.success() {
        return Err(format!(
            "glslang failed on {name}: {}{}",
            String::from_utf8_lossy(&result.stdout),
            String::from_utf8_lossy(&result.stderr)
        )
        .into());
    }
    let bytes = std::fs::read(&output)?;
    let words = bytes
        .chunks_exact(4)
        .map(|chunk| <[u8; 4]>::try_from(chunk).map(u32::from_le_bytes))
        .collect::<Result<Vec<u32>, _>>()?;
    Ok(Some(spirv_reflection::reflect(&words)?))
}

fn without_ids(reflection: &Reflection) -> Reflection {
    let mut reflection = reflection.clone();
    for binding in &mut reflection.descriptor_bindings {
        binding.variable_id = 0;
    }
    for block in &mut reflection.push_constants {
        block.variable_id = 0;
    }
    for variable in reflection
        .inputs
        .iter_mut()
        .chain(reflection.outputs.iter_mut())
    {
        variable.variable_id = 0;
    }
    for constant in &mut reflection.specialization_constants {
        constant.result_id = 0;
    }
    reflection
}

fn cross_check(
    name: &str,
    source: &str,
    stage: ShaderStage,
    vulkan: (u8, u8),
) -> TestResult<Reflection> {
    let rglsl = reflect_rglsl(source, stage, vulkan)?;
    if let Some(glslang) = reflect_glslang(name, source, stage, vulkan)? {
        assert_eq!(without_ids(&rglsl), without_ids(&glslang), "{name}");
    }
    Ok(rglsl)
}

fn bindings(reflection: &Reflection) -> Vec<(u32, u32, DescriptorType, u32, Option<&str>)> {
    reflection
        .descriptor_bindings
        .iter()
        .map(|binding| {
            (
                binding.set,
                binding.binding,
                binding.descriptor_type,
                binding.count,
                binding.name.as_deref(),
            )
        })
        .collect()
}

fn blocks(reflection: &Reflection) -> Vec<Option<(u32, Option<u32>)>> {
    reflection
        .descriptor_bindings
        .iter()
        .map(|binding| {
            binding
                .block
                .map(|block: BlockLayout| (block.size, block.runtime_array_stride))
        })
        .collect()
}

const fn use_of(binding: BindingUse) -> (ShaderStage, DescriptorType, u32) {
    (binding.stage, binding.descriptor_type, binding.count)
}

const fn scalar(kind: ScalarKind, width: u32) -> ScalarType {
    ScalarType { kind, width }
}

const FLOAT: ScalarType = scalar(ScalarKind::Float, 32);

fn format(scalar: ScalarType, vector_size: u32, columns: u32, array: &[u32]) -> Format {
    Format {
        scalar,
        vector_size,
        columns,
        array: array.to_vec(),
    }
}

fn interface(variables: &[InterfaceVariable]) -> Vec<(u32, u32, Option<&str>, Format)> {
    variables
        .iter()
        .map(|variable| {
            (
                variable.location,
                variable.component,
                variable.name.as_deref(),
                variable.format.clone(),
            )
        })
        .collect()
}

#[test]
fn push_constants_with_buffer_references_and_bindless_arrays() -> TestResult {
    let source = r"
        #version 460
        #extension GL_EXT_buffer_reference : require
        #extension GL_EXT_nonuniform_qualifier : require
        #extension GL_EXT_samplerless_texture_functions : require

        layout(buffer_reference, std430) readonly buffer VertexBuf {
            vec4 positions[];
        };

        layout(set = 0, binding = 0) uniform texture2D kTextures2D[];
        layout(set = 0, binding = 1) uniform sampler kSamplers[];

        layout(push_constant) uniform PushConstants {
            mat4 mvp;
            VertexBuf vertices;
            uint texId;
            uint smpId;
        } pc;

        layout(location = 0) out vec4 outColor;

        void main() {
            vec4 p = pc.vertices.positions[0];
            outColor = (pc.mvp * p) + texture(nonuniformEXT(sampler2D(kTextures2D[pc.texId], kSamplers[pc.smpId])), vec2(0.5));
        }
    ";
    let reflection = cross_check("bindless", source, ShaderStage::Fragment, VULKAN_1_2)?;
    let [push_constants] = reflection.push_constants.as_slice() else {
        return Err("expected one push constant block".into());
    };
    assert_eq!(push_constants.end(), 80);
    assert_eq!((push_constants.offset, push_constants.size), (0, 80));
    assert_eq!(push_constants.name.as_deref(), Some("pc"));
    assert_eq!(
        bindings(&reflection),
        [
            (0, 0, DescriptorType::SampledImage, 0, Some("kTextures2D")),
            (0, 1, DescriptorType::Sampler, 0, Some("kSamplers")),
        ]
    );
    Ok(())
}

#[test]
fn every_descriptor_type() -> TestResult {
    let source = r"
        #version 460
        #extension GL_EXT_ray_query : require
        layout(set = 0, binding = 0) uniform sampler plainSampler;
        layout(set = 0, binding = 1) uniform sampler2D combined;
        layout(set = 0, binding = 2) uniform texture2D sampledImage;
        layout(set = 0, binding = 3, rgba8) uniform readonly image2D storageImage;
        layout(set = 0, binding = 4) uniform samplerBuffer combinedTexels;
        layout(set = 0, binding = 5) uniform textureBuffer uniformTexels;
        layout(set = 0, binding = 6, r32f) uniform readonly imageBuffer storageTexels;
        layout(set = 0, binding = 7, std140) uniform Uniforms { vec4 tint; } uniforms;
        layout(set = 0, binding = 8, std430) buffer Storage { uint count; vec4 data[]; } storage;
        layout(input_attachment_index = 0, set = 1, binding = 0) uniform subpassInput attachment;
        layout(set = 1, binding = 1) uniform accelerationStructureEXT scene;
        layout(location = 0) out vec4 color;
        void main() {
            rayQueryEXT query;
            rayQueryInitializeEXT(query, scene, 0u, 0xffu, vec3(0.0), 0.0, vec3(0.0, 0.0, 1.0), 1.0);
            color = texture(sampler2D(sampledImage, plainSampler), vec2(0.5))
                + texture(combined, vec2(0.5))
                + imageLoad(storageImage, ivec2(0))
                + texelFetch(combinedTexels, 0)
                + texelFetch(samplerBuffer(uniformTexels, plainSampler), 1)
                + imageLoad(storageTexels, 2)
                + uniforms.tint
                + storage.data[storage.count]
                + subpassLoad(attachment);
        }
    ";
    let reflection = cross_check("descriptors", source, ShaderStage::Fragment, VULKAN_1_2)?;
    assert_eq!(
        bindings(&reflection),
        [
            (0, 0, DescriptorType::Sampler, 1, Some("plainSampler")),
            (
                0,
                1,
                DescriptorType::CombinedImageSampler,
                1,
                Some("combined")
            ),
            (0, 2, DescriptorType::SampledImage, 1, Some("sampledImage")),
            (0, 3, DescriptorType::StorageImage, 1, Some("storageImage")),
            (
                0,
                4,
                DescriptorType::UniformTexelBuffer,
                1,
                Some("combinedTexels")
            ),
            (
                0,
                5,
                DescriptorType::UniformTexelBuffer,
                1,
                Some("uniformTexels")
            ),
            (
                0,
                6,
                DescriptorType::StorageTexelBuffer,
                1,
                Some("storageTexels")
            ),
            (0, 7, DescriptorType::UniformBuffer, 1, Some("uniforms")),
            (0, 8, DescriptorType::StorageBuffer, 1, Some("storage")),
            (1, 0, DescriptorType::InputAttachment, 1, Some("attachment")),
            (
                1,
                1,
                DescriptorType::AccelerationStructure,
                1,
                Some("scene")
            ),
        ]
    );
    let blocks = blocks(&reflection);
    assert_eq!(
        blocks.get(7).copied().flatten().map(|(size, _)| size),
        Some(16)
    );
    assert_eq!(blocks.get(8).copied().flatten(), Some((16, Some(16))));
    assert!(blocks.iter().take(7).all(Option::is_none));
    Ok(())
}

#[test]
fn tensors() -> TestResult {
    let source = r"
        #version 460
        #extension GL_ARM_tensors : enable
        layout(local_size_x = 1) in;
        layout(set = 0, binding = 0) uniform tensorARM<int, 1> t[2];
        layout(set = 0, binding = 1) buffer Out { uint size; };
        void main() {
            size = tensorSizeARM(t[1], 0);
        }
    ";
    let reflection = reflect_rglsl(source, ShaderStage::Compute, VULKAN_1_3)?;
    assert_eq!(
        bindings(&reflection),
        [
            (0, 0, DescriptorType::Tensor, 2, Some("t")),
            (0, 1, DescriptorType::StorageBuffer, 1, Some("Out")),
        ]
    );
    Ok(())
}

#[test]
fn descriptor_heaps() -> TestResult {
    let source = r"
        #version 460
        #extension GL_EXT_descriptor_heap : require
        layout(descriptor_heap) uniform texture2D textures[];
        layout(descriptor_heap) uniform sampler samplers[];
        layout(location = 0) in vec2 uv;
        layout(location = 0) out vec4 color;
        void main() {
            color = texture(sampler2D(textures[2], samplers[1]), uv);
        }
    ";
    let reflection = reflect_rglsl(source, ShaderStage::Fragment, VULKAN_1_2)?;
    assert_eq!(
        reflection.descriptor_heaps,
        [DescriptorHeap::Resource, DescriptorHeap::Sampler]
    );
    assert!(reflection.descriptor_bindings.is_empty());
    Ok(())
}

#[test]
fn arrays_of_descriptors() -> TestResult {
    let source = r"
        #version 460
        #extension GL_EXT_nonuniform_qualifier : require
        layout(set = 2, binding = 0) uniform sampler2D single[4];
        layout(set = 2, binding = 2) uniform sampler2D unsized[];
        layout(set = 2, binding = 3) buffer Items { float value; } items[5];
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 color;
        void main() {
            color = texture(single[index], vec2(0.0))
                + texture(unsized[nonuniformEXT(index)], vec2(0.0))
                + vec4(items[index].value);
        }
    ";
    let reflection = cross_check("arrays", source, ShaderStage::Fragment, VULKAN_1_2)?;
    assert_eq!(
        bindings(&reflection),
        [
            (
                2,
                0,
                DescriptorType::CombinedImageSampler,
                4,
                Some("single")
            ),
            (
                2,
                2,
                DescriptorType::CombinedImageSampler,
                0,
                Some("unsized")
            ),
            (2, 3, DescriptorType::StorageBuffer, 5, Some("items")),
        ]
    );
    Ok(())
}

#[test]
fn arrays_of_arrays_of_descriptors_from_glslang() -> TestResult {
    let source = r"
        #version 460
        layout(set = 0, binding = 0) uniform sampler2D nested[2][3];
        layout(set = 0, binding = 1, std140) uniform Blocks { vec4 value; } blocks[4][2];
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 color;
        void main() {
            color = texture(nested[1][index], vec2(0.0)) + blocks[3][1].value;
        }
    ";
    let Some(reflection) =
        reflect_glslang("nested_arrays", source, ShaderStage::Fragment, VULKAN_1_0)?
    else {
        return Ok(());
    };
    assert_eq!(
        bindings(&reflection),
        [
            (
                0,
                0,
                DescriptorType::CombinedImageSampler,
                6,
                Some("nested")
            ),
            (0, 1, DescriptorType::UniformBuffer, 8, Some("blocks")),
        ]
    );
    Ok(())
}

#[test]
fn block_layouts() -> TestResult {
    let source = r"
        #version 460
        #extension GL_EXT_scalar_block_layout : require
        layout(set = 0, binding = 0, std140) uniform Std140 {
            float f;
            vec3 v;
            float array[3];
            mat3 m;
            layout(row_major) mat2x3 r;
        } std140Block;
        layout(set = 0, binding = 1, std430) buffer Std430 {
            float f;
            vec3 v;
            float array[3];
            vec2 tail[];
        } std430Block;
        layout(set = 0, binding = 2, scalar) buffer Scalar {
            vec3 a;
            float b;
        } scalarBlock;
        layout(local_size_x = 1) in;
        void main() {
            std430Block.tail[0] = vec2(std140Block.f + std140Block.v.x + std140Block.array[2]
                + std140Block.m[1].y + std140Block.r[1].z + std430Block.f + std430Block.v.z
                + std430Block.array[1]);
            scalarBlock.b = scalarBlock.a.y;
        }
    ";
    let reflection = cross_check("layouts", source, ShaderStage::Compute, VULKAN_1_2)?;
    assert_eq!(
        blocks(&reflection),
        [Some((176, None)), Some((40, Some(8))), Some((16, None))]
    );
    Ok(())
}

#[test]
fn nested_push_constants_with_offsets() -> TestResult {
    let source = r"
        #version 460
        #extension GL_EXT_buffer_reference : require
        layout(buffer_reference, std430) buffer Ref { float value; };
        struct Inner { vec2 a; float b[2]; };
        struct Outer { Inner inner[2]; mat2x3 m; };
        layout(push_constant) uniform Constants {
            layout(offset = 16) Inner inner;
            Ref pointer;
            layout(row_major) Outer outer;
        } constants;
        layout(location = 0) out vec4 color;
        void main() {
            color = vec4(constants.inner.a, constants.inner.b[1], constants.pointer.value)
                + vec4(constants.outer.inner[1].b[0] + constants.outer.m[1].z);
        }
    ";
    let reflection = cross_check("push_constants", source, ShaderStage::Fragment, VULKAN_1_2)?;
    let [block] = reflection.push_constants.as_slice() else {
        return Err("expected one push constant block".into());
    };
    assert_eq!((block.offset, block.size), (16, 80));
    Ok(())
}

#[test]
fn specialization_constants_and_local_size_id() -> TestResult {
    let source = r"
        #version 460
        #extension GL_EXT_shader_explicit_arithmetic_types_int16 : require
        layout(local_size_x_id = 3, local_size_y = 4) in;
        layout(constant_id = 0) const int count = -2;
        layout(constant_id = 1) const bool enabled = true;
        layout(constant_id = 2) const float scale = 1.5;
        layout(constant_id = 4) const uint mask = 7u;
        layout(constant_id = 5) const double highPrecision = 2.25;
        layout(constant_id = 6) const int16_t small = int16_t(-3);
        layout(set = 0, binding = 0) buffer Out { double values[]; };
        void main() {
            values[gl_LocalInvocationIndex] = enabled
                ? double(count) * double(scale) + double(mask) + highPrecision + double(small)
                : 0.0lf;
        }
    ";
    let reflection = cross_check("specialization", source, ShaderStage::Compute, VULKAN_1_2)?;
    assert_eq!(
        reflection.local_size,
        Some([
            WorkgroupDimension::Specialization { id: 3, default: 1 },
            WorkgroupDimension::Fixed(4),
            WorkgroupDimension::Fixed(1),
        ])
    );
    let constants: Vec<(u32, Option<&str>, ScalarType, ScalarValue)> = reflection
        .specialization_constants
        .iter()
        .map(|constant| {
            (
                constant.spec_id,
                constant.name.as_deref(),
                constant.scalar,
                constant.default,
            )
        })
        .collect();
    assert_eq!(
        constants,
        [
            (
                0,
                Some("count"),
                scalar(ScalarKind::Int, 32),
                ScalarValue::Int(-2)
            ),
            (
                1,
                Some("enabled"),
                scalar(ScalarKind::Bool, 32),
                ScalarValue::Bool(true)
            ),
            (
                2,
                Some("scale"),
                FLOAT,
                ScalarValue::FloatBits(u64::from(1.5_f32.to_bits()))
            ),
            (3, None, scalar(ScalarKind::Uint, 32), ScalarValue::Uint(1)),
            (
                4,
                Some("mask"),
                scalar(ScalarKind::Uint, 32),
                ScalarValue::Uint(7)
            ),
            (
                5,
                Some("highPrecision"),
                scalar(ScalarKind::Float, 64),
                ScalarValue::FloatBits(2.25_f64.to_bits())
            ),
            (
                6,
                Some("small"),
                scalar(ScalarKind::Int, 16),
                ScalarValue::Int(-3)
            ),
        ]
    );
    let small = reflection
        .specialization_constants
        .last()
        .ok_or("no constants")?;
    assert_eq!(small.default.bits(small.scalar.width), 0xfffd);
    let json = reflection.to_json();
    assert!(json.contains("\"default\": 1.5"), "{json}");
    assert!(json.contains("\"spec_id\": 3"), "{json}");
    Ok(())
}

#[test]
fn vertex_inputs_with_components_and_output_blocks() -> TestResult {
    let source = r"
        #version 460
        layout(location = 0) in vec3 position;
        layout(location = 0, component = 3) in float weight;
        layout(location = 1) in dvec4 wide;
        layout(location = 3) in mat2 transform;
        layout(location = 5) in ivec2 pairs[2];
        layout(location = 0) out Block {
            vec4 a;
            layout(location = 3) vec2 b;
            float c;
        } block;
        void main() {
            block.a = vec4(position, weight) + vec4(wide) + vec4(transform[1], pairs[1]);
            block.b = vec2(1.0);
            block.c = 2.0;
            gl_Position = block.a;
        }
    ";
    let reflection = cross_check("vertex", source, ShaderStage::Vertex, VULKAN_1_0)?;
    assert_eq!(
        interface(&reflection.inputs),
        [
            (0, 0, Some("position"), format(FLOAT, 3, 1, &[])),
            (0, 3, Some("weight"), format(FLOAT, 1, 1, &[])),
            (
                1,
                0,
                Some("wide"),
                format(scalar(ScalarKind::Float, 64), 4, 1, &[])
            ),
            (3, 0, Some("transform"), format(FLOAT, 2, 2, &[])),
            (
                5,
                0,
                Some("pairs"),
                format(scalar(ScalarKind::Int, 32), 2, 1, &[2])
            ),
        ]
    );
    assert_eq!(
        interface(&reflection.outputs),
        [
            (0, 0, Some("block.a"), format(FLOAT, 4, 1, &[])),
            (3, 0, Some("block.b"), format(FLOAT, 2, 1, &[])),
            (4, 0, Some("block.c"), format(FLOAT, 1, 1, &[])),
        ]
    );
    Ok(())
}

#[test]
fn fragment_outputs_with_components() -> TestResult {
    let source = r"
        #version 460
        layout(location = 0) in Block { vec4 a; layout(location = 3) vec2 b; float c; } block;
        layout(location = 0) out vec2 low;
        layout(location = 0, component = 2) out vec2 high;
        layout(location = 1) out uvec4 bits;
        void main() {
            low = block.a.xy;
            high = block.b + vec2(block.c);
            bits = uvec4(1u);
        }
    ";
    let reflection = cross_check("fragment", source, ShaderStage::Fragment, VULKAN_1_0)?;
    assert_eq!(
        interface(&reflection.outputs),
        [
            (0, 0, Some("low"), format(FLOAT, 2, 1, &[])),
            (0, 2, Some("high"), format(FLOAT, 2, 1, &[])),
            (
                1,
                0,
                Some("bits"),
                format(scalar(ScalarKind::Uint, 32), 4, 1, &[])
            ),
        ]
    );
    Ok(())
}

#[test]
fn tessellation_control_per_vertex_arrays() -> TestResult {
    let source = r"
        #version 460
        layout(vertices = 3) out;
        layout(location = 0) in vec4 color[];
        layout(location = 0) out vec4 forwarded[];
        layout(location = 1) patch out vec4 patchColor;
        void main() {
            forwarded[gl_InvocationID] = color[gl_InvocationID];
            patchColor = color[0];
            gl_TessLevelOuter[0] = 1.0;
        }
    ";
    let reflection = cross_check("tessellation", source, ShaderStage::TessControl, VULKAN_1_0)?;
    assert_eq!(
        interface(&reflection.inputs),
        [(0, 0, Some("color"), format(FLOAT, 4, 1, &[32]))]
    );
    assert_eq!(
        interface(&reflection.outputs),
        [
            (0, 0, Some("forwarded"), format(FLOAT, 4, 1, &[3])),
            (1, 0, Some("patchColor"), format(FLOAT, 4, 1, &[])),
        ]
    );
    Ok(())
}

const VERTEX: &str = r"
    #version 460
    layout(set = 0, binding = 0) uniform Camera { mat4 viewProjection; } camera;
    layout(push_constant) uniform Model { mat4 model; } model;
    layout(location = 0) in vec3 position;
    void main() {
        gl_Position = camera.viewProjection * model.model * vec4(position, 1.0);
    }
";

const FRAGMENT: &str = r"
    #version 460
    layout(set = 0, binding = 0) uniform Camera { mat4 viewProjection; } camera;
    layout(set = 0, binding = 1) uniform sampler2D albedo;
    layout(push_constant) uniform Material { layout(offset = 64) vec4 tint; } material;
    layout(location = 0) out vec4 color;
    void main() {
        color = texture(albedo, vec2(0.5)) * material.tint + camera.viewProjection[0];
    }
";

#[test]
fn stages_merge_into_a_pipeline_layout() -> TestResult {
    let program = compile_and_link(
        &[
            (VERTEX, options(ShaderStage::Vertex, VULKAN_1_0)),
            (FRAGMENT, options(ShaderStage::Fragment, VULKAN_1_0)),
        ],
        &program_options(VULKAN_1_0),
    )?;
    let reflections = program.spirv_reflections()?;
    let layout = PipelineLayout::new(&reflections)?;
    let [set] = layout.sets.as_slice() else {
        return Err("expected one descriptor set".into());
    };
    assert_eq!(set.set, 0);
    let merged: Vec<(u32, DescriptorType, u32, ShaderStageMask)> = set
        .bindings
        .iter()
        .map(|binding| {
            (
                binding.binding,
                binding.descriptor_type,
                binding.count,
                binding.stages,
            )
        })
        .collect();
    assert_eq!(
        merged,
        [
            (
                0,
                DescriptorType::UniformBuffer,
                1,
                ShaderStageMask::VERTEX | ShaderStageMask::FRAGMENT
            ),
            (
                1,
                DescriptorType::CombinedImageSampler,
                1,
                ShaderStageMask::FRAGMENT
            ),
        ]
    );
    assert_eq!(
        set.bindings
            .first()
            .map(|binding| vulkan_stage_flags(binding.stages)),
        Some(0x11)
    );
    let ranges: Vec<(u32, u32, u32)> = layout
        .push_constant_ranges
        .iter()
        .map(|range| (vulkan_stage_flags(range.stages), range.offset, range.size))
        .collect();
    assert_eq!(ranges, [(0x1, 0, 64), (0x10, 64, 16)]);
    let json = spirv_reflection::program_json(&reflections)?;
    assert!(json.contains("\"pipeline_layout\""), "{json}");
    assert!(json.contains("\"vert\",\n"), "{json}");
    Ok(())
}

#[test]
fn conflicting_bindings_are_an_error() -> TestResult {
    let vertex = reflect_rglsl(VERTEX, ShaderStage::Vertex, VULKAN_1_0)?;
    let fragment = reflect_rglsl(
        r"
        #version 460
        layout(set = 0, binding = 0) uniform sampler2D albedo;
        layout(location = 0) out vec4 color;
        void main() { color = texture(albedo, vec2(0.5)); }
        ",
        ShaderStage::Fragment,
        VULKAN_1_0,
    )?;
    let Err(error) = PipelineLayout::new([&vertex, &fragment]) else {
        return Err("conflicting bindings were merged".into());
    };
    assert_eq!((error.set, error.binding), (0, 0));
    assert_eq!(
        use_of(error.first),
        (ShaderStage::Vertex, DescriptorType::UniformBuffer, 1)
    );
    assert_eq!(
        use_of(error.second),
        (
            ShaderStage::Fragment,
            DescriptorType::CombinedImageSampler,
            1
        )
    );
    assert_eq!(
        error.to_string(),
        "set 0 binding 0 is uniform_buffer x1 in the vertex stage but combined_image_sampler x1 in the fragment stage"
    );
    assert!(spirv_reflection::program_json([&vertex, &fragment]).is_err());
    Ok(())
}

#[test]
fn mesh_shader_outputs_and_local_size() -> TestResult {
    let source = r"
        #version 460
        #extension GL_EXT_mesh_shader : require
        layout(local_size_x = 32) in;
        layout(triangles, max_vertices = 3, max_primitives = 1) out;
        layout(location = 0) out vec4 colors[];
        layout(location = 1) perprimitiveEXT out flat uint ids[];
        void main() {
            SetMeshOutputsEXT(3, 1);
            colors[gl_LocalInvocationIndex % 3] = vec4(1.0);
            ids[0] = 7u;
            gl_PrimitiveTriangleIndicesEXT[0] = uvec3(0, 1, 2);
        }
    ";
    let reflection = cross_check("mesh", source, ShaderStage::Mesh, VULKAN_1_2)?;
    assert_eq!(
        reflection.local_size,
        Some([
            WorkgroupDimension::Fixed(32),
            WorkgroupDimension::Fixed(1),
            WorkgroupDimension::Fixed(1),
        ])
    );
    assert_eq!(
        interface(&reflection.outputs),
        [
            (0, 0, Some("colors"), format(FLOAT, 4, 1, &[3])),
            (
                1,
                0,
                Some("ids"),
                format(scalar(ScalarKind::Uint, 32), 1, 1, &[1])
            ),
        ]
    );
    Ok(())
}

#[test]
fn only_optimization_removes_unused_resources() -> TestResult {
    let source = r"
        #version 460
        layout(set = 0, binding = 0) uniform sampler2D unusedSampler;
        layout(set = 0, binding = 1) uniform Unused { vec4 value; } unusedBlock;
        layout(push_constant) uniform UnusedConstants { vec4 value; } unusedConstants;
        layout(location = 3) in vec4 unusedInput;
        layout(location = 0) out vec4 color;
        void main() { color = vec4(1.0); }
    ";
    let reflection = cross_check("unused", source, ShaderStage::Fragment, VULKAN_1_0)?;
    assert_eq!(reflection.descriptor_bindings.len(), 2);
    assert_eq!(reflection.push_constants.len(), 1);
    assert_eq!(reflection.inputs.len(), 1);
    let optimized = compile_and_link(
        &[(source, options(ShaderStage::Fragment, VULKAN_1_0))],
        &ProgramOptions {
            optimize: OptOptions {
                level: OptLevel::Performance,
                ..OptOptions::default()
            },
            ..program_options(VULKAN_1_0)
        },
    )?;
    let reflection = optimized
        .stage(ShaderStage::Fragment)
        .ok_or("missing stage")?
        .spirv_reflection()?;
    assert!(reflection.descriptor_bindings.is_empty());
    assert!(reflection.push_constants.is_empty());
    assert!(reflection.inputs.is_empty());
    assert_eq!(reflection.outputs.len(), 1);
    Ok(())
}
