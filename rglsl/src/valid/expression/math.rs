use super::super::ShaderStages;
use super::{ExpressionError, ExpressionTypeResolver};
use crate::{arena::Handle, proc::OverloadSet as _};

impl super::super::Validator {
    pub(super) fn validate_math(
        fun: crate::MathFunction,
        arg: Handle<crate::Expression>,
        arg1: Option<Handle<crate::Expression>>,
        arg2: Option<Handle<crate::Expression>>,
        arg3: Option<Handle<crate::Expression>>,
        module: &crate::Module,
        resolver: &ExpressionTypeResolver,
    ) -> Result<ShaderStages, ExpressionError> {
        let actuals: &[_] = match (arg1, arg2, arg3) {
            (None, None, None) => &[arg],
            (Some(arg1), None, None) => &[arg, arg1],
            (Some(arg1), Some(arg2), None) => &[arg, arg1, arg2],
            (Some(arg1), Some(arg2), Some(arg3)) => &[arg, arg1, arg2, arg3],
            _ => return Err(ExpressionError::WrongArgumentCount(fun)),
        };

        let actual_types = actuals
            .iter()
            .map(|&arg| resolver.resolve(arg))
            .collect::<Result<alloc::vec::Vec<_>, _>>()?;

        let mut overloads = fun.overloads();
        log::debug!(
            "initial overloads for {:?}: {:#?}",
            fun,
            overloads.for_debug(&module.types)
        );

        for (i, (&expr, ty)) in actuals.iter().zip(actual_types).enumerate() {
            overloads = overloads.arg(i, ty, &module.types);
            log::debug!(
                "overloads after arg {i}: {:#?}",
                overloads.for_debug(&module.types)
            );

            if overloads.is_empty() {
                log::debug!("all overloads eliminated");
                return Err(ExpressionError::InvalidArgumentType(fun, i as u32, expr));
            }
        }

        if overloads
            .min_arguments()
            .is_none_or(|min_arguments| actuals.len() < min_arguments)
        {
            return Err(ExpressionError::WrongArgumentCount(fun));
        }

        Ok(ShaderStages::all())
    }
}
