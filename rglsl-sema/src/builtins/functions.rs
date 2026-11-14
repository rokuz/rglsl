use super::{ALL_STAGES, COMPUTE, FRAGMENT, GEOMETRY, MESH, Section, TASK, TESS_CONTROL};

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
float16_t atomicAdd(inout float16_t, float16_t)
float16_t atomicAdd(inout float16_t, float16_t, int, int, int)
float atomicAdd(inout float, float)
float atomicAdd(inout float, float, int, int, int)
double atomicAdd(inout double, double)
double atomicAdd(inout double, double, int, int, int)
float16_t atomicMin(inout float16_t, float16_t)
float16_t atomicMin(inout float16_t, float16_t, int, int, int)
float atomicMin(inout float, float)
float atomicMin(inout float, float, int, int, int)
double atomicMin(inout double, double)
double atomicMin(inout double, double, int, int, int)
float16_t atomicMax(inout float16_t, float16_t)
float16_t atomicMax(inout float16_t, float16_t, int, int, int)
float atomicMax(inout float, float)
float atomicMax(inout float, float, int, int, int)
double atomicMax(inout double, double)
double atomicMax(inout double, double, int, int, int)
float16_t atomicExchange(inout float16_t, float16_t)
float16_t atomicExchange(inout float16_t, float16_t, int, int, int)
float atomicExchange(inout float, float)
float atomicExchange(inout float, float, int, int, int)
double atomicExchange(inout double, double)
double atomicExchange(inout double, double, int, int, int)
float16_t atomicLoad(float16_t, int, int, int)
float atomicLoad(float, int, int, int)
double atomicLoad(double, int, int, int)
void atomicStore(out float16_t, float16_t, int, int, int)
void atomicStore(out float, float, int, int, int)
void atomicStore(out double, double, int, int, int)
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

const SPLIT_BARRIERS: &str = "
void controlBarrierArrive(int, int, int, int)
void controlBarrierWait(int, int, int, int)
";

const COMPUTE_SPLIT_BARRIERS: &str = "
void controlBarrierArrive()
void controlBarrierWait()
";

const FRAGMENT_ONLY: &str = "
void beginInvocationInterlockARB()
void endInvocationInterlockARB()
bool helperInvocationEXT()
uint stencilAttachmentReadEXT()
uint stencilAttachmentReadEXT(int)
float depthAttachmentReadEXT()
float depthAttachmentReadEXT(int)
vec4 colorAttachmentReadEXT(attachmentEXT)
vec4 colorAttachmentReadEXT(attachmentEXT, int)
ivec4 colorAttachmentReadEXT(iattachmentEXT)
ivec4 colorAttachmentReadEXT(iattachmentEXT, int)
uvec4 colorAttachmentReadEXT(uattachmentEXT)
uvec4 colorAttachmentReadEXT(uattachmentEXT, int)
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

pub(super) const SECTIONS: &[Section] = &[
    Section::new(ATOMIC_MEMORY),
    Section::new(INTERPOLATION)
        .with_doubles()
        .with_halves()
        .in_stages(FRAGMENT),
    Section::new(GEOMETRY_SHADER).in_stages(GEOMETRY),
    Section::new(BARRIER).in_stages(TESS_CONTROL | COMPUTE | MESH | TASK),
    Section::new(MEMORY_BARRIERS).in_stages(ALL_STAGES),
    Section::new(SCOPED_BARRIERS),
    Section::new(SPLIT_BARRIERS),
    Section::new(COMPUTE_SPLIT_BARRIERS).in_stages(COMPUTE),
    Section::new(FRAGMENT_ONLY).in_stages(FRAGMENT),
    Section::new(COMPUTE_MEMORY_BARRIERS).in_stages(COMPUTE | MESH | TASK),
    Section::new(MESH_SHADER).in_stages(MESH),
    Section::new(TASK_SHADER).in_stages(TASK),
];
