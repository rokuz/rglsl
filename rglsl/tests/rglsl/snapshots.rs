use rglsl::compact::KeepUnused;
use rglsl_test::*;

const DIR_IN: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/tests/in");
const DIR_OUT: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/tests/out");

#[allow(unused_variables)]
fn check_targets(input: &Input, module: &mut rglsl::Module, source_code: Option<&str>) {
    let params = input.read_parameters(DIR_IN);
    let name = input.file_name.display().to_string();

    let targets = params.targets.unwrap();

    let mut capabilities = params.capabilities.unwrap_or_default();
    {
        let mut allowed_capabilities = rglsl::valid::Capabilities::all();
        if targets.contains(Targets::SPIRV) {
            allowed_capabilities &= rglsl::back::spv::supported_capabilities();
        }
        if capabilities == rglsl::valid::Capabilities::all() {
            capabilities = allowed_capabilities;
        } else {
            let diff = capabilities - allowed_capabilities;
            if !diff.is_empty() {
                panic!(
                    "Invalid capabilities for backends on shader {name}: used {diff:?} which aren't supported by one of the targets.
Note: this is an issue with snapshot configuration, not code. If you added a new capability, add it to `supported_capabilities()` in each backend where it is supported"
                );
            }
        }
    }

    {
        if targets.contains(Targets::IR) {
            let config = ron::ser::PrettyConfig::default().new_line("\n".to_string());
            let string = ron::ser::to_string_pretty(module, config).unwrap();
            input.write_output_file("ir", "ron", string, DIR_OUT);
        }
    }

    let validation_flags = if targets.contains(Targets::NO_VALIDATION) {
        rglsl::valid::ValidationFlags::empty()
    } else {
        rglsl::valid::ValidationFlags::all()
    };

    let info = rglsl::valid::Validator::new(validation_flags, capabilities)
        .validate(module)
        .unwrap_or_else(|err| {
            panic!("rglsl module validation failed on test `{name}`:\n{err:?}");
        });

    let info = {
        // Our backends often generate temporary names based on handle indices,
        // which means that adding or removing unused arena entries can affect
        // the output even though they have no semantic effect. Such
        // meaningless changes add noise to snapshot diffs, making accurate
        // patch review difficult. Compacting the modules before generating
        // snapshots makes the output independent of unused arena entries.
        rglsl::compact::compact(module, KeepUnused::No);

        {
            if targets.contains(Targets::IR) {
                let config = ron::ser::PrettyConfig::default().new_line("\n".to_string());
                let string = ron::ser::to_string_pretty(module, config).unwrap();
                input.write_output_file("ir", "compact.ron", string, DIR_OUT);
            }
        }

        rglsl::valid::Validator::new(validation_flags, capabilities)
            .validate(module)
            .unwrap_or_else(|err| {
                panic!("Post-compaction module validation failed on test '{name}':\n<{err:?}")
            })
    };

    let shared_info = WriterSharedOptions {
        mesh_output_validation: params.mesh_output_validation,
        task_limits: params.task_limits,
        bounds_checks_policies: params.bounds_check_policies,
    };

    {
        if targets.contains(Targets::ANALYSIS) {
            let config = ron::ser::PrettyConfig::default().new_line("\n".to_string());
            let string = ron::ser::to_string_pretty(&info, config).unwrap();
            input.write_output_file("analysis", "info.ron", string, DIR_OUT);
        }
    }

    if targets.contains(Targets::SPIRV) {
        let mut debug_info = None;
        if let Some(source_code) = source_code {
            debug_info = Some(rglsl::back::spv::DebugInfo {
                source_code,
                file_name: &name,
                // wgpu#6266: we technically know all the information here to
                // produce the valid language but it's not too important for
                // validation purposes
                language: rglsl::back::spv::SourceLanguage::Unknown,
            })
        }

        write_output_spv(
            input,
            module,
            &info,
            debug_info,
            &params.spv,
            &params.pipeline_constants,
            &shared_info,
        );
    }
}

fn write_output_spv(
    input: &Input,
    module: &rglsl::Module,
    info: &rglsl::valid::ModuleInfo,
    debug_info: Option<rglsl::back::spv::DebugInfo>,
    params: &SpirvOutParameters,
    pipeline_constants: &rglsl::back::PipelineConstants,
    shared_options: &WriterSharedOptions,
) {
    use rglsl::back::spv;

    let options = params.to_options(shared_options, debug_info);

    let (module, info) =
        rglsl::back::pipeline_constants::process_overrides(module, info, None, pipeline_constants)
            .expect("override evaluation failed");

    if params.separate_entry_points {
        for ep in module.entry_points.iter() {
            let pipeline_options = spv::PipelineOptions {
                entry_point: ep.name.clone(),
                shader_stage: ep.stage,
            };
            write_output_spv_inner(
                input,
                &module,
                &info,
                &options,
                Some(&pipeline_options),
                &format!("{}.spvasm", ep.name),
            );
        }
    } else {
        write_output_spv_inner(input, &module, &info, &options, None, "spvasm");
    }
}

fn write_output_spv_inner(
    input: &Input,
    module: &rglsl::Module,
    info: &rglsl::valid::ModuleInfo,
    options: &rglsl::back::spv::Options<'_>,
    pipeline_options: Option<&rglsl::back::spv::PipelineOptions>,
    extension: &str,
) {
    use rglsl::back::spv;
    use rspirv::binary::Disassemble;
    println!("Generating SPIR-V for {:?}", input.file_name);
    let spv = spv::write_vec(module, info, options, pipeline_options).unwrap();
    let dis = rspirv::dr::load_words(spv)
        .expect("Produced invalid SPIR-V")
        .disassemble();
    // HACK escape CR/LF if source code is in side.
    let dis = if options.debug_info.is_some() {
        let dis = dis.replace("\\r", "\r");
        dis.replace("\\n", "\n")
    } else {
        dis
    };
    input.write_output_file("spv", extension, dis, DIR_OUT);
}

/// Compiles the serialized IR modules in `tests/in/ir`.
///
/// These inputs are upstream's WGSL snapshot inputs, parsed by the WGSL
/// frontend this project no longer has. They keep the SPIR-V backend and the
/// validator covered for IR that the GLSL frontend does not produce yet.
// While we _can_ run this test under miri, it is extremely slow (>5 minutes),
// so we disable it.
#[cfg_attr(miri, ignore)]
#[test]
fn convert_snapshots_ir() {
    let _ = env_logger::try_init();

    for input in Input::files_in_dir("ir", &["ron"], DIR_IN) {
        let source = input.read_source(DIR_IN, true);
        let mut module: rglsl::Module = ron::de::from_str(&source).unwrap_or_else(|error| {
            panic!(
                "{}: not a serialized module: {error}",
                input.input_path(DIR_IN).display()
            )
        });
        check_targets(&input, &mut module, None);
    }
}

// miri doesn't allow us to shell out to `spirv-as`
#[cfg_attr(miri, ignore)]
#[test]
fn convert_snapshots_spv() {
    use std::process::Command;

    let _ = env_logger::try_init();

    for input in Input::files_in_dir("spv", &["spvasm"], DIR_IN) {
        println!("Assembling '{}'", input.file_name.display());

        let command = Command::new("spirv-as")
            .arg(input.input_path(DIR_IN))
            .arg("-o")
            .arg("-")
            .output()
            .expect(
                "Failed to execute spirv-as. It can be installed \
            by installing the Vulkan SDK and adding it to your path.",
            );

        println!("Processing '{}'", input.file_name.display());

        if !command.status.success() {
            panic!(
                "spirv-as failed: {}\n{}",
                String::from_utf8_lossy(&command.stdout),
                String::from_utf8_lossy(&command.stderr)
            );
        }

        let params = input.read_parameters(DIR_IN);

        let mut module =
            rglsl::front::spv::parse_u8_slice(&command.stdout, &(&params.spv_in).into()).unwrap();

        check_targets(&input, &mut module, None);
    }
}

// While we _can_ run this test under miri, it is extremely slow (>5 minutes),
// and rglsl isn't the primary target for miri testing, so we disable it.
#[cfg_attr(miri, ignore)]
#[test]
fn convert_snapshots_glsl() {
    let _ = env_logger::try_init();

    for input in Input::files_in_dir("glsl", &["vert", "frag", "comp"], DIR_IN) {
        let input = Input {
            keep_input_extension: true,
            ..input
        };
        let file_name = &input.file_name;

        let stage = match file_name.extension().and_then(|s| s.to_str()).unwrap() {
            "vert" => rglsl::ShaderStage::Vertex,
            "frag" => rglsl::ShaderStage::Fragment,
            "comp" => rglsl::ShaderStage::Compute,
            ext => panic!("Unknown extension for glsl file {ext}"),
        };

        let mut parser = rglsl::front::glsl::Frontend::default();
        let mut module = parser
            .parse(
                &rglsl::front::glsl::Options {
                    // Many of these inputs leave out locations.
                    auto_map_locations: true,
                    ..rglsl::front::glsl::Options::from(stage)
                },
                &input.read_source(DIR_IN, true),
            )
            .unwrap();

        check_targets(&input, &mut module, None);
    }
}
