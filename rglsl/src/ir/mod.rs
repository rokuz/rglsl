/*!
The Intermediate Representation shared by all frontends and backends.

The central structure of the IR, and the crate, is [`Module`]. A `Module` contains:

- [`Function`]s, which have arguments, a return type, local variables, and a body,

- [`EntryPoint`]s, which are specialized functions that can serve as the entry
  point for pipeline stages like vertex shading or fragment shading,

- [`Constant`]s and [`GlobalVariable`]s used by `EntryPoint`s and `Function`s, and

- [`Type`]s used by the above.

The body of an `EntryPoint` or `Function` is represented using two types:

- An [`Expression`] produces a value, but has no side effects or control flow.
  `Expressions` include variable references, unary and binary operators, and so
  on.

- A [`Statement`] can have side effects and structured control flow.
  `Statement`s do not produce a value, other than by storing one in some
  designated place. `Statements` include blocks, conditionals, and loops, but also
  operations that have side effects, like stores and function calls.

`Statement`s form a tree, with pointers into the DAG of `Expression`s.

Restricting side effects to statements simplifies analysis and code generation.
A rglsl backend can generate code to evaluate an `Expression` however and
whenever it pleases, as long as it is certain to observe the side effects of all
previously executed `Statement`s.

Many `Statement` variants use the [`Block`] type, which is `Vec<Statement>`,
with optional span info, representing a series of statements executed in order. The body of an
`EntryPoint`s or `Function` is a `Block`, and `Statement` has a
[`Block`][Statement::Block] variant.

## Function Calls

rglsl's representation of function calls is unusual. Most languages treat
function calls as expressions, but because calls may have side effects, rglsl
represents them as a kind of statement, [`Statement::Call`]. If the function
returns a value, a call statement designates a particular [`Expression::CallResult`]
expression to represent its return value, for use by subsequent statements and
expressions.

## `Expression` evaluation time

It is essential to know when an [`Expression`] should be evaluated, because its
value may depend on previous [`Statement`]s' effects. But whereas the order of
execution for a tree of `Statement`s is apparent from its structure, it is not
so clear for `Expressions`, since an expression may be referred to by any number
of `Statement`s and other `Expression`s.

rglsl's rules for when `Expression`s are evaluated are as follows:

-   [`Literal`], [`Constant`], and [`ZeroValue`] expressions are
    considered to be implicitly evaluated before execution begins.

-   [`FunctionArgument`] and [`LocalVariable`] expressions are considered
    implicitly evaluated upon entry to the function to which they belong.
    Function arguments cannot be assigned to, and `LocalVariable` expressions
    produce a *pointer to* the variable's value (for use with [`Load`] and
    [`Store`]). Neither varies while the function executes, so it suffices to
    consider these expressions evaluated once on entry.

-   Similarly, [`GlobalVariable`] expressions are considered implicitly
    evaluated before execution begins, since their value does not change while
    code executes, for one of two reasons:

    -   Most `GlobalVariable` expressions produce a pointer to the variable's
        value, for use with [`Load`] and [`Store`], as `LocalVariable`
        expressions do. Although the variable's value may change, its address
        does not.

    -   A `GlobalVariable` expression referring to a global in the
        [`AddressSpace::Handle`] address space produces the value directly, not
        a pointer. Such global variables hold opaque types like shaders or
        images, and cannot be assigned to.

-   A [`CallResult`] expression that is the `result` of a [`Statement::Call`],
    representing the call's return value, is evaluated when the `Call` statement
    is executed.

-   Similarly, an [`AtomicResult`] expression that is the `result` of an
    [`Atomic`] statement, representing the result of the atomic operation, is
    evaluated when the `Atomic` statement is executed.

-   A [`RayQueryProceedResult`] expression, which is a boolean
    indicating if the ray query is finished, is evaluated when the
    [`RayQuery`] statement whose [`Proceed::result`] points to it is
    executed.

-   All other expressions are evaluated when the (unique) [`Statement::Emit`]
    statement that covers them is executed.

Now, strictly speaking, not all `Expression` variants actually care when they're
evaluated. For example, you can evaluate a [`BinaryOperator::Add`] expression
any time you like, as long as you give it the right operands. It's really only a
very small set of expressions that are affected by timing:

-   [`Load`], [`ImageSample`], and [`ImageLoad`] expressions are influenced by
    stores to the variables or images they access, and must execute at the
    proper time relative to them.

-   [`Derivative`] expressions are sensitive to control flow uniformity: they
    must not be moved out of an area of uniform control flow into a non-uniform
    area.

-   More generally, any expression that's used by more than one other expression
    or statement should probably be evaluated only once, and then stored in a
    variable to be cited at each point of use.

rglsl tries to help back ends handle all these cases correctly in a somewhat
circuitous way. The [`ModuleInfo`] structure returned by [`Validator::validate`]
provides a reference count for each expression in each function in the module.
Naturally, any expression with a reference count of two or more deserves to be
evaluated and stored in a temporary variable at the point that the `Emit`
statement covering it is executed. But if we selectively lower the reference
count threshold to _one_ for the sensitive expression types listed above, so
that we _always_ generate a temporary variable and save their value, then the
same code that manages multiply referenced expressions will take care of
introducing temporaries for time-sensitive expressions as well. The
`Expression::bake_ref_count` method (private to the back ends) is meant to help
with this.

## `Expression` scope

Each `Expression` has a *scope*, which is the region of the function within
which it can be used by `Statement`s and other `Expression`s. It is a validation
error to use an `Expression` outside its scope.

An expression's scope is defined as follows:

-   The scope of a [`Constant`], [`GlobalVariable`], [`FunctionArgument`] or
    [`LocalVariable`] expression covers the entire `Function` in which it
    occurs.

-   The scope of an expression evaluated by an [`Emit`] statement covers the
    subsequent expressions in that `Emit`, the subsequent statements in the `Block`
    to which that `Emit` belongs (if any) and their sub-statements (if any).

-   The `result` expression of a [`Call`] or [`Atomic`] statement has a scope
    covering the subsequent statements in the `Block` in which the statement
    occurs (if any) and their sub-statements (if any).

For example, this implies that an expression evaluated by some statement in a
nested `Block` is not available in the `Block`'s parents. Such a value would
need to be stored in a local variable to be carried upwards in the statement
tree.

## Constant expressions

A rglsl *constant expression* is one of the following [`Expression`]
variants, whose operands (if any) are also constant expressions:
- [`Literal`]
- [`Constant`], for [`Constant`]s
- [`ZeroValue`], for fixed-size types
- [`Compose`]
- [`Access`]
- [`AccessIndex`]
- [`Splat`]
- [`Swizzle`]
- [`Unary`]
- [`Binary`]
- [`Select`]
- [`Relational`]
- [`Math`]
- [`As`]

A constant expression can be evaluated at module translation time.

## Override expressions

A rglsl *override expression* is the same as a [constant expression],
except that it is also allowed to reference other [`Override`]s.

An override expression can be evaluated at pipeline creation time.

[`AtomicResult`]: Expression::AtomicResult
[`RayQueryProceedResult`]: Expression::RayQueryProceedResult
[`CallResult`]: Expression::CallResult
[`Constant`]: Expression::Constant
[`ZeroValue`]: Expression::ZeroValue
[`Literal`]: Expression::Literal
[`Derivative`]: Expression::Derivative
[`FunctionArgument`]: Expression::FunctionArgument
[`GlobalVariable`]: Expression::GlobalVariable
[`ImageLoad`]: Expression::ImageLoad
[`ImageSample`]: Expression::ImageSample
[`Load`]: Expression::Load
[`LocalVariable`]: Expression::LocalVariable

[`Atomic`]: Statement::Atomic
[`Call`]: Statement::Call
[`Emit`]: Statement::Emit
[`Store`]: Statement::Store
[`RayQuery`]: Statement::RayQuery

[`Proceed::result`]: RayQueryFunction::Proceed::result

[`Validator::validate`]: crate::valid::Validator::validate
[`ModuleInfo`]: crate::valid::ModuleInfo

[`Literal`]: Expression::Literal
[`ZeroValue`]: Expression::ZeroValue
[`Compose`]: Expression::Compose
[`Access`]: Expression::Access
[`AccessIndex`]: Expression::AccessIndex
[`Splat`]: Expression::Splat
[`Swizzle`]: Expression::Swizzle
[`Unary`]: Expression::Unary
[`Binary`]: Expression::Binary
[`Select`]: Expression::Select
[`Relational`]: Expression::Relational
[`Math`]: Expression::Math
[`As`]: Expression::As

[constant expression]: #constant-expressions
*/

mod block;
mod debug;

use alloc::{boxed::Box, string::String, vec::Vec};

#[cfg(feature = "arbitrary")]
use arbitrary::Arbitrary;
use half::f16;
#[cfg(feature = "deserialize")]
use serde::Deserialize;
#[cfg(feature = "serialize")]
use serde::Serialize;

use crate::arena::{Arena, Handle, Range, UniqueArena};
use crate::diagnostic_filter::DiagnosticFilterNode;
use crate::{FastIndexMap, NamedExpressions, NonUniformExpressions, PrecisionExpressions};

pub use block::{Block, Walk};
pub use debug::{
    apply_spans, collect_spans, shift_module_spans, shift_span, DebugAnchor, DebugFunction, DebugInfo, DebugLine, DebugMember, DebugPosition, DebugScope, DebugSource,
    DebugStruct, DebugUnit, ModuleSpans, ScopeIndex,
};
pub use rglsl_types::{ResourceBinding, ShaderStage};

/// Explicitly allows early depth/stencil tests.
///
/// Normally, depth/stencil tests are performed after fragment shading. However, as an optimization,
/// most drivers will move the depth/stencil tests before fragment shading if this does not
/// have any observable consequences. This optimization is disabled under the following
/// circumstances:
///   - `discard` is called in the fragment shader.
///   - The fragment shader writes to the depth buffer.
///   - The fragment shader writes to any storage bindings.
///
/// When `EarlyDepthTest` is set, it is allowed to perform an early depth/stencil test even if the
/// above conditions are not met. When [`EarlyDepthTest::Force`] is used, depth/stencil tests
/// **must** be performed before fragment shading.
///
/// To force early depth/stencil tests in a shader:
///   - GLSL: `layout(early_fragment_tests) in;`
///   - HLSL: `Attribute earlydepthstencil`
///   - SPIR-V: `ExecutionMode EarlyFragmentTests`
///   - WGSL: `@early_depth_test(force)`
///
/// This may also be enabled in a shader by specifying a [`ConservativeDepth`].
///
/// For more, see:
///   - <https://www.khronos.org/opengl/wiki/Early_Fragment_Test#Explicit_specification>
///   - <https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/sm5-attributes-earlydepthstencil>
///   - <https://www.khronos.org/registry/SPIR-V/specs/unified1/SPIRV.html#Execution_Mode>
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum EarlyDepthTest {
    /// Requires depth/stencil tests to be performed before fragment shading.
    ///
    /// This will disable depth/stencil tests after fragment shading, so discarding the fragment
    /// or overwriting the fragment depth will have no effect.
    Force,

    /// Allows an additional depth/stencil test to be performed before fragment shading.
    ///
    /// It is up to the driver to decide whether early tests are performed. Unlike `Force`, this
    /// does not disable depth/stencil tests after fragment shading.
    Allow {
        /// Specifies restrictions on how the depth value can be modified within the fragment
        /// shader.
        ///
        /// This may be taken into account when deciding whether to perform early tests.
        conservative: ConservativeDepth,
    },
}

/// Enables adjusting depth without disabling early Z.
///
/// To use in a shader:
///   - GLSL: `layout (depth_<greater/less/unchanged/any>) out float gl_FragDepth;`
///     - `depth_any` option behaves as if the layout qualifier was not present.
///   - HLSL: `SV_DepthGreaterEqual`/`SV_DepthLessEqual`/`SV_Depth`
///   - SPIR-V: `ExecutionMode Depth<Greater/Less/Unchanged>`
///   - WGSL: `@early_depth_test(greater_equal/less_equal/unchanged)`
///
/// For more, see:
///   - <https://www.khronos.org/registry/OpenGL/extensions/ARB/ARB_conservative_depth.txt>
///   - <https://docs.microsoft.com/en-us/windows/win32/direct3dhlsl/dx-graphics-hlsl-semantics#system-value-semantics>
///   - <https://www.khronos.org/registry/SPIR-V/specs/unified1/SPIRV.html#Execution_Mode>
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ConservativeDepth {
    /// Shader may rewrite depth only with a value greater than calculated.
    GreaterEqual,

    /// Shader may rewrite depth smaller than one that would have been written without the modification.
    LessEqual,

    /// Shader may not rewrite depth value.
    Unchanged,
}

/// Addressing space of variables.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum AddressSpace {
    /// Function locals.
    Function,
    /// Private data, per invocation, mutable.
    Private,
    /// Workgroup shared data, mutable.
    WorkGroup,
    /// Uniform buffer data.
    Uniform,
    /// Storage buffer data, potentially mutable.
    Storage {
        access: StorageAccess,
    },
    /// Opaque handles, such as samplers and images.
    Handle,

    /// Immediate data.
    ///
    /// A [`Module`] may contain at most one [`GlobalVariable`] in
    /// this address space. Its contents are provided not by a buffer
    /// but by `SetImmediates` pass commands, allowing the CPU to
    /// establish different values for each draw/dispatch.
    ///
    /// `Immediate` variables may not contain `f16` values, even if
    /// the [`SHADER_FLOAT16`] capability is enabled.
    ///
    /// Backends generally place tight limits on the size of
    /// `Immediate` variables.
    ///
    /// [`SHADER_FLOAT16`]: crate::valid::Capabilities::SHADER_FLOAT16
    Immediate,
    /// Task shader to mesh shader payload
    TaskPayload,

    /// Ray tracing payload, for inputting in TraceRays
    RayPayload,
    /// Ray tracing payload, for entrypoints invoked by a TraceRays call
    ///
    /// Each entrypoint may reference only one variable in this scope, as
    /// only one may be passed as a payload.
    IncomingRayPayload,
    HitAttribute,
    CallableData,
    IncomingCallableData,
    ShaderRecord,
    HitObjectAttribute {
        kind: HitObjectKind,
    },

    /// A stage input: a value the previous stage or the pipeline provides.
    ///
    /// Shaders can only read it. What it is bound to is given by
    /// [`GlobalVariable::io`], or by the bindings of its members if it is a
    /// block. An entry point lists the inputs it uses in
    /// [`EntryPoint::interface`].
    Input,
    /// A stage output: a value passed to the next stage or to the pipeline.
    ///
    /// Bound and listed like an [`Input`](Self::Input).
    Output,
    PhysicalStorage {
        alignment: u32,
        access: StorageAccess,
        qualifiers: PointerQualifiers,
    },
    DescriptorHeap(DescriptorHeap),
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum DescriptorHeap {
    Resource,
    Sampler,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SubgroupMask {
    Eq,
    Ge,
    Gt,
    Le,
    Lt,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ShaderBallot {
    Size,
    InvocationId,
    Mask(SubgroupMask),
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ShaderCore {
    WarpsPerSmNv,
    SmCountNv,
    WarpIdNv,
    SmIdNv,
    CoreIdArm,
    CoreCountArm,
    CoreMaxIdArm,
    WarpIdArm,
    WarpMaxIdArm,
}

/// Built-in inputs and outputs.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum BuiltIn {
    // This must be at the top so that it gets sorted to the top. PrimitiveIndex is considered a non SV
    // by FXC so it must appear before any other SVs.
    /// Read in fragment shaders, written in mesh shaders, read in any and closest hit shaders.
    PrimitiveIndex,

    /// Written in vertex/mesh shaders, read in fragment shaders
    Position {
        invariant: bool,
    },
    /// Read in task, mesh, vertex, and fragment shaders
    ViewIndex,

    /// Read in vertex shaders
    BaseInstance,
    /// Read in vertex shaders
    BaseVertex,
    /// Written in vertex & mesh shaders
    ClipDistances,
    /// Written in vertex & mesh shaders
    CullDistance,
    /// Read in vertex, any- and closest-hit shaders
    InstanceIndex,
    /// Written in vertex & mesh shaders
    PointSize,
    /// Read in vertex shaders
    VertexIndex,
    /// Read in vertex & task shaders, or mesh shaders in pipelines without task shaders
    DrawIndex,

    InvocationId,
    PatchVertices,
    TessCoord,
    TessLevelOuter,
    TessLevelInner,
    Layer {
        viewport_relative: bool,
        secondary_view_offset: Option<i32>,
    },
    ViewportIndex,
    ViewportMaskNV,
    SecondaryPositionNV,
    SecondaryViewportMaskNV,
    PositionPerViewNV,
    ViewportMaskPerViewNV,

    /// Written in fragment shaders
    FragDepth,
    /// Read in fragment shaders
    PointCoord,
    /// Read in fragment shaders
    FrontFacing,
    /// Read in fragment shaders
    Barycentric {
        perspective: bool,
    },
    /// Read in fragment shaders
    SampleIndex,
    /// Read or written in fragment shaders
    SampleMask {
        override_coverage: bool,
    },
    SamplePosition,
    HelperInvocation,
    DeviceIndex,
    ShadingRate,
    FragSize {
        nv: bool,
    },
    FragInvocationCount {
        nv: bool,
    },
    FullyCovered,
    FragStencilRef,

    /// Read in compute, task, and mesh shaders
    GlobalInvocationId,
    /// Read in compute, task, and mesh shaders
    LocalInvocationId,
    /// Read in compute, task, and mesh shaders
    LocalInvocationIndex,
    /// Read in compute, task, and mesh shaders
    WorkGroupId,
    /// Read in compute, task, and mesh shaders
    WorkGroupSize,
    /// Read in compute, task, and mesh shaders
    NumWorkGroups,

    /// Read in compute, task, and mesh shaders
    NumSubgroups,
    /// Read in compute, task, and mesh shaders
    SubgroupId,
    /// Read in compute, fragment, task, and mesh shaders
    SubgroupSize,
    /// Read in compute, fragment, task, and mesh shaders
    SubgroupInvocationId,
    SubgroupMask(SubgroupMask),
    ShaderBallot(ShaderBallot),
    TileOffset,
    TileDimension,
    TileApronSize,
    ShaderCore(ShaderCore),

    /// Written in task shaders
    MeshTaskSize,
    /// Written in mesh shaders
    CullPrimitive,
    /// Written in mesh shaders
    PointIndex,
    /// Written in mesh shaders
    LineIndices,
    /// Written in mesh shaders
    TriangleIndices,

    /// Written to a workgroup variable in mesh shaders
    VertexCount,
    /// Written to a workgroup variable in mesh shaders
    Vertices,
    /// Written to a workgroup variable in mesh shaders
    PrimitiveCount,
    /// Written to a workgroup variable in mesh shaders
    Primitives,

    PrimitiveShadingRate,
    TaskCountNV,
    PrimitiveCountNV,
    PrimitiveIndicesNV,
    MeshViewCountNV,
    MeshViewIndicesNV,
    ClipDistancePerViewNV,
    CullDistancePerViewNV,
    LayerPerViewNV,

    /// Read in all ray tracing pipeline shaders, the id within the number of
    /// rays that this current ray is.
    RayInvocationId,
    /// Read in all ray tracing pipeline shaders, the number of rays created.
    NumRayInvocations,
    /// Read in closest hit and any hit shaders, the custom data in the tlas
    /// instance
    InstanceCustomData,
    /// Read in closest hit and any hit shaders, the index of the geometry in
    /// the blas.
    GeometryIndex,
    /// Read in closest hit, any hit, and miss shaders, the origin of the ray.
    WorldRayOrigin,
    /// Read in closest hit, any hit, and miss shaders, the direction of the
    /// ray.
    WorldRayDirection,
    /// Read in closest hit and any hit shaders, the direction of the ray in
    /// object space.
    ObjectRayOrigin,
    /// Read in closest hit and any hit shaders, the direction of the ray in
    /// object space.
    ObjectRayDirection,
    /// Read in closest hit, any hit, and miss shaders, the t min provided by
    /// in the ray desc.
    RayTmin,
    /// Read in closest hit, any hit, and miss shaders, the final bounds at which
    /// a hit is accepted (the closest committed hit if there is one otherwise, t
    /// max provided in the ray desc).
    RayTCurrentMax,
    /// Read in closest hit and any hit shaders, the matrix for converting from
    /// object space to world space
    ObjectToWorld,
    /// Read in closest hit and any hit shaders, the matrix for converting from
    /// world space to object space
    WorldToObject,
    /// Read in closest hit and any hit shaders, the type of hit as provided by
    /// the intersection function if any, otherwise this is 254 (0xFE) for a
    /// front facing triangle and 255 (0xFF) for a back facing triangle
    HitKind,
    InstanceId,
    IncomingRayFlags,
    CullMask,
    HitTriangleVertexPositions,
    CurrentRayTime,
    ClusterId,
    HitMicroTriangleVertexPositions,
    HitMicroTriangleVertexBarycentrics,
    HitKindFrontFacingMicroTriangle,
    HitKindBackFacingMicroTriangle,
    HitIsSphere,
    HitIsLss,
    HitSpherePosition,
    HitSphereRadius,
    HitLssPositions,
    HitLssRadii,
}

/// Number of bytes per scalar.
pub type Bytes = u8;

/// Number of components in a vector.
#[repr(u8)]
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum VectorSize {
    /// 2D vector
    Bi = 2,
    /// 3D vector
    Tri = 3,
    /// 4D vector
    Quad = 4,
}

impl VectorSize {
    pub const MAX: usize = Self::Quad as usize;
}

impl From<VectorSize> for u8 {
    fn from(size: VectorSize) -> u8 {
        size as u8
    }
}

impl From<VectorSize> for u32 {
    fn from(size: VectorSize) -> u32 {
        size as u32
    }
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum CooperativeSize {
    Constant(core::num::NonZeroU32),
    Pending(Handle<Override>),
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum CooperativeMatrixClass {
    Khr,
    Nv,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum LongVectorClass {
    Plain,
    CooperativeNv,
}

/// Primitive type for a scalar.
#[repr(u8)]
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ScalarKind {
    /// Signed integer type.
    Sint,
    /// Unsigned integer type.
    Uint,
    /// Floating point type.
    Float,
    /// Boolean type.
    Bool,
    BFloat,
    FloatE4M3,
    FloatE5M2,
    FloatE2M1,
    FloatE3M2,
    FloatE2M3,
    FloatUE8M0,
    FloatMXINT8,

    /// WGSL abstract integer type.
    ///
    /// These are forbidden by validation, and should never reach backends.
    AbstractInt,

    /// Abstract floating-point type.
    ///
    /// These are forbidden by validation, and should never reach backends.
    AbstractFloat,
}

/// Role of a cooperative variable in the equation "A * B + C"
#[repr(u8)]
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum CooperativeRole {
    A,
    B,
    C,
}

/// Characteristics of a scalar type.
#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct Scalar {
    /// How the value's bits are to be interpreted.
    pub kind: ScalarKind,

    /// This size of the value in bytes.
    pub width: Bytes,
}

/// Size of an array.
#[repr(u8)]
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ArraySize {
    /// The array size is constant.
    Constant(core::num::NonZeroU32),
    /// The array size is an override-expression.
    Pending(Handle<Override>),
    /// The array size can change at runtime.
    Dynamic,
}

/// The interpolation qualifier of a binding or struct field.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum Interpolation {
    /// The value will be interpolated in a perspective-correct fashion.
    /// Also known as "smooth" in glsl.
    Perspective,
    /// Indicates that linear, non-perspective, correct
    /// interpolation must be used.
    /// Also known as "no_perspective" in glsl.
    Linear,
    /// Indicates that no interpolation will be performed.
    Flat,
    /// Indicates the fragment input binding holds an array of per-vertex values.
    /// This is typically used with barycentrics.
    PerVertex,
}

/// The sampling qualifiers of a binding or struct field.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum Sampling {
    /// Interpolate the value at the center of the pixel.
    Center,

    /// Interpolate the value at a point that lies within all samples covered by
    /// the fragment within the current primitive. In multisampling, use a
    /// single value for all samples in the primitive.
    Centroid,

    /// Interpolate the value at each sample location. In multisampling, invoke
    /// the fragment shader once per sample.
    Sample,

    /// Use the value provided by the first vertex of the current primitive.
    First,

    /// Use the value provided by the first or last vertex of the current primitive. The exact
    /// choice is implementation-dependent.
    Either,
}

/// Member of a user-defined structure.
// Clone is used only for error reporting and is not intended for end users
#[derive(Clone, Debug, Eq, Hash, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct StructMember {
    pub name: Option<String>,
    /// Type of the field.
    pub ty: Handle<Type>,
    /// For I/O structs, defines the binding.
    pub binding: Option<Binding>,
    /// Offset from the beginning from the struct.
    pub offset: u32,
    /// How the matrix in this member is laid out in memory, if the member is
    /// a matrix or an array of matrices in a uniform or storage buffer.
    ///
    /// `None` leaves the layout to the backend: column-major, with each
    /// column at the natural alignment of its vector type.
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub matrix_layout: Option<MatrixLayout>,
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub xfb_offset: Option<u32>,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub heap: Option<HeapMember>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "MemoryDecorations::is_empty")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub memory_decorations: MemoryDecorations,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub relaxed_precision: bool,
}

#[derive(Clone, Copy, Debug, Default, Eq, Hash, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct HeapMember {
    pub offset: Option<u32>,
    pub size: Option<u32>,
}

/// The memory layout of a matrix in a buffer: [`StructMember::matrix_layout`].
///
/// GLSL selects it with the `std140`, `std430`, `scalar`, `row_major` and
/// `column_major` layout qualifiers. It only describes how the matrix is
/// stored; the value a shader reads or writes is the same either way.
#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct MatrixLayout {
    /// The distance in bytes between consecutive columns of a column-major
    /// matrix, or between consecutive rows of a row-major one.
    pub stride: u32,
    /// The matrix is stored row by row rather than column by column.
    pub row_major: bool,
}

/// The number of dimensions an image has.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ImageDimension {
    /// 1D image
    D1,
    /// 2D image
    D2,
    /// 3D image
    D3,
    /// Cube map
    Cube,
    Buffer,
    Subpass,
    TileImageData,
}

bitflags::bitflags! {
    /// Flags describing an image.
    #[cfg_attr(feature = "serialize", derive(Serialize))]
    #[cfg_attr(feature = "deserialize", derive(Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
    #[derive(Clone, Copy, Debug, Default, Eq, Hash, Ord, PartialEq, PartialOrd)]
    pub struct StorageAccess: u32 {
        /// Storage can be used as a source for load ops.
        const LOAD = 0x1;
        /// Storage can be used as a target for store ops.
        const STORE = 0x2;
        /// Storage can be used as a target for atomic ops.
        const ATOMIC = 0x4;
    }
}

bitflags::bitflags! {
    #[cfg_attr(feature = "serialize", derive(Serialize))]
    #[cfg_attr(feature = "deserialize", derive(Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
    #[derive(Clone, Copy, Debug, Default, Eq, Hash, Ord, PartialEq, PartialOrd)]
    pub struct PointerQualifiers: u16 {
        const RESTRICT = 0x1;
        const COHERENT = 0x2;
        const DEVICE_COHERENT = 0x4;
        const QUEUE_FAMILY_COHERENT = 0x8;
        const WORKGROUP_COHERENT = 0x10;
        const SUBGROUP_COHERENT = 0x20;
        const SHADER_CALL_COHERENT = 0x40;
        const VOLATILE = 0x80;
        const NONPRIVATE = 0x100;
        const NONTEMPORAL = 0x200;
    }
}

bitflags::bitflags! {
    /// Memory decorations for global variables.
    #[cfg_attr(feature = "serialize", derive(Serialize))]
    #[cfg_attr(feature = "deserialize", derive(Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
    #[derive(Clone, Copy, Debug, Default, Eq, Hash, Ord, PartialEq, PartialOrd)]
    pub struct MemoryDecorations: u16 {
        /// Reads and writes are automatically visible to other invocations
        /// without explicit barriers.
        const COHERENT = 0x1;
        /// The variable may be modified by something external to the shader,
        /// preventing certain compiler optimizations.
        const VOLATILE = 0x2;
        const DEVICE_COHERENT = 0x4;
        const QUEUE_FAMILY_COHERENT = 0x8;
        const WORKGROUP_COHERENT = 0x10;
        const SUBGROUP_COHERENT = 0x20;
        const SHADER_CALL_COHERENT = 0x40;
        const NONPRIVATE = 0x80;
        const NON_WRITABLE = 0x100;
        const NON_READABLE = 0x200;
        const NONTEMPORAL = 0x400;
        const RESTRICT = 0x800;
    }
}

/// Image storage format.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum StorageFormat {
    // 8-bit formats
    R8Unorm,
    R8Snorm,
    R8Uint,
    R8Sint,

    // 16-bit formats
    R16Uint,
    R16Sint,
    R16Float,
    Rg8Unorm,
    Rg8Snorm,
    Rg8Uint,
    Rg8Sint,

    // 32-bit formats
    R32Uint,
    R32Sint,
    R32Float,
    Rg16Uint,
    Rg16Sint,
    Rg16Float,
    Rgba8Unorm,
    Rgba8Snorm,
    Rgba8Uint,
    Rgba8Sint,
    Bgra8Unorm,

    // Packed 32-bit formats
    Rgb10a2Uint,
    Rgb10a2Unorm,
    Rg11b10Ufloat,

    // 64-bit formats
    R64Uint,
    R64Sint,
    Rg32Uint,
    Rg32Sint,
    Rg32Float,
    Rgba16Uint,
    Rgba16Sint,
    Rgba16Float,

    // 128-bit formats
    Rgba32Uint,
    Rgba32Sint,
    Rgba32Float,

    // Normalized 16-bit per channel formats
    R16Unorm,
    R16Snorm,
    Rg16Unorm,
    Rg16Snorm,
    Rgba16Unorm,
    Rgba16Snorm,

    Unknown(Scalar),
}

/// Sub-class of the image type.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ImageClass {
    /// Regular sampled image.
    Sampled {
        /// Kind of values to sample.
        kind: ScalarKind,
        /// Multi-sampled image.
        ///
        /// A multi-sampled image holds several samples per texel. Multi-sampled
        /// images cannot have mipmaps.
        multi: bool,
    },
    /// Depth comparison image.
    Depth {
        /// Multi-sampled depth image.
        multi: bool,
    },
    /// External texture.
    External,
    /// Storage image.
    Storage {
        format: StorageFormat,
        access: StorageAccess,
        #[cfg_attr(
            feature = "serialize",
            serde(skip_serializing_if = "core::ops::Not::not")
        )]
        #[cfg_attr(feature = "deserialize", serde(default))]
        multi: bool,
    },
}

/// A data type declared in the module.
#[derive(Clone, Debug, Eq, Hash, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct Type {
    /// The name of the type, if any.
    pub name: Option<String>,
    /// Inner structure that depends on the kind of the type.
    pub inner: TypeInner,
}

/// Enum with additional information, depending on the kind of type.
///
/// Comparison using `==` is not reliable in the case of [`Pointer`],
/// [`ValuePointer`], or [`Struct`] variants. For these variants,
/// use [`TypeInner::non_struct_equivalent`] or [`compare_types`].
///
/// [`compare_types`]: crate::proc::compare_types
/// [`ValuePointer`]: TypeInner::ValuePointer
/// [`Pointer`]: TypeInner::Pointer
/// [`Struct`]: TypeInner::Struct
#[derive(Clone, Debug, Eq, Hash, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum TypeInner {
    /// Number of integral or floating-point kind.
    Scalar(Scalar),
    /// Vector of numbers.
    Vector {
        size: VectorSize,
        scalar: Scalar,
    },
    /// Matrix of numbers.
    Matrix {
        columns: VectorSize,
        rows: VectorSize,
        scalar: Scalar,
    },
    /// Matrix that is cooperatively processed by all the threads
    /// in an opaque mapping.
    CooperativeMatrix {
        columns: CooperativeSize,
        rows: CooperativeSize,
        scalar: Scalar,
        role: CooperativeRole,
        scope: CooperativeSize,
        class: CooperativeMatrixClass,
    },
    LongVector {
        size: CooperativeSize,
        scalar: Scalar,
        class: LongVectorClass,
    },
    TensorLayout {
        dimensions: CooperativeSize,
        clamp_mode: Option<CooperativeSize>,
    },
    TensorView {
        dimensions: CooperativeSize,
        has_dimensions: bool,
        permutation: Vec<u32>,
    },
    Tensor {
        scalar: Scalar,
        rank: u32,
    },
    /// Atomic scalar.
    Atomic(Scalar),
    /// Pointer to another type.
    ///
    /// Pointers to scalars and vectors should be treated as equivalent to
    /// [`ValuePointer`] types. Use either [`TypeInner::non_struct_equivalent`]
    /// or [`compare_types`] to compare types in a way that treats pointers
    /// correctly.
    ///
    /// ## Pointers to non-`SIZED` types
    ///
    /// The `base` type of a pointer may be a non-[`SIZED`] type like a
    /// dynamically-sized [`Array`], or a [`Struct`] whose last member is a
    /// dynamically sized array. Such pointers occur as the types of
    /// [`GlobalVariable`] or [`AccessIndex`] expressions referring to
    /// dynamically-sized arrays.
    ///
    /// However, among pointers to non-`SIZED` types, only pointers to `Struct`s
    /// are [`DATA`]. Pointers to dynamically sized `Array`s cannot be passed as
    /// arguments, stored in variables, or held in arrays or structures. Their
    /// only use is as the types of `AccessIndex` expressions.
    ///
    /// [`SIZED`]: crate::valid::TypeFlags::SIZED
    /// [`DATA`]: crate::valid::TypeFlags::DATA
    /// [`Array`]: TypeInner::Array
    /// [`Struct`]: TypeInner::Struct
    /// [`ValuePointer`]: TypeInner::ValuePointer
    /// [`GlobalVariable`]: Expression::GlobalVariable
    /// [`AccessIndex`]: Expression::AccessIndex
    /// [`compare_types`]: crate::proc::compare_types
    Pointer {
        base: Handle<Type>,
        space: AddressSpace,
    },

    /// Pointer to a scalar or vector.
    ///
    /// A `ValuePointer` type is equivalent to a `Pointer` whose `base` is a
    /// `Scalar` or `Vector` type. This is for use in [`TypeResolution::Value`]
    /// variants; see the documentation for [`TypeResolution`] for details.
    ///
    /// Use [`TypeInner::non_struct_equivalent`] or [`compare_types`] to compare
    /// types that could be pointers, to ensure that `Pointer` and
    /// `ValuePointer` types are recognized as equivalent.
    ///
    /// [`TypeResolution`]: crate::proc::TypeResolution
    /// [`TypeResolution::Value`]: crate::proc::TypeResolution::Value
    /// [`compare_types`]: crate::proc::compare_types
    ValuePointer {
        size: Option<VectorSize>,
        scalar: Scalar,
        space: AddressSpace,
    },

    /// Homogeneous list of elements.
    ///
    /// The `base` type must be a [`SIZED`], [`DATA`] type.
    ///
    /// ## Dynamically sized arrays
    ///
    /// An `Array` is [`SIZED`] unless its `size` is [`Dynamic`].
    /// Dynamically-sized arrays may only appear in a few situations:
    ///
    /// -   They may appear as the type of a [`GlobalVariable`], or as the last
    ///     member of a [`Struct`].
    ///
    /// -   They may appear as the base type of a [`Pointer`]. An
    ///     [`AccessIndex`] expression referring to a struct's final
    ///     unsized array member would have such a pointer type. However, such
    ///     pointer types may only appear as the types of such intermediate
    ///     expressions. They are not [`DATA`], and cannot be stored in
    ///     variables, held in arrays or structs, or passed as parameters.
    ///
    /// [`SIZED`]: crate::valid::TypeFlags::SIZED
    /// [`DATA`]: crate::valid::TypeFlags::DATA
    /// [`Dynamic`]: ArraySize::Dynamic
    /// [`Struct`]: TypeInner::Struct
    /// [`Pointer`]: TypeInner::Pointer
    /// [`AccessIndex`]: Expression::AccessIndex
    Array {
        base: Handle<Type>,
        size: ArraySize,
        stride: u32,
    },

    /// User-defined structure.
    ///
    /// There must always be at least one member.
    ///
    /// A `Struct` type is [`DATA`], and the types of its members must be
    /// `DATA` as well.
    ///
    /// Member types must be [`SIZED`], except for the final member of a
    /// struct, which may be a dynamically sized [`Array`]. The
    /// `Struct` type itself is `SIZED` when all its members are `SIZED`.
    ///
    /// Two structure types with different names are not equivalent. Because
    /// this variant does not contain the name, it is not possible to use it
    /// to compare struct types. Use [`compare_types`] to compare two types
    /// that may be structs.
    ///
    /// [`DATA`]: crate::valid::TypeFlags::DATA
    /// [`SIZED`]: crate::∅TypeFlags::SIZED
    /// [`Array`]: TypeInner::Array
    /// [`compare_types`]: crate::proc::compare_types
    Struct {
        members: Vec<StructMember>,
        //TODO: should this be unaligned?
        span: u32,
    },
    /// Possibly multidimensional array of texels.
    Image {
        dim: ImageDimension,
        arrayed: bool,
        //TODO: consider moving `multisampled: bool` out
        class: ImageClass,
    },
    /// Can be used to sample values from images.
    Sampler {
        comparison: bool,
    },

    SampledImage {
        dim: ImageDimension,
        arrayed: bool,
        class: ImageClass,
    },

    /// Opaque object representing an acceleration structure of geometry.
    AccelerationStructure {
        vertex_return: bool,
    },

    /// Locally used handle for ray queries.
    RayQuery {
        vertex_return: bool,
    },

    HitObject {
        kind: HitObjectKind,
    },

    /// Array of bindings.
    ///
    /// A `BindingArray` represents an array where each element draws its value
    /// from a separate bound resource. The array's element type `base` may be
    /// [`Image`], [`Sampler`], or any type that would be permitted for a global
    /// in the [`Uniform`] or [`Storage`] address spaces. Only global variables
    /// may be binding arrays; on the host side, their values are provided by
    /// [`TextureViewArray`], [`SamplerArray`], or [`BufferArray`]
    /// bindings.
    ///
    /// Since each element comes from a distinct resource, a binding array of
    /// images could have images of varying sizes (but not varying dimensions;
    /// they must all have the same `Image` type). Or, a binding array of
    /// buffers could have elements that are dynamically sized arrays, each with
    /// a different length.
    ///
    /// Binding arrays are in the same address spaces as their underlying type.
    /// As such, referring to an array of images produces an [`Image`] value
    /// directly (as opposed to a pointer). The only operation permitted on
    /// `BindingArray` values is indexing, which works transparently: indexing
    /// a binding array of samplers yields a [`Sampler`], indexing a pointer to the
    /// binding array of storage buffers produces a pointer to the storage struct.
    ///
    /// Unlike textures and samplers, binding arrays are not [`ARGUMENT`], so
    /// they cannot be passed as arguments to functions.
    ///
    /// rglsl's WGSL front end supports binding arrays with the type syntax
    /// `binding_array<T, N>`.
    ///
    /// [`Image`]: TypeInner::Image
    /// [`Sampler`]: TypeInner::Sampler
    /// [`Uniform`]: AddressSpace::Uniform
    /// [`Storage`]: AddressSpace::Storage
    /// [`TextureViewArray`]: https://docs.rs/wgpu/latest/wgpu/enum.BindingResource.html#variant.TextureViewArray
    /// [`SamplerArray`]: https://docs.rs/wgpu/latest/wgpu/enum.BindingResource.html#variant.SamplerArray
    /// [`BufferArray`]: https://docs.rs/wgpu/latest/wgpu/enum.BindingResource.html#variant.BufferArray
    /// [`DATA`]: crate::valid::TypeFlags::DATA
    /// [`ARGUMENT`]: crate::valid::TypeFlags::ARGUMENT
    /// [rglsl#1864]: https://github.com/gfx-rs/naga/issues/1864
    BindingArray {
        base: Handle<Type>,
        size: ArraySize,
    },
    BufferDescriptor {
        base: Handle<Type>,
        space: AddressSpace,
    },
    Spirv {
        opcode: u32,
        operands: Vec<SpirvTypeOperand>,
    },
}

#[derive(Debug, Clone, Copy, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SpirvTypeOperand {
    Literal(u32),
    Type(Handle<Type>),
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct SpirvRequirements {
    pub extensions: Vec<String>,
    pub capabilities: Vec<u32>,
}

impl SpirvRequirements {
    pub const fn is_empty(&self) -> bool {
        self.extensions.is_empty() && self.capabilities.is_empty()
    }
}

#[derive(Debug, Clone, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct SpirvDecoration {
    pub decoration: u32,
    pub operands: SpirvDecorationOperands,
}

#[derive(Debug, Clone, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SpirvDecorationOperands {
    Literals(Vec<u32>),
    Ids(Vec<SpirvId>),
    Strings(Vec<String>),
}

#[derive(Debug, Clone, Copy, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SpirvId {
    Constant(Handle<Expression>),
    Global(Handle<GlobalVariable>),
}

#[derive(Debug, Clone, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct SpirvExecutionMode {
    pub mode: u32,
    pub operands: SpirvExecutionModeOperands,
}

#[derive(Debug, Clone, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SpirvExecutionModeOperands {
    Literals(Vec<u32>),
    Ids(Vec<Handle<Expression>>),
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct SpirvInstruction {
    pub set: Option<String>,
    pub opcode: u32,
}

#[derive(Debug, Clone, Copy, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SpirvOperand {
    Value(Handle<Expression>),
    Pointer(Handle<Expression>),
    Literal(u32),
}

#[derive(Debug, Clone, Copy, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum Literal {
    /// May not be NaN or infinity.
    F64(f64),
    /// May not be NaN or infinity.
    F32(f32),
    /// May not be NaN or infinity.
    F16(f16),
    U8(u8),
    I8(i8),
    U16(u16),
    I16(i16),
    U32(u32),
    I32(i32),
    U64(u64),
    I64(i64),
    Bool(bool),
    AbstractInt(i64),
    AbstractFloat(f64),
    BF16(u16),
    FE4M3(u8),
    FE5M2(u8),
    FE2M1(u8),
    FE3M2(u8),
    FE2M3(u8),
    FUE8M0(u8),
    FMXINT8(u8),
}

/// Pipeline-overridable constant.
#[derive(Clone, Debug, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct Override {
    pub name: Option<String>,
    /// Pipeline Constant ID.
    pub id: Option<u32>,
    pub ty: Handle<Type>,

    /// The default value of the pipeline-overridable constant.
    ///
    /// This [`Handle`] refers to [`Module::global_expressions`], not
    /// any [`Function::expressions`] arena.
    pub init: Option<Handle<Expression>>,
}

/// Constant value.
#[derive(Clone, Debug, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct Constant {
    pub name: Option<String>,
    pub ty: Handle<Type>,

    /// The value of the constant.
    ///
    /// This [`Handle`] refers to [`Module::global_expressions`], not
    /// any [`Function::expressions`] arena.
    pub init: Handle<Expression>,
}

/// Describes how an input/output variable is to be bound.
#[derive(Clone, Debug, Eq, PartialEq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum Binding {
    /// Built-in shader variable.
    BuiltIn(BuiltIn),

    /// Indexed location.
    ///
    /// This is a value passed to a [`Fragment`] shader from a [`Vertex`] or
    /// [`Mesh`] shader.
    ///
    /// Values passed from the [`Vertex`] stage to the [`Fragment`] stage must
    /// have their `interpolation` defaulted (i.e. not `None`) by the front end
    /// as appropriate for that language.
    ///
    /// For other stages, we permit interpolations even though they're ignored.
    /// When a front end is parsing a struct type, it usually doesn't know what
    /// stages will be using it for IO, so it's easiest if it can apply the
    /// defaults to anything with a `Location` binding, just in case.
    ///
    /// For anything other than floating-point scalars and vectors, the
    /// interpolation must be `Flat`.
    ///
    /// [`Vertex`]: crate::ShaderStage::Vertex
    /// [`Mesh`]: crate::ShaderStage::Mesh
    /// [`Fragment`]: crate::ShaderStage::Fragment
    Location {
        location: u32,
        interpolation: Option<Interpolation>,
        sampling: Option<Sampling>,

        /// Optional `blend_src` index used for dual source blending.
        /// See <https://www.w3.org/TR/WGSL/#attribute-blend_src>
        blend_src: Option<u32>,

        /// Whether the binding is a per-primitive binding for use with mesh shaders.
        ///
        /// This must be `true` if this binding is a mesh shader primitive output, or such
        /// an output's corresponding fragment shader input. It must be `false` otherwise.
        ///
        /// A stage's outputs must all have unique `location` numbers, regardless of
        /// whether they are per-primitive; a mesh shader's per-vertex and per-primitive
        /// outputs share the same location numbering space.
        ///
        /// Per-primitive values are not interpolated at all and are not dependent on the
        /// vertices or pixel location. For example, it may be used to store a
        /// non-interpolated normal vector.
        per_primitive: bool,

        /// The first of the four components of the location that the value
        /// occupies (GLSL `layout(component = N)`). `None` is component 0.
        #[cfg_attr(feature = "deserialize", serde(default))]
        component: Option<u32>,

        /// The value must be computed in exactly the same way by every shader
        /// that computes it (GLSL `invariant`).
        #[cfg_attr(feature = "deserialize", serde(default))]
        invariant: bool,

        /// The value is per patch rather than per vertex (GLSL `patch`, in
        /// tessellation shaders).
        #[cfg_attr(feature = "deserialize", serde(default))]
        patch: bool,

        #[cfg_attr(feature = "deserialize", serde(default))]
        #[cfg_attr(
            feature = "serialize",
            serde(skip_serializing_if = "core::ops::Not::not")
        )]
        per_view: bool,
    },
}

/// Variable defined at module level.
#[derive(Clone, Debug, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct GlobalVariable {
    /// Name of the variable, if any.
    pub name: Option<String>,
    /// How this variable is to be stored.
    pub space: AddressSpace,
    /// For resources, defines the binding point.
    pub binding: Option<ResourceBinding>,
    /// The type of this variable.
    pub ty: Handle<Type>,
    /// Initial value for this variable.
    ///
    /// This refers to an [`Expression`] in [`Module::global_expressions`].
    pub init: Option<Handle<Expression>>,
    /// Memory decorations for this variable.
    ///
    /// These are meaningful for storage address space variables in SPIR-V,
    /// where they map to SPIR-V memory decorations on the variable.
    ///
    /// In WGSL, these can be set with attributes like `@coherent` or `@volatile`.
    pub memory_decorations: MemoryDecorations,
    /// For a variable in the [`Input`] or [`Output`] address space that is
    /// not a block, what it is bound to.
    ///
    /// A block (a struct whose members have bindings, such as GLSL
    /// `out gl_PerVertex { ... }`) has `None` here.
    ///
    /// [`Input`]: AddressSpace::Input
    /// [`Output`]: AddressSpace::Output
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub io: Option<Binding>,
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub xfb: Option<XfbBinding>,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub input_attachment_index: Option<u32>,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub heap_offset: Option<Handle<Expression>>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub tile_attachment: bool,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Vec::is_empty"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub spirv_decorations: Vec<SpirvDecoration>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub relaxed_precision: bool,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub immediate_bank: Option<ImmediateBank>,
}

#[derive(Clone, Copy, Debug, Default, Eq, Hash, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct ImmediateBank {
    pub bank: Option<u32>,
    pub member_offset: Option<u32>,
}

#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct XfbBinding {
    pub buffer: u32,
    pub stride: u32,
    pub offset: Option<u32>,
}

/// Variable defined at function level.
#[derive(Clone, Debug)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct LocalVariable {
    /// Name of the variable, if any.
    pub name: Option<String>,
    /// The type of this variable.
    pub ty: Handle<Type>,
    /// Initial value for this variable.
    ///
    /// This handle refers to an expression in this `LocalVariable`'s function's
    /// [`expressions`] arena, but it is required to be an evaluated override
    /// expression.
    ///
    /// [`expressions`]: Function::expressions
    pub init: Option<Handle<Expression>>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub relaxed_precision: bool,
}

/// Operation that can be applied on a single value.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum UnaryOperator {
    Negate,
    LogicalNot,
    BitwiseNot,
}

/// Operation that can be applied on two values.
///
/// ## Arithmetic type rules
///
/// The arithmetic operations `Add`, `Subtract`, `Multiply`, `Divide`, and
/// `Modulo` can all be applied to [`Scalar`] types other than [`Bool`], or
/// [`Vector`]s thereof. Both operands must have the same type.
///
/// `Add` and `Subtract` can also be applied to [`Matrix`] values. Both operands
/// must have the same type.
///
/// `Multiply` supports additional cases:
///
/// -   A [`Matrix`] or [`Vector`] can be multiplied by a scalar [`Float`],
///     either on the left or the right.
///
/// -   A [`Matrix`] on the left can be multiplied by a [`Vector`] on the right
///     if the matrix has as many columns as the vector has components
///     (`matCxR * VecC`).
///
/// -   A [`Vector`] on the left can be multiplied by a [`Matrix`] on the right
///     if the matrix has as many rows as the vector has components
///     (`VecR * matCxR`).
///
/// -   Two matrices can be multiplied if the left operand has as many columns
///     as the right operand has rows (`matNxR * matCxN`).
///
/// In all the above `Multiply` cases, the byte widths of the underlying scalar
/// types of both operands must be the same.
///
/// Note that `Multiply` supports mixed vector and scalar operations directly,
/// whereas the other arithmetic operations require an explicit [`Splat`] for
/// mixed-type use.
///
/// [`Scalar`]: TypeInner::Scalar
/// [`Vector`]: TypeInner::Vector
/// [`Matrix`]: TypeInner::Matrix
/// [`Float`]: ScalarKind::Float
/// [`Bool`]: ScalarKind::Bool
/// [`Splat`]: Expression::Splat
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum BinaryOperator {
    Add,
    Subtract,
    Multiply,
    Divide,
    /// Equivalent of SPIR-V's `OpSMod`, `OpUMod` and `OpFMod` (GLSL's `%` and `mod`)
    Modulo,
    Equal,
    NotEqual,
    Less,
    LessEqual,
    Greater,
    GreaterEqual,
    And,
    ExclusiveOr,
    InclusiveOr,
    LogicalAnd,
    LogicalOr,
    ShiftLeft,
    /// Right shift carries the sign of signed integers only.
    ShiftRight,
}

/// Function on an atomic value.
///
/// Note: these do not include load/store, which use the existing
/// [`Expression::Load`] and [`Statement::Store`].
///
/// All `Handle<Expression>` values here refer to an expression in
/// [`Function::expressions`].
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum AtomicFunction {
    Add,
    Subtract,
    And,
    ExclusiveOr,
    InclusiveOr,
    Min,
    Max,
    Exchange { compare: Option<Handle<Expression>> },
}

#[derive(Clone, Copy, Debug, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum InterpolationLocation {
    Centroid,
    Sample(Handle<Expression>),
    Offset(Handle<Expression>),
}

#[derive(Clone, Copy, Debug, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum AttachmentAspect {
    Color(Handle<Expression>),
    Depth,
    Stencil,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum BarrierPhase {
    Arrive,
    Wait,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum MemoryScope {
    CrossDevice,
    Device,
    Workgroup,
    Subgroup,
    Invocation,
    QueueFamily,
    ShaderCall,
}

bitflags::bitflags! {
    #[cfg_attr(feature = "serialize", derive(Serialize))]
    #[cfg_attr(feature = "deserialize", derive(Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
    #[derive(Clone, Copy, Debug, Default, Eq, Hash, Ord, PartialEq, PartialOrd)]
    pub struct MemorySemantics: u32 {
        const ACQUIRE = 0x2;
        const RELEASE = 0x4;
        const ACQUIRE_RELEASE = 0x8;
        const UNIFORM_MEMORY = 0x40;
        const WORKGROUP_MEMORY = 0x100;
        const ATOMIC_COUNTER_MEMORY = 0x400;
        const IMAGE_MEMORY = 0x800;
        const OUTPUT_MEMORY = 0x1000;
        const MAKE_AVAILABLE = 0x2000;
        const MAKE_VISIBLE = 0x4000;
        const VOLATILE = 0x8000;
    }
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct MemoryOrder {
    pub scope: MemoryScope,
    pub semantics: MemorySemantics,
    pub unequal: MemorySemantics,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct Texel {
    pub image: Handle<Expression>,
    pub coordinate: Handle<Expression>,
    pub array_index: Option<Handle<Expression>>,
    pub sample: Option<Handle<Expression>>,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum AtomicLocation {
    Pointer(Handle<Expression>),
    Texel(Texel),
}

impl Texel {
    pub fn expressions(&self) -> impl Iterator<Item = Handle<Expression>> {
        [self.image, self.coordinate]
            .into_iter()
            .chain(self.array_index)
            .chain(self.sample)
    }
}

impl AtomicLocation {
    pub fn expressions(&self) -> impl Iterator<Item = Handle<Expression>> {
        let (pointer, texel) = match *self {
            Self::Pointer(pointer) => (Some(pointer), None),
            Self::Texel(texel) => (None, Some(texel)),
        };
        pointer
            .into_iter()
            .chain(texel.into_iter().flat_map(|texel| texel.expressions()))
    }
}

/// Hint at which precision to compute a derivative.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum DerivativeControl {
    Coarse,
    Fine,
    None,
}

/// Axis on which to compute a derivative.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum DerivativeAxis {
    X,
    Y,
    Width,
}

/// Built-in shader function for testing relation between values.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum RelationalFunction {
    All,
    Any,
    IsNan,
    IsInf,
}

/// Built-in shader function for math.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum MathFunction {
    // comparison
    Abs,
    Min,
    Max,
    Clamp,
    Saturate,
    // trigonometry
    Cos,
    Cosh,
    Sin,
    Sinh,
    Tan,
    Tanh,
    Acos,
    Asin,
    Atan,
    Atan2,
    Asinh,
    Acosh,
    Atanh,
    Radians,
    Degrees,
    // decomposition
    Ceil,
    Floor,
    Round,
    RoundEven,
    Fract,
    Trunc,
    Modf,
    Frexp,
    Ldexp,
    // exponent
    Exp,
    Exp2,
    Log,
    Log2,
    Pow,
    // geometry
    Dot,
    Dot4I8Packed,
    Dot4U8Packed,
    Outer,
    Cross,
    Distance,
    Length,
    Normalize,
    FaceForward,
    Reflect,
    Refract,
    // computational
    Sign,
    Fma,
    Mix,
    Step,
    SmoothStep,
    Sqrt,
    InverseSqrt,
    Inverse,
    Transpose,
    Determinant,
    QuantizeToF16,
    // bits
    CountTrailingZeros,
    CountLeadingZeros,
    CountOneBits,
    ReverseBits,
    ExtractBits,
    InsertBits,
    FirstTrailingBit,
    FirstLeadingBit,
    AddCarry,
    SubBorrow,
    MulExtended,
    // data packing
    Pack4x8snorm,
    Pack4x8unorm,
    Pack2x16snorm,
    Pack2x16unorm,
    Pack2x16float,
    Pack4xI8,
    Pack4xU8,
    Pack4xI8Clamp,
    Pack4xU8Clamp,
    // data unpacking
    Unpack4x8snorm,
    Unpack4x8unorm,
    Unpack2x16snorm,
    Unpack2x16unorm,
    Unpack2x16float,
    Unpack4xI8,
    Unpack4xU8,
}

/// Sampling modifier to control the level of detail.
///
/// All `Handle<Expression>` values here refer to an expression in
/// [`Function::expressions`].
#[derive(Clone, Copy, Debug, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SampleLevel {
    Auto,
    Zero,
    Exact(Handle<Expression>),
    Bias(Handle<Expression>),
    Gradient {
        x: Handle<Expression>,
        y: Handle<Expression>,
    },
}

/// Type of an image query.
///
/// All `Handle<Expression>` values here refer to an expression in
/// [`Function::expressions`].
#[derive(Clone, Copy, Debug, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ImageQuery {
    /// Get the size at the specified level.
    ///
    /// The return value is a `u32` for 1D images, and a `vecN<u32>`
    /// for an image with dimensions N > 2.
    Size {
        /// If `None`, the base level is considered.
        level: Option<Handle<Expression>>,
    },
    /// Get the number of mipmap levels, a `u32`.
    NumLevels,
    /// Get the number of array layers, a `u32`.
    NumLayers,
    /// Get the number of samples, a `u32`.
    NumSamples,
    Lod {
        sampler: Option<Handle<Expression>>,
        coordinate: Handle<Expression>,
    },
}

/// Component selection for a vector swizzle.
#[repr(u8)]
#[derive(Clone, Copy, Debug, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SwizzleComponent {
    X = 0,
    Y = 1,
    Z = 2,
    W = 3,
}

/// The specific behavior of a [`SubgroupGather`] statement.
///
/// All `Handle<Expression>` values here refer to an expression in
/// [`Function::expressions`].
///
/// [`SubgroupGather`]: Statement::SubgroupGather
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum GatherMode {
    /// All gather from the active lane with the smallest index
    BroadcastFirst,
    /// All gather from the same lane at the index given by the expression
    Broadcast(Handle<Expression>),
    /// Each gathers from a different lane at the index given by the expression
    Shuffle(Handle<Expression>),
    /// Each gathers from their lane plus the shift given by the expression
    ShuffleDown(Handle<Expression>),
    /// Each gathers from their lane minus the shift given by the expression
    ShuffleUp(Handle<Expression>),
    /// Each gathers from their lane xored with the given by the expression
    ShuffleXor(Handle<Expression>),
    /// All gather from the same quad lane at the index given by the expression
    QuadBroadcast(Handle<Expression>),
    /// Each gathers from the opposite quad lane along the given direction
    QuadSwap(Direction),
    Rotate {
        delta: Handle<Expression>,
        cluster_size: Option<u32>,
    },
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum Direction {
    X = 0,
    Y = 1,
    Diagonal = 2,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SubgroupOperation {
    All = 0,
    Any = 1,
    Add = 2,
    Mul = 3,
    Min = 4,
    Max = 5,
    And = 6,
    Or = 7,
    Xor = 8,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum CollectiveOperation {
    Reduce,
    InclusiveScan,
    ExclusiveScan,
    ClusteredReduce(u32),
    PartitionedReduce(Handle<Expression>),
    PartitionedInclusiveScan(Handle<Expression>),
    PartitionedExclusiveScan(Handle<Expression>),
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SubgroupFunction {
    Elect,
    AllEqual(Handle<Expression>),
    QuadAll(Handle<Expression>),
    QuadAny(Handle<Expression>),
    InverseBallot(Handle<Expression>),
    BallotBitExtract {
        ballot: Handle<Expression>,
        index: Handle<Expression>,
    },
    BallotBitCount {
        ballot: Handle<Expression>,
        collective_op: CollectiveOperation,
    },
    BallotFindLsb(Handle<Expression>),
    BallotFindMsb(Handle<Expression>),
    Partition(Handle<Expression>),
    KhrBallot(Handle<Expression>),
    KhrReadInvocation {
        argument: Handle<Expression>,
        index: Handle<Expression>,
    },
    KhrReadFirstInvocation(Handle<Expression>),
    KhrAll(Handle<Expression>),
    KhrAny(Handle<Expression>),
    KhrAllEqual(Handle<Expression>),
    Group {
        op: SubgroupOperation,
        collective_op: CollectiveOperation,
        argument: Handle<Expression>,
        non_uniform: bool,
    },
}

bitflags::bitflags! {
    /// Memory barrier flags.
    #[cfg_attr(feature = "serialize", derive(Serialize))]
    #[cfg_attr(feature = "deserialize", derive(Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
    #[derive(Clone, Copy, Debug, Default, Eq, PartialEq)]
    pub struct Barrier: u32 {
        /// Barrier affects all [`AddressSpace::Storage`] accesses.
        const STORAGE = 1 << 0;
        /// Barrier affects all [`AddressSpace::WorkGroup`] and [`AddressSpace::TaskPayload`] accesses.
        const WORK_GROUP = 1 << 1;
        /// Barrier synchronizes execution across all invocations within a subgroup that execute this instruction.
        const SUB_GROUP = 1 << 2;
        /// Barrier synchronizes texture memory accesses in a workgroup.
        const TEXTURE = 1 << 3;
    }
}

#[derive(Clone, Copy, Debug, Default, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ImageGatherPattern {
    #[default]
    Quad,
    Linear4x1,
    Diagonal,
    Horizontal2,
    Vertical2,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum BlockMatchMetric {
    SumOfAbsoluteDifferences,
    SumOfSquaredDifferences,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum BlockMatchSearch {
    Block,
    Window,
    Gather,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ImageProcessingOperation {
    SampleWeighted,
    BoxFilter,
    BlockMatch {
        metric: BlockMatchMetric,
        search: BlockMatchSearch,
    },
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum ArrayConversion {
    Bitcast,
    SubArray,
    ToCooperativeMatrix,
    FromCooperativeMatrix,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum CooperativeFamily {
    Khr,
    Nv,
    Ext,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum TensorOperation {
    LayoutSetBlockSize,
    LayoutSetDimension,
    LayoutSetStride,
    LayoutSlice,
    LayoutSetClampValue,
    ViewSetDimension,
    ViewSetStride,
    ViewSetClip,
}

#[derive(Clone, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum CooperativeMatrixFunction {
    Transpose {
        matrix: Handle<Expression>,
        family: CooperativeFamily,
    },
    Reduce {
        matrix: Handle<Expression>,
        mask: u32,
        combine: Handle<Function>,
        family: CooperativeFamily,
    },
    PerElement {
        matrix: Handle<Expression>,
        function: Handle<Function>,
        arguments: Vec<Handle<Expression>>,
        family: CooperativeFamily,
    },
    GetCoordinate {
        matrix: Handle<Expression>,
        index: Handle<Expression>,
    },
    LoadTensor {
        pointer: Handle<Expression>,
        object: Handle<Expression>,
        layout: Handle<Expression>,
        view: Option<Handle<Expression>>,
        decode: Option<Handle<Function>>,
        decode_vector: Option<Handle<Function>>,
    },
    StoreTensor {
        pointer: Handle<Expression>,
        value: Handle<Expression>,
        layout: Handle<Expression>,
        view: Option<Handle<Expression>>,
    },
}

impl CooperativeMatrixFunction {
    pub fn operands(&self) -> Vec<Handle<Expression>> {
        match *self {
            Self::Transpose { matrix, .. } | Self::Reduce { matrix, .. } => alloc::vec![matrix],
            Self::PerElement {
                matrix,
                ref arguments,
                ..
            } => core::iter::once(matrix)
                .chain(arguments.iter().copied())
                .collect(),
            Self::GetCoordinate { matrix, index } => alloc::vec![matrix, index],
            Self::LoadTensor {
                pointer,
                object,
                layout,
                view,
                ..
            } => [Some(pointer), Some(object), Some(layout), view]
                .into_iter()
                .flatten()
                .collect(),
            Self::StoreTensor {
                pointer,
                value,
                layout,
                view,
            } => [Some(pointer), Some(value), Some(layout), view]
                .into_iter()
                .flatten()
                .collect(),
        }
    }

    pub fn operands_mut(&mut self) -> Vec<&mut Handle<Expression>> {
        match *self {
            Self::Transpose { ref mut matrix, .. } | Self::Reduce { ref mut matrix, .. } => {
                alloc::vec![matrix]
            }
            Self::PerElement {
                ref mut matrix,
                ref mut arguments,
                ..
            } => core::iter::once(matrix)
                .chain(arguments.iter_mut())
                .collect(),
            Self::GetCoordinate {
                ref mut matrix,
                ref mut index,
            } => alloc::vec![matrix, index],
            Self::LoadTensor {
                ref mut pointer,
                ref mut object,
                ref mut layout,
                ref mut view,
                ..
            } => [Some(pointer), Some(object), Some(layout), view.as_mut()]
                .into_iter()
                .flatten()
                .collect(),
            Self::StoreTensor {
                ref mut pointer,
                ref mut value,
                ref mut layout,
                ref mut view,
            } => [Some(pointer), Some(value), Some(layout), view.as_mut()]
                .into_iter()
                .flatten()
                .collect(),
        }
    }

    pub fn functions(&self) -> Vec<Handle<Function>> {
        match *self {
            Self::Reduce { combine, .. } => alloc::vec![combine],
            Self::PerElement { function, .. } => alloc::vec![function],
            Self::LoadTensor {
                decode,
                decode_vector,
                ..
            } => [decode, decode_vector].into_iter().flatten().collect(),
            Self::Transpose { .. } | Self::GetCoordinate { .. } | Self::StoreTensor { .. } => {
                Vec::new()
            }
        }
    }

    pub fn functions_mut(&mut self) -> Vec<&mut Handle<Function>> {
        match *self {
            Self::Reduce {
                ref mut combine, ..
            } => alloc::vec![combine],
            Self::PerElement {
                ref mut function, ..
            } => alloc::vec![function],
            Self::LoadTensor {
                ref mut decode,
                ref mut decode_vector,
                ..
            } => [decode.as_mut(), decode_vector.as_mut()]
                .into_iter()
                .flatten()
                .collect(),
            Self::Transpose { .. } | Self::GetCoordinate { .. } | Self::StoreTensor { .. } => {
                Vec::new()
            }
        }
    }
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct CooperativeVectorBias {
    pub pointer: Handle<Expression>,
    pub offset: Handle<Expression>,
    pub interpretation: Handle<Expression>,
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct CooperativeVectorMatMul {
    pub input: Handle<Expression>,
    pub input_interpretation: Handle<Expression>,
    pub matrix: Handle<Expression>,
    pub matrix_offset: Handle<Expression>,
    pub matrix_interpretation: Handle<Expression>,
    pub bias: Option<CooperativeVectorBias>,
    pub rows: Handle<Expression>,
    pub columns: Handle<Expression>,
    pub layout: Handle<Expression>,
    pub transpose: Handle<Expression>,
    pub stride: Handle<Expression>,
}

impl CooperativeVectorMatMul {
    pub fn operands(&self) -> impl Iterator<Item = Handle<Expression>> {
        let bias = self
            .bias
            .map(|bias| [bias.pointer, bias.offset, bias.interpretation]);
        [
            self.input,
            self.input_interpretation,
            self.matrix,
            self.matrix_offset,
            self.matrix_interpretation,
            self.rows,
            self.columns,
            self.layout,
            self.transpose,
            self.stride,
        ]
        .into_iter()
        .chain(bias.into_iter().flatten())
    }

    pub fn operands_mut(&mut self) -> impl Iterator<Item = &mut Handle<Expression>> {
        let bias = self.bias.as_mut().map(|bias| {
            [
                &mut bias.pointer,
                &mut bias.offset,
                &mut bias.interpretation,
            ]
        });
        [
            &mut self.input,
            &mut self.input_interpretation,
            &mut self.matrix,
            &mut self.matrix_offset,
            &mut self.matrix_interpretation,
            &mut self.rows,
            &mut self.columns,
            &mut self.layout,
            &mut self.transpose,
            &mut self.stride,
        ]
        .into_iter()
        .chain(bias.into_iter().flatten())
    }
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum CooperativeVectorFunction {
    Store {
        value: Handle<Expression>,
        pointer: Handle<Expression>,
        offset: Handle<Expression>,
    },
    OuterProductAccumulate {
        a: Handle<Expression>,
        b: Handle<Expression>,
        matrix: Handle<Expression>,
        offset: Handle<Expression>,
        stride: Handle<Expression>,
        layout: Handle<Expression>,
        interpretation: Handle<Expression>,
    },
    ReduceSumAccumulate {
        value: Handle<Expression>,
        pointer: Handle<Expression>,
        offset: Handle<Expression>,
    },
}

impl CooperativeVectorFunction {
    pub fn operands(&self) -> Vec<Handle<Expression>> {
        match *self {
            Self::Store {
                value,
                pointer,
                offset,
            }
            | Self::ReduceSumAccumulate {
                value,
                pointer,
                offset,
            } => alloc::vec![value, pointer, offset],
            Self::OuterProductAccumulate {
                a,
                b,
                matrix,
                offset,
                stride,
                layout,
                interpretation,
            } => alloc::vec![a, b, matrix, offset, stride, layout, interpretation],
        }
    }

    pub fn operands_mut(&mut self) -> Vec<&mut Handle<Expression>> {
        match *self {
            Self::Store {
                ref mut value,
                ref mut pointer,
                ref mut offset,
            }
            | Self::ReduceSumAccumulate {
                ref mut value,
                ref mut pointer,
                ref mut offset,
            } => alloc::vec![value, pointer, offset],
            Self::OuterProductAccumulate {
                ref mut a,
                ref mut b,
                ref mut matrix,
                ref mut offset,
                ref mut stride,
                ref mut layout,
                ref mut interpretation,
            } => alloc::vec![a, b, matrix, offset, stride, layout, interpretation],
        }
    }

    pub const fn writes(&self) -> Handle<Expression> {
        match *self {
            Self::Store { pointer, .. } | Self::ReduceSumAccumulate { pointer, .. } => pointer,
            Self::OuterProductAccumulate { matrix, .. } => matrix,
        }
    }
}

#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct CooperativeData {
    pub pointer: Handle<Expression>,
    pub stride: Option<Handle<Expression>>,
    pub layout: Handle<Expression>,
}

impl CooperativeData {
    pub fn operands(&self) -> impl Iterator<Item = Handle<Expression>> {
        [Some(self.pointer), self.stride, Some(self.layout)]
            .into_iter()
            .flatten()
    }

    pub fn operands_mut(&mut self) -> impl Iterator<Item = &mut Handle<Expression>> {
        [
            Some(&mut self.pointer),
            self.stride.as_mut(),
            Some(&mut self.layout),
        ]
        .into_iter()
        .flatten()
    }
}

/// An expression that can be evaluated to obtain a value.
///
/// This is a Single Static Assignment (SSA) scheme similar to SPIR-V.
///
/// When an `Expression` variant holds `Handle<Expression>` fields, they refer
/// to another expression in the same arena, unless explicitly noted otherwise.
/// One `Arena<Expression>` may only refer to a different arena indirectly, via
/// [`Constant`] or [`Override`] expressions, which hold handles for their
/// respective types.
///
/// [`Constant`]: Expression::Constant
/// [`Override`]: Expression::Override
#[derive(Clone, Debug, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum Expression {
    /// Literal.
    Literal(Literal),
    /// Constant value.
    Constant(Handle<Constant>),
    /// Pipeline-overridable constant.
    Override(Handle<Override>),
    /// Zero value of a type.
    ZeroValue(Handle<Type>),
    /// Composite expression.
    Compose {
        ty: Handle<Type>,
        components: Vec<Handle<Expression>>,
    },

    /// Array access with a computed index.
    ///
    /// ## Typing rules
    ///
    /// The `base` operand must be some composite type: [`Vector`], [`Matrix`],
    /// [`Array`], a [`Pointer`] to one of those, or a [`ValuePointer`] with a
    /// `size`.
    ///
    /// The `index` operand must be an integer, signed or unsigned.
    ///
    /// Indexing a [`Vector`] or [`Array`] produces a value of its element type.
    /// Indexing a [`Matrix`] produces a [`Vector`].
    ///
    /// Indexing a [`Pointer`] to any of the above produces a pointer to the
    /// element/component type, in the same [`space`]. In the case of [`Array`],
    /// the result is an actual [`Pointer`], but for vectors and matrices, there
    /// may not be any type in the arena representing the component's type, so
    /// those produce [`ValuePointer`] types equivalent to the appropriate
    /// [`Pointer`].
    ///
    /// ## Dynamic indexing restrictions
    ///
    /// To accommodate restrictions in some of the shader languages that rglsl
    /// targets, it is not permitted to subscript a matrix with a dynamically
    /// computed index unless that matrix appears behind a pointer. In other
    /// words, if the inner type of `base` is [`Matrix`], then `index` must be a
    /// constant. But if the type of `base` is a [`Pointer`] to an matrix, then
    /// the index may be any expression of integer type.
    ///
    /// You can use the [`Expression::is_dynamic_index`] method to determine
    /// whether a given index expression requires matrix base operands to be
    /// behind a pointer.
    ///
    /// (It would be simpler to always require the use of `AccessIndex` when
    /// subscripting matrices that are not behind pointers, but to accommodate
    /// existing front ends, rglsl also permits `Access`, with a restricted
    /// `index`.)
    ///
    /// [`Vector`]: TypeInner::Vector
    /// [`Matrix`]: TypeInner::Matrix
    /// [`Array`]: TypeInner::Array
    /// [`Pointer`]: TypeInner::Pointer
    /// [`space`]: TypeInner::Pointer::space
    /// [`ValuePointer`]: TypeInner::ValuePointer
    /// [`Float`]: ScalarKind::Float
    Access {
        base: Handle<Expression>,
        index: Handle<Expression>,
    },
    /// Access the same types as [`Access`], plus [`Struct`] with a known index.
    ///
    /// [`Access`]: Expression::Access
    /// [`Struct`]: TypeInner::Struct
    AccessIndex {
        base: Handle<Expression>,
        index: u32,
    },
    /// Splat scalar into a vector.
    Splat {
        size: VectorSize,
        value: Handle<Expression>,
    },
    /// Vector swizzle.
    Swizzle {
        size: VectorSize,
        vector: Handle<Expression>,
        pattern: [SwizzleComponent; 4],
    },

    /// Reference a function parameter, by its index.
    ///
    /// A `FunctionArgument` expression evaluates to the argument's value.
    FunctionArgument(u32),

    /// Reference a global variable.
    ///
    /// If the given `GlobalVariable`'s [`space`] is [`AddressSpace::Handle`],
    /// then the variable stores some opaque type like a sampler or an image,
    /// and a `GlobalVariable` expression referring to it produces the
    /// variable's value directly.
    ///
    /// For any other address space, a `GlobalVariable` expression produces a
    /// pointer to the variable's value. You must use a [`Load`] expression to
    /// retrieve its value, or a [`Store`] statement to assign it a new value.
    ///
    /// [`space`]: GlobalVariable::space
    /// [`Load`]: Expression::Load
    /// [`Store`]: Statement::Store
    GlobalVariable(Handle<GlobalVariable>),

    /// Reference a local variable.
    ///
    /// A `LocalVariable` expression evaluates to a pointer to the variable's value.
    /// You must use a [`Load`](Expression::Load) expression to retrieve its value,
    /// or a [`Store`](Statement::Store) statement to assign it a new value.
    LocalVariable(Handle<LocalVariable>),

    /// Load a value indirectly.
    ///
    /// For [`TypeInner::Atomic`] the result is a corresponding scalar.
    /// For other types behind the `pointer<T>`, the result is `T`.
    Load {
        pointer: Handle<Expression>,
    },
    /// Sample a point from a sampled or a depth image.
    ImageSample {
        image: Handle<Expression>,
        sampler: Option<Handle<Expression>>,
        /// If Some(), this operation is a gather operation
        /// on the selected component.
        gather: Option<SwizzleComponent>,
        #[cfg_attr(feature = "deserialize", serde(default))]
        gather_pattern: ImageGatherPattern,
        coordinate: Handle<Expression>,
        array_index: Option<Handle<Expression>>,
        offset: Option<Handle<Expression>>,
        level: SampleLevel,
        depth_ref: Option<Handle<Expression>>,
        /// Whether the sampling operation should clamp each component of
        /// `coordinate` to the range `[half_texel, 1 - half_texel]`, regardless
        /// of `sampler`.
        clamp_to_edge: bool,
        #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
        #[cfg_attr(feature = "deserialize", serde(default))]
        min_lod: Option<Handle<Expression>>,
        #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
        #[cfg_attr(feature = "deserialize", serde(default))]
        sparse: Option<Handle<Type>>,
    },

    /// Load a texel from an image.
    ///
    /// For most images, this returns a four-element vector of the same
    /// [`ScalarKind`] as the image. If the format of the image does not have
    /// four components, default values are provided: the first three components
    /// (typically R, G, and B) default to zero, and the final component
    /// (typically alpha) defaults to one.
    ///
    /// However, if the image's [`class`] is [`Depth`], then this returns a
    /// [`Float`] scalar value.
    ///
    /// [`ScalarKind`]: ScalarKind
    /// [`class`]: TypeInner::Image::class
    /// [`Depth`]: ImageClass::Depth
    /// [`Float`]: ScalarKind::Float
    ImageLoad {
        /// The image to load a texel from. This must have type [`Image`]. (This
        /// will necessarily be a [`GlobalVariable`] or [`FunctionArgument`]
        /// expression, since no other expressions are allowed to have that
        /// type.)
        ///
        /// [`Image`]: TypeInner::Image
        /// [`GlobalVariable`]: Expression::GlobalVariable
        /// [`FunctionArgument`]: Expression::FunctionArgument
        image: Handle<Expression>,

        /// The coordinate of the texel we wish to load. This must be a scalar
        /// for [`D1`] images, a [`Bi`] vector for [`D2`] images, and a [`Tri`]
        /// vector for [`D3`] images. (Array indices, sample indices, and
        /// explicit level-of-detail values are supplied separately.) Its
        /// component type must be [`Sint`].
        ///
        /// [`D1`]: ImageDimension::D1
        /// [`D2`]: ImageDimension::D2
        /// [`D3`]: ImageDimension::D3
        /// [`Bi`]: VectorSize::Bi
        /// [`Tri`]: VectorSize::Tri
        /// [`Sint`]: ScalarKind::Sint
        coordinate: Handle<Expression>,

        /// The index into an arrayed image. If the [`arrayed`] flag in
        /// `image`'s type is `true`, then this must be `Some(expr)`, where
        /// `expr` is a [`Sint`] scalar. Otherwise, it must be `None`.
        ///
        /// [`arrayed`]: TypeInner::Image::arrayed
        /// [`Sint`]: ScalarKind::Sint
        array_index: Option<Handle<Expression>>,

        /// A sample index, for multisampled [`Sampled`] and [`Depth`] images.
        ///
        /// [`Sampled`]: ImageClass::Sampled
        /// [`Depth`]: ImageClass::Depth
        sample: Option<Handle<Expression>>,

        /// A level of detail, for mipmapped images.
        ///
        /// This must be present when accessing non-multisampled
        /// [`Sampled`] and [`Depth`] images, even if only the
        /// full-resolution level is present (in which case the only
        /// valid level is zero).
        ///
        /// [`Sampled`]: ImageClass::Sampled
        /// [`Depth`]: ImageClass::Depth
        level: Option<Handle<Expression>>,
        #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
        #[cfg_attr(feature = "deserialize", serde(default))]
        sparse: Option<Handle<Type>>,
    },

    /// Query information from an image.
    ImageQuery {
        image: Handle<Expression>,
        query: ImageQuery,
    },
    /// Apply an unary operator.
    Unary {
        op: UnaryOperator,
        expr: Handle<Expression>,
    },
    /// Apply a binary operator.
    Binary {
        op: BinaryOperator,
        left: Handle<Expression>,
        right: Handle<Expression>,
    },
    /// Select between two values based on a condition.
    ///
    /// Note that, because expressions have no side effects, it is unobservable
    /// whether the non-selected branch is evaluated.
    Select {
        /// Boolean expression
        condition: Handle<Expression>,
        accept: Handle<Expression>,
        reject: Handle<Expression>,
    },
    /// Compute the derivative on an axis.
    Derivative {
        axis: DerivativeAxis,
        ctrl: DerivativeControl,
        expr: Handle<Expression>,
    },
    /// Call a relational function.
    Relational {
        fun: RelationalFunction,
        argument: Handle<Expression>,
    },
    /// Call a math function
    Math {
        fun: MathFunction,
        arg: Handle<Expression>,
        arg1: Option<Handle<Expression>>,
        arg2: Option<Handle<Expression>>,
        arg3: Option<Handle<Expression>>,
    },
    /// Cast a simple type to another kind.
    As {
        /// Source expression, which can only be a scalar or a vector.
        expr: Handle<Expression>,
        /// Target scalar kind.
        kind: ScalarKind,
        /// If provided, converts to the specified byte width.
        /// Otherwise, bitcast.
        convert: Option<Bytes>,
    },
    /// Result of calling another function.
    CallResult(Handle<Function>),

    /// Result of an atomic operation.
    ///
    /// This expression must be referred to by the [`result`] field of exactly one
    /// [`Atomic`][stmt] statement somewhere in the same function. Let `T` be the
    /// scalar type contained by the [`Atomic`][type] value that the statement
    /// operates on.
    ///
    /// If `comparison` is `false`, then `ty` must be the scalar type `T`.
    ///
    /// If `comparison` is `true`, then `ty` must be a [`Struct`] with two members:
    ///
    /// - A member named `old_value`, whose type is `T`, and
    ///
    /// - A member named `exchanged`, of type [`BOOL`].
    ///
    /// [`result`]: Statement::Atomic::result
    /// [stmt]: Statement::Atomic
    /// [type]: TypeInner::Atomic
    /// [`Struct`]: TypeInner::Struct
    /// [`BOOL`]: Scalar::BOOL
    AtomicResult {
        ty: Handle<Type>,
        comparison: bool,
    },

    /// Result of a [`WorkGroupUniformLoad`] statement.
    ///
    /// [`WorkGroupUniformLoad`]: Statement::WorkGroupUniformLoad
    WorkGroupUniformLoadResult {
        /// The type of the result
        ty: Handle<Type>,
    },
    /// Get the length of an array.
    /// The expression must resolve to a pointer to an array with a dynamic size.
    ///
    /// This doesn't match the semantics of spirv's `OpArrayLength`, which must be passed
    /// a pointer to a structure containing a runtime array in its' last field.
    ArrayLength(Handle<Expression>),
    WideArrayLength(Handle<Expression>),
    PhysicalPointer {
        value: Handle<Expression>,
        ty: Handle<Type>,
    },
    PhysicalAddress {
        pointer: Handle<Expression>,
        split: bool,
    },
    BufferPointer {
        descriptor: Handle<Expression>,
    },
    HeapOffset {
        pointer: Handle<Expression>,
        offset: Handle<Expression>,
    },

    /// Result of a [`Proceed`] [`RayQuery`] statement.
    ///
    /// [`Proceed`]: RayQueryFunction::Proceed
    /// [`RayQuery`]: Statement::RayQuery
    RayQueryProceedResult,

    RayQueryGet {
        query: Handle<Expression>,
        value: RayQueryValue,
    },

    ReportIntersectionResult,

    AccelerationStructureFromAddress {
        address: Handle<Expression>,
    },

    HitObjectGet {
        object: Handle<Expression>,
        value: HitObjectValue,
    },

    FetchMicroTriangleVertex {
        acceleration_structure: Handle<Expression>,
        instance_id: Handle<Expression>,
        geometry_index: Handle<Expression>,
        primitive_index: Handle<Expression>,
        barycentric: Handle<Expression>,
        value: MicroTriangleVertexValue,
    },

    /// Result of a [`SubgroupBallot`] statement.
    ///
    /// [`SubgroupBallot`]: Statement::SubgroupBallot
    SubgroupBallotResult,

    /// Result of a [`SubgroupCollectiveOperation`] or [`SubgroupGather`] statement.
    ///
    /// [`SubgroupCollectiveOperation`]: Statement::SubgroupCollectiveOperation
    /// [`SubgroupGather`]: Statement::SubgroupGather
    SubgroupOperationResult {
        ty: Handle<Type>,
    },
    SpirvInstructionResult {
        ty: Handle<Type>,
    },

    CooperativeLoad {
        ty: Handle<Type>,
        data: CooperativeData,
    },
    CooperativeMultiplyAdd {
        a: Handle<Expression>,
        b: Handle<Expression>,
        c: Handle<Expression>,
        saturating: bool,
    },
    CooperativeMatrixLength {
        ty: Handle<Type>,
    },
    Replicate {
        ty: Handle<Type>,
        value: Handle<Expression>,
    },
    Expect {
        value: Handle<Expression>,
        expected: Handle<Expression>,
    },
    ImageSparseResident {
        code: Handle<Expression>,
    },
    IsHelperInvocation,
    InterpolateAt {
        pointer: Handle<Expression>,
        location: InterpolationLocation,
    },
    FragmentFetch {
        image: Handle<Expression>,
        coordinate: Handle<Expression>,
        fragment: Option<Handle<Expression>>,
    },
    ImageFootprint {
        image: Handle<Expression>,
        coordinate: Handle<Expression>,
        granularity: Handle<Expression>,
        coarse: Handle<Expression>,
        level: SampleLevel,
        min_lod: Option<Handle<Expression>>,
        ty: Handle<Type>,
    },
    AttachmentRead {
        aspect: AttachmentAspect,
        sample: Option<Handle<Expression>>,
    },
    CooperativeVectorLoad {
        ty: Handle<Type>,
        pointer: Handle<Expression>,
        offset: Handle<Expression>,
    },
    CooperativeVectorMatMul {
        ty: Handle<Type>,
        operation: CooperativeVectorMatMul,
    },
    Convert {
        expr: Handle<Expression>,
        ty: Handle<Type>,
        saturating: bool,
        family: CooperativeFamily,
    },
    CooperativeMatrixResult {
        ty: Handle<Type>,
    },
    TensorCreate {
        ty: Handle<Type>,
    },
    ImageProcessing {
        operation: ImageProcessingOperation,
        image: Handle<Expression>,
        sampler: Option<Handle<Expression>>,
        coordinate: Handle<Expression>,
        reference: Option<Handle<Expression>>,
        reference_sampler: Option<Handle<Expression>>,
        reference_coordinate: Option<Handle<Expression>>,
        size: Option<Handle<Expression>>,
    },
    ArrayConversion {
        conversion: ArrayConversion,
        expr: Handle<Expression>,
        index: Option<Handle<Expression>>,
        ty: Handle<Type>,
    },
    Bitcast {
        expr: Handle<Expression>,
        ty: Handle<Type>,
        offset: Option<Handle<Expression>>,
    },
    TensorSet {
        base: Handle<Expression>,
        operation: TensorOperation,
        operands: Vec<Handle<Expression>>,
    },
    TensorRead {
        ty: Handle<Type>,
        tensor: Handle<Expression>,
        coordinates: Handle<Expression>,
        nontemporal: bool,
        out_of_bounds: Option<Handle<Expression>>,
    },
    TensorQuerySize {
        tensor: Handle<Expression>,
        dimension: u32,
    },
}

/// The value of the switch case.
#[derive(Clone, Copy, Debug, Eq, Hash, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SwitchValue {
    I32(i32),
    U32(u32),
    Default,
}

/// A case for a switch statement.
// Clone is used only for error reporting and is not intended for end users
#[derive(Clone, Debug)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct SwitchCase {
    /// Value, upon which the case is considered true.
    pub value: SwitchValue,
    /// Body of the case.
    pub body: Block,
    /// If true, the control flow continues to the next case in the list,
    /// or default.
    pub fall_through: bool,
}

/// An operation that a [`RayQuery` statement] applies to its [`query`] operand.
///
/// [`RayQuery` statement]: Statement::RayQuery
/// [`query`]: Statement::RayQuery::query
#[derive(Clone, Debug)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum RayQueryFunction {
    /// Initialize the `RayQuery` object.
    Initialize {
        acceleration_structure: Handle<Expression>,
        flags: Handle<Expression>,
        cull_mask: Handle<Expression>,
        origin: Handle<Expression>,
        tmin: Handle<Expression>,
        direction: Handle<Expression>,
        tmax: Handle<Expression>,
    },

    /// Start or continue the query given by the statement's [`query`] operand.
    ///
    /// After executing this statement, the `result` expression is a
    /// [`Bool`] scalar indicating whether there are more intersection
    /// candidates to consider.
    ///
    /// [`query`]: Statement::RayQuery::query
    /// [`Bool`]: ScalarKind::Bool
    Proceed {
        result: Handle<Expression>,
    },

    /// Add a candidate generated intersection to be included
    /// in the determination of the closest hit for a ray query.
    GenerateIntersection {
        hit_t: Handle<Expression>,
    },

    /// Confirm a triangle intersection to be included in the determination of
    /// the closest hit for a ray query.
    ConfirmIntersection,

    Terminate,
}

//TODO: consider removing `Clone`. It's not valid to clone `Statement::Emit` anyway.
/// Instructions which make up an executable block.
///
/// `Handle<Expression>` and `Range<Expression>` values in `Statement` variants
/// refer to expressions in [`Function::expressions`], unless otherwise noted.
// Clone is used only for error reporting and is not intended for end users
#[derive(Clone, Debug)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum Statement {
    /// Emit a range of expressions, visible to all statements that follow in this block.
    ///
    /// See the [module-level documentation][emit] for details.
    ///
    /// [emit]: index.html#expression-evaluation-time
    Emit(Range<Expression>),
    /// A block containing more statements, to be executed sequentially.
    Block(Block),
    /// Conditionally executes one of two blocks, based on the value of the condition.
    ///
    /// rglsl IR does not have "phi" instructions. If you need to use
    /// values computed in an `accept` or `reject` block after the `If`,
    /// store them in a [`LocalVariable`].
    If {
        condition: Handle<Expression>, //bool
        accept: Block,
        reject: Block,
        #[cfg_attr(feature = "deserialize", serde(default))]
        #[cfg_attr(
            feature = "serialize",
            serde(skip_serializing_if = "SelectionControl::is_none")
        )]
        control: SelectionControl,
    },
    /// Conditionally executes one of multiple blocks, based on the value of the selector.
    ///
    /// Each case must have a distinct [`value`], exactly one of which must be
    /// [`Default`]. The `Default` may appear at any position, and covers all
    /// values not explicitly appearing in other cases. A `Default` appearing in
    /// the midst of the list of cases does not shadow the cases that follow.
    ///
    /// Some backend languages don't support fallthrough (HLSL due to FXC,
    /// WGSL), and may translate fallthrough cases in the IR by duplicating
    /// code. However, all backend languages do support cases selected by
    /// multiple values, like `case 1: case 2: case 3: { ... }`. This is
    /// represented in the IR as a series of fallthrough cases with empty
    /// bodies, except for the last.
    ///
    /// rglsl IR does not have "phi" instructions. If you need to use
    /// values computed in a [`SwitchCase::body`] block after the `Switch`,
    /// store them in a [`LocalVariable`].
    ///
    /// [`value`]: SwitchCase::value
    /// [`body`]: SwitchCase::body
    /// [`Default`]: SwitchValue::Default
    Switch {
        selector: Handle<Expression>,
        cases: Vec<SwitchCase>,
        #[cfg_attr(feature = "deserialize", serde(default))]
        #[cfg_attr(
            feature = "serialize",
            serde(skip_serializing_if = "SelectionControl::is_none")
        )]
        control: SelectionControl,
    },

    /// Executes a block repeatedly.
    ///
    /// Each iteration of the loop executes the `body` block, followed by the
    /// `continuing` block.
    ///
    /// Executing a [`Break`], [`Return`] or [`Kill`] statement exits the loop.
    ///
    /// A [`Continue`] statement in `body` jumps to the `continuing` block. The
    /// `continuing` block is meant to be used to represent structures like the
    /// third expression of a C-style `for` loop head, to which `continue`
    /// statements in the loop's body jump.
    ///
    /// The `continuing` block and its substatements must not contain `Return`
    /// or `Kill` statements, or any `Break` or `Continue` statements targeting
    /// this loop. (It may have `Break` and `Continue` statements targeting
    /// loops or switches nested within the `continuing` block.) Expressions
    /// emitted in `body` are in scope in `continuing`.
    ///
    /// If present, `break_if` is an expression which is evaluated after the
    /// continuing block. Expressions emitted in `body` or `continuing` are
    /// considered to be in scope. If the expression's value is true, control
    /// continues after the `Loop` statement, rather than branching back to the
    /// top of body as usual. The `break_if` expression corresponds to a "break
    /// if" statement in WGSL, or a loop whose back edge is an
    /// `OpBranchConditional` instruction in SPIR-V.
    ///
    /// rglsl IR does not have "phi" instructions. If you need to use
    /// values computed in a `body` or `continuing` block after the
    /// `Loop`, store them in a [`LocalVariable`].
    ///
    /// [`Break`]: Statement::Break
    /// [`Continue`]: Statement::Continue
    /// [`Kill`]: Statement::Kill
    /// [`Return`]: Statement::Return
    /// [`break if`]: Self::Loop::break_if
    Loop {
        body: Block,
        continuing: Block,
        break_if: Option<Handle<Expression>>,
        #[cfg_attr(feature = "deserialize", serde(default))]
        #[cfg_attr(
            feature = "serialize",
            serde(skip_serializing_if = "LoopControl::is_default")
        )]
        control: LoopControl,
    },

    /// Exits the innermost enclosing [`Loop`] or [`Switch`].
    ///
    /// A `Break` statement may only appear within a [`Loop`] or [`Switch`]
    /// statement. It may not break out of a [`Loop`] from within the loop's
    /// `continuing` block.
    ///
    /// [`Loop`]: Statement::Loop
    /// [`Switch`]: Statement::Switch
    Break,

    /// Skips to the `continuing` block of the innermost enclosing [`Loop`].
    ///
    /// A `Continue` statement may only appear within the `body` block of the
    /// innermost enclosing [`Loop`] statement. It must not appear within that
    /// loop's `continuing` block.
    ///
    /// [`Loop`]: Statement::Loop
    Continue,

    /// Returns from the function (possibly with a value).
    ///
    /// `Return` statements are forbidden within the `continuing` block of a
    /// [`Loop`] statement.
    ///
    /// [`Loop`]: Statement::Loop
    Return {
        value: Option<Handle<Expression>>,
    },

    /// Aborts the current shader execution.
    ///
    /// `Kill` statements are forbidden within the `continuing` block of a
    /// [`Loop`] statement.
    ///
    /// [`Loop`]: Statement::Loop
    Kill,

    Demote,

    BeginInvocationInterlock,

    EndInvocationInterlock,

    EmitVertex {
        stream: Option<u32>,
    },

    EndPrimitive {
        stream: Option<u32>,
    },

    /// Synchronize invocations within the work group.
    /// The `Barrier` flags control which memory accesses should be synchronized.
    /// If empty, this becomes purely an execution barrier.
    ControlBarrier(Barrier),

    /// Synchronize invocations within the work group.
    /// The `Barrier` flags control which memory accesses should be synchronized.
    MemoryBarrier(Barrier),

    ScopedBarrier {
        execution: Option<MemoryScope>,
        memory: MemoryScope,
        semantics: MemorySemantics,
    },

    SplitBarrier {
        phase: BarrierPhase,
        execution: MemoryScope,
        memory: MemoryScope,
        semantics: MemorySemantics,
    },

    /// Stores a value at an address.
    ///
    /// For [`TypeInner::Atomic`] type behind the pointer, the value
    /// has to be a corresponding scalar.
    /// For other types behind the `pointer<T>`, the value is `T`.
    ///
    /// This statement is a barrier for any operations on the
    /// `Expression::LocalVariable` or `Expression::GlobalVariable`
    /// that is the destination of an access chain, started
    /// from the `pointer`.
    Store {
        pointer: Handle<Expression>,
        value: Handle<Expression>,
    },
    /// Stores a texel value to an image.
    ///
    /// The `image`, `coordinate`, and `array_index` fields have the same
    /// meanings as the corresponding operands of an [`ImageLoad`] expression;
    /// see that documentation for details. Storing into images with mipmaps is
    /// not supported, so there is no `level` operand; `sample` is required for
    /// multisampled images and forbidden otherwise.
    ///
    /// This statement is a barrier for any operations on the corresponding
    /// [`Expression::GlobalVariable`] for this image.
    ///
    /// [`ImageLoad`]: Expression::ImageLoad
    ImageStore {
        image: Handle<Expression>,
        coordinate: Handle<Expression>,
        array_index: Option<Handle<Expression>>,
        #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
        #[cfg_attr(feature = "deserialize", serde(default))]
        sample: Option<Handle<Expression>>,
        value: Handle<Expression>,
    },
    /// Atomic function.
    Atomic {
        /// Pointer to an atomic value.
        ///
        /// This must be a [`Pointer`] to an [`Atomic`] value. The atomic's
        /// scalar type may be [`I32`] or [`U32`].
        ///
        /// If [`SHADER_INT64_ATOMIC_MIN_MAX`] or [`SHADER_INT64_ATOMIC_ALL_OPS`] are
        /// enabled, this may also be [`I64`] or [`U64`].
        ///
        /// If [`SHADER_FLOAT32_ATOMIC`] is enabled, this may be [`F32`].
        ///
        /// [`Pointer`]: TypeInner::Pointer
        /// [`Atomic`]: TypeInner::Atomic
        /// [`I32`]: Scalar::I32
        /// [`U32`]: Scalar::U32
        /// [`SHADER_INT64_ATOMIC_MIN_MAX`]: crate::valid::Capabilities::SHADER_INT64_ATOMIC_MIN_MAX
        /// [`SHADER_INT64_ATOMIC_ALL_OPS`]: crate::valid::Capabilities::SHADER_INT64_ATOMIC_ALL_OPS
        /// [`SHADER_FLOAT32_ATOMIC`]: crate::valid::Capabilities::SHADER_FLOAT32_ATOMIC
        /// [`I64`]: Scalar::I64
        /// [`U64`]: Scalar::U64
        /// [`F32`]: Scalar::F32
        pointer: Handle<Expression>,

        /// Function to run on the atomic value.
        ///
        /// If [`pointer`] refers to a 64-bit atomic value, then:
        ///
        /// - The [`SHADER_INT64_ATOMIC_ALL_OPS`] capability allows any [`AtomicFunction`]
        ///   value here.
        ///
        /// - The [`SHADER_INT64_ATOMIC_MIN_MAX`] capability allows
        ///   [`AtomicFunction::Min`] and [`AtomicFunction::Max`]
        ///   in the [`Storage`] address space here.
        ///
        /// - If neither of those capabilities are present, then 64-bit scalar
        ///   atomics are not allowed.
        ///
        /// If [`pointer`] refers to a 32-bit floating-point atomic value, then:
        ///
        /// - The [`SHADER_FLOAT32_ATOMIC`] capability allows [`AtomicFunction::Add`],
        ///   [`AtomicFunction::Subtract`], and [`AtomicFunction::Exchange { compare: None }`]
        ///   in the [`Storage`] address space here.
        ///
        /// [`AtomicFunction::Exchange { compare: None }`]: AtomicFunction::Exchange
        /// [`pointer`]: Statement::Atomic::pointer
        /// [`Storage`]: AddressSpace::Storage
        /// [`SHADER_INT64_ATOMIC_MIN_MAX`]: crate::valid::Capabilities::SHADER_INT64_ATOMIC_MIN_MAX
        /// [`SHADER_INT64_ATOMIC_ALL_OPS`]: crate::valid::Capabilities::SHADER_INT64_ATOMIC_ALL_OPS
        /// [`SHADER_FLOAT32_ATOMIC`]: crate::valid::Capabilities::SHADER_FLOAT32_ATOMIC
        fun: AtomicFunction,

        /// Value to use in the function.
        ///
        /// This must be a scalar of the same type as [`pointer`]'s atomic's scalar type.
        ///
        /// [`pointer`]: Statement::Atomic::pointer
        value: Handle<Expression>,

        /// [`AtomicResult`] expression representing this function's result.
        ///
        /// If [`fun`] is [`Exchange { compare: None }`], this must be `Some`,
        /// as otherwise that operation would be equivalent to a simple [`Store`]
        /// to the atomic.
        ///
        /// Otherwise, this may be `None` if the return value of the operation is not needed.
        ///
        /// If `pointer` refers to a 64-bit atomic value, [`SHADER_INT64_ATOMIC_MIN_MAX`]
        /// is enabled, and [`SHADER_INT64_ATOMIC_ALL_OPS`] is not, this must be `None`.
        ///
        /// [`AtomicResult`]: crate::Expression::AtomicResult
        /// [`fun`]: Statement::Atomic::fun
        /// [`Store`]: Statement::Store
        /// [`Exchange { compare: None }`]: AtomicFunction::Exchange
        /// [`SHADER_INT64_ATOMIC_MIN_MAX`]: crate::valid::Capabilities::SHADER_INT64_ATOMIC_MIN_MAX
        /// [`SHADER_INT64_ATOMIC_ALL_OPS`]: crate::valid::Capabilities::SHADER_INT64_ATOMIC_ALL_OPS
        result: Option<Handle<Expression>>,

        #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
        #[cfg_attr(feature = "deserialize", serde(default))]
        order: Option<MemoryOrder>,
    },
    AtomicLoad {
        location: AtomicLocation,
        order: MemoryOrder,
        result: Handle<Expression>,
    },
    AtomicStore {
        location: AtomicLocation,
        value: Handle<Expression>,
        order: MemoryOrder,
    },
    /// Performs an atomic operation on a texel value of an image.
    ///
    /// Doing atomics on images with mipmaps is not supported, so there is no
    /// `level` operand.
    ImageAtomic {
        /// The image to perform an atomic operation on. This must have type
        /// [`Image`]. (This will necessarily be a [`GlobalVariable`] or
        /// [`FunctionArgument`] expression, since no other expressions are
        /// allowed to have that type.)
        ///
        /// [`Image`]: TypeInner::Image
        /// [`GlobalVariable`]: Expression::GlobalVariable
        /// [`FunctionArgument`]: Expression::FunctionArgument
        image: Handle<Expression>,

        /// The coordinate of the texel we wish to load. This must be a scalar
        /// for [`D1`] images, a [`Bi`] vector for [`D2`] images, and a [`Tri`]
        /// vector for [`D3`] images. (Array indices, sample indices, and
        /// explicit level-of-detail values are supplied separately.) Its
        /// component type must be [`Sint`].
        ///
        /// [`D1`]: ImageDimension::D1
        /// [`D2`]: ImageDimension::D2
        /// [`D3`]: ImageDimension::D3
        /// [`Bi`]: VectorSize::Bi
        /// [`Tri`]: VectorSize::Tri
        /// [`Sint`]: ScalarKind::Sint
        coordinate: Handle<Expression>,

        /// The index into an arrayed image. If the [`arrayed`] flag in
        /// `image`'s type is `true`, then this must be `Some(expr)`, where
        /// `expr` is a [`Sint`] scalar. Otherwise, it must be `None`.
        ///
        /// [`arrayed`]: TypeInner::Image::arrayed
        /// [`Sint`]: ScalarKind::Sint
        array_index: Option<Handle<Expression>>,

        /// The kind of atomic operation to perform on the texel.
        fun: AtomicFunction,

        /// The value with which to perform the atomic operation.
        value: Handle<Expression>,

        #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
        #[cfg_attr(feature = "deserialize", serde(default))]
        sample: Option<Handle<Expression>>,

        #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
        #[cfg_attr(feature = "deserialize", serde(default))]
        result: Option<Handle<Expression>>,

        #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
        #[cfg_attr(feature = "deserialize", serde(default))]
        order: Option<MemoryOrder>,
    },
    /// Load uniformly from a uniform pointer in the workgroup address space.
    ///
    /// Corresponds to the [`workgroupUniformLoad`](https://www.w3.org/TR/WGSL/#workgroupUniformLoad-builtin)
    /// built-in function of wgsl, and has the same barrier semantics
    WorkGroupUniformLoad {
        /// This must be of type [`Pointer`] in the [`WorkGroup`] address space
        ///
        /// [`Pointer`]: TypeInner::Pointer
        /// [`WorkGroup`]: AddressSpace::WorkGroup
        pointer: Handle<Expression>,
        /// The [`WorkGroupUniformLoadResult`] expression representing this load's result.
        ///
        /// [`WorkGroupUniformLoadResult`]: Expression::WorkGroupUniformLoadResult
        result: Handle<Expression>,
    },
    /// Calls a function.
    ///
    /// If the `result` is `Some`, the corresponding expression has to be
    /// `Expression::CallResult`, and this statement serves as a barrier for any
    /// operations on that expression.
    Call {
        function: Handle<Function>,
        arguments: Vec<Handle<Expression>>,
        result: Option<Handle<Expression>>,
    },
    RayQuery {
        /// The [`RayQuery`] object this statement operates on.
        ///
        /// [`RayQuery`]: TypeInner::RayQuery
        query: Handle<Expression>,

        /// The specific operation we're performing on `query`.
        fun: RayQueryFunction,
    },
    /// A ray tracing pipeline shader intrinsic.
    RayPipelineFunction(RayPipelineFunction),
    HitObject {
        object: Handle<Expression>,
        fun: HitObjectFunction,
    },
    ReorderThread {
        kind: HitObjectKind,
        hint: Handle<Expression>,
        bits: Handle<Expression>,
    },
    MeshFunction(MeshFunction),
    /// Calculate a bitmask using a boolean from each active thread in the subgroup
    SubgroupBallot {
        /// The [`SubgroupBallotResult`] expression representing this load's result.
        ///
        /// [`SubgroupBallotResult`]: Expression::SubgroupBallotResult
        result: Handle<Expression>,
        /// The value from this thread to store in the ballot
        predicate: Option<Handle<Expression>>,
    },
    /// Gather a value from another active thread in the subgroup
    SubgroupGather {
        /// Specifies which thread to gather from
        mode: GatherMode,
        /// The value to broadcast over
        argument: Handle<Expression>,
        /// The [`SubgroupOperationResult`] expression representing this load's result.
        ///
        /// [`SubgroupOperationResult`]: Expression::SubgroupOperationResult
        result: Handle<Expression>,
    },
    /// Compute a collective operation across all active threads in the subgroup
    SubgroupCollectiveOperation {
        /// What operation to compute
        op: SubgroupOperation,
        /// How to combine the results
        collective_op: CollectiveOperation,
        /// The value to compute over
        argument: Handle<Expression>,
        /// The [`SubgroupOperationResult`] expression representing this load's result.
        ///
        /// [`SubgroupOperationResult`]: Expression::SubgroupOperationResult
        result: Handle<Expression>,
    },
    SubgroupFunction {
        fun: SubgroupFunction,
        result: Handle<Expression>,
    },
    /// Store a cooperative primitive into memory.
    CooperativeStore {
        target: Handle<Expression>,
        data: CooperativeData,
    },
    DebugPrintf {
        format: String,
        arguments: Vec<DebugPrintfArgument>,
    },
    Assume {
        condition: Handle<Expression>,
    },
    CooperativeVector(CooperativeVectorFunction),
    CooperativeMatrix {
        function: CooperativeMatrixFunction,
        result: Option<Handle<Expression>>,
    },
    Abort {
        message: String,
        ty: Handle<Type>,
        arguments: Vec<Handle<Expression>>,
    },
    TensorWrite {
        tensor: Handle<Expression>,
        coordinates: Handle<Expression>,
        value: Handle<Expression>,
        nontemporal: bool,
    },
    SpirvInstruction {
        instruction: SpirvInstruction,
        operands: Vec<SpirvOperand>,
        result: Option<Handle<Expression>>,
    },
}

#[derive(Clone, Debug)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum DebugPrintfArgument {
    Value(Handle<Expression>),
    String(String),
}

/// A function argument.
#[derive(Clone, Debug)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct FunctionArgument {
    /// Name of the argument, if any.
    pub name: Option<String>,
    /// Type of the argument.
    pub ty: Handle<Type>,
    /// For entry points, an argument has to have a binding
    /// unless it's a structure.
    pub binding: Option<Binding>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub relaxed_precision: bool,
}

/// A function result.
#[derive(Clone, Debug)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct FunctionResult {
    /// Type of the result.
    pub ty: Handle<Type>,
    /// For entry points, the result has to have a binding
    /// unless it's a structure.
    pub binding: Option<Binding>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub relaxed_precision: bool,
}

bitflags::bitflags! {
    #[cfg_attr(feature = "serialize", derive(Serialize))]
    #[cfg_attr(feature = "deserialize", derive(Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
    #[derive(Clone, Copy, Debug, Default, Eq, Hash, Ord, PartialEq, PartialOrd)]
    pub struct NonUniform: u8 {
        const VALUE = 1 << 0;
        const ACCESS = 1 << 1;
        const SAMPLED_IMAGE = 1 << 2;
    }
}

bitflags::bitflags! {
    #[cfg_attr(feature = "serialize", derive(Serialize))]
    #[cfg_attr(feature = "deserialize", derive(Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
    #[derive(Clone, Copy, Debug, Default, Eq, Hash, Ord, PartialEq, PartialOrd)]
    pub struct Precision: u8 {
        const RELAXED = 1 << 0;
        const NO_CONTRACTION = 1 << 1;
    }
}

/// A function defined in the module.
#[derive(Debug, Default, Clone)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct Function {
    /// Name of the function, if any.
    pub name: Option<String>,
    /// Information about function argument.
    pub arguments: Vec<FunctionArgument>,
    /// The result of this function, if any.
    pub result: Option<FunctionResult>,
    /// Local variables defined and used in the function.
    pub local_variables: Arena<LocalVariable>,
    /// Expressions used inside this function.
    ///
    /// Unless explicitly stated otherwise, if an [`Expression`] is in this
    /// arena, then its subexpressions are in this arena too. In other words,
    /// every `Handle<Expression>` in this arena refers to an [`Expression`] in
    /// this arena too.
    ///
    /// The main ways this arena refers to [`Module::global_expressions`] are:
    ///
    /// - [`Constant`], [`Override`], and [`GlobalVariable`] expressions hold
    ///   handles for their respective types, whose initializer expressions are
    ///   in [`Module::global_expressions`].
    ///
    /// - Various expressions hold [`Type`] handles, and [`Type`]s may refer to
    ///   global expressions, for things like array lengths.
    ///
    /// An [`Expression`] must occur before all other [`Expression`]s that use
    /// its value.
    ///
    /// [`Constant`]: Expression::Constant
    /// [`Override`]: Expression::Override
    /// [`GlobalVariable`]: Expression::GlobalVariable
    pub expressions: Arena<Expression>,
    /// Map of expressions that have associated variable names
    pub named_expressions: NamedExpressions,
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "NonUniformExpressions::is_empty")
    )]
    pub non_uniform: NonUniformExpressions,
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "PrecisionExpressions::is_empty")
    )]
    pub precision: PrecisionExpressions,
    /// Block of instructions comprising the body of the function.
    pub body: Block,
    /// The leaf of all diagnostic filter rules tree (stored in [`Module::diagnostic_filters`])
    /// parsed on this function.
    ///
    /// In WGSL, this corresponds to `@diagnostic(…)` attributes.
    ///
    /// See [`DiagnosticFilterNode`] for details on how the tree is represented and used in
    /// validation.
    pub diagnostic_filter_leaf: Option<Handle<DiagnosticFilterNode>>,
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "Linkage::is_definition")
    )]
    pub linkage: Linkage,
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "FunctionControl::is_none")
    )]
    pub control: FunctionControl,
}

#[derive(Clone, Copy, Debug, Default, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum FunctionControl {
    #[default]
    None,
    Inline,
    DontInline,
}

impl FunctionControl {
    pub const fn is_none(&self) -> bool {
        matches!(*self, Self::None)
    }
}

#[derive(Clone, Copy, Debug, Default, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum Linkage {
    #[default]
    Definition,
    Import,
}

impl Linkage {
    pub const fn is_definition(&self) -> bool {
        matches!(*self, Self::Definition)
    }

    pub const fn is_import(&self) -> bool {
        matches!(*self, Self::Import)
    }
}

/// The main function for a pipeline stage.
///
/// An [`EntryPoint`] is a [`Function`] that serves as the main function for a
/// graphics or compute pipeline stage. For example, an `EntryPoint` whose
/// [`stage`] is [`ShaderStage::Vertex`] can serve as a graphics pipeline's
/// vertex shader.
///
/// Since an entry point is called directly by the graphics or compute pipeline,
/// not by other WGSL functions, you must specify what the pipeline should pass
/// as the entry point's arguments, and what values it will return. For example,
/// a vertex shader needs a vertex's attributes as its arguments, but if it's
/// used for instanced draw calls, it will also want to know the instance id.
/// The vertex shader's return value will usually include an output vertex
/// position, and possibly other attributes to be interpolated and passed along
/// to a fragment shader.
///
/// To specify this, the arguments and result of an `EntryPoint`'s [`function`]
/// must each have a [`Binding`], or be structs whose members all have
/// `Binding`s. This associates every value passed to or returned from the entry
/// point with either a [`BuiltIn`] or a [`Location`]:
///
/// -   A [`BuiltIn`] has special semantics, usually specific to its pipeline
///     stage. For example, the result of a vertex shader can include a
///     [`BuiltIn::Position`] value, which determines the position of a vertex
///     of a rendered primitive. Or, a compute shader might take an argument
///     whose binding is [`BuiltIn::WorkGroupSize`], through which the compute
///     pipeline would pass the number of invocations in your workgroup.
///
/// -   A [`Location`] indicates user-defined IO to be passed from one pipeline
///     stage to the next. For example, a vertex shader might also produce a
///     `uv` texture location as a user-defined IO value.
///
/// In other words, the pipeline stage's input and output interface are
/// determined by the bindings of the arguments and result of the `EntryPoint`'s
/// [`function`].
///
/// [`Function`]: crate::Function
/// [`Location`]: Binding::Location
/// [`function`]: EntryPoint::function
/// [`stage`]: EntryPoint::stage
#[derive(Debug, Clone)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct EntryPoint {
    /// Name of this entry point, visible externally.
    ///
    /// Entry point names for a given `stage` must be distinct within a module.
    pub name: String,
    /// Shader stage.
    pub stage: ShaderStage,
    /// Early depth test for fragment stages.
    pub early_depth_test: Option<EarlyDepthTest>,
    /// Workgroup size for compute stages
    pub workgroup_size: [u32; 3],
    /// Override expressions for workgroup size in the global_expressions arena
    pub workgroup_size_overrides: Option<[Option<Handle<Expression>>; 3]>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub workgroup_size_builtin: bool,
    /// The entrance function.
    pub function: Function,
    /// Information for [`Mesh`] shaders.
    ///
    /// [`Mesh`]: ShaderStage::Mesh
    pub mesh_info: Option<MeshStageInfo>,
    /// The unique global variable used as a task payload from task shader to mesh shader
    pub task_payload: Option<Handle<GlobalVariable>>,
    /// The unique global variable used as an incoming ray payload going into any hit, closest hit and miss shaders.
    /// Unlike the outgoing ray payload, an incoming ray payload must be unique
    pub incoming_ray_payload: Option<Handle<GlobalVariable>>,
    /// The [`Input`] and [`Output`] variables that make up this entry point's
    /// interface, in declaration order.
    ///
    /// This includes variables the code does not use: they are still part of
    /// the interface the pipeline sees. An entry point whose inputs and
    /// outputs are all function arguments and results has an empty list.
    ///
    /// [`Input`]: AddressSpace::Input
    /// [`Output`]: AddressSpace::Output
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub interface: Vec<Handle<GlobalVariable>>,
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub transform_feedback: bool,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub opacity_micromap: Option<Handle<Expression>>,
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "QuadControl::is_default")
    )]
    pub quad_control: QuadControl,
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "FragmentModes::is_default")
    )]
    pub fragment_modes: FragmentModes,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub geometry: Option<GeometryInfo>,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub tessellation: Option<TessellationInfo>,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub mesh_shader: Option<MeshShaderInfo>,
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "TileShading::is_default")
    )]
    pub tile_shading: TileShading,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Vec::is_empty"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub spirv_execution_modes: Vec<SpirvExecutionMode>,
    #[cfg_attr(feature = "serialize", serde(skip_serializing_if = "Option::is_none"))]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub derivative_group: Option<DerivativeGroup>,
    #[cfg_attr(feature = "deserialize", serde(default))]
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "Reconvergence::is_default")
    )]
    pub reconvergence: Reconvergence,
}

#[derive(Clone, Copy, Debug, Default, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct Reconvergence {
    pub subgroup_uniform_control_flow: bool,
    pub maximally_reconverges: bool,
}

impl Reconvergence {
    pub const fn is_default(&self) -> bool {
        !self.subgroup_uniform_control_flow && !self.maximally_reconverges
    }
}

#[derive(Clone, Copy, Debug, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DerivativeGroup {
    pub shape: DerivativeGroupShape,
    pub extension: DerivativeGroupExtension,
}

#[derive(Clone, Copy, Debug, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum DerivativeGroupShape {
    Quads,
    Linear,
}

#[derive(Clone, Copy, Debug, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum DerivativeGroupExtension {
    Nv,
    Khr,
}

#[derive(Clone, Copy, Debug, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum LoopDependency {
    Infinite,
    Length(u32),
}

#[derive(Clone, Copy, Debug, Default, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum SelectionControl {
    #[default]
    None,
    Flatten,
    DontFlatten,
}

#[derive(Clone, Copy, Debug, Default, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct LoopControl {
    pub unroll: bool,
    pub dont_unroll: bool,
    pub dependency: Option<LoopDependency>,
    pub min_iterations: Option<u32>,
    pub max_iterations: Option<u32>,
    pub iteration_multiple: Option<u32>,
    pub peel_count: Option<u32>,
    pub partial_count: Option<u32>,
    pub multiple_wait_queues: Option<u32>,
}

#[derive(Clone, Copy, Debug, Default, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct TileShading {
    pub rate: Option<[u32; 3]>,
    pub non_coherent_attachment_read: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum MeshShaderExtension {
    Ext,
    Nv,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct MeshOutputLayout {
    pub topology: MeshOutputTopology,
    pub max_vertices: u32,
    pub max_primitives: u32,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct MeshShaderInfo {
    pub extension: MeshShaderExtension,
    pub output: Option<MeshOutputLayout>,
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub task_memory: Vec<Handle<GlobalVariable>>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum MeshFunction {
    SetMeshOutputs {
        vertex_count: Handle<Expression>,
        primitive_count: Handle<Expression>,
    },
    EmitMeshTasks {
        group_count: [Handle<Expression>; 3],
    },
    WritePackedPrimitiveIndices {
        index_offset: Handle<Expression>,
        packed_indices: Handle<Expression>,
    },
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct GeometryInfo {
    pub input: GeometryInputPrimitive,
    pub output: GeometryOutputPrimitive,
    pub max_vertices: u32,
    pub invocations: u32,
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub streams: Vec<(Handle<GlobalVariable>, u32)>,
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub passthrough: Vec<Handle<GlobalVariable>>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum GeometryInputPrimitive {
    Points,
    Lines,
    LinesAdjacency,
    Triangles,
    TrianglesAdjacency,
}

impl GeometryInputPrimitive {
    pub const fn vertices(self) -> u32 {
        match self {
            Self::Points => 1,
            Self::Lines => 2,
            Self::LinesAdjacency => 4,
            Self::Triangles => 3,
            Self::TrianglesAdjacency => 6,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum GeometryOutputPrimitive {
    Points,
    LineStrip,
    TriangleStrip,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Default)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct TessellationInfo {
    pub output_vertices: Option<u32>,
    pub primitive: Option<TessellationPrimitive>,
    pub spacing: Option<TessellationSpacing>,
    pub vertex_order: Option<TessellationVertexOrder>,
    pub point_mode: bool,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum TessellationPrimitive {
    Triangles,
    Quads,
    Isolines,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum TessellationSpacing {
    Equal,
    FractionalEven,
    FractionalOdd,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum TessellationVertexOrder {
    Cw,
    Ccw,
}

#[derive(Clone, Copy, Debug, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum InterlockScope {
    Pixel,
    Sample,
    ShadingRate,
}

#[derive(Clone, Copy, Debug, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct Interlock {
    pub scope: InterlockScope,
    pub ordered: bool,
}

#[derive(Clone, Copy, Debug, Default, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct FragmentModes {
    pub post_depth_coverage: bool,
    pub interlock: Option<Interlock>,
    pub non_coherent_color_attachment_read: bool,
    pub non_coherent_depth_attachment_read: bool,
    pub non_coherent_stencil_attachment_read: bool,
}

#[derive(Clone, Copy, Debug, Default, Hash, Eq, PartialEq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct QuadControl {
    pub quad_derivatives: bool,
    pub require_full_quads: bool,
}

/// Return types predeclared for the frexp, modf, and atomicCompareExchangeWeak built-in functions.
///
/// These cannot be spelled in WGSL source.
///
/// Stored in [`SpecialTypes::predeclared_types`] and created by [`Module::generate_predeclared_type`].
#[derive(Debug, PartialEq, Eq, Hash, Clone)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum PredeclaredType {
    AtomicCompareExchangeWeakResult(Scalar),
    ModfResult {
        size: Option<VectorSize>,
        scalar: Scalar,
    },
    FrexpResult {
        size: Option<VectorSize>,
        scalar: Scalar,
    },
    WideResult {
        size: Option<VectorSize>,
        scalar: Scalar,
    },
    F32Array {
        size: Option<VectorSize>,
        length: core::num::NonZeroU32,
    },
}

/// Set of special types that can be optionally generated by the frontends.
#[derive(Debug, Default, Clone)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct SpecialTypes {
    /// Type for `RayDesc`.
    ///
    /// Call [`Module::generate_ray_desc_type`] to populate this if
    /// needed and return the handle.
    pub ray_desc: Option<Handle<Type>>,

    /// Type for `RayIntersection`.
    ///
    /// Call [`Module::generate_ray_intersection_type`] to populate
    /// this if needed and return the handle.
    pub ray_intersection: Option<Handle<Type>>,

    /// Type for `RayVertexReturn`.
    ///
    /// Call [`Module::generate_vertex_return_type`]
    pub ray_vertex_return: Option<Handle<Type>>,

    /// Struct containing parameters required by some backends to emit code for
    /// [`ImageClass::External`] textures.
    ///
    /// See `wgpu_core::device::resource::ExternalTextureParams` for the
    /// documentation of each field.
    ///
    /// In WGSL, this type would be:
    ///
    /// ```ignore
    /// struct RglslExternalTextureParams {         // align size offset
    ///     yuv_conversion_matrix: mat4x4<f32>,    //    16   64      0
    ///     gamut_conversion_matrix: mat3x3<f32>,  //    16   48     64
    ///     src_tf: RglslExternalTextureTransferFn, //     4   16    112
    ///     dst_tf: RglslExternalTextureTransferFn, //     4   16    128
    ///     sample_transform: mat3x2<f32>,         //     8   24    144
    ///     load_transform: mat3x2<f32>,           //     8   24    168
    ///     size: vec2<u32>,                       //     8    8    192
    ///     num_planes: u32,                       //     4    4    200
    /// }                            // whole struct:    16  208
    /// ```
    ///
    /// Call [`Module::generate_external_texture_types`] to populate this if
    /// needed.
    pub external_texture_params: Option<Handle<Type>>,

    /// Struct describing a gamma encoding transfer function. Member of
    /// `RglslExternalTextureParams`, describing how the backend should perform
    /// color space conversion when sampling from [`ImageClass::External`]
    /// textures.
    ///
    /// In WGSL, this type would be:
    ///
    /// ```ignore
    /// struct RglslExternalTextureTransferFn { // align size offset
    ///     a: f32,                            //     4    4      0
    ///     b: f32,                            //     4    4      4
    ///     g: f32,                            //     4    4      8
    ///     k: f32,                            //     4    4     12
    /// }                         // whole struct:    4   16
    /// ```
    ///
    /// Call [`Module::generate_external_texture_types`] to populate this if
    /// needed.
    pub external_texture_transfer_function: Option<Handle<Type>>,

    /// Types for predeclared wgsl types instantiated on demand.
    ///
    /// Call [`Module::generate_predeclared_type`] to populate this if
    /// needed and return the handle.
    pub predeclared_types: FastIndexMap<PredeclaredType, Handle<Type>>,
}

bitflags::bitflags! {
    /// Ray flags used when casting rays.
    /// Matching vulkan constants can be found in
    /// https://github.com/KhronosGroup/SPIRV-Registry/blob/main/extensions/KHR/ray_common/ray_flags_section.txt
    #[cfg_attr(feature = "serialize", derive(Serialize))]
    #[cfg_attr(feature = "deserialize", derive(Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
    #[derive(Clone, Copy, Debug, Default, Eq, Hash, Ord, PartialEq, PartialOrd)]
    pub struct RayFlag: u32 {
        /// Force all intersections to be treated as opaque.
        const FORCE_OPAQUE = 0x1;
        /// Force all intersections to be treated as non-opaque.
        const FORCE_NO_OPAQUE = 0x2;
        /// Stop traversal after the first hit.
        const TERMINATE_ON_FIRST_HIT = 0x4;
        /// Don't execute the closest hit shader.
        const SKIP_CLOSEST_HIT_SHADER = 0x8;
        /// Cull back facing geometry.
        const CULL_BACK_FACING = 0x10;
        /// Cull front facing geometry.
        const CULL_FRONT_FACING = 0x20;
        /// Cull opaque geometry.
        const CULL_OPAQUE = 0x40;
        /// Cull non-opaque geometry.
        const CULL_NO_OPAQUE = 0x80;
        /// Skip triangular geometry.
        const SKIP_TRIANGLES = 0x100;
        /// Skip axis-aligned bounding boxes.
        const SKIP_AABBS = 0x200;
    }
}

/// Doc comments preceding items.
///
/// These can be used to generate automated documentation,
/// IDE hover information or translate shaders with their context comments.
#[derive(Debug, Default, Clone)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DocComments {
    pub types: FastIndexMap<Handle<Type>, Vec<String>>,
    // The key is:
    // - key.0: the handle to the Struct
    // - key.1: the index of the `StructMember`.
    pub struct_members: FastIndexMap<(Handle<Type>, usize), Vec<String>>,
    pub entry_points: FastIndexMap<usize, Vec<String>>,
    pub functions: FastIndexMap<Handle<Function>, Vec<String>>,
    pub constants: FastIndexMap<Handle<Constant>, Vec<String>>,
    pub global_variables: FastIndexMap<Handle<GlobalVariable>, Vec<String>>,
    // Top level comments, appearing before any space.
    pub module: Vec<String>,
}

/// The output topology for a mesh shader. Note that mesh shaders don't allow things like triangle-strips.
#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum MeshOutputTopology {
    /// Outputs individual vertices to be rendered as points.
    Points,
    /// Outputs groups of 2 vertices to be renderedas lines .
    Lines,
    /// Outputs groups of 3 vertices to be rendered as triangles.
    Triangles,
}

/// Information specific to mesh shader entry points.
#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
#[allow(dead_code)]
pub struct MeshStageInfo {
    /// The type of primitive outputted.
    pub topology: MeshOutputTopology,
    /// The maximum number of vertices a mesh shader may output.
    pub max_vertices: u32,
    /// If pipeline constants are used, the expressions that override `max_vertices`
    pub max_vertices_override: Option<Handle<Expression>>,
    /// The maximum number of primitives a mesh shader may output.
    pub max_primitives: u32,
    /// If pipeline constants are used, the expressions that override `max_primitives`
    pub max_primitives_override: Option<Handle<Expression>>,
    /// The type used by vertex outputs, i.e. what is passed to `setVertex`.
    pub vertex_output_type: Handle<Type>,
    /// The type used by primitive outputs, i.e. what is passed to `setPrimitive`.
    pub primitive_output_type: Handle<Type>,
    /// The global variable holding the outputted vertices, primitives, and counts
    pub output_variable: Handle<GlobalVariable>,
}

/// Ray tracing pipeline intrinsics
#[derive(Debug, Clone, Copy)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum RayPipelineFunction {
    TraceRay {
        acceleration_structure: Handle<Expression>,
        flags: Handle<Expression>,
        cull_mask: Handle<Expression>,
        sbt_offset: Handle<Expression>,
        sbt_stride: Handle<Expression>,
        miss_index: Handle<Expression>,
        origin: Handle<Expression>,
        tmin: Handle<Expression>,
        direction: Handle<Expression>,
        tmax: Handle<Expression>,
        time: Option<Handle<Expression>>,
        payload: RayTracingData,
    },
    ExecuteCallable {
        sbt_index: Handle<Expression>,
        data: RayTracingData,
    },
    ReportIntersection {
        hit_t: Handle<Expression>,
        hit_kind: Handle<Expression>,
        result: Handle<Expression>,
    },
    IgnoreIntersection {
        nv: bool,
    },
    TerminateRay {
        nv: bool,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum RayTracingData {
    Pointer(Handle<Expression>),
    Location(u32),
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum RayQueryValue {
    RayFlags,
    RayTMin,
    WorldRayOrigin,
    WorldRayDirection,
    CandidateAabbOpaque,
    Intersection {
        committed: bool,
        value: RayQueryIntersectionValue,
    },
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum RayQueryIntersectionValue {
    Type,
    T,
    InstanceCustomIndex,
    InstanceId,
    InstanceShaderBindingTableRecordOffset,
    GeometryIndex,
    PrimitiveIndex,
    Barycentrics,
    FrontFace,
    ObjectRayDirection,
    ObjectRayOrigin,
    ObjectToWorld,
    WorldToObject,
    TriangleVertexPositions,
    ClusterId,
    SpherePosition,
    SphereRadius,
    LssPositions,
    LssRadii,
    LssHitValue,
    IsSphereHit,
    IsLssHit,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, PartialOrd, Ord)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum HitObjectKind {
    Nv,
    Ext,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum HitObjectValue {
    IsEmpty,
    IsHit,
    IsMiss,
    RayTMin,
    RayTMax,
    RayFlags,
    WorldRayOrigin,
    WorldRayDirection,
    ObjectRayOrigin,
    ObjectRayDirection,
    ObjectToWorld,
    WorldToObject,
    InstanceCustomIndex,
    InstanceId,
    GeometryIndex,
    PrimitiveIndex,
    HitKind,
    CurrentTime,
    ShaderBindingTableRecordIndex,
    ShaderRecordBufferHandle,
    ClusterId,
    SpherePosition,
    SphereRadius,
    LssPositions,
    LssRadii,
    IsSphereHit,
    IsLssHit,
    TriangleVertexPositions,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum MicroTriangleVertexValue {
    Position,
    Barycentric,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct ReorderHint {
    pub hint: Handle<Expression>,
    pub bits: Handle<Expression>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct HitObjectTrace {
    pub acceleration_structure: Handle<Expression>,
    pub flags: Handle<Expression>,
    pub cull_mask: Handle<Expression>,
    pub sbt_offset: Handle<Expression>,
    pub sbt_stride: Handle<Expression>,
    pub miss_index: Handle<Expression>,
    pub origin: Handle<Expression>,
    pub tmin: Handle<Expression>,
    pub direction: Handle<Expression>,
    pub tmax: Handle<Expression>,
    pub time: Option<Handle<Expression>>,
    pub payload: Handle<Expression>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum HitObjectSbtRecord {
    OffsetStride {
        offset: Handle<Expression>,
        stride: Handle<Expression>,
    },
    Index(Handle<Expression>),
}

#[derive(Debug, Clone, Copy)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub enum HitObjectFunction {
    TraceRay(HitObjectTrace),
    TraceReorderExecute {
        trace: HitObjectTrace,
        hint: Option<ReorderHint>,
    },
    RecordHit {
        acceleration_structure: Handle<Expression>,
        instance_id: Handle<Expression>,
        primitive_id: Handle<Expression>,
        geometry_index: Handle<Expression>,
        hit_kind: Handle<Expression>,
        sbt_record: HitObjectSbtRecord,
        origin: Handle<Expression>,
        tmin: Handle<Expression>,
        direction: Handle<Expression>,
        tmax: Handle<Expression>,
        time: Option<Handle<Expression>>,
        attributes: Handle<Expression>,
    },
    RecordMiss {
        flags: Option<Handle<Expression>>,
        miss_index: Handle<Expression>,
        origin: Handle<Expression>,
        tmin: Handle<Expression>,
        direction: Handle<Expression>,
        tmax: Handle<Expression>,
        time: Option<Handle<Expression>>,
    },
    RecordEmpty,
    RecordFromQuery {
        query: Handle<Expression>,
        sbt_record_index: Handle<Expression>,
        attributes: Handle<Expression>,
        hit_kind: Option<Handle<Expression>>,
    },
    ExecuteShader {
        payload: Handle<Expression>,
    },
    ReorderExecute {
        payload: Handle<Expression>,
        hint: Option<ReorderHint>,
    },
    GetAttributes {
        attributes: Handle<Expression>,
    },
    SetShaderBindingTableRecordIndex {
        index: Handle<Expression>,
    },
    ReorderThread {
        hint: Option<ReorderHint>,
    },
}

bitflags::bitflags! {
    #[cfg_attr(feature = "serialize", derive(Serialize))]
    #[cfg_attr(feature = "deserialize", derive(Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
    #[derive(Clone, Copy, Debug, Default, Eq, Hash, Ord, PartialEq, PartialOrd)]
    pub struct RayTracingFeatures: u8 {
        const NV = 1;
        const PAYLOAD_LOCATIONS = 1 << 1;
        const CULL_MASK = 1 << 2;
        const POSITION_FETCH = 1 << 3;
        const PRIMITIVE_CULLING = 1 << 4;
        const OPACITY_MICROMAP = 1 << 5;
    }
}

/// Shader module.
///
/// A module is a set of constants, global variables and functions, as well as
/// the types required to define them.
///
/// Some functions are marked as entry points, to be used in a certain shader stage.
///
/// To create a new module, use the `Default` implementation.
/// Alternatively, you can load an existing shader using one of the [available front ends].
///
/// When finished, you can export modules using one of the [available backends].
///
/// ## Module arenas
///
/// Most module contents are stored in [`Arena`]s. In a valid module, arena
/// elements only refer to prior arena elements. That is, whenever an element in
/// some `Arena<T>` contains a `Handle<T>` referring to another element the same
/// arena, the handle's referent always precedes the element containing the
/// handle.
///
/// The elements of [`Module::types`] may refer to [`Expression`]s in
/// [`Module::global_expressions`], and those expressions may in turn refer back
/// to [`Type`]s in [`Module::types`]. In a valid module, there exists an order
/// in which all types and global expressions can be visited such that:
///
/// - types and expressions are visited in the order in which they appear in
///   their arenas, and
///
/// - every element refers only to previously visited elements.
///
/// This implies that the graph of types and global expressions is acyclic.
/// (However, it is a stronger condition: there are cycle-free arrangements of
/// types and expressions for which an order like the one described above does
/// not exist. Modules arranged in such a way are not valid.)
///
/// [available front ends]: crate::front
/// [available backends]: crate::back
#[derive(Debug, Default, Clone)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct Module {
    /// Arena for the types defined in this module.
    ///
    /// See the [`Module`] docs for more details about this field.
    pub types: UniqueArena<Type>,
    /// Dictionary of special type handles.
    pub special_types: SpecialTypes,
    /// Arena for the constants defined in this module.
    pub constants: Arena<Constant>,
    /// Arena for the pipeline-overridable constants defined in this module.
    pub overrides: Arena<Override>,
    /// Arena for the global variables defined in this module.
    pub global_variables: Arena<GlobalVariable>,
    /// [Constant expressions] and [override expressions] used by this module.
    ///
    /// If an expression is in this arena, then its subexpressions are in this
    /// arena too. In other words, every `Handle<Expression>` in this arena
    /// refers to an [`Expression`] in this arena too.
    ///
    /// See the [`Module`] docs for more details about this field.
    ///
    /// [Constant expressions]: index.html#constant-expressions
    /// [override expressions]: index.html#override-expressions
    pub global_expressions: Arena<Expression>,
    /// Arena for the functions defined in this module.
    ///
    /// Each function must appear in this arena strictly before all its callers.
    /// Recursion is not supported.
    pub functions: Arena<Function>,
    /// Entry points.
    pub entry_points: Vec<EntryPoint>,
    /// Arena for all diagnostic filter rules parsed in this module, including those in functions
    /// and statements.
    ///
    /// This arena contains elements of a _tree_ of diagnostic filter rules. When nodes are built
    /// by a front-end, they refer to a parent scope
    pub diagnostic_filters: Arena<DiagnosticFilterNode>,
    /// The leaf of all diagnostic filter rules tree parsed from directives in this module.
    ///
    /// In WGSL, this corresponds to `diagnostic(…);` directives.
    ///
    /// See [`DiagnosticFilterNode`] for details on how the tree is represented and used in
    /// validation.
    pub diagnostic_filter_leaf: Option<Handle<DiagnosticFilterNode>>,
    /// Doc comments.
    pub doc_comments: Option<Box<DocComments>>,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub vulkan_memory_model: bool,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub descriptor_heap: bool,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "core::ops::Not::not")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub shader_64bit_indexing: bool,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "RayTracingFeatures::is_empty")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub ray_tracing: RayTracingFeatures,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "SpirvRequirements::is_empty")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub spirv_requirements: SpirvRequirements,
    #[cfg_attr(
        feature = "serialize",
        serde(skip_serializing_if = "Option::is_none")
    )]
    #[cfg_attr(feature = "deserialize", serde(default))]
    pub debug_info: Option<Box<DebugInfo>>,
}
