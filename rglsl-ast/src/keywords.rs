use crate::ast::{BasicType, SingleTypeQualifier};

const SAMPLED_SHAPES: [&str; 10] = [
    "1D",
    "2D",
    "3D",
    "Cube",
    "1DArray",
    "2DArray",
    "CubeArray",
    "Buffer",
    "2DMS",
    "2DMSArray",
];

const SHADOW_SHAPES: [&str; 6] = [
    "1DShadow",
    "2DShadow",
    "CubeShadow",
    "1DArrayShadow",
    "2DArrayShadow",
    "CubeArrayShadow",
];

const SAMPLED_FAMILIES: [&str; 3] = ["sampler", "texture", "image"];

const SYNTAX_WORDS: [&str; 19] = [
    "struct",
    "void",
    "layout",
    "precision",
    "subroutine",
    "break",
    "continue",
    "do",
    "for",
    "while",
    "switch",
    "case",
    "default",
    "if",
    "else",
    "discard",
    "return",
    "true",
    "false",
];

const RESERVED_FOR_FUTURE_USE: [&str; 37] = [
    "common",
    "partition",
    "active",
    "asm",
    "class",
    "union",
    "enum",
    "typedef",
    "template",
    "this",
    "goto",
    "public",
    "static",
    "extern",
    "external",
    "interface",
    "long",
    "short",
    "half",
    "fixed",
    "unsigned",
    "input",
    "output",
    "hvec2",
    "hvec3",
    "hvec4",
    "fvec2",
    "fvec3",
    "fvec4",
    "sampler3DRect",
    "filter",
    "sizeof",
    "cast",
    "namespace",
    "using",
    "resource",
    "superp",
];

const RESERVED_UNDER_VULKAN: [&str; 7] = [
    "sampler2DRect",
    "sampler2DRectShadow",
    "isampler2DRect",
    "usampler2DRect",
    "image2DRect",
    "iimage2DRect",
    "uimage2DRect",
];

const EXTENSION_ONLY: [&str; 8] = [
    "inline",
    "noinline",
    "pervertexNV",
    "pervertexEXT",
    "attachmentEXT",
    "iattachmentEXT",
    "uattachmentEXT",
    "tileImageEXT",
];

const EXTENSION_KEYWORDS: [&str; 152] = [
    "terminateInvocation",
    "terminateRayEXT",
    "ignoreIntersectionEXT",
    "demote",
    "devicecoherent",
    "queuefamilycoherent",
    "workgroupcoherent",
    "subgroupcoherent",
    "shadercallcoherent",
    "nonprivate",
    "nontemporal",
    "i64image1D",
    "u64image1D",
    "i64image2D",
    "u64image2D",
    "i64image3D",
    "u64image3D",
    "i64image2DRect",
    "u64image2DRect",
    "i64imageCube",
    "u64imageCube",
    "i64imageBuffer",
    "u64imageBuffer",
    "i64image1DArray",
    "u64image1DArray",
    "i64image2DArray",
    "u64image2DArray",
    "i64imageCubeArray",
    "u64imageCubeArray",
    "i64image2DMS",
    "u64image2DMS",
    "i64image2DMSArray",
    "u64image2DMSArray",
    "bfloat16_t",
    "bf16vec2",
    "bf16vec3",
    "bf16vec4",
    "floate5m2_t",
    "fe5m2vec2",
    "fe5m2vec3",
    "fe5m2vec4",
    "floate4m3_t",
    "fe4m3vec2",
    "fe4m3vec3",
    "fe4m3vec4",
    "floate2m1_t",
    "fe2m1vec2",
    "fe2m1vec3",
    "fe2m1vec4",
    "floate3m2_t",
    "fe3m2vec2",
    "fe3m2vec3",
    "fe3m2vec4",
    "floate2m3_t",
    "fe2m3vec2",
    "fe2m3vec3",
    "fe2m3vec4",
    "floatue8m0_t",
    "fue8m0vec2",
    "fue8m0vec3",
    "fue8m0vec4",
    "floatmxint8_t",
    "fmxint8vec2",
    "fmxint8vec3",
    "fmxint8vec4",
    "spirv_instruction",
    "spirv_execution_mode",
    "spirv_execution_mode_id",
    "spirv_decorate",
    "spirv_decorate_id",
    "spirv_decorate_string",
    "spirv_type",
    "spirv_storage_class",
    "spirv_by_reference",
    "spirv_literal",
    "samplerExternalOES",
    "__samplerExternal2DY2YEXT",
    "f16sampler1D",
    "f16sampler2D",
    "f16sampler3D",
    "f16sampler2DRect",
    "f16samplerCube",
    "f16sampler1DArray",
    "f16sampler2DArray",
    "f16samplerCubeArray",
    "f16samplerBuffer",
    "f16sampler2DMS",
    "f16sampler2DMSArray",
    "f16sampler1DShadow",
    "f16sampler2DShadow",
    "f16sampler2DRectShadow",
    "f16samplerCubeShadow",
    "f16sampler1DArrayShadow",
    "f16sampler2DArrayShadow",
    "f16samplerCubeArrayShadow",
    "f16image1D",
    "f16image2D",
    "f16image3D",
    "f16image2DRect",
    "f16imageCube",
    "f16image1DArray",
    "f16image2DArray",
    "f16imageCubeArray",
    "f16imageBuffer",
    "f16image2DMS",
    "f16image2DMSArray",
    "f16texture1D",
    "f16texture2D",
    "f16texture3D",
    "f16texture2DRect",
    "f16textureCube",
    "f16texture1DArray",
    "f16texture2DArray",
    "f16textureCubeArray",
    "f16textureBuffer",
    "f16texture2DMS",
    "f16texture2DMSArray",
    "f16subpassInput",
    "f16subpassInputMS",
    "__explicitInterpAMD",
    "rayPayloadNV",
    "rayPayloadEXT",
    "rayPayloadInNV",
    "rayPayloadInEXT",
    "hitAttributeNV",
    "hitAttributeEXT",
    "callableDataNV",
    "callableDataEXT",
    "callableDataInNV",
    "callableDataInEXT",
    "accelerationStructureNV",
    "accelerationStructureEXT",
    "rayQueryEXT",
    "perprimitiveNV",
    "perviewNV",
    "taskNV",
    "perprimitiveEXT",
    "taskPayloadSharedEXT",
    "fcoopmatNV",
    "icoopmatNV",
    "ucoopmatNV",
    "coopmat",
    "hitObjectNV",
    "hitObjectAttributeNV",
    "tensorARM",
    "hitObjectEXT",
    "hitObjectAttributeEXT",
    "__function",
    "tensorLayoutNV",
    "tensorViewNV",
    "coopvecNV",
    "vector",
];

pub fn is_opaque_type_keyword(word: &str) -> bool {
    if matches!(
        word,
        "atomic_uint"
            | "sampler"
            | "samplerShadow"
            | "accelerationStructureNV"
            | "accelerationStructureEXT"
            | "rayQueryEXT"
    ) {
        return true;
    }
    if word
        .strip_prefix("sampler")
        .is_some_and(|shape| SHADOW_SHAPES.contains(&shape))
    {
        return true;
    }
    let is_family_member = |name: &str| {
        matches!(name, "subpassInput" | "subpassInputMS")
            || SAMPLED_FAMILIES.iter().any(|family| {
                name.strip_prefix(family)
                    .is_some_and(|shape| SAMPLED_SHAPES.contains(&shape))
            })
    };
    is_family_member(word) || word.strip_prefix(['i', 'u']).is_some_and(is_family_member)
}

pub fn is_type_keyword(word: &str) -> bool {
    word == "void" || BasicType::from_keyword(word).is_some() || is_opaque_type_keyword(word)
}

pub fn is_keyword(word: &str) -> bool {
    SYNTAX_WORDS.contains(&word)
        || SingleTypeQualifier::from_keyword(word).is_some()
        || is_type_keyword(word)
}

pub fn is_unavailable_word(word: &str) -> bool {
    RESERVED_FOR_FUTURE_USE.contains(&word)
        || RESERVED_UNDER_VULKAN.contains(&word)
        || EXTENSION_ONLY.contains(&word)
        || EXTENSION_KEYWORDS.contains(&word)
}

pub fn is_reserved_word(word: &str) -> bool {
    is_keyword(word) || is_unavailable_word(word)
}
