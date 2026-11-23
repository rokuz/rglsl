use std::ffi::{CStr, CString, c_char};
use std::ptr;

use rglsl_link::reflection::{
    self, DescriptorHeap, InterfaceVariable, LayoutBinding, PushConstantRange, ScalarType,
};

use crate::api::{
    Blob, Diagnostics, Failure, Program, RGLSL_RESULT_INVALID_ARGUMENT, RGLSL_RESULT_INVALID_SPIRV,
    RGLSL_RESULT_LINK_FAILED, RGLSL_RESULT_OK, ResultCode, Slot, Stage, c_string, produce, query,
    required,
};

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
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

    const fn of(descriptor: reflection::DescriptorType) -> Self {
        Self(descriptor.vulkan())
    }
}

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
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

    const fn of(kind: reflection::ScalarKind) -> Self {
        match kind {
            reflection::ScalarKind::Bool => RGLSL_SCALAR_KIND_BOOL,
            reflection::ScalarKind::Int => RGLSL_SCALAR_KIND_INT,
            reflection::ScalarKind::Uint => RGLSL_SCALAR_KIND_UINT,
            reflection::ScalarKind::Float => RGLSL_SCALAR_KIND_FLOAT,
            reflection::ScalarKind::EncodedFloat(_) => RGLSL_SCALAR_KIND_ENCODED_FLOAT,
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
}

pub const RGLSL_DESCRIPTOR_HEAP_RESOURCE: u32 = 1;
pub const RGLSL_DESCRIPTOR_HEAP_SAMPLER: u32 = 1 << 1;

#[derive(Debug)]
pub struct Reflection {
    source: rglsl_link::Reflection,
    entry_point: CString,
    binding_names: Vec<Option<CString>>,
    push_constant_names: Vec<Option<CString>>,
    input_names: Vec<Option<CString>>,
    output_names: Vec<Option<CString>>,
    specialization_names: Vec<Option<CString>>,
}

fn names<'a>(names: impl Iterator<Item = Option<&'a str>>) -> Vec<Option<CString>> {
    names.map(|name| name.map(c_string)).collect()
}

fn interface_names(variables: &[InterfaceVariable]) -> Vec<Option<CString>> {
    names(variables.iter().map(|variable| variable.name.as_deref()))
}

impl Reflection {
    pub(crate) fn new(source: rglsl_link::Reflection) -> Self {
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

    pub(crate) const fn source(&self) -> &rglsl_link::Reflection {
        &self.source
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
pub struct PipelineLayout {
    bindings: Vec<(u32, LayoutBinding)>,
    names: Vec<Option<CString>>,
    ranges: Vec<PushConstantRange>,
}

impl PipelineLayout {
    fn new(layout: rglsl_link::PipelineLayout) -> Self {
        let bindings: Vec<(u32, LayoutBinding)> = layout
            .sets
            .into_iter()
            .flat_map(|set| {
                let index = set.set;
                set.bindings
                    .into_iter()
                    .map(move |binding| (index, binding))
            })
            .collect();
        Self {
            names: names(bindings.iter().map(|(_, binding)| binding.name.as_deref())),
            bindings,
            ranges: layout.push_constant_ranges,
        }
    }
}

fn put<T>(slot: Option<&mut T>, value: T) {
    if let Some(slot) = slot {
        *slot = value;
    }
}

fn name(names: &[Option<CString>], index: usize) -> *const c_char {
    names
        .get(index)
        .and_then(Option::as_deref)
        .map_or(ptr::null(), CStr::as_ptr)
}

fn conflict(error: &reflection::LayoutError) -> Failure {
    Failure::from_message(RGLSL_RESULT_LINK_FAILED, error.to_string())
}

pub(crate) fn reflect(
    words: Option<&[u32]>,
    output: Slot<'_, Reflection>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(output, diagnostics, || {
        let words = required(words, "words")?;
        reflection::reflect(words)
            .map(Reflection::new)
            .map_err(|error| {
                Failure::from_message(
                    RGLSL_RESULT_INVALID_SPIRV,
                    format!("invalid SPIR-V: {error}"),
                )
            })
    })
}

pub(crate) fn program_stage_reflection(
    program: Option<&Program>,
    index: usize,
) -> *const Reflection {
    query(program, ptr::null(), |program| {
        Some(ptr::from_ref(program.stage_reflection(index)?))
    })
}

pub(crate) fn reflection_stage(
    reflection: Option<&Reflection>,
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

pub(crate) fn reflection_entry_point(reflection: Option<&Reflection>) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(reflection.entry_point.as_ptr())
    })
}

pub(crate) struct LocalSize<'a> {
    pub(crate) size: Option<&'a mut u32>,
    pub(crate) specialized: Option<&'a mut bool>,
    pub(crate) id: Option<&'a mut u32>,
}

pub(crate) fn reflection_local_size(
    reflection: Option<&Reflection>,
    dimension: u32,
    output: LocalSize<'_>,
) -> ResultCode {
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let sizes = reflection.source.local_size?;
        let dimension = *sizes.get(usize::try_from(dimension).ok()?)?;
        put(output.size, dimension.size());
        put(output.specialized, dimension.specialization_id().is_some());
        put(output.id, dimension.specialization_id().unwrap_or(0));
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_binding_count(reflection: Option<&Reflection>) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.source.descriptor_bindings.len())
    })
}

pub(crate) struct Binding<'a> {
    pub(crate) set: Option<&'a mut u32>,
    pub(crate) binding: Option<&'a mut u32>,
    pub(crate) descriptor_type: Option<&'a mut DescriptorType>,
    pub(crate) count: Option<&'a mut u32>,
    pub(crate) extra: Option<&'a mut u32>,
}

pub(crate) fn reflection_binding(
    reflection: Option<&Reflection>,
    index: usize,
    output: Binding<'_>,
) -> ResultCode {
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let binding = reflection.source.descriptor_bindings.get(index)?;
        put(output.set, binding.set);
        put(output.binding, binding.binding);
        put(
            output.descriptor_type,
            DescriptorType::of(binding.descriptor_type),
        );
        put(output.count, binding.count);
        put(output.extra, binding.variable_id);
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_binding_name(
    reflection: Option<&Reflection>,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(&reflection.binding_names, index))
    })
}

pub(crate) fn reflection_binding_block(
    reflection: Option<&Reflection>,
    index: usize,
    size: Option<&mut u32>,
    runtime_array_stride: Option<&mut u32>,
) -> ResultCode {
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let block = reflection.source.descriptor_bindings.get(index)?.block?;
        put(size, block.size);
        put(
            runtime_array_stride,
            block.runtime_array_stride.unwrap_or(0),
        );
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_descriptor_heaps(reflection: Option<&Reflection>) -> u32 {
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

pub(crate) fn reflection_push_constant_count(reflection: Option<&Reflection>) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.source.push_constants.len())
    })
}

pub(crate) fn reflection_push_constant(
    reflection: Option<&Reflection>,
    index: usize,
    offset: Option<&mut u32>,
    size: Option<&mut u32>,
    variable_id: Option<&mut u32>,
) -> ResultCode {
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let block = reflection.source.push_constants.get(index)?;
        put(offset, block.offset);
        put(size, block.size);
        put(variable_id, block.variable_id);
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_push_constant_name(
    reflection: Option<&Reflection>,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(&reflection.push_constant_names, index))
    })
}

pub(crate) fn reflection_push_constant_bank(
    reflection: Option<&Reflection>,
    index: usize,
    bank: Option<&mut u32>,
    bank_offset: Option<&mut u32>,
) -> ResultCode {
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let block = reflection.source.push_constants.get(index)?;
        put(bank, block.bank?);
        put(bank_offset, block.bank_offset.unwrap_or(0));
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_interface_count(
    reflection: Option<&Reflection>,
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
    reflection: Option<&Reflection>,
    interface: Interface,
    index: usize,
    output: InterfaceSlot<'_>,
) -> ResultCode {
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let variable = reflection.interface(interface)?.0.get(index)?;
        put(output.location, variable.location);
        put(output.component, variable.component);
        put(output.variable_id, variable.variable_id);
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_interface_name(
    reflection: Option<&Reflection>,
    interface: Interface,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(reflection.interface(interface)?.1, index))
    })
}

pub(crate) struct Scalar<'a> {
    pub(crate) kind: Option<&'a mut ScalarKind>,
    pub(crate) width: Option<&'a mut u32>,
}

impl Scalar<'_> {
    fn write(self, scalar: ScalarType) {
        put(self.kind, ScalarKind::of(scalar.kind));
        put(self.width, scalar.width);
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
    reflection: Option<&Reflection>,
    interface: Interface,
    index: usize,
    output: InterfaceFormat<'_>,
) -> ResultCode {
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let format = &reflection.interface(interface)?.0.get(index)?.format;
        output.scalar.write(format.scalar);
        put(output.vector_size, format.vector_size);
        put(output.columns, format.columns);
        put(output.array, format.array.as_ptr());
        put(output.array_rank, format.array.len());
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_specialization_count(reflection: Option<&Reflection>) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.source.specialization_constants.len())
    })
}

pub(crate) struct Specialization<'a> {
    pub(crate) id: Option<&'a mut u32>,
    pub(crate) scalar: Scalar<'a>,
    pub(crate) default_bits: Option<&'a mut u64>,
    pub(crate) constant_id: Option<&'a mut u32>,
}

pub(crate) fn reflection_specialization(
    reflection: Option<&Reflection>,
    index: usize,
    output: Specialization<'_>,
) -> ResultCode {
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let constant = reflection.source.specialization_constants.get(index)?;
        put(output.id, constant.id);
        output.scalar.write(constant.scalar);
        put(
            output.default_bits,
            constant.default.bits(constant.scalar.width),
        );
        put(output.constant_id, constant.constant_id);
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn reflection_specialization_name(
    reflection: Option<&Reflection>,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(&reflection.specialization_names, index))
    })
}

pub(crate) fn reflection_json(
    reflection: Option<&Reflection>,
    output: Slot<'_, Blob>,
) -> ResultCode {
    produce(output, None, || {
        Ok(Blob::text(
            required(reflection, "reflection")?.source.to_json(),
        ))
    })
}

pub(crate) fn pipeline_layout_create(
    reflections: Option<Vec<Option<&Reflection>>>,
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
                    .map(Reflection::source)
                    .ok_or_else(|| Failure::null(&format!("reflections[{index}]")))
            })
            .collect::<Result<Vec<_>, _>>()?;
        rglsl_link::PipelineLayout::new(&sources)
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
        rglsl_link::PipelineLayout::new(&required(program, "program")?.reflections())
            .map(PipelineLayout::new)
            .map_err(|error| conflict(&error))
    })
}

pub(crate) fn program_reflection_json(
    program: Option<&Program>,
    output: Slot<'_, Blob>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(output, diagnostics, || {
        reflection::program_json(&required(program, "program")?.reflections())
            .map(Blob::text)
            .map_err(|error| conflict(&error))
    })
}

pub(crate) fn pipeline_layout_binding_count(layout: Option<&PipelineLayout>) -> usize {
    query(layout, 0, |layout| Some(layout.bindings.len()))
}

pub(crate) fn pipeline_layout_binding(
    layout: Option<&PipelineLayout>,
    index: usize,
    output: Binding<'_>,
) -> ResultCode {
    query(layout, RGLSL_RESULT_INVALID_ARGUMENT, |layout| {
        let &(set, ref binding) = layout.bindings.get(index)?;
        put(output.set, set);
        put(output.binding, binding.binding);
        put(
            output.descriptor_type,
            DescriptorType::of(binding.descriptor_type),
        );
        put(output.count, binding.count);
        put(output.extra, binding.stages.bits());
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn pipeline_layout_binding_name(
    layout: Option<&PipelineLayout>,
    index: usize,
) -> *const c_char {
    query(layout, ptr::null(), |layout| {
        Some(name(&layout.names, index))
    })
}

pub(crate) fn pipeline_layout_push_constant_range_count(layout: Option<&PipelineLayout>) -> usize {
    query(layout, 0, |layout| Some(layout.ranges.len()))
}

pub(crate) fn pipeline_layout_push_constant_range(
    layout: Option<&PipelineLayout>,
    index: usize,
    stages: Option<&mut u32>,
    offset: Option<&mut u32>,
    size: Option<&mut u32>,
) -> ResultCode {
    query(layout, RGLSL_RESULT_INVALID_ARGUMENT, |layout| {
        let range = layout.ranges.get(index)?;
        put(stages, range.stages.bits());
        put(offset, range.offset);
        put(size, range.size);
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn pipeline_layout_push_constant_range_bank(
    layout: Option<&PipelineLayout>,
    index: usize,
    bank: Option<&mut u32>,
) -> ResultCode {
    query(layout, RGLSL_RESULT_INVALID_ARGUMENT, |layout| {
        put(bank, layout.ranges.get(index)?.bank?);
        Some(RGLSL_RESULT_OK)
    })
}
