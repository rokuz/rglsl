use alloc::collections::BTreeSet;
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_sema::builtins::kind::BuiltinKind;
use rglsl_sema::builtins::{Builtins, ResourceLimits};

use super::builtins::route;
use crate::ShaderStage;

fn prototypes() -> BTreeSet<(String, usize)> {
    let mut prototypes = BTreeSet::new();
    for version in [450, 460] {
        for stage in ShaderStage::ALL {
            let builtins = Builtins::new(version, stage, &ResourceLimits::default());
            for name in builtins.function_names() {
                for &id in builtins.overloads(name) {
                    if builtins.kind(id) != BuiltinKind::Named {
                        continue;
                    }
                    let Some(function) = builtins.function(id) else {
                        continue;
                    };
                    prototypes.insert((function.name.clone(), function.parameters.len()));
                }
            }
        }
    }
    prototypes
}

#[test]
fn every_builtin_function_is_lowered_explicitly() -> crate::TestResult {
    let prototypes = prototypes();
    let unrouted: Vec<String> = prototypes
        .iter()
        .filter(|&&(ref name, _)| route(name).is_none())
        .map(|&(ref name, arity)| format!("{name} ({arity} arguments)"))
        .collect();
    if !unrouted.is_empty() {
        return Err(format!(
            "built-in functions declared by rglsl-sema that lowering does not recognise; route them \
             in lower/builtins.rs `route` (a family, or `Route::Generic` when `generic_values` \
             lowers them): {}",
            unrouted.join(", ")
        )
        .into());
    }
    Ok(())
}
