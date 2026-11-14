use std::collections::{BTreeMap, BTreeSet};

use rglsl::compact::Remap;
use rglsl::object::{BindingAssignment, ObjectModule, PathStep, SymbolKind};
use rglsl::{
    AddressSpace, Expression, Function, GlobalVariable, Handle, Module, Override, Span, Type,
    TypeInner,
};

use crate::calls::Node;
use crate::entry::Candidate;
use crate::error::{LinkError, internal};

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
        | AddressSpace::HitObjectAttribute { .. }
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
    pub binding: BindingAssignment,
    pub initializer: Option<Handle<Expression>>,
}

#[derive(Debug, Default)]
struct OverridePlan {
    fresh: Vec<Handle<Override>>,
    shared: Vec<(Handle<Override>, u32)>,
}

#[derive(Debug)]
pub(crate) struct Builder<'a> {
    pub objects: &'a [ObjectModule],
    pub module: Module,
    pub remaps: Vec<Remap>,
    pub globals: Vec<MergedGlobal>,
    keys: BTreeMap<(SpaceClass, String), usize>,
    overrides: BTreeMap<u32, Vec<(usize, Handle<Override>)>>,
    pub functions: BTreeMap<Node, Handle<Function>>,
    pub library_functions: Vec<Handle<Function>>,
    pub warnings: Vec<String>,
    pub errors: Vec<LinkError>,
    instances: BTreeMap<Handle<GlobalVariable>, String>,
    symbols: Vec<BTreeMap<Handle<GlobalVariable>, usize>>,
    pub unused: Vec<BTreeSet<Handle<GlobalVariable>>>,
}

impl<'a> Builder<'a> {
    pub fn new(objects: &'a [ObjectModule], unused: Vec<BTreeSet<Handle<GlobalVariable>>>) -> Self {
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
            instances: BTreeMap::new(),
            symbols: objects
                .iter()
                .map(|object| {
                    let mut positions = BTreeMap::new();
                    for (position, symbol) in object.unit.globals.iter().enumerate() {
                        positions.entry(symbol.global).or_insert(position);
                    }
                    positions
                })
                .collect(),
            unused,
        }
    }

    pub fn is_unused(&self, object: usize, global: Handle<GlobalVariable>) -> bool {
        self.unused
            .get(object)
            .is_some_and(|unused| unused.contains(&global))
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
        self.instances.get(&handle).map(String::as_str)
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
        let source = &object.unit.module;
        let mut remap = Remap::new();
        let plan = self.plan_overrides(index, source, &mut remap);
        self.add_types(source, &mut remap)?;
        self.add_overrides(index, source, &mut remap, &plan)?;
        for (offset, (handle, _)) in source.constants.iter().enumerate() {
            remap.map_constant(handle, self.module.constants.appended_handle(offset));
        }
        for (handle, expression) in source.global_expressions.iter() {
            let mut expression = expression.clone();
            remap
                .adjust_global_expression(&mut expression)
                .map_err(internal)?;
            let new = self
                .module
                .global_expressions
                .append(expression, source.global_expressions.get_span(handle));
            remap.map_global_expression(handle, new);
        }
        for (handle, constant) in source.constants.iter() {
            let mut constant = constant.clone();
            constant.ty = remap.ty(constant.ty).map_err(internal)?;
            constant.init = remap.global_expression(constant.init).map_err(internal)?;
            let new = self
                .module
                .constants
                .append(constant, source.constants.get_span(handle));
            if remap.constant(handle).map_err(internal)? != new {
                return Err(internal("constant handle out of plan"));
            }
        }
        for &handle in &plan.fresh {
            if let Some(init) = source.overrides.try_get(handle).map_err(internal)?.init {
                let init = remap.global_expression(init).map_err(internal)?;
                let new = remap.r#override(handle).map_err(internal)?;
                self.module
                    .overrides
                    .try_get_mut(new)
                    .map_err(internal)?
                    .init = Some(init);
            }
        }
        for (handle, global) in source.global_variables.iter() {
            if self.is_unused(index, handle) {
                continue;
            }
            let mut global = global.clone();
            global.ty = remap.ty(global.ty).map_err(internal)?;
            if let Some(ref mut init) = global.init {
                *init = remap.global_expression(*init).map_err(internal)?;
            }
            if let Some(ref mut offset) = global.heap_offset {
                *offset = remap.global_expression(*offset).map_err(internal)?;
            }
            global.spirv_decorations = Vec::new();
            let span = source.global_variables.get_span(handle);
            let new = self.add_global(index, handle, global, span, &remap)?;
            remap.map_global(handle, new);
        }
        for (handle, global) in source.global_variables.iter() {
            if global.spirv_decorations.is_empty() || self.is_unused(index, handle) {
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

    fn plan_overrides(&self, object: usize, source: &Module, remap: &mut Remap) -> OverridePlan {
        let mut plan = OverridePlan::default();
        for (handle, value) in source.overrides.iter() {
            let earlier = value.id.and_then(|id| {
                self.overrides
                    .get(&id)
                    .into_iter()
                    .flatten()
                    .find(|&&(defining, _)| defining != object)
                    .map(|&(_, existing)| (id, existing))
            });
            match earlier {
                Some((id, existing)) => {
                    remap.map_override(handle, existing);
                    plan.shared.push((handle, id));
                }
                None => {
                    let new = self.module.overrides.appended_handle(plan.fresh.len());
                    remap.map_override(handle, new);
                    plan.fresh.push(handle);
                }
            }
        }
        plan
    }

    fn add_overrides(
        &mut self,
        object: usize,
        source: &Module,
        remap: &mut Remap,
        plan: &OverridePlan,
    ) -> Result<(), LinkError> {
        for &handle in &plan.fresh {
            let value = source.overrides.try_get(handle).map_err(internal)?;
            let new = self.module.overrides.append(
                Override {
                    name: value.name.clone(),
                    id: value.id,
                    ty: remap.ty(value.ty).map_err(internal)?,
                    init: None,
                },
                source.overrides.get_span(handle),
            );
            if remap.r#override(handle).map_err(internal)? != new {
                return Err(internal("override handle out of plan"));
            }
            if let Some(id) = value.id {
                self.overrides.entry(id).or_default().push((object, new));
            }
        }
        for &(handle, id) in &plan.shared {
            let value = source.overrides.try_get(handle).map_err(internal)?;
            let ty = remap.ty(value.ty).map_err(internal)?;
            let same = self
                .overrides
                .get(&id)
                .into_iter()
                .flatten()
                .filter(|&&(defining, _)| defining != object)
                .map(|&(_, existing)| existing)
                .find(|&existing| {
                    self.module
                        .overrides
                        .try_get(existing)
                        .is_ok_and(|previous| previous.ty == ty && previous.name == value.name)
                });
            match same {
                Some(existing) => remap.map_override(handle, existing),
                None => self.errors.push(LinkError::SpecializationConstant(id)),
            }
        }
        Ok(())
    }

    fn add_types(&mut self, source: &Module, remap: &mut Remap) -> Result<(), LinkError> {
        let forward: BTreeMap<Handle<Type>, (Handle<Type>, AddressSpace)> = source
            .types
            .iter()
            .filter_map(|(handle, ty)| match ty.inner {
                TypeInner::Pointer { base, space } if base.index() >= handle.index() => {
                    Some((handle, (base, space)))
                }
                _ => None,
            })
            .collect();
        if !forward.is_empty() && self.unify_cycles(source, remap, &forward)? {
            return Ok(());
        }
        let mut pending = Vec::new();
        for (handle, ty) in source.types.iter() {
            let span = source.types.get_span(handle);
            if let Some(&(base, space)) = forward.get(&handle) {
                let placeholder = self.placeholder_struct(&source.types[base].name);
                let pointer = self.module.types.insert(
                    Type {
                        name: ty.name.clone(),
                        inner: TypeInner::Pointer {
                            base: placeholder,
                            space,
                        },
                    },
                    span,
                );
                remap.map_type(handle, pointer);
                pending.push((pointer, ty.name.clone(), base, space));
                continue;
            }
            let mut ty = ty.clone();
            remap.adjust_type(&mut ty).map_err(internal)?;
            let new = self.module.types.insert(ty, span);
            remap.map_type(handle, new);
        }
        for (pointer, name, base, space) in pending {
            let resolved = Type {
                name,
                inner: TypeInner::Pointer {
                    base: remap.ty(base).map_err(internal)?,
                    space,
                },
            };
            self.module
                .types
                .replace(pointer, resolved)
                .map_err(internal)?;
        }
        Ok(())
    }

    fn unify_cycles(
        &mut self,
        source: &Module,
        remap: &mut Remap,
        forward: &BTreeMap<Handle<Type>, (Handle<Type>, AddressSpace)>,
    ) -> Result<bool, LinkError> {
        let mut candidates = Vec::with_capacity(forward.len());
        for (&pointer, &(base, space)) in forward {
            let Some(candidate) = self.pointer_candidate(source, pointer, base, space) else {
                return Ok(false);
            };
            remap.map_type(pointer, candidate);
            candidates.push((candidate, base));
        }
        for (handle, ty) in source.types.iter() {
            if forward.contains_key(&handle) {
                continue;
            }
            let mut ty = ty.clone();
            remap.adjust_type(&mut ty).map_err(internal)?;
            let new = self.module.types.insert(ty, source.types.get_span(handle));
            remap.map_type(handle, new);
        }
        for (candidate, base) in candidates {
            let TypeInner::Pointer { base: merged, .. } = self.module.types[candidate].inner else {
                return Ok(false);
            };
            if remap.ty(base).map_err(internal)? != merged {
                return Ok(false);
            }
        }
        Ok(true)
    }

    fn pointer_candidate(
        &self,
        source: &Module,
        pointer: Handle<Type>,
        base: Handle<Type>,
        space: AddressSpace,
    ) -> Option<Handle<Type>> {
        let name = &source.types[pointer].name;
        let base = &source.types[base];
        let TypeInner::Struct { ref members, .. } = base.inner else {
            return None;
        };
        self.module.types.iter().find_map(|(handle, ty)| {
            let TypeInner::Pointer {
                base: merged,
                space: merged_space,
            } = ty.inner
            else {
                return None;
            };
            let merged_base = self.module.types.get_handle(merged).ok()?;
            let TypeInner::Struct {
                members: ref merged_members,
                ..
            } = merged_base.inner
            else {
                return None;
            };
            (merged_space == space
                && ty.name == *name
                && merged_base.name == base.name
                && merged_members.len() == members.len())
            .then_some(handle)
        })
    }

    fn placeholder_struct(&mut self, name: &Option<String>) -> Handle<Type> {
        let mut span = 0_u32;
        loop {
            let placeholder = Type {
                name: name.clone(),
                inner: TypeInner::Struct {
                    members: Vec::new(),
                    span,
                },
            };
            if self.module.types.get(&placeholder).is_none() || span == u32::MAX {
                return self.module.types.insert(placeholder, Span::UNDEFINED);
            }
            span += 1;
        }
    }

    fn add_global(
        &mut self,
        object: usize,
        handle: Handle<GlobalVariable>,
        global: GlobalVariable,
        span: Span,
        remap: &Remap,
    ) -> Result<Handle<GlobalVariable>, LinkError> {
        let Some(symbol) = self
            .symbols
            .get(object)
            .and_then(|positions| positions.get(&handle))
            .zip(self.objects.get(object))
            .and_then(|(&position, object)| object.unit.globals.get(position))
            .cloned()
        else {
            return Ok(self.module.global_variables.append(global, span));
        };
        let initializer = match symbol.initializer {
            Some(initializer) => Some(remap.global_expression(initializer).map_err(internal)?),
            None => global.init,
        };
        let name = symbol.name.clone();
        let kind = symbol.kind;
        let implicit = symbol.implicit_sizes.clone();
        let automatic_location = symbol.automatic_location;
        let binding = symbol.binding;
        if kind == SymbolKind::Local {
            return Ok(self.module.global_variables.append(global, span));
        }
        let key = (space_class(global.space), name.clone());
        if let Some(&position) = self.keys.get(&key)
            && let Some(existing) = self.globals.get(position).cloned()
        {
            self.merge_global(
                position,
                &existing,
                &Candidate {
                    global: &global,
                    implicit: &implicit,
                    automatic_location,
                    binding,
                    instance: symbol.instance.clone(),
                    initializer,
                },
            );
            return Ok(existing.handle);
        }
        let new = self.module.global_variables.append(global, span);
        self.keys.insert(key, self.globals.len());
        self.globals.push(MergedGlobal {
            handle: new,
            name,
            kind,
            implicit,
            automatic_location,
            binding,
            initializer,
        });
        if let Some(instance) = symbol.instance {
            self.instances.insert(new, instance);
        }
        Ok(new)
    }
}

pub(crate) fn unused_on_use_globals(
    objects: &[ObjectModule],
    order: &[Node],
    main: usize,
) -> Vec<BTreeSet<Handle<GlobalVariable>>> {
    objects
        .iter()
        .enumerate()
        .map(|(index, object)| {
            let module = &object.unit.module;
            let on_use: BTreeSet<Handle<GlobalVariable>> = object
                .unit
                .globals
                .iter()
                .filter(|symbol| symbol.on_use)
                .map(|symbol| symbol.global)
                .collect();
            if on_use.is_empty() {
                return on_use;
            }
            let mut used = BTreeSet::new();
            let functions = order
                .iter()
                .filter(|&&(defining, _)| defining == index)
                .filter_map(|&(_, handle)| module.functions.try_get(handle).ok());
            let entry = module.entry_points.first().filter(|_| index == main);
            for function in functions.chain(entry.map(|entry| &entry.function)) {
                for (_, expression) in function.expressions.iter() {
                    if let Expression::GlobalVariable(global) = *expression {
                        used.insert(global);
                    }
                }
            }
            if let Some(entry) = entry {
                used.extend(entry.task_payload);
                used.extend(entry.incoming_ray_payload);
                if let Some(ref mesh) = entry.mesh_shader {
                    used.extend(mesh.task_memory.iter().copied());
                }
            }
            let mut pending: Vec<Handle<GlobalVariable>> = module
                .global_variables
                .iter()
                .map(|(handle, _)| handle)
                .filter(|handle| !on_use.contains(handle) || used.contains(handle))
                .collect();
            let mut decorated = BTreeSet::new();
            while let Some(handle) = pending.pop() {
                if !decorated.insert(handle) {
                    continue;
                }
                let Ok(global) = module.global_variables.try_get(handle) else {
                    continue;
                };
                for decoration in &global.spirv_decorations {
                    if let rglsl::SpirvDecorationOperands::Ids(ref ids) = decoration.operands {
                        for &id in ids {
                            if let rglsl::SpirvId::Global(target) = id {
                                used.insert(target);
                                pending.push(target);
                            }
                        }
                    }
                }
            }
            on_use.difference(&used).copied().collect()
        })
        .collect()
}
