use std::ffi::{CStr, CString, c_char};
use std::num::NonZeroU8;
use std::panic::{AssertUnwindSafe, catch_unwind};
use std::ptr;

use rglsl_link::{IncludeKind, IncludeRequest, ObjectModule, ResolvedInclude, ShaderStage};

use crate::ffi::Includer;

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct ResultCode(u32);

pub const RGLSL_RESULT_OK: ResultCode = ResultCode(0);
pub const RGLSL_RESULT_INVALID_ARGUMENT: ResultCode = ResultCode(1);
pub const RGLSL_RESULT_COMPILE_FAILED: ResultCode = ResultCode(2);
pub const RGLSL_RESULT_LINK_FAILED: ResultCode = ResultCode(3);
pub const RGLSL_RESULT_INVALID_OBJECT: ResultCode = ResultCode(4);
pub const RGLSL_RESULT_INTERNAL_ERROR: ResultCode = ResultCode(5);

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Stage(u32);

pub const RGLSL_STAGE_VERTEX: Stage = Stage(0);
pub const RGLSL_STAGE_TESS_CONTROL: Stage = Stage(1);
pub const RGLSL_STAGE_TESS_EVALUATION: Stage = Stage(2);
pub const RGLSL_STAGE_GEOMETRY: Stage = Stage(3);
pub const RGLSL_STAGE_FRAGMENT: Stage = Stage(4);
pub const RGLSL_STAGE_COMPUTE: Stage = Stage(5);
pub const RGLSL_STAGE_RAY_GENERATION: Stage = Stage(6);
pub const RGLSL_STAGE_INTERSECTION: Stage = Stage(7);
pub const RGLSL_STAGE_ANY_HIT: Stage = Stage(8);
pub const RGLSL_STAGE_CLOSEST_HIT: Stage = Stage(9);
pub const RGLSL_STAGE_MISS: Stage = Stage(10);
pub const RGLSL_STAGE_CALLABLE: Stage = Stage(11);
pub const RGLSL_STAGE_TASK: Stage = Stage(12);
pub const RGLSL_STAGE_MESH: Stage = Stage(13);

impl Stage {
    pub const fn from_raw(value: u32) -> Self {
        Self(value)
    }

    pub const fn raw(self) -> u32 {
        self.0
    }

    const fn of(stage: ShaderStage) -> Self {
        match stage {
            ShaderStage::Vertex => RGLSL_STAGE_VERTEX,
            ShaderStage::TessControl => RGLSL_STAGE_TESS_CONTROL,
            ShaderStage::TessEvaluation => RGLSL_STAGE_TESS_EVALUATION,
            ShaderStage::Geometry => RGLSL_STAGE_GEOMETRY,
            ShaderStage::Fragment => RGLSL_STAGE_FRAGMENT,
            ShaderStage::Compute => RGLSL_STAGE_COMPUTE,
            ShaderStage::RayGeneration => RGLSL_STAGE_RAY_GENERATION,
            ShaderStage::Intersection => RGLSL_STAGE_INTERSECTION,
            ShaderStage::AnyHit => RGLSL_STAGE_ANY_HIT,
            ShaderStage::ClosestHit => RGLSL_STAGE_CLOSEST_HIT,
            ShaderStage::Miss => RGLSL_STAGE_MISS,
            ShaderStage::Callable => RGLSL_STAGE_CALLABLE,
            ShaderStage::Task => RGLSL_STAGE_TASK,
            ShaderStage::Mesh => RGLSL_STAGE_MESH,
        }
    }

    fn shader_stage(self) -> Option<ShaderStage> {
        ShaderStage::ALL
            .into_iter()
            .find(|&stage| Self::of(stage) == self)
    }
}

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Severity(u32);

pub const RGLSL_SEVERITY_ERROR: Severity = Severity(0);
pub const RGLSL_SEVERITY_WARNING: Severity = Severity(1);

impl Severity {
    pub const fn raw(self) -> u32 {
        self.0
    }

    const fn of(severity: rglsl_link::Severity) -> Self {
        match severity {
            rglsl_link::Severity::Error => RGLSL_SEVERITY_ERROR,
            rglsl_link::Severity::Warning => RGLSL_SEVERITY_WARNING,
        }
    }
}

pub const RGLSL_ABI_VERSION: u32 = 1;

pub(crate) const VERSION: &CStr =
    match CStr::from_bytes_with_nul(concat!(env!("CARGO_PKG_VERSION"), "\0").as_bytes()) {
        Ok(version) => version,
        Err(_) => c"",
    };

#[derive(Debug)]
pub struct CompileOptions {
    options: rglsl_link::CompileOptions,
    includer: Option<Includer>,
}

#[derive(Debug)]
pub struct ProgramOptions(rglsl_link::ProgramOptions);

#[derive(Debug)]
pub struct Object(ObjectModule);

#[derive(Debug)]
pub struct Blob(Vec<u8>);

#[derive(Debug)]
pub struct Program {
    stages: Vec<StageBinary>,
    warnings: Diagnostics,
}

#[derive(Debug)]
struct StageBinary {
    stage: Stage,
    entry_point: CString,
    words: Vec<u32>,
}

#[derive(Debug)]
pub struct Diagnostics {
    entries: Vec<Entry>,
    text: CString,
}

#[derive(Debug)]
struct Entry {
    severity: Severity,
    file: Option<CString>,
    line: u32,
    column: u32,
    message: CString,
}

#[derive(Debug, Default)]
pub struct IncludeResult {
    resolved: Option<(Option<String>, String)>,
}

fn c_string(text: &str) -> CString {
    CString::from(text.bytes().filter_map(NonZeroU8::new).collect::<Vec<_>>())
}

impl Diagnostics {
    fn new(diagnostics: &rglsl_link::Diagnostics) -> Self {
        Self {
            entries: diagnostics
                .iter()
                .map(|diagnostic| Entry {
                    severity: Severity::of(diagnostic.severity),
                    file: diagnostic.file.as_deref().map(c_string),
                    line: diagnostic.line.unwrap_or(0),
                    column: diagnostic.column.unwrap_or(0),
                    message: c_string(&diagnostic.to_string()),
                })
                .collect(),
            text: c_string(&diagnostics.to_string()),
        }
    }

    fn error(message: String) -> Self {
        Self::new(&rglsl_link::Diagnostics {
            list: vec![rglsl_link::Diagnostic {
                severity: rglsl_link::Severity::Error,
                file: None,
                line: None,
                column: None,
                stage: None,
                message,
            }],
        })
    }
}

#[derive(Debug)]
pub(crate) struct Failure {
    code: ResultCode,
    diagnostics: Diagnostics,
}

impl Failure {
    fn new(code: ResultCode, diagnostics: &rglsl_link::Diagnostics) -> Self {
        Self {
            code,
            diagnostics: Diagnostics::new(diagnostics),
        }
    }

    fn argument(message: String) -> Self {
        Self {
            code: RGLSL_RESULT_INVALID_ARGUMENT,
            diagnostics: Diagnostics::error(format!("invalid argument: {message}")),
        }
    }

    fn null(what: &str) -> Self {
        Self::argument(format!("{what} is NULL"))
    }

    fn internal() -> Self {
        Self {
            code: RGLSL_RESULT_INTERNAL_ERROR,
            diagnostics: Diagnostics::error("internal error: rglsl panicked".to_owned()),
        }
    }
}

pub(crate) type Slot<'a, T> = Option<&'a mut *mut T>;

fn required<'a, T: ?Sized>(value: Option<&'a T>, what: &str) -> Result<&'a T, Failure> {
    value.ok_or_else(|| Failure::null(what))
}

fn text<'a>(value: Option<&'a CStr>, what: &str) -> Result<&'a str, Failure> {
    required(value, what)?
        .to_str()
        .map_err(|error| Failure::argument(format!("{what} is not UTF-8: {error}")))
}

fn guarded<T>(work: impl FnOnce() -> Result<T, Failure>) -> Result<T, Failure> {
    catch_unwind(AssertUnwindSafe(work)).unwrap_or_else(|_| Err(Failure::internal()))
}

fn publish<T>(slot: Option<&mut *mut T>, value: T) {
    if let Some(slot) = slot {
        *slot = Box::into_raw(Box::new(value));
    }
}

fn clear<T>(slot: &mut Option<&mut *mut T>) {
    if let Some(slot) = slot.as_deref_mut() {
        *slot = ptr::null_mut();
    }
}

pub(crate) fn produce<T>(
    output: Slot<'_, T>,
    mut diagnostics: Slot<'_, Diagnostics>,
    make: impl FnOnce() -> Result<T, Failure>,
) -> ResultCode {
    clear(&mut diagnostics);
    let Some(output) = output else {
        let failure = Failure::null("the output handle pointer");
        publish(diagnostics, failure.diagnostics);
        return failure.code;
    };
    *output = ptr::null_mut();
    match guarded(make) {
        Ok(value) => {
            publish(Some(output), value);
            RGLSL_RESULT_OK
        }
        Err(failure) => {
            publish(diagnostics, failure.diagnostics);
            failure.code
        }
    }
}

pub(crate) fn update<T>(
    target: Option<&mut T>,
    change: impl FnOnce(&mut T) -> Result<(), Failure>,
) -> ResultCode {
    let Some(target) = target else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    match guarded(|| change(target)) {
        Ok(()) => RGLSL_RESULT_OK,
        Err(failure) => failure.code,
    }
}

pub(crate) fn query<T, R>(
    target: Option<&T>,
    fallback: R,
    read: impl FnOnce(&T) -> Option<R>,
) -> R {
    target
        .and_then(|target| {
            catch_unwind(AssertUnwindSafe(|| read(target)))
                .ok()
                .flatten()
        })
        .unwrap_or(fallback)
}

pub(crate) fn destroy<T>(handle: Option<Box<T>>) {
    drop(catch_unwind(AssertUnwindSafe(|| drop(handle))));
}

fn spirv_version(major: u32, minor: u32) -> Result<(u8, u8), Failure> {
    match (u8::try_from(major), u8::try_from(minor)) {
        (Ok(1), Ok(minor)) if minor <= 6 => Ok((1, minor)),
        _ => Err(Failure::argument(format!(
            "SPIR-V {major}.{minor} is not supported: the versions are 1.0 to 1.6"
        ))),
    }
}

pub(crate) fn compile_options_create(
    name: Option<&CStr>,
    stage: Option<Stage>,
    output: Slot<'_, CompileOptions>,
) -> ResultCode {
    produce(output, None, || {
        let name = text(name, "name")?;
        let options = match stage {
            None => rglsl_link::CompileOptions::library(name),
            Some(stage) => {
                let shader_stage = stage
                    .shader_stage()
                    .ok_or_else(|| Failure::argument(format!("{} is not a stage", stage.raw())))?;
                rglsl_link::CompileOptions::new(name, shader_stage)
            }
        };
        Ok(CompileOptions {
            options,
            includer: None,
        })
    })
}

pub(crate) fn compile_options_add_define(
    options: Option<&mut CompileOptions>,
    name: Option<&CStr>,
    value: Option<&CStr>,
) -> ResultCode {
    update(options, |options| {
        let pair = (
            text(name, "name")?.to_owned(),
            text(value, "value")?.to_owned(),
        );
        options.options.defines.push(pair);
        Ok(())
    })
}

pub(crate) fn compile_options_add_include(
    options: Option<&mut CompileOptions>,
    name: Option<&CStr>,
    source: Option<&CStr>,
) -> ResultCode {
    update(options, |options| {
        let pair = (
            text(name, "name")?.to_owned(),
            text(source, "source")?.to_owned(),
        );
        options.options.includes.push(pair);
        Ok(())
    })
}

pub(crate) fn compile_options_add_include_dir(
    options: Option<&mut CompileOptions>,
    directory: Option<&CStr>,
) -> ResultCode {
    update(options, |options| {
        let directory = text(directory, "directory")?.to_owned();
        options.options.include_dirs.push(directory);
        Ok(())
    })
}

pub(crate) fn compile_options_set_flags(
    options: Option<&mut CompileOptions>,
    change: impl FnOnce(&mut rglsl_link::CompileOptions),
) -> ResultCode {
    update(options, |options| {
        change(&mut options.options);
        Ok(())
    })
}

pub(crate) fn compile_options_set_spirv_version(
    options: Option<&mut CompileOptions>,
    major: u32,
    minor: u32,
) -> ResultCode {
    update(options, |options| {
        options.options.spirv_version = spirv_version(major, minor)?;
        Ok(())
    })
}

pub(crate) fn compile_options_set_includer(
    options: Option<&mut CompileOptions>,
    includer: Option<Includer>,
) -> ResultCode {
    update(options, |options| {
        options.includer = includer;
        Ok(())
    })
}

pub(crate) fn include_result_set(
    result: Option<&mut IncludeResult>,
    name: Option<&CStr>,
    source: Option<&CStr>,
) -> ResultCode {
    update(result, |result| {
        let name = name
            .map(|name| text(Some(name), "name").map(str::to_owned))
            .transpose()?;
        let source = text(source, "source")?.to_owned();
        result.resolved = Some((name, source));
        Ok(())
    })
}

fn resolve(includer: Includer, request: IncludeRequest<'_>) -> Option<ResolvedInclude> {
    let requested = c_string(request.requested);
    let from = request.includer.map(c_string);
    let mut result = IncludeResult::default();
    includer.call(
        &requested,
        request.kind == IncludeKind::System,
        from.as_deref(),
        &mut result,
    );
    let (name, source) = result.resolved?;
    Some(ResolvedInclude {
        name: name.unwrap_or_else(|| request.requested.to_owned()),
        source,
    })
}

pub(crate) fn compile(
    source: Option<&CStr>,
    options: Option<&CompileOptions>,
    object: Slot<'_, Object>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(object, diagnostics, || {
        let source = text(source, "source")?;
        let options = required(options, "options")?;
        let compiled = match options.includer {
            Some(includer) => {
                rglsl_link::compile_with_includer(source, &options.options, &mut |request| {
                    resolve(includer, request)
                })
            }
            None => rglsl_link::compile(source, &options.options),
        };
        compiled
            .map(Object)
            .map_err(|errors| Failure::new(RGLSL_RESULT_COMPILE_FAILED, &errors))
    })
}

pub(crate) fn object_write(
    object: Option<&Object>,
    blob: Slot<'_, Blob>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(blob, diagnostics, || {
        let object = required(object, "object")?;
        rglsl_link::write_object(&object.0)
            .map(Blob)
            .map_err(|errors| Failure::new(RGLSL_RESULT_INVALID_OBJECT, &errors))
    })
}

pub(crate) fn object_read(
    bytes: Option<&[u8]>,
    object: Slot<'_, Object>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(object, diagnostics, || {
        let bytes = required(bytes, "data")?;
        rglsl_link::read_object(bytes)
            .map(Object)
            .map_err(|errors| Failure::new(RGLSL_RESULT_INVALID_OBJECT, &errors))
    })
}

pub(crate) fn blob_data(blob: Option<&Blob>) -> *const u8 {
    query(blob, ptr::null(), |blob| Some(blob.0.as_ptr()))
}

pub(crate) fn blob_size(blob: Option<&Blob>) -> usize {
    query(blob, 0, |blob| Some(blob.0.len()))
}

pub(crate) fn program_options_create(output: Slot<'_, ProgramOptions>) -> ResultCode {
    produce(output, None, || {
        Ok(ProgramOptions(rglsl_link::ProgramOptions::default()))
    })
}

pub(crate) fn program_options_set_flags(
    options: Option<&mut ProgramOptions>,
    change: impl FnOnce(&mut rglsl_link::ProgramOptions),
) -> ResultCode {
    update(options, |options| {
        change(&mut options.0);
        Ok(())
    })
}

pub(crate) fn program_options_set_spirv_version(
    options: Option<&mut ProgramOptions>,
    major: u32,
    minor: u32,
) -> ResultCode {
    update(options, |options| {
        options.0.spirv_version = spirv_version(major, minor)?;
        Ok(())
    })
}

pub(crate) fn link(
    objects: Option<Vec<Option<&Object>>>,
    options: Option<&ProgramOptions>,
    program: Slot<'_, Program>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(program, diagnostics, || {
        let objects = objects.ok_or_else(|| Failure::null("objects"))?;
        let modules = objects
            .iter()
            .enumerate()
            .map(|(index, object)| {
                object
                    .map(|object| &object.0)
                    .ok_or_else(|| Failure::null(&format!("objects[{index}]")))
            })
            .collect::<Result<Vec<_>, _>>()?;
        let default_options = rglsl_link::ProgramOptions::default();
        let options = options.map_or(&default_options, |options| &options.0);
        let linked = rglsl_link::link_spirv(&modules, options)
            .map_err(|errors| Failure::new(RGLSL_RESULT_LINK_FAILED, &errors))?;
        Ok(Program {
            stages: linked
                .stages
                .into_iter()
                .map(|binary| StageBinary {
                    stage: Stage::of(binary.stage),
                    entry_point: c_string(&binary.entry_point),
                    words: binary.words,
                })
                .collect(),
            warnings: Diagnostics::new(&linked.warnings),
        })
    })
}

pub(crate) fn program_stage_count(program: Option<&Program>) -> usize {
    query(program, 0, |program| Some(program.stages.len()))
}

pub(crate) fn program_stage(
    program: Option<&Program>,
    index: usize,
    stage: Option<&mut Stage>,
) -> ResultCode {
    let Some(stage) = stage else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    query(program, RGLSL_RESULT_INVALID_ARGUMENT, |program| {
        *stage = program.stages.get(index)?.stage;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn program_entry_point(program: Option<&Program>, index: usize) -> *const c_char {
    query(program, ptr::null(), |program| {
        Some(program.stages.get(index)?.entry_point.as_ptr())
    })
}

pub(crate) fn program_spirv(
    program: Option<&Program>,
    index: usize,
    words: Option<&mut *const u32>,
    count: Option<&mut usize>,
) -> ResultCode {
    let (Some(words), Some(count)) = (words, count) else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *words = ptr::null();
    *count = 0;
    query(program, RGLSL_RESULT_INVALID_ARGUMENT, |program| {
        let binary = program.stages.get(index)?;
        *words = binary.words.as_ptr();
        *count = binary.words.len();
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn program_warnings(program: Option<&Program>) -> *const Diagnostics {
    query(program, ptr::null(), |program| {
        Some(ptr::from_ref(&program.warnings))
    })
}

pub(crate) fn diagnostics_count(diagnostics: Option<&Diagnostics>) -> usize {
    query(diagnostics, 0, |diagnostics| {
        Some(diagnostics.entries.len())
    })
}

pub(crate) fn diagnostics_text(diagnostics: Option<&Diagnostics>) -> *const c_char {
    query(diagnostics, ptr::null(), |diagnostics| {
        Some(diagnostics.text.as_ptr())
    })
}

pub(crate) fn diagnostics_message(
    diagnostics: Option<&Diagnostics>,
    index: usize,
) -> *const c_char {
    query(diagnostics, ptr::null(), |diagnostics| {
        Some(diagnostics.entries.get(index)?.message.as_ptr())
    })
}

pub(crate) struct Location<'a> {
    pub(crate) severity: Option<&'a mut Severity>,
    pub(crate) file: Option<&'a mut *const c_char>,
    pub(crate) line: Option<&'a mut u32>,
    pub(crate) column: Option<&'a mut u32>,
}

pub(crate) fn diagnostics_location(
    diagnostics: Option<&Diagnostics>,
    index: usize,
    location: Location<'_>,
) -> ResultCode {
    query(diagnostics, RGLSL_RESULT_INVALID_ARGUMENT, |diagnostics| {
        let entry = diagnostics.entries.get(index)?;
        if let Some(severity) = location.severity {
            *severity = entry.severity;
        }
        if let Some(file) = location.file {
            *file = entry.file.as_deref().map_or(ptr::null(), CStr::as_ptr);
        }
        if let Some(line) = location.line {
            *line = entry.line;
        }
        if let Some(column) = location.column {
            *column = entry.column;
        }
        Some(RGLSL_RESULT_OK)
    })
}
