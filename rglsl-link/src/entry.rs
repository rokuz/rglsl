use rglsl::object::PathStep;
use rglsl::{AddressSpace, Binding, EntryPoint, Expression, GlobalVariable, Handle, Type};

use crate::calls::{callees, Node, SymbolTable};
use crate::error::{internal, LinkError};
use crate::merge::{Builder, MergedGlobal};
use crate::unify::{common_paths, same_expression, unify, Implicit, Mismatch};

pub(crate) struct Candidate<'c> {
    pub global: &'c GlobalVariable,
    pub implicit: &'c [Vec<PathStep>],
    pub automatic_location: bool,
    pub automatic_binding: Option<Option<u32>>,
    pub instance: Option<String>,
}

impl Builder<'_> {
    pub(crate) fn merge_global(
        &mut self,
        position: usize,
        existing: &MergedGlobal,
        candidate: &Candidate,
    ) {
        let name = existing.name.clone();
        let mismatch = |what: &'static str| LinkError::GlobalMismatch {
            name: name.clone(),
            what,
        };
        let current = self.module.global_variables[existing.handle].clone();
        let GlobalVariable {
            name: _,
            space,
            binding,
            ty,
            init,
            memory_decorations,
            ref io,
            xfb,
            input_attachment_index,
            heap_offset,
            tile_attachment,
            ref spirv_decorations,
            relaxed_precision: _,
            immediate_bank,
            block,
        } = *candidate.global;
        if current.space != space {
            self.errors.push(mismatch("storage qualifiers"));
            return;
        }
        let automatic =
            existing.automatic_binding.is_some() || candidate.automatic_binding.is_some();
        if current.binding != binding && !automatic {
            self.errors.push(mismatch("layout binding qualifiers"));
        }
        if current.memory_decorations != memory_decorations {
            self.errors.push(mismatch("memory qualifiers"));
        }
        if !same_io(
            current.io.as_ref(),
            io.as_ref(),
            existing.automatic_location || candidate.automatic_location,
        ) {
            self.errors
                .push(mismatch("layout location and interpolation qualifiers"));
        }
        if current.xfb != xfb {
            self.errors.push(mismatch("xfb layout qualifiers"));
        }
        if current.input_attachment_index != input_attachment_index {
            self.errors.push(mismatch("input attachment indices"));
        }
        if current.tile_attachment != tile_attachment {
            self.errors.push(mismatch("tile attachment qualifiers"));
        }
        if current.block != block {
            self.errors.push(mismatch("block declarations"));
        }
        if current.immediate_bank != immediate_bank {
            self.errors.push(mismatch("push constant bank qualifiers"));
        }
        if current.spirv_decorations.len() != spirv_decorations.len() {
            self.errors.push(mismatch("SPIR-V decorate qualifiers"));
        }
        if !same_optional(&self.module, current.init, init) {
            self.errors.push(mismatch("initializers"));
        }
        if !same_optional(&self.module, current.heap_offset, heap_offset) {
            self.errors.push(mismatch("descriptor heap offsets"));
        }
        let implicit = Implicit {
            a: &existing.implicit,
            b: candidate.implicit,
        };
        match unify(&mut self.module, current.ty, ty, &implicit, &mut Vec::new()) {
            Ok(unified) => {
                self.module.global_variables.get_mut(existing.handle).ty = unified;
                if existing.automatic_binding.is_some() && candidate.automatic_binding.is_none() {
                    self.module
                        .global_variables
                        .get_mut(existing.handle)
                        .binding = binding;
                }
                if let Some(merged) = self.globals.get_mut(position) {
                    merged.implicit = common_paths(&existing.implicit, candidate.implicit);
                    merged.automatic_location =
                        existing.automatic_location && candidate.automatic_location;
                    if candidate.automatic_binding.is_none() {
                        merged.automatic_binding = None;
                    }
                }
            }
            Err(Mismatch::ImplicitSize) => self.errors.push(LinkError::ImplicitSize(name.clone())),
            Err(Mismatch::Types) => self.errors.push(mismatch("types")),
        }
        if let Some(ref instance) = candidate.instance {
            let previous = self.instance(existing.handle);
            if previous.is_some_and(|previous| previous != instance) {
                self.warnings.push(format!(
                    "Matched shader interfaces are using different instance names: block `{name}`"
                ));
            }
        }
    }

    pub fn add_functions(&mut self, table: &SymbolTable, order: &[Node]) -> Result<(), LinkError> {
        for &node in order {
            let (index, handle) = node;
            let object = self.object(index)?;
            let library = object.is_library();
            let mut function = object
                .module
                .functions
                .try_get(handle)
                .map_err(internal)?
                .clone();
            self.map_callees(table, index, &function.body)?;
            function.diagnostic_filter_leaf = None;
            self.remap(index)?
                .adjust_function(&mut function)
                .map_err(internal)?;
            let span = object.module.functions.get_span(handle);
            let new = self.module.functions.append(function, span);
            if library {
                self.library_functions.push(new);
            }
            self.functions.insert(node, new);
        }
        Ok(())
    }

    fn map_callees(
        &mut self,
        table: &SymbolTable,
        index: usize,
        body: &rglsl::Block,
    ) -> Result<(), LinkError> {
        let mut found = Vec::new();
        callees(body, &mut found);
        for callee in found {
            let target = table
                .resolve(self.objects, (index, callee))
                .map_err(LinkError::MissingDefinition)?;
            let new = *self
                .functions
                .get(&target)
                .ok_or_else(|| internal("a callee is not linked before its caller"))?;
            self.remaps
                .get_mut(index)
                .ok_or_else(|| internal("object index"))?
                .map_function(callee, new);
        }
        Ok(())
    }

    pub fn add_entry_point(
        &mut self,
        table: &SymbolTable,
        main: usize,
    ) -> Result<EntryPoint, LinkError> {
        let entry = self
            .object(main)?
            .module
            .entry_points
            .first()
            .ok_or(LinkError::MissingEntryPoint)?
            .clone();
        self.map_callees(table, main, &entry.function.body)?;
        let interface = self.interface()?;
        let remap = self.remap(main)?;
        let global = |handle: Handle<GlobalVariable>| remap.global(handle).map_err(internal);
        let expression =
            |handle: Handle<Expression>| remap.global_expression(handle).map_err(internal);
        let ty = |handle: Handle<Type>| remap.ty(handle).map_err(internal);
        let EntryPoint {
            name,
            stage,
            early_depth_test,
            workgroup_size,
            workgroup_size_overrides,
            workgroup_size_builtin,
            mut function,
            mesh_info,
            task_payload,
            incoming_ray_payload,
            interface: _,
            transform_feedback,
            opacity_micromap,
            quad_control,
            fragment_modes,
            geometry,
            tessellation,
            mesh_shader,
            tile_shading,
            derivative_group,
            spirv_execution_modes,
            reconvergence,
            invariant_outputs,
        } = entry;
        function.diagnostic_filter_leaf = None;
        remap.adjust_function(&mut function).map_err(internal)?;
        let workgroup_size_overrides = match workgroup_size_overrides {
            Some(sizes) => {
                let mut mapped = [None; 3];
                for (slot, size) in mapped.iter_mut().zip(sizes) {
                    *slot = size.map(expression).transpose()?;
                }
                Some(mapped)
            }
            None => None,
        };
        let mesh_info = match mesh_info {
            Some(info) => Some(rglsl::MeshStageInfo {
                max_vertices_override: info.max_vertices_override.map(expression).transpose()?,
                max_primitives_override: info
                    .max_primitives_override
                    .map(expression)
                    .transpose()?,
                vertex_output_type: ty(info.vertex_output_type)?,
                primitive_output_type: ty(info.primitive_output_type)?,
                output_variable: global(info.output_variable)?,
                ..info
            }),
            None => None,
        };
        let geometry = match geometry {
            Some(info) => Some(rglsl::GeometryInfo {
                streams: info
                    .streams
                    .iter()
                    .map(|&(handle, stream)| Ok((global(handle)?, stream)))
                    .collect::<Result<_, LinkError>>()?,
                passthrough: info
                    .passthrough
                    .iter()
                    .map(|&handle| global(handle))
                    .collect::<Result<_, LinkError>>()?,
                ..info
            }),
            None => None,
        };
        let mesh_shader = match mesh_shader {
            Some(info) => Some(rglsl::MeshShaderInfo {
                task_memory: info
                    .task_memory
                    .iter()
                    .map(|&handle| global(handle))
                    .collect::<Result<_, LinkError>>()?,
                ..info
            }),
            None => None,
        };
        let spirv_execution_modes = spirv_execution_modes
            .into_iter()
            .map(|mode| {
                let operands = match mode.operands {
                    rglsl::SpirvExecutionModeOperands::Ids(ids) => {
                        rglsl::SpirvExecutionModeOperands::Ids(
                            ids.into_iter()
                                .map(expression)
                                .collect::<Result<_, LinkError>>()?,
                        )
                    }
                    literals @ rglsl::SpirvExecutionModeOperands::Literals(_) => literals,
                };
                Ok(rglsl::SpirvExecutionMode {
                    mode: mode.mode,
                    operands,
                })
            })
            .collect::<Result<Vec<_>, LinkError>>()?;
        Ok(EntryPoint {
            name,
            stage,
            early_depth_test,
            workgroup_size,
            workgroup_size_overrides,
            workgroup_size_builtin,
            function,
            mesh_info,
            task_payload: task_payload.map(global).transpose()?,
            incoming_ray_payload: incoming_ray_payload.map(global).transpose()?,
            interface,
            transform_feedback,
            opacity_micromap: opacity_micromap.map(expression).transpose()?,
            quad_control,
            fragment_modes,
            geometry,
            tessellation,
            mesh_shader,
            tile_shading,
            derivative_group,
            spirv_execution_modes,
            reconvergence,
            invariant_outputs,
        })
    }

    fn interface(&self) -> Result<Vec<Handle<GlobalVariable>>, LinkError> {
        let mut interface = Vec::new();
        for (index, object) in self.objects.iter().enumerate() {
            let remap = self.remap(index)?;
            let declared: Vec<Handle<GlobalVariable>> = match object.module.entry_points.first() {
                Some(entry) => entry.interface.clone(),
                None => object
                    .module
                    .global_variables
                    .iter()
                    .filter(|&(_, global)| {
                        matches!(global.space, AddressSpace::Input | AddressSpace::Output)
                    })
                    .map(|(handle, _)| handle)
                    .collect(),
            };
            for handle in declared {
                let mapped = remap.global(handle).map_err(internal)?;
                if !interface.contains(&mapped) {
                    interface.push(mapped);
                }
            }
        }
        Ok(interface)
    }

    pub fn merge_module_flags(&mut self) -> Result<(), LinkError> {
        self.module.legacy_buffer_blocks = !self.objects.is_empty()
            && self
                .objects
                .iter()
                .all(|object| object.module.legacy_buffer_blocks);
        for index in 0..self.objects.len() {
            let source = &self.object(index)?.module;
            let remap = self.remap(index)?;
            let mut special = self.module.special_types.clone();
            let incoming = &source.special_types;
            for (slot, value) in [
                (&mut special.ray_desc, incoming.ray_desc),
                (&mut special.ray_intersection, incoming.ray_intersection),
                (&mut special.ray_vertex_return, incoming.ray_vertex_return),
                (
                    &mut special.external_texture_params,
                    incoming.external_texture_params,
                ),
                (
                    &mut special.external_texture_transfer_function,
                    incoming.external_texture_transfer_function,
                ),
            ] {
                if slot.is_none() {
                    *slot = value.map(|ty| remap.ty(ty)).transpose().map_err(internal)?;
                }
            }
            for (kind, &ty) in &incoming.predeclared_types {
                if !special.predeclared_types.contains_key(kind) {
                    let ty = remap.ty(ty).map_err(internal)?;
                    special.predeclared_types.insert(kind.clone(), ty);
                }
            }
            let vulkan_memory_model = source.vulkan_memory_model;
            let descriptor_heap = source.descriptor_heap;
            let ray_tracing = source.ray_tracing;
            self.module.special_types = special;
            self.module.vulkan_memory_model |= vulkan_memory_model;
            self.module.descriptor_heap |= descriptor_heap;
            self.module.ray_tracing |= ray_tracing;
            for extension in &source.source_extensions {
                if let Err(position) = self.module.source_extensions.binary_search(extension) {
                    self.module
                        .source_extensions
                        .insert(position, extension.clone());
                }
            }
            let requirements = source.spirv_requirements.clone();
            let merged = &mut self.module.spirv_requirements;
            for extension in requirements.extensions {
                if !merged.extensions.contains(&extension) {
                    merged.extensions.push(extension);
                }
            }
            for capability in requirements.capabilities {
                if !merged.capabilities.contains(&capability) {
                    merged.capabilities.push(capability);
                }
            }
        }
        Ok(())
    }
}

fn same_optional(
    module: &rglsl::Module,
    a: Option<Handle<Expression>>,
    b: Option<Handle<Expression>>,
) -> bool {
    match (a, b) {
        (None, None) => true,
        (Some(a), Some(b)) => same_expression(module, a, b),
        _ => false,
    }
}

fn without_location(binding: &Binding) -> Binding {
    match *binding {
        Binding::Location {
            location: _,
            interpolation,
            sampling,
            blend_src,
            per_primitive,
            component,
            invariant,
            patch,
            per_view,
        } => Binding::Location {
            location: 0,
            interpolation,
            sampling,
            blend_src,
            per_primitive,
            component,
            invariant,
            patch,
            per_view,
        },
        Binding::BuiltIn(builtin) => Binding::BuiltIn(builtin),
    }
}

fn same_io(a: Option<&Binding>, b: Option<&Binding>, automatic: bool) -> bool {
    match (a, b) {
        (None, None) => true,
        (Some(a), Some(b)) if automatic => without_location(a) == without_location(b),
        (Some(a), Some(b)) => a == b,
        _ => false,
    }
}
