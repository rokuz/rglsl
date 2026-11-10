use rglsl_ast::ast::Expression as AstExpression;

use super::function::FunctionLowerer;
use super::types::scalar;
use super::{internal, Result};
use crate::{AtomicFunction, Expression, Handle, PredeclaredType, Span, Statement, TypeInner};

pub(super) const fn atomic_function(name: &str) -> Option<AtomicFunction> {
    Some(match name.as_bytes() {
        b"atomicAdd" => AtomicFunction::Add,
        b"atomicMin" => AtomicFunction::Min,
        b"atomicMax" => AtomicFunction::Max,
        b"atomicAnd" => AtomicFunction::And,
        b"atomicOr" => AtomicFunction::InclusiveOr,
        b"atomicXor" => AtomicFunction::ExclusiveOr,
        b"atomicExchange" => AtomicFunction::Exchange { compare: None },
        _ => return None,
    })
}

impl FunctionLowerer<'_, '_> {
    pub(super) fn atomic(
        &mut self,
        name: &str,
        arguments: &[AstExpression],
        at: Span,
    ) -> Result<Handle<Expression>> {
        let (memory, rest) = arguments.split_first().ok_or_else(|| internal(at))?;
        let memory_ty = self.info(memory)?.ty.clone();
        let element = memory_ty.scalar_type().ok_or_else(|| internal(at))?;
        let element = scalar(element);
        let place = self.place(memory)?;
        let mut operands = alloc::vec::Vec::with_capacity(rest.len());
        for argument in rest {
            let (value, ty) = self.typed(argument)?;
            operands.push(self.convert(value, &ty, &memory_ty, at)?);
        }
        let (fun, value, comparison) = match (atomic_function(name), operands.as_slice()) {
            (Some(fun), &[value]) => (fun, value, false),
            (None, &[compare, value]) if name == "atomicCompSwap" => (
                AtomicFunction::Exchange {
                    compare: Some(compare),
                },
                value,
                true,
            ),
            _ => return Err(internal(at)),
        };
        let ty = if comparison {
            self.lw.module.generate_predeclared_type(
                PredeclaredType::AtomicCompareExchangeWeakResult(element),
            )
        } else {
            self.lw.insert_type(TypeInner::Scalar(element))
        };
        let emitted = self.emitter.finish(&self.expressions);
        self.block.extend(emitted);
        let result = self.unemitted(Expression::AtomicResult { ty, comparison }, at);
        self.block.push(
            Statement::Atomic {
                pointer: place.pointer,
                fun,
                value,
                result: Some(result),
            },
            at,
        );
        self.emitter.start(&self.expressions);
        if comparison {
            self.add(
                Expression::AccessIndex {
                    base: result,
                    index: 0,
                },
                at,
            )
        } else {
            Ok(result)
        }
    }
}
