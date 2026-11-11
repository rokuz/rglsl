use alloc::boxed::Box;
use alloc::vec::Vec;
use core::mem;

use crate::ast::{Expression, ExpressionKind, FunctionCall, FunctionIdentifier, NodeId};
use crate::span::Span;

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
    pub links: Vec<&'a Expression>,
    pub head: &'a Expression,
}

impl<'a> Spine<'a> {
    pub fn of(expression: &'a Expression) -> Self {
        let mut links = Vec::new();
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
    Expression::new(NodeId::new(0), Span::default(), ExpressionKind::Bool(false))
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

    pub fn children(&self) -> Vec<&Expression> {
        let mut children = Vec::new();
        match self {
            Self::Variable(_) | Self::Number(_) | Self::Bool(_) | Self::String(_) => {}
            Self::Parenthesized(inner) => children.push(&**inner),
            Self::Subscript { base, index } => {
                children.push(&**base);
                children.push(&**index);
            }
            Self::FunctionCall(call) => {
                match &call.function.node {
                    FunctionIdentifier::Expression(callee) => children.push(&**callee),
                    FunctionIdentifier::Method { object, .. } => children.push(&**object),
                    FunctionIdentifier::Constructor(_)
                    | FunctionIdentifier::Cast(_)
                    | FunctionIdentifier::Function(_) => {}
                }
                children.extend(call.arguments.iter());
            }
            Self::FieldSelection { base, .. } => children.push(&**base),
            Self::Postfix { operand, .. } | Self::Unary { operand, .. } => {
                children.push(&**operand);
            }
            Self::Binary { left, right, .. } => {
                children.push(&**left);
                children.push(&**right);
            }
            Self::Conditional {
                condition,
                then_expression,
                else_expression,
            } => {
                children.push(&**condition);
                children.push(&**then_expression);
                children.push(&**else_expression);
            }
            Self::Assignment { target, value, .. } => {
                children.push(&**target);
                children.push(&**value);
            }
            Self::Sequence(items) => children.extend(items.iter()),
        }
        children
    }

    pub fn children_mut(&mut self) -> Vec<&mut Expression> {
        let mut children = Vec::new();
        match self {
            Self::Variable(_) | Self::Number(_) | Self::Bool(_) | Self::String(_) => {}
            Self::Parenthesized(inner) => children.push(&mut **inner),
            Self::Subscript { base, index } => {
                children.push(&mut **base);
                children.push(&mut **index);
            }
            Self::FunctionCall(call) => {
                let FunctionCall {
                    function,
                    arguments,
                } = &mut **call;
                match &mut function.node {
                    FunctionIdentifier::Expression(callee) => children.push(&mut **callee),
                    FunctionIdentifier::Method { object, .. } => children.push(&mut **object),
                    FunctionIdentifier::Constructor(_)
                    | FunctionIdentifier::Cast(_)
                    | FunctionIdentifier::Function(_) => {}
                }
                children.extend(arguments.iter_mut());
            }
            Self::FieldSelection { base, .. } => children.push(&mut **base),
            Self::Postfix { operand, .. } | Self::Unary { operand, .. } => {
                children.push(&mut **operand);
            }
            Self::Binary { left, right, .. } => {
                children.push(&mut **left);
                children.push(&mut **right);
            }
            Self::Conditional {
                condition,
                then_expression,
                else_expression,
            } => {
                children.push(&mut **condition);
                children.push(&mut **then_expression);
                children.push(&mut **else_expression);
            }
            Self::Assignment { target, value, .. } => {
                children.push(&mut **target);
                children.push(&mut **value);
            }
            Self::Sequence(items) => children.extend(items.iter_mut()),
        }
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

    fn take_children(&mut self, into: &mut Vec<Expression>) {
        for child in self.children_mut() {
            if !child.kind.is_leaf() {
                into.push(mem::replace(child, placeholder()));
            }
        }
    }
}

impl Drop for ExpressionKind {
    fn drop(&mut self) {
        if self.is_leaf() {
            return;
        }
        let mut pending = Vec::new();
        self.take_children(&mut pending);
        while let Some(mut expression) = pending.pop() {
            expression.kind.take_children(&mut pending);
        }
    }
}

enum CloneTask<'a> {
    Visit(&'a Expression),
    Build(&'a Expression),
}

fn fill(kind: &mut ExpressionKind, built: &mut Vec<Expression>) {
    let mut slots = kind.children_mut();
    let start = built.len().saturating_sub(slots.len());
    for (slot, child) in slots.iter_mut().zip(built.drain(start..)) {
        **slot = child;
    }
}

impl Clone for ExpressionKind {
    fn clone(&self) -> Self {
        let mut shell = self.shell();
        if self.is_leaf() {
            return shell;
        }
        let mut built: Vec<Expression> = Vec::new();
        let mut tasks: Vec<CloneTask<'_>> = self
            .children()
            .into_iter()
            .rev()
            .map(CloneTask::Visit)
            .collect();
        while let Some(task) = tasks.pop() {
            match task {
                CloneTask::Visit(expression) if expression.kind.is_leaf() => built.push(
                    Expression::new(expression.id, expression.span, expression.kind.shell()),
                ),
                CloneTask::Visit(expression) => {
                    tasks.push(CloneTask::Build(expression));
                    tasks.extend(
                        expression
                            .kind
                            .children()
                            .into_iter()
                            .rev()
                            .map(CloneTask::Visit),
                    );
                }
                CloneTask::Build(expression) => {
                    let mut kind = expression.kind.shell();
                    fill(&mut kind, &mut built);
                    built.push(Expression::new(expression.id, expression.span, kind));
                }
            }
        }
        fill(&mut shell, &mut built);
        shell
    }
}

impl PartialEq for ExpressionKind {
    fn eq(&self, other: &Self) -> bool {
        let mut pairs = Vec::from([(self, other)]);
        while let Some((left, right)) = pairs.pop() {
            if !left.same_shell(right) {
                return false;
            }
            let left_children = left.children();
            let right_children = right.children();
            if left_children.len() != right_children.len() {
                return false;
            }
            pairs.extend(
                left_children
                    .into_iter()
                    .zip(right_children)
                    .map(|(left, right)| (&left.kind, &right.kind)),
            );
        }
        true
    }
}

impl Eq for ExpressionKind {}
