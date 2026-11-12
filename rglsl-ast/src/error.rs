use alloc::string::String;

use crate::span::{line_column, LineColumn, Span};

#[derive(Debug, Clone, PartialEq, Eq, thiserror::Error)]
#[error("{position}: {kind}")]
pub struct ParseError {
    pub kind: ParseErrorKind,
    pub span: Span,
    pub position: LineColumn,
}

impl ParseError {
    pub fn new(kind: ParseErrorKind, span: Span, source: &str) -> Self {
        Self {
            kind,
            span,
            position: line_column(source, span.start),
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq, thiserror::Error)]
pub enum ParseErrorKind {
    #[error("preprocessor directives are not supported yet: `#{0}`")]
    UnsupportedDirective(String),
    #[error("malformed `#{0}` directive")]
    MalformedDirective(String),
    #[error("unterminated comment")]
    UnterminatedComment,
    #[error("end of line in string")]
    UnterminatedString,
    #[error("invalid escape sequence")]
    InvalidEscape,
    #[error("expected hex value in escape sequence")]
    HexEscapeWithoutDigits,
    #[error("unexpected character `{0}`")]
    UnexpectedCharacter(char),
    #[error("invalid numeric literal `{0}`")]
    InvalidNumber(String),
    #[error("expected {expected}, found {found}")]
    UnexpectedToken { expected: String, found: String },
    #[error("unknown type name `{0}`")]
    UnknownType(String),
    #[error("`{0}` is a reserved word and cannot be used as a name")]
    ReservedWord(String),
    #[error("the source is too large")]
    SourceTooLarge,
    #[error("the source has too many syntax nodes")]
    TooManyNodes,
    #[error("`{word}` requires one of the extensions: {extensions}")]
    ExtensionRequired { word: String, extensions: String },
    #[error("`{0}` does not take type parameters")]
    UnexpectedTypeParameters(String),
    #[error("internal parser error")]
    Internal,
}
