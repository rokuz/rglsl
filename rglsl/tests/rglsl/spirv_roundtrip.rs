fn words_to_bytes(words: &[u32]) -> Vec<u8> {
    let mut bytes = Vec::with_capacity(words.len() * 4);
    for word in words {
        bytes.extend_from_slice(&word.to_le_bytes());
    }
    bytes
}

#[test]
fn atomic_compare_exchange_roundtrip_to_spirv() -> crate::TestResult {
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
    let spv_words = rglsl::back::spv::write_vec(&module, &info, &options, Some(&pipeline_options))?;

    let spv_bytes = words_to_bytes(&spv_words);
    let parsed = rglsl::front::spv::parse_u8_slice(
        &spv_bytes,
        &rglsl::front::spv::Options {
            adjust_coordinate_space: true,
            strict_capabilities: false,
            block_ctx_dump_prefix: None,
        },
    )?;

    let parsed_info = validator.validate(&parsed)?;
    rglsl::back::spv::write_vec(&parsed, &parsed_info, &options, Some(&pipeline_options))?;
    Ok(())
}
