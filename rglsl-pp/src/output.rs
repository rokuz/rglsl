use alloc::string::String;
use alloc::vec::Vec;

use crate::include::FileId;
use crate::source_map::Segment;
use crate::token::{At, Kind, Token};

const MAX_INDENT: u32 = 256;

#[derive(Debug)]
pub(crate) struct Output {
    pub(crate) text: String,
    pub(crate) segments: Vec<Segment>,
    anchor: (FileId, u32),
    line_start: bool,
    last_kind: Option<Kind>,
    last_keyword: bool,
    limit: usize,
}

fn no_space_before(kind: Kind) -> bool {
    matches!(kind, Kind::Op(";" | ")" | "[" | "]" | "." | ","))
}

fn no_space_after(kind: Kind) -> bool {
    matches!(kind, Kind::Op("." | "(" | "["))
}

fn starts_with_digit(token: &Token) -> bool {
    matches!(token.kind, Kind::IntConst | Kind::Number)
        && token
            .text
            .bytes()
            .next()
            .is_some_and(|byte| byte.is_ascii_digit())
}

impl Output {
    pub(crate) const fn new(root: FileId, limit: usize) -> Self {
        Self {
            text: String::new(),
            segments: Vec::new(),
            anchor: (root, 1),
            line_start: true,
            last_kind: None,
            last_keyword: false,
            limit,
        }
    }

    pub(crate) const fn overflowed(&self) -> bool {
        self.text.len() > self.limit
    }

    fn newline(&mut self) {
        self.text.push('\n');
        self.line_start = true;
        self.last_kind = None;
    }

    fn sync(&mut self, file: FileId, physical: u32) {
        let (anchor_file, anchor_line) = self.anchor;
        if anchor_file == file {
            if physical > anchor_line {
                let count = physical - anchor_line;
                for _ in 0..count {
                    if self.overflowed() {
                        break;
                    }
                    self.newline();
                }
                self.anchor = (file, physical);
            }
        } else {
            if !self.line_start {
                self.newline();
            }
            self.anchor = (file, physical);
        }
    }

    fn segment(&mut self, at: At) {
        let start = u32::try_from(self.text.len()).unwrap_or(u32::MAX);
        let segment = Segment {
            start,
            file: at.file,
            offset: at.offset,
            exact: at.exact,
            cur_file: at.cur_file,
            line: at.line,
            column: at.column,
            source: at.source,
        };
        if let Some(last) = self.segments.last_mut() {
            if last.start == start {
                *last = segment;
                return;
            }
        }
        self.segments.push(segment);
    }

    pub(crate) fn token(&mut self, token: &Token) {
        if self.overflowed() {
            return;
        }
        self.sync(token.at.cur_file, token.at.physical);
        if self.line_start {
            for _ in 0..token.at.column.min(MAX_INDENT) {
                self.text.push(' ');
            }
        } else if let Some(last) = self.last_kind {
            let space = if token.kind.is_op("(") {
                last != Kind::Identifier || self.last_keyword
            } else {
                (!no_space_before(token.kind) && !no_space_after(last))
                    || (token.kind.is_op(".") && matches!(last, Kind::IntConst | Kind::Number))
                    || (last.is_op(".") && starts_with_digit(token))
            };
            if space {
                self.text.push(' ');
            }
        }
        self.segment(token.at);
        token.spelling(&mut self.text);
        self.line_start = false;
        self.last_kind = Some(token.kind);
        self.last_keyword = token.kind == Kind::Identifier
            && matches!(&*token.text, "if" | "for" | "while" | "switch");
    }

    pub(crate) fn directive(&mut self, text: &str, at: At) {
        if self.overflowed() {
            return;
        }
        self.sync(at.cur_file, at.physical);
        if !self.line_start {
            self.newline();
        }
        self.segment(At { exact: 0, ..at });
        self.text.push_str(text);
        self.newline();
        self.anchor = (at.cur_file, at.physical.saturating_add(1));
    }

    pub(crate) fn finish(&mut self) {
        if !self.text.is_empty() && !self.text.ends_with('\n') {
            self.text.push('\n');
        }
    }
}
