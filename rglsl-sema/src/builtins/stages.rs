use alloc::collections::BTreeMap;
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

use super::{
    available, expand_prototypes, footprint, variables, BuiltinFunctionId, Builtins, Footprints,
    ResourceLimits, Stage,
};
use crate::scope::{Function, Symbol, SymbolId, SymbolKind, Variable};
use crate::types::{Type, TypeKind, TypeRegistry};

pub const ALL_STAGE_BITS: u16 = rglsl_types::probe::ALL_STAGES;

impl Stage {
    pub fn bit(self) -> u16 {
        Self::ALL
            .iter()
            .position(|&candidate| candidate == self)
            .map_or(0, |index| 1 << index)
    }
}

#[derive(Debug, Clone)]
struct StageVariables {
    symbols: Vec<Symbol>,
    scope: Vec<(String, SymbolId)>,
    types: TypeRegistry,
    descriptions: BTreeMap<String, String>,
}

#[derive(Debug, Clone)]
pub struct StageTables {
    version: u32,
    limits: ResourceLimits,
    functions: Vec<(Function, u16)>,
    names: BTreeMap<String, Vec<usize>>,
    variables: Vec<StageVariables>,
    footprints: Footprints,
}

fn describe_variable(types: &TypeRegistry, variable: &Variable) -> String {
    let qualifiers = crate::scope::Qualifiers {
        interpolation: None,
        ..variable.qualifiers.clone()
    };
    let mut text = format!(
        "{} {:?} {:?} {:?}",
        variable.ty.display(types),
        qualifiers,
        variable.origin,
        variable.value
    );
    if let TypeKind::Block(id) = variable.ty.kind {
        if let Some(block) = types.block(id) {
            text.push_str(&format!(
                " {} {:?} {:?} {:?} {}",
                block.name, block.storage, block.qualifiers, block.reference, block.buffer_type
            ));
            for member in &block.members {
                text.push_str(&format!(
                    " {} {} {:?}",
                    member.name,
                    member.ty.display(types),
                    member.qualifiers
                ));
            }
        }
    }
    text
}

fn describe(symbols: &[Symbol], types: &TypeRegistry, id: SymbolId) -> String {
    let Some(symbol) = usize::try_from(id.index())
        .ok()
        .and_then(|index| symbols.get(index))
    else {
        return String::new();
    };
    match symbol.kind {
        SymbolKind::Variable(ref variable) => describe_variable(types, variable),
        SymbolKind::BlockMember { instance, index } => {
            let instance = usize::try_from(instance.index())
                .ok()
                .and_then(|instance| symbols.get(instance));
            match instance {
                Some(instance) => format!(
                    "member {index} of {} {}",
                    instance.name,
                    instance
                        .variable()
                        .map(|variable| describe_variable(types, variable))
                        .unwrap_or_default()
                ),
                None => format!("member {index}"),
            }
        }
        SymbolKind::Struct(id) => format!("struct {}", Type::structure(id).display(types)),
        ref other => format!("{other:?}"),
    }
}

fn descriptions(
    symbols: &[Symbol],
    scope: &[(String, SymbolId)],
    types: &TypeRegistry,
) -> BTreeMap<String, String> {
    scope
        .iter()
        .map(|&(ref name, id)| (name.clone(), describe(symbols, types, id)))
        .collect()
}

fn stage_bits(stages: u16) -> u16 {
    Stage::ALL
        .into_iter()
        .filter(|&stage| available(stages, stage))
        .fold(0, |bits, stage| bits | stage.bit())
}

impl StageTables {
    pub fn new(version: u32, limits: &ResourceLimits) -> Self {
        let (prototypes, _, footprints) = expand_prototypes(version);
        let mut remaining: BTreeMap<(String, Vec<Type>), u16> = BTreeMap::new();
        let mut functions: Vec<(Function, u16)> = Vec::new();
        let mut names: BTreeMap<String, Vec<usize>> = BTreeMap::new();
        for prototype in prototypes {
            let bits = stage_bits(prototype.stages);
            let parameters: Vec<Type> = prototype
                .parameters
                .iter()
                .map(|(ty, _)| ty.clone())
                .collect();
            let left = remaining
                .entry((prototype.name.clone(), parameters))
                .or_insert(ALL_STAGE_BITS);
            let kept = bits & *left;
            *left &= !bits;
            if kept == 0 {
                continue;
            }
            names
                .entry(prototype.name.clone())
                .or_default()
                .push(functions.len());
            functions.push((prototype.function(), kept));
        }
        let variables = Stage::ALL
            .into_iter()
            .map(|stage| {
                let mut types = TypeRegistry::new();
                let _ = footprint::structs(&mut types);
                let (symbols, scope) = variables::build(version, stage, limits, &mut types);
                let descriptions = descriptions(&symbols, &scope, &types);
                StageVariables {
                    symbols,
                    scope,
                    types,
                    descriptions,
                }
            })
            .collect();
        Self {
            version,
            limits: *limits,
            functions,
            names,
            variables,
            footprints,
        }
    }

    pub fn builtins(&self, own: Stage) -> Builtins {
        let bit = own.bit();
        let mut functions = Vec::new();
        let mut names: BTreeMap<String, Vec<BuiltinFunctionId>> = BTreeMap::new();
        for &(ref function, stages) in &self.functions {
            if stages & bit == 0 {
                continue;
            }
            let Ok(index) = u32::try_from(functions.len()) else {
                break;
            };
            names
                .entry(function.name.clone())
                .or_default()
                .push(BuiltinFunctionId(index));
            functions.push(function.clone());
        }
        let (symbols, scope, types) = self
            .variables
            .get(Self::index(own))
            .map(|table| {
                (
                    table.symbols.clone(),
                    table.scope.clone(),
                    table.types.clone(),
                )
            })
            .unwrap_or_default();
        Builtins::assemble(
            self.version,
            own,
            &self.limits,
            functions,
            names,
            types,
            (symbols, scope),
            self.footprints.clone(),
        )
    }

    pub const fn version(&self) -> u32 {
        self.version
    }

    fn index(stage: Stage) -> usize {
        Stage::ALL
            .iter()
            .position(|&candidate| candidate == stage)
            .unwrap_or(0)
    }

    pub fn variable(&self, stage: Stage, name: &str) -> Option<&str> {
        self.variables
            .get(Self::index(stage))
            .and_then(|table| table.descriptions.get(name))
            .map(String::as_str)
    }

    fn entries(&self, name: &str) -> impl Iterator<Item = (usize, &Function, u16)> {
        self.names
            .get(name)
            .into_iter()
            .flatten()
            .filter_map(|&index| {
                self.functions
                    .get(index)
                    .map(|&(ref function, stages)| (index, function, stages))
            })
    }

    pub fn overloads(&self, stage: Stage, name: &str) -> Vec<&Function> {
        let bit = stage.bit();
        self.entries(name)
            .filter(|&(_, _, stages)| stages & bit != 0)
            .map(|(_, function, _)| function)
            .collect()
    }

    pub fn overload_indices(&self, stage: Stage, name: &str) -> Vec<usize> {
        let bit = stage.bit();
        self.entries(name)
            .filter(|&(_, _, stages)| stages & bit != 0)
            .map(|(index, _, _)| index)
            .collect()
    }

    pub fn has_functions(&self, name: &str) -> bool {
        self.names.contains_key(name)
    }

    pub fn declares(&self, stage: Stage, name: &str) -> bool {
        self.variable(stage, name).is_some() || !self.overloads(stage, name).is_empty()
    }

    pub fn same(&self, first: Stage, second: Stage, name: &str) -> bool {
        if self.variable(first, name) != self.variable(second, name) {
            return false;
        }
        let (first, second) = (first.bit(), second.bit());
        self.entries(name)
            .all(|(_, _, stages)| (stages & first != 0) == (stages & second != 0))
    }

    pub fn same_stages(&self, own: Stage, name: &str) -> u16 {
        Stage::ALL
            .into_iter()
            .filter(|&stage| self.same(own, stage, name))
            .fold(0, |bits, stage| bits | stage.bit())
    }
}
