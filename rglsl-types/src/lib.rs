#![cfg_attr(docsrs, feature(doc_cfg))]
#![no_std]
extern crate alloc;
#[cfg(feature = "std")]
extern crate std;

pub mod probe;
pub mod small_float;
pub mod spv;
pub mod stack;

/// Stage of the programmable pipeline.
#[derive(Clone, Copy, Debug, Hash, Eq, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(serde::Serialize))]
#[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub enum ShaderStage {
    /// A vertex shader, in a render pipeline.
    Vertex,

    TessControl,

    TessEvaluation,

    Geometry,

    /// A task shader, in a mesh render pipeline.
    Task,

    /// A mesh shader, in a mesh render pipeline.
    Mesh,

    /// A fragment shader, in a render pipeline.
    Fragment,

    /// Compute pipeline shader.
    Compute,

    /// A ray generation shader, in a ray tracing pipeline.
    RayGeneration,

    /// A miss shader, in a ray tracing pipeline.
    Miss,

    /// A any hit shader, in a ray tracing pipeline.
    AnyHit,

    /// A closest hit shader, in a ray tracing pipeline.
    ClosestHit,

    Intersection,

    Callable,
}

impl ShaderStage {
    pub const ALL: [Self; 14] = [
        Self::Vertex,
        Self::TessControl,
        Self::TessEvaluation,
        Self::Geometry,
        Self::Fragment,
        Self::Compute,
        Self::Task,
        Self::Mesh,
        Self::RayGeneration,
        Self::Intersection,
        Self::AnyHit,
        Self::ClosestHit,
        Self::Miss,
        Self::Callable,
    ];

    pub const fn name(self) -> &'static str {
        match self {
            Self::Vertex => "vertex",
            Self::TessControl => "tessellation control",
            Self::TessEvaluation => "tessellation evaluation",
            Self::Geometry => "geometry",
            Self::Task => "task",
            Self::Mesh => "mesh",
            Self::Fragment => "fragment",
            Self::Compute => "compute",
            Self::RayGeneration => "ray generation",
            Self::Miss => "miss",
            Self::AnyHit => "any-hit",
            Self::ClosestHit => "closest-hit",
            Self::Intersection => "intersection",
            Self::Callable => "callable",
        }
    }

    pub const fn compute_like(self) -> bool {
        match self {
            Self::Vertex | Self::Fragment => false,
            Self::TessControl | Self::TessEvaluation | Self::Geometry => false,
            Self::Compute | Self::Task | Self::Mesh => true,
            Self::RayGeneration
            | Self::AnyHit
            | Self::ClosestHit
            | Self::Miss
            | Self::Intersection
            | Self::Callable => false,
        }
    }

    pub const fn ray_tracing(self) -> bool {
        matches!(
            self,
            Self::RayGeneration
                | Self::Intersection
                | Self::AnyHit
                | Self::ClosestHit
                | Self::Miss
                | Self::Callable
        )
    }

    pub const fn has_arrayed_io(self) -> bool {
        matches!(
            self,
            Self::TessControl | Self::TessEvaluation | Self::Geometry
        )
    }

    /// Mesh or task shader
    pub const fn mesh_like(self) -> bool {
        matches!(self, Self::Task | Self::Mesh)
    }
}

/// Hash map that is faster but not resilient to DoS attacks.
/// (Similar to rustc_hash::FxHashMap but using hashbrown::HashMap instead of alloc::collections::HashMap.)
/// To construct a new instance: `FastHashMap::default()`
pub type FastHashMap<K, T> =
    hashbrown::HashMap<K, T, core::hash::BuildHasherDefault<rustc_hash::FxHasher>>;

/// Hash set that is faster but not resilient to DoS attacks.
/// (Similar to rustc_hash::FxHashSet but using hashbrown::HashSet instead of alloc::collections::HashMap.)
pub type FastHashSet<K> =
    hashbrown::HashSet<K, core::hash::BuildHasherDefault<rustc_hash::FxHasher>>;

/// Insertion-order-preserving hash set (`IndexSet<K>`), but with the same
/// hasher as `FastHashSet<K>` (faster but not resilient to DoS attacks).
pub type FastIndexSet<K> =
    indexmap::IndexSet<K, core::hash::BuildHasherDefault<rustc_hash::FxHasher>>;

/// Insertion-order-preserving hash map (`IndexMap<K, V>`), but with the same
/// hasher as `FastHashMap<K, V>` (faster but not resilient to DoS attacks).
pub type FastIndexMap<K, V> =
    indexmap::IndexMap<K, V, core::hash::BuildHasherDefault<rustc_hash::FxHasher>>;

/// Pipeline binding information for global resources.
#[derive(Copy, Clone, Debug, Eq, Hash, Ord, PartialEq, PartialOrd)]
#[cfg_attr(feature = "serialize", derive(serde::Serialize))]
#[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub struct ResourceBinding {
    /// The bind group index.
    pub group: u32,
    /// Binding number within the group.
    pub binding: u32,
}

#[derive(Clone, Copy, Debug, PartialEq, Eq, Hash)]
#[cfg_attr(feature = "serialize", derive(serde::Serialize))]
#[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
pub struct TaskDispatchLimits {
    pub max_mesh_workgroups_per_dim: u32,
    pub max_mesh_workgroups_total: u32,
}
