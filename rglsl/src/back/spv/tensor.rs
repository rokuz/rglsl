use spirv::{Op, TensorOperands, Word};

use super::{Block, BlockContext, Error, Instruction, Writer};
use crate::{arena::Handle, CooperativeSize, Expression, Scalar};

const SPV_ARM_TENSORS: &str = "SPV_ARM_tensors";

impl Writer {
    pub(super) fn write_tensor_type(
        &mut self,
        id: Word,
        scalar: Scalar,
        rank: CooperativeSize,
    ) -> Result<Instruction, Error> {
        self.require_tensors()?;
        let element = self.get_numeric_type_id(super::NumericType::Scalar(scalar));
        let rank = self.cooperative_size_id(rank);
        let mut instruction = Instruction::new(Op::TypeTensorARM);
        instruction.set_result(id);
        instruction.add_operand(element);
        instruction.add_operand(rank);
        Ok(instruction)
    }

    fn require_tensors(&mut self) -> Result<(), Error> {
        self.use_extension(SPV_ARM_TENSORS);
        self.require_any("tensors", &[spirv::Capability::TensorsARM])
    }
}

impl BlockContext<'_> {
    fn tensor_operands(
        &mut self,
        instruction: &mut Instruction,
        nontemporal: bool,
        out_of_bounds: Option<Handle<Expression>>,
    ) -> Result<(), Error> {
        let mut mask = TensorOperands::NONE_ARM;
        if nontemporal {
            mask |= TensorOperands::NONTEMPORAL_ARM;
        }
        if out_of_bounds.is_some() {
            mask |= TensorOperands::OUT_OF_BOUNDS_VALUE_ARM;
        }
        if mask.is_empty() {
            return Ok(());
        }
        instruction.add_operand(mask.bits());
        if let Some(value) = out_of_bounds {
            instruction.add_operand(self.cached.get(value)?);
        }
        Ok(())
    }

    pub(super) fn write_tensor_read(
        &mut self,
        tensor: Handle<Expression>,
        coordinates: Handle<Expression>,
        (nontemporal, out_of_bounds): (bool, Option<Handle<Expression>>),
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let tensor_id = self.get_handle_id(tensor)?;
        let coordinates_id = self.cached.get(coordinates)?;
        let id = self.gen_id();
        let mut instruction = Instruction::new(Op::TensorReadARM);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(tensor_id);
        instruction.add_operand(coordinates_id);
        self.tensor_operands(&mut instruction, nontemporal, out_of_bounds)?;
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_tensor_query_size(
        &mut self,
        tensor: Handle<Expression>,
        dimension: u32,
        result_type_id: Word,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let tensor_id = self.get_handle_id(tensor)?;
        let dimension_id = self.writer.get_index_constant(dimension);
        let id = self.gen_id();
        let mut instruction = Instruction::new(Op::TensorQuerySizeARM);
        instruction.set_type(result_type_id);
        instruction.set_result(id);
        instruction.add_operand(tensor_id);
        instruction.add_operand(dimension_id);
        block.body.push(instruction);
        Ok(id)
    }

    pub(super) fn write_tensor_write(
        &mut self,
        tensor: Handle<Expression>,
        coordinates: Handle<Expression>,
        value: Handle<Expression>,
        nontemporal: bool,
        block: &mut Block,
    ) -> Result<(), Error> {
        let tensor_id = self.get_handle_id(tensor)?;
        let coordinates_id = self.cached.get(coordinates)?;
        let value_id = self.cached.get(value)?;
        let mut instruction = Instruction::new(Op::TensorWriteARM);
        instruction.add_operand(tensor_id);
        instruction.add_operand(coordinates_id);
        instruction.add_operand(value_id);
        self.tensor_operands(&mut instruction, nontemporal, None)?;
        block.body.push(instruction);
        Ok(())
    }
}
