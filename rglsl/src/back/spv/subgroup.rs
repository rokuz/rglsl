use alloc::{vec, vec::Vec};

use spirv::{Capability, GroupOperation, Op, Word};

use super::{Block, BlockContext, Error, Instruction, NumericType};
use crate::{arena::Handle, CollectiveOperation, Expression, SubgroupFunction, TypeInner};

const SPV_KHR_SHADER_BALLOT: &str = "SPV_KHR_shader_ballot";
const SPV_KHR_SUBGROUP_VOTE: &str = "SPV_KHR_subgroup_vote";
const SPV_KHR_SUBGROUP_ROTATE: &str = "SPV_KHR_subgroup_rotate";
const SPV_KHR_QUAD_CONTROL: &str = "SPV_KHR_quad_control";
const SPV_NV_SHADER_SUBGROUP_PARTITIONED: &str = "SPV_NV_shader_subgroup_partitioned";
const SPV_AMD_SHADER_BALLOT: &str = "SPV_AMD_shader_ballot";

const fn group_op(
    op: crate::SubgroupOperation,
    kind: crate::ScalarKind,
    non_uniform: bool,
) -> Result<Op, Error> {
    use crate::ScalarKind as Sk;
    use crate::SubgroupOperation as Sg;
    Ok(match (op, kind, non_uniform) {
        (Sg::Add, Sk::Float, false) => Op::GroupFAdd,
        (Sg::Add, Sk::Sint | Sk::Uint, false) => Op::GroupIAdd,
        (Sg::Min, Sk::Float, false) => Op::GroupFMin,
        (Sg::Min, Sk::Uint, false) => Op::GroupUMin,
        (Sg::Min, Sk::Sint, false) => Op::GroupSMin,
        (Sg::Max, Sk::Float, false) => Op::GroupFMax,
        (Sg::Max, Sk::Uint, false) => Op::GroupUMax,
        (Sg::Max, Sk::Sint, false) => Op::GroupSMax,
        (Sg::Add, Sk::Float, true) => Op::GroupFAddNonUniformAMD,
        (Sg::Add, Sk::Sint | Sk::Uint, true) => Op::GroupIAddNonUniformAMD,
        (Sg::Min, Sk::Float, true) => Op::GroupFMinNonUniformAMD,
        (Sg::Min, Sk::Uint, true) => Op::GroupUMinNonUniformAMD,
        (Sg::Min, Sk::Sint, true) => Op::GroupSMinNonUniformAMD,
        (Sg::Max, Sk::Float, true) => Op::GroupFMaxNonUniformAMD,
        (Sg::Max, Sk::Uint, true) => Op::GroupUMaxNonUniformAMD,
        (Sg::Max, Sk::Sint, true) => Op::GroupSMaxNonUniformAMD,
        _ => return Err(Error::Validation("unsupported group operation")),
    })
}

enum Scope {
    Subgroup,
    None,
}

impl BlockContext<'_> {
    fn require_subgroup(
        &mut self,
        what: &'static str,
        capabilities: &[Capability],
    ) -> Result<(), Error> {
        self.writer
            .require_all(capabilities)
            .map_err(|missing| Error::MissingCapabilities(what, vec![missing]))
    }

    fn require_collective(&mut self, collective_op: &CollectiveOperation) -> Result<(), Error> {
        match *collective_op {
            CollectiveOperation::Reduce
            | CollectiveOperation::InclusiveScan
            | CollectiveOperation::ExclusiveScan => self.require_subgroup(
                "subgroup arithmetic",
                &[
                    Capability::GroupNonUniform,
                    Capability::GroupNonUniformArithmetic,
                ],
            ),
            CollectiveOperation::ClusteredReduce(_) => self.require_subgroup(
                "clustered subgroup operation",
                &[
                    Capability::GroupNonUniform,
                    Capability::GroupNonUniformClustered,
                ],
            ),
            CollectiveOperation::PartitionedReduce(_)
            | CollectiveOperation::PartitionedInclusiveScan(_)
            | CollectiveOperation::PartitionedExclusiveScan(_) => {
                self.writer
                    .use_extension(SPV_NV_SHADER_SUBGROUP_PARTITIONED);
                self.require_subgroup(
                    "partitioned subgroup operation",
                    &[Capability::GroupNonUniformPartitionedNV],
                )
            }
        }
    }

    fn group_operation(
        &mut self,
        collective_op: &CollectiveOperation,
    ) -> Result<(GroupOperation, Option<Word>), Error> {
        Ok(match *collective_op {
            CollectiveOperation::Reduce => (GroupOperation::Reduce, None),
            CollectiveOperation::InclusiveScan => (GroupOperation::InclusiveScan, None),
            CollectiveOperation::ExclusiveScan => (GroupOperation::ExclusiveScan, None),
            CollectiveOperation::ClusteredReduce(size) => (
                GroupOperation::ClusteredReduce,
                Some(self.get_index_constant(size)),
            ),
            CollectiveOperation::PartitionedReduce(ballot) => (
                GroupOperation::PartitionedReduceNV,
                Some(self.cached.get(ballot)?),
            ),
            CollectiveOperation::PartitionedInclusiveScan(ballot) => (
                GroupOperation::PartitionedInclusiveScanNV,
                Some(self.cached.get(ballot)?),
            ),
            CollectiveOperation::PartitionedExclusiveScan(ballot) => (
                GroupOperation::PartitionedExclusiveScanNV,
                Some(self.cached.get(ballot)?),
            ),
        })
    }

    fn push_group_instruction(
        &mut self,
        op: Op,
        result_type_id: Word,
        scope: Scope,
        operands: &[Word],
        block: &mut Block,
    ) -> Word {
        let id = self.gen_id();
        let mut instruction = Instruction::new(op);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        if let Scope::Subgroup = scope {
            instruction.add_operand(self.get_index_constant(spirv::Scope::Subgroup as u32));
        }
        for &operand in operands {
            instruction.add_operand(operand);
        }
        block.body.push(instruction);
        id
    }

    fn result_type_id(&mut self, result: Handle<Expression>) -> Result<Word, Error> {
        let result_ty = &self.fun_info[result].ty;
        self.get_expression_type_id(result_ty)
    }

    pub(super) fn write_subgroup_ballot(
        &mut self,
        predicate: &Option<Handle<Expression>>,
        result: Handle<Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        self.require_subgroup(
            "subgroup ballot",
            &[
                Capability::GroupNonUniform,
                Capability::GroupNonUniformBallot,
            ],
        )?;
        let vec4_u32_type_id = self.get_numeric_type_id(NumericType::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar::U32,
        });
        let predicate = if let Some(predicate) = *predicate {
            self.cached.get(predicate)?
        } else {
            self.writer.get_constant_scalar(crate::Literal::Bool(true))
        };
        let id = self.push_group_instruction(
            Op::GroupNonUniformBallot,
            vec4_u32_type_id,
            Scope::Subgroup,
            &[predicate],
            block,
        );
        self.cached.set(result, id)?;
        Ok(())
    }

    pub(super) fn write_subgroup_operation(
        &mut self,
        op: &crate::SubgroupOperation,
        collective_op: &CollectiveOperation,
        argument: Handle<Expression>,
        result: Handle<Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        use crate::SubgroupOperation as sg;
        match *op {
            sg::All | sg::Any => self.require_subgroup(
                "subgroup vote",
                &[Capability::GroupNonUniform, Capability::GroupNonUniformVote],
            )?,
            _ => self.require_collective(collective_op)?,
        }

        let result_type_id = self.result_type_id(result)?;
        let result_ty_inner = self.fun_info[result]
            .ty
            .inner_with(&self.ir_module.types)
            .clone();

        let (is_scalar, scalar) = match result_ty_inner {
            TypeInner::Scalar(kind) => (true, kind),
            TypeInner::Vector { scalar: kind, .. } | TypeInner::LongVector { scalar: kind, .. } => {
                (false, kind)
            }
            _ => {
                return Err(Error::Validation(
                    "subgroup operation result is not a scalar or vector",
                ))
            }
        };

        use crate::ScalarKind as sk;
        let spirv_op = match (scalar.kind, *op) {
            (sk::Bool, sg::All) if is_scalar => Op::GroupNonUniformAll,
            (sk::Bool, sg::Any) if is_scalar => Op::GroupNonUniformAny,
            (_, sg::All | sg::Any) => {
                return Err(Error::Validation(
                    "subgroup vote operand is not a scalar bool",
                ))
            }

            (sk::Sint | sk::Uint, sg::Add) => Op::GroupNonUniformIAdd,
            (sk::Float, sg::Add) => Op::GroupNonUniformFAdd,
            (sk::Sint | sk::Uint, sg::Mul) => Op::GroupNonUniformIMul,
            (sk::Float, sg::Mul) => Op::GroupNonUniformFMul,
            (sk::Sint, sg::Max) => Op::GroupNonUniformSMax,
            (sk::Uint, sg::Max) => Op::GroupNonUniformUMax,
            (sk::Float, sg::Max) => Op::GroupNonUniformFMax,
            (sk::Sint, sg::Min) => Op::GroupNonUniformSMin,
            (sk::Uint, sg::Min) => Op::GroupNonUniformUMin,
            (sk::Float, sg::Min) => Op::GroupNonUniformFMin,
            (_, sg::Add | sg::Mul | sg::Min | sg::Max) => {
                return Err(Error::Validation(
                    "subgroup arithmetic operand is not numeric",
                ))
            }

            (sk::Sint | sk::Uint, sg::And) => Op::GroupNonUniformBitwiseAnd,
            (sk::Sint | sk::Uint, sg::Or) => Op::GroupNonUniformBitwiseOr,
            (sk::Sint | sk::Uint, sg::Xor) => Op::GroupNonUniformBitwiseXor,
            (sk::Bool, sg::And) => Op::GroupNonUniformLogicalAnd,
            (sk::Bool, sg::Or) => Op::GroupNonUniformLogicalOr,
            (sk::Bool, sg::Xor) => Op::GroupNonUniformLogicalXor,
            (_, sg::And | sg::Or | sg::Xor) => {
                return Err(Error::Validation(
                    "subgroup bitwise operand is not an integer or bool",
                ))
            }
        };

        let arg_id = self.cached.get(argument)?;
        let mut operands = Vec::with_capacity(3);
        if !matches!(*op, sg::All | sg::Any) {
            let (group_op, extra) = self.group_operation(collective_op)?;
            operands.push(group_op as u32);
            operands.push(arg_id);
            operands.extend(extra);
        } else {
            operands.push(arg_id);
        }
        let id = self.push_group_instruction(
            spirv_op,
            result_type_id,
            Scope::Subgroup,
            &operands,
            block,
        );
        self.cached.set(result, id)?;
        Ok(())
    }

    pub(super) fn write_subgroup_gather(
        &mut self,
        mode: &crate::GatherMode,
        argument: Handle<Expression>,
        result: Handle<Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        use crate::GatherMode as Gm;
        match *mode {
            Gm::BroadcastFirst | Gm::Broadcast(_) => self.require_subgroup(
                "subgroup broadcast",
                &[
                    Capability::GroupNonUniform,
                    Capability::GroupNonUniformBallot,
                ],
            )?,
            Gm::Shuffle(_) | Gm::ShuffleXor(_) => self.require_subgroup(
                "subgroup shuffle",
                &[
                    Capability::GroupNonUniform,
                    Capability::GroupNonUniformShuffle,
                ],
            )?,
            Gm::ShuffleDown(_) | Gm::ShuffleUp(_) => self.require_subgroup(
                "relative subgroup shuffle",
                &[
                    Capability::GroupNonUniform,
                    Capability::GroupNonUniformShuffleRelative,
                ],
            )?,
            Gm::QuadBroadcast(_) | Gm::QuadSwap(_) => self.require_subgroup(
                "subgroup quad operation",
                &[Capability::GroupNonUniform, Capability::GroupNonUniformQuad],
            )?,
            Gm::Rotate { .. } => {
                self.writer.use_extension(SPV_KHR_SUBGROUP_ROTATE);
                self.require_subgroup("subgroup rotate", &[Capability::GroupNonUniformRotateKHR])?;
            }
        }

        let result_type_id = self.result_type_id(result)?;
        let arg_id = self.cached.get(argument)?;
        let (op, operands) = match *mode {
            Gm::BroadcastFirst => (Op::GroupNonUniformBroadcastFirst, vec![arg_id]),
            Gm::Broadcast(index) => (
                Op::GroupNonUniformBroadcast,
                vec![arg_id, self.cached.get(index)?],
            ),
            Gm::Shuffle(index) => (
                Op::GroupNonUniformShuffle,
                vec![arg_id, self.cached.get(index)?],
            ),
            Gm::ShuffleDown(index) => (
                Op::GroupNonUniformShuffleDown,
                vec![arg_id, self.cached.get(index)?],
            ),
            Gm::ShuffleUp(index) => (
                Op::GroupNonUniformShuffleUp,
                vec![arg_id, self.cached.get(index)?],
            ),
            Gm::ShuffleXor(index) => (
                Op::GroupNonUniformShuffleXor,
                vec![arg_id, self.cached.get(index)?],
            ),
            Gm::QuadBroadcast(index) => (
                Op::GroupNonUniformQuadBroadcast,
                vec![arg_id, self.cached.get(index)?],
            ),
            Gm::QuadSwap(direction) => {
                let direction = self.get_index_constant(match direction {
                    crate::Direction::X => 0,
                    crate::Direction::Y => 1,
                    crate::Direction::Diagonal => 2,
                });
                (Op::GroupNonUniformQuadSwap, vec![arg_id, direction])
            }
            Gm::Rotate {
                delta,
                cluster_size,
            } => {
                let mut operands = vec![arg_id, self.cached.get(delta)?];
                if let Some(size) = cluster_size {
                    operands.push(self.get_index_constant(size));
                }
                (Op::GroupNonUniformRotateKHR, operands)
            }
        };
        let id = self.push_group_instruction(op, result_type_id, Scope::Subgroup, &operands, block);
        self.cached.set(result, id)?;
        Ok(())
    }

    fn per_component(
        &mut self,
        op: Op,
        result: Handle<Expression>,
        argument: Handle<Expression>,
        rest: &[Word],
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.split_components(op, result, argument, &[], rest, block)
    }

    fn per_component_after(
        &mut self,
        op: Op,
        result: Handle<Expression>,
        argument: Handle<Expression>,
        leading: &[Word],
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.split_components(op, result, argument, leading, &[], block)
    }

    fn split_components(
        &mut self,
        op: Op,
        result: Handle<Expression>,
        argument: Handle<Expression>,
        leading: &[Word],
        rest: &[Word],
        block: &mut Block,
    ) -> Result<Word, Error> {
        let result_type_id = self.result_type_id(result)?;
        let arg_id = self.cached.get(argument)?;
        let inner = self.fun_info[result]
            .ty
            .inner_with(&self.ir_module.types)
            .clone();
        let (size, scalar) = match inner {
            TypeInner::Scalar(_) => {
                let mut operands = leading.to_vec();
                operands.push(arg_id);
                operands.extend_from_slice(rest);
                return Ok(self.push_group_instruction(
                    op,
                    result_type_id,
                    Scope::None,
                    &operands,
                    block,
                ));
            }
            TypeInner::Vector { size, scalar } => (size, scalar),
            _ => {
                return Err(Error::Validation(
                    "subgroup invocation operand is not a scalar or vector",
                ))
            }
        };
        let scalar_type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
        let mut components = Vec::with_capacity(size as usize);
        for index in 0..size as u32 {
            let component = self.gen_id();
            block.body.push(Instruction::composite_extract(
                scalar_type_id,
                component,
                arg_id,
                &[index],
            ));
            let mut operands = leading.to_vec();
            operands.push(component);
            operands.extend_from_slice(rest);
            components.push(self.push_group_instruction(
                op,
                scalar_type_id,
                Scope::None,
                &operands,
                block,
            ));
        }
        let id = self.gen_id();
        block.body.push(Instruction::composite_construct(
            result_type_id,
            id,
            &components,
        ));
        Ok(id)
    }

    pub(super) fn write_subgroup_function(
        &mut self,
        fun: &SubgroupFunction,
        result: Handle<Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        use SubgroupFunction as Sf;
        const BALLOT: &[Capability] = &[
            Capability::GroupNonUniform,
            Capability::GroupNonUniformBallot,
        ];
        const VOTE: &[Capability] = &[Capability::GroupNonUniform, Capability::GroupNonUniformVote];
        match *fun {
            Sf::Elect => self.require_subgroup("subgroup elect", &[Capability::GroupNonUniform])?,
            Sf::AllEqual(_) => self.require_subgroup("subgroup vote", VOTE)?,
            Sf::QuadAll(_) | Sf::QuadAny(_) => {
                self.writer.use_extension(SPV_KHR_QUAD_CONTROL);
                self.require_subgroup("subgroup vote", VOTE)?;
                self.require_subgroup("quad control", &[Capability::QuadControlKHR])?;
            }
            Sf::InverseBallot(_)
            | Sf::BallotBitExtract { .. }
            | Sf::BallotBitCount { .. }
            | Sf::BallotFindLsb(_)
            | Sf::BallotFindMsb(_) => self.require_subgroup("subgroup ballot", BALLOT)?,
            Sf::Partition(_) => {
                self.writer
                    .use_extension(SPV_NV_SHADER_SUBGROUP_PARTITIONED);
                self.require_subgroup(
                    "subgroup partition",
                    &[Capability::GroupNonUniformPartitionedNV],
                )?;
            }
            Sf::KhrBallot(_) | Sf::KhrReadInvocation { .. } | Sf::KhrReadFirstInvocation(_) => {
                self.writer.use_extension(SPV_KHR_SHADER_BALLOT);
                self.require_subgroup("shader ballot", &[Capability::SubgroupBallotKHR])?;
            }
            Sf::KhrAll(_) | Sf::KhrAny(_) | Sf::KhrAllEqual(_) => {
                self.writer.use_extension(SPV_KHR_SUBGROUP_VOTE);
                self.require_subgroup("subgroup vote", &[Capability::SubgroupVoteKHR])?;
            }
            Sf::Group { non_uniform, .. } => {
                if non_uniform {
                    self.writer.use_extension(SPV_AMD_SHADER_BALLOT);
                }
                self.require_subgroup("group operation", &[Capability::Groups])?;
            }
        }

        let id = match *fun {
            Sf::KhrReadInvocation { argument, index } => {
                let index = self.cached.get(index)?;
                self.per_component(
                    Op::SubgroupReadInvocationKHR,
                    result,
                    argument,
                    &[index],
                    block,
                )?
            }
            Sf::KhrReadFirstInvocation(argument) => {
                self.per_component(Op::SubgroupFirstInvocationKHR, result, argument, &[], block)?
            }
            Sf::Group {
                op,
                ref collective_op,
                argument,
                non_uniform,
            } => {
                let scalar = match *self.fun_info[result].ty.inner_with(&self.ir_module.types) {
                    TypeInner::Scalar(scalar) | TypeInner::Vector { scalar, .. } => scalar,
                    _ => {
                        return Err(Error::Validation(
                            "group operation result is not a scalar or vector",
                        ))
                    }
                };
                let spirv_op = group_op(op, scalar.kind, non_uniform)?;
                let (group_operation, _) = self.group_operation(collective_op)?;
                let scope = self.get_index_constant(spirv::Scope::Subgroup as u32);
                self.per_component_after(
                    spirv_op,
                    result,
                    argument,
                    &[scope, group_operation as u32],
                    block,
                )?
            }
            _ => {
                let result_type_id = self.result_type_id(result)?;
                let (op, scope, operands) = match *fun {
                    Sf::Elect => (Op::GroupNonUniformElect, Scope::Subgroup, vec![]),
                    Sf::AllEqual(value) => (
                        Op::GroupNonUniformAllEqual,
                        Scope::Subgroup,
                        vec![self.cached.get(value)?],
                    ),
                    Sf::QuadAll(value) => (
                        Op::GroupNonUniformQuadAllKHR,
                        Scope::None,
                        vec![self.cached.get(value)?],
                    ),
                    Sf::QuadAny(value) => (
                        Op::GroupNonUniformQuadAnyKHR,
                        Scope::None,
                        vec![self.cached.get(value)?],
                    ),
                    Sf::InverseBallot(ballot) => (
                        Op::GroupNonUniformInverseBallot,
                        Scope::Subgroup,
                        vec![self.cached.get(ballot)?],
                    ),
                    Sf::BallotBitExtract { ballot, index } => (
                        Op::GroupNonUniformBallotBitExtract,
                        Scope::Subgroup,
                        vec![self.cached.get(ballot)?, self.cached.get(index)?],
                    ),
                    Sf::BallotBitCount {
                        ballot,
                        ref collective_op,
                    } => {
                        let (group_op, _) = self.group_operation(collective_op)?;
                        (
                            Op::GroupNonUniformBallotBitCount,
                            Scope::Subgroup,
                            vec![group_op as u32, self.cached.get(ballot)?],
                        )
                    }
                    Sf::BallotFindLsb(ballot) => (
                        Op::GroupNonUniformBallotFindLSB,
                        Scope::Subgroup,
                        vec![self.cached.get(ballot)?],
                    ),
                    Sf::BallotFindMsb(ballot) => (
                        Op::GroupNonUniformBallotFindMSB,
                        Scope::Subgroup,
                        vec![self.cached.get(ballot)?],
                    ),
                    Sf::Partition(value) => (
                        Op::GroupNonUniformPartitionNV,
                        Scope::None,
                        vec![self.cached.get(value)?],
                    ),
                    Sf::KhrBallot(value) => (
                        Op::SubgroupBallotKHR,
                        Scope::None,
                        vec![self.cached.get(value)?],
                    ),
                    Sf::KhrAll(value) => (
                        Op::SubgroupAllKHR,
                        Scope::None,
                        vec![self.cached.get(value)?],
                    ),
                    Sf::KhrAny(value) => (
                        Op::SubgroupAnyKHR,
                        Scope::None,
                        vec![self.cached.get(value)?],
                    ),
                    Sf::KhrAllEqual(value) => (
                        Op::SubgroupAllEqualKHR,
                        Scope::None,
                        vec![self.cached.get(value)?],
                    ),
                    Sf::KhrReadInvocation { .. }
                    | Sf::KhrReadFirstInvocation(_)
                    | Sf::Group { .. } => {
                        return Err(Error::Validation(
                            "subgroup invocation function handled above",
                        ))
                    }
                };
                self.push_group_instruction(op, result_type_id, scope, &operands, block)
            }
        };
        self.cached.set(result, id)?;
        Ok(())
    }
}
