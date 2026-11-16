use alloc::vec::Vec;

use spirv::{Decoration, Op, StorageClass, Word};

use super::{
    Block, BlockContext, Error, Instruction, LocalImageType, LocalType, Writer, feature, grammar,
};
use crate::arena::Handle;
use crate::{
    ArrayConversion, BlockMatchMetric, BlockMatchSearch, Expression, ImageProcessingOperation,
};

pub(super) struct ImageProcessingOperands {
    pub(super) operation: ImageProcessingOperation,
    pub(super) image: Handle<Expression>,
    pub(super) sampler: Option<Handle<Expression>>,
    pub(super) coordinate: Handle<Expression>,
    pub(super) reference: Option<Handle<Expression>>,
    pub(super) reference_sampler: Option<Handle<Expression>>,
    pub(super) reference_coordinate: Option<Handle<Expression>>,
    pub(super) size: Option<Handle<Expression>>,
}

#[derive(Clone, Copy)]
enum Marking {
    Weight,
    BlockMatch,
    Window,
}

impl Writer {
    fn decorate_once(&mut self, id: Word, decoration: Decoration) {
        if self.qcom_decorations.insert((id, decoration)) {
            self.decorate(id, decoration, &[]);
        }
    }
}

impl BlockContext<'_> {
    pub(super) fn loop_merge(
        &self,
        merge_id: Word,
        continuing_id: Word,
        control: crate::LoopControl,
    ) -> Instruction {
        use spirv::LoopControl as Lc;
        let mut mask = Lc::NONE.bits();
        let mut operands = Vec::new();
        let mut set = |enabled: bool, bit: Word, operand: Option<u32>| {
            if enabled {
                mask |= bit;
                operands.extend(operand);
            }
        };
        set(control.dont_unroll, Lc::DONT_UNROLL.bits(), None);
        set(control.unroll, Lc::UNROLL.bits(), None);
        let dependency = control
            .dependency
            .filter(|_| self.writer.lang_version() >= (1, 1));
        match dependency {
            Some(crate::LoopDependency::Infinite) => {
                set(true, Lc::DEPENDENCY_INFINITE.bits(), None);
            }
            Some(crate::LoopDependency::Length(length)) => {
                set(true, Lc::DEPENDENCY_LENGTH.bits(), Some(length));
            }
            None => {}
        }
        if self.writer.lang_version() >= (1, 4) {
            for (value, bit) in [
                (control.min_iterations, Lc::MIN_ITERATIONS),
                (control.max_iterations, Lc::MAX_ITERATIONS),
                (control.iteration_multiple, Lc::ITERATION_MULTIPLE),
                (control.peel_count, Lc::PEEL_COUNT),
                (control.partial_count, Lc::PARTIAL_COUNT),
            ] {
                set(value.is_some(), bit.bits(), value);
            }
        }
        set(
            control.multiple_wait_queues.is_some(),
            grammar::loop_control::MultipleWaitQueuesQCOM,
            control.multiple_wait_queues,
        );
        let mut instruction = Instruction::new(Op::LoopMerge);
        instruction.add_operand(merge_id);
        instruction.add_operand(continuing_id);
        instruction.add_operand(mask);
        for operand in operands {
            instruction.add_operand(operand);
        }
        instruction
    }

    pub(super) fn handle_class(&self, base: Handle<Expression>) -> StorageClass {
        if let Expression::GlobalVariable(handle) = self.ir_function.expressions[base] {
            let global = &self.ir_module.global_variables[handle];
            if global.tile_attachment {
                return StorageClass::TileAttachmentQCOM;
            }
            if crate::proc::is_tile_image(self.ir_module, global) {
                return StorageClass::TileImageEXT;
            }
        }
        StorageClass::UniformConstant
    }

    fn handle_pointer(&self, expression: Handle<Expression>) -> Option<Word> {
        match self.ir_function.expressions[expression] {
            Expression::GlobalVariable(handle) => Some(self.writer.global_variables[handle].var_id),
            Expression::Access { .. } | Expression::AccessIndex { .. } => {
                self.function.handle_pointers.get(&expression).copied()
            }
            _ => None,
        }
    }

    fn mark(&mut self, expression: Handle<Expression>, decoration: Decoration) {
        if let Some(pointer) = self.handle_pointer(expression) {
            self.writer.decorate_once(pointer, decoration);
        }
    }

    fn mark_operand(
        &mut self,
        image: Handle<Expression>,
        sampler: Option<Handle<Expression>>,
        marking: Marking,
    ) {
        match marking {
            Marking::Weight => self.mark(image, Decoration::WeightTextureQCOM),
            Marking::BlockMatch => self.mark(image, Decoration::BlockMatchTextureQCOM),
            Marking::Window => {
                self.mark(image, Decoration::BlockMatchTextureQCOM);
                self.mark(sampler.unwrap_or(image), Decoration::BlockMatchSamplerQCOM);
            }
        }
    }

    fn sampled_operand(
        &mut self,
        image: Handle<Expression>,
        sampler: Option<Handle<Expression>>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let image_id = self.get_non_uniform_handle_id(image, block)?;
        let Some(sampler) = sampler else {
            return Ok(image_id);
        };
        let crate::TypeInner::Image {
            dim,
            arrayed,
            class,
        } = *self.fun_info[image].ty.inner_with(&self.ir_module.types)
        else {
            return Err(Error::Validation("image processing operand"));
        };
        let image_type_id = self.get_localtype_id(LocalType::Image(LocalImageType::from_inner(
            dim, arrayed, class,
        )?));
        let sampled_image_type_id =
            self.get_localtype_id(LocalType::SampledImage { image_type_id });
        let sampler_id = self.get_non_uniform_handle_id(sampler, block)?;
        let id = self.gen_id();
        block.body.push(Instruction::sampled_image(
            sampled_image_type_id,
            id,
            image_id,
            sampler_id,
        ));
        Ok(id)
    }

    pub(super) fn write_image_processing(
        &mut self,
        result_type_id: Word,
        operands: ImageProcessingOperands,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let ImageProcessingOperands {
            operation,
            image,
            sampler,
            coordinate,
            reference,
            reference_sampler,
            reference_coordinate,
            size,
        } = operands;
        let missing = Error::Validation("image processing operand");
        let (op, feature, marking) = match operation {
            ImageProcessingOperation::SampleWeighted => (
                Op::ImageSampleWeightedQCOM,
                &feature::TEXTURE_SAMPLE_WEIGHTED_QCOM,
                None,
            ),
            ImageProcessingOperation::BoxFilter => (
                Op::ImageBoxFilterQCOM,
                &feature::TEXTURE_BOX_FILTER_QCOM,
                None,
            ),
            ImageProcessingOperation::BlockMatch { metric, search } => {
                let op = match (search, metric) {
                    (BlockMatchSearch::Block, BlockMatchMetric::SumOfAbsoluteDifferences) => {
                        Op::ImageBlockMatchSADQCOM
                    }
                    (BlockMatchSearch::Block, BlockMatchMetric::SumOfSquaredDifferences) => {
                        Op::ImageBlockMatchSSDQCOM
                    }
                    (BlockMatchSearch::Window, BlockMatchMetric::SumOfAbsoluteDifferences) => {
                        Op::ImageBlockMatchWindowSADQCOM
                    }
                    (BlockMatchSearch::Window, BlockMatchMetric::SumOfSquaredDifferences) => {
                        Op::ImageBlockMatchWindowSSDQCOM
                    }
                    (BlockMatchSearch::Gather, BlockMatchMetric::SumOfAbsoluteDifferences) => {
                        Op::ImageBlockMatchGatherSADQCOM
                    }
                    (BlockMatchSearch::Gather, BlockMatchMetric::SumOfSquaredDifferences) => {
                        Op::ImageBlockMatchGatherSSDQCOM
                    }
                };
                let marking = match search {
                    BlockMatchSearch::Window => Marking::Window,
                    BlockMatchSearch::Block | BlockMatchSearch::Gather => Marking::BlockMatch,
                };
                (
                    op,
                    &feature::TEXTURE_BLOCK_MATCH_QCOM,
                    Some((marking, search != BlockMatchSearch::Block)),
                )
            }
        };
        self.writer.require(feature)?;
        if let Some((_, true)) = marking {
            self.writer.require(&feature::TEXTURE_BLOCK_MATCH_2_QCOM)?;
        }
        let source_id = self.sampled_operand(image, sampler, block)?;
        let coordinate_id = self.cached.get(coordinate)?;
        let mut instruction = Instruction::new(op);
        instruction.set_type(result_type_id);
        let id = self.gen_id();
        instruction.set_result(id);
        instruction.add_operand(source_id);
        instruction.add_operand(coordinate_id);
        match operation {
            ImageProcessingOperation::SampleWeighted => {
                let weights = reference.ok_or(missing)?;
                self.mark_operand(weights, reference_sampler, Marking::Weight);
                let weights_id = self.sampled_operand(weights, reference_sampler, block)?;
                instruction.add_operand(weights_id);
            }
            ImageProcessingOperation::BoxFilter => {
                instruction.add_operand(self.cached.get(size.ok_or(missing)?)?);
            }
            ImageProcessingOperation::BlockMatch { .. } => {
                let (Some(reference), Some(reference_coordinate), Some(size)) =
                    (reference, reference_coordinate, size)
                else {
                    return Err(missing);
                };
                if let Some((marking, _)) = marking {
                    self.mark_operand(image, sampler, marking);
                    self.mark_operand(reference, reference_sampler, marking);
                }
                let reference_id = self.sampled_operand(reference, reference_sampler, block)?;
                instruction.add_operand(reference_id);
                instruction.add_operand(self.cached.get(reference_coordinate)?);
                instruction.add_operand(self.cached.get(size)?);
            }
        }
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_array_conversion(
        &mut self,
        result_type_id: Word,
        conversion: ArrayConversion,
        expr: Handle<Expression>,
        index: Option<Handle<Expression>>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        self.writer
            .require(&feature::COOPERATIVE_MATRIX_CONVERSION_QCOM)?;
        let op = match conversion {
            ArrayConversion::Bitcast => Op::BitCastArrayQCOM,
            ArrayConversion::SubArray => Op::ExtractSubArrayQCOM,
            ArrayConversion::ToCooperativeMatrix => Op::CompositeConstructCoopMatQCOM,
            ArrayConversion::FromCooperativeMatrix => Op::CompositeExtractCoopMatQCOM,
        };
        let mut instruction = Instruction::new(op);
        instruction.set_type(result_type_id);
        let id = self.gen_id();
        instruction.set_result(id);
        instruction.add_operand(self.cached.get(expr)?);
        if let Some(index) = index {
            instruction.add_operand(self.cached.get(index)?);
        }
        block.body.push(instruction);
        Ok(id)
    }
}
