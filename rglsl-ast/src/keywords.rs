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

pub fn is_opaque_type_keyword(word: &str) -> bool {
    if matches!(word, "atomic_uint" | "sampler" | "samplerShadow") {
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
}

pub fn is_reserved_word(word: &str) -> bool {
    is_keyword(word) || is_unavailable_word(word)
}
