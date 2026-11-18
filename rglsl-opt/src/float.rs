use half::f16;
use rglsl::{BinaryOperator, Literal, MathFunction, RelationalFunction, UnaryOperator};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Class {
    Exact,
    VulkanPermitted,
    Never,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Domain {
    Float,
    Signed,
    Unsigned,
    Bool,
    Any,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Operation {
    Unary(UnaryOperator),
    Binary(BinaryOperator),
    Math(MathFunction),
    Relational(RelationalFunction),
    Convert(Domain),
    Select,
    Extract,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Guard {
    Bits,
    Rounding,
    Compare,
    Normal,
    Halfway,
    Divisor,
    Shift,
    Minimum,
    Bounds,
    Conversion,
    Classify,
    Refused,
}

#[derive(Debug)]
pub struct Rule {
    pub operation: Operation,
    pub domain: Domain,
    pub class: Class,
    pub guard: Guard,
    pub reason: &'static str,
}

const fn exact(operation: Operation, domain: Domain, guard: Guard, reason: &'static str) -> Rule {
    Rule {
        operation,
        domain,
        class: Class::Exact,
        guard,
        reason,
    }
}

const fn never(operation: Operation, domain: Domain, reason: &'static str) -> Rule {
    Rule {
        operation,
        domain,
        class: Class::Never,
        guard: Guard::Refused,
        reason,
    }
}

use BinaryOperator as B;
use Domain::{Any, Bool, Float, Signed, Unsigned};
use MathFunction as M;
use Operation::{Binary, Convert, Extract, Math, Relational, Select, Unary};

const COPY: &str = "copies bits, which every instruction involved preserves";
const WRAPS: &str = "two's complement arithmetic wraps the same way on every device";
const ROUNDED: &str = "correctly rounded in Vulkan: exact when the real result is representable, normal and nonzero, and the operands are neither denormals nor NaN or infinity";
const ORDERED: &str =
    "exact for operands that are neither NaN, infinity nor denormals, which a device may flush";
const SELECTS: &str = "returns one of its operands; exact for normal, nonzero values";
const ULP: &str = "Vulkan allows an error of several ULP, devices round differently";
const INHERITED: &str =
    "Vulkan inherits the precision from an expansion that a device may contract or reorder";

pub static RULES: &[Rule] = &[
    exact(Extract, Any, Guard::Bits, COPY),
    exact(Select, Any, Guard::Bits, COPY),
    exact(Unary(UnaryOperator::LogicalNot), Bool, Guard::Bits, COPY),
    exact(Unary(UnaryOperator::BitwiseNot), Signed, Guard::Bits, WRAPS),
    exact(
        Unary(UnaryOperator::BitwiseNot),
        Unsigned,
        Guard::Bits,
        WRAPS,
    ),
    exact(Unary(UnaryOperator::Negate), Signed, Guard::Bits, WRAPS),
    exact(Unary(UnaryOperator::Negate), Float, Guard::Normal, SELECTS),
    exact(Binary(B::Add), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::Add), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::Subtract), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::Subtract), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::Multiply), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::Multiply), Unsigned, Guard::Bits, WRAPS),
    exact(
        Binary(B::Divide),
        Signed,
        Guard::Divisor,
        "undefined for a zero divisor and for the minimum divided by -1",
    ),
    exact(
        Binary(B::Divide),
        Unsigned,
        Guard::Divisor,
        "undefined for a zero divisor",
    ),
    exact(
        Binary(B::Modulo),
        Signed,
        Guard::Divisor,
        "undefined for a zero divisor; GLSL leaves negative operands undefined",
    ),
    exact(
        Binary(B::Modulo),
        Unsigned,
        Guard::Divisor,
        "undefined for a zero divisor",
    ),
    exact(Binary(B::And), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::And), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::And), Bool, Guard::Bits, COPY),
    exact(Binary(B::InclusiveOr), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::InclusiveOr), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::InclusiveOr), Bool, Guard::Bits, COPY),
    exact(Binary(B::ExclusiveOr), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::ExclusiveOr), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::LogicalAnd), Bool, Guard::Bits, COPY),
    exact(Binary(B::LogicalOr), Bool, Guard::Bits, COPY),
    exact(
        Binary(B::ShiftLeft),
        Signed,
        Guard::Shift,
        "undefined for a shift by the width or more",
    ),
    exact(
        Binary(B::ShiftLeft),
        Unsigned,
        Guard::Shift,
        "undefined for a shift by the width or more",
    ),
    exact(
        Binary(B::ShiftRight),
        Signed,
        Guard::Shift,
        "undefined for a shift by the width or more",
    ),
    exact(
        Binary(B::ShiftRight),
        Unsigned,
        Guard::Shift,
        "undefined for a shift by the width or more",
    ),
    exact(Binary(B::Equal), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::Equal), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::Equal), Bool, Guard::Bits, COPY),
    exact(Binary(B::NotEqual), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::NotEqual), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::NotEqual), Bool, Guard::Bits, COPY),
    exact(Binary(B::Less), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::Less), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::LessEqual), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::LessEqual), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::Greater), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::Greater), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::GreaterEqual), Signed, Guard::Bits, WRAPS),
    exact(Binary(B::GreaterEqual), Unsigned, Guard::Bits, WRAPS),
    exact(Binary(B::Add), Float, Guard::Rounding, ROUNDED),
    exact(Binary(B::Subtract), Float, Guard::Rounding, ROUNDED),
    exact(Binary(B::Multiply), Float, Guard::Rounding, ROUNDED),
    never(
        Binary(B::Divide),
        Float,
        "Vulkan allows 2.5 ULP for a division",
    ),
    never(Binary(B::Modulo), Float, INHERITED),
    exact(Binary(B::Equal), Float, Guard::Compare, ORDERED),
    exact(Binary(B::NotEqual), Float, Guard::Compare, ORDERED),
    exact(Binary(B::Less), Float, Guard::Compare, ORDERED),
    exact(Binary(B::LessEqual), Float, Guard::Compare, ORDERED),
    exact(Binary(B::Greater), Float, Guard::Compare, ORDERED),
    exact(Binary(B::GreaterEqual), Float, Guard::Compare, ORDERED),
    exact(
        Math(M::Abs),
        Signed,
        Guard::Minimum,
        "the absolute value of the minimum is not representable",
    ),
    exact(Math(M::Abs), Unsigned, Guard::Bits, WRAPS),
    exact(Math(M::Abs), Float, Guard::Normal, SELECTS),
    exact(Math(M::Min), Signed, Guard::Bits, WRAPS),
    exact(Math(M::Min), Unsigned, Guard::Bits, WRAPS),
    exact(Math(M::Min), Float, Guard::Normal, SELECTS),
    exact(Math(M::Max), Signed, Guard::Bits, WRAPS),
    exact(Math(M::Max), Unsigned, Guard::Bits, WRAPS),
    exact(Math(M::Max), Float, Guard::Normal, SELECTS),
    exact(
        Math(M::Clamp),
        Signed,
        Guard::Bounds,
        "undefined when the low bound exceeds the high bound",
    ),
    exact(
        Math(M::Clamp),
        Unsigned,
        Guard::Bounds,
        "undefined when the low bound exceeds the high bound",
    ),
    exact(Math(M::Clamp), Float, Guard::Bounds, SELECTS),
    exact(Math(M::Sign), Signed, Guard::Bits, WRAPS),
    exact(Math(M::Sign), Float, Guard::Normal, SELECTS),
    exact(
        Math(M::Floor),
        Float,
        Guard::Normal,
        "an integral value needs no rounding",
    ),
    exact(
        Math(M::Ceil),
        Float,
        Guard::Normal,
        "an integral value needs no rounding",
    ),
    exact(
        Math(M::Trunc),
        Float,
        Guard::Normal,
        "an integral value needs no rounding",
    ),
    exact(
        Math(M::RoundEven),
        Float,
        Guard::Normal,
        "an integral value needs no rounding",
    ),
    exact(
        Math(M::Round),
        Float,
        Guard::Halfway,
        "the direction of a halfway value is up to the device",
    ),
    exact(Math(M::Transpose), Float, Guard::Bits, COPY),
    never(Math(M::Fract), Float, INHERITED),
    never(Math(M::Modf), Float, INHERITED),
    never(Math(M::Mix), Float, INHERITED),
    never(Math(M::Step), Float, INHERITED),
    never(Math(M::SmoothStep), Float, INHERITED),
    never(Math(M::Dot), Float, INHERITED),
    never(Math(M::Cross), Float, INHERITED),
    never(Math(M::Length), Float, INHERITED),
    never(Math(M::Distance), Float, INHERITED),
    never(Math(M::Normalize), Float, INHERITED),
    never(Math(M::FaceForward), Float, INHERITED),
    never(Math(M::Reflect), Float, INHERITED),
    never(Math(M::Refract), Float, INHERITED),
    never(Math(M::Determinant), Float, INHERITED),
    never(Math(M::Inverse), Float, INHERITED),
    never(Math(M::Outer), Float, INHERITED),
    never(
        Math(M::Fma),
        Float,
        "a device may compute it as a separate multiplication and addition",
    ),
    never(Math(M::Sqrt), Float, ULP),
    never(Math(M::InverseSqrt), Float, ULP),
    never(Math(M::Exp), Float, ULP),
    never(Math(M::Exp2), Float, ULP),
    never(Math(M::Log), Float, ULP),
    never(Math(M::Log2), Float, ULP),
    never(Math(M::Pow), Float, ULP),
    never(Math(M::Sin), Float, ULP),
    never(Math(M::Cos), Float, ULP),
    never(Math(M::Tan), Float, ULP),
    never(Math(M::Asin), Float, ULP),
    never(Math(M::Acos), Float, ULP),
    never(Math(M::Atan), Float, ULP),
    never(Math(M::Atan2), Float, ULP),
    never(Math(M::Sinh), Float, ULP),
    never(Math(M::Cosh), Float, ULP),
    never(Math(M::Tanh), Float, ULP),
    never(Math(M::Asinh), Float, ULP),
    never(Math(M::Acosh), Float, ULP),
    never(Math(M::Atanh), Float, ULP),
    never(Math(M::Radians), Float, INHERITED),
    never(Math(M::Degrees), Float, INHERITED),
    exact(Relational(RelationalFunction::All), Bool, Guard::Bits, COPY),
    exact(Relational(RelationalFunction::Any), Bool, Guard::Bits, COPY),
    exact(
        Relational(RelationalFunction::IsNan),
        Float,
        Guard::Classify,
        "a device may assume that no value is NaN or infinity",
    ),
    exact(
        Relational(RelationalFunction::IsInf),
        Float,
        Guard::Classify,
        "a device may assume that no value is NaN or infinity",
    ),
    exact(Convert(Signed), Signed, Guard::Bits, WRAPS),
    exact(Convert(Unsigned), Signed, Guard::Bits, WRAPS),
    exact(Convert(Signed), Unsigned, Guard::Bits, WRAPS),
    exact(Convert(Unsigned), Unsigned, Guard::Bits, WRAPS),
    exact(Convert(Bool), Signed, Guard::Bits, WRAPS),
    exact(Convert(Bool), Unsigned, Guard::Bits, WRAPS),
    exact(Convert(Signed), Bool, Guard::Bits, COPY),
    exact(Convert(Unsigned), Bool, Guard::Bits, COPY),
    exact(Convert(Bool), Float, Guard::Compare, ORDERED),
    exact(
        Convert(Float),
        Signed,
        Guard::Conversion,
        "correctly rounded: exact when the integer is representable and nonzero",
    ),
    exact(
        Convert(Float),
        Unsigned,
        Guard::Conversion,
        "correctly rounded: exact when the integer is representable and nonzero",
    ),
    exact(
        Convert(Float),
        Bool,
        Guard::Conversion,
        "produces 0.0 or 1.0; exact for 1.0, a zero may have either sign",
    ),
    exact(
        Convert(Signed),
        Float,
        Guard::Conversion,
        "truncation is exact for a value in range that is neither a denormal, NaN nor infinity",
    ),
    exact(
        Convert(Unsigned),
        Float,
        Guard::Conversion,
        "truncation is exact for a value in range that is neither a denormal, NaN nor infinity",
    ),
    exact(
        Convert(Float),
        Float,
        Guard::Conversion,
        "exact when the value is representable in the new width, normal and nonzero",
    ),
];

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Pattern {
    Zero,
    One,
    AllOnes,
    True,
    False,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Side {
    Right,
    Either,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Yields {
    Other,
    Constant,
}

#[derive(Debug)]
pub struct Identity {
    pub op: BinaryOperator,
    pub domain: Domain,
    pub constant: Pattern,
    pub side: Side,
    pub yields: Yields,
    pub class: Class,
    pub reason: &'static str,
}

const fn identity(
    op: BinaryOperator,
    domain: Domain,
    constant: Pattern,
    side: Side,
    yields: Yields,
) -> Identity {
    Identity {
        op,
        domain,
        constant,
        side,
        yields,
        class: Class::Exact,
        reason: WRAPS,
    }
}

const fn float_identity(
    op: BinaryOperator,
    constant: Pattern,
    side: Side,
    yields: Yields,
    reason: &'static str,
) -> Identity {
    Identity {
        op,
        domain: Float,
        constant,
        side,
        yields,
        class: Class::Never,
        reason,
    }
}

const FLUSH: &str =
    "a device may flush a denormal operand or quiet a NaN; the identity would keep it";
const SIGN: &str = "the sign of a zero result and NaN and infinity operands";

pub static IDENTITIES: &[Identity] = &[
    identity(B::Add, Signed, Pattern::Zero, Side::Either, Yields::Other),
    identity(B::Add, Unsigned, Pattern::Zero, Side::Either, Yields::Other),
    identity(
        B::Subtract,
        Signed,
        Pattern::Zero,
        Side::Right,
        Yields::Other,
    ),
    identity(
        B::Subtract,
        Unsigned,
        Pattern::Zero,
        Side::Right,
        Yields::Other,
    ),
    identity(
        B::Multiply,
        Signed,
        Pattern::One,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::Multiply,
        Unsigned,
        Pattern::One,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::Multiply,
        Signed,
        Pattern::Zero,
        Side::Either,
        Yields::Constant,
    ),
    identity(
        B::Multiply,
        Unsigned,
        Pattern::Zero,
        Side::Either,
        Yields::Constant,
    ),
    identity(B::Divide, Signed, Pattern::One, Side::Right, Yields::Other),
    identity(
        B::Divide,
        Unsigned,
        Pattern::One,
        Side::Right,
        Yields::Other,
    ),
    identity(
        B::And,
        Signed,
        Pattern::AllOnes,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::And,
        Unsigned,
        Pattern::AllOnes,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::And,
        Signed,
        Pattern::Zero,
        Side::Either,
        Yields::Constant,
    ),
    identity(
        B::And,
        Unsigned,
        Pattern::Zero,
        Side::Either,
        Yields::Constant,
    ),
    identity(
        B::InclusiveOr,
        Signed,
        Pattern::Zero,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::InclusiveOr,
        Unsigned,
        Pattern::Zero,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::InclusiveOr,
        Signed,
        Pattern::AllOnes,
        Side::Either,
        Yields::Constant,
    ),
    identity(
        B::InclusiveOr,
        Unsigned,
        Pattern::AllOnes,
        Side::Either,
        Yields::Constant,
    ),
    identity(
        B::ExclusiveOr,
        Signed,
        Pattern::Zero,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::ExclusiveOr,
        Unsigned,
        Pattern::Zero,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::ShiftLeft,
        Signed,
        Pattern::Zero,
        Side::Right,
        Yields::Other,
    ),
    identity(
        B::ShiftLeft,
        Unsigned,
        Pattern::Zero,
        Side::Right,
        Yields::Other,
    ),
    identity(
        B::ShiftRight,
        Signed,
        Pattern::Zero,
        Side::Right,
        Yields::Other,
    ),
    identity(
        B::ShiftRight,
        Unsigned,
        Pattern::Zero,
        Side::Right,
        Yields::Other,
    ),
    identity(
        B::LogicalAnd,
        Bool,
        Pattern::True,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::LogicalAnd,
        Bool,
        Pattern::False,
        Side::Either,
        Yields::Constant,
    ),
    identity(
        B::LogicalOr,
        Bool,
        Pattern::False,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::LogicalOr,
        Bool,
        Pattern::True,
        Side::Either,
        Yields::Constant,
    ),
    identity(B::And, Bool, Pattern::True, Side::Either, Yields::Other),
    identity(B::And, Bool, Pattern::False, Side::Either, Yields::Constant),
    identity(
        B::InclusiveOr,
        Bool,
        Pattern::False,
        Side::Either,
        Yields::Other,
    ),
    identity(
        B::InclusiveOr,
        Bool,
        Pattern::True,
        Side::Either,
        Yields::Constant,
    ),
    float_identity(B::Add, Pattern::Zero, Side::Either, Yields::Other, FLUSH),
    float_identity(
        B::Subtract,
        Pattern::Zero,
        Side::Right,
        Yields::Other,
        FLUSH,
    ),
    float_identity(
        B::Multiply,
        Pattern::One,
        Side::Either,
        Yields::Other,
        FLUSH,
    ),
    float_identity(B::Divide, Pattern::One, Side::Right, Yields::Other, FLUSH),
    float_identity(
        B::Multiply,
        Pattern::Zero,
        Side::Either,
        Yields::Constant,
        SIGN,
    ),
];

#[derive(Debug)]
pub struct Involution {
    pub op: UnaryOperator,
    pub domain: Domain,
    pub class: Class,
    pub reason: &'static str,
}

pub static INVOLUTIONS: &[Involution] = &[
    Involution {
        op: UnaryOperator::LogicalNot,
        domain: Bool,
        class: Class::Exact,
        reason: COPY,
    },
    Involution {
        op: UnaryOperator::BitwiseNot,
        domain: Signed,
        class: Class::Exact,
        reason: WRAPS,
    },
    Involution {
        op: UnaryOperator::BitwiseNot,
        domain: Unsigned,
        class: Class::Exact,
        reason: WRAPS,
    },
    Involution {
        op: UnaryOperator::Negate,
        domain: Signed,
        class: Class::Exact,
        reason: WRAPS,
    },
    Involution {
        op: UnaryOperator::Negate,
        domain: Float,
        class: Class::Never,
        reason: FLUSH,
    },
];

#[derive(Debug)]
pub struct Reassociation {
    pub op: BinaryOperator,
    pub domain: Domain,
    pub class: Class,
    pub reason: &'static str,
}

const REASSOCIATE: &str = "a different order rounds differently";

pub static REASSOCIATIONS: &[Reassociation] = &[
    Reassociation {
        op: B::Add,
        domain: Signed,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::Add,
        domain: Unsigned,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::Multiply,
        domain: Signed,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::Multiply,
        domain: Unsigned,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::And,
        domain: Signed,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::And,
        domain: Unsigned,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::InclusiveOr,
        domain: Signed,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::InclusiveOr,
        domain: Unsigned,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::ExclusiveOr,
        domain: Signed,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::ExclusiveOr,
        domain: Unsigned,
        class: Class::Exact,
        reason: WRAPS,
    },
    Reassociation {
        op: B::Add,
        domain: Float,
        class: Class::Never,
        reason: REASSOCIATE,
    },
    Reassociation {
        op: B::Multiply,
        domain: Float,
        class: Class::Never,
        reason: REASSOCIATE,
    },
];

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum UndefinedUse {
    Load,
    Extract,
    Operand,
    Condition,
    Selector,
    Store,
}

#[derive(Debug)]
pub struct Undefined {
    pub usage: UndefinedUse,
    pub class: Class,
    pub folds: bool,
    pub counterpart: &'static str,
    pub reason: &'static str,
}

pub static UNDEFINED: &[Undefined] = &[
    Undefined {
        usage: UndefinedUse::Load,
        class: Class::Exact,
        folds: true,
        counterpart: "ssa-rewrite, eliminate-local-single-block, eliminate-local-single-store (MemPass::Type2Undef)",
        reason: "a variable without an initializer holds an undefined value until a store reaches the load",
    },
    Undefined {
        usage: UndefinedUse::Extract,
        class: Class::Exact,
        folds: true,
        counterpart: "none: spirv-opt keeps OpCompositeExtract of OpUndef",
        reason: "every part of an undefined value is undefined",
    },
    Undefined {
        usage: UndefinedUse::Operand,
        class: Class::Exact,
        folds: false,
        counterpart: "the folder treats OpUndef as an unknown value, not as a constant",
        reason: "an undefined operand is an arbitrary value, not poison: only the rules that hold for every value apply",
    },
    Undefined {
        usage: UndefinedUse::Condition,
        class: Class::Exact,
        folds: false,
        counterpart: "eliminate-dead-branches folds only OpConstantTrue, OpConstantFalse and OpConstantNull conditions",
        reason: "either target would be legal; the branch is kept to run the code glslang -O runs",
    },
    Undefined {
        usage: UndefinedUse::Selector,
        class: Class::Exact,
        folds: false,
        counterpart: "eliminate-dead-branches folds only OpConstant and OpConstantNull selectors",
        reason: "any case would be legal; the switch is kept to run the code glslang -O runs",
    },
    Undefined {
        usage: UndefinedUse::Store,
        class: Class::Exact,
        folds: true,
        counterpart: "the StoringUndef folding rule",
        reason: "the old contents of a function or private variable are one of the values an undefined store may leave",
    },
];

pub fn folds_undefined(usage: UndefinedUse) -> bool {
    UNDEFINED
        .iter()
        .any(|row| row.usage == usage && row.class == Class::Exact && row.folds)
}

pub fn rule(operation: Operation, domain: Domain) -> Option<&'static Rule> {
    RULES.iter().find(|rule| {
        rule.operation == operation && (rule.domain == domain || rule.domain == Domain::Any)
    })
}

pub fn identity_rule(
    op: BinaryOperator,
    domain: Domain,
    constant: Pattern,
    right: bool,
) -> Option<&'static Identity> {
    IDENTITIES.iter().find(|identity| {
        identity.class == Class::Exact
            && identity.op == op
            && identity.domain == domain
            && identity.constant == constant
            && match identity.side {
                Side::Either => true,
                Side::Right => right,
            }
    })
}

pub fn involution(op: UnaryOperator, domain: Domain) -> bool {
    INVOLUTIONS.iter().any(|involution| {
        involution.class == Class::Exact && involution.op == op && involution.domain == domain
    })
}

pub fn reassociates(op: BinaryOperator, domain: Domain) -> bool {
    REASSOCIATIONS
        .iter()
        .any(|rule| rule.class == Class::Exact && rule.op == op && rule.domain == domain)
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Format {
    Half,
    Single,
    Double,
}

#[derive(Debug, Clone, Copy, PartialEq)]
pub enum Number {
    Float { value: f64, format: Format },
    Signed { value: i64, bits: u32 },
    Unsigned { value: u64, bits: u32 },
    Bool(bool),
}

impl Number {
    pub fn of(literal: Literal) -> Option<Self> {
        Some(match literal {
            Literal::F64(value) => Self::Float {
                value,
                format: Format::Double,
            },
            Literal::F32(value) => Self::Float {
                value: f64::from(value),
                format: Format::Single,
            },
            Literal::F16(value) => Self::Float {
                value: value.to_f64(),
                format: Format::Half,
            },
            Literal::I8(value) => Self::Signed {
                value: i64::from(value),
                bits: 8,
            },
            Literal::I16(value) => Self::Signed {
                value: i64::from(value),
                bits: 16,
            },
            Literal::I32(value) => Self::Signed {
                value: i64::from(value),
                bits: 32,
            },
            Literal::I64(value) => Self::Signed { value, bits: 64 },
            Literal::U8(value) => Self::Unsigned {
                value: u64::from(value),
                bits: 8,
            },
            Literal::U16(value) => Self::Unsigned {
                value: u64::from(value),
                bits: 16,
            },
            Literal::U32(value) => Self::Unsigned {
                value: u64::from(value),
                bits: 32,
            },
            Literal::U64(value) => Self::Unsigned { value, bits: 64 },
            Literal::Bool(value) => Self::Bool(value),
            Literal::BF16(_)
            | Literal::FE4M3(_)
            | Literal::FE5M2(_)
            | Literal::FE2M1(_)
            | Literal::FE3M2(_)
            | Literal::FE2M3(_)
            | Literal::FUE8M0(_)
            | Literal::FMXINT8(_) => return None,
        })
    }

    pub const fn domain(self) -> Domain {
        match self {
            Self::Float { .. } => Domain::Float,
            Self::Signed { .. } => Domain::Signed,
            Self::Unsigned { .. } => Domain::Unsigned,
            Self::Bool(_) => Domain::Bool,
        }
    }

    pub fn matches(self, pattern: Pattern) -> bool {
        match (self, pattern) {
            (Self::Signed { value, .. }, Pattern::Zero) => value == 0,
            (Self::Unsigned { value, .. }, Pattern::Zero) => value == 0,
            (Self::Signed { value, .. }, Pattern::One) => value == 1,
            (Self::Unsigned { value, .. }, Pattern::One) => value == 1,
            (Self::Signed { value, .. }, Pattern::AllOnes) => value == -1,
            (Self::Unsigned { value, bits }, Pattern::AllOnes) => {
                value == u64::MAX >> (64 - bits.clamp(1, 64))
            }
            (Self::Float { value, .. }, Pattern::Zero) => value == 0.0,
            (Self::Float { value, .. }, Pattern::One) => value == 1.0,
            (Self::Bool(value), Pattern::True) => value,
            (Self::Bool(value), Pattern::False) => !value,
            _ => false,
        }
    }
}

impl Format {
    const fn min_normal(self) -> f64 {
        match self {
            Self::Half => 6.103_515_625e-5,
            Self::Single => 1.175_494_350_822_287_5e-38,
            Self::Double => f64::MIN_POSITIVE,
        }
    }

    fn holds(self, value: f64) -> bool {
        match self {
            Self::Half => f16::from_f64(value).to_f64() == value,
            Self::Single => {
                let narrowed = value as f32;
                f64::from(narrowed) == value
            }
            Self::Double => true,
        }
    }
}

fn finite_operand(value: f64, format: Format) -> bool {
    value.is_finite() && (value == 0.0 || value.abs() >= format.min_normal())
}

fn normal_result(value: f64, format: Format) -> bool {
    value.is_finite() && value != 0.0 && value.abs() >= format.min_normal() && format.holds(value)
}

fn sum(a: f64, b: f64) -> Option<f64> {
    let total = a + b;
    let b_part = total - a;
    let a_part = total - b_part;
    let error = (a - a_part) + (b - b_part);
    (error == 0.0).then_some(total)
}

fn product(a: f64, b: f64) -> Option<f64> {
    let total = a * b;
    let error = a.mul_add(b, -total);
    (error == 0.0).then_some(total)
}

fn component(values: &[Number], index: usize) -> Option<Number> {
    match values.len() {
        1 => values.first().copied(),
        _ => values.get(index).copied(),
    }
}

fn aligned(operands: &[Vec<Number>], count: usize) -> bool {
    operands
        .iter()
        .all(|values| values.len() == 1 || values.len() == count)
}

fn floats(operands: &[Vec<Number>], index: usize) -> Option<Vec<(f64, Format)>> {
    operands
        .iter()
        .map(|values| match component(values, index)? {
            Number::Float { value, format } => Some((value, format)),
            _ => None,
        })
        .collect()
}

fn integer(number: Number) -> Option<i128> {
    match number {
        Number::Signed { value, .. } => Some(i128::from(value)),
        Number::Unsigned { value, .. } => Some(i128::from(value)),
        _ => None,
    }
}

pub fn admits(
    rule: &Rule,
    operation: Operation,
    operands: &[Vec<Number>],
    result: &[Number],
) -> bool {
    if rule.class != Class::Exact {
        return false;
    }
    if rule.guard == Guard::Bits {
        return true;
    }
    if !aligned(operands, result.len()) {
        return false;
    }
    result
        .iter()
        .enumerate()
        .all(|(index, &value)| component_admits(rule.guard, operation, operands, index, value))
}

fn component_admits(
    guard: Guard,
    operation: Operation,
    operands: &[Vec<Number>],
    index: usize,
    result: Number,
) -> bool {
    match guard {
        Guard::Bits => true,
        Guard::Refused => false,
        Guard::Rounding => rounding(operation, operands, index, result),
        Guard::Compare | Guard::Classify => floats(operands, index).is_some_and(|values| {
            values
                .iter()
                .all(|&(value, format)| finite_operand(value, format))
        }),
        Guard::Normal => normal(operands, index, result),
        Guard::Halfway => {
            normal(operands, index, result)
                && floats(operands, index).is_some_and(|values| {
                    values
                        .first()
                        .is_some_and(|&(value, _)| (value.abs() - value.abs().floor()) != 0.5)
                })
        }
        Guard::Bounds => match operands {
            [_, low, high] => match (component(low, index), component(high, index)) {
                (
                    Some(Number::Float { value: low, .. }),
                    Some(Number::Float { value: high, .. }),
                ) => low <= high && normal(operands, index, result),
                (Some(low), Some(high)) => integer(low)
                    .zip(integer(high))
                    .is_some_and(|(low, high)| low <= high),
                _ => false,
            },
            _ => false,
        },
        Guard::Divisor => divisor(operation, operands, index),
        Guard::Shift => match operands {
            [value, amount] => match (component(value, index), component(amount, index)) {
                (
                    Some(Number::Signed { bits, .. } | Number::Unsigned { bits, .. }),
                    Some(amount),
                ) => integer(amount).is_some_and(|amount| (0..i128::from(bits)).contains(&amount)),
                _ => false,
            },
            _ => false,
        },
        Guard::Minimum => match operands.first().and_then(|values| component(values, index)) {
            Some(Number::Signed { value, bits }) => {
                i128::from(value) != -(1_i128 << (bits.clamp(1, 64) - 1))
            }
            _ => false,
        },
        Guard::Conversion => conversion(operands, index, result),
    }
}

fn normal(operands: &[Vec<Number>], index: usize, result: Number) -> bool {
    let Some(values) = floats(operands, index) else {
        return false;
    };
    if !values
        .iter()
        .all(|&(value, format)| finite_operand(value, format))
    {
        return false;
    }
    match result {
        Number::Float { value, format } => normal_result(value, format),
        Number::Bool(_) => true,
        _ => false,
    }
}

fn rounding(operation: Operation, operands: &[Vec<Number>], index: usize, result: Number) -> bool {
    let Some(values) = floats(operands, index) else {
        return false;
    };
    let [(a, format), (b, other)] = values[..] else {
        return false;
    };
    let Number::Float {
        value,
        format: result_format,
    } = result
    else {
        return false;
    };
    if format != other || format != result_format {
        return false;
    }
    if !finite_operand(a, format) || !finite_operand(b, format) || !normal_result(value, format) {
        return false;
    }
    let real = match operation {
        Operation::Binary(BinaryOperator::Add) => sum(a, b),
        Operation::Binary(BinaryOperator::Subtract) => sum(a, -b),
        Operation::Binary(BinaryOperator::Multiply) => product(a, b),
        _ => None,
    };
    real == Some(value)
}

fn divisor(operation: Operation, operands: &[Vec<Number>], index: usize) -> bool {
    let [left, right] = operands else {
        return false;
    };
    let (Some(left), Some(right)) = (component(left, index), component(right, index)) else {
        return false;
    };
    let (Some(a), Some(b)) = (integer(left), integer(right)) else {
        return false;
    };
    if b == 0 {
        return false;
    }
    match (operation, left) {
        (Operation::Binary(BinaryOperator::Divide), Number::Signed { bits, .. }) => {
            !(b == -1 && a == -(1_i128 << (bits.clamp(1, 64) - 1)))
        }
        (Operation::Binary(BinaryOperator::Modulo), Number::Signed { .. }) => a >= 0 && b > 0,
        (_, Number::Unsigned { .. }) => true,
        _ => false,
    }
}

fn conversion(operands: &[Vec<Number>], index: usize, result: Number) -> bool {
    let Some(input) = operands.first().and_then(|values| component(values, index)) else {
        return false;
    };
    match (input, result) {
        (
            Number::Float { value, format },
            Number::Float {
                value: out,
                format: to,
            },
        ) => finite_operand(value, format) && normal_result(out, to) && out == value,
        (Number::Float { value, format }, out) => {
            let Some(out) = integer(out) else {
                return false;
            };
            let back = out as f64;
            finite_operand(value, format) && back == value.trunc() && i128_exact(out)
        }
        (Number::Bool(_), Number::Float { value, format }) => normal_result(value, format),
        (input, Number::Float { value, format }) => {
            let Some(input) = integer(input) else {
                return false;
            };
            let exact = input as f64;
            i128_exact(input) && normal_result(value, format) && exact == value
        }
        _ => false,
    }
}

const fn i128_exact(value: i128) -> bool {
    value.unsigned_abs() <= 1 << 53
}
