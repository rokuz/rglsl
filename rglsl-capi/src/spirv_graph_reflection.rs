use std::ffi::{CString, c_char};
use std::ptr;

use rglsl_link::spirv_reflection::{
    self, GraphEntryPoint, GraphReflection, GraphTensor, TensorType,
};

use crate::api::{
    Blob, Diagnostics, RGLSL_RESULT_INVALID_ARGUMENT, RGLSL_RESULT_OK, ResultCode, Slot, c_string,
    produce, query, required,
};
use crate::spirv_reflection::{Interface, Scalar, invalid_spirv, name, names};

#[derive(Debug)]
struct EntryNames {
    name: CString,
    inputs: Vec<Option<CString>>,
    outputs: Vec<Option<CString>>,
}

fn tensor_names(tensors: &[GraphTensor]) -> Vec<Option<CString>> {
    names(tensors.iter().map(|tensor| tensor.name.as_deref()))
}

#[derive(Debug)]
pub struct SpirvGraphReflection {
    source: GraphReflection,
    entries: Vec<EntryNames>,
    constant_names: Vec<Option<CString>>,
}

impl SpirvGraphReflection {
    fn new(source: GraphReflection) -> Self {
        Self {
            entries: source
                .entry_points
                .iter()
                .map(|entry| EntryNames {
                    name: c_string(&entry.name),
                    inputs: tensor_names(&entry.inputs),
                    outputs: tensor_names(&entry.outputs),
                })
                .collect(),
            constant_names: names(
                source
                    .constants
                    .iter()
                    .map(|constant| constant.name.as_deref()),
            ),
            source,
        }
    }

    fn entry(&self, index: usize) -> Option<(&GraphEntryPoint, &EntryNames)> {
        Some((
            self.source.entry_points.get(index)?,
            self.entries.get(index)?,
        ))
    }

    fn tensors(
        &self,
        entry: usize,
        interface: Interface,
    ) -> Option<(&[GraphTensor], &[Option<CString>])> {
        let (entry, names) = self.entry(entry)?;
        Some(if interface.is_output()? {
            (&entry.outputs, &names.outputs)
        } else {
            (&entry.inputs, &names.inputs)
        })
    }
}

pub(crate) fn reflect_graph(
    words: Option<&[u32]>,
    output: Slot<'_, SpirvGraphReflection>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(output, diagnostics, || {
        spirv_reflection::reflect_graph(required(words, "words")?)
            .map(SpirvGraphReflection::new)
            .map_err(|error| invalid_spirv(&error))
    })
}

pub(crate) fn entry_point_count(reflection: Option<&SpirvGraphReflection>) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.source.entry_points.len())
    })
}

pub(crate) fn entry_point_name(
    reflection: Option<&SpirvGraphReflection>,
    entry: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(reflection.entry(entry)?.1.name.as_ptr())
    })
}

pub(crate) fn entry_point_graph_id(
    reflection: Option<&SpirvGraphReflection>,
    entry: usize,
    graph_id: Option<&mut u32>,
) -> ResultCode {
    let Some(graph_id) = graph_id else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *graph_id = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        *graph_id = reflection.entry(entry)?.0.graph_id;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn tensor_count(
    reflection: Option<&SpirvGraphReflection>,
    entry: usize,
    interface: Interface,
) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.tensors(entry, interface)?.0.len())
    })
}

pub(crate) struct TensorSlot<'a> {
    pub(crate) set: Option<&'a mut u32>,
    pub(crate) binding: Option<&'a mut u32>,
    pub(crate) count: Option<&'a mut u32>,
    pub(crate) variable_id: Option<&'a mut u32>,
}

pub(crate) fn tensor(
    reflection: Option<&SpirvGraphReflection>,
    entry: usize,
    interface: Interface,
    index: usize,
    output: TensorSlot<'_>,
) -> ResultCode {
    let TensorSlot {
        set: Some(set),
        binding: Some(binding),
        count: Some(count),
        variable_id: Some(variable_id),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *set = 0;
    *binding = 0;
    *count = 0;
    *variable_id = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let found = reflection.tensors(entry, interface)?.0.get(index)?;
        *set = found.set;
        *binding = found.binding;
        *count = found.count;
        *variable_id = found.variable_id;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn tensor_name(
    reflection: Option<&SpirvGraphReflection>,
    entry: usize,
    interface: Interface,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(reflection.tensors(entry, interface)?.1, index))
    })
}

pub(crate) struct TensorTypeSlot<'a> {
    pub(crate) scalar: Scalar<'a>,
    pub(crate) ranked: Option<&'a mut bool>,
    pub(crate) rank: Option<&'a mut u32>,
    pub(crate) shaped: Option<&'a mut bool>,
    pub(crate) shape: Option<&'a mut *const u32>,
    pub(crate) shape_rank: Option<&'a mut usize>,
}

fn write_tensor_type(
    reflection: Option<&SpirvGraphReflection>,
    output: TensorTypeSlot<'_>,
    find: impl FnOnce(&SpirvGraphReflection) -> Option<&TensorType>,
) -> ResultCode {
    let TensorTypeSlot {
        scalar,
        ranked: Some(ranked),
        rank: Some(rank),
        shaped: Some(shaped),
        shape: Some(shape),
        shape_rank: Some(shape_rank),
    } = output
    else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    let Some(scalar) = scalar.required() else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *ranked = false;
    *rank = 0;
    *shaped = false;
    *shape = ptr::null();
    *shape_rank = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let found = find(reflection)?;
        scalar.write(found.element);
        if let Some(found) = found.rank {
            *ranked = true;
            *rank = found;
        }
        if let Some(ref found) = found.shape {
            *shaped = true;
            *shape = found.as_ptr();
            *shape_rank = found.len();
        }
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn tensor_type(
    reflection: Option<&SpirvGraphReflection>,
    entry: usize,
    interface: Interface,
    index: usize,
    output: TensorTypeSlot<'_>,
) -> ResultCode {
    write_tensor_type(reflection, output, |reflection| {
        Some(&reflection.tensors(entry, interface)?.0.get(index)?.tensor)
    })
}

pub(crate) fn constant_count(reflection: Option<&SpirvGraphReflection>) -> usize {
    query(reflection, 0, |reflection| {
        Some(reflection.source.constants.len())
    })
}

pub(crate) fn constant(
    reflection: Option<&SpirvGraphReflection>,
    index: usize,
    id: Option<&mut u32>,
    result_id: Option<&mut u32>,
) -> ResultCode {
    let (Some(id), Some(result_id)) = (id, result_id) else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *id = 0;
    *result_id = 0;
    query(reflection, RGLSL_RESULT_INVALID_ARGUMENT, |reflection| {
        let found = reflection.source.constants.get(index)?;
        *id = found.id;
        *result_id = found.result_id;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn constant_name(
    reflection: Option<&SpirvGraphReflection>,
    index: usize,
) -> *const c_char {
    query(reflection, ptr::null(), |reflection| {
        Some(name(&reflection.constant_names, index))
    })
}

pub(crate) fn constant_type(
    reflection: Option<&SpirvGraphReflection>,
    index: usize,
    output: TensorTypeSlot<'_>,
) -> ResultCode {
    write_tensor_type(reflection, output, |reflection| {
        Some(&reflection.source.constants.get(index)?.tensor)
    })
}

pub(crate) fn json(
    reflection: Option<&SpirvGraphReflection>,
    output: Slot<'_, Blob>,
) -> ResultCode {
    produce(output, None, || {
        Ok(Blob::text(
            required(reflection, "reflection")?.source.to_json(),
        ))
    })
}
