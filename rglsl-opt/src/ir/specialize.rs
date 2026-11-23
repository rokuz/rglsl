use rglsl::proc::{ConstantEvaluator, ExpressionKindTracker, Layouter};
use rglsl::{
    Constant, Expression, FastHashMap, Function, Handle, Literal, Module, Override, Span, TypeInner,
};

use crate::{Changed, OptError, Session, Specialization};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    let values = values(session.specialization)?;
    if values.is_empty() {
        return Ok(Changed::No);
    }
    let pass = session.pass;
    let mut declared = vec![false; session.specialization.len()];
    let mut changed = false;
    for stage in session.stages.iter_mut() {
        changed |=
            specialize(stage.module, &values, &mut declared).map_err(|error| match error {
                Failure::Value(message) => OptError::Specialization(message),
                Failure::Internal(message) => OptError::Pass { pass, message },
            })?;
    }
    if let Some((item, _)) = session
        .specialization
        .iter()
        .zip(&declared)
        .find(|&(_, &found)| !found)
    {
        return Err(OptError::Specialization(format!(
            "specialization constant {} is not declared in the program",
            item.id
        )));
    }
    Ok(changed.into())
}

enum Failure {
    Value(String),
    Internal(String),
}

fn values(
    specialization: &[Specialization],
) -> Result<FastHashMap<u32, (usize, &Specialization)>, OptError> {
    let mut values = FastHashMap::default();
    for (index, item) in specialization.iter().enumerate() {
        if values.insert(item.id, (index, item)).is_some() {
            return Err(OptError::Specialization(format!(
                "specialization constant {} has more than one value",
                item.id
            )));
        }
    }
    Ok(values)
}

fn specialize(
    module: &mut Module,
    values: &FastHashMap<u32, (usize, &Specialization)>,
    declared: &mut [bool],
) -> Result<bool, Failure> {
    let mut resolved: Vec<Option<Handle<Constant>>> = vec![None; module.overrides.len()];
    let mut tracker = ExpressionKindTracker::from_arena(&module.global_expressions);
    let mut layouter = Layouter::default();
    let references = references(module);
    let handles: Vec<Handle<Override>> =
        module.overrides.iter().map(|(handle, _)| handle).collect();
    let mut changed = false;
    for handle in handles {
        let item = module
            .overrides
            .try_get(handle)
            .map_err(|error| Failure::Internal(error.to_string()))?
            .clone();
        let span = module.overrides.get_span(handle);
        let value = match item.id {
            Some(id) => {
                let Some(&(index, specialization)) = values.get(&id) else {
                    continue;
                };
                if let Some(slot) = declared.get_mut(index) {
                    *slot = true;
                }
                set_value(module, handle, &item, specialization, &references)?
            }
            None => {
                let Some(init) = item.init else {
                    continue;
                };
                let Some(value) =
                    evaluated(module, &mut tracker, &mut layouter, init, &resolved, span)?
                else {
                    continue;
                };
                value
            }
        };
        let constant = module.constants.append(
            Constant {
                name: None,
                ty: item.ty,
                init: value,
            },
            span,
        );
        if let Some(entry) = resolved.get_mut(handle.index()) {
            *entry = Some(constant);
        }
        changed = true;
    }
    if !changed {
        return Ok(false);
    }
    for (_, function) in module.functions.iter_mut() {
        retarget(function, &resolved);
    }
    for index in 0..module.entry_points.len() {
        workgroup_size(module, index, &resolved)?;
        if let Some(entry) = module.entry_points.get_mut(index) {
            retarget(&mut entry.function, &resolved);
        }
    }
    Ok(true)
}

fn set_value(
    module: &mut Module,
    handle: Handle<Override>,
    item: &Override,
    specialization: &Specialization,
    references: &[u32],
) -> Result<Handle<Expression>, Failure> {
    let id = specialization.id;
    let TypeInner::Scalar(scalar) = module
        .types
        .get_handle(item.ty)
        .map_err(|error| Failure::Internal(error.to_string()))?
        .inner
    else {
        return Err(Failure::Value(format!(
            "specialization constant {id} is not a scalar"
        )));
    };
    let literal = specialization.literal(scalar).map_err(Failure::Value)?;
    let init = item.init.ok_or_else(|| {
        Failure::Internal(format!("specialization constant {id} has no default value"))
    })?;
    if references.get(init.index()).copied().unwrap_or(0) != 1
        || !matches!(
            module.global_expressions.try_get(init),
            Ok(Expression::Literal(_) | Expression::ZeroValue(_))
        )
    {
        return Err(Failure::Internal(format!(
            "the default value of specialization constant {id} is not its own literal"
        )));
    }
    *module
        .global_expressions
        .try_get_mut(init)
        .map_err(|error| Failure::Internal(error.to_string()))? = Expression::Literal(literal);
    module
        .overrides
        .try_get_mut(handle)
        .map_err(|error| Failure::Internal(error.to_string()))?
        .id = None;
    Ok(init)
}

fn evaluated(
    module: &mut Module,
    tracker: &mut ExpressionKindTracker,
    layouter: &mut Layouter,
    root: Handle<Expression>,
    resolved: &[Option<Handle<Constant>>],
    span: Span,
) -> Result<Option<Handle<Expression>>, Failure> {
    let count = module.global_expressions.len();
    let mut needed = vec![false; count];
    let mut pending = vec![root];
    let mut resolvable = true;
    while let Some(handle) = pending.pop() {
        let Some(slot) = needed.get_mut(handle.index()) else {
            return Err(Failure::Internal(format!(
                "global expression {handle:?} is out of range"
            )));
        };
        if *slot {
            continue;
        }
        *slot = true;
        let expression = module
            .global_expressions
            .try_get(handle)
            .map_err(|error| Failure::Internal(error.to_string()))?;
        match *expression {
            Expression::Override(item) => {
                if resolved.get(item.index()).copied().flatten().is_none() {
                    resolvable = false;
                }
            }
            Expression::CooperativeMatrixLength { .. } => resolvable = false,
            ref other => other.for_each_operand(|operand| pending.push(operand)),
        }
        if !resolvable {
            return Ok(None);
        }
    }
    let mut map: Vec<Option<Handle<Expression>>> = vec![None; count];
    let sources: Vec<(Handle<Expression>, Expression)> = module
        .global_expressions
        .iter()
        .filter(|&(handle, _)| needed.get(handle.index()) == Some(&true))
        .map(|(handle, expression)| (handle, expression.clone()))
        .collect();
    let mut evaluator = ConstantEvaluator::for_glsl_module(module, tracker, layouter);
    let mut last = None;
    for (handle, mut expression) in sources {
        if let Expression::Override(item) = expression {
            let constant = resolved
                .get(item.index())
                .copied()
                .flatten()
                .ok_or_else(|| Failure::Internal(String::from("an override is not resolved")))?;
            expression = Expression::Constant(constant);
        }
        let mut complete = true;
        expression.for_each_operand_mut(|operand| {
            match map.get(operand.index()).copied().flatten() {
                Some(new) => *operand = new,
                None => complete = false,
            }
        });
        if !complete {
            return Err(Failure::Internal(String::from(
                "a specialization-constant expression refers to a later expression",
            )));
        }
        let Ok(new) = evaluator.try_eval_and_append(expression, span) else {
            return Ok(None);
        };
        if let Some(slot) = map.get_mut(handle.index()) {
            *slot = Some(new);
        }
        last = Some(new);
    }
    let Some(value) = last.filter(|_| map.get(root.index()).copied().flatten() == last) else {
        return Err(Failure::Internal(String::from(
            "a specialization-constant expression was not evaluated",
        )));
    };
    Ok(tracker.is_const(value).then_some(value))
}

fn references(module: &Module) -> Vec<u32> {
    let mut counts = vec![0_u32; module.global_expressions.len()];
    let mut count = |handle: Handle<Expression>| {
        if let Some(slot) = counts.get_mut(handle.index()) {
            *slot = slot.saturating_add(1);
        }
    };
    for (_, expression) in module.global_expressions.iter() {
        expression.for_each_operand(&mut count);
    }
    for (_, constant) in module.constants.iter() {
        count(constant.init);
    }
    for (_, item) in module.overrides.iter() {
        item.init.into_iter().for_each(&mut count);
    }
    for (_, global) in module.global_variables.iter() {
        global.init.into_iter().for_each(&mut count);
        global.heap_offset.into_iter().for_each(&mut count);
        for decoration in &global.spirv_decorations {
            if let rglsl::SpirvDecorationOperands::Ids(ref ids) = decoration.operands {
                for id in ids {
                    if let rglsl::SpirvId::Constant(constant) = *id {
                        count(constant);
                    }
                }
            }
        }
    }
    for entry in &module.entry_points {
        entry
            .workgroup_size_overrides
            .iter()
            .flatten()
            .flatten()
            .copied()
            .for_each(&mut count);
        entry.opacity_micromap.into_iter().for_each(&mut count);
        for mode in &entry.spirv_execution_modes {
            if let rglsl::SpirvExecutionModeOperands::Ids(ref ids) = mode.operands {
                ids.iter().copied().for_each(&mut count);
            }
        }
    }
    counts
}

fn retarget(function: &mut Function, resolved: &[Option<Handle<Constant>>]) {
    for (_, expression) in function.expressions.iter_mut() {
        if let Expression::Override(item) = *expression
            && let Some(&Some(constant)) = resolved.get(item.index())
        {
            *expression = Expression::Constant(constant);
        }
    }
}

fn workgroup_size(
    module: &mut Module,
    index: usize,
    resolved: &[Option<Handle<Constant>>],
) -> Result<(), Failure> {
    let Some(overrides) = module
        .entry_points
        .get(index)
        .and_then(|entry| entry.workgroup_size_overrides)
    else {
        return Ok(());
    };
    let mut remaining = overrides;
    let mut sizes = Vec::new();
    for (axis, slot) in remaining.iter_mut().enumerate() {
        let Some(expression) = *slot else {
            continue;
        };
        let Ok(&Expression::Override(item)) = module.global_expressions.try_get(expression) else {
            continue;
        };
        let Some(&Some(constant)) = resolved.get(item.index()) else {
            continue;
        };
        let init = module
            .constants
            .try_get(constant)
            .map_err(|error| Failure::Internal(error.to_string()))?
            .init;
        let size = match module.global_expressions.try_get(init) {
            Ok(&Expression::Literal(Literal::U32(size))) if size > 0 => size,
            _ => {
                return Err(Failure::Value(String::from(
                    "a local size specialized to 0 or to a value that is not an unsigned integer",
                )));
            }
        };
        sizes.push((axis, size));
        *slot = None;
    }
    let Some(entry) = module.entry_points.get_mut(index) else {
        return Err(Failure::Internal(String::from(
            "the entry point disappeared",
        )));
    };
    for (axis, size) in sizes {
        if let Some(slot) = entry.workgroup_size.get_mut(axis) {
            *slot = size;
        }
    }
    entry.workgroup_size_overrides = remaining.iter().any(Option::is_some).then_some(remaining);
    Ok(())
}
