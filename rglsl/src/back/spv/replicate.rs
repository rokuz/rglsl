use alloc::vec::Vec;

use spirv::{Op, Word};

use crate::FastHashMap;

const fn replicated(op: Op) -> Option<Op> {
    match op {
        Op::ConstantComposite => Some(Op::ConstantCompositeReplicateEXT),
        Op::SpecConstantComposite => Some(Op::SpecConstantCompositeReplicateEXT),
        Op::CompositeConstruct => Some(Op::CompositeConstructReplicateEXT),
        _ => None,
    }
}

const fn keeps_memory(op: Op) -> bool {
    matches!(
        op,
        Op::Load
            | Op::CompositeExtract
            | Op::CompositeConstruct
            | Op::CopyLogical
            | Op::CopyObject
            | Op::AccessChain
            | Op::InBoundsAccessChain
            | Op::Line
            | Op::NoLine
            | Op::ExtInst
    )
}

#[derive(Default)]
struct Values {
    representative: FastHashMap<Word, Word>,
    keys: FastHashMap<Vec<Word>, Word>,
    loads: FastHashMap<(Word, Word), Word>,
}

impl Values {
    fn of(&self, id: Word) -> Word {
        self.representative.get(&id).copied().unwrap_or(id)
    }

    fn number(&mut self, key: Vec<Word>, result: Word) {
        let value = *self.keys.entry(key).or_insert(result);
        self.representative.insert(result, value);
    }

    fn clear(&mut self) {
        self.representative.clear();
        self.keys.clear();
        self.loads.clear();
    }

    fn visit(&mut self, op: Op, instruction: &[Word]) {
        let operands = instruction.get(1..).unwrap_or(&[]);
        match (op, operands) {
            (Op::Label | Op::Function | Op::FunctionEnd, _) => self.clear(),
            (Op::Load, &[ty, result, pointer]) => {
                let value = *self.loads.entry((ty, pointer)).or_insert(result);
                self.representative.insert(result, value);
            }
            (Op::CopyLogical | Op::CopyObject, &[ty, result, operand]) => {
                self.number(alloc::vec![op as Word, ty, self.of(operand)], result);
            }
            (Op::CompositeExtract, &[ty, result, composite, ref indices @ ..]) => {
                let mut key = Vec::with_capacity(indices.len() + 3);
                key.extend([op as Word, ty, self.of(composite)]);
                key.extend_from_slice(indices);
                self.number(key, result);
            }
            (Op::SpecConstantOp, &[ty, result, operation, composite, ref indices @ ..])
                if operation == Op::CompositeExtract as Word =>
            {
                let mut key = Vec::with_capacity(indices.len() + 3);
                key.extend([Op::CompositeExtract as Word, ty, self.of(composite)]);
                key.extend_from_slice(indices);
                self.number(key, result);
            }
            (
                Op::CompositeConstruct | Op::ConstantComposite | Op::SpecConstantComposite,
                &[ty, result, ref constituents @ ..],
            ) => {
                let mut key = Vec::with_capacity(constituents.len() + 2);
                key.extend([Op::CompositeConstruct as Word, ty]);
                key.extend(constituents.iter().map(|&id| self.of(id)));
                self.number(key, result);
            }
            _ => {}
        }
        if !keeps_memory(op) {
            self.loads.clear();
        }
    }
}

pub(super) fn replicate_composites(words: &mut Vec<Word>) -> bool {
    let mut output = Vec::with_capacity(words.len());
    let mut changed = false;
    let mut values = Values::default();
    let mut rest = words.as_slice();
    while let Some((&first, _)) = rest.split_first() {
        let count = usize::try_from(first >> 16)
            .unwrap_or(1)
            .clamp(1, rest.len());
        let (instruction, tail) = rest.split_at(count);
        rest = tail;
        let Some(op) = Op::from_u32(first & 0xffff) else {
            output.extend_from_slice(instruction);
            continue;
        };
        let replicate = replicated(op).filter(|_| {
            instruction
                .get(3..)
                .and_then(|constituents| constituents.split_first())
                .is_some_and(|(head, others)| {
                    let head = values.of(*head);
                    others.iter().all(|id| values.of(*id) == head)
                })
        });
        values.visit(op, instruction);
        match (replicate, instruction.get(..4)) {
            (Some(op), Some(&[_, result_type, result, value])) => {
                changed = true;
                output.push((4 << 16) | op as Word);
                output.extend([result_type, result, value]);
            }
            _ => output.extend_from_slice(instruction),
        }
    }
    if changed {
        *words = output;
    }
    changed
}
