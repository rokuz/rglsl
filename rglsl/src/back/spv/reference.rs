use alloc::{vec, vec::Vec};

use crate::arena::Handle;
use crate::valid::FunctionInfo;
use crate::{ArraySize, Expression, Function, LocalVariable, TypeInner, UniqueArena};

pub(super) fn reference_arguments(
    function: &Function,
    info: &FunctionInfo,
    types: &UniqueArena<crate::Type>,
) -> Vec<Option<Handle<LocalVariable>>> {
    let mut references = vec![None; function.arguments.len()];
    let copies = super::debug::parameter_copies(function);
    if copies.is_empty() {
        return references;
    }
    let mut uses = vec![0usize; function.arguments.len()];
    for (handle, expression) in function.expressions.iter() {
        if let Expression::FunctionArgument(index) = *expression
            && let Some(count) = uses.get_mut(index as usize)
        {
            *count += info[handle].ref_count.max(1);
        }
    }
    let mut taken = crate::FastHashSet::default();
    for (index, argument) in function.arguments.iter().enumerate() {
        let Ok(number) = u32::try_from(index) else {
            continue;
        };
        let Some(&local) = copies.get(&number) else {
            continue;
        };
        let variable = &function.local_variables[local];
        let aggregate = matches!(
            types[argument.ty].inner,
            TypeInner::Struct { .. }
                | TypeInner::Array {
                    size: ArraySize::Constant(_),
                    ..
                }
        );
        if aggregate
            && argument.binding.is_none()
            && !argument.relaxed_precision
            && variable.ty == argument.ty
            && variable.init.is_none()
            && !variable.relaxed_precision
            && !variable.ssa
            && uses.get(index) == Some(&1)
            && taken.insert(local)
            && let Some(slot) = references.get_mut(index)
        {
            *slot = Some(local);
        }
    }
    references
}
