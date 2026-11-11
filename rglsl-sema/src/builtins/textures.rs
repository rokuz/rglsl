use alloc::string::String;
use alloc::vec::Vec;

use super::{Prototype, FRAGMENT};
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

struct Emitter<'a> {
    prototypes: &'a mut Vec<Prototype>,
}

impl Emitter<'_> {
    fn common(&mut self, name: &str, result: Type, parameters: Vec<Type>) {
        self.staged(name, result, parameters, 0);
    }

    fn staged(&mut self, name: &str, result: Type, parameters: Vec<Type>, stages: u16) {
        self.prototypes.push(Prototype {
            name: String::from(name),
            result,
            parameters: parameters.into_iter().map(input).collect(),
            stages,
        });
    }
}

fn opaque_types() -> Vec<Opaque> {
    let mut types = Vec::new();
    for kind in [OpaqueKind::CombinedSampler, OpaqueKind::Image] {
        for shadow in [false, true] {
            for multisample in [false, true] {
                for arrayed in [false, true] {
                    for dimension in TextureDimension::ALL {
                        for sampled in SampledType::ALL {
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

fn queries(emitter: &mut Emitter<'_>, opaque: Opaque) {
    let ty = Type::opaque(opaque);
    let cube = opaque.dimension == TextureDimension::Cube;
    let size_count =
        opaque.dimension.coordinate_count() + u8::from(opaque.arrayed) - u8::from(cube);
    let size = sized(Scalar::Int, size_count);
    if opaque.is_image() {
        emitter.common("imageSize", size, alloc::vec![ty.clone()]);
    } else if opaque.is_buffer() || opaque.multisample {
        emitter.common("textureSize", size, alloc::vec![ty.clone()]);
    } else {
        emitter.common("textureSize", size, alloc::vec![ty.clone(), Type::INT]);
    }
    if opaque.multisample {
        let name = if opaque.is_image() {
            "imageSamples"
        } else {
            "textureSamples"
        };
        emitter.common(name, Type::INT, alloc::vec![ty.clone()]);
    }
    if opaque.is_image() || opaque.multisample || opaque.is_buffer() {
        return;
    }
    let coordinate = sized(Scalar::Float, opaque.dimension.coordinate_count());
    emitter.staged(
        "textureQueryLod",
        Type::vector(Scalar::Float, 2),
        alloc::vec![ty.clone(), coordinate],
        FRAGMENT,
    );
    emitter.common("textureQueryLevels", Type::INT, alloc::vec![ty]);
}

fn images(emitter: &mut Emitter<'_>, opaque: Opaque) {
    let cube = opaque.dimension == TextureDimension::Cube;
    let count = opaque.dimension.coordinate_count() + u8::from(opaque.arrayed && !cube);
    let mut base = alloc::vec![Type::opaque(opaque), sized(Scalar::Int, count)];
    if opaque.multisample {
        base.push(Type::INT);
    }
    let with = |extra: &[Type]| {
        let mut parameters = base.clone();
        parameters.extend_from_slice(extra);
        parameters
    };
    emitter.common("imageLoad", texel(opaque), base.clone());
    emitter.common("imageStore", Type::VOID, with(&[texel(opaque)]));
    let data = Type::scalar(opaque.sampled.scalar());
    let scope = [Type::INT, Type::INT, Type::INT];
    let scoped = |extra: &[Type]| {
        let mut parameters = with(extra);
        parameters.extend_from_slice(&scope);
        parameters
    };
    emitter.common("imageAtomicLoad", data.clone(), scoped(&[]));
    emitter.common(
        "imageAtomicStore",
        Type::VOID,
        scoped(core::slice::from_ref(&data)),
    );
    let names: &[&str] = if opaque.sampled == SampledType::Float {
        &["imageAtomicExchange"]
    } else {
        &[
            "imageAtomicAdd",
            "imageAtomicMin",
            "imageAtomicMax",
            "imageAtomicAnd",
            "imageAtomicOr",
            "imageAtomicXor",
            "imageAtomicExchange",
        ]
    };
    for name in names {
        emitter.common(name, data.clone(), with(core::slice::from_ref(&data)));
        emitter.common(name, data.clone(), scoped(core::slice::from_ref(&data)));
    }
    if opaque.sampled == SampledType::Float {
        return;
    }
    emitter.common(
        "imageAtomicCompSwap",
        data.clone(),
        with(&[data.clone(), data.clone()]),
    );
    let mut parameters = with(&[data.clone(), data.clone()]);
    parameters.extend_from_slice(&[Type::INT; 5]);
    emitter.common("imageAtomicCompSwap", data, parameters);
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
}

impl Variant {
    fn all() -> Vec<Self> {
        let mut variants = Vec::new();
        let flags = [false, true];
        for proj in flags {
            for lod in flags {
                for bias in flags {
                    for offset in flags {
                        for fetch in flags {
                            for grad in flags {
                                for extra_proj in flags {
                                    variants.push(Self {
                                        proj,
                                        lod,
                                        bias,
                                        offset,
                                        fetch,
                                        grad,
                                        extra_proj,
                                    });
                                }
                            }
                        }
                    }
                }
            }
        }
        variants
    }

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
        if self.grad && (self.lod || self.bias || multisample || buffer) {
            return false;
        }
        if self.extra_proj && !self.proj {
            return false;
        }
        !(self.extra_proj && (dimension == TextureDimension::D3 || opaque.shadow))
    }

    fn name(self) -> String {
        let mut name = String::from(if self.fetch { "texel" } else { "texture" });
        for (enabled, part) in [
            (self.proj, "Proj"),
            (self.lod, "Lod"),
            (self.grad, "Grad"),
            (self.fetch, "Fetch"),
            (self.offset, "Offset"),
        ] {
            if enabled {
                name.push_str(part);
            }
        }
        name
    }
}

fn sampling(emitter: &mut Emitter<'_>, opaque: Opaque) {
    let dimensions = opaque.dimension.coordinate_count();
    for variant in Variant::all() {
        if !variant.exists_for(opaque) {
            continue;
        }
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
        if variant.bias {
            parameters.push(Type::FLOAT);
        }
        let result = if opaque.shadow {
            Type::FLOAT
        } else {
            texel(opaque)
        };
        let stages = if variant.bias && !variant.grad {
            FRAGMENT
        } else {
            0
        };
        emitter.staged(&variant.name(), result, parameters, stages);
    }
}

fn gathers(emitter: &mut Emitter<'_>, opaque: Opaque) {
    let cube = opaque.dimension == TextureDimension::Cube;
    if !(cube || opaque.dimension == TextureDimension::D2) || opaque.multisample {
        return;
    }
    let coordinate = sized(
        Scalar::Float,
        opaque.dimension.coordinate_count() + u8::from(opaque.arrayed),
    );
    let offsets = [
        ("textureGather", None),
        ("textureGatherOffset", Some(Type::vector(Scalar::Int, 2))),
        (
            "textureGatherOffsets",
            Some(Type::vector(Scalar::Int, 2).array_of(ArraySize::Sized(4))),
        ),
    ];
    for (name, offset) in offsets {
        if offset.is_some() && cube {
            continue;
        }
        for component in [false, true] {
            if component && opaque.shadow {
                continue;
            }
            let mut parameters = alloc::vec![Type::opaque(opaque), coordinate.clone()];
            if opaque.shadow {
                parameters.push(Type::FLOAT);
            }
            if let Some(offset) = &offset {
                parameters.push(offset.clone());
            }
            if component {
                parameters.push(Type::INT);
            }
            emitter.common(name, texel(opaque), parameters);
        }
    }
}

fn qcom_gathers(emitter: &mut Emitter<'_>, opaque: Opaque) {
    if opaque.dimension != TextureDimension::D2 || opaque.multisample || opaque.shadow {
        return;
    }
    let coordinate = sized(Scalar::Float, 2 + u8::from(opaque.arrayed));
    for mode in ["4x1", "V2", "H2", "D"] {
        for offset in [false, true] {
            let name = if offset {
                alloc::format!("textureGather{mode}OffsetQCOM")
            } else {
                alloc::format!("textureGather{mode}QCOM")
            };
            for component in [false, true] {
                let mut parameters = alloc::vec![Type::opaque(opaque), coordinate.clone()];
                if offset {
                    parameters.push(Type::vector(Scalar::Int, 2));
                }
                if component {
                    parameters.push(Type::INT);
                }
                emitter.common(&name, texel(opaque), parameters);
            }
        }
    }
}

fn image_processing(emitter: &mut Emitter<'_>) {
    let sampler = |dimension, arrayed| {
        Type::opaque(Opaque {
            kind: OpaqueKind::CombinedSampler,
            sampled: SampledType::Float,
            dimension,
            arrayed,
            shadow: false,
            multisample: false,
        })
    };
    let source = sampler(TextureDimension::D2, false);
    let result = Type::vector(Scalar::Float, 4);
    let coordinate = Type::vector(Scalar::Float, 2);
    for weights in [
        sampler(TextureDimension::D2, true),
        sampler(TextureDimension::D1, true),
    ] {
        emitter.common(
            "textureWeightedQCOM",
            result.clone(),
            alloc::vec![source.clone(), coordinate.clone(), weights],
        );
    }
    emitter.common(
        "textureBoxFilterQCOM",
        result.clone(),
        alloc::vec![source.clone(), coordinate.clone(), coordinate],
    );
    let texel_coordinate = Type::vector(Scalar::Uint, 2);
    for name in [
        "textureBlockMatchSADQCOM",
        "textureBlockMatchSSDQCOM",
        "textureBlockMatchWindowSSDQCOM",
        "textureBlockMatchWindowSADQCOM",
        "textureBlockMatchGatherSSDQCOM",
        "textureBlockMatchGatherSADQCOM",
    ] {
        emitter.common(
            name,
            result.clone(),
            alloc::vec![
                source.clone(),
                texel_coordinate.clone(),
                source.clone(),
                texel_coordinate.clone(),
                texel_coordinate.clone(),
            ],
        );
    }
}

fn subpasses(emitter: &mut Emitter<'_>) {
    for sampled in SampledType::ALL {
        for multisample in [false, true] {
            let opaque = Opaque::subpass_input(sampled, multisample);
            let mut parameters = alloc::vec![Type::opaque(opaque)];
            if multisample {
                parameters.push(Type::INT);
            }
            emitter.staged("subpassLoad", texel(opaque), parameters, FRAGMENT);
        }
    }
}

pub(super) fn prototypes() -> Vec<Prototype> {
    let mut prototypes = Vec::new();
    let mut emitter = Emitter {
        prototypes: &mut prototypes,
    };
    for opaque in opaque_types() {
        queries(&mut emitter, opaque);
        if opaque.is_image() {
            images(&mut emitter, opaque);
        } else {
            sampling(&mut emitter, opaque);
            gathers(&mut emitter, opaque);
            if opaque.kind == OpaqueKind::CombinedSampler {
                qcom_gathers(&mut emitter, opaque);
            }
        }
    }
    for sampled in SampledType::ALL {
        let buffer = Opaque {
            kind: OpaqueKind::Texture,
            sampled,
            dimension: TextureDimension::Buffer,
            arrayed: false,
            shadow: false,
            multisample: false,
        };
        emitter.common(
            "texelFetch",
            texel(buffer),
            alloc::vec![Type::opaque(buffer), Type::INT],
        );
    }
    subpasses(&mut emitter);
    image_processing(&mut emitter);
    prototypes
}
