use rglsl::{Block, DebugInfo, Expression, Function, Handle, InlineShift, Range, Span, Statement};
use rglsl_types::stack::recurse;

use super::Plan;
use super::returns::Exit;
use crate::analysis::locals::FIRST;
use crate::ir::rebuild::{Policy, Rebuild, Scope};

pub(super) struct Inliner<'p> {
    plan: &'p Plan,
    pub debug: Option<Box<DebugInfo>>,
    pub inlined: bool,
    pub kept: Vec<Handle<Function>>,
}

struct Call<'s> {
    function: Handle<Function>,
    arguments: &'s [Handle<Expression>],
    result: Option<Handle<Expression>>,
    span: Span,
}

impl<'p> Inliner<'p> {
    pub fn build(
        plan: &'p Plan,
        root: &'p Function,
        debug: Option<Box<DebugInfo>>,
    ) -> Result<(Self, Function), String> {
        let mut inliner = Self {
            plan,
            debug,
            inlined: false,
            kept: Vec::new(),
        };
        let mut rebuild = Rebuild::new(root);
        rebuild.body(&mut inliner, None)?;
        Ok((inliner, rebuild.finish()))
    }

    fn call(
        &mut self,
        rebuild: &mut Rebuild<'p>,
        call: &Call<'_>,
        block: &mut Block,
    ) -> Result<(), String> {
        let Call {
            function,
            arguments,
            result,
            span,
        } = *call;
        let plan = self.plan;
        let lowered = plan
            .lowered(function)
            .ok_or_else(|| format!("no lowered body for {function:?}"))?;
        let arguments = arguments
            .iter()
            .map(|&argument| rebuild.value(argument))
            .collect::<Result<Vec<_>, _>>()?;
        let source = &lowered.function;
        let shift = self.inline_shift(function, span);
        let locals = source
            .local_variables
            .iter()
            .map(|(handle, local)| {
                let span = source.local_variables.get_span(handle);
                let span = shift.map_or(span, |shift| shift.span(span));
                Some(rebuild.out.local_variables.append(local.clone(), span))
            })
            .collect();
        let caller = rebuild.enter(Scope::inlined(source, locals, arguments, shift));
        let in_loop = rebuild.place().in_loop;
        if in_loop {
            store_initializers(rebuild, block)?;
        }
        recurse(|| rebuild.block_into(self, &source.body, block))?;
        if !in_loop {
            rebuild.initialize()?;
        }
        self.inlined = true;
        let exit = match (result, lowered.exit) {
            (None, _) | (Some(_), Exit::Void) => Exit::Void,
            (Some(_), Exit::Value(value)) => Exit::Value(rebuild.value(value)?),
            (Some(_), Exit::Variable(local)) => Exit::Variable(rebuild.local(local)?),
        };
        rebuild.leave(caller);
        let Some(result) = result else {
            return Ok(());
        };
        let value = match exit {
            Exit::Void => return Err(format!("{function:?} returns no value")),
            Exit::Value(value) => {
                if let Some(&flags) = rebuild.source().non_uniform.get(&result)
                    && !rebuild.new_expression(value)?.needs_pre_emit()
                {
                    rebuild.out.non_uniform.entry(value).or_insert(flags);
                }
                value
            }
            Exit::Variable(local) => {
                let pointer = rebuild.constant(Expression::LocalVariable(local), span);
                let load = rebuild.emit(Expression::Load { pointer }, span, block);
                rebuild.flush(block, span);
                rebuild.carry(result, load);
                load
            }
        };
        rebuild.set(result, value)
    }

    fn inline_shift(&mut self, function: Handle<Function>, call: Span) -> Option<InlineShift> {
        let range = self.plan.debug_range(function)?;
        let call = u32::try_from(call.to_range()?.start).ok()?;
        self.debug.as_mut()?.inline(range, call)
    }

    fn size(rebuild: &Rebuild<'_>) -> u64 {
        let expressions = u64::try_from(rebuild.out.expressions.len()).unwrap_or(u64::MAX);
        expressions.saturating_add(u64::from(rebuild.position().saturating_sub(FIRST)))
    }
}

impl<'p> Policy<'p> for Inliner<'p> {
    fn statement(
        &mut self,
        rebuild: &mut Rebuild<'p>,
        statement: &Statement,
        span: Span,
        _: u32,
        block: &mut Block,
    ) -> Result<bool, String> {
        match *statement {
            Statement::Emit(ref range) => {
                copy_range(rebuild, range, block, span)?;
                Ok(true)
            }
            Statement::Call {
                function,
                ref arguments,
                result,
            } => {
                let continuing = rebuild.place().continuing;
                if !self.plan.decide(function, continuing, Self::size(rebuild)) {
                    self.kept.push(function);
                    return Ok(false);
                }
                let call = Call {
                    function,
                    arguments,
                    result,
                    span,
                };
                self.call(rebuild, &call, block)?;
                Ok(true)
            }
            _ => Ok(false),
        }
    }
}

fn copy_range(
    rebuild: &mut Rebuild<'_>,
    range: &Range<Expression>,
    block: &mut Block,
    span: Span,
) -> Result<(), String> {
    let bounds = range.index_range();
    let inside = |handle: Handle<Expression>| {
        u32::try_from(handle.index()).is_ok_and(|index| bounds.contains(&index))
    };
    for member in range.clone() {
        let mut outside = Vec::new();
        rebuild.expression(member)?.for_each_operand(|operand| {
            if !inside(operand) {
                outside.push(operand);
            }
        });
        for operand in outside {
            rebuild.value(operand)?;
        }
    }
    for member in range.clone() {
        if rebuild.mapped(member).is_some() {
            continue;
        }
        let new = rebuild.define(member)?;
        rebuild.emitted(new, block, span);
    }
    rebuild.flush(block, span);
    Ok(())
}

fn store_initializers(rebuild: &mut Rebuild<'_>, block: &mut Block) -> Result<(), String> {
    let source = rebuild.source();
    for (handle, _) in source.local_variables.iter() {
        let local = rebuild.local(handle)?;
        let Some(init) = rebuild.local_variable(local)?.init.take() else {
            continue;
        };
        let value = value_emitted(rebuild, init, block)?;
        let span = rebuild.shifted(source.local_variables.get_span(handle));
        let pointer = rebuild.constant(Expression::LocalVariable(local), span);
        block.push(Statement::Store { pointer, value }, span);
    }
    Ok(())
}

fn value_emitted(
    rebuild: &mut Rebuild<'_>,
    handle: Handle<Expression>,
    block: &mut Block,
) -> Result<Handle<Expression>, String> {
    let start = rebuild.out.expressions.len();
    let new = rebuild.value(handle)?;
    let span = rebuild.span(handle);
    for created in rebuild.out.expressions.range_from(start) {
        if rebuild.new_expression(created)?.needs_pre_emit() {
            rebuild.flush(block, span);
        } else {
            rebuild.emitted(created, block, span);
        }
    }
    rebuild.flush(block, span);
    Ok(new)
}
