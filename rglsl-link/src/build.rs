use std::fmt;

use rglsl::front::glsl;
use rglsl::object::ObjectModule;
use rglsl::valid::{ModuleInfo, ValidationError, ValidationFlags, Validator};
use rglsl::{Module, WithSpan};
use rglsl_pp::{FileId, Includer};

use crate::{LinkError, LinkErrors, Linked, finish_module, message, validate_object};

#[derive(Debug)]
pub enum CompileError {
    Frontend(glsl::ParseErrors),
    Object(LinkErrors),
    Invalid(Box<InvalidModule>),
    Link(LinkErrors),
}

#[derive(Debug)]
pub struct CompiledObject {
    pub object: ObjectModule,
    pub info: ModuleInfo,
}

#[derive(Debug)]
pub struct InvalidModule {
    pub module: Module,
    pub error: WithSpan<ValidationError>,
}

impl fmt::Display for CompileError {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        match *self {
            Self::Frontend(ref errors) => write!(formatter, "{errors}"),
            Self::Object(ref errors) | Self::Link(ref errors) => write!(formatter, "{errors}"),
            Self::Invalid(ref invalid) => {
                write!(formatter, "{}", message(invalid.error.as_inner()))
            }
        }
    }
}

impl std::error::Error for CompileError {}

pub fn compile_object(
    options: &glsl::Options,
    source: &str,
    root: FileId,
    includer: &mut dyn Includer,
) -> Result<CompiledObject, CompileError> {
    let object = glsl::Frontend::default()
        .compile_with_includer(options, source, root, includer)
        .map_err(CompileError::Frontend)?;
    let info = validate_object(&object).map_err(CompileError::Object)?;
    Ok(CompiledObject { object, info })
}

pub fn compile_program(
    options: &glsl::Options,
    source: &str,
    root: FileId,
    includer: &mut dyn Includer,
) -> Result<Linked, CompileError> {
    let object = glsl::Frontend::default()
        .compile_program(options, source, root, includer)
        .map_err(CompileError::Frontend)?;
    let info = match Validator::new(ValidationFlags::all()).validate(&object.unit.module) {
        Ok(info) => info,
        Err(error) => {
            return Err(CompileError::Invalid(Box::new(InvalidModule {
                module: object.unit.module,
                error,
            })));
        }
    };
    finish_program(object, info).map_err(CompileError::Link)
}

pub fn finish_program(object: ObjectModule, info: ModuleInfo) -> Result<Linked, LinkErrors> {
    let stage = object
        .stage()
        .ok_or_else(|| LinkError::Internal(String::from("a program without a stage")))?;
    let mut module = object.unit.module;
    let info = finish_module(&mut module, Some(info))?;
    Ok(Linked {
        stage,
        module,
        info,
        warnings: Vec::new(),
    })
}
