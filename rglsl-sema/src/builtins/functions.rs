use super::{Section, ALL_STAGES, COMPUTE, FRAGMENT, GEOMETRY, MESH, TASK, TESS_CONTROL};

const ANGLE_AND_TRIGONOMETRY: &str = "
genF radians(genF)
genF degrees(genF)
genF sin(genF)
genF cos(genF)
genF tan(genF)
genF asin(genF)
genF acos(genF)
genF atan(genF, genF)
genF atan(genF)
genF sinh(genF)
genF cosh(genF)
genF tanh(genF)
genF asinh(genF)
genF acosh(genF)
genF atanh(genF)
";

const EXPONENTIAL: &str = "
genF pow(genF, genF)
genF exp(genF)
genF log(genF)
genF exp2(genF)
genF log2(genF)
";

const EXPONENTIAL_WITH_DOUBLE: &str = "
genF sqrt(genF)
genF inversesqrt(genF)
";

const COMMON_WITH_DOUBLE: &str = "
genF abs(genF)
genF sign(genF)
genF floor(genF)
genF trunc(genF)
genF round(genF)
genF roundEven(genF)
genF ceil(genF)
genF fract(genF)
genF mod(genF, genF)
genF mod(genF, float)
genF modf(genF, out genF)
genF min(genF, genF)
genF min(genF, float)
genF max(genF, genF)
genF max(genF, float)
genF clamp(genF, genF, genF)
genF clamp(genF, float, float)
genF mix(genF, genF, genF)
genF mix(genF, genF, float)
genF mix(genF, genF, genB)
genF step(genF, genF)
genF step(float, genF)
genF smoothstep(genF, genF, genF)
genF smoothstep(float, float, genF)
genB isnan(genF)
genB isinf(genF)
genF fma(genF, genF, genF)
genF frexp(genF, out genI)
genF ldexp(genF, genI)
";

const COMMON_INTEGER: &str = "
genI abs(genI)
genI sign(genI)
genI min(genI, genI)
genI min(genI, int)
genU min(genU, genU)
genU min(genU, uint)
genI max(genI, genI)
genI max(genI, int)
genU max(genU, genU)
genU max(genU, uint)
genI clamp(genI, genI, genI)
genI clamp(genI, int, int)
genU clamp(genU, genU, genU)
genU clamp(genU, uint, uint)
genI mix(genI, genI, genB)
genU mix(genU, genU, genB)
genB mix(genB, genB, genB)
genI floatBitsToInt(genF)
genU floatBitsToUint(genF)
genF intBitsToFloat(genI)
genF uintBitsToFloat(genU)
";

const PACKING: &str = "
uint packUnorm2x16(vec2)
uint packSnorm2x16(vec2)
uint packUnorm4x8(vec4)
uint packSnorm4x8(vec4)
vec2 unpackUnorm2x16(uint)
vec2 unpackSnorm2x16(uint)
vec4 unpackUnorm4x8(uint)
vec4 unpackSnorm4x8(uint)
uint packHalf2x16(vec2)
vec2 unpackHalf2x16(uint)
double packDouble2x32(uvec2)
uvec2 unpackDouble2x32(double)
";

const GEOMETRIC: &str = "
float length(genF)
float distance(genF, genF)
float dot(genF, genF)
vec3 cross(vec3, vec3)
genF normalize(genF)
genF faceforward(genF, genF, genF)
genF reflect(genF, genF)
genF refract(genF, genF, float)
";

const MATRIX: &str = "
matCxR matrixCompMult(matCxR, matCxR)
matCxR outerProduct(vecR, vecC)
matRxC transpose(matCxR)
float determinant(matN)
matN inverse(matN)
";

const VECTOR_RELATIONAL_WITH_DOUBLE: &str = "
bvecN lessThan(vecN, vecN)
bvecN lessThanEqual(vecN, vecN)
bvecN greaterThan(vecN, vecN)
bvecN greaterThanEqual(vecN, vecN)
bvecN equal(vecN, vecN)
bvecN notEqual(vecN, vecN)
";

const VECTOR_RELATIONAL: &str = "
bvecN lessThan(ivecN, ivecN)
bvecN lessThan(uvecN, uvecN)
bvecN lessThanEqual(ivecN, ivecN)
bvecN lessThanEqual(uvecN, uvecN)
bvecN greaterThan(ivecN, ivecN)
bvecN greaterThan(uvecN, uvecN)
bvecN greaterThanEqual(ivecN, ivecN)
bvecN greaterThanEqual(uvecN, uvecN)
bvecN equal(ivecN, ivecN)
bvecN equal(uvecN, uvecN)
bvecN equal(bvecN, bvecN)
bvecN notEqual(ivecN, ivecN)
bvecN notEqual(uvecN, uvecN)
bvecN notEqual(bvecN, bvecN)
bool any(bvecN)
bool all(bvecN)
bvecN not(bvecN)
";

const INTEGER: &str = "
genU uaddCarry(genU, genU, out genU)
genU usubBorrow(genU, genU, out genU)
void umulExtended(genU, genU, out genU, out genU)
void imulExtended(genI, genI, out genI, out genI)
genI bitfieldExtract(genI, int, int)
genU bitfieldExtract(genU, int, int)
genI bitfieldInsert(genI, genI, int, int)
genU bitfieldInsert(genU, genU, int, int)
genI bitfieldReverse(genI)
genU bitfieldReverse(genU)
genI bitCount(genI)
genI bitCount(genU)
genI findLSB(genI)
genI findLSB(genU)
genI findMSB(genI)
genI findMSB(genU)
";

const ATOMIC_MEMORY: &str = "
uint atomicAdd(inout uint, uint)
int atomicAdd(inout int, int)
uint atomicMin(inout uint, uint)
int atomicMin(inout int, int)
uint atomicMax(inout uint, uint)
int atomicMax(inout int, int)
uint atomicAnd(inout uint, uint)
int atomicAnd(inout int, int)
uint atomicOr(inout uint, uint)
int atomicOr(inout int, int)
uint atomicXor(inout uint, uint)
int atomicXor(inout int, int)
uint atomicExchange(inout uint, uint)
int atomicExchange(inout int, int)
uint atomicCompSwap(inout uint, uint, uint)
int atomicCompSwap(inout int, int, int)
uint64_t atomicAdd(inout uint64_t, uint64_t)
uint64_t atomicMin(inout uint64_t, uint64_t)
uint64_t atomicMax(inout uint64_t, uint64_t)
uint64_t atomicAnd(inout uint64_t, uint64_t)
uint64_t atomicOr(inout uint64_t, uint64_t)
uint64_t atomicXor(inout uint64_t, uint64_t)
uint64_t atomicExchange(inout uint64_t, uint64_t)
uint64_t atomicCompSwap(inout uint64_t, uint64_t, uint64_t)
int64_t atomicAdd(inout int64_t, int64_t)
int64_t atomicMin(inout int64_t, int64_t)
int64_t atomicMax(inout int64_t, int64_t)
int64_t atomicAnd(inout int64_t, int64_t)
int64_t atomicOr(inout int64_t, int64_t)
int64_t atomicXor(inout int64_t, int64_t)
int64_t atomicExchange(inout int64_t, int64_t)
int64_t atomicCompSwap(inout int64_t, int64_t, int64_t)
uint atomicAdd(inout uint, uint, int, int, int)
uint atomicMin(inout uint, uint, int, int, int)
uint atomicMax(inout uint, uint, int, int, int)
uint atomicAnd(inout uint, uint, int, int, int)
uint atomicOr(inout uint, uint, int, int, int)
uint atomicXor(inout uint, uint, int, int, int)
uint atomicExchange(inout uint, uint, int, int, int)
uint atomicCompSwap(inout uint, uint, uint, int, int, int, int, int)
uint atomicLoad(uint, int, int, int)
void atomicStore(out uint, uint, int, int, int)
int atomicAdd(inout int, int, int, int, int)
int atomicMin(inout int, int, int, int, int)
int atomicMax(inout int, int, int, int, int)
int atomicAnd(inout int, int, int, int, int)
int atomicOr(inout int, int, int, int, int)
int atomicXor(inout int, int, int, int, int)
int atomicExchange(inout int, int, int, int, int)
int atomicCompSwap(inout int, int, int, int, int, int, int, int)
int atomicLoad(int, int, int, int)
void atomicStore(out int, int, int, int, int)
uint64_t atomicAdd(inout uint64_t, uint64_t, int, int, int)
uint64_t atomicMin(inout uint64_t, uint64_t, int, int, int)
uint64_t atomicMax(inout uint64_t, uint64_t, int, int, int)
uint64_t atomicAnd(inout uint64_t, uint64_t, int, int, int)
uint64_t atomicOr(inout uint64_t, uint64_t, int, int, int)
uint64_t atomicXor(inout uint64_t, uint64_t, int, int, int)
uint64_t atomicExchange(inout uint64_t, uint64_t, int, int, int)
uint64_t atomicCompSwap(inout uint64_t, uint64_t, uint64_t, int, int, int, int, int)
uint64_t atomicLoad(uint64_t, int, int, int)
void atomicStore(out uint64_t, uint64_t, int, int, int)
int64_t atomicAdd(inout int64_t, int64_t, int, int, int)
int64_t atomicMin(inout int64_t, int64_t, int, int, int)
int64_t atomicMax(inout int64_t, int64_t, int, int, int)
int64_t atomicAnd(inout int64_t, int64_t, int, int, int)
int64_t atomicOr(inout int64_t, int64_t, int, int, int)
int64_t atomicXor(inout int64_t, int64_t, int, int, int)
int64_t atomicExchange(inout int64_t, int64_t, int, int, int)
int64_t atomicCompSwap(inout int64_t, int64_t, int64_t, int, int, int, int, int)
int64_t atomicLoad(int64_t, int, int, int)
void atomicStore(out int64_t, int64_t, int, int, int)
";

const DERIVATIVES: &str = "
genF dFdx(genF)
genF dFdy(genF)
genF fwidth(genF)
genF dFdxFine(genF)
genF dFdyFine(genF)
genF fwidthFine(genF)
genF dFdxCoarse(genF)
genF dFdyCoarse(genF)
genF fwidthCoarse(genF)
";

const INTERPOLATION: &str = "
genF interpolateAtCentroid(genF)
genF interpolateAtSample(genF, int)
genF interpolateAtOffset(genF, vec2)
";

const GEOMETRY_SHADER: &str = "
void EmitStreamVertex(int)
void EndStreamPrimitive(int)
void EmitVertex()
void EndPrimitive()
";

const BARRIER: &str = "
void barrier()
";

const MEMORY_BARRIERS: &str = "
void memoryBarrier()
void memoryBarrierBuffer()
void memoryBarrierImage()
";

const SCOPED_BARRIERS: &str = "
void controlBarrier(int, int, int, int)
void memoryBarrier(int, int, int)
";

const COMPUTE_MEMORY_BARRIERS: &str = "
void memoryBarrierShared()
void groupMemoryBarrier()
";

const MESH_SHADER: &str = "
void SetMeshOutputsEXT(uint, uint)
void writePackedPrimitiveIndices4x8NV(uint, uint)
";

const TASK_SHADER: &str = "
void EmitMeshTasksEXT(uint, uint, uint)
";

const SHADER_INVOCATION_GROUP: &str = "
bool anyInvocation(bool)
bool allInvocations(bool)
bool allInvocationsEqual(bool)
";

const INT64: &str = "
genI64 abs(genI64)
genI64 sign(genI64)
genI64 min(genI64, genI64)
genI64 min(genI64, int64_t)
genU64 min(genU64, genU64)
genU64 min(genU64, uint64_t)
genI64 max(genI64, genI64)
genI64 max(genI64, int64_t)
genU64 max(genU64, genU64)
genU64 max(genU64, uint64_t)
genI64 clamp(genI64, genI64, genI64)
genI64 clamp(genI64, int64_t, int64_t)
genU64 clamp(genU64, genU64, genU64)
genU64 clamp(genU64, uint64_t, uint64_t)
genI64 mix(genI64, genI64, genB)
genU64 mix(genU64, genU64, genB)
bvecN lessThan(i64vecN, i64vecN)
bvecN lessThan(u64vecN, u64vecN)
bvecN lessThanEqual(i64vecN, i64vecN)
bvecN lessThanEqual(u64vecN, u64vecN)
bvecN greaterThan(i64vecN, i64vecN)
bvecN greaterThan(u64vecN, u64vecN)
bvecN greaterThanEqual(i64vecN, i64vecN)
bvecN greaterThanEqual(u64vecN, u64vecN)
bvecN equal(i64vecN, i64vecN)
bvecN equal(u64vecN, u64vecN)
bvecN notEqual(i64vecN, i64vecN)
bvecN notEqual(u64vecN, u64vecN)
genI64 bitCount(genI64)
genI64 bitCount(genU64)
genI64 findLSB(genI64)
genI64 findLSB(genU64)
genI64 findMSB(genI64)
genI64 findMSB(genU64)
genI64 doubleBitsToInt64(genD)
genU64 doubleBitsToUint64(genD)
genD int64BitsToDouble(genI64)
genD uint64BitsToDouble(genU64)
int64_t packInt2x32(ivec2)
uint64_t packUint2x32(uvec2)
ivec2 unpackInt2x32(int64_t)
uvec2 unpackUint2x32(uint64_t)
";

const INT16: &str = "
genI16 abs(genI16)
genI16 sign(genI16)
genI16 min(genI16, genI16)
genI16 min(genI16, int16_t)
genU16 min(genU16, genU16)
genU16 min(genU16, uint16_t)
genI16 max(genI16, genI16)
genI16 max(genI16, int16_t)
genU16 max(genU16, genU16)
genU16 max(genU16, uint16_t)
genI16 clamp(genI16, genI16, genI16)
genI16 clamp(genI16, int16_t, int16_t)
genU16 clamp(genU16, genU16, genU16)
genU16 clamp(genU16, uint16_t, uint16_t)
genI16 mix(genI16, genI16, genB)
genU16 mix(genU16, genU16, genB)
bvecN lessThan(i16vecN, i16vecN)
bvecN lessThan(u16vecN, u16vecN)
bvecN lessThanEqual(i16vecN, i16vecN)
bvecN lessThanEqual(u16vecN, u16vecN)
bvecN greaterThan(i16vecN, i16vecN)
bvecN greaterThan(u16vecN, u16vecN)
bvecN greaterThanEqual(i16vecN, i16vecN)
bvecN greaterThanEqual(u16vecN, u16vecN)
bvecN equal(i16vecN, i16vecN)
bvecN equal(u16vecN, u16vecN)
bvecN notEqual(i16vecN, i16vecN)
bvecN notEqual(u16vecN, u16vecN)
genI16 bitfieldExtract(genI16, int16_t, int16_t)
genU16 bitfieldExtract(genU16, int16_t, int16_t)
genI16 bitfieldInsert(genI16, genI16, int16_t, int16_t)
genU16 bitfieldInsert(genU16, genU16, int16_t, int16_t)
genI16 bitfieldReverse(genI16)
genU16 bitfieldReverse(genU16)
genI16 bitCount(genI16)
genI16 bitCount(genU16)
genI16 findLSB(genI16)
genI16 findLSB(genU16)
genI16 findMSB(genI16)
genI16 findMSB(genU16)
genH frexp(genH, out genI16)
genH ldexp(genH, genI16)
genI16 halfBitsToInt16(genH)
genU16 halfBitsToUint16(genH)
genI16 float16BitsToInt16(genH)
genU16 float16BitsToUint16(genH)
genH int16BitsToFloat16(genI16)
genH uint16BitsToFloat16(genU16)
genH int16BitsToHalf(genI16)
genH uint16BitsToHalf(genU16)
int packInt2x16(i16vec2)
uint packUint2x16(u16vec2)
int64_t packInt4x16(i16vec4)
uint64_t packUint4x16(u16vec4)
i16vec2 unpackInt2x16(int)
u16vec2 unpackUint2x16(uint)
i16vec4 unpackInt4x16(int64_t)
u16vec4 unpackUint4x16(uint64_t)
int16_t pack16(i8vec2)
uint16_t pack16(u8vec2)
int pack32(i8vec4)
uint pack32(u8vec4)
int pack32(i16vec2)
uint pack32(u16vec2)
int64_t pack64(i16vec4)
uint64_t pack64(u16vec4)
int64_t pack64(ivec2)
uint64_t pack64(uvec2)
i8vec2 unpack8(int16_t)
u8vec2 unpack8(uint16_t)
i8vec4 unpack8(int)
u8vec4 unpack8(uint)
i16vec2 unpack16(int)
u16vec2 unpack16(uint)
i16vec4 unpack16(int64_t)
u16vec4 unpack16(uint64_t)
ivec2 unpack32(int64_t)
uvec2 unpack32(uint64_t)
";

const INT8: &str = "
genI8 abs(genI8)
genI8 sign(genI8)
genI8 min(genI8, genI8)
genI8 min(genI8, int8_t)
genU8 min(genU8, genU8)
genU8 min(genU8, uint8_t)
genI8 max(genI8, genI8)
genI8 max(genI8, int8_t)
genU8 max(genU8, genU8)
genU8 max(genU8, uint8_t)
genI8 clamp(genI8, genI8, genI8)
genI8 clamp(genI8, int8_t, int8_t)
genU8 clamp(genU8, genU8, genU8)
genU8 clamp(genU8, uint8_t, uint8_t)
genI8 mix(genI8, genI8, genB)
genU8 mix(genU8, genU8, genB)
bvecN lessThan(i8vecN, i8vecN)
bvecN lessThan(u8vecN, u8vecN)
bvecN lessThanEqual(i8vecN, i8vecN)
bvecN lessThanEqual(u8vecN, u8vecN)
bvecN greaterThan(i8vecN, i8vecN)
bvecN greaterThan(u8vecN, u8vecN)
bvecN greaterThanEqual(i8vecN, i8vecN)
bvecN greaterThanEqual(u8vecN, u8vecN)
bvecN equal(i8vecN, i8vecN)
bvecN equal(u8vecN, u8vecN)
bvecN notEqual(i8vecN, i8vecN)
bvecN notEqual(u8vecN, u8vecN)
genI8 bitfieldExtract(genI8, int8_t, int8_t)
genU8 bitfieldExtract(genU8, int8_t, int8_t)
genI8 bitfieldInsert(genI8, genI8, int8_t, int8_t)
genU8 bitfieldInsert(genU8, genU8, int8_t, int8_t)
genI8 bitfieldReverse(genI8)
genU8 bitfieldReverse(genU8)
genI8 bitCount(genI8)
genI8 bitCount(genU8)
genI8 findLSB(genI8)
genI8 findLSB(genU8)
genI8 findMSB(genI8)
genI8 findMSB(genU8)
";

const HALF_PACKING: &str = "
uint packFloat2x16(f16vec2)
f16vec2 unpackFloat2x16(uint)
";

pub(super) const SECTIONS: &[Section] = &[
    Section::new(ANGLE_AND_TRIGONOMETRY).with_halves(),
    Section::new(EXPONENTIAL).with_halves(),
    Section::new(EXPONENTIAL_WITH_DOUBLE)
        .with_doubles()
        .with_halves(),
    Section::new(COMMON_WITH_DOUBLE)
        .with_doubles()
        .with_halves(),
    Section::new(COMMON_INTEGER),
    Section::new(PACKING),
    Section::new(HALF_PACKING),
    Section::new(INT64),
    Section::new(INT16),
    Section::new(INT8),
    Section::new(GEOMETRIC).with_doubles().with_halves(),
    Section::new(MATRIX).with_doubles().with_halves(),
    Section::new(VECTOR_RELATIONAL_WITH_DOUBLE)
        .with_doubles()
        .with_halves(),
    Section::new(VECTOR_RELATIONAL),
    Section::new(INTEGER),
    Section::new(ATOMIC_MEMORY),
    Section::new(DERIVATIVES)
        .with_doubles()
        .with_halves()
        .in_stages(FRAGMENT),
    Section::new(INTERPOLATION)
        .with_doubles()
        .with_halves()
        .in_stages(FRAGMENT),
    Section::new(GEOMETRY_SHADER).in_stages(GEOMETRY),
    Section::new(BARRIER).in_stages(TESS_CONTROL | COMPUTE | MESH | TASK),
    Section::new(MEMORY_BARRIERS).in_stages(ALL_STAGES),
    Section::new(SCOPED_BARRIERS),
    Section::new(COMPUTE_MEMORY_BARRIERS).in_stages(COMPUTE | MESH | TASK),
    Section::new(MESH_SHADER).in_stages(MESH),
    Section::new(TASK_SHADER).in_stages(TASK),
    Section::new(SHADER_INVOCATION_GROUP).since(460),
];
