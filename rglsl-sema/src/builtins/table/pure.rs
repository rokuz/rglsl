use rglsl_types::extension::Extension::*;

use super::BuiltinFunction;
use super::Floats::{DoublesAndHalves, Halves};
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
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "degrees": Pure(Math(Degrees)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "sin": Pure(Math(Sin)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "cos": Pure(Math(Cos)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "tan": Pure(Math(Tan)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "asin": Pure(Math(Asin)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "acos": Pure(Math(Acos)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "atan": Pure(Math(Atan2)) => [genF(genF, genF)] {
        flags: flags!(FOLD, COOPERATIVE_VECTOR, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "atan": Pure(Math(Atan)) => [genF(genF)] {
        flags: flags!(FOLD, COOPERATIVE_VECTOR, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "sinh": Pure(Math(Sinh)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "cosh": Pure(Math(Cosh)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "tanh": Pure(Math(Tanh)) => [genF(genF)] {
        flags: flags!(FOLD, COOPERATIVE_VECTOR, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "asinh": Pure(Math(Asinh)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "acosh": Pure(Math(Acosh)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "atanh": Pure(Math(Atanh)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "pow": Pure(Math(Pow)) => [genF(genF, genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "exp": Pure(Math(Exp)) => [genF(genF)] {
        flags: flags!(FOLD, COOPERATIVE_VECTOR, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "log": Pure(Math(Log)) => [genF(genF)] {
        flags: flags!(FOLD, COOPERATIVE_VECTOR, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "exp2": Pure(Math(Exp2)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "log2": Pure(Math(Log2)) => [genF(genF)] {
        flags: flags!(FOLD, NO_DOUBLE_LONG_VECTOR, FUZZ),
        floats: Halves,
    }
    "sqrt": Pure(Math(Sqrt)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "inversesqrt": Pure(Math(InverseSqrt)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "abs": Pure(Math(Abs)) => [
        genF(genF),
        genI(genI),
        genI64(genI64),
        genI16(genI16),
        genI8(genI8),
    ] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "sign": Pure(Math(Sign)) => [
        genF(genF),
        genI(genI),
        genI64(genI64),
        genI16(genI16),
        genI8(genI8),
    ] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "floor": Pure(Math(Floor)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "trunc": Pure(Math(Trunc)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "round": Pure(Math(Round)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "roundEven": Pure(Math(RoundEven)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "ceil": Pure(Math(Ceil)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "fract": Pure(Math(Fract)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "mod": Pure(Modulo) => [genF(genF, genF), genF(genF, float)] {
        flags: flags!(FOLD, PRECISE_ARITHMETIC, FUZZ),
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
        flags: flags!(FOLD, COOPERATIVE_VECTOR, FUZZ),
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
        flags: flags!(FOLD, COOPERATIVE_VECTOR, FUZZ),
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
        flags: flags!(FOLD, COOPERATIVE_VECTOR, FUZZ),
        floats: DoublesAndHalves,
    }
    "min3": Pure(Math(Min3)) => [
        genF(genF, genF, genF),
        genI(genI, genI, genI),
        genU(genU, genU, genU),
        genI16(genI16, genI16, genI16),
        genU16(genU16, genU16, genU16),
    ] {
        requires: &[AmdShaderTrinaryMinmax],
        floats: Halves,
    }
    "max3": Pure(Math(Max3)) => [
        genF(genF, genF, genF),
        genI(genI, genI, genI),
        genU(genU, genU, genU),
        genI16(genI16, genI16, genI16),
        genU16(genU16, genU16, genU16),
    ] {
        requires: &[AmdShaderTrinaryMinmax],
        floats: Halves,
    }
    "mid3": Pure(Math(Mid3)) => [
        genF(genF, genF, genF),
        genI(genI, genI, genI),
        genU(genU, genU, genU),
        genI16(genI16, genI16, genI16),
        genU16(genU16, genU16, genU16),
    ] {
        requires: &[AmdShaderTrinaryMinmax],
        floats: Halves,
    }
    "mix": Pure(Math(Mix)) => [genF(genF, genF, genF), genF(genF, genF, float)] {
        flags: flags!(FOLD, FUZZ),
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
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "step": Pure(Math(Step)) => [genF(genF, genF), genF(float, genF)] {
        flags: flags!(FOLD, COOPERATIVE_VECTOR, FUZZ),
        floats: DoublesAndHalves,
    }
    "smoothstep": Pure(Math(SmoothStep)) => [genF(genF, genF, genF), genF(float, float, genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "isnan": Pure(Relational(IsNan)) => [genB(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "isinf": Pure(Relational(IsInf)) => [genB(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "fma": Pure(Math(Fma)) => [genF(genF, genF, genF)] {
        flags: flags!(COOPERATIVE_VECTOR, FUZZ),
        floats: DoublesAndHalves,
    }
    "frexp": Decompose(Frexp) => [genF(genF, out genI), genH(genH, out genI16)] {
        flags: flags!(HIGHP_OPERANDS),
        floats: DoublesAndHalves,
    }
    "ldexp": Pure(Math(Ldexp)) => [genF(genF, genI), genH(genH, genI16)] {
        flags: flags!(HIGHP_OPERANDS, FUZZ),
        floats: DoublesAndHalves,
    }
    "floatBitsToInt": Pure(Bitcast) => [genI(genF)] {
        flags: flags!(FOLD, HIGHP_OPERANDS, FUZZ),
    }
    "floatBitsToUint": Pure(Bitcast) => [genU(genF)] {
        flags: flags!(FOLD, HIGHP_OPERANDS, FUZZ),
    }
    "intBitsToFloat": Pure(Bitcast) => [genF(genI)] {
        flags: flags!(FOLD, HIGHP_OPERANDS, FUZZ),
    }
    "uintBitsToFloat": Pure(Bitcast) => [genF(genU)] {
        flags: flags!(FOLD, HIGHP_OPERANDS, FUZZ),
    }
    "packUnorm2x16": Pure(Math(Pack2x16unorm)) => [uint(vec2)] {
        flags: flags!(HIGHP_RESULT, FUZZ),
    }
    "packSnorm2x16": Pure(Math(Pack2x16snorm)) => [uint(vec2)] {
        flags: flags!(HIGHP_RESULT, FUZZ),
    }
    "packUnorm4x8": Pure(Math(Pack4x8unorm)) => [uint(vec4)] {
        flags: flags!(HIGHP_RESULT, FUZZ),
    }
    "packSnorm4x8": Pure(Math(Pack4x8snorm)) => [uint(vec4)] {
        flags: flags!(HIGHP_RESULT, FUZZ),
    }
    "unpackUnorm2x16": Pure(Math(Unpack2x16unorm)) => [vec2(uint)] {
        flags: flags!(HIGHP_OPERANDS, FUZZ),
    }
    "unpackSnorm2x16": Pure(Math(Unpack2x16snorm)) => [vec2(uint)] {
        flags: flags!(HIGHP_OPERANDS, FUZZ),
    }
    "unpackUnorm4x8": Pure(Math(Unpack4x8unorm)) => [vec4(uint)] {
        flags: flags!(HIGHP_OPERANDS, FUZZ),
    }
    "unpackSnorm4x8": Pure(Math(Unpack4x8snorm)) => [vec4(uint)] {
        flags: flags!(HIGHP_OPERANDS, FUZZ),
    }
    "packHalf2x16": Pure(Math(Pack2x16float)) => [uint(vec2)] {
        flags: flags!(HIGHP_RESULT, FUZZ),
    }
    "unpackHalf2x16": Pure(Math(Unpack2x16float)) => [vec2(uint)] {
        flags: flags!(HIGHP_OPERANDS, FUZZ),
    }
    "packDouble2x32": Pure(Math(PackDouble2x32)) => [double(uvec2)] {
        flags: flags!(HIGHP_OPERANDS),
    }
    "unpackDouble2x32": Pure(Math(UnpackDouble2x32)) => [uvec2(double)] {
        flags: flags!(HIGHP_OPERANDS),
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
        flags: flags!(FOLD, FUZZ),
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
        flags: flags!(FOLD, FUZZ),
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
        flags: flags!(FOLD, FUZZ),
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
        flags: flags!(FOLD, FUZZ),
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
        flags: flags!(FOLD, FUZZ),
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
        flags: flags!(FOLD, FUZZ),
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
    ] {
        flags: flags!(FUZZ),
    }
    "findLSB": Pure(Bits(FindLsb)) => [
        genI64(genI64),
        genI64(genU64),
        genI16(genI16),
        genI16(genU16),
        genI8(genI8),
        genI8(genU8),
        genI(genI),
        genI(genU),
    ] {
        flags: flags!(FUZZ),
    }
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
        flags: flags!(HIGHP_OPERANDS, FUZZ),
    }
    "doubleBitsToInt64": Pure(Bitcast) => [genI64(genD)]
    "doubleBitsToUint64": Pure(Bitcast) => [genU64(genD)]
    "int64BitsToDouble": Pure(Bitcast) => [genD(genI64)]
    "uint64BitsToDouble": Pure(Bitcast) => [genD(genU64)]
    "packInt2x32": Pure(RepackBits) => [int64_t(ivec2)]
    "packUint2x32": Pure(RepackBits) => [uint64_t(uvec2)]
    "unpackInt2x32": Pure(RepackBits) => [ivec2(int64_t)]
    "unpackUint2x32": Pure(RepackBits) => [uvec2(uint64_t)]
    "bitfieldExtract": Pure(Bits(Extract)) => [
        genI16(genI16, int16_t, int16_t),
        genU16(genU16, int16_t, int16_t),
        genI8(genI8, int8_t, int8_t),
        genU8(genU8, int8_t, int8_t),
        genI(genI, int, int),
        genU(genU, int, int),
    ] {
        flags: flags!(FUZZ),
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
        flags: flags!(FUZZ),
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
        flags: flags!(HIGHP_OPERANDS, FUZZ),
    }
    "halfBitsToInt16": Pure(Bitcast) => [genI16(genH)]
    "halfBitsToUint16": Pure(Bitcast) => [genU16(genH)]
    "float16BitsToInt16": Pure(Bitcast) => [genI16(genH)]
    "float16BitsToUint16": Pure(Bitcast) => [genU16(genH)]
    "int16BitsToFloat16": Pure(Bitcast) => [genH(genI16)]
    "uint16BitsToFloat16": Pure(Bitcast) => [genH(genU16)]
    "int16BitsToHalf": Pure(Bitcast) => [genH(genI16)]
    "uint16BitsToHalf": Pure(Bitcast) => [genH(genU16)]
    "packInt2x16": Pure(RepackBits) => [int(i16vec2)]
    "packUint2x16": Pure(RepackBits) => [uint(u16vec2)]
    "packInt4x16": Pure(RepackBits) => [int64_t(i16vec4)]
    "packUint4x16": Pure(RepackBits) => [uint64_t(u16vec4)]
    "unpackInt2x16": Pure(RepackBits) => [i16vec2(int)]
    "unpackUint2x16": Pure(RepackBits) => [u16vec2(uint)]
    "unpackInt4x16": Pure(RepackBits) => [i16vec4(int64_t)]
    "unpackUint4x16": Pure(RepackBits) => [u16vec4(uint64_t)]
    "pack16": Pure(RepackBits) => [int16_t(i8vec2), uint16_t(u8vec2)]
    "pack32": Pure(RepackBits) => [int(i8vec4), uint(u8vec4), int(i16vec2), uint(u16vec2)]
    "pack64": Pure(RepackBits) => [
        int64_t(i16vec4),
        uint64_t(u16vec4),
        int64_t(ivec2),
        uint64_t(uvec2),
    ]
    "unpack8": Pure(RepackBits) => [i8vec2(int16_t), u8vec2(uint16_t), i8vec4(int), u8vec4(uint)]
    "unpack16": Pure(RepackBits) => [
        i16vec2(int),
        u16vec2(uint),
        i16vec4(int64_t),
        u16vec4(uint64_t),
    ]
    "unpack32": Pure(RepackBits) => [ivec2(int64_t), uvec2(uint64_t)]
    "length": Pure(Math(Length)) => [float(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "distance": Pure(Math(Distance)) => [float(genF, genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "dot": Pure(Math(Dot)) => [float(genF, genF), bfloat16_t(bf16vecN, bf16vecN)] {
        flags: flags!(FOLD, PRECISE_ARITHMETIC, FUZZ),
        floats: DoublesAndHalves,
    }
    "cross": Pure(Math(Cross)) => [vec3(vec3, vec3)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "normalize": Pure(Math(Normalize)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "faceforward": Pure(Math(FaceForward)) => [genF(genF, genF, genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "reflect": Pure(Math(Reflect)) => [genF(genF, genF)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "refract": Pure(Math(Refract)) => [genF(genF, genF, float)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "matrixCompMult": Pure(MatrixCompMult) => [matCxR(matCxR, matCxR)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "outerProduct": Pure(Math(Outer)) => [matCxR(vecR, vecC)] {
        flags: flags!(FOLD, FUZZ),
        floats: DoublesAndHalves,
    }
    "transpose": Pure(Math(Transpose)) => [matRxC(matCxR)] {
        flags: flags!(FUZZ),
        floats: DoublesAndHalves,
    }
    "determinant": Pure(Math(Determinant)) => [float(matN)] {
        flags: flags!(FUZZ),
        floats: DoublesAndHalves,
    }
    "inverse": Pure(Math(Inverse)) => [matN(matN)] {
        flags: flags!(FUZZ),
        floats: DoublesAndHalves,
    }
    "any": Pure(Relational(Any)) => [bool(bvecN)] {
        flags: flags!(FOLD, FUZZ),
    }
    "all": Pure(Relational(All)) => [bool(bvecN)] {
        flags: flags!(FOLD, FUZZ),
    }
    "not": Pure(Not) => [bvecN(bvecN)] {
        flags: flags!(FOLD, FUZZ),
    }
    "uaddCarry": Wide(AddCarry) => [genU(genU, genU, out genU)] {
        flags: flags!(HIGHP_OPERANDS),
    }
    "usubBorrow": Wide(SubBorrow) => [genU(genU, genU, out genU)] {
        flags: flags!(HIGHP_OPERANDS),
    }
    "umulExtended": Wide(MulExtended { signed: false }) => [void(genU, genU, out genU, out genU)] {
        flags: flags!(HIGHP_OPERANDS),
    }
    "imulExtended": Wide(MulExtended { signed: true }) => [void(genI, genI, out genI, out genI)] {
        flags: flags!(HIGHP_OPERANDS),
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
        flags: flags!(PRECISE_ARITHMETIC),
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
        flags: flags!(PRECISE_ARITHMETIC),
    }
    "dotPacked4x8EXT": Pure(Math(PackedIntegerDot4x8)) => [
        uint(uint, uint),
        int(int, uint),
        int(uint, int),
        int(int, int),
    ] {
        requires: &[ExtIntegerDotProduct],
        flags: flags!(PRECISE_ARITHMETIC),
    }
    "dotPacked4x8AccSatEXT": Pure(Math(PackedIntegerDot4x8AccSat)) => [
        uint(uint, uint, uint),
        int(int, uint, int),
        int(uint, int, int),
        int(int, int, int),
    ] {
        requires: &[ExtIntegerDotProduct],
        flags: flags!(PRECISE_ARITHMETIC),
    }
    "dFdx": Pure(Derivative(Axis::X, Control::Plain)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdy": Pure(Derivative(Axis::Y, Control::Plain)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "fwidth": Pure(Derivative(Axis::Width, Control::Plain)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdxFine": Pure(Derivative(Axis::X, Control::Fine)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdyFine": Pure(Derivative(Axis::Y, Control::Fine)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "fwidthFine": Pure(Derivative(Axis::Width, Control::Fine)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdxCoarse": Pure(Derivative(Axis::X, Control::Coarse)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "dFdyCoarse": Pure(Derivative(Axis::Y, Control::Coarse)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
        stages: FRAGMENT | COMPUTE | TASK | MESH,
        floats: DoublesAndHalves,
    }
    "fwidthCoarse": Pure(Derivative(Axis::Width, Control::Coarse)) => [genF(genF)] {
        flags: flags!(FOLD, FUZZ),
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
