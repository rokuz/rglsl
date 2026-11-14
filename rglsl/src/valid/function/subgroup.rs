use super::{BlockContext, FunctionError};
use crate::arena::Handle;
use crate::span::{AddSpan as _, WithSpan};

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum SubgroupError {
    #[error("Operand {0:?} has invalid type.")]
    InvalidOperand(Handle<crate::Expression>),
    #[error("Result type for {0:?} doesn't match the statement")]
    ResultTypeMismatch(Handle<crate::Expression>),
    #[error("Unknown operation")]
    UnknownOperation,
    #[error("Invocation ID must be a const-expression")]
    InvalidInvocationIdExprType(Handle<crate::Expression>),
    #[error("Lane pattern component {0} is out of range")]
    LanePatternOutOfRange(u32),
}

const fn is_bool(inner: &crate::TypeInner) -> bool {
    matches!(*inner, crate::TypeInner::Scalar(crate::Scalar::BOOL))
}

const fn is_u32(inner: &crate::TypeInner) -> bool {
    matches!(*inner, crate::TypeInner::Scalar(crate::Scalar::U32))
}

const fn is_u64(inner: &crate::TypeInner) -> bool {
    matches!(*inner, crate::TypeInner::Scalar(crate::Scalar::U64))
}

fn lane_pattern(components: &[u32], limit: u32) -> Result<(), WithSpan<FunctionError>> {
    match components.iter().find(|&&component| component > limit) {
        Some(&component) => Err(SubgroupError::LanePatternOutOfRange(component)
            .with_span()
            .into_other()),
        None => Ok(()),
    }
}

const fn is_ballot(inner: &crate::TypeInner) -> bool {
    matches!(
        *inner,
        crate::TypeInner::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar::U32,
        }
    )
}

const fn is_scalar_or_vector(inner: &crate::TypeInner) -> bool {
    matches!(
        *inner,
        crate::TypeInner::Scalar(_)
            | crate::TypeInner::Vector { .. }
            | crate::TypeInner::LongVector { .. }
    )
}

const fn is_numeric(inner: &crate::TypeInner) -> bool {
    use crate::{ScalarKind as Sk, TypeInner as Ti};
    match *inner {
        Ti::Scalar(scalar) | Ti::Vector { scalar, .. } | Ti::LongVector { scalar, .. } => {
            match scalar.kind {
                Sk::Sint | Sk::Uint | Sk::Float => true,
                Sk::Bool
                | Sk::BFloat
                | Sk::FloatE4M3
                | Sk::FloatE5M2
                | Sk::FloatE2M1
                | Sk::FloatE3M2
                | Sk::FloatE2M3
                | Sk::FloatUE8M0
                | Sk::FloatMXINT8 => false,
            }
        }
        Ti::Matrix { .. }
        | Ti::CooperativeMatrix { .. }
        | Ti::TensorLayout { .. }
        | Ti::TensorView { .. }
        | Ti::Tensor { .. }
        | Ti::Atomic(_)
        | Ti::Pointer { .. }
        | Ti::ValuePointer { .. }
        | Ti::Array { .. }
        | Ti::Struct { .. }
        | Ti::Image { .. }
        | Ti::Sampler { .. }
        | Ti::SampledImage { .. }
        | Ti::AccelerationStructure
        | Ti::RayQuery
        | Ti::HitObject { .. }
        | Ti::BindingArray { .. }
        | Ti::BufferDescriptor { .. }
        | Ti::Spirv { .. } => false,
    }
}

impl super::super::Validator {
    fn subgroup_operand(
        &self,
        operand: Handle<crate::Expression>,
        context: &BlockContext,
        accept: impl Fn(&crate::TypeInner) -> bool,
    ) -> Result<(), WithSpan<FunctionError>> {
        let inner = context.resolve_type_inner(operand, &self.valid_expression_set)?;
        if accept(inner) {
            Ok(())
        } else {
            log::error!("Subgroup operand type {inner:?}");
            Err(SubgroupError::InvalidOperand(operand)
                .with_span_handle(operand, context.expressions)
                .into_other())
        }
    }

    fn subgroup_result(
        &mut self,
        result: Handle<crate::Expression>,
        context: &BlockContext,
        accept: impl Fn(&crate::TypeInner) -> bool,
    ) -> Result<(), WithSpan<FunctionError>> {
        self.emit_expression(result, context)?;
        if let crate::Expression::SubgroupOperationResult { ty } = context.expressions[result]
            && accept(&context.types[ty].inner)
        {
            Ok(())
        } else {
            Err(SubgroupError::ResultTypeMismatch(result)
                .with_span_handle(result, context.expressions)
                .into_other())
        }
    }

    fn validate_collective_operation(
        &self,
        collective_op: crate::CollectiveOperation,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::CollectiveOperation as Co;
        match collective_op {
            Co::Reduce | Co::InclusiveScan | Co::ExclusiveScan => Ok(()),
            Co::ClusteredReduce(size) if size.is_power_of_two() => Ok(()),
            Co::ClusteredReduce(_) => Err(SubgroupError::UnknownOperation.with_span().into_other()),
            Co::PartitionedReduce(ballot)
            | Co::PartitionedInclusiveScan(ballot)
            | Co::PartitionedExclusiveScan(ballot) => {
                self.subgroup_operand(ballot, context, is_ballot)
            }
        }
    }

    pub(super) fn validate_subgroup_ballot(
        &mut self,
        result: Handle<crate::Expression>,
        predicate: Option<Handle<crate::Expression>>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        if let Some(predicate) = predicate {
            let predicate_inner =
                context.resolve_type_inner(predicate, &self.valid_expression_set)?;
            if !matches!(
                *predicate_inner,
                crate::TypeInner::Scalar(crate::Scalar::BOOL)
            ) {
                log::error!("Subgroup ballot predicate type {predicate_inner:?} expected bool");
                return Err(SubgroupError::InvalidOperand(predicate)
                    .with_span_handle(predicate, context.expressions)
                    .into_other());
            }
        }
        self.emit_expression(result, context)
    }

    pub(super) fn validate_subgroup_operation(
        &mut self,
        op: crate::SubgroupOperation,
        collective_op: crate::CollectiveOperation,
        argument: Handle<crate::Expression>,
        result: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::{ScalarKind as Sk, SubgroupOperation as Sg, TypeInner as Ti};
        let argument_inner = context.resolve_type_inner(argument, &self.valid_expression_set)?;

        let (is_scalar, scalar) = match *argument_inner {
            Ti::Scalar(scalar) => (true, scalar),
            Ti::Vector { scalar, .. } | Ti::LongVector { scalar, .. } => (false, scalar),
            Ti::Matrix { .. }
            | Ti::CooperativeMatrix { .. }
            | Ti::TensorLayout { .. }
            | Ti::TensorView { .. }
            | Ti::Tensor { .. }
            | Ti::Atomic(_)
            | Ti::Pointer { .. }
            | Ti::ValuePointer { .. }
            | Ti::Array { .. }
            | Ti::Struct { .. }
            | Ti::Image { .. }
            | Ti::Sampler { .. }
            | Ti::SampledImage { .. }
            | Ti::AccelerationStructure
            | Ti::RayQuery
            | Ti::HitObject { .. }
            | Ti::BindingArray { .. }
            | Ti::BufferDescriptor { .. }
            | Ti::Spirv { .. } => {
                log::error!("Subgroup operand type {argument_inner:?}");
                return Err(SubgroupError::InvalidOperand(argument)
                    .with_span_handle(argument, context.expressions)
                    .into_other());
            }
        };

        match (scalar.kind, op) {
            (Sk::Bool, Sg::All | Sg::Any) if is_scalar => {}
            (Sk::Sint | Sk::Uint | Sk::Float, Sg::Add | Sg::Mul | Sg::Min | Sg::Max) => {}
            (Sk::Sint | Sk::Uint | Sk::Bool, Sg::And | Sg::Or | Sg::Xor) => {}
            (_, _) => {
                log::error!("Subgroup operand type {argument_inner:?}");
                return Err(SubgroupError::InvalidOperand(argument)
                    .with_span_handle(argument, context.expressions)
                    .into_other());
            }
        }

        if matches!(op, Sg::All | Sg::Any) && collective_op != crate::CollectiveOperation::Reduce {
            return Err(SubgroupError::UnknownOperation.with_span().into_other());
        }
        self.validate_collective_operation(collective_op, context)?;

        let argument_inner = argument_inner.clone();
        self.subgroup_result(result, context, |inner| *inner == argument_inner)
    }

    pub(super) fn validate_subgroup_gather(
        &mut self,
        mode: &crate::GatherMode,
        argument: Handle<crate::Expression>,
        result: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        mode.try_for_each_operand(|index| self.subgroup_operand(index, context, is_u32))?;
        if let crate::GatherMode::Rotate {
            cluster_size: Some(size),
            ..
        } = *mode
            && !size.is_power_of_two()
        {
            return Err(SubgroupError::UnknownOperation.with_span().into_other());
        }
        self.subgroup_operand(argument, context, is_scalar_or_vector)?;
        let argument_inner = context
            .resolve_type_inner(argument, &self.valid_expression_set)?
            .clone();
        self.subgroup_result(result, context, |inner| *inner == argument_inner)
    }

    pub(super) fn validate_subgroup_function(
        &mut self,
        fun: &crate::SubgroupFunction,
        result: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::SubgroupFunction as Sf;
        let same_as = |value: Handle<crate::Expression>| {
            context
                .resolve_type_inner(value, &self.valid_expression_set)
                .cloned()
        };
        match *fun {
            Sf::Elect => self.subgroup_result(result, context, is_bool),
            Sf::AllEqual(value) => {
                self.subgroup_operand(value, context, is_scalar_or_vector)?;
                self.subgroup_result(result, context, is_bool)
            }
            Sf::QuadAll(value)
            | Sf::QuadAny(value)
            | Sf::KhrAll(value)
            | Sf::KhrAny(value)
            | Sf::KhrAllEqual(value) => {
                self.subgroup_operand(value, context, is_bool)?;
                self.subgroup_result(result, context, is_bool)
            }
            Sf::InverseBallot(ballot) => {
                self.subgroup_operand(ballot, context, is_ballot)?;
                self.subgroup_result(result, context, is_bool)
            }
            Sf::BallotBitExtract { ballot, index } => {
                self.subgroup_operand(ballot, context, is_ballot)?;
                self.subgroup_operand(index, context, is_u32)?;
                self.subgroup_result(result, context, is_bool)
            }
            Sf::BallotBitCount {
                ballot,
                ref collective_op,
            } => {
                self.subgroup_operand(ballot, context, is_ballot)?;
                if !matches!(
                    *collective_op,
                    crate::CollectiveOperation::Reduce
                        | crate::CollectiveOperation::InclusiveScan
                        | crate::CollectiveOperation::ExclusiveScan
                ) {
                    return Err(SubgroupError::UnknownOperation.with_span().into_other());
                }
                self.subgroup_result(result, context, is_u32)
            }
            Sf::BallotFindLsb(ballot) | Sf::BallotFindMsb(ballot) => {
                self.subgroup_operand(ballot, context, is_ballot)?;
                self.subgroup_result(result, context, is_u32)
            }
            Sf::Partition(value) => {
                self.subgroup_operand(value, context, is_scalar_or_vector)?;
                self.subgroup_result(result, context, is_ballot)
            }
            Sf::KhrBallot(value) => {
                self.subgroup_operand(value, context, is_bool)?;
                self.subgroup_result(result, context, is_ballot)
            }
            Sf::KhrReadInvocation { argument, index } => {
                self.subgroup_operand(argument, context, is_numeric)?;
                self.subgroup_operand(index, context, is_u32)?;
                let expected = same_as(argument)?;
                self.subgroup_result(result, context, |inner| *inner == expected)
            }
            Sf::KhrReadFirstInvocation(argument) => {
                self.subgroup_operand(argument, context, is_numeric)?;
                let expected = same_as(argument)?;
                self.subgroup_result(result, context, |inner| *inner == expected)
            }
            Sf::Group {
                op,
                ref collective_op,
                argument,
                non_uniform: _,
            } => {
                if !matches!(
                    op,
                    crate::SubgroupOperation::Add
                        | crate::SubgroupOperation::Min
                        | crate::SubgroupOperation::Max
                ) || !matches!(
                    *collective_op,
                    crate::CollectiveOperation::Reduce
                        | crate::CollectiveOperation::InclusiveScan
                        | crate::CollectiveOperation::ExclusiveScan
                ) {
                    return Err(SubgroupError::UnknownOperation.with_span().into_other());
                }
                self.subgroup_operand(argument, context, is_numeric)?;
                let expected = same_as(argument)?;
                self.subgroup_result(result, context, |inner| *inner == expected)
            }
            Sf::AmdSwizzle { argument, offset } => {
                lane_pattern(&offset, 3)?;
                self.subgroup_operand(argument, context, is_numeric)?;
                let expected = same_as(argument)?;
                self.subgroup_result(result, context, |inner| *inner == expected)
            }
            Sf::AmdSwizzleMasked { argument, mask } => {
                lane_pattern(&mask, 31)?;
                self.subgroup_operand(argument, context, is_numeric)?;
                let expected = same_as(argument)?;
                self.subgroup_result(result, context, |inner| *inner == expected)
            }
            Sf::AmdWriteInvocation {
                argument,
                value,
                index,
            } => {
                self.subgroup_operand(argument, context, is_numeric)?;
                let expected = same_as(argument)?;
                self.subgroup_operand(value, context, |inner| *inner == expected)?;
                self.subgroup_operand(index, context, is_u32)?;
                self.subgroup_result(result, context, |inner| *inner == expected)
            }
            Sf::AmdMbcnt(mask) => {
                self.subgroup_operand(mask, context, is_u64)?;
                self.subgroup_result(result, context, is_u32)
            }
        }
    }
}
