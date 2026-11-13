use alloc::{borrow::Cow, boxed::Box, string::String};
use core::{error::Error, fmt};

#[derive(Clone, Debug)]
pub struct ShaderError<E> {
    /// The source code of the shader.
    pub source: String,
    pub label: Option<String>,
    pub inner: Box<E>,
}

impl fmt::Display for ShaderError<crate::front::glsl::ParseErrors> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let label = self.label.as_deref().unwrap_or_default();
        let string = self.inner.emit_to_string(&self.source);
        write!(f, "\nShader '{label}' parsing {string}")
    }
}

impl fmt::Display for ShaderError<crate::WithSpan<crate::valid::ValidationError>> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        use codespan_reporting::{files::SimpleFile, term};

        let label = self.label.as_deref().unwrap_or_default();
        let files = SimpleFile::new(label, replace_control_chars(&self.source));
        let config = term::Config::default();

        match DiagnosticBuffer::render(&config, &files, self.inner.diagnostic()) {
            Some(writer) => write!(f, "\nShader validation {writer}"),
            None => write!(f, "\nShader validation error: {}", self.inner.as_inner()),
        }
    }
}

pub(crate) struct DiagnosticBuffer {
    inner: String,
}

impl DiagnosticBuffer {
    pub const fn new() -> Self {
        Self {
            inner: String::new(),
        }
    }

    pub fn emit_to_self<'files, F: codespan_reporting::files::Files<'files> + ?Sized>(
        &mut self,
        config: &codespan_reporting::term::Config,
        files: &'files F,
        diagnostic: &codespan_reporting::diagnostic::Diagnostic<F::FileId>,
    ) -> Result<(), codespan_reporting::files::Error> {
        codespan_reporting::term::emit_to_string(&mut self.inner, config, files, diagnostic)
    }

    pub fn render<'files, F: codespan_reporting::files::Files<'files> + ?Sized>(
        config: &codespan_reporting::term::Config,
        files: &'files F,
        mut diagnostic: codespan_reporting::diagnostic::Diagnostic<F::FileId>,
    ) -> Option<String> {
        let mut writer = Self::new();
        if writer.emit_to_self(config, files, &diagnostic).is_ok() {
            return Some(writer.into_string());
        }
        diagnostic.labels.clear();
        let mut writer = Self::new();
        writer.emit_to_self(config, files, &diagnostic).ok()?;
        Some(writer.into_string())
    }

    pub fn into_string(self) -> String {
        let Self { inner } = self;
        inner
    }
}

impl<E> Error for ShaderError<E>
where
    ShaderError<E>: fmt::Display,
    E: Error + 'static,
{
    fn source(&self) -> Option<&(dyn Error + 'static)> {
        self.inner.source()
    }
}

pub(crate) fn replace_control_chars(s: &str) -> Cow<'_, str> {
    const REPLACEMENT_CHAR: &str = "\u{FFFD}";

    let mut res = Cow::Borrowed(s);
    let mut offset = 0;

    while let Some((found_pos, found)) = res[offset..]
        .char_indices()
        .find(|&(_, c)| c.is_control() && !c.is_whitespace())
    {
        offset += found_pos;
        res.to_mut()
            .replace_range(offset..offset + found.len_utf8(), REPLACEMENT_CHAR);
        offset += REPLACEMENT_CHAR.len();
    }

    res
}

#[test]
fn test_replace_control_chars() {
    // The UTF-8 encoding of \u{0080} is multiple bytes.
    let input = "Foo\u{0080}Bar\u{0001}Baz\n";
    let expected = "Foo\u{FFFD}Bar\u{FFFD}Baz\n";
    assert_eq!(replace_control_chars(input), expected);
}
