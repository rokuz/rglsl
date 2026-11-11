use spirv::{Capability, Decoration, Op, StorageClass, Word};

use super::{Block, BlockContext, Error, Instruction, LocalImageType, LocalType, Writer};
use crate::arena::Handle;
use crate::{
    ArrayConversion, BlockMatchMetric, BlockMatchSearch, Expression, ImageProcessingOperation,
};

pub(super) const CAPABILITY_IMAGE_GATHER_LINEAR_QCOM: Word = 4543;
pub(super) const CAPABILITY_IMAGE_GATHER_EXTENDED_MODES_QCOM: Word = 4544;
pub(super) const OP_IMAGE_GATHER_QCOM: u32 = 4545;

const SPV_QCOM_IMAGE_PROCESSING: &str = "SPV_QCOM_image_processing";
const SPV_QCOM_IMAGE_PROCESSING2: &str = "SPV_QCOM_image_processing2";
const SPV_QCOM_COOPERATIVE_MATRIX_CONVERSION: &str = "SPV_QCOM_cooperative_matrix_conversion";

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
    pub(super) fn require_tile_shading(&mut self) -> Result<(), Error> {
        self.require_any("tile shading", &[Capability::TileShadingQCOM])?;
        self.use_extension("SPV_QCOM_tile_shading");
        Ok(())
    }

    fn decorate_once(&mut self, id: Word, decoration: Decoration) {
        if self.qcom_decorations.insert((id, decoration)) {
            self.decorate(id, decoration, &[]);
        }
    }
}

impl BlockContext<'_> {
    pub(super) fn handle_class(&self, base: Handle<Expression>) -> StorageClass {
        match self.ir_function.expressions[base] {
            Expression::GlobalVariable(handle)
                if self.ir_module.global_variables[handle].tile_attachment =>
            {
                StorageClass::TileAttachmentQCOM
            }
            _ => StorageClass::UniformConstant,
        }
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
        let (dim, arrayed, class) = match *self.fun_info[image].ty.inner_with(&self.ir_module.types)
        {
            crate::TypeInner::Image {
                dim,
                arrayed,
                class,
            } => (dim, arrayed, class),
            _ => return Err(Error::Validation("image processing operand")),
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
        let (op, capability, extension, marking) = match operation {
            ImageProcessingOperation::SampleWeighted => (
                Op::ImageSampleWeightedQCOM,
                Capability::TextureSampleWeightedQCOM,
                SPV_QCOM_IMAGE_PROCESSING,
                None,
            ),
            ImageProcessingOperation::BoxFilter => (
                Op::ImageBoxFilterQCOM,
                Capability::TextureBoxFilterQCOM,
                SPV_QCOM_IMAGE_PROCESSING,
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
                    Capability::TextureBlockMatchQCOM,
                    SPV_QCOM_IMAGE_PROCESSING,
                    Some((marking, search != BlockMatchSearch::Block)),
                )
            }
        };
        self.writer.require_any("image processing", &[capability])?;
        self.writer.use_extension(extension);
        if let Some((_, true)) = marking {
            self.writer
                .require_any("image processing", &[Capability::TextureBlockMatch2QCOM])?;
            self.writer.use_extension(SPV_QCOM_IMAGE_PROCESSING2);
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
                let (reference, reference_coordinate, size) =
                    match (reference, reference_coordinate, size) {
                        (Some(reference), Some(reference_coordinate), Some(size)) => {
                            (reference, reference_coordinate, size)
                        }
                        _ => return Err(missing),
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
        self.writer.require_any(
            "cooperative matrix conversion",
            &[Capability::CooperativeMatrixConversionQCOM],
        )?;
        self.writer
            .use_extension(SPV_QCOM_COOPERATIVE_MATRIX_CONVERSION);
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
