const UNDEFINED: &[(&str, &str)] = &[
    (
        "spv.noexplicitlayout.comp",
        "copies the uninitialized struct `new_bar` into the buffer",
    ),
    (
        "spv.Operations.frag",
        "reads the uninitialized locals `f` and `u` and the private bools `ub41` and `ub42`",
    ),
    (
        "spv.450.noRedecl.tesc",
        "never writes `patchOut` or `gl_out`, so every output is undefined",
    ),
    (
        "spv.atomicInt64.comp",
        "256 invocations store sums of atomic results that depend on their execution order",
    ),
    (
        "spv.structCopy.comp",
        "reads shared `s[id - count]` that only `s[0]` is written to, without a barrier",
    ),
    (
        "spv.subgroup.tesc",
        "stores `gl_SubgroupSize` and `gl_SubgroupInvocationID`, which are implementation-defined",
    ),
];

pub fn undefined(name: &str) -> Option<&'static str> {
    UNDEFINED
        .iter()
        .find(|(shader, _)| *shader == name)
        .map(|(_, why)| *why)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn lists_shaders_with_undefined_results() {
        assert!(undefined("spv.noexplicitlayout.comp").is_some());
        assert!(undefined("spv.atomic.comp").is_none());
    }
}
