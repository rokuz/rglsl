use core::slice;

use crate::{Block, FastHashSet, Statement, SwitchCase};

#[derive(Debug, Default)]
pub struct Reachability {
    incomplete: FastHashSet<usize>,
    dead_continuing: FastHashSet<usize>,
}

impl Reachability {
    pub fn new(body: &Block) -> Self {
        let mut reachability = Self::default();
        reachability.analyse(body);
        reachability
    }

    pub fn completes(&self, statement: &Statement) -> bool {
        !self.incomplete.contains(&address(statement))
    }

    pub fn continuing_reachable(&self, statement: &Statement) -> bool {
        !self.dead_continuing.contains(&address(statement))
    }

    fn analyse(&mut self, body: &Block) {
        let mut frames = alloc::vec![Frame::sequence(body)];
        let mut finished: Option<bool> = None;
        while let Some(frame) = frames.last_mut() {
            let step = match finished.take() {
                Some(completes) => frame.resume(completes, self),
                None => frame.advance(self),
            };
            match step {
                Step::Stay => {}
                Step::Enter(child) => frames.push(child),
                Step::Leave(completes) => {
                    frames.pop();
                    finished = Some(completes);
                }
                Step::Jump(jump) => {
                    frames.pop();
                    mark_target(&mut frames, jump);
                    finished = Some(false);
                }
            }
        }
    }
}

fn address(statement: &Statement) -> usize {
    core::ptr::from_ref(statement).addr()
}

#[derive(Clone, Copy)]
enum Jump {
    Break,
    Continue,
}

enum Step<'a> {
    Stay,
    Enter(Frame<'a>),
    Leave(bool),
    Jump(Jump),
}

#[derive(Clone, Copy)]
enum LoopStage {
    Body,
    Continuing,
}

enum Frame<'a> {
    Sequence {
        statements: slice::Iter<'a, Statement>,
        current: Option<&'a Statement>,
    },
    If {
        accept: &'a Block,
        reject: &'a Block,
        accept_completes: Option<bool>,
    },
    Switch {
        cases: slice::Iter<'a, SwitchCase>,
        current: Option<&'a SwitchCase>,
        completes: bool,
    },
    Loop {
        statement: &'a Statement,
        body: &'a Block,
        continuing: &'a Block,
        break_if: bool,
        stage: LoopStage,
        broken: bool,
        continued: bool,
    },
}

fn mark_target(frames: &mut [Frame], jump: Jump) {
    for frame in frames.iter_mut().rev() {
        match (frame, jump) {
            (&mut Frame::Loop { ref mut broken, .. }, Jump::Break)
            | (
                &mut Frame::Loop {
                    continued: ref mut broken,
                    ..
                },
                Jump::Continue,
            )
            | (
                &mut Frame::Switch {
                    completes: ref mut broken,
                    ..
                },
                Jump::Break,
            ) => {
                *broken = true;
                return;
            }
            _ => {}
        }
    }
}

impl<'a> Frame<'a> {
    fn sequence(block: &'a Block) -> Self {
        Self::Sequence {
            statements: block.iter(),
            current: None,
        }
    }

    fn advance(&mut self, reachability: &mut Reachability) -> Step<'a> {
        match *self {
            Self::Sequence {
                ref mut statements,
                ref mut current,
            } => {
                let Some(statement) = statements.next() else {
                    return Step::Leave(true);
                };
                *current = Some(statement);
                match enter(statement) {
                    Entry::Simple => Step::Stay,
                    Entry::Terminator => {
                        reachability.incomplete.insert(address(statement));
                        Step::Leave(false)
                    }
                    Entry::Jump(jump) => {
                        reachability.incomplete.insert(address(statement));
                        Step::Jump(jump)
                    }
                    Entry::Compound(frame) => Step::Enter(frame),
                }
            }
            Self::If { accept, .. } => Step::Enter(Self::sequence(accept)),
            Self::Switch {
                ref mut cases,
                ref mut current,
                completes,
            } => next_case(cases, current, completes),
            Self::Loop { body, .. } => Step::Enter(Self::sequence(body)),
        }
    }

    fn resume(&mut self, completes: bool, reachability: &mut Reachability) -> Step<'a> {
        match *self {
            Self::Sequence { current, .. } => {
                if completes {
                    return Step::Stay;
                }
                if let Some(statement) = current {
                    reachability.incomplete.insert(address(statement));
                }
                Step::Leave(false)
            }
            Self::If {
                reject,
                ref mut accept_completes,
                ..
            } => match *accept_completes {
                Some(accept) => Step::Leave(accept || completes),
                None => {
                    *accept_completes = Some(completes);
                    Step::Enter(Self::sequence(reject))
                }
            },
            Self::Switch {
                ref mut cases,
                ref mut current,
                completes: ref mut switch_completes,
            } => {
                let falls_through =
                    current.is_some_and(|case| case.fall_through) && cases.len() != 0;
                if completes && !falls_through {
                    *switch_completes = true;
                }
                next_case(cases, current, *switch_completes)
            }
            Self::Loop {
                statement,
                continuing,
                break_if,
                ref mut stage,
                broken,
                continued,
                ..
            } => match *stage {
                LoopStage::Body if completes || continued => {
                    *stage = LoopStage::Continuing;
                    Step::Enter(Self::sequence(continuing))
                }
                LoopStage::Body => {
                    reachability.dead_continuing.insert(address(statement));
                    Step::Leave(broken)
                }
                LoopStage::Continuing => Step::Leave(broken || (break_if && completes)),
            },
        }
    }
}

fn next_case<'a>(
    cases: &mut slice::Iter<'a, SwitchCase>,
    current: &mut Option<&'a SwitchCase>,
    completes: bool,
) -> Step<'a> {
    *current = cases.next();
    match *current {
        Some(case) => Step::Enter(Frame::sequence(&case.body)),
        None => Step::Leave(completes),
    }
}

enum Entry<'a> {
    Simple,
    Terminator,
    Jump(Jump),
    Compound(Frame<'a>),
}

fn enter(statement: &Statement) -> Entry<'_> {
    match *statement {
        Statement::Block(ref block) => Entry::Compound(Frame::sequence(block)),
        Statement::If {
            ref accept,
            ref reject,
            ..
        } => Entry::Compound(Frame::If {
            accept,
            reject,
            accept_completes: None,
        }),
        Statement::Switch { ref cases, .. } => Entry::Compound(Frame::Switch {
            cases: cases.iter(),
            current: None,
            completes: false,
        }),
        Statement::Loop {
            ref body,
            ref continuing,
            break_if,
            ..
        } => Entry::Compound(Frame::Loop {
            statement,
            body,
            continuing,
            break_if: break_if.is_some(),
            stage: LoopStage::Body,
            broken: false,
            continued: false,
        }),
        Statement::Break => Entry::Jump(Jump::Break),
        Statement::Continue => Entry::Jump(Jump::Continue),
        Statement::Return { .. } | Statement::Kill | Statement::Abort { .. } => Entry::Terminator,
        Statement::MeshFunction(ref function) if function.is_terminator() => Entry::Terminator,
        Statement::RayPipelineFunction(ref function) if function.is_terminator() => {
            Entry::Terminator
        }
        Statement::Emit(_)
        | Statement::Store { .. }
        | Statement::ImageStore { .. }
        | Statement::TensorWrite { .. }
        | Statement::SpirvInstruction { .. }
        | Statement::Call { .. }
        | Statement::RayQuery { .. }
        | Statement::Atomic { .. }
        | Statement::ImageAtomic { .. }
        | Statement::AtomicLoad { .. }
        | Statement::AtomicStore { .. }
        | Statement::ScopedBarrier { .. }
        | Statement::SplitBarrier { .. }
        | Statement::Demote
        | Statement::BeginInvocationInterlock
        | Statement::EndInvocationInterlock
        | Statement::WorkGroupUniformLoad { .. }
        | Statement::SubgroupBallot { .. }
        | Statement::SubgroupCollectiveOperation { .. }
        | Statement::SubgroupGather { .. }
        | Statement::SubgroupFunction { .. }
        | Statement::ControlBarrier(_)
        | Statement::MemoryBarrier(_)
        | Statement::CooperativeStore { .. }
        | Statement::RayPipelineFunction(_)
        | Statement::HitObject { .. }
        | Statement::ReorderThread { .. }
        | Statement::DebugPrintf { .. }
        | Statement::Assume { .. }
        | Statement::CooperativeVector(_)
        | Statement::CooperativeMatrix { .. }
        | Statement::EmitVertex { .. }
        | Statement::EndPrimitive { .. }
        | Statement::MeshFunction(_) => Entry::Simple,
    }
}
