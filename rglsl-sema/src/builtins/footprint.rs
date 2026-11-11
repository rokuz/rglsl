use alloc::string::String;
use alloc::vec::Vec;

use super::{Prototype, ALL_STAGES};
use crate::scope::{Direction, Qualifiers};
use crate::types::{
    Member, Opaque, OpaqueKind, SampledType, Scalar, StructId, TextureDimension, Type, TypeRegistry,
};

pub const STRUCT_2D: &str = "gl_TextureFootprint2DNV";
pub const STRUCT_3D: &str = "gl_TextureFootprint3DNV";
pub const EXTENSION: &str = "GL_NV_shader_texture_footprint";

pub(crate) fn is_function(name: &str) -> bool {
    matches!(
        name,
        "textureFootprintNV"
            | "textureFootprintClampNV"
            | "textureFootprintLodNV"
            | "textureFootprintGradNV"
            | "textureFootprintGradClampNV"
    )
}

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

pub(super) fn prototypes(structs: &[(&'static str, StructId)]) -> Vec<Prototype> {
    let mut prototypes = Vec::new();
    for &(name, id) in structs {
        let three = name == STRUCT_3D;
        let dimension = if three {
            TextureDimension::D3
        } else {
            TextureDimension::D2
        };
        let coordinate = Type::vector(Scalar::Float, if three { 3 } else { 2 });
        let footprint = Type::structure(id);
        for sampled in SampledType::ALL {
            let sampler = Type::opaque(Opaque {
                kind: OpaqueKind::CombinedSampler,
                sampled,
                dimension,
                arrayed: false,
                shadow: false,
                multisample: false,
            });
            let mut push = |function: &str, extra: &[Type], trailing: &[Type]| {
                let mut parameters = alloc::vec![
                    (sampler.clone(), Direction::In),
                    (coordinate.clone(), Direction::In)
                ];
                parameters.extend(extra.iter().cloned().map(|ty| (ty, Direction::In)));
                parameters.push((Type::INT, Direction::In));
                parameters.push((Type::BOOL, Direction::In));
                parameters.push((footprint.clone(), Direction::Out));
                parameters.extend(trailing.iter().cloned().map(|ty| (ty, Direction::In)));
                prototypes.push(Prototype {
                    name: String::from(function),
                    result: Type::BOOL,
                    parameters,
                    stages: ALL_STAGES,
                });
            };
            push("textureFootprintNV", &[], &[]);
            push("textureFootprintNV", &[], &[Type::FLOAT]);
            push("textureFootprintClampNV", &[Type::FLOAT], &[]);
            push("textureFootprintClampNV", &[Type::FLOAT], &[Type::FLOAT]);
            push("textureFootprintLodNV", &[Type::FLOAT], &[]);
            if !three {
                let gradient = Type::vector(Scalar::Float, 2);
                push(
                    "textureFootprintGradNV",
                    &[gradient.clone(), gradient.clone()],
                    &[],
                );
                push(
                    "textureFootprintGradClampNV",
                    &[gradient.clone(), gradient, Type::FLOAT],
                    &[],
                );
            }
        }
    }
    prototypes
}
