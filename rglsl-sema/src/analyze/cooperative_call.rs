use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::Expression;
use rglsl_ast::Span;

use super::qcom::QcomConversion;
use super::{Analyzer, Callee, Operand};
use crate::constant::Value;
use crate::diagnostic::DiagnosticKind;
use crate::scope::Storage;
use crate::types::{CooperativeUse, Scalar, Type, TypeKind};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum CooperativeCall {
    Load { nv: bool },
    Store { nv: bool },
    MulAdd { nv: bool, saturating: bool },
    VectorLoad,
    VectorStore,
    VectorMatMul { bias: bool },
    VectorOuterProduct,
    VectorReduceSum,
    SaturatedConvert,
    Qcom(QcomConversion),
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
            | "coopVecLoadNV"
            | "coopVecStoreNV"
            | "coopVecMatMulNV"
            | "coopVecMatMulAddNV"
            | "coopVecOuterProductAccumulateNV"
            | "coopVecReduceSumAccumulateNV"
            | "saturatedConvertEXT"
            | "bitcastQCOM"
            | "extractSubArrayQCOM"
            | "vectorToCoopmatQCOM"
            | "coopmatToVectorQCOM"
    )
}

const SATURATING_ACCUMULATION: i64 = 0x10;

const fn buffer_scalar(nv: bool, floating: bool, load: bool, scalar: Scalar, vector: bool) -> bool {
    let integer = matches!(
        scalar,
        Scalar::Int8 | Scalar::Int16 | Scalar::Int | Scalar::Int64
    );
    let unsigned = matches!(
        scalar,
        Scalar::Uint8 | Scalar::Uint16 | Scalar::Uint | Scalar::Uint64
    );
    if !nv {
        return integer
            || unsigned
            || matches!(
                scalar,
                Scalar::Float
                    | Scalar::Float16
                    | Scalar::BFloat16
                    | Scalar::FloatE5M2
                    | Scalar::FloatE4M3
                    | Scalar::Double
            );
    }
    if !floating {
        return if vector {
            matches!(scalar, Scalar::Int | Scalar::Uint)
        } else {
            integer || unsigned
        };
    }
    if vector {
        return matches!(scalar, Scalar::Uint);
    }
    unsigned
        || matches!(scalar, Scalar::Float16 | Scalar::Float)
        || (!load && matches!(scalar, Scalar::Double))
}

type VectorArguments = (
    CooperativeCall,
    &'static [usize],
    &'static [usize],
    &'static [usize],
    &'static [(usize, &'static str)],
);

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

    pub(crate) fn cooperative_call_with(
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
        if let Some(conversion) = super::qcom::conversion(name) {
            return self.qcom_conversion(expression, span, name, conversion, arguments, &operands);
        }
        if name == "saturatedConvertEXT" {
            return self.saturated_convert(expression, span, arguments, &operands);
        }
        if name.starts_with("coopVec") {
            return self.cooperative_vector_call(expression, span, name, arguments, &operands);
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
        ) && (operands
            .get(2)
            .and_then(|operand| operand.ty.scalar_type())
            .is_some_and(|scalar| scalar.bits() == 64)
            || (!nv
                && operands.get(1).and_then(|operand| operand.ty.base_scalar())
                    == Some(Scalar::Uint64)));
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
                    TypeKind::Scalar(scalar) => {
                        buffer_scalar(nv, shape.scalar.is_floating(), load, scalar, false)
                    }
                    TypeKind::Vector { scalar, size } => {
                        matches!(size, 2 | 4)
                            && buffer_scalar(nv, shape.scalar.is_floating(), load, scalar, true)
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
        if !matches!(buffer.storage, Storage::Buffer | Storage::Shared) && !buffer.through_reference
        {
            self.cooperative_error(
                span,
                name,
                "only l-values corresponding to storage block or shared variables can be used with cooperative matrix load/store functions",
            );
            return None;
        }
        let narrow = |operand: &Operand| {
            operand.ty.is_scalar_integer()
                && operand
                    .ty
                    .scalar_type()
                    .is_some_and(|scalar| scalar.bits() <= 32)
        };
        let element_valid = if nv {
            narrow(element)
        } else {
            element.ty.is_scalar_integer()
        };
        if !element_valid || !narrow(stride) {
            self.cooperative_error(span, name, "element and stride must be integers");
            return None;
        }
        let element_scalar = element.ty.scalar_type();
        if !nv
            && self.extension_enabled(super::expression::SHADER_64BIT_INDEXING)
            && !matches!(
                element_scalar,
                Some(Scalar::Uint | Scalar::Uint64 | Scalar::Int64)
            )
        {
            self.cooperative_error(
                span,
                name,
                "ambiguous best function under implicit type conversion",
            );
            return None;
        }
        if nv {
            if !layout.ty.is_bool() {
                self.cooperative_error(span, name, "colMajor must be a bool");
                return None;
            }
        } else if !narrow(layout) || layout.ty.scalar_type() == Some(Scalar::Uint) {
            self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
            return None;
        } else if Self::constant_argument(layout).is_none() {
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

    fn require_storage(&mut self, span: Span, name: &str, buffer: &Operand) -> bool {
        let valid_element = buffer
            .ty
            .element_type()
            .filter(|_| buffer.ty.is_array())
            .is_some_and(|ty| {
                !ty.is_array()
                    && match ty.kind {
                        TypeKind::Scalar(scalar) => scalar.is_numeric(),
                        TypeKind::Vector { scalar, .. } => scalar.is_numeric(),
                        _ => false,
                    }
            });
        if !valid_element {
            self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
            return false;
        }
        if !matches!(buffer.storage, Storage::Buffer | Storage::Shared) && !buffer.through_reference
        {
            self.cooperative_error(
                span,
                name,
                "buffer argument must be in buffer or shared storage",
            );
            return false;
        }
        true
    }

    fn cooperative_vector_call(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        arguments: &[Expression],
        operands: &[Operand],
    ) -> Operand {
        let vector = |operand: &Operand| operand.ty.is_cooperative_vector();
        let mismatch = |analyzer: &mut Self| {
            analyzer.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
            Operand::error()
        };
        let (call, offsets, uints, ints, constants): VectorArguments = match name {
            "coopVecLoadNV" | "coopVecStoreNV" => {
                let [value, buffer, offset] = operands else {
                    return mismatch(self);
                };
                if !vector(value) || !offset.ty.is_scalar_integer() {
                    return mismatch(self);
                }
                if !self.require_storage(span, name, buffer) {
                    return Operand::error();
                }
                if name == "coopVecLoadNV" {
                    let first = arguments.first().map_or(span, |argument| argument.span);
                    if !self.require_lvalue(first, value) {
                        return Operand::error();
                    }
                    (CooperativeCall::VectorLoad, &[2], &[], &[], &[])
                } else {
                    (CooperativeCall::VectorStore, &[2], &[], &[], &[])
                }
            }
            "coopVecMatMulNV" | "coopVecMatMulAddNV" => {
                let bias = name == "coopVecMatMulAddNV";
                let expected = if bias { 14 } else { 11 };
                if operands.len() != expected {
                    return mismatch(self);
                }
                let at = |index: usize| operands.get(index);
                if !at(0).is_some_and(vector) || !at(1).is_some_and(vector) {
                    return mismatch(self);
                }
                let first = arguments.first().map_or(span, |argument| argument.span);
                if let Some(result) = at(0) {
                    if !self.require_lvalue(first, result) {
                        return Operand::error();
                    }
                }
                if let Some(matrix) = at(3) {
                    if !self.require_storage(span, name, matrix) {
                        return Operand::error();
                    }
                }
                if bias {
                    if let Some(bias) = at(6) {
                        if !self.require_storage(span, name, bias) {
                            return Operand::error();
                        }
                    }
                }
                let constants: &[(usize, &'static str)] = if bias {
                    &[
                        (2, "inputInterpretation"),
                        (5, "matrixInterpretation"),
                        (8, "biasInterpretation"),
                        (9, "M"),
                        (10, "K"),
                        (11, "matrixLayout"),
                        (12, "transpose"),
                    ]
                } else {
                    &[
                        (2, "inputInterpretation"),
                        (5, "matrixInterpretation"),
                        (6, "M"),
                        (7, "K"),
                        (8, "matrixLayout"),
                        (9, "transpose"),
                    ]
                };
                let (offsets, uints, ints): (&[usize], &[usize], &[usize]) = if bias {
                    (&[4, 7], &[9, 10, 13], &[2, 5, 8, 11])
                } else {
                    (&[4], &[6, 7, 10], &[2, 5, 8])
                };
                (
                    CooperativeCall::VectorMatMul { bias },
                    offsets,
                    uints,
                    ints,
                    constants,
                )
            }
            "coopVecOuterProductAccumulateNV" => {
                let [a, b, buffer, _, _, _, _] = operands else {
                    return mismatch(self);
                };
                if !vector(a) || !vector(b) {
                    return mismatch(self);
                }
                if a.ty.base_scalar() != b.ty.base_scalar() {
                    self.cooperative_error(span, name, "cooperative vector basic types must match");
                    return Operand::error();
                }
                if !self.require_storage(span, name, buffer) {
                    return Operand::error();
                }
                (
                    CooperativeCall::VectorOuterProduct,
                    &[3],
                    &[4],
                    &[5, 6],
                    &[(5, "matrixLayout"), (6, "matrixInterpretation")],
                )
            }
            _ => {
                let [value, buffer, offset] = operands else {
                    return mismatch(self);
                };
                if !vector(value) || !offset.ty.is_scalar_integer() {
                    return mismatch(self);
                }
                if !self.require_storage(span, name, buffer) {
                    return Operand::error();
                }
                (CooperativeCall::VectorReduceSum, &[2], &[], &[], &[])
            }
        };
        let mut failed = false;
        for &(index, parameter) in constants {
            let constant = operands.get(index).is_some_and(|operand| operand.constant);
            if !constant {
                let at = arguments.get(index).map_or(span, |argument| argument.span);
                self.cooperative_error(at, parameter, "argument must be compile-time constant");
                failed = true;
            }
        }
        if failed {
            return Operand::error();
        }
        let mut wide = false;
        for &index in offsets {
            let (Some(argument), Some(operand)) = (arguments.get(index), operands.get(index))
            else {
                return mismatch(self);
            };
            match operand.ty.scalar_type() {
                Some(Scalar::Uint64) => wide = true,
                Some(Scalar::Uint) => {}
                Some(scalar) if scalar.is_integer() => {
                    self.record_conversion(argument, &operand.ty, &Type::UINT);
                }
                _ => return mismatch(self),
            }
        }
        let typed: Vec<(usize, Type)> = uints
            .iter()
            .map(|&index| (index, Type::UINT))
            .chain(ints.iter().map(|&index| (index, Type::INT)))
            .collect();
        for (index, target) in typed {
            let (Some(argument), Some(operand)) = (arguments.get(index), operands.get(index))
            else {
                return mismatch(self);
            };
            if !operand.ty.is_scalar_integer() {
                return mismatch(self);
            }
            self.record_conversion(argument, &operand.ty, &target);
        }
        let required = if wide {
            "GL_EXT_shader_64bit_indexing"
        } else {
            "GL_NV_cooperative_vector"
        };
        if !self.require_extension(span, required, name) {
            return Operand::error();
        }
        self.calls.insert(expression.id, Callee::Cooperative(call));
        Operand::temporary(Type::VOID)
    }

    fn saturated_convert(
        &mut self,
        expression: &Expression,
        span: Span,
        arguments: &[Expression],
        operands: &[Operand],
    ) -> Operand {
        let name = "saturatedConvertEXT";
        let [target, source] = operands else {
            return self.cooperative_error(span, name, "requires exactly two parameters");
        };
        let float8 = |ty: &Type| {
            ty.base_scalar()
                .is_some_and(|scalar| matches!(scalar, Scalar::FloatE4M3 | Scalar::FloatE5M2))
        };
        if !float8(&target.ty) {
            return self.cooperative_error(
                span,
                name,
                "first parameter must have floate5m2 or floate4m3 basic type",
            );
        }
        if float8(&source.ty) {
            return self.cooperative_error(
                span,
                name,
                "second parameter must not have floate5m2 or floate4m3 basic type",
            );
        }
        let shape_matches = match (
            target.ty.as_cooperative_matrix(),
            source.ty.as_cooperative_matrix(),
        ) {
            (Some(left), Some(right)) => {
                left.scope == right.scope
                    && left.rows == right.rows
                    && left.columns == right.columns
            }
            (None, None) => {
                target.ty.same_shape(&source.ty) && source.ty.is_numeric() && !source.ty.is_bool()
            }
            _ => false,
        };
        if !shape_matches {
            return self.cooperative_error(
                span,
                name,
                "types must match other than scalar type and coopmat Use",
            );
        }
        let first = arguments.first().map_or(span, |argument| argument.span);
        if !self.require_lvalue(first, target) {
            return Operand::error();
        }
        self.calls.insert(
            expression.id,
            Callee::Cooperative(CooperativeCall::SaturatedConvert),
        );
        Operand::temporary(Type::VOID)
    }
}
