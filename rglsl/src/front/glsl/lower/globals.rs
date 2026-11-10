use alloc::{format, string::String, vec::Vec};

use rglsl_ast::ast::{
    BlockInstance, BlockStructure, Declaration, DeclarationKind, InitDeclarator,
    InitDeclaratorList, Initializer, InterpolationQualifier, Node, SingleTypeQualifier, Spanned,
    StorageQualifier, TypeQualifier,
};
use rglsl_sema::scope::{Origin, Qualifiers, Storage, SymbolKind};
use rglsl_sema::types::{
    ArraySize as GlslArraySize, BlockStorage, OpaqueKind, Type as GlslType, TypeKind,
};
use rglsl_sema::SymbolId;

use super::types::{image_dimension, sampled_kind};
use super::{internal, semantic, unsupported, GlobalRef, Initialization, Lowerer, Packing, Result};
use crate::front::glsl::variables::{contains_float, location_count};
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
    pub(super) fn global_declaration(&mut self, declaration: &'a Declaration) -> Result<()> {
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
                        "local_size_x_id" | "local_size_y_id" | "local_size_z_id" => {
                            return Err(unsupported(
                                "work group sizes given by specialization constants",
                                at,
                            ));
                        }
                        _ => {}
                    }
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
                    .and_then(|value| u16::try_from(value).ok())
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
                    .filter(|info| info.is_constant)
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
                let count = location_count(&self.module.types, ty);
                let slot = &mut self.next_location[usize::from(!input)];
                let location = *slot;
                *slot = slot.saturating_add(count);
                location
            }
            None => {
                return Err(semantic(
                    "SPIR-V requires a location for user inputs and outputs",
                    at,
                ))
            }
        };
        let mut interpolation = qualifiers.interpolation.map(|i| match i {
            InterpolationQualifier::Flat => Interpolation::Flat,
            InterpolationQualifier::Noperspective => Interpolation::Linear,
            InterpolationQualifier::Smooth => Interpolation::Perspective,
        });
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
        Ok(())
    }

    fn binding(
        &mut self,
        qualifiers: &Qualifiers,
        at: Span,
    ) -> Result<(Option<ResourceBinding>, Option<Option<u32>>)> {
        let value = |name: &str| -> Result<Option<u32>> {
            match qualifiers.layout_entry(name).and_then(|e| e.value) {
                Some(value) => u32::try_from(value).map(Some).map_err(|_| internal(at)),
                None => Ok(None),
            }
        };
        let binding = value("binding")?;
        let set = value("set")?;
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
                dim: image_dimension(opaque, at)?,
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
                if has_qualifier(qualifier, |q| matches!(q, SingleTypeQualifier::Invariant)) {
                    for declarator in &member.declarators {
                        self.invariant
                            .push((declarator.name.node.clone(), self.at(declarator.name.span)));
                    }
                }
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
                return Err(unsupported("user-defined interface blocks", at));
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
        let ty = self.block_struct(id, packing, row_major, at)?;
        if variable.ty.is_array() {
            return Err(unsupported("arrays of blocks", at));
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
                name: instance.map(|instance| instance.name.node.clone()),
                space,
                binding,
                ty,
                init: None,
                memory_decorations: decorations,
                io: None,
            },
            at,
        );
        if let Some(set) = unbound {
            self.unbound.push((handle, set));
        }
        self.globals.insert(symbol, GlobalRef::Variable(handle));
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
        let size = declarator
            .array
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
            });
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
            let element = GlslType::scalar(rglsl_sema::types::Scalar::Float);
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
        self.check_shared_layouts();
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
