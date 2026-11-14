use std::borrow::Borrow;
use std::collections::BTreeMap;
use std::fmt;
use std::sync::Arc;

use rglsl::back::spv;
use rglsl::front::glsl;
use rglsl::object::ObjectModule;
use rglsl::{FastHashMap, ShaderStage};
use rglsl_pp::{
    FileId, IncludeError, IncludeKind, IncludeRequest, IncludedFile, Includer, MemoryIncluder,
    ResolvedInclude,
};

use crate::cache::BuiltinCache;
use crate::{LinkError, Options, file, link_objects_staged, message, validate_object};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Severity {
    Error,
    Warning,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Diagnostic {
    pub severity: Severity,
    pub file: Option<String>,
    pub line: Option<u32>,
    pub column: Option<u32>,
    pub stage: Option<ShaderStage>,
    pub message: String,
}

impl Diagnostic {
    fn error(file: Option<&str>, message: impl Into<String>) -> Self {
        Self {
            severity: Severity::Error,
            file: file.map(str::to_owned),
            line: None,
            column: None,
            stage: None,
            message: message.into(),
        }
    }

    fn link(severity: Severity, stage: Option<ShaderStage>, error: impl fmt::Display) -> Self {
        Self {
            severity,
            file: None,
            line: None,
            column: None,
            stage,
            message: error.to_string(),
        }
    }
}

impl fmt::Display for Diagnostic {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let severity = match self.severity {
            Severity::Error => "ERROR",
            Severity::Warning => "WARNING",
        };
        write!(formatter, "{severity}: ")?;
        if let Some(ref file) = self.file {
            write!(formatter, "{file}")?;
            if let Some(line) = self.line {
                write!(formatter, ":{line}")?;
            }
            if let Some(column) = self.column {
                write!(formatter, ":{column}")?;
            }
            write!(formatter, ": ")?;
        }
        if let Some(stage) = self.stage {
            write!(formatter, "Linking {} stage: ", stage.name())?;
        }
        write!(formatter, "{}", self.message)
    }
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Diagnostics {
    pub list: Vec<Diagnostic>,
}

impl Diagnostics {
    pub fn iter(&self) -> impl Iterator<Item = &Diagnostic> {
        self.list.iter()
    }
}

impl From<Diagnostic> for Diagnostics {
    fn from(diagnostic: Diagnostic) -> Self {
        Self {
            list: vec![diagnostic],
        }
    }
}

impl fmt::Display for Diagnostics {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        for (index, diagnostic) in self.list.iter().enumerate() {
            if index > 0 {
                writeln!(formatter)?;
            }
            write!(formatter, "{diagnostic}")?;
        }
        Ok(())
    }
}

impl std::error::Error for Diagnostics {}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CompileOptions {
    pub name: String,
    pub stage: Option<ShaderStage>,
    pub defines: Vec<(String, String)>,
    pub includes: Vec<(String, String)>,
    pub include_dirs: Vec<String>,
    pub preamble: Option<String>,
    pub hlsl_offsets: bool,
    pub auto_map_bindings: bool,
    pub auto_map_locations: bool,
    pub debug_info: bool,
    pub spirv_version: (u8, u8),
}

impl CompileOptions {
    pub fn new(name: impl Into<String>, stage: ShaderStage) -> Self {
        Self::with_stage(name.into(), Some(stage))
    }

    pub fn library(name: impl Into<String>) -> Self {
        Self::with_stage(name.into(), None)
    }

    fn with_stage(name: String, stage: Option<ShaderStage>) -> Self {
        Self {
            name,
            stage,
            defines: Vec::new(),
            includes: Vec::new(),
            include_dirs: Vec::new(),
            preamble: None,
            hlsl_offsets: false,
            auto_map_bindings: false,
            auto_map_locations: false,
            debug_info: false,
            spirv_version: (1, 0),
        }
    }

    #[must_use]
    pub fn define(mut self, name: impl Into<String>, value: impl Into<String>) -> Self {
        self.defines.push((name.into(), value.into()));
        self
    }

    #[must_use]
    pub fn include(mut self, name: impl Into<String>, source: impl Into<String>) -> Self {
        self.includes.push((name.into(), source.into()));
        self
    }

    fn frontend(&self, builtin_tables: Arc<BuiltinCache>) -> glsl::Options {
        let defines: FastHashMap<String, String> = self.defines.iter().cloned().collect();
        glsl::Options {
            defines,
            builtin_tables,
            library: self.stage.is_none(),
            auto_map_bindings: self.auto_map_bindings,
            auto_map_locations: self.auto_map_locations,
            preamble: self.preamble.clone(),
            hlsl_offsets: self.hlsl_offsets,
            debug_info: self.debug_info,
            spirv_version: Some(self.spirv_version),
            source_name: Some(self.name.clone()),
            ..glsl::Options::from(self.stage.unwrap_or(ShaderStage::Compute))
        }
    }
}

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
        resolve: &mut dyn FnMut(IncludeRequest<'_>) -> Option<ResolvedInclude>,
    ) -> Result<ObjectModule, Diagnostics> {
        let mut memory = MemoryIncluder::with_include_dirs(options.include_dirs.iter().cloned());
        for (name, text) in &options.includes {
            memory.add_file(name, text);
        }
        let root = memory.add_file(&options.name, source);
        let mut includer = ResolvingIncluder {
            memory,
            resolve,
            answers: BTreeMap::new(),
        };
        let frontend = options.frontend(Arc::clone(&self.builtins));
        let mut object = glsl::Frontend::default()
            .compile_with_includer(&frontend, source, root, &mut includer)
            .map_err(|errors| parse_diagnostics(&errors, source, &options.name))?;
        object.name = Some(options.name.clone());
        validate_object(&object).map_err(|errors| Diagnostics {
            list: errors
                .iter()
                .map(|error| Diagnostic::error(Some(&options.name), error.to_string()))
                .collect(),
        })?;
        Ok(object)
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
        link_spirv(&objects, options)
    }
}

pub fn compile(source: &str, options: &CompileOptions) -> Result<ObjectModule, Diagnostics> {
    Compiler::new().compile(source, options)
}

pub fn compile_with_includer(
    source: &str,
    options: &CompileOptions,
    resolve: &mut dyn FnMut(IncludeRequest<'_>) -> Option<ResolvedInclude>,
) -> Result<ObjectModule, Diagnostics> {
    Compiler::new().compile_with_includer(source, options, resolve)
}

struct ResolvingIncluder<'a> {
    memory: MemoryIncluder,
    resolve: &'a mut dyn FnMut(IncludeRequest<'_>) -> Option<ResolvedInclude>,
    answers: BTreeMap<(String, bool, Option<String>), Option<ResolvedInclude>>,
}

impl Includer for ResolvingIncluder<'_> {
    fn include(
        &mut self,
        requested: &str,
        kind: IncludeKind,
        from: FileId,
        depth: usize,
    ) -> Result<IncludedFile, IncludeError> {
        let Self {
            memory,
            resolve,
            answers,
        } = self;
        memory.include_or_resolve(requested, kind, from, depth, &mut |request| {
            let key = (
                request.requested.to_owned(),
                request.kind == IncludeKind::System,
                request.includer.map(str::to_owned),
            );
            answers
                .entry(key)
                .or_insert_with(|| resolve(request))
                .clone()
        })
    }
}

fn parse_diagnostics(errors: &glsl::ParseErrors, source: &str, name: &str) -> Diagnostics {
    let list = errors
        .errors
        .iter()
        .enumerate()
        .map(|(index, error)| {
            let mut diagnostic = Diagnostic::error(Some(name), error.kind.to_string());
            if let Some(included) = errors.include_location(index) {
                diagnostic.file = Some(included.file.clone());
                diagnostic.line = Some(included.line);
            } else if error.meta.is_defined() {
                let location = error.meta.location(source);
                diagnostic.line = Some(location.line_number);
                diagnostic.column = Some(location.line_position);
            }
            diagnostic
        })
        .collect();
    Diagnostics { list }
}

pub fn write_object(object: &ObjectModule) -> Result<Vec<u8>, Diagnostics> {
    file::encode(object)
        .map(String::into_bytes)
        .map_err(|error| Diagnostic::error(object.name.as_deref(), error.to_string()).into())
}

pub fn read_object(bytes: &[u8]) -> Result<ObjectModule, Diagnostics> {
    let text = std::str::from_utf8(bytes)
        .map_err(|error| Diagnostic::error(None, format!("not an rglsl object module: {error}")))?;
    file::decode(text).map_err(|error| Diagnostic::error(None, error.to_string()).into())
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ProgramOptions {
    pub auto_map_bindings: bool,
    pub auto_map_locations: bool,
    pub debug_info: bool,
    pub spirv_version: (u8, u8),
}

impl Default for ProgramOptions {
    fn default() -> Self {
        Self {
            auto_map_bindings: false,
            auto_map_locations: false,
            debug_info: false,
            spirv_version: (1, 0),
        }
    }
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
    let link_options = Options {
        auto_map_bindings: options.auto_map_bindings,
        auto_map_locations: options.auto_map_locations,
        ..Options::default()
    };
    let linked = link_objects_staged(objects, &link_options).map_err(|errors| Diagnostics {
        list: errors
            .iter()
            .map(|&(stage, ref error)| link_diagnostic(stage, error))
            .collect(),
    })?;
    let mut program = Program {
        stages: Vec::with_capacity(linked.len()),
        warnings: Diagnostics::default(),
    };
    let mut errors = Vec::new();
    for stage in linked {
        program.warnings.list.extend(
            stage
                .warnings
                .iter()
                .map(|warning| Diagnostic::link(Severity::Warning, Some(stage.stage), warning)),
        );
        let Some(entry_point) = stage.module.entry_points.first() else {
            errors.push(Diagnostic::link(
                Severity::Error,
                Some(stage.stage),
                LinkError::MissingEntryPoint,
            ));
            continue;
        };
        match write_spirv(&stage.module, &stage.info, options) {
            Ok(words) => program.stages.push(StageBinary {
                stage: stage.stage,
                entry_point: entry_point.name.clone(),
                words,
            }),
            Err(error) => errors.push(Diagnostic::link(
                Severity::Error,
                Some(stage.stage),
                format!("cannot generate SPIR-V: {}", message(&error)),
            )),
        }
    }
    if errors.is_empty() {
        Ok(program)
    } else {
        Err(Diagnostics { list: errors })
    }
}

fn link_diagnostic(stage: Option<ShaderStage>, error: &LinkError) -> Diagnostic {
    let stage = match *error {
        LinkError::CrossStage { .. } => None,
        _ => stage,
    };
    Diagnostic::link(Severity::Error, stage, error)
}

fn write_spirv(
    module: &rglsl::Module,
    info: &rglsl::valid::ModuleInfo,
    options: &ProgramOptions,
) -> Result<Vec<u32>, spv::Error> {
    let debug_info = options.debug_info.then_some(spv::DebugInfo {
        level: spv::DebugLevel::Lines,
        source_text: true,
        processes: &[],
        entry_point: None,
    });
    let spv_options = spv::Options {
        lang_version: options.spirv_version,
        debug_info,
        flags: spv::WriterFlags::LABEL_VARYINGS
            | spv::WriterFlags::SMALL_TYPE_CAPABILITIES_BY_USE
            | spv::WriterFlags::DEBUG,
        ..spv::Options::default()
    };
    spv::write_vec(module, info, &spv_options, None)
}

pub fn compile_and_link(
    sources: &[(&str, CompileOptions)],
    options: &ProgramOptions,
) -> Result<Program, Diagnostics> {
    Compiler::new().compile_and_link(sources, options)
}
