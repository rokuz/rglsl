mod atomic;
mod cooperative;
mod image;
mod ray;
mod subgroup;

use alloc::{format, string::String, vec::Vec};

pub use self::atomic::AtomicError;
pub use self::subgroup::SubgroupError;

use super::{
    ExpressionError, FunctionInfo, ModuleInfo,
    analyzer::{UniformityDisruptor, UniformityRequirements},
};
use crate::arena::{Arena, Handle, HandleSet, Range, UniqueArena};
use crate::proc::TypeResolution;
use crate::span::{AddSpan as _, MapErrWithSpan as _, WithSpan};

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
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
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum LocalVariableError {
    #[error("Local variable has a type {0:?} that can't be stored in a local variable.")]
    InvalidType(Handle<crate::Type>),
    #[error("Initializer doesn't match the variable type")]
    InitializerType,
    #[error("Initializer is not a const or override expression")]
    NonConstOrOverrideInitializer,
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum FunctionError {
    #[error("internal error: the analysis of a block did not finish")]
    Unfinished,
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
    #[error(
        "Argument '{name}' at index {index} is a pointer of space {space:?}, which can't be passed into functions."
    )]
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
    #[error(
        "The `return` expression {expression:?} does not match the declared return type {expected_ty:?}"
    )]
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
    #[error("Ray descriptor {0:?} is not a matching expression")]
    InvalidRayDescriptor(Handle<crate::Expression>),
    #[error("Ray Query {0:?} does not have a matching type")]
    InvalidRayQueryType(Handle<crate::Type>),
    #[error("Hit distance {0:?} must be an f32")]
    InvalidHitDistanceType(Handle<crate::Expression>),
    #[error(
        "Required uniformity of control flow for {0:?} in {1:?} is not fulfilled because of {2:?}"
    )]
    NonUniformControlFlow(
        UniformityRequirements,
        Handle<crate::Expression>,
        UniformityDisruptor,
    ),
    #[error(
        "Functions that are not entry points cannot have `@location` or `@builtin` attributes on their arguments: \"{name}\" has attributes"
    )]
    PipelineInputRegularFunction { name: String },
    #[error(
        "Functions that are not entry points cannot have `@location` or `@builtin` attributes on their return value types"
    )]
    PipelineOutputRegularFunction,
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
    #[error(
        "Expression {0:?} in mesh shader intrinsic call should be `u32` (is the expression a signed integer?)"
    )]
    InvalidMeshFunctionCall(Handle<crate::Expression>),
    #[error("Task payload variables differ from {0:?} to {1:?}")]
    ConflictingTaskPayloadVariables(Handle<crate::Expression>, Handle<crate::Expression>),
    #[error("Mesh shader output at {0:?} is not a user-defined struct")]
    InvalidMeshShaderOutputType(Handle<crate::Expression>),
    #[error("The payload type passed to `traceRay` must be a pointer")]
    InvalidPayloadType,
    #[error(
        "The payload type passed to `traceRay` must be a pointer with an address space of `ray_payload` or `incoming_ray_payload`, instead got {0:?}"
    )]
    InvalidPayloadAddressSpace(crate::AddressSpace),
    #[error("The ray tracing operand {0:?} has the wrong type")]
    InvalidRayOperand(Handle<crate::Expression>),
    #[error("The payload passed to `traceRay` must be a pointer directly to a global variable")]
    PayloadPointerNotGlobal,
    #[error("Expression {0:?} is not a pointer to a hit object")]
    InvalidHitObjectExpression(Handle<crate::Expression>),
    #[error("This hit object operation is not available for {0:?} hit objects")]
    InvalidHitObjectOperation(crate::HitObjectFlavor),
    #[error("The message type {0:?} of an abort does not hold its message and arguments")]
    InvalidAbortMessage(Handle<crate::Type>),
    #[error("Invalid operand {0:?} of a tensor write")]
    InvalidTensorWrite(Handle<crate::Expression>),
    #[error("Operand {0:?} of a SPIR-V instruction is invalid")]
    InvalidSpirvOperand(Handle<crate::Expression>),
    #[error("The argument {0:?} of an abort does not match its message type")]
    InvalidAbortArgument(Handle<crate::Expression>),
}

fn logically_matches(
    types: &UniqueArena<crate::Type>,
    left: Handle<crate::Type>,
    right: Handle<crate::Type>,
) -> bool {
    use crate::TypeInner as Ti;
    let mut pending = Vec::from([(left, right)]);
    while let Some((left, right)) = pending.pop() {
        if left == right {
            continue;
        }
        let matches = match (&types[left].inner, &types[right].inner) {
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
            ) => {
                pending.push((left_base, right_base));
                left_size == right_size
            }
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
                pending.extend(
                    left_members
                        .iter()
                        .zip(right_members)
                        .rev()
                        .map(|(left, right)| (left.ty, right.ty)),
                );
                left_members.len() == right_members.len()
            }
            (left, right) => left == right,
        };
        if !matches {
            return false;
        }
    }
    true
}

pub(crate) fn abort_message_length(message: &str) -> u32 {
    let length = u32::try_from(message.len()).unwrap_or(u32::MAX - 4);
    (length + 1).next_multiple_of(4)
}

bitflags::bitflags! {
    #[repr(transparent)]
    #[derive(Clone, Copy)]
    struct ControlFlowAbility: u8 {
        const RETURN = 0x1;
        const BREAK = 0x2;
        const CONTINUE = 0x4;
    }
}

enum Validation<'a> {
    Block {
        statements: &'a crate::Block,
        context: BlockContext<'a>,
        scoped: bool,
    },
    Statement(&'a crate::Statement, crate::Span, BlockContext<'a>),
    Scope(usize),
    BreakIf {
        condition: Option<Handle<crate::Expression>>,
        context: BlockContext<'a>,
        base: usize,
    },
}

struct BlockInfo {
    stages: super::ShaderStages,
}

#[derive(Clone, Copy)]
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
        use crate::Expression as E;
        let E::Load { pointer } = *self.get_expression(image) else {
            return None;
        };
        let mut current = pointer;
        let global = loop {
            match *self.get_expression(current) {
                E::Access { base, .. }
                | E::AccessIndex { base, .. }
                | E::HeapOffset { pointer: base, .. } => current = base,
                E::GlobalVariable(global) => break global,
                E::Literal(_)
                | E::Constant(_)
                | E::Override(_)
                | E::ZeroValue(_)
                | E::Compose { .. }
                | E::Splat { .. }
                | E::Swizzle { .. }
                | E::FunctionArgument(_)
                | E::LocalVariable(_)
                | E::Load { .. }
                | E::ImageSample { .. }
                | E::ImageLoad { .. }
                | E::ImageQuery { .. }
                | E::Unary { .. }
                | E::Binary { .. }
                | E::Select { .. }
                | E::Derivative { .. }
                | E::Relational { .. }
                | E::Math { .. }
                | E::As { .. }
                | E::CallResult(_)
                | E::AtomicResult { .. }
                | E::ArrayLength(_)
                | E::WideArrayLength(_)
                | E::PhysicalPointer { .. }
                | E::PhysicalAddress { .. }
                | E::BufferPointer { .. }
                | E::RayQueryProceedResult
                | E::RayQueryGet { .. }
                | E::ReportIntersectionResult
                | E::AccelerationStructureFromAddress { .. }
                | E::HitObjectGet { .. }
                | E::FetchMicroTriangleVertex { .. }
                | E::SubgroupBallotResult
                | E::SubgroupOperationResult { .. }
                | E::SpirvInstructionResult { .. }
                | E::CooperativeLoad { .. }
                | E::CooperativeMultiplyAdd { .. }
                | E::CooperativeMatrixLength { .. }
                | E::Replicate { .. }
                | E::Expect { .. }
                | E::ImageSparseResident { .. }
                | E::IsHelperInvocation
                | E::ReadClock { .. }
                | E::InterpolateAt { .. }
                | E::FragmentFetch { .. }
                | E::ImageFootprint { .. }
                | E::AttachmentRead { .. }
                | E::CooperativeVectorLoad { .. }
                | E::CooperativeVectorMatMul { .. }
                | E::Convert { .. }
                | E::CooperativeMatrixResult { .. }
                | E::TensorCreate { .. }
                | E::ImageProcessing { .. }
                | E::ArrayConversion { .. }
                | E::Bitcast { .. }
                | E::TensorSet { .. }
                | E::TensorRead { .. }
                | E::TensorQuerySize { .. } => return None,
            }
        };
        if let crate::TypeInner::Pointer {
            base,
            space: crate::AddressSpace::DescriptorHeap(_),
        } = *self.resolve_pointer_type(pointer)
        {
            Some((global, base))
        } else {
            None
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

fn same_image_but_access(parameter: &crate::TypeInner, argument: &crate::TypeInner) -> bool {
    match (parameter, argument) {
        (
            &crate::TypeInner::Image {
                dim,
                arrayed,
                class:
                    crate::ImageClass::Storage {
                        format,
                        multi,
                        access: _,
                    },
            },
            &crate::TypeInner::Image {
                dim: argument_dim,
                arrayed: argument_arrayed,
                class:
                    crate::ImageClass::Storage {
                        format: argument_format,
                        multi: argument_multi,
                        access: _,
                    },
            },
        ) => {
            dim == argument_dim
                && arrayed == argument_arrayed
                && format == argument_format
                && multi == argument_multi
        }
        _ => false,
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
            if !context.compare_types(&TypeResolution::Handle(arg.ty), ty)
                && !same_image_but_access(
                    &context.types[arg.ty].inner,
                    ty.inner_with(context.types),
                )
            {
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
            if let crate::Expression::CallResult(callee) = context.expressions[expr]
                && fun.result.is_some()
                && callee == function
            {
                if !self.needs_visit.remove(expr) {
                    return Err(CallError::ResultAlreadyPopulated(expr)
                        .with_span_handle(expr, context.expressions));
                }
            } else {
                return Err(CallError::ExpressionMismatch(result)
                    .with_span_handle(expr, context.expressions));
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

    fn validate_emit(
        &mut self,
        range: &Range<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::Expression as Ex;
        for handle in range.clone() {
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
                | Ex::Bitcast { .. }
                | Ex::ImageLoad { .. }
                | Ex::ImageQuery { .. }
                | Ex::ImageSparseResident { .. }
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
                | Ex::TensorQuerySize { .. }
                | Ex::IsHelperInvocation
                | Ex::ReadClock { .. }
                | Ex::AttachmentRead { .. }
                | Ex::InterpolateAt { .. }
                | Ex::FragmentFetch { .. }
                | Ex::ImageFootprint { .. } => self.emit_expression(handle, context)?,
                Ex::CallResult(_)
                | Ex::AtomicResult { .. }
                | Ex::RayQueryProceedResult
                | Ex::ReportIntersectionResult
                | Ex::SubgroupBallotResult
                | Ex::SubgroupOperationResult { .. }
                | Ex::SpirvInstructionResult { .. }
                | Ex::CooperativeMatrixResult { .. } => {
                    return Err(FunctionError::EmitResult(handle)
                        .with_span_handle(handle, context.expressions));
                }
            }
        }
        Ok(())
    }

    fn validate_return(
        &self,
        value: Option<Handle<crate::Expression>>,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        if !context.abilities.contains(ControlFlowAbility::RETURN) {
            return Err(FunctionError::InvalidReturnSpot.with_span_static(span, "invalid return"));
        }
        let value_ty = value
            .map(|expr| context.resolve_type(expr, &self.valid_expression_set))
            .transpose()?;
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
        Ok(())
    }

    fn validate_store(
        &self,
        pointer: Handle<crate::Expression>,
        value: Handle<crate::Expression>,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::{AddressSpace, Expression as E, TypeInner as Ti};
        let mut current = pointer;
        loop {
            match context.expressions[current] {
                E::Access { base, .. } | E::AccessIndex { base, .. } => current = base,
                E::LocalVariable(_)
                | E::GlobalVariable(_)
                | E::FunctionArgument(_)
                | E::BufferPointer { .. } => break,
                E::Literal(_)
                | E::Constant(_)
                | E::Override(_)
                | E::ZeroValue(_)
                | E::Compose { .. }
                | E::Splat { .. }
                | E::Swizzle { .. }
                | E::Load { .. }
                | E::ImageSample { .. }
                | E::ImageLoad { .. }
                | E::ImageQuery { .. }
                | E::Unary { .. }
                | E::Binary { .. }
                | E::Select { .. }
                | E::Derivative { .. }
                | E::Relational { .. }
                | E::Math { .. }
                | E::As { .. }
                | E::CallResult(_)
                | E::AtomicResult { .. }
                | E::ArrayLength(_)
                | E::WideArrayLength(_)
                | E::PhysicalPointer { .. }
                | E::PhysicalAddress { .. }
                | E::HeapOffset { .. }
                | E::RayQueryProceedResult
                | E::RayQueryGet { .. }
                | E::ReportIntersectionResult
                | E::AccelerationStructureFromAddress { .. }
                | E::HitObjectGet { .. }
                | E::FetchMicroTriangleVertex { .. }
                | E::SubgroupBallotResult
                | E::SubgroupOperationResult { .. }
                | E::SpirvInstructionResult { .. }
                | E::CooperativeLoad { .. }
                | E::CooperativeMultiplyAdd { .. }
                | E::CooperativeMatrixLength { .. }
                | E::Replicate { .. }
                | E::Expect { .. }
                | E::ImageSparseResident { .. }
                | E::IsHelperInvocation
                | E::ReadClock { .. }
                | E::InterpolateAt { .. }
                | E::FragmentFetch { .. }
                | E::ImageFootprint { .. }
                | E::AttachmentRead { .. }
                | E::CooperativeVectorLoad { .. }
                | E::CooperativeVectorMatMul { .. }
                | E::Convert { .. }
                | E::CooperativeMatrixResult { .. }
                | E::TensorCreate { .. }
                | E::ImageProcessing { .. }
                | E::ArrayConversion { .. }
                | E::Bitcast { .. }
                | E::TensorSet { .. }
                | E::TensorRead { .. }
                | E::TensorQuerySize { .. } => {
                    if matches!(
                        context.resolve_pointer_type(current).pointer_space(),
                        Some(AddressSpace::PhysicalStorage { .. })
                    ) {
                        break;
                    }
                    return Err(FunctionError::InvalidStorePointer(current)
                        .with_span_handle(pointer, context.expressions));
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
            Ti::Scalar(_)
            | Ti::Vector { .. }
            | Ti::Matrix { .. }
            | Ti::CooperativeMatrix { .. }
            | Ti::LongVector { .. }
            | Ti::TensorLayout { .. }
            | Ti::TensorView { .. }
            | Ti::Tensor { .. }
            | Ti::Atomic(_)
            | Ti::Pointer { .. }
            | Ti::ValuePointer { .. }
            | Ti::Array { .. }
            | Ti::Struct { .. }
            | Ti::AccelerationStructure
            | Ti::RayQuery
            | Ti::HitObject { .. }
            | Ti::BindingArray { .. }
            | Ti::BufferDescriptor { .. }
            | Ti::Spirv { .. } => {}
        }

        let pointer_ty = context.resolve_pointer_type(pointer);
        let pointer_base_tr = pointer_ty.pointer_base_type();
        let pointer_base_ty = pointer_base_tr
            .as_ref()
            .map(|ty| ty.inner_with(context.types));
        let good = if let Some(&Ti::Atomic(ref scalar)) = pointer_base_ty {
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

        if let Some(space) = pointer_ty.pointer_space()
            && !space.access().contains(crate::StorageAccess::STORE)
        {
            return Err(
                FunctionError::InvalidStorePointer(pointer).with_span_static(
                    context.expressions.get_span(pointer),
                    "writing to this location is not permitted",
                ),
            );
        }
        Ok(())
    }

    fn validate_spirv_instruction(
        &mut self,
        operands: &[crate::SpirvOperand],
        result: Option<Handle<crate::Expression>>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::TypeInner as Ti;
        for operand in operands {
            match *operand {
                crate::SpirvOperand::Value(value) => {
                    context.resolve_type_inner(value, &self.valid_expression_set)?;
                }
                crate::SpirvOperand::Pointer(pointer) => {
                    let inner = context.resolve_type_inner(pointer, &self.valid_expression_set)?;
                    if !matches!(*inner, Ti::Pointer { .. } | Ti::ValuePointer { .. }) {
                        return Err(FunctionError::InvalidSpirvOperand(pointer)
                            .with_span_handle(pointer, context.expressions));
                    }
                }
                crate::SpirvOperand::Literal(_) => {}
            }
        }
        if let Some(result) = result {
            if !matches!(
                context.expressions[result],
                crate::Expression::SpirvInstructionResult { .. }
            ) {
                return Err(FunctionError::InvalidSpirvOperand(result)
                    .with_span_handle(result, context.expressions));
            }
            self.emit_expression(result, context)?;
        }
        Ok(())
    }

    fn validate_mesh_function(
        &self,
        function: &crate::MeshFunction,
        context: &BlockContext,
    ) -> Result<super::ShaderStages, WithSpan<FunctionError>> {
        let stages = match *function {
            crate::MeshFunction::EmitMeshTasks { .. } => super::ShaderStages::TASK,
            crate::MeshFunction::SetMeshOutputs { .. }
            | crate::MeshFunction::WritePackedPrimitiveIndices { .. } => super::ShaderStages::MESH,
        };
        function.try_for_each_operand(|operand| {
            let inner = context.resolve_type_inner(operand, &self.valid_expression_set)?;
            if *inner == crate::TypeInner::Scalar(crate::Scalar::U32) {
                Ok(())
            } else {
                Err(FunctionError::InvalidMeshFunctionCall(operand)
                    .with_span_handle(operand, context.expressions))
            }
        })?;
        Ok(stages)
    }

    fn validate_abort(
        &self,
        message: &str,
        ty: Handle<crate::Type>,
        arguments: &[Handle<crate::Expression>],
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        use crate::TypeInner as Ti;
        let invalid_message = || {
            FunctionError::InvalidAbortMessage(ty).with_span_static(span, "invalid abort message")
        };
        let Ti::Struct { ref members, .. } = context.types[ty].inner else {
            return Err(invalid_message());
        };
        let Some((text, values)) = members.split_first() else {
            return Err(invalid_message());
        };
        let text_ok = if let Ti::Array {
            base,
            size: crate::ArraySize::Constant(length),
            ..
        } = context.types[text.ty].inner
        {
            context.types[base].inner
                == Ti::Scalar(crate::Scalar {
                    kind: crate::ScalarKind::Sint,
                    width: 1,
                })
                && length.get() == abort_message_length(message)
        } else {
            false
        };
        if !text_ok || message.contains('\0') || values.len() != arguments.len() {
            return Err(invalid_message());
        }
        for (&argument, member) in arguments.iter().zip(values) {
            let matches = match *context.resolve_type(argument, &self.valid_expression_set)? {
                TypeResolution::Handle(handle) => {
                    logically_matches(context.types, handle, member.ty)
                }
                TypeResolution::Value(ref inner) => *inner == context.types[member.ty].inner,
            };
            if !matches {
                return Err(FunctionError::InvalidAbortArgument(argument)
                    .with_span_handle(argument, context.expressions));
            }
        }
        Ok(())
    }

    fn validate_condition(
        &self,
        condition: Handle<crate::Expression>,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        if matches!(
            *context.resolve_type_inner(condition, &self.valid_expression_set)?,
            crate::TypeInner::Scalar(crate::Scalar {
                kind: crate::ScalarKind::Bool,
                width: _,
            })
        ) {
            Ok(())
        } else {
            Err(FunctionError::InvalidIfType(condition)
                .with_span_handle(condition, context.expressions))
        }
    }

    fn validate_switch_cases(
        &mut self,
        selector: Handle<crate::Expression>,
        cases: &[crate::SwitchCase],
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<(), WithSpan<FunctionError>> {
        let uint = match context
            .resolve_type_inner(selector, &self.valid_expression_set)?
            .scalar_kind()
        {
            Some(crate::ScalarKind::Uint) => true,
            Some(crate::ScalarKind::Sint) => false,
            _ => {
                return Err(FunctionError::InvalidSwitchType(selector)
                    .with_span_handle(selector, context.expressions));
            }
        };
        self.switch_values.clear();
        for case in cases {
            match case.value {
                crate::SwitchValue::I32(_) if !uint => {}
                crate::SwitchValue::U32(_) if uint => {}
                crate::SwitchValue::Default => {}
                crate::SwitchValue::I32(_) | crate::SwitchValue::U32(_) => {
                    return Err(FunctionError::ConflictingCaseType.with_span_static(
                        case.body
                            .span_iter()
                            .next()
                            .map_or(Default::default(), |(_, s)| *s),
                        "conflicting switch arm here",
                    ));
                }
            }
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
                    crate::SwitchValue::I32(_) | crate::SwitchValue::U32(_) => {
                        FunctionError::ConflictingSwitchCase(case.value).with_span_static(
                            case.body
                                .span_iter()
                                .next()
                                .map_or(Default::default(), |(_, s)| *s),
                            "conflicting switch arm here",
                        )
                    }
                });
            }
        }
        if !self.switch_values.contains(&crate::SwitchValue::Default) {
            return Err(
                FunctionError::MissingDefaultCase.with_span_static(span, "missing default case")
            );
        }
        if let Some(case) = cases.last()
            && case.fall_through
        {
            return Err(FunctionError::LastCaseFallTrough.with_span_static(
                case.body
                    .span_iter()
                    .next()
                    .map_or(Default::default(), |(_, s)| *s),
                "bad switch arm here",
            ));
        }
        Ok(())
    }

    fn validate_statement(
        &mut self,
        statement: &crate::Statement,
        span: crate::Span,
        context: &BlockContext,
    ) -> Result<super::ShaderStages, WithSpan<FunctionError>> {
        use crate::Statement as S;
        let mut stages = super::ShaderStages::all();
        match *statement {
            S::Emit(ref range) => self.validate_emit(range, context)?,
            S::Block(_) | S::If { .. } | S::Switch { .. } | S::Loop { .. } => {}
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
            S::Return { value } => self.validate_return(value, span, context)?,
            S::Kill | S::Demote | S::BeginInvocationInterlock | S::EndInvocationInterlock => {
                stages &= super::ShaderStages::FRAGMENT;
            }
            S::SplitBarrier { .. } | S::ScopedBarrier { .. } => {}
            S::EmitVertex { .. } | S::EndPrimitive { .. } => {
                stages &= super::ShaderStages::GEOMETRY;
            }
            S::CooperativeMatrix {
                ref function,
                result,
            } => self.validate_cooperative_matrix_statement(function, result, context)?,
            S::CooperativeVector(ref function) => {
                self.validate_cooperative_vector_statement(function, context)?;
            }
            S::SpirvInstruction {
                ref operands,
                result,
                ..
            } => self.validate_spirv_instruction(operands, result, context)?,
            S::Assume { condition } => self.validate_condition(condition, context)?,
            S::MeshFunction(ref function) => {
                stages &= self.validate_mesh_function(function, context)?;
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
            } => self.validate_abort(message, ty, arguments, span, context)?,
            S::TensorWrite {
                tensor,
                coordinates,
                value,
                ..
            } => self.validate_tensor_write(tensor, coordinates, value, context)?,
            S::ControlBarrier(_) | S::MemoryBarrier(_) => {
                stages &= super::ShaderStages::COMPUTE_LIKE;
            }
            S::Store { pointer, value } => self.validate_store(pointer, value, span, context)?,
            S::ImageStore {
                image,
                coordinate,
                array_index,
                sample,
                level,
                value,
            } => self.validate_image_store(
                image,
                coordinate,
                array_index,
                sample,
                level,
                value,
                span,
                context,
            )?,
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
                    }));
                }
            },
            S::Atomic {
                pointer,
                ref fun,
                value,
                result,
                order: _,
            } => self.validate_atomic(pointer, *fun, value, result, span, context)?,
            S::ImageAtomic {
                image,
                coordinate,
                array_index,
                fun,
                value,
                sample,
                result,
                order: _,
            } => self.validate_image_atomic(
                image,
                coordinate,
                array_index,
                fun,
                value,
                sample,
                result,
                context,
            )?,
            S::AtomicLoad {
                ref location,
                order: _,
                result,
            } => self.validate_atomic_load(location, result, context)?,
            S::AtomicStore {
                ref location,
                value,
                order: _,
            } => self.validate_atomic_store(location, value, context)?,
            S::RayQuery { query, ref fun } => {
                self.validate_ray_query(query, fun, span, context)?;
            }
            S::SubgroupBallot { result, predicate } => {
                self.validate_subgroup_ballot(result, predicate, context)?;
            }
            S::SubgroupCollectiveOperation {
                op,
                collective_op,
                argument,
                result,
            } => self.validate_subgroup_operation(op, collective_op, argument, result, context)?,
            S::SubgroupGather {
                ref mode,
                argument,
                result,
            } => self.validate_subgroup_gather(mode, argument, result, context)?,
            S::SubgroupFunction { ref fun, result } => {
                self.validate_subgroup_function(fun, result, context)?;
            }
            S::CooperativeStore { target, ref data } => {
                self.validate_cooperative_store(target, data, context)?;
            }
            S::HitObject { object, ref fun } => {
                stages &= self.validate_hit_object(object, fun, span, context)?;
            }
            S::ReorderThread {
                flavor: _,
                hint,
                bits,
            } => {
                stages &= self.validate_reorder_thread(hint, bits, context)?;
            }
            S::RayPipelineFunction(ref fun) => {
                stages &= self.validate_ray_pipeline_function(fun, span, context)?;
            }
        }
        Ok(stages)
    }

    fn validate_block(
        &mut self,
        statements: &crate::Block,
        context: &BlockContext,
    ) -> Result<BlockInfo, WithSpan<FunctionError>> {
        let mut stages = super::ShaderStages::all();
        let mut tasks = Vec::from([Validation::Block {
            statements,
            context: *context,
            scoped: true,
        }]);
        while let Some(task) = tasks.pop() {
            match task {
                Validation::Block {
                    statements,
                    context,
                    scoped,
                } => {
                    if scoped {
                        tasks.push(Validation::Scope(self.valid_expression_list.len()));
                    }
                    tasks.extend(
                        (0..statements.len())
                            .rev()
                            .filter_map(|index| statements.span_at(index))
                            .map(|(statement, &span)| {
                                Validation::Statement(statement, span, context)
                            }),
                    );
                }
                Validation::Statement(statement, span, context) => {
                    stages &= self.validate_statement_kind(statement, span, context, &mut tasks)?;
                }
                Validation::Scope(base) => self.forget_expressions(base),
                Validation::BreakIf {
                    condition,
                    context,
                    base,
                } => {
                    if let Some(condition) = condition {
                        self.validate_condition(condition, &context)?;
                    }
                    self.forget_expressions(base);
                }
            }
        }
        Ok(BlockInfo { stages })
    }

    fn forget_expressions(&mut self, base: usize) {
        for handle in self.valid_expression_list.drain(base..) {
            self.valid_expression_set.remove(handle);
        }
    }

    fn validate_statement_kind<'a>(
        &mut self,
        statement: &'a crate::Statement,
        span: crate::Span,
        context: BlockContext<'a>,
        tasks: &mut Vec<Validation<'a>>,
    ) -> Result<super::ShaderStages, WithSpan<FunctionError>> {
        use crate::Statement as S;
        let block = |statements, context, scoped| Validation::Block {
            statements,
            context,
            scoped,
        };
        match *statement {
            S::Block(ref inner) => tasks.push(block(inner, context, true)),
            S::If {
                condition,
                ref accept,
                ref reject,
                control: _,
            } => {
                self.validate_condition(condition, &context)?;
                tasks.push(block(reject, context, true));
                tasks.push(block(accept, context, true));
            }
            S::Switch {
                selector,
                ref cases,
                control: _,
            } => {
                self.validate_switch_cases(selector, cases, span, &context)?;
                let pass_through_abilities =
                    context.abilities & (ControlFlowAbility::RETURN | ControlFlowAbility::CONTINUE);
                let sub_context =
                    context.with_abilities(pass_through_abilities | ControlFlowAbility::BREAK);
                tasks.extend(
                    cases
                        .iter()
                        .rev()
                        .map(|case| block(&case.body, sub_context, true)),
                );
            }
            S::Loop {
                ref body,
                ref continuing,
                break_if,
                control: _,
            } => {
                let pass_through_abilities = context.abilities & ControlFlowAbility::RETURN;
                tasks.push(Validation::BreakIf {
                    condition: break_if,
                    context,
                    base: self.valid_expression_list.len(),
                });
                tasks.push(block(
                    continuing,
                    context.with_abilities(ControlFlowAbility::empty()),
                    false,
                ));
                tasks.push(block(
                    body,
                    context.with_abilities(
                        pass_through_abilities
                            | ControlFlowAbility::BREAK
                            | ControlFlowAbility::CONTINUE,
                    ),
                    false,
                ));
            }
            S::Emit(_)
            | S::Break
            | S::Continue
            | S::Return { .. }
            | S::Kill
            | S::Demote
            | S::BeginInvocationInterlock
            | S::EndInvocationInterlock
            | S::EmitVertex { .. }
            | S::EndPrimitive { .. }
            | S::ControlBarrier(_)
            | S::MemoryBarrier(_)
            | S::ScopedBarrier { .. }
            | S::SplitBarrier { .. }
            | S::Store { .. }
            | S::ImageStore { .. }
            | S::Atomic { .. }
            | S::AtomicLoad { .. }
            | S::AtomicStore { .. }
            | S::ImageAtomic { .. }
            | S::Call { .. }
            | S::RayQuery { .. }
            | S::RayPipelineFunction(_)
            | S::HitObject { .. }
            | S::ReorderThread { .. }
            | S::MeshFunction(_)
            | S::SubgroupBallot { .. }
            | S::SubgroupGather { .. }
            | S::SubgroupCollectiveOperation { .. }
            | S::SubgroupFunction { .. }
            | S::CooperativeStore { .. }
            | S::DebugPrintf { .. }
            | S::Assume { .. }
            | S::CooperativeVector(_)
            | S::CooperativeMatrix { .. }
            | S::Abort { .. }
            | S::TensorWrite { .. }
            | S::SpirvInstruction { .. } => {
                return self.validate_statement(statement, span, &context);
            }
        }
        Ok(super::ShaderStages::all())
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
        let mut info = mod_info.process_function(fun, module, self.flags)?;

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
                    .with_span_handle(argument.ty, &module.types));
                }
            }
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
            use crate::TypeInner as Ti;
            let tensor = match module.types[result.ty].inner {
                Ti::Tensor { .. } => true,
                Ti::BindingArray {
                    base,
                    size: crate::ArraySize::Constant(_),
                } => matches!(module.types[base].inner, Ti::Tensor { .. }),
                Ti::BindingArray {
                    size: crate::ArraySize::Pending(_) | crate::ArraySize::Dynamic,
                    ..
                }
                | Ti::Scalar(_)
                | Ti::Vector { .. }
                | Ti::Matrix { .. }
                | Ti::CooperativeMatrix { .. }
                | Ti::LongVector { .. }
                | Ti::TensorLayout { .. }
                | Ti::TensorView { .. }
                | Ti::Atomic(_)
                | Ti::Pointer { .. }
                | Ti::ValuePointer { .. }
                | Ti::Array { .. }
                | Ti::Struct { .. }
                | Ti::Image { .. }
                | Ti::Sampler { .. }
                | Ti::SampledImage { .. }
                | Ti::AccelerationStructure
                | Ti::RayQuery
                | Ti::HitObject { .. }
                | Ti::BufferDescriptor { .. }
                | Ti::Spirv { .. } => false,
            };
            if !tensor
                && !self.types[result.ty.index()]
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
                if let crate::Expression::CallResult(_) | crate::Expression::AtomicResult { .. } =
                    *expr
                {
                    self.needs_visit.insert(handle);
                }

                match self.validate_expression(handle, expr, fun, module, &info, mod_info) {
                    Ok(stages) => info.available_stages &= stages,
                    Err(source) => {
                        return Err(FunctionError::Expression { handle, source }
                            .with_span_handle(handle, &fun.expressions));
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

            if self.flags.contains(super::ValidationFlags::EXPRESSIONS)
                && let Some(handle) = self.needs_visit.iter().next()
            {
                return Err(FunctionError::UnvisitedExpression(handle)
                    .with_span_handle(handle, &fun.expressions));
            }
        }
        Ok(info)
    }
}
