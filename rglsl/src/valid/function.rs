use alloc::{format, string::String};

use super::{
    analyzer::{UniformityDisruptor, UniformityRequirements},
    ExpressionError, FunctionInfo, ModuleInfo,
};
use crate::arena::{Arena, UniqueArena};
use crate::arena::{Handle, HandleSet};
use crate::proc::TypeResolution;
use crate::span::WithSpan;
use crate::span::{AddSpan as _, MapErrWithSpan as _};

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq))]
pub enum CallError {
    #[error("Argument {index} expression is invalid")]
    Argument {
        index: usize,
        source: ExpressionError,
    },
    #[error("Result expression {0:?} has already been introduced earlier")]
    ResultAlreadyInScope(Handle<crate::Expression>),
    #[error("Result expression {0:?} is populated by multiple `Call` statements")]
    ResultAlreadyPopulated(Handle<crate::Expression>),
    #[error("Requires {required} arguments, but {seen} are provided")]
    ArgumentCount { required: usize, seen: usize },
    #[error("Argument {index} value {seen_expression:?} doesn't match the type {required:?}")]
    ArgumentType {
        index: usize,
        required: Handle<crate::Type>,
        seen_expression: Handle<crate::Expression>,
    },
    #[error("The emitted expression doesn't match the call")]
    ExpressionMismatch(Option<Handle<crate::Expression>>),
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq))]
pub enum AtomicError {
    #[error("Pointer {0:?} to atomic is invalid.")]
    InvalidPointer(Handle<crate::Expression>),
    #[error("Address space {0:?} is not supported.")]
    InvalidAddressSpace(crate::AddressSpace),
    #[error("Operand {0:?} has invalid type.")]
    InvalidOperand(Handle<crate::Expression>),
    #[error("Operator {0:?} is not supported.")]
    InvalidOperator(crate::AtomicFunction),
    #[error("Result expression {0:?} is not an `AtomicResult` expression")]
    InvalidResultExpression(Handle<crate::Expression>),
    #[error("Result expression {0:?} is marked as an `exchange`")]
    ResultExpressionExchange(Handle<crate::Expression>),
    #[error("Result expression {0:?} is not marked as an `exchange`")]
    ResultExpressionNotExchange(Handle<crate::Expression>),
    #[error("Result type for {0:?} doesn't match the statement")]
    ResultTypeMismatch(Handle<crate::Expression>),
    #[error("Exchange operations must return a value")]
    MissingReturnValue,
    #[error("Capability {0:?} is required")]
    MissingCapability(super::Capabilities),
    #[error("Result expression {0:?} is populated by multiple `Atomic` statements")]
    ResultAlreadyPopulated(Handle<crate::Expression>),
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq))]
pub enum SubgroupError {
    #[error("Operand {0:?} has invalid type.")]
    InvalidOperand(Handle<crate::Expression>),
    #[error("Result type for {0:?} doesn't match the statement")]
    ResultTypeMismatch(Handle<crate::Expression>),
    #[error("Support for subgroup operation {0:?} is required")]
    UnsupportedOperation(super::SubgroupOperationSet),
    #[error("Unknown operation")]
    UnknownOperation,
    #[error("Invocation ID must be a const-expression")]
    InvalidInvocationIdExprType(Handle<crate::Expression>),
}

const fn is_bool(inner: &crate::TypeInner) -> bool {
    matches!(*inner, crate::TypeInner::Scalar(crate::Scalar::BOOL))
}

const fn is_u32(inner: &crate::TypeInner) -> bool {
    matches!(*inner, crate::TypeInner::Scalar(crate::Scalar::U32))
}

const fn is_ballot(inner: &crate::TypeInner) -> bool {
    matches!(
        *inner,
        crate::TypeInner::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar::U32,
        }
    )
}

const fn is_scalar_or_vector(inner: &crate::TypeInner) -> bool {
    matches!(
        *inner,
        crate::TypeInner::Scalar(_)
            | crate::TypeInner::Vector { .. }
            | crate::TypeInner::LongVector { .. }
    )
}

const fn is_numeric(inner: &crate::TypeInner) -> bool {
    match *inner {
        crate::TypeInner::Scalar(scalar)
        | crate::TypeInner::Vector { scalar, .. }
        | crate::TypeInner::LongVector { scalar, .. } => matches!(
            scalar.kind,
            crate::ScalarKind::Sint | crate::ScalarKind::Uint | crate::ScalarKind::Float
        ),
        _ => false,
    }
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq))]
pub enum LocalVariableError {
    #[error("Local variable has a type {0:?} that can't be stored in a local variable.")]
    InvalidType(Handle<crate::Type>),
    #[error("Initializer doesn't match the variable type")]
    InitializerType,
    #[error("Initializer is not a const or override expression")]
    NonConstOrOverrideInitializer,
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq))]
pub enum FunctionError {
    #[error("Expression {handle:?} is invalid")]
    Expression {
        handle: Handle<crate::Expression>,
        source: ExpressionError,
    },
    #[error("Expression {0:?} can't be introduced - it's already in scope")]
    ExpressionAlreadyInScope(Handle<crate::Expression>),
    #[error("Local variable {handle:?} '{name}' is invalid")]
    LocalVariable {
        handle: Handle<crate::LocalVariable>,
        name: String,
        source: LocalVariableError,
    },
    #[error("Argument '{name}' at index {index} has a type that can't be passed into functions.")]
    InvalidArgumentType { index: usize, name: String },
    #[error("The function's given return type cannot be returned from functions")]
    NonConstructibleReturnType,
    #[error("Argument '{name}' at index {index} is a pointer of space {space:?}, which can't be passed into functions.")]
    InvalidArgumentPointerSpace {
        index: usize,
        name: String,
        space: crate::AddressSpace,
    },
    #[error("The `break` is used outside of a `loop` or `switch` context")]
    BreakOutsideOfLoopOrSwitch,
    #[error("The `continue` is used outside of a `loop` context")]
    ContinueOutsideOfLoop,
    #[error("The `return` is called within a `continuing` block")]
    InvalidReturnSpot,
    #[error("The `return` expression {expression:?} does not match the declared return type {expected_ty:?}")]
    InvalidReturnType {
        expression: Option<Handle<crate::Expression>>,
        expected_ty: Option<Handle<crate::Type>>,
    },
    #[error("The `if` condition {0:?} is not a boolean scalar")]
    InvalidIfType(Handle<crate::Expression>),
    #[error("The `switch` value {0:?} is not an integer scalar")]
    InvalidSwitchType(Handle<crate::Expression>),
    #[error("Multiple `switch` cases for {0:?} are present")]
    ConflictingSwitchCase(crate::SwitchValue),
    #[error("The `switch` contains cases with conflicting types")]
    ConflictingCaseType,
    #[error("The `switch` is missing a `default` case")]
    MissingDefaultCase,
    #[error("Multiple `default` cases are present")]
    MultipleDefaultCases,
    #[error("The last `switch` case contains a `fallthrough`")]
    LastCaseFallTrough,
    #[error("The pointer {0:?} doesn't relate to a valid destination for a store")]
    InvalidStorePointer(Handle<crate::Expression>),
    #[error("Image store texture parameter type mismatch")]
    InvalidStoreTexture {
        actual: Handle<crate::Expression>,
        actual_ty: crate::TypeInner,
    },
    #[error("Image store value parameter type mismatch")]
    InvalidStoreValue {
        actual: Handle<crate::Expression>,
        actual_ty: crate::TypeInner,
        expected_ty: crate::TypeInner,
    },
    #[error("The type of {value:?} doesn't match the type stored in {pointer:?}")]
    InvalidStoreTypes {
        pointer: Handle<crate::Expression>,
        value: Handle<crate::Expression>,
    },
    #[error("Image store parameters are invalid")]
    InvalidImageStore(#[source] ExpressionError),
    #[error("Image atomic parameters are invalid")]
    InvalidImageAtomic(#[source] ExpressionError),
    #[error("Image atomic function is invalid")]
    InvalidImageAtomicFunction(crate::AtomicFunction),
    #[error("Image atomic value is invalid")]
    InvalidImageAtomicValue(Handle<crate::Expression>),
    #[error("Call to {function:?} is invalid")]
    InvalidCall {
        function: Handle<crate::Function>,
        #[source]
        error: CallError,
    },
    #[error("Atomic operation is invalid")]
    InvalidAtomic(#[from] AtomicError),
    #[error("Ray Query {0:?} is not a local variable")]
    InvalidRayQueryExpression(Handle<crate::Expression>),
    #[error("Acceleration structure {0:?} is not a matching expression")]
    InvalidAccelerationStructure(Handle<crate::Expression>),
    #[error(
        "Acceleration structure {0:?} is missing flag vertex_return while Ray Query {1:?} does"
    )]
    MissingAccelerationStructureVertexReturn(Handle<crate::Expression>, Handle<crate::Expression>),
    #[error("Ray Query {0:?} is missing flag vertex_return")]
    MissingRayQueryVertexReturn(Handle<crate::Expression>),
    #[error("Ray descriptor {0:?} is not a matching expression")]
    InvalidRayDescriptor(Handle<crate::Expression>),
    #[error("Ray Query {0:?} does not have a matching type")]
    InvalidRayQueryType(Handle<crate::Type>),
    #[error("Hit distance {0:?} must be an f32")]
    InvalidHitDistanceType(Handle<crate::Expression>),
    #[error("Shader requires capability {0:?}")]
    MissingCapability(super::Capabilities),
    #[error(
        "Required uniformity of control flow for {0:?} in {1:?} is not fulfilled because of {2:?}"
    )]
    NonUniformControlFlow(
        UniformityRequirements,
        Handle<crate::Expression>,
        UniformityDisruptor,
    ),
    #[error("Functions that are not entry points cannot have `@location` or `@builtin` attributes on their arguments: \"{name}\" has attributes")]
    PipelineInputRegularFunction { name: String },
    #[error("Functions that are not entry points cannot have `@location` or `@builtin` attributes on their return value types")]
    PipelineOutputRegularFunction,
    #[error("Required uniformity for WorkGroupUniformLoad is not fulfilled because of {0:?}")]
    // The actual load statement will be "pointed to" by the span
    NonUniformWorkgroupUniformLoad(UniformityDisruptor),
    // This is only possible with a misbehaving frontend
    #[error("The expression {0:?} for a WorkGroupUniformLoad isn't a WorkgroupUniformLoadResult")]
    WorkgroupUniformLoadExpressionMismatch(Handle<crate::Expression>),
    #[error("The expression {0:?} is not valid as a WorkGroupUniformLoad argument. It should be a Pointer in Workgroup address space")]
    WorkgroupUniformLoadInvalidPointer(Handle<crate::Expression>),
    #[error("Subgroup operation is invalid")]
    InvalidSubgroup(#[from] SubgroupError),
    #[error("Invalid target type for a cooperative store")]
    InvalidCooperativeStoreTarget(Handle<crate::Expression>),
    #[error("Cooperative load/store data pointer has invalid type")]
    InvalidCooperativeDataPointer(Handle<crate::Expression>),
    #[error("Emit statement should not cover \"result\" expressions like {0:?}")]
    EmitResult(Handle<crate::Expression>),
    #[error("Expression not visited by the appropriate statement")]
    UnvisitedExpression(Handle<crate::Expression>),
    #[error("Expression {0:?} in mesh shader intrinsic call should be `u32` (is the expression a signed integer?)")]
    InvalidMeshFunctionCall(Handle<crate::Expression>),

    #[error("Mesh output types differ from {0:?} to {1:?}")]
    ConflictingMeshOutputTypes(Handle<crate::Expression>, Handle<crate::Expression>),
    #[error("Task payload variables differ from {0:?} to {1:?}")]
    ConflictingTaskPayloadVariables(Handle<crate::Expression>, Handle<crate::Expression>),
    #[error("Mesh shader output at {0:?} is not a user-defined struct")]
    InvalidMeshShaderOutputType(Handle<crate::Expression>),
    #[error("The payload type passed to `traceRay` must be a pointer")]
    InvalidPayloadType,
    #[error("The payload type passed to `traceRay` must be a pointer with an address space of `ray_payload` or `incoming_ray_payload`, instead got {0:?}")]
    InvalidPayloadAddressSpace(crate::AddressSpace),
    #[error("The ray tracing operand {0:?} has the wrong type")]
    InvalidRayOperand(Handle<crate::Expression>),
    #[error("The payload passed to `traceRay` must be a pointer directly to a global variable")]
    PayloadPointerNotGlobal,
    #[error("Expression {0:?} is not a pointer to a hit object")]
    InvalidHitObjectExpression(Handle<crate::Expression>),
    #[error("This hit object operation is not available for {0:?} hit objects")]
    InvalidHitObjectOperation(crate::HitObjectKind),
    #[error("The message type {0:?} of an abort does not hold its message and arguments")]
    InvalidAbortMessage(Handle<crate::Type>),
    #[error("Invalid operand {0:?} of a tensor write")]
    InvalidTensorWrite(Handle<crate::Expression>),
    #[error("The argument {0:?} of an abort does not match its message type")]
    InvalidAbortArgument(Handle<crate::Expression>),
}

fn logically_matches(
    types: &UniqueArena<crate::Type>,
    left: Handle<crate::Type>,
    right: Handle<crate::Type>,
) -> bool {
    use crate::TypeInner as Ti;
    if left == right {
        return true;
    }
    match (&types[left].inner, &types[right].inner) {
        (
            &Ti::Array {
                base: left_base,
                size: left_size,
                ..
            },
            &Ti::Array {
                base: right_base,
                size: right_size,
                ..
            },
        ) => left_size == right_size && logically_matches(types, left_base, right_base),
        (
            &Ti::Struct {
                members: ref left_members,
                ..
            },
            &Ti::Struct {
                members: ref right_members,
                ..
            },
        ) => {
            left_members.len() == right_members.len()
                && left_members
                    .iter()
                    .zip(right_members)
                    .all(|(left, right)| logically_matches(types, left.ty, right.ty))
        }
        (left, right) => left == right,
    }
}

pub(crate) fn abort_message_length(message: &str) -> u32 {
    let length = u32::try_from(message.len()).unwrap_or(u32::MAX - 4);
    (length + 1).next_multiple_of(4)
}

bitflags::bitflags! {
    #[repr(transparent)]
    #[derive(Clone, Copy)]
    struct ControlFlowAbility: u8 {
        /// The control can return out of this block.
        const RETURN = 0x1;
        /// The control can break.
        const BREAK = 0x2;
        /// The control can continue.
        const CONTINUE = 0x4;
    }
}

struct BlockInfo {
    stages: super::ShaderStages,
}

struct BlockContext<'a> {
    abilities: ControlFlowAbility,
    info: &'a FunctionInfo,
    expressions: &'a Arena<crate::Expression>,
    types: &'a UniqueArena<crate::Type>,
    global_vars: &'a Arena<crate::GlobalVariable>,
    functions: &'a Arena<crate::Function>,
    prev_infos: &'a [FunctionInfo],
    return_type: Option<Handle<crate::Type>>,
}

impl<'a> BlockContext<'a> {
    fn new(
        fun: &'a crate::Function,
        module: &'a crate::Module,
        info: &'a FunctionInfo,
        prev_infos: &'a [FunctionInfo],
    ) -> Self {
        Self {
            abilities: ControlFlowAbility::RETURN,
            info,
            expressions: &fun.expressions,
            types: &module.types,
            global_vars: &module.global_variables,
            functions: &module.functions,
            prev_infos,
            return_type: fun.result.as_ref().map(|fr| fr.ty),
        }
    }

    const fn with_abilities(&self, abilities: ControlFlowAbility) -> Self {
        BlockContext { abilities, ..*self }
    }

    fn heap_image(
        &self,
        image: Handle<crate::Expression>,
    ) -> Option<(Handle<crate::GlobalVariable>, Handle<crate::Type>)> {
        let crate::Expression::Load { pointer } = *self.get_expression(image) else {
            return None;
        };
        let mut current = pointer;
        let global = loop {
            match *self.get_expression(current) {
                crate::Expression::Access { base, .. }
                | crate::Expression::AccessIndex { base, .. }
                | crate::Expression::HeapOffset { pointer: base, .. } => current = base,
                crate::Expression::GlobalVariable(global) => break global,
                _ => return None,
            }
        };
        match *self.resolve_pointer_type(pointer) {
            crate::TypeInner::Pointer {
                base,
                space: crate::AddressSpace::DescriptorHeap(_),
            } => Some((global, base)),
            _ => None,
        }
    }

    fn get_expression(&self, handle: Handle<crate::Expression>) -> &'a crate::Expression {
        &self.expressions[handle]
    }

    fn resolve_type_impl(
        &self,
        handle: Handle<crate::Expression>,
        valid_expressions: &HandleSet<crate::Expression>,
    ) -> Result<&TypeResolution, WithSpan<ExpressionError>> {
        if !valid_expressions.contains(handle) {
            Err(ExpressionError::NotInScope.with_span_handle(handle, self.expressions))
        } else {
            Ok(&self.info[handle].ty)
        }
    }

    fn resolve_type(
        &self,
        handle: Handle<crate::Expression>,
        valid_expressions: &HandleSet<crate::Expression>,
    ) -> Result<&TypeResolution, WithSpan<FunctionError>> {
        self.resolve_type_impl(handle, valid_expressions)
            .map_err_inner(|source| FunctionError::Expression { handle, source }.with_span())
    }

    fn resolve_type_inner(
        &self,
        handle: Handle<crate::Expression>,
        valid_expressions: &HandleSet<crate::Expression>,
    ) -> Result<&crate::TypeInner, WithSpan<FunctionError>> {
        self.resolve_type(handle, valid_expressions)
            .map(|tr| tr.inner_with(self.types))
    }

    fn resolve_pointer_type(&self, handle: Handle<crate::Expression>) -> &crate::TypeInner {
        self.info[handle].ty.inner_with(self.types)
    }

    fn compare_types(&self, lhs: &TypeResolution, rhs: &TypeResolution) -> bool {
        crate::proc::compare_types(lhs, rhs, self.types)
    }
}

impl super::Validator {
    fn validate_call(
        &mut self,
        function: Handle<crate::Function>,
        arguments: &[Handle<crate::Expression>],
        result: Option<Handle<crate::Expression>>,
        context: &BlockContext,
    ) -> Result<super::ShaderStages, WithSpan<CallError>> {
        let fun = &context.functions[function];
        if fun.arguments.len() != arguments.len() {
            return Err(CallError::ArgumentCount {
                required: fun.arguments.len(),
                seen: arguments.len(),
            }
            .with_span());
        }
        for (index, (arg, &expr)) in fun.arguments.iter().zip(arguments).enumerate() {
            let ty = context
                .resolve_type_impl(expr, &self.valid_expression_set)
                .map_err_inner(|source| {
                    CallError::Argument { index, source }
                        .with_span_handle(expr, context.expressions)
                })?;
            if !context.compare_types(&TypeResolution::Handle(arg.ty), ty) {
                return Err(CallError::ArgumentType {
                    index,
                    required: arg.ty,
                    seen_expression: expr,
                }
                .with_span_handle(expr, context.expressions));
            }
        }

        if let Some(expr) = result {
            if self.valid_expression_set.insert(expr) {
                self.valid_expression_list.push(expr);
            } else {
                return Err(CallError::ResultAlreadyInScope(expr)
                    .with_span_handle(expr, context.expressions));
            }
            match context.expressions[expr] {
                crate::Expression::CallResult(callee)
                    if fun.result.is_some() && callee == function =>
                {
                    if !self.needs_visit.remove(expr) {
                        return Err(CallError::ResultAlreadyPopulated(expr)
                            .with_span_handle(expr, context.expressions));
                    }
                }
                _ => {
                    return Err(CallError::ExpressionMismatch(result)
                        .with_span_handle(expr, context.expressions))
                }
            }
        } else if fun.result.is_some() {
            return Err(CallError::ExpressionMismatch(result).with_span());
        }

        let callee_info = &context.prev_infos[function.index()];
        Ok(callee_info.available_stages)
    }

    fn emit_expression(
        &mut self,
        handle: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        if self.valid_expression_set.insert(handle) {
            self.valid_expression_list.push(handle);
            Ok(())
        } else {
            Err(FunctionError::ExpressionAlreadyInScope(handle)
                .with_span_handle(handle, context.expressions))
        }
    }

    fn validate_texel(
        &self,
        texel: &crate::Texel,
        context: &BlockContext,
    ) -> Result<(crate::StorageFormat, crate::StorageAccess), WithSpan<FunctionError>> {
        let image = texel.image;
        let is_handle = match *context.get_expression(image) {
            crate::Expression::GlobalVariable(_) | crate::Expression::FunctionArgument(_) => true,
            crate::Expression::Access { base, .. }
            | crate::Expression::AccessIndex { base, .. } => {
                matches!(
                    *context.get_expression(base),
                    crate::Expression::GlobalVariable(_)
                )
            }
            _ => context.heap_image(image).is_some(),
        };
        if !is_handle {
            return Err(
                FunctionError::InvalidImageAtomic(ExpressionError::ExpectedGlobalVariable)
                    .with_span_handle(image, context.expressions),
            );
        }
        let crate::TypeInner::Image {
            class,
            arrayed,
            dim,
        } = *context.resolve_type_inner(image, &self.valid_expression_set)?
        else {
            return Err(
                FunctionError::InvalidImageAtomic(ExpressionError::ExpectedGlobalVariable)
                    .with_span_handle(image, context.expressions),
            );
        };
        let crate::ImageClass::Storage {
            format,
            access,
            multi,
        } = class
        else {
            return Err(
                FunctionError::InvalidImageAtomic(ExpressionError::InvalidImageClass(class))
                    .with_span_handle(image, context.expressions),
            );
        };
        if !context
            .resolve_type_inner(texel.coordinate, &self.valid_expression_set)?
            .addresses_image(dim)
        {
            return Err(FunctionError::InvalidImageAtomic(
                ExpressionError::InvalidImageCoordinateType(dim, texel.coordinate),
            )
            .with_span_handle(texel.coordinate, context.expressions));
        }
        if arrayed != texel.array_index.is_some() {
            return Err(
                FunctionError::InvalidImageAtomic(ExpressionError::InvalidImageArrayIndex)
                    .with_span_handle(texel.coordinate, context.expressions),
            );
        }
        for index in texel.array_index.into_iter().chain(texel.sample) {
            if !matches!(
                *context.resolve_type_inner(index, &self.valid_expression_set)?,
                crate::TypeInner::Scalar(crate::Scalar {
                    kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                    width: 4,
                })
            ) {
                return Err(FunctionError::InvalidImageAtomic(
                    ExpressionError::InvalidImageOtherIndexType(index),
                )
                .with_span_handle(index, context.expressions));
            }
        }
        match (texel.sample, multi) {
            (Some(_), true) | (None, false) => {}
            (Some(_), false) => {
                return Err(FunctionError::InvalidImageAtomic(
                    ExpressionError::InvalidImageSampleSelector,
                )
                .with_span_handle(image, context.expressions));
            }
            (None, true) => {
                return Err(FunctionError::InvalidImageAtomic(
                    ExpressionError::MissingImageSampleSelector,
                )
                .with_span_handle(image, context.expressions));
            }
        }
        Ok((format, access))
    }

    fn validate_atomic_location(
        &self,
        location: &crate::AtomicLocation,
        context: &BlockContext,
    ) -> Result<crate::Scalar, WithSpan<FunctionError>> {
        match *location {
            crate::AtomicLocation::Pointer(pointer) => {
                let scalar =
                    match *context.resolve_type_inner(pointer, &self.valid_expression_set)? {
                        crate::TypeInner::Pointer { base, .. } => match context.types[base].inner {
                            crate::TypeInner::Atomic(scalar) | crate::TypeInner::Scalar(scalar) => {
                                Some(scalar)
                            }
                            _ => None,
                        },
                        crate::TypeInner::ValuePointer {
                            size: None, scalar, ..
                        } => Some(scalar),
                        _ => None,
                    };
                match scalar {
                    Some(
                        scalar @ crate::Scalar {
                            kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                            width: 4 | 8,
                        },
                    ) => Ok(scalar),
                    _ => Err(AtomicError::InvalidPointer(pointer)
                        .with_span_handle(pointer, context.expressions)
                        .into_other()),
                }
            }
            crate::AtomicLocation::Texel(ref texel) => {
                let (format, _) = self.validate_texel(texel, context)?;
                match format {
                    crate::StorageFormat::R32Sint
                    | crate::StorageFormat::R32Uint
                    | crate::StorageFormat::R32Float
                    | crate::StorageFormat::R64Uint => Ok(format.into()),
                    _ => Err(FunctionError::InvalidImageAtomic(
                        ExpressionError::InvalidImageFormat(format),
                    )
                    .with_span_handle(texel.image, context.expressions)),
                }
            }
        }
    }

    fn validate_atomic_result(
        &mut self,
        result: Handle<crate::Expression>,
        scalar: crate::Scalar,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let crate::Expression::AtomicResult {
            ty,
            comparison: false,
        } = context.expressions[result]
        else {
            return Err(AtomicError::InvalidResultExpression(result)
                .with_span_handle(result, context.expressions)
                .into_other());
        };
        if !self.needs_visit.remove(result) {
            return Err(AtomicError::ResultAlreadyPopulated(result)
                .with_span_handle(result, context.expressions)
                .into_other());
        }
        if context.types[ty].inner != crate::TypeInner::Scalar(scalar) {
            return Err(AtomicError::ResultTypeMismatch(result)
                .with_span_handle(result, context.expressions)
                .into_other());
        }
        self.emit_expression(result, context)
    }

    fn validate_atomic(
        &mut self,
        pointer: Handle<crate::Expression>,
        fun: &crate::AtomicFunction,
        value: Handle<crate::Expression>,
        result: Option<Handle<crate::Expression>>,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        // The `pointer` operand must be a pointer to an atomic value.
        let pointer_inner = context.resolve_type_inner(pointer, &self.valid_expression_set)?;
        let (pointer_scalar, pointer_space) = match *pointer_inner {
            crate::TypeInner::Pointer { base, space } => match context.types[base].inner {
                crate::TypeInner::Atomic(scalar) => (scalar, space),
                crate::TypeInner::Scalar(
                    scalar @ crate::Scalar {
                        kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                        width: 4 | 8,
                    },
                ) => (scalar, space),
                ref other => {
                    log::error!("Atomic pointer to type {other:?}");
                    return Err(AtomicError::InvalidPointer(pointer)
                        .with_span_handle(pointer, context.expressions)
                        .into_other());
                }
            },
            crate::TypeInner::ValuePointer {
                size: None,
                scalar:
                    scalar @ crate::Scalar {
                        kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                        width: 4 | 8,
                    },
                space,
            } => (scalar, space),
            ref other => {
                log::error!("Atomic operation on type {other:?}");
                return Err(AtomicError::InvalidPointer(pointer)
                    .with_span_handle(pointer, context.expressions)
                    .into_other());
            }
        };

        // The `value` operand must be a scalar of the same type as the atomic.
        let value_inner = context.resolve_type_inner(value, &self.valid_expression_set)?;
        let crate::TypeInner::Scalar(value_scalar) = *value_inner else {
            log::error!("Atomic operand type {:?}", *value_inner);
            return Err(AtomicError::InvalidOperand(value)
                .with_span_handle(value, context.expressions)
                .into_other());
        };
        if pointer_scalar != value_scalar {
            log::error!("Atomic operand type {:?}", *value_inner);
            return Err(AtomicError::InvalidOperand(value)
                .with_span_handle(value, context.expressions)
                .into_other());
        }

        match pointer_scalar {
            // Check for the special restrictions on 64-bit atomic operations.
            //
            // We don't need to consider other widths here: this function has already checked
            // that `pointer`'s type is an `Atomic`, and `validate_type` has already checked
            // that `Atomic` type has a permitted scalar width.
            crate::Scalar::I64 | crate::Scalar::U64 => {
                // `Capabilities::SHADER_INT64_ATOMIC_ALL_OPS` enables all sorts of 64-bit
                // atomic operations.
                if self
                    .capabilities
                    .contains(super::Capabilities::SHADER_INT64_ATOMIC_ALL_OPS)
                {
                    // okay
                } else {
                    // `Capabilities::SHADER_INT64_ATOMIC_MIN_MAX` allows `Min` and
                    // `Max` on operations in `Storage`, without a return value.
                    if matches!(
                        *fun,
                        crate::AtomicFunction::Min | crate::AtomicFunction::Max
                    ) && matches!(pointer_space, crate::AddressSpace::Storage { .. })
                        && result.is_none()
                    {
                        if !self
                            .capabilities
                            .contains(super::Capabilities::SHADER_INT64_ATOMIC_MIN_MAX)
                        {
                            log::error!("Int64 min-max atomic operations are not supported");
                            return Err(AtomicError::MissingCapability(
                                super::Capabilities::SHADER_INT64_ATOMIC_MIN_MAX,
                            )
                            .with_span_handle(value, context.expressions)
                            .into_other());
                        }
                    } else {
                        // Otherwise, we require the full 64-bit atomic capability.
                        log::error!("Int64 atomic operations are not supported");
                        return Err(AtomicError::MissingCapability(
                            super::Capabilities::SHADER_INT64_ATOMIC_ALL_OPS,
                        )
                        .with_span_handle(value, context.expressions)
                        .into_other());
                    }
                }
            }
            // Check for the special restrictions on 32-bit floating-point atomic operations.
            crate::Scalar::F32 => {
                // `Capabilities::SHADER_FLOAT32_ATOMIC` allows 32-bit floating-point
                // atomic operations `Add`, `Subtract`, and `Exchange`
                // in the `Storage` address space.
                if !self
                    .capabilities
                    .contains(super::Capabilities::SHADER_FLOAT32_ATOMIC)
                {
                    log::error!("Float32 atomic operations are not supported");
                    return Err(AtomicError::MissingCapability(
                        super::Capabilities::SHADER_FLOAT32_ATOMIC,
                    )
                    .with_span_handle(value, context.expressions)
                    .into_other());
                }
                if !matches!(
                    *fun,
                    crate::AtomicFunction::Add
                        | crate::AtomicFunction::Subtract
                        | crate::AtomicFunction::Exchange { compare: None }
                ) {
                    log::error!("Float32 atomic operation {fun:?} is not supported");
                    return Err(AtomicError::InvalidOperator(*fun)
                        .with_span_handle(value, context.expressions)
                        .into_other());
                }
                if !matches!(pointer_space, crate::AddressSpace::Storage { .. }) {
                    log::error!(
                        "Float32 atomic operations are only supported in the Storage address space"
                    );
                    return Err(AtomicError::InvalidAddressSpace(pointer_space)
                        .with_span_handle(value, context.expressions)
                        .into_other());
                }
            }
            _ => {}
        }

        // The result expression must be appropriate to the operation.
        match result {
            Some(result) => {
                // The `result` handle must refer to an `AtomicResult` expression.
                let crate::Expression::AtomicResult {
                    ty: result_ty,
                    comparison,
                } = context.expressions[result]
                else {
                    return Err(AtomicError::InvalidResultExpression(result)
                        .with_span_handle(result, context.expressions)
                        .into_other());
                };

                // Note that this expression has been visited by the proper kind
                // of statement.
                if !self.needs_visit.remove(result) {
                    return Err(AtomicError::ResultAlreadyPopulated(result)
                        .with_span_handle(result, context.expressions)
                        .into_other());
                }

                // The constraints on the result type depend on the atomic function.
                if let crate::AtomicFunction::Exchange {
                    compare: Some(compare),
                } = *fun
                {
                    // The comparison value must be a scalar of the same type as the
                    // atomic we're operating on.
                    let compare_inner =
                        context.resolve_type_inner(compare, &self.valid_expression_set)?;
                    if !compare_inner.non_struct_equivalent(value_inner, context.types) {
                        log::error!(
                            "Atomic exchange comparison has a different type from the value"
                        );
                        return Err(AtomicError::InvalidOperand(compare)
                            .with_span_handle(compare, context.expressions)
                            .into_other());
                    }

                    // The result expression must be an `__atomic_compare_exchange_result`
                    // struct whose `old_value` member is of the same type as the atomic
                    // we're operating on.
                    let crate::TypeInner::Struct { ref members, .. } =
                        context.types[result_ty].inner
                    else {
                        return Err(AtomicError::ResultTypeMismatch(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    };
                    if !super::validate_atomic_compare_exchange_struct(
                        context.types,
                        members,
                        |ty: &crate::TypeInner| *ty == crate::TypeInner::Scalar(pointer_scalar),
                    ) {
                        return Err(AtomicError::ResultTypeMismatch(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    }

                    // The result expression must be for a comparison operation.
                    if !comparison {
                        return Err(AtomicError::ResultExpressionNotExchange(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    }
                } else {
                    // The result expression must be a scalar of the same type as the
                    // atomic we're operating on.
                    let result_inner = &context.types[result_ty].inner;
                    if !result_inner.non_struct_equivalent(value_inner, context.types) {
                        return Err(AtomicError::ResultTypeMismatch(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    }

                    // The result expression must not be for a comparison.
                    if comparison {
                        return Err(AtomicError::ResultExpressionExchange(result)
                            .with_span_handle(result, context.expressions)
                            .into_other());
                    }
                }
                self.emit_expression(result, context)?;
            }

            None => {
                // Exchange operations must always produce a value.
                if let crate::AtomicFunction::Exchange { compare: None } = *fun {
                    log::error!("Atomic exchange's value is unused");
                    return Err(AtomicError::MissingReturnValue
                        .with_span_static(span, "atomic exchange operation")
                        .into_other());
                }
            }
        }

        Ok(())
    }
    fn subgroup_operand(
        &self,
        operand: Handle<crate::Expression>,
        context: &BlockContext,
        accept: fn(&crate::TypeInner) -> bool,
    ) -> Result<(), WithSpan<FunctionError>> {
        let inner = context.resolve_type_inner(operand, &self.valid_expression_set)?;
        if accept(inner) {
            Ok(())
        } else {
            log::error!("Subgroup operand type {inner:?}");
            Err(SubgroupError::InvalidOperand(operand)
                .with_span_handle(operand, context.expressions)
                .into_other())
        }
    }

    fn subgroup_result(
        &mut self,
        result: Handle<crate::Expression>,
        context: &BlockContext,
        accept: impl Fn(&crate::TypeInner) -> bool,
    ) -> Result<(), WithSpan<FunctionError>> {
        self.emit_expression(result, context)?;
        match context.expressions[result] {
            crate::Expression::SubgroupOperationResult { ty }
                if accept(&context.types[ty].inner) =>
            {
                Ok(())
            }
            _ => Err(SubgroupError::ResultTypeMismatch(result)
                .with_span_handle(result, context.expressions)
                .into_other()),
        }
    }

    fn validate_collective_operation(
        &self,
        collective_op: &crate::CollectiveOperation,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::CollectiveOperation as co;
        match *collective_op {
            co::Reduce | co::InclusiveScan | co::ExclusiveScan => Ok(()),
            co::ClusteredReduce(size) if size.is_power_of_two() => Ok(()),
            co::ClusteredReduce(_) => Err(SubgroupError::UnknownOperation.with_span().into_other()),
            co::PartitionedReduce(ballot)
            | co::PartitionedInclusiveScan(ballot)
            | co::PartitionedExclusiveScan(ballot) => {
                self.subgroup_operand(ballot, context, is_ballot)
            }
        }
    }

    fn validate_subgroup_operation(
        &mut self,
        op: &crate::SubgroupOperation,
        collective_op: &crate::CollectiveOperation,
        argument: Handle<crate::Expression>,
        result: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let argument_inner = context.resolve_type_inner(argument, &self.valid_expression_set)?;

        let (is_scalar, scalar) = match *argument_inner {
            crate::TypeInner::Scalar(scalar) => (true, scalar),
            crate::TypeInner::Vector { scalar, .. }
            | crate::TypeInner::LongVector { scalar, .. } => (false, scalar),
            _ => {
                log::error!("Subgroup operand type {argument_inner:?}");
                return Err(SubgroupError::InvalidOperand(argument)
                    .with_span_handle(argument, context.expressions)
                    .into_other());
            }
        };

        use crate::ScalarKind as sk;
        use crate::SubgroupOperation as sg;
        match (scalar.kind, *op) {
            (sk::Bool, sg::All | sg::Any) if is_scalar => {}
            (sk::Sint | sk::Uint | sk::Float, sg::Add | sg::Mul | sg::Min | sg::Max) => {}
            (sk::Sint | sk::Uint | sk::Bool, sg::And | sg::Or | sg::Xor) => {}

            (_, _) => {
                log::error!("Subgroup operand type {argument_inner:?}");
                return Err(SubgroupError::InvalidOperand(argument)
                    .with_span_handle(argument, context.expressions)
                    .into_other());
            }
        };

        if matches!(*op, sg::All | sg::Any) && *collective_op != crate::CollectiveOperation::Reduce
        {
            return Err(SubgroupError::UnknownOperation.with_span().into_other());
        }
        self.validate_collective_operation(collective_op, context)?;

        let argument_inner = argument_inner.clone();
        self.subgroup_result(result, context, |inner| *inner == argument_inner)
    }

    fn validate_subgroup_gather(
        &mut self,
        mode: &crate::GatherMode,
        argument: Handle<crate::Expression>,
        result: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        if let Some(index) = mode.index() {
            self.subgroup_operand(index, context, is_u32)?;
        }
        if let crate::GatherMode::Rotate {
            cluster_size: Some(size),
            ..
        } = *mode
        {
            if !size.is_power_of_two() {
                return Err(SubgroupError::UnknownOperation.with_span().into_other());
            }
        }
        self.subgroup_operand(argument, context, is_scalar_or_vector)?;
        let argument_inner = context
            .resolve_type_inner(argument, &self.valid_expression_set)?
            .clone();
        self.subgroup_result(result, context, |inner| *inner == argument_inner)
    }

    fn validate_subgroup_function(
        &mut self,
        fun: &crate::SubgroupFunction,
        result: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::SubgroupFunction as Sf;
        let same_as = |value: Handle<crate::Expression>| {
            context
                .resolve_type_inner(value, &self.valid_expression_set)
                .cloned()
        };
        match *fun {
            Sf::Elect => self.subgroup_result(result, context, is_bool),
            Sf::AllEqual(value) => {
                self.subgroup_operand(value, context, is_scalar_or_vector)?;
                self.subgroup_result(result, context, is_bool)
            }
            Sf::QuadAll(value)
            | Sf::QuadAny(value)
            | Sf::KhrAll(value)
            | Sf::KhrAny(value)
            | Sf::KhrAllEqual(value) => {
                self.subgroup_operand(value, context, is_bool)?;
                self.subgroup_result(result, context, is_bool)
            }
            Sf::InverseBallot(ballot) => {
                self.subgroup_operand(ballot, context, is_ballot)?;
                self.subgroup_result(result, context, is_bool)
            }
            Sf::BallotBitExtract { ballot, index } => {
                self.subgroup_operand(ballot, context, is_ballot)?;
                self.subgroup_operand(index, context, is_u32)?;
                self.subgroup_result(result, context, is_bool)
            }
            Sf::BallotBitCount {
                ballot,
                ref collective_op,
            } => {
                self.subgroup_operand(ballot, context, is_ballot)?;
                if !matches!(
                    *collective_op,
                    crate::CollectiveOperation::Reduce
                        | crate::CollectiveOperation::InclusiveScan
                        | crate::CollectiveOperation::ExclusiveScan
                ) {
                    return Err(SubgroupError::UnknownOperation.with_span().into_other());
                }
                self.subgroup_result(result, context, is_u32)
            }
            Sf::BallotFindLsb(ballot) | Sf::BallotFindMsb(ballot) => {
                self.subgroup_operand(ballot, context, is_ballot)?;
                self.subgroup_result(result, context, is_u32)
            }
            Sf::Partition(value) => {
                self.subgroup_operand(value, context, is_scalar_or_vector)?;
                self.subgroup_result(result, context, is_ballot)
            }
            Sf::KhrBallot(value) => {
                self.subgroup_operand(value, context, is_bool)?;
                self.subgroup_result(result, context, is_ballot)
            }
            Sf::KhrReadInvocation { argument, index } => {
                self.subgroup_operand(argument, context, is_numeric)?;
                self.subgroup_operand(index, context, is_u32)?;
                let expected = same_as(argument)?;
                self.subgroup_result(result, context, |inner| *inner == expected)
            }
            Sf::KhrReadFirstInvocation(argument) => {
                self.subgroup_operand(argument, context, is_numeric)?;
                let expected = same_as(argument)?;
                self.subgroup_result(result, context, |inner| *inner == expected)
            }
            Sf::Group {
                op,
                ref collective_op,
                argument,
                non_uniform: _,
            } => {
                if !matches!(
                    op,
                    crate::SubgroupOperation::Add
                        | crate::SubgroupOperation::Min
                        | crate::SubgroupOperation::Max
                ) || !matches!(
                    *collective_op,
                    crate::CollectiveOperation::Reduce
                        | crate::CollectiveOperation::InclusiveScan
                        | crate::CollectiveOperation::ExclusiveScan
                ) {
                    return Err(SubgroupError::UnknownOperation.with_span().into_other());
                }
                self.subgroup_operand(argument, context, is_numeric)?;
                let expected = same_as(argument)?;
                self.subgroup_result(result, context, |inner| *inner == expected)
            }
        }
    }

    #[allow(clippy::large_stack_frames)] // TODO(https://github.com/gfx-rs/wgpu/issues/9456)
    fn validate_block_impl(
        &mut self,
        statements: &crate::Block,
        context: &BlockContext,
    ) -> Result<BlockInfo, WithSpan<FunctionError>> {
        use crate::{AddressSpace, Statement as S, TypeInner as Ti};
        let mut stages = super::ShaderStages::all();
        for (statement, &span) in statements.span_iter() {
            match *statement {
                S::Emit(ref range) => {
                    for handle in range.clone() {
                        use crate::Expression as Ex;
                        match context.expressions[handle] {
                            Ex::Literal(_)
                            | Ex::Constant(_)
                            | Ex::Override(_)
                            | Ex::ZeroValue(_)
                            | Ex::Compose { .. }
                            | Ex::Access { .. }
                            | Ex::AccessIndex { .. }
                            | Ex::Splat { .. }
                            | Ex::Swizzle { .. }
                            | Ex::FunctionArgument(_)
                            | Ex::GlobalVariable(_)
                            | Ex::LocalVariable(_)
                            | Ex::Load { .. }
                            | Ex::ImageSample { .. }
                            | Ex::ImageProcessing { .. }
                            | Ex::ArrayConversion { .. }
                            | Ex::ImageLoad { .. }
                            | Ex::ImageQuery { .. }
                            | Ex::Unary { .. }
                            | Ex::Binary { .. }
                            | Ex::Select { .. }
                            | Ex::Derivative { .. }
                            | Ex::Relational { .. }
                            | Ex::Math { .. }
                            | Ex::As { .. }
                            | Ex::ArrayLength(_)
                            | Ex::WideArrayLength(_)
                            | Ex::PhysicalPointer { .. }
                            | Ex::PhysicalAddress { .. }
                            | Ex::BufferPointer { .. }
                            | Ex::HeapOffset { .. }
                            | Ex::RayQueryGet { .. }
                            | Ex::AccelerationStructureFromAddress { .. }
                            | Ex::HitObjectGet { .. }
                            | Ex::FetchMicroTriangleVertex { .. }
                            | Ex::CooperativeLoad { .. }
                            | Ex::CooperativeMultiplyAdd { .. }
                            | Ex::CooperativeMatrixLength { .. }
                            | Ex::Replicate { .. }
                            | Ex::Expect { .. }
                            | Ex::Convert { .. }
                            | Ex::TensorCreate { .. }
                            | Ex::TensorSet { .. }
                            | Ex::CooperativeVectorLoad { .. }
                            | Ex::CooperativeVectorMatMul { .. }
                            | Ex::TensorRead { .. }
                            | Ex::TensorQuerySize { .. } => {
                                self.emit_expression(handle, context)?
                            }
                            Ex::CallResult(_)
                            | Ex::AtomicResult { .. }
                            | Ex::WorkGroupUniformLoadResult { .. }
                            | Ex::RayQueryProceedResult
                            | Ex::ReportIntersectionResult
                            | Ex::SubgroupBallotResult
                            | Ex::SubgroupOperationResult { .. }
                            | Ex::CooperativeMatrixResult { .. } => {
                                return Err(FunctionError::EmitResult(handle)
                                    .with_span_handle(handle, context.expressions));
                            }
                        }
                    }
                }
                S::Block(ref block) => {
                    let info = self.validate_block(block, context)?;
                    stages &= info.stages;
                }
                S::If {
                    condition,
                    ref accept,
                    ref reject,
                } => {
                    match *context.resolve_type_inner(condition, &self.valid_expression_set)? {
                        Ti::Scalar(crate::Scalar {
                            kind: crate::ScalarKind::Bool,
                            width: _,
                        }) => {}
                        _ => {
                            return Err(FunctionError::InvalidIfType(condition)
                                .with_span_handle(condition, context.expressions))
                        }
                    }
                    stages &= self.validate_block(accept, context)?.stages;
                    stages &= self.validate_block(reject, context)?.stages;
                }
                S::Switch {
                    selector,
                    ref cases,
                } => {
                    let uint = match context
                        .resolve_type_inner(selector, &self.valid_expression_set)?
                        .scalar_kind()
                    {
                        Some(crate::ScalarKind::Uint) => true,
                        Some(crate::ScalarKind::Sint) => false,
                        _ => {
                            return Err(FunctionError::InvalidSwitchType(selector)
                                .with_span_handle(selector, context.expressions))
                        }
                    };
                    self.switch_values.clear();
                    for case in cases {
                        match case.value {
                            crate::SwitchValue::I32(_) if !uint => {}
                            crate::SwitchValue::U32(_) if uint => {}
                            crate::SwitchValue::Default => {}
                            _ => {
                                return Err(FunctionError::ConflictingCaseType.with_span_static(
                                    case.body
                                        .span_iter()
                                        .next()
                                        .map_or(Default::default(), |(_, s)| *s),
                                    "conflicting switch arm here",
                                ));
                            }
                        };
                        if !self.switch_values.insert(case.value) {
                            return Err(match case.value {
                                crate::SwitchValue::Default => FunctionError::MultipleDefaultCases
                                    .with_span_static(
                                        case.body
                                            .span_iter()
                                            .next()
                                            .map_or(Default::default(), |(_, s)| *s),
                                        "duplicated switch arm here",
                                    ),
                                _ => FunctionError::ConflictingSwitchCase(case.value)
                                    .with_span_static(
                                        case.body
                                            .span_iter()
                                            .next()
                                            .map_or(Default::default(), |(_, s)| *s),
                                        "conflicting switch arm here",
                                    ),
                            });
                        }
                    }
                    if !self.switch_values.contains(&crate::SwitchValue::Default) {
                        return Err(FunctionError::MissingDefaultCase
                            .with_span_static(span, "missing default case"));
                    }
                    if let Some(case) = cases.last() {
                        if case.fall_through {
                            return Err(FunctionError::LastCaseFallTrough.with_span_static(
                                case.body
                                    .span_iter()
                                    .next()
                                    .map_or(Default::default(), |(_, s)| *s),
                                "bad switch arm here",
                            ));
                        }
                    }
                    let pass_through_abilities = context.abilities
                        & (ControlFlowAbility::RETURN | ControlFlowAbility::CONTINUE);
                    let sub_context =
                        context.with_abilities(pass_through_abilities | ControlFlowAbility::BREAK);
                    for case in cases {
                        stages &= self.validate_block(&case.body, &sub_context)?.stages;
                    }
                }
                S::Loop {
                    ref body,
                    ref continuing,
                    break_if,
                    control: _,
                } => {
                    // special handling for block scoping is needed here,
                    // because the continuing{} block inherits the scope
                    let base_expression_count = self.valid_expression_list.len();
                    let pass_through_abilities = context.abilities & ControlFlowAbility::RETURN;
                    stages &= self
                        .validate_block_impl(
                            body,
                            &context.with_abilities(
                                pass_through_abilities
                                    | ControlFlowAbility::BREAK
                                    | ControlFlowAbility::CONTINUE,
                            ),
                        )?
                        .stages;
                    stages &= self
                        .validate_block_impl(
                            continuing,
                            &context.with_abilities(ControlFlowAbility::empty()),
                        )?
                        .stages;

                    if let Some(condition) = break_if {
                        match *context.resolve_type_inner(condition, &self.valid_expression_set)? {
                            Ti::Scalar(crate::Scalar {
                                kind: crate::ScalarKind::Bool,
                                width: _,
                            }) => {}
                            _ => {
                                return Err(FunctionError::InvalidIfType(condition)
                                    .with_span_handle(condition, context.expressions))
                            }
                        }
                    }

                    for handle in self.valid_expression_list.drain(base_expression_count..) {
                        self.valid_expression_set.remove(handle);
                    }
                }
                S::Break => {
                    if !context.abilities.contains(ControlFlowAbility::BREAK) {
                        return Err(FunctionError::BreakOutsideOfLoopOrSwitch
                            .with_span_static(span, "invalid break"));
                    }
                }
                S::Continue => {
                    if !context.abilities.contains(ControlFlowAbility::CONTINUE) {
                        return Err(FunctionError::ContinueOutsideOfLoop
                            .with_span_static(span, "invalid continue"));
                    }
                }
                S::Return { value } => {
                    if !context.abilities.contains(ControlFlowAbility::RETURN) {
                        return Err(FunctionError::InvalidReturnSpot
                            .with_span_static(span, "invalid return"));
                    }
                    let value_ty = value
                        .map(|expr| context.resolve_type(expr, &self.valid_expression_set))
                        .transpose()?;
                    // We can't return pointers, but it seems best not to embed that
                    // assumption here, so use `TypeInner::equivalent` for comparison.
                    let okay = match (value_ty, context.return_type) {
                        (None, None) => true,
                        (Some(value_inner), Some(expected_ty)) => {
                            context.compare_types(value_inner, &TypeResolution::Handle(expected_ty))
                        }
                        (_, _) => false,
                    };

                    if !okay {
                        log::error!(
                            "Returning {:?} where {:?} is expected",
                            value_ty,
                            context.return_type,
                        );
                        if let Some(handle) = value {
                            return Err(FunctionError::InvalidReturnType {
                                expression: value,
                                expected_ty: context.return_type,
                            }
                            .with_span_handle(handle, context.expressions));
                        } else {
                            return Err(FunctionError::InvalidReturnType {
                                expression: value,
                                expected_ty: context.return_type,
                            }
                            .with_span_static(span, "invalid return"));
                        }
                    }
                }
                S::Kill => {
                    stages &= super::ShaderStages::FRAGMENT;
                }
                S::EmitVertex { .. } | S::EndPrimitive { .. } => {
                    stages &= super::ShaderStages::GEOMETRY;
                }
                S::CooperativeMatrix {
                    ref function,
                    result,
                } => {
                    for operand in function.operands() {
                        context.resolve_type_inner(operand, &self.valid_expression_set)?;
                    }
                    if let Some(result) = result {
                        self.emit_expression(result, context)?;
                    }
                }
                S::CooperativeVector(ref function) => {
                    for operand in function.operands() {
                        context.resolve_type_inner(operand, &self.valid_expression_set)?;
                    }
                }
                S::Assume { condition } => {
                    let ty = context.resolve_type_inner(condition, &self.valid_expression_set)?;
                    if *ty != Ti::Scalar(crate::Scalar::BOOL) {
                        return Err(FunctionError::InvalidIfType(condition)
                            .with_span_handle(condition, context.expressions));
                    }
                }
                S::MeshFunction(ref function) => {
                    stages &= match *function {
                        crate::MeshFunction::EmitMeshTasks { .. } => super::ShaderStages::TASK,
                        crate::MeshFunction::SetMeshOutputs { .. }
                        | crate::MeshFunction::WritePackedPrimitiveIndices { .. } => {
                            super::ShaderStages::MESH
                        }
                    };
                    for operand in function.operands() {
                        let inner =
                            context.resolve_type_inner(operand, &self.valid_expression_set)?;
                        if *inner != Ti::Scalar(crate::Scalar::U32) {
                            return Err(FunctionError::InvalidMeshFunctionCall(operand)
                                .with_span_handle(operand, context.expressions));
                        }
                    }
                }
                S::DebugPrintf { ref arguments, .. } => {
                    for argument in arguments {
                        if let crate::DebugPrintfArgument::Value(value) = *argument {
                            context.resolve_type_inner(value, &self.valid_expression_set)?;
                        }
                    }
                }
                S::Abort {
                    ref message,
                    ty,
                    ref arguments,
                } => {
                    let invalid_message = || {
                        FunctionError::InvalidAbortMessage(ty)
                            .with_span_static(span, "invalid abort message")
                    };
                    let Ti::Struct { ref members, .. } = context.types[ty].inner else {
                        return Err(invalid_message());
                    };
                    let Some((text, values)) = members.split_first() else {
                        return Err(invalid_message());
                    };
                    let text_ok = match context.types[text.ty].inner {
                        Ti::Array {
                            base,
                            size: crate::ArraySize::Constant(length),
                            ..
                        } => {
                            context.types[base].inner
                                == Ti::Scalar(crate::Scalar {
                                    kind: crate::ScalarKind::Sint,
                                    width: 1,
                                })
                                && length.get() == abort_message_length(message)
                        }
                        _ => false,
                    };
                    if !text_ok || message.contains('\0') || values.len() != arguments.len() {
                        return Err(invalid_message());
                    }
                    for (&argument, member) in arguments.iter().zip(values) {
                        let matches =
                            match *context.resolve_type(argument, &self.valid_expression_set)? {
                                TypeResolution::Handle(handle) => {
                                    logically_matches(context.types, handle, member.ty)
                                }
                                TypeResolution::Value(ref inner) => {
                                    *inner == context.types[member.ty].inner
                                }
                            };
                        if !matches {
                            return Err(FunctionError::InvalidAbortArgument(argument)
                                .with_span_handle(argument, context.expressions));
                        }
                    }
                }
                S::TensorWrite {
                    tensor,
                    coordinates,
                    value,
                    ..
                } => {
                    let invalid = |handle: Handle<crate::Expression>| {
                        FunctionError::InvalidTensorWrite(handle)
                            .with_span_handle(handle, context.expressions)
                    };
                    let (scalar, rank) =
                        match *context.resolve_type_inner(tensor, &self.valid_expression_set)? {
                            Ti::Tensor { scalar, rank } => (scalar, rank),
                            _ => return Err(invalid(tensor)),
                        };
                    let coordinates_inner =
                        context.resolve_type_inner(coordinates, &self.valid_expression_set)?;
                    match super::expression::tensor_shape(coordinates_inner, context.types) {
                        Some((index, Some(length)))
                            if length == rank
                                && matches!(
                                    index.kind,
                                    crate::ScalarKind::Uint | crate::ScalarKind::Sint
                                ) => {}
                        _ => return Err(invalid(coordinates)),
                    }
                    let value_inner =
                        context.resolve_type_inner(value, &self.valid_expression_set)?;
                    match super::expression::tensor_shape(value_inner, context.types) {
                        Some((element, _)) if element == scalar => {}
                        _ => return Err(invalid(value)),
                    }
                }
                S::ControlBarrier(barrier) | S::MemoryBarrier(barrier) => {
                    stages &= super::ShaderStages::COMPUTE_LIKE;
                    if barrier.contains(crate::Barrier::SUB_GROUP) {
                        if !self.capabilities.contains(
                            super::Capabilities::SUBGROUP | super::Capabilities::SUBGROUP_BARRIER,
                        ) {
                            return Err(FunctionError::MissingCapability(
                                super::Capabilities::SUBGROUP
                                    | super::Capabilities::SUBGROUP_BARRIER,
                            )
                            .with_span_static(span, "missing capability for this operation"));
                        }
                        if !self
                            .subgroup_operations
                            .contains(super::SubgroupOperationSet::BASIC)
                        {
                            return Err(FunctionError::InvalidSubgroup(
                                SubgroupError::UnsupportedOperation(
                                    super::SubgroupOperationSet::BASIC,
                                ),
                            )
                            .with_span_static(span, "support for this operation is not present"));
                        }
                    }
                }
                S::Store { pointer, value } => {
                    let mut current = pointer;
                    loop {
                        match context.expressions[current] {
                            crate::Expression::Access { base, .. }
                            | crate::Expression::AccessIndex { base, .. } => current = base,
                            crate::Expression::LocalVariable(_)
                            | crate::Expression::GlobalVariable(_)
                            | crate::Expression::FunctionArgument(_)
                            | crate::Expression::BufferPointer { .. } => break,
                            _ if matches!(
                                context.resolve_pointer_type(current).pointer_space(),
                                Some(AddressSpace::PhysicalStorage { .. })
                            ) =>
                            {
                                break
                            }
                            _ => {
                                return Err(FunctionError::InvalidStorePointer(current)
                                    .with_span_handle(pointer, context.expressions))
                            }
                        }
                    }

                    let value_tr = context.resolve_type(value, &self.valid_expression_set)?;
                    let value_ty = value_tr.inner_with(context.types);
                    match *value_ty {
                        Ti::Image { .. } | Ti::SampledImage { .. } | Ti::Sampler { .. } => {
                            return Err(FunctionError::InvalidStoreTexture {
                                actual: value,
                                actual_ty: value_ty.clone(),
                            }
                            .with_span_context((
                                context.expressions.get_span(value),
                                format!("this value is of type {value_ty:?}"),
                            ))
                            .with_span(span, "expects a texture argument"));
                        }
                        _ => {}
                    }

                    let pointer_ty = context.resolve_pointer_type(pointer);
                    let pointer_base_tr = pointer_ty.pointer_base_type();
                    let pointer_base_ty = pointer_base_tr
                        .as_ref()
                        .map(|ty| ty.inner_with(context.types));
                    let good = if let Some(&Ti::Atomic(ref scalar)) = pointer_base_ty {
                        // The rglsl IR allows storing a scalar to an atomic.
                        *value_ty == Ti::Scalar(*scalar)
                    } else if let Some(tr) = pointer_base_tr {
                        context.compare_types(value_tr, &tr)
                    } else {
                        false
                    };

                    if !good {
                        return Err(FunctionError::InvalidStoreTypes { pointer, value }
                            .with_span()
                            .with_handle(pointer, context.expressions)
                            .with_handle(value, context.expressions));
                    }

                    if let Some(space) = pointer_ty.pointer_space() {
                        if !space.access().contains(crate::StorageAccess::STORE) {
                            return Err(FunctionError::InvalidStorePointer(pointer)
                                .with_span_static(
                                    context.expressions.get_span(pointer),
                                    "writing to this location is not permitted",
                                ));
                        }
                    }
                }
                S::ImageStore {
                    image,
                    coordinate,
                    array_index,
                    value,
                } => {
                    //Note: this code uses a lot of `FunctionError::InvalidImageStore`,
                    // and could probably be refactored.
                    let global_var;
                    let image_ty;
                    match *context.get_expression(image) {
                        crate::Expression::GlobalVariable(var_handle) => {
                            global_var = &context.global_vars[var_handle];
                            image_ty = global_var.ty;
                        }
                        // The `image` operand is indexing into a binding array,
                        // so punch through the `Access`* expression and look at
                        // the global behind it.
                        crate::Expression::Access { base, .. }
                        | crate::Expression::AccessIndex { base, .. } => {
                            let crate::Expression::GlobalVariable(var_handle) =
                                *context.get_expression(base)
                            else {
                                return Err(FunctionError::InvalidImageStore(
                                    ExpressionError::ExpectedGlobalVariable,
                                )
                                .with_span_handle(image, context.expressions));
                            };
                            global_var = &context.global_vars[var_handle];

                            // The global variable must be a binding array.
                            let Ti::BindingArray { base, .. } = context.types[global_var.ty].inner
                            else {
                                return Err(FunctionError::InvalidImageStore(
                                    ExpressionError::ExpectedBindingArrayType(global_var.ty),
                                )
                                .with_span_handle(global_var.ty, context.types));
                            };

                            image_ty = base;
                        }
                        _ => {
                            let Some((global, ty)) = context.heap_image(image) else {
                                return Err(FunctionError::InvalidImageStore(
                                    ExpressionError::ExpectedGlobalVariable,
                                )
                                .with_span_handle(image, context.expressions));
                            };
                            global_var = &context.global_vars[global];
                            image_ty = ty;
                        }
                    };

                    // The `image` operand must be an `Image`.
                    let Ti::Image {
                        class,
                        arrayed,
                        dim,
                    } = context.types[image_ty].inner
                    else {
                        return Err(FunctionError::InvalidImageStore(
                            ExpressionError::ExpectedImageType(global_var.ty),
                        )
                        .with_span()
                        .with_handle(global_var.ty, context.types)
                        .with_handle(image, context.expressions));
                    };

                    // It had better be a storage image, since we're writing to it.
                    let crate::ImageClass::Storage { format, .. } = class else {
                        return Err(FunctionError::InvalidImageStore(
                            ExpressionError::InvalidImageClass(class),
                        )
                        .with_span_handle(image, context.expressions));
                    };

                    // The `coordinate` operand must be a vector of the appropriate size.
                    if !context
                        .resolve_type_inner(coordinate, &self.valid_expression_set)?
                        .addresses_image(dim)
                    {
                        return Err(FunctionError::InvalidImageStore(
                            ExpressionError::InvalidImageCoordinateType(dim, coordinate),
                        )
                        .with_span_handle(coordinate, context.expressions));
                    }

                    // The `array_index` operand should be present if and only if
                    // the image itself is arrayed.
                    if arrayed != array_index.is_some() {
                        return Err(FunctionError::InvalidImageStore(
                            ExpressionError::InvalidImageArrayIndex,
                        )
                        .with_span_handle(coordinate, context.expressions));
                    }

                    // If present, `array_index` must be a scalar integer type.
                    if let Some(expr) = array_index {
                        if !matches!(
                            *context.resolve_type_inner(expr, &self.valid_expression_set)?,
                            Ti::Scalar(crate::Scalar {
                                kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                                width: _,
                            })
                        ) {
                            return Err(FunctionError::InvalidImageStore(
                                ExpressionError::InvalidImageArrayIndexType(expr),
                            )
                            .with_span_handle(expr, context.expressions));
                        }
                    }

                    let value_ty = crate::TypeInner::Vector {
                        size: crate::VectorSize::Quad,
                        scalar: format.into(),
                    };

                    // The value we're writing had better match the scalar type
                    // for `image`'s format.
                    let actual_value_ty =
                        context.resolve_type_inner(value, &self.valid_expression_set)?;
                    if actual_value_ty != &value_ty {
                        return Err(FunctionError::InvalidStoreValue {
                            actual: value,
                            actual_ty: actual_value_ty.clone(),
                            expected_ty: value_ty.clone(),
                        }
                        .with_span_context((
                            context.expressions.get_span(value),
                            format!("this value is of type {actual_value_ty:?}"),
                        ))
                        .with_span(
                            span,
                            format!("expects a value argument of type {value_ty:?}"),
                        ));
                    }
                }
                S::Call {
                    function,
                    ref arguments,
                    result,
                } => match self.validate_call(function, arguments, result, context) {
                    Ok(callee_stages) => stages &= callee_stages,
                    Err(error) => {
                        return Err(error.and_then(|error| {
                            FunctionError::InvalidCall { function, error }
                                .with_span_static(span, "invalid function call")
                        }))
                    }
                },
                S::Atomic {
                    pointer,
                    ref fun,
                    value,
                    result,
                    order: _,
                } => {
                    self.validate_atomic(pointer, fun, value, result, span, context)?;
                }
                S::ImageAtomic {
                    image,
                    coordinate,
                    array_index,
                    fun,
                    value,
                    sample,
                    result,
                    order: _,
                } => {
                    let texel = crate::Texel {
                        image,
                        coordinate,
                        array_index,
                        sample,
                    };
                    let (format, access) = self.validate_texel(&texel, context)?;
                    if !access.contains(crate::StorageAccess::ATOMIC) {
                        return Err(FunctionError::InvalidImageAtomic(
                            ExpressionError::InvalidImageStorageAccess(access),
                        )
                        .with_span_handle(image, context.expressions));
                    }
                    let supported = match format {
                        crate::StorageFormat::R64Uint => {
                            if !self
                                .capabilities
                                .intersects(super::Capabilities::TEXTURE_INT64_ATOMIC)
                            {
                                return Err(FunctionError::MissingCapability(
                                    super::Capabilities::TEXTURE_INT64_ATOMIC,
                                )
                                .with_span_static(span, "missing capability for this operation"));
                            }
                            !matches!(fun, crate::AtomicFunction::Subtract)
                        }
                        crate::StorageFormat::R32Sint | crate::StorageFormat::R32Uint => {
                            if !self
                                .capabilities
                                .intersects(super::Capabilities::TEXTURE_ATOMIC)
                            {
                                return Err(FunctionError::MissingCapability(
                                    super::Capabilities::TEXTURE_ATOMIC,
                                )
                                .with_span_static(span, "missing capability for this operation"));
                            }
                            !matches!(fun, crate::AtomicFunction::Subtract)
                        }
                        crate::StorageFormat::R32Float => {
                            matches!(fun, crate::AtomicFunction::Exchange { compare: None })
                        }
                        _ => {
                            return Err(FunctionError::InvalidImageAtomic(
                                ExpressionError::InvalidImageFormat(format),
                            )
                            .with_span_handle(image, context.expressions));
                        }
                    };
                    if !supported {
                        return Err(FunctionError::InvalidImageAtomicFunction(fun)
                            .with_span_handle(image, context.expressions));
                    }
                    let value_ty = Ti::Scalar(format.into());
                    if *context.resolve_type_inner(value, &self.valid_expression_set)? != value_ty {
                        return Err(FunctionError::InvalidImageAtomicValue(value)
                            .with_span_handle(value, context.expressions));
                    }
                    if let crate::AtomicFunction::Exchange {
                        compare: Some(compare),
                    } = fun
                    {
                        if *context.resolve_type_inner(compare, &self.valid_expression_set)?
                            != value_ty
                        {
                            return Err(FunctionError::InvalidImageAtomicValue(compare)
                                .with_span_handle(compare, context.expressions));
                        }
                    }
                    if let Some(result) = result {
                        self.validate_atomic_result(result, format.into(), context)?;
                    }
                }
                S::AtomicLoad {
                    ref location,
                    order: _,
                    result,
                } => {
                    let scalar = self.validate_atomic_location(location, context)?;
                    self.validate_atomic_result(result, scalar, context)?;
                }
                S::AtomicStore {
                    ref location,
                    value,
                    order: _,
                } => {
                    let scalar = self.validate_atomic_location(location, context)?;
                    if *context.resolve_type_inner(value, &self.valid_expression_set)?
                        != Ti::Scalar(scalar)
                    {
                        return Err(AtomicError::InvalidOperand(value)
                            .with_span_handle(value, context.expressions)
                            .into_other());
                    }
                }
                S::ScopedBarrier { .. } => {}
                S::WorkGroupUniformLoad { pointer, result } => {
                    stages &= super::ShaderStages::COMPUTE_LIKE;
                    let pointer_inner =
                        context.resolve_type_inner(pointer, &self.valid_expression_set)?;
                    match *pointer_inner {
                        Ti::Pointer {
                            space: AddressSpace::WorkGroup,
                            ..
                        } => {}
                        Ti::ValuePointer {
                            space: AddressSpace::WorkGroup,
                            ..
                        } => {}
                        _ => {
                            return Err(FunctionError::WorkgroupUniformLoadInvalidPointer(pointer)
                                .with_span_static(span, "WorkGroupUniformLoad"))
                        }
                    }
                    self.emit_expression(result, context)?;
                    let ty = match &context.expressions[result] {
                        &crate::Expression::WorkGroupUniformLoadResult { ty } => ty,
                        _ => {
                            return Err(FunctionError::WorkgroupUniformLoadExpressionMismatch(
                                result,
                            )
                            .with_span_static(span, "WorkGroupUniformLoad"));
                        }
                    };
                    let expected_pointer_inner = Ti::Pointer {
                        base: ty,
                        space: AddressSpace::WorkGroup,
                    };
                    // workgroupUniformLoad on atomic<T> returns T, not atomic<T>.
                    // Verify the pointer's atomic scalar matches the result scalar.
                    let atomic_specialization_ok = match *pointer_inner {
                        Ti::Pointer {
                            base: pointer_base,
                            space: AddressSpace::WorkGroup,
                        } => match (&context.types[pointer_base].inner, &context.types[ty].inner) {
                            (&Ti::Atomic(pointer_scalar), &Ti::Scalar(result_scalar)) => {
                                pointer_scalar == result_scalar
                            }
                            _ => false,
                        },
                        _ => false,
                    };
                    if !expected_pointer_inner.non_struct_equivalent(pointer_inner, context.types)
                        && !atomic_specialization_ok
                    {
                        return Err(FunctionError::WorkgroupUniformLoadInvalidPointer(pointer)
                            .with_span_static(span, "WorkGroupUniformLoad"));
                    }
                }
                S::RayQuery { query, ref fun } => {
                    let is_query =
                        match *context.resolve_type_inner(query, &self.valid_expression_set)? {
                            Ti::Pointer { base, .. } => {
                                matches!(context.types[base].inner, Ti::RayQuery { .. })
                            }
                            _ => false,
                        };
                    if !is_query {
                        return Err(FunctionError::InvalidRayQueryExpression(query)
                            .with_span_static(span, "invalid query expression"));
                    }
                    match *fun {
                        crate::RayQueryFunction::Initialize {
                            acceleration_structure,
                            flags,
                            cull_mask,
                            origin,
                            tmin,
                            direction,
                            tmax,
                        } => {
                            self.validate_acceleration_structure(acceleration_structure, context)?;
                            for (operand, kind) in [
                                (flags, RayOperand::Uint),
                                (cull_mask, RayOperand::Uint),
                                (origin, RayOperand::Vector),
                                (tmin, RayOperand::Float),
                                (direction, RayOperand::Vector),
                                (tmax, RayOperand::Float),
                            ] {
                                self.validate_ray_operand(operand, kind, context)?;
                            }
                        }
                        crate::RayQueryFunction::Proceed { result } => {
                            self.emit_expression(result, context)?;
                        }
                        crate::RayQueryFunction::GenerateIntersection { hit_t } => {
                            match *context.resolve_type_inner(hit_t, &self.valid_expression_set)? {
                                Ti::Scalar(crate::Scalar {
                                    kind: crate::ScalarKind::Float,
                                    width: _,
                                }) => {}
                                _ => {
                                    return Err(FunctionError::InvalidHitDistanceType(hit_t)
                                        .with_span_static(span, "invalid hit_t"))
                                }
                            }
                        }
                        crate::RayQueryFunction::ConfirmIntersection => {}
                        crate::RayQueryFunction::Terminate => {}
                    }
                }
                S::SubgroupBallot { result, predicate } => {
                    stages &= self.subgroup_stages;
                    if !self.capabilities.contains(super::Capabilities::SUBGROUP) {
                        return Err(FunctionError::MissingCapability(
                            super::Capabilities::SUBGROUP,
                        )
                        .with_span_static(span, "missing capability for this operation"));
                    }
                    if !self
                        .subgroup_operations
                        .contains(super::SubgroupOperationSet::BALLOT)
                    {
                        return Err(FunctionError::InvalidSubgroup(
                            SubgroupError::UnsupportedOperation(
                                super::SubgroupOperationSet::BALLOT,
                            ),
                        )
                        .with_span_static(span, "support for this operation is not present"));
                    }
                    if let Some(predicate) = predicate {
                        let predicate_inner =
                            context.resolve_type_inner(predicate, &self.valid_expression_set)?;
                        if !matches!(
                            *predicate_inner,
                            crate::TypeInner::Scalar(crate::Scalar::BOOL,)
                        ) {
                            log::error!(
                                "Subgroup ballot predicate type {predicate_inner:?} expected bool"
                            );
                            return Err(SubgroupError::InvalidOperand(predicate)
                                .with_span_handle(predicate, context.expressions)
                                .into_other());
                        }
                    }
                    self.emit_expression(result, context)?;
                }
                S::SubgroupCollectiveOperation {
                    ref op,
                    ref collective_op,
                    argument,
                    result,
                } => {
                    stages &= self.subgroup_stages;
                    if !self.capabilities.contains(super::Capabilities::SUBGROUP) {
                        return Err(FunctionError::MissingCapability(
                            super::Capabilities::SUBGROUP,
                        )
                        .with_span_static(span, "missing capability for this operation"));
                    }
                    let operation = op.required_operations() | collective_op.required_operations();
                    if !self.subgroup_operations.contains(operation) {
                        return Err(FunctionError::InvalidSubgroup(
                            SubgroupError::UnsupportedOperation(operation),
                        )
                        .with_span_static(span, "support for this operation is not present"));
                    }
                    self.validate_subgroup_operation(op, collective_op, argument, result, context)?;
                }
                S::SubgroupGather {
                    ref mode,
                    argument,
                    result,
                } => {
                    stages &= self.subgroup_stages;
                    if !self.capabilities.contains(super::Capabilities::SUBGROUP) {
                        return Err(FunctionError::MissingCapability(
                            super::Capabilities::SUBGROUP,
                        )
                        .with_span_static(span, "missing capability for this operation"));
                    }
                    let operation = mode.required_operations();
                    if !self.subgroup_operations.contains(operation) {
                        return Err(FunctionError::InvalidSubgroup(
                            SubgroupError::UnsupportedOperation(operation),
                        )
                        .with_span_static(span, "support for this operation is not present"));
                    }
                    self.validate_subgroup_gather(mode, argument, result, context)?;
                }
                S::SubgroupFunction { ref fun, result } => {
                    stages &= self.subgroup_stages;
                    if !self.capabilities.contains(super::Capabilities::SUBGROUP) {
                        return Err(FunctionError::MissingCapability(
                            super::Capabilities::SUBGROUP,
                        )
                        .with_span_static(span, "missing capability for this operation"));
                    }
                    let operation = fun.required_operations();
                    if !self.subgroup_operations.contains(operation) {
                        return Err(FunctionError::InvalidSubgroup(
                            SubgroupError::UnsupportedOperation(operation),
                        )
                        .with_span_static(span, "support for this operation is not present"));
                    }
                    self.validate_subgroup_function(fun, result, context)?;
                }
                S::CooperativeStore { target, ref data } => {
                    match *context.resolve_type_inner(target, &self.valid_expression_set)? {
                        Ti::CooperativeMatrix { .. } => {}
                        ref other => {
                            log::error!("Target operand type: {other:?}");
                            return Err(FunctionError::InvalidCooperativeStoreTarget(target)
                                .with_span_handle(target, context.expressions));
                        }
                    };

                    let ptr_ty = context.resolve_pointer_type(data.pointer);
                    let ptr_scalar = ptr_ty
                        .pointer_base_type()
                        .and_then(|tr| tr.inner_with(context.types).scalar());
                    if ptr_scalar.is_none() {
                        return Err(FunctionError::InvalidCooperativeDataPointer(data.pointer)
                            .with_span_handle(data.pointer, context.expressions));
                    }

                    let ptr_space = ptr_ty.pointer_space().unwrap_or(AddressSpace::Handle);
                    if !ptr_space.access().contains(crate::StorageAccess::STORE) {
                        return Err(FunctionError::InvalidStorePointer(data.pointer)
                            .with_span_static(
                                context.expressions.get_span(data.pointer),
                                "writing to this location is not permitted",
                            ));
                    }
                }
                S::HitObject { object, ref fun } => {
                    stages &= super::ShaderStages::RAY_GENERATION
                        | super::ShaderStages::CLOSEST_HIT
                        | super::ShaderStages::MISS;
                    let kind =
                        match *context.resolve_type_inner(object, &self.valid_expression_set)? {
                            Ti::Pointer { base, .. } => match context.types[base].inner {
                                Ti::HitObject { kind } => Some(kind),
                                _ => None,
                            },
                            _ => None,
                        };
                    let Some(kind) = kind else {
                        return Err(FunctionError::InvalidHitObjectExpression(object)
                            .with_span_static(span, "invalid hit object expression"));
                    };
                    self.validate_hit_object_function(kind, fun, span, context)?;
                    if matches!(
                        *fun,
                        crate::HitObjectFunction::ReorderThread { .. }
                            | crate::HitObjectFunction::ReorderExecute { .. }
                            | crate::HitObjectFunction::TraceReorderExecute { .. }
                    ) {
                        stages &= super::ShaderStages::RAY_GENERATION;
                    }
                }
                S::ReorderThread {
                    kind: _,
                    hint,
                    bits,
                } => {
                    stages &= super::ShaderStages::RAY_GENERATION;
                    self.validate_ray_operand(hint, RayOperand::Uint, context)?;
                    self.validate_ray_operand(bits, RayOperand::Uint, context)?;
                }
                S::RayPipelineFunction(ref fun) => match *fun {
                    crate::RayPipelineFunction::TraceRay {
                        acceleration_structure,
                        flags,
                        cull_mask,
                        sbt_offset,
                        sbt_stride,
                        miss_index,
                        origin,
                        tmin,
                        direction,
                        tmax,
                        time,
                        payload,
                    } => {
                        stages &= super::ShaderStages::RAY_GENERATION
                            | super::ShaderStages::CLOSEST_HIT
                            | super::ShaderStages::MISS;
                        self.validate_acceleration_structure(acceleration_structure, context)?;
                        for (operand, kind) in [
                            (flags, RayOperand::Uint),
                            (cull_mask, RayOperand::Uint),
                            (sbt_offset, RayOperand::Uint),
                            (sbt_stride, RayOperand::Uint),
                            (miss_index, RayOperand::Uint),
                            (origin, RayOperand::Vector),
                            (tmin, RayOperand::Float),
                            (direction, RayOperand::Vector),
                            (tmax, RayOperand::Float),
                        ]
                        .into_iter()
                        .chain(time.map(|time| (time, RayOperand::Float)))
                        {
                            self.validate_ray_operand(operand, kind, context)?;
                        }
                        if time.is_some() && payload.pointer().is_none() {
                            return Err(FunctionError::InvalidPayloadType.with_span_static(
                                span,
                                "a motion trace needs a payload variable",
                            ));
                        }
                        self.validate_ray_data(
                            payload,
                            &[AddressSpace::RayPayload, AddressSpace::IncomingRayPayload],
                            context,
                        )?;
                    }
                    crate::RayPipelineFunction::ExecuteCallable { sbt_index, data } => {
                        stages &= super::ShaderStages::RAY_GENERATION
                            | super::ShaderStages::CLOSEST_HIT
                            | super::ShaderStages::MISS
                            | super::ShaderStages::CALLABLE;
                        self.validate_ray_operand(sbt_index, RayOperand::Uint, context)?;
                        self.validate_ray_data(
                            data,
                            &[
                                AddressSpace::CallableData,
                                AddressSpace::IncomingCallableData,
                            ],
                            context,
                        )?;
                    }
                    crate::RayPipelineFunction::ReportIntersection {
                        hit_t,
                        hit_kind,
                        result,
                    } => {
                        stages &= super::ShaderStages::INTERSECTION;
                        self.validate_ray_operand(hit_t, RayOperand::Float, context)?;
                        self.validate_ray_operand(hit_kind, RayOperand::Uint, context)?;
                        self.emit_expression(result, context)?;
                    }
                    crate::RayPipelineFunction::IgnoreIntersection { .. }
                    | crate::RayPipelineFunction::TerminateRay { .. } => {
                        stages &= super::ShaderStages::ANY_HIT;
                    }
                },
            }
        }
        Ok(BlockInfo { stages })
    }

    fn validate_block(
        &mut self,
        statements: &crate::Block,
        context: &BlockContext,
    ) -> Result<BlockInfo, WithSpan<FunctionError>> {
        let base_expression_count = self.valid_expression_list.len();
        let info = self.validate_block_impl(statements, context)?;
        for handle in self.valid_expression_list.drain(base_expression_count..) {
            self.valid_expression_set.remove(handle);
        }
        Ok(info)
    }

    fn validate_local_var(
        &self,
        var: &crate::LocalVariable,
        gctx: crate::proc::GlobalCtx,
        fun_info: &FunctionInfo,
        local_expr_kind: &crate::proc::ExpressionKindTracker,
    ) -> Result<(), LocalVariableError> {
        log::debug!("var {var:?}");
        let type_info = self
            .types
            .get(var.ty.index())
            .ok_or(LocalVariableError::InvalidType(var.ty))?;
        if !type_info.flags.contains(super::TypeFlags::CONSTRUCTIBLE) {
            return Err(LocalVariableError::InvalidType(var.ty));
        }

        if let Some(init) = var.init {
            if !gctx.compare_types(&TypeResolution::Handle(var.ty), &fun_info[init].ty) {
                return Err(LocalVariableError::InitializerType);
            }

            if !local_expr_kind.is_const_or_override(init) {
                return Err(LocalVariableError::NonConstOrOverrideInitializer);
            }
        }

        Ok(())
    }

    pub(super) fn validate_function(
        &mut self,
        fun: &crate::Function,
        module: &crate::Module,
        mod_info: &ModuleInfo,
        entry_point: bool,
    ) -> Result<FunctionInfo, WithSpan<FunctionError>> {
        let mut info = mod_info.process_function(fun, module, self.flags, self.capabilities)?;

        let local_expr_kind = crate::proc::ExpressionKindTracker::from_arena(&fun.expressions);

        for (var_handle, var) in fun.local_variables.iter() {
            self.validate_local_var(var, module.to_ctx(), &info, &local_expr_kind)
                .map_err(|source| {
                    FunctionError::LocalVariable {
                        handle: var_handle,
                        name: var.name.clone().unwrap_or_default(),
                        source,
                    }
                    .with_span_handle(var.ty, &module.types)
                    .with_handle(var_handle, &fun.local_variables)
                })?;
        }

        for (index, argument) in fun.arguments.iter().enumerate() {
            match module.types[argument.ty].inner.pointer_space() {
                Some(
                    crate::AddressSpace::Private
                    | crate::AddressSpace::Function
                    | crate::AddressSpace::PhysicalStorage { .. },
                )
                | None => {}
                Some(other) => {
                    return Err(FunctionError::InvalidArgumentPointerSpace {
                        index,
                        name: argument.name.clone().unwrap_or_default(),
                        space: other,
                    }
                    .with_span_handle(argument.ty, &module.types))
                }
            }
            // Check for the least informative error last.
            if !self.types[argument.ty.index()]
                .flags
                .contains(super::TypeFlags::ARGUMENT)
            {
                return Err(FunctionError::InvalidArgumentType {
                    index,
                    name: argument.name.clone().unwrap_or_default(),
                }
                .with_span_handle(argument.ty, &module.types));
            }

            if !entry_point && argument.binding.is_some() {
                return Err(FunctionError::PipelineInputRegularFunction {
                    name: argument.name.clone().unwrap_or_default(),
                }
                .with_span_handle(argument.ty, &module.types));
            }
        }

        if let Some(ref result) = fun.result {
            if !self.types[result.ty.index()]
                .flags
                .contains(super::TypeFlags::CONSTRUCTIBLE)
            {
                return Err(FunctionError::NonConstructibleReturnType
                    .with_span_handle(result.ty, &module.types));
            }

            if !entry_point && result.binding.is_some() {
                return Err(FunctionError::PipelineOutputRegularFunction
                    .with_span_handle(result.ty, &module.types));
            }
        }

        self.valid_expression_set.clear_for_arena(&fun.expressions);
        self.valid_expression_list.clear();
        self.needs_visit.clear_for_arena(&fun.expressions);
        for (handle, expr) in fun.expressions.iter() {
            if expr.needs_pre_emit() {
                self.valid_expression_set.insert(handle);
            }
            if self.flags.contains(super::ValidationFlags::EXPRESSIONS) {
                // Mark expressions that need to be visited by a particular kind of
                // statement.
                if let crate::Expression::CallResult(_) | crate::Expression::AtomicResult { .. } =
                    *expr
                {
                    self.needs_visit.insert(handle);
                }

                match self.validate_expression(handle, expr, fun, module, &info, mod_info) {
                    Ok(stages) => info.available_stages &= stages,
                    Err(source) => {
                        return Err(FunctionError::Expression { handle, source }
                            .with_span_handle(handle, &fun.expressions))
                    }
                }
            }
        }

        if self.flags.contains(super::ValidationFlags::BLOCKS) {
            let stages = self
                .validate_block(
                    &fun.body,
                    &BlockContext::new(fun, module, &info, &mod_info.functions),
                )?
                .stages;
            info.available_stages &= stages;

            if self.flags.contains(super::ValidationFlags::EXPRESSIONS) {
                if let Some(handle) = self.needs_visit.iter().next() {
                    return Err(FunctionError::UnvisitedExpression(handle)
                        .with_span_handle(handle, &fun.expressions));
                }
            }
        }
        Ok(info)
    }
}

#[derive(Clone, Copy)]
enum RayOperand {
    Int,
    Uint,
    Float,
    Vector,
}

impl super::Validator {
    fn validate_acceleration_structure(
        &self,
        handle: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        match *context.resolve_type_inner(handle, &self.valid_expression_set)? {
            crate::TypeInner::AccelerationStructure { .. } => Ok(()),
            _ => Err(FunctionError::InvalidAccelerationStructure(handle)
                .with_span_handle(handle, context.expressions)),
        }
    }

    fn validate_ray_operand(
        &self,
        handle: Handle<crate::Expression>,
        kind: RayOperand,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let inner = context.resolve_type_inner(handle, &self.valid_expression_set)?;
        let valid = match kind {
            RayOperand::Int => *inner == crate::TypeInner::Scalar(crate::Scalar::I32),
            RayOperand::Uint => *inner == crate::TypeInner::Scalar(crate::Scalar::U32),
            RayOperand::Float => *inner == crate::TypeInner::Scalar(crate::Scalar::F32),
            RayOperand::Vector => {
                *inner
                    == crate::TypeInner::Vector {
                        size: crate::VectorSize::Tri,
                        scalar: crate::Scalar::F32,
                    }
            }
        };
        if valid {
            Ok(())
        } else {
            Err(FunctionError::InvalidRayOperand(handle)
                .with_span_handle(handle, context.expressions))
        }
    }

    fn validate_hit_object_pointer(
        &self,
        pointer: Handle<crate::Expression>,
        space: crate::AddressSpace,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let spaces: &[crate::AddressSpace] = match space {
            crate::AddressSpace::RayPayload => &[
                crate::AddressSpace::RayPayload,
                crate::AddressSpace::IncomingRayPayload,
            ],
            _ => &[space],
        };
        self.validate_ray_data(crate::RayTracingData::Pointer(pointer), spaces, context)
    }

    fn validate_hit_object_function(
        &self,
        kind: crate::HitObjectKind,
        fun: &crate::HitObjectFunction,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::{HitObjectFunction as Hf, HitObjectKind as Hk};
        let attributes = crate::AddressSpace::HitObjectAttribute { kind };
        let ext_only = |valid: bool| {
            if valid {
                Ok(())
            } else {
                Err(FunctionError::InvalidHitObjectOperation(kind)
                    .with_span_static(span, "invalid hit object operation"))
            }
        };
        let trace = |trace: &crate::HitObjectTrace| -> Result<(), WithSpan<FunctionError>> {
            self.validate_acceleration_structure(trace.acceleration_structure, context)?;
            for (operand, operand_kind) in [
                (trace.flags, RayOperand::Uint),
                (trace.cull_mask, RayOperand::Uint),
                (trace.sbt_offset, RayOperand::Uint),
                (trace.sbt_stride, RayOperand::Uint),
                (trace.miss_index, RayOperand::Uint),
                (trace.origin, RayOperand::Vector),
                (trace.tmin, RayOperand::Float),
                (trace.direction, RayOperand::Vector),
                (trace.tmax, RayOperand::Float),
            ]
            .into_iter()
            .chain(trace.time.map(|time| (time, RayOperand::Float)))
            {
                self.validate_ray_operand(operand, operand_kind, context)?;
            }
            self.validate_hit_object_pointer(
                trace.payload,
                crate::AddressSpace::RayPayload,
                context,
            )
        };
        let hint = |hint: Option<crate::ReorderHint>| -> Result<(), WithSpan<FunctionError>> {
            for operand in hint.iter().flat_map(crate::ReorderHint::operands) {
                self.validate_ray_operand(operand, RayOperand::Uint, context)?;
            }
            Ok(())
        };
        match *fun {
            Hf::TraceRay(ref data) => trace(data),
            Hf::TraceReorderExecute {
                trace: ref data,
                hint: reorder,
            } => {
                ext_only(kind == Hk::Ext)?;
                trace(data)?;
                hint(reorder)
            }
            Hf::RecordHit {
                acceleration_structure,
                instance_id,
                primitive_id,
                geometry_index,
                hit_kind,
                ref sbt_record,
                origin,
                tmin,
                direction,
                tmax,
                time,
                attributes: pointer,
            } => {
                ext_only(kind == Hk::Nv)?;
                self.validate_acceleration_structure(acceleration_structure, context)?;
                for (operand, operand_kind) in [
                    (instance_id, RayOperand::Int),
                    (primitive_id, RayOperand::Int),
                    (geometry_index, RayOperand::Int),
                    (hit_kind, RayOperand::Uint),
                    (origin, RayOperand::Vector),
                    (tmin, RayOperand::Float),
                    (direction, RayOperand::Vector),
                    (tmax, RayOperand::Float),
                ]
                .into_iter()
                .chain(
                    sbt_record
                        .operands()
                        .into_iter()
                        .map(|operand| (operand, RayOperand::Uint)),
                )
                .chain(time.map(|time| (time, RayOperand::Float)))
                {
                    self.validate_ray_operand(operand, operand_kind, context)?;
                }
                self.validate_hit_object_pointer(pointer, attributes, context)
            }
            Hf::RecordMiss {
                flags,
                miss_index,
                origin,
                tmin,
                direction,
                tmax,
                time,
            } => {
                ext_only(flags.is_some() == (kind == Hk::Ext))?;
                for (operand, operand_kind) in [
                    (miss_index, RayOperand::Uint),
                    (origin, RayOperand::Vector),
                    (tmin, RayOperand::Float),
                    (direction, RayOperand::Vector),
                    (tmax, RayOperand::Float),
                ]
                .into_iter()
                .chain(flags.map(|flags| (flags, RayOperand::Uint)))
                .chain(time.map(|time| (time, RayOperand::Float)))
                {
                    self.validate_ray_operand(operand, operand_kind, context)?;
                }
                Ok(())
            }
            Hf::RecordEmpty => Ok(()),
            Hf::RecordFromQuery {
                query,
                sbt_record_index,
                attributes: pointer,
                hit_kind,
            } => {
                ext_only(kind == Hk::Ext)?;
                let is_query =
                    match *context.resolve_type_inner(query, &self.valid_expression_set)? {
                        crate::TypeInner::Pointer { base, .. } => {
                            matches!(context.types[base].inner, crate::TypeInner::RayQuery { .. })
                        }
                        _ => false,
                    };
                if !is_query {
                    return Err(FunctionError::InvalidRayQueryExpression(query)
                        .with_span_static(span, "invalid query expression"));
                }
                for operand in core::iter::once(sbt_record_index).chain(hit_kind) {
                    self.validate_ray_operand(operand, RayOperand::Uint, context)?;
                }
                self.validate_hit_object_pointer(pointer, attributes, context)
            }
            Hf::ExecuteShader { payload } => {
                self.validate_hit_object_pointer(payload, crate::AddressSpace::RayPayload, context)
            }
            Hf::ReorderExecute {
                payload,
                hint: reorder,
            } => {
                ext_only(kind == Hk::Ext)?;
                self.validate_hit_object_pointer(
                    payload,
                    crate::AddressSpace::RayPayload,
                    context,
                )?;
                hint(reorder)
            }
            Hf::GetAttributes {
                attributes: pointer,
            } => self.validate_hit_object_pointer(pointer, attributes, context),
            Hf::SetShaderBindingTableRecordIndex { index } => {
                ext_only(kind == Hk::Ext)?;
                self.validate_ray_operand(index, RayOperand::Uint, context)
            }
            Hf::ReorderThread { hint: reorder } => hint(reorder),
        }
    }

    fn validate_ray_data(
        &self,
        data: crate::RayTracingData,
        spaces: &[crate::AddressSpace],
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let crate::RayTracingData::Pointer(pointer) = data else {
            return Ok(());
        };
        match *context.resolve_type_inner(pointer, &self.valid_expression_set)? {
            crate::TypeInner::Pointer { space, .. } if spaces.contains(&space) => {}
            crate::TypeInner::Pointer { space, .. } => {
                return Err(FunctionError::InvalidPayloadAddressSpace(space)
                    .with_span_handle(pointer, context.expressions))
            }
            _ => {
                return Err(FunctionError::InvalidPayloadType
                    .with_span_handle(pointer, context.expressions))
            }
        }
        match context.expressions[pointer] {
            crate::Expression::GlobalVariable(_) => Ok(()),
            _ => Err(FunctionError::PayloadPointerNotGlobal
                .with_span_handle(pointer, context.expressions)),
        }
    }
}
