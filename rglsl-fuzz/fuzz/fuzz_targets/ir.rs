#![cfg_attr(all(fuzzable_platform, fuzzing), no_main)]

#[cfg(all(fuzzable_platform, fuzzing))]
mod fuzz {
    use libfuzzer_sys::fuzz_target;

    fuzz_target!(|module: rglsl::Module| {
        use rglsl::valid as v;
        // Check if the module validates without errors.
        //TODO: may also fuzz the flags and capabilities
        let mut module = module;
        let mut validator = v::Validator::new(v::ValidationFlags::all());
        if validator.validate(&module).is_err() {
            return;
        }
        if rglsl::compact::compact(&mut module, rglsl::compact::KeepUnused::No).is_err() {
            return;
        }
        let Ok(info) = validator.validate(&module) else {
            return;
        };
        let _result = rglsl::back::spv::write_vec(
            &module,
            &info,
            &rglsl::back::spv::Options::default(),
            None,
        );
    });
}

#[cfg(not(all(fuzzable_platform, fuzzing)))]
fn main() {}
