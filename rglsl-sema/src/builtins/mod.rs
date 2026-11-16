mod configuration;
pub(crate) mod footprint;
pub mod kind;
mod limits;
mod stages;
mod table;
mod tables;
mod textures;
pub mod variables;

pub use variables::{BuiltinBlock, BuiltinVariable, ConstantValue, VariableFlags, VariableKind};
pub(crate) use variables::{TENSOR_OPERAND_NONTEMPORAL, TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE};

use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::Span;

pub use configuration::Configuration;
pub use limits::ResourceLimits;
pub use stages::StageTables;
pub use table::{BuiltinFlags, BuiltinFunction};
pub(crate) use tables::Prebuilt;
pub use tables::{BuiltinTables, FreshTables};

use crate::scope::{Direction, Function, Parameter, Qualifiers, Symbol, SymbolId};
use crate::types::{Type, TypeRegistry};
use rglsl_types::{FastHashMap, FastHashSet, ShaderStage, ShaderStageMask};

const VERTEX: ShaderStageMask = ShaderStageMask::VERTEX;
const TESS_CONTROL: ShaderStageMask = ShaderStageMask::TESS_CONTROL;
const TESS_EVALUATION: ShaderStageMask = ShaderStageMask::TESS_EVALUATION;
const GEOMETRY: ShaderStageMask = ShaderStageMask::GEOMETRY;
const FRAGMENT: ShaderStageMask = ShaderStageMask::FRAGMENT;
const COMPUTE: ShaderStageMask = ShaderStageMask::COMPUTE;
const TASK: ShaderStageMask = ShaderStageMask::TASK;
const MESH: ShaderStageMask = ShaderStageMask::MESH;
const RAY_GENERATION: ShaderStageMask = ShaderStageMask::RAY_GENERATION;
const INTERSECTION: ShaderStageMask = ShaderStageMask::INTERSECTION;
const ANY_HIT: ShaderStageMask = ShaderStageMask::ANY_HIT;
const CLOSEST_HIT: ShaderStageMask = ShaderStageMask::CLOSEST_HIT;
const MISS: ShaderStageMask = ShaderStageMask::MISS;
const CALLABLE: ShaderStageMask = ShaderStageMask::CALLABLE;
const ALL_STAGES: ShaderStageMask = ShaderStageMask::all();

struct Prototype {
    name: String,
    result: Type,
    parameters: Vec<(Type, Direction)>,
    stages: ShaderStageMask,
    row: &'static BuiltinFunction,
}

struct Signature<'a>(&'a Prototype);

impl PartialEq for Signature<'_> {
    fn eq(&self, other: &Self) -> bool {
        self.0.name == other.0.name
            && self.0.parameters.len() == other.0.parameters.len()
            && self
                .0
                .parameters
                .iter()
                .zip(&other.0.parameters)
                .all(|(left, right)| left.0 == right.0)
    }
}

impl Eq for Signature<'_> {}

impl core::hash::Hash for Signature<'_> {
    fn hash<H: core::hash::Hasher>(&self, state: &mut H) {
        self.0.name.hash(state);
        self.0.parameters.len().hash(state);
        for parameter in &self.0.parameters {
            parameter.0.hash(state);
        }
    }
}

impl Prototype {
    fn function(self) -> Function {
        Function {
            name: self.name,
            return_type: self.result,
            return_qualifiers: Qualifiers::default(),
            parameters: self
                .parameters
                .into_iter()
                .map(|(ty, direction)| Parameter::new(ty, direction))
                .collect(),
            defined: true,
            span: Span::default(),
            spirv_instruction: None,
            control: crate::scope::FunctionControl::default(),
        }
    }
}

pub(crate) type Footprints = Vec<(&'static str, crate::types::StructId)>;

pub(crate) type Rows = FastHashMap<&'static str, Vec<&'static BuiltinFunction>>;

fn rows() -> Rows {
    let mut rows: Rows = FastHashMap::default();
    for family in table::FAMILIES {
        for row in *family {
            rows.entry(row.name).or_default().push(row);
        }
    }
    rows
}

fn expand(rows: &Rows, name: &str, version: u32, footprints: &Footprints) -> Vec<Prototype> {
    let mut prototypes = Vec::new();
    for row in rows.get(name).into_iter().flatten() {
        row.expand(version, footprints, &mut prototypes);
    }
    prototypes
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct BuiltinFunctionId(pub(crate) u32);

impl BuiltinFunctionId {
    pub const fn index(self) -> u32 {
        self.0
    }
}

#[derive(Debug, Clone, Default)]
pub struct BuiltinFunctions {
    functions: Vec<(Function, &'static BuiltinFunction)>,
    names: FastHashMap<String, Vec<BuiltinFunctionId>>,
}

impl BuiltinFunctions {
    pub fn resolve(&mut self, builtins: &Builtins, name: &str) {
        if self.names.contains_key(name) {
            return;
        }
        let mut ids = Vec::new();
        for overload in builtins.expand(name) {
            let Ok(index) = u32::try_from(self.functions.len()) else {
                break;
            };
            ids.push(BuiltinFunctionId(index));
            self.functions.push(overload);
        }
        self.names.insert(String::from(name), ids);
    }

    pub fn overloads(&self, name: &str) -> &[BuiltinFunctionId] {
        self.names.get(name).map_or(&[], Vec::as_slice)
    }

    pub fn function(&self, id: BuiltinFunctionId) -> Option<&Function> {
        self.functions
            .get(usize::try_from(id.0).ok()?)
            .map(|(function, _)| function)
    }

    pub fn entry(&self, id: BuiltinFunctionId) -> Option<&'static BuiltinFunction> {
        self.functions
            .get(usize::try_from(id.0).ok()?)
            .map(|&(_, entry)| entry)
    }

    pub fn kind(&self, id: BuiltinFunctionId) -> Option<kind::BuiltinKind> {
        self.entry(id).map(|entry| entry.kind)
    }

    pub fn iter(&self) -> impl Iterator<Item = &Function> {
        self.functions.iter().map(|(function, _)| function)
    }

    pub fn entries(&self) -> impl Iterator<Item = (&Function, &'static BuiltinFunction)> {
        self.functions
            .iter()
            .map(|&(ref function, entry)| (function, entry))
    }

    pub const fn len(&self) -> usize {
        self.functions.len()
    }

    pub const fn is_empty(&self) -> bool {
        self.functions.is_empty()
    }

    pub fn names(&self) -> impl Iterator<Item = &str> {
        self.names
            .iter()
            .filter(|(_, ids)| !ids.is_empty())
            .map(|(name, _)| name.as_str())
    }
}

#[derive(Debug, Clone)]
pub struct Builtins {
    version: u32,
    stage: ShaderStage,
    limits: ResourceLimits,
    rows: Rows,
    footprints: Footprints,
    types: TypeRegistry,
    table: variables::Table,
    scope_map: rglsl_types::FastHashMap<String, SymbolId>,
    work_group_size: Option<SymbolId>,
}

impl Builtins {
    pub fn new(version: u32, stage: ShaderStage, limits: &ResourceLimits) -> Self {
        let mut types = TypeRegistry::new();
        let footprints = footprint::structs(&mut types);
        let table = variables::build(version, stage, limits, &mut types);
        Self::assemble(version, stage, limits, types, table, footprints)
    }

    fn assemble(
        version: u32,
        stage: ShaderStage,
        limits: &ResourceLimits,
        types: TypeRegistry,
        mut table: variables::Table,
        footprints: Footprints,
    ) -> Self {
        for &(name, id) in &footprints {
            if table.structure(name, id).is_none() {
                break;
            }
        }
        let mut scope_map = rglsl_types::FastHashMap::with_capacity_and_hasher(
            table.scope.len(),
            Default::default(),
        );
        let mut work_group_size = None;
        for &(ref name, id) in &table.scope {
            if name == "gl_WorkGroupSize" {
                work_group_size = Some(id);
            }
            scope_map.entry(name.clone()).or_insert(id);
        }
        Self {
            version,
            stage,
            limits: *limits,
            rows: rows(),
            footprints,
            types,
            table,
            scope_map,
            work_group_size,
        }
    }

    fn expand(&self, name: &str) -> Vec<(Function, &'static BuiltinFunction)> {
        let prototypes = expand(&self.rows, name, self.version, &self.footprints);
        let kept: Vec<bool> = {
            let mut seen =
                FastHashSet::with_capacity_and_hasher(prototypes.len(), Default::default());
            prototypes
                .iter()
                .map(|prototype| {
                    prototype.stages.has(self.stage) && seen.insert(Signature(prototype))
                })
                .collect()
        };
        prototypes
            .into_iter()
            .zip(kept)
            .filter(|&(_, kept)| kept)
            .map(|(prototype, _)| {
                let row = prototype.row;
                (prototype.function(), row)
            })
            .collect()
    }

    pub fn overloads(&self, name: &str) -> Vec<Function> {
        self.expand(name)
            .into_iter()
            .map(|(function, _)| function)
            .collect()
    }

    pub fn functions(&self) -> BuiltinFunctions {
        let mut functions = BuiltinFunctions::default();
        for family in table::FAMILIES {
            for row in *family {
                functions.resolve(self, row.name);
            }
        }
        functions
    }

    pub const fn version(&self) -> u32 {
        self.version
    }

    pub const fn stage(&self) -> ShaderStage {
        self.stage
    }

    pub const fn limits(&self) -> &ResourceLimits {
        &self.limits
    }

    pub const fn types(&self) -> &TypeRegistry {
        &self.types
    }

    pub fn symbols(&self) -> &[Symbol] {
        &self.table.symbols
    }

    pub fn lookup_scope(&self, name: &str) -> Option<SymbolId> {
        self.scope_map.get(name).copied()
    }

    pub const fn work_group_size(&self) -> Option<SymbolId> {
        self.work_group_size
    }

    pub fn variables(&self) -> impl Iterator<Item = (&str, SymbolId)> {
        self.table
            .scope
            .iter()
            .map(|&(ref name, id)| (name.as_str(), id))
    }

    pub fn variable(&self, id: SymbolId) -> Option<&'static BuiltinVariable> {
        self.table
            .rows
            .get(usize::try_from(id.index()).ok()?)
            .copied()
            .flatten()
    }

    pub fn block(&self, id: crate::types::BlockId) -> Option<&'static BuiltinBlock> {
        self.table
            .blocks
            .iter()
            .find(|&&(block, _)| block == id)
            .map(|&(_, block)| block)
    }
}
