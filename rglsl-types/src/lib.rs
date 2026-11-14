#![cfg_attr(docsrs, feature(doc_cfg))]
#![no_std]
extern crate alloc;
#[cfg(feature = "std")]
extern crate std;

pub mod builtin;
pub mod extension;
pub mod flavor;
pub mod probe;
pub mod small_float;
pub mod spv;
pub mod stack;

pub use flavor::Flavor;

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

    pub fn from_extension(extension: &str) -> Option<Self> {
        Some(match extension {
            "vert" => Self::Vertex,
            "tesc" => Self::TessControl,
            "tese" => Self::TessEvaluation,
            "geom" => Self::Geometry,
            "frag" => Self::Fragment,
            "comp" => Self::Compute,
            "task" => Self::Task,
            "mesh" => Self::Mesh,
            "rgen" => Self::RayGeneration,
            "rint" => Self::Intersection,
            "rahit" => Self::AnyHit,
            "rchit" => Self::ClosestHit,
            "rmiss" => Self::Miss,
            "rcall" => Self::Callable,
            _ => return None,
        })
    }

    pub const fn extension(self) -> &'static str {
        match self {
            Self::Vertex => "vert",
            Self::TessControl => "tesc",
            Self::TessEvaluation => "tese",
            Self::Geometry => "geom",
            Self::Fragment => "frag",
            Self::Compute => "comp",
            Self::Task => "task",
            Self::Mesh => "mesh",
            Self::RayGeneration => "rgen",
            Self::Miss => "rmiss",
            Self::AnyHit => "rahit",
            Self::ClosestHit => "rchit",
            Self::Intersection => "rint",
            Self::Callable => "rcall",
        }
    }

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

bitflags::bitflags! {
    #[derive(Clone, Copy, Debug, Default, Hash, Eq, Ord, PartialEq, PartialOrd)]
    #[cfg_attr(feature = "serialize", derive(serde::Serialize))]
    #[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
    #[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
    pub struct ShaderStageMask: u16 {
        const VERTEX = 1 << 0;
        const TESS_CONTROL = 1 << 1;
        const TESS_EVALUATION = 1 << 2;
        const GEOMETRY = 1 << 3;
        const FRAGMENT = 1 << 4;
        const COMPUTE = 1 << 5;
        const TASK = 1 << 6;
        const MESH = 1 << 7;
        const RAY_GENERATION = 1 << 8;
        const INTERSECTION = 1 << 9;
        const ANY_HIT = 1 << 10;
        const CLOSEST_HIT = 1 << 11;
        const MISS = 1 << 12;
        const CALLABLE = 1 << 13;
    }
}

impl ShaderStageMask {
    pub const MESH_LIKE: Self = Self::TASK.union(Self::MESH);
    pub const COMPUTE_LIKE: Self = Self::COMPUTE.union(Self::MESH_LIKE);
    pub const RAY_TRACING: Self = Self::RAY_GENERATION
        .union(Self::INTERSECTION)
        .union(Self::ANY_HIT)
        .union(Self::CLOSEST_HIT)
        .union(Self::MISS)
        .union(Self::CALLABLE);

    pub const fn of(stage: ShaderStage) -> Self {
        match stage {
            ShaderStage::Vertex => Self::VERTEX,
            ShaderStage::TessControl => Self::TESS_CONTROL,
            ShaderStage::TessEvaluation => Self::TESS_EVALUATION,
            ShaderStage::Geometry => Self::GEOMETRY,
            ShaderStage::Fragment => Self::FRAGMENT,
            ShaderStage::Compute => Self::COMPUTE,
            ShaderStage::Task => Self::TASK,
            ShaderStage::Mesh => Self::MESH,
            ShaderStage::RayGeneration => Self::RAY_GENERATION,
            ShaderStage::Intersection => Self::INTERSECTION,
            ShaderStage::AnyHit => Self::ANY_HIT,
            ShaderStage::ClosestHit => Self::CLOSEST_HIT,
            ShaderStage::Miss => Self::MISS,
            ShaderStage::Callable => Self::CALLABLE,
        }
    }

    pub const fn has(self, stage: ShaderStage) -> bool {
        self.contains(Self::of(stage))
    }

    pub fn stages(self) -> impl Iterator<Item = ShaderStage> {
        ShaderStage::ALL
            .into_iter()
            .filter(move |&stage| self.has(stage))
    }
}

impl FromIterator<ShaderStage> for ShaderStageMask {
    fn from_iter<I: IntoIterator<Item = ShaderStage>>(stages: I) -> Self {
        stages
            .into_iter()
            .fold(Self::empty(), |mask, stage| mask | Self::of(stage))
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
