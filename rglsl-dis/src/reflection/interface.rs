use std::collections::{BTreeMap, BTreeSet};

use rglsl_types::ShaderStage;
use rglsl_types::stack::recurse;
use spirv::StorageClass;

use super::layout::element_chain;
use super::module::{EntryPoint, Module, Type, Variable};
use super::{Format, InterfaceVariable, ReflectError};

#[derive(Debug)]
struct Pending {
    ty: u32,
    location: Option<u32>,
    component: u32,
    name: Option<String>,
    array: Vec<u32>,
}

#[derive(Debug)]
struct Locations<'m> {
    module: &'m Module,
    known: BTreeMap<u32, u32>,
    active: BTreeSet<u32>,
}

impl<'m> Locations<'m> {
    const fn new(module: &'m Module) -> Self {
        Self {
            module,
            known: BTreeMap::new(),
            active: BTreeSet::new(),
        }
    }

    fn count(&mut self, id: u32) -> Result<u32, ReflectError> {
        if let Some(&count) = self.known.get(&id) {
            return Ok(count);
        }
        if !self.active.insert(id) {
            return Err(ReflectError::CyclicType(id));
        }
        let count = recurse(|| self.compute(id));
        self.active.remove(&id);
        let count = count?;
        self.known.insert(id, count);
        Ok(count)
    }

    fn compute(&mut self, id: u32) -> Result<u32, ReflectError> {
        let module = self.module;
        let overflow = || ReflectError::Overflow(id);
        match *module.ty(id)? {
            Type::Bool | Type::Int { .. } | Type::Float { .. } => Ok(1),
            Type::Vector { component, count } => {
                let wide = module
                    .scalar_type(component)
                    .is_some_and(|scalar| scalar.width > 32);
                Ok(if wide && count > 2 { 2 } else { 1 })
            }
            Type::Matrix { column, columns } => self
                .count(column)?
                .checked_mul(columns)
                .ok_or_else(overflow),
            Type::Array { element, length } => self
                .count(element)?
                .checked_mul(module.array_length(id, length)?)
                .ok_or_else(overflow),
            Type::Struct { ref members } => {
                let mut total = 0_u32;
                for &member in members {
                    total = total
                        .checked_add(self.count(member)?)
                        .ok_or_else(overflow)?;
                }
                Ok(total)
            }
            _ => Err(ReflectError::InterfaceType(id)),
        }
    }
}

const fn arrayed(stage: ShaderStage, input: bool, patch: bool, per_vertex: bool) -> bool {
    match stage {
        ShaderStage::TessControl => !patch,
        ShaderStage::TessEvaluation => input && !patch,
        ShaderStage::Geometry => input,
        ShaderStage::Mesh => !input,
        ShaderStage::Fragment => input && per_vertex,
        _ => false,
    }
}

pub(super) fn collect(
    module: &Module,
    entry: &EntryPoint,
) -> Result<(Vec<InterfaceVariable>, Vec<InterfaceVariable>), ReflectError> {
    let mut inputs = Vec::new();
    let mut outputs = Vec::new();
    let mut locations = Locations::new(module);
    for variable in &module.variables {
        let input = variable.class == StorageClass::Input as u32;
        if !input && variable.class != StorageClass::Output as u32 {
            continue;
        }
        let list = if input { &mut inputs } else { &mut outputs };
        flatten(module, entry, variable, input, &mut locations, list)?;
    }
    for list in [&mut inputs, &mut outputs] {
        list.sort_by_key(|variable| (variable.location, variable.component, variable.variable_id));
    }
    Ok((inputs, outputs))
}

fn patch(module: &Module, variable: u32, ty: u32) -> Result<bool, ReflectError> {
    if module.decorations(variable).patch {
        return Ok(true);
    }
    let (element, _) = element_chain(module, ty)?;
    Ok(match *module.ty(element)? {
        Type::Struct { ref members } => (0..members.len())
            .filter_map(|index| u32::try_from(index).ok())
            .any(|index| module.member_decorations(element, index).patch),
        _ => false,
    })
}

fn joined(prefix: Option<&str>, name: Option<String>) -> Option<String> {
    match (prefix, name) {
        (Some(prefix), Some(name)) => Some(format!("{prefix}.{name}")),
        (None, name) => name,
        (Some(_), None) => None,
    }
}

fn flatten(
    module: &Module,
    entry: &EntryPoint,
    variable: &Variable,
    input: bool,
    locations: &mut Locations<'_>,
    list: &mut Vec<InterfaceVariable>,
) -> Result<(), ReflectError> {
    let decorations = module.decorations(variable.id);
    if decorations.built_in.is_some() {
        return Ok(());
    }
    let ty = module.pointee(variable)?.ok_or(ReflectError::NotAPointer {
        variable: variable.id,
    })?;
    let per_vertex = arrayed(
        entry.stage,
        input,
        patch(module, variable.id, ty)?,
        decorations.per_vertex,
    );
    let (ty, array) = match *module.ty(ty)? {
        Type::Array { element, length } if per_vertex => {
            (element, vec![module.array_length(ty, length)?])
        }
        Type::RuntimeArray { element } if per_vertex => (element, vec![0]),
        _ => (ty, Vec::new()),
    };
    let mut pending = vec![Pending {
        ty,
        location: decorations.location,
        component: decorations.component.unwrap_or(0),
        name: module.name(variable.id),
        array,
    }];
    while let Some(item) = pending.pop() {
        let (element, lengths) = element_chain(module, item.ty)?;
        let mut array = item.array;
        array.extend(lengths.into_iter().map(|length| length.unwrap_or(0)));
        let Type::Struct { ref members } = *module.ty(element)? else {
            let location = item.location.ok_or(ReflectError::MissingLocation {
                variable: variable.id,
            })?;
            list.push(InterfaceVariable {
                location,
                component: item.component,
                name: item.name,
                variable_id: variable.id,
                format: format(module, element, array)?,
            });
            continue;
        };
        let mut running = item.location;
        let mut expanded = Vec::with_capacity(members.len());
        for (index, &member) in members.iter().enumerate() {
            let index = u32::try_from(index).map_err(|_| ReflectError::Overflow(element))?;
            let member_decorations = module.member_decorations(element, index);
            if member_decorations.built_in.is_some() {
                continue;
            }
            let location = member_decorations.location.or(running);
            let consumed = locations.count(member)?;
            running = location
                .map(|location| {
                    location
                        .checked_add(consumed)
                        .ok_or(ReflectError::Overflow(element))
                })
                .transpose()?;
            expanded.push(Pending {
                ty: member,
                location,
                component: member_decorations.component.unwrap_or(0),
                name: joined(item.name.as_deref(), module.member_name(element, index)),
                array: array.clone(),
            });
        }
        pending.extend(expanded.into_iter().rev());
    }
    Ok(())
}

fn format(module: &Module, element: u32, array: Vec<u32>) -> Result<Format, ReflectError> {
    let invalid = || ReflectError::InterfaceType(element);
    let (scalar, vector_size, columns) = match *module.ty(element)? {
        Type::Bool | Type::Int { .. } | Type::Float { .. } => {
            (module.scalar_type(element).ok_or_else(invalid)?, 1, 1)
        }
        Type::Vector { component, count } => {
            (module.scalar_type(component).ok_or_else(invalid)?, count, 1)
        }
        Type::Matrix { column, columns } => match *module.ty(column)? {
            Type::Vector { component, count } => (
                module.scalar_type(component).ok_or_else(invalid)?,
                count,
                columns,
            ),
            _ => return Err(invalid()),
        },
        _ => return Err(invalid()),
    };
    Ok(Format {
        scalar,
        vector_size,
        columns,
        array,
    })
}
