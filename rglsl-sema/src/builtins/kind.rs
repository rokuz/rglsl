#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum BuiltinKind {
    Pure(Pure),
    Decompose(Decompose),
    Wide(Wide),
    Expect,
    Assume,
    Atomic(AtomicOperation),
    Barrier(Barrier),
    Interlock { begin: bool },
    HelperInvocation,
    Interpolate(InterpolateAt),
    AttachmentRead(Attachment),
    Mesh(Mesh),
    Primitive(Primitive),
    Subgroup(Subgroup),
    Ray(Ray),
    Texture(Texture),
}

impl BuiltinKind {
    pub const fn requirements_gate_call(self) -> bool {
        match self {
            Self::Ray(_) => true,
            Self::Pure(_)
            | Self::Decompose(_)
            | Self::Wide(_)
            | Self::Expect
            | Self::Assume
            | Self::Atomic(_)
            | Self::Barrier(_)
            | Self::Interlock { .. }
            | Self::HelperInvocation
            | Self::Interpolate(_)
            | Self::AttachmentRead(_)
            | Self::Mesh(_)
            | Self::Primitive(_)
            | Self::Subgroup(_)
            | Self::Texture(_) => false,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Pure {
    Math(Math),
    Bits(BitOperation),
    Relational(Relation),
    Compare(Comparison),
    Not,
    Select,
    Modulo,
    MatrixCompMult,
    Bitcast,
    RepackBits,
    PackedBitcast { extract: bool },
    Derivative(Axis, Control),
}

impl Pure {
    pub const fn replicates_scalars(self) -> bool {
        matches!(
            self,
            Self::Modulo
                | Self::Math(
                    Math::Min | Math::Max | Math::Clamp | Math::Mix | Math::Step | Math::SmoothStep
                )
        )
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Math {
    Radians,
    Degrees,
    Sin,
    Cos,
    Tan,
    Asin,
    Acos,
    Atan,
    Atan2,
    Sinh,
    Cosh,
    Tanh,
    Asinh,
    Acosh,
    Atanh,
    Pow,
    Exp,
    Log,
    Exp2,
    Log2,
    Sqrt,
    InverseSqrt,
    Abs,
    Sign,
    Floor,
    Trunc,
    Round,
    RoundEven,
    Ceil,
    Fract,
    Min,
    Max,
    Clamp,
    Mix,
    Step,
    SmoothStep,
    Fma,
    Ldexp,
    Length,
    Distance,
    Dot,
    IntegerDot,
    IntegerDotAccSat,
    PackedIntegerDot4x8,
    PackedIntegerDot4x8AccSat,
    Cross,
    Normalize,
    FaceForward,
    Reflect,
    Refract,
    Outer,
    Transpose,
    Determinant,
    Inverse,
    Pack2x16unorm,
    Pack2x16snorm,
    Pack4x8unorm,
    Pack4x8snorm,
    Unpack2x16unorm,
    Unpack2x16snorm,
    Unpack4x8unorm,
    Unpack4x8snorm,
    Pack2x16float,
    Unpack2x16float,
    PackDouble2x32,
    UnpackDouble2x32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum BitOperation {
    Extract,
    Insert,
    Reverse,
    Count,
    FindLsb,
    FindMsb,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Relation {
    IsNan,
    IsInf,
    Any,
    All,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Comparison {
    Less,
    LessEqual,
    Greater,
    GreaterEqual,
    Equal,
    NotEqual,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Axis {
    X,
    Y,
    Width,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Control {
    Plain,
    Fine,
    Coarse,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Decompose {
    Modf,
    Frexp,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Wide {
    AddCarry,
    SubBorrow,
    MulExtended { signed: bool },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum AtomicOperation {
    Add,
    Min,
    Max,
    And,
    Or,
    Xor,
    Exchange,
    CompareSwap,
    Load,
    Store,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Barrier {
    Execution,
    Memory(MemoryBarrier),
    ScopedMemory,
    ScopedControl,
    Split { phase: SplitPhase, scoped: bool },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum MemoryBarrier {
    All,
    Buffer,
    Image,
    Shared,
    Workgroup,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum SplitPhase {
    Arrive,
    Wait,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum InterpolateAt {
    Centroid,
    Sample,
    Offset,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Attachment {
    Color,
    Depth,
    Stencil,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Mesh {
    SetOutputs,
    EmitTasks,
    WritePackedPrimitiveIndices,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Primitive {
    Emit,
    End,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Subgroup {
    Barrier {
        execution: bool,
        memory: SubgroupMemory,
    },
    Ballot,
    Collective(SubgroupOperation, Collective),
    Gather(Gather),
    Function(SubgroupFunction),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum SubgroupFunction {
    Elect,
    AllEqual,
    QuadAll,
    QuadAny,
    InverseBallot,
    BallotBitExtract,
    BallotBitCount(Collective),
    BallotFindLsb,
    BallotFindMsb,
    Partition,
    ArbBallot,
    ReadInvocation,
    ReadFirstInvocation,
    AnyInvocation,
    AllInvocations,
    AllInvocationsEqual,
    AmdGroup {
        operation: SubgroupOperation,
        collective: Collective,
        non_uniform: bool,
    },
    Amd(AmdShaderBallot),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum AmdShaderBallot {
    Swizzle,
    SwizzleMasked,
    WriteInvocation,
    Mbcnt,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum SubgroupMemory {
    All,
    Buffer,
    Image,
    Shared,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum SubgroupOperation {
    All,
    Any,
    Add,
    Mul,
    Min,
    Max,
    And,
    Or,
    Xor,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Collective {
    Reduce,
    InclusiveScan,
    ExclusiveScan,
    Clustered,
    PartitionedReduce,
    PartitionedInclusiveScan,
    PartitionedExclusiveScan,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Gather {
    BroadcastFirst,
    Broadcast,
    Shuffle,
    ShuffleXor,
    ShuffleUp,
    ShuffleDown,
    QuadBroadcast,
    QuadSwap(QuadDirection),
    Rotate,
    ClusteredRotate,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum QuadDirection {
    Horizontal,
    Vertical,
    Diagonal,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Ray {
    Intersection(RayIntersection),
    Query(RayQueryValue),
    QueryFunction(RayQueryFunction),
    TraceRay { nv: bool, motion: bool },
    ExecuteCallable { nv: bool },
    ReportIntersection,
    IgnoreIntersection,
    TerminateRay,
    MicroTriangle(MicroTriangleValue),
    HitObject(HitObjectFlavor, HitObject),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum RayQueryValue {
    RayFlags,
    RayTMin,
    WorldRayOrigin,
    WorldRayDirection,
    CandidateAabbOpaque,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum RayQueryFunction {
    Initialize,
    Proceed,
    Terminate,
    ConfirmIntersection,
    GenerateIntersection,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum RayIntersection {
    Type,
    T,
    InstanceCustomIndex,
    InstanceId,
    InstanceShaderBindingTableRecordOffset,
    GeometryIndex,
    PrimitiveIndex,
    Barycentrics,
    FrontFace,
    ObjectRayDirection,
    ObjectRayOrigin,
    ObjectToWorld,
    WorldToObject,
    TriangleVertexPositions,
    ClusterId,
    SpherePosition,
    SphereRadius,
    LssPositions,
    LssRadii,
    LssHitValue,
    IsSphereHit,
    IsLssHit,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum MicroTriangleValue {
    Position,
    Barycentric,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum HitObjectFlavor {
    Nv,
    Ext,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum HitObject {
    Value(HitObjectValue),
    TraceRay { motion: bool },
    TraceReorderExecute { motion: bool },
    RecordHit { with_index: bool, motion: bool },
    RecordMiss,
    RecordEmpty,
    RecordFromQuery,
    ExecuteShader,
    ReorderExecute,
    GetAttributes,
    SetShaderBindingTableRecordIndex,
    ReorderThread,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum HitObjectValue {
    IsEmpty,
    IsHit,
    IsMiss,
    RayTMin,
    RayTMax,
    RayFlags,
    WorldRayOrigin,
    WorldRayDirection,
    ObjectRayOrigin,
    ObjectRayDirection,
    ObjectToWorld,
    WorldToObject,
    InstanceCustomIndex,
    InstanceId,
    GeometryIndex,
    PrimitiveIndex,
    HitKind,
    CurrentTime,
    ShaderBindingTableRecordIndex,
    ShaderRecordBufferHandle,
    ClusterId,
    SpherePosition,
    SphereRadius,
    LssPositions,
    LssRadii,
    IsSphereHit,
    IsLssHit,
    TriangleVertexPositions,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Texture {
    Footprint { level: TextureLevel, clamp: bool },
    Sample(Sample),
    Gather(TextureGather),
    Fetch { offset: bool, sparse: bool },
    ImageLoad { lod: bool, sparse: bool },
    ImageStore { lod: bool },
    ImageAtomic(AtomicOperation),
    Query(TextureQuery),
    QueryLod,
    SparseTexelsResident,
    ImageProcessing(ImageProcessing),
    SubpassLoad,
    FragmentFetch { mask: bool },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum TextureLevel {
    Implicit,
    Lod,
    Gradient,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct Sample {
    pub proj: bool,
    pub level: TextureLevel,
    pub offset: bool,
    pub clamp: bool,
    pub sparse: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct TextureGather {
    pub offsets: GatherOffsets,
    pub lod: bool,
    pub sparse: bool,
    pub pattern: GatherPattern,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum GatherOffsets {
    None,
    One,
    Four,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum GatherPattern {
    Quad,
    Linear4x1,
    Vertical2,
    Horizontal2,
    Diagonal,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum TextureQuery {
    Size,
    Samples,
    Levels,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum ImageProcessing {
    Weighted,
    BoxFilter,
    BlockMatch {
        metric: BlockMatchMetric,
        search: BlockMatchSearch,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum BlockMatchMetric {
    AbsoluteDifferences,
    SquaredDifferences,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum BlockMatchSearch {
    Block,
    Window,
    Gather,
}
