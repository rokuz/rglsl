/*!
Indexing for SPIR-V output.
*/

use super::{Block, BlockContext, Error, Instruction, Word, helpers::global_needs_wrapper};
use crate::{arena::Handle, proc::index::GuardedIndex};

/// The results of performing a bounds check.
///
#[derive(Debug)]
pub(super) enum BoundsCheckResult {
    /// The index is statically known and in bounds, with the given value.
    KnownInBounds(u32),

    /// The given instruction computes the index to be used.
    Computed(Word),
}

impl BlockContext<'_> {
    /// Emit code to compute the length of a run-time array.
    ///
    /// Given `array`, an expression referring a runtime-sized array, return the
    /// instruction id for the array's length.
    ///
    /// Runtime-sized arrays may only appear in the values of global
    /// variables, which must have one of the following rglsl types:
    ///
    /// 1. A runtime-sized array.
    /// 2. A struct whose last member is a runtime-sized array.
    /// 3. A binding array of 2.
    ///
    /// Thus, the expression `array` has the form of:
    ///
    /// - An optional [`AccessIndex`], for case 2, applied to...
    /// - An optional [`Access`] or [`AccessIndex`], for case 3, applied to...
    /// - A [`GlobalVariable`].
    ///
    /// The generated SPIR-V takes into account wrapped globals; see
    /// [`back::spv::GlobalVariable`] for details.
    ///
    /// [`GlobalVariable`]: crate::Expression::GlobalVariable
    /// [`AccessIndex`]: crate::Expression::AccessIndex
    /// [`Access`]: crate::Expression::Access
    /// [`base`]: crate::Expression::Access::base
    /// [`back::spv::GlobalVariable`]: super::GlobalVariable
    pub(super) fn write_runtime_array_length(
        &mut self,
        array: Handle<crate::Expression>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let type_id = self.writer.get_u32_type_id();
        self.write_typed_array_length(array, type_id, block)
    }

    pub(super) fn write_typed_array_length(
        &mut self,
        array: Handle<crate::Expression>,
        type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        if let crate::Expression::AccessIndex { base, index } = self.ir_function.expressions[array]
            && let crate::Expression::BufferPointer { .. } = self.ir_function.expressions[base]
        {
            let length_id = self.gen_id();
            block.body.push(Instruction::array_length(
                type_id,
                length_id,
                self.cached.get(base)?,
                index,
            ));
            return Ok(length_id);
        }
        // The index into the binding array, if any.
        let binding_array_index_id: Option<Word>;

        // The handle to the rglsl IR global we're referring to.
        let global_handle: Handle<crate::GlobalVariable>;

        // At the rglsl type level, if the runtime-sized array is the final member of a
        // struct, this is that member's index.
        //
        // This does not cover wrappers: if this backend wrapped the rglsl global's
        // type in a synthetic SPIR-V struct (see `global_needs_wrapper`), this is
        // `None`.
        let opt_last_member_index: Option<u32>;

        // Inspect `array` and decide whether we have a binding array and/or an
        // enclosing struct.
        match self.ir_function.expressions[array] {
            crate::Expression::AccessIndex { base, index } => {
                match self.ir_function.expressions[base] {
                    crate::Expression::AccessIndex {
                        base: base_outer,
                        index: index_outer,
                    } => match self.ir_function.expressions[base_outer] {
                        // An `AccessIndex` of an `AccessIndex` must be a
                        // binding array holding structs whose last members are
                        // runtime-sized arrays.
                        crate::Expression::GlobalVariable(handle) => {
                            let index_id = self.get_index_constant(index_outer);
                            binding_array_index_id = Some(index_id);
                            global_handle = handle;
                            opt_last_member_index = Some(index);
                        }
                        _ => {
                            return Err(Error::Validation(
                                "array length expression: AccessIndex(AccessIndex(Global))",
                            ));
                        }
                    },
                    crate::Expression::Access {
                        base: base_outer,
                        index: index_outer,
                    } => match self.ir_function.expressions[base_outer] {
                        // Similarly, an `AccessIndex` of an `Access` must be a
                        // binding array holding structs whose last members are
                        // runtime-sized arrays.
                        crate::Expression::GlobalVariable(handle) => {
                            let index_id = self.cached.get(index_outer)?;
                            binding_array_index_id = Some(index_id);
                            global_handle = handle;
                            opt_last_member_index = Some(index);
                        }
                        _ => {
                            return Err(Error::Validation(
                                "array length expression: AccessIndex(Access(Global))",
                            ));
                        }
                    },
                    crate::Expression::GlobalVariable(handle) => {
                        // An outer `AccessIndex` applied directly to a
                        // `GlobalVariable`. Since binding arrays can only contain
                        // structs, this must be referring to the last member of a
                        // struct that is a runtime-sized array.
                        binding_array_index_id = None;
                        global_handle = handle;
                        opt_last_member_index = Some(index);
                    }
                    _ => {
                        return Err(Error::Validation(
                            "array length expression: AccessIndex(<unexpected>)",
                        ));
                    }
                }
            }
            crate::Expression::GlobalVariable(handle) => {
                // A direct reference to a global variable. This must hold the
                // runtime-sized array directly.
                binding_array_index_id = None;
                global_handle = handle;
                opt_last_member_index = None;
            }
            _ => return Err(Error::Validation("array length expression case-4")),
        };

        // The verifier should have checked this, but make sure the inspection above
        // agrees with the type about whether a binding array is involved.
        //
        // Eventually we do want to support `binding_array<array<T>>`. This check
        // ensures that whoever relaxes the validator will get an error message from
        // us, not just bogus SPIR-V.
        let global = &self.ir_module.global_variables[global_handle];
        match (
            &self.ir_module.types[global.ty].inner,
            binding_array_index_id,
        ) {
            (&crate::TypeInner::BindingArray { .. }, Some(_)) => {}
            (_, None) => {}
            _ => {
                return Err(Error::Validation(
                    "array length expression: bad binding array inference",
                ));
            }
        }

        // SPIR-V allows runtime-sized arrays to appear only as the last member of a
        // struct. Determine this member's index.
        let gvar = self.writer.global_variables[global_handle].clone();
        let global = &self.ir_module.global_variables[global_handle];
        let needs_wrapper = global_needs_wrapper(self.ir_module, &self.writer.nested_types, global);
        let (last_member_index, gvar_id) = match (opt_last_member_index, needs_wrapper) {
            (Some(index), false) => {
                // At the rglsl type level, the runtime-sized array appears as the
                // final member of a struct, whose index is `index`. We didn't need to
                // wrap this, since the rglsl type meets SPIR-V's requirements already.
                (index, gvar.access_id)
            }
            (None, true) => {
                // At the rglsl type level, the runtime-sized array does not appear
                // within a struct. We wrapped this in an OpTypeStruct with nothing
                // else in it, so the index is zero. OpArrayLength wants the pointer
                // to the wrapper struct, so use `gvar.var_id`.
                (0, gvar.var_id)
            }
            _ => {
                return Err(Error::Validation(
                    "array length expression: bad SPIR-V wrapper struct inference",
                ));
            }
        };

        let structure_id = match binding_array_index_id {
            // We are indexing inside a binding array, generate the access op.
            Some(index_id) => {
                let element_type_id = match self.ir_module.types[global.ty].inner {
                    crate::TypeInner::BindingArray { base, size: _ } => {
                        let base_id = self.get_handle_type_id(base)?;
                        let class = self.writer.storage_class(global.space);
                        self.get_pointer_type_id(base_id, class)
                    }
                    _ => return Err(Error::Validation("array length expression case-5")),
                };
                let structure_id = self.gen_id();
                block.body.push(Instruction::access_chain(
                    element_type_id,
                    structure_id,
                    gvar_id,
                    &[index_id],
                ));
                structure_id
            }
            None => gvar_id,
        };
        let length_id = self.gen_id();
        block.body.push(Instruction::array_length(
            type_id,
            length_id,
            structure_id,
            last_member_index,
        ));

        Ok(length_id)
    }

    pub(super) fn write_bounds_check(
        &mut self,
        mut index: GuardedIndex,
    ) -> Result<BoundsCheckResult, Error> {
        index.try_resolve_to_constant(&self.ir_function.expressions, self.ir_module);
        Ok(match index {
            GuardedIndex::Known(value) => BoundsCheckResult::KnownInBounds(value),
            GuardedIndex::Expression(expr) => BoundsCheckResult::Computed(self.cached.get(expr)?),
        })
    }

    /// Emit code to subscript a vector by value with a computed index.
    ///
    /// Return the id of the element value.
    ///
    /// If `base_id_override` is provided, it is used as the vector expression
    /// to be subscripted into, rather than the cached value of `base`.
    pub(super) fn write_vector_access(
        &mut self,
        result_type_id: Word,
        base: Handle<crate::Expression>,
        base_id_override: Option<Word>,
        index: GuardedIndex,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let base_id = match base_id_override {
            Some(id) => id,
            None => self.cached.get(base)?,
        };

        let result_id = match self.write_bounds_check(index)? {
            BoundsCheckResult::KnownInBounds(known_index) => {
                let result_id = self.gen_id();
                block.body.push(Instruction::composite_extract(
                    result_type_id,
                    result_id,
                    base_id,
                    &[known_index],
                ));
                result_id
            }
            BoundsCheckResult::Computed(computed_index_id) => {
                let result_id = self.gen_id();
                block.body.push(Instruction::vector_extract_dynamic(
                    result_type_id,
                    result_id,
                    base_id,
                    computed_index_id,
                ));
                result_id
            }
        };

        Ok(result_id)
    }
}
