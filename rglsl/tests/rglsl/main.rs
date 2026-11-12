#![allow(
    clippy::panic,
    clippy::unreachable,
    reason = "test support code fails by panicking"
)]

mod arithmetic;
mod cooperative;
mod glsl_vulkan;
mod snapshots;
mod spirv_roundtrip;
mod stage_io;
mod validation;

type TestResult<T = ()> = Result<T, Box<dyn core::error::Error>>;

fn rejected<T, E>(result: Result<T, E>) -> TestResult<E> {
    match result {
        Ok(_) => Err("expected an error, got a success".into()),
        Err(error) => Ok(error),
    }
}
