use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::Expression;
use rglsl_ast::Span;

use super::{Analyzer, Callee, Operand};
use crate::builtins::{TENSOR_OPERAND_NONTEMPORAL, TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE};
use crate::diagnostic::DiagnosticKind;
use crate::scope::Qualifiers;
use crate::types::{ArraySize, Scalar, Type};

const EXTENSION: &str = "GL_ARM_tensors";

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TensorArmCall {
    Read {
        nontemporal: bool,
        out_of_bounds: bool,
    },
    Write {
        nontemporal: bool,
    },
    Size {
        dimension: u32,
    },
}

pub(crate) fn tensor_arm_function(name: &str) -> bool {
    matches!(name, "tensorReadARM" | "tensorWriteARM" | "tensorSizeARM")
}

const fn tensor_element(scalar: Scalar) -> bool {
    matches!(
        scalar,
        Scalar::Bool
            | Scalar::Int8
            | Scalar::Int16
            | Scalar::Int
            | Scalar::Int64
            | Scalar::Uint8
            | Scalar::Uint16
            | Scalar::Uint
            | Scalar::Uint64
            | Scalar::Float16
            | Scalar::Float
            | Scalar::Double
            | Scalar::BFloat16
            | Scalar::FloatE5M2
            | Scalar::FloatE4M3
    )
}

fn data_scalar(ty: &Type) -> Option<Scalar> {
    let element = match ty.dimensions() {
        [] => ty.clone(),
        [ArraySize::Sized(_) | ArraySize::Specialized(_)] => ty.element_type()?,
        _ => return None,
    };
    element
        .scalar_type()
        .filter(|scalar| tensor_element(*scalar))
}

fn coordinate_count(ty: &Type) -> Option<u32> {
    match ty.dimensions() {
        [count] if ty.element_type()? == Type::UINT => Some(count.checked_size()),
        _ => None,
    }
}

fn formal_qualifiers(readonly: bool, writeonly: bool) -> Qualifiers {
    Qualifiers {
        readonly,
        writeonly,
        ..Qualifiers::default()
    }
}

fn constant_value(operand: &Operand) -> Option<i64> {
    if !operand.constant || operand.specialization {
        return None;
    }
    operand.value.as_ref()?.first()?.as_i64()
}

impl Analyzer<'_> {
    fn tensor_error(&mut self, span: Span, subject: &str, reason: &'static str) {
        self.error(
            span,
            DiagnosticKind::InvalidCooperativeCall {
                function: String::from(subject),
                reason,
            },
        );
    }

    pub(crate) fn tensor_arm_call_with(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        arguments: &[Expression],
        operands: Vec<Operand>,
    ) -> Operand {
        if operands.iter().any(|operand| operand.ty.is_error()) {
            return Operand::error();
        }
        let first_argument = arguments.first().map_or(span, |argument| argument.span);
        let call = if name == "tensorSizeARM" {
            self.tensor_size(span, first_argument, name, &operands)
        } else {
            self.tensor_access(span, first_argument, name, arguments, &operands)
        };
        let Some((call, result)) = call else {
            return Operand::error();
        };
        self.calls.insert(expression.id, Callee::TensorArm(call));
        Operand::temporary(result)
    }

    fn no_tensor_overload(&mut self, span: Span, name: &str) -> Option<(TensorArmCall, Type)> {
        self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
        None
    }

    fn converts_to_uint(&self, operand: &Operand) -> bool {
        operand.ty.is_scalar()
            && operand
                .ty
                .scalar_type()
                .is_some_and(|scalar| scalar.promotes_to(Scalar::Uint, self.numeric_features()))
    }

    fn tensor_size(
        &mut self,
        span: Span,
        first_argument: Span,
        name: &str,
        operands: &[Operand],
    ) -> Option<(TensorArmCall, Type)> {
        let [tensor, dimension] = operands else {
            return self.no_tensor_overload(span, name);
        };
        let Some((_, rank)) = tensor.ty.as_tensor() else {
            return self.no_tensor_overload(span, name);
        };
        if !self.converts_to_uint(dimension) {
            return self.no_tensor_overload(span, name);
        }
        if !self.require_extension(span, EXTENSION, name) {
            return None;
        }
        let formal = formal_qualifiers(true, true);
        let allowed = self.builtin_arguments_allowed(first_argument, operands, 2, &formal);
        let rank = rank.checked_size();
        let Some(value) = constant_value(dimension) else {
            self.tensor_error(span, "dim", "dimension argument must be constant");
            return None;
        };
        let dimension = u32::try_from(value).ok().filter(|value| *value < rank);
        let Some(dimension) = dimension else {
            self.tensor_error(span, "dim", "dimension argument exceeds tensor rank");
            return None;
        };
        allowed.then_some((TensorArmCall::Size { dimension }, Type::UINT))
    }

    fn tensor_access(
        &mut self,
        span: Span,
        first_argument: Span,
        name: &str,
        arguments: &[Expression],
        operands: &[Operand],
    ) -> Option<(TensorArmCall, Type)> {
        let read = name == "tensorReadARM";
        let (Some(tensor), Some(coordinates), Some(data)) =
            (operands.first(), operands.get(1), operands.get(2))
        else {
            return self.no_tensor_overload(span, name);
        };
        let Some((element, rank)) = tensor.ty.as_tensor() else {
            return self.no_tensor_overload(span, name);
        };
        let rank = rank.checked_size();
        let (Some(count), Some(data_scalar)) =
            (coordinate_count(&coordinates.ty), data_scalar(&data.ty))
        else {
            return self.no_tensor_overload(span, name);
        };
        let flags = operands.get(3);
        if flags.is_some_and(|flags| !self.converts_to_uint(flags)) {
            return self.no_tensor_overload(span, name);
        }
        if !self.require_extension(span, EXTENSION, name) {
            return None;
        }
        let formal = formal_qualifiers(read, !read);
        let mut failed = !self.builtin_arguments_allowed(first_argument, operands, 4, &formal);
        if count != rank {
            self.tensor_error(
                span,
                "coord",
                "number of coordinates does not match tensor rank",
            );
            failed = true;
        }
        if data_scalar != element {
            self.tensor_error(
                span,
                "data",
                "data argument type does not match tensor element type",
            );
            failed = true;
        }
        let mut nontemporal = false;
        let mut out_of_bounds = false;
        if let Some(flags) = flags {
            match constant_value(flags) {
                None => {
                    self.tensor_error(
                        span,
                        "tensorOps",
                        "tensor operands argument must be a constant integral expression",
                    );
                    failed = true;
                }
                Some(bits) => {
                    nontemporal = bits & i64::from(TENSOR_OPERAND_NONTEMPORAL) != 0;
                    out_of_bounds = bits & i64::from(TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE) != 0;
                }
            }
        }
        if out_of_bounds {
            failed |= !self.tensor_out_of_bounds(span, read, element, operands.get(4));
        }
        if read {
            let at = arguments.get(2).map_or(span, |argument| argument.span);
            if !self.require_lvalue(at, data) {
                failed = true;
            }
        }
        if failed {
            return None;
        }
        let call = if read {
            TensorArmCall::Read {
                nontemporal,
                out_of_bounds,
            }
        } else {
            TensorArmCall::Write { nontemporal }
        };
        Some((call, Type::VOID))
    }

    fn tensor_out_of_bounds(
        &mut self,
        span: Span,
        read: bool,
        element: Scalar,
        value: Option<&Operand>,
    ) -> bool {
        if !read {
            self.tensor_error(
                span,
                "tensorOps",
                "out-of-bounds value is only valid with tensorReadARM",
            );
            return false;
        }
        let Some(value) = value else {
            self.tensor_error(
                span,
                "tensorOps",
                "expecting out-of-bounds value as next argument",
            );
            return false;
        };
        if !value.constant || value.specialization {
            self.tensor_error(
                span,
                "vararg",
                "argument following gl_TensorOperandsOutOfBoundsValueARM must be constant",
            );
            return false;
        }
        if value.ty.scalar_type() != Some(element) {
            self.tensor_error(
                span,
                "vararg",
                "out-of-bounds value type does not match tensor element type",
            );
            return false;
        }
        true
    }

    fn builtin_arguments_allowed(
        &mut self,
        span: Span,
        operands: &[Operand],
        parameters: usize,
        formal: &Qualifiers,
    ) -> bool {
        let mut allowed = true;
        if let Some(qualifiers) = operands
            .first()
            .and_then(|tensor| tensor.root)
            .and_then(|id| self.symbol(id))
            .and_then(|symbol| symbol.variable())
            .map(|variable| variable.qualifiers.clone())
        {
            for qualifier in qualifiers.dropped_memory_qualifiers(formal) {
                self.tensor_error(
                    span,
                    qualifier,
                    "argument cannot drop memory qualifier when passed to formal parameter",
                );
                allowed = false;
            }
        }
        let reason = "{} types can only be in uniform block or buffer storage";
        for operand in operands.iter().take(parameters) {
            allowed &=
                self.require_small_arithmetic(span, &operand.ty, "built-in function", reason);
        }
        allowed
    }
}
