mod error;
mod interface;
mod json;
mod layout;
mod module;
mod pipeline;
mod resources;

#[cfg(test)]
mod tests;

use rglsl_types::ShaderStage;

pub use error::{LayoutError, ReflectError};
pub use json::program_json;
pub use pipeline::{
    DescriptorSetLayout, LayoutBinding, PipelineLayout, PushConstantRange, StageFlags,
};

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Reflection {
    pub stage: ShaderStage,
    pub entry_point: String,
    pub local_size: Option<[WorkgroupDimension; 3]>,
    pub descriptor_bindings: Vec<DescriptorBinding>,
    pub descriptor_heaps: Vec<DescriptorHeap>,
    pub push_constants: Vec<PushConstantBlock>,
    pub inputs: Vec<InterfaceVariable>,
    pub outputs: Vec<InterfaceVariable>,
    pub specialization_constants: Vec<SpecializationConstant>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum WorkgroupDimension {
    Fixed(u32),
    Specialization { id: u32, default: u32 },
}

impl WorkgroupDimension {
    pub const fn size(self) -> u32 {
        match self {
            Self::Fixed(size) | Self::Specialization { default: size, .. } => size,
        }
    }

    pub const fn specialization_id(self) -> Option<u32> {
        match self {
            Self::Fixed(_) => None,
            Self::Specialization { id, .. } => Some(id),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum DescriptorType {
    Sampler,
    CombinedImageSampler,
    SampledImage,
    StorageImage,
    UniformTexelBuffer,
    StorageTexelBuffer,
    UniformBuffer,
    StorageBuffer,
    InputAttachment,
    AccelerationStructure,
    Tensor,
}

impl DescriptorType {
    pub const ALL: [Self; 11] = [
        Self::Sampler,
        Self::CombinedImageSampler,
        Self::SampledImage,
        Self::StorageImage,
        Self::UniformTexelBuffer,
        Self::StorageTexelBuffer,
        Self::UniformBuffer,
        Self::StorageBuffer,
        Self::InputAttachment,
        Self::AccelerationStructure,
        Self::Tensor,
    ];

    pub const fn vulkan(self) -> u32 {
        match self {
            Self::Sampler => 0,
            Self::CombinedImageSampler => 1,
            Self::SampledImage => 2,
            Self::StorageImage => 3,
            Self::UniformTexelBuffer => 4,
            Self::StorageTexelBuffer => 5,
            Self::UniformBuffer => 6,
            Self::StorageBuffer => 7,
            Self::InputAttachment => 10,
            Self::AccelerationStructure => 1_000_150_000,
            Self::Tensor => 1_000_460_000,
        }
    }

    pub fn from_vulkan(value: u32) -> Option<Self> {
        Self::ALL
            .into_iter()
            .find(|descriptor| descriptor.vulkan() == value)
    }

    pub const fn name(self) -> &'static str {
        match self {
            Self::Sampler => "sampler",
            Self::CombinedImageSampler => "combined_image_sampler",
            Self::SampledImage => "sampled_image",
            Self::StorageImage => "storage_image",
            Self::UniformTexelBuffer => "uniform_texel_buffer",
            Self::StorageTexelBuffer => "storage_texel_buffer",
            Self::UniformBuffer => "uniform_buffer",
            Self::StorageBuffer => "storage_buffer",
            Self::InputAttachment => "input_attachment",
            Self::AccelerationStructure => "acceleration_structure",
            Self::Tensor => "tensor",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct DescriptorBinding {
    pub set: u32,
    pub binding: u32,
    pub descriptor_type: DescriptorType,
    pub count: u32,
    pub name: Option<String>,
    pub variable_id: u32,
    pub block: Option<BlockLayout>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct BlockLayout {
    pub size: u32,
    pub runtime_array_stride: Option<u32>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum DescriptorHeap {
    Resource,
    Sampler,
}

impl DescriptorHeap {
    pub const fn name(self) -> &'static str {
        match self {
            Self::Resource => "resource",
            Self::Sampler => "sampler",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct PushConstantBlock {
    pub name: Option<String>,
    pub variable_id: u32,
    pub offset: u32,
    pub size: u32,
    pub bank: Option<u32>,
    pub bank_offset: Option<u32>,
}

impl PushConstantBlock {
    pub const fn end(&self) -> u32 {
        self.offset.saturating_add(self.size)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct InterfaceVariable {
    pub location: u32,
    pub component: u32,
    pub name: Option<String>,
    pub variable_id: u32,
    pub format: Format,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Format {
    pub scalar: ScalarType,
    pub vector_size: u32,
    pub columns: u32,
    pub array: Vec<u32>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub struct ScalarType {
    pub kind: ScalarKind,
    pub width: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum ScalarKind {
    Bool,
    Int,
    Uint,
    Float,
    EncodedFloat(u32),
}

impl ScalarKind {
    pub const fn name(self) -> &'static str {
        match self {
            Self::Bool => "bool",
            Self::Int => "int",
            Self::Uint => "uint",
            Self::Float => "float",
            Self::EncodedFloat(_) => "encoded_float",
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SpecializationConstant {
    pub id: u32,
    pub name: Option<String>,
    pub constant_id: u32,
    pub scalar: ScalarType,
    pub default: ScalarValue,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum ScalarValue {
    Bool(bool),
    Int(i64),
    Uint(u64),
    Float(u64),
}

impl ScalarValue {
    pub const fn bits(self, width: u32) -> u64 {
        let mask = if width >= 64 || width == 0 {
            u64::MAX
        } else {
            (1_u64 << width) - 1
        };
        match self {
            Self::Bool(value) => value as u64,
            Self::Int(value) => value.cast_unsigned() & mask,
            Self::Uint(value) | Self::Float(value) => value & mask,
        }
    }
}

pub fn reflect(words: &[u32]) -> Result<Reflection, ReflectError> {
    let module = module::Module::parse(words)?;
    let entry = module.entry_point()?;
    let mut sizes = layout::Sizes::new(&module);
    let resources = resources::collect(&module, &mut sizes)?;
    let (inputs, outputs) = interface::collect(&module, entry)?;
    Ok(Reflection {
        stage: entry.stage,
        entry_point: entry.name.clone(),
        local_size: module.local_size(entry)?,
        descriptor_bindings: resources.bindings,
        descriptor_heaps: resources.heaps,
        push_constants: resources.push_constants,
        inputs,
        outputs,
        specialization_constants: module.specialization_constants()?,
    })
}
