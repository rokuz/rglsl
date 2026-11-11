use std::cell::{RefCell, RefMut};
use std::future::Future;

use rglsl_ast::ast::{
    Initializer, Node, Statement, StatementKind, TypeSpecifier, TypeSpecifierNonArray,
};
use rglsl_ast::Span;
use rglsl_types::stack::{Call, Stack};

pub struct Cx<'b, T> {
    state: &'b RefCell<T>,
    stack: Stack<'b>,
}

impl<T> Clone for Cx<'_, T> {
    fn clone(&self) -> Self {
        Self {
            state: self.state,
            stack: self.stack.clone(),
        }
    }
}

impl<'b, T> Cx<'b, T> {
    pub const fn new(state: &'b RefCell<T>, stack: Stack<'b>) -> Self {
        Self { state, stack }
    }

    pub fn call<R: 'b>(&self, frame: impl Future<Output = R> + 'b) -> Call<'b, R> {
        self.stack.call(frame)
    }

    pub fn state(&self) -> RefMut<'b, T> {
        self.state.borrow_mut()
    }
}

pub fn take_statement(slot: &mut Statement) -> Statement {
    core::mem::replace(
        slot,
        Node::new(slot.id, Span::new(0, 0), StatementKind::Expression(None)),
    )
}

pub const fn empty_type() -> TypeSpecifier {
    TypeSpecifier {
        non_array: TypeSpecifierNonArray::Void,
        parameters: None,
        array: None,
    }
}

pub fn take_type(slot: &mut TypeSpecifier) -> TypeSpecifier {
    core::mem::replace(slot, empty_type())
}

pub fn take_initializer(slot: &mut Initializer) -> Initializer {
    core::mem::replace(slot, Initializer::List(Vec::new()))
}

pub fn child_statements(kind: &StatementKind) -> Vec<&Statement> {
    match kind {
        StatementKind::Compound(compound) => compound.statements.iter().collect(),
        StatementKind::Switch { statements, .. } => statements.iter().collect(),
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            let mut children = vec![&**then_branch];
            children.extend(else_branch.as_deref());
            children
        }
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => vec![&**body],
        StatementKind::For(statement) => vec![&statement.init, &statement.body],
        StatementKind::Attributed { statement, .. } => vec![&**statement],
        StatementKind::Declaration(_)
        | StatementKind::Expression(_)
        | StatementKind::CaseLabel(_)
        | StatementKind::Jump(_) => Vec::new(),
    }
}

pub fn child_statements_mut(kind: &mut StatementKind) -> Vec<&mut Statement> {
    match kind {
        StatementKind::Compound(compound) => compound.statements.iter_mut().collect(),
        StatementKind::Switch { statements, .. } => statements.iter_mut().collect(),
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            let mut children = vec![&mut **then_branch];
            children.extend(else_branch.as_deref_mut());
            children
        }
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
            vec![&mut **body]
        }
        StatementKind::For(statement) => {
            let rglsl_ast::ast::ForStatement { init, body, .. } = &mut **statement;
            vec![init, body]
        }
        StatementKind::Attributed { statement, .. } => vec![&mut **statement],
        StatementKind::Declaration(_)
        | StatementKind::Expression(_)
        | StatementKind::CaseLabel(_)
        | StatementKind::Jump(_) => Vec::new(),
    }
}
