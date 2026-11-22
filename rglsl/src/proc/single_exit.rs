use alloc::vec::Vec;

use rglsl_types::stack::recurse;

use crate::arena::{Arena, Handle};
use crate::proc::Reachability;
use crate::{Block, Expression, Literal, LocalVariable, Span, Statement, Type};

#[derive(Debug, Clone, Copy)]
pub struct ExitTypes {
    pub boolean: Handle<Type>,
    pub result: Option<Handle<Type>>,
}

struct Plan<'r> {
    reachability: &'r Reachability,
    exits: Vec<bool>,
    returns: bool,
}

impl Plan<'_> {
    fn block(&mut self, block: &Block, active: bool) {
        for statement in block {
            match *statement {
                Statement::Return { .. } => self.returns |= active,
                Statement::Block(ref inner) => recurse(|| self.block(inner, active)),
                Statement::If {
                    ref accept,
                    ref reject,
                    ..
                } => recurse(|| {
                    self.block(accept, active);
                    self.block(reject, active);
                }),
                Statement::Switch { ref cases, .. } => {
                    for case in cases {
                        recurse(|| self.block(&case.body, active));
                    }
                }
                Statement::Loop {
                    ref body,
                    ref continuing,
                    ..
                } => {
                    let exits = self.reachability.completes(statement);
                    self.exits.push(exits);
                    recurse(|| {
                        self.block(body, exits);
                        self.block(continuing, exits);
                    });
                }
                _ => {}
            }
        }
    }
}

pub fn returns_inside_exiting_loops(body: &Block) -> bool {
    let reachability = Reachability::new(body);
    let mut plan = Plan {
        reachability: &reachability,
        exits: Vec::new(),
        returns: false,
    };
    plan.block(body, false);
    plan.returns
}

pub fn leave_loops_before_returning(
    body: &mut Block,
    locals: &mut Arena<LocalVariable>,
    expressions: &mut Arena<Expression>,
    types: &ExitTypes,
) {
    let reachability = Reachability::new(body);
    let mut plan = Plan {
        reachability: &reachability,
        exits: Vec::new(),
        returns: false,
    };
    plan.block(body, false);
    if !plan.returns {
        return;
    }
    let no = expressions.append(Expression::Literal(Literal::Bool(false)), Span::UNDEFINED);
    let flag_local = locals.append(
        LocalVariable {
            name: None,
            ty: types.boolean,
            init: Some(no),
            relaxed_precision: false,
            ssa: false,
        },
        Span::UNDEFINED,
    );
    let flag = expressions.append(Expression::LocalVariable(flag_local), Span::UNDEFINED);
    let value = types.result.map(|ty| {
        let local = locals.append(
            LocalVariable {
                name: None,
                ty,
                init: None,
                relaxed_precision: false,
                ssa: false,
            },
            Span::UNDEFINED,
        );
        expressions.append(Expression::LocalVariable(local), Span::UNDEFINED)
    });
    let yes = expressions.append(Expression::Literal(Literal::Bool(true)), Span::UNDEFINED);
    let mut exit = Exit {
        expressions,
        flag,
        value,
        yes,
        exits: plan.exits.into_iter(),
        moved: 0,
    };
    let taken = core::mem::take(body);
    *body = exit.block(taken, 0);
}

struct Exit<'a> {
    expressions: &'a mut Arena<Expression>,
    flag: Handle<Expression>,
    value: Option<Handle<Expression>>,
    yes: Handle<Expression>,
    exits: alloc::vec::IntoIter<bool>,
    moved: usize,
}

impl Exit<'_> {
    fn block(&mut self, block: Block, loops: usize) -> Block {
        let mut out = Block::with_capacity(block.len());
        for (statement, span) in block.span_into_iter() {
            match statement {
                Statement::Return { value } if loops > 0 => {
                    if let (Some(value), Some(pointer)) = (value, self.value) {
                        out.push(Statement::Store { pointer, value }, span);
                    }
                    out.push(
                        Statement::Store {
                            pointer: self.flag,
                            value: self.yes,
                        },
                        span,
                    );
                    out.push(Statement::Break, span);
                    self.moved += 1;
                }
                Statement::Block(inner) => {
                    let inner = recurse(|| self.block(inner, loops));
                    out.push(Statement::Block(inner), span);
                }
                Statement::If {
                    condition,
                    accept,
                    reject,
                    control,
                } => {
                    let (accept, reject) =
                        recurse(|| (self.block(accept, loops), self.block(reject, loops)));
                    out.push(
                        Statement::If {
                            condition,
                            accept,
                            reject,
                            control,
                        },
                        span,
                    );
                }
                Statement::Switch {
                    selector,
                    mut cases,
                    control,
                } => {
                    let before = self.moved;
                    for case in &mut cases {
                        let body = core::mem::take(&mut case.body);
                        case.body = recurse(|| self.block(body, loops));
                    }
                    out.push(
                        Statement::Switch {
                            selector,
                            cases,
                            control,
                        },
                        span,
                    );
                    if loops > 0 && self.moved > before {
                        self.check(&mut out, loops, span);
                    }
                }
                Statement::Loop {
                    body,
                    continuing,
                    break_if,
                    control,
                } => {
                    let exits = self.exits.next().unwrap_or(false);
                    let inner = if exits { loops + 1 } else { 0 };
                    let before = self.moved;
                    let (body, continuing) =
                        recurse(|| (self.block(body, inner), self.block(continuing, inner)));
                    out.push(
                        Statement::Loop {
                            body,
                            continuing,
                            break_if,
                            control,
                        },
                        span,
                    );
                    if exits && self.moved > before {
                        self.check(&mut out, loops, span);
                    }
                }
                other => out.push(other, span),
            }
        }
        out
    }

    fn check(&mut self, out: &mut Block, loops: usize, span: Span) {
        let start = self.expressions.len();
        let taken = self
            .expressions
            .append(Expression::Load { pointer: self.flag }, span);
        out.push(Statement::Emit(self.expressions.range_from(start)), span);
        let mut accept = Block::new();
        if loops > 0 {
            accept.push(Statement::Break, span);
        } else {
            let value = self.value.map(|pointer| {
                let start = self.expressions.len();
                let loaded = self.expressions.append(Expression::Load { pointer }, span);
                accept.push(Statement::Emit(self.expressions.range_from(start)), span);
                loaded
            });
            accept.push(Statement::Return { value }, span);
        }
        out.push(
            Statement::If {
                condition: taken,
                accept,
                reject: Block::new(),
                control: crate::SelectionControl::None,
            },
            span,
        );
    }
}

fn needs_single_exit(function: &crate::Function) -> bool {
    returns_inside_exiting_loops(&function.body)
}

fn convert(function: &mut crate::Function, boolean: Handle<Type>) {
    let types = ExitTypes {
        boolean,
        result: function.result.as_ref().map(|result| result.ty),
    };
    leave_loops_before_returning(
        &mut function.body,
        &mut function.local_variables,
        &mut function.expressions,
        &types,
    );
}

pub fn single_exit_module(
    module: &crate::Module,
) -> Result<
    Option<(crate::Module, crate::valid::ModuleInfo)>,
    crate::WithSpan<crate::valid::ValidationError>,
> {
    let any = module
        .functions
        .iter()
        .map(|(_, function)| function)
        .chain(module.entry_points.iter().map(|entry| &entry.function))
        .any(needs_single_exit);
    if !any {
        return Ok(None);
    }
    let mut module = module.clone();
    let boolean = module.types.insert(
        Type {
            name: None,
            inner: crate::TypeInner::Scalar(crate::Scalar::BOOL),
        },
        Span::UNDEFINED,
    );
    for (_, function) in module.functions.iter_mut() {
        if needs_single_exit(function) {
            convert(function, boolean);
        }
    }
    for entry in &mut module.entry_points {
        if needs_single_exit(&entry.function) {
            convert(&mut entry.function, boolean);
        }
    }
    let info =
        crate::valid::Validator::new(crate::valid::ValidationFlags::all()).validate(&module)?;
    Ok(Some((module, info)))
}
