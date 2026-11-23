use std::ffi::{CStr, c_char, c_void};
use std::ptr;
use std::slice;

use crate::api::{
    self, Blob, CompileOptions, Compiler, DebugInfo, Diagnostics, Disassembly, IncludeResult,
    Limits, Location, Object, OptLevel, Program, ProgramOptions, ResultCode, Severity, Stage,
    TargetGpu,
};
use crate::reflection::{
    self, Binding, DescriptorType, Interface, InterfaceFormat, InterfaceSlot, LocalSize,
    PipelineLayout, Reflection, Scalar, ScalarKind, Specialization,
};

pub type IncludeCallback = Option<
    unsafe extern "C" fn(
        user_data: *mut c_void,
        requested: *const c_char,
        system: bool,
        includer: *const c_char,
        result: *mut IncludeResult,
    ),
>;

type IncludeFunction = unsafe extern "C" fn(
    user_data: *mut c_void,
    requested: *const c_char,
    system: bool,
    includer: *const c_char,
    result: *mut IncludeResult,
);

#[derive(Debug, Clone, Copy)]
pub(crate) struct Includer {
    callback: IncludeFunction,
    user_data: *mut c_void,
}

impl Includer {
    pub(crate) fn call(
        self,
        requested: &CStr,
        system: bool,
        includer: Option<&CStr>,
        result: &mut IncludeResult,
    ) {
        let includer = includer.map_or(ptr::null(), CStr::as_ptr);
        let result = ptr::from_mut(result);
        unsafe { (self.callback)(self.user_data, requested.as_ptr(), system, includer, result) };
    }
}

unsafe fn c_str<'a>(pointer: *const c_char) -> Option<&'a CStr> {
    if pointer.is_null() {
        return None;
    }
    Some(unsafe { CStr::from_ptr(pointer) })
}

unsafe fn bytes<'a>(data: *const u8, size: usize) -> Option<&'a [u8]> {
    if data.is_null() {
        return (size == 0).then_some(&[]);
    }
    Some(unsafe { slice::from_raw_parts(data, size) })
}

unsafe fn handles<'a, T>(pointers: *const *const T, count: usize) -> Option<Vec<Option<&'a T>>> {
    if pointers.is_null() {
        return (count == 0).then(Vec::new);
    }
    let pointers = unsafe { slice::from_raw_parts(pointers, count) };
    Some(
        pointers
            .iter()
            .map(|&pointer| unsafe { pointer.as_ref() })
            .collect(),
    )
}

unsafe fn word_slice<'a>(words: *const u32, count: usize) -> Option<&'a [u32]> {
    if words.is_null() {
        return (count == 0).then_some(&[]);
    }
    Some(unsafe { slice::from_raw_parts(words, count) })
}

unsafe fn strings<'a>(
    pointers: *const *const c_char,
    count: usize,
) -> Option<Vec<Option<&'a CStr>>> {
    if pointers.is_null() {
        return (count == 0).then(Vec::new);
    }
    let pointers = unsafe { slice::from_raw_parts(pointers, count) };
    Some(
        pointers
            .iter()
            .map(|&pointer| unsafe { c_str(pointer) })
            .collect(),
    )
}

unsafe fn take<T>(handle: *mut T) -> Option<Box<T>> {
    if handle.is_null() {
        return None;
    }
    Some(unsafe { Box::from_raw(handle) })
}

#[unsafe(no_mangle)]
pub extern "C" fn rglsl_version() -> *const c_char {
    api::VERSION.as_ptr()
}

#[unsafe(no_mangle)]
pub extern "C" fn rglsl_abi_version() -> u32 {
    api::RGLSL_ABI_VERSION
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_create(
    name: *const c_char,
    stage: Stage,
    options: *mut *mut CompileOptions,
) -> ResultCode {
    let name = unsafe { c_str(name) };
    let options = unsafe { options.as_mut() };
    api::compile_options_create(name, Some(stage), options)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_create_library(
    name: *const c_char,
    options: *mut *mut CompileOptions,
) -> ResultCode {
    let name = unsafe { c_str(name) };
    let options = unsafe { options.as_mut() };
    api::compile_options_create(name, None, options)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_destroy(options: *mut CompileOptions) {
    api::destroy(unsafe { take(options) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_add_define(
    options: *mut CompileOptions,
    name: *const c_char,
    value: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let name = unsafe { c_str(name) };
    let value = unsafe { c_str(value) };
    api::compile_options_add_define(options, name, value)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_add_include(
    options: *mut CompileOptions,
    name: *const c_char,
    source: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let name = unsafe { c_str(name) };
    let source = unsafe { c_str(source) };
    api::compile_options_add_include(options, name, source)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_add_include_dir(
    options: *mut CompileOptions,
    directory: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let directory = unsafe { c_str(directory) };
    api::compile_options_add_include_dir(options, directory)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_debug_info(
    options: *mut CompileOptions,
    level: DebugInfo,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_debug_info(options, level)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_spirv_version(
    options: *mut CompileOptions,
    major: u32,
    minor: u32,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_spirv_version(options, major, minor)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_includer(
    options: *mut CompileOptions,
    callback: IncludeCallback,
    user_data: *mut c_void,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let includer = callback.map(|callback| Includer {
        callback,
        user_data,
    });
    api::compile_options_set_includer(options, includer)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_include_result_set(
    result: *mut IncludeResult,
    name: *const c_char,
    source: *const c_char,
) -> ResultCode {
    let result = unsafe { result.as_mut() };
    let name = unsafe { c_str(name) };
    let source = unsafe { c_str(source) };
    api::include_result_set(result, name, source)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile(
    source: *const c_char,
    options: *const CompileOptions,
    object: *mut *mut Object,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let source = unsafe { c_str(source) };
    let options = unsafe { options.as_ref() };
    let object = unsafe { object.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    api::compile(source, options, object, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compiler_create(compiler: *mut *mut Compiler) -> ResultCode {
    api::compiler_create(unsafe { compiler.as_mut() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compiler_destroy(compiler: *mut Compiler) {
    api::destroy(unsafe { take(compiler) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compiler_compile(
    compiler: *const Compiler,
    source: *const c_char,
    options: *const CompileOptions,
    object: *mut *mut Object,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let compiler = unsafe { compiler.as_ref() };
    let source = unsafe { c_str(source) };
    let options = unsafe { options.as_ref() };
    let object = unsafe { object.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    api::compiler_compile(compiler, source, options, object, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_object_destroy(object: *mut Object) {
    api::destroy(unsafe { take(object) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_object_write(
    object: *const Object,
    blob: *mut *mut Blob,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let object = unsafe { object.as_ref() };
    let blob = unsafe { blob.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    api::object_write(object, blob, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_object_read(
    data: *const u8,
    size: usize,
    object: *mut *mut Object,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let data = unsafe { bytes(data, size) };
    let object = unsafe { object.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    api::object_read(data, object, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_blob_data(blob: *const Blob) -> *const u8 {
    api::blob_data(unsafe { blob.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_blob_size(blob: *const Blob) -> usize {
    api::blob_size(unsafe { blob.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_blob_destroy(blob: *mut Blob) {
    api::destroy(unsafe { take(blob) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_create(
    options: *mut *mut ProgramOptions,
) -> ResultCode {
    api::program_options_create(unsafe { options.as_mut() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_destroy(options: *mut ProgramOptions) {
    api::destroy(unsafe { take(options) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_debug_info(
    options: *mut ProgramOptions,
    level: DebugInfo,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_debug_info(options, level)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_spirv_version(
    options: *mut ProgramOptions,
    major: u32,
    minor: u32,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_spirv_version(options, major, minor)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_link(
    objects: *const *const Object,
    count: usize,
    options: *const ProgramOptions,
    program: *mut *mut Program,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let objects = unsafe { handles(objects, count) };
    let options = unsafe { options.as_ref() };
    let program = unsafe { program.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    api::link(objects, options, program, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_destroy(program: *mut Program) {
    api::destroy(unsafe { take(program) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_stage_count(program: *const Program) -> usize {
    api::program_stage_count(unsafe { program.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_stage(
    program: *const Program,
    index: usize,
    stage: *mut Stage,
) -> ResultCode {
    let program = unsafe { program.as_ref() };
    let stage = unsafe { stage.as_mut() };
    api::program_stage(program, index, stage)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_entry_point(
    program: *const Program,
    index: usize,
) -> *const c_char {
    api::program_entry_point(unsafe { program.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_spirv(
    program: *const Program,
    index: usize,
    words: *mut *const u32,
    word_count: *mut usize,
) -> ResultCode {
    let program = unsafe { program.as_ref() };
    let words = unsafe { words.as_mut() };
    let word_count = unsafe { word_count.as_mut() };
    api::program_spirv(program, index, words, word_count)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_warnings(program: *const Program) -> *const Diagnostics {
    api::program_warnings(unsafe { program.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_diagnostics_destroy(diagnostics: *mut Diagnostics) {
    api::destroy(unsafe { take(diagnostics) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_diagnostics_count(diagnostics: *const Diagnostics) -> usize {
    api::diagnostics_count(unsafe { diagnostics.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_diagnostics_text(diagnostics: *const Diagnostics) -> *const c_char {
    api::diagnostics_text(unsafe { diagnostics.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_diagnostics_message(
    diagnostics: *const Diagnostics,
    index: usize,
) -> *const c_char {
    api::diagnostics_message(unsafe { diagnostics.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_diagnostics_location(
    diagnostics: *const Diagnostics,
    index: usize,
    severity: *mut Severity,
    file: *mut *const c_char,
    line: *mut u32,
    column: *mut u32,
) -> ResultCode {
    let diagnostics = unsafe { diagnostics.as_ref() };
    let location = Location {
        severity: unsafe { severity.as_mut() },
        file: unsafe { file.as_mut() },
        line: unsafe { line.as_mut() },
        column: unsafe { column.as_mut() },
    };
    api::diagnostics_location(diagnostics, index, location)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_file_system_includes(
    options: *mut CompileOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_flags(options, |options| options.file_system_includes = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_suppress_warnings(
    options: *mut CompileOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_flags(options, |options| options.suppress_warnings = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_generate_spirv(
    options: *mut ProgramOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_flags(options, |options| options.generate_spirv = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_suppress_warnings(
    options: *mut ProgramOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_flags(options, |options| options.suppress_warnings = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_enhanced_messages(
    options: *mut CompileOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_flags(options, |options| options.enhanced_messages = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_invert_y(
    options: *mut CompileOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_flags(options, |options| options.invert_y = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_nan_clamp(
    options: *mut CompileOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_flags(options, |options| options.nan_clamp = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_discard_is_terminate(
    options: *mut CompileOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_flags(options, |options| options.discard_is_terminate = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_validate_io(
    options: *mut ProgramOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_flags(options, |options| options.validate_io = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_optimization(
    options: *mut ProgramOptions,
    level: OptLevel,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_optimization(options, level)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_target_gpu(
    options: *mut ProgramOptions,
    gpu: TargetGpu,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_target_gpu(options, gpu)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_optimizer_passes(
    options: *mut ProgramOptions,
    passes: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let passes = unsafe { c_str(passes) };
    api::program_options_set_optimizer_passes(options, passes)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_add_specialization(
    options: *mut ProgramOptions,
    id: u32,
    value: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let value = unsafe { c_str(value) };
    api::program_options_add_specialization(options, id, value)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_clear_specializations(
    options: *mut ProgramOptions,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_flags(options, |options| options.optimize.specialization.clear())
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_optimizer_validate_each(
    options: *mut ProgramOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_flags(options, |options| options.optimize.validate_each = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_add_undefine(
    options: *mut CompileOptions,
    name: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let name = unsafe { c_str(name) };
    api::compile_options_add_undefine(options, name)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_add_preamble_text(
    options: *mut CompileOptions,
    text: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let text = unsafe { c_str(text) };
    api::compile_options_add_preamble_text(options, text)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_entry_point(
    options: *mut CompileOptions,
    name: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let name = unsafe { c_str(name) };
    api::compile_options_set_entry_point(options, name)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_vulkan_version(
    options: *mut CompileOptions,
    major: u32,
    minor: u32,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_vulkan_version(options, major, minor)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_limits(
    options: *mut CompileOptions,
    limits: *const Limits,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let limits = unsafe { limits.as_ref() };
    api::compile_options_set_limits(options, limits)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_command_line(
    options: *mut ProgramOptions,
    command_line: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let command_line = unsafe { c_str(command_line) };
    api::program_options_set_text(options, command_line, "command line", |options, value| {
        options.command_line = value;
    })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_working_directory(
    options: *mut ProgramOptions,
    directory: *const c_char,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let directory = unsafe { c_str(directory) };
    api::program_options_set_text(options, directory, "directory", |options, value| {
        options.working_directory = value;
    })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_limits(
    options: *mut ProgramOptions,
    limits: *const Limits,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    let limits = unsafe { limits.as_ref() };
    api::program_options_set_limits(options, limits)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_reflection(
    options: *mut ProgramOptions,
    enabled: bool,
    flags: u32,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_reflection(options, enabled, flags)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_limits_create(limits: *mut *mut Limits) -> ResultCode {
    api::limits_create(unsafe { limits.as_mut() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_limits_decode(
    data: *const u8,
    size: usize,
    limits: *mut *mut Limits,
) -> ResultCode {
    let data = unsafe { bytes(data, size) };
    let limits = unsafe { limits.as_mut() };
    api::limits_decode(data, limits)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_limits_destroy(limits: *mut Limits) {
    api::destroy(unsafe { take(limits) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_limits_set(
    limits: *mut Limits,
    name: *const c_char,
    value: i32,
) -> ResultCode {
    let limits = unsafe { limits.as_mut() };
    let name = unsafe { c_str(name) };
    api::limits_set(limits, name, value)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_limits_get(
    limits: *const Limits,
    name: *const c_char,
    value: *mut i32,
) -> ResultCode {
    let limits = unsafe { limits.as_ref() };
    let name = unsafe { c_str(name) };
    let value = unsafe { value.as_mut() };
    api::limits_get(limits, name, value)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_limits_message_count(limits: *const Limits) -> usize {
    api::limits_message_count(unsafe { limits.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_limits_message(
    limits: *const Limits,
    index: usize,
) -> *const c_char {
    api::limits_message(unsafe { limits.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_limits_configuration(
    limits: *const Limits,
    text: *mut *mut Blob,
) -> ResultCode {
    let limits = unsafe { limits.as_ref() };
    let text = unsafe { text.as_mut() };
    api::limits_configuration(limits, text)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_object_file_count(object: *const Object) -> usize {
    api::object_file_count(unsafe { object.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_object_file(object: *const Object, index: usize) -> *const c_char {
    api::object_file(unsafe { object.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compiler_preprocess(
    compiler: *const Compiler,
    source: *const c_char,
    options: *const CompileOptions,
    text: *mut *mut Blob,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let compiler = unsafe { compiler.as_ref() };
    let source = unsafe { c_str(source) };
    let options = unsafe { options.as_ref() };
    let text = unsafe { text.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    api::compiler_preprocess(compiler, source, options, text, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compiler_build(
    compiler: *const Compiler,
    sources: *const *const c_char,
    options: *const *const CompileOptions,
    count: usize,
    program_options: *const ProgramOptions,
    program: *mut *mut Program,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let compiler = unsafe { compiler.as_ref() };
    let sources = unsafe { strings(sources, count) };
    let options = unsafe { handles(options, count) };
    let program_options = unsafe { program_options.as_ref() };
    let program = unsafe { program.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    api::compiler_build(
        compiler,
        sources,
        options,
        program_options,
        program,
        diagnostics,
    )
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_reflection(program: *const Program) -> *const c_char {
    api::program_reflection(unsafe { program.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_file_count(program: *const Program) -> usize {
    api::program_file_count(unsafe { program.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_file(
    program: *const Program,
    index: usize,
) -> *const c_char {
    api::program_file(unsafe { program.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_blob_text(blob: *const Blob) -> *const c_char {
    api::blob_text(unsafe { blob.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_disassemble(
    words: *const u32,
    word_count: usize,
    form: Disassembly,
    text: *mut *mut Blob,
) -> ResultCode {
    let words = unsafe { word_slice(words, word_count) };
    let text = unsafe { text.as_mut() };
    api::disassemble(words, form, text)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_hex_text(
    words: *const u32,
    word_count: usize,
    variable_name: *const c_char,
    text: *mut *mut Blob,
) -> ResultCode {
    let words = unsafe { word_slice(words, word_count) };
    let variable_name = unsafe { c_str(variable_name) };
    let text = unsafe { text.as_mut() };
    api::hex_text(words, variable_name, text)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_depfile(
    targets: *const *const c_char,
    target_count: usize,
    dependencies: *const *const c_char,
    dependency_count: usize,
    text: *mut *mut Blob,
) -> ResultCode {
    let targets = unsafe { strings(targets, target_count) };
    let dependencies = unsafe { strings(dependencies, dependency_count) };
    let text = unsafe { text.as_mut() };
    api::depfile(targets, dependencies, text)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_diagnostics_format(
    diagnostics: *const Diagnostics,
    flags: u32,
    text: *mut *mut Blob,
) -> ResultCode {
    let diagnostics = unsafe { diagnostics.as_ref() };
    let text = unsafe { text.as_mut() };
    api::diagnostics_format(diagnostics, flags, false, text)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_diagnostics_info_log(
    diagnostics: *const Diagnostics,
    flags: u32,
    text: *mut *mut Blob,
) -> ResultCode {
    let diagnostics = unsafe { diagnostics.as_ref() };
    let text = unsafe { text.as_mut() };
    api::diagnostics_format(diagnostics, flags, true, text)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflect(
    words: *const u32,
    word_count: usize,
    reflection: *mut *mut Reflection,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let words = unsafe { word_slice(words, word_count) };
    let reflection = unsafe { reflection.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    reflection::reflect(words, reflection, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_destroy(reflection: *mut Reflection) {
    api::destroy(unsafe { take(reflection) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_stage_reflection(
    program: *const Program,
    index: usize,
) -> *const Reflection {
    reflection::program_stage_reflection(unsafe { program.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_stage(
    reflection: *const Reflection,
    stage: *mut Stage,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let stage = unsafe { stage.as_mut() };
    reflection::reflection_stage(reflection_ref, stage)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_entry_point(
    reflection: *const Reflection,
) -> *const c_char {
    reflection::reflection_entry_point(unsafe { reflection.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_local_size(
    reflection: *const Reflection,
    dimension: u32,
    size: *mut u32,
    specialized: *mut bool,
    spec_id: *mut u32,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let output = LocalSize {
        size: unsafe { size.as_mut() },
        specialized: unsafe { specialized.as_mut() },
        id: unsafe { spec_id.as_mut() },
    };
    reflection::reflection_local_size(reflection_ref, dimension, output)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_binding_count(reflection: *const Reflection) -> usize {
    reflection::reflection_binding_count(unsafe { reflection.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_binding(
    reflection: *const Reflection,
    index: usize,
    set: *mut u32,
    binding: *mut u32,
    descriptor_type: *mut DescriptorType,
    count: *mut u32,
    variable_id: *mut u32,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let output = Binding {
        set: unsafe { set.as_mut() },
        binding: unsafe { binding.as_mut() },
        descriptor_type: unsafe { descriptor_type.as_mut() },
        count: unsafe { count.as_mut() },
        extra: unsafe { variable_id.as_mut() },
    };
    reflection::reflection_binding(reflection_ref, index, output)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_binding_name(
    reflection: *const Reflection,
    index: usize,
) -> *const c_char {
    reflection::reflection_binding_name(unsafe { reflection.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_binding_block(
    reflection: *const Reflection,
    index: usize,
    size: *mut u32,
    runtime_array_stride: *mut u32,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let size = unsafe { size.as_mut() };
    let runtime_array_stride = unsafe { runtime_array_stride.as_mut() };
    reflection::reflection_binding_block(reflection_ref, index, size, runtime_array_stride)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_descriptor_heaps(reflection: *const Reflection) -> u32 {
    reflection::reflection_descriptor_heaps(unsafe { reflection.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_push_constant_count(
    reflection: *const Reflection,
) -> usize {
    reflection::reflection_push_constant_count(unsafe { reflection.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_push_constant(
    reflection: *const Reflection,
    index: usize,
    offset: *mut u32,
    size: *mut u32,
    variable_id: *mut u32,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let offset = unsafe { offset.as_mut() };
    let size = unsafe { size.as_mut() };
    let variable_id = unsafe { variable_id.as_mut() };
    reflection::reflection_push_constant(reflection_ref, index, offset, size, variable_id)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_push_constant_name(
    reflection: *const Reflection,
    index: usize,
) -> *const c_char {
    reflection::reflection_push_constant_name(unsafe { reflection.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_push_constant_bank(
    reflection: *const Reflection,
    index: usize,
    bank: *mut u32,
    bank_offset: *mut u32,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let bank = unsafe { bank.as_mut() };
    let bank_offset = unsafe { bank_offset.as_mut() };
    reflection::reflection_push_constant_bank(reflection_ref, index, bank, bank_offset)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_interface_count(
    reflection: *const Reflection,
    direction: Interface,
) -> usize {
    reflection::reflection_interface_count(unsafe { reflection.as_ref() }, direction)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_interface(
    reflection: *const Reflection,
    direction: Interface,
    index: usize,
    location: *mut u32,
    component: *mut u32,
    variable_id: *mut u32,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let output = InterfaceSlot {
        location: unsafe { location.as_mut() },
        component: unsafe { component.as_mut() },
        variable_id: unsafe { variable_id.as_mut() },
    };
    reflection::reflection_interface(reflection_ref, direction, index, output)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_interface_name(
    reflection: *const Reflection,
    direction: Interface,
    index: usize,
) -> *const c_char {
    reflection::reflection_interface_name(unsafe { reflection.as_ref() }, direction, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_interface_type(
    reflection: *const Reflection,
    direction: Interface,
    index: usize,
    kind: *mut ScalarKind,
    width: *mut u32,
    vector_size: *mut u32,
    columns: *mut u32,
    array: *mut *const u32,
    array_rank: *mut usize,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let output = InterfaceFormat {
        scalar: Scalar {
            kind: unsafe { kind.as_mut() },
            width: unsafe { width.as_mut() },
        },
        vector_size: unsafe { vector_size.as_mut() },
        columns: unsafe { columns.as_mut() },
        array: unsafe { array.as_mut() },
        array_rank: unsafe { array_rank.as_mut() },
    };
    reflection::reflection_interface_type(reflection_ref, direction, index, output)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_specialization_count(
    reflection: *const Reflection,
) -> usize {
    reflection::reflection_specialization_count(unsafe { reflection.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_specialization(
    reflection: *const Reflection,
    index: usize,
    spec_id: *mut u32,
    kind: *mut ScalarKind,
    width: *mut u32,
    default_bits: *mut u64,
    result_id: *mut u32,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let output = Specialization {
        spec_id: unsafe { spec_id.as_mut() },
        scalar: Scalar {
            kind: unsafe { kind.as_mut() },
            width: unsafe { width.as_mut() },
        },
        default_bits: unsafe { default_bits.as_mut() },
        result_id: unsafe { result_id.as_mut() },
    };
    reflection::reflection_specialization(reflection_ref, index, output)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_specialization_name(
    reflection: *const Reflection,
    index: usize,
) -> *const c_char {
    reflection::reflection_specialization_name(unsafe { reflection.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_reflection_json(
    reflection: *const Reflection,
    json: *mut *mut Blob,
) -> ResultCode {
    let reflection_ref = unsafe { reflection.as_ref() };
    let json = unsafe { json.as_mut() };
    reflection::reflection_json(reflection_ref, json)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_pipeline_layout_create(
    reflections: *const *const Reflection,
    count: usize,
    layout: *mut *mut PipelineLayout,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let reflections = unsafe { handles(reflections, count) };
    let layout = unsafe { layout.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    reflection::pipeline_layout_create(reflections, layout, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_pipeline_layout(
    program: *const Program,
    layout: *mut *mut PipelineLayout,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let program = unsafe { program.as_ref() };
    let layout = unsafe { layout.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    reflection::program_pipeline_layout(program, layout, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_reflection_json(
    program: *const Program,
    json: *mut *mut Blob,
    diagnostics: *mut *mut Diagnostics,
) -> ResultCode {
    let program = unsafe { program.as_ref() };
    let json = unsafe { json.as_mut() };
    let diagnostics = unsafe { diagnostics.as_mut() };
    reflection::program_reflection_json(program, json, diagnostics)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_pipeline_layout_destroy(layout: *mut PipelineLayout) {
    api::destroy(unsafe { take(layout) });
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_pipeline_layout_binding_count(
    layout: *const PipelineLayout,
) -> usize {
    reflection::pipeline_layout_binding_count(unsafe { layout.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_pipeline_layout_binding(
    layout: *const PipelineLayout,
    index: usize,
    set: *mut u32,
    binding: *mut u32,
    descriptor_type: *mut DescriptorType,
    count: *mut u32,
    stage_flags: *mut u32,
) -> ResultCode {
    let layout = unsafe { layout.as_ref() };
    let output = Binding {
        set: unsafe { set.as_mut() },
        binding: unsafe { binding.as_mut() },
        descriptor_type: unsafe { descriptor_type.as_mut() },
        count: unsafe { count.as_mut() },
        extra: unsafe { stage_flags.as_mut() },
    };
    reflection::pipeline_layout_binding(layout, index, output)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_pipeline_layout_binding_name(
    layout: *const PipelineLayout,
    index: usize,
) -> *const c_char {
    reflection::pipeline_layout_binding_name(unsafe { layout.as_ref() }, index)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_pipeline_layout_push_constant_range_count(
    layout: *const PipelineLayout,
) -> usize {
    reflection::pipeline_layout_push_constant_range_count(unsafe { layout.as_ref() })
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_pipeline_layout_push_constant_range(
    layout: *const PipelineLayout,
    index: usize,
    stage_flags: *mut u32,
    offset: *mut u32,
    size: *mut u32,
) -> ResultCode {
    let layout = unsafe { layout.as_ref() };
    let stage_flags = unsafe { stage_flags.as_mut() };
    let offset = unsafe { offset.as_mut() };
    let size = unsafe { size.as_mut() };
    reflection::pipeline_layout_push_constant_range(layout, index, stage_flags, offset, size)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_pipeline_layout_push_constant_range_bank(
    layout: *const PipelineLayout,
    index: usize,
    bank: *mut u32,
) -> ResultCode {
    let layout = unsafe { layout.as_ref() };
    let bank = unsafe { bank.as_mut() };
    reflection::pipeline_layout_push_constant_range_bank(layout, index, bank)
}
