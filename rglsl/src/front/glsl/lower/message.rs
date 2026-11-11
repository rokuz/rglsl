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

impl<'b, 'l, 'a> super::function::Cx<'b, 'l, 'a> {
    async fn string_value(self, expression: &'b AstExpression, at: Span) -> Result<String> {
        match super::prepass::strip(expression).kind {
            ExpressionKind::String(ref text) => Ok(text.clone()),
            ExpressionKind::Sequence(ref expressions) => {
                let Some((last, leading)) = expressions.split_last() else {
                    return Err(internal(at));
                };
                for expression in leading {
                    {
                        let frame = self.clone().effect(expression);
                        let result = self.nest(frame).await;
                        result
                    }?;
                }
                {
                    let frame = self.clone().string_value(last, at);
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
        let Some((format, rest)) = arguments.split_first() else {
            return Err(internal(at));
        };
        let ExpressionKind::String(ref format) = format.kind else {
            return Err(internal(at));
        };
        let mut values = Vec::with_capacity(rest.len());
        for argument in rest {
            let ty = &self.with(|this| this.info(argument))??.ty;
            if ty.is_string() {
                let text = {
                    let frame = self.clone().string_value(argument, at);
                    let result = self.nest(frame).await;
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
                let result = self.nest(frame).await;
                result
            }?));
        }
        self.with(|this| {
            this.push(
                Statement::DebugPrintf {
                    format: format.clone(),
                    arguments: values,
                },
                at,
            )
        })?;
        Ok(())
    }

    pub(super) async fn abort(self, arguments: &'b [AstExpression], at: Span) -> Result<()> {
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
        let character = self.with(|this| {
            this.lw.module.types.insert(
                Type {
                    name: None,
                    inner: TypeInner::Scalar(Scalar::I8),
                },
                Span::UNDEFINED,
            )
        })?;
        let text = self.try_with(|this| {
            Ok(this.lw.module.types.insert(
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
            ))
        })?;
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
            let ty = self.with(|this| this.info(argument))??.ty.clone();
            if ty.is_void() {
                return Err(unsupported("a `void` argument of `abortEXT`", at));
            }
            let (value, ty) = if ty.scalar_type() == Some(GlslScalar::Bool) {
                let value = {
                    let frame = self.clone().rvalue(argument);
                    let result = self.nest(frame).await;
                    result
                }?;
                let unsigned = ty.with_scalar(GlslScalar::Uint);
                let one = self.with(|this| this.filled(&unsigned, Literal::U32(1), at))??;
                let zero = self.with(|this| this.filled(&unsigned, Literal::U32(0), at))??;
                let value = self.with(|this| {
                    this.add(
                        Expression::Select {
                            condition: value,
                            accept: one,
                            reject: zero,
                        },
                        at,
                    )
                })??;
                (value, unsigned)
            } else {
                (
                    {
                        let frame = self.clone().rvalue(argument);
                        let result = self.nest(frame).await;
                        result
                    }?,
                    ty,
                )
            };
            let plain = self.with(|this| this.lw.ir_type(&ty, at))??;
            let (laid, layout) =
                self.with(|this| this.lw.laid_out(&ty, plain, Packing::Scalar, false, at))??;
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
        let ty = self.with(|this| {
            this.lw.module.types.insert(
                Type {
                    name: Some(String::from(ABORT_MESSAGE_TYPE)),
                    inner: TypeInner::Struct {
                        members,
                        span: alignment.round_up(offset),
                    },
                },
                Span::UNDEFINED,
            )
        })?;
        self.with(|this| {
            this.push(
                Statement::Abort {
                    message,
                    ty,
                    arguments: values,
                },
                at,
            )
        })?;
        Ok(())
    }
}
