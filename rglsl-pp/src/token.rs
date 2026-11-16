use alloc::rc::Rc;
use alloc::string::String;
use core::borrow::Borrow;
use core::fmt;
use core::hash::{Hash, Hasher};
use core::ops::Deref;

use arrayvec::ArrayString;

use crate::include::FileId;

#[derive(Clone)]
pub(crate) enum TokenText {
    Inline(ArrayString<30>),
    Shared(Rc<str>),
}

impl TokenText {
    pub(crate) const fn empty() -> Self {
        Self::Inline(ArrayString::new_const())
    }

    pub(crate) fn from_str(text: &str) -> Self {
        match ArrayString::from(text) {
            Ok(inline) => Self::Inline(inline),
            Err(_) => Self::Shared(Rc::from(text)),
        }
    }

    pub(crate) fn as_str(&self) -> &str {
        match self {
            Self::Inline(inline) => inline.as_str(),
            Self::Shared(shared) => shared,
        }
    }
}

impl Default for TokenText {
    fn default() -> Self {
        Self::empty()
    }
}

impl Deref for TokenText {
    type Target = str;

    fn deref(&self) -> &str {
        self.as_str()
    }
}

impl Borrow<str> for TokenText {
    fn borrow(&self) -> &str {
        self.as_str()
    }
}

impl PartialEq for TokenText {
    fn eq(&self, other: &Self) -> bool {
        self.as_str() == other.as_str()
    }
}

impl Eq for TokenText {}

impl Hash for TokenText {
    fn hash<H: Hasher>(&self, state: &mut H) {
        self.as_str().hash(state);
    }
}

impl fmt::Debug for TokenText {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        self.as_str().fmt(formatter)
    }
}

pub(crate) const MAX_TOKEN_LENGTH: usize = 1024;

pub(crate) fn operator(text: &str) -> Option<&'static str> {
    Some(match text {
        "<<=" => "<<=",
        ">>=" => ">>=",
        "+=" => "+=",
        "-=" => "-=",
        "*=" => "*=",
        "/=" => "/=",
        "%=" => "%=",
        ">>" => ">>",
        "<<" => "<<",
        "&=" => "&=",
        "|=" => "|=",
        "^=" => "^=",
        "&&" => "&&",
        "||" => "||",
        "^^" => "^^",
        "==" => "==",
        "!=" => "!=",
        ">=" => ">=",
        "<=" => "<=",
        "--" => "--",
        "++" => "++",
        "::" => "::",
        "~" => "~",
        "!" => "!",
        "%" => "%",
        "^" => "^",
        "&" => "&",
        "*" => "*",
        "(" => "(",
        ")" => ")",
        "-" => "-",
        "+" => "+",
        "=" => "=",
        "|" => "|",
        "," => ",",
        "." => ".",
        "<" => "<",
        ">" => ">",
        "/" => "/",
        "?" => "?",
        ";" => ";",
        ":" => ":",
        "[" => "[",
        "]" => "]",
        "{" => "{",
        "}" => "}",
        "#" => "#",
        "\\" => "\\",
        _ => return None,
    })
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
    pub(crate) text: TokenText,
    pub(crate) value: i64,
    pub(crate) space: bool,
    pub(crate) fully_expanded: bool,
    pub(crate) at: At,
}

impl Token {
    pub(crate) const fn new(kind: Kind, at: At) -> Self {
        Self {
            kind,
            text: TokenText::empty(),
            value: 0,
            space: false,
            fully_expanded: false,
            at,
        }
    }

    pub(crate) fn with_text(kind: Kind, text: &str, at: At) -> Self {
        Self {
            kind,
            text: TokenText::from_str(text),
            value: 0,
            space: false,
            fully_expanded: false,
            at,
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
        let mut name = String::new();
        self.write_name(&mut name);
        name
    }

    fn write_name(&self, out: &mut String) {
        match self.kind {
            Kind::Identifier | Kind::IntConst | Kind::Number | Kind::String => {
                out.push_str(&self.text);
            }
            Kind::Op(op) => out.push_str(op),
            Kind::Bad(character) => out.push(character),
            Kind::Quote => out.push('\''),
            Kind::Paste => out.push_str("##"),
            Kind::Newline | Kind::End | Kind::Marker | Kind::StringifyPush | Kind::StringifyPop => {
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
            _ => self.write_name(out),
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
