use crate::opaque::OpaqueKeyword;

use crate::ast::{BasicType, ParameterizedType, SingleTypeQualifier};

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
    OpaqueKeyword::parse(word).is_some()
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
