pub const RED_ZONE: usize = 128 * 1024;
pub const SEGMENT: usize = 1024 * 1024;

#[inline]
pub fn recurse<R>(call: impl FnOnce() -> R) -> R {
    stacker::maybe_grow(RED_ZONE, SEGMENT, call)
}

#[cfg(test)]
mod tests {
    use super::recurse;

    fn nested(levels: u32) -> u32 {
        if levels == 0 {
            return 0;
        }
        let padding = core::hint::black_box([levels; 64]);
        recurse(|| nested(levels - 1)) + 1 + padding[0] - levels
    }

    #[test]
    fn recursion_through_the_wrapper_continues_on_heap_segments() {
        for levels in [0, 1, 1000, 100_000] {
            assert_eq!(nested(levels), levels);
        }
    }
}
