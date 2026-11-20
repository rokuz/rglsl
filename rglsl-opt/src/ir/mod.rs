pub(crate) mod const_array;
pub(crate) mod cse;
pub(crate) mod dce;
pub(crate) mod dead_branch;
pub(crate) mod debug;
pub(crate) mod fold;
pub(crate) mod forward;
pub(crate) mod inline;
pub(crate) mod lto_io;
pub(crate) mod rebuild;
pub(crate) mod specialize;
pub(crate) mod sroa;
pub(crate) mod ssa;
pub(crate) mod unroll;

use rglsl::{Function, Handle, Module};

#[derive(Clone, Copy)]
enum Slot {
    Function(Handle<Function>),
    Entry(usize),
}

impl Slot {
    fn function(self, module: &mut Module) -> Result<&mut Function, String> {
        match self {
            Self::Function(handle) => module
                .functions
                .try_get_mut(handle)
                .map_err(|error| error.to_string()),
            Self::Entry(index) => module
                .entry_points
                .get_mut(index)
                .map(|entry| &mut entry.function)
                .ok_or_else(|| format!("no entry point {index}")),
        }
    }
}

pub(crate) fn rewrite_functions(
    module: &mut Module,
    mut rewrite: impl FnMut(&mut Module, &Function) -> Result<Option<Function>, String>,
) -> Result<bool, String> {
    let slots: Vec<Slot> = module
        .functions
        .iter()
        .map(|(handle, _)| Slot::Function(handle))
        .chain((0..module.entry_points.len()).map(Slot::Entry))
        .collect();
    let mut changed = false;
    for slot in slots {
        let function = core::mem::take(slot.function(module)?);
        let result = rewrite(module, &function);
        let place = slot.function(module)?;
        *place = function;
        if let Some(rewritten) = result? {
            *place = rewritten;
            changed = true;
        }
    }
    Ok(changed)
}
