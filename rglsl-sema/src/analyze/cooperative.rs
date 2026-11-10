use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{Expression, ExpressionKind, ParameterizedType, Spanned, TypeParameters};
use rglsl_ast::Span;

use super::{Analyzer, Operand};
use crate::constant::Value;
use crate::diagnostic::DiagnosticKind;
use crate::types::{
    ArraySize, CooperativeMatrix, CooperativeUse, Scalar, SpecializedSize, Type, TypeKind,
};

#[derive(Debug, Clone, Copy)]
enum Parameter {
    Value(i64),
    Specialized(SpecializedSize),
}

impl Parameter {
    fn size(self) -> Option<ArraySize> {
        match self {
            Self::Value(value) => u32::try_from(value)
                .ok()
                .filter(|value| *value > 0)
                .map(ArraySize::Sized),
            Self::Specialized(size) => Some(ArraySize::Specialized(size)),
        }
    }

    fn value(self) -> Option<i64> {
        match self {
            Self::Value(value) => Some(value),
            Self::Specialized(SpecializedSize::Constant { default, .. }) => {
                Some(i64::from(default))
            }
            Self::Specialized(SpecializedSize::Expression(_)) => None,
        }
    }
}

const fn coopmat_scalar(scalar: Scalar) -> bool {
    matches!(
        scalar,
        Scalar::Float
            | Scalar::Float16
            | Scalar::BFloat16
            | Scalar::FloatE4M3
            | Scalar::FloatE5M2
            | Scalar::Int
            | Scalar::Int8
            | Scalar::Int16
            | Scalar::Uint
            | Scalar::Uint8
            | Scalar::Uint16
    )
}

impl Analyzer<'_> {
    fn type_parameter(&mut self, expression: &Expression) -> Option<Parameter> {
        let operand = self.expression(expression);
        if operand.ty.is_error() {
            return None;
        }
        let integer = operand.ty.is_scalar_integer() || operand.ty.is_bool();
        if !operand.constant || !integer {
            self.error(
                expression.span,
                DiagnosticKind::InvalidTypeParameters {
                    ty: "type",
                    reason: "a type parameter must be a constant integer or boolean expression",
                },
            );
            return None;
        }
        let value = operand.value.as_ref().and_then(|constant| {
            constant.first().and_then(|value| match value {
                Value::Bool(flag) => Some(i64::from(flag)),
                other => other.as_i64(),
            })
        });
        if operand.specialization {
            let mut inner = expression;
            while let ExpressionKind::Parenthesized(nested) = &inner.kind {
                inner = nested;
            }
            let symbol = match inner.kind {
                ExpressionKind::Variable(_) => self.references.get(&inner.id).copied(),
                _ => None,
            };
            let default = value.and_then(|size| u32::try_from(size).ok());
            return Some(Parameter::Specialized(match symbol {
                Some(symbol) => SpecializedSize::Constant {
                    symbol,
                    default: default.unwrap_or(0),
                },
                None => SpecializedSize::Expression(expression.id),
            }));
        }
        Some(match value {
            Some(value) => Parameter::Value(value),
            None => Parameter::Specialized(SpecializedSize::Expression(expression.id)),
        })
    }

    fn parameter_error(&mut self, span: Span, ty: &'static str, reason: &'static str) -> Type {
        self.error(span, DiagnosticKind::InvalidTypeParameters { ty, reason });
        Type::ERROR
    }

    pub(crate) fn parameterized_type(
        &mut self,
        kind: ParameterizedType,
        parameters: Option<&Spanned<TypeParameters>>,
        span: Span,
    ) -> Type {
        let keyword = kind.keyword();
        if !matches!(kind, ParameterizedType::LongVector) {
            self.vulkan_memory_model = true;
        }
        let Some(parameters) = parameters else {
            return self.parameter_error(span, keyword, "missing type parameters");
        };
        let element = match &parameters.element {
            Some(element) => {
                let ty = self.type_specifier(element);
                if ty.is_error() {
                    return Type::ERROR;
                }
                if matches!(ty.kind, TypeKind::Struct(_)) {
                    return self.parameter_error(
                        span,
                        keyword,
                        "structure type not allowed as type parameter",
                    );
                }
                Some(ty)
            }
            None => None,
        };
        let mut values = Vec::with_capacity(parameters.values.len());
        let mut failed = false;
        let uses = self.specialization_uses;
        for value in &parameters.values {
            match self.type_parameter(value) {
                Some(parameter) => values.push(parameter),
                None => failed = true,
            }
        }
        self.specialization_uses = uses;
        if failed {
            return Type::ERROR;
        }
        let element_scalar = element
            .as_ref()
            .filter(|ty| ty.is_scalar())
            .and_then(Type::scalar_type);
        match kind {
            ParameterizedType::CooperativeMatrix => {
                let Some(scalar) = element_scalar.filter(|scalar| coopmat_scalar(*scalar)) else {
                    return self.parameter_error(span, keyword, "invalid component type");
                };
                let [scope, rows, columns, usage] = values.as_slice() else {
                    return self.parameter_error(span, keyword, "expected five type parameters");
                };
                let Some(usage) = usage.value().and_then(CooperativeUse::from_value) else {
                    return self.parameter_error(span, keyword, "invalid matrix use");
                };
                self.cooperative_matrix_type(
                    span,
                    keyword,
                    scalar,
                    [*scope, *rows, *columns],
                    usage,
                )
            }
            ParameterizedType::FloatCooperativeMatrixNv
            | ParameterizedType::IntCooperativeMatrixNv
            | ParameterizedType::UintCooperativeMatrixNv => {
                if element.is_some() {
                    return self.parameter_error(span, keyword, "expected four type parameters");
                }
                let [bits, scope, rows, columns] = values.as_slice() else {
                    return self.parameter_error(span, keyword, "expected four type parameters");
                };
                let scalar = match (kind, bits.value()) {
                    (ParameterizedType::FloatCooperativeMatrixNv, Some(16)) => Scalar::Float16,
                    (ParameterizedType::FloatCooperativeMatrixNv, Some(32)) => Scalar::Float,
                    (ParameterizedType::FloatCooperativeMatrixNv, Some(64)) => Scalar::Double,
                    (ParameterizedType::IntCooperativeMatrixNv, Some(8)) => Scalar::Int8,
                    (ParameterizedType::IntCooperativeMatrixNv, Some(16)) => Scalar::Int16,
                    (ParameterizedType::IntCooperativeMatrixNv, Some(32)) => Scalar::Int,
                    (ParameterizedType::UintCooperativeMatrixNv, Some(8)) => Scalar::Uint8,
                    (ParameterizedType::UintCooperativeMatrixNv, Some(16)) => Scalar::Uint16,
                    (ParameterizedType::UintCooperativeMatrixNv, Some(32)) => Scalar::Uint,
                    _ => {
                        return self.parameter_error(
                            span,
                            keyword,
                            "invalid number of bits for the first type parameter",
                        )
                    }
                };
                self.cooperative_matrix_type(
                    span,
                    keyword,
                    scalar,
                    [*scope, *rows, *columns],
                    CooperativeUse::Nv,
                )
            }
            ParameterizedType::LongVector | ParameterizedType::CooperativeVectorNv => {
                let Some(element) = element else {
                    return self.parameter_error(span, keyword, "missing element type");
                };
                let Some(scalar) = element_scalar else {
                    let reason = if element.is_void() {
                        "invalid element type for vector"
                    } else {
                        "the element type must be a scalar"
                    };
                    return self.parameter_error(span, keyword, reason);
                };
                if kind == ParameterizedType::CooperativeVectorNv
                    && matches!(scalar, Scalar::Bool | Scalar::Double)
                {
                    return self.parameter_error(span, keyword, "invalid component type");
                }
                let [size] = values.as_slice() else {
                    return self.parameter_error(
                        span,
                        keyword,
                        "vector type requires exactly 1 element count",
                    );
                };
                let Some(size) = size.size() else {
                    return self.parameter_error(
                        span,
                        keyword,
                        "expected positive number of components",
                    );
                };
                if kind == ParameterizedType::LongVector {
                    Type::new(TypeKind::LongVector { scalar, size })
                } else {
                    Type::new(TypeKind::CooperativeVector { scalar, size })
                }
            }
            ParameterizedType::TensorLayoutNv => {
                if element.is_some() || values.is_empty() || values.len() > 2 {
                    return self.parameter_error(span, keyword, "expected 1-2 type parameters");
                }
                let constants: Option<Vec<i64>> =
                    values.iter().map(|value| value.value()).collect();
                let Some(constants) = constants else {
                    return self.parameter_error(span, keyword, "type parameters must be constant");
                };
                let dimensions = constants.first().copied().unwrap_or(0);
                let clamp_mode = constants.get(1).copied().unwrap_or(0);
                match (u32::try_from(dimensions), u32::try_from(clamp_mode)) {
                    (Ok(dimensions), Ok(clamp_mode)) if (1..=5).contains(&dimensions) => {
                        Type::new(TypeKind::TensorLayout {
                            dimensions,
                            clamp_mode,
                        })
                    }
                    _ => self.parameter_error(span, keyword, "invalid dimension count"),
                }
            }
            ParameterizedType::TensorViewNv => {
                if element.is_some() || values.is_empty() || values.len() > 7 {
                    return self.parameter_error(span, keyword, "expected 1-7 type parameters");
                }
                let constants: Option<Vec<i64>> =
                    values.iter().map(|value| value.value()).collect();
                let Some(constants) = constants else {
                    return self.parameter_error(span, keyword, "type parameters must be constant");
                };
                let dimensions = constants.first().copied().unwrap_or(0);
                let Some(dimensions) = u32::try_from(dimensions)
                    .ok()
                    .filter(|dimensions| (1..=5).contains(dimensions))
                else {
                    return self.parameter_error(span, keyword, "invalid dimension count");
                };
                let has_dimensions = constants.get(1).copied().unwrap_or(0) != 0;
                let mut permutation = [0, 1, 2, 3, 4];
                for (slot, value) in permutation.iter_mut().zip(constants.iter().skip(2)) {
                    match u8::try_from(*value) {
                        Ok(value) if u32::from(value) < dimensions => *slot = value,
                        _ => {
                            return self.parameter_error(
                                span,
                                keyword,
                                "invalid dimension permutation",
                            )
                        }
                    }
                }
                Type::new(TypeKind::TensorView {
                    dimensions,
                    has_dimensions,
                    permutation,
                })
            }
        }
    }

    fn cooperative_matrix_type(
        &mut self,
        span: Span,
        keyword: &'static str,
        scalar: Scalar,
        [scope, rows, columns]: [Parameter; 3],
        usage: CooperativeUse,
    ) -> Type {
        let (Some(scope), Some(rows), Some(columns)) = (scope.size(), rows.size(), columns.size())
        else {
            return self.parameter_error(span, keyword, "sizes and scope must be positive");
        };
        Type::new(TypeKind::CooperativeMatrix(CooperativeMatrix {
            scalar,
            scope,
            rows,
            columns,
            usage,
        }))
    }

    pub(crate) fn cooperative_constructor(
        &mut self,
        span: Span,
        ty: &Type,
        operands: &[Operand],
    ) -> Operand {
        let fail = |analyzer: &mut Self, reason: &'static str| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidConstructor {
                    ty: analyzer.show(ty),
                    reason,
                },
            );
            Operand::error()
        };
        let constant = operands
            .iter()
            .all(|operand| operand.constant && !operand.specialization);
        if let Some(matrix) = ty.as_cooperative_matrix() {
            let [operand] = operands else {
                return fail(self, "wrong number of arguments");
            };
            if let Some(source) = operand.ty.as_cooperative_matrix() {
                let same_shape = source.scope == matrix.scope
                    && source.rows == matrix.rows
                    && source.columns == matrix.columns
                    && (source.usage == CooperativeUse::Nv) == (matrix.usage == CooperativeUse::Nv);
                let maintenance = self.extension_enabled("GL_EXT_cooperative_matrix_maintenance1");
                let matrix2 = self.extension_enabled("GL_NV_cooperative_matrix2");
                let accumulator = CooperativeUse::Accumulator;
                let operand_use = matches!(matrix.usage, CooperativeUse::A | CooperativeUse::B);
                let source_operand = matches!(source.usage, CooperativeUse::A | CooperativeUse::B);
                let allowed = source.usage == matrix.usage
                    || ((maintenance || matrix2) && source.usage == accumulator && operand_use)
                    || (maintenance && matrix.usage == accumulator && source_operand);
                if !same_shape || !allowed {
                    return fail(self, "Cooperative matrix type parameters mismatch");
                }
                return Operand::temporary(ty.clone());
            }
            if !operand.ty.is_scalar() || !operand.ty.is_numeric() {
                return fail(
                    self,
                    "Cooperative matrix constructor argument must be scalar or cooperative matrix",
                );
            }
            return Operand {
                constant,
                ..Operand::temporary(ty.clone())
            };
        }
        let Some(target) = ty.base_scalar() else {
            return Operand::error();
        };
        if let [operand] = operands {
            if operand.ty.is_scalar() {
                let value = match (constant, ty.component_count()) {
                    (true, Some(count)) => {
                        self.fold_constructor(ty, target, count, core::slice::from_ref(operand))
                    }
                    _ => None,
                };
                return Operand {
                    constant,
                    value,
                    ..Operand::temporary(ty.clone())
                };
            }
            if operand.ty.same_shape(ty) {
                let value = match (constant, ty.component_count()) {
                    (true, Some(count)) => {
                        self.fold_constructor(ty, target, count, core::slice::from_ref(operand))
                    }
                    _ => None,
                };
                return Operand {
                    constant,
                    value,
                    ..Operand::temporary(ty.clone())
                };
            }
        }
        let nominal = ty
            .sized_vector_length()
            .and_then(ArraySize::nominal)
            .filter(|size| *size > 0);
        let Some(needed) = ty.component_count().or(nominal) else {
            return fail(
                self,
                "a vector with a specialization-constant size takes one argument",
            );
        };
        let mut size = 0_u32;
        for operand in operands {
            if operand.ty.is_array() {
                return fail(self, "an argument is an array");
            }
            let Some(components) = operand.ty.component_count() else {
                return fail(self, "an argument is not a scalar, vector or matrix");
            };
            if size >= needed {
                return fail(self, "too many arguments");
            }
            size = size.saturating_add(components);
        }
        if size < needed {
            return fail(self, "not enough components");
        }
        let value = if constant && ty.component_count().is_some() {
            self.fold_constructor(ty, target, needed, operands)
        } else {
            None
        };
        Operand {
            constant,
            value,
            ..Operand::temporary(ty.clone())
        }
    }

    pub(crate) fn long_vector_builtin(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        arguments: &[Expression],
        operands: &[Operand],
    ) -> Operand {
        let ambiguous = |analyzer: &mut Self| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidCooperativeCall {
                    function: String::from(name),
                    reason: "can't resolve types (ambiguous long vector overload)",
                },
            );
            Operand::error()
        };
        if operands.iter().any(|operand| operand.ty.is_error()) {
            return Operand::error();
        }
        let mut shape: Option<(ArraySize, bool)> = None;
        let mut stand_ins = Vec::with_capacity(operands.len());
        for operand in operands {
            let ty = &operand.ty;
            match (ty.kind, ty.is_array()) {
                (TypeKind::LongVector { scalar, size }, false)
                | (TypeKind::CooperativeVector { scalar, size }, false) => {
                    let cooperative = ty.is_cooperative_vector();
                    match shape {
                        Some(existing) if existing != (size, cooperative) => {
                            return ambiguous(self);
                        }
                        _ => shape = Some((size, cooperative)),
                    }
                    stand_ins.push(Type::vector(scalar, 4));
                }
                (TypeKind::Scalar(_) | TypeKind::Vector { .. }, false) => {
                    stand_ins.push(ty.clone());
                }
                _ => return ambiguous(self),
            }
        }
        let Some((size, cooperative)) = shape else {
            return ambiguous(self);
        };
        if cooperative && !COOPERATIVE_VECTOR_BUILTINS.contains(&name) {
            self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
            return Operand::error();
        }
        let long = |scalar: Scalar| {
            if cooperative {
                Type::new(TypeKind::CooperativeVector { scalar, size })
            } else {
                Type::new(TypeKind::LongVector { scalar, size })
            }
        };
        if !cooperative {
            if let Some(result) = Self::special_long_builtin(name, operands, long) {
                let Some(result) = result else {
                    return ambiguous(self);
                };
                let id = self.builtins.overloads(name).first().copied();
                let Some(id) = id else {
                    return ambiguous(self);
                };
                self.builtin_extensions(span, name);
                self.calls.insert(expression.id, super::Callee::Builtin(id));
                return Operand::temporary(result);
            }
        }
        let features = self.numeric_features();
        let convertible = name.starts_with("subgroup");
        let candidate = self
            .builtins
            .overloads(name)
            .iter()
            .copied()
            .find(|id| {
                self.builtins
                    .function(*id)
                    .is_some_and(|function| function.same_parameter_types(&stand_ins))
            })
            .or_else(|| {
                self.builtins.overloads(name).iter().copied().find(|id| {
                    convertible
                        && self.builtins.function(*id).is_some_and(|function| {
                            function.parameters.len() == stand_ins.len()
                                && function.parameters.iter().zip(&stand_ins).all(
                                    |(parameter, ty)| {
                                        parameter.ty == *ty
                                            || (ty.is_scalar()
                                                && ty.converts_with(&parameter.ty, features))
                                    },
                                )
                        })
                })
            });
        let Some(id) = candidate else {
            return ambiguous(self);
        };
        let Some(function) = self.builtins.function(id).cloned() else {
            return Operand::error();
        };
        let double = stand_ins
            .first()
            .and_then(Type::base_scalar)
            .is_some_and(|scalar| scalar == Scalar::Double);
        if double && NO_DOUBLE_LONG_VECTOR.contains(&name) {
            return ambiguous(self);
        }
        let first_argument = arguments.first().map_or(span, |argument| argument.span);
        for ((argument, operand), parameter) in
            arguments.iter().zip(operands).zip(&function.parameters)
        {
            if parameter.direction.is_output() && !self.require_lvalue(first_argument, operand) {
                return Operand::error();
            }
            if operand.ty.is_scalar() {
                self.record_conversion(argument, &operand.ty, &parameter.ty);
            }
        }
        self.builtin_extensions(span, name);
        let fixed_result = matches!(name, "subgroupPartitionNV" | "subgroupBallot");
        let result = match function.return_type.kind {
            TypeKind::Vector { scalar, .. } if !fixed_result => long(scalar),
            _ => function.return_type.clone(),
        };
        self.calls.insert(expression.id, super::Callee::Builtin(id));
        Operand::temporary(result)
    }
}

impl Analyzer<'_> {
    fn special_long_builtin(
        name: &str,
        operands: &[Operand],
        long: impl Fn(Scalar) -> Type,
    ) -> Option<Option<Type>> {
        let first = operands.first()?.ty.clone();
        let element = first.base_scalar()?;
        let all_same = |count: usize| {
            operands.len() == count && operands.iter().all(|operand| operand.ty == first)
        };
        let scalar_integers = |range: core::ops::Range<usize>| {
            operands
                .get(range)
                .is_some_and(|slice| slice.iter().all(|operand| operand.ty.is_scalar_integer()))
        };
        let signed = |scalar: Scalar| match scalar {
            Scalar::Uint => Scalar::Int,
            Scalar::Uint8 => Scalar::Int8,
            Scalar::Uint16 => Scalar::Int16,
            Scalar::Uint64 => Scalar::Int64,
            other => other,
        };
        let long_first = first.sized_vector_length().is_some();
        Some(match name {
            "fma" => (all_same(3) && element.is_floating()).then_some(first),
            "uaddCarry" | "usubBorrow" => (all_same(3) && element.is_unsigned()).then_some(first),
            "umulExtended" => (all_same(4) && element.is_unsigned()).then_some(Type::VOID),
            "imulExtended" => (all_same(4) && element.is_signed()).then_some(Type::VOID),
            "bitfieldExtract" => {
                (operands.len() == 3 && long_first && element.is_integer() && scalar_integers(1..3))
                    .then_some(first)
            }
            "bitfieldInsert" => (operands.len() == 4
                && long_first
                && element.is_integer()
                && operands.get(1).is_some_and(|operand| operand.ty == first)
                && scalar_integers(2..4))
            .then_some(first),
            "bitfieldReverse" => {
                (all_same(1) && long_first && element.is_integer()).then_some(first)
            }
            "findLSB" | "findMSB" | "bitCount" => {
                (all_same(1) && long_first && element.is_integer()).then(|| long(signed(element)))
            }
            "expectEXT" => (all_same(2) && long_first && !element.is_floating()).then_some(first),
            "frexp" | "ldexp" => {
                let exponent = operands.get(1).map(|operand| &operand.ty);
                (operands.len() == 2
                    && long_first
                    && element.is_floating()
                    && exponent.is_some_and(|ty| {
                        ty.base_scalar().is_some_and(Scalar::is_signed) && ty.same_shape(&first)
                    }))
                .then_some(first)
            }
            _ => return None,
        })
    }
}

const COOPERATIVE_VECTOR_BUILTINS: [&str; 9] = [
    "fma", "min", "max", "step", "exp", "log", "tanh", "atan", "clamp",
];

const NO_DOUBLE_LONG_VECTOR: [&str; 19] = [
    "radians", "degrees", "sin", "cos", "tan", "acos", "asin", "atan", "acosh", "asinh", "atanh",
    "tanh", "cosh", "sinh", "pow", "exp", "log", "exp2", "log2",
];
