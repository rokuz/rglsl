#![warn(clippy::wildcard_enum_match_arm)]
//! Implementation of `Validator::validate_module_handles`.

use core::hash::Hash;

use super::ValidationError;
use crate::visit::Visitor;
use crate::{Arena, UniqueArena};
use crate::{
    Handle,
    arena::{BadHandle, BadRangeError, Range},
};

#[cfg(test)]
use alloc::string::ToString;

impl super::Validator {
    /// Validates that all handles within `module` are:
    ///
    /// * Valid, in the sense that they contain indices within each arena structure inside the
    ///   [`crate::Module`] type.
    /// * No arena contents contain any items that have forward dependencies; that is, the value
    ///   associated with a handle only may contain references to handles in the same arena that
    ///   were constructed before it.
    ///
    /// By validating the above conditions, we free up subsequent logic to assume that handle
    /// accesses are infallible.
    ///
    /// # Errors
    ///
    /// Errors returned by this method are intentionally sparse, for simplicity of implementation.
    /// It is expected that only buggy frontends or fuzzers should ever emit IR that fails this
    /// validation pass.
    pub(super) fn validate_module_handles(module: &crate::Module) -> Result<(), ValidationError> {
        let &crate::Module {
            ref constants,
            ref overrides,
            ref entry_points,
            ref functions,
            ref global_variables,
            ref types,
            ref special_types,
            ref global_expressions,
            vulkan_memory_model: _,
            descriptor_heap: _,
            shader_64bit_indexing: _,
            variable_pointers: _,
            replicated_composites: _,
            legacy_buffer_blocks: _,
            ray_tracing: _,
            spirv_requirements: _,
            source_extensions: _,
            debug_info: _,
            span_map: _,
        } = module;

        // Because types can refer to global expressions and vice versa, to
        // ensure the overall structure is free of cycles, we must traverse them
        // both in tandem.
        //
        // Try to visit all types and global expressions in an order such that
        // each item refers only to previously visited items. If we succeed,
        // that shows that there cannot be any cycles, since walking any edge
        // advances you towards the beginning of the visiting order.
        //
        // Validate all the handles in types and expressions as we traverse the
        // arenas.
        let mut global_exprs_iter = global_expressions.iter().peekable();
        for (th, t) in types.iter() {
            // Imagine the `for` loop and `global_exprs_iter` as two fingers
            // walking the type and global expression arenas. They don't visit
            // elements at the same rate: sometimes one processes a bunch of
            // elements while the other one stays still. But at each point, they
            // check that the two ranges of elements they've visited only refer
            // to other elements in those ranges.
            //
            // For brevity, we'll say 'handles behind `global_exprs_iter`' to
            // mean handles that have already been produced by
            // `global_exprs_iter`. Once `global_exprs_iter` returns `None`, all
            // global expression handles are 'behind' it.
            //
            // At this point:
            //
            // - All types visited by prior iterations (that is, before
            //   `th`/`t`) refer only to expressions behind `global_exprs_iter`.
            //
            //   On the first iteration, this is obviously true: there are no
            //   prior iterations, and `global_exprs_iter` hasn't produced
            //   anything yet. At the bottom of the loop, we'll claim that it's
            //   true for `th`/`t` as well, so the condition remains true when
            //   we advance to the next type.
            //
            // - All expressions behind `global_exprs_iter` refer only to
            //   previously visited types.
            //
            //   Again, trivially true at the start, and we'll show it's true
            //   about each expression that `global_exprs_iter` produces.
            //
            // Once we also check that arena elements only refer to prior
            // elements in that arena, we can see that `th`/`t` does not
            // participate in a cycle: it only refers to previously visited
            // types and expressions behind `global_exprs_iter`, and none of
            // those refer to `th`/`t`, because they passed the same checks
            // before we reached `th`/`t`.
            if let crate::TypeInner::Pointer {
                base,
                space: crate::AddressSpace::PhysicalStorage { .. },
            } = t.inner
            {
                types.check_contains_handle(base)?;
            }
            if let Some(max_expr) = Self::validate_type_handles((th, t), overrides)? {
                max_expr.check_valid_for(global_expressions)?;
                // Since `t` refers to `max_expr`, if we want our invariants to
                // remain true, we must advance `global_exprs_iter` beyond
                // `max_expr`.
                while let Some((eh, e)) = global_exprs_iter.next_if(|&(eh, _)| eh <= max_expr) {
                    if let Some(max_type) = Self::validate_const_expression_handles(
                        (eh, e),
                        constants,
                        overrides,
                        types,
                        global_variables,
                    )? {
                        // Show that `eh` refers only to previously visited types.
                        th.check_dep(max_type)?;
                    }
                    // We've advanced `global_exprs_iter` past `eh` already. But
                    // since we now know that `eh` refers only to previously
                    // visited types, it is again true that all expressions
                    // behind `global_exprs_iter` refer only to previously
                    // visited types. So we can continue to the next expression.
                }
            }

            // Here we know that if `th` refers to any expressions at all,
            // `max_expr` is the latest one. And we know that `max_expr` is
            // behind `global_exprs_iter`. So `th` refers only to expressions
            // behind `global_exprs_iter`, and the invariants will still be
            // true on the next iteration.
        }

        // Since we also enforced the usual intra-arena rules that expressions
        // refer only to prior expressions, expressions can only form cycles if
        // they include types. But we've shown that all types are acyclic, so
        // all expressions must be acyclic as well.
        //
        // Validate the remaining expressions normally.
        let validate_type = |handle| Self::validate_type_handle(handle, types);

        for handle_and_expr in global_exprs_iter {
            if let Some(max_type) = Self::validate_const_expression_handles(
                handle_and_expr,
                constants,
                overrides,
                types,
                global_variables,
            )? {
                validate_type(max_type)?;
            }
        }
        let validate_const_expr =
            |handle| Self::validate_expression_handle(handle, global_expressions);

        for (_handle, constant) in constants.iter() {
            let &crate::Constant { name: _, ty, init } = constant;
            validate_type(ty)?;
            validate_const_expr(init)?;
        }

        for (_handle, r#override) in overrides.iter() {
            let &crate::Override {
                name: _,
                id: _,
                ty,
                init,
            } = r#override;
            validate_type(ty)?;
            if let Some(init_expr) = init {
                validate_const_expr(init_expr)?;
            }
        }

        for (_handle, global_variable) in global_variables.iter() {
            let &crate::GlobalVariable {
                name: _,
                space: _,
                binding: _,
                ty,
                init,
                memory_decorations: _,
                io: _,
                xfb: _,
                input_attachment_index: _,
                heap_offset,
                tile_attachment: _,
                ref spirv_decorations,
                relaxed_precision: _,
                immediate_bank: _,
                block: _,
            } = global_variable;
            validate_type(ty)?;
            if let Some(init_expr) = init {
                validate_const_expr(init_expr)?;
            }
            if let Some(offset) = heap_offset {
                validate_const_expr(offset)?;
            }
            for decoration in spirv_decorations {
                if let crate::SpirvDecorationOperands::Ids(ref ids) = decoration.operands {
                    for &id in ids {
                        match id {
                            crate::SpirvId::Constant(constant) => validate_const_expr(constant)?,
                            crate::SpirvId::Global(global) => {
                                Self::validate_global_variable_handle(global, global_variables)?;
                            }
                        }
                    }
                }
            }
        }

        let validate_function = |function_handle, function: &_| -> Result<_, InvalidHandleError> {
            let &crate::Function {
                name: _,
                ref arguments,
                ref result,
                ref local_variables,
                ref expressions,
                ref named_expressions,
                ref non_uniform,
                ref precision,
                ref body,
                linkage: _,
                control: _,
            } = function;

            for arg in arguments.iter() {
                let &crate::FunctionArgument {
                    name: _,
                    ty,
                    binding: _,
                    relaxed_precision: _,
                    memory_decorations: _,
                } = arg;
                validate_type(ty)?;
            }

            if let &Some(crate::FunctionResult {
                ty,
                binding: _,
                relaxed_precision: _,
            }) = result
            {
                validate_type(ty)?;
            }

            for (_handle, local_variable) in local_variables.iter() {
                let &crate::LocalVariable {
                    name: _,
                    ty,
                    init,
                    relaxed_precision: _,
                } = local_variable;
                validate_type(ty)?;
                if let Some(init) = init {
                    Self::validate_expression_handle(init, expressions)?;
                }
            }

            for handle in named_expressions.keys().copied() {
                Self::validate_expression_handle(handle, expressions)?;
            }

            for handle in non_uniform.keys().copied() {
                Self::validate_expression_handle(handle, expressions)?;
            }

            for handle in precision.keys().copied() {
                Self::validate_expression_handle(handle, expressions)?;
            }

            let checker = HandleChecker {
                dependent: None,
                global: false,
                max_type: None,
                expressions,
                constants,
                overrides,
                types,
                local_variables,
                global_variables,
                functions,
                current_function: function_handle,
            };
            for (handle, expression) in expressions.iter() {
                checker.check_expression(handle, expression, arguments)?;
            }
            checker.check_block(body)?;

            Ok(())
        };

        for entry_point in entry_points.iter() {
            validate_function(None, &entry_point.function)?;
            if let Some(sizes) = entry_point.workgroup_size_overrides {
                for size in sizes.iter().filter_map(|x| *x) {
                    validate_const_expr(size)?;
                }
            }
            if let Some(enable) = entry_point.opacity_micromap {
                validate_const_expr(enable)?;
            }
            for mode in &entry_point.spirv_execution_modes {
                if let crate::SpirvExecutionModeOperands::Ids(ref ids) = mode.operands {
                    for &id in ids {
                        validate_const_expr(id)?;
                    }
                }
            }
            for &variable in &entry_point.interface {
                Self::validate_global_variable_handle(variable, global_variables)?;
            }
            for &(variable, _) in entry_point
                .geometry
                .iter()
                .flat_map(|geometry| &geometry.streams)
            {
                Self::validate_global_variable_handle(variable, global_variables)?;
            }
            for &variable in entry_point
                .geometry
                .iter()
                .flat_map(|geometry| &geometry.passthrough)
            {
                Self::validate_global_variable_handle(variable, global_variables)?;
            }
            for payload in [entry_point.task_payload, entry_point.incoming_ray_payload]
                .into_iter()
                .flatten()
            {
                Self::validate_global_variable_handle(payload, global_variables)?;
            }
            for &variable in entry_point
                .mesh_shader
                .iter()
                .flat_map(|mesh| &mesh.task_memory)
            {
                Self::validate_global_variable_handle(variable, global_variables)?;
            }
        }

        for (function_handle, function) in functions.iter() {
            validate_function(Some(function_handle), function)?;
        }

        let crate::SpecialTypes {
            ray_vertex_return,
            ref predeclared_types,
        } = *special_types;
        for ty in ray_vertex_return
            .into_iter()
            .chain(predeclared_types.values().copied())
        {
            validate_type(ty)?;
        }

        Ok(())
    }

    fn validate_type_handle(
        handle: Handle<crate::Type>,
        types: &UniqueArena<crate::Type>,
    ) -> Result<(), InvalidHandleError> {
        handle.check_valid_for_uniq(types).map(|_| ())
    }

    fn validate_constant_handle(
        handle: Handle<crate::Constant>,
        constants: &Arena<crate::Constant>,
    ) -> Result<(), InvalidHandleError> {
        handle.check_valid_for(constants).map(|_| ())
    }

    fn validate_global_variable_handle(
        handle: Handle<crate::GlobalVariable>,
        global_variables: &Arena<crate::GlobalVariable>,
    ) -> Result<(), InvalidHandleError> {
        handle.check_valid_for(global_variables).map(|_| ())
    }

    fn validate_override_handle(
        handle: Handle<crate::Override>,
        overrides: &Arena<crate::Override>,
    ) -> Result<(), InvalidHandleError> {
        handle.check_valid_for(overrides).map(|_| ())
    }

    fn validate_expression_handle(
        handle: Handle<crate::Expression>,
        expressions: &Arena<crate::Expression>,
    ) -> Result<(), InvalidHandleError> {
        handle.check_valid_for(expressions).map(|_| ())
    }

    fn validate_function_handle(
        handle: Handle<crate::Function>,
        functions: &Arena<crate::Function>,
    ) -> Result<(), InvalidHandleError> {
        handle.check_valid_for(functions).map(|_| ())
    }

    fn validate_callee_handle(
        callee: Handle<crate::Function>,
        functions: &Arena<crate::Function>,
        caller: Option<Handle<crate::Function>>,
    ) -> Result<(), InvalidHandleError> {
        Self::validate_function_handle(callee, functions)?;
        if let Some(caller) = caller {
            caller.check_dep(callee)?;
        }
        Ok(())
    }

    /// Validate all handles that occur in `ty`, whose handle is `handle`.
    ///
    /// If `ty` refers to any expressions, return the highest-indexed expression
    /// handle that it uses. This is used for detecting cycles between the
    /// expression and type arenas.
    fn validate_type_handles(
        (handle, ty): (Handle<crate::Type>, &crate::Type),
        overrides: &Arena<crate::Override>,
    ) -> Result<Option<Handle<crate::Expression>>, InvalidHandleError> {
        let max_expr = match ty.inner {
            crate::TypeInner::Scalar { .. }
            | crate::TypeInner::Vector { .. }
            | crate::TypeInner::Matrix { .. }
            | crate::TypeInner::ValuePointer { .. }
            | crate::TypeInner::Atomic { .. }
            | crate::TypeInner::Image { .. }
            | crate::TypeInner::SampledImage { .. }
            | crate::TypeInner::Sampler { .. }
            | crate::TypeInner::AccelerationStructure
            | crate::TypeInner::RayQuery
            | crate::TypeInner::HitObject { .. } => None,
            crate::TypeInner::Tensor { rank, .. } => {
                Self::validate_cooperative_size(handle, rank, overrides)?
            }
            crate::TypeInner::Pointer {
                base,
                space: crate::AddressSpace::PhysicalStorage { .. },
            } => {
                let _ = base;
                None
            }
            crate::TypeInner::Pointer { base, space: _ }
            | crate::TypeInner::BufferDescriptor { base, space: _ } => {
                handle.check_dep(base)?;
                None
            }
            crate::TypeInner::CooperativeMatrix {
                columns,
                rows,
                scope,
                ..
            } => {
                let mut max = None;
                for size in [columns, rows, scope] {
                    max = max.max(Self::validate_cooperative_size(handle, size, overrides)?);
                }
                max
            }
            crate::TypeInner::LongVector { size, .. }
            | crate::TypeInner::TensorView {
                dimensions: size, ..
            } => Self::validate_cooperative_size(handle, size, overrides)?,
            crate::TypeInner::TensorLayout {
                dimensions,
                clamp_mode,
            } => {
                let clamp = match clamp_mode {
                    Some(clamp_mode) => {
                        Self::validate_cooperative_size(handle, clamp_mode, overrides)?
                    }
                    None => None,
                };
                Self::validate_cooperative_size(handle, dimensions, overrides)?.max(clamp)
            }
            crate::TypeInner::Array { base, size, .. }
            | crate::TypeInner::BindingArray { base, size, .. } => {
                handle.check_dep(base)?;
                match size {
                    crate::ArraySize::Pending(h) => {
                        Self::validate_override_handle(h, overrides)?;
                        let r#override = &overrides[h];
                        handle.check_dep(r#override.ty)?;
                        r#override.init
                    }
                    crate::ArraySize::Constant(_) | crate::ArraySize::Dynamic => None,
                }
            }
            crate::TypeInner::Struct {
                ref members,
                span: _,
            } => {
                handle.check_dep_iter(members.iter().map(|m| m.ty))?;
                None
            }
            crate::TypeInner::Spirv { ref operands, .. } => {
                handle.check_dep_iter(operands.iter().filter_map(|operand| match *operand {
                    crate::SpirvTypeOperand::Type(base) => Some(base),
                    crate::SpirvTypeOperand::Literal(_) => None,
                }))?;
                None
            }
        };

        Ok(max_expr)
    }

    fn validate_cooperative_size(
        handle: Handle<crate::Type>,
        size: crate::CooperativeSize,
        overrides: &Arena<crate::Override>,
    ) -> Result<Option<Handle<crate::Expression>>, InvalidHandleError> {
        match size {
            crate::CooperativeSize::Pending(h) => {
                Self::validate_override_handle(h, overrides)?;
                let r#override = &overrides[h];
                handle.check_dep(r#override.ty)?;
                Ok(r#override.init)
            }
            crate::CooperativeSize::Constant(_) => Ok(None),
        }
    }

    /// Validate all handles that occur in `expression`, whose handle is `handle`.
    ///
    /// If `expression` refers to any `Type`s, return the highest-indexed type
    /// handle that it uses. This is used for detecting cycles between the
    /// expression and type arenas.
    fn validate_const_expression_handles(
        (handle, expression): (Handle<crate::Expression>, &crate::Expression),
        constants: &Arena<crate::Constant>,
        overrides: &Arena<crate::Override>,
        types: &UniqueArena<crate::Type>,
        global_variables: &Arena<crate::GlobalVariable>,
    ) -> Result<Option<Handle<crate::Type>>, InvalidHandleError> {
        let mut checker = HandleChecker {
            dependent: Some(handle),
            global: true,
            max_type: None,
            expressions: &Arena::new(),
            constants,
            overrides,
            types,
            local_variables: &Arena::new(),
            global_variables,
            functions: &Arena::new(),
            current_function: None,
        };
        HandleChecker::check_argument(expression, &[])?;
        expression.visit(&mut checker)?;
        Ok(checker.max_type)
    }
}

#[derive(Clone, Copy)]
struct HandleChecker<'r> {
    dependent: Option<Handle<crate::Expression>>,
    global: bool,
    max_type: Option<Handle<crate::Type>>,
    expressions: &'r Arena<crate::Expression>,
    constants: &'r Arena<crate::Constant>,
    overrides: &'r Arena<crate::Override>,
    types: &'r UniqueArena<crate::Type>,
    local_variables: &'r Arena<crate::LocalVariable>,
    global_variables: &'r Arena<crate::GlobalVariable>,
    functions: &'r Arena<crate::Function>,
    current_function: Option<Handle<crate::Function>>,
}

impl HandleChecker<'_> {
    fn check_expression(
        &self,
        handle: Handle<crate::Expression>,
        expression: &crate::Expression,
        arguments: &[crate::FunctionArgument],
    ) -> Result<(), InvalidHandleError> {
        let mut checker = HandleChecker {
            dependent: Some(handle),
            expressions: &Arena::new(),
            ..*self
        };
        Self::check_argument(expression, arguments)?;
        expression.visit(&mut checker)
    }

    fn check_block(&self, block: &crate::Block) -> Result<(), InvalidHandleError> {
        let mut checker = *self;
        for statement in block.walk() {
            statement.visit(&mut checker)?;
        }
        Ok(())
    }

    fn check_argument(
        expression: &crate::Expression,
        arguments: &[crate::FunctionArgument],
    ) -> Result<(), InvalidHandleError> {
        if let crate::Expression::FunctionArgument(index) = *expression {
            let index = index as usize;
            if index >= arguments.len() {
                return Err(BadHandle {
                    kind: "FunctionArgument",
                    index,
                }
                .into());
            }
        }
        Ok(())
    }

    fn operand(&self, operand: Handle<crate::Expression>) -> Result<(), InvalidHandleError> {
        match self.dependent {
            Some(handle) => {
                handle.check_dep(operand)?;
                Ok(())
            }
            None => super::Validator::validate_expression_handle(operand, self.expressions),
        }
    }
}

impl<'a> Visitor<'a> for HandleChecker<'_> {
    type Error = InvalidHandleError;

    fn expression(&mut self, handle: Handle<crate::Expression>) -> Result<(), InvalidHandleError> {
        self.operand(handle)
    }

    fn result(&mut self, handle: Handle<crate::Expression>) -> Result<(), InvalidHandleError> {
        self.operand(handle)
    }

    fn emitted(&mut self, range: &Range<crate::Expression>) -> Result<(), InvalidHandleError> {
        range.check_valid_for(self.expressions)?;
        Ok(())
    }

    fn ty(&mut self, handle: Handle<crate::Type>) -> Result<(), InvalidHandleError> {
        if self.global {
            self.max_type = Some(self.max_type.map_or(handle, |max| max.max(handle)));
            Ok(())
        } else {
            super::Validator::validate_type_handle(handle, self.types)
        }
    }

    fn constant(&mut self, handle: Handle<crate::Constant>) -> Result<(), InvalidHandleError> {
        super::Validator::validate_constant_handle(handle, self.constants)?;
        if let (true, Some(dependent)) = (self.global, self.dependent) {
            dependent.check_dep(self.constants[handle].init)?;
        }
        Ok(())
    }

    fn r#override(&mut self, handle: Handle<crate::Override>) -> Result<(), InvalidHandleError> {
        super::Validator::validate_override_handle(handle, self.overrides)?;
        if let (true, Some(dependent), Some(init)) =
            (self.global, self.dependent, self.overrides[handle].init)
        {
            dependent.check_dep(init)?;
        }
        Ok(())
    }

    fn global_variable(
        &mut self,
        handle: Handle<crate::GlobalVariable>,
    ) -> Result<(), InvalidHandleError> {
        handle.check_valid_for(self.global_variables)
    }

    fn local_variable(
        &mut self,
        handle: Handle<crate::LocalVariable>,
    ) -> Result<(), InvalidHandleError> {
        handle.check_valid_for(self.local_variables)
    }

    fn function(&mut self, handle: Handle<crate::Function>) -> Result<(), InvalidHandleError> {
        super::Validator::validate_callee_handle(handle, self.functions, self.current_function)
    }

    fn block(&mut self, _: &'a crate::Block) -> Result<(), InvalidHandleError> {
        Ok(())
    }
}

impl From<BadHandle> for ValidationError {
    fn from(source: BadHandle) -> Self {
        Self::InvalidHandle(source.into())
    }
}

impl From<FwdDepError> for ValidationError {
    fn from(source: FwdDepError) -> Self {
        Self::InvalidHandle(source.into())
    }
}

impl From<BadRangeError> for ValidationError {
    fn from(source: BadRangeError) -> Self {
        Self::InvalidHandle(source.into())
    }
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum InvalidHandleError {
    #[error(transparent)]
    BadHandle(#[from] BadHandle),
    #[error(transparent)]
    ForwardDependency(#[from] FwdDepError),
    #[error(transparent)]
    BadRange(#[from] BadRangeError),
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
#[error(
    "{subject:?} of kind {subject_kind:?} depends on {depends_on:?} of kind {depends_on_kind}, \
    which has not been processed yet"
)]
pub struct FwdDepError {
    // This error is used for many `Handle` types, but there's no point in making this generic, so
    // we just flatten them all to `Handle<()>` here.
    subject: Handle<()>,
    subject_kind: &'static str,
    depends_on: Handle<()>,
    depends_on_kind: &'static str,
}

impl<T> Handle<T> {
    /// Check that `self` is valid within `arena` using [`Arena::check_contains_handle`].
    pub(self) fn check_valid_for(self, arena: &Arena<T>) -> Result<(), InvalidHandleError> {
        arena.check_contains_handle(self)?;
        Ok(())
    }

    /// Check that `self` is valid within `arena` using [`UniqueArena::check_contains_handle`].
    pub(self) fn check_valid_for_uniq(
        self,
        arena: &UniqueArena<T>,
    ) -> Result<(), InvalidHandleError>
    where
        T: Eq + Hash,
    {
        arena.check_contains_handle(self)?;
        Ok(())
    }

    /// Check that `depends_on` was constructed before `self` by comparing handle indices.
    ///
    /// If `self` is a valid handle (i.e., it has been validated using [`Self::check_valid_for`])
    /// and this function returns [`Ok`], then it may be assumed that `depends_on` is also valid.
    /// In [`rglsl`](crate)'s current arena-based implementation, this is useful for validating
    /// recursive definitions of arena-based values in linear time.
    ///
    /// # Errors
    ///
    /// If `depends_on`'s handle is from the same [`Arena`] as `self'`s, but not constructed earlier
    /// than `self`'s, this function returns an error.
    pub(self) fn check_dep(self, depends_on: Self) -> Result<Self, FwdDepError> {
        if depends_on < self {
            Ok(self)
        } else {
            Err(FwdDepError {
                subject: self.erase_type(),
                subject_kind: core::any::type_name::<T>(),
                depends_on: depends_on.erase_type(),
                depends_on_kind: core::any::type_name::<T>(),
            })
        }
    }

    /// Like [`Self::check_dep`], except for [`Iterator`]s over handle values.
    pub(self) fn check_dep_iter(
        self,
        depends_on: impl Iterator<Item = Self>,
    ) -> Result<Self, FwdDepError> {
        for handle in depends_on {
            self.check_dep(handle)?;
        }
        Ok(self)
    }
}

impl<T> Range<T> {
    pub(self) fn check_valid_for(&self, arena: &Arena<T>) -> Result<(), BadRangeError> {
        arena.check_contains_range(self)
    }
}

#[test]
fn constant_deps() {
    use crate::{Constant, Expression, Literal, Span, Type, TypeInner};

    let nowhere = Span::default();

    let mut types = UniqueArena::new();
    let mut const_exprs = Arena::new();
    let mut fun_exprs = Arena::new();
    let mut constants = Arena::new();
    let overrides = Arena::new();

    let i32_handle = types.insert(
        Type {
            name: None,
            inner: TypeInner::Scalar(crate::Scalar::I32),
        },
        nowhere,
    );

    // Construct a self-referential constant by misusing a handle to
    // fun_exprs as a constant initializer.
    let fun_expr = fun_exprs.append(Expression::Literal(Literal::I32(42)), nowhere);
    let self_referential_const = constants.append(
        Constant {
            name: None,
            ty: i32_handle,
            init: fun_expr,
        },
        nowhere,
    );
    let _self_referential_expr =
        const_exprs.append(Expression::Constant(self_referential_const), nowhere);

    for handle_and_expr in const_exprs.iter() {
        assert!(
            super::Validator::validate_const_expression_handles(
                handle_and_expr,
                &constants,
                &overrides,
                &UniqueArena::new(),
                &Arena::new(),
            )
            .is_err()
        );
    }
}

#[test]
fn array_size_deps() {
    use super::Validator;
    use crate::{ArraySize, Expression, Override, Scalar, Span, Type, TypeInner};

    let nowhere = Span::default();

    let mut m = crate::Module::default();

    let ty_u32 = m.types.insert(
        Type {
            name: Some("u32".to_string()),
            inner: TypeInner::Scalar(Scalar::U32),
        },
        nowhere,
    );
    let ex_zero = m
        .global_expressions
        .append(Expression::ZeroValue(ty_u32), nowhere);
    let ty_handle = m.overrides.append(
        Override {
            name: None,
            id: None,
            ty: ty_u32,
            init: Some(ex_zero),
        },
        nowhere,
    );
    let ty_arr = m.types.insert(
        Type {
            name: Some("bad_array".to_string()),
            inner: TypeInner::Array {
                base: ty_u32,
                size: ArraySize::Pending(ty_handle),
                stride: 4,
            },
        },
        nowhere,
    );

    // Everything should be okay now.
    assert!(Validator::validate_module_handles(&m).is_ok());

    // Mutate `ex_zero`'s type to `ty_arr`, introducing a cycle.
    // Validation should catch the cycle.
    m.global_expressions[ex_zero] = Expression::ZeroValue(ty_arr);
    assert!(Validator::validate_module_handles(&m).is_err());
}

#[test]
fn array_size_override() -> crate::TestResult {
    use super::Validator;
    use crate::{ArraySize, Override, Scalar, Span, Type, TypeInner};

    let nowhere = Span::default();

    let mut m = crate::Module::default();

    let ty_u32 = m.types.insert(
        Type {
            name: Some("u32".to_string()),
            inner: TypeInner::Scalar(Scalar::U32),
        },
        nowhere,
    );

    let bad_override: Handle<Override> =
        Handle::new(crate::non_max_u32::NonMaxU32::new(1000).ok_or("1000 is a valid index")?);
    let _ty_arr = m.types.insert(
        Type {
            name: Some("bad_array".to_string()),
            inner: TypeInner::Array {
                base: ty_u32,
                size: ArraySize::Pending(bad_override),
                stride: 4,
            },
        },
        nowhere,
    );

    assert!(Validator::validate_module_handles(&m).is_err());
    Ok(())
}

#[test]
fn override_init_deps() {
    use super::Validator;
    use crate::{ArraySize, Expression, Override, Scalar, Span, Type, TypeInner};

    let nowhere = Span::default();

    let mut m = crate::Module::default();

    let ty_u32 = m.types.insert(
        Type {
            name: Some("u32".to_string()),
            inner: TypeInner::Scalar(Scalar::U32),
        },
        nowhere,
    );
    let ex_zero = m
        .global_expressions
        .append(Expression::ZeroValue(ty_u32), nowhere);
    let r#override = m.overrides.append(
        Override {
            name: Some("bad_override".into()),
            id: None,
            ty: ty_u32,
            init: Some(ex_zero),
        },
        nowhere,
    );
    let ty_arr = m.types.insert(
        Type {
            name: Some("bad_array".to_string()),
            inner: TypeInner::Array {
                base: ty_u32,
                size: ArraySize::Pending(r#override),
                stride: 4,
            },
        },
        nowhere,
    );
    let ex_arr = m
        .global_expressions
        .append(Expression::ZeroValue(ty_arr), nowhere);

    assert!(Validator::validate_module_handles(&m).is_ok());

    // Mutate `r#override`'s initializer to `ex_arr`, introducing a cycle.
    // Validation should catch the cycle.
    m.overrides[r#override].init = Some(ex_arr);
    assert!(Validator::validate_module_handles(&m).is_err());
}

#[test]
fn global_expressions_cannot_name_locals_or_later_expressions() -> crate::TestResult {
    use super::{ValidationFlags, Validator};
    use crate::{Expression, Handle, LocalVariable, Span};

    let nowhere = Span::default();
    let missing_local: Handle<LocalVariable> =
        Handle::new(crate::non_max_u32::NonMaxU32::new(95).ok_or("95 is a valid index")?);
    let mut m = crate::Module::default();
    m.global_expressions
        .append(Expression::LocalVariable(missing_local), nowhere);
    assert!(Validator::validate_module_handles(&m).is_err());
    let mut validator = Validator::new(ValidationFlags::all());
    assert!(validator.validate(&m).is_err());

    let later: Handle<Expression> =
        Handle::new(crate::non_max_u32::NonMaxU32::new(1).ok_or("1 is a valid index")?);
    let mut m = crate::Module::default();
    m.global_expressions.append(
        Expression::Unary {
            op: crate::UnaryOperator::Negate,
            expr: later,
        },
        nowhere,
    );
    assert!(Validator::validate_module_handles(&m).is_err());
    assert!(validator.validate(&m).is_err());
    Ok(())
}

#[test]
fn global_expressions_after_every_type_check_their_type_handles() -> crate::TestResult {
    use super::{ValidationFlags, Validator};
    use crate::{Expression, Handle, Span, Type};

    let missing_type: Handle<Type> =
        Handle::new(crate::non_max_u32::NonMaxU32::new(255).ok_or("255 is a valid index")?);
    let mut m = crate::Module::default();
    m.global_expressions.append(
        Expression::Compose {
            ty: missing_type,
            components: alloc::vec::Vec::new(),
        },
        Span::default(),
    );
    assert!(Validator::validate_module_handles(&m).is_err());
    let mut validator = Validator::new(ValidationFlags::all());
    assert!(validator.validate(&m).is_err());

    m.types.insert(
        Type {
            name: None,
            inner: crate::TypeInner::Scalar(crate::Scalar::F32),
        },
        Span::default(),
    );
    m.global_expressions
        .append(Expression::ZeroValue(missing_type), Span::default());
    assert!(validator.validate(&m).is_err());
    Ok(())
}
