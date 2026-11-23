#![cfg_attr(all(fuzzable_platform, fuzzing), no_main)]

#[cfg(all(fuzzable_platform, fuzzing))]
mod fuzz {
    use std::iter::FromIterator;

    use arbitrary::Arbitrary;
    use libfuzzer_sys::fuzz_target;
    use rglsl::{
        FastHashMap, ShaderStage,
        front::glsl::{Frontend, Options},
    };

    #[derive(Debug, Arbitrary)]
    struct OptionsProxy {
        pub stage: ShaderStage,
        pub defines: Vec<(String, String)>,
        pub library: bool,
    }

    impl From<OptionsProxy> for Options {
        fn from(proxy: OptionsProxy) -> Self {
            Options {
                defines: FastHashMap::from_iter(proxy.defines),
                library: proxy.library,
                ..Options::from(proxy.stage)
            }
        }
    }

    fuzz_target!(|data: (OptionsProxy, String)| {
        let (options, source) = data;
        // Ensure the parser can handle potentially malformed strings without crashing.
        let parser = Frontend::default();
        let _result = parser.parse(&options.into(), &source);
    });
}

#[cfg(not(all(fuzzable_platform, fuzzing)))]
fn main() {}
