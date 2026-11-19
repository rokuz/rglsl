use rglsl::ir::visit::VisitorMut;
use rglsl::{
    Arena, Block, Constant, Expression, FastHashMap, Function, GlobalVariable, Handle,
    LocalVariable, Override, Range, Span, Statement, SwitchCase, Type, UniqueArena,
};
use rglsl_types::stack::recurse;

use crate::analysis::elements;
use crate::analysis::locals::FIRST;

pub(crate) fn statements(function: &Function) -> u32 {
    let count = u32::try_from(function.body.walk().count()).unwrap_or(u32::MAX);
    count.saturating_add(FIRST)
}

pub(crate) trait Policy {
    fn expression(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        handle: Handle<Expression>,
        block: &mut Block,
    ) -> Result<bool, String>;

    fn statement(
        &mut self,
        rebuild: &mut Rebuild<'_>,
        statement: &Statement,
        span: Span,
        position: u32,
        block: &mut Block,
    ) -> Result<bool, String>;
}

pub(crate) struct Rebuild<'f> {
    pub source: &'f Function,
    pub out: Function,
    map: Vec<Option<Handle<Expression>>>,
    run: Option<(Handle<Expression>, Handle<Expression>)>,
    position: u32,
    undefined: FastHashMap<Handle<Type>, Handle<Expression>>,
}

impl<'f> Rebuild<'f> {
    pub fn new(source: &'f Function) -> Self {
        Self {
            source,
            out: Function {
                name: source.name.clone(),
                arguments: source.arguments.clone(),
                result: source.result.clone(),
                local_variables: source.local_variables.clone(),
                linkage: source.linkage,
                control: source.control,
                expressions: Arena::with_capacity(source.expressions.len()),
                ..Function::default()
            },
            map: vec![None; source.expressions.len()],
            run: None,
            position: FIRST,
            undefined: FastHashMap::default(),
        }
    }

    pub fn body(&mut self, policy: &mut impl Policy, statements: u32) -> Result<(), String> {
        let body = self.block(policy, &self.source.body)?;
        if self.position != statements {
            return Err(format!(
                "the rebuilt body has {} statements, the analysis counted {}",
                self.position - FIRST,
                statements.saturating_sub(FIRST)
            ));
        }
        self.out.body = body;
        let inits: Vec<(Handle<LocalVariable>, Handle<Expression>)> = self
            .source
            .local_variables
            .iter()
            .filter_map(|(handle, local)| Some((handle, local.init?)))
            .collect();
        for (local, init) in inits {
            let init = self.value(init)?;
            self.out
                .local_variables
                .try_get_mut(local)
                .map_err(|error| error.to_string())?
                .init = Some(init);
        }
        Ok(())
    }

    pub fn finish(self) -> Function {
        self.out
    }

    pub fn mapped(&self, handle: Handle<Expression>) -> Option<Handle<Expression>> {
        self.map.get(handle.index()).copied().flatten()
    }

    pub fn set(
        &mut self,
        handle: Handle<Expression>,
        new: Handle<Expression>,
    ) -> Result<(), String> {
        let slot = self
            .map
            .get_mut(handle.index())
            .ok_or_else(|| format!("expression {handle:?} is out of range"))?;
        *slot = Some(new);
        Ok(())
    }

    pub fn expression(&self, handle: Handle<Expression>) -> Result<&'f Expression, String> {
        self.source
            .expressions
            .try_get(handle)
            .map_err(|error| error.to_string())
    }

    pub fn span(&self, handle: Handle<Expression>) -> Span {
        self.source.expressions.get_span(handle)
    }

    pub fn new_expression(&self, handle: Handle<Expression>) -> Result<&Expression, String> {
        self.out
            .expressions
            .try_get(handle)
            .map_err(|error| error.to_string())
    }

    pub fn value(&mut self, handle: Handle<Expression>) -> Result<Handle<Expression>, String> {
        if let Some(new) = self.mapped(handle) {
            return Ok(new);
        }
        let mut pending = vec![handle];
        while let Some(&top) = pending.last() {
            if self.mapped(top).is_some() {
                pending.pop();
                continue;
            }
            let expression = self.expression(top)?;
            let mut missing = false;
            let mut out_of_range = false;
            expression.for_each_operand(|operand| match self.map.get(operand.index()) {
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
                let new = self.copied(top)?;
                self.set(top, new)?;
            }
        }
        self.mapped(handle)
            .ok_or_else(|| format!("{handle:?} was not copied"))
    }

    fn copied(&mut self, handle: Handle<Expression>) -> Result<Handle<Expression>, String> {
        let mut expression = self.expression(handle)?.clone();
        let mut failed = None;
        expression.for_each_operand_mut(|operand| match self.mapped(*operand) {
            Some(new) => *operand = new,
            None => failed = Some(*operand),
        });
        if let Some(operand) = failed {
            return Err(format!(
                "the operand {operand:?} of {handle:?} is not defined yet"
            ));
        }
        let new = self.out.expressions.append(expression, self.span(handle));
        self.carry(handle, new);
        Ok(new)
    }

    pub fn carry(&mut self, handle: Handle<Expression>, new: Handle<Expression>) {
        if let Some(name) = self.source.named_expressions.get(&handle) {
            self.out.named_expressions.insert(new, name.clone());
        }
        if let Some(&flags) = self.source.precision.get(&handle) {
            self.out.precision.insert(new, flags);
        }
        if let Some(&flags) = self.source.non_uniform.get(&handle) {
            *self.out.non_uniform.entry(new).or_default() |= flags;
        }
    }

    pub fn share_non_uniform(
        &mut self,
        handle: Handle<Expression>,
        new: Handle<Expression>,
    ) -> Result<(), String> {
        if let Some(&flags) = self.source.non_uniform.get(&handle)
            && !self.new_expression(new)?.needs_pre_emit()
        {
            *self.out.non_uniform.entry(new).or_default() |= flags;
        }
        Ok(())
    }

    pub fn undefined(&mut self, ty: Handle<Type>, span: Span) -> Handle<Expression> {
        if let Some(&handle) = self.undefined.get(&ty) {
            return handle;
        }
        let handle = self.out.expressions.append(Expression::Undef(ty), span);
        self.undefined.insert(ty, handle);
        handle
    }

    pub fn constant(&mut self, expression: Expression, span: Span) -> Handle<Expression> {
        self.out.expressions.append(expression, span)
    }

    pub fn emit(
        &mut self,
        expression: Expression,
        span: Span,
        block: &mut Block,
    ) -> Handle<Expression> {
        self.continue_run(block, span);
        let new = self.out.expressions.append(expression, span);
        self.extend_run(new);
        new
    }

    pub fn copy(
        &mut self,
        handle: Handle<Expression>,
        block: &mut Block,
        span: Span,
    ) -> Result<Handle<Expression>, String> {
        let mut operands = Vec::new();
        self.expression(handle)?
            .for_each_operand(|operand| operands.push(operand));
        for operand in operands {
            if self.mapped(operand).is_none() {
                self.value(operand)?;
            }
        }
        self.continue_run(block, span);
        let new = self.copied(handle)?;
        self.extend_run(new);
        self.set(handle, new)?;
        Ok(new)
    }

    fn continue_run(&mut self, block: &mut Block, span: Span) {
        if let Some((_, last)) = self.run
            && last.index() + 1 != self.out.expressions.len()
        {
            self.flush(block, span);
        }
    }

    fn extend_run(&mut self, new: Handle<Expression>) {
        self.run = match self.run {
            Some((first, _)) => Some((first, new)),
            None => Some((new, new)),
        };
    }

    pub fn extract(
        &mut self,
        types: &UniqueArena<Type>,
        base: Handle<Expression>,
        index: u32,
        span: Span,
        block: &mut Block,
    ) -> Handle<Expression> {
        if let Ok(&Expression::Compose { ty, ref components }) = self.out.expressions.try_get(base)
            && elements(types, ty) == Some(components.len())
            && let Some(&component) = components.get(index as usize)
        {
            return component;
        }
        self.emit(Expression::AccessIndex { base, index }, span, block)
    }

    pub fn flush(&mut self, block: &mut Block, span: Span) {
        if let Some((first, last)) = self.run.take() {
            block.push(Statement::Emit(Range::new_from_bounds(first, last)), span);
        }
    }

    pub fn push(&mut self, block: &mut Block, statement: Statement, span: Span) {
        self.flush(block, span);
        block.push(statement, span);
    }

    pub fn set_position(&mut self, position: u32) {
        self.position = position;
    }

    pub fn block(&mut self, policy: &mut impl Policy, source: &Block) -> Result<Block, String> {
        let mut out = Block::with_capacity(source.len());
        for (statement, &span) in source.span_iter() {
            let position = self.position;
            self.position += 1;
            if let Statement::Emit(ref range) = *statement {
                for handle in range.clone() {
                    if !policy.expression(self, handle, &mut out)? {
                        self.copy(handle, &mut out, span)?;
                    }
                }
                self.flush(&mut out, span);
                continue;
            }
            self.flush(&mut out, span);
            if policy.statement(self, statement, span, position, &mut out)? {
                self.flush(&mut out, span);
                continue;
            }
            let statement = self.statement(policy, statement)?;
            out.push(statement, span);
        }
        Ok(out)
    }

    fn statement(
        &mut self,
        policy: &mut impl Policy,
        statement: &Statement,
    ) -> Result<Statement, String> {
        Ok(match *statement {
            Statement::Block(ref block) => Statement::Block(recurse(|| self.block(policy, block))?),
            Statement::If {
                condition,
                ref accept,
                ref reject,
                control,
            } => {
                let condition = self.value(condition)?;
                let accept = recurse(|| self.block(policy, accept))?;
                let reject = recurse(|| self.block(policy, reject))?;
                Statement::If {
                    condition,
                    accept,
                    reject,
                    control,
                }
            }
            Statement::Switch {
                selector,
                ref cases,
                control,
            } => {
                let selector = self.value(selector)?;
                let mut copied = Vec::with_capacity(cases.len());
                for case in cases {
                    copied.push(SwitchCase {
                        value: case.value,
                        body: recurse(|| self.block(policy, &case.body))?,
                        fall_through: case.fall_through,
                    });
                }
                Statement::Switch {
                    selector,
                    cases: copied,
                    control,
                }
            }
            Statement::Loop {
                ref body,
                ref continuing,
                break_if,
                control,
            } => {
                let body = recurse(|| self.block(policy, body))?;
                let continuing = recurse(|| self.block(policy, continuing))?;
                let break_if = break_if
                    .map(|condition| self.value(condition))
                    .transpose()?;
                Statement::Loop {
                    body,
                    continuing,
                    break_if,
                    control,
                }
            }
            ref other => {
                let mut statement = other.clone();
                statement.visit_mut(&mut Remap(self))?;
                statement
            }
        })
    }
}

struct Remap<'r, 'f>(&'r mut Rebuild<'f>);

impl<'a> VisitorMut<'a> for Remap<'_, '_> {
    type Error = String;

    fn expression(&mut self, handle: &mut Handle<Expression>) -> Result<(), String> {
        *handle = self.0.value(*handle)?;
        Ok(())
    }

    fn result(&mut self, handle: &mut Handle<Expression>) -> Result<(), String> {
        let new = self.0.copied(*handle)?;
        self.0.set(*handle, new)?;
        *handle = new;
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

    fn local_variable(&mut self, _: &mut Handle<LocalVariable>) -> Result<(), String> {
        Ok(())
    }

    fn function(&mut self, _: &mut Handle<Function>) -> Result<(), String> {
        Ok(())
    }

    fn block(&mut self, _: &'a mut Block) -> Result<(), String> {
        Err(String::from("a nested block in a simple statement"))
    }
}
