use std::cell::RefCell;
use std::collections::BTreeMap;
use std::future::Future;

use rglsl_ast::ast::{
    Condition, DeclarationKind, Expression, ExpressionKind, FunctionIdentifier, InitDeclaratorList,
    Initializer, JumpStatement, NodeId, Spanned, Statement, StatementKind,
};
use rglsl_sema::analyze::Callee;
use rglsl_sema::scope::{Origin, SymbolKind};
use rglsl_sema::types::TypeKind;
use rglsl_sema::{Analysis, FunctionId, SymbolId};
use rglsl_types::stack::{run, Call, Stack};

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
    let walker = Walker {
        analysis,
        walked: RefCell::new(Walked::default()),
    };
    let finished = run(|stack| {
        let cx = Cx {
            walker: &walker,
            stack,
        };
        async move {
            for declarator in &list.declarators {
                if let Some(ref initializer) = declarator.initializer {
                    cx.call(cx.clone().initializer(initializer)).await;
                }
            }
        }
    });
    if finished.is_none() {
        return Walked::default();
    }
    walker.walked.into_inner()
}

pub fn function_body(analysis: &Analysis, statements: &[Statement]) -> Walked {
    let walker = Walker {
        analysis,
        walked: RefCell::new(Walked::default()),
    };
    let finished = run(|stack| {
        let cx = Cx {
            walker: &walker,
            stack,
        };
        async move {
            for statement in statements {
                cx.call(cx.clone().statement(statement)).await;
            }
        }
    });
    if finished.is_none() {
        return Walked::default();
    }
    walker.walked.into_inner()
}

struct Walker<'a> {
    analysis: &'a Analysis,
    walked: RefCell<Walked>,
}

impl Walker<'_> {
    fn event(&self, event: Event) {
        self.walked.borrow_mut().events.push(event);
    }

    fn deref(&self, key: Key, left: Operand, op: Op) {
        self.walked
            .borrow_mut()
            .derefs
            .insert(key, Deref { left, op });
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

#[derive(Clone)]
struct Cx<'b, 'a> {
    walker: &'b Walker<'a>,
    stack: Stack<'b>,
}

impl<'b> Cx<'b, '_> {
    fn call<T: 'b>(&self, frame: impl Future<Output = T> + 'b) -> Call<'b, T> {
        self.stack.call(frame)
    }
}

impl<'b, 'a: 'b> Cx<'b, 'a> {
    async fn statement(self, statement: &'a Statement) {
        match statement.kind {
            StatementKind::Compound(ref compound) => {
                for inner in &compound.statements {
                    self.call(self.clone().statement(inner)).await;
                }
            }
            StatementKind::Declaration(ref declaration) => {
                if let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind {
                    for declarator in &list.declarators {
                        if let Some(ref initializer) = declarator.initializer {
                            self.call(self.clone().initializer(initializer)).await;
                        }
                    }
                }
            }
            StatementKind::Expression(Some(ref expression)) => {
                self.call(self.clone().expression(expression)).await;
            }
            StatementKind::Expression(None)
            | StatementKind::CaseLabel(_)
            | StatementKind::Jump(
                JumpStatement::Continue
                | JumpStatement::Break
                | JumpStatement::Return(None)
                | JumpStatement::Discard
                | JumpStatement::Demote
                | JumpStatement::TerminateRay
                | JumpStatement::IgnoreIntersection,
            ) => {}
            StatementKind::Selection {
                ref condition,
                ref then_branch,
                ref else_branch,
            } => {
                self.call(self.clone().expression(condition)).await;
                self.call(self.clone().statement(then_branch)).await;
                if let Some(else_branch) = else_branch {
                    self.call(self.clone().statement(else_branch)).await;
                }
            }
            StatementKind::Switch {
                ref selector,
                ref statements,
            } => {
                self.call(self.clone().expression(selector)).await;
                for inner in statements {
                    self.call(self.clone().statement(inner)).await;
                }
            }
            StatementKind::While {
                ref condition,
                ref body,
            } => {
                self.call(self.clone().condition(condition)).await;
                self.call(self.clone().statement(body)).await;
            }
            StatementKind::DoWhile {
                ref body,
                ref condition,
            } => {
                self.call(self.clone().expression(condition)).await;
                self.call(self.clone().statement(body)).await;
            }
            StatementKind::For(ref inner) => {
                self.call(self.clone().statement(&inner.init)).await;
                if let Some(ref condition) = inner.condition {
                    self.call(self.clone().condition(condition)).await;
                }
                self.call(self.clone().statement(&inner.body)).await;
                if let Some(ref increment) = inner.increment {
                    self.call(self.clone().expression(increment)).await;
                }
            }
            StatementKind::Jump(JumpStatement::Return(Some(ref expression))) => {
                self.call(self.clone().expression(expression)).await;
            }
            StatementKind::Attributed { ref statement, .. } => {
                self.call(self.clone().statement(statement)).await;
            }
        }
    }

    async fn condition(self, condition: &'a Condition) {
        match *condition {
            Condition::Expression(ref expression) => {
                self.call(self.clone().expression(expression)).await;
            }
            Condition::Declaration(ref declaration) => {
                self.call(self.clone().initializer(&declaration.initializer))
                    .await;
            }
        }
    }

    async fn initializer(self, initializer: &'a Spanned<Initializer>) {
        match initializer.node {
            Initializer::Expression(ref expression) => {
                self.call(self.clone().expression(expression)).await;
            }
            Initializer::List(ref items) => {
                for item in items {
                    self.call(self.clone().initializer(item)).await;
                }
            }
        }
    }

    async fn expression(self, expression: &'a Expression) {
        let walker = self.walker;
        if walker.folded(expression) {
            return;
        }
        let analysis = walker.analysis;
        match expression.kind {
            ExpressionKind::Variable(_) => {
                let Some(&symbol) = analysis.references.get(&expression.id) else {
                    return;
                };
                match analysis.symbol(symbol).map(|symbol| &symbol.kind) {
                    Some(SymbolKind::Variable(variable))
                        if matches!(variable.origin, Origin::Global | Origin::BuiltIn) =>
                    {
                        walker.event(Event::Symbol(symbol, Key::Node(expression.id)));
                    }
                    Some(&SymbolKind::BlockMember { instance, index }) => {
                        let key = Key::Instance(expression.id);
                        walker.deref(
                            Key::Node(expression.id),
                            Operand::Symbol(instance, key),
                            Op::Member(usize::try_from(index).unwrap_or(usize::MAX)),
                        );
                        walker.event(Event::Symbol(instance, key));
                    }
                    _ => {}
                }
            }
            ExpressionKind::Number(_) | ExpressionKind::Bool(_) | ExpressionKind::String(_) => {}
            ExpressionKind::Parenthesized(ref inner) => {
                self.call(self.clone().expression(inner)).await;
            }
            ExpressionKind::Subscript {
                ref base,
                ref index,
            } => {
                let op = walker.constant(index).map_or(Op::Indirect, Op::Direct);
                walker.deref(Key::Node(expression.id), walker.operand(base), op);
                self.call(self.clone().expression(base)).await;
                self.call(self.clone().expression(index)).await;
            }
            ExpressionKind::FieldSelection {
                ref base,
                ref field,
            } => {
                if walker.aggregate(base) {
                    walker.deref(
                        Key::Node(expression.id),
                        walker.operand(base),
                        Op::Field(field.node.clone()),
                    );
                }
                self.call(self.clone().expression(base)).await;
            }
            ExpressionKind::FunctionCall(ref call) => {
                if let Some(&Callee::Function(function)) = analysis.calls.get(&expression.id) {
                    walker.event(Event::Call(function));
                }
                if let FunctionIdentifier::Method { ref object, .. } = call.function.node {
                    self.call(self.clone().expression(object)).await;
                }
                for argument in &call.arguments {
                    self.call(self.clone().expression(argument)).await;
                }
            }
            ExpressionKind::Postfix { ref operand, .. }
            | ExpressionKind::Unary { ref operand, .. } => {
                self.call(self.clone().expression(operand)).await;
            }
            ExpressionKind::Binary {
                ref left,
                ref right,
                ..
            } => {
                self.call(self.clone().expression(left)).await;
                self.call(self.clone().expression(right)).await;
            }
            ExpressionKind::Conditional {
                ref condition,
                ref then_expression,
                ref else_expression,
            } => {
                self.call(self.clone().expression(condition)).await;
                self.call(self.clone().expression(then_expression)).await;
                self.call(self.clone().expression(else_expression)).await;
            }
            ExpressionKind::Assignment {
                ref target,
                ref value,
                ..
            } => {
                self.call(self.clone().expression(target)).await;
                self.call(self.clone().expression(value)).await;
            }
            ExpressionKind::Sequence(ref items) => {
                for item in items {
                    self.call(self.clone().expression(item)).await;
                }
            }
        }
    }
}
