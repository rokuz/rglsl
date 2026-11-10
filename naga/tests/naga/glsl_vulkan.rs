//! Vulkan GLSL → SPIR-V regression tests.
//!
//! Each test pins down one behaviour where the compiler used to produce wrong
//! code without reporting an error (or crashed). The expected behaviour is
//! glslang's; see `docs/parity/README.md`.

#![cfg(all(feature = "glsl-in", feature = "spv-out"))]

use naga::{
    back::spv,
    front::glsl,
    valid::{Capabilities, ValidationFlags, Validator},
    ShaderStage,
};
use rspirv::dr::{self, Operand};
use spirv::{Decoration, Op};

/// Parses and validates `source`, or returns the first error as text.
fn parse(stage: ShaderStage, source: &str) -> Result<naga::Module, String> {
    let module = glsl::Frontend::default()
        .parse(&glsl::Options::from(stage), source)
        .map_err(|errors| {
            errors
                .errors
                .first()
                .map_or_else(String::new, |e| e.kind.to_string())
        })?;
    Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .map_err(|e| format!("{:?}", e.into_inner()))?;
    Ok(module)
}

/// Compiles `source` to SPIR-V with the options the conformance runner uses.
fn compile(stage: ShaderStage, source: &str) -> dr::Module {
    let module = parse(stage, source).unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .expect("validated in parse");
    let options = spv::Options {
        flags: spv::WriterFlags::DEBUG | spv::WriterFlags::LABEL_VARYINGS,
        force_loop_bounding: false,
        zero_initialize_workgroup_memory: spv::ZeroInitializeWorkgroupMemoryMode::None,
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None).expect("SPIR-V backend failed");
    dr::load_words(words).expect("produced SPIR-V does not parse")
}

fn instructions(module: &dr::Module, op: Op) -> Vec<&dr::Instruction> {
    module
        .all_inst_iter()
        .filter(|inst| inst.class.opcode == op)
        .collect()
}

/// The value of the 32-bit `OpConstant` that `operand` refers to.
fn constant(module: &dr::Module, operand: &Operand) -> u32 {
    let id = match *operand {
        Operand::IdRef(id) | Operand::IdScope(id) | Operand::IdMemorySemantics(id) => id,
        ref other => panic!("operand {other:?} is not an id"),
    };
    let inst = module
        .types_global_values
        .iter()
        .find(|inst| inst.result_id == Some(id) && inst.class.opcode == Op::Constant)
        .expect("operand is not an OpConstant");
    match inst.operands[0] {
        Operand::LiteralBit32(value) => value,
        ref other => panic!("unexpected constant operand {other:?}"),
    }
}

/// The debug names of the variables decorated with `decoration`.
fn decorated(module: &dr::Module, decoration: Decoration) -> Vec<String> {
    module
        .annotations
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::Decorate && inst.operands[1] == Operand::Decoration(decoration)
        })
        .map(|inst| name_of(module, inst.operands[0].unwrap_id_ref()))
        .collect()
}

fn name_of(module: &dr::Module, id: u32) -> String {
    module
        .debug_names
        .iter()
        .find(|inst| inst.class.opcode == Op::Name && inst.operands[0] == Operand::IdRef(id))
        .map(|inst| inst.operands[1].unwrap_literal_string().to_string())
        .unwrap_or_default()
}

/// `barrier()` synchronizes the work group, not the subgroup.
#[test]
fn barrier_is_a_workgroup_barrier() {
    let module = compile(
        ShaderStage::Compute,
        "#version 450
        layout(local_size_x = 64) in;
        layout(std430, binding = 0) buffer B { float d[]; };
        shared float s;
        void main() { s = 1.0; barrier(); d[0] = s; }",
    );
    let barriers = instructions(&module, Op::ControlBarrier);
    assert_eq!(barriers.len(), 1);
    let [execution, memory, semantics] = barriers[0].operands.as_slice() else {
        panic!("OpControlBarrier takes three operands");
    };
    assert_eq!(constant(&module, execution), spirv::Scope::Workgroup as u32);
    assert_eq!(constant(&module, memory), spirv::Scope::Workgroup as u32);
    assert_eq!(
        constant(&module, semantics),
        (spirv::MemorySemantics::ACQUIRE_RELEASE | spirv::MemorySemantics::WORKGROUP_MEMORY).bits()
    );
}

/// `gl_VertexIndex` and the other index built-ins are `int`, so arithmetic on
/// them is signed.
#[test]
fn index_builtins_are_signed() {
    let module = compile(
        ShaderStage::Vertex,
        "#version 460
        layout(location = 0) out float o;
        void main() {
            int sum = gl_VertexIndex + gl_InstanceIndex + gl_BaseVertex + gl_BaseInstance + gl_DrawID;
            o = float(gl_VertexIndex - 10) + float(sum);
            gl_Position = vec4(0.0);
        }",
    );
    assert!(!instructions(&module, Op::ConvertSToF).is_empty());
    assert!(instructions(&module, Op::ConvertUToF).is_empty());

    compile(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) out vec4 o;
        void main() { int i = gl_PrimitiveID + gl_SampleID; o = vec4(i); }",
    );

    // `gl_LocalInvocationIndex` is the one unsigned index.
    compile(
        ShaderStage::Compute,
        "#version 450
        layout(local_size_x = 1) in;
        layout(std430, binding = 0) buffer B { uint d[]; };
        void main() { uint i = gl_LocalInvocationIndex; d[0] = i; }",
    );
}

/// `sample` and `centroid` are kept when no interpolation qualifier is given.
#[test]
fn auxiliary_qualifiers_without_interpolation() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) sample in vec4 a;
        layout(location = 1) centroid in vec4 b;
        layout(location = 2) in vec4 c;
        layout(location = 0) out vec4 o;
        void main() { o = a + b + c; }",
    );
    assert_eq!(decorated(&module, Decoration::Sample), ["a"]);
    assert_eq!(decorated(&module, Decoration::Centroid), ["b"]);
}

/// `out` and `inout` arguments are copied in and out, so two parameters never
/// alias and any l-value can be passed.
#[test]
fn out_arguments_are_copied() {
    let source = "#version 450
        layout(location = 0) out vec4 o;
        struct S { float m; vec3 v; };
        void set(out float x) { x = 1.0; }
        void add(inout float a, inout float b) { a += 1.0; b += 2.0; }
        void setv(out vec2 x) { x = vec2(3.0); }
        void conv(out int i) { i = 7; }
        void main() {
            float arr[4]; S s; vec4 v = vec4(0.0); float x = 0.0; float f;
            set(arr[2]); set(s.m); set(v.y); set(s.v.z);
            setv(v.zw); setv(v.xz);
            add(x, x);
            conv(f);
            o = vec4(arr[2] + s.m + s.v.z + f, v.yzw) + vec4(x);
        }";
    // Array elements, struct members and vector components used to make the
    // SPIR-V backend panic.
    compile(ShaderStage::Fragment, source);

    // In `add(x, x)` each parameter gets its own temporary.
    let module = parse(ShaderStage::Fragment, source).unwrap();
    let (add, _) = module
        .functions
        .iter()
        .find(|(_, f)| f.name.as_deref() == Some("add"))
        .unwrap();
    let main = &module.entry_points[0].function;
    let user_main = module
        .functions
        .iter()
        .find(|(_, f)| f.name.as_deref() == Some("main"))
        .map_or(main, |(_, f)| f);
    let arguments = user_main
        .body
        .iter()
        .find_map(|statement| match *statement {
            naga::Statement::Call {
                function,
                ref arguments,
                ..
            } if function == add => Some(arguments),
            _ => None,
        })
        .expect("main calls add");
    let locals: Vec<_> = arguments
        .iter()
        .map(|&argument| match user_main.expressions[argument] {
            naga::Expression::LocalVariable(local) => local,
            ref other => panic!("argument is not a local variable: {other:?}"),
        })
        .collect();
    assert_eq!(locals.len(), 2);
    assert_ne!(locals[0], locals[1]);
}

/// `outerProduct(c, r)` has one row per component of `c` and one column per
/// component of `r`.
#[test]
fn outer_product_shape() {
    compile(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) in vec3 c;
        layout(location = 1) in vec2 r;
        layout(location = 0) out vec4 o;
        void main() {
            mat2x3 m = outerProduct(c, r);
            mat3x2 n = outerProduct(r, c);
            o = vec4(m[1], n[2].x);
        }",
    );
    assert!(parse(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) in vec3 c;
        layout(location = 1) in vec2 r;
        void main() { mat3x2 m = outerProduct(c, r); }",
    )
    .is_err());
}

/// An array specifier applies to its own declarator only.
#[test]
fn array_specifier_does_not_leak_to_next_declarator() {
    compile(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) out vec4 o;
        void main() {
            float a, b[2], c;
            c = 1.0; b[1] = 2.0; a = c;
            o = vec4(a + b[1]);
        }",
    );
}

/// `#pragma STDGL invariant(all)` and `invariant` declarations take effect
/// or are rejected; they are never dropped.
#[test]
fn invariant_is_applied_or_rejected() {
    for source in [
        "#version 450
        #pragma STDGL invariant(all)
        void main() { gl_Position = vec4(1.0); }",
        // The pragma also applies to a built-in that was already used.
        "#version 450
        void f() { gl_Position = vec4(1.0); }
        #pragma STDGL invariant(all)
        void main() { f(); }",
        "#version 450
        invariant gl_Position;
        void main() { gl_Position = vec4(1.0); }",
    ] {
        let module = compile(ShaderStage::Vertex, source);
        assert_eq!(decorated(&module, Decoration::Invariant), ["gl_Position"]);
    }

    // Unknown pragmas are ignored.
    let module = compile(
        ShaderStage::Vertex,
        "#version 450
        #pragma optimize(off)
        #pragma something else
        void main() { gl_Position = vec4(1.0); }",
    );
    assert!(decorated(&module, Decoration::Invariant).is_empty());

    // The IR cannot express invariant user outputs yet.
    for source in [
        "#version 450
        #pragma STDGL invariant(all)
        layout(location = 0) out vec4 v;
        void main() { v = vec4(1.0); gl_Position = vec4(1.0); }",
        "#version 450
        layout(location = 0) out vec4 v;
        invariant v;
        void main() { v = vec4(1.0); gl_Position = vec4(1.0); }",
    ] {
        let error = parse(ShaderStage::Vertex, source).unwrap_err();
        assert!(error.contains("invariant"), "{error}");
    }
}

/// Redeclaring a built-in must not create a user variable with a location.
#[test]
fn gl_names_are_reserved() {
    for (stage, source) in [
        (
            ShaderStage::Vertex,
            "#version 450
            out float gl_ClipDistance[4];
            void main() { gl_ClipDistance[0] = 1.0; gl_Position = vec4(1.0); }",
        ),
        (
            ShaderStage::Fragment,
            "#version 450
            #extension GL_ARB_shader_stencil_export : enable
            out int gl_FragStencilRefARB;
            void main() { gl_FragStencilRefARB = 1; }",
        ),
        (
            ShaderStage::Fragment,
            "#version 450
            void main() { float gl_foo = 1.0; }",
        ),
    ] {
        let error = parse(stage, source).unwrap_err();
        assert!(error.contains("reserved"), "{error}");
    }
}

/// Shadow samplers honour the LOD, gradients and bias they are given.
#[test]
fn shadow_sampling_keeps_lod_gradients_and_bias() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        layout(set = 0, binding = 0) uniform texture2D t;
        layout(set = 0, binding = 1) uniform samplerShadow s;
        layout(location = 0) in vec3 c;
        layout(location = 0) out vec4 o;
        void main() {
            float a = textureLod(sampler2DShadow(t, s), c, 2.0);
            float b = textureGrad(sampler2DShadow(t, s), c, vec2(0.1), vec2(0.2));
            float d = texture(sampler2DShadow(t, s), c, 1.5);
            float e = textureLodOffset(sampler2DShadow(t, s), c, 1.0, ivec2(1));
            o = vec4(a, b, d, e);
        }",
    );
    let image_operands = |inst: &dr::Instruction| {
        inst.operands
            .iter()
            .find_map(|operand| match *operand {
                Operand::ImageOperands(mask) => Some(mask),
                _ => None,
            })
            .expect("sample has image operands")
    };

    let explicit: Vec<_> = instructions(&module, Op::ImageSampleDrefExplicitLod)
        .into_iter()
        .map(image_operands)
        .collect();
    assert_eq!(
        explicit,
        [
            spirv::ImageOperands::LOD,
            spirv::ImageOperands::GRAD,
            spirv::ImageOperands::LOD | spirv::ImageOperands::CONST_OFFSET,
        ]
    );
    // The LOD of the first sample is the 2.0 from the source, not zero.
    let lod = instructions(&module, Op::ImageSampleDrefExplicitLod)[0]
        .operands
        .last()
        .unwrap();
    assert_eq!(constant(&module, lod), 2.0f32.to_bits());

    let implicit: Vec<_> = instructions(&module, Op::ImageSampleDrefImplicitLod)
        .into_iter()
        .map(image_operands)
        .collect();
    assert_eq!(implicit, [spirv::ImageOperands::BIAS]);
}
