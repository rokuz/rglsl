use std::ffi::{CStr, c_char};
use std::ptr;

use rglsl_c::{
    CompileOptions, Diagnostics, Object, Program, ProgramOptions, RGLSL_RESULT_OK, ResultCode,
    Stage,
};

pub type TestResult<T = ()> = Result<T, Box<dyn std::error::Error>>;

pub struct Owned<T> {
    pub pointer: *mut T,
    destroy: unsafe extern "C" fn(*mut T),
}

impl<T> Owned<T> {
    pub fn new(pointer: *mut T, destroy: unsafe extern "C" fn(*mut T)) -> TestResult<Self> {
        if pointer.is_null() {
            return Err("rglsl returned a NULL handle".into());
        }
        Ok(Self { pointer, destroy })
    }

    pub fn as_const(&self) -> *const T {
        self.pointer.cast_const()
    }
}

impl<T> Drop for Owned<T> {
    fn drop(&mut self) {
        unsafe { (self.destroy)(self.pointer) };
    }
}

pub fn string(pointer: *const c_char) -> TestResult<String> {
    if pointer.is_null() {
        return Err("rglsl returned a NULL string".into());
    }
    Ok(unsafe { CStr::from_ptr(pointer) }.to_str()?.to_owned())
}

pub fn diagnostics_text(diagnostics: *const Diagnostics) -> TestResult<String> {
    string(unsafe { rglsl_c::rglsl_diagnostics_text(diagnostics) })
}

pub fn compile_options(name: &CStr, stage: Stage) -> TestResult<Owned<CompileOptions>> {
    let mut options = ptr::null_mut();
    let code =
        unsafe { rglsl_c::rglsl_compile_options_create(name.as_ptr(), stage, &raw mut options) };
    assert_eq!(code, RGLSL_RESULT_OK);
    Owned::new(options, rglsl_c::rglsl_compile_options_destroy)
}

pub enum Outcome<T> {
    Done(Owned<T>),
    Failed(ResultCode, Option<Owned<Diagnostics>>),
}

impl<T> Outcome<T> {
    pub fn new(
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

    pub fn done(self) -> TestResult<Owned<T>> {
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

    pub fn failed(self) -> TestResult<(ResultCode, String)> {
        match self {
            Self::Done(_) => Err("rglsl succeeded".into()),
            Self::Failed(code, Some(diagnostics)) => {
                Ok((code, diagnostics_text(diagnostics.as_const())?))
            }
            Self::Failed(code, None) => Ok((code, String::new())),
        }
    }
}

pub fn compile(source: &CStr, options: &Owned<CompileOptions>) -> TestResult<Outcome<Object>> {
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

pub fn link(
    objects: &[*const Object],
    options: *const ProgramOptions,
) -> TestResult<Outcome<Program>> {
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
