use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{Expression, ExpressionKind};
use rglsl_ast::Span;

use super::frames::Cx;
use super::{Analyzer, Callee, Operand};
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Direction, FunctionId};
use crate::types::{ArraySize, CooperativeUse, Scalar, Type, TypeKind};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum TensorCall {
    CreateLayout,
    CreateView,
    LayoutSetBlockSize,
    LayoutSetDimension,
    LayoutSetStride,
    LayoutSlice,
    LayoutSetClampValue,
    ViewSetDimension,
    ViewSetStride,
    ViewSetClip,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum MatrixCall {
    LoadTensor { view: bool },
    StoreTensor { view: bool },
    Transpose { ext: bool },
    Reduce { ext: bool, mask: u32 },
    PerElement { ext: bool },
    GetCoordinate,
}

pub(crate) fn tensor_call(name: &str) -> Option<TensorCall> {
    Some(match name {
        "createTensorLayoutNV" => TensorCall::CreateLayout,
        "createTensorViewNV" => TensorCall::CreateView,
        "setTensorLayoutBlockSizeNV" => TensorCall::LayoutSetBlockSize,
        "setTensorLayoutDimensionNV" => TensorCall::LayoutSetDimension,
        "setTensorLayoutStrideNV" => TensorCall::LayoutSetStride,
        "sliceTensorLayoutNV" => TensorCall::LayoutSlice,
        "setTensorLayoutClampValueNV" => TensorCall::LayoutSetClampValue,
        "setTensorViewDimensionsNV" => TensorCall::ViewSetDimension,
        "setTensorViewStrideNV" => TensorCall::ViewSetStride,
        "setTensorViewClipNV" => TensorCall::ViewSetClip,
        _ => return None,
    })
}

pub(crate) fn matrix_call(name: &str) -> bool {
    matches!(
        name,
        "coopMatLoadTensorNV"
            | "coopMatStoreTensorNV"
            | "coopMatTransposeNV"
            | "coopMatTransposeEXT"
            | "coopMatReduceNV"
            | "coopMatReduceEXT"
            | "coopMatPerElementNV"
            | "coopMatPerElementEXT"
            | "coopMatGetCoordinateEXT"
    )
}

const REDUCE_ROW: i64 = 0x1;
const REDUCE_COLUMN: i64 = 0x2;
const REDUCE_ROW_AND_COLUMN: i64 = 0x3;
const REDUCE_2X2: i64 = 0x4;

fn known_mismatch(left: ArraySize, right: ArraySize) -> bool {
    matches!((left, right), (ArraySize::Sized(left), ArraySize::Sized(right)) if left != right)
}

fn half(size: ArraySize, of: ArraySize) -> bool {
    match (size, of) {
        (ArraySize::Sized(size), ArraySize::Sized(of)) => u64::from(size) * 2 == u64::from(of),
        _ => true,
    }
}

pub(crate) fn tensor_type_problem(kind: &TypeKind) -> Option<&'static str> {
    let known = |size: ArraySize| match size {
        ArraySize::Sized(value) => Some(value),
        ArraySize::Specialized(_) | ArraySize::Unsized => None,
    };
    match *kind {
        TypeKind::TensorLayout {
            dimensions,
            clamp_mode,
        } => {
            if known(dimensions).is_some_and(|value| !(1..=5).contains(&value)) {
                return Some("the dimension count must be between 1 and 5");
            }
            if known(clamp_mode).is_some_and(|value| value > 4) {
                return Some("the clamp mode must be a gl_CooperativeMatrixClampMode value");
            }
            None
        }
        TypeKind::TensorView {
            dimensions,
            permutation,
            ..
        } => {
            let count = known(dimensions)?;
            if !(1..=5).contains(&count) {
                return Some("the dimension count must be between 1 and 5");
            }
            let used = permutation
                .iter()
                .take(usize::try_from(count).unwrap_or_default());
            let mut seen = [false; 5];
            for &value in used {
                match seen.get_mut(usize::from(value)) {
                    Some(slot) if u32::from(value) < count && !*slot => *slot = true,
                    _ => return Some("the dimension permutation is not a permutation"),
                }
            }
            None
        }
        _ => None,
    }
}

fn is_component(ty: &Type, scalar: Scalar) -> bool {
    ty.is_scalar() && ty.base_scalar() == Some(scalar)
}

enum TensorArguments {
    Parameters(Vec<Operand>),
    Operands(Vec<Operand>),
}

impl<'b> Cx<'b, Analyzer<'_>> {
    pub(crate) async fn tensor_function(
        self,
        expression: &'b Expression,
        span: Span,
        name: &'b str,
        call: TensorCall,
        arguments: &'b [Expression],
    ) -> Operand {
        let enabled = self
            .with(|analyzer| analyzer.require_extension(span, "GL_NV_cooperative_matrix2", name));
        if !enabled {
            self.call(self.clone().operands(arguments)).await;
            return Operand::error();
        }
        let evaluated = match call {
            TensorCall::CreateLayout | TensorCall::CreateView => {
                let uses = self.with(|analyzer| analyzer.specialization_uses);
                let mut parameters = Vec::with_capacity(arguments.len());
                for argument in arguments {
                    parameters.push(self.call(self.clone().expression(argument)).await);
                }
                self.with(|analyzer| analyzer.specialization_uses = uses);
                TensorArguments::Parameters(parameters)
            }
            _ => TensorArguments::Operands(self.call(self.clone().operands(arguments)).await),
        };
        self.with(|analyzer| {
            analyzer.tensor_function_with(expression, span, name, call, arguments, evaluated)
        })
    }

    pub(crate) async fn matrix2_function(
        self,
        expression: &'b Expression,
        span: Span,
        name: &'b str,
        arguments: &'b [Expression],
    ) -> Operand {
        let references: Vec<Option<FunctionId>> = self.with(|analyzer| {
            arguments
                .iter()
                .map(|argument| analyzer.function_reference(argument))
                .collect()
        });
        let mut operands = Vec::with_capacity(arguments.len());
        for (argument, reference) in arguments.iter().zip(&references) {
            operands.push(match reference {
                Some(_) => Operand::temporary(Type::VOID),
                None => self.call(self.clone().expression(argument)).await,
            });
        }
        self.with(|analyzer| {
            analyzer.matrix2_function_with(expression, span, name, arguments, references, operands)
        })
    }
}

impl Analyzer<'_> {
    fn matrix2_error(&mut self, span: Span, name: &str, reason: &'static str) -> Operand {
        self.error(
            span,
            DiagnosticKind::InvalidCooperativeCall {
                function: String::from(name),
                reason,
            },
        );
        Operand::error()
    }

    fn function_reference(&self, argument: &Expression) -> Option<FunctionId> {
        let ExpressionKind::Variable(ref name) = argument.kind else {
            return None;
        };
        let levels = self.scopes.function_levels(name);
        let mut candidates = levels.into_iter().flatten().copied();
        let first = candidates.next()?;
        candidates.next().is_none().then_some(first)
    }

    fn type_argument_with(
        &mut self,
        argument: &Expression,
        operand: &Operand,
    ) -> Option<crate::types::ArraySize> {
        if operand.ty.is_error() {
            return None;
        }
        let integer = operand.ty.is_scalar()
            && matches!(
                operand.ty.base_scalar(),
                Some(Scalar::Int | Scalar::Uint | Scalar::Bool)
            );
        if !operand.constant || !integer {
            self.error(
                argument.span,
                DiagnosticKind::InvalidTypeParameters {
                    ty: "type",
                    reason: "type parameter must be a constant integer or boolean expression",
                },
            );
            return None;
        }
        if operand.specialization {
            let symbol = match argument.kind {
                ExpressionKind::Variable(_) => self.references.get(&argument.id).copied(),
                _ => None,
            };
            let default = operand
                .value
                .as_ref()
                .and_then(|value| value.first())
                .and_then(|value| value.as_i64())
                .and_then(|value| u32::try_from(value).ok())
                .unwrap_or(0);
            return Some(ArraySize::Specialized(match symbol {
                Some(symbol) => crate::types::SpecializedSize::Constant { symbol, default },
                None => crate::types::SpecializedSize::Expression(argument.id),
            }));
        }
        let value = operand
            .value
            .as_ref()
            .and_then(|value| value.first())
            .and_then(|value| match value {
                crate::constant::Value::Bool(flag) => Some(i64::from(flag)),
                other => other.as_i64(),
            })?;
        let Ok(value) = u32::try_from(value) else {
            self.error(
                argument.span,
                DiagnosticKind::InvalidTypeParameters {
                    ty: "type",
                    reason: "type parameter must be a non-negative integer",
                },
            );
            return None;
        };
        Some(ArraySize::Sized(value))
    }

    fn tensor_function_with(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        call: TensorCall,
        arguments: &[Expression],
        evaluated: TensorArguments,
    ) -> Operand {
        let (parameters, operands) = match evaluated {
            TensorArguments::Parameters(parameters) => (parameters, Vec::new()),
            TensorArguments::Operands(operands) => (Vec::new(), operands),
        };
        let no_match = |analyzer: &mut Self| {
            analyzer.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
            Operand::error()
        };
        let result = match call {
            TensorCall::CreateLayout | TensorCall::CreateView => {
                if parameters.iter().any(|operand| operand.ty.is_error()) {
                    return Operand::error();
                }
                let layout = call == TensorCall::CreateLayout;
                let limit = if layout { 2 } else { 7 };
                let matches = (1..=limit).contains(&parameters.len())
                    && parameters.iter().enumerate().all(|(index, operand)| {
                        if !layout && index == 1 {
                            operand.ty.is_bool()
                        } else {
                            operand.ty.is_scalar() && self.converts(&operand.ty, &Type::UINT)
                        }
                    });
                if !matches {
                    return no_match(self);
                }
                let mut values = Vec::with_capacity(parameters.len());
                for (argument, operand) in arguments.iter().zip(&parameters) {
                    values.push(self.type_argument_with(argument, operand));
                }
                if values.iter().any(Option::is_none) {
                    return Operand::error();
                }
                let values: Vec<ArraySize> = values.into_iter().flatten().collect();
                let Some(&dimensions) = values.first() else {
                    return no_match(self);
                };
                let kind = if layout {
                    TypeKind::TensorLayout {
                        dimensions,
                        clamp_mode: values.get(1).copied().unwrap_or(ArraySize::Sized(0)),
                    }
                } else {
                    let has_dimensions = matches!(
                        values.get(1).copied(),
                        Some(ArraySize::Sized(value)) if value != 0
                    );
                    let mut permutation = [0, 1, 2, 3, 4];
                    for (slot, value) in permutation.iter_mut().zip(values.iter().skip(2)) {
                        match value.nominal().and_then(|value| u8::try_from(value).ok()) {
                            Some(value) => *slot = value,
                            None => {
                                return self.matrix2_error(
                                    span,
                                    name,
                                    "the dimension permutation is not a permutation",
                                )
                            }
                        }
                    }
                    TypeKind::TensorView {
                        dimensions,
                        has_dimensions,
                        permutation,
                    }
                };
                if let Some(reason) = tensor_type_problem(&kind) {
                    return self.matrix2_error(span, name, reason);
                }
                Type::new(kind)
            }
            _ => {
                let Some(base) = operands.first() else {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                };
                let layout = matches!(base.ty.kind, TypeKind::TensorLayout { .. });
                let view = matches!(base.ty.kind, TypeKind::TensorView { .. });
                let expected_layout = matches!(
                    call,
                    TensorCall::LayoutSetBlockSize
                        | TensorCall::LayoutSetDimension
                        | TensorCall::LayoutSetStride
                        | TensorCall::LayoutSlice
                        | TensorCall::LayoutSetClampValue
                );
                let valid_base = if expected_layout { layout } else { view };
                let count = operands.len().saturating_sub(1);
                let count_valid = match call {
                    TensorCall::LayoutSetClampValue => count == 1,
                    TensorCall::ViewSetClip => count == 4,
                    TensorCall::LayoutSlice => (2..=10).contains(&count) && count.is_multiple_of(2),
                    _ => (1..=5).contains(&count),
                };
                let integers = operands.iter().skip(1).all(|operand| {
                    operand.ty.is_scalar() && self.converts(&operand.ty, &Type::UINT)
                });
                if base.ty.is_array() || !valid_base || !count_valid || !integers {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                }
                let dimensions = match base.ty.kind {
                    TypeKind::TensorLayout {
                        dimensions: ArraySize::Sized(dimensions),
                        ..
                    }
                    | TypeKind::TensorView {
                        dimensions: ArraySize::Sized(dimensions),
                        ..
                    } => usize::try_from(dimensions).ok(),
                    _ => None,
                };
                let expected = match call {
                    TensorCall::LayoutSetClampValue | TensorCall::ViewSetClip => None,
                    TensorCall::LayoutSlice => dimensions.map(|dimensions| dimensions * 2),
                    _ => dimensions,
                };
                if expected.is_some_and(|expected| expected != count) {
                    return self.matrix2_error(
                        span,
                        name,
                        "the number of values must match the tensor dimension count",
                    );
                }
                for (argument, operand) in arguments.iter().zip(&operands).skip(1) {
                    self.record_conversion(argument, &operand.ty, &Type::UINT);
                }
                base.ty.clone()
            }
        };
        self.calls.insert(expression.id, Callee::Tensor(call));
        Operand::temporary(result)
    }

    fn check_function_parameters(&mut self, span: Span, id: FunctionId) -> bool {
        let Some(function) = self.function(id).cloned() else {
            return false;
        };
        let mut valid = true;
        for parameter in &function.parameters {
            if parameter.direction != Direction::In || !parameter.qualifiers.constant {
                self.error(
                    span,
                    DiagnosticKind::InvalidCooperativeCall {
                        function: function.name.clone(),
                        reason: "function parameters must all be qualified 'const in'",
                    },
                );
                valid = false;
            }
        }
        valid
    }

    fn check_decode(
        &mut self,
        span: Span,
        id: FunctionId,
        component: Scalar,
        dimensions: Option<u32>,
        vector: bool,
    ) -> bool {
        let Some(function) = self.function(id).cloned() else {
            return false;
        };
        let mut valid = self.check_function_parameters(span, id);
        let mut fail = |analyzer: &mut Self, reason: &'static str| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidCooperativeCall {
                    function: function.name.clone(),
                    reason,
                },
            );
            valid = false;
        };
        let [buffer, block, coordinates] = function.parameters.as_slice() else {
            fail(self, "decode functions take three parameters");
            return false;
        };
        if !buffer.ty.is_reference() {
            fail(self, "first parameter must be buffer reference type");
        }
        let coordinate = |ty: &Type| {
            ty.dimensions().len() == 1
                && ty.base_scalar() == Some(Scalar::Uint)
                && !matches!(ty.kind, TypeKind::Vector { .. })
                && dimensions
                    .is_none_or(|count| ty.dimensions().first() == Some(&ArraySize::Sized(count)))
        };
        if !coordinate(&block.ty) || !coordinate(&coordinates.ty) {
            fail(self, "coordinate parameters must be uint32_t");
        }
        let result = &function.return_type;
        if vector {
            let (scalar, length) = match result.kind {
                TypeKind::Vector { scalar, size } if !result.is_array() => {
                    (Some(scalar), u32::from(size))
                }
                TypeKind::LongVector {
                    scalar,
                    size: ArraySize::Sized(size),
                } if !result.is_array() => (Some(scalar), size),
                _ => (None, 0),
            };
            if !matches!(length, 2 | 4 | 8) {
                fail(
                    self,
                    "decodeVectorFunc return vector length must be 2, 4, or 8",
                );
            } else if scalar != Some(component) {
                fail(
                    self,
                    "decodeVectorFunc return type component must match cooperative matrix component type",
                );
            }
        } else if !result.is_scalar() || result.base_scalar() != Some(component) {
            fail(
                self,
                "decodeFunc return type must be the cooperative matrix component type (scalar)",
            );
        }
        valid
    }

    fn matrix2_function_with(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        arguments: &[Expression],
        references: Vec<Option<FunctionId>>,
        operands: Vec<Operand>,
    ) -> Operand {
        let ext = name.ends_with("EXT");
        let tensor_memory = matches!(name, "coopMatLoadTensorNV" | "coopMatStoreTensorNV");
        let wide_element = tensor_memory
            && operands
                .get(2)
                .and_then(|operand| operand.ty.scalar_type())
                .is_some_and(|scalar| scalar.is_integer() && scalar.bits() == 64);
        let extension = if ext {
            "GL_EXT_cooperative_matrix_maintenance1"
        } else if wide_element {
            "GL_EXT_shader_64bit_indexing"
        } else {
            "GL_NV_cooperative_matrix2"
        };
        if operands.iter().any(|operand| operand.ty.is_error()) {
            return Operand::error();
        }
        if !self.require_extension(span, extension, name) {
            return Operand::error();
        }
        let first = arguments.first().map_or(span, |argument| argument.span);
        let matrix = |index: usize| {
            operands
                .get(index)
                .and_then(|operand| operand.ty.as_cooperative_matrix())
        };
        let call = match name {
            "coopMatLoadTensorNV" | "coopMatStoreTensorNV" => {
                let load = name == "coopMatLoadTensorNV";
                let Some(target) = matrix(0) else {
                    return self.matrix2_error(span, name, "the first argument must be a matrix");
                };
                let buffer_valid = operands.get(1).is_some_and(|operand| operand.ty.is_array());
                let element_target = if wide_element {
                    Type::scalar(Scalar::Uint64)
                } else {
                    Type::UINT
                };
                let element_valid = operands.get(2).is_some_and(|operand| {
                    operand.ty.is_scalar() && self.converts(&operand.ty, &element_target)
                });
                let ambiguous = self.extension_enabled("GL_EXT_shader_64bit_indexing")
                    && operands.get(2).is_some_and(|operand| {
                        !matches!(
                            operand.ty.scalar_type(),
                            Some(Scalar::Uint | Scalar::Uint64)
                        ) && self.converts(&operand.ty, &Type::UINT)
                            && self.converts(&operand.ty, &Type::scalar(Scalar::Uint64))
                    });
                if ambiguous {
                    self.error(span, DiagnosticKind::AmbiguousCall(String::from(name)));
                    return Operand::error();
                }
                let layout = operands.get(3).and_then(|operand| match operand.ty.kind {
                    TypeKind::TensorLayout { dimensions, .. } => Some(dimensions),
                    _ => None,
                });
                if !buffer_valid || !element_valid || layout.is_none() {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                }
                if let (Some(argument), Some(operand)) = (arguments.get(2), operands.get(2)) {
                    self.record_conversion(argument, &operand.ty, &element_target);
                }
                let storage = operands.get(1).map(|operand| operand.storage);
                if !matches!(
                    storage,
                    Some(crate::scope::Storage::Buffer | crate::scope::Storage::Shared)
                ) && !operands
                    .get(1)
                    .is_some_and(|operand| operand.through_reference)
                {
                    return self.matrix2_error(
                        span,
                        name,
                        "buffer argument must be in buffer or shared storage",
                    );
                }
                let view = operands
                    .get(4)
                    .is_some_and(|operand| matches!(operand.ty.kind, TypeKind::TensorView { .. }));
                let functions_start = if view { 5 } else { 4 };
                let decoders: Vec<FunctionId> = references
                    .iter()
                    .skip(functions_start)
                    .copied()
                    .collect::<Option<Vec<_>>>()
                    .unwrap_or_default();
                let expected = arguments.len().saturating_sub(functions_start);
                if decoders.len() != expected || decoders.len() > 2 || (!load && expected > 0) {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                }
                let dimensions = layout.and_then(ArraySize::nominal);
                let mut valid = true;
                for (index, decoder) in decoders.iter().enumerate() {
                    valid &=
                        self.check_decode(span, *decoder, target.scalar, dimensions, index == 1);
                }
                if decoders.len() == 2
                    && !self.require_extension(span, "GL_NV_cooperative_matrix_decode_vector", name)
                {
                    valid = false;
                }
                if !valid {
                    return Operand::error();
                }
                if load {
                    if let Some(operand) = operands.first() {
                        if !self.require_lvalue(first, operand) {
                            return Operand::error();
                        }
                    }
                }
                for (argument, decoder) in arguments.iter().skip(functions_start).zip(&decoders) {
                    self.calls.insert(argument.id, Callee::Function(*decoder));
                    self.called
                        .entry(self.current_function)
                        .or_default()
                        .insert(*decoder);
                }
                if load {
                    MatrixCall::LoadTensor { view }
                } else {
                    MatrixCall::StoreTensor { view }
                }
            }
            "coopMatTransposeNV" | "coopMatTransposeEXT" => {
                let (Some(result), Some(source), 2) = (matrix(0), matrix(1), operands.len()) else {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                };
                let mut failed = false;
                let mut fail = |analyzer: &mut Self, reason: &'static str| {
                    analyzer.matrix2_error(span, name, reason);
                    failed = true;
                };
                if known_mismatch(result.scope, source.scope) {
                    fail(self, "scope must match");
                }
                if known_mismatch(result.rows, source.columns)
                    || known_mismatch(result.columns, source.rows)
                {
                    fail(self, "rows/columns must be swapped");
                }
                if source.usage != CooperativeUse::Accumulator {
                    fail(self, "Cooperative matrix source Use must be Accumulator");
                }
                if self.extension_enabled("GL_EXT_cooperative_matrix_maintenance1") {
                    if result.usage == CooperativeUse::Accumulator {
                        fail(
                            self,
                            "Cooperative matrix result Use must not be Accumulator",
                        );
                    }
                } else if result.usage != CooperativeUse::B {
                    fail(self, "Cooperative matrix result Use must be B");
                }
                if failed {
                    return Operand::error();
                }
                if let Some(operand) = operands.first() {
                    if !self.require_lvalue(first, operand) {
                        return Operand::error();
                    }
                }
                MatrixCall::Transpose { ext }
            }
            "coopMatReduceNV" | "coopMatReduceEXT" => {
                let (Some(result), Some(source), 4) = (matrix(0), matrix(1), operands.len()) else {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                };
                let Some(combine) = references.get(3).copied().flatten() else {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                };
                let mask_type = operands.get(2).is_some_and(|operand| {
                    operand.ty.is_scalar() && self.converts(&operand.ty, &Type::INT)
                });
                if !mask_type {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                }
                let mut failed = false;
                let mut fail = |analyzer: &mut Self, reason: &'static str| {
                    analyzer.matrix2_error(span, name, reason);
                    failed = true;
                };
                if result.scalar != source.scalar {
                    fail(self, "input and result component types must match");
                }
                if result.usage != CooperativeUse::Accumulator
                    || source.usage != CooperativeUse::Accumulator
                {
                    fail(self, "input and result Use must be Accumulator");
                }
                if known_mismatch(result.scope, source.scope) {
                    fail(self, "input and result scopes must match");
                }
                let mask = operands.get(2).and_then(|operand| {
                    (operand.constant && !operand.specialization)
                        .then(|| operand.value.as_ref()?.scalar_i64())
                        .flatten()
                });
                match mask {
                    None => fail(self, "reduceMask must be a constant expression"),
                    Some(value)
                        if !matches!(
                            value,
                            REDUCE_ROW | REDUCE_COLUMN | REDUCE_ROW_AND_COLUMN | REDUCE_2X2
                        ) =>
                    {
                        fail(
                            self,
                            "reduceMask must be a valid cooperative matrix reduction value",
                        );
                    }
                    Some(REDUCE_ROW) if known_mismatch(result.rows, source.rows) => fail(
                        self,
                        "result rows must match input rows for a row reduction",
                    ),
                    Some(REDUCE_COLUMN) if known_mismatch(result.columns, source.columns) => {
                        fail(
                            self,
                            "result columns must match input columns for a column reduction",
                        );
                    }
                    Some(REDUCE_2X2)
                        if !half(result.rows, source.rows)
                            || !half(result.columns, source.columns) =>
                    {
                        fail(
                            self,
                            "result rows and columns must be half the input rows and columns for a 2x2 reduction",
                        );
                    }
                    Some(_) => {}
                }
                if !self.check_function_parameters(span, combine) {
                    failed = true;
                }
                let Some(function) = self.function(combine).cloned() else {
                    return Operand::error();
                };
                let mut fail_function = |analyzer: &mut Self, reason: &'static str| {
                    analyzer.error(
                        span,
                        DiagnosticKind::InvalidCooperativeCall {
                            function: function.name.clone(),
                            reason,
                        },
                    );
                    failed = true;
                };
                if function.parameters.len() != 2 {
                    fail_function(self, "must have two parameters");
                }
                for parameter in &function.parameters {
                    if !is_component(&parameter.ty, source.scalar) {
                        fail_function(
                            self,
                            "parameter types must match cooperative matrix component type",
                        );
                    }
                }
                if !is_component(&function.return_type, source.scalar) {
                    fail_function(
                        self,
                        "return type must match cooperative matrix component type",
                    );
                }
                if failed {
                    return Operand::error();
                }
                if let Some(operand) = operands.first() {
                    if !self.require_lvalue(first, operand) {
                        return Operand::error();
                    }
                }
                if let Some(argument) = arguments.get(3) {
                    self.calls.insert(argument.id, Callee::Function(combine));
                }
                self.called
                    .entry(self.current_function)
                    .or_default()
                    .insert(combine);
                MatrixCall::Reduce {
                    ext,
                    mask: mask
                        .and_then(|value| u32::try_from(value).ok())
                        .unwrap_or_default(),
                }
            }
            "coopMatPerElementNV" | "coopMatPerElementEXT" => {
                let (Some(result_type), Some(source_type), Some(Some(function_id))) = (
                    operands.first().map(|operand| &operand.ty),
                    operands.get(1).map(|operand| &operand.ty),
                    references.get(2).copied(),
                ) else {
                    return self.matrix2_error(
                        span,
                        name,
                        "expected a result matrix, an input matrix, and a per-element function",
                    );
                };
                let Some(source) = source_type.as_cooperative_matrix() else {
                    return self.matrix2_error(
                        span,
                        name,
                        "expected a result matrix, an input matrix, and a per-element function",
                    );
                };
                let types_match = result_type == source_type;
                let mut failed = !self.check_function_parameters(span, function_id);
                let Some(function) = self.function(function_id).cloned() else {
                    return Operand::error();
                };
                if !types_match {
                    self.error(
                        span,
                        DiagnosticKind::InvalidCooperativeCall {
                            function: String::new(),
                            reason: "cooperative matrix input and result types must match",
                        },
                    );
                    failed = true;
                }
                let mut fail_function = |analyzer: &mut Self, reason: &'static str| {
                    analyzer.error(
                        span,
                        DiagnosticKind::InvalidCooperativeCall {
                            function: function.name.clone(),
                            reason,
                        },
                    );
                    failed = true;
                };
                let parameters = &function.parameters;
                if parameters.len() < 3 {
                    fail_function(self, "not enough parameters");
                } else if parameters.len() != operands.len() {
                    fail_function(
                        self,
                        "number of parameters must match call to cooperative matrix per-element operation",
                    );
                } else {
                    let coordinate =
                        |ty: &Type| ty.is_scalar() && ty.base_scalar() == Some(Scalar::Uint);
                    if !parameters
                        .iter()
                        .take(2)
                        .all(|parameter| coordinate(&parameter.ty))
                    {
                        fail_function(self, "row/column parameters must be uint32_t");
                    }
                    if !parameters
                        .get(2)
                        .is_some_and(|parameter| is_component(&parameter.ty, source.scalar))
                    {
                        fail_function(
                            self,
                            "third parameter must match cooperative matrix component type",
                        );
                    }
                    for (parameter, operand) in parameters.iter().zip(&operands).skip(3) {
                        if operand.ty.as_cooperative_matrix().is_some() {
                            if operand.ty != *source_type {
                                fail_function(
                                    self,
                                    "optional cooperative matrix types must match the input matrix type",
                                );
                            }
                            if !is_component(&parameter.ty, source.scalar) {
                                fail_function(
                                    self,
                                    "parameters corresponding to cooperative matrices must match the matrix component type",
                                );
                            }
                        } else if operand.ty != parameter.ty {
                            fail_function(
                                self,
                                "parameter types must match or be cooperative matrix component type",
                            );
                        }
                    }
                    if !is_component(&function.return_type, source.scalar) {
                        fail_function(
                            self,
                            "return type must match cooperative matrix component type",
                        );
                    }
                }
                if failed {
                    return Operand::error();
                }
                if let Some(operand) = operands.first() {
                    if !self.require_lvalue(first, operand) {
                        return Operand::error();
                    }
                }
                if let Some(argument) = arguments.get(2) {
                    self.calls
                        .insert(argument.id, Callee::Function(function_id));
                }
                self.called
                    .entry(self.current_function)
                    .or_default()
                    .insert(function_id);
                MatrixCall::PerElement { ext }
            }
            _ => {
                let (Some(_), Some(index), 2) = (matrix(0), operands.get(1), operands.len()) else {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                };
                if !index.ty.is_scalar() || !self.converts(&index.ty, &Type::UINT) {
                    self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                    return Operand::error();
                }
                if let Some(argument) = arguments.get(1) {
                    self.record_conversion(argument, &index.ty, &Type::UINT);
                }
                self.calls
                    .insert(expression.id, Callee::Matrix(MatrixCall::GetCoordinate));
                return Operand::temporary(Type::vector(Scalar::Uint, 2));
            }
        };
        self.calls.insert(expression.id, Callee::Matrix(call));
        Operand::temporary(Type::VOID)
    }
}
