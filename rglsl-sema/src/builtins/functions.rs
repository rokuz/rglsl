use super::{Section, ALL_STAGES, COMPUTE, FRAGMENT, GEOMETRY, TESS_CONTROL};

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

const COMPUTE_MEMORY_BARRIERS: &str = "
void memoryBarrierShared()
void groupMemoryBarrier()
";

const SHADER_INVOCATION_GROUP: &str = "
bool anyInvocation(bool)
bool allInvocations(bool)
bool allInvocationsEqual(bool)
";

pub(super) const SECTIONS: &[Section] = &[
    Section::new(ANGLE_AND_TRIGONOMETRY),
    Section::new(EXPONENTIAL),
    Section::new(EXPONENTIAL_WITH_DOUBLE).with_doubles(),
    Section::new(COMMON_WITH_DOUBLE).with_doubles(),
    Section::new(COMMON_INTEGER),
    Section::new(PACKING),
    Section::new(GEOMETRIC).with_doubles(),
    Section::new(MATRIX).with_doubles(),
    Section::new(VECTOR_RELATIONAL_WITH_DOUBLE).with_doubles(),
    Section::new(VECTOR_RELATIONAL),
    Section::new(INTEGER),
    Section::new(ATOMIC_MEMORY),
    Section::new(DERIVATIVES).with_doubles().in_stages(FRAGMENT),
    Section::new(INTERPOLATION).in_stages(FRAGMENT),
    Section::new(GEOMETRY_SHADER).in_stages(GEOMETRY),
    Section::new(BARRIER).in_stages(TESS_CONTROL | COMPUTE),
    Section::new(MEMORY_BARRIERS).in_stages(ALL_STAGES),
    Section::new(COMPUTE_MEMORY_BARRIERS).in_stages(COMPUTE),
    Section::new(SHADER_INVOCATION_GROUP).since(460),
];
