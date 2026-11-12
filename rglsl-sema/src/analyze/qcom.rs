use alloc::string::String;

use rglsl_ast::ast::Expression;
use rglsl_ast::Span;

use super::cooperative_call::CooperativeCall;
use super::{Analyzer, Callee, Operand};
use crate::diagnostic::DiagnosticKind;
use crate::scope::Qualifiers;
use crate::types::{ArraySize, CooperativeUse, Scalar, Type, TypeKind};

pub const COOPERATIVE_MATRIX_CONVERSION: &str = "GL_QCOM_cooperative_matrix_conversion";
pub const IMAGE_PROCESSING: &str = "GL_QCOM_image_processing";
pub const IMAGE_PROCESSING2: &str = "GL_QCOM_image_processing2";
pub const IMAGE_PROCESSING3: &str = "GL_QCOM_image_processing3";
pub const TILE_SHADING: &str = "GL_QCOM_tile_shading";

const SUBGROUP_SCOPE: u32 = 3;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum QcomConversion {
    Bitcast,
    ExtractSubArray,
    VectorToMatrix,
    MatrixToVector,
}

pub(crate) fn conversion(name: &str) -> Option<QcomConversion> {
    Some(match name {
        "bitcastQCOM" => QcomConversion::Bitcast,
        "extractSubArrayQCOM" => QcomConversion::ExtractSubArray,
        "vectorToCoopmatQCOM" => QcomConversion::VectorToMatrix,
        "coopmatToVectorQCOM" => QcomConversion::MatrixToVector,
        _ => return None,
    })
}

pub(crate) fn function_extension(name: &str) -> Option<&'static str> {
    Some(match name {
        "textureWeightedQCOM"
        | "textureBoxFilterQCOM"
        | "textureBlockMatchSADQCOM"
        | "textureBlockMatchSSDQCOM" => IMAGE_PROCESSING,
        "textureBlockMatchWindowSSDQCOM"
        | "textureBlockMatchWindowSADQCOM"
        | "textureBlockMatchGatherSSDQCOM"
        | "textureBlockMatchGatherSADQCOM" => IMAGE_PROCESSING2,
        _ if gather_function(name) => IMAGE_PROCESSING3,
        _ => return None,
    })
}

pub(crate) fn gather_function(name: &str) -> bool {
    name.strip_prefix("textureGather")
        .and_then(|rest| rest.strip_suffix("QCOM"))
        .map(|rest| rest.strip_suffix("Offset").unwrap_or(rest))
        .is_some_and(|mode| matches!(mode, "4x1" | "V2" | "H2" | "D"))
}

pub fn variable_extension(name: &str) -> Option<&'static str> {
    match name {
        "gl_TileOffsetQCOM" | "gl_TileDimensionQCOM" | "gl_TileApronSizeQCOM" => Some(TILE_SHADING),
        _ => None,
    }
}

const BITCAST_ELEMENTS: [Scalar; 4] = [Scalar::Uint, Scalar::Int, Scalar::Float, Scalar::Float16];
const VECTOR_ELEMENTS: [Scalar; 6] = [
    Scalar::Float,
    Scalar::Float16,
    Scalar::Int8,
    Scalar::Uint8,
    Scalar::Uint,
    Scalar::Int,
];

fn scalar_array(ty: &Type, allowed: &[Scalar]) -> Option<(Scalar, ArraySize)> {
    let [size] = ty.dimensions() else {
        return None;
    };
    match ty.kind {
        TypeKind::Scalar(scalar) if allowed.contains(&scalar) => Some((scalar, *size)),
        _ => None,
    }
}

impl Analyzer<'_> {
    pub(crate) fn qcom_layout(&mut self, span: Span, qualifiers: &Qualifiers) {
        for entry in &qualifiers.layout {
            let name = entry.name.to_ascii_lowercase();
            match name.as_str() {
                "tile_attachmentqcom" | "non_coherent_attachment_readqcom" => {
                    self.require_extension(span, TILE_SHADING, "tile shading QCOM");
                }
                "shading_rate_xqcom" | "shading_rate_yqcom" | "shading_rate_zqcom" => {
                    self.require_extension(span, TILE_SHADING, "tile shading QCOM");
                    let Some(value) = entry.value else {
                        continue;
                    };
                    let reason = if name != "shading_rate_zqcom" && value == 0 {
                        Some("must be at least 1")
                    } else if name != "shading_rate_zqcom" && (value < 0 || value.count_ones() != 1)
                    {
                        Some("must be a power of 2")
                    } else if value <= 0 {
                        Some("must be a positive value")
                    } else {
                        None
                    };
                    if let Some(reason) = reason {
                        self.error(
                            span,
                            DiagnosticKind::InvalidQualifier {
                                qualifier: "shading_rate_*QCOM",
                                reason,
                            },
                        );
                    }
                }
                _ => {}
            }
        }
    }

    fn qcom_error(&mut self, span: Span, name: &str, reason: &'static str) -> Operand {
        self.error(
            span,
            DiagnosticKind::InvalidCooperativeCall {
                function: String::from(name),
                reason,
            },
        );
        Operand::error()
    }

    fn no_overload(&mut self, span: Span, name: &str) -> Operand {
        self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
        Operand::error()
    }

    pub(crate) fn qcom_conversion(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        conversion: QcomConversion,
        arguments: &[Expression],
        operands: &[Operand],
    ) -> Operand {
        let checked = match conversion {
            QcomConversion::Bitcast => self.qcom_bitcast(span, name, operands),
            QcomConversion::ExtractSubArray => self.qcom_extract(span, name, arguments, operands),
            QcomConversion::VectorToMatrix => self.qcom_vector_to_matrix(span, name, operands),
            QcomConversion::MatrixToVector => self.qcom_matrix_to_vector(span, name, operands),
        };
        let Some(target) = checked else {
            return Operand::error();
        };
        let (Some(argument), Some(operand)) = (arguments.get(target), operands.get(target)) else {
            return self.no_overload(span, name);
        };
        if !self.require_lvalue(argument.span, operand) {
            return Operand::error();
        }
        if !self.require_extension(span, COOPERATIVE_MATRIX_CONVERSION, name) {
            return Operand::error();
        }
        self.calls.insert(
            expression.id,
            Callee::Cooperative(CooperativeCall::Qcom(conversion)),
        );
        Operand::temporary(Type::VOID)
    }

    fn qcom_bitcast(&mut self, span: Span, name: &str, operands: &[Operand]) -> Option<usize> {
        let [source, target] = operands else {
            self.no_overload(span, name);
            return None;
        };
        let (Some((source_scalar, source_size)), Some((target_scalar, target_size))) = (
            scalar_array(&source.ty, &BITCAST_ELEMENTS),
            scalar_array(&target.ty, &BITCAST_ELEMENTS),
        ) else {
            self.no_overload(span, name);
            return None;
        };
        if let (ArraySize::Sized(source_length), ArraySize::Sized(target_length)) =
            (source_size, target_size)
        {
            let source_bits = u64::from(source_length) * u64::from(source_scalar.bits());
            let target_bits = u64::from(target_length) * u64::from(target_scalar.bits());
            if source_bits != target_bits {
                self.qcom_error(
                    span,
                    name,
                    "source and target arrays have different bit sizes",
                );
                return None;
            }
        }
        Some(1)
    }

    fn qcom_extract(
        &mut self,
        span: Span,
        name: &str,
        arguments: &[Expression],
        operands: &[Operand],
    ) -> Option<usize> {
        let [source, index, target] = operands else {
            self.no_overload(span, name);
            return None;
        };
        let (Some((source_scalar, _)), Some((target_scalar, target_size))) = (
            scalar_array(&source.ty, &BITCAST_ELEMENTS),
            scalar_array(&target.ty, &BITCAST_ELEMENTS),
        ) else {
            self.no_overload(span, name);
            return None;
        };
        if source_scalar != target_scalar || !index.ty.is_scalar_integer() {
            self.no_overload(span, name);
            return None;
        }
        if let Some(argument) = arguments.get(1) {
            self.record_conversion(argument, &index.ty, &Type::UINT);
        }
        if let ArraySize::Sized(length) = target_size {
            if u64::from(length) * u64::from(target_scalar.bits()) == 32 {
                self.qcom_error(span, name, "the byte size of the target array must be 32");
                return None;
            }
        }
        Some(2)
    }

    fn qcom_scope_and_use(
        &mut self,
        span: Span,
        name: &str,
        scope: ArraySize,
        usage: CooperativeUse,
    ) -> bool {
        if scope != ArraySize::Sized(SUBGROUP_SCOPE) {
            self.qcom_error(
                span,
                name,
                "cooperative matrix has unsupported scope; gl_SubgroupScope is expected",
            );
            return false;
        }
        if usage == CooperativeUse::Nv {
            self.qcom_error(
                span,
                name,
                "cooperative matrix use must be one of gl_MatrixUseA, gl_MatrixUseB, gl_MatrixUseAccumulator",
            );
            return false;
        }
        true
    }

    fn qcom_vector_to_matrix(
        &mut self,
        span: Span,
        name: &str,
        operands: &[Operand],
    ) -> Option<usize> {
        let [source, matrix] = operands else {
            self.no_overload(span, name);
            return None;
        };
        let (Some((source_scalar, _)), Some(shape)) = (
            scalar_array(&source.ty, &VECTOR_ELEMENTS),
            matrix
                .ty
                .as_cooperative_matrix()
                .filter(|_| !matrix.ty.is_array()),
        ) else {
            self.no_overload(span, name);
            return None;
        };
        if source_scalar != Scalar::Uint && source_scalar != shape.scalar {
            self.qcom_error(
                span,
                name,
                "source and destination element types are not compatible",
            );
            return None;
        }
        if !self.qcom_scope_and_use(span, name, shape.scope, shape.usage) {
            return None;
        }
        Some(1)
    }

    fn qcom_matrix_to_vector(
        &mut self,
        span: Span,
        name: &str,
        operands: &[Operand],
    ) -> Option<usize> {
        let [matrix, target] = operands else {
            self.no_overload(span, name);
            return None;
        };
        let (Some(shape), Some((target_scalar, target_size))) = (
            matrix
                .ty
                .as_cooperative_matrix()
                .filter(|_| !matrix.ty.is_array()),
            scalar_array(&target.ty, &VECTOR_ELEMENTS),
        ) else {
            self.no_overload(span, name);
            return None;
        };
        if target_scalar != Scalar::Uint && target_scalar != shape.scalar {
            self.qcom_error(
                span,
                name,
                "source and destination element types are not compatible",
            );
            return None;
        }
        if !self.qcom_scope_and_use(span, name, shape.scope, shape.usage) {
            return None;
        }
        let ArraySize::Sized(length) = target_size else {
            return Some(1);
        };
        let operand_length = match target_scalar {
            Scalar::Float16 => 16,
            Scalar::Int8 | Scalar::Uint8 => 32,
            _ => 8,
        };
        if shape.usage != CooperativeUse::Accumulator && length != operand_length {
            self.qcom_error(span, name, "unsupported destination array length");
            return None;
        }
        let dimension = if shape.usage == CooperativeUse::B {
            shape.rows
        } else {
            shape.columns
        };
        if let ArraySize::Sized(dimension) = dimension {
            let reason = match shape.usage {
                CooperativeUse::A if dimension != length && length != 8 => {
                    Some("the source matrix's column is not compatible with the destination array")
                }
                CooperativeUse::B if dimension != length && length != 8 => {
                    Some("the source matrix's row is not compatible with the destination array")
                }
                CooperativeUse::Accumulator
                    if dimension != length
                        && shape.scalar == Scalar::Float16
                        && u64::from(dimension) != 2 * u64::from(length) =>
                {
                    Some("the source matrix's column is not compatible with the destination array")
                }
                _ => None,
            };
            if let Some(reason) = reason {
                self.qcom_error(span, name, reason);
                return None;
            }
        }
        Some(1)
    }
}
