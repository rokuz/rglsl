use alloc::string::String;

use rglsl_ast::ast::{BinaryOperator, Expression, Identifier};
use rglsl_ast::extensions::names;
use rglsl_ast::Span;

use super::{Analyzer, Operand, Place};
use crate::constant::{Constant, Value};
use crate::diagnostic::DiagnosticKind;
use crate::scope::Storage;
use crate::types::{BlockId, Scalar, Type};

fn address(operand: &Operand) -> Option<u64> {
    if !operand.constant {
        return None;
    }
    match operand.value.as_ref()?.first()? {
        Value::Uint64(value) => Some(value),
        _ => None,
    }
}

fn offset(operand: &Operand) -> Option<i64> {
    if !operand.constant {
        return None;
    }
    operand.value.as_ref()?.scalar_i64()
}

impl Analyzer<'_> {
    pub(crate) fn reference_element_size(&self, block: BlockId) -> Option<u32> {
        self.types.block(block)?.reference?.element_size()
    }

    fn reference_has_unsized_array(&self, block: BlockId) -> bool {
        self.types
            .block(block)
            .is_some_and(|block| block.contains_unsized_array(&self.types))
    }

    pub(crate) fn reference_field(
        &mut self,
        base: &Operand,
        block: BlockId,
        field: &Identifier,
    ) -> Operand {
        let member = self
            .types
            .block(block)
            .and_then(|declared| declared.member(&field.node))
            .map(|(_, member)| member.clone());
        let Some(member) = member else {
            self.error(
                field.span,
                DiagnosticKind::NoSuchField {
                    ty: self.show(&base.ty),
                    field: field.node.clone(),
                },
            );
            return Operand::error();
        };
        let place = if member.qualifiers.readonly {
            Place::ReadOnly("it is read-only")
        } else {
            Place::Writable
        };
        Operand {
            ty: member.ty,
            constant: false,
            value: None,
            place,
            root: None,
            storage: Storage::Buffer,
            specialization: false,
            writeonly: member.qualifiers.writeonly,
            through_reference: true,
            non_uniform: base.non_uniform,
        }
    }

    fn reference_offset_value(
        &self,
        block: BlockId,
        base: Option<u64>,
        index: Option<i64>,
        negate: bool,
    ) -> Option<Constant> {
        let size = i64::from(self.reference_element_size(block)?);
        let delta = index?.wrapping_mul(size);
        let delta = if negate { delta.wrapping_neg() } else { delta };
        Some(Constant::single(Value::Uint64(
            base?.wrapping_add(delta as u64),
        )))
    }

    pub(crate) fn reference_index(
        &mut self,
        span: Span,
        base: &Operand,
        block: BlockId,
        index: &Operand,
        index_expression: &Expression,
    ) -> Operand {
        self.require_extension(span, names::BUFFER_REFERENCE2, "buffer reference indexing");
        if self.reference_has_unsized_array(block) {
            self.error(
                span,
                DiagnosticKind::NotIndexable(String::from(
                    "a reference to a buffer containing an unsized array",
                )),
            );
            return Operand::error();
        }
        if index.ty.is_error() {
            return Operand::error();
        }
        if !index.ty.is_scalar_integer() {
            self.error(
                index_expression.span,
                DiagnosticKind::IndexNotInteger(self.show(&index.ty)),
            );
            return Operand::error();
        }
        let constant = base.constant && index.constant;
        let value = if constant {
            self.reference_offset_value(block, address(base), offset(index), false)
        } else {
            None
        };
        Operand {
            constant,
            value,
            non_uniform: base.non_uniform || index.non_uniform,
            ..Operand::temporary(base.ty.clone())
        }
    }

    pub(crate) fn reference_binary(
        &mut self,
        span: Span,
        operator: BinaryOperator,
        left: &Operand,
        right: &Operand,
    ) -> Operand {
        let invalid = |analyzer: &mut Self| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidOperands {
                    operator: operator.symbol(),
                    left: analyzer.show(&left.ty),
                    right: analyzer.show(&right.ty),
                },
            );
            Operand::error()
        };
        if matches!(operator, BinaryOperator::Equal | BinaryOperator::NotEqual) {
            return invalid(self);
        }
        if !matches!(operator, BinaryOperator::Add | BinaryOperator::Subtract) {
            return invalid(self);
        }
        if left.ty.is_reference() || right.ty.is_reference() {
            self.require_extension(span, names::BUFFER_REFERENCE2, "buffer reference math");
        }
        let unsized_operand = [left, right].iter().any(|operand| {
            operand
                .ty
                .as_reference()
                .is_some_and(|block| self.reference_has_unsized_array(block))
        });
        if unsized_operand {
            return invalid(self);
        }
        let constant = left.constant && right.constant;
        let subtract = operator == BinaryOperator::Subtract;
        match (left.ty.as_reference(), right.ty.as_reference()) {
            (Some(block), None) if right.ty.is_scalar_integer() => {
                let value = if constant {
                    self.reference_offset_value(block, address(left), offset(right), subtract)
                } else {
                    None
                };
                Operand {
                    constant,
                    value,
                    ..Operand::temporary(left.ty.clone())
                }
            }
            (None, Some(block)) if !subtract && left.ty.is_scalar_integer() => {
                let value = if constant {
                    self.reference_offset_value(block, address(right), offset(left), false)
                } else {
                    None
                };
                Operand {
                    constant,
                    value,
                    ..Operand::temporary(right.ty.clone())
                }
            }
            (Some(block), Some(_)) if subtract => {
                let size = self.reference_element_size(block).map(i64::from);
                let value = match (address(left), address(right), size) {
                    (Some(first), Some(second), Some(size)) if constant && size != 0 => {
                        let difference = (first as i64).wrapping_sub(second as i64);
                        Some(Constant::single(Value::Int64(
                            difference.wrapping_div(size),
                        )))
                    }
                    _ => None,
                };
                Operand {
                    constant: value.is_some(),
                    value,
                    ..Operand::temporary(Type::scalar(Scalar::Int64))
                }
            }
            _ => invalid(self),
        }
    }

    pub(crate) fn reference_compound(
        &mut self,
        span: Span,
        operator: BinaryOperator,
        target: &Operand,
        value: &Operand,
    ) -> Operand {
        let cannot = |analyzer: &mut Self| {
            analyzer.error(
                span,
                DiagnosticKind::CannotConvert {
                    from: analyzer.show(&value.ty),
                    to: analyzer.show(&target.ty),
                },
            );
            Operand::error()
        };
        if !matches!(operator, BinaryOperator::Add | BinaryOperator::Subtract) {
            return cannot(self);
        }
        self.require_extension(
            span,
            names::BUFFER_REFERENCE2,
            "+= and -= on a buffer reference",
        );
        let unsized_target = target
            .ty
            .as_reference()
            .is_some_and(|block| self.reference_has_unsized_array(block));
        if unsized_target || !value.ty.is_scalar_integer() {
            return cannot(self);
        }
        Operand::temporary(target.ty.clone())
    }

    pub(crate) fn reference_constructor(
        &mut self,
        span: Span,
        target: &Type,
        operands: &[Operand],
    ) -> Option<Operand> {
        let argument = match operands {
            [argument] => argument,
            _ if target.is_reference() => {
                self.error(
                    span,
                    DiagnosticKind::InvalidConstructor {
                        ty: self.show(target),
                        reason: "a reference is constructed from one argument",
                    },
                );
                return Some(Operand::error());
            }
            _ => return None,
        };
        let fail = |analyzer: &mut Self, reason| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidConstructor {
                    ty: analyzer.show(target),
                    reason,
                },
            );
            Some(Operand::error())
        };
        let value = argument.value.clone().filter(|_| argument.constant);
        if target.is_reference() {
            let from_uvec2 = argument.ty == Type::vector(Scalar::Uint, 2);
            let value = if argument.ty.is_reference() || argument.ty == Type::scalar(Scalar::Uint64)
            {
                value.map(|constant| constant.convert(Scalar::Uint64))
            } else if from_uvec2 {
                self.require_extension(
                    span,
                    names::BUFFER_REFERENCE_UVEC2,
                    "uvec2 conversion to reference",
                );
                value.and_then(|constant| match constant.values.as_slice() {
                    [Value::Uint(low), Value::Uint(high)] => Some(Constant::single(Value::Uint64(
                        u64::from(*low) | (u64::from(*high) << 32),
                    ))),
                    _ => None,
                })
            } else {
                return fail(
                    self,
                    "a reference is constructed from a reference, a uint64_t or a uvec2",
                );
            };
            return Some(Operand {
                constant: value.is_some(),
                value,
                ..Operand::temporary(target.clone())
            });
        }
        if !argument.ty.is_reference() {
            return None;
        }
        let address = value.and_then(|constant| match constant.first() {
            Some(Value::Uint64(address)) => Some(address),
            _ => None,
        });
        let value = if *target == Type::scalar(Scalar::Uint64) {
            address.map(|address| Constant::single(Value::Uint64(address)))
        } else if *target == Type::vector(Scalar::Uint, 2) {
            self.require_extension(
                span,
                names::BUFFER_REFERENCE_UVEC2,
                "reference conversion to uvec2",
            );
            address.map(|address| {
                Constant::new(alloc::vec![
                    Value::Uint(address as u32),
                    Value::Uint((address >> 32) as u32),
                ])
            })
        } else {
            return fail(self, "a reference converts only to uint64_t or uvec2");
        };
        Some(Operand {
            constant: value.is_some(),
            value,
            ..Operand::temporary(target.clone())
        })
    }
}
