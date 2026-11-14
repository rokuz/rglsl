use alloc::string::String;
use alloc::vec::Vec;

use rglsl_types::extension::Extension;

use super::{ALL_STAGES, COMPUTE, MESH, Prototype, TASK};
use crate::scope::Direction;
use crate::types::{Scalar, Type};

const UVEC4: Type = Type::vector(Scalar::Uint, 4);

const GENERIC: &[&str] = &[
    "AllEqual",
    "Broadcast",
    "BroadcastFirst",
    "Shuffle",
    "ShuffleXor",
    "ShuffleUp",
    "ShuffleDown",
    "Rotate",
    "ClusteredRotate",
    "Add",
    "Mul",
    "Min",
    "Max",
    "And",
    "Or",
    "Xor",
    "InclusiveAdd",
    "InclusiveMul",
    "InclusiveMin",
    "InclusiveMax",
    "InclusiveAnd",
    "InclusiveOr",
    "InclusiveXor",
    "ExclusiveAdd",
    "ExclusiveMul",
    "ExclusiveMin",
    "ExclusiveMax",
    "ExclusiveAnd",
    "ExclusiveOr",
    "ExclusiveXor",
    "ClusteredAdd",
    "ClusteredMul",
    "ClusteredMin",
    "ClusteredMax",
    "ClusteredAnd",
    "ClusteredOr",
    "ClusteredXor",
    "QuadBroadcast",
    "QuadSwapHorizontal",
    "QuadSwapVertical",
    "QuadSwapDiagonal",
    "PartitionNV",
    "PartitionedAddNV",
    "PartitionedMulNV",
    "PartitionedMinNV",
    "PartitionedMaxNV",
    "PartitionedAndNV",
    "PartitionedOrNV",
    "PartitionedXorNV",
    "PartitionedInclusiveAddNV",
    "PartitionedInclusiveMulNV",
    "PartitionedInclusiveMinNV",
    "PartitionedInclusiveMaxNV",
    "PartitionedInclusiveAndNV",
    "PartitionedInclusiveOrNV",
    "PartitionedInclusiveXorNV",
    "PartitionedExclusiveAddNV",
    "PartitionedExclusiveMulNV",
    "PartitionedExclusiveMinNV",
    "PartitionedExclusiveMaxNV",
    "PartitionedExclusiveAndNV",
    "PartitionedExclusiveOrNV",
    "PartitionedExclusiveXorNV",
];

const FLOATS: [Scalar; 3] = [Scalar::Float, Scalar::Float16, Scalar::Double];
const INTEGERS: [Scalar; 8] = [
    Scalar::Int8,
    Scalar::Int16,
    Scalar::Int,
    Scalar::Int64,
    Scalar::Uint8,
    Scalar::Uint16,
    Scalar::Uint,
    Scalar::Uint64,
];
const AMD_SCALARS: [Scalar; 8] = [
    Scalar::Float,
    Scalar::Int,
    Scalar::Uint,
    Scalar::Double,
    Scalar::Int64,
    Scalar::Uint64,
    Scalar::Float16,
    Scalar::Int16,
];

const AMD_REDUCTIONS: &[&str] = &[
    "minInvocations",
    "maxInvocations",
    "addInvocations",
    "minInvocationsNonUniform",
    "maxInvocationsNonUniform",
    "addInvocationsNonUniform",
    "minInvocationsInclusiveScan",
    "maxInvocationsInclusiveScan",
    "addInvocationsInclusiveScan",
    "minInvocationsInclusiveScanNonUniform",
    "maxInvocationsInclusiveScanNonUniform",
    "addInvocationsInclusiveScanNonUniform",
    "minInvocationsExclusiveScan",
    "maxInvocationsExclusiveScan",
    "addInvocationsExclusiveScan",
    "minInvocationsExclusiveScanNonUniform",
    "maxInvocationsExclusiveScanNonUniform",
    "addInvocationsExclusiveScanNonUniform",
];

const fn shaped(scalar: Scalar, size: u8) -> Type {
    if size == 1 {
        Type::scalar(scalar)
    } else {
        Type::vector(scalar, size)
    }
}

struct Emitter {
    prototypes: Vec<Prototype>,
}

impl Emitter {
    fn add(&mut self, name: &str, result: Type, parameters: &[Type], stages: u16) {
        self.prototypes.push(Prototype {
            name: String::from(name),
            result,
            parameters: parameters
                .iter()
                .map(|ty| (ty.clone(), Direction::In))
                .collect(),
            stages,
        });
    }

    fn generic(&mut self, suffix: &str, value: Type) {
        let mut name = String::from("subgroup");
        name.push_str(suffix);
        let result = match suffix {
            "AllEqual" => Type::BOOL,
            "PartitionNV" => UVEC4,
            _ => value.clone(),
        };
        let parameters: Vec<Type> = match suffix {
            "Broadcast" | "Shuffle" | "ShuffleXor" | "ShuffleUp" | "ShuffleDown" | "Rotate"
            | "QuadBroadcast" => alloc::vec![value, Type::UINT],
            "ClusteredRotate" => alloc::vec![value, Type::UINT, Type::UINT],
            _ if suffix.starts_with("Clustered") => alloc::vec![value, Type::UINT],
            _ if suffix.starts_with("Partitioned") => alloc::vec![value, UVEC4],
            _ => alloc::vec![value],
        };
        self.add(&name, result, &parameters, ALL_STAGES);
    }
}

fn logical(suffix: &str) -> bool {
    suffix.contains("Or")
        || suffix.contains("And")
        || (suffix.contains("Xor") && !suffix.contains("ShuffleXor"))
}

fn math(suffix: &str) -> bool {
    ["Add", "Mul", "Min", "Max"]
        .iter()
        .any(|word| suffix.contains(word))
}

pub(super) fn prototypes(version: u32) -> Vec<Prototype> {
    let mut emitter = Emitter {
        prototypes: Vec::new(),
    };
    for name in [
        "subgroupBarrier",
        "subgroupMemoryBarrier",
        "subgroupMemoryBarrierBuffer",
        "subgroupMemoryBarrierImage",
    ] {
        emitter.add(name, Type::VOID, &[], ALL_STAGES);
    }
    emitter.add(
        "subgroupMemoryBarrierShared",
        Type::VOID,
        &[],
        COMPUTE | MESH | TASK,
    );
    emitter.add("subgroupElect", Type::BOOL, &[], ALL_STAGES);
    for name in [
        "subgroupAll",
        "subgroupAny",
        "subgroupQuadAll",
        "subgroupQuadAny",
    ] {
        emitter.add(name, Type::BOOL, &[Type::BOOL], ALL_STAGES);
    }
    emitter.add("subgroupBallot", UVEC4, &[Type::BOOL], ALL_STAGES);
    emitter.add("subgroupInverseBallot", Type::BOOL, &[UVEC4], ALL_STAGES);
    emitter.add(
        "subgroupBallotBitExtract",
        Type::BOOL,
        &[UVEC4, Type::UINT],
        ALL_STAGES,
    );
    for name in [
        "subgroupBallotBitCount",
        "subgroupBallotInclusiveBitCount",
        "subgroupBallotExclusiveBitCount",
        "subgroupBallotFindLSB",
        "subgroupBallotFindMSB",
    ] {
        emitter.add(name, Type::UINT, &[UVEC4], ALL_STAGES);
    }
    for suffix in GENERIC {
        let mut scalars: Vec<Scalar> = Vec::new();
        if !logical(suffix) {
            scalars.extend(FLOATS);
        }
        if !math(suffix) {
            scalars.push(Scalar::Bool);
        }
        scalars.extend(INTEGERS);
        for scalar in scalars {
            for size in 1..=4 {
                emitter.generic(suffix, shaped(scalar, size));
            }
        }
    }
    emitter.add(
        "ballotARB",
        Type::scalar(Scalar::Uint64),
        &[Type::BOOL],
        ALL_STAGES,
    );
    for scalar in [Scalar::Float, Scalar::Int, Scalar::Uint] {
        for size in 1..=4 {
            let value = shaped(scalar, size);
            emitter.add(
                "readInvocationARB",
                value.clone(),
                &[value.clone(), Type::UINT],
                ALL_STAGES,
            );
            emitter.add(
                "readFirstInvocationARB",
                value.clone(),
                &[value],
                ALL_STAGES,
            );
        }
    }
    for name in [
        "anyInvocationARB",
        "allInvocationsARB",
        "allInvocationsEqualARB",
    ] {
        emitter.add(name, Type::BOOL, &[Type::BOOL], ALL_STAGES);
    }
    if version >= 450 {
        amd(&mut emitter);
    }
    emitter.prototypes
}

fn amd(emitter: &mut Emitter) {
    for stem in AMD_REDUCTIONS {
        let mut name = String::from(*stem);
        name.push_str("AMD");
        for scalar in AMD_SCALARS
            .iter()
            .copied()
            .chain(core::iter::once(Scalar::Uint16))
        {
            for size in 1..=4 {
                let value = shaped(scalar, size);
                emitter.add(&name, value.clone(), &[value], ALL_STAGES);
            }
        }
    }
    for scalar in [Scalar::Float, Scalar::Int, Scalar::Uint] {
        for size in 1..=4 {
            let value = shaped(scalar, size);
            emitter.add(
                "swizzleInvocationsAMD",
                value.clone(),
                &[value.clone(), Type::vector(Scalar::Uint, 4)],
                ALL_STAGES,
            );
            emitter.add(
                "swizzleInvocationsMaskedAMD",
                value.clone(),
                &[value.clone(), Type::vector(Scalar::Uint, 3)],
                ALL_STAGES,
            );
            emitter.add(
                "writeInvocationAMD",
                value.clone(),
                &[value.clone(), value, Type::UINT],
                ALL_STAGES,
            );
        }
    }
    emitter.add(
        "ballotAMD",
        Type::scalar(Scalar::Uint64),
        &[Type::BOOL],
        ALL_STAGES,
    );
    emitter.add(
        "mbcntAMD",
        Type::UINT,
        &[Type::scalar(Scalar::Uint64)],
        ALL_STAGES,
    );
}

pub(crate) fn function_extension(name: &str) -> Option<Extension> {
    Some(match name {
        "subgroupBarrier"
        | "subgroupMemoryBarrier"
        | "subgroupMemoryBarrierBuffer"
        | "subgroupMemoryBarrierImage"
        | "subgroupMemoryBarrierShared"
        | "subgroupElect" => Extension::KhrShaderSubgroupBasic,
        "subgroupAll" | "subgroupAny" | "subgroupAllEqual" | "subgroupQuadAll"
        | "subgroupQuadAny" => Extension::KhrShaderSubgroupVote,
        "subgroupBroadcast"
        | "subgroupBroadcastFirst"
        | "subgroupBallot"
        | "subgroupInverseBallot"
        | "subgroupBallotBitExtract"
        | "subgroupBallotBitCount"
        | "subgroupBallotInclusiveBitCount"
        | "subgroupBallotExclusiveBitCount"
        | "subgroupBallotFindLSB"
        | "subgroupBallotFindMSB" => Extension::KhrShaderSubgroupBallot,
        "subgroupShuffle" | "subgroupShuffleXor" => Extension::KhrShaderSubgroupShuffle,
        "subgroupShuffleUp" | "subgroupShuffleDown" => Extension::KhrShaderSubgroupShuffleRelative,
        "subgroupRotate" | "subgroupClusteredRotate" => Extension::KhrShaderSubgroupRotate,
        "ballotARB" | "readInvocationARB" | "readFirstInvocationARB" => Extension::ArbShaderBallot,
        "anyInvocationARB" | "allInvocationsARB" | "allInvocationsEqualARB" => {
            Extension::ArbShaderGroupVote
        }
        _ => {
            let Some(suffix) = name.strip_prefix("subgroup") else {
                return amd_function(name);
            };
            if suffix.starts_with("Partition") {
                Extension::NvShaderSubgroupPartitioned
            } else if suffix.starts_with("Clustered") {
                Extension::KhrShaderSubgroupClustered
            } else if suffix.starts_with("Quad") {
                Extension::KhrShaderSubgroupQuad
            } else if GENERIC.contains(&suffix) && math_or_logical(suffix) {
                Extension::KhrShaderSubgroupArithmetic
            } else {
                return None;
            }
        }
    })
}

fn math_or_logical(suffix: &str) -> bool {
    math(suffix) || logical(suffix)
}

fn amd_function(name: &str) -> Option<Extension> {
    if name == "ballotAMD" {
        return Some(Extension::AmdGcnShader);
    }
    let stem = name.strip_suffix("AMD")?;
    (AMD_REDUCTIONS.contains(&stem)
        || matches!(stem, "swizzleInvocations" | "writeInvocation" | "mbcnt"))
    .then_some(Extension::AmdShaderBallot)
}

pub(crate) fn is_subgroup_operation(name: &str) -> bool {
    name.strip_prefix("subgroup").is_some_and(|suffix| {
        suffix
            .chars()
            .next()
            .is_some_and(|first| first.is_ascii_uppercase())
    }) && function_extension(name).is_some()
}

pub(crate) fn variable_extension(name: &str) -> Option<Extension> {
    Some(match name {
        "gl_SubgroupSize" | "gl_SubgroupInvocationID" | "gl_NumSubgroups" | "gl_SubgroupID" => {
            Extension::KhrShaderSubgroupBasic
        }
        "gl_SubgroupEqMask" | "gl_SubgroupGeMask" | "gl_SubgroupGtMask" | "gl_SubgroupLeMask"
        | "gl_SubgroupLtMask" => Extension::KhrShaderSubgroupBallot,
        "gl_SubGroupSizeARB"
        | "gl_SubGroupInvocationARB"
        | "gl_SubGroupEqMaskARB"
        | "gl_SubGroupGeMaskARB"
        | "gl_SubGroupGtMaskARB"
        | "gl_SubGroupLeMaskARB"
        | "gl_SubGroupLtMaskARB" => Extension::ArbShaderBallot,
        "gl_WarpsPerSMNV" | "gl_SMCountNV" | "gl_WarpIDNV" | "gl_SMIDNV" => {
            Extension::NvShaderSmBuiltins
        }
        "gl_CoreIDARM" | "gl_CoreCountARM" | "gl_CoreMaxIDARM" | "gl_WarpIDARM"
        | "gl_WarpMaxIDARM" => Extension::ArmShaderCoreBuiltins,
        _ => return None,
    })
}
