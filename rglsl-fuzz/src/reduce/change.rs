use std::collections::BTreeMap;

use rglsl_ast::ast::{
    Expression, ExternalDeclaration, Node, NodeId, Statement, StatementKind, TranslationUnit,
};
use rglsl_ast::Span;

use crate::reduce::finders::is_splice;
use crate::rewrite::{rewrite_expressions, rewrite_statements};

const REMOVED: NodeId = NodeId::new(u32::MAX);

#[derive(Debug, Clone)]
pub enum Change {
    Statement(NodeId, Option<Statement>),
    Expression(NodeId, Expression),
    External(usize, Option<Box<ExternalDeclaration>>),
}

#[derive(Debug, Clone)]
pub struct Opportunity {
    pub changes: Vec<Change>,
}

impl Opportunity {
    pub fn single(change: Change) -> Self {
        Self {
            changes: vec![change],
        }
    }
}

fn is_removed(statement: &Statement) -> bool {
    statement.id == REMOVED && matches!(statement.kind, StatementKind::Expression(None))
}

fn tidy(statements: &mut Vec<Statement>) {
    let old = core::mem::take(statements);
    for mut statement in old {
        if is_removed(&statement) {
            continue;
        }
        if is_splice(&statement) {
            if let StatementKind::Compound(compound) = &mut statement.kind {
                statements.append(&mut compound.statements);
            }
            continue;
        }
        statements.push(statement);
    }
}

pub fn apply(unit: &TranslationUnit, opportunities: &[Opportunity]) -> TranslationUnit {
    let mut expressions = BTreeMap::new();
    let mut statements = BTreeMap::new();
    let mut externals = BTreeMap::new();
    for opportunity in opportunities {
        for change in &opportunity.changes {
            match change {
                Change::Statement(id, replacement) => {
                    statements.entry(*id).or_insert_with(|| replacement.clone());
                }
                Change::Expression(id, replacement) => {
                    expressions
                        .entry(*id)
                        .or_insert_with(|| replacement.clone());
                }
                Change::External(index, replacement) => {
                    externals
                        .entry(*index)
                        .or_insert_with(|| replacement.clone());
                }
            }
        }
    }
    let mut result = unit.clone();
    if !expressions.is_empty() {
        rewrite_expressions(&mut result, &mut |expression| {
            if let Some(replacement) = expressions.remove(&expression.id) {
                *expression = replacement;
            }
        });
    }
    if !statements.is_empty() {
        rewrite_statements(&mut result, &mut |statement| {
            if let Some(replacement) = statements.remove(&statement.id) {
                *statement = replacement.unwrap_or_else(|| {
                    Node::new(REMOVED, Span::new(0, 0), StatementKind::Expression(None))
                });
            }
        });
        rewrite_statements(&mut result, &mut |statement| match &mut statement.kind {
            StatementKind::Compound(compound) => tidy(&mut compound.statements),
            StatementKind::Switch { statements, .. } => tidy(statements),
            _ => {}
        });
        for external in &mut result.external_declarations {
            if let ExternalDeclaration::FunctionDefinition(definition) = external {
                tidy(&mut definition.body.statements);
            }
        }
    }
    if !externals.is_empty() {
        let declarations = core::mem::take(&mut result.external_declarations);
        for (index, external) in declarations.into_iter().enumerate() {
            match externals.remove(&index) {
                Some(Some(replacement)) => result.external_declarations.push(*replacement),
                Some(None) => {}
                None => result.external_declarations.push(external),
            }
        }
    }
    result
}
