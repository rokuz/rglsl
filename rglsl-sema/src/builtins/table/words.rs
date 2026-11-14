#![allow(non_upper_case_globals)]

use super::Word;
use crate::types::{Opaque, OpaqueKind, Scalar, TypeKind};

const fn scalar(scalar: Scalar) -> Word {
    Word::Fixed(TypeKind::Scalar(scalar))
}

const fn vector(scalar: Scalar, size: u8) -> Word {
    Word::Fixed(TypeKind::Vector { scalar, size })
}

const fn matrix(scalar: Scalar, columns: u8, rows: u8) -> Word {
    Word::Fixed(TypeKind::Matrix {
        scalar,
        columns,
        rows,
    })
}

const fn opaque(kind: OpaqueKind) -> Word {
    Word::Fixed(TypeKind::Opaque(Opaque::ray(kind)))
}

pub(crate) const value: Word = Word::Value;
pub(crate) const void: Word = Word::Fixed(TypeKind::Void);
pub(crate) const bool: Word = scalar(Scalar::Bool);
pub(crate) const int: Word = scalar(Scalar::Int);
pub(crate) const uint: Word = scalar(Scalar::Uint);
pub(crate) const float: Word = scalar(Scalar::Float);
pub(crate) const uint64_t: Word = scalar(Scalar::Uint64);
pub(crate) const vec2: Word = vector(Scalar::Float, 2);
pub(crate) const vec3: Word = vector(Scalar::Float, 3);
pub(crate) const ivec2: Word = vector(Scalar::Int, 2);
pub(crate) const uvec2: Word = vector(Scalar::Uint, 2);
pub(crate) const uvec3: Word = vector(Scalar::Uint, 3);
pub(crate) const uvec4: Word = vector(Scalar::Uint, 4);
pub(crate) const mat4x3: Word = matrix(Scalar::Float, 4, 3);
pub(crate) const accelerationStructureEXT: Word = opaque(OpaqueKind::AccelerationStructure);
pub(crate) const accelerationStructureNV: Word = opaque(OpaqueKind::AccelerationStructure);
pub(crate) const rayQueryEXT: Word = opaque(OpaqueKind::RayQuery);
pub(crate) const hitObjectNV: Word = opaque(OpaqueKind::HitObjectNv);
pub(crate) const hitObjectEXT: Word = opaque(OpaqueKind::HitObjectExt);
