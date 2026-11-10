use alloc::format;

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType};

use super::function::FunctionLowerer;
use super::{internal, unsupported, Result};
use crate::{
    CollectiveOperation, Direction, Expression, GatherMode, Handle, MemoryScope, MemorySemantics,
    Scalar, Span, Statement, SubgroupFunction, SubgroupOperation, TypeInner, VectorSize,
};

const ALL_MEMORY: MemorySemantics = MemorySemantics::UNIFORM_MEMORY
    .union(MemorySemantics::WORKGROUP_MEMORY)
    .union(MemorySemantics::ATOMIC_COUNTER_MEMORY)
    .union(MemorySemantics::IMAGE_MEMORY);

enum Lowered {
    Barrier {
        execution: bool,
        semantics: MemorySemantics,
    },
    Ballot,
    Collective(SubgroupOperation, Collective),
    Gather(Gather),
    Function(Function),
}

#[derive(Clone, Copy)]
enum Collective {
    Reduce,
    InclusiveScan,
    ExclusiveScan,
    Clustered,
    PartitionedReduce,
    PartitionedInclusiveScan,
    PartitionedExclusiveScan,
}

#[derive(Clone, Copy)]
enum Gather {
    BroadcastFirst,
    Broadcast,
    Shuffle,
    ShuffleXor,
    ShuffleUp,
    ShuffleDown,
    QuadBroadcast,
    QuadSwap(Direction),
    Rotate,
    ClusteredRotate,
}

#[derive(Clone, Copy)]
enum Function {
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
    KhrBallot,
    KhrReadInvocation,
    KhrReadFirstInvocation,
    KhrAll,
    KhrAny,
    KhrAllEqual,
    Group(SubgroupOperation, Collective, bool),
}

fn operation(word: &str) -> Option<SubgroupOperation> {
    Some(match word {
        "Add" => SubgroupOperation::Add,
        "Mul" => SubgroupOperation::Mul,
        "Min" => SubgroupOperation::Min,
        "Max" => SubgroupOperation::Max,
        "And" => SubgroupOperation::And,
        "Or" => SubgroupOperation::Or,
        "Xor" => SubgroupOperation::Xor,
        _ => return None,
    })
}

fn collective(name: &str) -> Option<(SubgroupOperation, Collective)> {
    let suffix = name.strip_prefix("subgroup")?;
    if let Some(rest) = suffix
        .strip_prefix("Partitioned")
        .and_then(|rest| rest.strip_suffix("NV"))
    {
        return Some(if let Some(word) = rest.strip_prefix("Inclusive") {
            (operation(word)?, Collective::PartitionedInclusiveScan)
        } else if let Some(word) = rest.strip_prefix("Exclusive") {
            (operation(word)?, Collective::PartitionedExclusiveScan)
        } else {
            (operation(rest)?, Collective::PartitionedReduce)
        });
    }
    Some(if let Some(word) = suffix.strip_prefix("Inclusive") {
        (operation(word)?, Collective::InclusiveScan)
    } else if let Some(word) = suffix.strip_prefix("Exclusive") {
        (operation(word)?, Collective::ExclusiveScan)
    } else if let Some(word) = suffix.strip_prefix("Clustered") {
        (operation(word)?, Collective::Clustered)
    } else {
        (operation(suffix)?, Collective::Reduce)
    })
}

fn classify(name: &str) -> Option<Lowered> {
    let barrier = |execution, semantics| Lowered::Barrier {
        execution,
        semantics: semantics | MemorySemantics::ACQUIRE_RELEASE,
    };
    Some(match name {
        "subgroupBarrier" => barrier(true, ALL_MEMORY),
        "subgroupMemoryBarrier" => barrier(false, ALL_MEMORY),
        "subgroupMemoryBarrierBuffer" => barrier(false, MemorySemantics::UNIFORM_MEMORY),
        "subgroupMemoryBarrierImage" => barrier(false, MemorySemantics::IMAGE_MEMORY),
        "subgroupMemoryBarrierShared" => barrier(false, MemorySemantics::WORKGROUP_MEMORY),
        "subgroupElect" => Lowered::Function(Function::Elect),
        "subgroupAll" => Lowered::Collective(SubgroupOperation::All, Collective::Reduce),
        "subgroupAny" => Lowered::Collective(SubgroupOperation::Any, Collective::Reduce),
        "subgroupAllEqual" => Lowered::Function(Function::AllEqual),
        "subgroupQuadAll" => Lowered::Function(Function::QuadAll),
        "subgroupQuadAny" => Lowered::Function(Function::QuadAny),
        "subgroupBallot" => Lowered::Ballot,
        "subgroupInverseBallot" => Lowered::Function(Function::InverseBallot),
        "subgroupBallotBitExtract" => Lowered::Function(Function::BallotBitExtract),
        "subgroupBallotBitCount" => Lowered::Function(Function::BallotBitCount(Collective::Reduce)),
        "subgroupBallotInclusiveBitCount" => {
            Lowered::Function(Function::BallotBitCount(Collective::InclusiveScan))
        }
        "subgroupBallotExclusiveBitCount" => {
            Lowered::Function(Function::BallotBitCount(Collective::ExclusiveScan))
        }
        "subgroupBallotFindLSB" => Lowered::Function(Function::BallotFindLsb),
        "subgroupBallotFindMSB" => Lowered::Function(Function::BallotFindMsb),
        "subgroupBroadcast" => Lowered::Gather(Gather::Broadcast),
        "subgroupBroadcastFirst" => Lowered::Gather(Gather::BroadcastFirst),
        "subgroupShuffle" => Lowered::Gather(Gather::Shuffle),
        "subgroupShuffleXor" => Lowered::Gather(Gather::ShuffleXor),
        "subgroupShuffleUp" => Lowered::Gather(Gather::ShuffleUp),
        "subgroupShuffleDown" => Lowered::Gather(Gather::ShuffleDown),
        "subgroupRotate" => Lowered::Gather(Gather::Rotate),
        "subgroupClusteredRotate" => Lowered::Gather(Gather::ClusteredRotate),
        "subgroupQuadBroadcast" => Lowered::Gather(Gather::QuadBroadcast),
        "subgroupQuadSwapHorizontal" => Lowered::Gather(Gather::QuadSwap(Direction::X)),
        "subgroupQuadSwapVertical" => Lowered::Gather(Gather::QuadSwap(Direction::Y)),
        "subgroupQuadSwapDiagonal" => Lowered::Gather(Gather::QuadSwap(Direction::Diagonal)),
        "subgroupPartitionNV" => Lowered::Function(Function::Partition),
        "ballotARB" | "ballotAMD" => Lowered::Function(Function::KhrBallot),
        "readInvocationARB" => Lowered::Function(Function::KhrReadInvocation),
        "readFirstInvocationARB" => Lowered::Function(Function::KhrReadFirstInvocation),
        "anyInvocationARB" | "anyInvocation" => Lowered::Function(Function::KhrAny),
        "allInvocationsARB" | "allInvocations" => Lowered::Function(Function::KhrAll),
        "allInvocationsEqualARB" | "allInvocationsEqual" => {
            Lowered::Function(Function::KhrAllEqual)
        }
        _ => {
            if let Some(group) = amd_group(name) {
                return Some(Lowered::Function(group));
            }
            let (op, collective) = collective(name)?;
            Lowered::Collective(op, collective)
        }
    })
}

fn amd_group(name: &str) -> Option<Function> {
    let rest = name.strip_suffix("AMD")?;
    let (op, rest) = if let Some(rest) = rest.strip_prefix("minInvocations") {
        (SubgroupOperation::Min, rest)
    } else if let Some(rest) = rest.strip_prefix("maxInvocations") {
        (SubgroupOperation::Max, rest)
    } else {
        (SubgroupOperation::Add, rest.strip_prefix("addInvocations")?)
    };
    let (rest, non_uniform) = match rest.strip_suffix("NonUniform") {
        Some(rest) => (rest, true),
        None => (rest, false),
    };
    let collective = match rest {
        "" => Collective::Reduce,
        "InclusiveScan" => Collective::InclusiveScan,
        "ExclusiveScan" => Collective::ExclusiveScan,
        _ => return None,
    };
    Some(Function::Group(op, collective, non_uniform))
}

pub(super) fn is_subgroup_function(name: &str) -> bool {
    classify(name).is_some()
}

impl FunctionLowerer<'_, '_> {
    pub(super) fn ballot_to_u64(
        &mut self,
        ballot: Handle<Expression>,
        at: Span,
    ) -> Result<Handle<Expression>> {
        let low = self.add(
            Expression::Swizzle {
                size: VectorSize::Bi,
                vector: ballot,
                pattern: [
                    crate::SwizzleComponent::X,
                    crate::SwizzleComponent::Y,
                    crate::SwizzleComponent::X,
                    crate::SwizzleComponent::X,
                ],
            },
            at,
        )?;
        self.pack_bits(
            low,
            &GlslType::vector(GlslScalar::Uint, 2),
            &GlslType::scalar(GlslScalar::Uint64),
            at,
        )
    }

    fn collective_operation(
        &mut self,
        collective: Collective,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<CollectiveOperation> {
        let second = || arguments.get(1).ok_or_else(|| internal(at));
        Ok(match collective {
            Collective::Reduce => CollectiveOperation::Reduce,
            Collective::InclusiveScan => CollectiveOperation::InclusiveScan,
            Collective::ExclusiveScan => CollectiveOperation::ExclusiveScan,
            Collective::Clustered => {
                let size = self.constant_index(second()?).ok_or_else(|| internal(at))?;
                CollectiveOperation::ClusteredReduce(size)
            }
            Collective::PartitionedReduce => {
                CollectiveOperation::PartitionedReduce(self.rvalue(second()?)?)
            }
            Collective::PartitionedInclusiveScan => {
                CollectiveOperation::PartitionedInclusiveScan(self.rvalue(second()?)?)
            }
            Collective::PartitionedExclusiveScan => {
                CollectiveOperation::PartitionedExclusiveScan(self.rvalue(second()?)?)
            }
        })
    }

    fn subgroup_result_type(&mut self, inner: TypeInner) -> Expression {
        Expression::SubgroupOperationResult {
            ty: self.lw.insert_type(inner),
        }
    }

    pub(super) fn subgroup(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let lowered = classify(name)
            .ok_or_else(|| unsupported(format!("the built-in function `{name}`"), at))?;
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        match lowered {
            Lowered::Barrier {
                execution,
                semantics,
            } => {
                self.push(
                    Statement::ScopedBarrier {
                        execution: execution.then_some(MemoryScope::Subgroup),
                        memory: MemoryScope::Subgroup,
                        semantics,
                    },
                    at,
                );
                Ok(None)
            }
            Lowered::Ballot => {
                let predicate = self.rvalue(argument(0)?)?;
                let result = self.push_with_result(
                    Expression::SubgroupBallotResult,
                    |result| Statement::SubgroupBallot {
                        result,
                        predicate: Some(predicate),
                    },
                    at,
                );
                Ok(Some(result))
            }
            Lowered::Collective(op, collective) => {
                let (value, ty) = self.typed(argument(0)?)?;
                let collective_op = self.collective_operation(collective, arguments, at)?;
                let ty = self.lw.ir_type(&ty, at)?;
                let result = self.push_with_result(
                    Expression::SubgroupOperationResult { ty },
                    |result| Statement::SubgroupCollectiveOperation {
                        op,
                        collective_op,
                        argument: value,
                        result,
                    },
                    at,
                );
                Ok(Some(result))
            }
            Lowered::Gather(gather) => {
                let (value, ty) = self.typed(argument(0)?)?;
                let mode = match gather {
                    Gather::BroadcastFirst => GatherMode::BroadcastFirst,
                    Gather::QuadSwap(direction) => GatherMode::QuadSwap(direction),
                    Gather::Broadcast => GatherMode::Broadcast(self.rvalue(argument(1)?)?),
                    Gather::Shuffle => GatherMode::Shuffle(self.rvalue(argument(1)?)?),
                    Gather::ShuffleXor => GatherMode::ShuffleXor(self.rvalue(argument(1)?)?),
                    Gather::ShuffleUp => GatherMode::ShuffleUp(self.rvalue(argument(1)?)?),
                    Gather::ShuffleDown => GatherMode::ShuffleDown(self.rvalue(argument(1)?)?),
                    Gather::QuadBroadcast => GatherMode::QuadBroadcast(self.rvalue(argument(1)?)?),
                    Gather::Rotate => GatherMode::Rotate {
                        delta: self.rvalue(argument(1)?)?,
                        cluster_size: None,
                    },
                    Gather::ClusteredRotate => {
                        let delta = self.rvalue(argument(1)?)?;
                        let size = self.constant_index(argument(2)?).ok_or_else(|| {
                            unsupported("a cluster size that is not a constant expression", at)
                        })?;
                        GatherMode::Rotate {
                            delta,
                            cluster_size: Some(size),
                        }
                    }
                };
                let ty = self.lw.ir_type(&ty, at)?;
                let result = self.push_with_result(
                    Expression::SubgroupOperationResult { ty },
                    |result| Statement::SubgroupGather {
                        mode,
                        argument: value,
                        result,
                    },
                    at,
                );
                Ok(Some(result))
            }
            Lowered::Function(function) => self.subgroup_function(function, arguments, at),
        }
    }

    fn subgroup_function(
        &mut self,
        function: Function,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        let boolean = TypeInner::Scalar(Scalar::BOOL);
        let unsigned = TypeInner::Scalar(Scalar::U32);
        let ballot = TypeInner::Vector {
            size: VectorSize::Quad,
            scalar: Scalar::U32,
        };
        let (fun, inner) = match function {
            Function::Elect => (SubgroupFunction::Elect, boolean),
            Function::AllEqual => (
                SubgroupFunction::AllEqual(self.rvalue(argument(0)?)?),
                boolean,
            ),
            Function::QuadAll => (
                SubgroupFunction::QuadAll(self.rvalue(argument(0)?)?),
                boolean,
            ),
            Function::QuadAny => (
                SubgroupFunction::QuadAny(self.rvalue(argument(0)?)?),
                boolean,
            ),
            Function::InverseBallot => (
                SubgroupFunction::InverseBallot(self.rvalue(argument(0)?)?),
                boolean,
            ),
            Function::BallotBitExtract => (
                SubgroupFunction::BallotBitExtract {
                    ballot: self.rvalue(argument(0)?)?,
                    index: self.rvalue(argument(1)?)?,
                },
                boolean,
            ),
            Function::BallotBitCount(collective) => (
                SubgroupFunction::BallotBitCount {
                    ballot: self.rvalue(argument(0)?)?,
                    collective_op: self.collective_operation(collective, arguments, at)?,
                },
                unsigned,
            ),
            Function::BallotFindLsb => (
                SubgroupFunction::BallotFindLsb(self.rvalue(argument(0)?)?),
                unsigned,
            ),
            Function::BallotFindMsb => (
                SubgroupFunction::BallotFindMsb(self.rvalue(argument(0)?)?),
                unsigned,
            ),
            Function::Partition => (
                SubgroupFunction::Partition(self.rvalue(argument(0)?)?),
                ballot,
            ),
            Function::KhrBallot => {
                let predicate = self.rvalue(argument(0)?)?;
                let result = self.subgroup_result_type(ballot);
                let mask = self.push_with_result(
                    result,
                    |result| Statement::SubgroupFunction {
                        fun: SubgroupFunction::KhrBallot(predicate),
                        result,
                    },
                    at,
                );
                return self.ballot_to_u64(mask, at).map(Some);
            }
            Function::KhrReadInvocation => {
                let (value, ty) = self.typed(argument(0)?)?;
                let index = self.rvalue(argument(1)?)?;
                let ty = self.lw.ir_type(&ty, at)?;
                let result = self.push_with_result(
                    Expression::SubgroupOperationResult { ty },
                    |result| Statement::SubgroupFunction {
                        fun: SubgroupFunction::KhrReadInvocation {
                            argument: value,
                            index,
                        },
                        result,
                    },
                    at,
                );
                return Ok(Some(result));
            }
            Function::KhrReadFirstInvocation => {
                let (value, ty) = self.typed(argument(0)?)?;
                let ty = self.lw.ir_type(&ty, at)?;
                let result = self.push_with_result(
                    Expression::SubgroupOperationResult { ty },
                    |result| Statement::SubgroupFunction {
                        fun: SubgroupFunction::KhrReadFirstInvocation(value),
                        result,
                    },
                    at,
                );
                return Ok(Some(result));
            }
            Function::Group(op, collective, non_uniform) => {
                let (value, ty) = self.typed(argument(0)?)?;
                let collective_op = self.collective_operation(collective, arguments, at)?;
                let ty = self.lw.ir_type(&ty, at)?;
                let result = self.push_with_result(
                    Expression::SubgroupOperationResult { ty },
                    |result| Statement::SubgroupFunction {
                        fun: SubgroupFunction::Group {
                            op,
                            collective_op,
                            argument: value,
                            non_uniform,
                        },
                        result,
                    },
                    at,
                );
                return Ok(Some(result));
            }
            Function::KhrAll => (
                SubgroupFunction::KhrAll(self.rvalue(argument(0)?)?),
                boolean,
            ),
            Function::KhrAny => (
                SubgroupFunction::KhrAny(self.rvalue(argument(0)?)?),
                boolean,
            ),
            Function::KhrAllEqual => (
                SubgroupFunction::KhrAllEqual(self.rvalue(argument(0)?)?),
                boolean,
            ),
        };
        let result = self.subgroup_result_type(inner);
        let result = self.push_with_result(
            result,
            |result| Statement::SubgroupFunction { fun, result },
            at,
        );
        Ok(Some(result))
    }
}
