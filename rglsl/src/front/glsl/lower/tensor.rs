use core::num::NonZeroU32;

use rglsl_ast::ast::Expression as AstExpression;
use rglsl_sema::TensorArmCall;
use rglsl_sema::types::ArraySize as GlslArraySize;
use rglsl_types::stack::recurse;

use super::{Lowerer, Result, internal};
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

impl super::function::FunctionLowerer<'_, '_> {
    pub(super) fn tensor_arm_call(
        &mut self,
        kind: TensorArmCall,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Option<Handle<Expression>>> {
        let argument = |index: usize| arguments.get(index).ok_or_else(|| internal(at));
        let tensor = recurse(|| self.rvalue(argument(0)?))?;
        match kind {
            TensorArmCall::Size { dimension } => {
                let size = (self.add(Expression::TensorQuerySize { tensor, dimension }, at))?;
                Ok(Some(size))
            }
            TensorArmCall::Read {
                nontemporal,
                out_of_bounds,
            } => {
                let coordinates = recurse(|| self.rvalue(argument(1)?))?;
                let out_of_bounds = if out_of_bounds {
                    Some(recurse(|| self.rvalue(argument(4)?))?)
                } else {
                    None
                };
                let first_extra = if out_of_bounds.is_some() { 5 } else { 4 };
                for extra in arguments.iter().skip(first_extra) {
                    let _ = recurse(|| self.rvalue(extra))?;
                }
                let data = argument(2)?;
                let data_ty = self.info(data)?.ty.clone();
                let ty = self.ir_type(&data_ty, at)?;
                let place = recurse(|| self.place(data))?;
                let value = (self.add(
                    Expression::TensorRead {
                        ty,
                        tensor,
                        coordinates,
                        nontemporal,
                        out_of_bounds,
                    },
                    at,
                ))?;
                self.store(&place, value, at)?;
                Ok(None)
            }
            TensorArmCall::Write { nontemporal } => {
                let coordinates = recurse(|| self.rvalue(argument(1)?))?;
                let value = recurse(|| self.rvalue(argument(2)?))?;
                for extra in arguments.iter().skip(4) {
                    let _ = recurse(|| self.rvalue(extra))?;
                }
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
