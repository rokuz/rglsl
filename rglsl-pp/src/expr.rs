use crate::diagnostic::DiagnosticKind;
use crate::expand::Expand;
use crate::preprocessor::Preprocessor;
use crate::token::{Kind, Token};
use rglsl_types::stack::recurse;

const MIN_PRECEDENCE: u8 = 0;
const LOGICAL_OR: u8 = 2;
const LOGICAL_AND: u8 = 3;
const BIT_OR: u8 = 4;
const BIT_XOR: u8 = 5;
const BIT_AND: u8 = 6;
const EQUALITY: u8 = 7;
const RELATION: u8 = 8;
const SHIFT: u8 = 9;
const ADDITIVE: u8 = 10;
const MULTIPLICATIVE: u8 = 11;
const UNARY: u8 = 12;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum Binary {
    LogicalOr,
    LogicalAnd,
    BitOr,
    BitXor,
    BitAnd,
    Equal,
    NotEqual,
    Greater,
    GreaterEqual,
    Less,
    LessEqual,
    ShiftLeft,
    ShiftRight,
    Add,
    Subtract,
    Multiply,
    Divide,
    Remainder,
}

impl Binary {
    fn from_kind(kind: Kind) -> Option<(Self, u8)> {
        let Kind::Op(op) = kind else {
            return None;
        };
        Some(match op {
            "||" => (Self::LogicalOr, LOGICAL_OR),
            "&&" => (Self::LogicalAnd, LOGICAL_AND),
            "|" => (Self::BitOr, BIT_OR),
            "^" => (Self::BitXor, BIT_XOR),
            "&" => (Self::BitAnd, BIT_AND),
            "==" => (Self::Equal, EQUALITY),
            "!=" => (Self::NotEqual, EQUALITY),
            ">" => (Self::Greater, RELATION),
            ">=" => (Self::GreaterEqual, RELATION),
            "<" => (Self::Less, RELATION),
            "<=" => (Self::LessEqual, RELATION),
            "<<" => (Self::ShiftLeft, SHIFT),
            ">>" => (Self::ShiftRight, SHIFT),
            "+" => (Self::Add, ADDITIVE),
            "-" => (Self::Subtract, ADDITIVE),
            "*" => (Self::Multiply, MULTIPLICATIVE),
            "/" => (Self::Divide, MULTIPLICATIVE),
            "%" => (Self::Remainder, MULTIPLICATIVE),
            _ => return None,
        })
    }

    fn apply(self, left: i32, right: i32) -> i32 {
        let shift_in_range = (0..32).contains(&right);
        match self {
            Self::LogicalOr => i32::from(left != 0 || right != 0),
            Self::LogicalAnd => i32::from(left != 0 && right != 0),
            Self::BitOr => left | right,
            Self::BitXor => left ^ right,
            Self::BitAnd => left & right,
            Self::Equal => i32::from(left == right),
            Self::NotEqual => i32::from(left != right),
            Self::Greater => i32::from(left > right),
            Self::GreaterEqual => i32::from(left >= right),
            Self::Less => i32::from(left < right),
            Self::LessEqual => i32::from(left <= right),
            Self::ShiftLeft => {
                if shift_in_range {
                    left.wrapping_shl(right.unsigned_abs())
                } else {
                    0
                }
            }
            Self::ShiftRight => {
                if shift_in_range {
                    left.wrapping_shr(right.unsigned_abs())
                } else if left < 0 {
                    -1
                } else {
                    0
                }
            }
            Self::Add => left.wrapping_add(right),
            Self::Subtract => left.wrapping_sub(right),
            Self::Multiply => left.wrapping_mul(right),
            Self::Divide => left.checked_div(right).unwrap_or(0),
            Self::Remainder => left.checked_rem(right).unwrap_or(0),
        }
    }
}

struct State {
    value: i32,
    error: bool,
}

enum Operand {
    Value,
    Failed,
    Retry,
    Parenthesized,
    Unary(UnaryOp),
}

#[derive(Clone, Copy)]
enum UnaryOp {
    Plus,
    Minus,
    BitNot,
    LogicalNot,
}

impl UnaryOp {
    fn apply(self, value: i32) -> i32 {
        match self {
            Self::Plus => value,
            Self::Minus => value.wrapping_neg(),
            Self::BitNot => !value,
            Self::LogicalNot => i32::from(value == 0),
        }
    }
}

impl Preprocessor<'_> {
    pub(crate) fn evaluate(&mut self, token: Token) -> (i32, bool, Token) {
        let mut state = State {
            value: 0,
            error: false,
        };
        let token = self.eval(token, MIN_PRECEDENCE, &mut state);
        (state.value, state.error, token)
    }

    fn eval(&mut self, mut token: Token, precedence: u8, state: &mut State) -> Token {
        recurse(|| {
            let start = loop {
                let start = token.clone();
                match self.operand(&mut token, state) {
                    Operand::Value => break start,
                    Operand::Failed => return token,
                    Operand::Retry => {}
                    Operand::Parenthesized => {
                        token = self.eval(token, MIN_PRECEDENCE, state);
                        if !state.error {
                            if !token.kind.is_op(")") {
                                self.fail(DiagnosticKind::ExpectedCloseParen, &start, state);
                                return token;
                            }
                            token = self.scan();
                        }
                        break start;
                    }
                    Operand::Unary(unary) => {
                        token = self.eval(token, UNARY, state);
                        state.value = unary.apply(state.value);
                        break start;
                    }
                }
            };
            token = self.eval_to_token(token, state);
            while let Some((operation, operation_precedence)) =
                self.operator(&mut token, precedence, state)
            {
                let left = state.value;
                token = self.eval(token, operation_precedence, state);
                if matches!(operation, Binary::Divide | Binary::Remainder) && state.value == 0 {
                    self.report(DiagnosticKind::DivisionByZero, start.at);
                    state.value = 1;
                }
                state.value = operation.apply(left, state.value);
            }
            token
        })
    }

    fn fail(&mut self, kind: DiagnosticKind, token: &Token, state: &mut State) {
        self.report(kind, token.at);
        state.error = true;
        state.value = 0;
    }

    fn operand(&mut self, token: &mut Token, state: &mut State) -> Operand {
        let start = token.clone();
        if token.kind == Kind::Identifier {
            if &*token.text != "defined" {
                let pasted = self.paste(token.clone());
                *token = self.eval_to_token(pasted, state);
                return Operand::Retry;
            }
            if self.is_macro_input() {
                self.report(DiagnosticKind::DefinedFromMacro, token.at);
            }
            *token = self.scan();
            let close = token.kind.is_op("(");
            if close {
                *token = self.scan();
            }
            if token.kind != Kind::Identifier {
                self.fail(DiagnosticKind::DefinedWithoutIdentifier, &start, state);
                return Operand::Failed;
            }
            state.value = i32::from(
                self.macros
                    .get(&token.text)
                    .is_some_and(|definition| !definition.undef),
            );
            *token = self.scan();
            if close {
                if !token.kind.is_op(")") {
                    self.fail(DiagnosticKind::ExpectedCloseParen, &start, state);
                    return Operand::Failed;
                }
                *token = self.scan();
            }
            return Operand::Value;
        }
        if token.kind == Kind::IntConst {
            state.value = i32::try_from(token.value).unwrap_or(0);
            *token = self.scan();
            return Operand::Value;
        }
        if token.kind.is_op("(") {
            *token = self.scan();
            return Operand::Parenthesized;
        }
        let unary = match token.kind {
            Kind::Op("+") => Some(UnaryOp::Plus),
            Kind::Op("-") => Some(UnaryOp::Minus),
            Kind::Op("~") => Some(UnaryOp::BitNot),
            Kind::Op("!") => Some(UnaryOp::LogicalNot),
            _ => None,
        };
        let Some(unary) = unary else {
            self.fail(DiagnosticKind::BadExpression, &start, state);
            return Operand::Failed;
        };
        *token = self.scan();
        Operand::Unary(unary)
    }

    fn operator(
        &mut self,
        token: &mut Token,
        precedence: u8,
        state: &State,
    ) -> Option<(Binary, u8)> {
        if state.error || token.kind.is_op(")") || token.kind == Kind::Newline {
            return None;
        }
        let (operation, operation_precedence) = Binary::from_kind(token.kind)?;
        if operation_precedence <= precedence {
            return None;
        }
        *token = self.scan();
        Some((operation, operation_precedence))
    }

    fn eval_to_token(&mut self, mut token: Token, state: &mut State) -> Token {
        while token.kind == Kind::Identifier && &*token.text != "defined" {
            match self.macro_expand(&mut token, true, false) {
                Expand::NotStarted | Expand::Error => {
                    self.fail(DiagnosticKind::CannotEvaluate, &token.clone(), state);
                }
                Expand::Started | Expand::Undef => {}
            }
            token = self.scan();
            if state.error {
                break;
            }
        }
        token
    }
}
