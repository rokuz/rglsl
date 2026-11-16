use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::builtins::kind::{
    AmdShaderBallot, Collective, Gather, QuadDirection, Subgroup, SubgroupFunction as Function,
    SubgroupMemory, SubgroupOperation as Operation,
};
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType};
use rglsl_types::stack::recurse;

use super::function::FunctionLowerer;
use super::{Result, internal, unsupported};
use crate::{
    CollectiveOperation, Direction, Expression, GatherMode, Handle, MemoryScope, MemorySemantics,
    Scalar, Span, Statement, SubgroupFunction, SubgroupOperation, TypeInner, VectorSize,
};

const ALL_MEMORY: MemorySemantics = MemorySemantics::UNIFORM_MEMORY
    .union(MemorySemantics::WORKGROUP_MEMORY)
    .union(MemorySemantics::ATOMIC_COUNTER_MEMORY)
    .union(MemorySemantics::IMAGE_MEMORY);

enum ResultType {
    Fixed(TypeInner),
    Argument(GlslType),
}

const fn operation(operation: Operation) -> SubgroupOperation {
    match operation {
        Operation::All => SubgroupOperation::All,
        Operation::Any => SubgroupOperation::Any,
        Operation::Add => SubgroupOperation::Add,
        Operation::Mul => SubgroupOperation::Mul,
        Operation::Min => SubgroupOperation::Min,
        Operation::Max => SubgroupOperation::Max,
        Operation::And => SubgroupOperation::And,
        Operation::Or => SubgroupOperation::Or,
        Operation::Xor => SubgroupOperation::Xor,
    }
}

const fn memory(memory: SubgroupMemory) -> MemorySemantics {
    match memory {
        SubgroupMemory::All => ALL_MEMORY,
        SubgroupMemory::Buffer => MemorySemantics::UNIFORM_MEMORY,
        SubgroupMemory::Image => MemorySemantics::IMAGE_MEMORY,
        SubgroupMemory::Shared => MemorySemantics::WORKGROUP_MEMORY,
    }
}

const fn direction(direction: QuadDirection) -> Direction {
    match direction {
        QuadDirection::Horizontal => Direction::X,
        QuadDirection::Vertical => Direction::Y,
        QuadDirection::Diagonal => Direction::Diagonal,
    }
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

    fn lane_pattern<const N: usize>(
        &self,
        expression: &AstExpression,
        at: Span,
    ) -> Result<[u32; N]> {
        self.constant_components(expression)
            .ok_or_else(|| unsupported("a lane pattern that is not a constant expression", at))
    }

    fn subgroup_result_type(&mut self, inner: TypeInner) -> Expression {
        Expression::SubgroupOperationResult {
            ty: self.lw.insert_type(inner),
        }
    }
}

impl FunctionLowerer<'_, '_> {
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
                let size = (Ok(self.constant_index(second()?).ok_or_else(|| internal(at))))??;
                CollectiveOperation::ClusteredReduce(size)
            }
            Collective::PartitionedReduce => {
                CollectiveOperation::PartitionedReduce(recurse(|| self.rvalue(second()?))?)
            }
            Collective::PartitionedInclusiveScan => {
                CollectiveOperation::PartitionedInclusiveScan(recurse(|| self.rvalue(second()?))?)
            }
            Collective::PartitionedExclusiveScan => {
                CollectiveOperation::PartitionedExclusiveScan(recurse(|| self.rvalue(second()?))?)
            }
        })
    }

    pub(super) fn subgroup(
        &mut self,
        kind: Subgroup,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        match kind {
            Subgroup::Barrier {
                execution,
                memory: used,
            } => {
                let semantics = memory(used) | MemorySemantics::ACQUIRE_RELEASE;
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
            Subgroup::Ballot => {
                let predicate = recurse(|| self.rvalue(argument(0)?))?;
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
            Subgroup::Collective(op, collective) => {
                let op = operation(op);
                let (value, ty) = recurse(|| self.typed(argument(0)?))?;
                let collective_op =
                    recurse(|| self.collective_operation(collective, arguments, at))?;
                let ty = self.ir_type(&ty, at)?;
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
            Subgroup::Gather(gather) => {
                let (value, ty) = recurse(|| self.typed(argument(0)?))?;
                let mode = match gather {
                    Gather::BroadcastFirst => GatherMode::BroadcastFirst,
                    Gather::QuadSwap(quad) => GatherMode::QuadSwap(direction(quad)),
                    Gather::Broadcast => {
                        GatherMode::Broadcast(recurse(|| self.rvalue(argument(1)?))?)
                    }
                    Gather::Shuffle => GatherMode::Shuffle(recurse(|| self.rvalue(argument(1)?))?),
                    Gather::ShuffleXor => {
                        GatherMode::ShuffleXor(recurse(|| self.rvalue(argument(1)?))?)
                    }
                    Gather::ShuffleUp => {
                        GatherMode::ShuffleUp(recurse(|| self.rvalue(argument(1)?))?)
                    }
                    Gather::ShuffleDown => {
                        GatherMode::ShuffleDown(recurse(|| self.rvalue(argument(1)?))?)
                    }
                    Gather::QuadBroadcast => {
                        GatherMode::QuadBroadcast(recurse(|| self.rvalue(argument(1)?))?)
                    }
                    Gather::Rotate => GatherMode::Rotate {
                        delta: { recurse(|| self.rvalue(argument(1)?)) }?,
                        cluster_size: None,
                    },
                    Gather::ClusteredRotate => {
                        let delta = recurse(|| self.rvalue(argument(1)?))?;
                        let size = (Ok(self.constant_index(argument(2)?).ok_or_else(|| {
                            unsupported("a cluster size that is not a constant expression", at)
                        })))??;
                        GatherMode::Rotate {
                            delta,
                            cluster_size: Some(size),
                        }
                    }
                };
                let ty = self.ir_type(&ty, at)?;
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
            Subgroup::Function(function) => {
                recurse(|| self.subgroup_function(function, arguments, at))
            }
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
        let (fun, result_type) = match function {
            Function::Elect => (SubgroupFunction::Elect, ResultType::Fixed(boolean)),
            Function::AllEqual => (
                SubgroupFunction::AllEqual(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(boolean),
            ),
            Function::QuadAll => (
                SubgroupFunction::QuadAll(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(boolean),
            ),
            Function::QuadAny => (
                SubgroupFunction::QuadAny(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(boolean),
            ),
            Function::InverseBallot => (
                SubgroupFunction::InverseBallot(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(boolean),
            ),
            Function::BallotBitExtract => (
                SubgroupFunction::BallotBitExtract {
                    ballot: { recurse(|| self.rvalue(argument(0)?)) }?,
                    index: { recurse(|| self.rvalue(argument(1)?)) }?,
                },
                ResultType::Fixed(boolean),
            ),
            Function::BallotBitCount(collective) => (
                SubgroupFunction::BallotBitCount {
                    ballot: { recurse(|| self.rvalue(argument(0)?)) }?,
                    collective_op: {
                        recurse(|| self.collective_operation(collective, arguments, at))
                    }?,
                },
                ResultType::Fixed(unsigned),
            ),
            Function::BallotFindLsb => (
                SubgroupFunction::BallotFindLsb(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(unsigned),
            ),
            Function::BallotFindMsb => (
                SubgroupFunction::BallotFindMsb(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(unsigned),
            ),
            Function::Partition => (
                SubgroupFunction::Partition(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(ballot),
            ),
            Function::ArbBallot => {
                let predicate = recurse(|| self.rvalue(argument(0)?))?;
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
            Function::ReadInvocation => {
                let (value, ty) = recurse(|| self.typed(argument(0)?))?;
                let index = recurse(|| self.rvalue(argument(1)?))?;
                (
                    SubgroupFunction::KhrReadInvocation {
                        argument: value,
                        index,
                    },
                    ResultType::Argument(ty),
                )
            }
            Function::ReadFirstInvocation => {
                let (value, ty) = recurse(|| self.typed(argument(0)?))?;
                (
                    SubgroupFunction::KhrReadFirstInvocation(value),
                    ResultType::Argument(ty),
                )
            }
            Function::AmdGroup {
                operation: op,
                collective,
                non_uniform,
            } => {
                let (value, ty) = recurse(|| self.typed(argument(0)?))?;
                let collective_op =
                    recurse(|| self.collective_operation(collective, arguments, at))?;
                (
                    SubgroupFunction::Group {
                        op: operation(op),
                        collective_op,
                        argument: value,
                        non_uniform,
                    },
                    ResultType::Argument(ty),
                )
            }
            Function::Amd(amd) => recurse(|| self.amd_shader_ballot(amd, arguments, at))?,
            Function::AllInvocations => (
                SubgroupFunction::KhrAll(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(boolean),
            ),
            Function::AnyInvocation => (
                SubgroupFunction::KhrAny(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(boolean),
            ),
            Function::AllInvocationsEqual => (
                SubgroupFunction::KhrAllEqual(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(boolean),
            ),
        };
        let ty = match result_type {
            ResultType::Fixed(inner) => self.lw.insert_type(inner),
            ResultType::Argument(ty) => self.ir_type(&ty, at)?,
        };
        let result = self.push_with_result(
            Expression::SubgroupOperationResult { ty },
            |result| Statement::SubgroupFunction { fun, result },
            at,
        );
        Ok(Some(result))
    }

    fn amd_shader_ballot(
        &mut self,
        function: AmdShaderBallot,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<(SubgroupFunction, ResultType)> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        Ok(match function {
            AmdShaderBallot::Swizzle => {
                let (value, ty) = recurse(|| self.typed(argument(0)?))?;
                let offset = self.lane_pattern(argument(1)?, at)?;
                (
                    SubgroupFunction::AmdSwizzle {
                        argument: value,
                        offset,
                    },
                    ResultType::Argument(ty),
                )
            }
            AmdShaderBallot::SwizzleMasked => {
                let (value, ty) = recurse(|| self.typed(argument(0)?))?;
                let mask = self.lane_pattern(argument(1)?, at)?;
                (
                    SubgroupFunction::AmdSwizzleMasked {
                        argument: value,
                        mask,
                    },
                    ResultType::Argument(ty),
                )
            }
            AmdShaderBallot::WriteInvocation => {
                let (value, ty) = recurse(|| self.typed(argument(0)?))?;
                let written = recurse(|| self.rvalue(argument(1)?))?;
                let index = recurse(|| self.rvalue(argument(2)?))?;
                (
                    SubgroupFunction::AmdWriteInvocation {
                        argument: value,
                        value: written,
                        index,
                    },
                    ResultType::Argument(ty),
                )
            }
            AmdShaderBallot::Mbcnt => (
                SubgroupFunction::AmdMbcnt(recurse(|| self.rvalue(argument(0)?))?),
                ResultType::Fixed(TypeInner::Scalar(Scalar::U32)),
            ),
        })
    }
}
