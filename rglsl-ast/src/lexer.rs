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
    };
    lexer.run()?;
    let end = Token {
        kind: TokenKind::End,
        span: span_between(source.len(), source.len()),
    };
    Ok(Tokens {
        tokens: lexer.tokens,
        directives: lexer.directives,
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
                (Some(b'l'), Some(b'f')) | (Some(b'L'), Some(b'F')) => {
                    end += 2;
                    NumericKind::Double
                }
                (Some(b'f' | b'F'), _) => {
                    end += 1;
                    NumericKind::Float
                }
                _ => NumericKind::Float,
            }
        } else if matches!(self.byte_at(end), Some(b'u' | b'U')) {
            end += 1;
            NumericKind::Uint
        } else {
            NumericKind::Int
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
