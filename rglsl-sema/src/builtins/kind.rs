#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum BuiltinKind {
    Named,
    Subgroup(Subgroup),
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
