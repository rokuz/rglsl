use alloc::vec::Vec;
use core::ops::{Deref, DerefMut, RangeBounds};

use crate::{Span, Statement};

/// A code block is a vector of statements, with maybe a vector of spans.
#[derive(Debug, Default)]
#[cfg_attr(feature = "serialize", derive(serde::Serialize))]
#[cfg_attr(feature = "serialize", serde(transparent))]
#[cfg_attr(feature = "arbitrary", derive(arbitrary::Arbitrary))]
pub struct Block {
    body: Vec<Statement>,
    #[cfg_attr(feature = "serialize", serde(skip))]
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

    #[allow(unused_variables)]
    pub fn push(&mut self, end: Statement, span: Span) {
        self.body.push(end);
        self.span_info.push(span);
    }

    pub fn extend(&mut self, item: Option<(Statement, Span)>) {
        if let Some((end, span)) = item {
            self.push(end, span)
        }
    }

    pub fn extend_block(&mut self, other: Self) {
        self.span_info.extend(other.span_info);
        self.body.extend(other.body);
    }

    pub fn append(&mut self, other: &mut Self) {
        self.span_info.append(&mut other.span_info);
        self.body.append(&mut other.body);
    }

    pub fn cull<R: RangeBounds<usize> + Clone>(&mut self, range: R) {
        self.span_info.drain(range.clone());
        self.body.drain(range);
    }

    pub fn splice<R: RangeBounds<usize> + Clone>(&mut self, range: R, other: Self) {
        self.span_info.splice(range.clone(), other.span_info);
        self.body.splice(range, other.body);
    }

    pub fn span_into_iter(self) -> impl Iterator<Item = (Statement, Span)> {
        let Block { body, span_info } = self;
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
    ) {
        for (target, source) in target.body.iter_mut().zip(&source.body) {
            pending.extend(
                target
                    .child_blocks_mut()
                    .into_iter()
                    .zip(source.child_blocks()),
            );
        }
    }
}

impl Clone for Block {
    fn clone(&self) -> Self {
        let mut root = self.shallow_clone();
        let mut pending = Vec::new();
        Self::pair_children(&mut root, self, &mut pending);
        while let Some((target, source)) = pending.pop() {
            *target = source.shallow_clone();
            Self::pair_children(target, source, &mut pending);
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
            _ => self.clone(),
        }
    }

    pub fn child_blocks(&self) -> Vec<&Block> {
        match *self {
            Self::Block(ref block) => Vec::from([block]),
            Self::If {
                ref accept,
                ref reject,
                ..
            } => Vec::from([accept, reject]),
            Self::Switch { ref cases, .. } => cases.iter().map(|case| &case.body).collect(),
            Self::Loop {
                ref body,
                ref continuing,
                ..
            } => Vec::from([body, continuing]),
            _ => Vec::new(),
        }
    }

    pub fn child_blocks_mut(&mut self) -> Vec<&mut Block> {
        match *self {
            Self::Block(ref mut block) => Vec::from([block]),
            Self::If {
                ref mut accept,
                ref mut reject,
                ..
            } => Vec::from([accept, reject]),
            Self::Switch { ref mut cases, .. } => {
                cases.iter_mut().map(|case| &mut case.body).collect()
            }
            Self::Loop {
                ref mut body,
                ref mut continuing,
                ..
            } => Vec::from([body, continuing]),
            _ => Vec::new(),
        }
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

#[cfg(feature = "deserialize")]
impl<'de> serde::Deserialize<'de> for Block {
    fn deserialize<D>(deserializer: D) -> Result<Self, D::Error>
    where
        D: serde::Deserializer<'de>,
    {
        Ok(Self::from_vec(Vec::deserialize(deserializer)?))
    }
}

impl From<Vec<Statement>> for Block {
    fn from(body: Vec<Statement>) -> Self {
        Self::from_vec(body)
    }
}
