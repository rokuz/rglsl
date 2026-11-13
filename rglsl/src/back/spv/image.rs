/*!
Generating SPIR-V for image operations.
*/

use spirv::Word;

use super::{
    qcom::{
        CAPABILITY_IMAGE_GATHER_EXTENDED_MODES_QCOM, CAPABILITY_IMAGE_GATHER_LINEAR_QCOM,
        OP_IMAGE_GATHER_QCOM,
    },
    Block, BlockContext, Error, IdGenerator, Instruction, LocalImageType, LocalType, NumericType,
};
use crate::arena::Handle;

/// A trait for image access (load or store) code generators.
///
/// Types implementing this trait hold information about an `ImageStore` or
/// `ImageLoad` operation. The `generate` method emits code for the access.
trait Access {
    /// The Rust type that represents SPIR-V values and types for this access.
    ///
    /// For operations like loads, this is `Word`. For operations like stores,
    /// this is `()`.
    type Output: Copy + Clone;

    /// Write an image access to `block`.
    ///
    /// Access the texel at `coordinates_id`. The optional `level_id` indicates
    /// the level of detail, and `sample_id` is the index of the sample to
    /// access in a multisampled texel.
    ///
    /// This method assumes that `coordinates_id` has already had the image array
    /// index, if any, folded in, as done by `write_image_coordinates`.
    ///
    /// Return the value id produced by the instruction, if any.
    ///
    /// Use `id_gen` to generate SPIR-V ids as necessary.
    fn generate(
        &self,
        id_gen: &mut IdGenerator,
        coordinates_id: Word,
        level_id: Option<Word>,
        sample_id: Option<Word>,
        block: &mut Block,
    ) -> Self::Output;

    /// Return the SPIR-V type of the value produced by the code written by
    /// `generate`. If the access does not produce a value, `Self::Output`
    /// should be `()`.
    fn result_type(&self) -> Self::Output;
}

/// Texel access information for an [`ImageLoad`] expression.
///
/// [`ImageLoad`]: crate::Expression::ImageLoad
struct Load {
    /// The specific opcode we'll use to perform the fetch. Storage images
    /// require `OpImageRead`, while sampled images require `OpImageFetch`.
    opcode: spirv::Op,

    /// The type id produced by the actual image access instruction.
    type_id: Word,

    /// The id of the image being accessed.
    image_id: Word,

    memory: (spirv::ImageOperands, Option<Word>),
}

impl Load {
    fn from_image_expr(
        ctx: &mut BlockContext<'_>,
        image_id: Word,
        image_class: crate::ImageClass,
        result_type_id: Word,
    ) -> Result<Load, Error> {
        let opcode = match image_class {
            crate::ImageClass::Storage { .. } => spirv::Op::ImageRead,
            crate::ImageClass::Depth { .. } | crate::ImageClass::Sampled { .. } => {
                spirv::Op::ImageFetch
            }
        };

        // `OpImageRead` and `OpImageFetch` instructions produce vec4<f32>
        // values. Most of the time, we can just use `result_type_id` for
        // this. The exception is that `Expression::ImageLoad` from a depth
        // image produces a scalar `f32`, so in that case we need to find
        // the right SPIR-V type for the access instruction here.
        let type_id = match image_class {
            crate::ImageClass::Depth { .. } => ctx.get_numeric_type_id(NumericType::Vector {
                size: crate::VectorSize::Quad,
                scalar: crate::Scalar::F32,
            }),
            _ => result_type_id,
        };

        Ok(Load {
            opcode,
            type_id,
            image_id,
            memory: (spirv::ImageOperands::empty(), None),
        })
    }
}

impl Access for Load {
    type Output = Word;

    /// Write an instruction to access a given texel of this image.
    fn generate(
        &self,
        id_gen: &mut IdGenerator,
        coordinates_id: Word,
        level_id: Option<Word>,
        sample_id: Option<Word>,
        block: &mut Block,
    ) -> Word {
        let texel_id = id_gen.next();
        let mut instruction = Instruction::image_fetch_or_read(
            self.opcode,
            self.type_id,
            texel_id,
            self.image_id,
            coordinates_id,
        );

        let (memory, scope_id) = self.memory;
        let mut mask = memory;
        mask.set(spirv::ImageOperands::LOD, level_id.is_some());
        mask.set(spirv::ImageOperands::SAMPLE, sample_id.is_some());
        if !mask.is_empty() {
            instruction.add_operand(mask.bits());
        }
        for id in level_id.into_iter().chain(sample_id).chain(scope_id) {
            instruction.add_operand(id);
        }

        block.body.push(instruction);

        texel_id
    }

    fn result_type(&self) -> Word {
        self.type_id
    }
}

/// Texel access information for a [`Store`] statement.
///
/// [`Store`]: crate::Statement::Store
struct Store {
    /// The id of the image being written to.
    image_id: Word,

    /// The value we're going to write to the texel.
    value_id: Word,

    memory: (spirv::ImageOperands, Option<Word>),
}

impl Access for Store {
    /// Stores don't generate any value.
    type Output = ();

    fn generate(
        &self,
        _id_gen: &mut IdGenerator,
        coordinates_id: Word,
        level_id: Option<Word>,
        sample_id: Option<Word>,
        block: &mut Block,
    ) {
        let mut instruction =
            Instruction::image_write(self.image_id, coordinates_id, self.value_id);
        let (memory, scope_id) = self.memory;
        let mut mask = memory;
        mask.set(spirv::ImageOperands::LOD, level_id.is_some());
        mask.set(spirv::ImageOperands::SAMPLE, sample_id.is_some());
        if !mask.is_empty() {
            instruction.add_operand(mask.bits());
        }
        for id in level_id.into_iter().chain(sample_id).chain(scope_id) {
            instruction.add_operand(id);
        }
        block.body.push(instruction);
    }

    /// Stores don't generate any value, so this just returns `()`.
    fn result_type(&self) {}
}

impl BlockContext<'_> {
    /// Extend image coordinates with an array index, if necessary.
    ///
    /// Whereas [`Expression::ImageLoad`] and [`ImageSample`] treat the array
    /// index as a separate operand from the coordinates, SPIR-V image access
    /// instructions include the array index in the `coordinates` operand. This
    /// function builds a SPIR-V coordinate vector from a rglsl coordinate vector
    /// and array index, if one is supplied, and returns a `ImageCoordinates`
    /// struct describing what it built.
    ///
    /// If `array_index` is `Some(expr)`, then this function constructs a new
    /// vector that is `coordinates` with `array_index` concatenated onto the
    /// end: a `vec2` becomes a `vec3`, a scalar becomes a `vec2`, and so on.
    ///
    /// If `array_index` is `None`, then the return value uses `coordinates`
    /// unchanged. Note that, when indexing a non-arrayed 1D image, this will be
    /// a scalar value.
    ///
    /// If needed, this function generates code to convert the array index,
    /// always an integer scalar, to match the component type of `coordinates`.
    /// rglsl's `ImageLoad` and SPIR-V's `OpImageRead`, `OpImageFetch`, and
    /// `OpImageWrite` all use integer coordinates, while rglsl's `ImageSample`
    /// and SPIR-V's `OpImageSample...` instructions all take floating-point
    /// coordinate vectors.
    ///
    /// [`Expression::ImageLoad`]: crate::Expression::ImageLoad
    /// [`ImageSample`]: crate::Expression::ImageSample
    pub(super) fn write_image_coordinates(
        &mut self,
        coordinates: Handle<crate::Expression>,
        array_index: Option<Handle<crate::Expression>>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        use crate::TypeInner as Ti;
        use crate::VectorSize as Vs;

        let coordinates_id = self.cached.get(coordinates)?;
        let ty = &self.fun_info[coordinates].ty;
        let inner_ty = ty.inner_with(&self.ir_module.types);

        // If there's no array index, the image coordinates are exactly the
        // `coordinate` field of the `Expression::ImageLoad`. No work is needed.
        let array_index = match array_index {
            None => {
                return match *inner_ty {
                    Ti::Scalar { .. } | Ti::Vector { .. } => Ok(coordinates_id),
                    _ => Err(Error::Validation("coordinate type")),
                };
            }
            Some(ix) => ix,
        };

        // Find the component type of `coordinates`, and figure out the size the
        // combined coordinate vector will have.
        let (component_scalar, size) = match *inner_ty {
            Ti::Scalar(scalar @ crate::Scalar { width: 4, .. }) => (scalar, Vs::Bi),
            Ti::Vector {
                scalar: scalar @ crate::Scalar { width: 4, .. },
                size: Vs::Bi,
            } => (scalar, Vs::Tri),
            Ti::Vector {
                scalar: scalar @ crate::Scalar { width: 4, .. },
                size: Vs::Tri,
            } => (scalar, Vs::Quad),
            Ti::Vector { size: Vs::Quad, .. } => {
                return Err(Error::Validation("extending vec4 coordinate"));
            }
            ref other => {
                log::error!("wrong coordinate type {other:?}");
                return Err(Error::Validation("coordinate type"));
            }
        };

        // Convert the index to the coordinate component type, if necessary.
        let array_index_id = self.cached.get(array_index)?;
        let ty = &self.fun_info[array_index].ty;
        let inner_ty = ty.inner_with(&self.ir_module.types);
        let array_index_scalar = match *inner_ty {
            Ti::Scalar(
                scalar @ crate::Scalar {
                    kind: crate::ScalarKind::Sint | crate::ScalarKind::Uint,
                    width: 4,
                },
            ) => scalar,
            _ => return Err(Error::Validation("image array index must be i32 or u32")),
        };
        let cast = match (component_scalar.kind, array_index_scalar.kind) {
            (crate::ScalarKind::Sint, crate::ScalarKind::Sint)
            | (crate::ScalarKind::Uint, crate::ScalarKind::Uint) => None,
            (crate::ScalarKind::Sint, crate::ScalarKind::Uint)
            | (crate::ScalarKind::Uint, crate::ScalarKind::Sint) => Some(spirv::Op::Bitcast),
            (crate::ScalarKind::Float, crate::ScalarKind::Sint) => Some(spirv::Op::ConvertSToF),
            (crate::ScalarKind::Float, crate::ScalarKind::Uint) => Some(spirv::Op::ConvertUToF),
            _ => return Err(Error::Validation("image coordinate type")),
        };
        let reconciled_array_index_id = if let Some(cast) = cast {
            let component_ty_id = self.get_numeric_type_id(NumericType::Scalar(component_scalar));
            let reconciled_id = self.gen_id();
            block.body.push(Instruction::unary(
                cast,
                component_ty_id,
                reconciled_id,
                array_index_id,
            ));
            reconciled_id
        } else {
            array_index_id
        };

        // Find the SPIR-V type for the combined coordinates/index vector.
        let type_id = self.get_numeric_type_id(NumericType::Vector {
            size,
            scalar: component_scalar,
        });

        // Schmear the coordinates and index together.
        let value_id = self.gen_id();
        block.body.push(Instruction::composite_construct(
            type_id,
            value_id,
            &[coordinates_id, reconciled_array_index_id],
        ));
        Ok(value_id)
    }

    pub(super) fn get_non_uniform_handle_id(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let id = self.get_handle_id(expr_handle)?;
        let shared = matches!(
            self.ir_function.expressions[expr_handle],
            crate::Expression::GlobalVariable(_) | crate::Expression::FunctionArgument(_)
        );
        if !shared
            || !self
                .non_uniform(expr_handle)
                .contains(crate::NonUniform::VALUE)
        {
            return Ok(id);
        }
        let type_id = self.get_expression_type_id(&self.fun_info[expr_handle].ty)?;
        let copy_id = self.gen_id();
        block.body.push(Instruction::unary(
            spirv::Op::CopyObject,
            type_id,
            copy_id,
            id,
        ));
        self.writer.decorate_non_uniform(copy_id)?;
        Ok(copy_id)
    }

    pub(super) fn get_handle_id(
        &mut self,
        expr_handle: Handle<crate::Expression>,
    ) -> Result<Word, Error> {
        let id = match self.ir_function.expressions[expr_handle] {
            crate::Expression::GlobalVariable(handle) => {
                self.writer.global_variables[handle].handle_id
            }
            crate::Expression::FunctionArgument(i) => {
                self.function.parameters[i as usize].handle_id
            }
            crate::Expression::Access { .. }
            | crate::Expression::AccessIndex { .. }
            | crate::Expression::Load { .. }
            | crate::Expression::CallResult(_)
            | crate::Expression::AccelerationStructureFromAddress { .. } => {
                self.cached.get(expr_handle)?
            }
            _ => return Err(Error::Validation("unexpected opaque handle expression")),
        };

        if id == 0 {
            return Err(Error::Validation("opaque handle expression has no id"));
        }

        Ok(id)
    }

    pub(super) fn get_image_id(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let id = self.get_non_uniform_handle_id(expr_handle, block)?;
        match *self.fun_info[expr_handle]
            .ty
            .inner_with(&self.ir_module.types)
        {
            crate::TypeInner::SampledImage {
                dim,
                arrayed,
                class,
            } => {
                let image_type_id = self.get_localtype_id(LocalType::Image(
                    LocalImageType::from_inner(dim, arrayed, class)?,
                ));
                let image_id = self.gen_id();
                block
                    .body
                    .push(Instruction::image_of_sampled(image_type_id, image_id, id));
                if self
                    .non_uniform(expr_handle)
                    .contains(crate::NonUniform::VALUE)
                {
                    self.writer.decorate_non_uniform(image_id)?;
                }
                Ok(image_id)
            }
            _ => Ok(id),
        }
    }

    /// Generate code for an `ImageLoad` expression.
    ///
    /// The arguments are the components of an `Expression::ImageLoad` variant.
    #[expect(
        clippy::too_many_arguments,
        reason = "the arguments are the parts of one request"
    )]
    pub(super) fn write_image_load(
        &mut self,
        result_type_id: Word,
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        array_index: Option<Handle<crate::Expression>>,
        level: Option<Handle<crate::Expression>>,
        sample: Option<Handle<crate::Expression>>,
        sparse: bool,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let image_id = self.get_image_id(image, block)?;
        let image_type = self.fun_info[image].ty.inner_with(&self.ir_module.types);
        let (image_class, dim) = match *image_type {
            crate::TypeInner::Image { class, dim, .. }
            | crate::TypeInner::SampledImage { class, dim, .. } => (class, dim),
            _ => return Err(Error::Validation("image type")),
        };
        let subpass = dim == crate::ImageDimension::Subpass;

        let mut access = Load::from_image_expr(self, image_id, image_class, result_type_id)?;
        if subpass {
            access.opcode = spirv::Op::ImageRead;
        }
        if sparse {
            if access.type_id != result_type_id {
                return Err(Error::FeatureNotImplemented("sparse loads of depth images"));
            }
            self.writer
                .require_any("sparse residency", &[spirv::Capability::SparseResidency])?;
            access.opcode = match access.opcode {
                spirv::Op::ImageRead => spirv::Op::ImageSparseRead,
                _ => spirv::Op::ImageSparseFetch,
            };
        }
        if matches!(image_class, crate::ImageClass::Storage { .. }) {
            access.memory = self.texel_memory(image, false);
            if level.is_some() && !subpass {
                self.require_storage_image_lod()?;
            }
        }
        if let crate::ImageClass::Storage {
            format: crate::StorageFormat::Unknown(_),
            ..
        } = image_class
        {
            self.writer.require_any(
                "storage image read without a format",
                &[spirv::Capability::StorageImageReadWithoutFormat],
            )?;
        }
        let coordinates = self.write_image_coordinates(coordinate, array_index, block)?;

        let level_id = level.map(|expr| self.cached.get(expr)).transpose()?;
        let sample_id = sample.map(|expr| self.cached.get(expr)).transpose()?;

        let access_id = access.generate(
            &mut self.writer.id_gen,
            coordinates,
            level_id,
            sample_id,
            block,
        );

        // For depth images, `ImageLoad` expressions produce a single f32,
        // whereas the SPIR-V instructions always produce a vec4. So we may have
        // to pull out the component we need.
        let result_id = if result_type_id == access.result_type() {
            // The instruction produced the type we expected. We can use
            // its result as-is.
            access_id
        } else {
            // For `ImageClass::Depth` images, SPIR-V gave us four components,
            // but we only want the first one.
            let component_id = self.gen_id();
            block.body.push(Instruction::composite_extract(
                result_type_id,
                component_id,
                access_id,
                &[0],
            ));
            component_id
        };

        Ok(result_id)
    }

    /// Generate code for an `ImageSample` expression.
    ///
    /// The arguments are the components of an `Expression::ImageSample` variant.
    #[expect(
        clippy::too_many_arguments,
        reason = "the arguments are the parts of one request"
    )]
    pub(super) fn write_image_sample(
        &mut self,
        sample_expression: Handle<crate::Expression>,
        result_type_id: Word,
        image: Handle<crate::Expression>,
        sampler: Option<Handle<crate::Expression>>,
        gather: Option<(crate::SwizzleComponent, crate::ImageGatherPattern)>,
        coordinate: Handle<crate::Expression>,
        array_index: Option<Handle<crate::Expression>>,
        offset: Option<Handle<crate::Expression>>,
        level: crate::SampleLevel,
        depth_ref: Option<Handle<crate::Expression>>,
        min_lod: Option<Handle<crate::Expression>>,
        sparse: bool,
        block: &mut Block,
    ) -> Result<Word, Error> {
        use super::instructions::SampleLod;
        let handle_id = self.get_non_uniform_handle_id(image, block)?;
        let (dim, arrayed, class) = match *self.fun_info[image].ty.inner_with(&self.ir_module.types)
        {
            crate::TypeInner::Image {
                dim,
                arrayed,
                class,
            }
            | crate::TypeInner::SampledImage {
                dim,
                arrayed,
                class,
            } => (dim, arrayed, class),
            _ => return Err(Error::Validation("image type")),
        };
        // SPIR-V doesn't know about our `Depth` class, and it returns
        // `vec4<f32>`, so we need to grab the first component out of it.
        let needs_sub_access = match class {
            crate::ImageClass::Depth { .. } => depth_ref.is_none() && gather.is_none(),
            _ => false,
        };
        if sparse && needs_sub_access {
            return Err(Error::FeatureNotImplemented(
                "sparse sampling of depth images without a reference",
            ));
        }
        let sample_result_type_id = if needs_sub_access {
            self.get_numeric_type_id(NumericType::Vector {
                size: crate::VectorSize::Quad,
                scalar: crate::Scalar::F32,
            })
        } else {
            result_type_id
        };

        let sampled_class = match (class, sampler, depth_ref) {
            (
                crate::ImageClass::Sampled {
                    kind: crate::ScalarKind::Float,
                    multi,
                },
                Some(_),
                Some(_),
            ) => crate::ImageClass::Depth { multi },
            _ => class,
        };
        let image_type_id = self.get_localtype_id(LocalType::Image(LocalImageType::from_inner(
            dim,
            arrayed,
            sampled_class,
        )?));
        let sampled_image_type_id =
            self.get_localtype_id(LocalType::SampledImage { image_type_id });
        if sampler.is_some() {
            self.writer.debug_sampled_image(dim, arrayed, sampled_class);
        }
        let image_id = match sampler {
            Some(_) => handle_id,
            None => 0,
        };

        let coordinates = self.write_image_coordinates(coordinate, array_index, block)?;
        let coordinates_id = coordinates;

        let sampled_image_id = match sampler {
            Some(sampler) => {
                let sampler_id = self.get_non_uniform_handle_id(sampler, block)?;
                let sampled_image_id = self.gen_id();
                block.body.push(Instruction::sampled_image(
                    sampled_image_type_id,
                    sampled_image_id,
                    image_id,
                    sampler_id,
                ));
                if self
                    .non_uniform(sample_expression)
                    .contains(crate::NonUniform::SAMPLED_IMAGE)
                {
                    self.writer.decorate_non_uniform(sampled_image_id)?;
                }
                sampled_image_id
            }
            None => handle_id,
        };
        let id = self.gen_id();

        let depth_id = depth_ref
            .map(|handle| self.cached.get(handle))
            .transpose()?;
        let mut mask = spirv::ImageOperands::empty();
        let constant_offset =
            offset.is_none_or(|offset| self.expression_constness.is_constant_instruction(offset));
        let offsets = offset.is_some_and(|offset| {
            matches!(
                *self.fun_info[offset].ty.inner_with(&self.ir_module.types),
                crate::TypeInner::Array { .. }
            )
        });
        if offsets {
            if !constant_offset {
                return Err(Error::FeatureNotImplemented(
                    "gather offsets that are not constant",
                ));
            }
            self.writer.require_any(
                "constant gather offsets",
                &[spirv::Capability::ImageGatherExtended],
            )?;
            mask |= spirv::ImageOperands::CONST_OFFSETS;
        }
        let offset_operand = offset;
        let offset = offset.filter(|_| !offsets);
        mask.set(
            spirv::ImageOperands::CONST_OFFSET,
            offset.is_some() && constant_offset,
        );
        mask.set(
            spirv::ImageOperands::OFFSET,
            offset.is_some() && !constant_offset,
        );
        if !constant_offset {
            self.writer.require_any(
                "non-constant image offsets",
                &[spirv::Capability::ImageGatherExtended],
            )?;
        }
        let min_lod_id = min_lod.map(|expr| self.cached.get(expr)).transpose()?;
        if min_lod_id.is_some() {
            mask |= spirv::ImageOperands::MIN_LOD;
            self.writer
                .require_any("minimum level of detail", &[spirv::Capability::MinLod])?;
        }

        let mut main_instruction = match (level, gather) {
            (_, Some((component, crate::ImageGatherPattern::Quad))) => {
                let component_id = self.get_index_constant(component as u32);
                let mut inst = Instruction::image_gather(
                    sample_result_type_id,
                    id,
                    sampled_image_id,
                    coordinates_id,
                    component_id,
                    depth_id,
                );
                let level_id = match level {
                    crate::SampleLevel::Exact(handle) => {
                        mask |= spirv::ImageOperands::LOD;
                        Some(self.cached.get(handle)?)
                    }
                    crate::SampleLevel::Bias(handle) => {
                        mask |= spirv::ImageOperands::BIAS;
                        Some(self.cached.get(handle)?)
                    }
                    crate::SampleLevel::Auto
                    | crate::SampleLevel::Zero
                    | crate::SampleLevel::Gradient { .. } => None,
                };
                if level_id.is_some() {
                    self.writer.use_extension("SPV_AMD_texture_gather_bias_lod");
                    self.writer.require_any(
                        "gather with a level of detail or bias",
                        &[spirv::Capability::ImageGatherBiasLodAMD],
                    )?;
                }
                if !mask.is_empty() {
                    inst.add_operand(mask.bits());
                }
                if let Some(level_id) = level_id {
                    inst.add_operand(level_id);
                }
                inst
            }
            (_, Some((component, pattern))) => {
                let (capability, mode) = match pattern {
                    crate::ImageGatherPattern::Linear4x1 => {
                        (CAPABILITY_IMAGE_GATHER_LINEAR_QCOM, 0)
                    }
                    crate::ImageGatherPattern::Diagonal => {
                        (CAPABILITY_IMAGE_GATHER_EXTENDED_MODES_QCOM, 1)
                    }
                    crate::ImageGatherPattern::Horizontal2 => {
                        (CAPABILITY_IMAGE_GATHER_EXTENDED_MODES_QCOM, 2)
                    }
                    crate::ImageGatherPattern::Vertical2 | crate::ImageGatherPattern::Quad => {
                        (CAPABILITY_IMAGE_GATHER_EXTENDED_MODES_QCOM, 3)
                    }
                };
                if depth_id.is_some() {
                    return Err(Error::Validation("a gather pattern with a depth reference"));
                }
                self.writer.raw_capabilities.insert(capability);
                self.writer.use_extension("SPV_QCOM_image_processing3");
                let component_id = self.get_index_constant(component as u32);
                let mode_id = self.get_index_constant(mode);
                let mut inst = Instruction::raw(OP_IMAGE_GATHER_QCOM);
                inst.set_type(sample_result_type_id);
                inst.set_result(id);
                inst.add_operand(sampled_image_id);
                inst.add_operand(coordinates_id);
                inst.add_operand(component_id);
                inst.add_operand(mode_id);
                if !mask.is_empty() {
                    inst.add_operand(mask.bits());
                }
                inst
            }
            (crate::SampleLevel::Zero, None) => {
                let mut inst = Instruction::image_sample(
                    sample_result_type_id,
                    id,
                    SampleLod::Explicit,
                    sampled_image_id,
                    coordinates_id,
                    depth_id,
                );

                let zero_id = self.writer.get_constant_scalar(crate::Literal::F32(0.0));

                mask |= spirv::ImageOperands::LOD;
                inst.add_operand(mask.bits());
                inst.add_operand(zero_id);

                inst
            }
            (crate::SampleLevel::Auto, None) => {
                let mut inst = Instruction::image_sample(
                    sample_result_type_id,
                    id,
                    SampleLod::Implicit,
                    sampled_image_id,
                    coordinates_id,
                    depth_id,
                );
                if !mask.is_empty() {
                    inst.add_operand(mask.bits());
                }
                inst
            }
            (crate::SampleLevel::Exact(lod_handle), None) => {
                let mut inst = Instruction::image_sample(
                    sample_result_type_id,
                    id,
                    SampleLod::Explicit,
                    sampled_image_id,
                    coordinates_id,
                    depth_id,
                );

                let mut lod_id = self.cached.get(lod_handle)?;
                // SPIR-V expects the LOD to be a float for all image classes.
                // The IR allows an integer level for depth images (as WGSL
                // has it), which must be converted.
                let convert_op = match *self.fun_info[lod_handle]
                    .ty
                    .inner_with(&self.ir_module.types)
                {
                    crate::TypeInner::Scalar(crate::Scalar {
                        kind: crate::ScalarKind::Uint,
                        ..
                    }) => Some(spirv::Op::ConvertUToF),
                    crate::TypeInner::Scalar(crate::Scalar {
                        kind: crate::ScalarKind::Sint,
                        ..
                    }) => Some(spirv::Op::ConvertSToF),
                    _ => None,
                };
                if let Some(convert_op) = convert_op {
                    let lod_f32_id = self.gen_id();
                    let f32_type_id =
                        self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::F32));
                    block.body.push(Instruction::unary(
                        convert_op,
                        f32_type_id,
                        lod_f32_id,
                        lod_id,
                    ));
                    lod_id = lod_f32_id;
                }
                mask |= spirv::ImageOperands::LOD;
                inst.add_operand(mask.bits());
                inst.add_operand(lod_id);

                inst
            }
            (crate::SampleLevel::Bias(bias_handle), None) => {
                let mut inst = Instruction::image_sample(
                    sample_result_type_id,
                    id,
                    SampleLod::Implicit,
                    sampled_image_id,
                    coordinates_id,
                    depth_id,
                );

                let bias_id = self.cached.get(bias_handle)?;
                mask |= spirv::ImageOperands::BIAS;
                inst.add_operand(mask.bits());
                inst.add_operand(bias_id);

                inst
            }
            (crate::SampleLevel::Gradient { x, y }, None) => {
                let mut inst = Instruction::image_sample(
                    sample_result_type_id,
                    id,
                    SampleLod::Explicit,
                    sampled_image_id,
                    coordinates_id,
                    depth_id,
                );

                let x_id = self.cached.get(x)?;
                let y_id = self.cached.get(y)?;
                mask |= spirv::ImageOperands::GRAD;
                inst.add_operand(mask.bits());
                inst.add_operand(x_id);
                inst.add_operand(y_id);

                inst
            }
        };

        if let Some(offset_const) = offset_operand {
            let offset_id = self.cached.get(offset_const)?;
            main_instruction.add_operand(offset_id);
        }
        if let Some(min_lod_id) = min_lod_id {
            main_instruction.add_operand(min_lod_id);
        }
        if sparse {
            self.writer
                .require_any("sparse residency", &[spirv::Capability::SparseResidency])?;
            main_instruction.op = sparse_opcode(main_instruction.op)? as u32;
        }

        block.body.push(main_instruction);

        let id = if needs_sub_access {
            let sub_id = self.gen_id();
            block.body.push(Instruction::composite_extract(
                result_type_id,
                sub_id,
                id,
                &[0],
            ));
            sub_id
        } else {
            id
        };

        Ok(id)
    }

    /// Generate code for an `ImageQuery` expression.
    ///
    /// The arguments are the components of an `Expression::ImageQuery` variant.
    pub(super) fn write_image_query(
        &mut self,
        result_type_id: Word,
        image: Handle<crate::Expression>,
        query: crate::ImageQuery,
        block: &mut Block,
    ) -> Result<Word, Error> {
        use crate::{ImageClass as Ic, ImageDimension as Id, ImageQuery as Iq};

        if let Iq::Lod {
            sampler,
            coordinate,
        } = query
        {
            return self.write_image_query_lod(result_type_id, image, sampler, coordinate, block);
        }
        let image_id = self.get_image_id(image, block)?;
        let (dim, arrayed, class) = match *self.fun_info[image].ty.inner_with(&self.ir_module.types)
        {
            crate::TypeInner::Image {
                dim,
                arrayed,
                class,
            }
            | crate::TypeInner::SampledImage {
                dim,
                arrayed,
                class,
            } => (dim, arrayed, class),
            _ => {
                return Err(Error::Validation("image type"));
            }
        };

        self.writer
            .require_any("image queries", &[spirv::Capability::ImageQuery])?;

        let id = match query {
            Iq::Size { level } => {
                let dim_coords = match dim {
                    Id::D1 | Id::Buffer => 1,
                    Id::D2 | Id::Cube => 2,
                    Id::D3 => 3,
                    Id::Subpass | Id::TileImageData => {
                        return Err(Error::Validation("subpass input query"))
                    }
                };
                let array_coords = usize::from(arrayed);
                let vector_size = match dim_coords + array_coords {
                    2 => Some(crate::VectorSize::Bi),
                    3 => Some(crate::VectorSize::Tri),
                    4 => Some(crate::VectorSize::Quad),
                    _ => None,
                };
                let vector_numeric_type = match vector_size {
                    Some(size) => NumericType::Vector {
                        size,
                        scalar: crate::Scalar::U32,
                    },
                    None => NumericType::Scalar(crate::Scalar::U32),
                };

                let extended_size_type_id = self.get_numeric_type_id(vector_numeric_type);

                let (query_op, level_id) = match class {
                    _ if dim == Id::Buffer => (spirv::Op::ImageQuerySize, None),
                    Ic::Sampled { multi: true, .. }
                    | Ic::Depth { multi: true }
                    | Ic::Storage { .. } => (spirv::Op::ImageQuerySize, None),
                    _ => {
                        let level_id = match level {
                            Some(expr) => self.cached.get(expr)?,
                            None => self.get_index_constant(0),
                        };
                        (spirv::Op::ImageQuerySizeLod, Some(level_id))
                    }
                };

                // The ID of the vector returned by SPIR-V, which contains the dimensions
                // as well as the layer count.
                let id_extended = self.gen_id();
                let mut inst = Instruction::image_query(
                    query_op,
                    extended_size_type_id,
                    id_extended,
                    image_id,
                );
                if let Some(expr_id) = level_id {
                    inst.add_operand(expr_id);
                }
                block.body.push(inst);

                if result_type_id != extended_size_type_id && dim_coords == 1 {
                    let id = self.gen_id();
                    block.body.push(Instruction::composite_extract(
                        result_type_id,
                        id,
                        id_extended,
                        &[0],
                    ));
                    id
                } else if result_type_id != extended_size_type_id {
                    let id = self.gen_id();
                    let components = match dim {
                        // always pick the first component, and duplicate it for all 3 dimensions
                        Id::Cube => &[0u32, 0][..],
                        _ => &[0u32, 1, 2, 3][..dim_coords],
                    };
                    block.body.push(Instruction::vector_shuffle(
                        result_type_id,
                        id,
                        id_extended,
                        id_extended,
                        components,
                    ));

                    id
                } else {
                    id_extended
                }
            }
            Iq::NumLevels => {
                let query_id = self.gen_id();
                block.body.push(Instruction::image_query(
                    spirv::Op::ImageQueryLevels,
                    result_type_id,
                    query_id,
                    image_id,
                ));

                query_id
            }
            Iq::NumLayers => {
                let vec_size = match dim {
                    Id::D1 | Id::Buffer => crate::VectorSize::Bi,
                    Id::D2 | Id::Cube => crate::VectorSize::Tri,
                    Id::D3 => crate::VectorSize::Quad,
                    Id::Subpass | Id::TileImageData => {
                        return Err(Error::Validation("subpass input query"))
                    }
                };
                let extended_size_type_id = self.get_numeric_type_id(NumericType::Vector {
                    size: vec_size,
                    scalar: crate::Scalar::U32,
                });
                let id_extended = self.gen_id();
                let lod = !matches!(
                    class,
                    Ic::Sampled { multi: true, .. }
                        | Ic::Depth { multi: true }
                        | Ic::Storage { .. }
                );
                let mut inst = Instruction::image_query(
                    if lod {
                        spirv::Op::ImageQuerySizeLod
                    } else {
                        spirv::Op::ImageQuerySize
                    },
                    extended_size_type_id,
                    id_extended,
                    image_id,
                );
                if lod {
                    inst.add_operand(self.get_index_constant(0));
                }
                block.body.push(inst);

                let extract_id = self.gen_id();
                block.body.push(Instruction::composite_extract(
                    result_type_id,
                    extract_id,
                    id_extended,
                    &[vec_size as u32 - 1],
                ));

                extract_id
            }
            Iq::NumSamples => {
                let query_id = self.gen_id();
                block.body.push(Instruction::image_query(
                    spirv::Op::ImageQuerySamples,
                    result_type_id,
                    query_id,
                    image_id,
                ));

                query_id
            }
            Iq::Lod { .. } => return Err(Error::Validation("level of detail query")),
        };

        Ok(id)
    }

    fn write_image_query_lod(
        &mut self,
        result_type_id: Word,
        image: Handle<crate::Expression>,
        sampler: Option<Handle<crate::Expression>>,
        coordinate: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.writer
            .require_any("image queries", &[spirv::Capability::ImageQuery])?;
        let handle_id = self.get_non_uniform_handle_id(image, block)?;
        let sampled_image_id = match sampler {
            Some(sampler) => {
                let (dim, arrayed, class) =
                    match *self.fun_info[image].ty.inner_with(&self.ir_module.types) {
                        crate::TypeInner::Image {
                            dim,
                            arrayed,
                            class,
                        } => (dim, arrayed, class),
                        _ => return Err(Error::Validation("image type")),
                    };
                let image_type_id = self.get_localtype_id(LocalType::Image(
                    LocalImageType::from_inner(dim, arrayed, class)?,
                ));
                let sampled_image_type_id =
                    self.get_localtype_id(LocalType::SampledImage { image_type_id });
                self.writer.debug_sampled_image(dim, arrayed, class);
                let sampler_id = self.get_non_uniform_handle_id(sampler, block)?;
                let id = self.gen_id();
                block.body.push(Instruction::sampled_image(
                    sampled_image_type_id,
                    id,
                    handle_id,
                    sampler_id,
                ));
                id
            }
            None => handle_id,
        };
        let coordinate_id = self.cached.get(coordinate)?;
        let id = self.gen_id();
        let mut instruction = Instruction::image_query(
            spirv::Op::ImageQueryLod,
            result_type_id,
            id,
            sampled_image_id,
        );
        instruction.add_operand(coordinate_id);
        block.body.push(instruction);
        Ok(id)
    }

    fn require_storage_image_lod(&mut self) -> Result<(), Error> {
        self.writer
            .use_extension("SPV_AMD_shader_image_load_store_lod");
        self.writer.require_any(
            "storage image access with a level of detail",
            &[spirv::Capability::ImageReadWriteLodAMD],
        )
    }

    #[expect(
        clippy::too_many_arguments,
        reason = "the arguments are the parts of one request"
    )]
    pub(super) fn write_image_store(
        &mut self,
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        array_index: Option<Handle<crate::Expression>>,
        sample: Option<Handle<crate::Expression>>,
        level: Option<Handle<crate::Expression>>,
        value: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        let image_id = self.get_non_uniform_handle_id(image, block)?;
        let coordinates = self.write_image_coordinates(coordinate, array_index, block)?;
        let value_id = self.cached.get(value)?;
        let sample_id = sample.map(|expr| self.cached.get(expr)).transpose()?;
        let level_id = level.map(|expr| self.cached.get(expr)).transpose()?;
        if level_id.is_some() {
            self.require_storage_image_lod()?;
        }

        let memory = self.texel_memory(image, true);
        let write = Store {
            image_id,
            value_id,
            memory,
        };

        match *self.fun_info[image].ty.inner_with(&self.ir_module.types) {
            crate::TypeInner::Image {
                class:
                    crate::ImageClass::Storage {
                        format: crate::StorageFormat::Bgra8Unorm,
                        ..
                    },
                ..
            } => self.writer.require_any(
                "Bgra8Unorm storage write",
                &[spirv::Capability::StorageImageWriteWithoutFormat],
            )?,
            crate::TypeInner::Image {
                class:
                    crate::ImageClass::Storage {
                        format: crate::StorageFormat::Unknown(_),
                        ..
                    },
                ..
            } => self.writer.require_any(
                "storage image write without a format",
                &[spirv::Capability::StorageImageWriteWithoutFormat],
            )?,
            _ => {}
        }

        write.generate(
            &mut self.writer.id_gen,
            coordinates,
            level_id,
            sample_id,
            block,
        );

        Ok(())
    }

    #[expect(
        clippy::too_many_arguments,
        reason = "the arguments are the parts of one request"
    )]
    pub(super) fn write_image_footprint(
        &mut self,
        result_type_id: Word,
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        granularity: Handle<crate::Expression>,
        coarse: Handle<crate::Expression>,
        level: crate::SampleLevel,
        min_lod: Option<Handle<crate::Expression>>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.writer.use_extension("SPV_NV_shader_image_footprint");
        self.writer
            .require_any("texture footprints", &[spirv::Capability::ImageFootprintNV])?;
        let image_id = self.get_handle_id(image)?;
        let id = self.gen_id();
        let mut instruction = Instruction::new(spirv::Op::ImageSampleFootprintNV);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(image_id);
        instruction.add_operand(self.cached.get(coordinate)?);
        instruction.add_operand(self.cached.get(granularity)?);
        instruction.add_operand(self.cached.get(coarse)?);
        let mut mask = spirv::ImageOperands::empty();
        let mut operands = alloc::vec::Vec::new();
        match level {
            crate::SampleLevel::Auto | crate::SampleLevel::Zero => {}
            crate::SampleLevel::Bias(bias) => {
                mask |= spirv::ImageOperands::BIAS;
                operands.push(self.cached.get(bias)?);
            }
            crate::SampleLevel::Exact(lod) => {
                mask |= spirv::ImageOperands::LOD;
                operands.push(self.cached.get(lod)?);
            }
            crate::SampleLevel::Gradient { x, y } => {
                mask |= spirv::ImageOperands::GRAD;
                operands.push(self.cached.get(x)?);
                operands.push(self.cached.get(y)?);
            }
        }
        if let Some(min_lod) = min_lod {
            self.writer
                .require_any("minimum level of detail", &[spirv::Capability::MinLod])?;
            mask |= spirv::ImageOperands::MIN_LOD;
            operands.push(self.cached.get(min_lod)?);
        }
        if !mask.is_empty() {
            instruction.add_operand(mask.bits());
            for operand in operands {
                instruction.add_operand(operand);
            }
        }
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_attachment_read(
        &mut self,
        aspect: crate::AttachmentAspect,
        sample: Option<Handle<crate::Expression>>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let (op, capability, image) = match aspect {
            crate::AttachmentAspect::Color(image) => (
                spirv::Op::ColorAttachmentReadEXT,
                spirv::Capability::TileImageColorReadAccessEXT,
                Some(image),
            ),
            crate::AttachmentAspect::Depth => (
                spirv::Op::DepthAttachmentReadEXT,
                spirv::Capability::TileImageDepthReadAccessEXT,
                None,
            ),
            crate::AttachmentAspect::Stencil => (
                spirv::Op::StencilAttachmentReadEXT,
                spirv::Capability::TileImageStencilReadAccessEXT,
                None,
            ),
        };
        self.writer.use_extension("SPV_EXT_shader_tile_image");
        self.writer.require_any("tile image reads", &[capability])?;
        let id = self.gen_id();
        let mut instruction = Instruction::new(op);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        if let Some(image) = image {
            instruction.add_operand(self.get_handle_id(image)?);
        }
        if let Some(sample) = sample {
            instruction.add_operand(self.cached.get(sample)?);
        }
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_image_atomic(
        &mut self,
        image: Handle<crate::Expression>,
        coordinate: Handle<crate::Expression>,
        array_index: Option<Handle<crate::Expression>>,
        fun: crate::AtomicFunction,
        value: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        let image_id = match self.ir_function.originating_global(image) {
            Some(handle) => self.writer.global_variables[handle].var_id,
            _ => return Err(Error::Validation("Unexpected image type")),
        };
        let crate::TypeInner::Image { class, .. } =
            *self.fun_info[image].ty.inner_with(&self.ir_module.types)
        else {
            return Err(Error::Validation("Invalid image type"));
        };
        let crate::ImageClass::Storage { format, .. } = class else {
            return Err(Error::Validation("Invalid image class"));
        };
        let scalar = format.into();
        let scalar_type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
        let pointer_type_id = self.get_pointer_type_id(scalar_type_id, spirv::StorageClass::Image);
        let signed = scalar.kind == crate::ScalarKind::Sint;
        if scalar.width == 8 {
            self.writer
                .require_any("64 bit image atomics", &[spirv::Capability::Int64Atomics])?;
        }
        let pointer_id = self.gen_id();
        let coordinates = self.write_image_coordinates(coordinate, array_index, block)?;
        let sample_id = self.writer.get_constant_scalar(crate::Literal::U32(0));
        block.body.push(Instruction::image_texel_pointer(
            pointer_type_id,
            pointer_id,
            image_id,
            coordinates,
            sample_id,
        ));

        let op = match fun {
            crate::AtomicFunction::Add => spirv::Op::AtomicIAdd,
            crate::AtomicFunction::Subtract => spirv::Op::AtomicISub,
            crate::AtomicFunction::And => spirv::Op::AtomicAnd,
            crate::AtomicFunction::ExclusiveOr => spirv::Op::AtomicXor,
            crate::AtomicFunction::InclusiveOr => spirv::Op::AtomicOr,
            crate::AtomicFunction::Min if signed => spirv::Op::AtomicSMin,
            crate::AtomicFunction::Min => spirv::Op::AtomicUMin,
            crate::AtomicFunction::Max if signed => spirv::Op::AtomicSMax,
            crate::AtomicFunction::Max => spirv::Op::AtomicUMax,
            crate::AtomicFunction::Exchange { .. } => {
                return Err(Error::Validation("Exchange atomics are not supported yet"))
            }
        };
        let result_type_id = self.get_expression_type_id(&self.fun_info[value].ty)?;
        let id = self.gen_id();
        let space = crate::AddressSpace::Handle;
        let (semantics, scope) = space.to_spirv_semantics_and_scope();
        let scope_constant_id = self.get_scope_constant(scope as u32);
        let semantics_id = self.get_index_constant(semantics.bits());
        let value_id = self.cached.get(value)?;

        block.body.push(Instruction::image_atomic(
            op,
            result_type_id,
            id,
            pointer_id,
            scope_constant_id,
            semantics_id,
            value_id,
        ));

        Ok(())
    }
}

const fn sparse_opcode(op: u32) -> Result<spirv::Op, Error> {
    use spirv::Op;
    Ok(match op {
        op if op == Op::ImageSampleImplicitLod as u32 => Op::ImageSparseSampleImplicitLod,
        op if op == Op::ImageSampleExplicitLod as u32 => Op::ImageSparseSampleExplicitLod,
        op if op == Op::ImageSampleDrefImplicitLod as u32 => Op::ImageSparseSampleDrefImplicitLod,
        op if op == Op::ImageSampleDrefExplicitLod as u32 => Op::ImageSparseSampleDrefExplicitLod,
        op if op == Op::ImageGather as u32 => Op::ImageSparseGather,
        op if op == Op::ImageDrefGather as u32 => Op::ImageSparseDrefGather,
        _ => return Err(Error::FeatureNotImplemented("this sparse image operation")),
    })
}
