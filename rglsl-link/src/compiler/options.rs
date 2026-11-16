use std::sync::Arc;

use rglsl::ShaderStage;
use rglsl::front::glsl;
use rglsl::proc::{BindingShifts, ResourceClass};
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
}

pub const fn spirv_version_of_vulkan(vulkan: (u8, u8)) -> (u8, u8) {
    match vulkan {
        (1, 1) => (1, 3),
        (1, 2) => (1, 5),
        (1, 3 | 4) => (1, 6),
        _ => (1, 0),
    }
}

const fn shift_name(class: ResourceClass) -> &'static str {
    match class {
        ResourceClass::Sampler => "shift-sampler-binding",
        ResourceClass::Texture => "shift-texture-binding",
        ResourceClass::Image => "shift-image-binding",
        ResourceClass::UniformBuffer => "shift-ubo-binding",
        ResourceClass::StorageBuffer => "shift-ssbo-binding",
        ResourceClass::CombinedSampler => "shift-combined-sampler-binding",
        ResourceClass::AccelerationStructure => "shift-as-binding",
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
    pub auto_map_bindings: bool,
    pub auto_map_locations: bool,
    pub binding_shifts: BindingShifts,
    pub resource_set_binding: Vec<String>,
    pub keep_uncalled: bool,
    pub hlsl_offsets: bool,
    pub export_functions: bool,
    pub suppress_warnings: bool,
    pub debug_info: DebugInfo,
    pub limits: ResourceLimits,
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
            auto_map_bindings: false,
            auto_map_locations: false,
            binding_shifts: BindingShifts::default(),
            resource_set_binding: Vec::new(),
            keep_uncalled: false,
            hlsl_offsets: false,
            export_functions: false,
            suppress_warnings: false,
            debug_info: DebugInfo::Names,
            limits: ResourceLimits::default(),
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

    pub fn resource_set(&self) -> Option<u32> {
        match self.resource_set_binding.as_slice() {
            [single] => Some(
                single
                    .chars()
                    .take_while(char::is_ascii_digit)
                    .collect::<String>()
                    .parse()
                    .unwrap_or(0),
            ),
            _ => None,
        }
    }

    pub fn processes(&self) -> Vec<String> {
        let mut processes = Vec::new();
        if let Some(ref name) = self.entry_point {
            processes.push(format!("entry-point {name}"));
        }
        processes.extend(self.macros.iter().map(Macro::process));
        for class in ResourceClass::ALL {
            let index = class.index();
            if let Some(&base) = self.binding_shifts.base.get(index)
                && base != 0
            {
                processes.push(format!("{} {base}", shift_name(class)));
            }
            for (set, base) in self.binding_shifts.per_set.get(index).into_iter().flatten() {
                if *base != 0 {
                    processes.push(format!("{} {base} {set}", shift_name(class)));
                }
            }
        }
        if !self.resource_set_binding.is_empty() {
            processes.push(format!(
                "resource-set-binding {}",
                self.resource_set_binding.join(" ")
            ));
        }
        if self.auto_map_bindings {
            processes.push(String::from("auto-map-bindings"));
        }
        if self.auto_map_locations {
            processes.push(String::from("auto-map-locations"));
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
        if self.keep_uncalled {
            processes.push(String::from("keep-uncalled"));
        }
        if self.hlsl_offsets {
            processes.push(String::from("hlsl-offsets"));
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
            auto_map_bindings: self.auto_map_bindings,
            auto_map_locations: self.auto_map_locations,
            preamble: Some(self.preamble()),
            hlsl_offsets: self.hlsl_offsets,
            debug_info: self.debug_info.has_lines(),
            spirv_version: Some(self.spirv_version),
            source_name: Some(self.name.clone()),
            keep_uncalled: self.keep_uncalled,
            resource_set: self.resource_set(),
            binding_shifts: self.binding_shifts.clone(),
            export_functions: self.export_functions,
            limits: self.limits,
            ..glsl::Options::from(self.stage.unwrap_or(ShaderStage::Compute))
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct ProgramOptions {
    pub link: bool,
    pub generate_spirv: bool,
    pub auto_map_bindings: bool,
    pub auto_map_locations: bool,
    pub binding_shifts: Vec<(ShaderStage, BindingShifts)>,
    pub keep_uncalled: bool,
    pub export_functions: bool,
    pub suppress_warnings: bool,
    pub debug_info: DebugInfo,
    pub spirv_version: (u8, u8),
    pub command_line: Option<String>,
    pub working_directory: Option<String>,
    pub limits: ResourceLimits,
    pub reflection: Option<reflect::Options>,
}

impl Default for ProgramOptions {
    fn default() -> Self {
        Self {
            link: true,
            generate_spirv: true,
            auto_map_bindings: false,
            auto_map_locations: false,
            binding_shifts: Vec::new(),
            keep_uncalled: false,
            export_functions: false,
            suppress_warnings: false,
            debug_info: DebugInfo::Names,
            spirv_version: (1, 0),
            command_line: None,
            working_directory: None,
            limits: ResourceLimits::default(),
            reflection: None,
        }
    }
}

impl ProgramOptions {
    pub(crate) fn link_options(&self) -> crate::Options {
        crate::Options {
            auto_map_locations: self.auto_map_locations,
            auto_map_bindings: self.auto_map_bindings,
            binding_shifts: self
                .binding_shifts
                .iter()
                .filter(|(_, shifts)| !shifts.is_empty())
                .cloned()
                .collect(),
            keep_uncalled: self.keep_uncalled,
            limits: self.limits,
        }
    }
}
