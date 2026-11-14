#![allow(non_upper_case_globals)]

use super::Word;
use crate::types::{Scalar, TypeKind};

const fn scalar(scalar: Scalar) -> Word {
    Word::Fixed(TypeKind::Scalar(scalar))
}

const fn vector(scalar: Scalar, size: u8) -> Word {
    Word::Fixed(TypeKind::Vector { scalar, size })
}

pub(crate) const value: Word = Word::Value;
pub(crate) const void: Word = Word::Fixed(TypeKind::Void);
pub(crate) const bool: Word = scalar(Scalar::Bool);
pub(crate) const uint: Word = scalar(Scalar::Uint);
pub(crate) const uint64_t: Word = scalar(Scalar::Uint64);
pub(crate) const uvec3: Word = vector(Scalar::Uint, 3);
pub(crate) const uvec4: Word = vector(Scalar::Uint, 4);
