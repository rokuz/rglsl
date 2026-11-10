const UNDEFINED: &[(&str, &str)] = &[(
    "spv.noexplicitlayout.comp",
    "copies the uninitialized struct `new_bar` into the buffer",
)];

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
