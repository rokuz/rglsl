/// Ensure that the given block has return statements
/// at the end of its control flow.
///
/// Note: we don't want to blindly append a return statement
/// to the end, because it may be either redundant or invalid,
/// e.g. when the user already has returns in if/else branches.
pub fn ensure_block_returns(block: &mut crate::Block) {
    let mut pending = alloc::vec::Vec::from([block]);
    while let Some(block) = pending.pop() {
        ensure_returns_at_end(block, &mut pending);
    }
}

fn ensure_returns_at_end<'a>(
    block: &'a mut crate::Block,
    pending: &mut alloc::vec::Vec<&'a mut crate::Block>,
) {
    use crate::Statement as S;
    if needs_return(block.last()) {
        block.push(S::Return { value: None }, Default::default());
        return;
    }
    match block.last_mut() {
        Some(&mut S::Block(ref mut b)) => {
            pending.push(b);
        }
        Some(&mut S::If {
            condition: _,
            ref mut accept,
            ref mut reject,
            control: _,
        }) => {
            pending.push(reject);
            pending.push(accept);
        }
        Some(&mut S::Switch {
            selector: _,
            ref mut cases,
            control: _,
        }) => {
            for case in cases.iter_mut().rev() {
                if !case.fall_through {
                    pending.push(&mut case.body);
                }
            }
        }
        _ => {}
    }
}

const fn needs_return(last: Option<&crate::Statement>) -> bool {
    use crate::Statement as S;
    match last {
        Some(&(S::Block(_) | S::If { .. } | S::Switch { .. })) => false,
        Some(&(S::Break | S::Continue | S::Return { .. } | S::Kill | S::Abort { .. })) => false,
        Some(&S::MeshFunction(ref function)) if function.is_terminator() => false,
        Some(&S::RayPipelineFunction(ref function)) if function.is_terminator() => false,
        Some(
            &(S::Emit(_)
            | S::Loop { .. }
            | S::Store { .. }
            | S::ImageStore { .. }
            | S::TensorWrite { .. }
            | S::SpirvInstruction { .. }
            | S::Call { .. }
            | S::RayQuery { .. }
            | S::Atomic { .. }
            | S::ImageAtomic { .. }
            | S::AtomicLoad { .. }
            | S::AtomicStore { .. }
            | S::ScopedBarrier { .. }
            | S::SplitBarrier { .. }
            | S::Demote
            | S::BeginInvocationInterlock
            | S::EndInvocationInterlock
            | S::WorkGroupUniformLoad { .. }
            | S::SubgroupBallot { .. }
            | S::SubgroupCollectiveOperation { .. }
            | S::SubgroupGather { .. }
            | S::SubgroupFunction { .. }
            | S::ControlBarrier(_)
            | S::MemoryBarrier(_)
            | S::CooperativeStore { .. }
            | S::RayPipelineFunction(_)
            | S::HitObject { .. }
            | S::ReorderThread { .. }
            | S::DebugPrintf { .. }
            | S::Assume { .. }
            | S::CooperativeVector(_)
            | S::CooperativeMatrix { .. }
            | S::EmitVertex { .. }
            | S::EndPrimitive { .. }
            | S::MeshFunction(_)),
        )
        | None => true,
    }
}
