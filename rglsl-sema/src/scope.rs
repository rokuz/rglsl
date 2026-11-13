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
    pub value: LayoutValue,
    pub span: Span,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum LayoutValue {
    Flag,
    Constant(i64),
    Invalid,
}

impl LayoutValue {
    pub const fn constant(self) -> Option<i64> {
        match self {
            Self::Constant(value) => Some(value),
            Self::Flag | Self::Invalid => None,
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum PerVertex {
    Nv,
    Ext,
}

bitflags::bitflags! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash, Default)]
    pub struct QualifierFlags: u32 {
        const CONSTANT = 1 << 0;
        const SPECIALIZATION = 1 << 1;
        const CENTROID = 1 << 2;
        const PATCH = 1 << 3;
        const SAMPLE = 1 << 4;
        const INVARIANT = 1 << 5;
        const PRECISE = 1 << 6;
        const NONUNIFORM = 1 << 7;
        const READONLY = 1 << 8;
        const WRITEONLY = 1 << 9;
        const COHERENT = 1 << 10;
        const VOLATILE = 1 << 11;
        const RESTRICT = 1 << 12;
        const DEVICE_COHERENT = 1 << 13;
        const QUEUE_FAMILY_COHERENT = 1 << 14;
        const WORKGROUP_COHERENT = 1 << 15;
        const SUBGROUP_COHERENT = 1 << 16;
        const SHADER_CALL_COHERENT = 1 << 17;
        const NONPRIVATE = 1 << 18;
        const NONTEMPORAL = 1 << 19;
        const PER_PRIMITIVE = 1 << 20;
        const PER_VIEW = 1 << 21;
        const PER_TASK = 1 << 22;
        const SPIRV_BY_REFERENCE = 1 << 23;
        const SPIRV_LITERAL = 1 << 24;
    }
}

impl QualifierFlags {
    pub const AUXILIARY: Self = Self::CENTROID.union(Self::PATCH).union(Self::SAMPLE);
    pub const SCOPED_COHERENT: Self = Self::DEVICE_COHERENT
        .union(Self::QUEUE_FAMILY_COHERENT)
        .union(Self::WORKGROUP_COHERENT)
        .union(Self::SUBGROUP_COHERENT)
        .union(Self::SHADER_CALL_COHERENT);
    pub const VULKAN_MEMORY_MODEL: Self = Self::COHERENT
        .union(Self::VOLATILE)
        .union(Self::SCOPED_COHERENT)
        .union(Self::NONPRIVATE);
    pub const MEMORY: Self = Self::READONLY
        .union(Self::WRITEONLY)
        .union(Self::COHERENT)
        .union(Self::VOLATILE)
        .union(Self::RESTRICT)
        .union(Self::NONTEMPORAL);
    pub const MEMBER_INHERITED: Self = Self::MEMORY
        .union(Self::SCOPED_COHERENT)
        .union(Self::NONPRIVATE)
        .union(Self::PER_PRIMITIVE)
        .union(Self::PER_VIEW)
        .union(Self::PER_TASK);
}

#[derive(Debug, Clone, PartialEq, Eq, Default)]
pub struct Qualifiers {
    pub storage: Storage,
    pub flags: QualifierFlags,
    pub per_vertex: Option<PerVertex>,
    pub interpolation: Option<InterpolationQualifier>,
    pub precision: Option<PrecisionQualifier>,
    pub layout: Vec<LayoutEntry>,
    pub spirv_storage_class: Option<u32>,
    pub spirv_decorations: Vec<SpirvDecoration>,
}

impl Qualifiers {
    pub fn layout_entry(&self, name: &str) -> Option<&LayoutEntry> {
        self.layout.iter().rev().find(|entry| entry.name == name)
    }

    pub fn has_layout(&self, name: &str) -> bool {
        self.layout_entry(name).is_some()
    }

    pub const fn has(&self, flags: QualifierFlags) -> bool {
        self.flags.contains(flags)
    }

    pub const fn has_memory_qualifier(&self) -> bool {
        self.flags.intersects(QualifierFlags::MEMORY) || self.needs_vulkan_memory_model()
    }

    pub fn dropped_memory_qualifiers(&self, formal: &Self) -> impl Iterator<Item = &'static str> {
        let own = self.flags;
        let formal = formal.flags;
        let device =
            formal.intersects(QualifierFlags::DEVICE_COHERENT.union(QualifierFlags::COHERENT));
        let queue_family = device || formal.contains(QualifierFlags::QUEUE_FAMILY_COHERENT);
        let workgroup = queue_family || formal.contains(QualifierFlags::WORKGROUP_COHERENT);
        let subgroup = workgroup || formal.contains(QualifierFlags::SUBGROUP_COHERENT);
        let dropped = |flag: QualifierFlags| own.contains(flag) && !formal.contains(flag);
        [
            (dropped(QualifierFlags::VOLATILE), "volatile"),
            (
                own.contains(QualifierFlags::COHERENT) && !device,
                "coherent",
            ),
            (
                own.contains(QualifierFlags::DEVICE_COHERENT) && !device,
                "devicecoherent",
            ),
            (
                own.contains(QualifierFlags::QUEUE_FAMILY_COHERENT) && !queue_family,
                "queuefamilycoherent",
            ),
            (
                own.contains(QualifierFlags::WORKGROUP_COHERENT) && !workgroup,
                "workgroupcoherent",
            ),
            (
                own.contains(QualifierFlags::SUBGROUP_COHERENT) && !subgroup,
                "subgroupcoherent",
            ),
            (dropped(QualifierFlags::READONLY), "readonly"),
            (dropped(QualifierFlags::WRITEONLY), "writeonly"),
            (dropped(QualifierFlags::NONTEMPORAL), "nontemporal"),
        ]
        .into_iter()
        .filter_map(|(dropped, name)| dropped.then_some(name))
    }

    pub const fn only_nonprivate(&self) -> bool {
        self.flags.contains(QualifierFlags::NONPRIVATE)
            && !self
                .flags
                .intersects(QualifierFlags::MEMORY.union(QualifierFlags::SCOPED_COHERENT))
    }

    pub const fn needs_vulkan_memory_model(&self) -> bool {
        self.flags.intersects(QualifierFlags::VULKAN_MEMORY_MODEL)
    }
}

index_id!(SymbolId);

impl SymbolId {
    pub(crate) const fn saturating(index: u32) -> Self {
        match Self::new(index) {
            Some(id) => id,
            None => Self(core::num::NonZeroU32::MAX),
        }
    }
}

index_id!(FunctionId);

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
pub enum FunctionControl {
    #[default]
    None,
    Inline,
    DontInline,
    Incompatible,
}

impl FunctionControl {
    pub const fn merge(self, other: Self) -> Self {
        match (self, other) {
            (Self::None, control) | (control, Self::None) => control,
            (Self::Inline, Self::Inline) => Self::Inline,
            (Self::DontInline, Self::DontInline) => Self::DontInline,
            _ => Self::Incompatible,
        }
    }

    pub const fn is_incompatible(self) -> bool {
        matches!(self, Self::Incompatible)
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
    Opaque(rglsl_ast::opaque::OpaqueKeyword),
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
