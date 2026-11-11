use alloc::{string::String, vec::Vec};

use spirv::Word;

use super::{
    block::{AccessTypeAdjustment, ExpressionPointer},
    helpers, Block, BlockContext, Error, Instruction, Writer,
};
use crate::{
    arena::Handle, Expression, GlobalVariable, Module, SpirvDecoration, SpirvDecorationOperands,
    SpirvExecutionModeOperands, SpirvId, SpirvInstruction, SpirvOperand,
};

const GLSL_STD_450: &str = "GLSL.std.450";
const DEBUG_INFO_SETS: [&str; 2] = ["OpenCL.DebugInfo.100", "NonSemantic.Shader.DebugInfo.100"];
const FUNCTION_DEBUG_INFO: [u32; 4] = [23, 24, 28, 29];
const OP_EXECUTION_MODE_ID: u32 = 331;
const OP_DECORATE_ID: u32 = 332;
const OP_DECORATE_STRING: u32 = 5632;
const OP_MEMBER_DECORATE_STRING: u32 = 5633;

impl Writer {
    pub(super) fn use_spirv_requirements(&mut self, module: &Module) {
        for extension in &module.spirv_requirements.extensions {
            if !self.extensions_used.iter().any(|used| used == extension) {
                self.raw_extensions.insert(extension.clone());
            }
        }
        for &capability in &module.spirv_requirements.capabilities {
            match spirv::Capability::from_u32(capability) {
                Some(known) => {
                    self.capabilities_used.insert(known);
                }
                None => {
                    self.raw_capabilities.insert(capability);
                }
            }
        }
    }

    pub(super) fn spirv_ext_import(&mut self, set: &str) -> Word {
        if set == GLSL_STD_450 {
            return self.gl450_ext_inst_id;
        }
        if let Some(&id) = self.spirv_ext_imports.get(set) {
            return id;
        }
        let id = self.id_gen.next();
        Instruction::ext_inst_import(id, set).to_words(&mut self.logical_layout.ext_inst_imports);
        self.spirv_ext_imports.insert(String::from(set), id);
        id
    }

    pub(super) fn write_spirv_execution_modes(
        &mut self,
        function_id: Word,
        entry_point: &crate::EntryPoint,
    ) -> Result<(), Error> {
        for mode in &entry_point.spirv_execution_modes {
            let instruction = match mode.operands {
                SpirvExecutionModeOperands::Literals(ref literals) => {
                    let mut instruction = Instruction::new(spirv::Op::ExecutionMode);
                    instruction.add_operand(function_id);
                    instruction.add_operand(mode.mode);
                    instruction.add_operands(literals.clone());
                    instruction
                }
                SpirvExecutionModeOperands::Ids(ref ids) => {
                    let mut instruction = Instruction::raw(OP_EXECUTION_MODE_ID);
                    instruction.add_operand(function_id);
                    instruction.add_operand(mode.mode);
                    for &id in ids {
                        let id = self.written(id)?;
                        instruction.add_operand(id);
                    }
                    instruction
                }
            };
            instruction.to_words(&mut self.logical_layout.execution_modes);
        }
        Ok(())
    }

    pub(super) fn write_spirv_decorations(&mut self, module: &Module) -> Result<(), Error> {
        for (handle, global) in module.global_variables.iter() {
            if global.spirv_decorations.is_empty() {
                continue;
            }
            let id = self.global_variables[handle].var_id;
            if id == 0 {
                continue;
            }
            self.write_spirv_global_decorations(id, global)?;
        }
        Ok(())
    }

    fn write_spirv_global_decorations(
        &mut self,
        id: Word,
        global: &GlobalVariable,
    ) -> Result<(), Error> {
        for decoration in &global.spirv_decorations {
            let instruction = self.spirv_decoration(id, None, decoration)?;
            self.annotations.push(instruction);
        }
        Ok(())
    }

    fn spirv_decoration(
        &mut self,
        id: Word,
        member: Option<u32>,
        decoration: &SpirvDecoration,
    ) -> Result<Instruction, Error> {
        let mut instruction = match (&decoration.operands, member) {
            (&SpirvDecorationOperands::Literals(_), None) => Instruction::new(spirv::Op::Decorate),
            (&SpirvDecorationOperands::Literals(_), Some(_)) => {
                Instruction::new(spirv::Op::MemberDecorate)
            }
            (&SpirvDecorationOperands::Ids(_), _) => Instruction::raw(OP_DECORATE_ID),
            (&SpirvDecorationOperands::Strings(_), None) => Instruction::raw(OP_DECORATE_STRING),
            (&SpirvDecorationOperands::Strings(_), Some(_)) => {
                Instruction::raw(OP_MEMBER_DECORATE_STRING)
            }
        };
        instruction.add_operand(id);
        if let Some(member) = member {
            instruction.add_operand(member);
        }
        instruction.add_operand(decoration.decoration);
        match decoration.operands {
            SpirvDecorationOperands::Literals(ref literals) => {
                instruction.add_operands(literals.clone());
            }
            SpirvDecorationOperands::Ids(ref ids) => {
                for &operand in ids {
                    let operand = match operand {
                        SpirvId::Constant(constant) => self.written(constant)?,
                        SpirvId::Global(global) => match self.global_variables[global].var_id {
                            0 => {
                                return Err(Error::Validation(
                                    "a decoration names an unwritten variable",
                                ))
                            }
                            var_id => var_id,
                        },
                    };
                    instruction.add_operand(operand);
                }
            }
            SpirvDecorationOperands::Strings(ref strings) => {
                for text in strings {
                    instruction.add_operands(helpers::string_to_words(text));
                }
            }
        }
        Ok(instruction)
    }
}

impl BlockContext<'_> {
    pub(super) fn write_spirv_instruction(
        &mut self,
        block: &mut Block,
        instruction: &SpirvInstruction,
        operands: &[SpirvOperand],
        result: Option<Handle<Expression>>,
    ) -> Result<(), Error> {
        let mut words: Vec<Word> = Vec::with_capacity(operands.len());
        for operand in operands {
            words.push(match *operand {
                SpirvOperand::Value(value) => match self.ir_function.expressions[value] {
                    Expression::GlobalVariable(global)
                        if self.ir_module.global_variables[global].space
                            == crate::AddressSpace::Handle =>
                    {
                        self.get_handle_id(value)?
                    }
                    _ => self.cached.get(value)?,
                },
                SpirvOperand::Literal(literal) => literal,
                SpirvOperand::Pointer(pointer) => {
                    match self.write_access_chain(pointer, block, AccessTypeAdjustment::None)? {
                        ExpressionPointer::Ready { pointer_id } => pointer_id,
                        ExpressionPointer::Conditional { .. } => {
                            return Err(Error::Validation(
                                "a SPIR-V instruction operand needs a bounds check",
                            ))
                        }
                    }
                }
            });
        }
        let result_type = match result {
            Some(result) => Some((
                self.get_expression_type_id(&self.fun_info[result].ty)?,
                result,
            )),
            None => None,
        };
        match instruction.set {
            Some(ref set) => {
                let set_id = self.writer.spirv_ext_import(set);
                let id = self.gen_id();
                let type_id = result_type.map_or(self.writer.void_type, |(type_id, _)| type_id);
                let ext_inst =
                    Instruction::ext_inst(set_id, instruction.opcode, type_id, id, &words);
                let global = DEBUG_INFO_SETS.contains(&set.as_str())
                    && !FUNCTION_DEBUG_INFO.contains(&instruction.opcode)
                    && operands
                        .iter()
                        .all(|operand| matches!(*operand, SpirvOperand::Literal(_)));
                if global {
                    ext_inst.to_words(&mut self.writer.logical_layout.declarations);
                } else {
                    block.body.push(ext_inst);
                }
                if let Some((_, result)) = result_type {
                    self.cached.set(result, id)?;
                }
            }
            None => {
                let mut raw = Instruction::raw(instruction.opcode);
                if let Some((type_id, result)) = result_type {
                    let id = self.gen_id();
                    raw.set_type(type_id);
                    raw.set_result(id);
                    self.cached.set(result, id)?;
                }
                raw.add_operands(words);
                block.body.push(raw);
            }
        }
        Ok(())
    }
}
