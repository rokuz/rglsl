use alloc::vec::Vec;

use rglsl_types::stack::recurse;
use spirv::{Decoration, Op, Word};

use super::plain_types::CompositeShape;
use super::{
    Block, BlockContext, Error, Instruction, Writer, WriterFlags, feature, grammar, helpers,
};
use crate::{DebugPrintfArgument, Expression, Type, TypeInner, arena::Handle};

impl Writer {
    pub(super) fn debug_string(&mut self, text: &str) -> Word {
        if let Some(&id) = self.debug_printf_strings.get(text) {
            return id;
        }
        let id = self.id_gen.next();
        self.debug_strings.push(Instruction::string(text, id));
        self.debug_printf_strings.insert(text.into(), id);
        id
    }

    fn utf_encoded(&mut self, id: Word) {
        if self.utf_encoded.insert(id) {
            let mut instruction = Instruction::new(Op::Decorate);
            instruction.add_operand(id);
            instruction.add_operand(grammar::decoration::UTFEncodedKHR);
            self.annotations.push(instruction);
        }
    }

    fn laid_out_copy(&mut self, module: &crate::Module, ty: Handle<Type>) -> Result<Word, Error> {
        if let Some(&id) = self.laid_out_copies.get(&ty) {
            return Ok(id);
        }
        let normal = self.get_handle_type_id(ty)?;
        if self.laid_out_types.contains(ty) {
            return Ok(normal);
        }
        let id = match module.types[ty].inner {
            TypeInner::Array { base, stride, .. } => {
                let element = recurse(|| self.laid_out_copy(module, base))?;
                let Some(&CompositeShape::Array {
                    length: Some(length),
                    ..
                }) = self
                    .composite_types
                    .get(&normal)
                    .map(|composite| &composite.shape)
                else {
                    return Err(Error::Validation("abort message array"));
                };
                let id = self.id_gen.next();
                Instruction::type_array(id, element, length)
                    .to_words(&mut self.logical_layout.declarations);
                self.decorate(id, Decoration::ArrayStride, &[stride]);
                id
            }
            TypeInner::Struct { ref members, .. } => {
                let member_ids = members
                    .iter()
                    .map(|member| recurse(|| self.laid_out_copy(module, member.ty)))
                    .collect::<Result<Vec<Word>, Error>>()?;
                let id = self.id_gen.next();
                for (index, member) in members.iter().enumerate() {
                    self.decorate_struct_member(id, index, member, &module.types, true)?;
                }
                Instruction::type_struct(id, &member_ids)
                    .to_words(&mut self.logical_layout.declarations);
                if self.flags.contains(WriterFlags::DEBUG)
                    && let Some(ref name) = module.types[ty].name
                {
                    self.debugs.push(Instruction::name(id, name));
                }
                id
            }
            _ => normal,
        };
        self.laid_out_copies.insert(ty, id);
        Ok(id)
    }
}

impl BlockContext<'_> {
    pub(super) fn write_debug_printf_statement(
        &mut self,
        block: &mut Block,
        format: &str,
        arguments: &[DebugPrintfArgument],
    ) -> Result<(), Error> {
        self.writer.debug_string(format);
        let mut operands = Vec::with_capacity(arguments.len());
        for argument in arguments {
            operands.push(match *argument {
                DebugPrintfArgument::Value(value) => self.cached.get(value)?,
                DebugPrintfArgument::String(ref text) => self.writer.debug_string(text),
            });
        }
        self.writer.write_debug_printf(block, format, &operands);
        Ok(())
    }

    pub(super) fn write_abort(
        &mut self,
        mut block: Block,
        message: &str,
        ty: Handle<Type>,
        arguments: &[Handle<Expression>],
    ) -> Result<(), Error> {
        self.writer.use_feature(&feature::ABORT);

        let module = self.ir_module;
        let TypeInner::Struct { ref members, .. } = module.types[ty].inner else {
            return Err(Error::Validation("abort message type"));
        };
        let text = members
            .first()
            .ok_or(Error::Validation("abort message type"))?
            .ty;
        let message_type = self.writer.laid_out_copy(module, ty)?;
        let laid_out_text = self.writer.laid_out_copy(module, text)?;
        let text_id = self.writer.get_handle_type_id(text)?;
        let packed = self.writer.plain_type_id(text_id);
        self.writer.utf_encoded(packed);
        self.writer.utf_encoded(laid_out_text);

        let data = self.gen_id();
        let mut constant = Instruction::raw(grammar::op::ConstantDataKHR);
        constant.set_type(packed);
        constant.set_result(data);
        constant.add_operands(helpers::string_to_words(message));
        constant.to_words(&mut self.writer.logical_layout.declarations);

        let mut member_types = Vec::with_capacity(arguments.len() + 1);
        let mut values = Vec::with_capacity(arguments.len() + 1);
        member_types.push(packed);
        values.push(data);
        for &argument in arguments {
            let type_id = self.get_expression_type_id(&self.fun_info[argument].ty)?;
            member_types.push(type_id);
            values.push(self.cached.get(argument)?);
        }
        let value_type = self.gen_id();
        Instruction::type_struct(value_type, &member_types)
            .to_words(&mut self.writer.logical_layout.declarations);
        if self.writer.flags.contains(WriterFlags::DEBUG) {
            self.writer
                .debugs
                .push(Instruction::name(value_type, "abortMessageValueType"));
        }

        let value = self.gen_id();
        block
            .body
            .push(Instruction::composite_construct(value_type, value, &values));
        let mut abort = Instruction::raw(grammar::op::AbortKHR);
        abort.add_operand(message_type);
        abort.add_operand(value);
        self.function.consume(block, abort);
        Ok(())
    }
}
