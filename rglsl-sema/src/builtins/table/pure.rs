use rglsl_types::extension::Extension::*;

use super::Floats::{DoublesAndHalves, Halves};
use super::{BuiltinFlags, BuiltinFunction};
use crate::builtins::kind::BitOperation::*;
use crate::builtins::kind::BuiltinKind::{Assume, Decompose, Expect, Pure, Wide};
use crate::builtins::kind::Comparison::*;
use crate::builtins::kind::Decompose::*;
use crate::builtins::kind::Math::*;
use crate::builtins::kind::Pure::*;
use crate::builtins::kind::Relation::*;
use crate::builtins::kind::Wide::*;
use crate::builtins::kind::{Axis, Control};
use crate::builtins::{COMPUTE, FRAGMENT, MESH, TASK};

pub(super) const FUNCTIONS: &[BuiltinFunction] = builtins! {
    "radians": Pure(Math(Radians)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "degrees": Pure(Math(Degrees)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "sin": Pure(Math(Sin)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "cos": Pure(Math(Cos)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "tan": Pure(Math(Tan)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "asin": Pure(Math(Asin)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "acos": Pure(Math(Acos)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "atan": Pure(Math(Atan2)) => [genF(genF, genF)] {
        flags: BuiltinFlags::FOLD
            .union(BuiltinFlags::COOPERATIVE_VECTOR)
            .union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "atan": Pure(Math(Atan)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD
            .union(BuiltinFlags::COOPERATIVE_VECTOR)
            .union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "sinh": Pure(Math(Sinh)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "cosh": Pure(Math(Cosh)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "tanh": Pure(Math(Tanh)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD
            .union(BuiltinFlags::COOPERATIVE_VECTOR)
            .union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "asinh": Pure(Math(Asinh)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "acosh": Pure(Math(Acosh)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "atanh": Pure(Math(Atanh)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "pow": Pure(Math(Pow)) => [genF(genF, genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "exp": Pure(Math(Exp)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD
            .union(BuiltinFlags::COOPERATIVE_VECTOR)
            .union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "log": Pure(Math(Log)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD
            .union(BuiltinFlags::COOPERATIVE_VECTOR)
            .union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "exp2": Pure(Math(Exp2)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "log2": Pure(Math(Log2)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::NO_DOUBLE_LONG_VECTOR),
        floats: Halves,
    }
    "sqrt": Pure(Math(Sqrt)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "inversesqrt": Pure(Math(InverseSqrt)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "abs": Pure(Math(Abs)) => [
        genF(genF),
        genI(genI),
        genI64(genI64),
        genI16(genI16),
        genI8(genI8),
    ] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "sign": Pure(Math(Sign)) => [
        genF(genF),
        genI(genI),
        genI64(genI64),
        genI16(genI16),
        genI8(genI8),
    ] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "floor": Pure(Math(Floor)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "trunc": Pure(Math(Trunc)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "round": Pure(Math(Round)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "roundEven": Pure(Math(RoundEven)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "ceil": Pure(Math(Ceil)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "fract": Pure(Math(Fract)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "mod": Pure(Modulo) => [genF(genF, genF), genF(genF, float)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::PRECISE_ARITHMETIC),
        floats: DoublesAndHalves,
    }
    "modf": Decompose(Modf) => [genF(genF, out genF)] {
        floats: DoublesAndHalves,
    }
    "min": Pure(Math(Min)) => [
        genF(genF, genF),
        genF(genF, float),
        genI(genI, genI),
        genI(genI, int),
        genU(genU, genU),
        genU(genU, uint),
        genI64(genI64, genI64),
        genI64(genI64, int64_t),
        genU64(genU64, genU64),
        genU64(genU64, uint64_t),
        genI16(genI16, genI16),
        genI16(genI16, int16_t),
        genU16(genU16, genU16),
        genU16(genU16, uint16_t),
        genI8(genI8, genI8),
        genI8(genI8, int8_t),
        genU8(genU8, genU8),
        genU8(genU8, uint8_t),
    ] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::COOPERATIVE_VECTOR),
        floats: DoublesAndHalves,
    }
    "max": Pure(Math(Max)) => [
        genF(genF, genF),
        genF(genF, float),
        genI(genI, genI),
        genI(genI, int),
        genU(genU, genU),
        genU(genU, uint),
        genI64(genI64, genI64),
        genI64(genI64, int64_t),
        genU64(genU64, genU64),
        genU64(genU64, uint64_t),
        genI16(genI16, genI16),
        genI16(genI16, int16_t),
        genU16(genU16, genU16),
        genU16(genU16, uint16_t),
        genI8(genI8, genI8),
        genI8(genI8, int8_t),
        genU8(genU8, genU8),
        genU8(genU8, uint8_t),
    ] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::COOPERATIVE_VECTOR),
        floats: DoublesAndHalves,
    }
    "clamp": Pure(Math(Clamp)) => [
        genF(genF, genF, genF),
        genF(genF, float, float),
        genI(genI, genI, genI),
        genI(genI, int, int),
        genU(genU, genU, genU),
        genU(genU, uint, uint),
        genI64(genI64, genI64, genI64),
        genI64(genI64, int64_t, int64_t),
        genU64(genU64, genU64, genU64),
        genU64(genU64, uint64_t, uint64_t),
        genI16(genI16, genI16, genI16),
        genI16(genI16, int16_t, int16_t),
        genU16(genU16, genU16, genU16),
        genU16(genU16, uint16_t, uint16_t),
        genI8(genI8, genI8, genI8),
        genI8(genI8, int8_t, int8_t),
        genU8(genU8, genU8, genU8),
        genU8(genU8, uint8_t, uint8_t),
    ] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::COOPERATIVE_VECTOR),
        floats: DoublesAndHalves,
    }
    "mix": Pure(Math(Mix)) => [genF(genF, genF, genF), genF(genF, genF, float)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "mix": Pure(Select) => [
        genF(genF, genF, genB),
        genI(genI, genI, genB),
        genU(genU, genU, genB),
        genB(genB, genB, genB),
        genI64(genI64, genI64, genB),
        genU64(genU64, genU64, genB),
        genI16(genI16, genI16, genB),
        genU16(genU16, genU16, genB),
        genI8(genI8, genI8, genB),
        genU8(genU8, genU8, genB),
    ] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "step": Pure(Math(Step)) => [genF(genF, genF), genF(float, genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::COOPERATIVE_VECTOR),
        floats: DoublesAndHalves,
    }
    "smoothstep": Pure(Math(SmoothStep)) => [genF(genF, genF, genF), genF(float, float, genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "isnan": Pure(Relational(IsNan)) => [genB(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "isinf": Pure(Relational(IsInf)) => [genB(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "fma": Pure(Math(Fma)) => [genF(genF, genF, genF)] {
        flags: BuiltinFlags::COOPERATIVE_VECTOR,
        floats: DoublesAndHalves,
    }
    "frexp": Decompose(Frexp) => [genF(genF, out genI), genH(genH, out genI16)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
        floats: DoublesAndHalves,
    }
    "ldexp": Pure(Math(Ldexp)) => [genF(genF, genI), genH(genH, genI16)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
        floats: DoublesAndHalves,
    }
    "floatBitsToInt": Pure(Bitcast) => [genI(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::HIGHP_OPERANDS),
    }
    "floatBitsToUint": Pure(Bitcast) => [genU(genF)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::HIGHP_OPERANDS),
    }
    "intBitsToFloat": Pure(Bitcast) => [genF(genI)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::HIGHP_OPERANDS),
    }
    "uintBitsToFloat": Pure(Bitcast) => [genF(genU)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::HIGHP_OPERANDS),
    }
    "packUnorm2x16": Pure(Math(Pack2x16unorm)) => [uint(vec2)] {
        flags: BuiltinFlags::HIGHP_RESULT,
    }
    "packSnorm2x16": Pure(Math(Pack2x16snorm)) => [uint(vec2)] {
        flags: BuiltinFlags::HIGHP_RESULT,
    }
    "packUnorm4x8": Pure(Math(Pack4x8unorm)) => [uint(vec4)] {
        flags: BuiltinFlags::HIGHP_RESULT,
    }
    "packSnorm4x8": Pure(Math(Pack4x8snorm)) => [uint(vec4)] {
        flags: BuiltinFlags::HIGHP_RESULT,
    }
    "unpackUnorm2x16": Pure(Math(Unpack2x16unorm)) => [vec2(uint)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "unpackSnorm2x16": Pure(Math(Unpack2x16snorm)) => [vec2(uint)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "unpackUnorm4x8": Pure(Math(Unpack4x8unorm)) => [vec4(uint)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "unpackSnorm4x8": Pure(Math(Unpack4x8snorm)) => [vec4(uint)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "packHalf2x16": Pure(Math(Pack2x16float)) => [uint(vec2)] {
        flags: BuiltinFlags::HIGHP_RESULT,
    }
    "unpackHalf2x16": Pure(Math(Unpack2x16float)) => [vec2(uint)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "packDouble2x32": Pure(Math(PackDouble2x32)) => [double(uvec2)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "unpackDouble2x32": Pure(Math(UnpackDouble2x32)) => [uvec2(double)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "packFloat2x16": Pure(PackedBitcast { extract: false }) => [uint(f16vec2)]
    "unpackFloat2x16": Pure(PackedBitcast { extract: false }) => [f16vec2(uint)]
    "lessThan": Pure(Compare(Less)) => [
        bvecN(i64vecN, i64vecN),
        bvecN(u64vecN, u64vecN),
        bvecN(i16vecN, i16vecN),
        bvecN(u16vecN, u16vecN),
        bvecN(i8vecN, i8vecN),
        bvecN(u8vecN, u8vecN),
        bvecN(vecN, vecN),
        bvecN(ivecN, ivecN),
        bvecN(uvecN, uvecN),
    ] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "lessThanEqual": Pure(Compare(LessEqual)) => [
        bvecN(i64vecN, i64vecN),
        bvecN(u64vecN, u64vecN),
        bvecN(i16vecN, i16vecN),
        bvecN(u16vecN, u16vecN),
        bvecN(i8vecN, i8vecN),
        bvecN(u8vecN, u8vecN),
        bvecN(vecN, vecN),
        bvecN(ivecN, ivecN),
        bvecN(uvecN, uvecN),
    ] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "greaterThan": Pure(Compare(Greater)) => [
        bvecN(i64vecN, i64vecN),
        bvecN(u64vecN, u64vecN),
        bvecN(i16vecN, i16vecN),
        bvecN(u16vecN, u16vecN),
        bvecN(i8vecN, i8vecN),
        bvecN(u8vecN, u8vecN),
        bvecN(vecN, vecN),
        bvecN(ivecN, ivecN),
        bvecN(uvecN, uvecN),
    ] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "greaterThanEqual": Pure(Compare(GreaterEqual)) => [
        bvecN(i64vecN, i64vecN),
        bvecN(u64vecN, u64vecN),
        bvecN(i16vecN, i16vecN),
        bvecN(u16vecN, u16vecN),
        bvecN(i8vecN, i8vecN),
        bvecN(u8vecN, u8vecN),
        bvecN(vecN, vecN),
        bvecN(ivecN, ivecN),
        bvecN(uvecN, uvecN),
    ] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "equal": Pure(Compare(Equal)) => [
        bvecN(i64vecN, i64vecN),
        bvecN(u64vecN, u64vecN),
        bvecN(i16vecN, i16vecN),
        bvecN(u16vecN, u16vecN),
        bvecN(i8vecN, i8vecN),
        bvecN(u8vecN, u8vecN),
        bvecN(vecN, vecN),
        bvecN(ivecN, ivecN),
        bvecN(uvecN, uvecN),
        bvecN(bvecN, bvecN),
    ] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "notEqual": Pure(Compare(NotEqual)) => [
        bvecN(i64vecN, i64vecN),
        bvecN(u64vecN, u64vecN),
        bvecN(i16vecN, i16vecN),
        bvecN(u16vecN, u16vecN),
        bvecN(i8vecN, i8vecN),
        bvecN(u8vecN, u8vecN),
        bvecN(vecN, vecN),
        bvecN(ivecN, ivecN),
        bvecN(uvecN, uvecN),
        bvecN(bvecN, bvecN),
    ] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "bitCount": Pure(Bits(Count)) => [
        genI64(genI64),
        genI64(genU64),
        genI16(genI16),
        genI16(genU16),
        genI8(genI8),
        genI8(genU8),
        genI(genI),
        genI(genU),
    ]
    "findLSB": Pure(Bits(FindLsb)) => [
        genI64(genI64),
        genI64(genU64),
        genI16(genI16),
        genI16(genU16),
        genI8(genI8),
        genI8(genU8),
        genI(genI),
        genI(genU),
    ]
    "findMSB": Pure(Bits(FindMsb)) => [
        genI64(genI64),
        genI64(genU64),
        genI16(genI16),
        genI16(genU16),
        genI8(genI8),
        genI8(genU8),
        genI(genI),
        genI(genU),
    ] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "doubleBitsToInt64": Pure(Bitcast) => [genI64(genD)]
    "doubleBitsToUint64": Pure(Bitcast) => [genU64(genD)]
    "int64BitsToDouble": Pure(Bitcast) => [genD(genI64)]
    "uint64BitsToDouble": Pure(Bitcast) => [genD(genU64)]
    "packInt2x32": Pure(PackBits) => [int64_t(ivec2)]
    "packUint2x32": Pure(PackBits) => [uint64_t(uvec2)]
    "unpackInt2x32": Pure(UnpackBits) => [ivec2(int64_t)]
    "unpackUint2x32": Pure(UnpackBits) => [uvec2(uint64_t)]
    "bitfieldExtract": Pure(Bits(Extract)) => [
        genI16(genI16, int16_t, int16_t),
        genU16(genU16, int16_t, int16_t),
        genI8(genI8, int8_t, int8_t),
        genU8(genU8, int8_t, int8_t),
        genI(genI, int, int),
        genU(genU, int, int),
    ] {
        precision_operands: Some(1),
    }
    "bitfieldInsert": Pure(Bits(Insert)) => [
        genI16(genI16, genI16, int16_t, int16_t),
        genU16(genU16, genU16, int16_t, int16_t),
        genI8(genI8, genI8, int8_t, int8_t),
        genU8(genU8, genU8, int8_t, int8_t),
        genI(genI, genI, int, int),
        genU(genU, genU, int, int),
    ] {
        precision_operands: Some(2),
    }
    "bitfieldReverse": Pure(Bits(Reverse)) => [
        genI16(genI16),
        genU16(genU16),
        genI8(genI8),
        genU8(genU8),
        genI(genI),
        genU(genU),
    ] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "halfBitsToInt16": Pure(Bitcast) => [genI16(genH)]
    "halfBitsToUint16": Pure(Bitcast) => [genU16(genH)]
    "float16BitsToInt16": Pure(Bitcast) => [genI16(genH)]
    "float16BitsToUint16": Pure(Bitcast) => [genU16(genH)]
    "int16BitsToFloat16": Pure(Bitcast) => [genH(genI16)]
    "uint16BitsToFloat16": Pure(Bitcast) => [genH(genU16)]
    "int16BitsToHalf": Pure(Bitcast) => [genH(genI16)]
    "uint16BitsToHalf": Pure(Bitcast) => [genH(genU16)]
    "packInt2x16": Pure(PackBits) => [int(i16vec2)]
    "packUint2x16": Pure(PackBits) => [uint(u16vec2)]
    "packInt4x16": Pure(PackBits) => [int64_t(i16vec4)]
    "packUint4x16": Pure(PackBits) => [uint64_t(u16vec4)]
    "unpackInt2x16": Pure(UnpackBits) => [i16vec2(int)]
    "unpackUint2x16": Pure(UnpackBits) => [u16vec2(uint)]
    "unpackInt4x16": Pure(UnpackBits) => [i16vec4(int64_t)]
    "unpackUint4x16": Pure(UnpackBits) => [u16vec4(uint64_t)]
    "pack16": Pure(PackBits) => [int16_t(i8vec2), uint16_t(u8vec2)]
    "pack32": Pure(PackBits) => [int(i8vec4), uint(u8vec4), int(i16vec2), uint(u16vec2)]
    "pack64": Pure(PackBits) => [
        int64_t(i16vec4),
        uint64_t(u16vec4),
        int64_t(ivec2),
        uint64_t(uvec2),
    ]
    "unpack8": Pure(UnpackBits) => [i8vec2(int16_t), u8vec2(uint16_t), i8vec4(int), u8vec4(uint)]
    "unpack16": Pure(UnpackBits) => [
        i16vec2(int),
        u16vec2(uint),
        i16vec4(int64_t),
        u16vec4(uint64_t),
    ]
    "unpack32": Pure(UnpackBits) => [ivec2(int64_t), uvec2(uint64_t)]
    "length": Pure(Math(Length)) => [float(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "distance": Pure(Math(Distance)) => [float(genF, genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "dot": Pure(Math(Dot)) => [float(genF, genF), bfloat16_t(bf16vecN, bf16vecN)] {
        flags: BuiltinFlags::FOLD.union(BuiltinFlags::PRECISE_ARITHMETIC),
        floats: DoublesAndHalves,
    }
    "cross": Pure(Math(Cross)) => [vec3(vec3, vec3)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "normalize": Pure(Math(Normalize)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "faceforward": Pure(Math(FaceForward)) => [genF(genF, genF, genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "reflect": Pure(Math(Reflect)) => [genF(genF, genF)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "refract": Pure(Math(Refract)) => [genF(genF, genF, float)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "matrixCompMult": Pure(MatrixCompMult) => [matCxR(matCxR, matCxR)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "outerProduct": Pure(Math(Outer)) => [matCxR(vecR, vecC)] {
        flags: BuiltinFlags::FOLD,
        floats: DoublesAndHalves,
    }
    "transpose": Pure(Math(Transpose)) => [matRxC(matCxR)] {
        floats: DoublesAndHalves,
    }
    "determinant": Pure(Math(Determinant)) => [float(matN)] {
        floats: DoublesAndHalves,
    }
    "inverse": Pure(Math(Inverse)) => [matN(matN)] {
        floats: DoublesAndHalves,
    }
    "any": Pure(Relational(Any)) => [bool(bvecN)] {
        flags: BuiltinFlags::FOLD,
    }
    "all": Pure(Relational(All)) => [bool(bvecN)] {
        flags: BuiltinFlags::FOLD,
    }
    "not": Pure(Not) => [bvecN(bvecN)] {
        flags: BuiltinFlags::FOLD,
    }
    "uaddCarry": Wide(AddCarry) => [genU(genU, genU, out genU)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "usubBorrow": Wide(SubBorrow) => [genU(genU, genU, out genU)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "umulExtended": Wide(MulExtended { signed: false }) => [void(genU, genU, out genU, out genU)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "imulExtended": Wide(MulExtended { signed: true }) => [void(genI, genI, out genI, out genI)] {
        flags: BuiltinFlags::HIGHP_OPERANDS,
    }
    "dotEXT": Pure(Math(IntegerDot)) => [
        uint(uvecN, uvecN),
        int(ivecN, uvecN),
        int(uvecN, ivecN),
        int(ivecN, ivecN),
        uint(u8vecN, u8vecN),
        int(i8vecN, u8vecN),
        int(u8vecN, i8vecN),
        int(i8vecN, i8vecN),
        uint(u16vecN, u16vecN),
        int(i16vecN, u16vecN),
        int(u16vecN, i16vecN),
        int(i16vecN, i16vecN),
        uint64_t(u64vecN, u64vecN),
        int64_t(i64vecN, u64vecN),
        int64_t(u64vecN, i64vecN),
        int64_t(i64vecN, i64vecN),
    ] {
        requires: &[ExtIntegerDotProduct],
        flags: BuiltinFlags::PRECISE_ARITHMETIC,
    }
    "dotAccSatEXT": Pure(Math(IntegerDotAccSat)) => [
        uint(uvecN, uvecN, uint),
        int(ivecN, uvecN, int),
        int(uvecN, ivecN, int),
        int(ivecN, ivecN, int),
        uint(u8vecN, u8vecN, uint),
        int(i8vecN, u8vecN, int),
        int(u8vecN, i8vecN, int),
        int(i8vecN, i8vecN, int),
        uint(u16vecN, u16vecN, uint),
        int(i16vecN, u16vecN, int),
        int(u16vecN, i16vecN, int),
        int(i16vecN, i16vecN, int),
        uint64_t(u64vecN, u64vecN, uint64_t),
        int64_t(i64vecN, u64vecN, int64_t),
        int64_t(u64vecN, i64vecN, int64_t),
        int64_t(i64vecN, i64vecN, int64_t),
    ] {
        requires: &[ExtIntegerDotProduct],
        flags: BuiltinFlags::PRECISE_ARITHMETIC,
    }
    "dotPacked4x8EXT": Pure(Math(PackedIntegerDot4x8)) => [
        uint(uint, uint),
        int(int, uint),
        int(uint, int),
        int(int, int),
    ] {
        requires: &[ExtIntegerDotProduct],
        flags: BuiltinFlags::PRECISE_ARITHMETIC,
    }
    "dotPacked4x8AccSatEXT": Pure(Math(PackedIntegerDot4x8AccSat)) => [
        uint(uint, uint, uint),
        int(int, uint, int),
        int(uint, int, int),
        int(int, int, int),
    ] {
        requires: &[ExtIntegerDotProduct],
        flags: BuiltinFlags::PRECISE_ARITHMETIC,
    }
    "dFdx": Pure(Derivative(Axis::X, Control::Plain)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdy": Pure(Derivative(Axis::Y, Control::Plain)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "fwidth": Pure(Derivative(Axis::Width, Control::Plain)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdxFine": Pure(Derivative(Axis::X, Control::Fine)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdyFine": Pure(Derivative(Axis::Y, Control::Fine)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "fwidthFine": Pure(Derivative(Axis::Width, Control::Fine)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdxCoarse": Pure(Derivative(Axis::X, Control::Coarse)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdyCoarse": Pure(Derivative(Axis::Y, Control::Coarse)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "fwidthCoarse": Pure(Derivative(Axis::Width, Control::Coarse)) => [genF(genF)] {
        flags: BuiltinFlags::FOLD,
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "assumeEXT": Assume => [void(bool)] {
        requires: &[ExtExpectAssume],
    }
    "expectEXT": Expect => [
        genB(genB, genB),
        genI(genI, genI),
        genU(genU, genU),
        genI8(genI8, genI8),
        genU8(genU8, genU8),
        genI16(genI16, genI16),
        genU16(genU16, genU16),
        genI64(genI64, genI64),
        genU64(genU64, genU64),
    ] {
        requires: &[ExtExpectAssume],
    }
    "bfloat16BitsToIntEXT": Pure(Bitcast) => [int16_t(bfloat16_t), i16vecN(bf16vecN)] {
        requires: &[ExtBfloat16],
    }
    "bfloat16BitsToUintEXT": Pure(Bitcast) => [uint16_t(bfloat16_t), u16vecN(bf16vecN)] {
        requires: &[ExtBfloat16],
    }
    "intBitsToBFloat16EXT": Pure(Bitcast) => [bfloat16_t(int16_t), bf16vecN(i16vecN)] {
        requires: &[ExtBfloat16],
    }
    "uintBitsToBFloat16EXT": Pure(Bitcast) => [bfloat16_t(uint16_t), bf16vecN(u16vecN)] {
        requires: &[ExtBfloat16],
    }
    "floate4m3BitsToIntEXT": Pure(Bitcast) => [int8_t(floate4m3_t), i8vecN(fe4m3vecN)] {
        requires: &[ExtFloatE4m3],
    }
    "floate4m3BitsToUintEXT": Pure(Bitcast) => [uint8_t(floate4m3_t), u8vecN(fe4m3vecN)] {
        requires: &[ExtFloatE4m3],
    }
    "intBitsToFloate4m3EXT": Pure(Bitcast) => [floate4m3_t(int8_t), fe4m3vecN(i8vecN)] {
        requires: &[ExtFloatE4m3],
    }
    "uintBitsToFloate4m3EXT": Pure(Bitcast) => [floate4m3_t(uint8_t), fe4m3vecN(u8vecN)] {
        requires: &[ExtFloatE4m3],
    }
    "floate5m2BitsToIntEXT": Pure(Bitcast) => [int8_t(floate5m2_t), i8vecN(fe5m2vecN)] {
        requires: &[ExtFloatE5m2],
    }
    "floate5m2BitsToUintEXT": Pure(Bitcast) => [uint8_t(floate5m2_t), u8vecN(fe5m2vecN)] {
        requires: &[ExtFloatE5m2],
    }
    "intBitsToFloate5m2EXT": Pure(Bitcast) => [floate5m2_t(int8_t), fe5m2vecN(i8vecN)] {
        requires: &[ExtFloatE5m2],
    }
    "uintBitsToFloate5m2EXT": Pure(Bitcast) => [floate5m2_t(uint8_t), fe5m2vecN(u8vecN)] {
        requires: &[ExtFloatE5m2],
    }
    "floatue8m0BitsToIntEXT": Pure(Bitcast) => [int8_t(floatue8m0_t), i8vecN(fue8m0vecN)] {
        requires: &[ExtFloatUe8m0],
    }
    "floatue8m0BitsToUintEXT": Pure(Bitcast) => [uint8_t(floatue8m0_t), u8vecN(fue8m0vecN)] {
        requires: &[ExtFloatUe8m0],
    }
    "intBitsToFloatue8m0EXT": Pure(Bitcast) => [floatue8m0_t(int8_t), fue8m0vecN(i8vecN)] {
        requires: &[ExtFloatUe8m0],
    }
    "uintBitsToFloatue8m0EXT": Pure(Bitcast) => [floatue8m0_t(uint8_t), fue8m0vecN(u8vecN)] {
        requires: &[ExtFloatUe8m0],
    }
    "floatmxint8BitsToIntEXT": Pure(Bitcast) => [int8_t(floatmxint8_t), i8vecN(fmxint8vecN)] {
        requires: &[ExtFloatMxint8],
    }
    "floatmxint8BitsToUintEXT": Pure(Bitcast) => [uint8_t(floatmxint8_t), u8vecN(fmxint8vecN)] {
        requires: &[ExtFloatMxint8],
    }
    "intBitsToFloatmxint8EXT": Pure(Bitcast) => [floatmxint8_t(int8_t), fmxint8vecN(i8vecN)] {
        requires: &[ExtFloatMxint8],
    }
    "uintBitsToFloatmxint8EXT": Pure(Bitcast) => [floatmxint8_t(uint8_t), fmxint8vecN(u8vecN)] {
        requires: &[ExtFloatMxint8],
    }
    "unpackFloat2xfe2m1EXT": Pure(PackedBitcast { extract: false }) => [fe2m1vec2(uint8_t)] {
        requires: &[ExtFloatE2m1],
    }
    "unpackFloat4xfe2m1EXT": Pure(PackedBitcast { extract: false }) => [fe2m1vec4(uint16_t)] {
        requires: &[ExtFloatE2m1],
    }
    "unpackFloat8xfe2m1EXT": Pure(PackedBitcast { extract: false }) => [fe2m1vec8(uint32_t)] {
        requires: &[ExtFloatE2m1],
    }
    "unpackFloat16xfe2m1EXT": Pure(PackedBitcast { extract: false }) => [fe2m1vec16(u32vec2)] {
        requires: &[ExtFloatE2m1],
    }
    "packFloat2xfe2m1EXT": Pure(PackedBitcast { extract: false }) => [uint8_t(fe2m1vec2)] {
        requires: &[ExtFloatE2m1],
    }
    "packFloat4xfe2m1EXT": Pure(PackedBitcast { extract: false }) => [uint16_t(fe2m1vec4)] {
        requires: &[ExtFloatE2m1],
    }
    "packFloat8xfe2m1EXT": Pure(PackedBitcast { extract: false }) => [uint32_t(fe2m1vec8)] {
        requires: &[ExtFloatE2m1],
    }
    "packFloat16xfe2m1EXT": Pure(PackedBitcast { extract: false }) => [u32vec2(fe2m1vec16)] {
        requires: &[ExtFloatE2m1],
    }
    "unpackFloat4xfe3m2EXT": Pure(PackedBitcast { extract: false }) => [fe3m2vec4(u8vec3)] {
        requires: &[ExtFloatE3m2],
    }
    "unpackFloat8xfe3m2EXT": Pure(PackedBitcast { extract: false }) => [fe3m2vec8(u16vec3)] {
        requires: &[ExtFloatE3m2],
    }
    "unpackFloat16xfe3m2EXT": Pure(PackedBitcast { extract: false }) => [fe3m2vec16(u32vec3)] {
        requires: &[ExtFloatE3m2],
    }
    "packFloat4xfe3m2EXT": Pure(PackedBitcast { extract: false }) => [u8vec3(fe3m2vec4)] {
        requires: &[ExtFloatE3m2],
    }
    "packFloat8xfe3m2EXT": Pure(PackedBitcast { extract: false }) => [u16vec3(fe3m2vec8)] {
        requires: &[ExtFloatE3m2],
    }
    "packFloat16xfe3m2EXT": Pure(PackedBitcast { extract: false }) => [u32vec3(fe3m2vec16)] {
        requires: &[ExtFloatE3m2],
    }
    "unpackFloat4xfe2m3EXT": Pure(PackedBitcast { extract: false }) => [fe2m3vec4(u8vec3)] {
        requires: &[ExtFloatE2m3],
    }
    "unpackFloat8xfe2m3EXT": Pure(PackedBitcast { extract: false }) => [fe2m3vec8(u16vec3)] {
        requires: &[ExtFloatE2m3],
    }
    "unpackFloat16xfe2m3EXT": Pure(PackedBitcast { extract: false }) => [fe2m3vec16(u32vec3)] {
        requires: &[ExtFloatE2m3],
    }
    "packFloat4xfe2m3EXT": Pure(PackedBitcast { extract: false }) => [u8vec3(fe2m3vec4)] {
        requires: &[ExtFloatE2m3],
    }
    "packFloat8xfe2m3EXT": Pure(PackedBitcast { extract: false }) => [u16vec3(fe2m3vec8)] {
        requires: &[ExtFloatE2m3],
    }
    "packFloat16xfe2m3EXT": Pure(PackedBitcast { extract: false }) => [u32vec3(fe2m3vec16)] {
        requires: &[ExtFloatE2m3],
    }
    "bitcastExtractfe2m1EXT": Pure(PackedBitcast { extract: true }) => [
        floate2m1_t(uint8_t, uint),
        fe2m1vecN(u8vecN, uint),
    ] {
        requires: &[ExtFloatE2m1],
    }
    "bitcastExtractfe3m2EXT": Pure(PackedBitcast { extract: true }) => [
        floate3m2_t(uint8_t, uint),
        fe3m2vecN(u8vecN, uint),
    ] {
        requires: &[ExtFloatE3m2],
    }
    "bitcastExtractfe2m3EXT": Pure(PackedBitcast { extract: true }) => [
        floate2m3_t(uint8_t, uint),
        fe2m3vecN(u8vecN, uint),
    ] {
        requires: &[ExtFloatE2m3],
    }
};
