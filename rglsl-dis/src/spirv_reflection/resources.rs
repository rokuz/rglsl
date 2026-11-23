use spirv::{BuiltIn, Dim, StorageClass};

use super::layout::{Sizes, element_chain};
use super::module::{DecorationFlags, Enumerant, ImageUsage, Module, Type, Variable};
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
            Some(Enumerant::Known(BuiltIn::ResourceHeapEXT)) => {
                resources.heaps.push(DescriptorHeap::Resource);
                continue;
            }
            Some(Enumerant::Known(BuiltIn::SamplerHeapEXT)) => {
                resources.heaps.push(DescriptorHeap::Sampler);
                continue;
            }
            _ => {}
        }
        if variable.class.is(&StorageClass::PushConstant) {
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
    let ty = pointee.ok_or(unknown)?;
    let (element, lengths) = element_chain(module, ty)?;
    let count = lengths
        .into_iter()
        .try_fold(1_u32, |count, length| match length {
            Some(length) => {
                count
                    .checked_mul(length)
                    .ok_or(ReflectError::DescriptorCountOverflow {
                        variable: variable.id,
                    })
            }
            None => Ok(0),
        })?;
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
    class: Enumerant<StorageClass>,
    element: u32,
) -> Result<Option<DescriptorType>, ReflectError> {
    let Enumerant::Known(class) = class else {
        return Ok(None);
    };
    Ok(match (class, module.ty(element)?) {
        (StorageClass::Uniform, &Type::Struct { .. }) => {
            let flags = module.decorations(element).flags;
            if flags.contains(DecorationFlags::BUFFER_BLOCK) {
                Some(DescriptorType::StorageBuffer)
            } else if flags.contains(DecorationFlags::BLOCK) {
                Some(DescriptorType::UniformBuffer)
            } else {
                None
            }
        }
        (StorageClass::StorageBuffer, &Type::Struct { .. }) => Some(DescriptorType::StorageBuffer),
        (
            StorageClass::UniformConstant | StorageClass::TileAttachmentQCOM,
            &Type::SampledImage { image },
        ) => match *module.ty(image)? {
            Type::Image { dim, .. } if dim.is(&Dim::DimBuffer) => {
                Some(DescriptorType::UniformTexelBuffer)
            }
            Type::Image { .. } => Some(DescriptorType::CombinedImageSampler),
            _ => None,
        },
        (
            StorageClass::UniformConstant | StorageClass::TileAttachmentQCOM,
            &Type::Image { dim, usage },
        ) => image_type(dim, usage),
        (StorageClass::UniformConstant, &Type::Sampler) => Some(DescriptorType::Sampler),
        (StorageClass::UniformConstant, &Type::AccelerationStructure) => {
            Some(DescriptorType::AccelerationStructure)
        }
        (StorageClass::UniformConstant, &Type::Tensor) => Some(DescriptorType::Tensor),
        _ => None,
    })
}

fn image_type(dim: Enumerant<Dim>, usage: ImageUsage) -> Option<DescriptorType> {
    match (dim, usage) {
        (Enumerant::Known(Dim::DimSubpassData), _) => Some(DescriptorType::InputAttachment),
        (_, ImageUsage::Runtime) | (Enumerant::Unknown(_), _) => None,
        (Enumerant::Known(Dim::DimBuffer), ImageUsage::Sampled) => {
            Some(DescriptorType::UniformTexelBuffer)
        }
        (Enumerant::Known(Dim::DimBuffer), ImageUsage::Storage) => {
            Some(DescriptorType::StorageTexelBuffer)
        }
        (Enumerant::Known(_), ImageUsage::Sampled) => Some(DescriptorType::SampledImage),
        (Enumerant::Known(_), ImageUsage::Storage) => Some(DescriptorType::StorageImage),
    }
}
