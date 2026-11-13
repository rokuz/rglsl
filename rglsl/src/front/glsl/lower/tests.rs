use alloc::collections::BTreeSet;
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;

use rglsl_sema::builtins::{Builtins, ResourceLimits};

use super::builtins::route;
use crate::ShaderStage;

const NOT_LOWERED: [&str; 10] = [
    "mbcntAMD",
    "packDouble2x32",
    "sparseTexelGradFetchARB",
    "sparseTexelGradFetchOffsetARB",
    "swizzleInvocationsAMD",
    "swizzleInvocationsMaskedAMD",
    "texelGradFetch",
    "texelGradFetchOffset",
    "unpackDouble2x32",
    "writeInvocationAMD",
];

fn prototypes() -> BTreeSet<(String, usize)> {
    let mut prototypes = BTreeSet::new();
    for version in [450, 460] {
        for stage in ShaderStage::ALL {
            let builtins = Builtins::new(version, stage, &ResourceLimits::default());
            for function in builtins.functions() {
                prototypes.insert((function.name.clone(), function.parameters.len()));
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
        .filter(|&&(ref name, arity)| {
            route(name, arity).is_none() && !NOT_LOWERED.contains(&name.as_str())
        })
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

#[test]
fn not_lowered_builtin_functions_are_current() -> crate::TestResult {
    let prototypes = prototypes();
    let stale: Vec<&str> = NOT_LOWERED
        .iter()
        .copied()
        .filter(|&name| {
            let declared: Vec<usize> = prototypes
                .iter()
                .filter(|&&(ref declared, _)| declared == name)
                .map(|&(_, arity)| arity)
                .collect();
            declared.is_empty() || declared.iter().any(|&arity| route(name, arity).is_some())
        })
        .collect();
    if !stale.is_empty() {
        return Err(format!(
            "NOT_LOWERED in lower/tests.rs lists functions that are lowered now or no longer \
             declared; remove them: {}",
            stale.join(", ")
        )
        .into());
    }
    Ok(())
}
