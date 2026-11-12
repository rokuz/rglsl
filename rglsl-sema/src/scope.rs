use alloc::collections::BTreeMap;
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::ast::{InterpolationQualifier, NodeId, PrecisionQualifier};
use rglsl_ast::Span;

use crate::constant::Constant;
use crate::spirv::{SpirvDecoration, SpirvInstruction};
use crate::types::{BlockId, StructId, Type};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Default)]
pub enum Storage {
    #[default]
    None,
    In,
    Out,
    Inout,
    Uniform,
    Buffer,
    Shared,
    ResourceHeap,
    SamplerHeap,
    RayPayload,
    RayPayloadIn,
    HitAttribute,
    CallableData,
    CallableDataIn,
    HitObjectAttributeNv,
    HitObjectAttributeExt,
    TaskPayloadShared,
    TileImage,
}

impl Storage {
    pub const fn is_ray(self) -> bool {
        matches!(
            self,
            Self::RayPayload
                | Self::RayPayloadIn
                | Self::HitAttribute
                | Self::CallableData
                | Self::CallableDataIn
                | Self::HitObjectAttributeNv
                | Self::HitObjectAttributeExt
        )
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct LayoutEntry {
    pub name: String,
    pub has_value: bool,
    pub value: Option<i64>,
    pub span: Span,
}

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Qualifiers {
    pub storage: Storage,
    pub constant: bool,
    pub specialization: bool,
    pub centroid: bool,
    pub patch: bool,
    pub sample: bool,
    pub invariant: bool,
    pub precise: bool,
    pub nonuniform: bool,
    pub readonly: bool,
    pub writeonly: bool,
    pub coherent: bool,
    pub volatile: bool,
    pub restrict: bool,
    pub device_coherent: bool,
    pub queue_family_coherent: bool,
    pub workgroup_coherent: bool,
    pub subgroup_coherent: bool,
    pub shader_call_coherent: bool,
    pub nonprivate: bool,
    pub nontemporal: bool,
    pub per_primitive: bool,
    pub per_view: bool,
    pub per_task: bool,
    pub interpolation: Option<InterpolationQualifier>,
    pub precision: Option<PrecisionQualifier>,
    pub layout: Vec<LayoutEntry>,
    pub spirv_storage_class: Option<u32>,
    pub spirv_decorations: Vec<SpirvDecoration>,
    pub spirv_by_reference: bool,
    pub spirv_literal: bool,
}

impl Qualifiers {
    pub fn layout_entry(&self, name: &str) -> Option<&LayoutEntry> {
        self.layout.iter().rev().find(|entry| entry.name == name)
    }

    pub fn has_layout(&self, name: &str) -> bool {
        self.layout_entry(name).is_some()
    }

    pub const fn has_memory_qualifier(&self) -> bool {
        self.readonly
            || self.writeonly
            || self.coherent
            || self.volatile
            || self.restrict
            || self.nontemporal
            || self.needs_vulkan_memory_model()
    }

    pub fn dropped_memory_qualifiers(&self, formal: &Self) -> impl Iterator<Item = &'static str> {
        let device = formal.device_coherent || formal.coherent;
        let queue_family = device || formal.queue_family_coherent;
        let workgroup = queue_family || formal.workgroup_coherent;
        let subgroup = workgroup || formal.subgroup_coherent;
        [
            (self.volatile && !formal.volatile, "volatile"),
            (self.coherent && !device, "coherent"),
            (self.device_coherent && !device, "devicecoherent"),
            (
                self.queue_family_coherent && !queue_family,
                "queuefamilycoherent",
            ),
            (self.workgroup_coherent && !workgroup, "workgroupcoherent"),
            (self.subgroup_coherent && !subgroup, "subgroupcoherent"),
            (self.readonly && !formal.readonly, "readonly"),
            (self.writeonly && !formal.writeonly, "writeonly"),
            (self.nontemporal && !formal.nontemporal, "nontemporal"),
        ]
        .into_iter()
        .filter_map(|(dropped, name)| dropped.then_some(name))
    }

    pub const fn only_nonprivate(&self) -> bool {
        self.nonprivate
            && !(self.readonly
                || self.writeonly
                || self.coherent
                || self.volatile
                || self.restrict
                || self.nontemporal
                || self.device_coherent
                || self.queue_family_coherent
                || self.workgroup_coherent
                || self.subgroup_coherent
                || self.shader_call_coherent)
    }

    pub const fn needs_vulkan_memory_model(&self) -> bool {
        self.coherent
            || self.volatile
            || self.device_coherent
            || self.queue_family_coherent
            || self.workgroup_coherent
            || self.subgroup_coherent
            || self.shader_call_coherent
            || self.nonprivate
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct SymbolId(pub(crate) u32);

impl SymbolId {
    pub const fn index(self) -> u32 {
        self.0
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct FunctionId(pub(crate) u32);

impl FunctionId {
    pub const fn index(self) -> u32 {
        self.0
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Origin {
    BuiltIn,
    Global,
    Parameter,
    Local,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Variable {
    pub ty: Type,
    pub qualifiers: Qualifiers,
    pub origin: Origin,
    pub value: Option<Constant>,
    pub declaration: Option<NodeId>,
}

#[derive(Debug, Clone, PartialEq)]
pub enum SymbolKind {
    Variable(Variable),
    BlockMember { instance: SymbolId, index: u32 },
    Struct(StructId),
    Reference(BlockId),
    BufferType(BlockId),
    BlockName,
}

#[derive(Debug, Clone, PartialEq)]
pub struct Symbol {
    pub name: String,
    pub span: Span,
    pub kind: SymbolKind,
}

impl Symbol {
    pub const fn variable(&self) -> Option<&Variable> {
        match &self.kind {
            SymbolKind::Variable(variable) => Some(variable),
            _ => None,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Direction {
    In,
    Out,
    Inout,
}

impl Direction {
    pub const fn is_input(self) -> bool {
        matches!(self, Self::In | Self::Inout)
    }

    pub const fn is_output(self) -> bool {
        matches!(self, Self::Out | Self::Inout)
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Parameter {
    pub name: Option<String>,
    pub ty: Type,
    pub direction: Direction,
    pub qualifiers: Qualifiers,
}

impl Parameter {
    pub fn new(ty: Type, direction: Direction) -> Self {
        Self {
            name: None,
            ty,
            direction,
            qualifiers: Qualifiers::default(),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Function {
    pub name: String,
    pub return_type: Type,
    pub return_qualifiers: Qualifiers,
    pub parameters: Vec<Parameter>,
    pub defined: bool,
    pub span: Span,
    pub spirv_instruction: Option<SpirvInstruction>,
    pub control: FunctionControl,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Hash)]
pub struct FunctionControl {
    pub inline: bool,
    pub dont_inline: bool,
}

impl FunctionControl {
    pub const fn merge(self, other: Self) -> Self {
        Self {
            inline: self.inline || other.inline,
            dont_inline: self.dont_inline || other.dont_inline,
        }
    }

    pub const fn is_incompatible(self) -> bool {
        self.inline && self.dont_inline
    }
}

impl Function {
    pub fn same_parameter_types(&self, types: &[Type]) -> bool {
        self.parameters.len() == types.len()
            && self
                .parameters
                .iter()
                .zip(types)
                .all(|(parameter, ty)| parameter.ty == *ty)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Lookup<'a> {
    Symbol(SymbolId),
    Function(&'a [FunctionId]),
}

#[derive(Debug, Clone, Default)]
struct Level {
    symbols: BTreeMap<String, SymbolId>,
    functions: BTreeMap<String, Vec<FunctionId>>,
    precisions: BTreeMap<PrecisionKey, PrecisionQualifier>,
}

#[derive(Debug, Clone, PartialEq, Eq, PartialOrd, Ord)]
pub enum PrecisionKey {
    Float,
    Int,
    Opaque(String),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum DeclareError {
    Redeclaration,
}

#[derive(Debug, Clone, Default)]
pub struct Scopes {
    levels: Vec<Level>,
    bound: BTreeMap<String, Vec<usize>>,
    precise_levels: Vec<usize>,
}

impl Scopes {
    pub const fn new() -> Self {
        Self {
            levels: Vec::new(),
            bound: BTreeMap::new(),
            precise_levels: Vec::new(),
        }
    }

    pub fn push(&mut self) {
        self.levels.push(Level::default());
    }

    pub fn pop(&mut self) {
        let Some(level) = self.levels.pop() else {
            return;
        };
        let index = self.levels.len();
        for name in level.symbols.keys().chain(
            level
                .functions
                .keys()
                .filter(|name| !level.symbols.contains_key(*name)),
        ) {
            self.unbind(name, index);
        }
        if self.precise_levels.last() == Some(&index) {
            self.precise_levels.pop();
        }
    }

    fn bind(&mut self, name: &str, index: usize) {
        let levels = self.bound.entry(String::from(name)).or_default();
        if levels.last() != Some(&index) {
            levels.push(index);
        }
    }

    fn unbind(&mut self, name: &str, index: usize) {
        if let Some(levels) = self.bound.get_mut(name) {
            if let Some(position) = levels.iter().rposition(|level| *level == index) {
                levels.remove(position);
            }
            if levels.is_empty() {
                self.bound.remove(name);
            }
        }
    }

    fn binding_levels(&self, name: &str) -> impl Iterator<Item = (usize, &Level)> {
        self.bound
            .get(name)
            .into_iter()
            .flat_map(|levels| levels.iter().rev())
            .filter_map(|&index| self.levels.get(index).map(|level| (index, level)))
    }

    pub const fn depth(&self) -> usize {
        self.levels.len()
    }

    pub fn set_default_precision(&mut self, key: PrecisionKey, precision: PrecisionQualifier) {
        let index = self.levels.len().saturating_sub(1);
        if let Some(level) = self.levels.last_mut() {
            level.precisions.insert(key, precision);
            if self.precise_levels.last() != Some(&index) {
                self.precise_levels.push(index);
            }
        }
    }

    pub fn default_precision(&self, key: &PrecisionKey) -> PrecisionQualifier {
        self.precise_levels
            .iter()
            .rev()
            .filter_map(|&index| self.levels.get(index))
            .find_map(|level| level.precisions.get(key).copied())
            .unwrap_or(PrecisionQualifier::High)
    }

    pub const fn is_global(&self) -> bool {
        self.levels.len() <= 2
    }

    pub fn declare(&mut self, name: &str, id: SymbolId) -> Result<(), DeclareError> {
        let Some(level) = self.levels.last_mut() else {
            return Ok(());
        };
        if level.symbols.contains_key(name) || level.functions.contains_key(name) {
            return Err(DeclareError::Redeclaration);
        }
        level.symbols.insert(String::from(name), id);
        let index = self.levels.len().saturating_sub(1);
        self.bind(name, index);
        Ok(())
    }

    pub fn replace_in_current(&mut self, name: &str, id: SymbolId) {
        if let Some(slot) = self
            .levels
            .last_mut()
            .and_then(|level| level.symbols.get_mut(name))
        {
            *slot = id;
        }
    }

    pub fn remove_builtin(&mut self, name: &str) {
        let unbound = match self.levels.first_mut() {
            Some(level) => {
                level.symbols.remove(name).is_some() && !level.functions.contains_key(name)
            }
            None => false,
        };
        if unbound {
            self.unbind(name, 0);
        }
    }

    pub fn declare_function(&mut self, name: &str, id: FunctionId) -> Result<(), DeclareError> {
        let Some(level) = self.levels.last_mut() else {
            return Ok(());
        };
        if level.symbols.contains_key(name) {
            return Err(DeclareError::Redeclaration);
        }
        level
            .functions
            .entry(String::from(name))
            .or_default()
            .push(id);
        let index = self.levels.len().saturating_sub(1);
        self.bind(name, index);
        Ok(())
    }

    pub fn lookup(&self, name: &str) -> Option<Lookup<'_>> {
        for (_, level) in self.binding_levels(name) {
            if let Some(id) = level.symbols.get(name) {
                return Some(Lookup::Symbol(*id));
            }
            if let Some(functions) = level.functions.get(name) {
                return Some(Lookup::Function(functions));
            }
        }
        None
    }

    pub fn lookup_in_current(&self, name: &str) -> Option<Lookup<'_>> {
        let level = self.levels.last()?;
        if let Some(id) = level.symbols.get(name) {
            return Some(Lookup::Symbol(*id));
        }
        level
            .functions
            .get(name)
            .map(|functions| Lookup::Function(functions))
    }

    pub fn lookup_level(&self, name: &str) -> Option<(usize, Lookup<'_>)> {
        for (index, level) in self.binding_levels(name) {
            if let Some(id) = level.symbols.get(name) {
                return Some((index, Lookup::Symbol(*id)));
            }
            if let Some(functions) = level.functions.get(name) {
                return Some((index, Lookup::Function(functions)));
            }
        }
        None
    }

    pub fn function_levels(&self, name: &str) -> Vec<&[FunctionId]> {
        let mut found = Vec::new();
        for (_, level) in self.binding_levels(name) {
            if level.symbols.contains_key(name) {
                break;
            }
            if let Some(functions) = level.functions.get(name) {
                found.push(functions.as_slice());
            }
        }
        found
    }
}
