use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::TensorArmCall;

use super::function::FunctionLowerer;
use super::{internal, Result};
use crate::{Expression, Handle, Span, Statement};

impl FunctionLowerer<'_, '_> {
    pub(super) fn tensor_arm_call(
        &mut self,
        kind: TensorArmCall,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        let tensor = self.rvalue(argument(0)?)?;
        match kind {
            TensorArmCall::Size { dimension } => {
                let size = self.add(Expression::TensorQuerySize { tensor, dimension }, at)?;
                Ok(Some(size))
            }
            TensorArmCall::Read {
                nontemporal,
                out_of_bounds,
            } => {
                let coordinates = self.rvalue(argument(1)?)?;
                let out_of_bounds = if out_of_bounds {
                    Some(self.rvalue(argument(4)?)?)
                } else {
                    None
                };
                let data = argument(2)?;
                let data_ty = self.info(data)?.ty.clone();
                let ty = self.lw.ir_type(&data_ty, at)?;
                let place = self.place(data)?;
                let value = self.add(
                    Expression::TensorRead {
                        ty,
                        tensor,
                        coordinates,
                        nontemporal,
                        out_of_bounds,
                    },
                    at,
                )?;
                self.store(&place, value, at)?;
                Ok(None)
            }
            TensorArmCall::Write { nontemporal } => {
                let coordinates = self.rvalue(argument(1)?)?;
                let value = self.rvalue(argument(2)?)?;
                self.push(
                    Statement::TensorWrite {
                        tensor,
                        coordinates,
                        value,
                        nontemporal,
                    },
                    at,
                );
                Ok(None)
            }
        }
    }
}
