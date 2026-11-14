#![allow(non_upper_case_globals)]

use super::{Shape, Size, Word};
use crate::types::{
    ArraySize, Opaque, OpaqueKind, SampledType, Scalar, TextureDimension, TypeKind,
};

const fn scalar(scalar: Scalar) -> Word {
    Word::Fixed(TypeKind::Scalar(scalar))
}

const fn vector(scalar: Scalar, size: u8) -> Word {
    Word::Fixed(TypeKind::Vector { scalar, size })
}

const fn long(scalar: Scalar, size: u32) -> Word {
    Word::Fixed(TypeKind::LongVector {
        scalar,
        size: ArraySize::Sized(size),
    })
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

const fn attachment(sampled: SampledType) -> Word {
    Word::Fixed(TypeKind::Opaque(Opaque {
        kind: OpaqueKind::TileImage,
        sampled,
        dimension: TextureDimension::D2,
        arrayed: false,
        shadow: false,
        multisample: false,
    }))
}

pub(crate) const value: Word = Word::Value;
pub(crate) const void: Word = Word::Fixed(TypeKind::Void);
pub(crate) const genF: Word = Word::Gen(Scalar::Float);
pub(crate) const genD: Word = Word::Gen(Scalar::Double);
pub(crate) const genH: Word = Word::Gen(Scalar::Float16);
pub(crate) const genB: Word = Word::Gen(Scalar::Bool);
pub(crate) const genI: Word = Word::Gen(Scalar::Int);
pub(crate) const genU: Word = Word::Gen(Scalar::Uint);
pub(crate) const genI8: Word = Word::Gen(Scalar::Int8);
pub(crate) const genU8: Word = Word::Gen(Scalar::Uint8);
pub(crate) const genI16: Word = Word::Gen(Scalar::Int16);
pub(crate) const genU16: Word = Word::Gen(Scalar::Uint16);
pub(crate) const genI64: Word = Word::Gen(Scalar::Int64);
pub(crate) const genU64: Word = Word::Gen(Scalar::Uint64);
pub(crate) const bool: Word = scalar(Scalar::Bool);
pub(crate) const int: Word = scalar(Scalar::Int);
pub(crate) const uint: Word = scalar(Scalar::Uint);
pub(crate) const uint32_t: Word = scalar(Scalar::Uint);
pub(crate) const float: Word = scalar(Scalar::Float);
pub(crate) const double: Word = scalar(Scalar::Double);
pub(crate) const float16_t: Word = scalar(Scalar::Float16);
pub(crate) const int8_t: Word = scalar(Scalar::Int8);
pub(crate) const uint8_t: Word = scalar(Scalar::Uint8);
pub(crate) const int16_t: Word = scalar(Scalar::Int16);
pub(crate) const uint16_t: Word = scalar(Scalar::Uint16);
pub(crate) const int64_t: Word = scalar(Scalar::Int64);
pub(crate) const uint64_t: Word = scalar(Scalar::Uint64);
pub(crate) const bfloat16_t: Word = scalar(Scalar::BFloat16);
pub(crate) const floate4m3_t: Word = scalar(Scalar::FloatE4M3);
pub(crate) const floate5m2_t: Word = scalar(Scalar::FloatE5M2);
pub(crate) const floate2m1_t: Word = scalar(Scalar::FloatE2M1);
pub(crate) const floate3m2_t: Word = scalar(Scalar::FloatE3M2);
pub(crate) const floate2m3_t: Word = scalar(Scalar::FloatE2M3);
pub(crate) const floatue8m0_t: Word = scalar(Scalar::FloatUE8M0);
pub(crate) const floatmxint8_t: Word = scalar(Scalar::FloatMXINT8);
pub(crate) const vecN: Word = Word::Vector(Scalar::Float, Size::N);
pub(crate) const vecC: Word = Word::Vector(Scalar::Float, Size::Columns);
pub(crate) const vecR: Word = Word::Vector(Scalar::Float, Size::Rows);
pub(crate) const bvecN: Word = Word::Vector(Scalar::Bool, Size::N);
pub(crate) const ivecN: Word = Word::Vector(Scalar::Int, Size::N);
pub(crate) const uvecN: Word = Word::Vector(Scalar::Uint, Size::N);
pub(crate) const i8vecN: Word = Word::Vector(Scalar::Int8, Size::N);
pub(crate) const u8vecN: Word = Word::Vector(Scalar::Uint8, Size::N);
pub(crate) const i16vecN: Word = Word::Vector(Scalar::Int16, Size::N);
pub(crate) const u16vecN: Word = Word::Vector(Scalar::Uint16, Size::N);
pub(crate) const i64vecN: Word = Word::Vector(Scalar::Int64, Size::N);
pub(crate) const u64vecN: Word = Word::Vector(Scalar::Uint64, Size::N);
pub(crate) const bf16vecN: Word = Word::Vector(Scalar::BFloat16, Size::N);
pub(crate) const fe4m3vecN: Word = Word::Vector(Scalar::FloatE4M3, Size::N);
pub(crate) const fe5m2vecN: Word = Word::Vector(Scalar::FloatE5M2, Size::N);
pub(crate) const fe2m1vecN: Word = Word::Vector(Scalar::FloatE2M1, Size::N);
pub(crate) const fe3m2vecN: Word = Word::Vector(Scalar::FloatE3M2, Size::N);
pub(crate) const fe2m3vecN: Word = Word::Vector(Scalar::FloatE2M3, Size::N);
pub(crate) const fue8m0vecN: Word = Word::Vector(Scalar::FloatUE8M0, Size::N);
pub(crate) const fmxint8vecN: Word = Word::Vector(Scalar::FloatMXINT8, Size::N);
pub(crate) const vec2: Word = vector(Scalar::Float, 2);
pub(crate) const vec3: Word = vector(Scalar::Float, 3);
pub(crate) const vec4: Word = vector(Scalar::Float, 4);
pub(crate) const ivec2: Word = vector(Scalar::Int, 2);
pub(crate) const ivec3: Word = vector(Scalar::Int, 3);
pub(crate) const ivec4: Word = vector(Scalar::Int, 4);
pub(crate) const uvec2: Word = vector(Scalar::Uint, 2);
pub(crate) const uvec3: Word = vector(Scalar::Uint, 3);
pub(crate) const uvec4: Word = vector(Scalar::Uint, 4);
pub(crate) const u32vec2: Word = vector(Scalar::Uint, 2);
pub(crate) const u32vec3: Word = vector(Scalar::Uint, 3);
pub(crate) const i8vec2: Word = vector(Scalar::Int8, 2);
pub(crate) const i8vec4: Word = vector(Scalar::Int8, 4);
pub(crate) const u8vec2: Word = vector(Scalar::Uint8, 2);
pub(crate) const u8vec3: Word = vector(Scalar::Uint8, 3);
pub(crate) const u8vec4: Word = vector(Scalar::Uint8, 4);
pub(crate) const i16vec2: Word = vector(Scalar::Int16, 2);
pub(crate) const i16vec4: Word = vector(Scalar::Int16, 4);
pub(crate) const u16vec2: Word = vector(Scalar::Uint16, 2);
pub(crate) const u16vec3: Word = vector(Scalar::Uint16, 3);
pub(crate) const u16vec4: Word = vector(Scalar::Uint16, 4);
pub(crate) const f16vec2: Word = vector(Scalar::Float16, 2);
pub(crate) const f16vec4: Word = vector(Scalar::Float16, 4);
pub(crate) const fe2m1vec2: Word = vector(Scalar::FloatE2M1, 2);
pub(crate) const fe2m1vec4: Word = vector(Scalar::FloatE2M1, 4);
pub(crate) const fe3m2vec4: Word = vector(Scalar::FloatE3M2, 4);
pub(crate) const fe2m3vec4: Word = vector(Scalar::FloatE2M3, 4);
pub(crate) const fe2m1vec8: Word = long(Scalar::FloatE2M1, 8);
pub(crate) const fe2m1vec16: Word = long(Scalar::FloatE2M1, 16);
pub(crate) const fe3m2vec8: Word = long(Scalar::FloatE3M2, 8);
pub(crate) const fe3m2vec16: Word = long(Scalar::FloatE3M2, 16);
pub(crate) const fe2m3vec8: Word = long(Scalar::FloatE2M3, 8);
pub(crate) const fe2m3vec16: Word = long(Scalar::FloatE2M3, 16);
pub(crate) const matN: Word = Word::Matrix(Scalar::Float, Shape::Square);
pub(crate) const matCxR: Word = Word::Matrix(Scalar::Float, Shape::ColumnsByRows);
pub(crate) const matRxC: Word = Word::Matrix(Scalar::Float, Shape::RowsByColumns);
pub(crate) const mat3x4: Word = matrix(Scalar::Float, 3, 4);
pub(crate) const mat4x3: Word = matrix(Scalar::Float, 4, 3);
pub(crate) const accelerationStructureEXT: Word = opaque(OpaqueKind::AccelerationStructure);
pub(crate) const accelerationStructureNV: Word = opaque(OpaqueKind::AccelerationStructure);
pub(crate) const rayQueryEXT: Word = opaque(OpaqueKind::RayQuery);
pub(crate) const hitObjectNV: Word = opaque(OpaqueKind::HitObjectNv);
pub(crate) const hitObjectEXT: Word = opaque(OpaqueKind::HitObjectExt);
pub(crate) const attachmentEXT: Word = attachment(SampledType::Float);
pub(crate) const iattachmentEXT: Word = attachment(SampledType::Int);
pub(crate) const uattachmentEXT: Word = attachment(SampledType::Uint);
