use std::collections::BTreeMap;
use std::ops::{BitOr, BitOrAssign};

use rglsl_types::ShaderStage;

use super::{DescriptorType, LayoutError, Reflection};

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Hash)]
pub struct StageFlags(u32);

impl StageFlags {
    pub const fn empty() -> Self {
        Self(0)
    }

    pub const fn of(stage: ShaderStage) -> Self {
        Self(match stage {
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
        })
    }

    pub const fn bits(self) -> u32 {
        self.0
    }

    pub const fn contains(self, stage: ShaderStage) -> bool {
        self.0 & Self::of(stage).0 != 0
    }

    pub fn stages(self) -> impl Iterator<Item = ShaderStage> {
        ShaderStage::ALL
            .into_iter()
            .filter(move |&stage| self.contains(stage))
    }
}

impl BitOr for StageFlags {
    type Output = Self;

    fn bitor(self, other: Self) -> Self {
        Self(self.0 | other.0)
    }
}

impl BitOrAssign for StageFlags {
    fn bitor_assign(&mut self, other: Self) {
        self.0 |= other.0;
    }
}

impl From<ShaderStage> for StageFlags {
    fn from(stage: ShaderStage) -> Self {
        Self::of(stage)
    }
}

pub(super) const fn stage_name(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Vertex => "vertex",
        ShaderStage::TessControl => "tess_control",
        ShaderStage::TessEvaluation => "tess_evaluation",
        ShaderStage::Geometry => "geometry",
        ShaderStage::Fragment => "fragment",
        ShaderStage::Compute => "compute",
        ShaderStage::Task => "task",
        ShaderStage::Mesh => "mesh",
        ShaderStage::RayGeneration => "ray_generation",
        ShaderStage::Intersection => "intersection",
        ShaderStage::AnyHit => "any_hit",
        ShaderStage::ClosestHit => "closest_hit",
        ShaderStage::Miss => "miss",
        ShaderStage::Callable => "callable",
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LayoutBinding {
    pub binding: u32,
    pub descriptor_type: DescriptorType,
    pub count: u32,
    pub stages: StageFlags,
    pub name: Option<String>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DescriptorSetLayout {
    pub set: u32,
    pub bindings: Vec<LayoutBinding>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct PushConstantRange {
    pub stages: StageFlags,
    pub bank: Option<u32>,
    pub offset: u32,
    pub size: u32,
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct PipelineLayout {
    pub sets: Vec<DescriptorSetLayout>,
    pub push_constant_ranges: Vec<PushConstantRange>,
}

impl PipelineLayout {
    pub fn new(stages: &[&Reflection]) -> Result<Self, LayoutError> {
        let mut bindings: BTreeMap<(u32, u32), (ShaderStage, LayoutBinding)> = BTreeMap::new();
        let mut push_constant_ranges = Vec::new();
        for reflection in stages {
            let stage = reflection.stage;
            for descriptor in &reflection.descriptor_bindings {
                let key = (descriptor.set, descriptor.binding);
                if let Some(&mut (first_stage, ref mut known)) = bindings.get_mut(&key) {
                    if known.descriptor_type != descriptor.descriptor_type
                        || known.count != descriptor.count
                    {
                        return Err(LayoutError {
                            set: descriptor.set,
                            binding: descriptor.binding,
                            first: (first_stage, known.descriptor_type, known.count),
                            second: (stage, descriptor.descriptor_type, descriptor.count),
                        });
                    }
                    known.stages |= StageFlags::of(stage);
                    if known.name.is_none() {
                        known.name.clone_from(&descriptor.name);
                    }
                    continue;
                }
                bindings.insert(
                    key,
                    (
                        stage,
                        LayoutBinding {
                            binding: descriptor.binding,
                            descriptor_type: descriptor.descriptor_type,
                            count: descriptor.count,
                            stages: StageFlags::of(stage),
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
            push_constant_ranges.extend(banks.into_iter().map(|(bank, (offset, end))| {
                PushConstantRange {
                    stages: StageFlags::of(stage),
                    bank,
                    offset,
                    size: end.saturating_sub(offset),
                }
            }));
        }
        let mut sets: Vec<DescriptorSetLayout> = Vec::new();
        for ((set, _), (_, binding)) in bindings {
            match sets.last_mut() {
                Some(layout) if layout.set == set => layout.bindings.push(binding),
                _ => sets.push(DescriptorSetLayout {
                    set,
                    bindings: vec![binding],
                }),
            }
        }
        Ok(Self {
            sets,
            push_constant_ranges,
        })
    }
}
