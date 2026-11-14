use rglsl_types::builtin::BuiltIn::{self, *};
use rglsl_types::extension::Extension::*;

use super::VariableKind::Member;
use super::{BlockSize, BuiltinBlock, BuiltinVariable};
use crate::builtins::{GEOMETRY, MESH, TESS_CONTROL, TESS_EVALUATION, VERTEX};
use crate::types::BlockStorage;

const LAYER: BuiltIn = Layer {
    viewport_relative: false,
    secondary_view_offset: None,
};

const PER_VERTEX: &[BuiltinVariable] = variables! {
    "gl_Position": Member(Position { invariant: false }) => vec4
    "gl_PointSize": Member(PointSize) => float
    "gl_ClipDistance": Member(ClipDistances) => float[]
    "gl_CullDistance": Member(CullDistance) => float[]
};

const VIEWS_IN: &[BuiltinVariable] = variables! {
    "gl_SecondaryPositionNV": Member(SecondaryPositionNV) => vec4 {
        requires_one_of: &[NvStereoViewRendering],
    }
    "gl_PositionPerViewNV": Member(PositionPerViewNV) => vec4[] {
        requires_one_of: &[NvxMultiviewPerViewAttributes],
    }
};

const VIEWS_OUT: &[BuiltinVariable] = variables! {
    "gl_ViewportMask": Member(ViewportMaskNV) => int[] {
        requires_one_of: &[NvViewportArray2],
    }
    "gl_SecondaryPositionNV": Member(SecondaryPositionNV) => vec4 {
        requires_one_of: &[NvStereoViewRendering],
    }
    "gl_SecondaryViewportMaskNV": Member(SecondaryViewportMaskNV) => int[] {
        requires_one_of: &[NvStereoViewRendering],
    }
    "gl_PositionPerViewNV": Member(PositionPerViewNV) => vec4[] {
        requires_one_of: &[NvxMultiviewPerViewAttributes],
    }
    "gl_ViewportMaskPerViewNV": Member(ViewportMaskPerViewNV) => int[] {
        requires_one_of: &[NvxMultiviewPerViewAttributes],
    }
};

const MESH_VIEWS_NV: &[BuiltinVariable] = variables! {
    "gl_PositionPerViewNV": Member(PositionPerViewNV) => vec4[4] {
        flags: variable_flags!(PER_VIEW),
    }
    "gl_ClipDistancePerViewNV": Member(ClipDistancePerViewNV) => float[4][] {
        flags: variable_flags!(PER_VIEW),
    }
    "gl_CullDistancePerViewNV": Member(CullDistancePerViewNV) => float[4][] {
        flags: variable_flags!(PER_VIEW),
    }
};

const PER_PRIMITIVE: &[BuiltinVariable] = variables! {
    "gl_PrimitiveID": Member(PrimitiveIndex) => int {
        flags: variable_flags!(PER_PRIMITIVE),
    }
    "gl_Layer": Member(LAYER) => int {
        flags: variable_flags!(PER_PRIMITIVE),
    }
    "gl_ViewportIndex": Member(ViewportIndex) => int {
        flags: variable_flags!(PER_PRIMITIVE),
    }
};

const MESH_PRIMITIVE_NV: &[BuiltinVariable] = variables! {
    "gl_ViewportMask": Member(ViewportMaskNV) => int[] {
        flags: variable_flags!(PER_PRIMITIVE),
    }
    "gl_LayerPerViewNV": Member(LayerPerViewNV) => int[4] {
        flags: variable_flags!(PER_PRIMITIVE, PER_VIEW),
    }
    "gl_ViewportMaskPerViewNV": Member(ViewportMaskPerViewNV) => int[4][] {
        flags: variable_flags!(PER_PRIMITIVE, PER_VIEW),
    }
};

const MESH_PRIMITIVE_EXT: &[BuiltinVariable] = variables! {
    "gl_CullPrimitiveEXT": Member(CullPrimitive) => bool {
        flags: variable_flags!(PER_PRIMITIVE),
    }
    "gl_PrimitiveShadingRateEXT": Member(PrimitiveShadingRate) => int {
        requires_one_of: &[ExtFragmentShadingRate],
        flags: variable_flags!(PER_PRIMITIVE),
    }
};

const fn block(
    name: &'static str,
    instance: &'static str,
    storage: BlockStorage,
    size: BlockSize,
    stages: u16,
    members: &'static [&'static [BuiltinVariable]],
) -> BuiltinBlock {
    BuiltinBlock {
        name,
        instance,
        storage,
        size,
        per_primitive: false,
        members,
        stages,
    }
}

const fn mesh(
    name: &'static str,
    instance: &'static str,
    per_primitive: bool,
    members: &'static [&'static [BuiltinVariable]],
) -> BuiltinBlock {
    BuiltinBlock {
        per_primitive,
        ..block(
            name,
            instance,
            BlockStorage::Out,
            BlockSize::Unsized,
            MESH,
            members,
        )
    }
}

pub(super) const BLOCKS: &[BuiltinBlock] = &[
    block(
        "gl_PerVertex",
        "gl_in",
        BlockStorage::In,
        BlockSize::PatchVertices,
        TESS_CONTROL | TESS_EVALUATION,
        &[PER_VERTEX, VIEWS_IN],
    ),
    block(
        "gl_PerVertex",
        "gl_in",
        BlockStorage::In,
        BlockSize::Unsized,
        GEOMETRY,
        &[PER_VERTEX, VIEWS_IN],
    ),
    block(
        "gl_PerVertex",
        "gl_out",
        BlockStorage::Out,
        BlockSize::Unsized,
        TESS_CONTROL,
        &[PER_VERTEX, VIEWS_OUT],
    ),
    block(
        "gl_PerVertex",
        "",
        BlockStorage::Out,
        BlockSize::Single,
        VERTEX | TESS_EVALUATION | GEOMETRY,
        &[PER_VERTEX],
    ),
    mesh(
        "gl_MeshPerVertexNV",
        "gl_MeshVerticesNV",
        false,
        &[PER_VERTEX, MESH_VIEWS_NV],
    ),
    mesh(
        "gl_MeshPerPrimitiveNV",
        "gl_MeshPrimitivesNV",
        true,
        &[PER_PRIMITIVE, MESH_PRIMITIVE_NV],
    ),
    mesh(
        "gl_MeshPerVertexEXT",
        "gl_MeshVerticesEXT",
        false,
        &[PER_VERTEX],
    ),
    mesh(
        "gl_MeshPerPrimitiveEXT",
        "gl_MeshPrimitivesEXT",
        true,
        &[PER_PRIMITIVE, MESH_PRIMITIVE_EXT],
    ),
];
