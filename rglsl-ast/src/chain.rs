use rglsl_types::small_vec::SmallVec;

use crate::ast::{Expression, ExpressionKind, FunctionCall, FunctionIdentifier, NodeId};
use crate::span::Span;

pub type SpineLinks<'a> = SmallVec<&'a Expression, 16>;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Chain {
    Binary,
    Unary,
    Postfix,
    Assignment,
    Conditional,
}

#[derive(Debug)]
pub struct Spine<'a> {
    pub links: SpineLinks<'a>,
    pub head: &'a Expression,
}

impl<'a> Spine<'a> {
    pub fn of(expression: &'a Expression) -> Self {
        let mut links = SpineLinks::new();
        let mut current = expression;
        if let Some(chain) = current.kind.chain() {
            while let Some(next) = current.kind.link() {
                links.push(current);
                current = next;
                if current.kind.chain() != Some(chain) {
                    break;
                }
            }
        }
        Self {
            links,
            head: current,
        }
    }
}

pub fn placeholder() -> Expression {
    Expression::new(NodeId::FIRST, Span::default(), ExpressionKind::Bool(false))
}

impl ExpressionKind {
    pub const fn chain(&self) -> Option<Chain> {
        match self {
            Self::Binary { .. } => Some(Chain::Binary),
            Self::Unary { .. } => Some(Chain::Unary),
            Self::Subscript { .. } | Self::FieldSelection { .. } | Self::Postfix { .. } => {
                Some(Chain::Postfix)
            }
            Self::Assignment { .. } => Some(Chain::Assignment),
            Self::Conditional { .. } => Some(Chain::Conditional),
            Self::Variable(_)
            | Self::Number(_)
            | Self::Bool(_)
            | Self::String(_)
            | Self::Parenthesized(_)
            | Self::FunctionCall(_)
            | Self::Sequence(_) => None,
        }
    }

    pub fn link(&self) -> Option<&Expression> {
        match self {
            Self::Binary { left, .. } => Some(left),
            Self::Unary { operand, .. } | Self::Postfix { operand, .. } => Some(operand),
            Self::Subscript { base, .. } | Self::FieldSelection { base, .. } => Some(base),
            Self::Assignment { value, .. } => Some(value),
            Self::Conditional {
                else_expression, ..
            } => Some(else_expression),
            Self::Variable(_)
            | Self::Number(_)
            | Self::Bool(_)
            | Self::String(_)
            | Self::Parenthesized(_)
            | Self::FunctionCall(_)
            | Self::Sequence(_) => None,
        }
    }

    pub const fn is_leaf(&self) -> bool {
        matches!(
            self,
            Self::Variable(_) | Self::Number(_) | Self::Bool(_) | Self::String(_)
        )
    }

    pub fn for_each_child<'a>(&'a self, mut f: impl FnMut(&'a Expression)) {
        match self {
            Self::Variable(_) | Self::Number(_) | Self::Bool(_) | Self::String(_) => {}
            Self::Parenthesized(inner) => f(inner),
            Self::Subscript { base, index } => {
                f(base);
                f(index);
            }
            Self::FunctionCall(call) => {
                match &call.function.node {
                    FunctionIdentifier::Expression(callee) => f(callee),
                    FunctionIdentifier::Method { object, .. } => f(object),
                    FunctionIdentifier::Constructor(_)
                    | FunctionIdentifier::Cast(_)
                    | FunctionIdentifier::Function(_) => {}
                }
                for argument in &call.arguments {
                    f(argument);
                }
            }
            Self::FieldSelection { base, .. } => f(base),
            Self::Postfix { operand, .. } | Self::Unary { operand, .. } => f(operand),
            Self::Binary { left, right, .. } => {
                f(left);
                f(right);
            }
            Self::Conditional {
                condition,
                then_expression,
                else_expression,
            } => {
                f(condition);
                f(then_expression);
                f(else_expression);
            }
            Self::Assignment { target, value, .. } => {
                f(target);
                f(value);
            }
            Self::Sequence(items) => {
                for item in items {
                    f(item);
                }
            }
        }
    }

    pub fn for_each_child_mut<'a>(&'a mut self, mut f: impl FnMut(&'a mut Expression)) {
        match self {
            Self::Variable(_) | Self::Number(_) | Self::Bool(_) | Self::String(_) => {}
            Self::Parenthesized(inner) => f(inner),
            Self::Subscript { base, index } => {
                f(base);
                f(index);
            }
            Self::FunctionCall(call) => {
                let FunctionCall {
                    function,
                    arguments,
                } = &mut **call;
                match &mut function.node {
                    FunctionIdentifier::Expression(callee) => f(callee),
                    FunctionIdentifier::Method { object, .. } => f(object),
                    FunctionIdentifier::Constructor(_)
                    | FunctionIdentifier::Cast(_)
                    | FunctionIdentifier::Function(_) => {}
                }
                for argument in arguments {
                    f(argument);
                }
            }
            Self::FieldSelection { base, .. } => f(base),
            Self::Postfix { operand, .. } | Self::Unary { operand, .. } => f(operand),
            Self::Binary { left, right, .. } => {
                f(left);
                f(right);
            }
            Self::Conditional {
                condition,
                then_expression,
                else_expression,
            } => {
                f(condition);
                f(then_expression);
                f(else_expression);
            }
            Self::Assignment { target, value, .. } => {
                f(target);
                f(value);
            }
            Self::Sequence(items) => {
                for item in items {
                    f(item);
                }
            }
        }
    }
}
