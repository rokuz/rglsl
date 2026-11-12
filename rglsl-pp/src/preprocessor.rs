use alloc::collections::{BTreeMap, BTreeSet};
use alloc::rc::Rc;
use alloc::string::String;
use alloc::vec;
use alloc::vec::Vec;

use crate::diagnostic::{Diagnostic, DiagnosticKind, Location, Severity};
use crate::include::{FileId, Includer};
use crate::lexer::{Events, FileInput, Role, ScanContext};
use crate::options::Options;
use crate::output::Output;
use crate::predefined;
use crate::source_map::{clamp_line, SourceInfo, SourceMap};
use crate::token::{At, Kind, Token};
use crate::version::{self, Profile, Version};

#[derive(Debug, Clone)]
pub(crate) struct Macro {
    pub(crate) params: Rc<[Rc<str>]>,
    pub(crate) body: Rc<[Token]>,
    pub(crate) function_like: bool,
    pub(crate) busy: bool,
    pub(crate) undef: bool,
}

#[derive(Debug)]
pub(crate) struct MacroInput {
    pub(crate) name: Rc<str>,
    pub(crate) body: Rc<[Token]>,
    pub(crate) pos: usize,
    pub(crate) params: Rc<[Rc<str>]>,
    pub(crate) args: Vec<Rc<[Token]>>,
    pub(crate) expanded: Vec<Option<Rc<[Token]>>>,
    pub(crate) prepaste: bool,
    pub(crate) postpaste: bool,
    pub(crate) origin: (FileId, u32),
}

#[derive(Debug)]
pub(crate) struct TokenInput {
    pub(crate) tokens: Rc<[Token]>,
    pub(crate) pos: usize,
    pub(crate) last_pastes: bool,
    pub(crate) pre_expanded: bool,
}

#[derive(Debug)]
pub(crate) enum Input {
    File(FileInput),
    Macro(MacroInput),
    Tokens(TokenInput),
    Ungot(Option<Token>),
    Marker(bool),
    Zero(bool),
}

pub(crate) const TRACKED_EXTENSIONS: [&str; 7] = [
    "GL_EXT_spirv_intrinsics",
    "GL_ARB_shading_language_420pack",
    "GL_GOOGLE_cpp_style_line_directive",
    "GL_GOOGLE_include_directive",
    "GL_ARB_shading_language_include",
    "GL_EXT_debug_printf",
    "GL_EXT_abort",
];

pub(crate) const SPIRV_INTRINSICS: usize = 0;
pub(crate) const PACK_420: usize = 1;
pub(crate) const CPP_STYLE_LINE: usize = 2;
const DEBUG_PRINTF: usize = 5;
const ABORT: usize = 6;

#[derive(Debug)]
pub(crate) enum Change {
    Macro {
        name: String,
        previous: Option<Macro>,
    },
    Extensions([bool; TRACKED_EXTENSIONS.len()]),
}

fn same_definition(left: Option<&Macro>, right: Option<&Macro>) -> bool {
    match (
        left.filter(|definition| !definition.undef),
        right.filter(|definition| !definition.undef),
    ) {
        (None, None) => true,
        (Some(left), Some(right)) => {
            left.function_like == right.function_like
                && left.params == right.params
                && left.body.len() == right.body.len()
                && left
                    .body
                    .iter()
                    .zip(right.body.iter())
                    .all(|(left, right)| {
                        left.kind == right.kind
                            && left.text == right.text
                            && left.value == right.value
                            && left.space == right.space
                    })
        }
        _ => false,
    }
}

#[derive(Debug, Default)]
pub(crate) struct MacroTable {
    map: BTreeMap<String, Macro>,
    stage_used: core::cell::Cell<bool>,
}

impl MacroTable {
    fn watch(&self, name: &str) {
        if crate::options::Stage::ALL
            .iter()
            .any(|stage| stage.macro_name() == name)
        {
            self.stage_used.set(true);
        }
    }

    pub(crate) fn get(&self, name: &str) -> Option<&Macro> {
        self.lookup(name, true)
    }

    pub(crate) fn lookup(&self, name: &str, watched: bool) -> Option<&Macro> {
        if watched {
            self.watch(name);
        }
        self.map.get(name)
    }

    pub(crate) fn get_mut(&mut self, name: &str) -> Option<&mut Macro> {
        self.watch(name);
        self.map.get_mut(name)
    }

    pub(crate) fn insert(&mut self, name: String, definition: Macro, watched: bool) {
        if watched {
            self.watch(&name);
        }
        self.map.insert(name, definition);
    }
}

pub(crate) struct Preprocessor<'a> {
    pub(crate) options: &'a Options,
    pub(crate) includer: &'a mut dyn Includer,
    pub(crate) inputs: Vec<Input>,
    pub(crate) file_inputs: Vec<usize>,
    pub(crate) macros: MacroTable,
    pub(crate) version_stages: u16,
    pub(crate) diagnostics: Vec<Diagnostic>,
    pub(crate) events: Events,
    pub(crate) version: Version,
    pub(crate) version_will_be_error: bool,
    pub(crate) version_seen: bool,
    pub(crate) if_depth: usize,
    pub(crate) else_tracker: isize,
    pub(crate) else_seen: Vec<bool>,
    pub(crate) previous_newline: bool,
    pub(crate) disable_escapes: bool,
    pub(crate) extensions: [bool; TRACKED_EXTENSIONS.len()],
    pub(crate) include_stack: Vec<FileId>,
    pub(crate) line_markers: Vec<LineMarker>,
    pub(crate) active_includes: BTreeMap<FileId, Vec<usize>>,
    pub(crate) changes: Vec<Change>,
    pub(crate) included_once: BTreeSet<FileId>,
    pub(crate) sources: Vec<SourceInfo>,
    pub(crate) files: BTreeMap<FileId, String>,
    pub(crate) texts: BTreeMap<FileId, String>,
    pub(crate) output: Output,
    pub(crate) tokens_scanned: usize,
    pub(crate) aborted: bool,
    pub(crate) last_at: At,
    pub(crate) root: FileId,
}

#[derive(Debug)]
pub(crate) struct LineMarker {
    pub(crate) epilogue: String,
    pub(crate) end: (FileId, u32),
    pub(crate) resume: (FileId, u32),
}

pub(crate) enum Scanned {
    Token(Token),
    Retry,
}

#[derive(Debug)]
pub struct Preprocessed {
    stages: u16,
    pub text: String,
    pub source_map: SourceMap,
    pub diagnostics: Vec<Diagnostic>,
    pub version: Version,
}

impl Preprocessed {
    pub fn same_for_stage(&self, stage: crate::options::Stage) -> bool {
        crate::options::Stage::ALL
            .iter()
            .position(|&candidate| candidate == stage)
            .is_some_and(|index| self.stages & (1 << index) != 0)
    }

    pub fn has_errors(&self) -> bool {
        self.diagnostics.iter().any(Diagnostic::is_error)
    }

    pub fn errors(&self) -> impl Iterator<Item = &Diagnostic> {
        self.diagnostics
            .iter()
            .filter(|diagnostic| diagnostic.is_error())
    }
}

pub fn preprocess(
    source: &str,
    file: FileId,
    options: &Options,
    includer: &mut dyn Includer,
) -> Preprocessed {
    let scanned = version::scan_version(source.strip_prefix('\u{feff}').unwrap_or(source));
    let mut version_errors = Vec::new();
    let version = version::deduce(&scanned, options, &mut version_errors);
    let mut version_stages = 0_u16;
    for (index, candidate) in crate::options::Stage::ALL.into_iter().enumerate() {
        let mut errors = Vec::new();
        let other = Options {
            stage: Some(candidate),
            ..options.clone()
        };
        if version::deduce(&scanned, &other, &mut errors) == version && errors == version_errors {
            version_stages |= 1 << index;
        }
    }
    let es = version.profile == Some(Profile::Es);
    let version_will_be_error = scanned.directive.is_none()
        || (es && version.number >= 300 && scanned.not_first)
        || scanned.not_first_token;
    let preamble = predefined::preamble(&version, options);
    let mut files = BTreeMap::new();
    if let Some(name) = &options.source_name {
        files.insert(file, name.clone());
    }
    let mut sources = vec![
        SourceInfo {
            number: -1,
            name: None,
            file: None,
        },
        SourceInfo {
            number: 0,
            name: options.source_name.clone(),
            file: Some(file),
        },
    ];
    let mut inputs = vec![Input::File(FileInput::new(
        file,
        Rc::from(source),
        Role::Root,
        1,
    ))];
    if let Some(text) = options.preamble.as_deref().filter(|text| !text.is_empty()) {
        let index = u32::try_from(sources.len()).unwrap_or(u32::MAX);
        sources.push(SourceInfo {
            number: -1,
            name: None,
            file: Some(FileId::PREAMBLE),
        });
        files.insert(FileId::PREAMBLE, String::from("-1"));
        inputs.push(Input::File(FileInput::new(
            FileId::PREAMBLE,
            Rc::from(text),
            Role::UserPreamble,
            index,
        )));
    }
    inputs.push(Input::File(FileInput::new(
        file,
        Rc::from(preamble.as_str()),
        Role::Preamble,
        0,
    )));
    let file_inputs = (0..inputs.len()).collect();
    let root_at = At {
        file,
        cur_file: file,
        physical: 1,
        line: 1,
        source: 1,
        ..At::default()
    };
    let mut preprocessor = Preprocessor {
        options,
        includer,
        inputs,
        file_inputs,
        macros: MacroTable::default(),
        version_stages,
        diagnostics: Vec::new(),
        events: Vec::new(),
        version,
        version_will_be_error,
        version_seen: false,
        if_depth: 0,
        else_tracker: 0,
        else_seen: Vec::new(),
        previous_newline: true,
        disable_escapes: false,
        extensions: [false; TRACKED_EXTENSIONS.len()],
        include_stack: Vec::new(),
        line_markers: Vec::new(),
        active_includes: BTreeMap::new(),
        changes: Vec::new(),
        included_once: BTreeSet::new(),
        sources,
        files,
        texts: BTreeMap::new(),
        output: Output::new(file, options.limits.max_output_bytes, options.listing),
        tokens_scanned: 0,
        aborted: false,
        last_at: root_at,
        root: file,
    };
    for message in version_errors {
        preprocessor.diagnostics.push(Diagnostic {
            kind: DiagnosticKind::VersionUnsupported { message },
            location: Location { file, offset: 0 },
            line: 0,
        });
    }
    preprocessor.run();
    preprocessor.finish()
}

impl Preprocessor<'_> {
    fn run(&mut self) {
        loop {
            let token = self.tokenize();
            if token.kind == Kind::End {
                break;
            }
            self.output.token(&token);
            if self.output.overflowed() {
                self.abort(DiagnosticKind::OutputLimitExceeded, token.at);
                break;
            }
        }
    }

    fn finish(mut self) -> Preprocessed {
        self.output.finish();
        Preprocessed {
            text: self.output.text,
            source_map: SourceMap {
                root: self.root,
                segments: self.output.segments,
                sources: self.sources,
                files: self.files,
                texts: self.texts,
            },
            diagnostics: self.diagnostics,
            stages: if self.macros.stage_used.get() {
                0
            } else {
                self.version_stages
            },
            version: self.version,
        }
    }

    pub(crate) fn abort(&mut self, kind: DiagnosticKind, at: At) {
        if !self.aborted {
            self.push_diagnostic(kind, at);
            self.aborted = true;
        }
    }

    pub(crate) fn push_diagnostic(&mut self, kind: DiagnosticKind, at: At) {
        self.diagnostics.push(Diagnostic {
            kind,
            location: Location {
                file: at.file,
                offset: at.offset,
            },
            line: clamp_line(at.line),
        });
    }

    pub(crate) fn report(&mut self, kind: DiagnosticKind, at: At) {
        let error = kind.severity() == Severity::Error;
        self.push_diagnostic(kind, at);
        if error {
            self.end_current_file();
        }
    }

    pub(crate) fn end_current_file(&mut self) {
        let mut preamble = false;
        if let Some(file) = self.innermost_file_mut() {
            file.ended = true;
            preamble = matches!(file.role, Role::Preamble | Role::UserPreamble);
        }
        if preamble {
            for input in &mut self.inputs {
                if let Input::File(file) = input {
                    file.ended = true;
                }
            }
        }
    }

    pub(crate) fn innermost_file_mut(&mut self) -> Option<&mut FileInput> {
        let index = *self.file_inputs.last()?;
        match self.inputs.get_mut(index) {
            Some(Input::File(file)) => Some(file),
            _ => None,
        }
    }

    pub(crate) fn innermost_file(&self) -> Option<&FileInput> {
        let index = *self.file_inputs.last()?;
        match self.inputs.get(index) {
            Some(Input::File(file)) => Some(file),
            _ => None,
        }
    }

    pub(crate) fn push_file(&mut self, file: FileInput) {
        self.file_inputs.push(self.inputs.len());
        self.inputs.push(Input::File(file));
    }

    pub(crate) fn current_at(&self) -> At {
        self.innermost_file()
            .map_or(self.last_at, FileInput::current_at)
    }

    pub(crate) fn in_included_file(&self) -> bool {
        self.innermost_file()
            .is_some_and(|file| file.role == Role::Included)
    }

    pub(crate) fn in_preamble(&self) -> bool {
        self.innermost_file()
            .is_some_and(|file| file.role == Role::Preamble)
    }

    pub(crate) fn is_es(&self) -> bool {
        self.version.profile == Some(Profile::Es)
    }

    pub(crate) fn should_set_next_line(&self) -> bool {
        self.is_es() || self.version.number >= 330
    }

    pub(crate) fn extension_on(&self, index: usize) -> bool {
        self.extensions.get(index).copied().unwrap_or(false)
    }

    fn continuation_allowed(&self) -> bool {
        if self.is_es() {
            self.version.number >= 300
        } else {
            self.version.number >= 420 || self.extension_on(PACK_420)
        }
    }

    pub(crate) fn scan_context(&self) -> ScanContext {
        ScanContext {
            continuation_allowed: self.continuation_allowed(),
            if_depth: self.if_depth,
            disable_escapes: self.disable_escapes,
        }
    }

    pub(crate) fn flush_events(&mut self) {
        if self.events.is_empty() {
            return;
        }
        let events = core::mem::take(&mut self.events);
        for (kind, at) in events {
            let error = kind.severity() == Severity::Error;
            self.push_diagnostic(kind, at);
            if error {
                self.end_current_file();
            }
        }
    }

    pub(crate) fn end_token(&self) -> Token {
        Token::new(Kind::End, self.current_at())
    }

    pub(crate) fn source_number(&self, source: u32) -> i64 {
        usize::try_from(source)
            .ok()
            .and_then(|index| self.sources.get(index))
            .map_or(0, |info| info.number)
    }

    pub(crate) fn source_name(&self, source: u32) -> Option<&str> {
        usize::try_from(source)
            .ok()
            .and_then(|index| self.sources.get(index))
            .and_then(|info| info.name.as_deref())
    }

    pub(crate) fn else_seen(&self, tracker: isize) -> bool {
        usize::try_from(tracker)
            .ok()
            .and_then(|index| self.else_seen.get(index))
            .copied()
            .unwrap_or(false)
    }

    pub(crate) fn set_else_seen(&mut self, tracker: isize, value: bool) {
        let Ok(index) = usize::try_from(tracker) else {
            return;
        };
        if index >= self.else_seen.len() {
            self.else_seen.resize(index + 1, false);
        }
        if let Some(slot) = self.else_seen.get_mut(index) {
            *slot = value;
        }
    }

    pub(crate) fn nesting_exceeded(&self) -> bool {
        let limit = self.options.limits.max_if_nesting;
        self.if_depth >= limit || self.else_tracker >= isize::try_from(limit).unwrap_or(isize::MAX)
    }

    fn missing_endif_check(&mut self) {
        if self.if_depth > 0 && !self.aborted {
            let at = self.current_at();
            self.report(DiagnosticKind::MissingEndif, at);
        }
    }

    fn tokenize(&mut self) -> Token {
        let mut stringify_depth = 0usize;
        let mut stringified = String::new();
        loop {
            let token = self.scan();
            let mut token = self.paste(token);
            match token.kind {
                Kind::End => {
                    self.missing_endif_check();
                    return token;
                }
                Kind::Op("#") => {
                    if self.previous_newline {
                        let end = self.directive();
                        if end.kind == Kind::End {
                            self.missing_endif_check();
                            return end;
                        }
                        continue;
                    }
                    self.report(DiagnosticKind::DirectiveAfterToken, token.at);
                    self.aborted = true;
                    return self.end_token();
                }
                _ => {}
            }
            self.previous_newline = token.kind == Kind::Newline;
            match token.kind {
                Kind::Newline => continue,
                Kind::StringifyPush => {
                    stringify_depth += 1;
                    continue;
                }
                Kind::StringifyPop => {
                    stringify_depth = stringify_depth.saturating_sub(1);
                    if stringify_depth == 0 {
                        let mut result = Token::with_text(Kind::String, &stringified, token.at);
                        result.at.exact = 0;
                        return result;
                    }
                    continue;
                }
                Kind::Identifier => match self.macro_expand(&mut token, false, true) {
                    crate::expand::Expand::NotStarted => {}
                    crate::expand::Expand::Error => {
                        self.aborted = true;
                        return self.end_token();
                    }
                    crate::expand::Expand::Started | crate::expand::Expand::Undef => continue,
                },
                _ => {}
            }
            match token.kind {
                Kind::Quote => {
                    self.report(DiagnosticKind::CharacterLiteral, token.at);
                    continue;
                }
                Kind::Identifier | Kind::IntConst | Kind::Number if token.text.is_empty() => {
                    continue;
                }
                _ => {}
            }
            if self.if_depth == 0
                && (token.kind == Kind::String || stringify_depth > 0)
                && ![SPIRV_INTRINSICS, DEBUG_PRINTF, ABORT]
                    .iter()
                    .any(|&index| self.extension_on(index))
            {
                self.report(
                    DiagnosticKind::ExtensionRequired {
                        feature: "string literal",
                        extension: "GL_EXT_debug_printf, GL_EXT_spirv_intrinsics or GL_EXT_abort",
                    },
                    token.at,
                );
                continue;
            }
            if stringify_depth > 0 {
                if token.space {
                    stringified.push(' ');
                }
                stringified.push_str(&token.name());
                continue;
            }
            return token;
        }
    }

    pub(crate) fn scan(&mut self) -> Token {
        if self.aborted {
            return self.end_token();
        }
        self.tokens_scanned += 1;
        if self.tokens_scanned > self.options.limits.max_tokens {
            let at = self.current_at();
            self.abort(DiagnosticKind::TokenLimitExceeded, at);
            return self.end_token();
        }
        loop {
            let context = self.scan_context();
            let current = self.current_at();
            let index = self.inputs.len().saturating_sub(1);
            let scanned = match self.inputs.last_mut() {
                None => return self.end_token(),
                Some(Input::File(file)) => {
                    let token = file.scan(&context, &mut self.events);
                    self.flush_events();
                    Scanned::Token(token)
                }
                Some(Input::Macro(_)) => self.scan_macro(index, current),
                Some(Input::Tokens(input)) => {
                    Scanned::Token(scan_tokens(&self.macros, input, current))
                }
                Some(Input::Ungot(slot)) => Scanned::Token(
                    slot.take()
                        .unwrap_or_else(|| Token::new(Kind::End, current)),
                ),
                Some(Input::Marker(done)) => {
                    let kind = if *done { Kind::End } else { Kind::Marker };
                    *done = true;
                    Scanned::Token(Token::new(kind, current))
                }
                Some(Input::Zero(done)) => {
                    let token = if *done {
                        Token::new(Kind::End, current)
                    } else {
                        let mut zero = Token::with_text(Kind::IntConst, "0", current);
                        zero.value = 0;
                        zero
                    };
                    *done = true;
                    Scanned::Token(token)
                }
            };
            match scanned {
                Scanned::Retry => {}
                Scanned::Token(token) if token.kind != Kind::End => return token,
                Scanned::Token(token) => {
                    self.pop_input();
                    if self.inputs.is_empty() {
                        return token;
                    }
                }
            }
        }
    }
}

fn scan_tokens(macros: &MacroTable, input: &mut TokenInput, current: At) -> Token {
    {
        let Some(mut token) = input.tokens.get(input.pos).cloned() else {
            return Token::new(Kind::End, current);
        };
        input.pos += 1;
        token.fully_expanded = input.pre_expanded;
        if input.pos >= input.tokens.len()
            && token.kind == Kind::Identifier
            && macros
                .get(&token.text)
                .is_some_and(|definition| definition.function_like)
        {
            token.fully_expanded = false;
        }
        token.at.cur_file = current.cur_file;
        token.at.physical = current.physical;
        token.at.column = current.column;
        token.at.line = current.line;
        token.at.source = current.source;
        token.at.expanded = true;
        token
    }
}

impl Preprocessor<'_> {
    pub(crate) fn record_macro(&mut self, name: &str) {
        if self.include_stack.is_empty() {
            return;
        }
        let previous = self.macros.get(name).cloned();
        self.changes.push(Change::Macro {
            name: String::from(name),
            previous,
        });
    }

    pub(crate) fn record_extensions(&mut self) {
        if !self.include_stack.is_empty() {
            self.changes.push(Change::Extensions(self.extensions));
        }
    }

    pub(crate) fn enter_include_stack(&mut self, file: FileId) {
        let changes = self.changes.len();
        self.include_stack.push(file);
        self.active_includes.entry(file).or_default().push(changes);
    }

    fn leave_include(&mut self) {
        let Some(file) = self.include_stack.pop() else {
            return;
        };
        if let Some(entries) = self.active_includes.get_mut(&file) {
            entries.pop();
            if entries.is_empty() {
                self.active_includes.remove(&file);
            }
        }
        if self.include_stack.is_empty() {
            self.changes.clear();
        }
    }

    pub(crate) fn includes_itself(&self, file: FileId) -> bool {
        let Some(entries) = self.active_includes.get(&file) else {
            return false;
        };
        entries.iter().any(|&start| self.unchanged_since(start))
    }

    fn unchanged_since(&self, start: usize) -> bool {
        let mut names = BTreeSet::new();
        let mut extensions = false;
        for change in self.changes.iter().skip(start) {
            match change {
                Change::Macro { name, previous } => {
                    if names.insert(name.as_str())
                        && !same_definition(previous.as_ref(), self.macros.get(name))
                    {
                        return false;
                    }
                }
                Change::Extensions(previous) => {
                    if !extensions && *previous != self.extensions {
                        return false;
                    }
                    extensions = true;
                }
            }
        }
        true
    }

    fn pop_input(&mut self) {
        let popped = self.inputs.pop();
        while self
            .file_inputs
            .last()
            .is_some_and(|&index| index >= self.inputs.len())
        {
            self.file_inputs.pop();
        }
        if let Some(Input::File(file)) = popped {
            self.last_at = file.current_at();
            if file.role == Role::Included {
                self.leave_include();
                if self.options.listing {
                    if let Some(marker) = self.line_markers.pop() {
                        self.output
                            .line_directive(&marker.epilogue, marker.end, marker.resume);
                    }
                }
            }
        }
    }
}
