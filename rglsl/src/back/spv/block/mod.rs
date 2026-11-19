mod access;
mod control;
mod math;
mod ops;
mod statement;

use spirv::Word;

use super::{Block, BlockContext, Error, Instruction, LookupType};
use crate::arena::Handle;

#[derive(Copy, Clone)]
pub(super) enum AccessTypeAdjustment {
    None,
    IntroducePointer(spirv::StorageClass),
}

impl BlockContext<'_> {
    pub(super) fn is_half(&self, expression: Handle<crate::Expression>) -> bool {
        self.fun_info[expression]
            .ty
            .inner_with(&self.ir_module.types)
            .scalar()
            == Some(crate::Scalar::F16)
    }

    pub(super) fn cache_expression_value(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        self.write_expression_value(expr_handle, block)?;
        if self
            .non_uniform(expr_handle)
            .contains(crate::NonUniform::VALUE)
            && self.produces_instruction(expr_handle)
        {
            let id = self.cached.ids[expr_handle];
            if id != 0 {
                self.writer.decorate_non_uniform(id)?;
            }
        }
        let precision = self
            .ir_function
            .precision
            .get(&expr_handle)
            .copied()
            .unwrap_or_default();
        if !precision.is_empty() && self.produces_instruction(expr_handle) {
            let id = self.cached.ids[expr_handle];
            if id != 0 {
                self.writer.decorate_precision(id, precision);
            }
        }
        Ok(())
    }

    #[inline(never)]
    fn write_compose(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        ty: Handle<crate::Type>,
        components: &[Handle<crate::Expression>],
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.temp_list.clear();
        let id = if self.expression_constness.is_const(expr_handle) {
            for component in crate::proc::flatten_compose(
                ty,
                components,
                &self.ir_function.expressions,
                &self.ir_module.types,
            ) {
                self.temp_list.push(self.cached.get(component)?);
            }
            self.writer
                .get_constant_composite(LookupType::Handle(ty), &self.temp_list)?
        } else if self.expression_constness.is_specialized(expr_handle) {
            for component in crate::proc::flatten_compose(
                ty,
                components,
                &self.ir_function.expressions,
                &self.ir_module.types,
            ) {
                self.temp_list.push(self.cached.get(component)?);
            }
            let type_id = self.writer.get_handle_type_id(ty)?;
            self.writer
                .get_spec_constant_composite(type_id, &self.temp_list)
        } else {
            for &component in components {
                self.temp_list.push(self.cached.get(component)?);
            }

            let id = self.gen_id();
            match self
                .writer
                .replicated_constituent(result_type_id, &self.temp_list)
            {
                Some(value) => {
                    let mut instruction =
                        Instruction::new(spirv::Op::CompositeConstructReplicateEXT);
                    instruction.set_type(result_type_id);
                    instruction.set_result(id);
                    instruction.add_operand(value);
                    block.body.push(instruction);
                }
                None => block.body.push(Instruction::composite_construct(
                    result_type_id,
                    id,
                    &self.temp_list,
                )),
            }
            id
        };
        Ok(id)
    }

    fn write_splat(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        size: crate::VectorSize,
        value: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let value_id = self.cached.get(value)?;
        let components = &[value_id; 4][..size as usize];

        if self.expression_constness.is_const(expr_handle) {
            let ty = self
                .writer
                .get_expression_lookup_type(&self.fun_info[expr_handle].ty)?;
            self.writer.get_constant_composite(ty, components)
        } else if self.expression_constness.is_specialized(expr_handle) {
            Ok(self
                .writer
                .get_spec_constant_composite(result_type_id, components))
        } else {
            let id = self.gen_id();
            block.body.push(Instruction::composite_construct(
                result_type_id,
                id,
                components,
            ));
            Ok(id)
        }
    }

    fn write_physical_pointer_expr(
        &mut self,
        value: Handle<crate::Expression>,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        if matches!(
            self.ir_function.expressions[value],
            crate::Expression::Access { .. } | crate::Expression::AccessIndex { .. }
        ) {
            let pointer_id = self.write_access_chain(value, block, AccessTypeAdjustment::None)?;
            self.cached.set(value, pointer_id)?;
        }
        self.write_physical_pointer(value, result_type_id, block)
    }

    fn write_expression_value(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        let is_named_expression = self
            .ir_function
            .named_expressions
            .contains_key(&expr_handle);

        if self.fun_info[expr_handle].ref_count == 0 && !is_named_expression {
            return Ok(());
        }

        if let Some(id) = self.returned_array_element(expr_handle, block)? {
            return self.cached.set(expr_handle, id);
        }
        let result_type_id = self.get_expression_type_id(&self.fun_info[expr_handle].ty)?;
        let id = match self.ir_function.expressions[expr_handle] {
            crate::Expression::Literal(literal) => self.writer.get_constant_scalar(literal),
            crate::Expression::Constant(handle) => {
                let init = self.ir_module.constants[handle].init;
                self.writer.constant_ids[init]
            }
            crate::Expression::Override(handle) => self.writer.written_override_id(handle)?,
            crate::Expression::ZeroValue(_) => self.writer.get_constant_null(result_type_id),
            crate::Expression::Undef(ty) => self.writer.get_undefined(ty, result_type_id),
            crate::Expression::Compose { ty, ref components } => {
                self.write_compose(expr_handle, ty, components, result_type_id, block)?
            }
            crate::Expression::Splat { size, value } => {
                self.write_splat(expr_handle, size, value, result_type_id, block)?
            }
            crate::Expression::Access { base, index } => {
                self.write_access(expr_handle, base, index, result_type_id, block)?
            }
            crate::Expression::AccessIndex { base, index } => {
                self.write_access_index(expr_handle, base, index, result_type_id, block)?
            }
            crate::Expression::GlobalVariable(handle) => {
                self.writer.global_variables[handle].access_id
            }
            crate::Expression::Swizzle {
                size,
                vector,
                pattern,
            } => self.write_swizzle(size, vector, pattern, result_type_id, block)?,
            crate::Expression::Unary { op, expr } => {
                self.write_unary(op, expr, result_type_id, block)?
            }
            crate::Expression::Binary { op, left, right } => {
                self.write_binary(expr_handle, op, left, right, result_type_id, block)?
            }
            crate::Expression::Math {
                fun,
                arg,
                arg1,
                arg2,
                arg3,
            } => self.write_math(fun, arg, [arg1, arg2, arg3], result_type_id, block)?,
            crate::Expression::LocalVariable(variable) => self.function.variables[&variable].id,
            crate::Expression::Load { pointer } => {
                self.physical_component_load = self.loaded_by_swizzle(expr_handle);
                let id = self.write_checked_load(
                    pointer,
                    block,
                    AccessTypeAdjustment::None,
                    result_type_id,
                )?;
                self.physical_component_load = false;
                id
            }
            crate::Expression::FunctionArgument(index) => self.function.parameter_id(index)?,
            crate::Expression::CallResult(_)
            | crate::Expression::AtomicResult { .. }
            | crate::Expression::RayQueryProceedResult
            | crate::Expression::ReportIntersectionResult
            | crate::Expression::SubgroupBallotResult
            | crate::Expression::SubgroupOperationResult { .. }
            | crate::Expression::SpirvInstructionResult { .. }
            | crate::Expression::CooperativeMatrixResult { .. } => self.cached.get(expr_handle)?,
            crate::Expression::InterpolateAt { pointer, location } => {
                self.write_interpolate_at(expr_handle, pointer, location, result_type_id, block)?
            }
            crate::Expression::ImageFootprint {
                image,
                coordinate,
                granularity,
                coarse,
                level,
                min_lod,
                ty: _,
            } => self.write_image_footprint(
                result_type_id,
                super::image::ImageFootprintParams {
                    image,
                    coordinate,
                    granularity,
                    coarse,
                    level,
                    min_lod,
                },
                block,
            )?,
            crate::Expression::FragmentFetch {
                image,
                coordinate,
                fragment,
            } => self.write_fragment_fetch(image, coordinate, fragment, result_type_id, block)?,
            crate::Expression::AttachmentRead { aspect, sample } => {
                self.write_attachment_read(aspect, sample, result_type_id, block)?
            }
            crate::Expression::ReadClock { source, .. } => {
                self.write_read_clock(source, result_type_id, block)?
            }
            crate::Expression::IsHelperInvocation => {
                self.write_is_helper_invocation(result_type_id, block)?
            }
            crate::Expression::As {
                expr,
                kind,
                convert,
            } => self.write_as_expression(expr, convert, kind, block, result_type_id)?,
            crate::Expression::ImageLoad {
                image,
                coordinate,
                array_index,
                sample,
                level,
                sparse,
            } => self.write_image_load(
                result_type_id,
                crate::Texel {
                    image,
                    coordinate,
                    array_index,
                    sample,
                },
                level,
                sparse.is_some(),
                block,
            )?,
            crate::Expression::ImageSample {
                image,
                sampler,
                gather,
                gather_pattern,
                coordinate,
                array_index,
                offset,
                level,
                depth_ref,
                min_lod,
                sparse,
            } => self.write_image_sample(
                expr_handle,
                result_type_id,
                super::image::ImageSampleParams {
                    image,
                    sampler,
                    gather: gather.map(|component| (component, gather_pattern)),
                    coordinate,
                    array_index,
                    offset,
                    level,
                    depth_ref,
                    min_lod,
                    sparse: sparse.is_some(),
                },
                block,
            )?,
            crate::Expression::ImageSparseResident { code } => {
                self.write_image_sparse_resident(code, result_type_id, block)?
            }
            crate::Expression::Select {
                condition,
                accept,
                reject,
            } => self.write_select(condition, accept, reject, result_type_id, block)?,
            crate::Expression::Derivative { axis, ctrl, expr } => {
                self.write_derivative(axis, ctrl, expr, result_type_id, block)?
            }
            crate::Expression::ImageQuery { image, query } => {
                self.write_image_query(result_type_id, image, query, block)?
            }
            crate::Expression::Relational { fun, argument } => {
                self.write_relational(fun, argument, result_type_id, block)?
            }
            crate::Expression::ArrayLength(expr) => self.write_runtime_array_length(expr, block)?,
            crate::Expression::WideArrayLength(expr) => {
                self.write_typed_array_length(expr, result_type_id, block)?
            }
            crate::Expression::PhysicalPointer { value, ty: _ } => {
                self.write_physical_pointer_expr(value, result_type_id, block)?
            }
            crate::Expression::PhysicalAddress { pointer, split } => {
                self.write_physical_address(pointer, split, result_type_id, block)?
            }
            crate::Expression::BufferPointer { descriptor } => {
                self.write_buffer_pointer(descriptor, result_type_id, block)?
            }
            crate::Expression::HeapOffset { .. } => 0,
            crate::Expression::RayQueryGet { query, value } => {
                self.write_ray_query_get(query, value, result_type_id, block)?
            }
            crate::Expression::HitObjectGet { object, value } => {
                self.write_hit_object_get(object, value, result_type_id, block)?
            }
            crate::Expression::FetchMicroTriangleVertex {
                acceleration_structure,
                instance_id,
                geometry_index,
                primitive_index,
                barycentric,
                value,
            } => self.write_fetch_micro_triangle_vertex(
                super::ray::hit_object::MicroTriangleVertexQuery {
                    acceleration_structure,
                    instance_id,
                    geometry_index,
                    primitive_index,
                    barycentric,
                },
                value,
                result_type_id,
                block,
            )?,
            crate::Expression::AccelerationStructureFromAddress { address } => {
                self.write_acceleration_structure_from_address(address, result_type_id, block)?
            }
            crate::Expression::CooperativeLoad { ty, ref data } => {
                self.write_cooperative_load(ty, data, result_type_id, block)?
            }
            crate::Expression::CooperativeMultiplyAdd {
                a,
                b,
                c,
                saturating,
            } => self.write_cooperative_mul_add(
                expr_handle,
                [a, b, c],
                saturating,
                result_type_id,
                block,
            )?,
            crate::Expression::CooperativeMatrixLength { ty } => {
                self.write_cooperative_length(ty, result_type_id, block)?
            }
            crate::Expression::Replicate { ty, value } => {
                self.write_replicate(expr_handle, ty, value, result_type_id, block)?
            }
            crate::Expression::Expect { value, expected } => {
                self.write_expect(value, expected, result_type_id, block)?
            }
            crate::Expression::CooperativeVectorLoad {
                pointer, offset, ..
            } => self.write_cooperative_vector_load(pointer, offset, result_type_id, block)?,
            crate::Expression::Convert {
                expr,
                ty,
                saturating,
                flavor,
            } => self.write_convert(expr, ty, (saturating, flavor), result_type_id, block)?,
            crate::Expression::ImageProcessing {
                operation,
                image,
                sampler,
                coordinate,
                reference,
                reference_sampler,
                reference_coordinate,
                size,
            } => self.write_image_processing(
                result_type_id,
                super::qcom::ImageProcessingOperands {
                    operation,
                    image,
                    sampler,
                    coordinate,
                    reference,
                    reference_sampler,
                    reference_coordinate,
                    size,
                },
                block,
            )?,
            crate::Expression::ArrayConversion {
                conversion,
                expr,
                index,
                ty: _,
            } => self.write_array_conversion(result_type_id, conversion, expr, index, block)?,
            crate::Expression::Bitcast {
                expr,
                ty: _,
                offset,
            } => self.write_bitcast(result_type_id, expr, offset, block)?,
            crate::Expression::TensorCreate { ty } => {
                self.write_tensor_create(ty, result_type_id, block)?
            }
            crate::Expression::TensorSet {
                base,
                operation,
                ref operands,
            } => self.write_tensor_set(base, operation, operands, result_type_id, block)?,
            crate::Expression::CooperativeVectorMatMul { ref operation, .. } => self
                .write_cooperative_vector_mat_mul(expr_handle, operation, result_type_id, block)?,
            crate::Expression::TensorRead {
                tensor,
                coordinates,
                nontemporal,
                out_of_bounds,
                ..
            } => self.write_tensor_read(
                tensor,
                coordinates,
                (nontemporal, out_of_bounds),
                result_type_id,
                block,
            )?,
            crate::Expression::TensorQuerySize { tensor, dimension } => {
                self.write_tensor_query_size(tensor, dimension, result_type_id, block)?
            }
        };

        self.cached.set(expr_handle, id)?;
        Ok(())
    }

    pub(super) fn non_uniform(&self, expr_handle: Handle<crate::Expression>) -> crate::NonUniform {
        self.ir_function
            .non_uniform
            .get(&expr_handle)
            .copied()
            .unwrap_or_default()
    }

    fn produces_instruction(&self, expr_handle: Handle<crate::Expression>) -> bool {
        !matches!(
            self.ir_function.expressions[expr_handle],
            crate::Expression::Literal(_)
                | crate::Expression::Constant(_)
                | crate::Expression::Override(_)
                | crate::Expression::ZeroValue(_)
                | crate::Expression::Undef(_)
                | crate::Expression::GlobalVariable(_)
                | crate::Expression::LocalVariable(_)
                | crate::Expression::FunctionArgument(_)
        ) && !self.expression_constness.is_const(expr_handle)
            && !self.expression_constness.is_specialized(expr_handle)
    }
}
