use std::collections::BTreeSet;

use rglsl_ast::ast::{
    BasicType, BinaryOperator, Expression, ExpressionKind, FunctionIdentifier, ScalarType,
    UnaryOperator,
};
use rglsl_sema::Builtins;

use crate::basic::{self, BOOL, FLOAT};
use crate::build::Builder;
use crate::constants::{
    GLF_FALSE, GLF_FUZZED, GLF_IDENTITY, GLF_ONE, GLF_TRUE, GLF_ZERO, GL_FRAG_COORD,
    INJECTION_SWITCH,
};
use crate::fuzzer::{is_too_deep, literal_zero_or_one, random_constant, Fuzzer};
use crate::macros::is_macro;
use crate::random::Random;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Identity {
    AddSubZero,
    MulDivOne,
    AndTrue,
    OrFalse,
    LogicalNotNot,
    Ternary,
    BitwiseNotNot,
    BitwiseOrSelf,
    BitwiseOrZero,
    BitwiseXorZero,
    BitwiseShiftZero,
    Min,
    Max,
    Clamp,
    RewriteComposite,
    CompositeConstructorExpansion,
    MixBvec,
    DoubleTranspose,
    MatrixMultIdentity,
}

impl Identity {
    pub const ALL: [Self; 19] = [
        Self::AddSubZero,
        Self::MulDivOne,
        Self::AndTrue,
        Self::OrFalse,
        Self::LogicalNotNot,
        Self::Ternary,
        Self::BitwiseNotNot,
        Self::BitwiseOrSelf,
        Self::BitwiseOrZero,
        Self::BitwiseXorZero,
        Self::BitwiseShiftZero,
        Self::Min,
        Self::Max,
        Self::Clamp,
        Self::RewriteComposite,
        Self::CompositeConstructorExpansion,
        Self::MixBvec,
        Self::DoubleTranspose,
        Self::MatrixMultIdentity,
    ];

    pub fn accepts(self, ty: BasicType) -> bool {
        match self {
            Self::AddSubZero | Self::Ternary => basic::is_numeric(ty),
            Self::MulDivOne => {
                basic::is_numeric(ty) && (!basic::is_matrix(ty) || basic::is_square_matrix(ty))
            }
            Self::AndTrue | Self::OrFalse | Self::LogicalNotNot => ty == BOOL,
            Self::BitwiseNotNot
            | Self::BitwiseOrSelf
            | Self::BitwiseOrZero
            | Self::BitwiseXorZero
            | Self::BitwiseShiftZero => basic::is_integer(ty),
            Self::Min | Self::Max | Self::Clamp => basic::is_numeric(ty) && !basic::is_matrix(ty),
            Self::RewriteComposite => basic::is_numeric(ty) && !basic::is_scalar(ty),
            Self::CompositeConstructorExpansion => !matches!(
                ty,
                BasicType::Vector {
                    scalar: ScalarType::Bool | ScalarType::Int | ScalarType::Uint,
                    size: rglsl_ast::ast::Dimension::Four,
                } | BasicType::Matrix {
                    columns: rglsl_ast::ast::Dimension::Four,
                    rows: rglsl_ast::ast::Dimension::Four,
                    ..
                }
            ),
            Self::MixBvec => basic::is_gen_type(ty),
            Self::DoubleTranspose => basic::is_matrix(ty),
            Self::MatrixMultIdentity => {
                (basic::is_matrix(ty) && !basic::is_square_matrix(ty))
                    || (basic::is_vector(ty) && basic::element(ty) == ScalarType::Float)
            }
        }
    }

    const fn needs_side_effect_free(self) -> bool {
        matches!(
            self,
            Self::BitwiseOrSelf
                | Self::Min
                | Self::Max
                | Self::Clamp
                | Self::CompositeConstructorExpansion
                | Self::MixBvec
                | Self::DoubleTranspose
                | Self::MatrixMultIdentity
        )
    }

    const fn builtin(self) -> Option<&'static str> {
        match self {
            Self::Min => Some("min"),
            Self::Max => Some("max"),
            Self::Clamp => Some("clamp"),
            Self::MixBvec => Some("mix"),
            Self::DoubleTranspose => Some("transpose"),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Factory {
    IdentityFunction,
    InjectionSwitch,
    SquareRoot,
    Absolute,
    Dot,
    BitwiseShift,
    BitwiseOp,
    MatrixDeterminant,
    Sine,
    Logarithm,
    Tangent,
    VectorLength,
    VectorCross,
    Exponential,
    Cosine,
    RoundedNormalizedVectorLength,
}

const ZERO_OR_ONE_FACTORIES: [Factory; 8] = [
    Factory::IdentityFunction,
    Factory::InjectionSwitch,
    Factory::SquareRoot,
    Factory::Absolute,
    Factory::Dot,
    Factory::BitwiseShift,
    Factory::BitwiseOp,
    Factory::MatrixDeterminant,
];

pub fn side_effect_free(expression: &Expression, builtins: &Builtins) -> bool {
    match &expression.kind {
        ExpressionKind::Variable(_)
        | ExpressionKind::Number(_)
        | ExpressionKind::Bool(_)
        | ExpressionKind::String(_) => true,
        ExpressionKind::Parenthesized(inner)
        | ExpressionKind::FieldSelection { base: inner, .. } => side_effect_free(inner, builtins),
        ExpressionKind::Subscript { base, index } => {
            side_effect_free(base, builtins) && side_effect_free(index, builtins)
        }
        ExpressionKind::FunctionCall(call) => {
            let callee_pure = match &call.function.node {
                FunctionIdentifier::Constructor(_) | FunctionIdentifier::Cast(_) => true,
                FunctionIdentifier::Function(name) => {
                    is_macro(name) || {
                        let overloads = builtins.overloads(name);
                        !overloads.is_empty()
                            && overloads.iter().all(|id| {
                                builtins.function(*id).is_some_and(|function| {
                                    function
                                        .parameters
                                        .iter()
                                        .all(|parameter| !parameter.direction.is_output())
                                })
                            })
                    }
                }
                FunctionIdentifier::Method { object, .. } => side_effect_free(object, builtins),
                FunctionIdentifier::Expression(_) => false,
            };
            callee_pure
                && call
                    .arguments
                    .iter()
                    .all(|argument| side_effect_free(argument, builtins))
        }
        ExpressionKind::Postfix { .. } | ExpressionKind::Assignment { .. } => false,
        ExpressionKind::Unary { operator, operand } => {
            !matches!(
                operator,
                UnaryOperator::Increment | UnaryOperator::Decrement
            ) && side_effect_free(operand, builtins)
        }
        ExpressionKind::Binary { left, right, .. } => {
            side_effect_free(left, builtins) && side_effect_free(right, builtins)
        }
        ExpressionKind::Conditional {
            condition,
            then_expression,
            else_expression,
        } => {
            side_effect_free(condition, builtins)
                && side_effect_free(then_expression, builtins)
                && side_effect_free(else_expression, builtins)
        }
        ExpressionKind::Sequence(expressions) => expressions
            .iter()
            .all(|expression| side_effect_free(expression, builtins)),
    }
}

#[derive(Debug)]
pub struct OpaqueGenerator<'a> {
    pub random: &'a mut Random,
    pub builder: &'a mut Builder,
    pub fuzzer: Fuzzer<'a>,
    pub builtins: &'a Builtins,
    pub hidden: &'a BTreeSet<String>,
    pub injection_switch: bool,
    pub frag_coord: bool,
}

impl OpaqueGenerator<'_> {
    fn too_deep(&mut self, depth: u32) -> bool {
        let params = *self.fuzzer.params();
        is_too_deep(depth, &params, self.random)
    }

    fn available(&self, name: &str) -> bool {
        !self.hidden.contains(name)
    }

    fn identity_applies(
        &self,
        identity: Identity,
        expression: &Expression,
        ty: BasicType,
        constant_context: bool,
    ) -> bool {
        if !identity.accepts(ty) {
            return false;
        }
        if identity.builtin().is_some_and(|name| !self.available(name)) {
            return false;
        }
        if identity == Identity::DoubleTranspose && constant_context {
            return false;
        }
        if identity == Identity::RewriteComposite
            && !matches!(expression.kind, ExpressionKind::Variable(_))
        {
            return false;
        }
        !identity.needs_side_effect_free() || side_effect_free(expression, self.builtins)
    }

    pub fn apply_identity_function(
        &mut self,
        expression: Expression,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        if self.too_deep(depth) {
            return expression;
        }
        let available: Vec<Identity> = Identity::ALL
            .into_iter()
            .filter(|identity| self.identity_applies(*identity, &expression, ty, constant_context))
            .collect();
        if available.is_empty() {
            return expression;
        }
        let identity = available[self.random.next_index(available.len())];
        self.apply(identity, expression, ty, constant_context, depth + 1)
    }

    pub fn apply(
        &mut self,
        identity: Identity,
        expression: Expression,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        let context = constant_context;
        match identity {
            Identity::AddSubZero => {
                let operator = if self.random.next_bool() {
                    BinaryOperator::Add
                } else {
                    BinaryOperator::Subtract
                };
                let zero = self.make_opaque_zero(ty, context, depth);
                self.binary_identity(
                    expression,
                    zero,
                    operator,
                    operator == BinaryOperator::Add,
                    ty,
                    context,
                    depth,
                )
            }
            Identity::MulDivOne => {
                let operator = if self.random.next_bool() {
                    BinaryOperator::Multiply
                } else {
                    BinaryOperator::Divide
                };
                let one = if operator == BinaryOperator::Multiply && basic::is_square_matrix(ty) {
                    self.make_opaque_identity_matrix(ty, context, depth)
                } else {
                    self.make_opaque_one(ty, context, depth)
                };
                self.binary_identity(
                    expression,
                    one,
                    operator,
                    operator == BinaryOperator::Multiply,
                    ty,
                    context,
                    depth,
                )
            }
            Identity::AndTrue => {
                let value = self.make_opaque_boolean(true, BOOL, context, depth);
                self.binary_identity(
                    expression,
                    value,
                    BinaryOperator::LogicalAnd,
                    true,
                    ty,
                    context,
                    depth,
                )
            }
            Identity::OrFalse => {
                let value = self.make_opaque_boolean(false, BOOL, context, depth);
                self.binary_identity(
                    expression,
                    value,
                    BinaryOperator::LogicalOr,
                    true,
                    ty,
                    context,
                    depth,
                )
            }
            Identity::LogicalNotNot => {
                self.double_negation(expression, UnaryOperator::LogicalNot, ty, context, depth)
            }
            Identity::BitwiseNotNot => {
                self.double_negation(expression, UnaryOperator::BitNot, ty, context, depth)
            }
            Identity::Ternary => self.ternary_identity(expression, ty, context, depth),
            Identity::BitwiseOrSelf => {
                let original = expression.clone();
                let first = self.apply_identity_function(expression.clone(), ty, context, depth);
                let first = self.builder.paren(first);
                let second = self.apply_identity_function(expression, ty, context, depth);
                let second = self.builder.paren(second);
                let result = self.builder.binary(BinaryOperator::BitOr, first, second);
                self.identity(original, result)
            }
            Identity::BitwiseOrZero | Identity::BitwiseXorZero => {
                let operator = if identity == Identity::BitwiseOrZero {
                    BinaryOperator::BitOr
                } else {
                    BinaryOperator::BitXor
                };
                let zero = self.make_opaque_zero(ty, context, depth);
                self.binary_identity(expression, zero, operator, true, ty, context, depth)
            }
            Identity::BitwiseShiftZero => {
                let operator = if self.random.next_bool() {
                    BinaryOperator::ShiftLeft
                } else {
                    BinaryOperator::ShiftRight
                };
                let zero = self.make_opaque_zero(ty, context, depth);
                self.binary_identity(expression, zero, operator, false, ty, context, depth)
            }
            Identity::Min | Identity::Max | Identity::Clamp => {
                let (name, count) = match identity {
                    Identity::Min => ("min", 2),
                    Identity::Max => ("max", 2),
                    _ => ("clamp", 3),
                };
                let original = expression.clone();
                let argument = self.builder.argument(expression);
                let arguments: Vec<Expression> = (0..count)
                    .map(|_| self.apply_identity_function(argument.clone(), ty, context, depth))
                    .collect();
                let call = self.builder.call(name, arguments);
                self.identity(original, call)
            }
            Identity::MixBvec => self.mix_identity(expression, ty, context, depth),
            Identity::RewriteComposite => self.rewrite_composite(expression, ty, context, depth),
            Identity::CompositeConstructorExpansion => {
                self.composite_expansion(expression, ty, context, depth)
            }
            Identity::DoubleTranspose => {
                let original = expression.clone();
                let inner = self.apply_identity_function(expression, ty, context, depth);
                let inner = self.builder.call("transpose", vec![inner]);
                let inner =
                    self.apply_identity_function(inner, basic::transposed(ty), context, depth);
                let outer = self.builder.call("transpose", vec![inner]);
                self.identity(original, outer)
            }
            Identity::MatrixMultIdentity => {
                let original = expression.clone();
                let right = self.random.next_bool();
                let size = if basic::is_vector(ty) {
                    basic::num_elements(ty)
                } else if right {
                    basic::rows(ty)
                } else {
                    basic::columns(ty)
                };
                let Some(matrix) = basic::square_matrix(size) else {
                    return expression;
                };
                let identity = self.make_opaque_identity_matrix(matrix, context, depth);
                let operand = self.builder.paren(expression);
                let product = if right {
                    self.builder
                        .binary(BinaryOperator::Multiply, identity, operand)
                } else {
                    self.builder
                        .binary(BinaryOperator::Multiply, operand, identity)
                };
                let result = self.apply_identity_function(product, ty, context, depth);
                self.identity(original, result)
            }
        }
    }

    pub fn identity(&mut self, original: Expression, transformed: Expression) -> Expression {
        let original = self.builder.argument(original);
        self.builder.call(GLF_IDENTITY, vec![original, transformed])
    }

    fn fuzzed(&mut self, ty: BasicType, constant_context: bool, depth: u32) -> Expression {
        let fuzzer = self.fuzzer;
        let expression = fuzzer
            .fuzz_expression(self.random, self.builder, ty, constant_context, depth)
            .unwrap_or_else(|| random_constant(self.random, self.builder, ty));
        self.builder.call(GLF_FUZZED, vec![expression])
    }

    #[allow(clippy::too_many_arguments)]
    fn binary_identity(
        &mut self,
        expression: Expression,
        opaque: Expression,
        operator: BinaryOperator,
        consider_reverse: bool,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        let original = expression.clone();
        let applied = self.apply_identity_function(expression, ty, constant_context, depth);
        let applied = self.builder.paren(applied);
        let result = if !consider_reverse || self.random.next_bool() {
            self.builder.binary(operator, applied, opaque)
        } else {
            self.builder.binary(operator, opaque, applied)
        };
        self.identity(original, result)
    }

    fn double_negation(
        &mut self,
        expression: Expression,
        operator: UnaryOperator,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        let original = expression.clone();
        let inner = self.apply_identity_function(expression, ty, constant_context, depth);
        let inner = self.builder.paren(inner);
        let negated = self.builder.unary(operator, inner);
        let outer = self.apply_identity_function(negated, ty, constant_context, depth);
        let outer = self.builder.paren(outer);
        let result = self.builder.unary(operator, outer);
        self.identity(original, result)
    }

    fn ternary(
        &mut self,
        condition: Expression,
        then_expression: Expression,
        else_expression: Expression,
    ) -> Expression {
        let ternary = self
            .builder
            .ternary(condition, then_expression, else_expression);
        self.builder.paren(ternary)
    }

    fn ternary_identity(
        &mut self,
        expression: Expression,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        let original = expression.clone();
        let applied = self.apply_identity_function(expression, ty, constant_context, depth);
        let something = self.fuzzed(ty, constant_context, depth);
        let result = if self.random.next_bool() {
            let condition = self.make_opaque_boolean(false, BOOL, constant_context, depth);
            self.ternary(condition, something, applied)
        } else {
            let condition = self.make_opaque_boolean(true, BOOL, constant_context, depth);
            self.ternary(condition, applied, something)
        };
        self.identity(original, result)
    }

    fn mix_identity(
        &mut self,
        expression: Expression,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        let count = basic::num_elements(ty);
        let element = basic::element_type(ty);
        let chosen = self.random.next_int(count);
        let mut x = Vec::new();
        let mut y = Vec::new();
        let mut a = Vec::new();
        for index in 0..count {
            let decision = self.random.next_bool();
            let selector = self.make_opaque_boolean(decision, BOOL, constant_context, depth);
            a.push(selector);
            let something = self.fuzzed(element, true, depth);
            let mut component = if basic::is_vector(ty) {
                let base = self.builder.paren(expression.clone());
                self.builder.index(base, index)
            } else {
                expression.clone()
            };
            if index == chosen {
                component =
                    self.apply_identity_function(component, element, constant_context, depth);
            }
            let (first, second) = if decision {
                (something, component)
            } else {
                (component, something)
            };
            x.push(first);
            y.push(second);
        }
        let x = self.builder.construct(ty, x);
        let y = self.builder.construct(ty, y);
        let a = self
            .builder
            .construct(basic::vector(ScalarType::Bool, count), a);
        let call = self.builder.call("mix", vec![x, y, a]);
        self.identity(expression, call)
    }

    fn rewrite_composite(
        &mut self,
        expression: Expression,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        let columns = basic::columns(ty);
        let chosen_column = self.random.next_int(columns);
        let mut arguments = Vec::new();
        if basic::is_matrix(ty) && self.random.next_bool() {
            let rows = basic::rows(ty);
            let chosen_row = self.random.next_int(rows);
            for column in 0..columns {
                for row in 0..rows {
                    let inner = self.builder.index(expression.clone(), column);
                    let mut argument = self.builder.index(inner, row);
                    if column == chosen_column && row == chosen_row {
                        argument = self.apply_identity_function(
                            argument,
                            basic::element_type(ty),
                            constant_context,
                            depth,
                        );
                    }
                    arguments.push(argument);
                }
            }
        } else {
            for column in 0..columns {
                let mut argument = self.builder.index(expression.clone(), column);
                if column == chosen_column {
                    let part = if basic::is_vector(ty) {
                        basic::element_type(ty)
                    } else {
                        basic::column_type(ty)
                    };
                    argument =
                        self.apply_identity_function(argument, part, constant_context, depth);
                }
                arguments.push(argument);
            }
        }
        let constructed = self.builder.construct(ty, arguments);
        self.identity(expression, constructed)
    }

    fn composite_expansion(
        &mut self,
        expression: Expression,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        let mut candidates = Vec::new();
        if basic::is_matrix(ty) {
            for matrix in basic::all_matrix_types() {
                if basic::rows(ty) <= basic::rows(matrix)
                    && basic::columns(ty) <= basic::columns(matrix)
                {
                    candidates.push(matrix);
                }
            }
        } else {
            for size in basic::num_elements(ty)..=4 {
                candidates.push(basic::vector(basic::element(ty), size));
            }
            if basic::element(ty) == ScalarType::Float {
                candidates.extend(basic::all_square_matrix_types());
                candidates.extend(basic::all_non_square_matrix_types());
            }
        }
        if candidates.is_empty() {
            return expression;
        }
        let inner = candidates[self.random.next_index(candidates.len())];
        let applied = self.apply_identity_function(expression.clone(), ty, constant_context, depth);
        let mut arguments = vec![self.builder.argument(applied)];
        if !basic::is_matrix(ty) {
            let excess = basic::num_elements(inner).saturating_sub(basic::num_elements(ty));
            for _ in 0..excess {
                let value = self.random.next_bool();
                let padding = if basic::is_boolean(ty) {
                    self.make_opaque_boolean(value, BOOL, constant_context, depth)
                } else {
                    self.make_opaque_zero_or_one(
                        value,
                        basic::element_type(ty),
                        constant_context,
                        depth,
                    )
                };
                arguments.push(padding);
            }
        }
        let widened = self.builder.construct(inner, arguments);
        let widened = self.apply_identity_function(widened, inner, constant_context, depth);
        let narrowed = self.builder.construct(ty, vec![widened]);
        let narrowed = self.apply_identity_function(narrowed, ty, constant_context, depth);
        self.identity(expression, narrowed)
    }

    pub fn make_opaque_zero(
        &mut self,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        self.make_opaque_zero_or_one(true, ty, constant_context, depth)
    }

    pub fn make_opaque_one(
        &mut self,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        self.make_opaque_zero_or_one(false, ty, constant_context, depth)
    }

    pub fn make_opaque_zero_or_one(
        &mut self,
        zero: bool,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        if self.too_deep(depth) || basic::is_boolean(ty) {
            return literal_zero_or_one(self.builder, zero, ty);
        }
        let new_depth = depth + 1;
        let mut factories: Vec<Factory> = ZERO_OR_ONE_FACTORIES.to_vec();
        if zero {
            factories.extend([
                Factory::Sine,
                Factory::Logarithm,
                Factory::Tangent,
                Factory::VectorLength,
                Factory::VectorCross,
            ]);
        } else {
            factories.extend([
                Factory::Exponential,
                Factory::Cosine,
                Factory::RoundedNormalizedVectorLength,
            ]);
        }
        while !factories.is_empty() {
            let index = self.random.next_index(factories.len());
            let factory = factories[index];
            if let Some(result) = self.try_factory(factory, zero, ty, constant_context, new_depth) {
                return result;
            }
            factories.remove(index);
        }
        literal_zero_or_one(self.builder, zero, ty)
    }

    fn try_factory(
        &mut self,
        factory: Factory,
        zero: bool,
        ty: BasicType,
        context: bool,
        depth: u32,
    ) -> Option<Expression> {
        let gen_type = basic::is_gen_type(ty);
        match factory {
            Factory::IdentityFunction => {
                let value = self.make_opaque_zero_or_one(zero, ty, context, depth);
                Some(self.apply_identity_function(value, ty, context, depth))
            }
            Factory::InjectionSwitch => {
                if context || !self.injection_switch {
                    return None;
                }
                Some(self.injection_switch_value(zero, ty))
            }
            Factory::SquareRoot | Factory::Absolute => {
                let name = if factory == Factory::SquareRoot {
                    "sqrt"
                } else {
                    "abs"
                };
                if !gen_type || !self.available(name) {
                    return None;
                }
                let value = self.make_opaque_zero_or_one(zero, ty, context, depth);
                Some(self.builder.call(name, vec![value]))
            }
            Factory::Dot => self.opaque_dot(zero, ty, context, depth),
            Factory::BitwiseShift => self.opaque_shift(zero, ty, context, depth),
            Factory::BitwiseOp => self.opaque_bitwise(zero, ty, context, depth),
            Factory::MatrixDeterminant => self.opaque_determinant(zero, ty, context, depth),
            Factory::Sine | Factory::Tangent | Factory::Exponential | Factory::Cosine => {
                let name = match factory {
                    Factory::Sine => "sin",
                    Factory::Tangent => "tan",
                    Factory::Exponential => "exp",
                    _ => "cos",
                };
                if !gen_type || !self.available(name) {
                    return None;
                }
                let value = self.make_opaque_zero(ty, context, depth);
                Some(self.builder.call(name, vec![value]))
            }
            Factory::Logarithm => {
                if !gen_type || !self.available("log") {
                    return None;
                }
                let value = self.make_opaque_one(ty, context, depth);
                Some(self.builder.call("log", vec![value]))
            }
            Factory::VectorLength => {
                if ty != FLOAT || !self.available("length") {
                    return None;
                }
                let gen_types = basic::all_gen_types();
                let vector = gen_types[self.random.next_index(gen_types.len())];
                let value = self.make_opaque_zero(vector, context, depth);
                Some(self.builder.call("length", vec![value]))
            }
            Factory::VectorCross => {
                let vec3 = basic::vector(ScalarType::Float, 3);
                if ty != vec3 || !self.available("cross") {
                    return None;
                }
                let mut first = Vec::new();
                let mut second = Vec::new();
                for _ in 0..3 {
                    let literal = random_constant(self.random, self.builder, FLOAT);
                    first.push(self.apply_identity_function(
                        literal.clone(),
                        FLOAT,
                        context,
                        depth,
                    ));
                    second.push(self.apply_identity_function(literal, FLOAT, context, depth));
                }
                let first = self.builder.construct(vec3, first);
                let second = self.builder.construct(vec3, second);
                Some(self.builder.call("cross", vec![first, second]))
            }
            Factory::RoundedNormalizedVectorLength => {
                if ty != FLOAT
                    || !self.available("round")
                    || !self.available("length")
                    || !self.available("normalize")
                {
                    return None;
                }
                let gen_types = basic::all_gen_types();
                let vector = gen_types[self.random.next_index(gen_types.len())];
                let ones = self.make_opaque_one(vector, context, depth);
                let normalized = self.builder.call("normalize", vec![ones]);
                let length = self.builder.call("length", vec![normalized]);
                Some(self.builder.call("round", vec![length]))
            }
        }
    }

    fn injection_component(&mut self, component: &str) -> Expression {
        let switch = self.builder.variable(INJECTION_SWITCH);
        self.builder.field(switch, component)
    }

    fn injection_switch_value(&mut self, zero: bool, ty: BasicType) -> Expression {
        if ty == FLOAT {
            let (name, component) = if zero {
                (GLF_ZERO, "x")
            } else {
                (GLF_ONE, "y")
            };
            let literal = literal_zero_or_one(self.builder, zero, FLOAT);
            let value = self.injection_component(component);
            return self.builder.call(name, vec![literal, value]);
        }
        let arguments: Vec<Expression> = (0..basic::num_elements(ty))
            .map(|_| self.injection_switch_value(zero, FLOAT))
            .collect();
        self.builder.construct(ty, arguments)
    }

    fn opaque_dot(
        &mut self,
        zero: bool,
        ty: BasicType,
        context: bool,
        depth: u32,
    ) -> Option<Expression> {
        if ty != FLOAT || !self.available("dot") {
            return None;
        }
        let width = self.random.next_positive_int(4) + 1;
        let mut first = Vec::new();
        let mut second = Vec::new();
        if zero {
            for _ in 0..width {
                let first_zero = self.random.next_bool();
                first.push(self.make_opaque_zero_or_one(first_zero, FLOAT, context, depth));
                second.push(self.make_opaque_zero_or_one(!first_zero, FLOAT, context, depth));
            }
        } else {
            let one_index = self.random.next_int(width);
            for index in 0..width {
                first.push(self.make_opaque_zero_or_one(index != one_index, FLOAT, context, depth));
                second.push(self.make_opaque_zero_or_one(
                    index != one_index,
                    FLOAT,
                    context,
                    depth,
                ));
            }
        }
        let vector = basic::vector(ScalarType::Float, width);
        let first = self.builder.construct(vector, first);
        let second = self.builder.construct(vector, second);
        let dot = self.builder.call("dot", vec![first, second]);
        let applied = self.apply_identity_function(dot.clone(), FLOAT, context, depth);
        Some(self.identity(dot, applied))
    }

    fn opaque_shift(
        &mut self,
        zero: bool,
        ty: BasicType,
        context: bool,
        depth: u32,
    ) -> Option<Expression> {
        if !basic::is_integer(ty) {
            return None;
        }
        let amount = self.random.next_int(if zero { 9 } else { 8 });
        let literal = if basic::element(ty) == ScalarType::Uint {
            self.builder.uint(u64::from(amount))
        } else {
            self.builder.int(i64::from(amount))
        };
        let constructor = self.builder.construct(ty, vec![literal]);
        let applied = self.apply_identity_function(constructor.clone(), ty, context, depth);
        let shift = self.identity(constructor.clone(), applied);
        if zero {
            let operator = if self.random.next_bool() {
                BinaryOperator::ShiftLeft
            } else {
                BinaryOperator::ShiftRight
            };
            let value = self.make_opaque_zero(ty, context, depth);
            let shifted = self.builder.binary(operator, value, shift);
            return Some(self.builder.paren(shifted));
        }
        let back_applied = self.apply_identity_function(constructor.clone(), ty, context, depth);
        let back = self.identity(constructor, back_applied);
        let value = self.make_opaque_one(ty, context, depth);
        let left = self.builder.binary(BinaryOperator::ShiftLeft, value, shift);
        let left = self.builder.paren(left);
        let right = self.builder.binary(BinaryOperator::ShiftRight, left, back);
        Some(self.builder.paren(right))
    }

    fn opaque_bitwise(
        &mut self,
        zero: bool,
        ty: BasicType,
        context: bool,
        depth: u32,
    ) -> Option<Expression> {
        if !basic::is_integer(ty) {
            return None;
        }
        let result = match self.random.next_int(3) {
            0 => {
                if zero {
                    let fuzzer = self.fuzzer;
                    let fuzzed =
                        fuzzer.fuzz_expression(self.random, self.builder, ty, true, depth)?;
                    let opaque = self.make_opaque_zero(ty, context, depth);
                    if self.random.next_bool() {
                        self.builder.binary(BinaryOperator::BitAnd, fuzzed, opaque)
                    } else {
                        self.builder.binary(BinaryOperator::BitAnd, opaque, fuzzed)
                    }
                } else {
                    let first = self.make_opaque_one(ty, context, depth);
                    let second = self.make_opaque_one(ty, context, depth);
                    self.builder.binary(BinaryOperator::BitAnd, first, second)
                }
            }
            1 => {
                if zero {
                    let first = self.make_opaque_zero(ty, context, depth);
                    let second = self.make_opaque_zero(ty, context, depth);
                    self.builder.binary(BinaryOperator::BitOr, first, second)
                } else {
                    let one = self.make_opaque_one(ty, context, depth);
                    let value = self.random.next_bool();
                    let other = self.make_opaque_zero_or_one(value, ty, context, depth);
                    if self.random.next_bool() {
                        self.builder.binary(BinaryOperator::BitOr, one, other)
                    } else {
                        self.builder.binary(BinaryOperator::BitOr, other, one)
                    }
                }
            }
            _ => {
                let value = self.random.next_bool();
                let first = self.make_opaque_zero_or_one(value, ty, context, depth);
                let second_value = if zero { value } else { !value };
                let second = self.make_opaque_zero_or_one(second_value, ty, context, depth);
                self.builder.binary(BinaryOperator::BitXor, first, second)
            }
        };
        Some(self.builder.paren(result))
    }

    fn opaque_determinant(
        &mut self,
        zero: bool,
        ty: BasicType,
        context: bool,
        depth: u32,
    ) -> Option<Expression> {
        if context || ty != FLOAT || !self.available("determinant") {
            return None;
        }
        let upper = self.random.next_bool();
        let dimension = self.random.next_int(3) + 2;
        let modifiable: &[u32] = match (dimension, upper) {
            (2, true) => &[1],
            (2, false) => &[2],
            (3, true) => &[1, 2, 5],
            (3, false) => &[3, 6, 7],
            (_, true) => &[1, 2, 3, 6, 7, 11],
            (_, false) => &[4, 8, 9, 12, 13, 14],
        };
        let mut arguments = Vec::new();
        let mut next_diagonal = 0;
        for index in 0..dimension * dimension {
            if index == next_diagonal {
                arguments.push(self.make_opaque_zero_or_one(zero, FLOAT, context, depth));
                next_diagonal += dimension + 1;
            } else if modifiable.contains(&index) {
                let value = self.random.next_bool();
                arguments.push(self.make_opaque_zero_or_one(value, FLOAT, context, depth));
            } else {
                arguments.push(self.make_opaque_zero(FLOAT, context, depth));
            }
        }
        let matrix = basic::square_matrix(dimension)?;
        let constructed = self.builder.construct(matrix, arguments);
        Some(self.builder.call("determinant", vec![constructed]))
    }

    pub fn make_opaque_identity_matrix(
        &mut self,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        if self.too_deep(depth) {
            let one = literal_zero_or_one(self.builder, false, FLOAT);
            return self.builder.construct(ty, vec![one]);
        }
        let new_depth = depth + 1;
        loop {
            if self.random.next_int(2) == 0 {
                let inner = self.make_opaque_identity_matrix(ty, constant_context, new_depth);
                return self.apply_identity_function(inner, ty, constant_context, new_depth);
            }
            if constant_context || !self.injection_switch {
                continue;
            }
            let one = literal_zero_or_one(self.builder, false, FLOAT);
            let value = self.injection_component("y");
            let opaque = self.builder.call(GLF_ONE, vec![one, value]);
            return self.builder.construct(ty, vec![opaque]);
        }
    }

    pub fn make_opaque_boolean(
        &mut self,
        value: bool,
        ty: BasicType,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        if ty == BOOL {
            return self.make_opaque_boolean_scalar(value, constant_context, depth);
        }
        let arguments: Vec<Expression> = (0..basic::num_elements(ty))
            .map(|_| self.make_opaque_boolean_scalar(value, constant_context, depth))
            .collect();
        self.builder.construct(ty, arguments)
    }

    fn make_opaque_boolean_scalar(
        &mut self,
        value: bool,
        constant_context: bool,
        depth: u32,
    ) -> Expression {
        if self.too_deep(depth) {
            return self.builder.boolean(value);
        }
        let new_depth = depth + 1;
        if constant_context {
            return self.recursive_boolean(value, constant_context, new_depth);
        }
        let choices = if self.fuzzer.params().fragment { 4 } else { 2 };
        loop {
            match self.random.next_int(choices) {
                0 => return self.recursive_boolean(value, constant_context, new_depth),
                1 => {
                    if !self.injection_switch {
                        continue;
                    }
                    let x = self.injection_component("x");
                    let y = self.injection_component("y");
                    let operator = if value {
                        BinaryOperator::Less
                    } else {
                        BinaryOperator::Greater
                    };
                    let comparison = self.builder.binary(operator, x, y);
                    return self.boolean_from(value, comparison);
                }
                choice => {
                    if !self.frag_coord {
                        continue;
                    }
                    let coordinate = if choice == 2 { "x" } else { "y" };
                    let frag_coord = self.builder.variable(GL_FRAG_COORD);
                    let component = self.builder.field(frag_coord, coordinate);
                    let zero = self.make_opaque_zero(FLOAT, constant_context, new_depth);
                    let operator = if value {
                        BinaryOperator::GreaterEqual
                    } else {
                        BinaryOperator::Less
                    };
                    let comparison = self.builder.binary(operator, component, zero);
                    return self.boolean_from(value, comparison);
                }
            }
        }
    }

    fn boolean_from(&mut self, value: bool, expression: Expression) -> Expression {
        let name = if value { GLF_TRUE } else { GLF_FALSE };
        let literal = self.builder.boolean(value);
        let inner = self.builder.paren(expression);
        self.builder.call(name, vec![literal, inner])
    }

    fn recursive_boolean(&mut self, value: bool, constant_context: bool, depth: u32) -> Expression {
        let inner = self.make_opaque_boolean_scalar(value, constant_context, depth);
        self.apply_identity_function(inner, BOOL, constant_context, depth)
    }
}
