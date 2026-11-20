use rglsl::ir::visit::VisitorMut;
use rglsl::{
    Arena, Block, Expression, FastHashMap, Function, Handle, InlineShift, LocalVariable, Range,
    Span, Statement, SwitchCase, Type, UniqueArena,
};
use rglsl_types::stack::recurse;

use crate::analysis::locals::FIRST;
use crate::analysis::{elements, for_each_result};

pub(crate) fn statements(function: &Function) -> u32 {
    let count = u32::try_from(function.body.walk().count()).unwrap_or(u32::MAX);
    count.saturating_add(FIRST)
}

pub(crate) trait Policy<'f> {
    fn expression(
        &mut self,
        _: &mut Rebuild<'f>,
        _: Handle<Expression>,
        _: &mut Block,
    ) -> Result<bool, String> {
        Ok(false)
    }

    fn statement(
        &mut self,
        _: &mut Rebuild<'f>,
        _: &Statement,
        _: Span,
        _: u32,
        _: &mut Block,
    ) -> Result<bool, String> {
        Ok(false)
    }
}

pub(crate) struct Scope<'f> {
    source: &'f Function,
    map: Vec<Option<Handle<Expression>>>,
    locals: Vec<Option<Handle<LocalVariable>>>,
    arguments: Option<Vec<Handle<Expression>>>,
    shift: Option<InlineShift>,
}

impl<'f> Scope<'f> {
    pub fn new(source: &'f Function, locals: Vec<Option<Handle<LocalVariable>>>) -> Self {
        Self {
            source,
            map: vec![None; source.expressions.len()],
            locals,
            arguments: None,
            shift: None,
        }
    }

    pub fn inlined(
        source: &'f Function,
        locals: Vec<Option<Handle<LocalVariable>>>,
        arguments: Vec<Handle<Expression>>,
        shift: Option<InlineShift>,
    ) -> Self {
        Self {
            arguments: Some(arguments),
            shift,
            ..Self::new(source, locals)
        }
    }
}

#[derive(Debug, Clone, Copy, Default)]
pub(crate) struct Place {
    pub in_loop: bool,
    pub continuing: bool,
}

pub(crate) struct Rebuild<'f> {
    scope: Scope<'f>,
    pub out: Function,
    run: Option<(Handle<Expression>, Handle<Expression>)>,
    position: u32,
    place: Place,
    undefined: FastHashMap<Handle<Type>, Handle<Expression>>,
}

impl<'f> Rebuild<'f> {
    pub fn new(source: &'f Function) -> Self {
        let locals = source
            .local_variables
            .iter()
            .map(|(handle, _)| Some(handle))
            .collect();
        Self::with_locals(source, source.local_variables.clone(), locals)
    }

    pub fn with_locals(
        source: &'f Function,
        local_variables: Arena<LocalVariable>,
        locals: Vec<Option<Handle<LocalVariable>>>,
    ) -> Self {
        Self {
            scope: Scope::new(source, locals),
            out: Function {
                name: source.name.clone(),
                arguments: source.arguments.clone(),
                result: source.result.clone(),
                local_variables,
                linkage: source.linkage,
                control: source.control,
                expressions: Arena::with_capacity(source.expressions.len()),
                ..Function::default()
            },
            run: None,
            position: FIRST,
            place: Place::default(),
            undefined: FastHashMap::default(),
        }
    }

    pub fn body(
        &mut self,
        policy: &mut impl Policy<'f>,
        statements: Option<u32>,
    ) -> Result<(), String> {
        let source = self.scope.source;
        let body = self.block(policy, &source.body)?;
        if let Some(statements) = statements
            && self.position != statements
        {
            return Err(format!(
                "the rebuilt body has {} statements, the analysis counted {}",
                self.position - FIRST,
                statements.saturating_sub(FIRST)
            ));
        }
        self.out.body = body;
        self.initialize()
    }

    pub fn initialize(&mut self) -> Result<(), String> {
        let source = self.scope.source;
        for (handle, _) in source.local_variables.iter() {
            let Some(local) = self.scope.locals.get(handle.index()).copied().flatten() else {
                continue;
            };
            let Some(init) = self.local_variable(local)?.init else {
                continue;
            };
            let init = self.value(init)?;
            self.local_variable(local)?.init = Some(init);
        }
        Ok(())
    }

    pub fn local_variable(
        &mut self,
        local: Handle<LocalVariable>,
    ) -> Result<&mut LocalVariable, String> {
        self.out
            .local_variables
            .try_get_mut(local)
            .map_err(|error| error.to_string())
    }

    pub fn finish(self) -> Function {
        self.out
    }

    pub fn source(&self) -> &'f Function {
        self.scope.source
    }

    pub fn enter(&mut self, scope: Scope<'f>) -> Scope<'f> {
        core::mem::replace(&mut self.scope, scope)
    }

    pub fn leave(&mut self, outer: Scope<'f>) -> Scope<'f> {
        core::mem::replace(&mut self.scope, outer)
    }

    pub const fn place(&self) -> Place {
        self.place
    }

    pub const fn position(&self) -> u32 {
        self.position
    }

    pub fn set_position(&mut self, position: u32) {
        self.position = position;
    }

    pub fn mapped(&self, handle: Handle<Expression>) -> Option<Handle<Expression>> {
        self.scope.map.get(handle.index()).copied().flatten()
    }

    pub fn set(
        &mut self,
        handle: Handle<Expression>,
        new: Handle<Expression>,
    ) -> Result<(), String> {
        let slot = self
            .scope
            .map
            .get_mut(handle.index())
            .ok_or_else(|| format!("expression {handle:?} is out of range"))?;
        *slot = Some(new);
        Ok(())
    }

    pub fn forget(&mut self, block: &Block) {
        for statement in block.walk() {
            for_each_result(statement, |result| {
                if let Some(slot) = self.scope.map.get_mut(result.index()) {
                    *slot = None;
                }
            });
        }
    }

    pub fn local(&self, local: Handle<LocalVariable>) -> Result<Handle<LocalVariable>, String> {
        self.scope
            .locals
            .get(local.index())
            .copied()
            .flatten()
            .ok_or_else(|| format!("local variable {local:?} has no copy"))
    }

    pub fn expression(&self, handle: Handle<Expression>) -> Result<&'f Expression, String> {
        self.scope
            .source
            .expressions
            .try_get(handle)
            .map_err(|error| error.to_string())
    }

    pub fn shifted(&self, span: Span) -> Span {
        self.scope.shift.map_or(span, |shift| shift.span(span))
    }

    pub fn span(&self, handle: Handle<Expression>) -> Span {
        self.shifted(self.scope.source.expressions.get_span(handle))
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
            expression.for_each_operand(|operand| match self.scope.map.get(operand.index()) {
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
                self.define(top)?;
            }
        }
        self.mapped(handle)
            .ok_or_else(|| format!("{handle:?} was not copied"))
    }

    pub fn define(&mut self, handle: Handle<Expression>) -> Result<Handle<Expression>, String> {
        let new = self.copied(handle)?;
        self.set(handle, new)?;
        Ok(new)
    }

    fn copied(&mut self, handle: Handle<Expression>) -> Result<Handle<Expression>, String> {
        let expression = self.expression(handle)?;
        if let Expression::FunctionArgument(index) = *expression
            && let Some(ref arguments) = self.scope.arguments
        {
            return arguments
                .get(index as usize)
                .copied()
                .ok_or_else(|| format!("argument {index} is missing"));
        }
        let mut expression = expression.clone();
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
        if let Expression::LocalVariable(ref mut local) = expression {
            *local = self.local(*local)?;
        }
        let new = self.out.expressions.append(expression, self.span(handle));
        self.carry(handle, new);
        Ok(new)
    }

    pub fn carry(&mut self, handle: Handle<Expression>, new: Handle<Expression>) {
        let source = self.scope.source;
        if let Some(name) = source.named_expressions.get(&handle) {
            self.out.named_expressions.insert(new, name.clone());
        }
        if let Some(&flags) = source.precision.get(&handle) {
            self.out.precision.insert(new, flags);
        }
        if let Some(&flags) = source.non_uniform.get(&handle) {
            *self.out.non_uniform.entry(new).or_default() |= flags;
        }
    }

    pub fn share_non_uniform(
        &mut self,
        handle: Handle<Expression>,
        new: Handle<Expression>,
    ) -> Result<(), String> {
        if let Some(&flags) = self.scope.source.non_uniform.get(&handle)
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
        let new = self.out.expressions.append(expression, span);
        self.emitted(new, block, span);
        new
    }

    pub fn emitted(&mut self, new: Handle<Expression>, block: &mut Block, span: Span) {
        if let Some((first, last)) = self.run
            && last.index() + 1 == new.index()
        {
            self.run = Some((first, new));
            return;
        }
        self.flush(block, span);
        self.run = Some((new, new));
    }

    pub fn copy(
        &mut self,
        handle: Handle<Expression>,
        block: &mut Block,
        span: Span,
    ) -> Result<Handle<Expression>, String> {
        let mut copied = Ok(());
        self.expression(handle)?.for_each_operand(|operand| {
            if copied.is_ok() && self.mapped(operand).is_none() {
                copied = self.value(operand).map(drop);
            }
        });
        copied?;
        let new = self.define(handle)?;
        self.emitted(new, block, span);
        Ok(new)
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

    pub fn block(&mut self, policy: &mut impl Policy<'f>, source: &Block) -> Result<Block, String> {
        let mut out = Block::with_capacity(source.len());
        self.block_into(policy, source, &mut out)?;
        Ok(out)
    }

    pub fn block_into(
        &mut self,
        policy: &mut impl Policy<'f>,
        source: &Block,
        out: &mut Block,
    ) -> Result<(), String> {
        for (statement, &span) in source.span_iter() {
            let span = self.shifted(span);
            let position = self.position;
            self.position += 1;
            self.flush(out, span);
            if policy.statement(self, statement, span, position, out)? {
                self.flush(out, span);
                continue;
            }
            if let Statement::Emit(ref range) = *statement {
                for handle in range.clone() {
                    if !policy.expression(self, handle, out)? {
                        self.copy(handle, out, span)?;
                    }
                }
                self.flush(out, span);
                continue;
            }
            let statement = self.statement(policy, statement)?;
            out.push(statement, span);
        }
        Ok(())
    }

    fn statement(
        &mut self,
        policy: &mut impl Policy<'f>,
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
                let outer = self.place;
                self.place.in_loop = true;
                let body = recurse(|| self.block(policy, body))?;
                self.place.continuing = true;
                let continuing = recurse(|| self.block(policy, continuing))?;
                self.place = outer;
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
        *handle = match self.0.mapped(*handle) {
            Some(new) => new,
            None => self.0.define(*handle)?,
        };
        Ok(())
    }

    fn local_variable(&mut self, local: &mut Handle<LocalVariable>) -> Result<(), String> {
        *local = self.0.local(*local)?;
        Ok(())
    }

    fn emitted(&mut self, _: &mut Range<Expression>) -> Result<(), String> {
        Err(String::from("an Emit statement inside another statement"))
    }

    fn block(&mut self, _: &'a mut Block) -> Result<(), String> {
        Err(String::from("a nested block in a simple statement"))
    }
}
