use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::TensorArmCall;

use super::function::FunctionLowerer;
use super::{internal, Result};
use crate::{Expression, Handle, Span, Statement};

impl FunctionLowerer<'_, '_> {}

#[allow(clippy::await_holding_refcell_ref)]
impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    pub(super) async fn tensor_arm_call(
        self,
        kind: TensorArmCall,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let mut this = self.lowerer();
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        let tensor = {
            let frame = self.clone().rvalue(argument(0)?);
            drop(this);
            let result = self.nest(frame).await;
            this = self.lowerer();
            result
        }?;
        match kind {
            TensorArmCall::Size { dimension } => {
                let size = this.add(Expression::TensorQuerySize { tensor, dimension }, at)?;
                Ok(Some(size))
            }
            TensorArmCall::Read {
                nontemporal,
                out_of_bounds,
            } => {
                let coordinates = {
                    let frame = self.clone().rvalue(argument(1)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let out_of_bounds = if out_of_bounds {
                    Some({
                        let frame = self.clone().rvalue(argument(4)?);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?)
                } else {
                    None
                };
                let data = argument(2)?;
                let data_ty = this.info(data)?.ty.clone();
                let ty = this.lw.ir_type(&data_ty, at)?;
                let place = {
                    let frame = self.clone().place(data);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let value = this.add(
                    Expression::TensorRead {
                        ty,
                        tensor,
                        coordinates,
                        nontemporal,
                        out_of_bounds,
                    },
                    at,
                )?;
                this.store(&place, value, at)?;
                Ok(None)
            }
            TensorArmCall::Write { nontemporal } => {
                let coordinates = {
                    let frame = self.clone().rvalue(argument(1)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let value = {
                    let frame = self.clone().rvalue(argument(2)?);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                this.push(
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
