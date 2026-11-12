#![cfg_attr(all(fuzzable_platform, fuzzing), no_main)]

#[cfg(all(fuzzable_platform, fuzzing))]
mod fuzz {
    use std::collections::BTreeMap;
    use std::sync::{Mutex, PoisonError};

    use libfuzzer_sys::fuzz_target;
    use rglsl::back::spv;
    use rglsl::front::glsl::{Frontend, Options};
    use rglsl::valid::{Capabilities, ValidationFlags, Validator};
    use rglsl::ShaderStage;
    use rglsl_fuzz::decisions::{decode, Seed};
    use rglsl_fuzz::ShaderJob;

    fn options() -> Options {
        Options {
            spirv_version: Some((1, 0)),
            ..Options::from(ShaderStage::Fragment)
        }
    }

    fn write_spirv(
        module: &rglsl::Module,
        info: &rglsl::valid::ModuleInfo,
    ) -> Result<Vec<u32>, String> {
        let options = spv::Options {
            lang_version: (1, 0),
            flags: spv::WriterFlags::DEBUG
                | spv::WriterFlags::LABEL_VARYINGS
                | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE,
            ..spv::Options::default()
        };
        spv::write_vec(module, info, &options, None).map_err(|error| format!("spv-out: {error}"))
    }

    fn read_back(words: Vec<u32>) {
        let options = rglsl::front::spv::Options::default();
        let _result = rglsl::front::spv::Frontend::new(words.into_iter(), &options).parse();
    }

    fn compile_direct(source: &str) -> Result<(), String> {
        let module = Frontend::default()
            .parse(&options(), source)
            .map_err(|errors| format!("parse: {errors}"))?;
        let info = Validator::new(ValidationFlags::all(), Capabilities::all())
            .validate(&module)
            .map_err(|error| format!("validate: {}", error.as_inner()))?;
        read_back(write_spirv(&module, &info)?);
        Ok(())
    }

    fn compile_linked(source: &str) -> Result<(), String> {
        let object = Frontend::default()
            .compile(&options(), source)
            .map_err(|errors| format!("compile: {errors}"))?;
        rglsl_link::validate_object(&object)
            .map_err(|errors| format!("validate object: {errors}"))?;
        let text = rglsl_link::encode(&object).map_err(|error| format!("encode: {error}"))?;
        let object = rglsl_link::decode(&text).map_err(|error| format!("decode: {error}"))?;
        let linked = rglsl_link::link_objects(&[object], &rglsl_link::Options::default())
            .map_err(|errors| format!("link: {errors}"))?;
        for stage in &linked {
            write_spirv(&stage.module, &stage.info)?;
        }
        Ok(())
    }

    fn compile(source: &str, link: bool) -> Result<(), String> {
        compile_direct(source)?;
        if link {
            compile_linked(source)?;
        }
        Ok(())
    }

    static REFERENCES: Mutex<BTreeMap<(&'static str, bool), bool>> = Mutex::new(BTreeMap::new());

    fn reference_compiles(seed: &'static str, source: &str, link: bool) -> bool {
        let key = (seed, link);
        if let Some(known) = REFERENCES
            .lock()
            .unwrap_or_else(PoisonError::into_inner)
            .get(&key)
        {
            return *known;
        }
        let compiles = compile(source, link).is_ok();
        REFERENCES
            .lock()
            .unwrap_or_else(PoisonError::into_inner)
            .insert(key, compiles);
        compiles
    }

    fn fragment(job: &ShaderJob) -> Option<String> {
        job.emit()
            .shaders
            .into_iter()
            .find(|(extension, _)| extension == Seed::EXTENSION)
            .map(|(_, text)| text)
    }

    fuzz_target!(|data: &[u8]| {
        let Ok(decoded) = decode(data) else {
            return;
        };
        let (Some(reference), Some(variant)) =
            (fragment(&decoded.reference), fragment(&decoded.variant))
        else {
            return;
        };
        if !reference_compiles(decoded.seed, &reference, decoded.link) {
            return;
        }
        if let Err(error) = compile(&variant, decoded.link) {
            eprintln!(
                "glsl_variant: rglsl compiles the reference {} but not its variant: {error}",
                decoded.seed
            );
            std::process::abort();
        }
    });
}

#[cfg(not(all(fuzzable_platform, fuzzing)))]
fn main() {}
