use alloc::vec::Vec;

use rglsl_types::stack::recurse;
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

#[derive(Clone, Copy, Default)]
pub(super) struct LoopContext {
    pub(super) continuing_id: Option<Word>,
    pub(super) break_id: Option<Word>,
}

struct LoopTest {
    index: usize,
    condition: Handle<crate::Expression>,
    break_when: bool,
}

fn loop_test(body: &crate::Block) -> Option<LoopTest> {
    let index = body
        .iter()
        .position(|statement| !matches!(*statement, Statement::Emit(_)))?;
    let Statement::If {
        condition,
        ref accept,
        ref reject,
        control: crate::SelectionControl::None,
    } = body[index]
    else {
        return None;
    };
    let is_break = |block: &crate::Block| matches!(**block, [Statement::Break]);
    let break_when = match (is_break(accept), is_break(reject)) {
        (true, false) if reject.is_empty() => true,
        (false, true) if accept.is_empty() => false,
        _ => return None,
    };
    Some(LoopTest {
        index,
        condition,
        break_when,
    })
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
        ir: &crate::Block,
        exit: BlockExit,
        loop_context: LoopContext,
    ) -> Result<BlockExitDisposition, Error> {
        let nested = !core::ptr::eq(ir, &self.ir_function.body);
        let Some(block) =
            self.write_statements(Block::new(label_id), ir.span_iter(), nested, loop_context)?
        else {
            return Ok(BlockExitDisposition::Discarded);
        };
        self.finish_block(block, exit, loop_context, nested)?;
        Ok(BlockExitDisposition::Used)
    }

    fn write_statements<'s>(
        &mut self,
        block: Block,
        statements: impl Iterator<Item = (&'s Statement, &'s crate::Span)>,
        nested: bool,
        loop_context: LoopContext,
    ) -> Result<Option<Block>, Error> {
        let mut block = block;
        for (statement, span) in statements {
            self.mark_statement_span(&mut block, statement, *span, nested);
            match self.write_statement(block, statement, loop_context)? {
                Some(next) if !self.reachability.completes(statement) => {
                    self.function
                        .consume(next, Instruction::new(spirv::Op::Unreachable));
                    return Ok(None);
                }
                Some(following) => block = following,
                None => return Ok(None),
            }
        }
        Ok(Some(block))
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
            _ => self.writer.debug_mark(block, span),
        }
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

    pub(super) fn write_scope(
        &mut self,
        block: Block,
        block_statements: &crate::Block,
        loop_context: LoopContext,
    ) -> Result<Option<Block>, Error> {
        let scope_id = self.gen_id();
        self.function.consume(block, Instruction::branch(scope_id));

        let merge_id = self.gen_id();
        let disposition = recurse(|| {
            self.write_block(
                scope_id,
                block_statements,
                BlockExit::Branch { target: merge_id },
                loop_context,
            )
        })?;
        Ok(match disposition {
            BlockExitDisposition::Used => Some(Block::new(merge_id)),
            BlockExitDisposition::Discarded => None,
        })
    }

    pub(super) fn write_if(
        &mut self,
        block: Block,
        condition: Handle<crate::Expression>,
        [accept, reject]: [&crate::Block; 2],
        control: crate::SelectionControl,
        loop_context: LoopContext,
    ) -> Result<Option<Block>, Error> {
        let mut block = block;
        let empty = accept.is_empty() && reject.is_empty();
        if empty && control.is_none() {
            return Ok(Some(block));
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

        recurse(|| {
            for (label_id, ir) in [(accept_id, accept), (reject_id, reject)] {
                if let Some(label_id) = label_id {
                    let _ = self.write_block(
                        label_id,
                        ir,
                        BlockExit::Branch { target: merge_id },
                        loop_context,
                    )?;
                }
            }
            Ok(Some(Block::new(merge_id)))
        })
    }

    pub(super) fn write_switch(
        &mut self,
        block: Block,
        selector: Handle<crate::Expression>,
        cases: &[crate::SwitchCase],
        control: crate::SelectionControl,
        loop_context: LoopContext,
    ) -> Result<Option<Block>, Error> {
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

        recurse(|| {
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
                let _ = self.write_block(
                    *label_id,
                    &case.body,
                    BlockExit::Branch {
                        target: case_finish_id,
                    },
                    inner_context,
                )?;
            }
            Ok(Some(Block::new(merge_id)))
        })
    }

    pub(super) fn write_loop(
        &mut self,
        block: Block,
        (body, continuing): (&crate::Block, Option<&crate::Block>),
        break_if: Option<Handle<crate::Expression>>,
        control: crate::LoopControl,
    ) -> Result<Option<Block>, Error> {
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

        let body_context = LoopContext {
            continuing_id: Some(continuing_id),
            break_id: Some(merge_id),
        };
        recurse(|| {
            match loop_test(body) {
                Some(test) => {
                    self.write_loop_test(body_id, body, &test, merge_id, body_context)?;
                }
                None => {
                    let _ = self.write_block(
                        body_id,
                        body,
                        BlockExit::Branch {
                            target: continuing_id,
                        },
                        body_context,
                    )?;
                }
            }
            match continuing {
                None => self
                    .function
                    .consume(Block::new(continuing_id), Instruction::branch(preamble_id)),
                Some(continuing) => {
                    let _ = self.write_block(
                        continuing_id,
                        continuing,
                        match break_if {
                            Some(condition) => BlockExit::BreakIf {
                                condition,
                                preamble_id,
                            },
                            None => BlockExit::Branch {
                                target: preamble_id,
                            },
                        },
                        LoopContext {
                            continuing_id: None,
                            break_id: Some(merge_id),
                        },
                    )?;
                }
            }
            Ok(Some(Block::new(merge_id)))
        })
    }

    fn write_loop_test(
        &mut self,
        label_id: Word,
        body: &crate::Block,
        test: &LoopTest,
        merge_id: Word,
        body_context: LoopContext,
    ) -> Result<(), Error> {
        let Some(mut block) = self.write_statements(
            Block::new(label_id),
            body.span_iter().take(test.index),
            true,
            body_context,
        )?
        else {
            return Err(Error::Validation("loop condition does not complete"));
        };
        let Some((statement, span)) = body.span_iter().nth(test.index) else {
            return Err(Error::Validation("loop condition is missing"));
        };
        self.mark_statement_span(&mut block, statement, *span, true);
        let condition_id = self.cached.get(test.condition)?;
        let rest_id = self.gen_id();
        let (accept_id, reject_id) = if test.break_when {
            (merge_id, rest_id)
        } else {
            (rest_id, merge_id)
        };
        self.function.consume(
            block,
            Instruction::branch_conditional(condition_id, accept_id, reject_id),
        );
        let Some(continuing_id) = body_context.continuing_id else {
            return Err(Error::Validation("loop without a continuing block"));
        };
        if let Some(block) = self.write_statements(
            Block::new(rest_id),
            body.span_iter().skip(test.index + 1),
            true,
            body_context,
        )? {
            self.finish_block(
                block,
                BlockExit::Branch {
                    target: continuing_id,
                },
                body_context,
                true,
            )?;
        }
        Ok(())
    }

    pub(in super::super) fn write_function_body(&mut self, entry_id: Word) -> Result<(), Error> {
        let function = self.ir_function;
        let _ = self.write_block(
            entry_id,
            &function.body,
            BlockExit::Return,
            LoopContext::default(),
        )?;
        Ok(())
    }
}
