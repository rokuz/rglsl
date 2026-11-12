use crate::ast::{BasicType, ParameterizedType, SingleTypeQualifier};

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

const EXTENSION_ONLY: [&str; 2] = ["inline", "noinline"];

const EXTENSION_KEYWORDS: [&str; 85] = [
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
    "i64image2DRect",
    "u64image2DRect",
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
    "hitObjectNV",
    "hitObjectAttributeNV",
    "hitObjectEXT",
    "hitObjectAttributeEXT",
    "__function",
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
            | "hitObjectNV"
            | "hitObjectEXT"
            | "attachmentEXT"
            | "iattachmentEXT"
            | "uattachmentEXT"
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
    let is_wide_image = |name: &str| {
        name.strip_prefix("image")
            .is_some_and(|shape| SAMPLED_SHAPES.contains(&shape))
    };
    is_family_member(word)
        || word.strip_prefix(['i', 'u']).is_some_and(is_family_member)
        || word
            .strip_prefix("i64")
            .or_else(|| word.strip_prefix("u64"))
            .is_some_and(is_wide_image)
}

pub fn is_type_keyword(word: &str) -> bool {
    word == "void"
        || BasicType::from_keyword(word).is_some()
        || is_opaque_type_keyword(word)
        || ParameterizedType::from_keyword(word).is_some()
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
