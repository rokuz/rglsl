use alloc::rc::Rc;
use alloc::string::String;

use crate::include::FileId;

pub(crate) const MAX_TOKEN_LENGTH: usize = 1024;

pub(crate) const OPERATORS: [&str; 48] = [
    "<<=", ">>=", "+=", "-=", "*=", "/=", "%=", ">>", "<<", "&=", "|=", "^=", "&&", "||", "^^",
    "==", "!=", ">=", "<=", "--", "++", "::", "~", "!", "%", "^", "&", "*", "(", ")", "-", "+",
    "=", "|", ",", ".", "<", ">", "/", "?", ";", ":", "[", "]", "{", "}", "#", "\\",
];

pub(crate) fn operator(text: &str) -> Option<&'static str> {
    OPERATORS.into_iter().find(|candidate| *candidate == text)
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Kind {
    Identifier,
    IntConst,
    Number,
    String,
    Op(&'static str),
    Bad(char),
    Quote,
    Newline,
    End,
    Marker,
    StringifyPush,
    StringifyPop,
    Paste,
}

impl Kind {
    pub(crate) fn is_op(self, op: &str) -> bool {
        matches!(self, Self::Op(text) if text == op)
    }

    pub(crate) const fn ends_line(self) -> bool {
        matches!(self, Self::Newline | Self::End)
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Default)]
pub(crate) struct At {
    pub(crate) file: FileId,
    pub(crate) offset: u32,
    pub(crate) exact: u32,
    pub(crate) cur_file: FileId,
    pub(crate) physical: u32,
    pub(crate) column: u32,
    pub(crate) line: i64,
    pub(crate) source: u32,
    pub(crate) expanded: bool,
}

#[derive(Debug, Clone)]
pub(crate) struct Token {
    pub(crate) kind: Kind,
    pub(crate) text: Rc<str>,
    pub(crate) value: i64,
    pub(crate) space: bool,
    pub(crate) fully_expanded: bool,
    pub(crate) at: At,
}

impl Token {
    pub(crate) fn new(kind: Kind, at: At) -> Self {
        Self {
            kind,
            text: Rc::from(""),
            value: 0,
            space: false,
            fully_expanded: false,
            at,
        }
    }

    pub(crate) fn with_text(kind: Kind, text: &str, at: At) -> Self {
        Self {
            text: Rc::from(text),
            ..Self::new(kind, at)
        }
    }

    pub(crate) fn is_identifier(&self, name: &str) -> bool {
        self.kind == Kind::Identifier && &*self.text == name
    }

    pub(crate) fn same_replacement(&self, other: &Self) -> bool {
        self.kind == other.kind
            && self.space == other.space
            && self.text == other.text
            && self.value == other.value
    }

    pub(crate) fn name(&self) -> String {
        match self.kind {
            Kind::Identifier | Kind::IntConst | Kind::Number | Kind::String => {
                String::from(&*self.text)
            }
            Kind::Op(op) => String::from(op),
            Kind::Bad(character) => {
                let mut text = String::new();
                text.push(character);
                text
            }
            Kind::Quote => String::from("'"),
            Kind::Paste => String::from("##"),
            Kind::Newline | Kind::End | Kind::Marker | Kind::StringifyPush | Kind::StringifyPop => {
                String::new()
            }
        }
    }

    pub(crate) fn spelling(&self, out: &mut String) {
        match self.kind {
            Kind::String => {
                out.push('"');
                escape_into(&self.text, out);
                out.push('"');
            }
            _ => out.push_str(&self.name()),
        }
    }
}

pub(crate) fn escape_into(text: &str, out: &mut String) {
    for character in text.chars() {
        match character {
            '"' => out.push_str("\\\""),
            '\\' => out.push_str("\\\\"),
            '\u{7}' => out.push_str("\\a"),
            '\u{8}' => out.push_str("\\b"),
            '\u{c}' => out.push_str("\\f"),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            '\u{b}' => out.push_str("\\v"),
            _ => out.push(character),
        }
    }
}
