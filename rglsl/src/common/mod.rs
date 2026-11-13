//! Code common to the front and backends for specific languages.

mod diagnostic_debug;
pub mod predeclared;

pub use diagnostic_debug::{DiagnosticDebug, ForDebugWithTypes};
