use rglsl::compact::KeepUnused;
use rglsl_test::*;

use crate::TestResult;

const DIR_IN: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/tests/in");
const DIR_OUT: &str = concat!(env!("CARGO_MANIFEST_DIR"), "/tests/out");

#[allow(unused_variables)]
fn check_targets(
    input: &Input,
    module: &mut rglsl::Module,
    source_code: Option<&str>,
) -> TestResult {
    let params = input.read_parameters(DIR_IN)?;
    let name = input.file_name.display().to_string();

    let targets = params
        .targets
        .ok_or_else(|| format!("{name}: no snapshot targets"))?;

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
                return Err(format!(
                    "Invalid capabilities for backends on shader {name}: used {diff:?} which aren't supported by one of the targets.
Note: this is an issue with snapshot configuration, not code. If you added a new capability, add it to `supported_capabilities()` in each backend where it is supported"
                )
                .into());
            }
        }
    }

    {
        if targets.contains(Targets::IR) {
            let config = ron::ser::PrettyConfig::default().new_line("\n".to_string());
            let string = ron::ser::to_string_pretty(module, config)?;
            input.write_output_file("ir", "ron", string, DIR_OUT)?;
        }
    }

    let validation_flags = if targets.contains(Targets::NO_VALIDATION) {
        rglsl::valid::ValidationFlags::empty()
    } else {
        rglsl::valid::ValidationFlags::all()
    };

    let info = rglsl::valid::Validator::new(validation_flags, capabilities)
        .validate(module)
        .map_err(|err| format!("rglsl module validation failed on test `{name}`:\n{err:?}"))?;

    let info = {
        // Our backends often generate temporary names based on handle indices,
        // which means that adding or removing unused arena entries can affect
        // the output even though they have no semantic effect. Such
        // meaningless changes add noise to snapshot diffs, making accurate
        // patch review difficult. Compacting the modules before generating
        // snapshots makes the output independent of unused arena entries.
        rglsl::compact::compact(module, KeepUnused::No)
            .map_err(|err| format!("compaction failed on test `{name}`: {err:?}"))?;

        {
            if targets.contains(Targets::IR) {
                let config = ron::ser::PrettyConfig::default().new_line("\n".to_string());
                let string = ron::ser::to_string_pretty(module, config)?;
                input.write_output_file("ir", "compact.ron", string, DIR_OUT)?;
            }
        }

        rglsl::valid::Validator::new(validation_flags, capabilities)
            .validate(module)
            .map_err(|err| {
                format!("Post-compaction module validation failed on test '{name}':\n<{err:?}")
            })?
    };

    let shared_info = WriterSharedOptions {
        mesh_output_validation: params.mesh_output_validation,
        task_limits: params.task_limits,
        bounds_checks_policies: params.bounds_check_policies,
    };

    {
        if targets.contains(Targets::ANALYSIS) {
            let config = ron::ser::PrettyConfig::default().new_line("\n".to_string());
            let string = ron::ser::to_string_pretty(&info, config)?;
            input.write_output_file("analysis", "info.ron", string, DIR_OUT)?;
        }
    }

    if targets.contains(Targets::SPIRV) {
        let debug_info = source_code.map(|_| rglsl::back::spv::DebugInfo::default());
        write_output_spv(
            input,
            module,
            &info,
            debug_info,
            &params.spv,
            &params.pipeline_constants,
            &shared_info,
        )?;
    }
    Ok(())
}

fn write_output_spv(
    input: &Input,
    module: &rglsl::Module,
    info: &rglsl::valid::ModuleInfo,
    debug_info: Option<rglsl::back::spv::DebugInfo>,
    params: &SpirvOutParameters,
    pipeline_constants: &rglsl::back::PipelineConstants,
    shared_options: &WriterSharedOptions,
) -> TestResult {
    use rglsl::back::spv;

    let options = params.to_options(shared_options, debug_info);

    let (module, info) =
        rglsl::back::pipeline_constants::process_overrides(module, info, None, pipeline_constants)
            .map_err(|err| format!("override evaluation failed: {err:?}"))?;

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
            )?;
        }
        Ok(())
    } else {
        write_output_spv_inner(input, &module, &info, &options, None, "spvasm")
    }
}

fn write_output_spv_inner(
    input: &Input,
    module: &rglsl::Module,
    info: &rglsl::valid::ModuleInfo,
    options: &rglsl::back::spv::Options<'_>,
    pipeline_options: Option<&rglsl::back::spv::PipelineOptions>,
    extension: &str,
) -> TestResult {
    use rglsl::back::spv;
    use rspirv::binary::Disassemble;
    println!("Generating SPIR-V for {:?}", input.file_name);
    let spv = spv::write_vec(module, info, options, pipeline_options)?;
    let dis = rspirv::dr::load_words(spv)
        .map_err(|err| format!("Produced invalid SPIR-V: {err}"))?
        .disassemble();
    // HACK escape CR/LF if source code is in side.
    let dis = if options.debug_info.is_some() {
        let dis = dis.replace("\\r", "\r");
        dis.replace("\\n", "\n")
    } else {
        dis
    };
    input.write_output_file("spv", extension, dis, DIR_OUT)
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
fn convert_snapshots_ir() -> TestResult {
    let _ = env_logger::try_init();

    for input in Input::files_in_dir("ir", &["ron"], DIR_IN)? {
        let source = input.read_source(DIR_IN, true)?;
        let mut module: rglsl::Module = ron::de::from_str(&source).map_err(|error| {
            format!(
                "{}: not a serialized module: {error}",
                input.input_path(DIR_IN).display()
            )
        })?;
        check_targets(&input, &mut module, None)?;
    }
    Ok(())
}

// miri doesn't allow us to shell out to `spirv-as`
#[cfg_attr(miri, ignore)]
#[test]
fn convert_snapshots_spv() -> TestResult {
    use std::process::Command;

    let _ = env_logger::try_init();

    for input in Input::files_in_dir("spv", &["spvasm"], DIR_IN)? {
        println!("Assembling '{}'", input.file_name.display());

        let command = Command::new("spirv-as")
            .arg(input.input_path(DIR_IN))
            .arg("-o")
            .arg("-")
            .output()
            .map_err(|err| {
                format!(
                    "Failed to execute spirv-as: {err}. It can be installed \
                by installing the Vulkan SDK and adding it to your path."
                )
            })?;

        println!("Processing '{}'", input.file_name.display());

        if !command.status.success() {
            return Err(format!(
                "spirv-as failed: {}\n{}",
                String::from_utf8_lossy(&command.stdout),
                String::from_utf8_lossy(&command.stderr)
            )
            .into());
        }

        let params = input.read_parameters(DIR_IN)?;

        let mut module =
            rglsl::front::spv::parse_u8_slice(&command.stdout, &(&params.spv_in).into())?;

        check_targets(&input, &mut module, None)?;
    }
    Ok(())
}

// While we _can_ run this test under miri, it is extremely slow (>5 minutes),
// and rglsl isn't the primary target for miri testing, so we disable it.
#[cfg_attr(miri, ignore)]
#[test]
fn convert_snapshots_glsl() -> TestResult {
    let _ = env_logger::try_init();

    for input in Input::files_in_dir("glsl", &["vert", "frag", "comp"], DIR_IN)? {
        let input = Input {
            keep_input_extension: true,
            ..input
        };
        let file_name = &input.file_name;

        let stage = match file_name.extension().and_then(|s| s.to_str()) {
            Some("vert") => rglsl::ShaderStage::Vertex,
            Some("frag") => rglsl::ShaderStage::Fragment,
            Some("comp") => rglsl::ShaderStage::Compute,
            _ => return Err(format!("Unknown extension for glsl file {file_name:?}").into()),
        };

        let source = input.read_source(DIR_IN, true)?;
        let options = rglsl::front::glsl::Options {
            // Many of these inputs leave out locations.
            auto_map_locations: true,
            ..rglsl::front::glsl::Options::from(stage)
        };
        let result = rglsl::front::glsl::Frontend::default().parse(&options, &source);
        if let Some(expected) = input.read_parameters(DIR_IN)?.expected_error {
            let Err(errors) = result else {
                return Err(format!("{file_name:?} was expected to fail with {expected:?}").into());
            };
            assert!(
                errors
                    .errors
                    .iter()
                    .any(|error| error.kind.to_string().contains(&expected)),
                "{file_name:?}: expected an error containing {expected:?}, got {errors}"
            );
            continue;
        }
        let mut module = result
            .map_err(|errors| format!("{file_name:?}: {}", errors.emit_to_string(&source)))?;

        validate_with_pinned_spirv_val(&input, &module)?;
        check_targets(&input, &mut module, None)?;
    }
    Ok(())
}

fn validate_with_pinned_spirv_val(input: &Input, module: &rglsl::Module) -> TestResult {
    let validator = std::path::Path::new(concat!(
        env!("CARGO_MANIFEST_DIR"),
        "/../target/oracles/bin/spirv-val"
    ));
    if !validator.exists() {
        println!(
            "spirv-val not found at {}: SPIR-V not validated",
            validator.display()
        );
        return Ok(());
    }
    let name = input.file_name.display().to_string();
    let info = rglsl::valid::Validator::new(
        rglsl::valid::ValidationFlags::all(),
        rglsl::valid::Capabilities::all(),
    )
    .validate(module)
    .map_err(|error| format!("{name}: {:?}", error.into_inner()))?;
    let words =
        rglsl::back::spv::write_vec(module, &info, &rglsl::back::spv::Options::default(), None)
            .map_err(|error| format!("{name}: {error}"))?;
    let output_dir = std::env::temp_dir().join(format!("rglsl-snapshots-{}", std::process::id()));
    std::fs::create_dir_all(&output_dir)?;
    let path = output_dir.join(format!("{name}.spv"));
    let bytes: Vec<u8> = words.iter().flat_map(|word| word.to_le_bytes()).collect();
    std::fs::write(&path, bytes)?;
    let output = std::process::Command::new(validator)
        .args(["--target-env", "vulkan1.0"])
        .arg(&path)
        .output()?;
    let _ = std::fs::remove_file(&path);
    assert!(
        output.status.success(),
        "{name}: invalid SPIR-V:\n{}",
        String::from_utf8_lossy(&output.stderr)
    );
    Ok(())
}
