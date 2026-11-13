use alloc::sync::Arc;
use core::fmt;

use rglsl_types::ShaderStage;

use super::{Builtins, ResourceLimits, StageTables};

pub trait BuiltinTables: fmt::Debug {
    fn builtins(&self, version: u32, stage: ShaderStage, limits: &ResourceLimits) -> Arc<Builtins>;

    fn stage_tables(&self, version: u32, limits: &ResourceLimits) -> Arc<StageTables>;
}

#[derive(Debug, Clone, Copy, Default)]
pub struct FreshTables;

impl BuiltinTables for FreshTables {
    fn builtins(&self, version: u32, stage: ShaderStage, limits: &ResourceLimits) -> Arc<Builtins> {
        Arc::new(Builtins::new(version, stage, limits))
    }

    fn stage_tables(&self, version: u32, limits: &ResourceLimits) -> Arc<StageTables> {
        Arc::new(StageTables::new(version, limits))
    }
}

impl Builtins {
    pub fn is_for(&self, version: u32, stage: ShaderStage, limits: &ResourceLimits) -> bool {
        self.version() == version && self.stage() == stage && self.limits() == limits
    }
}

impl StageTables {
    pub fn is_for(&self, version: u32, limits: &ResourceLimits) -> bool {
        self.version() == version && self.limits() == limits
    }
}

#[derive(Debug)]
pub(crate) struct Prebuilt<'a>(pub(crate) &'a Arc<Builtins>);

impl BuiltinTables for Prebuilt<'_> {
    fn builtins(&self, version: u32, stage: ShaderStage, limits: &ResourceLimits) -> Arc<Builtins> {
        if self.0.is_for(version, stage, limits) {
            Arc::clone(self.0)
        } else {
            FreshTables.builtins(version, stage, limits)
        }
    }

    fn stage_tables(&self, version: u32, limits: &ResourceLimits) -> Arc<StageTables> {
        FreshTables.stage_tables(version, limits)
    }
}
