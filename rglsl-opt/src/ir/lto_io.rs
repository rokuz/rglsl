mod builtins;
mod slots;

use rglsl::{AddressSpace, Binding, GlobalVariable, Handle, Module, Sampling, ShaderStage};

use crate::analysis::locals::Locals;
use crate::{Changed, OptError, Session, StageModule};

use slots::Slots;

const VERTEX_PIPELINE: [ShaderStage; 5] = [
    ShaderStage::Vertex,
    ShaderStage::TessControl,
    ShaderStage::TessEvaluation,
    ShaderStage::Geometry,
    ShaderStage::Fragment,
];

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let Some(chain) = chain(session.stages) else {
        return Ok(Changed::No);
    };
    let pass = session.pass;
    let fail = |message: String| OptError::Pass { pass, message };
    let mut changed = false;
    for pair in chain.windows(2) {
        let &[producer, consumer] = pair else {
            continue;
        };
        let written = {
            let producer = stage(session.stages, producer).map_err(fail)?;
            written_outputs(producer)
        };
        let consumer_stage = stage_mut(session.stages, consumer).map_err(fail)?;
        if demote_undefined_inputs(consumer_stage, &written) {
            changed = true;
            session.run_on(consumer, crate::ir::forward::run)?;
            session.run_on(consumer, crate::ir::dce::run)?;
        }
    }
    for pair in chain.windows(2).rev() {
        let &[producer, consumer] = pair else {
            continue;
        };
        let (live, read, last) = {
            let consumer = stage(session.stages, consumer).map_err(fail)?;
            (
                live_inputs(consumer),
                builtins::read(consumer),
                consumer.stage == ShaderStage::Fragment,
            )
        };
        let producer_stage = stage_mut(session.stages, producer).map_err(fail)?;
        let mut stage_changed = demote_dead_outputs(producer_stage, &live);
        let removable = builtins::removable(producer_stage, &read, last);
        stage_changed |= builtins::remove_stores(producer_stage, &removable);
        if stage_changed {
            session.run_on(producer, crate::ir::dce::run)?;
        }
        if !removable.is_empty() {
            let producer_stage = stage_mut(session.stages, producer).map_err(fail)?;
            let dropped =
                builtins::retype(producer_stage, AddressSpace::Output, &removable).map_err(fail)?;
            if !dropped.is_empty() {
                stage_changed = true;
                if !last {
                    let consumer_stage = stage_mut(session.stages, consumer).map_err(fail)?;
                    builtins::retype(consumer_stage, AddressSpace::Input, &dropped)
                        .map_err(fail)?;
                }
            }
        }
        changed |= stage_changed;
    }
    Ok(changed.into())
}

fn stage<'a, 'm>(
    stages: &'a [StageModule<'m>],
    index: usize,
) -> Result<&'a StageModule<'m>, String> {
    stages
        .get(index)
        .ok_or_else(|| String::from("a stage of the pipeline disappeared"))
}

fn stage_mut<'a, 'm>(
    stages: &'a mut [StageModule<'m>],
    index: usize,
) -> Result<&'a mut StageModule<'m>, String> {
    stages
        .get_mut(index)
        .ok_or_else(|| String::from("a stage of the pipeline disappeared"))
}

fn chain(stages: &[StageModule<'_>]) -> Option<Vec<usize>> {
    let position = |stage: ShaderStage| stages.iter().position(|module| module.stage == stage);
    for (index, module) in stages.iter().enumerate() {
        let [ref entry] = *module.module.entry_points.as_slice() else {
            return None;
        };
        if entry.stage != module.stage
            || stages
                .iter()
                .skip(index + 1)
                .any(|other| other.stage == module.stage)
        {
            return None;
        }
    }
    let mut chain = Vec::new();
    if let Some(mesh) = position(ShaderStage::Mesh) {
        if VERTEX_PIPELINE
            .iter()
            .any(|&stage| stage != ShaderStage::Fragment && position(stage).is_some())
        {
            return None;
        }
        chain.push(mesh);
        chain.extend(position(ShaderStage::Fragment));
    } else {
        position(ShaderStage::Vertex)?;
        if position(ShaderStage::TessControl).is_some()
            != position(ShaderStage::TessEvaluation).is_some()
        {
            return None;
        }
        chain.extend(VERTEX_PIPELINE.iter().filter_map(|&stage| position(stage)));
    }
    (chain.len() > 1).then_some(chain)
}

#[derive(Debug, Clone, Copy, Default)]
struct Use {
    loads: bool,
    stores: bool,
    escaped: bool,
}

fn uses(module: &Module) -> Vec<Use> {
    let count = module.global_variables.len();
    let mut uses = vec![Use::default(); count];
    let functions = module.all_functions();
    for function in functions {
        let locals = Locals::of(function, count);
        for (index, slot) in uses.iter_mut().enumerate() {
            let Some(usage) = locals.globals.get(index) else {
                continue;
            };
            slot.loads |= usage.whole_loads > 0 || usage.partial_loads > 0;
            slot.stores |= !usage.stores.is_empty();
            slot.escaped |= usage.escaped;
        }
    }
    uses
}

fn interface(module: &Module, space: AddressSpace) -> Vec<Handle<GlobalVariable>> {
    module
        .entry_points
        .iter()
        .flat_map(|entry| entry.interface.iter().copied())
        .filter(|&handle| {
            module
                .global_variables
                .try_get(handle)
                .is_ok_and(|global| global.space == space)
        })
        .collect()
}

fn written_outputs(producer: &StageModule<'_>) -> Slots {
    let module = &*producer.module;
    let uses = uses(module);
    let mut written = Slots::default();
    for handle in interface(module, AddressSpace::Output) {
        let Ok(global) = module.global_variables.try_get(handle) else {
            continue;
        };
        let used = uses.get(handle.index()).copied().unwrap_or_default();
        let unwritten =
            global.init.is_none() && !used.stores && !used.escaped && global.io.is_some();
        if !unwritten {
            written.extend(&slots::of(module, producer.stage, global));
        }
    }
    written.finish();
    written
}

fn live_inputs(consumer: &StageModule<'_>) -> Slots {
    let module = &*consumer.module;
    let mut live = Slots::default();
    for handle in interface(module, AddressSpace::Input) {
        if let Ok(global) = module.global_variables.try_get(handle) {
            live.extend(&slots::of(module, consumer.stage, global));
        }
    }
    live.finish();
    live
}

fn plain_location(global: &GlobalVariable) -> bool {
    matches!(
        global.io,
        Some(Binding::Location {
            per_view: false,
            passthrough: false,
            ..
        })
    ) && global.spirv_decorations.is_empty()
        && global.memory_decorations.is_empty()
        && global.binding.is_none()
        && global.heap_offset.is_none()
}

fn pinned(module: &Module, handle: Handle<GlobalVariable>) -> bool {
    module.entry_points.iter().any(|entry| {
        entry.geometry.as_ref().is_some_and(|geometry| {
            geometry.passthrough.contains(&handle)
                || geometry
                    .streams
                    .iter()
                    .any(|&(variable, stream)| variable == handle && stream != 0)
        })
    })
}

fn demote_undefined_inputs(consumer: &mut StageModule<'_>, written: &Slots) -> bool {
    let module = &mut *consumer.module;
    let candidates: Vec<Handle<GlobalVariable>> = interface(module, AddressSpace::Input)
        .into_iter()
        .filter(|&handle| {
            module.global_variables.try_get(handle).is_ok_and(|global| {
                plain_location(global)
                    && !matches!(
                        global.io,
                        Some(Binding::Location {
                            sampling: Some(Sampling::Sample),
                            ..
                        })
                    )
                    && !pinned(module, handle)
                    && !written.overlaps(&slots::of(module, consumer.stage, global))
            })
        })
        .collect();
    for &handle in &candidates {
        demote(module, handle);
    }
    !candidates.is_empty()
}

fn demote_dead_outputs(producer: &mut StageModule<'_>, live: &Slots) -> bool {
    let module = &mut *producer.module;
    let shared = matches!(producer.stage, ShaderStage::TessControl | ShaderStage::Mesh);
    let uses = uses(module);
    let candidates: Vec<Handle<GlobalVariable>> = interface(module, AddressSpace::Output)
        .into_iter()
        .filter(|&handle| {
            let used = uses.get(handle.index()).copied().unwrap_or_default();
            module.global_variables.try_get(handle).is_ok_and(|global| {
                plain_location(global)
                    && global.xfb.is_none_or(|xfb| xfb.offset.is_none())
                    && !pinned(module, handle)
                    && !(shared && (used.loads || used.escaped))
                    && !live.overlaps(&slots::of(module, producer.stage, global))
            })
        })
        .collect();
    for &handle in &candidates {
        demote(module, handle);
    }
    !candidates.is_empty()
}

fn demote(module: &mut Module, handle: Handle<GlobalVariable>) {
    if let Ok(global) = module.global_variables.try_get_mut(handle) {
        global.space = AddressSpace::Private;
        global.io = None;
        global.xfb = None;
    }
    for entry in &mut module.entry_points {
        entry.interface.retain(|&variable| variable != handle);
        if let Some(ref mut geometry) = entry.geometry {
            geometry.streams.retain(|&(variable, _)| variable != handle);
        }
    }
}
