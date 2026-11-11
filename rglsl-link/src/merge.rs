use std::collections::BTreeMap;

use rglsl::compact::Remap;
use rglsl::object::{ObjectModule, PathStep, SymbolKind};
use rglsl::{
    AddressSpace, Expression, Function, GlobalVariable, Handle, Module, Override, Span, TypeInner,
};

use crate::calls::Node;
use crate::entry::Candidate;
use crate::error::{internal, LinkError};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub(crate) enum SpaceClass {
    Input,
    Output,
    Other,
}

pub(crate) const fn space_class(space: AddressSpace) -> SpaceClass {
    match space {
        AddressSpace::Input => SpaceClass::Input,
        AddressSpace::Output => SpaceClass::Output,
        AddressSpace::Function
        | AddressSpace::Private
        | AddressSpace::WorkGroup
        | AddressSpace::Uniform
        | AddressSpace::Storage { .. }
        | AddressSpace::Handle
        | AddressSpace::Immediate
        | AddressSpace::TaskPayload
        | AddressSpace::RayPayload
        | AddressSpace::IncomingRayPayload
        | AddressSpace::HitAttribute
        | AddressSpace::CallableData
        | AddressSpace::IncomingCallableData
        | AddressSpace::ShaderRecord
        | AddressSpace::PhysicalStorage { .. }
        | AddressSpace::DescriptorHeap(_) => SpaceClass::Other,
    }
}

#[derive(Debug, Clone)]
pub(crate) struct MergedGlobal {
    pub handle: Handle<GlobalVariable>,
    pub name: String,
    pub kind: SymbolKind,
    pub implicit: Vec<Vec<PathStep>>,
    pub automatic_location: bool,
    pub automatic_binding: Option<Option<u32>>,
}

#[derive(Debug)]
pub(crate) struct Builder<'a> {
    pub objects: &'a [ObjectModule],
    pub module: Module,
    pub remaps: Vec<Remap>,
    pub globals: Vec<MergedGlobal>,
    keys: BTreeMap<(SpaceClass, String), usize>,
    overrides: BTreeMap<u32, Handle<Override>>,
    pub functions: BTreeMap<Node, Handle<Function>>,
    pub library_functions: Vec<Handle<Function>>,
    pub warnings: Vec<String>,
    pub errors: Vec<LinkError>,
    instances: Vec<(Handle<GlobalVariable>, String)>,
}

fn has_handles(inner: &TypeInner) -> bool {
    !matches!(
        *inner,
        TypeInner::Scalar(_) | TypeInner::Vector { .. } | TypeInner::Matrix { .. }
    )
}

impl<'a> Builder<'a> {
    pub fn new(objects: &'a [ObjectModule]) -> Self {
        Self {
            objects,
            module: Module::default(),
            remaps: Vec::new(),
            globals: Vec::new(),
            keys: BTreeMap::new(),
            overrides: BTreeMap::new(),
            functions: BTreeMap::new(),
            library_functions: Vec::new(),
            warnings: Vec::new(),
            errors: Vec::new(),
            instances: Vec::new(),
        }
    }

    pub fn object(&self, index: usize) -> Result<&'a ObjectModule, LinkError> {
        self.objects
            .get(index)
            .ok_or_else(|| internal("object index"))
    }

    pub fn remap(&self, index: usize) -> Result<&Remap, LinkError> {
        self.remaps
            .get(index)
            .ok_or_else(|| internal("object index"))
    }

    pub fn instance(&self, handle: Handle<GlobalVariable>) -> Option<&str> {
        self.instances
            .iter()
            .find(|&&(candidate, _)| candidate == handle)
            .map(|(_, name)| name.as_str())
    }

    pub fn add_objects(&mut self) -> Result<(), LinkError> {
        for index in 0..self.objects.len() {
            let remap = self.add_object(index)?;
            self.remaps.push(remap);
        }
        Ok(())
    }

    fn add_object(&mut self, index: usize) -> Result<Remap, LinkError> {
        let object = self
            .objects
            .get(index)
            .ok_or_else(|| internal("object index"))?;
        let source = &object.module;
        let mut remap = Remap::new();
        let mut pending_overrides = Vec::new();
        for (handle, value) in source.overrides.iter() {
            let ty = &source.types[value.ty];
            if has_handles(&ty.inner) {
                return Err(LinkError::Unsupported(String::from(
                    "a specialization constant of a composite type in a linked module",
                )));
            }
            let ty = self.module.types.insert(ty.clone(), Span::UNDEFINED);
            if let Some(id) = value.id {
                if let Some(&existing) = self.overrides.get(&id) {
                    let previous = &self.module.overrides[existing];
                    if previous.ty != ty || previous.name != value.name {
                        self.errors.push(LinkError::SpecializationConstant(id));
                    }
                    remap.map_override(handle, existing);
                    continue;
                }
            }
            let new = self.module.overrides.append(
                Override {
                    name: value.name.clone(),
                    id: value.id,
                    ty,
                    init: None,
                },
                Span::UNDEFINED,
            );
            if let Some(id) = value.id {
                self.overrides.insert(id, new);
            }
            remap.map_override(handle, new);
            pending_overrides.push((handle, new));
        }
        for (handle, ty) in source.types.iter() {
            let mut ty = ty.clone();
            remap.adjust_type(&mut ty).map_err(internal)?;
            let new = self.module.types.insert(ty, source.types.get_span(handle));
            remap.map_type(handle, new);
        }
        let mut constants_done = std::collections::BTreeSet::new();
        for (handle, expression) in source.global_expressions.iter() {
            if let Expression::Constant(constant) = *expression {
                if constants_done.insert(constant) {
                    self.add_constant(source, &mut remap, constant)?;
                }
            }
            let mut expression = expression.clone();
            remap
                .adjust_global_expression(&mut expression)
                .map_err(internal)?;
            let new = self
                .module
                .global_expressions
                .append(expression, Span::UNDEFINED);
            remap.map_global_expression(handle, new);
        }
        for (handle, _) in source.constants.iter() {
            if constants_done.insert(handle) {
                self.add_constant(source, &mut remap, handle)?;
            }
        }
        for (old, new) in pending_overrides {
            let init = source.overrides[old].init;
            if let Some(init) = init {
                let init = remap.global_expression(init).map_err(internal)?;
                self.module.overrides.get_mut(new).init = Some(init);
            }
        }
        for (handle, global) in source.global_variables.iter() {
            let mut global = global.clone();
            global.ty = remap.ty(global.ty).map_err(internal)?;
            if let Some(ref mut init) = global.init {
                *init = remap.global_expression(*init).map_err(internal)?;
            }
            if let Some(ref mut offset) = global.heap_offset {
                *offset = remap.global_expression(*offset).map_err(internal)?;
            }
            global.spirv_decorations = Vec::new();
            let new = self.add_global(index, handle, global);
            remap.map_global(handle, new);
        }
        for (handle, global) in source.global_variables.iter() {
            if global.spirv_decorations.is_empty() {
                continue;
            }
            let mut decorations = global.spirv_decorations.clone();
            for decoration in &mut decorations {
                if let rglsl::SpirvDecorationOperands::Ids(ref mut ids) = decoration.operands {
                    for id in ids.iter_mut() {
                        *id = match *id {
                            rglsl::SpirvId::Constant(constant) => rglsl::SpirvId::Constant(
                                remap.global_expression(constant).map_err(internal)?,
                            ),
                            rglsl::SpirvId::Global(target) => {
                                rglsl::SpirvId::Global(remap.global(target).map_err(internal)?)
                            }
                        };
                    }
                }
            }
            let merged = remap.global(handle).map_err(internal)?;
            let slot = &mut self
                .module
                .global_variables
                .get_mut(merged)
                .spirv_decorations;
            if slot.is_empty() {
                *slot = decorations;
            }
        }
        Ok(remap)
    }

    fn add_constant(
        &mut self,
        source: &Module,
        remap: &mut Remap,
        handle: Handle<rglsl::Constant>,
    ) -> Result<(), LinkError> {
        let mut constant = source.constants.try_get(handle).map_err(internal)?.clone();
        constant.ty = remap.ty(constant.ty).map_err(internal)?;
        constant.init = remap.global_expression(constant.init).map_err(internal)?;
        let new = self.module.constants.append(constant, Span::UNDEFINED);
        remap.map_constant(handle, new);
        Ok(())
    }

    fn add_global(
        &mut self,
        object: usize,
        handle: Handle<GlobalVariable>,
        global: GlobalVariable,
    ) -> Handle<GlobalVariable> {
        let symbol = self
            .objects
            .get(object)
            .and_then(|object| object.global_symbol(handle))
            .cloned();
        let name = symbol
            .as_ref()
            .map(|symbol| symbol.name.clone())
            .or_else(|| global.name.clone());
        let Some(name) = name else {
            return self.module.global_variables.append(global, Span::UNDEFINED);
        };
        let kind = symbol
            .as_ref()
            .map_or(SymbolKind::Variable, |symbol| symbol.kind);
        let implicit = symbol
            .as_ref()
            .map(|symbol| symbol.implicit_sizes.clone())
            .unwrap_or_default();
        let automatic_location = symbol
            .as_ref()
            .is_some_and(|symbol| symbol.automatic_location);
        let automatic_binding = symbol.as_ref().and_then(|symbol| symbol.automatic_binding);
        let key = (space_class(global.space), name.clone());
        if let Some(&position) = self.keys.get(&key) {
            if let Some(existing) = self.globals.get(position).cloned() {
                self.merge_global(
                    position,
                    &existing,
                    &Candidate {
                        global: &global,
                        implicit: &implicit,
                        automatic_location,
                        automatic_binding,
                        instance: symbol.as_ref().and_then(|symbol| symbol.instance.clone()),
                    },
                );
                return existing.handle;
            }
        }
        let new = self.module.global_variables.append(global, Span::UNDEFINED);
        self.keys.insert(key, self.globals.len());
        self.globals.push(MergedGlobal {
            handle: new,
            name,
            kind,
            implicit,
            automatic_location,
            automatic_binding,
        });
        if let Some(instance) = symbol.and_then(|symbol| symbol.instance) {
            self.instances.push((new, instance));
        }
        new
    }
}
