use std::collections::BTreeMap;

use rglsl::{
    AddressSpace, ArraySize, Binding, GlobalVariable, Handle, Module, ShaderStage, Type, TypeInner,
    VectorSize,
};

const fn vector_locations(size: VectorSize, width: u8) -> u32 {
    match (size, width) {
        (VectorSize::Tri | VectorSize::Quad, 8) => 2,
        _ => 1,
    }
}

fn location_count(module: &Module, ty: Handle<Type>) -> u32 {
    let mut counts: BTreeMap<Handle<Type>, u32> = BTreeMap::new();
    let Ok(()) = rglsl::proc::post_order(
        &mut counts,
        ty,
        |counts, ty, children| {
            if counts.contains_key(&ty) {
                return false;
            }
            match module.types[ty].inner {
                TypeInner::Array {
                    base,
                    size: ArraySize::Constant(_),
                    ..
                } => children.push(base),
                TypeInner::Struct { ref members, .. } => {
                    children.extend(members.iter().map(|member| member.ty));
                }
                _ => {}
            }
            true
        },
        |counts, ty| {
            let count = |ty| counts.get(&ty).copied().unwrap_or(1);
            let total = match module.types[ty].inner {
                TypeInner::Vector { size, scalar } => vector_locations(size, scalar.width),
                TypeInner::Matrix {
                    columns,
                    rows,
                    scalar,
                } => (columns as u32).saturating_mul(vector_locations(rows, scalar.width)),
                TypeInner::Array {
                    base,
                    size: ArraySize::Constant(length),
                    ..
                } => length.get().saturating_mul(count(base)),
                TypeInner::Array { .. } => 1,
                TypeInner::Struct { ref members, .. } => members
                    .iter()
                    .map(|member| count(member.ty))
                    .fold(0, u32::saturating_add),
                _ => 1,
            };
            counts.insert(ty, total);
            Ok::<(), core::convert::Infallible>(())
        },
    );
    counts.get(&ty).copied().unwrap_or(1)
}

const fn arrayed(stage: ShaderStage, space: AddressSpace) -> bool {
    matches!(
        (stage, space),
        (
            ShaderStage::TessControl,
            AddressSpace::Input | AddressSpace::Output
        ) | (
            ShaderStage::TessEvaluation | ShaderStage::Geometry,
            AddressSpace::Input
        ) | (ShaderStage::Mesh, AddressSpace::Output)
    )
}

fn element(module: &Module, stage: ShaderStage, global: &GlobalVariable) -> Handle<Type> {
    let patch = matches!(global.io, Some(Binding::Location { patch: true, .. }));
    match module.types[global.ty].inner {
        TypeInner::Array { base, .. } if arrayed(stage, global.space) && !patch => base,
        _ => global.ty,
    }
}

pub(crate) fn ranges(
    module: &Module,
    stage: ShaderStage,
    global: &GlobalVariable,
) -> Vec<(u32, u32)> {
    match global.io {
        Some(Binding::Location { location, .. }) => {
            let count = location_count(module, element(module, stage, global));
            vec![(location, location.saturating_add(count.max(1)))]
        }
        Some(Binding::BuiltIn(_)) => Vec::new(),
        None => match module.types[element(module, stage, global)].inner {
            TypeInner::Struct { ref members, .. } => members
                .iter()
                .filter_map(|member| match member.binding {
                    Some(Binding::Location { location, .. }) => Some((
                        location,
                        location.saturating_add(location_count(module, member.ty).max(1)),
                    )),
                    _ => None,
                })
                .collect(),
            _ => Vec::new(),
        },
    }
}
