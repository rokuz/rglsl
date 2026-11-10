use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::Expression;
use rglsl_ast::Span;

use super::{Analyzer, Callee, Operand};
use crate::constant::Value;
use crate::diagnostic::DiagnosticKind;
use crate::types::{CooperativeUse, Scalar, Type, TypeKind};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CooperativeCall {
    Load { nv: bool },
    Store { nv: bool },
    MulAdd { nv: bool, saturating: bool },
}

pub(crate) fn cooperative_function(name: &str) -> bool {
    matches!(
        name,
        "coopMatLoad"
            | "coopMatStore"
            | "coopMatMulAdd"
            | "coopMatLoadNV"
            | "coopMatStoreNV"
            | "coopMatMulAddNV"
    )
}

const SATURATING_ACCUMULATION: i64 = 0x10;

impl Analyzer<'_> {
    fn cooperative_error(&mut self, span: Span, name: &str, reason: &'static str) -> Operand {
        self.error(
            span,
            DiagnosticKind::InvalidCooperativeCall {
                function: String::from(name),
                reason,
            },
        );
        Operand::error()
    }

    fn constant_argument(operand: &Operand) -> Option<i64> {
        if !operand.constant || operand.specialization {
            return None;
        }
        operand
            .value
            .as_ref()
            .and_then(|value| value.first())
            .and_then(|value| match value {
                Value::Bool(flag) => Some(i64::from(flag)),
                other => other.as_i64(),
            })
    }

    pub(crate) fn cooperative_call(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        arguments: &[Expression],
    ) -> Operand {
        let operands: Vec<Operand> = arguments
            .iter()
            .map(|argument| self.expression(argument))
            .collect();
        if operands.iter().any(|operand| operand.ty.is_error()) {
            return Operand::error();
        }
        let nv = name.ends_with("NV");
        let extension = if nv {
            "GL_NV_cooperative_matrix"
        } else {
            "GL_KHR_cooperative_matrix"
        };
        let result = match name {
            "coopMatLoad" | "coopMatLoadNV" | "coopMatStore" | "coopMatStoreNV" => {
                let load = name.starts_with("coopMatLoad");
                self.cooperative_memory(span, name, nv, load, arguments, &operands)
            }
            _ => self.cooperative_mul_add(span, name, nv, &operands),
        };
        let Some((call, result)) = result else {
            return Operand::error();
        };
        let wide_index = matches!(
            call,
            CooperativeCall::Load { .. } | CooperativeCall::Store { .. }
        ) && operands
            .get(2)
            .and_then(|operand| operand.ty.scalar_type())
            .is_some_and(|scalar| scalar.bits() == 64);
        let required = if wide_index {
            "GL_EXT_shader_64bit_indexing"
        } else {
            extension
        };
        if !self.require_extension(span, required, name) {
            return Operand::error();
        }
        self.calls.insert(expression.id, Callee::Cooperative(call));
        Operand::temporary(result)
    }

    fn cooperative_memory(
        &mut self,
        span: Span,
        name: &str,
        nv: bool,
        load: bool,
        arguments: &[Expression],
        operands: &[Operand],
    ) -> Option<(CooperativeCall, Type)> {
        let [matrix, buffer, element, stride, layout] = operands else {
            self.cooperative_error(span, name, "wrong number of arguments");
            return None;
        };
        let Some(shape) = matrix.ty.as_cooperative_matrix() else {
            self.cooperative_error(
                span,
                name,
                "the first argument must be a cooperative matrix",
            );
            return None;
        };
        if (shape.usage == CooperativeUse::Nv) != nv {
            self.cooperative_error(span, name, "wrong kind of cooperative matrix");
            return None;
        }
        let first_argument = arguments.first().map_or(span, |argument| argument.span);
        if load && !self.require_lvalue(first_argument, matrix) {
            return None;
        }
        let element_type = buffer.ty.element_type().filter(|_| buffer.ty.is_array());
        let valid_element = element_type.as_ref().is_some_and(|ty| {
            !ty.is_array()
                && match ty.kind {
                    TypeKind::Scalar(scalar) => scalar.is_numeric(),
                    TypeKind::Vector { scalar, size } => {
                        scalar.is_numeric() && matches!(size, 2 | 4)
                    }
                    _ => false,
                }
        });
        if !valid_element {
            self.cooperative_error(
                span,
                name,
                "the buffer must be an array of numeric elements",
            );
            return None;
        }
        let integer = |operand: &Operand| operand.ty.is_scalar_integer();
        if !integer(element) || !integer(stride) {
            self.cooperative_error(span, name, "element and stride must be integers");
            return None;
        }
        if nv {
            if !layout.ty.is_bool() {
                self.cooperative_error(span, name, "colMajor must be a bool");
                return None;
            }
        } else if !layout.ty.is_scalar_integer() || Self::constant_argument(layout).is_none() {
            let layout_span = arguments.get(4).map_or(span, |argument| argument.span);
            self.cooperative_error(
                layout_span,
                "matrixLayout",
                "argument must be compile-time constant",
            );
            return None;
        }
        if let (Some(argument), true) = (
            arguments.get(3),
            stride.ty.scalar_type() != Some(Scalar::Uint),
        ) {
            self.record_conversion(argument, &stride.ty, &Type::UINT);
        }
        let call = if load {
            CooperativeCall::Load { nv }
        } else {
            CooperativeCall::Store { nv }
        };
        Some((call, Type::VOID))
    }

    fn cooperative_mul_add(
        &mut self,
        span: Span,
        name: &str,
        nv: bool,
        operands: &[Operand],
    ) -> Option<(CooperativeCall, Type)> {
        let (matrices, operand_flags) = match operands {
            [a, b, c] => ([a, b, c], None),
            [a, b, c, flags] if !nv => ([a, b, c], Some(flags)),
            _ => {
                self.cooperative_error(span, name, "wrong number of arguments");
                return None;
            }
        };
        let c_type = matrices[2].ty.clone();
        let shapes = matrices.map(|operand| operand.ty.as_cooperative_matrix());
        let [Some(a), Some(b), Some(c)] = shapes else {
            self.cooperative_error(span, name, "the arguments must be cooperative matrices");
            return None;
        };
        if [a, b, c]
            .iter()
            .any(|shape| (shape.usage == CooperativeUse::Nv) != nv)
        {
            self.cooperative_error(span, name, "wrong kind of cooperative matrix");
            return None;
        }
        if !nv {
            let expected = [
                (
                    a,
                    CooperativeUse::A,
                    "coop matrix A in MulAdd operation has incompatible usage property",
                ),
                (
                    b,
                    CooperativeUse::B,
                    "coop matrix B in MulAdd operation has incompatible usage property",
                ),
                (
                    c,
                    CooperativeUse::Accumulator,
                    "coop matrix C in MulAdd operation has incompatible usage property",
                ),
            ];
            for (shape, usage, reason) in expected {
                if shape.usage != usage {
                    self.cooperative_error(span, name, reason);
                    return None;
                }
            }
        }
        if a.columns != b.rows || a.rows != c.rows {
            self.cooperative_error(
                span,
                name,
                "cannot multiply coop matrices with incompatible sizes",
            );
            return None;
        }
        if b.columns != c.columns {
            self.cooperative_error(
                span,
                name,
                "cannot add coop matrices with incompatible sizes",
            );
            return None;
        }
        if a.scope != b.scope || a.scope != c.scope {
            self.cooperative_error(span, name, "cooperative matrix scopes must match");
            return None;
        }
        if nv && (a.scalar != b.scalar || a.scalar.is_floating() != c.scalar.is_floating()) {
            self.cooperative_error(span, name, "cooperative matrix component types must match");
            return None;
        }
        let saturating = match operand_flags {
            Some(flags) => {
                let Some(value) = Self::constant_argument(flags) else {
                    self.cooperative_error(
                        span,
                        "matrixOperands",
                        "argument must be compile-time constant",
                    );
                    return None;
                };
                value & SATURATING_ACCUMULATION != 0
            }
            None => false,
        };
        Some((CooperativeCall::MulAdd { nv, saturating }, c_type))
    }
}
