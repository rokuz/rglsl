use std::sync::{Arc, Mutex, MutexGuard, PoisonError};

use rglsl::ShaderStage;
use rglsl_sema::{BuiltinTables, Builtins, ResourceLimits, StageTables};

#[derive(Debug, Default)]
pub struct BuiltinCache {
    builtins: Mutex<Vec<Arc<Builtins>>>,
    stage_tables: Mutex<Vec<Arc<StageTables>>>,
}

impl BuiltinCache {
    pub fn new() -> Self {
        Self::default()
    }
}

fn lock<T>(entries: &Mutex<T>) -> MutexGuard<'_, T> {
    entries.lock().unwrap_or_else(PoisonError::into_inner)
}

fn cached<T>(
    entries: &Mutex<Vec<Arc<T>>>,
    wanted: impl Fn(&T) -> bool,
    build: impl FnOnce() -> T,
) -> Arc<T> {
    if let Some(found) = lock(entries).iter().find(|entry| wanted(entry)) {
        return Arc::clone(found);
    }
    let built = Arc::new(build());
    let mut entries = lock(entries);
    if let Some(found) = entries.iter().find(|entry| wanted(entry)) {
        return Arc::clone(found);
    }
    entries.push(Arc::clone(&built));
    built
}

impl BuiltinTables for BuiltinCache {
    fn builtins(&self, version: u32, stage: ShaderStage, limits: &ResourceLimits) -> Arc<Builtins> {
        cached(
            &self.builtins,
            |builtins| builtins.is_for(version, stage, limits),
            || Builtins::new(version, stage, limits),
        )
    }

    fn stage_tables(&self, version: u32, limits: &ResourceLimits) -> Arc<StageTables> {
        cached(
            &self.stage_tables,
            |tables| tables.is_for(version, limits),
            || StageTables::new(version, limits),
        )
    }
}
