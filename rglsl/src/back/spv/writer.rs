use alloc::{string::String, vec, vec::Vec};

use arrayvec::ArrayVec;
use hashbrown::hash_map::Entry;
use spirv::Word;

use super::{
    BITS_PER_BYTE, Block, BlockContext, CachedConstant, CachedExpressions, CooperativeType,
    EntryPointContext, Error, Function, FunctionArgument, GlobalVariable, IdGenerator, Instruction,
    LocalImageType, LocalType, LocalVariable, LogicalLayout, LookupFunctionType, LookupType,
    NumericType, Options, PhysicalLayout, PipelineOptions, ResultMember, Writer, WriterFlags,
    feature, grammar,
    helpers::{
        contains_builtin, global_needs_wrapper, map_storage_class, references_builtin_output,
    },
};
use crate::{
    arena::{Handle, HandleVec, UniqueArena},
    back::spv::{BindingInfo, helpers::BindingDecorations},
    proc::{Alignment, TypeResolution},
    valid::{FunctionInfo, ModuleInfo},
};

pub(super) struct FunctionInterface<'a> {
    pub(super) varying_ids: &'a mut Vec<Word>,
    pub(super) stage: crate::ShaderStage,
}

impl Function {
    pub(super) fn to_words(&self, sink: &mut impl Extend<Word>) -> Result<(), Error> {
        let Some(ref signature) = self.signature else {
            return Err(Error::Validation("function is written without a signature"));
        };
        signature.to_words(sink);
        for argument in self.parameters.iter() {
            argument.instruction.to_words(sink);
        }
        for (index, block) in self.blocks.iter().enumerate() {
            Instruction::label(block.label_id).to_words(sink);
            if index == 0 {
                for local_var in self.variables.values() {
                    local_var.instruction.to_words(sink);
                }
                for internal_var in self.spilled_composites.values() {
                    internal_var.instruction.to_words(sink);
                }
            }
            for instruction in block.body.iter() {
                if !super::debug::is_marker(instruction) {
                    instruction.to_words(sink);
                }
            }
        }
        Instruction::function_end().to_words(sink);
        Ok(())
    }
}

impl Writer {
    pub fn new(options: &Options) -> Result<Self, Error> {
        let (major, minor) = options.lang_version;
        if major != 1 {
            return Err(Error::UnsupportedVersion(major, minor));
        }

        let mut capabilities_used = crate::FastIndexSet::default();
        capabilities_used.insert(spirv::Capability::Shader);

        let mut id_gen = IdGenerator::default();
        let gl450_ext_inst_id = id_gen.next();
        let void_type = id_gen.next();

        Ok(Writer {
            physical_layout: PhysicalLayout::new(major, minor),
            logical_layout: LogicalLayout::default(),
            id_gen,
            capabilities_available: options.capabilities.clone(),
            capabilities_used,
            extensions_used: crate::FastIndexSet::default(),
            debug_strings: vec![],
            debugs: vec![],
            annotations: vec![],
            flags: options.flags,
            vulkan_memory_model: false,
            device_scope_used: false,
            void_type,
            lookup_type: crate::FastHashMap::default(),
            lookup_function: crate::FastHashMap::default(),
            lookup_function_type: crate::FastHashMap::default(),
            constant_ids: HandleVec::new(),
            cached_constants: crate::FastHashMap::default(),
            override_ids: Vec::new(),
            override_dependent: Vec::new(),
            spec_defaults: Vec::new(),
            spec_composites: crate::FastHashMap::default(),
            cooperative_vector_types: crate::FastHashSet::default(),
            global_variables: HandleVec::new(),
            laid_out_types: crate::arena::HandleSet::new(),
            composite_types: crate::FastHashMap::default(),
            plain_types: crate::FastHashMap::default(),
            laid_out_of_plain: crate::FastHashMap::default(),
            physical_types: crate::FastHashMap::default(),
            decorated_blocks: crate::arena::HandleSet::new(),
            nested_types: crate::arena::HandleSet::new(),
            buffer_blocks: crate::FastHashSet::default(),
            physical_pointees: crate::FastHashMap::default(),
            forward_pointers: crate::FastHashMap::default(),
            physical_type_ids: crate::FastHashSet::default(),
            fake_missing_bindings: options.fake_missing_bindings,
            binding_map: options.binding_map.clone(),
            saved_cached: CachedExpressions::default(),
            gl450_ext_inst_id,
            temp_list: Vec::new(),
            has_ray_tracing_pipeline: false,
            micromap_acceleration_structures: false,
            legacy_buffer_blocks: false,
            invariant_outputs: false,
            legacy_storage_blocks: crate::FastHashSet::default(),
            mesh_flavor: None,
            task_memory_strides: crate::FastHashSet::default(),
            ray_tracing_features: crate::RayTracingFeatures::empty(),
            debug_printf: None,
            undeclarable_scalar: false,
            debug_printf_strings: crate::FastHashMap::default(),
            raw_capabilities: crate::FastIndexSet::default(),
            raw_extensions: crate::FastIndexSet::default(),
            spirv_ext_imports: crate::FastHashMap::default(),
            utf_encoded: crate::FastHashSet::default(),
            qcom_decorations: crate::FastHashSet::default(),
            laid_out_copies: crate::FastHashMap::default(),
            heap: super::heap::HeapState::default(),
            descriptor_heap: false,
            debug: super::debug::DebugState::new(options.debug_info.as_ref()),
        })
    }

    pub fn set_options(&mut self, options: &Options) -> Result<(), Error> {
        let (major, minor) = options.lang_version;
        if major != 1 {
            return Err(Error::UnsupportedVersion(major, minor));
        }
        self.physical_layout = PhysicalLayout::new(major, minor);
        self.capabilities_available = options.capabilities.clone();
        self.flags = options.flags;
        self.binding_map = options.binding_map.clone();
        self.debug = super::debug::DebugState::new(options.debug_info.as_ref());
        Ok(())
    }

    /// Returns `(major, minor)` of the SPIR-V language version.
    pub const fn lang_version(&self) -> (u8, u8) {
        self.physical_layout.lang_version()
    }

    pub(super) fn sampled_buffer_is_image(&self, dim: crate::ImageDimension) -> bool {
        dim == crate::ImageDimension::Buffer && self.lang_version() >= (1, 6)
    }

    pub(super) const fn storage_class(&self, space: crate::AddressSpace) -> spirv::StorageClass {
        if self.legacy_buffer_blocks && matches!(space, crate::AddressSpace::Storage { .. }) {
            spirv::StorageClass::Uniform
        } else {
            map_storage_class(space)
        }
    }

    fn decorate_buffer_block(
        &mut self,
        id: Word,
        global: &crate::GlobalVariable,
    ) -> Result<bool, Error> {
        let legacy = self.legacy_buffer_blocks
            && match global.space {
                crate::AddressSpace::Storage { .. } => true,
                crate::AddressSpace::ShaderRecord => {
                    global.block == Some(crate::BlockDeclaration::Buffer)
                }
                crate::AddressSpace::Function
                | crate::AddressSpace::Private
                | crate::AddressSpace::WorkGroup
                | crate::AddressSpace::Uniform
                | crate::AddressSpace::Handle
                | crate::AddressSpace::Immediate
                | crate::AddressSpace::TaskPayload
                | crate::AddressSpace::RayPayload
                | crate::AddressSpace::IncomingRayPayload
                | crate::AddressSpace::HitAttribute
                | crate::AddressSpace::CallableData
                | crate::AddressSpace::IncomingCallableData
                | crate::AddressSpace::HitObjectAttribute { .. }
                | crate::AddressSpace::Input
                | crate::AddressSpace::Output
                | crate::AddressSpace::PhysicalStorage { .. }
                | crate::AddressSpace::DescriptorHeap(_) => false,
            };
        if !self.buffer_blocks.insert(id) {
            if legacy != self.legacy_storage_blocks.contains(&id) {
                return Err(Error::Validation(
                    "a block type is shared by a uniform and a storage buffer",
                ));
            }
            return Ok(false);
        }
        if legacy {
            self.legacy_storage_blocks.insert(id);
            self.decorate(id, spirv::Decoration::BufferBlock, &[]);
        } else {
            self.decorate(id, spirv::Decoration::Block, &[]);
        }
        Ok(true)
    }

    /// Reset `Writer` to its initial state, retaining any allocations.
    ///
    /// Why not just implement `Reclaimable` for `Writer`? By design,
    /// `Reclaimable::reclaim` requires ownership of the value, not just
    /// `&mut`; see the trait documentation. But we need to use this method
    /// from functions like `Writer::write`, which only have `&mut Writer`.
    /// Workarounds include unsafe code (`core::ptr::read`, then `write`, ugh)
    /// or something like a `Default` impl that returns an oddly-initialized
    /// `Writer`, which is worse.
    fn reset(&mut self) {
        use super::reclaimable::Reclaimable;
        use core::mem::take;

        let mut id_gen = IdGenerator::default();
        let gl450_ext_inst_id = id_gen.next();
        let void_type = id_gen.next();

        // Every field of the old writer that is not determined by the `Options`
        // passed to `Writer::new` should be reset somehow.
        let fresh = Writer {
            // Copied from the old Writer:
            flags: self.flags,
            vulkan_memory_model: false,
            device_scope_used: false,
            capabilities_available: take(&mut self.capabilities_available),
            fake_missing_bindings: self.fake_missing_bindings,
            binding_map: take(&mut self.binding_map),

            // Initialized afresh:
            id_gen,
            void_type,
            gl450_ext_inst_id,

            // Reclaimed:
            capabilities_used: take(&mut self.capabilities_used).reclaim(),
            extensions_used: take(&mut self.extensions_used).reclaim(),
            physical_layout: self.physical_layout.clone().reclaim(),
            logical_layout: take(&mut self.logical_layout).reclaim(),
            debug_strings: take(&mut self.debug_strings).reclaim(),
            debugs: take(&mut self.debugs).reclaim(),
            annotations: take(&mut self.annotations).reclaim(),
            lookup_type: take(&mut self.lookup_type).reclaim(),
            lookup_function: take(&mut self.lookup_function).reclaim(),
            lookup_function_type: take(&mut self.lookup_function_type).reclaim(),
            constant_ids: take(&mut self.constant_ids).reclaim(),
            cached_constants: take(&mut self.cached_constants).reclaim(),
            override_ids: take(&mut self.override_ids).reclaim(),
            override_dependent: take(&mut self.override_dependent).reclaim(),
            spec_defaults: take(&mut self.spec_defaults).reclaim(),
            spec_composites: take(&mut self.spec_composites).reclaim(),
            cooperative_vector_types: take(&mut self.cooperative_vector_types).reclaim(),
            global_variables: take(&mut self.global_variables).reclaim(),
            laid_out_types: crate::arena::HandleSet::new(),
            composite_types: take(&mut self.composite_types).reclaim(),
            plain_types: take(&mut self.plain_types).reclaim(),
            laid_out_of_plain: take(&mut self.laid_out_of_plain).reclaim(),
            physical_types: take(&mut self.physical_types).reclaim(),
            decorated_blocks: crate::arena::HandleSet::new(),
            nested_types: crate::arena::HandleSet::new(),
            buffer_blocks: crate::FastHashSet::default(),
            physical_pointees: take(&mut self.physical_pointees).reclaim(),
            forward_pointers: take(&mut self.forward_pointers).reclaim(),
            physical_type_ids: take(&mut self.physical_type_ids).reclaim(),
            saved_cached: take(&mut self.saved_cached).reclaim(),
            temp_list: take(&mut self.temp_list).reclaim(),
            has_ray_tracing_pipeline: false,
            micromap_acceleration_structures: false,
            legacy_buffer_blocks: false,
            invariant_outputs: false,
            legacy_storage_blocks: crate::FastHashSet::default(),
            mesh_flavor: None,
            task_memory_strides: crate::FastHashSet::default(),
            ray_tracing_features: crate::RayTracingFeatures::empty(),
            debug_printf: None,
            undeclarable_scalar: false,
            debug_printf_strings: take(&mut self.debug_printf_strings).reclaim(),
            raw_capabilities: take(&mut self.raw_capabilities).reclaim(),
            raw_extensions: take(&mut self.raw_extensions).reclaim(),
            spirv_ext_imports: take(&mut self.spirv_ext_imports).reclaim(),
            utf_encoded: take(&mut self.utf_encoded).reclaim(),
            qcom_decorations: take(&mut self.qcom_decorations).reclaim(),
            laid_out_copies: take(&mut self.laid_out_copies).reclaim(),
            heap: super::heap::HeapState::default(),
            descriptor_heap: false,
            debug: take(&mut self.debug),
        };

        *self = fresh;

        self.capabilities_used.insert(spirv::Capability::Shader);
    }

    /// Indicate that the code requires any one of the listed capabilities.
    ///
    /// If nothing in `capabilities` appears in the available capabilities
    /// specified in the [`Options`] from which this `Writer` was created,
    /// return an error. The `what` string is used in the error message to
    /// explain what provoked the requirement. (If no available capabilities were
    /// given, assume everything is available.)
    ///
    /// The first acceptable capability will be added to this `Writer`'s
    /// [`capabilities_used`] table, and an `OpCapability` emitted for it in the
    /// result. For this reason, more specific capabilities should be listed
    /// before more general.
    ///
    /// [`capabilities_used`]: Writer::capabilities_used
    pub(super) fn require_any(
        &mut self,
        what: &'static str,
        capabilities: &[spirv::Capability],
    ) -> Result<(), Error> {
        match *capabilities {
            [] => Ok(()),
            [first, ..] => {
                // Find the first acceptable capability, or return an error if
                // there is none.
                let selected = match self.capabilities_available {
                    None => first,
                    Some(ref available) => {
                        match capabilities
                            .iter()
                            // need explicit type for hashbrown::HashSet::contains fn call to keep rustc happy
                            .find(|cap| available.contains::<spirv::Capability>(cap))
                        {
                            Some(&cap) => cap,
                            None => {
                                return Err(Error::MissingCapabilities(
                                    what,
                                    capabilities.to_vec(),
                                ));
                            }
                        }
                    }
                };
                self.capabilities_used.insert(selected);
                Ok(())
            }
        }
    }

    /// Indicate that the code requires all of the listed capabilities.
    ///
    /// If all entries of `capabilities` appear in the available capabilities
    /// specified in the [`Options`] from which this `Writer` was created
    /// (including the case where [`Options::capabilities`] is `None`), add
    /// them all to this `Writer`'s [`capabilities_used`] table, and return
    /// `Ok(())`. If at least one of the listed capabilities is not available,
    /// do not add anything to the `capabilities_used` table, and return the
    /// first unavailable requested capability, wrapped in `Err()`.
    ///
    /// This method is does not return an [`enum@Error`] in case of failure
    /// because it may be used in cases where the caller can recover (e.g.,
    /// with a polyfill) if the requested capabilities are not available. In
    /// this case, it would be unnecessary work to find *all* the unavailable
    /// requested capabilities, and to allocate a `Vec` for them, just so we
    /// could return an [`Error::MissingCapabilities`]).
    ///
    /// [`capabilities_used`]: Writer::capabilities_used
    pub(super) fn require_all(
        &mut self,
        capabilities: &[spirv::Capability],
    ) -> Result<(), spirv::Capability> {
        if let Some(ref available) = self.capabilities_available {
            for requested in capabilities {
                if !available.contains(requested) {
                    return Err(*requested);
                }
            }
        }

        for requested in capabilities {
            self.capabilities_used.insert(*requested);
        }

        Ok(())
    }

    pub(super) fn require_mesh_shading(&mut self) -> Result<(), Error> {
        self.require(match self.mesh_flavor {
            Some(crate::MeshFlavor::Nv) => &feature::MESH_SHADING_NV,
            Some(crate::MeshFlavor::Ext) | None => &feature::MESH_SHADING_EXT,
        })
    }

    pub(super) fn get_type_id(&mut self, lookup_ty: LookupType) -> Result<Word, Error> {
        match lookup_ty {
            LookupType::Handle(handle) => self.get_handle_type_id(handle),
            LookupType::Local(local) => Ok(self.get_localtype_id(local)),
        }
    }

    pub(super) fn get_handle_type_id(&self, handle: Handle<crate::Type>) -> Result<Word, Error> {
        self.lookup_type
            .get(&LookupType::Handle(handle))
            .copied()
            .ok_or(Error::Validation("a type is used before it is declared"))
    }

    pub(super) fn get_expression_lookup_type(
        &mut self,
        tr: &TypeResolution,
    ) -> Result<LookupType, Error> {
        match *tr {
            TypeResolution::Handle(ty_handle) => Ok(LookupType::Handle(ty_handle)),
            TypeResolution::Value(ref inner) => match self.localtype_from_inner(inner)? {
                Some(local) => Ok(LookupType::Local(local)),
                None => Err(Error::Validation(
                    "an aggregate type is only resolved by handle",
                )),
            },
        }
    }

    pub(super) fn get_expression_type_id(&mut self, tr: &TypeResolution) -> Result<Word, Error> {
        let lookup_ty = self.get_expression_lookup_type(tr)?;
        self.get_type_id(lookup_ty)
    }

    pub(super) fn get_localtype_id(&mut self, local: LocalType) -> Word {
        match self.lookup_type.entry(LookupType::Local(local)) {
            Entry::Occupied(e) => *e.get(),
            Entry::Vacant(e) => {
                let id = self.id_gen.next();
                e.insert(id);
                self.write_type_declaration_local(id, local);
                id
            }
        }
    }

    pub(super) fn get_pointer_type_id(&mut self, base: Word, class: spirv::StorageClass) -> Word {
        let base = self.pointee_type_id(base, class);
        self.get_localtype_id(LocalType::Pointer { base, class })
    }

    pub(super) fn get_handle_pointer_type_id(
        &mut self,
        base: Handle<crate::Type>,
        class: spirv::StorageClass,
    ) -> Result<Word, Error> {
        let base_id = self.get_handle_type_id(base)?;
        Ok(self.get_pointer_type_id(base_id, class))
    }

    /// Return a SPIR-V type for a pointer to `resolution`.
    ///
    /// The given `resolution` must be one that we can represent
    /// either as a `LocalType::Pointer` or `LocalType::LocalPointer`.
    pub(super) fn get_resolution_pointer_id(
        &mut self,
        resolution: &TypeResolution,
        class: spirv::StorageClass,
    ) -> Result<Word, Error> {
        let resolution_type_id = self.get_expression_type_id(resolution)?;
        Ok(self.get_pointer_type_id(resolution_type_id, class))
    }

    pub(super) fn get_numeric_type_id(&mut self, numeric: NumericType) -> Word {
        self.get_localtype_id(LocalType::Numeric(numeric))
    }

    pub(super) fn get_u32_type_id(&mut self) -> Word {
        self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::U32))
    }

    pub(super) fn get_f32_type_id(&mut self) -> Word {
        self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::F32))
    }

    pub(super) fn get_f32_pointer_type_id(&mut self, class: spirv::StorageClass) -> Word {
        let f32_id = self.get_f32_type_id();
        self.get_pointer_type_id(f32_id, class)
    }

    pub(super) fn get_bool_type_id(&mut self) -> Word {
        self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::BOOL))
    }

    pub(super) fn decorate(&mut self, id: Word, decoration: spirv::Decoration, operands: &[Word]) {
        self.annotations
            .push(Instruction::decorate(id, decoration, operands));
    }

    /// Return `inner` as a `LocalType`, if that's possible.
    ///
    /// If `inner` can be represented as a `LocalType`, return
    /// `Some(local_type)`.
    ///
    /// Otherwise, return `None`. In this case, the type must always be looked
    /// up using a `LookupType::Handle`.
    fn localtype_from_inner(
        &mut self,
        inner: &crate::TypeInner,
    ) -> Result<Option<LocalType>, Error> {
        Ok(Some(match *inner {
            crate::TypeInner::Scalar(scalar) | crate::TypeInner::Atomic(scalar) => {
                LocalType::Numeric(NumericType::Scalar(scalar))
            }
            crate::TypeInner::Vector { size, scalar } => {
                LocalType::Numeric(NumericType::Vector { size, scalar })
            }
            crate::TypeInner::Matrix {
                columns,
                rows,
                scalar,
            } => LocalType::Numeric(NumericType::Matrix {
                columns,
                rows,
                scalar,
            }),
            crate::TypeInner::CooperativeMatrix {
                columns,
                rows,
                scalar,
                role,
                scope,
                class,
            } => LocalType::Cooperative(CooperativeType::Matrix {
                columns,
                rows,
                scalar,
                role,
                scope,
                class,
            }),
            crate::TypeInner::LongVector {
                size,
                scalar,
                class,
            } => LocalType::Cooperative(CooperativeType::Vector {
                size,
                scalar,
                class: match size {
                    crate::CooperativeSize::Pending(_) => crate::LongVectorClass::CooperativeNv,
                    crate::CooperativeSize::Constant(_) => class,
                },
            }),
            crate::TypeInner::Pointer {
                space: crate::AddressSpace::DescriptorHeap(_),
                ..
            } => LocalType::UntypedPointer {
                class: spirv::StorageClass::UniformConstant,
            },
            crate::TypeInner::Pointer { base, space } => {
                let class = self.storage_class(space);
                let base_type_id = self.get_handle_type_id(base)?;
                LocalType::Pointer {
                    base: self.pointee_type_id(base_type_id, class),
                    class,
                }
            }
            crate::TypeInner::ValuePointer {
                space: crate::AddressSpace::DescriptorHeap(_),
                ..
            } => LocalType::UntypedPointer {
                class: spirv::StorageClass::UniformConstant,
            },
            crate::TypeInner::ValuePointer {
                size,
                scalar,
                space,
            } => {
                let base_numeric_type = match size {
                    Some(size) => NumericType::Vector { size, scalar },
                    None => NumericType::Scalar(scalar),
                };
                LocalType::Pointer {
                    base: self.get_numeric_type_id(base_numeric_type),
                    class: self.storage_class(space),
                }
            }
            crate::TypeInner::Image {
                dim,
                arrayed,
                class,
            } => LocalType::Image(LocalImageType::from_inner(dim, arrayed, class)?),
            crate::TypeInner::SampledImage {
                dim,
                arrayed,
                class,
            } => {
                let image = LocalType::Image(LocalImageType::from_inner(dim, arrayed, class)?);
                if self.sampled_buffer_is_image(dim) {
                    image
                } else {
                    LocalType::SampledImage {
                        image_type_id: self.get_localtype_id(image),
                    }
                }
            }
            crate::TypeInner::Sampler { comparison: _ } => LocalType::Sampler,
            crate::TypeInner::AccelerationStructure => LocalType::AccelerationStructure,
            crate::TypeInner::RayQuery => LocalType::RayQuery,
            crate::TypeInner::HitObject { flavor } => LocalType::HitObject(flavor),
            crate::TypeInner::BufferDescriptor { space, .. } => LocalType::BufferDescriptor {
                class: map_storage_class(space),
            },
            crate::TypeInner::Array { .. }
            | crate::TypeInner::Struct { .. }
            | crate::TypeInner::BindingArray { .. }
            | crate::TypeInner::TensorLayout { .. }
            | crate::TypeInner::TensorView { .. }
            | crate::TypeInner::Tensor { .. }
            | crate::TypeInner::Spirv { .. } => return Ok(None),
        }))
    }

    /// Resolve the [`BindingInfo`] for a [`crate::ResourceBinding`] from the
    /// provided [`Writer::binding_map`].
    ///
    /// If the specified resource is not present in the binding map this will
    /// return an error, unless [`Writer::fake_missing_bindings`] is set.
    pub(super) fn resolve_resource_binding(
        &self,
        res_binding: crate::ResourceBinding,
    ) -> Result<BindingInfo, Error> {
        match self.binding_map.get(&res_binding) {
            Some(target) => Ok(*target),
            None if self.fake_missing_bindings => Ok(BindingInfo {
                descriptor_set: res_binding.group,
                binding: res_binding.binding,
                binding_array_size: None,
            }),
            None => Err(Error::MissingBinding(res_binding)),
        }
    }

    fn write_function(
        &mut self,
        ir_function: &crate::Function,
        info: &FunctionInfo,
        ir_module: &crate::Module,
        mut interface: Option<FunctionInterface>,
        debug_start: Option<u32>,
    ) -> Result<Word, Error> {
        log::trace!("Generating code for {:?}", ir_function.name);
        let mut function = Function::default();

        let prelude_id = self.id_gen.next();
        let mut prelude = Block::new(prelude_id);
        let mut ep_context = EntryPointContext {
            argument_ids: Vec::new(),
            results: Vec::new(),
        };

        let mut parameter_type_ids = Vec::with_capacity(ir_function.arguments.len());

        for argument in ir_function.arguments.iter() {
            let class = spirv::StorageClass::Input;
            let handle_ty = ir_module.types[argument.ty].inner.is_handle();
            let binding_array = matches!(
                ir_module.types[argument.ty].inner,
                crate::TypeInner::BindingArray { .. }
            );
            let argument_type_id = if handle_ty || binding_array {
                self.get_handle_pointer_type_id(argument.ty, spirv::StorageClass::UniformConstant)?
            } else {
                self.get_handle_type_id(argument.ty)?
            };

            if let Some(ref mut iface) = interface {
                let id = if let Some(ref binding) = argument.binding {
                    let name = argument.name.as_deref();

                    let varying_id = self.write_varying(
                        ir_module,
                        iface.stage,
                        class,
                        name,
                        argument.ty,
                        binding,
                    )?;
                    iface.varying_ids.push(varying_id);
                    self.load_varying(&mut prelude.body, varying_id, argument_type_id)
                } else if let crate::TypeInner::Struct { ref members, .. } =
                    ir_module.types[argument.ty].inner
                {
                    let struct_id = self.id_gen.next();
                    let mut constituent_ids = Vec::with_capacity(members.len());
                    for member in members {
                        let type_id = self.get_handle_type_id(member.ty)?;
                        let name = member.name.as_deref();
                        let Some(binding) = member.binding.as_ref() else {
                            return Err(Error::Validation(
                                "entry point argument member has no binding",
                            ));
                        };
                        let varying_id = self.write_varying(
                            ir_module,
                            iface.stage,
                            class,
                            name,
                            member.ty,
                            binding,
                        )?;
                        iface.varying_ids.push(varying_id);
                        let id = self.load_varying(&mut prelude.body, varying_id, type_id);
                        constituent_ids.push(id);
                    }
                    prelude.body.push(Instruction::composite_construct(
                        argument_type_id,
                        struct_id,
                        &constituent_ids,
                    ));
                    struct_id
                } else {
                    return Err(Error::Validation("entry point argument has no binding"));
                };
                ep_context.argument_ids.push(id);
            } else {
                let argument_id = self.id_gen.next();
                self.decorate_pointer_parameter(&ir_module.types, argument.ty, argument_id);
                if argument.relaxed_precision {
                    self.decorate(argument_id, spirv::Decoration::RelaxedPrecision, &[]);
                }
                self.decorate_parameter_memory(argument_id, argument.memory_decorations);
                let instruction = Instruction::function_parameter(argument_type_id, argument_id);
                if self.flags.contains(WriterFlags::DEBUG)
                    && let Some(ref name) = argument.name
                {
                    self.debugs.push(Instruction::name(argument_id, name));
                }
                function.parameters.push(FunctionArgument {
                    instruction,
                    handle_id: if handle_ty {
                        let id = self.id_gen.next();
                        prelude.body.push(Instruction::load(
                            self.get_handle_type_id(argument.ty)?,
                            id,
                            argument_id,
                            None,
                        ));
                        id
                    } else {
                        0
                    },
                });
                parameter_type_ids.push(argument_type_id);
            };
        }

        let return_type_id = match ir_function.result {
            Some(ref result) => {
                if let Some(ref mut iface) = interface {
                    let mut has_point_size = false;
                    let class = spirv::StorageClass::Output;
                    if let Some(ref binding) = result.binding {
                        has_point_size |=
                            *binding == crate::Binding::BuiltIn(crate::BuiltIn::PointSize);
                        let type_id = self.get_handle_type_id(result.ty)?;
                        let varying_id =
                            if *binding == crate::Binding::BuiltIn(crate::BuiltIn::MeshTaskSize) {
                                0
                            } else {
                                let varying_id = self.write_varying(
                                    ir_module,
                                    iface.stage,
                                    class,
                                    None,
                                    result.ty,
                                    binding,
                                )?;
                                iface.varying_ids.push(varying_id);
                                varying_id
                            };
                        ep_context.results.push(ResultMember {
                            id: varying_id,
                            type_id,
                            built_in: binding.to_built_in(),
                        });
                    } else if let crate::TypeInner::Struct { ref members, .. } =
                        ir_module.types[result.ty].inner
                    {
                        for member in members {
                            let type_id = self.get_handle_type_id(member.ty)?;
                            let name = member.name.as_deref();
                            let Some(binding) = member.binding.as_ref() else {
                                return Err(Error::Validation(
                                    "entry point result member has no binding",
                                ));
                            };
                            has_point_size |=
                                *binding == crate::Binding::BuiltIn(crate::BuiltIn::PointSize);
                            // This isn't an actual builtin in SPIR-V. It can only appear as the
                            // output of a task shader and the output is used when writing the
                            // entry point return, in which case the id is ignored anyway.
                            let varying_id = if *binding
                                == crate::Binding::BuiltIn(crate::BuiltIn::MeshTaskSize)
                            {
                                0
                            } else {
                                let varying_id = self.write_varying(
                                    ir_module,
                                    iface.stage,
                                    class,
                                    name,
                                    member.ty,
                                    binding,
                                )?;
                                iface.varying_ids.push(varying_id);
                                varying_id
                            };
                            ep_context.results.push(ResultMember {
                                id: varying_id,
                                type_id,
                                built_in: binding.to_built_in(),
                            });
                        }
                    } else {
                        return Err(Error::Validation("entry point result has no binding"));
                    }

                    if self.flags.contains(WriterFlags::FORCE_POINT_SIZE)
                        && iface.stage == crate::ShaderStage::Vertex
                        && !has_point_size
                    {
                        // add point size artificially
                        let varying_id = self.id_gen.next();
                        let pointer_type_id = self.get_f32_pointer_type_id(class);
                        Instruction::variable(pointer_type_id, varying_id, class, None)
                            .to_words(&mut self.logical_layout.declarations);
                        self.decorate(
                            varying_id,
                            spirv::Decoration::BuiltIn,
                            &[spirv::BuiltIn::PointSize as u32],
                        );
                        iface.varying_ids.push(varying_id);

                        let default_value_id = self.get_constant_scalar(crate::Literal::F32(1.0));
                        prelude
                            .body
                            .push(Instruction::store(varying_id, default_value_id, None));
                    }
                    self.void_type
                } else {
                    self.get_handle_type_id(result.ty)?
                }
            }
            None => self.void_type,
        };

        let lookup_function_type = LookupFunctionType {
            parameter_type_ids,
            return_type_id,
        };

        let function_id = self.id_gen.next();
        if self.flags.contains(WriterFlags::DEBUG)
            && let Some(ref name) = ir_function.name
        {
            self.debugs.push(Instruction::name(function_id, name));
        }

        let function_type = self.get_function_type(lookup_function_type);
        if ir_function
            .result
            .as_ref()
            .is_some_and(|result| result.relaxed_precision)
        {
            self.decorate(function_id, spirv::Decoration::RelaxedPrecision, &[]);
        }
        let function_control = match ir_function.control {
            crate::FunctionControl::None => spirv::FunctionControl::empty(),
            crate::FunctionControl::Inline => spirv::FunctionControl::INLINE,
            crate::FunctionControl::DontInline => spirv::FunctionControl::DONT_INLINE,
        };
        function.signature = Some(Instruction::function(
            return_type_id,
            function_id,
            function_control,
            function_type,
        ));

        if self.flags.contains(WriterFlags::EXPORT_FUNCTIONS) && interface.is_none() {
            let mut operands =
                super::helpers::string_to_words(ir_function.name.as_deref().unwrap_or_default());
            let import = ir_function.linkage.is_import();
            operands.push(if import {
                spirv::LinkageType::Import as u32
            } else {
                spirv::LinkageType::Export as u32
            });
            self.decorate(function_id, spirv::Decoration::LinkageAttributes, &operands);
            if import {
                function.to_words(&mut self.logical_layout.function_definitions)?;
                return Ok(function_id);
            }
        }

        if interface.is_some() {
            function.entry_point_context = Some(ep_context);
        }

        // fill up the `GlobalVariable::access_id`
        for gv in self.global_variables.iter_mut() {
            gv.reset_for_function();
        }
        if let Some(ref mut iface) = interface
            && self.physical_layout.version >= 0x10400
        {
            iface.varying_ids.extend(self.heap_variable_ids());
        }
        for (handle, var) in ir_module.global_variables.iter() {
            if info[handle].is_empty() {
                continue;
            }
            if let crate::AddressSpace::DescriptorHeap(_) = var.space {
                continue;
            }

            let mut gv = self.global_variables[handle].clone();
            if let Some(ref mut iface) = interface {
                // Have to include global variables in the interface
                if self.physical_layout.version >= 0x10400 {
                    iface.varying_ids.push(gv.var_id);
                }
            }

            if matches!(
                ir_module.types[var.ty].inner,
                crate::TypeInner::BindingArray { .. }
            ) {
                gv.access_id = gv.var_id;
            } else if var.space == crate::AddressSpace::Handle {
                let var_type_id = self.get_handle_type_id(var.ty)?;
                let id = self.id_gen.next();
                prelude
                    .body
                    .push(Instruction::load(var_type_id, id, gv.var_id, None));
                if var.relaxed_precision {
                    self.decorate(id, spirv::Decoration::RelaxedPrecision, &[]);
                }
                gv.access_id = gv.var_id;
                gv.handle_id = id;
            } else if global_needs_wrapper(ir_module, &self.nested_types, var) {
                let class = self.storage_class(var.space);
                let pointer_type_id = self.get_handle_pointer_type_id(var.ty, class)?;
                let index_id = self.get_index_constant(0);
                let id = self.id_gen.next();
                prelude.body.push(Instruction::access_chain(
                    pointer_type_id,
                    id,
                    gv.var_id,
                    &[index_id],
                ));
                gv.access_id = id;
            } else {
                gv.access_id = gv.var_id;
            }

            // work around borrow checking in the presence of `self.xxx()` calls
            self.global_variables[handle] = gv;
        }

        // Create a `BlockContext` for generating SPIR-V for the function's
        // body.
        let mut context = BlockContext {
            ir_module,
            ir_function,
            fun_info: info,
            function: &mut function,
            // Re-use the cached expression table from prior functions.
            cached: core::mem::take(&mut self.saved_cached),

            // Steal the Writer's temp list for a bit.
            temp_list: core::mem::take(&mut self.temp_list),
            writer: self,
            expression_constness: super::ExpressionConstnessTracker::from_arena(
                &ir_function.expressions,
            ),
            physical_component_load: false,
            reachability: crate::proc::Reachability::new(&ir_function.body),
        };

        // fill up the pre-emitted and const expressions
        context.cached.reset(ir_function.expressions.len());
        for (handle, expr) in ir_function.expressions.iter() {
            if (expr.needs_pre_emit() && !matches!(*expr, crate::Expression::LocalVariable(_)))
                || context.expression_constness.is_constant_instruction(handle)
            {
                context.cache_expression_value(handle, &mut prelude)?;
            }
        }

        for (handle, variable) in ir_function.local_variables.iter() {
            let id = context.gen_id();
            context
                .writer
                .decorate_pointer_variable(&ir_module.types, variable.ty, id);
            if variable.relaxed_precision {
                context
                    .writer
                    .decorate(id, spirv::Decoration::RelaxedPrecision, &[]);
            }

            if context.writer.flags.contains(WriterFlags::DEBUG)
                && let Some(ref name) = variable.name
            {
                context.writer.debugs.push(Instruction::name(id, name));
            }

            let type_id = context.get_handle_type_id(variable.ty)?;
            let converted = context
                .writer
                .needs_layout_conversion(type_id, spirv::StorageClass::Function);
            let init_word = match variable.init {
                Some(constant) if converted => {
                    let value = context.writer.convert_layout(
                        &mut prelude,
                        type_id,
                        context.cached.get(constant)?,
                        true,
                    )?;
                    prelude.body.push(Instruction::store(id, value, None));
                    None
                }
                Some(constant) => Some(context.cached.get(constant)?),
                None => None,
            };
            let pointer_type_id = context
                .writer
                .get_handle_pointer_type_id(variable.ty, spirv::StorageClass::Function)?;
            let instruction = Instruction::variable(
                pointer_type_id,
                id,
                spirv::StorageClass::Function,
                init_word,
            );

            context
                .function
                .variables
                .insert(handle, LocalVariable { id, instruction });
        }

        super::atomic::collect_texel_images(&ir_function.body, &mut context.function.texel_images);
        for (handle, expr) in ir_function.expressions.iter() {
            match *expr {
                crate::Expression::LocalVariable(_) => {
                    context.cache_expression_value(handle, &mut prelude)?;
                }
                crate::Expression::Access { base, .. }
                | crate::Expression::AccessIndex { base, .. } => {
                    *context.function.access_uses.entry(base).or_insert(0) += 1;
                }
                crate::Expression::Literal(_)
                | crate::Expression::Constant(_)
                | crate::Expression::Override(_)
                | crate::Expression::ZeroValue(_)
                | crate::Expression::Compose { .. }
                | crate::Expression::Splat { .. }
                | crate::Expression::Swizzle { .. }
                | crate::Expression::FunctionArgument(_)
                | crate::Expression::GlobalVariable(_)
                | crate::Expression::Load { .. }
                | crate::Expression::ImageSample { .. }
                | crate::Expression::ImageLoad { .. }
                | crate::Expression::ImageQuery { .. }
                | crate::Expression::Unary { .. }
                | crate::Expression::Binary { .. }
                | crate::Expression::Select { .. }
                | crate::Expression::Derivative { .. }
                | crate::Expression::Relational { .. }
                | crate::Expression::Math { .. }
                | crate::Expression::As { .. }
                | crate::Expression::CallResult(_)
                | crate::Expression::AtomicResult { .. }
                | crate::Expression::ArrayLength(_)
                | crate::Expression::WideArrayLength(_)
                | crate::Expression::PhysicalPointer { .. }
                | crate::Expression::PhysicalAddress { .. }
                | crate::Expression::BufferPointer { .. }
                | crate::Expression::HeapOffset { .. }
                | crate::Expression::RayQueryProceedResult
                | crate::Expression::RayQueryGet { .. }
                | crate::Expression::ReportIntersectionResult
                | crate::Expression::AccelerationStructureFromAddress { .. }
                | crate::Expression::HitObjectGet { .. }
                | crate::Expression::FetchMicroTriangleVertex { .. }
                | crate::Expression::SubgroupBallotResult
                | crate::Expression::SubgroupOperationResult { .. }
                | crate::Expression::SpirvInstructionResult { .. }
                | crate::Expression::CooperativeLoad { .. }
                | crate::Expression::CooperativeMultiplyAdd { .. }
                | crate::Expression::CooperativeMatrixLength { .. }
                | crate::Expression::Expect { .. }
                | crate::Expression::ImageSparseResident { .. }
                | crate::Expression::IsHelperInvocation
                | crate::Expression::ReadClock { .. }
                | crate::Expression::InterpolateAt { .. }
                | crate::Expression::FragmentFetch { .. }
                | crate::Expression::ImageFootprint { .. }
                | crate::Expression::AttachmentRead { .. }
                | crate::Expression::Replicate { .. }
                | crate::Expression::CooperativeVectorLoad { .. }
                | crate::Expression::CooperativeVectorMatMul { .. }
                | crate::Expression::Convert { .. }
                | crate::Expression::CooperativeMatrixResult { .. }
                | crate::Expression::TensorCreate { .. }
                | crate::Expression::ImageProcessing { .. }
                | crate::Expression::ArrayConversion { .. }
                | crate::Expression::Bitcast { .. }
                | crate::Expression::TensorSet { .. }
                | crate::Expression::TensorRead { .. }
                | crate::Expression::TensorQuerySize { .. } => {}
            }
        }

        let next_id = context.gen_id();

        context
            .function
            .consume(prelude, Instruction::branch(next_id));

        let parameter_ids: Vec<Word> = context
            .function
            .parameters
            .iter()
            .map(|parameter| parameter.instruction.result_id.unwrap_or(0))
            .collect();
        context.writer.debug_function_begin(
            ir_module,
            ir_function,
            debug_start,
            (function_id, &parameter_ids),
            &context.function.variables,
        );

        context.write_function_body(next_id)?;

        // Consume the `BlockContext`, ending its borrows and letting the
        // `Writer` steal back its cached expression table and temp_list.
        let BlockContext {
            cached, temp_list, ..
        } = context;
        self.saved_cached = cached;
        self.temp_list = temp_list;

        self.debug_function_finish(ir_module, &mut function);
        function.to_words(&mut self.logical_layout.function_definitions)?;

        Ok(function_id)
    }

    fn write_execution_mode(
        &mut self,
        function_id: Word,
        mode: spirv::ExecutionMode,
    ) -> Result<(), Error> {
        //self.check(mode.required_capabilities())?;
        Instruction::execution_mode(function_id, mode, &[])
            .to_words(&mut self.logical_layout.execution_modes);
        Ok(())
    }

    // TODO Move to instructions module
    fn write_entry_point(
        &mut self,
        entry_point: &crate::EntryPoint,
        info: &FunctionInfo,
        ir_module: &crate::Module,
    ) -> Result<Instruction, Error> {
        let mut interface_ids = Vec::new();

        let function_id = self.write_function(
            &entry_point.function,
            info,
            ir_module,
            Some(FunctionInterface {
                varying_ids: &mut interface_ids,
                stage: entry_point.stage,
            }),
            ir_module
                .debug_info
                .as_deref()
                .and_then(|info| info.units.iter().find_map(|unit| unit.entry)),
        )?;

        // Inputs and outputs that are global variables.
        for &handle in &entry_point.interface {
            let id = self.global_variables[handle].var_id;
            if id != 0 && !interface_ids.contains(&id) {
                interface_ids.push(id);
            }
        }

        if entry_point.transform_feedback {
            self.require_any(
                "transform feedback",
                &[spirv::Capability::TransformFeedback],
            )?;
            self.write_execution_mode(function_id, spirv::ExecutionMode::Xfb)?;
        }
        self.write_opacity_micromap_mode(function_id, entry_point)?;
        self.write_spirv_execution_modes(function_id, entry_point)?;
        if ir_module.shader_64bit_indexing {
            self.require(&feature::SHADER_64BIT_INDEXING)?;
            self.write_execution_mode(function_id, spirv::ExecutionMode::Shader64BitIndexingEXT)?;
        }

        for (enabled, mode) in [
            (
                entry_point.quad_control.quad_derivatives,
                spirv::ExecutionMode::QuadDerivativesKHR,
            ),
            (
                entry_point.quad_control.require_full_quads,
                spirv::ExecutionMode::RequireFullQuadsKHR,
            ),
        ] {
            if enabled {
                self.require(&feature::QUAD_CONTROL)?;
                self.write_execution_mode(function_id, mode)?;
            }
        }

        if entry_point.reconvergence.subgroup_uniform_control_flow {
            self.use_feature(&feature::SUBGROUP_UNIFORM_CONTROL_FLOW);
            self.write_execution_mode(
                function_id,
                spirv::ExecutionMode::SubgroupUniformControlFlowKHR,
            )?;
        }
        if entry_point.reconvergence.maximally_reconverges {
            self.use_feature(&feature::MAXIMAL_RECONVERGENCE);
            self.write_execution_mode(function_id, spirv::ExecutionMode::MaximallyReconvergesKHR)?;
        }

        if let Some(group) = entry_point.derivative_group {
            use crate::DerivativeFlavor as Df;
            use crate::DerivativeGroupShape as Ds;
            let (feature, mode) = match (group.flavor, group.shape) {
                (Df::Khr, Ds::Quads) => (
                    &feature::DERIVATIVE_GROUP_QUADS_KHR,
                    spirv::ExecutionMode::DerivativeGroupQuadsKHR,
                ),
                (Df::Khr, Ds::Linear) => (
                    &feature::DERIVATIVE_GROUP_LINEAR_KHR,
                    spirv::ExecutionMode::DerivativeGroupLinearKHR,
                ),
                (Df::Nv, Ds::Quads) => (
                    &feature::DERIVATIVE_GROUP_QUADS_NV,
                    spirv::ExecutionMode::DerivativeGroupQuadsKHR,
                ),
                (Df::Nv, Ds::Linear) => (
                    &feature::DERIVATIVE_GROUP_LINEAR_NV,
                    spirv::ExecutionMode::DerivativeGroupLinearKHR,
                ),
            };
            self.require(feature)?;
            self.write_execution_mode(function_id, mode)?;
        }

        if entry_point.tile_shading.non_coherent_attachment_read {
            self.require(&feature::TILE_SHADING)?;
            self.write_execution_mode(
                function_id,
                spirv::ExecutionMode::NonCoherentTileAttachmentReadQCOM,
            )?;
        }

        if let Some(ref geometry) = entry_point.geometry {
            self.write_streams(&geometry.streams)?;
            self.write_passthrough(&geometry.passthrough)?;
        }

        let exec_model = match entry_point.stage {
            crate::ShaderStage::Vertex => spirv::ExecutionModel::Vertex,
            crate::ShaderStage::TessControl => {
                self.write_tessellation_modes(function_id, entry_point.tessellation.as_ref())?;
                spirv::ExecutionModel::TessellationControl
            }
            crate::ShaderStage::TessEvaluation => {
                self.write_tessellation_modes(function_id, entry_point.tessellation.as_ref())?;
                spirv::ExecutionModel::TessellationEvaluation
            }
            crate::ShaderStage::Geometry => {
                self.write_geometry_modes(function_id, entry_point.geometry.as_ref())?;
                spirv::ExecutionModel::Geometry
            }
            crate::ShaderStage::Fragment => {
                self.write_execution_mode(function_id, spirv::ExecutionMode::OriginUpperLeft)?;
                match entry_point.early_depth_test {
                    Some(crate::EarlyDepthTest::Force) => {
                        self.write_execution_mode(
                            function_id,
                            spirv::ExecutionMode::EarlyFragmentTests,
                        )?;
                    }
                    Some(crate::EarlyDepthTest::Allow { conservative }) => {
                        // TODO: Consider emitting EarlyAndLateFragmentTestsAMD here, if available.
                        // https://github.khronos.org/SPIRV-Registry/extensions/AMD/SPV_AMD_shader_early_and_late_fragment_tests.html
                        // This permits early depth tests even if the shader writes to a storage
                        // binding
                        match conservative {
                            crate::ConservativeDepth::GreaterEqual => self.write_execution_mode(
                                function_id,
                                spirv::ExecutionMode::DepthGreater,
                            )?,
                            crate::ConservativeDepth::LessEqual => self.write_execution_mode(
                                function_id,
                                spirv::ExecutionMode::DepthLess,
                            )?,
                            crate::ConservativeDepth::Unchanged => self.write_execution_mode(
                                function_id,
                                spirv::ExecutionMode::DepthUnchanged,
                            )?,
                        }
                    }
                    None => {}
                }
                let modes = entry_point.fragment_modes;
                if modes.early_and_late_fragment_tests {
                    self.use_feature(&feature::AMD_EARLY_AND_LATE_FRAGMENT_TESTS);
                    self.write_execution_mode(
                        function_id,
                        spirv::ExecutionMode::EarlyAndLateFragmentTestsAMD,
                    )?;
                }
                if modes.post_depth_coverage {
                    self.require(&feature::POST_DEPTH_COVERAGE)?;
                    self.write_execution_mode(
                        function_id,
                        spirv::ExecutionMode::PostDepthCoverage,
                    )?;
                }
                for (enabled, feature, mode) in [
                    (
                        modes.non_coherent_color_attachment_read,
                        &feature::TILE_IMAGE_COLOR_READ,
                        spirv::ExecutionMode::NonCoherentColorAttachmentReadEXT,
                    ),
                    (
                        modes.non_coherent_depth_attachment_read,
                        &feature::TILE_IMAGE_DEPTH_READ,
                        spirv::ExecutionMode::NonCoherentDepthAttachmentReadEXT,
                    ),
                    (
                        modes.non_coherent_stencil_attachment_read,
                        &feature::TILE_IMAGE_STENCIL_READ,
                        spirv::ExecutionMode::NonCoherentStencilAttachmentReadEXT,
                    ),
                ] {
                    if enabled {
                        self.require(feature)?;
                        self.write_execution_mode(function_id, mode)?;
                    }
                }
                let result_depth = entry_point.function.result.as_ref().is_some_and(|result| {
                    contains_builtin(
                        result.binding.as_ref(),
                        result.ty,
                        &ir_module.types,
                        crate::BuiltIn::FragDepth,
                    )
                });
                let interface_depth =
                    references_builtin_output(ir_module, entry_point, crate::BuiltIn::FragDepth);
                if result_depth || interface_depth {
                    self.write_execution_mode(function_id, spirv::ExecutionMode::DepthReplacing)?;
                }
                let stencil = references_builtin_output(
                    ir_module,
                    entry_point,
                    crate::BuiltIn::FragStencilRef,
                );
                if stencil {
                    self.write_execution_mode(
                        function_id,
                        spirv::ExecutionMode::StencilRefReplacingEXT,
                    )?;
                }
                if let Some(interlock) = modes.interlock {
                    use crate::InterlockScope as Is;
                    use spirv::ExecutionMode as Em;
                    let (mode, feature) = match (interlock.scope, interlock.ordered) {
                        (Is::Pixel, true) => {
                            (Em::PixelInterlockOrderedEXT, &feature::PIXEL_INTERLOCK)
                        }
                        (Is::Pixel, false) => {
                            (Em::PixelInterlockUnorderedEXT, &feature::PIXEL_INTERLOCK)
                        }
                        (Is::Sample, true) => {
                            (Em::SampleInterlockOrderedEXT, &feature::SAMPLE_INTERLOCK)
                        }
                        (Is::Sample, false) => {
                            (Em::SampleInterlockUnorderedEXT, &feature::SAMPLE_INTERLOCK)
                        }
                        (Is::ShadingRate, true) => (
                            Em::ShadingRateInterlockOrderedEXT,
                            &feature::SHADING_RATE_INTERLOCK,
                        ),
                        (Is::ShadingRate, false) => (
                            Em::ShadingRateInterlockUnorderedEXT,
                            &feature::SHADING_RATE_INTERLOCK,
                        ),
                    };
                    self.require(feature)?;
                    self.write_execution_mode(function_id, mode)?;
                }
                spirv::ExecutionModel::Fragment
            }
            crate::ShaderStage::Compute => {
                let size_id =
                    entry_point.workgroup_size_overrides.is_some() && self.lang_version() >= (1, 6);
                match entry_point.tile_shading.rate {
                    Some(rate) if !size_id => {
                        self.require(&feature::TILE_SHADING)?;
                        Instruction::execution_mode(
                            function_id,
                            spirv::ExecutionMode::TileShadingRateQCOM,
                            &rate,
                        )
                        .to_words(&mut self.logical_layout.execution_modes);
                        self.write_workgroup_size_builtin(entry_point);
                    }
                    _ => self.write_workgroup_size(function_id, entry_point)?,
                }
                self.debug_workgroup_size(ir_module, entry_point);
                spirv::ExecutionModel::GLCompute
            }
            crate::ShaderStage::Task | crate::ShaderStage::Mesh => {
                if entry_point.mesh_shader.is_none() {
                    return Err(Error::Validation(
                        "task or mesh entry point has no mesh shader information",
                    ));
                }
                self.write_mesh_shader_modes(function_id, entry_point)?
            }
            crate::ShaderStage::RayGeneration => {
                self.require_ray_tracing()?;
                spirv::ExecutionModel::RayGenerationKHR
            }
            crate::ShaderStage::AnyHit => {
                self.require_ray_tracing()?;
                spirv::ExecutionModel::AnyHitKHR
            }
            crate::ShaderStage::ClosestHit => {
                self.require_ray_tracing()?;
                spirv::ExecutionModel::ClosestHitKHR
            }
            crate::ShaderStage::Miss => {
                self.require_ray_tracing()?;
                spirv::ExecutionModel::MissKHR
            }
            crate::ShaderStage::Intersection => {
                self.require_ray_tracing()?;
                spirv::ExecutionModel::IntersectionKHR
            }
            crate::ShaderStage::Callable => {
                self.require_ray_tracing()?;
                spirv::ExecutionModel::CallableKHR
            }
        };
        //self.check(exec_model.required_capabilities())?;

        Ok(Instruction::entry_point(
            exec_model,
            function_id,
            &entry_point.name,
            interface_ids.as_slice(),
        ))
    }

    fn make_scalar(&mut self, id: Word, scalar: crate::Scalar) -> Option<Instruction> {
        use crate::ScalarKind as Sk;

        let bits = u32::from(scalar.width) * u32::from(BITS_PER_BYTE);
        match scalar.kind {
            Sk::Sint | Sk::Uint => {
                let signedness = if scalar.kind == Sk::Sint {
                    super::instructions::Signedness::Signed
                } else {
                    super::instructions::Signedness::Unsigned
                };
                let cap = match bits {
                    8 => Some(spirv::Capability::Int8),
                    16 => Some(spirv::Capability::Int16),
                    64 => Some(spirv::Capability::Int64),
                    _ => None,
                };
                let by_use = self
                    .flags
                    .contains(WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE);
                if let Some(cap) = cap.filter(|_| !by_use || bits == 64) {
                    self.capabilities_used.insert(cap);
                }
                if bits == 16 && !by_use {
                    self.capabilities_used
                        .insert(spirv::Capability::StorageBuffer16BitAccess);
                    self.capabilities_used
                        .insert(spirv::Capability::UniformAndStorageBuffer16BitAccess);
                    self.capabilities_used
                        .insert(spirv::Capability::StorageInputOutput16);
                }
                Some(Instruction::type_int(id, bits, signedness))
            }
            Sk::Float => {
                if bits == 64 {
                    self.capabilities_used.insert(spirv::Capability::Float64);
                }
                if bits == 16
                    && !self
                        .flags
                        .contains(WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE)
                {
                    self.capabilities_used.insert(spirv::Capability::Float16);
                    self.capabilities_used
                        .insert(spirv::Capability::StorageBuffer16BitAccess);
                    self.capabilities_used
                        .insert(spirv::Capability::UniformAndStorageBuffer16BitAccess);
                    self.capabilities_used
                        .insert(spirv::Capability::StorageInputOutput16);
                }
                Some(Instruction::type_float(id, bits))
            }
            Sk::Bool => Some(Instruction::type_bool(id)),
            Sk::BFloat => {
                self.use_feature(&feature::BFLOAT16_TYPE);
                encoded_float_type(id, bits, spirv::FPEncoding::BFloat16KHR)
            }
            Sk::FloatE4M3 => {
                self.use_feature(&feature::FLOAT8_TYPE);
                encoded_float_type(id, bits, spirv::FPEncoding::Float8E4M3EXT)
            }
            Sk::FloatE5M2 => {
                self.use_feature(&feature::FLOAT8_TYPE);
                encoded_float_type(id, bits, spirv::FPEncoding::Float8E5M2EXT)
            }
            Sk::FloatE2M1 | Sk::FloatE3M2 | Sk::FloatE2M3 | Sk::FloatUE8M0 | Sk::FloatMXINT8 => {
                self.microscaling_type(id, scalar)
            }
        }
    }

    fn request_type_capabilities(&mut self, inner: &crate::TypeInner) -> Result<(), Error> {
        if let crate::TypeInner::CooperativeMatrix { scalar, .. }
        | crate::TypeInner::LongVector { scalar, .. } = *inner
        {
            self.request_type_capabilities(&crate::TypeInner::Scalar(scalar))?;
        }
        if let crate::TypeInner::CooperativeMatrix { scalar, .. } = *inner {
            match scalar.kind {
                crate::ScalarKind::BFloat => self.require_any(
                    "bfloat16 cooperative matrices",
                    &[spirv::Capability::BFloat16CooperativeMatrixKHR],
                )?,
                crate::ScalarKind::FloatE4M3 | crate::ScalarKind::FloatE5M2 => self.require_any(
                    "float8 cooperative matrices",
                    &[spirv::Capability::Float8CooperativeMatrixEXT],
                )?,
                crate::ScalarKind::Sint
                | crate::ScalarKind::Uint
                | crate::ScalarKind::Float
                | crate::ScalarKind::Bool
                | crate::ScalarKind::FloatE2M1
                | crate::ScalarKind::FloatE3M2
                | crate::ScalarKind::FloatE2M3
                | crate::ScalarKind::FloatUE8M0
                | crate::ScalarKind::FloatMXINT8 => {}
            }
        }
        match *inner {
            crate::TypeInner::Image {
                dim,
                arrayed,
                class,
            }
            | crate::TypeInner::SampledImage {
                dim,
                arrayed,
                class,
            } => {
                let sampled = match class {
                    crate::ImageClass::Sampled { .. } => true,
                    crate::ImageClass::Depth { .. } => true,
                    crate::ImageClass::Storage { format, multi, .. } => {
                        self.request_image_format_capabilities(format.into())?;
                        if multi {
                            self.require_any(
                                "multisampled storage images",
                                &[spirv::Capability::StorageImageMultisample],
                            )?;
                            if arrayed {
                                self.require_any(
                                    "multisampled arrayed storage images",
                                    &[spirv::Capability::ImageMSArray],
                                )?;
                            }
                        }
                        false
                    }
                };

                match dim {
                    crate::ImageDimension::D1 => {
                        if sampled {
                            self.require_any("sampled 1D images", &[spirv::Capability::Sampled1D])?;
                        } else {
                            self.require_any("1D storage images", &[spirv::Capability::Image1D])?;
                        }
                    }
                    crate::ImageDimension::Subpass => {
                        self.require_any("subpass inputs", &[spirv::Capability::InputAttachment])?;
                    }
                    crate::ImageDimension::TileImageData => {}
                    crate::ImageDimension::Buffer => {
                        if sampled {
                            self.require_any(
                                "sampled buffer images",
                                &[spirv::Capability::SampledBuffer],
                            )?;
                        } else {
                            self.require_any(
                                "buffer storage images",
                                &[spirv::Capability::ImageBuffer],
                            )?;
                        }
                    }
                    crate::ImageDimension::Cube if arrayed => {
                        if sampled {
                            self.require_any(
                                "sampled cube array images",
                                &[spirv::Capability::SampledCubeArray],
                            )?;
                        } else {
                            self.require_any(
                                "cube array storage images",
                                &[spirv::Capability::ImageCubeArray],
                            )?;
                        }
                    }
                    crate::ImageDimension::D2
                    | crate::ImageDimension::D3
                    | crate::ImageDimension::Cube => {}
                }
            }
            crate::TypeInner::AccelerationStructure => {
                if self.has_ray_tracing_pipeline {
                    self.require_ray_tracing()?;
                } else if !self.micromap_acceleration_structures {
                    self.require(&feature::RAY_QUERY)?;
                }
            }
            crate::TypeInner::RayQuery => {
                self.require(&feature::RAY_QUERY)?;
            }
            crate::TypeInner::HitObject { flavor } => {
                self.require_hit_objects(flavor)?;
            }
            crate::TypeInner::Atomic(scalar) => {
                if scalar.width == 8 {
                    self.require_any("64 bit integer atomics", &[spirv::Capability::Int64Atomics])?;
                } else if scalar.width == 4 && scalar.kind == crate::ScalarKind::Float {
                    self.require(&feature::ATOMIC_FLOAT32_ADD)?;
                }
            }
            crate::TypeInner::Matrix { scalar, .. } => {
                if scalar == crate::Scalar::F16
                    && !self
                        .flags
                        .contains(WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE)
                {
                    self.require(&feature::FLOAT16_WITH_STORAGE)?;
                }
            }
            crate::TypeInner::Vector { scalar, .. } | crate::TypeInner::Scalar(scalar) => {
                if !self
                    .flags
                    .contains(WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE)
                {
                    if scalar == crate::Scalar::F16 {
                        self.require(&feature::FLOAT16_WITH_STORAGE)?;
                    } else if scalar.width == 2
                        && matches!(
                            scalar.kind,
                            crate::ScalarKind::Sint | crate::ScalarKind::Uint
                        )
                    {
                        self.require(&feature::INT16_WITH_STORAGE)?;
                    }
                }
            }
            crate::TypeInner::CooperativeMatrix { class, .. } => self.require(match class {
                crate::CooperativeMatrixClass::Khr => &feature::COOPERATIVE_MATRIX_KHR,
                crate::CooperativeMatrixClass::Nv => &feature::COOPERATIVE_MATRIX_NV,
            })?,
            crate::TypeInner::LongVector { class, .. } => self.require(match class {
                crate::LongVectorClass::Plain => &feature::LONG_VECTOR,
                crate::LongVectorClass::CooperativeNv => &feature::COOPERATIVE_VECTOR,
            })?,
            crate::TypeInner::TensorLayout { .. }
            | crate::TypeInner::TensorView { .. }
            | crate::TypeInner::Tensor { .. }
            | crate::TypeInner::Pointer { .. }
            | crate::TypeInner::ValuePointer { .. }
            | crate::TypeInner::Array { .. }
            | crate::TypeInner::Struct { .. }
            | crate::TypeInner::Sampler { .. }
            | crate::TypeInner::BindingArray { .. }
            | crate::TypeInner::BufferDescriptor { .. }
            | crate::TypeInner::Spirv { .. } => {}
        }
        Ok(())
    }

    fn write_numeric_type_declaration_local(&mut self, id: Word, numeric: NumericType) {
        let instruction = match numeric {
            NumericType::Scalar(scalar) => match self.make_scalar(id, scalar) {
                Some(instruction) => instruction,
                None => {
                    self.undeclarable_scalar = true;
                    return;
                }
            },
            NumericType::Vector { size, scalar } => {
                let scalar_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
                Instruction::type_vector(id, scalar_id, size)
            }
            NumericType::Matrix {
                columns,
                rows,
                scalar,
            } => {
                let column_id =
                    self.get_numeric_type_id(NumericType::Vector { size: rows, scalar });
                Instruction::type_matrix(id, column_id, columns)
            }
        };

        instruction.to_words(&mut self.logical_layout.declarations);
    }

    fn write_cooperative_size(
        &mut self,
        size: crate::CooperativeSize,
        module: &crate::Module,
        mod_info: &ModuleInfo,
    ) -> Result<Word, Error> {
        match size {
            crate::CooperativeSize::Constant(size) => Ok(self.get_index_constant(size.get())),
            crate::CooperativeSize::Pending(handle) => {
                self.write_override(handle, module, mod_info)
            }
        }
    }

    fn decorate_parameter_memory(&mut self, id: Word, memory: crate::MemoryDecorations) {
        use crate::MemoryDecorations as Md;
        use spirv::Decoration;
        let mut decorations = Vec::new();
        if !self.vulkan_memory_model {
            if memory.contains(Md::VOLATILE) {
                decorations.extend([Decoration::Volatile, Decoration::Coherent]);
            } else if memory.contains(Md::COHERENT) {
                decorations.push(Decoration::Coherent);
            }
        }
        for (flag, decoration) in [
            (Md::RESTRICT, Decoration::Restrict),
            (Md::NON_WRITABLE, Decoration::NonWritable),
            (Md::NON_READABLE, Decoration::NonReadable),
        ] {
            if memory.contains(flag) {
                decorations.push(decoration);
            }
        }
        for decoration in decorations {
            self.decorate(id, decoration, &[]);
        }
    }

    pub(super) fn cooperative_size_id(&mut self, size: crate::CooperativeSize) -> Word {
        match size {
            crate::CooperativeSize::Constant(size) => self.get_index_constant(size.get()),
            crate::CooperativeSize::Pending(handle) => self
                .override_ids
                .get(handle.index())
                .copied()
                .unwrap_or_default(),
        }
    }

    fn write_cooperative_type_declaration_local(&mut self, id: Word, coop: CooperativeType) {
        let instruction = match coop {
            CooperativeType::Matrix {
                columns,
                rows,
                scalar,
                role,
                scope,
                class,
            } => {
                let scalar_id =
                    self.get_localtype_id(LocalType::Numeric(NumericType::Scalar(scalar)));
                let scope_id = self.cooperative_size_id(scope);
                let columns_id = self.cooperative_size_id(columns);
                let rows_id = self.cooperative_size_id(rows);
                match class {
                    crate::CooperativeMatrixClass::Khr => {
                        let role_id =
                            self.get_index_constant(spirv::CooperativeMatrixUse::from(role) as u32);
                        Instruction::type_coop_matrix(
                            id, scalar_id, scope_id, rows_id, columns_id, role_id,
                        )
                    }
                    crate::CooperativeMatrixClass::Nv => {
                        let mut instruction = Instruction::new(spirv::Op::TypeCooperativeMatrixNV);
                        instruction.set_result(id);
                        for operand in [scalar_id, scope_id, rows_id, columns_id] {
                            instruction.add_operand(operand);
                        }
                        instruction
                    }
                }
            }
            CooperativeType::Vector {
                size,
                scalar,
                class,
            } => {
                let scalar_id =
                    self.get_localtype_id(LocalType::Numeric(NumericType::Scalar(scalar)));
                match (class, size) {
                    (crate::LongVectorClass::Plain, crate::CooperativeSize::Constant(size)) => {
                        let mut instruction = Instruction::new(spirv::Op::TypeVector);
                        instruction.set_result(id);
                        instruction.add_operand(scalar_id);
                        instruction.add_operand(size.get());
                        instruction
                    }
                    _ => {
                        if class == crate::LongVectorClass::CooperativeNv {
                            self.cooperative_vector_types.insert(id);
                        }
                        let size_id = self.cooperative_size_id(size);
                        let mut instruction = Instruction::new(spirv::Op::TypeVectorIdEXT);
                        instruction.set_result(id);
                        instruction.add_operand(scalar_id);
                        instruction.add_operand(size_id);
                        instruction
                    }
                }
            }
        };

        instruction.to_words(&mut self.logical_layout.declarations);
    }

    fn write_type_declaration_local(&mut self, id: Word, local_ty: LocalType) {
        let instruction = match local_ty {
            LocalType::Numeric(numeric) => {
                self.write_numeric_type_declaration_local(id, numeric);
                return;
            }
            LocalType::Cooperative(coop) => {
                self.write_cooperative_type_declaration_local(id, coop);
                return;
            }
            LocalType::Pointer { base, class } => Instruction::type_pointer(id, class, base),
            LocalType::Image(image) => {
                let local_type = LocalType::Numeric(NumericType::Scalar(image.sampled_type));
                let type_id = self.get_localtype_id(local_type);
                Instruction::type_image(id, type_id, image.dim, image.flags, image.image_format)
            }
            LocalType::Sampler => Instruction::type_sampler(id),
            LocalType::SampledImage { image_type_id } => {
                Instruction::type_sampled_image(id, image_type_id)
            }
            LocalType::BindingArray { base_type_id, size } => {
                let scalar_id = self.get_constant_scalar(crate::Literal::U32(size));
                Instruction::type_array(id, base_type_id, scalar_id)
            }
            LocalType::AccelerationStructure => Instruction::type_acceleration_structure(id),
            LocalType::RayQuery => Instruction::type_ray_query(id),
            LocalType::HitObject(flavor) => Instruction::type_hit_object(id, flavor),
            LocalType::UntypedPointer { .. } | LocalType::BufferDescriptor { .. } => {
                self.write_heap_type_local(id, local_ty);
                return;
            }
        };

        instruction.to_words(&mut self.logical_layout.declarations);
    }

    fn write_type_declaration_arena(
        &mut self,
        module: &crate::Module,
        mod_info: &ModuleInfo,
        handle: Handle<crate::Type>,
    ) -> Result<Word, Error> {
        let ty = &module.types[handle];
        // If it's a type that needs SPIR-V capabilities, request them now.
        // This needs to happen regardless of the LocalType lookup succeeding,
        // because some types which map to the same LocalType have different
        // capability requirements. See https://github.com/gfx-rs/wgpu/issues/5569
        self.request_type_capabilities(&ty.inner)?;
        let pending = match ty.inner {
            crate::TypeInner::TensorLayout {
                dimensions,
                clamp_mode,
            } => [Some(dimensions), clamp_mode, None],
            crate::TypeInner::TensorView { dimensions, .. } => [Some(dimensions), None, None],
            crate::TypeInner::CooperativeMatrix {
                columns,
                rows,
                scope,
                ..
            } => [Some(columns), Some(rows), Some(scope)],
            crate::TypeInner::LongVector { size, .. }
            | crate::TypeInner::Tensor { rank: size, .. } => [Some(size), None, None],
            crate::TypeInner::Scalar(_)
            | crate::TypeInner::Vector { .. }
            | crate::TypeInner::Matrix { .. }
            | crate::TypeInner::Atomic(_)
            | crate::TypeInner::Pointer { .. }
            | crate::TypeInner::ValuePointer { .. }
            | crate::TypeInner::Array { .. }
            | crate::TypeInner::Struct { .. }
            | crate::TypeInner::Image { .. }
            | crate::TypeInner::Sampler { .. }
            | crate::TypeInner::SampledImage { .. }
            | crate::TypeInner::AccelerationStructure
            | crate::TypeInner::RayQuery
            | crate::TypeInner::HitObject { .. }
            | crate::TypeInner::BindingArray { .. }
            | crate::TypeInner::BufferDescriptor { .. }
            | crate::TypeInner::Spirv { .. } => [None, None, None],
        };
        for size in pending.into_iter().flatten() {
            if let crate::CooperativeSize::Pending(handle) = size {
                self.write_override(handle, module, mod_info)?;
            }
        }
        if let crate::TypeInner::Pointer {
            base,
            space: crate::AddressSpace::PhysicalStorage { .. },
        } = ty.inner
        {
            let structure = matches!(module.types[base].inner, crate::TypeInner::Struct { .. });
            if !structure {
                let id = match self.localtype_from_inner(&ty.inner)? {
                    Some(local) => self.get_localtype_id(local),
                    None => return Err(Error::Validation("a physical pointer has no type")),
                };
                self.lookup_type.insert(LookupType::Handle(handle), id);
                return Ok(id);
            }
            if !self.lookup_type.contains_key(&LookupType::Handle(base)) {
                let id = match self.forward_pointers.get(&base) {
                    Some(&id) => id,
                    None => {
                        let id = self.id_gen.next();
                        Instruction::type_forward_pointer(
                            id,
                            spirv::StorageClass::PhysicalStorageBuffer,
                        )
                        .to_words(&mut self.logical_layout.declarations);
                        self.forward_pointers.insert(base, id);
                        id
                    }
                };
                self.lookup_type.insert(LookupType::Handle(handle), id);
                return Ok(id);
            }
            let class = spirv::StorageClass::PhysicalStorageBuffer;
            let base_id = self.get_handle_type_id(base)?;
            let local = LookupType::Local(LocalType::Pointer {
                base: base_id,
                class,
            });
            let id = match self.lookup_type.get(&local) {
                Some(&id) => id,
                None => {
                    let id = self.id_gen.next();
                    Instruction::type_forward_pointer(id, class)
                        .to_words(&mut self.logical_layout.declarations);
                    Instruction::type_pointer(id, class, base_id)
                        .to_words(&mut self.logical_layout.declarations);
                    self.lookup_type.insert(local, id);
                    id
                }
            };
            self.lookup_type.insert(LookupType::Handle(handle), id);
            return Ok(id);
        }
        let id = if let Some(local) = self.localtype_from_inner(&ty.inner)? {
            // This type can be represented as a `LocalType`, so check if we've
            // already written an instruction for it. If not, do so now, with
            // `write_type_declaration_local`.
            match self.lookup_type.entry(LookupType::Local(local)) {
                // We already have an id for this `LocalType`.
                Entry::Occupied(e) => *e.get(),

                // It's a type we haven't seen before.
                Entry::Vacant(e) => {
                    let id = self.id_gen.next();
                    e.insert(id);

                    self.write_type_declaration_local(id, local);

                    id
                }
            }
        } else {
            use spirv::Decoration;

            let id = self.id_gen.next();
            let instruction = match ty.inner {
                crate::TypeInner::TensorLayout {
                    dimensions,
                    clamp_mode,
                } => {
                    self.require(&feature::TENSOR_ADDRESSING)?;
                    let dimensions = self.write_cooperative_size(dimensions, module, mod_info)?;
                    let clamp_mode = match clamp_mode {
                        Some(clamp_mode) => {
                            self.write_cooperative_size(clamp_mode, module, mod_info)?
                        }
                        None => self.get_index_constant(0),
                    };
                    let mut instruction = Instruction::new(spirv::Op::TypeTensorLayoutNV);
                    instruction.set_result(id);
                    instruction.add_operand(dimensions);
                    instruction.add_operand(clamp_mode);
                    instruction
                }
                crate::TypeInner::TensorView {
                    dimensions,
                    has_dimensions,
                    ref permutation,
                } => {
                    self.require(&feature::TENSOR_ADDRESSING)?;
                    let dimensions = self.write_cooperative_size(dimensions, module, mod_info)?;
                    let has_dimensions =
                        self.get_constant_scalar(crate::Literal::Bool(has_dimensions));
                    let mut instruction = Instruction::new(spirv::Op::TypeTensorViewNV);
                    instruction.set_result(id);
                    instruction.add_operand(dimensions);
                    instruction.add_operand(has_dimensions);
                    for &index in permutation {
                        let index = self.get_index_constant(index);
                        instruction.add_operand(index);
                    }
                    instruction
                }
                crate::TypeInner::Tensor { scalar, rank } => {
                    self.write_tensor_type(id, scalar, rank)?
                }
                crate::TypeInner::Spirv {
                    opcode,
                    ref operands,
                } => {
                    let mut instruction = Instruction::raw(opcode);
                    instruction.set_result(id);
                    for operand in operands {
                        match *operand {
                            crate::SpirvTypeOperand::Literal(word) => instruction.add_operand(word),
                            crate::SpirvTypeOperand::Type(base) => {
                                let base = self.get_handle_type_id(base)?;
                                instruction.add_operand(base);
                            }
                        }
                    }
                    instruction
                }
                crate::TypeInner::Array { base, size, stride } => {
                    let type_id = self.get_handle_type_id(base)?;
                    let (length, count) = if let crate::ArraySize::Pending(length) = size {
                        (Some(self.write_override(length, module, mod_info)?), None)
                    } else {
                        match size.resolve(module.to_ctx())? {
                            crate::proc::IndexableLength::Known(length) => {
                                (Some(self.get_index_constant(length)), Some(length))
                            }
                            crate::proc::IndexableLength::Dynamic => (None, None),
                        }
                    };
                    let laid_out = self.laid_out_types.contains(handle);
                    if laid_out {
                        self.decorate(id, Decoration::ArrayStride, &[stride]);
                    }
                    self.heap_array_layout(module, handle, id)?;
                    self.record_composite_type(
                        id,
                        super::plain_types::CompositeType {
                            shape: super::plain_types::CompositeShape::Array {
                                element: type_id,
                                length,
                                count,
                            },
                            name: ty.name.clone(),
                            laid_out,
                        },
                    );
                    match length {
                        Some(length_id) => Instruction::type_array(id, type_id, length_id),
                        None => Instruction::type_runtime_array(id, type_id),
                    }
                }
                crate::TypeInner::BindingArray { base, size } => {
                    let type_id = self.get_handle_type_id(base)?;
                    if let crate::ArraySize::Pending(length) = size {
                        let length_id = self.write_override(length, module, mod_info)?;
                        Instruction::type_array(id, type_id, length_id)
                    } else {
                        match size.resolve(module.to_ctx())? {
                            crate::proc::IndexableLength::Known(length) => {
                                let length_id = self.get_index_constant(length);
                                Instruction::type_array(id, type_id, length_id)
                            }
                            crate::proc::IndexableLength::Dynamic => {
                                self.require_descriptor_indexing(
                                    "runtime-sized binding arrays",
                                    spirv::Capability::RuntimeDescriptorArray,
                                )?;
                                Instruction::type_runtime_array(id, type_id)
                            }
                        }
                    }
                }
                crate::TypeInner::Struct {
                    ref members,
                    span: _,
                } => {
                    let mut member_ids = Vec::with_capacity(members.len());
                    let laid_out = self.laid_out_types.contains(handle);
                    self.heap_struct_layout(module, handle, id)?;
                    for (index, member) in members.iter().enumerate() {
                        self.decorate_struct_member(id, index, member, &module.types, laid_out)?;
                        let member_id = self.get_handle_type_id(member.ty)?;
                        member_ids.push(member_id);
                    }
                    self.record_composite_type(
                        id,
                        super::plain_types::CompositeType {
                            shape: super::plain_types::CompositeShape::Struct {
                                members: member_ids.clone(),
                                member_names: members
                                    .iter()
                                    .map(|member| member.name.clone())
                                    .collect(),
                            },
                            name: ty.name.clone(),
                            laid_out,
                        },
                    );
                    Instruction::type_struct(id, member_ids.as_slice())
                }

                // These all have TypeLocal representations, so they should have been
                // handled by `write_type_declaration_local` above.
                crate::TypeInner::Scalar(_)
                | crate::TypeInner::Atomic(_)
                | crate::TypeInner::Vector { .. }
                | crate::TypeInner::Matrix { .. }
                | crate::TypeInner::CooperativeMatrix { .. }
                | crate::TypeInner::LongVector { .. }
                | crate::TypeInner::Pointer { .. }
                | crate::TypeInner::ValuePointer { .. }
                | crate::TypeInner::Image { .. }
                | crate::TypeInner::SampledImage { .. }
                | crate::TypeInner::Sampler { .. }
                | crate::TypeInner::AccelerationStructure
                | crate::TypeInner::RayQuery
                | crate::TypeInner::HitObject { .. }
                | crate::TypeInner::BufferDescriptor { .. } => {
                    return Err(Error::Validation("a non-aggregate type has no local type"));
                }
            };

            instruction.to_words(&mut self.logical_layout.declarations);
            id
        };

        // Add this handle as a new alias for that type.
        self.lookup_type.insert(LookupType::Handle(handle), id);

        if let Some(&access) = self.physical_pointees.get(&handle) {
            self.decorate_physical_pointee(module, handle, id, access);
        }
        if let Some(pointer_id) = self.forward_pointers.remove(&handle) {
            let class = spirv::StorageClass::PhysicalStorageBuffer;
            Instruction::type_pointer(pointer_id, class, id)
                .to_words(&mut self.logical_layout.declarations);
            self.lookup_type.insert(
                LookupType::Local(LocalType::Pointer { base: id, class }),
                pointer_id,
            );
        }

        if self.flags.contains(WriterFlags::DEBUG)
            && let Some(ref name) = ty.name
        {
            self.debugs.push(Instruction::name(id, name));
        }

        Ok(id)
    }

    fn request_image_format_capabilities(
        &mut self,
        format: spirv::ImageFormat,
    ) -> Result<(), Error> {
        use spirv::ImageFormat as If;
        match format {
            If::Rg32f
            | If::Rg16f
            | If::R11fG11fB10f
            | If::R16f
            | If::Rgba16
            | If::Rgb10A2
            | If::Rg16
            | If::Rg8
            | If::R16
            | If::R8
            | If::Rgba16Snorm
            | If::Rg16Snorm
            | If::Rg8Snorm
            | If::R16Snorm
            | If::R8Snorm
            | If::Rg32i
            | If::Rg16i
            | If::Rg8i
            | If::R16i
            | If::R8i
            | If::Rgb10a2ui
            | If::Rg32ui
            | If::Rg16ui
            | If::Rg8ui
            | If::R16ui
            | If::R8ui => self.require_any(
                "storage image format",
                &[spirv::Capability::StorageImageExtendedFormats],
            ),
            If::R64ui | If::R64i => self.require(&feature::IMAGE_INT64),
            If::Unknown
            | If::Rgba32f
            | If::Rgba16f
            | If::R32f
            | If::Rgba8
            | If::Rgba8Snorm
            | If::Rgba32i
            | If::Rgba16i
            | If::Rgba8i
            | If::R32i
            | If::Rgba32ui
            | If::Rgba16ui
            | If::Rgba8ui
            | If::R32ui => Ok(()),
        }
    }

    pub(super) fn get_index_constant(&mut self, index: Word) -> Word {
        self.get_constant_scalar(crate::Literal::U32(index))
    }

    pub(super) fn get_constant_scalar_with(
        &mut self,
        value: u8,
        scalar: crate::Scalar,
    ) -> Result<Word, Error> {
        Ok(
            self.get_constant_scalar(crate::Literal::new(value, scalar).ok_or(
                Error::Validation("Unexpected kind and/or width for Literal"),
            )?),
        )
    }

    pub(super) fn get_constant_scalar(&mut self, value: crate::Literal) -> Word {
        let scalar = CachedConstant::Literal(value.into());
        if let Some(&id) = self.cached_constants.get(&scalar) {
            return id;
        }
        let id = self.id_gen.next();
        self.write_constant_scalar(id, &value, None);
        self.cached_constants.insert(scalar, id);
        id
    }

    fn write_constant_scalar(
        &mut self,
        id: Word,
        value: &crate::Literal,
        debug_name: Option<&String>,
    ) {
        if self.flags.contains(WriterFlags::DEBUG)
            && let Some(name) = debug_name
        {
            self.debugs.push(Instruction::name(id, name));
        }
        let type_id = self.get_numeric_type_id(NumericType::Scalar(value.scalar()));
        let instruction = match *value {
            crate::Literal::F64(value) => {
                let bits = value.to_bits();
                Instruction::constant_64bit(type_id, id, bits as u32, (bits >> 32) as u32)
            }
            crate::Literal::F32(value) => Instruction::constant_32bit(type_id, id, value.to_bits()),
            crate::Literal::F16(value) => {
                let low = value.to_bits();
                Instruction::constant_16bit(type_id, id, low as u32)
            }
            crate::Literal::BF16(value) => Instruction::constant_16bit(type_id, id, value as u32),
            crate::Literal::FE4M3(value)
            | crate::Literal::FE5M2(value)
            | crate::Literal::FE2M1(value)
            | crate::Literal::FE3M2(value)
            | crate::Literal::FE2M3(value)
            | crate::Literal::FUE8M0(value)
            | crate::Literal::FMXINT8(value) => {
                Instruction::constant_16bit(type_id, id, value as u32)
            }
            crate::Literal::U8(value) => Instruction::constant_16bit(type_id, id, value as u32),
            crate::Literal::I8(value) => {
                Instruction::constant_16bit(type_id, id, value as i32 as u32)
            }
            crate::Literal::U16(value) => Instruction::constant_16bit(type_id, id, value as u32),
            crate::Literal::I16(value) => {
                // Sign-extend into the 32-bit word so that `spirv-as` can
                // round-trip the disassembly (it expects signed values for
                // signed types).
                Instruction::constant_16bit(type_id, id, value as i32 as u32)
            }
            crate::Literal::U32(value) => Instruction::constant_32bit(type_id, id, value),
            crate::Literal::I32(value) => Instruction::constant_32bit(type_id, id, value as u32),
            crate::Literal::U64(value) => {
                Instruction::constant_64bit(type_id, id, value as u32, (value >> 32) as u32)
            }
            crate::Literal::I64(value) => {
                Instruction::constant_64bit(type_id, id, value as u32, (value >> 32) as u32)
            }
            crate::Literal::Bool(true) => Instruction::constant_true(type_id, id),
            crate::Literal::Bool(false) => Instruction::constant_false(type_id, id),
        };

        instruction.to_words(&mut self.logical_layout.declarations);
    }

    pub(super) fn get_constant_composite(
        &mut self,
        ty: LookupType,
        constituent_ids: &[Word],
    ) -> Result<Word, Error> {
        let handle = match ty {
            LookupType::Local(local) => {
                return Ok(self.get_local_constant_composite(local, constituent_ids));
            }
            LookupType::Handle(handle) => handle,
        };
        let composite = CachedConstant::Composite {
            ty,
            constituent_ids: constituent_ids.to_vec(),
        };
        if let Some(&id) = self.cached_constants.get(&composite) {
            return Ok(id);
        }
        let type_id = self.get_handle_type_id(handle)?;
        let id = self.id_gen.next();
        self.write_constant_composite(id, type_id, constituent_ids, None);
        self.cached_constants.insert(composite, id);
        Ok(id)
    }

    pub(super) fn get_local_constant_composite(
        &mut self,
        local: LocalType,
        constituent_ids: &[Word],
    ) -> Word {
        let composite = CachedConstant::Composite {
            ty: LookupType::Local(local),
            constituent_ids: constituent_ids.to_vec(),
        };
        if let Some(&id) = self.cached_constants.get(&composite) {
            return id;
        }
        let id = self.id_gen.next();
        let type_id = self.get_localtype_id(local);
        self.write_constant_composite(id, type_id, constituent_ids, None);
        self.cached_constants.insert(composite, id);
        id
    }

    fn write_constant_composite(
        &mut self,
        id: Word,
        type_id: Word,
        constituent_ids: &[Word],
        debug_name: Option<&String>,
    ) {
        if self.flags.contains(WriterFlags::DEBUG)
            && let Some(name) = debug_name
        {
            self.debugs.push(Instruction::name(id, name));
        }
        if let Some(value) = self.replicated_constituent(type_id, constituent_ids) {
            let mut instruction = Instruction::new(spirv::Op::ConstantCompositeReplicateEXT);
            instruction.set_type(type_id);
            instruction.set_result(id);
            instruction.add_operand(value);
            instruction.to_words(&mut self.logical_layout.declarations);
            return;
        }
        Instruction::constant_composite(type_id, id, constituent_ids)
            .to_words(&mut self.logical_layout.declarations);
    }

    pub(super) fn replicated_constituent(
        &mut self,
        type_id: Word,
        constituent_ids: &[Word],
    ) -> Option<Word> {
        if !self.cooperative_vector_types.contains(&type_id) {
            return None;
        }
        let (&first, rest) = constituent_ids.split_first()?;
        if rest.iter().any(|&id| id != first) {
            return None;
        }
        self.require(&feature::REPLICATED_COMPOSITES).ok()?;
        Some(first)
    }

    pub(super) fn get_constant_null(&mut self, type_id: Word) -> Word {
        let null = CachedConstant::ZeroValue(type_id);
        if let Some(&id) = self.cached_constants.get(&null) {
            return id;
        }
        let id = if self.contains_physical_type(type_id) {
            let id = self.id_gen.next();
            Instruction::undef(type_id, id).to_words(&mut self.logical_layout.declarations);
            id
        } else {
            self.write_constant_null(type_id)
        };
        self.cached_constants.insert(null, id);
        id
    }

    pub(super) fn get_undef(&mut self, type_id: Word) -> Word {
        let undef = CachedConstant::Undef(type_id);
        if let Some(&id) = self.cached_constants.get(&undef) {
            return id;
        }
        let id = self.id_gen.next();
        Instruction::undef(type_id, id).to_words(&mut self.logical_layout.declarations);
        self.cached_constants.insert(undef, id);
        id
    }

    pub(super) fn write_constant_null(&mut self, type_id: Word) -> Word {
        if self.contains_physical_type(type_id) {
            return self.get_constant_null(type_id);
        }
        let null_id = self.id_gen.next();
        Instruction::constant_null(type_id, null_id)
            .to_words(&mut self.logical_layout.declarations);
        null_id
    }

    pub(super) fn write_constant_expr(
        &mut self,
        handle: Handle<crate::Expression>,
        ir_module: &crate::Module,
        mod_info: &ModuleInfo,
    ) -> Result<Word, Error> {
        use super::specialization::{SpecComposite, SpecOperation};

        let id = match ir_module.global_expressions[handle] {
            crate::Expression::Literal(literal) => self.get_constant_scalar(literal),
            crate::Expression::Constant(constant) => {
                let constant = &ir_module.constants[constant];
                self.constant_ids[constant.init]
            }
            crate::Expression::ZeroValue(ty) => {
                let type_id = self.get_handle_type_id(ty)?;
                self.get_constant_null(type_id)
            }
            crate::Expression::Compose { ty, ref components } => {
                if self.is_override_dependent(handle) {
                    self.write_spec_composite(
                        handle,
                        SpecComposite::Compose { ty, components },
                        ir_module,
                        mod_info,
                    )?
                } else {
                    let component_ids: Vec<_> = crate::proc::flatten_compose(
                        ty,
                        components,
                        &ir_module.global_expressions,
                        &ir_module.types,
                    )
                    .map(|component| self.constant_ids[component])
                    .collect();
                    self.get_constant_composite(LookupType::Handle(ty), component_ids.as_slice())?
                }
            }
            crate::Expression::Splat { size, value } => {
                if self.is_override_dependent(handle) {
                    self.write_spec_composite(
                        handle,
                        SpecComposite::Splat { size, value },
                        ir_module,
                        mod_info,
                    )?
                } else {
                    let value_id = self.constant_ids[value];
                    let component_ids = &[value_id; 4][..size as usize];
                    let ty = self.get_expression_lookup_type(&mod_info[handle])?;
                    self.get_constant_composite(ty, component_ids)?
                }
            }
            crate::Expression::Replicate { ty, value } => {
                if self.is_override_dependent(handle) {
                    self.write_spec_composite(
                        handle,
                        SpecComposite::Replicate { ty, value },
                        ir_module,
                        mod_info,
                    )?
                } else {
                    let value_id = self.constant_ids[value];
                    let inner = ir_module.types[ty].inner.clone();
                    self.write_constant_replicate(ty, value_id, &inner)?
                }
            }
            crate::Expression::Override(item) => self.write_override(item, ir_module, mod_info)?,
            crate::Expression::CooperativeMatrixLength { ty } => self.write_spec_operation(
                handle,
                SpecOperation::CooperativeMatrixLength { ty },
                ir_module,
                mod_info,
            )?,
            crate::Expression::Unary { op, expr } => self.write_spec_operation(
                handle,
                SpecOperation::Unary { op, expr },
                ir_module,
                mod_info,
            )?,
            crate::Expression::Binary { op, left, right } => self.write_spec_operation(
                handle,
                SpecOperation::Binary { op, left, right },
                ir_module,
                mod_info,
            )?,
            crate::Expression::As {
                expr,
                kind,
                convert,
            } => self.write_spec_operation(
                handle,
                SpecOperation::As {
                    expr,
                    kind,
                    convert,
                },
                ir_module,
                mod_info,
            )?,
            crate::Expression::Select {
                condition,
                accept,
                reject,
            } => self.write_spec_operation(
                handle,
                SpecOperation::Select {
                    condition,
                    accept,
                    reject,
                },
                ir_module,
                mod_info,
            )?,
            crate::Expression::Swizzle {
                size,
                vector,
                pattern,
            } => self.write_spec_operation(
                handle,
                SpecOperation::Swizzle {
                    size,
                    vector,
                    pattern,
                },
                ir_module,
                mod_info,
            )?,
            crate::Expression::AccessIndex { base, index } => self.write_spec_operation(
                handle,
                SpecOperation::AccessIndex { base, index },
                ir_module,
                mod_info,
            )?,
            crate::Expression::Access { base, index } => self.write_spec_operation(
                handle,
                SpecOperation::Access { base, index },
                ir_module,
                mod_info,
            )?,
            crate::Expression::FunctionArgument(_)
            | crate::Expression::GlobalVariable(_)
            | crate::Expression::LocalVariable(_)
            | crate::Expression::Load { .. }
            | crate::Expression::ImageSample { .. }
            | crate::Expression::ImageLoad { .. }
            | crate::Expression::ImageQuery { .. }
            | crate::Expression::Derivative { .. }
            | crate::Expression::Relational { .. }
            | crate::Expression::Math { .. }
            | crate::Expression::CallResult(_)
            | crate::Expression::AtomicResult { .. }
            | crate::Expression::ArrayLength(_)
            | crate::Expression::WideArrayLength(_)
            | crate::Expression::PhysicalPointer { .. }
            | crate::Expression::PhysicalAddress { .. }
            | crate::Expression::BufferPointer { .. }
            | crate::Expression::HeapOffset { .. }
            | crate::Expression::RayQueryProceedResult
            | crate::Expression::RayQueryGet { .. }
            | crate::Expression::ReportIntersectionResult
            | crate::Expression::AccelerationStructureFromAddress { .. }
            | crate::Expression::HitObjectGet { .. }
            | crate::Expression::FetchMicroTriangleVertex { .. }
            | crate::Expression::SubgroupBallotResult
            | crate::Expression::SubgroupOperationResult { .. }
            | crate::Expression::SpirvInstructionResult { .. }
            | crate::Expression::CooperativeLoad { .. }
            | crate::Expression::CooperativeMultiplyAdd { .. }
            | crate::Expression::Expect { .. }
            | crate::Expression::ImageSparseResident { .. }
            | crate::Expression::IsHelperInvocation
            | crate::Expression::ReadClock { .. }
            | crate::Expression::InterpolateAt { .. }
            | crate::Expression::FragmentFetch { .. }
            | crate::Expression::ImageFootprint { .. }
            | crate::Expression::AttachmentRead { .. }
            | crate::Expression::CooperativeVectorLoad { .. }
            | crate::Expression::CooperativeVectorMatMul { .. }
            | crate::Expression::Convert { .. }
            | crate::Expression::CooperativeMatrixResult { .. }
            | crate::Expression::TensorCreate { .. }
            | crate::Expression::ImageProcessing { .. }
            | crate::Expression::ArrayConversion { .. }
            | crate::Expression::Bitcast { .. }
            | crate::Expression::TensorSet { .. }
            | crate::Expression::TensorRead { .. }
            | crate::Expression::TensorQuerySize { .. } => {
                return Err(Error::SpecializationConstant("this expression"));
            }
        };

        self.constant_ids[handle] = id;

        Ok(id)
    }

    pub(super) fn write_control_barrier(
        &mut self,
        flags: crate::Barrier,
        body: &mut Vec<Instruction>,
    ) {
        let memory_scope = if flags.contains(crate::Barrier::STORAGE) {
            self.device_scope()
        } else if flags.contains(crate::Barrier::SUB_GROUP) {
            spirv::Scope::Subgroup
        } else {
            spirv::Scope::Workgroup
        };
        let mut semantics = spirv::MemorySemantics::ACQUIRE_RELEASE;
        semantics.set(
            spirv::MemorySemantics::UNIFORM_MEMORY,
            flags.contains(crate::Barrier::STORAGE),
        );
        semantics.set(
            spirv::MemorySemantics::WORKGROUP_MEMORY,
            flags.contains(crate::Barrier::WORK_GROUP),
        );
        semantics.set(
            spirv::MemorySemantics::SUBGROUP_MEMORY,
            flags.contains(crate::Barrier::SUB_GROUP),
        );
        semantics.set(
            spirv::MemorySemantics::IMAGE_MEMORY,
            flags.contains(crate::Barrier::TEXTURE),
        );
        let exec_scope_id = if flags.contains(crate::Barrier::SUB_GROUP) {
            self.get_index_constant(spirv::Scope::Subgroup as u32)
        } else {
            self.get_index_constant(spirv::Scope::Workgroup as u32)
        };
        let mem_scope_id = self.get_index_constant(memory_scope as u32);
        let semantics_id = self.get_index_constant(semantics.bits());
        body.push(Instruction::control_barrier(
            exec_scope_id,
            mem_scope_id,
            semantics_id,
        ));
    }

    pub(super) fn write_memory_barrier(&mut self, flags: crate::Barrier, block: &mut Block) {
        let mut semantics = spirv::MemorySemantics::ACQUIRE_RELEASE;
        semantics.set(
            spirv::MemorySemantics::UNIFORM_MEMORY,
            flags.contains(crate::Barrier::STORAGE),
        );
        semantics.set(
            spirv::MemorySemantics::WORKGROUP_MEMORY,
            flags.contains(crate::Barrier::WORK_GROUP),
        );
        semantics.set(
            spirv::MemorySemantics::SUBGROUP_MEMORY,
            flags.contains(crate::Barrier::SUB_GROUP),
        );
        semantics.set(
            spirv::MemorySemantics::IMAGE_MEMORY,
            flags.contains(crate::Barrier::TEXTURE),
        );
        let mem_scope_id = if flags.contains(crate::Barrier::STORAGE) {
            let scope = self.device_scope();
            self.get_index_constant(scope as u32)
        } else if flags.contains(crate::Barrier::SUB_GROUP) {
            self.get_index_constant(spirv::Scope::Subgroup as u32)
        } else {
            self.get_index_constant(spirv::Scope::Workgroup as u32)
        };
        let semantics_id = self.get_index_constant(semantics.bits());
        block
            .body
            .push(Instruction::memory_barrier(mem_scope_id, semantics_id));
    }

    /// Generate an `OpVariable` for one value in an [`EntryPoint`]'s IO interface.
    ///
    /// The [`Binding`]s of the arguments and result of an [`EntryPoint`]'s
    /// [`Function`] describe a SPIR-V shader interface. In SPIR-V, the
    /// interface is represented by global variables in the `Input` and `Output`
    /// storage classes, with decorations indicating which builtin or location
    /// each variable corresponds to.
    ///
    /// This function emits a single global `OpVariable` for a single value from
    /// the interface, and adds appropriate decorations to indicate which
    /// builtin or location it represents, how it should be interpolated, and so
    /// on. The `class` argument gives the variable's SPIR-V storage class,
    /// which should be either [`Input`] or [`Output`].
    ///
    /// [`Binding`]: crate::Binding
    /// [`Function`]: crate::Function
    /// [`EntryPoint`]: crate::EntryPoint
    /// [`Input`]: spirv::StorageClass::Input
    /// [`Output`]: spirv::StorageClass::Output
    fn write_varying(
        &mut self,
        ir_module: &crate::Module,
        stage: crate::ShaderStage,
        class: spirv::StorageClass,
        debug_name: Option<&str>,
        ty: Handle<crate::Type>,
        binding: &crate::Binding,
    ) -> Result<Word, Error> {
        let id = self.id_gen.next();
        let pointer_type_id = self.get_handle_pointer_type_id(ty, class)?;

        Instruction::variable(pointer_type_id, id, class, None)
            .to_words(&mut self.logical_layout.declarations);

        if self
            .flags
            .contains(WriterFlags::DEBUG | WriterFlags::LABEL_VARYINGS)
            && let Some(name) = debug_name
        {
            self.debugs.push(Instruction::name(id, name));
        }

        let binding = self.map_binding(ir_module, stage, class, ty, binding)?;
        self.write_binding(id, binding);

        Ok(id)
    }

    pub fn write_binding(&mut self, id: Word, binding: BindingDecorations) {
        match binding {
            BindingDecorations::None => (),
            BindingDecorations::BuiltIn(bi, others) => {
                self.decorate(id, spirv::Decoration::BuiltIn, &[bi as u32]);
                for other in others {
                    self.decorate(id, other, &[]);
                }
            }
            BindingDecorations::Location {
                location,
                others,
                blend_src,
                component,
            } => {
                self.decorate(id, spirv::Decoration::Location, &[location]);
                if let Some(component) = component {
                    self.decorate(id, spirv::Decoration::Component, &[component]);
                }
                for other in others {
                    self.decorate(id, other, &[]);
                }
                if let Some(blend_src) = blend_src {
                    self.decorate(id, spirv::Decoration::Index, &[blend_src]);
                }
            }
        }
    }

    pub fn write_binding_struct_member(
        &mut self,
        struct_id: Word,
        member_idx: Word,
        binding_info: BindingDecorations,
    ) {
        match binding_info {
            BindingDecorations::None => (),
            BindingDecorations::BuiltIn(bi, others) => {
                self.annotations.push(Instruction::member_decorate(
                    struct_id,
                    member_idx,
                    spirv::Decoration::BuiltIn,
                    &[bi as Word],
                ));
                for other in others {
                    self.annotations.push(Instruction::member_decorate(
                        struct_id,
                        member_idx,
                        other,
                        &[],
                    ));
                }
            }
            BindingDecorations::Location {
                location,
                others,
                blend_src,
                component,
            } => {
                self.annotations.push(Instruction::member_decorate(
                    struct_id,
                    member_idx,
                    spirv::Decoration::Location,
                    &[location],
                ));
                if let Some(component) = component {
                    self.annotations.push(Instruction::member_decorate(
                        struct_id,
                        member_idx,
                        spirv::Decoration::Component,
                        &[component],
                    ));
                }
                for other in others {
                    self.annotations.push(Instruction::member_decorate(
                        struct_id,
                        member_idx,
                        other,
                        &[],
                    ));
                }
                if let Some(blend_src) = blend_src {
                    self.annotations.push(Instruction::member_decorate(
                        struct_id,
                        member_idx,
                        spirv::Decoration::Index,
                        &[blend_src],
                    ));
                }
            }
        }
    }

    pub fn map_binding(
        &mut self,
        ir_module: &crate::Module,
        stage: crate::ShaderStage,
        class: spirv::StorageClass,
        ty: Handle<crate::Type>,
        binding: &crate::Binding,
    ) -> Result<BindingDecorations, Error> {
        use spirv::Decoration;
        match *binding {
            crate::Binding::Location {
                location,
                interpolation,
                sampling,
                blend_src,
                per_primitive,
                component,
                invariant,
                patch,
                per_view,
            } => {
                let mut others = ArrayVec::new();
                if invariant {
                    others.push(Decoration::Invariant);
                }
                if patch {
                    others.push(Decoration::Patch);
                }

                let no_decorations =
                    // VUID-StandaloneSpirv-Flat-06202
                    // > The Flat, NoPerspective, Sample, and Centroid decorations
                    // > must not be used on variables with the Input storage class in a vertex shader
                    (class == spirv::StorageClass::Input && stage == crate::ShaderStage::Vertex) ||
                    // VUID-StandaloneSpirv-Flat-06201
                    // > The Flat, NoPerspective, Sample, and Centroid decorations
                    // > must not be used on variables with the Output storage class in a fragment shader
                    (class == spirv::StorageClass::Output && stage == crate::ShaderStage::Fragment);

                if !no_decorations {
                    match interpolation {
                        // Perspective-correct interpolation is the default in SPIR-V.
                        None | Some(crate::Interpolation::Perspective) => (),
                        Some(crate::Interpolation::Flat) => {
                            others.push(Decoration::Flat);
                        }
                        Some(crate::Interpolation::Linear) => {
                            others.push(Decoration::NoPerspective);
                        }
                        Some(crate::Interpolation::ExplicitVertexAmd) => {
                            self.use_feature(&feature::AMD_SHADER_EXPLICIT_VERTEX_PARAMETER);
                            others.push(Decoration::ExplicitInterpAMD);
                        }
                        Some(crate::Interpolation::PerVertex {
                            flavor,
                            flat,
                            linear,
                        }) => {
                            if flat {
                                others.push(Decoration::Flat);
                            }
                            if linear {
                                others.push(Decoration::NoPerspective);
                            }
                            others.push(Decoration::PerVertexKHR);
                            self.require_barycentrics(flavor)?;
                        }
                    }
                    match sampling {
                        // Center sampling is the default in SPIR-V.
                        None
                        | Some(
                            crate::Sampling::Center
                            | crate::Sampling::First
                            | crate::Sampling::Either,
                        ) => (),
                        Some(crate::Sampling::Centroid) => {
                            others.push(Decoration::Centroid);
                        }
                        Some(crate::Sampling::Sample) => {
                            self.require_any(
                                "per-sample interpolation",
                                &[spirv::Capability::SampleRateShading],
                            )?;
                            others.push(Decoration::Sample);
                        }
                    }
                }
                if per_primitive
                    && (stage == crate::ShaderStage::Fragment
                        || (stage == crate::ShaderStage::Mesh
                            && class == spirv::StorageClass::Output))
                {
                    if stage == crate::ShaderStage::Fragment {
                        self.require_mesh_shading()?;
                    }
                    others.push(Decoration::PerPrimitiveEXT);
                }
                if per_view {
                    others.push(Decoration::PerViewNV);
                }
                Ok(BindingDecorations::Location {
                    location,
                    others,
                    blend_src,
                    component,
                })
            }
            crate::Binding::BuiltIn(built_in) => {
                self.map_built_in(ir_module, stage, class, ty, built_in)
            }
        }
    }

    pub(super) fn load_varying(
        &mut self,
        body: &mut Vec<Instruction>,
        varying_id: Word,
        target_type_id: Word,
    ) -> Word {
        let id = self.id_gen.next();
        body.push(Instruction::load(target_type_id, id, varying_id, None));
        id
    }

    fn write_global_variable(
        &mut self,
        ir_module: &crate::Module,
        handle: Handle<crate::GlobalVariable>,
        global_variable: &crate::GlobalVariable,
        interface_stage: Option<crate::ShaderStage>,
    ) -> Result<Word, Error> {
        use spirv::Decoration;

        if let crate::AddressSpace::DescriptorHeap(heap) = global_variable.space {
            return self.heap_variable(heap);
        }
        let id = self.id_gen.next();
        if global_variable.relaxed_precision {
            self.decorate(id, Decoration::RelaxedPrecision, &[]);
        }
        let class = if global_variable.tile_attachment {
            self.require(&feature::TILE_SHADING)?;
            spirv::StorageClass::TileAttachmentQCOM
        } else if crate::proc::is_tile_image(ir_module, global_variable) {
            spirv::StorageClass::TileImageEXT
        } else {
            self.storage_class(global_variable.space)
        };
        if let (crate::AddressSpace::Handle, Some(&crate::Binding::Location { location, .. })) =
            (global_variable.space, global_variable.io.as_ref())
        {
            self.decorate(id, Decoration::Location, &[location]);
        }

        // A stage input or output is bound to a location or a built-in. The
        // decorations depend on the stage whose interface it belongs to.
        if let crate::AddressSpace::Input | crate::AddressSpace::Output = global_variable.space {
            let stage = interface_stage.ok_or(Error::Validation(
                "an input or output variable is not in the interface of an entry point",
            ))?;
            if let Some(block) = crate::proc::interface_block(&ir_module.types, global_variable.ty)
            {
                self.write_interface_block(
                    ir_module,
                    handle,
                    global_variable,
                    block,
                    stage,
                    class,
                    id,
                )?;
            } else if global_variable.io.is_none()
                && crate::proc::has_spirv_built_in(global_variable)
            {
            } else {
                let binding = global_variable.io.as_ref().ok_or(Error::Validation(
                    "an input or output variable has no binding",
                ))?;
                let decorations =
                    self.map_binding(ir_module, stage, class, global_variable.ty, binding)?;
                self.write_binding(id, decorations);
                for (decoration, operands) in self.builtin_qualifier_decorations(binding)? {
                    self.decorate(id, decoration, &operands);
                }
            }
        }

        if let Some(xfb) = global_variable.xfb {
            self.require_any(
                "transform feedback",
                &[spirv::Capability::TransformFeedback],
            )?;
            self.decorate(id, Decoration::XfbBuffer, &[xfb.buffer]);
            self.decorate(id, Decoration::XfbStride, &[xfb.stride]);
            if let Some(offset) = xfb.offset {
                self.decorate(id, Decoration::Offset, &[offset]);
            }
        }

        if let crate::AddressSpace::RayPayload
        | crate::AddressSpace::IncomingRayPayload
        | crate::AddressSpace::HitAttribute
        | crate::AddressSpace::CallableData
        | crate::AddressSpace::IncomingCallableData
        | crate::AddressSpace::ShaderRecord = global_variable.space
        {
            self.require_ray_tracing()?;
            if let Some(crate::Binding::Location { location, .. }) = global_variable.io
                && self
                    .ray_tracing_features
                    .contains(crate::RayTracingFeatures::PAYLOAD_LOCATIONS)
            {
                self.decorate(id, Decoration::Location, &[location]);
            }
        }

        if let crate::AddressSpace::HitObjectAttribute { flavor } = global_variable.space {
            self.require_ray_tracing()?;
            self.require_hit_objects(flavor)?;
        }

        //self.check(class.required_capabilities())?;

        if global_variable
            .memory_decorations
            .intersects(crate::MemoryDecorations::COHERENT | crate::MemoryDecorations::VOLATILE)
            && !self.vulkan_memory_model
            && (global_variable.space != crate::AddressSpace::Input
                || global_variable
                    .memory_decorations
                    .contains(crate::MemoryDecorations::COHERENT))
        {
            self.decorate(id, Decoration::Coherent, &[]);
        }
        if global_variable
            .memory_decorations
            .contains(crate::MemoryDecorations::VOLATILE)
            && !self.vulkan_memory_model
        {
            self.decorate(id, Decoration::Volatile, &[]);
        }

        if self.flags.contains(WriterFlags::DEBUG)
            && let Some(ref name) = global_variable.name
        {
            self.debugs.push(Instruction::name(id, name));
        }

        let storage_access = if let crate::AddressSpace::Storage { access } = global_variable.space
        {
            Some(access)
        } else if let crate::TypeInner::Image {
            class: crate::ImageClass::Storage { access, .. },
            ..
        } = ir_module.types[global_variable.ty].inner
        {
            Some(access)
        } else {
            None
        };
        for (flag, decoration) in [
            (crate::MemoryDecorations::RESTRICT, Decoration::Restrict),
            (
                crate::MemoryDecorations::NON_WRITABLE,
                Decoration::NonWritable,
            ),
            (
                crate::MemoryDecorations::NON_READABLE,
                Decoration::NonReadable,
            ),
        ] {
            if global_variable.memory_decorations.contains(flag) {
                self.decorate(id, decoration, &[]);
            }
        }
        if let Some(storage_access) = storage_access {
            if !storage_access.contains(crate::StorageAccess::LOAD) {
                self.decorate(id, Decoration::NonReadable, &[]);
            }
            if !storage_access.contains(crate::StorageAccess::STORE) {
                self.decorate(id, Decoration::NonWritable, &[]);
            }
        }

        // Note: we should be able to substitute `binding_array<Foo, 0>`,
        // but there is still code that tries to register the pre-substituted type,
        // and it is failing on 0.
        let mut substitute_inner_type_lookup = None;
        if let Some(ref res_binding) = global_variable.binding {
            let bind_target = self.resolve_resource_binding(*res_binding)?;
            self.decorate(id, Decoration::DescriptorSet, &[bind_target.descriptor_set]);
            self.decorate(id, Decoration::Binding, &[bind_target.binding]);

            if let Some(remapped_binding_array_size) = bind_target.binding_array_size
                && let crate::TypeInner::BindingArray { base, .. } =
                    ir_module.types[global_variable.ty].inner
            {
                let base_type_id = self.get_handle_type_id(base)?;
                let binding_array_type_id = self.get_localtype_id(LocalType::BindingArray {
                    base_type_id,
                    size: remapped_binding_array_size,
                });
                substitute_inner_type_lookup = Some(LookupType::Local(LocalType::Pointer {
                    base: binding_array_type_id,
                    class,
                }));
            }
        };
        if let Some(index) = global_variable.input_attachment_index {
            self.decorate(id, Decoration::InputAttachmentIndex, &[index]);
        }
        if let Some(bank) = global_variable.immediate_bank {
            self.require(&feature::PUSH_CONSTANT_BANKS)?;
            if let Some(offset) = bank.member_offset {
                self.decorate(id, Decoration::MemberOffsetNV, &[offset]);
            }
            if let Some(bank) = bank.bank {
                self.decorate(id, Decoration::BankNV, &[bank]);
            }
        }

        let init_word = match global_variable.init {
            Some(constant) if !super::plain_types::has_explicit_layout(class) => {
                Some(self.plain_constant(ir_module, constant)?)
            }
            Some(constant) => Some(self.constant_ids[constant]),
            None => None,
        };
        let inner_type_id = self.get_type_id(
            substitute_inner_type_lookup.unwrap_or(LookupType::Handle(global_variable.ty)),
        )?;
        let inner_type_id = self.pointee_type_id(inner_type_id, class);

        let needs_wrapper = global_needs_wrapper(ir_module, &self.nested_types, global_variable);
        // generate the wrapping structure if needed
        let pointer_type_id = if needs_wrapper {
            let wrapper_type_id = self.id_gen.next();

            self.decorate_buffer_block(wrapper_type_id, global_variable)?;

            {
                let member = crate::StructMember {
                    name: None,
                    ty: global_variable.ty,
                    binding: None,
                    offset: 0,
                    matrix_layout: None,
                    xfb_offset: None,
                    heap: None,
                    memory_decorations: crate::MemoryDecorations::empty(),
                    relaxed_precision: false,
                };
                self.decorate_struct_member(wrapper_type_id, 0, &member, &ir_module.types, true)?;

                Instruction::type_struct(wrapper_type_id, &[inner_type_id])
                    .to_words(&mut self.logical_layout.declarations);
            }

            let pointer_type_id = self.id_gen.next();
            Instruction::type_pointer(pointer_type_id, class, wrapper_type_id)
                .to_words(&mut self.logical_layout.declarations);

            pointer_type_id
        } else {
            let block_struct = match ir_module.types[global_variable.ty].inner {
                crate::TypeInner::Struct { .. } => Some(global_variable.ty),
                crate::TypeInner::BindingArray { base, .. } => {
                    matches!(ir_module.types[base].inner, crate::TypeInner::Struct { .. })
                        .then_some(base)
                }
                crate::TypeInner::Scalar(_)
                | crate::TypeInner::Vector { .. }
                | crate::TypeInner::Matrix { .. }
                | crate::TypeInner::CooperativeMatrix { .. }
                | crate::TypeInner::LongVector { .. }
                | crate::TypeInner::TensorLayout { .. }
                | crate::TypeInner::TensorView { .. }
                | crate::TypeInner::Tensor { .. }
                | crate::TypeInner::Atomic(_)
                | crate::TypeInner::Pointer { .. }
                | crate::TypeInner::ValuePointer { .. }
                | crate::TypeInner::Array { .. }
                | crate::TypeInner::Image { .. }
                | crate::TypeInner::Sampler { .. }
                | crate::TypeInner::SampledImage { .. }
                | crate::TypeInner::AccelerationStructure
                | crate::TypeInner::RayQuery
                | crate::TypeInner::HitObject { .. }
                | crate::TypeInner::BufferDescriptor { .. }
                | crate::TypeInner::Spirv { .. } => None,
            };
            if let (Some(structure), Some(crate::BlockDeclaration::RayTracing)) =
                (block_struct, global_variable.block)
            {
                let structure_id = self.get_handle_type_id(structure)?;
                let block_id = self.pointee_type_id(structure_id, class);
                self.decorate_buffer_block(block_id, global_variable)?;
            }
            if let Some(structure) = block_struct
                && let crate::AddressSpace::Uniform
                | crate::AddressSpace::Storage { .. }
                | crate::AddressSpace::ShaderRecord
                | crate::AddressSpace::Immediate = global_variable.space
            {
                let block_id = self.get_handle_type_id(structure)?;
                if self.decorate_buffer_block(block_id, global_variable)?
                    && let Some(bank) = global_variable.immediate_bank.and_then(|bank| bank.bank)
                {
                    self.decorate(block_id, Decoration::BankNV, &[bank]);
                }
            }
            if substitute_inner_type_lookup.is_some() {
                inner_type_id
            } else {
                self.get_handle_pointer_type_id(global_variable.ty, class)?
            }
        };

        if global_variable.space == crate::AddressSpace::Private {
            self.decorate_pointer_variable(&ir_module.types, global_variable.ty, id);
        }

        Instruction::variable(pointer_type_id, id, class, init_word)
            .to_words(&mut self.logical_layout.declarations);
        Ok(id)
    }

    #[expect(
        clippy::too_many_arguments,
        reason = "the arguments are the parts of one request"
    )]
    fn write_interface_block(
        &mut self,
        ir_module: &crate::Module,
        handle: Handle<crate::GlobalVariable>,
        global_variable: &crate::GlobalVariable,
        block: crate::proc::InterfaceBlock,
        stage: crate::ShaderStage,
        class: spirv::StorageClass,
        id: Word,
    ) -> Result<(), Error> {
        if let Some(ref binding) = global_variable.io {
            let decorations =
                self.map_binding(ir_module, stage, class, global_variable.ty, binding)?;
            self.write_binding(id, decorations);
        }
        let crate::TypeInner::Struct { ref members, .. } = ir_module.types[block.structure].inner
        else {
            return Err(Error::Validation("an interface block is not a structure"));
        };
        let unused: Vec<bool> = (0..members.len())
            .map(|index| {
                u32::try_from(index).is_ok_and(|index| {
                    !interface_member_used(ir_module, handle, index, block.arrayed)
                })
            })
            .collect();
        if !self.decorated_blocks.insert(block.structure) {
            for (member, &unused) in members.iter().zip(&unused) {
                if let (Some(binding), false) = (member.binding.as_ref(), unused) {
                    self.map_binding(ir_module, stage, class, member.ty, binding)?;
                }
            }
            return Ok(());
        }
        let struct_id = self.get_handle_type_id(block.structure)?;
        self.decorate(struct_id, spirv::Decoration::Block, &[]);
        let task_memory = ir_module.entry_points.iter().any(|entry| {
            entry
                .mesh_shader
                .as_ref()
                .is_some_and(|mesh| mesh.task_memory.contains(&handle))
        });
        for (index, member) in members.iter().enumerate() {
            let index = u32::try_from(index)
                .map_err(|_| Error::Validation("too many members in an interface block"))?;
            if task_memory {
                self.write_task_memory_member(ir_module, struct_id, index, member)?;
            }
            if let Some(offset) = member.xfb_offset {
                self.annotations.push(Instruction::member_decorate(
                    struct_id,
                    index,
                    spirv::Decoration::Offset,
                    &[offset],
                ));
            }
            let Some(ref binding) = member.binding else {
                continue;
            };
            let unused_distance = match *binding {
                crate::Binding::BuiltIn(built_in) => match built_in {
                    crate::BuiltIn::ClipDistances => Some(spirv::BuiltIn::ClipDistance),
                    crate::BuiltIn::CullDistance => Some(spirv::BuiltIn::CullDistance),
                    crate::BuiltIn::PointSize => Some(spirv::BuiltIn::PointSize),
                    crate::BuiltIn::ViewportMaskNV => Some(spirv::BuiltIn::ViewportMaskNV),
                    crate::BuiltIn::SecondaryPositionNV => {
                        Some(spirv::BuiltIn::SecondaryPositionNV)
                    }
                    crate::BuiltIn::SecondaryViewportMaskNV => {
                        Some(spirv::BuiltIn::SecondaryViewportMaskNV)
                    }
                    crate::BuiltIn::PositionPerViewNV => Some(spirv::BuiltIn::PositionPerViewNV),
                    crate::BuiltIn::ViewportMaskPerViewNV => {
                        Some(spirv::BuiltIn::ViewportMaskPerViewNV)
                    }
                    crate::BuiltIn::PrimitiveIndex
                    | crate::BuiltIn::Position { .. }
                    | crate::BuiltIn::ViewIndex
                    | crate::BuiltIn::BaseInstance
                    | crate::BuiltIn::BaseVertex
                    | crate::BuiltIn::InstanceIndex
                    | crate::BuiltIn::VertexIndex
                    | crate::BuiltIn::DrawIndex
                    | crate::BuiltIn::InvocationId
                    | crate::BuiltIn::PatchVertices
                    | crate::BuiltIn::TessCoord
                    | crate::BuiltIn::TessLevelOuter
                    | crate::BuiltIn::TessLevelInner
                    | crate::BuiltIn::Layer { .. }
                    | crate::BuiltIn::ViewportIndex
                    | crate::BuiltIn::FragDepth
                    | crate::BuiltIn::PointCoord
                    | crate::BuiltIn::FrontFacing
                    | crate::BuiltIn::Barycentric { .. }
                    | crate::BuiltIn::AmdBarycentric(_)
                    | crate::BuiltIn::SampleIndex
                    | crate::BuiltIn::SampleMask { .. }
                    | crate::BuiltIn::SamplePosition
                    | crate::BuiltIn::HelperInvocation
                    | crate::BuiltIn::DeviceIndex
                    | crate::BuiltIn::ShadingRate
                    | crate::BuiltIn::FragSize(_)
                    | crate::BuiltIn::FragInvocationCount(_)
                    | crate::BuiltIn::FullyCovered
                    | crate::BuiltIn::FragStencilRef
                    | crate::BuiltIn::GlobalInvocationId
                    | crate::BuiltIn::LocalInvocationId
                    | crate::BuiltIn::LocalInvocationIndex
                    | crate::BuiltIn::WorkGroupId
                    | crate::BuiltIn::WorkGroupSize
                    | crate::BuiltIn::NumWorkGroups
                    | crate::BuiltIn::NumSubgroups
                    | crate::BuiltIn::SubgroupId
                    | crate::BuiltIn::SubgroupSize
                    | crate::BuiltIn::SubgroupInvocationId
                    | crate::BuiltIn::SubgroupMask(_)
                    | crate::BuiltIn::ShaderBallot(_)
                    | crate::BuiltIn::TileOffset
                    | crate::BuiltIn::TileDimension
                    | crate::BuiltIn::TileApronSize
                    | crate::BuiltIn::ShaderCore(_)
                    | crate::BuiltIn::MeshTaskSize
                    | crate::BuiltIn::CullPrimitive
                    | crate::BuiltIn::PointIndex
                    | crate::BuiltIn::LineIndices
                    | crate::BuiltIn::TriangleIndices
                    | crate::BuiltIn::VertexCount
                    | crate::BuiltIn::Vertices
                    | crate::BuiltIn::PrimitiveCount
                    | crate::BuiltIn::Primitives
                    | crate::BuiltIn::PrimitiveShadingRate
                    | crate::BuiltIn::TaskCountNV
                    | crate::BuiltIn::PrimitiveCountNV
                    | crate::BuiltIn::PrimitiveIndicesNV
                    | crate::BuiltIn::MeshViewCountNV
                    | crate::BuiltIn::MeshViewIndicesNV
                    | crate::BuiltIn::ClipDistancePerViewNV
                    | crate::BuiltIn::CullDistancePerViewNV
                    | crate::BuiltIn::LayerPerViewNV
                    | crate::BuiltIn::RayInvocationId
                    | crate::BuiltIn::NumRayInvocations
                    | crate::BuiltIn::InstanceCustomData
                    | crate::BuiltIn::GeometryIndex
                    | crate::BuiltIn::WorldRayOrigin
                    | crate::BuiltIn::WorldRayDirection
                    | crate::BuiltIn::ObjectRayOrigin
                    | crate::BuiltIn::ObjectRayDirection
                    | crate::BuiltIn::RayTmin
                    | crate::BuiltIn::RayTCurrentMax
                    | crate::BuiltIn::ObjectToWorld
                    | crate::BuiltIn::WorldToObject
                    | crate::BuiltIn::HitKind
                    | crate::BuiltIn::InstanceId
                    | crate::BuiltIn::IncomingRayFlags
                    | crate::BuiltIn::CullMask
                    | crate::BuiltIn::HitTriangleVertexPositions
                    | crate::BuiltIn::CurrentRayTime
                    | crate::BuiltIn::ClusterId
                    | crate::BuiltIn::HitMicroTriangleVertexPositions
                    | crate::BuiltIn::HitMicroTriangleVertexBarycentrics
                    | crate::BuiltIn::HitKindFrontFacingMicroTriangle
                    | crate::BuiltIn::HitKindBackFacingMicroTriangle
                    | crate::BuiltIn::HitIsSphere
                    | crate::BuiltIn::HitIsLss
                    | crate::BuiltIn::HitSpherePosition
                    | crate::BuiltIn::HitSphereRadius
                    | crate::BuiltIn::HitLssPositions
                    | crate::BuiltIn::HitLssRadii => None,
                },
                crate::Binding::Location { .. } => None,
            }
            .filter(|_| {
                usize::try_from(index)
                    .ok()
                    .and_then(|index| unused.get(index))
                    .copied()
                    .unwrap_or(false)
            });
            let unused_mesh = stage == crate::ShaderStage::Mesh
                && usize::try_from(index)
                    .ok()
                    .and_then(|index| unused.get(index))
                    .copied()
                    .unwrap_or(false);
            let decorations = match unused_distance {
                _ if unused_mesh => {
                    let capabilities = self.capabilities_used.clone();
                    let extensions = self.extensions_used.clone();
                    let decorations =
                        self.map_binding(ir_module, stage, class, member.ty, binding)?;
                    self.capabilities_used = capabilities;
                    self.extensions_used = extensions;
                    decorations
                }
                Some(built_in) => {
                    let mut others = ArrayVec::new();
                    if let crate::Binding::BuiltIn(ir_built_in) = *binding
                        && self.invariant_output(class, ir_built_in)
                    {
                        others.push(spirv::Decoration::Invariant);
                    }
                    BindingDecorations::BuiltIn(built_in, others)
                }
                None => self.map_binding(ir_module, stage, class, member.ty, binding)?,
            };
            match decorations {
                BindingDecorations::Location { others, .. } if global_variable.io.is_some() => {
                    for other in others {
                        self.annotations.push(Instruction::member_decorate(
                            struct_id,
                            index,
                            other,
                            &[],
                        ));
                    }
                }
                BindingDecorations::BuiltIn(..)
                | BindingDecorations::Location { .. }
                | BindingDecorations::None => {
                    self.write_binding_struct_member(struct_id, index, decorations);
                }
            }
            for (decoration, operands) in self.builtin_qualifier_decorations(binding)? {
                self.annotations.push(Instruction::member_decorate(
                    struct_id, index, decoration, &operands,
                ));
            }
        }
        Ok(())
    }

    fn builtin_qualifier_decorations(
        &mut self,
        binding: &crate::Binding,
    ) -> Result<ArrayVec<(spirv::Decoration, ArrayVec<Word, 1>), 2>, Error> {
        let mut decorations = ArrayVec::new();
        match *binding {
            crate::Binding::BuiltIn(built_in) => match built_in {
                crate::BuiltIn::Layer {
                    viewport_relative,
                    secondary_view_offset,
                } => {
                    if viewport_relative {
                        self.require(&feature::VIEWPORT_MASK)?;
                        decorations.push((spirv::Decoration::ViewportRelativeNV, ArrayVec::new()));
                    }
                    if let Some(offset) = secondary_view_offset {
                        self.require(&feature::STEREO_VIEW)?;
                        let mut operands = ArrayVec::new();
                        operands.push(offset.cast_unsigned());
                        decorations
                            .push((spirv::Decoration::SecondaryViewportRelativeNV, operands));
                    }
                }
                crate::BuiltIn::SampleMask { override_coverage } => {
                    if override_coverage {
                        self.require(&feature::SAMPLE_MASK_OVERRIDE_COVERAGE)?;
                        decorations.push((spirv::Decoration::OverrideCoverageNV, ArrayVec::new()));
                    }
                }
                crate::BuiltIn::PrimitiveIndex
                | crate::BuiltIn::Position { .. }
                | crate::BuiltIn::ViewIndex
                | crate::BuiltIn::BaseInstance
                | crate::BuiltIn::BaseVertex
                | crate::BuiltIn::ClipDistances
                | crate::BuiltIn::CullDistance
                | crate::BuiltIn::InstanceIndex
                | crate::BuiltIn::PointSize
                | crate::BuiltIn::VertexIndex
                | crate::BuiltIn::DrawIndex
                | crate::BuiltIn::InvocationId
                | crate::BuiltIn::PatchVertices
                | crate::BuiltIn::TessCoord
                | crate::BuiltIn::TessLevelOuter
                | crate::BuiltIn::TessLevelInner
                | crate::BuiltIn::ViewportIndex
                | crate::BuiltIn::ViewportMaskNV
                | crate::BuiltIn::SecondaryPositionNV
                | crate::BuiltIn::SecondaryViewportMaskNV
                | crate::BuiltIn::PositionPerViewNV
                | crate::BuiltIn::ViewportMaskPerViewNV
                | crate::BuiltIn::FragDepth
                | crate::BuiltIn::PointCoord
                | crate::BuiltIn::FrontFacing
                | crate::BuiltIn::Barycentric { .. }
                | crate::BuiltIn::AmdBarycentric(_)
                | crate::BuiltIn::SampleIndex
                | crate::BuiltIn::SamplePosition
                | crate::BuiltIn::HelperInvocation
                | crate::BuiltIn::DeviceIndex
                | crate::BuiltIn::ShadingRate
                | crate::BuiltIn::FragSize(_)
                | crate::BuiltIn::FragInvocationCount(_)
                | crate::BuiltIn::FullyCovered
                | crate::BuiltIn::FragStencilRef
                | crate::BuiltIn::GlobalInvocationId
                | crate::BuiltIn::LocalInvocationId
                | crate::BuiltIn::LocalInvocationIndex
                | crate::BuiltIn::WorkGroupId
                | crate::BuiltIn::WorkGroupSize
                | crate::BuiltIn::NumWorkGroups
                | crate::BuiltIn::NumSubgroups
                | crate::BuiltIn::SubgroupId
                | crate::BuiltIn::SubgroupSize
                | crate::BuiltIn::SubgroupInvocationId
                | crate::BuiltIn::SubgroupMask(_)
                | crate::BuiltIn::ShaderBallot(_)
                | crate::BuiltIn::TileOffset
                | crate::BuiltIn::TileDimension
                | crate::BuiltIn::TileApronSize
                | crate::BuiltIn::ShaderCore(_)
                | crate::BuiltIn::MeshTaskSize
                | crate::BuiltIn::CullPrimitive
                | crate::BuiltIn::PointIndex
                | crate::BuiltIn::LineIndices
                | crate::BuiltIn::TriangleIndices
                | crate::BuiltIn::VertexCount
                | crate::BuiltIn::Vertices
                | crate::BuiltIn::PrimitiveCount
                | crate::BuiltIn::Primitives
                | crate::BuiltIn::PrimitiveShadingRate
                | crate::BuiltIn::TaskCountNV
                | crate::BuiltIn::PrimitiveCountNV
                | crate::BuiltIn::PrimitiveIndicesNV
                | crate::BuiltIn::MeshViewCountNV
                | crate::BuiltIn::MeshViewIndicesNV
                | crate::BuiltIn::ClipDistancePerViewNV
                | crate::BuiltIn::CullDistancePerViewNV
                | crate::BuiltIn::LayerPerViewNV
                | crate::BuiltIn::RayInvocationId
                | crate::BuiltIn::NumRayInvocations
                | crate::BuiltIn::InstanceCustomData
                | crate::BuiltIn::GeometryIndex
                | crate::BuiltIn::WorldRayOrigin
                | crate::BuiltIn::WorldRayDirection
                | crate::BuiltIn::ObjectRayOrigin
                | crate::BuiltIn::ObjectRayDirection
                | crate::BuiltIn::RayTmin
                | crate::BuiltIn::RayTCurrentMax
                | crate::BuiltIn::ObjectToWorld
                | crate::BuiltIn::WorldToObject
                | crate::BuiltIn::HitKind
                | crate::BuiltIn::InstanceId
                | crate::BuiltIn::IncomingRayFlags
                | crate::BuiltIn::CullMask
                | crate::BuiltIn::HitTriangleVertexPositions
                | crate::BuiltIn::CurrentRayTime
                | crate::BuiltIn::ClusterId
                | crate::BuiltIn::HitMicroTriangleVertexPositions
                | crate::BuiltIn::HitMicroTriangleVertexBarycentrics
                | crate::BuiltIn::HitKindFrontFacingMicroTriangle
                | crate::BuiltIn::HitKindBackFacingMicroTriangle
                | crate::BuiltIn::HitIsSphere
                | crate::BuiltIn::HitIsLss
                | crate::BuiltIn::HitSpherePosition
                | crate::BuiltIn::HitSphereRadius
                | crate::BuiltIn::HitLssPositions
                | crate::BuiltIn::HitLssRadii => {}
            },
            crate::Binding::Location { .. } => {}
        }
        Ok(decorations)
    }

    /// Write the necessary decorations for a struct member.
    ///
    /// Emit decorations for the `index`'th member of the struct type
    /// designated by `struct_id`, described by `member`.
    pub(super) fn decorate_struct_member(
        &mut self,
        struct_id: Word,
        index: usize,
        member: &crate::StructMember,
        arena: &UniqueArena<crate::Type>,
        laid_out: bool,
    ) -> Result<(), Error> {
        use spirv::Decoration;

        if self.flags.contains(WriterFlags::DEBUG)
            && let Some(ref name) = member.name
        {
            self.debugs
                .push(Instruction::member_name(struct_id, index as u32, name));
        }

        if member.relaxed_precision {
            self.annotations.push(Instruction::member_decorate(
                struct_id,
                index as u32,
                Decoration::RelaxedPrecision,
                &[],
            ));
        }

        // Only the contents of buffers have a layout; see `laid_out_types`.
        if !laid_out {
            return Ok(());
        }

        for decoration in
            member_memory_decorations(member.memory_decorations, self.vulkan_memory_model)
        {
            self.annotations.push(Instruction::member_decorate(
                struct_id,
                index as u32,
                decoration,
                &[],
            ));
        }
        self.annotations.push(Instruction::member_decorate(
            struct_id,
            index as u32,
            Decoration::Offset,
            &[member.offset],
        ));

        // Matrices and (potentially nested) arrays of matrices both require decorations,
        // so "see through" any arrays to determine if they're needed.
        let mut member_array_subty_inner = &arena[member.ty].inner;
        while let crate::TypeInner::Array { base, .. } = *member_array_subty_inner {
            member_array_subty_inner = &arena[base].inner;
        }

        if let crate::TypeInner::Matrix {
            columns: _,
            rows,
            scalar,
        } = *member_array_subty_inner
        {
            // The front end may have chosen the layout (GLSL `std140`,
            // `row_major`, ...); otherwise columns are packed at the natural
            // alignment of the column vector.
            let (byte_stride, majorness) = match member.matrix_layout {
                Some(crate::MatrixLayout { stride, row_major }) => (
                    stride,
                    if row_major {
                        Decoration::RowMajor
                    } else {
                        Decoration::ColMajor
                    },
                ),
                None => (
                    Alignment::from(rows) * scalar.width as u32,
                    Decoration::ColMajor,
                ),
            };
            self.annotations.push(Instruction::member_decorate(
                struct_id,
                index as u32,
                majorness,
                &[],
            ));
            self.annotations.push(Instruction::member_decorate(
                struct_id,
                index as u32,
                Decoration::MatrixStride,
                &[byte_stride],
            ));
        }

        Ok(())
    }

    pub(super) fn get_function_type(&mut self, lookup_function_type: LookupFunctionType) -> Word {
        match self
            .lookup_function_type
            .entry(lookup_function_type.clone())
        {
            Entry::Occupied(e) => *e.get(),
            Entry::Vacant(_) => {
                let id = self.id_gen.next();
                let instruction = Instruction::type_function(
                    id,
                    lookup_function_type.return_type_id,
                    &lookup_function_type.parameter_type_ids,
                );
                instruction.to_words(&mut self.logical_layout.declarations);
                self.lookup_function_type.insert(lookup_function_type, id);
                id
            }
        }
    }

    const fn write_physical_layout(&mut self) {
        self.physical_layout.bound = self.id_gen.0 + 1;
    }

    fn write_logical_layout(
        &mut self,
        ir_module: &crate::Module,
        mod_info: &ModuleInfo,
        ep_index: Option<usize>,
    ) -> Result<(), Error> {
        self.legacy_buffer_blocks =
            ir_module.legacy_buffer_blocks && self.physical_layout.version < 0x10300;
        self.invariant_outputs = ir_module
            .entry_points
            .iter()
            .enumerate()
            .any(|(index, entry)| {
                entry.invariant_outputs && ep_index.is_none_or(|chosen| chosen == index)
            });
        let has_storage_buffers = !self.legacy_buffer_blocks
            && ir_module
                .global_variables
                .iter()
                .any(|(_, var)| matches!(var.space, crate::AddressSpace::Storage { .. }));
        let rt_uses = ir_module.uses_ray_tracing(ep_index);
        let has_ray_query = rt_uses.queries;
        self.has_ray_tracing_pipeline = rt_uses.pipelines;
        self.micromap_acceleration_structures = rt_uses.micromap;
        self.ray_tracing_features = ir_module.ray_tracing;

        if self.physical_layout.version < 0x10300 && has_storage_buffers {
            // enable the storage buffer class on < SPV-1.3
            Instruction::extension(feature::KHR_STORAGE_BUFFER_STORAGE_CLASS)
                .to_words(&mut self.logical_layout.extensions);
        }
        if has_ray_query {
            self.require(&feature::RAY_QUERY)?;
        }
        self.write_ray_tracing_features()?;
        self.mesh_flavor = ir_module
            .entry_points
            .iter()
            .enumerate()
            .filter(|&(index, _)| ep_index.is_none_or(|selected| selected == index))
            .find_map(|(_, entry)| entry.mesh_shader.as_ref().map(|info| info.flavor));
        if self.mesh_flavor.is_some() || ir_module.uses_mesh_shaders() {
            self.require_mesh_shading()?;
        }
        Instruction::type_void(self.void_type).to_words(&mut self.logical_layout.declarations);
        Instruction::ext_inst_import(self.gl450_ext_inst_id, "GLSL.std.450")
            .to_words(&mut self.logical_layout.ext_inst_imports);
        self.use_spirv_requirements(ir_module);

        self.debug_begin(ir_module);

        // Find the types that are stored in buffers; see `laid_out_types`.
        self.laid_out_types = crate::arena::HandleSet::for_arena(&ir_module.types);
        self.physical_pointees.clear();
        self.forward_pointers.clear();
        self.vulkan_memory_model = ir_module.vulkan_memory_model;
        self.device_scope_used = false;
        if self.vulkan_memory_model {
            self.use_feature(&feature::VULKAN_MEMORY_MODEL);
        }
        for (_, ty) in ir_module.types.iter() {
            if let crate::TypeInner::Pointer {
                base,
                space: crate::AddressSpace::PhysicalStorage { access, .. },
            } = ty.inner
            {
                mark_laid_out(&ir_module.types, &mut self.laid_out_types, base);
                *self
                    .physical_pointees
                    .entry(base)
                    .or_insert(crate::StorageAccess::empty()) |= access;
            }
        }
        if !self.physical_pointees.is_empty() {
            self.use_feature(&feature::PHYSICAL_STORAGE_BUFFER);
        }
        for (_, var) in ir_module.global_variables.iter() {
            if let crate::AddressSpace::Uniform
            | crate::AddressSpace::Storage { .. }
            | crate::AddressSpace::ShaderRecord
            | crate::AddressSpace::Immediate = var.space
            {
                mark_laid_out(&ir_module.types, &mut self.laid_out_types, var.ty);
            }
        }
        self.prepare_heaps(ir_module, mod_info);
        self.descriptor_heap = ir_module.descriptor_heap;

        self.decorated_blocks = crate::arena::HandleSet::for_arena(&ir_module.types);
        self.nested_types = super::helpers::nested_types(ir_module);
        self.prepare_overrides(ir_module);
        self.constant_ids
            .resize(ir_module.global_expressions.len(), 0);

        // write all types
        for (handle, _) in ir_module.types.iter() {
            if self.is_deferred_heap_type(handle) || self.is_unused_heap_type(handle) {
                continue;
            }
            self.write_type_declaration_arena(ir_module, mod_info, handle)?;
        }
        self.physical_type_ids.clear();
        for (handle, ty) in ir_module.types.iter() {
            if let crate::TypeInner::Pointer {
                space: crate::AddressSpace::PhysicalStorage { .. },
                ..
            } = ty.inner
            {
                if self.is_unused_heap_type(handle) {
                    continue;
                }
                let id = self.get_handle_type_id(handle)?;
                self.physical_type_ids.insert(id);
            }
        }
        self.physical_types.clear();

        // write all const-expressions as constants
        for (handle, _) in ir_module.global_expressions.iter() {
            if self.constant_ids[handle] == 0 && !self.is_spec_default(handle) {
                self.write_constant_expr(handle, ir_module, mod_info)?;
            }
        }
        for (handle, _) in ir_module.overrides.iter() {
            self.write_override(handle, ir_module, mod_info)?;
        }
        self.write_heap_layouts(ir_module, mod_info)?;

        // write the name of constants on their respective const-expression initializer
        if self.flags.contains(WriterFlags::DEBUG) {
            for (_, constant) in ir_module.constants.iter() {
                if let Some(ref name) = constant.name {
                    let id = self.constant_ids[constant.init];
                    self.debugs.push(Instruction::name(id, name));
                }
            }
        }

        // write all global variables
        for (handle, var) in ir_module.global_variables.iter() {
            // If a single entry point was specified, only write `OpVariable` instructions
            // for the globals it actually uses. Emit dummies for the others,
            // to preserve the indices in `global_variables`.
            // A variable in an entry point's interface is written whether or
            // not the code uses it: it is part of what the pipeline sees.
            let in_interface = |ep: &crate::EntryPoint| -> bool { ep.interface.contains(&handle) };
            let gvar = match ep_index {
                Some(index)
                    if mod_info.get_entry_point(index)[handle].is_empty()
                        && !in_interface(&ir_module.entry_points[index]) =>
                {
                    GlobalVariable::dummy()
                }
                _ => {
                    let interface_stage = match ep_index {
                        Some(index) => Some(&ir_module.entry_points[index]),
                        None => ir_module.entry_points.iter().find(|ep| in_interface(ep)),
                    }
                    .filter(|ep| in_interface(ep))
                    .map(|ep| ep.stage);
                    let id = self.write_global_variable(ir_module, handle, var, interface_stage)?;
                    GlobalVariable::new(id)
                }
            };
            self.global_variables.insert(handle, gvar);
        }
        self.write_spirv_decorations(ir_module)?;
        self.debug_module(ir_module)?;

        // write all functions
        for (handle, ir_function) in ir_module.functions.iter() {
            let info = &mod_info[handle];
            if let Some(index) = ep_index {
                let ep_info = mod_info.get_entry_point(index);
                // If this function uses globals that we omitted from the SPIR-V
                // because the entry point and its callees didn't use them,
                // then we must skip it.
                if !ep_info.dominates_global_use(info) {
                    log::debug!("Skip function {:?}", ir_function.name);
                    continue;
                }

                // Skip functions that that are not compatible with this entry point's stage.
                //
                // When validation is enabled, it rejects modules whose entry points try to call
                // incompatible functions, so if we got this far, then any functions incompatible
                // with our selected entry point must not be used.
                //
                // When validation is disabled, `fun_info.available_stages` is always just
                // `ShaderStages::all()`, so this will write all functions in the module, and
                // the downstream GLSL compiler will catch any problems.
                if !info.available_stages.contains(ep_info.available_stages) {
                    continue;
                }
            }
            let debug_start = ir_module
                .functions
                .get_span(handle)
                .to_range()
                .and_then(|range| u32::try_from(range.start).ok());
            let id = self.write_function(ir_function, info, ir_module, None, debug_start)?;
            self.lookup_function.insert(handle, id);
        }

        // write all or one entry points
        for (index, ir_ep) in ir_module.entry_points.iter().enumerate() {
            if ep_index.is_some() && ep_index != Some(index) {
                continue;
            }
            let info = mod_info.get_entry_point(index);
            let ep_instruction = self.write_entry_point(ir_ep, info, ir_module)?;
            ep_instruction.to_words(&mut self.logical_layout.entry_points);
        }

        if ir_module.variable_pointers {
            self.capabilities_used
                .insert(spirv::Capability::VariablePointers);
        }
        if ir_module.replicated_composites {
            let declarations =
                super::replicate::replicate_composites(&mut self.logical_layout.declarations);
            let functions = super::replicate::replicate_composites(
                &mut self.logical_layout.function_definitions,
            );
            if declarations || functions {
                self.use_feature(&feature::REPLICATED_COMPOSITES);
            }
        }
        if self
            .flags
            .contains(WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE)
        {
            let mut annotations = Vec::new();
            for annotation in self.annotations.iter() {
                annotation.to_words(&mut annotations);
            }
            let usage = super::small_types::usage(
                &self.logical_layout.declarations,
                &self.logical_layout.function_definitions,
                &annotations,
            );
            for capability in usage.capabilities {
                self.capabilities_used.insert(capability);
            }
            for feature in usage.features {
                self.use_feature(feature);
            }
        }
        if self.device_scope_used
            && self
                .capabilities_used
                .contains(&spirv::Capability::VulkanMemoryModel)
        {
            self.capabilities_used
                .insert(spirv::Capability::VulkanMemoryModelDeviceScope);
        }
        for capability in self.capabilities_used.iter() {
            Instruction::capability(*capability).to_words(&mut self.logical_layout.capabilities);
        }
        for &capability in self.raw_capabilities.iter() {
            let mut instruction = Instruction::new(spirv::Op::Capability);
            instruction.add_operand(capability);
            instruction.to_words(&mut self.logical_layout.capabilities);
        }
        for extension in self.extensions_used.iter() {
            Instruction::extension(extension).to_words(&mut self.logical_layout.extensions);
        }
        for extension in self.raw_extensions.iter() {
            if !self.extensions_used.contains(extension.as_str()) {
                Instruction::extension(extension).to_words(&mut self.logical_layout.extensions);
            }
        }
        if ir_module.entry_points.is_empty() {
            // SPIR-V doesn't like modules without entry points
            Instruction::capability(spirv::Capability::Linkage)
                .to_words(&mut self.logical_layout.capabilities);
        }

        let addressing_model = if self
            .capabilities_used
            .contains(&spirv::Capability::PhysicalStorageBufferAddresses)
        {
            spirv::AddressingModel::PhysicalStorageBuffer64
        } else {
            spirv::AddressingModel::Logical
        };
        let memory_model = if self
            .capabilities_used
            .contains(&spirv::Capability::VulkanMemoryModel)
        {
            spirv::MemoryModel::Vulkan
        } else {
            spirv::MemoryModel::GLSL450
        };
        //self.check(addressing_model.required_capabilities())?;
        //self.check(memory_model.required_capabilities())?;

        Instruction::memory_model(addressing_model, memory_model)
            .to_words(&mut self.logical_layout.memory_model);

        self.debug_end();
        for debug_string in self.debug_strings.iter() {
            debug_string.to_words(&mut self.logical_layout.debugs);
        }
        self.debug_end_sources();

        if self.flags.contains(WriterFlags::DEBUG) {
            for extension in &ir_module.source_extensions {
                let mut instruction = Instruction::new(spirv::Op::SourceExtension);
                instruction.add_operands(super::helpers::string_to_words(extension));
                instruction.to_words(&mut self.logical_layout.debugs);
            }
            for debug in self.debugs.iter() {
                debug.to_words(&mut self.logical_layout.debugs);
            }
        }
        self.debug_end_processes();
        self.debug_end_declarations();

        for annotation in self.annotations.iter() {
            annotation.to_words(&mut self.logical_layout.annotations);
        }

        Ok(())
    }

    pub fn write(
        &mut self,
        ir_module: &crate::Module,
        info: &ModuleInfo,
        pipeline_options: Option<&PipelineOptions>,
        words: &mut Vec<Word>,
    ) -> Result<(), Error> {
        self.reset();

        let exporting = self.flags.contains(WriterFlags::EXPORT_FUNCTIONS);
        if let Some(import) = ir_module
            .functions
            .iter()
            .map(|(_, function)| function)
            .filter(|_| !exporting)
            .chain(ir_module.entry_points.iter().map(|entry| &entry.function))
            .find(|function| function.linkage.is_import())
        {
            return Err(Error::Import(import.name.clone().unwrap_or_default()));
        }

        // Try to find the entry point and corresponding index
        let ep_index = match pipeline_options {
            Some(po) => {
                let index = ir_module
                    .entry_points
                    .iter()
                    .position(|ep| po.shader_stage == ep.stage && po.entry_point == ep.name)
                    .ok_or(Error::EntryPointNotFound)?;
                Some(index)
            }
            None => None,
        };

        self.write_logical_layout(ir_module, info, ep_index)?;
        if self.undeclarable_scalar {
            return Err(Error::Validation(
                "a scalar type without a SPIR-V declaration reached the backend",
            ));
        }
        self.write_physical_layout();

        self.physical_layout.in_words(words);
        self.logical_layout.in_words(words);
        Ok(())
    }

    /// Return the set of capabilities the last module written used.
    pub const fn get_capabilities_used(&self) -> &crate::FastIndexSet<spirv::Capability> {
        &self.capabilities_used
    }

    pub(super) fn decorate_precision(&mut self, id: Word, precision: crate::Precision) {
        if precision.contains(crate::Precision::RELAXED) {
            self.decorate(id, spirv::Decoration::RelaxedPrecision, &[]);
        }
        if precision.contains(crate::Precision::NO_CONTRACTION) {
            self.decorate(id, spirv::Decoration::NoContraction, &[]);
        }
    }

    pub(super) fn decorate_non_uniform(&mut self, id: Word) -> Result<(), Error> {
        self.require_any("NonUniform", &[spirv::Capability::ShaderNonUniform])?;
        self.use_descriptor_indexing();
        if self.descriptor_heap {
            self.require(&feature::NON_UNIFORM_DESCRIPTOR_HEAP)?;
        } else {
            self.decorate(id, spirv::Decoration::NonUniform, &[]);
        }
        Ok(())
    }

    pub(super) fn use_descriptor_indexing(&mut self) {
        self.use_feature(&feature::DESCRIPTOR_INDEXING);
    }

    pub(super) fn require_descriptor_indexing(
        &mut self,
        what: &'static str,
        capability: spirv::Capability,
    ) -> Result<(), Error> {
        self.require_any(what, &[capability])?;
        self.use_descriptor_indexing();
        Ok(())
    }

    pub(super) fn write_debug_printf(
        &mut self,
        block: &mut Block,
        string: &str,
        format_params: &[Word],
    ) {
        let import_id = match self.debug_printf {
            Some(import_id) => import_id,
            None => {
                self.use_feature(&feature::NON_SEMANTIC_INFO);
                let import_id = self.id_gen.next();
                Instruction::ext_inst_import(import_id, "NonSemantic.DebugPrintf")
                    .to_words(&mut self.logical_layout.ext_inst_imports);
                self.debug_printf = Some(import_id);
                import_id
            }
        };

        let string_id = self.debug_string(string);

        let mut operands = Vec::with_capacity(1 + format_params.len());
        operands.push(string_id);
        operands.extend(format_params.iter());

        let print_id = self.id_gen.next();
        block.body.push(Instruction::ext_inst(
            import_id,
            grammar::debug_printf::DebugPrintf,
            self.void_type,
            print_id,
            &operands,
        ));
    }
}

pub(super) fn access_decorations(
    access: crate::StorageAccess,
    member: crate::MemoryDecorations,
) -> Vec<spirv::Decoration> {
    let mut decorations = Vec::new();
    if !access.contains(crate::StorageAccess::STORE)
        && !member.contains(crate::MemoryDecorations::NON_WRITABLE)
    {
        decorations.push(spirv::Decoration::NonWritable);
    }
    if !access.contains(crate::StorageAccess::LOAD)
        && !member.contains(crate::MemoryDecorations::NON_READABLE)
    {
        decorations.push(spirv::Decoration::NonReadable);
    }
    decorations
}

pub(super) fn member_memory_decorations(
    decorations: crate::MemoryDecorations,
    vulkan_memory_model: bool,
) -> Vec<spirv::Decoration> {
    use crate::MemoryDecorations as Md;
    let coherent = Md::COHERENT
        | Md::DEVICE_COHERENT
        | Md::QUEUE_FAMILY_COHERENT
        | Md::WORKGROUP_COHERENT
        | Md::SUBGROUP_COHERENT
        | Md::SHADER_CALL_COHERENT;
    let mut memory = Vec::new();
    if !vulkan_memory_model {
        if decorations.contains(Md::VOLATILE) {
            memory.push(spirv::Decoration::Volatile);
            memory.push(spirv::Decoration::Coherent);
        } else if decorations.intersects(coherent) {
            memory.push(spirv::Decoration::Coherent);
        }
    }
    for (flag, decoration) in [
        (Md::RESTRICT, spirv::Decoration::Restrict),
        (Md::NON_WRITABLE, spirv::Decoration::NonWritable),
        (Md::NON_READABLE, spirv::Decoration::NonReadable),
    ] {
        if decorations.contains(flag) {
            memory.push(decoration);
        }
    }
    memory
}

#[test]
fn test_write_physical_layout() -> crate::TestResult {
    let mut writer = Writer::new(&Options::default())?;
    assert_eq!(writer.physical_layout.bound, 0);
    writer.write_physical_layout();
    assert_eq!(writer.physical_layout.bound, 3);
    Ok(())
}

impl Writer {
    fn decorate_physical_pointee(
        &mut self,
        module: &crate::Module,
        handle: Handle<crate::Type>,
        id: Word,
        access: crate::StorageAccess,
    ) {
        let crate::TypeInner::Struct { ref members, .. } = module.types[handle].inner else {
            return;
        };
        if self.buffer_blocks.insert(id) {
            self.decorate(id, spirv::Decoration::Block, &[]);
        }
        for (index, member) in members.iter().enumerate() {
            let Ok(index) = u32::try_from(index) else {
                break;
            };
            for decoration in access_decorations(access, member.memory_decorations) {
                self.annotations
                    .push(Instruction::member_decorate(id, index, decoration, &[]));
            }
        }
    }
}

fn encoded_float_type(id: Word, bits: u32, encoding: spirv::FPEncoding) -> Option<Instruction> {
    let mut instruction = Instruction::new(spirv::Op::TypeFloat);
    instruction.set_result(id);
    instruction.add_operand(bits);
    instruction.add_operand(encoding as u32);
    Some(instruction)
}

pub(super) fn mark_laid_out(
    types: &UniqueArena<crate::Type>,
    laid_out: &mut crate::arena::HandleSet<crate::Type>,
    ty: Handle<crate::Type>,
) {
    let mut pending = Vec::from([ty]);
    while let Some(ty) = pending.pop() {
        if !laid_out.insert(ty) {
            continue;
        }
        match types[ty].inner {
            crate::TypeInner::Array { base, .. } | crate::TypeInner::BindingArray { base, .. } => {
                pending.push(base);
            }
            crate::TypeInner::Struct { ref members, .. } => {
                pending.extend(members.iter().map(|member| member.ty));
            }
            crate::TypeInner::Scalar(_)
            | crate::TypeInner::Vector { .. }
            | crate::TypeInner::Matrix { .. }
            | crate::TypeInner::CooperativeMatrix { .. }
            | crate::TypeInner::LongVector { .. }
            | crate::TypeInner::TensorLayout { .. }
            | crate::TypeInner::TensorView { .. }
            | crate::TypeInner::Tensor { .. }
            | crate::TypeInner::Atomic(_)
            | crate::TypeInner::Pointer { .. }
            | crate::TypeInner::ValuePointer { .. }
            | crate::TypeInner::Image { .. }
            | crate::TypeInner::Sampler { .. }
            | crate::TypeInner::SampledImage { .. }
            | crate::TypeInner::AccelerationStructure
            | crate::TypeInner::RayQuery
            | crate::TypeInner::HitObject { .. }
            | crate::TypeInner::BufferDescriptor { .. }
            | crate::TypeInner::Spirv { .. } => {}
        }
    }
}

fn interface_member_used(
    module: &crate::Module,
    global: Handle<crate::GlobalVariable>,
    member: u32,
    arrayed: bool,
) -> bool {
    let functions = reachable_functions(module);
    for function in functions {
        let is_global = |pointer: Handle<crate::Expression>| {
            matches!(
                function.expressions[pointer],
                crate::Expression::GlobalVariable(found) if found == global
            )
        };
        let is_element = |pointer: Handle<crate::Expression>| {
            arrayed
                && matches!(
                    function.expressions[pointer],
                    crate::Expression::Access { base, .. }
                        | crate::Expression::AccessIndex { base, .. } if is_global(base)
                )
        };
        let is_block = |pointer: Handle<crate::Expression>| {
            if arrayed {
                is_element(pointer)
            } else {
                is_global(pointer)
            }
        };
        for (_, expression) in function.expressions.iter() {
            match *expression {
                crate::Expression::AccessIndex { base, index } => {
                    if is_block(base) && index == member {
                        return true;
                    }
                }
                crate::Expression::Load { pointer } => {
                    if is_global(pointer) || is_block(pointer) {
                        return true;
                    }
                }
                crate::Expression::Access { base, .. } => {
                    if !arrayed && is_global(base) {
                        return true;
                    }
                }
                crate::Expression::Literal(_)
                | crate::Expression::Constant(_)
                | crate::Expression::Override(_)
                | crate::Expression::ZeroValue(_)
                | crate::Expression::Compose { .. }
                | crate::Expression::Splat { .. }
                | crate::Expression::Swizzle { .. }
                | crate::Expression::FunctionArgument(_)
                | crate::Expression::GlobalVariable(_)
                | crate::Expression::LocalVariable(_)
                | crate::Expression::ImageSample { .. }
                | crate::Expression::ImageLoad { .. }
                | crate::Expression::ImageQuery { .. }
                | crate::Expression::Unary { .. }
                | crate::Expression::Binary { .. }
                | crate::Expression::Select { .. }
                | crate::Expression::Derivative { .. }
                | crate::Expression::Relational { .. }
                | crate::Expression::Math { .. }
                | crate::Expression::As { .. }
                | crate::Expression::CallResult(_)
                | crate::Expression::AtomicResult { .. }
                | crate::Expression::ArrayLength(_)
                | crate::Expression::WideArrayLength(_)
                | crate::Expression::PhysicalPointer { .. }
                | crate::Expression::PhysicalAddress { .. }
                | crate::Expression::BufferPointer { .. }
                | crate::Expression::HeapOffset { .. }
                | crate::Expression::RayQueryProceedResult
                | crate::Expression::RayQueryGet { .. }
                | crate::Expression::ReportIntersectionResult
                | crate::Expression::AccelerationStructureFromAddress { .. }
                | crate::Expression::HitObjectGet { .. }
                | crate::Expression::FetchMicroTriangleVertex { .. }
                | crate::Expression::SubgroupBallotResult
                | crate::Expression::SubgroupOperationResult { .. }
                | crate::Expression::SpirvInstructionResult { .. }
                | crate::Expression::CooperativeLoad { .. }
                | crate::Expression::CooperativeMultiplyAdd { .. }
                | crate::Expression::CooperativeMatrixLength { .. }
                | crate::Expression::Expect { .. }
                | crate::Expression::ImageSparseResident { .. }
                | crate::Expression::IsHelperInvocation
                | crate::Expression::ReadClock { .. }
                | crate::Expression::InterpolateAt { .. }
                | crate::Expression::FragmentFetch { .. }
                | crate::Expression::ImageFootprint { .. }
                | crate::Expression::AttachmentRead { .. }
                | crate::Expression::Replicate { .. }
                | crate::Expression::CooperativeVectorLoad { .. }
                | crate::Expression::CooperativeVectorMatMul { .. }
                | crate::Expression::Convert { .. }
                | crate::Expression::CooperativeMatrixResult { .. }
                | crate::Expression::TensorCreate { .. }
                | crate::Expression::ImageProcessing { .. }
                | crate::Expression::ArrayConversion { .. }
                | crate::Expression::Bitcast { .. }
                | crate::Expression::TensorSet { .. }
                | crate::Expression::TensorRead { .. }
                | crate::Expression::TensorQuerySize { .. } => {}
            }
        }
    }
    false
}

fn reachable_functions(module: &crate::Module) -> Vec<&crate::Function> {
    fn calls(block: &crate::Block, found: &mut Vec<Handle<crate::Function>>) {
        for statement in block.walk() {
            statement.for_each_callee(|function| found.push(function));
        }
    }
    let mut pending = Vec::new();
    let mut reached: Vec<&crate::Function> = Vec::new();
    for entry_point in &module.entry_points {
        reached.push(&entry_point.function);
        calls(&entry_point.function.body, &mut pending);
    }
    let mut visited = crate::FastHashSet::default();
    while let Some(handle) = pending.pop() {
        if !visited.insert(handle) {
            continue;
        }
        let Some(function) = module.functions.try_get(handle).ok() else {
            continue;
        };
        reached.push(function);
        calls(&function.body, &mut pending);
    }
    reached
}
