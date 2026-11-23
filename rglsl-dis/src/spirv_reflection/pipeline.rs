use std::collections::BTreeMap;

use rglsl_types::{ShaderStage, ShaderStageMask};

use super::{BindingUse, DescriptorType, LayoutError, Reflection};

const fn vulkan_stage_flag(stage: ShaderStage) -> u32 {
    match stage {
        ShaderStage::Vertex => 0x1,
        ShaderStage::TessControl => 0x2,
        ShaderStage::TessEvaluation => 0x4,
        ShaderStage::Geometry => 0x8,
        ShaderStage::Fragment => 0x10,
        ShaderStage::Compute => 0x20,
        ShaderStage::Task => 0x40,
        ShaderStage::Mesh => 0x80,
        ShaderStage::RayGeneration => 0x100,
        ShaderStage::AnyHit => 0x200,
        ShaderStage::ClosestHit => 0x400,
        ShaderStage::Miss => 0x800,
        ShaderStage::Intersection => 0x1000,
        ShaderStage::Callable => 0x2000,
    }
}

pub fn vulkan_stage_flags(stages: ShaderStageMask) -> u32 {
    stages
        .stages()
        .fold(0, |flags, stage| flags | vulkan_stage_flag(stage))
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub struct LayoutBinding {
    pub binding: u32,
    pub descriptor_type: DescriptorType,
    pub count: u32,
    pub stages: ShaderStageMask,
    pub name: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub struct DescriptorSetLayout {
    pub set: u32,
    pub bindings: Vec<LayoutBinding>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[non_exhaustive]
pub struct PushConstantRange {
    pub stages: ShaderStageMask,
    pub bank: Option<u32>,
    pub offset: u32,
    pub size: u32,
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
#[non_exhaustive]
pub struct PipelineLayout {
    pub sets: Vec<DescriptorSetLayout>,
    pub push_constant_ranges: Vec<PushConstantRange>,
}

#[derive(Debug, Default)]
pub(super) struct LayoutBuilder {
    bindings: BTreeMap<(u32, u32), (ShaderStage, LayoutBinding)>,
    push_constant_ranges: Vec<PushConstantRange>,
}

impl LayoutBuilder {
    pub(super) fn add(&mut self, reflection: &Reflection) -> Result<(), LayoutError> {
        let stage = reflection.stage;
        let mask = ShaderStageMask::of(stage);
        for descriptor in &reflection.descriptor_bindings {
            let key = (descriptor.set, descriptor.binding);
            if let Some(&mut (first_stage, ref mut known)) = self.bindings.get_mut(&key) {
                if known.descriptor_type != descriptor.descriptor_type
                    || known.count != descriptor.count
                {
                    return Err(LayoutError {
                        set: descriptor.set,
                        binding: descriptor.binding,
                        first: BindingUse {
                            stage: first_stage,
                            descriptor_type: known.descriptor_type,
                            count: known.count,
                        },
                        second: BindingUse {
                            stage,
                            descriptor_type: descriptor.descriptor_type,
                            count: descriptor.count,
                        },
                    });
                }
                known.stages |= mask;
                if known.name.is_none() {
                    known.name.clone_from(&descriptor.name);
                }
                continue;
            }
            self.bindings.insert(
                key,
                (
                    stage,
                    LayoutBinding {
                        binding: descriptor.binding,
                        descriptor_type: descriptor.descriptor_type,
                        count: descriptor.count,
                        stages: mask,
                        name: descriptor.name.clone(),
                    },
                ),
            );
        }
        let mut banks: BTreeMap<Option<u32>, (u32, u32)> = BTreeMap::new();
        for block in &reflection.push_constants {
            let range = banks
                .entry(block.bank)
                .or_insert((block.offset, block.end()));
            range.0 = range.0.min(block.offset);
            range.1 = range.1.max(block.end());
        }
        self.push_constant_ranges
            .extend(
                banks
                    .into_iter()
                    .map(|(bank, (offset, end))| PushConstantRange {
                        stages: mask,
                        bank,
                        offset,
                        size: end.saturating_sub(offset),
                    }),
            );
        Ok(())
    }

    pub(super) fn finish(self) -> PipelineLayout {
        let mut sets: Vec<DescriptorSetLayout> = Vec::new();
        for ((set, _), (_, binding)) in self.bindings {
            match sets.last_mut() {
                Some(layout) if layout.set == set => layout.bindings.push(binding),
                _ => sets.push(DescriptorSetLayout {
                    set,
                    bindings: vec![binding],
                }),
            }
        }
        PipelineLayout {
            sets,
            push_constant_ranges: self.push_constant_ranges,
        }
    }
}

impl PipelineLayout {
    pub fn new<'a>(stages: impl IntoIterator<Item = &'a Reflection>) -> Result<Self, LayoutError> {
        let mut builder = LayoutBuilder::default();
        for reflection in stages {
            builder.add(reflection)?;
        }
        Ok(builder.finish())
    }
}
