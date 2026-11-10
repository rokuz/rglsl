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

/// Automatic locations follow glslang's `--auto-map-locations`: one counter
/// for inputs and one for outputs, advanced by the size of each type, and
/// explicit locations are ignored.
#[test]
fn automatic_locations_match_glslang() {
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
    // Not validated: glslang lets the explicit locations overlap the
    // automatic ones here, which is not a valid interface.
    let module = glsl::Frontend::default().parse(&options, source).unwrap();

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
    // What `glslang -V --auto-map-locations` assigns to this shader: `i1`
    // is a matrix and takes three locations, `i3` an array that takes two.
    assert_eq!(
        locations(rglsl::AddressSpace::Input),
        [
            ("i0", 0),
            ("i1", 1),
            ("i2unused", 4),
            ("i3", 5),
            ("i5", 7),
            ("iexp", 1),
        ]
    );
    assert_eq!(
        locations(rglsl::AddressSpace::Output),
        [("o0", 0), ("o1", 1), ("oexp", 0)]
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
        assert!(error.contains("InvalidInterpolationForInteger"), "{error}");
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
