use alloc::boxed::Box;
use alloc::format;
use alloc::string::String;
use alloc::vec::Vec;
use core::any::Any;
use core::fmt;

const INLINE_NESTING: u8 = 1;

pub trait Decode: Sized + 'static {
    fn decode(input: &mut Input<'_>) -> Result<Decoded<Self>, Error>;
}

pub enum Decoded<T> {
    Value(T),
    Frame(Child),
}

impl<T> fmt::Debug for Decoded<T> {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(match *self {
            Self::Value(_) => "Value",
            Self::Frame(_) => "Frame",
        })
    }
}

pub type Child = Box<dyn Frame>;

pub enum Step {
    Push(Child),
    Done,
}

impl fmt::Debug for Step {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(match *self {
            Self::Push(_) => "Push",
            Self::Done => "Done",
        })
    }
}

pub trait Frame {
    fn step(&mut self, input: &mut Input<'_>) -> Result<Step, Error>;

    fn accept(&mut self, child: Child, input: &mut Input<'_>) -> Result<(), Error>;

    fn build(self: Box<Self>, input: &mut Input<'_>, slot: &mut dyn Any) -> Result<(), Error>;
}

pub trait Record: Sized + 'static {
    type Value: 'static;

    fn step(&mut self, input: &mut Input<'_>) -> Result<Step, Error>;

    fn accept(&mut self, child: Child, input: &mut Input<'_>) -> Result<(), Error>;

    fn value(self, input: &mut Input<'_>) -> Result<Self::Value, Error>;
}

struct Held<R> {
    record: R,
    held: Option<Child>,
}

impl<R: Record> Frame for Held<R> {
    fn step(&mut self, input: &mut Input<'_>) -> Result<Step, Error> {
        match self.held.take() {
            Some(child) => Ok(Step::Push(child)),
            None => self.record.step(input),
        }
    }

    fn accept(&mut self, child: Child, input: &mut Input<'_>) -> Result<(), Error> {
        self.record.accept(child, input)
    }

    fn build(self: Box<Self>, input: &mut Input<'_>, slot: &mut dyn Any) -> Result<(), Error> {
        let Some(slot) = slot.downcast_mut::<Option<R::Value>>() else {
            return Err(input.internal());
        };
        *slot = Some(self.record.value(input)?);
        Ok(())
    }
}

pub fn start<R: Record>(mut record: R, input: &mut Input<'_>) -> Result<Decoded<R::Value>, Error> {
    let Some(budget) = input.budget.checked_sub(1) else {
        return Ok(Decoded::Frame(Box::new(Held { record, held: None })));
    };
    input.budget = budget;
    let stepped = record.step(input);
    input.budget = budget + 1;
    match stepped? {
        Step::Done => record.value(input).map(Decoded::Value),
        Step::Push(child) => Ok(Decoded::Frame(Box::new(Held {
            record,
            held: Some(child),
        }))),
    }
}

pub fn built<T: 'static>(frame: Child, input: &mut Input<'_>) -> Result<T, Error> {
    let mut slot: Option<T> = None;
    frame.build(input, &mut slot)?;
    slot.ok_or_else(|| input.internal())
}

pub type FieldDecoder<R> = fn(&mut R, &mut Input<'_>) -> Result<Option<Child>, Error>;

pub type FieldAcceptor<R> = fn(&mut R, Child, &mut Input<'_>) -> Result<(), Error>;

pub type VariantDecoder<T> = fn(&mut Input<'_>) -> Result<Decoded<T>, Error>;

pub fn field<T: Decode>(
    slot: &mut Option<T>,
    input: &mut Input<'_>,
    owner: &str,
    name: &str,
) -> Result<Option<Child>, Error> {
    if slot.is_some() {
        return Err(input.duplicate_field(owner, name));
    }
    element(slot, input)
}

pub fn element<T: Decode>(
    slot: &mut Option<T>,
    input: &mut Input<'_>,
) -> Result<Option<Child>, Error> {
    match T::decode(input)? {
        Decoded::Value(value) => {
            *slot = Some(value);
            Ok(None)
        }
        Decoded::Frame(frame) => Ok(Some(frame)),
    }
}

pub fn fill<T: 'static>(
    slot: &mut Option<T>,
    child: Child,
    input: &mut Input<'_>,
) -> Result<(), Error> {
    *slot = Some(built(child, input)?);
    Ok(())
}

struct Then<T, W> {
    value: Option<T>,
    started: bool,
    close: bool,
    wrap: fn(T) -> W,
}

impl<T: Decode, W: 'static> Record for Then<T, W> {
    type Value = W;

    fn step(&mut self, input: &mut Input<'_>) -> Result<Step, Error> {
        if !self.started {
            self.started = true;
            match T::decode(input)? {
                Decoded::Value(value) => self.value = Some(value),
                Decoded::Frame(frame) => return Ok(Step::Push(frame)),
            }
        }
        if self.close {
            input.expect(b')')?;
        }
        Ok(Step::Done)
    }

    fn accept(&mut self, child: Child, input: &mut Input<'_>) -> Result<(), Error> {
        self.value = Some(built::<T>(child, input)?);
        Ok(())
    }

    fn value(self, input: &mut Input<'_>) -> Result<W, Error> {
        self.value.map(self.wrap).ok_or_else(|| input.internal())
    }
}

pub fn wrap<T: Decode, W: 'static>(
    input: &mut Input<'_>,
    wrap: fn(T) -> W,
    close: bool,
) -> Result<Decoded<W>, Error> {
    let mut then = Then {
        value: None,
        started: false,
        close,
        wrap,
    };
    let Some(budget) = input.budget.checked_sub(1) else {
        return Ok(Decoded::Frame(Box::new(Held {
            record: then,
            held: None,
        })));
    };
    then.started = true;
    input.budget = budget;
    let decoded = T::decode(input);
    input.budget = budget + 1;
    match decoded? {
        Decoded::Value(value) => {
            if close {
                input.expect(b')')?;
            }
            Ok(Decoded::Value(wrap(value)))
        }
        Decoded::Frame(frame) => Ok(Decoded::Frame(Box::new(Held {
            record: then,
            held: Some(frame),
        }))),
    }
}

pub fn from_str<T: Decode>(text: &str) -> Result<T, Error> {
    let mut input = Input {
        text,
        at: 0,
        budget: INLINE_NESTING,
    };
    let value = match T::decode(&mut input)? {
        Decoded::Value(value) => value,
        Decoded::Frame(root) => {
            let root = drive(root, &mut input)?;
            built::<T>(root, &mut input)?
        }
    };
    input.end()?;
    Ok(value)
}

fn drive(root: Child, input: &mut Input<'_>) -> Result<Child, Error> {
    let mut frames = Vec::from([root]);
    loop {
        let Some(top) = frames.last_mut() else {
            return Err(input.internal());
        };
        match top.step(input)? {
            Step::Push(child) => frames.push(child),
            Step::Done => {
                let Some(done) = frames.pop() else {
                    return Err(input.internal());
                };
                match frames.last_mut() {
                    Some(parent) => parent.accept(done, input)?,
                    None => return Ok(done),
                }
            }
        }
    }
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct Error {
    message: String,
    line: usize,
    column: usize,
}

impl fmt::Display for Error {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        write!(
            formatter,
            "{} at line {}, column {}",
            self.message, self.line, self.column
        )
    }
}

impl core::error::Error for Error {}

#[derive(Clone, Debug)]
pub struct Input<'t> {
    text: &'t str,
    at: usize,
    budget: u8,
}

fn quoted(names: &[&str]) -> String {
    let mut text = String::new();
    for (index, name) in names.iter().enumerate() {
        if index > 0 {
            text.push_str(", ");
        }
        text.push('`');
        text.push_str(name);
        text.push('`');
    }
    text
}

impl<'t> Input<'t> {
    pub fn error(&self, message: impl Into<String>) -> Error {
        let before = self.text.get(..self.at).unwrap_or(self.text);
        let line_start = before.rfind('\n').map_or(0, |newline| newline + 1);
        Error {
            message: message.into(),
            line: before.matches('\n').count() + 1,
            column: before
                .get(line_start..)
                .map_or(1, |line| line.chars().count() + 1),
        }
    }

    fn internal(&self) -> Error {
        self.error("internal error: a decoded value has an unexpected type")
    }

    fn found(&self) -> String {
        match self
            .text
            .get(self.at..)
            .and_then(|rest| rest.chars().next())
        {
            Some(found) => format!("found `{found}`"),
            None => String::from("found the end of the input"),
        }
    }

    pub fn expected(&self, what: &str) -> Error {
        self.error(format!("expected {what}, {}", self.found()))
    }

    pub fn missing_field(&self, owner: &str, field: &str) -> Error {
        self.error(format!("missing field `{field}` of `{owner}`"))
    }

    pub fn duplicate_field(&self, owner: &str, field: &str) -> Error {
        self.error(format!("duplicate field `{field}` of `{owner}`"))
    }

    pub fn unknown_field(&self, owner: &str, field: &str, expected: &[&str]) -> Error {
        self.error(format!(
            "unknown field `{field}` of `{owner}`, expected one of {}",
            quoted(expected)
        ))
    }

    pub fn unknown_variant(&self, owner: &str, variant: &str, expected: &[&str]) -> Error {
        self.error(format!(
            "unknown variant `{variant}` of `{owner}`, expected one of {}",
            quoted(expected)
        ))
    }

    pub fn length(&self, owner: &str, expected: usize) -> Error {
        self.error(format!("`{owner}` expects {expected} elements"))
    }

    fn skip_space(&mut self) {
        let bytes = self.text.as_bytes();
        while let Some(&byte) = bytes.get(self.at) {
            if !matches!(byte, b' ' | b'\t' | b'\n' | b'\r') {
                break;
            }
            self.at += 1;
        }
    }

    fn peek(&mut self) -> Option<u8> {
        self.skip_space();
        self.text.as_bytes().get(self.at).copied()
    }

    pub fn eat(&mut self, byte: u8) -> bool {
        let found = self.peek() == Some(byte);
        if found {
            self.at += 1;
        }
        found
    }

    pub fn expect(&mut self, byte: u8) -> Result<(), Error> {
        if self.eat(byte) {
            Ok(())
        } else {
            Err(self.expected(&format!("`{}`", char::from(byte))))
        }
    }

    pub fn next_element(&mut self, more: &mut bool, close: u8) -> Result<bool, Error> {
        if *more && !self.eat(b',') {
            if self.eat(close) {
                return Ok(false);
            }
            return Err(self.expected(&format!("`,` or `{}`", char::from(close))));
        }
        if self.eat(close) {
            return Ok(false);
        }
        *more = true;
        Ok(true)
    }

    pub fn end(&mut self) -> Result<(), Error> {
        match self.peek() {
            None => Ok(()),
            Some(_) => Err(self.expected("the end of the input")),
        }
    }

    pub fn identifier(&mut self) -> Result<&'t str, Error> {
        self.skip_space();
        let bytes = self.text.as_bytes();
        let mut start = self.at;
        if bytes.get(start..start + 2) == Some(b"r#") {
            start += 2;
        }
        let mut end = start;
        while let Some(&byte) = bytes.get(end) {
            let accepted = byte == b'_'
                || byte.is_ascii_alphabetic()
                || (end > start && byte.is_ascii_digit());
            if !accepted {
                break;
            }
            end += 1;
        }
        match self.text.get(start..end) {
            Some(name) if !name.is_empty() => {
                self.at = end;
                Ok(name)
            }
            _ => Err(self.expected("an identifier")),
        }
    }

    pub fn field_name(&mut self) -> Result<&'t str, Error> {
        let name = self.identifier()?;
        self.expect(b':')?;
        Ok(name)
    }

    fn token(&mut self, accepted: impl Fn(u8) -> bool) -> &'t str {
        self.skip_space();
        let bytes = self.text.as_bytes();
        let start = self.at;
        let mut end = start;
        while bytes.get(end).is_some_and(|&byte| accepted(byte)) {
            end += 1;
        }
        self.at = end;
        self.text.get(start..end).unwrap_or_default()
    }

    pub fn unsigned<T: TryFrom<u64>>(&mut self, owner: &str) -> Result<T, Error> {
        let start = self.at;
        let digits = self.token(|byte| byte.is_ascii_digit());
        let parsed = if digits.is_empty() {
            None
        } else {
            digits.parse::<u64>().ok()
        };
        match parsed.map(T::try_from) {
            Some(Ok(value)) => Ok(value),
            Some(Err(_)) | None => {
                self.at = start;
                Err(self.expected(&format!("an integer of type `{owner}`")))
            }
        }
    }

    pub fn signed<T: TryFrom<i64>>(&mut self, owner: &str) -> Result<T, Error> {
        let start = self.at;
        let negative = self.eat(b'-');
        let digits = self.token(|byte| byte.is_ascii_digit());
        let magnitude = if digits.is_empty() {
            None
        } else {
            digits.parse::<i128>().ok()
        };
        let value = magnitude
            .map(|magnitude| if negative { -magnitude } else { magnitude })
            .and_then(|value| i64::try_from(value).ok())
            .map(T::try_from);
        match value {
            Some(Ok(value)) => Ok(value),
            Some(Err(_)) | None => {
                self.at = start;
                Err(self.expected(&format!("an integer of type `{owner}`")))
            }
        }
    }

    pub fn float<T: core::str::FromStr>(&mut self, owner: &str) -> Result<T, Error> {
        let start = self.at;
        let text =
            self.token(|byte| byte.is_ascii_alphanumeric() || matches!(byte, b'.' | b'+' | b'-'));
        match text.parse() {
            Ok(value) if !text.is_empty() => Ok(value),
            _ => {
                self.at = start;
                Err(self.expected(&format!("a number of type `{owner}`")))
            }
        }
    }

    pub fn boolean(&mut self) -> Result<bool, Error> {
        let start = self.at;
        match self.identifier() {
            Ok("true") => Ok(true),
            Ok("false") => Ok(false),
            _ => {
                self.at = start;
                Err(self.expected("`true` or `false`"))
            }
        }
    }

    pub fn string(&mut self) -> Result<String, Error> {
        self.expect(b'"')?;
        let bytes = self.text.as_bytes();
        let mut text = String::new();
        let mut plain = self.at;
        loop {
            match bytes.get(self.at) {
                None => return Err(self.expected("the end of a string")),
                Some(b'"') => {
                    text.push_str(self.text.get(plain..self.at).unwrap_or_default());
                    self.at += 1;
                    return Ok(text);
                }
                Some(b'\\') => {
                    text.push_str(self.text.get(plain..self.at).unwrap_or_default());
                    self.at += 1;
                    text.push(self.escape()?);
                    plain = self.at;
                }
                Some(_) => self.at += 1,
            }
        }
    }

    fn escape(&mut self) -> Result<char, Error> {
        let escaped = match self.text.as_bytes().get(self.at) {
            Some(b'n') => '\n',
            Some(b'r') => '\r',
            Some(b't') => '\t',
            Some(b'0') => '\0',
            Some(b'\\') => '\\',
            Some(b'\'') => '\'',
            Some(b'"') => '"',
            Some(b'u') => {
                self.at += 1;
                self.expect(b'{')?;
                let start = self.at;
                let digits = self.token(|byte| byte.is_ascii_hexdigit());
                let character = u32::from_str_radix(digits, 16)
                    .ok()
                    .and_then(char::from_u32);
                let Some(character) = character else {
                    self.at = start;
                    return Err(self.expected("a Unicode scalar value"));
                };
                self.expect(b'}')?;
                return Ok(character);
            }
            _ => return Err(self.expected("an escape sequence")),
        };
        self.at += 1;
        Ok(escaped)
    }
}
