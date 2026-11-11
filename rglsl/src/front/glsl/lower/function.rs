use alloc::{collections::BTreeMap, string::String, vec::Vec};

use rglsl_ast::ast::{FunctionDefinition, Node};
use rglsl_sema::scope::Direction;
use rglsl_sema::types::Type as GlslType;
use rglsl_sema::{FunctionId, SymbolId};

use super::{internal, unsupported, GlobalRef, Lowerer, Result};
use crate::front::glsl::Error;
use crate::{
    proc::{ConstantEvaluator, Emitter, ExpressionKind, ExpressionKindTracker},
    AddressSpace, Arena, Block, EarlyDepthTest, EntryPoint, Expression, Function, FunctionArgument,
    FunctionResult, Handle, LocalVariable, NonUniform, Span, Statement, TypeInner,
};

#[derive(Clone, Copy, Debug)]
pub(super) enum Local {
    Variable(Handle<LocalVariable>),
    Pointer(u32),
    Value(u32),
    Constant,
}

pub(super) struct FunctionLowerer<'l, 'a> {
    pub lw: &'l mut Lowerer<'a>,
    pub expressions: Arena<Expression>,
    pub locals: Arena<LocalVariable>,
    pub tracker: ExpressionKindTracker,
    pub emitter: Emitter,
    pub block: Block,
    pub variables: BTreeMap<SymbolId, Local>,
    pub specializing: bool,
    pub non_uniform: crate::NonUniformExpressions,
    pub physical_bases: BTreeMap<Handle<Expression>, Handle<crate::Type>>,
    pub argument_types: Vec<Handle<crate::Type>>,
}

fn ensure_returns(block: &mut Block, value: Option<Handle<Expression>>) {
    match block.last_mut() {
        Some(&mut Statement::Block(ref mut inner)) => ensure_returns(inner, value),
        Some(&mut Statement::If {
            ref mut accept,
            ref mut reject,
            ..
        }) => {
            ensure_returns(accept, value);
            ensure_returns(reject, value);
        }
        Some(&mut Statement::Switch { ref mut cases, .. }) => {
            for case in cases.iter_mut() {
                if !case.fall_through {
                    ensure_returns(&mut case.body, value);
                }
            }
        }
        Some(
            &mut (Statement::Break
            | Statement::Continue
            | Statement::Return { .. }
            | Statement::Kill
            | Statement::Abort { .. }),
        ) => {}
        Some(&mut Statement::RayPipelineFunction(ref function)) if function.is_terminator() => {}
        _ => block.push(Statement::Return { value }, Span::UNDEFINED),
    }
}

impl<'l, 'a> FunctionLowerer<'l, 'a> {
    pub(super) fn new(lw: &'l mut Lowerer<'a>) -> Self {
        let expressions = Arena::new();
        let mut emitter = Emitter::default();
        emitter.start(&expressions);
        Self {
            lw,
            expressions,
            locals: Arena::new(),
            tracker: ExpressionKindTracker::new(),
            emitter,
            block: Block::new(),
            variables: BTreeMap::new(),
            specializing: false,
            non_uniform: crate::NonUniformExpressions::default(),
            physical_bases: BTreeMap::new(),
            argument_types: Vec::new(),
        }
    }

    pub(super) fn mark(&mut self, expression: Handle<Expression>, flags: NonUniform) {
        if !flags.is_empty() {
            *self.non_uniform.entry(expression).or_default() |= flags;
        }
    }

    pub(super) fn marked(&self, expression: Handle<Expression>) -> NonUniform {
        self.non_uniform
            .get(&expression)
            .copied()
            .unwrap_or_default()
    }

    pub(super) fn at(&self, span: rglsl_ast::Span) -> Span {
        self.lw.at(span)
    }

    pub(super) fn add(&mut self, expression: Expression, span: Span) -> Result<Handle<Expression>> {
        let mut evaluator = ConstantEvaluator::for_glsl_function(
            &mut self.lw.module,
            &mut self.expressions,
            &mut self.tracker,
            &mut self.lw.layouter,
            &mut self.emitter,
            &mut self.block,
        );
        evaluator
            .try_eval_and_append(expression, span)
            .map_err(|error| Error {
                kind: error.into(),
                meta: span,
            })
    }

    pub(super) fn flush(&mut self) {
        let emitted = self.emitter.finish(&self.expressions);
        self.block.extend(emitted);
        self.emitter.start(&self.expressions);
    }

    pub(super) fn push(&mut self, statement: Statement, span: Span) {
        self.flush();
        self.block.push(statement, span);
    }

    pub(super) fn unemitted(&mut self, expression: Expression, span: Span) -> Handle<Expression> {
        let handle = self.expressions.append(expression, span);
        self.tracker.insert(handle, ExpressionKind::Runtime);
        handle
    }

    pub(super) fn result_statement(
        &mut self,
        result: Expression,
        statement: impl FnOnce(Handle<Expression>) -> Statement,
        span: Span,
    ) -> Handle<Expression> {
        let emitted = self.emitter.finish(&self.expressions);
        self.block.extend(emitted);
        let result = self.unemitted(result, span);
        self.block.push(statement(result), span);
        self.emitter.start(&self.expressions);
        result
    }

    pub(super) fn call_statement(
        &mut self,
        function: Handle<Function>,
        arguments: Vec<Handle<Expression>>,
        returns: bool,
        span: Span,
    ) -> Option<Handle<Expression>> {
        let emitted = self.emitter.finish(&self.expressions);
        self.block.extend(emitted);
        let result = returns.then(|| self.unemitted(Expression::CallResult(function), span));
        self.block.push(
            Statement::Call {
                function,
                arguments,
                result,
            },
            span,
        );
        self.emitter.start(&self.expressions);
        result
    }

    pub(super) fn nested(&mut self, body: impl FnOnce(&mut Self) -> Result<()>) -> Result<Block> {
        self.flush();
        let outer = core::mem::take(&mut self.block);
        let result = body(self);
        self.flush();
        let inner = core::mem::replace(&mut self.block, outer);
        result.map(|()| inner)
    }

    pub(super) fn terminated(&self) -> bool {
        match self.block.last() {
            Some(
                &(Statement::Break
                | Statement::Continue
                | Statement::Return { .. }
                | Statement::Kill
                | Statement::Abort { .. }),
            ) => true,
            Some(&Statement::RayPipelineFunction(ref function)) => function.is_terminator(),
            _ => false,
        }
    }

    pub(super) fn local(
        &mut self,
        ty: &GlslType,
        name: Option<String>,
        span: Span,
    ) -> Result<Handle<LocalVariable>> {
        let ir = self.lw.ir_type(ty, span)?;
        Ok(self.locals.append(
            LocalVariable {
                name,
                ty: ir,
                init: None,
            },
            span,
        ))
    }

    pub(super) fn local_typed(
        &mut self,
        ty: Handle<crate::Type>,
        name: Option<String>,
        span: Span,
    ) -> Handle<LocalVariable> {
        self.locals.append(
            LocalVariable {
                name,
                ty,
                init: None,
            },
            span,
        )
    }

    pub(super) fn local_pointer(
        &mut self,
        local: Handle<LocalVariable>,
        span: Span,
    ) -> Result<Handle<Expression>> {
        self.add(Expression::LocalVariable(local), span)
    }

    fn finish(
        mut self,
        result: Option<FunctionResult>,
        arguments: Vec<FunctionArgument>,
        name: String,
    ) -> Function {
        let emitted = self.emitter.finish(&self.expressions);
        self.block.extend(emitted);
        let value = result.as_ref().map(|result| {
            let handle = self
                .expressions
                .append(Expression::ZeroValue(result.ty), Span::UNDEFINED);
            self.tracker.insert(handle, ExpressionKind::Const);
            handle
        });
        let mut body = self.block;
        ensure_returns(&mut body, value);
        Function {
            name: Some(name),
            arguments,
            result,
            local_variables: self.locals,
            expressions: self.expressions,
            named_expressions: crate::NamedExpressions::default(),
            non_uniform: self.non_uniform,
            body,
            diagnostic_filter_leaf: None,
            linkage: crate::Linkage::Definition,
        }
    }
}

impl<'a> Lowerer<'a> {
    fn parameter_type(
        &mut self,
        ty: &GlslType,
        symbol: Option<SymbolId>,
        span: Span,
    ) -> Result<Handle<crate::Type>> {
        let depth = symbol.is_some_and(|symbol| self.depth.contains(&symbol));
        let comparison = symbol.is_some_and(|symbol| self.comparison.contains(&symbol));
        if let Some(qualifiers) = symbol
            .and_then(|symbol| self.variable(symbol))
            .map(|variable| &variable.qualifiers)
        {
            if ty.is_reference() {
                return self.variable_ir_type(ty, qualifiers, span);
            }
        }
        self.ir_type_with(ty, depth, comparison, span)
    }

    pub(super) fn signature(
        &mut self,
        id: FunctionId,
        span: Span,
    ) -> Result<(Vec<FunctionArgument>, Option<FunctionResult>, Vec<Local>)> {
        let analysis = self.analysis;
        let function = analysis.function(id).ok_or_else(|| internal(span))?;
        let symbols = self.parameters.get(&id).cloned().unwrap_or_default();
        let mut arguments = Vec::with_capacity(function.parameters.len());
        let mut locals = Vec::with_capacity(function.parameters.len());
        for (index, parameter) in function.parameters.iter().enumerate() {
            let index = u32::try_from(index).map_err(|_| internal(span))?;
            let symbol = symbols
                .get(usize::try_from(index).unwrap_or(usize::MAX))
                .copied()
                .flatten();
            if parameter.qualifiers.precise {
                return Err(unsupported("`precise`", span));
            }
            let mut ty = self.parameter_type(&parameter.ty, symbol, span)?;
            let ray_query = parameter
                .ty
                .as_opaque()
                .is_some_and(rglsl_sema::types::Opaque::is_ray_query);
            let local = if ray_query {
                ty = self.insert_type(TypeInner::Pointer {
                    base: ty,
                    space: AddressSpace::Private,
                });
                Local::Pointer(index)
            } else if parameter.direction.is_output() {
                ty = self.insert_type(TypeInner::Pointer {
                    base: ty,
                    space: AddressSpace::Function,
                });
                Local::Pointer(index)
            } else {
                Local::Value(index)
            };
            locals.push(local);
            arguments.push(FunctionArgument {
                name: parameter.name.clone(),
                ty,
                binding: None,
            });
        }
        let result = if function.return_type.is_void() {
            None
        } else {
            Some(FunctionResult {
                ty: self.ir_type(&function.return_type, span)?,
                binding: None,
            })
        };
        Ok((arguments, result, locals))
    }

    pub(super) fn declare_function(
        &mut self,
        id: FunctionId,
        definition: &'a Node<FunctionDefinition>,
    ) -> Result<()> {
        let at = self.at(definition.span);
        let (arguments, result, _) = self.signature(id, at)?;
        let handle = self.module.functions.append(
            Function {
                name: Some(self.function_name(id)),
                arguments,
                result,
                ..Function::default()
            },
            at,
        );
        self.functions.insert(id, handle);
        Ok(())
    }

    pub(super) fn define_function(
        &mut self,
        id: FunctionId,
        definition: &'a Node<FunctionDefinition>,
    ) -> Result<()> {
        let Some(&handle) = self.functions.get(&id) else {
            return Ok(());
        };
        let function = self.lower_body(id, definition, false)?;
        *self.module.functions.get_mut(handle) = function;
        Ok(())
    }

    fn lower_body(
        &mut self,
        id: FunctionId,
        definition: &'a Node<FunctionDefinition>,
        entry: bool,
    ) -> Result<Function> {
        let at = self.at(definition.span);
        let analysis = self.analysis;
        let (arguments, result, locals) = self.signature(id, at)?;
        let symbols = self.parameters.get(&id).cloned().unwrap_or_default();
        let function = analysis.function(id).ok_or_else(|| internal(at))?;
        let name = self.function_name(id);
        let initializers = if entry {
            core::mem::take(&mut self.initializers)
        } else {
            Vec::new()
        };
        let mut lowerer = FunctionLowerer::new(self);
        lowerer.argument_types = arguments.iter().map(|argument| argument.ty).collect();
        for (((parameter, local), symbol), index) in function
            .parameters
            .iter()
            .zip(locals)
            .zip(symbols)
            .zip(0_u32..)
        {
            let Some(symbol) = symbol else {
                continue;
            };
            let opaque = parameter.ty.is_opaque();
            let local = match local {
                Local::Value(_)
                    if !opaque
                        && (!parameter.qualifiers.constant || parameter.qualifiers.nonuniform)
                        && parameter.direction == Direction::In =>
                {
                    let ty = lowerer.lw.parameter_type(&parameter.ty, Some(symbol), at)?;
                    let variable = lowerer.local_typed(ty, parameter.name.clone(), at);
                    let pointer = lowerer.local_pointer(variable, at)?;
                    let value = lowerer.add(Expression::FunctionArgument(index), at)?;
                    lowerer.push(Statement::Store { pointer, value }, at);
                    Local::Variable(variable)
                }
                other => other,
            };
            lowerer.variables.insert(symbol, local);
        }
        for initialization in initializers {
            let ty = lowerer
                .lw
                .variable(initialization.symbol)
                .map(|variable| variable.ty.clone())
                .ok_or_else(|| internal(at))?;
            let value = lowerer.initializer(initialization.initializer, &ty)?;
            let span = lowerer.at(initialization.initializer.span);
            let pointer = lowerer.add(Expression::GlobalVariable(initialization.global), span)?;
            lowerer.push(Statement::Store { pointer, value }, span);
        }
        lowerer.statements(&definition.body.statements)?;
        Ok(lowerer.finish(result, arguments, name))
    }

    pub(super) fn entry_point(&mut self, definition: &'a Node<FunctionDefinition>) -> Result<()> {
        let at = self.at(definition.span);
        let id = *self
            .analysis
            .function_declarations
            .get(&definition.id)
            .ok_or_else(|| internal(at))?;
        let function = self.lower_body(id, definition, true)?;
        let stage = self.options.stage;
        let (workgroup_size, workgroup_size_overrides) = if stage.compute_like() {
            (
                self.work_group_size_defaults(),
                self.workgroup_size_overrides(at)?,
            )
        } else {
            ([0; 3], None)
        };
        let early_depth_test = if self.early_fragment_tests {
            Some(EarlyDepthTest::Force)
        } else {
            self.conservative_depth
                .map(|conservative| EarlyDepthTest::Allow { conservative })
        };
        let opacity_micromap = self.opacity_micromap(at)?;
        let (geometry, tessellation) = self.stage_info();
        self.module.entry_points.push(EntryPoint {
            name: String::from("main"),
            stage,
            early_depth_test,
            workgroup_size,
            workgroup_size_overrides,
            function,
            mesh_info: None,
            task_payload: self.task_payload,
            incoming_ray_payload: self.incoming_ray_payload,
            interface: self.interface.clone(),
            transform_feedback: self.xfb.mode,
            opacity_micromap,
            quad_control: self.quad_control,
            geometry,
            tessellation,
            mesh_shader: self.mesh_shader_info(),
        });
        Ok(())
    }

    pub(super) const fn global_expression(&mut self, global: GlobalRef) -> Expression {
        match global {
            GlobalRef::Variable(handle) => Expression::GlobalVariable(handle),
            GlobalRef::Constant(handle) => Expression::Constant(handle),
            GlobalRef::Override(handle) => Expression::Override(handle),
        }
    }
}
