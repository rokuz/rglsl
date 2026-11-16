#![expect(
    unsafe_code,
    reason = "the tests call the C functions of rglsl-capi through their Rust declarations"
)]

use std::ffi::{CStr, c_char, c_void};
use std::ptr;

use rglsl_c::{
    Blob, CompileOptions, Compiler, Diagnostics, IncludeResult, Object, Program, ProgramOptions,
    RGLSL_ABI_VERSION, RGLSL_DEBUG_INFO_LINES, RGLSL_RESULT_COMPILE_FAILED,
    RGLSL_RESULT_INVALID_ARGUMENT, RGLSL_RESULT_INVALID_OBJECT, RGLSL_RESULT_LINK_FAILED,
    RGLSL_RESULT_OK, RGLSL_SEVERITY_ERROR, RGLSL_SEVERITY_WARNING, RGLSL_STAGE_COMPUTE,
    RGLSL_STAGE_FRAGMENT, RGLSL_STAGE_VERTEX, ResultCode, Stage,
};

type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

const VERTEX: &CStr = c"#version 450
layout(location = 0) in vec3 position;
layout(location = 0) out vec3 normal;
void main() {
    normal = normalize(position);
    gl_Position = vec4(position, 1.0);
}
";

const FRAGMENT: &CStr = c"#version 450
layout(location = 0) in vec3 normal;
layout(location = 0) out vec4 color;
vec3 shade(vec3 normal);
void main() {
    color = vec4(shade(normal), 1.0);
}
";

const LIGHTING: &CStr = c"#version 450
#include \"light.h\"
#include <ambient.h>
vec3 shade(vec3 normal) {
    return AMBIENT + LIGHT_COLOR * max(dot(normal, LIGHT_DIRECTION), 0.0) * INTENSITY;
}
";

const BROKEN: &CStr = c"#version 450\nvoid main() {\n    float x = missing;\n}\n";

struct Owned<T> {
    pointer: *mut T,
    destroy: unsafe extern "C" fn(*mut T),
}

impl<T> Owned<T> {
    fn new(pointer: *mut T, destroy: unsafe extern "C" fn(*mut T)) -> TestResult<Self> {
        if pointer.is_null() {
            return Err("rglsl returned a NULL handle".into());
        }
        Ok(Self { pointer, destroy })
    }

    fn as_const(&self) -> *const T {
        self.pointer.cast_const()
    }
}

impl<T> Drop for Owned<T> {
    fn drop(&mut self) {
        unsafe { (self.destroy)(self.pointer) };
    }
}

fn string(pointer: *const c_char) -> TestResult<String> {
    if pointer.is_null() {
        return Err("rglsl returned a NULL string".into());
    }
    Ok(unsafe { CStr::from_ptr(pointer) }.to_str()?.to_owned())
}

fn diagnostics_text(diagnostics: *const Diagnostics) -> TestResult<String> {
    string(unsafe { rglsl_c::rglsl_diagnostics_text(diagnostics) })
}

fn compile_options(name: &CStr, stage: Stage) -> TestResult<Owned<CompileOptions>> {
    let mut options = ptr::null_mut();
    let code =
        unsafe { rglsl_c::rglsl_compile_options_create(name.as_ptr(), stage, &raw mut options) };
    assert_eq!(code, RGLSL_RESULT_OK);
    Owned::new(options, rglsl_c::rglsl_compile_options_destroy)
}

fn library_options(name: &CStr) -> TestResult<Owned<CompileOptions>> {
    let mut options = ptr::null_mut();
    let code =
        unsafe { rglsl_c::rglsl_compile_options_create_library(name.as_ptr(), &raw mut options) };
    assert_eq!(code, RGLSL_RESULT_OK);
    Owned::new(options, rglsl_c::rglsl_compile_options_destroy)
}

enum Outcome<T> {
    Done(Owned<T>),
    Failed(ResultCode, Option<Owned<Diagnostics>>),
}

impl<T> Outcome<T> {
    fn new(
        code: ResultCode,
        value: *mut T,
        destroy: unsafe extern "C" fn(*mut T),
        diagnostics: *mut Diagnostics,
    ) -> TestResult<Self> {
        if code == RGLSL_RESULT_OK {
            assert!(diagnostics.is_null());
            return Ok(Self::Done(Owned::new(value, destroy)?));
        }
        assert!(value.is_null());
        let diagnostics = (!diagnostics.is_null())
            .then(|| Owned::new(diagnostics, rglsl_c::rglsl_diagnostics_destroy))
            .transpose()?;
        Ok(Self::Failed(code, diagnostics))
    }

    fn done(self) -> TestResult<Owned<T>> {
        match self {
            Self::Done(value) => Ok(value),
            Self::Failed(code, diagnostics) => {
                let text = match diagnostics {
                    Some(diagnostics) => diagnostics_text(diagnostics.as_const())?,
                    None => String::new(),
                };
                Err(format!("rglsl failed with {code:?}: {text}").into())
            }
        }
    }

    fn failed(self) -> TestResult<(ResultCode, String)> {
        match self {
            Self::Done(_) => Err("rglsl succeeded".into()),
            Self::Failed(code, Some(diagnostics)) => {
                Ok((code, diagnostics_text(diagnostics.as_const())?))
            }
            Self::Failed(code, None) => Ok((code, String::new())),
        }
    }
}

fn compile(source: &CStr, options: &Owned<CompileOptions>) -> TestResult<Outcome<Object>> {
    let mut object = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_compile(
            source.as_ptr(),
            options.as_const(),
            &raw mut object,
            &raw mut diagnostics,
        )
    };
    Outcome::new(code, object, rglsl_c::rglsl_object_destroy, diagnostics)
}

fn link(objects: &[*const Object], options: *const ProgramOptions) -> TestResult<Outcome<Program>> {
    let mut program = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_link(
            objects.as_ptr(),
            objects.len(),
            options,
            &raw mut program,
            &raw mut diagnostics,
        )
    };
    Outcome::new(code, program, rglsl_c::rglsl_program_destroy, diagnostics)
}

fn read_object(bytes: &[u8]) -> TestResult<Outcome<Object>> {
    let mut object = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_object_read(
            bytes.as_ptr(),
            bytes.len(),
            &raw mut object,
            &raw mut diagnostics,
        )
    };
    Outcome::new(code, object, rglsl_c::rglsl_object_destroy, diagnostics)
}

fn write_object(object: &Owned<Object>) -> TestResult<Vec<u8>> {
    let mut blob: *mut Blob = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_object_write(object.as_const(), &raw mut blob, &raw mut diagnostics)
    };
    let blob = Outcome::new(code, blob, rglsl_c::rglsl_blob_destroy, diagnostics)?.done()?;
    let data = unsafe { rglsl_c::rglsl_blob_data(blob.as_const()) };
    let size = unsafe { rglsl_c::rglsl_blob_size(blob.as_const()) };
    if data.is_null() {
        return Err("a blob without data".into());
    }
    Ok(unsafe { std::slice::from_raw_parts(data, size) }.to_vec())
}

fn stages(program: &Owned<Program>) -> TestResult<Vec<(Stage, String, Vec<u32>)>> {
    let count = unsafe { rglsl_c::rglsl_program_stage_count(program.as_const()) };
    (0..count)
        .map(|index| {
            let mut stage = RGLSL_STAGE_COMPUTE;
            let code =
                unsafe { rglsl_c::rglsl_program_stage(program.as_const(), index, &raw mut stage) };
            assert_eq!(code, RGLSL_RESULT_OK);
            let entry_point =
                string(unsafe { rglsl_c::rglsl_program_entry_point(program.as_const(), index) })?;
            let mut words = ptr::null();
            let mut word_count = 0;
            let code = unsafe {
                rglsl_c::rglsl_program_spirv(
                    program.as_const(),
                    index,
                    &raw mut words,
                    &raw mut word_count,
                )
            };
            assert_eq!(code, RGLSL_RESULT_OK);
            if words.is_null() {
                return Err("a stage without SPIR-V".into());
            }
            let words = unsafe { std::slice::from_raw_parts(words, word_count) }.to_vec();
            Ok((stage, entry_point, words))
        })
        .collect()
}

#[derive(Debug, Default)]
struct Requests {
    seen: Vec<(String, bool, Option<String>)>,
}

unsafe extern "C" fn include_lighting(
    user_data: *mut c_void,
    requested: *const c_char,
    system: bool,
    includer: *const c_char,
    result: *mut IncludeResult,
) {
    let Some(requests) = (unsafe { user_data.cast::<Requests>().as_mut() }) else {
        return;
    };
    let requested = unsafe { CStr::from_ptr(requested) };
    let includer = (!includer.is_null()).then(|| {
        unsafe { CStr::from_ptr(includer) }
            .to_string_lossy()
            .into_owned()
    });
    requests
        .seen
        .push((requested.to_string_lossy().into_owned(), system, includer));
    let (name, source): (*const c_char, &CStr) = match requested.to_bytes() {
        b"light.h" => (
            c"lib/light.h".as_ptr(),
            c"#include \"direction.h\"\nconst vec3 LIGHT_COLOR = vec3(1.0, 0.9, 0.8);\n",
        ),
        b"direction.h" => (
            ptr::null(),
            c"const vec3 LIGHT_DIRECTION = vec3(0.0, 0.0, 1.0);\n",
        ),
        _ => return,
    };
    let code =
        unsafe { rglsl_c::rglsl_include_result_set(result, c"ignored.h".as_ptr(), c"".as_ptr()) };
    assert_eq!(code, RGLSL_RESULT_OK);
    let code = unsafe { rglsl_c::rglsl_include_result_set(result, name, source.as_ptr()) };
    assert_eq!(code, RGLSL_RESULT_OK);
}

fn lighting_options(requests: &mut Requests) -> TestResult<Owned<CompileOptions>> {
    let options = library_options(c"shaders/lighting.glsl")?;
    let calls = [
        unsafe {
            rglsl_c::rglsl_compile_options_add_define(
                options.pointer,
                c"INTENSITY".as_ptr(),
                c"0.75".as_ptr(),
            )
        },
        unsafe {
            rglsl_c::rglsl_compile_options_add_include(
                options.pointer,
                c"include/ambient.h".as_ptr(),
                c"const vec3 AMBIENT = vec3(0.1);\n".as_ptr(),
            )
        },
        unsafe {
            rglsl_c::rglsl_compile_options_add_include_dir(options.pointer, c"include".as_ptr())
        },
        unsafe {
            rglsl_c::rglsl_compile_options_set_includer(
                options.pointer,
                Some(include_lighting),
                ptr::from_mut(requests).cast(),
            )
        },
    ];
    assert_eq!(calls, [RGLSL_RESULT_OK; 4]);
    Ok(options)
}

#[test]
fn versions() -> TestResult {
    assert_eq!(string(rglsl_c::rglsl_version())?, env!("CARGO_PKG_VERSION"));
    assert_eq!(rglsl_c::rglsl_abi_version(), RGLSL_ABI_VERSION);
    Ok(())
}

#[test]
fn compiles_and_links_two_stages() -> TestResult {
    let mut requests = Requests::default();
    let vertex = compile(VERTEX, &compile_options(c"main.vert", RGLSL_STAGE_VERTEX)?)?.done()?;
    let fragment = compile(
        FRAGMENT,
        &compile_options(c"main.frag", RGLSL_STAGE_FRAGMENT)?,
    )?
    .done()?;
    let lighting = compile(LIGHTING, &lighting_options(&mut requests)?)?.done()?;
    assert_eq!(
        requests.seen,
        [
            (
                "light.h".to_owned(),
                false,
                Some("shaders/lighting.glsl".to_owned())
            ),
            (
                "direction.h".to_owned(),
                false,
                Some("lib/light.h".to_owned())
            ),
        ]
    );
    let program = link(
        &[vertex.as_const(), fragment.as_const(), lighting.as_const()],
        ptr::null(),
    )?
    .done()?;
    let stages = stages(&program)?;
    assert_eq!(stages.len(), 2);
    for (stage, entry_point, words) in &stages {
        assert!([RGLSL_STAGE_VERTEX, RGLSL_STAGE_FRAGMENT].contains(stage));
        assert_eq!(entry_point, "main");
        assert_eq!(words.first(), Some(&0x0723_0203));
    }
    let warnings = unsafe { rglsl_c::rglsl_program_warnings(program.as_const()) };
    assert!(!warnings.is_null());
    assert_eq!(unsafe { rglsl_c::rglsl_diagnostics_count(warnings) }, 0);
    assert_eq!(diagnostics_text(warnings)?, "");
    Ok(())
}

#[test]
fn handles_are_reusable() -> TestResult {
    let options = compile_options(c"main.frag", RGLSL_STAGE_FRAGMENT)?;
    let first = compile(FRAGMENT, &options)?.done()?;
    let second = compile(FRAGMENT, &options)?.done()?;
    let mut requests = Requests::default();
    let lighting = compile(LIGHTING, &lighting_options(&mut requests)?)?.done()?;
    let mut program_options = ptr::null_mut();
    assert_eq!(
        unsafe { rglsl_c::rglsl_program_options_create(&raw mut program_options) },
        RGLSL_RESULT_OK
    );
    let program_options = Owned::new(program_options, rglsl_c::rglsl_program_options_destroy)?;
    let calls = [
        unsafe {
            rglsl_c::rglsl_program_options_set_auto_map_bindings(program_options.pointer, true)
        },
        unsafe {
            rglsl_c::rglsl_program_options_set_auto_map_locations(program_options.pointer, true)
        },
        unsafe {
            rglsl_c::rglsl_program_options_set_debug_info(
                program_options.pointer,
                RGLSL_DEBUG_INFO_LINES,
            )
        },
        unsafe { rglsl_c::rglsl_program_options_set_spirv_version(program_options.pointer, 1, 3) },
    ];
    assert_eq!(calls, [RGLSL_RESULT_OK; 4]);
    for object in [&first, &second, &first] {
        let program = link(
            &[object.as_const(), lighting.as_const()],
            program_options.as_const(),
        )?
        .done()?;
        let stages = stages(&program)?;
        assert_eq!(stages.len(), 1);
        assert_eq!(
            stages.first().and_then(|(_, _, words)| words.get(1)),
            Some(&0x0001_0300)
        );
    }
    Ok(())
}

#[test]
fn objects_round_trip() -> TestResult {
    let options = compile_options(c"main.frag", RGLSL_STAGE_FRAGMENT)?;
    let fragment = compile(FRAGMENT, &options)?.done()?;
    let mut requests = Requests::default();
    let lighting = compile(LIGHTING, &lighting_options(&mut requests)?)?.done()?;
    let decoded = [
        read_object(&write_object(&fragment)?)?.done()?,
        read_object(&write_object(&lighting)?)?.done()?,
    ];
    let program = link(&decoded.each_ref().map(Owned::as_const), ptr::null())?.done()?;
    assert_eq!(stages(&program)?.len(), 1);
    Ok(())
}

#[test]
fn compile_errors_have_locations() -> TestResult {
    let options = compile_options(c"bad.comp", RGLSL_STAGE_COMPUTE)?;
    let Outcome::Failed(code, Some(diagnostics)) = compile(BROKEN, &options)? else {
        panic!("the shader compiled");
    };
    assert_eq!(code, RGLSL_RESULT_COMPILE_FAILED);
    assert!(unsafe { rglsl_c::rglsl_diagnostics_count(diagnostics.as_const()) } >= 1);
    let mut severity = RGLSL_SEVERITY_WARNING;
    let mut file = ptr::null();
    let mut line = 0;
    let mut column = 0;
    let code = unsafe {
        rglsl_c::rglsl_diagnostics_location(
            diagnostics.as_const(),
            0,
            &raw mut severity,
            &raw mut file,
            &raw mut line,
            &raw mut column,
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    assert_eq!(severity, RGLSL_SEVERITY_ERROR);
    assert_eq!(string(file)?, "bad.comp");
    assert_eq!(line, 3);
    assert!(column > 0);
    let message = string(unsafe { rglsl_c::rglsl_diagnostics_message(diagnostics.as_const(), 0) })?;
    assert!(message.starts_with("ERROR: bad.comp:3:"));
    assert!(diagnostics_text(diagnostics.as_const())?.starts_with(&message));
    let code = unsafe {
        rglsl_c::rglsl_diagnostics_location(
            diagnostics.as_const(),
            0,
            ptr::null_mut(),
            ptr::null_mut(),
            ptr::null_mut(),
            ptr::null_mut(),
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    Ok(())
}

#[test]
fn link_errors_name_the_stage() -> TestResult {
    let fragment = compile(
        FRAGMENT,
        &compile_options(c"main.frag", RGLSL_STAGE_FRAGMENT)?,
    )?
    .done()?;
    let (code, text) = link(&[fragment.as_const()], ptr::null())?.failed()?;
    assert_eq!(code, RGLSL_RESULT_LINK_FAILED);
    assert_eq!(
        text,
        "ERROR: Linking fragment stage: No function definition (body) found: shade(vec3)"
    );
    let (code, _) = link(&[], ptr::null())?.failed()?;
    assert_eq!(code, RGLSL_RESULT_LINK_FAILED);
    Ok(())
}

#[test]
fn unresolved_includes_fail_to_compile() -> TestResult {
    let options = compile_options(c"main.comp", RGLSL_STAGE_COMPUTE)?;
    let mut requests = Requests::default();
    let code = unsafe {
        rglsl_c::rglsl_compile_options_set_includer(
            options.pointer,
            Some(include_lighting),
            ptr::from_mut(&mut requests).cast(),
        )
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    let source = c"#version 450\n#include \"unknown.h\"\nvoid main() {}\n";
    let (code, text) = compile(source, &options)?.failed()?;
    assert_eq!(code, RGLSL_RESULT_COMPILE_FAILED);
    assert!(text.contains("main.comp:2"));
    assert_eq!(requests.seen.len(), 1);
    let code = unsafe {
        rglsl_c::rglsl_compile_options_set_includer(options.pointer, None, ptr::null_mut())
    };
    assert_eq!(code, RGLSL_RESULT_OK);
    let (code, _) = compile(source, &options)?.failed()?;
    assert_eq!(code, RGLSL_RESULT_COMPILE_FAILED);
    assert_eq!(requests.seen.len(), 1);
    Ok(())
}

#[test]
fn invalid_objects_are_rejected() -> TestResult {
    for bytes in [&b"\xff\xfe"[..], b"not an object", b""] {
        let (code, text) = read_object(bytes)?.failed()?;
        assert_eq!(code, RGLSL_RESULT_INVALID_OBJECT);
        assert!(text.starts_with("ERROR: "));
    }
    let mut object = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_object_read(ptr::null(), 4, &raw mut object, &raw mut diagnostics)
    };
    let (code, text) =
        Outcome::new(code, object, rglsl_c::rglsl_object_destroy, diagnostics)?.failed()?;
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert_eq!(text, "ERROR: invalid argument: data is NULL");
    let code = unsafe {
        rglsl_c::rglsl_object_read(ptr::null(), 0, &raw mut object, &raw mut diagnostics)
    };
    let (code, _) =
        Outcome::new(code, object, rglsl_c::rglsl_object_destroy, diagnostics)?.failed()?;
    assert_eq!(code, RGLSL_RESULT_INVALID_OBJECT);
    Ok(())
}

#[test]
fn invalid_arguments_are_rejected() -> TestResult {
    let mut options = ptr::null_mut();
    let unknown_stage = Stage::from_raw(99);
    let codes = [
        unsafe {
            rglsl_c::rglsl_compile_options_create(c"x".as_ptr(), unknown_stage, &raw mut options)
        },
        unsafe {
            rglsl_c::rglsl_compile_options_create(ptr::null(), RGLSL_STAGE_VERTEX, &raw mut options)
        },
        unsafe {
            rglsl_c::rglsl_compile_options_create(
                c"x".as_ptr(),
                RGLSL_STAGE_VERTEX,
                ptr::null_mut(),
            )
        },
        unsafe {
            rglsl_c::rglsl_compile_options_create_library(c"\xff".as_ptr(), &raw mut options)
        },
        unsafe { rglsl_c::rglsl_program_options_create(ptr::null_mut()) },
    ];
    assert_eq!(codes, [RGLSL_RESULT_INVALID_ARGUMENT; 5]);
    assert!(options.is_null());

    let options = compile_options(c"main.comp", RGLSL_STAGE_COMPUTE)?;
    let codes = [
        unsafe { rglsl_c::rglsl_compile_options_set_spirv_version(options.pointer, 2, 0) },
        unsafe { rglsl_c::rglsl_compile_options_set_spirv_version(options.pointer, 1, 7) },
        unsafe { rglsl_c::rglsl_compile_options_set_spirv_version(options.pointer, 257, 0) },
        unsafe {
            rglsl_c::rglsl_compile_options_add_define(options.pointer, c"A".as_ptr(), ptr::null())
        },
        unsafe {
            rglsl_c::rglsl_compile_options_add_define(options.pointer, ptr::null(), c"1".as_ptr())
        },
        unsafe {
            rglsl_c::rglsl_compile_options_add_include(
                options.pointer,
                c"a.h".as_ptr(),
                ptr::null(),
            )
        },
        unsafe { rglsl_c::rglsl_compile_options_add_include_dir(options.pointer, ptr::null()) },
        unsafe {
            rglsl_c::rglsl_compile_options_add_define(ptr::null_mut(), c"A".as_ptr(), c"1".as_ptr())
        },
        unsafe {
            rglsl_c::rglsl_compile_options_set_debug_info(ptr::null_mut(), RGLSL_DEBUG_INFO_LINES)
        },
        unsafe { rglsl_c::rglsl_compile_options_set_auto_map_bindings(ptr::null_mut(), true) },
        unsafe { rglsl_c::rglsl_compile_options_set_auto_map_locations(ptr::null_mut(), true) },
        unsafe {
            rglsl_c::rglsl_compile_options_set_includer(ptr::null_mut(), None, ptr::null_mut())
        },
        unsafe { rglsl_c::rglsl_program_options_set_spirv_version(ptr::null_mut(), 1, 0) },
        unsafe {
            rglsl_c::rglsl_program_options_set_debug_info(ptr::null_mut(), RGLSL_DEBUG_INFO_LINES)
        },
        unsafe { rglsl_c::rglsl_include_result_set(ptr::null_mut(), ptr::null(), c"".as_ptr()) },
    ];
    assert_eq!(codes, [RGLSL_RESULT_INVALID_ARGUMENT; 15]);
    let codes = [
        unsafe { rglsl_c::rglsl_compile_options_set_spirv_version(options.pointer, 1, 6) },
        unsafe {
            rglsl_c::rglsl_compile_options_set_debug_info(options.pointer, RGLSL_DEBUG_INFO_LINES)
        },
        unsafe { rglsl_c::rglsl_compile_options_set_auto_map_bindings(options.pointer, true) },
        unsafe { rglsl_c::rglsl_compile_options_set_auto_map_locations(options.pointer, true) },
    ];
    assert_eq!(codes, [RGLSL_RESULT_OK; 4]);

    let (code, text) = compile(c"\xff", &options)?.failed()?;
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert!(text.starts_with("ERROR: invalid argument: source is not UTF-8"));

    let mut object = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_compile(
            ptr::null(),
            options.as_const(),
            &raw mut object,
            &raw mut diagnostics,
        )
    };
    let (code, text) =
        Outcome::new(code, object, rglsl_c::rglsl_object_destroy, diagnostics)?.failed()?;
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert_eq!(text, "ERROR: invalid argument: source is NULL");
    let code = unsafe {
        rglsl_c::rglsl_compile(
            VERTEX.as_ptr(),
            ptr::null(),
            &raw mut object,
            ptr::null_mut(),
        )
    };
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert!(object.is_null());
    let code = unsafe {
        rglsl_c::rglsl_compile(
            VERTEX.as_ptr(),
            options.as_const(),
            ptr::null_mut(),
            &raw mut diagnostics,
        )
    };
    let diagnostics = Owned::new(diagnostics, rglsl_c::rglsl_diagnostics_destroy)?;
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert_eq!(
        diagnostics_text(diagnostics.as_const())?,
        "ERROR: invalid argument: the output handle pointer is NULL"
    );
    Ok(())
}

#[test]
fn null_handles_are_harmless() -> TestResult {
    let mut program = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_link(
            ptr::null(),
            2,
            ptr::null(),
            &raw mut program,
            &raw mut diagnostics,
        )
    };
    let (code, text) =
        Outcome::new(code, program, rglsl_c::rglsl_program_destroy, diagnostics)?.failed()?;
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert_eq!(text, "ERROR: invalid argument: objects is NULL");

    let fragment = compile(
        FRAGMENT,
        &compile_options(c"main.frag", RGLSL_STAGE_FRAGMENT)?,
    )?
    .done()?;
    let (code, text) = link(&[fragment.as_const(), ptr::null()], ptr::null())?.failed()?;
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert_eq!(text, "ERROR: invalid argument: objects[1] is NULL");

    let mut blob = ptr::null_mut();
    let code = unsafe { rglsl_c::rglsl_object_write(ptr::null(), &raw mut blob, ptr::null_mut()) };
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert!(blob.is_null());

    unsafe {
        assert!(rglsl_c::rglsl_blob_data(ptr::null()).is_null());
        assert_eq!(rglsl_c::rglsl_blob_size(ptr::null()), 0);
        assert_eq!(rglsl_c::rglsl_program_stage_count(ptr::null()), 0);
        assert!(rglsl_c::rglsl_program_entry_point(ptr::null(), 0).is_null());
        assert!(rglsl_c::rglsl_program_warnings(ptr::null()).is_null());
        assert_eq!(rglsl_c::rglsl_diagnostics_count(ptr::null()), 0);
        assert!(rglsl_c::rglsl_diagnostics_text(ptr::null()).is_null());
        assert!(rglsl_c::rglsl_diagnostics_message(ptr::null(), 0).is_null());
        let mut stage = RGLSL_STAGE_VERTEX;
        assert_eq!(
            rglsl_c::rglsl_program_stage(ptr::null(), 0, &raw mut stage),
            RGLSL_RESULT_INVALID_ARGUMENT
        );
        let mut words = ptr::null();
        let mut count = 0;
        assert_eq!(
            rglsl_c::rglsl_program_spirv(ptr::null(), 0, &raw mut words, &raw mut count),
            RGLSL_RESULT_INVALID_ARGUMENT
        );
        assert_eq!(
            rglsl_c::rglsl_diagnostics_location(
                ptr::null(),
                0,
                ptr::null_mut(),
                ptr::null_mut(),
                ptr::null_mut(),
                ptr::null_mut()
            ),
            RGLSL_RESULT_INVALID_ARGUMENT
        );
        rglsl_c::rglsl_compile_options_destroy(ptr::null_mut());
        rglsl_c::rglsl_program_options_destroy(ptr::null_mut());
        rglsl_c::rglsl_object_destroy(ptr::null_mut());
        rglsl_c::rglsl_blob_destroy(ptr::null_mut());
        rglsl_c::rglsl_program_destroy(ptr::null_mut());
        rglsl_c::rglsl_diagnostics_destroy(ptr::null_mut());
    }
    Ok(())
}

#[test]
fn indices_out_of_range_are_rejected() -> TestResult {
    let mut requests = Requests::default();
    let fragment = compile(
        FRAGMENT,
        &compile_options(c"main.frag", RGLSL_STAGE_FRAGMENT)?,
    )?
    .done()?;
    let lighting = compile(LIGHTING, &lighting_options(&mut requests)?)?.done()?;
    let program = link(&[fragment.as_const(), lighting.as_const()], ptr::null())?.done()?;
    let warnings = unsafe { rglsl_c::rglsl_program_warnings(program.as_const()) };
    unsafe {
        let mut stage = RGLSL_STAGE_VERTEX;
        assert_eq!(
            rglsl_c::rglsl_program_stage(program.as_const(), 1, &raw mut stage),
            RGLSL_RESULT_INVALID_ARGUMENT
        );
        assert_eq!(stage, RGLSL_STAGE_VERTEX);
        assert_eq!(
            rglsl_c::rglsl_program_stage(program.as_const(), 0, ptr::null_mut()),
            RGLSL_RESULT_INVALID_ARGUMENT
        );
        assert!(rglsl_c::rglsl_program_entry_point(program.as_const(), 1).is_null());
        let mut words = ptr::null();
        let mut count = 3;
        assert_eq!(
            rglsl_c::rglsl_program_spirv(
                program.as_const(),
                usize::MAX,
                &raw mut words,
                &raw mut count
            ),
            RGLSL_RESULT_INVALID_ARGUMENT
        );
        assert!(words.is_null());
        assert_eq!(count, 0);
        assert_eq!(
            rglsl_c::rglsl_program_spirv(program.as_const(), 0, ptr::null_mut(), &raw mut count),
            RGLSL_RESULT_INVALID_ARGUMENT
        );
        assert!(rglsl_c::rglsl_diagnostics_message(warnings, 0).is_null());
    }
    Ok(())
}

fn compiler_compile(
    compiler: *const Compiler,
    source: &CStr,
    options: &Owned<CompileOptions>,
) -> TestResult<Outcome<Object>> {
    let mut object = ptr::null_mut();
    let mut diagnostics = ptr::null_mut();
    let code = unsafe {
        rglsl_c::rglsl_compiler_compile(
            compiler,
            source.as_ptr(),
            options.as_const(),
            &raw mut object,
            &raw mut diagnostics,
        )
    };
    Outcome::new(code, object, rglsl_c::rglsl_object_destroy, diagnostics)
}

#[test]
fn a_compiler_compiles_like_rglsl_compile() -> TestResult {
    let mut compiler = ptr::null_mut();
    assert_eq!(
        unsafe { rglsl_c::rglsl_compiler_create(&raw mut compiler) },
        RGLSL_RESULT_OK
    );
    let compiler = Owned::new(compiler, rglsl_c::rglsl_compiler_destroy)?;
    for _ in 0..2 {
        for (source, name, stage) in [
            (VERTEX, c"main.vert", RGLSL_STAGE_VERTEX),
            (FRAGMENT, c"main.frag", RGLSL_STAGE_FRAGMENT),
        ] {
            let options = compile_options(name, stage)?;
            let shared = compiler_compile(compiler.as_const(), source, &options)?.done()?;
            let alone = compile(source, &options)?.done()?;
            assert_eq!(write_object(&shared)?, write_object(&alone)?);
        }
    }
    let options = compile_options(c"broken.frag", RGLSL_STAGE_FRAGMENT)?;
    let shared = compiler_compile(compiler.as_const(), BROKEN, &options)?.failed()?;
    assert_eq!(shared, compile(BROKEN, &options)?.failed()?);
    let (code, text) = compiler_compile(ptr::null(), VERTEX, &options)?.failed()?;
    assert_eq!(code, RGLSL_RESULT_INVALID_ARGUMENT);
    assert_eq!(text, "ERROR: invalid argument: compiler is NULL");
    unsafe { rglsl_c::rglsl_compiler_destroy(ptr::null_mut()) };
    assert_eq!(
        unsafe { rglsl_c::rglsl_compiler_create(ptr::null_mut()) },
        RGLSL_RESULT_INVALID_ARGUMENT
    );
    Ok(())
}

#[test]
fn handles_work_on_several_threads() -> TestResult {
    let threads: Vec<_> = (0..4)
        .map(|_| {
            std::thread::spawn(|| -> Result<usize, String> {
                let run = || -> TestResult<usize> {
                    let mut requests = Requests::default();
                    let fragment = compile(
                        FRAGMENT,
                        &compile_options(c"main.frag", RGLSL_STAGE_FRAGMENT)?,
                    )?
                    .done()?;
                    let lighting = compile(LIGHTING, &lighting_options(&mut requests)?)?.done()?;
                    let program =
                        link(&[fragment.as_const(), lighting.as_const()], ptr::null())?.done()?;
                    Ok(stages(&program)?.len())
                };
                run().map_err(|error| error.to_string())
            })
        })
        .collect();
    for thread in threads {
        let stages = thread.join().map_err(|_| "a thread panicked")??;
        assert_eq!(stages, 1);
    }
    Ok(())
}
