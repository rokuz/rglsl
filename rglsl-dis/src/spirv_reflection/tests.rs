use spirv::{Decoration, Dim, ExecutionMode, ExecutionModel, Op, StorageClass};

use rglsl_types::ShaderStage;

use super::{
    DescriptorType, ReflectError, Reflection, ScalarKind, ScalarType, ScalarValue,
    SpecializationConstant, TensorType, WorkgroupDimension, reflect, reflect_graph,
};

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

#[test]
fn json_floats_round_trip_in_the_shortest_form() {
    let constant = |spec_id, width, bits| SpecializationConstant {
        spec_id,
        name: None,
        result_id: spec_id,
        scalar: ScalarType {
            kind: ScalarKind::Float,
            width,
        },
        default: ScalarValue::FloatBits(bits),
    };
    let reflection = Reflection {
        stage: ShaderStage::Compute,
        entry_point: String::from("main"),
        local_size: None,
        descriptor_bindings: Vec::new(),
        descriptor_heaps: Vec::new(),
        push_constants: Vec::new(),
        inputs: Vec::new(),
        outputs: Vec::new(),
        specialization_constants: vec![
            constant(0, 64, 1e300_f64.to_bits()),
            constant(1, 32, u64::from(0.1_f32.to_bits())),
            constant(2, 16, 0x3c00),
            constant(3, 64, f64::NAN.to_bits()),
            constant(4, 32, u64::from(f32::NEG_INFINITY.to_bits())),
            constant(5, 64, 1e-7_f64.to_bits()),
        ],
    };
    let json = reflection.to_json();
    for expected in [
        "\"default\": 1e300\n",
        "\"default\": 0.1\n",
        "\"default\": 1.0\n",
        "\"default\": \"NaN\"\n",
        "\"default\": \"-Infinity\"\n",
        "\"default\": 1e-7\n",
        "\"stage\": \"comp\"",
    ] {
        assert!(json.contains(expected), "{expected}\n{json}");
    }
}

#[test]
fn invalid_image_operands() {
    let mut words = compute();
    instruction(&mut words, Op::TypeFloat, &[10, 32]);
    instruction(
        &mut words,
        Op::TypeImage,
        &[11, 10, Dim::Dim2D as u32, 0, 0, 0, 3, 0],
    );
    assert_eq!(
        reflect(&words),
        Err(ReflectError::ImageSampled {
            image: 11,
            sampled: 3
        })
    );
}

fn graph_module(name: &str, interface: &[u32], inputs: u32) -> Vec<u32> {
    let mut words = header();
    let mut entry = vec![40];
    entry.extend(string(name));
    entry.extend_from_slice(interface);
    instruction(&mut words, Op::GraphEntryPointARM, &entry);
    instruction(
        &mut words,
        Op::Name,
        &[&[31][..], &string("frame")].concat(),
    );
    for (variable, binding) in [(30, 4), (31, 0), (32, 7)] {
        instruction(
            &mut words,
            Op::Decorate,
            &[variable, Decoration::DescriptorSet as u32, 0],
        );
        instruction(
            &mut words,
            Op::Decorate,
            &[variable, Decoration::Binding as u32, binding],
        );
    }
    instruction(&mut words, Op::TypeInt, &[10, 8, 1]);
    instruction(&mut words, Op::TypeInt, &[11, 32, 0]);
    instruction(&mut words, Op::TypeFloat, &[12, 16]);
    instruction(&mut words, Op::Constant, &[11, 13, 4]);
    instruction(&mut words, Op::Constant, &[11, 14, 1]);
    instruction(&mut words, Op::Constant, &[11, 15, 540]);
    instruction(&mut words, Op::Constant, &[11, 16, 960]);
    instruction(&mut words, Op::Constant, &[11, 17, 2]);
    instruction(&mut words, Op::TypeArray, &[18, 11, 13]);
    instruction(&mut words, Op::ConstantComposite, &[18, 19, 14, 15, 16, 13]);
    instruction(&mut words, Op::TypeTensorARM, &[20, 10, 13]);
    instruction(&mut words, Op::TypeTensorARM, &[21, 12, 13, 19]);
    instruction(&mut words, Op::TypeTensorARM, &[22, 12]);
    instruction(&mut words, Op::TypeArray, &[23, 21, 17]);
    for (pointer, pointee) in [(24, 20), (25, 23), (26, 22)] {
        instruction(
            &mut words,
            Op::TypePointer,
            &[pointer, StorageClass::UniformConstant as u32, pointee],
        );
    }
    for (pointer, variable) in [(24, 30), (25, 31), (26, 32)] {
        instruction(
            &mut words,
            Op::Variable,
            &[pointer, variable, StorageClass::UniformConstant as u32],
        );
    }
    instruction(&mut words, Op::GraphConstantARM, &[21, 35, 9]);
    instruction(&mut words, Op::GraphConstantARM, &[20, 36, 3]);
    instruction(&mut words, Op::TypeGraphARM, &[39, inputs, 20, 23, 22]);
    instruction(&mut words, Op::GraphARM, &[39, 40]);
    instruction(&mut words, Op::GraphEndARM, &[]);
    words
}

#[test]
fn graph_interface_in_declaration_order() -> Result<(), ReflectError> {
    for name in ["g", "main", "graph_partition_0"] {
        let words = graph_module(name, &[30, 31, 32], 2);
        assert_eq!(reflect(&words), Err(ReflectError::NoEntryPoint));
        let reflection = reflect_graph(&words)?;
        let [entry] = reflection.entry_points.as_slice() else {
            panic!("{:?}", reflection.entry_points);
        };
        assert_eq!(reflection.entry_point(name), Some(entry));
        assert_eq!((entry.name.as_str(), entry.graph_id), (name, 40));
        let bindings = |tensors: &[super::GraphTensor]| {
            tensors
                .iter()
                .map(|tensor| (tensor.set, tensor.binding, tensor.count, tensor.variable_id))
                .collect::<Vec<_>>()
        };
        assert_eq!(bindings(&entry.inputs), [(0, 4, 1, 30), (0, 0, 2, 31)]);
        assert_eq!(bindings(&entry.outputs), [(0, 7, 1, 32)]);
        let int8 = ScalarType {
            kind: ScalarKind::Int,
            width: 8,
        };
        let float16 = ScalarType {
            kind: ScalarKind::Float,
            width: 16,
        };
        let types = entry
            .inputs
            .iter()
            .chain(&entry.outputs)
            .map(|tensor| {
                let TensorType {
                    element,
                    rank,
                    ref shape,
                    ..
                } = tensor.tensor;
                (element, rank, shape.clone())
            })
            .collect::<Vec<_>>();
        assert_eq!(
            types,
            [
                (int8, Some(4), None),
                (float16, Some(4), Some(vec![1, 540, 960, 4])),
                (float16, None, None),
            ]
        );
        assert_eq!(
            entry
                .inputs
                .iter()
                .map(|tensor| tensor.name.as_deref())
                .collect::<Vec<_>>(),
            [None, Some("frame")]
        );
        let constants = reflection
            .constants
            .iter()
            .map(|constant| (constant.id, constant.result_id, constant.tensor.element))
            .collect::<Vec<_>>();
        assert_eq!(constants, [(3, 36, int8), (9, 35, float16)]);
    }
    Ok(())
}

#[test]
fn graph_json() -> Result<(), ReflectError> {
    let json = reflect_graph(&graph_module("g", &[31, 32], 1))?.to_json();
    let expected = r#"{
  "entry_points": [
    {
      "name": "g",
      "graph_id": 40,
      "inputs": [
        {
          "set": 0,
          "binding": 0,
          "count": 2,
          "name": "frame",
          "variable_id": 31,
          "type": {
            "scalar": "float",
            "width": 16,
            "rank": 4,
            "shape": [
              1,
              540,
              960,
              4
            ]
          }
        }
      ],
      "outputs": [
        {
          "set": 0,
          "binding": 7,
          "count": 1,
          "name": null,
          "variable_id": 32,
          "type": {
            "scalar": "float",
            "width": 16,
            "rank": null,
            "shape": null
          }
        }
      ]
    }
  ],
  "constants": [
    {
      "id": 3,
      "name": null,
      "result_id": 36,
      "type": {
        "scalar": "int",
        "width": 8,
        "rank": 4,
        "shape": null
      }
    },
    {
      "id": 9,
      "name": null,
      "result_id": 35,
      "type": {
        "scalar": "float",
        "width": 16,
        "rank": 4,
        "shape": [
          1,
          540,
          960,
          4
        ]
      }
    }
  ]
}
"#;
    assert_eq!(json, expected);
    Ok(())
}

#[test]
fn graph_errors() {
    assert_eq!(
        reflect_graph(&compute()),
        Err(ReflectError::NoGraphEntryPoint)
    );
    assert_eq!(
        reflect_graph(&graph_module("g", &[30], 2)),
        Err(ReflectError::GraphEntryPoint { graph: 40 })
    );
    assert_eq!(
        reflect_graph(&graph_module("g", &[30, 99], 1)),
        Err(ReflectError::GraphInterface { variable: 99 })
    );
    let mut words = graph_module("g", &[30, 33], 1);
    instruction(&mut words, Op::TypeFloat, &[50, 32]);
    instruction(
        &mut words,
        Op::TypePointer,
        &[51, StorageClass::UniformConstant as u32, 50],
    );
    instruction(
        &mut words,
        Op::Variable,
        &[51, 33, StorageClass::UniformConstant as u32],
    );
    assert_eq!(
        reflect_graph(&words),
        Err(ReflectError::GraphInterface { variable: 33 })
    );
    let mut words = graph_module("g", &[30], 1);
    instruction(&mut words, Op::TypeTensorARM, &[60, 10, 19]);
    instruction(&mut words, Op::GraphConstantARM, &[60, 61, 0]);
    assert_eq!(reflect_graph(&words), Err(ReflectError::TensorType(60)));
    let mut words = graph_module("g", &[30], 1);
    let mut entry = vec![77];
    entry.extend(string("other"));
    instruction(&mut words, Op::GraphEntryPointARM, &entry);
    assert_eq!(
        reflect_graph(&words),
        Err(ReflectError::GraphEntryPoint { graph: 77 })
    );
}
