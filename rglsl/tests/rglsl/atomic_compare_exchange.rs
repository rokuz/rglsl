use rspirv::dr::{self, Operand};
use rspirv::spirv::Op;

fn ids(operands: &[Operand]) -> Vec<u32> {
    operands
        .iter()
        .filter_map(|operand| match *operand {
            Operand::IdRef(id) => Some(id),
            _ => None,
        })
        .collect()
}

#[test]
fn atomic_compare_exchange_writes_spirv() -> crate::TestResult {
    let source = include_str!("../in/ir/atomicCompareExchange.ron");
    let module: rglsl::Module = ron::de::from_str(source)?;

    let mut validator = rglsl::valid::Validator::new(
        rglsl::valid::ValidationFlags::all(),
        rglsl::valid::Capabilities::empty(),
    );
    let info = validator.validate(&module)?;

    let pipeline_options = rglsl::back::spv::PipelineOptions {
        entry_point: "test_atomic_compare_exchange_u32".to_string(),
        shader_stage: rglsl::ShaderStage::Compute,
    };
    let options = rglsl::back::spv::Options::default();
    let words = rglsl::back::spv::write_vec(&module, &info, &options, Some(&pipeline_options))?;
    let spirv = dr::load_words(&words)?;

    assert_eq!(spirv.entry_points.len(), 1);
    assert!(spirv
        .entry_points
        .iter()
        .any(|entry| entry.operands.contains(&Operand::LiteralString(
            "test_atomic_compare_exchange_u32".to_string()
        ))));

    let instructions: Vec<&dr::Instruction> = spirv
        .functions
        .iter()
        .flat_map(|function| &function.blocks)
        .flat_map(|block| &block.instructions)
        .collect();
    let exchanges: Vec<u32> = instructions
        .iter()
        .filter(|instruction| instruction.class.opcode == Op::AtomicCompareExchange)
        .filter_map(|instruction| instruction.result_id)
        .collect();
    assert!(!exchanges.is_empty());
    for exchange in exchanges {
        let equal = instructions
            .iter()
            .find(|instruction| {
                instruction.class.opcode == Op::IEqual
                    && ids(&instruction.operands).first() == Some(&exchange)
            })
            .and_then(|instruction| instruction.result_id)
            .ok_or("no OpIEqual compares the original value")?;
        assert!(instructions.iter().any(|instruction| {
            instruction.class.opcode == Op::CompositeConstruct
                && ids(&instruction.operands) == [exchange, equal]
        }));
    }
    Ok(())
}
