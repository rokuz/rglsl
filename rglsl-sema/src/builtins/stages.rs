use alloc::collections::BTreeMap;
use alloc::format;
use alloc::string::String;
use alloc::sync::Arc;
use alloc::vec::Vec;

use super::{
    Builtins, Footprints, ResourceLimits, Rows, Signature, expand, footprint, rows, variables,
};

use crate::scope::{Function, Symbol, SymbolId, SymbolKind, Variable};
use crate::types::{Type, TypeKind, TypeRegistry};
use rglsl_types::{FastHashMap, ShaderStage, ShaderStageMask};

#[derive(Debug, Clone)]
struct StageVariables {
    builtins: Arc<Builtins>,
    descriptions: BTreeMap<String, String>,
}

#[derive(Debug, Clone)]
pub struct StageTables {
    version: u32,
    limits: ResourceLimits,
    rows: Rows,
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
    if let TypeKind::Block(id) = variable.ty.kind
        && let Some(block) = types.block(id)
    {
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

impl StageTables {
    pub fn new(version: u32, limits: &ResourceLimits) -> Self {
        let mut types = TypeRegistry::new();
        let footprints = footprint::structs(&mut types);
        let variables = ShaderStage::ALL
            .into_iter()
            .map(|stage| {
                let mut types = TypeRegistry::new();
                let _ = footprint::structs(&mut types);
                let table = variables::build(version, stage, limits, &mut types);
                let descriptions = descriptions(&table.symbols, &table.scope, &types);
                StageVariables {
                    builtins: Arc::new(Builtins::assemble(
                        version,
                        stage,
                        limits,
                        types,
                        table,
                        footprints.clone(),
                    )),
                    descriptions,
                }
            })
            .collect();
        Self {
            version,
            limits: *limits,
            rows: rows(),
            variables,
            footprints,
        }
    }

    pub fn builtins(&self, own: ShaderStage) -> Arc<Builtins> {
        self.variables.get(Self::index(own)).map_or_else(
            || {
                Arc::new(Builtins::assemble(
                    self.version,
                    own,
                    &self.limits,
                    TypeRegistry::new(),
                    variables::Table::default(),
                    self.footprints.clone(),
                ))
            },
            |variables| Arc::clone(&variables.builtins),
        )
    }

    pub const fn version(&self) -> u32 {
        self.version
    }

    pub const fn limits(&self) -> &ResourceLimits {
        &self.limits
    }

    fn index(stage: ShaderStage) -> usize {
        ShaderStage::ALL
            .iter()
            .position(|&candidate| candidate == stage)
            .unwrap_or(0)
    }

    pub fn variable(&self, stage: ShaderStage, name: &str) -> Option<&str> {
        self.variables
            .get(Self::index(stage))
            .and_then(|table| table.descriptions.get(name))
            .map(String::as_str)
    }

    pub fn entries(&self, name: &str) -> Vec<(Function, ShaderStageMask)> {
        let prototypes = expand(&self.rows, name, self.version, &self.footprints);
        let kept: Vec<ShaderStageMask> = {
            let mut remaining: FastHashMap<Signature<'_>, ShaderStageMask> =
                FastHashMap::with_capacity_and_hasher(prototypes.len(), Default::default());
            prototypes
                .iter()
                .map(|prototype| {
                    let left = remaining
                        .entry(Signature(prototype))
                        .or_insert_with(ShaderStageMask::all);
                    let kept = prototype.stages & *left;
                    *left &= !prototype.stages;
                    kept
                })
                .collect()
        };
        prototypes
            .into_iter()
            .zip(kept)
            .filter(|&(_, kept)| !kept.is_empty())
            .map(|(prototype, kept)| (prototype.function(), kept))
            .collect()
    }

    pub fn overloads(&self, stage: ShaderStage, name: &str) -> Vec<Function> {
        self.entries(name)
            .into_iter()
            .filter(|&(_, stages)| stages.has(stage))
            .map(|(function, _)| function)
            .collect()
    }

    pub fn has_functions(&self, name: &str) -> bool {
        !self.entries(name).is_empty()
    }

    pub fn declares(&self, stage: ShaderStage, name: &str) -> bool {
        self.variable(stage, name).is_some() || !self.overloads(stage, name).is_empty()
    }

    pub fn same(&self, first: ShaderStage, second: ShaderStage, name: &str) -> bool {
        if self.variable(first, name) != self.variable(second, name) {
            return false;
        }
        self.entries(name)
            .iter()
            .all(|&(_, stages)| stages.has(first) == stages.has(second))
    }

    pub fn same_stages(&self, own: ShaderStage, name: &str) -> ShaderStageMask {
        let entries = self.entries(name);
        let own_variable = self.variable(own, name);
        ShaderStage::ALL
            .into_iter()
            .filter(|&stage| {
                self.variable(stage, name) == own_variable
                    && entries
                        .iter()
                        .all(|&(_, stages)| stages.has(own) == stages.has(stage))
            })
            .collect()
    }
}
