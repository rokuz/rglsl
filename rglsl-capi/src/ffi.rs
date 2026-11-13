use std::ffi::{CStr, c_char, c_void};
use std::ptr;
use std::slice;

use crate::api::{
    self, Blob, CompileOptions, Compiler, Diagnostics, IncludeResult, Location, Object, Program,
    ProgramOptions, ResultCode, Severity, Stage,
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
pub unsafe extern "C" fn rglsl_compile_options_set_auto_map_bindings(
    options: *mut CompileOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_flags(options, |options| options.auto_map_bindings = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_auto_map_locations(
    options: *mut CompileOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_flags(options, |options| options.auto_map_locations = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_compile_options_set_debug_info(
    options: *mut CompileOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::compile_options_set_flags(options, |options| options.debug_info = enabled)
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
pub unsafe extern "C" fn rglsl_program_options_set_auto_map_bindings(
    options: *mut ProgramOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_flags(options, |options| options.auto_map_bindings = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_auto_map_locations(
    options: *mut ProgramOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_flags(options, |options| options.auto_map_locations = enabled)
}

#[unsafe(no_mangle)]
pub unsafe extern "C" fn rglsl_program_options_set_debug_info(
    options: *mut ProgramOptions,
    enabled: bool,
) -> ResultCode {
    let options = unsafe { options.as_mut() };
    api::program_options_set_flags(options, |options| options.debug_info = enabled)
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
