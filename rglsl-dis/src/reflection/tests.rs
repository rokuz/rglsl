use spirv::{Decoration, Dim, ExecutionMode, ExecutionModel, Op, StorageClass};

use super::{DescriptorType, ReflectError, WorkgroupDimension, reflect};

const MAGIC: u32 = 0x0723_0203;

fn header() -> Vec<u32> {
    vec![MAGIC, 0x0001_0000, 0, 100, 0]
}

fn instruction(words: &mut Vec<u32>, op: Op, operands: &[u32]) {
    let count = u32::try_from(operands.len() + 1).unwrap_or(u32::MAX);
    words.push((count << 16) | op as u32);
    words.extend_from_slice(operands);
}

fn string(text: &str) -> Vec<u32> {
    let mut bytes = text.as_bytes().to_vec();
    bytes.push(0);
    while !bytes.len().is_multiple_of(4) {
        bytes.push(0);
    }
    bytes
        .chunks_exact(4)
        .map(|chunk| {
            chunk
                .iter()
                .rev()
                .fold(0_u32, |word, &byte| (word << 8) | u32::from(byte))
        })
        .collect()
}

fn entry_point(words: &mut Vec<u32>, model: ExecutionModel) {
    let mut operands = vec![model as u32, 1];
    operands.extend(string("main"));
    instruction(words, Op::EntryPoint, &operands);
}

fn compute() -> Vec<u32> {
    let mut words = header();
    entry_point(&mut words, ExecutionModel::GLCompute);
    instruction(
        &mut words,
        Op::ExecutionMode,
        &[1, ExecutionMode::LocalSize as u32, 8, 4, 1],
    );
    words
}

fn sampled_image(words: &mut Vec<u32>, decorate_set: bool) {
    if decorate_set {
        instruction(
            words,
            Op::Decorate,
            &[20, Decoration::DescriptorSet as u32, 1],
        );
    }
    instruction(words, Op::Decorate, &[20, Decoration::Binding as u32, 2]);
    instruction(words, Op::TypeFloat, &[10, 32]);
    instruction(
        words,
        Op::TypeImage,
        &[11, 10, Dim::Dim2D as u32, 0, 0, 0, 1, 0],
    );
    instruction(
        words,
        Op::TypePointer,
        &[12, StorageClass::UniformConstant as u32, 11],
    );
    instruction(
        words,
        Op::Variable,
        &[12, 20, StorageClass::UniformConstant as u32],
    );
}

#[test]
fn hand_written_module() -> Result<(), ReflectError> {
    let mut words = compute();
    sampled_image(&mut words, true);
    let reflection = reflect(&words)?;
    assert_eq!(
        reflection.local_size,
        Some([
            WorkgroupDimension::Fixed(8),
            WorkgroupDimension::Fixed(4),
            WorkgroupDimension::Fixed(1),
        ])
    );
    let [binding] = reflection.descriptor_bindings.as_slice() else {
        panic!("{:?}", reflection.descriptor_bindings);
    };
    assert_eq!(
        (binding.set, binding.binding, binding.descriptor_type),
        (1, 2, DescriptorType::SampledImage)
    );
    assert_eq!(binding.name, None);
    Ok(())
}

#[test]
fn short_headers() {
    assert_eq!(reflect(&[]), Err(ReflectError::Header { words: 0 }));
    assert_eq!(
        reflect(&[MAGIC, 0, 0]),
        Err(ReflectError::Header { words: 3 })
    );
}

#[test]
fn bad_magic() {
    let mut words = compute();
    if let Some(first) = words.first_mut() {
        *first = 0x0302_2307;
    }
    assert_eq!(reflect(&words), Err(ReflectError::Magic(0x0302_2307)));
}

#[test]
fn zero_word_count() {
    let mut words = compute();
    words.push(Op::Nop as u32);
    let offset = words.len() - 1;
    assert_eq!(reflect(&words), Err(ReflectError::ZeroWordCount { offset }));
}

#[test]
fn truncated_instructions() {
    let words = compute();
    for end in 6..words.len() {
        let truncated = words.get(..end).unwrap_or_default();
        let instruction_end = end == 10;
        assert!(
            matches!(
                reflect(truncated),
                Err(ReflectError::Truncated { .. } | ReflectError::NoEntryPoint)
            ) || instruction_end,
            "{end}"
        );
    }
    let mut overlong = compute();
    overlong.push((9 << 16) | Op::TypeVoid as u32);
    overlong.push(30);
    assert!(matches!(
        reflect(&overlong),
        Err(ReflectError::Truncated { opcode, .. }) if opcode == Op::TypeVoid as u32
    ));
}

#[test]
fn missing_operands() {
    let mut words = compute();
    instruction(&mut words, Op::TypeInt, &[10]);
    assert!(matches!(
        reflect(&words),
        Err(ReflectError::MissingOperand { opcode, .. }) if opcode == Op::TypeInt as u32
    ));
}

#[test]
fn unterminated_strings() {
    let mut words = header();
    instruction(
        &mut words,
        Op::EntryPoint,
        &[ExecutionModel::GLCompute as u32, 1, 0x6e69_616d],
    );
    assert!(matches!(
        reflect(&words),
        Err(ReflectError::UnterminatedString { .. })
    ));
}

#[test]
fn entry_points() {
    assert_eq!(reflect(&header()), Err(ReflectError::NoEntryPoint));
    let mut words = compute();
    entry_point(&mut words, ExecutionModel::Fragment);
    assert_eq!(reflect(&words), Err(ReflectError::MultipleEntryPoints));
    let mut kernel = header();
    entry_point(&mut kernel, ExecutionModel::Kernel);
    assert_eq!(
        reflect(&kernel),
        Err(ReflectError::ExecutionModel(ExecutionModel::Kernel as u32))
    );
}

#[test]
fn malformed_ids() {
    let mut undefined = compute();
    instruction(
        &mut undefined,
        Op::Variable,
        &[99, 20, StorageClass::Private as u32],
    );
    assert_eq!(
        reflect(&undefined),
        Err(ReflectError::NotAPointer { variable: 20 })
    );
    let mut duplicate = compute();
    instruction(&mut duplicate, Op::TypeFloat, &[10, 32]);
    instruction(&mut duplicate, Op::TypeFloat, &[10, 16]);
    assert_eq!(reflect(&duplicate), Err(ReflectError::DuplicateId(10)));
    let mut dangling = compute();
    instruction(
        &mut dangling,
        Op::TypePointer,
        &[12, StorageClass::StorageBuffer as u32, 77],
    );
    instruction(
        &mut dangling,
        Op::Decorate,
        &[20, Decoration::DescriptorSet as u32, 0],
    );
    instruction(
        &mut dangling,
        Op::Decorate,
        &[20, Decoration::Binding as u32, 0],
    );
    instruction(
        &mut dangling,
        Op::Variable,
        &[12, 20, StorageClass::StorageBuffer as u32],
    );
    assert_eq!(reflect(&dangling), Err(ReflectError::UndefinedType(77)));
}

#[test]
fn cyclic_types() {
    let mut words = compute();
    instruction(&mut words, Op::TypeStruct, &[30, 31]);
    instruction(&mut words, Op::TypeStruct, &[31, 30]);
    instruction(
        &mut words,
        Op::TypePointer,
        &[32, StorageClass::PushConstant as u32, 30],
    );
    instruction(
        &mut words,
        Op::Variable,
        &[32, 33, StorageClass::PushConstant as u32],
    );
    assert!(matches!(
        reflect(&words),
        Err(ReflectError::CyclicType(30 | 31))
    ));
}

#[test]
fn missing_descriptor_sets() {
    let mut words = compute();
    sampled_image(&mut words, false);
    assert_eq!(
        reflect(&words),
        Err(ReflectError::MissingDescriptorSet { variable: 20 })
    );
}

#[test]
fn unknown_resources() {
    let mut words = compute();
    instruction(
        &mut words,
        Op::Decorate,
        &[20, Decoration::DescriptorSet as u32, 0],
    );
    instruction(
        &mut words,
        Op::Decorate,
        &[20, Decoration::Binding as u32, 0],
    );
    instruction(&mut words, Op::TypeFloat, &[10, 32]);
    instruction(
        &mut words,
        Op::TypePointer,
        &[12, StorageClass::Uniform as u32, 10],
    );
    instruction(
        &mut words,
        Op::Variable,
        &[12, 20, StorageClass::Uniform as u32],
    );
    assert_eq!(
        reflect(&words),
        Err(ReflectError::UnknownResource { variable: 20 })
    );
}

#[test]
fn deep_nesting_does_not_overflow_the_stack() -> Result<(), ReflectError> {
    let depth = 20_000_u32;
    let mut words = compute();
    instruction(&mut words, Op::TypeFloat, &[10, 32]);
    instruction(&mut words, Op::TypeStruct, &[100, 10]);
    for level in 1..depth {
        instruction(&mut words, Op::TypeStruct, &[100 + level, 99 + level]);
    }
    let outer = 99 + depth;
    instruction(
        &mut words,
        Op::TypePointer,
        &[11, StorageClass::PushConstant as u32, outer],
    );
    instruction(
        &mut words,
        Op::Variable,
        &[11, 12, StorageClass::PushConstant as u32],
    );
    let reflection = reflect(&words)?;
    let [block] = reflection.push_constants.as_slice() else {
        panic!("{:?}", reflection.push_constants);
    };
    assert_eq!(block.size, 4);
    Ok(())
}
