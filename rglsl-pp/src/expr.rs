use crate::diagnostic::DiagnosticKind;
use crate::expand::Expand;
use crate::preprocessor::Preprocessor;
use crate::token::{Kind, Token};

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

impl Preprocessor<'_> {
    pub(crate) fn evaluate(&mut self, token: Token) -> (i32, bool, Token) {
        let mut state = State {
            value: 0,
            error: false,
        };
        let token = self.eval(token, MIN_PRECEDENCE, false, &mut state, 0);
        (state.value, state.error, token)
    }

    fn fail(&mut self, kind: DiagnosticKind, token: &Token, state: &mut State) {
        self.report(kind, token.at);
        state.error = true;
        state.value = 0;
    }

    fn eval(
        &mut self,
        mut token: Token,
        precedence: u8,
        mut short_circuit: bool,
        state: &mut State,
        depth: usize,
    ) -> Token {
        if depth > self.options.limits.max_expression_depth {
            self.fail(DiagnosticKind::ExpressionTooDeep, &token.clone(), state);
            return token;
        }
        let start = token.clone();
        if token.kind == Kind::Identifier {
            if &*token.text == "defined" {
                if self.is_macro_input() {
                    self.report(DiagnosticKind::DefinedFromMacro, token.at);
                }
                token = self.scan();
                let close = token.kind.is_op("(");
                if close {
                    token = self.scan();
                }
                if token.kind != Kind::Identifier {
                    self.fail(DiagnosticKind::DefinedWithoutIdentifier, &start, state);
                    return token;
                }
                state.value = i32::from(
                    self.macros
                        .get(&*token.text)
                        .is_some_and(|definition| !definition.undef),
                );
                token = self.scan();
                if close {
                    if !token.kind.is_op(")") {
                        self.fail(DiagnosticKind::ExpectedCloseParen, &start, state);
                        return token;
                    }
                    token = self.scan();
                }
            } else {
                token = self.paste(token);
                token = self.eval_to_token(token, state);
                return self.eval(token, precedence, short_circuit, state, depth + 1);
            }
        } else if token.kind == Kind::IntConst {
            state.value = i32::try_from(token.value).unwrap_or(0);
            token = self.scan();
        } else if token.kind.is_op("(") {
            token = self.scan();
            token = self.eval(token, MIN_PRECEDENCE, short_circuit, state, depth + 1);
            if !state.error {
                if !token.kind.is_op(")") {
                    self.fail(DiagnosticKind::ExpectedCloseParen, &start, state);
                    return token;
                }
                token = self.scan();
            }
        } else {
            let unary = match token.kind {
                Kind::Op("+") => Some(0),
                Kind::Op("-") => Some(1),
                Kind::Op("~") => Some(2),
                Kind::Op("!") => Some(3),
                _ => None,
            };
            let Some(unary) = unary else {
                self.fail(DiagnosticKind::BadExpression, &start, state);
                return token;
            };
            token = self.scan();
            token = self.eval(token, UNARY, short_circuit, state, depth + 1);
            state.value = match unary {
                0 => state.value,
                1 => state.value.wrapping_neg(),
                2 => !state.value,
                _ => i32::from(state.value == 0),
            };
        }
        token = self.eval_to_token(token, state);
        while !state.error {
            if token.kind.is_op(")") || token.kind == Kind::Newline {
                break;
            }
            let Some((operation, operation_precedence)) = Binary::from_kind(token.kind) else {
                break;
            };
            if operation_precedence <= precedence {
                break;
            }
            let left = state.value;
            if !short_circuit
                && ((operation == Binary::LogicalOr && left == 1)
                    || (operation == Binary::LogicalAnd && left == 0))
            {
                short_circuit = true;
            }
            token = self.scan();
            token = self.eval(token, operation_precedence, short_circuit, state, depth + 1);
            if matches!(operation, Binary::Divide | Binary::Remainder) && state.value == 0 {
                self.report(DiagnosticKind::DivisionByZero, start.at);
                state.value = 1;
            }
            state.value = operation.apply(left, state.value);
        }
        token
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
