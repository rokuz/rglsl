use alloc::collections::BTreeMap;
use alloc::string::String;
use alloc::sync::Arc;
use alloc::vec::Vec;
use core::cell::Cell;

use rglsl_types::rglo::{self, Rglo};

use crate::diagnostic::Location;
use crate::include::FileId;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct Segment {
    pub(crate) start: u32,
    pub(crate) file: FileId,
    pub(crate) offset: u32,
    pub(crate) exact: u32,
    pub(crate) cur_file: FileId,
    pub(crate) line: u32,
    pub(crate) column: u32,
    pub(crate) source: u32,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub(crate) struct SourceInfo {
    pub(crate) number: i64,
    pub(crate) name: Option<String>,
    pub(crate) file: Option<FileId>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum PresumedSource<'a> {
    Name(&'a str),
    Number(i64),
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct SourceMap {
    pub(crate) root: FileId,
    pub(crate) segments: Arc<Vec<Segment>>,
    pub(crate) sources: Vec<SourceInfo>,
    pub(crate) files: BTreeMap<FileId, String>,
    pub(crate) texts: BTreeMap<FileId, String>,
}

#[derive(Clone, Default)]
#[cfg_attr(feature = "serialize", derive(serde::Serialize))]
#[cfg_attr(feature = "deserialize", derive(serde::Deserialize))]
#[cfg_attr(feature = "deserialize", serde(deny_unknown_fields))]
#[cfg_attr(feature = "serialize", serde(into = "SpanParts"))]
#[cfg_attr(feature = "deserialize", serde(from = "SpanParts"))]
pub struct SpanMap {
    shared: Option<Arc<SpanTable>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
struct SpanTable {
    root: FileId,
    length: u32,
    files: BTreeMap<FileId, String>,
    segments: Arc<Vec<Segment>>,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct SpanLocation<'a> {
    pub file: Option<&'a str>,
    pub included: bool,
    pub line: u32,
    pub column: u32,
}

impl core::fmt::Debug for SpanMap {
    fn fmt(&self, formatter: &mut core::fmt::Formatter<'_>) -> core::fmt::Result {
        formatter.write_str("SpanMap")
    }
}

impl SpanMap {
    pub fn locate(&self, offset: usize) -> Option<SpanLocation<'_>> {
        let table = self.shared.as_deref()?;
        let segment = segment_in(table.segments.as_slice(), offset)?;
        let delta = u32::try_from(offset)
            .unwrap_or(u32::MAX)
            .saturating_sub(segment.start);
        let inside = if delta < segment.exact { delta } else { 0 };
        Some(SpanLocation {
            file: table.files.get(&segment.cur_file).map(String::as_str),
            included: segment.cur_file != table.root,
            line: segment.line,
            column: segment.column.saturating_add(inside).saturating_add(1),
        })
    }

    pub fn length(&self) -> u32 {
        self.shared.as_deref().map_or(0, |table| table.length)
    }

    pub const fn is_empty(&self) -> bool {
        self.shared.is_none()
    }
}

impl rglo::Encode for SpanMap {
    fn encode(&self, out: &mut rglo::Encoder) {
        rglo::Encode::encode(&SpanParts::from(self.clone()), out);
    }
}

impl rglo::Decode for SpanMap {
    fn decode(input: &mut rglo::Input<'_>) -> Result<Self, rglo::Error> {
        <SpanParts as rglo::Decode>::decode(input).map(Self::from)
    }
}

#[derive(Rglo)]
#[cfg_attr(
    any(feature = "serialize", feature = "deserialize"),
    derive(serde::Serialize, serde::Deserialize)
)]
#[cfg_attr(
    any(feature = "serialize", feature = "deserialize"),
    serde(deny_unknown_fields)
)]
struct SpanParts {
    root: u32,
    length: u32,
    files: Vec<(u32, String)>,
    segments: Vec<[u32; 5]>,
}

impl From<SpanMap> for SpanParts {
    fn from(map: SpanMap) -> Self {
        let Some(table) = map.shared else {
            return Self {
                root: 0,
                length: 0,
                files: Vec::new(),
                segments: Vec::new(),
            };
        };
        Self {
            root: table.root.0,
            length: table.length,
            files: table
                .files
                .iter()
                .map(|(file, name)| (file.0, name.clone()))
                .collect(),
            segments: table
                .segments
                .iter()
                .map(|segment| {
                    [
                        segment.start,
                        segment.exact,
                        segment.cur_file.0,
                        segment.line,
                        segment.column,
                    ]
                })
                .collect(),
        }
    }
}

impl From<SpanParts> for SpanMap {
    fn from(parts: SpanParts) -> Self {
        if parts.segments.is_empty() {
            return Self::default();
        }
        let segments = parts
            .segments
            .into_iter()
            .map(|[start, exact, file, line, column]| Segment {
                start,
                file: FileId(file),
                offset: 0,
                exact,
                cur_file: FileId(file),
                line,
                column,
                source: 0,
            })
            .collect();
        Self {
            shared: Some(Arc::new(SpanTable {
                root: FileId(parts.root),
                length: parts.length,
                files: parts
                    .files
                    .into_iter()
                    .map(|(file, name)| (FileId(file), name))
                    .collect(),
                segments: Arc::new(segments),
            })),
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct LineEntry {
    pub offset: u32,
    pub source: u32,
    pub line: u32,
    pub column: u32,
}

#[derive(Debug)]
pub struct Locator<'a> {
    map: &'a SourceMap,
    last: Cell<usize>,
}

impl<'a> Locator<'a> {
    pub const fn new(map: &'a SourceMap) -> Self {
        Self {
            map,
            last: Cell::new(0),
        }
    }

    pub fn locate(&self, offset: usize) -> Location {
        self.map.located(self.segment(offset), offset)
    }

    fn segment(&self, offset: usize) -> Option<&'a Segment> {
        let segments = &*self.map.segments;
        let target = u32::try_from(offset).unwrap_or(u32::MAX);
        let before = |segment: &Segment| segment.start <= target;
        let hint = self.last.get().min(segments.len().saturating_sub(1));
        let (low, high) = match segments.get(hint) {
            None => return None,
            Some(segment) if before(segment) => {
                let mut low = hint;
                let mut step = 1_usize;
                loop {
                    let probe = low.saturating_add(step);
                    match segments.get(probe) {
                        Some(segment) if before(segment) => {
                            low = probe;
                            step = step.saturating_mul(2);
                        }
                        Some(_) => break (low, probe),
                        None => break (low, segments.len()),
                    }
                }
            }
            Some(_) => {
                let mut high = hint;
                let mut step = 1_usize;
                loop {
                    let Some(probe) = high.checked_sub(step) else {
                        break (0, high);
                    };
                    match segments.get(probe) {
                        Some(segment) if before(segment) => break (probe, high),
                        _ => {
                            high = probe;
                            step = step.saturating_mul(2);
                        }
                    }
                }
            }
        };
        let within = segments
            .get(low..high)
            .map_or(0, |range| range.partition_point(before));
        let index = low.saturating_add(within).saturating_sub(1);
        self.last.set(index);
        segments.get(index)
    }
}

pub(crate) fn clamp_line(line: i64) -> u32 {
    u32::try_from(line.max(0)).unwrap_or(u32::MAX)
}

fn segment_in(segments: &[Segment], offset: usize) -> Option<&Segment> {
    let offset = u32::try_from(offset).unwrap_or(u32::MAX);
    let index = segments.partition_point(|segment| segment.start <= offset);
    index
        .checked_sub(1)
        .and_then(|index| segments.get(index))
        .or_else(|| segments.first())
}

fn located(root: FileId, segment: Option<&Segment>, offset: usize) -> Location {
    let Some(segment) = segment else {
        return Location {
            file: root,
            offset: 0,
        };
    };
    let delta = u32::try_from(offset)
        .unwrap_or(u32::MAX)
        .saturating_sub(segment.start);
    let inside = if delta < segment.exact { delta } else { 0 };
    Location {
        file: segment.file,
        offset: segment.offset.saturating_add(inside),
    }
}

impl crate::Preprocessed {
    pub fn span_map(&self) -> SpanMap {
        let map = &self.source_map;
        SpanMap {
            shared: Some(Arc::new(SpanTable {
                root: map.root,
                length: u32::try_from(self.text.len()).unwrap_or(u32::MAX),
                files: map.files.clone(),
                segments: Arc::clone(&map.segments),
            })),
        }
    }
}

impl SourceMap {
    fn segment(&self, offset: usize) -> Option<&Segment> {
        segment_in(&self.segments, offset)
    }

    pub fn locate(&self, offset: usize) -> Location {
        self.located(self.segment(offset), offset)
    }

    fn located(&self, segment: Option<&Segment>, offset: usize) -> Location {
        located(self.root, segment, offset)
    }

    pub fn line(&self, offset: usize) -> (FileId, u32) {
        self.segment(offset)
            .map_or((self.root, 1), |segment| (segment.cur_file, segment.line))
    }

    pub fn presumed(&self, offset: usize) -> (PresumedSource<'_>, u32) {
        let Some(segment) = self.segment(offset) else {
            return (PresumedSource::Number(0), 1);
        };
        let source = usize::try_from(segment.source)
            .ok()
            .and_then(|index| self.sources.get(index))
            .map_or(PresumedSource::Number(0), |info| match &info.name {
                Some(name) => PresumedSource::Name(name),
                None => PresumedSource::Number(info.number),
            });
        (source, segment.line)
    }

    pub fn file_name(&self, file: FileId) -> Option<&str> {
        self.files.get(&file).map(String::as_str)
    }

    pub const fn root(&self) -> FileId {
        self.root
    }

    pub fn file_text(&self, file: FileId) -> Option<&str> {
        self.texts.get(&file).map(String::as_str)
    }

    pub fn source_count(&self) -> u32 {
        u32::try_from(self.sources.len()).unwrap_or(u32::MAX)
    }

    pub fn source_name(&self, source: u32) -> Option<&str> {
        self.source_info(source)
            .and_then(|info| info.name.as_deref())
    }

    pub fn source_file(&self, source: u32) -> Option<FileId> {
        self.source_info(source).and_then(|info| info.file)
    }

    fn source_info(&self, source: u32) -> Option<&SourceInfo> {
        usize::try_from(source)
            .ok()
            .and_then(|index| self.sources.get(index))
    }

    pub fn line_entries(&self) -> impl Iterator<Item = LineEntry> + '_ {
        self.segments.iter().map(|segment| LineEntry {
            offset: segment.start,
            source: segment.source,
            line: segment.line,
            column: segment.column,
        })
    }

    pub fn position(&self, offset: usize) -> LineEntry {
        self.segment(offset).map_or(
            LineEntry {
                offset: 0,
                source: 1,
                line: 1,
                column: 0,
            },
            |segment| LineEntry {
                offset: segment.start,
                source: segment.source,
                line: segment.line,
                column: segment.column,
            },
        )
    }
}
