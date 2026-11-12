use alloc::string::String;

use rglsl_ast::Span;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Diagnostic {
    pub span: Span,
    pub kind: DiagnosticKind,
}

impl Diagnostic {
    pub fn offset(&self, source: &str) -> u32 {
        let skipped = self.span.text(source).map_or(0, |text| {
            let mut rest = text;
            loop {
                let trimmed = rest.trim_start();
                let after_comment = if let Some(comment) = trimmed.strip_prefix("//") {
                    comment.split_once('\n').map(|(_, after)| after)
                } else if let Some(comment) = trimmed.strip_prefix("/*") {
                    comment.split_once("*/").map(|(_, after)| after)
                } else {
                    None
                };
                match after_comment {
                    Some(after) => rest = after,
                    None => break text.len() - trimmed.len(),
                }
            }
        });
        u32::try_from(skipped).map_or(self.span.start, |skipped| {
            self.span.start.saturating_add(skipped)
        })
    }

    pub fn line(&self, source: &str) -> u32 {
        rglsl_ast::line_column(source, self.offset(source)).line
    }
}

#[derive(Debug, Clone, PartialEq, Eq, thiserror::Error)]
pub enum DiagnosticKind {
    #[error("the shader has no `#version` directive")]
    MissingVersion,
    #[error("`#version {0}` is not supported, only 450 and 460 are")]
    UnsupportedVersion(u32),
    #[error("the `{0}` profile is not supported")]
    UnsupportedProfile(String),
    #[error("`{0}` is not declared")]
    UndeclaredIdentifier(String),
    #[error("`{0}` is already declared in this scope")]
    Redeclaration(String),
    #[error("`{0}` names a type, not a value")]
    TypeUsedAsValue(String),
    #[error("`{0}` is not a type")]
    NotAType(String),
    #[error("`{0}` is a variable, it cannot be called")]
    NotAFunction(String),
    #[error("this expression cannot be called")]
    InvalidCallee,
    #[error("`{0}` is not available when targeting Vulkan")]
    RemovedUnderVulkan(String),
    #[error("operator `{operator}` cannot be applied to `{left}` and `{right}`")]
    InvalidOperands {
        operator: &'static str,
        left: String,
        right: String,
    },
    #[error("operator `{operator}` cannot be applied to `{operand}`")]
    InvalidOperand {
        operator: &'static str,
        operand: String,
    },
    #[error("the expression is not an l-value: {0}")]
    NotAnLValue(&'static str),
    #[error("cannot convert `{from}` to `{to}`")]
    CannotConvert { from: String, to: String },
    #[error("no overload of `{0}` matches the arguments")]
    NoMatchingFunction(String),
    #[error("the call to `{0}` is ambiguous")]
    AmbiguousCall(String),
    #[error("invalid arguments to built-in `{name}`: {reason}")]
    InvalidBuiltinCall { name: String, reason: &'static str },
    #[error("invalid constructor of `{ty}`: {reason}")]
    InvalidConstructor { ty: String, reason: &'static str },
    #[error("`{ty}` has no member `{field}`")]
    NoSuchField { ty: String, field: String },
    #[error("`{0}` is not a valid component selection")]
    InvalidSwizzle(String),
    #[error("`.{field}` cannot be applied to `{ty}`")]
    InvalidFieldSelection { ty: String, field: String },
    #[error("`.{0}()` is not a method; only `.length()` exists")]
    UnknownMethod(String),
    #[error("`.length()` cannot be applied to `{0}`")]
    InvalidLength(String),
    #[error("`{0}` cannot be indexed")]
    NotIndexable(String),
    #[error("an index must be a scalar integer, not `{0}`")]
    IndexNotInteger(String),
    #[error("index {index} is out of range for `{ty}`")]
    IndexOutOfRange { index: i64, ty: String },
    #[error("an unsized array cannot be indexed with a non-constant expression")]
    VariableIndexIntoUnsizedArray,
    #[error("a condition must be `bool`, not `{0}`")]
    ConditionNotBool(String),
    #[error("a switch selector must be a scalar integer, not `{0}`")]
    SwitchSelectorNotInteger(String),
    #[error("a case label must be a constant scalar integer")]
    InvalidCaseLabel,
    #[error("duplicate case label")]
    DuplicateCaseLabel,
    #[error("a case label must be directly inside a switch statement")]
    CaseOutsideSwitch,
    #[error("`break` is only allowed in loops and switch statements")]
    BreakOutsideLoop,
    #[error("`continue` is only allowed in loops")]
    ContinueOutsideLoop,
    #[error("cannot return `{from}` from a function returning `{to}`")]
    ReturnTypeMismatch { from: String, to: String },
    #[error("a function returning `{0}` must return a value")]
    MissingReturnValue(String),
    #[error("a `void` function cannot return a value")]
    VoidReturnWithValue,
    #[error("`discard` is only allowed in fragment shaders")]
    DiscardOutsideFragment,
    #[error("`main` must be declared as `void main()`")]
    InvalidMain,
    #[error("the shader does not define `main`")]
    MissingEntryPoint,
    #[error(
        "function `{0}` is declared again with a different return type or parameter qualifiers"
    )]
    ConflictingFunctionDeclaration(String),
    #[error("function `{0}` already has a body")]
    FunctionRedefinition(String),
    #[error("function `{0}`: function attributes are incompatible")]
    IncompatibleFunctionAttributes(String),
    #[error("function `{0}` does not return a value")]
    FunctionWithoutReturn(String),
    #[error("invalid parameter `{name}`: {reason}")]
    InvalidParameter { name: String, reason: &'static str },
    #[error("a `const` variable needs an initializer")]
    ConstWithoutInitializer,
    #[error("the initializer of `{0}` must be a constant expression")]
    NonConstantInitializer(String),
    #[error("`{0}` cannot have an initializer")]
    InitializerNotAllowed(String),
    #[error("invalid null initializer `{{}}`: {0}")]
    InvalidNullInitializer(&'static str),
    #[error("{0}")]
    BindingRequired(&'static str),
    #[error("an array size must be a constant integer expression")]
    ArraySizeNotConstant,
    #[error("invalid type parameters of `{ty}`: {reason}")]
    InvalidTypeParameters {
        ty: &'static str,
        reason: &'static str,
    },
    #[error("`{function}`: {reason}")]
    InvalidCooperativeCall {
        function: String,
        reason: &'static str,
    },
    #[error("an array size must be greater than zero")]
    ArraySizeNotPositive,
    #[error("internal error: the analysis stopped")]
    Internal,
    #[error("an array size is required here")]
    UnsizedArrayNotAllowed,
    #[error("opaque type `{0}` can only be used for uniforms and `in` parameters")]
    OpaqueNotAllowed(String),
    #[error(
        "a tensor returned by a function cannot be passed to a function parameter: a tensor parameter is a `UniformConstant` pointer to a variable"
    )]
    TensorArgumentNotAVariable,
    #[error("`void` cannot be the type of `{0}`")]
    VoidVariable(String),
    #[error("invalid struct member `{name}`: {reason}")]
    InvalidStructMember { name: String, reason: &'static str },
    #[error("non-opaque uniforms outside a block are not allowed when targeting Vulkan")]
    UniformOutsideBlock,
    #[error("invalid attribute `{attribute}`: {reason}")]
    InvalidAttribute {
        attribute: String,
        reason: &'static str,
    },
    #[error("`{subject}`: {reason}")]
    SpirvIntrinsic {
        subject: String,
        reason: &'static str,
    },
    #[error("invalid use of qualifier `{qualifier}`: {reason}")]
    InvalidQualifier {
        qualifier: &'static str,
        reason: &'static str,
    },
    #[error("`gl_WorkGroupSize` cannot be read before the local size is declared")]
    WorkGroupSizeNotDeclared,
    #[error("the value of layout qualifier `{0}` must be a constant integer expression")]
    LayoutValueNotConstant(String),
    #[error("the value of layout qualifier `{0}` cannot be negative")]
    LayoutValueNegative(String),
    #[error("a `writeonly` object cannot be read")]
    WriteOnlyRead,
    #[error("a switch cannot have statements before its first label")]
    StatementBeforeCase,
    #[error("the numeric literal `{0}` is too big")]
    LiteralTooBig(String),
    #[error("a structure cannot be defined inside a structure or block")]
    NestedStructDefinition,
    #[error("identifier `{0}` is reserved: it starts with `gl_`")]
    ReservedIdentifier(String),
    #[error("invalid block `{name}`: {reason}")]
    InvalidBlock { name: String, reason: &'static str },
    #[error("a per-vertex output of a tessellation control shader must be indexed with `gl_InvocationID` when written")]
    PerVertexOutputIndex,
    #[error("invalid interface array `{name}`: {reason}")]
    InvalidInterfaceArray { name: String, reason: &'static str },
    #[error("function `{0}` is called but has no body")]
    MissingFunctionBody(String),
    #[error("#pragma: {0}")]
    InvalidPragma(&'static str),
    #[error("extension `{0}` is not supported")]
    UnsupportedExtension(String),
    #[error("extension `all` cannot have `{0}` behavior")]
    AllExtensionsEnabled(&'static str),
    #[error("`{0}`: mesh shader outputs can only be written, not read")]
    MeshOutputRead(String),
    #[error("extension `{extension}` is not allowed in {stage} shaders")]
    ExtensionStage {
        extension: String,
        stage: &'static str,
    },
    #[error("extension `{0}` cannot be used together with `{1}`")]
    ConflictingExtensions(String, &'static str),
    #[error("extension `{0}` is not allowed when generating SPIR-V")]
    ExtensionWithoutSpirv(String),
    #[error("extension `{name}` is not supported: {reason}")]
    ExtensionNotInVulkan { name: String, reason: &'static str },
    #[error("extension `{0}` needs a newer SPIR-V version")]
    ExtensionSpirvVersion(String),
    #[error("{feature} requires SPIR-V {version}")]
    SpirvVersionRequired {
        feature: &'static str,
        version: &'static str,
    },
    #[error("{feature} requires one of the extensions {extensions}")]
    ExtensionRequired { feature: String, extensions: String },
    #[error("extension `{extension}` is being used for {feature}")]
    ExtensionWarned {
        extension: &'static str,
        feature: String,
    },
    #[error("`{feature}` is not supported in {stage} shaders")]
    NotSupportedInStage {
        feature: String,
        stage: &'static str,
    },
    #[error("overlapping use of location {0}")]
    OverlappingLocation(u32),
    #[error("{what} with layout(location = {location})")]
    RayLocationNotDeclared { what: &'static str, location: u32 },
    #[error(
        "ray queries can only be initialized by using the rayQueryInitializeEXT intrinsic: `{0}`"
    )]
    RayQueryInitializer(String),
    #[error("hit objects cannot be initialized using initializers: `{0}`")]
    HitObjectInitializer(String),
    #[error(
        "{keyword} can only be declared in global or function scope with no storage qualifier: `{name}`"
    )]
    HitObjectStorage { keyword: &'static str, name: String },
    #[error("struct `{structure}` is not allowed to contain {keyword}: `{name}`")]
    StructContainsHitObject {
        structure: String,
        keyword: &'static str,
        name: String,
    },
    #[error("{0}")]
    Warning(String),
}
