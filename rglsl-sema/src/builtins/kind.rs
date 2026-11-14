#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum BuiltinKind {
    Named,
    Subgroup(Subgroup),
    Ray(Ray),
}

impl BuiltinKind {
    pub const fn requirements_gate_call(self) -> bool {
        match self {
            Self::Ray(_) => true,
            Self::Named | Self::Subgroup(_) => false,
        }
    }
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
