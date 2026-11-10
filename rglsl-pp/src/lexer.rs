use alloc::rc::Rc;
use alloc::string::String;
use alloc::vec::Vec;

use crate::diagnostic::{DiagnosticKind, Severity};
use crate::include::FileId;
use crate::token::{operator, At, Kind, Token, MAX_TOKEN_LENGTH};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Role {
    Preamble,
    Root,
    Included,
}

#[derive(Debug, Clone, Copy)]
pub(crate) struct ScanContext {
    pub(crate) continuation_allowed: bool,
    pub(crate) if_depth: usize,
    pub(crate) disable_escapes: bool,
}

pub(crate) type Events = Vec<(DiagnosticKind, At)>;

#[derive(Debug, Clone, Copy)]
struct Mark {
    pos: usize,
    line: i64,
    physical: u32,
    line_start: usize,
}

#[derive(Debug)]
pub(crate) struct FileInput {
    pub(crate) file: FileId,
    text: Rc<str>,
    pos: usize,
    line: i64,
    physical: u32,
    line_start: usize,
    char_start: usize,
    continuation_reported: usize,
    pub(crate) source: u32,
    pub(crate) ended: bool,
    pub(crate) role: Role,
    final_newline_sent: bool,
}

const fn is_identifier_start(character: char) -> bool {
    character.is_ascii_alphabetic() || character == '_'
}

const fn is_identifier_continue(character: char) -> bool {
    character.is_ascii_alphanumeric() || character == '_'
}

const fn is_float_char(character: Option<char>) -> bool {
    matches!(character, Some('.' | 'e' | 'E' | 'f' | 'F' | 'h' | 'H'))
}

fn hex_value(character: Option<char>) -> Option<u32> {
    character.and_then(|character| character.to_digit(16))
}

fn digit_value(character: char) -> u64 {
    u64::from(character.to_digit(10).unwrap_or(0))
}

fn offset_u32(offset: usize) -> u32 {
    u32::try_from(offset).unwrap_or(u32::MAX)
}

struct Name {
    text: String,
    complained: bool,
}

impl Name {
    const fn new() -> Self {
        Self {
            text: String::new(),
            complained: false,
        }
    }

    const fn len(&self) -> usize {
        self.text.len()
    }

    fn push_limited(&mut self, character: char) -> bool {
        if self.text.len() < MAX_TOKEN_LENGTH {
            self.text.push(character);
            true
        } else {
            false
        }
    }
}

impl FileInput {
    pub(crate) fn new(file: FileId, text: Rc<str>, role: Role, source: u32) -> Self {
        let start = if role == Role::Root && text.starts_with('\u{feff}') {
            '\u{feff}'.len_utf8()
        } else {
            0
        };
        Self {
            file,
            text,
            pos: start,
            line: 1,
            physical: 1,
            line_start: start,
            char_start: 0,
            continuation_reported: 0,
            source,
            ended: false,
            role,
            final_newline_sent: false,
        }
    }

    pub(crate) fn current_at(&self) -> At {
        At {
            file: self.file,
            offset: offset_u32(self.pos),
            exact: 0,
            cur_file: self.file,
            physical: self.physical,
            column: offset_u32(self.pos.saturating_sub(self.line_start)),
            line: self.line,
            source: self.source,
        }
    }

    pub(crate) const fn set_line(&mut self, line: i64) {
        self.line = line;
    }

    const fn mark(&self) -> Mark {
        Mark {
            pos: self.pos,
            line: self.line,
            physical: self.physical,
            line_start: self.line_start,
        }
    }

    const fn reset(&mut self, mark: Mark) {
        if self.ended {
            return;
        }
        self.pos = mark.pos;
        self.line = mark.line;
        self.physical = mark.physical;
        self.line_start = mark.line_start;
    }

    fn raw_peek(&self) -> Option<char> {
        if self.ended {
            return None;
        }
        self.text
            .get(self.pos..)
            .and_then(|rest| rest.chars().next())
    }

    fn raw_get(&mut self) -> Option<char> {
        let character = self.raw_peek()?;
        self.char_start = self.pos;
        self.pos += character.len_utf8();
        if character == '\n' {
            self.line += 1;
            self.physical = self.physical.saturating_add(1);
            self.line_start = self.pos;
        }
        Some(character)
    }

    fn report(&mut self, events: &mut Events, kind: DiagnosticKind, at: At) {
        if kind.severity() == Severity::Error {
            self.ended = true;
        }
        events.push((kind, at));
    }

    fn getch(
        &mut self,
        context: &ScanContext,
        events: &mut Events,
        in_comment: bool,
    ) -> Option<char> {
        let mut character = self.raw_get()?;
        if character == '\\' {
            loop {
                if !matches!(self.raw_peek(), Some('\r' | '\n')) {
                    return Some('\\');
                }
                let backslash = self.char_start;
                let allowed = context.continuation_allowed;
                if backslash >= self.continuation_reported {
                    self.continuation_reported = backslash + 1;
                    let at = self.current_at();
                    if in_comment {
                        self.report(
                            events,
                            DiagnosticKind::ContinuationInComment { allowed },
                            at,
                        );
                    } else if !allowed {
                        self.report(events, DiagnosticKind::ContinuationNotAllowed, at);
                    }
                }
                if in_comment && !allowed {
                    self.char_start = backslash;
                    return Some('\\');
                }
                let first = self.raw_get();
                let second = self.raw_get();
                let next = if first == Some('\r') && second == Some('\n') {
                    self.raw_get()
                } else {
                    second
                };
                match next {
                    Some('\\') => {}
                    Some(next) => {
                        character = next;
                        break;
                    }
                    None => return None,
                }
            }
        }
        if character == '\r' {
            let start = self.char_start;
            if self.raw_peek() == Some('\n') {
                self.raw_get();
            }
            self.char_start = start;
            return Some('\n');
        }
        Some(character)
    }

    fn next(&mut self, context: &ScanContext, events: &mut Events) -> (Option<char>, Mark) {
        let mark = self.mark();
        (self.getch(context, events, false), mark)
    }

    pub(crate) fn skip_blanks(
        &mut self,
        context: &ScanContext,
        events: &mut Events,
    ) -> Option<char> {
        loop {
            let (character, mark) = self.next(context, events);
            if !matches!(character, Some(' ' | '\t')) {
                self.reset(mark);
                return character;
            }
        }
    }

    pub(crate) fn header_name(
        &mut self,
        delimiter: char,
        context: &ScanContext,
        events: &mut Events,
    ) -> Option<(String, bool)> {
        let mut name = String::new();
        let mut too_long = false;
        loop {
            let character = self.getch(context, events, false)?;
            if character == delimiter {
                return Some((name, too_long));
            }
            if name.len() < MAX_TOKEN_LENGTH {
                name.push(character);
            } else {
                too_long = true;
            }
        }
    }

    pub(crate) fn consume_char(&mut self, context: &ScanContext, events: &mut Events) {
        self.getch(context, events, false);
    }

    pub(crate) fn scan(&mut self, context: &ScanContext, events: &mut Events) -> Token {
        let mut space = false;
        let (mut character, mut mark) = self.next(context, events);
        loop {
            while matches!(character, Some(' ' | '\t')) {
                space = true;
                (character, mark) = self.next(context, events);
            }
            let start = self.char_start;
            let mut at = self.current_at();
            at.offset = offset_u32(start);
            at.column = offset_u32(start.saturating_sub(self.line_start));
            let Some(current) = character else {
                return self.end_of_input(space, at);
            };
            let mut token = match current {
                '\n' => Token::new(Kind::Newline, at),
                '/' => {
                    let (next, next_mark) = self.next(context, events);
                    match next {
                        Some('/') => {
                            let ending = loop {
                                match self.getch(context, events, true) {
                                    Some('\n') => break Kind::Newline,
                                    None => break Kind::End,
                                    Some(_) => {}
                                }
                            };
                            let mut token = Token::new(ending, self.current_at());
                            token.space = true;
                            return token;
                        }
                        Some('*') => {
                            if self.block_comment(context, events, at) {
                                space = true;
                                (character, mark) = self.next(context, events);
                                continue;
                            }
                            let mut token = Token::new(Kind::End, self.current_at());
                            token.space = space;
                            return token;
                        }
                        Some('=') => Token::new(Kind::Op("/="), at),
                        _ => {
                            self.reset(next_mark);
                            Token::new(Kind::Op("/"), at)
                        }
                    }
                }
                '0'..='9' => self.number(current, context, events, at),
                '.' => {
                    let (next, next_mark) = self.next(context, events);
                    self.reset(next_mark);
                    if next.is_some_and(|next| next.is_ascii_digit()) {
                        self.float(Name::new(), Some('.'), mark, context, events, at)
                    } else {
                        Token::new(Kind::Op("."), at)
                    }
                }
                '"' => self.string(context, events, at),
                '\'' => Token::new(Kind::Quote, at),
                _ if is_identifier_start(current) => self.identifier(current, context, events, at),
                _ => self.operator(current, context, events, at),
            };
            token.space = space;
            let end = self.pos;
            token.at.exact = self.exact_length(&token, start, end);
            return token;
        }
    }

    fn end_of_input(&mut self, space: bool, at: At) -> Token {
        let kind = if self.role == Role::Included && !self.final_newline_sent && !self.ended {
            self.final_newline_sent = true;
            Kind::Newline
        } else {
            Kind::End
        };
        let mut token = Token::new(kind, at);
        token.space = space;
        token
    }

    fn exact_length(&self, token: &Token, start: usize, end: usize) -> u32 {
        let Some(slice) = self.text.get(start..end) else {
            return 0;
        };
        let matches = match token.kind {
            Kind::Identifier | Kind::IntConst | Kind::Number => *token.text == *slice,
            Kind::Op(op) => op == slice,
            Kind::String => {
                let mut spelling = String::new();
                token.spelling(&mut spelling);
                spelling == slice
            }
            _ => false,
        };
        if matches {
            offset_u32(end - start)
        } else {
            0
        }
    }

    fn block_comment(&mut self, context: &ScanContext, events: &mut Events, at: At) -> bool {
        let mut character = self.getch(context, events, false);
        loop {
            while character != Some('*') {
                if character.is_none() {
                    self.report(events, DiagnosticKind::UnterminatedComment, at);
                    return false;
                }
                character = self.getch(context, events, false);
            }
            character = self.getch(context, events, false);
            match character {
                None => {
                    self.report(events, DiagnosticKind::UnterminatedComment, at);
                    return false;
                }
                Some('/') => return true,
                Some(_) => {}
            }
        }
    }

    fn identifier(
        &mut self,
        first: char,
        context: &ScanContext,
        events: &mut Events,
        at: At,
    ) -> Token {
        let mut name = Name::new();
        let mut character = Some(first);
        let mut mark = self.mark();
        while let Some(current) = character.filter(|&current| is_identifier_continue(current)) {
            if !name.push_limited(current) && !name.complained {
                name.complained = true;
                self.report(events, DiagnosticKind::NameTooLong, at);
            }
            (character, mark) = self.next(context, events);
        }
        self.reset(mark);
        Token::with_text(Kind::Identifier, &name.text, at)
    }

    fn operator(
        &mut self,
        first: char,
        context: &ScanContext,
        events: &mut Events,
        at: At,
    ) -> Token {
        let candidates: &[&'static str] = match first {
            '-' => &["--", "-="],
            '+' => &["++", "+="],
            '*' => &["*="],
            '%' => &["%="],
            '^' => &["^^", "^="],
            '=' => &["=="],
            '!' => &["!="],
            '|' => &["||", "|="],
            '&' => &["&&", "&="],
            '<' => &["<<", "<="],
            '>' => &[">>", ">="],
            ':' => &["::"],
            _ => &[],
        };
        let mut single = [0u8; 4];
        let single = &*first.encode_utf8(&mut single);
        let Some(single_op) = operator(single).filter(|_| first.is_ascii()) else {
            return Token::new(Kind::Bad(first), at);
        };
        if candidates.is_empty() {
            return Token::new(Kind::Op(single_op), at);
        }
        let (second, mark) = self.next(context, events);
        let found = candidates.iter().copied().find(|candidate| {
            let mut characters = candidate.chars();
            characters.next();
            characters.next() == second
        });
        let Some(found) = found else {
            self.reset(mark);
            return Token::new(Kind::Op(single_op), at);
        };
        if found == "<<" || found == ">>" {
            let (third, third_mark) = self.next(context, events);
            if third == Some('=') {
                let assign = if found == "<<" { "<<=" } else { ">>=" };
                return Token::new(Kind::Op(assign), at);
            }
            self.reset(third_mark);
        }
        Token::new(Kind::Op(found), at)
    }

    fn integer_suffix(
        &mut self,
        name: &mut Name,
        character: Option<char>,
        mark: Mark,
        context: &ScanContext,
        events: &mut Events,
    ) -> (bool, bool, bool) {
        let mut unsigned = false;
        let mut long = false;
        let mut short = false;
        match character {
            Some(suffix @ ('u' | 'U')) => {
                name.push_limited(suffix);
                unsigned = true;
                let (next, next_mark) = self.next(context, events);
                if let Some(next @ ('l' | 'L')) = next {
                    name.push_limited(next);
                    long = true;
                } else {
                    self.reset(next_mark);
                }
                let (next, next_mark) = self.next(context, events);
                if let Some(next @ ('s' | 'S')) = next {
                    name.push_limited(next);
                    short = true;
                } else {
                    self.reset(next_mark);
                }
            }
            Some(suffix @ ('l' | 'L')) => {
                name.push_limited(suffix);
                long = true;
            }
            Some(suffix @ ('s' | 'S')) => {
                name.push_limited(suffix);
                short = true;
            }
            _ => self.reset(mark),
        }
        (unsigned, long, short)
    }

    fn integer_token(
        name: &Name,
        value: u64,
        unsigned: bool,
        long: bool,
        short: bool,
        at: At,
    ) -> Token {
        let mut token = Token::with_text(Kind::Number, &name.text, at);
        if long {
            token.value = i64::from_ne_bytes(value.to_ne_bytes());
        } else {
            let truncated = u32::try_from(value & 0xffff_ffff).unwrap_or(u32::MAX);
            token.value = i64::from(i32::from_ne_bytes(truncated.to_ne_bytes()));
            if !unsigned && !short {
                token.kind = Kind::IntConst;
            }
        }
        token
    }

    fn number(&mut self, first: char, context: &ScanContext, events: &mut Events, at: At) -> Token {
        let mut name = Name::new();
        name.push_limited(first);
        if first == '0' {
            let (character, mark) = self.next(context, events);
            if matches!(character, Some('x' | 'X')) {
                return self.hexadecimal(name, character, context, events, at);
            }
            return self.octal(name, character, mark, context, events, at);
        }
        let (mut character, mut mark) = self.next(context, events);
        while let Some(digit) = character.filter(char::is_ascii_digit) {
            if !name.push_limited(digit) && !name.complained {
                name.complained = true;
                self.report(
                    events,
                    DiagnosticKind::InvalidLiteral {
                        reason: "numeric literal too long",
                    },
                    at,
                );
            }
            (character, mark) = self.next(context, events);
        }
        if is_float_char(character) {
            return self.float(name, character, mark, context, events, at);
        }
        let numeric_length = name.len();
        let (unsigned, long, short) =
            self.integer_suffix(&mut name, character, mark, context, events);
        let maximum: u64 = if long {
            u64::MAX
        } else if short {
            0xffff
        } else {
            0xffff_ffff
        };
        let mut value: u64 = 0;
        for digit in name.text.get(..numeric_length).unwrap_or("").chars() {
            let digit = digit_value(digit);
            let overflow = value > maximum / 10 || (value == maximum / 10 && digit > maximum % 10);
            if overflow {
                self.report(
                    events,
                    DiagnosticKind::InvalidLiteral {
                        reason: "numeric literal too big",
                    },
                    at,
                );
                value = u64::MAX;
                break;
            }
            value = value * 10 + digit;
        }
        Self::integer_token(&name, value, unsigned, long, short, at)
    }

    fn hexadecimal(
        &mut self,
        mut name: Name,
        x: Option<char>,
        context: &ScanContext,
        events: &mut Events,
        at: At,
    ) -> Token {
        if let Some(x) = x {
            name.push_limited(x);
        }
        let (mut character, mut mark) = self.next(context, events);
        let mut value: u64 = 0;
        if hex_value(character).is_some() {
            while let Some(digit) = hex_value(character) {
                if name.len() < MAX_TOKEN_LENGTH && value <= 0x7fff_ffff_ffff_ffff {
                    if let Some(current) = character {
                        name.push_limited(current);
                    }
                    value = (value << 4) | u64::from(digit);
                } else {
                    if !name.complained {
                        let reason = if name.len() < MAX_TOKEN_LENGTH {
                            "hexadecimal literal too big"
                        } else {
                            "hexadecimal literal too long"
                        };
                        self.report(events, DiagnosticKind::InvalidLiteral { reason }, at);
                        name.complained = true;
                    }
                    value = u64::MAX;
                }
                (character, mark) = self.next(context, events);
            }
        } else {
            self.report(
                events,
                DiagnosticKind::InvalidLiteral {
                    reason: "bad digit in hexadecimal literal",
                },
                at,
            );
        }
        let (unsigned, long, short) =
            self.integer_suffix(&mut name, character, mark, context, events);
        if !long && !short && value > 0xffff_ffff && !name.complained {
            self.report(
                events,
                DiagnosticKind::InvalidLiteral {
                    reason: "hexadecimal literal too big",
                },
                at,
            );
        }
        Self::integer_token(&name, value, unsigned, long, short, at)
    }

    fn octal(
        &mut self,
        mut name: Name,
        mut character: Option<char>,
        mut mark: Mark,
        context: &ScanContext,
        events: &mut Events,
        at: At,
    ) -> Token {
        let mut value: u64 = 0;
        let mut overflow = false;
        let mut non_octal = false;
        while let Some(digit) = character.filter(|digit| ('0'..='7').contains(digit)) {
            if !name.push_limited(digit) && !name.complained {
                name.complained = true;
                self.report(
                    events,
                    DiagnosticKind::InvalidLiteral {
                        reason: "numeric literal too long",
                    },
                    at,
                );
            }
            if value <= 0x1fff_ffff_ffff_ffff {
                value = (value << 3) | digit_value(digit);
            } else {
                overflow = true;
            }
            (character, mark) = self.next(context, events);
        }
        if matches!(character, Some('8' | '9')) {
            non_octal = true;
            while let Some(digit) = character.filter(char::is_ascii_digit) {
                if !name.push_limited(digit) && !name.complained {
                    name.complained = true;
                    self.report(
                        events,
                        DiagnosticKind::InvalidLiteral {
                            reason: "numeric literal too long",
                        },
                        at,
                    );
                }
                (character, mark) = self.next(context, events);
            }
        }
        if is_float_char(character) {
            return self.float(name, character, mark, context, events, at);
        }
        if non_octal {
            self.report(
                events,
                DiagnosticKind::InvalidLiteral {
                    reason: "octal literal digit too large",
                },
                at,
            );
        }
        let (unsigned, long, short) =
            self.integer_suffix(&mut name, character, mark, context, events);
        if !long && value > 0xffff_ffff {
            overflow = true;
        }
        if overflow {
            self.report(
                events,
                DiagnosticKind::InvalidLiteral {
                    reason: "octal literal too big",
                },
                at,
            );
        }
        Self::integer_token(&name, value, unsigned, long, short, at)
    }

    fn float(
        &mut self,
        mut name: Name,
        mut character: Option<char>,
        mut mark: Mark,
        context: &ScanContext,
        events: &mut Events,
        at: At,
    ) -> Token {
        let save = |name: &mut Name, character: char| {
            if name.text.len() <= MAX_TOKEN_LENGTH {
                name.text.push(character);
            }
        };
        let mut has_point_or_exponent = false;
        if character == Some('.') {
            has_point_or_exponent = true;
            save(&mut name, '.');
            (character, mark) = self.next(context, events);
            while let Some(digit) = character.filter(char::is_ascii_digit) {
                save(&mut name, digit);
                (character, mark) = self.next(context, events);
            }
        }
        if let Some(exponent @ ('e' | 'E')) = character {
            has_point_or_exponent = true;
            save(&mut name, exponent);
            (character, mark) = self.next(context, events);
            if let Some(sign @ ('+' | '-')) = character {
                save(&mut name, sign);
                (character, mark) = self.next(context, events);
            }
            if character.is_some_and(|digit| digit.is_ascii_digit()) {
                while let Some(digit) = character.filter(char::is_ascii_digit) {
                    save(&mut name, digit);
                    (character, mark) = self.next(context, events);
                }
            } else {
                self.report(
                    events,
                    DiagnosticKind::InvalidLiteral {
                        reason: "bad character in float exponent",
                    },
                    at,
                );
            }
        }
        let needs_point = |this: &mut Self, events: &mut Events| {
            if context.if_depth == 0 && !has_point_or_exponent {
                this.report(
                    events,
                    DiagnosticKind::InvalidLiteral {
                        reason: "float literal needs a decimal point or exponent",
                    },
                    at,
                );
            }
        };
        match character {
            Some(suffix @ ('l' | 'L' | 'h' | 'H')) => {
                needs_point(self, events);
                let (second, _) = self.next(context, events);
                if let Some(second @ ('f' | 'F')) = second {
                    save(&mut name, suffix);
                    save(&mut name, second);
                } else {
                    self.reset(mark);
                }
            }
            Some(suffix @ ('f' | 'F')) => {
                needs_point(self, events);
                save(&mut name, suffix);
                if suffix == 'f' {
                    for extra in ["e2m1", "e3m2", "e2m3", "ue8m0", "mxint8"] {
                        let before = self.mark();
                        if extra
                            .chars()
                            .all(|expected| self.getch(context, events, false) == Some(expected))
                        {
                            for character in extra.chars() {
                                save(&mut name, character);
                            }
                            break;
                        }
                        self.reset(before);
                    }
                }
            }
            _ => self.reset(mark),
        }
        if name.text.len() > MAX_TOKEN_LENGTH {
            name.text.truncate(MAX_TOKEN_LENGTH);
            self.report(
                events,
                DiagnosticKind::InvalidLiteral {
                    reason: "float literal too long",
                },
                at,
            );
        }
        Token::with_text(Kind::Number, &name.text, at)
    }

    fn string(&mut self, context: &ScanContext, events: &mut Events, at: At) -> Token {
        let mut name = String::new();
        let (mut character, mut mark) = self.next(context, events);
        while let Some(mut current) = character.filter(|&current| current != '"' && current != '\n')
        {
            if name.len() >= MAX_TOKEN_LENGTH {
                break;
            }
            if current == '\\' && !context.disable_escapes {
                let escaped = self.getch(context, events, false);
                match escaped {
                    Some('\'') => current = '\'',
                    Some('"') => current = '"',
                    Some('?') => current = '?',
                    Some('\\') => current = '\\',
                    Some('a') => current = '\u{7}',
                    Some('b') => current = '\u{8}',
                    Some('f') => current = '\u{c}',
                    Some('n') => current = '\n',
                    Some('r') => current = '\r',
                    Some('t') => current = '\t',
                    Some('v') => current = '\u{b}',
                    Some('x') => {
                        let mut value: u32 = 0;
                        let mut digits = 0;
                        loop {
                            let (next, next_mark) = self.next(context, events);
                            match hex_value(next) {
                                Some(digit) => {
                                    value = value.wrapping_mul(16).wrapping_add(digit);
                                    digits += 1;
                                }
                                None => {
                                    self.reset(next_mark);
                                    break;
                                }
                            }
                        }
                        if digits == 0 {
                            self.report(events, DiagnosticKind::HexEscapeWithoutDigits, at);
                        }
                        current = char::from_u32(value & 0xff).unwrap_or('\0');
                    }
                    Some(first @ '0'..='7') => {
                        let mut value = first.to_digit(8).unwrap_or(0);
                        let mut digits = 1;
                        while digits < 3 {
                            let (next, next_mark) = self.next(context, events);
                            match next.and_then(|next| next.to_digit(8)) {
                                Some(digit) => {
                                    value = value * 8 + digit;
                                    digits += 1;
                                }
                                None => {
                                    self.reset(next_mark);
                                    break;
                                }
                            }
                        }
                        current = char::from_u32(value & 0xff).unwrap_or('\0');
                    }
                    _ => self.report(events, DiagnosticKind::InvalidEscape, at),
                }
            }
            name.push(current);
            (character, mark) = self.next(context, events);
        }
        if character != Some('"') {
            self.reset(mark);
            self.report(events, DiagnosticKind::UnterminatedString, at);
        }
        Token::with_text(Kind::String, &name, at)
    }
}
