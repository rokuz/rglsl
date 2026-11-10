use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::InterpolationQualifier;
use rglsl_ast::Span;

use super::{
    available, parse_type, words, ResourceLimits, Stage, COMPUTE, FRAGMENT, GEOMETRY, TESS_CONTROL,
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
        stages: COMPUTE,
        since: 450,
        text: "
in uvec3 gl_NumWorkGroups
in uvec3 gl_WorkGroupID
in uvec3 gl_LocalInvocationID
in uvec3 gl_GlobalInvocationID
in uint gl_LocalInvocationIndex
",
    },
];

const PER_VERTEX: &str = "
vec4 gl_Position
float gl_PointSize
float gl_ClipDistance[]
float gl_CullDistance[]
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
    let mut array = None;
    let mut iterator = line.iter().copied().peekable();
    while let Some(word) = iterator.next() {
        match word {
            "in" => qualifiers.storage = Storage::In,
            "out" => qualifiers.storage = Storage::Out,
            "patch" => qualifiers.patch = true,
            "flat" => qualifiers.interpolation = Some(InterpolationQualifier::Flat),
            "[" => {
                let next = iterator.next()?;
                if next == "]" {
                    array = Some(ArraySize::Unsized);
                } else {
                    array = Some(ArraySize::Sized(next.parse().ok()?));
                    iterator.next();
                }
            }
            _ if ty.is_none() => ty = parse_type(word),
            _ => name = Some(String::from(word)),
        }
    }
    let mut ty = ty?;
    if let Some(size) = array {
        ty = ty.array_of(size);
    }
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
        let members: Vec<Member> = PER_VERTEX
            .lines()
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
    for (name, value) in MEMORY_SCOPE_CONSTANTS {
        builder.constant(name, Type::INT, alloc::vec![Value::Int(value)]);
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
    if stage == Stage::Compute {
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
    (builder.symbols, builder.scope)
}
