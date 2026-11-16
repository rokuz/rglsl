use alloc::boxed::Box;
use alloc::vec::Vec;

use rglsl_types::small_vec::SmallVec;
use rglsl_types::stack::InlineDepth;

use crate::ast::{Expression, ExpressionKind, FunctionCall, FunctionIdentifier, NodeId};
use crate::deep::{Nested, deep_clone, deep_eq, drop_owned};
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

    pub fn child_count(&self) -> usize {
        match self {
            Self::Variable(_) | Self::Number(_) | Self::Bool(_) | Self::String(_) => 0,
            Self::Parenthesized(_)
            | Self::FieldSelection { .. }
            | Self::Postfix { .. }
            | Self::Unary { .. } => 1,
            Self::Subscript { .. } | Self::Binary { .. } | Self::Assignment { .. } => 2,
            Self::Conditional { .. } => 3,
            Self::FunctionCall(call) => {
                let head = match call.function.node {
                    FunctionIdentifier::Expression(_) | FunctionIdentifier::Method { .. } => 1,
                    FunctionIdentifier::Constructor(_)
                    | FunctionIdentifier::Cast(_)
                    | FunctionIdentifier::Function(_) => 0,
                };
                head + call.arguments.len()
            }
            Self::Sequence(items) => items.len(),
        }
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

    pub fn children(&self) -> Vec<&Expression> {
        let mut children = Vec::with_capacity(self.child_count());
        self.for_each_child(|child| children.push(child));
        children
    }

    pub fn children_mut(&mut self) -> Vec<&mut Expression> {
        let mut children = Vec::with_capacity(self.child_count());
        self.for_each_child_mut(|child| children.push(child));
        children
    }

    fn shell(&self) -> Self {
        let hole = || Box::new(placeholder());
        match self {
            Self::Variable(name) => Self::Variable(name.clone()),
            Self::Number(number) => Self::Number(number.clone()),
            Self::Bool(value) => Self::Bool(*value),
            Self::String(text) => Self::String(text.clone()),
            Self::Parenthesized(_) => Self::Parenthesized(hole()),
            Self::Subscript { .. } => Self::Subscript {
                base: hole(),
                index: hole(),
            },
            Self::FunctionCall(call) => {
                let function = match &call.function.node {
                    FunctionIdentifier::Expression(_) => FunctionIdentifier::Expression(hole()),
                    FunctionIdentifier::Method { name, .. } => FunctionIdentifier::Method {
                        object: hole(),
                        name: name.clone(),
                    },
                    FunctionIdentifier::Constructor(ty) => {
                        FunctionIdentifier::Constructor(ty.clone())
                    }
                    FunctionIdentifier::Cast(ty) => FunctionIdentifier::Cast(ty.clone()),
                    FunctionIdentifier::Function(name) => {
                        FunctionIdentifier::Function(name.clone())
                    }
                };
                Self::FunctionCall(Box::new(FunctionCall {
                    function: crate::ast::Spanned::new(call.function.span, function),
                    arguments: call.arguments.iter().map(|_| placeholder()).collect(),
                }))
            }
            Self::FieldSelection { field, .. } => Self::FieldSelection {
                base: hole(),
                field: field.clone(),
            },
            Self::Postfix { operator, .. } => Self::Postfix {
                operand: hole(),
                operator: *operator,
            },
            Self::Unary { operator, .. } => Self::Unary {
                operator: *operator,
                operand: hole(),
            },
            Self::Binary { operator, .. } => Self::Binary {
                operator: *operator,
                left: hole(),
                right: hole(),
            },
            Self::Conditional { .. } => Self::Conditional {
                condition: hole(),
                then_expression: hole(),
                else_expression: hole(),
            },
            Self::Assignment { operator, .. } => Self::Assignment {
                operator: *operator,
                target: hole(),
                value: hole(),
            },
            Self::Sequence(items) => Self::Sequence(items.iter().map(|_| placeholder()).collect()),
        }
    }

    fn same_shell(&self, other: &Self) -> bool {
        match (self, other) {
            (Self::Variable(left), Self::Variable(right))
            | (Self::String(left), Self::String(right)) => left == right,
            (Self::Number(left), Self::Number(right)) => left == right,
            (Self::Bool(left), Self::Bool(right)) => left == right,
            (Self::Parenthesized(_), Self::Parenthesized(_))
            | (Self::Subscript { .. }, Self::Subscript { .. })
            | (Self::Conditional { .. }, Self::Conditional { .. }) => true,
            (Self::FunctionCall(left), Self::FunctionCall(right)) => {
                left.arguments.len() == right.arguments.len()
                    && match (&left.function.node, &right.function.node) {
                        (FunctionIdentifier::Expression(_), FunctionIdentifier::Expression(_)) => {
                            true
                        }
                        (
                            FunctionIdentifier::Method { name: left, .. },
                            FunctionIdentifier::Method { name: right, .. },
                        ) => left == right,
                        (
                            FunctionIdentifier::Constructor(left),
                            FunctionIdentifier::Constructor(right),
                        )
                        | (FunctionIdentifier::Cast(left), FunctionIdentifier::Cast(right)) => {
                            left == right
                        }
                        (
                            FunctionIdentifier::Function(left),
                            FunctionIdentifier::Function(right),
                        ) => left == right,
                        _ => false,
                    }
            }
            (
                Self::FieldSelection { field: left, .. },
                Self::FieldSelection { field: right, .. },
            ) => left == right,
            (
                Self::Postfix { operator: left, .. },
                Self::Postfix {
                    operator: right, ..
                },
            ) => left == right,
            (
                Self::Unary { operator: left, .. },
                Self::Unary {
                    operator: right, ..
                },
            ) => left == right,
            (
                Self::Binary { operator: left, .. },
                Self::Binary {
                    operator: right, ..
                },
            ) => left == right,
            (
                Self::Assignment { operator: left, .. },
                Self::Assignment {
                    operator: right, ..
                },
            ) => left == right,
            (Self::Sequence(left), Self::Sequence(right)) => left.len() == right.len(),
            _ => false,
        }
    }
    pub(crate) fn exceeds_inline_depth(&self) -> bool {
        self.exceeds(InlineDepth::MAX)
    }

    fn exceeds(&self, depth: InlineDepth) -> bool {
        if self.is_leaf() {
            return false;
        }
        let Some(nested) = depth.nested() else {
            return true;
        };
        if let Self::FunctionCall(call) = self
            && let FunctionIdentifier::Constructor(ty) | FunctionIdentifier::Cast(ty) =
                &call.function.node
            && !ty.is_leaf_type()
        {
            return true;
        }
        let mut deep = false;
        self.for_each_child(|child| {
            if !deep && child.kind.exceeds(nested) {
                deep = true;
            }
        });
        deep
    }
}

impl Nested for ExpressionKind {
    type Node = Expression;

    fn kind(node: &Expression) -> &Self {
        &node.kind
    }

    fn rebuild(node: &Expression, kind: Self) -> Expression {
        Expression::new(node.id, node.span, kind)
    }

    fn has_children(&self) -> bool {
        self.child_count() != 0
    }

    fn child_count(&self) -> usize {
        Self::child_count(self)
    }

    fn for_each_child<'a>(&'a self, f: impl FnMut(&'a Expression)) {
        Self::for_each_child(self, f);
    }

    fn for_each_child_mut<'a>(&'a mut self, f: impl FnMut(&'a mut Expression)) {
        Self::for_each_child_mut(self, f);
    }

    fn shell(&self) -> Self {
        Self::shell(self)
    }

    fn same_shell(&self, other: &Self) -> bool {
        Self::same_shell(self, other)
    }
}

impl Drop for ExpressionKind {
    fn drop(&mut self) {
        if !self.exceeds_inline_depth() {
            return;
        }
        let mut pending = Vec::new();
        self.take_owned(&mut pending);
        drop_owned(pending);
    }
}

impl Clone for ExpressionKind {
    fn clone(&self) -> Self {
        deep_clone(self)
    }
}

impl PartialEq for ExpressionKind {
    fn eq(&self, other: &Self) -> bool {
        deep_eq(self, other)
    }
}

impl Eq for ExpressionKind {}
