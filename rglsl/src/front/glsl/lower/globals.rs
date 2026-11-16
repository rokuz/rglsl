use alloc::{format, string::String, vec, vec::Vec};
use rglsl_sema::scope::QualifierFlags;
use rglsl_types::extension::Extension;
use rglsl_types::stack::recurse;

use rglsl_ast::ast::{
    BlockInstance, BlockStructure, Declaration, DeclarationKind, ExternalDeclaration,
    InitDeclarator, InitDeclaratorList, Initializer, InterpolationQualifier, Node,
    SingleTypeQualifier, Spanned, StorageQualifier, TypeQualifier,
};
use rglsl_sema::builtins::variables::{self, BlockSize, BuiltinVariable, VariableFlags};
use rglsl_sema::scope::{Origin, PerVertex, Qualifiers, Storage, SymbolKind, Variable};
use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockId, BlockStorage, OpaqueKind, Scalar, Type as GlslType,
    TypeKind,
};
use rglsl_sema::{LayoutId, SymbolId};

use super::types::image_dimension;
use super::xfb;
use super::{GlobalRef, Initialization, Lowerer, Packing, Result, internal, semantic, unsupported};
use crate::front::glsl::{Error, ErrorKind};
use crate::proc::Alignment;
use crate::{
    AddressSpace, ArraySize, Binding, BuiltIn, ConservativeDepth, GlobalVariable, Handle,
    ImageClass, Interpolation, MemoryDecorations, ResourceBinding, Sampling, ShaderBallot, Span,
    StorageAccess, StorageFormat, TypeInner,
};

fn layout_ids(qualifier: Option<&Spanned<TypeQualifier>>) -> Vec<LayoutId> {
    let mut ids = Vec::new();
    for single in qualifier.iter().flat_map(|q| &q.node.qualifiers) {
        if let SingleTypeQualifier::Layout(ref layout) = single.node {
            ids.extend(
                layout
                    .ids
                    .iter()
                    .filter_map(|id| LayoutId::from_name(&id.node.name.node)),
            );
        }
    }
    ids
}

fn layout_entries(qualifier: Option<&Spanned<TypeQualifier>>) -> Vec<(Option<LayoutId>, &str)> {
    let mut entries = Vec::new();
    for single in qualifier.iter().flat_map(|q| &q.node.qualifiers) {
        if let SingleTypeQualifier::Layout(ref layout) = single.node {
            entries.extend(layout.ids.iter().map(|id| {
                let name = id.node.name.node.as_str();
                (LayoutId::from_name(name), name)
            }));
        }
    }
    entries
}

fn has_qualifier(
    qualifier: Option<&Spanned<TypeQualifier>>,
    test: impl Fn(&SingleTypeQualifier) -> bool,
) -> bool {
    qualifier
        .iter()
        .flat_map(|q| &q.node.qualifiers)
        .any(|single| test(&single.node))
}

fn storage_of(qualifier: Option<&Spanned<TypeQualifier>>) -> Option<StorageQualifier> {
    qualifier
        .iter()
        .flat_map(|q| &q.node.qualifiers)
        .find_map(|single| match single.node {
            SingleTypeQualifier::Storage(
                storage @ (StorageQualifier::In
                | StorageQualifier::Out
                | StorageQualifier::Uniform
                | StorageQualifier::Buffer
                | StorageQualifier::Shared),
            ) => Some(storage),
            _ => None,
        })
}

const fn per_vertex_interpolation(
    per_vertex: PerVertex,
    interpolation: Option<InterpolationQualifier>,
) -> Interpolation {
    Interpolation::PerVertex {
        flavor: match per_vertex {
            PerVertex::Nv => crate::BarycentricFlavor::Nv,
            PerVertex::Ext => crate::BarycentricFlavor::Khr,
        },
        flat: matches!(interpolation, Some(InterpolationQualifier::Flat)),
        linear: matches!(interpolation, Some(InterpolationQualifier::Noperspective)),
    }
}

const fn interpolation_of(qualifier: InterpolationQualifier) -> Interpolation {
    match qualifier {
        InterpolationQualifier::Flat => Interpolation::Flat,
        InterpolationQualifier::Noperspective => Interpolation::Linear,
        InterpolationQualifier::Smooth => Interpolation::Perspective,
        InterpolationQualifier::ExplicitInterpAmd => Interpolation::ExplicitVertexAmd,
    }
}

pub(super) const fn image_format(id: LayoutId) -> Option<StorageFormat> {
    use StorageFormat as Sf;
    Some(match id {
        LayoutId::Rgba32f => Sf::Rgba32Float,
        LayoutId::Rgba16f => Sf::Rgba16Float,
        LayoutId::Rg32f => Sf::Rg32Float,
        LayoutId::Rg16f => Sf::Rg16Float,
        LayoutId::R11fG11fB10f => Sf::Rg11b10Ufloat,
        LayoutId::R32f => Sf::R32Float,
        LayoutId::R16f => Sf::R16Float,
        LayoutId::Rgba16 => Sf::Rgba16Unorm,
        LayoutId::Rgb10A2ui => Sf::Rgb10a2Uint,
        LayoutId::Rgb10A2 => Sf::Rgb10a2Unorm,
        LayoutId::Rgba8 => Sf::Rgba8Unorm,
        LayoutId::Rg16 => Sf::Rg16Unorm,
        LayoutId::Rg8 => Sf::Rg8Unorm,
        LayoutId::R16 => Sf::R16Unorm,
        LayoutId::R8 => Sf::R8Unorm,
        LayoutId::Rgba16Snorm => Sf::Rgba16Snorm,
        LayoutId::Rgba8Snorm => Sf::Rgba8Snorm,
        LayoutId::Rg16Snorm => Sf::Rg16Snorm,
        LayoutId::Rg8Snorm => Sf::Rg8Snorm,
        LayoutId::R16Snorm => Sf::R16Snorm,
        LayoutId::R8Snorm => Sf::R8Snorm,
        LayoutId::Rgba32i => Sf::Rgba32Sint,
        LayoutId::Rgba16i => Sf::Rgba16Sint,
        LayoutId::Rgba8i => Sf::Rgba8Sint,
        LayoutId::Rg32i => Sf::Rg32Sint,
        LayoutId::Rg16i => Sf::Rg16Sint,
        LayoutId::Rg8i => Sf::Rg8Sint,
        LayoutId::R32i => Sf::R32Sint,
        LayoutId::R16i => Sf::R16Sint,
        LayoutId::R8i => Sf::R8Sint,
        LayoutId::Rgba32ui => Sf::Rgba32Uint,
        LayoutId::Rgba16ui => Sf::Rgba16Uint,
        LayoutId::Rgba8ui => Sf::Rgba8Uint,
        LayoutId::R64ui => Sf::R64Uint,
        LayoutId::R64i => Sf::R64Sint,
        LayoutId::Rg32ui => Sf::Rg32Uint,
        LayoutId::Rg16ui => Sf::Rg16Uint,
        LayoutId::Rg8ui => Sf::Rg8Uint,
        LayoutId::R32ui => Sf::R32Uint,
        LayoutId::R16ui => Sf::R16Uint,
        LayoutId::R8ui => Sf::R8Uint,
        _ => return None,
    })
}

pub(super) const fn unknown_format(sampled: rglsl_sema::types::SampledType) -> StorageFormat {
    StorageFormat::Unknown(super::types::sampled_scalar(sampled))
}

pub(super) fn storage_access(qualifiers: &Qualifiers) -> StorageAccess {
    if qualifiers.flags.contains(QualifierFlags::READONLY) {
        StorageAccess::LOAD
    } else if qualifiers.flags.contains(QualifierFlags::WRITEONLY) {
        StorageAccess::STORE
    } else {
        StorageAccess::LOAD | StorageAccess::STORE
    }
}

pub(super) fn image_access(qualifiers: &Qualifiers) -> StorageAccess {
    if qualifiers.flags.contains(QualifierFlags::READONLY)
        || qualifiers.flags.contains(QualifierFlags::WRITEONLY)
    {
        storage_access(qualifiers)
    } else {
        StorageAccess::LOAD | StorageAccess::STORE | StorageAccess::ATOMIC
    }
}

fn tensor_access(qualifiers: &Qualifiers, ty: &GlslType) -> MemoryDecorations {
    let mut decorations = MemoryDecorations::empty();
    if !matches!(ty.kind, TypeKind::Tensor { .. }) {
        return decorations;
    }
    if qualifiers.flags.contains(QualifierFlags::READONLY) {
        decorations |= MemoryDecorations::NON_WRITABLE;
    }
    if qualifiers.flags.contains(QualifierFlags::WRITEONLY) {
        decorations |= MemoryDecorations::NON_READABLE;
    }
    decorations
}

pub(super) fn parameter_memory(qualifiers: &Qualifiers, ty: &GlslType) -> MemoryDecorations {
    let image = ty
        .as_opaque()
        .is_some_and(|opaque| opaque.kind == OpaqueKind::Image);
    if !image && !matches!(ty.kind, TypeKind::Tensor { .. }) {
        return MemoryDecorations::empty();
    }
    member_memory(qualifiers, qualifiers)
}

pub(super) fn member_memory(block: &Qualifiers, member: &Qualifiers) -> MemoryDecorations {
    let mut decorations = memory(block) | memory(member);
    if block.flags.contains(QualifierFlags::READONLY)
        || member.flags.contains(QualifierFlags::READONLY)
    {
        decorations |= MemoryDecorations::NON_WRITABLE;
    }
    if block.flags.contains(QualifierFlags::WRITEONLY)
        || member.flags.contains(QualifierFlags::WRITEONLY)
    {
        decorations |= MemoryDecorations::NON_READABLE;
    }
    decorations
}

fn memory(qualifiers: &Qualifiers) -> MemoryDecorations {
    let mut decorations = MemoryDecorations::empty();
    if qualifiers.flags.contains(QualifierFlags::COHERENT) {
        decorations |= MemoryDecorations::COHERENT;
    }
    for (present, decoration) in [
        (
            qualifiers.flags.contains(QualifierFlags::VOLATILE),
            MemoryDecorations::VOLATILE,
        ),
        (
            qualifiers.flags.contains(QualifierFlags::RESTRICT),
            MemoryDecorations::RESTRICT,
        ),
        (
            qualifiers.flags.contains(QualifierFlags::DEVICE_COHERENT),
            MemoryDecorations::DEVICE_COHERENT,
        ),
        (
            qualifiers
                .flags
                .contains(QualifierFlags::QUEUE_FAMILY_COHERENT),
            MemoryDecorations::QUEUE_FAMILY_COHERENT,
        ),
        (
            qualifiers
                .flags
                .contains(QualifierFlags::WORKGROUP_COHERENT),
            MemoryDecorations::WORKGROUP_COHERENT,
        ),
        (
            qualifiers.flags.contains(QualifierFlags::SUBGROUP_COHERENT),
            MemoryDecorations::SUBGROUP_COHERENT,
        ),
        (
            qualifiers
                .flags
                .contains(QualifierFlags::SHADER_CALL_COHERENT),
            MemoryDecorations::SHADER_CALL_COHERENT,
        ),
        (
            qualifiers.flags.contains(QualifierFlags::NONPRIVATE),
            MemoryDecorations::NONPRIVATE,
        ),
        (
            qualifiers.flags.contains(QualifierFlags::NONTEMPORAL),
            MemoryDecorations::NONTEMPORAL,
        ),
    ] {
        if present {
            decorations |= decoration;
        }
    }
    decorations
}

impl<'a> Lowerer<'a> {
    fn glsl_location_count(&self, ty: &GlslType) -> u32 {
        enum Task<'t> {
            Visit(&'t GlslType),
            Sum(&'t GlslType, usize),
        }
        let wide = |scalar: Scalar, size: u8| u32::from(scalar == Scalar::Double && size > 2) + 1;
        let arrayed = |ty: &GlslType, element: u32| {
            ty.dimensions()
                .iter()
                .map(|size| match *size {
                    GlslArraySize::Sized(length) => length,
                    GlslArraySize::Specialized(_) | GlslArraySize::Unsized => 1,
                })
                .fold(element, u32::saturating_mul)
        };
        let mut tasks = alloc::vec![Task::Visit(ty)];
        let mut counts: Vec<u32> = Vec::new();
        while let Some(task) = tasks.pop() {
            match task {
                Task::Visit(ty) => {
                    let members = match ty.kind {
                        TypeKind::Struct(id) => self
                            .analysis
                            .types
                            .structure(id)
                            .map(|structure| structure.members.as_slice()),
                        TypeKind::Block(id) => self
                            .analysis
                            .types
                            .block(id)
                            .map(|block| block.members.as_slice()),
                        _ => None,
                    };
                    if let Some(members) = members {
                        tasks.push(Task::Sum(ty, members.len()));
                        tasks.extend(members.iter().rev().map(|member| Task::Visit(&member.ty)));
                        continue;
                    }
                    let element = match ty.kind {
                        TypeKind::Vector { scalar, size } => wide(scalar, size),
                        TypeKind::Matrix {
                            scalar,
                            columns,
                            rows,
                        } => u32::from(columns).saturating_mul(wide(scalar, rows)),
                        _ => 1,
                    };
                    counts.push(arrayed(ty, element));
                }
                Task::Sum(ty, count) => {
                    let start = counts.len().saturating_sub(count);
                    let element = counts.drain(start..).fold(0, u32::saturating_add);
                    counts.push(arrayed(ty, element));
                }
            }
        }
        counts.pop().unwrap_or(1)
    }

    pub(super) fn global_ref(&mut self, symbol: SymbolId, at: Span) -> Result<GlobalRef> {
        super::function::FunctionLowerer::new(self).global_ref(symbol, at)
    }

    pub(super) fn reserve_explicit_locations(&mut self) {
        let analysis = self.analysis;
        for declaration in &self.unit.external_declarations {
            let ExternalDeclaration::Declaration(ref declaration) = *declaration else {
                continue;
            };
            let symbols: Vec<SymbolId> = match declaration.kind {
                DeclarationKind::InitDeclaratorList(ref list) => list
                    .declarators
                    .iter()
                    .filter_map(|declarator| analysis.declarations.get(&declarator.id).copied())
                    .collect(),
                DeclarationKind::Block { .. } => analysis
                    .declarations
                    .get(&declaration.id)
                    .copied()
                    .into_iter()
                    .collect(),
                _ => Vec::new(),
            };
            for symbol in symbols {
                let Some(variable) = self.variable(symbol) else {
                    continue;
                };
                if variable.origin == Origin::BuiltIn {
                    continue;
                }
                let slot = match variable.qualifiers.storage {
                    Storage::In => 0,
                    Storage::Out => 1,
                    _ => continue,
                };
                let ranges = self.explicit_ranges(variable);
                self.explicit_locations[slot].extend(ranges);
            }
        }
    }

    fn explicit_ranges(&self, variable: &Variable) -> Vec<(u32, u32)> {
        let location_of = |qualifiers: &Qualifiers| {
            qualifiers
                .layout_entry(LayoutId::Location)
                .and_then(|entry| entry.value.constant())
                .and_then(|value| u32::try_from(value).ok())
        };
        let mut ranges = Vec::new();
        let mut push = |start: u32, count: u32| ranges.push((start, start.saturating_add(count)));
        let block = match variable.ty.kind {
            TypeKind::Block(id) => self.analysis.types.block(id),
            _ => None,
        };
        match (block, variable.ty.kind) {
            (Some(block), TypeKind::Block(id)) => {
                let mut next = location_of(&block.qualifiers);
                for (index, member) in (0_u32..).zip(&block.members) {
                    let mut member_ty = member.ty.clone();
                    if member_ty.outer_size() == Some(GlslArraySize::Unsized) {
                        let size = self.member_sizes.get(&(id, index)).copied().unwrap_or(1);
                        member_ty.set_outer_size(GlslArraySize::Sized(size.max(1)));
                    }
                    let count = match member_ty.element_type() {
                        Some(element)
                            if member.qualifiers.flags.contains(QualifierFlags::PER_VIEW) =>
                        {
                            self.glsl_location_count(&element)
                        }
                        _ => self.glsl_location_count(&member_ty),
                    };
                    let start = location_of(&member.qualifiers).or(next);
                    if let Some(start) = start {
                        push(start, count);
                    }
                    next = start.map(|start| start.saturating_add(count));
                }
            }
            _ => {
                if let Some(start) = location_of(&variable.qualifiers) {
                    let element = if self.is_per_vertex_io(&variable.qualifiers) {
                        variable.ty.element_type()
                    } else {
                        None
                    };
                    let element = if variable.qualifiers.flags.contains(QualifierFlags::PER_VIEW) {
                        element.and_then(|element| element.element_type())
                    } else {
                        element
                    };
                    push(
                        start,
                        self.glsl_location_count(element.as_ref().unwrap_or(&variable.ty)),
                    );
                }
            }
        }
        ranges
    }

    fn auto_location(&mut self, slot: usize, count: u32) -> u32 {
        let mut start = self.next_location[slot];
        let end = |start: u32| start.saturating_add(count.max(1));
        while let Some(&(_, taken)) = self.explicit_locations[slot]
            .iter()
            .find(|&&(from, to)| from < end(start) && start < to)
        {
            start = taken;
        }
        self.next_location[slot] = start.saturating_add(count);
        start
    }

    pub(super) fn global_declaration(&mut self, declaration: &'a Declaration) -> Result<()> {
        let qualifiers: Vec<&Spanned<TypeQualifier>> = match declaration.kind {
            DeclarationKind::InitDeclaratorList(ref list) => {
                list.ty.node.qualifier.iter().collect()
            }
            DeclarationKind::Block { ref structure, .. } => core::iter::once(&structure.qualifier)
                .chain(
                    structure
                        .members
                        .iter()
                        .filter_map(|member| member.node.ty.node.qualifier.as_ref()),
                )
                .collect(),
            DeclarationKind::Qualifier(ref qualifier)
            | DeclarationKind::QualifiedIdentifiers { ref qualifier, .. } => vec![qualifier],
            DeclarationKind::FunctionPrototype(_)
            | DeclarationKind::Precision { .. }
            | DeclarationKind::SpirvInstruction { .. }
            | DeclarationKind::SpirvExecutionMode(_) => Vec::new(),
        };
        if let Some(qualifier) = qualifiers.into_iter().find(|&qualifier| {
            layout_ids(Some(qualifier))
                .into_iter()
                .any(LayoutId::is_xfb)
        }) {
            if self.xfb_default_buffer().is_none() {
                return Err(semantic(
                    "transform feedback qualifier: not supported in this stage",
                    self.at(qualifier.span),
                ));
            }
            self.xfb.mode = true;
        }
        match declaration.kind {
            DeclarationKind::FunctionPrototype(_)
            | DeclarationKind::Precision { .. }
            | DeclarationKind::SpirvInstruction { .. }
            | DeclarationKind::SpirvExecutionMode(_) => Ok(()),
            DeclarationKind::InitDeclaratorList(ref list) => {
                for declarator in &list.declarators {
                    let result = self.global_declarator(list, declarator);
                    self.report(result);
                }
                Ok(())
            }
            DeclarationKind::Block {
                ref structure,
                ref instance,
            } => self.block(declaration, structure, instance.as_ref()),
            DeclarationKind::Qualifier(ref qualifier) => self.default_qualifier(qualifier),
            DeclarationKind::QualifiedIdentifiers {
                ref qualifier,
                ref identifiers,
            } => {
                let qualifier = Some(qualifier);
                if has_qualifier(qualifier, |q| matches!(q, SingleTypeQualifier::Invariant)) {
                    for identifier in identifiers {
                        self.invariant
                            .push((identifier.node.clone(), self.at(identifier.span)));
                    }
                }
                Ok(())
            }
        }
    }

    fn default_qualifier(&mut self, qualifier: &'a Spanned<TypeQualifier>) -> Result<()> {
        let at = self.at(qualifier.span);
        let ids = layout_ids(Some(qualifier));
        match storage_of(Some(qualifier)) {
            Some(
                storage @ (StorageQualifier::Uniform
                | StorageQualifier::Buffer
                | StorageQualifier::Shared),
            ) => {
                let defaults = match storage {
                    StorageQualifier::Buffer => &mut self.buffer_defaults,
                    StorageQualifier::Shared => &mut self.shared_defaults,
                    _ => &mut self.uniform_defaults,
                };
                for id in ids {
                    if let Some(packing) = id.packing() {
                        defaults.packing = Some(packing);
                    } else if id == LayoutId::RowMajor {
                        defaults.row_major = Some(true);
                    } else if id == LayoutId::ColumnMajor {
                        defaults.row_major = Some(false);
                    }
                }
                Ok(())
            }
            Some(StorageQualifier::In) => {
                self.stage_input_layout(&ids);
                self.stage_input_values(qualifier);
                for id in ids {
                    match id {
                        LayoutId::EarlyFragmentTests => self.early_fragment_tests = true,
                        LayoutId::QuadDerivatives => self.quad_control.quad_derivatives = true,
                        LayoutId::FullQuads => self.quad_control.require_full_quads = true,
                        LayoutId::NonCoherentAttachmentReadQcom => {
                            self.non_coherent_tile_read = true;
                        }
                        _ if id.local_size_axis().is_some() => {
                            let value = xfb::ast_layout_value(self, Some(qualifier), id);
                            if let Some(slot) = id
                                .local_size_axis()
                                .and_then(|index| self.declared_local_size.get_mut(index))
                            {
                                *slot = value;
                            }
                        }
                        _ if id.tile_shading_rate_axis().is_some() => {
                            let value = xfb::ast_layout_value(self, Some(qualifier), id)
                                .filter(|value| *value > 0);
                            if let (Some(slot), Some(value)) = (
                                id.tile_shading_rate_axis()
                                    .and_then(|index| self.tile_shading_rate.get_mut(index)),
                                value,
                            ) {
                                *slot = Some(value);
                            }
                        }
                        _ if id.local_size_id_axis().is_some() => {
                            let spec_id = xfb::ast_layout_value(self, Some(qualifier), id)
                                .filter(|value| *value != u32::MAX)
                                .ok_or_else(|| {
                                    semantic("the specialization id is out of range", at)
                                })?;
                            if let Some(slot) = id
                                .local_size_id_axis()
                                .and_then(|index| self.local_size_ids.get_mut(index))
                            {
                                *slot = Some(spec_id);
                            }
                        }
                        _ => {}
                    }
                }
                Ok(())
            }
            Some(StorageQualifier::Out) => {
                self.stage_output_layout(&ids, qualifier);
                let qualifier = Some(qualifier);
                if let Some(buffer) = xfb::ast_layout_value(self, qualifier, LayoutId::XfbBuffer) {
                    self.xfb.default_buffer = Some(Some(buffer));
                }
                if let (Some(buffer), Some(stride)) = (
                    self.xfb_default_buffer(),
                    xfb::ast_layout_value(self, qualifier, LayoutId::XfbStride),
                ) {
                    self.xfb_stride(buffer, stride, at)?;
                }
                Ok(())
            }
            _ => Ok(()),
        }
    }

    fn global_declarator(
        &mut self,
        list: &'a InitDeclaratorList,
        declarator: &'a Node<InitDeclarator>,
    ) -> Result<()> {
        let at = self.at(declarator.span);
        let Some(&symbol) = self.analysis.declarations.get(&declarator.id) else {
            return Ok(());
        };
        if self.is_per_vertex_member(symbol) {
            return self.builtin_redeclaration(symbol, list, declarator, at);
        }
        let Some(variable) = self.variable(symbol) else {
            return Ok(());
        };
        if variable.origin == Origin::BuiltIn {
            return self.builtin_redeclaration(symbol, list, declarator, at);
        }
        let name = declarator.kind.name.node.clone();
        let qualifiers = &variable.qualifiers;
        let ty = &variable.ty;
        if qualifiers.flags.contains(QualifierFlags::CONSTANT) {
            if let Some(entry) = qualifiers.layout_entry(LayoutId::ConstantId) {
                let id = entry
                    .value
                    .constant()
                    .and_then(|value| u32::try_from(value).ok())
                    .filter(|value| *value != u32::MAX)
                    .ok_or_else(|| semantic("the `constant_id` is out of range", at))?;
                let value = variable.value.as_ref().ok_or_else(|| {
                    unsupported("specialization constants without a known default", at)
                })?;
                let ir = self.ir_type(ty, at)?;
                let init = self.global_constant(ty, &value.values, at)?;
                let handle = self.module.overrides.append(
                    crate::Override {
                        name: Some(name),
                        id: Some(id),
                        ty: ir,
                        init: Some(init),
                    },
                    at,
                );
                self.globals.insert(symbol, GlobalRef::Override(handle));
                return Ok(());
            }
            if qualifiers.flags.contains(QualifierFlags::SPECIALIZATION)
                && let Some(initializer) = declarator.kind.initializer.as_ref()
            {
                let handle = self.specialized_initializer(initializer, ty, Some(name), at)?;
                self.globals.insert(symbol, GlobalRef::Override(handle));
                return Ok(());
            }
            if let Some(ref value) = variable.value {
                let ir = self.ir_type(ty, at)?;
                let init = self.global_constant(ty, &value.values, at)?;
                let handle = self.module.constants.append(
                    crate::Constant {
                        name: Some(name),
                        ty: ir,
                        init,
                    },
                    at,
                );
                self.globals.insert(symbol, GlobalRef::Constant(handle));
                return Ok(());
            }
        }
        match qualifiers.storage {
            Storage::In | Storage::Out => self.interface_variable(symbol, name, at),
            Storage::Uniform if self.is_heap_view(qualifiers) => {
                self.heap_resource(symbol, name, list.ty.node.qualifier.as_ref(), at)
            }
            Storage::Uniform => self.resource(symbol, name, at),
            Storage::TaskPayloadShared => self.task_payload_variable(symbol, name, at),
            Storage::TileImage => self.tile_image_variable(symbol, name, at),
            Storage::Shared => {
                let ir = self.ir_type(ty, at)?;
                let init = declarator
                    .kind
                    .initializer
                    .as_ref()
                    .filter(|initializer| {
                        rglsl_sema::analyze::is_null_initializer(&initializer.node)
                    })
                    .map(|_| {
                        self.module
                            .global_expressions
                            .append(crate::Expression::ZeroValue(ir), at)
                    });
                let handle = self.module.global_variables.append(
                    GlobalVariable {
                        name: Some(name),
                        space: AddressSpace::WorkGroup,
                        binding: None,
                        ty: ir,
                        init,
                        memory_decorations: memory(qualifiers),
                        io: None,
                        xfb: None,
                        input_attachment_index: None,
                        heap_offset: None,
                        tile_attachment: false,
                        spirv_decorations: Vec::new(),
                        relaxed_precision: false,
                        immediate_bank: None,
                        block: None,
                    },
                    at,
                );
                self.globals.insert(symbol, GlobalRef::Variable(handle));
                Ok(())
            }
            Storage::Buffer | Storage::Inout | Storage::ResourceHeap | Storage::SamplerHeap => {
                Err(internal(at))
            }
            Storage::RayPayload
            | Storage::RayPayloadIn
            | Storage::HitAttribute
            | Storage::CallableData
            | Storage::CallableDataIn
            | Storage::HitObjectAttributeNv
            | Storage::HitObjectAttributeExt => self.ray_variable(symbol, name, at),
            Storage::None => self.private(symbol, name, declarator, at),
        }
    }

    fn tile_image_variable(&mut self, symbol: SymbolId, name: String, at: Span) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let location = variable
            .qualifiers
            .layout_entry(LayoutId::Location)
            .and_then(|entry| entry.value.constant())
            .and_then(|value| u32::try_from(value).ok())
            .ok_or_else(|| internal(at))?;
        let mut ty = self.ir_type(&GlslType::new(variable.ty.kind), at)?;
        match *variable.ty.dimensions() {
            [] => {}
            [size @ (GlslArraySize::Sized(_) | GlslArraySize::Specialized(_))] => {
                let size = self.array_size(size, at)?;
                ty = self.insert_type(TypeInner::BindingArray { base: ty, size });
            }
            [GlslArraySize::Unsized] => {
                let size = self.unsized_binding_array(symbol, at)?;
                if size == ArraySize::Dynamic {
                    return Err(semantic(
                        "runtime-sized arrays of tile images are not supported: Vulkan only allows runtime arrays in Uniform, StorageBuffer, and UniformConstant storage classes",
                        at,
                    ));
                }
                ty = self.insert_type(TypeInner::BindingArray { base: ty, size });
            }
            _ => {
                return Err(semantic(
                    "arrays of arrays of tile images are not supported: Vulkan only supports a single array level for tile attachments",
                    at,
                ));
            }
        }
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::Handle,
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: Some(Binding::Location {
                    location,
                    interpolation: None,
                    sampling: None,
                    blend_src: None,
                    per_primitive: false,
                    per_view: false,
                    passthrough: false,
                    component: None,
                    invariant: false,
                    patch: false,
                }),
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                immediate_bank: None,
                block: None,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
            },
            at,
        );
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
    }

    fn private(
        &mut self,
        symbol: SymbolId,
        name: String,
        declarator: &'a Node<InitDeclarator>,
        at: Span,
    ) -> Result<()> {
        let analysis = self.analysis;
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let ty = &variable.ty;
        let ir = if ty.outer_size() == Some(GlslArraySize::Unsized) {
            let mut sized = ty.clone();
            let size = self
                .implicit_sizes
                .get(&symbol)
                .copied()
                .unwrap_or(1)
                .max(1);
            sized.set_outer_size(GlslArraySize::Sized(size));
            self.variable_ir_type(&sized, &variable.qualifiers, at)?
        } else {
            self.variable_ir_type(ty, &variable.qualifiers, at)?
        };
        let mut init = None;
        let mut runtime = None;
        let mut constant_initializer = None;
        if let Some(ref initializer) = declarator.kind.initializer {
            if rglsl_sema::analyze::is_null_initializer(&initializer.node) {
                init = Some(
                    self.module
                        .global_expressions
                        .append(crate::Expression::ZeroValue(ir), at),
                );
            }
            let constant = match initializer.node {
                Initializer::Expression(ref expression) => analysis
                    .expression(expression.id)
                    .filter(|info| {
                        info.is_constant
                            && !info.is_specialization
                            && !info.ty.contains_reference(&analysis.types)
                    })
                    .and_then(|info| Some((info.ty.clone(), info.value.clone()?))),
                Initializer::List(_) => None,
            };
            let converted = constant.and_then(|(from, value)| {
                if from == *ty {
                    return Some(value.values);
                }
                let target = ty.base_scalar()?;
                (from.same_shape(ty) && from.base_scalar().is_some())
                    .then(|| value.values.iter().map(|v| v.convert(target)).collect())
            });
            match converted {
                Some(values) => {
                    let constant = self.global_constant(ty, &values, at)?;
                    constant_initializer = Some(constant);
                    if self.main_function().is_some() {
                        runtime = Some(initializer);
                    } else {
                        init = Some(constant);
                    }
                }
                None if init.is_some() => {}
                None => runtime = Some(initializer),
            }
        }
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::Private,
                binding: None,
                ty: ir,
                init,
                memory_decorations: MemoryDecorations::empty(),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        if let Some(constant) = constant_initializer {
            self.constant_initializers.insert(handle, constant);
        }
        if let Some(initializer) = runtime {
            self.initializers.push(Initialization {
                global: handle,
                symbol,
                initializer,
            });
        }
        Ok(())
    }

    fn interface_variable(&mut self, symbol: SymbolId, name: String, at: Span) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let qualifiers = &variable.qualifiers;
        let input = qualifiers.storage == Storage::In;
        let per_vertex = self.is_per_vertex_io(qualifiers);
        if qualifiers.flags.contains(QualifierFlags::INVARIANT) && input {
            return Err(semantic("invariant can only apply to an output", at));
        }
        if input && xfb::has_xfb(qualifiers) {
            return Err(semantic(
                "xfb layout qualifier can only be used on an output",
                at,
            ));
        }
        let mut declared = variable.ty.clone();
        if declared.outer_size() == Some(GlslArraySize::Unsized) {
            let size = self.implicit_sizes.get(&symbol).copied().ok_or_else(|| {
                unsupported(
                    "stage inputs and outputs without a size or a constant index",
                    at,
                )
            })?;
            declared.set_outer_size(GlslArraySize::Sized(size));
        }
        let ty = self.ir_type(&declared, at)?;
        let element = match (per_vertex, &self.module.types[ty].inner) {
            (true, &TypeInner::Array { base, .. }) => base,
            _ => ty,
        };
        let element = match (
            qualifiers.flags.contains(QualifierFlags::PER_VIEW),
            &self.module.types[element].inner,
        ) {
            (true, &TypeInner::Array { base, .. }) => base,
            _ => element,
        };
        let per_primitive = self.per_primitive_binding(qualifiers);
        if qualifiers
            .spirv_decorations
            .iter()
            .any(|decoration| decoration.decoration == crate::proc::SPIRV_DECORATION_BUILT_IN)
        {
            let handle = self.module.global_variables.append(
                GlobalVariable {
                    name: Some(name.clone()),
                    space: if input {
                        AddressSpace::Input
                    } else {
                        AddressSpace::Output
                    },
                    binding: None,
                    ty,
                    init: None,
                    memory_decorations: MemoryDecorations::empty(),
                    io: None,
                    xfb: None,
                    input_attachment_index: None,
                    heap_offset: None,
                    tile_attachment: false,
                    spirv_decorations: Vec::new(),
                    relaxed_precision: false,
                    immediate_bank: None,
                    block: None,
                },
                at,
            );
            self.interface.push(handle);
            self.globals.insert(symbol, GlobalRef::Variable(handle));
            if input {
                self.inputs.insert(name);
            } else {
                self.outputs.insert(name, handle);
            }
            return Ok(());
        }
        let automatic_location = qualifiers.layout_entry(LayoutId::Location).is_none();
        let location = match qualifiers
            .layout_entry(LayoutId::Location)
            .and_then(|e| e.value.constant())
        {
            Some(location) => u32::try_from(location).map_err(|_| internal(at))?,
            None if self.options.auto_map_locations => {
                let count = location_count(&self.module, element);
                self.auto_location(usize::from(!input), count)
            }
            None => {
                return Err(semantic(
                    "SPIR-V requires a location for user inputs and outputs",
                    at,
                ));
            }
        };
        let mut interpolation = match qualifiers.per_vertex {
            Some(per_vertex) => Some(per_vertex_interpolation(
                per_vertex,
                qualifiers.interpolation,
            )),
            None => qualifiers.interpolation.map(interpolation_of),
        };
        let mut sampling = if qualifiers.flags.contains(QualifierFlags::SAMPLE) {
            Some(Sampling::Sample)
        } else if qualifiers.flags.contains(QualifierFlags::CENTROID) {
            Some(Sampling::Centroid)
        } else {
            None
        };
        if interpolation.is_none() && contains_float(&self.module.types, ty) {
            interpolation = Some(Interpolation::Perspective);
            sampling.get_or_insert(Sampling::Center);
        }
        let component = match qualifiers
            .layout_entry(LayoutId::Component)
            .and_then(|e| e.value.constant())
        {
            Some(component) => Some(u32::try_from(component).map_err(|_| internal(at))?),
            None => None,
        };
        let blend_src = match qualifiers
            .layout_entry(LayoutId::Index)
            .and_then(|e| e.value.constant())
        {
            Some(index) => Some(u32::try_from(index).map_err(|_| internal(at))?),
            None => None,
        };
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name.clone()),
                space: if input {
                    AddressSpace::Input
                } else {
                    AddressSpace::Output
                },
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: Some(Binding::Location {
                    location,
                    interpolation,
                    sampling,
                    blend_src,
                    per_primitive,
                    component,
                    invariant: qualifiers.flags.contains(QualifierFlags::INVARIANT),
                    patch: qualifiers.flags.contains(QualifierFlags::PATCH),
                    per_view: qualifiers.flags.contains(QualifierFlags::PER_VIEW),
                    passthrough: false,
                }),
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        self.interface.push(handle);
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        if automatic_location {
            self.automatic_locations.push(handle);
        }
        if input {
            self.passthrough(handle, qualifiers);
            self.inputs.insert(name);
            return Ok(());
        }
        self.outputs.insert(name, handle);
        self.output_stream(handle, qualifiers);
        let explicit = xfb::layout_value(qualifiers, LayoutId::XfbBuffer);
        if explicit.is_none()
            && self.xfb.default_buffer.is_none()
            && xfb::layout_value(qualifiers, LayoutId::XfbOffset).is_none()
            && xfb::layout_value(qualifiers, LayoutId::XfbStride).is_none()
        {
            self.xfb.pending.push(handle);
            return Ok(());
        }
        let buffer = explicit.or(self.xfb_default_buffer());
        if let Some(buffer) = buffer {
            let offset = xfb::layout_value(qualifiers, LayoutId::XfbOffset);
            if let Some(stride) = xfb::layout_value(qualifiers, LayoutId::XfbStride) {
                self.xfb_stride(buffer, stride, at)?;
            }
            if let Some(offset) = offset {
                self.xfb_capture(buffer, offset, ty, at)?;
            }
            self.xfb_global(handle, buffer, offset);
        }
        Ok(())
    }

    fn binding(
        &mut self,
        qualifiers: &Qualifiers,
        at: Span,
    ) -> Result<(Option<ResourceBinding>, Option<Option<u32>>)> {
        let value = |id: LayoutId| -> Result<Option<u32>> {
            match qualifiers.layout_entry(id).and_then(|e| e.value.constant()) {
                Some(value) => u32::try_from(value).map(Some).map_err(|_| internal(at)),
                None => Ok(None),
            }
        };
        let binding = value(LayoutId::Binding)?;
        let set = value(LayoutId::Set)?.or(self.options.resource_set);
        match binding {
            Some(binding) => Ok((
                Some(ResourceBinding {
                    group: set.unwrap_or(0),
                    binding,
                }),
                None,
            )),
            None if self.options.auto_map_bindings => Ok((None, Some(set))),
            None if self
                .analysis
                .extensions
                .contains(Extension::ExtDescriptorHeap) =>
            {
                Ok((None, None))
            }
            None => Err(semantic(
                "uniform/buffer blocks and opaque uniforms require layout(binding=X)",
                at,
            )),
        }
    }

    fn resource(&mut self, symbol: SymbolId, name: String, at: Span) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let qualifiers = &variable.qualifiers;
        let ty = &variable.ty;
        let opaque = match ty.kind {
            TypeKind::Opaque(opaque) => opaque,
            TypeKind::Tensor {
                scalar: element,
                rank,
            } => {
                let inner = TypeInner::Tensor {
                    scalar: super::types::scalar(element),
                    rank: self.tensor_rank(rank, at)?,
                };
                return self.handle_global(symbol, name, inner, None, at);
            }
            TypeKind::Spirv(id) => {
                let inner = self.spirv_type(id, at)?;
                return self.handle_global(symbol, name, inner, None, at);
            }
            TypeKind::Struct(_) if ty.contains_opaque(&self.analysis.types) => {
                return Err(internal(at));
            }
            _ => {
                return Err(semantic(
                    "non-opaque uniforms outside a block are not allowed when targeting Vulkan",
                    at,
                ));
            }
        };
        let inner = if opaque.kind == OpaqueKind::Image {
            let format = qualifiers
                .image_format()
                .and_then(image_format)
                .unwrap_or_else(|| unknown_format(opaque.sampled));
            TypeInner::Image {
                dim: image_dimension(opaque),
                arrayed: opaque.arrayed,
                class: ImageClass::Storage {
                    format,
                    access: image_access(qualifiers),
                    multi: opaque.multisample,
                },
            }
        } else {
            Self::opaque_inner(
                opaque,
                self.depth.contains(&symbol),
                self.comparison.contains(&symbol),
                at,
            )?
        };
        self.handle_global(symbol, name, inner, Some(opaque), at)
    }

    fn handle_global(
        &mut self,
        symbol: SymbolId,
        name: String,
        inner: TypeInner,
        opaque: Option<rglsl_sema::types::Opaque>,
        at: Span,
    ) -> Result<()> {
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let qualifiers = &variable.qualifiers;
        let ty = &variable.ty;
        let mut handle_ty = self.insert_type(inner);
        match *ty.dimensions() {
            [] => {}
            [size @ GlslArraySize::Sized(_)] => {
                let size = self.array_size(size, at)?;
                handle_ty = self.insert_type(TypeInner::BindingArray {
                    base: handle_ty,
                    size,
                });
            }
            [GlslArraySize::Unsized] => {
                let size = self.unsized_binding_array(symbol, at)?;
                handle_ty = self.insert_type(TypeInner::BindingArray {
                    base: handle_ty,
                    size,
                });
            }
            _ => {
                return Err(unsupported(
                    "runtime-sized arrays and arrays of arrays of opaque types",
                    at,
                ));
            }
        }
        let (binding, unbound) = self.binding(qualifiers, at)?;
        let input_attachment_index = match qualifiers
            .layout_entry(LayoutId::InputAttachmentIndex)
            .and_then(|entry| entry.value.constant())
        {
            Some(index) if opaque.is_some_and(|opaque| opaque.kind == OpaqueKind::SubpassInput) => {
                Some(u32::try_from(index).map_err(|_| internal(at))?)
            }
            _ => None,
        };
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::Handle,
                binding,
                ty: handle_ty,
                init: None,
                memory_decorations: memory(qualifiers) | tensor_access(qualifiers, ty),
                io: None,
                xfb: None,
                input_attachment_index,
                heap_offset: None,
                tile_attachment: qualifiers.has_layout(LayoutId::TileAttachmentQcom),
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        if let Some(set) = unbound {
            self.unbound.push((handle, set));
        }
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
    }

    fn block(
        &mut self,
        declaration: &'a Declaration,
        structure: &'a BlockStructure,
        instance: Option<&'a Spanned<BlockInstance>>,
    ) -> Result<()> {
        let at = self.at(structure.name.span);
        if structure.name.node == "gl_PerVertex" {
            if storage_of(Some(&structure.qualifier)) == Some(StorageQualifier::In)
                && layout_ids(Some(&structure.qualifier)).contains(&LayoutId::Passthrough)
            {
                return self.passthrough_per_vertex(structure, at);
            }
            if instance.is_some() {
                return match self.analysis.declarations.get(&declaration.id) {
                    Some(&symbol) if self.is_per_vertex_array(symbol) => {
                        self.global_ref(symbol, at).map(|_| ())
                    }
                    _ => Ok(()),
                };
            }
            if storage_of(Some(&structure.qualifier)) == Some(StorageQualifier::Out) {
                self.per_vertex_redeclared = true;
                self.per_vertex_xfb(structure, at)?;
            }
            return Ok(());
        }
        let analysis = self.analysis;
        let Some(&symbol) = analysis.declarations.get(&declaration.id) else {
            return Ok(());
        };
        if variables::blocks_named(&structure.name.node)
            .any(|block| block.declared_in(crate::ShaderStage::Mesh))
            && self.is_per_vertex_array(symbol)
        {
            return self.global_ref(symbol, at).map(|_| ());
        }
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let TypeKind::Block(id) = variable.ty.kind else {
            return Err(internal(at));
        };
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let qualifiers = &block.qualifiers;
        let instance_name =
            instance.map_or_else(String::new, |instance| instance.node.name.node.clone());
        let buffer = match block.storage {
            BlockStorage::Uniform => false,
            BlockStorage::Buffer => true,
            BlockStorage::Shared => {
                return self.shared_block(symbol, id, instance_name, at);
            }
            BlockStorage::In | BlockStorage::Out => {
                let name = instance.map(|instance| instance.node.name.node.clone());
                return self.interface_block(symbol, id, name, at);
            }
            BlockStorage::ResourceHeap | BlockStorage::SamplerHeap => {
                return self.structured_heap(
                    symbol,
                    id,
                    instance_name,
                    Some(&structure.qualifier),
                    at,
                );
            }
            BlockStorage::RayPayload
            | BlockStorage::RayPayloadIn
            | BlockStorage::HitAttribute
            | BlockStorage::CallableData
            | BlockStorage::CallableDataIn
            | BlockStorage::HitObjectAttributeNv
            | BlockStorage::HitObjectAttributeExt => {
                return self.ray_block(symbol, id, instance_name, at);
            }
        };
        let shader_record = rglsl_sema::analyze::is_shader_record(qualifiers);
        let push_constant = qualifiers.has_layout(LayoutId::PushConstant);
        if !push_constant && self.is_heap_view(&variable.qualifiers) {
            return self.heap_buffer_array(
                symbol,
                instance_name,
                id,
                Some(&structure.qualifier),
                at,
            );
        }
        let (packing, row_major) = if shader_record {
            let explicit = qualifiers
                .layout
                .iter()
                .any(|entry| entry.id.and_then(LayoutId::packing).is_some());
            let (packing, row_major) = self.block_packing(qualifiers, buffer, true);
            (if explicit { packing } else { Packing::Std430 }, row_major)
        } else {
            self.block_packing(qualifiers, buffer, push_constant)
        };
        let mut ty = self.block_struct(id, packing, row_major, at)?;
        match *variable.ty.dimensions() {
            [] => {}
            [size] => {
                let size = match size {
                    GlslArraySize::Sized(_) => self.array_size(size, at)?,
                    GlslArraySize::Unsized => self.unsized_binding_array(symbol, at)?,
                    GlslArraySize::Specialized(_) => self.array_size(size, at)?,
                };
                ty = self.insert_type(TypeInner::BindingArray { base: ty, size });
            }
            _ => return Err(unsupported("arrays of arrays of blocks", at)),
        }
        let mut decorations = memory(qualifiers);
        if push_constant || shader_record {
            decorations.remove(MemoryDecorations::RESTRICT);
        }
        if !buffer || push_constant || shader_record {
            if qualifiers.flags.contains(QualifierFlags::READONLY) {
                decorations |= MemoryDecorations::NON_WRITABLE;
            }
            if qualifiers.flags.contains(QualifierFlags::WRITEONLY) {
                decorations |= MemoryDecorations::NON_READABLE;
            }
        }
        let space = if push_constant {
            AddressSpace::Immediate
        } else if shader_record {
            AddressSpace::ShaderRecord
        } else if buffer {
            AddressSpace::Storage {
                access: storage_access(qualifiers),
            }
        } else {
            AddressSpace::Uniform
        };
        let (binding, unbound) = if push_constant || shader_record {
            (None, None)
        } else {
            self.binding(qualifiers, at)?
        };
        if block
            .members
            .iter()
            .any(|member| member.qualifiers.has_layout(LayoutId::MemberOffset))
        {
            return Err(unsupported(
                "the `member_offset` layout qualifier on a block member",
                at,
            ));
        }
        let layout_value = |id: LayoutId| {
            qualifiers
                .layout_entry(id)
                .and_then(|entry| entry.value.constant())
                .and_then(|value| u32::try_from(value).ok())
        };
        let immediate_bank = push_constant
            .then(|| crate::ImmediateBank {
                bank: layout_value(LayoutId::Bank),
                member_offset: layout_value(LayoutId::MemberOffset),
            })
            .filter(|bank| *bank != crate::ImmediateBank::default());
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(instance_name),
                space,
                binding,
                ty,
                init: None,
                memory_decorations: decorations,
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank,
                block: shader_record.then_some(if buffer {
                    crate::BlockDeclaration::Buffer
                } else {
                    crate::BlockDeclaration::Uniform
                }),
            },
            at,
        );
        if let Some(set) = unbound {
            self.unbound.push((handle, set));
        }
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
    }

    fn shared_block(
        &mut self,
        symbol: SymbolId,
        id: BlockId,
        instance_name: String,
        at: Span,
    ) -> Result<()> {
        let analysis = self.analysis;
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let qualifiers = &block.qualifiers;
        if block
            .members
            .iter()
            .any(|member| member.qualifiers.has_layout(LayoutId::MemberOffset))
        {
            return Err(unsupported(
                "the `member_offset` layout qualifier on a block member",
                at,
            ));
        }
        let defaults = self.shared_defaults;
        let mut packing = None;
        let mut row_major = None;
        for entry in &qualifiers.layout {
            let Some(layout_id) = entry.id else {
                continue;
            };
            if let Some(found) = layout_id.packing() {
                packing = Some(found);
            } else if layout_id == LayoutId::RowMajor {
                row_major = Some(true);
            } else if layout_id == LayoutId::ColumnMajor {
                row_major = Some(false);
            }
        }
        let packing = packing.or(defaults.packing).unwrap_or(Packing::Std430);
        let row_major = row_major.or(defaults.row_major).unwrap_or(false);
        let ty = self.block_struct(id, packing, row_major, at)?;
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(instance_name),
                space: AddressSpace::WorkGroup,
                binding: None,
                ty,
                init: None,
                memory_decorations: memory(qualifiers),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: Some(crate::BlockDeclaration::Shared),
            },
            at,
        );
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
    }

    pub(super) fn block_packing(
        &self,
        qualifiers: &Qualifiers,
        buffer: bool,
        push_constant: bool,
    ) -> (Packing, bool) {
        let defaults = if buffer {
            self.buffer_defaults
        } else {
            self.uniform_defaults
        };
        let mut packing = None;
        let mut row_major = None;
        for entry in &qualifiers.layout {
            let Some(id) = entry.id else {
                continue;
            };
            if let Some(found) = id.packing() {
                packing = Some(found);
            } else if id == LayoutId::RowMajor {
                row_major = Some(true);
            } else if id == LayoutId::ColumnMajor {
                row_major = Some(false);
            }
        }
        let packing = packing
            .or(defaults.packing)
            .unwrap_or(if buffer || push_constant {
                Packing::Std430
            } else {
                Packing::Std140
            });
        (packing, row_major.or(defaults.row_major).unwrap_or(false))
    }

    fn interface_block(
        &mut self,
        symbol: SymbolId,
        id: BlockId,
        name: Option<String>,
        at: Span,
    ) -> Result<()> {
        let analysis = self.analysis;
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let input = block.storage == BlockStorage::In;
        let outer = &block.qualifiers;
        let patch = outer.flags.contains(QualifierFlags::PATCH)
            || block
                .members
                .iter()
                .any(|member| member.qualifiers.flags.contains(QualifierFlags::PATCH));
        let per_vertex = self.is_per_vertex_io(outer) && !patch;
        if outer.flags.contains(QualifierFlags::INVARIANT) {
            return Err(semantic(
                "cannot use invariant qualifier on an interface block",
                at,
            ));
        }
        let explicit = |qualifiers: &Qualifiers, id: LayoutId| -> Result<Option<u32>> {
            match qualifiers
                .layout_entry(id)
                .and_then(|entry| entry.value.constant())
            {
                Some(value) => u32::try_from(value).map(Some).map_err(|_| internal(at)),
                None => Ok(None),
            }
        };
        let block_location = explicit(outer, LayoutId::Location)?;
        if input
            && (xfb::has_xfb(outer) || block.members.iter().any(|m| xfb::has_xfb(&m.qualifiers)))
        {
            return Err(semantic(
                "xfb layout qualifier can only be used on an output",
                at,
            ));
        }
        let xfb_buffer = if input {
            None
        } else {
            xfb::layout_value(outer, LayoutId::XfbBuffer).or(self.xfb_default_buffer())
        };
        let mut declared = variable.ty.clone();
        if declared.outer_size() == Some(GlslArraySize::Unsized) {
            let size = self.implicit_sizes.get(&symbol).copied().ok_or_else(|| {
                unsupported(
                    "stage inputs and outputs without a size or a constant index",
                    at,
                )
            })?;
            declared.set_outer_size(GlslArraySize::Sized(size));
        }
        let block_dimensions = if per_vertex {
            declared.dimensions().get(1..).unwrap_or_default()
        } else {
            declared.dimensions()
        };
        let arrayed = !block_dimensions.is_empty();
        let mut members = Vec::with_capacity(block.members.len());
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        let mut member_locations = Vec::with_capacity(block.members.len());
        for (index, member) in (0_u32..).zip(&block.members) {
            let qualifiers = &member.qualifiers;
            let mut member_ty = member.ty.clone();
            if member_ty.outer_size() == Some(GlslArraySize::Unsized) {
                let size = self.member_sizes.get(&(id, index)).copied().unwrap_or(1);
                member_ty.set_outer_size(GlslArraySize::Sized(size.max(1)));
            }
            if qualifiers.flags.contains(QualifierFlags::INVARIANT) && input {
                return Err(semantic("invariant can only apply to an output", at));
            }
            if let Some(buffer) = xfb::layout_value(qualifiers, LayoutId::XfbBuffer)
                && xfb_buffer != Some(buffer)
            {
                return Err(semantic(
                    "xfb_buffer: member cannot contradict block (or what block inherited from global)",
                    at,
                ));
            }
            let ty = self.ir_type(&member_ty, at)?;
            self.layouter
                .update(self.module.to_ctx())
                .map_err(|_| internal(at))?;
            let layout = self.layouter[ty];
            offset = layout.alignment.round_up(offset);
            alignment = layout.alignment.max(alignment);
            let mut interpolation = qualifiers
                .interpolation
                .or(outer.interpolation)
                .map(interpolation_of);
            let mut sampling = if qualifiers.flags.contains(QualifierFlags::SAMPLE)
                || outer.flags.contains(QualifierFlags::SAMPLE)
            {
                Some(Sampling::Sample)
            } else if qualifiers.flags.contains(QualifierFlags::CENTROID)
                || outer.flags.contains(QualifierFlags::CENTROID)
            {
                Some(Sampling::Centroid)
            } else {
                None
            };
            if interpolation.is_none() && contains_float(&self.module.types, ty) {
                interpolation = Some(Interpolation::Perspective);
                sampling.get_or_insert(Sampling::Center);
            }
            let component = explicit(qualifiers, LayoutId::Component)?;
            member_locations.push(explicit(qualifiers, LayoutId::Location)?);
            members.push(crate::StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: Some(Binding::Location {
                    location: 0,
                    interpolation,
                    sampling,
                    blend_src: None,
                    per_primitive: self.per_primitive_binding(qualifiers),
                    component,
                    invariant: !input
                        && (qualifiers.flags.contains(QualifierFlags::INVARIANT)
                            || self.invariant_all),
                    patch,
                    per_view: qualifiers.flags.contains(QualifierFlags::PER_VIEW),
                    passthrough: input
                        && self.stage_is(crate::ShaderStage::Geometry)
                        && qualifiers.has_layout(LayoutId::Passthrough),
                }),
                offset,
                matrix_layout: None,
                xfb_offset: None,
                heap: None,
                memory_decorations: MemoryDecorations::empty(),
                relaxed_precision: false,
            });
            offset = offset.saturating_add(layout.size);
        }
        if let Some(buffer) = xfb_buffer {
            let explicit: Vec<(Handle<crate::Type>, Option<u32>)> = members
                .iter()
                .zip(&block.members)
                .map(|(member, declared)| {
                    (
                        member.ty,
                        xfb::layout_value(&declared.qualifiers, LayoutId::XfbOffset),
                    )
                })
                .collect();
            let offsets = self.xfb_member_offsets(
                xfb::layout_value(outer, LayoutId::XfbOffset),
                &explicit,
                at,
            )?;
            for ((member, declared), offset) in members.iter_mut().zip(&block.members).zip(offsets)
            {
                if let Some(stride) = xfb::layout_value(&declared.qualifiers, LayoutId::XfbStride) {
                    self.xfb_stride(buffer, stride, at)?;
                }
                if let Some(offset) = offset {
                    self.xfb_capture(buffer, offset, member.ty, at)?;
                }
                member.xfb_offset = offset;
            }
            if let Some(stride) = xfb::layout_value(outer, LayoutId::XfbStride) {
                self.xfb_stride(buffer, stride, at)?;
            }
        }
        let member_located = member_locations.iter().any(Option::is_some);
        let per_block = members
            .iter()
            .map(|member| self.member_location_count(member))
            .fold(0, u32::saturating_add);
        let elements = block_dimensions
            .iter()
            .map(|size| match *size {
                GlslArraySize::Sized(size) => size,
                _ => 1,
            })
            .fold(1, u32::saturating_mul);
        let total = per_block.saturating_mul(elements);
        let slot = usize::from(!input);
        let automatic_location = !member_located && block_location.is_none();
        let io = if member_located {
            if arrayed {
                return Err(semantic(
                    "cannot use in a block array where new locations are needed for each block element",
                    at,
                ));
            }
            if block_location.is_none() && member_locations.iter().any(Option::is_none) {
                return Err(semantic(
                    "either the block needs a location, or all members need a location, or no members have a location",
                    at,
                ));
            }
            let mut next = block_location;
            for (member, explicit) in members.iter_mut().zip(&member_locations) {
                let location = explicit.or(next).ok_or_else(|| internal(at))?;
                if let Some(Binding::Location {
                    location: ref mut slot,
                    ..
                }) = member.binding
                {
                    *slot = location;
                }
                next = Some(location.saturating_add(self.member_location_count(member)));
            }
            if self.options.auto_map_locations {
                self.auto_location(slot, total);
            }
            None
        } else {
            let start = match block_location {
                Some(location) => location,
                None if self.options.auto_map_locations => self.auto_location(slot, total),
                None => {
                    return Err(semantic(
                        "SPIR-V requires a location for user inputs and outputs",
                        at,
                    ));
                }
            };
            if members.iter().any(|member| {
                matches!(
                    member.binding,
                    Some(Binding::Location {
                        component: Some(_),
                        ..
                    })
                )
            }) {
                return Err(semantic(
                    "a block member with a component needs a location",
                    at,
                ));
            }
            let mut next = start;
            for member in &mut members {
                if let Some(Binding::Location {
                    ref mut location, ..
                }) = member.binding
                {
                    *location = next;
                }
                next = next.saturating_add(self.member_location_count(member));
            }
            Some(Binding::Location {
                location: start,
                interpolation: outer
                    .per_vertex
                    .map(|per_vertex| per_vertex_interpolation(per_vertex, outer.interpolation)),
                sampling: None,
                blend_src: None,
                per_primitive: false,
                component: None,
                invariant: false,
                patch: false,
                per_view: false,
                passthrough: false,
            })
        };
        let structure = self.module.types.insert(
            crate::Type {
                name: Some(block.name.clone()),
                inner: TypeInner::Struct {
                    members,
                    span: alignment.round_up(offset),
                },
            },
            at,
        );
        let ty = self.wrap_arrays(structure, declared.dimensions(), at)?;
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name,
                space: if input {
                    AddressSpace::Input
                } else {
                    AddressSpace::Output
                },
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        self.interface.push(handle);
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        if automatic_location {
            self.automatic_locations.push(handle);
        }
        if outer.flags.contains(QualifierFlags::PER_TASK) {
            self.task_memory.push(handle);
        }
        if input {
            self.passthrough(handle, outer);
        } else {
            self.output_stream(handle, outer);
        }
        if let Some(buffer) = xfb_buffer {
            self.xfb_global(handle, buffer, None);
        }
        if !input {
            for member in &block.members {
                self.block_outputs.insert(member.name.clone());
            }
        }
        Ok(())
    }

    pub(super) fn is_per_vertex_member(&self, symbol: SymbolId) -> bool {
        let Some(&SymbolKind::BlockMember { instance, .. }) =
            self.symbol(symbol).map(|symbol| &symbol.kind)
        else {
            return false;
        };
        let Some(variable) = self.variable(instance) else {
            return false;
        };
        let TypeKind::Block(id) = variable.ty.kind else {
            return false;
        };
        variable.origin == Origin::BuiltIn
            && !variable.ty.is_array()
            && self.analysis.types.block(id).is_some_and(|block| {
                block.name == "gl_PerVertex" && block.storage == BlockStorage::Out
            })
            && self.stage_map(|stage| {
                matches!(
                    stage,
                    crate::ShaderStage::Vertex
                        | crate::ShaderStage::TessEvaluation
                        | crate::ShaderStage::Geometry
                )
            })
    }

    pub(super) fn per_vertex_member(
        &self,
        symbol: SymbolId,
    ) -> Option<(Handle<GlobalVariable>, u32)> {
        let (global, ref members) = *self.per_vertex.as_ref()?;
        if !self.is_per_vertex_member(symbol) {
            return None;
        }
        let name = &self.symbol(symbol)?.name;
        let index = members.iter().position(|member| member == name)?;
        Some((global, u32::try_from(index).ok()?))
    }

    fn builtin_per_vertex(&self) -> Option<&'a rglsl_sema::types::BlockType> {
        self.builtin_name("gl_Position");
        let analysis = self.analysis;
        analysis
            .symbols
            .iter()
            .filter_map(|symbol| match symbol.kind {
                SymbolKind::Variable(ref variable)
                    if variable.origin == Origin::BuiltIn && !variable.ty.is_array() =>
                {
                    match variable.ty.kind {
                        TypeKind::Block(id) => analysis.types.block(id),
                        _ => None,
                    }
                }
                _ => None,
            })
            .find(|block| block.name == "gl_PerVertex" && block.storage == BlockStorage::Out)
    }

    fn declarator_size(
        &self,
        array: Option<&Spanned<rglsl_ast::ast::ArraySpecifier>>,
    ) -> Option<u32> {
        array
            .iter()
            .flat_map(|array| &array.node.dimensions)
            .find_map(|dimension| match dimension.node {
                rglsl_ast::ast::ArrayDimension::Sized(ref size) => self
                    .analysis
                    .expression(size.id)
                    .and_then(|info| info.value.as_ref())
                    .and_then(rglsl_sema::constant::Constant::scalar_i64)
                    .and_then(|size| u32::try_from(size).ok()),
                rglsl_ast::ast::ArrayDimension::Unsized => None,
            })
    }

    fn per_vertex_xfb(&mut self, structure: &'a BlockStructure, at: Span) -> Result<()> {
        let outer = Some(&structure.qualifier);
        let Some(buffer) =
            xfb::ast_layout_value(self, outer, LayoutId::XfbBuffer).or(self.xfb_default_buffer())
        else {
            return Ok(());
        };
        let block = self
            .builtin_per_vertex()
            .ok_or_else(|| internal(Span::UNDEFINED))?;
        let mut declared = Vec::new();
        for member in &structure.members {
            let qualifier = member.node.ty.node.qualifier.as_ref();
            let offset = xfb::ast_layout_value(self, qualifier, LayoutId::XfbOffset);
            let stride = xfb::ast_layout_value(self, qualifier, LayoutId::XfbStride);
            if xfb::ast_layout_value(self, qualifier, LayoutId::XfbBuffer)
                .is_some_and(|member_buffer| member_buffer != buffer)
            {
                return Err(semantic(
                    "xfb_buffer: member cannot contradict block (or what block inherited from global)",
                    at,
                ));
            }
            for declarator in &member.node.declarators {
                let name = declarator.node.name.node.clone();
                let Some((_, builtin)) = block.member(&name) else {
                    continue;
                };
                let mut glsl = builtin.ty.clone();
                if glsl.outer_size() == Some(GlslArraySize::Unsized)
                    && let Some(size) = self.declarator_size(declarator.node.array.as_ref())
                {
                    glsl.set_outer_size(GlslArraySize::Sized(size));
                }
                let ty = self.ir_type(&glsl, at)?;
                declared.push((name, ty, offset, stride));
            }
        }
        let explicit: Vec<(Handle<crate::Type>, Option<u32>)> = declared
            .iter()
            .map(|&(_, ty, offset, _)| (ty, offset))
            .collect();
        let offsets = self.xfb_member_offsets(
            xfb::ast_layout_value(self, outer, LayoutId::XfbOffset),
            &explicit,
            at,
        )?;
        let mut per_vertex = xfb::PerVertexXfb {
            buffer,
            offsets: alloc::collections::BTreeMap::new(),
        };
        for ((name, ty, _, stride), offset) in declared.into_iter().zip(offsets) {
            let Some(offset) = offset else {
                continue;
            };
            if let Some(stride) = stride {
                self.xfb_stride(buffer, stride, at)?;
            }
            self.xfb_capture(buffer, offset, ty, at)?;
            per_vertex.offsets.insert(name, offset);
        }
        self.xfb.per_vertex = Some(per_vertex);
        Ok(())
    }

    pub(super) fn declare_per_vertex(&mut self) -> Result<()> {
        if (self.per_vertex_used.is_empty()
            && !self.per_vertex_redeclared
            && !self.per_vertex_member_redeclared)
            || !self.stage_map(|stage| {
                matches!(
                    stage,
                    crate::ShaderStage::Vertex
                        | crate::ShaderStage::TessEvaluation
                        | crate::ShaderStage::Geometry
                )
            })
        {
            return Ok(());
        }
        self.builtin_name("gl_Position");
        let block = self
            .builtin_per_vertex()
            .ok_or_else(|| internal(Span::UNDEFINED))?;
        let outputs = variables::blocks_named("gl_PerVertex")
            .find(|block| block.size == BlockSize::Single)
            .ok_or_else(|| internal(Span::UNDEFINED))?;
        let mut requested: Vec<(String, Span)> = Vec::new();
        self.invariant.retain(|&(ref name, at)| {
            let per_vertex = outputs.member(name).is_some();
            if per_vertex {
                requested.push((name.clone(), at));
            }
            !per_vertex
        });
        let mut members = Vec::new();
        let mut names = Vec::new();
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        for row in outputs.members() {
            let name = row.name;
            let Some((_, member)) = block.member(name) else {
                continue;
            };
            let at = requested
                .iter()
                .find(|&&(ref requested, _)| requested == name)
                .map_or(Span::UNDEFINED, |&(_, at)| at);
            let used = self.per_vertex_used.contains(name);
            let invariant = member.qualifiers.flags.contains(QualifierFlags::INVARIANT)
                || self.invariant_all
                || requested
                    .iter()
                    .any(|&(ref requested, _)| requested == name);
            let builtin = match row.builtin().ok_or_else(|| internal(at))? {
                BuiltIn::Position { .. } => BuiltIn::Position { invariant },
                other => {
                    if invariant && used {
                        return Err(unsupported(
                            "invariant on built-in outputs other than gl_Position",
                            at,
                        ));
                    }
                    other
                }
            };
            let ty = if variables::clip_or_cull_distance(name) {
                let size = match member.ty.outer_size() {
                    Some(GlslArraySize::Sized(size)) => Some(size),
                    _ => None,
                }
                .or_else(|| self.builtin_sizes.get(name).copied())
                .or((!used).then_some(1))
                .ok_or_else(|| {
                    unsupported(format!("`{name}` without a size or a constant index"), at)
                })?;
                let element = GlslType::scalar(Scalar::Float);
                self.ir_type(&element.array_of(GlslArraySize::Sized(size)), at)?
            } else {
                self.ir_type(&member.ty, at)?
            };
            self.layouter
                .update(self.module.to_ctx())
                .map_err(|_| internal(at))?;
            let layout = self.layouter[ty];
            offset = layout.alignment.round_up(offset);
            alignment = layout.alignment.max(alignment);
            let xfb_offset = self
                .xfb
                .per_vertex
                .as_ref()
                .and_then(|per_vertex| per_vertex.offsets.get(name).copied());
            members.push(crate::StructMember {
                name: Some(String::from(name)),
                ty,
                binding: Some(Binding::BuiltIn(builtin)),
                offset,
                matrix_layout: None,
                xfb_offset,
                heap: None,
                memory_decorations: MemoryDecorations::empty(),
                relaxed_precision: false,
            });
            offset = offset.saturating_add(layout.size);
            names.push(String::from(name));
        }
        if members.is_empty() {
            return Ok(());
        }
        let ty = self.module.types.insert(
            crate::Type {
                name: Some(String::from("gl_PerVertex")),
                inner: TypeInner::Struct {
                    members,
                    span: alignment.round_up(offset),
                },
            },
            Span::UNDEFINED,
        );
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: None,
                space: AddressSpace::Output,
                binding: None,
                ty,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: None,
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            match (self.debug.is_some(), self.per_vertex_first_use) {
                (true, Some(first)) => Span::new(first, first),
                _ => Span::UNDEFINED,
            },
        );
        self.interface.push(handle);
        self.per_vertex = Some((handle, names));
        if self.xfb_default_buffer().is_some() {
            let buffer = self
                .xfb
                .per_vertex
                .as_ref()
                .map_or(0, |per_vertex| per_vertex.buffer);
            self.xfb_global(handle, buffer, None);
        }
        Ok(())
    }

    fn builtin_redeclaration(
        &mut self,
        symbol: SymbolId,
        list: &'a InitDeclaratorList,
        declarator: &'a Node<InitDeclarator>,
        at: Span,
    ) -> Result<()> {
        let name = self
            .symbol(symbol)
            .map(|symbol| symbol.name.clone())
            .ok_or_else(|| internal(at))?;
        let size = self.declarator_size(declarator.kind.array.as_ref());
        if let Some(size) = size {
            self.builtin_sizes.insert(name.clone(), size);
        }
        let qualifier = list.ty.node.qualifier.as_ref();
        if has_qualifier(qualifier, |q| matches!(q, SingleTypeQualifier::Invariant)) {
            self.invariant.push((name.clone(), at));
        }
        for (layout, raw) in layout_entries(qualifier) {
            match (layout, name.as_str()) {
                (Some(LayoutId::ViewportRelative), "gl_Layer") => {
                    self.layer_layout.viewport_relative = true;
                    self.layer_layout.redeclared = Some(symbol);
                    continue;
                }
                (Some(LayoutId::SecondaryViewOffset), "gl_Layer") => {
                    self.layer_layout.secondary_view_offset =
                        xfb::ast_layout_signed(self, qualifier, LayoutId::SecondaryViewOffset)
                            .and_then(|value| i32::try_from(value).ok());
                    self.layer_layout.redeclared = Some(symbol);
                    continue;
                }
                (Some(LayoutId::OverrideCoverage), "gl_SampleMask") => {
                    self.override_coverage = true;
                    continue;
                }
                (Some(LayoutId::OriginUpperLeft), "gl_FragCoord") => continue,
                (Some(LayoutId::PixelCenterInteger), "gl_FragCoord") => {
                    return Err(semantic(
                        "`pixel_center_integer` is not allowed in Vulkan: the PixelCenterInteger execution mode must not be used",
                        at,
                    ));
                }
                _ => {}
            }
            let depth = match layout {
                Some(LayoutId::DepthAny) => None,
                Some(LayoutId::DepthGreater) => Some(ConservativeDepth::GreaterEqual),
                Some(LayoutId::DepthLess) => Some(ConservativeDepth::LessEqual),
                Some(LayoutId::DepthUnchanged) => Some(ConservativeDepth::Unchanged),
                _ => {
                    return Err(unsupported(
                        format!("the layout qualifier `{raw}` on `{name}`"),
                        at,
                    ));
                }
            };
            if name != "gl_FragDepth" {
                return Err(unsupported(
                    format!("depth layout qualifiers on `{name}`"),
                    at,
                ));
            }
            self.conservative_depth = depth;
        }
        if self.is_per_vertex_member(symbol) {
            self.per_vertex_member_redeclared = true;
        } else if self
            .analysis
            .builtins
            .variable(symbol)
            .is_some_and(|row| row.builtin().is_some())
        {
            let without_size =
                variables::implicitly_sized(&name) && !self.builtin_sizes.contains_key(&name);
            if without_size {
                self.unused_redeclarations.push((symbol, name, at));
            } else {
                self.global_ref(symbol, at)?;
            }
        }
        Ok(())
    }

    pub(super) fn declare_unused_redeclarations(&mut self) -> Result<()> {
        let pending = core::mem::take(&mut self.unused_redeclarations);
        for (symbol, name, at) in pending {
            if self.globals.contains_key(&symbol) {
                continue;
            }
            self.builtin_sizes.entry(name).or_insert(1);
            if let GlobalRef::Variable(handle) = self.global_ref(symbol, at)? {
                self.redeclared_globals.insert(handle);
            }
        }
        Ok(())
    }

    pub(super) fn finish_interface(&mut self) {
        let invariant = core::mem::take(&mut self.invariant);
        for (name, at) in invariant {
            let result = self.make_invariant(&name, at);
            self.report(result);
        }
        if self.invariant_all {
            let builtins: Vec<(String, Handle<GlobalVariable>)> = self
                .builtins
                .iter()
                .map(|(name, handle)| (name.clone(), *handle))
                .collect();
            for (name, handle) in builtins {
                if self.module.global_variables[handle].space != AddressSpace::Output {
                    continue;
                }
                let result = self.make_invariant(&name, Span::UNDEFINED);
                self.report(result);
            }
            let outputs: Vec<Handle<GlobalVariable>> = self.outputs.values().copied().collect();
            for handle in outputs {
                if let Some(Binding::Location {
                    ref mut invariant, ..
                }) = self.module.global_variables.get_mut(handle).io
                {
                    *invariant = true;
                }
            }
        }
        let fragment = self.analysis.fragment;
        if !self.object
            && fragment.post_depth_coverage
            && !(self.early_fragment_tests || fragment.early_fragment_tests)
        {
            self.errors.push(semantic(
                "post_depth_coverage requires early_fragment_tests",
                Span::UNDEFINED,
            ));
        }
        if !self.object && !self.options.export_functions {
            for (handle, conflict) in
                crate::proc::SharedBlocks::of(&self.module.global_variables, true).conflicts()
            {
                self.errors.push(match conflict {
                    crate::proc::SharedBlockConflict::Mixed => Error {
                        kind: ErrorKind::Link(String::from(
                            "cannot mix use of shared variables inside and outside blocks",
                        )),
                        meta: Span::UNDEFINED,
                    },
                    crate::proc::SharedBlockConflict::RestrictAliased => semantic(
                        "`restrict` on aliased shared memory blocks is not supported: SPIR-V forbids decorating a Workgroup variable with both Aliased and Restrict",
                        self.module.global_variables.get_span(handle),
                    ),
                });
            }
        }
        self.check_shared_layouts();
        self.finish_xfb();
        self.assign_bindings();
    }

    fn check_shared_layouts(&mut self) {
        fn collect(
            types: &crate::UniqueArena<crate::Type>,
            ty: Handle<crate::Type>,
            found: &mut alloc::collections::BTreeSet<Handle<crate::Type>>,
        ) {
            let mut pending = alloc::vec![ty];
            while let Some(ty) = pending.pop() {
                match types[ty].inner {
                    TypeInner::Struct { ref members, .. } => {
                        if found.insert(ty) {
                            pending.extend(members.iter().rev().map(|member| member.ty));
                        }
                    }
                    TypeInner::Array { base, .. } | TypeInner::BindingArray { base, .. } => {
                        pending.push(base);
                    }
                    _ => {}
                }
            }
        }
        let mut laid_out = alloc::collections::BTreeSet::new();
        let mut interface = alloc::collections::BTreeSet::new();
        for (_, global) in self.module.global_variables.iter() {
            match global.space {
                AddressSpace::Uniform | AddressSpace::Storage { .. } | AddressSpace::Immediate => {
                    collect(&self.module.types, global.ty, &mut laid_out);
                }
                AddressSpace::Input | AddressSpace::Output => {
                    collect(&self.module.types, global.ty, &mut interface);
                }
                _ => {}
            }
        }
        if let Some(&shared) = laid_out.intersection(&interface).next() {
            let at = self.module.types.get_span(shared);
            self.errors.push(unsupported(
                "a structure used both in a block and in a stage input or output",
                at,
            ));
        }
    }

    fn make_invariant(&mut self, name: &str, at: Span) -> Result<()> {
        if let Some(&handle) = self.outputs.get(name) {
            if let Some(Binding::Location {
                ref mut invariant, ..
            }) = self.module.global_variables.get_mut(handle).io
            {
                *invariant = true;
            }
            return Ok(());
        }
        if self.inputs.contains(name) {
            return Err(semantic("invariant can only apply to an output", at));
        }
        if self.block_outputs.contains(name) {
            return Err(unsupported(
                "invariant on a member of an output block outside the block",
                at,
            ));
        }
        let Some(&handle) = self.builtins.get(name) else {
            return Ok(());
        };
        let global = self.module.global_variables.get_mut(handle);
        match global.io {
            Some(Binding::BuiltIn(BuiltIn::Position { ref mut invariant }))
                if global.space == AddressSpace::Output =>
            {
                *invariant = true;
                Ok(())
            }
            _ if global.space == AddressSpace::Output => Err(unsupported(
                "invariant on built-in outputs other than gl_Position",
                at,
            )),
            _ => Err(semantic("invariant can only apply to an output", at)),
        }
    }

    fn assign_bindings(&mut self) {
        self.automatic_bindings.clone_from(&self.unbound);
        let mut unbound = core::mem::take(&mut self.unbound);
        let shifts = &self.options.binding_shifts;
        shifts.shift_explicit(
            &mut self.module,
            &unbound.iter().map(|&(handle, _)| handle).collect(),
        );
        if unbound.is_empty() {
            return;
        }
        unbound.sort_by_key(|&(_, set)| set.is_none());
        let mut live = crate::compact::live_global_variables(&self.module);
        let functions: Vec<&crate::Function> = if self.object && self.reachable.is_some() {
            self.reachable_functions().collect()
        } else {
            self.module
                .functions
                .iter()
                .map(|(_, function)| function)
                .collect()
        };
        let entries = self.module.entry_points.iter().map(|entry| &entry.function);
        for function in functions.into_iter().chain(entries) {
            for (_, expression) in function.expressions.iter() {
                if let crate::Expression::GlobalVariable(global) = *expression {
                    live.insert(global);
                }
            }
        }
        let mut taken: alloc::collections::BTreeMap<u32, alloc::collections::BTreeSet<u32>> =
            alloc::collections::BTreeMap::new();
        for (_, global) in self.module.global_variables.iter() {
            if let Some(ref binding) = global.binding {
                taken
                    .entry(binding.group)
                    .or_default()
                    .insert(binding.binding);
            }
        }
        for (handle, set) in unbound {
            let group = set.unwrap_or(0);
            let binding = if live.contains(handle) {
                let base =
                    shifts.base_of(&self.module, &self.module.global_variables[handle], group);
                let used = taken.entry(group).or_default();
                let free = crate::proc::free_binding(used, base);
                used.insert(free);
                free
            } else {
                0
            };
            self.module.global_variables.get_mut(handle).binding =
                Some(ResourceBinding { group, binding });
        }
    }
}

impl super::function::FunctionLowerer<'_, '_> {
    pub(super) fn global_ref(&mut self, symbol: SymbolId, at: Span) -> Result<GlobalRef> {
        if let Some(found) = self.lw.globals.get(&symbol).copied() {
            return Ok(found);
        }
        if let Some((name, span)) = self.lw.deferred_private.remove(&symbol) {
            let variable = self.lw.variable(symbol).ok_or_else(|| internal(at))?;
            let (ty, qualifiers) = (variable.ty.clone(), variable.qualifiers.clone());
            let ty = recurse(|| self.variable_ir_type(&ty, &qualifiers, span))?;
            let global = self.lw.ray_query_global(name, ty, span);
            let found = GlobalRef::Variable(global);
            self.lw.globals.insert(symbol, found);
            self.lw.function_private.insert(global);
            return Ok(found);
        }
        if self.lw.has_local_size_ids() && self.lw.is_work_group_size(symbol) {
            let handle = self.lw.work_group_size_override(at)?;
            self.lw.globals.insert(symbol, GlobalRef::Override(handle));
            return Ok(GlobalRef::Override(handle));
        }
        let analysis = self.lw.analysis;
        let record = self.lw.symbol(symbol).ok_or_else(|| internal(at))?;
        let (ty, output, value, volatile) = match record.kind {
            SymbolKind::Variable(ref variable) => {
                if variable.origin != Origin::BuiltIn {
                    return Err(internal(at));
                }
                if let Some(handle) = recurse(|| self.builtin_override(symbol, variable, at))? {
                    return Ok(handle);
                }
                if self.lw.is_per_vertex_array(symbol) {
                    return recurse(|| self.per_vertex_array(symbol, at));
                }
                (
                    variable.ty.clone(),
                    variable.qualifiers.storage == Storage::Out,
                    variable.value.as_ref(),
                    variable.qualifiers.flags.contains(QualifierFlags::VOLATILE),
                )
            }
            SymbolKind::BlockMember { instance, index } => {
                let instance = self.lw.variable(instance).ok_or_else(|| internal(at))?;
                let TypeKind::Block(block) = instance.ty.kind else {
                    return Err(internal(at));
                };
                let block = analysis.types.block(block).ok_or_else(|| internal(at))?;
                let member = block
                    .members
                    .get(usize::try_from(index).map_err(|_| internal(at))?)
                    .ok_or_else(|| internal(at))?;
                (
                    member.ty.clone(),
                    block.storage == BlockStorage::Out,
                    None,
                    false,
                )
            }
            SymbolKind::Struct(_)
            | SymbolKind::Reference(_)
            | SymbolKind::BufferType(_)
            | SymbolKind::BlockName => return Err(internal(at)),
        };
        let name = record.name.clone();
        let found = match value {
            Some(value) => {
                let ir = recurse(|| self.ir_type(&ty, at))?;
                let init = recurse(|| self.global_constant(&ty, &value.values, at))?;
                let handle = self.lw.module.constants.append(
                    crate::Constant {
                        name: Some(name),
                        ty: ir,
                        init,
                    },
                    at,
                );
                GlobalRef::Constant(handle)
            }
            None => GlobalRef::Variable(recurse(|| {
                self.builtin_variable(
                    String::from(&name),
                    analysis.builtins.variable(symbol),
                    ty.clone(),
                    output,
                    volatile,
                    at,
                )
            })?),
        };
        self.lw.globals.insert(symbol, found);
        Ok(found)
    }

    fn builtin_variable(
        &mut self,
        name: String,
        row: Option<&'static BuiltinVariable>,
        ty: GlslType,
        output: bool,
        volatile: bool,
        at: Span,
    ) -> Result<Handle<GlobalVariable>> {
        let name = name.as_str();
        let ty = &ty;
        let (row, builtin) = row
            .and_then(|row| Some((row, row.builtin()?)))
            .ok_or_else(|| unsupported(format!("the built-in variable `{name}`"), at))?;
        let key = row.global_key();
        if let Some(handle) = self.lw.builtins.get(key).copied() {
            return Ok(handle);
        }
        let builtin = match builtin {
            BuiltIn::Layer { .. } => BuiltIn::Layer {
                viewport_relative: self.lw.layer_layout.viewport_relative,
                secondary_view_offset: self.lw.layer_layout.secondary_view_offset,
            },
            BuiltIn::SampleMask { .. } if output => BuiltIn::SampleMask {
                override_coverage: self.lw.override_coverage,
            },
            other => other,
        };
        let ir = if variables::implicitly_sized(name) {
            let size = (self
                .lw
                .builtin_sizes
                .get(name)
                .copied()
                .or(match ty.outer_size() {
                    Some(GlslArraySize::Sized(size)) => Some(size),
                    _ => None,
                })
                .ok_or_else(|| {
                    unsupported(format!("`{name}` without a size or a constant index"), at)
                }))?;
            let element = ty.element_type().ok_or_else(|| internal(at))?;
            let sized = element.array_of(GlslArraySize::Sized(size));
            { recurse(|| self.ir_type(&sized, at)) }?
        } else if let BuiltIn::ShaderBallot(ShaderBallot::Mask(_)) = builtin {
            { recurse(|| self.ir_type(&GlslType::vector(Scalar::Uint, 4), at)) }?
        } else if row.has(VariableFlags::TRANSPOSED) {
            { recurse(|| self.ir_type(&GlslType::matrix(Scalar::Float, 4, 3), at)) }?
        } else {
            { recurse(|| self.ir_type(ty, at)) }?
        };
        let memory_decorations = if volatile {
            MemoryDecorations::VOLATILE
        } else {
            self.lw.ray_builtin_decorations(builtin)
        };
        let handle = self.lw.module.global_variables.append(
            GlobalVariable {
                name: Some(String::from(row.global_name())),
                space: if output {
                    AddressSpace::Output
                } else {
                    AddressSpace::Input
                },
                binding: None,
                ty: ir,
                init: None,
                memory_decorations,
                io: Some(Binding::BuiltIn(builtin)),
                xfb: None,
                input_attachment_index: None,
                heap_offset: None,
                tile_attachment: false,
                spirv_decorations: Vec::new(),
                relaxed_precision: false,
                immediate_bank: None,
                block: None,
            },
            at,
        );
        self.lw.interface.push(handle);
        self.lw.builtins.insert(String::from(key), handle);
        Ok(handle)
    }
}

pub(super) fn location_count(module: &crate::Module, ty: Handle<crate::Type>) -> u32 {
    enum Task {
        Visit(Handle<crate::Type>),
        Scale(u32),
        Sum(usize),
    }
    const fn vector_locations(size: crate::VectorSize, scalar: crate::Scalar) -> u32 {
        match (size, scalar.width) {
            (crate::VectorSize::Tri | crate::VectorSize::Quad, 8) => 2,
            _ => 1,
        }
    }
    let types = &module.types;
    let mut tasks = alloc::vec![Task::Visit(ty)];
    let mut counts: Vec<u32> = Vec::new();
    while let Some(task) = tasks.pop() {
        match task {
            Task::Visit(ty) => match types[ty].inner {
                TypeInner::Vector { size, scalar } => counts.push(vector_locations(size, scalar)),
                TypeInner::Matrix {
                    columns,
                    rows,
                    scalar,
                } => counts.push((columns as u32).saturating_mul(vector_locations(rows, scalar))),
                TypeInner::Array { base, size, .. } => match size.resolve(module.to_ctx()) {
                    Ok(crate::proc::IndexableLength::Known(length)) => {
                        tasks.push(Task::Scale(length));
                        tasks.push(Task::Visit(base));
                    }
                    _ => counts.push(1),
                },
                TypeInner::Struct { ref members, .. } => {
                    tasks.push(Task::Sum(members.len()));
                    tasks.extend(members.iter().rev().map(|member| Task::Visit(member.ty)));
                }
                _ => counts.push(1),
            },
            Task::Scale(length) => {
                let count = counts.pop().unwrap_or(1);
                counts.push(length.saturating_mul(count));
            }
            Task::Sum(members) => {
                let start = counts.len().saturating_sub(members);
                let sum = counts.drain(start..).fold(0, u32::saturating_add);
                counts.push(sum);
            }
        }
    }
    counts.pop().unwrap_or(1)
}

fn contains_float(types: &crate::UniqueArena<crate::Type>, ty: Handle<crate::Type>) -> bool {
    let mut pending = alloc::vec![ty];
    while let Some(ty) = pending.pop() {
        match types[ty].inner {
            TypeInner::Scalar(scalar)
            | TypeInner::Vector { scalar, .. }
            | TypeInner::Matrix { scalar, .. } => {
                if scalar.kind == crate::ScalarKind::Float {
                    return true;
                }
            }
            TypeInner::Array { base, .. } => pending.push(base),
            TypeInner::Struct { ref members, .. } => {
                pending.extend(members.iter().rev().map(|member| member.ty));
            }
            _ => {}
        }
    }
    false
}
