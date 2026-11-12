use core::num::NonZeroU32;

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::types::ArraySize as GlslArraySize;
use rglsl_sema::TensorArmCall;

use super::{internal, Lowerer, Result};
use crate::{CooperativeSize, Expression, Handle, Span, Statement};

impl Lowerer<'_> {
    pub(super) fn tensor_rank(&mut self, rank: GlslArraySize, at: Span) -> Result<CooperativeSize> {
        match rank {
            GlslArraySize::Sized(rank) => NonZeroU32::new(rank)
                .map(CooperativeSize::Constant)
                .ok_or_else(|| internal(at)),
            GlslArraySize::Specialized(size) => self
                .specialized_size(size, at)
                .map(CooperativeSize::Pending),
            GlslArraySize::Unsized => Err(internal(at)),
        }
    }
}

impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    pub(super) async fn tensor_arm_call(
        self,
        kind: TensorArmCall,
        arguments: &'b [AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        let tensor = {
            let frame = self.clone().rvalue(argument(0)?);
            let result = self.nest(frame).await;
            result
        }?;
        match kind {
            TensorArmCall::Size { dimension } => {
                let size = self.with(|this| {
                    this.add(Expression::TensorQuerySize { tensor, dimension }, at)
                })??;
                Ok(Some(size))
            }
            TensorArmCall::Read {
                nontemporal,
                out_of_bounds,
            } => {
                let coordinates = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let out_of_bounds = if out_of_bounds {
                    Some({
                        let frame = self.clone().rvalue(argument(4)?);
                        let result = self.nest(frame).await;
                        result
                    }?)
                } else {
                    None
                };
                let first_extra = if out_of_bounds.is_some() { 5 } else { 4 };
                for extra in arguments.iter().skip(first_extra) {
                    let frame = self.clone().rvalue(extra);
                    let _ = self.nest(frame).await?;
                }
                let data = argument(2)?;
                let data_ty = self.with(|this| this.info(data))??.ty.clone();
                let ty = self.with(|this| this.lw.ir_type(&data_ty, at))??;
                let place = {
                    let frame = self.clone().place(data);
                    let result = self.nest(frame).await;
                    result
                }?;
                let value = self.with(|this| {
                    this.add(
                        Expression::TensorRead {
                            ty,
                            tensor,
                            coordinates,
                            nontemporal,
                            out_of_bounds,
                        },
                        at,
                    )
                })??;
                self.with(|this| this.store(&place, value, at))??;
                Ok(None)
            }
            TensorArmCall::Write { nontemporal } => {
                let coordinates = {
                    let frame = self.clone().rvalue(argument(1)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                let value = {
                    let frame = self.clone().rvalue(argument(2)?);
                    let result = self.nest(frame).await;
                    result
                }?;
                for extra in arguments.iter().skip(4) {
                    let frame = self.clone().rvalue(extra);
                    let _ = self.nest(frame).await?;
                }
                self.with(|this| {
                    this.push(
                        Statement::TensorWrite {
                            tensor,
                            coordinates,
                            value,
                            nontemporal,
                        },
                        at,
                    )
                })?;
                Ok(None)
            }
        }
    }
}
