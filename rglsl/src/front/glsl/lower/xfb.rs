use alloc::{collections::BTreeMap, format, string::String, vec::Vec};

use rglsl_ast::ast::{SingleTypeQualifier, Spanned, TypeQualifier};
use rglsl_sema::scope::Qualifiers;

use super::{internal, semantic, Lowerer, Result};
use crate::{GlobalVariable, Handle, Span, Type, TypeInner, UniqueArena, XfbBinding};

const MAX_STRIDE: u32 = 4 * 64;

#[derive(Debug, Default)]
pub(super) struct Xfb {
    pub mode: bool,
    pub default_buffer: Option<Option<u32>>,
    strides: BTreeMap<u32, u32>,
    buffers: BTreeMap<u32, Capture>,
    globals: Vec<(Handle<GlobalVariable>, u32, Option<u32>)>,
    pub pending: Vec<Handle<GlobalVariable>>,
    pub per_vertex: Option<PerVertexXfb>,
}

#[derive(Debug, Default)]
pub(super) struct PerVertexXfb {
    pub buffer: u32,
    pub offsets: BTreeMap<String, u32>,
}

#[derive(Debug, Default)]
struct Capture {
    implicit: u32,
    widths: Widths,
    ranges: Vec<(u32, u32)>,
}

#[derive(Clone, Copy, Debug, Default)]
pub(super) struct Widths {
    wide: bool,
    normal: bool,
    half: bool,
}

impl Xfb {
    pub(super) fn declared_strides(&self) -> Vec<(u32, u32)> {
        self.strides
            .iter()
            .map(|(&buffer, &stride)| (buffer, stride))
            .collect()
    }

    pub(super) fn new() -> Self {
        Self::default()
    }
}

impl Lowerer<'_> {
    pub(super) fn xfb_default_buffer(&self) -> Option<u32> {
        match self.xfb.default_buffer {
            Some(buffer) => buffer,
            None => self
                .stage_map(|stage| {
                    matches!(
                        stage,
                        crate::ShaderStage::Vertex
                            | crate::ShaderStage::TessEvaluation
                            | crate::ShaderStage::Geometry
                    )
                })
                .then_some(0),
        }
    }
}

impl Widths {
    const fn merge(self, other: Self) -> Self {
        Self {
            wide: self.wide || other.wide,
            normal: self.normal || other.normal,
            half: self.half || other.half,
        }
    }

    const fn alignment(self) -> u32 {
        if self.wide {
            8
        } else if self.normal {
            4
        } else if self.half {
            2
        } else {
            1
        }
    }
}

const fn round_up(value: u32, alignment: u32) -> u32 {
    match value.checked_next_multiple_of(alignment) {
        Some(rounded) => rounded,
        None => u32::MAX,
    }
}

pub(super) fn size(types: &UniqueArena<Type>, ty: Handle<Type>) -> Option<(u32, Widths)> {
    let component = |scalar: crate::Scalar, count: u32| {
        let (bytes, widths) = match (scalar.kind, scalar.width) {
            (crate::ScalarKind::Bool, _) | (_, 4) => (
                4,
                Widths {
                    normal: true,
                    ..Widths::default()
                },
            ),
            (_, 8) => (
                8,
                Widths {
                    wide: true,
                    ..Widths::default()
                },
            ),
            (_, 2) => (
                2,
                Widths {
                    half: true,
                    ..Widths::default()
                },
            ),
            (_, width) => (u32::from(width), Widths::default()),
        };
        Some((bytes.saturating_mul(count), widths))
    };
    enum Task {
        Visit(Handle<Type>),
        Repeat(u32),
        Members(usize),
    }
    let mut tasks = alloc::vec![Task::Visit(ty)];
    let mut sizes: Vec<(u32, Widths)> = Vec::new();
    while let Some(task) = tasks.pop() {
        match task {
            Task::Visit(ty) => match types[ty].inner {
                TypeInner::Scalar(scalar) => sizes.push(component(scalar, 1)?),
                TypeInner::Vector { size, scalar } => sizes.push(component(scalar, size as u32)?),
                TypeInner::Matrix {
                    columns,
                    rows,
                    scalar,
                } => sizes.push(component(
                    scalar,
                    (columns as u32).saturating_mul(rows as u32),
                )?),
                TypeInner::Array {
                    base,
                    size: crate::ArraySize::Constant(length),
                    ..
                } => {
                    tasks.push(Task::Repeat(length.get()));
                    tasks.push(Task::Visit(base));
                }
                TypeInner::Struct { ref members, .. } => {
                    tasks.push(Task::Members(members.len()));
                    tasks.extend(members.iter().rev().map(|member| Task::Visit(member.ty)));
                }
                _ => return None,
            },
            Task::Repeat(length) => {
                let (bytes, widths) = sizes.pop()?;
                sizes.push((bytes.saturating_mul(length), widths));
            }
            Task::Members(count) => {
                let start = sizes.len().checked_sub(count)?;
                let mut total = 0_u32;
                let mut widths = Widths::default();
                for (bytes, member_widths) in sizes.drain(start..) {
                    total = round_up(total, member_widths.alignment());
                    total = total.saturating_add(bytes);
                    widths = widths.merge(member_widths);
                }
                sizes.push((round_up(total, widths.alignment()), widths));
            }
        }
    }
    sizes.pop()
}

pub(super) fn ast_layout_value<'q>(
    lowerer: &Lowerer<'_>,
    qualifier: impl IntoIterator<Item = &'q Spanned<TypeQualifier>>,
    name: &str,
) -> Option<u32> {
    ast_layout_signed(lowerer, qualifier, name).and_then(|value| u32::try_from(value).ok())
}

pub(super) fn ast_layout_signed<'q>(
    lowerer: &Lowerer<'_>,
    qualifier: impl IntoIterator<Item = &'q Spanned<TypeQualifier>>,
    name: &str,
) -> Option<i64> {
    let mut found = None;
    for qualifier in qualifier {
        for single in &qualifier.qualifiers {
            if let SingleTypeQualifier::Layout(ref layout) = single.node {
                for id in layout.ids.iter().filter(|id| id.name.node == name) {
                    found = id
                        .value
                        .as_ref()
                        .and_then(|value| lowerer.analysis.expression(value.id))
                        .and_then(|info| info.value.as_ref())
                        .and_then(rglsl_sema::constant::Constant::scalar_i64);
                }
            }
        }
    }
    found
}

pub(super) fn layout_value(qualifiers: &Qualifiers, name: &str) -> Option<u32> {
    qualifiers
        .layout_entry(name)
        .and_then(|entry| entry.value)
        .and_then(|value| u32::try_from(value).ok())
}

pub(super) fn has_xfb(qualifiers: &Qualifiers) -> bool {
    qualifiers
        .layout
        .iter()
        .any(|entry| entry.name.starts_with("xfb_"))
}

impl Lowerer<'_> {
    pub(super) fn xfb_stride(&mut self, buffer: u32, stride: u32, at: Span) -> Result<()> {
        match self.xfb.strides.get(&buffer) {
            Some(&existing) if existing != stride => Err(semantic(
                format!("all stride settings must match for xfb buffer {buffer}"),
                at,
            )),
            Some(_) => Ok(()),
            None => {
                self.xfb.strides.insert(buffer, stride);
                Ok(())
            }
        }
    }

    pub(super) fn xfb_capture(
        &mut self,
        buffer: u32,
        offset: u32,
        ty: Handle<Type>,
        at: Span,
    ) -> Result<()> {
        if let TypeInner::Array {
            size: crate::ArraySize::Dynamic,
            ..
        } = self.module.types[ty].inner
        {
            return Err(semantic(
                format!("xfb_offset: unsized array in buffer {buffer}"),
                at,
            ));
        }
        let (bytes, widths) = size(&self.module.types, ty).ok_or_else(|| internal(at))?;
        let capture = self.xfb.buffers.entry(buffer).or_default();
        let end = offset.saturating_add(bytes);
        capture.implicit = capture.implicit.max(end);
        capture.widths = capture.widths.merge(widths);
        let last = end.saturating_sub(1).max(offset);
        if let Some(&(start, _)) = capture
            .ranges
            .iter()
            .find(|&&(start, stop)| offset <= stop && start <= last)
        {
            return Err(semantic(
                format!(
                    "overlapping offsets at xfb_offset: offset {} in buffer {buffer}",
                    start.max(offset)
                ),
                at,
            ));
        }
        capture.ranges.push((offset, last));
        if widths.wide && !offset.is_multiple_of(8) {
            return Err(semantic(
                "type contains double or 64-bit integer; xfb_offset must be a multiple of 8",
                at,
            ));
        }
        if !widths.wide && widths.normal && !offset.is_multiple_of(4) {
            return Err(semantic(
                "xfb_offset must be a multiple of size of first component",
                at,
            ));
        }
        if !widths.wide && !widths.normal && widths.half && !offset.is_multiple_of(2) {
            return Err(semantic(
                "type contains half float or 16-bit integer; xfb_offset must be a multiple of 2",
                at,
            ));
        }
        Ok(())
    }

    pub(super) fn xfb_global(
        &mut self,
        handle: Handle<GlobalVariable>,
        buffer: u32,
        offset: Option<u32>,
    ) {
        self.xfb.globals.push((handle, buffer, offset));
    }

    pub(super) fn xfb_member_offsets(
        &mut self,
        block_offset: Option<u32>,
        members: &[(Handle<Type>, Option<u32>)],
        at: Span,
    ) -> Result<Vec<Option<u32>>> {
        let Some(mut next) = block_offset else {
            return Ok(members.iter().map(|&(_, offset)| offset).collect());
        };
        let mut offsets = Vec::with_capacity(members.len());
        for &(ty, explicit) in members {
            let (bytes, widths) = match self.module.types[ty].inner {
                TypeInner::Array {
                    size: crate::ArraySize::Dynamic,
                    ..
                } => (0, Widths::default()),
                _ => size(&self.module.types, ty).ok_or_else(|| internal(at))?,
            };
            let offset = match explicit {
                Some(offset) => offset,
                None => round_up(next, widths.alignment()),
            };
            offsets.push(Some(offset));
            next = offset.saturating_add(bytes);
        }
        Ok(offsets)
    }

    pub(super) fn finish_xfb(&mut self) {
        if !self.xfb.mode {
            return;
        }
        let pending = core::mem::take(&mut self.xfb.pending);
        if !pending.is_empty() {
            let stage_default = self.stage_map(|stage| {
                matches!(
                    stage,
                    crate::ShaderStage::Vertex
                        | crate::ShaderStage::TessEvaluation
                        | crate::ShaderStage::Geometry
                )
            });
            if stage_default {
                for handle in pending {
                    self.xfb.globals.push((handle, 0, None));
                }
            }
        }
        let mut strides = BTreeMap::new();
        let buffers: Vec<u32> = self
            .xfb
            .buffers
            .keys()
            .chain(self.xfb.strides.keys())
            .copied()
            .chain(self.xfb.globals.iter().map(|&(_, buffer, _)| buffer))
            .collect();
        for buffer in buffers {
            if strides.contains_key(&buffer) {
                continue;
            }
            let (implicit, widths) =
                self.xfb
                    .buffers
                    .get(&buffer)
                    .map_or((0, Widths::default()), |capture| {
                        (
                            round_up(capture.implicit, capture.widths.alignment()),
                            capture.widths,
                        )
                    });
            let explicit = self.xfb.strides.get(&buffer).copied();
            if let Some(explicit) = explicit {
                if implicit > explicit {
                    self.errors.push(semantic(
                        format!(
                            "xfb_stride is too small to hold all buffer entries: xfb_buffer {buffer}, xfb_stride {explicit}, minimum stride needed: {implicit}"
                        ),
                        Span::UNDEFINED,
                    ));
                }
            }
            let stride = explicit.unwrap_or(implicit);
            if widths.wide && !stride.is_multiple_of(8) {
                self.errors.push(semantic(
                    format!("xfb_stride must be multiple of 8 for buffer holding a double or 64-bit integer: xfb_buffer {buffer}, xfb_stride {stride}"),
                    Span::UNDEFINED,
                ));
            } else if widths.normal && !stride.is_multiple_of(4) {
                self.errors.push(semantic(
                    format!("xfb_stride must be multiple of 4: xfb_buffer {buffer}, xfb_stride {stride}"),
                    Span::UNDEFINED,
                ));
            } else if widths.half && !stride.is_multiple_of(2) {
                self.errors.push(semantic(
                    format!("xfb_stride must be multiple of 2 for buffer holding a half float or 16-bit integer: xfb_buffer {buffer}, xfb_stride {stride}"),
                    Span::UNDEFINED,
                ));
            }
            if stride > MAX_STRIDE {
                self.errors.push(semantic(
                    format!("xfb_stride is too large: xfb_buffer {buffer}"),
                    Span::UNDEFINED,
                ));
            }
            strides.insert(buffer, stride);
        }
        for &(handle, buffer, offset) in &self.xfb.globals {
            let stride = strides.get(&buffer).copied().unwrap_or(0);
            self.module.global_variables.get_mut(handle).xfb = Some(XfbBinding {
                buffer,
                stride,
                offset,
            });
        }
    }
}
