use alloc::borrow::ToOwned;
use alloc::string::String;
use alloc::vec::Vec;

use crate::ast::{Directive, DirectiveKind, ExtensionBehavior, NumericKind};
use crate::error::{ParseError, ParseErrorKind};
use crate::span::Span;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum TokenKind<'a> {
    Word(&'a str),
    Number { kind: NumericKind, text: &'a str },
    Punctuator(&'static str),
    Directive(usize),
    String(usize),
    End,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct Token<'a> {
    pub(crate) kind: TokenKind<'a>,
    pub(crate) span: Span,
}

#[derive(Debug)]
pub(crate) struct Tokens<'a> {
    pub(crate) tokens: Vec<Token<'a>>,
    pub(crate) directives: Vec<Directive>,
    pub(crate) strings: Vec<String>,
    pub(crate) end: Token<'a>,
}

const PUNCTUATORS: [&str; 45] = [
    "<<=", ">>=", "++", "--", "<=", ">=", "==", "!=", "&&", "||", "^^", "+=", "-=", "*=", "/=",
    "%=", "&=", "|=", "^=", "<<", ">>", "(", ")", "[", "]", "{", "}", ".", ",", ":", ";", "=", "!",
    "-", "~", "+", "*", "/", "%", "<", ">", "|", "^", "&", "?",
];

const fn is_word_start(byte: u8) -> bool {
    byte.is_ascii_alphabetic() || byte == b'_'
}

const fn is_word_continue(byte: u8) -> bool {
    byte.is_ascii_alphanumeric() || byte == b'_'
}

fn offset_to_u32(offset: usize) -> u32 {
    u32::try_from(offset).unwrap_or(u32::MAX)
}

fn span_between(start: usize, end: usize) -> Span {
    Span::new(offset_to_u32(start), offset_to_u32(end))
}

struct Lexer<'a> {
    source: &'a str,
    bytes: &'a [u8],
    offset: usize,
    at_line_start: bool,
    tokens: Vec<Token<'a>>,
    directives: Vec<Directive>,
    strings: Vec<String>,
}

pub(crate) fn tokenize(source: &str) -> Result<Tokens<'_>, ParseError> {
    if u32::try_from(source.len()).is_err() {
        return Err(ParseError::new(
            ParseErrorKind::SourceTooLarge,
            Span::default(),
            source,
        ));
    }
    let mut lexer = Lexer {
        source,
        bytes: source.as_bytes(),
        offset: 0,
        at_line_start: true,
        tokens: Vec::new(),
        directives: Vec::new(),
        strings: Vec::new(),
    };
    lexer.run()?;
    let end = Token {
        kind: TokenKind::End,
        span: span_between(source.len(), source.len()),
    };
    Ok(Tokens {
        tokens: lexer.tokens,
        directives: lexer.directives,
        strings: lexer.strings,
        end,
    })
}

impl<'a> Lexer<'a> {
    fn byte_at(&self, offset: usize) -> Option<u8> {
        self.bytes.get(offset).copied()
    }

    fn error(&self, kind: ParseErrorKind, start: usize, end: usize) -> ParseError {
        ParseError::new(kind, span_between(start, end), self.source)
    }

    fn text(&self, start: usize, end: usize) -> &'a str {
        self.source.get(start..end).unwrap_or("")
    }

    fn push(&mut self, kind: TokenKind<'a>, start: usize, end: usize) {
        self.tokens.push(Token {
            kind,
            span: span_between(start, end),
        });
        self.offset = end;
        self.at_line_start = false;
    }

    fn run(&mut self) -> Result<(), ParseError> {
        while let Some(byte) = self.byte_at(self.offset) {
            let next = self.byte_at(self.offset + 1);
            match byte {
                b'\n' => {
                    self.offset += 1;
                    self.at_line_start = true;
                }
                b' ' | b'\t' | b'\r' | 0x0b | 0x0c => self.offset += 1,
                b'/' if next == Some(b'/') => self.skip_line_comment(),
                b'/' if next == Some(b'*') => self.skip_block_comment()?,
                b'#' if self.at_line_start => self.directive()?,
                b'"' => self.string()?,
                b'0'..=b'9' => self.number()?,
                b'.' if next.is_some_and(|digit| digit.is_ascii_digit()) => self.number()?,
                _ if is_word_start(byte) => self.word(),
                _ => self.punctuator()?,
            }
        }
        Ok(())
    }

    fn skip_line_comment(&mut self) {
        while self.byte_at(self.offset).is_some_and(|byte| byte != b'\n') {
            self.offset += 1;
        }
    }

    fn skip_block_comment(&mut self) -> Result<(), ParseError> {
        let start = self.offset;
        let body = self.text(start + 2, self.source.len());
        match body.find("*/") {
            Some(length) => {
                self.offset = start + 2 + length + 2;
                Ok(())
            }
            None => Err(self.error(ParseErrorKind::UnterminatedComment, start, start + 2)),
        }
    }

    fn word(&mut self) {
        let start = self.offset;
        let mut end = start;
        while self.byte_at(end).is_some_and(is_word_continue) {
            end += 1;
        }
        self.push(TokenKind::Word(self.text(start, end)), start, end);
    }

    fn punctuator(&mut self) -> Result<(), ParseError> {
        let start = self.offset;
        let rest = self.text(start, self.source.len());
        match PUNCTUATORS
            .into_iter()
            .find(|punctuator| rest.starts_with(punctuator))
        {
            Some(punctuator) => {
                self.push(
                    TokenKind::Punctuator(punctuator),
                    start,
                    start + punctuator.len(),
                );
                Ok(())
            }
            None => {
                let character = rest.chars().next().unwrap_or(char::REPLACEMENT_CHARACTER);
                Err(self.error(
                    ParseErrorKind::UnexpectedCharacter(character),
                    start,
                    start + character.len_utf8(),
                ))
            }
        }
    }

    fn string(&mut self) -> Result<(), ParseError> {
        let start = self.offset;
        let mut end = start + 1;
        loop {
            match self.byte_at(end) {
                Some(b'"') => break,
                Some(b'\\') if self.byte_at(end + 1).is_some_and(|next| next != b'\n') => end += 2,
                Some(b'\n') | None => {
                    return Err(self.error(ParseErrorKind::UnterminatedString, start, end))
                }
                Some(_) => end += 1,
            }
        }
        let raw = self.text(start + 1, end);
        let value = unescape(raw).map_err(|kind| self.error(kind, start, end + 1))?;
        let index = self.strings.len();
        self.strings.push(value);
        self.push(TokenKind::String(index), start, end + 1);
        Ok(())
    }

    fn digits(&self, mut end: usize, accept: impl Fn(u8) -> bool) -> usize {
        while self.byte_at(end).is_some_and(&accept) {
            end += 1;
        }
        end
    }

    fn number(&mut self) -> Result<(), ParseError> {
        let start = self.offset;
        let is_hexadecimal = self.byte_at(start) == Some(b'0')
            && matches!(self.byte_at(start + 1), Some(b'x' | b'X'));
        let mut is_float = false;
        let mut is_valid = true;
        let mut end;
        if is_hexadecimal {
            end = self.digits(start + 2, |byte| byte.is_ascii_hexdigit());
            is_valid = end > start + 2;
        } else {
            end = self.digits(start, |byte| byte.is_ascii_digit());
            if self.byte_at(end) == Some(b'.') {
                is_float = true;
                end = self.digits(end + 1, |byte| byte.is_ascii_digit());
            }
            if matches!(self.byte_at(end), Some(b'e' | b'E')) {
                let has_sign = matches!(self.byte_at(end + 1), Some(b'+' | b'-'));
                let exponent_start = end + 1 + usize::from(has_sign);
                let exponent_end = self.digits(exponent_start, |byte| byte.is_ascii_digit());
                if exponent_end > exponent_start {
                    is_float = true;
                    end = exponent_end;
                }
            }
        }
        let digits_end = end;
        let kind = if is_float {
            match (self.byte_at(end), self.byte_at(end + 1)) {
                (Some(b'l' | b'L'), Some(b'f' | b'F')) => {
                    end += 2;
                    NumericKind::Double
                }
                (Some(b'h' | b'H'), Some(b'f' | b'F')) => {
                    end += 2;
                    NumericKind::Float16
                }
                (Some(b'f'), _) => {
                    end += 1;
                    let suffix = [
                        ("e2m1", NumericKind::FloatE2M1),
                        ("e3m2", NumericKind::FloatE3M2),
                        ("e2m3", NumericKind::FloatE2M3),
                        ("ue8m0", NumericKind::FloatUE8M0),
                        ("mxint8", NumericKind::FloatMXINT8),
                    ]
                    .into_iter()
                    .find(|(text, _)| {
                        self.source
                            .get(end..)
                            .is_some_and(|rest| rest.starts_with(text))
                    });
                    match suffix {
                        Some((text, kind)) => {
                            end += text.len();
                            kind
                        }
                        None => NumericKind::Float,
                    }
                }
                (Some(b'F'), _) => {
                    end += 1;
                    NumericKind::Float
                }
                _ => NumericKind::Float,
            }
        } else {
            let unsigned = matches!(self.byte_at(end), Some(b'u' | b'U'));
            end += usize::from(unsigned);
            let long = matches!(self.byte_at(end), Some(b'l' | b'L'));
            end += usize::from(long);
            let short = !long && matches!(self.byte_at(end), Some(b's' | b'S'));
            end += usize::from(short);
            match (unsigned, long, short) {
                (false, true, _) => NumericKind::Int64,
                (true, true, _) => NumericKind::Uint64,
                (false, false, true) => NumericKind::Int16,
                (true, false, true) => NumericKind::Uint16,
                (true, false, false) => NumericKind::Uint,
                (false, false, false) => NumericKind::Int,
            }
        };
        let trailing_end = self.digits(end, is_word_continue);
        let digits = self.text(start, digits_end);
        let is_octal = !is_float && !is_hexadecimal && digits.len() > 1 && digits.starts_with('0');
        if is_octal && digits.bytes().any(|digit| digit > b'7') {
            is_valid = false;
        }
        if !is_valid || trailing_end > end {
            return Err(self.error(
                ParseErrorKind::InvalidNumber(self.text(start, trailing_end).to_owned()),
                start,
                trailing_end,
            ));
        }
        let text = self.text(start, end);
        self.push(TokenKind::Number { kind, text }, start, end);
        Ok(())
    }

    fn directive(&mut self) -> Result<(), ParseError> {
        let start = self.offset;
        let mut end = start;
        while let Some(byte) = self.byte_at(end) {
            let starts_comment = byte == b'/' && matches!(self.byte_at(end + 1), Some(b'/' | b'*'));
            if byte == b'\n' || starts_comment {
                break;
            }
            end += 1;
        }
        let raw = self.text(start, end).trim_end();
        let raw_end = start + raw.len();
        let body = raw.get(1..).unwrap_or("").trim_start();
        let name_length = body
            .bytes()
            .take_while(|&byte| is_word_continue(byte))
            .count();
        let (name, arguments) = body.split_at_checked(name_length).unwrap_or((body, ""));
        let kind = parse_directive(name, arguments.trim()).and_then(|kind| {
            if raw.contains('\\') {
                Err(ParseErrorKind::MalformedDirective(name.to_owned()))
            } else {
                Ok(kind)
            }
        });
        match kind {
            Ok(kind) => {
                let index = self.directives.len();
                self.directives.push(Directive {
                    raw: raw.to_owned(),
                    kind,
                });
                self.push(TokenKind::Directive(index), start, raw_end);
                self.offset = end;
                Ok(())
            }
            Err(kind) => Err(self.error(kind, start, raw_end)),
        }
    }
}

pub(crate) fn unescape(raw: &str) -> Result<String, ParseErrorKind> {
    let mut value = String::new();
    let mut terminated = false;
    let mut characters = raw.chars().peekable();
    while let Some(character) = characters.next() {
        let decoded = if character == '\\' {
            let escaped = characters.next().ok_or(ParseErrorKind::InvalidEscape)?;
            match escaped {
                '\'' | '"' | '?' | '\\' => escaped,
                'a' => '\u{7}',
                'b' => '\u{8}',
                'f' => '\u{c}',
                'n' => '\n',
                'r' => '\r',
                't' => '\t',
                'v' => '\u{b}',
                'x' => {
                    let mut code: u32 = 0;
                    let mut digits = 0;
                    while let Some(digit) = characters.peek().and_then(|next| next.to_digit(16)) {
                        code = code.wrapping_mul(16).wrapping_add(digit);
                        digits += 1;
                        characters.next();
                    }
                    if digits == 0 {
                        return Err(ParseErrorKind::HexEscapeWithoutDigits);
                    }
                    char::from_u32(code & 0xff).unwrap_or('\0')
                }
                '0'..='7' => {
                    let mut code = escaped.to_digit(8).unwrap_or(0);
                    let mut digits = 1;
                    while digits < 3 {
                        match characters.peek().and_then(|next| next.to_digit(8)) {
                            Some(digit) => {
                                code = code * 8 + digit;
                                digits += 1;
                                characters.next();
                            }
                            None => break,
                        }
                    }
                    char::from_u32(code & 0xff).unwrap_or('\0')
                }
                _ => return Err(ParseErrorKind::InvalidEscape),
            }
        } else {
            character
        };
        if decoded == '\0' {
            terminated = true;
        }
        if !terminated {
            value.push(decoded);
        }
    }
    Ok(value)
}

fn parse_directive(name: &str, arguments: &str) -> Result<DirectiveKind, ParseErrorKind> {
    let malformed = || ParseErrorKind::MalformedDirective(name.to_owned());
    match name {
        "version" => {
            let mut words = arguments.split_whitespace();
            let number = words
                .next()
                .and_then(|word| word.parse::<u32>().ok())
                .ok_or_else(malformed)?;
            let profile = words.next().map(ToOwned::to_owned);
            if words.next().is_some() {
                return Err(malformed());
            }
            Ok(DirectiveKind::Version { number, profile })
        }
        "extension" => {
            let (extension, behavior) = arguments.split_once(':').ok_or_else(malformed)?;
            let extension = extension.trim();
            let behavior =
                ExtensionBehavior::from_keyword(behavior.trim()).ok_or_else(malformed)?;
            if extension.is_empty() || !extension.bytes().all(is_word_continue) {
                return Err(malformed());
            }
            Ok(DirectiveKind::Extension {
                name: extension.to_owned(),
                behavior,
            })
        }
        "pragma" => Ok(DirectiveKind::Pragma {
            tokens: pragma_tokens(arguments),
        }),
        _ => Err(ParseErrorKind::UnsupportedDirective(name.to_owned())),
    }
}

fn pragma_tokens(arguments: &str) -> Vec<String> {
    let mut tokens = Vec::new();
    let mut word = String::new();
    for character in arguments.chars() {
        let continues_word = character.is_alphanumeric() || character == '_';
        if continues_word {
            word.push(character);
            continue;
        }
        if !word.is_empty() {
            tokens.push(core::mem::take(&mut word));
        }
        if !character.is_whitespace() {
            tokens.push(String::from(character));
        }
    }
    if !word.is_empty() {
        tokens.push(word);
    }
    tokens
}
