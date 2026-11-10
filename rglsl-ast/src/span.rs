use core::fmt;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Default)]
pub struct Span {
    pub start: u32,
    pub end: u32,
}

impl Span {
    pub const fn new(start: u32, end: u32) -> Self {
        Self { start, end }
    }

    pub const fn len(self) -> u32 {
        self.end.saturating_sub(self.start)
    }

    pub const fn is_empty(self) -> bool {
        self.end <= self.start
    }

    pub const fn to(self, other: Self) -> Self {
        Self {
            start: if self.start < other.start {
                self.start
            } else {
                other.start
            },
            end: if self.end > other.end {
                self.end
            } else {
                other.end
            },
        }
    }

    pub fn text(self, source: &str) -> Option<&str> {
        let start = usize::try_from(self.start).ok()?;
        let end = usize::try_from(self.end).ok()?;
        source.get(start..end)
    }
}

impl fmt::Display for Span {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(formatter, "{}..{}", self.start, self.end)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub struct LineColumn {
    pub line: u32,
    pub column: u32,
}

impl fmt::Display for LineColumn {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(formatter, "{}:{}", self.line, self.column)
    }
}

pub fn line_column(source: &str, offset: u32) -> LineColumn {
    let limit = usize::try_from(offset).unwrap_or(usize::MAX);
    let mut position = LineColumn { line: 1, column: 1 };
    for (index, character) in source.char_indices() {
        if index >= limit {
            break;
        }
        if character == '\n' {
            position.line = position.line.saturating_add(1);
            position.column = 1;
        } else {
            position.column = position.column.saturating_add(1);
        }
    }
    position
}
