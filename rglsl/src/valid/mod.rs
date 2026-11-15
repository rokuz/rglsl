#![warn(clippy::wildcard_enum_match_arm)]
/*!
Shader validator.
*/

mod analyzer;
mod compose;
mod expression;
mod function;
#[cfg(all(test, feature = "arbitrary"))]
mod fuzzed;
mod handles;
pub(crate) mod immediates;
mod interface;
#[cfg(test)]
mod malformed;
mod r#type;

use alloc::{boxed::Box, string::String, vec, vec::Vec};
use core::ops;

use bit_set::BitSet;

use crate::{
    FastHashSet,
    arena::{Handle, HandleSet},
    proc::{ExpressionKindTracker, LayoutError, Layouter, TypeResolution},
};

//TODO: analyze the model at the same time as we validate it,
// merge the corresponding matches over expressions and statements.

use crate::span::{AddSpan as _, WithSpan};
pub use analyzer::{ExpressionInfo, FunctionInfo, GlobalUse, Uniformity, UniformityRequirements};
pub use compose::ComposeError;
pub use expression::{ConstExpressionError, ExpressionError};
pub use expression::{LiteralError, check_literal_value};
pub(crate) use function::abort_message_length;
pub use function::{CallError, FunctionError, LocalVariableError, SubgroupError};
pub use immediates::ImmediateSlots;
pub use interface::{EntryPointError, GlobalVariableError, VaryingError};
pub use r#type::{Disalignment, ImmediateError, TypeError, TypeFlags, WidthError};

use self::handles::InvalidHandleError;

/// Maximum size of a type, in bytes.
pub const MAX_TYPE_SIZE: u32 = i32::MAX as u32;

bitflags::bitflags! {
    /// Validation flags.
    ///
    /// If you are working with trusted shaders, then you may be able
    /// to save some time by skipping validation.
    ///
    /// If you do not perform full validation, invalid shaders may
    /// cause rglsl to panic. If you do perform full validation and
    /// [`Validator::validate`] returns `Ok`, then rglsl promises that
    /// code generation will either succeed or return an error; it
    /// should never panic.
    ///
    /// The default value for `ValidationFlags` is
    /// `ValidationFlags::all()`.
    #[cfg_attr(feature = "serialize", derive(serde::Serialize))]
    #[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
    #[derive(Clone, Copy, Debug, Eq, PartialEq)]
    pub struct ValidationFlags: u8 {
        /// Expressions.
        const EXPRESSIONS = 0x1;
        /// Statements and blocks of them.
        const BLOCKS = 0x2;
        /// Uniformity of control flow for operations that require it.
        const CONTROL_FLOW_UNIFORMITY = 0x4;
        /// Host-shareable structure layouts.
        const STRUCT_LAYOUTS = 0x8;
        /// Constants.
        const CONSTANTS = 0x10;
        /// Group, binding, and location attributes.
        const BINDINGS = 0x20;
    }
}

impl Default for ValidationFlags {
    fn default() -> Self {
        Self::all()
    }
}

pub use rglsl_types::ShaderStageMask as ShaderStages;

#[derive(Debug, Clone, Default)]
#[cfg_attr(feature = "serialize", derive(serde::Serialize))]
#[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
pub struct ModuleInfo {
    type_flags: Vec<TypeFlags>,
    functions: Vec<FunctionInfo>,
    entry_points: Vec<FunctionInfo>,
    const_expression_types: Box<[TypeResolution]>,
}

impl ops::Index<Handle<crate::Type>> for ModuleInfo {
    type Output = TypeFlags;
    fn index(&self, handle: Handle<crate::Type>) -> &Self::Output {
        &self.type_flags[handle.index()]
    }
}

impl ops::Index<Handle<crate::Function>> for ModuleInfo {
    type Output = FunctionInfo;
    fn index(&self, handle: Handle<crate::Function>) -> &Self::Output {
        &self.functions[handle.index()]
    }
}

impl ops::Index<Handle<crate::Expression>> for ModuleInfo {
    type Output = TypeResolution;
    fn index(&self, handle: Handle<crate::Expression>) -> &Self::Output {
        &self.const_expression_types[handle.index()]
    }
}

#[derive(Clone, Copy, Debug, Default, PartialEq, Eq)]
pub enum ValidationMode {
    Object,
    #[default]
    Executable,
}

#[derive(Debug)]
pub struct Validator {
    flags: ValidationFlags,
    mode: ValidationMode,
    types: Vec<r#type::TypeInfo>,
    layouter: Layouter,
    location_mask: BitSet,
    switch_values: FastHashSet<crate::SwitchValue>,
    valid_expression_list: Vec<Handle<crate::Expression>>,
    valid_expression_set: HandleSet<crate::Expression>,

    /// Treat overrides whose initializers are not fully-evaluated
    /// constant expressions as errors.
    overrides_resolved: bool,

    /// A checklist of expressions that must be visited by a specific kind of
    /// statement.
    ///
    /// For example:
    ///
    /// - [`CallResult`] expressions must be visited by a [`Call`] statement.
    /// - [`AtomicResult`] expressions must be visited by an [`Atomic`] statement.
    ///
    /// Be sure not to remove any [`Expression`] handle from this set unless
    /// you've explicitly checked that it is the right kind of expression for
    /// the visiting [`Statement`].
    ///
    /// [`CallResult`]: crate::Expression::CallResult
    /// [`Call`]: crate::Statement::Call
    /// [`AtomicResult`]: crate::Expression::AtomicResult
    /// [`Atomic`]: crate::Statement::Atomic
    /// [`Expression`]: crate::Expression
    /// [`Statement`]: crate::Statement
    needs_visit: HandleSet<crate::Expression>,
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum ConstantError {
    #[error("Initializer must be a const-expression")]
    InitializerExprType,
    #[error("The type doesn't match the constant")]
    InvalidType,
    #[error("The type is not constructible")]
    NonConstructibleType,
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum OverrideError {
    #[error("Override name and ID are missing")]
    MissingNameAndID,
    #[error("Initializer must be a const-expression or override-expression")]
    InitializerExprType,
    #[error("The type doesn't match the override")]
    InvalidType,
    #[error("The type is not constructible")]
    NonConstructibleType,
    #[error("The type is not a scalar")]
    TypeNotScalar,
    #[error("Override declarations are not allowed")]
    NotAllowed,
    #[error("Override is uninitialized")]
    UninitializedOverride,
    #[error("Constant expression {handle:?} is invalid")]
    ConstExpression {
        handle: Handle<crate::Expression>,
        source: ConstExpressionError,
    },
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum ValidationError {
    #[error(transparent)]
    InvalidHandle(#[from] InvalidHandleError),
    #[error(transparent)]
    Layouter(#[from] LayoutError),
    #[error("Type {handle:?} '{name}' is invalid")]
    Type {
        handle: Handle<crate::Type>,
        name: String,
        source: TypeError,
    },
    #[error("Constant expression {handle:?} is invalid")]
    ConstExpression {
        handle: Handle<crate::Expression>,
        source: ConstExpressionError,
    },
    #[error("Array size expression {handle:?} is not strictly positive")]
    ArraySizeError { handle: Handle<crate::Expression> },
    #[error("Constant {handle:?} '{name}' is invalid")]
    Constant {
        handle: Handle<crate::Constant>,
        name: String,
        source: ConstantError,
    },
    #[error("Override {handle:?} '{name}' is invalid")]
    Override {
        handle: Handle<crate::Override>,
        name: String,
        source: OverrideError,
    },
    #[error("Global variable {handle:?} '{name}' is invalid")]
    GlobalVariable {
        handle: Handle<crate::GlobalVariable>,
        name: String,
        source: GlobalVariableError,
    },
    #[error("Function {handle:?} '{name}' is invalid")]
    Function {
        handle: Handle<crate::Function>,
        name: String,
        source: FunctionError,
    },
    #[error("function `{name}` is imported, but an executable module cannot have imports")]
    Import {
        handle: Handle<crate::Function>,
        name: String,
    },
    #[error("imported function `{name}` has a body")]
    ImportWithBody {
        handle: Handle<crate::Function>,
        name: String,
    },
    #[error("Entry point {name} at {stage:?} is invalid")]
    EntryPoint {
        stage: crate::ShaderStage,
        name: String,
        source: EntryPointError,
    },
    #[error("Module is corrupted")]
    Corrupted,
}

impl crate::TypeInner {
    const fn is_sized(&self) -> bool {
        match *self {
            Self::Scalar { .. }
            | Self::Vector { .. }
            | Self::Matrix { .. }
            | Self::CooperativeMatrix { .. }
            | Self::LongVector { .. }
            | Self::TensorLayout { .. }
            | Self::TensorView { .. }
            | Self::Array {
                size: crate::ArraySize::Constant(_),
                ..
            }
            | Self::Atomic { .. }
            | Self::Pointer { .. }
            | Self::ValuePointer { .. }
            | Self::Struct { .. }
            | Self::Spirv { .. } => true,
            Self::Array { .. }
            | Self::Image { .. }
            | Self::SampledImage { .. }
            | Self::Sampler { .. }
            | Self::AccelerationStructure { .. }
            | Self::Tensor { .. }
            | Self::RayQuery { .. }
            | Self::HitObject { .. }
            | Self::BindingArray { .. }
            | Self::BufferDescriptor { .. } => false,
        }
    }

    fn addresses_image(&self, dim: crate::ImageDimension) -> bool {
        let dim = match dim {
            crate::ImageDimension::Buffer => crate::ImageDimension::D1,
            crate::ImageDimension::Cube => crate::ImageDimension::D3,
            crate::ImageDimension::TileImageData => return false,
            crate::ImageDimension::Subpass => {
                return matches!(
                    *self,
                    Self::Vector {
                        size: crate::VectorSize::Bi,
                        scalar: crate::Scalar::I32,
                    }
                );
            }
            crate::ImageDimension::D1 | crate::ImageDimension::D2 | crate::ImageDimension::D3 => {
                dim
            }
        };
        self.image_storage_coordinates() == Some(dim)
    }

    const fn image_storage_coordinates(&self) -> Option<crate::ImageDimension> {
        match *self {
            Self::Scalar(crate::Scalar { kind, .. }) => match kind {
                crate::ScalarKind::Sint | crate::ScalarKind::Uint => {
                    Some(crate::ImageDimension::D1)
                }
                crate::ScalarKind::Float
                | crate::ScalarKind::Bool
                | crate::ScalarKind::BFloat
                | crate::ScalarKind::FloatE4M3
                | crate::ScalarKind::FloatE5M2
                | crate::ScalarKind::FloatE2M1
                | crate::ScalarKind::FloatE3M2
                | crate::ScalarKind::FloatE2M3
                | crate::ScalarKind::FloatUE8M0
                | crate::ScalarKind::FloatMXINT8 => None,
            },
            Self::Vector {
                size,
                scalar: crate::Scalar { kind, .. },
            } => match (size, kind) {
                (crate::VectorSize::Bi, crate::ScalarKind::Sint | crate::ScalarKind::Uint) => {
                    Some(crate::ImageDimension::D2)
                }
                (crate::VectorSize::Tri, crate::ScalarKind::Sint | crate::ScalarKind::Uint) => {
                    Some(crate::ImageDimension::D3)
                }
                (crate::VectorSize::Quad, crate::ScalarKind::Sint | crate::ScalarKind::Uint)
                | (
                    crate::VectorSize::Bi | crate::VectorSize::Tri | crate::VectorSize::Quad,
                    crate::ScalarKind::Float
                    | crate::ScalarKind::Bool
                    | crate::ScalarKind::BFloat
                    | crate::ScalarKind::FloatE4M3
                    | crate::ScalarKind::FloatE5M2
                    | crate::ScalarKind::FloatE2M1
                    | crate::ScalarKind::FloatE3M2
                    | crate::ScalarKind::FloatE2M3
                    | crate::ScalarKind::FloatUE8M0
                    | crate::ScalarKind::FloatMXINT8,
                ) => None,
            },
            Self::Matrix { .. }
            | Self::CooperativeMatrix { .. }
            | Self::LongVector { .. }
            | Self::TensorLayout { .. }
            | Self::TensorView { .. }
            | Self::Tensor { .. }
            | Self::Atomic(_)
            | Self::Pointer { .. }
            | Self::ValuePointer { .. }
            | Self::Array { .. }
            | Self::Struct { .. }
            | Self::Image { .. }
            | Self::Sampler { .. }
            | Self::SampledImage { .. }
            | Self::AccelerationStructure
            | Self::RayQuery
            | Self::HitObject { .. }
            | Self::BindingArray { .. }
            | Self::BufferDescriptor { .. }
            | Self::Spirv { .. } => None,
        }
    }
}

pub(crate) const fn image_array_index_expected(
    dim: crate::ImageDimension,
    arrayed: bool,
    class: crate::ImageClass,
) -> bool {
    arrayed
        && !matches!(
            (dim, class),
            (
                crate::ImageDimension::Cube,
                crate::ImageClass::Storage { .. }
            )
        )
}

impl Validator {
    /// Create a validator for rglsl [`Module`]s.
    ///
    /// The `flags` argument indicates which stages of validation the
    /// returned `Validator` should perform. Skipping stages can make
    /// validation somewhat faster, but the validator may not reject some
    /// invalid modules. Regardless of `flags`, validation always returns
    /// a usable [`ModuleInfo`] value on success.
    ///
    /// [`Module`]: crate::Module
    pub fn new(flags: ValidationFlags) -> Self {
        Validator {
            flags,
            mode: ValidationMode::Executable,
            types: Vec::new(),
            layouter: Layouter::default(),
            location_mask: BitSet::new(),
            switch_values: FastHashSet::default(),
            valid_expression_list: Vec::new(),
            valid_expression_set: HandleSet::new(),
            overrides_resolved: false,
            needs_visit: HandleSet::new(),
        }
    }

    pub const fn mode(&mut self, mode: ValidationMode) -> &mut Self {
        self.mode = mode;
        self
    }

    /// Reset the validator internals
    pub fn reset(&mut self) {
        self.types.clear();
        self.layouter.clear();
        self.location_mask.make_empty();
        self.switch_values.clear();
        self.valid_expression_list.clear();
        self.valid_expression_set.clear();
    }

    fn validate_constant(
        &self,
        handle: Handle<crate::Constant>,
        gctx: crate::proc::GlobalCtx,
        mod_info: &ModuleInfo,
        global_expr_kind: &ExpressionKindTracker,
    ) -> Result<(), ConstantError> {
        let con = &gctx.constants[handle];

        let type_info = &self.types[con.ty.index()];
        if !type_info.flags.contains(TypeFlags::CONSTRUCTIBLE) {
            return Err(ConstantError::NonConstructibleType);
        }

        if !global_expr_kind.is_const(con.init) {
            return Err(ConstantError::InitializerExprType);
        }

        if !gctx.compare_types(&TypeResolution::Handle(con.ty), &mod_info[con.init]) {
            return Err(ConstantError::InvalidType);
        }

        Ok(())
    }

    fn validate_override(
        &mut self,
        handle: Handle<crate::Override>,
        gctx: crate::proc::GlobalCtx,
        mod_info: &ModuleInfo,
    ) -> Result<(), OverrideError> {
        let o = &gctx.overrides[handle];

        let type_info = &self.types[o.ty.index()];
        if !type_info.flags.contains(TypeFlags::CONSTRUCTIBLE) {
            return Err(OverrideError::NonConstructibleType);
        }

        let scalar = match gctx.types[o.ty].inner {
            crate::TypeInner::Scalar(scalar) => Some(scalar),
            crate::TypeInner::Vector { scalar, .. }
            | crate::TypeInner::Matrix { scalar, .. }
            | crate::TypeInner::CooperativeMatrix { scalar, .. } => {
                o.id.is_none().then_some(scalar)
            }
            crate::TypeInner::LongVector { .. }
            | crate::TypeInner::TensorLayout { .. }
            | crate::TypeInner::TensorView { .. }
            | crate::TypeInner::Tensor { .. }
            | crate::TypeInner::Atomic(_)
            | crate::TypeInner::Pointer { .. }
            | crate::TypeInner::ValuePointer { .. }
            | crate::TypeInner::Array { .. }
            | crate::TypeInner::Struct { .. }
            | crate::TypeInner::Image { .. }
            | crate::TypeInner::Sampler { .. }
            | crate::TypeInner::SampledImage { .. }
            | crate::TypeInner::AccelerationStructure
            | crate::TypeInner::RayQuery
            | crate::TypeInner::HitObject { .. }
            | crate::TypeInner::BindingArray { .. }
            | crate::TypeInner::BufferDescriptor { .. }
            | crate::TypeInner::Spirv { .. } => None,
        };
        let composite = o.id.is_none()
            && matches!(
                gctx.types[o.ty].inner,
                crate::TypeInner::Array { .. } | crate::TypeInner::Struct { .. }
            );
        match scalar {
            Some(
                crate::Scalar::BOOL
                | crate::Scalar::I16
                | crate::Scalar::U16
                | crate::Scalar::I8
                | crate::Scalar::U8
                | crate::Scalar::I64
                | crate::Scalar::U64
                | crate::Scalar::I32
                | crate::Scalar::U32
                | crate::Scalar::F16
                | crate::Scalar::F32
                | crate::Scalar::F64
                | crate::Scalar::BF16
                | crate::Scalar::FE4M3
                | crate::Scalar::FE5M2
                | crate::Scalar::FE2M1
                | crate::Scalar::FE3M2
                | crate::Scalar::FE2M3
                | crate::Scalar::FUE8M0
                | crate::Scalar::FMXINT8,
            ) => {}
            None if composite => {}
            _ => return Err(OverrideError::TypeNotScalar),
        }

        if let Some(init) = o.init {
            if !gctx.compare_types(&TypeResolution::Handle(o.ty), &mod_info[init]) {
                return Err(OverrideError::InvalidType);
            }
        } else if self.overrides_resolved {
            return Err(OverrideError::UninitializedOverride);
        }

        Ok(())
    }

    /// Check the given module to be valid.
    pub fn validate(
        &mut self,
        module: &crate::Module,
    ) -> Result<ModuleInfo, WithSpan<ValidationError>> {
        self.overrides_resolved = false;
        self.validate_impl(module)
            .map_err(|error| error.map_spans(|span| module.resolve_span(span)))
    }

    /// Check the given module to be valid, requiring overrides to be resolved.
    ///
    /// This is the same as [`validate`], except that any override
    /// whose value is not a fully-evaluated constant expression is
    /// treated as an error.
    ///
    /// [`validate`]: Validator::validate
    pub fn validate_resolved_overrides(
        &mut self,
        module: &crate::Module,
    ) -> Result<ModuleInfo, WithSpan<ValidationError>> {
        self.overrides_resolved = true;
        self.validate_impl(module)
            .map_err(|error| error.map_spans(|span| module.resolve_span(span)))
    }

    fn validate_impl(
        &mut self,
        module: &crate::Module,
    ) -> Result<ModuleInfo, WithSpan<ValidationError>> {
        self.reset();
        self.reset_types(module.types.len());

        Self::validate_module_handles(module).map_err(|e| e.with_span())?;

        self.layouter.update(module.to_ctx()).map_err(|e| {
            let handle = e.ty;
            ValidationError::from(e).with_span_handle(handle, &module.types)
        })?;

        // These should all get overwritten.
        let placeholder = TypeResolution::Value(crate::TypeInner::Scalar(crate::Scalar {
            kind: crate::ScalarKind::Bool,
            width: 0,
        }));

        let mut mod_info = ModuleInfo {
            type_flags: Vec::with_capacity(module.types.len()),
            functions: Vec::with_capacity(module.functions.len()),
            entry_points: Vec::with_capacity(module.entry_points.len()),
            const_expression_types: vec![placeholder; module.global_expressions.len()]
                .into_boxed_slice(),
        };

        for (handle, ty) in module.types.iter() {
            let ty_info = self
                .validate_type(handle, module.to_ctx())
                .map_err(|source| {
                    ValidationError::Type {
                        handle,
                        name: ty.name.clone().unwrap_or_default(),
                        source,
                    }
                    .with_span_handle(handle, &module.types)
                })?;
            debug_assert!(
                ty_info.flags.contains(TypeFlags::CONSTRUCTIBLE)
                    == module.types[handle]
                        .inner
                        .is_constructible_with(|component| self
                            .types
                            .get(component.index())
                            .is_some_and(|info| info.flags.contains(TypeFlags::CONSTRUCTIBLE)))
            );
            mod_info.type_flags.push(ty_info.flags);
            self.types[handle.index()] = ty_info;
        }

        for (handle, ty) in module.types.iter() {
            if let crate::TypeInner::Pointer {
                base,
                space: crate::AddressSpace::PhysicalStorage { .. },
            } = ty.inner
            {
                let data = self
                    .types
                    .get(base.index())
                    .is_some_and(|info| info.flags.contains(TypeFlags::DATA));
                if !data {
                    return Err(ValidationError::Type {
                        handle,
                        name: ty.name.clone().unwrap_or_default(),
                        source: TypeError::InvalidPhysicalPointee(base),
                    }
                    .with_span_handle(handle, &module.types));
                }
            }
        }

        let global_expr_kind = ExpressionKindTracker::from_arena(&module.global_expressions);

        {
            let t = crate::Arena::new();
            let resolve_context = crate::proc::ResolveContext::with_locals(module, &t, &[]);
            for (handle, _) in module.global_expressions.iter() {
                if !global_expr_kind.is_const_or_override(handle) {
                    return Err(ValidationError::ConstExpression {
                        handle,
                        source: ConstExpressionError::NonConstOrOverride,
                    }
                    .with_span_handle(handle, &module.global_expressions));
                }
                mod_info
                    .process_const_expression(handle, &resolve_context, module.to_ctx())
                    .map_err(|source| {
                        ValidationError::ConstExpression { handle, source }
                            .with_span_handle(handle, &module.global_expressions)
                    })?;
            }
        }

        if self.flags.contains(ValidationFlags::CONSTANTS) {
            for (handle, _) in module.global_expressions.iter() {
                self.validate_const_expression(
                    handle,
                    module.to_ctx(),
                    &mod_info,
                    &global_expr_kind,
                )
                .map_err(|source| {
                    ValidationError::ConstExpression { handle, source }
                        .with_span_handle(handle, &module.global_expressions)
                })?;
            }

            for (handle, constant) in module.constants.iter() {
                self.validate_constant(handle, module.to_ctx(), &mod_info, &global_expr_kind)
                    .map_err(|source| {
                        ValidationError::Constant {
                            handle,
                            name: constant.name.clone().unwrap_or_default(),
                            source,
                        }
                        .with_span_handle(handle, &module.constants)
                    })?;
            }

            for (handle, r#override) in module.overrides.iter() {
                self.validate_override(handle, module.to_ctx(), &mod_info)
                    .map_err(|source| {
                        ValidationError::Override {
                            handle,
                            name: r#override.name.clone().unwrap_or_default(),
                            source,
                        }
                        .with_span_handle(handle, &module.overrides)
                    })?;
            }
        }

        for (var_handle, var) in module.global_variables.iter() {
            self.validate_global_var(var, module.to_ctx(), &mod_info, &global_expr_kind)
                .map_err(|source| {
                    ValidationError::GlobalVariable {
                        handle: var_handle,
                        name: var.name.clone().unwrap_or_default(),
                        source,
                    }
                    .with_span_handle(var_handle, &module.global_variables)
                })?;
        }
        if self.mode == ValidationMode::Executable {
            let shared_block_count = module
                .global_variables
                .iter()
                .filter(|&(_, var)| {
                    var.space == crate::AddressSpace::WorkGroup
                        && var.block == Some(crate::BlockDeclaration::Shared)
                })
                .count();
            if shared_block_count > 0
                && let Some((var_handle, var)) = module.global_variables.iter().find(|&(_, var)| {
                    var.space == crate::AddressSpace::WorkGroup && var.block.is_none()
                })
            {
                return Err(ValidationError::GlobalVariable {
                    handle: var_handle,
                    name: var.name.clone().unwrap_or_default(),
                    source: GlobalVariableError::MixedWorkGroupLayout,
                }
                .with_span_handle(var_handle, &module.global_variables));
            }
            if shared_block_count > 1
                && !module.entry_points.is_empty()
                && let Some((var_handle, var)) = module.global_variables.iter().find(|&(_, var)| {
                    var.space == crate::AddressSpace::WorkGroup
                        && var.block == Some(crate::BlockDeclaration::Shared)
                        && var
                            .memory_decorations
                            .contains(crate::MemoryDecorations::RESTRICT)
                })
            {
                return Err(ValidationError::GlobalVariable {
                    handle: var_handle,
                    name: var.name.clone().unwrap_or_default(),
                    source: GlobalVariableError::RestrictOnAliasedWorkGroupBlock,
                }
                .with_span_handle(var_handle, &module.global_variables));
            }
        }

        for (handle, fun) in module.functions.iter() {
            if fun.linkage.is_import() {
                let name = fun.name.clone().unwrap_or_default();
                if self.mode == ValidationMode::Executable {
                    return Err(ValidationError::Import { handle, name }
                        .with_span_handle(handle, &module.functions));
                }
                if !fun.body.is_empty()
                    || !fun.expressions.is_empty()
                    || !fun.local_variables.is_empty()
                {
                    return Err(ValidationError::ImportWithBody { handle, name }
                        .with_span_handle(handle, &module.functions));
                }
            }
            match self.validate_function(fun, module, &mod_info, false) {
                Ok(info) => mod_info.functions.push(info),
                Err(error) => {
                    return Err(error.and_then(|source| {
                        ValidationError::Function {
                            handle,
                            name: fun.name.clone().unwrap_or_default(),
                            source,
                        }
                        .with_span_handle(handle, &module.functions)
                    }));
                }
            }
        }

        let mut ep_map = FastHashSet::default();
        for ep in module.entry_points.iter() {
            if !ep_map.insert((ep.stage, &ep.name)) {
                return Err(ValidationError::EntryPoint {
                    stage: ep.stage,
                    name: ep.name.clone(),
                    source: EntryPointError::Conflict,
                }
                .with_span()); // TODO: keep some EP span information?
            }

            if ep.function.linkage.is_import() {
                return Err(ValidationError::EntryPoint {
                    stage: ep.stage,
                    name: ep.name.clone(),
                    source: EntryPointError::Import,
                }
                .with_span());
            }
            match self.validate_entry_point(ep, module, &mod_info) {
                Ok(info) => mod_info.entry_points.push(info),
                Err(error) => {
                    return Err(error.and_then(|source| {
                        ValidationError::EntryPoint {
                            stage: ep.stage,
                            name: ep.name.clone(),
                            source,
                        }
                        .with_span()
                    }));
                }
            }
        }

        Ok(mod_info)
    }
}

fn validate_atomic_compare_exchange_struct(
    types: &crate::UniqueArena<crate::Type>,
    members: &[crate::StructMember],
    scalar_predicate: impl FnOnce(&crate::TypeInner) -> bool,
) -> bool {
    members.len() == 2
        && members[0].name.as_deref() == Some("old_value")
        && scalar_predicate(&types[members[0].ty].inner)
        && members[1].name.as_deref() == Some("exchanged")
        && types[members[1].ty].inner == crate::TypeInner::Scalar(crate::Scalar::BOOL)
}
