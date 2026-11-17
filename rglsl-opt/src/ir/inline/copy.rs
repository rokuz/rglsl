use rglsl::ir::visit::VisitorMut;
use rglsl::{
    Block, Constant, Expression, Function, GlobalVariable, Handle, LocalVariable, Override, Range,
    Span, Statement, SwitchCase, Type,
};
use rglsl_types::stack::recurse;

use super::Plan;
use super::returns::Exit;

pub(super) struct Instance<'f> {
    source: &'f Function,
    map: Vec<Option<Handle<Expression>>>,
    locals: Vec<Handle<LocalVariable>>,
    arguments: Option<Vec<Handle<Expression>>>,
}

struct Call<'s> {
    function: Handle<Function>,
    arguments: &'s [Handle<Expression>],
    result: Option<Handle<Expression>>,
    span: Span,
}

#[derive(Debug, Clone, Copy)]
struct Place {
    in_loop: bool,
    continuing: bool,
}

pub(super) struct Builder<'p> {
    plan: &'p Plan,
    out: Function,
    size: u64,
    pub inlined: bool,
    pub kept: Vec<Handle<Function>>,
}

impl<'p> Builder<'p> {
    pub fn build(plan: &'p Plan, root: &'p Function) -> Result<Self, String> {
        let mut builder = Self {
            plan,
            out: Function {
                name: root.name.clone(),
                arguments: root.arguments.clone(),
                result: root.result.clone(),
                linkage: root.linkage,
                control: root.control,
                ..Function::default()
            },
            size: 0,
            inlined: false,
            kept: Vec::new(),
        };
        let mut instance = Instance {
            source: root,
            map: vec![None; root.expressions.len()],
            locals: Vec::with_capacity(root.local_variables.len()),
            arguments: None,
        };
        for (handle, local) in root.local_variables.iter() {
            let new = builder.out.local_variables.append(
                LocalVariable {
                    init: None,
                    ..local.clone()
                },
                root.local_variables.get_span(handle),
            );
            instance.locals.push(new);
        }
        let body = builder.block(
            &mut instance,
            &root.body,
            Place {
                in_loop: false,
                continuing: false,
            },
        )?;
        builder.out.body = body;
        builder.initialize(&mut instance, None)?;
        Ok(builder)
    }

    pub fn finish(self) -> Function {
        self.out
    }

    fn initialize(
        &mut self,
        instance: &mut Instance<'_>,
        stores: Option<&mut Block>,
    ) -> Result<(), String> {
        let source = instance.source;
        match stores {
            None => {
                for (handle, local) in source.local_variables.iter() {
                    let Some(init) = local.init else {
                        continue;
                    };
                    let init = self.ensure(instance, init)?;
                    let new = local_of(instance, handle)?;
                    self.out.local_variables.get_mut(new).init = Some(init);
                }
            }
            Some(block) => {
                for (handle, local) in source.local_variables.iter() {
                    let Some(init) = local.init else {
                        continue;
                    };
                    let value = self.ensure_visible(instance, init, block)?;
                    let new = local_of(instance, handle)?;
                    let span = source.local_variables.get_span(handle);
                    let pointer = self.append(Expression::LocalVariable(new), span);
                    block.push(Statement::Store { pointer, value }, span);
                }
            }
        }
        Ok(())
    }

    fn append(&mut self, expression: Expression, span: Span) -> Handle<Expression> {
        self.size = self.size.saturating_add(1);
        self.out.expressions.append(expression, span)
    }

    fn mapped(
        instance: &Instance<'_>,
        handle: Handle<Expression>,
    ) -> Result<Option<Handle<Expression>>, String> {
        instance
            .map
            .get(handle.index())
            .copied()
            .ok_or_else(|| format!("expression {handle:?} is out of range"))
    }

    fn ensure(
        &mut self,
        instance: &mut Instance<'_>,
        handle: Handle<Expression>,
    ) -> Result<Handle<Expression>, String> {
        if let Some(new) = Self::mapped(instance, handle)? {
            return Ok(new);
        }
        let mut pending = vec![handle];
        while let Some(&top) = pending.last() {
            if Self::mapped(instance, top)?.is_some() {
                pending.pop();
                continue;
            }
            let expression = instance
                .source
                .expressions
                .try_get(top)
                .map_err(|error| error.to_string())?;
            let mut missing = false;
            let mut out_of_range = false;
            expression.for_each_operand(|operand| match instance.map.get(operand.index()) {
                Some(None) => {
                    pending.push(operand);
                    missing = true;
                }
                Some(Some(_)) => {}
                None => out_of_range = true,
            });
            if out_of_range {
                return Err(format!("an operand of {top:?} is out of range"));
            }
            if !missing {
                pending.pop();
                self.copy(instance, top)?;
            }
        }
        Self::mapped(instance, handle)?.ok_or_else(|| format!("{handle:?} was not copied"))
    }

    fn ensure_visible(
        &mut self,
        instance: &mut Instance<'_>,
        handle: Handle<Expression>,
        block: &mut Block,
    ) -> Result<Handle<Expression>, String> {
        let start = self.out.expressions.len();
        let new = self.ensure(instance, handle)?;
        let mut run: Option<(Handle<Expression>, Handle<Expression>)> = None;
        let span = instance.source.expressions.get_span(handle);
        let expressions = &self.out.expressions;
        let created: Vec<(Handle<Expression>, bool)> = expressions
            .range_from(start)
            .map(|created| (created, !expressions[created].needs_pre_emit()))
            .collect();
        for (created, emitted) in created {
            run = match (run, emitted) {
                (Some((first, last)), true) if last.index() + 1 == created.index() => {
                    Some((first, created))
                }
                (previous, true) => {
                    flush(block, previous, span);
                    Some((created, created))
                }
                (previous, false) => {
                    flush(block, previous, span);
                    None
                }
            };
        }
        flush(block, run, span);
        Ok(new)
    }

    fn copy(
        &mut self,
        instance: &mut Instance<'_>,
        handle: Handle<Expression>,
    ) -> Result<Handle<Expression>, String> {
        let source = instance.source;
        let expression = source
            .expressions
            .try_get(handle)
            .map_err(|error| error.to_string())?;
        if let (&Expression::FunctionArgument(index), Some(arguments)) =
            (expression, instance.arguments.as_ref())
        {
            let argument = arguments
                .get(index as usize)
                .copied()
                .ok_or_else(|| format!("argument {index} is missing"))?;
            set(instance, handle, argument)?;
            return Ok(argument);
        }
        let mut expression = expression.clone();
        let mut failed = false;
        expression.for_each_operand_mut(|operand| {
            match instance.map.get(operand.index()).copied().flatten() {
                Some(new) => *operand = new,
                None => failed = true,
            }
        });
        if failed {
            return Err(format!("an operand of {handle:?} was not copied"));
        }
        if let Expression::LocalVariable(ref mut local) = expression {
            *local = local_of(instance, *local)?;
        }
        let new = self.append(expression, source.expressions.get_span(handle));
        if let Some(name) = source.named_expressions.get(&handle) {
            self.out.named_expressions.insert(new, name.clone());
        }
        if let Some(&flags) = source.precision.get(&handle) {
            self.out.precision.insert(new, flags);
        }
        if let Some(&flags) = source.non_uniform.get(&handle) {
            self.out.non_uniform.insert(new, flags);
        }
        set(instance, handle, new)?;
        Ok(new)
    }

    fn emit(
        &mut self,
        instance: &mut Instance<'_>,
        range: &Range<Expression>,
        block: &mut Block,
        span: Span,
    ) -> Result<(), String> {
        let bounds = range.index_range();
        let inside = |handle: Handle<Expression>| {
            u32::try_from(handle.index()).is_ok_and(|index| bounds.contains(&index))
        };
        for member in range.clone() {
            let expression = instance
                .source
                .expressions
                .try_get(member)
                .map_err(|error| error.to_string())?;
            let mut outside = Vec::new();
            expression.for_each_operand(|operand| {
                if !inside(operand) {
                    outside.push(operand);
                }
            });
            for operand in outside {
                self.ensure(instance, operand)?;
            }
        }
        let mut run: Option<(Handle<Expression>, Handle<Expression>)> = None;
        for member in range.clone() {
            if Self::mapped(instance, member)?.is_some() {
                continue;
            }
            let created = self.copy(instance, member)?;
            run = match run {
                Some((first, last)) if last.index() + 1 == created.index() => {
                    Some((first, created))
                }
                previous => {
                    flush(block, previous, span);
                    Some((created, created))
                }
            };
        }
        flush(block, run, span);
        Ok(())
    }

    fn block(
        &mut self,
        instance: &mut Instance<'p>,
        source: &'p Block,
        place: Place,
    ) -> Result<Block, String> {
        let mut out = Block::with_capacity(source.len());
        self.block_into(instance, source, place, &mut out)?;
        Ok(out)
    }

    fn block_into(
        &mut self,
        instance: &mut Instance<'p>,
        source: &'p Block,
        place: Place,
        out: &mut Block,
    ) -> Result<(), String> {
        for (statement, &span) in source.span_iter() {
            self.size = self.size.saturating_add(1);
            match *statement {
                Statement::Emit(ref range) => self.emit(instance, range, out, span)?,
                Statement::Block(ref block) => {
                    let block = recurse(|| self.block(instance, block, place))?;
                    out.push(Statement::Block(block), span);
                }
                Statement::If {
                    condition,
                    ref accept,
                    ref reject,
                    control,
                } => {
                    let condition = self.ensure(instance, condition)?;
                    let accept = recurse(|| self.block(instance, accept, place))?;
                    let reject = recurse(|| self.block(instance, reject, place))?;
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
                    ref cases,
                    control,
                } => {
                    let selector = self.ensure(instance, selector)?;
                    let mut copied = Vec::with_capacity(cases.len());
                    for case in cases {
                        let body = recurse(|| self.block(instance, &case.body, place))?;
                        copied.push(SwitchCase {
                            value: case.value,
                            body,
                            fall_through: case.fall_through,
                        });
                    }
                    out.push(
                        Statement::Switch {
                            selector,
                            cases: copied,
                            control,
                        },
                        span,
                    );
                }
                Statement::Loop {
                    ref body,
                    ref continuing,
                    break_if,
                    control,
                } => {
                    let body = recurse(|| {
                        self.block(
                            instance,
                            body,
                            Place {
                                in_loop: true,
                                continuing: place.continuing,
                            },
                        )
                    })?;
                    let continuing = recurse(|| {
                        self.block(
                            instance,
                            continuing,
                            Place {
                                in_loop: true,
                                continuing: true,
                            },
                        )
                    })?;
                    let break_if = break_if
                        .map(|condition| self.ensure(instance, condition))
                        .transpose()?;
                    out.push(
                        Statement::Loop {
                            body,
                            continuing,
                            break_if,
                            control,
                        },
                        span,
                    );
                }
                Statement::Call {
                    function,
                    ref arguments,
                    result,
                } if self.plan.decide(function, place.continuing, self.size) => {
                    let call = Call {
                        function,
                        arguments,
                        result,
                        span,
                    };
                    self.call(instance, &call, place, out)?;
                }
                ref other => {
                    let mut statement = other.clone();
                    statement.visit_mut(&mut Remap {
                        builder: self,
                        instance,
                    })?;
                    if let Statement::Call { function, .. } = statement {
                        self.kept.push(function);
                    }
                    out.push(statement, span);
                }
            }
        }
        Ok(())
    }

    fn call(
        &mut self,
        caller: &mut Instance<'p>,
        call: &Call<'_>,
        place: Place,
        out: &mut Block,
    ) -> Result<(), String> {
        let Call {
            function,
            arguments,
            result,
            span,
        } = *call;
        let lowered = self
            .plan
            .lowered(function)
            .ok_or_else(|| format!("no lowered body for {function:?}"))?;
        let arguments = arguments
            .iter()
            .map(|&argument| self.ensure(caller, argument))
            .collect::<Result<Vec<_>, _>>()?;
        let source = &lowered.function;
        let mut callee = Instance {
            source,
            map: vec![None; source.expressions.len()],
            locals: Vec::with_capacity(source.local_variables.len()),
            arguments: Some(arguments),
        };
        for (handle, local) in source.local_variables.iter() {
            let new = self.out.local_variables.append(
                LocalVariable {
                    init: None,
                    ..local.clone()
                },
                source.local_variables.get_span(handle),
            );
            callee.locals.push(new);
        }
        if place.in_loop {
            self.initialize(&mut callee, Some(out))?;
        }
        recurse(|| self.block_into(&mut callee, &source.body, place, out))?;
        if !place.in_loop {
            self.initialize(&mut callee, None)?;
        }
        self.inlined = true;
        let Some(result) = result else {
            return Ok(());
        };
        let value = match lowered.exit {
            Exit::Void => return Err(format!("{function:?} returns no value")),
            Exit::Value(value) => {
                let value = self.ensure(&mut callee, value)?;
                if let Some(&flags) = caller.source.non_uniform.get(&result)
                    && !self.out.expressions[value].needs_pre_emit()
                {
                    self.out.non_uniform.entry(value).or_insert(flags);
                }
                value
            }
            Exit::Variable(local) => {
                let local = local_of(&callee, local)?;
                let pointer = self.append(Expression::LocalVariable(local), span);
                let load = self.append(Expression::Load { pointer }, span);
                out.push(Statement::Emit(Range::new_from_bounds(load, load)), span);
                if let Some(&flags) = caller.source.precision.get(&result) {
                    self.out.precision.insert(load, flags);
                }
                if let Some(&flags) = caller.source.non_uniform.get(&result) {
                    self.out.non_uniform.insert(load, flags);
                }
                if let Some(name) = caller.source.named_expressions.get(&result) {
                    self.out.named_expressions.insert(load, name.clone());
                }
                load
            }
        };
        set(caller, result, value)
    }
}

fn flush(block: &mut Block, run: Option<(Handle<Expression>, Handle<Expression>)>, span: Span) {
    if let Some((first, last)) = run {
        block.push(Statement::Emit(Range::new_from_bounds(first, last)), span);
    }
}

fn set(
    instance: &mut Instance<'_>,
    handle: Handle<Expression>,
    new: Handle<Expression>,
) -> Result<(), String> {
    let slot = instance
        .map
        .get_mut(handle.index())
        .ok_or_else(|| format!("expression {handle:?} is out of range"))?;
    *slot = Some(new);
    Ok(())
}

fn local_of(
    instance: &Instance<'_>,
    local: Handle<LocalVariable>,
) -> Result<Handle<LocalVariable>, String> {
    instance
        .locals
        .get(local.index())
        .copied()
        .ok_or_else(|| format!("local variable {local:?} is out of range"))
}

struct Remap<'b, 'p, 'i, 'f> {
    builder: &'b mut Builder<'p>,
    instance: &'i mut Instance<'f>,
}

impl<'a> VisitorMut<'a> for Remap<'_, '_, '_, '_> {
    type Error = String;

    fn expression(&mut self, handle: &mut Handle<Expression>) -> Result<(), String> {
        *handle = self.builder.ensure(self.instance, *handle)?;
        Ok(())
    }

    fn result(&mut self, handle: &mut Handle<Expression>) -> Result<(), String> {
        if Builder::mapped(self.instance, *handle)?.is_some() {
            return Err(format!("the result {handle:?} is defined twice"));
        }
        *handle = self.builder.copy(self.instance, *handle)?;
        Ok(())
    }

    fn emitted(&mut self, _: &mut Range<Expression>) -> Result<(), String> {
        Err(String::from("an Emit statement inside another statement"))
    }

    fn ty(&mut self, _: &mut Handle<Type>) -> Result<(), String> {
        Ok(())
    }

    fn constant(&mut self, _: &mut Handle<Constant>) -> Result<(), String> {
        Ok(())
    }

    fn r#override(&mut self, _: &mut Handle<Override>) -> Result<(), String> {
        Ok(())
    }

    fn global_variable(&mut self, _: &mut Handle<GlobalVariable>) -> Result<(), String> {
        Ok(())
    }

    fn local_variable(&mut self, local: &mut Handle<LocalVariable>) -> Result<(), String> {
        *local = local_of(self.instance, *local)?;
        Ok(())
    }

    fn function(&mut self, _: &mut Handle<Function>) -> Result<(), String> {
        Ok(())
    }

    fn block(&mut self, _: &'a mut Block) -> Result<(), String> {
        Err(String::from("a nested block in a simple statement"))
    }
}
