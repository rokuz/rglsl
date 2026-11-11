pub mod eval;

pub type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;
