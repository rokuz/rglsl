use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::InterpolationQualifier;
use rglsl_ast::Span;

use super::{
    available, parse_type, words, ResourceLimits, Stage, ANY_HIT, CALLABLE, CLOSEST_HIT, COMPUTE,
    FRAGMENT, GEOMETRY, INTERSECTION, MESH, MISS, RAY_GENERATION, TASK, TESS_CONTROL,
    TESS_EVALUATION, VERTEX,
};
use crate::constant::{Constant, Value};
use crate::scope::{Origin, Qualifiers, Storage, Symbol, SymbolId, SymbolKind, Variable};
use crate::types::{ArraySize, BlockStorage, BlockType, Member, Scalar, Type, TypeRegistry};

struct Group {
    stages: u16,
    since: u32,
    text: &'static str,
}

const GROUPS: &[Group] = &[
    Group {
        stages: VERTEX,
        since: 450,
        text: "
in int gl_VertexIndex
in int gl_InstanceIndex
",
    },
    Group {
        stages: VERTEX,
        since: 460,
        text: "
in int gl_BaseVertex
in int gl_BaseInstance
in int gl_DrawID
",
    },
    Group {
        stages: VERTEX | TESS_CONTROL | TESS_EVALUATION,
        since: 450,
        text: "
out int gl_ViewportIndex
out int gl_Layer
",
    },
    Group {
        stages: VERTEX | TESS_EVALUATION | GEOMETRY,
        since: 450,
        text: "
out int gl_ViewportMask[]
out int gl_SecondaryViewportMaskNV[]
out vec4 gl_SecondaryPositionNV
out vec4 gl_PositionPerViewNV[]
out int gl_ViewportMaskPerViewNV[]
",
    },
    Group {
        stages: VERTEX | TESS_CONTROL | TESS_EVALUATION | GEOMETRY | MESH,
        since: 450,
        text: "
in int gl_ViewIndex
",
    },
    Group {
        stages: FRAGMENT,
        since: 450,
        text: "
flat in int gl_ViewIndex
",
    },
    Group {
        stages: TESS_CONTROL,
        since: 450,
        text: "
in int gl_PatchVerticesIn
in int gl_PrimitiveID
in int gl_InvocationID
patch out float gl_TessLevelOuter[4]
patch out float gl_TessLevelInner[2]
",
    },
    Group {
        stages: TESS_EVALUATION,
        since: 450,
        text: "
in int gl_PatchVerticesIn
in int gl_PrimitiveID
in vec3 gl_TessCoord
patch in float gl_TessLevelOuter[4]
patch in float gl_TessLevelInner[2]
",
    },
    Group {
        stages: GEOMETRY,
        since: 450,
        text: "
in int gl_PrimitiveIDIn
in int gl_InvocationID
out int gl_PrimitiveID
out int gl_Layer
out int gl_ViewportIndex
",
    },
    Group {
        stages: FRAGMENT,
        since: 450,
        text: "
in vec4 gl_FragCoord
in bool gl_FrontFacing
out float gl_FragDepth
in vec2 gl_PointCoord
in float gl_ClipDistance[]
in float gl_CullDistance[]
flat in int gl_PrimitiveID
flat in int gl_SampleID
in vec2 gl_SamplePosition
flat in int gl_SampleMaskIn[]
out int gl_SampleMask[]
flat in int gl_Layer
flat in int gl_ViewportIndex
in bool gl_HelperInvocation
",
    },
    Group {
        stages: COMPUTE | MESH | TASK,
        since: 450,
        text: "
in uvec3 gl_NumWorkGroups
in uvec3 gl_WorkGroupID
in uvec3 gl_LocalInvocationID
in uvec3 gl_GlobalInvocationID
in uint gl_LocalInvocationIndex
",
    },
    Group {
        stages: MESH,
        since: 450,
        text: "
out uint gl_PrimitiveCountNV
out uint gl_PrimitiveIndicesNV[]
out uint gl_PrimitivePointIndicesEXT[]
out uvec2 gl_PrimitiveLineIndicesEXT[]
out uvec3 gl_PrimitiveTriangleIndicesEXT[]
",
    },
    Group {
        stages: TASK,
        since: 450,
        text: "
out uint gl_TaskCountNV
",
    },
    Group {
        stages: MESH | TASK,
        since: 450,
        text: "
in uint gl_MeshViewCountNV
in uint gl_MeshViewIndicesNV[4]
in int gl_DeviceIndex
in int gl_DrawIDARB
",
    },
    Group {
        stages: MESH | TASK,
        since: 460,
        text: "
in int gl_DrawID
",
    },
    Group {
        stages: VERTEX
            | TESS_CONTROL
            | TESS_EVALUATION
            | GEOMETRY
            | COMPUTE
            | MESH
            | TASK
            | ANY_HIT,
        since: 450,
        text: SUBGROUP,
    },
    Group {
        stages: FRAGMENT,
        since: 450,
        text: FRAGMENT_SUBGROUP,
    },
    Group {
        stages: RAY_GENERATION | INTERSECTION | CLOSEST_HIT | MISS | CALLABLE,
        since: 450,
        text: RAY_TRACING_SUBGROUP,
    },
    Group {
        stages: COMPUTE | MESH | TASK,
        since: 450,
        text: "
in uint gl_NumSubgroups
in uint gl_SubgroupID
",
    },
];

const SUBGROUP: &str = "
in uint gl_SubgroupSize
in uint gl_SubgroupInvocationID
in uvec4 gl_SubgroupEqMask
in uvec4 gl_SubgroupGeMask
in uvec4 gl_SubgroupGtMask
in uvec4 gl_SubgroupLeMask
in uvec4 gl_SubgroupLtMask
in uint gl_SubGroupSizeARB
in uint gl_SubGroupInvocationARB
in uint64_t gl_SubGroupEqMaskARB
in uint64_t gl_SubGroupGeMaskARB
in uint64_t gl_SubGroupGtMaskARB
in uint64_t gl_SubGroupLeMaskARB
in uint64_t gl_SubGroupLtMaskARB
in uint gl_WarpsPerSMNV
in uint gl_SMCountNV
in uint gl_WarpIDNV
in uint gl_SMIDNV
in uint gl_CoreIDARM
in uint gl_CoreCountARM
in uint gl_CoreMaxIDARM
in uint gl_WarpIDARM
in uint gl_WarpMaxIDARM
";

const FRAGMENT_SUBGROUP: &str = "
flat in uint gl_SubgroupSize
flat in uint gl_SubgroupInvocationID
flat in uvec4 gl_SubgroupEqMask
flat in uvec4 gl_SubgroupGeMask
flat in uvec4 gl_SubgroupGtMask
flat in uvec4 gl_SubgroupLeMask
flat in uvec4 gl_SubgroupLtMask
flat in uint gl_SubGroupSizeARB
flat in uint gl_SubGroupInvocationARB
flat in uint64_t gl_SubGroupEqMaskARB
flat in uint64_t gl_SubGroupGeMaskARB
flat in uint64_t gl_SubGroupGtMaskARB
flat in uint64_t gl_SubGroupLeMaskARB
flat in uint64_t gl_SubGroupLtMaskARB
flat in uint gl_WarpsPerSMNV
flat in uint gl_SMCountNV
flat in uint gl_WarpIDNV
flat in uint gl_SMIDNV
flat in uint gl_CoreIDARM
flat in uint gl_CoreCountARM
flat in uint gl_CoreMaxIDARM
flat in uint gl_WarpIDARM
flat in uint gl_WarpMaxIDARM
";

const RAY_TRACING_SUBGROUP: &str = "
volatile in uint gl_SubgroupSize
volatile in uint gl_SubgroupInvocationID
volatile in uvec4 gl_SubgroupEqMask
volatile in uvec4 gl_SubgroupGeMask
volatile in uvec4 gl_SubgroupGtMask
volatile in uvec4 gl_SubgroupLeMask
volatile in uvec4 gl_SubgroupLtMask
volatile in uint gl_SubGroupSizeARB
volatile in uint gl_SubGroupInvocationARB
volatile in uint64_t gl_SubGroupEqMaskARB
volatile in uint64_t gl_SubGroupGeMaskARB
volatile in uint64_t gl_SubGroupGtMaskARB
volatile in uint64_t gl_SubGroupLeMaskARB
volatile in uint64_t gl_SubGroupLtMaskARB
in uint gl_WarpsPerSMNV
in uint gl_SMCountNV
volatile in uint gl_WarpIDNV
volatile in uint gl_SMIDNV
in uint gl_CoreIDARM
in uint gl_CoreCountARM
in uint gl_CoreMaxIDARM
in uint gl_WarpIDARM
in uint gl_WarpMaxIDARM
";

const PER_VERTEX: &str = "
vec4 gl_Position
float gl_PointSize
float gl_ClipDistance[]
float gl_CullDistance[]
";

const MESH_PER_VERTEX_NV: &str = "
vec4 gl_Position
float gl_PointSize
float gl_ClipDistance[]
float gl_CullDistance[]
perviewNV vec4 gl_PositionPerViewNV[4]
perviewNV float gl_ClipDistancePerViewNV[4][]
perviewNV float gl_CullDistancePerViewNV[4][]
";

const MESH_PER_PRIMITIVE_NV: &str = "
perprimitiveNV int gl_PrimitiveID
perprimitiveNV int gl_Layer
perprimitiveNV int gl_ViewportIndex
perprimitiveNV int gl_ViewportMask[]
perprimitiveNV perviewNV int gl_LayerPerViewNV[4]
perprimitiveNV perviewNV int gl_ViewportMaskPerViewNV[4][]
";

const MESH_PER_PRIMITIVE_EXT: &str = "
perprimitiveNV int gl_PrimitiveID
perprimitiveNV int gl_Layer
perprimitiveNV int gl_ViewportIndex
perprimitiveNV bool gl_CullPrimitiveEXT
perprimitiveNV int gl_PrimitiveShadingRateEXT
";

const MESH_BLOCKS: [(&str, &str, &str, bool); 4] = [
    (
        "gl_MeshPerVertexNV",
        "gl_MeshVerticesNV",
        MESH_PER_VERTEX_NV,
        false,
    ),
    (
        "gl_MeshPerPrimitiveNV",
        "gl_MeshPrimitivesNV",
        MESH_PER_PRIMITIVE_NV,
        true,
    ),
    (
        "gl_MeshPerVertexEXT",
        "gl_MeshVerticesEXT",
        PER_VERTEX,
        false,
    ),
    (
        "gl_MeshPerPrimitiveEXT",
        "gl_MeshPrimitivesEXT",
        MESH_PER_PRIMITIVE_EXT,
        true,
    ),
];

pub fn view_extension(name: &str) -> Option<&'static str> {
    Some(match name {
        "gl_ViewIndex" => "GL_EXT_multiview",
        "gl_ViewportMask" => "GL_NV_viewport_array2",
        "gl_SecondaryPositionNV" | "gl_SecondaryViewportMaskNV" => "GL_NV_stereo_view_rendering",
        "gl_PositionPerViewNV" | "gl_ViewportMaskPerViewNV" => {
            "GL_NVX_multiview_per_view_attributes"
        }
        _ => return None,
    })
}

const PER_VERTEX_IN: &str = "
vec4 gl_SecondaryPositionNV
vec4 gl_PositionPerViewNV[]
";

const PER_VERTEX_TESS_CONTROL_OUT: &str = "
int gl_ViewportMask[]
vec4 gl_SecondaryPositionNV
int gl_SecondaryViewportMaskNV[]
vec4 gl_PositionPerViewNV[]
int gl_ViewportMaskPerViewNV[]
";

enum Instance {
    Anonymous,
    Named(&'static str, ArraySize),
}

struct Declared {
    qualifiers: Qualifiers,
    ty: Type,
    name: String,
}

fn parse_declaration(line: &[&str]) -> Option<Declared> {
    let mut qualifiers = Qualifiers::default();
    let mut ty = None;
    let mut name = None;
    let mut dimensions = Vec::new();
    let mut iterator = line.iter().copied().peekable();
    while let Some(word) = iterator.next() {
        match word {
            "in" => qualifiers.storage = Storage::In,
            "out" => qualifiers.storage = Storage::Out,
            "patch" => qualifiers.patch = true,
            "flat" => qualifiers.interpolation = Some(InterpolationQualifier::Flat),
            "volatile" => qualifiers.volatile = true,
            "perprimitiveNV" => qualifiers.per_primitive = true,
            "perviewNV" => qualifiers.per_view = true,
            "[" => {
                let next = iterator.next()?;
                if next == "]" {
                    dimensions.push(ArraySize::Unsized);
                } else {
                    dimensions.push(ArraySize::Sized(next.parse().ok()?));
                    iterator.next();
                }
            }
            _ if ty.is_none() => ty = parse_type(word),
            _ => name = Some(String::from(word)),
        }
    }
    let ty = ty?.with_dimensions(&dimensions);
    Some(Declared {
        qualifiers,
        ty,
        name: name?,
    })
}

struct Builder {
    symbols: Vec<Symbol>,
    scope: Vec<(String, SymbolId)>,
}

impl Builder {
    fn add(&mut self, name: &str, kind: SymbolKind, visible: bool) -> Option<SymbolId> {
        let id = SymbolId(u32::try_from(self.symbols.len()).ok()?);
        self.symbols.push(Symbol {
            name: String::from(name),
            span: Span::default(),
            kind,
        });
        if visible {
            self.scope.push((String::from(name), id));
        }
        Some(id)
    }

    fn variable(
        &mut self,
        name: &str,
        ty: Type,
        qualifiers: Qualifiers,
        value: Option<Constant>,
        visible: bool,
    ) -> Option<SymbolId> {
        let variable = Variable {
            ty,
            qualifiers,
            origin: Origin::BuiltIn,
            value,
            declaration: None,
        };
        self.add(name, SymbolKind::Variable(variable), visible)
    }

    fn constant(&mut self, name: &str, ty: Type, values: Vec<Value>) {
        let qualifiers = Qualifiers {
            constant: true,
            ..Qualifiers::default()
        };
        self.variable(name, ty, qualifiers, Some(Constant::new(values)), true);
    }

    fn per_vertex(
        &mut self,
        types: &mut TypeRegistry,
        storage: BlockStorage,
        instance: &Instance,
    ) -> Option<()> {
        let member_storage = match storage {
            BlockStorage::In => Storage::In,
            _ => Storage::Out,
        };
        let extension_members = match (instance, storage) {
            (Instance::Anonymous, _) => "",
            (Instance::Named(..), BlockStorage::In) => PER_VERTEX_IN,
            (Instance::Named(..), _) => PER_VERTEX_TESS_CONTROL_OUT,
        };
        let members: Vec<Member> = PER_VERTEX
            .lines()
            .chain(extension_members.lines())
            .filter_map(|line| parse_declaration(&words(line)))
            .map(|declared| Member {
                name: declared.name,
                ty: declared.ty,
                qualifiers: Qualifiers {
                    storage: member_storage,
                    ..Qualifiers::default()
                },
            })
            .collect();
        let qualifiers = Qualifiers {
            storage: member_storage,
            ..Qualifiers::default()
        };
        let member_names: Vec<String> = members.iter().map(|member| member.name.clone()).collect();
        let block = types.add_block(BlockType {
            name: String::from("gl_PerVertex"),
            storage,
            qualifiers: qualifiers.clone(),
            members,
            reference: None,
            buffer_type: false,
        })?;
        match instance {
            Instance::Anonymous => {
                let instance = self.variable("", Type::block(block), qualifiers, None, false)?;
                for (index, name) in member_names.iter().enumerate() {
                    let index = u32::try_from(index).ok()?;
                    self.add(name, SymbolKind::BlockMember { instance, index }, true);
                }
            }
            Instance::Named(name, size) => {
                let ty = Type::block(block).array_of(*size);
                self.variable(name, ty, qualifiers, None, true);
            }
        }
        Some(())
    }

    fn mesh_block(
        &mut self,
        types: &mut TypeRegistry,
        block_name: &str,
        instance: &str,
        text: &str,
        per_primitive: bool,
    ) -> Option<()> {
        let members: Vec<Member> = text
            .lines()
            .filter_map(|line| parse_declaration(&words(line)))
            .map(|declared| Member {
                name: declared.name,
                ty: declared.ty,
                qualifiers: Qualifiers {
                    storage: Storage::Out,
                    ..declared.qualifiers
                },
            })
            .collect();
        let qualifiers = Qualifiers {
            storage: Storage::Out,
            per_primitive,
            ..Qualifiers::default()
        };
        let block = types.add_block(BlockType {
            name: String::from(block_name),
            storage: BlockStorage::Out,
            qualifiers: qualifiers.clone(),
            members,
            reference: None,
            buffer_type: false,
        })?;
        let ty = Type::block(block).array_of(ArraySize::Unsized);
        self.variable(instance, ty, qualifiers, None, true);
        Some(())
    }
}

pub(super) const MEMORY_SCOPE_CONSTANTS: [(&str, i32); 18] = [
    ("gl_ScopeDevice", 1),
    ("gl_ScopeWorkgroup", 2),
    ("gl_ScopeSubgroup", 3),
    ("gl_ScopeInvocation", 4),
    ("gl_ScopeQueueFamily", 5),
    ("gl_ScopeShaderCallEXT", 6),
    ("gl_SemanticsRelaxed", 0x0),
    ("gl_SemanticsAcquire", 0x2),
    ("gl_SemanticsRelease", 0x4),
    ("gl_SemanticsAcquireRelease", 0x8),
    ("gl_SemanticsMakeAvailable", 0x2000),
    ("gl_SemanticsMakeVisible", 0x4000),
    ("gl_SemanticsVolatile", 0x8000),
    ("gl_StorageSemanticsNone", 0x0),
    ("gl_StorageSemanticsBuffer", 0x40),
    ("gl_StorageSemanticsShared", 0x100),
    ("gl_StorageSemanticsImage", 0x800),
    ("gl_StorageSemanticsOutput", 0x1000),
];

const COOPERATIVE_CONSTANTS: [(&str, i32); 40] = [
    ("gl_MatrixUseA", 0),
    ("gl_MatrixUseB", 1),
    ("gl_MatrixUseAccumulator", 2),
    ("gl_MatrixOperandsSaturatingAccumulation", 0x10),
    ("gl_CooperativeMatrixLayoutRowMajor", 0),
    ("gl_CooperativeMatrixLayoutColumnMajor", 1),
    ("gl_CooperativeMatrixLayoutRowBlockedInterleavedARM", 4202),
    (
        "gl_CooperativeMatrixLayoutColumnBlockedInterleavedARM",
        4203,
    ),
    ("gl_CooperativeMatrixReduceRowNV", 0x1),
    ("gl_CooperativeMatrixReduceColumnNV", 0x2),
    ("gl_CooperativeMatrixReduceRowAndColumnNV", 0x3),
    ("gl_CooperativeMatrixReduce2x2NV", 0x4),
    ("gl_CooperativeMatrixReduceRowEXT", 0x1),
    ("gl_CooperativeMatrixReduceColumnEXT", 0x2),
    ("gl_CooperativeMatrixReduceRowAndColumnEXT", 0x3),
    ("gl_CooperativeMatrixReduce2x2EXT", 0x4),
    ("gl_CooperativeMatrixClampModeUndefinedNV", 0x0),
    ("gl_CooperativeMatrixClampModeConstantNV", 0x1),
    ("gl_CooperativeMatrixClampModeClampToEdgeNV", 0x2),
    ("gl_CooperativeMatrixClampModeRepeatNV", 0x3),
    ("gl_CooperativeMatrixClampModeMirrorRepeatNV", 0x4),
    ("gl_CooperativeVectorMatrixLayoutRowMajorNV", 0),
    ("gl_CooperativeVectorMatrixLayoutColumnMajorNV", 1),
    ("gl_CooperativeVectorMatrixLayoutInferencingOptimalNV", 2),
    ("gl_CooperativeVectorMatrixLayoutTrainingOptimalNV", 3),
    ("gl_ComponentTypeFloat16NV", 0),
    ("gl_ComponentTypeFloat32NV", 1),
    ("gl_ComponentTypeFloat64NV", 2),
    ("gl_ComponentTypeSignedInt8NV", 3),
    ("gl_ComponentTypeSignedInt16NV", 4),
    ("gl_ComponentTypeSignedInt32NV", 5),
    ("gl_ComponentTypeSignedInt64NV", 6),
    ("gl_ComponentTypeUnsignedInt8NV", 7),
    ("gl_ComponentTypeUnsignedInt16NV", 8),
    ("gl_ComponentTypeUnsignedInt32NV", 9),
    ("gl_ComponentTypeUnsignedInt64NV", 10),
    ("gl_ComponentTypeSignedInt8PackedNV", 1_000_491_000),
    ("gl_ComponentTypeUnsignedInt8PackedNV", 1_000_491_001),
    ("gl_ComponentTypeFloatE4M3NV", 1_000_491_002),
    ("gl_ComponentTypeFloatE5M2NV", 1_000_491_003),
];

pub(crate) const TENSOR_OPERAND_NONTEMPORAL: u32 = 0x1;
pub(crate) const TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE: u32 = 0x2;

const TENSOR_OPERAND_CONSTANTS: [(&str, u32); 2] = [
    (
        "gl_TensorOperandsNonTemporalARM",
        TENSOR_OPERAND_NONTEMPORAL,
    ),
    (
        "gl_TensorOperandsOutOfBoundsValueARM",
        TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE,
    ),
];

pub(super) fn build(
    version: u32,
    stage: Stage,
    limits: &ResourceLimits,
    types: &mut TypeRegistry,
) -> (Vec<Symbol>, Vec<(String, SymbolId)>) {
    let mut builder = Builder {
        symbols: Vec::new(),
        scope: Vec::new(),
    };
    for (name, value) in limits.integer_constants() {
        builder.constant(name, Type::INT, alloc::vec![Value::Int(value)]);
    }
    for (name, value) in MEMORY_SCOPE_CONSTANTS
        .into_iter()
        .chain(COOPERATIVE_CONSTANTS)
    {
        builder.constant(name, Type::INT, alloc::vec![Value::Int(value)]);
    }
    for (name, value) in TENSOR_OPERAND_CONSTANTS {
        builder.constant(name, Type::UINT, alloc::vec![Value::Uint(value)]);
    }
    let triple = |values: [i32; 3]| values.iter().map(|value| Value::Int(*value)).collect();
    builder.constant(
        "gl_MaxComputeWorkGroupCount",
        Type::vector(Scalar::Int, 3),
        triple(limits.max_compute_work_group_count),
    );
    builder.constant(
        "gl_MaxComputeWorkGroupSize",
        Type::vector(Scalar::Int, 3),
        triple(limits.max_compute_work_group_size),
    );
    builder.constant(
        "gl_MaxMeshWorkGroupSizeNV",
        Type::vector(Scalar::Int, 3),
        triple(limits.max_mesh_work_group_size_nv),
    );
    builder.constant(
        "gl_MaxTaskWorkGroupSizeNV",
        Type::vector(Scalar::Int, 3),
        triple(limits.max_task_work_group_size_nv),
    );
    if matches!(stage, Stage::Compute | Stage::Mesh | Stage::Task) {
        builder.constant(
            "gl_WorkGroupSize",
            Type::vector(Scalar::Uint, 3),
            alloc::vec![Value::Uint(1); 3],
        );
    }
    for group in GROUPS {
        if version < group.since || !available(group.stages, stage) {
            continue;
        }
        for line in group.text.lines() {
            if let Some(declared) = parse_declaration(&words(line)) {
                builder.variable(&declared.name, declared.ty, declared.qualifiers, None, true);
            }
        }
    }
    if version >= 460 {
        for (name, value) in super::ray::UINT_CONSTANTS {
            builder.constant(name, Type::UINT, alloc::vec![Value::Uint(value)]);
        }
        builder.constant(
            "gl_EnableOpacityMicromapEXT",
            Type::BOOL,
            alloc::vec![Value::Bool(false)],
        );
        for group in super::ray::VARIABLES {
            if !available(group.stages, stage) {
                continue;
            }
            for line in group.text.lines() {
                if let Some(declared) = parse_declaration(&words(line)) {
                    builder.variable(&declared.name, declared.ty, declared.qualifiers, None, true);
                }
            }
        }
    }
    let patch_vertices = u32::try_from(limits.max_patch_vertices).unwrap_or(0);
    let blocks: &[(BlockStorage, Instance)] = match stage {
        Stage::Vertex => &[(BlockStorage::Out, Instance::Anonymous)],
        Stage::TessControl => &[
            (
                BlockStorage::In,
                Instance::Named("gl_in", ArraySize::Sized(patch_vertices)),
            ),
            (
                BlockStorage::Out,
                Instance::Named("gl_out", ArraySize::Unsized),
            ),
        ],
        Stage::TessEvaluation => &[
            (
                BlockStorage::In,
                Instance::Named("gl_in", ArraySize::Sized(patch_vertices)),
            ),
            (BlockStorage::Out, Instance::Anonymous),
        ],
        Stage::Geometry => &[
            (
                BlockStorage::In,
                Instance::Named("gl_in", ArraySize::Unsized),
            ),
            (BlockStorage::Out, Instance::Anonymous),
        ],
        _ => &[],
    };
    for (storage, instance) in blocks {
        builder.per_vertex(types, *storage, instance);
    }
    if stage == Stage::Mesh {
        for (block, instance, text, per_primitive) in MESH_BLOCKS {
            builder.mesh_block(types, block, instance, text, per_primitive);
        }
    }
    (builder.symbols, builder.scope)
}
