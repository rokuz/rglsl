use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{Expression as AstExpression, ExpressionKind};
use rglsl_sema::types::Scalar as GlslScalar;

use super::function::FunctionLowerer;
use super::types::matrix_layout;
use super::{internal, unsupported, Packing, Result};
use crate::proc::Alignment;
use crate::{
    ArraySize, DebugPrintfArgument, Expression, Literal, Scalar, Span, Statement, StructMember,
    Type, TypeInner,
};

const ABORT_MESSAGE_TYPE: &str = "abortMessageLoadType";

impl FunctionLowerer<'_, '_> {}

#[allow(clippy::await_holding_refcell_ref)]
impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    async fn string_value(self, expression: &'b AstExpression, at: Span) -> Result<String> {
        let mut this = self.lowerer();
        match super::prepass::strip(expression).kind {
            ExpressionKind::String(ref text) => Ok(text.clone()),
            ExpressionKind::Sequence(ref expressions) => {
                let Some((last, leading)) = expressions.split_last() else {
                    return Err(internal(at));
                };
                for expression in leading {
                    {
                        let frame = self.clone().effect(expression);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?;
                }
                {
                    let frame = self.clone().string_value(last, at);
                    drop(this);
                    let result = self.nest(frame).await;
                    result
                }
            }
            _ => Err(unsupported(
                "a `debugPrintfEXT` string argument that is not a string literal",
                at,
            )),
        }
    }

    pub(super) async fn debug_printf(self, arguments: &'b [AstExpression], at: Span) -> Result<()> {
        let mut this = self.lowerer();
        let Some((format, rest)) = arguments.split_first() else {
            return Err(internal(at));
        };
        let ExpressionKind::String(ref format) = format.kind else {
            return Err(internal(at));
        };
        let mut values = Vec::with_capacity(rest.len());
        for argument in rest {
            let ty = &this.info(argument)?.ty;
            if ty.is_string() {
                let text = {
                    let frame = self.clone().string_value(argument, at);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                values.push(DebugPrintfArgument::String(text));
                continue;
            }
            if ty.is_void() {
                return Err(unsupported("a `void` argument of `debugPrintfEXT`", at));
            }
            values.push(DebugPrintfArgument::Value({
                let frame = self.clone().rvalue(argument);
                drop(this);
                let result = self.nest(frame).await;
                this = self.lowerer();
                result
            }?));
        }
        this.push(
            Statement::DebugPrintf {
                format: format.clone(),
                arguments: values,
            },
            at,
        );
        Ok(())
    }

    pub(super) async fn abort(self, arguments: &'b [AstExpression], at: Span) -> Result<()> {
        let mut this = self.lowerer();
        let (message, rest) = match arguments.split_first() {
            Some((first, rest)) => match first.kind {
                ExpressionKind::String(ref text) => (text.clone(), rest),
                _ => return Err(internal(at)),
            },
            None => (String::new(), arguments),
        };
        let mut values = Vec::with_capacity(rest.len());
        let mut members = Vec::with_capacity(rest.len() + 1);
        let length = crate::valid::abort_message_length(&message);
        let character = this.lw.module.types.insert(
            Type {
                name: None,
                inner: TypeInner::Scalar(Scalar::I8),
            },
            Span::UNDEFINED,
        );
        let text = this.lw.module.types.insert(
            Type {
                name: None,
                inner: TypeInner::Array {
                    base: character,
                    size: ArraySize::Constant(
                        core::num::NonZeroU32::new(length).ok_or_else(|| internal(at))?,
                    ),
                    stride: 1,
                },
            },
            Span::UNDEFINED,
        );
        members.push(StructMember {
            name: None,
            ty: text,
            binding: None,
            offset: 0,
            matrix_layout: None,
            xfb_offset: None,
            heap: None,
            memory_decorations: crate::MemoryDecorations::empty(),
            relaxed_precision: false,
        });
        let mut offset = length;
        let mut alignment = Alignment::ONE;
        for argument in rest {
            let ty = this.info(argument)?.ty.clone();
            if ty.is_void() {
                return Err(unsupported("a `void` argument of `abortEXT`", at));
            }
            let (value, ty) = if ty.scalar_type() == Some(GlslScalar::Bool) {
                let value = {
                    let frame = self.clone().rvalue(argument);
                    drop(this);
                    let result = self.nest(frame).await;
                    this = self.lowerer();
                    result
                }?;
                let unsigned = ty.with_scalar(GlslScalar::Uint);
                let one = this.filled(&unsigned, Literal::U32(1), at)?;
                let zero = this.filled(&unsigned, Literal::U32(0), at)?;
                let value = this.add(
                    Expression::Select {
                        condition: value,
                        accept: one,
                        reject: zero,
                    },
                    at,
                )?;
                (value, unsigned)
            } else {
                (
                    {
                        let frame = self.clone().rvalue(argument);
                        drop(this);
                        let result = self.nest(frame).await;
                        this = self.lowerer();
                        result
                    }?,
                    ty,
                )
            };
            let plain = this.lw.ir_type(&ty, at)?;
            let (laid, layout) = this.lw.laid_out(&ty, plain, Packing::Scalar, false, at)?;
            let member_alignment = Alignment::new(layout.alignment).ok_or_else(|| internal(at))?;
            offset = member_alignment.round_up(offset);
            alignment = alignment.max(member_alignment);
            members.push(StructMember {
                name: None,
                ty: laid,
                binding: None,
                offset,
                matrix_layout: matrix_layout(&layout),
                xfb_offset: None,
                heap: None,
                memory_decorations: crate::MemoryDecorations::empty(),
                relaxed_precision: false,
            });
            offset = offset
                .checked_add(layout.size)
                .ok_or_else(|| internal(at))?;
            values.push(value);
        }
        let ty = this.lw.module.types.insert(
            Type {
                name: Some(String::from(ABORT_MESSAGE_TYPE)),
                inner: TypeInner::Struct {
                    members,
                    span: alignment.round_up(offset),
                },
            },
            Span::UNDEFINED,
        );
        this.push(
            Statement::Abort {
                message,
                ty,
                arguments: values,
            },
            at,
        );
        Ok(())
    }
}
