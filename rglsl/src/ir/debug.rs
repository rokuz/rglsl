use alloc::{string::String, vec::Vec};

#[cfg(feature = "arbitrary")]
use arbitrary::Arbitrary;
#[cfg(feature = "deserialize")]
use serde::Deserialize;
#[cfg(feature = "serialize")]
use serde::Serialize;

use crate::Span;

#[derive(Debug, Default, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugInfo {
    pub sources: Vec<DebugSource>,
    pub units: Vec<DebugUnit>,
    pub lines: Vec<DebugLine>,
    pub scopes: Vec<DebugScope>,
    pub structs: Vec<DebugStruct>,
    pub functions: Vec<DebugFunction>,
    pub anchors: Vec<DebugAnchor>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugAnchor {
    pub start: u32,
    pub end: u32,
    pub at: u32,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugSource {
    pub name: String,
    pub text: Option<String>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugUnit {
    pub source: u32,
    pub start: u32,
    pub end: u32,
    pub version: u32,
    pub entry: Option<u32>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugFunction {
    pub start: u32,
    pub stop: u32,
    pub at: DebugPosition,
    pub end: Option<DebugPosition>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugLine {
    pub offset: u32,
    pub source: u32,
    pub line: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugScope {
    pub start: u32,
    pub end: u32,
    pub at: DebugPosition,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugPosition {
    pub source: u32,
    pub line: u32,
    pub column: u32,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugStruct {
    pub name: String,
    pub unit: u32,
    pub at: DebugPosition,
    pub members: Vec<DebugMember>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
#[cfg_attr(feature = "arbitrary", derive(Arbitrary))]
pub struct DebugMember {
    pub name: String,
    pub at: DebugPosition,
    pub boolean: bool,
}

impl DebugInfo {
    pub fn line(&self, offset: u32) -> Option<&DebugLine> {
        let index = self.lines.partition_point(|line| line.offset <= offset);
        index.checked_sub(1).and_then(|index| self.lines.get(index))
    }

    pub fn position(&self, span: Span) -> Option<DebugPosition> {
        let range = span.to_range()?;
        let offset = u32::try_from(range.start).ok()?;
        self.line(offset).map(|line| DebugPosition {
            source: line.source,
            line: line.line,
            column: 0,
        })
    }

    pub fn unit_of(&self, offset: u32) -> Option<usize> {
        self.units
            .iter()
            .position(|unit| unit.start <= offset && offset <= unit.end)
    }

    pub fn source_name(&self, source: u32) -> Option<&str> {
        usize::try_from(source)
            .ok()
            .and_then(|index| self.sources.get(index))
            .map(|source| source.name.as_str())
    }

    pub fn scope_index(&self) -> ScopeIndex {
        let mut order: Vec<(u32, u32, usize)> = self
            .scopes
            .iter()
            .enumerate()
            .map(|(index, scope)| (scope.start, scope.end.max(scope.start), index))
            .collect();
        order.sort_by(|a, b| a.0.cmp(&b.0).then(b.1.cmp(&a.1)));
        let mut parents = alloc::vec![None; self.scopes.len()];
        let mut breaks: Vec<(u32, Option<usize>)> = Vec::new();
        let mut stack: Vec<(u32, usize)> = Vec::new();
        for (start, end, index) in order {
            while let Some(&(top_end, _)) = stack.last() {
                if top_end >= start {
                    break;
                }
                stack.pop();
                breaks.push((
                    top_end.saturating_add(1),
                    stack.last().map(|&(_, index)| index),
                ));
            }
            if let Some(slot) = parents.get_mut(index) {
                *slot = stack.last().map(|&(_, index)| index);
            }
            stack.push((end, index));
            breaks.push((start, Some(index)));
        }
        while let Some((top_end, _)) = stack.pop() {
            breaks.push((
                top_end.saturating_add(1),
                stack.last().map(|&(_, index)| index),
            ));
        }
        breaks.sort_by_key(|&(offset, _)| offset);
        ScopeIndex { breaks, parents }
    }

    pub fn shift(&mut self, offset: u32, sources: u32) {
        for unit in &mut self.units {
            unit.source = unit.source.saturating_add(sources);
            unit.start = unit.start.saturating_add(offset);
            unit.end = unit.end.saturating_add(offset);
            unit.entry = unit.entry.map(|entry| entry.saturating_add(offset));
        }
        for function in &mut self.functions {
            function.start = function.start.saturating_add(offset);
            function.stop = function.stop.saturating_add(offset);
            function.at.source = function.at.source.saturating_add(sources);
            if let Some(ref mut end) = function.end {
                end.source = end.source.saturating_add(sources);
            }
        }
        for line in &mut self.lines {
            line.offset = line.offset.saturating_add(offset);
            line.source = line.source.saturating_add(sources);
        }
        for scope in &mut self.scopes {
            scope.start = scope.start.saturating_add(offset);
            scope.end = scope.end.saturating_add(offset);
            scope.at.source = scope.at.source.saturating_add(sources);
        }
        for anchor in &mut self.anchors {
            anchor.start = anchor.start.saturating_add(offset);
            anchor.end = anchor.end.saturating_add(offset);
            anchor.at = anchor.at.saturating_add(offset);
        }
        for structure in &mut self.structs {
            structure.at.source = structure.at.source.saturating_add(sources);
            for member in &mut structure.members {
                member.at.source = member.at.source.saturating_add(sources);
            }
        }
    }

    pub fn append(&mut self, mut other: Self, offset: u32) {
        let sources = u32::try_from(self.sources.len()).unwrap_or(u32::MAX);
        let units = u32::try_from(self.units.len()).unwrap_or(u32::MAX);
        other.shift(offset, sources);
        for structure in &mut other.structs {
            structure.unit = structure.unit.saturating_add(units);
        }
        self.sources.append(&mut other.sources);
        self.units.append(&mut other.units);
        self.lines.append(&mut other.lines);
        self.scopes.append(&mut other.scopes);
        self.structs.append(&mut other.structs);
        self.functions.append(&mut other.functions);
        self.anchors.append(&mut other.anchors);
    }

    pub fn anchor(&self, span: Span) -> Option<u32> {
        let range = span.to_range()?;
        let start = u32::try_from(range.start).ok()?;
        let end = u32::try_from(range.end).ok()?;
        let index = self
            .anchors
            .partition_point(|anchor| (anchor.start, anchor.end) < (start, end));
        match self.anchors.get(index) {
            Some(anchor) if anchor.start == start && anchor.end == end => Some(anchor.at),
            _ => Some(start),
        }
    }

    pub fn function(&self, start: u32) -> Option<&DebugFunction> {
        let index = self
            .functions
            .partition_point(|function| function.start < start);
        self.functions
            .get(index)
            .filter(|function| function.start == start)
    }

    pub fn entry_function(&self) -> Option<&DebugFunction> {
        self.units
            .iter()
            .find_map(|unit| unit.entry)
            .and_then(|start| self.function(start))
    }

    pub fn end(&self) -> u32 {
        self.units.iter().map(|unit| unit.end).max().unwrap_or(0)
    }
}

#[derive(Debug, Clone, Default)]
pub struct ScopeIndex {
    breaks: Vec<(u32, Option<usize>)>,
    parents: Vec<Option<usize>>,
}

impl ScopeIndex {
    pub fn at(&self, offset: u32) -> Option<usize> {
        let index = self.breaks.partition_point(|&(start, _)| start <= offset);
        index
            .checked_sub(1)
            .and_then(|index| self.breaks.get(index))
            .and_then(|&(_, scope)| scope)
    }

    pub fn parent(&self, scope: usize) -> Option<usize> {
        self.parents.get(scope).copied().flatten()
    }
}

pub fn shift_span(span: Span, offset: u32) -> Span {
    match span.to_range() {
        Some(range) => {
            let start = u32::try_from(range.start).unwrap_or(u32::MAX);
            let end = u32::try_from(range.end).unwrap_or(u32::MAX);
            Span::new(start.saturating_add(offset), end.saturating_add(offset))
        }
        None => span,
    }
}

#[derive(Debug, Default, Clone, PartialEq, Eq)]
#[cfg_attr(feature = "serialize", derive(Serialize))]
#[cfg_attr(feature = "deserialize", derive(Deserialize))]
pub struct ModuleSpans {
    pub spans: Vec<[u32; 2]>,
}

fn function_span_slots<'a>(function: &'a mut crate::Function, slots: &mut Vec<&'a mut Span>) {
    slots.extend(function.local_variables.spans_mut().iter_mut());
    slots.extend(function.expressions.spans_mut().iter_mut());
    let mut blocks: Vec<&'a mut crate::Block> = Vec::from([&mut function.body]);
    while let Some(block) = blocks.pop() {
        let mut children: Vec<&'a mut crate::Block> = Vec::new();
        for (statement, span) in block.span_iter_mut() {
            if let Some(span) = span {
                slots.push(span);
            }
            children.extend(statement.child_blocks_mut());
        }
        children.reverse();
        blocks.append(&mut children);
    }
}

fn span_slots(module: &mut crate::Module) -> Vec<&mut Span> {
    let mut slots: Vec<&mut Span> = Vec::new();
    slots.extend(module.types.spans_mut().iter_mut());
    slots.extend(module.constants.spans_mut().iter_mut());
    slots.extend(module.overrides.spans_mut().iter_mut());
    slots.extend(module.global_variables.spans_mut().iter_mut());
    slots.extend(module.global_expressions.spans_mut().iter_mut());
    let (spans, functions) = module.functions.spans_and_values_mut();
    slots.extend(spans.iter_mut());
    for function in functions {
        function_span_slots(function, &mut slots);
    }
    for entry in &mut module.entry_points {
        function_span_slots(&mut entry.function, &mut slots);
    }
    slots
}

pub fn collect_spans(module: &mut crate::Module) -> ModuleSpans {
    ModuleSpans {
        spans: span_slots(module)
            .into_iter()
            .map(|span| {
                span.to_range().map_or([0, 0], |range| {
                    [
                        u32::try_from(range.start).unwrap_or(u32::MAX),
                        u32::try_from(range.end).unwrap_or(u32::MAX),
                    ]
                })
            })
            .collect(),
    }
}

pub fn apply_spans(module: &mut crate::Module, spans: &ModuleSpans) -> bool {
    let slots = span_slots(module);
    if slots.len() != spans.spans.len() {
        return false;
    }
    for (slot, &[start, end]) in slots.into_iter().zip(&spans.spans) {
        *slot = Span::new(start, end);
    }
    true
}

pub fn shift_module_spans(module: &mut crate::Module, offset: u32) {
    for slot in span_slots(module) {
        *slot = shift_span(*slot, offset);
    }
}
