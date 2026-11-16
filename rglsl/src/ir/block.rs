#![warn(clippy::wildcard_enum_match_arm)]

use alloc::vec::Vec;
use core::ops::{Deref, DerefMut, RangeBounds};

use crate::{Span, Statement};

/// A code block is a vector of statements, with maybe a vector of spans.
#[derive(Debug, Default)]
pub struct Block {
    body: Vec<Statement>,
    span_info: Vec<Span>,
}

impl Block {
    pub const fn new() -> Self {
        Self {
            body: Vec::new(),
            span_info: Vec::new(),
        }
    }

    pub fn from_vec(body: Vec<Statement>) -> Self {
        let span_info = core::iter::repeat_n(Span::default(), body.len()).collect();
        Self { body, span_info }
    }

    pub fn with_capacity(capacity: usize) -> Self {
        Self {
            body: Vec::with_capacity(capacity),
            span_info: Vec::with_capacity(capacity),
        }
    }

    pub fn push(&mut self, end: Statement, span: Span) {
        self.body.push(end);
        self.span_info.push(span);
    }

    pub fn extend(&mut self, item: Option<(Statement, Span)>) {
        if let Some((end, span)) = item {
            self.push(end, span);
        }
    }

    pub fn extend_block(&mut self, mut other: Self) {
        self.append(&mut other);
    }

    pub fn append(&mut self, other: &mut Self) {
        self.span_info.append(&mut other.span_info);
        self.body.append(&mut other.body);
    }

    pub fn cull<R: RangeBounds<usize> + Clone>(&mut self, range: R) {
        self.span_info.drain(range.clone());
        self.body.drain(range);
    }

    pub fn splice<R: RangeBounds<usize> + Clone>(&mut self, range: R, mut other: Self) {
        self.span_info
            .splice(range.clone(), core::mem::take(&mut other.span_info));
        self.body.splice(range, core::mem::take(&mut other.body));
    }

    pub fn span_into_iter(mut self) -> impl Iterator<Item = (Statement, Span)> {
        let body = core::mem::take(&mut self.body);
        let span_info = core::mem::take(&mut self.span_info);
        body.into_iter().zip(span_info)
    }

    pub fn span_iter(&self) -> impl Iterator<Item = (&Statement, &Span)> {
        let span_iter = self.span_info.iter();
        self.body.iter().zip(span_iter)
    }

    pub fn span_iter_mut(&mut self) -> impl Iterator<Item = (&mut Statement, Option<&mut Span>)> {
        let span_iter = self.span_info.iter_mut().map(Some);
        self.body.iter_mut().zip(span_iter)
    }

    pub fn walk(&self) -> Walk<'_> {
        Walk {
            pending: Vec::from([self.body.iter()]),
        }
    }

    pub fn visit_blocks_mut(&mut self, mut visit: impl FnMut(&mut Self)) {
        let mut pending = Vec::from([self]);
        while let Some(block) = pending.pop() {
            visit(block);
            for statement in block.body.iter_mut().rev() {
                let start = pending.len();
                statement.for_each_child_block_mut(|child| pending.push(child));
                pending[start..].reverse();
            }
        }
    }

    pub fn span_at(&self, index: usize) -> Option<(&Statement, &Span)> {
        self.body.get(index).zip(self.span_info.get(index))
    }

    pub const fn is_empty(&self) -> bool {
        self.body.is_empty()
    }

    pub const fn len(&self) -> usize {
        self.body.len()
    }

    pub fn shallow_clone(&self) -> Self {
        Self {
            body: self.body.iter().map(Statement::shell).collect(),
            span_info: self.span_info.clone(),
        }
    }

    fn pair_children<'d, 's>(
        target: &'d mut Self,
        source: &'s Self,
        pending: &mut Vec<(&'d mut Self, &'s Self)>,
        sources: &mut Vec<&'s Self>,
    ) {
        for (target, source) in target.body.iter_mut().zip(&source.body) {
            sources.clear();
            source.for_each_child_block(|child| sources.push(child));
            let mut children = sources.iter();
            target.for_each_child_block_mut(|child| {
                if let Some(&source) = children.next() {
                    pending.push((child, source));
                }
            });
        }
    }
}

#[derive(Clone, Debug)]
pub struct Walk<'a> {
    pending: Vec<core::slice::Iter<'a, Statement>>,
}

impl<'a> Iterator for Walk<'a> {
    type Item = &'a Statement;

    fn next(&mut self) -> Option<&'a Statement> {
        loop {
            let top = self.pending.last_mut()?;
            let Some(statement) = top.next() else {
                self.pending.pop();
                continue;
            };
            let start = self.pending.len();
            statement.for_each_child_block(|child| self.pending.push(child.iter()));
            self.pending[start..].reverse();
            return Some(statement);
        }
    }
}

impl Drop for Block {
    fn drop(&mut self) {
        if !self.body.iter().any(Statement::has_child_blocks) {
            return;
        }
        let mut pending = Vec::new();
        for statement in &mut self.body {
            statement.for_each_child_block_mut(|child| pending.push(core::mem::take(child)));
        }
        while let Some(mut block) = pending.pop() {
            for statement in &mut block.body {
                statement.for_each_child_block_mut(|child| pending.push(core::mem::take(child)));
            }
        }
    }
}

impl Clone for Block {
    fn clone(&self) -> Self {
        let mut root = self.shallow_clone();
        let mut pending = Vec::new();
        let mut sources = Vec::new();
        Self::pair_children(&mut root, self, &mut pending, &mut sources);
        while let Some((target, source)) = pending.pop() {
            *target = source.shallow_clone();
            Self::pair_children(target, source, &mut pending, &mut sources);
        }
        drop(pending);
        root
    }
}

impl Statement {
    pub fn shell(&self) -> Self {
        match *self {
            Self::Block(_) => Self::Block(Block::new()),
            Self::If {
                condition, control, ..
            } => Self::If {
                condition,
                accept: Block::new(),
                reject: Block::new(),
                control,
            },
            Self::Switch {
                selector,
                ref cases,
                control,
            } => Self::Switch {
                selector,
                cases: cases
                    .iter()
                    .map(|case| crate::SwitchCase {
                        value: case.value,
                        body: Block::new(),
                        fall_through: case.fall_through,
                    })
                    .collect(),
                control,
            },
            Self::Loop {
                break_if, control, ..
            } => Self::Loop {
                body: Block::new(),
                continuing: Block::new(),
                break_if,
                control,
            },
            Self::Emit(_)
            | Self::Break
            | Self::Continue
            | Self::Return { .. }
            | Self::Kill
            | Self::TerminateInvocation
            | Self::Demote
            | Self::BeginInvocationInterlock
            | Self::EndInvocationInterlock
            | Self::EmitVertex { .. }
            | Self::EndPrimitive { .. }
            | Self::ControlBarrier(_)
            | Self::MemoryBarrier(_)
            | Self::ScopedBarrier { .. }
            | Self::SplitBarrier { .. }
            | Self::Store { .. }
            | Self::ImageStore { .. }
            | Self::Atomic { .. }
            | Self::AtomicLoad { .. }
            | Self::AtomicStore { .. }
            | Self::ImageAtomic { .. }
            | Self::Call { .. }
            | Self::RayQuery { .. }
            | Self::RayPipelineFunction(_)
            | Self::HitObject { .. }
            | Self::ReorderThread { .. }
            | Self::MeshFunction(_)
            | Self::SubgroupBallot { .. }
            | Self::SubgroupGather { .. }
            | Self::SubgroupCollectiveOperation { .. }
            | Self::SubgroupFunction { .. }
            | Self::CooperativeStore { .. }
            | Self::DebugPrintf { .. }
            | Self::Assume { .. }
            | Self::CooperativeVector(_)
            | Self::CooperativeMatrix { .. }
            | Self::Abort { .. }
            | Self::TensorWrite { .. }
            | Self::SpirvInstruction { .. } => self.clone(),
        }
    }

    fn has_child_blocks(&self) -> bool {
        let mut found = false;
        self.for_each_child_block(|_| found = true);
        found
    }

    pub fn child_blocks(&self) -> Vec<&Block> {
        let mut children = Vec::new();
        self.for_each_child_block(|child| children.push(child));
        children
    }

    pub fn child_blocks_mut(&mut self) -> Vec<&mut Block> {
        let mut children = Vec::new();
        self.for_each_child_block_mut(|child| children.push(child));
        children
    }
}

impl Deref for Block {
    type Target = [Statement];
    fn deref(&self) -> &[Statement] {
        &self.body
    }
}

impl DerefMut for Block {
    fn deref_mut(&mut self) -> &mut [Statement] {
        &mut self.body
    }
}

impl<'a> IntoIterator for &'a Block {
    type Item = &'a Statement;
    type IntoIter = core::slice::Iter<'a, Statement>;

    fn into_iter(self) -> core::slice::Iter<'a, Statement> {
        self.iter()
    }
}

#[cfg(feature = "arbitrary")]
impl<'a> arbitrary::Arbitrary<'a> for Block {
    fn arbitrary(u: &mut arbitrary::Unstructured<'a>) -> arbitrary::Result<Self> {
        let mut block = Self::new();
        for item in u.arbitrary_iter::<(Statement, Span)>()? {
            let (statement, span) = item?;
            block.push(statement, span);
        }
        Ok(block)
    }

    fn arbitrary_take_rest(u: arbitrary::Unstructured<'a>) -> arbitrary::Result<Self> {
        let mut block = Self::new();
        for item in u.arbitrary_take_rest_iter::<(Statement, Span)>()? {
            let (statement, span) = item?;
            block.push(statement, span);
        }
        Ok(block)
    }

    fn size_hint(depth: usize) -> (usize, Option<usize>) {
        <Vec<(Statement, Span)> as arbitrary::Arbitrary>::size_hint(depth)
    }
}

impl From<Vec<Statement>> for Block {
    fn from(body: Vec<Statement>) -> Self {
        Self::from_vec(body)
    }
}

#[cfg(all(test, feature = "arbitrary"))]
mod tests {
    use alloc::vec::Vec;

    use arbitrary::{Arbitrary as _, Unstructured};

    use super::Block;

    #[test]
    fn arbitrary_blocks_keep_one_span_per_statement() {
        let mut generated = 0;
        for seed in 0..=u8::MAX {
            let bytes: Vec<u8> = (0..256u16)
                .map(|index| (index as u8).wrapping_mul(seed).rotate_left(3) ^ seed)
                .collect();
            let mut pending: Vec<Block> = [
                Block::arbitrary(&mut Unstructured::new(&bytes)),
                Block::arbitrary_take_rest(Unstructured::new(&bytes)),
            ]
            .into_iter()
            .flatten()
            .collect();
            generated += pending.len();
            while let Some(mut block) = pending.pop() {
                assert_eq!(block.span_info.len(), block.body.len());
                for statement in &mut block.body {
                    pending.extend(
                        statement
                            .child_blocks_mut()
                            .into_iter()
                            .map(core::mem::take),
                    );
                }
            }
        }
        assert!(generated > 0);
    }
}
