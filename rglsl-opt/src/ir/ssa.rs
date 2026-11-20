use crate::{Changed, OptError, Session};

pub(crate) fn run(session: &mut Session<'_, '_>) -> Result<Changed, OptError> {
    session.rewrite(|module| {
        let mut changed = false;
        for function in module.all_functions_mut() {
            for (_, local) in function.local_variables.iter_mut() {
                changed |= !local.ssa;
                local.ssa = true;
            }
        }
        Ok(changed)
    })
}
