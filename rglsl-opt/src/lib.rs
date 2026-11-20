#![forbid(unsafe_code)]

mod analysis;
mod error;
pub mod float;
mod ir;
mod manager;
mod pass;
mod preset;
mod specialization;
mod summary;
mod target;

use rglsl::valid::ModuleInfo;
use rglsl::{Module, ShaderStage};

pub use error::OptError;
pub use manager::optimize;
pub use pass::{Changed, PASSES, Pass, Scope, Session};
pub use preset::{PRESETS, Preset, Step};
pub use specialization::Specialization;
pub use summary::Summary;
pub use target::{
    GpuClass, GpuParameters, GpuProfile, Inlining, PROFILES, Reuse, TargetGpu, Unrolling,
};

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Hash)]
pub enum OptLevel {
    #[default]
    Disabled,
    Performance,
    Size,
}

impl OptLevel {
    pub const ALL: [Self; 3] = [Self::Disabled, Self::Performance, Self::Size];
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct OptOptions {
    pub level: OptLevel,
    pub target_gpu: TargetGpu,
    pub passes: Option<Vec<String>>,
    pub validate_each: bool,
    pub specialization: Vec<Specialization>,
}

impl Default for OptOptions {
    fn default() -> Self {
        Self {
            level: OptLevel::Disabled,
            target_gpu: TargetGpu::default(),
            passes: None,
            validate_each: cfg!(debug_assertions),
            specialization: Vec::new(),
        }
    }
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq, Hash)]
pub enum DebugLevel {
    #[default]
    None,
    Lines,
    Variables,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct Context {
    pub debug: DebugLevel,
    pub export_functions: bool,
    pub unlinked: bool,
}

impl Context {
    pub const fn whole_program(self) -> bool {
        !self.unlinked && !self.export_functions
    }

    pub const fn keeps_variables(self) -> bool {
        matches!(self.debug, DebugLevel::Variables)
    }
}

#[derive(Debug)]
pub struct StageModule<'m> {
    pub stage: ShaderStage,
    pub module: &'m mut Module,
    pub info: &'m mut ModuleInfo,
}
