use super::super::ShaderStages;
use super::{ExpressionError, ExpressionTypeResolver, tensor_shape};
use crate::arena::Handle;

impl super::super::Validator {
    pub(super) fn validate_cooperative_load(
        data: &crate::CooperativeData,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        if resolver
            .resolve(data.pointer)?
            .pointer_base_type()
            .and_then(|tr| tr.inner_with(&module.types).scalar())
            .is_none()
        {
            return Err(ExpressionError::InvalidPointerType(data.pointer));
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_cooperative_multiply_add(
        a: Handle<crate::Expression>,
        b: Handle<crate::Expression>,
        c: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::{CooperativeMatrixClass as Cmc, TypeInner as Ti};

        let roles = [
            crate::CooperativeRole::A,
            crate::CooperativeRole::B,
            crate::CooperativeRole::C,
        ];
        for (operand, expected_role) in [a, b, c].into_iter().zip(roles) {
            let other = resolver.resolve(operand)?;
            let role_ok = if let Ti::CooperativeMatrix { class, role, .. } = *other {
                match class {
                    Cmc::Nv => true,
                    Cmc::Khr => role == expected_role,
                }
            } else {
                false
            };
            if !role_ok {
                log::debug!("{expected_role:?} operand type: {other:?}");
                return Err(ExpressionError::InvalidCooperativeOperand(operand));
            }
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_cooperative_matrix_length(
        root: Handle<crate::Expression>,
        ty: Handle<crate::Type>,
        module: &crate::Module,
    ) -> Result<ShaderStages, ExpressionError> {
        let crate::TypeInner::CooperativeMatrix { .. } = module.types[ty].inner else {
            return Err(ExpressionError::InvalidCooperativeOperand(root));
        };
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_tensor_set(
        base: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        let (Ti::TensorLayout { .. } | Ti::TensorView { .. }) = *resolver.resolve(base)? else {
            return Err(ExpressionError::InvalidCooperativeOperand(base));
        };
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_cooperative_vector_op(
        root: Handle<crate::Expression>,
        ty: Handle<crate::Type>,
        module: &crate::Module,
    ) -> Result<ShaderStages, ExpressionError> {
        let crate::TypeInner::LongVector {
            class: crate::LongVectorClass::CooperativeNv,
            ..
        } = module.types[ty].inner
        else {
            return Err(ExpressionError::InvalidCooperativeOperand(root));
        };
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_tensor_read(
        root: Handle<crate::Expression>,
        ty: Handle<crate::Type>,
        tensor: Handle<crate::Expression>,
        coordinates: Handle<crate::Expression>,
        out_of_bounds: Option<Handle<crate::Expression>>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        let Ti::Tensor { scalar, rank } = *resolver.resolve(tensor)? else {
            return Err(ExpressionError::InvalidTensorOperand(tensor));
        };
        let Some((index, shape)) = tensor_shape(resolver.resolve(coordinates)?, &module.types)
        else {
            return Err(ExpressionError::InvalidTensorOperand(coordinates));
        };
        if !shape.coordinates_of(rank) || !index.kind.is_integer() {
            return Err(ExpressionError::InvalidTensorOperand(coordinates));
        }
        let Some((element, _)) = tensor_shape(&module.types[ty].inner, &module.types) else {
            return Err(ExpressionError::InvalidTensorOperand(root));
        };
        if element != scalar {
            return Err(ExpressionError::InvalidTensorOperand(root));
        }
        if let Some(value) = out_of_bounds
            && *resolver.resolve(value)? != Ti::Scalar(scalar)
        {
            return Err(ExpressionError::InvalidTensorOperand(value));
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_tensor_query_size(
        tensor: Handle<crate::Expression>,
        dimension: u32,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        if let crate::TypeInner::Tensor { rank, .. } = *resolver.resolve(tensor)?
            && rank.known().is_none_or(|rank| dimension < rank)
        {
            Ok(ShaderStages::all())
        } else {
            Err(ExpressionError::InvalidTensorOperand(tensor))
        }
    }

    pub(super) fn validate_expect(
        value: Handle<crate::Expression>,
        expected: Handle<crate::Expression>,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        if *resolver.resolve(value)? != *resolver.resolve(expected)? {
            return Err(ExpressionError::InvalidCooperativeOperand(expected));
        }
        Ok(ShaderStages::all())
    }

    pub(super) fn validate_replicate(
        root: Handle<crate::Expression>,
        ty: Handle<crate::Type>,
        value: Handle<crate::Expression>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        use crate::TypeInner as Ti;

        let (Ti::CooperativeMatrix { scalar, .. }
        | Ti::LongVector { scalar, .. }
        | Ti::Vector { scalar, .. }) = module.types[ty].inner
        else {
            return Err(ExpressionError::InvalidCooperativeOperand(root));
        };
        if *resolver.resolve(value)? != Ti::Scalar(scalar) {
            return Err(ExpressionError::InvalidCooperativeOperand(value));
        }
        Ok(ShaderStages::all())
    }
}
