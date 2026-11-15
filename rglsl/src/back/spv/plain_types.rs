use alloc::{string::String, vec::Vec};

use spirv::{Op, StorageClass, Word};

use super::{Block, Error, Instruction, Writer, WriterFlags};
use crate::{Expression, Module, arena::Handle};

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
    pub(super) const fn has_explicit_layout(&self, class: StorageClass) -> bool {
        has_explicit_layout(class)
            || (matches!(class, StorageClass::Workgroup) && self.workgroup_explicit_layout)
    }

    pub(super) fn record_composite_type(&mut self, id: Word, composite: CompositeType) {
        self.composite_types.insert(id, composite);
    }

    pub(super) fn pointee_type_id(&mut self, base: Word, class: StorageClass) -> Word {
        if self.has_explicit_layout(class) {
            base
        } else {
            self.plain_type_id(base)
        }
    }

    pub(super) fn plain_type_id(&mut self, id: Word) -> Word {
        if let Some(&plain) = self.plain_types.get(&id) {
            return plain;
        }
        if !self.composite_types.contains_key(&id) {
            return id;
        }
        let Ok(()) = crate::proc::post_order(
            self,
            id,
            |writer, id, children| {
                if writer.plain_types.contains_key(&id) {
                    return false;
                }
                match writer
                    .composite_types
                    .get(&id)
                    .map(|composite| &composite.shape)
                {
                    Some(&CompositeShape::Array { element, .. }) => children.push(element),
                    Some(&CompositeShape::Struct { ref members, .. }) => {
                        children.extend(members.iter().copied());
                    }
                    None => return false,
                }
                true
            },
            |writer, id| {
                writer.write_plain_type(id);
                Ok::<(), core::convert::Infallible>(())
            },
        );
        self.plain_of(id)
    }

    fn plain_of(&self, id: Word) -> Word {
        self.plain_types.get(&id).copied().unwrap_or(id)
    }

    fn write_plain_type(&mut self, id: Word) {
        let Some(composite) = self.composite_types.get(&id) else {
            return;
        };
        let name = composite.name.clone();
        let laid_out = composite.laid_out;
        let plain = match composite.shape {
            CompositeShape::Array {
                element, length, ..
            } => {
                let plain_element = self.plain_of(element);
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
                    .map(|&member| self.plain_of(member))
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
        if plain != id
            && self.flags.contains(WriterFlags::DEBUG)
            && let Some(ref name) = name
        {
            self.debugs.push(Instruction::name(plain, name));
        }
        self.plain_types.insert(id, plain);
        if plain != id {
            self.laid_out_of_plain.insert(plain, id);
        }
    }

    pub(super) fn needs_layout_conversion(&mut self, type_id: Word, class: StorageClass) -> bool {
        let explicit = self.has_explicit_layout(class);
        self.needs_layout_conversion_explicit(type_id, explicit)
    }

    pub(super) fn needs_layout_conversion_explicit(
        &mut self,
        type_id: Word,
        explicit: bool,
    ) -> bool {
        !explicit && self.plain_type_id(type_id) != type_id
    }

    pub(super) fn convert_layout(
        &mut self,
        block: &mut Block,
        type_id: Word,
        value: Word,
        to_plain: bool,
    ) -> Result<Word, Error> {
        let mut frames: Vec<Conversion> = Vec::new();
        let mut finished = None;
        match self.start_conversion(block, type_id, value, to_plain)? {
            Ok(word) => finished = Some(word),
            Err(frame) => frames.push(frame),
        }
        while let Some(top) = frames.last_mut() {
            if let Some(word) = finished.take() {
                top.converted.push(word);
            }
            let Some(&part) = top.parts.get(top.converted.len()) else {
                if let Some(frame) = frames.pop() {
                    block.body.push(Instruction::composite_construct(
                        frame.to,
                        frame.id,
                        &frame.converted,
                    ));
                    finished = Some(frame.id);
                }
                continue;
            };
            let index = u32::try_from(top.converted.len())
                .map_err(|_| Error::Validation("composite size"))?;
            let part_from = if to_plain {
                part
            } else {
                self.plain_type_id(part)
            };
            let extracted = self.id_gen.next();
            block.body.push(Instruction::composite_extract(
                part_from,
                extracted,
                top.value,
                &[index],
            ));
            match self.start_conversion(block, part, extracted, to_plain)? {
                Ok(word) => finished = Some(word),
                Err(frame) => frames.push(frame),
            }
        }
        finished.ok_or(Error::Internal("a layout conversion did not finish"))
    }

    fn start_conversion(
        &mut self,
        block: &mut Block,
        type_id: Word,
        value: Word,
        to_plain: bool,
    ) -> Result<Result<Word, Conversion>, Error> {
        let plain = self.plain_type_id(type_id);
        if plain == type_id {
            return Ok(Ok(value));
        }
        let to = if to_plain { plain } else { type_id };
        let id = self.id_gen.next();
        if self.lang_version() >= (1, 4) {
            let mut instruction = Instruction::new(Op::CopyLogical);
            instruction.set_type(to);
            instruction.set_result(id);
            instruction.add_operand(value);
            block.body.push(instruction);
            return Ok(Ok(id));
        }
        let parts: Vec<Word> = match self
            .composite_types
            .get(&type_id)
            .map(|laid_out| &laid_out.shape)
        {
            Some(&CompositeShape::Array {
                element,
                count: Some(count),
                ..
            }) => (0..count).map(|_| element).collect(),
            Some(&CompositeShape::Struct { ref members, .. }) => members.clone(),
            _ => {
                return Err(Error::FeatureNotImplemented(
                    "copying an array of specialization-constant length between storage classes before SPIR-V 1.4",
                ));
            }
        };
        Ok(Err(Conversion {
            id,
            to,
            value,
            converted: Vec::with_capacity(parts.len()),
            parts,
        }))
    }

    pub(super) fn plain_constant(
        &mut self,
        module: &Module,
        expr: Handle<Expression>,
    ) -> Result<Word, Error> {
        let mut tasks = Vec::from([ConstantTask::Enter(expr)]);
        let mut results = Vec::new();
        while let Some(task) = tasks.pop() {
            match task {
                ConstantTask::Enter(expr) => match self.enter_plain_constant(module, expr)? {
                    PlainConstant::Done(id) => results.push(id),
                    PlainConstant::Constant(init) => tasks.push(ConstantTask::Enter(init)),
                    PlainConstant::Compose { plain, components } => {
                        tasks.push(ConstantTask::Exit {
                            expr,
                            plain,
                            count: components.len(),
                        });
                        tasks.extend(
                            components
                                .iter()
                                .rev()
                                .map(|&component| ConstantTask::Enter(component)),
                        );
                    }
                },
                ConstantTask::Exit { expr, plain, count } => {
                    let start = results
                        .len()
                        .checked_sub(count)
                        .ok_or(Error::Internal("a plain constant lost its components"))?;
                    let parts = results.split_off(start);
                    let id = if self.is_override_dependent(expr) {
                        self.get_spec_constant_composite(plain, &parts)
                    } else {
                        let composite = self.id_gen.next();
                        Instruction::constant_composite(plain, composite, &parts)
                            .to_words(&mut self.logical_layout.declarations);
                        composite
                    };
                    results.push(id);
                }
            }
        }
        results
            .pop()
            .ok_or(Error::Internal("a plain constant did not finish"))
    }

    fn enter_plain_constant<'m>(
        &mut self,
        module: &'m Module,
        expr: Handle<Expression>,
    ) -> Result<PlainConstant<'m>, Error> {
        let id = self.constant_ids[expr];
        match module.global_expressions[expr] {
            Expression::Constant(constant) => {
                Ok(PlainConstant::Constant(module.constants[constant].init))
            }
            Expression::ZeroValue(ty) => {
                let type_id = self.get_handle_type_id(ty)?;
                let plain = self.plain_type_id(type_id);
                if plain == type_id {
                    Ok(PlainConstant::Done(id))
                } else {
                    Ok(PlainConstant::Done(self.get_constant_null(plain)))
                }
            }
            Expression::Compose { ty, ref components } => {
                let type_id = self.get_handle_type_id(ty)?;
                let plain = self.plain_type_id(type_id);
                if plain == type_id {
                    Ok(PlainConstant::Done(id))
                } else {
                    Ok(PlainConstant::Compose { plain, components })
                }
            }
            Expression::Literal(_)
            | Expression::Override(_)
            | Expression::Splat { .. }
            | Expression::Replicate { .. }
            | Expression::Access { .. }
            | Expression::AccessIndex { .. }
            | Expression::Swizzle { .. }
            | Expression::FunctionArgument(_)
            | Expression::GlobalVariable(_)
            | Expression::LocalVariable(_)
            | Expression::Load { .. }
            | Expression::ImageSample { .. }
            | Expression::ImageLoad { .. }
            | Expression::ImageQuery { .. }
            | Expression::Unary { .. }
            | Expression::Binary { .. }
            | Expression::Select { .. }
            | Expression::Derivative { .. }
            | Expression::Relational { .. }
            | Expression::Math { .. }
            | Expression::As { .. }
            | Expression::CallResult(_)
            | Expression::AtomicResult { .. }
            | Expression::ArrayLength(_)
            | Expression::WideArrayLength(_)
            | Expression::PhysicalPointer { .. }
            | Expression::PhysicalAddress { .. }
            | Expression::BufferPointer { .. }
            | Expression::HeapOffset { .. }
            | Expression::RayQueryProceedResult
            | Expression::RayQueryGet { .. }
            | Expression::ReportIntersectionResult
            | Expression::AccelerationStructureFromAddress { .. }
            | Expression::HitObjectGet { .. }
            | Expression::FetchMicroTriangleVertex { .. }
            | Expression::SubgroupBallotResult
            | Expression::SubgroupOperationResult { .. }
            | Expression::SpirvInstructionResult { .. }
            | Expression::CooperativeLoad { .. }
            | Expression::CooperativeMultiplyAdd { .. }
            | Expression::CooperativeMatrixLength { .. }
            | Expression::Expect { .. }
            | Expression::ImageSparseResident { .. }
            | Expression::IsHelperInvocation
            | Expression::ReadClock { .. }
            | Expression::InterpolateAt { .. }
            | Expression::FragmentFetch { .. }
            | Expression::ImageFootprint { .. }
            | Expression::AttachmentRead { .. }
            | Expression::CooperativeVectorLoad { .. }
            | Expression::CooperativeVectorMatMul { .. }
            | Expression::Convert { .. }
            | Expression::CooperativeMatrixResult { .. }
            | Expression::TensorCreate { .. }
            | Expression::ImageProcessing { .. }
            | Expression::ArrayConversion { .. }
            | Expression::Bitcast { .. }
            | Expression::TensorSet { .. }
            | Expression::TensorRead { .. }
            | Expression::TensorQuerySize { .. } => Ok(PlainConstant::Done(id)),
        }
    }
}

pub(super) struct Conversion {
    id: Word,
    to: Word,
    value: Word,
    parts: Vec<Word>,
    converted: Vec<Word>,
}

enum ConstantTask {
    Enter(Handle<Expression>),
    Exit {
        expr: Handle<Expression>,
        plain: Word,
        count: usize,
    },
}

enum PlainConstant<'m> {
    Done(Word),
    Constant(Handle<Expression>),
    Compose {
        plain: Word,
        components: &'m [Handle<Expression>],
    },
}
