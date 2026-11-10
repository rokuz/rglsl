use alloc::{string::String, vec::Vec};

use spirv::{Op, StorageClass, Word};

use super::{Block, Error, Instruction, Writer, WriterFlags};
use crate::{arena::Handle, Expression, Module};

pub(super) enum CompositeShape {
    Array {
        element: Word,
        length: Option<Word>,
        count: Option<u32>,
    },
    Struct {
        members: Vec<Word>,
        member_names: Vec<Option<String>>,
    },
}

pub(super) struct CompositeType {
    pub shape: CompositeShape,
    pub name: Option<String>,
    pub laid_out: bool,
}

pub(super) const fn has_explicit_layout(class: StorageClass) -> bool {
    matches!(
        class,
        StorageClass::Uniform
            | StorageClass::StorageBuffer
            | StorageClass::PushConstant
            | StorageClass::PhysicalStorageBuffer
            | StorageClass::ShaderRecordBufferKHR
    )
}

impl Writer {
    pub(super) fn record_composite_type(&mut self, id: Word, composite: CompositeType) {
        self.composite_types.insert(id, composite);
    }

    pub(super) fn pointee_type_id(&mut self, base: Word, class: StorageClass) -> Word {
        if has_explicit_layout(class) {
            base
        } else {
            self.plain_type_id(base)
        }
    }

    pub(super) fn plain_type_id(&mut self, id: Word) -> Word {
        if let Some(&plain) = self.plain_types.get(&id) {
            return plain;
        }
        let Some(composite) = self.composite_types.get(&id) else {
            return id;
        };
        let name = composite.name.clone();
        let laid_out = composite.laid_out;
        let plain = match composite.shape {
            CompositeShape::Array {
                element, length, ..
            } => {
                let plain_element = self.plain_type_id(element);
                if !laid_out && plain_element == element {
                    id
                } else {
                    let plain = self.id_gen.next();
                    let instruction = match length {
                        Some(length) => Instruction::type_array(plain, plain_element, length),
                        None => Instruction::type_runtime_array(plain, plain_element),
                    };
                    instruction.to_words(&mut self.logical_layout.declarations);
                    plain
                }
            }
            CompositeShape::Struct {
                ref members,
                ref member_names,
            } => {
                let members = members.clone();
                let member_names = member_names.clone();
                let member_ids: Vec<Word> = members
                    .iter()
                    .map(|&member| self.plain_type_id(member))
                    .collect();
                if !laid_out && member_ids == members {
                    id
                } else {
                    let plain = self.id_gen.next();
                    Instruction::type_struct(plain, &member_ids)
                        .to_words(&mut self.logical_layout.declarations);
                    if self.flags.contains(WriterFlags::DEBUG) {
                        for (index, member_name) in member_names.iter().enumerate() {
                            if let (Some(member_name), Ok(index)) =
                                (member_name.as_ref(), u32::try_from(index))
                            {
                                self.debugs.push(Instruction::member_name(
                                    plain,
                                    index,
                                    member_name,
                                ));
                            }
                        }
                    }
                    plain
                }
            }
        };
        if plain != id && self.flags.contains(WriterFlags::DEBUG) {
            if let Some(ref name) = name {
                self.debugs.push(Instruction::name(plain, name));
            }
        }
        self.plain_types.insert(id, plain);
        plain
    }

    pub(super) fn needs_layout_conversion(&mut self, type_id: Word, class: StorageClass) -> bool {
        !has_explicit_layout(class) && self.plain_type_id(type_id) != type_id
    }

    pub(super) fn convert_layout(
        &mut self,
        block: &mut Block,
        type_id: Word,
        value: Word,
        to_plain: bool,
    ) -> Result<Word, Error> {
        let plain = self.plain_type_id(type_id);
        if plain == type_id {
            return Ok(value);
        }
        let to = if to_plain { plain } else { type_id };
        let id = self.id_gen.next();
        if self.lang_version() >= (1, 4) {
            let mut instruction = Instruction::new(Op::CopyLogical);
            instruction.set_type(to);
            instruction.set_result(id);
            instruction.add_operand(value);
            block.body.push(instruction);
            return Ok(id);
        }
        let parts: Vec<Word> = match self.composite_types.get(&type_id).map(|laid_out| &laid_out.shape) {
            Some(&CompositeShape::Array {
                element,
                count: Some(count),
                ..
            }) => (0..count).map(|_| element).collect(),
            Some(&CompositeShape::Struct { ref members, .. }) => members.clone(),
            _ => {
                return Err(Error::FeatureNotImplemented(
                    "copying an array of specialization-constant length between storage classes before SPIR-V 1.4",
                ))
            }
        };
        let mut converted = Vec::with_capacity(parts.len());
        for (index, part) in parts.into_iter().enumerate() {
            let index = u32::try_from(index).map_err(|_| Error::Validation("composite size"))?;
            let part_from = if to_plain {
                part
            } else {
                self.plain_type_id(part)
            };
            let extracted = self.id_gen.next();
            block.body.push(Instruction::composite_extract(
                part_from,
                extracted,
                value,
                &[index],
            ));
            converted.push(self.convert_layout(block, part, extracted, to_plain)?);
        }
        block
            .body
            .push(Instruction::composite_construct(to, id, &converted));
        Ok(id)
    }

    pub(super) fn plain_constant(
        &mut self,
        module: &Module,
        expr: Handle<Expression>,
    ) -> Result<Word, Error> {
        let id = self.constant_ids[expr];
        let ty = match module.global_expressions[expr] {
            Expression::Constant(constant) => {
                return self.plain_constant(module, module.constants[constant].init)
            }
            Expression::ZeroValue(ty) | Expression::Compose { ty, .. } => ty,
            _ => return Ok(id),
        };
        let type_id = self.get_handle_type_id(ty);
        let plain = self.plain_type_id(type_id);
        if plain == type_id {
            return Ok(id);
        }
        match module.global_expressions[expr] {
            Expression::Compose { ref components, .. } => {
                let parts = components
                    .iter()
                    .map(|&component| self.plain_constant(module, component))
                    .collect::<Result<Vec<_>, _>>()?;
                if self.is_override_dependent(expr) {
                    Ok(self.get_spec_constant_composite(plain, &parts))
                } else {
                    let composite = self.id_gen.next();
                    Instruction::constant_composite(plain, composite, &parts)
                        .to_words(&mut self.logical_layout.declarations);
                    Ok(composite)
                }
            }
            _ => Ok(self.get_constant_null(plain)),
        }
    }
}
