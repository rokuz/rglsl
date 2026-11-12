use alloc::collections::{BTreeMap, BTreeSet};

use crate::{AddressSpace, GlobalVariable, Handle, Module, TypeInner};

#[derive(Clone, Copy, Debug, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum ResourceClass {
    Sampler,
    Texture,
    Image,
    UniformBuffer,
    StorageBuffer,
    UnorderedAccess,
    CombinedSampler,
    AccelerationStructure,
}

impl ResourceClass {
    pub const ALL: [Self; 8] = [
        Self::Sampler,
        Self::Texture,
        Self::Image,
        Self::UniformBuffer,
        Self::StorageBuffer,
        Self::UnorderedAccess,
        Self::CombinedSampler,
        Self::AccelerationStructure,
    ];

    pub const fn index(self) -> usize {
        match self {
            Self::Sampler => 0,
            Self::Texture => 1,
            Self::Image => 2,
            Self::UniformBuffer => 3,
            Self::StorageBuffer => 4,
            Self::UnorderedAccess => 5,
            Self::CombinedSampler => 6,
            Self::AccelerationStructure => 7,
        }
    }

    pub fn of(module: &Module, global: &GlobalVariable) -> Option<Self> {
        let mut ty = global.ty;
        loop {
            match module.types[ty].inner {
                TypeInner::Array { base, .. } | TypeInner::BindingArray { base, .. }
                    if global.space == AddressSpace::Handle =>
                {
                    ty = base;
                }
                _ => break,
            }
        }
        match global.space {
            AddressSpace::Uniform => Some(Self::UniformBuffer),
            AddressSpace::Storage { .. } => Some(Self::StorageBuffer),
            AddressSpace::Handle => match module.types[ty].inner {
                TypeInner::Image {
                    class: crate::ImageClass::Storage { .. },
                    ..
                } => Some(Self::Image),
                TypeInner::Image { .. } => Some(Self::Texture),
                TypeInner::SampledImage { .. } => Some(Self::CombinedSampler),
                TypeInner::Sampler { .. } => Some(Self::Sampler),
                TypeInner::AccelerationStructure { .. } => Some(Self::AccelerationStructure),
                _ => None,
            },
            _ => None,
        }
    }
}

#[derive(Clone, Debug, Default, PartialEq, Eq)]
pub struct BindingShifts {
    pub base: [u32; 8],
    pub per_set: [BTreeMap<u32, u32>; 8],
}

impl BindingShifts {
    pub fn is_empty(&self) -> bool {
        self.base.iter().all(|&base| base == 0) && self.per_set.iter().all(BTreeMap::is_empty)
    }

    pub fn base(&self, class: ResourceClass, set: u32) -> u32 {
        let index = class.index();
        self.per_set
            .get(index)
            .and_then(|per_set| per_set.get(&set))
            .or_else(|| self.base.get(index))
            .copied()
            .unwrap_or(0)
    }

    pub fn base_of(&self, module: &Module, global: &GlobalVariable, set: u32) -> u32 {
        ResourceClass::of(module, global).map_or(0, |class| self.base(class, set))
    }

    pub fn shift_explicit(
        &self,
        module: &mut Module,
        automatic: &BTreeSet<Handle<GlobalVariable>>,
    ) {
        if self.is_empty() {
            return;
        }
        let shifted: alloc::vec::Vec<(Handle<GlobalVariable>, u32)> = module
            .global_variables
            .iter()
            .filter(|&(handle, _)| !automatic.contains(&handle))
            .filter_map(|(handle, global)| {
                let binding = global.binding.as_ref()?;
                Some((handle, self.base_of(module, global, binding.group)))
            })
            .filter(|&(_, base)| base != 0)
            .collect();
        for (handle, base) in shifted {
            if let Some(ref mut binding) = module.global_variables.get_mut(handle).binding {
                binding.binding = binding.binding.saturating_add(base);
            }
        }
    }
}

pub fn free_binding(used: &BTreeSet<u32>, base: u32) -> u32 {
    (base..=u32::MAX)
        .find(|binding| !used.contains(binding))
        .unwrap_or(u32::MAX)
}
