use rglsl_types::extension::Extension;

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
        || Extension::of_keyword(word).is_some()
}

pub fn is_reserved_word(word: &str) -> bool {
    is_keyword(word) || is_unavailable_word(word)
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct WordClass {
    type_keyword: bool,
    keyword: bool,
    unavailable: bool,
}

impl WordClass {
    pub(crate) fn of(word: &str) -> Self {
        let type_keyword = is_type_keyword(word);
        Self {
            type_keyword,
            keyword: type_keyword || is_keyword(word),
            unavailable: is_unavailable_word(word),
        }
    }

    pub(crate) const fn is_type_keyword(self) -> bool {
        self.type_keyword
    }

    pub(crate) const fn is_keyword(self) -> bool {
        self.keyword
    }

    pub(crate) const fn is_unavailable(self) -> bool {
        self.unavailable
    }

    pub(crate) const fn is_reserved(self) -> bool {
        self.keyword || self.unavailable
    }
}
