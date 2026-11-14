/*!
Implementations for `BlockContext` methods.
*/

use alloc::vec::Vec;

use arrayvec::ArrayVec;
use spirv::Word;

use super::{
    Block, BlockContext, Dimension, Error, Instruction, LocalType, LookupType, NumericType,
    ResultMember, Writer, WriterFlags, index::BoundsCheckResult,
};
use crate::{Statement, arena::Handle, proc::index::GuardedIndex};

const SPV_AMD_GPU_SHADER_HALF_FLOAT: &str = "SPV_AMD_gpu_shader_half_float";
const SPV_AMD_SHADER_TRINARY_MINMAX: &str = "SPV_AMD_shader_trinary_minmax";
const SPV_AMD_GCN_SHADER: &str = "SPV_AMD_gcn_shader";
const AMD_CUBE_FACE_INDEX: Word = 1;
const AMD_CUBE_FACE_COORD: Word = 2;
const AMD_TIME: Word = 3;

const fn integer_functions2(
    fun: crate::MathFunction,
    kind: Option<crate::ScalarKind>,
) -> Result<spirv::Op, Error> {
    use crate::MathFunction as Mf;
    use crate::ScalarKind as Sk;
    use spirv::Op;
    Ok(match (fun, kind) {
        (Mf::IntelCountLeadingZeros, Some(Sk::Uint)) => Op::UCountLeadingZerosINTEL,
        (Mf::IntelCountTrailingZeros, Some(Sk::Uint)) => Op::UCountTrailingZerosINTEL,
        (Mf::AbsoluteDifference, Some(Sk::Sint)) => Op::AbsISubINTEL,
        (Mf::AbsoluteDifference, Some(Sk::Uint)) => Op::AbsUSubINTEL,
        (Mf::AddSaturate, Some(Sk::Sint)) => Op::IAddSatINTEL,
        (Mf::AddSaturate, Some(Sk::Uint)) => Op::UAddSatINTEL,
        (Mf::SubtractSaturate, Some(Sk::Sint)) => Op::ISubSatINTEL,
        (Mf::SubtractSaturate, Some(Sk::Uint)) => Op::USubSatINTEL,
        (Mf::Average, Some(Sk::Sint)) => Op::IAverageINTEL,
        (Mf::Average, Some(Sk::Uint)) => Op::UAverageINTEL,
        (Mf::AverageRounded, Some(Sk::Sint)) => Op::IAverageRoundedINTEL,
        (Mf::AverageRounded, Some(Sk::Uint)) => Op::UAverageRoundedINTEL,
        (Mf::Multiply32x16, Some(Sk::Sint)) => Op::IMul32x16INTEL,
        (Mf::Multiply32x16, Some(Sk::Uint)) => Op::UMul32x16INTEL,
        _ => return Err(Error::Validation("integer function of a non-integer value")),
    })
}

const fn trinary_minmax(
    fun: crate::MathFunction,
    kind: Option<crate::ScalarKind>,
) -> Result<Word, Error> {
    use crate::MathFunction as Mf;
    use crate::ScalarKind as Sk;
    Ok(match (fun, kind) {
        (Mf::Min3, Some(Sk::Float)) => 1,
        (Mf::Min3, Some(Sk::Uint)) => 2,
        (Mf::Min3, Some(Sk::Sint)) => 3,
        (Mf::Max3, Some(Sk::Float)) => 4,
        (Mf::Max3, Some(Sk::Uint)) => 5,
        (Mf::Max3, Some(Sk::Sint)) => 6,
        (Mf::Mid3, Some(Sk::Float)) => 7,
        (Mf::Mid3, Some(Sk::Uint)) => 8,
        (Mf::Mid3, Some(Sk::Sint)) => 9,
        _ => return Err(Error::Validation("trinary min/max of a non-numeric value")),
    })
}

const fn get_dimension(type_inner: &crate::TypeInner) -> Result<Dimension, Error> {
    match *type_inner {
        crate::TypeInner::Scalar(_) => Ok(Dimension::Scalar),
        crate::TypeInner::Vector { .. } | crate::TypeInner::LongVector { .. } => {
            Ok(Dimension::Vector)
        }
        crate::TypeInner::Matrix { .. } => Ok(Dimension::Matrix),
        crate::TypeInner::CooperativeMatrix { .. } => Ok(Dimension::CooperativeMatrix),
        _ => Err(Error::Validation(
            "binary operand is not a scalar, vector or matrix",
        )),
    }
}

/// How to derive the type of `OpAccessChain` instructions from rglsl IR.
///
/// Most of the time, we compile rglsl IR to SPIR-V instructions whose result
/// types are simply the direct SPIR-V analog of the rglsl IR's. But in some
/// cases, the rglsl IR and SPIR-V types need to diverge.
///
/// This enum specifies how [`BlockContext::write_access_chain`] should
/// choose a SPIR-V result type for the `OpAccessChain` it generates, based on
/// the type of the given rglsl IR [`Expression`] it's generating code for.
///
/// [`Expression`]: crate::Expression
#[derive(Copy, Clone)]
pub(super) enum AccessTypeAdjustment {
    /// No adjustment needed: the SPIR-V type should be the direct
    /// analog of the rglsl IR expression type.
    ///
    /// For most access chains, this is the right thing: the rglsl IR access
    /// expression produces a [`Pointer`] to the element / component, and the
    /// SPIR-V `OpAccessChain` instruction does the same.
    ///
    /// [`Pointer`]: crate::TypeInner::Pointer
    None,

    /// The SPIR-V type should be an `OpPointer` to the direct analog of the
    /// rglsl IR expression's type.
    ///
    /// This is necessary for indexing binding arrays in the [`Handle`] address
    /// space:
    ///
    /// - In rglsl IR, referencing a binding array [`GlobalVariable`] in the
    ///   [`Handle`] address space produces a value of type [`BindingArray`],
    ///   not a pointer to such. And [`Access`] and [`AccessIndex`] expressions
    ///   operate on handle binding arrays by value, and produce handle values,
    ///   not pointers.
    ///
    /// - In SPIR-V, a binding array `OpVariable` produces a pointer to an
    ///   array, and `OpAccessChain` instructions operate on pointers,
    ///   regardless of whether the elements are opaque types or not.
    ///
    /// See also the documentation for [`BindingArray`].
    ///
    /// [`Handle`]: crate::AddressSpace::Handle
    /// [`GlobalVariable`]: crate::GlobalVariable
    /// [`BindingArray`]: crate::TypeInner::BindingArray
    /// [`Access`]: crate::Expression::Access
    /// [`AccessIndex`]: crate::Expression::AccessIndex
    IntroducePointer(spirv::StorageClass),
}

/// The termination statement to be added to the end of the block
enum BlockExit {
    /// Generates an OpReturn (void return)
    Return,
    /// Generates an OpBranch to the specified block
    Branch {
        /// The branch target block
        target: Word,
    },
    /// Translates a loop `break if` into an `OpBranchConditional` to the
    /// merge block if true (the merge block is passed through [`LoopContext::break_id`]
    /// or else to the loop header (passed through [`preamble_id`])
    ///
    /// [`preamble_id`]: Self::BreakIf::preamble_id
    BreakIf {
        /// The condition of the `break if`
        condition: Handle<crate::Expression>,
        /// The loop header block id
        preamble_id: Word,
    },
}

/// What code generation did with a provided [`BlockExit`] value.
///
/// A function that accepts a [`BlockExit`] argument should return a value of
/// this type, to indicate whether the code it generated ended up using the
/// provided exit, or ignored it and did a non-local exit of some other kind
/// (say, [`Break`] or [`Continue`]). Some callers must use this information to
/// decide whether to generate the target block at all.
///
/// [`Break`]: Statement::Break
/// [`Continue`]: Statement::Continue
#[must_use]
#[derive(Clone, Copy)]
enum BlockExitDisposition {
    /// The generated code used the provided `BlockExit` value. If it included a
    /// block label, the caller should be sure to actually emit the block it
    /// refers to.
    Used,

    /// The generated code did not use the provided `BlockExit` value. If it
    /// included a block label, the caller should not bother to actually emit
    /// the block it refers to, unless it knows the block is needed for
    /// something else.
    Discarded,
}

enum Resume<'a> {
    Scope {
        merge_id: Word,
        statement: &'a Statement,
    },
    Merge {
        merge_id: Word,
        statement: &'a Statement,
    },
}

enum FrameState<'a> {
    Writing(Block),
    Waiting(Resume<'a>),
}

struct BlockFrame<'a> {
    ir: &'a crate::Block,
    next: usize,
    state: FrameState<'a>,
    exit: BlockExit,
    loop_context: LoopContext,
}

enum Work<'a> {
    Block {
        label_id: Word,
        ir: &'a crate::Block,
        exit: BlockExit,
        loop_context: LoopContext,
    },
    Frame(BlockFrame<'a>),
    Branch {
        label_id: Word,
        target: Word,
    },
}

enum Nested<'a> {
    Done(Option<Block>),
    Children {
        resume: Resume<'a>,
        children: Vec<Work<'a>>,
    },
}

#[derive(Clone, Copy, Default)]
struct LoopContext {
    continuing_id: Option<Word>,
    break_id: Option<Word>,
}

impl Writer {
    // Flip Y coordinate to adjust for coordinate space difference
    // between SPIR-V and our IR.
    // The `position_id` argument is a pointer to a `vecN<f32>`,
    // whose `y` component we will negate.
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

    // Clamp fragment depth between 0 and 1.
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
            // This isn't a real builtin, and is handled elsewhere
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

            match res_member.built_in {
                Some(crate::BuiltIn::Position { .. })
                    if self.flags.contains(WriterFlags::ADJUST_COORDINATE_SPACE) =>
                {
                    self.write_epilogue_position_y_flip(res_member.id, body)?;
                }
                Some(crate::BuiltIn::FragDepth)
                    if self.flags.contains(WriterFlags::CLAMP_FRAG_DEPTH) =>
                {
                    self.write_epilogue_frag_depth_clamp(res_member.id, body)?;
                }
                _ => {}
            }
        }
        Ok(Instruction::return_void())
    }
}

impl BlockContext<'_> {
    fn is_half(&self, expression: Handle<crate::Expression>) -> bool {
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
    fn returned_array_element(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<Option<Word>, Error> {
        let (base, index) = match self.ir_function.expressions[expr_handle] {
            crate::Expression::Access { base, .. } => (base, None),
            crate::Expression::AccessIndex { base, index } => (base, Some(index)),
            _ => return Ok(None),
        };
        let returned = matches!(
            self.ir_function.expressions[base],
            crate::Expression::CallResult(_)
        ) && matches!(
            *self.fun_info[base].ty.inner_with(&self.ir_module.types),
            crate::TypeInner::BindingArray { .. }
        );
        if !returned {
            return Ok(None);
        }
        let result_type_id = self.get_expression_type_id(&self.fun_info[expr_handle].ty)?;
        let Some(index) = index else {
            self.spill_to_internal_variable(base, block)?;
            self.function.spilled_accesses.insert(expr_handle);
            return self
                .maybe_access_spilled_composite(expr_handle, block, result_type_id)
                .map(Some);
        };
        let id = self.gen_id();
        let base_id = self.cached.get(base)?;
        block.body.push(Instruction::composite_extract(
            result_type_id,
            id,
            base_id,
            &[index],
        ));
        Ok(Some(id))
    }

    /// Cache an expression for a value.
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
            crate::Expression::Compose { ty, ref components } => {
                self.write_compose(expr_handle, ty, components, result_type_id, block)?
            }
            crate::Expression::Splat { size, value } => {
                let value_id = self.cached.get(value)?;
                let components = &[value_id; 4][..size as usize];

                if self.expression_constness.is_const(expr_handle) {
                    let ty = self
                        .writer
                        .get_expression_lookup_type(&self.fun_info[expr_handle].ty)?;
                    self.writer.get_constant_composite(ty, components)?
                } else if self.expression_constness.is_specialized(expr_handle) {
                    self.writer
                        .get_spec_constant_composite(result_type_id, components)
                } else {
                    let id = self.gen_id();
                    block.body.push(Instruction::composite_construct(
                        result_type_id,
                        id,
                        components,
                    ));
                    id
                }
            }
            crate::Expression::Access { base, index } => {
                let base_ty_inner = self.fun_info[base].ty.inner_with(&self.ir_module.types);
                match *base_ty_inner {
                    crate::TypeInner::Pointer { .. } | crate::TypeInner::ValuePointer { .. } => {
                        // When we have a chain of `Access` and `AccessIndex` expressions
                        // operating on pointers, we want to generate a single
                        // `OpAccessChain` instruction for the whole chain. Put off
                        // generating any code for this until we find the `Expression`
                        // that actually dereferences the pointer.
                        0
                    }
                    _ if self.function.spilled_accesses.contains(base) => {
                        // As far as rglsl IR is concerned, this expression does not yield
                        // a pointer (we just checked, above), but this backend spilled it
                        // to a temporary variable, so SPIR-V thinks we're accessing it
                        // via a pointer.

                        // Since the base expression was spilled, mark this access to it
                        // as spilled, too.
                        self.function.spilled_accesses.insert(expr_handle);
                        self.maybe_access_spilled_composite(expr_handle, block, result_type_id)?
                    }
                    crate::TypeInner::Vector { .. } => self.write_vector_access(
                        result_type_id,
                        base,
                        None,
                        GuardedIndex::Expression(index),
                        block,
                    )?,
                    crate::TypeInner::Array { .. }
                    | crate::TypeInner::Matrix { .. }
                    | crate::TypeInner::LongVector { .. }
                    | crate::TypeInner::CooperativeMatrix { .. } => {
                        // See if `index` is known at compile time.
                        match GuardedIndex::from_expression(
                            index,
                            &self.ir_function.expressions,
                            self.ir_module,
                        ) {
                            GuardedIndex::Known(value) => {
                                // If `index` is known and in bounds, we can just use
                                // `OpCompositeExtract`.
                                //
                                // At the moment, validation rejects programs if this
                                // index is out of bounds, so we don't need bounds checks.
                                // However, that rejection is incorrect, since WGSL says
                                // that `let` bindings are not constant expressions
                                // (#6396). So eventually we will need to emulate bounds
                                // checks here.
                                let id = self.gen_id();
                                let base_id = self.cached.get(base)?;
                                block.body.push(Instruction::composite_extract(
                                    result_type_id,
                                    id,
                                    base_id,
                                    &[value],
                                ));
                                id
                            }
                            GuardedIndex::Expression(_) => {
                                // We are subscripting an array or matrix that is not
                                // behind a pointer, using an index computed at runtime.
                                // SPIR-V has no instructions that do this, so the best we
                                // can do is spill the value to a new temporary variable,
                                // at which point we can get a pointer to that and just
                                // use `OpAccessChain` in the usual way.
                                self.spill_to_internal_variable(base, block)?;

                                // Since the base was spilled, mark this access to it as
                                // spilled, too.
                                self.function.spilled_accesses.insert(expr_handle);
                                self.maybe_access_spilled_composite(
                                    expr_handle,
                                    block,
                                    result_type_id,
                                )?
                            }
                        }
                    }
                    crate::TypeInner::BindingArray { .. }
                        if self.function.texel_images.contains(expr_handle) =>
                    {
                        0
                    }
                    crate::TypeInner::BindingArray {
                        base: binding_type, ..
                    } => {
                        // Only binding arrays in the `Handle` address space will take
                        // this path, since we handled the `Pointer` case above.
                        let result_id = self.write_access_chain(
                            expr_handle,
                            block,
                            AccessTypeAdjustment::IntroducePointer(self.handle_class(base)),
                        )?;

                        let binding_type_id = self.get_handle_type_id(binding_type)?;
                        self.function.handle_pointers.insert(expr_handle, result_id);

                        let load_id = self.gen_id();
                        block.body.push(Instruction::load(
                            binding_type_id,
                            load_id,
                            result_id,
                            None,
                        ));

                        load_id
                    }
                    ref other => {
                        log::error!(
                            "Unable to access base {:?} of type {:?}",
                            self.ir_function.expressions[base],
                            other
                        );
                        return Err(Error::Validation(
                            "only vectors and arrays may be dynamically indexed by value",
                        ));
                    }
                }
            }
            crate::Expression::AccessIndex { base, index } => {
                match *self.fun_info[base].ty.inner_with(&self.ir_module.types) {
                    crate::TypeInner::Pointer { .. } | crate::TypeInner::ValuePointer { .. } => {
                        // When we have a chain of `Access` and `AccessIndex` expressions
                        // operating on pointers, we want to generate a single
                        // `OpAccessChain` instruction for the whole chain. Put off
                        // generating any code for this until we find the `Expression`
                        // that actually dereferences the pointer.
                        0
                    }
                    _ if self.function.spilled_accesses.contains(base) => {
                        // As far as rglsl IR is concerned, this expression does not yield
                        // a pointer (we just checked, above), but this backend spilled it
                        // to a temporary variable, so SPIR-V thinks we're accessing it
                        // via a pointer.

                        // Since the base expression was spilled, mark this access to it
                        // as spilled, too.
                        self.function.spilled_accesses.insert(expr_handle);
                        self.maybe_access_spilled_composite(expr_handle, block, result_type_id)?
                    }
                    crate::TypeInner::Vector { .. }
                    | crate::TypeInner::Matrix { .. }
                    | crate::TypeInner::LongVector { .. }
                    | crate::TypeInner::CooperativeMatrix { .. }
                    | crate::TypeInner::Array { .. }
                    | crate::TypeInner::Struct { .. } => {
                        // We never need bounds checks here: dynamically sized arrays can
                        // only appear behind pointers, and are thus handled by the
                        // `is_intermediate` case above. Everything else's size is
                        // statically known and checked in validation.
                        let id = self.gen_id();
                        let base_id = self.cached.get(base)?;
                        block.body.push(Instruction::composite_extract(
                            result_type_id,
                            id,
                            base_id,
                            &[index],
                        ));
                        id
                    }
                    crate::TypeInner::BindingArray { .. }
                        if self.function.texel_images.contains(expr_handle) =>
                    {
                        0
                    }
                    crate::TypeInner::BindingArray {
                        base: binding_type, ..
                    } => {
                        // Only binding arrays in the `Handle` address space will take
                        // this path, since we handled the `Pointer` case above.
                        let result_id = self.write_access_chain(
                            expr_handle,
                            block,
                            AccessTypeAdjustment::IntroducePointer(self.handle_class(base)),
                        )?;

                        let binding_type_id = self.get_handle_type_id(binding_type)?;
                        self.function.handle_pointers.insert(expr_handle, result_id);

                        let load_id = self.gen_id();
                        block.body.push(Instruction::load(
                            binding_type_id,
                            load_id,
                            result_id,
                            None,
                        ));

                        load_id
                    }
                    ref other => {
                        log::error!("Unable to access index of {other:?}");
                        return Err(Error::FeatureNotImplemented("access index for type"));
                    }
                }
            }
            crate::Expression::GlobalVariable(handle) => {
                self.writer.global_variables[handle].access_id
            }
            crate::Expression::Swizzle {
                size,
                vector,
                pattern,
            } => {
                let vector_id = self.cached.get(vector)?;
                self.temp_list.clear();
                for &sc in pattern[..size as usize].iter() {
                    self.temp_list.push(sc as Word);
                }
                let id = self.gen_id();
                block.body.push(Instruction::vector_shuffle(
                    result_type_id,
                    id,
                    vector_id,
                    vector_id,
                    &self.temp_list,
                ));
                id
            }
            crate::Expression::Unary { op, expr } => {
                let id = self.gen_id();
                let expr_id = self.cached.get(expr)?;
                let expr_ty_inner = self.fun_info[expr].ty.inner_with(&self.ir_module.types);

                let spirv_op = match op {
                    crate::UnaryOperator::Negate => match expr_ty_inner.scalar_kind() {
                        Some(crate::ScalarKind::Float) => spirv::Op::FNegate,
                        Some(crate::ScalarKind::Sint) => spirv::Op::SNegate,
                        _ => return Err(Error::Validation("Unexpected kind for negation")),
                    },
                    crate::UnaryOperator::LogicalNot => spirv::Op::LogicalNot,
                    crate::UnaryOperator::BitwiseNot => spirv::Op::Not,
                };

                block
                    .body
                    .push(Instruction::unary(spirv_op, result_type_id, id, expr_id));
                id
            }
            crate::Expression::Binary { op, left, right } => {
                let id = self.gen_id();
                let left_id = self.cached.get(left)?;
                let right_id = self.cached.get(right)?;

                {
                    let left_ty_inner = self.fun_info[left].ty.inner_with(&self.ir_module.types);
                    let right_ty_inner = self.fun_info[right].ty.inner_with(&self.ir_module.types);

                    let left_dimension = get_dimension(left_ty_inner)?;
                    let right_dimension = get_dimension(right_ty_inner)?;

                    let mut reverse_operands = false;

                    let spirv_op = match op {
                        crate::BinaryOperator::Add => match *left_ty_inner {
                            crate::TypeInner::Scalar(scalar)
                            | crate::TypeInner::Vector { scalar, .. }
                            | crate::TypeInner::LongVector { scalar, .. }
                            | crate::TypeInner::CooperativeMatrix { scalar, .. } => {
                                match scalar.kind {
                                    crate::ScalarKind::Float => spirv::Op::FAdd,
                                    _ => spirv::Op::IAdd,
                                }
                            }
                            crate::TypeInner::Matrix {
                                columns,
                                rows,
                                scalar,
                            } => {
                                //TODO: why not just rely on `Fadd` for matrices?
                                self.write_matrix_matrix_column_op(
                                    expr_handle,
                                    block,
                                    id,
                                    result_type_id,
                                    left_id,
                                    right_id,
                                    columns,
                                    rows,
                                    scalar.width,
                                    spirv::Op::FAdd,
                                )?;

                                self.cached.set(expr_handle, id)?;
                                return Ok(());
                            }
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::Subtract => match *left_ty_inner {
                            crate::TypeInner::Scalar(scalar)
                            | crate::TypeInner::Vector { scalar, .. }
                            | crate::TypeInner::LongVector { scalar, .. }
                            | crate::TypeInner::CooperativeMatrix { scalar, .. } => {
                                match scalar.kind {
                                    crate::ScalarKind::Float => spirv::Op::FSub,
                                    _ => spirv::Op::ISub,
                                }
                            }
                            crate::TypeInner::Matrix {
                                columns,
                                rows,
                                scalar,
                            } => {
                                self.write_matrix_matrix_column_op(
                                    expr_handle,
                                    block,
                                    id,
                                    result_type_id,
                                    left_id,
                                    right_id,
                                    columns,
                                    rows,
                                    scalar.width,
                                    spirv::Op::FSub,
                                )?;

                                self.cached.set(expr_handle, id)?;
                                return Ok(());
                            }
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::Multiply => {
                            match (left_dimension, right_dimension) {
                                (Dimension::Scalar, Dimension::Vector) => {
                                    self.write_vector_scalar_mult(
                                        block,
                                        id,
                                        result_type_id,
                                        right_id,
                                        left_id,
                                        right_ty_inner,
                                    )?;

                                    self.cached.set(expr_handle, id)?;
                                    return Ok(());
                                }
                                (Dimension::Vector, Dimension::Scalar) => {
                                    self.write_vector_scalar_mult(
                                        block,
                                        id,
                                        result_type_id,
                                        left_id,
                                        right_id,
                                        left_ty_inner,
                                    )?;

                                    self.cached.set(expr_handle, id)?;
                                    return Ok(());
                                }
                                (Dimension::Vector, Dimension::Matrix) => {
                                    spirv::Op::VectorTimesMatrix
                                }
                                (
                                    Dimension::Matrix | Dimension::CooperativeMatrix,
                                    Dimension::Scalar,
                                ) => spirv::Op::MatrixTimesScalar,
                                (
                                    Dimension::Scalar,
                                    Dimension::Matrix | Dimension::CooperativeMatrix,
                                ) => {
                                    reverse_operands = true;
                                    spirv::Op::MatrixTimesScalar
                                }
                                (Dimension::Matrix, Dimension::Vector) => {
                                    spirv::Op::MatrixTimesVector
                                }
                                (Dimension::Matrix, Dimension::Matrix) => {
                                    spirv::Op::MatrixTimesMatrix
                                }
                                (Dimension::Vector, Dimension::Vector)
                                | (Dimension::Scalar, Dimension::Scalar)
                                | (Dimension::CooperativeMatrix, Dimension::CooperativeMatrix)
                                    if left_ty_inner.scalar_kind()
                                        == Some(crate::ScalarKind::Float) =>
                                {
                                    spirv::Op::FMul
                                }
                                (Dimension::Vector, Dimension::Vector)
                                | (Dimension::Scalar, Dimension::Scalar)
                                | (Dimension::CooperativeMatrix, Dimension::CooperativeMatrix) => {
                                    spirv::Op::IMul
                                }
                                (Dimension::CooperativeMatrix, _)
                                | (_, Dimension::CooperativeMatrix) => {
                                    return Err(Error::FeatureNotImplemented(
                                        "component-wise multiplication of cooperative matrices",
                                    ));
                                }
                            }
                        }
                        crate::BinaryOperator::Divide => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Sint) => spirv::Op::SDiv,
                            Some(crate::ScalarKind::Uint) => spirv::Op::UDiv,
                            Some(crate::ScalarKind::Float) => spirv::Op::FDiv,
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::Modulo => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Float) => spirv::Op::FMod,
                            Some(crate::ScalarKind::Sint) => spirv::Op::SMod,
                            Some(crate::ScalarKind::Uint) => spirv::Op::UMod,
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::Equal => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Sint | crate::ScalarKind::Uint) => {
                                spirv::Op::IEqual
                            }
                            Some(crate::ScalarKind::Float) => spirv::Op::FOrdEqual,
                            Some(crate::ScalarKind::Bool) => spirv::Op::LogicalEqual,
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::NotEqual => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Sint | crate::ScalarKind::Uint) => {
                                spirv::Op::INotEqual
                            }
                            Some(crate::ScalarKind::Float) => spirv::Op::FUnordNotEqual,
                            Some(crate::ScalarKind::Bool) => spirv::Op::LogicalNotEqual,
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::Less => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Sint) => spirv::Op::SLessThan,
                            Some(crate::ScalarKind::Uint) => spirv::Op::ULessThan,
                            Some(crate::ScalarKind::Float) => spirv::Op::FOrdLessThan,
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::LessEqual => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Sint) => spirv::Op::SLessThanEqual,
                            Some(crate::ScalarKind::Uint) => spirv::Op::ULessThanEqual,
                            Some(crate::ScalarKind::Float) => spirv::Op::FOrdLessThanEqual,
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::Greater => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Sint) => spirv::Op::SGreaterThan,
                            Some(crate::ScalarKind::Uint) => spirv::Op::UGreaterThan,
                            Some(crate::ScalarKind::Float) => spirv::Op::FOrdGreaterThan,
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::GreaterEqual => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Sint) => spirv::Op::SGreaterThanEqual,
                            Some(crate::ScalarKind::Uint) => spirv::Op::UGreaterThanEqual,
                            Some(crate::ScalarKind::Float) => spirv::Op::FOrdGreaterThanEqual,
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                        crate::BinaryOperator::And => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Bool) => spirv::Op::LogicalAnd,
                            _ => spirv::Op::BitwiseAnd,
                        },
                        crate::BinaryOperator::ExclusiveOr => spirv::Op::BitwiseXor,
                        crate::BinaryOperator::InclusiveOr => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Bool) => spirv::Op::LogicalOr,
                            _ => spirv::Op::BitwiseOr,
                        },
                        crate::BinaryOperator::LogicalAnd => spirv::Op::LogicalAnd,
                        crate::BinaryOperator::LogicalOr => spirv::Op::LogicalOr,
                        crate::BinaryOperator::ShiftLeft => spirv::Op::ShiftLeftLogical,
                        crate::BinaryOperator::ShiftRight => match left_ty_inner.scalar_kind() {
                            Some(crate::ScalarKind::Sint) => spirv::Op::ShiftRightArithmetic,
                            Some(crate::ScalarKind::Uint) => spirv::Op::ShiftRightLogical,
                            _ => {
                                return Err(Error::Validation(
                                    "invalid operand type for a binary operator",
                                ));
                            }
                        },
                    };

                    block.body.push(Instruction::binary(
                        spirv_op,
                        result_type_id,
                        id,
                        if reverse_operands { right_id } else { left_id },
                        if reverse_operands { left_id } else { right_id },
                    ));
                }
                id
            }
            crate::Expression::Math {
                fun,
                arg,
                arg1,
                arg2,
                arg3,
            } => {
                use crate::MathFunction as Mf;
                let bfloat_dot = fun == Mf::Dot
                    && self.fun_info[arg]
                        .ty
                        .inner_with(&self.ir_module.types)
                        .scalar_kind()
                        == Some(crate::ScalarKind::BFloat);
                if bfloat_dot {
                    self.writer.require_any(
                        "bfloat16 dot product",
                        &[spirv::Capability::BFloat16DotProductKHR],
                    )?;
                }
                enum MathOp {
                    Ext(spirv::GlslStd450Op),
                    Custom(Instruction),
                }

                let arg0_id = self.cached.get(arg)?;
                let arg_ty = self.fun_info[arg].ty.inner_with(&self.ir_module.types);
                let arg_scalar_kind = arg_ty.scalar_kind();
                let arg1_id = match arg1 {
                    Some(handle) => self.cached.get(handle)?,
                    None => 0,
                };
                let arg2_id = match arg2 {
                    Some(handle) => self.cached.get(handle)?,
                    None => 0,
                };
                let arg3_id = match arg3 {
                    Some(handle) => self.cached.get(handle)?,
                    None => 0,
                };

                let id = self.gen_id();
                let math_op = match fun {
                    // comparison
                    Mf::Abs => {
                        match arg_scalar_kind {
                            Some(crate::ScalarKind::Float) => {
                                MathOp::Ext(spirv::GlslStd450Op::FAbs)
                            }
                            Some(crate::ScalarKind::Sint) => MathOp::Ext(spirv::GlslStd450Op::SAbs),
                            Some(crate::ScalarKind::Uint) => {
                                MathOp::Custom(Instruction::unary(
                                    spirv::Op::CopyObject, // do nothing
                                    result_type_id,
                                    id,
                                    arg0_id,
                                ))
                            }
                            _ => return Err(Error::Validation("abs of a non-numeric value")),
                        }
                    }
                    Mf::Min => MathOp::Ext(match arg_scalar_kind {
                        Some(crate::ScalarKind::Float) => spirv::GlslStd450Op::FMin,
                        Some(crate::ScalarKind::Sint) => spirv::GlslStd450Op::SMin,
                        Some(crate::ScalarKind::Uint) => spirv::GlslStd450Op::UMin,
                        _ => return Err(Error::Validation("min of a non-numeric value")),
                    }),
                    Mf::Max => MathOp::Ext(match arg_scalar_kind {
                        Some(crate::ScalarKind::Float) => spirv::GlslStd450Op::FMax,
                        Some(crate::ScalarKind::Sint) => spirv::GlslStd450Op::SMax,
                        Some(crate::ScalarKind::Uint) => spirv::GlslStd450Op::UMax,
                        _ => return Err(Error::Validation("max of a non-numeric value")),
                    }),
                    Mf::Clamp => MathOp::Ext(match arg_scalar_kind {
                        Some(crate::ScalarKind::Float) => spirv::GlslStd450Op::FClamp,
                        Some(crate::ScalarKind::Sint) => spirv::GlslStd450Op::SClamp,
                        Some(crate::ScalarKind::Uint) => spirv::GlslStd450Op::UClamp,
                        _ => return Err(Error::Validation("clamp of a non-numeric value")),
                    }),
                    Mf::IntelCountLeadingZeros
                    | Mf::IntelCountTrailingZeros
                    | Mf::AbsoluteDifference
                    | Mf::AddSaturate
                    | Mf::SubtractSaturate
                    | Mf::Average
                    | Mf::AverageRounded
                    | Mf::Multiply32x16 => {
                        let op = integer_functions2(fun, arg_scalar_kind)?;
                        self.writer
                            .use_extension("SPV_INTEL_shader_integer_functions2");
                        self.writer.require_any(
                            "integer functions 2",
                            &[spirv::Capability::IntegerFunctions2INTEL],
                        )?;
                        MathOp::Custom(if fun.argument_count() == 1 {
                            Instruction::unary(op, result_type_id, id, arg0_id)
                        } else {
                            Instruction::binary(op, result_type_id, id, arg0_id, arg1_id)
                        })
                    }
                    Mf::CubeFaceIndex | Mf::CubeFaceCoord => {
                        let op = if fun == Mf::CubeFaceIndex {
                            AMD_CUBE_FACE_INDEX
                        } else {
                            AMD_CUBE_FACE_COORD
                        };
                        let set = self.writer.spirv_ext_import(SPV_AMD_GCN_SHADER);
                        MathOp::Custom(Instruction::ext_inst(
                            set,
                            op,
                            result_type_id,
                            id,
                            &[arg0_id],
                        ))
                    }
                    Mf::Min3 | Mf::Max3 | Mf::Mid3 => {
                        let op = trinary_minmax(fun, arg_scalar_kind)?;
                        let set = self.writer.spirv_ext_import(SPV_AMD_SHADER_TRINARY_MINMAX);
                        MathOp::Custom(Instruction::ext_inst(
                            set,
                            op,
                            result_type_id,
                            id,
                            &[arg0_id, arg1_id, arg2_id],
                        ))
                    }
                    // trigonometry
                    Mf::Sin => MathOp::Ext(spirv::GlslStd450Op::Sin),
                    Mf::Sinh => MathOp::Ext(spirv::GlslStd450Op::Sinh),
                    Mf::Asin => MathOp::Ext(spirv::GlslStd450Op::Asin),
                    Mf::Cos => MathOp::Ext(spirv::GlslStd450Op::Cos),
                    Mf::Cosh => MathOp::Ext(spirv::GlslStd450Op::Cosh),
                    Mf::Acos => MathOp::Ext(spirv::GlslStd450Op::Acos),
                    Mf::Tan => MathOp::Ext(spirv::GlslStd450Op::Tan),
                    Mf::Tanh => MathOp::Ext(spirv::GlslStd450Op::Tanh),
                    Mf::Atan => MathOp::Ext(spirv::GlslStd450Op::Atan),
                    Mf::Atan2 => MathOp::Ext(spirv::GlslStd450Op::Atan2),
                    Mf::Asinh => MathOp::Ext(spirv::GlslStd450Op::Asinh),
                    Mf::Acosh => MathOp::Ext(spirv::GlslStd450Op::Acosh),
                    Mf::Atanh => MathOp::Ext(spirv::GlslStd450Op::Atanh),
                    Mf::Radians => MathOp::Ext(spirv::GlslStd450Op::Radians),
                    Mf::Degrees => MathOp::Ext(spirv::GlslStd450Op::Degrees),
                    // decomposition
                    Mf::Ceil => MathOp::Ext(spirv::GlslStd450Op::Ceil),
                    Mf::Round => MathOp::Ext(spirv::GlslStd450Op::Round),
                    Mf::RoundEven => MathOp::Ext(spirv::GlslStd450Op::RoundEven),
                    Mf::Floor => MathOp::Ext(spirv::GlslStd450Op::Floor),
                    Mf::Fract => MathOp::Ext(spirv::GlslStd450Op::Fract),
                    Mf::Trunc => MathOp::Ext(spirv::GlslStd450Op::Trunc),
                    Mf::Modf => MathOp::Ext(spirv::GlslStd450Op::ModfStruct),
                    Mf::Frexp => MathOp::Ext(spirv::GlslStd450Op::FrexpStruct),
                    Mf::Ldexp => MathOp::Ext(spirv::GlslStd450Op::Ldexp),
                    // geometry
                    Mf::Dot => match *self.fun_info[arg].ty.inner_with(&self.ir_module.types) {
                        crate::TypeInner::Vector {
                            scalar:
                                crate::Scalar {
                                    kind: crate::ScalarKind::Float,
                                    ..
                                },
                            ..
                        }
                        | crate::TypeInner::LongVector {
                            scalar:
                                crate::Scalar {
                                    kind: crate::ScalarKind::Float,
                                    ..
                                },
                            ..
                        }
                        | crate::TypeInner::Vector {
                            scalar:
                                crate::Scalar {
                                    kind: crate::ScalarKind::BFloat,
                                    ..
                                },
                            ..
                        } => MathOp::Custom(Instruction::binary(
                            spirv::Op::Dot,
                            result_type_id,
                            id,
                            arg0_id,
                            arg1_id,
                        )),
                        // TODO: consider using integer dot product if VK_KHR_shader_integer_dot_product is available
                        crate::TypeInner::Vector { size, .. } => {
                            self.write_dot_product(
                                id,
                                result_type_id,
                                arg0_id,
                                arg1_id,
                                size as u32,
                                block,
                                |result_id, composite_id, index| {
                                    Instruction::composite_extract(
                                        result_type_id,
                                        result_id,
                                        composite_id,
                                        &[index],
                                    )
                                },
                            );
                            self.cached.set(expr_handle, id)?;
                            return Ok(());
                        }
                        _ => {
                            return Err(Error::Validation(
                                "dot product of an invalid operand type",
                            ));
                        }
                    },
                    fun @ (Mf::IntegerDot
                    | Mf::IntegerDotAccSat
                    | Mf::PackedIntegerDot4x8
                    | Mf::PackedIntegerDot4x8AccSat) => {
                        let packed =
                            matches!(fun, Mf::PackedIntegerDot4x8 | Mf::PackedIntegerDot4x8AccSat);
                        let accumulate =
                            matches!(fun, Mf::IntegerDotAccSat | Mf::PackedIntegerDot4x8AccSat);
                        let right_ty = match arg1 {
                            Some(handle) => {
                                self.fun_info[handle].ty.inner_with(&self.ir_module.types)
                            }
                            None => return Err(Error::Validation("integer dot product operands")),
                        };
                        let left_scalar = arg_ty.scalar();
                        let right_scalar = right_ty.scalar();
                        let (Some(left_scalar), Some(right_scalar)) = (left_scalar, right_scalar)
                        else {
                            return Err(Error::Validation("integer dot product operands"));
                        };
                        let input = if packed {
                            spirv::Capability::DotProductInput4x8BitPacked
                        } else if left_scalar.width == 1
                            && matches!(
                                *arg_ty,
                                crate::TypeInner::Vector {
                                    size: crate::VectorSize::Quad,
                                    ..
                                }
                            )
                        {
                            spirv::Capability::DotProductInput4x8Bit
                        } else {
                            spirv::Capability::DotProductInputAll
                        };
                        self.writer
                            .require_any("integer dot product", &[spirv::Capability::DotProduct])?;
                        self.writer.require_any("integer dot product", &[input])?;
                        if self.writer.lang_version() < (1, 6) {
                            self.writer.use_extension("SPV_KHR_integer_dot_product");
                        }
                        let left_signed = left_scalar.kind == crate::ScalarKind::Sint;
                        let right_signed = right_scalar.kind == crate::ScalarKind::Sint;
                        let (op, first, second) = match (left_signed, right_signed, accumulate) {
                            (false, false, false) => (spirv::Op::UDot, arg0_id, arg1_id),
                            (false, false, true) => (spirv::Op::UDotAccSat, arg0_id, arg1_id),
                            (true, true, false) => (spirv::Op::SDot, arg0_id, arg1_id),
                            (true, true, true) => (spirv::Op::SDotAccSat, arg0_id, arg1_id),
                            (true, false, false) => (spirv::Op::SUDot, arg0_id, arg1_id),
                            (true, false, true) => (spirv::Op::SUDotAccSat, arg0_id, arg1_id),
                            (false, true, false) => (spirv::Op::SUDot, arg1_id, arg0_id),
                            (false, true, true) => (spirv::Op::SUDotAccSat, arg1_id, arg0_id),
                        };
                        let mut instruction =
                            Instruction::binary(op, result_type_id, id, first, second);
                        if accumulate {
                            instruction.add_operand(arg2_id);
                        }
                        if packed {
                            instruction.add_operand(
                                spirv::PackedVectorFormat::PackedVectorFormat4x8Bit as Word,
                            );
                        }
                        MathOp::Custom(instruction)
                    }
                    fun @ (Mf::Dot4I8Packed | Mf::Dot4U8Packed) => {
                        let signed = matches!(fun, Mf::Dot4I8Packed);
                        if self
                            .writer
                            .require_all(&[
                                spirv::Capability::DotProduct,
                                spirv::Capability::DotProductInput4x8BitPacked,
                            ])
                            .is_ok()
                        {
                            // Write optimized code using `PackedVectorFormat4x8Bit`.
                            if self.writer.lang_version() < (1, 6) {
                                // SPIR-V 1.6 supports the required capabilities natively, so the extension
                                // is only required for earlier versions. See right column of
                                // <https://registry.khronos.org/SPIR-V/specs/unified1/SPIRV.html#OpSDot>.
                                self.writer.use_extension("SPV_KHR_integer_dot_product");
                            }

                            let op = if signed {
                                spirv::Op::SDot
                            } else {
                                spirv::Op::UDot
                            };

                            block.body.push(Instruction::ternary(
                                op,
                                result_type_id,
                                id,
                                arg0_id,
                                arg1_id,
                                spirv::PackedVectorFormat::PackedVectorFormat4x8Bit as Word,
                            ));
                        } else {
                            // Fall back to a polyfill since `PackedVectorFormat4x8Bit` is not available.
                            let (extract_op, arg0_id, arg1_id) = if signed {
                                // Convert both packed arguments to signed integers so that we can apply the
                                // `BitFieldSExtract` operation on them in `write_dot_product` below.
                                let new_arg0_id = self.gen_id();
                                block.body.push(Instruction::unary(
                                    spirv::Op::Bitcast,
                                    result_type_id,
                                    new_arg0_id,
                                    arg0_id,
                                ));

                                let new_arg1_id = self.gen_id();
                                block.body.push(Instruction::unary(
                                    spirv::Op::Bitcast,
                                    result_type_id,
                                    new_arg1_id,
                                    arg1_id,
                                ));

                                (spirv::Op::BitFieldSExtract, new_arg0_id, new_arg1_id)
                            } else {
                                (spirv::Op::BitFieldUExtract, arg0_id, arg1_id)
                            };

                            let eight = self.writer.get_constant_scalar(crate::Literal::U32(8));

                            const VEC_LENGTH: u8 = 4;
                            let bit_shifts: [_; VEC_LENGTH as usize] =
                                core::array::from_fn(|index| {
                                    self.writer
                                        .get_constant_scalar(crate::Literal::U32(index as u32 * 8))
                                });

                            self.write_dot_product(
                                id,
                                result_type_id,
                                arg0_id,
                                arg1_id,
                                VEC_LENGTH as Word,
                                block,
                                |result_id, composite_id, index| {
                                    Instruction::ternary(
                                        extract_op,
                                        result_type_id,
                                        result_id,
                                        composite_id,
                                        bit_shifts[index as usize],
                                        eight,
                                    )
                                },
                            );
                        }

                        self.cached.set(expr_handle, id)?;
                        return Ok(());
                    }
                    Mf::Outer => MathOp::Custom(Instruction::binary(
                        spirv::Op::OuterProduct,
                        result_type_id,
                        id,
                        arg0_id,
                        arg1_id,
                    )),
                    Mf::Cross => MathOp::Ext(spirv::GlslStd450Op::Cross),
                    Mf::Distance => MathOp::Ext(spirv::GlslStd450Op::Distance),
                    Mf::Length => MathOp::Ext(spirv::GlslStd450Op::Length),
                    Mf::Normalize => MathOp::Ext(spirv::GlslStd450Op::Normalize),
                    Mf::FaceForward => MathOp::Ext(spirv::GlslStd450Op::FaceForward),
                    Mf::Reflect => MathOp::Ext(spirv::GlslStd450Op::Reflect),
                    Mf::Refract => MathOp::Ext(spirv::GlslStd450Op::Refract),
                    // exponent
                    Mf::Exp => MathOp::Ext(spirv::GlslStd450Op::Exp),
                    Mf::Exp2 => MathOp::Ext(spirv::GlslStd450Op::Exp2),
                    Mf::Log => MathOp::Ext(spirv::GlslStd450Op::Log),
                    Mf::Log2 => MathOp::Ext(spirv::GlslStd450Op::Log2),
                    Mf::Pow => MathOp::Ext(spirv::GlslStd450Op::Pow),
                    // computational
                    Mf::Sign => MathOp::Ext(match arg_scalar_kind {
                        Some(crate::ScalarKind::Float) => spirv::GlslStd450Op::FSign,
                        Some(crate::ScalarKind::Sint) => spirv::GlslStd450Op::SSign,
                        _ => return Err(Error::Validation("sign of a non-signed value")),
                    }),
                    Mf::Fma => MathOp::Ext(spirv::GlslStd450Op::Fma),
                    Mf::Mix => {
                        let Some(selector) = arg2 else {
                            return Err(Error::Validation("mix has no selector"));
                        };
                        let selector_ty =
                            self.fun_info[selector].ty.inner_with(&self.ir_module.types);
                        match (arg_ty, selector_ty) {
                            // if the selector is a scalar, we need to splat it
                            (
                                &crate::TypeInner::Vector { size, .. },
                                &crate::TypeInner::Scalar(scalar),
                            ) => {
                                let selector_type_id =
                                    self.get_numeric_type_id(NumericType::Vector { size, scalar });
                                self.temp_list.clear();
                                self.temp_list.resize(size as usize, arg2_id);

                                let selector_id = self.gen_id();
                                block.body.push(Instruction::composite_construct(
                                    selector_type_id,
                                    selector_id,
                                    &self.temp_list,
                                ));

                                MathOp::Custom(Instruction::ext_inst_gl_op(
                                    self.writer.gl450_ext_inst_id,
                                    spirv::GlslStd450Op::FMix,
                                    result_type_id,
                                    id,
                                    &[arg0_id, arg1_id, selector_id],
                                ))
                            }
                            _ => MathOp::Ext(spirv::GlslStd450Op::FMix),
                        }
                    }
                    Mf::Step => MathOp::Ext(spirv::GlslStd450Op::Step),
                    Mf::SmoothStep => MathOp::Ext(spirv::GlslStd450Op::SmoothStep),
                    Mf::Sqrt => MathOp::Ext(spirv::GlslStd450Op::Sqrt),
                    Mf::InverseSqrt => MathOp::Ext(spirv::GlslStd450Op::InverseSqrt),
                    Mf::Inverse => MathOp::Ext(spirv::GlslStd450Op::MatrixInverse),
                    Mf::Transpose => MathOp::Custom(Instruction::unary(
                        spirv::Op::Transpose,
                        result_type_id,
                        id,
                        arg0_id,
                    )),
                    Mf::Determinant => MathOp::Ext(spirv::GlslStd450Op::Determinant),
                    Mf::ReverseBits => MathOp::Custom(Instruction::unary(
                        spirv::Op::BitReverse,
                        result_type_id,
                        id,
                        arg0_id,
                    )),
                    Mf::CountTrailingZeros => {
                        let uint_id = match *arg_ty {
                            crate::TypeInner::Vector { size, scalar } => {
                                let ty =
                                    LocalType::Numeric(NumericType::Vector { size, scalar }).into();

                                self.temp_list.clear();
                                self.temp_list.resize(
                                    size as _,
                                    self.writer
                                        .get_constant_scalar_with(scalar.width * 8, scalar)?,
                                );

                                self.writer.get_constant_composite(ty, &self.temp_list)?
                            }
                            crate::TypeInner::Scalar(scalar) => self
                                .writer
                                .get_constant_scalar_with(scalar.width * 8, scalar)?,
                            _ => {
                                return Err(Error::Validation(
                                    "countTrailingZeros of a non-integer value",
                                ));
                            }
                        };

                        let lsb_id = self.gen_id();
                        block.body.push(Instruction::ext_inst_gl_op(
                            self.writer.gl450_ext_inst_id,
                            spirv::GlslStd450Op::FindILsb,
                            result_type_id,
                            lsb_id,
                            &[arg0_id],
                        ));

                        MathOp::Custom(Instruction::ext_inst_gl_op(
                            self.writer.gl450_ext_inst_id,
                            spirv::GlslStd450Op::UMin,
                            result_type_id,
                            id,
                            &[uint_id, lsb_id],
                        ))
                    }
                    Mf::CountLeadingZeros => {
                        let (int_type_id, int_id, width) = match *arg_ty {
                            crate::TypeInner::Vector { size, scalar } => {
                                let ty =
                                    LocalType::Numeric(NumericType::Vector { size, scalar }).into();

                                self.temp_list.clear();
                                self.temp_list.resize(
                                    size as _,
                                    self.writer
                                        .get_constant_scalar_with(scalar.width * 8 - 1, scalar)?,
                                );

                                (
                                    self.get_type_id(ty)?,
                                    self.writer.get_constant_composite(ty, &self.temp_list)?,
                                    scalar.width,
                                )
                            }
                            crate::TypeInner::Scalar(scalar) => (
                                self.get_numeric_type_id(NumericType::Scalar(scalar)),
                                self.writer
                                    .get_constant_scalar_with(scalar.width * 8 - 1, scalar)?,
                                scalar.width,
                            ),
                            _ => {
                                return Err(Error::Validation(
                                    "countLeadingZeros of a non-integer value",
                                ));
                            }
                        };

                        if width != 4 {
                            return Err(Error::FeatureNotImplemented(
                                "countLeadingZeros of a non-32-bit integer",
                            ));
                        };

                        let msb_id = self.gen_id();
                        block.body.push(Instruction::ext_inst_gl_op(
                            self.writer.gl450_ext_inst_id,
                            if width != 4 {
                                spirv::GlslStd450Op::FindILsb
                            } else {
                                spirv::GlslStd450Op::FindUMsb
                            },
                            int_type_id,
                            msb_id,
                            &[arg0_id],
                        ));

                        MathOp::Custom(Instruction::binary(
                            spirv::Op::ISub,
                            result_type_id,
                            id,
                            int_id,
                            msb_id,
                        ))
                    }
                    Mf::CountOneBits => MathOp::Custom(Instruction::unary(
                        spirv::Op::BitCount,
                        result_type_id,
                        id,
                        arg0_id,
                    )),
                    Mf::ExtractBits => {
                        let op = match arg_scalar_kind {
                            Some(crate::ScalarKind::Uint) => spirv::Op::BitFieldUExtract,
                            Some(crate::ScalarKind::Sint) => spirv::Op::BitFieldSExtract,
                            _ => {
                                return Err(Error::Validation(
                                    "bitfieldExtract of a non-integer value",
                                ));
                            }
                        };
                        MathOp::Custom(Instruction::ternary(
                            op,
                            result_type_id,
                            id,
                            arg0_id,
                            arg1_id,
                            arg2_id,
                        ))
                    }
                    Mf::InsertBits => MathOp::Custom(Instruction::quaternary(
                        spirv::Op::BitFieldInsert,
                        result_type_id,
                        id,
                        arg0_id,
                        arg1_id,
                        arg2_id,
                        arg3_id,
                    )),
                    Mf::AddCarry | Mf::SubBorrow | Mf::MulExtended => {
                        let op = match (fun, arg_scalar_kind) {
                            (Mf::AddCarry, _) => spirv::Op::IAddCarry,
                            (Mf::SubBorrow, _) => spirv::Op::ISubBorrow,
                            (_, Some(crate::ScalarKind::Sint)) => spirv::Op::SMulExtended,
                            _ => spirv::Op::UMulExtended,
                        };
                        MathOp::Custom(Instruction::binary(
                            op,
                            result_type_id,
                            id,
                            arg0_id,
                            arg1_id,
                        ))
                    }
                    Mf::FirstTrailingBit => MathOp::Ext(spirv::GlslStd450Op::FindILsb),
                    Mf::FirstLeadingBit => match arg_scalar_kind {
                        Some(crate::ScalarKind::Uint) => MathOp::Ext(spirv::GlslStd450Op::FindUMsb),
                        Some(crate::ScalarKind::Sint) => MathOp::Ext(spirv::GlslStd450Op::FindSMsb),
                        _ => return Err(Error::Validation("firstLeadingBit argument")),
                    },
                    Mf::Pack4x8unorm => MathOp::Ext(spirv::GlslStd450Op::PackUnorm4x8),
                    Mf::Pack4x8snorm => MathOp::Ext(spirv::GlslStd450Op::PackSnorm4x8),
                    Mf::Pack2x16float => MathOp::Ext(spirv::GlslStd450Op::PackHalf2x16),
                    Mf::Pack2x16unorm => MathOp::Ext(spirv::GlslStd450Op::PackUnorm2x16),
                    Mf::Pack2x16snorm => MathOp::Ext(spirv::GlslStd450Op::PackSnorm2x16),
                    Mf::PackDouble2x32 => MathOp::Ext(spirv::GlslStd450Op::PackDouble2x32),
                    fun @ (Mf::Pack4xI8 | Mf::Pack4xU8 | Mf::Pack4xI8Clamp | Mf::Pack4xU8Clamp) => {
                        let is_signed = matches!(fun, Mf::Pack4xI8 | Mf::Pack4xI8Clamp);
                        let should_clamp = matches!(fun, Mf::Pack4xI8Clamp | Mf::Pack4xU8Clamp);

                        let last_instruction =
                            if self.writer.require_all(&[spirv::Capability::Int8]).is_ok() {
                                self.write_pack4x8_optimized(
                                    block,
                                    result_type_id,
                                    arg0_id,
                                    id,
                                    is_signed,
                                    should_clamp,
                                )
                            } else {
                                self.write_pack4x8_polyfill(
                                    block,
                                    result_type_id,
                                    arg0_id,
                                    id,
                                    is_signed,
                                    should_clamp,
                                )
                            };

                        MathOp::Custom(last_instruction)
                    }
                    Mf::Unpack4x8unorm => MathOp::Ext(spirv::GlslStd450Op::UnpackUnorm4x8),
                    Mf::Unpack4x8snorm => MathOp::Ext(spirv::GlslStd450Op::UnpackSnorm4x8),
                    Mf::Unpack2x16float => MathOp::Ext(spirv::GlslStd450Op::UnpackHalf2x16),
                    Mf::Unpack2x16unorm => MathOp::Ext(spirv::GlslStd450Op::UnpackUnorm2x16),
                    Mf::Unpack2x16snorm => MathOp::Ext(spirv::GlslStd450Op::UnpackSnorm2x16),
                    Mf::UnpackDouble2x32 => MathOp::Ext(spirv::GlslStd450Op::UnpackDouble2x32),
                    fun @ (Mf::Unpack4xI8 | Mf::Unpack4xU8) => {
                        let is_signed = matches!(fun, Mf::Unpack4xI8);

                        let last_instruction =
                            if self.writer.require_all(&[spirv::Capability::Int8]).is_ok() {
                                self.write_unpack4x8_optimized(
                                    block,
                                    result_type_id,
                                    arg0_id,
                                    id,
                                    is_signed,
                                )
                            } else {
                                self.write_unpack4x8_polyfill(
                                    block,
                                    result_type_id,
                                    arg0_id,
                                    id,
                                    is_signed,
                                )
                            };

                        MathOp::Custom(last_instruction)
                    }
                };

                block.body.push(match math_op {
                    MathOp::Ext(op) => Instruction::ext_inst_gl_op(
                        self.writer.gl450_ext_inst_id,
                        op,
                        result_type_id,
                        id,
                        &[arg0_id, arg1_id, arg2_id, arg3_id][..fun.argument_count()],
                    ),
                    MathOp::Custom(inst) => inst,
                });
                id
            }
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
            | crate::Expression::SpirvInstructionResult { .. } => self.cached.get(expr_handle)?,
            crate::Expression::InterpolateAt { pointer, location } => {
                self.writer.require_any(
                    "interpolation functions",
                    &[spirv::Capability::InterpolationFunction],
                )?;
                let pointer_id =
                    self.write_access_chain(pointer, block, AccessTypeAdjustment::None)?;
                let (op, operand) = match location {
                    crate::InterpolationLocation::Centroid => {
                        (spirv::GlslStd450Op::InterpolateAtCentroid, None)
                    }
                    crate::InterpolationLocation::Sample(sample) => (
                        spirv::GlslStd450Op::InterpolateAtSample,
                        Some(self.cached.get(sample)?),
                    ),
                    crate::InterpolationLocation::Offset(offset) => (
                        spirv::GlslStd450Op::InterpolateAtOffset,
                        Some(self.cached.get(offset)?),
                    ),
                };
                let offset = match location {
                    crate::InterpolationLocation::Offset(offset) => Some(offset),
                    _ => None,
                };
                if [Some(expr_handle), offset]
                    .into_iter()
                    .flatten()
                    .any(|handle| self.is_half(handle))
                {
                    self.writer.use_extension(SPV_AMD_GPU_SHADER_HALF_FLOAT);
                }
                let id = self.gen_id();
                let mut operands = alloc::vec![pointer_id];
                operands.extend(operand);
                block.body.push(Instruction::ext_inst_gl_op(
                    self.writer.gl450_ext_inst_id,
                    op,
                    result_type_id,
                    id,
                    &operands,
                ));
                id
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
                image,
                coordinate,
                granularity,
                coarse,
                level,
                min_lod,
                block,
            )?,
            crate::Expression::FragmentFetch {
                image,
                coordinate,
                fragment,
            } => {
                self.writer.use_extension("SPV_AMD_shader_fragment_mask");
                self.writer
                    .require_any("fragment mask", &[spirv::Capability::FragmentMaskAMD])?;
                let image_id = self.get_image_id(image, block)?;
                let id = self.gen_id();
                let mut instruction = Instruction::new(match fragment {
                    None => spirv::Op::FragmentMaskFetchAMD,
                    Some(_) => spirv::Op::FragmentFetchAMD,
                });
                instruction.set_type(result_type_id);
                instruction.set_result(id);
                instruction.add_operand(image_id);
                instruction.add_operand(self.cached.get(coordinate)?);
                if let Some(fragment) = fragment {
                    instruction.add_operand(self.cached.get(fragment)?);
                }
                block.body.push(instruction);
                id
            }
            crate::Expression::AttachmentRead { aspect, sample } => {
                self.write_attachment_read(aspect, sample, result_type_id, block)?
            }
            crate::Expression::ReadClock { source, .. } => {
                let id = self.gen_id();
                let scope = match source {
                    crate::ClockSource::Subgroup => Some(spirv::Scope::Subgroup),
                    crate::ClockSource::Device => Some(spirv::Scope::Device),
                    crate::ClockSource::AmdTime => None,
                };
                match scope {
                    Some(scope) => {
                        self.writer.use_extension("SPV_KHR_shader_clock");
                        self.writer
                            .require_any("clock reads", &[spirv::Capability::ShaderClockKHR])?;
                        let scope_id = self.get_scope_constant(scope as u32);
                        let mut instruction = Instruction::new(spirv::Op::ReadClockKHR);
                        instruction.set_type(result_type_id);
                        instruction.set_result(id);
                        instruction.add_operand(scope_id);
                        block.body.push(instruction);
                    }
                    None => {
                        let set = self.writer.spirv_ext_import(SPV_AMD_GCN_SHADER);
                        block.body.push(Instruction::ext_inst(
                            set,
                            AMD_TIME,
                            result_type_id,
                            id,
                            &[],
                        ));
                    }
                }
                id
            }
            crate::Expression::IsHelperInvocation => {
                self.writer.require_demote()?;
                let id = self.gen_id();
                block
                    .body
                    .push(Instruction::is_helper_invocation(result_type_id, id));
                id
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
                image,
                coordinate,
                array_index,
                level,
                sample,
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
                image,
                sampler,
                gather.map(|component| (component, gather_pattern)),
                coordinate,
                array_index,
                offset,
                level,
                depth_ref,
                min_lod,
                sparse.is_some(),
                block,
            )?,
            crate::Expression::ImageSparseResident { code } => {
                self.writer
                    .require_any("sparse residency", &[spirv::Capability::SparseResidency])?;
                let id = self.gen_id();
                let code_id = self.cached.get(code)?;
                block.body.push(Instruction::unary(
                    spirv::Op::ImageSparseTexelsResident,
                    result_type_id,
                    id,
                    code_id,
                ));
                id
            }
            crate::Expression::Select {
                condition,
                accept,
                reject,
            } => {
                let id = self.gen_id();
                let mut condition_id = self.cached.get(condition)?;
                let accept_id = self.cached.get(accept)?;
                let reject_id = self.cached.get(reject)?;

                let condition_ty = self.fun_info[condition]
                    .ty
                    .inner_with(&self.ir_module.types);
                let object_ty = self.fun_info[accept].ty.inner_with(&self.ir_module.types);

                if let (
                    &crate::TypeInner::Scalar(
                        condition_scalar @ crate::Scalar {
                            kind: crate::ScalarKind::Bool,
                            ..
                        },
                    ),
                    &crate::TypeInner::Vector { size, .. },
                    true,
                ) = (condition_ty, object_ty, self.writer.lang_version() < (1, 4))
                {
                    self.temp_list.clear();
                    self.temp_list.resize(size as usize, condition_id);

                    let bool_vector_type_id = self.get_numeric_type_id(NumericType::Vector {
                        size,
                        scalar: condition_scalar,
                    });

                    let id = self.gen_id();
                    block.body.push(Instruction::composite_construct(
                        bool_vector_type_id,
                        id,
                        &self.temp_list,
                    ));
                    condition_id = id;
                }

                let instruction =
                    Instruction::select(result_type_id, id, condition_id, accept_id, reject_id);
                block.body.push(instruction);
                id
            }
            crate::Expression::Derivative { axis, ctrl, expr } => {
                use crate::{DerivativeAxis as Axis, DerivativeControl as Ctrl};
                match ctrl {
                    Ctrl::Coarse | Ctrl::Fine => {
                        self.writer.require_any(
                            "DerivativeControl",
                            &[spirv::Capability::DerivativeControl],
                        )?;
                    }
                    Ctrl::None => {}
                }
                if self.is_half(expr) {
                    self.writer.use_extension(SPV_AMD_GPU_SHADER_HALF_FLOAT);
                }
                let id = self.gen_id();
                let expr_id = self.cached.get(expr)?;
                let op = match (axis, ctrl) {
                    (Axis::X, Ctrl::Coarse) => spirv::Op::DPdxCoarse,
                    (Axis::X, Ctrl::Fine) => spirv::Op::DPdxFine,
                    (Axis::X, Ctrl::None) => spirv::Op::DPdx,
                    (Axis::Y, Ctrl::Coarse) => spirv::Op::DPdyCoarse,
                    (Axis::Y, Ctrl::Fine) => spirv::Op::DPdyFine,
                    (Axis::Y, Ctrl::None) => spirv::Op::DPdy,
                    (Axis::Width, Ctrl::Coarse) => spirv::Op::FwidthCoarse,
                    (Axis::Width, Ctrl::Fine) => spirv::Op::FwidthFine,
                    (Axis::Width, Ctrl::None) => spirv::Op::Fwidth,
                };
                block
                    .body
                    .push(Instruction::derivative(op, result_type_id, id, expr_id));
                id
            }
            crate::Expression::ImageQuery { image, query } => {
                self.write_image_query(result_type_id, image, query, block)?
            }
            crate::Expression::Relational { fun, argument } => {
                use crate::RelationalFunction as Rf;
                let arg_id = self.cached.get(argument)?;
                let op = match fun {
                    Rf::All => spirv::Op::All,
                    Rf::Any => spirv::Op::Any,
                    Rf::IsNan => spirv::Op::IsNan,
                    Rf::IsInf => spirv::Op::IsInf,
                };
                let id = self.gen_id();
                block
                    .body
                    .push(Instruction::relational(op, result_type_id, id, arg_id));
                id
            }
            crate::Expression::ArrayLength(expr) => self.write_runtime_array_length(expr, block)?,
            crate::Expression::WideArrayLength(expr) => {
                self.write_typed_array_length(expr, result_type_id, block)?
            }
            crate::Expression::PhysicalPointer { value, ty: _ } => {
                if matches!(
                    self.ir_function.expressions[value],
                    crate::Expression::Access { .. } | crate::Expression::AccessIndex { .. }
                ) {
                    {
                        let pointer_id =
                            self.write_access_chain(value, block, AccessTypeAdjustment::None)?;
                        self.cached.set(value, pointer_id)?;
                    }
                }
                self.write_physical_pointer(value, result_type_id, block)?
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
                acceleration_structure,
                instance_id,
                geometry_index,
                primitive_index,
                barycentric,
                value,
                result_type_id,
                block,
            )?,
            crate::Expression::AccelerationStructureFromAddress { address } => {
                let address_id = self.cached.get(address)?;
                let id = self.gen_id();
                block.body.push(Instruction::unary(
                    spirv::Op::ConvertUToAccelerationStructureKHR,
                    result_type_id,
                    id,
                    address_id,
                ));
                id
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
            crate::Expression::CooperativeMatrixResult { .. } => self.cached.get(expr_handle)?,
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
        let shared = matches!(
            self.ir_function.expressions[expr_handle],
            crate::Expression::Literal(_)
                | crate::Expression::Constant(_)
                | crate::Expression::Override(_)
                | crate::Expression::ZeroValue(_)
                | crate::Expression::GlobalVariable(_)
                | crate::Expression::LocalVariable(_)
                | crate::Expression::FunctionArgument(_)
        );
        !shared
            && !self.expression_constness.is_const(expr_handle)
            && !self.expression_constness.is_specialized(expr_handle)
    }

    fn tensor_array_capability(
        &mut self,
        base: Handle<crate::Expression>,
        index: Handle<crate::Expression>,
        non_uniform: bool,
    ) -> Result<(), Error> {
        use spirv::Capability as Cap;
        let mut ty = self.fun_info[base].ty.inner_with(&self.ir_module.types);
        if let crate::TypeInner::Pointer { base, .. } = *ty {
            ty = &self.ir_module.types[base].inner;
        }
        let crate::TypeInner::BindingArray { base: element, .. } = *ty else {
            return Ok(());
        };
        if !matches!(
            self.ir_module.types[element].inner,
            crate::TypeInner::Tensor { .. }
        ) || self.expression_constness.is_const(index)
        {
            return Ok(());
        }
        let capability = if non_uniform {
            Cap::StorageTensorArrayNonUniformIndexingARM
        } else {
            Cap::StorageTensorArrayDynamicIndexingARM
        };
        self.writer
            .require_any("dynamic indexing of tensor arrays", &[capability])
    }

    fn binding_array_capability(
        &mut self,
        base: Handle<crate::Expression>,
        non_uniform: bool,
    ) -> Result<(), Error> {
        use spirv::Capability as Cap;
        let mut ty = self.fun_info[base].ty.inner_with(&self.ir_module.types);
        let mut space = None;
        if let crate::TypeInner::Pointer {
            base,
            space: pointer_space,
        } = *ty
        {
            ty = &self.ir_module.types[base].inner;
            space = Some(pointer_space);
        }
        let element = match *ty {
            crate::TypeInner::BindingArray { base: element, .. } => element,
            crate::TypeInner::Array { base: element, .. }
                if matches!(space, Some(crate::AddressSpace::DescriptorHeap(_))) =>
            {
                match self.ir_module.types[element].inner {
                    crate::TypeInner::BufferDescriptor {
                        base,
                        space: buffer,
                    } => {
                        space = Some(buffer);
                        base
                    }
                    _ => element,
                }
            }
            _ => return Ok(()),
        };
        let buffer = |dim| dim == crate::ImageDimension::Buffer;
        let (dynamic, nonuniform) = match self.ir_module.types[element].inner {
            crate::TypeInner::Image {
                dim: crate::ImageDimension::Subpass,
                ..
            } => (
                Some(Cap::InputAttachmentArrayDynamicIndexing),
                Cap::InputAttachmentArrayNonUniformIndexing,
            ),
            crate::TypeInner::Image {
                dim,
                class: crate::ImageClass::Storage { .. },
                ..
            } if buffer(dim) => (
                Some(Cap::StorageTexelBufferArrayDynamicIndexing),
                Cap::StorageTexelBufferArrayNonUniformIndexing,
            ),
            crate::TypeInner::Image { dim, .. } | crate::TypeInner::SampledImage { dim, .. }
                if buffer(dim) =>
            {
                (
                    Some(Cap::UniformTexelBufferArrayDynamicIndexing),
                    Cap::UniformTexelBufferArrayNonUniformIndexing,
                )
            }
            crate::TypeInner::Image {
                class: crate::ImageClass::Storage { .. },
                ..
            } => (None, Cap::StorageImageArrayNonUniformIndexing),
            crate::TypeInner::Image { .. } | crate::TypeInner::SampledImage { .. } => {
                (None, Cap::SampledImageArrayNonUniformIndexing)
            }
            crate::TypeInner::Struct { .. } => match space {
                Some(crate::AddressSpace::Storage { .. }) => {
                    (None, Cap::StorageBufferArrayNonUniformIndexing)
                }
                Some(crate::AddressSpace::Uniform) => {
                    (None, Cap::UniformBufferArrayNonUniformIndexing)
                }
                _ => return Ok(()),
            },
            _ => return Ok(()),
        };
        if non_uniform {
            self.writer
                .require_descriptor_indexing("non-uniform indexing of binding arrays", nonuniform)
        } else if let Some(dynamic) = dynamic {
            self.writer
                .require_descriptor_indexing("dynamic indexing of binding arrays", dynamic)
        } else {
            Ok(())
        }
    }

    /// Helper which focuses on generating the `As` expressions and the various conversions
    /// that need to happen because of that.
    fn write_as_expression(
        &mut self,
        expr: Handle<crate::Expression>,
        convert: Option<u8>,
        kind: crate::ScalarKind,

        block: &mut Block,
        result_type_id: u32,
    ) -> Result<u32, Error> {
        use crate::ScalarKind as Sk;
        let expr_id = self.cached.get(expr)?;
        let ty = self.fun_info[expr].ty.inner_with(&self.ir_module.types);

        let small = |kind: crate::ScalarKind| kind.is_encoded_float();
        if let crate::TypeInner::Scalar(scalar) | crate::TypeInner::Vector { scalar, .. } = *ty
            && (small(scalar.kind) || small(kind))
        {
            return self.write_cooperative_cast(
                expr,
                scalar,
                (kind, convert),
                block,
                result_type_id,
            );
        }
        if let crate::TypeInner::LongVector { scalar, .. }
        | crate::TypeInner::CooperativeMatrix { scalar, .. } = *ty
        {
            return self.write_cooperative_cast(
                expr,
                scalar,
                (kind, convert),
                block,
                result_type_id,
            );
        }

        // Matrix casts needs special treatment in SPIR-V, as the cast functions
        // can take vectors or scalars, but not matrices. In order to cast a matrix
        // we need to cast each column of the matrix individually and construct a new
        // matrix from the converted columns.
        if let crate::TypeInner::Matrix {
            columns,
            rows,
            scalar,
        } = *ty
        {
            let Some(convert) = convert else {
                // No conversion needs to be done, passes through.
                return Ok(expr_id);
            };

            if convert == scalar.width {
                // No conversion needs to be done, passes through.
                return Ok(expr_id);
            }

            if kind != Sk::Float {
                // Only float conversions are supported for matrices.
                return Err(Error::Validation("Matrices must be floats"));
            }

            // Type of each extracted column
            let column_src_ty = self.get_localtype_id(LocalType::Numeric(NumericType::Vector {
                size: rows,
                scalar,
            }));

            // Type of the column after conversion
            let column_dst_ty = self.get_localtype_id(LocalType::Numeric(NumericType::Vector {
                size: rows,
                scalar: crate::Scalar {
                    kind,
                    width: convert,
                },
            }));

            let mut components = ArrayVec::<Word, 4>::new();

            for column in 0..columns as usize {
                let column_id = self.gen_id();
                block.body.push(Instruction::composite_extract(
                    column_src_ty,
                    column_id,
                    expr_id,
                    &[column as u32],
                ));

                let column_conv_id = self.gen_id();
                block.body.push(Instruction::unary(
                    spirv::Op::FConvert,
                    column_dst_ty,
                    column_conv_id,
                    column_id,
                ));

                components.push(column_conv_id);
            }

            let construct_id = self.gen_id();

            block.body.push(Instruction::composite_construct(
                result_type_id,
                construct_id,
                &components,
            ));

            return Ok(construct_id);
        }

        let (src_scalar, src_size) = match *ty {
            crate::TypeInner::Scalar(scalar) => (scalar, None),
            crate::TypeInner::Vector { scalar, size } => (scalar, Some(size)),
            ref other => {
                log::error!("As source {other:?}");
                return Err(Error::Validation("Unexpected Expression::As source"));
            }
        };

        enum Cast {
            Identity(Word),
            Unary(spirv::Op, Word),
            Binary(spirv::Op, Word, Word),
            Ternary(spirv::Op, Word, Word, Word),
            Resized(spirv::Op, Word, Word),
        }
        let cast = match (src_scalar.kind, kind, convert) {
            // Filter out identity casts. Some Adreno drivers are
            // confused by no-op OpBitCast instructions.
            (src_kind, kind, convert)
                if src_kind == kind
                    && convert.filter(|&width| width != src_scalar.width).is_none() =>
            {
                Cast::Identity(expr_id)
            }
            (Sk::Bool, Sk::Bool, _) => Cast::Unary(spirv::Op::CopyObject, expr_id),
            (_, _, None) => Cast::Unary(spirv::Op::Bitcast, expr_id),
            // casting to a bool - generate `OpXxxNotEqual`
            (_, Sk::Bool, Some(_)) => {
                let op = match src_scalar.kind {
                    Sk::Sint | Sk::Uint => spirv::Op::INotEqual,
                    Sk::Float => spirv::Op::FUnordNotEqual,
                    Sk::Bool
                    | Sk::BFloat
                    | Sk::FloatE4M3
                    | Sk::FloatE5M2
                    | Sk::FloatE2M1
                    | Sk::FloatE3M2
                    | Sk::FloatE2M3
                    | Sk::FloatUE8M0
                    | Sk::FloatMXINT8 => {
                        return Err(Error::Validation(
                            "conversion to bool from a non-numeric value",
                        ));
                    }
                };
                let zero_scalar_id = self.writer.get_constant_scalar_with(0, src_scalar)?;
                let zero_id = match src_size {
                    Some(size) => {
                        let ty = LocalType::Numeric(NumericType::Vector {
                            size,
                            scalar: src_scalar,
                        })
                        .into();

                        self.temp_list.clear();
                        self.temp_list.resize(size as _, zero_scalar_id);

                        self.writer.get_constant_composite(ty, &self.temp_list)?
                    }
                    None => zero_scalar_id,
                };

                Cast::Binary(op, expr_id, zero_id)
            }
            // casting from a bool - generate `OpSelect`
            (Sk::Bool, _, Some(dst_width)) => {
                let dst_scalar = crate::Scalar {
                    kind,
                    width: dst_width,
                };
                let zero_scalar_id = self.writer.get_constant_scalar_with(0, dst_scalar)?;
                let one_scalar_id = self.writer.get_constant_scalar_with(1, dst_scalar)?;
                let (accept_id, reject_id) = match src_size {
                    Some(size) => {
                        let ty = LocalType::Numeric(NumericType::Vector {
                            size,
                            scalar: dst_scalar,
                        })
                        .into();

                        self.temp_list.clear();
                        self.temp_list.resize(size as _, zero_scalar_id);

                        let vec0_id = self.writer.get_constant_composite(ty, &self.temp_list)?;

                        self.temp_list.fill(one_scalar_id);

                        let vec1_id = self.writer.get_constant_composite(ty, &self.temp_list)?;

                        (vec1_id, vec0_id)
                    }
                    None => (one_scalar_id, zero_scalar_id),
                };

                Cast::Ternary(spirv::Op::Select, expr_id, accept_id, reject_id)
            }
            (Sk::Float, Sk::Sint, Some(_)) => Cast::Unary(spirv::Op::ConvertFToS, expr_id),
            (Sk::Float, Sk::Uint, Some(_)) => Cast::Unary(spirv::Op::ConvertFToU, expr_id),
            (Sk::Float, Sk::Float, Some(dst_width)) if src_scalar.width != dst_width => {
                Cast::Unary(spirv::Op::FConvert, expr_id)
            }
            (Sk::Sint, Sk::Float, Some(_)) => Cast::Unary(spirv::Op::ConvertSToF, expr_id),
            (Sk::Sint, Sk::Sint, Some(dst_width)) if src_scalar.width != dst_width => {
                Cast::Unary(spirv::Op::SConvert, expr_id)
            }
            (Sk::Uint, Sk::Float, Some(_)) => Cast::Unary(spirv::Op::ConvertUToF, expr_id),
            (Sk::Uint, Sk::Uint, Some(dst_width)) if src_scalar.width != dst_width => {
                Cast::Unary(spirv::Op::UConvert, expr_id)
            }
            (Sk::Uint, Sk::Sint, Some(dst_width)) | (Sk::Sint, Sk::Uint, Some(dst_width))
                if src_scalar.width != dst_width =>
            {
                let op = if src_scalar.kind == Sk::Sint {
                    spirv::Op::SConvert
                } else {
                    spirv::Op::UConvert
                };
                let scalar = crate::Scalar {
                    kind: src_scalar.kind,
                    width: dst_width,
                };
                let resized = match src_size {
                    Some(size) => NumericType::Vector { size, scalar },
                    None => NumericType::Scalar(scalar),
                };
                Cast::Resized(op, self.writer.get_numeric_type_id(resized), expr_id)
            }
            // We assume it's either an identity cast, or int-uint.
            _ => Cast::Unary(spirv::Op::Bitcast, expr_id),
        };
        Ok(match cast {
            Cast::Identity(expr) => expr,
            Cast::Unary(op, op1) => {
                let id = self.gen_id();
                block
                    .body
                    .push(Instruction::unary(op, result_type_id, id, op1));
                id
            }
            Cast::Binary(op, op1, op2) => {
                let id = self.gen_id();
                block
                    .body
                    .push(Instruction::binary(op, result_type_id, id, op1, op2));
                id
            }
            Cast::Ternary(op, op1, op2, op3) => {
                let id = self.gen_id();
                block
                    .body
                    .push(Instruction::ternary(op, result_type_id, id, op1, op2, op3));
                id
            }
            Cast::Resized(op, resized_type_id, op1) => {
                let resized_id = self.gen_id();
                block
                    .body
                    .push(Instruction::unary(op, resized_type_id, resized_id, op1));
                let id = self.gen_id();
                block.body.push(Instruction::unary(
                    spirv::Op::Bitcast,
                    result_type_id,
                    id,
                    resized_id,
                ));
                id
            }
        })
    }

    /// Build an `OpAccessChain` instruction.
    ///
    /// Emit any needed bounds-checking expressions to `block`.
    ///
    /// Give the `OpAccessChain` a result type based on `expr_handle`, adjusted
    /// according to `type_adjustment`; see the documentation for
    /// [`AccessTypeAdjustment`] for details.
    pub(super) fn write_access_chain(
        &mut self,
        mut expr_handle: Handle<crate::Expression>,
        block: &mut Block,
        type_adjustment: AccessTypeAdjustment,
    ) -> Result<Word, Error> {
        let non_uniform_access = self
            .non_uniform(expr_handle)
            .contains(crate::NonUniform::ACCESS);
        let result_type_id = {
            let resolution = &self.fun_info[expr_handle].ty;
            match type_adjustment {
                AccessTypeAdjustment::None => self.writer.get_expression_type_id(resolution)?,
                AccessTypeAdjustment::IntroducePointer(class) => {
                    self.writer.get_resolution_pointer_id(resolution, class)?
                }
            }
        };

        self.temp_list.clear();
        let mut heap_root = None;
        let root_id = loop {
            // If `expr_handle` was spilled, then the temporary variable has exactly
            // the value we want to start from.
            if let Some(spilled) = self.function.spilled_composites.get(&expr_handle) {
                // The root id of the `OpAccessChain` instruction is the temporary
                // variable we spilled the composite to.
                break spilled.id;
            }

            expr_handle = match self.ir_function.expressions[expr_handle] {
                crate::Expression::Access { base, index } => {
                    let non_uniform_index = self
                        .non_uniform(expr_handle)
                        .contains(crate::NonUniform::ACCESS)
                        && !self.non_uniform(base).contains(crate::NonUniform::ACCESS);
                    self.binding_array_capability(base, non_uniform_index)?;
                    self.tensor_array_capability(base, index, non_uniform_index)?;
                    let index = GuardedIndex::Expression(index);
                    let index_id = self.write_access_chain_index(index)?;
                    self.temp_list.push(index_id);

                    base
                }
                crate::Expression::AccessIndex { base, index } => {
                    // Decide whether we're indexing a struct (bounds checks
                    // forbidden) or anything else (bounds checks required).
                    let mut base_ty = self.fun_info[base].ty.inner_with(&self.ir_module.types);
                    if let crate::TypeInner::Pointer { base, .. } = *base_ty {
                        base_ty = &self.ir_module.types[base].inner;
                    }
                    match *base_ty {
                        crate::TypeInner::Struct { .. } => {
                            let index_id = self.get_index_constant(index);
                            self.temp_list.push(index_id);
                        }
                        _ => {
                            // Even though the index value is statically known, `base`
                            // may be a runtime-sized array, so we still need to go
                            // through the bounds check process.
                            let index_id =
                                self.write_access_chain_index(GuardedIndex::Known(index))?;
                            self.temp_list.push(index_id);
                        }
                    }
                    base
                }
                crate::Expression::GlobalVariable(handle) => {
                    if self.heap_global(expr_handle).is_some() {
                        heap_root = Some((handle, None));
                    }
                    let gv = &self.writer.global_variables[handle];
                    break gv.access_id;
                }
                crate::Expression::HeapOffset { pointer, offset } => {
                    let handle = self
                        .heap_global(pointer)
                        .ok_or(Error::Validation("a heap offset of a non-heap pointer"))?;
                    heap_root = Some((handle, Some(offset)));
                    break 0;
                }
                crate::Expression::BufferPointer { .. } => {
                    break self.cached.get(expr_handle)?;
                }
                crate::Expression::LocalVariable(variable) => {
                    let local_var = &self.function.variables[&variable];
                    break local_var.id;
                }
                crate::Expression::FunctionArgument(index) => {
                    break self.function.parameter_id(index)?;
                }
                _ if matches!(
                    *self.fun_info[expr_handle]
                        .ty
                        .inner_with(&self.ir_module.types),
                    crate::TypeInner::Pointer {
                        space: crate::AddressSpace::PhysicalStorage { .. },
                        ..
                    }
                ) =>
                {
                    break self.cached.get(expr_handle)?;
                }
                _ => return Err(Error::Validation("unexpected pointer expression")),
            }
        };

        if let Some((global, offset)) = heap_root {
            self.temp_list.reverse();
            let indices = core::mem::take(&mut self.temp_list);
            let pointer_id =
                self.write_heap_chain(global, offset, result_type_id, &indices, block)?;
            self.temp_list = indices;
            if non_uniform_access {
                self.writer.decorate_non_uniform(pointer_id)?;
            }
            return Ok(pointer_id);
        }
        let expr_pointer = if self.temp_list.is_empty() {
            root_id
        } else {
            self.temp_list.reverse();
            let pointer_id = self.gen_id();
            let access =
                Instruction::access_chain(result_type_id, pointer_id, root_id, &self.temp_list);
            if non_uniform_access {
                self.writer.decorate_non_uniform(pointer_id)?;
            }
            block.body.push(access);
            pointer_id
        };
        Ok(expr_pointer)
    }

    fn write_access_chain_index(&mut self, index: GuardedIndex) -> Result<Word, Error> {
        match self.write_bounds_check(index)? {
            BoundsCheckResult::KnownInBounds(known_index) => {
                let scalar = crate::Literal::U32(known_index);
                Ok(self.writer.get_constant_scalar(scalar))
            }
            BoundsCheckResult::Computed(computed_index_id) => Ok(computed_index_id),
        }
    }

    fn write_checked_load(
        &mut self,
        pointer: Handle<crate::Expression>,
        block: &mut Block,
        access_type_adjustment: AccessTypeAdjustment,
        result_type_id: Word,
    ) -> Result<Word, Error> {
        let class = match access_type_adjustment {
            AccessTypeAdjustment::IntroducePointer(class) => Some(class),
            AccessTypeAdjustment::None => self.pointer_class(pointer),
        };
        let heap = matches!(
            *self.fun_info[pointer].ty.inner_with(&self.ir_module.types),
            crate::TypeInner::Pointer {
                space: crate::AddressSpace::DescriptorHeap(_),
                ..
            }
        );
        let plain_load = !heap
            && class
                .is_some_and(|class| self.writer.needs_layout_conversion(result_type_id, class));
        let load_type_id = if plain_load {
            self.writer.plain_type_id(result_type_id)
        } else {
            result_type_id
        };

        let load_id = {
            let pointer_id = self.write_access_chain(pointer, block, access_type_adjustment)?;
            let id = self.gen_id();
            let atomic_space = match *self.fun_info[pointer].ty.inner_with(&self.ir_module.types) {
                crate::TypeInner::Pointer { base, space } => {
                    match self.ir_module.types[base].inner {
                        crate::TypeInner::Atomic { .. } => Some(space),
                        _ => None,
                    }
                }
                _ => None,
            };
            let instruction = if let Some(space) = atomic_space {
                let (semantics, scope) = space.to_spirv_semantics_and_scope();
                let scope_constant_id = self.get_scope_constant(scope as u32);
                let semantics_id = self.get_index_constant(semantics.bits());
                Instruction::atomic_load(
                    result_type_id,
                    id,
                    pointer_id,
                    scope_constant_id,
                    semantics_id,
                )
            } else {
                let mut instruction = Instruction::load(load_type_id, id, pointer_id, None);
                let component = self.physical_component_load;
                for operand in self.memory_access(pointer, component, false) {
                    instruction.add_operand(operand);
                }
                instruction
            };
            block.body.push(instruction);
            id
        };

        if plain_load {
            self.writer
                .convert_layout(block, result_type_id, load_id, false)
        } else {
            Ok(load_id)
        }
    }

    fn pointer_class(&self, pointer: Handle<crate::Expression>) -> Option<spirv::StorageClass> {
        match *self.fun_info[pointer].ty.inner_with(&self.ir_module.types) {
            crate::TypeInner::Pointer { space, .. }
            | crate::TypeInner::ValuePointer { space, .. } => {
                Some(self.writer.storage_class(space))
            }
            _ => None,
        }
    }

    fn spill_to_internal_variable(
        &mut self,
        base: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<(), Error> {
        use indexmap::map::Entry;

        // Make sure we have an internal variable to spill `base` to.
        let spill_variable_id = match self.function.spilled_composites.entry(base) {
            Entry::Occupied(preexisting) => preexisting.get().id,
            Entry::Vacant(vacant) => {
                // Generate a new internal variable of the appropriate
                // type for `base`.
                let pointer_type_id = self.writer.get_resolution_pointer_id(
                    &self.fun_info[base].ty,
                    spirv::StorageClass::Function,
                )?;
                let id = self.writer.id_gen.next();
                vacant.insert(super::LocalVariable {
                    id,
                    instruction: Instruction::variable(
                        pointer_type_id,
                        id,
                        spirv::StorageClass::Function,
                        None,
                    ),
                });
                id
            }
        };

        // Perform the store even if we already had a spill variable for `base`.
        // Consider this code:
        //
        // var x = ...;
        // var y = ...;
        // var z = ...;
        // for (i = 0; i<2; i++) {
        //     let a = array(i, i, i);
        //     if (i == 0) {
        //         x += a[y];
        //     } else [
        //         x += a[z];
        //     }
        // }
        //
        // The value of `a` needs to be spilled so we can subscript it with `y` and `z`.
        //
        // When we generate SPIR-V for `a[y]`, we will create the spill
        // variable, and store `a`'s value in it.
        //
        // When we generate SPIR-V for `a[z]`, we will notice that the spill
        // variable for `a` has already been declared, but it is still essential
        // that we store `a` into it, so that `a[z]` sees this iteration's value
        // of `a`.
        let mut base_id = self.cached.get(base)?;
        let base_type_id = self.get_expression_type_id(&self.fun_info[base].ty)?;
        if self
            .writer
            .needs_layout_conversion(base_type_id, spirv::StorageClass::Function)
        {
            base_id = self
                .writer
                .convert_layout(block, base_type_id, base_id, true)?;
        }
        block
            .body
            .push(Instruction::store(spill_variable_id, base_id, None));
        Ok(())
    }

    /// Generate an access to a spilled temporary, if necessary.
    ///
    /// Given `access`, an [`Access`] or [`AccessIndex`] expression that refers
    /// to a component of a composite value that has been spilled to a temporary
    /// variable, determine whether other expressions are going to use
    /// `access`'s value:
    ///
    /// - If so, perform the access and cache that as the value of `access`.
    ///
    /// - Otherwise, generate no code and cache no value for `access`.
    ///
    /// Return `Ok(0)` if no value was fetched, or `Ok(id)` if we loaded it into
    /// the instruction given by `id`.
    ///
    /// [`Access`]: crate::Expression::Access
    /// [`AccessIndex`]: crate::Expression::AccessIndex
    fn maybe_access_spilled_composite(
        &mut self,
        access: Handle<crate::Expression>,
        block: &mut Block,
        result_type_id: Word,
    ) -> Result<Word, Error> {
        let access_uses = self.function.access_uses.get(&access).map_or(0, |r| *r);
        if access_uses == self.fun_info[access].ref_count {
            // This expression is only used by other `Access` and
            // `AccessIndex` expressions, so we don't need to cache a
            // value for it yet.
            Ok(0)
        } else {
            // There are other expressions that are going to expect this
            // expression's value to be cached, not just other `Access` or
            // `AccessIndex` expressions. We must actually perform the
            // access on the spill variable now.
            self.write_checked_load(
                access,
                block,
                AccessTypeAdjustment::IntroducePointer(spirv::StorageClass::Function),
                result_type_id,
            )
        }
    }

    /// Build the instructions for matrix - matrix column operations
    #[expect(
        clippy::too_many_arguments,
        reason = "the arguments are the parts of one request"
    )]
    fn write_matrix_matrix_column_op(
        &mut self,
        expr_handle: Handle<crate::Expression>,
        block: &mut Block,
        result_id: Word,
        result_type_id: Word,
        left_id: Word,
        right_id: Word,
        columns: crate::VectorSize,
        rows: crate::VectorSize,
        width: u8,
        op: spirv::Op,
    ) -> Result<(), Error> {
        self.temp_list.clear();
        let non_uniform = self
            .non_uniform(expr_handle)
            .contains(crate::NonUniform::VALUE);

        let vector_type_id = self.get_numeric_type_id(NumericType::Vector {
            size: rows,
            scalar: crate::Scalar::float(width),
        });

        for index in 0..columns as u32 {
            let column_id_left = self.gen_id();
            let column_id_right = self.gen_id();
            let column_id_res = self.gen_id();

            block.body.push(Instruction::composite_extract(
                vector_type_id,
                column_id_left,
                left_id,
                &[index],
            ));
            block.body.push(Instruction::composite_extract(
                vector_type_id,
                column_id_right,
                right_id,
                &[index],
            ));
            block.body.push(Instruction::binary(
                op,
                vector_type_id,
                column_id_res,
                column_id_left,
                column_id_right,
            ));
            if non_uniform {
                self.writer.decorate_non_uniform(column_id_res)?;
            }

            self.temp_list.push(column_id_res);
        }

        block.body.push(Instruction::composite_construct(
            result_type_id,
            result_id,
            &self.temp_list,
        ));
        Ok(())
    }

    /// Build the instructions for vector - scalar multiplication
    fn write_vector_scalar_mult(
        &mut self,
        block: &mut Block,
        result_id: Word,
        result_type_id: Word,
        vector_id: Word,
        scalar_id: Word,
        vector: &crate::TypeInner,
    ) -> Result<(), Error> {
        let (size, kind) = match *vector {
            crate::TypeInner::Vector {
                size,
                scalar: crate::Scalar { kind, .. },
            } => (size, kind),
            crate::TypeInner::LongVector {
                scalar:
                    crate::Scalar {
                        kind: crate::ScalarKind::Float,
                        ..
                    },
                ..
            } => {
                block.body.push(Instruction::binary(
                    spirv::Op::VectorTimesScalar,
                    result_type_id,
                    result_id,
                    vector_id,
                    scalar_id,
                ));
                return Ok(());
            }
            _ => {
                return Err(Error::Validation(
                    "vector-scalar multiplication of a non-vector",
                ));
            }
        };

        let (op, operand_id) = match kind {
            crate::ScalarKind::Float => (spirv::Op::VectorTimesScalar, scalar_id),
            _ => {
                let operand_id = self.gen_id();
                self.temp_list.clear();
                self.temp_list.resize(size as usize, scalar_id);
                block.body.push(Instruction::composite_construct(
                    result_type_id,
                    operand_id,
                    &self.temp_list,
                ));
                (spirv::Op::IMul, operand_id)
            }
        };

        block.body.push(Instruction::binary(
            op,
            result_type_id,
            result_id,
            vector_id,
            operand_id,
        ));
        Ok(())
    }

    /// Build the instructions for the arithmetic expression of a dot product
    ///
    /// The argument `extractor` is a function that maps `(result_id,
    /// composite_id, index)` to an instruction that extracts the `index`th
    /// entry of the value with ID `composite_id` and assigns it to the slot
    /// with id `result_id` (which must have type `result_type_id`).
    #[expect(clippy::too_many_arguments)]
    fn write_dot_product(
        &mut self,
        result_id: Word,
        result_type_id: Word,
        arg0_id: Word,
        arg1_id: Word,
        size: u32,
        block: &mut Block,
        extractor: impl Fn(Word, Word, Word) -> Instruction,
    ) {
        let mut partial_sum = self.writer.get_constant_null(result_type_id);
        let last_component = size - 1;
        for index in 0..=last_component {
            // compute the product of the current components
            let a_id = self.gen_id();
            block.body.push(extractor(a_id, arg0_id, index));
            let b_id = self.gen_id();
            block.body.push(extractor(b_id, arg1_id, index));
            let prod_id = self.gen_id();
            block.body.push(Instruction::binary(
                spirv::Op::IMul,
                result_type_id,
                prod_id,
                a_id,
                b_id,
            ));

            // choose the id for the next sum, depending on current index
            let id = if index == last_component {
                result_id
            } else {
                self.gen_id()
            };

            // sum the computed product with the partial sum
            block.body.push(Instruction::binary(
                spirv::Op::IAdd,
                result_type_id,
                id,
                partial_sum,
                prod_id,
            ));
            // set the id of the result as the previous partial sum
            partial_sum = id;
        }
    }

    /// Emit code for `pack4x{I,U}8[Clamp]` if capability "Int8" is available.
    fn write_pack4x8_optimized(
        &mut self,
        block: &mut Block,
        result_type_id: u32,
        arg0_id: u32,
        id: u32,
        is_signed: bool,
        should_clamp: bool,
    ) -> Instruction {
        let int_type = if is_signed {
            crate::ScalarKind::Sint
        } else {
            crate::ScalarKind::Uint
        };
        let wide_vector_type = NumericType::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar {
                kind: int_type,
                width: 4,
            },
        };
        let wide_vector_type_id = self.get_numeric_type_id(wide_vector_type);
        let packed_vector_type_id = self.get_numeric_type_id(NumericType::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar {
                kind: crate::ScalarKind::Uint,
                width: 1,
            },
        });

        let mut wide_vector = arg0_id;
        if should_clamp {
            let (min, max, clamp_op) = if is_signed {
                (
                    crate::Literal::I32(-128),
                    crate::Literal::I32(127),
                    spirv::GlslStd450Op::SClamp,
                )
            } else {
                (
                    crate::Literal::U32(0),
                    crate::Literal::U32(255),
                    spirv::GlslStd450Op::UClamp,
                )
            };
            let [min, max] = [min, max].map(|lit| {
                let scalar = self.writer.get_constant_scalar(lit);
                self.writer.get_local_constant_composite(
                    LocalType::Numeric(wide_vector_type),
                    &[scalar; 4],
                )
            });

            let clamp_id = self.gen_id();
            block.body.push(Instruction::ext_inst_gl_op(
                self.writer.gl450_ext_inst_id,
                clamp_op,
                wide_vector_type_id,
                clamp_id,
                &[wide_vector, min, max],
            ));

            wide_vector = clamp_id;
        }

        let packed_vector = self.gen_id();
        block.body.push(Instruction::unary(
            spirv::Op::UConvert, // We truncate, so `UConvert` and `SConvert` behave identically.
            packed_vector_type_id,
            packed_vector,
            wide_vector,
        ));

        // The SPIR-V spec [1] defines the bit order for bit casting between a vector
        // and a scalar precisely as required by the WGSL spec [2].
        // [1]: https://registry.khronos.org/SPIR-V/specs/unified1/SPIRV.html#OpBitcast
        // [2]: https://www.w3.org/TR/WGSL/#pack4xI8-builtin
        Instruction::unary(spirv::Op::Bitcast, result_type_id, id, packed_vector)
    }

    /// Emit code for `pack4x{I,U}8[Clamp]` if capability "Int8" is not available.
    fn write_pack4x8_polyfill(
        &mut self,
        block: &mut Block,
        result_type_id: u32,
        arg0_id: u32,
        id: u32,
        is_signed: bool,
        should_clamp: bool,
    ) -> Instruction {
        let int_type = if is_signed {
            crate::ScalarKind::Sint
        } else {
            crate::ScalarKind::Uint
        };
        let uint_type_id = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::U32));
        let int_type_id = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar {
            kind: int_type,
            width: 4,
        }));

        let mut last_instruction = Instruction::new(spirv::Op::Nop);

        let zero = self.writer.get_constant_scalar(crate::Literal::U32(0));
        let mut preresult = zero;
        block
            .body
            .reserve(usize::from(VEC_LENGTH) * (2 + usize::from(is_signed)));

        let eight = self.writer.get_constant_scalar(crate::Literal::U32(8));
        const VEC_LENGTH: u8 = 4;
        for i in 0..u32::from(VEC_LENGTH) {
            let offset = self.writer.get_constant_scalar(crate::Literal::U32(i * 8));
            let mut extracted = self.gen_id();
            block.body.push(Instruction::binary(
                spirv::Op::CompositeExtract,
                int_type_id,
                extracted,
                arg0_id,
                i,
            ));
            if is_signed {
                let casted = self.gen_id();
                block.body.push(Instruction::unary(
                    spirv::Op::Bitcast,
                    uint_type_id,
                    casted,
                    extracted,
                ));
                extracted = casted;
            }
            if should_clamp {
                let (min, max, clamp_op) = if is_signed {
                    (
                        crate::Literal::I32(-128),
                        crate::Literal::I32(127),
                        spirv::GlslStd450Op::SClamp,
                    )
                } else {
                    (
                        crate::Literal::U32(0),
                        crate::Literal::U32(255),
                        spirv::GlslStd450Op::UClamp,
                    )
                };
                let [min, max] = [min, max].map(|lit| self.writer.get_constant_scalar(lit));

                let clamp_id = self.gen_id();
                block.body.push(Instruction::ext_inst_gl_op(
                    self.writer.gl450_ext_inst_id,
                    clamp_op,
                    result_type_id,
                    clamp_id,
                    &[extracted, min, max],
                ));

                extracted = clamp_id;
            }
            let is_last = i == u32::from(VEC_LENGTH - 1);
            if is_last {
                last_instruction = Instruction::quaternary(
                    spirv::Op::BitFieldInsert,
                    result_type_id,
                    id,
                    preresult,
                    extracted,
                    offset,
                    eight,
                );
            } else {
                let new_preresult = self.gen_id();
                block.body.push(Instruction::quaternary(
                    spirv::Op::BitFieldInsert,
                    result_type_id,
                    new_preresult,
                    preresult,
                    extracted,
                    offset,
                    eight,
                ));
                preresult = new_preresult;
            }
        }
        last_instruction
    }

    /// Emit code for `unpack4x{I,U}8` if capability "Int8" is available.
    fn write_unpack4x8_optimized(
        &mut self,
        block: &mut Block,
        result_type_id: u32,
        arg0_id: u32,
        id: u32,
        is_signed: bool,
    ) -> Instruction {
        let (int_type, convert_op) = if is_signed {
            (crate::ScalarKind::Sint, spirv::Op::SConvert)
        } else {
            (crate::ScalarKind::Uint, spirv::Op::UConvert)
        };

        let packed_vector_type_id = self.get_numeric_type_id(NumericType::Vector {
            size: crate::VectorSize::Quad,
            scalar: crate::Scalar {
                kind: int_type,
                width: 1,
            },
        });

        // The SPIR-V spec [1] defines the bit order for bit casting between a vector
        // and a scalar precisely as required by the WGSL spec [2].
        // [1]: https://registry.khronos.org/SPIR-V/specs/unified1/SPIRV.html#OpBitcast
        // [2]: https://www.w3.org/TR/WGSL/#pack4xI8-builtin
        let packed_vector = self.gen_id();
        block.body.push(Instruction::unary(
            spirv::Op::Bitcast,
            packed_vector_type_id,
            packed_vector,
            arg0_id,
        ));

        Instruction::unary(convert_op, result_type_id, id, packed_vector)
    }

    /// Emit code for `unpack4x{I,U}8` if capability "Int8" is not available.
    fn write_unpack4x8_polyfill(
        &mut self,
        block: &mut Block,
        result_type_id: u32,
        arg0_id: u32,
        id: u32,
        is_signed: bool,
    ) -> Instruction {
        let (int_type, extract_op) = if is_signed {
            (crate::ScalarKind::Sint, spirv::Op::BitFieldSExtract)
        } else {
            (crate::ScalarKind::Uint, spirv::Op::BitFieldUExtract)
        };

        let sint_type_id = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::I32));

        let eight = self.writer.get_constant_scalar(crate::Literal::U32(8));
        let int_type_id = self.get_numeric_type_id(NumericType::Scalar(crate::Scalar {
            kind: int_type,
            width: 4,
        }));
        block
            .body
            .reserve(usize::from(VEC_LENGTH) * 2 + usize::from(is_signed));
        let arg_id = if is_signed {
            let new_arg_id = self.gen_id();
            block.body.push(Instruction::unary(
                spirv::Op::Bitcast,
                sint_type_id,
                new_arg_id,
                arg0_id,
            ));
            new_arg_id
        } else {
            arg0_id
        };

        const VEC_LENGTH: u8 = 4;
        let parts: [_; VEC_LENGTH as usize] = core::array::from_fn(|_| self.gen_id());
        for (i, part_id) in parts.into_iter().enumerate() {
            let index = self
                .writer
                .get_constant_scalar(crate::Literal::U32(i as u32 * 8));
            block.body.push(Instruction::ternary(
                extract_op,
                int_type_id,
                part_id,
                arg_id,
                index,
                eight,
            ));
        }

        Instruction::composite_construct(result_type_id, id, &parts)
    }

    /// Generate one or more SPIR-V blocks for `rglsl_block`.
    ///
    /// Use `label_id` as the label for the SPIR-V entry point block.
    ///
    /// If control reaches the end of the SPIR-V block, terminate it according
    /// to `exit`.
    ///
    /// If the block contains [`Break`] or [`Continue`] statements,
    /// `loop_context` supplies the labels of the SPIR-V blocks to jump to. If
    /// either of these labels are `None`, then it should have been a rglsl
    /// validation error for the corresponding statement to occur in this
    /// context.
    ///
    /// [`Break`]: Statement::Break
    /// [`Continue`]: Statement::Continue
    fn write_block(
        &mut self,
        label_id: Word,
        rglsl_block: &crate::Block,
        exit: BlockExit,
        loop_context: LoopContext,
    ) -> Result<(), Error> {
        let mut work = Vec::from([Work::Block {
            label_id,
            ir: rglsl_block,
            exit,
            loop_context,
        }]);
        let mut finished = BlockExitDisposition::Used;
        while let Some(item) = work.pop() {
            match item {
                Work::Block {
                    label_id,
                    ir,
                    exit,
                    loop_context,
                } => work.push(Work::Frame(BlockFrame {
                    ir,
                    next: 0,
                    state: FrameState::Writing(Block::new(label_id)),
                    exit,
                    loop_context,
                })),
                Work::Branch { label_id, target } => self
                    .function
                    .consume(Block::new(label_id), Instruction::branch(target)),
                Work::Frame(frame) => {
                    if let Some(disposition) = self.write_frame(frame, finished, &mut work)? {
                        finished = disposition;
                    }
                }
            }
        }
        Ok(())
    }

    fn resume_frame(
        &mut self,
        state: FrameState<'_>,
        finished: BlockExitDisposition,
    ) -> Option<Block> {
        let (merge_id, statement) = match state {
            FrameState::Writing(block) => return Some(block),
            FrameState::Waiting(Resume::Scope {
                merge_id,
                statement,
            }) => match finished {
                BlockExitDisposition::Used => (merge_id, statement),
                BlockExitDisposition::Discarded => return None,
            },
            FrameState::Waiting(Resume::Merge {
                merge_id,
                statement,
            }) => (merge_id, statement),
        };
        let next = Block::new(merge_id);
        if self.reachability.completes(statement) {
            Some(next)
        } else {
            self.function
                .consume(next, Instruction::new(spirv::Op::Unreachable));
            None
        }
    }

    fn write_frame<'a>(
        &mut self,
        frame: BlockFrame<'a>,
        finished: BlockExitDisposition,
        work: &mut Vec<Work<'a>>,
    ) -> Result<Option<BlockExitDisposition>, Error> {
        let BlockFrame {
            ir,
            mut next,
            state,
            exit,
            loop_context,
        } = frame;
        let Some(mut block) = self.resume_frame(state, finished) else {
            return Ok(Some(BlockExitDisposition::Discarded));
        };
        let nested = !core::ptr::eq(ir, &self.ir_function.body);
        while let Some((statement, span)) = ir.span_at(next) {
            next += 1;
            match *statement {
                Statement::Block(_) => {}
                Statement::Return { .. } if !span.is_defined() => {
                    if !(nested && super::debug::ends_at_location(&block)) {
                        self.writer.debug_mark_end(&mut block);
                    }
                }
                Statement::If { condition, .. }
                | Statement::Switch {
                    selector: condition,
                    ..
                } if self.expression_constness.is_const(condition) => {
                    self.writer.debug_mark_scope(&mut block, *span);
                }
                _ => self.writer.debug_mark(&mut block, *span),
            }
            match self.write_statement_kind(block, statement, loop_context)? {
                Nested::Done(Some(next)) if !self.reachability.completes(statement) => {
                    self.function
                        .consume(next, Instruction::new(spirv::Op::Unreachable));
                    return Ok(Some(BlockExitDisposition::Discarded));
                }
                Nested::Done(Some(following)) => block = following,
                Nested::Done(None) => return Ok(Some(BlockExitDisposition::Discarded)),
                Nested::Children { resume, children } => {
                    work.push(Work::Frame(BlockFrame {
                        ir,
                        next,
                        state: FrameState::Waiting(resume),
                        exit,
                        loop_context,
                    }));
                    work.extend(children.into_iter().rev());
                    return Ok(None);
                }
            }
        }
        self.finish_block(block, exit, loop_context, nested)?;
        Ok(Some(BlockExitDisposition::Used))
    }

    fn write_statement_kind<'a>(
        &mut self,
        block: Block,
        statement: &'a Statement,
        loop_context: LoopContext,
    ) -> Result<Nested<'a>, Error> {
        match *statement {
            Statement::Block(ref block_statements) => {
                Ok(self.write_scope(block, block_statements, loop_context, statement))
            }
            Statement::If {
                condition,
                ref accept,
                ref reject,
                control,
            } => self.write_if(
                block,
                condition,
                [accept, reject],
                control,
                loop_context,
                statement,
            ),
            Statement::Switch {
                selector,
                ref cases,
                control,
            } => self.write_switch(block, selector, cases, control, loop_context, statement),
            Statement::Loop {
                ref body,
                ref continuing,
                break_if,
                control,
            } => Ok(self.write_loop(
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
            )),
            _ => Ok(Nested::Done(self.write_statement(
                block,
                statement,
                loop_context,
            )?)),
        }
    }

    fn finish_block(
        &mut self,
        block: Block,
        exit: BlockExit,
        loop_context: LoopContext,
        nested: bool,
    ) -> Result<(), Error> {
        let mut block = block;
        if let BlockExit::Return = exit
            && !(nested && super::debug::ends_at_location(&block))
        {
            self.writer.debug_mark_end(&mut block);
        }
        let termination = match exit {
            // We're generating code for the top-level Block of the function, so we
            // need to end it with some kind of return instruction.
            BlockExit::Return => match self.ir_function.result {
                Some(ref result) if self.function.entry_point_context.is_none() => {
                    let type_id = self.get_handle_type_id(result.ty)?;
                    Instruction::return_value(self.writer.get_undef(type_id))
                }
                _ => Instruction::return_void(),
            },
            BlockExit::Branch { target } => Instruction::branch(target),
            BlockExit::BreakIf {
                condition,
                preamble_id,
            } => {
                let condition_id = self.cached.get(condition)?;
                let Some(break_id) = loop_context.break_id else {
                    return Err(Error::Validation("break-if outside of a loop"));
                };

                Instruction::branch_conditional(condition_id, break_id, preamble_id)
            }
        };

        self.function.consume(block, termination);
        Ok(())
    }

    fn write_scope<'a>(
        &mut self,
        block: Block,
        block_statements: &'a crate::Block,
        loop_context: LoopContext,
        statement: &'a Statement,
    ) -> Nested<'a> {
        let scope_id = self.gen_id();
        self.function.consume(block, Instruction::branch(scope_id));

        let merge_id = self.gen_id();
        Nested::Children {
            resume: Resume::Scope {
                merge_id,
                statement,
            },
            children: Vec::from([Work::Block {
                label_id: scope_id,
                ir: block_statements,
                exit: BlockExit::Branch { target: merge_id },
                loop_context,
            }]),
        }
    }

    fn write_if<'a>(
        &mut self,
        block: Block,
        condition: Handle<crate::Expression>,
        [accept, reject]: [&'a crate::Block; 2],
        control: crate::SelectionControl,
        loop_context: LoopContext,
        statement: &'a Statement,
    ) -> Result<Nested<'a>, Error> {
        let mut block = block;
        // In spirv 1.6, in a conditional branch the two block ids
        // of the branches can't have the same label. If `accept`
        // and `reject` are both empty (e.g. in `if (condition) {}`)
        // merge id will be both labels. Because both branches are
        // empty, we can skip the if statement.
        let empty = accept.is_empty() && reject.is_empty();
        if empty && control.is_none() {
            return Ok(Nested::Done(Some(block)));
        }
        let condition_id = self.cached.get(condition)?;

        let merge_id = self.gen_id();
        block.body.push(Instruction::selection_merge(
            merge_id,
            selection_control(control),
        ));

        let accept_id = if accept.is_empty() && !empty {
            None
        } else {
            Some(self.gen_id())
        };
        let reject_id = if reject.is_empty() {
            None
        } else {
            Some(self.gen_id())
        };

        self.function.consume(
            block,
            Instruction::branch_conditional(
                condition_id,
                accept_id.unwrap_or(merge_id),
                reject_id.unwrap_or(merge_id),
            ),
        );

        let children = [(accept_id, accept), (reject_id, reject)]
            .into_iter()
            .filter_map(|(label_id, ir)| {
                label_id.map(|label_id| Work::Block {
                    label_id,
                    ir,
                    exit: BlockExit::Branch { target: merge_id },
                    loop_context,
                })
            })
            .collect();
        Ok(Nested::Children {
            resume: Resume::Merge {
                merge_id,
                statement,
            },
            children,
        })
    }

    fn write_switch<'a>(
        &mut self,
        block: Block,
        selector: Handle<crate::Expression>,
        cases: &'a [crate::SwitchCase],
        control: crate::SelectionControl,
        loop_context: LoopContext,
        statement: &'a Statement,
    ) -> Result<Nested<'a>, Error> {
        let mut block = block;
        let selector_id = self.cached.get(selector)?;

        let merge_id = self.gen_id();
        block.body.push(Instruction::selection_merge(
            merge_id,
            selection_control(control),
        ));

        let mut default_id = None;
        // id of previous empty fall-through case
        let mut last_id = None;

        let mut raw_cases = Vec::with_capacity(cases.len());
        let mut case_ids = Vec::with_capacity(cases.len());
        for case in cases.iter() {
            // take id of previous empty fall-through case or generate a new one
            let label_id = last_id.take().unwrap_or_else(|| self.gen_id());

            if case.fall_through && case.body.is_empty() {
                last_id = Some(label_id);
            }

            case_ids.push(label_id);

            match case.value {
                crate::SwitchValue::I32(value) => {
                    raw_cases.push(super::instructions::Case {
                        value: value as Word,
                        label_id,
                    });
                }
                crate::SwitchValue::U32(value) => {
                    raw_cases.push(super::instructions::Case { value, label_id });
                }
                crate::SwitchValue::Default => {
                    default_id = Some(label_id);
                }
            }
        }

        let Some(default_id) = default_id else {
            return Err(Error::Validation("switch has no default case"));
        };

        self.function.consume(
            block,
            Instruction::switch(selector_id, default_id, &raw_cases),
        );

        let inner_context = LoopContext {
            break_id: Some(merge_id),
            ..loop_context
        };

        let mut children = Vec::with_capacity(cases.len());
        for (i, (case, label_id)) in cases
            .iter()
            .zip(case_ids.iter())
            .enumerate()
            .filter(|&(_, (case, _))| !(case.fall_through && case.body.is_empty()))
        {
            let case_finish_id = if case.fall_through {
                case_ids[i + 1]
            } else {
                merge_id
            };
            children.push(Work::Block {
                label_id: *label_id,
                ir: &case.body,
                exit: BlockExit::Branch {
                    target: case_finish_id,
                },
                loop_context: inner_context,
            });
        }

        Ok(Nested::Children {
            resume: Resume::Merge {
                merge_id,
                statement,
            },
            children,
        })
    }

    fn write_loop<'a>(
        &mut self,
        block: Block,
        (body, continuing): (&'a crate::Block, Option<&'a crate::Block>),
        break_if: Option<Handle<crate::Expression>>,
        control: crate::LoopControl,
        statement: &'a Statement,
    ) -> Nested<'a> {
        let mut block = block;
        let preamble_id = self.gen_id();
        self.function
            .consume(block, Instruction::branch(preamble_id));

        let merge_id = self.gen_id();
        let body_id = self.gen_id();
        let continuing_id = self.gen_id();

        // SPIR-V requires the continuing to the `OpLoopMerge`,
        // so we have to start a new block with it.
        block = Block::new(preamble_id);
        block
            .body
            .push(self.loop_merge(merge_id, continuing_id, control));

        self.function.consume(block, Instruction::branch(body_id));

        let body = Work::Block {
            label_id: body_id,
            ir: body,
            exit: BlockExit::Branch {
                target: continuing_id,
            },
            loop_context: LoopContext {
                continuing_id: Some(continuing_id),
                break_id: Some(merge_id),
            },
        };

        let continuing = match continuing {
            None => Work::Branch {
                label_id: continuing_id,
                target: preamble_id,
            },
            Some(continuing) => Work::Block {
                label_id: continuing_id,
                ir: continuing,
                exit: match break_if {
                    Some(condition) => BlockExit::BreakIf {
                        condition,
                        preamble_id,
                    },
                    None => BlockExit::Branch {
                        target: preamble_id,
                    },
                },
                loop_context: LoopContext {
                    continuing_id: None,
                    break_id: Some(merge_id),
                },
            },
        };

        Nested::Children {
            resume: Resume::Merge {
                merge_id,
                statement,
            },
            children: Vec::from([body, continuing]),
        }
    }

    fn write_statement(
        &mut self,
        block: Block,
        statement: &Statement,
        loop_context: LoopContext,
    ) -> Result<Option<Block>, Error> {
        let mut block = block;
        match *statement {
            Statement::Emit(ref range) => {
                for handle in range.clone() {
                    // omit const expressions as we've already cached those
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
                return Ok(None);
            }
            Statement::Continue => {
                let Some(continuing_id) = loop_context.continuing_id else {
                    return Err(Error::Validation("continue outside of a loop"));
                };
                self.function
                    .consume(block, Instruction::branch(continuing_id));
                return Ok(None);
            }
            Statement::Return { value: Some(value) } => {
                let value_id = match *self.fun_info[value].ty.inner_with(&self.ir_module.types) {
                    crate::TypeInner::Tensor { .. } => self.get_handle_id(value)?,
                    crate::TypeInner::BindingArray { .. }
                        if matches!(
                            self.ir_function.expressions[value],
                            crate::Expression::GlobalVariable(_)
                                | crate::Expression::FunctionArgument(_)
                        ) =>
                    {
                        let ty = self.fun_info[value].ty.clone();
                        let type_id = self.writer.get_expression_type_id(&ty)?;
                        let pointer_id = self.cached.get(value)?;
                        let id = self.gen_id();
                        block
                            .body
                            .push(Instruction::load(type_id, id, pointer_id, None));
                        id
                    }
                    _ => self.cached.get(value)?,
                };
                let instruction = match self.function.entry_point_context {
                    // If this is an entry point, and we need to return anything,
                    // let's instead store the output variables and return `void`.
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
                return Ok(None);
            }
            Statement::Return { value: None } => {
                self.function.consume(block, Instruction::return_void());
                return Ok(None);
            }
            Statement::Kill => {
                self.function.consume(block, Instruction::kill());
                return Ok(None);
            }
            Statement::Demote => {
                self.writer.require_demote()?;
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
                    None => return Ok(None),
                }
            }
            Statement::Abort {
                ref message,
                ty,
                ref arguments,
            } => {
                self.write_abort(block, message, ty, arguments)?;
                return Ok(None);
            }
            Statement::ControlBarrier(flags) => {
                self.writer.write_control_barrier(flags, &mut block.body);
            }
            Statement::MemoryBarrier(flags) => {
                self.writer.write_memory_barrier(flags, &mut block);
            }
            Statement::Store { pointer, value } => {
                let mut value_id = self.cached.get(value)?;
                if let Some(class) = self.pointer_class(pointer) {
                    let value_type_id = self.get_expression_type_id(&self.fun_info[value].ty)?;
                    if self.writer.needs_layout_conversion(value_type_id, class) {
                        value_id = self.writer.convert_layout(
                            &mut block,
                            value_type_id,
                            value_id,
                            true,
                        )?;
                    }
                }
                {
                    let pointer_id =
                        self.write_access_chain(pointer, &mut block, AccessTypeAdjustment::None)?;
                    let atomic_space =
                        match *self.fun_info[pointer].ty.inner_with(&self.ir_module.types) {
                            crate::TypeInner::Pointer { base, space } => {
                                match self.ir_module.types[base].inner {
                                    crate::TypeInner::Atomic { .. } => Some(space),
                                    _ => None,
                                }
                            }
                            _ => None,
                        };
                    let instruction = if let Some(space) = atomic_space {
                        let (semantics, scope) = space.to_spirv_semantics_and_scope();
                        let scope_constant_id = self.get_scope_constant(scope as u32);
                        let semantics_id = self.get_index_constant(semantics.bits());
                        Instruction::atomic_store(
                            pointer_id,
                            scope_constant_id,
                            semantics_id,
                            value_id,
                        )
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
                };
            }
            Statement::ImageStore {
                image,
                coordinate,
                array_index,
                sample,
                level,
                value,
            } => self.write_image_store(
                image,
                coordinate,
                array_index,
                sample,
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
                let id = self.gen_id();
                let mut argument_ids = Vec::with_capacity(arguments.len());
                for &argument in arguments {
                    let argument_id = match self.ir_function.expressions[argument] {
                        crate::Expression::Access { base, .. }
                        | crate::Expression::AccessIndex { base, .. }
                            if matches!(
                                *self.fun_info[base].ty.inner_with(&self.ir_module.types),
                                crate::TypeInner::BindingArray { .. }
                            ) =>
                        {
                            self.write_access_chain(
                                argument,
                                &mut block,
                                AccessTypeAdjustment::IntroducePointer(
                                    spirv::StorageClass::UniformConstant,
                                ),
                            )?
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
            }
            Statement::Atomic {
                pointer,
                ref fun,
                value,
                result,
                order,
            } => {
                let id = self.gen_id();
                // Compare-and-exchange operations produce a struct result,
                // so use `result`'s type if it is available. For no-result
                // operations, fall back to `value`'s type.
                let result_type_id =
                    self.get_expression_type_id(&self.fun_info[result.unwrap_or(value)].ty)?;

                if let Some(result) = result {
                    self.cached.set(result, id)?;
                }

                let pointer_id =
                    self.write_access_chain(pointer, &mut block, AccessTypeAdjustment::None)?;

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
                let value_inner = self.fun_info[value].ty.inner_with(&self.ir_module.types);

                let (scalar, vector) = match *value_inner {
                    crate::TypeInner::Scalar(scalar) => (scalar, false),
                    crate::TypeInner::Vector {
                        scalar: scalar @ crate::Scalar::F16,
                        ..
                    } => (scalar, true),
                    _ => {
                        return Err(Error::FeatureNotImplemented(
                            "Atomics with non-scalar values",
                        ));
                    }
                };
                if vector {
                    self.writer
                        .use_extension("SPV_NV_shader_atomic_fp16_vector");
                    self.writer.require_any(
                        "half-precision vector atomics",
                        &[spirv::Capability::AtomicFloat16VectorNV],
                    )?;
                }

                let instruction = match *fun {
                    crate::AtomicFunction::Add => {
                        let spirv_op = match scalar.kind {
                            crate::ScalarKind::Sint | crate::ScalarKind::Uint => {
                                spirv::Op::AtomicIAdd
                            }
                            crate::ScalarKind::Float => {
                                self.writer.float_atomic(*fun, scalar, vector)?
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
                    crate::AtomicFunction::Subtract => {
                        let (spirv_op, value_id) = match scalar.kind {
                            crate::ScalarKind::Sint | crate::ScalarKind::Uint => {
                                (spirv::Op::AtomicISub, value_id)
                            }
                            crate::ScalarKind::Float => {
                                // HACK: SPIR-V doesn't have a atomic subtraction,
                                // so we add the negated value instead.
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
                    crate::AtomicFunction::And => {
                        let spirv_op = match scalar.kind {
                            crate::ScalarKind::Sint | crate::ScalarKind::Uint => {
                                spirv::Op::AtomicAnd
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
                    crate::AtomicFunction::InclusiveOr => {
                        let spirv_op = match scalar.kind {
                            crate::ScalarKind::Sint | crate::ScalarKind::Uint => {
                                spirv::Op::AtomicOr
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
                    crate::AtomicFunction::ExclusiveOr => {
                        let spirv_op = match scalar.kind {
                            crate::ScalarKind::Sint | crate::ScalarKind::Uint => {
                                spirv::Op::AtomicXor
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
                    crate::AtomicFunction::Min => {
                        let spirv_op = match scalar.kind {
                            crate::ScalarKind::Sint => spirv::Op::AtomicSMin,
                            crate::ScalarKind::Uint => spirv::Op::AtomicUMin,
                            crate::ScalarKind::Float => {
                                self.writer.float_atomic(*fun, scalar, vector)?
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
                    crate::AtomicFunction::Max => {
                        let spirv_op = match scalar.kind {
                            crate::ScalarKind::Sint => spirv::Op::AtomicSMax,
                            crate::ScalarKind::Uint => spirv::Op::AtomicUMax,
                            crate::ScalarKind::Float => {
                                self.writer.float_atomic(*fun, scalar, vector)?
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
                    crate::AtomicFunction::Exchange { compare: None } => {
                        Instruction::atomic_binary(
                            spirv::Op::AtomicExchange,
                            result_type_id,
                            id,
                            pointer_id,
                            scope_constant_id,
                            semantics_id,
                            value_id,
                        )
                    }
                    crate::AtomicFunction::Exchange { compare: Some(cmp) } => {
                        let scalar_type_id = self.get_numeric_type_id(NumericType::Scalar(scalar));
                        let bool_type_id =
                            self.get_numeric_type_id(NumericType::Scalar(crate::Scalar::BOOL));

                        let cas_result_id = self.gen_id();
                        let equality_result_id = self.gen_id();
                        let equality_operator = match scalar.kind {
                            crate::ScalarKind::Sint | crate::ScalarKind::Uint => spirv::Op::IEqual,
                            _ => {
                                return Err(Error::Validation(
                                    "atomic operation on an unsupported scalar type",
                                ));
                            }
                        };

                        let mut cas_instr = Instruction::new(spirv::Op::AtomicCompareExchange);
                        cas_instr.set_type(scalar_type_id);
                        cas_instr.set_result(cas_result_id);
                        cas_instr.add_operand(pointer_id);
                        cas_instr.add_operand(scope_constant_id);
                        cas_instr.add_operand(semantics_id); // semantics if equal
                        cas_instr.add_operand(unequal_semantics_id);
                        cas_instr.add_operand(value_id);
                        cas_instr.add_operand(self.cached.get(cmp)?);
                        block.body.push(cas_instr);
                        block.body.push(Instruction::binary(
                            equality_operator,
                            bool_type_id,
                            equality_result_id,
                            cas_result_id,
                            self.cached.get(cmp)?,
                        ));
                        Instruction::composite_construct(
                            result_type_id,
                            id,
                            &[cas_result_id, equality_result_id],
                        )
                    }
                };

                block.body.push(instruction);
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
                    return Ok(None);
                }
            }
            Statement::Block(_)
            | Statement::If { .. }
            | Statement::Switch { .. }
            | Statement::Loop { .. } => {}
        }
        Ok(Some(block))
    }

    pub(super) fn write_function_body(&mut self, entry_id: Word) -> Result<(), Error> {
        let function = self.ir_function;
        self.write_block(
            entry_id,
            &function.body,
            BlockExit::Return,
            LoopContext::default(),
        )
    }
}

const fn selection_control(control: crate::SelectionControl) -> spirv::SelectionControl {
    match control {
        crate::SelectionControl::None => spirv::SelectionControl::NONE,
        crate::SelectionControl::Flatten => spirv::SelectionControl::FLATTEN,
        crate::SelectionControl::DontFlatten => spirv::SelectionControl::DONT_FLATTEN,
    }
}
