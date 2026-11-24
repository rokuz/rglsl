use super::layout::element_chain;
use super::module::{Module, Type, Variable};
use super::{ReflectError, ScalarType};

#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub struct GraphReflection {
    pub entry_points: Vec<GraphEntryPoint>,
    pub constants: Vec<GraphConstant>,
}

impl GraphReflection {
    pub fn entry_point(&self, name: &str) -> Option<&GraphEntryPoint> {
        self.entry_points.iter().find(|entry| entry.name == name)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub struct GraphEntryPoint {
    pub name: String,
    pub graph_id: u32,
    pub inputs: Vec<GraphTensor>,
    pub outputs: Vec<GraphTensor>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub struct GraphTensor {
    pub set: u32,
    pub binding: u32,
    pub count: u32,
    pub name: Option<String>,
    pub variable_id: u32,
    pub tensor: TensorType,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub struct TensorType {
    pub element: ScalarType,
    pub rank: Option<u32>,
    pub shape: Option<Vec<u32>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[non_exhaustive]
pub struct GraphConstant {
    pub id: u32,
    pub name: Option<String>,
    pub result_id: u32,
    pub tensor: TensorType,
}

pub fn reflect_graph(words: &[u32]) -> Result<GraphReflection, ReflectError> {
    let module = Module::parse(words)?;
    if module.graph_entries.is_empty() {
        return Err(ReflectError::NoGraphEntryPoint);
    }
    let mut entry_points = Vec::with_capacity(module.graph_entries.len());
    for entry in &module.graph_entries {
        let invalid = ReflectError::GraphEntryPoint { graph: entry.graph };
        let inputs = module
            .graph_inputs(entry.graph)
            .and_then(|inputs| usize::try_from(inputs).ok())
            .ok_or(invalid)?;
        let (inputs, outputs) = entry.interface.split_at_checked(inputs).ok_or(invalid)?;
        entry_points.push(GraphEntryPoint {
            name: entry.name.clone(),
            graph_id: entry.graph,
            inputs: interface(&module, inputs)?,
            outputs: interface(&module, outputs)?,
        });
    }
    let mut constants = Vec::with_capacity(module.graph_constants.len());
    for constant in &module.graph_constants {
        constants.push(GraphConstant {
            id: constant.constant_id,
            name: module.name(constant.id),
            result_id: constant.id,
            tensor: tensor_type(&module, constant.ty)?,
        });
    }
    constants.sort_by_key(|constant| (constant.id, constant.result_id));
    Ok(GraphReflection {
        entry_points,
        constants,
    })
}

fn interface(module: &Module, variables: &[u32]) -> Result<Vec<GraphTensor>, ReflectError> {
    variables
        .iter()
        .map(|&id| {
            let invalid = ReflectError::GraphInterface { variable: id };
            let variable = module
                .variables
                .iter()
                .find(|variable| variable.id == id)
                .ok_or(invalid)?;
            graph_tensor(module, variable)
        })
        .collect()
}

fn graph_tensor(module: &Module, variable: &Variable) -> Result<GraphTensor, ReflectError> {
    let invalid = ReflectError::GraphInterface {
        variable: variable.id,
    };
    let decorations = module.decorations(variable.id);
    let (Some(set), Some(binding)) = (decorations.set, decorations.binding) else {
        return Err(invalid);
    };
    let ty = module.pointee(variable)?.ok_or(invalid)?;
    let (element, lengths) = element_chain(module, ty)?;
    if !matches!(*module.ty(element)?, Type::Tensor { .. }) {
        return Err(invalid);
    }
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
    Ok(GraphTensor {
        set,
        binding,
        count,
        name: module.name(variable.id),
        variable_id: variable.id,
        tensor: tensor_type(module, element)?,
    })
}

fn tensor_type(module: &Module, id: u32) -> Result<TensorType, ReflectError> {
    let invalid = ReflectError::TensorType(id);
    let Type::Tensor {
        element,
        rank,
        shape,
    } = *module.ty(id)?
    else {
        return Err(invalid);
    };
    let element = module.scalar_type(element).ok_or(invalid)?;
    let rank = rank
        .map(|rank| module.constant_u32(rank).ok_or(invalid))
        .transpose()?;
    let shape = shape
        .map(|shape| {
            module
                .composite(shape)
                .ok_or(invalid)?
                .iter()
                .map(|&dimension| module.constant_u32(dimension).ok_or(invalid))
                .collect::<Result<Vec<_>, _>>()
        })
        .transpose()?;
    Ok(TensorType {
        element,
        rank,
        shape,
    })
}
