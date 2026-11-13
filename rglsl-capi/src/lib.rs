mod api;
#[expect(
    unsafe_code,
    clippy::missing_safety_doc,
    reason = "the C boundary: raw pointers from C become references here and nowhere else; \
              the safety contract of every function is in rglsl-capi/README.md"
)]
mod ffi;

pub use api::{
    Blob, CompileOptions, Diagnostics, IncludeResult, Object, Program, ProgramOptions,
    RGLSL_ABI_VERSION, RGLSL_RESULT_COMPILE_FAILED, RGLSL_RESULT_INTERNAL_ERROR,
    RGLSL_RESULT_INVALID_ARGUMENT, RGLSL_RESULT_INVALID_OBJECT, RGLSL_RESULT_LINK_FAILED,
    RGLSL_RESULT_OK, RGLSL_SEVERITY_ERROR, RGLSL_SEVERITY_WARNING, RGLSL_STAGE_ANY_HIT,
    RGLSL_STAGE_CALLABLE, RGLSL_STAGE_CLOSEST_HIT, RGLSL_STAGE_COMPUTE, RGLSL_STAGE_FRAGMENT,
    RGLSL_STAGE_GEOMETRY, RGLSL_STAGE_INTERSECTION, RGLSL_STAGE_MESH, RGLSL_STAGE_MISS,
    RGLSL_STAGE_RAY_GENERATION, RGLSL_STAGE_TASK, RGLSL_STAGE_TESS_CONTROL,
    RGLSL_STAGE_TESS_EVALUATION, RGLSL_STAGE_VERTEX, ResultCode, Severity, Stage,
};
pub use ffi::*;
