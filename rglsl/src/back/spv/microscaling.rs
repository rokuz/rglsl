use spirv::{Op, Word};

use super::feature::{self, Feature};
use super::{Block, BlockContext, Error, Instruction, Writer, grammar};
use crate::arena::Handle;
use crate::{Expression, Scalar, ScalarKind};

const fn encoding(kind: ScalarKind) -> Option<(&'static Feature, Word)> {
    Some(match kind {
        ScalarKind::FloatE2M1 => (&feature::FLOAT4_TYPE, grammar::fp_encoding::Float4E2M1EXT),
        ScalarKind::FloatE3M2 => (&feature::FLOAT6_TYPE, grammar::fp_encoding::Float6E3M2EXT),
        ScalarKind::FloatE2M3 => (&feature::FLOAT6_TYPE, grammar::fp_encoding::Float6E2M3EXT),
        ScalarKind::FloatUE8M0 => (
            &feature::FLOAT8_UNSIGNED_E8M0_TYPE,
            grammar::fp_encoding::Float8UnsignedE8M0EXT,
        ),
        ScalarKind::FloatMXINT8 => (&feature::MXINT8_TYPE, grammar::fp_encoding::MXInt8EXT),
        ScalarKind::Sint
        | ScalarKind::Uint
        | ScalarKind::Float
        | ScalarKind::Bool
        | ScalarKind::BFloat
        | ScalarKind::FloatE4M3
        | ScalarKind::FloatE5M2 => return None,
    })
}

impl Writer {
    pub(super) fn microscaling_type(&mut self, id: Word, scalar: Scalar) -> Option<Instruction> {
        let (feature, encoding) = encoding(scalar.kind)?;
        self.use_feature(feature);
        let mut instruction = Instruction::new(Op::TypeFloat);
        instruction.set_result(id);
        instruction.add_operand(scalar.bit_width());
        instruction.add_operand(encoding);
        Some(instruction)
    }
}

impl BlockContext<'_> {
    pub(super) fn write_bitcast(
        &mut self,
        result_type_id: Word,
        expr: Handle<Expression>,
        offset: Option<Handle<Expression>>,
        block: &mut Block,
    ) -> Result<Word, Error> {
        let source = self.cached.get(expr)?;
        if offset.is_none() {
            let source_type_id = self.get_expression_type_id(&self.fun_info[expr].ty)?;
            if source_type_id == result_type_id {
                return Ok(source);
            }
        }
        let id = self.gen_id();
        let instruction = match offset {
            None => Instruction::unary(Op::Bitcast, result_type_id, id, source),
            Some(offset) => {
                self.writer.use_feature(&feature::BITCAST_EXTRACT);
                let mut instruction = Instruction::raw(grammar::op::BitcastExtractEXT);
                instruction.set_type(result_type_id);
                instruction.set_result(id);
                instruction.add_operand(source);
                instruction.add_operand(self.cached.get(offset)?);
                instruction
            }
        };
        block.body.push(instruction);
        Ok(id)
    }
}
