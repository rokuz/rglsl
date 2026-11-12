use spirv::{Op, Word};

use super::{Block, BlockContext, Error, Instruction, Writer};
use crate::arena::Handle;
use crate::{Expression, Scalar, ScalarKind};

const SPV_EXT_OCP_MICROSCALING_TYPES: &str = "SPV_EXT_ocp_microscaling_types";

const CAPABILITY_FLOAT6_EXT: Word = 4228;
const CAPABILITY_FLOAT4_EXT: Word = 4229;
const CAPABILITY_FLOAT8_UNSIGNED_E8M0_EXT: Word = 4230;
const CAPABILITY_MXINT8_EXT: Word = 4231;
const CAPABILITY_BITCAST_EXTRACT_EXT: Word = 4232;

const ENCODING_FLOAT6_E2M3_EXT: Word = 4223;
const ENCODING_FLOAT6_E3M2_EXT: Word = 4224;
const ENCODING_FLOAT4_E2M1_EXT: Word = 4225;
const ENCODING_FLOAT8_UNSIGNED_E8M0_EXT: Word = 4226;
const ENCODING_MXINT8_EXT: Word = 4227;

const OP_BITCAST_EXTRACT_EXT: u32 = 4195;

const fn encoding(kind: ScalarKind) -> Option<(Word, Word)> {
    Some(match kind {
        ScalarKind::FloatE2M1 => (CAPABILITY_FLOAT4_EXT, ENCODING_FLOAT4_E2M1_EXT),
        ScalarKind::FloatE3M2 => (CAPABILITY_FLOAT6_EXT, ENCODING_FLOAT6_E3M2_EXT),
        ScalarKind::FloatE2M3 => (CAPABILITY_FLOAT6_EXT, ENCODING_FLOAT6_E2M3_EXT),
        ScalarKind::FloatUE8M0 => (
            CAPABILITY_FLOAT8_UNSIGNED_E8M0_EXT,
            ENCODING_FLOAT8_UNSIGNED_E8M0_EXT,
        ),
        ScalarKind::FloatMXINT8 => (CAPABILITY_MXINT8_EXT, ENCODING_MXINT8_EXT),
        ScalarKind::Sint
        | ScalarKind::Uint
        | ScalarKind::Float
        | ScalarKind::Bool
        | ScalarKind::BFloat
        | ScalarKind::FloatE4M3
        | ScalarKind::FloatE5M2
        | ScalarKind::AbstractInt
        | ScalarKind::AbstractFloat => return None,
    })
}

impl Writer {
    pub(super) fn microscaling_type(&mut self, id: Word, scalar: Scalar) -> Option<Instruction> {
        let (capability, encoding) = encoding(scalar.kind)?;
        self.raw_capabilities.insert(capability);
        self.use_extension(SPV_EXT_OCP_MICROSCALING_TYPES);
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
                self.writer
                    .raw_capabilities
                    .insert(CAPABILITY_BITCAST_EXTRACT_EXT);
                self.writer.use_extension(SPV_EXT_OCP_MICROSCALING_TYPES);
                let mut instruction = Instruction::raw(OP_BITCAST_EXTRACT_EXT);
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
