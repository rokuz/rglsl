use alloc::collections::BTreeSet;
use alloc::format;
use alloc::string::{String, ToString};
use alloc::vec;
use alloc::vec::Vec;

use crate::builtins::{Builtins, ResourceLimits, Stage};
use crate::scope::{Direction, Storage, SymbolKind};
use crate::types::{
    ArraySize, NumericFeatures, Opaque, OpaqueKind, SampledType, Scalar, TextureDimension, Type,
    TypeKind, TypeRegistry,
};

fn builtins(version: u32, stage: Stage) -> Builtins {
    Builtins::new(version, stage, &ResourceLimits::default())
}

fn signatures(builtins: &Builtins, name: &str) -> Vec<String> {
    builtins
        .overloads(name)
        .iter()
        .filter_map(|id| builtins.function(*id))
        .map(|function| {
            let parameters: Vec<String> = function
                .parameters
                .iter()
                .map(|parameter| {
                    let prefix = match parameter.direction {
                        Direction::In => "",
                        Direction::Out => "out ",
                        Direction::Inout => "inout ",
                    };
                    format!("{prefix}{}", parameter.ty.display(builtins.types()))
                })
                .collect();
            format!(
                "{} {}({})",
                function.return_type.display(builtins.types()),
                function.name,
                parameters.join(", ")
            )
        })
        .collect()
}

fn variable_names(builtins: &Builtins) -> BTreeSet<String> {
    builtins
        .variables()
        .map(|(name, _)| name.to_string())
        .collect()
}

#[test]
fn the_tables_have_the_expected_sizes() {
    let expected = [
        (Stage::Vertex, 5882, 27, 167, 202),
        (Stage::TessControl, 5883, 27, 163, 195),
        (Stage::TessEvaluation, 5882, 27, 171, 203),
        (Stage::Geometry, 5886, 27, 169, 201),
        (Stage::Fragment, 6136, 27, 168, 200),
        (Stage::Compute, 5886, 27, 161, 193),
        (Stage::Mesh, 5888, 27, 175, 208),
        (Stage::RayGeneration, 5882, 32, 153, 189),
    ];
    for (stage, functions, added, variables_450, variables_460) in expected {
        let older = builtins(450, stage);
        let newer = builtins(460, stage);
        assert_eq!(older.functions().len(), functions, "{stage:?}");
        assert_eq!(newer.functions().len(), functions + added, "{stage:?}");
        assert_eq!(older.variables().count(), variables_450, "{stage:?}");
        assert_eq!(newer.variables().count(), variables_460, "{stage:?}");
    }
}

#[test]
fn overloads_are_unique() {
    for stage in Stage::ALL {
        let table = builtins(460, stage);
        let mut seen = BTreeSet::new();
        for function in table.functions() {
            let types: Vec<Type> = function
                .parameters
                .iter()
                .map(|parameter| parameter.ty.clone())
                .collect();
            assert!(
                seen.insert((function.name.clone(), types)),
                "{stage:?}: {}",
                function.name
            );
        }
    }
}

#[test]
fn generic_prototypes_expand_to_every_size() {
    let table = builtins(450, Stage::Vertex);
    assert_eq!(
        signatures(&table, "radians"),
        [
            "float radians(float)",
            "vec2 radians(vec2)",
            "vec3 radians(vec3)",
            "vec4 radians(vec4)",
            "float16_t radians(float16_t)",
            "f16vec2 radians(f16vec2)",
            "f16vec3 radians(f16vec3)",
            "f16vec4 radians(f16vec4)"
        ]
    );
    assert_eq!(
        signatures(&table, "sqrt"),
        [
            "float sqrt(float)",
            "vec2 sqrt(vec2)",
            "vec3 sqrt(vec3)",
            "vec4 sqrt(vec4)",
            "double sqrt(double)",
            "dvec2 sqrt(dvec2)",
            "dvec3 sqrt(dvec3)",
            "dvec4 sqrt(dvec4)",
            "float16_t sqrt(float16_t)",
            "f16vec2 sqrt(f16vec2)",
            "f16vec3 sqrt(f16vec3)",
            "f16vec4 sqrt(f16vec4)"
        ]
    );
    assert_eq!(signatures(&table, "mod").len(), 21);
    assert_eq!(signatures(&table, "mix").len(), 69);
    assert_eq!(signatures(&table, "min").len(), 77);
    assert_eq!(signatures(&table, "clamp").len(), 77);
    assert_eq!(signatures(&table, "matrixCompMult").len(), 27);
    assert_eq!(signatures(&table, "inverse").len(), 9);
    assert_eq!(
        signatures(&table, "cross"),
        [
            "vec3 cross(vec3, vec3)",
            "dvec3 cross(dvec3, dvec3)",
            "f16vec3 cross(f16vec3, f16vec3)"
        ]
    );
    assert!(
        signatures(&table, "outerProduct").contains(&"mat2x3 outerProduct(vec3, vec2)".to_string())
    );
    assert!(signatures(&table, "transpose").contains(&"dmat4x2 transpose(dmat2x4)".to_string()));
    assert!(signatures(&table, "modf").contains(&"vec3 modf(vec3, out vec3)".to_string()));
    assert!(signatures(&table, "frexp").contains(&"dvec2 frexp(dvec2, out ivec2)".to_string()));
    assert!(
        signatures(&table, "atomicAdd").contains(&"uint atomicAdd(inout uint, uint)".to_string())
    );
    assert!(signatures(&table, "umulExtended")
        .contains(&"void umulExtended(uvec2, uvec2, out uvec2, out uvec2)".to_string()));
    assert_eq!(signatures(&table, "any").len(), 3);
    assert_eq!(signatures(&table, "equal").len(), 36);
    assert_eq!(signatures(&table, "lessThan").len(), 33);
}

#[test]
fn trigonometry_has_no_double_overloads() {
    let table = builtins(460, Stage::Fragment);
    for name in ["sin", "cos", "atan", "pow", "exp", "log", "radians"] {
        assert!(
            signatures(&table, name)
                .iter()
                .all(|signature| !signature.contains("double") && !signature.contains("dvec")),
            "{name}"
        );
    }
}

#[test]
fn texture_functions_follow_the_sampler_type() {
    let table = builtins(450, Stage::Fragment);
    let texture = signatures(&table, "texture");
    for expected in [
        "vec4 texture(sampler2D, vec2)",
        "vec4 texture(sampler2D, vec2, float)",
        "ivec4 texture(isampler3D, vec3)",
        "uvec4 texture(usamplerCubeArray, vec4)",
        "float texture(sampler2DShadow, vec3)",
        "float texture(samplerCubeArrayShadow, vec4, float)",
        "float texture(sampler1DArrayShadow, vec3, float)",
    ] {
        assert!(texture.contains(&expected.to_string()), "{expected}");
    }
    assert!(!texture.iter().any(|signature| signature.contains("Buffer")));
    assert!(!texture.iter().any(|signature| signature.contains("2DMS")));
    assert!(!texture.contains(&"float texture(sampler2DArrayShadow, vec4, float)".to_string()));
    let fetch = signatures(&table, "texelFetch");
    for expected in [
        "vec4 texelFetch(sampler2D, ivec2, int)",
        "vec4 texelFetch(samplerBuffer, int)",
        "ivec4 texelFetch(isampler2DMSArray, ivec3, int)",
        "uvec4 texelFetch(utextureBuffer, int)",
    ] {
        assert!(fetch.contains(&expected.to_string()), "{expected}");
    }
    assert!(!fetch.iter().any(|signature| signature.contains("Cube")));
    assert!(!fetch
        .iter()
        .any(|signature| signature.contains("texture2D")));
    let size = signatures(&table, "textureSize");
    for expected in [
        "ivec2 textureSize(sampler2D, int)",
        "ivec2 textureSize(samplerCube, int)",
        "ivec3 textureSize(samplerCubeArray, int)",
        "ivec3 textureSize(sampler2DArrayShadow, int)",
        "int textureSize(samplerBuffer)",
        "ivec2 textureSize(sampler2DMS)",
        "ivec3 textureSize(sampler2DMSArray)",
    ] {
        assert!(size.contains(&expected.to_string()), "{expected}");
    }
    let gather = signatures(&table, "textureGatherOffsets");
    assert!(gather.contains(
        &"vec4 textureGatherOffsets(sampler2DShadow, vec2, float, ivec2[4])".to_string()
    ));
    assert!(signatures(&table, "textureProjGradOffset")
        .contains(&"vec4 textureProjGradOffset(sampler2D, vec4, vec2, vec2, ivec2)".to_string()));
    assert!(signatures(&table, "textureQueryLevels")
        .contains(&"int textureQueryLevels(samplerCubeShadow)".to_string()));
}

#[test]
fn image_functions_follow_the_image_type() {
    let table = builtins(450, Stage::Compute);
    for (name, expected) in [
        ("imageLoad", "vec4 imageLoad(image2D, ivec2)"),
        ("imageLoad", "ivec4 imageLoad(iimage2DMS, ivec2, int)"),
        ("imageLoad", "uvec4 imageLoad(uimageCubeArray, ivec3)"),
        ("imageStore", "void imageStore(imageBuffer, int, vec4)"),
        ("imageStore", "void imageStore(iimage1DArray, ivec2, ivec4)"),
        ("imageSize", "ivec3 imageSize(image2DArray)"),
        ("imageSize", "ivec2 imageSize(imageCube)"),
        ("imageSamples", "int imageSamples(image2DMSArray)"),
        ("imageAtomicAdd", "int imageAtomicAdd(iimage2D, ivec2, int)"),
        (
            "imageAtomicExchange",
            "float imageAtomicExchange(image3D, ivec3, float)",
        ),
        (
            "imageAtomicCompSwap",
            "uint imageAtomicCompSwap(uimage2D, ivec2, uint, uint)",
        ),
    ] {
        assert!(
            signatures(&table, name).contains(&expected.to_string()),
            "{expected}"
        );
    }
    assert!(signatures(&table, "imageAtomicAdd")
        .iter()
        .all(|signature| !signature.starts_with("float")));
}

#[test]
fn stage_specific_functions_are_gated() {
    let fragment_only = [
        "dFdx",
        "dFdy",
        "fwidth",
        "dFdxFine",
        "fwidthCoarse",
        "interpolateAtCentroid",
        "interpolateAtSample",
        "interpolateAtOffset",
        "textureQueryLod",
        "subpassLoad",
    ];
    for stage in Stage::ALL {
        let table = builtins(450, stage);
        for name in fragment_only {
            assert_eq!(
                !table.overloads(name).is_empty(),
                stage == Stage::Fragment,
                "{stage:?} {name}"
            );
        }
        for name in [
            "EmitVertex",
            "EndPrimitive",
            "EmitStreamVertex",
            "EndStreamPrimitive",
        ] {
            assert_eq!(
                !table.overloads(name).is_empty(),
                stage == Stage::Geometry,
                "{stage:?} {name}"
            );
        }
        assert_eq!(
            !table.overloads("barrier").is_empty(),
            matches!(
                stage,
                Stage::TessControl | Stage::Compute | Stage::Mesh | Stage::Task
            ),
            "{stage:?}"
        );
        for name in ["memoryBarrierShared", "groupMemoryBarrier"] {
            assert_eq!(
                !table.overloads(name).is_empty(),
                matches!(stage, Stage::Compute | Stage::Mesh | Stage::Task),
                "{stage:?} {name}"
            );
        }
        for name in [
            "memoryBarrierBuffer",
            "memoryBarrierImage",
            "controlBarrier",
        ] {
            assert_eq!(table.overloads(name).len(), 1, "{stage:?} {name}");
        }
        assert_eq!(table.overloads("memoryBarrier").len(), 2, "{stage:?}");
        let bias = signatures(&table, "texture")
            .contains(&"vec4 texture(sampler2D, vec2, float)".to_string());
        assert_eq!(bias, stage == Stage::Fragment, "{stage:?}");
    }
}

#[test]
fn version_specific_functions_are_gated() {
    for name in ["anyInvocation", "allInvocations", "allInvocationsEqual"] {
        assert!(builtins(450, Stage::Fragment).overloads(name).is_empty());
        assert_eq!(builtins(460, Stage::Fragment).overloads(name).len(), 1);
    }
}

#[test]
fn functions_removed_under_vulkan_are_absent() {
    let table = builtins(460, Stage::Fragment);
    for name in [
        "noise1",
        "noise2",
        "noise3",
        "noise4",
        "atomicCounter",
        "atomicCounterIncrement",
        "atomicCounterDecrement",
        "atomicCounterAdd",
        "memoryBarrierAtomicCounter",
        "ftransform",
        "texture2D",
        "shadow2D",
        "textureCube",
    ] {
        assert!(table.overloads(name).is_empty(), "{name}");
    }
}

#[test]
fn every_core_function_name_is_known() {
    let table = builtins(460, Stage::Fragment);
    let names = "radians degrees sin cos tan asin acos atan sinh cosh tanh asinh acosh atanh
        pow exp log exp2 log2 sqrt inversesqrt
        abs sign floor trunc round roundEven ceil fract mod modf min max clamp mix step smoothstep
        isnan isinf floatBitsToInt floatBitsToUint intBitsToFloat uintBitsToFloat fma frexp ldexp
        packUnorm2x16 packSnorm2x16 packUnorm4x8 packSnorm4x8 unpackUnorm2x16 unpackSnorm2x16
        unpackUnorm4x8 unpackSnorm4x8 packHalf2x16 unpackHalf2x16 packDouble2x32 unpackDouble2x32
        length distance dot cross normalize faceforward reflect refract
        matrixCompMult outerProduct transpose determinant inverse
        lessThan lessThanEqual greaterThan greaterThanEqual equal notEqual any all not
        uaddCarry usubBorrow umulExtended imulExtended bitfieldExtract bitfieldInsert
        bitfieldReverse bitCount findLSB findMSB
        textureSize textureQueryLod textureQueryLevels textureSamples
        texture textureProj textureLod textureOffset texelFetch texelFetchOffset
        textureProjOffset textureLodOffset textureProjLod textureProjLodOffset textureGrad
        textureGradOffset textureProjGrad textureProjGradOffset
        textureGather textureGatherOffset textureGatherOffsets
        atomicAdd atomicMin atomicMax atomicAnd atomicOr atomicXor atomicExchange atomicCompSwap
        imageSize imageSamples imageLoad imageStore imageAtomicAdd imageAtomicMin imageAtomicMax
        imageAtomicAnd imageAtomicOr imageAtomicXor imageAtomicExchange imageAtomicCompSwap
        dFdx dFdy dFdxFine dFdyFine dFdxCoarse dFdyCoarse fwidth fwidthFine fwidthCoarse
        interpolateAtCentroid interpolateAtSample interpolateAtOffset
        memoryBarrier memoryBarrierBuffer memoryBarrierImage
        anyInvocation allInvocations allInvocationsEqual subpassLoad
        atomicLoad atomicStore imageAtomicLoad imageAtomicStore controlBarrier";
    for name in names.split_whitespace() {
        assert!(!table.overloads(name).is_empty(), "{name}");
    }
    assert_eq!(table.function_names().count(), 324);
}

fn storage_of(builtins: &Builtins, name: &str) -> Option<Storage> {
    let (_, id) = builtins.variables().find(|(found, _)| *found == name)?;
    let symbol = builtins.symbols().get(usize::try_from(id.index()).ok()?)?;
    match &symbol.kind {
        SymbolKind::Variable(variable) => Some(variable.qualifiers.storage),
        SymbolKind::BlockMember { instance, .. } => builtins
            .symbols()
            .get(usize::try_from(instance.index()).ok()?)?
            .variable()
            .map(|variable| variable.qualifiers.storage),
        SymbolKind::Struct(_)
        | SymbolKind::Reference(_)
        | SymbolKind::BufferType(_)
        | SymbolKind::BlockName => None,
    }
}

#[test]
fn vertex_variables() {
    let older = variable_names(&builtins(450, Stage::Vertex));
    for name in [
        "gl_VertexIndex",
        "gl_InstanceIndex",
        "gl_Position",
        "gl_PointSize",
        "gl_ClipDistance",
        "gl_CullDistance",
        "gl_Layer",
        "gl_ViewportIndex",
    ] {
        assert!(older.contains(name), "{name}");
    }
    for name in [
        "gl_VertexID",
        "gl_InstanceID",
        "gl_BaseVertex",
        "gl_BaseInstance",
        "gl_DrawID",
        "gl_FragCoord",
        "gl_in",
    ] {
        assert!(!older.contains(name), "{name}");
    }
    let newer = variable_names(&builtins(460, Stage::Vertex));
    for name in ["gl_BaseVertex", "gl_BaseInstance", "gl_DrawID"] {
        assert!(newer.contains(name), "{name}");
    }
    let table = builtins(450, Stage::Vertex);
    assert_eq!(storage_of(&table, "gl_VertexIndex"), Some(Storage::In));
    assert_eq!(storage_of(&table, "gl_Position"), Some(Storage::Out));
}

#[test]
fn tessellation_and_geometry_variables() {
    let control = builtins(450, Stage::TessControl);
    let names = variable_names(&control);
    for name in [
        "gl_in",
        "gl_out",
        "gl_PatchVerticesIn",
        "gl_PrimitiveID",
        "gl_InvocationID",
        "gl_TessLevelOuter",
        "gl_TessLevelInner",
    ] {
        assert!(names.contains(name), "{name}");
    }
    assert!(!names.contains("gl_Position"));
    assert!(!names.contains("gl_TessCoord"));
    let array_of = |table: &Builtins, name: &str| {
        let (_, id) = table.variables().find(|(found, _)| *found == name)?;
        let symbol = table.symbols().get(usize::try_from(id.index()).ok()?)?;
        symbol.variable().map(|variable| variable.ty.array.clone())
    };
    assert_eq!(
        array_of(&control, "gl_in"),
        Some(vec![ArraySize::Sized(32)])
    );
    assert_eq!(array_of(&control, "gl_out"), Some(vec![ArraySize::Unsized]));
    assert_eq!(
        array_of(&control, "gl_TessLevelOuter"),
        Some(vec![ArraySize::Sized(4)])
    );
    assert_eq!(
        storage_of(&control, "gl_TessLevelOuter"),
        Some(Storage::Out)
    );
    let evaluation = builtins(450, Stage::TessEvaluation);
    let names = variable_names(&evaluation);
    for name in ["gl_in", "gl_TessCoord", "gl_Position", "gl_TessLevelInner"] {
        assert!(names.contains(name), "{name}");
    }
    assert!(!names.contains("gl_out"));
    assert_eq!(
        storage_of(&evaluation, "gl_TessLevelOuter"),
        Some(Storage::In)
    );
    let geometry = builtins(450, Stage::Geometry);
    let names = variable_names(&geometry);
    for name in [
        "gl_in",
        "gl_PrimitiveIDIn",
        "gl_InvocationID",
        "gl_PrimitiveID",
        "gl_Layer",
        "gl_ViewportIndex",
        "gl_Position",
    ] {
        assert!(names.contains(name), "{name}");
    }
    assert_eq!(array_of(&geometry, "gl_in"), Some(vec![ArraySize::Unsized]));
    assert_eq!(storage_of(&geometry, "gl_Layer"), Some(Storage::Out));
}

#[test]
fn fragment_and_compute_variables() {
    let fragment = builtins(450, Stage::Fragment);
    let names = variable_names(&fragment);
    for name in [
        "gl_FragCoord",
        "gl_FrontFacing",
        "gl_FragDepth",
        "gl_PointCoord",
        "gl_ClipDistance",
        "gl_CullDistance",
        "gl_PrimitiveID",
        "gl_SampleID",
        "gl_SamplePosition",
        "gl_SampleMaskIn",
        "gl_SampleMask",
        "gl_Layer",
        "gl_ViewportIndex",
        "gl_HelperInvocation",
    ] {
        assert!(names.contains(name), "{name}");
    }
    for name in [
        "gl_FragColor",
        "gl_FragData",
        "gl_Position",
        "gl_NumSamples",
        "gl_DepthRange",
    ] {
        assert!(!names.contains(name), "{name}");
    }
    assert_eq!(storage_of(&fragment, "gl_FragDepth"), Some(Storage::Out));
    assert_eq!(storage_of(&fragment, "gl_SampleMask"), Some(Storage::Out));
    assert_eq!(storage_of(&fragment, "gl_FragCoord"), Some(Storage::In));
    let compute = builtins(450, Stage::Compute);
    let names = variable_names(&compute);
    for name in [
        "gl_NumWorkGroups",
        "gl_WorkGroupSize",
        "gl_WorkGroupID",
        "gl_LocalInvocationID",
        "gl_GlobalInvocationID",
        "gl_LocalInvocationIndex",
    ] {
        assert!(names.contains(name), "{name}");
    }
    assert!(!variable_names(&fragment).contains("gl_WorkGroupSize"));
}

#[test]
fn constants_take_their_values_from_the_resource_limits() {
    let mut limits = ResourceLimits::default();
    assert_eq!(limits.max_draw_buffers, 32);
    assert_eq!(limits.max_clip_distances, 8);
    assert_eq!(limits.max_patch_vertices, 32);
    assert_eq!(limits.min_program_texel_offset, -8);
    assert_eq!(limits.max_compute_work_group_size, [1024, 1024, 64]);
    assert_eq!(limits.integer_constants().len(), 77);
    limits.max_patch_vertices = 12;
    let table = Builtins::new(450, Stage::TessControl, &limits);
    let value = |name: &str| {
        let (_, id) = table.variables().find(|(found, _)| *found == name)?;
        let symbol = table.symbols().get(usize::try_from(id.index()).ok()?)?;
        symbol.variable()?.value.as_ref()?.scalar_i64()
    };
    assert_eq!(value("gl_MaxPatchVertices"), Some(12));
    assert_eq!(value("gl_MaxDrawBuffers"), Some(32));
    assert_eq!(value("gl_MaxCombinedTextureImageUnits"), Some(80));
    let input = table
        .variables()
        .find(|(name, _)| *name == "gl_in")
        .and_then(|(_, id)| table.symbols().get(usize::try_from(id.index()).ok()?))
        .and_then(|symbol| symbol.variable())
        .map(|variable| variable.ty.array.clone());
    assert_eq!(input, Some(vec![ArraySize::Sized(12)]));
    for name in [
        "gl_MaxVaryingFloats",
        "gl_MaxFragmentInputVectors",
        "gl_MaxVertexOutputVectors",
    ] {
        assert_eq!(value(name), None, "{name}");
    }
}

#[test]
fn opaque_type_names_round_trip() {
    let names = [
        "sampler",
        "samplerShadow",
        "sampler1D",
        "sampler2D",
        "sampler3D",
        "samplerCube",
        "sampler1DArray",
        "sampler2DArray",
        "samplerCubeArray",
        "samplerBuffer",
        "sampler2DMS",
        "sampler2DMSArray",
        "sampler1DShadow",
        "sampler2DShadow",
        "samplerCubeShadow",
        "sampler1DArrayShadow",
        "sampler2DArrayShadow",
        "samplerCubeArrayShadow",
        "isampler2D",
        "usampler3D",
        "texture2D",
        "itextureCubeArray",
        "utextureBuffer",
        "texture2DMSArray",
        "image2D",
        "iimage2D",
        "uimage3D",
        "imageCubeArray",
        "iimageBuffer",
        "uimage2DMS",
        "subpassInput",
        "isubpassInput",
        "usubpassInputMS",
    ];
    for name in names {
        let opaque = Opaque::from_keyword(name).unwrap_or_else(|| panic!("{name}"));
        assert_eq!(opaque.to_string(), name);
    }
    for name in [
        "atomic_uint",
        "sampler2DRect",
        "isampler2DShadow",
        "sampler3DShadow",
        "image2DShadow",
        "samplerBufferShadow",
        "sampler4D",
        "int",
        "vec3",
    ] {
        assert_eq!(Opaque::from_keyword(name), None, "{name}");
    }
    let image = Opaque::from_keyword("uimage2DArray").expect("an image type");
    assert_eq!(image.kind, OpaqueKind::Image);
    assert_eq!(image.sampled, SampledType::Uint);
    assert_eq!(image.dimension, TextureDimension::D2);
    assert!(image.arrayed && !image.shadow && !image.multisample);
}

#[test]
fn type_helpers() {
    let registry = TypeRegistry::new();
    let vec3 = Type::vector(Scalar::Float, 3);
    let mat = Type::matrix(Scalar::Double, 4, 2);
    assert_eq!(vec3.display(&registry).to_string(), "vec3");
    assert_eq!(mat.display(&registry).to_string(), "dmat4x2");
    assert_eq!(
        Type::matrix(Scalar::Float, 3, 3)
            .display(&registry)
            .to_string(),
        "mat3"
    );
    assert_eq!(Type::vector(Scalar::Bool, 1), Type::BOOL);
    assert_eq!(vec3.component_count(), Some(3));
    assert_eq!(mat.component_count(), Some(8));
    assert_eq!(mat.column_type(), Some(Type::vector(Scalar::Double, 2)));
    assert_eq!(mat.row_type(), Some(Type::vector(Scalar::Double, 4)));
    assert_eq!(mat.element_type(), mat.column_type());
    assert_eq!(mat.length(), Some(4));
    assert_eq!(vec3.element_type(), Some(Type::FLOAT));
    assert_eq!(Type::FLOAT.element_type(), None);
    let nested = Type::INT
        .array_of(ArraySize::Sized(3))
        .array_of(ArraySize::Unsized);
    assert_eq!(nested.display(&registry).to_string(), "int[][3]");
    assert_eq!(nested.length(), None);
    assert_eq!(nested.component_count(), None);
    let inner = nested.element_type().expect("an element type");
    assert_eq!(inner.display(&registry).to_string(), "int[3]");
    assert_eq!(inner.length(), Some(3));
    assert_eq!(inner.flattened_size(&registry), Some(3));
    assert!(nested.contains_unsized_array(&registry));
    assert!(vec3.is_numeric() && !Type::BOOL.is_numeric() && !inner.is_numeric());
    assert!(Type::UINT.is_scalar_integer() && !vec3.is_integer());
    let sampler = Type::opaque(Opaque::plain_sampler(false));
    assert!(sampler.is_opaque() && sampler.contains_opaque(&registry));
    assert!(!vec3.is_opaque());
    assert!(Type::ERROR.is_error() && Type::VOID.is_void());
    assert_eq!(Type::ERROR.display(&registry).to_string(), "<error>");
}

#[test]
fn implicit_conversions_follow_the_rank() {
    let ranks = [Scalar::Int, Scalar::Uint, Scalar::Float, Scalar::Double];
    for (from_index, from) in ranks.iter().enumerate() {
        for (to_index, to) in ranks.iter().enumerate() {
            assert_eq!(
                from.converts_implicitly_to(*to),
                from_index <= to_index,
                "{from:?} to {to:?}"
            );
        }
        assert!(!from.converts_implicitly_to(Scalar::Bool));
        assert!(!Scalar::Bool.converts_implicitly_to(*from));
    }
    assert_eq!(
        Scalar::Bool.common(Scalar::Bool, NumericFeatures::default()),
        None
    );
    assert_eq!(
        Scalar::Int.common(Scalar::Double, NumericFeatures::default()),
        Some(Scalar::Double)
    );
    let ivec2 = Type::vector(Scalar::Int, 2);
    assert!(ivec2.converts_implicitly_to(&Type::vector(Scalar::Double, 2)));
    assert!(!ivec2.converts_implicitly_to(&Type::vector(Scalar::Float, 3)));
    assert!(!ivec2.converts_implicitly_to(&Type::FLOAT));
    assert!(
        Type::matrix(Scalar::Float, 2, 3).converts_implicitly_to(&Type::matrix(
            Scalar::Double,
            2,
            3
        ))
    );
    assert!(
        !Type::matrix(Scalar::Float, 2, 3).converts_implicitly_to(&Type::matrix(
            Scalar::Double,
            3,
            2
        ))
    );
    let ints = Type::INT.array_of(ArraySize::Sized(2));
    let floats = Type::FLOAT.array_of(ArraySize::Sized(2));
    assert!(!ints.converts_implicitly_to(&floats));
    assert!(ints.converts_implicitly_to(&ints));
}

#[test]
fn structs_are_interned_with_their_properties() {
    use crate::scope::Qualifiers;
    use crate::types::Member;
    let mut registry = TypeRegistry::new();
    let member = |name: &str, ty: Type| Member {
        name: name.to_string(),
        ty,
        qualifiers: Qualifiers::default(),
    };
    let inner = registry
        .add_struct(
            Some("Inner".to_string()),
            vec![
                member("weights", Type::FLOAT.array_of(ArraySize::Sized(4))),
                member("image", Type::opaque(Opaque::plain_sampler(false))),
            ],
        )
        .expect("a struct id");
    let outer = registry
        .add_struct(
            Some("Outer".to_string()),
            vec![
                member("inner", Type::structure(inner)),
                member("count", Type::INT),
            ],
        )
        .expect("a struct id");
    let same = registry
        .add_struct(
            Some("Outer".to_string()),
            vec![
                member("inner", Type::structure(inner)),
                member("count", Type::INT),
            ],
        )
        .expect("a struct id");
    assert_ne!(outer, same);
    let ty = Type::structure(outer);
    assert!(ty.contains_opaque(&registry));
    assert!(!ty.is_opaque());
    assert!(ty.contains_scalar(&registry, Scalar::Float));
    assert!(ty.contains_scalar(&registry, Scalar::Int));
    assert!(!ty.contains_scalar(&registry, Scalar::Double));
    assert_eq!(ty.display(&registry).to_string(), "Outer");
    assert_eq!(
        ty.clone()
            .array_of(ArraySize::Sized(2))
            .display(&registry)
            .to_string(),
        "Outer[2]"
    );
    assert!(matches!(ty.kind, TypeKind::Struct(_)));
    let structure = registry.structure(outer).expect("the struct");
    assert_eq!(structure.member("count").map(|(index, _)| index), Some(1));
    assert_eq!(structure.flattened_size, None);
    assert_eq!(registry.structs().len(), 3);
}
