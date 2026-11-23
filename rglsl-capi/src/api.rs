use std::ffi::{CStr, CString, c_char};
use std::num::NonZeroU8;
use std::panic::{AssertUnwindSafe, catch_unwind};
use std::ptr;

use rglsl_link::{
    IncludeKind, IncludeRequest, ObjectModule, ResolvedInclude, ResourceLimits, ShaderStage,
};

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
pub const RGLSL_RESULT_INVALID_SPIRV: ResultCode = ResultCode(6);

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

    fn shader_stage(self) -> Result<ShaderStage, Failure> {
        ShaderStage::ALL
            .into_iter()
            .find(|&stage| Self::of(stage) == self)
            .ok_or_else(|| Failure::argument(format!("{} is not a stage", self.0)))
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

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct DebugInfo(u32);

pub const RGLSL_DEBUG_INFO_NAMES: DebugInfo = DebugInfo(0);
pub const RGLSL_DEBUG_INFO_STRIPPED: DebugInfo = DebugInfo(1);
pub const RGLSL_DEBUG_INFO_LINES: DebugInfo = DebugInfo(2);
pub const RGLSL_DEBUG_INFO_NON_SEMANTIC: DebugInfo = DebugInfo(3);
pub const RGLSL_DEBUG_INFO_NON_SEMANTIC_SOURCE: DebugInfo = DebugInfo(4);
pub const RGLSL_DEBUG_INFO_FILE_NAME: DebugInfo = DebugInfo(5);

impl DebugInfo {
    pub const fn from_raw(value: u32) -> Self {
        Self(value)
    }

    fn level(self) -> Result<rglsl_link::DebugInfo, Failure> {
        Ok(match self {
            RGLSL_DEBUG_INFO_NAMES => rglsl_link::DebugInfo::Names,
            RGLSL_DEBUG_INFO_STRIPPED => rglsl_link::DebugInfo::Stripped,
            RGLSL_DEBUG_INFO_LINES => rglsl_link::DebugInfo::Lines,
            RGLSL_DEBUG_INFO_NON_SEMANTIC => rglsl_link::DebugInfo::NonSemantic,
            RGLSL_DEBUG_INFO_NON_SEMANTIC_SOURCE => rglsl_link::DebugInfo::NonSemanticWithSource,
            RGLSL_DEBUG_INFO_FILE_NAME => rglsl_link::DebugInfo::FileName,
            _ => {
                return Err(Failure::argument(format!(
                    "{} is not a debug information level",
                    self.0
                )));
            }
        })
    }
}

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct OptLevel(u32);

pub const RGLSL_OPT_LEVEL_DISABLED: OptLevel = OptLevel(0);
pub const RGLSL_OPT_LEVEL_PERFORMANCE: OptLevel = OptLevel(1);
pub const RGLSL_OPT_LEVEL_SIZE: OptLevel = OptLevel(2);

impl OptLevel {
    pub const fn from_raw(value: u32) -> Self {
        Self(value)
    }

    fn level(self) -> Result<rglsl_link::OptLevel, Failure> {
        Ok(match self {
            RGLSL_OPT_LEVEL_DISABLED => rglsl_link::OptLevel::Disabled,
            RGLSL_OPT_LEVEL_PERFORMANCE => rglsl_link::OptLevel::Performance,
            RGLSL_OPT_LEVEL_SIZE => rglsl_link::OptLevel::Size,
            _ => {
                return Err(Failure::argument(format!(
                    "{} is not an optimization level",
                    self.0
                )));
            }
        })
    }
}

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct TargetGpu(u32);

pub const RGLSL_TARGET_GPU_NVIDIA: TargetGpu = TargetGpu(0);
pub const RGLSL_TARGET_GPU_AMD: TargetGpu = TargetGpu(1);
pub const RGLSL_TARGET_GPU_UNIVERSAL_DESKTOP: TargetGpu = TargetGpu(2);
pub const RGLSL_TARGET_GPU_UNIVERSAL_MOBILE: TargetGpu = TargetGpu(3);

impl TargetGpu {
    pub const fn from_raw(value: u32) -> Self {
        Self(value)
    }

    fn gpu(self) -> Result<rglsl_link::TargetGpu, Failure> {
        Ok(match self {
            RGLSL_TARGET_GPU_NVIDIA => rglsl_link::TargetGpu::Nvidia,
            RGLSL_TARGET_GPU_AMD => rglsl_link::TargetGpu::Amd,
            RGLSL_TARGET_GPU_UNIVERSAL_DESKTOP => rglsl_link::TargetGpu::UniversalDesktop,
            RGLSL_TARGET_GPU_UNIVERSAL_MOBILE => rglsl_link::TargetGpu::UniversalMobile,
            _ => {
                return Err(Failure::argument(format!("{} is not a target GPU", self.0)));
            }
        })
    }
}

#[repr(transparent)]
#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Disassembly(u32);

pub const RGLSL_DISASSEMBLY_GLSLANG: Disassembly = Disassembly(0);
pub const RGLSL_DISASSEMBLY_STANDARD: Disassembly = Disassembly(1);

impl Disassembly {
    pub const fn from_raw(value: u32) -> Self {
        Self(value)
    }

    fn form(self) -> Result<rglsl_dis::Form, Failure> {
        match self {
            RGLSL_DISASSEMBLY_GLSLANG => Ok(rglsl_dis::Form::Glslang),
            RGLSL_DISASSEMBLY_STANDARD => Ok(rglsl_dis::Form::Standard),
            _ => Err(Failure::argument(format!(
                "{} is not a disassembly form",
                self.0
            ))),
        }
    }
}

pub const RGLSL_FORMAT_ERROR_COLUMN: u32 = 1;
pub const RGLSL_FORMAT_ABSOLUTE_PATH: u32 = 1 << 1;
pub const RGLSL_FORMAT_UNNAMED_SOURCE: u32 = 1 << 2;

pub const RGLSL_REFLECT_STRICT_ARRAY_SUFFIX: u32 = 1;
pub const RGLSL_REFLECT_BASIC_ARRAY_SUFFIX: u32 = 1 << 1;
pub const RGLSL_REFLECT_INTERMEDIATE_IO: u32 = 1 << 2;
pub const RGLSL_REFLECT_SEPARATE_BUFFERS: u32 = 1 << 3;
pub const RGLSL_REFLECT_ALL_BLOCK_VARIABLES: u32 = 1 << 4;
pub const RGLSL_REFLECT_UNWRAP_IO_BLOCKS: u32 = 1 << 5;
pub const RGLSL_REFLECT_ALL_IO_VARIABLES: u32 = 1 << 6;

pub const RGLSL_ABI_VERSION: u32 = 3;

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
pub struct Compiler(rglsl_link::Compiler);

#[derive(Debug)]
pub struct Object {
    object: ObjectModule,
    files_read: Vec<CString>,
}

#[derive(Debug)]
pub struct Blob {
    bytes: Vec<u8>,
    size: usize,
}

#[derive(Debug)]
pub struct Limits {
    limits: ResourceLimits,
    messages: Vec<CString>,
}

#[derive(Debug)]
pub struct Program {
    stages: Vec<StageBinary>,
    warnings: Diagnostics,
    reflection: Option<CString>,
    files_read: Vec<CString>,
}

#[derive(Debug)]
struct StageBinary {
    stage: Stage,
    entry_point: CString,
    words: Vec<u32>,
}

#[derive(Debug)]
pub struct Diagnostics {
    source: rglsl_link::Diagnostics,
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

fn c_strings(texts: &[String]) -> Vec<CString> {
    texts.iter().map(|text| c_string(text)).collect()
}

impl Blob {
    fn bytes(bytes: Vec<u8>) -> Self {
        let size = bytes.len();
        let mut bytes = bytes;
        bytes.push(0);
        Self { bytes, size }
    }

    fn text(text: String) -> Self {
        Self::bytes(text.into_bytes())
    }
}

impl Diagnostics {
    fn new(diagnostics: &rglsl_link::Diagnostics) -> Self {
        Self {
            source: diagnostics.clone(),
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
                origin: rglsl_link::Origin::Source,
                file: None,
                included: false,
                line: None,
                column: None,
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

fn optional_text(value: Option<&CStr>, what: &str) -> Result<Option<String>, Failure> {
    value
        .map(|value| text(Some(value), what).map(str::to_owned))
        .transpose()
}

fn texts(values: Option<Vec<Option<&CStr>>>, what: &str) -> Result<Vec<String>, Failure> {
    values
        .ok_or_else(|| Failure::null(what))?
        .into_iter()
        .enumerate()
        .map(|(index, value)| text(value, &format!("{what}[{index}]")).map(str::to_owned))
        .collect()
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

fn version(major: u32, minor: u32, what: &str, last: u8) -> Result<(u8, u8), Failure> {
    match (u8::try_from(major), u8::try_from(minor)) {
        (Ok(1), Ok(minor)) if minor <= last => Ok((1, minor)),
        _ => Err(Failure::argument(format!(
            "{what} {major}.{minor} is not supported: the versions are 1.0 to 1.{last}"
        ))),
    }
}

fn spirv_version(major: u32, minor: u32) -> Result<(u8, u8), Failure> {
    version(major, minor, "SPIR-V", 6)
}

fn vulkan_version(major: u32, minor: u32) -> Result<(u8, u8), Failure> {
    version(major, minor, "Vulkan", 4)
}

fn reflection_options(flags: u32) -> rglsl_link::reflect::Options {
    let has = |flag: u32| flags & flag != 0;
    rglsl_link::reflect::Options {
        strict_array_suffix: has(RGLSL_REFLECT_STRICT_ARRAY_SUFFIX),
        basic_array_suffix: has(RGLSL_REFLECT_BASIC_ARRAY_SUFFIX),
        intermediate_io: has(RGLSL_REFLECT_INTERMEDIATE_IO),
        separate_buffers: has(RGLSL_REFLECT_SEPARATE_BUFFERS),
        all_block_variables: has(RGLSL_REFLECT_ALL_BLOCK_VARIABLES),
        unwrap_io_blocks: has(RGLSL_REFLECT_UNWRAP_IO_BLOCKS),
        all_io_variables: has(RGLSL_REFLECT_ALL_IO_VARIABLES),
    }
}

const fn diagnostic_format(flags: u32) -> rglsl_link::DiagnosticFormat {
    rglsl_link::DiagnosticFormat {
        error_column: flags & RGLSL_FORMAT_ERROR_COLUMN != 0,
        absolute_path: flags & RGLSL_FORMAT_ABSOLUTE_PATH != 0,
        unnamed_source: flags & RGLSL_FORMAT_UNNAMED_SOURCE != 0,
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
            Some(stage) => rglsl_link::CompileOptions::new(name, stage.shader_stage()?),
        };
        Ok(CompileOptions {
            options,
            includer: None,
        })
    })
}

pub(crate) fn compile_options_change(
    options: Option<&mut CompileOptions>,
    change: impl FnOnce(&mut rglsl_link::CompileOptions) -> Result<(), Failure>,
) -> ResultCode {
    update(options, |options| change(&mut options.options))
}

pub(crate) fn compile_options_add_define(
    options: Option<&mut CompileOptions>,
    name: Option<&CStr>,
    value: Option<&CStr>,
) -> ResultCode {
    compile_options_change(options, |options| {
        let define = rglsl_link::Macro::define(text(name, "name")?, text(value, "value")?);
        options.macros.push(define);
        Ok(())
    })
}

pub(crate) fn compile_options_add_undefine(
    options: Option<&mut CompileOptions>,
    name: Option<&CStr>,
) -> ResultCode {
    compile_options_change(options, |options| {
        let name = text(name, "name")?.to_owned();
        options.macros.push(rglsl_link::Macro::Undefine(name));
        Ok(())
    })
}

pub(crate) fn compile_options_add_preamble_text(
    options: Option<&mut CompileOptions>,
    line: Option<&CStr>,
) -> ResultCode {
    compile_options_change(options, |options| {
        let line = text(line, "text")?.to_owned();
        options.macros.push(rglsl_link::Macro::Text(line));
        Ok(())
    })
}

pub(crate) fn compile_options_add_include(
    options: Option<&mut CompileOptions>,
    name: Option<&CStr>,
    source: Option<&CStr>,
) -> ResultCode {
    compile_options_change(options, |options| {
        let pair = (
            text(name, "name")?.to_owned(),
            text(source, "source")?.to_owned(),
        );
        options.includes.push(pair);
        Ok(())
    })
}

pub(crate) fn compile_options_add_include_dir(
    options: Option<&mut CompileOptions>,
    directory: Option<&CStr>,
) -> ResultCode {
    compile_options_change(options, |options| {
        let directory = text(directory, "directory")?.to_owned();
        options.include_dirs.push(directory);
        Ok(())
    })
}

pub(crate) fn compile_options_set_entry_point(
    options: Option<&mut CompileOptions>,
    name: Option<&CStr>,
) -> ResultCode {
    compile_options_change(options, |options| {
        options.entry_point = optional_text(name, "name")?;
        Ok(())
    })
}

pub(crate) fn compile_options_set_flags(
    options: Option<&mut CompileOptions>,
    change: impl FnOnce(&mut rglsl_link::CompileOptions),
) -> ResultCode {
    compile_options_change(options, |options| {
        change(options);
        Ok(())
    })
}

pub(crate) fn compile_options_set_debug_info(
    options: Option<&mut CompileOptions>,
    level: DebugInfo,
) -> ResultCode {
    compile_options_change(options, |options| {
        options.debug_info = level.level()?;
        Ok(())
    })
}

pub(crate) fn compile_options_set_spirv_version(
    options: Option<&mut CompileOptions>,
    major: u32,
    minor: u32,
) -> ResultCode {
    compile_options_change(options, |options| {
        options.spirv_version = spirv_version(major, minor)?;
        Ok(())
    })
}

pub(crate) fn compile_options_set_vulkan_version(
    options: Option<&mut CompileOptions>,
    major: u32,
    minor: u32,
) -> ResultCode {
    compile_options_change(options, |options| {
        options.vulkan_version = vulkan_version(major, minor)?;
        Ok(())
    })
}

pub(crate) fn compile_options_set_limits(
    options: Option<&mut CompileOptions>,
    limits: Option<&Limits>,
) -> ResultCode {
    compile_options_change(options, |options| {
        options.limits = required(limits, "limits")?.limits;
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
        let name = optional_text(name, "name")?;
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

fn with_includer<R>(
    options: &CompileOptions,
    work: impl FnOnce(&mut rglsl_link::Resolve<'_>) -> R,
) -> R {
    match options.includer {
        Some(includer) => work(&mut |request| resolve(includer, request)),
        None => work(&mut |_| None),
    }
}

fn compiled(
    compiler: &rglsl_link::Compiler,
    source: Option<&CStr>,
    options: Option<&CompileOptions>,
) -> Result<Object, Failure> {
    let source = text(source, "source")?;
    let options = required(options, "options")?;
    let compiled = with_includer(options, |resolve| {
        compiler.compile_unit(source, &options.options, resolve)
    });
    let files_read = c_strings(&compiled.files_read);
    compiled
        .result
        .map(|object| Object { object, files_read })
        .map_err(|errors| Failure::new(RGLSL_RESULT_COMPILE_FAILED, &errors))
}

pub(crate) fn compile(
    source: Option<&CStr>,
    options: Option<&CompileOptions>,
    object: Slot<'_, Object>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(object, diagnostics, || {
        compiled(&rglsl_link::Compiler::new(), source, options)
    })
}

pub(crate) fn compiler_create(output: Slot<'_, Compiler>) -> ResultCode {
    produce(output, None, || Ok(Compiler(rglsl_link::Compiler::new())))
}

pub(crate) fn compiler_compile(
    compiler: Option<&Compiler>,
    source: Option<&CStr>,
    options: Option<&CompileOptions>,
    object: Slot<'_, Object>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(object, diagnostics, || {
        compiled(&required(compiler, "compiler")?.0, source, options)
    })
}

pub(crate) fn compiler_preprocess(
    compiler: Option<&Compiler>,
    source: Option<&CStr>,
    options: Option<&CompileOptions>,
    output: Slot<'_, Blob>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(output, diagnostics, || {
        let compiler = &required(compiler, "compiler")?.0;
        let source = text(source, "source")?;
        let options = required(options, "options")?;
        let preprocessed = with_includer(options, |resolve| {
            compiler.preprocess(source, &options.options, resolve)
        });
        if preprocessed.diagnostics.has_errors() {
            return Err(Failure::new(
                RGLSL_RESULT_COMPILE_FAILED,
                &preprocessed.diagnostics,
            ));
        }
        Ok(Blob::text(preprocessed.text))
    })
}

pub(crate) fn compiler_build(
    compiler: Option<&Compiler>,
    sources: Option<Vec<Option<&CStr>>>,
    options: Option<Vec<Option<&CompileOptions>>>,
    program_options: Option<&ProgramOptions>,
    program: Slot<'_, Program>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(program, diagnostics, || {
        let compiler = &required(compiler, "compiler")?.0;
        let sources = texts(sources, "sources")?;
        let options = options
            .ok_or_else(|| Failure::null("options"))?
            .into_iter()
            .enumerate()
            .map(|(index, options)| required(options, &format!("options[{index}]")))
            .collect::<Result<Vec<_>, _>>()?;
        if sources.len() != options.len() {
            return Err(Failure::argument(String::from(
                "sources and options differ in length",
            )));
        }
        let includer = options.iter().find_map(|options| options.includer);
        let inputs: Vec<rglsl_link::Input<'_>> = sources
            .iter()
            .zip(&options)
            .map(|(source, options)| rglsl_link::Input {
                source: rglsl_link::Source::Glsl(source),
                options: options.options.clone(),
            })
            .collect();
        let default_options = rglsl_link::ProgramOptions::default();
        let program_options = program_options.map_or(&default_options, |options| &options.0);
        let build = match includer {
            Some(includer) => compiler.build(&inputs, program_options, &mut |request| {
                resolve(includer, request)
            }),
            None => compiler.build(&inputs, program_options, &mut |_| None),
        };
        built(build)
    })
}

fn built(build: rglsl_link::Build) -> Result<Program, Failure> {
    if build.compile_failed() {
        let list = build
            .units
            .into_iter()
            .flat_map(|unit| unit.diagnostics.list)
            .collect();
        return Err(Failure::new(
            RGLSL_RESULT_COMPILE_FAILED,
            &rglsl_link::Diagnostics { list },
        ));
    }
    if build.link_failed() {
        return Err(Failure::new(RGLSL_RESULT_LINK_FAILED, &build.link));
    }
    let mut stages = Vec::with_capacity(build.stages.len());
    let mut errors = Vec::new();
    for output in build.stages {
        match output.result {
            Ok(binary) => stages.push(StageBinary {
                stage: Stage::of(binary.stage),
                entry_point: c_string(&binary.entry_point),
                words: binary.words,
            }),
            Err(diagnostic) => errors.push(diagnostic),
        }
    }
    if !errors.is_empty() {
        return Err(Failure::new(
            RGLSL_RESULT_COMPILE_FAILED,
            &rglsl_link::Diagnostics { list: errors },
        ));
    }
    Ok(Program {
        stages,
        warnings: Diagnostics::new(&build.link),
        reflection: build.reflection.as_deref().map(c_string),
        files_read: c_strings(&build.files_read),
    })
}

pub(crate) fn object_write(
    object: Option<&Object>,
    blob: Slot<'_, Blob>,
    diagnostics: Slot<'_, Diagnostics>,
) -> ResultCode {
    produce(blob, diagnostics, || {
        let object = required(object, "object")?;
        rglsl_link::write_object(&object.object)
            .map(Blob::bytes)
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
            .map(|object| Object {
                object,
                files_read: Vec::new(),
            })
            .map_err(|errors| Failure::new(RGLSL_RESULT_INVALID_OBJECT, &errors))
    })
}

pub(crate) fn object_file_count(object: Option<&Object>) -> usize {
    query(object, 0, |object| Some(object.files_read.len()))
}

pub(crate) fn object_file(object: Option<&Object>, index: usize) -> *const c_char {
    query(object, ptr::null(), |object| {
        Some(object.files_read.get(index)?.as_ptr())
    })
}

pub(crate) fn blob_data(blob: Option<&Blob>) -> *const u8 {
    query(blob, ptr::null(), |blob| Some(blob.bytes.as_ptr()))
}

pub(crate) fn blob_size(blob: Option<&Blob>) -> usize {
    query(blob, 0, |blob| Some(blob.size))
}

pub(crate) fn blob_text(blob: Option<&Blob>) -> *const c_char {
    query(blob, ptr::null(), |blob| {
        Some(blob.bytes.as_ptr().cast::<c_char>())
    })
}

pub(crate) fn limits_create(output: Slot<'_, Limits>) -> ResultCode {
    produce(output, None, || {
        Ok(Limits {
            limits: ResourceLimits::default(),
            messages: Vec::new(),
        })
    })
}

pub(crate) fn limits_decode(bytes: Option<&[u8]>, output: Slot<'_, Limits>) -> ResultCode {
    produce(output, None, || {
        let decoded = ResourceLimits::decode_configuration(required(bytes, "data")?);
        Ok(Limits {
            limits: decoded.limits,
            messages: decoded
                .messages
                .iter()
                .map(|message| c_string(message.trim_end()))
                .collect(),
        })
    })
}

pub(crate) fn limits_set(
    limits: Option<&mut Limits>,
    name: Option<&CStr>,
    value: i32,
) -> ResultCode {
    update(limits, |limits| {
        let name = text(name, "name")?;
        if limits.limits.set(name, value) {
            Ok(())
        } else {
            Err(Failure::argument(format!("{name} is not a resource limit")))
        }
    })
}

pub(crate) fn limits_get(
    limits: Option<&Limits>,
    name: Option<&CStr>,
    value: Option<&mut i32>,
) -> ResultCode {
    let Some(value) = value else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    query(limits, RGLSL_RESULT_INVALID_ARGUMENT, |limits| {
        let name = name?.to_str().ok()?;
        let (_, found) = limits
            .limits
            .entries()
            .into_iter()
            .find(|&(candidate, _)| candidate == name)?;
        *value = found;
        Some(RGLSL_RESULT_OK)
    })
}

pub(crate) fn limits_message_count(limits: Option<&Limits>) -> usize {
    query(limits, 0, |limits| Some(limits.messages.len()))
}

pub(crate) fn limits_message(limits: Option<&Limits>, index: usize) -> *const c_char {
    query(limits, ptr::null(), |limits| {
        Some(limits.messages.get(index)?.as_ptr())
    })
}

pub(crate) fn limits_configuration(limits: Option<&Limits>, output: Slot<'_, Blob>) -> ResultCode {
    produce(output, None, || {
        Ok(Blob::text(
            required(limits, "limits")?.limits.configuration(),
        ))
    })
}

pub(crate) fn program_options_create(output: Slot<'_, ProgramOptions>) -> ResultCode {
    produce(output, None, || {
        Ok(ProgramOptions(rglsl_link::ProgramOptions::default()))
    })
}

pub(crate) fn program_options_change(
    options: Option<&mut ProgramOptions>,
    change: impl FnOnce(&mut rglsl_link::ProgramOptions) -> Result<(), Failure>,
) -> ResultCode {
    update(options, |options| change(&mut options.0))
}

pub(crate) fn program_options_set_flags(
    options: Option<&mut ProgramOptions>,
    change: impl FnOnce(&mut rglsl_link::ProgramOptions),
) -> ResultCode {
    program_options_change(options, |options| {
        change(options);
        Ok(())
    })
}

pub(crate) fn program_options_set_debug_info(
    options: Option<&mut ProgramOptions>,
    level: DebugInfo,
) -> ResultCode {
    program_options_change(options, |options| {
        options.debug_info = level.level()?;
        Ok(())
    })
}

pub(crate) fn program_options_set_spirv_version(
    options: Option<&mut ProgramOptions>,
    major: u32,
    minor: u32,
) -> ResultCode {
    program_options_change(options, |options| {
        options.spirv_version = spirv_version(major, minor)?;
        Ok(())
    })
}

pub(crate) fn program_options_set_text(
    options: Option<&mut ProgramOptions>,
    value: Option<&CStr>,
    what: &str,
    change: impl FnOnce(&mut rglsl_link::ProgramOptions, Option<String>),
) -> ResultCode {
    program_options_change(options, |options| {
        change(options, optional_text(value, what)?);
        Ok(())
    })
}

pub(crate) fn program_options_set_limits(
    options: Option<&mut ProgramOptions>,
    limits: Option<&Limits>,
) -> ResultCode {
    program_options_change(options, |options| {
        options.limits = required(limits, "limits")?.limits;
        Ok(())
    })
}

pub(crate) fn program_options_set_optimization(
    options: Option<&mut ProgramOptions>,
    level: OptLevel,
) -> ResultCode {
    program_options_change(options, |options| {
        options.optimize.level = level.level()?;
        Ok(())
    })
}

pub(crate) fn program_options_set_target_gpu(
    options: Option<&mut ProgramOptions>,
    gpu: TargetGpu,
) -> ResultCode {
    program_options_change(options, |options| {
        options.optimize.target_gpu = gpu.gpu()?;
        Ok(())
    })
}

pub(crate) fn program_options_set_optimizer_passes(
    options: Option<&mut ProgramOptions>,
    passes: Option<&CStr>,
) -> ResultCode {
    program_options_change(options, |options| {
        let passes = optional_text(passes, "passes")?.map(|list| {
            list.split(',')
                .filter(|name| !name.is_empty())
                .map(str::to_owned)
                .collect()
        });
        let changed = rglsl_link::OptOptions {
            passes,
            ..options.optimize.clone()
        };
        changed
            .check()
            .map_err(|error| Failure::argument(error.to_string()))?;
        options.optimize = changed;
        Ok(())
    })
}

pub(crate) fn program_options_add_specialization(
    options: Option<&mut ProgramOptions>,
    id: u32,
    value: Option<&CStr>,
) -> ResultCode {
    program_options_change(options, |options| {
        let value = text(value, "value")?.trim();
        if value.is_empty() {
            return Err(Failure::argument(format!(
                "specialization constant {id} has no value"
            )));
        }
        options
            .optimize
            .specialization
            .push(rglsl_link::Specialization::new(id, value));
        Ok(())
    })
}

pub(crate) fn program_options_set_reflection(
    options: Option<&mut ProgramOptions>,
    enabled: bool,
    flags: u32,
) -> ResultCode {
    program_options_set_flags(options, |options| {
        options.reflection = enabled.then(|| reflection_options(flags));
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
                    .map(|object| &object.object)
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
            reflection: None,
            files_read: Vec::new(),
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

pub(crate) fn program_reflection(program: Option<&Program>) -> *const c_char {
    query(program, ptr::null(), |program| {
        Some(program.reflection.as_deref()?.as_ptr())
    })
}

pub(crate) fn program_file_count(program: Option<&Program>) -> usize {
    query(program, 0, |program| Some(program.files_read.len()))
}

pub(crate) fn program_file(program: Option<&Program>, index: usize) -> *const c_char {
    query(program, ptr::null(), |program| {
        Some(program.files_read.get(index)?.as_ptr())
    })
}

pub(crate) fn disassemble(
    words: Option<&[u32]>,
    form: Disassembly,
    output: Option<&mut *mut Blob>,
) -> ResultCode {
    let Some(output) = output else {
        return RGLSL_RESULT_INVALID_ARGUMENT;
    };
    *output = ptr::null_mut();
    let result = guarded(|| {
        let words = required(words, "words")?;
        Ok(rglsl_dis::disassemble(words, form.form()?))
    });
    match result {
        Ok(disassembly) => {
            let failed = disassembly.failed;
            publish(Some(output), Blob::bytes(disassembly.text));
            if failed {
                RGLSL_RESULT_INVALID_SPIRV
            } else {
                RGLSL_RESULT_OK
            }
        }
        Err(failure) => failure.code,
    }
}

pub(crate) fn hex_text(
    words: Option<&[u32]>,
    variable: Option<&CStr>,
    output: Slot<'_, Blob>,
) -> ResultCode {
    produce(output, None, || {
        let words = required(words, "words")?;
        let variable = optional_text(variable, "variable name")?;
        Ok(Blob::text(rglsl_dis::hex_text(words, variable.as_deref())))
    })
}

pub(crate) fn depfile(
    targets: Option<Vec<Option<&CStr>>>,
    dependencies: Option<Vec<Option<&CStr>>>,
    output: Slot<'_, Blob>,
) -> ResultCode {
    produce(output, None, || {
        let targets = texts(targets, "targets")?;
        let dependencies = texts(dependencies, "dependencies")?;
        Ok(Blob::text(rglsl_link::depfile(&targets, &dependencies)))
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

pub(crate) fn diagnostics_format(
    diagnostics: Option<&Diagnostics>,
    flags: u32,
    info_log: bool,
    output: Slot<'_, Blob>,
) -> ResultCode {
    produce(output, None, || {
        let diagnostics = &required(diagnostics, "diagnostics")?.source;
        let format = diagnostic_format(flags);
        Ok(Blob::text(if info_log {
            diagnostics.info_log(format)
        } else {
            diagnostics.format(format)
        }))
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
