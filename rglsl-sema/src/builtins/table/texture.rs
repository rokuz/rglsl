use rglsl_types::extension::Extension::{self, *};

use super::BuiltinFunction;
use crate::builtins::kind::AtomicOperation::{
    Add, And, CompareSwap, Exchange, Load, Max, Min, Or, Store, Xor,
};
use crate::builtins::kind::BlockMatchMetric::{AbsoluteDifferences, SquaredDifferences};
use crate::builtins::kind::BlockMatchSearch::{Block, Gather as GatherSearch, Window};
use crate::builtins::kind::BuiltinKind::Texture;
use crate::builtins::kind::GatherPattern::{Diagonal, Horizontal2, Linear4x1, Quad, Vertical2};
use crate::builtins::kind::ImageProcessing::{BlockMatch, BoxFilter, Weighted};
use crate::builtins::kind::Texture::{
    Fetch, Footprint, FragmentFetch, Gather, ImageAtomic, ImageLoad, ImageProcessing, ImageStore,
    Query, QueryLod, Sample, SparseTexelsResident, SubpassLoad,
};
use crate::builtins::kind::TextureLevel::{Gradient, Implicit, Lod};
use crate::builtins::kind::TextureQuery::{Levels, Samples, Size};
use crate::builtins::kind::{GatherOffsets, GatherPattern, Sample as Sampling, TextureGather};
use crate::builtins::{footprint, textures};

const IMPLICIT: Sampling = Sampling {
    proj: false,
    level: Implicit,
    offset: false,
    clamp: false,
    sparse: false,
};
const LOD: Sampling = Sampling {
    level: Lod,
    ..IMPLICIT
};
const GRAD: Sampling = Sampling {
    level: Gradient,
    ..IMPLICIT
};

impl Sampling {
    const fn proj(self) -> Self {
        Self { proj: true, ..self }
    }

    const fn offset(self) -> Self {
        Self {
            offset: true,
            ..self
        }
    }

    const fn clamp(self) -> Self {
        Self {
            clamp: true,
            ..self
        }
    }

    const fn sparse(self) -> Self {
        Self {
            sparse: true,
            ..self
        }
    }
}

const GATHER: TextureGather = TextureGather {
    offsets: GatherOffsets::None,
    lod: false,
    sparse: false,
    pattern: Quad,
};

impl TextureGather {
    const fn offset(self) -> Self {
        Self {
            offsets: GatherOffsets::One,
            ..self
        }
    }

    const fn offsets(self) -> Self {
        Self {
            offsets: GatherOffsets::Four,
            ..self
        }
    }

    const fn lod(self) -> Self {
        Self { lod: true, ..self }
    }

    const fn sparse(self) -> Self {
        Self {
            sparse: true,
            ..self
        }
    }

    const fn pattern(self, pattern: GatherPattern) -> Self {
        Self { pattern, ..self }
    }
}

const SPARSE: &[Extension] = &[ArbSparseTexture2];
const CLAMP: &[Extension] = &[ArbSparseTextureClamp];
const GATHER_LOD: &[Extension] = &[AmdTextureGatherBiasLod];
const IMAGE_LOD: &[Extension] = &[AmdShaderImageLoadStoreLod];
const QCOM_GATHER: &[Extension] = &[QcomImageProcessing3];

pub(super) const FUNCTIONS: &[BuiltinFunction] = builtins! {
    "textureFootprintNV": Texture(Footprint { level: Implicit, clamp: false }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::implicit),
    }
    "textureFootprintClampNV": Texture(Footprint { level: Implicit, clamp: true }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::clamp),
    }
    "textureFootprintLodNV": Texture(Footprint { level: Lod, clamp: false }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::lod),
    }
    "textureFootprintGradNV": Texture(Footprint { level: Gradient, clamp: false }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::gradient),
    }
    "textureFootprintGradClampNV": Texture(Footprint { level: Gradient, clamp: true }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: &[NvShaderTextureFootprint],
        generate: Some(footprint::gradient_clamp),
    }

    "textureSize": Texture(Query(Size)) => [] { generate: Some(textures::texture_size) }
    "imageSize": Texture(Query(Size)) => [] { generate: Some(textures::image_size) }
    "textureSamples": Texture(Query(Samples)) => [] {
        generate: Some(textures::texture_samples),
    }
    "imageSamples": Texture(Query(Samples)) => [] { generate: Some(textures::image_samples) }
    "textureQueryLevels": Texture(Query(Levels)) => [] {
        generate: Some(textures::query_levels),
    }
    "textureQueryLod": Texture(QueryLod) => [] { generate: Some(textures::query_lod) }
    "textureQueryLOD": Texture(QueryLod) => [] { generate: Some(textures::query_lod) }

    "texture": Texture(Sample(IMPLICIT)) => [] {
        flags: flags!(SAMPLED_RESULT), generate: Some(textures::sample) }
    "textureProj": Texture(Sample(IMPLICIT.proj())) => [] {
        flags: flags!(SAMPLED_RESULT), generate: Some(textures::sample) }
    "textureLod": Texture(Sample(LOD)) => [] {
        flags: flags!(SAMPLED_RESULT), generate: Some(textures::sample) }
    "textureOffset": Texture(Sample(IMPLICIT.offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::sample),
    }
    "textureProjOffset": Texture(Sample(IMPLICIT.proj().offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::sample),
    }
    "textureLodOffset": Texture(Sample(LOD.offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::sample),
    }
    "textureProjLod": Texture(Sample(LOD.proj())) => [] {
        flags: flags!(SAMPLED_RESULT), generate: Some(textures::sample) }
    "textureProjLodOffset": Texture(Sample(LOD.proj().offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::sample),
    }
    "textureGrad": Texture(Sample(GRAD)) => [] {
        flags: flags!(SAMPLED_RESULT), generate: Some(textures::sample) }
    "textureGradOffset": Texture(Sample(GRAD.offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::sample),
    }
    "textureProjGrad": Texture(Sample(GRAD.proj())) => [] {
        flags: flags!(SAMPLED_RESULT), generate: Some(textures::sample) }
    "textureProjGradOffset": Texture(Sample(GRAD.proj().offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::sample),
    }
    "textureClampARB": Texture(Sample(IMPLICIT.clamp())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: CLAMP,
        generate: Some(textures::sample),
    }
    "textureOffsetClampARB": Texture(Sample(IMPLICIT.offset().clamp())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: CLAMP,
        generate: Some(textures::sample),
    }
    "textureGradClampARB": Texture(Sample(GRAD.clamp())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: CLAMP,
        generate: Some(textures::sample),
    }
    "textureGradOffsetClampARB": Texture(Sample(GRAD.offset().clamp())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: CLAMP,
        generate: Some(textures::sample),
    }
    "sparseTextureARB": Texture(Sample(IMPLICIT.sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::sample),
    }
    "sparseTextureLodARB": Texture(Sample(LOD.sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::sample),
    }
    "sparseTextureOffsetARB": Texture(Sample(IMPLICIT.offset().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::sample),
    }
    "sparseTextureLodOffsetARB": Texture(Sample(LOD.offset().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::sample),
    }
    "sparseTextureGradARB": Texture(Sample(GRAD.sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::sample),
    }
    "sparseTextureGradOffsetARB": Texture(Sample(GRAD.offset().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::sample),
    }
    "sparseTextureClampARB": Texture(Sample(IMPLICIT.clamp().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: CLAMP,
        generate: Some(textures::sample),
    }
    "sparseTextureOffsetClampARB": Texture(Sample(IMPLICIT.offset().clamp().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: CLAMP,
        generate: Some(textures::sample),
    }
    "sparseTextureGradClampARB": Texture(Sample(GRAD.clamp().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: CLAMP,
        generate: Some(textures::sample),
    }
    "sparseTextureGradOffsetClampARB": Texture(Sample(GRAD.offset().clamp().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: CLAMP,
        generate: Some(textures::sample),
    }

    "texelFetch": Texture(Fetch { offset: false, sparse: false }) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::fetch),
    }
    "texelFetchOffset": Texture(Fetch { offset: true, sparse: false }) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::fetch),
    }
    "sparseTexelFetchARB": Texture(Fetch { offset: false, sparse: true }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::fetch),
    }
    "sparseTexelFetchOffsetARB": Texture(Fetch { offset: true, sparse: true }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::fetch),
    }
    "sparseTexelsResidentARB": Texture(SparseTexelsResident) => [bool(int)]

    "textureGather": Texture(Gather(GATHER)) => [] {
        flags: flags!(SAMPLED_RESULT), generate: Some(textures::gather) }
    "textureGatherOffset": Texture(Gather(GATHER.offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::gather),
    }
    "textureGatherOffsets": Texture(Gather(GATHER.offsets())) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::gather),
    }
    "sparseTextureGatherARB": Texture(Gather(GATHER.sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::gather),
    }
    "sparseTextureGatherOffsetARB": Texture(Gather(GATHER.offset().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::gather),
    }
    "sparseTextureGatherOffsetsARB": Texture(Gather(GATHER.offsets().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: SPARSE,
        generate: Some(textures::gather),
    }
    "textureGatherLodAMD": Texture(Gather(GATHER.lod())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: GATHER_LOD,
        generate: Some(textures::gather),
    }
    "textureGatherLodOffsetAMD": Texture(Gather(GATHER.lod().offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: GATHER_LOD,
        generate: Some(textures::gather),
    }
    "textureGatherLodOffsetsAMD": Texture(Gather(GATHER.lod().offsets())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: GATHER_LOD,
        generate: Some(textures::gather),
    }
    "sparseTextureGatherLodAMD": Texture(Gather(GATHER.lod().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: GATHER_LOD,
        generate: Some(textures::gather),
    }
    "sparseTextureGatherLodOffsetAMD": Texture(Gather(GATHER.lod().offset().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: GATHER_LOD,
        generate: Some(textures::gather),
    }
    "sparseTextureGatherLodOffsetsAMD": Texture(Gather(GATHER.lod().offsets().sparse())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: GATHER_LOD,
        generate: Some(textures::gather),
    }
    "textureGather4x1QCOM": Texture(Gather(GATHER.pattern(Linear4x1))) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: QCOM_GATHER,
        generate: Some(textures::gather),
    }
    "textureGather4x1OffsetQCOM": Texture(Gather(GATHER.pattern(Linear4x1).offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: QCOM_GATHER,
        generate: Some(textures::gather),
    }
    "textureGatherV2QCOM": Texture(Gather(GATHER.pattern(Vertical2))) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: QCOM_GATHER,
        generate: Some(textures::gather),
    }
    "textureGatherV2OffsetQCOM": Texture(Gather(GATHER.pattern(Vertical2).offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: QCOM_GATHER,
        generate: Some(textures::gather),
    }
    "textureGatherH2QCOM": Texture(Gather(GATHER.pattern(Horizontal2))) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: QCOM_GATHER,
        generate: Some(textures::gather),
    }
    "textureGatherH2OffsetQCOM": Texture(Gather(GATHER.pattern(Horizontal2).offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: QCOM_GATHER,
        generate: Some(textures::gather),
    }
    "textureGatherDQCOM": Texture(Gather(GATHER.pattern(Diagonal))) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: QCOM_GATHER,
        generate: Some(textures::gather),
    }
    "textureGatherDOffsetQCOM": Texture(Gather(GATHER.pattern(Diagonal).offset())) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: QCOM_GATHER,
        generate: Some(textures::gather),
    }

    "imageLoad": Texture(ImageLoad { lod: false, sparse: false }) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::image_load),
    }
    "sparseImageLoadARB": Texture(ImageLoad { lod: false, sparse: true }) => [] {
        requires: SPARSE,
        generate: Some(textures::image_load),
    }
    "imageLoadLodAMD": Texture(ImageLoad { lod: true, sparse: false }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: IMAGE_LOD,
        generate: Some(textures::image_load),
    }
    "sparseImageLoadLodAMD": Texture(ImageLoad { lod: true, sparse: true }) => [] {
        requires: IMAGE_LOD,
        generate: Some(textures::image_load),
    }
    "imageStore": Texture(ImageStore { lod: false }) => [] {
        flags: flags!(SAMPLED_RESULT),
        generate: Some(textures::image_store),
    }
    "imageStoreLodAMD": Texture(ImageStore { lod: true }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: IMAGE_LOD,
        generate: Some(textures::image_store),
    }
    "imageAtomicAdd": Texture(ImageAtomic(Add)) => [] { generate: Some(textures::image_atomic) }
    "imageAtomicMin": Texture(ImageAtomic(Min)) => [] { generate: Some(textures::image_atomic) }
    "imageAtomicMax": Texture(ImageAtomic(Max)) => [] { generate: Some(textures::image_atomic) }
    "imageAtomicAnd": Texture(ImageAtomic(And)) => [] { generate: Some(textures::image_atomic) }
    "imageAtomicOr": Texture(ImageAtomic(Or)) => [] { generate: Some(textures::image_atomic) }
    "imageAtomicXor": Texture(ImageAtomic(Xor)) => [] { generate: Some(textures::image_atomic) }
    "imageAtomicExchange": Texture(ImageAtomic(Exchange)) => [] {
        generate: Some(textures::image_atomic),
    }
    "imageAtomicCompSwap": Texture(ImageAtomic(CompareSwap)) => [] {
        generate: Some(textures::image_atomic),
    }
    "imageAtomicLoad": Texture(ImageAtomic(Load)) => [] {
        generate: Some(textures::image_atomic),
    }
    "imageAtomicStore": Texture(ImageAtomic(Store)) => [] {
        generate: Some(textures::image_atomic),
    }

    "subpassLoad": Texture(SubpassLoad) => [] { generate: Some(textures::subpass_load) }
    "fragmentMaskFetchAMD": Texture(FragmentFetch { mask: true }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: &[AmdShaderFragmentMask],
        generate: Some(textures::fragment_fetch),
    }
    "fragmentFetchAMD": Texture(FragmentFetch { mask: false }) => [] {
        flags: flags!(SAMPLED_RESULT),
        requires: &[AmdShaderFragmentMask],
        generate: Some(textures::fragment_fetch),
    }

    "textureWeightedQCOM": Texture(ImageProcessing(Weighted)) => [] {
        requires: &[QcomImageProcessing],
        generate: Some(textures::weighted),
    }
    "textureBoxFilterQCOM": Texture(ImageProcessing(BoxFilter)) => [] {
        requires: &[QcomImageProcessing],
        generate: Some(textures::box_filter),
    }
    "textureBlockMatchSADQCOM": Texture(ImageProcessing(BlockMatch {
        metric: AbsoluteDifferences,
        search: Block,
    })) => [] {
        requires: &[QcomImageProcessing],
        generate: Some(textures::block_match),
    }
    "textureBlockMatchSSDQCOM": Texture(ImageProcessing(BlockMatch {
        metric: SquaredDifferences,
        search: Block,
    })) => [] {
        requires: &[QcomImageProcessing],
        generate: Some(textures::block_match),
    }
    "textureBlockMatchWindowSADQCOM": Texture(ImageProcessing(BlockMatch {
        metric: AbsoluteDifferences,
        search: Window,
    })) => [] {
        requires: &[QcomImageProcessing2],
        generate: Some(textures::block_match),
    }
    "textureBlockMatchWindowSSDQCOM": Texture(ImageProcessing(BlockMatch {
        metric: SquaredDifferences,
        search: Window,
    })) => [] {
        requires: &[QcomImageProcessing2],
        generate: Some(textures::block_match),
    }
    "textureBlockMatchGatherSADQCOM": Texture(ImageProcessing(BlockMatch {
        metric: AbsoluteDifferences,
        search: GatherSearch,
    })) => [] {
        requires: &[QcomImageProcessing2],
        generate: Some(textures::block_match),
    }
    "textureBlockMatchGatherSSDQCOM": Texture(ImageProcessing(BlockMatch {
        metric: SquaredDifferences,
        search: GatherSearch,
    })) => [] {
        requires: &[QcomImageProcessing2],
        generate: Some(textures::block_match),
    }
};
