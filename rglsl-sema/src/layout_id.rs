use rglsl_types::ShaderStageMask;
use rglsl_types::extension::Extension;

use crate::types::Packing;

const ALL: ShaderStageMask = ShaderStageMask::all();
const FRAGMENT: ShaderStageMask = ShaderStageMask::FRAGMENT;
const GEOMETRY: ShaderStageMask = ShaderStageMask::GEOMETRY;
const TESS_CONTROL: ShaderStageMask = ShaderStageMask::TESS_CONTROL;
const TESS_EVALUATION: ShaderStageMask = ShaderStageMask::TESS_EVALUATION;
const COMPUTE: ShaderStageMask = ShaderStageMask::COMPUTE;
const MESH: ShaderStageMask = ShaderStageMask::MESH;
const MESH_LIKE: ShaderStageMask = ShaderStageMask::MESH_LIKE;
const COMPUTE_LIKE: ShaderStageMask = ShaderStageMask::COMPUTE_LIKE;
const RAY_TRACING: ShaderStageMask = ShaderStageMask::RAY_TRACING;
const PRE_RASTERIZATION: ShaderStageMask = ShaderStageMask::VERTEX
    .union(ShaderStageMask::TESS_CONTROL)
    .union(ShaderStageMask::TESS_EVALUATION)
    .union(ShaderStageMask::GEOMETRY);

const BINDLESS_TEXTURE: &[Extension] = &[Extension::ArbBindlessTexture];
const MULTIVIEW: &[Extension] = &[Extension::OvrMultiview, Extension::OvrMultiview2];
const MESH_ANY: &[Extension] = &[Extension::ExtMeshShader, Extension::NvMeshShader];

const BLEND_EXT: LayoutExtension = LayoutExtension {
    feature: "blend equation",
    stages: FRAGMENT,
    extensions: &[Extension::KhrBlendEquationAdvanced],
};

pub(crate) const LOCAL_SIZE_EXT: LayoutExtension = LayoutExtension {
    feature: "gl_WorkGroupSize",
    stages: MESH_LIKE,
    extensions: MESH_ANY,
};

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum LayoutKind {
    Flag(ShaderStageMask),
    Value(ShaderStageMask),
}

impl LayoutKind {
    pub const fn flag_stages(self) -> Option<ShaderStageMask> {
        match self {
            Self::Flag(stages) => Some(stages),
            Self::Value(_) => None,
        }
    }

    pub const fn value_stages(self) -> Option<ShaderStageMask> {
        match self {
            Self::Flag(_) => None,
            Self::Value(stages) => Some(stages),
        }
    }

    pub const fn stages(self) -> ShaderStageMask {
        match self {
            Self::Flag(stages) | Self::Value(stages) => stages,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct LayoutExtension {
    pub feature: &'static str,
    pub stages: ShaderStageMask,
    pub extensions: &'static [Extension],
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct LayoutInfo {
    pub kind: LayoutKind,
    pub literal_name: Option<&'static str>,
    pub takes_any_value: bool,
    pub image_format: bool,
    pub extension: Option<LayoutExtension>,
}

impl LayoutInfo {
    const fn default_of(kind: LayoutKind) -> Self {
        Self {
            kind,
            literal_name: None,
            takes_any_value: false,
            image_format: false,
            extension: None,
        }
    }
}

macro_rules! layout_ids {
    ($($variant:ident $name:literal: $kind:expr => { $($field:ident: $value:expr),* $(,)? })*) => {
        #[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
        #[repr(u8)]
        pub enum LayoutId {
            $($variant,)*
        }

        impl LayoutId {
            pub const COUNT: usize = [$($name),*].len();

            pub const ALL: [Self; Self::COUNT] = [$(Self::$variant),*];

            const NAMES: [&'static str; Self::COUNT] = [$($name),*];

            pub const fn name(self) -> &'static str {
                match self {
                    $(Self::$variant => $name,)*
                }
            }

            pub const fn info(self) -> &'static LayoutInfo {
                use LayoutKind::*;
                match self {
                    $(
                        Self::$variant => const {
                            &LayoutInfo {
                                $($field: $value,)*
                                ..LayoutInfo::default_of($kind)
                            }
                        },
                    )*
                }
            }
        }
    };
}

layout_ids! {
    Align "align": Value(ALL) => {}
    Bank "bank": Value(ALL) => {}
    Binding "binding": Value(ALL) => {}
    BindlessImage "bindless_image": Flag(ALL) => {
        extension: Some(LayoutExtension {
            feature: "bindless_image",
            stages: ALL,
            extensions: BINDLESS_TEXTURE,
        }),
    }
    BindlessSampler "bindless_sampler": Flag(ALL) => {
        extension: Some(LayoutExtension {
            feature: "bindless_sampler",
            stages: ALL,
            extensions: BINDLESS_TEXTURE,
        }),
    }
    BlendSupportAllEquations "blend_support_all_equations": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportColorburn "blend_support_colorburn": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportColordodge "blend_support_colordodge": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportDarken "blend_support_darken": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportDifference "blend_support_difference": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportExclusion "blend_support_exclusion": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportHardlight "blend_support_hardlight": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportHslColor "blend_support_hsl_color": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportHslHue "blend_support_hsl_hue": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportHslLuminosity "blend_support_hsl_luminosity": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportHslSaturation "blend_support_hsl_saturation": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportLighten "blend_support_lighten": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportMultiply "blend_support_multiply": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportOverlay "blend_support_overlay": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportScreen "blend_support_screen": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BlendSupportSoftlight "blend_support_softlight": Flag(FRAGMENT) => { extension: Some(BLEND_EXT) }
    BoundImage "bound_image": Flag(ALL) => {
        extension: Some(LayoutExtension {
            feature: "bound_image",
            stages: ALL,
            extensions: BINDLESS_TEXTURE,
        }),
    }
    BoundSampler "bound_sampler": Flag(ALL) => {
        extension: Some(LayoutExtension {
            feature: "bound_sampler",
            stages: ALL,
            extensions: BINDLESS_TEXTURE,
        }),
    }
    BufferReference "buffer_reference": Flag(ALL) => {}
    BufferReferenceAlign "buffer_reference_align": Value(ALL) => {}
    BufferType "buffer_type": Flag(ALL) => {}
    Ccw "ccw": Flag(TESS_EVALUATION) => {}
    ColumnMajor "column_major": Flag(ALL) => {}
    Component "component": Value(ALL) => {}
    ConstantId "constant_id": Value(ALL) => {}
    Cw "cw": Flag(TESS_EVALUATION) => {}
    DepthAny "depth_any": Flag(FRAGMENT) => {}
    DepthGreater "depth_greater": Flag(FRAGMENT) => {}
    DepthLess "depth_less": Flag(FRAGMENT) => {}
    DepthUnchanged "depth_unchanged": Flag(FRAGMENT) => {}
    DerivativeGroupLinearKhr "derivative_group_linearkhr": Flag(COMPUTE_LIKE) => {
        extension: Some(LayoutExtension {
            feature: "compute shader derivatives",
            stages: COMPUTE_LIKE,
            extensions: &[Extension::KhrComputeShaderDerivatives],
        }),
    }
    DerivativeGroupLinearNv "derivative_group_linearnv": Flag(COMPUTE_LIKE) => {
        extension: Some(LayoutExtension {
            feature: "compute shader derivatives",
            stages: COMPUTE_LIKE,
            extensions: &[Extension::NvComputeShaderDerivatives],
        }),
    }
    DerivativeGroupQuadsKhr "derivative_group_quadskhr": Flag(COMPUTE_LIKE) => {
        extension: Some(LayoutExtension {
            feature: "compute shader derivatives",
            stages: COMPUTE_LIKE,
            extensions: &[Extension::KhrComputeShaderDerivatives],
        }),
    }
    DerivativeGroupQuadsNv "derivative_group_quadsnv": Flag(COMPUTE_LIKE) => {
        extension: Some(LayoutExtension {
            feature: "compute shader derivatives",
            stages: COMPUTE_LIKE,
            extensions: &[Extension::NvComputeShaderDerivatives],
        }),
    }
    DescriptorHeap "descriptor_heap": Flag(ALL) => {}
    DescriptorSize "descriptor_size": Value(ALL) => {}
    DescriptorStride "descriptor_stride": Value(ALL) => { takes_any_value: true }
    EarlyAndLateFragmentTestsAmd "early_and_late_fragment_tests_amd": Flag(FRAGMENT) => {}
    EarlyFragmentTests "early_fragment_tests": Flag(FRAGMENT) => {}
    EqualSpacing "equal_spacing": Flag(TESS_EVALUATION) => {}
    FractionalEvenSpacing "fractional_even_spacing": Flag(TESS_EVALUATION) => {}
    FractionalOddSpacing "fractional_odd_spacing": Flag(TESS_EVALUATION) => {}
    FullQuads "full_quads": Flag(FRAGMENT) => {}
    HeapOffset "heap_offset": Value(ALL) => { takes_any_value: true }
    HitObjectShaderRecordExt "hitobjectshaderrecordext": Flag(RAY_TRACING) => {
        extension: Some(LayoutExtension {
            feature: "hitobject shader record EXT",
            stages: RAY_TRACING,
            extensions: &[Extension::ExtShaderInvocationReorder],
        }),
    }
    HitObjectShaderRecordNv "hitobjectshaderrecordnv": Flag(RAY_TRACING) => {
        extension: Some(LayoutExtension {
            feature: "hitobject shader record NV",
            stages: RAY_TRACING,
            extensions: &[Extension::NvShaderInvocationReorder],
        }),
    }
    Index "index": Value(FRAGMENT) => {}
    InputAttachmentIndex "input_attachment_index": Value(ALL) => {}
    Invocations "invocations": Value(GEOMETRY) => {}
    Isolines "isolines": Flag(TESS_EVALUATION) => {}
    LineStrip "line_strip": Flag(GEOMETRY) => {}
    Lines "lines": Flag(GEOMETRY.union(MESH)) => {}
    LinesAdjacency "lines_adjacency": Flag(GEOMETRY) => {}
    LocalSizeX "local_size_x": Value(COMPUTE_LIKE) => {
        literal_name: Some("local_size"),
        extension: Some(LOCAL_SIZE_EXT),
    }
    LocalSizeXId "local_size_x_id": Value(COMPUTE_LIKE) => {
        literal_name: Some("local_size"),
        extension: Some(LOCAL_SIZE_EXT),
    }
    LocalSizeY "local_size_y": Value(COMPUTE_LIKE) => {
        literal_name: Some("local_size"),
        extension: Some(LOCAL_SIZE_EXT),
    }
    LocalSizeYId "local_size_y_id": Value(COMPUTE_LIKE) => {
        literal_name: Some("local_size"),
        extension: Some(LOCAL_SIZE_EXT),
    }
    LocalSizeZ "local_size_z": Value(COMPUTE_LIKE) => {
        literal_name: Some("local_size"),
        extension: Some(LOCAL_SIZE_EXT),
    }
    LocalSizeZId "local_size_z_id": Value(COMPUTE_LIKE) => {
        literal_name: Some("local_size"),
        extension: Some(LOCAL_SIZE_EXT),
    }
    Location "location": Value(ALL) => {}
    MaxPrimitives "max_primitives": Value(MESH) => {
        extension: Some(LayoutExtension {
            feature: "max_primitives",
            stages: MESH,
            extensions: MESH_ANY,
        }),
    }
    MaxVertices "max_vertices": Value(GEOMETRY.union(MESH)) => {
        extension: Some(LayoutExtension {
            feature: "max_vertices",
            stages: MESH,
            extensions: MESH_ANY,
        }),
    }
    MemberOffset "member_offset": Value(ALL) => {}
    NonCoherentAttachmentReadQcom "non_coherent_attachment_readqcom": Flag(FRAGMENT) => {}
    NonCoherentColorAttachmentReadExt "non_coherent_color_attachment_readext": Flag(FRAGMENT) => {}
    NonCoherentDepthAttachmentReadExt "non_coherent_depth_attachment_readext": Flag(FRAGMENT) => {}
    NonCoherentStencilAttachmentReadExt "non_coherent_stencil_attachment_readext": Flag(FRAGMENT) => {}
    FormatNone "none": Flag(ALL) => {}
    NumViews "num_views": Value(ALL) => {
        extension: Some(LayoutExtension {
            feature: "num_views",
            stages: ALL,
            extensions: MULTIVIEW,
        }),
    }
    Offset "offset": Value(ALL) => {}
    OriginUpperLeft "origin_upper_left": Flag(FRAGMENT) => {}
    OverrideCoverage "override_coverage": Flag(FRAGMENT) => {}
    Packed "packed": Flag(ALL) => {}
    Passthrough "passthrough": Flag(GEOMETRY) => {}
    PixelCenterInteger "pixel_center_integer": Flag(FRAGMENT) => {}
    PixelInterlockOrdered "pixel_interlock_ordered": Flag(FRAGMENT) => {}
    PixelInterlockUnordered "pixel_interlock_unordered": Flag(FRAGMENT) => {}
    PointMode "point_mode": Flag(TESS_EVALUATION) => {}
    Points "points": Flag(GEOMETRY.union(MESH)) => {}
    PostDepthCoverage "post_depth_coverage": Flag(FRAGMENT) => {}
    PrimitiveCulling "primitive_culling": Flag(ALL) => {}
    PushConstant "push_constant": Flag(ALL) => {}
    QuadDerivatives "quad_derivatives": Flag(ALL) => {}
    Quads "quads": Flag(TESS_EVALUATION) => {}
    R11fG11fB10f "r11f_g11f_b10f": Flag(ALL) => { image_format: true }
    R16 "r16": Flag(ALL) => { image_format: true }
    R16Snorm "r16_snorm": Flag(ALL) => { image_format: true }
    R16f "r16f": Flag(ALL) => { image_format: true }
    R16i "r16i": Flag(ALL) => { image_format: true }
    R16ui "r16ui": Flag(ALL) => { image_format: true }
    R32f "r32f": Flag(ALL) => { image_format: true }
    R32i "r32i": Flag(ALL) => { image_format: true }
    R32ui "r32ui": Flag(ALL) => { image_format: true }
    R64i "r64i": Flag(ALL) => { image_format: true }
    R64ui "r64ui": Flag(ALL) => { image_format: true }
    R8 "r8": Flag(ALL) => { image_format: true }
    R8Snorm "r8_snorm": Flag(ALL) => { image_format: true }
    R8i "r8i": Flag(ALL) => { image_format: true }
    R8ui "r8ui": Flag(ALL) => { image_format: true }
    Rg16 "rg16": Flag(ALL) => { image_format: true }
    Rg16Snorm "rg16_snorm": Flag(ALL) => { image_format: true }
    Rg16f "rg16f": Flag(ALL) => { image_format: true }
    Rg16i "rg16i": Flag(ALL) => { image_format: true }
    Rg16ui "rg16ui": Flag(ALL) => { image_format: true }
    Rg32f "rg32f": Flag(ALL) => { image_format: true }
    Rg32i "rg32i": Flag(ALL) => { image_format: true }
    Rg32ui "rg32ui": Flag(ALL) => { image_format: true }
    Rg8 "rg8": Flag(ALL) => { image_format: true }
    Rg8Snorm "rg8_snorm": Flag(ALL) => { image_format: true }
    Rg8i "rg8i": Flag(ALL) => { image_format: true }
    Rg8ui "rg8ui": Flag(ALL) => { image_format: true }
    Rgb10A2 "rgb10_a2": Flag(ALL) => { image_format: true }
    Rgb10A2ui "rgb10_a2ui": Flag(ALL) => { image_format: true }
    Rgba16 "rgba16": Flag(ALL) => { image_format: true }
    Rgba16Snorm "rgba16_snorm": Flag(ALL) => { image_format: true }
    Rgba16f "rgba16f": Flag(ALL) => { image_format: true }
    Rgba16i "rgba16i": Flag(ALL) => { image_format: true }
    Rgba16ui "rgba16ui": Flag(ALL) => { image_format: true }
    Rgba32f "rgba32f": Flag(ALL) => { image_format: true }
    Rgba32i "rgba32i": Flag(ALL) => { image_format: true }
    Rgba32ui "rgba32ui": Flag(ALL) => { image_format: true }
    Rgba8 "rgba8": Flag(ALL) => { image_format: true }
    Rgba8Snorm "rgba8_snorm": Flag(ALL) => { image_format: true }
    Rgba8i "rgba8i": Flag(ALL) => { image_format: true }
    Rgba8ui "rgba8ui": Flag(ALL) => { image_format: true }
    RowMajor "row_major": Flag(ALL) => {}
    SampleInterlockOrdered "sample_interlock_ordered": Flag(FRAGMENT) => {}
    SampleInterlockUnordered "sample_interlock_unordered": Flag(FRAGMENT) => {}
    Scalar "scalar": Flag(ALL) => {
        extension: Some(LayoutExtension {
            feature: "scalar block layout",
            stages: ALL,
            extensions: &[Extension::ExtScalarBlockLayout],
        }),
    }
    SecondaryViewOffset "secondary_view_offset": Value(PRE_RASTERIZATION) => {}
    Set "set": Value(ALL) => {}
    ShaderRecordExt "shaderrecordext": Flag(RAY_TRACING) => {
        extension: Some(LayoutExtension {
            feature: "shader record EXT",
            stages: RAY_TRACING,
            extensions: &[Extension::ExtRayTracing],
        }),
    }
    ShaderRecordNv "shaderrecordnv": Flag(RAY_TRACING) => {
        extension: Some(LayoutExtension {
            feature: "shader record NV",
            stages: RAY_TRACING,
            extensions: &[Extension::NvRayTracing],
        }),
    }
    ShadingRateInterlockOrdered "shading_rate_interlock_ordered": Flag(FRAGMENT) => {}
    ShadingRateInterlockUnordered "shading_rate_interlock_unordered": Flag(FRAGMENT) => {}
    ShadingRateXQcom "shading_rate_xqcom": Value(COMPUTE_LIKE) => {
        literal_name: Some("shading_rate_*QCOM"),
    }
    ShadingRateYQcom "shading_rate_yqcom": Value(COMPUTE_LIKE) => {
        literal_name: Some("shading_rate_*QCOM"),
    }
    ShadingRateZQcom "shading_rate_zqcom": Value(COMPUTE_LIKE) => {
        literal_name: Some("shading_rate_*QCOM"),
    }
    Shared "shared": Flag(ALL) => {}
    Size1x16 "size1x16": Flag(ALL) => {}
    Size1x32 "size1x32": Flag(ALL) => {}
    Size1x8 "size1x8": Flag(ALL) => {}
    Size2x32 "size2x32": Flag(ALL) => {}
    Size4x32 "size4x32": Flag(ALL) => {}
    Std140 "std140": Flag(ALL) => {}
    Std430 "std430": Flag(ALL) => {}
    StencilRefGreaterBackAmd "stencil_ref_greater_back_amd": Flag(FRAGMENT) => {}
    StencilRefGreaterFrontAmd "stencil_ref_greater_front_amd": Flag(FRAGMENT) => {}
    StencilRefLessBackAmd "stencil_ref_less_back_amd": Flag(FRAGMENT) => {}
    StencilRefLessFrontAmd "stencil_ref_less_front_amd": Flag(FRAGMENT) => {}
    StencilRefUnchangedBackAmd "stencil_ref_unchanged_back_amd": Flag(FRAGMENT) => {}
    StencilRefUnchangedFrontAmd "stencil_ref_unchanged_front_amd": Flag(FRAGMENT) => {}
    Stream "stream": Value(GEOMETRY) => {}
    TileAttachmentQcom "tile_attachmentqcom": Flag(FRAGMENT.union(COMPUTE)) => {}
    TriangleStrip "triangle_strip": Flag(GEOMETRY) => {}
    Triangles "triangles": Flag(GEOMETRY.union(TESS_EVALUATION).union(MESH)) => {}
    TrianglesAdjacency "triangles_adjacency": Flag(GEOMETRY) => {}
    Vertices "vertices": Value(TESS_CONTROL) => {}
    ViewportRelative "viewport_relative": Flag(PRE_RASTERIZATION) => {}
    XfbBuffer "xfb_buffer": Value(ALL) => {}
    XfbOffset "xfb_offset": Value(ALL) => {}
    XfbStride "xfb_stride": Value(ALL) => {}
}

const fn precedes(left: &[u8], right: &[u8]) -> bool {
    let mut left = left;
    let mut right = right;
    while let ([first, left_tail @ ..], [second, right_tail @ ..]) = (left, right) {
        if *first != *second {
            return *first < *second;
        }
        left = left_tail;
        right = right_tail;
    }
    left.len() < right.len()
}

const fn names_sorted(names: &[&str]) -> bool {
    let mut rest = names;
    while let [first, tail @ ..] = rest {
        if let [second, ..] = tail
            && !precedes(first.as_bytes(), second.as_bytes())
        {
            return false;
        }
        rest = tail;
    }
    true
}

const _: () = assert!(names_sorted(&LayoutId::NAMES));

impl LayoutId {
    pub fn from_name(name: &str) -> Option<Self> {
        Self::NAMES
            .binary_search(&name)
            .ok()
            .and_then(|index| Self::ALL.get(index).copied())
    }

    pub const fn literal_name(self) -> &'static str {
        match self.info().literal_name {
            Some(name) => name,
            None => self.name(),
        }
    }

    pub const fn is_image_format(self) -> bool {
        self.info().image_format
    }

    pub const fn is_xfb(self) -> bool {
        matches!(self, Self::XfbBuffer | Self::XfbOffset | Self::XfbStride)
    }

    pub const fn is_shader_record(self) -> bool {
        matches!(self, Self::ShaderRecordNv | Self::ShaderRecordExt)
    }

    pub const fn is_derivative_group(self) -> bool {
        matches!(
            self,
            Self::DerivativeGroupQuadsNv
                | Self::DerivativeGroupLinearNv
                | Self::DerivativeGroupQuadsKhr
                | Self::DerivativeGroupLinearKhr
        )
    }

    pub const fn packing(self) -> Option<Packing> {
        match self {
            Self::Std140 | Self::Shared | Self::Packed => Some(Packing::Std140),
            Self::Std430 => Some(Packing::Std430),
            Self::Scalar => Some(Packing::Scalar),
            _ => None,
        }
    }

    pub const fn explicit_packing(self) -> Option<Packing> {
        match self {
            Self::Std140 => Some(Packing::Std140),
            Self::Std430 => Some(Packing::Std430),
            Self::Scalar => Some(Packing::Scalar),
            _ => None,
        }
    }

    pub const fn local_size_axis(self) -> Option<usize> {
        match self {
            Self::LocalSizeX => Some(0),
            Self::LocalSizeY => Some(1),
            Self::LocalSizeZ => Some(2),
            _ => None,
        }
    }

    pub const fn local_size_id_axis(self) -> Option<usize> {
        match self {
            Self::LocalSizeXId => Some(0),
            Self::LocalSizeYId => Some(1),
            Self::LocalSizeZId => Some(2),
            _ => None,
        }
    }

    pub const fn tile_shading_rate_axis(self) -> Option<usize> {
        match self {
            Self::ShadingRateXQcom => Some(0),
            Self::ShadingRateYQcom => Some(1),
            Self::ShadingRateZQcom => Some(2),
            _ => None,
        }
    }
}

impl core::fmt::Display for LayoutId {
    fn fmt(&self, formatter: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        formatter.write_str(self.name())
    }
}

#[cfg(test)]
mod tests {
    use super::LayoutId;

    #[test]
    fn every_name_finds_its_layout_id() {
        for (index, id) in LayoutId::ALL.into_iter().enumerate() {
            assert_eq!(id as usize, index);
            assert_eq!(LayoutId::from_name(id.name()), Some(id));
        }
        assert_eq!(LayoutId::from_name("unknown_layout"), None);
        assert_eq!(LayoutId::COUNT, 167);
    }
}
