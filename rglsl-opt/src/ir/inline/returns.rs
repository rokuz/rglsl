use rglsl::{
    ArraySize, Block, Expression, Function, Handle, Literal, LocalVariable, Range, Scalar, Span,
    Statement, SwitchCase, Type, TypeInner, UnaryOperator, UniqueArena,
};
use rglsl_types::stack::recurse;

#[derive(Debug, Clone, Copy)]
pub(super) enum Exit {
    Void,
    Value(Handle<Expression>),
    Variable(Handle<LocalVariable>),
}

#[derive(Debug)]
pub(super) struct Lowered {
    pub function: Function,
    pub exit: Exit,
}

pub(super) fn lower(source: &Function, types: &mut UniqueArena<Type>) -> Option<Lowered> {
    let mut function = source.clone();
    let returns = function
        .body
        .walk()
        .filter(|statement| matches!(**statement, Statement::Return { .. }))
        .count();
    if returns == 1
        && let Some(&Statement::Return { value }) = function.body.last()
    {
        let len = function.body.len();
        function.body.cull(len - 1..);
        let exit = value.map_or(Exit::Void, Exit::Value);
        return Some(Lowered { function, exit });
    }
    if let Some(ref result) = function.result
        && !storable(result.ty, types)
    {
        return None;
    }
    let falls_off = may_fall_off(&function.body);
    let ret = function.result.as_ref().map(|result| {
        let init = falls_off.then(|| {
            function
                .expressions
                .append(Expression::ZeroValue(result.ty), Span::UNDEFINED)
        });
        function.local_variables.append(
            LocalVariable {
                name: None,
                ty: result.ty,
                init,
                relaxed_precision: false,
            },
            Span::UNDEFINED,
        )
    });
    let exit = ret.map_or(Exit::Void, Exit::Variable);
    if returns == 0 {
        return Some(Lowered { function, exit });
    }
    let body = core::mem::take(&mut function.body);
    let mut lowering = Lowering {
        ret: ret.map(|local| {
            function
                .expressions
                .append(Expression::LocalVariable(local), Span::UNDEFINED)
        }),
        function: &mut function,
        types,
        flag: None,
        truth: None,
    };
    let (body, _) = lowering.block(
        &mut Source::new(body),
        Place {
            tail: true,
            breakable: false,
        },
    );
    function.body = body;
    Some(Lowered { function, exit })
}

fn may_fall_off(body: &Block) -> bool {
    let mut pending = vec![body];
    while let Some(block) = pending.pop() {
        match block.last() {
            Some(
                &(Statement::Return { .. }
                | Statement::Kill
                | Statement::TerminateInvocation
                | Statement::Abort { .. }),
            ) => {}
            Some(Statement::If { accept, reject, .. }) => {
                pending.push(accept);
                pending.push(reject);
            }
            Some(Statement::Block(inner)) => pending.push(inner),
            _ => return true,
        }
    }
    false
}

fn storable(ty: Handle<Type>, types: &UniqueArena<Type>) -> bool {
    let mut seen = vec![false; types.len()];
    let mut pending = vec![ty];
    while let Some(ty) = pending.pop() {
        match seen.get_mut(ty.index()) {
            Some(slot) if !*slot => *slot = true,
            Some(_) => continue,
            None => return false,
        }
        let Ok(ty) = types.get_handle(ty) else {
            return false;
        };
        match ty.inner {
            TypeInner::Scalar(_)
            | TypeInner::Vector { .. }
            | TypeInner::Matrix { .. }
            | TypeInner::CooperativeMatrix { .. }
            | TypeInner::LongVector { .. } => {}
            TypeInner::Array {
                base,
                size: ArraySize::Constant(_),
                ..
            } => pending.push(base),
            TypeInner::Struct { ref members, .. } => {
                pending.extend(members.iter().map(|member| member.ty));
            }
            _ => return false,
        }
    }
    true
}

struct Source {
    segments: Vec<std::vec::IntoIter<(Statement, Span)>>,
}

impl Source {
    fn new(block: Block) -> Self {
        let mut source = Self {
            segments: Vec::new(),
        };
        source.push(block);
        source
    }

    fn push(&mut self, block: Block) {
        let statements: Vec<_> = block.span_into_iter().collect();
        if !statements.is_empty() {
            self.segments.push(statements.into_iter());
        }
    }

    fn next(&mut self) -> Option<(Statement, Span)> {
        loop {
            let top = self.segments.last_mut()?;
            let Some(next) = top.next() else {
                self.segments.pop();
                continue;
            };
            if top.len() == 0 {
                self.segments.pop();
            }
            return Some(next);
        }
    }

    const fn is_empty(&self) -> bool {
        self.segments.is_empty()
    }

    fn clear(&mut self) {
        self.segments.clear();
    }
}

#[derive(Debug, Clone, Copy)]
struct Place {
    tail: bool,
    breakable: bool,
}

struct Lowering<'a> {
    function: &'a mut Function,
    types: &'a mut UniqueArena<Type>,
    ret: Option<Handle<Expression>>,
    flag: Option<Handle<Expression>>,
    truth: Option<Handle<Expression>>,
}

fn ends_in_return(block: &Block) -> bool {
    matches!(block.last(), Some(&Statement::Return { .. }))
}

impl Lowering<'_> {
    fn flag(&mut self) -> Handle<Expression> {
        if let Some(flag) = self.flag {
            return flag;
        }
        let ty = self.types.insert(
            Type {
                name: None,
                inner: TypeInner::Scalar(Scalar::BOOL),
            },
            Span::UNDEFINED,
        );
        let init = self
            .function
            .expressions
            .append(Expression::Literal(Literal::Bool(false)), Span::UNDEFINED);
        let local = self.function.local_variables.append(
            LocalVariable {
                name: None,
                ty,
                init: Some(init),
                relaxed_precision: false,
            },
            Span::UNDEFINED,
        );
        let flag = self
            .function
            .expressions
            .append(Expression::LocalVariable(local), Span::UNDEFINED);
        self.flag = Some(flag);
        flag
    }

    fn truth(&mut self) -> Handle<Expression> {
        *self.truth.get_or_insert_with(|| {
            self.function
                .expressions
                .append(Expression::Literal(Literal::Bool(true)), Span::UNDEFINED)
        })
    }

    fn flag_is(&mut self, set: bool, block: &mut Block, span: Span) -> Handle<Expression> {
        let flag = self.flag();
        let load = self
            .function
            .expressions
            .append(Expression::Load { pointer: flag }, span);
        let condition = if set {
            load
        } else {
            self.function.expressions.append(
                Expression::Unary {
                    op: UnaryOperator::LogicalNot,
                    expr: load,
                },
                span,
            )
        };
        block.push(
            Statement::Emit(Range::new_from_bounds(load, condition)),
            span,
        );
        condition
    }

    fn block(&mut self, source: &mut Source, place: Place) -> (Block, bool) {
        let mut guards: Vec<(Block, Handle<Expression>, Span)> = Vec::new();
        let mut out = Block::new();
        let mut returned = false;
        while let Some((statement, span)) = source.next() {
            let nested = match statement {
                Statement::Return { value } => {
                    let tail = place.tail && source.is_empty();
                    if let (Some(value), Some(ret)) = (value, self.ret) {
                        out.push(
                            Statement::Store {
                                pointer: ret,
                                value,
                            },
                            span,
                        );
                    }
                    if !tail {
                        let flag = self.flag();
                        let value = self.truth();
                        out.push(
                            Statement::Store {
                                pointer: flag,
                                value,
                            },
                            span,
                        );
                        if place.breakable {
                            out.push(Statement::Break, span);
                        }
                        returned = true;
                    }
                    source.clear();
                    false
                }
                Statement::If {
                    condition,
                    accept,
                    reject,
                    control,
                } => {
                    let accept_exits = ends_in_return(&accept);
                    let reject_exits = ends_in_return(&reject);
                    if accept_exits && reject_exits {
                        source.clear();
                    }
                    let inner = Place {
                        tail: place.tail && source.is_empty(),
                        breakable: place.breakable,
                    };
                    let ((accept, accept_returned), (reject, reject_returned)) =
                        if accept_exits != reject_exits && !source.is_empty() {
                            let rest = Place {
                                tail: place.tail,
                                breakable: place.breakable,
                            };
                            let (exits, continues) = if accept_exits {
                                (accept, reject)
                            } else {
                                (reject, accept)
                            };
                            let exits = recurse(|| self.block(&mut Source::new(exits), rest));
                            source.push(continues);
                            let continues = recurse(|| self.block(source, rest));
                            if accept_exits {
                                (exits, continues)
                            } else {
                                (continues, exits)
                            }
                        } else {
                            (
                                recurse(|| self.block(&mut Source::new(accept), inner)),
                                recurse(|| self.block(&mut Source::new(reject), inner)),
                            )
                        };
                    out.push(
                        Statement::If {
                            condition,
                            accept,
                            reject,
                            control,
                        },
                        span,
                    );
                    accept_returned || reject_returned
                }
                Statement::Switch {
                    selector,
                    cases,
                    control,
                } => {
                    let rest_empty = source.is_empty();
                    let mut any = false;
                    let cases = cases
                        .into_iter()
                        .map(|case| {
                            let inner = Place {
                                tail: place.tail && rest_empty && !case.fall_through,
                                breakable: true,
                            };
                            let (body, returned) =
                                recurse(|| self.block(&mut Source::new(case.body), inner));
                            any |= returned;
                            SwitchCase {
                                value: case.value,
                                body,
                                fall_through: case.fall_through,
                            }
                        })
                        .collect();
                    out.push(
                        Statement::Switch {
                            selector,
                            cases,
                            control,
                        },
                        span,
                    );
                    any
                }
                Statement::Loop {
                    body,
                    continuing,
                    break_if,
                    control,
                } => {
                    let (body, body_returned) = recurse(|| {
                        self.block(
                            &mut Source::new(body),
                            Place {
                                tail: false,
                                breakable: true,
                            },
                        )
                    });
                    let (continuing, continuing_returned) = recurse(|| {
                        self.block(
                            &mut Source::new(continuing),
                            Place {
                                tail: false,
                                breakable: false,
                            },
                        )
                    });
                    out.push(
                        Statement::Loop {
                            body,
                            continuing,
                            break_if,
                            control,
                        },
                        span,
                    );
                    body_returned || continuing_returned
                }
                Statement::Block(block) => {
                    let inner = Place {
                        tail: place.tail && source.is_empty(),
                        breakable: place.breakable,
                    };
                    let (block, returned) = recurse(|| self.block(&mut Source::new(block), inner));
                    out.push(Statement::Block(block), span);
                    returned
                }
                other => {
                    out.push(other, span);
                    false
                }
            };
            if nested {
                returned = true;
                if place.breakable {
                    let condition = self.flag_is(true, &mut out, span);
                    let mut exit = Block::new();
                    exit.push(Statement::Break, span);
                    out.push(
                        Statement::If {
                            condition,
                            accept: exit,
                            reject: Block::new(),
                            control: Default::default(),
                        },
                        span,
                    );
                } else if !source.is_empty() {
                    let condition = self.flag_is(false, &mut out, span);
                    guards.push((core::mem::take(&mut out), condition, span));
                }
            }
        }
        while let Some((mut outer, condition, span)) = guards.pop() {
            outer.push(
                Statement::If {
                    condition,
                    accept: out,
                    reject: Block::new(),
                    control: Default::default(),
                },
                span,
            );
            out = outer;
        }
        (out, returned)
    }
}
