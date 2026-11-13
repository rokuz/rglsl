use alloc::{
    borrow::Cow,
    format,
    string::{String, ToString},
    vec,
    vec::Vec,
};

use codespan_reporting::diagnostic::{Diagnostic, Label};
use codespan_reporting::files::SimpleFile;
use codespan_reporting::term;
use thiserror::Error;

use crate::{SourceLocation, error::replace_control_chars};
use crate::{Span, proc::ConstantEvaluatorError};

/// Information about the cause of an error.
#[derive(Clone, Debug, Error)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub enum ErrorKind {
    #[error("Not implemented: {0}")]
    Unsupported(String),
    #[error("{0}")]
    Syntax(String),
    /// A semantic error was detected in the shader.
    #[error("{0}")]
    SemanticError(Cow<'static, str>),
    /// The parser entered an illegal state and exited
    ///
    /// This obviously is a bug and as such should be reported in the github issue tracker
    #[error("Internal error: {0}")]
    InternalError(&'static str),
    #[error("{0}")]
    Link(String),
}

impl From<ConstantEvaluatorError> for ErrorKind {
    fn from(err: ConstantEvaluatorError) -> Self {
        ErrorKind::SemanticError(err.to_string().into())
    }
}

/// Error returned during shader parsing.
#[derive(Clone, Debug, Error)]
#[error("{kind}")]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub struct Error {
    /// Holds the information about the error itself.
    pub kind: ErrorKind,
    /// Holds information about the range of the source code where the error happened.
    pub meta: Span,
}

impl Error {
    /// Returns a [`SourceLocation`] for the error message.
    pub fn location(&self, source: &str) -> Option<SourceLocation> {
        Some(self.meta.location(source))
    }
}

#[derive(Clone, Debug, PartialEq, Eq)]
pub struct IncludeLocation {
    pub file: String,
    pub line: u32,
}

/// A collection of errors returned during shader parsing.
#[derive(Clone, Debug)]
#[cfg_attr(test, derive(PartialEq, Eq))]
pub struct ParseErrors {
    pub errors: Vec<Error>,
    pub included: Vec<Option<IncludeLocation>>,
}

impl ParseErrors {
    pub fn include_location(&self, index: usize) -> Option<&IncludeLocation> {
        self.included.get(index).and_then(Option::as_ref)
    }

    pub fn emit_to_string(&self, source: &str) -> String {
        self.emit_to_string_with_path(source, "glsl")
    }

    pub fn emit_to_string_with_path(&self, source: &str, path: &str) -> String {
        let path = path.to_string();
        let files = SimpleFile::new(path, replace_control_chars(source));
        let config = term::Config::default();

        let mut writer = crate::error::DiagnosticBuffer::new();
        let mut unrendered = String::new();
        for err in &self.errors {
            let diagnostic = Self::make_diagnostic(err);
            if let Err(render_error) = writer.emit_to_self(&config, &files, &diagnostic) {
                unrendered.push_str(&format!(
                    "error: {}\n  = cannot render the source location: {render_error}\n",
                    err.kind
                ));
            }
        }
        let mut rendered = writer.into_string();
        rendered.push_str(&unrendered);
        rendered
    }

    fn make_diagnostic(err: &Error) -> Diagnostic<()> {
        let mut diagnostic = Diagnostic::error().with_message(err.kind.to_string());
        if let Some(range) = err.meta.to_range() {
            diagnostic = diagnostic.with_labels(vec![Label::primary((), range)]);
        }
        diagnostic
    }
}

impl core::fmt::Display for ParseErrors {
    fn fmt(&self, f: &mut core::fmt::Formatter) -> core::fmt::Result {
        self.errors.iter().try_for_each(|e| write!(f, "{e:?}"))
    }
}

impl core::error::Error for ParseErrors {}

impl From<Vec<Error>> for ParseErrors {
    fn from(errors: Vec<Error>) -> Self {
        Self {
            errors,
            included: Vec::new(),
        }
    }
}

impl From<Vec<(Error, Option<IncludeLocation>)>> for ParseErrors {
    fn from(located: Vec<(Error, Option<IncludeLocation>)>) -> Self {
        let (errors, included) = located.into_iter().unzip();
        Self { errors, included }
    }
}
