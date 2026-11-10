use alloc::vec::Vec;

use bit_set::BitSet;

use super::{
    analyzer::{FunctionInfo, GlobalUse},
    Capabilities, Disalignment, FunctionError, ImmediateError, ModuleInfo,
};
use crate::arena::{Handle, UniqueArena};
use crate::span::{AddSpan as _, MapErrWithSpan as _, SpanProvider as _, WithSpan};

const MAX_WORKGROUP_SIZE: u32 = 0x4000;

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq))]
pub enum GlobalVariableError {
    #[error("Usage isn't compatible with address space {0:?}")]
    InvalidUsage(crate::AddressSpace),
    #[error("Type isn't compatible with address space {0:?}")]
    InvalidType(crate::AddressSpace),
    #[error("Type {0:?} isn't compatible with binding arrays")]
    InvalidBindingArray(Handle<crate::Type>),
    #[error("Type flags {seen:?} do not meet the required {required:?}")]
    MissingTypeFlags {
        required: super::TypeFlags,
        seen: super::TypeFlags,
    },
    #[error("Capability {0:?} is not supported")]
    UnsupportedCapability(Capabilities),
    #[error("Binding decoration is missing or not applicable")]
    InvalidBinding,
    #[error("Alignment requirements for address space {0:?} are not met by {1:?}")]
    Alignment(
        crate::AddressSpace,
        Handle<crate::Type>,
        #[source] Disalignment,
    ),
    #[error("Initializer must be an override-expression")]
    InitializerExprType,
    #[error("Initializer doesn't match the variable type")]
    InitializerType,
    #[error("Initializer can't be used with address space {0:?}")]
    InitializerNotAllowed(crate::AddressSpace),
    #[error("Type is not valid for use as a immediate data")]
    InvalidImmediateType(#[source] ImmediateError),
    #[error("Task payload must not be zero-sized")]
    ZeroSizedTaskPayload,
    #[error("Memory decorations (`@coherent`, `@volatile`) are only valid for variables in the `storage` address space")]
    InvalidMemoryDecorationsAddressSpace,
    #[error("`@coherent` requires the MEMORY_DECORATION_COHERENT capability")]
    CoherentNotSupported,
    #[error("`@volatile` requires the MEMORY_DECORATION_VOLATILE capability")]
    VolatileNotSupported,
    #[error("Transform feedback decorations are only valid for stage outputs")]
    InvalidTransformFeedback,
    #[error("An input attachment index is only valid for subpass inputs")]
    InvalidInputAttachmentIndex,
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq))]
pub enum VaryingError {
    #[error("The type {0:?} does not match the varying")]
    InvalidType(Handle<crate::Type>),
    #[error(
        "The type {0:?} cannot be used for user-defined entry point inputs or outputs. \
        Only numeric scalars and vectors are allowed."
    )]
    NotIOShareableType(Handle<crate::Type>),
    #[error("Interpolation {0:?} is only valid for stage {1:?}")]
    InvalidInterpolationInStage(crate::Interpolation, crate::ShaderStage),
    #[error("Cannot combine {interpolation:?} interpolation with the {sampling:?} sample type")]
    InvalidInterpolationSamplingCombination {
        interpolation: crate::Interpolation,
        sampling: crate::Sampling,
    },
    #[error("integer and double-precision fragment shader inputs must be qualified as `flat`")]
    InvalidInterpolationForInteger,
    #[error("Interpolation must be specified on vertex shader outputs and fragment shader inputs")]
    MissingInterpolation,
    #[error("Built-in {0:?} is not available at this stage")]
    InvalidBuiltInStage(crate::BuiltIn),
    #[error("Built-in type for {0:?} is invalid. Found {1:?}")]
    InvalidBuiltInType(crate::BuiltIn, crate::TypeInner),
    #[error("Entry point arguments and return values must all have bindings")]
    MissingBinding,
    #[error("Struct member {0} is missing a binding")]
    MemberMissingBinding(u32),
    #[error("Multiple bindings at location {location} are present")]
    BindingCollision { location: u32 },
    #[error("Location {location} is too large")]
    LocationTooLarge { location: u32 },
    #[error("Component {component} does not leave room for the value in its location")]
    InvalidComponent { component: u32 },
    #[error("Multiple bindings use the same `blend_src` {blend_src}")]
    BindingCollisionBlendSrc { blend_src: u32 },
    #[error("Built-in {0:?} is present more than once")]
    DuplicateBuiltIn(crate::BuiltIn),
    #[error("Capability {0:?} is not supported")]
    UnsupportedCapability(Capabilities),
    #[error("The attribute {0:?} is only valid as an output for stage {1:?}")]
    InvalidInputAttributeInStage(&'static str, crate::ShaderStage),
    #[error("The attribute {0:?} is not valid for stage {1:?}")]
    InvalidAttributeInStage(&'static str, crate::ShaderStage),
    #[error("`@blend_src` can only be used at location 0, indices 0 and 1. Found `@location({location}) @blend_src({blend_src})`.")]
    InvalidBlendSrcIndex { location: u32, blend_src: u32 },
    #[error(
        "`@blend_src` structure must specify two sources. \
        Found `@blend_src({present_blend_src})` but not `@blend_src({absent_blend_src})`.",
        absent_blend_src = if *present_blend_src == 0 { 1 } else { 0 },
    )]
    IncompleteBlendSrcUsage { present_blend_src: u32 },
    #[error("Structure using `@blend_src` may not specify `@location` on any other members. Found a binding at `@location({location})`.")]
    InvalidBlendSrcWithOtherBindings { location: u32 },
    #[error("Both `@blend_src` structure members must have the same type. `blend_src(0)` has type {blend_src_0_type:?} and `blend_src(1)` has type {blend_src_1_type:?}.")]
    BlendSrcOutputTypeMismatch {
        blend_src_0_type: Handle<crate::Type>,
        blend_src_1_type: Handle<crate::Type>,
    },
    #[error("`@blend_src` can only be used on struct members, not directly on entry point I/O")]
    BlendSrcNotOnStructMember,
    #[error("Workgroup size is multi dimensional, `@builtin(subgroup_id)` and `@builtin(subgroup_invocation_id)` are not supported.")]
    InvalidMultiDimensionalSubgroupBuiltIn,
    #[error("The `@per_primitive` attribute can only be used in fragment shader inputs or mesh shader primitive outputs")]
    InvalidPerPrimitive,
    #[error("Non-builtin members of a mesh primitive output struct must be decorated with `@per_primitive`")]
    MissingPerPrimitive,
    #[error("Per vertex fragment inputs must be an array of length 3.")]
    PerVertexNotArrayOfThree,
    #[error("Per vertex can only have Center sampling or no sampling modifier")]
    InvalidPerVertexSampling,
    #[error("A block cannot have both built-in and location members")]
    MixedBlockBindings,
    #[error("The members of an array of blocks cannot have locations of their own")]
    MemberLocationInBlockArray,
    #[error(
        "Member {member} of a block at location {block} is at location {found}, not {expected}"
    )]
    BlockMemberLocation {
        member: u32,
        block: u32,
        expected: u32,
        found: u32,
    },
    #[error("A block can only be bound to a location, without any other attribute")]
    InvalidBlockBinding,
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq))]
pub enum EntryPointError {
    #[error("Multiple conflicting entry points")]
    Conflict,
    #[error("Vertex shaders that return a value must return a position")]
    MissingVertexOutputPosition,
    #[error("Global variable {0:?} is used but is not in the entry point's interface")]
    NotInInterface(Handle<crate::GlobalVariable>),
    #[error("Global variable {0:?} is in the interface but is not an input or an output")]
    InterfaceNotInputOrOutput(Handle<crate::GlobalVariable>),
    #[error("Global variable {0:?} is listed twice in the interface")]
    InterfaceDuplicate(Handle<crate::GlobalVariable>),
    #[error("Interface variable {0:?} is invalid")]
    InterfaceVariable(Handle<crate::GlobalVariable>, #[source] VaryingError),
    #[error("Early depth test is not applicable")]
    UnexpectedEarlyDepthTest,
    #[error("Workgroup size is not applicable")]
    UnexpectedWorkgroupSize,
    #[error("Workgroup size is out of range")]
    OutOfRangeWorkgroupSize,
    #[error("Uses operations forbidden at this stage")]
    ForbiddenStageOperations,
    #[error("Global variable {0:?} is used incorrectly as {1:?}")]
    InvalidGlobalUsage(Handle<crate::GlobalVariable>, GlobalUse),
    #[error("More than 1 immediate data variable is used")]
    MoreThanOneImmediateUsed,
    #[error("Argument {0} varying error")]
    Argument(u32, #[source] VaryingError),
    #[error(transparent)]
    Result(#[from] VaryingError),
    #[error(transparent)]
    Function(#[from] FunctionError),
    #[error("Capability {0:?} is not supported")]
    UnsupportedCapability(Capabilities),

    #[error("mesh shader entry point missing mesh shader attributes")]
    ExpectedMeshShaderAttributes,
    #[error("Non mesh shader entry point cannot have mesh shader attributes")]
    UnexpectedMeshShaderAttributes,
    #[error("Non mesh/task shader entry point cannot have task payload attribute")]
    UnexpectedTaskPayload,
    #[error("Task payload must be declared with `var<task_payload>`")]
    TaskPayloadWrongAddressSpace,
    #[error("For a task payload to be used, it must be declared with @payload")]
    WrongTaskPayloadUsed,
    #[error("Task shader entry point must return @builtin(mesh_task_size) vec3<u32>")]
    WrongTaskShaderEntryResult,
    #[error("Task shaders must declare a task payload output")]
    ExpectedTaskPayload,
    #[error(
        "Mesh shader output variable must be a struct with fields that are all allowed builtins"
    )]
    BadMeshOutputVariableType,
    #[error("Mesh shader output variable fields must have types that are in accordance with the mesh shader spec")]
    BadMeshOutputVariableField,
    #[error("Mesh shader entry point cannot have a return type")]
    UnexpectedMeshShaderEntryResult,
    #[error(
        "Mesh output type must be a user-defined struct with fields in alignment with the mesh shader spec"
    )]
    InvalidMeshOutputType,
    #[error("Mesh primitive outputs must have exactly one of `@builtin(triangle_indices)`, `@builtin(line_indices)`, or `@builtin(point_index)`")]
    InvalidMeshPrimitiveOutputType,
    #[error("Mesh output global variable must live in the workgroup address space")]
    WrongMeshOutputAddressSpace,
    #[error("Task payload must be at least 4 bytes, but is {0} bytes")]
    TaskPayloadTooSmall(u32),
    #[error("Only the `ray_generation`, `closest_hit`, and `any_hit` shader stages can access a global variable in the `ray_payload` address space")]
    RayPayloadInInvalidStage(crate::ShaderStage),
    #[error("Only the `closest_hit`, `any_hit`, and `miss` shader stages can access a global variable in the `incoming_ray_payload` address space")]
    IncomingRayPayloadInInvalidStage(crate::ShaderStage),
}

fn storage_usage(access: crate::StorageAccess) -> GlobalUse {
    let mut storage_usage = GlobalUse::QUERY;
    if access.contains(crate::StorageAccess::LOAD) {
        storage_usage |= GlobalUse::READ;
    }
    if access.contains(crate::StorageAccess::STORE) {
        storage_usage |= GlobalUse::WRITE;
    }
    if access.contains(crate::StorageAccess::ATOMIC) {
        storage_usage |= GlobalUse::ATOMIC;
    }
    storage_usage
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
enum MeshOutputType {
    None,
    VertexOutput,
    PrimitiveOutput,
}

struct VaryingContext<'a> {
    stage: crate::ShaderStage,
    output: bool,
    types: &'a UniqueArena<crate::Type>,
    type_info: &'a Vec<super::r#type::TypeInfo>,
    location_mask: &'a mut BitSet,
    dual_source_blending: Option<&'a mut bool>,
    built_ins: &'a mut crate::FastHashSet<crate::BuiltIn>,
    capabilities: Capabilities,
    flags: super::ValidationFlags,
    mesh_output_type: MeshOutputType,
    has_task_payload: bool,
    /// The binding belongs to a global variable in the `Input` or `Output`
    /// address space rather than to an argument or a result. Such a variable
    /// may be a matrix, an array or a structure.
    interface: bool,
}

/// Locations are numbered below this. It is glslang's limit, and far above
/// what any implementation offers.
const MAX_LOCATIONS: u32 = 4096;

/// How a type occupies the locations it is bound to.
#[derive(Clone, Copy, Debug)]
struct LocationShape {
    /// The number of consecutive locations.
    locations: u32,
    /// The number of components used in each of those locations.
    components: u32,
    /// Some part of the value is floating-point.
    float: bool,
    /// Some part of the value is an integer or a double, which cannot be
    /// interpolated.
    non_interpolable: bool,
}

impl LocationShape {
    /// The locations a value of type `ty` occupies (GLSL 4.60, section 4.4.1),
    /// or `None` if the type cannot be a stage input or output.
    fn of(types: &UniqueArena<crate::Type>, ty: Handle<crate::Type>) -> Option<Self> {
        use crate::{ScalarKind as Sk, TypeInner as Ti, VectorSize as Vs};

        let scalar_shape = |scalar: crate::Scalar, size: u32| {
            let (float, non_interpolable) = match scalar.kind {
                Sk::Float => (true, scalar.width == 8),
                Sk::Sint | Sk::Uint => (false, true),
                Sk::Bool | Sk::AbstractInt | Sk::AbstractFloat => return None,
            };
            // A double takes two components, so a `dvec3` or `dvec4` spills
            // into a second location.
            let components = if scalar.width == 8 { size * 2 } else { size };
            Some(Self {
                locations: components.div_ceil(4),
                components: components.min(4),
                float,
                non_interpolable,
            })
        };

        match types[ty].inner {
            Ti::Scalar(scalar) => scalar_shape(scalar, 1),
            Ti::Vector { size, scalar } => scalar_shape(scalar, size as u32),
            Ti::Matrix {
                columns,
                rows,
                scalar,
            } => {
                let column = scalar_shape(scalar, rows as u32)?;
                // Each column starts a new location.
                let _: Vs = columns;
                Some(Self {
                    locations: column.locations * columns as u32,
                    components: 4,
                    ..column
                })
            }
            Ti::Array {
                base,
                size: crate::ArraySize::Constant(length),
                ..
            } => {
                let element = Self::of(types, base)?;
                Some(Self {
                    locations: element.locations.checked_mul(length.get())?,
                    ..element
                })
            }
            Ti::Array {
                base,
                size: crate::ArraySize::Pending(_),
                ..
            } => Self::of(types, base),
            Ti::Struct { ref members, .. } => {
                let mut shape = Self {
                    locations: 0,
                    components: 4,
                    float: false,
                    non_interpolable: false,
                };
                for member in members {
                    let member = Self::of(types, member.ty)?;
                    shape.locations = shape.locations.checked_add(member.locations)?;
                    shape.float |= member.float;
                    shape.non_interpolable |= member.non_interpolable;
                }
                (shape.locations > 0).then_some(shape)
            }
            _ => None,
        }
    }
}

/// Whether `ty` can hold an index built-in such as `VertexIndex`.
///
/// SPIR-V accepts a 32-bit integer of either signedness for these. WGSL
/// declares them as `u32`, GLSL as `int`.
const fn is_index_type(ty: &crate::TypeInner) -> bool {
    matches!(
        *ty,
        crate::TypeInner::Scalar(crate::Scalar::U32 | crate::Scalar::I32)
    )
}

impl VaryingContext<'_> {
    /// Marks `components` consecutive components of `location`, starting at
    /// `first`, as taken. Returns false if any of them already was.
    ///
    /// `index` is the blend source (GLSL `layout(index = N)`): the two blend
    /// sources of a fragment output share a location.
    fn claim_location(&mut self, location: u32, index: u32, first: u32, components: u32) -> bool {
        let base = (index as usize * MAX_LOCATIONS as usize + location as usize) * 4;
        let mut free = true;
        for component in first..first + components {
            free &= self.location_mask.insert(base + component as usize);
        }
        free
    }

    fn validate_impl(
        &mut self,
        ep: &crate::EntryPoint,
        ty: Handle<crate::Type>,
        binding: &crate::Binding,
    ) -> Result<(), VaryingError> {
        use crate::{BuiltIn as Bi, ShaderStage as St, TypeInner as Ti, VectorSize as Vs};

        let ty_inner = &self.types[ty].inner;
        match *binding {
            crate::Binding::BuiltIn(built_in) => {
                // Ignore the `invariant` field for the sake of duplicate checks,
                // but use the original in error messages.
                let canonical = match built_in {
                    crate::BuiltIn::Position { .. } => {
                        crate::BuiltIn::Position { invariant: false }
                    }
                    crate::BuiltIn::Barycentric { .. } => {
                        crate::BuiltIn::Barycentric { perspective: false }
                    }
                    x => x,
                };

                if self.built_ins.contains(&canonical) {
                    return Err(VaryingError::DuplicateBuiltIn(built_in));
                }
                self.built_ins.insert(canonical);

                let required = match built_in {
                    Bi::ClipDistances => Capabilities::CLIP_DISTANCES,
                    Bi::CullDistance => Capabilities::CULL_DISTANCE,
                    // Primitive index is allowed w/o any other extensions in any- and closest-hit shaders
                    Bi::PrimitiveIndex if !matches!(ep.stage, St::AnyHit | St::ClosestHit) => {
                        Capabilities::PRIMITIVE_INDEX
                    }
                    Bi::Barycentric { .. } => Capabilities::SHADER_BARYCENTRICS,
                    Bi::ViewIndex => Capabilities::MULTIVIEW,
                    Bi::SampleIndex => Capabilities::MULTISAMPLED_SHADING,
                    Bi::NumSubgroups
                    | Bi::SubgroupId
                    | Bi::SubgroupSize
                    | Bi::SubgroupInvocationId => Capabilities::SUBGROUP,
                    Bi::DrawIndex => Capabilities::DRAW_INDEX,
                    _ => Capabilities::empty(),
                };
                if !self.capabilities.contains(required) {
                    return Err(VaryingError::UnsupportedCapability(required));
                }

                if matches!(
                    built_in,
                    crate::BuiltIn::SubgroupId | crate::BuiltIn::SubgroupInvocationId
                ) && ep.workgroup_size[1..].iter().any(|&s| s > 1)
                {
                    return Err(VaryingError::InvalidMultiDimensionalSubgroupBuiltIn);
                }

                let (visible, type_good) = match built_in {
                    Bi::BaseInstance | Bi::BaseVertex | Bi::VertexIndex => (
                        self.stage == St::Vertex && !self.output,
                        is_index_type(ty_inner),
                    ),
                    Bi::InstanceIndex => (
                        matches!(self.stage, St::Vertex | St::AnyHit | St::ClosestHit)
                            && !self.output,
                        is_index_type(ty_inner),
                    ),
                    Bi::DrawIndex => (
                        // Always allowed in task/vertex stage. Allowed in mesh stage if there is no task stage in the pipeline.
                        (self.stage == St::Vertex
                            || self.stage == St::Task
                            || (self.stage == St::Mesh && !self.has_task_payload))
                            && !self.output,
                        is_index_type(ty_inner),
                    ),
                    Bi::ClipDistances | Bi::CullDistance => (
                        // Written by the stages before rasterization, and
                        // readable in the fragment stage.
                        ((self.stage == St::Vertex || self.stage == St::Mesh) && self.output)
                            || (self.stage == St::Fragment && !self.output),
                        match *ty_inner {
                            Ti::Array { base, size, .. } => {
                                self.types[base].inner == Ti::Scalar(crate::Scalar::F32)
                                    && match size {
                                        crate::ArraySize::Constant(non_zero) => non_zero.get() <= 8,
                                        _ => false,
                                    }
                            }
                            _ => false,
                        },
                    ),
                    Bi::PointSize => (
                        (self.stage == St::Vertex || self.stage == St::Mesh) && self.output,
                        *ty_inner == Ti::Scalar(crate::Scalar::F32),
                    ),
                    Bi::PointCoord => (
                        self.stage == St::Fragment && !self.output,
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Bi,
                                scalar: crate::Scalar::F32,
                            },
                    ),
                    Bi::Position { .. } => (
                        match self.stage {
                            St::Vertex | St::Mesh => self.output,
                            St::Fragment => !self.output,
                            St::Compute | St::Task => false,
                            St::RayGeneration | St::AnyHit | St::ClosestHit | St::Miss => false,
                        },
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Quad,
                                scalar: crate::Scalar::F32,
                            },
                    ),
                    Bi::ViewIndex => (
                        match self.stage {
                            St::Vertex | St::Fragment | St::Task | St::Mesh => !self.output,
                            St::Compute
                            | St::RayGeneration
                            | St::AnyHit
                            | St::ClosestHit
                            | St::Miss => false,
                        },
                        is_index_type(ty_inner),
                    ),
                    Bi::FragDepth => (
                        self.stage == St::Fragment && self.output,
                        *ty_inner == Ti::Scalar(crate::Scalar::F32),
                    ),
                    Bi::FrontFacing => (
                        self.stage == St::Fragment && !self.output,
                        *ty_inner == Ti::Scalar(crate::Scalar::BOOL),
                    ),
                    Bi::PrimitiveIndex => (
                        (matches!(self.stage, St::Fragment | St::AnyHit | St::ClosestHit)
                            && !self.output)
                            || (self.stage == St::Mesh
                                && self.output
                                && self.mesh_output_type == MeshOutputType::PrimitiveOutput),
                        is_index_type(ty_inner),
                    ),
                    Bi::Barycentric { .. } => (
                        self.stage == St::Fragment && !self.output,
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::F32,
                            },
                    ),
                    Bi::SampleIndex => (
                        self.stage == St::Fragment && !self.output,
                        is_index_type(ty_inner),
                    ),
                    Bi::SampleMask => (
                        self.stage == St::Fragment,
                        *ty_inner == Ti::Scalar(crate::Scalar::U32),
                    ),
                    Bi::LocalInvocationIndex => (
                        self.stage.compute_like() && !self.output,
                        *ty_inner == Ti::Scalar(crate::Scalar::U32),
                    ),
                    Bi::GlobalInvocationId
                    | Bi::LocalInvocationId
                    | Bi::WorkGroupId
                    | Bi::WorkGroupSize
                    | Bi::NumWorkGroups => (
                        self.stage.compute_like() && !self.output,
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::U32,
                            },
                    ),
                    Bi::NumSubgroups | Bi::SubgroupId => (
                        self.stage.compute_like() && !self.output,
                        *ty_inner == Ti::Scalar(crate::Scalar::U32),
                    ),
                    Bi::SubgroupSize | Bi::SubgroupInvocationId => (
                        match self.stage {
                            St::Compute
                            | St::Fragment
                            | St::Task
                            | St::Mesh
                            | St::RayGeneration
                            | St::AnyHit
                            | St::ClosestHit
                            | St::Miss => !self.output,
                            St::Vertex => false,
                        },
                        *ty_inner == Ti::Scalar(crate::Scalar::U32),
                    ),
                    Bi::CullPrimitive => (
                        self.mesh_output_type == MeshOutputType::PrimitiveOutput,
                        *ty_inner == Ti::Scalar(crate::Scalar::BOOL),
                    ),
                    Bi::PointIndex => (
                        self.mesh_output_type == MeshOutputType::PrimitiveOutput,
                        *ty_inner == Ti::Scalar(crate::Scalar::U32),
                    ),
                    Bi::LineIndices => (
                        self.mesh_output_type == MeshOutputType::PrimitiveOutput,
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Bi,
                                scalar: crate::Scalar::U32,
                            },
                    ),
                    Bi::TriangleIndices => (
                        self.mesh_output_type == MeshOutputType::PrimitiveOutput,
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::U32,
                            },
                    ),
                    Bi::MeshTaskSize => (
                        self.stage == St::Task && self.output,
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::U32,
                            },
                    ),
                    Bi::RayInvocationId => (
                        match self.stage {
                            St::Vertex | St::Fragment | St::Compute | St::Mesh | St::Task => false,
                            St::RayGeneration | St::AnyHit | St::ClosestHit | St::Miss => true,
                        },
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::U32,
                            },
                    ),
                    Bi::NumRayInvocations => (
                        match self.stage {
                            St::Vertex | St::Fragment | St::Compute | St::Mesh | St::Task => false,
                            St::RayGeneration | St::AnyHit | St::ClosestHit | St::Miss => true,
                        },
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::U32,
                            },
                    ),
                    Bi::InstanceCustomData => (
                        match self.stage {
                            St::RayGeneration
                            | St::Miss
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit => true,
                        },
                        *ty_inner == Ti::Scalar(crate::Scalar::U32),
                    ),
                    Bi::GeometryIndex => (
                        match self.stage {
                            St::RayGeneration
                            | St::Miss
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit => true,
                        },
                        *ty_inner == Ti::Scalar(crate::Scalar::U32),
                    ),
                    Bi::WorldRayOrigin => (
                        match self.stage {
                            St::RayGeneration
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit | St::Miss => true,
                        },
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::F32,
                            },
                    ),
                    Bi::WorldRayDirection => (
                        match self.stage {
                            St::RayGeneration
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit | St::Miss => true,
                        },
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::F32,
                            },
                    ),
                    Bi::ObjectRayOrigin => (
                        match self.stage {
                            St::RayGeneration
                            | St::Miss
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit => true,
                        },
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::F32,
                            },
                    ),
                    Bi::ObjectRayDirection => (
                        match self.stage {
                            St::RayGeneration
                            | St::Miss
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit => true,
                        },
                        *ty_inner
                            == Ti::Vector {
                                size: Vs::Tri,
                                scalar: crate::Scalar::F32,
                            },
                    ),
                    Bi::RayTmin => (
                        match self.stage {
                            St::RayGeneration
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit | St::Miss => true,
                        },
                        *ty_inner == Ti::Scalar(crate::Scalar::F32),
                    ),
                    Bi::RayTCurrentMax => (
                        match self.stage {
                            St::RayGeneration
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit | St::Miss => true,
                        },
                        *ty_inner == Ti::Scalar(crate::Scalar::F32),
                    ),
                    Bi::ObjectToWorld => (
                        match self.stage {
                            St::RayGeneration
                            | St::Miss
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit => true,
                        },
                        *ty_inner
                            == Ti::Matrix {
                                columns: crate::VectorSize::Quad,
                                rows: crate::VectorSize::Tri,
                                scalar: crate::Scalar::F32,
                            },
                    ),
                    Bi::WorldToObject => (
                        match self.stage {
                            St::RayGeneration
                            | St::Miss
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit => true,
                        },
                        *ty_inner
                            == Ti::Matrix {
                                columns: crate::VectorSize::Quad,
                                rows: crate::VectorSize::Tri,
                                scalar: crate::Scalar::F32,
                            },
                    ),
                    Bi::HitKind => (
                        match self.stage {
                            St::RayGeneration
                            | St::Miss
                            | St::Vertex
                            | St::Fragment
                            | St::Compute
                            | St::Mesh
                            | St::Task => false,
                            St::AnyHit | St::ClosestHit => true,
                        },
                        *ty_inner == Ti::Scalar(crate::Scalar::U32),
                    ),
                    // Validated elsewhere, shouldn't be here
                    Bi::VertexCount | Bi::PrimitiveCount | Bi::Vertices | Bi::Primitives => {
                        (false, true)
                    }
                };
                match built_in {
                    Bi::CullPrimitive
                    | Bi::PointIndex
                    | Bi::LineIndices
                    | Bi::TriangleIndices
                    | Bi::MeshTaskSize
                    | Bi::VertexCount
                    | Bi::PrimitiveCount
                    | Bi::Vertices
                    | Bi::Primitives => {
                        if !self.capabilities.contains(Capabilities::MESH_SHADER) {
                            return Err(VaryingError::UnsupportedCapability(
                                Capabilities::MESH_SHADER,
                            ));
                        }
                    }
                    _ => (),
                }

                if !visible {
                    return Err(VaryingError::InvalidBuiltInStage(built_in));
                }
                if !type_good {
                    return Err(VaryingError::InvalidBuiltInType(built_in, ty_inner.clone()));
                }
            }
            crate::Binding::Location {
                location,
                interpolation,
                sampling,
                blend_src,
                per_primitive,
                component,
                invariant,
                patch,
            } => {
                if invariant && !self.output {
                    return Err(VaryingError::InvalidInputAttributeInStage(
                        "invariant",
                        self.stage,
                    ));
                }
                if patch {
                    // Only tessellation stages have per-patch variables.
                    return Err(VaryingError::InvalidAttributeInStage("patch", self.stage));
                }
                if per_primitive && !self.capabilities.contains(Capabilities::MESH_SHADER) {
                    return Err(VaryingError::UnsupportedCapability(
                        Capabilities::MESH_SHADER,
                    ));
                }
                if interpolation == Some(crate::Interpolation::PerVertex) {
                    if self.stage != crate::ShaderStage::Fragment {
                        return Err(VaryingError::InvalidInterpolationInStage(
                            crate::Interpolation::PerVertex,
                            crate::ShaderStage::Fragment,
                        ));
                    }
                    if !self.capabilities.contains(Capabilities::PER_VERTEX) {
                        return Err(VaryingError::UnsupportedCapability(
                            Capabilities::PER_VERTEX,
                        ));
                    }
                    if sampling.is_some_and(|e| e != crate::Sampling::Center) {
                        return Err(VaryingError::InvalidPerVertexSampling);
                    }
                }
                // If this is per-vertex, we change the type we validate to the inner type, otherwise we leave it be.
                // This lets all validation be done on the inner type once we've ensured the per-vertex is array<T, 3>
                let (ty, ty_inner) = if interpolation == Some(crate::Interpolation::PerVertex) {
                    let three = crate::ArraySize::Constant(core::num::NonZeroU32::new(3).unwrap());
                    match ty_inner {
                        &Ti::Array { base, size, .. } if size == three => {
                            (base, &self.types[base].inner)
                        }
                        _ => return Err(VaryingError::PerVertexNotArrayOfThree),
                    }
                } else {
                    (ty, ty_inner)
                };

                // Only IO-shareable types may be stored in locations: numeric
                // scalars and vectors, and, for a variable of its own,
                // matrices, arrays and structures of them.
                if !self.interface
                    && !self.type_info[ty.index()]
                        .flags
                        .contains(super::TypeFlags::IO_SHAREABLE)
                {
                    return Err(VaryingError::NotIOShareableType(ty));
                }
                let shape = LocationShape::of(self.types, ty)
                    .ok_or(VaryingError::NotIOShareableType(ty))?;
                let _ = ty_inner;

                // Check whether `per_primitive` is appropriate for this stage and direction.
                if self.mesh_output_type == MeshOutputType::PrimitiveOutput {
                    // All mesh shader `Location` outputs must be `per_primitive`.
                    if !per_primitive {
                        return Err(VaryingError::MissingPerPrimitive);
                    }
                } else if self.stage == crate::ShaderStage::Fragment && !self.output {
                    // Fragment stage inputs may be `per_primitive`. We'll only
                    // know if these are correct when the whole mesh pipeline is
                    // created and we're paired with a specific mesh or vertex
                    // shader.
                } else if per_primitive {
                    // All other `Location` bindings must not be `per_primitive`.
                    return Err(VaryingError::InvalidPerPrimitive);
                }

                // On an argument or a result, a blend source must be a member
                // of the struct that holds both sources. A variable of its
                // own carries the index itself (GLSL `layout(index = N)`).
                let index = match blend_src {
                    None => 0,
                    Some(_) if !self.interface => {
                        return Err(VaryingError::BlendSrcNotOnStructMember)
                    }
                    Some(index) => {
                        if self.stage != crate::ShaderStage::Fragment {
                            return Err(VaryingError::InvalidAttributeInStage(
                                "blend_src",
                                self.stage,
                            ));
                        }
                        if !self.output {
                            return Err(VaryingError::InvalidInputAttributeInStage(
                                "blend_src",
                                self.stage,
                            ));
                        }
                        if index > 1 || location != 0 {
                            return Err(VaryingError::InvalidBlendSrcIndex {
                                location,
                                blend_src: index,
                            });
                        }
                        if !self
                            .capabilities
                            .contains(Capabilities::DUAL_SOURCE_BLENDING)
                        {
                            return Err(VaryingError::UnsupportedCapability(
                                Capabilities::DUAL_SOURCE_BLENDING,
                            ));
                        }
                        if index == 1 {
                            if let Some(dual_source_blending) = self.dual_source_blending.as_mut() {
                                **dual_source_blending = true;
                            }
                        }
                        index
                    }
                };
                if location >= MAX_LOCATIONS || shape.locations > MAX_LOCATIONS - location {
                    return Err(VaryingError::LocationTooLarge { location });
                }
                // Two variables may share a location if they use different
                // components of it (`layout(component = N)`).
                let first_component = component.unwrap_or(0);
                if first_component + shape.components > 4
                    || (first_component > 0 && shape.components == 4)
                {
                    return Err(VaryingError::InvalidComponent {
                        component: first_component,
                    });
                }
                for offset in 0..shape.locations {
                    let location = location + offset;
                    if !self.claim_location(location, index, first_component, shape.components)
                        && self.flags.contains(super::ValidationFlags::BINDINGS)
                    {
                        return Err(VaryingError::BindingCollision { location });
                    }
                }

                if let Some(interpolation) = interpolation {
                    let invalid_sampling = match (interpolation, sampling) {
                        (_, None)
                        | (
                            crate::Interpolation::Perspective | crate::Interpolation::Linear,
                            Some(
                                crate::Sampling::Center
                                | crate::Sampling::Centroid
                                | crate::Sampling::Sample,
                            ),
                        )
                        | (
                            crate::Interpolation::Flat,
                            Some(crate::Sampling::First | crate::Sampling::Either),
                        ) => None,
                        (_, Some(invalid_sampling)) => Some(invalid_sampling),
                    };
                    if let Some(sampling) = invalid_sampling {
                        return Err(VaryingError::InvalidInterpolationSamplingCombination {
                            interpolation,
                            sampling,
                        });
                    }
                }

                let needs_interpolation = match self.stage {
                    crate::ShaderStage::Vertex => self.output,
                    crate::ShaderStage::Fragment => !self.output && !per_primitive,
                    crate::ShaderStage::Compute
                    | crate::ShaderStage::Task
                    | crate::ShaderStage::RayGeneration
                    | crate::ShaderStage::AnyHit
                    | crate::ShaderStage::ClosestHit
                    | crate::ShaderStage::Miss => false,
                    crate::ShaderStage::Mesh => self.output,
                };

                // It doesn't make sense to specify a sampling when `interpolation` is `Flat`, but
                // SPIR-V and GLSL both explicitly tolerate such combinations of decorators /
                // qualifiers, so we won't complain about that here.
                let _ = sampling;

                let required = match sampling {
                    Some(crate::Sampling::Sample) => Capabilities::MULTISAMPLED_SHADING,
                    _ => Capabilities::empty(),
                };
                if !self.capabilities.contains(required) {
                    return Err(VaryingError::UnsupportedCapability(required));
                }

                if interpolation != Some(crate::Interpolation::PerVertex) {
                    // Integers and doubles cannot be interpolated: where they
                    // enter the fragment stage they must be `flat` (Vulkan
                    // VUID-StandaloneSpirv-Flat-04744). The outputs of the
                    // stages before rasterization need no qualifier.
                    let fragment_input = self.stage == crate::ShaderStage::Fragment
                        && !self.output
                        && !per_primitive;
                    // Default interpolation is applied in the front end.
                    if shape.float
                        && !shape.non_interpolable
                        && needs_interpolation
                        && interpolation.is_none()
                    {
                        return Err(VaryingError::MissingInterpolation);
                    }
                    if shape.non_interpolable
                        && fragment_input
                        && interpolation != Some(crate::Interpolation::Flat)
                    {
                        return Err(VaryingError::InvalidInterpolationForInteger);
                    }
                }
            }
        }

        Ok(())
    }

    fn validate(
        &mut self,
        ep: &crate::EntryPoint,
        ty: Handle<crate::Type>,
        binding: Option<&crate::Binding>,
    ) -> Result<(), WithSpan<VaryingError>> {
        let span_context = self.types.get_span_context(ty);
        match binding {
            Some(binding) => self
                .validate_impl(ep, ty, binding)
                .map_err(|e| e.with_span_context(span_context)),
            None => {
                let crate::TypeInner::Struct { ref members, .. } = self.types[ty].inner else {
                    if self.flags.contains(super::ValidationFlags::BINDINGS) {
                        return Err(VaryingError::MissingBinding.with_span());
                    } else {
                        return Ok(());
                    }
                };

                if self.type_info[ty.index()]
                    .flags
                    .contains(super::TypeFlags::IO_SHAREABLE)
                {
                    // `@blend_src` is the only case where `IO_SHAREABLE` is set on a struct (as
                    // opposed to members of a struct). The struct definition is validated during
                    // type validation.
                    if self.stage != crate::ShaderStage::Fragment {
                        return Err(
                            VaryingError::InvalidAttributeInStage("blend_src", self.stage)
                                .with_span(),
                        );
                    }
                    if !self.output {
                        return Err(VaryingError::InvalidInputAttributeInStage(
                            "blend_src",
                            self.stage,
                        )
                        .with_span());
                    }
                    // Dual blend sources must always be at location 0.
                    if !self.claim_location(0, 0, 0, 4)
                        && self.flags.contains(super::ValidationFlags::BINDINGS)
                    {
                        return Err(VaryingError::BindingCollision { location: 0 }.with_span());
                    }

                    **self
                        .dual_source_blending
                        .as_mut()
                        .expect("unexpected dual source blending") = true;
                } else {
                    for (index, member) in members.iter().enumerate() {
                        let span_context = self.types.get_span_context(ty);
                        match member.binding {
                            None => {
                                if self.flags.contains(super::ValidationFlags::BINDINGS) {
                                    return Err(VaryingError::MemberMissingBinding(index as u32)
                                        .with_span_context(span_context));
                                }
                            }
                            Some(ref binding) => self
                                .validate_impl(ep, member.ty, binding)
                                .map_err(|e| e.with_span_context(span_context))?,
                        }
                    }
                }
                Ok(())
            }
        }
    }
}

impl VaryingContext<'_> {
    fn validate_interface(
        &mut self,
        ep: &crate::EntryPoint,
        ty: Handle<crate::Type>,
        io: Option<&crate::Binding>,
    ) -> Result<(), WithSpan<VaryingError>> {
        let Some(block) = crate::proc::interface_block(self.types, ty) else {
            return self.validate(ep, ty, io);
        };
        let span_context = self.types.get_span_context(ty);
        let fail = |error: VaryingError| error.with_span_context(span_context.clone());
        let crate::TypeInner::Struct { ref members, .. } = self.types[block.structure].inner else {
            return Err(fail(VaryingError::InvalidType(ty)));
        };
        let mut built_in = false;
        let mut located = false;
        for (index, member) in members.iter().enumerate() {
            match member.binding {
                None => {
                    return Err(fail(VaryingError::MemberMissingBinding(
                        u32::try_from(index).unwrap_or(u32::MAX),
                    )))
                }
                Some(crate::Binding::BuiltIn(_)) => built_in = true,
                Some(crate::Binding::Location { .. }) => located = true,
            }
        }
        if built_in && located {
            return Err(fail(VaryingError::MixedBlockBindings));
        }
        let Some(io) = io else {
            if located && block.arrayed {
                return Err(fail(VaryingError::MemberLocationInBlockArray));
            }
            for member in members {
                if let Some(ref binding) = member.binding {
                    self.validate_impl(ep, member.ty, binding).map_err(&fail)?;
                }
            }
            return Ok(());
        };
        let crate::Binding::Location {
            location: start,
            interpolation: None,
            sampling: None,
            blend_src: None,
            per_primitive: false,
            component: None,
            invariant: false,
            patch: false,
        } = *io
        else {
            return Err(fail(VaryingError::InvalidBlockBinding));
        };
        if built_in {
            return Err(fail(VaryingError::InvalidBlockBinding));
        }
        let total = LocationShape::of(self.types, ty)
            .ok_or_else(|| fail(VaryingError::NotIOShareableType(ty)))?
            .locations;
        if start >= MAX_LOCATIONS || total > MAX_LOCATIONS - start {
            return Err(fail(VaryingError::LocationTooLarge { location: start }));
        }
        let mut next = start;
        for element in 0..block.elements {
            for (index, member) in members.iter().enumerate() {
                let Some(crate::Binding::Location {
                    location: declared,
                    interpolation,
                    sampling,
                    blend_src,
                    per_primitive,
                    component: None,
                    invariant,
                    patch,
                }) = member.binding
                else {
                    return Err(fail(VaryingError::InvalidBlockBinding));
                };
                if element == 0 && declared != next {
                    return Err(fail(VaryingError::BlockMemberLocation {
                        member: u32::try_from(index).unwrap_or(u32::MAX),
                        block: start,
                        expected: next,
                        found: declared,
                    }));
                }
                let binding = crate::Binding::Location {
                    location: next,
                    interpolation,
                    sampling,
                    blend_src,
                    per_primitive,
                    component: None,
                    invariant,
                    patch,
                };
                self.validate_impl(ep, member.ty, &binding).map_err(&fail)?;
                let shape = LocationShape::of(self.types, member.ty)
                    .ok_or_else(|| fail(VaryingError::NotIOShareableType(member.ty)))?;
                next = next.saturating_add(shape.locations);
            }
        }
        Ok(())
    }
}

impl super::Validator {
    pub(super) fn validate_global_var(
        &self,
        var: &crate::GlobalVariable,
        gctx: crate::proc::GlobalCtx,
        mod_info: &ModuleInfo,
        global_expr_kind: &crate::proc::ExpressionKindTracker,
    ) -> Result<(), GlobalVariableError> {
        use super::TypeFlags;

        log::debug!("var {var:?}");
        if var.xfb.is_some() && var.space != crate::AddressSpace::Output {
            return Err(GlobalVariableError::InvalidTransformFeedback);
        }
        if var.input_attachment_index.is_some() {
            let element = match gctx.types[var.ty].inner {
                crate::TypeInner::BindingArray { base, .. } => base,
                _ => var.ty,
            };
            let subpass = matches!(
                gctx.types[element].inner,
                crate::TypeInner::Image {
                    dim: crate::ImageDimension::Subpass,
                    ..
                }
            );
            if !subpass || var.space != crate::AddressSpace::Handle {
                return Err(GlobalVariableError::InvalidInputAttachmentIndex);
            }
        }
        let inner_ty = match gctx.types[var.ty].inner {
            // A binding array is (mostly) supposed to behave the same as a
            // series of individually bound resources, so we can (mostly)
            // validate a `binding_array<T>` as if it were just a plain `T`.
            crate::TypeInner::BindingArray { base, .. } => match var.space {
                crate::AddressSpace::Storage { .. } => {
                    if !self
                        .capabilities
                        .contains(Capabilities::STORAGE_BUFFER_BINDING_ARRAY)
                    {
                        return Err(GlobalVariableError::UnsupportedCapability(
                            Capabilities::STORAGE_BUFFER_BINDING_ARRAY,
                        ));
                    }
                    base
                }
                crate::AddressSpace::Uniform => {
                    if !self
                        .capabilities
                        .contains(Capabilities::BUFFER_BINDING_ARRAY)
                    {
                        return Err(GlobalVariableError::UnsupportedCapability(
                            Capabilities::BUFFER_BINDING_ARRAY,
                        ));
                    }
                    base
                }
                crate::AddressSpace::Handle => {
                    match gctx.types[base].inner {
                        crate::TypeInner::Image { class, .. } => match class {
                            crate::ImageClass::Storage { .. } => {
                                if !self
                                    .capabilities
                                    .contains(Capabilities::STORAGE_TEXTURE_BINDING_ARRAY)
                                {
                                    return Err(GlobalVariableError::UnsupportedCapability(
                                        Capabilities::STORAGE_TEXTURE_BINDING_ARRAY,
                                    ));
                                }
                            }
                            crate::ImageClass::Sampled { .. } | crate::ImageClass::Depth { .. } => {
                                if !self
                                    .capabilities
                                    .contains(Capabilities::TEXTURE_AND_SAMPLER_BINDING_ARRAY)
                                {
                                    return Err(GlobalVariableError::UnsupportedCapability(
                                        Capabilities::TEXTURE_AND_SAMPLER_BINDING_ARRAY,
                                    ));
                                }
                            }
                            crate::ImageClass::External => {
                                // This should have been rejected in `validate_type`.
                                unreachable!("binding arrays of external images are not supported");
                            }
                        },
                        crate::TypeInner::Sampler { .. }
                        | crate::TypeInner::SampledImage { .. } => {
                            if !self
                                .capabilities
                                .contains(Capabilities::TEXTURE_AND_SAMPLER_BINDING_ARRAY)
                            {
                                return Err(GlobalVariableError::UnsupportedCapability(
                                    Capabilities::TEXTURE_AND_SAMPLER_BINDING_ARRAY,
                                ));
                            }
                        }
                        crate::TypeInner::AccelerationStructure { .. } => {
                            if !self
                                .capabilities
                                .contains(Capabilities::ACCELERATION_STRUCTURE_BINDING_ARRAY)
                            {
                                return Err(GlobalVariableError::UnsupportedCapability(
                                    Capabilities::ACCELERATION_STRUCTURE_BINDING_ARRAY,
                                ));
                            }
                        }
                        crate::TypeInner::RayQuery { .. } => {
                            // This should have been rejected in `validate_type`.
                            unreachable!("binding arrays of ray queries are not supported");
                        }
                        _ => {
                            // Fall through to the regular validation, which will reject `base`
                            // as invalid in `AddressSpace::Handle`.
                        }
                    }
                    base
                }
                _ => return Err(GlobalVariableError::InvalidUsage(var.space)),
            },
            _ => var.ty,
        };
        let type_info = &self.types[inner_ty.index()];

        let (required_type_flags, is_resource) = match var.space {
            crate::AddressSpace::Function => {
                return Err(GlobalVariableError::InvalidUsage(var.space))
            }
            crate::AddressSpace::Storage { access: _ } => {
                if let Err((ty_handle, disalignment)) = type_info.storage_layout {
                    if self.flags.contains(super::ValidationFlags::STRUCT_LAYOUTS) {
                        return Err(GlobalVariableError::Alignment(
                            var.space,
                            ty_handle,
                            disalignment,
                        ));
                    }
                }
                (
                    TypeFlags::DATA | TypeFlags::HOST_SHAREABLE | TypeFlags::CREATION_RESOLVED,
                    true,
                )
            }
            crate::AddressSpace::Uniform => {
                if let Err((ty_handle, disalignment)) = type_info.uniform_layout {
                    if self.flags.contains(super::ValidationFlags::STRUCT_LAYOUTS) {
                        return Err(GlobalVariableError::Alignment(
                            var.space,
                            ty_handle,
                            disalignment,
                        ));
                    }
                }
                (
                    TypeFlags::DATA
                        | TypeFlags::COPY
                        | TypeFlags::SIZED
                        | TypeFlags::HOST_SHAREABLE
                        | TypeFlags::CREATION_RESOLVED,
                    true,
                )
            }
            crate::AddressSpace::Handle => {
                match gctx.types[inner_ty].inner {
                    crate::TypeInner::Image { class, .. } => match class {
                        crate::ImageClass::Storage {
                            format:
                                crate::StorageFormat::R16Unorm
                                | crate::StorageFormat::R16Snorm
                                | crate::StorageFormat::Rg16Unorm
                                | crate::StorageFormat::Rg16Snorm
                                | crate::StorageFormat::Rgba16Unorm
                                | crate::StorageFormat::Rgba16Snorm,
                            ..
                        } => {
                            if !self
                                .capabilities
                                .contains(Capabilities::STORAGE_TEXTURE_16BIT_NORM_FORMATS)
                            {
                                return Err(GlobalVariableError::UnsupportedCapability(
                                    Capabilities::STORAGE_TEXTURE_16BIT_NORM_FORMATS,
                                ));
                            }
                        }
                        _ => {}
                    },
                    crate::TypeInner::Sampler { .. }
                    | crate::TypeInner::SampledImage { .. }
                    | crate::TypeInner::AccelerationStructure { .. }
                    | crate::TypeInner::RayQuery { .. } => {}
                    _ => {
                        return Err(GlobalVariableError::InvalidType(var.space));
                    }
                }

                (TypeFlags::empty(), true)
            }
            crate::AddressSpace::Private => (
                TypeFlags::CONSTRUCTIBLE | TypeFlags::CREATION_RESOLVED,
                false,
            ),
            crate::AddressSpace::WorkGroup => (TypeFlags::DATA | TypeFlags::SIZED, false),
            crate::AddressSpace::TaskPayload => {
                if !self.capabilities.contains(Capabilities::MESH_SHADER) {
                    return Err(GlobalVariableError::UnsupportedCapability(
                        Capabilities::MESH_SHADER,
                    ));
                }
                (TypeFlags::DATA | TypeFlags::SIZED, false)
            }
            crate::AddressSpace::Immediate => {
                if !self.capabilities.contains(Capabilities::IMMEDIATES) {
                    return Err(GlobalVariableError::UnsupportedCapability(
                        Capabilities::IMMEDIATES,
                    ));
                }
                if let Err(ref err) = type_info.immediates_compatibility {
                    return Err(GlobalVariableError::InvalidImmediateType(err.clone()));
                }
                (
                    TypeFlags::DATA
                        | TypeFlags::COPY
                        | TypeFlags::HOST_SHAREABLE
                        | TypeFlags::SIZED,
                    false,
                )
            }
            crate::AddressSpace::RayPayload | crate::AddressSpace::IncomingRayPayload => {
                if !self
                    .capabilities
                    .contains(Capabilities::RAY_TRACING_PIPELINE)
                {
                    return Err(GlobalVariableError::UnsupportedCapability(
                        Capabilities::RAY_TRACING_PIPELINE,
                    ));
                }
                (TypeFlags::DATA | TypeFlags::SIZED, false)
            }
            // What the variable is bound to is validated for each entry point
            // that lists it, since it depends on the stage.
            crate::AddressSpace::Input | crate::AddressSpace::Output => {
                (TypeFlags::DATA | TypeFlags::SIZED, false)
            }
        };

        if !type_info.flags.contains(required_type_flags) {
            return Err(GlobalVariableError::MissingTypeFlags {
                seen: type_info.flags,
                required: required_type_flags,
            });
        }

        if is_resource != var.binding.is_some() {
            if self.flags.contains(super::ValidationFlags::BINDINGS) {
                return Err(GlobalVariableError::InvalidBinding);
            }
        }

        let is_interface = matches!(
            var.space,
            crate::AddressSpace::Input | crate::AddressSpace::Output
        );
        if var.io.is_some() && !is_interface {
            return Err(GlobalVariableError::InvalidBinding);
        }
        if var.space == crate::AddressSpace::Input && var.init.is_some() {
            return Err(GlobalVariableError::InitializerNotAllowed(var.space));
        }

        if var.space == crate::AddressSpace::TaskPayload {
            let ty = &gctx.types[var.ty].inner;
            // HLSL doesn't allow zero sized payloads.
            if ty.try_size(gctx) == Some(0) {
                return Err(GlobalVariableError::ZeroSizedTaskPayload);
            }
        }

        if !var.memory_decorations.is_empty()
            && !matches!(var.space, crate::AddressSpace::Storage { .. })
        {
            return Err(GlobalVariableError::InvalidMemoryDecorationsAddressSpace);
        }
        if var
            .memory_decorations
            .contains(crate::MemoryDecorations::COHERENT)
            && !self
                .capabilities
                .contains(Capabilities::MEMORY_DECORATION_COHERENT)
        {
            return Err(GlobalVariableError::CoherentNotSupported);
        }
        if var
            .memory_decorations
            .contains(crate::MemoryDecorations::VOLATILE)
            && !self
                .capabilities
                .contains(Capabilities::MEMORY_DECORATION_VOLATILE)
        {
            return Err(GlobalVariableError::VolatileNotSupported);
        }

        if let Some(init) = var.init {
            match var.space {
                crate::AddressSpace::Private | crate::AddressSpace::Function => {}
                _ => {
                    return Err(GlobalVariableError::InitializerNotAllowed(var.space));
                }
            }

            if !global_expr_kind.is_const_or_override(init) {
                return Err(GlobalVariableError::InitializerExprType);
            }

            if !gctx.compare_types(
                &crate::proc::TypeResolution::Handle(var.ty),
                &mod_info[init],
            ) {
                return Err(GlobalVariableError::InitializerType);
            }
        }

        Ok(())
    }

    /// Validate the mesh shader output type `ty`, used as `mesh_output_type`.
    fn validate_mesh_output_type(
        &mut self,
        ep: &crate::EntryPoint,
        module: &crate::Module,
        ty: Handle<crate::Type>,
        mesh_output_type: MeshOutputType,
    ) -> Result<(), WithSpan<EntryPointError>> {
        if !matches!(module.types[ty].inner, crate::TypeInner::Struct { .. }) {
            return Err(EntryPointError::InvalidMeshOutputType.with_span_handle(ty, &module.types));
        }
        let mut result_built_ins = crate::FastHashSet::default();
        let mut ctx = VaryingContext {
            stage: ep.stage,
            output: true,
            types: &module.types,
            type_info: &self.types,
            location_mask: &mut self.location_mask,
            dual_source_blending: None,
            built_ins: &mut result_built_ins,
            capabilities: self.capabilities,
            flags: self.flags,
            mesh_output_type,
            has_task_payload: ep.task_payload.is_some(),
            interface: false,
        };
        ctx.validate(ep, ty, None)
            .map_err_inner(|e| EntryPointError::Result(e).with_span())?;
        if mesh_output_type == MeshOutputType::PrimitiveOutput {
            let mut num_indices_builtins = 0;
            if result_built_ins.contains(&crate::BuiltIn::PointIndex) {
                num_indices_builtins += 1;
            }
            if result_built_ins.contains(&crate::BuiltIn::LineIndices) {
                num_indices_builtins += 1;
            }
            if result_built_ins.contains(&crate::BuiltIn::TriangleIndices) {
                num_indices_builtins += 1;
            }
            if num_indices_builtins != 1 {
                return Err(EntryPointError::InvalidMeshPrimitiveOutputType
                    .with_span_handle(ty, &module.types));
            }
        } else if mesh_output_type == MeshOutputType::VertexOutput
            && !result_built_ins.contains(&crate::BuiltIn::Position { invariant: false })
        {
            return Err(
                EntryPointError::MissingVertexOutputPosition.with_span_handle(ty, &module.types)
            );
        }

        Ok(())
    }

    pub(super) fn validate_entry_point(
        &mut self,
        ep: &crate::EntryPoint,
        module: &crate::Module,
        mod_info: &ModuleInfo,
    ) -> Result<FunctionInfo, WithSpan<EntryPointError>> {
        match ep.stage {
            crate::ShaderStage::Task | crate::ShaderStage::Mesh
                if !self.capabilities.contains(Capabilities::MESH_SHADER) =>
            {
                return Err(
                    EntryPointError::UnsupportedCapability(Capabilities::MESH_SHADER).with_span(),
                );
            }
            crate::ShaderStage::RayGeneration
            | crate::ShaderStage::AnyHit
            | crate::ShaderStage::ClosestHit
            | crate::ShaderStage::Miss
                if !self
                    .capabilities
                    .contains(Capabilities::RAY_TRACING_PIPELINE) =>
            {
                return Err(EntryPointError::UnsupportedCapability(
                    Capabilities::RAY_TRACING_PIPELINE,
                )
                .with_span());
            }
            _ => {}
        }
        if ep.early_depth_test.is_some() {
            let required = Capabilities::EARLY_DEPTH_TEST;
            if !self.capabilities.contains(required) {
                return Err(
                    EntryPointError::Result(VaryingError::UnsupportedCapability(required))
                        .with_span(),
                );
            }

            if ep.stage != crate::ShaderStage::Fragment {
                return Err(EntryPointError::UnexpectedEarlyDepthTest.with_span());
            }
        }

        if ep.stage.compute_like() {
            if ep
                .workgroup_size
                .iter()
                .any(|&s| s == 0 || s > MAX_WORKGROUP_SIZE)
            {
                return Err(EntryPointError::OutOfRangeWorkgroupSize.with_span());
            }
        } else if ep.workgroup_size != [0; 3] {
            return Err(EntryPointError::UnexpectedWorkgroupSize.with_span());
        }

        match (ep.stage, &ep.mesh_info) {
            (crate::ShaderStage::Mesh, &None) => {
                return Err(EntryPointError::ExpectedMeshShaderAttributes.with_span());
            }
            (crate::ShaderStage::Mesh, &Some(..)) => {}
            (_, &Some(_)) => {
                return Err(EntryPointError::UnexpectedMeshShaderAttributes.with_span());
            }
            (_, _) => {}
        }

        let mut info = self
            .validate_function(&ep.function, module, mod_info, true)
            .map_err(WithSpan::into_other)?;

        // Validate the task shader payload.
        match ep.stage {
            // Task shaders must produce a payload.
            crate::ShaderStage::Task => {
                let Some(handle) = ep.task_payload else {
                    return Err(EntryPointError::ExpectedTaskPayload.with_span());
                };
                if module.global_variables[handle].space != crate::AddressSpace::TaskPayload {
                    return Err(EntryPointError::TaskPayloadWrongAddressSpace
                        .with_span_handle(handle, &module.global_variables));
                }
                info.insert_global_use(GlobalUse::READ | GlobalUse::WRITE, handle);
            }

            // Mesh shaders may accept a payload.
            crate::ShaderStage::Mesh => {
                if let Some(handle) = ep.task_payload {
                    if module.global_variables[handle].space != crate::AddressSpace::TaskPayload {
                        return Err(EntryPointError::TaskPayloadWrongAddressSpace
                            .with_span_handle(handle, &module.global_variables));
                    }
                    info.insert_global_use(GlobalUse::READ, handle);
                }
                if let Some(ref mesh_info) = ep.mesh_info {
                    info.insert_global_use(GlobalUse::READ, mesh_info.output_variable);
                }
            }

            // Other stages must not have a payload.
            _ => {
                if let Some(handle) = ep.task_payload {
                    return Err(EntryPointError::UnexpectedTaskPayload
                        .with_span_handle(handle, &module.global_variables));
                }
            }
        }

        {
            use super::ShaderStages;

            let stage_bit = match ep.stage {
                crate::ShaderStage::Vertex => ShaderStages::VERTEX,
                crate::ShaderStage::Fragment => ShaderStages::FRAGMENT,
                crate::ShaderStage::Compute => ShaderStages::COMPUTE,
                crate::ShaderStage::Mesh => ShaderStages::MESH,
                crate::ShaderStage::Task => ShaderStages::TASK,
                crate::ShaderStage::RayGeneration => ShaderStages::RAY_GENERATION,
                crate::ShaderStage::AnyHit => ShaderStages::ANY_HIT,
                crate::ShaderStage::ClosestHit => ShaderStages::CLOSEST_HIT,
                crate::ShaderStage::Miss => ShaderStages::MISS,
            };

            if !info.available_stages.contains(stage_bit) {
                return Err(EntryPointError::ForbiddenStageOperations.with_span());
            }
        }

        self.location_mask.make_empty();
        let mut argument_built_ins = crate::FastHashSet::default();
        // TODO: add span info to function arguments
        for (index, fa) in ep.function.arguments.iter().enumerate() {
            let mut ctx = VaryingContext {
                stage: ep.stage,
                output: false,
                types: &module.types,
                type_info: &self.types,
                location_mask: &mut self.location_mask,
                dual_source_blending: Some(&mut info.dual_source_blending),
                built_ins: &mut argument_built_ins,
                capabilities: self.capabilities,
                flags: self.flags,
                mesh_output_type: MeshOutputType::None,
                has_task_payload: ep.task_payload.is_some(),
                interface: false,
            };
            ctx.validate(ep, fa.ty, fa.binding.as_ref())
                .map_err_inner(|e| EntryPointError::Argument(index as u32, e).with_span())?;
        }

        self.location_mask.make_empty();
        if let Some(ref fr) = ep.function.result {
            let mut result_built_ins = crate::FastHashSet::default();
            let mut ctx = VaryingContext {
                stage: ep.stage,
                output: true,
                types: &module.types,
                type_info: &self.types,
                location_mask: &mut self.location_mask,
                dual_source_blending: Some(&mut info.dual_source_blending),
                built_ins: &mut result_built_ins,
                capabilities: self.capabilities,
                flags: self.flags,
                mesh_output_type: MeshOutputType::None,
                has_task_payload: ep.task_payload.is_some(),
                interface: false,
            };
            ctx.validate(ep, fr.ty, fr.binding.as_ref())
                .map_err_inner(|e| EntryPointError::Result(e).with_span())?;
            if ep.stage == crate::ShaderStage::Vertex
                && !result_built_ins.contains(&crate::BuiltIn::Position { invariant: false })
            {
                return Err(EntryPointError::MissingVertexOutputPosition.with_span());
            }
            if ep.stage == crate::ShaderStage::Mesh {
                return Err(EntryPointError::UnexpectedMeshShaderEntryResult.with_span());
            }
            // Task shaders must have a single `MeshTaskSize` output, and nothing else.
            if ep.stage == crate::ShaderStage::Task {
                let ok = module.types[fr.ty].inner
                    == crate::TypeInner::Vector {
                        size: crate::VectorSize::Tri,
                        scalar: crate::Scalar::U32,
                    };
                if !ok {
                    return Err(EntryPointError::WrongTaskShaderEntryResult.with_span());
                }
            }
        } else if ep.stage == crate::ShaderStage::Task {
            return Err(EntryPointError::WrongTaskShaderEntryResult.with_span());
        }

        // Inputs and outputs that are global variables. They share the
        // location space of the arguments and of the result, respectively.
        {
            let mut seen = crate::FastHashSet::default();
            let mut input_mask = BitSet::new();
            let mut output_mask = BitSet::new();
            let mut input_built_ins = crate::FastHashSet::default();
            let mut output_built_ins = crate::FastHashSet::default();
            for &handle in &ep.interface {
                let var = &module.global_variables[handle];
                let output = match var.space {
                    crate::AddressSpace::Input => false,
                    crate::AddressSpace::Output => true,
                    _ => {
                        return Err(EntryPointError::InterfaceNotInputOrOutput(handle)
                            .with_span_handle(handle, &module.global_variables))
                    }
                };
                if !seen.insert(handle) {
                    return Err(EntryPointError::InterfaceDuplicate(handle)
                        .with_span_handle(handle, &module.global_variables));
                }
                let mut ctx = VaryingContext {
                    stage: ep.stage,
                    output,
                    types: &module.types,
                    type_info: &self.types,
                    location_mask: if output {
                        &mut output_mask
                    } else {
                        &mut input_mask
                    },
                    dual_source_blending: Some(&mut info.dual_source_blending),
                    built_ins: if output {
                        &mut output_built_ins
                    } else {
                        &mut input_built_ins
                    },
                    capabilities: self.capabilities,
                    flags: self.flags,
                    mesh_output_type: MeshOutputType::None,
                    has_task_payload: ep.task_payload.is_some(),
                    interface: true,
                };
                ctx.validate_interface(ep, var.ty, var.io.as_ref())
                    .map_err(|e| {
                        EntryPointError::InterfaceVariable(handle, e.into_inner())
                            .with_span_handle(handle, &module.global_variables)
                    })?;
            }
        }

        {
            let mut used_immediates = module
                .global_variables
                .iter()
                .filter(|&(_, var)| var.space == crate::AddressSpace::Immediate)
                .map(|(handle, _)| handle)
                .filter(|&handle| !info[handle].is_empty());
            // Check if there is more than one immediate data, and error if so.
            // Use a loop for when returning multiple errors is supported.
            if let Some(handle) = used_immediates.nth(1) {
                return Err(EntryPointError::MoreThanOneImmediateUsed
                    .with_span_handle(handle, &module.global_variables));
            }
        }

        for (var_handle, var) in module.global_variables.iter() {
            let usage = info[var_handle];
            if usage.is_empty() {
                continue;
            }

            if var.space == crate::AddressSpace::TaskPayload {
                if ep.task_payload != Some(var_handle) {
                    return Err(EntryPointError::WrongTaskPayloadUsed
                        .with_span_handle(var_handle, &module.global_variables));
                }
                let size = module.types[var.ty].inner.size(module.to_ctx());
                if size < 4 {
                    return Err(EntryPointError::TaskPayloadTooSmall(size)
                        .with_span_handle(var_handle, &module.global_variables));
                }
            }

            let allowed_usage = match var.space {
                crate::AddressSpace::Function => unreachable!(),
                crate::AddressSpace::Uniform => GlobalUse::READ | GlobalUse::QUERY,
                crate::AddressSpace::Storage { access } => storage_usage(access),
                crate::AddressSpace::Handle => match module.types[var.ty].inner {
                    crate::TypeInner::BindingArray { base, .. } => match module.types[base].inner {
                        crate::TypeInner::Image {
                            class: crate::ImageClass::Storage { access, .. },
                            ..
                        } => storage_usage(access),
                        _ => GlobalUse::READ | GlobalUse::QUERY,
                    },
                    crate::TypeInner::Image {
                        class: crate::ImageClass::Storage { access, .. },
                        ..
                    } => storage_usage(access),
                    _ => GlobalUse::READ | GlobalUse::QUERY,
                },
                crate::AddressSpace::Private | crate::AddressSpace::WorkGroup => {
                    GlobalUse::READ | GlobalUse::WRITE | GlobalUse::QUERY
                }
                crate::AddressSpace::Input | crate::AddressSpace::Output => {
                    if !ep.interface.contains(&var_handle) {
                        return Err(EntryPointError::NotInInterface(var_handle)
                            .with_span_handle(var_handle, &module.global_variables));
                    }
                    if var.space == crate::AddressSpace::Input {
                        GlobalUse::READ | GlobalUse::QUERY
                    } else {
                        GlobalUse::READ | GlobalUse::WRITE | GlobalUse::QUERY
                    }
                }
                crate::AddressSpace::TaskPayload => {
                    GlobalUse::READ
                        | GlobalUse::QUERY
                        | if ep.stage == crate::ShaderStage::Task {
                            GlobalUse::WRITE
                        } else {
                            GlobalUse::empty()
                        }
                }
                crate::AddressSpace::Immediate => GlobalUse::READ,
                crate::AddressSpace::RayPayload => {
                    if !matches!(
                        ep.stage,
                        crate::ShaderStage::RayGeneration
                            | crate::ShaderStage::ClosestHit
                            | crate::ShaderStage::Miss
                    ) {
                        return Err(EntryPointError::RayPayloadInInvalidStage(ep.stage)
                            .with_span_handle(var_handle, &module.global_variables));
                    }
                    GlobalUse::READ | GlobalUse::QUERY | GlobalUse::WRITE
                }
                crate::AddressSpace::IncomingRayPayload => {
                    if !matches!(
                        ep.stage,
                        crate::ShaderStage::AnyHit
                            | crate::ShaderStage::ClosestHit
                            | crate::ShaderStage::Miss
                    ) {
                        return Err(EntryPointError::IncomingRayPayloadInInvalidStage(ep.stage)
                            .with_span_handle(var_handle, &module.global_variables));
                    }
                    GlobalUse::READ | GlobalUse::QUERY | GlobalUse::WRITE
                }
            };
            if !allowed_usage.contains(usage) {
                log::warn!("\tUsage error for: {var:?}");
                log::warn!("\tAllowed usage: {allowed_usage:?}, requested: {usage:?}");
                return Err(EntryPointError::InvalidGlobalUsage(var_handle, usage)
                    .with_span_handle(var_handle, &module.global_variables));
            }
        }

        // If this is a `Mesh` entry point, check its vertex and primitive output types.
        // We verified previously that only mesh shaders can have `mesh_info`.
        if let &Some(ref mesh_info) = &ep.mesh_info {
            if module.global_variables[mesh_info.output_variable].space
                != crate::AddressSpace::WorkGroup
            {
                return Err(EntryPointError::WrongMeshOutputAddressSpace.with_span());
            }

            let mut implied = module.analyze_mesh_shader_info(mesh_info.output_variable);
            if let Some(e) = implied.2 {
                return Err(e);
            }

            if let Some(e) = mesh_info.max_vertices_override {
                if let crate::Expression::Override(o) = module.global_expressions[e] {
                    if implied.1[0] != Some(o) {
                        return Err(EntryPointError::BadMeshOutputVariableType.with_span());
                    }
                }
            }
            if let Some(e) = mesh_info.max_primitives_override {
                if let crate::Expression::Override(o) = module.global_expressions[e] {
                    if implied.1[1] != Some(o) {
                        return Err(EntryPointError::BadMeshOutputVariableType.with_span());
                    }
                }
            }

            implied.0.max_vertices_override = mesh_info.max_vertices_override;
            implied.0.max_primitives_override = mesh_info.max_primitives_override;
            if implied.0 != *mesh_info {
                return Err(EntryPointError::BadMeshOutputVariableType.with_span());
            }
            if mesh_info.topology == crate::MeshOutputTopology::Points
                && !self
                    .capabilities
                    .contains(Capabilities::MESH_SHADER_POINT_TOPOLOGY)
            {
                return Err(EntryPointError::UnsupportedCapability(
                    Capabilities::MESH_SHADER_POINT_TOPOLOGY,
                )
                .with_span());
            }

            self.validate_mesh_output_type(
                ep,
                module,
                mesh_info.vertex_output_type,
                MeshOutputType::VertexOutput,
            )?;
            self.validate_mesh_output_type(
                ep,
                module,
                mesh_info.primitive_output_type,
                MeshOutputType::PrimitiveOutput,
            )?;
        }

        Ok(info)
    }
}
