use alloc::vec::Vec;

use spirv::Word;

use super::super::{
    Block, BlockContext, Error, Instruction, NumericType, ResultMember, Writer, WriterFlags,
    feature,
};
use super::AccessTypeAdjustment;
use super::control::{LoopContext, Nested};
use crate::{Statement, arena::Handle};

const fn atomic_integer_op(kind: crate::ScalarKind, op: spirv::Op) -> Result<spirv::Op, Error> {
    match kind {
        crate::ScalarKind::Sint | crate::ScalarKind::Uint => Ok(op),
        _ => Err(Error::Validation(
            "atomic operation on an unsupported scalar type",
        )),
    }
}

struct AtomicIds {
    id: Word,
    result_type_id: Word,
    pointer_id: Word,
    scope_constant_id: Word,
    semantics_id: Word,
    unequal_semantics_id: Word,
    value_id: Word,
}

impl Writer {
    fn write_epilogue_position_y_flip(
        &mut self,
        position_id: Word,
        body: &mut Vec<Instruction>,
    ) -> Result<(), Error> {
        let float_ptr_type_id = self.get_f32_pointer_type_id(spirv::StorageClass::Output);
        let index_y_id = self.get_index_constant(1);
        let access_id = self.id_gen.next();
        body.push(Instruction::access_chain(
            float_ptr_type_id,
            access_id,
            position_id,
            &[index_y_id],
        ));

        let float_type_id = self.get_f32_type_id();
        let load_id = self.id_gen.next();
        body.push(Instruction::load(float_type_id, load_id, access_id, None));

        let neg_id = self.id_gen.next();
        body.push(Instruction::unary(
            spirv::Op::FNegate,
            float_type_id,
            neg_id,
            load_id,
        ));

        body.push(Instruction::store(access_id, neg_id, None));
        Ok(())
    }

    fn write_epilogue_frag_depth_clamp(
        &mut self,
        frag_depth_id: Word,
        body: &mut Vec<Instruction>,
    ) -> Result<(), Error> {
        let float_type_id = self.get_f32_type_id();
        let zero_scalar_id = self.get_constant_scalar(crate::Literal::F32(0.0));
        let one_scalar_id = self.get_constant_scalar(crate::Literal::F32(1.0));

        let original_id = self.id_gen.next();
        body.push(Instruction::load(
            float_type_id,
            original_id,
            frag_depth_id,
            None,
        ));

        let clamp_id = self.id_gen.next();
        body.push(Instruction::ext_inst_gl_op(
            self.gl450_ext_inst_id,
            spirv::GlslStd450Op::FClamp,
            float_type_id,
            clamp_id,
            &[original_id, zero_scalar_id, one_scalar_id],
        ));

        body.push(Instruction::store(frag_depth_id, clamp_id, None));
        Ok(())
    }

    fn write_entry_point_return(
        &mut self,
        value_id: Word,
        ir_result: &crate::FunctionResult,
        result_members: &[ResultMember],
        body: &mut Vec<Instruction>,
    ) -> Result<Instruction, Error> {
        for (index, res_member) in result_members.iter().enumerate() {
            if res_member.built_in == Some(crate::BuiltIn::MeshTaskSize) {
                return Ok(Instruction::return_value(value_id));
            }
            let member_value_id = match ir_result.binding {
                Some(_) => value_id,
                None => {
                    let member_value_id = self.id_gen.next();
                    body.push(Instruction::composite_extract(
                        res_member.type_id,
                        member_value_id,
                        value_id,
                        &[index as u32],
                    ));
                    member_value_id
                }
            };

            body.push(Instruction::store(res_member.id, member_value_id, None));

            if let Some(built_in) = res_member.built_in {
                if matches!(built_in, crate::BuiltIn::Position { .. })
                    && self.flags.contains(WriterFlags::ADJUST_COORDINATE_SPACE)
                {
                    self.write_epilogue_position_y_flip(res_member.id, body)?;
                } else if built_in == crate::BuiltIn::FragDepth
                    && self.flags.contains(WriterFlags::CLAMP_FRAG_DEPTH)
                {
                    self.write_epilogue_frag_depth_clamp(res_member.id, body)?;
                }
            }
        }
        Ok(Instruction::return_void())
    }
}

impl BlockContext<'_> {
    pub(super) fn write_statement<'a>(
        &mut self,
        block: Block,
        statement: &'a Statement,
        loop_context: LoopContext,
    ) -> Result<Nested<'a>, Error> {
        let mut block = block;
        match *statement {
            Statement::Block(ref block_statements) => {
                return Ok(self.write_scope(block, block_statements, loop_context, statement));
            }
            Statement::If {
                condition,
                ref accept,
                ref reject,
                control,
            } => {
                return self.write_if(
                    block,
                    condition,
                    [accept, reject],
                    control,
                    loop_context,
                    statement,
                );
            }
            Statement::Switch {
                selector,
                ref cases,
                control,
            } => {
                return self.write_switch(block, selector, cases, control, loop_context, statement);
            }
            Statement::Loop {
                ref body,
                ref continuing,
                break_if,
                control,
            } => {
                return Ok(self.write_loop(
                    block,
                    (
                        body,
                        self.reachability
                            .continuing_reachable(statement)
                            .then_some(continuing),
                    ),
                    break_if,
                    control,
                    statement,
                ));
            }
            Statement::Emit(ref range) => {
                for handle in range.clone() {
                    if !self.expression_constness.is_constant_instruction(handle) {
                        let span = self.ir_function.expressions.get_span(handle);
                        self.writer.debug_mark(&mut block, span);
                        self.cache_expression_value(handle, &mut block)?;
                    }
                }
            }
            Statement::Break => {
                let Some(break_id) = loop_context.break_id else {
                    return Err(Error::Validation("break outside of a loop or switch"));
                };
                self.function.consume(block, Instruction::branch(break_id));
                return Ok(Nested::Done(None));
            }
            Statement::Continue => {
                let Some(continuing_id) = loop_context.continuing_id else {
                    return Err(Error::Validation("continue outside of a loop"));
                };
                self.function
                    .consume(block, Instruction::branch(continuing_id));
                return Ok(Nested::Done(None));
            }
            Statement::Return { value: Some(value) } => {
                self.write_return_value(block, value)?;
                return Ok(Nested::Done(None));
            }
            Statement::Return { value: None } => {
                self.function.consume(block, Instruction::return_void());
                return Ok(Nested::Done(None));
            }
            Statement::Kill => {
                self.function.consume(block, Instruction::kill());
                return Ok(Nested::Done(None));
            }
            Statement::TerminateInvocation => {
                self.writer.require(&feature::TERMINATE_INVOCATION)?;
                self.function
                    .consume(block, Instruction::terminate_invocation());
                return Ok(Nested::Done(None));
            }
            Statement::Demote => {
                self.writer.require(&feature::DEMOTE_TO_HELPER_INVOCATION)?;
                block.body.push(Instruction::demote_to_helper_invocation());
            }
            Statement::BeginInvocationInterlock => {
                block.body.push(Instruction::invocation_interlock(true));
            }
            Statement::EndInvocationInterlock => {
                block.body.push(Instruction::invocation_interlock(false));
            }
            Statement::SplitBarrier {
                phase,
                execution,
                memory,
                semantics,
            } => {
                self.writer
                    .write_split_barrier(phase, execution, memory, semantics, &mut block)?;
            }
            Statement::EmitVertex { stream } => {
                self.write_primitive_operation(&mut block, true, stream)?;
            }
            Statement::EndPrimitive { stream } => {
                self.write_primitive_operation(&mut block, false, stream)?;
            }
            Statement::DebugPrintf {
                ref format,
                ref arguments,
            } => self.write_debug_printf_statement(&mut block, format, arguments)?,
            Statement::Assume { condition } => self.write_assume(condition, &mut block)?,
            Statement::SpirvInstruction {
                ref instruction,
                ref operands,
                result,
            } => self.write_spirv_instruction(&mut block, instruction, operands, result)?,
            Statement::CooperativeMatrix {
                ref function,
                result,
            } => {
                self.write_cooperative_matrix_function(function, result, &mut block)?;
            }
            Statement::CooperativeVector(ref function) => {
                self.write_cooperative_vector_function(function, &mut block)?;
            }
            Statement::MeshFunction(ref function) => {
                match self.write_mesh_function(block, function)? {
                    Some(next) => block = next,
                    None => return Ok(Nested::Done(None)),
                }
            }
            Statement::Abort {
                ref message,
                ty,
                ref arguments,
            } => {
                self.write_abort(block, message, ty, arguments)?;
                return Ok(Nested::Done(None));
            }
            Statement::ControlBarrier(flags) => {
                self.writer.write_control_barrier(flags, &mut block.body);
            }
            Statement::MemoryBarrier(flags) => {
                self.writer.write_memory_barrier(flags, &mut block);
            }
            Statement::Store { pointer, value } => {
                self.write_store(pointer, value, &mut block)?;
            }
            Statement::ImageStore {
                image,
                coordinate,
                array_index,
                sample,
                level,
                value,
            } => self.write_image_store(
                crate::Texel {
                    image,
                    coordinate,
                    array_index,
                    sample,
                },
                level,
                value,
                &mut block,
            )?,
            Statement::TensorWrite {
                tensor,
                coordinates,
                value,
                nontemporal,
            } => self.write_tensor_write(tensor, coordinates, value, nontemporal, &mut block)?,
            Statement::Call {
                function: local_function,
                ref arguments,
                result,
            } => {
                self.write_call(local_function, arguments, result, &mut block)?;
            }
            Statement::Atomic {
                pointer,
                fun,
                value,
                result,
                order,
            } => {
                self.write_atomic_statement(pointer, fun, value, result, order, &mut block)?;
            }
            Statement::ImageAtomic {
                image,
                coordinate,
                array_index,
                fun,
                value,
                sample,
                result,
                order,
            } => match order {
                Some(order) => {
                    let texel = crate::Texel {
                        image,
                        coordinate,
                        array_index,
                        sample,
                    };
                    self.write_ordered_image_atomic(&texel, fun, value, result, order, &mut block)?;
                }
                None => {
                    self.write_image_atomic(
                        image,
                        coordinate,
                        array_index,
                        fun,
                        value,
                        &mut block,
                    )?;
                }
            },
            Statement::AtomicLoad {
                ref location,
                order,
                result,
            } => {
                self.write_atomic_load(location, order, result, &mut block)?;
            }
            Statement::AtomicStore {
                ref location,
                value,
                order,
            } => {
                self.write_atomic_store(location, value, order, &mut block)?;
            }
            Statement::ScopedBarrier {
                execution,
                memory,
                semantics,
            } => {
                self.writer
                    .write_scoped_barrier(execution, memory, semantics, &mut block);
            }
            Statement::RayQuery { query, ref fun } => {
                self.write_ray_query_function(query, fun, &mut block)?;
            }
            Statement::HitObject { object, ref fun } => {
                self.write_hit_object_function(object, fun, &mut block)?;
            }
            Statement::ReorderThread { flavor, hint, bits } => {
                self.write_reorder_thread(flavor, hint, bits, &mut block)?;
            }
            Statement::SubgroupBallot { result, predicate } => {
                self.write_subgroup_ballot(predicate, result, &mut block)?;
            }
            Statement::SubgroupCollectiveOperation {
                op,
                collective_op,
                argument,
                result,
            } => {
                self.write_subgroup_operation(op, collective_op, argument, result, &mut block)?;
            }
            Statement::SubgroupGather {
                ref mode,
                argument,
                result,
            } => {
                self.write_subgroup_gather(mode, argument, result, &mut block)?;
            }
            Statement::SubgroupFunction { ref fun, result } => {
                self.write_subgroup_function(fun, result, &mut block)?;
            }
            Statement::CooperativeStore { target, ref data } => {
                self.write_cooperative_store(target, data, &mut block)?;
            }
            Statement::RayPipelineFunction(ref fun) => {
                if let Some(terminator) =
                    self.write_ray_tracing_pipeline_function(fun, &mut block)?
                {
                    self.function.consume(block, terminator);
                    return Ok(Nested::Done(None));
                }
            }
        }
        Ok(Nested::Done(Some(block)))
    }

    fn write_return_value(
        &mut self,
        mut block: Block,
        value: Handle<crate::Expression>,
    ) -> Result<(), Error> {
        let value_id = match *self.fun_info[value].ty.inner_with(&self.ir_module.types) {
            crate::TypeInner::Tensor { .. } => self.get_handle_id(value)?,
            crate::TypeInner::BindingArray { .. } => {
                if matches!(
                    self.ir_function.expressions[value],
                    crate::Expression::GlobalVariable(_) | crate::Expression::FunctionArgument(_)
                ) {
                    let ty = self.fun_info[value].ty.clone();
                    let type_id = self.writer.get_expression_type_id(&ty)?;
                    let pointer_id = self.cached.get(value)?;
                    let id = self.gen_id();
                    block
                        .body
                        .push(Instruction::load(type_id, id, pointer_id, None));
                    id
                } else {
                    self.cached.get(value)?
                }
            }
            _ => self.cached.get(value)?,
        };
        let instruction = match self.function.entry_point_context {
            Some(ref context) => {
                let Some(ref result) = self.ir_function.result else {
                    return Err(Error::Validation(
                        "entry point returns a value but has no result",
                    ));
                };
                self.writer.write_entry_point_return(
                    value_id,
                    result,
                    &context.results,
                    &mut block.body,
                )?
            }
            None => Instruction::return_value(value_id),
        };
        self.function.consume(block, instruction);
        Ok(())
    }

    fn write_store(
        &mut self,
        pointer: Handle<crate::Expression>,
        value: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        let mut value_id = self.cached.get(value)?;
        if let Some(class) = self.pointer_class(pointer) {
            let value_type_id = self.get_expression_type_id(&self.fun_info[value].ty)?;
            let explicit = self.pointer_explicit_layout(pointer, class);
            if self
                .writer
                .needs_layout_conversion_explicit(value_type_id, explicit)
            {
                value_id = self
                    .writer
                    .convert_layout(block, value_type_id, value_id, true)?;
            }
        }
        let pointer_id = self.write_access_chain(pointer, block, AccessTypeAdjustment::None)?;
        let atomic_space = if let crate::TypeInner::Pointer { base, space } =
            *self.fun_info[pointer].ty.inner_with(&self.ir_module.types)
            && matches!(
                self.ir_module.types[base].inner,
                crate::TypeInner::Atomic(_)
            ) {
            Some(space)
        } else {
            None
        };
        let instruction = if let Some(space) = atomic_space {
            let (semantics, scope) = space.to_spirv_semantics_and_scope();
            let scope_constant_id = self.get_scope_constant(scope as u32);
            let semantics_id = self.get_index_constant(semantics.bits());
            Instruction::atomic_store(pointer_id, scope_constant_id, semantics_id, value_id)
        } else {
            let mut instruction = Instruction::store(pointer_id, value_id, None);
            let swizzled = matches!(
                self.ir_function.expressions[value],
                crate::Expression::Swizzle { .. }
            );
            for operand in self.memory_access(pointer, swizzled, true) {
                instruction.add_operand(operand);
            }
            instruction
        };
        block.body.push(instruction);
        Ok(())
    }

    fn write_call(
        &mut self,
        local_function: Handle<crate::Function>,
        arguments: &[Handle<crate::Expression>],
        result: Option<Handle<crate::Expression>>,
        block: &mut Block,
    ) -> Result<(), Error> {
        let id = self.gen_id();
        let mut argument_ids = Vec::with_capacity(arguments.len());
        for &argument in arguments {
            let argument_id = match self.ir_function.expressions[argument] {
                crate::Expression::Access { base, .. }
                | crate::Expression::AccessIndex { base, .. } => {
                    if matches!(
                        *self.fun_info[base].ty.inner_with(&self.ir_module.types),
                        crate::TypeInner::BindingArray { .. }
                    ) {
                        self.write_access_chain(
                            argument,
                            block,
                            AccessTypeAdjustment::IntroducePointer(
                                spirv::StorageClass::UniformConstant,
                            ),
                        )?
                    } else {
                        self.cached.get(argument)?
                    }
                }
                _ => self.cached.get(argument)?,
            };
            argument_ids.push(argument_id);
        }
        self.temp_list.clear();
        self.temp_list.extend(argument_ids);

        let type_id = match result {
            Some(expr) => {
                self.cached.set(expr, id)?;
                if self.non_uniform(expr).contains(crate::NonUniform::VALUE) {
                    self.writer.decorate_non_uniform(id)?;
                }
                if let Some(&precision) = self.ir_function.precision.get(&expr) {
                    self.writer.decorate_precision(id, precision);
                }
                self.get_expression_type_id(&self.fun_info[expr].ty)?
            }
            None => self.writer.void_type,
        };

        block.body.push(Instruction::function_call(
            type_id,
            id,
            self.writer.lookup_function[&local_function],
            &self.temp_list,
        ));
        Ok(())
    }

    fn write_atomic_statement(
        &mut self,
        pointer: Handle<crate::Expression>,
        fun: crate::AtomicFunction,
        value: Handle<crate::Expression>,
        result: Option<Handle<crate::Expression>>,
        order: Option<crate::MemoryOrder>,
        block: &mut Block,
    ) -> Result<(), Error> {
        let id = self.gen_id();
        let result_type_id =
            self.get_expression_type_id(&self.fun_info[result.unwrap_or(value)].ty)?;

        if let Some(result) = result {
            self.cached.set(result, id)?;
        }

        let pointer_id = self.write_access_chain(pointer, block, AccessTypeAdjustment::None)?;

        let space = self.fun_info[pointer]
            .ty
            .inner_with(&self.ir_module.types)
            .pointer_space()
            .ok_or(Error::Validation("atomic operand is not a pointer"))?;
        let default_semantics = self.glsl_atomic_semantics(pointer);
        let (scope_constant_id, semantics_id, unequal_semantics_id) = match order {
            Some(order) => {
                let ids = self.writer.write_memory_order(order);
                (ids.scope, ids.semantics, ids.unequal)
            }
            None => {
                let (semantics, scope) = match default_semantics {
                    Some(found) => found,
                    None => space.to_spirv_semantics_and_scope(),
                };
                if scope == spirv::Scope::Device {
                    self.writer.device_scope_used = true;
                }
                let semantics_id = self.get_index_constant(semantics.bits());
                (
                    self.get_scope_constant(scope as u32),
                    semantics_id,
                    semantics_id,
                )
            }
        };
        let value_id = self.cached.get(value)?;

        let (scalar, vector) = match *self.fun_info[value].ty.inner_with(&self.ir_module.types) {
            crate::TypeInner::Scalar(scalar) => (scalar, false),
            crate::TypeInner::Vector { scalar, .. } => {
                if scalar != crate::Scalar::F16 {
                    return Err(Error::FeatureNotImplemented(
                        "Atomics with non-scalar values",
                    ));
                }
                (scalar, true)
            }
            _ => {
                return Err(Error::FeatureNotImplemented(
                    "Atomics with non-scalar values",
                ));
            }
        };
        if vector {
            self.writer.require(&feature::ATOMIC_FLOAT16_VECTOR)?;
        }

        let ids = AtomicIds {
            id,
            result_type_id,
            pointer_id,
            scope_constant_id,
            semantics_id,
            unequal_semantics_id,
            value_id,
        };

        let instruction = self.write_atomic_op(fun, (scalar, vector), &ids, block)?;
        block.body.push(instruction);
        Ok(())
    }

    fn write_atomic_op(
        &mut self,
        fun: crate::AtomicFunction,
        (scalar, vector): (crate::Scalar, bool),
        ids: &AtomicIds,
        block: &mut Block,
    ) -> Result<Instruction, Error> {
        let AtomicIds {
            id,
            result_type_id,
            pointer_id,
            scope_constant_id,
            semantics_id,
            unequal_semantics_id: _,
            value_id,
        } = *ids;
        Ok(match fun {
            crate::AtomicFunction::Add => {
                let spirv_op = match scalar.kind {
                    crate::ScalarKind::Sint | crate::ScalarKind::Uint => spirv::Op::AtomicIAdd,
                    crate::ScalarKind::Float => self.writer.float_atomic(fun, scalar, vector)?,
                    _ => {
                        return Err(Error::Validation(
                            "atomic operation on an unsupported scalar type",
                        ));
                    }
                };
                Instruction::atomic_binary(
                    spirv_op,
                    result_type_id,
                    id,
                    pointer_id,
                    scope_constant_id,
                    semantics_id,
                    value_id,
                )
            }
            crate::AtomicFunction::Subtract => {
                let (spirv_op, value_id) = match scalar.kind {
                    crate::ScalarKind::Sint | crate::ScalarKind::Uint => {
                        (spirv::Op::AtomicISub, value_id)
                    }
                    crate::ScalarKind::Float => {
                        let neg_result_id = self.gen_id();
                        block.body.push(Instruction::unary(
                            spirv::Op::FNegate,
                            result_type_id,
                            neg_result_id,
                            value_id,
                        ));
                        (spirv::Op::AtomicFAddEXT, neg_result_id)
                    }
                    _ => {
                        return Err(Error::Validation(
                            "atomic operation on an unsupported scalar type",
                        ));
                    }
                };
                Instruction::atomic_binary(
                    spirv_op,
                    result_type_id,
                    id,
                    pointer_id,
                    scope_constant_id,
                    semantics_id,
                    value_id,
                )
            }
            crate::AtomicFunction::And => Instruction::atomic_binary(
                atomic_integer_op(scalar.kind, spirv::Op::AtomicAnd)?,
                result_type_id,
                id,
                pointer_id,
                scope_constant_id,
                semantics_id,
                value_id,
            ),
            crate::AtomicFunction::InclusiveOr => Instruction::atomic_binary(
                atomic_integer_op(scalar.kind, spirv::Op::AtomicOr)?,
                result_type_id,
                id,
                pointer_id,
                scope_constant_id,
                semantics_id,
                value_id,
            ),
            crate::AtomicFunction::ExclusiveOr => Instruction::atomic_binary(
                atomic_integer_op(scalar.kind, spirv::Op::AtomicXor)?,
                result_type_id,
                id,
                pointer_id,
                scope_constant_id,
                semantics_id,
                value_id,
            ),
            crate::AtomicFunction::Min => {
                let spirv_op = match scalar.kind {
                    crate::ScalarKind::Sint => spirv::Op::AtomicSMin,
                    crate::ScalarKind::Uint => spirv::Op::AtomicUMin,
                    crate::ScalarKind::Float => self.writer.float_atomic(fun, scalar, vector)?,
                    _ => {
                        return Err(Error::Validation(
                            "atomic operation on an unsupported scalar type",
                        ));
                    }
                };
                Instruction::atomic_binary(
                    spirv_op,
                    result_type_id,
                    id,
                    pointer_id,
                    scope_constant_id,
                    semantics_id,
                    value_id,
                )
            }
            crate::AtomicFunction::Max => {
                let spirv_op = match scalar.kind {
                    crate::ScalarKind::Sint => spirv::Op::AtomicSMax,
                    crate::ScalarKind::Uint => spirv::Op::AtomicUMax,
                    crate::ScalarKind::Float => self.writer.float_atomic(fun, scalar, vector)?,
                    _ => {
                        return Err(Error::Validation(
                            "atomic operation on an unsupported scalar type",
                        ));
                    }
                };
                Instruction::atomic_binary(
                    spirv_op,
                    result_type_id,
                    id,
                    pointer_id,
                    scope_constant_id,
                    semantics_id,
                    value_id,
                )
            }
            crate::AtomicFunction::Exchange { compare: None } => Instruction::atomic_binary(
                spirv::Op::AtomicExchange,
                result_type_id,
                id,
                pointer_id,
                scope_constant_id,
                semantics_id,
                value_id,
            ),
            crate::AtomicFunction::Exchange { compare: Some(cmp) } => {
                self.write_atomic_compare_exchange(ids, scalar, cmp, block)?
            }
        })
    }

    fn write_atomic_compare_exchange(
        &mut self,
        ids: &AtomicIds,
        scalar: crate::Scalar,
        cmp: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<Instruction, Error> {
        let scalar_type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
        let bool_type_id = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::BOOL));

        let cas_result_id = self.gen_id();
        let equality_result_id = self.gen_id();
        let equality_operator = atomic_integer_op(scalar.kind, spirv::Op::IEqual)?;

        let mut cas_instr = Instruction::new(spirv::Op::AtomicCompareExchange);
        cas_instr.set_type(scalar_type_id);
        cas_instr.set_result(cas_result_id);
        cas_instr.add_operand(ids.pointer_id);
        cas_instr.add_operand(ids.scope_constant_id);
        cas_instr.add_operand(ids.semantics_id);
        cas_instr.add_operand(ids.unequal_semantics_id);
        cas_instr.add_operand(ids.value_id);
        cas_instr.add_operand(self.cached.get(cmp)?);
        block.body.push(cas_instr);
        block.body.push(Instruction::binary(
            equality_operator,
            bool_type_id,
            equality_result_id,
            cas_result_id,
            self.cached.get(cmp)?,
        ));
        Ok(Instruction::composite_construct(
            ids.result_type_id,
            ids.id,
            &[cas_result_id, equality_result_id],
        ))
    }
}
