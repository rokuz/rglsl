mod build;
mod diagnostic;
mod include;
mod options;

use std::borrow::Borrow;
use std::sync::Arc;

use rglsl::ShaderStage;
use rglsl::back::spv;
use rglsl::object::ObjectModule;

use crate::cache::BuiltinCache;
use crate::{LinkError, Linked, file, group_by_stage, group_objects_by_stage, message};

pub use build::{Build, Compiled, Input, Preprocessed, Source, StageOutput, UnitReport};
pub use diagnostic::{
    Diagnostic, DiagnosticFormat, Diagnostics, Origin, Severity, glslang_stage_name,
};
pub use include::Resolve;
pub use options::{CompileOptions, DebugInfo, Macro, ProgramOptions, spirv_version_of_vulkan};

pub const STAGE_ORDER: [ShaderStage; 14] = [
    ShaderStage::Vertex,
    ShaderStage::TessControl,
    ShaderStage::TessEvaluation,
    ShaderStage::Geometry,
    ShaderStage::Fragment,
    ShaderStage::Compute,
    ShaderStage::RayGeneration,
    ShaderStage::Intersection,
    ShaderStage::AnyHit,
    ShaderStage::ClosestHit,
    ShaderStage::Miss,
    ShaderStage::Callable,
    ShaderStage::Task,
    ShaderStage::Mesh,
];

#[derive(Debug, Clone, Default)]
pub struct Compiler {
    builtins: Arc<BuiltinCache>,
}

impl Compiler {
    pub fn new() -> Self {
        Self::default()
    }

    pub fn compile(
        &self,
        source: &str,
        options: &CompileOptions,
    ) -> Result<ObjectModule, Diagnostics> {
        self.compile_with_includer(source, options, &mut |_| None)
    }

    pub fn compile_with_includer(
        &self,
        source: &str,
        options: &CompileOptions,
        resolve: &mut Resolve<'_>,
    ) -> Result<ObjectModule, Diagnostics> {
        self.compile_unit(source, options, resolve).result
    }

    pub fn compile_and_link(
        &self,
        sources: &[(&str, CompileOptions)],
        options: &ProgramOptions,
    ) -> Result<Program, Diagnostics> {
        let mut objects = Vec::with_capacity(sources.len());
        let mut errors = Diagnostics::default();
        for &(source, ref compile_options) in sources {
            match self.compile(source, compile_options) {
                Ok(object) => objects.push(object),
                Err(diagnostics) => errors.list.extend(diagnostics.list),
            }
        }
        if !errors.list.is_empty() {
            return Err(errors);
        }
        spirv_program(group_objects_by_stage(objects), options)
    }
}

pub fn compile(source: &str, options: &CompileOptions) -> Result<ObjectModule, Diagnostics> {
    Compiler::new().compile(source, options)
}

pub fn compile_with_includer(
    source: &str,
    options: &CompileOptions,
    resolve: &mut Resolve<'_>,
) -> Result<ObjectModule, Diagnostics> {
    Compiler::new().compile_with_includer(source, options, resolve)
}

pub fn compile_and_link(
    sources: &[(&str, CompileOptions)],
    options: &ProgramOptions,
) -> Result<Program, Diagnostics> {
    Compiler::new().compile_and_link(sources, options)
}

pub fn write_object(object: &ObjectModule) -> Result<Vec<u8>, Diagnostics> {
    file::encode(object)
        .map(String::into_bytes)
        .map_err(|error| {
            let mut diagnostic = Diagnostic::error(error.to_string());
            diagnostic.file.clone_from(&object.name);
            diagnostic.into()
        })
}

pub fn read_object(bytes: &[u8]) -> Result<ObjectModule, Diagnostics> {
    let text = std::str::from_utf8(bytes)
        .map_err(|error| Diagnostic::error(format!("not an rglsl object module: {error}")))?;
    file::decode(text).map_err(|error| Diagnostic::error(error.to_string()).into())
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StageBinary {
    pub stage: ShaderStage,
    pub entry_point: String,
    pub words: Vec<u32>,
}

impl StageBinary {
    pub fn bytes(&self) -> Vec<u8> {
        self.words
            .iter()
            .flat_map(|word| word.to_le_bytes())
            .collect()
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Program {
    pub stages: Vec<StageBinary>,
    pub warnings: Diagnostics,
}

impl Program {
    pub fn stage(&self, stage: ShaderStage) -> Option<&StageBinary> {
        self.stages.iter().find(|binary| binary.stage == stage)
    }
}

pub fn link_spirv<O: Borrow<ObjectModule>>(
    objects: &[O],
    options: &ProgramOptions,
) -> Result<Program, Diagnostics> {
    spirv_program(group_by_stage(objects), options)
}

fn spirv_program(
    stages: Vec<Vec<ObjectModule>>,
    options: &ProgramOptions,
) -> Result<Program, Diagnostics> {
    let linked = link_stages(stages, options)?;
    let mut program = Program {
        stages: Vec::with_capacity(linked.len()),
        warnings: link_warnings(&linked, options),
    };
    let mut errors = Vec::new();
    for stage in linked {
        match stage_binary(&stage, options) {
            Ok(binary) => program.stages.push(binary),
            Err(error) => errors.push(error),
        }
    }
    if errors.is_empty() {
        Ok(program)
    } else {
        Err(Diagnostics { list: errors })
    }
}

fn link_stages(
    stages: Vec<Vec<ObjectModule>>,
    options: &ProgramOptions,
) -> Result<Vec<Linked>, Diagnostics> {
    let mut linked =
        crate::link_program_staged(stages, &options.link_options()).map_err(|errors| {
            Diagnostics {
                list: errors
                    .iter()
                    .map(|&(stage, ref error)| link_diagnostic(stage, error))
                    .collect(),
            }
        })?;
    linked.sort_by_key(|stage| {
        STAGE_ORDER
            .iter()
            .position(|&candidate| candidate == stage.stage)
    });
    Ok(linked)
}

fn link_warnings(linked: &[Linked], options: &ProgramOptions) -> Diagnostics {
    if options.suppress_warnings {
        return Diagnostics::default();
    }
    Diagnostics {
        list: linked
            .iter()
            .flat_map(|stage| {
                let name = glslang_stage_name(stage.stage);
                stage.warnings.iter().map(move |warning| {
                    Diagnostic::linking(
                        Severity::Warning,
                        Origin::Stages(format!("{name} and {name}")),
                        warning.clone(),
                    )
                })
            })
            .collect(),
    }
}

fn stage_binary(stage: &Linked, options: &ProgramOptions) -> Result<StageBinary, Diagnostic> {
    let Some(entry_point) = stage.module.entry_points.first() else {
        return Err(link_diagnostic(
            Some(stage.stage),
            &LinkError::MissingEntryPoint,
        ));
    };
    let words = write_spirv(&Emission::linked(stage, None), options).map_err(|error| {
        Diagnostic::linking(
            Severity::Error,
            Origin::Stage(stage.stage),
            format!("cannot generate SPIR-V: {}", message(&error)),
        )
    })?;
    Ok(StageBinary {
        stage: stage.stage,
        entry_point: entry_point.name.clone(),
        words,
    })
}

pub(crate) fn link_diagnostic(stage: Option<ShaderStage>, error: &LinkError) -> Diagnostic {
    match (stage, error) {
        (
            _,
            &LinkError::CrossStage {
                ref stages,
                ref name,
                what,
            },
        ) => Diagnostic::linking(
            Severity::Error,
            Origin::Stages(stages.to_lowercase()),
            format!("{what} of `{name}` must match between stages"),
        ),
        (_, LinkError::UnmatchedInput { stages, name, at }) => Diagnostic {
            file: at.as_ref().and_then(|at| at.file.clone()),
            line: at.as_ref().map(|at| at.line),
            ..Diagnostic::linking(
                Severity::Error,
                Origin::Stages(stages.clone()),
                format!(
                    "Preceding stage has no matching declaration for statically used input: {name}"
                ),
            )
        },
        (Some(stage), _) => {
            Diagnostic::linking(Severity::Error, Origin::Stage(stage), error.to_string())
        }
        (None, _) => Diagnostic::linking(Severity::Error, Origin::Program, error.to_string()),
    }
}

pub(crate) struct Emission<'m> {
    pub(crate) module: &'m rglsl::Module,
    pub(crate) info: &'m rglsl::valid::ModuleInfo,
    pub(crate) processes: &'m [String],
    pub(crate) source_file: Option<(&'m str, u32)>,
}

impl<'m> Emission<'m> {
    pub(crate) fn linked(linked: &'m Linked, name: Option<&'m str>) -> Self {
        Self {
            module: &linked.module,
            info: &linked.info,
            processes: &linked.processes,
            source_file: name
                .or(linked.source_name.as_deref())
                .map(|name| (name, linked.glsl_version)),
        }
    }
}

pub(crate) fn write_spirv(
    emission: &Emission<'_>,
    options: &ProgramOptions,
) -> Result<Vec<u32>, spv::Error> {
    let level = match options.debug_info {
        DebugInfo::FileName => Some((spv::DebugLevel::FileName, false)),
        DebugInfo::Lines => Some((spv::DebugLevel::Lines, true)),
        DebugInfo::NonSemantic => Some((spv::DebugLevel::NonSemantic, false)),
        DebugInfo::NonSemanticWithSource => Some((spv::DebugLevel::NonSemantic, true)),
        DebugInfo::Names | DebugInfo::Stripped => None,
    };
    let debug_info = level.map(|(level, source_text)| spv::DebugInfo {
        level,
        source_text,
        processes: emission.processes,
        source_file: emission.source_file,
        entry_point: options
            .command_line
            .as_deref()
            .map(|arguments| spv::DebugEntryPoint {
                signature: "rglsl",
                arguments,
                directory: options.working_directory.as_deref(),
            }),
    });
    let mut flags =
        spv::WriterFlags::LABEL_VARYINGS | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE;
    if options.export_functions {
        flags |= spv::WriterFlags::EXPORT_FUNCTIONS;
    }
    if options.debug_info != DebugInfo::Stripped {
        flags |= spv::WriterFlags::DEBUG;
    }
    let spv_options = spv::Options {
        lang_version: options.spirv_version,
        debug_info,
        flags,
        ..spv::Options::default()
    };
    spv::write_vec(emission.module, emission.info, &spv_options, None)
}

pub fn depfile(targets: &[String], dependencies: &[String]) -> String {
    let mut text = String::new();
    for target in targets {
        text.push_str(&escape_dependency(target));
        text.push(':');
        for dependency in dependencies {
            text.push(' ');
            text.push_str(&escape_dependency(dependency));
        }
        text.push('\n');
    }
    text
}

fn escape_dependency(text: &str) -> String {
    let mut escaped = String::with_capacity(text.len());
    for character in text.chars() {
        match character {
            ' ' | ':' | '#' | '[' | ']' | '\\' => escaped.push('\\'),
            '$' => escaped.push('$'),
            _ => {}
        }
        escaped.push(character);
    }
    escaped
}
