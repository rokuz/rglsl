use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{
    Expression, ExpressionKind, FunctionCall, FunctionIdentifier, Identifier, TypeSpecifier,
};
use rglsl_ast::Span;

use super::{Analyzer, Callee, Operand};
use crate::builtins::{subgroup, Stage};
use crate::constant::{fold_builtin, Constant, Value};
use crate::diagnostic::DiagnosticKind;
use crate::scope::{Function, Lookup, Parameter, Storage, SymbolKind};
use crate::types::{ArraySize, NumericFeatures, Opaque, OpaqueKind, Scalar, Type, TypeKind};

#[derive(Clone, Copy, PartialEq, Eq)]
enum Candidate {
    User(crate::scope::FunctionId),
    Builtin(crate::builtins::BuiltinFunctionId),
}

#[derive(Clone, Copy)]
struct Rules {
    features: NumericFeatures,
    explicit: bool,
}

fn convertible(rules: Rules, from: &Type, to: &Type) -> bool {
    from.converts_with(to, rules.features)
}

fn better(rules: Rules, from: &Type, first: &Type, second: &Type) -> bool {
    if from == second {
        return from != first;
    }
    if from == first {
        return false;
    }
    let (Some(from_scalar), Some(first_scalar), Some(second_scalar)) = (
        from.base_scalar(),
        first.base_scalar(),
        second.base_scalar(),
    ) else {
        return false;
    };
    if rules.explicit {
        let promotion_first = from_scalar.is_promotion(first_scalar);
        let promotion_second = from_scalar.is_promotion(second_scalar);
        if promotion_second {
            return !promotion_first;
        }
        if promotion_first {
            return false;
        }
        return from_scalar.is_conversion(second_scalar)
            && !from_scalar.is_conversion(first_scalar);
    }
    if from_scalar == Scalar::Float
        && second_scalar == Scalar::Double
        && first_scalar != Scalar::Double
    {
        return true;
    }
    second_scalar == Scalar::Float && first_scalar == Scalar::Double
}

fn viable(rules: Rules, function: &Function, arguments: &[Type]) -> bool {
    function.parameters.len() == arguments.len()
        && function
            .parameters
            .iter()
            .zip(arguments)
            .all(|(parameter, argument)| {
                (!parameter.direction.is_input() || convertible(rules, argument, &parameter.ty))
                    && (!parameter.direction.is_output()
                        || convertible(rules, &parameter.ty, argument))
            })
}

fn has_better_parameter(
    rules: Rules,
    arguments: &[Type],
    first: &Function,
    second: &Function,
) -> bool {
    arguments
        .iter()
        .zip(first.parameters.iter().zip(&second.parameters))
        .any(|(argument, (first, second))| better(rules, argument, &first.ty, &second.ty))
}

fn equivalent(rules: Rules, arguments: &[Type], first: &Function, second: &Function) -> bool {
    !has_better_parameter(rules, arguments, first, second)
        && !has_better_parameter(rules, arguments, second, first)
}

const DEBUG_PRINTF: &str = "debugPrintfEXT";
const ABORT: &str = "abortEXT";

const FOLDED_BUILTINS: [&str; 68] = [
    "radians",
    "degrees",
    "sin",
    "cos",
    "tan",
    "asin",
    "acos",
    "atan",
    "sinh",
    "cosh",
    "tanh",
    "asinh",
    "acosh",
    "atanh",
    "dFdx",
    "dFdy",
    "fwidth",
    "dFdxFine",
    "dFdyFine",
    "fwidthFine",
    "dFdxCoarse",
    "dFdyCoarse",
    "fwidthCoarse",
    "pow",
    "exp",
    "log",
    "exp2",
    "log2",
    "sqrt",
    "inversesqrt",
    "abs",
    "sign",
    "floor",
    "trunc",
    "round",
    "roundEven",
    "ceil",
    "fract",
    "mod",
    "min",
    "max",
    "clamp",
    "mix",
    "step",
    "smoothstep",
    "isnan",
    "isinf",
    "floatBitsToInt",
    "floatBitsToUint",
    "intBitsToFloat",
    "uintBitsToFloat",
    "length",
    "distance",
    "dot",
    "cross",
    "normalize",
    "faceforward",
    "reflect",
    "refract",
    "matrixCompMult",
    "outerProduct",
    "lessThan",
    "lessThanEqual",
    "greaterThan",
    "greaterThanEqual",
    "equal",
    "notEqual",
    "any",
];

const FOLDED_VECTOR_BUILTINS: [&str; 2] = ["all", "not"];

impl Analyzer<'_> {
    fn candidate(&self, candidate: Candidate) -> Option<&Function> {
        match candidate {
            Candidate::User(id) => self.function(id),
            Candidate::Builtin(id) => self.builtins.function(id),
        }
    }

    pub(crate) fn call(&mut self, expression: &Expression, call: &FunctionCall) -> Operand {
        let end = expression.span.end;
        let close = Span::new(end.saturating_sub(1), end);
        match &call.function.node {
            FunctionIdentifier::Function(name) => {
                self.function_call(expression, close, name, &call.arguments)
            }
            FunctionIdentifier::Constructor(specifier) => {
                self.constructor(expression, close, specifier, &call.arguments)
            }
            FunctionIdentifier::Method { object, name } => {
                self.method(expression, object, name, &call.arguments)
            }
            FunctionIdentifier::Expression(callee) => {
                self.expression(callee);
                for argument in &call.arguments {
                    self.expression(argument);
                }
                self.error(close, DiagnosticKind::InvalidCallee);
                Operand::error()
            }
        }
    }

    fn method(
        &mut self,
        expression: &Expression,
        object: &Expression,
        name: &Identifier,
        arguments: &[Expression],
    ) -> Operand {
        let operand = self.expression(object);
        for argument in arguments {
            self.expression(argument);
        }
        let wide = name.node == "length64";
        if name.node != "length" && !wide {
            self.error(name.span, DiagnosticKind::UnknownMethod(name.node.clone()));
            return Operand::error();
        }
        if wide
            && !self.require_extension(
                name.span,
                super::expression::SHADER_64BIT_INDEXING,
                "length64",
            )
        {
            return Operand::error();
        }
        let result = if wide {
            Type::scalar(Scalar::Int64)
        } else {
            Type::INT
        };
        if operand.ty.is_error() {
            return Operand::error();
        }
        if !arguments.is_empty() {
            self.error(
                name.span,
                DiagnosticKind::InvalidLength(self.show(&operand.ty)),
            );
            return Operand::error();
        }
        self.calls.insert(expression.id, Callee::Length);
        let matrix_usage = operand
            .ty
            .as_cooperative_matrix()
            .map(|matrix| matrix.usage);
        if matrix_usage.is_some_and(|usage| usage != crate::types::CooperativeUse::Nv) {
            return Operand::temporary(result);
        }
        let specialized = matrix_usage.is_some()
            || matches!(
                operand.ty.sized_vector_length(),
                Some(ArraySize::Specialized(_))
            )
            || (operand.ty.length().is_none()
                && matches!(operand.ty.outer_size(), Some(ArraySize::Specialized(_))));
        if specialized {
            self.specialization_uses += 1;
            return Operand {
                specialization: true,
                ..Operand::constant(result, None)
            };
        }
        match operand.ty.length() {
            Some(length) => {
                let value = if wide {
                    Some(Constant::single(Value::Int64(i64::from(length))))
                } else {
                    i32::try_from(length)
                        .ok()
                        .map(|length| Constant::single(Value::Int(length)))
                };
                Operand::constant(result, value)
            }
            None if operand.ty.is_array() => {
                let resizable = matches!(
                    (operand.storage, self.options.stage),
                    (Storage::In, Stage::Geometry) | (Storage::Out, Stage::TessControl)
                ) && operand.ty.outer_size() == Some(ArraySize::Unsized);
                let runtime = (operand.storage == Storage::Buffer && !operand.through_reference)
                    || matches!(operand.storage, Storage::In | Storage::Out);
                if !runtime || resizable {
                    self.error(
                        name.span,
                        DiagnosticKind::InvalidLength(self.show(&operand.ty)),
                    );
                    return Operand::error();
                }
                Operand::temporary(result)
            }
            None => {
                self.error(
                    name.span,
                    DiagnosticKind::InvalidLength(self.show(&operand.ty)),
                );
                Operand::error()
            }
        }
    }

    fn select(&self, candidates: &[Candidate], arguments: &[Type]) -> Option<(Candidate, bool)> {
        let rules = Rules {
            features: self.numeric_features(),
            explicit: self.explicit_types(),
        };
        let viable: Vec<Candidate> = candidates
            .iter()
            .copied()
            .filter(|candidate| {
                self.candidate(*candidate)
                    .is_some_and(|function| viable(rules, function, arguments))
            })
            .collect();
        let mut incumbent = *viable.first()?;
        for candidate in viable.iter().skip(1) {
            let (Some(current), Some(challenger)) =
                (self.candidate(incumbent), self.candidate(*candidate))
            else {
                continue;
            };
            if has_better_parameter(rules, arguments, current, challenger)
                && !has_better_parameter(rules, arguments, challenger, current)
            {
                incumbent = *candidate;
            }
        }
        let best = self.candidate(incumbent)?;
        let tie = viable.iter().any(|candidate| {
            *candidate != incumbent
                && self.candidate(*candidate).is_some_and(|other| {
                    has_better_parameter(rules, arguments, best, other)
                        || equivalent(rules, arguments, best, other)
                })
        });
        Some((incumbent, tie))
    }

    fn function_call(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        arguments: &[Expression],
    ) -> Operand {
        if name == rglsl_ast::NON_UNIFORM {
            return self.non_uniform(expression, span, arguments);
        }
        if name == DEBUG_PRINTF || name == ABORT {
            return self.message_call(expression, span, name, arguments);
        }
        if super::cooperative_call::cooperative_function(name)
            && self.scopes.function_levels(name).is_empty()
        {
            return self.cooperative_call(expression, span, name, arguments);
        }
        if super::tensor::tensor_arm_function(name) && self.scopes.function_levels(name).is_empty()
        {
            return self.tensor_arm_call(expression, span, name, arguments);
        }
        if self.scopes.function_levels(name).is_empty() {
            if let Some(call) = super::cooperative_matrix2::tensor_call(name) {
                return self.tensor_function(expression, span, name, call, arguments);
            }
            if super::cooperative_matrix2::matrix_call(name) {
                return self.matrix2_function(expression, span, name, arguments);
            }
        }
        let operands: Vec<Operand> = arguments
            .iter()
            .map(|argument| self.expression(argument))
            .collect();
        if let Some(Lookup::Symbol(id)) = self.lookup(name) {
            let is_struct = matches!(
                self.symbol(id).map(|symbol| &symbol.kind),
                Some(SymbolKind::Struct(_) | SymbolKind::Reference(_))
            );
            if !is_struct {
                self.error(span, DiagnosticKind::NotAFunction(String::from(name)));
                return Operand::error();
            }
        }
        let types: Vec<Type> = operands.iter().map(|operand| operand.ty.clone()).collect();
        if types
            .iter()
            .any(|ty| ty.sized_vector_length().is_some() && !ty.is_array())
            && self.scopes.function_levels(name).is_empty()
            && !self.builtins.overloads(name).is_empty()
        {
            return self.long_vector_builtin(expression, span, name, arguments, &operands);
        }
        let levels: Vec<Vec<Candidate>> = self
            .scopes
            .function_levels(name)
            .into_iter()
            .map(|level| level.iter().copied().map(Candidate::User).collect())
            .collect();
        let builtins: Vec<Candidate> = self
            .builtins
            .overloads(name)
            .iter()
            .copied()
            .map(Candidate::Builtin)
            .collect();
        if levels.is_empty() && builtins.is_empty() {
            self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
            return Operand::error();
        }
        if types.iter().any(Type::is_error) {
            return Operand::error();
        }
        let exact = levels
            .iter()
            .flatten()
            .chain(&builtins)
            .copied()
            .find(|candidate| {
                self.candidate(*candidate)
                    .is_some_and(|function| function.same_parameter_types(&types))
            });
        let chosen = match exact {
            Some(candidate) => candidate,
            None => {
                let candidates = levels.first().unwrap_or(&builtins);
                match self.select(candidates, &types) {
                    None => {
                        self.error(span, DiagnosticKind::NoMatchingFunction(String::from(name)));
                        return Operand::error();
                    }
                    Some((_, true)) => {
                        self.error(span, DiagnosticKind::AmbiguousCall(String::from(name)));
                        return Operand::error();
                    }
                    Some((candidate, false)) => candidate,
                }
            }
        };
        let Some(function) = self.candidate(chosen).cloned() else {
            return Operand::error();
        };
        if let Candidate::User(id) = chosen {
            self.called
                .entry(self.current_function)
                .or_default()
                .insert(id);
        }
        self.calls.insert(
            expression.id,
            match chosen {
                Candidate::User(id) => Callee::Function(id),
                Candidate::Builtin(id) => Callee::Builtin(id),
            },
        );
        let is_builtin = matches!(chosen, Candidate::Builtin(_));
        if is_builtin {
            self.builtin_extensions(span, name);
        }
        if is_builtin && name == "barrier" {
            self.tessellation_barrier(span);
        }
        let first_argument = arguments.first().map_or(span, |argument| argument.span);
        let mut failed = false;
        if function.spirv_instruction.is_some() {
            let literal_failed =
                operands
                    .iter()
                    .zip(&function.parameters)
                    .any(|(operand, parameter)| {
                        parameter.qualifiers.spirv_literal
                            && (!operand.constant || operand.specialization)
                    });
            if literal_failed {
                self.error(
                    first_argument,
                    DiagnosticKind::SpirvIntrinsic {
                        subject: String::from("spirv_literal"),
                        reason: "Non front-end constant expressions cannot be passed for 'spirv_literal' parameters.",
                    },
                );
                failed = true;
            }
        }
        for ((argument, operand), parameter) in
            arguments.iter().zip(&operands).zip(&function.parameters)
        {
            if parameter.direction.is_output() {
                self.per_vertex_output_check(argument);
                if !self.require_lvalue(first_argument, operand) {
                    failed = true;
                }
            }
            if !is_builtin
                && operand.ty.contains_opaque(&self.types)
                && !self.keeps_memory_qualifiers(operand, parameter)
            {
                self.error(
                    first_argument,
                    DiagnosticKind::InvalidQualifier {
                        qualifier: "memory",
                        reason: "an argument cannot drop a memory qualifier",
                    },
                );
                failed = true;
            }
            if parameter.direction.is_input() {
                self.record_conversion(argument, &operand.ty, &parameter.ty);
            }
            if parameter.direction.is_output() && operand.ty != parameter.ty {
                if let Some(info) = self.expressions.get_mut(&argument.id) {
                    info.output_conversion = Some(parameter.ty.clone());
                }
            }
        }
        if is_builtin && !failed {
            if let Some(extensions) = crate::builtins::ray::function_extensions(name) {
                failed = !self.require_extensions(span, extensions, name);
            }
        }
        if is_builtin && !failed {
            failed = !self.ray_builtin_checks(span, name, &operands);
        }
        if is_builtin && !failed {
            failed = !self.builtin_checks(span, name, &operands);
            let reason = "{} types can only be in uniform block or buffer storage";
            if !self.require_small_arithmetic(
                span,
                &function.return_type,
                "built-in function",
                reason,
            ) {
                failed = true;
            }
            for operand in &operands {
                if !self.require_small_arithmetic(
                    first_argument,
                    &operand.ty,
                    "built-in function",
                    reason,
                ) {
                    failed = true;
                }
            }
        }
        if is_builtin && !failed && subgroup::is_subgroup_operation(name) {
            failed = !self.subgroup_checks(span, name, &operands);
        }
        if failed {
            return Operand::error();
        }
        let constant = is_builtin
            && (FOLDED_BUILTINS.contains(&name) || FOLDED_VECTOR_BUILTINS.contains(&name))
            && operands
                .iter()
                .all(|operand| operand.constant && !operand.specialization);
        let value = if constant {
            let converted: Option<Vec<Constant>> = operands
                .iter()
                .zip(&function.parameters)
                .map(|(operand, parameter)| {
                    let scalar = parameter.ty.base_scalar()?;
                    operand.value.as_ref().map(|value| value.convert(scalar))
                })
                .collect();
            converted.and_then(|converted| fold_builtin(name, &converted))
        } else {
            None
        };
        Operand {
            constant,
            value,
            non_uniform: !is_builtin && function.return_qualifiers.nonuniform,
            ..Operand::temporary(function.return_type)
        }
    }

    fn non_uniform(
        &mut self,
        expression: &Expression,
        span: Span,
        arguments: &[Expression],
    ) -> Operand {
        let operands: Vec<Operand> = arguments
            .iter()
            .map(|argument| self.expression(argument))
            .collect();
        if operands.iter().any(|operand| operand.ty.is_error()) {
            return Operand::error();
        }
        let reason = match operands.as_slice() {
            [] => Some("not enough data provided for construction"),
            [_, _, ..] => Some("too many arguments"),
            [operand] if operand.ty.is_void() => Some("cannot convert a void"),
            [operand] if operand.ty.outer_size() == Some(ArraySize::Unsized) => {
                Some("array argument must be sized")
            }
            [operand] if operand.ty.is_array() => {
                Some("array constructor needs one argument per array element")
            }
            [_] => None,
        };
        if let Some(reason) = reason {
            self.error(
                span,
                DiagnosticKind::InvalidConstructor {
                    ty: String::from(rglsl_ast::NON_UNIFORM),
                    reason,
                },
            );
            return Operand::error();
        }
        let Some(operand) = operands.into_iter().next() else {
            return Operand::error();
        };
        if !self.readable(span, &operand) {
            return Operand::error();
        }
        self.calls.insert(expression.id, Callee::NonUniform);
        Operand {
            non_uniform: true,
            ..Operand::temporary(operand.ty)
        }
    }

    fn message_call(
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
        let abort = name == ABORT;
        let (extension, callee) = if abort {
            ("GL_EXT_abort", Callee::Abort)
        } else {
            ("GL_EXT_debug_printf", Callee::DebugPrintf)
        };
        let mut failed = !self.require_extension(span, extension, name);
        let invalid = |analyzer: &mut Self, reason: &'static str| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidBuiltinCall {
                    name: String::from(name),
                    reason,
                },
            );
        };
        let literal = arguments
            .first()
            .is_some_and(|argument| matches!(argument.kind, ExpressionKind::String(_)));
        let optional = abort && arguments.is_empty();
        if !(literal || optional) {
            invalid(self, "first argument must be a string literal");
            failed = true;
        }
        for operand in operands.iter().skip(1) {
            if operand.ty.is_error() {
                failed = true;
                continue;
            }
            if !self.readable(span, operand) {
                failed = true;
                continue;
            }
            if !abort {
                continue;
            }
            let reason = if operand.ty.is_string() {
                Some("argument cannot be a string, only the message may be a string")
            } else if operand.ty.contains_opaque(&self.types) {
                Some("argument cannot be an opaque type")
            } else if self.contains_unsized_array(&operand.ty) {
                Some("argument cannot be a run-time sized array")
            } else if operand.ty.contains_scalar(&self.types, Scalar::Bool)
                && !operand.ty.is_scalar()
                && !operand.ty.is_vector()
            {
                Some("argument cannot be an aggregate containing a bool")
            } else {
                None
            };
            if let Some(reason) = reason {
                invalid(self, reason);
                failed = true;
            }
        }
        if failed || operands.iter().any(|operand| operand.ty.is_error()) {
            return Operand::error();
        }
        self.calls.insert(expression.id, callee);
        Operand::temporary(Type::VOID)
    }

    pub(crate) fn builtin_extensions(&mut self, span: Span, name: &str) {
        if matches!(name, "subgroupQuadAll" | "subgroupQuadAny") {
            self.require_extension(span, subgroup::QUAD_CONTROL, name);
        }
        if let Some(extension) = subgroup::function_extension(name) {
            self.require_extension(span, extension, name);
        }
        if matches!(name, "expectEXT" | "assumeEXT") {
            self.require_extension(span, "GL_EXT_expect_assume", name);
        }
        let lower = name.to_ascii_lowercase();
        if lower.contains("bfloat16") {
            self.require_extension(span, "GL_EXT_bfloat16", name);
        } else if lower.contains("floate4m3") {
            self.require_extension(span, "GL_EXT_float_e4m3", name);
        } else if lower.contains("floate5m2") {
            self.require_extension(span, "GL_EXT_float_e5m2", name);
        }
        self.mesh_function_extension(span, name);
        if let Some(extension) = super::qcom::function_extension(name) {
            self.require_extension(span, extension, name);
        }
    }

    fn subgroup_checks(&mut self, span: Span, name: &str, operands: &[Operand]) -> bool {
        let invalid = |analyzer: &mut Self, reason: &'static str| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidBuiltinCall {
                    name: String::from(name),
                    reason,
                },
            );
            false
        };
        let spirv = self.options.spirv_version;
        let mut valid = true;
        if name.starts_with("subgroupClustered") && name != "subgroupClusteredRotate" {
            let size = operands.get(1).filter(|operand| {
                operand.constant && !operand.specialization && operand.value.is_some()
            });
            match size.and_then(|operand| operand.value.as_ref().and_then(Constant::scalar_i64)) {
                None => valid = invalid(self, "the cluster size must be a compile-time constant"),
                Some(size) if size < 1 => {
                    valid = invalid(self, "the cluster size must be at least 1");
                }
                Some(size) if size.count_ones() != 1 => {
                    valid = invalid(self, "the cluster size must be a power of 2");
                }
                Some(_) => {}
            }
        }
        if matches!(name, "subgroupBroadcast" | "subgroupQuadBroadcast")
            && spirv.is_some_and(|version| version < (1, 5))
            && operands
                .get(1)
                .is_some_and(|operand| !operand.constant || operand.specialization)
        {
            valid = invalid(self, "the id must be a compile-time constant");
        }
        if spirv.is_some_and(|version| version < (1, 3)) {
            self.error(
                span,
                DiagnosticKind::SpirvVersionRequired {
                    feature: "subgroup op",
                    version: "1.3",
                },
            );
            valid = false;
        }
        let extension = operands
            .first()
            .and_then(|operand| operand.ty.base_scalar())
            .and_then(|scalar| match scalar {
                Scalar::Int8 | Scalar::Uint8 => Some(subgroup::EXTENDED_INT8),
                Scalar::Int16 | Scalar::Uint16 => Some(subgroup::EXTENDED_INT16),
                Scalar::Int64 | Scalar::Uint64 => Some(subgroup::EXTENDED_INT64),
                Scalar::Float16 => Some(subgroup::EXTENDED_FLOAT16),
                _ => None,
            });
        if let Some(extension) = extension {
            valid &= self.require_extension(span, extension, name);
        }
        valid
    }

    fn contains_unsized_array(&self, ty: &Type) -> bool {
        if ty.contains_unsized_array(&self.types) {
            return true;
        }
        match ty.kind {
            TypeKind::Block(id) => self.types.block(id).is_some_and(|block| {
                block
                    .members
                    .iter()
                    .any(|member| self.contains_unsized_array(&member.ty))
            }),
            _ => false,
        }
    }

    fn keeps_memory_qualifiers(&self, operand: &Operand, parameter: &Parameter) -> bool {
        let Some(argument) = operand
            .root
            .and_then(|id| self.symbol(id))
            .and_then(|symbol| symbol.variable())
            .map(|variable| &variable.qualifiers)
        else {
            return true;
        };
        let formal = &parameter.qualifiers;
        (!argument.readonly || formal.readonly)
            && (!argument.writeonly || formal.writeonly)
            && (!argument.volatile || formal.volatile)
            && (!argument.coherent || formal.coherent)
    }

    fn builtin_checks(&mut self, span: Span, name: &str, operands: &[Operand]) -> bool {
        let invalid = |analyzer: &mut Self, span: Span, reason: &'static str| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidBuiltinCall {
                    name: String::from(name),
                    reason,
                },
            );
            false
        };
        if !self.memory_scope_checks(span, name, operands) {
            return false;
        }
        let first = operands.first();
        if name.starts_with("interpolateAt") {
            if first.is_some_and(|operand| operand.storage != Storage::In) {
                return invalid(self, span, "the first argument must be an interpolant");
            }
        } else if name.starts_with("atomic") {
            if first.is_some_and(|operand| {
                !matches!(
                    operand.storage,
                    Storage::Buffer | Storage::Shared | Storage::TaskPayloadShared
                )
            }) {
                return invalid(
                    self,
                    span,
                    "the first argument must be a buffer or shared variable",
                );
            }
        } else if name.starts_with("imageAtomic") || name == "imageStore" || name == "imageLoad" {
            let qualifiers = first
                .and_then(|operand| operand.root)
                .and_then(|id| self.symbol(id))
                .and_then(|symbol| symbol.variable())
                .map(|variable| (variable.qualifiers.readonly, variable.qualifiers.writeonly));
            let integer_image = first
                .and_then(|operand| operand.ty.as_opaque())
                .is_some_and(|opaque| opaque.sampled != crate::types::SampledType::Float);
            let has_atomic_format = first
                .and_then(|operand| operand.root)
                .and_then(|id| self.symbol(id))
                .and_then(|symbol| symbol.variable())
                .is_some_and(|variable| {
                    ["r32i", "r32ui", "r64i", "r64ui"]
                        .iter()
                        .any(|format| variable.qualifiers.has_layout(format))
                });
            if name.starts_with("imageAtomic") && integer_image && !has_atomic_format {
                return invalid(self, span, "the image format must be r32i or r32ui");
            }
            if let Some((readonly, writeonly)) = qualifiers {
                if readonly && name != "imageLoad" {
                    return invalid(self, span, "the image is `readonly`");
                }
                if writeonly && name != "imageStore" {
                    return invalid(self, span, "the image is `writeonly`");
                }
            }
        }
        let offset_index = match name {
            "textureOffset" | "textureProjOffset" => Some(2),
            "texelFetchOffset" | "textureLodOffset" | "textureProjLodOffset" => Some(3),
            "textureGradOffset" | "textureProjGradOffset" => Some(4),
            _ => None,
        };
        if let Some(index) = offset_index {
            if let Some(operand) = operands.get(index) {
                if !operand.constant {
                    if !self
                        .extensions
                        .is_requested("GL_EXT_texture_offset_non_const")
                    {
                        return invalid(self, span, "the offset must be a constant expression");
                    }
                } else if let Some(constant) = &operand.value {
                    let limits = &self.options.limits;
                    let range = i64::from(limits.min_program_texel_offset)
                        ..=i64::from(limits.max_program_texel_offset);
                    let outside = constant
                        .values
                        .iter()
                        .filter_map(|value| value.as_i64())
                        .any(|value| !range.contains(&value));
                    if outside {
                        return invalid(self, span, "the offset is out of range");
                    }
                }
            }
        }
        let shadow = first
            .and_then(|operand| operand.ty.as_opaque())
            .is_some_and(|opaque| opaque.shadow);
        if name == "textureGatherOffsets" {
            let index = if shadow { 3 } else { 2 };
            if let Some(operand) = operands.get(index) {
                if !operand.constant || operand.specialization {
                    return invalid(self, span, "the offsets must be constant");
                }
            }
        }
        if name.starts_with("textureGather") && !shadow {
            let index = if name == "textureGather"
                || (super::qcom::gather_function(name) && !name.contains("Offset"))
            {
                2
            } else {
                3
            };
            if let Some(operand) = operands.get(index) {
                if !operand.constant || operand.specialization {
                    return invalid(self, span, "the component must be constant");
                }
                let component = operand.value.as_ref().and_then(Constant::scalar_i64);
                if component.is_some_and(|component| !(0..=3).contains(&component)) {
                    return invalid(self, span, "the component must be 0, 1, 2 or 3");
                }
            }
        }
        true
    }

    fn texture_sampler_constructor(
        &mut self,
        span: Span,
        target: Opaque,
        operands: &[Operand],
    ) -> bool {
        let texture = operands.first().and_then(|operand| operand.ty.as_opaque());
        let sampler = operands.get(1).and_then(|operand| operand.ty.as_opaque());
        let reason = match (operands.len(), texture, sampler) {
            (2, Some(texture), Some(sampler)) => {
                let expected = Opaque {
                    kind: OpaqueKind::Texture,
                    shadow: false,
                    ..target
                };
                if texture != expected {
                    Some("the first argument must be the matching texture type")
                } else if sampler.kind != OpaqueKind::Sampler {
                    Some("the second argument must be a `sampler` or `samplerShadow`")
                } else {
                    None
                }
            }
            (2, _, _) => Some("the arguments must be a texture and a sampler"),
            _ => Some("a combined sampler is constructed from a texture and a sampler"),
        };
        match reason {
            Some(reason) => {
                self.error(
                    span,
                    DiagnosticKind::InvalidConstructor {
                        ty: self.show(&Type::opaque(target)),
                        reason,
                    },
                );
                false
            }
            None => true,
        }
    }

    fn constructor(
        &mut self,
        expression: &Expression,
        span: Span,
        specifier: &TypeSpecifier,
        arguments: &[Expression],
    ) -> Operand {
        let mut ty = self.bare_type_specifier(specifier, span);
        let operands: Vec<Operand> = arguments
            .iter()
            .map(|argument| self.expression(argument))
            .collect();
        if ty.is_error() || operands.iter().any(|operand| operand.ty.is_error()) {
            return Operand::error();
        }
        let fail = |analyzer: &mut Self, ty: &Type, reason: &'static str| {
            analyzer.error(
                span,
                DiagnosticKind::InvalidConstructor {
                    ty: analyzer.show(ty),
                    reason,
                },
            );
            Operand::error()
        };
        if let Some(opaque) = ty.as_opaque() {
            if opaque.kind == OpaqueKind::AccelerationStructure {
                if !Self::acceleration_structure_constructor(&operands) {
                    return fail(self, &ty, "cannot construct with these arguments");
                }
                self.calls
                    .insert(expression.id, Callee::Constructor(ty.clone()));
                return Operand::temporary(ty);
            }
            if opaque.kind != OpaqueKind::CombinedSampler {
                return fail(self, &ty, "this type has no constructor");
            }
            if !self.texture_sampler_constructor(span, opaque, &operands) {
                return Operand::error();
            }
            self.calls
                .insert(expression.id, Callee::Constructor(ty.clone()));
            return Operand::temporary(ty);
        }
        if ty.is_void() || matches!(ty.kind, TypeKind::Block(_)) || ty.is_opaque() {
            return fail(self, &ty, "this type has no constructor");
        }
        if operands.iter().any(|operand| operand.ty.is_void()) {
            return fail(self, &ty, "an argument is `void`");
        }
        if operands.iter().any(|operand| operand.ty.is_string()) {
            return fail(self, &ty, "cannot convert a string");
        }
        let encoded = |ty: &Type| ty.base_scalar().is_some_and(Scalar::is_encoded_float);
        let boolean = |ty: &Type| ty.base_scalar() == Some(Scalar::Bool);
        if !ty.is_array()
            && operands.iter().any(|operand| {
                (encoded(&ty) && boolean(&operand.ty)) || (boolean(&ty) && encoded(&operand.ty))
            })
        {
            return fail(self, &ty, "can't convert");
        }
        if !ty.is_array()
            && matches!(
                ty.kind,
                TypeKind::CooperativeMatrix(_)
                    | TypeKind::LongVector { .. }
                    | TypeKind::CooperativeVector { .. }
            )
        {
            let operand = self.cooperative_constructor(span, &ty, &operands);
            if !operand.ty.is_error() {
                self.calls
                    .insert(expression.id, Callee::Constructor(ty.clone()));
            }
            return operand;
        }
        let numeric =
            !ty.is_array() && matches!(ty.kind, TypeKind::Scalar(_) | TypeKind::Vector { .. });
        if ty.is_reference() || numeric {
            if let Some(operand) = self.reference_constructor(span, &ty, &operands) {
                if !operand.ty.is_error() {
                    self.calls
                        .insert(expression.id, Callee::Constructor(ty.clone()));
                }
                return operand;
            }
        }
        let any_specialization = operands.iter().any(|operand| operand.specialization);
        let has_scalar = |test: fn(Scalar) -> bool| {
            operands
                .iter()
                .any(|operand| operand.ty.base_scalar().is_some_and(test))
        };
        let keeps_specialization = match ty.kind {
            _ if ty.is_array() => false,
            TypeKind::Scalar(scalar) | TypeKind::Vector { scalar, .. } if !scalar.is_floating() => {
                !has_scalar(Scalar::is_floating)
            }
            TypeKind::Vector {
                scalar: Scalar::Float,
                ..
            } => !has_scalar(Scalar::is_integer),
            TypeKind::Scalar(target) if target.is_floating() => operands.iter().all(|operand| {
                operand
                    .ty
                    .base_scalar()
                    .is_some_and(|scalar| scalar.is_floating() && scalar != target)
            }),
            _ => false,
        };
        let foldable = ty.is_array()
            || matches!(ty.kind, TypeKind::Struct(_))
            || self.small_arithmetic_allowed(&[&ty])
            || operands
                .iter()
                .all(|operand| operand.ty.base_scalar() == ty.base_scalar());
        let constant = operands.iter().all(|operand| operand.constant)
            && (!any_specialization || keeps_specialization)
            && foldable;
        let count = u32::try_from(operands.len()).unwrap_or(u32::MAX);
        let mut element_types: Vec<Type> = Vec::new();
        if ty.is_array() {
            if operands.is_empty() {
                return fail(
                    self,
                    &ty,
                    "an array constructor needs at least one argument",
                );
            }
            match ty.outer_size() {
                Some(ArraySize::Unsized) => {
                    if let Some(first) = ty.array.first_mut() {
                        *first = ArraySize::Sized(count);
                    }
                }
                Some(ArraySize::Sized(size)) if size != count => {
                    return fail(
                        self,
                        &ty,
                        "an array constructor needs one argument per element",
                    );
                }
                _ => {}
            }
            if ty.array.len() > 1 {
                let inner = operands.first().map(|operand| operand.ty.array.clone());
                match inner {
                    Some(inner) if inner.len() + 1 == ty.array.len() => {
                        for (slot, size) in ty.array.iter_mut().skip(1).zip(inner) {
                            if *slot == ArraySize::Unsized {
                                *slot = size;
                            }
                        }
                    }
                    _ => {
                        return fail(
                            self,
                            &ty,
                            "the arguments are not arrays of the element type",
                        )
                    }
                }
            }
            let Some(element) = ty.element_type() else {
                return Operand::error();
            };
            element_types = operands.iter().map(|_| element.clone()).collect();
        } else if let TypeKind::Struct(id) = ty.kind {
            let members: Vec<Type> = self
                .types
                .structure(id)
                .map(|structure| {
                    structure
                        .members
                        .iter()
                        .map(|member| member.ty.clone())
                        .collect()
                })
                .unwrap_or_default();
            if members.len() != operands.len() {
                return fail(
                    self,
                    &ty,
                    "a struct constructor needs one argument per member",
                );
            }
            element_types = members;
        }
        if !element_types.is_empty() {
            if matches!(ty.kind, TypeKind::Struct(_)) {
                for operand in &operands {
                    self.require_small_arithmetic(
                        span,
                        &operand.ty,
                        &self.show(&ty),
                        "can't construct structure containing 16-bit type",
                    );
                }
            }
            if ty.is_array() {
                self.require_small_arithmetic(
                    span,
                    &ty,
                    &self.show(&ty),
                    "{} arrays not supported",
                );
            }
            for (operand, element) in operands.iter().zip(&element_types) {
                if !self.converts(&operand.ty, element) {
                    return fail(
                        self,
                        &ty,
                        "an argument cannot be converted to the element type",
                    );
                }
            }
            for ((argument, operand), element) in
                arguments.iter().zip(&operands).zip(&element_types)
            {
                self.record_conversion(argument, &operand.ty, element);
            }
            let value = if constant {
                operands
                    .iter()
                    .zip(&element_types)
                    .map(|(operand, element)| {
                        operand
                            .value
                            .as_ref()
                            .map(|value| match element.base_scalar() {
                                Some(scalar) => value.convert(scalar).values,
                                None => value.values.clone(),
                            })
                    })
                    .collect::<Option<Vec<Vec<Value>>>>()
                    .map(|values| Constant::new(values.concat()))
            } else {
                None
            };
            self.calls
                .insert(expression.id, Callee::Constructor(ty.clone()));
            return Operand {
                constant,
                value,
                ..Operand::temporary(ty)
            };
        }
        let Some(needed) = ty.component_count() else {
            return Operand::error();
        };
        let Some(target_scalar) = ty.base_scalar() else {
            return Operand::error();
        };
        let is_matrix = matches!(ty.kind, TypeKind::Matrix { .. });
        if ty.is_vector() && operands.len() != 1 {
            self.require_small_arithmetic(
                span,
                &ty,
                &self.show(&ty),
                "{} vectors only take vector types",
            );
        }
        let mut size = 0_u32;
        let mut full = false;
        let mut over_full = false;
        let mut matrix_argument = false;
        for operand in &operands {
            if operand.ty.is_array() {
                return fail(self, &ty, "an argument is an array");
            }
            let Some(components) = operand.ty.component_count() else {
                return fail(self, &ty, "an argument is not a scalar, vector or matrix");
            };
            if is_matrix && operand.ty.is_matrix() {
                matrix_argument = true;
            }
            if full {
                over_full = true;
            }
            size = size.saturating_add(components);
            if size >= needed {
                full = true;
            }
        }
        if matrix_argument {
            if operands.len() != 1 {
                return fail(
                    self,
                    &ty,
                    "a matrix constructed from a matrix takes one argument",
                );
            }
        } else if over_full {
            return fail(self, &ty, "too many arguments");
        } else if size != 1 && size < needed {
            return fail(self, &ty, "not enough components");
        }
        self.calls
            .insert(expression.id, Callee::Constructor(ty.clone()));
        let value = if constant {
            self.fold_constructor(&ty, target_scalar, needed, &operands)
        } else {
            None
        };
        Operand {
            constant,
            value,
            ..Operand::temporary(ty)
        }
    }

    pub(crate) fn fold_constructor(
        &self,
        ty: &Type,
        scalar: Scalar,
        needed: u32,
        operands: &[Operand],
    ) -> Option<Constant> {
        let needed = usize::try_from(needed).ok()?;
        let mut values: Vec<Value> = Vec::new();
        for operand in operands {
            values.extend(operand.value.as_ref()?.convert(scalar).values);
        }
        if let (TypeKind::Matrix { columns, rows, .. }, [single]) = (ty.kind, operands) {
            let columns = usize::from(columns);
            let rows = usize::from(rows);
            let (source_columns, source_rows) = match single.ty.kind {
                TypeKind::Matrix { columns, rows, .. } => (usize::from(columns), usize::from(rows)),
                TypeKind::Scalar(_) => (0, 0),
                _ => (usize::MAX, usize::MAX),
            };
            if source_columns != usize::MAX {
                let diagonal = values.first().copied();
                let mut result = Vec::with_capacity(needed);
                for column in 0..columns {
                    for row in 0..rows {
                        let value = if column < source_columns && row < source_rows {
                            values.get(column * source_rows + row).copied()?
                        } else if column == row {
                            if source_columns == 0 {
                                diagonal?
                            } else {
                                Value::one(scalar)
                            }
                        } else {
                            Value::zero(scalar)
                        };
                        result.push(value);
                    }
                }
                return Some(Constant::new(result));
            }
        }
        if values.len() == 1 && needed > 1 {
            let value = values.first().copied()?;
            return Some(Constant::new(alloc::vec![value; needed]));
        }
        values.truncate(needed);
        (values.len() == needed).then(|| Constant::new(values))
    }
}
