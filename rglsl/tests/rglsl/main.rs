#![allow(
    clippy::unwrap_used,
    clippy::expect_used,
    clippy::panic,
    clippy::unreachable,
    reason = "test support code fails by panicking"
)]

mod glsl_vulkan;
mod snapshots;
mod spirv_roundtrip;
mod stage_io;
mod validation;
