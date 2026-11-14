use rglsl_ast::ast::PrecisionQualifier::{High, Medium};
use rglsl_types::builtin::BuiltIn::*;
use rglsl_types::builtin::{ShaderBallot as Ballot, ShaderCore as Core, SubgroupMask as Mask};
use rglsl_types::extension::Extension::{self, *};
use rglsl_types::flavor::{BarycentricFlavor as Bary, FragmentDensityFlavor as Density};

use super::BuiltinVariable;
use super::VariableKind::{Input, Output};
use crate::builtins::{
    ALL_STAGE_BITS, ANY_HIT, CLOSEST_HIT, COMPUTE, FRAGMENT, GEOMETRY, INTERSECTION, MESH, MISS,
    RAY_GENERATION, TASK, TESS_CONTROL, TESS_EVALUATION, VERTEX,
};

const MESH_STAGES: u16 = MESH | TASK;
const COMPUTE_LIKE: u16 = COMPUTE | MESH_STAGES;
const TESSELLATION: u16 = TESS_CONTROL | TESS_EVALUATION;
const DEVICE_GROUP: u16 = VERTEX
    | TESSELLATION
    | GEOMETRY
    | FRAGMENT
    | COMPUTE
    | RAY_GENERATION
    | INTERSECTION
    | ANY_HIT
    | CLOSEST_HIT
    | MISS;
const MESH_ANY: &[Extension] = &[NvMeshShader, ExtMeshShader];
const VIEWPORT_LAYER: &[Extension] = &[ArbShaderViewportLayerArray, NvViewportArray2];
const LAYER: rglsl_types::builtin::BuiltIn = Layer {
    viewport_relative: false,
    secondary_view_offset: None,
};
const SAMPLE_MASK: rglsl_types::builtin::BuiltIn = SampleMask {
    override_coverage: false,
};

pub(super) const VARIABLES: &[BuiltinVariable] = variables! {
    "gl_VertexIndex": Input(VertexIndex) => int { stages: VERTEX }
    "gl_InstanceIndex": Input(InstanceIndex) => int { stages: VERTEX }
    "gl_BaseVertex": Input(BaseVertex) => int { stages: VERTEX, since: 460 }
    "gl_BaseInstance": Input(BaseInstance) => int { stages: VERTEX, since: 460 }
    "gl_DrawID": Input(DrawIndex) => int { stages: VERTEX, since: 460 }
    "gl_BaseVertexARB": Input(BaseVertex) => int {
        stages: VERTEX,
        requires_one_of: &[ArbShaderDrawParameters],
    }
    "gl_BaseInstanceARB": Input(BaseInstance) => int {
        stages: VERTEX,
        requires_one_of: &[ArbShaderDrawParameters],
    }
    "gl_DrawIDARB": Input(DrawIndex) => int {
        stages: VERTEX,
        requires_one_of: &[ArbShaderDrawParameters],
    }
    "gl_DeviceIndex": Input(DeviceIndex) => int {
        stages: DEVICE_GROUP,
        requires_one_of: &[ExtDeviceGroup],
    }
    "gl_PrimitiveShadingRateEXT": Output(PrimitiveShadingRate) => int {
        stages: VERTEX | GEOMETRY,
        requires_one_of: &[ExtFragmentShadingRate],
    }
    "gl_FragSizeEXT": Input(FragSize(Density::Ext)) => ivec2 {
        stages: FRAGMENT,
        requires_one_of: &[ExtFragmentInvocationDensity],
    }
    "gl_FragInvocationCountEXT": Input(FragInvocationCount(Density::Ext)) => int {
        stages: FRAGMENT,
        requires_one_of: &[ExtFragmentInvocationDensity],
    }
    "gl_FragFullyCoveredNV": Input(FullyCovered) => bool {
        stages: FRAGMENT,
        requires_one_of: &[NvConservativeRasterUnderestimation],
    }
    "gl_FragmentSizeNV": Input(FragSize(Density::Nv)) => ivec2 {
        stages: FRAGMENT,
        requires_one_of: &[NvShadingRateImage],
    }
    "gl_InvocationsPerPixelNV": Input(FragInvocationCount(Density::Nv)) => int {
        stages: FRAGMENT,
        requires_one_of: &[NvShadingRateImage],
    }
    "gl_ShadingRateEXT": Input(ShadingRate) => int {
        stages: FRAGMENT,
        requires_one_of: &[ExtFragmentShadingRate],
    }
    "gl_FragStencilRefARB": Output(FragStencilRef) => int {
        stages: FRAGMENT,
        requires_one_of: &[ArbShaderStencilExport],
    }
    "gl_BaryCoordNV": Input(Barycentric { perspective: true, flavor: Bary::Nv }) => vec3 {
        stages: FRAGMENT,
        requires_one_of: &[NvFragmentShaderBarycentric],
    }
    "gl_BaryCoordNoPerspNV": Input(Barycentric { perspective: false, flavor: Bary::Nv }) => vec3 {
        stages: FRAGMENT,
        requires_one_of: &[NvFragmentShaderBarycentric],
    }
    "gl_BaryCoordEXT": Input(Barycentric { perspective: true, flavor: Bary::Khr }) => vec3 {
        stages: FRAGMENT,
        requires_one_of: &[ExtFragmentShaderBarycentric],
    }
    "gl_BaryCoordNoPerspEXT": Input(Barycentric { perspective: false, flavor: Bary::Khr }) => vec3 {
        stages: FRAGMENT,
        requires_one_of: &[ExtFragmentShaderBarycentric],
    }
    "gl_ViewportIndex": Output(ViewportIndex) => int {
        stages: VERTEX | TESSELLATION,
        requires_one_of: VIEWPORT_LAYER,
    }
    "gl_Layer": Output(LAYER) => int {
        stages: VERTEX | TESSELLATION,
        requires_one_of: VIEWPORT_LAYER,
    }
    "gl_ViewportMask": Output(ViewportMaskNV) => int[] {
        stages: VERTEX | TESS_EVALUATION | GEOMETRY,
        requires_one_of: &[NvViewportArray2],
    }
    "gl_SecondaryViewportMaskNV": Output(SecondaryViewportMaskNV) => int[] {
        stages: VERTEX | TESS_EVALUATION | GEOMETRY,
        requires_one_of: &[NvStereoViewRendering],
    }
    "gl_SecondaryPositionNV": Output(SecondaryPositionNV) => vec4 {
        stages: VERTEX | TESS_EVALUATION | GEOMETRY,
        requires_one_of: &[NvStereoViewRendering],
    }
    "gl_PositionPerViewNV": Output(PositionPerViewNV) => vec4[] {
        stages: VERTEX | TESS_EVALUATION | GEOMETRY,
        requires_one_of: &[NvxMultiviewPerViewAttributes],
    }
    "gl_ViewportMaskPerViewNV": Output(ViewportMaskPerViewNV) => int[] {
        stages: VERTEX | TESS_EVALUATION | GEOMETRY,
        requires_one_of: &[NvxMultiviewPerViewAttributes],
    }
    "gl_ViewIndex": Input(ViewIndex) => int {
        stages: VERTEX | TESSELLATION | GEOMETRY | MESH | FRAGMENT,
        requires_one_of: &[ExtMultiview],
        precision: Some(High),
    }
    "gl_PatchVerticesIn": Input(PatchVertices) => int { stages: TESSELLATION }
    "gl_PrimitiveID": Input(PrimitiveIndex) => int { stages: TESSELLATION }
    "gl_InvocationID": Input(InvocationId) => int { stages: TESS_CONTROL }
    "gl_TessCoord": Input(TessCoord) => vec3 { stages: TESS_EVALUATION }
    "gl_TessLevelOuter": Output(TessLevelOuter) => float[4] {
        stages: TESS_CONTROL,
        flags: variable_flags!(PATCH),
    }
    "gl_TessLevelInner": Output(TessLevelInner) => float[2] {
        stages: TESS_CONTROL,
        flags: variable_flags!(PATCH),
    }
    "gl_TessLevelOuter": Input(TessLevelOuter) => float[4] {
        stages: TESS_EVALUATION,
        flags: variable_flags!(PATCH),
    }
    "gl_TessLevelInner": Input(TessLevelInner) => float[2] {
        stages: TESS_EVALUATION,
        flags: variable_flags!(PATCH),
    }
    "gl_PrimitiveIDIn": Input(PrimitiveIndex) => int { stages: GEOMETRY }
    "gl_InvocationID": Input(InvocationId) => int { stages: GEOMETRY }
    "gl_PrimitiveID": Output(PrimitiveIndex) => int { stages: GEOMETRY }
    "gl_Layer": Output(LAYER) => int { stages: GEOMETRY }
    "gl_ViewportIndex": Output(ViewportIndex) => int { stages: GEOMETRY }
    "gl_FragCoord": Input(Position { invariant: false }) => vec4 { stages: FRAGMENT }
    "gl_FrontFacing": Input(FrontFacing) => bool { stages: FRAGMENT }
    "gl_FragDepth": Output(FragDepth) => float { stages: FRAGMENT }
    "gl_PointCoord": Input(PointCoord) => vec2 { stages: FRAGMENT }
    "gl_ClipDistance": Input(ClipDistances) => float[] { stages: FRAGMENT }
    "gl_CullDistance": Input(CullDistance) => float[] { stages: FRAGMENT }
    "gl_PrimitiveID": Input(PrimitiveIndex) => int { stages: FRAGMENT }
    "gl_SampleID": Input(SampleIndex) => int { stages: FRAGMENT }
    "gl_SamplePosition": Input(SamplePosition) => vec2 { stages: FRAGMENT }
    "gl_SampleMaskIn": Input(SAMPLE_MASK) => int[] { stages: FRAGMENT }
    "gl_SampleMask": Output(SAMPLE_MASK) => int[] { stages: FRAGMENT }
    "gl_Layer": Input(LAYER) => int { stages: FRAGMENT }
    "gl_ViewportIndex": Input(ViewportIndex) => int { stages: FRAGMENT }
    "gl_HelperInvocation": Input(HelperInvocation) => bool { stages: FRAGMENT }
    "gl_NumWorkGroups": Input(NumWorkGroups) => uvec3 {
        stages: COMPUTE,
        precision: Some(High),
    }
    "gl_NumWorkGroups": Input(NumWorkGroups) => uvec3 {
        stages: MESH_STAGES,
        requires_one_of: &[ExtMeshShader],
        precision: Some(High),
    }
    "gl_WorkGroupID": Input(WorkGroupId) => uvec3 {
        stages: COMPUTE,
        precision: Some(High),
    }
    "gl_WorkGroupID": Input(WorkGroupId) => uvec3 {
        stages: MESH_STAGES,
        requires_one_of: MESH_ANY,
        precision: Some(High),
    }
    "gl_LocalInvocationID": Input(LocalInvocationId) => uvec3 {
        stages: COMPUTE,
        precision: Some(High),
    }
    "gl_LocalInvocationID": Input(LocalInvocationId) => uvec3 {
        stages: MESH_STAGES,
        requires_one_of: MESH_ANY,
        precision: Some(High),
    }
    "gl_GlobalInvocationID": Input(GlobalInvocationId) => uvec3 {
        stages: COMPUTE,
        precision: Some(High),
    }
    "gl_GlobalInvocationID": Input(GlobalInvocationId) => uvec3 {
        stages: MESH_STAGES,
        requires_one_of: MESH_ANY,
        precision: Some(High),
    }
    "gl_LocalInvocationIndex": Input(LocalInvocationIndex) => uint {
        stages: COMPUTE,
        precision: Some(High),
    }
    "gl_LocalInvocationIndex": Input(LocalInvocationIndex) => uint {
        stages: MESH_STAGES,
        requires_one_of: MESH_ANY,
        precision: Some(High),
    }
    "gl_PrimitiveCountNV": Output(PrimitiveCountNV) => uint {
        stages: MESH,
        requires_one_of: &[NvMeshShader],
    }
    "gl_PrimitiveIndicesNV": Output(PrimitiveIndicesNV) => uint[] {
        stages: MESH,
        requires_one_of: &[NvMeshShader],
    }
    "gl_PrimitivePointIndicesEXT": Output(PointIndex) => uint[] {
        stages: MESH,
        requires_one_of: &[ExtMeshShader],
    }
    "gl_PrimitiveLineIndicesEXT": Output(LineIndices) => uvec2[] {
        stages: MESH,
        requires_one_of: &[ExtMeshShader],
    }
    "gl_PrimitiveTriangleIndicesEXT": Output(TriangleIndices) => uvec3[] {
        stages: MESH,
        requires_one_of: &[ExtMeshShader],
    }
    "gl_TaskCountNV": Output(TaskCountNV) => uint {
        stages: TASK,
        requires_one_of: &[NvMeshShader],
    }
    "gl_MeshViewCountNV": Input(MeshViewCountNV) => uint {
        stages: MESH_STAGES,
        requires_one_of: &[NvMeshShader],
    }
    "gl_MeshViewIndicesNV": Input(MeshViewIndicesNV) => uint[4] {
        stages: MESH_STAGES,
        requires_one_of: &[NvMeshShader],
    }
    "gl_DeviceIndex": Input(DeviceIndex) => int {
        stages: MESH_STAGES,
        requires_one_of: &[ExtDeviceGroup],
        precision: Some(High),
    }
    "gl_DrawIDARB": Input(DrawIndex) => int {
        stages: MESH_STAGES,
        requires_one_of: &[ArbShaderDrawParameters],
    }
    "gl_DrawID": Input(DrawIndex) => int { stages: MESH_STAGES, since: 460 }
    "gl_SubgroupSize": Input(SubgroupSize) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[KhrShaderSubgroupBasic],
        precision: Some(Medium),
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubgroupInvocationID": Input(SubgroupInvocationId) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[KhrShaderSubgroupBasic],
        precision: Some(Medium),
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubgroupEqMask": Input(SubgroupMask(Mask::Eq)) => uvec4 {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[KhrShaderSubgroupBallot],
        precision: Some(High),
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubgroupGeMask": Input(SubgroupMask(Mask::Ge)) => uvec4 {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[KhrShaderSubgroupBallot],
        precision: Some(High),
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubgroupGtMask": Input(SubgroupMask(Mask::Gt)) => uvec4 {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[KhrShaderSubgroupBallot],
        precision: Some(High),
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubgroupLeMask": Input(SubgroupMask(Mask::Le)) => uvec4 {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[KhrShaderSubgroupBallot],
        precision: Some(High),
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubgroupLtMask": Input(SubgroupMask(Mask::Lt)) => uvec4 {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[KhrShaderSubgroupBallot],
        precision: Some(High),
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubGroupSizeARB": Input(ShaderBallot(Ballot::Size)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArbShaderBallot],
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubGroupInvocationARB": Input(ShaderBallot(Ballot::InvocationId)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArbShaderBallot],
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubGroupEqMaskARB": Input(ShaderBallot(Ballot::Mask(Mask::Eq))) => uint64_t {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArbShaderBallot],
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubGroupGeMaskARB": Input(ShaderBallot(Ballot::Mask(Mask::Ge))) => uint64_t {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArbShaderBallot],
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubGroupGtMaskARB": Input(ShaderBallot(Ballot::Mask(Mask::Gt))) => uint64_t {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArbShaderBallot],
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubGroupLeMaskARB": Input(ShaderBallot(Ballot::Mask(Mask::Le))) => uint64_t {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArbShaderBallot],
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SubGroupLtMaskARB": Input(ShaderBallot(Ballot::Mask(Mask::Lt))) => uint64_t {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArbShaderBallot],
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_WarpsPerSMNV": Input(ShaderCore(Core::WarpsPerSmNv)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[NvShaderSmBuiltins],
        precision: Some(High),
    }
    "gl_SMCountNV": Input(ShaderCore(Core::SmCountNv)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[NvShaderSmBuiltins],
        precision: Some(High),
    }
    "gl_WarpIDNV": Input(ShaderCore(Core::WarpIdNv)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[NvShaderSmBuiltins],
        precision: Some(High),
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_SMIDNV": Input(ShaderCore(Core::SmIdNv)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[NvShaderSmBuiltins],
        precision: Some(High),
        flags: variable_flags!(RAY_VOLATILE),
    }
    "gl_CoreIDARM": Input(ShaderCore(Core::CoreIdArm)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArmShaderCoreBuiltins],
        precision: Some(High),
    }
    "gl_CoreCountARM": Input(ShaderCore(Core::CoreCountArm)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArmShaderCoreBuiltins],
        precision: Some(High),
    }
    "gl_CoreMaxIDARM": Input(ShaderCore(Core::CoreMaxIdArm)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArmShaderCoreBuiltins],
        precision: Some(High),
    }
    "gl_WarpIDARM": Input(ShaderCore(Core::WarpIdArm)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArmShaderCoreBuiltins],
        precision: Some(High),
    }
    "gl_WarpMaxIDARM": Input(ShaderCore(Core::WarpMaxIdArm)) => uint {
        stages: ALL_STAGE_BITS,
        requires_one_of: &[ArmShaderCoreBuiltins],
        precision: Some(High),
    }
    "gl_TileOffsetQCOM": Input(TileOffset) => uvec2 {
        stages: COMPUTE | FRAGMENT,
        since: 460,
        requires_one_of: &[QcomTileShading],
    }
    "gl_TileDimensionQCOM": Input(TileDimension) => uvec3 {
        stages: COMPUTE | FRAGMENT,
        since: 460,
        requires_one_of: &[QcomTileShading],
    }
    "gl_TileApronSizeQCOM": Input(TileApronSize) => uvec2 {
        stages: COMPUTE | FRAGMENT,
        since: 460,
        requires_one_of: &[QcomTileShading],
    }
    "gl_NumSubgroups": Input(NumSubgroups) => uint {
        stages: COMPUTE_LIKE,
        requires_one_of: &[KhrShaderSubgroupBasic],
        precision: Some(High),
    }
    "gl_SubgroupID": Input(SubgroupId) => uint {
        stages: COMPUTE_LIKE,
        requires_one_of: &[KhrShaderSubgroupBasic],
        precision: Some(High),
    }
};
