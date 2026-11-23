use spirv::{BuiltIn, Dim, StorageClass};

use super::layout::{Sizes, element_chain};
use super::module::{Module, Type, Variable};
use super::{DescriptorBinding, DescriptorHeap, DescriptorType, PushConstantBlock, ReflectError};

#[derive(Debug, Default)]
pub(super) struct Resources {
    pub(super) bindings: Vec<DescriptorBinding>,
    pub(super) heaps: Vec<DescriptorHeap>,
    pub(super) push_constants: Vec<PushConstantBlock>,
}

pub(super) fn collect(module: &Module, sizes: &mut Sizes<'_>) -> Result<Resources, ReflectError> {
    let mut resources = Resources::default();
    for variable in &module.variables {
        let decorations = module.decorations(variable.id);
        let pointee = module.pointee(variable)?;
        match decorations.built_in {
            Some(built_in) if built_in == BuiltIn::ResourceHeapEXT as u32 => {
                resources.heaps.push(DescriptorHeap::Resource);
                continue;
            }
            Some(built_in) if built_in == BuiltIn::SamplerHeapEXT as u32 => {
                resources.heaps.push(DescriptorHeap::Sampler);
                continue;
            }
            _ => {}
        }
        if variable.class == StorageClass::PushConstant as u32 {
            let ty = pointee.ok_or(ReflectError::UnknownResource {
                variable: variable.id,
            })?;
            let (offset, size) = sizes.push_constant_range(ty)?;
            resources.push_constants.push(PushConstantBlock {
                name: module.name(variable.id).or_else(|| module.name(ty)),
                variable_id: variable.id,
                offset,
                size,
                bank: decorations.bank,
                bank_offset: decorations.bank_offset,
            });
            continue;
        }
        let Some(binding) = decorations.binding else {
            continue;
        };
        let set = decorations.set.ok_or(ReflectError::MissingDescriptorSet {
            variable: variable.id,
        })?;
        resources
            .bindings
            .push(descriptor(module, sizes, variable, pointee, set, binding)?);
    }
    resources
        .bindings
        .sort_by_key(|binding| (binding.set, binding.binding, binding.variable_id));
    resources.heaps.sort_unstable();
    resources.heaps.dedup();
    resources
        .push_constants
        .sort_by_key(|block| (block.bank, block.offset, block.variable_id));
    Ok(resources)
}

fn descriptor(
    module: &Module,
    sizes: &mut Sizes<'_>,
    variable: &Variable,
    pointee: Option<u32>,
    set: u32,
    binding: u32,
) -> Result<DescriptorBinding, ReflectError> {
    let unknown = ReflectError::UnknownResource {
        variable: variable.id,
    };
    let ty = pointee.ok_or_else(|| unknown.clone())?;
    let (element, lengths) = element_chain(module, ty)?;
    let mut count = 1_u32;
    for length in lengths {
        count = match length {
            Some(length) => count
                .checked_mul(length)
                .ok_or(ReflectError::Overflow(ty))?,
            None => 0,
        };
    }
    let descriptor_type = descriptor_type(module, variable.class, element)?.ok_or(unknown)?;
    let block = match descriptor_type {
        DescriptorType::UniformBuffer | DescriptorType::StorageBuffer => {
            Some(sizes.block(element)?)
        }
        _ => None,
    };
    Ok(DescriptorBinding {
        set,
        binding,
        descriptor_type,
        count,
        name: module.name(variable.id).or_else(|| module.name(element)),
        variable_id: variable.id,
        block,
    })
}

fn descriptor_type(
    module: &Module,
    class: u32,
    element: u32,
) -> Result<Option<DescriptorType>, ReflectError> {
    let class = StorageClass::from_u32(class);
    let ty = module.ty(element)?;
    Ok(match (class, ty) {
        (Some(StorageClass::Uniform), &Type::Struct { .. }) => {
            let decorations = module.decorations(element);
            if decorations.buffer_block {
                Some(DescriptorType::StorageBuffer)
            } else if decorations.block {
                Some(DescriptorType::UniformBuffer)
            } else {
                None
            }
        }
        (Some(StorageClass::StorageBuffer), &Type::Struct { .. }) => {
            Some(DescriptorType::StorageBuffer)
        }
        (
            Some(StorageClass::UniformConstant | StorageClass::TileAttachmentQCOM),
            &Type::SampledImage { image },
        ) => match *module.ty(image)? {
            Type::Image { dim, .. } if dim == Dim::DimBuffer as u32 => {
                Some(DescriptorType::UniformTexelBuffer)
            }
            Type::Image { .. } => Some(DescriptorType::CombinedImageSampler),
            _ => None,
        },
        (
            Some(StorageClass::UniformConstant | StorageClass::TileAttachmentQCOM),
            &Type::Image { dim, sampled },
        ) => image_type(dim, sampled),
        (Some(StorageClass::UniformConstant), &Type::Sampler) => Some(DescriptorType::Sampler),
        (Some(StorageClass::UniformConstant), &Type::AccelerationStructure) => {
            Some(DescriptorType::AccelerationStructure)
        }
        (Some(StorageClass::UniformConstant), &Type::Tensor) => Some(DescriptorType::Tensor),
        _ => None,
    })
}

fn image_type(dim: u32, sampled: u32) -> Option<DescriptorType> {
    let buffer = dim == Dim::DimBuffer as u32;
    if dim == Dim::DimSubpassData as u32 {
        return Some(DescriptorType::InputAttachment);
    }
    match (buffer, sampled) {
        (true, 1) => Some(DescriptorType::UniformTexelBuffer),
        (true, 2) => Some(DescriptorType::StorageTexelBuffer),
        (false, 1) => Some(DescriptorType::SampledImage),
        (false, 2) => Some(DescriptorType::StorageImage),
        _ => None,
    }
}
