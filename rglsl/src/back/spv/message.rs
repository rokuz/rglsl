use alloc::vec::Vec;

use spirv::{Capability, Decoration, Op, Word};

use super::plain_types::CompositeShape;
use super::{helpers, Block, BlockContext, Error, Instruction, Writer, WriterFlags};
use crate::{arena::Handle, DebugPrintfArgument, Expression, Type, TypeInner};

const CAPABILITY_ABORT: Word = 5120;
const CAPABILITY_CONSTANT_DATA: Word = 5146;
const DECORATION_UTF_ENCODED: Word = 5145;
const OP_ABORT: u32 = 5121;
const OP_CONSTANT_DATA: u32 = 5147;

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
            instruction.add_operand(DECORATION_UTF_ENCODED);
            self.annotations.push(instruction);
        }
    }

    fn laid_out_copy(&mut self, module: &crate::Module, ty: Handle<Type>) -> Result<Word, Error> {
        let mut tasks = Vec::from([(ty, None)]);
        let mut results = Vec::new();
        while let Some((ty, normal)) = tasks.pop() {
            let Some(normal) = normal else {
                if let Some(&id) = self.laid_out_copies.get(&ty) {
                    results.push(id);
                    continue;
                }
                let normal = self.get_handle_type_id(ty)?;
                if self.laid_out_types.contains(ty) {
                    results.push(normal);
                    continue;
                }
                match module.types[ty].inner {
                    TypeInner::Array { base, .. } => {
                        tasks.push((ty, Some(normal)));
                        tasks.push((base, None));
                    }
                    TypeInner::Struct { ref members, .. } => {
                        tasks.push((ty, Some(normal)));
                        tasks.extend(members.iter().rev().map(|member| (member.ty, None)));
                    }
                    _ => {
                        self.laid_out_copies.insert(ty, normal);
                        results.push(normal);
                    }
                }
                continue;
            };
            let id = self.write_laid_out_copy(module, ty, normal, &mut results)?;
            self.laid_out_copies.insert(ty, id);
            results.push(id);
        }
        results
            .pop()
            .ok_or(Error::Internal("a laid out copy did not finish"))
    }

    fn write_laid_out_copy(
        &mut self,
        module: &crate::Module,
        ty: Handle<Type>,
        normal: Word,
        results: &mut Vec<Word>,
    ) -> Result<Word, Error> {
        Ok(match module.types[ty].inner {
            TypeInner::Array { stride, .. } => {
                let element = results
                    .pop()
                    .ok_or(Error::Internal("a laid out copy lost its element"))?;
                let length = match self
                    .composite_types
                    .get(&normal)
                    .map(|composite| &composite.shape)
                {
                    Some(&CompositeShape::Array {
                        length: Some(length),
                        ..
                    }) => length,
                    _ => return Err(Error::Validation("abort message array")),
                };
                let id = self.id_gen.next();
                Instruction::type_array(id, element, length)
                    .to_words(&mut self.logical_layout.declarations);
                self.decorate(id, Decoration::ArrayStride, &[stride]);
                id
            }
            TypeInner::Struct { ref members, .. } => {
                let start = results
                    .len()
                    .checked_sub(members.len())
                    .ok_or(Error::Internal("a laid out copy lost its members"))?;
                let member_ids = results.split_off(start);
                let id = self.id_gen.next();
                for (index, member) in members.iter().enumerate() {
                    self.decorate_struct_member(id, index, member, &module.types, true)?;
                }
                Instruction::type_struct(id, &member_ids)
                    .to_words(&mut self.logical_layout.declarations);
                if self.flags.contains(WriterFlags::DEBUG) {
                    if let Some(ref name) = module.types[ty].name {
                        self.debugs.push(Instruction::name(id, name));
                    }
                }
                id
            }
            _ => normal,
        })
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
        self.writer.capabilities_used.insert(Capability::Int8);
        self.writer.raw_capabilities.insert(CAPABILITY_ABORT);
        self.writer
            .raw_capabilities
            .insert(CAPABILITY_CONSTANT_DATA);
        self.writer.use_extension("SPV_KHR_abort");
        self.writer.use_extension("SPV_KHR_constant_data");

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
        let mut constant = Instruction::raw(OP_CONSTANT_DATA);
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
        let mut abort = Instruction::raw(OP_ABORT);
        abort.add_operand(message_type);
        abort.add_operand(value);
        self.function.consume(block, abort);
        Ok(())
    }
}
