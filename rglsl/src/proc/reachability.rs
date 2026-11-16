use core::cell::Cell;

use rglsl_types::stack::recurse;

use crate::{Block, FastHashSet, Statement, SwitchCase};

#[derive(Debug, Default)]
pub struct Reachability {
    incomplete: FastHashSet<usize>,
    dead_continuing: FastHashSet<usize>,
}

#[derive(Clone, Copy, Default)]
struct Targets<'t> {
    broken: Option<&'t Cell<bool>>,
    continued: Option<&'t Cell<bool>>,
}

impl Reachability {
    pub fn new(body: &Block) -> Self {
        let mut reachability = Self::default();
        reachability.sequence(body, Targets::default());
        reachability
    }

    pub fn completes(&self, statement: &Statement) -> bool {
        !self.incomplete.contains(&address(statement))
    }

    pub fn continuing_reachable(&self, statement: &Statement) -> bool {
        !self.dead_continuing.contains(&address(statement))
    }

    fn sequence(&mut self, block: &Block, targets: Targets) -> bool {
        for statement in block {
            let completes = match *statement {
                Statement::Block(ref block) => recurse(|| self.sequence(block, targets)),
                Statement::If {
                    ref accept,
                    ref reject,
                    ..
                } => recurse(|| {
                    let accept = self.sequence(accept, targets);
                    let reject = self.sequence(reject, targets);
                    accept || reject
                }),
                Statement::Switch { ref cases, .. } => recurse(|| self.switch(cases, targets)),
                Statement::Loop {
                    ref body,
                    ref continuing,
                    break_if,
                    ..
                } => recurse(|| self.r#loop(statement, [body, continuing], break_if.is_some())),
                Statement::Break => {
                    if let Some(broken) = targets.broken {
                        broken.set(true);
                    }
                    false
                }
                Statement::Continue => {
                    if let Some(continued) = targets.continued {
                        continued.set(true);
                    }
                    false
                }
                _ => !statement.is_terminator(),
            };
            if !completes {
                self.incomplete.insert(address(statement));
                return false;
            }
        }
        true
    }

    fn switch(&mut self, cases: &[SwitchCase], targets: Targets) -> bool {
        let broken = Cell::new(false);
        let inner = Targets {
            broken: Some(&broken),
            ..targets
        };
        let mut completes = false;
        for (index, case) in cases.iter().enumerate() {
            let falls_through = case.fall_through && index + 1 < cases.len();
            if self.sequence(&case.body, inner) && !falls_through {
                completes = true;
            }
        }
        completes || broken.get()
    }

    fn r#loop(
        &mut self,
        statement: &Statement,
        [body, continuing]: [&Block; 2],
        break_if: bool,
    ) -> bool {
        let broken = Cell::new(false);
        let continued = Cell::new(false);
        let inner = Targets {
            broken: Some(&broken),
            continued: Some(&continued),
        };
        if !self.sequence(body, inner) && !continued.get() {
            self.dead_continuing.insert(address(statement));
            return broken.get();
        }
        let completes = self.sequence(continuing, inner);
        broken.get() || (break_if && completes)
    }
}

fn address(statement: &Statement) -> usize {
    core::ptr::from_ref(statement).addr()
}
