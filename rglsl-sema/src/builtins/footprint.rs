use alloc::string::String;
use alloc::vec::Vec;

use super::ALL_STAGES;
use super::table::Emitter;
use crate::scope::{Direction, Qualifiers};
use crate::types::{
    Member, Opaque, OpaqueKind, SampledType, Scalar, StructId, TextureDimension, Type, TypeRegistry,
};

pub const STRUCT_2D: &str = "gl_TextureFootprint2DNV";
pub const STRUCT_3D: &str = "gl_TextureFootprint3DNV";

fn footprint_struct(types: &mut TypeRegistry, name: &str, size: u8) -> Option<StructId> {
    let member = |name: &str, ty: Type| Member {
        name: String::from(name),
        ty,
        qualifiers: Qualifiers::default(),
    };
    let vector = Type::vector(Scalar::Uint, size);
    types.add_struct(
        Some(String::from(name)),
        alloc::vec![
            member("anchor", vector.clone()),
            member("offset", vector),
            member("mask", Type::vector(Scalar::Uint, 2)),
            member("lod", Type::UINT),
            member("granularity", Type::UINT),
        ],
    )
}

pub(super) fn structs(types: &mut TypeRegistry) -> Vec<(&'static str, StructId)> {
    [(STRUCT_2D, 2), (STRUCT_3D, 3)]
        .into_iter()
        .filter_map(|(name, size)| Some((name, footprint_struct(types, name, size)?)))
        .collect()
}

fn emit(emitter: &mut Emitter<'_>, extra: &[Type], trailing: &[Type], flat: bool) {
    let footprints: Vec<(&'static str, StructId)> = emitter.footprints().clone();
    for (name, id) in footprints {
        let three = name == STRUCT_3D;
        if flat && three {
            continue;
        }
        let dimension = if three {
            TextureDimension::D3
        } else {
            TextureDimension::D2
        };
        let coordinate = Type::vector(Scalar::Float, if three { 3 } else { 2 });
        for sampled in SampledType::ALL {
            let sampler = Type::opaque(Opaque {
                kind: OpaqueKind::CombinedSampler,
                sampled,
                dimension,
                arrayed: false,
                shadow: false,
                multisample: false,
            });
            for trailing in trailing_variants(trailing) {
                let mut parameters = alloc::vec![
                    (sampler.clone(), Direction::In),
                    (coordinate.clone(), Direction::In)
                ];
                parameters.extend(extra.iter().cloned().map(|ty| (ty, Direction::In)));
                parameters.push((Type::INT, Direction::In));
                parameters.push((Type::BOOL, Direction::In));
                parameters.push((Type::structure(id), Direction::Out));
                parameters.extend(trailing.iter().cloned().map(|ty| (ty, Direction::In)));
                emitter.push(Type::BOOL, parameters, ALL_STAGES);
            }
        }
    }
}

fn trailing_variants(trailing: &[Type]) -> Vec<&[Type]> {
    if trailing.is_empty() {
        alloc::vec![trailing]
    } else {
        alloc::vec![&[], trailing]
    }
}

pub(crate) fn implicit(emitter: &mut Emitter<'_>) {
    emit(emitter, &[], &[Type::FLOAT], false);
}

pub(crate) fn clamp(emitter: &mut Emitter<'_>) {
    emit(emitter, &[Type::FLOAT], &[Type::FLOAT], false);
}

pub(crate) fn lod(emitter: &mut Emitter<'_>) {
    emit(emitter, &[Type::FLOAT], &[], false);
}

pub(crate) fn gradient(emitter: &mut Emitter<'_>) {
    let gradient = Type::vector(Scalar::Float, 2);
    emit(emitter, &[gradient.clone(), gradient], &[], true);
}

pub(crate) fn gradient_clamp(emitter: &mut Emitter<'_>) {
    let gradient = Type::vector(Scalar::Float, 2);
    emit(
        emitter,
        &[gradient.clone(), gradient, Type::FLOAT],
        &[],
        true,
    );
}
