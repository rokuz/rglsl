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

    // Not supported yet, and reported rather than miscompiled.
    let error = parse(
        ShaderStage::Fragment,
        "#version 450
        layout(binding = 0) uniform U { bool flags[4]; } u;
        void main() {}",
    )
    .unwrap_err();
    assert!(error.contains("booleans inside arrays"), "{error}");
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
    assert_eq!(names.len(), 3);
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

    let module = compile(
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
