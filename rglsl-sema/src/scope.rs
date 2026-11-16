use alloc::collections::BTreeMap;
use alloc::string::String;
use alloc::sync::Arc;
use alloc::vec::Vec;
use core::ops::{Deref, DerefMut};

use arrayvec::ArrayVec;
use rglsl_types::{FastHashMap, FastHashSet};

use rglsl_ast::Span;
use rglsl_ast::ast::{InterpolationQualifier, NodeId, PrecisionQualifier};

use crate::builtins::Builtins;
use crate::constant::Constant;
pub use crate::layout_id::LayoutId;
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
    pub id: Option<LayoutId>,
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
    pub fn layout_entry(&self, id: LayoutId) -> Option<&LayoutEntry> {
        self.layout.iter().rev().find(|entry| entry.id == Some(id))
    }

    pub fn has_layout(&self, id: LayoutId) -> bool {
        self.layout_entry(id).is_some()
    }

    pub fn image_format(&self) -> Option<LayoutId> {
        self.layout
            .iter()
            .rev()
            .filter_map(|entry| entry.id)
            .find(|id| id.is_image_format())
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

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
enum BoundEntry {
    Symbol(SymbolId),
    Function,
}

#[derive(Debug, Clone, Default)]
struct Level {
    names: Vec<Arc<str>>,
    functions: FastHashMap<Arc<str>, Vec<FunctionId>>,
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
pub struct Symbols {
    base: Option<Arc<Builtins>>,
    overrides: FastHashMap<usize, Symbol>,
    added: Vec<Symbol>,
}

#[derive(Debug, Clone)]
pub struct SymbolIter<'a> {
    symbols: &'a Symbols,
    index: usize,
    end: usize,
}

impl<'a> Iterator for SymbolIter<'a> {
    type Item = &'a Symbol;

    fn next(&mut self) -> Option<Self::Item> {
        if self.index >= self.end {
            return None;
        }
        let current = self.index;
        self.index += 1;
        self.symbols.get(current)
    }

    fn size_hint(&self) -> (usize, Option<usize>) {
        let len = self.end.saturating_sub(self.index);
        (len, Some(len))
    }
}

impl ExactSizeIterator for SymbolIter<'_> {}

impl Symbols {
    pub fn with_builtins(builtins: Arc<Builtins>) -> Self {
        Self {
            base: Some(builtins),
            overrides: FastHashMap::default(),
            added: Vec::new(),
        }
    }

    pub fn reserve(&mut self, additional: usize) {
        self.added.reserve(additional);
    }

    fn base_len(&self) -> usize {
        self.base
            .as_ref()
            .map_or(0, |builtins| builtins.symbols().len())
    }

    pub fn len(&self) -> usize {
        self.base_len() + self.added.len()
    }

    pub fn is_empty(&self) -> bool {
        self.len() == 0
    }

    pub fn get(&self, index: usize) -> Option<&Symbol> {
        let base_len = self.base_len();
        if index < base_len {
            self.overrides
                .get(&index)
                .or_else(|| self.base.as_ref()?.symbols().get(index))
        } else {
            self.added.get(index - base_len)
        }
    }

    pub fn get_mut(&mut self, index: usize) -> Option<&mut Symbol> {
        let base_len = self.base_len();
        if index < base_len {
            if !self.overrides.contains_key(&index) {
                let symbol = self.base.as_ref()?.symbols().get(index)?.clone();
                self.overrides.insert(index, symbol);
            }
            self.overrides.get_mut(&index)
        } else {
            self.added.get_mut(index - base_len)
        }
    }

    pub fn push(&mut self, symbol: Symbol) {
        self.added.push(symbol);
    }

    pub fn iter(&self) -> SymbolIter<'_> {
        SymbolIter {
            symbols: self,
            index: 0,
            end: self.len(),
        }
    }

    pub fn modified_or_added(&self) -> impl Iterator<Item = &Symbol> {
        self.overrides.values().chain(self.added.iter())
    }
}

impl<'a> IntoIterator for &'a Symbols {
    type Item = &'a Symbol;
    type IntoIter = SymbolIter<'a>;

    fn into_iter(self) -> Self::IntoIter {
        self.iter()
    }
}

impl PartialEq for Symbols {
    fn eq(&self, other: &Self) -> bool {
        self.len() == other.len() && self.iter().eq(other.iter())
    }
}

impl Eq for Symbols {}

#[derive(Debug, Clone)]
enum ScopeLevels {
    Inline(ArrayVec<(usize, BoundEntry), 2>),
    Heap(Vec<(usize, BoundEntry)>),
}

impl ScopeLevels {
    fn from_single(item: (usize, BoundEntry)) -> Self {
        let mut inline = ArrayVec::new();
        inline.push(item);
        Self::Inline(inline)
    }

    fn push(&mut self, item: (usize, BoundEntry)) {
        match self {
            Self::Inline(inline) => {
                if let Err(overflow) = inline.try_push(item) {
                    let mut heap = Vec::with_capacity(4);
                    heap.extend_from_slice(inline);
                    heap.push(overflow.element());
                    *self = Self::Heap(heap);
                }
            }
            Self::Heap(heap) => heap.push(item),
        }
    }

    fn remove(&mut self, position: usize) {
        match self {
            Self::Inline(inline) => {
                inline.remove(position);
            }
            Self::Heap(heap) => {
                heap.remove(position);
            }
        }
    }
}

impl Deref for ScopeLevels {
    type Target = [(usize, BoundEntry)];

    fn deref(&self) -> &Self::Target {
        match self {
            Self::Inline(inline) => inline.as_slice(),
            Self::Heap(heap) => heap.as_slice(),
        }
    }
}

impl DerefMut for ScopeLevels {
    fn deref_mut(&mut self) -> &mut Self::Target {
        match self {
            Self::Inline(inline) => inline.as_mut_slice(),
            Self::Heap(heap) => heap.as_mut_slice(),
        }
    }
}

#[derive(Debug, Clone, Default)]
pub struct Scopes {
    builtins: Option<Arc<Builtins>>,
    removed_builtins: FastHashSet<String>,
    levels: Vec<Level>,
    bound: FastHashMap<Arc<str>, ScopeLevels>,
    precise_levels: Vec<usize>,
}

impl Scopes {
    pub fn new() -> Self {
        Self {
            builtins: None,
            removed_builtins: FastHashSet::default(),
            levels: Vec::new(),
            bound: FastHashMap::default(),
            precise_levels: Vec::new(),
        }
    }

    pub fn with_builtins(builtins: Arc<Builtins>) -> Self {
        Self {
            builtins: Some(builtins),
            removed_builtins: FastHashSet::default(),
            levels: alloc::vec![Level::default(), Level::default()],
            bound: FastHashMap::default(),
            precise_levels: Vec::new(),
        }
    }

    pub fn reserve(&mut self, additional: usize) {
        self.bound.reserve(additional);
    }

    fn builtin_symbol(&self, name: &str) -> Option<SymbolId> {
        if self.levels.is_empty() || self.removed_builtins.contains(name) {
            return None;
        }
        self.builtins.as_ref()?.lookup_scope(name)
    }

    pub fn push(&mut self) {
        self.levels.push(Level::default());
    }

    pub fn pop(&mut self) {
        let Some(level) = self.levels.pop() else {
            return;
        };
        let index = self.levels.len();
        if index == 0 {
            self.builtins = None;
            self.removed_builtins.clear();
        }
        for name in level.names {
            self.unbind(&name, index);
        }
        if self.precise_levels.last() == Some(&index) {
            self.precise_levels.pop();
        }
    }

    fn bind(&mut self, name: &str, index: usize, entry: BoundEntry) -> Option<Arc<str>> {
        match self.bound.get_mut(name) {
            Some(levels) => {
                if let Some((last_index, last_entry)) = levels.last_mut()
                    && *last_index == index
                {
                    *last_entry = entry;
                    return None;
                }
                levels.push((index, entry));
                Some(Arc::from(name))
            }
            None => {
                let shared: Arc<str> = Arc::from(name);
                self.bound.insert(
                    Arc::clone(&shared),
                    ScopeLevels::from_single((index, entry)),
                );
                Some(shared)
            }
        }
    }

    fn unbind(&mut self, name: &str, index: usize) {
        if let Some(levels) = self.bound.get_mut(name) {
            if let Some(position) = levels.iter().rposition(|&(level, _)| level == index) {
                levels.remove(position);
            }
            if levels.is_empty() {
                self.bound.remove(name);
            }
        }
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
        let Some(index) = self.levels.len().checked_sub(1) else {
            return Ok(());
        };
        if index == 0 && self.builtin_symbol(name).is_some() {
            return Err(DeclareError::Redeclaration);
        }
        if self
            .bound
            .get(name)
            .and_then(|levels| levels.last())
            .is_some_and(|&(level, _)| level == index)
        {
            return Err(DeclareError::Redeclaration);
        }
        if let Some(shared) = self.bind(name, index, BoundEntry::Symbol(id))
            && let Some(level) = self.levels.last_mut()
        {
            level.names.push(shared);
        }
        Ok(())
    }

    pub fn replace_in_current(&mut self, name: &str, id: SymbolId) {
        if self.levels.len() == 1 && self.builtin_symbol(name).is_some() {
            if let Some(shared) = self.bind(name, 0, BoundEntry::Symbol(id))
                && let Some(level) = self.levels.first_mut()
            {
                level.names.push(shared);
            }
            return;
        }
        let current = self.levels.len().saturating_sub(1);
        if let Some(levels) = self.bound.get_mut(name)
            && let Some((level, BoundEntry::Symbol(slot))) = levels.last_mut()
            && *level == current
        {
            *slot = id;
        }
    }

    pub fn remove_builtin(&mut self, name: &str) {
        if self
            .builtins
            .as_ref()
            .is_some_and(|builtins| builtins.lookup_scope(name).is_some())
        {
            self.removed_builtins.insert(String::from(name));
        }
        if let Some(levels) = self.bound.get_mut(name) {
            if let Some(position) = levels
                .iter()
                .rposition(|&(level, entry)| level == 0 && matches!(entry, BoundEntry::Symbol(_)))
            {
                levels.remove(position);
            }
            if levels.is_empty() {
                self.bound.remove(name);
            }
        }
    }

    pub fn declare_function(&mut self, name: &str, id: FunctionId) -> Result<(), DeclareError> {
        let Some(index) = self.levels.len().checked_sub(1) else {
            return Ok(());
        };
        if index == 0 && self.builtin_symbol(name).is_some() {
            return Err(DeclareError::Redeclaration);
        }
        if self
            .bound
            .get(name)
            .and_then(|levels| levels.last())
            .is_some_and(|&(level, entry)| level == index && matches!(entry, BoundEntry::Symbol(_)))
        {
            return Err(DeclareError::Redeclaration);
        }
        let added = self.bind(name, index, BoundEntry::Function);
        if let Some(level) = self.levels.last_mut() {
            match level.functions.get_mut(name) {
                Some(functions) => functions.push(id),
                None => {
                    let key = added.clone().unwrap_or_else(|| Arc::from(name));
                    level.functions.insert(key, Vec::from([id]));
                }
            }
            if let Some(shared) = added {
                level.names.push(shared);
            }
        }
        Ok(())
    }

    pub fn lookup(&self, name: &str) -> Option<Lookup<'_>> {
        if let Some(levels) = self.bound.get(name) {
            for &(index, entry) in levels.iter().rev() {
                match entry {
                    BoundEntry::Symbol(id) => return Some(Lookup::Symbol(id)),
                    BoundEntry::Function => {
                        if let Some(functions) = self
                            .levels
                            .get(index)
                            .and_then(|level| level.functions.get(name))
                        {
                            return Some(Lookup::Function(functions));
                        }
                    }
                }
            }
        }
        self.builtin_symbol(name).map(Lookup::Symbol)
    }

    pub fn lookup_in_current(&self, name: &str) -> Option<Lookup<'_>> {
        let index = self.levels.len().checked_sub(1)?;
        if let Some(&(level, entry)) = self.bound.get(name).and_then(|levels| levels.last())
            && level == index
        {
            match entry {
                BoundEntry::Symbol(id) => return Some(Lookup::Symbol(id)),
                BoundEntry::Function => {
                    if let Some(functions) = self
                        .levels
                        .get(index)
                        .and_then(|current| current.functions.get(name))
                    {
                        return Some(Lookup::Function(functions));
                    }
                }
            }
        }
        (self.levels.len() == 1)
            .then(|| self.builtin_symbol(name).map(Lookup::Symbol))
            .flatten()
    }

    pub fn lookup_level(&self, name: &str) -> Option<(usize, Lookup<'_>)> {
        if let Some(levels) = self.bound.get(name) {
            for &(index, entry) in levels.iter().rev() {
                match entry {
                    BoundEntry::Symbol(id) => return Some((index, Lookup::Symbol(id))),
                    BoundEntry::Function => {
                        if let Some(functions) = self
                            .levels
                            .get(index)
                            .and_then(|level| level.functions.get(name))
                        {
                            return Some((index, Lookup::Function(functions)));
                        }
                    }
                }
            }
        }
        self.builtin_symbol(name).map(|id| (0, Lookup::Symbol(id)))
    }

    pub fn function_levels(&self, name: &str) -> Vec<&[FunctionId]> {
        let mut found = Vec::new();
        if let Some(levels) = self.bound.get(name) {
            for &(index, entry) in levels.iter().rev() {
                if matches!(entry, BoundEntry::Symbol(_))
                    || (index == 0 && self.builtin_symbol(name).is_some())
                {
                    break;
                }
                if let Some(functions) = self
                    .levels
                    .get(index)
                    .and_then(|level| level.functions.get(name))
                {
                    found.push(functions.as_slice());
                }
            }
        }
        found
    }
}
