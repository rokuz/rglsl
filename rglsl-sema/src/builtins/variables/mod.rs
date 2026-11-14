macro_rules! dimension {
    () => {
        None
    };
    ($size:literal) => {
        Some($size)
    };
}

macro_rules! variable_flags {
    ($($flag:ident),* $(,)?) => {
        $crate::builtins::variables::VariableFlags::empty()
            $(.union($crate::builtins::variables::VariableFlags::$flag))*
    };
}

macro_rules! variables {
    (defaults: $defaults:expr; $(
        $name:literal: $kind:expr => $word:ident $([$($size:literal)?])*
        $({ $($field:ident: $value:expr),* $(,)? })?
    )*) => {
        &[$(
            $crate::builtins::variables::BuiltinVariable {
                name: $name,
                kind: $kind,
                ty: $crate::builtins::table::words::$word,
                dimensions: &[$(dimension!($($size)?)),*],
                $($($field: $value,)*)?
                ..$defaults
            }
        ),*]
    };
    ($($rows:tt)*) => {
        variables!(defaults: $crate::builtins::variables::BuiltinVariable::DEFAULT; $($rows)*)
    };
}

mod blocks;
mod constants;
mod ray;
mod stage;

use alloc::string::String;
use alloc::vec::Vec;

use rglsl_ast::Span;
use rglsl_ast::ast::{InterpolationQualifier, PrecisionQualifier};
use rglsl_types::builtin::BuiltIn;
use rglsl_types::extension::Extension;
use rglsl_types::{ShaderStage, ShaderStageMask};

use super::ResourceLimits;
use super::table::Word;
use crate::constant::{Constant, Value};
use crate::scope::{Origin, QualifierFlags, Qualifiers, Storage, Symbol, SymbolId, SymbolKind};
use crate::types::{
    ArraySize, BlockId, BlockStorage, BlockType, Member, Scalar, Type, TypeRegistry,
};

pub(crate) use constants::{TENSOR_OPERAND_NONTEMPORAL, TENSOR_OPERAND_OUT_OF_BOUNDS_VALUE};

bitflags::bitflags! {
    #[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
    pub struct VariableFlags: u8 {
        const PATCH = 1;
        const PER_PRIMITIVE = 1 << 1;
        const PER_VIEW = 1 << 2;
        const RAY_VOLATILE = 1 << 3;
        const TRANSPOSED = 1 << 4;
        const GATE = 1 << 5;
        const IMPLICITLY_SIZED = 1 << 6;
    }
}

#[derive(Debug, Clone, Copy)]
pub enum ConstantValue {
    Int(i32),
    Uint(u32),
    Bool(bool),
    Limit(fn(&ResourceLimits) -> i32),
    Limits(fn(&ResourceLimits) -> [i32; 3]),
    LocalSize,
}

#[derive(Debug, Clone, Copy)]
pub struct ArrayLimit {
    pub feature: &'static str,
    pub limit: &'static str,
    pub value: fn(&ResourceLimits) -> i32,
    pub dimension: usize,
    pub declared: bool,
    pub indexed: bool,
}

pub(crate) const CLIP_DISTANCES: ArrayLimit = ArrayLimit {
    feature: "gl_ClipDistance array size",
    limit: "gl_MaxClipDistances",
    value: |limits| limits.max_clip_distances,
    dimension: 0,
    declared: true,
    indexed: true,
};
pub(crate) const CULL_DISTANCES: ArrayLimit = ArrayLimit {
    feature: "gl_CullDistance array size",
    limit: "gl_MaxCullDistances",
    value: |limits| limits.max_cull_distances,
    dimension: 0,
    declared: true,
    indexed: true,
};
pub(crate) const CLIP_DISTANCES_PER_VIEW: ArrayLimit = ArrayLimit {
    feature: "gl_ClipDistancePerViewNV array size",
    dimension: 1,
    indexed: false,
    ..CLIP_DISTANCES
};
pub(crate) const CULL_DISTANCES_PER_VIEW: ArrayLimit = ArrayLimit {
    feature: "gl_CullDistancePerViewNV array size",
    dimension: 1,
    indexed: false,
    ..CULL_DISTANCES
};
pub(crate) const SAMPLE_MASK_WORDS: ArrayLimit = ArrayLimit {
    feature: "gl_SampleMask array size",
    limit: "gl_MaxSamples",
    value: |limits| limits.max_samples.saturating_add(31) / 32,
    dimension: 0,
    declared: false,
    indexed: true,
};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Redeclaration {
    Interpolant,
    FragmentOutput,
    FragmentCoordinate,
    OverrideCoverage,
    ViewportRelative,
    Output,
    Free,
}

#[derive(Debug, Clone, Copy)]
pub enum VariableKind {
    Input(BuiltIn),
    Output(BuiltIn),
    Member(BuiltIn),
    Constant(ConstantValue),
}

#[derive(Debug, Clone, Copy)]
pub struct BuiltinVariable {
    pub name: &'static str,
    pub kind: VariableKind,
    pub requires_one_of: &'static [Extension],
    pub shared: Option<&'static str>,
    pub named: Option<&'static str>,
    pub flags: VariableFlags,
    pub redeclaration: Option<Redeclaration>,
    pub array_limit: Option<ArrayLimit>,
    pub(crate) ty: Word,
    pub(crate) dimensions: &'static [Option<u32>],
    pub(crate) precision: Option<PrecisionQualifier>,
    pub(crate) stages: ShaderStageMask,
    pub(crate) since: u32,
}

const RAY_VOLATILE_STAGES: ShaderStageMask = super::RAY_GENERATION
    .union(super::INTERSECTION)
    .union(super::CLOSEST_HIT)
    .union(super::MISS)
    .union(super::CALLABLE);

impl BuiltinVariable {
    pub(crate) const DEFAULT: Self = Self {
        name: "",
        kind: VariableKind::Constant(ConstantValue::Int(0)),
        requires_one_of: &[],
        shared: None,
        named: None,
        flags: VariableFlags::empty(),
        redeclaration: None,
        array_limit: None,
        ty: Word::Fixed(crate::types::TypeKind::Void),
        dimensions: &[],
        precision: None,
        stages: super::ALL_STAGES,
        since: 450,
    };

    pub const fn builtin(&self) -> Option<BuiltIn> {
        match self.kind {
            VariableKind::Input(builtin)
            | VariableKind::Output(builtin)
            | VariableKind::Member(builtin) => Some(builtin),
            VariableKind::Constant(_) => None,
        }
    }

    pub const fn has(&self, flags: VariableFlags) -> bool {
        self.flags.contains(flags)
    }

    pub fn global_key(&self) -> &'static str {
        self.shared.unwrap_or(self.name)
    }

    pub fn global_name(&self) -> &'static str {
        self.named.unwrap_or(self.name)
    }

    pub(crate) const fn declared_in(&self, version: u32, stage: ShaderStage) -> bool {
        version >= self.since && self.stages.has(stage)
    }

    fn ty(&self) -> Option<Type> {
        let Word::Fixed(kind) = self.ty else {
            return None;
        };
        let dimensions: Vec<ArraySize> = self
            .dimensions
            .iter()
            .map(|size| size.map_or(ArraySize::Unsized, ArraySize::Sized))
            .collect();
        Some(Type::new(kind).with_dimensions(&dimensions))
    }

    fn qualifiers(&self, stage: ShaderStage, ty: &Type) -> Qualifiers {
        let mut flags = QualifierFlags::empty();
        for (flag, qualifier) in [
            (VariableFlags::PATCH, QualifierFlags::PATCH),
            (VariableFlags::PER_PRIMITIVE, QualifierFlags::PER_PRIMITIVE),
            (VariableFlags::PER_VIEW, QualifierFlags::PER_VIEW),
        ] {
            if self.has(flag) {
                flags |= qualifier;
            }
        }
        if self.has(VariableFlags::RAY_VOLATILE) && RAY_VOLATILE_STAGES.has(stage) {
            flags |= QualifierFlags::VOLATILE;
        }
        let storage = match self.kind {
            VariableKind::Input(_) => Storage::In,
            VariableKind::Output(_) => Storage::Out,
            VariableKind::Member(_) => Storage::None,
            VariableKind::Constant(_) => {
                flags |= QualifierFlags::CONSTANT;
                Storage::None
            }
        };
        let flat = stage == ShaderStage::Fragment
            && storage == Storage::In
            && ty.base_scalar().is_some_and(Scalar::is_integer);
        Qualifiers {
            storage,
            flags,
            interpolation: flat.then_some(InterpolationQualifier::Flat),
            precision: self.precision,
            ..Qualifiers::default()
        }
    }

    fn value(&self, limits: &ResourceLimits) -> Option<Constant> {
        let VariableKind::Constant(value) = self.kind else {
            return None;
        };
        let values = match value {
            ConstantValue::Int(value) => alloc::vec![Value::Int(value)],
            ConstantValue::Uint(value) => alloc::vec![Value::Uint(value)],
            ConstantValue::Bool(value) => alloc::vec![Value::Bool(value)],
            ConstantValue::Limit(limit) => alloc::vec![Value::Int(limit(limits))],
            ConstantValue::Limits(limit) => limit(limits).into_iter().map(Value::Int).collect(),
            ConstantValue::LocalSize => alloc::vec![Value::Uint(1); 3],
        };
        Some(Constant::new(values))
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum BlockSize {
    Single,
    Unsized,
    PatchVertices,
}

#[derive(Debug, Clone, Copy)]
pub struct BuiltinBlock {
    pub name: &'static str,
    pub instance: &'static str,
    pub storage: BlockStorage,
    pub size: BlockSize,
    pub per_primitive: bool,
    pub(crate) members: &'static [&'static [BuiltinVariable]],
    pub(crate) stages: ShaderStageMask,
}

impl BuiltinBlock {
    pub const fn declared_in(&self, stage: ShaderStage) -> bool {
        self.stages.has(stage)
    }

    pub fn members(&self) -> impl Iterator<Item = &'static BuiltinVariable> + use<> {
        self.members.iter().flat_map(|part| part.iter())
    }

    pub fn member(&self, name: &str) -> Option<&'static BuiltinVariable> {
        self.members().find(|member| member.name == name)
    }
}

pub(crate) const FAMILIES: &[&[BuiltinVariable]] = &[
    constants::CONSTANTS,
    stage::VARIABLES,
    ray::CONSTANTS,
    ray::VARIABLES,
];

pub fn named(name: &str) -> impl Iterator<Item = &'static BuiltinVariable> + '_ {
    FAMILIES
        .iter()
        .flat_map(|family| family.iter())
        .filter(move |row| row.name == name)
}

fn rows_named(name: &str) -> impl Iterator<Item = &'static BuiltinVariable> + '_ {
    named(name).chain(
        blocks::BLOCKS
            .iter()
            .flat_map(BuiltinBlock::members)
            .filter(move |row| row.name == name),
    )
}

pub fn implicitly_sized(name: &str) -> bool {
    rows_named(name).any(|row| row.has(VariableFlags::IMPLICITLY_SIZED))
}

pub fn array_limit(name: &str) -> Option<ArrayLimit> {
    rows_named(name).find_map(|row| row.array_limit)
}

pub fn clip_or_cull_distance(name: &str) -> bool {
    rows_named(name).any(|row| {
        matches!(
            row.builtin(),
            Some(BuiltIn::ClipDistances | BuiltIn::CullDistance)
        )
    })
}

pub fn requirement<'a>(
    rows: &[&'a BuiltinVariable],
    version: u32,
    stage: ShaderStage,
) -> Option<&'a [Extension]> {
    rows.iter()
        .find(|row| row.declared_in(version, stage))
        .map(|row| row.requires_one_of)
        .filter(|requires| !requires.is_empty())
}

pub fn blocks_named(name: &str) -> impl Iterator<Item = &'static BuiltinBlock> + '_ {
    blocks::BLOCKS
        .iter()
        .filter(move |block| block.name == name)
}

pub fn member(block: &str, name: &str) -> Option<&'static BuiltinVariable> {
    blocks_named(block).find_map(|row| row.member(name))
}

#[derive(Debug, Clone, Default)]
pub(crate) struct Table {
    pub(crate) symbols: Vec<Symbol>,
    pub(crate) scope: Vec<(String, SymbolId)>,
    pub(crate) rows: Vec<Option<&'static BuiltinVariable>>,
    pub(crate) blocks: Vec<(BlockId, &'static BuiltinBlock)>,
}

impl Table {
    pub(crate) fn structure(&mut self, name: &str, id: crate::types::StructId) -> Option<SymbolId> {
        self.add(name, SymbolKind::Struct(id), None, true)
    }

    fn add(
        &mut self,
        name: &str,
        kind: SymbolKind,
        row: Option<&'static BuiltinVariable>,
        visible: bool,
    ) -> Option<SymbolId> {
        let id = SymbolId::new(u32::try_from(self.symbols.len()).ok()?)?;
        self.symbols.push(Symbol {
            name: String::from(name),
            span: Span::default(),
            kind,
        });
        self.rows.push(row);
        if visible {
            self.scope.push((String::from(name), id));
        }
        Some(id)
    }

    fn variable(
        &mut self,
        name: &str,
        ty: Type,
        qualifiers: Qualifiers,
        value: Option<Constant>,
        row: Option<&'static BuiltinVariable>,
        visible: bool,
    ) -> Option<SymbolId> {
        let variable = crate::scope::Variable {
            ty,
            qualifiers,
            origin: Origin::BuiltIn,
            value,
            declaration: None,
        };
        self.add(name, SymbolKind::Variable(variable), row, visible)
    }

    fn row(&mut self, row: &'static BuiltinVariable, stage: ShaderStage, limits: &ResourceLimits) {
        let Some(ty) = row.ty() else {
            return;
        };
        let qualifiers = row.qualifiers(stage, &ty);
        let value = row.value(limits);
        self.variable(row.name, ty, qualifiers, value, Some(row), true);
    }

    fn block(
        &mut self,
        block: &'static BuiltinBlock,
        stage: ShaderStage,
        limits: &ResourceLimits,
        types: &mut TypeRegistry,
    ) -> Option<()> {
        let member_storage = match block.storage {
            BlockStorage::In => Storage::In,
            _ => Storage::Out,
        };
        let mut members = Vec::new();
        for row in block.members() {
            let ty = row.ty()?;
            let qualifiers = row.qualifiers(stage, &ty);
            members.push(Member {
                name: String::from(row.name),
                ty,
                qualifiers: Qualifiers {
                    storage: member_storage,
                    ..qualifiers
                },
            });
        }
        let qualifiers = Qualifiers {
            storage: member_storage,
            flags: if block.per_primitive {
                QualifierFlags::PER_PRIMITIVE
            } else {
                QualifierFlags::empty()
            },
            ..Qualifiers::default()
        };
        let id = types.add_block(BlockType {
            name: String::from(block.name),
            storage: block.storage,
            qualifiers: qualifiers.clone(),
            members,
            reference: None,
            buffer_type: false,
        })?;
        self.blocks.push((id, block));
        let size = match block.size {
            BlockSize::Single => None,
            BlockSize::Unsized => Some(ArraySize::Unsized),
            BlockSize::PatchVertices => Some(ArraySize::Sized(
                u32::try_from(limits.max_patch_vertices).unwrap_or(0),
            )),
        };
        match size {
            None => {
                let instance = self.variable(
                    block.instance,
                    Type::block(id),
                    qualifiers,
                    None,
                    None,
                    false,
                )?;
                for (index, row) in block.members().enumerate() {
                    let index = u32::try_from(index).ok()?;
                    self.add(
                        row.name,
                        SymbolKind::BlockMember { instance, index },
                        Some(row),
                        true,
                    );
                }
            }
            Some(size) => {
                let ty = Type::block(id).array_of(size);
                self.variable(block.instance, ty, qualifiers, None, None, true);
            }
        }
        Some(())
    }
}

pub(super) fn build(
    version: u32,
    stage: ShaderStage,
    limits: &ResourceLimits,
    types: &mut TypeRegistry,
) -> Table {
    let mut table = Table::default();
    for family in FAMILIES {
        for row in *family {
            if row.declared_in(version, stage) {
                table.row(row, stage, limits);
            }
        }
    }
    for block in blocks::BLOCKS {
        if block.declared_in(stage) {
            table.block(block, stage, limits, types);
        }
    }
    table
}
