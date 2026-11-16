use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::builtins::kind::{
    AmdShaderBallot, Collective, Gather, QuadDirection, Subgroup, SubgroupFunction as Function,
    SubgroupMemory, SubgroupOperation as Operation,
};
use rglsl_sema::types::{Scalar as GlslScalar, Type as GlslType};

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

impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    async fn collective_operation(
        self,
        collective: Collective,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<CollectiveOperation> {
        let second = || arguments.get(1).ok_or_else(|| internal(at));
        Ok(match collective {
            Collective::Reduce => CollectiveOperation::Reduce,
            Collective::InclusiveScan => CollectiveOperation::InclusiveScan,
            Collective::ExclusiveScan => CollectiveOperation::ExclusiveScan,
            Collective::Clustered => {
                let size = self.try_with(|this| {
                    Ok(this.constant_index(second()?).ok_or_else(|| internal(at)))
                })??;
                CollectiveOperation::ClusteredReduce(size)
            }
            Collective::PartitionedReduce => CollectiveOperation::PartitionedReduce({
                let frame = self.clone().rvalue(second()?);
                self.nest(frame).await
            }?),
            Collective::PartitionedInclusiveScan => {
                CollectiveOperation::PartitionedInclusiveScan({
                    let frame = self.clone().rvalue(second()?);
                    self.nest(frame).await
                }?)
            }
            Collective::PartitionedExclusiveScan => {
                CollectiveOperation::PartitionedExclusiveScan({
                    let frame = self.clone().rvalue(second()?);
                    self.nest(frame).await
                }?)
            }
        })
    }

    pub(super) async fn subgroup(
        self,
        kind: Subgroup,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        match kind {
            Subgroup::Barrier {
                execution,
                memory: used,
            } => {
                let semantics = memory(used) | MemorySemantics::ACQUIRE_RELEASE;
                self.with(|this| {
                    this.push(
                        Statement::ScopedBarrier {
                            execution: execution.then_some(MemoryScope::Subgroup),
                            memory: MemoryScope::Subgroup,
                            semantics,
                        },
                        at,
                    );
                })?;
                Ok(None)
            }
            Subgroup::Ballot => {
                let predicate = {
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?;
                let result = self.with(|this| {
                    this.push_with_result(
                        Expression::SubgroupBallotResult,
                        |result| Statement::SubgroupBallot {
                            result,
                            predicate: Some(predicate),
                        },
                        at,
                    )
                })?;
                Ok(Some(result))
            }
            Subgroup::Collective(op, collective) => {
                let op = operation(op);
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    self.nest(frame).await
                }?;
                let collective_op = {
                    let frame = self.clone().collective_operation(collective, arguments, at);
                    self.nest(frame).await
                }?;
                let ty = self.clone().ir_type(ty.clone(), at).await?;
                let result = self.with(|this| {
                    this.push_with_result(
                        Expression::SubgroupOperationResult { ty },
                        |result| Statement::SubgroupCollectiveOperation {
                            op,
                            collective_op,
                            argument: value,
                            result,
                        },
                        at,
                    )
                })?;
                Ok(Some(result))
            }
            Subgroup::Gather(gather) => {
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    self.nest(frame).await
                }?;
                let mode = match gather {
                    Gather::BroadcastFirst => GatherMode::BroadcastFirst,
                    Gather::QuadSwap(quad) => GatherMode::QuadSwap(direction(quad)),
                    Gather::Broadcast => GatherMode::Broadcast({
                        let frame = self.clone().rvalue(argument(1)?);
                        self.nest(frame).await
                    }?),
                    Gather::Shuffle => GatherMode::Shuffle({
                        let frame = self.clone().rvalue(argument(1)?);
                        self.nest(frame).await
                    }?),
                    Gather::ShuffleXor => GatherMode::ShuffleXor({
                        let frame = self.clone().rvalue(argument(1)?);
                        self.nest(frame).await
                    }?),
                    Gather::ShuffleUp => GatherMode::ShuffleUp({
                        let frame = self.clone().rvalue(argument(1)?);
                        self.nest(frame).await
                    }?),
                    Gather::ShuffleDown => GatherMode::ShuffleDown({
                        let frame = self.clone().rvalue(argument(1)?);
                        self.nest(frame).await
                    }?),
                    Gather::QuadBroadcast => GatherMode::QuadBroadcast({
                        let frame = self.clone().rvalue(argument(1)?);
                        self.nest(frame).await
                    }?),
                    Gather::Rotate => GatherMode::Rotate {
                        delta: {
                            let frame = self.clone().rvalue(argument(1)?);
                            self.nest(frame).await
                        }?,
                        cluster_size: None,
                    },
                    Gather::ClusteredRotate => {
                        let delta = {
                            let frame = self.clone().rvalue(argument(1)?);
                            self.nest(frame).await
                        }?;
                        let size = self.try_with(|this| {
                            Ok(this.constant_index(argument(2)?).ok_or_else(|| {
                                unsupported("a cluster size that is not a constant expression", at)
                            }))
                        })??;
                        GatherMode::Rotate {
                            delta,
                            cluster_size: Some(size),
                        }
                    }
                };
                let ty = self.clone().ir_type(ty.clone(), at).await?;
                let result = self.with(|this| {
                    this.push_with_result(
                        Expression::SubgroupOperationResult { ty },
                        |result| Statement::SubgroupGather {
                            mode,
                            argument: value,
                            result,
                        },
                        at,
                    )
                })?;
                Ok(Some(result))
            }
            Subgroup::Function(function) => {
                let frame = self.clone().subgroup_function(function, arguments, at);
                self.nest(frame).await
            }
        }
    }

    async fn subgroup_function(
        self,
        function: Function,
        arguments: &'b [AstExpression],
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
                SubgroupFunction::AllEqual({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(boolean),
            ),
            Function::QuadAll => (
                SubgroupFunction::QuadAll({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(boolean),
            ),
            Function::QuadAny => (
                SubgroupFunction::QuadAny({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(boolean),
            ),
            Function::InverseBallot => (
                SubgroupFunction::InverseBallot({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(boolean),
            ),
            Function::BallotBitExtract => (
                SubgroupFunction::BallotBitExtract {
                    ballot: {
                        let frame = self.clone().rvalue(argument(0)?);
                        self.nest(frame).await
                    }?,
                    index: {
                        let frame = self.clone().rvalue(argument(1)?);
                        self.nest(frame).await
                    }?,
                },
                ResultType::Fixed(boolean),
            ),
            Function::BallotBitCount(collective) => (
                SubgroupFunction::BallotBitCount {
                    ballot: {
                        let frame = self.clone().rvalue(argument(0)?);
                        self.nest(frame).await
                    }?,
                    collective_op: {
                        let frame = self.clone().collective_operation(collective, arguments, at);
                        self.nest(frame).await
                    }?,
                },
                ResultType::Fixed(unsigned),
            ),
            Function::BallotFindLsb => (
                SubgroupFunction::BallotFindLsb({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(unsigned),
            ),
            Function::BallotFindMsb => (
                SubgroupFunction::BallotFindMsb({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(unsigned),
            ),
            Function::Partition => (
                SubgroupFunction::Partition({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(ballot),
            ),
            Function::ArbBallot => {
                let predicate = {
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?;
                let result = self.with(|this| this.subgroup_result_type(ballot))?;
                let mask = self.with(|this| {
                    this.push_with_result(
                        result,
                        |result| Statement::SubgroupFunction {
                            fun: SubgroupFunction::KhrBallot(predicate),
                            result,
                        },
                        at,
                    )
                })?;
                return self.with(|this| this.ballot_to_u64(mask, at).map(Some))?;
            }
            Function::ReadInvocation => {
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    self.nest(frame).await
                }?;
                let index = {
                    let frame = self.clone().rvalue(argument(1)?);
                    self.nest(frame).await
                }?;
                (
                    SubgroupFunction::KhrReadInvocation {
                        argument: value,
                        index,
                    },
                    ResultType::Argument(ty),
                )
            }
            Function::ReadFirstInvocation => {
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    self.nest(frame).await
                }?;
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
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    self.nest(frame).await
                }?;
                let collective_op = {
                    let frame = self.clone().collective_operation(collective, arguments, at);
                    self.nest(frame).await
                }?;
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
            Function::Amd(amd) => {
                let frame = self.clone().amd_shader_ballot(amd, arguments, at);
                self.nest(frame).await?
            }
            Function::AllInvocations => (
                SubgroupFunction::KhrAll({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(boolean),
            ),
            Function::AnyInvocation => (
                SubgroupFunction::KhrAny({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(boolean),
            ),
            Function::AllInvocationsEqual => (
                SubgroupFunction::KhrAllEqual({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(boolean),
            ),
        };
        let ty = match result_type {
            ResultType::Fixed(inner) => self.with(|this| this.lw.insert_type(inner))?,
            ResultType::Argument(ty) => self.clone().ir_type(ty.clone(), at).await?,
        };
        let result = self.with(|this| {
            this.push_with_result(
                Expression::SubgroupOperationResult { ty },
                |result| Statement::SubgroupFunction { fun, result },
                at,
            )
        })?;
        Ok(Some(result))
    }

    async fn amd_shader_ballot(
        self,
        function: AmdShaderBallot,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<(SubgroupFunction, ResultType)> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        Ok(match function {
            AmdShaderBallot::Swizzle => {
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    self.nest(frame).await
                }?;
                let offset = self.try_with(|this| this.lane_pattern(argument(1)?, at))?;
                (
                    SubgroupFunction::AmdSwizzle {
                        argument: value,
                        offset,
                    },
                    ResultType::Argument(ty),
                )
            }
            AmdShaderBallot::SwizzleMasked => {
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    self.nest(frame).await
                }?;
                let mask = self.try_with(|this| this.lane_pattern(argument(1)?, at))?;
                (
                    SubgroupFunction::AmdSwizzleMasked {
                        argument: value,
                        mask,
                    },
                    ResultType::Argument(ty),
                )
            }
            AmdShaderBallot::WriteInvocation => {
                let (value, ty) = {
                    let frame = self.clone().typed(argument(0)?);
                    self.nest(frame).await
                }?;
                let written = {
                    let frame = self.clone().rvalue(argument(1)?);
                    self.nest(frame).await
                }?;
                let index = {
                    let frame = self.clone().rvalue(argument(2)?);
                    self.nest(frame).await
                }?;
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
                SubgroupFunction::AmdMbcnt({
                    let frame = self.clone().rvalue(argument(0)?);
                    self.nest(frame).await
                }?),
                ResultType::Fixed(TypeInner::Scalar(Scalar::U32)),
            ),
        })
    }
}
