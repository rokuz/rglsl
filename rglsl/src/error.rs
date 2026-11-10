use alloc::{borrow::Cow, boxed::Box, string::String};
use core::{error::Error, fmt};

#[derive(Clone, Debug)]
pub struct ShaderError<E> {
    /// The source code of the shader.
    pub source: String,
    pub label: Option<String>,
    pub inner: Box<E>,
}

#[cfg(feature = "glsl-in")]
impl fmt::Display for ShaderError<crate::front::glsl::ParseErrors> {
    fn fmt(&self, f: &mut fmt::Formatter<'_>) -> fmt::Result {
        let label = self.label.as_deref().unwrap_or_default();
        let string = self.inner.emit_to_string(&self.source);
        write!(f, "\nShader '{label}' parsing {string}")
    }
}

#[cfg(feature = "spv-in")]
impl fmt::Display for ShaderError<crate::front::spv::Error> {
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

cfg_if::cfg_if! {
    if #[cfg(feature = "termcolor")] {
        type DiagnosticBufferInner = codespan_reporting::term::termcolor::NoColor<alloc::vec::Vec<u8>>;
    } else if #[cfg(feature = "stderr")] {
        type DiagnosticBufferInner = alloc::vec::Vec<u8>;
    } else {
        type DiagnosticBufferInner = String;
    }
}

cfg_if::cfg_if! {
    if #[cfg(all(feature = "stderr", feature = "termcolor"))] {
        pub(crate) use codespan_reporting::term::termcolor::WriteColor as _ErrorWrite;
    } else if #[cfg(feature = "stderr")] {
        pub(crate) use std::io::Write as _ErrorWrite;
    }
}

#[cfg(feature = "stderr")]
pub(crate) use _ErrorWrite as ErrorWrite;

#[cfg(feature = "stderr")]
#[cfg_attr(
    not(any(feature = "spv-in", feature = "glsl-in")),
    expect(
        dead_code,
        reason = "only need `emit_to_writer` with an appropriate front-end."
    )
)]
pub(crate) fn emit_to_writer<'files, F: codespan_reporting::files::Files<'files> + ?Sized>(
    writer: &mut impl ErrorWrite,
    config: &codespan_reporting::term::Config,
    files: &'files F,
    diagnostic: &codespan_reporting::diagnostic::Diagnostic<F::FileId>,
) -> Result<(), codespan_reporting::files::Error> {
    cfg_if::cfg_if! {
        if #[cfg(feature = "termcolor")] {
            codespan_reporting::term::emit_to_write_style(writer, config, files, diagnostic)
        } else {
            codespan_reporting::term::emit_to_io_write(writer, config, files, diagnostic)
        }
    }
}

pub(crate) struct DiagnosticBuffer {
    inner: DiagnosticBufferInner,
}

impl DiagnosticBuffer {
    #[cfg_attr(
        not(feature = "termcolor"),
        expect(
            clippy::missing_const_for_fn,
            reason = "`NoColor::new` isn't `const`, but other `inner`s are."
        )
    )]
    pub fn new() -> Self {
        cfg_if::cfg_if! {
            if #[cfg(feature = "termcolor")] {
                let inner = codespan_reporting::term::termcolor::NoColor::new(alloc::vec::Vec::new());
            } else if #[cfg(feature = "stderr")] {
                let inner = alloc::vec::Vec::new();
            } else {
                let inner = String::new();
            }
        };

        Self { inner }
    }

    pub fn emit_to_self<'files, F: codespan_reporting::files::Files<'files> + ?Sized>(
        &mut self,
        config: &codespan_reporting::term::Config,
        files: &'files F,
        diagnostic: &codespan_reporting::diagnostic::Diagnostic<F::FileId>,
    ) -> Result<(), codespan_reporting::files::Error> {
        cfg_if::cfg_if! {
            if #[cfg(feature = "termcolor")] {
                codespan_reporting::term::emit_to_write_style(&mut self.inner, config, files, diagnostic)
            } else if #[cfg(feature = "stderr")] {
                codespan_reporting::term::emit_to_io_write(&mut self.inner, config, files, diagnostic)
            } else {
                codespan_reporting::term::emit_to_string(&mut self.inner, config, files, diagnostic)
            }
        }
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

        cfg_if::cfg_if! {
            if #[cfg(feature = "termcolor")] {
                utf8_to_string(inner.into_inner())
            } else if #[cfg(feature = "stderr")] {
                utf8_to_string(inner)
            } else {
                inner
            }
        }
    }
}

#[cfg(any(feature = "termcolor", feature = "stderr"))]
fn utf8_to_string(bytes: alloc::vec::Vec<u8>) -> String {
    match String::from_utf8(bytes) {
        Ok(string) => string,
        Err(error) => String::from_utf8_lossy(error.as_bytes()).into_owned(),
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
