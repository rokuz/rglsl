use alloc::vec::Vec;

use spirv::Word;

use super::super::{Block, BlockContext, Error, Instruction, debug, instructions};
use crate::{Statement, arena::Handle};

pub(super) enum BlockExit {
    Return,
    Branch {
        target: Word,
    },
    BreakIf {
        condition: Handle<crate::Expression>,
        preamble_id: Word,
    },
}

#[must_use]
#[derive(Clone, Copy)]
enum BlockExitDisposition {
    Used,
    Discarded,
}

pub(super) enum Resume<'a> {
    Scope {
        merge_id: Word,
        statement: &'a Statement,
    },
    Merge {
        merge_id: Word,
        statement: &'a Statement,
    },
}

enum FrameState<'a> {
    Writing(Block),
    Waiting(Resume<'a>),
}

pub(super) struct BlockFrame<'a> {
    ir: &'a crate::Block,
    next: usize,
    state: FrameState<'a>,
    exit: BlockExit,
    loop_context: LoopContext,
}

pub(super) enum Work<'a> {
    Block {
        label_id: Word,
        ir: &'a crate::Block,
        exit: BlockExit,
        loop_context: LoopContext,
    },
    Frame(BlockFrame<'a>),
    Branch {
        label_id: Word,
        target: Word,
    },
}

pub(super) enum Nested<'a> {
    Done(Option<Block>),
    Children {
        resume: Resume<'a>,
        children: Vec<Work<'a>>,
    },
}

#[derive(Clone, Copy, Default)]
pub(super) struct LoopContext {
    pub(super) continuing_id: Option<Word>,
    pub(super) break_id: Option<Word>,
}

const fn selection_control(control: crate::SelectionControl) -> spirv::SelectionControl {
    match control {
        crate::SelectionControl::None => spirv::SelectionControl::NONE,
        crate::SelectionControl::Flatten => spirv::SelectionControl::FLATTEN,
        crate::SelectionControl::DontFlatten => spirv::SelectionControl::DONT_FLATTEN,
    }
}

impl BlockContext<'_> {
    fn write_block(
        &mut self,
        label_id: Word,
        rglsl_block: &crate::Block,
        exit: BlockExit,
        loop_context: LoopContext,
    ) -> Result<(), Error> {
        let mut work = Vec::from([Work::Block {
            label_id,
            ir: rglsl_block,
            exit,
            loop_context,
        }]);
        let mut finished = BlockExitDisposition::Used;
        while let Some(item) = work.pop() {
            match item {
                Work::Block {
                    label_id,
                    ir,
                    exit,
                    loop_context,
                } => work.push(Work::Frame(BlockFrame {
                    ir,
                    next: 0,
                    state: FrameState::Writing(Block::new(label_id)),
                    exit,
                    loop_context,
                })),
                Work::Branch { label_id, target } => self
                    .function
                    .consume(Block::new(label_id), Instruction::branch(target)),
                Work::Frame(frame) => {
                    if let Some(disposition) = self.write_frame(frame, finished, &mut work)? {
                        finished = disposition;
                    }
                }
            }
        }
        Ok(())
    }

    fn resume_frame(
        &mut self,
        state: FrameState<'_>,
        finished: BlockExitDisposition,
    ) -> Option<Block> {
        let (merge_id, statement) = match state {
            FrameState::Writing(block) => return Some(block),
            FrameState::Waiting(Resume::Scope {
                merge_id,
                statement,
            }) => match finished {
                BlockExitDisposition::Used => (merge_id, statement),
                BlockExitDisposition::Discarded => return None,
            },
            FrameState::Waiting(Resume::Merge {
                merge_id,
                statement,
            }) => (merge_id, statement),
        };
        let next = Block::new(merge_id);
        if self.reachability.completes(statement) {
            Some(next)
        } else {
            self.function
                .consume(next, Instruction::new(spirv::Op::Unreachable));
            None
        }
    }

    fn mark_statement_span(
        &mut self,
        block: &mut Block,
        statement: &Statement,
        span: crate::Span,
        nested: bool,
    ) {
        match *statement {
            Statement::Block(_) => {}
            Statement::Return { .. } => {
                if !span.is_defined() {
                    if !(nested && debug::ends_at_location(block)) {
                        self.writer.debug_mark_end(block);
                    }
                } else {
                    self.writer.debug_mark(block, span);
                }
            }
            Statement::If { condition, .. }
            | Statement::Switch {
                selector: condition,
                ..
            } => {
                if self.expression_constness.is_const(condition) {
                    self.writer.debug_mark_scope(block, span);
                } else {
                    self.writer.debug_mark(block, span);
                }
            }
            Statement::Emit(_)
            | Statement::Loop { .. }
            | Statement::Break
            | Statement::Continue
            | Statement::Kill
            | Statement::TerminateInvocation
            | Statement::Demote
            | Statement::BeginInvocationInterlock
            | Statement::EndInvocationInterlock
            | Statement::EmitVertex { .. }
            | Statement::EndPrimitive { .. }
            | Statement::ControlBarrier(_)
            | Statement::MemoryBarrier(_)
            | Statement::ScopedBarrier { .. }
            | Statement::SplitBarrier { .. }
            | Statement::Store { .. }
            | Statement::ImageStore { .. }
            | Statement::Atomic { .. }
            | Statement::AtomicLoad { .. }
            | Statement::AtomicStore { .. }
            | Statement::ImageAtomic { .. }
            | Statement::Call { .. }
            | Statement::RayQuery { .. }
            | Statement::RayPipelineFunction(_)
            | Statement::HitObject { .. }
            | Statement::ReorderThread { .. }
            | Statement::MeshFunction(_)
            | Statement::SubgroupBallot { .. }
            | Statement::SubgroupGather { .. }
            | Statement::SubgroupCollectiveOperation { .. }
            | Statement::SubgroupFunction { .. }
            | Statement::CooperativeStore { .. }
            | Statement::DebugPrintf { .. }
            | Statement::Assume { .. }
            | Statement::CooperativeVector(_)
            | Statement::CooperativeMatrix { .. }
            | Statement::Abort { .. }
            | Statement::TensorWrite { .. }
            | Statement::SpirvInstruction { .. } => self.writer.debug_mark(block, span),
        }
    }

    fn write_frame<'a>(
        &mut self,
        frame: BlockFrame<'a>,
        finished: BlockExitDisposition,
        work: &mut Vec<Work<'a>>,
    ) -> Result<Option<BlockExitDisposition>, Error> {
        let BlockFrame {
            ir,
            mut next,
            state,
            exit,
            loop_context,
        } = frame;
        let Some(mut block) = self.resume_frame(state, finished) else {
            return Ok(Some(BlockExitDisposition::Discarded));
        };
        let nested = !core::ptr::eq(ir, &self.ir_function.body);
        while let Some((statement, span)) = ir.span_at(next) {
            next += 1;
            self.mark_statement_span(&mut block, statement, *span, nested);
            match self.write_statement(block, statement, loop_context)? {
                Nested::Done(Some(next)) if !self.reachability.completes(statement) => {
                    self.function
                        .consume(next, Instruction::new(spirv::Op::Unreachable));
                    return Ok(Some(BlockExitDisposition::Discarded));
                }
                Nested::Done(Some(following)) => block = following,
                Nested::Done(None) => return Ok(Some(BlockExitDisposition::Discarded)),
                Nested::Children { resume, children } => {
                    work.push(Work::Frame(BlockFrame {
                        ir,
                        next,
                        state: FrameState::Waiting(resume),
                        exit,
                        loop_context,
                    }));
                    work.extend(children.into_iter().rev());
                    return Ok(None);
                }
            }
        }
        self.finish_block(block, exit, loop_context, nested)?;
        Ok(Some(BlockExitDisposition::Used))
    }

    fn finish_block(
        &mut self,
        block: Block,
        exit: BlockExit,
        loop_context: LoopContext,
        nested: bool,
    ) -> Result<(), Error> {
        let mut block = block;
        if let BlockExit::Return = exit
            && !(nested && debug::ends_at_location(&block))
        {
            self.writer.debug_mark_end(&mut block);
        }
        let termination = match exit {
            BlockExit::Return => match self.ir_function.result {
                Some(ref result) if self.function.entry_point_context.is_none() => {
                    let type_id = self.get_handle_type_id(result.ty)?;
                    Instruction::return_value(self.writer.get_undef(type_id))
                }
                _ => Instruction::return_void(),
            },
            BlockExit::Branch { target } => Instruction::branch(target),
            BlockExit::BreakIf {
                condition,
                preamble_id,
            } => {
                let condition_id = self.cached.get(condition)?;
                let Some(break_id) = loop_context.break_id else {
                    return Err(Error::Validation("break-if outside of a loop"));
                };

                Instruction::branch_conditional(condition_id, break_id, preamble_id)
            }
        };

        self.function.consume(block, termination);
        Ok(())
    }

    pub(super) fn write_scope<'a>(
        &mut self,
        block: Block,
        block_statements: &'a crate::Block,
        loop_context: LoopContext,
        statement: &'a Statement,
    ) -> Nested<'a> {
        let scope_id = self.gen_id();
        self.function.consume(block, Instruction::branch(scope_id));

        let merge_id = self.gen_id();
        Nested::Children {
            resume: Resume::Scope {
                merge_id,
                statement,
            },
            children: Vec::from([Work::Block {
                label_id: scope_id,
                ir: block_statements,
                exit: BlockExit::Branch { target: merge_id },
                loop_context,
            }]),
        }
    }

    pub(super) fn write_if<'a>(
        &mut self,
        block: Block,
        condition: Handle<crate::Expression>,
        [accept, reject]: [&'a crate::Block; 2],
        control: crate::SelectionControl,
        loop_context: LoopContext,
        statement: &'a Statement,
    ) -> Result<Nested<'a>, Error> {
        let mut block = block;
        let empty = accept.is_empty() && reject.is_empty();
        if empty && control.is_none() {
            return Ok(Nested::Done(Some(block)));
        }
        let condition_id = self.cached.get(condition)?;

        let merge_id = self.gen_id();
        block.body.push(Instruction::selection_merge(
            merge_id,
            selection_control(control),
        ));

        let accept_id = if accept.is_empty() && !empty {
            None
        } else {
            Some(self.gen_id())
        };
        let reject_id = if reject.is_empty() {
            None
        } else {
            Some(self.gen_id())
        };

        self.function.consume(
            block,
            Instruction::branch_conditional(
                condition_id,
                accept_id.unwrap_or(merge_id),
                reject_id.unwrap_or(merge_id),
            ),
        );

        let children = [(accept_id, accept), (reject_id, reject)]
            .into_iter()
            .filter_map(|(label_id, ir)| {
                label_id.map(|label_id| Work::Block {
                    label_id,
                    ir,
                    exit: BlockExit::Branch { target: merge_id },
                    loop_context,
                })
            })
            .collect();
        Ok(Nested::Children {
            resume: Resume::Merge {
                merge_id,
                statement,
            },
            children,
        })
    }

    pub(super) fn write_switch<'a>(
        &mut self,
        block: Block,
        selector: Handle<crate::Expression>,
        cases: &'a [crate::SwitchCase],
        control: crate::SelectionControl,
        loop_context: LoopContext,
        statement: &'a Statement,
    ) -> Result<Nested<'a>, Error> {
        let mut block = block;
        let selector_id = self.cached.get(selector)?;

        let merge_id = self.gen_id();
        block.body.push(Instruction::selection_merge(
            merge_id,
            selection_control(control),
        ));

        let mut default_id = None;
        let mut last_id = None;

        let mut raw_cases = Vec::with_capacity(cases.len());
        let mut case_ids = Vec::with_capacity(cases.len());
        for case in cases.iter() {
            let label_id = last_id.take().unwrap_or_else(|| self.gen_id());

            if case.fall_through && case.body.is_empty() {
                last_id = Some(label_id);
            }

            case_ids.push(label_id);

            match case.value {
                crate::SwitchValue::I32(value) => {
                    raw_cases.push(instructions::Case {
                        value: value as Word,
                        label_id,
                    });
                }
                crate::SwitchValue::U32(value) => {
                    raw_cases.push(instructions::Case { value, label_id });
                }
                crate::SwitchValue::Default => {
                    default_id = Some(label_id);
                }
            }
        }

        let Some(default_id) = default_id else {
            return Err(Error::Validation("switch has no default case"));
        };

        self.function.consume(
            block,
            Instruction::switch(selector_id, default_id, &raw_cases),
        );

        let inner_context = LoopContext {
            break_id: Some(merge_id),
            ..loop_context
        };

        let mut children = Vec::with_capacity(cases.len());
        for (i, (case, label_id)) in cases
            .iter()
            .zip(case_ids.iter())
            .enumerate()
            .filter(|&(_, (case, _))| !(case.fall_through && case.body.is_empty()))
        {
            let case_finish_id = if case.fall_through {
                case_ids[i + 1]
            } else {
                merge_id
            };
            children.push(Work::Block {
                label_id: *label_id,
                ir: &case.body,
                exit: BlockExit::Branch {
                    target: case_finish_id,
                },
                loop_context: inner_context,
            });
        }

        Ok(Nested::Children {
            resume: Resume::Merge {
                merge_id,
                statement,
            },
            children,
        })
    }

    pub(super) fn write_loop<'a>(
        &mut self,
        block: Block,
        (body, continuing): (&'a crate::Block, Option<&'a crate::Block>),
        break_if: Option<Handle<crate::Expression>>,
        control: crate::LoopControl,
        statement: &'a Statement,
    ) -> Nested<'a> {
        let mut block = block;
        let preamble_id = self.gen_id();
        self.function
            .consume(block, Instruction::branch(preamble_id));

        let merge_id = self.gen_id();
        let body_id = self.gen_id();
        let continuing_id = self.gen_id();

        block = Block::new(preamble_id);
        block
            .body
            .push(self.loop_merge(merge_id, continuing_id, control));

        self.function.consume(block, Instruction::branch(body_id));

        let body = Work::Block {
            label_id: body_id,
            ir: body,
            exit: BlockExit::Branch {
                target: continuing_id,
            },
            loop_context: LoopContext {
                continuing_id: Some(continuing_id),
                break_id: Some(merge_id),
            },
        };

        let continuing = match continuing {
            None => Work::Branch {
                label_id: continuing_id,
                target: preamble_id,
            },
            Some(continuing) => Work::Block {
                label_id: continuing_id,
                ir: continuing,
                exit: match break_if {
                    Some(condition) => BlockExit::BreakIf {
                        condition,
                        preamble_id,
                    },
                    None => BlockExit::Branch {
                        target: preamble_id,
                    },
                },
                loop_context: LoopContext {
                    continuing_id: None,
                    break_id: Some(merge_id),
                },
            },
        };

        Nested::Children {
            resume: Resume::Merge {
                merge_id,
                statement,
            },
            children: Vec::from([body, continuing]),
        }
    }

    pub(in super::super) fn write_function_body(&mut self, entry_id: Word) -> Result<(), Error> {
        let function = self.ir_function;
        self.write_block(
            entry_id,
            &function.body,
            BlockExit::Return,
            LoopContext::default(),
        )
    }
}
