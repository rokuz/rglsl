use alloc::vec::Vec;

use super::kind::{
    AtomicOperation, BuiltinKind, GatherOffsets, GatherPattern, Sample, Texture, TextureGather,
    TextureLevel,
};
use super::table::Emitter;
use super::{ALL_STAGES, COMPUTE, FRAGMENT, MESH, TASK};
use crate::scope::Direction;
use crate::types::{ArraySize, Opaque, OpaqueKind, SampledType, Scalar, TextureDimension, Type};

const fn sized(scalar: Scalar, count: u8) -> Type {
    Type::vector(scalar, count)
}

const fn texel(opaque: Opaque) -> Type {
    Type::vector(opaque.sampled.scalar(), 4)
}

const fn input(ty: Type) -> (Type, Direction) {
    (ty, Direction::In)
}

fn common(emitter: &mut Emitter<'_>, result: Type, parameters: Vec<Type>) {
    staged(emitter, result, parameters, ALL_STAGES);
}

fn staged(emitter: &mut Emitter<'_>, result: Type, parameters: Vec<Type>, stages: u16) {
    emitter.push(result, parameters.into_iter().map(input).collect(), stages);
}

fn sparse(
    emitter: &mut Emitter<'_>,
    parameters: Vec<Type>,
    texel: Type,
    trailing: &[Type],
    stages: u16,
) {
    let mut parameters: Vec<(Type, Direction)> = parameters.into_iter().map(input).collect();
    parameters.push((texel, Direction::Out));
    parameters.extend(trailing.iter().cloned().map(input));
    emitter.push(Type::INT, parameters, stages);
}

const fn texture(emitter: &Emitter<'_>) -> Option<Texture> {
    if let BuiltinKind::Texture(texture) = emitter.kind() {
        Some(texture)
    } else {
        None
    }
}

const IMPLICIT_LOD_STAGES: u16 = FRAGMENT | COMPUTE;
const DERIVATIVE_STAGES: u16 = FRAGMENT | COMPUTE | TASK | MESH;

fn opaque_types() -> Vec<Opaque> {
    let mut types = Vec::new();
    for kind in [OpaqueKind::CombinedSampler, OpaqueKind::Image] {
        for shadow in [false, true] {
            for multisample in [false, true] {
                for arrayed in [false, true] {
                    for dimension in TextureDimension::ALL {
                        let wide: &[SampledType] = if kind == OpaqueKind::Image {
                            &SampledType::WIDE
                        } else {
                            &[]
                        };
                        for &sampled in SampledType::ALL.iter().chain(wide) {
                            let opaque = Opaque {
                                kind,
                                sampled,
                                dimension,
                                arrayed,
                                shadow,
                                multisample,
                            };
                            if is_valid(opaque) {
                                types.push(opaque);
                            }
                        }
                    }
                }
            }
        }
    }
    types
}

fn samplers() -> impl Iterator<Item = Opaque> {
    opaque_types()
        .into_iter()
        .filter(|opaque| opaque.kind == OpaqueKind::CombinedSampler)
}

fn images() -> impl Iterator<Item = Opaque> {
    opaque_types()
        .into_iter()
        .filter(|opaque| opaque.is_image())
}

fn sampled() -> impl Iterator<Item = Opaque> {
    let textures = samplers()
        .filter(|opaque| !opaque.shadow)
        .map(|opaque| Opaque {
            kind: OpaqueKind::Texture,
            ..opaque
        });
    samplers().chain(textures)
}

fn is_valid(opaque: Opaque) -> bool {
    let dimension = opaque.dimension;
    if opaque.shadow && (opaque.multisample || opaque.is_image()) {
        return false;
    }
    if opaque.multisample && dimension != TextureDimension::D2 {
        return false;
    }
    if opaque.is_buffer() && (opaque.shadow || opaque.arrayed) {
        return false;
    }
    if dimension == TextureDimension::D3 && (opaque.shadow || opaque.arrayed) {
        return false;
    }
    !(opaque.shadow && opaque.sampled != SampledType::Float)
}

fn size(opaque: Opaque) -> Type {
    let cube = opaque.dimension == TextureDimension::Cube;
    sized(
        Scalar::Int,
        opaque.dimension.coordinate_count() + u8::from(opaque.arrayed) - u8::from(cube),
    )
}

pub(crate) fn texture_size(emitter: &mut Emitter<'_>) {
    for opaque in sampled() {
        let ty = Type::opaque(opaque);
        if opaque.is_buffer() || opaque.multisample {
            common(emitter, size(opaque), alloc::vec![ty]);
        } else {
            common(emitter, size(opaque), alloc::vec![ty, Type::INT]);
        }
    }
}

pub(crate) fn image_size(emitter: &mut Emitter<'_>) {
    for opaque in images() {
        common(emitter, size(opaque), alloc::vec![Type::opaque(opaque)]);
    }
}

pub(crate) fn texture_samples(emitter: &mut Emitter<'_>) {
    for opaque in sampled().filter(|opaque| opaque.multisample) {
        common(emitter, Type::INT, alloc::vec![Type::opaque(opaque)]);
    }
}

pub(crate) fn image_samples(emitter: &mut Emitter<'_>) {
    for opaque in images().filter(|opaque| opaque.multisample) {
        common(emitter, Type::INT, alloc::vec![Type::opaque(opaque)]);
    }
}

const fn has_levels(opaque: Opaque) -> bool {
    !opaque.multisample && !opaque.is_buffer()
}

pub(crate) fn query_lod(emitter: &mut Emitter<'_>) {
    for opaque in samplers().filter(|&opaque| has_levels(opaque)) {
        let coordinate = sized(Scalar::Float, opaque.dimension.coordinate_count());
        staged(
            emitter,
            Type::vector(Scalar::Float, 2),
            alloc::vec![Type::opaque(opaque), coordinate],
            DERIVATIVE_STAGES,
        );
    }
}

pub(crate) fn query_levels(emitter: &mut Emitter<'_>) {
    for opaque in sampled().filter(|&opaque| has_levels(opaque)) {
        common(emitter, Type::INT, alloc::vec![Type::opaque(opaque)]);
    }
}

fn image_base(opaque: Opaque) -> Vec<Type> {
    let cube = opaque.dimension == TextureDimension::Cube;
    let count = opaque.dimension.coordinate_count() + u8::from(opaque.arrayed && !cube);
    let mut base = alloc::vec![Type::opaque(opaque), sized(Scalar::Int, count)];
    if opaque.multisample {
        base.push(Type::INT);
    }
    base
}

fn with(mut parameters: Vec<Type>, extra: &[Type]) -> Vec<Type> {
    parameters.extend_from_slice(extra);
    parameters
}

pub(crate) fn image_load(emitter: &mut Emitter<'_>) {
    let Some(Texture::ImageLoad { lod, sparse: load }) = texture(emitter) else {
        return;
    };
    for opaque in images() {
        let linear = opaque.dimension == TextureDimension::D1;
        let mut parameters = image_base(opaque);
        if lod {
            if opaque.multisample || opaque.is_buffer() {
                continue;
            }
            parameters.push(Type::INT);
        }
        if !load {
            common(emitter, texel(opaque), parameters);
        } else if !linear && !opaque.is_buffer() {
            sparse(emitter, parameters, texel(opaque), &[], ALL_STAGES);
        }
    }
}

pub(crate) fn image_store(emitter: &mut Emitter<'_>) {
    let Some(Texture::ImageStore { lod }) = texture(emitter) else {
        return;
    };
    for opaque in images() {
        let mut parameters = image_base(opaque);
        if lod {
            if opaque.multisample || opaque.is_buffer() {
                continue;
            }
            parameters.push(Type::INT);
        }
        parameters.push(texel(opaque));
        common(emitter, Type::VOID, parameters);
    }
}

pub(crate) fn image_atomic(emitter: &mut Emitter<'_>) {
    let Some(Texture::ImageAtomic(operation)) = texture(emitter) else {
        return;
    };
    let scope = [Type::INT, Type::INT, Type::INT];
    for opaque in images() {
        let data = Type::scalar(opaque.sampled.scalar());
        let float = opaque.sampled == SampledType::Float;
        let base = image_base(opaque);
        let scoped = |extra: &[Type]| with(with(base.clone(), extra), &scope);
        let single = core::slice::from_ref(&data);
        match operation {
            AtomicOperation::Load => common(emitter, data.clone(), scoped(&[])),
            AtomicOperation::Store => common(emitter, Type::VOID, scoped(single)),
            AtomicOperation::Add
            | AtomicOperation::Min
            | AtomicOperation::Max
            | AtomicOperation::Exchange => {
                common(emitter, data.clone(), with(base.clone(), single));
                common(emitter, data.clone(), scoped(single));
            }
            AtomicOperation::And | AtomicOperation::Or | AtomicOperation::Xor => {
                if !float {
                    common(emitter, data.clone(), with(base.clone(), single));
                    common(emitter, data.clone(), scoped(single));
                }
            }
            AtomicOperation::CompareSwap => {
                if !float {
                    let pair = [data.clone(), data.clone()];
                    common(emitter, data.clone(), with(base.clone(), &pair));
                    let parameters = with(with(base.clone(), &pair), &[Type::INT; 5]);
                    common(emitter, data.clone(), parameters);
                }
            }
        }
    }
}

#[derive(Clone, Copy)]
struct Variant {
    proj: bool,
    lod: bool,
    bias: bool,
    offset: bool,
    fetch: bool,
    grad: bool,
    extra_proj: bool,
    clamp: bool,
    sparse: bool,
}

impl Variant {
    fn exists_for(self, opaque: Opaque) -> bool {
        let dimension = opaque.dimension;
        let cube = dimension == TextureDimension::Cube;
        let flat = dimension == TextureDimension::D2;
        let buffer = opaque.is_buffer();
        let multisample = opaque.multisample;
        let features = [
            self.proj,
            self.offset,
            self.fetch,
            self.grad,
            self.bias,
            self.lod,
        ];
        if features.iter().filter(|feature| **feature).count() > 3 {
            return false;
        }
        if self.proj && (cube || buffer || opaque.arrayed || multisample || self.fetch) {
            return false;
        }
        if self.lod && (buffer || multisample) {
            return false;
        }
        if self.lod && opaque.shadow && ((flat && opaque.arrayed) || cube) {
            return false;
        }
        if self.bias && (self.lod || multisample || buffer) {
            return false;
        }
        if self.bias && (flat || cube) && opaque.shadow && opaque.arrayed {
            return false;
        }
        if self.offset && (cube || buffer || multisample) {
            return false;
        }
        if self.fetch && (self.lod || self.bias || opaque.shadow || cube) {
            return false;
        }
        if !self.fetch && (multisample || buffer) {
            return false;
        }
        if self.grad && (self.lod || self.bias || self.fetch || multisample || buffer) {
            return false;
        }
        if self.extra_proj && !self.proj {
            return false;
        }
        if self.clamp && (self.proj || self.lod || self.fetch) {
            return false;
        }
        if self.sparse && (dimension == TextureDimension::D1 || buffer || self.proj) {
            return false;
        }
        !(self.extra_proj && (dimension == TextureDimension::D3 || opaque.shadow))
    }
}

fn sampling(emitter: &mut Emitter<'_>, base: Variant) {
    for opaque in sampled() {
        for bias in [false, true] {
            for extra_proj in [false, true] {
                let variant = Variant {
                    bias,
                    extra_proj,
                    ..base
                };
                sampling_variant(emitter, opaque, variant);
            }
        }
    }
}

fn sampling_variant(emitter: &mut Emitter<'_>, opaque: Opaque, variant: Variant) {
    if !variant.exists_for(opaque) {
        return;
    }
    if opaque.kind == OpaqueKind::Texture && (!variant.fetch || variant.grad) {
        return;
    }
    let dimensions = opaque.dimension.coordinate_count();
    let mut total = dimensions + u8::from(opaque.arrayed);
    if opaque.shadow && total < 2 {
        total = 2;
    }
    total += u8::from(opaque.shadow) + u8::from(variant.proj);
    let mut compare = false;
    if total > 4 && opaque.shadow {
        compare = true;
        total = 4;
    }
    let mut parameters = alloc::vec![Type::opaque(opaque)];
    if variant.extra_proj {
        parameters.push(Type::vector(Scalar::Float, 4));
    } else if variant.fetch {
        parameters.push(sized(Scalar::Int, total));
    } else {
        parameters.push(sized(Scalar::Float, total));
    }
    if compare {
        parameters.push(Type::FLOAT);
    }
    if variant.fetch && !opaque.is_buffer() {
        parameters.push(Type::INT);
    }
    if variant.lod {
        parameters.push(Type::FLOAT);
    }
    if variant.grad {
        parameters.push(sized(Scalar::Float, dimensions));
        parameters.push(sized(Scalar::Float, dimensions));
    }
    if variant.offset {
        parameters.push(sized(Scalar::Int, dimensions));
    }
    if variant.clamp {
        parameters.push(Type::FLOAT);
    }
    let bias = if variant.bias {
        alloc::vec![Type::FLOAT]
    } else {
        Vec::new()
    };
    let result = if opaque.shadow {
        Type::FLOAT
    } else {
        texel(opaque)
    };
    let stages = if !variant.grad && (variant.bias || variant.clamp) {
        IMPLICIT_LOD_STAGES
    } else {
        ALL_STAGES
    };
    if variant.sparse {
        sparse(emitter, parameters, result, &bias, stages);
    } else {
        parameters.extend(bias);
        staged(emitter, result, parameters, stages);
    }
}

const PLAIN: Sample = Sample {
    proj: false,
    level: TextureLevel::Implicit,
    offset: false,
    clamp: false,
    sparse: false,
};
const LOD: Sample = Sample {
    level: TextureLevel::Lod,
    ..PLAIN
};
const OFFSET: Sample = Sample {
    offset: true,
    ..PLAIN
};
const LOD_OFFSET: Sample = Sample {
    offset: true,
    ..LOD
};

pub(crate) fn sample(emitter: &mut Emitter<'_>) {
    let Some(Texture::Sample(sample)) = texture(emitter) else {
        return;
    };
    sampling(
        emitter,
        Variant {
            proj: sample.proj,
            lod: sample.level == TextureLevel::Lod,
            bias: false,
            offset: sample.offset,
            fetch: false,
            grad: sample.level == TextureLevel::Gradient,
            extra_proj: false,
            clamp: sample.clamp,
            sparse: sample.sparse,
        },
    );
    shadow_lod(emitter, sample);
}

pub(crate) fn fetch(emitter: &mut Emitter<'_>) {
    let Some(Texture::Fetch { offset, sparse }) = texture(emitter) else {
        return;
    };
    sampling(
        emitter,
        Variant {
            proj: false,
            lod: false,
            bias: false,
            offset,
            fetch: true,
            grad: false,
            extra_proj: false,
            clamp: false,
            sparse,
        },
    );
}

fn shadow_lod(emitter: &mut Emitter<'_>, sample: Sample) {
    let shadow = |dimension, arrayed| {
        Type::opaque(Opaque {
            kind: OpaqueKind::CombinedSampler,
            sampled: SampledType::Float,
            dimension,
            arrayed,
            shadow: true,
            multisample: false,
        })
    };
    let array = shadow(TextureDimension::D2, true);
    let cube = shadow(TextureDimension::Cube, false);
    let cube_array = shadow(TextureDimension::Cube, true);
    let coordinate = Type::vector(Scalar::Float, 4);
    let offset = Type::vector(Scalar::Int, 2);
    let float = Type::FLOAT;
    let prototypes = if sample == PLAIN {
        alloc::vec![
            alloc::vec![array, coordinate.clone(), float.clone()],
            alloc::vec![cube_array, coordinate, float.clone(), float],
        ]
    } else if sample == LOD {
        alloc::vec![
            alloc::vec![array, coordinate.clone(), float.clone()],
            alloc::vec![cube, coordinate.clone(), float.clone()],
            alloc::vec![cube_array, coordinate, float.clone(), float],
        ]
    } else if sample == LOD_OFFSET {
        alloc::vec![alloc::vec![array, coordinate, float, offset]]
    } else if sample == OFFSET {
        alloc::vec![alloc::vec![array, coordinate, offset, float]]
    } else {
        Vec::new()
    };
    for parameters in prototypes {
        common(emitter, Type::FLOAT, parameters);
    }
}

pub(crate) fn gather(emitter: &mut Emitter<'_>) {
    let Some(Texture::Gather(gather)) = texture(emitter) else {
        return;
    };
    match gather.pattern {
        GatherPattern::Quad => {
            for opaque in samplers() {
                quad_gather(emitter, opaque, gather);
            }
        }
        GatherPattern::Linear4x1
        | GatherPattern::Vertical2
        | GatherPattern::Horizontal2
        | GatherPattern::Diagonal => {
            for opaque in samplers() {
                pattern_gather(emitter, opaque, gather.offsets);
            }
        }
    }
}

fn gather_offset(offsets: GatherOffsets) -> Option<Type> {
    match offsets {
        GatherOffsets::None => None,
        GatherOffsets::One => Some(Type::vector(Scalar::Int, 2)),
        GatherOffsets::Four => Some(Type::vector(Scalar::Int, 2).array_of(ArraySize::Sized(4))),
    }
}

fn quad_gather(emitter: &mut Emitter<'_>, opaque: Opaque, gather: TextureGather) {
    let cube = opaque.dimension == TextureDimension::Cube;
    if !(cube || opaque.dimension == TextureDimension::D2) || opaque.multisample {
        return;
    }
    let offset = gather_offset(gather.offsets);
    if offset.is_some() && cube {
        return;
    }
    let coordinate = sized(
        Scalar::Float,
        opaque.dimension.coordinate_count() + u8::from(opaque.arrayed),
    );
    if gather.lod {
        if opaque.shadow {
            return;
        }
        let mut lod = alloc::vec![Type::opaque(opaque), coordinate, Type::FLOAT];
        lod.extend(offset);
        for component in [false, true] {
            let trailing = if component {
                alloc::vec![Type::INT]
            } else {
                Vec::new()
            };
            if gather.sparse {
                sparse(emitter, lod.clone(), texel(opaque), &trailing, ALL_STAGES);
            } else {
                common(emitter, texel(opaque), with(lod.clone(), &trailing));
            }
        }
        return;
    }
    for component in [false, true] {
        if component && opaque.shadow {
            continue;
        }
        let mut parameters = alloc::vec![Type::opaque(opaque), coordinate.clone()];
        if opaque.shadow {
            parameters.push(Type::FLOAT);
        }
        parameters.extend(offset.clone());
        let trailing = if component {
            alloc::vec![Type::INT]
        } else {
            Vec::new()
        };
        if gather.sparse {
            sparse(emitter, parameters, texel(opaque), &trailing, ALL_STAGES);
        } else {
            common(emitter, texel(opaque), with(parameters, &trailing));
        }
    }
    if opaque.shadow {
        return;
    }
    let mut biased = alloc::vec![Type::opaque(opaque), coordinate];
    biased.extend(offset);
    let trailing = [Type::INT, Type::FLOAT];
    if gather.sparse {
        sparse(emitter, biased, texel(opaque), &trailing, DERIVATIVE_STAGES);
    } else {
        staged(
            emitter,
            texel(opaque),
            with(biased, &trailing),
            DERIVATIVE_STAGES,
        );
    }
}

fn pattern_gather(emitter: &mut Emitter<'_>, opaque: Opaque, offsets: GatherOffsets) {
    if opaque.dimension != TextureDimension::D2 || opaque.multisample || opaque.shadow {
        return;
    }
    let coordinate = sized(Scalar::Float, 2 + u8::from(opaque.arrayed));
    for component in [false, true] {
        let mut parameters = alloc::vec![Type::opaque(opaque), coordinate.clone()];
        parameters.extend(gather_offset(offsets));
        if component {
            parameters.push(Type::INT);
        }
        common(emitter, texel(opaque), parameters);
    }
}

const fn processing_sampler(dimension: TextureDimension, arrayed: bool) -> Type {
    Type::opaque(Opaque {
        kind: OpaqueKind::CombinedSampler,
        sampled: SampledType::Float,
        dimension,
        arrayed,
        shadow: false,
        multisample: false,
    })
}

pub(crate) fn weighted(emitter: &mut Emitter<'_>) {
    let source = processing_sampler(TextureDimension::D2, false);
    for weights in [
        processing_sampler(TextureDimension::D2, true),
        processing_sampler(TextureDimension::D1, true),
    ] {
        common(
            emitter,
            Type::vector(Scalar::Float, 4),
            alloc::vec![source.clone(), Type::vector(Scalar::Float, 2), weights],
        );
    }
}

pub(crate) fn box_filter(emitter: &mut Emitter<'_>) {
    let coordinate = Type::vector(Scalar::Float, 2);
    common(
        emitter,
        Type::vector(Scalar::Float, 4),
        alloc::vec![
            processing_sampler(TextureDimension::D2, false),
            coordinate.clone(),
            coordinate,
        ],
    );
}

pub(crate) fn block_match(emitter: &mut Emitter<'_>) {
    let source = processing_sampler(TextureDimension::D2, false);
    let coordinate = Type::vector(Scalar::Uint, 2);
    common(
        emitter,
        Type::vector(Scalar::Float, 4),
        alloc::vec![
            source.clone(),
            coordinate.clone(),
            source,
            coordinate.clone(),
            coordinate,
        ],
    );
}

pub(crate) fn subpass_load(emitter: &mut Emitter<'_>) {
    for sampled in SampledType::ALL {
        for multisample in [false, true] {
            let opaque = Opaque::subpass_input(sampled, multisample);
            let mut parameters = alloc::vec![Type::opaque(opaque)];
            if multisample {
                parameters.push(Type::INT);
            }
            staged(emitter, texel(opaque), parameters, FRAGMENT);
        }
    }
}

pub(crate) fn fragment_fetch(emitter: &mut Emitter<'_>) {
    let Some(Texture::FragmentFetch { mask }) = texture(emitter) else {
        return;
    };
    let result = |opaque: Opaque| if mask { Type::UINT } else { texel(opaque) };
    let fragment: &[Type] = if mask { &[] } else { &[Type::UINT] };
    for arrayed in [false, true] {
        for sampled in SampledType::ALL {
            let opaque = Opaque {
                kind: OpaqueKind::CombinedSampler,
                sampled,
                dimension: TextureDimension::D2,
                arrayed,
                shadow: false,
                multisample: true,
            };
            let coordinate = sized(Scalar::Int, 2 + u8::from(arrayed));
            let parameters = with(alloc::vec![Type::opaque(opaque), coordinate], fragment);
            common(emitter, result(opaque), parameters);
        }
    }
    for sampled in SampledType::ALL {
        let opaque = Opaque::subpass_input(sampled, true);
        let parameters = with(alloc::vec![Type::opaque(opaque)], fragment);
        staged(emitter, result(opaque), parameters, FRAGMENT);
    }
}
