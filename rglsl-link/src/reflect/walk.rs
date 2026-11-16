use std::collections::BTreeMap;

use rglsl_ast::ast::{
    Condition, DeclarationKind, Expression, ExpressionKind, FunctionIdentifier, InitDeclaratorList,
    Initializer, JumpStatement, NodeId, Spanned, Statement, StatementKind,
};
use rglsl_sema::analyze::Callee;
use rglsl_sema::scope::{Origin, SymbolKind};
use rglsl_sema::types::TypeKind;
use rglsl_sema::{Analysis, FunctionId, SymbolId};
use rglsl_types::stack::recurse;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub enum Key {
    Node(NodeId),
    Instance(NodeId),
    Linker(usize),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Op {
    Direct(i64),
    Indirect,
    Field(String),
    Member(usize),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Operand {
    Deref(Key),
    Symbol(SymbolId, Key),
    Other,
}

#[derive(Debug, Clone)]
pub struct Deref {
    pub left: Operand,
    pub op: Op,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Event {
    Deref(Key),
    Symbol(SymbolId, Key),
    Call(FunctionId),
}

#[derive(Debug, Default)]
pub struct Walked {
    pub events: Vec<Event>,
    pub derefs: BTreeMap<Key, Deref>,
}

pub fn global_initializers(analysis: &Analysis, list: &InitDeclaratorList) -> Walked {
    let mut walker = Walker::new(analysis);
    for declarator in &list.declarators {
        if let Some(ref initializer) = declarator.kind.initializer {
            walker.initializer(initializer);
        }
    }
    walker.walked
}

pub fn function_body(analysis: &Analysis, statements: &[Statement]) -> Walked {
    let mut walker = Walker::new(analysis);
    for statement in statements {
        walker.statement(statement);
    }
    walker.walked
}

struct Walker<'a> {
    analysis: &'a Analysis,
    walked: Walked,
}

impl<'a> Walker<'a> {
    fn new(analysis: &'a Analysis) -> Self {
        Self {
            analysis,
            walked: Walked::default(),
        }
    }

    fn event(&mut self, event: Event) {
        self.walked.events.push(event);
    }

    fn deref(&mut self, key: Key, left: Operand, op: Op) {
        self.walked.derefs.insert(key, Deref { left, op });
        self.event(Event::Deref(key));
    }

    fn constant(&self, expression: &Expression) -> Option<i64> {
        let info = self.analysis.expression(expression.id)?;
        if info.is_specialization {
            return None;
        }
        let value = info.value.as_ref()?.values.first()?.as_i64()?;
        Some(i64::from(value as i32))
    }

    fn folded(&self, expression: &Expression) -> bool {
        self.analysis
            .expression(expression.id)
            .is_some_and(|info| info.value.is_some() && !info.is_specialization)
    }

    fn aggregate(&self, expression: &Expression) -> bool {
        self.analysis.type_of(expression.id).is_some_and(|ty| {
            matches!(
                ty.kind,
                TypeKind::Struct(_) | TypeKind::Block(_) | TypeKind::Reference(_)
            ) && !ty.is_array()
        })
    }

    fn operand(&self, expression: &Expression) -> Operand {
        let mut current = expression;
        while let ExpressionKind::Parenthesized(ref inner) = current.kind {
            current = inner;
        }
        match current.kind {
            ExpressionKind::Variable(_) => {
                let Some(&symbol) = self.analysis.references.get(&current.id) else {
                    return Operand::Other;
                };
                match self.analysis.symbol(symbol).map(|symbol| &symbol.kind) {
                    Some(SymbolKind::Variable(_)) => Operand::Symbol(symbol, Key::Node(current.id)),
                    Some(SymbolKind::BlockMember { .. }) => Operand::Deref(Key::Node(current.id)),
                    _ => Operand::Other,
                }
            }
            ExpressionKind::Subscript { .. } => Operand::Deref(Key::Node(current.id)),
            ExpressionKind::FieldSelection { ref base, .. } if self.aggregate(base) => {
                Operand::Deref(Key::Node(current.id))
            }
            _ => Operand::Other,
        }
    }
}

impl Walker<'_> {
    fn statement(&mut self, statement: &Statement) {
        recurse(|| match statement.kind {
            StatementKind::Compound(ref compound) => {
                for inner in &compound.statements {
                    self.statement(inner);
                }
            }
            StatementKind::Declaration(ref declaration) => {
                if let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind {
                    for declarator in &list.declarators {
                        if let Some(ref initializer) = declarator.kind.initializer {
                            self.initializer(initializer);
                        }
                    }
                }
            }
            StatementKind::Expression(Some(ref expression)) => {
                self.expression(expression);
            }
            StatementKind::Expression(None)
            | StatementKind::CaseLabel(_)
            | StatementKind::Jump(
                JumpStatement::Continue
                | JumpStatement::Break
                | JumpStatement::Return(None)
                | JumpStatement::Discard
                | JumpStatement::Demote
                | JumpStatement::TerminateInvocation
                | JumpStatement::TerminateRay
                | JumpStatement::IgnoreIntersection,
            ) => {}
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => {
                self.expression(condition);
                self.statement(then_branch);
                if let Some(else_branch) = else_branch {
                    self.statement(else_branch);
                }
            }
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => {
                self.expression(selector);
                for inner in statements {
                    self.statement(inner);
                }
            }
            StatementKind::While {
                ref condition,
                ref body,
            } => {
                self.condition(condition);
                self.statement(body);
            }
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => {
                self.expression(condition);
                self.statement(body);
            }
            StatementKind::For(ref inner) => {
                self.statement(&inner.init);
                if let Some(ref condition) = inner.condition {
                    self.condition(condition);
                }
                self.statement(&inner.body);
                if let Some(ref increment) = inner.increment {
                    self.expression(increment);
                }
            }
            StatementKind::Jump(JumpStatement::Return(Some(ref expression))) => {
                self.expression(expression);
            }
            StatementKind::Attributed { ref statement, .. } => {
                self.statement(statement);
            }
        });
    }

    fn condition(&mut self, condition: &Condition) {
        match *condition {
            Condition::Expression(ref expression) => {
                self.expression(expression);
            }
            Condition::Declaration(ref declaration) => {
                self.initializer(&declaration.kind.initializer);
            }
        }
    }

    fn initializer(&mut self, initializer: &Spanned<Initializer>) {
        recurse(|| match initializer.node {
            Initializer::Expression(ref expression) => {
                self.expression(expression);
            }
            Initializer::List(ref items) => {
                for item in items {
                    self.initializer(item);
                }
            }
        });
    }

    fn expression(&mut self, expression: &Expression) {
        recurse(|| {
            if self.folded(expression) {
                return;
            }
            let analysis = self.analysis;
            match expression.kind {
                ExpressionKind::Variable(_) => {
                    let Some(&symbol) = analysis.references.get(&expression.id) else {
                        return;
                    };
                    match analysis.symbol(symbol).map(|symbol| &symbol.kind) {
                        Some(SymbolKind::Variable(variable))
                            if matches!(variable.origin, Origin::Global | Origin::BuiltIn) =>
                        {
                            self.event(Event::Symbol(symbol, Key::Node(expression.id)));
                        }
                        Some(&SymbolKind::BlockMember { instance, index }) => {
                            let key = Key::Instance(expression.id);
                            self.deref(
                                Key::Node(expression.id),
                                Operand::Symbol(instance, key),
                                Op::Member(usize::try_from(index).unwrap_or(usize::MAX)),
                            );
                            self.event(Event::Symbol(instance, key));
                        }
                        _ => {}
                    }
                }
                ExpressionKind::Number(_) | ExpressionKind::Bool(_) | ExpressionKind::String(_) => {
                }
                ExpressionKind::Parenthesized(ref inner) => {
                    self.expression(inner);
                }
                ExpressionKind::Subscript {
                    ref base,
                    ref index,
                } => {
                    let op = self.constant(index).map_or(Op::Indirect, Op::Direct);
                    self.deref(Key::Node(expression.id), self.operand(base), op);
                    self.expression(base);
                    self.expression(index);
                }
                ExpressionKind::FieldSelection {
                    ref base,
                    ref field,
                } => {
                    if self.aggregate(base) {
                        self.deref(
                            Key::Node(expression.id),
                            self.operand(base),
                            Op::Field(field.node.clone()),
                        );
                    }
                    self.expression(base);
                }
                ExpressionKind::FunctionCall(ref call) => {
                    if let Some(&Callee::Function(function)) = analysis.calls.get(&expression.id) {
                        self.event(Event::Call(function));
                    }
                    if let FunctionIdentifier::Method { ref object, .. } = call.function.node {
                        self.expression(object);
                    }
                    for argument in &call.arguments {
                        self.expression(argument);
                    }
                }
                ExpressionKind::Postfix { ref operand, .. }
                | ExpressionKind::Unary { ref operand, .. } => {
                    self.expression(operand);
                }
                ExpressionKind::Binary {
                    ref left,
                    ref right,
                    ..
                } => {
                    self.expression(left);
                    self.expression(right);
                }
                ExpressionKind::Conditional {
                    ref condition,
                    ref then_expression,
                    ref else_expression,
                } => {
                    self.expression(condition);
                    self.expression(then_expression);
                    self.expression(else_expression);
                }
                ExpressionKind::Assignment {
                    ref target,
                    ref value,
                    ..
                } => {
                    self.expression(target);
                    self.expression(value);
                }
                ExpressionKind::Sequence(ref items) => {
                    for item in items {
                        self.expression(item);
                    }
                }
            }
        });
    }
}
