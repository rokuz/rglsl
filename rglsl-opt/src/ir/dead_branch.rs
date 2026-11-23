use rglsl::{
    Arena, Block, Expression, Handle, Literal, LoopControl, Module, SelectionControl, Span,
    Statement, SwitchCase, SwitchValue,
};
use rglsl_types::stack::recurse;

use crate::analysis::Constants;

use crate::{Changed, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    session.rewrite(|module| Ok(dead_branch(module)))
}

fn dead_branch(module: &mut Module) -> bool {
    let mut changed = false;
    let constants = Constants {
        types: &module.types,
        constants: &module.constants,
        global_expressions: &module.global_expressions,
    };
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
            constants,
            changed: false,
        };
        prune.block(&mut function.body);
        changed |= prune.changed;
    }
    changed
}

struct Prune<'a> {
    expressions: &'a Arena<Expression>,
    constants: Constants<'a>,
    changed: bool,
}

#[derive(Debug, Clone, Copy, Default)]
struct Exits {
    breaks: usize,
    continues: bool,
    ends: bool,
}

impl Exits {
    const fn leaves(self) -> bool {
        self.breaks > 0 || self.continues
    }
}

struct Pruned {
    block: Block,
    ends: Vec<bool>,
    breaks: Vec<usize>,
    continues: Vec<usize>,
    break_statements: Vec<usize>,
}

impl Pruned {
    fn with_capacity(capacity: usize) -> Self {
        Self {
            block: Block::with_capacity(capacity),
            ends: Vec::with_capacity(capacity),
            breaks: Vec::with_capacity(capacity),
            continues: Vec::with_capacity(capacity),
            break_statements: Vec::new(),
        }
    }

    const fn len(&self) -> usize {
        self.block.len()
    }

    fn before(counts: &[usize], at: usize) -> usize {
        at.checked_sub(1)
            .and_then(|index| counts.get(index))
            .copied()
            .unwrap_or(0)
    }

    fn push(&mut self, statement: Statement, span: Span, exits: Exits) {
        let at = self.len();
        if matches!(statement, Statement::Break) {
            self.break_statements.push(at);
        }
        let breaks = Self::before(&self.breaks, at) + exits.breaks;
        let continues = Self::before(&self.continues, at) + usize::from(exits.continues);
        self.block.push(statement, span);
        self.ends.push(exits.ends);
        self.breaks.push(breaks);
        self.continues.push(continues);
    }

    fn ends_after(&self, start: usize) -> bool {
        self.len() > start && self.ends.last().copied().unwrap_or(false)
    }

    fn between(&self, start: usize, end: usize) -> Exits {
        Exits {
            breaks: Self::before(&self.breaks, end)
                .saturating_sub(Self::before(&self.breaks, start)),
            continues: Self::before(&self.continues, end) > Self::before(&self.continues, start),
            ends: end > start
                && end
                    .checked_sub(1)
                    .and_then(|last| self.ends.get(last))
                    .copied()
                    .unwrap_or(false),
        }
    }

    fn summary(&self, start: usize) -> Exits {
        self.between(start, self.len())
    }

    fn first_break(&self, start: usize) -> Option<usize> {
        let index = self.break_statements.partition_point(|&at| at < start);
        self.break_statements.get(index).copied()
    }

    fn truncate(&mut self, at: usize) {
        self.block.cull(at..);
        self.ends.truncate(at);
        self.breaks.truncate(at);
        self.continues.truncate(at);
        let kept = self.break_statements.partition_point(|&index| index < at);
        self.break_statements.truncate(kept);
    }

    fn split_off(&mut self, at: usize) -> Block {
        let block = self.block.split_off(at);
        self.truncate(at);
        block
    }

    fn append(&mut self, other: Self) {
        let exits: Vec<Exits> = (0..other.len())
            .map(|index| other.between(index, index + 1))
            .collect();
        for ((statement, span), exits) in other.block.span_into_iter().zip(exits) {
            self.push(statement, span, exits);
        }
    }
}

impl Prune<'_> {
    fn literal(&self, handle: Handle<Expression>) -> Option<Literal> {
        self.constants.literal(self.expressions, handle)
    }

    fn boolean(&self, handle: Handle<Expression>) -> Option<bool> {
        match self.literal(handle)? {
            Literal::Bool(value) => Some(value),
            _ => None,
        }
    }

    fn block(&mut self, block: &mut Block) -> Exits {
        let pruned = self.pruned(core::mem::take(block));
        let exits = pruned.summary(0);
        *block = pruned.block;
        exits
    }

    fn pruned(&mut self, block: Block) -> Pruned {
        let mut out = Pruned::with_capacity(block.len());
        self.prune_into(block, &mut out);
        out
    }

    fn prune_into(&mut self, block: Block, out: &mut Pruned) {
        let start = out.len();
        let mut statements = block.span_into_iter().peekable();
        while let Some((statement, span)) = statements.next() {
            self.statement(statement, span, out);
            if out.ends_after(start) {
                if statements.peek().is_some() {
                    self.changed = true;
                }
                break;
            }
        }
    }

    fn prune_if(
        &mut self,
        condition: Handle<Expression>,
        [mut accept, mut reject]: [Block; 2],
        control: SelectionControl,
        span: Span,
        out: &mut Pruned,
    ) {
        if let Some(value) = self.boolean(condition) {
            self.changed = true;
            let taken = if value { accept } else { reject };
            recurse(|| self.prune_into(taken, out));
            return;
        }
        let accepted = recurse(|| self.block(&mut accept));
        let rejected = recurse(|| self.block(&mut reject));
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

    fn prune_loop(
        &mut self,
        [body, continuing]: [Block; 2],
        mut break_if: Option<Handle<Expression>>,
        control: LoopControl,
        span: Span,
        out: &mut Pruned,
    ) {
        let start = out.len();
        recurse(|| self.prune_into(body, out));
        let summary = out.summary(start);
        if summary.ends && !summary.continues {
            if summary.breaks == 0 {
                self.changed = true;
                return;
            }
            if summary.breaks == 1
                && let Some((at, condition, exit_on)) =
                    out.block.get(start..).and_then(header_check)
            {
                self.changed = true;
                let rest = out.split_off(start + at + 1);
                out.truncate(start + at);
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
        let continuing = recurse(|| self.pruned(continuing));
        if let Some(condition) = break_if
            && let Some(value) = self.boolean(condition)
        {
            if !value {
                break_if = None;
                self.changed = true;
            } else if !summary.leaves() && !summary.ends {
                self.changed = true;
                out.append(continuing);
                return;
            }
        }
        if let Some(exit) = out.first_break(start)
            && !out.between(start, exit).leaves()
        {
            self.changed = true;
            out.truncate(exit);
            return;
        }
        let body = out.split_off(start);
        out.push(
            Statement::Loop {
                body,
                continuing: continuing.block,
                break_if,
                control,
            },
            span,
            Exits::default(),
        );
    }

    fn statement(&mut self, statement: Statement, span: Span, out: &mut Pruned) {
        match statement {
            Statement::If {
                condition,
                accept,
                reject,
                control,
            } => self.prune_if(condition, [accept, reject], control, span, out),
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
                    continues |= recurse(|| self.block(&mut case.body)).continues;
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
                body,
                continuing,
                break_if,
                control,
            } => self.prune_loop([body, continuing], break_if, control, span, out),
            Statement::Block(mut inner) => {
                let exits = recurse(|| self.block(&mut inner));
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
        let first = out.len();
        recurse(|| self.prune_into(body, out));
        if out.len() > first && out.first_break(out.len() - 1).is_some() {
            out.truncate(out.len() - 1);
        }
        let summary = out.summary(first);
        if summary.breaks > 0 {
            let single = cases.len() == 1;
            let body = out.split_off(first);
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
    }
}

fn header_check(body: &[Statement]) -> Option<(usize, Handle<Expression>, bool)> {
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
