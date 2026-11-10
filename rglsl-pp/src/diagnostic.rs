use alloc::string::String;
use core::fmt;

use crate::include::FileId;

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash, Default)]
pub struct Location {
    pub file: FileId,
    pub offset: u32,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum Severity {
    Warning,
    Error,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Phase {
    Preprocessor,
    Compiler,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Hash)]
pub enum Redefinition {
    FunctionLikeVersusObjectLike,
    ParameterCount,
    ParameterNames,
    Substitution,
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
#[non_exhaustive]
pub enum DiagnosticKind {
    MissingMacroName {
        directive: &'static str,
    },
    BadMacroParameter,
    DuplicateMacroParameter,
    MissingParenthesis,
    MissingSpaceAfterMacroName,
    StringifyWithoutParameter,
    PasteStringifyMix,
    IncompletePaste,
    MacroRedefined {
        name: String,
        how: Redefinition,
    },
    UndefExtraTokens,
    ReservedGlPrefix {
        name: String,
        directive: &'static str,
    },
    DefinedRedefined {
        directive: &'static str,
    },
    ReservedDoubleUnderscore {
        name: String,
        directive: &'static str,
    },
    ReservedDoubleUnderscoreEs {
        name: String,
        directive: &'static str,
    },
    PredefinedRedefined {
        name: String,
        directive: &'static str,
    },
    ExtraTokens {
        directive: &'static str,
    },
    IfdefExtraTokens,
    ElseAfterElse,
    ElifAfterElse,
    Mismatched {
        directive: &'static str,
    },
    NestingTooDeep {
        directive: &'static str,
    },
    MissingEndif,
    DefinedFromMacro,
    DefinedWithoutIdentifier,
    ExpectedCloseParen,
    BadExpression,
    CannotEvaluate,
    DivisionByZero,
    ExpressionTooDeep,
    IncludeWithoutHeaderName,
    IncludeMissingNewline {
        name: String,
    },
    IncludeExtraContent {
        name: String,
    },
    IncludeFailed {
        name: String,
        message: String,
    },
    IncludeTooDeep {
        name: String,
    },
    RecursiveInclude {
        name: String,
    },
    LineWithoutNumber,
    ExtensionRequired {
        feature: &'static str,
        extension: &'static str,
    },
    ErrorDirective {
        message: String,
    },
    PragmaWithoutNewline,
    PragmaOnceNotImplemented,
    VersionNotFirst,
    VersionWithoutNumber,
    BadProfile,
    VersionExtraTokens,
    VersionUnsupported {
        message: &'static str,
    },
    ExtensionNameMissing,
    ExtensionNameExpected,
    ExtensionColonMissing,
    ExtensionBehaviorMissing,
    ExtensionExtraTokens,
    ExtensionBehaviorUnknown {
        behavior: String,
    },
    ExtensionAllEnabled,
    InvalidDirective {
        name: Option<String>,
    },
    DirectiveAfterToken,
    MacroEndOfInput {
        name: String,
    },
    MacroEndOfLine {
        name: String,
    },
    MacroUnexpectedHash {
        name: String,
    },
    TooFewArguments {
        name: String,
    },
    TooManyArguments {
        name: String,
    },
    ExpansionTooDeep {
        name: String,
    },
    PasteAtStart,
    PasteAtEndOfReplacement,
    PasteAtEndOfArgument,
    PasteNotSupported,
    PasteTooLong,
    PasteInvalid,
    UnterminatedComment,
    NameTooLong,
    InvalidLiteral {
        reason: &'static str,
    },
    InvalidEscape,
    HexEscapeWithoutDigits,
    UnterminatedString,
    CharacterLiteral,
    HeaderNameTooLong,
    ContinuationInComment {
        allowed: bool,
    },
    ContinuationNotAllowed,
    FeatureRequiresVersion {
        feature: &'static str,
        version: u32,
    },
    TokenLimitExceeded,
    OutputLimitExceeded,
}

impl DiagnosticKind {
    pub const fn severity(&self) -> Severity {
        match self {
            Self::MissingSpaceAfterMacroName
            | Self::ReservedDoubleUnderscore { .. }
            | Self::PragmaOnceNotImplemented
            | Self::ContinuationInComment { .. } => Severity::Warning,
            _ => Severity::Error,
        }
    }

    pub const fn phase(&self) -> Phase {
        match self {
            Self::ExtensionBehaviorUnknown { .. }
            | Self::ExtensionAllEnabled
            | Self::ContinuationNotAllowed
            | Self::FeatureRequiresVersion { .. } => Phase::Compiler,
            _ => Phase::Preprocessor,
        }
    }

    fn parts(&self) -> (&str, &str, &str) {
        match self {
            Self::MissingMacroName { directive } => (directive, "must be followed by macro name", ""),
            Self::BadMacroParameter => ("#define", "bad argument", ""),
            Self::DuplicateMacroParameter => ("#define", "duplicate macro parameter", ""),
            Self::MissingParenthesis => ("#define", "missing parenthesis", ""),
            Self::MissingSpaceAfterMacroName => ("#define", "missing space after macro name", ""),
            Self::StringifyWithoutParameter => {
                ("#", "'#' is not followed by a macro parameter.", "")
            }
            Self::PasteStringifyMix => (
                "#",
                "Illegal sequence of paste (##) and stringify (#).",
                "",
            ),
            Self::IncompletePaste => (
                "#",
                "Macro ended with incomplete '#' paste/stringify operators",
                "",
            ),
            Self::MacroRedefined { name, how } => (
                "#define",
                match how {
                    Redefinition::FunctionLikeVersusObjectLike => {
                        "Macro redefined; function-like versus object-like:"
                    }
                    Redefinition::ParameterCount => {
                        "Macro redefined; different number of arguments:"
                    }
                    Redefinition::ParameterNames => "Macro redefined; different argument names:",
                    Redefinition::Substitution => "Macro redefined; different substitutions:",
                },
                name,
            ),
            Self::UndefExtraTokens => ("#undef", "can only be followed by a single macro name", ""),
            Self::ReservedGlPrefix { name, directive } => (
                directive,
                "names beginning with \"GL_\" can't be (un)defined:",
                name,
            ),
            Self::DefinedRedefined { directive } => {
                (directive, "\"defined\" can't be (un)defined:", "defined")
            }
            Self::ReservedDoubleUnderscore { name, directive } => (
                directive,
                "names containing consecutive underscores are reserved:",
                name,
            ),
            Self::ReservedDoubleUnderscoreEs { name, directive } => (
                directive,
                "names containing consecutive underscores are reserved, and an error if version < 300:",
                name,
            ),
            Self::PredefinedRedefined { name, directive } => {
                (directive, "predefined names can't be (un)defined:", name)
            }
            Self::ExtraTokens { directive } => {
                (directive, "unexpected tokens following directive", "")
            }
            Self::IfdefExtraTokens => (
                "#ifdef",
                "unexpected tokens following #ifdef directive - expected a newline",
                "",
            ),
            Self::ElseAfterElse => ("#else", "#else after #else", ""),
            Self::ElifAfterElse => ("#elif", "#elif after #else", ""),
            Self::Mismatched { directive } => (directive, "mismatched statements", ""),
            Self::NestingTooDeep { directive } => (directive, "maximum nesting depth exceeded", ""),
            Self::MissingEndif => ("", "missing #endif", ""),
            Self::DefinedFromMacro => (
                "defined",
                "cannot use in preprocessor expression when expanded from macros",
                "",
            ),
            Self::DefinedWithoutIdentifier => (
                "preprocessor evaluation",
                "incorrect directive, expected identifier",
                "",
            ),
            Self::ExpectedCloseParen => ("preprocessor evaluation", "expected ')'", ""),
            Self::BadExpression => ("preprocessor evaluation", "bad expression", ""),
            Self::CannotEvaluate => ("preprocessor evaluation", "can't evaluate expression", ""),
            Self::DivisionByZero => ("preprocessor evaluation", "division by 0", ""),
            Self::ExpressionTooDeep => ("preprocessor evaluation", "expression nested too deeply", ""),
            Self::IncludeWithoutHeaderName => ("#include", "must be followed by a header name", ""),
            Self::IncludeMissingNewline { name } => {
                ("#include", "expected newline after header name:", name)
            }
            Self::IncludeExtraContent { name } => {
                ("#include", "extra content after header name:", name)
            }
            Self::IncludeFailed { name, message } => ("#include", message, name),
            Self::IncludeTooDeep { name } => ("#include", "include depth limit exceeded:", name),
            Self::RecursiveInclude { name } => ("#include", "recursive include:", name),
            Self::LineWithoutNumber => ("#line", "must by followed by an integral literal", ""),
            Self::ExtensionRequired { feature, extension } => {
                (feature, "required extension not requested:", extension)
            }
            Self::ErrorDirective { message } => ("#error", message, ""),
            Self::PragmaWithoutNewline => ("#pragma", "directive must end with a newline", ""),
            Self::PragmaOnceNotImplemented => ("#pragma once", "not implemented", ""),
            Self::VersionNotFirst => ("#version", "must occur first in shader", ""),
            Self::VersionWithoutNumber => ("#version", "must be followed by version number", ""),
            Self::BadProfile => (
                "#version",
                "bad profile name; use es, core, or compatibility",
                "",
            ),
            Self::VersionExtraTokens => (
                "#version",
                "bad tokens following profile -- expected newline",
                "",
            ),
            Self::VersionUnsupported { message } => ("#version", message, ""),
            Self::ExtensionNameMissing => ("#extension", "extension name not specified", ""),
            Self::ExtensionNameExpected => ("#extension", "extension name expected", ""),
            Self::ExtensionColonMissing => ("#extension", "':' missing after extension name", ""),
            Self::ExtensionBehaviorMissing => {
                ("#extension", "behavior for extension not specified", "")
            }
            Self::ExtensionExtraTokens => ("#extension", "extra tokens -- expected newline", ""),
            Self::ExtensionBehaviorUnknown { behavior } => {
                ("#extension", "behavior not supported:", behavior)
            }
            Self::ExtensionAllEnabled => (
                "#extension",
                "extension 'all' cannot have 'require' or 'enable' behavior",
                "",
            ),
            Self::InvalidDirective { name: Some(name) } => ("#", "invalid directive:", name),
            Self::InvalidDirective { name: None } => ("#", "invalid directive", ""),
            Self::DirectiveAfterToken => (
                "#",
                "preprocessor directive cannot be preceded by another token",
                "",
            ),
            Self::MacroEndOfInput { name } => ("macro expansion", "End of input in macro", name),
            Self::MacroEndOfLine { name } => {
                ("macro expansion", "End of line in macro substitution:", name)
            }
            Self::MacroUnexpectedHash { name } => ("macro expansion", "unexpected '#'", name),
            Self::TooFewArguments { name } => ("macro expansion", "Too few args in Macro", name),
            Self::TooManyArguments { name } => ("macro expansion", "Too many args in macro", name),
            Self::ExpansionTooDeep { name } => (
                "macro expansion",
                "macro expansion depth limit exceeded",
                name,
            ),
            Self::PasteAtStart => ("##", "unexpected location", ""),
            Self::PasteAtEndOfReplacement => {
                ("##", "unexpected location; end of replacement list", "")
            }
            Self::PasteAtEndOfArgument => ("##", "unexpected location; end of argument", ""),
            Self::PasteNotSupported => ("##", "not supported for these tokens", ""),
            Self::PasteTooLong => ("##", "combined tokens are too long", ""),
            Self::PasteInvalid => ("##", "combined token is invalid", ""),
            Self::UnterminatedComment => ("comment", "End of input in comment", ""),
            Self::NameTooLong => ("", "name too long", ""),
            Self::InvalidLiteral { reason } => ("", reason, ""),
            Self::InvalidEscape => ("string", "Invalid escape sequence", ""),
            Self::HexEscapeWithoutDigits => ("string", "Expected hex value in escape sequence", ""),
            Self::UnterminatedString => ("string", "End of line in string", ""),
            Self::CharacterLiteral => ("'", "character literals not supported", ""),
            Self::HeaderNameTooLong => ("", "header name too long", ""),
            Self::ContinuationInComment { allowed: true } => (
                "line continuation",
                "used at end of comment; the following line is still part of the comment",
                "",
            ),
            Self::ContinuationInComment { allowed: false } => (
                "line continuation",
                "used at end of comment, but this version does not provide line continuation",
                "",
            ),
            Self::ContinuationNotAllowed => (
                "line continuation",
                "not supported for this version or the enabled extensions",
                "",
            ),
            Self::FeatureRequiresVersion { feature, .. } => (
                feature,
                "not supported for this version or the enabled extensions",
                "",
            ),
            Self::TokenLimitExceeded => ("", "preprocessing token limit exceeded", ""),
            Self::OutputLimitExceeded => ("", "preprocessed output size limit exceeded", ""),
        }
    }
}

impl fmt::Display for DiagnosticKind {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let (token, reason, extra) = self.parts();
        write!(formatter, "'{token}' : {reason}")?;
        if !extra.is_empty() {
            write!(formatter, " {extra}")?;
        }
        Ok(())
    }
}

#[derive(Debug, Clone, PartialEq, Eq, Hash)]
pub struct Diagnostic {
    pub kind: DiagnosticKind,
    pub location: Location,
    pub line: u32,
}

impl Diagnostic {
    pub const fn severity(&self) -> Severity {
        self.kind.severity()
    }

    pub const fn is_error(&self) -> bool {
        matches!(self.kind.severity(), Severity::Error)
    }
}

impl fmt::Display for Diagnostic {
    fn fmt(&self, formatter: &mut fmt::Formatter<'_>) -> fmt::Result {
        let prefix = match self.severity() {
            Severity::Error => "ERROR",
            Severity::Warning => "WARNING",
        };
        write!(formatter, "{prefix}: {}: {}", self.line, self.kind)
    }
}
