use super::{BlockContext, FunctionError};
use crate::arena::Handle;
use crate::span::{AddSpan as _, WithSpan};

impl super::super::Validator {
    pub(super) fn validate_cooperative_matrix_statement(
        &mut self,
        function: &crate::CooperativeMatrixFunction,
        result: Option<Handle<crate::Expression>>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        function.try_for_each_operand(|operand| {
            context.resolve_type_inner(operand, &self.valid_expression_set)?;
            Ok::<(), WithSpan<FunctionError>>(())
        })?;
        if let Some(result) = result {
            self.emit_expression(result, context)?;
        }
        Ok(())
    }

    pub(super) fn validate_cooperative_vector_statement(
        &self,
        function: &crate::CooperativeVectorFunction,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        function.try_for_each_operand(|operand| {
            context.resolve_type_inner(operand, &self.valid_expression_set)?;
            Ok::<(), WithSpan<FunctionError>>(())
        })
    }

    pub(super) fn validate_cooperative_store(
        &self,
        target: Handle<crate::Expression>,
        data: &crate::CooperativeData,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let target_inner = context.resolve_type_inner(target, &self.valid_expression_set)?;
        if !matches!(*target_inner, crate::TypeInner::CooperativeMatrix { .. }) {
            log::error!("Target operand type: {target_inner:?}");
            return Err(FunctionError::InvalidCooperativeStoreTarget(target)
                .with_span_handle(target, context.expressions));
        }

        let ptr_ty = context.resolve_pointer_type(data.pointer);
        let ptr_scalar = ptr_ty
            .pointer_base_type()
            .and_then(|tr| tr.inner_with(context.types).scalar());
        if ptr_scalar.is_none() {
            return Err(FunctionError::InvalidCooperativeDataPointer(data.pointer)
                .with_span_handle(data.pointer, context.expressions));
        }

        let ptr_space = ptr_ty
            .pointer_space()
            .unwrap_or(crate::AddressSpace::Handle);
        if !ptr_space.access().contains(crate::StorageAccess::STORE) {
            return Err(
                FunctionError::InvalidStorePointer(data.pointer).with_span_static(
                    context.expressions.get_span(data.pointer),
                    "writing to this location is not permitted",
                ),
            );
        }
        Ok(())
    }

    pub(super) fn validate_tensor_write(
        &self,
        tensor: Handle<crate::Expression>,
        coordinates: Handle<crate::Expression>,
        value: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let invalid = |handle: Handle<crate::Expression>| {
            FunctionError::InvalidTensorWrite(handle).with_span_handle(handle, context.expressions)
        };
        let crate::TypeInner::Tensor { scalar, rank } =
            *context.resolve_type_inner(tensor, &self.valid_expression_set)?
        else {
            return Err(invalid(tensor));
        };
        let coordinates_inner =
            context.resolve_type_inner(coordinates, &self.valid_expression_set)?;
        match super::super::expression::tensor_shape(coordinates_inner, context.types) {
            Some((index, shape))
                if shape.coordinates_of(rank)
                    && matches!(
                        index.kind,
                        crate::ScalarKind::Uint | crate::ScalarKind::Sint
                    ) => {}
            _ => return Err(invalid(coordinates)),
        }
        let value_inner = context.resolve_type_inner(value, &self.valid_expression_set)?;
        match super::super::expression::tensor_shape(value_inner, context.types) {
            Some((element, _)) if element == scalar => Ok(()),
            _ => Err(invalid(value)),
        }
    }
}
