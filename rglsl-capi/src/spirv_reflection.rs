use std::ffi::{CStr, CString, c_char};
use std::ptr;

use rglsl_link::ShaderStage;
use rglsl_link::spirv_reflection::{
    self, DescriptorHeap, InterfaceVariable, LayoutBinding, LayoutError, PushConstantRange,
    ReflectError, Reflection, ScalarType, vulkan_stage_flags,
};

use crate::api::{
    Blob, Diagnostics, Failure, Program, RGLSL_RESULT_INVALID_ARGUMENT, RGLSL_RESULT_INVALID_SPIRV,
    RGLSL_RESULT_LINK_FAILED, RGLSL_RESULT_OK, ResultCode, Slot, Stage, c_string, produce, query,
    required,
};

#[repr(transparent)]
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct DescriptorType(u32);

pub const RGLSL_DESCRIPTOR_TYPE_SAMPLER: DescriptorType = DescriptorType(0);
pub const RGLSL_DESCRIPTOR_TYPE_COMBINED_IMAGE_SAMPLER: DescriptorType = DescriptorType(1);
pub const RGLSL_DESCRIPTOR_TYPE_SAMPLED_IMAGE: DescriptorType = DescriptorType(2);
pub const RGLSL_DESCRIPTOR_TYPE_STORAGE_IMAGE: DescriptorType = DescriptorType(3);
pub const RGLSL_DESCRIPTOR_TYPE_UNIFORM_TEXEL_BUFFER: DescriptorType = DescriptorType(4);
pub const RGLSL_DESCRIPTOR_TYPE_STORAGE_TEXEL_BUFFER: DescriptorType = DescriptorType(5);
pub const RGLSL_DESCRIPTOR_TYPE_UNIFORM_BUFFER: DescriptorType = DescriptorType(6);
pub const RGLSL_DESCRIPTOR_TYPE_STORAGE_BUFFER: DescriptorType = DescriptorType(7);
pub const RGLSL_DESCRIPTOR_TYPE_INPUT_ATTACHMENT: DescriptorType = DescriptorType(10);
pub const RGLSL_DESCRIPTOR_TYPE_ACCELERATION_STRUCTURE: DescriptorType =
    DescriptorType(1_000_150_000);
pub const RGLSL_DESCRIPTOR_TYPE_TENSOR: DescriptorType = DescriptorType(1_000_460_000);

impl DescriptorType {
    pub const fn raw(self) -> u32 {
        self.0
    }

    const fn of(descriptor: spirv_reflection::DescriptorType) -> Self {
        Self(descriptor.vulkan())
    }
}

#[repr(transparent)]
#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct ScalarKind(u32);

pub const RGLSL_SCALAR_KIND_BOOL: ScalarKind = ScalarKind(0);
pub const RGLSL_SCALAR_KIND_INT: ScalarKind = ScalarKind(1);
pub const RGLSL_SCALAR_KIND_UINT: ScalarKind = ScalarKind(2);
pub const RGLSL_SCALAR_KIND_FLOAT: ScalarKind = ScalarKind(3);
pub const RGLSL_SCALAR_KIND_ENCODED_FLOAT: ScalarKind = ScalarKind(4);

impl ScalarKind {
    pub const fn raw(self) -> u32 {
        self.0
    }

    const fn of(kind: spirv_reflection::ScalarKind) -> (Self, u32) {
        match kind {
            spirv_reflection::ScalarKind::Bool => (RGLSL_SCALAR_KIND_BOOL, 0),
            spirv_reflection::ScalarKind::Int => (RGLSL_SCALAR_KIND_INT, 0),
            spirv_reflection::ScalarKind::Uint => (RGLSL_SCALAR_KIND_UINT, 0),
            spirv_reflection::ScalarKind::Float => (RGLSL_SCALAR_KIND_FLOAT, 0),
            spirv_reflection::ScalarKind::EncodedFloat(encoding) => {
                (RGLSL_SCALAR_KIND_ENCODED_FLOAT, encoding)
            }
        }
    }
}

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Interface(u32);

pub const RGLSL_INTERFACE_INPUT: Interface = Interface(0);
pub const RGLSL_INTERFACE_OUTPUT: Interface = Interface(1);

impl Interface {
    pub const fn from_raw(value: u32) -> Self {
        Self(value)
    }

    pub(crate) const fn is_output(self) -> Option<bool> {
        match self {
            RGLSL_INTERFACE_INPUT => Some(false),
            RGLSL_INTERFACE_OUTPUT => Some(true),
            _ => None,
        }
    }
}

pub const RGLSL_DESCRIPTOR_HEAP_RESOURCE: u32 = 1;
pub const RGLSL_DESCRIPTOR_HEAP_SAMPLER: u32 = 1 << 1;

#[derive(Debug)]
pub struct SpirvReflection {
    source: Reflection,
    entry_point: CString,
    binding_names: Vec<Option<CString>>,
    push_constant_names: Vec<Option<CString>>,
    input_names: Vec<Option<CString>>,
    output_names: Vec<Option<CString>>,
    specialization_names: Vec<Option<CString>>,
}

pub(crate) fn names<'a>(names: impl Iterator<Item = Option<&'a str>>) -> Vec<Option<CString>> {
    names.map(|name| name.map(c_string)).collect()
}

fn interface_names(variables: &[InterfaceVariable]) -> Vec<Option<CString>> {
    names(variables.iter().map(|variable| variable.name.as_deref()))
}

impl SpirvReflection {
    fn new(source: Reflection) -> Self {
        Self {
            entry_point: c_string(&source.entry_point),
            binding_names: names(
                source
                    .descriptor_bindings
                    .iter()
                    .map(|binding| binding.name.as_deref()),
            ),
            push_constant_names: names(
                source
                    .push_constants
                    .iter()
                    .map(|block| block.name.as_deref()),
            ),
            input_names: interface_names(&source.inputs),
            output_names: interface_names(&source.outputs),
            specialization_names: names(
                source
                    .specialization_constants
                    .iter()
                    .map(|constant| constant.name.as_deref()),
            ),
            source,
        }
    }

    fn interface(
        &self,
        interface: Interface,
    ) -> Option<(&[InterfaceVariable], &[Option<CString>])> {
        match interface {
            RGLSL_INTERFACE_INPUT => Some((&self.source.inputs, &self.input_names)),
            RGLSL_INTERFACE_OUTPUT => Some((&self.source.outputs, &self.output_names)),
            _ => None,
        }
    }
}

#[derive(Debug)]
struct SetBinding {
    set: u32,
    binding: LayoutBinding,
    name: Option<CString>,
}

#[derive(Debug)]
pub struct PipelineLayout {
    bindings: Vec<SetBinding>,
    ranges: Vec<PushConstantRange>,
}

impl PipelineLayout {
    fn new(layout: spirv_reflection::PipelineLayout) -> Self {
        Self {
            bindings: layout
                .sets
                .into_iter()
                .flat_map(|set| {
                    let index = set.set;
                    set.bindings.into_iter().map(move |binding| SetBinding {
                        set: index,
                        name: binding.name.as_deref().map(c_string),
                        binding,
                    })
                })
                .collect(),
            ranges: layout.push_constant_ranges,
        }
    }
}

pub(crate) fn name(names: &[Option<CString>], index: usize) -> *const c_char {
    names
        .get(index)
        .and_then(Option::as_deref)
        .map_or(ptr::null(), CStr::as_ptr)
}

pub(crate) fn invalid_spirv(error: &ReflectError) -> Failure {
    Failure::from_message(
        RGLSL_RESULT_INVALID_SPIRV,
        format!("invalid SPIR-V: {error}"),
    )
}

fn conflict(error: &LayoutError) -> Failure {
    Failure::from_message(RGLSL_RESULT_LINK_FAILED, error.to_string())
}

fn reflect_stage(stage: ShaderStage, words: &[u32]) -> Result<Reflection, Failure> {
    spirv_reflection::reflect(words).map_err(|error| {
        Failure::from_message(
            RGLSL_RESULT_INVALID_SPIRV,
            format!(
                "cannot reflect the SPIR-V of the {} stage: {error}",
                stage.name()
            ),
        )
    })
}

fn program_reflections(program: &Program) -> Result<Vec<Reflection>, Failure> {
    program
        .stage_words()
        .map(|(stage, words)| reflect_stage(stage, words))
        .collect()
}

pub(crate) fn reflect(
    words: Option<&[u32]>,
    output: Slot<'_, SpirvReflection>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(output, diagnostics, || {
        spirv_reflection::reflect(required(words, "words")?)
            .map(SpirvReflection::new)
            .map_err(|error| invalid_spirv(&error))
    })
}

pub(crate) fn program_spirv_reflection(
    program: Option<&Program>,
    index: usize,
    output: Slot<'_, SpirvReflection>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(output, diagnostics, || {
        let program = required(program, "program")?;
        let count = program.stage_words().len();
        let (stage, words) = program.stage_words().nth(index).ok_or_else(|| {
            Failure::argument(format!(
                "stage {index} is out of range: the program has {count} stages"
            ))
        })?;
        reflect_stage(stage, words).map(SpirvReflection::new)
    })
}

pub(crate) fn reflection_stage(
    reflection: Option<&SpirvReflection>,
    stage: Option<&mut Stage>,
) -> ResultCode {
    let Some(stage) = stage else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        *stage = Stage::of(reflection.source.stage);
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_entry_point(reflection: Option<&SpirvReflection>) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(reflection.entry_point.as_ptr())
    })
}

pub(crate) struct LocalSize<'a> {
    pub(crate) present: Option<&'a mut bool>,
    pub(crate) size: Option<&'a mut u32>,
    pub(crate) specialized: Option<&'a mut bool>,
    pub(crate) spec_id: Option<&'a mut u32>,
}

pub(crate) fn reflection_local_size(
    reflection: Option<&SpirvReflection>,
    dimension: u32,
    output: LocalSize<'_>,
) -> ResultCode {
    let LocalSize {
        present: Some(present),
        size: Some(size),
        specialized: Some(specialized),
        spec_id: Some(spec_id),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *present = false;
    *size = 0;
    *specialized = false;
    *spec_id = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let dimension = usize::try_from(dimension).ok().filter(|&index| index < 3)?;
        if let Some(sizes) = reflection.source.local_size {
            let value = *sizes.get(dimension)?;
            *present = true;
            *size = value.size();
            *specialized = value.specialization_id().is_some();
            *spec_id = value.specialization_id().unwrap_or(0);
        }
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_binding_count(reflection: Option<&SpirvReflection>) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.source.descriptor_bindings.len())
    })
}

pub(crate) struct ReflectionBinding<'a> {
    pub(crate) set: Option<&'a mut u32>,
    pub(crate) binding: Option<&'a mut u32>,
    pub(crate) descriptor_type: Option<&'a mut DescriptorType>,
    pub(crate) count: Option<&'a mut u32>,
    pub(crate) variable_id: Option<&'a mut u32>,
}

pub(crate) fn reflection_binding(
    reflection: Option<&SpirvReflection>,
    index: usize,
    output: ReflectionBinding<'_>,
) -> ResultCode {
    let ReflectionBinding {
        set: Some(set),
        binding: Some(binding),
        descriptor_type: Some(descriptor_type),
        count: Some(count),
        variable_id: Some(variable_id),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *set = 0;
    *binding = 0;
    *descriptor_type = DescriptorType::default();
    *count = 0;
    *variable_id = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let found = reflection.source.descriptor_bindings.get(index)?;
        *set = found.set;
        *binding = found.binding;
        *descriptor_type = DescriptorType::of(found.descriptor_type);
        *count = found.count;
        *variable_id = found.variable_id;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_binding_name(
    reflection: Option<&SpirvReflection>,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(&reflection.binding_names, index))
    })
}

pub(crate) struct BindingBlock<'a> {
    pub(crate) is_block: Option<&'a mut bool>,
    pub(crate) size: Option<&'a mut u32>,
    pub(crate) runtime_array_stride: Option<&'a mut u32>,
}

pub(crate) fn reflection_binding_block(
    reflection: Option<&SpirvReflection>,
    index: usize,
    output: BindingBlock<'_>,
) -> ResultCode {
    let BindingBlock {
        is_block: Some(is_block),
        size: Some(size),
        runtime_array_stride: Some(runtime_array_stride),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *is_block = false;
    *size = 0;
    *runtime_array_stride = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        if let Some(block) = reflection.source.descriptor_bindings.get(index)?.block {
            *is_block = true;
            *size = block.size;
            *runtime_array_stride = block.runtime_array_stride.unwrap_or(0);
        }
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_descriptor_heaps(reflection: Option<&SpirvReflection>) -> u32 {
    query(reflection, 0, |reflection| {
        Some(
            reflection
                .source
                .descriptor_heaps
                .iter()
                .map(|&heap| match heap {
                    DescriptorHeap::Resource => RGLSL_DESCRIPTOR_HEAP_RESOURCE,
                    DescriptorHeap::Sampler => RGLSL_DESCRIPTOR_HEAP_SAMPLER,
                })
                .fold(0, |flags, flag| flags | flag),
        )
    })
}

pub(crate) fn reflection_push_constant_count(reflection: Option<&SpirvReflection>) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.source.push_constants.len())
    })
}

pub(crate) struct PushConstant<'a> {
    pub(crate) offset: Option<&'a mut u32>,
    pub(crate) size: Option<&'a mut u32>,
    pub(crate) variable_id: Option<&'a mut u32>,
}

pub(crate) fn reflection_push_constant(
    reflection: Option<&SpirvReflection>,
    index: usize,
    output: PushConstant<'_>,
) -> ResultCode {
    let PushConstant {
        offset: Some(offset),
        size: Some(size),
        variable_id: Some(variable_id),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *offset = 0;
    *size = 0;
    *variable_id = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let block = reflection.source.push_constants.get(index)?;
        *offset = block.offset;
        *size = block.size;
        *variable_id = block.variable_id;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_push_constant_name(
    reflection: Option<&SpirvReflection>,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(&reflection.push_constant_names, index))
    })
}

pub(crate) struct PushConstantBank<'a> {
    pub(crate) banked: Option<&'a mut bool>,
    pub(crate) bank: Option<&'a mut u32>,
    pub(crate) bank_offset: Option<&'a mut u32>,
}

pub(crate) fn reflection_push_constant_bank(
    reflection: Option<&SpirvReflection>,
    index: usize,
    output: PushConstantBank<'_>,
) -> ResultCode {
    let PushConstantBank {
        banked: Some(banked),
        bank: Some(bank),
        bank_offset: Some(bank_offset),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *banked = false;
    *bank = 0;
    *bank_offset = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let block = reflection.source.push_constants.get(index)?;
        if let Some(value) = block.bank {
            *banked = true;
            *bank = value;
            *bank_offset = block.bank_offset.unwrap_or(0);
        }
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_interface_count(
    reflection: Option<&SpirvReflection>,
    interface: Interface,
) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.interface(interface)?.0.len())
    })
}

pub(crate) struct InterfaceSlot<'a> {
    pub(crate) location: Option<&'a mut u32>,
    pub(crate) component: Option<&'a mut u32>,
    pub(crate) variable_id: Option<&'a mut u32>,
}

pub(crate) fn reflection_interface(
    reflection: Option<&SpirvReflection>,
    interface: Interface,
    index: usize,
    output: InterfaceSlot<'_>,
) -> ResultCode {
    let InterfaceSlot {
        location: Some(location),
        component: Some(component),
        variable_id: Some(variable_id),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *location = 0;
    *component = 0;
    *variable_id = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let variable = reflection.interface(interface)?.0.get(index)?;
        *location = variable.location;
        *component = variable.component;
        *variable_id = variable.variable_id;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_interface_name(
    reflection: Option<&SpirvReflection>,
    interface: Interface,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(reflection.interface(interface)?.1, index))
    })
}

pub(crate) struct Scalar<'a> {
    pub(crate) kind: Option<&'a mut ScalarKind>,
    pub(crate) encoding: Option<&'a mut u32>,
    pub(crate) width: Option<&'a mut u32>,
}

pub(crate) struct ScalarSlot<'a> {
    kind: &'a mut ScalarKind,
    encoding: &'a mut u32,
    width: &'a mut u32,
}

impl<'a> Scalar<'a> {
    pub(crate) fn required(self) -> Option<ScalarSlot<'a>> {
        let slot = ScalarSlot {
            kind: self.kind?,
            encoding: self.encoding?,
            width: self.width?,
        };
        *slot.kind = ScalarKind::default();
        *slot.encoding = 0;
        *slot.width = 0;
        Some(slot)
    }
}

impl ScalarSlot<'_> {
    pub(crate) fn write(self, scalar: ScalarType) {
        (*self.kind, *self.encoding) = ScalarKind::of(scalar.kind);
        *self.width = scalar.width;
    }
}

pub(crate) struct InterfaceFormat<'a> {
    pub(crate) scalar: Scalar<'a>,
    pub(crate) vector_size: Option<&'a mut u32>,
    pub(crate) columns: Option<&'a mut u32>,
    pub(crate) array: Option<&'a mut *const u32>,
    pub(crate) array_rank: Option<&'a mut usize>,
}

pub(crate) fn reflection_interface_type(
    reflection: Option<&SpirvReflection>,
    interface: Interface,
    index: usize,
    output: InterfaceFormat<'_>,
) -> ResultCode {
    let InterfaceFormat {
        scalar,
        vector_size: Some(vector_size),
        columns: Some(columns),
        array: Some(array),
        array_rank: Some(array_rank),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    let Some(scalar) = scalar.required() else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *vector_size = 0;
    *columns = 0;
    *array = ptr::null();
    *array_rank = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let format = &reflection.interface(interface)?.0.get(index)?.format;
        scalar.write(format.scalar);
        *vector_size = format.vector_size;
        *columns = format.columns;
        *array = format.array.as_ptr();
        *array_rank = format.array.len();
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_specialization_count(reflection: Option<&SpirvReflection>) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.source.specialization_constants.len())
    })
}

pub(crate) struct Specialization<'a> {
    pub(crate) spec_id: Option<&'a mut u32>,
    pub(crate) scalar: Scalar<'a>,
    pub(crate) default_bits: Option<&'a mut u64>,
    pub(crate) result_id: Option<&'a mut u32>,
}

pub(crate) fn reflection_specialization(
    reflection: Option<&SpirvReflection>,
    index: usize,
    output: Specialization<'_>,
) -> ResultCode {
    let Specialization {
        spec_id: Some(spec_id),
        scalar,
        default_bits: Some(default_bits),
        result_id: Some(result_id),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    let Some(scalar) = scalar.required() else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *spec_id = 0;
    *default_bits = 0;
    *result_id = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let constant = reflection.source.specialization_constants.get(index)?;
        *spec_id = constant.spec_id;
        scalar.write(constant.scalar);
        *default_bits = constant.default.bits(constant.scalar.width);
        *result_id = constant.result_id;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_specialization_name(
    reflection: Option<&SpirvReflection>,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(&reflection.specialization_names, index))
    })
}

pub(crate) fn reflection_json(
    reflection: Option<&SpirvReflection>,
    output: Slot<'_, Blob>,
) -> ResultCode {
    produce(output, None, || {
        Ok(Blob::text(
            required(reflection, "reflection")?.source.to_json(),
        ))
    })
}

pub(crate) fn pipeline_layout_create(
    reflections: Option<Vec<Option<&SpirvReflection>>>,
    output: Slot<'_, PipelineLayout>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(output, diagnostics, || {
        let reflections = reflections.ok_or_else(|| Failure::null("reflections"))?;
        let sources = reflections
            .into_iter()
            .enumerate()
            .map(|(index, reflection)| {
                reflection
                    .map(|reflection| &reflection.source)
                    .ok_or_else(|| Failure::null(&format!("reflections[{index}]")))
            })
            .collect::<Result<Vec<_>, _>>()?;
        spirv_reflection::PipelineLayout::new(sources)
            .map(PipelineLayout::new)
            .map_err(|error| conflict(&error))
    })
}

pub(crate) fn program_pipeline_layout(
    program: Option<&Program>,
    output: Slot<'_, PipelineLayout>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(output, diagnostics, || {
        let reflections = program_reflections(required(program, "program")?)?;
        spirv_reflection::PipelineLayout::new(&reflections)
            .map(PipelineLayout::new)
            .map_err(|error| conflict(&error))
    })
}

pub(crate) fn program_spirv_reflection_json(
    program: Option<&Program>,
    output: Slot<'_, Blob>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(output, diagnostics, || {
        let reflections = program_reflections(required(program, "program")?)?;
        spirv_reflection::program_json(&reflections)
            .map(Blob::text)
            .map_err(|error| conflict(&error))
    })
}

pub(crate) fn pipeline_layout_binding_count(layout: Option<&PipelineLayout>) -> usize {
    query(layout, 0, |layout| Some(layout.bindings.len()))
}

pub(crate) struct LayoutBindingSlot<'a> {
    pub(crate) set: Option<&'a mut u32>,
    pub(crate) binding: Option<&'a mut u32>,
    pub(crate) descriptor_type: Option<&'a mut DescriptorType>,
    pub(crate) count: Option<&'a mut u32>,
    pub(crate) stage_flags: Option<&'a mut u32>,
}

pub(crate) fn pipeline_layout_binding(
    layout: Option<&PipelineLayout>,
    index: usize,
    output: LayoutBindingSlot<'_>,
) -> ResultCode {
    let LayoutBindingSlot {
        set: Some(set),
        binding: Some(binding),
        descriptor_type: Some(descriptor_type),
        count: Some(count),
        stage_flags: Some(stage_flags),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *set = 0;
    *binding = 0;
    *descriptor_type = DescriptorType::default();
    *count = 0;
    *stage_flags = 0;
    query(layout, RGLSL_RESULT_INVALID_ARGUMENT, |layout| {
        let found = layout.bindings.get(index)?;
        *set = found.set;
        *binding = found.binding.binding;
        *descriptor_type = DescriptorType::of(found.binding.descriptor_type);
        *count = found.binding.count;
        *stage_flags = vulkan_stage_flags(found.binding.stages);
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn pipeline_layout_binding_name(
    layout: Option<&PipelineLayout>,
    index: usize,
) -> *const c_char {
    query(layout, ptr::null(), |layout| {
        Some(
            layout
                .bindings
                .get(index)?
                .name
                .as_deref()
                .map_or(ptr::null(), CStr::as_ptr),
        )
    })
}

pub(crate) fn pipeline_layout_push_constant_range_count(layout: Option<&PipelineLayout>) -> usize {
    query(layout, 0, |layout| Some(layout.ranges.len()))
}

pub(crate) struct RangeSlot<'a> {
    pub(crate) stage_flags: Option<&'a mut u32>,
    pub(crate) offset: Option<&'a mut u32>,
    pub(crate) size: Option<&'a mut u32>,
}

pub(crate) fn pipeline_layout_push_constant_range(
    layout: Option<&PipelineLayout>,
    index: usize,
    output: RangeSlot<'_>,
) -> ResultCode {
    let RangeSlot {
        stage_flags: Some(stage_flags),
        offset: Some(offset),
        size: Some(size),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *stage_flags = 0;
    *offset = 0;
    *size = 0;
    query(layout, RGLSL_RESULT_INVALID_ARGUMENT, |layout| {
        let range = layout.ranges.get(index)?;
        *stage_flags = vulkan_stage_flags(range.stages);
        *offset = range.offset;
        *size = range.size;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn pipeline_layout_push_constant_range_bank(
    layout: Option<&PipelineLayout>,
    index: usize,
    banked: Option<&mut bool>,
    bank: Option<&mut u32>,
) -> ResultCode {
    let (Some(banked), Some(bank)) = (banked, bank) else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *banked = false;
    *bank = 0;
    query(layout, RGLSL_RESULT_INVALID_ARGUMENT, |layout| {
        if let Some(value) = layout.ranges.get(index)?.bank {
            *banked = true;
            *bank = value;
        }
        Some(RGLSL_RESULT_OK)
    })
}
