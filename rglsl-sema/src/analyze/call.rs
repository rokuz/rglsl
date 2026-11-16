use crate::scope::QualifierFlags;
use alloc::boxed::Box;
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::Span;
use rglsl_ast::ast::{
    Expression, ExpressionKind, FunctionCall, FunctionIdentifier, Identifier, TypeSpecifier,
};
use rglsl_types::extension::Extension;
use rglsl_types::small_vec::SmallVec;

use super::{Analyzer, Callee, Operand};
use crate::builtins::kind::{
    AmdShaderBallot, AtomicOperation, Barrier, BuiltinKind, Collective, Gather, GatherOffsets,
    Pure, Relation, Sample, Subgroup, SubgroupFunction, Texture, TextureGather, TextureLevel,
};
use crate::builtins::{BuiltinFlags, BuiltinFunctionId};
use crate::constant::{Constant, ConstantValues, Value, fold_builtin};
use crate::diagnostic::DiagnosticKind;
use crate::layout_id::LayoutId;
use crate::scope::{Function, Lookup, Parameter, Storage, SymbolKind};
use crate::types::{ArraySize, NumericFeatures, Opaque, OpaqueKind, Scalar, Type, TypeKind};
use rglsl_types::{ShaderStage, ShaderStageMask};

#[derive(Clone, Copy, PartialEq, Eq)]
enum Candidate {
    User(crate::scope::FunctionId),
    Builtin(crate::builtins::BuiltinFunctionId),
}

#[derive(Clone, PartialEq)]
enum CallOutcome {
    LongVector,
    Missing,
    ErrorOperands,
    User(crate::scope::FunctionId),
    Builtin(alloc::boxed::Box<Function>),
    NoMatch,
    Ambiguous,
}

impl CallOutcome {
    fn error(&self, name: &str) -> Option<DiagnosticKind> {
        match *self {
            Self::Missing | Self::NoMatch => {
                Some(DiagnosticKind::NoMatchingFunction(String::from(name)))
            }
            Self::Ambiguous => Some(DiagnosticKind::AmbiguousCall(String::from(name))),
            Self::LongVector | Self::ErrorOperands | Self::User(_) | Self::Builtin(_) => None,
        }
    }
}

#[derive(Clone, Copy)]
struct Rules {
    features: NumericFeatures,
    explicit: bool,
}

fn convertible(rules: Rules, from: &Type, to: &Type) -> bool {
    from.converts_with(to, rules.features) || from.passes_as_cooperative_vector(to)
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

#[derive(Clone, Copy, PartialEq, Eq)]
enum ImageAccess {
    Load,
    Store,
    Atomic,
}

const fn image_access(kind: BuiltinKind) -> Option<ImageAccess> {
    let BuiltinKind::Texture(texture) = kind else {
        return None;
    };
    match texture {
        Texture::ImageLoad { .. } => Some(ImageAccess::Load),
        Texture::ImageStore { .. } => Some(ImageAccess::Store),
        Texture::ImageAtomic(_) => Some(ImageAccess::Atomic),
        Texture::Footprint { .. }
        | Texture::Sample(_)
        | Texture::Gather(_)
        | Texture::Fetch { .. }
        | Texture::Query(_)
        | Texture::QueryLod
        | Texture::SparseTexelsResident
        | Texture::ImageProcessing(_)
        | Texture::SubpassLoad
        | Texture::FragmentFetch { .. } => None,
    }
}

const fn offset_index(kind: BuiltinKind) -> Option<usize> {
    let BuiltinKind::Texture(texture) = kind else {
        return None;
    };
    match texture {
        Texture::Sample(Sample {
            offset: true,
            level,
            ..
        }) => Some(match level {
            TextureLevel::Implicit => 2,
            TextureLevel::Lod => 3,
            TextureLevel::Gradient => 4,
        }),
        Texture::Fetch { offset: true, .. } => Some(3),
        Texture::Sample(_)
        | Texture::Fetch { .. }
        | Texture::Footprint { .. }
        | Texture::Gather(_)
        | Texture::ImageLoad { .. }
        | Texture::ImageStore { .. }
        | Texture::ImageAtomic(_)
        | Texture::Query(_)
        | Texture::QueryLod
        | Texture::SparseTexelsResident
        | Texture::ImageProcessing(_)
        | Texture::SubpassLoad
        | Texture::FragmentFetch { .. } => None,
    }
}

const DEBUG_PRINTF: &str = "debugPrintfEXT";
const ABORT: &str = "abortEXT";

pub(crate) type Operands = SmallVec<Operand, 1>;

impl Analyzer<'_> {
    pub(crate) fn operands(&mut self, arguments: &[Expression]) -> Operands {
        let mut operands = Operands::with_capacity(arguments.len());
        for argument in arguments {
            operands.push(self.expression(argument));
        }
        operands
    }

    pub(crate) fn call_expression(
        &mut self,
        expression: &Expression,
        call: &FunctionCall,
    ) -> Operand {
        let close = super::expression::closing_parenthesis(expression);
        match &call.function.node {
            FunctionIdentifier::Function(name) => {
                self.function_call(expression, close, name, &call.arguments)
            }
            FunctionIdentifier::Constructor(specifier) => {
                self.constructor(expression, close, specifier, &call.arguments)
            }
            FunctionIdentifier::Cast(specifier) => {
                let castable = self.castable(close, specifier, &call.arguments);
                if castable {
                    self.constructor(expression, close, specifier, &call.arguments)
                } else {
                    Operand::error()
                }
            }
            FunctionIdentifier::Method { object, name } => {
                let operand = self.expression(object);
                self.operands(&call.arguments);
                self.method_with(expression, name, &call.arguments, operand)
            }
            FunctionIdentifier::Expression(callee) => {
                self.expression(callee);
                self.operands(&call.arguments);
                self.error(close, DiagnosticKind::InvalidCallee);
                Operand::error()
            }
        }
    }

    fn castable(
        &mut self,
        span: Span,
        specifier: &TypeSpecifier,
        arguments: &[Expression],
    ) -> bool {
        let ty = self.bare_type_specifier(specifier, span);
        let castable = !ty.is_array()
            && matches!(
                ty.kind,
                TypeKind::Scalar(_)
                    | TypeKind::Vector { .. }
                    | TypeKind::Matrix { .. }
                    | TypeKind::Reference(_)
            );
        if ty.is_error() || castable {
            return true;
        }
        self.operands(arguments);
        self.error(
            span,
            DiagnosticKind::InvalidConstructor {
                ty: self.show(&ty),
                reason: "type cast has to be either scalar, vector, matrix or buffer reference",
            },
        );
        false
    }

    fn function_call(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        arguments: &[Expression],
    ) -> Operand {
        if name == rglsl_ast::NON_UNIFORM {
            let operands = self.operands(arguments);
            return self.non_uniform_with(expression, span, operands);
        }
        if name == DEBUG_PRINTF || name == ABORT {
            let operands = self.operands(arguments);
            return self.message_call_with(expression, span, name, arguments, &operands);
        }
        let unknown = self.scopes.function_levels(name).is_empty();
        if super::cooperative_call::cooperative_function(name) && unknown {
            let operands = self.operands(arguments);
            return self.cooperative_call_with(expression, span, name, arguments, &operands);
        }
        if super::tensor::tensor_arm_function(name) && unknown {
            let operands = self.operands(arguments);
            return self.tensor_arm_call_with(expression, span, name, arguments, &operands);
        }
        if unknown {
            if let Some(call) = super::cooperative_matrix2::tensor_call(name) {
                return self.tensor_function(expression, span, name, call, arguments);
            }
            if super::cooperative_matrix2::matrix_call(name) {
                return self.matrix2_function(expression, span, name, arguments);
            }
        }
        let operands = self.operands(arguments);
        self.function_call_with(expression, span, name, arguments, &operands)
    }

    fn constructor(
        &mut self,
        expression: &Expression,
        span: Span,
        specifier: &TypeSpecifier,
        arguments: &[Expression],
    ) -> Operand {
        let ty = match self.simple_type_specifier(specifier, span) {
            Some(ty) => ty,
            None => self.bare_type_specifier(specifier, span),
        };
        let operands = self.operands(arguments);
        self.constructor_with(expression, span, arguments, ty, &operands)
    }

    fn candidate(&self, candidate: Candidate) -> Option<&Function> {
        match candidate {
            Candidate::User(id) => self.function(id),
            Candidate::Builtin(id) => self.builtin_functions.function(id),
        }
    }

    fn method_with(
        &mut self,
        expression: &Expression,
        name: &Identifier,
        arguments: &[Expression],
        operand: Operand,
    ) -> Operand {
        let wide = name.node == "length64";
        if name.node != "length" && !wide {
            self.error(name.span, DiagnosticKind::UnknownMethod(name.node.clone()));
            return Operand::error();
        }
        if wide && !self.require_extension(name.span, Extension::ExtShader64bitIndexing, "length64")
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
                let unsized_outer = operand.ty.outer_size() == Some(ArraySize::Unsized);
                let storage = operand.storage;
                let runtime = (storage == Storage::Buffer && !operand.through_reference)
                    || matches!(storage, Storage::In | Storage::Out);
                let shown = self.show(&operand.ty);
                if !runtime {
                    self.error(name.span, DiagnosticKind::InvalidLength(shown));
                    return Operand::error();
                }
                let failed = unsized_outer
                    && self.stage_check(name.span, |stage| {
                        matches!(
                            (storage, stage),
                            (Storage::In, ShaderStage::Geometry)
                                | (Storage::Out, ShaderStage::TessControl)
                        )
                        .then(|| DiagnosticKind::InvalidLength(shown.clone()))
                    });
                if failed {
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

    fn select_functions(
        &self,
        functions: &[&Function],
        arguments: &[Type],
    ) -> Option<(usize, bool)> {
        let rules = Rules {
            features: self.numeric_features(),
            explicit: self.explicit_types(),
        };
        let viable: Vec<usize> = functions
            .iter()
            .enumerate()
            .filter(|&(_, function)| viable(rules, function, arguments))
            .map(|(index, _)| index)
            .collect();
        let mut incumbent = *viable.first()?;
        for &candidate in viable.iter().skip(1) {
            let (Some(current), Some(challenger)) =
                (functions.get(incumbent), functions.get(candidate))
            else {
                continue;
            };
            if has_better_parameter(rules, arguments, current, challenger)
                && !has_better_parameter(rules, arguments, challenger, current)
            {
                incumbent = candidate;
            }
        }
        let best = functions.get(incumbent)?;
        let tie = viable.iter().any(|&candidate| {
            candidate != incumbent
                && functions.get(candidate).is_some_and(|other| {
                    has_better_parameter(rules, arguments, best, other)
                        || equivalent(rules, arguments, best, other)
                })
        });
        Some((incumbent, tie))
    }

    fn call_outcome(&self, name: &str, types: &[Type], builtins: &[&Function]) -> CallOutcome {
        let levels = self.scopes.function_levels(name);
        if types
            .iter()
            .any(|ty| ty.sized_vector_length().is_some() && !ty.is_array())
            && levels.is_empty()
            && !builtins.is_empty()
            && !builtins
                .iter()
                .any(|function| function.same_parameter_types(types))
        {
            return CallOutcome::LongVector;
        }
        if levels.is_empty() && builtins.is_empty() {
            return CallOutcome::Missing;
        }
        if types.iter().any(Type::is_error) {
            return CallOutcome::ErrorOperands;
        }
        for &id in levels.iter().copied().flatten() {
            if self
                .function(id)
                .is_some_and(|function| function.same_parameter_types(types))
            {
                return CallOutcome::User(id);
            }
        }
        if let Some(function) = builtins
            .iter()
            .find(|function| function.same_parameter_types(types))
        {
            return CallOutcome::Builtin(alloc::boxed::Box::new((*function).clone()));
        }
        let selected = match levels.first() {
            Some(level) => {
                let users: Vec<&Function> =
                    level.iter().filter_map(|&id| self.function(id)).collect();
                self.select_functions(&users, types).map(|(index, tie)| {
                    (
                        level
                            .get(index)
                            .map_or(CallOutcome::Missing, |&id| CallOutcome::User(id)),
                        tie,
                    )
                })
            }
            None => self.select_functions(builtins, types).map(|(index, tie)| {
                (
                    builtins
                        .get(index)
                        .map_or(CallOutcome::Missing, |&function| {
                            CallOutcome::Builtin(alloc::boxed::Box::new(function.clone()))
                        }),
                    tie,
                )
            }),
        };
        match selected {
            None => CallOutcome::NoMatch,
            Some((_, true)) => CallOutcome::Ambiguous,
            Some((outcome, false)) => outcome,
        }
    }

    fn call_stages(&mut self, span: Span, name: &str, types: &[Type]) -> bool {
        let Some(tables) = self.tables() else {
            return false;
        };
        let entries = tables.entries(name);
        let overloads = |stage: ShaderStage| {
            entries
                .iter()
                .filter(move |&&(_, stages)| stages.has(stage))
                .map(|(function, _)| function)
        };
        let mut groups: Vec<(Vec<usize>, ShaderStageMask)> = Vec::new();
        for stage in ShaderStage::ALL {
            let key: Vec<usize> = entries
                .iter()
                .enumerate()
                .filter(|&(_, &(_, stages))| stages.has(stage))
                .map(|(index, _)| index)
                .collect();
            let bit = ShaderStageMask::of(stage);
            match groups.iter_mut().find(|&&mut (ref known, _)| *known == key) {
                Some(&mut (_, ref mut stages)) => *stages |= bit,
                None => groups.push((key, bit)),
            }
        }
        if groups.len() < 2 {
            return false;
        }
        let own = self.options.stage;
        let outcome = |analyzer: &Self, stages: ShaderStageMask| {
            let stage = stages.stages().next().unwrap_or(own);
            let functions: Vec<&Function> = overloads(stage).collect();
            analyzer.call_outcome(name, types, &functions)
        };
        let own_stages = groups
            .iter()
            .find(|&&(_, stages)| stages.has(own))
            .map_or(ShaderStageMask::of(own), |&(_, stages)| stages);
        let own_outcome = outcome(self, own_stages);
        let mut keep = ShaderStageMask::all();
        let mut differs = false;
        for &(_, stages) in &groups {
            if stages == own_stages {
                continue;
            }
            let other = outcome(self, stages);
            if other == own_outcome && other != CallOutcome::LongVector {
                continue;
            }
            differs = true;
            match other.error(name) {
                Some(kind) => {
                    for stage in stages.stages() {
                        self.stage_error(stage, span, kind.clone());
                    }
                }
                None => keep &= !stages,
            }
        }
        let suppressed = match own_outcome.error(name) {
            Some(kind) if differs => {
                for stage in own_stages.stages() {
                    self.stage_error(stage, span, kind.clone());
                }
                true
            }
            _ => false,
        };
        self.narrow(keep);
        suppressed
    }

    fn function_call_with(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        arguments: &[Expression],
        operands: &[Operand],
    ) -> Operand {
        if let Some(Lookup::Symbol(id)) = self.lookup_quiet(name) {
            let is_struct = matches!(
                self.symbol(id).map(|symbol| &symbol.kind),
                Some(SymbolKind::Struct(_) | SymbolKind::Reference(_))
            );
            if !is_struct {
                self.error(span, DiagnosticKind::NotAFunction(String::from(name)));
                return Operand::error();
            }
        }
        self.resolve_builtin(name);
        let types: Vec<Type> = operands.iter().map(|operand| operand.ty.clone()).collect();
        if self.is_library() && self.call_stages(span, name, &types) {
            return Operand::error();
        }
        if types
            .iter()
            .any(|ty| ty.sized_vector_length().is_some() && !ty.is_array())
            && self.scopes.function_levels(name).is_empty()
            && !self.builtin_functions.overloads(name).is_empty()
            && !self.builtin_functions.overloads(name).iter().any(|id| {
                self.builtin_functions
                    .function(*id)
                    .is_some_and(|function| function.same_parameter_types(&types))
            })
        {
            return self.long_vector_builtin(expression, span, name, arguments, operands);
        }
        let levels: Vec<Vec<Candidate>> = self
            .scopes
            .function_levels(name)
            .into_iter()
            .map(|level| level.iter().copied().map(Candidate::User).collect())
            .collect();
        let builtins: Vec<Candidate> = self
            .builtin_functions
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
        let builtin = match chosen {
            Candidate::Builtin(id) => Some(id),
            Candidate::User(_) => None,
        };
        let is_builtin = builtin.is_some();
        if let Some(id) = builtin {
            self.builtin_extensions(span, id, name);
        }
        let entry = builtin.and_then(|id| self.builtin_functions.entry(id));
        let kind = entry.map(|entry| entry.kind);
        if kind == Some(BuiltinKind::Barrier(Barrier::Execution)) {
            self.tessellation_barrier(span);
        }
        if let Some(BuiltinKind::Interlock { begin }) = kind {
            self.interlock_call(span, begin, name);
        }
        let first_argument = arguments.first().map_or(span, |argument| argument.span);
        let mut failed = false;
        if function.spirv_instruction.is_some() {
            let literal_failed =
                operands
                    .iter()
                    .zip(&function.parameters)
                    .any(|(operand, parameter)| {
                        parameter
                            .qualifiers
                            .flags
                            .contains(QualifierFlags::SPIRV_LITERAL)
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
            arguments.iter().zip(operands).zip(&function.parameters)
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
            if !is_builtin
                && matches!(operand.ty.kind, TypeKind::Tensor { .. })
                && operand.root.is_none()
            {
                self.error(argument.span, DiagnosticKind::TensorArgumentNotAVariable);
                failed = true;
            }
            if !is_builtin && !Self::image_formats_match(operand, parameter) {
                self.error(
                    first_argument,
                    DiagnosticKind::InvalidQualifier {
                        qualifier: "format",
                        reason: "image formats must match",
                    },
                );
                failed = true;
            } else if !is_builtin && Self::image_format_dropped(operand, parameter) {
                self.error(
                    first_argument,
                    DiagnosticKind::InvalidQualifier {
                        qualifier: "format",
                        reason: "an image with a format cannot be passed to a parameter without one: their SPIR-V image types differ",
                    },
                );
                failed = true;
            }
            if parameter.direction.is_input() {
                self.record_conversion(argument, &operand.ty, &parameter.ty);
            }
            if parameter.direction.is_output()
                && operand.ty != parameter.ty
                && let Some(info) = self.expressions.get_mut(&argument.id)
            {
                info.output_conversion = Some(Box::new(parameter.ty.clone()));
            }
        }
        if !failed
            && let Some(entry) = entry
            && entry.kind.requirements_gate_call()
        {
            failed = !entry
                .requires
                .iter()
                .all(|&extension| self.require_extension(span, extension, name));
        }
        if !failed
            && let Some(entry) = entry
            && let BuiltinKind::Ray(ray) = entry.kind
        {
            failed = !self.ray_builtin_checks(span, ray, name, operands);
        }
        if !failed && let Some(kind) = kind {
            failed = !self.texture_checks(span, kind, name, operands);
        }
        if !failed && let Some(kind) = kind {
            failed = !self.builtin_checks(span, kind, name, operands);
            let reason = "{} types can only be in uniform block or buffer storage";
            if !self.require_small_arithmetic(
                span,
                &function.return_type,
                "built-in function",
                reason,
            ) {
                failed = true;
            }
            for operand in operands {
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
        if !failed
            && let Some(entry) = entry
            && entry.has(BuiltinFlags::SUBGROUP_OPERATION)
        {
            failed = !self.subgroup_checks(span, entry.kind, name, operands);
        }
        if !failed && let Some(entry) = entry {
            failed = !self.lane_pattern_check(span, entry.kind, name, operands);
        }
        if failed {
            return Operand::error();
        }
        let folded = entry
            .filter(|entry| entry.has(BuiltinFlags::FOLD))
            .and_then(|entry| match entry.kind {
                BuiltinKind::Pure(pure) => Some(pure),
                _ => None,
            });
        let constant = folded.is_some()
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
            let result = if matches!(
                folded,
                Some(Pure::Relational(Relation::Any | Relation::All))
            ) {
                Some(Scalar::Bool)
            } else {
                function.return_type.base_scalar()
            };
            converted
                .zip(result)
                .zip(folded)
                .and_then(|((converted, result), pure)| fold_builtin(pure, &converted, result))
        } else {
            None
        };
        Operand {
            constant,
            value,
            non_uniform: !is_builtin
                && function
                    .return_qualifiers
                    .flags
                    .contains(QualifierFlags::NONUNIFORM),
            ..Operand::temporary(function.return_type)
        }
    }

    pub(crate) fn non_uniform_with(
        &mut self,
        expression: &Expression,
        span: Span,
        operands: Operands,
    ) -> Operand {
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

    pub(crate) fn message_call_with(
        &mut self,
        expression: &Expression,
        span: Span,
        name: &str,
        arguments: &[Expression],
        operands: &[Operand],
    ) -> Operand {
        let abort = name == ABORT;
        let (extension, callee) = if abort {
            (Extension::ExtAbort, Callee::Abort)
        } else {
            (Extension::ExtDebugPrintf, Callee::DebugPrintf)
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

    pub(crate) fn builtin_extensions(&mut self, span: Span, id: BuiltinFunctionId, name: &str) {
        let Some(entry) = self.builtin_functions.entry(id) else {
            return;
        };
        if !entry.kind.requirements_gate_call() {
            for &extension in entry.requires {
                self.require_extension(span, extension, name);
            }
        }
        if let BuiltinKind::Texture(Texture::ImageProcessing(_)) = entry.kind
            && self
                .options
                .spirv_version
                .is_some_and(|version| version < (1, 4))
        {
            self.error(
                span,
                DiagnosticKind::SpirvVersionRequired {
                    feature: "QCOM image processing",
                    version: "1.4",
                },
            );
        }
    }

    fn lane_pattern_check(
        &mut self,
        span: Span,
        kind: BuiltinKind,
        name: &str,
        operands: &[Operand],
    ) -> bool {
        let (limit, range) = match kind {
            BuiltinKind::Subgroup(Subgroup::Function(SubgroupFunction::Amd(
                AmdShaderBallot::Swizzle,
            ))) => (3, "components must be in the range [0, 3]"),
            BuiltinKind::Subgroup(Subgroup::Function(SubgroupFunction::Amd(
                AmdShaderBallot::SwizzleMasked,
            ))) => (31, "components must be in the range [0, 31]"),
            _ => return true,
        };
        let pattern = operands
            .get(1)
            .filter(|operand| operand.constant && !operand.specialization)
            .and_then(|operand| operand.value.as_ref());
        let reason = match pattern {
            None => "argument must be a compile-time constant",
            Some(pattern)
                if pattern.values.iter().any(|value| {
                    value
                        .as_i64()
                        .is_none_or(|component| !(0..=limit).contains(&component))
                }) =>
            {
                range
            }
            Some(_) => return true,
        };
        self.error(
            span,
            DiagnosticKind::InvalidBuiltinCall {
                name: String::from(name),
                reason,
            },
        );
        false
    }

    fn subgroup_checks(
        &mut self,
        span: Span,
        kind: BuiltinKind,
        name: &str,
        operands: &[Operand],
    ) -> bool {
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
        if let BuiltinKind::Subgroup(Subgroup::Collective(_, Collective::Clustered)) = kind {
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
        if matches!(
            kind,
            BuiltinKind::Subgroup(Subgroup::Gather(Gather::Broadcast | Gather::QuadBroadcast))
        ) && spirv.is_some_and(|version| version < (1, 5))
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
                Scalar::Int8 | Scalar::Uint8 => Some(Extension::ExtShaderSubgroupExtendedTypesInt8),
                Scalar::Int16 | Scalar::Uint16 => {
                    Some(Extension::ExtShaderSubgroupExtendedTypesInt16)
                }
                Scalar::Int64 | Scalar::Uint64 => {
                    Some(Extension::ExtShaderSubgroupExtendedTypesInt64)
                }
                Scalar::Float16 => Some(Extension::ExtShaderSubgroupExtendedTypesFloat16),
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

    fn image_format_dropped(operand: &Operand, parameter: &Parameter) -> bool {
        let (argument, formal) = Self::image_formats(operand, parameter);
        argument.is_some() && formal.is_none()
    }

    fn image_formats(
        operand: &Operand,
        parameter: &Parameter,
    ) -> (Option<LayoutId>, Option<LayoutId>) {
        if !operand
            .ty
            .as_opaque()
            .is_some_and(crate::types::Opaque::is_image)
        {
            return (None, None);
        }
        (operand.image_format, parameter.qualifiers.image_format())
    }

    fn image_formats_match(operand: &Operand, parameter: &Parameter) -> bool {
        if !operand
            .ty
            .as_opaque()
            .is_some_and(crate::types::Opaque::is_image)
        {
            return true;
        }
        let (argument, formal) = Self::image_formats(operand, parameter);
        argument == formal
            || (parameter
                .qualifiers
                .flags
                .contains(QualifierFlags::WRITEONLY)
                && (argument.is_none() || formal.is_none()))
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
        argument
            .dropped_memory_qualifiers(&parameter.qualifiers)
            .next()
            .is_none()
    }

    fn builtin_checks(
        &mut self,
        span: Span,
        kind: BuiltinKind,
        name: &str,
        operands: &[Operand],
    ) -> bool {
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
        let image = image_access(kind);
        if let BuiltinKind::Atomic(operation) = kind {
            self.atomic_float_extensions(span, operation, name, operands);
        } else if let BuiltinKind::Texture(Texture::ImageAtomic(operation)) = kind {
            self.image_atomic_float_extensions(span, operation, name, operands);
        }
        if !self.memory_scope_checks(span, kind, name, operands) {
            return false;
        }
        let first = operands.first();
        if let BuiltinKind::Interpolate(_) = kind {
            if first.is_some_and(|operand| operand.storage != Storage::In) {
                return invalid(self, span, "the first argument must be an interpolant");
            }
            if kind == BuiltinKind::Interpolate(crate::builtins::kind::InterpolateAt::Vertex) {
                let explicit = first
                    .and_then(|operand| operand.root)
                    .and_then(|id| self.symbol(id))
                    .and_then(|symbol| symbol.variable())
                    .is_some_and(|variable| {
                        variable.qualifiers.interpolation
                            == Some(rglsl_ast::ast::InterpolationQualifier::ExplicitInterpAmd)
                    });
                if !explicit {
                    return invalid(
                        self,
                        span,
                        "the first argument must be qualified as __explicitInterpAMD in",
                    );
                }
                let vertex = operands.get(1);
                if vertex.is_some_and(|operand| !operand.constant || operand.specialization) {
                    return invalid(
                        self,
                        span,
                        "the vertex index must be a compile-time constant",
                    );
                }
                let index = vertex
                    .and_then(|operand| operand.value.as_ref())
                    .and_then(crate::constant::Constant::scalar_i64);
                if index.is_some_and(|index| !(0..=2).contains(&index)) {
                    return invalid(self, span, "the vertex index must be in the range [0, 2]");
                }
            }
        } else if let BuiltinKind::Atomic(_) = kind {
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
        } else if let Some(image) = image {
            let qualifiers = first
                .and_then(|operand| operand.root)
                .and_then(|id| self.symbol(id))
                .and_then(|symbol| symbol.variable())
                .map(|variable| {
                    (
                        variable.qualifiers.flags.contains(QualifierFlags::READONLY),
                        variable
                            .qualifiers
                            .flags
                            .contains(QualifierFlags::WRITEONLY),
                    )
                });
            let atomic = image == ImageAccess::Atomic;
            if atomic
                && let Some((first_operand, opaque)) =
                    first.and_then(|operand| Some((operand, operand.ty.as_opaque()?)))
            {
                let value_index = opaque.image_atomic_value_index();
                let value_ty = (!matches!(
                    kind,
                    BuiltinKind::Texture(Texture::ImageAtomic(AtomicOperation::Load))
                ))
                .then(|| operands.get(value_index).map(|operand| &operand.ty))
                .flatten();
                match opaque.sampled {
                    crate::types::SampledType::Float => {
                        let expected = if value_ty
                            .is_some_and(|ty| *ty == Type::vector(Scalar::Float16, 2))
                        {
                            Some((LayoutId::Rg16f, "the image format must be rg16f"))
                        } else if value_ty.is_some_and(|ty| *ty == Type::vector(Scalar::Float16, 4))
                        {
                            Some((LayoutId::Rgba16f, "the image format must be rgba16f"))
                        } else {
                            None
                        };
                        if let Some((expected, reason)) = expected
                            && first_operand.image_format != Some(expected)
                        {
                            return invalid(self, span, reason);
                        }
                        if value_ty.is_none_or(|ty| *ty == Type::FLOAT)
                            && first_operand.image_format != Some(LayoutId::R32f)
                        {
                            self.target_limit(
                                span,
                                DiagnosticKind::InvalidBuiltinCall {
                                    name: String::from(name),
                                    reason: "the image format must be r32f",
                                },
                            );
                        }
                    }
                    crate::types::SampledType::Int
                    | crate::types::SampledType::Uint
                    | crate::types::SampledType::Int64
                    | crate::types::SampledType::Uint64 => {
                        let has_atomic_format = first_operand.image_format.is_some_and(|format| {
                            matches!(
                                format,
                                LayoutId::R32i | LayoutId::R32ui | LayoutId::R64i | LayoutId::R64ui
                            )
                        });
                        if !has_atomic_format {
                            return invalid(self, span, "the image format must be r32i or r32ui");
                        }
                        if opaque.sampled == crate::types::SampledType::Int64
                            && first_operand.image_format != Some(LayoutId::R64i)
                        {
                            return invalid(self, span, "only supported on image with format r64i");
                        }
                        if opaque.sampled == crate::types::SampledType::Uint64
                            && first_operand.image_format != Some(LayoutId::R64ui)
                        {
                            return invalid(
                                self,
                                span,
                                "only supported on image with format r64ui",
                            );
                        }
                    }
                }
            }
            if let Some((readonly, writeonly)) = qualifiers {
                if readonly && image != ImageAccess::Load {
                    return invalid(self, span, "the image is `readonly`");
                }
                if writeonly && image != ImageAccess::Store {
                    return invalid(self, span, "the image is `writeonly`");
                }
            }
        }
        if let Some(index) = offset_index(kind)
            && let Some(operand) = operands.get(index)
        {
            if !operand.constant {
                if !self
                    .extensions
                    .is_requested(Extension::ExtTextureOffsetNonConst)
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
        let shadow = first
            .and_then(|operand| operand.ty.as_opaque())
            .is_some_and(|opaque| opaque.shadow);
        let BuiltinKind::Texture(Texture::Gather(TextureGather {
            offsets,
            lod: false,
            sparse: false,
            ..
        })) = kind
        else {
            return true;
        };
        if offsets == GatherOffsets::Four {
            let index = if shadow { 3 } else { 2 };
            if let Some(operand) = operands.get(index)
                && (!operand.constant || operand.specialization)
            {
                return invalid(self, span, "the offsets must be constant");
            }
        }
        if !shadow {
            let index = match offsets {
                GatherOffsets::None => 2,
                GatherOffsets::One | GatherOffsets::Four => 3,
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

    pub(crate) fn constructor_with(
        &mut self,
        expression: &Expression,
        span: Span,
        arguments: &[Expression],
        mut ty: Type,
        operands: &[Operand],
    ) -> Operand {
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
                if !Self::acceleration_structure_constructor(operands) {
                    return fail(self, &ty, "cannot construct with these arguments");
                }
                self.calls
                    .insert(expression.id, Callee::Constructor(ty.clone()));
                return Operand::temporary(ty);
            }
            if opaque.kind != OpaqueKind::CombinedSampler {
                return fail(self, &ty, "this type has no constructor");
            }
            if !self.texture_sampler_constructor(span, opaque, operands) {
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
        if microscaling_conversion(&ty, operands) {
            return fail(
                self,
                &ty,
                "constructor argument must be a non-spec constant",
            );
        }
        if !ty.is_array()
            && matches!(
                ty.kind,
                TypeKind::CooperativeMatrix(_)
                    | TypeKind::LongVector { .. }
                    | TypeKind::CooperativeVector { .. }
            )
        {
            let operand = self.cooperative_constructor(span, &ty, operands);
            if !operand.ty.is_error() {
                self.calls
                    .insert(expression.id, Callee::Constructor(ty.clone()));
            }
            return operand;
        }
        let numeric =
            !ty.is_array() && matches!(ty.kind, TypeKind::Scalar(_) | TypeKind::Vector { .. });
        if (ty.is_reference() || numeric)
            && let Some(operand) = self.reference_constructor(span, &ty, operands)
        {
            if !operand.ty.is_error() {
                self.calls
                    .insert(expression.id, Callee::Constructor(ty.clone()));
            }
            return operand;
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
        let composite_specialization = self.extension_enabled(Extension::ExtSpecConstantComposites)
            && (matches!(ty.kind, TypeKind::Struct(_)) || operands.len() > 1);
        let constant = operands.iter().all(|operand| operand.constant)
            && (!any_specialization || keeps_specialization || composite_specialization)
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
                    ty.set_outer_size(ArraySize::Sized(count));
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
            if ty.dimensions().len() > 1 {
                let inner = operands
                    .first()
                    .map(|operand| operand.ty.dimensions().to_vec());
                match inner {
                    Some(inner) if inner.len() + 1 == ty.dimensions().len() => {
                        ty.update_dimensions(|dimensions| {
                            for (slot, size) in dimensions.iter_mut().skip(1).zip(inner) {
                                if *slot == ArraySize::Unsized {
                                    *slot = size;
                                }
                            }
                        });
                    }
                    _ => {
                        return fail(
                            self,
                            &ty,
                            "the arguments are not arrays of the element type",
                        );
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
                for operand in operands {
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
            for ((argument, operand), element) in arguments.iter().zip(operands).zip(&element_types)
            {
                self.record_conversion(argument, &operand.ty, element);
            }
            let value = if constant {
                let mut combined = ConstantValues::new();
                let mut all_present = true;
                for (operand, element) in operands.iter().zip(&element_types) {
                    let Some(value) = operand.value.as_ref() else {
                        all_present = false;
                        break;
                    };
                    match element.base_scalar() {
                        Some(scalar) => {
                            combined.extend(value.values.iter().map(|item| item.convert(scalar)));
                        }
                        None => combined.extend(value.values.iter().copied()),
                    }
                }
                all_present.then(|| Constant::new(combined))
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
        if operands
            .iter()
            .any(|operand| operand.ty.is_cooperative_vector())
        {
            return fail(self, &ty, "can't convert a cooperative vector");
        }
        let mut size = 0_u32;
        let mut full = false;
        let mut over_full = false;
        let mut matrix_argument = false;
        for operand in operands {
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
            Self::fold_constructor(&ty, target_scalar, needed, operands)
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
        ty: &Type,
        scalar: Scalar,
        needed: u32,
        operands: &[Operand],
    ) -> Option<Constant> {
        let needed = usize::try_from(needed).ok()?;
        let mut values = ConstantValues::new();
        for operand in operands {
            for value in &operand.value.as_ref()?.convert(scalar).values {
                values.push(*value);
            }
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
                let mut result = ConstantValues::with_capacity(needed);
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
            return Some(Constant::splat(value, needed));
        }
        values.truncate(needed);
        (values.len() == needed).then(|| Constant::new(values))
    }
}

fn microscaling_conversion(ty: &Type, operands: &[Operand]) -> bool {
    if ty.is_array()
        || !matches!(
            ty.kind,
            TypeKind::Scalar(_) | TypeKind::Vector { .. } | TypeKind::LongVector { .. }
        )
        || !ty.base_scalar().is_some_and(Scalar::is_microscaling)
    {
        return false;
    }
    let constant = operands
        .iter()
        .all(|operand| operand.constant && !operand.specialization);
    !constant
        && operands
            .iter()
            .any(|operand| operand.ty.base_scalar() != ty.base_scalar())
}
