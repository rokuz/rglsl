use alloc::{format, string::String, vec, vec::Vec};

use rglsl_ast::ast::{
    BlockInstance, BlockStructure, Declaration, DeclarationKind, ExternalDeclaration,
    InitDeclarator, InitDeclaratorList, Initializer, InterpolationQualifier, Node,
    SingleTypeQualifier, Spanned, StorageQualifier, TypeQualifier,
};
use rglsl_sema::scope::{Origin, Qualifiers, Storage, SymbolKind, Variable};
use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockId, BlockStorage, OpaqueKind, Scalar, Type as GlslType,
    TypeKind,
};
use rglsl_sema::SymbolId;

use super::types::{image_dimension, sampled_kind};
use super::{internal, semantic, unsupported, GlobalRef, Initialization, Lowerer, Packing, Result};
use super::{specialization, xfb};
use crate::proc::Alignment;
use crate::{
    AddressSpace, Binding, BuiltIn, ConservativeDepth, GlobalVariable, Handle, ImageClass,
    Interpolation, MemoryDecorations, ResourceBinding, Sampling, Span, StorageAccess,
    StorageFormat, TypeInner,
};

fn layout_names(qualifier: Option<&Spanned<TypeQualifier>>) -> Vec<&str> {
    let mut names = Vec::new();
    for single in qualifier.iter().flat_map(|q| &q.qualifiers) {
        if let SingleTypeQualifier::Layout(ref layout) = single.node {
            names.extend(layout.ids.iter().map(|id| id.name.node.as_str()));
        }
    }
    names
}

fn has_qualifier(
    qualifier: Option<&Spanned<TypeQualifier>>,
    test: impl Fn(&SingleTypeQualifier) -> bool,
) -> bool {
    qualifier
        .iter()
        .flat_map(|q| &q.qualifiers)
        .any(|single| test(&single.node))
}

fn storage_of(qualifier: Option<&Spanned<TypeQualifier>>) -> Option<StorageQualifier> {
    qualifier
        .iter()
        .flat_map(|q| &q.qualifiers)
        .find_map(|single| match single.node {
            SingleTypeQualifier::Storage(
                storage @ (StorageQualifier::In
                | StorageQualifier::Out
                | StorageQualifier::Uniform
                | StorageQualifier::Buffer),
            ) => Some(storage),
            _ => None,
        })
}

const PER_VERTEX: [&str; 4] = [
    "gl_Position",
    "gl_PointSize",
    "gl_ClipDistance",
    "gl_CullDistance",
];

const fn interpolation_of(qualifier: InterpolationQualifier) -> Interpolation {
    match qualifier {
        InterpolationQualifier::Flat => Interpolation::Flat,
        InterpolationQualifier::Noperspective => Interpolation::Linear,
        InterpolationQualifier::Smooth => Interpolation::Perspective,
    }
}

fn image_format(word: &str) -> Option<StorageFormat> {
    use StorageFormat as Sf;
    Some(match word {
        "rgba32f" => Sf::Rgba32Float,
        "rgba16f" => Sf::Rgba16Float,
        "rg32f" => Sf::Rg32Float,
        "rg16f" => Sf::Rg16Float,
        "r11f_g11f_b10f" => Sf::Rg11b10Ufloat,
        "r32f" => Sf::R32Float,
        "r16f" => Sf::R16Float,
        "rgba16" => Sf::Rgba16Unorm,
        "rgb10_a2ui" => Sf::Rgb10a2Uint,
        "rgb10_a2" => Sf::Rgb10a2Unorm,
        "rgba8" => Sf::Rgba8Unorm,
        "rg16" => Sf::Rg16Unorm,
        "rg8" => Sf::Rg8Unorm,
        "r16" => Sf::R16Unorm,
        "r8" => Sf::R8Unorm,
        "rgba16_snorm" => Sf::Rgba16Snorm,
        "rgba8_snorm" => Sf::Rgba8Snorm,
        "rg16_snorm" => Sf::Rg16Snorm,
        "rg8_snorm" => Sf::Rg8Snorm,
        "r16_snorm" => Sf::R16Snorm,
        "r8_snorm" => Sf::R8Snorm,
        "rgba32i" => Sf::Rgba32Sint,
        "rgba16i" => Sf::Rgba16Sint,
        "rgba8i" => Sf::Rgba8Sint,
        "rg32i" => Sf::Rg32Sint,
        "rg16i" => Sf::Rg16Sint,
        "rg8i" => Sf::Rg8Sint,
        "r32i" => Sf::R32Sint,
        "r16i" => Sf::R16Sint,
        "r8i" => Sf::R8Sint,
        "rgba32ui" => Sf::Rgba32Uint,
        "rgba16ui" => Sf::Rgba16Uint,
        "rgba8ui" => Sf::Rgba8Uint,
        "r64ui" => Sf::R64Uint,
        "rg32ui" => Sf::Rg32Uint,
        "rg16ui" => Sf::Rg16Uint,
        "rg8ui" => Sf::Rg8Uint,
        "r32ui" => Sf::R32Uint,
        "r16ui" => Sf::R16Uint,
        "r8ui" => Sf::R8Uint,
        _ => return None,
    })
}

fn access(qualifiers: &Qualifiers) -> StorageAccess {
    if qualifiers.readonly {
        StorageAccess::LOAD
    } else if qualifiers.writeonly {
        StorageAccess::STORE
    } else {
        StorageAccess::LOAD | StorageAccess::STORE
    }
}

fn memory(qualifiers: &Qualifiers) -> MemoryDecorations {
    let mut decorations = MemoryDecorations::empty();
    if qualifiers.coherent {
        decorations |= MemoryDecorations::COHERENT;
    }
    if qualifiers.volatile {
        decorations |= MemoryDecorations::VOLATILE;
    }
    decorations
}

fn builtin_of(name: &str) -> Option<BuiltIn> {
    Some(match name {
        "gl_Position" | "gl_FragCoord" => BuiltIn::Position { invariant: false },
        "gl_PointSize" => BuiltIn::PointSize,
        "gl_ClipDistance" => BuiltIn::ClipDistances,
        "gl_CullDistance" => BuiltIn::CullDistance,
        "gl_VertexIndex" => BuiltIn::VertexIndex,
        "gl_InstanceIndex" => BuiltIn::InstanceIndex,
        "gl_BaseVertex" => BuiltIn::BaseVertex,
        "gl_BaseInstance" => BuiltIn::BaseInstance,
        "gl_DrawID" => BuiltIn::DrawIndex,
        "gl_FrontFacing" => BuiltIn::FrontFacing,
        "gl_FragDepth" => BuiltIn::FragDepth,
        "gl_PointCoord" => BuiltIn::PointCoord,
        "gl_PrimitiveID" => BuiltIn::PrimitiveIndex,
        "gl_SampleID" => BuiltIn::SampleIndex,
        "gl_NumWorkGroups" => BuiltIn::NumWorkGroups,
        "gl_WorkGroupID" => BuiltIn::WorkGroupId,
        "gl_LocalInvocationID" => BuiltIn::LocalInvocationId,
        "gl_GlobalInvocationID" => BuiltIn::GlobalInvocationId,
        "gl_LocalInvocationIndex" => BuiltIn::LocalInvocationIndex,
        _ => return None,
    })
}

impl<'a> Lowerer<'a> {
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
                .layout_entry("location")
                .and_then(|entry| entry.value)
                .and_then(|value| u32::try_from(value).ok())
        };
        let mut ranges = Vec::new();
        let mut push = |start: u32, count: u32| ranges.push((start, start.saturating_add(count)));
        let block = match variable.ty.kind {
            TypeKind::Block(id) => self.analysis.types.block(id),
            _ => None,
        };
        match block {
            Some(block) => {
                let mut next = location_of(&block.qualifiers);
                for member in &block.members {
                    let count = self.glsl_location_count(&member.ty);
                    let start = location_of(&member.qualifiers).or(next);
                    if let Some(start) = start {
                        push(start, count);
                    }
                    next = start.map(|start| start.saturating_add(count));
                }
            }
            None => {
                if let Some(start) = location_of(&variable.qualifiers) {
                    push(start, self.glsl_location_count(&variable.ty));
                }
            }
        }
        ranges
    }

    fn glsl_location_count(&self, ty: &GlslType) -> u32 {
        let wide = |scalar: Scalar, size: u8| u32::from(scalar == Scalar::Double && size > 2) + 1;
        let members = |members: &[rglsl_sema::types::Member]| {
            members
                .iter()
                .map(|member| self.glsl_location_count(&member.ty))
                .fold(0, u32::saturating_add)
        };
        let element = match ty.kind {
            TypeKind::Vector { scalar, size } => wide(scalar, size),
            TypeKind::Matrix {
                scalar,
                columns,
                rows,
            } => u32::from(columns).saturating_mul(wide(scalar, rows)),
            TypeKind::Struct(id) => self
                .analysis
                .types
                .structure(id)
                .map_or(1, |structure| members(&structure.members)),
            TypeKind::Block(id) => self
                .analysis
                .types
                .block(id)
                .map_or(1, |block| members(&block.members)),
            _ => 1,
        };
        ty.array
            .iter()
            .map(|size| match *size {
                GlslArraySize::Sized(length) => length,
                GlslArraySize::Specialized(_) | GlslArraySize::Unsized => 1,
            })
            .fold(element, u32::saturating_mul)
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
            DeclarationKind::InitDeclaratorList(ref list) => list.ty.qualifier.iter().collect(),
            DeclarationKind::Block { ref structure, .. } => core::iter::once(&structure.qualifier)
                .chain(
                    structure
                        .members
                        .iter()
                        .filter_map(|member| member.ty.qualifier.as_ref()),
                )
                .collect(),
            DeclarationKind::Qualifier(ref qualifier)
            | DeclarationKind::QualifiedIdentifiers { ref qualifier, .. } => vec![qualifier],
            DeclarationKind::FunctionPrototype(_) | DeclarationKind::Precision { .. } => Vec::new(),
        };
        if let Some(qualifier) = qualifiers.into_iter().find(|&qualifier| {
            layout_names(Some(qualifier))
                .iter()
                .any(|name| name.starts_with("xfb_"))
        }) {
            if self.xfb.default_buffer.is_none() {
                return Err(semantic(
                    "transform feedback qualifier: not supported in this stage",
                    self.at(qualifier.span),
                ));
            }
            self.xfb.mode = true;
        }
        match declaration.kind {
            DeclarationKind::FunctionPrototype(_) | DeclarationKind::Precision { .. } => Ok(()),
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
                if has_qualifier(qualifier, |q| matches!(q, SingleTypeQualifier::Precise)) {
                    return Err(unsupported("`precise`", self.at(declaration.span)));
                }
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
        let names = layout_names(Some(qualifier));
        match storage_of(Some(qualifier)) {
            Some(storage @ (StorageQualifier::Uniform | StorageQualifier::Buffer)) => {
                let defaults = if storage == StorageQualifier::Buffer {
                    &mut self.buffer_defaults
                } else {
                    &mut self.uniform_defaults
                };
                for name in names {
                    match name {
                        "std140" | "shared" | "packed" => defaults.packing = Some(Packing::Std140),
                        "std430" => defaults.packing = Some(Packing::Std430),
                        "row_major" => defaults.row_major = Some(true),
                        "column_major" => defaults.row_major = Some(false),
                        "scalar" => return Err(unsupported("the `scalar` block layout", at)),
                        _ => {}
                    }
                }
                Ok(())
            }
            Some(StorageQualifier::In) => {
                for name in names {
                    match name {
                        "early_fragment_tests" => self.early_fragment_tests = true,
                        "post_depth_coverage" => self.post_depth_coverage = Some(at),
                        "local_size_x_id" | "local_size_y_id" | "local_size_z_id" => {
                            let id = xfb::ast_layout_value(self, Some(qualifier), name)
                                .filter(|value| *value != u32::MAX)
                                .ok_or_else(|| {
                                    semantic("the specialization id is out of range", at)
                                })?;
                            if let Some(slot) = specialization::local_size_index(name)
                                .and_then(|index| self.local_size_ids.get_mut(index))
                            {
                                *slot = Some(id);
                            }
                        }
                        _ => {}
                    }
                }
                Ok(())
            }
            Some(StorageQualifier::Out) => {
                let qualifier = Some(qualifier);
                if let Some(buffer) = xfb::ast_layout_value(self, qualifier, "xfb_buffer") {
                    self.xfb.default_buffer = Some(buffer);
                }
                if let (Some(buffer), Some(stride)) = (
                    self.xfb.default_buffer,
                    xfb::ast_layout_value(self, qualifier, "xfb_stride"),
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
        let name = declarator.name.node.clone();
        let qualifiers = &variable.qualifiers;
        let ty = &variable.ty;
        if qualifiers.precise {
            return Err(unsupported("`precise`", at));
        }
        if qualifiers.constant {
            if let Some(entry) = qualifiers.layout_entry("constant_id") {
                let id = entry
                    .value
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
            if qualifiers.specialization {
                if let Some(&Initializer::Expression(ref expression)) = declarator
                    .initializer
                    .as_ref()
                    .map(|initializer| &initializer.node)
                {
                    let handle = self.specialization(expression, Some(name), at)?;
                    self.globals.insert(symbol, GlobalRef::Override(handle));
                    return Ok(());
                }
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
            Storage::Uniform => self.resource(symbol, name, at),
            Storage::Shared => {
                let ir = self.ir_type(ty, at)?;
                let handle = self.module.global_variables.append(
                    GlobalVariable {
                        name: Some(name),
                        space: AddressSpace::WorkGroup,
                        binding: None,
                        ty: ir,
                        init: None,
                        memory_decorations: memory(qualifiers),
                        io: None,
                        xfb: None,
                    },
                    at,
                );
                self.globals.insert(symbol, GlobalRef::Variable(handle));
                Ok(())
            }
            Storage::Buffer | Storage::Inout => Err(internal(at)),
            Storage::None => self.private(symbol, name, declarator, at),
        }
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
        let ir = self.ir_type(ty, at)?;
        let mut init = None;
        let mut runtime = None;
        if let Some(ref initializer) = declarator.initializer {
            let constant = match initializer.node {
                Initializer::Expression(ref expression) => analysis
                    .expression(expression.id)
                    .filter(|info| info.is_constant && !info.is_specialization)
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
                Some(values) => init = Some(self.global_constant(ty, &values, at)?),
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
            },
            at,
        );
        self.globals.insert(symbol, GlobalRef::Variable(handle));
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
        if qualifiers.patch {
            return Err(unsupported("`patch`", at));
        }
        if qualifiers.invariant && input {
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
            if let Some(first) = declared.array.first_mut() {
                *first = GlslArraySize::Sized(size);
            }
        }
        let ty = self.ir_type(&declared, at)?;
        let location = match qualifiers.layout_entry("location").and_then(|e| e.value) {
            Some(location) => u32::try_from(location).map_err(|_| internal(at))?,
            None if self.options.auto_map_locations => {
                let count = location_count(&self.module, ty);
                self.auto_location(usize::from(!input), count)
            }
            None => {
                return Err(semantic(
                    "SPIR-V requires a location for user inputs and outputs",
                    at,
                ))
            }
        };
        let mut interpolation = qualifiers.interpolation.map(interpolation_of);
        let mut sampling = if qualifiers.sample {
            Some(Sampling::Sample)
        } else if qualifiers.centroid {
            Some(Sampling::Centroid)
        } else {
            None
        };
        if interpolation.is_none() && contains_float(&self.module.types, ty) {
            interpolation = Some(Interpolation::Perspective);
            sampling.get_or_insert(Sampling::Center);
        }
        let component = match qualifiers.layout_entry("component").and_then(|e| e.value) {
            Some(component) => Some(u32::try_from(component).map_err(|_| internal(at))?),
            None => None,
        };
        let blend_src = match qualifiers.layout_entry("index").and_then(|e| e.value) {
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
                    per_primitive: false,
                    component,
                    invariant: qualifiers.invariant,
                    patch: false,
                }),
                xfb: None,
            },
            at,
        );
        self.interface.push(handle);
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        if input {
            self.inputs.insert(name);
            return Ok(());
        }
        self.outputs.insert(name, handle);
        let buffer = xfb::layout_value(qualifiers, "xfb_buffer").or(self.xfb.default_buffer);
        if let Some(buffer) = buffer {
            let offset = xfb::layout_value(qualifiers, "xfb_offset");
            if let Some(stride) = xfb::layout_value(qualifiers, "xfb_stride") {
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
        if qualifiers.has_layout("descriptor_heap") || qualifiers.has_layout("descriptor_stride") {
            return Err(unsupported("descriptor heaps", at));
        }
        let value = |name: &str| -> Result<Option<u32>> {
            match qualifiers.layout_entry(name).and_then(|e| e.value) {
                Some(value) => u32::try_from(value).map(Some).map_err(|_| internal(at)),
                None => Ok(None),
            }
        };
        let binding = value("binding")?;
        let set = value("set")?;
        if binding.is_none() && self.analysis.extensions.contains("GL_EXT_descriptor_heap") {
            return Err(unsupported("descriptor heaps", at));
        }
        match binding {
            Some(binding) => Ok((
                Some(ResourceBinding {
                    group: set.unwrap_or(0),
                    binding,
                }),
                None,
            )),
            None if self.options.auto_map_bindings => Ok((None, Some(set))),
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
        let TypeKind::Opaque(opaque) = ty.kind else {
            return Err(semantic(
                "non-opaque uniforms outside a block are not allowed when targeting Vulkan",
                at,
            ));
        };
        let inner = if opaque.kind == OpaqueKind::Image {
            if opaque.multisample {
                return Err(unsupported("multisampled storage images", at));
            }
            let format = qualifiers
                .layout
                .iter()
                .rev()
                .find_map(|entry| image_format(&entry.name))
                .ok_or_else(|| unsupported("storage images without a format qualifier", at))?;
            let _ = sampled_kind(opaque.sampled);
            TypeInner::Image {
                dim: image_dimension(opaque),
                arrayed: opaque.arrayed,
                class: ImageClass::Storage {
                    format,
                    access: access(qualifiers),
                },
            }
        } else {
            self.opaque_inner(
                opaque,
                self.depth.contains(&symbol),
                self.comparison.contains(&symbol),
                at,
            )?
        };
        let mut handle_ty = self.insert_type(inner);
        match *ty.array.as_slice() {
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
                ))
            }
        }
        let (binding, unbound) = self.binding(qualifiers, at)?;
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(name),
                space: AddressSpace::Handle,
                binding,
                ty: handle_ty,
                init: None,
                memory_decorations: memory(qualifiers),
                io: None,
                xfb: None,
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
            for member in &structure.members {
                let qualifier = member.ty.qualifier.as_ref();
                if has_qualifier(qualifier, |q| matches!(q, SingleTypeQualifier::Precise)) {
                    return Err(unsupported("`precise`", at));
                }
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
        let variable = self.variable(symbol).ok_or_else(|| internal(at))?;
        let TypeKind::Block(id) = variable.ty.kind else {
            return Err(internal(at));
        };
        let block = analysis.types.block(id).ok_or_else(|| internal(at))?;
        let qualifiers = &block.qualifiers;
        let buffer = match block.storage {
            BlockStorage::Uniform => false,
            BlockStorage::Buffer => true,
            BlockStorage::In | BlockStorage::Out => {
                let name = instance.map(|instance| instance.name.node.clone());
                return self.interface_block(symbol, id, name, at);
            }
        };
        let push_constant = qualifiers.has_layout("push_constant");
        let defaults = if buffer {
            self.buffer_defaults
        } else {
            self.uniform_defaults
        };
        let mut packing = None;
        let mut row_major = None;
        for entry in &qualifiers.layout {
            match entry.name.as_str() {
                "std140" | "shared" | "packed" => packing = Some(Packing::Std140),
                "std430" => packing = Some(Packing::Std430),
                "scalar" => return Err(unsupported("the `scalar` block layout", at)),
                "row_major" => row_major = Some(true),
                "column_major" => row_major = Some(false),
                _ => {}
            }
        }
        let packing = packing
            .or(defaults.packing)
            .unwrap_or(if buffer || push_constant {
                Packing::Std430
            } else {
                Packing::Std140
            });
        let row_major = row_major.or(defaults.row_major).unwrap_or(false);
        let mut ty = self.block_struct(id, packing, row_major, at)?;
        match *variable.ty.array.as_slice() {
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
        for member in &block.members {
            decorations |= memory(&member.qualifiers);
        }
        let space = if push_constant {
            AddressSpace::Immediate
        } else if buffer {
            AddressSpace::Storage {
                access: access(qualifiers),
            }
        } else {
            AddressSpace::Uniform
        };
        let (binding, unbound) = if push_constant {
            (None, None)
        } else {
            self.binding(qualifiers, at)?
        };
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(
                    instance.map_or_else(String::new, |instance| instance.name.node.clone()),
                ),
                space,
                binding,
                ty,
                init: None,
                memory_decorations: decorations,
                io: None,
                xfb: None,
            },
            at,
        );
        if let Some(set) = unbound {
            self.unbound.push((handle, set));
        }
        self.globals.insert(symbol, GlobalRef::Variable(handle));
        Ok(())
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
        if outer.patch || block.members.iter().any(|member| member.qualifiers.patch) {
            return Err(unsupported("`patch`", at));
        }
        if outer.precise || block.members.iter().any(|member| member.qualifiers.precise) {
            return Err(unsupported("`precise`", at));
        }
        if outer.invariant {
            return Err(semantic(
                "cannot use invariant qualifier on an interface block",
                at,
            ));
        }
        let explicit = |qualifiers: &Qualifiers, name: &str| -> Result<Option<u32>> {
            match qualifiers.layout_entry(name).and_then(|entry| entry.value) {
                Some(value) => u32::try_from(value).map(Some).map_err(|_| internal(at)),
                None => Ok(None),
            }
        };
        let block_location = explicit(outer, "location")?;
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
            xfb::layout_value(outer, "xfb_buffer").or(self.xfb.default_buffer)
        };
        let mut declared = variable.ty.clone();
        if declared.outer_size() == Some(GlslArraySize::Unsized) {
            let size = self.implicit_sizes.get(&symbol).copied().ok_or_else(|| {
                unsupported(
                    "stage inputs and outputs without a size or a constant index",
                    at,
                )
            })?;
            if let Some(first) = declared.array.first_mut() {
                *first = GlslArraySize::Sized(size);
            }
        }
        let arrayed = declared.is_array();
        let mut members = Vec::with_capacity(block.members.len());
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        let mut member_locations = Vec::with_capacity(block.members.len());
        for member in &block.members {
            let qualifiers = &member.qualifiers;
            if member.ty.outer_size() == Some(GlslArraySize::Unsized) {
                return Err(unsupported("unsized arrays in interface blocks", at));
            }
            if qualifiers.invariant && input {
                return Err(semantic("invariant can only apply to an output", at));
            }
            if let Some(buffer) = xfb::layout_value(qualifiers, "xfb_buffer") {
                if xfb_buffer != Some(buffer) {
                    return Err(semantic(
                        "xfb_buffer: member cannot contradict block (or what block inherited from global)",
                        at,
                    ));
                }
            }
            let ty = self.ir_type(&member.ty, at)?;
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
            let mut sampling = if qualifiers.sample || outer.sample {
                Some(Sampling::Sample)
            } else if qualifiers.centroid || outer.centroid {
                Some(Sampling::Centroid)
            } else {
                None
            };
            if interpolation.is_none() && contains_float(&self.module.types, ty) {
                interpolation = Some(Interpolation::Perspective);
                sampling.get_or_insert(Sampling::Center);
            }
            let component = explicit(qualifiers, "component")?;
            member_locations.push(explicit(qualifiers, "location")?);
            members.push(crate::StructMember {
                name: Some(member.name.clone()),
                ty,
                binding: Some(Binding::Location {
                    location: 0,
                    interpolation,
                    sampling,
                    blend_src: None,
                    per_primitive: false,
                    component,
                    invariant: !input && (qualifiers.invariant || self.invariant_all),
                    patch: false,
                }),
                offset,
                matrix_layout: None,
                xfb_offset: None,
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
                        xfb::layout_value(&declared.qualifiers, "xfb_offset"),
                    )
                })
                .collect();
            let offsets =
                self.xfb_member_offsets(xfb::layout_value(outer, "xfb_offset"), &explicit, at)?;
            for ((member, declared), offset) in members.iter_mut().zip(&block.members).zip(offsets)
            {
                if let Some(stride) = xfb::layout_value(&declared.qualifiers, "xfb_stride") {
                    self.xfb_stride(buffer, stride, at)?;
                }
                if let Some(offset) = offset {
                    self.xfb_capture(buffer, offset, member.ty, at)?;
                }
                member.xfb_offset = offset;
            }
            if let Some(stride) = xfb::layout_value(outer, "xfb_stride") {
                self.xfb_stride(buffer, stride, at)?;
            }
        }
        let member_located = member_locations.iter().any(Option::is_some);
        let per_block = members
            .iter()
            .map(|member| location_count(&self.module, member.ty))
            .fold(0, u32::saturating_add);
        let elements = declared
            .array
            .iter()
            .map(|size| match *size {
                GlslArraySize::Sized(size) => size,
                _ => 1,
            })
            .fold(1, u32::saturating_mul);
        let total = per_block.saturating_mul(elements);
        let slot = usize::from(!input);
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
                next = Some(location.saturating_add(location_count(&self.module, member.ty)));
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
                    ))
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
                next = next.saturating_add(location_count(&self.module, member.ty));
            }
            Some(Binding::Location {
                location: start,
                interpolation: None,
                sampling: None,
                blend_src: None,
                per_primitive: false,
                component: None,
                invariant: false,
                patch: false,
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
        let ty = self.wrap_arrays(structure, &declared.array, at)?;
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
            },
            at,
        );
        self.interface.push(handle);
        self.globals.insert(symbol, GlobalRef::Variable(handle));
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
        if self.options.stage != crate::ShaderStage::Vertex {
            return false;
        }
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
            .flat_map(|array| &array.dimensions)
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
            xfb::ast_layout_value(self, outer, "xfb_buffer").or(self.xfb.default_buffer)
        else {
            return Ok(());
        };
        let block = self
            .builtin_per_vertex()
            .ok_or_else(|| internal(Span::UNDEFINED))?;
        let mut declared = Vec::new();
        for member in &structure.members {
            let qualifier = member.ty.qualifier.as_ref();
            let offset = xfb::ast_layout_value(self, qualifier, "xfb_offset");
            let stride = xfb::ast_layout_value(self, qualifier, "xfb_stride");
            if xfb::ast_layout_value(self, qualifier, "xfb_buffer")
                .is_some_and(|member_buffer| member_buffer != buffer)
            {
                return Err(semantic(
                    "xfb_buffer: member cannot contradict block (or what block inherited from global)",
                    at,
                ));
            }
            for declarator in &member.declarators {
                let name = declarator.name.node.clone();
                let Some((_, builtin)) = block.member(&name) else {
                    continue;
                };
                let mut glsl = builtin.ty.clone();
                if glsl.outer_size() == Some(GlslArraySize::Unsized) {
                    if let (Some(size), Some(first)) = (
                        self.declarator_size(declarator.array.as_ref()),
                        glsl.array.first_mut(),
                    ) {
                        *first = GlslArraySize::Sized(size);
                    }
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
            xfb::ast_layout_value(self, outer, "xfb_offset"),
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
        if self.options.stage != crate::ShaderStage::Vertex
            || (self.per_vertex_used.is_empty() && !self.per_vertex_redeclared)
        {
            return Ok(());
        }
        let block = self
            .builtin_per_vertex()
            .ok_or_else(|| internal(Span::UNDEFINED))?;
        let mut requested: Vec<(String, Span)> = Vec::new();
        self.invariant.retain(|&(ref name, at)| {
            let per_vertex = PER_VERTEX.contains(&name.as_str());
            if per_vertex {
                requested.push((name.clone(), at));
            }
            !per_vertex
        });
        let mut members = Vec::new();
        let mut names = Vec::new();
        let mut offset = 0_u32;
        let mut alignment = Alignment::ONE;
        for name in PER_VERTEX {
            let Some((_, member)) = block.member(name) else {
                continue;
            };
            let at = requested
                .iter()
                .find(|&&(ref requested, _)| requested == name)
                .map_or(Span::UNDEFINED, |&(_, at)| at);
            let used = self.per_vertex_used.contains(name);
            let invariant = member.qualifiers.invariant
                || self.invariant_all
                || requested
                    .iter()
                    .any(|&(ref requested, _)| requested == name);
            let builtin = match name {
                "gl_Position" => BuiltIn::Position { invariant },
                _ => {
                    if invariant && used {
                        return Err(unsupported(
                            "invariant on built-in outputs other than gl_Position",
                            at,
                        ));
                    }
                    builtin_of(name).ok_or_else(|| internal(at))?
                }
            };
            let ty = if super::prepass::CLIP_DISTANCES.contains(&name) {
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
            },
            Span::UNDEFINED,
        );
        self.interface.push(handle);
        self.per_vertex = Some((handle, names));
        if self.xfb.default_buffer.is_some() {
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
        let size = self.declarator_size(declarator.array.as_ref());
        if let Some(size) = size {
            self.builtin_sizes.insert(name.clone(), size);
        }
        let qualifier = list.ty.qualifier.as_ref();
        if has_qualifier(qualifier, |q| matches!(q, SingleTypeQualifier::Precise)) {
            return Err(unsupported("`precise`", at));
        }
        if has_qualifier(qualifier, |q| matches!(q, SingleTypeQualifier::Invariant)) {
            self.invariant.push((name.clone(), at));
        }
        for layout in layout_names(qualifier) {
            let depth = match layout {
                "depth_any" => None,
                "depth_greater" => Some(ConservativeDepth::GreaterEqual),
                "depth_less" => Some(ConservativeDepth::LessEqual),
                "depth_unchanged" => Some(ConservativeDepth::Unchanged),
                other => {
                    return Err(unsupported(
                        format!("the layout qualifier `{other}` on `{name}`"),
                        at,
                    ))
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
        Ok(())
    }

    pub(super) fn global_ref(&mut self, symbol: SymbolId, at: Span) -> Result<GlobalRef> {
        if let Some(found) = self.globals.get(&symbol) {
            return Ok(*found);
        }
        if self.has_local_size_ids() && self.is_work_group_size(symbol) {
            let handle = self.work_group_size_override(at)?;
            self.globals.insert(symbol, GlobalRef::Override(handle));
            return Ok(GlobalRef::Override(handle));
        }
        let analysis = self.analysis;
        let record = self.symbol(symbol).ok_or_else(|| internal(at))?;
        let (ty, output, value) = match record.kind {
            SymbolKind::Variable(ref variable) => {
                if variable.origin != Origin::BuiltIn {
                    return Err(internal(at));
                }
                (
                    variable.ty.clone(),
                    variable.qualifiers.storage == Storage::Out,
                    variable.value.as_ref(),
                )
            }
            SymbolKind::BlockMember { instance, index } => {
                let instance = self.variable(instance).ok_or_else(|| internal(at))?;
                let TypeKind::Block(block) = instance.ty.kind else {
                    return Err(internal(at));
                };
                let block = analysis.types.block(block).ok_or_else(|| internal(at))?;
                let member = block
                    .members
                    .get(usize::try_from(index).map_err(|_| internal(at))?)
                    .ok_or_else(|| internal(at))?;
                (member.ty.clone(), block.storage == BlockStorage::Out, None)
            }
            SymbolKind::Struct(_) | SymbolKind::BlockName => return Err(internal(at)),
        };
        let name = record.name.clone();
        let found = match value {
            Some(value) => {
                let ir = self.ir_type(&ty, at)?;
                let init = self.global_constant(&ty, &value.values, at)?;
                let handle = self.module.constants.append(
                    crate::Constant {
                        name: Some(name),
                        ty: ir,
                        init,
                    },
                    at,
                );
                GlobalRef::Constant(handle)
            }
            None => GlobalRef::Variable(self.builtin_variable(&name, &ty, output, at)?),
        };
        self.globals.insert(symbol, found);
        Ok(found)
    }

    fn builtin_variable(
        &mut self,
        name: &str,
        ty: &GlslType,
        output: bool,
        at: Span,
    ) -> Result<Handle<GlobalVariable>> {
        if let Some(&handle) = self.builtins.get(name) {
            return Ok(handle);
        }
        let builtin = builtin_of(name)
            .ok_or_else(|| unsupported(format!("the built-in variable `{name}`"), at))?;
        let ir = if super::prepass::CLIP_DISTANCES.contains(&name) {
            let size = self
                .builtin_sizes
                .get(name)
                .copied()
                .or(match ty.outer_size() {
                    Some(GlslArraySize::Sized(size)) => Some(size),
                    _ => None,
                })
                .ok_or_else(|| {
                    unsupported(format!("`{name}` without a size or a constant index"), at)
                })?;
            let element = GlslType::scalar(Scalar::Float);
            let sized = element.array_of(GlslArraySize::Sized(size));
            self.ir_type(&sized, at)?
        } else {
            self.ir_type(ty, at)?
        };
        let handle = self.module.global_variables.append(
            GlobalVariable {
                name: Some(String::from(name)),
                space: if output {
                    AddressSpace::Output
                } else {
                    AddressSpace::Input
                },
                binding: None,
                ty: ir,
                init: None,
                memory_decorations: MemoryDecorations::empty(),
                io: Some(Binding::BuiltIn(builtin)),
                xfb: None,
            },
            at,
        );
        self.interface.push(handle);
        self.builtins.insert(String::from(name), handle);
        Ok(handle)
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
        if let Some(at) = self.post_depth_coverage {
            let implied = self
                .analysis
                .extensions
                .contains("GL_ARB_post_depth_coverage");
            self.errors.push(if self.early_fragment_tests || implied {
                unsupported("the `post_depth_coverage` layout qualifier", at)
            } else {
                semantic("post_depth_coverage requires early_fragment_tests", at)
            });
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
            match types[ty].inner {
                TypeInner::Struct { ref members, .. } => {
                    if found.insert(ty) {
                        for member in members {
                            collect(types, member.ty, found);
                        }
                    }
                }
                TypeInner::Array { base, .. } | TypeInner::BindingArray { base, .. } => {
                    collect(types, base, found);
                }
                _ => {}
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
        let mut unbound = core::mem::take(&mut self.unbound);
        if unbound.is_empty() {
            return;
        }
        unbound.sort_by_key(|&(_, set)| set.is_none());
        let live = crate::compact::live_global_variables(&self.module);
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
                let used = taken.entry(group).or_default();
                let free = (0..=u32::MAX)
                    .find(|binding| !used.contains(binding))
                    .unwrap_or(u32::MAX);
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

fn location_count(module: &crate::Module, ty: Handle<crate::Type>) -> u32 {
    let types = &module.types;
    const fn vector_locations(size: crate::VectorSize, scalar: crate::Scalar) -> u32 {
        match (size, scalar.width) {
            (crate::VectorSize::Tri | crate::VectorSize::Quad, 8) => 2,
            _ => 1,
        }
    }

    match types[ty].inner {
        TypeInner::Vector { size, scalar } => vector_locations(size, scalar),
        TypeInner::Matrix {
            columns,
            rows,
            scalar,
        } => (columns as u32).saturating_mul(vector_locations(rows, scalar)),
        TypeInner::Array { base, size, .. } => match size.resolve(module.to_ctx()) {
            Ok(crate::proc::IndexableLength::Known(length)) => {
                length.saturating_mul(location_count(module, base))
            }
            _ => 1,
        },
        TypeInner::Struct { ref members, .. } => members
            .iter()
            .map(|member| location_count(module, member.ty))
            .fold(0, u32::saturating_add),
        _ => 1,
    }
}

fn contains_float(types: &crate::UniqueArena<crate::Type>, ty: Handle<crate::Type>) -> bool {
    match types[ty].inner {
        TypeInner::Scalar(scalar)
        | TypeInner::Vector { scalar, .. }
        | TypeInner::Matrix { scalar, .. } => scalar.kind == crate::ScalarKind::Float,
        TypeInner::Array { base, .. } => contains_float(types, base),
        TypeInner::Struct { ref members, .. } => members
            .iter()
            .any(|member| contains_float(types, member.ty)),
        _ => false,
    }
}
