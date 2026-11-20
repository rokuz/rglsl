use rglsl::{
    Arena, Block, Constant, Expression, Handle, Literal, Module, SelectionControl, Span, Statement,
    SwitchCase, SwitchValue, Type, TypeInner, UniqueArena,
};
use rglsl_types::stack::recurse;

use crate::{Changed, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let module = session.module()?;
    Ok(if dead_branch(module) {
        Changed::Yes
    } else {
        Changed::No
    })
}

fn dead_branch(module: &mut Module) -> bool {
    let mut changed = false;
    let functions = module
        .functions
        .iter_mut()
        .map(|(_, function)| function)
        .chain(
            module
                .entry_points
                .iter_mut()
                .map(|entry| &mut entry.function),
        );
    for function in functions {
        let mut prune = Prune {
            expressions: &function.expressions,
            constants: &module.constants,
            global_expressions: &module.global_expressions,
            types: &module.types,
            changed: false,
        };
        prune.block(&mut function.body);
        changed |= prune.changed;
    }
    changed
}

struct Prune<'a> {
    expressions: &'a Arena<Expression>,
    constants: &'a Arena<Constant>,
    global_expressions: &'a Arena<Expression>,
    types: &'a UniqueArena<Type>,
    changed: bool,
}

#[derive(Debug, Clone, Copy, Default)]
struct Exits {
    breaks: usize,
    continues: bool,
    ends: bool,
}

impl Exits {
    fn of(list: &[Self]) -> Self {
        Self {
            breaks: list.iter().map(|exits| exits.breaks).sum(),
            continues: list.iter().any(|exits| exits.continues),
            ends: list.last().is_some_and(|exits| exits.ends),
        }
    }

    const fn leaves(self) -> bool {
        self.breaks > 0 || self.continues
    }
}

struct Pruned {
    block: Block,
    exits: Vec<Exits>,
}

impl Pruned {
    fn push(&mut self, statement: Statement, span: Span, exits: Exits) {
        self.block.push(statement, span);
        self.exits.push(exits);
    }

    fn splice(&mut self, mut block: Block, mut exits: Vec<Exits>) {
        self.block.append(&mut block);
        self.exits.append(&mut exits);
    }
}

impl Prune<'_> {
    fn literal(&self, handle: Handle<Expression>) -> Option<Literal> {
        let mut arena = self.expressions;
        let mut current = handle;
        loop {
            match *arena.try_get(current).ok()? {
                Expression::Literal(literal) => return Some(literal),
                Expression::ZeroValue(ty) => match self.types.get_handle(ty).ok()?.inner {
                    TypeInner::Scalar(scalar) => return Literal::zero(scalar),
                    _ => return None,
                },
                Expression::Constant(constant) => {
                    current = self.constants.try_get(constant).ok()?.init;
                    arena = self.global_expressions;
                }
                _ => return None,
            }
        }
    }

    fn boolean(&self, handle: Handle<Expression>) -> Option<bool> {
        match self.literal(handle)? {
            Literal::Bool(value) => Some(value),
            _ => None,
        }
    }

    fn block(&mut self, block: &mut Block) -> Vec<Exits> {
        let old = core::mem::take(block);
        let mut out = Pruned {
            block: Block::with_capacity(old.len()),
            exits: Vec::with_capacity(old.len()),
        };
        let mut statements = old.span_into_iter().peekable();
        while let Some((statement, span)) = statements.next() {
            self.statement(statement, span, &mut out);
            if out.exits.last().is_some_and(|exits| exits.ends) {
                if statements.peek().is_some() {
                    self.changed = true;
                }
                break;
            }
        }
        *block = out.block;
        out.exits
    }

    fn statement(&mut self, statement: Statement, span: Span, out: &mut Pruned) {
        match statement {
            Statement::If {
                condition,
                mut accept,
                mut reject,
                control,
            } => {
                if let Some(value) = self.boolean(condition) {
                    self.changed = true;
                    let mut taken = if value { accept } else { reject };
                    let exits = recurse(|| self.block(&mut taken));
                    out.splice(taken, exits);
                    return;
                }
                let accepted = Exits::of(&recurse(|| self.block(&mut accept)));
                let rejected = Exits::of(&recurse(|| self.block(&mut reject)));
                if accept.is_empty() && reject.is_empty() {
                    self.changed = true;
                    return;
                }
                let exits = Exits {
                    breaks: accepted.breaks + rejected.breaks,
                    continues: accepted.continues || rejected.continues,
                    ends: false,
                };
                out.push(
                    Statement::If {
                        condition,
                        accept,
                        reject,
                        control,
                    },
                    span,
                    exits,
                );
            }
            Statement::Switch {
                selector,
                mut cases,
                control,
            } => {
                if let Some(value) = self.literal(selector) {
                    self.constant_switch(selector, value, cases, control, span, out);
                    return;
                }
                let mut continues = false;
                for case in &mut cases {
                    continues |= Exits::of(&recurse(|| self.block(&mut case.body))).continues;
                }
                out.push(
                    Statement::Switch {
                        selector,
                        cases,
                        control,
                    },
                    span,
                    Exits {
                        continues,
                        ..Exits::default()
                    },
                );
            }
            Statement::Loop {
                mut body,
                mut continuing,
                mut break_if,
                control,
            } => {
                let mut body_exits = recurse(|| self.block(&mut body));
                let summary = Exits::of(&body_exits);
                if summary.ends && !summary.continues {
                    if summary.breaks == 0 {
                        self.changed = true;
                        out.splice(body, body_exits);
                        return;
                    }
                    if summary.breaks == 1
                        && let Some((at, condition, exit_on)) = header_check(&body)
                    {
                        self.changed = true;
                        let mut rest = Block::with_capacity(body.len().saturating_sub(at + 1));
                        for (index, (statement, span)) in body.span_into_iter().enumerate() {
                            if index < at {
                                out.push(statement, span, Exits::default());
                            } else if index > at {
                                rest.push(statement, span);
                            }
                        }
                        let (accept, reject) = if exit_on {
                            (Block::new(), rest)
                        } else {
                            (rest, Block::new())
                        };
                        out.push(
                            Statement::If {
                                condition,
                                accept,
                                reject,
                                control: SelectionControl::None,
                            },
                            span,
                            Exits::default(),
                        );
                        return;
                    }
                }
                let continuing_exits = recurse(|| self.block(&mut continuing));
                if let Some(condition) = break_if
                    && let Some(value) = self.boolean(condition)
                {
                    let summary = Exits::of(&body_exits);
                    if !value {
                        break_if = None;
                        self.changed = true;
                    } else if !summary.leaves() && !summary.ends {
                        self.changed = true;
                        out.splice(body, body_exits);
                        out.splice(continuing, continuing_exits);
                        return;
                    }
                }
                if let Some(exit) = body
                    .iter()
                    .position(|statement| matches!(*statement, Statement::Break))
                    && !Exits::of(body_exits.get(..exit).unwrap_or_default()).leaves()
                {
                    self.changed = true;
                    body.cull(exit..);
                    body_exits.truncate(exit);
                    out.splice(body, body_exits);
                    return;
                }
                out.push(
                    Statement::Loop {
                        body,
                        continuing,
                        break_if,
                        control,
                    },
                    span,
                    Exits::default(),
                );
            }
            Statement::Block(mut inner) => {
                let exits = Exits::of(&recurse(|| self.block(&mut inner)));
                if !inner.is_empty() {
                    out.push(Statement::Block(inner), span, exits);
                }
            }
            other => {
                let exits = match other {
                    Statement::Break => Exits {
                        breaks: 1,
                        continues: false,
                        ends: true,
                    },
                    Statement::Continue => Exits {
                        breaks: 0,
                        continues: true,
                        ends: true,
                    },
                    ref statement => Exits {
                        ends: statement.is_terminator(),
                        ..Exits::default()
                    },
                };
                out.push(other, span, exits);
            }
        }
    }

    fn constant_switch(
        &mut self,
        selector: Handle<Expression>,
        value: Literal,
        mut cases: Vec<SwitchCase>,
        control: SelectionControl,
        span: Span,
        out: &mut Pruned,
    ) {
        let matches = |case: &SwitchCase| match (case.value, value) {
            (SwitchValue::I32(case), Literal::I32(value)) => case == value,
            (SwitchValue::U32(case), Literal::U32(value)) => case == value,
            _ => false,
        };
        let start = cases.iter().position(matches).or_else(|| {
            cases
                .iter()
                .position(|case| case.value == SwitchValue::Default)
        });
        let Some(start) = start else {
            self.changed = true;
            return;
        };
        let mut body = Block::new();
        for case in cases.iter_mut().skip(start) {
            let fall_through = case.fall_through;
            body.append(&mut case.body);
            if !fall_through {
                break;
            }
        }
        let mut exits = recurse(|| self.block(&mut body));
        if matches!(body.last(), Some(Statement::Break)) {
            let last = body.len().saturating_sub(1);
            body.cull(last..);
            exits.truncate(last);
        }
        let summary = Exits::of(&exits);
        if summary.breaks > 0 {
            let single = cases.len() == 1;
            out.push(
                Statement::Switch {
                    selector,
                    cases: vec![SwitchCase {
                        value: SwitchValue::Default,
                        body,
                        fall_through: false,
                    }],
                    control,
                },
                span,
                Exits {
                    continues: summary.continues,
                    ..Exits::default()
                },
            );
            self.changed |= !single;
            return;
        }
        self.changed = true;
        out.splice(body, exits);
    }
}

fn header_check(body: &Block) -> Option<(usize, Handle<Expression>, bool)> {
    let at = body
        .iter()
        .position(|statement| !matches!(*statement, Statement::Emit(_)))?;
    let Some(&Statement::If {
        condition,
        ref accept,
        ref reject,
        ..
    }) = body.get(at)
    else {
        return None;
    };
    let only_break =
        |block: &Block| block.len() == 1 && matches!(block.first(), Some(Statement::Break));
    if accept.is_empty() && only_break(reject) {
        Some((at, condition, false))
    } else if reject.is_empty() && only_break(accept) {
        Some((at, condition, true))
    } else {
        None
    }
}
