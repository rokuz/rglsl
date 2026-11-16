use std::fmt;

use rglsl::ShaderStage;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum Severity {
    Error,
    Warning,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Origin {
    Source,
    Stage(ShaderStage),
    Stages(String),
    Program,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Diagnostic {
    pub severity: Severity,
    pub origin: Origin,
    pub file: Option<String>,
    pub included: bool,
    pub line: Option<u32>,
    pub column: Option<u32>,
    pub message: String,
}

#[derive(Debug, Clone, Copy, Default, PartialEq, Eq)]
pub struct DiagnosticFormat {
    pub error_column: bool,
    pub absolute_path: bool,
    pub unnamed_source: bool,
}

impl DiagnosticFormat {
    const DISPLAY: Self = Self {
        error_column: true,
        absolute_path: false,
        unnamed_source: false,
    };
}

pub const fn glslang_stage_name(stage: ShaderStage) -> &'static str {
    match stage {
        ShaderStage::Vertex => "vertex",
        ShaderStage::TessControl => "tessellation control",
        ShaderStage::TessEvaluation => "tessellation evaluation",
        ShaderStage::Geometry => "geometry",
        ShaderStage::Fragment => "fragment",
        ShaderStage::Compute => "compute",
        ShaderStage::Task => "task",
        ShaderStage::Mesh => "mesh",
        ShaderStage::RayGeneration => "ray-generation",
        ShaderStage::Miss => "miss",
        ShaderStage::AnyHit => "any-hit",
        ShaderStage::ClosestHit => "closest-hit",
        ShaderStage::Intersection => "intersection",
        ShaderStage::Callable => "callable",
    }
}

impl Diagnostic {
    pub(crate) fn source(file: &str, message: impl Into<String>) -> Self {
        Self {
            severity: Severity::Error,
            origin: Origin::Source,
            file: Some(file.to_owned()),
            included: false,
            line: None,
            column: None,
            message: message.into(),
        }
    }

    pub(crate) fn error(message: impl Into<String>) -> Self {
        Self {
            severity: Severity::Error,
            origin: Origin::Source,
            file: None,
            included: false,
            line: None,
            column: None,
            message: message.into(),
        }
    }

    pub(crate) fn linking(severity: Severity, origin: Origin, message: impl Into<String>) -> Self {
        Self {
            severity,
            origin,
            file: None,
            included: false,
            line: None,
            column: None,
            message: message.into(),
        }
    }

    pub const fn is_error(&self) -> bool {
        matches!(self.severity, Severity::Error)
    }

    fn file_name(&self, format: DiagnosticFormat) -> Option<String> {
        let file = self.file.as_deref()?;
        if format.unnamed_source && !self.included {
            return Some(String::from("0"));
        }
        if format.absolute_path {
            return Some(std::fs::canonicalize(file).map_or_else(
                |_| file.to_owned(),
                |path| path.to_string_lossy().into_owned(),
            ));
        }
        Some(file.to_owned())
    }

    pub fn format(&self, format: DiagnosticFormat) -> String {
        let prefix = match self.severity {
            Severity::Error => "ERROR: ",
            Severity::Warning => "WARNING: ",
        };
        let mut text = String::from(prefix);
        if let Some(file) = self.file_name(format) {
            text.push_str(&file);
            if let Some(line) = self.line {
                text.push_str(&format!(":{line}"));
                if let Some(column) = self.column.filter(|_| format.error_column) {
                    text.push_str(&format!(":{column}"));
                }
            }
            text.push_str(": ");
        }
        match self.origin {
            Origin::Source => {}
            Origin::Stage(stage) => {
                text.push_str(&format!("Linking {} stage: ", glslang_stage_name(stage)));
            }
            Origin::Stages(ref stages) => text.push_str(&format!("Linking {stages} stages: ")),
            Origin::Program => text.push_str("Linking: "),
        }
        text.push_str(&self.message.replace('\n', &format!("\n{prefix}")));
        text
    }
}

impl fmt::Display for Diagnostic {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        formatter.write_str(&self.format(DiagnosticFormat::DISPLAY))
    }
}

#[derive(Debug, Clone, Default, PartialEq, Eq)]
pub struct Diagnostics {
    pub list: Vec<Diagnostic>,
}

impl Diagnostics {
    pub fn iter(&self) -> impl Iterator<Item = &Diagnostic> {
        self.list.iter()
    }

    pub fn is_empty(&self) -> bool {
        self.list.is_empty()
    }

    pub fn errors(&self) -> usize {
        self.list
            .iter()
            .filter(|diagnostic| diagnostic.is_error())
            .count()
    }

    pub fn has_errors(&self) -> bool {
        self.list.iter().any(Diagnostic::is_error)
    }

    pub fn format(&self, format: DiagnosticFormat) -> String {
        let mut text = String::new();
        for diagnostic in &self.list {
            text.push_str(&diagnostic.format(format));
            text.push('\n');
        }
        text
    }

    pub fn info_log(&self, format: DiagnosticFormat) -> String {
        let mut text = self.format(format);
        let errors = self.errors();
        if errors > 0 {
            text.push_str(&format!(
                "ERROR: {errors} compilation errors.  No code generated.\n\n"
            ));
        }
        text
    }
}

impl From<Diagnostic> for Diagnostics {
    fn from(diagnostic: Diagnostic) -> Self {
        Self {
            list: vec![diagnostic],
        }
    }
}

impl fmt::Display for Diagnostics {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        for (index, diagnostic) in self.list.iter().enumerate() {
            if index > 0 {
                writeln!(formatter)?;
            }
            write!(formatter, "{diagnostic}")?;
        }
        Ok(())
    }
}

impl std::error::Error for Diagnostics {}
