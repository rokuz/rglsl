use alloc::format;

use super::{BlockContext, ExpressionError, FunctionError};
use crate::arena::Handle;
use crate::span::{AddSpan as _, WithSpan};

impl super::super::Validator {
    #[expect(
        clippy::too_many_arguments,
        reason = "the arguments are the fields of Statement::ImageStore"
    )]
    pub(super) fn validate_image_store(
        &self,
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        array_index: Option<Handle<crate::Expression>>,
        sample: Option<Handle<crate::Expression>>,
        level: Option<Handle<crate::Expression>>,
        value: Handle<crate::Expression>,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::{Expression as E, TypeInner as Ti};
        let global_ty;
        let image_ty;
        match *context.get_expression(image) {
            E::GlobalVariable(var_handle) => {
                global_ty = context.global_vars[var_handle].ty;
                image_ty = global_ty;
            }
            E::FunctionArgument(_) => {
                let Some(ty) = context.info[image].ty.handle() else {
                    return Err(FunctionError::InvalidImageStore(
                        ExpressionError::ExpectedGlobalVariable,
                    )
                    .with_span_handle(image, context.expressions));
                };
                global_ty = ty;
                image_ty = ty;
            }
            E::Access { base, .. } | E::AccessIndex { base, .. } => {
                let E::GlobalVariable(var_handle) = *context.get_expression(base) else {
                    return Err(FunctionError::InvalidImageStore(
                        ExpressionError::ExpectedGlobalVariable,
                    )
                    .with_span_handle(image, context.expressions));
                };
                global_ty = context.global_vars[var_handle].ty;

                let Ti::BindingArray { base, .. } = context.types[global_ty].inner else {
                    return Err(FunctionError::InvalidImageStore(
                        ExpressionError::ExpectedBindingArrayType(global_ty),
                    )
                    .with_span_handle(global_ty, context.types));
                };

                image_ty = base;
            }
            _ => {
                let Some((global, ty)) = context.heap_image(image) else {
                    return Err(FunctionError::InvalidImageStore(
                        ExpressionError::ExpectedGlobalVariable,
                    )
                    .with_span_handle(image, context.expressions));
                };
                global_ty = context.global_vars[global].ty;
                image_ty = ty;
            }
        };

        let Ti::Image {
            class,
            arrayed,
            dim,
        } = context.types[image_ty].inner
        else {
            return Err(
                FunctionError::InvalidImageStore(ExpressionError::ExpectedImageType(global_ty))
                    .with_span()
                    .with_handle(global_ty, context.types)
                    .with_handle(image, context.expressions),
            );
        };

        let crate::ImageClass::Storage { format, .. } = class else {
            return Err(
                FunctionError::InvalidImageStore(ExpressionError::InvalidImageClass(class))
                    .with_span_handle(image, context.expressions),
            );
        };

        if !context
            .resolve_type_inner(coordinate, &self.valid_expression_set)?
            .addresses_image(dim)
        {
            return Err(FunctionError::InvalidImageStore(
                ExpressionError::InvalidImageCoordinateType(dim, coordinate),
            )
            .with_span_handle(coordinate, context.expressions));
        }

        if super::super::image_array_index_expected(dim, arrayed, class) != array_index.is_some() {
            return Err(
                FunctionError::InvalidImageStore(ExpressionError::InvalidImageArrayIndex)
                    .with_span_handle(coordinate, context.expressions),
            );
        }

        match (sample, class.is_multisampled()) {
            (None, false) => {}
            (Some(sample), true) => {
                if !matches!(
                    *context.resolve_type_inner(sample, &self.valid_expression_set)?,
                    Ti::Scalar(crate::Scalar::I32 | crate::Scalar::U32)
                ) {
                    return Err(FunctionError::InvalidImageStore(
                        ExpressionError::InvalidImageOtherIndexType(sample),
                    )
                    .with_span_handle(sample, context.expressions));
                }
            }
            (Some(_), false) => {
                return Err(FunctionError::InvalidImageStore(
                    ExpressionError::InvalidImageSampleSelector,
                )
                .with_span_handle(image, context.expressions));
            }
            (None, true) => {
                return Err(FunctionError::InvalidImageStore(
                    ExpressionError::MissingImageSampleSelector,
                )
                .with_span_handle(image, context.expressions));
            }
        }

        if let Some(expr) = level {
            let integer = matches!(
                *context.resolve_type_inner(expr, &self.valid_expression_set)?,
                Ti::Scalar(crate::Scalar {
                    kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                    width: _,
                })
            );
            if !integer || !class.has_optional_level(dim) {
                return Err(FunctionError::InvalidImageStore(
                    ExpressionError::InvalidImageLevelSelector,
                )
                .with_span_handle(expr, context.expressions));
            }
        }

        if let Some(expr) = array_index
            && !matches!(
                *context.resolve_type_inner(expr, &self.valid_expression_set)?,
                Ti::Scalar(crate::Scalar {
                    kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                    width: _,
                })
            )
        {
            return Err(FunctionError::InvalidImageStore(
                ExpressionError::InvalidImageArrayIndexType(expr),
            )
            .with_span_handle(expr, context.expressions));
        }

        let value_ty = Ti::Vector {
            size: crate::VectorSize::Quad,
            scalar: format.into(),
        };

        let actual_value_ty = context.resolve_type_inner(value, &self.valid_expression_set)?;
        if actual_value_ty != &value_ty {
            return Err(FunctionError::InvalidStoreValue {
                actual: value,
                actual_ty: actual_value_ty.clone(),
                expected_ty: value_ty.clone(),
            }
            .with_span_context((
                context.expressions.get_span(value),
                format!("this value is of type {actual_value_ty:?}"),
            ))
            .with_span(
                span,
                format!("expects a value argument of type {value_ty:?}"),
            ));
        }

        Ok(())
    }
}
