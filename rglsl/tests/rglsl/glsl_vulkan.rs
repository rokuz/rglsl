//! Vulkan GLSL → SPIR-V regression tests.
//!
//! Each test pins down one behaviour where the compiler used to produce wrong
//! code without reporting an error (or crashed). The expected behaviour is
//! glslang's; see `docs/parity/README.md`.

#![cfg(all(feature = "glsl-in", feature = "spv-out"))]

use rglsl::{
    back::spv,
    front::glsl,
    valid::{Capabilities, ValidationFlags, Validator},
    ShaderStage,
};
use rspirv::dr::{self, Operand};
use spirv::{Decoration, Op};

/// Parses and validates `source`, or returns the first error as text.
fn parse(stage: ShaderStage, source: &str) -> Result<rglsl::Module, String> {
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
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
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
        .filter_map(|inst| match inst.class.opcode {
            Op::Decorate if inst.operands[1] == Operand::Decoration(decoration) => {
                Some(name_of(module, inst.operands[0].unwrap_id_ref()))
            }
            Op::MemberDecorate if inst.operands[2] == Operand::Decoration(decoration) => {
                let Operand::LiteralBit32(member) = inst.operands[1] else {
                    return None;
                };
                Some(member_name_of(
                    module,
                    inst.operands[0].unwrap_id_ref(),
                    member,
                ))
            }
            _ => None,
        })
        .collect()
}

fn member_name_of(module: &dr::Module, id: u32, member: u32) -> String {
    module
        .debug_names
        .iter()
        .find(|inst| {
            inst.class.opcode == Op::MemberName
                && inst.operands[0] == Operand::IdRef(id)
                && inst.operands[1] == Operand::LiteralBit32(member)
        })
        .map(|inst| inst.operands[2].unwrap_literal_string().to_string())
        .unwrap_or_default()
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
            rglsl::Statement::Call {
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
            rglsl::Expression::LocalVariable(local) => local,
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

    // User-defined outputs, whether the pragma comes before or after them.
    for source in [
        "#version 450
        #pragma STDGL invariant(all)
        layout(location = 0) out vec4 v;
        void main() { v = vec4(1.0); gl_Position = vec4(1.0); }",
        "#version 450
        layout(location = 0) out vec4 v;
        #pragma STDGL invariant(all)
        void main() { v = vec4(1.0); gl_Position = vec4(1.0); }",
        "#version 450
        layout(location = 0) out vec4 v;
        invariant v;
        invariant gl_Position;
        void main() { v = vec4(1.0); gl_Position = vec4(1.0); }",
        "#version 450
        layout(location = 0) invariant out vec4 v;
        invariant gl_Position;
        void main() { v = vec4(1.0); gl_Position = vec4(1.0); }",
    ] {
        let module = compile(ShaderStage::Vertex, source);
        let mut invariant = decorated(&module, Decoration::Invariant);
        invariant.sort_unstable();
        assert_eq!(invariant, ["gl_Position", "v"]);
    }

    // Only outputs can be invariant.
    let error = parse(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) invariant in vec4 v;
        void main() {}",
    )
    .unwrap_err();
    assert!(error.contains("invariant"), "{error}");
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
        if source.contains("gl_ClipDistance[4]") {
            let module = compile(stage, source);
            assert_eq!(
                decorated(&module, Decoration::BuiltIn),
                [
                    "gl_Position",
                    "gl_PointSize",
                    "gl_ClipDistance",
                    "gl_CullDistance"
                ]
            );
            assert!(module.types_global_values.iter().any(|inst| {
                inst.class.opcode == Op::TypeArray && constant(&module, &inst.operands[1]) == 4
            }));
            continue;
        }
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

/// Automatic bindings follow glslang's `--auto-map-bindings`: resources the
/// shader uses get the lowest free binding of their set, the ones with an
/// explicit `set` first; unused resources get binding 0.
#[test]
fn automatic_bindings_match_glslang() {
    let source = "#version 450
        layout(binding = 1) uniform texture2D explicit1;
        uniform texture2D unusedTex;
        uniform U0 { vec4 a; } u0;
        layout(set = 1) uniform U1 { vec4 a; } u1;
        layout(set = 1, binding = 0) uniform texture2D t10;
        buffer B { vec4 d[]; } b;
        uniform U2 { vec4 a; } u2unused;
        uniform sampler samp;
        layout(binding = 3) uniform texture2D t3;
        layout(set = 0) uniform USet { vec4 a; } uset;
        uniform UL { vec4 a; } late;
        layout(location = 0) in vec4 i0;
        layout(location = 0) out vec4 o0;
        vec4 helper() { return late.a; }
        void main() {
            o0 = texture(sampler2D(explicit1, samp), i0.xy) + u0.a + u1.a
                + texture(sampler2D(t10, samp), i0.xy) + b.d[0] + helper()
                + texture(sampler2D(t3, samp), i0.zw) + uset.a;
        }";
    let options = glsl::Options {
        auto_map_bindings: true,
        ..glsl::Options::from(ShaderStage::Fragment)
    };
    let module = glsl::Frontend::default().parse(&options, source).unwrap();
    Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .unwrap();

    let mut bindings: Vec<(&str, u32, u32)> = module
        .global_variables
        .iter()
        .filter_map(|(_, global)| {
            let binding = global.binding.as_ref()?;
            Some((global.name.as_deref()?, binding.group, binding.binding))
        })
        .collect();
    bindings.sort_unstable();
    // What `glslang -V --auto-map-bindings` assigns to this shader.
    assert_eq!(
        bindings,
        [
            ("b", 0, 4),
            ("explicit1", 0, 1),
            ("late", 0, 6),
            ("samp", 0, 5),
            ("t10", 1, 0),
            ("t3", 0, 3),
            ("u0", 0, 2),
            ("u1", 1, 1),
            ("u2unused", 0, 0),
            ("unusedTex", 0, 0),
            ("uset", 0, 0),
        ]
    );

    // Without the option a missing binding is an error, as in glslang.
    let error = parse(ShaderStage::Fragment, source).unwrap_err();
    assert!(error.contains("binding"), "{error}");
}

#[test]
fn automatic_locations_skip_explicit_ones() {
    let source = "#version 450
        in vec4 i0;
        in mat3 i1;
        layout(location = 1) in vec4 iexp;
        in vec4 i2unused;
        in vec3 i3[2];
        in vec2 i5;
        out vec4 o0;
        layout(location = 0) out vec4 oexp;
        out vec4 o1;
        void main() {
            o0 = i0 + vec4(i1[0], 0.0) + iexp + vec4(i3[1], 0.0) + vec4(i5, 0.0, 0.0);
            oexp = o0;
            o1 = o0;
        }";
    let options = glsl::Options {
        auto_map_locations: true,
        ..glsl::Options::from(ShaderStage::Fragment)
    };
    let module = glsl::Frontend::default().parse(&options, source).unwrap();
    Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .unwrap();

    let locations = |space| -> Vec<(&str, u32)> {
        let mut locations: Vec<_> = module.entry_points[0]
            .interface
            .iter()
            .map(|&handle| &module.global_variables[handle])
            .filter(|global| global.space == space)
            .map(|global| match global.io {
                Some(rglsl::Binding::Location { location, .. }) => {
                    (global.name.as_deref().unwrap(), location)
                }
                ref other => panic!("not a location: {other:?}"),
            })
            .collect();
        locations.sort_unstable();
        locations
    };
    assert_eq!(
        locations(rglsl::AddressSpace::Input),
        [
            ("i0", 0),
            ("i1", 2),
            ("i2unused", 5),
            ("i3", 6),
            ("i5", 8),
            ("iexp", 1),
        ]
    );
    assert_eq!(
        locations(rglsl::AddressSpace::Output),
        [("o0", 1), ("o1", 2), ("oexp", 0)]
    );

    // Without the option a missing location is an error, as in glslang.
    let error = parse(ShaderStage::Fragment, source).unwrap_err();
    assert!(error.contains("location"), "{error}");
}

/// Vulkan has no default uniform block: only opaque types and blocks can be
/// `uniform`.
#[test]
fn loose_uniforms_are_rejected() {
    let error = parse(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform vec4 color;
        layout(location = 0) out vec4 o;
        void main() { o = color; }",
    )
    .unwrap_err();
    assert!(error.contains("outside a block"), "{error}");

    // An array of an opaque type is still opaque. (Not validated: the frontend
    // does not turn such arrays into binding arrays yet.)
    glsl::Frontend::default()
        .parse(
            &glsl::Options::from(ShaderStage::Fragment),
            "#version 450
            layout(binding = 0) uniform texture2D textures[8];
            void main() {}",
        )
        .unwrap();

    compile(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform Block { vec4 color; };
        layout(binding = 1) uniform sampler s;
        layout(binding = 2) uniform texture2D t;
        layout(location = 0) out vec4 o;
        void main() { o = color + texture(sampler2D(t, s), vec2(0.0)); }",
    );
}

/// Integers and doubles must be `flat` only where they enter the fragment
/// stage; vertex outputs need no qualifier.
#[test]
fn flat_is_required_on_fragment_inputs_only() {
    let module = compile(
        ShaderStage::Vertex,
        "#version 450
        layout(location = 0) out int a;
        layout(location = 1) out uvec2 b;
        layout(location = 2) flat out int c;
        void main() { a = 1; b = uvec2(2); c = 3; gl_Position = vec4(0.0); }",
    );
    assert_eq!(decorated(&module, Decoration::Flat), ["c"]);

    compile(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) flat in int a;
        layout(location = 0) out vec4 o;
        void main() { o = vec4(a); }",
    );
    for ty in ["int", "uvec3", "double"] {
        let error = parse(
            ShaderStage::Fragment,
            &format!(
                "#version 450
                layout(location = 0) in {ty} a;
                layout(location = 0) out vec4 o;
                void main() {{ o = vec4(1.0); }}"
            ),
        )
        .unwrap_err();
        assert!(error.contains("must be `flat`"), "{error}");
    }
}

/// `writeonly` buffer blocks are valid and are marked `NonReadable`.
#[test]
fn write_only_buffer_blocks() {
    let module = compile(
        ShaderStage::Compute,
        "#version 450
        layout(local_size_x = 1) in;
        layout(std430, binding = 0) writeonly buffer B { float d[]; } b;
        void main() { b.d[0] = 1.0; }",
    );
    assert_eq!(decorated(&module, Decoration::NonReadable), ["b"]);
}

/// Integer textures can be sampled, not only fetched.
#[test]
fn integer_textures_can_be_sampled() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform itexture2D t;
        layout(binding = 1) uniform utexture2D u;
        layout(binding = 2) uniform sampler s;
        layout(location = 0) in vec2 c;
        layout(location = 0) out vec4 o;
        void main() {
            ivec4 a = texture(isampler2D(t, s), c);
            uvec4 b = textureLod(usampler2D(u, s), c, 0.0);
            o = vec4(a) + vec4(b);
        }",
    );
    assert_eq!(instructions(&module, Op::ImageSampleImplicitLod).len(), 1);
    assert_eq!(instructions(&module, Op::ImageSampleExplicitLod).len(), 1);
}

/// The members of the block struct named `name`: (offset, matrix stride and
/// majorness if the member is a matrix).
fn block_layout(module: &rglsl::Module, name: &str) -> Vec<(u32, Option<(u32, bool)>)> {
    let (_, ty) = module
        .types
        .iter()
        .rfind(|(_, ty)| ty.name.as_deref() == Some(name))
        .unwrap_or_else(|| panic!("no type named {name}"));
    let rglsl::TypeInner::Struct { ref members, .. } = ty.inner else {
        panic!("{name} is not a struct");
    };
    members
        .iter()
        .map(|member| {
            (
                member.offset,
                member
                    .matrix_layout
                    .map(|layout| (layout.stride, layout.row_major)),
            )
        })
        .collect()
}

/// std140, std430 and row_major layouts are computed as glslang computes
/// them, including two-row matrices and nested structures.
#[test]
fn block_layouts_match_glslang() {
    let source = "#version 450
        struct Inner { float f; vec3 v; mat2 m2; };
        struct Small { float a; };
        layout(std140, binding = 0) uniform U {
            float a; mat2 m2; mat3 m3; mat4x2 m42; mat2x3 m23; Inner inner; Small small;
            float after; mat2 arr[3]; vec3 v3; float tail; dmat3 dm;
        } u;
        layout(std430, binding = 1) buffer B {
            float a; mat2 m2; mat3 m3; mat4x2 m42; Small small; float after; mat2 arr[3];
        } b;
        layout(std140, row_major, binding = 2) uniform R {
            float a; mat2 m2; mat3 m3; mat2x4 m24; mat4x2 m42; mat3x2 arr[2];
        } r;
        layout(location = 0) out vec4 o;
        void main() {
            int i = int(u.a);
            o = vec4(u.m2[1], u.m42[i]) + vec4(u.inner.m2[i], u.arr[2][1]) + vec4(u.dm[2].xyz, 1.0);
            o += vec4(b.m2[i], b.arr[1][0]) + vec4(r.m2[1], r.m42[i]) + vec4(r.arr[1][2], r.m24[1].zw);
            b.m2 = u.m2;
            b.m42 = r.m42;
        }";
    // The module is valid, and the backend accepts it.
    compile(ShaderStage::Fragment, source);

    let module = parse(ShaderStage::Fragment, source).unwrap();
    let column = |stride| Some((stride, false));
    let row = |stride| Some((stride, true));
    // Offsets and strides are the ones in glslang's output for this shader.
    assert_eq!(
        block_layout(&module, "U"),
        [
            (0, None),
            (16, column(16)),
            (48, column(16)),
            (96, column(16)),
            (160, column(16)),
            (192, None),
            (256, None),
            (272, None),
            (288, column(16)),
            (384, None),
            (396, None),
            (416, column(32)),
        ]
    );
    // `Inner` as laid out inside the std140 block.
    assert_eq!(
        block_layout(&module, "Inner"),
        [(0, None), (16, None), (32, column(16))]
    );
    assert_eq!(
        block_layout(&module, "B"),
        [
            (0, None),
            (8, column(8)),
            (32, column(16)),
            (80, column(8)),
            (112, None),
            (116, None),
            (120, column(8)),
        ]
    );
    assert_eq!(
        block_layout(&module, "R"),
        [
            (0, None),
            (16, row(16)),
            (48, row(16)),
            (96, row(16)),
            (160, row(16)),
            (192, row(16)),
        ]
    );
}

/// A boolean in a block is stored as an unsigned integer and converted where
/// it is read or written.
#[test]
fn booleans_in_blocks() {
    let source = "#version 450
        layout(std140, binding = 0) uniform U { bool b; bvec3 bv; float f; bvec4 b4; } u;
        layout(std430, binding = 1) buffer B { bool b; bvec2 bv; } s;
        layout(binding = 2) uniform Anon { bool ab; bvec2 abv; };
        layout(location = 0) out vec4 o;
        void setb(out bool x) { x = true; }
        void flip(inout bvec2 v) { v = not(v); }
        void main() {
            if (u.b && u.bv.y && ab && abv.x && u.b4[1]) o = vec4(1.0); else o = vec4(u.f);
            s.b = u.b;
            s.bv = u.bv.xy;
            s.bv.x = true;
            s.bv.yx = bvec2(false, true);
            bool l = s.b;
            bvec2 lv = s.bv;
            setb(s.b);
            flip(s.bv);
            setb(s.bv.y);
            o += vec4(l, lv, any(u.b4));
        }";
    compile(ShaderStage::Fragment, source);

    // The layout is the one of `uint` members, as in glslang's output.
    let module = parse(ShaderStage::Fragment, source).unwrap();
    let offsets = |name| -> Vec<u32> {
        block_layout(&module, name)
            .into_iter()
            .map(|(offset, _)| offset)
            .collect()
    };
    assert_eq!(offsets("U"), [0, 16, 28, 32]);
    assert_eq!(offsets("B"), [0, 8]);
    assert_eq!(offsets("Anon"), [0, 8]);

    let error = parse(
        ShaderStage::Fragment,
        "#version 450
        struct S { bool flag; };
        layout(binding = 0) uniform U { S s; } u;
        void main() {}",
    )
    .unwrap_err();
    assert!(error.contains("booleans inside arrays"), "{error}");
}

#[test]
fn boolean_arrays_in_blocks() {
    let source = "#version 450
        layout(local_size_x = 1) in;
        layout(binding = 0, std430) buffer B { bool a[3]; bvec2 v[2][2]; bool r[]; } b;
        layout(binding = 1) uniform U { bool u[2]; } ub;
        void main() {
            bool x[3] = b.a;
            b.a = x;
            b.a[1] = true;
            bvec2 w[2][2] = b.v;
            b.v[1] = w[0];
            b.r[2] = b.v[1][0].x || ub.u[1];
        }";
    let module = compile(ShaderStage::Compute, source);
    assert!(!instructions(&module, Op::INotEqual).is_empty());
    assert!(!instructions(&module, Op::Select).is_empty());
    let ir = parse(ShaderStage::Compute, source).unwrap();
    let element = ir.types.iter().find_map(|(_, ty)| match ty.inner {
        rglsl::TypeInner::Struct { ref members, .. } if ty.name.as_deref() == Some("U") => {
            match ir.types[members[0].ty].inner {
                rglsl::TypeInner::Array { base, stride, .. } => Some((base, stride)),
                _ => None,
            }
        }
        _ => None,
    });
    let (base, stride) = element.expect("U has an array member");
    assert_eq!(stride, 16);
    assert_eq!(
        ir.types[base].inner,
        rglsl::TypeInner::Scalar(rglsl::Scalar::U32)
    );
}

/// Reading one member of a block does not load the whole block, so a buffer
/// block that ends in a runtime-sized array can be read.
#[test]
fn members_of_blocks_with_runtime_arrays() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        layout(std430, binding = 0) buffer B { float head; vec4 d[]; } b;
        layout(location = 0) out vec4 o;
        void main() { o = vec4(b.head) + b.d[1] + vec4(b.d.length()); }",
    );
    assert_eq!(instructions(&module, Op::ArrayLength).len(), 1);
}

/// A vector constructed from one boolean replicates it to every component.
#[test]
fn vector_from_scalar_bool() {
    compile(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) out vec4 o;
        void main() {
            bool a = true;
            ivec2 v = ivec2(a);
            o = vec4(a) + vec4(v, 0, 0) + vec4(vec2(bvec2(a)), 0.0, 0.0);
        }",
    );
}

/// User-defined inputs and outputs are the stage's interface variables
/// themselves: any type, `component`, structures, and no private copies.
#[test]
fn varyings_are_interface_variables() {
    let module = compile(
        ShaderStage::Vertex,
        "#version 450
        struct Light { vec3 dir; float power; };
        layout(location = 0) in vec4 a_pos;
        layout(location = 1) in mat3 a_basis;
        layout(location = 4) in vec2 a_uv[2];
        layout(location = 6) in vec3 a_unused;
        layout(location = 7) in ivec2 a_ids;
        layout(location = 0) out mat3 v_basis;
        layout(location = 3) out float v_w[2];
        layout(location = 5, component = 0) out vec2 v_uv;
        layout(location = 5, component = 2) out float v_fade;
        layout(location = 6) flat out ivec2 v_ids;
        layout(location = 7) out Light v_light;
        layout(location = 10) centroid out vec4 v_cent;
        layout(location = 11) noperspective out vec4 v_lin;
        void helper(out float f) { f = 2.0; }
        void main() {
            gl_Position = a_pos;
            v_basis = a_basis;
            v_w[0] = a_uv[1].x;
            helper(v_w[1]);
            v_uv = a_uv[0];
            v_fade = 1.0;
            v_ids = a_ids;
            v_light.dir = a_basis[1];
            v_light.power = 3.0;
            v_cent = a_pos;
            v_lin = a_pos;
        }",
    );

    // The decorations glslang gives the same shader.
    let location = |name: &str| -> Vec<u32> {
        let id = module
            .debug_names
            .iter()
            .find(|inst| {
                inst.class.opcode == Op::Name
                    && inst.operands[1] == Operand::LiteralString(name.to_string())
            })
            .unwrap_or_else(|| panic!("no variable named {name}"))
            .operands[0]
            .unwrap_id_ref();
        module
            .annotations
            .iter()
            .filter(|inst| {
                inst.class.opcode == Op::Decorate
                    && inst.operands[0] == Operand::IdRef(id)
                    && matches!(
                        inst.operands[1],
                        Operand::Decoration(Decoration::Location | Decoration::Component)
                    )
            })
            .map(|inst| match inst.operands[2] {
                Operand::LiteralBit32(value) => value,
                ref other => panic!("unexpected operand {other:?}"),
            })
            .collect()
    };
    assert_eq!(location("a_basis"), [1]);
    assert_eq!(location("a_uv"), [4]);
    assert_eq!(location("a_unused"), [6]);
    assert_eq!(location("v_basis"), [0]);
    assert_eq!(location("v_w"), [3]);
    assert_eq!(location("v_uv"), [5, 0]);
    assert_eq!(location("v_fade"), [5, 2]);
    assert_eq!(location("v_light"), [7]);
    assert_eq!(decorated(&module, Decoration::Flat), ["v_ids"]);
    assert_eq!(decorated(&module, Decoration::Centroid), ["v_cent"]);
    assert_eq!(decorated(&module, Decoration::NoPerspective), ["v_lin"]);

    // No structure outside a buffer has a layout.
    assert!(module.annotations.iter().all(|inst| !matches!(
        inst.operands.get(2),
        Some(&Operand::Decoration(Decoration::Offset))
    )));

    // Overlapping locations are rejected: the matrix at 1 covers 1..=3.
    let error = parse(
        ShaderStage::Vertex,
        "#version 450
        layout(location = 1) in mat3 m;
        layout(location = 3) in vec4 v;
        void main() { gl_Position = v + vec4(m[0], 1.0); }",
    )
    .unwrap_err();
    assert!(error.contains("BindingCollision"), "{error}");
}

#[test]
fn layer_count_of_storage_images() {
    let module = compile(
        ShaderStage::Compute,
        "#version 450
        layout(local_size_x = 1) in;
        layout(rgba8, binding = 0) uniform image2DArray img;
        layout(std430, binding = 1) buffer B { ivec3 d; };
        void main() { d = imageSize(img); }",
    );
    assert!(instructions(&module, Op::ImageQuerySizeLod).is_empty());
    assert!(!instructions(&module, Op::ImageQuerySize).is_empty());
}

#[test]
fn frag_depth_output_replaces_depth() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) in float depth;
        void main() { gl_FragDepth = depth; }",
    );
    let modes: Vec<_> = instructions(&module, Op::ExecutionMode)
        .into_iter()
        .filter_map(|inst| match inst.operands.get(1) {
            Some(&Operand::ExecutionMode(mode)) => Some(mode),
            _ => None,
        })
        .collect();
    assert!(
        modes.contains(&spirv::ExecutionMode::DepthReplacing),
        "{modes:?}"
    );
}

#[test]
fn switch_fall_through_after_grouped_labels() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) flat in int k;
        layout(location = 0) out vec4 o;
        void main() {
            float j = 0.0;
            switch (k) { case 1: case 2: j += 1.0; case 3: j += 2.0; break; default: j = 5.0; }
            o = vec4(j);
        }",
    );
    for function in &module.functions {
        for block in &function.blocks {
            let label = block.label.as_ref().and_then(|label| label.result_id);
            let last = block.instructions.last().expect("a block has a terminator");
            if last.class.opcode == Op::Branch {
                assert_ne!(Some(last.operands[0].unwrap_id_ref()), label);
            }
        }
    }
}

fn compile_valid(stage: ShaderStage, source: &str) -> dr::Module {
    let module = parse(stage, source).unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .expect("validated in parse");
    let options = spv::Options {
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None).expect("SPIR-V backend failed");
    crate::stage_io::spirv_val(&words);
    dr::load_words(words).expect("produced SPIR-V does not parse")
}

fn named(module: &dr::Module, name: &str) -> u32 {
    module
        .debug_names
        .iter()
        .find(|inst| {
            inst.class.opcode == Op::Name
                && inst.operands[1] == Operand::LiteralString(name.to_string())
        })
        .unwrap_or_else(|| panic!("nothing named {name}"))
        .operands[0]
        .unwrap_id_ref()
}

fn literal(operand: &Operand) -> u32 {
    match *operand {
        Operand::LiteralBit32(value) => value,
        Operand::BuiltIn(built_in) => built_in as u32,
        ref other => panic!("unexpected operand {other:?}"),
    }
}

fn variable_decorations(module: &dr::Module, name: &str) -> Vec<(Decoration, Vec<u32>)> {
    let id = named(module, name);
    module
        .annotations
        .iter()
        .filter(|inst| inst.class.opcode == Op::Decorate && inst.operands[0] == Operand::IdRef(id))
        .map(|inst| {
            let Operand::Decoration(decoration) = inst.operands[1] else {
                panic!("OpDecorate without a decoration");
            };
            (decoration, inst.operands[2..].iter().map(literal).collect())
        })
        .collect()
}

fn member_decorations(module: &dr::Module, name: &str) -> Vec<(u32, Decoration, Vec<u32>)> {
    let id = named(module, name);
    let mut decorations: Vec<_> = module
        .annotations
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::MemberDecorate && inst.operands[0] == Operand::IdRef(id)
        })
        .map(|inst| {
            let Operand::Decoration(decoration) = inst.operands[2] else {
                panic!("OpMemberDecorate without a decoration");
            };
            (
                literal(&inst.operands[1]),
                decoration,
                inst.operands[3..].iter().map(literal).collect(),
            )
        })
        .collect();
    decorations.sort_by_key(|&(member, decoration, _)| (member, decoration as u32));
    decorations
}

fn struct_members(module: &dr::Module, name: &str) -> Vec<String> {
    let id = named(module, name);
    let mut members: Vec<(u32, String)> = module
        .debug_names
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::MemberName && inst.operands[0] == Operand::IdRef(id)
        })
        .map(|inst| {
            (
                literal(&inst.operands[1]),
                inst.operands[2].unwrap_literal_string().to_string(),
            )
        })
        .collect();
    members.sort();
    members.into_iter().map(|(_, name)| name).collect()
}

fn array_lengths(module: &dr::Module) -> Vec<u32> {
    let mut lengths: Vec<u32> = module
        .types_global_values
        .iter()
        .filter(|inst| inst.class.opcode == Op::TypeArray)
        .map(|inst| constant(module, &inst.operands[1]))
        .collect();
    lengths.sort_unstable();
    lengths
}

fn has_capability(module: &dr::Module, capability: spirv::Capability) -> bool {
    module
        .capabilities
        .iter()
        .any(|inst| inst.operands[0] == Operand::Capability(capability))
}

#[test]
fn user_interface_blocks_match_glslang() {
    let source = "#version 450
        layout(location = 0) in vec4 p;
        out VS_OUT {
            layout(location = 1) vec4 a;
            layout(location = 3) vec2 b;
            layout(location = 4) flat int c;
            layout(location = 5) noperspective float d;
            layout(location = 6) invariant vec4 g;
        } vs_out;
        layout(location = 7) out Blk {
            centroid vec3 e;
            layout(location = 9, component = 2) vec2 f;
            mat2 m;
            float h[2];
            sample vec4 s;
        };
        void main() {
            gl_Position = p;
            vs_out.a = p;
            vs_out.c = 1;
            e = p.xyz;
            f = p.zw;
            h[1] = p.x;
        }";
    compile_valid(
        ShaderStage::Vertex,
        "#version 450
        layout(location = 0) in vec2 uv;
        layout(location = 0) out VS_OUT { vec2 TexCoords; } vs_out;
        void main() { gl_Position = vec4(0.0); vs_out.TexCoords = uv; }",
    );
    let module = compile_valid(ShaderStage::Vertex, source);
    let location = |member, location| (member, Decoration::Location, vec![location]);
    let flag = |member, decoration| (member, decoration, vec![]);
    assert_eq!(
        member_decorations(&module, "VS_OUT"),
        [
            location(0, 1),
            location(1, 3),
            flag(2, Decoration::Flat),
            location(2, 4),
            flag(3, Decoration::NoPerspective),
            location(3, 5),
            flag(4, Decoration::Invariant),
            location(4, 6),
        ]
    );
    assert_eq!(
        member_decorations(&module, "Blk"),
        [
            flag(0, Decoration::Centroid),
            location(0, 7),
            location(1, 9),
            (1, Decoration::Component, vec![2]),
            location(2, 10),
            location(3, 12),
            flag(4, Decoration::Sample),
            location(4, 14),
        ]
    );
    assert_eq!(
        variable_decorations(&module, "VS_OUT"),
        [(Decoration::Block, vec![])]
    );
    assert!(variable_decorations(&module, "vs_out").is_empty());
    assert!(module.annotations.iter().all(|inst| !matches!(
        inst.operands.get(2),
        Some(&Operand::Decoration(Decoration::Offset))
    )));
}

#[test]
fn interface_blocks_at_a_location() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 2) in VS_OUT { vec4 a; vec2 b; flat int c; } vs_in;
        layout(location = 0) out vec4 o;
        void main() { o = vs_in.a + vec4(vs_in.b, float(vs_in.c), 0.0); }",
    );
    assert_eq!(
        variable_decorations(&module, "vs_in"),
        [(Decoration::Location, vec![2])]
    );
    assert_eq!(
        member_decorations(&module, "VS_OUT"),
        [(2, Decoration::Flat, vec![])]
    );

    let module = compile_valid(
        ShaderStage::Vertex,
        "#version 450 core
        layout(location = 0) in vec2 aTexCoords;
        layout(location = 0) out VS_OUT { vec2 TexCoords; } vs_out[2];
        layout(location = 2) out vec4 after;
        void main() {
            gl_Position = vec4(0.0);
            vs_out[1].TexCoords = aTexCoords;
            after = vec4(1.0);
        }",
    );
    assert_eq!(
        variable_decorations(&module, "vs_out"),
        [(Decoration::Location, vec![0])]
    );
    assert!(member_decorations(&module, "VS_OUT").is_empty());

    let error = parse(
        ShaderStage::Vertex,
        "#version 450
        layout(location = 0) out VS_OUT { vec2 a; } vs_out[2];
        layout(location = 1) out vec4 overlapping;
        void main() { gl_Position = vec4(0.0); }",
    )
    .unwrap_err();
    assert!(error.contains("BindingCollision"), "{error}");
}

#[test]
fn interface_block_locations_follow_glslang() {
    for (source, expected) in [
        (
            "#version 450
            out B { layout(location = 1) vec4 a; vec4 b; } b;
            void main() { gl_Position = vec4(0.0); }",
            "either the block needs a location",
        ),
        (
            "#version 450
            out B { layout(location = 1) vec4 a; } b[2];
            void main() { gl_Position = vec4(0.0); }",
            "new locations are needed for each block element",
        ),
        (
            "#version 450
            out B { vec4 a; } b;
            void main() { gl_Position = vec4(0.0); }",
            "requires a location",
        ),
        (
            "#version 450
            layout(location = 0) invariant out B { vec4 a; } b;
            void main() { gl_Position = vec4(0.0); }",
            "invariant",
        ),
    ] {
        let error = parse(ShaderStage::Vertex, source).unwrap_err();
        assert!(error.contains(expected), "{error}");
    }

    let options = glsl::Options {
        auto_map_locations: true,
        ..glsl::Options::from(ShaderStage::Vertex)
    };
    let module = glsl::Frontend::default()
        .parse(
            &options,
            "#version 450
            out A { layout(location = 7) vec4 a; layout(location = 8) vec4 b; } a;
            out B { vec4 c; mat2 d; } b;
            out vec4 e;
            void main() { gl_Position = vec4(0.0); }",
        )
        .unwrap();
    let io: Vec<_> = module.entry_points[0]
        .interface
        .iter()
        .map(|&handle| &module.global_variables[handle])
        .filter_map(|global| match global.io {
            Some(rglsl::Binding::Location { location, .. }) => {
                Some((global.name.clone().unwrap_or_default(), location))
            }
            _ => None,
        })
        .collect();
    assert_eq!(io, [("b".to_string(), 2), ("e".to_string(), 5)]);
}

#[test]
fn gl_per_vertex_matches_glslang() {
    let unused = "#version 450
        layout(location = 0) in vec4 p;
        void main() { }";
    let implicit = "#version 450
        layout(location = 0) in vec4 p;
        void main() { gl_Position = p; gl_ClipDistance[2] = 1.0; }";
    let redeclared = "#version 450
        layout(location = 0) in vec4 p;
        out gl_PerVertex { float gl_PointSize; vec4 gl_Position; float gl_CullDistance[]; };
        void main() { gl_Position = p; gl_CullDistance[2] = 1.0; }";
    let redeclared_unused = "#version 450
        out gl_PerVertex { vec4 gl_Position; float gl_PointSize; };
        void main() { }";
    compile_valid(ShaderStage::Vertex, unused);
    let module = compile_valid(ShaderStage::Vertex, unused);
    assert!(!module.debug_names.iter().any(|inst| {
        inst.operands.get(1) == Some(&Operand::LiteralString("gl_PerVertex".to_string()))
    }));

    let module = compile_valid(ShaderStage::Vertex, implicit);
    assert_eq!(
        struct_members(&module, "gl_PerVertex"),
        [
            "gl_Position",
            "gl_PointSize",
            "gl_ClipDistance",
            "gl_CullDistance"
        ]
    );
    assert_eq!(array_lengths(&module), [1, 3]);
    assert!(has_capability(&module, spirv::Capability::ClipDistance));
    assert!(!has_capability(&module, spirv::Capability::CullDistance));
    let built_in =
        |member, built_in: spirv::BuiltIn| (member, Decoration::BuiltIn, vec![built_in as u32]);
    assert_eq!(
        member_decorations(&module, "gl_PerVertex"),
        [
            built_in(0, spirv::BuiltIn::Position),
            built_in(1, spirv::BuiltIn::PointSize),
            built_in(2, spirv::BuiltIn::ClipDistance),
            built_in(3, spirv::BuiltIn::CullDistance),
        ]
    );
    assert_eq!(
        variable_decorations(&module, "gl_PerVertex"),
        [(Decoration::Block, vec![])]
    );

    let module = compile_valid(ShaderStage::Vertex, redeclared);
    assert_eq!(
        struct_members(&module, "gl_PerVertex"),
        ["gl_Position", "gl_PointSize", "gl_CullDistance"]
    );
    assert_eq!(array_lengths(&module), [3]);
    assert!(has_capability(&module, spirv::Capability::CullDistance));

    let module = compile_valid(ShaderStage::Vertex, redeclared_unused);
    assert_eq!(
        struct_members(&module, "gl_PerVertex"),
        ["gl_Position", "gl_PointSize"]
    );
}

#[test]
fn invariant_position_in_gl_per_vertex() {
    let sources = [
        "#version 450
        out gl_PerVertex { invariant vec4 gl_Position; float gl_ClipDistance[3]; };
        void main() { gl_Position = vec4(1.0); gl_ClipDistance[1] = 0.0; }",
        "#version 450
        out gl_PerVertex { vec4 gl_Position; };
        invariant gl_Position;
        void main() { gl_Position = vec4(1.0); }",
        "#version 450
        invariant gl_Position;
        void main() { gl_Position = vec4(1.0); gl_PointSize = 1.0; }",
    ];
    let module = compile_valid(ShaderStage::Vertex, sources[2]);
    assert_eq!(decorated(&module, Decoration::Invariant), ["gl_Position"]);
    for source in sources {
        let module = compile_valid(ShaderStage::Vertex, source);
        assert_eq!(decorated(&module, Decoration::Invariant), ["gl_Position"]);
    }
    let module = compile_valid(ShaderStage::Vertex, sources[0]);
    assert_eq!(
        member_decorations(&module, "gl_PerVertex"),
        [
            (
                0,
                Decoration::BuiltIn,
                vec![spirv::BuiltIn::Position as u32]
            ),
            (0, Decoration::Invariant, vec![]),
            (
                1,
                Decoration::BuiltIn,
                vec![spirv::BuiltIn::ClipDistance as u32]
            ),
        ]
    );
    assert_eq!(array_lengths(&module), [3]);
}

#[test]
fn post_depth_coverage_is_not_dropped() {
    let error = parse(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_post_depth_coverage : enable
        layout(post_depth_coverage) in;
        void main() {}",
    )
    .unwrap_err();
    assert!(error.contains("requires early_fragment_tests"), "{error}");

    let error = parse(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_post_depth_coverage : enable
        layout(early_fragment_tests) in;
        layout(post_depth_coverage) in;
        void main() {}",
    )
    .unwrap_err();
    assert!(error.contains("post_depth_coverage"), "{error}");
}

fn block_variable_decorations(module: &dr::Module, block: &str) -> Vec<(Decoration, Vec<u32>)> {
    let structure = named(module, block);
    let pointer = module
        .types_global_values
        .iter()
        .find(|inst| {
            inst.class.opcode == Op::TypePointer && inst.operands[1] == Operand::IdRef(structure)
        })
        .and_then(|inst| inst.result_id)
        .unwrap_or_else(|| panic!("no pointer to {block}"));
    let variable = module
        .types_global_values
        .iter()
        .find(|inst| inst.class.opcode == Op::Variable && inst.result_type == Some(pointer))
        .and_then(|inst| inst.result_id)
        .unwrap_or_else(|| panic!("no variable of {block}"));
    let mut decorations: Vec<_> = module
        .annotations
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::Decorate && inst.operands[0] == Operand::IdRef(variable)
        })
        .map(|inst| {
            let Operand::Decoration(decoration) = inst.operands[1] else {
                panic!("OpDecorate without a decoration");
            };
            (decoration, inst.operands[2..].iter().map(literal).collect())
        })
        .collect();
    decorations.sort_by_key(|&(decoration, _)| decoration as u32);
    decorations
}

fn sorted_variable_decorations(module: &dr::Module, name: &str) -> Vec<(Decoration, Vec<u32>)> {
    let mut decorations = variable_decorations(module, name);
    decorations.sort_by_key(|&(decoration, _)| decoration as u32);
    decorations
}

fn has_execution_mode(module: &dr::Module, mode: spirv::ExecutionMode) -> bool {
    module
        .execution_modes
        .iter()
        .any(|inst| inst.operands[1] == Operand::ExecutionMode(mode))
}

#[test]
fn transform_feedback_matches_glslang() {
    let module = compile_valid(
        ShaderStage::Vertex,
        "#version 450
        layout(xfb_buffer = 3) out;
        layout(xfb_stride = 48) out;
        layout(xfb_offset = 12, location = 0) out float out1;
        layout(xfb_buffer = 2) out;
        layout(location = 1) out outXfb {
            layout(xfb_buffer = 2, xfb_stride = 32, xfb_offset = 8) float out2;
        };
        layout(xfb_buffer = 1, location = 3) out outXfb2 {
            layout(xfb_stride = 64, xfb_offset = 60) float out3;
        };
        layout(location = 4, xfb_buffer = 0, xfb_offset = 4) out float out4;
        layout(location = 5, xfb_buffer = 3, xfb_offset = 0) out struct S { float a; vec2 b; } s;
        layout(location = 7, xfb_buffer = 0, xfb_offset = 12) out block2 {
            vec4 v;
            float u;
            layout(xfb_offset = 40) vec4 w;
            vec4 x;
        };
        void main() {}",
    );
    assert!(has_capability(
        &module,
        spirv::Capability::TransformFeedback
    ));
    assert!(has_execution_mode(&module, spirv::ExecutionMode::Xfb));
    let xfb = |location: u32, offset: Option<u32>, buffer: u32, stride: u32| {
        let mut decorations = vec![(Decoration::Location, vec![location])];
        decorations.extend(offset.map(|offset| (Decoration::Offset, vec![offset])));
        decorations.push((Decoration::XfbBuffer, vec![buffer]));
        decorations.push((Decoration::XfbStride, vec![stride]));
        decorations
    };
    assert_eq!(
        sorted_variable_decorations(&module, "out1"),
        xfb(0, Some(12), 3, 48)
    );
    assert_eq!(
        sorted_variable_decorations(&module, "out4"),
        xfb(4, Some(4), 0, 72)
    );
    assert_eq!(
        sorted_variable_decorations(&module, "s"),
        xfb(5, Some(0), 3, 48)
    );
    assert_eq!(
        block_variable_decorations(&module, "outXfb"),
        xfb(1, None, 2, 32)
    );
    assert_eq!(
        block_variable_decorations(&module, "outXfb2"),
        xfb(3, None, 1, 64)
    );
    assert_eq!(
        block_variable_decorations(&module, "block2"),
        xfb(7, None, 0, 72)
    );
    assert_eq!(
        member_decorations(&module, "outXfb"),
        [(0, Decoration::Offset, vec![8])]
    );
    assert_eq!(
        member_decorations(&module, "outXfb2"),
        [(0, Decoration::Offset, vec![60])]
    );
    assert_eq!(
        member_decorations(&module, "block2")
            .into_iter()
            .filter(|&(_, decoration, _)| decoration == Decoration::Offset)
            .map(|(member, _, offset)| (member, offset[0]))
            .collect::<Vec<_>>(),
        [(0, 12), (1, 28), (2, 40), (3, 56)]
    );

    let module = compile_valid(
        ShaderStage::Vertex,
        "#version 450
        layout(location = 0) out vec4 c;
        void main() { c = vec4(1.0); gl_Position = c; }",
    );
    assert!(!has_capability(
        &module,
        spirv::Capability::TransformFeedback
    ));
    assert!(!has_execution_mode(&module, spirv::ExecutionMode::Xfb));
    assert_eq!(
        sorted_variable_decorations(&module, "c"),
        [(Decoration::Location, vec![0])]
    );

    let module = compile_valid(
        ShaderStage::Vertex,
        "#version 450
        layout(xfb_buffer = 1) out;
        void main() {}",
    );
    assert!(has_capability(
        &module,
        spirv::Capability::TransformFeedback
    ));
    assert!(has_execution_mode(&module, spirv::ExecutionMode::Xfb));
}

#[test]
fn transform_feedback_of_gl_per_vertex() {
    let module = compile_valid(
        ShaderStage::Vertex,
        "#version 450
        layout(xfb_buffer = 1, xfb_stride = 64) out;
        layout(xfb_buffer = 1, xfb_offset = 16) out gl_PerVertex {
            float gl_PointSize;
            vec4 gl_Position;
        };
        void main() { gl_Position = vec4(1.0); gl_PointSize = 2.0; }",
    );
    assert_eq!(
        member_decorations(&module, "gl_PerVertex"),
        [
            (
                0,
                Decoration::BuiltIn,
                vec![spirv::BuiltIn::Position as u32]
            ),
            (0, Decoration::Offset, vec![20]),
            (
                1,
                Decoration::BuiltIn,
                vec![spirv::BuiltIn::PointSize as u32]
            ),
            (1, Decoration::Offset, vec![16]),
        ]
    );
    assert_eq!(
        block_variable_decorations(&module, "gl_PerVertex"),
        [
            (Decoration::XfbBuffer, vec![1]),
            (Decoration::XfbStride, vec![64])
        ]
    );

    let module = compile_valid(
        ShaderStage::Vertex,
        "#version 450
        layout(xfb_buffer = 3, xfb_offset = 16) out gl_PerVertex {
            layout(xfb_stride = 80) vec4 gl_Position;
        };
        void main() { gl_Position = vec4(1.0); }",
    );
    assert_eq!(
        block_variable_decorations(&module, "gl_PerVertex"),
        [
            (Decoration::XfbBuffer, vec![3]),
            (Decoration::XfbStride, vec![80])
        ]
    );

    let module = compile_valid(
        ShaderStage::Vertex,
        "#version 450
        layout(xfb_buffer = 2) out;
        layout(location = 5, xfb_stride = 20) out block { float y1; vec4 y2; };
        void main() { y1 = 7.0; gl_Position = vec4(0.0); }",
    );
    assert_eq!(
        block_variable_decorations(&module, "block"),
        [
            (Decoration::Location, vec![5]),
            (Decoration::XfbBuffer, vec![2]),
            (Decoration::XfbStride, vec![20])
        ]
    );
    assert_eq!(
        block_variable_decorations(&module, "gl_PerVertex"),
        [
            (Decoration::XfbBuffer, vec![0]),
            (Decoration::XfbStride, vec![0])
        ]
    );
}

#[test]
fn transform_feedback_errors() {
    for (stage, source, expected) in [
        (
            ShaderStage::Vertex,
            "#version 450
            layout(location = 0, xfb_offset = 0) out vec4 a;
            layout(location = 1, xfb_offset = 8) out vec4 b;
            void main() {}",
            "overlapping offsets",
        ),
        (
            ShaderStage::Vertex,
            "#version 450
            layout(location = 0, xfb_offset = 0, xfb_stride = 8) out vec4 a;
            void main() {}",
            "xfb_stride is too small",
        ),
        (
            ShaderStage::Vertex,
            "#version 450
            layout(xfb_stride = 16) out;
            layout(location = 0, xfb_stride = 32) out vec4 a;
            void main() {}",
            "all stride settings must match",
        ),
        (
            ShaderStage::Vertex,
            "#version 450
            layout(location = 0, xfb_offset = 0) in vec4 a;
            void main() {}",
            "can only be used on an output",
        ),
        (
            ShaderStage::Vertex,
            "#version 450
            layout(location = 0, xfb_offset = 2) out float a;
            void main() {}",
            "multiple of size of first component",
        ),
        (
            ShaderStage::Fragment,
            "#version 450
            layout(location = 0, xfb_offset = 0) out vec4 a;
            void main() { a = vec4(1.0); }",
            "not supported in this stage",
        ),
    ] {
        let error = parse(stage, source).unwrap_err();
        assert!(error.contains(expected), "{error}");
    }
}

fn type_instruction(module: &dr::Module, id: u32) -> &dr::Instruction {
    module
        .types_global_values
        .iter()
        .find(|inst| inst.result_id == Some(id))
        .unwrap_or_else(|| panic!("no type %{id}"))
}

fn variable_type(module: &dr::Module, name: &str) -> (spirv::StorageClass, Vec<Op>) {
    let id = named(module, name);
    let variable = module
        .types_global_values
        .iter()
        .find(|inst| inst.class.opcode == Op::Variable && inst.result_id == Some(id))
        .unwrap_or_else(|| panic!("{name} is not a global variable"));
    let pointer = type_instruction(module, variable.result_type.expect("typed"));
    let Operand::StorageClass(class) = pointer.operands[0] else {
        panic!("not a pointer");
    };
    let mut chain = Vec::new();
    let mut current = type_instruction(module, pointer.operands[1].unwrap_id_ref());
    loop {
        chain.push(current.class.opcode);
        match current.class.opcode {
            Op::TypeArray | Op::TypeSampledImage => {
                current = type_instruction(module, current.operands[0].unwrap_id_ref());
            }
            _ => break,
        }
    }
    (class, chain)
}

#[test]
fn combined_samplers_match_glslang() {
    let source = "#version 450
        layout(binding = 1) uniform sampler2D explicit1;
        uniform sampler2D unusedSampler;
        uniform U0 { vec4 a; } u0;
        uniform sampler2DShadow shadow;
        layout(set = 1) uniform isampler2DArray layers[3];
        uniform sampler samp;
        uniform texture2D tex;
        uniform sampler2DMS multi;
        layout(location = 0) in vec4 i0;
        layout(location = 0) out vec4 o0;
        void main() {
            o0 = texture(explicit1, i0.xy) + u0.a + vec4(texture(shadow, i0.xyz))
                + vec4(texelFetch(layers[1], ivec3(0), 0)) + texture(sampler2D(tex, samp), i0.xy)
                + texelFetch(multi, ivec2(0), 1) + vec4(textureSize(explicit1, 0), 0.0, 0.0);
        }";
    let options = glsl::Options {
        auto_map_bindings: true,
        ..glsl::Options::from(ShaderStage::Fragment)
    };
    let module = glsl::Frontend::default().parse(&options, source).unwrap();
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .unwrap();
    let mut bindings: Vec<(&str, u32, u32)> = module
        .global_variables
        .iter()
        .filter_map(|(_, global)| {
            let binding = global.binding.as_ref()?;
            Some((global.name.as_deref()?, binding.group, binding.binding))
        })
        .collect();
    bindings.sort_unstable();
    assert_eq!(
        bindings,
        [
            ("explicit1", 0, 1),
            ("layers", 1, 0),
            ("multi", 0, 5),
            ("samp", 0, 3),
            ("shadow", 0, 2),
            ("tex", 0, 4),
            ("u0", 0, 0),
            ("unusedSampler", 0, 0),
        ]
    );

    let words = spv::write_vec(
        &module,
        &info,
        &spv::Options {
            flags: spv::WriterFlags::DEBUG,
            ..spv::Options::default()
        },
        None,
    )
    .expect("SPIR-V backend failed");
    crate::stage_io::spirv_val(&words);
    let module = dr::load_words(words).expect("produced SPIR-V does not parse");
    let sampled = vec![Op::TypeSampledImage, Op::TypeImage];
    for name in ["explicit1", "unusedSampler", "shadow", "multi"] {
        assert_eq!(
            variable_type(&module, name),
            (spirv::StorageClass::UniformConstant, sampled.clone()),
            "{name}"
        );
    }
    assert_eq!(
        variable_type(&module, "layers"),
        (
            spirv::StorageClass::UniformConstant,
            vec![Op::TypeArray, Op::TypeSampledImage, Op::TypeImage]
        )
    );
    assert_eq!(
        variable_type(&module, "tex"),
        (spirv::StorageClass::UniformConstant, vec![Op::TypeImage])
    );
    assert_eq!(
        sorted_variable_decorations(&module, "shadow"),
        [
            (Decoration::Binding, vec![2]),
            (Decoration::DescriptorSet, vec![0])
        ]
    );
    let depth: Vec<u32> = instructions(&module, Op::TypeImage)
        .iter()
        .map(|inst| literal(&inst.operands[2]))
        .collect();
    assert!(depth.contains(&1) && depth.contains(&0));
    assert_eq!(instructions(&module, Op::SampledImage).len(), 1);
    assert_eq!(instructions(&module, Op::Image).len(), 3);
    assert!(has_capability(&module, spirv::Capability::ImageQuery));
}

#[test]
fn combined_samplers_as_function_parameters() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform sampler2D single;
        layout(binding = 1) uniform sampler2D many[4];
        layout(binding = 2) uniform samplerCubeShadow cube;
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        vec4 sampleIt(sampler2D s) { return texture(s, vec2(0.5)) + texelFetch(s, ivec2(0), 0); }
        vec4 forward(sampler2D s) { return sampleIt(s); }
        float compare(samplerCubeShadow s) { return texture(s, vec4(1.0)); }
        void main() {
            o = forward(single) + sampleIt(many[2]) + sampleIt(many[index]) + compare(cube);
        }",
    );
    let parameters = instructions(&module, Op::FunctionParameter);
    assert_eq!(parameters.len(), 3);
    for parameter in parameters {
        let pointer = type_instruction(&module, parameter.result_type.expect("typed"));
        assert_eq!(pointer.class.opcode, Op::TypePointer);
        assert_eq!(
            pointer.operands[0],
            Operand::StorageClass(spirv::StorageClass::UniformConstant)
        );
        let pointee = type_instruction(&module, pointer.operands[1].unwrap_id_ref());
        assert_eq!(pointee.class.opcode, Op::TypeSampledImage);
    }
    assert!(instructions(&module, Op::SampledImage).is_empty());
    assert_eq!(instructions(&module, Op::FunctionCall).len(), 5);
}

#[test]
fn sampler_constructors_at_point_of_use() {
    let error = parse(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform texture2D t;
        layout(binding = 1) uniform sampler s;
        layout(location = 0) out vec4 o;
        vec4 f(sampler2D x) { return texture(x, vec2(0.5)); }
        void main() { o = f(sampler2D(t, s)); }",
    )
    .unwrap_err();
    assert!(error.contains("point of use"), "{error}");

    compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform texture2D t;
        layout(binding = 1) uniform sampler s;
        layout(binding = 2) uniform texture2DArray ta;
        layout(binding = 3) uniform samplerShadow ss;
        layout(binding = 4) uniform texture2DArray depth;
        layout(location = 0) out vec4 o;
        void main() {
            o = texture(sampler2D(t, s), vec2(0.5))
                + texelFetchOffset(sampler2D(t, s), ivec2(1), 0, ivec2(1))
                + vec4(textureSize(sampler2DArray(ta, s), 0), 0.0)
                + vec4(texture(sampler2DArrayShadow(depth, ss), vec4(0.5)));
        }",
    );
}

#[test]
fn dynamic_indexing_of_opaque_arrays_is_not_non_uniform() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform sampler2D many[4];
        layout(binding = 1) uniform texture2D textures[4];
        layout(binding = 2) uniform sampler s;
        layout(binding = 3, rgba8) uniform readonly image2D images[4];
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        void main() {
            o = texture(many[index], vec2(0.5))
                + texture(sampler2D(textures[index], s), vec2(0.5))
                + imageLoad(images[index], ivec2(0));
        }",
    );
    assert!(decorated(&module, Decoration::NonUniform).is_empty());
    assert!(!has_capability(
        &module,
        spirv::Capability::ShaderNonUniform
    ));
    assert!(module.extensions.is_empty());
}

#[test]
fn buffer_blocks_decorate_their_own_struct() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        struct S { vec4 a; mat2 m; };
        layout(binding = 0) uniform U { vec4 u; S s; mat3 m3; } ub;
        layout(binding = 1) uniform U2 { vec4 v2; };
        layout(std430, binding = 2) buffer B { float x; uint data[]; } sb;
        layout(push_constant) uniform P { vec4 p; } pc;
        layout(location = 0) out vec4 o;
        void main() {
            o = ub.u + ub.s.a + v2 + pc.p + vec4(ub.m3[0], 1.0) + vec4(ub.s.m[1], 0.0, 0.0);
            sb.data[2] = 3u;
            o.x += sb.x + float(sb.data.length());
        }",
    );
    let mut blocks = decorated(&module, Decoration::Block);
    blocks.sort_unstable();
    assert_eq!(blocks, ["B", "P", "U", "U2"]);
    for (variable, block) in [("ub", "U"), ("sb", "B"), ("pc", "P"), ("", "U2")] {
        let id = named(&module, variable);
        let pointer = module
            .types_global_values
            .iter()
            .find(|inst| inst.class.opcode == Op::Variable && inst.result_id == Some(id))
            .and_then(|inst| inst.result_type)
            .map(|ty| type_instruction(&module, ty))
            .expect("a global variable");
        assert_eq!(
            name_of(&module, pointer.operands[1].unwrap_id_ref()),
            block,
            "{variable}"
        );
    }
    let ub = named(&module, "ub");
    let chains: Vec<usize> = instructions(&module, Op::AccessChain)
        .iter()
        .filter(|inst| inst.operands[0] == Operand::IdRef(ub))
        .map(|inst| inst.operands.len() - 1)
        .collect();
    assert_eq!(chains, [1, 2, 2, 3]);
    let wrappers = instructions(&module, Op::TypeStruct)
        .into_iter()
        .filter(|inst| {
            inst.operands.len() == 1
                && type_instruction(&module, inst.operands[0].unwrap_id_ref())
                    .class
                    .opcode
                    == Op::TypeStruct
        })
        .count();
    assert_eq!(wrappers, 0);
}

#[test]
fn resources_may_share_a_binding() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 460
        layout(location = 0) in vec2 uv;
        layout(set = 0, binding = 0) uniform texture2D t;
        layout(set = 0, binding = 0) uniform sampler s;
        layout(binding = 4) uniform sampler2D c;
        layout(binding = 4) uniform U { vec4 v; };
        layout(location = 0) out vec4 o;
        void main() { o = texture(sampler2D(t, s), uv) + texture(c, uv) + v; }",
    );
    for (name, binding) in [("t", 0), ("s", 0), ("c", 4), ("", 4)] {
        assert_eq!(
            sorted_variable_decorations(&module, name),
            [
                (Decoration::Binding, vec![binding]),
                (Decoration::DescriptorSet, vec![0])
            ],
            "{name}"
        );
    }
}

#[test]
fn structs_cross_between_buffers_and_functions() {
    let module = compile_valid(
        ShaderStage::Compute,
        "#version 450
        layout(local_size_x = 1) in;
        struct Inner { float f[3]; mat2 m; };
        struct S { int a; Inner inner[2]; vec3 v; };
        layout(binding = 0) uniform U { S s; float g[4]; } u;
        layout(std430, binding = 1) buffer B { S s; S arr[]; } b;
        void set(out S x) { x = u.s; }
        S make(S x) { x.a += 1; return x; }
        void main() {
            S local = u.s;
            float g[4] = u.g;
            local.a += int(g[1]);
            b.s = make(local);
            b.arr[1] = b.s;
            set(b.arr[2]);
            b.arr[0].inner[1] = u.s.inner[0];
            if (b.arr[0] == local) { b.s.a = 3; }
        }",
    );
    let laid_out: Vec<u32> = module
        .annotations
        .iter()
        .filter(|inst| inst.operands.get(2) == Some(&Operand::Decoration(Decoration::Offset)))
        .map(|inst| inst.operands[0].unwrap_id_ref())
        .collect();
    for parameter in instructions(&module, Op::FunctionParameter) {
        let mut ty = type_instruction(&module, parameter.result_type.expect("typed"));
        if ty.class.opcode == Op::TypePointer {
            ty = type_instruction(&module, ty.operands[1].unwrap_id_ref());
        }
        assert_eq!(ty.class.opcode, Op::TypeStruct);
        assert!(!laid_out.contains(&ty.result_id.expect("a type")));
    }
    let names: Vec<String> = instructions(&module, Op::TypeStruct)
        .iter()
        .map(|inst| name_of(&module, inst.result_id.expect("a type")))
        .filter(|name| name == "S")
        .collect();
    assert_eq!(names.len(), 4);
}

#[test]
fn buffer_textures_and_images_match_glslang() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform samplerBuffer sb;
        layout(binding = 1) uniform textureBuffer tb;
        layout(binding = 2) uniform sampler s;
        layout(binding = 3) uniform isamplerBuffer isb;
        layout(binding = 4, rgba32f) uniform imageBuffer ib;
        layout(binding = 5, r32ui) uniform uimageBuffer uib;
        layout(location = 0) flat in int i;
        layout(location = 0) out vec4 o;
        void main() {
            vec4 v = texelFetch(sb, i) + texelFetch(samplerBuffer(tb, s), i)
                + vec4(texelFetch(isb, i)) + texelFetch(tb, i);
            v += imageLoad(ib, i);
            imageStore(ib, i + 1, v);
            imageStore(uib, i, uvec4(imageLoad(uib, i).x + 1u));
            o = v + vec4(textureSize(sb) + textureSize(isb) + imageSize(ib) + imageSize(uib));
        }",
    );
    for capability in [
        spirv::Capability::SampledBuffer,
        spirv::Capability::ImageBuffer,
        spirv::Capability::ImageQuery,
    ] {
        assert!(has_capability(&module, capability), "{capability:?}");
    }
    let images = instructions(&module, Op::TypeImage);
    assert_eq!(images.len(), 4);
    for image in images {
        assert_eq!(image.operands[1], Operand::Dim(spirv::Dim::DimBuffer));
    }
    assert_eq!(instructions(&module, Op::ImageFetch).len(), 4);
    assert!(instructions(&module, Op::ImageFetch)
        .iter()
        .all(|inst| inst.operands.len() == 2));
    assert_eq!(instructions(&module, Op::ImageQuerySize).len(), 4);
    assert!(instructions(&module, Op::ImageQuerySizeLod).is_empty());
    assert_eq!(instructions(&module, Op::ImageRead).len(), 2);
    assert_eq!(instructions(&module, Op::ImageWrite).len(), 2);
}

fn compile_with_offsets(stage: ShaderStage, source: &str) -> dr::Module {
    let module = parse(stage, source).unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .expect("validated in parse");
    let words = spv::write_vec(&module, &info, &spv::Options::default(), None)
        .expect("SPIR-V backend failed");
    crate::stage_io::spirv_val_in(
        &words,
        &[
            "--target-env",
            "vulkan1.0",
            "--allow-offset-texture-operand",
        ],
    );
    dr::load_words(words).expect("produced SPIR-V does not parse")
}

fn image_operands(inst: &dr::Instruction) -> spirv::ImageOperands {
    inst.operands
        .iter()
        .find_map(|operand| match *operand {
            Operand::ImageOperands(operands) => Some(operands),
            _ => None,
        })
        .unwrap_or(spirv::ImageOperands::NONE)
}

#[test]
fn non_constant_texture_offsets() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_texture_offset_non_const : enable
        layout(binding = 0) uniform sampler2D s;
        layout(location = 0) in vec2 uv;
        layout(location = 1) flat in ivec2 delta;
        layout(location = 0) out vec4 o;
        void main() {
            o = textureGatherOffset(s, uv, delta) + textureGatherOffset(s, uv, ivec2(1, 2))
                + texelFetchOffset(s, ivec2(uv), 0, delta);
        }",
    );
    assert!(has_capability(
        &module,
        spirv::Capability::ImageGatherExtended
    ));
    let gathers: Vec<spirv::ImageOperands> = instructions(&module, Op::ImageGather)
        .into_iter()
        .map(image_operands)
        .collect();
    assert_eq!(
        gathers,
        [
            spirv::ImageOperands::OFFSET,
            spirv::ImageOperands::CONST_OFFSET
        ]
    );

    let module = compile_with_offsets(
        ShaderStage::Vertex,
        "#version 450
        #extension GL_EXT_texture_offset_non_const : enable
        layout(binding = 0) uniform sampler2D s;
        layout(location = 0) in vec2 uv;
        layout(location = 1) in ivec2 delta;
        layout(location = 0) out vec4 o;
        void main() {
            o = textureOffset(s, uv, delta) + textureLodOffset(s, uv, 1.0, ivec2(1));
            gl_Position = vec4(0.0);
        }",
    );
    let samples: Vec<spirv::ImageOperands> = instructions(&module, Op::ImageSampleExplicitLod)
        .into_iter()
        .map(image_operands)
        .collect();
    assert_eq!(
        samples,
        [
            spirv::ImageOperands::LOD | spirv::ImageOperands::OFFSET,
            spirv::ImageOperands::LOD | spirv::ImageOperands::CONST_OFFSET
        ]
    );
    assert!(has_capability(
        &module,
        spirv::Capability::ImageGatherExtended
    ));
}

fn capabilities_of(module: &dr::Module) -> Vec<spirv::Capability> {
    let mut found: Vec<spirv::Capability> = module
        .capabilities
        .iter()
        .filter_map(|inst| match inst.operands[0] {
            Operand::Capability(capability) => Some(capability),
            _ => None,
        })
        .collect();
    found.sort_by_key(|capability| *capability as u32);
    found
}

fn extensions_of(module: &dr::Module) -> Vec<String> {
    let mut found: Vec<String> = module
        .extensions
        .iter()
        .filter_map(|inst| match inst.operands[0] {
            Operand::LiteralString(ref name) => Some(name.clone()),
            _ => None,
        })
        .filter(|name| name != "SPV_KHR_storage_buffer_storage_class")
        .collect();
    found.sort();
    found
}

fn sorted(mut capabilities: Vec<spirv::Capability>) -> Vec<spirv::Capability> {
    capabilities.sort_by_key(|capability| *capability as u32);
    capabilities
}

#[test]
fn sixteen_bit_storage_without_arithmetic_matches_glslang() {
    use spirv::Capability as C;
    {
        let module = compile_valid(
            ShaderStage::Fragment,
            "#version 450
            #extension GL_EXT_shader_16bit_storage : enable
            layout(binding = 0) uniform U { float16_t a; f16vec2 b; u16vec2 c; };
            layout(binding = 1) buffer B { float16_t o; f16vec2 p; u16vec2 q; };
            layout(push_constant) uniform P { float16_t h; } pc;
            void main() {
                o = a;
                p = f16vec2(vec2(b) * 2.0);
                q = c;
                o = pc.h;
                vec4 x = vec4(a, b, 1.0);
            }",
        );
        assert_eq!(
            capabilities_of(&module),
            sorted(vec![
                C::Shader,
                C::StorageBuffer16BitAccess,
                C::UniformAndStorageBuffer16BitAccess,
                C::StoragePushConstant16,
            ])
        );
        assert_eq!(extensions_of(&module), ["SPV_KHR_16bit_storage"]);
    }
}

#[test]
fn explicit_arithmetic_types_capabilities_match_glslang() {
    use spirv::Capability as C;
    {
        let module = compile_valid(
            ShaderStage::Fragment,
            "#version 450
            #extension GL_EXT_shader_explicit_arithmetic_types : enable
            layout(location = 0) in f16vec2 inp;
            layout(location = 1) flat in int64_t big;
            layout(location = 0) out f16vec4 outp;
            layout(binding = 0) uniform U { uint8_t small; int8_t value; };
            void main() {
                float16_t scale = float16_t(small) + float16_t(big);
                outp = f16vec4(inp * scale, inp.yx);
                int8_t doubled = value * int8_t(2);
            }",
        );
        assert_eq!(
            capabilities_of(&module),
            sorted(vec![
                C::Shader,
                C::Float16,
                C::Int64,
                C::Int8,
                C::StorageInputOutput16,
                C::UniformAndStorageBuffer8BitAccess,
            ])
        );
        assert_eq!(
            extensions_of(&module),
            ["SPV_KHR_16bit_storage", "SPV_KHR_8bit_storage"]
        );
    }
}

#[test]
fn eight_bit_storage_conversions_need_no_int8() {
    use spirv::Capability as C;
    {
        let module = compile_valid(
            ShaderStage::Compute,
            "#version 450
            #extension GL_EXT_shader_8bit_storage : enable
            layout(local_size_x = 1) in;
            layout(binding = 0) uniform U { uint8_t a; i8vec2 b; };
            layout(binding = 1) buffer B { uint total; int8_t copy; };
            void main() {
                total = uint(a) + uint(b.x);
                copy = b.y;
            }",
        );
        assert_eq!(
            capabilities_of(&module),
            sorted(vec![
                C::Shader,
                C::UniformAndStorageBuffer8BitAccess,
                C::StorageBuffer8BitAccess,
            ])
        );
        assert_eq!(extensions_of(&module), ["SPV_KHR_8bit_storage"]);
    }
}

#[test]
fn sized_integer_built_ins_produce_valid_spirv() {
    {
        let module = compile_valid(
            ShaderStage::Compute,
            "#version 450
            #extension GL_EXT_shader_explicit_arithmetic_types : enable
            layout(local_size_x = 1) in;
            layout(binding = 0) buffer B {
                int64_t wide;
                i16vec2 pair;
                int8_t narrow;
                uint packed;
                f16vec2 halves;
                double real;
            };
            void main() {
                wide = int64_t(bitCount(wide)) + findMSB(wide) + findLSB(uint64_t(wide));
                narrow = bitfieldReverse(narrow) + int8_t(findMSB(narrow));
                pair = unpack16(pack32(pair));
                packed = packFloat2x16(halves);
                halves = unpackFloat2x16(packed);
                wide = packInt2x32(unpackInt2x32(wide)) + doubleBitsToInt64(real);
                pair = halfBitsToInt16(halves) + i16vec2(bitfieldExtract(pair.x, 1s, 2s));
            }",
        );
        assert!(has_capability(&module, spirv::Capability::Int64));
        assert!(has_capability(&module, spirv::Capability::Int16));
        assert!(has_capability(&module, spirv::Capability::Int8));
    }
}

#[test]
fn sixteen_bit_types_need_their_extension() {
    {
        let error = parse(
            ShaderStage::Fragment,
            "#version 450
            #extension GL_EXT_shader_16bit_storage : enable
            layout(binding = 0) buffer B { float16_t a; };
            void main() { a = a * a; }",
        )
        .unwrap_err();
        assert!(error.contains("cannot be applied"), "{error}");
        assert!(parse(
            ShaderStage::Fragment,
            "#version 450
            void main() { int64_t x = 1l; }",
        )
        .is_err());
        let error = parse(
            ShaderStage::Fragment,
            "#version 450
            #extension GL_EXT_unknown_thing : require
            void main() {}",
        )
        .unwrap_err();
        assert!(error.contains("GL_EXT_unknown_thing"), "{error}");
    }
}

#[test]
fn analysis_errors_before_a_syntax_error_are_reported_first() {
    {
        let source = "#version 450
#extension GL_EXT_shader_16bit_storage : enable
void f(float16_t x) {}
f16mat2 m;
void main() {}
";
        let errors = glsl::Frontend::default()
            .parse(&glsl::Options::from(ShaderStage::Fragment), source)
            .unwrap_err();
        let lines: Vec<u32> = errors
            .errors
            .iter()
            .map(|error| error.meta.location(source).line_number)
            .collect();
        assert_eq!(lines, [3, 4]);
    }
}

fn constant_words(module: &dr::Module) -> Vec<u32> {
    module
        .types_global_values
        .iter()
        .filter(|inst| inst.class.opcode == Op::Constant)
        .filter_map(|inst| match inst.operands[0] {
            Operand::LiteralBit32(value) => Some(value),
            _ => None,
        })
        .collect()
}

fn compile_words(stage: ShaderStage, source: &str, lang_version: (u8, u8)) -> Vec<u32> {
    let module = parse(stage, source).unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .expect("validated in parse");
    let options = spv::Options {
        lang_version,
        ..spv::Options::default()
    };
    spv::write_vec(&module, &info, &options, None).expect("SPIR-V backend failed")
}

fn raw_instructions(words: &[u32]) -> Vec<(u32, Vec<u32>)> {
    let mut found = Vec::new();
    let mut rest = &words[5..];
    while let Some(&first) = rest.first() {
        let count = (first >> 16) as usize;
        found.push((first & 0xffff, rest[1..count].to_vec()));
        rest = &rest[count..];
    }
    found
}

fn compile_for(stage: ShaderStage, source: &str, lang_version: (u8, u8)) -> dr::Module {
    let module = parse(stage, source).unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .expect("validated in parse");
    let options = spv::Options {
        lang_version,
        flags: spv::WriterFlags::DEBUG | spv::WriterFlags::LABEL_VARYINGS,
        force_loop_bounding: false,
        zero_initialize_workgroup_memory: spv::ZeroInitializeWorkgroupMemoryMode::None,
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None).expect("SPIR-V backend failed");
    dr::load_words(words).expect("produced SPIR-V does not parse")
}

fn global_value(module: &dr::Module, id: u32) -> &dr::Instruction {
    module
        .types_global_values
        .iter()
        .find(|inst| inst.result_id == Some(id))
        .unwrap_or_else(|| panic!("%{id} is not a global value"))
}

fn id_operand(operand: &Operand) -> u32 {
    match *operand {
        Operand::IdRef(id) => id,
        ref other => panic!("operand {other:?} is not an id"),
    }
}

fn spec_ids(module: &dr::Module) -> Vec<(u32, u32)> {
    let mut found: Vec<(u32, u32)> = module
        .annotations
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::Decorate
                && inst.operands[1] == Operand::Decoration(Decoration::SpecId)
        })
        .map(|inst| {
            let spec = match inst.operands[2] {
                Operand::LiteralBit32(value) => value,
                ref other => panic!("unexpected SpecId operand {other:?}"),
            };
            (spec, id_operand(&inst.operands[0]))
        })
        .collect();
    found.sort_unstable();
    found
}

fn spec_operations(module: &dr::Module) -> Vec<Op> {
    instructions(module, Op::SpecConstantOp)
        .into_iter()
        .map(|inst| match inst.operands[0] {
            Operand::LiteralSpecConstantOpInteger(op) => op,
            ref other => panic!("unexpected spec constant operation {other:?}"),
        })
        .collect()
}

#[test]
fn constant_folding_follows_glslang_outside_the_domain() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) out vec4 o;
        layout(location = 1) out ivec4 i;
        void main() {
            float x = asin(2.0) + acos(-3.0) + log(-1.0) + log2(0.0) + sqrt(-4.0)
                + acosh(0.5) + atanh(2.0) + exp(1000.0) + exp2(1000.0) + cosh(1000.0)
                + sinh(1000.0) + pow(-2.0, 0.5) + inversesqrt(0.0) + 0.0 / 0.0
                + length(vec2(1e30)) + dot(vec2(1e30), vec2(1e30)) + normalize(vec2(0.0)).x;
            o = vec4(x, clamp(1.0, 3.0, 2.0), float(sqrt(4.0lf) + floor(1.5lf)), 0.0);
            int s = (1 << 33) + (7 >> 40) + (-8 >> 33) + int(1u << 32) + clamp(1, 3, 2) + 5 % 0;
            i = ivec4(s, 5 / 0, int(5u / 0u), 0);
        }",
    );
    let words = constant_words(&module);
    for expected in [6_u32, i32::MAX.cast_unsigned(), u32::MAX, 2.0_f32.to_bits()] {
        assert!(words.contains(&expected), "{expected:#x} in {words:x?}");
    }
    assert!(
        words.iter().any(|&word| f32::from_bits(word).is_nan()),
        "{words:x?}"
    );
}

#[test]
fn extended_integer_arithmetic_and_scalar_refract() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) flat in uvec2 a;
        layout(location = 1) flat in ivec3 b;
        layout(location = 2) in float f;
        layout(location = 0) out uvec4 o;
        layout(location = 1) out ivec3 p;
        layout(location = 2) out float r;
        void main() {
            uint carry;
            uvec2 borrow;
            uint sum = uaddCarry(a.x, a.y, carry);
            uvec2 difference = usubBorrow(a, a.yx, borrow);
            uvec4 product = uvec4(0u);
            umulExtended(a.x, 7u, product.x, product.y);
            ivec3 high, low;
            imulExtended(b, b.zyx, high, low);
            o = uvec4(sum + carry, difference + borrow, 0u) + product;
            p = high + low;
            r = refract(f, 1.0, 0.5);
        }",
    );
    for op in [
        Op::IAddCarry,
        Op::ISubBorrow,
        Op::UMulExtended,
        Op::SMulExtended,
    ] {
        assert_eq!(instructions(&module, op).len(), 1, "{op:?}");
    }
}

fn function_ops(module: &dr::Module) -> Vec<Op> {
    module
        .functions
        .iter()
        .flat_map(|function| function.blocks.iter())
        .flat_map(|block| block.instructions.iter())
        .map(|inst| inst.class.opcode)
        .collect()
}

#[test]
fn specialization_constants_match_glslang() {
    let module = compile(
        ShaderStage::Fragment,
        r#"#version 450
layout(constant_id = 1) const int N = 5;
layout(constant_id = 4) const float F = 1.5;
layout(constant_id = 6) const uint U = 2;
layout(constant_id = 7) const bool B = true;
const vec3 V = vec3(F, 2.0, F);
const ivec2 IV = ivec2(N);
const bool C = N > 2 && U < 3u;
const uint UN = uint(N) + U;
const int NN = -N + int(U);
const float FD = float(double(F));
const int SEL = C ? N : 3;
const int SW = IV.y;
layout(location = 0) out vec4 o;
void main() {
  o = vec4(V, float(NN + SEL + SW)) * F * 2.0;
  o.x += float(UN) + FD;
  if (B) o.y = 0.0;
}
"#,
    );
    let ids = spec_ids(&module);
    assert_eq!(
        ids.iter().map(|&(spec, _)| spec).collect::<Vec<_>>(),
        [1, 4, 6, 7]
    );
    let default = |spec: u32| {
        let id = ids.iter().find(|&&(s, _)| s == spec).unwrap().1;
        global_value(&module, id).clone()
    };
    assert_eq!(default(1).class.opcode, Op::SpecConstant);
    assert_eq!(default(1).operands, [Operand::LiteralBit32(5)]);
    assert_eq!(
        default(4).operands,
        [Operand::LiteralBit32(1.5f32.to_bits())]
    );
    assert_eq!(default(6).operands, [Operand::LiteralBit32(2)]);
    assert_eq!(default(7).class.opcode, Op::SpecConstantTrue);
    let ops = spec_operations(&module);
    for expected in [
        Op::SGreaterThan,
        Op::ULessThan,
        Op::LogicalAnd,
        Op::IAdd,
        Op::SNegate,
        Op::FConvert,
        Op::Select,
        Op::CompositeExtract,
    ] {
        assert!(ops.contains(&expected), "missing {expected:?} in {ops:?}");
    }
    assert!(!ops.contains(&Op::FMul));
    assert_eq!(instructions(&module, Op::SpecConstantComposite).len(), 2);
    let body = function_ops(&module);
    assert!(body.contains(&Op::VectorTimesScalar));
    assert!(body.contains(&Op::ConvertSToF));
}

#[test]
fn specialization_constant_array_sizes() {
    let module = compile(
        ShaderStage::Compute,
        r#"#version 450
layout(local_size_x = 1) in;
layout(constant_id = 0) const int N = 3;
const int M = N * 2;
struct S { int v[N]; };
layout(std430, binding = 0) buffer Out { int total; S s; float tail[M]; };
void main() {
  int local[N + 1];
  local[0] = 1;
  total = local.length() + s.v.length() + tail.length() + local[0];
}
"#,
    );
    let lengths: Vec<Op> = instructions(&module, Op::TypeArray)
        .iter()
        .map(|inst| {
            global_value(&module, id_operand(&inst.operands[1]))
                .class
                .opcode
        })
        .collect();
    assert!(lengths.contains(&Op::SpecConstant));
    assert!(lengths.contains(&Op::SpecConstantOp));
    assert!(lengths
        .iter()
        .all(|&op| matches!(op, Op::SpecConstant | Op::SpecConstantOp)));
    assert_eq!(spec_ids(&module).len(), 1);
    assert!(spec_operations(&module).contains(&Op::IMul));
    assert!(!function_ops(&module).contains(&Op::ArrayLength));
}

#[test]
fn specialized_workgroup_size() {
    let source = r#"#version 450
layout(local_size_x_id = 18, local_size_z_id = 19) in;
layout(local_size_x = 32, local_size_y = 4) in;
layout(std430, binding = 0) buffer Out { uint a; };
shared uint tile[gl_WorkGroupSize.x * gl_WorkGroupSize.y];
void main() {
  tile[0] = 1u;
  a = gl_WorkGroupSize.x * gl_WorkGroupSize.y * gl_WorkGroupSize.z + tile[0];
}
"#;
    let module = compile_for(ShaderStage::Compute, source, (1, 0));
    let ids = spec_ids(&module);
    assert_eq!(
        ids.iter().map(|&(spec, _)| spec).collect::<Vec<_>>(),
        [18, 19]
    );
    assert_eq!(
        global_value(&module, ids[0].1).operands,
        [Operand::LiteralBit32(32)]
    );
    assert_eq!(
        global_value(&module, ids[1].1).operands,
        [Operand::LiteralBit32(1)]
    );
    let builtin = module
        .annotations
        .iter()
        .find(|inst| inst.operands.get(2) == Some(&Operand::BuiltIn(spirv::BuiltIn::WorkgroupSize)))
        .expect("no WorkgroupSize decoration");
    let composite = global_value(&module, id_operand(&builtin.operands[0]));
    assert_eq!(composite.class.opcode, Op::SpecConstantComposite);
    assert_eq!(id_operand(&composite.operands[0]), ids[0].1);
    assert_eq!(id_operand(&composite.operands[2]), ids[1].1);
    assert_eq!(instructions(&module, Op::SpecConstantComposite).len(), 1);
    let mode = instructions(&module, Op::ExecutionMode);
    assert_eq!(
        mode[0].operands[1..],
        [
            Operand::ExecutionMode(spirv::ExecutionMode::LocalSize),
            Operand::LiteralBit32(32),
            Operand::LiteralBit32(4),
            Operand::LiteralBit32(1),
        ]
    );
    assert!(spec_operations(&module).contains(&Op::CompositeExtract));

    let raw = raw_instructions(&compile_words(ShaderStage::Compute, source, (1, 6)));
    let find = |op: Op| {
        raw.iter()
            .filter(move |&&(code, _)| code == op as u32)
            .map(|(_, operands)| operands.clone())
    };
    assert!(find(Op::Decorate).all(|operands| operands[1..]
        != [
            Decoration::BuiltIn as u32,
            spirv::BuiltIn::WorkgroupSize as u32
        ]));
    let mode = find(Op::ExecutionModeId)
        .next()
        .expect("no ExecutionModeId");
    assert_eq!(mode[1], spirv::ExecutionMode::LocalSizeId as u32);
    let spec_of = |id: u32| {
        find(Op::Decorate)
            .find(|operands| operands[0] == id && operands[1] == Decoration::SpecId as u32)
            .map(|operands| operands[2])
    };
    assert_eq!(spec_of(mode[2]), Some(18));
    assert_eq!(spec_of(mode[3]), None);
    assert_eq!(spec_of(mode[4]), Some(19));
    assert!(find(Op::Constant).any(|operands| operands[1] == mode[3] && operands[2] == 4));
}

#[test]
fn specialization_constant_swizzles() {
    let raw = raw_instructions(&compile_words(
        ShaderStage::Fragment,
        r#"#version 450
layout(constant_id = 0) const int N = 3;
const ivec3 V = ivec3(N, 1, N + 1);
const ivec2 S = V.zx;
layout(location = 0) out ivec2 o;
void main() { o = S; }
"#,
        (1, 0),
    ));
    let shuffle = raw
        .iter()
        .find(|&&(code, ref operands)| {
            code == Op::SpecConstantOp as u32 && operands[2] == Op::VectorShuffle as u32
        })
        .expect("no OpSpecConstantOp VectorShuffle");
    assert_eq!(shuffle.1[3], shuffle.1[4]);
    assert_eq!(shuffle.1[5..], [2, 0]);
}

#[test]
fn specialization_constant_errors() {
    let case = parse(
        ShaderStage::Fragment,
        r#"#version 450
layout(constant_id = 0) const int N = 3;
layout(location = 0) out vec4 o;
void main() {
  switch (int(o.x)) { case N: o = vec4(1.0); break; default: break; }
}
"#,
    );
    assert!(case.unwrap_err().contains("case label"));
    let derived = parse(
        ShaderStage::Fragment,
        r#"#version 450
layout(constant_id = 0) const int N = 3;
layout(constant_id = 1) const int M = N * 2;
layout(location = 0) out vec4 o;
void main() { o = vec4(M); }
"#,
    );
    assert!(derived.unwrap_err().contains("constant_id"));
    let floating = parse(
        ShaderStage::Fragment,
        r#"#version 450
layout(constant_id = 0) const float F = 3.0;
const float G = F * 2.0;
layout(location = 0) out vec4 o;
void main() { o = vec4(G); }
"#,
    );
    assert!(floating.is_err());
}

#[test]
fn specialization_constants_baked_by_process_overrides() {
    let module = parse(
        ShaderStage::Compute,
        r#"#version 450
layout(local_size_x = 1) in;
layout(constant_id = 3) const int N = 3;
const int M = N + 1;
shared int tile[M];
layout(std430, binding = 0) buffer Out { int a; };
void main() { tile[0] = M * 2; a = tile[0]; }
"#,
    )
    .unwrap();
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .unwrap();
    let constants = rglsl::back::PipelineConstants::from_iter([("3".to_string(), 7.0)]);
    let (module, info) =
        rglsl::back::pipeline_constants::process_overrides(&module, &info, None, &constants)
            .unwrap();
    let words = spv::write_vec(&module, &info, &spv::Options::default(), None).unwrap();
    let module = dr::load_words(words).unwrap();
    assert!(spec_ids(&module).is_empty());
    assert!(instructions(&module, Op::SpecConstantOp).is_empty());
    let array = instructions(&module, Op::TypeArray)[0];
    assert_eq!(constant(&module, &array.operands[1]), 8);
}

#[test]
fn arrays_of_buffer_blocks_match_glslang() {
    let source = "#version 450
        layout(local_size_x = 1) in;
        struct S { vec4 x; float y[2]; };
        uniform U { vec4 a; S s; } u[4];
        layout(std430) buffer B { float f; vec4 r[]; } b[2];
        layout(std430) buffer C { uint n; } c[];
        uniform I { vec4 sized[]; vec4 one[]; } implicit;
        layout(push_constant) uniform P { int i; } pc;
        void main() {
            S t = u[pc.i].s;
            b[1].r[pc.i] = u[2].a + t.x + implicit.sized[3] + implicit.one[0];
            b[0].f = float(b[1].r.length()) + u[pc.i].s.y[1];
            c[3].n = 1u;
        }";
    let options = glsl::Options {
        auto_map_bindings: true,
        ..glsl::Options::from(ShaderStage::Compute)
    };
    let module = glsl::Frontend::default().parse(&options, source).unwrap();
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .unwrap();
    let words = spv::write_vec(
        &module,
        &info,
        &spv::Options {
            flags: spv::WriterFlags::DEBUG,
            ..spv::Options::default()
        },
        None,
    )
    .expect("SPIR-V backend failed");
    crate::stage_io::spirv_val(&words);
    let module = dr::load_words(words).expect("produced SPIR-V does not parse");
    for (name, binding) in [("u", 0), ("b", 1), ("c", 2), ("implicit", 3)] {
        assert_eq!(
            sorted_variable_decorations(&module, name),
            [
                (Decoration::Binding, vec![binding]),
                (Decoration::DescriptorSet, vec![0])
            ],
            "{name}"
        );
    }
    let mut blocks = decorated(&module, Decoration::Block);
    blocks.sort_unstable();
    assert_eq!(blocks, ["B", "C", "I", "P", "U"]);
    assert_eq!(array_lengths(&module), [1, 2, 2, 2, 4, 4, 4]);
}

#[test]
fn function_variables_have_no_explicit_layout() {
    let module = parse(
        ShaderStage::Compute,
        "#version 450 core
        layout(local_size_x = 64) in;
        layout(set = 0, binding = 0, std430) buffer foo { int x[4]; } f;
        struct Bar { uint x; uint y; uint z[2]; };
        struct Small { int a; };
        layout(set = 0, binding = 1, std430) buffer foo2 { uvec4 a; Bar b; uint c; Small s; };
        void main() {
            int x[4] = f.x;
            x[1] = 2;
            f.x = x;
            Bar new_bar;
            b = new_bar;
            Small small = s;
            s = small;
        }",
    )
    .unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .unwrap();
    let options = spv::Options {
        lang_version: (1, 6),
        flags: spv::WriterFlags::DEBUG,
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None).expect("SPIR-V backend failed");
    crate::stage_io::spirv_val_in(&words, &["--target-env", "vulkan1.3"]);
    let module = dr::load_words(words).expect("produced SPIR-V does not parse");
    let laid_out: Vec<u32> = module
        .annotations
        .iter()
        .filter(|inst| match inst.class.opcode {
            Op::Decorate => inst.operands[1] == Operand::Decoration(Decoration::ArrayStride),
            Op::MemberDecorate => inst.operands[2] == Operand::Decoration(Decoration::Offset),
            _ => false,
        })
        .map(|inst| inst.operands[0].unwrap_id_ref())
        .collect();
    let function_pointers = module.types_global_values.iter().filter(|inst| {
        inst.class.opcode == Op::TypePointer
            && inst.operands[0] == Operand::StorageClass(spirv::StorageClass::Function)
    });
    for pointer in function_pointers {
        assert!(!laid_out.contains(&pointer.operands[1].unwrap_id_ref()));
    }
    assert!(!instructions(&module, Op::CopyLogical).is_empty());
}

#[test]
fn layout_free_copies_before_spirv_1_4() {
    let source = "#version 450 core
        layout(local_size_x = 64) in;
        layout(set = 0, binding = 0, std430) buffer foo { int x[4]; } f;
        struct Inner { uint a; uint b[2]; };
        struct Bar { uint x; Inner inner[2]; };
        layout(set = 0, binding = 1, std430) buffer foo2 { Bar b; Bar bars[]; };
        shared int tile[4];
        struct Holder { int v[4]; };
        shared Holder holder;
        int global_copy[4] = int[4](1, 2, 3, 4);
        void main() {
            holder.v = f.x;
            Holder local_holder = holder;
            f.x = local_holder.v;
            int x[4] = f.x;
            x[1] = 2;
            f.x = x;
            tile = f.x;
            global_copy = tile;
            Bar copy = b;
            copy.inner[1].b[0] = uint(global_copy[gl_LocalInvocationIndex % 4u]);
            bars[1] = copy;
            uint dynamic = b.inner[gl_LocalInvocationIndex % 2u].b[1];
            int y[4] = int[4](5, 6, 7, 8);
            int spilled = int[4](1, 2, 3, int(dynamic))[gl_LocalInvocationIndex % 4u];
            f.x[0] = int(dynamic) + x[gl_LocalInvocationIndex % 4u] + spilled + y[dynamic];
        }";
    let module =
        parse(ShaderStage::Compute, source).unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .unwrap();
    for (lang_version, env) in [((1, 0), "vulkan1.0"), ((1, 6), "vulkan1.3")] {
        let options = spv::Options {
            lang_version,
            flags: spv::WriterFlags::DEBUG,
            ..spv::Options::default()
        };
        let words = spv::write_vec(&module, &info, &options, None).expect("SPIR-V backend failed");
        crate::stage_io::spirv_val_in(&words, &["--target-env", env]);
        let spirv = dr::load_words(words).expect("produced SPIR-V does not parse");
        assert_eq!(
            instructions(&spirv, Op::CopyLogical).is_empty(),
            lang_version < (1, 4)
        );
    }
}

#[test]
fn unsized_arrays_of_opaque_types_match_glslang() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform sampler2D s[];
        layout(binding = 1) uniform texture2D t[];
        layout(binding = 2) uniform sampler sm;
        layout(binding = 3) uniform sampler2D unused[];
        layout(binding = 4) buffer B { uint n; } b[];
        layout(location = 0) out vec4 o;
        void main() {
            o = texture(s[2], vec2(0.5)) + texture(sampler2D(t[1], sm), vec2(0.5));
        }",
    );
    assert_eq!(array_lengths(&module), [1, 1, 2, 3]);
    assert!(instructions(&module, Op::TypeRuntimeArray).is_empty());
    assert!(!has_capability(
        &module,
        spirv::Capability::RuntimeDescriptorArray
    ));

    let error = parse(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform sampler2D s[];
        layout(location = 0) flat in int i;
        layout(location = 0) out vec4 o;
        void main() { o = texture(s[i], vec2(0.5)); }",
    )
    .unwrap_err();
    assert!(error.contains("non-constant"), "{error}");
}

#[test]
fn specialization_constant_texture_offsets_are_constant() {
    let module = compile(
        ShaderStage::Fragment,
        r#"#version 450
layout(constant_id = 1) const int offs = 0;
layout(binding = 0) uniform sampler2D tex;
layout(location = 0) out vec4 color_out;
void main() {
  color_out = textureLodOffset(tex, vec2(0.0), 0.0, ivec2(offs, offs));
}
"#,
    );
    let sample = instructions(&module, Op::ImageSampleExplicitLod)[0];
    assert_eq!(
        sample.operands[2],
        Operand::ImageOperands(spirv::ImageOperands::LOD | spirv::ImageOperands::CONST_OFFSET)
    );
    let offset = global_value(&module, id_operand(&sample.operands[4]));
    assert_eq!(offset.class.opcode, Op::SpecConstantComposite);
    assert!(!module.capabilities.iter().any(
        |inst| inst.operands[0] == Operand::Capability(spirv::Capability::ImageGatherExtended)
    ));
}

#[test]
fn unsigned_specialization_conversions_avoid_uconvert_before_spirv_1_4() {
    let source = r#"#version 450
#extension GL_EXT_shader_explicit_arithmetic_types : require
layout(local_size_x = 1) in;
layout(constant_id = 0) const uint su = 0xffffffffu;
layout(constant_id = 1) const uint16_t su16 = 0x8001us;
layout(constant_id = 2) const uint64_t su64 = 0x8000000000000001ul;
const uint16_t u_to_u16 = uint16_t(su);
const uint u16_to_u = uint(su16);
const uint u64_to_u = uint(su64);
const uint64_t u_to_u64 = uint64_t(su);
layout(std430, binding = 0) buffer Out { uint a; };
void main() {
  a = uint(u_to_u16) + u16_to_u + u64_to_u + uint(u_to_u64);
}
"#;
    let old = spec_operations(&compile_for(ShaderStage::Compute, source, (1, 0)));
    assert!(!old.contains(&Op::UConvert), "{old:?}");
    assert!(old.contains(&Op::SConvert));
    assert!(old.contains(&Op::BitwiseAnd));
    let new = spec_operations(&compile_for(ShaderStage::Compute, source, (1, 4)));
    assert!(new.contains(&Op::UConvert), "{new:?}");
}

fn non_uniform_ops(module: &dr::Module) -> Vec<Op> {
    let decorated: Vec<u32> = module
        .annotations
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::Decorate
                && inst.operands[1] == Operand::Decoration(Decoration::NonUniform)
        })
        .map(|inst| inst.operands[0].unwrap_id_ref())
        .collect();
    module
        .functions
        .iter()
        .flat_map(|function| {
            function.parameters.iter().chain(
                function
                    .blocks
                    .iter()
                    .flat_map(|block| block.instructions.iter()),
            )
        })
        .filter(|inst| inst.result_id.is_some_and(|id| decorated.contains(&id)))
        .map(|inst| inst.class.opcode)
        .collect()
}

fn capabilities(module: &dr::Module) -> Vec<spirv::Capability> {
    module
        .capabilities
        .iter()
        .filter_map(|inst| match inst.operands[0] {
            Operand::Capability(capability) => Some(capability),
            _ => None,
        })
        .collect()
}

fn uses_descriptor_indexing(module: &dr::Module) -> bool {
    module.extensions.iter().any(|inst| {
        inst.operands[0] == Operand::LiteralString("SPV_EXT_descriptor_indexing".to_string())
    })
}

#[test]
fn nonuniform_index_decorates_the_descriptor_access() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        layout(set = 0, binding = 0) uniform UBO { vec4 v; } ubos[];
        void main() {
            o = ubos[nonuniformEXT(index)].v;
        }",
    );
    assert_eq!(
        non_uniform_ops(&module),
        [Op::Load, Op::AccessChain, Op::Load]
    );
    let capabilities = capabilities(&module);
    for capability in [
        spirv::Capability::ShaderNonUniform,
        spirv::Capability::RuntimeDescriptorArray,
        spirv::Capability::UniformBufferArrayNonUniformIndexing,
    ] {
        assert!(capabilities.contains(&capability), "{capability:?}");
    }
    assert!(uses_descriptor_indexing(&module));
    assert_eq!(instructions(&module, Op::TypeRuntimeArray).len(), 1);
}

#[test]
fn nonuniform_texel_buffer_and_image_accesses() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(set = 0, binding = 0, rgba32f) uniform imageBuffer data[];
        layout(set = 0, binding = 1) uniform samplerBuffer texels[];
        layout(set = 0, binding = 2, r32f) uniform image2D images[];
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        void main() {
            o = imageLoad(data[nonuniformEXT(index)], 0);
            o += texelFetch(texels[nonuniformEXT(index)], 1);
            imageStore(images[nonuniformEXT(index)], ivec2(0), o);
        }",
    );
    assert_eq!(
        non_uniform_ops(&module),
        [
            Op::Load,
            Op::AccessChain,
            Op::Load,
            Op::Load,
            Op::AccessChain,
            Op::Load,
            Op::Image,
            Op::Load,
            Op::AccessChain,
            Op::Load,
        ]
    );
    let capabilities = capabilities(&module);
    for capability in [
        spirv::Capability::StorageTexelBufferArrayNonUniformIndexing,
        spirv::Capability::UniformTexelBufferArrayNonUniformIndexing,
        spirv::Capability::StorageImageArrayNonUniformIndexing,
    ] {
        assert!(capabilities.contains(&capability), "{capability:?}");
    }
}

#[test]
fn nonuniform_sampler_constructor_decorates_the_sampled_image() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(set = 0, binding = 0) uniform texture2D textures[];
        layout(set = 1, binding = 0) uniform sampler samp;
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        void main() {
            o = texture(nonuniformEXT(sampler2D(textures[index], samp)), vec2(0.5));
        }",
    );
    assert_eq!(non_uniform_ops(&module), [Op::SampledImage]);
    let capabilities = capabilities(&module);
    assert!(capabilities.contains(&spirv::Capability::ShaderNonUniform));
    assert!(!capabilities.contains(&spirv::Capability::SampledImageArrayNonUniformIndexing));
}

#[test]
fn constructed_sampler_from_a_nonuniform_texture_is_not_non_uniform() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(set = 0, binding = 0) uniform texture2D textures[8];
        layout(set = 1, binding = 0) uniform sampler samp;
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        void main() {
            o = texture(sampler2D(textures[nonuniformEXT(index)], samp), vec2(0.5));
        }",
    );
    assert_eq!(
        non_uniform_ops(&module),
        [Op::Load, Op::AccessChain, Op::Load]
    );
    assert!(capabilities(&module).contains(&spirv::Capability::SampledImageArrayNonUniformIndexing));
    assert!(instructions(&module, Op::TypeRuntimeArray).is_empty());
}

#[test]
fn uniform_dynamic_indexing_of_texel_buffers_needs_descriptor_indexing() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform samplerBuffer texels[4];
        layout(binding = 1, r32f) uniform imageBuffer images[4];
        layout(binding = 2) uniform sampler2D textures[4];
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        void main() {
            o = texelFetch(texels[index], 0) + imageLoad(images[index], 0)
                + texture(textures[index], vec2(0.5));
        }",
    );
    assert!(non_uniform_ops(&module).is_empty());
    let capabilities = capabilities(&module);
    assert!(capabilities.contains(&spirv::Capability::UniformTexelBufferArrayDynamicIndexing));
    assert!(capabilities.contains(&spirv::Capability::StorageTexelBufferArrayDynamicIndexing));
    assert!(!capabilities.contains(&spirv::Capability::ShaderNonUniform));
    assert!(!capabilities.contains(&spirv::Capability::SampledImageArrayDynamicIndexing));
    assert!(uses_descriptor_indexing(&module));
}

#[test]
fn nonuniform_propagates_through_operators_but_not_conversions_or_calls() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(location = 0) flat in int index;
        layout(location = 0) out float o;
        void main() {
            nonuniformEXT int n = index;
            int sum = n + index;
            float converted = n + 1.5;
            int absolute = abs(n);
            float constructed = float(n);
            bool chosen = index > 0 ? n > 0 : false;
            o = float(sum) + converted + float(absolute) + constructed + float(chosen);
        }",
    );
    assert_eq!(
        non_uniform_ops(&module),
        [
            Op::Load,
            Op::IAdd,
            Op::Load,
            Op::Load,
            Op::Load,
            Op::Load,
            Op::SGreaterThan,
        ]
    );
}

#[test]
fn nonuniform_vectors_swizzles_and_assignments() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(location = 0) in vec4 color;
        layout(location = 0) out vec4 o;
        void main() {
            nonuniformEXT vec4 v = color;
            vec2 xy = v.xy;
            float b = 1.0;
            b += v.z;
            v *= 2.0;
            o = vec4(xy, b, v.w);
        }",
    );
    assert_eq!(
        non_uniform_ops(&module),
        [
            Op::Load,
            Op::VectorShuffle,
            Op::Load,
            Op::FAdd,
            Op::Load,
            Op::VectorTimesScalar,
            Op::Load,
        ]
    );
}

#[test]
fn nonuniform_function_results_parameters_and_out_arguments() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        layout(binding = 0) uniform U { vec4 v; } blocks[];
        nonuniformEXT int pick(nonuniformEXT int a, nonuniformEXT out int b) {
            b = a;
            return a;
        }
        void main() {
            nonuniformEXT int written;
            int chosen = pick(index, written);
            o = blocks[chosen].v + blocks[written].v;
        }",
    );
    let ops = non_uniform_ops(&module);
    assert_eq!(
        ops,
        [
            Op::Load,
            Op::Load,
            Op::FunctionCall,
            Op::Load,
            Op::Load,
            Op::AccessChain,
            Op::Load,
            Op::FAdd,
        ]
    );
}

#[test]
fn nonuniform_stores_decorate_the_access_chain() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(location = 0) flat in int index;
        layout(binding = 0) buffer B { float value; } buffers[];
        void main() {
            buffers[nonuniformEXT(index)].value = 1.0;
        }",
    );
    assert_eq!(non_uniform_ops(&module), [Op::Load, Op::AccessChain]);
    assert!(
        capabilities(&module).contains(&spirv::Capability::StorageBufferArrayNonUniformIndexing)
    );
}

#[test]
fn nonuniform_constant_and_global_operands_get_a_fresh_value() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(binding = 0) uniform U { vec4 v; } blocks[];
        layout(binding = 1) uniform sampler2D single;
        layout(location = 0) out vec4 o;
        void main() {
            o = blocks[nonuniformEXT(3)].v + texture(nonuniformEXT(single), vec2(0.5));
        }",
    );
    assert_eq!(
        non_uniform_ops(&module),
        [
            Op::Load,
            Op::AccessChain,
            Op::Load,
            Op::CopyObject,
            Op::FAdd
        ]
    );
}

#[test]
fn unsized_descriptor_arrays_indexed_with_constants_stay_sized() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(binding = 0) uniform sampler2D textures[];
        layout(location = 0) out vec4 o;
        void main() {
            o = texture(textures[2], vec2(0.5));
        }",
    );
    assert!(instructions(&module, Op::TypeRuntimeArray).is_empty());
    assert_eq!(array_lengths(&module), [3]);
    assert!(!capabilities(&module).contains(&spirv::Capability::RuntimeDescriptorArray));
}

#[test]
fn descriptor_indexing_is_core_in_spirv_1_5() {
    let module = compile_for(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(binding = 0) uniform sampler2D textures[];
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        void main() {
            o = texture(textures[nonuniformEXT(index)], vec2(0.5));
        }",
        (1, 5),
    );
    assert!(!uses_descriptor_indexing(&module));
    assert!(capabilities(&module).contains(&spirv::Capability::ShaderNonUniform));
}

#[test]
fn nonuniform_matrices_and_indexed_temporaries() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        void main() {
            nonuniformEXT int n = index;
            nonuniformEXT mat2 m = mat2(float(index));
            mat2 sum = m + mat2(2.0);
            mat2 product = m * mat2(2.0);
            int picked = int[3](1, 2, 3)[n];
            o = vec4(sum[0], product[1]) + vec4(picked);
        }",
    );
    assert_eq!(
        non_uniform_ops(&module),
        [
            Op::Load,
            Op::FAdd,
            Op::FAdd,
            Op::CompositeConstruct,
            Op::Load,
            Op::Load,
        ]
    );
}

fn physical_accesses(module: &dr::Module) -> Vec<(Op, u32)> {
    let mut found = Vec::new();
    for function in &module.functions {
        for block in &function.blocks {
            for inst in &block.instructions {
                let operands = match inst.class.opcode {
                    Op::Load => inst.operands.get(1..),
                    Op::Store => inst.operands.get(2..),
                    _ => None,
                };
                let Some(operands) = operands else {
                    continue;
                };
                if let [Operand::MemoryAccess(access), Operand::LiteralBit32(alignment), ..] =
                    operands
                {
                    if access.contains(spirv::MemoryAccess::ALIGNED) {
                        found.push((inst.class.opcode, *alignment));
                    }
                }
            }
        }
    }
    found
}

fn memory_masks(module: &dr::Module) -> Vec<(Op, spirv::MemoryAccess)> {
    let mut masks = Vec::new();
    for function in &module.functions {
        for block in &function.blocks {
            for inst in &block.instructions {
                let operand = match inst.class.opcode {
                    Op::Load => inst.operands.get(1),
                    Op::Store => inst.operands.get(2),
                    _ => None,
                };
                if let Some(&Operand::MemoryAccess(access)) = operand {
                    masks.push((inst.class.opcode, access));
                }
            }
        }
    }
    masks
}

fn physical_member_decorations(module: &dr::Module, decoration: Decoration) -> Vec<(String, u32)> {
    module
        .annotations
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::MemberDecorate
                && inst.operands[2] == Operand::Decoration(decoration)
        })
        .map(|inst| {
            let Operand::LiteralBit32(member) = inst.operands[1] else {
                panic!("member index");
            };
            let value = match inst.operands.get(3) {
                Some(&Operand::LiteralBit32(value)) => value,
                _ => 0,
            };
            (
                member_name_of(module, inst.operands[0].unwrap_id_ref(), member),
                value,
            )
        })
        .collect()
}

fn constants_64(module: &dr::Module) -> Vec<u64> {
    module
        .types_global_values
        .iter()
        .filter(|inst| inst.class.opcode == Op::Constant)
        .filter_map(|inst| match inst.operands.first() {
            Some(&Operand::LiteralBit64(value)) => Some(value),
            _ => None,
        })
        .collect()
}

#[test]
fn buffer_reference_addressing_model_and_layout() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_buffer_reference : enable
        layout(buffer_reference) buffer Node;
        layout(buffer_reference, std430) buffer Node {
            int value;
            Node next;
            vec3 position[2];
            mat3 basis;
        };
        layout(binding = 0, std430) buffer Root { Node head; } root;
        void main() { root.head.next.value = root.head.value; }",
    );
    assert!(module.capabilities.iter().any(|inst| inst.operands[0]
        == Operand::Capability(spirv::Capability::PhysicalStorageBufferAddresses)));
    let model = &module.memory_model.as_ref().expect("memory model").operands;
    assert_eq!(
        model[0],
        Operand::AddressingModel(spirv::AddressingModel::PhysicalStorageBuffer64)
    );
    assert!(!instructions(&module, Op::TypeForwardPointer).is_empty());
    let offsets = physical_member_decorations(&module, Decoration::Offset);
    for (name, offset) in [("value", 0), ("next", 8), ("position", 16), ("basis", 48)] {
        assert!(
            offsets.contains(&(String::from(name), offset)),
            "{offsets:?}"
        );
    }
    assert!(
        physical_member_decorations(&module, Decoration::MatrixStride)
            .contains(&(String::from("basis"), 16))
    );
    assert!(decorated(&module, Decoration::Block).contains(&String::from("Node")));
}

#[test]
fn buffer_reference_scalar_layout() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_buffer_reference : enable
        #extension GL_EXT_scalar_block_layout : enable
        layout(buffer_reference, scalar) buffer S { float a; vec3 b; vec3 c[2]; float d; };
        layout(binding = 0) buffer Root { S s; } root;
        void main() { root.s.d = root.s.c[1].y; }",
    );
    let offsets = physical_member_decorations(&module, Decoration::Offset);
    for (name, offset) in [("a", 0), ("b", 4), ("c", 16), ("d", 40)] {
        assert!(
            offsets.contains(&(String::from(name), offset)),
            "{offsets:?}"
        );
    }
    assert_eq!(physical_accesses(&module), [(Op::Load, 4), (Op::Store, 8)]);
}

#[test]
fn buffer_reference_aligned_operands() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_buffer_reference : enable
        layout(buffer_reference, std430) buffer B {
            layout(offset = 0) int a;
            layout(offset = 4) int b;
            layout(offset = 8) int c;
            layout(offset = 16) ivec4 v;
        };
        layout(buffer_reference, std430, buffer_reference_align = 8) buffer C { int x; int y; };
        layout(binding = 0, std430) buffer Root { B r; C s; } root;
        void main() {
            root.r.b = root.r.a;
            root.r.c = root.r.v.y;
            root.s.y = root.s.x;
        }",
    );
    assert_eq!(
        physical_accesses(&module),
        [
            (Op::Load, 16),
            (Op::Store, 4),
            (Op::Load, 4),
            (Op::Store, 8),
            (Op::Load, 8),
            (Op::Store, 4),
        ]
    );
}

#[test]
fn buffer_reference_loads_of_references_are_aligned_to_eight() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_buffer_reference : enable
        layout(buffer_reference) buffer A;
        layout(buffer_reference, buffer_reference_align = 4, std430) buffer B { uint x; A a; };
        layout(buffer_reference, buffer_reference_align = 64, std430) buffer A { uint y; };
        layout(binding = 0) buffer Root { B b; } root;
        void main() { root.b.a.y = root.b.x; }",
    );
    let mut accesses = physical_accesses(&module);
    accesses.sort_by_key(|&(op, alignment)| (op as u32, alignment));
    assert_eq!(accesses, [(Op::Load, 4), (Op::Load, 8), (Op::Store, 64)]);
}

#[test]
fn buffer_reference_arithmetic_uses_padded_block_size() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_buffer_reference2 : enable
        #extension GL_EXT_shader_explicit_arithmetic_types_int64 : enable
        layout(buffer_reference, buffer_reference_align = 8) buffer T { int x; bool y; };
        layout(buffer_reference) buffer U { int x; };
        layout(binding = 0) buffer Root { T t; U u; int64_t d; } root;
        void main() {
            T t = root.t;
            t[3].x = 1;
            (t - 2).x = 2;
            root.u = root.u + 5;
            root.d = (t + 1) - t;
        }",
    );
    let constants = constants_64(&module);
    for expected in [24, 16, 80, 8] {
        assert!(constants.contains(&expected), "{constants:?}");
    }
    assert!(!instructions(&module, Op::ConvertPtrToU).is_empty());
    assert!(!instructions(&module, Op::ConvertUToPtr).is_empty());
    assert!(!instructions(&module, Op::SDiv).is_empty());
}

#[test]
fn buffer_reference_constant_folding() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_buffer_reference2 : enable
        #extension GL_EXT_shader_explicit_arithmetic_types_int64 : enable
        layout(buffer_reference, buffer_reference_align = 64) buffer T { int x; };
        const uint64_t size = uint64_t(T(uint64_t(0)) + 1);
        layout(location = 0) out vec4 o;
        void main() { float a[int(size)]; o = vec4(a.length()); }",
    );
    let constants: Vec<u32> = module
        .types_global_values
        .iter()
        .filter(|inst| inst.class.opcode == Op::Constant)
        .filter_map(|inst| match inst.operands.first() {
            Some(&Operand::LiteralBit32(value)) => Some(value),
            _ => None,
        })
        .collect();
    assert!(constants.contains(&64), "{constants:?}");
}

#[test]
fn buffer_reference_uvec2_conversions_are_bitcasts() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_buffer_reference_uvec2 : enable
        layout(buffer_reference) buffer T { int x; };
        layout(location = 0) flat in uvec2 address;
        layout(location = 0) out uvec2 o;
        void main() { T t = T(address); t.x = 1; o = uvec2(t); }",
    );
    assert_eq!(instructions(&module, Op::Bitcast).len(), 2);
    assert!(instructions(&module, Op::ConvertUToPtr).is_empty());
}

#[test]
fn buffer_reference_pointer_decorations() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_buffer_reference : enable
        layout(buffer_reference) readonly buffer T { int x; };
        layout(binding = 0) buffer Root { T t; int v; } root;
        int f(const restrict T a) { return a.x; }
        int g(T b) { return b.x; }
        T global;
        void main() {
            restrict T local = root.t;
            T plain = root.t;
            global = plain;
            root.v = f(local) + g(plain) + global.x;
        }",
    );
    let aliased = decorated(&module, Decoration::AliasedPointer);
    for name in ["plain", "global", "b"] {
        assert!(aliased.contains(&String::from(name)), "{aliased:?}");
    }
    assert_eq!(decorated(&module, Decoration::RestrictPointer), ["local"]);
    let restrict = decorated(&module, Decoration::Restrict);
    assert!(restrict.contains(&String::from("a")), "{restrict:?}");
    assert!(decorated(&module, Decoration::Aliased).contains(&String::from("b")));
    assert!(
        physical_member_decorations(&module, Decoration::NonWritable)
            .contains(&(String::from("x"), 0))
    );
}

#[test]
fn buffer_reference_coherent_uses_vulkan_memory_model() {
    let module = compile(
        ShaderStage::Compute,
        "#version 450
        #extension GL_EXT_buffer_reference : require
        layout(local_size_x = 1) in;
        layout(buffer_reference, std430) buffer Ref { coherent uint c; volatile uint v; uint p; };
        layout(push_constant) uniform Push { Ref ref; } pc;
        void main() { pc.ref.c = pc.ref.v + pc.ref.p; }",
    );
    let model = &module.memory_model.as_ref().expect("memory model").operands;
    assert_eq!(model[1], Operand::MemoryModel(spirv::MemoryModel::Vulkan));
    let masks = memory_masks(&module);
    use spirv::MemoryAccess as Ma;
    assert!(masks.contains(&(
        Op::Load,
        Ma::VOLATILE | Ma::ALIGNED | Ma::MAKE_POINTER_VISIBLE | Ma::NON_PRIVATE_POINTER
    )));
    assert!(masks.contains(&(Op::Load, Ma::ALIGNED)));
    assert!(masks.contains(&(
        Op::Store,
        Ma::ALIGNED | Ma::MAKE_POINTER_AVAILABLE | Ma::NON_PRIVATE_POINTER
    )));
}

#[test]
fn buffer_reference_atomics() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_buffer_reference : enable
        layout(buffer_reference, std430) buffer T { uint x[]; };
        layout(binding = 0) buffer Root { T t; } root;
        layout(location = 0) flat in uint i;
        void main() { atomicAdd(root.t.x[i], 1u); }",
    );
    let atomics = instructions(&module, Op::AtomicIAdd);
    assert_eq!(atomics.len(), 1);
    assert_eq!(
        constant(&module, &atomics[0].operands[1]),
        spirv::Scope::Device as u32
    );
    assert_eq!(constant(&module, &atomics[0].operands[2]), 0);
}

#[test]
fn buffer_reference_errors() {
    let cases = [
        "layout(buffer_reference) buffer T { int x; };
        void main() { T a, b; bool c = a == b; }",
        "layout(buffer_reference) buffer T { int x; };
        const T a = T(uint64_t(2));
        void main() {}",
        "layout(buffer_reference) buffer T { int x[]; };
        void main() { T a; int n = a.x.length(); }",
        "layout(buffer_reference) buffer T { int x[]; };
        void main() { T a; a[1]; }",
        "layout(buffer_reference) buffer T { int x; };
        void main() { T a; a + 1; }",
        "layout(buffer_reference) buffer T { int x; };
        layout(location = 0) flat in T t;
        void main() {}",
        "layout(buffer_reference) uniform T { int x; };
        void main() {}",
        "layout(buffer_reference) buffer;
        void main() {}",
        "layout(buffer_reference) buffer T { int x; };
        layout(location = 0) flat in uvec2 u;
        void main() { T t = T(u); }",
        "layout(buffer_reference, buffer_reference_align = 3) buffer T { int x; };
        void main() {}",
        "layout(buffer_reference) buffer T { int x; };
        layout(buffer_reference) buffer U { int x; };
        void main() { T t; U u = t; }",
        "layout(buffer_reference) writeonly buffer T { int x; };
        void main() { T t; int v = t.x; }",
        "layout(buffer_reference) readonly buffer T { int x; };
        void main() { T t; t.x = 1; }",
    ];
    for case in cases {
        let source = format!(
            "#version 450
            #extension GL_EXT_buffer_reference : enable
            #extension GL_EXT_shader_explicit_arithmetic_types_int64 : enable
            {case}"
        );
        assert!(
            parse(ShaderStage::Fragment, &source).is_err(),
            "accepted: {case}"
        );
    }
}

#[test]
fn reference_strides_agree_with_block_layouts() {
    for packing in ["std140", "std430", "scalar"] {
        let source = format!(
            "#version 450
            #extension GL_EXT_buffer_reference2 : require
            #extension GL_EXT_scalar_block_layout : require
            #extension GL_EXT_shader_explicit_arithmetic_types_int64 : require
            struct Inner {{ vec3 a; float b[3]; mat3x2 m; }};
            layout({packing}, buffer_reference, buffer_reference_align = 16) buffer Node {{
                float f;
                vec3 v;
                dvec2 d;
                mat2 m2;
                layout(row_major) mat3 m3;
                Inner inner[2];
                bool flag;
                ivec3 tail;
            }};
            layout(push_constant) uniform P {{ Node node; }};
            layout(location = 0) out vec4 o;
            void main() {{
                Node next = node + 3;
                o = vec4(next.v, float(uint64_t(next) - uint64_t(node)));
            }}"
        );
        let module = parse(ShaderStage::Fragment, &source)
            .unwrap_or_else(|e| panic!("{packing}: shader rejected: {e}"));
        let info = Validator::new(ValidationFlags::all(), Capabilities::all())
            .validate(&module)
            .unwrap();
        let words = spv::write_vec(&module, &info, &spv::Options::default(), None)
            .expect("SPIR-V backend failed");
        crate::stage_io::spirv_val_in(
            &words,
            &["--target-env", "vulkan1.0", "--scalar-block-layout"],
        );
    }
}

fn image_type_operands(module: &dr::Module) -> Vec<Vec<Operand>> {
    instructions(module, Op::TypeImage)
        .into_iter()
        .map(|inst| inst.operands[1..].to_vec())
        .collect()
}

fn literal_operands(module: &dr::Module, decoration: Decoration) -> Vec<u32> {
    module
        .annotations
        .iter()
        .filter(|inst| inst.operands[1] == Operand::Decoration(decoration))
        .map(|inst| match inst.operands[2] {
            Operand::LiteralBit32(value) => value,
            ref other => panic!("unexpected operand {other:?}"),
        })
        .collect()
}

#[test]
fn subpass_inputs_are_read_at_the_fragment() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        layout(input_attachment_index = 1, set = 0, binding = 0) uniform subpassInput color;
        layout(input_attachment_index = 2, set = 0, binding = 1) uniform isubpassInputMS samples;
        layout(location = 0) out vec4 o;
        layout(location = 1) out ivec4 i;
        void read(isubpassInputMS s) {
            i += subpassLoad(s, 2);
        }
        void main() {
            o = subpassLoad(color);
            i = subpassLoad(samples, 3);
            read(samples);
        }",
    );
    let subpass = |multi: u32| {
        vec![
            Operand::Dim(spirv::Dim::DimSubpassData),
            Operand::LiteralBit32(0),
            Operand::LiteralBit32(0),
            Operand::LiteralBit32(multi),
            Operand::LiteralBit32(2),
            Operand::ImageFormat(spirv::ImageFormat::Unknown),
        ]
    };
    let types = image_type_operands(&module);
    assert!(types.contains(&subpass(0)), "{types:?}");
    assert!(types.contains(&subpass(1)), "{types:?}");
    let reads = instructions(&module, Op::ImageRead);
    assert_eq!(reads.len(), 3);
    for read in &reads {
        let coordinate = read.operands[1].unwrap_id_ref();
        let composite = module
            .types_global_values
            .iter()
            .find(|inst| inst.result_id == Some(coordinate))
            .expect("the coordinate is a constant");
        assert_eq!(composite.class.opcode, Op::ConstantComposite);
        for component in &composite.operands {
            assert_eq!(constant(&module, component), 0);
        }
    }
    let mut samples: Vec<u32> = reads
        .iter()
        .filter(|read| read.operands.len() == 4)
        .map(|read| {
            assert_eq!(
                read.operands[2],
                Operand::ImageOperands(spirv::ImageOperands::SAMPLE)
            );
            constant(&module, &read.operands[3])
        })
        .collect();
    samples.sort_unstable();
    assert_eq!(samples, [2, 3]);
    assert!(instructions(&module, Op::ImageFetch).is_empty());
    assert_eq!(
        decorated(&module, Decoration::InputAttachmentIndex),
        ["color", "samples"]
    );
    assert_eq!(
        literal_operands(&module, Decoration::InputAttachmentIndex),
        [1, 2]
    );
    assert!(capabilities(&module).contains(&spirv::Capability::InputAttachment));
}

#[test]
fn optional_input_attachment_index_is_not_decorated() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 460
        #extension GL_EXT_optional_input_attachment_index : enable
        layout(set = 0, binding = 0) uniform subpassInput ia;
        layout(location = 0) out vec4 o;
        void main() {
            o = subpassLoad(ia);
        }",
    );
    assert!(decorated(&module, Decoration::InputAttachmentIndex).is_empty());
    assert_eq!(instructions(&module, Op::ImageRead).len(), 1);
}

#[test]
fn subpass_input_arrays_declare_the_indexing_capabilities() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(binding = 0, input_attachment_index = 0) uniform subpassInput dynamic[];
        layout(binding = 1, input_attachment_index = 1) uniform subpassInput nonUniform[];
        layout(binding = 2, input_attachment_index = 2) uniform subpassInput sized[4];
        layout(location = 0) flat in int index;
        layout(location = 0) out vec4 o;
        void main() {
            int uniformIndex = index;
            o = subpassLoad(dynamic[uniformIndex]);
            o += subpassLoad(nonUniform[nonuniformEXT(index)]);
            o += subpassLoad(sized[2]);
        }",
    );
    assert_eq!(
        non_uniform_ops(&module),
        [Op::Load, Op::AccessChain, Op::Load]
    );
    let capabilities = capabilities(&module);
    for capability in [
        spirv::Capability::InputAttachment,
        spirv::Capability::RuntimeDescriptorArray,
        spirv::Capability::ShaderNonUniform,
        spirv::Capability::InputAttachmentArrayDynamicIndexing,
        spirv::Capability::InputAttachmentArrayNonUniformIndexing,
    ] {
        assert!(capabilities.contains(&capability), "{capability:?}");
    }
    assert!(uses_descriptor_indexing(&module));
    assert_eq!(instructions(&module, Op::TypeRuntimeArray).len(), 1);
    assert_eq!(
        literal_operands(&module, Decoration::InputAttachmentIndex),
        [0, 1, 2]
    );
}

#[test]
fn nonuniform_subpass_input_is_copied() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(binding = 0, input_attachment_index = 0) uniform subpassInput ia;
        layout(location = 0) out vec4 o;
        void main() {
            o = subpassLoad(nonuniformEXT(ia));
        }",
    );
    assert_eq!(non_uniform_ops(&module), [Op::CopyObject]);
}

#[test]
fn subpass_input_errors() {
    let cases = [
        (
            ShaderStage::Vertex,
            "layout(input_attachment_index = 0, binding = 0) uniform subpassInput s;",
            "not supported in this stage",
        ),
        (
            ShaderStage::Vertex,
            "void f(subpassInput s) {}",
            "not supported in this stage",
        ),
        (
            ShaderStage::Fragment,
            "layout(binding = 0) uniform subpassInput s;",
            "requires an input_attachment_index",
        ),
        (
            ShaderStage::Fragment,
            "#extension GL_EXT_optional_input_attachment_index : enable
            layout(binding = 0) uniform subpassInput s[2];",
            "requires an input_attachment_index",
        ),
        (
            ShaderStage::Fragment,
            "layout(input_attachment_index = 0, binding = 0) uniform texture2D t;",
            "can only be used with a subpass",
        ),
        (
            ShaderStage::Fragment,
            "layout(input_attachment_index = 0, binding = 0) uniform B { vec4 v; } b;",
            "can only be used with a subpass",
        ),
        (
            ShaderStage::Fragment,
            "layout(constant_id = 3) const int c = 1;
            layout(input_attachment_index = c, binding = 0) uniform subpassInput s;",
            "needs a literal integer",
        ),
        (
            ShaderStage::Fragment,
            "#extension GL_EXT_shader_tile_image : require
            layout(input_attachment_index = 0, binding = 0) uniform subpassInput s;",
            "GL_EXT_shader_tile_image",
        ),
        (
            ShaderStage::Fragment,
            "layout(input_attachment_index = 0, binding = 0) uniform subpassInputMS s;
            layout(location = 0) out vec4 o;
            void f() { o = subpassLoad(s); }",
            "subpassLoad",
        ),
    ];
    for (stage, declarations, expected) in cases {
        let source = format!("#version 450\n{declarations}\nvoid main() {{}}\n");
        let error = parse(stage, &source).unwrap_err();
        assert!(error.contains(expected), "{source}: {error}");
    }
}

fn compile_valid_1_3(stage: ShaderStage, source: &str) -> dr::Module {
    let words = compile_words_with_names(stage, source, (1, 3));
    crate::stage_io::spirv_val_in(&words, &["--target-env", "vulkan1.1"]);
    dr::load_words(words).expect("produced SPIR-V does not parse")
}

fn compile_words_with_names(stage: ShaderStage, source: &str, lang_version: (u8, u8)) -> Vec<u32> {
    let module = parse(stage, source).unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .expect("validated in parse");
    let options = spv::Options {
        lang_version,
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    };
    spv::write_vec(&module, &info, &options, None).expect("SPIR-V backend failed")
}

fn has_decoration(module: &dr::Module, id: u32, decoration: Decoration) -> bool {
    module.annotations.iter().any(|inst| {
        inst.class.opcode == Op::Decorate
            && inst.operands[0] == Operand::IdRef(id)
            && inst.operands[1] == Operand::Decoration(decoration)
    })
}

fn scope_and_semantics(module: &dr::Module, inst: &dr::Instruction, first: usize) -> (u32, u32) {
    (
        constant(module, &inst.operands[first]),
        constant(module, &inst.operands[first + 1]),
    )
}

#[test]
fn image_atomics_match_glslang() {
    let module = compile_valid(
        ShaderStage::Compute,
        "#version 450
        layout(local_size_x = 1) in;
        layout(binding = 0, r32ui) uniform uimage2D u;
        layout(binding = 1, r32i) uniform iimage2DArray a;
        layout(binding = 2, r32f) uniform image2D f;
        layout(binding = 3) buffer B { uint r[]; };
        void main() {
            r[0] = imageAtomicAdd(u, ivec2(1, 2), 1u);
            r[1] = imageAtomicMin(u, ivec2(1, 2), 2u);
            r[2] = imageAtomicMax(u, ivec2(1, 2), 3u);
            r[3] = imageAtomicAnd(u, ivec2(1, 2), 4u);
            r[4] = imageAtomicOr(u, ivec2(1, 2), 5u);
            r[5] = imageAtomicXor(u, ivec2(1, 2), 6u);
            r[6] = imageAtomicExchange(u, ivec2(1, 2), 7u);
            r[7] = imageAtomicCompSwap(u, ivec2(1, 2), 8u, 9u);
            r[8] = uint(imageAtomicMin(a, ivec3(1, 2, 3), -1));
            r[9] = uint(imageAtomicExchange(f, ivec2(0), 1.0));
        }",
    );
    assert_eq!(instructions(&module, Op::ImageTexelPointer).len(), 10);
    for (op, count) in [
        (Op::AtomicIAdd, 1),
        (Op::AtomicUMin, 1),
        (Op::AtomicSMin, 1),
        (Op::AtomicUMax, 1),
        (Op::AtomicAnd, 1),
        (Op::AtomicOr, 1),
        (Op::AtomicXor, 1),
        (Op::AtomicExchange, 2),
        (Op::AtomicCompareExchange, 1),
    ] {
        let atomics = instructions(&module, op);
        assert_eq!(atomics.len(), count, "{op:?}");
        for atomic in atomics {
            assert_eq!(
                scope_and_semantics(&module, atomic, 1),
                (spirv::Scope::Device as u32, 0),
                "{op:?}"
            );
        }
    }
    let swap = instructions(&module, Op::AtomicCompareExchange)[0];
    assert_eq!(constant(&module, &swap.operands[3]), 0);
    assert_eq!(constant(&module, &swap.operands[4]), 9);
    assert_eq!(constant(&module, &swap.operands[5]), 8);
    for pointer in instructions(&module, Op::ImageTexelPointer) {
        assert_eq!(constant(&module, &pointer.operands[2]), 0);
    }
    assert!(decorated(&module, Decoration::NonUniform).is_empty());
}

#[test]
fn image_atomics_on_non_uniform_elements() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        layout(set = 0, binding = 4, r32ui) uniform uimageBuffer data[];
        layout(location = 3) in flat int rIndex;
        void main() {
            imageAtomicAdd(data[nonuniformEXT(rIndex)], 0, 0);
            imageAtomicAdd(data[rIndex], 1, 1);
        }",
    );
    let chains = instructions(&module, Op::AccessChain);
    let pointers = instructions(&module, Op::ImageTexelPointer);
    assert_eq!((chains.len(), pointers.len()), (2, 2));
    let image_loads = instructions(&module, Op::Load)
        .into_iter()
        .filter(|load| {
            load.operands[0] == Operand::IdRef(chains[0].result_id.unwrap())
                || load.operands[0] == Operand::IdRef(chains[1].result_id.unwrap())
        })
        .count();
    assert_eq!(image_loads, 0);
    for (index, non_uniform) in [(0, true), (1, false)] {
        let chain = chains[index].result_id.unwrap();
        let pointer = pointers[index].result_id.unwrap();
        assert_eq!(
            has_decoration(&module, chain, Decoration::NonUniform),
            non_uniform
        );
        assert_eq!(
            has_decoration(&module, pointer, Decoration::NonUniform),
            non_uniform
        );
        assert_eq!(pointers[index].operands[0], Operand::IdRef(chain));
    }
    for capability in [
        spirv::Capability::ShaderNonUniform,
        spirv::Capability::RuntimeDescriptorArray,
        spirv::Capability::StorageTexelBufferArrayNonUniformIndexing,
        spirv::Capability::StorageTexelBufferArrayDynamicIndexing,
    ] {
        assert!(has_capability(&module, capability), "{capability:?}");
    }
}

#[test]
fn image_atomics_on_multisampled_images() {
    let module = compile_valid(
        ShaderStage::Compute,
        "#version 450
        layout(local_size_x = 1) in;
        layout(binding = 0, r32i) uniform iimage2DMS ms;
        layout(binding = 1, r32ui) uniform uimage2D u;
        void main() {
            imageAtomicOr(ms, ivec2(1), 3, 5);
            imageAtomicAdd(u, ivec2(0), 1u);
        }",
    );
    assert!(has_capability(
        &module,
        spirv::Capability::StorageImageMultisample
    ));
    let pointers = instructions(&module, Op::ImageTexelPointer);
    assert_eq!(pointers.len(), 2);
    let samples: Vec<u32> = pointers
        .iter()
        .map(|pointer| constant(&module, &pointer.operands[2]))
        .collect();
    assert_eq!(samples, [3, 0]);
}

#[test]
fn scoped_atomics_match_glslang() {
    let module = compile_valid_1_3(
        ShaderStage::Compute,
        "#version 450
        #extension GL_KHR_memory_scope_semantics : require
        layout(local_size_x = 1) in;
        layout(binding = 0) buffer B { uint x; int y; } b;
        layout(binding = 1, r32ui) uniform uimage2D image;
        shared uint s;
        void main() {
            uint v = atomicLoad(b.x, gl_ScopeDevice, gl_StorageSemanticsBuffer, gl_SemanticsAcquire);
            atomicStore(s, v, gl_ScopeWorkgroup, gl_StorageSemanticsShared, gl_SemanticsRelease);
            atomicAdd(b.y, 2, gl_ScopeSubgroup, 0, 0);
            atomicCompSwap(b.x, 1u, 2u, gl_ScopeDevice, gl_StorageSemanticsBuffer,
                gl_SemanticsAcquireRelease, gl_StorageSemanticsBuffer, gl_SemanticsAcquire);
            v += imageAtomicLoad(image, ivec2(0), gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsAcquire);
            imageAtomicStore(image, ivec2(0), v, gl_ScopeDevice, gl_StorageSemanticsImage, gl_SemanticsRelease);
            imageAtomicXor(image, ivec2(0), v, gl_ScopeInvocation, 0, 0);
        }",
    );
    let loads = instructions(&module, Op::AtomicLoad);
    assert_eq!(loads.len(), 2);
    assert_eq!(scope_and_semantics(&module, loads[0], 1), (1, 0x42));
    assert_eq!(scope_and_semantics(&module, loads[1], 1), (1, 0x802));
    let stores = instructions(&module, Op::AtomicStore);
    assert_eq!(stores.len(), 2);
    assert_eq!(scope_and_semantics(&module, stores[0], 1), (2, 0x104));
    assert_eq!(scope_and_semantics(&module, stores[1], 1), (1, 0x804));
    let add = instructions(&module, Op::AtomicIAdd)[0];
    assert_eq!(scope_and_semantics(&module, add, 1), (3, 0));
    let swap = instructions(&module, Op::AtomicCompareExchange)[0];
    assert_eq!(scope_and_semantics(&module, swap, 1), (1, 0x48));
    assert_eq!(constant(&module, &swap.operands[3]), 0x42);
    let xor = instructions(&module, Op::AtomicXor)[0];
    assert_eq!(scope_and_semantics(&module, xor, 1), (4, 0));
    assert!(!has_capability(
        &module,
        spirv::Capability::VulkanMemoryModel
    ));
}

#[test]
fn availability_semantics_select_the_vulkan_memory_model() {
    let module = compile_valid_1_3(
        ShaderStage::Compute,
        "#version 450
        #extension GL_KHR_memory_scope_semantics : require
        layout(local_size_x = 1) in;
        layout(binding = 0) buffer B { uint x; } b;
        void main() {
            atomicStore(b.x, 1u, gl_ScopeQueueFamily, gl_StorageSemanticsBuffer,
                gl_SemanticsRelease | gl_SemanticsMakeAvailable);
        }",
    );
    assert!(has_capability(
        &module,
        spirv::Capability::VulkanMemoryModel
    ));
    let model = &module.memory_model.as_ref().unwrap().operands[1];
    assert_eq!(*model, Operand::MemoryModel(spirv::MemoryModel::Vulkan));
    let store = instructions(&module, Op::AtomicStore)[0];
    assert_eq!(scope_and_semantics(&module, store, 1), (5, 0x2044));
}

#[test]
fn scoped_barriers_match_glslang() {
    let module = compile_valid_1_3(
        ShaderStage::Compute,
        "#version 450
        #extension GL_KHR_memory_scope_semantics : require
        layout(local_size_x = 1) in;
        void main() {
            controlBarrier(gl_ScopeWorkgroup, gl_ScopeDevice,
                gl_StorageSemanticsBuffer | gl_StorageSemanticsShared, gl_SemanticsAcquireRelease);
            memoryBarrier(gl_ScopeSubgroup, gl_StorageSemanticsImage, gl_SemanticsRelease);
            memoryBarrier();
            memoryBarrierBuffer();
            memoryBarrierShared();
            memoryBarrierImage();
            groupMemoryBarrier();
        }",
    );
    let control = instructions(&module, Op::ControlBarrier);
    assert_eq!(control.len(), 1);
    assert_eq!(constant(&module, &control[0].operands[0]), 2);
    assert_eq!(scope_and_semantics(&module, control[0], 1), (1, 0x148));
    let memory: Vec<(u32, u32)> = instructions(&module, Op::MemoryBarrier)
        .into_iter()
        .map(|barrier| scope_and_semantics(&module, barrier, 0))
        .collect();
    assert_eq!(
        memory,
        [
            (3, 0x804),
            (1, 0xd48),
            (1, 0x48),
            (1, 0x108),
            (1, 0x808),
            (2, 0xd48)
        ]
    );
}

#[test]
fn coherent_images_under_the_vulkan_memory_model() {
    use spirv::ImageOperands as Io;
    let module = compile_valid_1_3(
        ShaderStage::Compute,
        "#version 450
        #pragma use_vulkan_memory_model
        #extension GL_KHR_memory_scope_semantics : require
        layout(local_size_x = 1) in;
        layout(binding = 0, r32i) volatile coherent uniform iimage2D v;
        layout(binding = 1, r32i) workgroupcoherent uniform iimage2D w;
        layout(binding = 2, r32i) nonprivate uniform iimage2D n;
        void main() {
            ivec4 t = imageLoad(v, ivec2(0)) + imageLoad(w, ivec2(0));
            imageStore(n, ivec2(0), t);
            imageStore(w, ivec2(0), t);
            imageAtomicAdd(v, ivec2(0), 1);
        }",
    );
    let operands = |inst: &dr::Instruction, from: usize| -> (u32, Option<u32>) {
        let mask = match inst.operands.get(from) {
            Some(&Operand::ImageOperands(mask)) => mask.bits(),
            None => 0,
            Some(other) => panic!("unexpected operand {other:?}"),
        };
        let scope = inst
            .operands
            .get(from + 1)
            .map(|scope| constant(&module, scope));
        (mask, scope)
    };
    let reads = instructions(&module, Op::ImageRead);
    assert_eq!(
        operands(reads[0], 2),
        (
            (Io::MAKE_TEXEL_VISIBLE | Io::NON_PRIVATE_TEXEL | Io::VOLATILE_TEXEL).bits(),
            Some(spirv::Scope::QueueFamily as u32)
        )
    );
    assert_eq!(
        operands(reads[1], 2),
        (
            (Io::MAKE_TEXEL_VISIBLE | Io::NON_PRIVATE_TEXEL).bits(),
            Some(spirv::Scope::Workgroup as u32)
        )
    );
    let writes = instructions(&module, Op::ImageWrite);
    assert_eq!(operands(writes[0], 3), (Io::NON_PRIVATE_TEXEL.bits(), None));
    assert_eq!(
        operands(writes[1], 3),
        (
            (Io::MAKE_TEXEL_AVAILABLE | Io::NON_PRIVATE_TEXEL).bits(),
            Some(spirv::Scope::Workgroup as u32)
        )
    );
    let add = instructions(&module, Op::AtomicIAdd)[0];
    assert_eq!(
        scope_and_semantics(&module, add, 1),
        (spirv::Scope::QueueFamily as u32, 0x8000)
    );
    assert!(decorated(&module, Decoration::Coherent).is_empty());
}

#[test]
fn memory_scope_semantics_errors() {
    let cases = [
        (
            "void main() { memoryBarrier(gl_ScopeDevice, 0, 0); }",
            "GL_KHR_memory_scope_semantics",
        ),
        (
            "#extension GL_KHR_memory_scope_semantics : require
            shared uint s;
            void main() { int d = 1; atomicAdd(s, 1u, d, 0, 0); }",
            "compile-time constant",
        ),
        (
            "#extension GL_KHR_memory_scope_semantics : require
            shared uint s;
            void main() {
                atomicStore(s, 1u, gl_ScopeDevice, gl_StorageSemanticsShared, gl_SemanticsAcquire);
            }",
            "must not be used with (image) atomic store",
        ),
        (
            "#extension GL_KHR_memory_scope_semantics : require
            void main() {
                controlBarrier(gl_ScopeWorkgroup, gl_ScopeWorkgroup, 0, gl_SemanticsVolatile);
            }",
            "gl_SemanticsVolatile must not be used",
        ),
        (
            "#extension GL_EXT_shader_explicit_arithmetic_types_int64 : require
            shared uint64_t s;
            void main() { atomicAdd(s, 1ul); }",
            "GL_EXT_shader_atomic_int64",
        ),
        (
            "layout(binding = 0) buffer B { uint x; } b;
            void main() { atomicLoad(b.x, gl_ScopeQueueFamily, 0, 0); }",
            "GL_KHR_memory_scope_semantics",
        ),
    ];
    for (body, expected) in cases {
        let source = format!("#version 450\nlayout(local_size_x = 1) in;\n{body}\n");
        let error = parse(ShaderStage::Compute, &source).unwrap_err();
        assert!(error.contains(expected), "{source}: {error}");
    }
}

fn message_words(stage: ShaderStage, source: &str, lang_version: (u8, u8)) -> Vec<u32> {
    let module = parse(stage, source).unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .expect("validated in parse");
    let options = spv::Options {
        lang_version,
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        force_loop_bounding: false,
        zero_initialize_workgroup_memory: spv::ZeroInitializeWorkgroupMemoryMode::None,
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None).expect("SPIR-V backend failed");
    let env = match lang_version {
        (1, 4) => "vulkan1.1spv1.4",
        _ => "vulkan1.0",
    };
    crate::stage_io::spirv_val_in(&words, &["--target-env", env, "--scalar-block-layout"]);
    words
}

const OP_ABORT: u32 = 5121;
const OP_CONSTANT_DATA: u32 = 5147;

fn literal_string(words: &[u32]) -> String {
    let bytes: Vec<u8> = words.iter().flat_map(|word| word.to_le_bytes()).collect();
    let end = bytes
        .iter()
        .position(|&byte| byte == 0)
        .unwrap_or(bytes.len());
    String::from_utf8(bytes[..end].to_vec()).unwrap()
}

fn abort_layout(words: &[u32]) -> Vec<(u32, u32, Vec<u32>)> {
    let instructions = raw_instructions(words);
    let message_type = instructions
        .iter()
        .find(|(op, _)| *op == OP_ABORT)
        .map(|(_, operands)| operands[0])
        .expect("an OpAbortKHR");
    let mut members: Vec<(u32, u32, Vec<u32>)> = instructions
        .iter()
        .filter(|(op, operands)| *op == Op::MemberDecorate as u32 && operands[0] == message_type)
        .map(|(_, operands)| (operands[1], operands[2], operands[3..].to_vec()))
        .collect();
    members.sort();
    members
}

fn offsets(layout: &[(u32, u32, Vec<u32>)]) -> Vec<u32> {
    layout
        .iter()
        .filter(|(_, decoration, _)| *decoration == Decoration::Offset as u32)
        .map(|(_, _, operands)| operands[0])
        .collect()
}

#[test]
fn debug_printf_passes_its_arguments_unchanged() {
    let source = "#version 450
#extension GL_EXT_debug_printf : enable
#extension GL_ARB_gpu_shader_fp64 : enable
#define FMT \"macro: %d\"
layout(location = 0) in vec2 v;
layout(location = 0) out vec4 o;
void main() {
    bool b = v.x > 0.0;
    debugPrintfEXT(\"tab\\t %d %s %s %v2f %f\", b, \"same\", \"same\", v, 1.0lf);
    debugPrintfEXT(FMT, 4);
    debugPrintfEXT(\"same\", (1, \"seq\"));
    o = vec4(v, 0.0, 1.0);
}
";
    let module = compile(ShaderStage::Fragment, source);
    let imports: Vec<String> = instructions(&module, Op::ExtInstImport)
        .iter()
        .map(|inst| match inst.operands[0] {
            Operand::LiteralString(ref name) => name.clone(),
            ref other => panic!("{other:?}"),
        })
        .collect();
    assert!(imports.contains(&"NonSemantic.DebugPrintf".to_string()));
    assert!(module.extensions.iter().any(|inst| {
        inst.operands[0] == Operand::LiteralString("SPV_KHR_non_semantic_info".to_string())
    }));
    let strings: Vec<(u32, String)> = instructions(&module, Op::String)
        .iter()
        .map(|inst| match inst.operands[0] {
            Operand::LiteralString(ref text) => (inst.result_id.unwrap(), text.clone()),
            ref other => panic!("{other:?}"),
        })
        .collect();
    let texts: Vec<&str> = strings.iter().map(|(_, text)| text.as_str()).collect();
    assert_eq!(
        texts,
        ["tab\t %d %s %s %v2f %f", "same", "macro: %d", "seq"]
    );
    let prints = instructions(&module, Op::ExtInst);
    assert_eq!(prints.len(), 3);
    let first = prints[0];
    let same = strings[1].0;
    assert_eq!(first.operands.len(), 2 + 6);
    assert_eq!(first.operands[4], Operand::IdRef(same));
    assert_eq!(first.operands[5], Operand::IdRef(same));
    let argument_type = |operand: &Operand| {
        let id = operand.unwrap_id_ref();
        module
            .all_inst_iter()
            .find(|inst| inst.result_id == Some(id))
            .and_then(|inst| inst.result_type)
            .map(|ty| {
                module
                    .types_global_values
                    .iter()
                    .find(|inst| inst.result_id == Some(ty))
                    .unwrap()
                    .class
                    .opcode
            })
    };
    assert_eq!(argument_type(&first.operands[3]), Some(Op::TypeBool));
    assert_eq!(argument_type(&first.operands[6]), Some(Op::TypeVector));
    assert_eq!(argument_type(&first.operands[7]), Some(Op::TypeFloat));
    assert_eq!(prints[2].operands[2], Operand::IdRef(same));
}

#[test]
fn abort_packs_its_message_with_scalar_rules() {
    let source = "#version 450
#extension GL_EXT_abort : require
layout(local_size_x = 1) in;
layout(set = 0, binding = 0) buffer Data {
    int i; uint u; float f; vec4 v4; ivec3 v3; uvec2 v2; int k;
} data;
void main() {
    abortEXT(\"mixed: %d %v4f %u %v3i %f %v2u\", data.i, data.v4, data.u, data.v3, data.f, data.v2);
    data.k = 1;
}
";
    for version in [(1, 0), (1, 4)] {
        let words = message_words(ShaderStage::Compute, source, version);
        let instructions = raw_instructions(&words);
        let capabilities: Vec<u32> = instructions
            .iter()
            .filter(|(op, _)| *op == Op::Capability as u32)
            .map(|(_, operands)| operands[0])
            .collect();
        for capability in [spirv::Capability::Int8 as u32, 5120, 5146] {
            assert!(capabilities.contains(&capability), "{capabilities:?}");
        }
        let extensions: Vec<String> = instructions
            .iter()
            .filter(|(op, _)| *op == Op::Extension as u32)
            .map(|(_, operands)| literal_string(operands))
            .collect();
        assert!(extensions.contains(&"SPV_KHR_abort".to_string()));
        assert!(extensions.contains(&"SPV_KHR_constant_data".to_string()));
        let data: Vec<&Vec<u32>> = instructions
            .iter()
            .filter(|(op, _)| *op == OP_CONSTANT_DATA)
            .map(|(_, operands)| operands)
            .collect();
        assert_eq!(data.len(), 1);
        assert_eq!(
            literal_string(&data[0][2..]),
            "mixed: %d %v4f %u %v3i %f %v2u"
        );
        assert_eq!(data[0].len() - 2, 8);
        assert_eq!(offsets(&abort_layout(&words)), [0, 32, 36, 52, 56, 68, 72]);
        let stores = instructions
            .iter()
            .filter(|(op, _)| *op == Op::Store as u32)
            .count();
        assert_eq!(stores, 0);
    }
}

#[test]
fn abort_lays_out_nested_aggregates() {
    let source = "#version 450
#extension GL_EXT_abort : require
layout(local_size_x = 1) in;
struct Inner { int i; vec2 v; };
struct Outer { Inner inner; float arr[3]; mat2 m; };
layout(set = 0, binding = 0) buffer Data { float seed; } data;
void main() {
    float s = data.seed;
    Inner inner = Inner(int(s), vec2(s));
    Outer outer = Outer(inner, float[3](s, s, s), mat2(s));
    vec3 vectors[2] = vec3[2](vec3(s), vec3(s));
    abortEXT(\"\", inner, outer, vectors, mat3x2(s), bvec3(s > 0.0), s > 1.0);
}
";
    let words = message_words(ShaderStage::Compute, source, (1, 4));
    let layout = abort_layout(&words);
    assert_eq!(offsets(&layout), [0, 4, 16, 56, 80, 104, 116]);
    let matrix_stride: Vec<(u32, u32)> = layout
        .iter()
        .filter(|(_, decoration, _)| *decoration == Decoration::MatrixStride as u32)
        .map(|(member, _, operands)| (*member, operands[0]))
        .collect();
    assert_eq!(matrix_stride, [(4, 8)]);
    let instructions = raw_instructions(&words);
    let mut strides: Vec<u32> = instructions
        .iter()
        .filter(|(op, operands)| {
            *op == Op::Decorate as u32 && operands[1] == Decoration::ArrayStride as u32
        })
        .map(|(_, operands)| operands[2])
        .collect();
    strides.sort_unstable();
    strides.dedup();
    assert_eq!(strides, [1, 4, 12]);
    let utf_encoded = instructions
        .iter()
        .filter(|(op, operands)| *op == Op::Decorate as u32 && operands[1] == 5145)
        .count();
    assert_eq!(utf_encoded, 2);
    let selects = instructions
        .iter()
        .filter(|(op, _)| *op == Op::Select as u32)
        .count();
    assert_eq!(selects, 2);
}

#[test]
fn abort_ends_its_block() {
    let source = "#version 450
#extension GL_EXT_abort : require
layout(local_size_x = 1) in;
layout(set = 0, binding = 0) buffer Data { uint value; } data;
uint first() {
    data.value = 1u;
    abortEXT(\"first: %u\", data.value);
    return data.value;
}
void main() {
    for (int i = 0; i < 3; i++) {
        if (i == 2) {
            abortEXT(\"loop %d\", i);
        }
    }
    switch (data.value) {
        case 0u: abortEXT(); case 1u: data.value = first(); break;
    }
    abortEXT(\"abc\");
    data.value = 5u;
}
";
    let words = message_words(ShaderStage::Compute, source, (1, 4));
    let instructions = raw_instructions(&words);
    let messages: Vec<String> = instructions
        .iter()
        .filter(|(op, _)| *op == OP_CONSTANT_DATA)
        .map(|(_, operands)| literal_string(&operands[2..]))
        .collect();
    assert_eq!(messages, ["first: %u", "loop %d", "", "abc"]);
    assert_eq!(
        instructions
            .iter()
            .filter(|(op, _)| *op == OP_ABORT)
            .count(),
        4
    );
    assert!(!instructions
        .iter()
        .any(|(op, operands)| *op == Op::Constant as u32 && operands[2] == 5));
}

#[test]
fn string_literal_misuse_is_rejected() {
    let cases = [
        (
            ShaderStage::Fragment,
            "#extension GL_EXT_debug_printf : enable\nvoid main() { debugPrintfEXT((\"%d\"), 3); }",
            "first argument must be a string literal",
        ),
        (
            ShaderStage::Fragment,
            "#extension GL_EXT_debug_printf : enable\nvoid main() { debugPrintfEXT(); }",
            "first argument must be a string literal",
        ),
        (
            ShaderStage::Fragment,
            "#extension GL_EXT_abort : enable\nvoid main() { debugPrintfEXT(\"x\"); }",
            "GL_EXT_debug_printf",
        ),
        (
            ShaderStage::Compute,
            "#extension GL_EXT_debug_printf : enable\nvoid main() { abortEXT(\"x\"); }",
            "GL_EXT_abort",
        ),
        (
            ShaderStage::Compute,
            "#extension GL_EXT_abort : enable\nvoid main() { abortEXT(\"x\", \"y\"); }",
            "only the message may be a string",
        ),
        (
            ShaderStage::Compute,
            "#extension GL_EXT_abort : enable\nlayout(binding = 0) uniform sampler2D t;\nvoid main() { abortEXT(\"x\", t); }",
            "opaque",
        ),
        (
            ShaderStage::Compute,
            "#extension GL_EXT_abort : enable\nvoid main() { bool b[2]; abortEXT(\"x\", b); }",
            "aggregate containing a bool",
        ),
        (
            ShaderStage::Compute,
            "#extension GL_EXT_abort : enable\nvoid main() { abortEXT(1, 2); }",
            "first argument must be a string literal",
        ),
        (
            ShaderStage::Fragment,
            "#extension GL_EXT_debug_printf : enable\nvoid main() { uint u = uint(\"foo\"); }",
            "cannot convert a string",
        ),
        (
            ShaderStage::Fragment,
            "#extension GL_EXT_debug_printf : enable\nvoid main() { true ? \"a\" : \"b\"; }",
            "string",
        ),
        (
            ShaderStage::Fragment,
            "void main() { \"a\"; }",
            "string literal",
        ),
        (
            ShaderStage::Fragment,
            "#extension GL_EXT_debug_printf : enable\nvoid main() { debugPrintfEXT(\"\\xZ\"); }",
            "hex",
        ),
    ];
    for (stage, body, expected) in cases {
        let source = format!("#version 450\n{body}\n");
        let error = parse(stage, &source).unwrap_err();
        assert!(error.contains(expected), "{source}: {error}");
    }
    let guarded = "#version 450\n#ifndef GUARD\n#define GUARD\nvoid main() { \"a\"; }\n#endif\n";
    parse(ShaderStage::Fragment, guarded).unwrap();
}

struct Words {
    instructions: Vec<(u32, Vec<u32>)>,
}

impl Words {
    fn of(&self, op: Op) -> Vec<&[u32]> {
        self.instructions
            .iter()
            .filter(|(opcode, _)| *opcode == op as u32)
            .map(|(_, operands)| operands.as_slice())
            .collect()
    }

    fn count(&self, op: Op) -> usize {
        self.of(op).len()
    }

    fn capability(&self, capability: spirv::Capability) -> bool {
        self.of(Op::Capability)
            .iter()
            .any(|operands| operands == &[capability as u32])
    }

    fn named(&self, name: &str) -> u32 {
        self.of(Op::Name)
            .into_iter()
            .find(|operands| string_operand(&operands[1..]) == name)
            .map(|operands| operands[0])
            .unwrap_or_else(|| panic!("nothing named {name}"))
    }

    fn constant(&self, id: u32) -> Option<u32> {
        self.of(Op::Constant)
            .into_iter()
            .find(|operands| operands[1] == id)
            .map(|operands| operands[2])
    }

    fn decorations(&self, id: u32) -> Vec<Vec<u32>> {
        self.of(Op::Decorate)
            .into_iter()
            .filter(|operands| operands[0] == id)
            .map(|operands| operands[1..].to_vec())
            .collect()
    }

    fn member_decorations(&self, id: u32) -> Vec<Vec<u32>> {
        self.of(Op::MemberDecorate)
            .into_iter()
            .filter(|operands| operands[0] == id)
            .map(|operands| operands[1..].to_vec())
            .collect()
    }

    fn id_decorations(&self, op: Op, decoration: Decoration) -> Vec<u32> {
        self.of(op)
            .into_iter()
            .filter(|operands| operands[operands.len() - 2] == decoration as u32)
            .filter_map(|operands| operands.last().copied())
            .collect()
    }
}

fn string_operand(words: &[u32]) -> String {
    let bytes: Vec<u8> = words
        .iter()
        .flat_map(|word| word.to_le_bytes())
        .take_while(|byte| *byte != 0)
        .collect();
    String::from_utf8(bytes).unwrap_or_default()
}

fn compile_heap(stage: ShaderStage, source: &str) -> Words {
    let module = parse(stage, source).unwrap_or_else(|e| panic!("shader rejected: {e}"));
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .expect("validated in parse");
    let options = spv::Options {
        lang_version: (1, 4),
        flags: spv::WriterFlags::DEBUG
            | spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
        ..spv::Options::default()
    };
    let words = spv::write_vec(&module, &info, &options, None).expect("SPIR-V backend failed");
    crate::stage_io::spirv_val_in(&words, &["--target-env", "vulkan1.1spv1.4"]);
    let mut instructions = Vec::new();
    let mut rest = &words[5..];
    while let Some(&first) = rest.first() {
        let count = (first >> 16) as usize;
        assert!(count > 0 && count <= rest.len(), "malformed SPIR-V");
        instructions.push((first & 0xffff, rest[1..count].to_vec()));
        rest = &rest[count..];
    }
    Words { instructions }
}

#[test]
fn descriptor_heap_buffer_arrays() {
    let module = compile_heap(
        ShaderStage::Compute,
        "#version 450
        #extension GL_EXT_descriptor_heap : require
        layout(local_size_x = 1) in;
        layout(descriptor_heap) uniform U { uint inputData; } ubo[];
        layout(descriptor_heap) readonly buffer R { uint value; } reads[];
        layout(descriptor_heap, descriptor_stride = 512) buffer O { uint outputData; } ssbo[];
        void main() { ssbo[8].outputData = ubo[9].inputData + reads[1].value; }",
    );
    assert!(module.capability(spirv::Capability::DescriptorHeapEXT));
    assert!(module.capability(spirv::Capability::UntypedPointersKHR));
    assert_eq!(module.count(Op::UntypedVariableKHR), 1);
    assert_eq!(module.count(Op::BufferPointerEXT), 3);
    assert_eq!(module.count(Op::TypeBufferEXT), 2);
    assert_eq!(module.count(Op::UntypedAccessChainKHR), 3);
    assert_eq!(
        module.decorations(module.named("resource_heap")),
        [vec![
            Decoration::BuiltIn as u32,
            spirv::BuiltIn::ResourceHeapEXT as u32
        ]]
    );
    let strides = module.id_decorations(Op::DecorateId, Decoration::ArrayStrideIdEXT);
    assert_eq!(strides.len(), 3);
    assert!(strides
        .iter()
        .any(|&stride| module.constant(stride) == Some(512)));
    assert_eq!(module.count(Op::ConstantSizeOfEXT), 2);
    let readonly = module.member_decorations(module.named("R"));
    assert!(readonly.contains(&vec![0, Decoration::NonWritable as u32]));
    let pointers = module.of(Op::BufferPointerEXT);
    assert!(pointers.iter().any(|operands| module
        .decorations(operands[1])
        .contains(&vec![Decoration::NonWritable as u32])));
}

#[test]
fn descriptor_heap_images_and_samplers() {
    let module = compile_heap(
        ShaderStage::Fragment,
        "#version 460
        #extension GL_EXT_descriptor_heap : require
        layout(descriptor_heap) uniform texture2D textures[];
        layout(descriptor_heap) uniform sampler samplers[];
        layout(descriptor_heap, r32f) writeonly uniform image2D writes[];
        layout(location = 0) in vec2 uv;
        void main() {
            vec4 texel = texture(sampler2D(textures[2], samplers[1]), uv);
            imageStore(writes[3], ivec2(0), texel);
        }",
    );
    assert_eq!(module.count(Op::UntypedVariableKHR), 2);
    assert_eq!(
        module.decorations(module.named("sampler_heap")),
        [vec![
            Decoration::BuiltIn as u32,
            spirv::BuiltIn::SamplerHeapEXT as u32
        ]]
    );
    let wrapper = module.named("writes_heap");
    assert_eq!(
        module.member_decorations(wrapper),
        [vec![0, Decoration::NonReadable as u32]]
    );
    let offsets = module.id_decorations(Op::MemberDecorateIdEXT, Decoration::OffsetIdEXT);
    assert_eq!(offsets.len(), 1);
    assert_eq!(module.constant(offsets[0]), Some(0));
}

#[test]
fn structured_descriptor_heap_offsets() {
    let module = compile_heap(
        ShaderStage::Compute,
        "#version 460
        #extension GL_EXT_descriptor_heap : require
        #extension GL_EXT_structured_descriptor_heap : require
        layout(local_size_x = 1) in;
        layout(buffer_type, std430) buffer DataBuffer { uint value; };
        layout(heap_offset = 0) resourceheap Heap {
            layout(descriptor_size = 128, rgba32f) image2D sources[2];
            layout(descriptor_size = 64, rgba32f) image2D destinations[2];
            layout(descriptor_size = 128) DataBuffer data;
            uint after;
        } heap;
        void main() {
            imageStore(heap.destinations[1], ivec2(0), imageLoad(heap.sources[0], ivec2(0)));
            heap.data.value = heap.after;
        }",
    );
    let offsets: Vec<Option<u32>> = module
        .id_decorations(Op::MemberDecorateIdEXT, Decoration::OffsetIdEXT)
        .into_iter()
        .map(|id| module.constant(id))
        .collect();
    assert_eq!(offsets, [Some(0), Some(256), Some(384), Some(512)]);
    assert_eq!(module.count(Op::BufferPointerEXT), 1);
}

#[test]
fn structured_descriptor_heap_offsets_are_specializable() {
    let module = compile_heap(
        ShaderStage::Compute,
        "#version 460
        #extension GL_EXT_descriptor_heap : require
        #extension GL_EXT_structured_descriptor_heap : require
        layout(local_size_x = 1) in;
        layout(constant_id = 0) const uint base = 1024;
        layout(push_constant) uniform P { uint samplerOffset; } push;
        layout(buffer_type) buffer DataBuffer { uint data0; uint data1; };
        layout(heap_offset = base) resourceheap Resources {
            uint count;
            DataBuffer data;
            texture2D textures[2];
        } resources;
        layout(heap_offset = push.samplerOffset) samplerheap Samplers {
            sampler samplers[2];
        } samplers;
        layout(heap_offset = 64) resourceheap Plain { uint value; } plain;
        layout(binding = 0) buffer Out { vec4 color; } result;
        void main() {
            resources.data.data0 = resources.count + plain.value;
            result.color = textureLod(sampler2D(resources.textures[1], samplers.samplers[1]), vec2(0.5), 0.0);
        }",
    );
    let offsets = module.id_decorations(Op::MemberDecorateIdEXT, Decoration::OffsetIdEXT);
    let spec = module.of(Op::SpecConstant)[0][1];
    assert!(offsets.contains(&spec));
    assert!(module.capability(spirv::Capability::Int8));
    let byte = module
        .of(Op::TypeInt)
        .into_iter()
        .find(|operands| operands[1] == 8)
        .map(|operands| operands[0])
        .expect("an 8-bit integer type");
    let byte_array = module
        .of(Op::TypeRuntimeArray)
        .into_iter()
        .find(|operands| operands[1] == byte)
        .map(|operands| operands[0])
        .expect("a byte array moves heap views by their offset");
    let shifted = module
        .of(Op::UntypedAccessChainKHR)
        .into_iter()
        .filter(|operands| operands[2] == byte_array)
        .count();
    assert_eq!(shifted, 2);
}

#[test]
fn descriptor_heap_image_atomics() {
    let module = compile_heap(
        ShaderStage::Compute,
        "#version 460
        #extension GL_EXT_descriptor_heap : require
        layout(local_size_x = 1) in;
        layout(descriptor_heap, r32i) uniform iimage1D images[];
        void main() { imageAtomicAdd(images[1], 1, 1); }",
    );
    assert_eq!(module.count(Op::UntypedImageTexelPointerEXT), 1);
    assert_eq!(module.count(Op::AtomicIAdd), 1);
}

#[test]
fn descriptor_heap_requested_replaces_non_uniform_decorations() {
    let module = compile_heap(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_nonuniform_qualifier : require
        #extension GL_EXT_descriptor_heap : require
        layout(binding = 0) uniform UBO { vec4 data; } ubo[];
        layout(descriptor_heap) buffer S { vec4 a; } heap[];
        layout(location = 0) flat in uint index;
        layout(location = 0) out vec4 color;
        void main() { color = ubo[nonuniformEXT(index)].data + heap[nonuniformEXT(index)].a; }",
    );
    assert!(!module
        .of(Op::Decorate)
        .iter()
        .any(|operands| operands[1] == Decoration::NonUniform as u32));
    assert!(module.capability(spirv::Capability::ShaderNonUniform));
    assert!(module.capability(spirv::Capability::DescriptorHeapEXT));
    assert!(module.capability(spirv::Capability::UniformBufferArrayNonUniformIndexing));
    assert!(module.capability(spirv::Capability::StorageBufferArrayNonUniformIndexing));
}

#[test]
fn descriptor_heap_rejections() {
    let cases = [
        (
            "layout(descriptor_heap) uniform sampler2D s[];",
            "combined image samplers",
        ),
        (
            "layout(descriptor_heap) uniform texture2D t;",
            "could only be declared as an array",
        ),
        (
            "layout(descriptor_stride = 2) uniform U { uint a; } u[];",
            "must specify 'descriptor_heap'",
        ),
        (
            "layout(descriptor_heap, descriptor_stride = 3) uniform U { uint a; } u[];",
            "power of 2",
        ),
    ];
    for (declaration, expected) in cases {
        let source = format!(
            "#version 450\n#extension GL_EXT_descriptor_heap : require\n{declaration}\nvoid main() {{}}\n"
        );
        let error = parse(ShaderStage::Fragment, &source).unwrap_err();
        assert!(error.contains(expected), "{declaration}: {error}");
    }
}

#[test]
fn heap_resources_are_not_passed_to_user_functions() {
    let error = parse(
        ShaderStage::Fragment,
        "#version 460 core
        #extension GL_EXT_descriptor_heap : enable
        layout(descriptor_heap) uniform sampler heapSampler[];
        layout(descriptor_heap) uniform texture2D heapTexture2D[];
        layout(location = 0) in vec2 uvs;
        layout(location = 0) out vec4 fragColor;
        vec4 fetch(texture2D t, sampler s) { return texture(sampler2D(t, s), uvs); }
        void main() { fragColor = fetch(heapTexture2D[3], heapSampler[0]); }",
    )
    .unwrap_err();
    assert!(error.contains("descriptor heap resource"), "{error}");
}

fn execution_mode_operands(module: &dr::Module, mode: spirv::ExecutionMode) -> Option<Vec<u32>> {
    module
        .execution_modes
        .iter()
        .find(|inst| inst.operands[1] == Operand::ExecutionMode(mode))
        .map(|inst| {
            inst.operands[2..]
                .iter()
                .filter_map(|operand| match *operand {
                    Operand::LiteralBit32(value) => Some(value),
                    _ => None,
                })
                .collect()
        })
}

fn execution_model(module: &dr::Module) -> spirv::ExecutionModel {
    match module.entry_points[0].operands[0] {
        Operand::ExecutionModel(model) => model,
        ref other => panic!("unexpected entry point operand {other:?}"),
    }
}

fn variable_array_length(module: &dr::Module, name: &str) -> u32 {
    let variable = module
        .types_global_values
        .iter()
        .find(|inst| {
            inst.class.opcode == Op::Variable
                && inst.result_id.is_some_and(|id| name_of(module, id) == name)
        })
        .unwrap_or_else(|| panic!("{name} is not declared"));
    let pointer = module
        .types_global_values
        .iter()
        .find(|inst| inst.result_id == variable.result_type)
        .expect("a variable has a pointer type");
    let pointee = pointer.operands[1].unwrap_id_ref();
    let array = module
        .types_global_values
        .iter()
        .find(|inst| inst.result_id == Some(pointee))
        .expect("the pointee is declared");
    assert_eq!(array.class.opcode, Op::TypeArray, "{name}");
    constant(module, &array.operands[1])
}

#[test]
fn geometry_execution_modes_and_capabilities() {
    let module = compile_valid(
        ShaderStage::Geometry,
        "#version 450 core
        layout(triangles) in;
        layout(line_strip) out;
        layout(max_vertices = 127) out;
        layout(invocations = 4) in;
        void main() {
            gl_PointSize = gl_in[1].gl_PointSize;
            gl_Layer = 2;
            gl_ViewportIndex = 3;
        }",
    );
    assert_eq!(execution_model(&module), spirv::ExecutionModel::Geometry);
    assert_eq!(
        execution_mode_operands(&module, spirv::ExecutionMode::Triangles),
        Some(Vec::new())
    );
    assert_eq!(
        execution_mode_operands(&module, spirv::ExecutionMode::Invocations),
        Some(vec![4])
    );
    assert_eq!(
        execution_mode_operands(&module, spirv::ExecutionMode::OutputLineStrip),
        Some(Vec::new())
    );
    assert_eq!(
        execution_mode_operands(&module, spirv::ExecutionMode::OutputVertices),
        Some(vec![127])
    );
    for capability in [
        spirv::Capability::Geometry,
        spirv::Capability::GeometryPointSize,
        spirv::Capability::MultiViewport,
    ] {
        assert!(has_capability(&module, capability), "{capability:?}");
    }
    assert!(!has_capability(&module, spirv::Capability::ClipDistance));
    assert_eq!(variable_array_length(&module, "gl_in"), 3);
}

#[test]
fn geometry_invocations_default_to_one() {
    let module = compile_valid(
        ShaderStage::Geometry,
        "#version 450
        layout(points) in;
        layout(points, max_vertices = 1) out;
        void main() { gl_Position = gl_in[0].gl_Position; EmitVertex(); EndPrimitive(); }",
    );
    assert_eq!(
        execution_mode_operands(&module, spirv::ExecutionMode::Invocations),
        Some(vec![1])
    );
    assert_eq!(instructions(&module, Op::EmitVertex).len(), 1);
    assert_eq!(instructions(&module, Op::EndPrimitive).len(), 1);
    assert!(!has_capability(&module, spirv::Capability::GeometryStreams));
    assert!(!has_capability(
        &module,
        spirv::Capability::GeometryPointSize
    ));
}

#[test]
fn geometry_streams() {
    let module = compile_valid(
        ShaderStage::Geometry,
        "#version 450
        layout(points) in;
        layout(points, max_vertices = 2) out;
        layout(location = 3) out vec4 early;
        layout(stream = 1) out;
        layout(location = 0) out vec4 a;
        layout(stream = 0, location = 1) out vec4 b;
        void main() {
            a = vec4(1.0);
            EmitStreamVertex(1);
            EndStreamPrimitive(1);
            b = vec4(2.0);
            EmitVertex();
        }",
    );
    assert!(has_capability(&module, spirv::Capability::GeometryStreams));
    let emits = instructions(&module, Op::EmitStreamVertex);
    assert_eq!(emits.len(), 1);
    assert_eq!(constant(&module, &emits[0].operands[0]), 1);
    assert_eq!(instructions(&module, Op::EndStreamPrimitive).len(), 1);
    let streams: Vec<(String, u32)> = module
        .annotations
        .iter()
        .filter(|inst| inst.operands[1] == Operand::Decoration(Decoration::Stream))
        .map(|inst| {
            let Operand::LiteralBit32(stream) = inst.operands[2] else {
                panic!("Stream takes a literal");
            };
            (name_of(&module, inst.operands[0].unwrap_id_ref()), stream)
        })
        .collect();
    for (name, stream) in [("early", 0), ("a", 1), ("b", 0)] {
        assert!(
            streams.contains(&(name.to_string(), stream)),
            "{name} {stream} in {streams:?}"
        );
    }
}

#[test]
fn geometry_per_vertex_inputs_take_element_locations() {
    let module = compile_valid(
        ShaderStage::Geometry,
        "#version 450
        layout(lines_adjacency) in;
        layout(triangle_strip, max_vertices = 4) out;
        layout(location = 0) in vec4 a[];
        layout(location = 1) in vec2 b[4];
        layout(location = 2) in Block { vec4 c; flat int d; } blocks[];
        layout(location = 0) out vec4 color;
        void main() {
            for (int i = 0; i < 4; ++i) {
                color = a[i] + vec4(b[i], blocks[i].c.xy) + vec4(blocks[i].d);
                gl_Position = gl_in[i].gl_Position;
                gl_PrimitiveID = gl_PrimitiveIDIn;
                EmitVertex();
            }
        }",
    );
    assert!(has_execution_mode(
        &module,
        spirv::ExecutionMode::InputLinesAdjacency
    ));
    assert_eq!(variable_array_length(&module, "a"), 4);
    assert_eq!(variable_array_length(&module, "blocks"), 4);
    let primitive_ids = module
        .annotations
        .iter()
        .filter(|inst| inst.operands.get(2) == Some(&Operand::BuiltIn(spirv::BuiltIn::PrimitiveId)))
        .count();
    assert_eq!(primitive_ids, 2);
}

#[test]
fn tessellation_control_interface() {
    let module = compile_valid(
        ShaderStage::TessControl,
        "#version 450 core
        layout(vertices = 4) out;
        layout(location = 1) patch out vec4 patchOut;
        struct S { float sMem1; float sMem2; };
        layout(location = 12) patch out TheBlock { float bMem1; float bMem2; S s; } tcBlock[2];
        layout(location = 0) in vec3 inNormal[];
        layout(location = 0) out vec3 outNormal[];
        void main() {
            gl_out[gl_InvocationID].gl_Position = gl_in[gl_InvocationID].gl_Position;
            outNormal[gl_InvocationID] = inNormal[gl_InvocationID];
            barrier();
            if (gl_InvocationID == 0) {
                patchOut = vec4(outNormal[1], 1.0);
                gl_TessLevelOuter[0] = 1.0;
                gl_TessLevelInner[1] = float(gl_PatchVerticesIn);
            }
        }",
    );
    assert_eq!(
        execution_model(&module),
        spirv::ExecutionModel::TessellationControl
    );
    assert_eq!(
        execution_mode_operands(&module, spirv::ExecutionMode::OutputVertices),
        Some(vec![4])
    );
    assert!(has_capability(&module, spirv::Capability::Tessellation));
    assert!(!has_capability(
        &module,
        spirv::Capability::TessellationPointSize
    ));
    let patch = decorated(&module, Decoration::Patch);
    for name in [
        "patchOut",
        "bMem1",
        "bMem2",
        "s",
        "gl_TessLevelOuter",
        "gl_TessLevelInner",
    ] {
        assert!(patch.contains(&name.to_string()), "{name} in {patch:?}");
    }
    assert!(!patch.contains(&"outNormal".to_string()));
    let locations = decorated(&module, Decoration::Location);
    for name in ["patchOut", "tcBlock", "inNormal", "outNormal"] {
        assert!(locations.contains(&name.to_string()), "{name}");
    }
    assert_eq!(variable_array_length(&module, "gl_in"), 32);
    assert_eq!(variable_array_length(&module, "gl_out"), 4);
    assert_eq!(variable_array_length(&module, "inNormal"), 32);
    assert_eq!(variable_array_length(&module, "outNormal"), 4);
    let barriers = instructions(&module, Op::ControlBarrier);
    assert_eq!(barriers.len(), 1);
    assert_eq!(
        constant(&module, &barriers[0].operands[0]),
        spirv::Scope::Workgroup as u32
    );
}

#[test]
fn tessellation_evaluation_modes() {
    let module = compile_valid(
        ShaderStage::TessEvaluation,
        "#version 450
        layout(isolines, fractional_odd_spacing, cw, point_mode) in;
        layout(location = 0) in vec4 inColor[];
        layout(location = 1) patch in vec4 patchColor;
        layout(location = 0) out vec4 color;
        void main() {
            color = inColor[0] * gl_TessCoord.x + patchColor + vec4(gl_TessLevelOuter[1]);
            gl_Position = gl_in[1].gl_Position;
            gl_PointSize = 2.0;
        }",
    );
    for mode in [
        spirv::ExecutionMode::Isolines,
        spirv::ExecutionMode::SpacingFractionalOdd,
        spirv::ExecutionMode::VertexOrderCw,
        spirv::ExecutionMode::PointMode,
    ] {
        assert!(has_execution_mode(&module, mode), "{mode:?}");
    }
    assert!(has_capability(
        &module,
        spirv::Capability::TessellationPointSize
    ));
    let defaults = compile_valid(
        ShaderStage::TessEvaluation,
        "#version 450
        layout(triangles) in;
        void main() { gl_Position = gl_in[0].gl_Position * gl_TessCoord.x; }",
    );
    for mode in [
        spirv::ExecutionMode::Triangles,
        spirv::ExecutionMode::SpacingEqual,
        spirv::ExecutionMode::VertexOrderCcw,
    ] {
        assert!(has_execution_mode(&defaults, mode), "{mode:?}");
    }
    assert!(!has_execution_mode(
        &defaults,
        spirv::ExecutionMode::PointMode
    ));
}

#[test]
fn layer_before_rasterization_needs_an_extension() {
    let error = parse(
        ShaderStage::TessEvaluation,
        "#version 450
        layout(triangles) in;
        void main() { gl_Layer = 1; }",
    )
    .unwrap_err();
    assert!(
        error.contains("GL_ARB_shader_viewport_layer_array"),
        "{error}"
    );
    let module = compile_valid(
        ShaderStage::TessEvaluation,
        "#version 450
        #extension GL_ARB_shader_viewport_layer_array : require
        layout(triangles) in;
        void main() { gl_Layer = 1; gl_ViewportIndex = 2; }",
    );
    assert!(has_capability(
        &module,
        spirv::Capability::ShaderViewportIndexLayerEXT
    ));
    assert!(!has_capability(&module, spirv::Capability::Geometry));
}

#[test]
fn geometry_passthrough() {
    let module = compile_valid(
        ShaderStage::Geometry,
        "#version 450
        #extension GL_NV_geometry_shader_passthrough : require
        layout(triangles) in;
        layout(passthrough) in gl_PerVertex { vec4 gl_Position; };
        layout(passthrough, location = 0) in Inputs { vec2 texcoord; vec4 baseColor; };
        void main() {}",
    );
    assert!(has_capability(
        &module,
        spirv::Capability::GeometryShaderPassthroughNV
    ));
    let passthrough = module
        .annotations
        .iter()
        .filter(|inst| inst.operands[1] == Operand::Decoration(Decoration::PassthroughNV))
        .count();
    assert_eq!(passthrough, 2);
    assert!(has_execution_mode(
        &module,
        spirv::ExecutionMode::OutputTriangleStrip
    ));
    assert_eq!(
        execution_mode_operands(&module, spirv::ExecutionMode::OutputVertices),
        Some(vec![3])
    );
}

#[test]
fn geometry_and_tessellation_rejections() {
    let cases = [
        (
            ShaderStage::Geometry,
            "layout(triangles) in;\nlayout(points) out;\nvoid main() {}",
            "max_vertices",
        ),
        (
            ShaderStage::Geometry,
            "layout(points, max_vertices = 1) out;\nvoid main() {}",
            "input layout primitive",
        ),
        (
            ShaderStage::TessControl,
            "void main() {}",
            "layout(vertices=...)",
        ),
        (
            ShaderStage::TessEvaluation,
            "void main() {}",
            "input layout primitive",
        ),
        (
            ShaderStage::TessEvaluation,
            "layout(triangles) in;\nlayout(equal_spacing) in float f[];\nvoid main() {}",
            "standalone",
        ),
        (
            ShaderStage::TessEvaluation,
            "layout(triangles) in;\nlayout(quads) in;\nvoid main() {}",
            "previously set input primitive",
        ),
        (
            ShaderStage::Geometry,
            "layout(triangles) in;\nlayout(triangles, max_vertices = 1) out;\nvoid main() {}",
            "cannot apply to 'out'",
        ),
        (
            ShaderStage::Geometry,
            "layout(triangles) in;\nlayout(points, max_vertices = 1000) out;\nvoid main() {}",
            "gl_MaxGeometryOutputVertices",
        ),
        (
            ShaderStage::TessControl,
            "layout(vertices = 4) out;\nvoid main() { if (gl_InvocationID == 0) barrier(); }",
            "flow control",
        ),
        (
            ShaderStage::TessControl,
            "layout(vertices = 4) out;\nvoid f() { barrier(); }\nvoid main() { f(); }",
            "must be in main()",
        ),
        (
            ShaderStage::TessControl,
            "layout(vertices = 4) out;\nvoid main() { if (gl_InvocationID == 1) return; barrier(); }",
            "after a return",
        ),
        (
            ShaderStage::Geometry,
            "layout(triangles) in;\nlayout(points, max_vertices = 4) out;\nvoid main() { int s = 1; EmitStreamVertex(s); }",
            "constant integral expression",
        ),
        (
            ShaderStage::Geometry,
            "layout(triangles) in;\nlayout(points, max_vertices = 1) out;\nlayout(passthrough) in Inputs { vec2 t; };\nvoid main() {}",
            "GL_NV_geometry_shader_passthrough",
        ),
        (
            ShaderStage::Vertex,
            "void main() { EmitVertex(); }",
            "EmitVertex",
        ),
    ];
    for (stage, body, expected) in cases {
        let source = format!("#version 450\n{body}\n");
        let error = parse(stage, &source).unwrap_err();
        assert!(error.contains(expected), "{source}: {error}");
    }
}

fn parse_for_spirv(stage: ShaderStage, source: &str, version: (u8, u8)) -> Result<(), String> {
    glsl::Frontend::default()
        .parse(
            &glsl::Options {
                spirv_version: Some(version),
                ..glsl::Options::from(stage)
            },
            source,
        )
        .map(|_| ())
        .map_err(|errors| {
            errors
                .errors
                .first()
                .map_or_else(String::new, |e| e.kind.to_string())
        })
}

fn is_constant(module: &dr::Module, operand: &Operand) -> bool {
    let Operand::IdRef(id) = *operand else {
        return false;
    };
    module
        .types_global_values
        .iter()
        .any(|inst| inst.result_id == Some(id) && inst.class.opcode == Op::Constant)
}

fn group_operation(
    module: &dr::Module,
    op: Op,
) -> Vec<(u32, Option<spirv::GroupOperation>, Vec<u32>)> {
    instructions(module, op)
        .into_iter()
        .map(|inst| {
            let scope = constant(module, &inst.operands[0]);
            let group = inst.operands.iter().find_map(|operand| match *operand {
                Operand::GroupOperation(group) => Some(group),
                _ => None,
            });
            let extra = inst.operands[1..]
                .iter()
                .filter(|operand| !matches!(operand, Operand::GroupOperation(_)))
                .skip(1)
                .filter(|operand| is_constant(module, operand))
                .map(|operand| constant(module, operand))
                .collect();
            (scope, group, extra)
        })
        .collect()
}

#[test]
fn subgroup_operations_match_glslang() {
    use spirv::{Capability as C, GroupOperation as G};
    let module = compile_valid_1_3(
        ShaderStage::Compute,
        "#version 450
        #extension GL_KHR_shader_subgroup_arithmetic : enable
        #extension GL_KHR_shader_subgroup_ballot : enable
        #extension GL_KHR_shader_subgroup_clustered : enable
        #extension GL_KHR_shader_subgroup_shuffle : enable
        #extension GL_KHR_shader_subgroup_vote : enable
        #extension GL_KHR_shader_subgroup_quad : enable
        layout(local_size_x = 8, local_size_y = 8) in;
        layout(std430, binding = 0) buffer B { vec4 f; uvec4 u; bool b; uint i; };
        void main() {
            f = subgroupInclusiveAdd(f) + subgroupClusteredMax(f, 4u);
            u = subgroupExclusiveOr(u) ^ subgroupBallot(b);
            f.x = subgroupBroadcast(f.x, 3u) + subgroupShuffleXor(f.y, i);
            b = subgroupAllEqual(f) && subgroupElect() && subgroupInverseBallot(u);
            i = subgroupBallotInclusiveBitCount(u) + gl_SubgroupID + gl_NumSubgroups;
            f = subgroupQuadSwapDiagonal(f);
            subgroupBarrier();
        }",
    );
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformFAdd),
        [(3, Some(G::InclusiveScan), vec![])]
    );
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformFMax),
        [(3, Some(G::ClusteredReduce), vec![4])]
    );
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformBitwiseOr),
        [(3, Some(G::ExclusiveScan), vec![])]
    );
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformBroadcast),
        [(3, None, vec![3])]
    );
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformShuffleXor).len(),
        1
    );
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformBallotBitCount),
        [(3, Some(G::InclusiveScan), vec![])]
    );
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformAllEqual).len(),
        1
    );
    assert_eq!(group_operation(&module, Op::GroupNonUniformElect).len(), 1);
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformInverseBallot).len(),
        1
    );
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformQuadSwap),
        [(3, None, vec![2])]
    );
    let barriers = instructions(&module, Op::ControlBarrier);
    assert_eq!(barriers.len(), 1);
    assert_eq!(constant(&module, &barriers[0].operands[0]), 3);
    assert_eq!(constant(&module, &barriers[0].operands[1]), 3);
    assert_eq!(
        capabilities_of(&module),
        sorted(vec![
            C::Shader,
            C::GroupNonUniform,
            C::GroupNonUniformVote,
            C::GroupNonUniformArithmetic,
            C::GroupNonUniformBallot,
            C::GroupNonUniformShuffle,
            C::GroupNonUniformClustered,
            C::GroupNonUniformQuad,
        ])
    );
}

#[test]
fn subgroup_builtins_are_flat_in_fragment_shaders() {
    use spirv::BuiltIn as Bi;
    let module = compile_valid_1_3(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_KHR_shader_subgroup_ballot : enable
        layout(location = 0) out uvec4 data;
        void main() {
            data = gl_SubgroupEqMask + gl_SubgroupLtMask
                + uvec4(gl_SubgroupSize, gl_SubgroupInvocationID, 0, 0);
        }",
    );
    for (name, builtin) in [
        ("gl_SubgroupSize", Bi::SubgroupSize),
        ("gl_SubgroupInvocationID", Bi::SubgroupLocalInvocationId),
        ("gl_SubgroupEqMask", Bi::SubgroupEqMask),
        ("gl_SubgroupLtMask", Bi::SubgroupLtMask),
    ] {
        assert_eq!(
            sorted_variable_decorations(&module, name),
            [
                (Decoration::BuiltIn, vec![builtin as u32]),
                (Decoration::Flat, vec![]),
            ],
            "{name}"
        );
    }
    assert!(capabilities_of(&module).contains(&spirv::Capability::GroupNonUniformBallot));
}

#[test]
fn shader_ballot_uses_the_khr_extensions() {
    use spirv::Capability as C;
    let module = compile_valid(
        ShaderStage::Compute,
        "#version 450
        #extension GL_ARB_gpu_shader_int64 : enable
        #extension GL_ARB_shader_ballot : enable
        #extension GL_ARB_shader_group_vote : enable
        layout(local_size_x = 8) in;
        layout(std430, binding = 0) buffer B { vec4 f; uint64_t m; bool b; };
        void main() {
            m = ballotARB(b) + gl_SubGroupGeMaskARB;
            f.xy = readInvocationARB(f.xy, gl_SubGroupInvocationARB) + readFirstInvocationARB(f.zw);
            b = anyInvocationARB(b) || allInvocationsEqualARB(b);
        }",
    );
    assert_eq!(instructions(&module, Op::SubgroupBallotKHR).len(), 1);
    assert_eq!(
        instructions(&module, Op::SubgroupReadInvocationKHR).len(),
        2
    );
    assert_eq!(
        instructions(&module, Op::SubgroupFirstInvocationKHR).len(),
        2
    );
    assert_eq!(instructions(&module, Op::SubgroupAnyKHR).len(), 1);
    assert_eq!(instructions(&module, Op::SubgroupAllEqualKHR).len(), 1);
    assert_eq!(
        extensions_of(&module),
        ["SPV_KHR_shader_ballot", "SPV_KHR_subgroup_vote"]
    );
    assert_eq!(
        capabilities_of(&module),
        sorted(vec![
            C::Shader,
            C::Int64,
            C::SubgroupBallotKHR,
            C::SubgroupVoteKHR
        ])
    );
    assert_eq!(
        sorted_variable_decorations(&module, "gl_SubGroupGeMaskARB"),
        [(
            Decoration::BuiltIn,
            vec![spirv::BuiltIn::SubgroupGeMask as u32]
        )]
    );
}

#[test]
fn rotate_partition_and_quad_control_match_glslang() {
    use spirv::{Capability as C, GroupOperation as G};
    let module = compile_valid_1_3(
        ShaderStage::Fragment,
        "#version 460
        #extension GL_KHR_shader_subgroup_rotate : enable
        #extension GL_KHR_shader_subgroup_vote : enable
        #extension GL_NV_shader_subgroup_partitioned : enable
        #extension GL_EXT_shader_quad_control : enable
        layout(full_quads) in;
        layout(quad_derivatives) in;
        layout(location = 0) flat in uint value;
        layout(location = 0) out uint result;
        void main() {
            uvec4 groups = subgroupPartitionNV(value);
            result = subgroupClusteredRotate(value, 1u, 4u) + subgroupRotate(value, 2u)
                + subgroupPartitionedExclusiveAddNV(value, groups);
            if (subgroupQuadAll(value > 0u)) { result = 0u; }
        }",
    );
    let rotates = instructions(&module, Op::GroupNonUniformRotateKHR);
    assert_eq!(rotates.len(), 2);
    assert!(rotates
        .iter()
        .any(|inst| inst.operands.len() == 4 && constant(&module, &inst.operands[3]) == 4));
    assert_eq!(
        instructions(&module, Op::GroupNonUniformPartitionNV).len(),
        1
    );
    assert_eq!(
        group_operation(&module, Op::GroupNonUniformIAdd),
        [(3, Some(G::PartitionedExclusiveScanEXT), vec![])]
    );
    let quad = instructions(&module, Op::GroupNonUniformQuadAllKHR);
    assert_eq!(quad.len(), 1);
    assert_eq!(quad[0].operands.len(), 1);
    assert!(has_execution_mode(
        &module,
        spirv::ExecutionMode::QuadDerivativesKHR
    ));
    assert!(has_execution_mode(
        &module,
        spirv::ExecutionMode::RequireFullQuadsKHR
    ));
    assert_eq!(
        extensions_of(&module),
        [
            "SPV_KHR_quad_control",
            "SPV_KHR_subgroup_rotate",
            "SPV_NV_shader_subgroup_partitioned"
        ]
    );
    let capabilities = capabilities_of(&module);
    for capability in [
        C::GroupNonUniformRotateKHR,
        C::GroupNonUniformPartitionedNV,
        C::QuadControlKHR,
        C::GroupNonUniformVote,
    ] {
        assert!(capabilities.contains(&capability), "{capability:?}");
    }
}

#[test]
fn amd_shader_ballot_uses_group_operations() {
    let module = compile_valid(
        ShaderStage::Compute,
        "#version 450
        #extension GL_AMD_shader_ballot : enable
        layout(local_size_x = 8) in;
        layout(std430, binding = 0) buffer B { vec2 f; int i; };
        void main() {
            f = minInvocationsInclusiveScanAMD(f);
            i = addInvocationsNonUniformAMD(i);
        }",
    );
    let mins = instructions(&module, Op::GroupFMin);
    assert_eq!(mins.len(), 2);
    assert_eq!(
        mins[0].operands[1],
        Operand::GroupOperation(spirv::GroupOperation::InclusiveScan)
    );
    assert_eq!(instructions(&module, Op::GroupIAddNonUniformAMD).len(), 1);
    assert_eq!(extensions_of(&module), ["SPV_AMD_shader_ballot"]);
    assert!(capabilities_of(&module).contains(&spirv::Capability::Groups));
}

#[test]
fn subgroup_features_are_checked_like_glslang() {
    let cases = [
        (
            "void main() { uint size = gl_SubgroupSize; }",
            "GL_KHR_shader_subgroup_basic",
        ),
        (
            "#extension GL_KHR_shader_subgroup_basic : enable\nvoid main() { subgroupAll(true); }",
            "GL_KHR_shader_subgroup_vote",
        ),
        (
            "#extension GL_KHR_shader_subgroup_vote : enable\nvoid main() { subgroupQuadAll(true); }",
            "GL_EXT_shader_quad_control",
        ),
        (
            "#extension GL_KHR_shader_subgroup_clustered : enable\nvoid main() { subgroupClusteredAdd(1.0, 3u); }",
            "power of 2",
        ),
        (
            "#extension GL_KHR_shader_subgroup_clustered : enable\nvoid main() { uint s = 2u; subgroupClusteredAdd(1.0, s); }",
            "compile-time constant",
        ),
        (
            "#extension GL_KHR_shader_subgroup_ballot : enable\nvoid main() { uint id = 2u; subgroupBroadcast(1.0, id); }",
            "compile-time constant",
        ),
        (
            "#extension GL_EXT_shader_explicit_arithmetic_types_int8 : enable\n#extension GL_KHR_shader_subgroup_arithmetic : enable\nvoid main() { subgroupAdd(int8_t(1)); }",
            "GL_EXT_shader_subgroup_extended_types_int8",
        ),
    ];
    for (body, expected) in cases {
        let source = format!("#version 450\n{body}\n");
        let error = parse_for_spirv(ShaderStage::Compute, &source, (1, 3)).unwrap_err();
        assert!(error.contains(expected), "{body}: {error}");
    }
    let dynamic_broadcast = "#version 450
        #extension GL_KHR_shader_subgroup_ballot : enable
        void main() { uint id = 2u; subgroupBroadcast(1.0, id); }";
    parse_for_spirv(ShaderStage::Compute, dynamic_broadcast, (1, 5)).unwrap();
    let old_spirv = "#version 450
        #extension GL_KHR_shader_subgroup_vote : enable
        void main() { subgroupAll(true); }";
    let error = parse_for_spirv(ShaderStage::Compute, old_spirv, (1, 0)).unwrap_err();
    assert!(error.contains("SPIR-V 1.3"), "{error}");
    let fragment = "#version 450
        #extension GL_KHR_shader_subgroup_basic : enable
        void main() { uint n = gl_NumSubgroups; }";
    let error = parse_for_spirv(ShaderStage::Fragment, fragment, (1, 3)).unwrap_err();
    assert!(error.contains("gl_NumSubgroups"), "{error}");
}

#[test]
fn subgroup_builtins_are_volatile_in_ray_tracing_stages() {
    let source = "#version 460
        #extension GL_EXT_ray_tracing : enable
        #extension GL_KHR_shader_subgroup_ballot : enable
        layout(binding = 0, std430) buffer B { uvec4 v; };
        void main() { v = gl_SubgroupEqMask + uvec4(gl_SubgroupSize); }";
    let words = compile_words_with_names(ShaderStage::RayGeneration, source, (1, 4));
    crate::stage_io::spirv_val_in(&words, &["--target-env", "vulkan1.2"]);
    let module = dr::load_words(words).expect("produced SPIR-V does not parse");
    for name in ["gl_SubgroupEqMask", "gl_SubgroupSize"] {
        assert!(
            sorted_variable_decorations(&module, name).contains(&(Decoration::Volatile, vec![])),
            "{name}"
        );
        assert!(
            !sorted_variable_decorations(&module, name).contains(&(Decoration::Coherent, vec![])),
            "{name}"
        );
    }
    let model = source.replacen(
        "#version 460\n",
        "#version 460\n#pragma use_vulkan_memory_model\n",
        1,
    );
    let words = compile_words_with_names(ShaderStage::RayGeneration, &model, (1, 4));
    crate::stage_io::spirv_val_in(&words, &["--target-env", "vulkan1.2"]);
    let module = dr::load_words(words).expect("produced SPIR-V does not parse");
    let loads = instructions(&module, Op::Load);
    assert_eq!(loads.len(), 2);
    assert!(loads
        .iter()
        .all(|load| load.operands.last()
            == Some(&Operand::MemoryAccess(spirv::MemoryAccess::VOLATILE))));
}

fn storage_classes(module: &dr::Module) -> Vec<spirv::StorageClass> {
    module
        .types_global_values
        .iter()
        .filter(|inst| inst.class.opcode == Op::Variable)
        .filter_map(|inst| match inst.operands[0] {
            Operand::StorageClass(class) => Some(class),
            _ => None,
        })
        .collect()
}

#[test]
fn trace_ray_takes_every_operand_and_the_payload_variable() {
    let module = compile(
        ShaderStage::RayGeneration,
        r#"#version 460
#extension GL_EXT_ray_tracing : enable
layout(binding = 0) uniform accelerationStructureEXT scene;
layout(location = 1) rayPayloadEXT vec4 payload;
layout(location = 2) rayPayloadEXT float other;
layout(shaderRecordEXT) buffer Record { vec3 origin; };
void main() {
    traceRayEXT(scene, gl_RayFlagsOpaqueEXT, 0x7Fu, 3u, 4u, 5u, origin, 0.5, vec3(1.0), 7.0, 2);
}
"#,
    );
    let traces = instructions(&module, Op::TraceRayKHR);
    assert_eq!(traces.len(), 1);
    let operands = &traces[0].operands;
    assert_eq!(constant(&module, &operands[1]), 1);
    assert_eq!(constant(&module, &operands[2]), 0x7F);
    assert_eq!(constant(&module, &operands[3]), 3);
    assert_eq!(constant(&module, &operands[4]), 4);
    assert_eq!(constant(&module, &operands[5]), 5);
    assert_eq!(name_of(&module, operands[10].unwrap_id_ref()), "other");
    assert!(decorated(&module, Decoration::Location).is_empty());
    let classes = storage_classes(&module);
    assert!(classes.contains(&spirv::StorageClass::RayPayloadKHR));
    assert!(classes.contains(&spirv::StorageClass::ShaderRecordBufferKHR));
    assert!(capabilities(&module).contains(&spirv::Capability::RayTracingKHR));
}

#[test]
fn nv_ray_tracing_uses_locations() {
    let module = compile(
        ShaderStage::RayGeneration,
        r#"#version 460
#extension GL_NV_ray_tracing : enable
layout(binding = 0) uniform accelerationStructureNV scene;
layout(location = 3) rayPayloadNV vec4 payload;
void main() {
    traceNV(scene, 0u, 0xFFu, 0u, 1u, 0u, vec3(0.0), 0.5, vec3(1.0), 7.0, 3);
}
"#,
    );
    let traces = instructions(&module, Op::TraceNV);
    assert_eq!(traces.len(), 1);
    assert_eq!(constant(&module, &traces[0].operands[10]), 3);
    assert_eq!(decorated(&module, Decoration::Location), ["payload"]);
    assert!(capabilities(&module).contains(&spirv::Capability::RayTracingNV));
}

#[test]
fn any_hit_terminators_end_the_block() {
    let module = compile(
        ShaderStage::AnyHit,
        r#"#version 460
#extension GL_EXT_ray_tracing : enable
layout(location = 0) rayPayloadInEXT vec4 payload;
void main() {
    if (gl_PrimitiveID == 1) {
        ignoreIntersectionEXT;
    }
    payload = vec4(1.0);
    terminateRayEXT;
}
"#,
    );
    assert_eq!(instructions(&module, Op::IgnoreIntersectionKHR).len(), 1);
    assert_eq!(instructions(&module, Op::TerminateRayKHR).len(), 1);
    assert!(instructions(&module, Op::Return).is_empty());
}

#[test]
fn intersection_reports_hits_and_hit_attributes() {
    let module = compile(
        ShaderStage::Intersection,
        r#"#version 460
#extension GL_EXT_ray_tracing : enable
hitAttributeEXT vec2 attributes;
void main() {
    attributes = vec2(0.25);
    bool accepted = reportIntersectionEXT(gl_RayTmaxEXT, 1u);
}
"#,
    );
    assert_eq!(instructions(&module, Op::ReportIntersectionKHR).len(), 1);
    assert!(storage_classes(&module).contains(&spirv::StorageClass::HitAttributeKHR));
    assert_eq!(decorated(&module, Decoration::Volatile), ["gl_RayTmaxEXT"]);
}

#[test]
fn callable_data_follows_the_location() {
    let module = compile(
        ShaderStage::Callable,
        r#"#version 460
#extension GL_EXT_ray_tracing : enable
layout(location = 0) callableDataEXT vec4 outgoing;
layout(location = 1) callableDataInEXT Data { uint value; };
void main() {
    value = 256u;
    executeCallableEXT(2u, 0);
}
"#,
    );
    let calls = instructions(&module, Op::ExecuteCallableKHR);
    assert_eq!(calls.len(), 1);
    assert_eq!(
        name_of(&module, calls[0].operands[1].unwrap_id_ref()),
        "outgoing"
    );
    let classes = storage_classes(&module);
    assert!(classes.contains(&spirv::StorageClass::CallableDataKHR));
    assert!(classes.contains(&spirv::StorageClass::IncomingCallableDataKHR));
}

#[test]
fn transposed_matrices_read_the_same_builtin() {
    let module = compile(
        ShaderStage::ClosestHit,
        r#"#version 460
#extension GL_EXT_ray_tracing : enable
layout(location = 0) rayPayloadInEXT vec4 payload;
void main() {
    mat3x4 a = gl_ObjectToWorld3x4EXT;
    mat4x3 b = gl_ObjectToWorldEXT;
    payload = a[0] + vec4(b[0], gl_HitTEXT + gl_RayTmaxEXT);
}
"#,
    );
    assert_eq!(decorated(&module, Decoration::BuiltIn).len(), 2);
    assert_eq!(instructions(&module, Op::Transpose).len(), 1);
}

#[test]
fn ray_queries_are_private_and_passed_by_pointer() {
    let module = compile(
        ShaderStage::Compute,
        r#"#version 460
#extension GL_EXT_ray_query : enable
layout(local_size_x = 1) in;
layout(binding = 0) uniform accelerationStructureEXT scene;
layout(binding = 1) buffer Out { float t; };
void advance(rayQueryEXT query) {
    rayQueryProceedEXT(query);
}
void main() {
    rayQueryEXT query;
    rayQueryInitializeEXT(query, scene, gl_RayFlagsNoneEXT, 0xFF, vec3(0.0), 0.0, vec3(1.0), 10.0);
    advance(query);
    t = rayQueryGetIntersectionTEXT(query, true) + rayQueryGetRayTMinEXT(query);
}
"#,
    );
    assert!(storage_classes(&module).contains(&spirv::StorageClass::Private));
    assert_eq!(instructions(&module, Op::RayQueryInitializeKHR).len(), 1);
    assert_eq!(instructions(&module, Op::RayQueryProceedKHR).len(), 1);
    let getters = instructions(&module, Op::RayQueryGetIntersectionTKHR);
    assert_eq!(getters.len(), 1);
    assert_eq!(constant(&module, &getters[0].operands[1]), 1);
    assert_eq!(instructions(&module, Op::RayQueryGetRayTMinKHR).len(), 1);
    assert!(capabilities(&module).contains(&spirv::Capability::RayQueryKHR));
}

#[test]
fn opacity_micromap_ray_query_mode_names_the_constant() {
    let module = parse(
        ShaderStage::Compute,
        r#"#version 460
#extension GL_EXT_ray_query : enable
#extension GL_EXT_opacity_micromap_ray_query_mode : enable
layout(local_size_x = 1) in;
const bool gl_EnableOpacityMicromapEXT = true;
void main() {}
"#,
    )
    .unwrap_or_else(|e| panic!("shader rejected: {e}"));
    assert!(module.entry_points[0].opacity_micromap.is_some());
    let info = Validator::new(ValidationFlags::all(), Capabilities::all())
        .validate(&module)
        .expect("validated in parse");
    let words = spv::write_vec(&module, &info, &spv::Options::default(), None)
        .expect("SPIR-V backend failed");
    let execution_mode_id = (4 << 16) | Op::ExecutionModeId as u32;
    let position = words
        .iter()
        .position(|&word| word == execution_mode_id)
        .expect("no OpExecutionModeId");
    assert_eq!(words.get(position + 2), Some(&6031));
    assert!(words
        .windows(2)
        .any(|pair| pair == [(2 << 16) | Op::Capability as u32, 6032]));
}

fn decoration_operands(module: &dr::Module, id: u32, decoration: Decoration) -> Option<Vec<u32>> {
    module
        .annotations
        .iter()
        .find(|inst| {
            inst.class.opcode == Op::Decorate
                && inst.operands[0] == Operand::IdRef(id)
                && inst.operands[1] == Operand::Decoration(decoration)
        })
        .map(|inst| inst.operands[2..].iter().map(literal).collect())
}

#[test]
fn view_index_needs_multiview() {
    let source = "#version 450
        #extension GL_EXT_multiview : enable
        layout(location = 0) out vec4 color;
        void main() { color = vec4(gl_ViewIndex, 0, 0, 0); }";
    let module = compile_valid(ShaderStage::Fragment, source);
    assert!(has_capability(&module, spirv::Capability::MultiView));
    assert!(extensions_of(&module).contains(&"SPV_KHR_multiview".to_string()));
    let view = named(&module, "gl_ViewIndex");
    assert!(has_decoration(&module, view, Decoration::Flat));
    let module = compile_valid_1_3(ShaderStage::Fragment, source);
    assert!(has_capability(&module, spirv::Capability::MultiView));
    assert!(extensions_of(&module).is_empty());
    let error = parse(
        ShaderStage::Vertex,
        "#version 450
        void main() { gl_Position = vec4(gl_ViewIndex); }",
    )
    .unwrap_err();
    assert!(error.contains("GL_EXT_multiview"), "{error}");
    let module = compile_valid(
        ShaderStage::Geometry,
        "#version 450
        #extension GL_EXT_multiview : require
        layout(points) in;
        layout(points, max_vertices = 1) out;
        void main() { gl_Layer = gl_ViewIndex; EmitVertex(); }",
    );
    let view = named(&module, "gl_ViewIndex");
    assert!(!has_decoration(&module, view, Decoration::Flat));
}

#[test]
fn per_view_attributes_match_glslang() {
    let module = compile_valid(
        ShaderStage::Vertex,
        "#version 450
        #extension GL_NVX_multiview_per_view_attributes : require
        void main() {
            gl_ViewportMaskPerViewNV[0] = 1;
            gl_PositionPerViewNV[1] = gl_Position;
        }",
    );
    assert!(has_capability(
        &module,
        spirv::Capability::PerViewAttributesNV
    ));
    assert!(extensions_of(&module).contains(&"SPV_NVX_multiview_per_view_attributes".to_string()));
    assert_eq!(variable_array_length(&module, "gl_PositionPerViewNV"), 2);
    assert_eq!(
        variable_array_length(&module, "gl_ViewportMaskPerViewNV"),
        1
    );
    let error = parse(
        ShaderStage::Vertex,
        "#version 450
        void main() { gl_PositionPerViewNV[0] = vec4(1.0); }",
    )
    .unwrap_err();
    assert!(
        error.contains("GL_NVX_multiview_per_view_attributes"),
        "{error}"
    );
}

#[test]
fn per_vertex_members_of_view_extensions() {
    let module = compile_valid(
        ShaderStage::TessControl,
        "#version 450
        #extension GL_NV_viewport_array2 : require
        #extension GL_NVX_multiview_per_view_attributes : require
        layout(vertices = 3) out;
        void main() {
            gl_out[gl_InvocationID].gl_ViewportMask[2] = 4;
            gl_out[gl_InvocationID].gl_PositionPerViewNV[1] = gl_in[0].gl_PositionPerViewNV[3];
        }",
    );
    let built_ins = decorated(&module, Decoration::BuiltIn);
    for name in [
        "gl_ViewportMask",
        "gl_PositionPerViewNV",
        "gl_ViewportMaskPerViewNV",
    ] {
        assert!(built_ins.iter().any(|found| found == name), "{built_ins:?}");
    }
    assert!(
        !built_ins
            .iter()
            .any(|found| found.starts_with("gl_Secondary")),
        "{built_ins:?}"
    );
    assert!(has_capability(
        &module,
        spirv::Capability::ShaderViewportMaskNV
    ));
    assert!(has_capability(
        &module,
        spirv::Capability::PerViewAttributesNV
    ));
    assert!(!has_capability(
        &module,
        spirv::Capability::ShaderStereoViewNV
    ));
    let error = parse(
        ShaderStage::Geometry,
        "#version 450
        layout(points) in;
        layout(points, max_vertices = 1) out;
        in gl_PerVertex { vec4 gl_Position; vec4 gl_SecondaryPositionNV; } gl_in[];
        void main() { gl_Position = gl_in[0].gl_SecondaryPositionNV; EmitVertex(); }",
    )
    .unwrap_err();
    assert!(error.contains("GL_NV_stereo_view_rendering"), "{error}");
}

#[test]
fn viewport_relative_layer() {
    let module = compile_valid(
        ShaderStage::Vertex,
        "#version 450
        #extension GL_NV_viewport_array2 : require
        #extension GL_NV_stereo_view_rendering : require
        layout(viewport_relative, secondary_view_offset = 3) out highp int gl_Layer;
        void main() {
            gl_ViewportMask[0] = 1;
            gl_SecondaryViewportMaskNV[0] = 1;
            gl_SecondaryPositionNV = gl_Position;
        }",
    );
    let layer = named(&module, "gl_Layer");
    assert_eq!(
        decoration_operands(&module, layer, Decoration::ViewportRelativeNV),
        Some(Vec::new())
    );
    assert_eq!(
        decoration_operands(&module, layer, Decoration::SecondaryViewportRelativeNV),
        Some(vec![3])
    );
    for capability in [
        spirv::Capability::ShaderViewportIndexLayerEXT,
        spirv::Capability::ShaderViewportMaskNV,
        spirv::Capability::ShaderStereoViewNV,
    ] {
        assert!(has_capability(&module, capability), "{capability:?}");
    }
    let extensions = extensions_of(&module);
    for extension in [
        "SPV_EXT_shader_viewport_index_layer",
        "SPV_NV_viewport_array2",
        "SPV_NV_stereo_view_rendering",
    ] {
        assert!(
            extensions.contains(&extension.to_string()),
            "{extensions:?}"
        );
    }
    let error = parse(
        ShaderStage::Vertex,
        "#version 450
        #extension GL_ARB_shader_viewport_layer_array : require
        layout(viewport_relative) out highp int gl_Layer;
        void main() {}",
    )
    .unwrap_err();
    assert!(error.contains("GL_NV_viewport_array2"), "{error}");
    let error = parse(
        ShaderStage::Vertex,
        "#version 450
        #extension GL_NV_stereo_view_rendering : require
        layout(secondary_view_offset = -2) out highp int gl_Layer;
        void main() {}",
    )
    .unwrap_err();
    assert!(error.contains("negative"), "{error}");
}

#[test]
fn sample_mask_override_coverage() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_NV_sample_mask_override_coverage : enable
        layout(override_coverage) out int gl_SampleMask[];
        void main() { gl_SampleMask[0] = gl_SampleMaskIn[0]; }",
    );
    let mask = named(&module, "gl_SampleMask");
    assert!(has_decoration(
        &module,
        mask,
        Decoration::OverrideCoverageNV
    ));
    assert!(has_capability(
        &module,
        spirv::Capability::SampleMaskOverrideCoverageNV
    ));
    let mask_in = named(&module, "gl_SampleMaskIn");
    assert!(has_decoration(&module, mask_in, Decoration::Flat));
    assert!(!has_decoration(
        &module,
        mask_in,
        Decoration::OverrideCoverageNV
    ));
}

fn compile_mesh(stage: ShaderStage, source: &str, lang_version: (u8, u8)) -> dr::Module {
    let words = compile_words_with_names(stage, source, lang_version);
    let env = if lang_version >= (1, 4) {
        "vulkan1.2"
    } else {
        "vulkan1.0"
    };
    crate::stage_io::spirv_val_in(&words, &["--target-env", env]);
    dr::load_words(words).expect("produced SPIR-V does not parse")
}

fn execution_modes(module: &dr::Module) -> Vec<(spirv::ExecutionMode, Vec<u32>)> {
    module
        .execution_modes
        .iter()
        .filter_map(|inst| match inst.operands[1] {
            Operand::ExecutionMode(mode) => Some((
                mode,
                inst.operands[2..]
                    .iter()
                    .filter_map(|operand| match *operand {
                        Operand::LiteralBit32(value) => Some(value),
                        _ => None,
                    })
                    .collect(),
            )),
            _ => None,
        })
        .collect()
}

#[test]
fn ext_mesh_shader_outputs() {
    let module = compile_mesh(
        ShaderStage::Mesh,
        "#version 460
        #extension GL_EXT_mesh_shader : require
        layout(local_size_x = 32) in;
        layout(max_vertices = 64, max_primitives = 126, triangles) out;
        layout(location = 0) out vec4 color[];
        layout(location = 1) perprimitiveEXT out vec4 normal[];
        void main() {
            uint i = gl_LocalInvocationIndex;
            SetMeshOutputsEXT(64u, 126u);
            gl_MeshVerticesEXT[i].gl_Position = vec4(1.0);
            gl_MeshVerticesEXT[i].gl_ClipDistance[1] = 0.5;
            gl_MeshPrimitivesEXT[i].gl_CullPrimitiveEXT = true;
            gl_MeshPrimitivesEXT[i].gl_Layer = 2;
            gl_PrimitiveTriangleIndicesEXT[i] = uvec3(0, 1, 2);
            color[i] = vec4(1.0);
            normal[i] = vec4(0.0);
        }",
        (1, 4),
    );
    assert_eq!(execution_model(&module), spirv::ExecutionModel::MeshEXT);
    let modes = execution_modes(&module);
    for mode in [
        (spirv::ExecutionMode::LocalSize, vec![32, 1, 1]),
        (spirv::ExecutionMode::OutputVertices, vec![64]),
        (spirv::ExecutionMode::OutputPrimitivesEXT, vec![126]),
        (spirv::ExecutionMode::OutputTrianglesEXT, vec![]),
    ] {
        assert!(modes.contains(&mode), "{modes:?}");
    }
    assert!(has_capability(&module, spirv::Capability::MeshShadingEXT));
    assert!(has_capability(&module, spirv::Capability::ClipDistance));
    assert!(!has_capability(&module, spirv::Capability::CullDistance));
    assert!(extensions_of(&module).contains(&"SPV_EXT_mesh_shader".to_string()));
    assert_eq!(instructions(&module, Op::SetMeshOutputsEXT).len(), 1);
    let per_primitive = decorated(&module, Decoration::PerPrimitiveEXT);
    for name in [
        "normal",
        "gl_PrimitiveID",
        "gl_Layer",
        "gl_CullPrimitiveEXT",
    ] {
        assert!(
            per_primitive.contains(&name.to_string()),
            "{per_primitive:?}"
        );
    }
    assert!(!per_primitive.contains(&"color".to_string()));
    let indices = named(&module, "gl_PrimitiveTriangleIndicesEXT");
    let variable = global_value(&module, indices);
    assert_eq!(
        variable.operands[0],
        Operand::StorageClass(spirv::StorageClass::Output)
    );
}

#[test]
fn ext_task_shader_payload() {
    let module = compile_mesh(
        ShaderStage::Task,
        "#version 450
        #extension GL_EXT_mesh_shader : require
        layout(local_size_x = 8) in;
        struct Payload { uint count; vec2 offsets[4]; };
        taskPayloadSharedEXT Payload payload;
        void main() {
            payload.count = gl_WorkGroupID.x;
            atomicAdd(payload.count, 1u);
            EmitMeshTasksEXT(2u, 1u, 1u);
        }",
        (1, 4),
    );
    assert_eq!(execution_model(&module), spirv::ExecutionModel::TaskEXT);
    let emit = instructions(&module, Op::EmitMeshTasksEXT);
    assert_eq!(emit.len(), 1);
    assert_eq!(emit[0].operands.len(), 4);
    let payload = named(&module, "payload");
    assert_eq!(emit[0].operands[3], Operand::IdRef(payload));
    let variable = global_value(&module, payload);
    assert_eq!(
        variable.operands[0],
        Operand::StorageClass(spirv::StorageClass::TaskPayloadWorkgroupEXT)
    );
}

#[test]
fn ext_task_shader_without_payload() {
    let module = compile_mesh(
        ShaderStage::Task,
        "#version 450
        #extension GL_EXT_mesh_shader : require
        layout(local_size_x = 1) in;
        void main() { EmitMeshTasksEXT(1u, 1u, 1u); }",
        (1, 4),
    );
    let emit = instructions(&module, Op::EmitMeshTasksEXT);
    assert_eq!(emit[0].operands.len(), 3);
}

#[test]
fn nv_mesh_shader_built_ins() {
    let module = compile_mesh(
        ShaderStage::Mesh,
        "#version 450
        #extension GL_NV_mesh_shader : require
        layout(local_size_x = 32) in;
        layout(max_vertices = 81, max_primitives = 32, lines) out;
        layout(location = 0) out block {
            perprimitiveNV perviewNV vec4 a[][3];
            vec4 b;
        } blk[];
        perviewNV layout(location = 10) out vec4 c[][gl_MaxMeshViewCountNV];
        void main() {
            uint i = gl_LocalInvocationID.x;
            uint view = gl_MeshViewIndicesNV[gl_MeshViewCountNV % 4];
            gl_MeshVerticesNV[i].gl_PositionPerViewNV[view] = vec4(1.0);
            gl_MeshPrimitivesNV[i].gl_ViewportMask[0] = 1;
            gl_PrimitiveIndicesNV[i] = 1u;
            writePackedPrimitiveIndices4x8NV(0u, 0x01020304u);
            gl_PrimitiveCountNV = 32u;
            blk[i].a[view][2] = vec4(1.0);
            blk[i].b = vec4(2.0);
            c[i][view] = vec4(3.0);
        }",
        (1, 0),
    );
    assert_eq!(execution_model(&module), spirv::ExecutionModel::MeshNV);
    assert!(has_capability(&module, spirv::Capability::MeshShadingNV));
    assert!(has_capability(
        &module,
        spirv::Capability::PerViewAttributesNV
    ));
    assert!(has_capability(
        &module,
        spirv::Capability::ShaderViewportMaskNV
    ));
    assert!(!has_capability(&module, spirv::Capability::ClipDistance));
    let modes = execution_modes(&module);
    assert!(modes.contains(&(spirv::ExecutionMode::OutputLinesEXT, vec![])));
    assert_eq!(
        instructions(&module, Op::WritePackedPrimitiveIndices4x8NV).len(),
        1
    );
    let indices = named(&module, "gl_PrimitiveIndicesNV");
    let variable = global_value(&module, indices);
    let pointer = global_value(&module, variable.result_type.unwrap());
    let array = global_value(&module, id_operand(&pointer.operands[1]));
    assert_eq!(constant(&module, &array.operands[1]), 64);
    let per_view = decorated(&module, Decoration::PerViewNV);
    for name in ["a", "c", "gl_PositionPerViewNV", "gl_LayerPerViewNV"] {
        assert!(per_view.contains(&name.to_string()), "{per_view:?}");
    }
    assert!(!per_view.contains(&"b".to_string()));
    let location = |name: &str| {
        let id = named(&module, name);
        module
            .annotations
            .iter()
            .find(|inst| {
                inst.operands[0] == Operand::IdRef(id)
                    && inst.operands[1] == Operand::Decoration(Decoration::Location)
            })
            .map(|inst| literal(&inst.operands[2]))
    };
    assert_eq!(location("blk"), Some(0));
    assert_eq!(location("c"), Some(10));
}

#[test]
fn nv_task_memory_blocks() {
    let module = compile_mesh(
        ShaderStage::Task,
        "#version 450
        #extension GL_NV_mesh_shader : require
        layout(local_size_x = 32) in;
        layout(location = 0) taskNV out Task { vec2 dummy; vec2 submesh[3]; uint view; } task;
        void main() {
            task.submesh[1] = vec2(1.0);
            task.view = gl_MeshViewCountNV;
            gl_TaskCountNV = 3u;
        }",
        (1, 0),
    );
    assert_eq!(execution_model(&module), spirv::ExecutionModel::TaskNV);
    let per_task = decorated(&module, Decoration::PerTaskNV);
    assert_eq!(per_task, ["dummy", "submesh", "view"]);
    let offsets: Vec<u32> = module
        .annotations
        .iter()
        .filter(|inst| {
            inst.class.opcode == Op::MemberDecorate
                && inst.operands[2] == Operand::Decoration(Decoration::Offset)
        })
        .map(|inst| literal(&inst.operands[3]))
        .collect();
    assert_eq!(offsets, [0, 8, 32]);
    assert_eq!(decorated(&module, Decoration::BuiltIn).len(), 2);
}

#[test]
fn per_primitive_fragment_inputs() {
    let module = compile_valid(
        ShaderStage::Fragment,
        "#version 460
        #extension GL_NV_mesh_shader : require
        layout(location = 0) in B { perprimitiveNV float f; };
        layout(location = 4) in C { flat centroid float h; };
        layout(location = 8) out float g;
        void main() { g = f + h; }",
    );
    assert!(has_capability(&module, spirv::Capability::MeshShadingNV));
    assert_eq!(decorated(&module, Decoration::PerPrimitiveEXT), ["f"]);
}

#[test]
fn mesh_shader_errors() {
    let cases = [
        (
            ShaderStage::Mesh,
            "#version 460
            #extension GL_EXT_mesh_shader : require
            layout(local_size_x = 1) in;
            layout(triangles, max_vertices = 3, max_primitives = 1) out;
            layout(location = 0) out vec4 v[];
            void main() { v[0] = v[1]; }",
            "can only be written",
        ),
        (
            ShaderStage::Mesh,
            "#version 460
            #extension GL_EXT_mesh_shader : require
            layout(local_size_x = 1) in;
            layout(triangles, max_vertices = 3, max_primitives = 1) out;
            struct S { int a; };
            taskPayloadSharedEXT S s;
            void main() { s.a = 1; }",
            "taskPayloadSharedEXT",
        ),
        (
            ShaderStage::Mesh,
            "#version 460
            #extension GL_EXT_mesh_shader : require
            layout(local_size_x = 1) in;
            layout(points, max_vertices = 3, max_primitives = 1) out;
            void main() { gl_PrimitiveTriangleIndicesEXT[0] = uvec3(0); }",
            "output primitive",
        ),
        (
            ShaderStage::Mesh,
            "#version 450
            #extension GL_NV_mesh_shader : require
            layout(local_size_x = 1) in;
            layout(triangles, max_vertices = 3, max_primitives = 1) out;
            perviewNV layout(location = 0) out vec4 v[];
            void main() {}",
            "view array dimension",
        ),
        (
            ShaderStage::Mesh,
            "#version 460
            #extension GL_EXT_mesh_shader : require
            layout(local_size_x = 1) in;
            layout(triangles, max_vertices = 300, max_primitives = 1) out;
            void main() {}",
            "gl_MaxMeshOutputVerticesEXT",
        ),
        (
            ShaderStage::Vertex,
            "#version 460
            perprimitiveNV out vec4 v;
            void main() {}",
            "perprimitiveNV",
        ),
    ];
    for (stage, source, expected) in cases {
        let error = parse(stage, source).unwrap_err();
        assert!(error.contains(expected), "{expected}: {error}");
    }
}

#[test]
fn long_vectors_lower_to_vector_types() {
    let module = compile(
        ShaderStage::Compute,
        "#version 460
        #extension GL_EXT_long_vector : require
        layout(local_size_x = 1) in;
        layout(std430, binding = 0) buffer B { float d[8]; };
        void main() {
            vector<float, 8> a = vector<float, 8>(d[0]);
            vector<float, 8> b = a * 2.0 + a;
            d[1] = dot(a, b);
        }",
    );
    let long = instructions(&module, Op::TypeVector)
        .into_iter()
        .any(|inst| inst.operands[1] == Operand::LiteralBit32(8));
    assert!(long);
    assert!(!instructions(&module, Op::Dot).is_empty());
}

#[test]
fn khr_cooperative_matrix_multiply_add() {
    let module = compile(
        ShaderStage::Compute,
        "#version 450
        #extension GL_KHR_cooperative_matrix : require
        #extension GL_KHR_memory_scope_semantics : require
        #extension GL_EXT_shader_explicit_arithmetic_types : require
        layout(local_size_x = 32) in;
        layout(std430, binding = 0) buffer B { float16_t x[256]; float y[]; };
        void main() {
            coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseA> a;
            coopmat<float16_t, gl_ScopeSubgroup, 16, 16, gl_MatrixUseB> b;
            coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> c =
                coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator>(0.0);
            coopMatLoad(a, x, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
            coopMatLoad(b, x, 0, 16, gl_CooperativeMatrixLayoutColumnMajor);
            c = coopMatMulAdd(a, b, c);
            coopMatStore(c, y, 0, 16, gl_CooperativeMatrixLayoutRowMajor);
        }",
    );
    assert_eq!(instructions(&module, Op::TypeCooperativeMatrixKHR).len(), 3);
    assert_eq!(instructions(&module, Op::CooperativeMatrixLoadKHR).len(), 2);
    assert_eq!(
        instructions(&module, Op::CooperativeMatrixMulAddKHR).len(),
        1
    );
    assert_eq!(
        instructions(&module, Op::CooperativeMatrixStoreKHR).len(),
        1
    );
}

#[test]
fn nv_cooperative_matrix_length_is_a_specialization_constant() {
    let module = compile(
        ShaderStage::Compute,
        "#version 450
        #extension GL_NV_cooperative_matrix : require
        #extension GL_KHR_memory_scope_semantics : require
        layout(local_size_x = 32) in;
        layout(std430, binding = 0) buffer B { float y[]; };
        void main() {
            fcoopmatNV<32, gl_ScopeSubgroup, 16, 8> m;
            int lengths[m.length() + 1];
            y[0] = float(lengths.length());
        }",
    );
    let lengths = instructions(&module, Op::SpecConstantOp);
    assert!(lengths.iter().any(|inst| {
        inst.operands[0] == Operand::LiteralSpecConstantOpInteger(Op::CooperativeMatrixLengthNV)
    }));
}

#[test]
fn bfloat16_constants_are_encoded() {
    let module = compile(
        ShaderStage::Compute,
        "#version 450
        #extension GL_EXT_bfloat16 : require
        layout(local_size_x = 1) in;
        layout(std430, binding = 0) buffer B { float y[]; };
        void main() {
            bfloat16_t one = bfloat16_t(y[1]);
            y[0] = float(one);
        }",
    );
    let encoded = instructions(&module, Op::TypeFloat)
        .into_iter()
        .any(|inst| inst.operands.len() == 2 && inst.operands[0] == Operand::LiteralBit32(16));
    assert!(encoded);
}

#[test]
fn cooperative_vector_matrix_multiply() {
    let module = compile(
        ShaderStage::Compute,
        "#version 450
        #extension GL_NV_cooperative_vector : require
        #extension GL_EXT_shader_explicit_arithmetic_types : require
        layout(local_size_x = 32) in;
        layout(std430, binding = 0) buffer B { float16_t m[256]; float16_t v[]; };
        void main() {
            coopvecNV<float16_t, 16> a;
            coopvecNV<float16_t, 16> r;
            coopVecLoadNV(a, v, 0);
            coopVecMatMulNV(r, a, gl_ComponentTypeFloat16NV, m, 0, gl_ComponentTypeFloat16NV,
                16, 16, gl_CooperativeVectorMatrixLayoutRowMajorNV, false, 32);
            coopVecStoreNV(r, v, 64);
        }",
    );
    assert_eq!(
        instructions(&module, Op::CooperativeVectorMatrixMulNV).len(),
        1
    );
    assert_eq!(instructions(&module, Op::CooperativeVectorStoreNV).len(), 1);
}

#[test]
fn cooperative_errors() {
    let cases = [
        (
            "#version 450
            #extension GL_KHR_cooperative_matrix : require
            #extension GL_KHR_memory_scope_semantics : require
            layout(local_size_x = 32) in;
            void main() {
                coopmat<float, gl_ScopeSubgroup, 16, 16, gl_MatrixUseAccumulator> a;
                coopmat<float, gl_ScopeSubgroup, 8, 8, gl_MatrixUseAccumulator> b;
                a = a + b;
            }",
            "cannot be applied",
        ),
        (
            "#version 460
            #extension GL_EXT_long_vector : require
            layout(local_size_x = 1) in;
            void main() {
                vector<float, 8> a;
                a[8] = 1.0;
            }",
            "out of range",
        ),
        (
            "#version 450
            #extension GL_EXT_bfloat16 : require
            layout(local_size_x = 1) in;
            void main() {
                bfloat16_t a = bfloat16_t(1.0);
                a = a * a;
            }",
            "cannot be applied",
        ),
    ];
    for (source, expected) in cases {
        let error = parse(ShaderStage::Compute, source).unwrap_err();
        assert!(error.contains(expected), "{expected}: {error}");
    }
}

struct QcomModule {
    instructions: Vec<(u32, Vec<u32>)>,
}

impl QcomModule {
    fn new(stage: ShaderStage, source: &str, lang_version: (u8, u8), target: &str) -> Self {
        let words = compile_words_with_names(stage, source, lang_version);
        crate::stage_io::spirv_val_in(&words, &["--target-env", target]);
        Self {
            instructions: raw_instructions(&words),
        }
    }

    fn all(&self, op: u32) -> Vec<&[u32]> {
        self.instructions
            .iter()
            .filter(|(found, _)| *found == op)
            .map(|(_, operands)| operands.as_slice())
            .collect()
    }

    fn id(&self, name: &str) -> u32 {
        self.all(Op::Name as u32)
            .into_iter()
            .find(|operands| string_operand(&operands[1..]) == name)
            .map(|operands| operands[0])
            .unwrap_or_else(|| panic!("no `{name}`"))
    }

    fn decorations(&self, id: u32) -> Vec<u32> {
        let mut found: Vec<u32> = self
            .all(Op::Decorate as u32)
            .into_iter()
            .filter(|operands| operands[0] == id)
            .map(|operands| operands[1])
            .collect();
        found.sort_unstable();
        found
    }

    fn capabilities(&self) -> Vec<u32> {
        let mut found: Vec<u32> = self
            .all(Op::Capability as u32)
            .into_iter()
            .map(|operands| operands[0])
            .collect();
        found.sort_unstable();
        found
    }

    fn extensions(&self) -> Vec<String> {
        let mut found: Vec<String> = self
            .all(Op::Extension as u32)
            .into_iter()
            .map(string_operand)
            .collect();
        found.sort_unstable();
        found
    }

    fn constant(&self, id: u32) -> u32 {
        self.all(Op::Constant as u32)
            .into_iter()
            .find(|operands| operands[1] == id)
            .map(|operands| operands[2])
            .unwrap_or_else(|| panic!("%{id} is not a constant"))
    }

    fn defining_op(&self, id: u32) -> u32 {
        self.instructions
            .iter()
            .find(|(op, operands)| {
                (*op == Op::AccessChain as u32 || *op == Op::Variable as u32)
                    && operands.get(1) == Some(&id)
            })
            .map(|(op, _)| *op)
            .unwrap_or_else(|| panic!("%{id} is not defined"))
    }
}

#[test]
fn qcom_image_processing_matches_glslang() {
    let module = QcomModule::new(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_QCOM_image_processing : require
        #extension GL_QCOM_image_processing2 : require
        layout(location = 0) in vec4 coordinate;
        layout(location = 0) out vec4 color;
        layout(set = 0, binding = 0) uniform texture2DArray weights;
        layout(set = 0, binding = 1) uniform texture2D target;
        layout(set = 0, binding = 2) uniform texture2D reference;
        layout(set = 0, binding = 3) uniform sampler samp;
        layout(set = 0, binding = 4) uniform sampler2D combined;
        layout(set = 0, binding = 5) uniform sampler2D window;
        void main() {
            uvec2 at = uvec2(coordinate.zw);
            color = textureWeightedQCOM(sampler2D(target, samp), coordinate.xy, sampler2DArray(weights, samp));
            color += textureBoxFilterQCOM(combined, coordinate.xy, vec2(2.5, 4.5));
            color += textureBlockMatchSSDQCOM(sampler2D(target, samp), at, combined, at, uvec2(4));
            color += textureBlockMatchWindowSADQCOM(window, at, sampler2D(reference, samp), at, uvec2(4));
            color += textureBlockMatchGatherSSDQCOM(sampler2D(target, samp), at, sampler2D(reference, samp), at, uvec2(4));
        }",
        (1, 4),
        "vulkan1.1spv1.4",
    );
    for (op, count) in [(4480, 1), (4481, 1), (4482, 1), (4501, 1), (4502, 1)] {
        assert_eq!(module.all(op).len(), count, "opcode {op}");
    }
    assert_eq!(module.capabilities(), [1, 4484, 4485, 4486, 4498]);
    assert_eq!(
        module.extensions(),
        ["SPV_QCOM_image_processing", "SPV_QCOM_image_processing2"]
    );
    let block_texture = Decoration::BlockMatchTextureQCOM as u32;
    let block_sampler = Decoration::BlockMatchSamplerQCOM as u32;
    let weight = Decoration::WeightTextureQCOM as u32;
    let qcom = |name: &str| {
        module
            .decorations(module.id(name))
            .into_iter()
            .filter(|decoration| *decoration > 4000)
            .collect::<Vec<u32>>()
    };
    assert_eq!(qcom("weights"), [weight]);
    assert_eq!(qcom("target"), [block_texture]);
    assert_eq!(qcom("combined"), [block_texture]);
    assert_eq!(qcom("window"), [block_texture, block_sampler]);
    assert_eq!(qcom("reference"), [block_texture]);
    assert_eq!(qcom("samp"), [block_sampler]);
}

#[test]
fn qcom_block_matching_decorates_array_elements() {
    let module = QcomModule::new(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_QCOM_image_processing : require
        layout(location = 0) in vec4 coordinate;
        layout(location = 0) out vec4 color;
        layout(set = 0, binding = 3) uniform sampler samp;
        layout(set = 0, binding = 4) uniform texture2D sources[8];
        layout(set = 0, binding = 5) uniform sampler2D samplers[3];
        void main() {
            uvec2 at = uvec2(coordinate.xy);
            uint index = at.x % 8;
            color = textureBlockMatchSSDQCOM(samplers[0], at, sampler2D(sources[index], samp), at, uvec2(4));
        }",
        (1, 4),
        "vulkan1.1spv1.4",
    );
    let decorated: Vec<u32> = module
        .all(Op::Decorate as u32)
        .into_iter()
        .filter(|operands| operands[1] == Decoration::BlockMatchTextureQCOM as u32)
        .map(|operands| operands[0])
        .collect();
    assert_eq!(decorated.len(), 2);
    for id in decorated {
        assert_eq!(module.defining_op(id), Op::AccessChain as u32);
    }
}

#[test]
fn qcom_gather_modes_match_glslang() {
    let module = QcomModule::new(
        ShaderStage::Vertex,
        "#version 460
        #extension GL_QCOM_image_processing3 : enable
        layout(location = 0) in vec2 c2D;
        layout(location = 1) in vec3 c3D;
        layout(location = 2) in ivec2 offset;
        layout(binding = 0) uniform usampler2D usamp;
        layout(binding = 1) uniform sampler2DArray fsamp;
        void main() {
            vec4 sum = vec4(textureGather4x1QCOM(usamp, c2D));
            sum += vec4(textureGatherV2QCOM(usamp, c2D, 1));
            sum += textureGatherH2QCOM(fsamp, c3D, 2);
            sum += textureGatherDOffsetQCOM(fsamp, c3D, offset, 3);
            sum += vec4(textureGather(usamp, c2D, 1));
            gl_Position = sum;
        }",
        (1, 4),
        "vulkan1.1spv1.4",
    );
    let gathers: Vec<(u32, u32, Option<u32>)> = module
        .all(4545)
        .into_iter()
        .map(|operands| {
            (
                module.constant(operands[4]),
                module.constant(operands[5]),
                operands.get(6).copied(),
            )
        })
        .collect();
    assert_eq!(
        gathers,
        [(0, 0, None), (1, 3, None), (2, 2, None), (3, 1, Some(0x10))]
    );
    assert_eq!(module.all(Op::ImageGather as u32).len(), 1);
    assert_eq!(module.capabilities(), [1, 25, 4543, 4544]);
    assert_eq!(module.extensions(), ["SPV_QCOM_image_processing3"]);
}

#[test]
fn qcom_tile_shading_matches_glslang() {
    let compute = QcomModule::new(
        ShaderStage::Compute,
        "#version 460
        #extension GL_QCOM_tile_shading : enable
        layout(local_size_x = 16, local_size_y = 16) in;
        layout(shading_rate_xQCOM = 2, shading_rate_yQCOM = 2, shading_rate_zQCOM = 3) in;
        layout(set = 0, binding = 1, tile_attachmentQCOM, rgba32f) uniform highp image2D color;
        layout(set = 0, binding = 2, tile_attachmentQCOM, rgba32ui) uniform highp uimage2D stencil;
        void main() {
            uvec2 at = clamp(gl_GlobalInvocationID.xy, gl_TileOffsetQCOM,
                gl_TileOffsetQCOM + gl_TileDimensionQCOM.xy + gl_TileApronSizeQCOM);
            imageStore(color, ivec2(at), imageLoad(color, ivec2(at)) * 2.0);
            imageStore(stencil, ivec2(at), imageLoad(stencil, ivec2(at)) + 1);
        }",
        (1, 0),
        "vulkan1.0",
    );
    let modes: Vec<Vec<u32>> = compute
        .all(Op::ExecutionMode as u32)
        .into_iter()
        .map(|operands| operands[1..].to_vec())
        .collect();
    assert_eq!(modes, [vec![4490, 2, 2, 3]]);
    assert_eq!(compute.capabilities(), [1, 4495]);
    assert_eq!(compute.extensions(), ["SPV_QCOM_tile_shading"]);
    for name in ["color", "stencil"] {
        let id = compute.id(name);
        let variable = compute
            .all(Op::Variable as u32)
            .into_iter()
            .find(|operands| operands[1] == id)
            .unwrap();
        assert_eq!(variable[2], 4491, "{name}");
    }
    let built_ins: Vec<u32> = compute
        .all(Op::Decorate as u32)
        .into_iter()
        .filter(|operands| operands[1] == Decoration::BuiltIn as u32)
        .map(|operands| operands[2])
        .collect();
    for built_in in [4492, 4493, 4494] {
        assert!(built_ins.contains(&built_in), "{built_in}");
    }

    let fragment = QcomModule::new(
        ShaderStage::Fragment,
        "#version 460
        #extension GL_QCOM_tile_shading : enable
        layout(non_coherent_attachment_readQCOM) in;
        layout(set = 0, binding = 0, tile_attachmentQCOM, rgba32f) uniform highp image2D color;
        layout(location = 0) out vec4 result;
        void main() {
            result = imageLoad(color, ivec2(gl_TileOffsetQCOM + gl_TileDimensionQCOM.xy / 2));
        }",
        (1, 0),
        "vulkan1.0",
    );
    let modes: Vec<u32> = fragment
        .all(Op::ExecutionMode as u32)
        .into_iter()
        .map(|operands| operands[1])
        .collect();
    assert_eq!(
        modes,
        [
            spirv::ExecutionMode::NonCoherentTileAttachmentReadQCOM as u32,
            spirv::ExecutionMode::OriginUpperLeft as u32
        ]
    );
    for name in ["gl_TileOffsetQCOM", "gl_TileDimensionQCOM"] {
        let decorations = fragment.decorations(fragment.id(name));
        assert!(decorations.contains(&(Decoration::Flat as u32)), "{name}");
    }
}

#[test]
fn qcom_cooperative_matrix_conversions_match_glslang() {
    let module = QcomModule::new(
        ShaderStage::Compute,
        "#version 450
        #pragma use_vulkan_memory_model
        #extension GL_KHR_cooperative_matrix : enable
        #extension GL_KHR_memory_scope_semantics : enable
        #extension GL_EXT_shader_explicit_arithmetic_types_float16 : enable
        #extension GL_QCOM_cooperative_matrix_conversion : enable
        layout(constant_id = 3) const uint TILE = 4;
        layout(set = 0, binding = 0) buffer Output { float x[]; } result;
        layout(local_size_x = 64) in;
        void main() {
            uint packed[8];
            float values[8];
            float16_t halves[16];
            uint wide[64];
            uint tiled[TILE];
            bitcastQCOM(packed, values);
            bitcastQCOM(packed, halves);
            extractSubArrayQCOM(wide, 8, packed);
            extractSubArrayQCOM(wide, 4, tiled);
            coopmat<float, gl_ScopeSubgroup, 64, 8, gl_MatrixUseA> a;
            vectorToCoopmatQCOM(packed, a);
            coopmatToVectorQCOM(a, values);
            coopMatStore(a, result.x, 0, 8, gl_CooperativeMatrixLayoutRowMajor);
            result.x[1] = values[2] + float(halves[3]) + float(tiled[0]);
        }",
        (1, 3),
        "vulkan1.1",
    );
    for (op, count) in [(4497, 2), (4542, 2), (4540, 1), (4541, 1)] {
        assert_eq!(module.all(op).len(), count, "opcode {op}");
    }
    assert!(module.capabilities().contains(&4496));
    assert!(module
        .extensions()
        .contains(&"SPV_QCOM_cooperative_matrix_conversion".to_string()));
    let indices: Vec<u32> = module
        .all(4542)
        .into_iter()
        .map(|operands| module.constant(operands[3]))
        .collect();
    assert_eq!(indices, [8, 4]);
}

#[test]
fn loop_attributes_match_glslang() {
    let source = "#version 450
        #extension GL_EXT_control_flow_attributes : enable
        #extension GL_QCOM_multiple_wait_queues : enable
        layout(local_size_x = 1) in;
        layout(set = 0, binding = 0) buffer Data { uint value; } data;
        void main() {
            [[multiple_wait_queuesQCOM]] for (uint i = 0; i < data.value; ++i) { data.value += 1; }
            [[multiple_wait_queuesQCOM(2), unroll]] while (data.value < 9) { data.value += 2; }
            [[dependency_length(4), min_iterations(3), dont_unroll]] do { data.value += 3; } while (data.value < 20);
            [[unroll, dont_unroll, dependency_infinite]] for (;;) { if (data.value > 40) break; data.value += 4; }
        }";
    let controls = |lang_version, target| {
        QcomModule::new(ShaderStage::Compute, source, lang_version, target)
            .all(Op::LoopMerge as u32)
            .into_iter()
            .map(|operands| operands[2..].to_vec())
            .collect::<Vec<Vec<u32>>>()
    };
    assert_eq!(
        controls((1, 4), "vulkan1.1spv1.4"),
        [
            vec![0x1000_0000, 0],
            vec![0x1000_0001, 2],
            vec![0x1a, 4, 3],
            vec![0x6],
        ]
    );
    assert_eq!(
        controls((1, 0), "vulkan1.0"),
        [
            vec![0x1000_0000, 0],
            vec![0x1000_0001, 2],
            vec![0x2],
            vec![0x2],
        ]
    );
}

#[test]
fn uncalled_functions_are_not_compiled() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        #extension GL_EXT_shader_explicit_arithmetic_types : require
        layout(location = 0) out vec4 color;
        float used(float x) { return x * 2.0; }
        double unused(int16_t value) { f64vec2 v = f64vec2(value); return v.x; }
        void main() { color = vec4(used(1.0)); }",
    );
    assert_eq!(instructions(&module, Op::Function).len(), 2);
    assert!(instructions(&module, Op::TypeFloat)
        .iter()
        .all(|inst| inst.operands[0] == Operand::LiteralBit32(32)));
    let capabilities = capabilities(&module);
    assert!(!capabilities.contains(&spirv::Capability::Float64));
    assert!(!capabilities.contains(&spirv::Capability::Int16));
}

#[test]
fn constant_locals_are_folded_and_not_stored() {
    let module = compile(
        ShaderStage::Vertex,
        "#version 460
        layout(location = 0) out float o;
        void main() {
            const mat2 f = matrixCompMult(mat2(1.0), mat2(3.0));
            const dmat2 d = matrixCompMult(dmat2(2.0), dmat2(1.5));
            o = float(f[0][0] + d[1][1]);
        }",
    );
    assert!(!capabilities(&module).contains(&spirv::Capability::Float64));
    assert!(instructions(&module, Op::TypeFloat)
        .iter()
        .all(|inst| inst.operands[0] == Operand::LiteralBit32(32)));
    assert!(instructions(&module, Op::Variable)
        .iter()
        .all(|inst| inst.operands[0] != Operand::StorageClass(spirv::StorageClass::Function)));
    let stores = instructions(&module, Op::Store);
    assert_eq!(stores.len(), 1);
    assert_eq!(constant(&module, &stores[0].operands[1]), 6.0_f32.to_bits());
}

#[test]
fn bit_field_operands_are_not_clamped() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        layout(set = 0, binding = 0) uniform U { int value; int offset; int bits; };
        layout(location = 0) out ivec2 color;
        void main() {
            color = ivec2(bitfieldExtract(value, offset, bits),
                          bitfieldInsert(value, 7, offset, bits));
        }",
    );
    let extract = instructions(&module, Op::BitFieldSExtract);
    let insert = instructions(&module, Op::BitFieldInsert);
    assert_eq!((extract.len(), insert.len()), (1, 1));
    let loaded_operand = |id: u32| {
        module
            .all_inst_iter()
            .find(|inst| inst.result_id == Some(id))
            .map(|inst| inst.class.opcode)
    };
    for operand in extract[0].operands.iter().chain(&insert[0].operands[2..]) {
        assert!(matches!(
            loaded_operand(operand.unwrap_id_ref()),
            Some(Op::Load | Op::Bitcast)
        ));
    }
    assert!(instructions(&module, Op::ExtInst).is_empty());
}

#[test]
fn constant_locals_can_be_indexed_dynamically() {
    let module = compile(
        ShaderStage::Fragment,
        "#version 450
        layout(location = 0) flat in int i;
        layout(location = 0) out vec4 color;
        void main() {
            const float table[3] = float[3](1.0, 2.0, 3.0);
            const mat2 m = mat2(1.0, 2.0, 3.0, 4.0);
            color = vec4(table[i], m[i][i], table[1], m[1][0]);
        }",
    );
    assert!(!instructions(&module, Op::ConstantComposite).is_empty());
    assert!(!instructions(&module, Op::AccessChain).is_empty());
}
