use alloc::vec::Vec;

use bit_set::BitSet;
use rglsl_types::builtin::{ArrayLength, BuiltInType, BuiltInValue, Component, MeshAccess};

use super::{
    Disalignment, FunctionError, ImmediateError, ModuleInfo,
    analyzer::{FunctionInfo, GlobalUse},
};
use crate::arena::{Handle, UniqueArena};
use crate::span::{AddSpan as _, MapErrWithSpan as _, SpanProvider as _, WithSpan};

const MAX_WORKGROUP_SIZE: u32 = 0x4000;

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
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
    #[error(
        "Memory decorations (`@coherent`, `@volatile`) are only valid for variables in the `storage` address space"
    )]
    InvalidMemoryDecorationsAddressSpace,
    #[error("Transform feedback decorations are only valid for stage outputs")]
    InvalidTransformFeedback,
    #[error("An input attachment index is only valid for subpass inputs")]
    InvalidInputAttachmentIndex,
    #[error("cannot mix use of shared variables inside and outside blocks")]
    MixedWorkGroupLayout,
    #[error(
        "`restrict` on aliased shared memory blocks is not supported: SPIR-V forbids decorating a Workgroup variable with both Aliased and Restrict"
    )]
    RestrictOnAliasedWorkGroupBlock,
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
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
    #[error("The attribute {0:?} is only valid as an output for stage {1:?}")]
    InvalidInputAttributeInStage(&'static str, crate::ShaderStage),
    #[error("The attribute {0:?} is not valid for stage {1:?}")]
    InvalidAttributeInStage(&'static str, crate::ShaderStage),
    #[error(
        "`@blend_src` can only be used at location 0, indices 0 and 1. Found `@location({location}) @blend_src({blend_src})`."
    )]
    InvalidBlendSrcIndex { location: u32, blend_src: u32 },
    #[error(
        "`@blend_src` structure must specify two sources. \
        Found `@blend_src({present_blend_src})` but not `@blend_src({absent_blend_src})`.",
        absent_blend_src = if *present_blend_src == 0 { 1 } else { 0 },
    )]
    IncompleteBlendSrcUsage { present_blend_src: u32 },
    #[error(
        "Structure using `@blend_src` may not specify `@location` on any other members. Found a binding at `@location({location})`."
    )]
    InvalidBlendSrcWithOtherBindings { location: u32 },
    #[error(
        "Both `@blend_src` structure members must have the same type. `blend_src(0)` has type {blend_src_0_type:?} and `blend_src(1)` has type {blend_src_1_type:?}."
    )]
    BlendSrcOutputTypeMismatch {
        blend_src_0_type: Handle<crate::Type>,
        blend_src_1_type: Handle<crate::Type>,
    },
    #[error("`@blend_src` can only be used on struct members, not directly on entry point I/O")]
    BlendSrcNotOnStructMember,
    #[error(
        "Workgroup size is multi dimensional, `@builtin(subgroup_id)` and `@builtin(subgroup_invocation_id)` are not supported."
    )]
    InvalidMultiDimensionalSubgroupBuiltIn,
    #[error(
        "The `@per_primitive` attribute can only be used in fragment shader inputs or mesh shader primitive outputs"
    )]
    InvalidPerPrimitive,
    #[error("Per vertex fragment inputs must be an array of length 3.")]
    PerVertexNotArrayOfThree,
    #[error("A per-view output must be an array with one element per view")]
    PerViewNotArray,
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
    #[error("A per-vertex input or output of this stage must be a sized array")]
    ArrayedInterfaceNotArray,
}

#[derive(Clone, Debug, thiserror::Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum EntryPointError {
    #[error("Multiple conflicting entry points")]
    Conflict,
    #[error("The size of type {0:?} exceeds the limit")]
    TypeTooLarge(Handle<crate::Type>),
    #[error("an entry point cannot be an imported function")]
    Import,
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
    #[error("More than 1 immediate data variable is used in the same push constant bank")]
    MoreThanOneImmediateUsed,
    #[error("Argument {0} varying error")]
    Argument(u32, #[source] VaryingError),
    #[error(transparent)]
    Result(#[from] VaryingError),
    #[error(transparent)]
    Function(#[from] FunctionError),

    #[error("A geometry entry point needs its primitives and vertex count")]
    ExpectedGeometryInfo,
    #[error("Only a geometry entry point has primitives and a vertex count")]
    UnexpectedGeometryInfo,
    #[error("A tessellation control entry point needs its number of output vertices")]
    ExpectedOutputVertices,
    #[error("A tessellation evaluation entry point needs its primitive mode")]
    ExpectedTessellationPrimitive,
    #[error("Only tessellation entry points have tessellation modes")]
    UnexpectedTessellationInfo,
    #[error("Global variable {0:?} is passed through but is not an input of the entry point")]
    InvalidPassthrough(Handle<crate::GlobalVariable>),
    #[error("Stream {1} of global variable {0:?} is not an output of a geometry entry point")]
    InvalidStream(Handle<crate::GlobalVariable>, u32),
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
        "Mesh shader output variable fields must have types that are in accordance with the mesh shader spec"
    )]
    BadMeshOutputVariableField,
    #[error("Mesh shader entry point cannot have a return type")]
    UnexpectedMeshShaderEntryResult,
    #[error("Task payload must be at least 4 bytes, but is {0} bytes")]
    TaskPayloadTooSmall(u32),
    #[error(
        "Only the `ray_generation`, `closest_hit`, and `any_hit` shader stages can access a global variable in the `ray_payload` address space"
    )]
    RayPayloadInInvalidStage(crate::ShaderStage),
    #[error(
        "Only the `closest_hit`, `any_hit`, and `miss` shader stages can access a global variable in the `incoming_ray_payload` address space"
    )]
    IncomingRayPayloadInInvalidStage(crate::ShaderStage),
    #[error("A global variable in the {0:?} address space cannot be used in the {1:?} stage")]
    RayDataInInvalidStage(crate::AddressSpace, crate::ShaderStage),
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

struct VaryingContext<'a> {
    stage: crate::ShaderStage,
    output: bool,
    types: &'a UniqueArena<crate::Type>,
    type_info: &'a Vec<super::r#type::TypeInfo>,
    location_mask: &'a mut BitSet,
    dual_source_blending: Option<&'a mut bool>,
    built_ins: &'a mut crate::FastHashSet<crate::BuiltIn>,
    flags: super::ValidationFlags,
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
                _ => return None,
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

        let mut shapes: crate::FastHashMap<Handle<crate::Type>, Option<Self>> =
            crate::FastHashMap::default();
        let Ok(()) = crate::proc::post_order(
            &mut shapes,
            ty,
            |shapes, ty, children| {
                if shapes.contains_key(&ty) {
                    return false;
                }
                match types[ty].inner {
                    Ti::Array {
                        base,
                        size: crate::ArraySize::Constant(_) | crate::ArraySize::Pending(_),
                        ..
                    } => children.push(base),
                    Ti::Struct { ref members, .. } => {
                        children.extend(members.iter().map(|member| member.ty));
                    }
                    _ => {}
                }
                true
            },
            |shapes, ty| {
                let shape = |ty| shapes.get(&ty).copied().flatten();
                let shape = match types[ty].inner {
                    Ti::Scalar(scalar) => scalar_shape(scalar, 1),
                    Ti::Vector { size, scalar } => scalar_shape(scalar, size as u32),
                    Ti::Matrix {
                        columns,
                        rows,
                        scalar,
                    } => scalar_shape(scalar, rows as u32).map(|column| {
                        // Each column starts a new location.
                        let _: Vs = columns;
                        Self {
                            locations: column.locations * columns as u32,
                            components: 4,
                            ..column
                        }
                    }),
                    Ti::Array {
                        base,
                        size: crate::ArraySize::Constant(length),
                        ..
                    } => shape(base).and_then(|element| {
                        Some(Self {
                            locations: element.locations.checked_mul(length.get())?,
                            ..element
                        })
                    }),
                    Ti::Array {
                        base,
                        size: crate::ArraySize::Pending(_),
                        ..
                    } => shape(base),
                    Ti::Struct { ref members, .. } => {
                        let mut total = Some(Self {
                            locations: 0,
                            components: 4,
                            float: false,
                            non_interpolable: false,
                        });
                        for member in members {
                            total = total.zip(shape(member.ty)).and_then(|(mut total, member)| {
                                total.locations = total.locations.checked_add(member.locations)?;
                                total.float |= member.float;
                                total.non_interpolable |= member.non_interpolable;
                                Some(total)
                            });
                        }
                        total.filter(|total| total.locations > 0)
                    }
                    _ => None,
                };
                shapes.insert(ty, shape);
                Ok::<(), core::convert::Infallible>(())
            },
        );
        shapes.get(&ty).copied().flatten()
    }
}

/// Whether `ty` can hold an index built-in such as `VertexIndex`.
///
/// SPIR-V accepts a 32-bit integer of either signedness for these. WGSL
/// declares them as `u32`, GLSL as `int`.
fn is_array_of(
    types: &UniqueArena<crate::Type>,
    ty: &crate::TypeInner,
    element: &dyn Fn(&crate::TypeInner) -> bool,
) -> bool {
    let mut ty = ty;
    while let crate::TypeInner::Array { base, .. } = *ty {
        ty = &types[base].inner;
        if element(ty) {
            return true;
        }
    }
    false
}

const fn component_matches(component: Component, scalar: crate::Scalar) -> bool {
    match component {
        Component::F32 => matches!(scalar, crate::Scalar::F32),
        Component::I32 => matches!(scalar, crate::Scalar::I32),
        Component::U32 => matches!(scalar, crate::Scalar::U32),
        Component::Bool => matches!(scalar, crate::Scalar::BOOL),
        Component::Index => matches!(scalar, crate::Scalar::I32 | crate::Scalar::U32),
    }
}

fn value_matches(value: BuiltInValue, ty: &crate::TypeInner) -> bool {
    match (value, ty) {
        (BuiltInValue::Scalar(component), &crate::TypeInner::Scalar(scalar)) => {
            component_matches(component, scalar)
        }
        (
            BuiltInValue::Vector(size, component),
            &crate::TypeInner::Vector {
                size: actual,
                scalar,
            },
        ) => u8::from(actual) == size && component_matches(component, scalar),
        (
            BuiltInValue::Matrix { columns, rows },
            &crate::TypeInner::Matrix {
                columns: actual_columns,
                rows: actual_rows,
                scalar,
            },
        ) => {
            u8::from(actual_columns) == columns
                && u8::from(actual_rows) == rows
                && scalar == crate::Scalar::F32
        }
        _ => false,
    }
}

fn built_in_type_matches(
    types: &UniqueArena<crate::Type>,
    ty: &crate::TypeInner,
    expected: BuiltInType,
) -> bool {
    match expected {
        BuiltInType::Any => true,
        BuiltInType::AnyArray => matches!(*ty, crate::TypeInner::Array { .. }),
        BuiltInType::Value(value) => value_matches(value, ty),
        BuiltInType::Array { element, length } => {
            let crate::TypeInner::Array { base, size, .. } = *ty else {
                return false;
            };
            let length_good = match (length, size) {
                (ArrayLength::Any, _) => true,
                (ArrayLength::Constant, crate::ArraySize::Constant(_)) => true,
                (ArrayLength::Exactly(wanted), crate::ArraySize::Constant(actual)) => {
                    actual.get() == wanted
                }
                (ArrayLength::Constant | ArrayLength::Exactly(_), _) => false,
            };
            length_good && value_matches(element, &types[base].inner)
        }
        BuiltInType::NestedArray(element) => {
            is_array_of(types, ty, &|inner| value_matches(element, inner))
        }
        BuiltInType::ValueOrNestedArray { value, element } => {
            value_matches(value, ty)
                || is_array_of(types, ty, &|inner| value_matches(element, inner))
        }
    }
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
        ty: Handle<crate::Type>,
        binding: &crate::Binding,
    ) -> Result<(), VaryingError> {
        use crate::TypeInner as Ti;

        let ty_inner = &self.types[ty].inner;
        match *binding {
            crate::Binding::BuiltIn(built_in) => {
                let canonical = built_in.canonical();
                if self.built_ins.contains(&canonical) {
                    return Err(VaryingError::DuplicateBuiltIn(built_in));
                }
                self.built_ins.insert(canonical);

                let info = built_in.info();
                let stages = if self.output {
                    info.outputs
                } else {
                    info.inputs
                };
                let mesh = self.stage == crate::ShaderStage::Mesh;
                let visible = stages.has(self.stage)
                    || match info.mesh {
                        MeshAccess::Stages => false,
                        MeshAccess::InterfaceOutput => mesh && self.output && self.interface,
                        MeshAccess::InputWithoutTaskPayload => {
                            mesh && !self.output && (!self.has_task_payload || self.interface)
                        }
                    };
                let type_good = built_in_type_matches(self.types, ty_inner, info.ty);

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
                per_view,
                passthrough,
            } => {
                if invariant && !self.output {
                    return Err(VaryingError::InvalidInputAttributeInStage(
                        "invariant",
                        self.stage,
                    ));
                }
                if passthrough && (self.stage != crate::ShaderStage::Geometry || self.output) {
                    return Err(VaryingError::InvalidAttributeInStage(
                        "passthrough",
                        self.stage,
                    ));
                }
                if patch
                    && !matches!(
                        (self.stage, self.output),
                        (crate::ShaderStage::TessControl, true)
                            | (crate::ShaderStage::TessEvaluation, false)
                    )
                {
                    return Err(VaryingError::InvalidAttributeInStage("patch", self.stage));
                }
                let per_vertex =
                    matches!(interpolation, Some(crate::Interpolation::PerVertex { .. }));
                if let Some(per_vertex @ crate::Interpolation::PerVertex { .. }) = interpolation {
                    if self.stage != crate::ShaderStage::Fragment {
                        return Err(VaryingError::InvalidInterpolationInStage(
                            per_vertex,
                            crate::ShaderStage::Fragment,
                        ));
                    }
                    if sampling.is_some_and(|e| e != crate::Sampling::Center) {
                        return Err(VaryingError::InvalidPerVertexSampling);
                    }
                }
                let (ty, ty_inner) = if per_vertex {
                    if let Ti::Array {
                        base,
                        size: crate::ArraySize::Constant(size),
                        ..
                    } = *ty_inner
                        && size.get() == 3
                    {
                        (base, &self.types[base].inner)
                    } else {
                        return Err(VaryingError::PerVertexNotArrayOfThree);
                    }
                } else {
                    (ty, ty_inner)
                };
                let (ty, ty_inner) = if per_view {
                    if self.stage != crate::ShaderStage::Mesh || !self.output {
                        return Err(VaryingError::InvalidAttributeInStage(
                            "per_view", self.stage,
                        ));
                    }
                    if let Ti::Array {
                        base,
                        size: crate::ArraySize::Constant(_),
                        ..
                    } = *ty_inner
                    {
                        (base, &self.types[base].inner)
                    } else {
                        return Err(VaryingError::PerViewNotArray);
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
                if (self.stage == crate::ShaderStage::Fragment && !self.output)
                    || (self.stage == crate::ShaderStage::Mesh && self.output && self.interface)
                {
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
                        return Err(VaryingError::BlendSrcNotOnStructMember);
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
                        if index == 1
                            && let Some(dual_source_blending) = self.dual_source_blending.as_mut()
                        {
                            **dual_source_blending = true;
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
                        (crate::Interpolation::Flat, Some(_)) if self.interface => None,
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
                    crate::ShaderStage::Vertex
                    | crate::ShaderStage::TessControl
                    | crate::ShaderStage::TessEvaluation
                    | crate::ShaderStage::Geometry => self.output,
                    crate::ShaderStage::Fragment => !self.output && !per_primitive,

                    crate::ShaderStage::Mesh => self.output,
                    _ => false,
                };

                // It doesn't make sense to specify a sampling when `interpolation` is `Flat`, but
                // SPIR-V and GLSL both explicitly tolerate such combinations of decorators /
                // qualifiers, so we won't complain about that here.
                let _ = sampling;

                if !per_vertex {
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
        ty: Handle<crate::Type>,
        binding: Option<&crate::Binding>,
    ) -> Result<(), WithSpan<VaryingError>> {
        let span_context = self.types.get_span_context(ty);
        match binding {
            Some(binding) => self
                .validate_impl(ty, binding)
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

                    if let Some(dual_source_blending) = self.dual_source_blending.as_mut() {
                        **dual_source_blending = true;
                    }
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
                                .validate_impl(member.ty, binding)
                                .map_err(|e| e.with_span_context(span_context))?,
                        }
                    }
                }
                Ok(())
            }
        }
    }
}

fn view_element(
    types: &UniqueArena<crate::Type>,
    ty: Handle<crate::Type>,
    per_view: bool,
) -> Handle<crate::Type> {
    if per_view && let crate::TypeInner::Array { base, .. } = types[ty].inner {
        base
    } else {
        ty
    }
}

impl VaryingContext<'_> {
    fn per_vertex_block(
        &self,
        ty: Handle<crate::Type>,
        io: Option<&crate::Binding>,
    ) -> Result<Option<(Handle<crate::Type>, crate::Binding)>, WithSpan<VaryingError>> {
        let Some(&crate::Binding::Location {
            interpolation: Some(interpolation @ crate::Interpolation::PerVertex { .. }),
            ..
        }) = io
        else {
            return Ok(None);
        };
        let crate::TypeInner::Array { base, size, .. } = self.types[ty].inner else {
            return Ok(None);
        };
        if crate::proc::interface_block(self.types, base).is_none() {
            return Ok(None);
        }
        let fail =
            |error: VaryingError| Err(error.with_span_context(self.types.get_span_context(ty)));
        if self.stage != crate::ShaderStage::Fragment || self.output {
            return fail(VaryingError::InvalidInterpolationInStage(
                interpolation,
                crate::ShaderStage::Fragment,
            ));
        }
        if !matches!(size, crate::ArraySize::Constant(length) if length.get() == 3) {
            return fail(VaryingError::PerVertexNotArrayOfThree);
        }
        let mut binding = io.cloned();
        if let Some(crate::Binding::Location {
            ref mut interpolation,
            ..
        }) = binding
        {
            *interpolation = None;
        }
        Ok(binding.map(|binding| (base, binding)))
    }

    fn validate_interface(
        &mut self,
        ty: Handle<crate::Type>,
        io: Option<&crate::Binding>,
    ) -> Result<(), WithSpan<VaryingError>> {
        if let Some((element, binding)) = self.per_vertex_block(ty, io)? {
            return self.validate_interface(element, Some(&binding));
        }
        let Some(block) = crate::proc::interface_block(self.types, ty) else {
            return self.validate(ty, io);
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
                    )));
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
                    self.validate_impl(member.ty, binding).map_err(&fail)?;
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
            per_view: false,
            passthrough: false,
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
                    per_view,
                    passthrough,
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
                    per_view,
                    passthrough,
                };
                self.validate_impl(member.ty, &binding).map_err(&fail)?;
                let shape =
                    LocationShape::of(self.types, view_element(self.types, member.ty, per_view))
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
            let element =
                if let crate::TypeInner::BindingArray { base, .. } = gctx.types[var.ty].inner {
                    base
                } else {
                    var.ty
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
        let inner_ty = if let crate::TypeInner::BindingArray { base, .. } = gctx.types[var.ty].inner
        {
            match var.space {
                crate::AddressSpace::Storage { .. } | crate::AddressSpace::Uniform => base,
                crate::AddressSpace::Handle => {
                    match gctx.types[base].inner {
                        crate::TypeInner::Image { class, .. } => match class {
                            crate::ImageClass::Storage { .. } => {}
                            crate::ImageClass::Sampled { .. } | crate::ImageClass::Depth { .. } => {
                            }
                        },
                        crate::TypeInner::Sampler { .. }
                        | crate::TypeInner::SampledImage { .. }
                        | crate::TypeInner::AccelerationStructure => {}
                        crate::TypeInner::RayQuery => {
                            return Err(GlobalVariableError::InvalidType(var.space));
                        }
                        _ => {}
                    }
                    base
                }
                _ => {
                    return Err(GlobalVariableError::InvalidUsage(var.space));
                }
            }
        } else {
            var.ty
        };
        let type_info = &self.types[inner_ty.index()];

        if var.heap_offset.is_some() && !matches!(var.space, crate::AddressSpace::DescriptorHeap(_))
        {
            return Err(GlobalVariableError::InvalidUsage(var.space));
        }
        match var.block {
            None => {}
            Some(crate::BlockDeclaration::Shared) => {
                if var.space != crate::AddressSpace::WorkGroup {
                    return Err(GlobalVariableError::InvalidUsage(var.space));
                }
                if !matches!(gctx.types[var.ty].inner, crate::TypeInner::Struct { .. }) {
                    return Err(GlobalVariableError::InvalidType(var.space));
                }
            }
            Some(crate::BlockDeclaration::Uniform | crate::BlockDeclaration::Buffer) => {
                if var.space != crate::AddressSpace::ShaderRecord {
                    return Err(GlobalVariableError::InvalidUsage(var.space));
                }
            }
            Some(crate::BlockDeclaration::RayTracing) => {
                if !matches!(
                    var.space,
                    crate::AddressSpace::RayPayload
                        | crate::AddressSpace::IncomingRayPayload
                        | crate::AddressSpace::HitAttribute
                        | crate::AddressSpace::CallableData
                        | crate::AddressSpace::IncomingCallableData
                        | crate::AddressSpace::HitObjectAttribute { .. }
                ) {
                    return Err(GlobalVariableError::InvalidUsage(var.space));
                }
            }
        }
        let (required_type_flags, is_resource) = match var.space {
            crate::AddressSpace::Function | crate::AddressSpace::PhysicalStorage { .. } => {
                return Err(GlobalVariableError::InvalidUsage(var.space));
            }
            crate::AddressSpace::DescriptorHeap(_) => {
                if !type_info.flags.contains(TypeFlags::HEAP_LAYOUT)
                    && !type_info.flags.contains(TypeFlags::DATA)
                {
                    return Err(GlobalVariableError::InvalidType(var.space));
                }
                (TypeFlags::CREATION_RESOLVED, false)
            }
            crate::AddressSpace::Storage { access: _ } => {
                if let Err((ty_handle, disalignment)) = type_info.storage_layout
                    && self.flags.contains(super::ValidationFlags::STRUCT_LAYOUTS)
                {
                    return Err(GlobalVariableError::Alignment(
                        var.space,
                        ty_handle,
                        disalignment,
                    ));
                }
                (
                    TypeFlags::DATA | TypeFlags::HOST_SHAREABLE | TypeFlags::CREATION_RESOLVED,
                    true,
                )
            }
            crate::AddressSpace::Uniform => {
                if let Err((ty_handle, disalignment)) = type_info.uniform_layout
                    && self.flags.contains(super::ValidationFlags::STRUCT_LAYOUTS)
                {
                    return Err(GlobalVariableError::Alignment(
                        var.space,
                        ty_handle,
                        disalignment,
                    ));
                }
                let flags = if matches!(gctx.types[inner_ty].inner, crate::TypeInner::Struct { .. })
                {
                    TypeFlags::DATA | TypeFlags::HOST_SHAREABLE | TypeFlags::CREATION_RESOLVED
                } else {
                    TypeFlags::DATA
                        | TypeFlags::COPY
                        | TypeFlags::SIZED
                        | TypeFlags::HOST_SHAREABLE
                        | TypeFlags::CREATION_RESOLVED
                };
                (flags, true)
            }
            crate::AddressSpace::Handle => {
                match gctx.types[inner_ty].inner {
                    crate::TypeInner::Image { .. }
                    | crate::TypeInner::Sampler { .. }
                    | crate::TypeInner::SampledImage { .. }
                    | crate::TypeInner::AccelerationStructure
                    | crate::TypeInner::Tensor { .. }
                    | crate::TypeInner::Spirv { .. }
                    | crate::TypeInner::RayQuery => {}
                    _ => {
                        return Err(GlobalVariableError::InvalidType(var.space));
                    }
                }

                (TypeFlags::empty(), true)
            }
            crate::AddressSpace::Private
                if crate::proc::contains_ray_object(gctx.types, inner_ty) =>
            {
                if var.init.is_some() {
                    return Err(GlobalVariableError::InitializerNotAllowed(var.space));
                }
                (TypeFlags::empty(), false)
            }
            crate::AddressSpace::Private => (
                TypeFlags::CONSTRUCTIBLE | TypeFlags::CREATION_RESOLVED,
                false,
            ),
            crate::AddressSpace::WorkGroup
                if var.block == Some(crate::BlockDeclaration::Shared) =>
            {
                if let Err((ty_handle, disalignment)) = type_info.storage_layout
                    && self.flags.contains(super::ValidationFlags::STRUCT_LAYOUTS)
                {
                    return Err(GlobalVariableError::Alignment(
                        var.space,
                        ty_handle,
                        disalignment,
                    ));
                }
                (
                    TypeFlags::DATA
                        | TypeFlags::HOST_SHAREABLE
                        | TypeFlags::SIZED
                        | TypeFlags::CREATION_RESOLVED,
                    false,
                )
            }
            crate::AddressSpace::WorkGroup => (TypeFlags::DATA | TypeFlags::SIZED, false),
            crate::AddressSpace::TaskPayload => (TypeFlags::DATA | TypeFlags::SIZED, false),
            crate::AddressSpace::Immediate => {
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
            crate::AddressSpace::RayPayload
            | crate::AddressSpace::IncomingRayPayload
            | crate::AddressSpace::HitAttribute
            | crate::AddressSpace::CallableData
            | crate::AddressSpace::IncomingCallableData
            | crate::AddressSpace::HitObjectAttribute { .. } => {
                (TypeFlags::DATA | TypeFlags::SIZED, false)
            }
            crate::AddressSpace::ShaderRecord => (
                TypeFlags::DATA | TypeFlags::HOST_SHAREABLE | TypeFlags::CREATION_RESOLVED,
                false,
            ),
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

        let located_tile_image = var.binding.is_none()
            && matches!(var.io, Some(crate::Binding::Location { .. }))
            && matches!(
                gctx.types[inner_ty].inner,
                crate::TypeInner::Image {
                    dim: crate::ImageDimension::TileImageData,
                    ..
                }
            );
        if is_resource != var.binding.is_some()
            && !located_tile_image
            && self.flags.contains(super::ValidationFlags::BINDINGS)
        {
            return Err(GlobalVariableError::InvalidBinding);
        }

        let is_interface = matches!(
            var.space,
            crate::AddressSpace::Input | crate::AddressSpace::Output
        );
        let ray_location = matches!(
            var.space,
            crate::AddressSpace::RayPayload
                | crate::AddressSpace::IncomingRayPayload
                | crate::AddressSpace::CallableData
                | crate::AddressSpace::IncomingCallableData
                | crate::AddressSpace::HitObjectAttribute { .. }
        ) && matches!(var.io, None | Some(crate::Binding::Location { .. }));
        let tile_image = var.space == crate::AddressSpace::Handle
            && matches!(var.io, Some(crate::Binding::Location { .. }))
            && matches!(
                gctx.types[inner_ty].inner,
                crate::TypeInner::Image {
                    dim: crate::ImageDimension::TileImageData,
                    ..
                }
            );
        if var.io.is_some() && !is_interface && !ray_location && !tile_image {
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

        let ray_tmax = var.space == crate::AddressSpace::Input
            && var.io == Some(crate::Binding::BuiltIn(crate::BuiltIn::RayTCurrentMax));
        let volatile_input = var.space == crate::AddressSpace::Input
            && var.memory_decorations == crate::MemoryDecorations::VOLATILE;
        let workgroup_block_memory = var.space == crate::AddressSpace::WorkGroup
            && var.block == Some(crate::BlockDeclaration::Shared)
            && !var.memory_decorations.intersects(
                crate::MemoryDecorations::NON_WRITABLE | crate::MemoryDecorations::NON_READABLE,
            );
        if !var.memory_decorations.is_empty()
            && !ray_tmax
            && !volatile_input
            && !workgroup_block_memory
            && !matches!(
                var.space,
                crate::AddressSpace::Storage { .. }
                    | crate::AddressSpace::Handle
                    | crate::AddressSpace::Uniform
            )
        {
            return Err(GlobalVariableError::InvalidMemoryDecorationsAddressSpace);
        }

        if let Some(init) = var.init {
            match var.space {
                crate::AddressSpace::Private | crate::AddressSpace::Function => {}
                crate::AddressSpace::WorkGroup
                    if var.block.is_none()
                        && matches!(
                            gctx.global_expressions[init],
                            crate::Expression::ZeroValue(_)
                        ) => {}
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

    fn validate_stage_info(
        ep: &crate::EntryPoint,
        module: &crate::Module,
        object: bool,
    ) -> Result<(), WithSpan<EntryPointError>> {
        match (ep.stage, &ep.geometry) {
            (crate::ShaderStage::Geometry, &None) if object => {}
            (crate::ShaderStage::Geometry, &None) => {
                return Err(EntryPointError::ExpectedGeometryInfo.with_span());
            }
            (crate::ShaderStage::Geometry, &Some(ref geometry)) => {
                for &handle in &geometry.passthrough {
                    let valid = module.global_variables[handle].space == crate::AddressSpace::Input
                        && ep.interface.contains(&handle);
                    if !valid {
                        return Err(EntryPointError::InvalidPassthrough(handle).with_span());
                    }
                }
                for &(handle, stream) in &geometry.streams {
                    let valid = module.global_variables[handle].space
                        == crate::AddressSpace::Output
                        && ep.interface.contains(&handle);
                    if !valid {
                        return Err(EntryPointError::InvalidStream(handle, stream).with_span());
                    }
                }
            }
            (_, &Some(_)) => {
                return Err(EntryPointError::UnexpectedGeometryInfo.with_span());
            }
            (_, &None) => {}
        }
        match (ep.stage, ep.tessellation) {
            (
                crate::ShaderStage::TessControl,
                Some(crate::TessellationInfo {
                    output_vertices: Some(_),
                    ..
                }),
            )
            | (
                crate::ShaderStage::TessEvaluation,
                Some(crate::TessellationInfo {
                    primitive: Some(_), ..
                }),
            ) => Ok(()),
            (crate::ShaderStage::TessControl | crate::ShaderStage::TessEvaluation, _) if object => {
                Ok(())
            }
            (crate::ShaderStage::TessControl, _) => {
                Err(EntryPointError::ExpectedOutputVertices.with_span())
            }
            (crate::ShaderStage::TessEvaluation, _) => {
                Err(EntryPointError::ExpectedTessellationPrimitive.with_span())
            }
            (_, Some(_)) => Err(EntryPointError::UnexpectedTessellationInfo.with_span()),
            (_, None) => Ok(()),
        }
    }

    pub(super) fn validate_entry_point(
        &mut self,
        ep: &crate::EntryPoint,
        module: &crate::Module,
        mod_info: &ModuleInfo,
    ) -> Result<FunctionInfo, WithSpan<EntryPointError>> {
        if ep.early_depth_test.is_some() && ep.stage != crate::ShaderStage::Fragment {
            return Err(EntryPointError::UnexpectedEarlyDepthTest.with_span());
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

        Self::validate_stage_info(ep, module, self.mode == super::ValidationMode::Object)?;

        let glsl_mesh = ep.mesh_shader.is_some();
        match (ep.stage, &ep.mesh_shader) {
            (
                crate::ShaderStage::Mesh,
                &Some(crate::MeshShaderInfo {
                    output: Some(_), ..
                }),
            )
            | (
                crate::ShaderStage::Task | crate::ShaderStage::Fragment,
                &Some(crate::MeshShaderInfo { output: None, .. }),
            )
            | (_, &None) => {}
            (crate::ShaderStage::Mesh, &Some(crate::MeshShaderInfo { output: None, .. }))
                if self.mode == super::ValidationMode::Object => {}
            (_, &Some(_)) => {
                return Err(EntryPointError::UnexpectedMeshShaderAttributes.with_span());
            }
        }
        if ep.stage == crate::ShaderStage::Mesh && !glsl_mesh {
            return Err(EntryPointError::ExpectedMeshShaderAttributes.with_span());
        }

        let mut info = self
            .validate_function(&ep.function, module, mod_info, true)
            .map_err(WithSpan::into_other)?;

        // Validate the task shader payload.
        match ep.stage {
            // Task shaders must produce a payload.
            crate::ShaderStage::Task if glsl_mesh && ep.task_payload.is_none() => {}
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
            }

            _ => {
                if let Some(handle) = ep.task_payload {
                    return Err(EntryPointError::UnexpectedTaskPayload
                        .with_span_handle(handle, &module.global_variables));
                }
            }
        }

        if !info.available_stages.has(ep.stage) {
            return Err(EntryPointError::ForbiddenStageOperations.with_span());
        }
        if !matches!(
            ep.stage,
            crate::ShaderStage::Compute | crate::ShaderStage::Mesh | crate::ShaderStage::Task
        ) && module.global_variables.iter().any(|(_, var)| {
            var.space == crate::AddressSpace::WorkGroup
                && var.block == Some(crate::BlockDeclaration::Shared)
        }) {
            return Err(EntryPointError::ForbiddenStageOperations.with_span());
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
                flags: self.flags,
                has_task_payload: ep.task_payload.is_some(),
                interface: false,
            };
            ctx.validate(fa.ty, fa.binding.as_ref())
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
                flags: self.flags,
                has_task_payload: ep.task_payload.is_some(),
                interface: false,
            };
            ctx.validate(fr.ty, fr.binding.as_ref())
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
        } else if ep.stage == crate::ShaderStage::Task && !glsl_mesh {
            return Err(EntryPointError::WrongTaskShaderEntryResult.with_span());
        }

        // Inputs and outputs that are global variables. They share the
        // location space of the arguments and of the result, respectively.
        {
            let mut seen = crate::FastHashSet::default();
            let mut input_mask = BitSet::new();
            let mut output_mask = BitSet::new();
            let mut patch_input_mask = BitSet::new();
            let mut patch_output_mask = BitSet::new();
            let mut input_built_ins = crate::FastHashSet::default();
            let mut output_built_ins = crate::FastHashSet::default();
            for &handle in &ep.interface {
                let var = &module.global_variables[handle];
                let output = match var.space {
                    crate::AddressSpace::Input => false,
                    crate::AddressSpace::Output => true,
                    _ => {
                        return Err(EntryPointError::InterfaceNotInputOrOutput(handle)
                            .with_span_handle(handle, &module.global_variables));
                    }
                };
                if !seen.insert(handle) {
                    return Err(EntryPointError::InterfaceDuplicate(handle)
                        .with_span_handle(handle, &module.global_variables));
                }
                if var.io.is_none() && crate::proc::has_spirv_built_in(var) {
                    continue;
                }
                let patch = crate::proc::is_patch_variable(&module.types, var);
                let passthrough = ep
                    .geometry
                    .as_ref()
                    .is_some_and(|geometry| geometry.passthrough.contains(&handle));
                let arrayed = !passthrough
                    && crate::proc::is_per_vertex_variable(ep.stage, &module.types, var);
                let ty = if arrayed {
                    let crate::TypeInner::Array {
                        base,
                        size: crate::ArraySize::Constant(_),
                        ..
                    } = module.types[var.ty].inner
                    else {
                        return Err(EntryPointError::InterfaceVariable(
                            handle,
                            VaryingError::ArrayedInterfaceNotArray,
                        )
                        .with_span_handle(handle, &module.global_variables));
                    };
                    base
                } else {
                    var.ty
                };
                let mut ctx = VaryingContext {
                    stage: ep.stage,
                    output,
                    types: &module.types,
                    type_info: &self.types,
                    location_mask: match (output, patch) {
                        (true, false) => &mut output_mask,
                        (false, false) => &mut input_mask,
                        (true, true) => &mut patch_output_mask,
                        (false, true) => &mut patch_input_mask,
                    },
                    dual_source_blending: Some(&mut info.dual_source_blending),
                    built_ins: if output {
                        &mut output_built_ins
                    } else {
                        &mut input_built_ins
                    },
                    flags: self.flags,
                    has_task_payload: ep.task_payload.is_some(),
                    interface: true,
                };
                ctx.validate_interface(ty, var.io.as_ref()).map_err(|e| {
                    EntryPointError::InterfaceVariable(handle, e.into_inner())
                        .with_span_handle(handle, &module.global_variables)
                })?;
            }
        }

        {
            let mut banks = crate::FastHashSet::default();
            for (handle, var) in module.global_variables.iter() {
                if var.space != crate::AddressSpace::Immediate || info[handle].is_empty() {
                    continue;
                }
                let bank = var.immediate_bank.unwrap_or_default();
                let key = (bank.bank.unwrap_or(0), bank.member_offset.unwrap_or(0));
                if !banks.insert(key) {
                    return Err(EntryPointError::MoreThanOneImmediateUsed
                        .with_span_handle(handle, &module.global_variables));
                }
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
                let Some(size) = module.types[var.ty].inner.try_size(module.to_ctx()) else {
                    return Err(EntryPointError::TypeTooLarge(var.ty)
                        .with_span_handle(var_handle, &module.global_variables));
                };
                if size < 4 {
                    return Err(EntryPointError::TaskPayloadTooSmall(size)
                        .with_span_handle(var_handle, &module.global_variables));
                }
            }

            let allowed_usage = match var.space {
                crate::AddressSpace::Function | crate::AddressSpace::PhysicalStorage { .. } => {
                    GlobalUse::empty()
                }
                crate::AddressSpace::DescriptorHeap(_) => GlobalUse::READ | GlobalUse::QUERY,
                crate::AddressSpace::Uniform => GlobalUse::READ | GlobalUse::QUERY,
                crate::AddressSpace::Storage { access } => storage_usage(access),
                crate::AddressSpace::Handle => {
                    let handle_ty = if let crate::TypeInner::BindingArray { base, .. } =
                        module.types[var.ty].inner
                    {
                        base
                    } else {
                        var.ty
                    };
                    match module.types[handle_ty].inner {
                        crate::TypeInner::Image {
                            class: crate::ImageClass::Storage { access, .. },
                            ..
                        } => storage_usage(access),
                        crate::TypeInner::Image {
                            class:
                                crate::ImageClass::Sampled { .. } | crate::ImageClass::Depth { .. },
                            ..
                        } => GlobalUse::READ | GlobalUse::QUERY,
                        crate::TypeInner::Tensor { .. } => {
                            GlobalUse::READ | GlobalUse::QUERY | GlobalUse::WRITE
                        }
                        _ => GlobalUse::READ | GlobalUse::QUERY,
                    }
                }
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
                            | crate::ShaderStage::AnyHit
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
                crate::AddressSpace::HitAttribute => {
                    let writable = match ep.stage {
                        crate::ShaderStage::Intersection => true,
                        crate::ShaderStage::AnyHit | crate::ShaderStage::ClosestHit => false,
                        stage => {
                            return Err(EntryPointError::RayDataInInvalidStage(var.space, stage)
                                .with_span_handle(var_handle, &module.global_variables));
                        }
                    };
                    GlobalUse::READ
                        | GlobalUse::QUERY
                        | if writable {
                            GlobalUse::WRITE
                        } else {
                            GlobalUse::empty()
                        }
                }
                crate::AddressSpace::CallableData => {
                    if !matches!(
                        ep.stage,
                        crate::ShaderStage::RayGeneration
                            | crate::ShaderStage::ClosestHit
                            | crate::ShaderStage::Miss
                            | crate::ShaderStage::Callable
                    ) {
                        return Err(EntryPointError::RayDataInInvalidStage(var.space, ep.stage)
                            .with_span_handle(var_handle, &module.global_variables));
                    }
                    GlobalUse::READ | GlobalUse::QUERY | GlobalUse::WRITE
                }
                crate::AddressSpace::IncomingCallableData => {
                    if ep.stage != crate::ShaderStage::Callable {
                        return Err(EntryPointError::RayDataInInvalidStage(var.space, ep.stage)
                            .with_span_handle(var_handle, &module.global_variables));
                    }
                    GlobalUse::READ | GlobalUse::QUERY | GlobalUse::WRITE
                }
                crate::AddressSpace::HitObjectAttribute { .. } => {
                    if !matches!(
                        ep.stage,
                        crate::ShaderStage::RayGeneration
                            | crate::ShaderStage::ClosestHit
                            | crate::ShaderStage::Miss
                    ) {
                        return Err(EntryPointError::RayDataInInvalidStage(var.space, ep.stage)
                            .with_span_handle(var_handle, &module.global_variables));
                    }
                    GlobalUse::READ | GlobalUse::QUERY | GlobalUse::WRITE
                }
                crate::AddressSpace::ShaderRecord => {
                    if !ep.stage.ray_tracing() {
                        return Err(EntryPointError::RayDataInInvalidStage(var.space, ep.stage)
                            .with_span_handle(var_handle, &module.global_variables));
                    }
                    GlobalUse::READ | GlobalUse::QUERY
                }
            };
            if !allowed_usage.contains(usage) {
                log::warn!("\tUsage error for: {var:?}");
                log::warn!("\tAllowed usage: {allowed_usage:?}, requested: {usage:?}");
                return Err(EntryPointError::InvalidGlobalUsage(var_handle, usage)
                    .with_span_handle(var_handle, &module.global_variables));
            }
        }

        Ok(info)
    }
}
