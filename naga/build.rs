fn main() {
    cfg_aliases::cfg_aliases! {
        spv_out: { feature = "spv-out" },
        std: { any(test, feature = "stderr", feature = "fs") },
        no_std: { not(std) },
    }
}
