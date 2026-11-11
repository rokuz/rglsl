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

    fn subgroup_result_type(&mut self, inner: TypeInner) -> Expression {
        Expression::SubgroupOperationResult {
            ty: self.lw.insert_type(inner),
        }
    }
}

#[allow(clippy::await_holding_refcell_ref)]
impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    async fn collective_operation(
        self,
        collective: Collective,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<CollectiveOperation> {
        let this = self.lowerer();
        let second = || arguments.get(1).ok_or_else(|| internal(at));
        Ok(match collective {
            Collective::Reduce => CollectiveOperation::Reduce,
            Collective::InclusiveScan => CollectiveOperation::InclusiveScan,
            Collective::ExclusiveScan => CollectiveOperation::ExclusiveScan,
            Collective::Clustered => {
                let size = this.constant_index(second()?).ok_or_else(|| internal(at))?;
                CollectiveOperation::ClusteredReduce(size)
            }
            Collective::PartitionedReduce => CollectiveOperation::PartitionedReduce({
                let frame = self.clone().rvalue(second()?);
                drop(this);
                let result = self.nest(frame).await;
                result
            }?),
            Collective::PartitionedInclusiveScan => {
                CollectiveOperation::PartitionedInclusiveScan({
                    let frame = self.clone().rvalue(second()?);
                    drop(this);
                    let result = self.nest(frame).await;
                    result
                }?)
            }
            Collective::PartitionedExclusiveScan => {
                CollectiveOperation::PartitionedExclusiveScan({
                    let frame = self.clone().rvalue(second()?);
                    drop(this);
                    let result = self.nest(frame).await;
                    result
                }?)
            }
        })
    }

    pub(super) async fn subgroup(
        self,
        name: &'b str,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let mut this = self.lowerer();
        let lowered = classify(name)
            .ok_or_else(|| unsupported(format!("the built-in function `{name}`"), at))?;
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        match lowered {
            Lowered::Barrier {
                execution,
                semantics,
            } => {
                this.push(
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
                let predicate = {
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let result = this.push_with_result(
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
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let collective_op = {
                    let frame = self.clone().collective_operation(collective, arguments, at);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let ty = this.lw.ir_type(&ty, at)?;
                let result = this.push_with_result(
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
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let mode = match gather {
                    Gather::BroadcastFirst => GatherMode::BroadcastFirst,
                    Gather::QuadSwap(direction) => GatherMode::QuadSwap(direction),
                    Gather::Broadcast => GatherMode::Broadcast({
                        let frame = self.clone().rvalue(argument(1)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?),
                    Gather::Shuffle => GatherMode::Shuffle({
                        let frame = self.clone().rvalue(argument(1)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?),
                    Gather::ShuffleXor => GatherMode::ShuffleXor({
                        let frame = self.clone().rvalue(argument(1)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?),
                    Gather::ShuffleUp => GatherMode::ShuffleUp({
                        let frame = self.clone().rvalue(argument(1)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?),
                    Gather::ShuffleDown => GatherMode::ShuffleDown({
                        let frame = self.clone().rvalue(argument(1)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?),
                    Gather::QuadBroadcast => GatherMode::QuadBroadcast({
                        let frame = self.clone().rvalue(argument(1)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?),
                    Gather::Rotate => GatherMode::Rotate {
                        delta: {
                            let frame = self.clone().rvalue(argument(1)?);
                            drop(this);
                            let result = self.nest(frame).await;
                            this = self.lowerer();
                            result
                        }?,
                        cluster_size: None,
                    },
                    Gather::ClusteredRotate => {
                        let delta = {
                            let frame = self.clone().rvalue(argument(1)?);
                            drop(this);
                            let result = self.nest(frame).await;
                            this = self.lowerer();
                            result
                        }?;
                        let size = this.constant_index(argument(2)?).ok_or_else(|| {
                            unsupported("a cluster size that is not a constant expression", at)
                        })?;
                        GatherMode::Rotate {
                            delta,
                            cluster_size: Some(size),
                        }
                    }
                };
                let ty = this.lw.ir_type(&ty, at)?;
                let result = this.push_with_result(
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
            Lowered::Function(function) => {
                let frame = self.clone().subgroup_function(function, arguments, at);
                drop(this);
                let result = self.nest(frame).await;
                result
            }
        }
    }

    async fn subgroup_function(
        self,
        function: Function,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let mut this = self.lowerer();
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
                SubgroupFunction::AllEqual({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                boolean,
            ),
            Function::QuadAll => (
                SubgroupFunction::QuadAll({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                boolean,
            ),
            Function::QuadAny => (
                SubgroupFunction::QuadAny({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                boolean,
            ),
            Function::InverseBallot => (
                SubgroupFunction::InverseBallot({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                boolean,
            ),
            Function::BallotBitExtract => (
                SubgroupFunction::BallotBitExtract {
                    ballot: {
                        let frame = self.clone().rvalue(argument(0)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?,
                    index: {
                        let frame = self.clone().rvalue(argument(1)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?,
                },
                boolean,
            ),
            Function::BallotBitCount(collective) => (
                SubgroupFunction::BallotBitCount {
                    ballot: {
                        let frame = self.clone().rvalue(argument(0)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?,
                    collective_op: {
                        let frame = self.clone().collective_operation(collective, arguments, at);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?,
                },
                unsigned,
            ),
            Function::BallotFindLsb => (
                SubgroupFunction::BallotFindLsb({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                unsigned,
            ),
            Function::BallotFindMsb => (
                SubgroupFunction::BallotFindMsb({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                unsigned,
            ),
            Function::Partition => (
                SubgroupFunction::Partition({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                ballot,
            ),
            Function::KhrBallot => {
                let predicate = {
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let result = this.subgroup_result_type(ballot);
                let mask = this.push_with_result(
                    result,
                    |result| Statement::SubgroupFunction {
                        fun: SubgroupFunction::KhrBallot(predicate),
                        result,
                    },
                    at,
                );
                return this.ballot_to_u64(mask, at).map(Some);
            }
            Function::KhrReadInvocation => {
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let index = {
                    let frame = self.clone().rvalue(argument(1)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let ty = this.lw.ir_type(&ty, at)?;
                let result = this.push_with_result(
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
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let ty = this.lw.ir_type(&ty, at)?;
                let result = this.push_with_result(
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
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let collective_op = {
                    let frame = self.clone().collective_operation(collective, arguments, at);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let ty = this.lw.ir_type(&ty, at)?;
                let result = this.push_with_result(
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
                SubgroupFunction::KhrAll({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                boolean,
            ),
            Function::KhrAny => (
                SubgroupFunction::KhrAny({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                boolean,
            ),
            Function::KhrAllEqual => (
                SubgroupFunction::KhrAllEqual({
                    let frame = self.clone().rvalue(argument(0)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?),
                boolean,
            ),
        };
        let result = this.subgroup_result_type(inner);
        let result = this.push_with_result(
            result,
            |result| Statement::SubgroupFunction { fun, result },
            at,
        );
        Ok(Some(result))
    }
}
