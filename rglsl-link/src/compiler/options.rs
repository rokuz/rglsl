use std::sync::Arc;

use rglsl::ShaderStage;
use rglsl::front::glsl;
use rglsl_opt::{DebugLevel, OptOptions};
use rglsl_sema::ResourceLimits;

use crate::cache::BuiltinCache;
use crate::reflect;

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Macro {
    Define(String),
    Undefine(String),
    Text(String),
}

impl Macro {
    pub fn define(name: &str, value: &str) -> Self {
        if value.is_empty() {
            Self::Define(name.to_owned())
        } else {
            Self::Define(format!("{name}={value}"))
        }
    }

    fn preamble_line(&self) -> String {
        match *self {
            Self::Define(ref definition) => format!("#define {}", definition.replacen('=', " ", 1)),
            Self::Undefine(ref name) => format!("#undef {name}"),
            Self::Text(ref line) => line.clone(),
        }
    }

    fn process(&self) -> String {
        match *self {
            Self::Define(ref definition) => format!("define-macro {definition}"),
            Self::Undefine(ref name) => format!("undef-macro {name}"),
            Self::Text(ref text) => format!("preamble-text{text}"),
        }
    }
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub enum DebugInfo {
    #[default]
    Names,
    Stripped,
    FileName,
    Lines,
    NonSemantic,
    NonSemanticWithSource,
}

impl DebugInfo {
    pub const fn has_lines(self) -> bool {
        matches!(
            self,
            Self::Lines | Self::NonSemantic | Self::NonSemanticWithSource
        )
    }

    pub const fn optimizer_level(self) -> DebugLevel {
        match self {
            Self::Lines => DebugLevel::Lines,
            Self::NonSemantic | Self::NonSemanticWithSource => DebugLevel::Variables,
            Self::Names | Self::Stripped | Self::FileName => DebugLevel::None,
        }
    }
}

pub const fn spirv_version_of_vulkan(vulkan: (u8, u8)) -> (u8, u8) {
    match vulkan {
        (1, 1) => (1, 3),
        (1, 2) => (1, 5),
        (1, 3 | 4) => (1, 6),
        _ => (1, 0),
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct CompileOptions {
    pub name: String,
    pub stage: Option<ShaderStage>,
    pub macros: Vec<Macro>,
    pub includes: Vec<(String, String)>,
    pub include_dirs: Vec<String>,
    pub file_system_includes: bool,
    pub entry_point: Option<String>,
    pub vulkan_version: (u8, u8),
    pub spirv_version: (u8, u8),
    pub suppress_warnings: bool,
    pub debug_info: DebugInfo,
    pub limits: ResourceLimits,
    pub invert_y: bool,
    pub nan_clamp: bool,
    pub discard_is_terminate: bool,
    pub enhanced_messages: bool,
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
            macros: Vec::new(),
            includes: Vec::new(),
            include_dirs: Vec::new(),
            file_system_includes: false,
            entry_point: None,
            vulkan_version: (1, 0),
            spirv_version: (1, 0),
            suppress_warnings: false,
            debug_info: DebugInfo::Names,
            limits: ResourceLimits::default(),
            invert_y: false,
            nan_clamp: false,
            discard_is_terminate: false,
            enhanced_messages: false,
        }
    }

    #[must_use]
    pub fn define(mut self, name: &str, value: &str) -> Self {
        self.macros.push(Macro::define(name, value));
        self
    }

    #[must_use]
    pub fn include(mut self, name: impl Into<String>, source: impl Into<String>) -> Self {
        self.includes.push((name.into(), source.into()));
        self
    }

    #[must_use]
    pub fn target_vulkan(mut self, major: u8, minor: u8) -> Self {
        self.vulkan_version = (major, minor);
        self.spirv_version = spirv_version_of_vulkan((major, minor));
        self
    }

    pub fn preamble(&self) -> String {
        let mut text = String::new();
        for edit in &self.macros {
            text.push_str(&edit.preamble_line());
            text.push('\n');
        }
        text
    }

    pub fn processes(&self) -> Vec<String> {
        let mut processes = Vec::new();
        if let Some(ref name) = self.entry_point {
            processes.push(format!("entry-point {name}"));
        }
        processes.extend(self.macros.iter().map(Macro::process));
        if self.invert_y {
            processes.push(String::from("invert-y"));
        }
        if self.discard_is_terminate {
            processes.push(String::from("discard-is-terminate"));
        }
        processes.push(String::from("client vulkan100"));
        let (major, minor) = self.spirv_version;
        if (major, minor) != (1, 0) {
            processes.push(format!("target-env spirv{major}.{minor}"));
        }
        let (major, minor) = self.vulkan_version;
        processes.push(format!("target-env vulkan{major}.{minor}"));
        if self.suppress_warnings {
            processes.push(String::from("suppress-warnings"));
        }
        if self.entry_point.is_none() {
            processes.push(String::from("entry-point main"));
        }
        processes
    }

    pub(crate) fn frontend(&self, builtin_tables: Arc<BuiltinCache>) -> glsl::Options {
        glsl::Options {
            builtin_tables,
            library: self.stage.is_none(),
            preamble: Some(self.preamble()),
            debug_info: self.debug_info.has_lines(),
            spirv_version: Some(self.spirv_version),
            source_name: Some(self.name.clone()),
            limits: self.limits,
            invert_y: self.invert_y,
            nan_clamp: self.nan_clamp,
            discard_is_terminate: self.discard_is_terminate,
            ..glsl::Options::from(self.stage.unwrap_or(ShaderStage::Compute))
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ProgramOptions {
    pub generate_spirv: bool,
    pub suppress_warnings: bool,
    pub debug_info: DebugInfo,
    pub spirv_version: (u8, u8),
    pub command_line: Option<String>,
    pub working_directory: Option<String>,
    pub limits: ResourceLimits,
    pub validate_io: bool,
    pub reflection: Option<reflect::Options>,
    pub optimize: OptOptions,
}

impl Default for ProgramOptions {
    fn default() -> Self {
        Self {
            generate_spirv: true,
            suppress_warnings: false,
            debug_info: DebugInfo::Names,
            spirv_version: (1, 0),
            command_line: None,
            working_directory: None,
            limits: ResourceLimits::default(),
            validate_io: false,
            reflection: None,
            optimize: OptOptions::default(),
        }
    }
}

impl ProgramOptions {
    pub const fn optimizer_context(&self) -> rglsl_opt::Context {
        rglsl_opt::Context {
            debug: self.debug_info.optimizer_level(),
        }
    }

    pub(crate) fn link_options(&self) -> crate::Options {
        crate::Options {
            limits: self.limits,
            validate_io: self.validate_io,
        }
    }
}
