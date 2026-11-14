use rglsl_types::extension::Extension::*;

use super::BuiltinFunction;
use crate::builtins::kind::AmdShaderBallot::*;
use crate::builtins::kind::BuiltinKind::Subgroup;
use crate::builtins::kind::Collective::*;
use crate::builtins::kind::Gather::*;
use crate::builtins::kind::QuadDirection::*;
use crate::builtins::kind::Subgroup::*;
use crate::builtins::kind::SubgroupFunction::*;
use crate::builtins::kind::{SubgroupMemory, SubgroupOperation};
use crate::builtins::{COMPUTE, MESH, TASK};
use crate::types::Scalar;

const FLOATS_BOOL_INTEGERS: &[Scalar] = &[
    Scalar::Float,
    Scalar::Float16,
    Scalar::Double,
    Scalar::Bool,
    Scalar::Int8,
    Scalar::Int16,
    Scalar::Int,
    Scalar::Int64,
    Scalar::Uint8,
    Scalar::Uint16,
    Scalar::Uint,
    Scalar::Uint64,
];
const FLOATS_INTEGERS: &[Scalar] = &[
    Scalar::Float,
    Scalar::Float16,
    Scalar::Double,
    Scalar::Int8,
    Scalar::Int16,
    Scalar::Int,
    Scalar::Int64,
    Scalar::Uint8,
    Scalar::Uint16,
    Scalar::Uint,
    Scalar::Uint64,
];
const BOOL_INTEGERS: &[Scalar] = &[
    Scalar::Bool,
    Scalar::Int8,
    Scalar::Int16,
    Scalar::Int,
    Scalar::Int64,
    Scalar::Uint8,
    Scalar::Uint16,
    Scalar::Uint,
    Scalar::Uint64,
];
const BASIC: &[Scalar] = &[Scalar::Float, Scalar::Int, Scalar::Uint];
const AMD: &[Scalar] = &[
    Scalar::Float,
    Scalar::Int,
    Scalar::Uint,
    Scalar::Double,
    Scalar::Int64,
    Scalar::Uint64,
    Scalar::Float16,
    Scalar::Int16,
    Scalar::Uint16,
];

pub(super) const FUNCTIONS: &[BuiltinFunction] = builtins! {
    "subgroupBarrier": Subgroup(Barrier { execution: true, memory: SubgroupMemory::All }) => [void()] {
        requires: &[KhrShaderSubgroupBasic],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupMemoryBarrier": Subgroup(Barrier { execution: false, memory: SubgroupMemory::All }) => [void()] {
        requires: &[KhrShaderSubgroupBasic],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupMemoryBarrierBuffer": Subgroup(Barrier { execution: false, memory: SubgroupMemory::Buffer }) => [void()] {
        requires: &[KhrShaderSubgroupBasic],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupMemoryBarrierImage": Subgroup(Barrier { execution: false, memory: SubgroupMemory::Image }) => [void()] {
        requires: &[KhrShaderSubgroupBasic],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupMemoryBarrierShared": Subgroup(Barrier { execution: false, memory: SubgroupMemory::Shared }) => [void()] {
        requires: &[KhrShaderSubgroupBasic],
        flags: flags!(SUBGROUP_OPERATION),
        stages: COMPUTE | MESH | TASK,
    }
    "subgroupElect": Subgroup(Function(Elect)) => [bool()] {
        requires: &[KhrShaderSubgroupBasic],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupAll": Subgroup(Collective(SubgroupOperation::All, Reduce)) => [bool(bool)] {
        requires: &[KhrShaderSubgroupVote],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupAny": Subgroup(Collective(SubgroupOperation::Any, Reduce)) => [bool(bool)] {
        requires: &[KhrShaderSubgroupVote],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupQuadAll": Subgroup(Function(QuadAll)) => [bool(bool)] {
        requires: &[ExtShaderQuadControl, KhrShaderSubgroupVote],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupQuadAny": Subgroup(Function(QuadAny)) => [bool(bool)] {
        requires: &[ExtShaderQuadControl, KhrShaderSubgroupVote],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupBallot": Subgroup(Ballot) => [uvec4(bool)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupInverseBallot": Subgroup(Function(InverseBallot)) => [bool(uvec4)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupBallotBitExtract": Subgroup(Function(BallotBitExtract)) => [bool(uvec4, uint)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupBallotBitCount": Subgroup(Function(BallotBitCount(Reduce))) => [uint(uvec4)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupBallotInclusiveBitCount": Subgroup(Function(BallotBitCount(InclusiveScan))) => [uint(uvec4)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupBallotExclusiveBitCount": Subgroup(Function(BallotBitCount(ExclusiveScan))) => [uint(uvec4)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupBallotFindLSB": Subgroup(Function(BallotFindLsb)) => [uint(uvec4)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupBallotFindMSB": Subgroup(Function(BallotFindMsb)) => [uint(uvec4)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
    }
    "subgroupAllEqual": Subgroup(Function(AllEqual)) => [bool(value)] {
        requires: &[KhrShaderSubgroupVote],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupBroadcast": Subgroup(Gather(Broadcast)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupBroadcastFirst": Subgroup(Gather(BroadcastFirst)) => [value(value)] {
        requires: &[KhrShaderSubgroupBallot],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupShuffle": Subgroup(Gather(Shuffle)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupShuffle],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupShuffleXor": Subgroup(Gather(ShuffleXor)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupShuffle],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupShuffleUp": Subgroup(Gather(ShuffleUp)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupShuffleRelative],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupShuffleDown": Subgroup(Gather(ShuffleDown)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupShuffleRelative],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupRotate": Subgroup(Gather(Rotate)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupRotate],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupClusteredRotate": Subgroup(Gather(ClusteredRotate)) => [value(value, uint, uint)] {
        requires: &[KhrShaderSubgroupRotate],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupAdd": Subgroup(Collective(SubgroupOperation::Add, Reduce)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupMul": Subgroup(Collective(SubgroupOperation::Mul, Reduce)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupMin": Subgroup(Collective(SubgroupOperation::Min, Reduce)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupMax": Subgroup(Collective(SubgroupOperation::Max, Reduce)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupAnd": Subgroup(Collective(SubgroupOperation::And, Reduce)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupOr": Subgroup(Collective(SubgroupOperation::Or, Reduce)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupXor": Subgroup(Collective(SubgroupOperation::Xor, Reduce)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupInclusiveAdd": Subgroup(Collective(SubgroupOperation::Add, InclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupInclusiveMul": Subgroup(Collective(SubgroupOperation::Mul, InclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupInclusiveMin": Subgroup(Collective(SubgroupOperation::Min, InclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupInclusiveMax": Subgroup(Collective(SubgroupOperation::Max, InclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupInclusiveAnd": Subgroup(Collective(SubgroupOperation::And, InclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupInclusiveOr": Subgroup(Collective(SubgroupOperation::Or, InclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupInclusiveXor": Subgroup(Collective(SubgroupOperation::Xor, InclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupExclusiveAdd": Subgroup(Collective(SubgroupOperation::Add, ExclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupExclusiveMul": Subgroup(Collective(SubgroupOperation::Mul, ExclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupExclusiveMin": Subgroup(Collective(SubgroupOperation::Min, ExclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupExclusiveMax": Subgroup(Collective(SubgroupOperation::Max, ExclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupExclusiveAnd": Subgroup(Collective(SubgroupOperation::And, ExclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupExclusiveOr": Subgroup(Collective(SubgroupOperation::Or, ExclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupExclusiveXor": Subgroup(Collective(SubgroupOperation::Xor, ExclusiveScan)) => [value(value)] {
        requires: &[KhrShaderSubgroupArithmetic],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupClusteredAdd": Subgroup(Collective(SubgroupOperation::Add, Clustered)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupClustered],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupClusteredMul": Subgroup(Collective(SubgroupOperation::Mul, Clustered)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupClustered],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupClusteredMin": Subgroup(Collective(SubgroupOperation::Min, Clustered)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupClustered],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupClusteredMax": Subgroup(Collective(SubgroupOperation::Max, Clustered)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupClustered],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupClusteredAnd": Subgroup(Collective(SubgroupOperation::And, Clustered)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupClustered],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupClusteredOr": Subgroup(Collective(SubgroupOperation::Or, Clustered)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupClustered],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupClusteredXor": Subgroup(Collective(SubgroupOperation::Xor, Clustered)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupClustered],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupQuadBroadcast": Subgroup(Gather(QuadBroadcast)) => [value(value, uint)] {
        requires: &[KhrShaderSubgroupQuad],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupQuadSwapHorizontal": Subgroup(Gather(QuadSwap(Horizontal))) => [value(value)] {
        requires: &[KhrShaderSubgroupQuad],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupQuadSwapVertical": Subgroup(Gather(QuadSwap(Vertical))) => [value(value)] {
        requires: &[KhrShaderSubgroupQuad],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupQuadSwapDiagonal": Subgroup(Gather(QuadSwap(Diagonal))) => [value(value)] {
        requires: &[KhrShaderSubgroupQuad],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupPartitionNV": Subgroup(Function(Partition)) => [uvec4(value)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_BOOL_INTEGERS,
    }
    "subgroupPartitionedAddNV": Subgroup(Collective(SubgroupOperation::Add, PartitionedReduce)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedMulNV": Subgroup(Collective(SubgroupOperation::Mul, PartitionedReduce)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedMinNV": Subgroup(Collective(SubgroupOperation::Min, PartitionedReduce)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedMaxNV": Subgroup(Collective(SubgroupOperation::Max, PartitionedReduce)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedAndNV": Subgroup(Collective(SubgroupOperation::And, PartitionedReduce)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupPartitionedOrNV": Subgroup(Collective(SubgroupOperation::Or, PartitionedReduce)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupPartitionedXorNV": Subgroup(Collective(SubgroupOperation::Xor, PartitionedReduce)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupPartitionedInclusiveAddNV": Subgroup(Collective(SubgroupOperation::Add, PartitionedInclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedInclusiveMulNV": Subgroup(Collective(SubgroupOperation::Mul, PartitionedInclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedInclusiveMinNV": Subgroup(Collective(SubgroupOperation::Min, PartitionedInclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedInclusiveMaxNV": Subgroup(Collective(SubgroupOperation::Max, PartitionedInclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedInclusiveAndNV": Subgroup(Collective(SubgroupOperation::And, PartitionedInclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupPartitionedInclusiveOrNV": Subgroup(Collective(SubgroupOperation::Or, PartitionedInclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupPartitionedInclusiveXorNV": Subgroup(Collective(SubgroupOperation::Xor, PartitionedInclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupPartitionedExclusiveAddNV": Subgroup(Collective(SubgroupOperation::Add, PartitionedExclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedExclusiveMulNV": Subgroup(Collective(SubgroupOperation::Mul, PartitionedExclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedExclusiveMinNV": Subgroup(Collective(SubgroupOperation::Min, PartitionedExclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedExclusiveMaxNV": Subgroup(Collective(SubgroupOperation::Max, PartitionedExclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: FLOATS_INTEGERS,
    }
    "subgroupPartitionedExclusiveAndNV": Subgroup(Collective(SubgroupOperation::And, PartitionedExclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupPartitionedExclusiveOrNV": Subgroup(Collective(SubgroupOperation::Or, PartitionedExclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "subgroupPartitionedExclusiveXorNV": Subgroup(Collective(SubgroupOperation::Xor, PartitionedExclusiveScan)) => [value(value, uvec4)] {
        requires: &[NvShaderSubgroupPartitioned],
        flags: flags!(SUBGROUP_OPERATION),
        values: BOOL_INTEGERS,
    }
    "ballotARB": Subgroup(Function(ArbBallot)) => [uint64_t(bool)] {
        requires: &[ArbShaderBallot],
    }
    "readInvocationARB": Subgroup(Function(ReadInvocation)) => [value(value, uint)] {
        requires: &[ArbShaderBallot],
        values: BASIC,
    }
    "readFirstInvocationARB": Subgroup(Function(ReadFirstInvocation)) => [value(value)] {
        requires: &[ArbShaderBallot],
        values: BASIC,
    }
    "anyInvocationARB": Subgroup(Function(AnyInvocation)) => [bool(bool)] {
        requires: &[ArbShaderGroupVote],
    }
    "allInvocationsARB": Subgroup(Function(AllInvocations)) => [bool(bool)] {
        requires: &[ArbShaderGroupVote],
    }
    "allInvocationsEqualARB": Subgroup(Function(AllInvocationsEqual)) => [bool(bool)] {
        requires: &[ArbShaderGroupVote],
    }
    "anyInvocation": Subgroup(Function(AnyInvocation)) => [bool(bool)] {
        since: 460,
    }
    "allInvocations": Subgroup(Function(AllInvocations)) => [bool(bool)] {
        since: 460,
    }
    "allInvocationsEqual": Subgroup(Function(AllInvocationsEqual)) => [bool(bool)] {
        since: 460,
    }
    "minInvocationsAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Min,
        collective: Reduce,
        non_uniform: false,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "maxInvocationsAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Max,
        collective: Reduce,
        non_uniform: false,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "addInvocationsAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Add,
        collective: Reduce,
        non_uniform: false,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "minInvocationsNonUniformAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Min,
        collective: Reduce,
        non_uniform: true,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "maxInvocationsNonUniformAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Max,
        collective: Reduce,
        non_uniform: true,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "addInvocationsNonUniformAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Add,
        collective: Reduce,
        non_uniform: true,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "minInvocationsInclusiveScanAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Min,
        collective: InclusiveScan,
        non_uniform: false,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "maxInvocationsInclusiveScanAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Max,
        collective: InclusiveScan,
        non_uniform: false,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "addInvocationsInclusiveScanAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Add,
        collective: InclusiveScan,
        non_uniform: false,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "minInvocationsInclusiveScanNonUniformAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Min,
        collective: InclusiveScan,
        non_uniform: true,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "maxInvocationsInclusiveScanNonUniformAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Max,
        collective: InclusiveScan,
        non_uniform: true,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "addInvocationsInclusiveScanNonUniformAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Add,
        collective: InclusiveScan,
        non_uniform: true,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "minInvocationsExclusiveScanAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Min,
        collective: ExclusiveScan,
        non_uniform: false,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "maxInvocationsExclusiveScanAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Max,
        collective: ExclusiveScan,
        non_uniform: false,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "addInvocationsExclusiveScanAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Add,
        collective: ExclusiveScan,
        non_uniform: false,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "minInvocationsExclusiveScanNonUniformAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Min,
        collective: ExclusiveScan,
        non_uniform: true,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "maxInvocationsExclusiveScanNonUniformAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Max,
        collective: ExclusiveScan,
        non_uniform: true,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "addInvocationsExclusiveScanNonUniformAMD": Subgroup(Function(AmdGroup {
        operation: SubgroupOperation::Add,
        collective: ExclusiveScan,
        non_uniform: true,
    })) => [value(value)] {
        requires: &[AmdShaderBallot],
        values: AMD,
    }
    "swizzleInvocationsAMD": Subgroup(Function(Amd(Swizzle))) => [value(value, uvec4)] {
        requires: &[AmdShaderBallot],
        values: BASIC,
    }
    "swizzleInvocationsMaskedAMD": Subgroup(Function(Amd(SwizzleMasked))) => [value(value, uvec3)] {
        requires: &[AmdShaderBallot],
        values: BASIC,
    }
    "writeInvocationAMD": Subgroup(Function(Amd(WriteInvocation))) => [value(value, value, uint)] {
        requires: &[AmdShaderBallot],
        values: BASIC,
    }
    "ballotAMD": Subgroup(Function(ArbBallot)) => [uint64_t(bool)] {
        requires: &[AmdGcnShader],
    }
    "mbcntAMD": Subgroup(Function(Amd(Mbcnt))) => [uint(uint64_t)] {
        requires: &[AmdShaderBallot],
    }

};
