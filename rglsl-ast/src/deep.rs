use core::fmt;
use core::mem;

use rglsl_types::stack::recurse;

use crate::ast::{
    CompoundStatement, ExpressionKind, Initializer, Node, NodeId, Statement, StatementKind,
    TypeSpecifier, TypeSpecifierNonArray,
};
use crate::chain::placeholder;
use crate::span::Span;

impl<K: Clone> Clone for Node<K> {
    fn clone(&self) -> Self {
        recurse(|| Self::new(self.id, self.span, self.kind.clone()))
    }
}

impl<K: PartialEq> PartialEq for Node<K> {
    fn eq(&self, other: &Self) -> bool {
        recurse(|| self.kind == other.kind)
    }
}

impl<K: fmt::Debug> fmt::Debug for Node<K> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        recurse(|| {
            formatter
                .debug_struct("Node")
                .field("id", &self.id)
                .field("span", &self.span)
                .field("kind", &self.kind)
                .finish()
        })
    }
}

impl Clone for TypeSpecifier {
    fn clone(&self) -> Self {
        recurse(|| Self {
            non_array: self.non_array.clone(),
            parameters: self.parameters.clone(),
            array: self.array.clone(),
        })
    }
}

impl PartialEq for TypeSpecifier {
    fn eq(&self, other: &Self) -> bool {
        recurse(|| {
            self.non_array == other.non_array
                && self.parameters == other.parameters
                && self.array == other.array
        })
    }
}

impl Eq for TypeSpecifier {}

impl fmt::Debug for TypeSpecifier {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        recurse(|| {
            formatter
                .debug_struct("TypeSpecifier")
                .field("non_array", &self.non_array)
                .field("parameters", &self.parameters)
                .field("array", &self.array)
                .finish()
        })
    }
}

impl Clone for Initializer {
    fn clone(&self) -> Self {
        match self {
            Self::Expression(expression) => Self::Expression(expression.clone()),
            Self::List(items) => recurse(|| Self::List(items.clone())),
        }
    }
}

impl PartialEq for Initializer {
    fn eq(&self, other: &Self) -> bool {
        match (self, other) {
            (Self::Expression(left), Self::Expression(right)) => left == right,
            (Self::List(left), Self::List(right)) => recurse(|| left == right),
            _ => false,
        }
    }
}

impl Eq for Initializer {}

impl fmt::Debug for Initializer {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match self {
            Self::Expression(expression) => formatter
                .debug_tuple("Expression")
                .field(expression)
                .finish(),
            Self::List(items) => recurse(|| formatter.debug_tuple("List").field(items).finish()),
        }
    }
}

impl Drop for ExpressionKind {
    fn drop(&mut self) {
        if self.is_leaf() {
            return;
        }
        recurse(|| {
            self.for_each_child_mut(|child| drop(mem::replace(child, placeholder())));
        });
    }
}

fn take_statement(statement: &mut Statement) -> Statement {
    mem::replace(
        statement,
        Statement::new(
            NodeId::FIRST,
            Span::default(),
            StatementKind::Expression(None),
        ),
    )
}

impl Drop for StatementKind {
    fn drop(&mut self) {
        recurse(|| match self {
            Self::Compound(CompoundStatement { statements }) | Self::Switch { statements, .. } => {
                drop(mem::take(statements));
            }
            Self::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                drop(take_statement(then_branch));
                drop(else_branch.take());
            }
            Self::While { body, .. }
            | Self::DoWhile { body, .. }
            | Self::Attributed {
                statement: body, ..
            } => drop(take_statement(body)),
            Self::For(statement) => {
                drop(take_statement(&mut statement.init));
                drop(take_statement(&mut statement.body));
            }
            _ => {}
        });
    }
}

impl Drop for TypeSpecifier {
    fn drop(&mut self) {
        if self.parameters.is_none()
            && !matches!(
                self.non_array,
                TypeSpecifierNonArray::Struct(_)
                    | TypeSpecifierNonArray::InlineBlock(_)
                    | TypeSpecifierNonArray::Spirv(_)
            )
        {
            return;
        }
        recurse(|| {
            drop(mem::replace(
                &mut self.non_array,
                TypeSpecifierNonArray::Void,
            ));
            drop(self.parameters.take());
        });
    }
}

impl Drop for Initializer {
    fn drop(&mut self) {
        if let Self::List(items) = self
            && !items.is_empty()
        {
            recurse(|| drop(mem::take(items)));
        }
    }
}
