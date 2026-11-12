#![cfg_attr(all(fuzzable_platform, fuzzing), no_main)]

#[cfg(all(fuzzable_platform, fuzzing))]
mod fuzz {
    use libfuzzer_sys::fuzz_target;

    fuzz_target!(|data: &[u8]| {
        let Ok(text) = core::str::from_utf8(data) else {
            return;
        };
        let Ok(objects) = text
            .split('\0')
            .take(4)
            .map(rglsl_link::decode)
            .collect::<Result<Vec<_>, _>>()
        else {
            return;
        };
        let _result = rglsl_link::link_objects(&objects, &rglsl_link::Options::default());
    });
}

#[cfg(not(all(fuzzable_platform, fuzzing)))]
fn main() {}
