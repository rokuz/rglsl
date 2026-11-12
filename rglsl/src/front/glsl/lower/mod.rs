mod atomic;
mod builtins;
mod call;
mod constant;
mod cooperative;
mod expression;
mod function;
mod globals;
mod heap;
mod hit_object;
mod intrinsics;
mod library;
mod mesh;
mod message;
mod object;
mod prepass;
mod ray;
mod reference;
mod specialization;
mod spine;
mod stage;
mod statement;
mod subgroup;
mod tensor;
mod types;
mod xfb;

use alloc::{
    borrow::Cow,
    collections::{BTreeMap, BTreeSet},
    format,
    string::{String, ToString},
    vec,
    vec::Vec,
};
use core::cell::RefCell;

use rglsl_ast::ast::{ExternalDeclaration, FunctionDefinition, Initializer, Node, Spanned};
use rglsl_ast::TranslationUnit;
use rglsl_sema::scope::{Symbol, SymbolKind, Variable};
use rglsl_sema::types::{BlockId, SharedDimensions, StructId};
use rglsl_sema::{Analysis, FunctionId, SymbolId};
use rglsl_types::probe::StageProbe;

use super::{Error, ErrorKind, IncludeLocation, Options, ParseErrors};
use crate::{
    proc::Layouter, ConservativeDepth, GlobalVariable, Handle, Module, ShaderStage, Span, Type,
};

pub(super) type Result<T> = core::result::Result<T, Error>;

pub(super) fn parse(
    options: &Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> core::result::Result<Module, ParseErrors> {
    lower(
        options,
        source,
        Mode::Program,
        root,
        includer,
        &mut library::StageNames::new(options.limits),
        false,
        &StageClass::new(options.stage),
    )
    .map(|object| object.module)
}

pub(super) fn compile(
    options: &Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> core::result::Result<crate::object::ObjectModule, ParseErrors> {
    compile_sharing(
        options,
        source,
        root,
        includer,
        true,
        &mut library::StageNames::new(options.limits),
    )
}

pub(super) fn analyze(
    options: &Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> Option<super::Analyzed> {
    let preprocessed = preprocess(options, Some(options.stage), source, root, includer);
    if preprocessed.has_errors() {
        return None;
    }
    let text = preprocessed.text.as_str();
    let (unit, failure) = rglsl_ast::parse_prefix(text);
    if failure.is_some() {
        return None;
    }
    let analysis = rglsl_sema::analyze(&unit, &sema_options(options, text));
    Some(super::Analyzed { unit, analysis })
}

pub(super) fn library_lowerings(
    options: &Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> usize {
    let mut names = library::StageNames::new(options.limits);
    let _ = compile_sharing(options, source, root, includer, true, &mut names);
    names.lowerings
}

fn compile_sharing(
    options: &Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
    share: bool,
    names: &mut library::StageNames,
) -> core::result::Result<crate::object::ObjectModule, ParseErrors> {
    let hint = (!options.library).then_some(options.stage);
    let parsed = Parsed::new(options, hint, source, root, includer);
    match parsed.defines_main() {
        Some(true) if options.library => Err(vec![semantic(
            "a module compiled as a library cannot define `main`: a module with `main` is a program and needs a shader stage",
            Span::UNDEFINED,
        )]
        .into()),
        Some(true) => lower_object(
            options,
            source,
            Mode::Object,
            root,
            includer,
            names,
            &StageClass::new(options.stage),
        ),
        Some(false) | None => library::compile(
            options,
            hint,
            source,
            root,
            includer,
            share,
            names,
            parsed,
        ),
    }
}

pub(super) fn compile_library_per_stage(
    options: &Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> core::result::Result<crate::object::ObjectModule, ParseErrors> {
    compile_sharing(
        options,
        source,
        root,
        includer,
        false,
        &mut library::StageNames::new(options.limits),
    )
}

#[derive(Clone, Copy, Debug, PartialEq, Eq)]
pub(super) enum Mode {
    Program,
    Object,
    Library,
}

const fn link_time(kind: &rglsl_sema::DiagnosticKind) -> bool {
    matches!(
        *kind,
        rglsl_sema::DiagnosticKind::MissingEntryPoint
            | rglsl_sema::DiagnosticKind::MissingFunctionBody(_)
    )
}

fn link_message(kind: &rglsl_sema::DiagnosticKind) -> Option<String> {
    match *kind {
        rglsl_sema::DiagnosticKind::MissingEntryPoint => Some(String::from(
            "Missing entry point: Each stage requires one entry point",
        )),
        rglsl_sema::DiagnosticKind::MissingFunctionBody(ref name) => {
            Some(format!("No function definition (body) found: {name}"))
        }
        _ => None,
    }
}

fn preprocessor_options(options: &Options, stage: Option<ShaderStage>) -> rglsl_pp::Options {
    let defines = options
        .defines
        .iter()
        .map(|(name, value)| rglsl_pp::Define::new(name.clone(), Some(value.as_str())))
        .collect();
    rglsl_pp::Options {
        defines,
        vulkan_client_version: Some(100),
        stage: stage.map(preprocessor_stage),
        preamble: options.preamble.clone(),
        ..rglsl_pp::Options::default()
    }
}

fn preprocess(
    options: &Options,
    stage: Option<ShaderStage>,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> rglsl_pp::Preprocessed {
    rglsl_pp::preprocess(
        source,
        root,
        &preprocessor_options(options, stage),
        includer,
    )
}

pub(super) struct Parsed {
    stage: Option<ShaderStage>,
    preprocessed: rglsl_pp::Preprocessed,
    unit: Option<(TranslationUnit, bool)>,
}

impl Parsed {
    fn new(
        options: &Options,
        stage: Option<ShaderStage>,
        source: &str,
        root: rglsl_pp::FileId,
        includer: &mut dyn rglsl_pp::Includer,
    ) -> Self {
        let preprocessed = preprocess(options, stage, source, root, includer);
        let unit = (!preprocessed.has_errors()).then(|| {
            let (unit, failure) = rglsl_ast::parse_prefix(preprocessed.text.as_str());
            (unit, failure.is_some())
        });
        Self {
            stage,
            preprocessed,
            unit,
        }
    }

    fn defines_main(&self) -> Option<bool> {
        let (ref unit, _) = *self.unit.as_ref()?;
        Some(unit.external_declarations.iter().any(|declaration| {
            matches!(
                *declaration,
                ExternalDeclaration::FunctionDefinition(ref definition)
                    if definition.prototype.name.node == "main"
            )
        }))
    }

    pub(super) fn reuse(
        self,
        stage: ShaderStage,
    ) -> Option<(rglsl_pp::Preprocessed, TranslationUnit, bool)> {
        if self.stage.is_some_and(|own| own != stage) {
            return None;
        }
        let (unit, failed) = self.unit?;
        Some((self.preprocessed, unit, failed))
    }
}

pub(super) struct StageClass {
    probe: StageProbe<ShaderStage>,
    names: RefCell<BTreeSet<String>>,
    version: core::cell::Cell<Option<u32>>,
}

impl StageClass {
    pub(super) fn new(stage: ShaderStage) -> Self {
        Self {
            probe: StageProbe::new(stage, &ShaderStage::ALL),
            names: RefCell::new(BTreeSet::new()),
            version: core::cell::Cell::new(None),
        }
    }

    pub(super) const fn version(&self) -> Option<u32> {
        self.version.get()
    }

    pub(super) fn stages(&self) -> u16 {
        self.probe.compatible()
    }

    pub(super) fn into_names(self) -> BTreeSet<String> {
        self.names.into_inner()
    }

    fn identifiers(&self, text: &str) {
        let mut names = self.names.borrow_mut();
        let mut start = None;
        for (index, character) in text
            .char_indices()
            .chain(core::iter::once((text.len(), ' ')))
        {
            let word = character.is_ascii_alphanumeric() || character == '_';
            match (start, word) {
                (None, true) => start = Some(index),
                (Some(from), false) => {
                    if let Some(identifier) = text.get(from..index) {
                        if identifier
                            .chars()
                            .next()
                            .is_some_and(|first| !first.is_ascii_digit())
                            && !names.contains(identifier)
                        {
                            names.insert(String::from(identifier));
                        }
                    }
                    start = None;
                }
                _ => {}
            }
        }
    }
}

fn lower_object(
    options: &Options,
    source: &str,
    mode: Mode,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
    names: &mut library::StageNames,
    class: &StageClass,
) -> core::result::Result<crate::object::ObjectModule, ParseErrors> {
    let mut object = lower(options, source, mode, root, includer, names, false, class)?;
    if object.work_group_size_constant {
        object.specialized = lower(options, source, mode, root, includer, names, true, class)
            .ok()
            .map(alloc::boxed::Box::new);
    }
    Ok(object)
}

#[allow(clippy::too_many_arguments)]
fn lower(
    options: &Options,
    source: &str,
    mode: Mode,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
    names: &mut library::StageNames,
    specialize: bool,
    class: &StageClass,
) -> core::result::Result<crate::object::ObjectModule, ParseErrors> {
    let object = mode != Mode::Program;
    let preprocessed = preprocess(options, Some(options.stage), source, root, includer);
    let map = &preprocessed.source_map;
    if preprocessed.same_for_stage(preprocessor_stage(options.stage)) {
        class
            .probe
            .map(|candidate| preprocessed.same_for_stage(preprocessor_stage(candidate)));
    } else {
        class.probe.exact();
    }
    if preprocessed.has_errors() {
        let errors = preprocessed
            .errors()
            .map(|diagnostic| {
                let root = diagnostic.location.file == map.root();
                let offset = if root { diagnostic.location.offset } else { 0 };
                let included = (!root)
                    .then(|| map.file_name(diagnostic.location.file))
                    .flatten()
                    .map(|file| IncludeLocation {
                        file: String::from(file),
                        line: diagnostic.line,
                    });
                (
                    Error {
                        kind: ErrorKind::Syntax(diagnostic.kind.to_string()),
                        meta: Span::new(offset, offset),
                    },
                    included,
                )
            })
            .collect::<Vec<_>>();
        let first = errors
            .iter()
            .filter_map(|&(ref error, _)| error.meta.to_range())
            .map(|range| range.start)
            .min();
        let mut earlier: Vec<(Error, Option<IncludeLocation>)> = first
            .map(|first| semantic_errors_before(options, &preprocessed, first, class))
            .unwrap_or_default()
            .into_iter()
            .map(|error| (error, None))
            .collect();
        earlier.extend(errors);
        earlier.sort_by_key(|&(ref error, _)| !error.meta.is_defined());
        return Err(earlier.into());
    }
    let text = preprocessed.text.as_str();
    class.identifiers(text);
    let (unit, failure) = rglsl_ast::parse_prefix(text);
    let analysis = rglsl_sema::analyze(
        &unit,
        &rglsl_sema::Options {
            specialize_work_group_size: specialize,
            ..sema_options(options, text)
        },
    );
    class.probe.narrow(analysis.stages);
    class.version.set(analysis.version);
    class
        .names
        .borrow_mut()
        .extend(analysis.stage_names.iter().cloned());
    if let Some(error) = failure {
        let earlier = analysis.diagnostics.iter().filter(|diagnostic| {
            diagnostic.offset(text) < error.span.start
                && !matches!(
                    diagnostic.kind,
                    rglsl_sema::DiagnosticKind::MissingEntryPoint
                        | rglsl_sema::DiagnosticKind::MissingFunctionBody(_)
                        | rglsl_sema::DiagnosticKind::MissingVersion
                )
                && unit
                    .external_declarations
                    .last()
                    .is_none_or(|last| diagnostic.span.start < external_end(last))
        });
        let mut errors: Vec<(Error, Option<IncludeLocation>)> = earlier
            .map(|diagnostic| {
                (
                    semantic_error(map, text, diagnostic),
                    included(map, diagnostic.offset(text)),
                )
            })
            .collect();
        errors.push((
            Error {
                kind: ErrorKind::Syntax(error.kind.to_string()),
                meta: original(map, error.span),
            },
            included(map, error.span.start),
        ));
        return Err(errors.into());
    }
    let errors = analysis
        .diagnostics
        .iter()
        .filter(|diagnostic| !(object && link_time(&diagnostic.kind)))
        .enumerate()
        .map(|(index, diagnostic)| {
            let reworded = (mode == Mode::Library && index == 0)
                .then(|| names.stage_diagnostic(&diagnostic.kind, analysis.version, options.stage))
                .flatten();
            if reworded.is_some() {
                class.probe.exact();
            }
            sema_error(map, text, source, diagnostic, reworded)
        })
        .collect::<Vec<_>>();
    let mut errors = errors;
    if options.export_functions {
        errors.extend(exported_main(map, &unit));
    }
    if !errors.is_empty() {
        return Err(errors.into());
    }
    names.lowerings += 1;
    run_lowerer(
        options,
        source,
        &preprocessed,
        &unit,
        &analysis,
        mode,
        &class.probe,
        &class.names,
        specialize,
    )
}

fn exported_main(
    map: &rglsl_pp::SourceMap,
    unit: &TranslationUnit,
) -> Option<(Error, Option<IncludeLocation>)> {
    unit.external_declarations
        .iter()
        .find_map(|declaration| match *declaration {
            ExternalDeclaration::FunctionDefinition(ref definition)
                if definition.prototype.node.name.node == "main" =>
            {
                let end = definition.prototype.span.end.saturating_sub(1);
                Some((
                    Error {
                        kind: ErrorKind::SemanticError(Cow::Borrowed(
                            "main function cannot be exported",
                        )),
                        meta: original(map, rglsl_ast::Span::new(end, end)),
                    },
                    included(map, end),
                ))
            }
            _ => None,
        })
}

fn sema_error(
    map: &rglsl_pp::SourceMap,
    text: &str,
    source: &str,
    diagnostic: &rglsl_sema::Diagnostic,
    reworded: Option<String>,
) -> (Error, Option<IncludeLocation>) {
    let start = diagnostic.offset(text);
    let message = reworded.unwrap_or_else(|| diagnostic.kind.to_string());
    let past_end = usize::try_from(start).is_ok_and(|start| start >= text.len());
    let error = Error {
        kind: match link_message(&diagnostic.kind) {
            Some(message) => ErrorKind::Link(message),
            None => ErrorKind::SemanticError(Cow::Owned(message)),
        },
        meta: if link_time(&diagnostic.kind) {
            Span::UNDEFINED
        } else if past_end {
            let end = u32::try_from(source.len()).unwrap_or(u32::MAX);
            Span::new(end, end)
        } else {
            original(
                map,
                rglsl_ast::Span::new(start, diagnostic.span.end.max(start)),
            )
        },
    };
    let location = (!link_time(&diagnostic.kind) && !past_end)
        .then(|| included(map, start))
        .flatten();
    (error, location)
}

#[allow(clippy::too_many_arguments)]
fn run_lowerer(
    options: &Options,
    source: &str,
    preprocessed: &rglsl_pp::Preprocessed,
    unit: &TranslationUnit,
    analysis: &Analysis,
    mode: Mode,
    probe: &StageProbe<ShaderStage>,
    names: &RefCell<BTreeSet<String>>,
    specialize: bool,
) -> core::result::Result<crate::object::ObjectModule, ParseErrors> {
    let map = &preprocessed.source_map;
    let debug = options.debug_info;
    let mut lowerer = Lowerer::new(unit, analysis, options, map, mode, probe, names);
    lowerer.specialize_work_group_size = specialize;
    lowerer
        .run()
        .map_err(|errors| {
            if !debug {
                return errors;
            }
            let ParseErrors { errors, included } = errors;
            ParseErrors {
                errors: errors
                    .into_iter()
                    .map(|error| Error {
                        meta: preprocessed_to_original(map, error.meta),
                        ..error
                    })
                    .collect(),
                included,
            }
        })
        .map(|mut object| {
            if debug {
                let mut info = debug_info(
                    options,
                    source,
                    preprocessed,
                    &object.debug,
                    analysis.version.unwrap_or(0),
                );
                info.anchors = debug_anchors(unit, &preprocessed.text);
                object.object.module.debug_info = Some(alloc::boxed::Box::new(info));
            }
            object.object
        })
}

fn preprocessed_to_original(map: &rglsl_pp::SourceMap, span: Span) -> Span {
    match span.to_range() {
        Some(range) => original(
            map,
            rglsl_ast::Span::new(
                u32::try_from(range.start).unwrap_or(u32::MAX),
                u32::try_from(range.end).unwrap_or(u32::MAX),
            ),
        ),
        None => span,
    }
}

#[derive(Debug, Default)]
pub(super) struct DebugCollector {
    pub scopes: Vec<crate::DebugScope>,
    pub functions: Vec<crate::DebugFunction>,
    pub structs: Vec<crate::DebugStruct>,
    pub entry: Option<u32>,
}

fn debug_anchors(unit: &TranslationUnit, text: &str) -> Vec<crate::DebugAnchor> {
    let bytes = text.as_bytes();
    let after = |offset: u32| {
        let mut position = usize::try_from(offset).unwrap_or(usize::MAX);
        while bytes
            .get(position)
            .is_some_and(|byte| byte.is_ascii_whitespace() || *byte == b')')
        {
            position += 1;
        }
        u32::try_from(position).unwrap_or(offset)
    };
    let mut anchors: Vec<crate::DebugAnchor> = rglsl_ast::expressions(unit)
        .into_iter()
        .filter_map(|expression| {
            let at = match expression.kind {
                rglsl_ast::ast::ExpressionKind::Binary { ref right, .. } => right.span.start,
                rglsl_ast::ast::ExpressionKind::Assignment { ref target, .. } => {
                    after(target.span.end)
                }
                rglsl_ast::ast::ExpressionKind::FunctionCall(_) => {
                    expression.span.end.saturating_sub(1)
                }
                _ => return None,
            };
            Some(crate::DebugAnchor {
                start: expression.span.start,
                end: expression.span.end,
                at,
            })
        })
        .collect();
    anchors.sort_by_key(|anchor| (anchor.start, anchor.end));
    anchors.dedup_by_key(|anchor| (anchor.start, anchor.end));
    anchors
}

pub(super) struct Lowered {
    pub object: crate::object::ObjectModule,
    pub debug: DebugCollector,
}

fn debug_info(
    options: &Options,
    source: &str,
    preprocessed: &rglsl_pp::Preprocessed,
    collected: &DebugCollector,
    version: u32,
) -> crate::DebugInfo {
    let map = &preprocessed.source_map;
    let root_name = options.source_name.clone().unwrap_or_default();
    let mut sources: Vec<crate::DebugSource> = vec![crate::DebugSource {
        name: root_name.clone(),
        text: Some(String::from(source)),
    }];
    let mut by_name: BTreeMap<String, u32> = BTreeMap::new();
    by_name.insert(root_name, 0);
    let mut indices: Vec<u32> = Vec::new();
    for index in 0..map.source_count() {
        let Some(name) = map.source_name(index) else {
            indices.push(0);
            continue;
        };
        let text = map.source_file(index).and_then(|file| {
            if file == map.root() {
                Some(String::from(source))
            } else {
                map.file_text(file).map(String::from)
            }
        });
        let position = match by_name.get(name) {
            Some(&position) => {
                if let Some(slot) = usize::try_from(position)
                    .ok()
                    .and_then(|position| sources.get_mut(position))
                {
                    if slot.text.is_none() {
                        slot.text = text;
                    }
                }
                position
            }
            None => {
                let position = u32::try_from(sources.len()).unwrap_or(u32::MAX);
                sources.push(crate::DebugSource {
                    name: String::from(name),
                    text,
                });
                by_name.insert(String::from(name), position);
                position
            }
        };
        indices.push(position);
    }
    let mut lines: Vec<crate::DebugLine> = Vec::new();
    for entry in map.line_entries() {
        let source = usize::try_from(entry.source)
            .ok()
            .and_then(|index| indices.get(index))
            .copied()
            .unwrap_or(0);
        if lines
            .last()
            .is_some_and(|last| last.source == source && last.line == entry.line)
        {
            continue;
        }
        lines.push(crate::DebugLine {
            offset: entry.offset,
            source,
            line: entry.line,
        });
    }
    let remap = |position: crate::DebugPosition| crate::DebugPosition {
        source: usize::try_from(position.source)
            .ok()
            .and_then(|index| indices.get(index))
            .copied()
            .unwrap_or(0),
        ..position
    };
    let mut scopes: Vec<crate::DebugScope> = collected
        .scopes
        .iter()
        .map(|scope| crate::DebugScope {
            at: remap(scope.at),
            ..*scope
        })
        .collect();
    scopes.sort_by(|a, b| a.start.cmp(&b.start).then(b.end.cmp(&a.end)));
    let mut functions: Vec<crate::DebugFunction> = collected
        .functions
        .iter()
        .map(|function| crate::DebugFunction {
            at: remap(function.at),
            end: function.end.map(remap),
            ..*function
        })
        .collect();
    functions.sort_by_key(|function| function.start);
    functions.dedup_by_key(|function| function.start);
    let structs = collected
        .structs
        .iter()
        .map(|structure| crate::DebugStruct {
            at: remap(structure.at),
            members: structure
                .members
                .iter()
                .map(|member| crate::DebugMember {
                    at: remap(member.at),
                    ..member.clone()
                })
                .collect(),
            ..structure.clone()
        })
        .collect();
    crate::DebugInfo {
        sources,
        units: vec![crate::DebugUnit {
            source: 0,
            start: 0,
            end: u32::try_from(preprocessed.text.len()).unwrap_or(u32::MAX),
            version,
            entry: collected.entry,
        }],
        lines,
        scopes,
        structs,
        functions,
        anchors: Vec::new(),
    }
}

fn sema_options(options: &Options, text: &str) -> rglsl_sema::Options {
    rglsl_sema::Options {
        spirv_version: options.spirv_version,
        end_of_input: u32::try_from(text.len()).ok(),
        require_bindings: !options.auto_map_bindings,
        limits: options.limits,
        ..rglsl_sema::Options::new(stage(options.stage))
    }
}

fn semantic_errors_before(
    options: &Options,
    preprocessed: &rglsl_pp::Preprocessed,
    end: usize,
    class: &StageClass,
) -> Vec<Error> {
    let map = &preprocessed.source_map;
    let text = preprocessed.text.as_str();
    class.identifiers(text);
    let (unit, failure) = rglsl_ast::parse_prefix(text);
    let analysis = rglsl_sema::analyze(&unit, &sema_options(options, text));
    class.probe.narrow(analysis.stages);
    class.version.set(analysis.version);
    class
        .names
        .borrow_mut()
        .extend(analysis.stage_names.iter().cloned());
    let parsed = failure.map_or(u32::MAX, |error| error.span.start);
    let mut errors: Vec<Error> = analysis
        .diagnostics
        .iter()
        .filter(|diagnostic| {
            diagnostic.offset(text) < parsed
                && !link_time(&diagnostic.kind)
                && !matches!(
                    diagnostic.kind,
                    rglsl_sema::DiagnosticKind::UnsupportedProfile(_)
                )
        })
        .map(|diagnostic| semantic_error(map, text, diagnostic))
        .filter(|error| error.meta.to_range().is_some_and(|range| range.start < end))
        .collect();
    errors.sort_by_key(|error| error.meta.to_range().map(|range| range.start));
    errors
}

const fn external_end(declaration: &ExternalDeclaration) -> u32 {
    match *declaration {
        ExternalDeclaration::Directive(ref directive) => directive.span.end,
        ExternalDeclaration::FunctionDefinition(ref definition) => definition.span.end,
        ExternalDeclaration::Declaration(ref declaration) => declaration.span.end,
        ExternalDeclaration::Semicolon(ref semicolon) => semicolon.span.end,
    }
}

fn semantic_error(
    map: &rglsl_pp::SourceMap,
    text: &str,
    diagnostic: &rglsl_sema::Diagnostic,
) -> Error {
    let start = diagnostic.offset(text);
    Error {
        kind: ErrorKind::SemanticError(Cow::Owned(diagnostic.kind.to_string())),
        meta: original(
            map,
            rglsl_ast::Span::new(start, diagnostic.span.end.max(start)),
        ),
    }
}

fn included(map: &rglsl_pp::SourceMap, offset: u32) -> Option<IncludeLocation> {
    let (file, line) = map.line(usize::try_from(offset).unwrap_or(usize::MAX));
    if file == map.root() {
        return None;
    }
    map.file_name(file).map(|name| IncludeLocation {
        file: String::from(name),
        line,
    })
}

fn original(map: &rglsl_pp::SourceMap, span: rglsl_ast::Span) -> Span {
    let locate = |offset: u32| {
        let location = map.locate(usize::try_from(offset).unwrap_or(usize::MAX));
        (location.file == map.root()).then_some(location.offset)
    };
    match (locate(span.start), locate(span.end)) {
        (Some(start), Some(end)) => Span::new(start, end.max(start)),
        (Some(start), None) => Span::new(start, start),
        _ => Span::UNDEFINED,
    }
}

const fn preprocessor_stage(stage: ShaderStage) -> rglsl_pp::Stage {
    match stage {
        ShaderStage::Vertex => rglsl_pp::Stage::Vertex,
        ShaderStage::TessControl => rglsl_pp::Stage::TessControl,
        ShaderStage::TessEvaluation => rglsl_pp::Stage::TessEvaluation,
        ShaderStage::Geometry => rglsl_pp::Stage::Geometry,
        ShaderStage::Task => rglsl_pp::Stage::Task,
        ShaderStage::Mesh => rglsl_pp::Stage::Mesh,
        ShaderStage::Fragment => rglsl_pp::Stage::Fragment,
        ShaderStage::Compute => rglsl_pp::Stage::Compute,
        ShaderStage::RayGeneration => rglsl_pp::Stage::RayGeneration,
        ShaderStage::Miss => rglsl_pp::Stage::Miss,
        ShaderStage::AnyHit => rglsl_pp::Stage::AnyHit,
        ShaderStage::ClosestHit => rglsl_pp::Stage::ClosestHit,
        ShaderStage::Intersection => rglsl_pp::Stage::Intersection,
        ShaderStage::Callable => rglsl_pp::Stage::Callable,
    }
}

const fn stage(stage: ShaderStage) -> rglsl_sema::Stage {
    match stage {
        ShaderStage::Vertex => rglsl_sema::Stage::Vertex,
        ShaderStage::TessControl => rglsl_sema::Stage::TessControl,
        ShaderStage::TessEvaluation => rglsl_sema::Stage::TessEvaluation,
        ShaderStage::Geometry => rglsl_sema::Stage::Geometry,
        ShaderStage::Task => rglsl_sema::Stage::Task,
        ShaderStage::Mesh => rglsl_sema::Stage::Mesh,
        ShaderStage::Fragment => rglsl_sema::Stage::Fragment,
        ShaderStage::Compute => rglsl_sema::Stage::Compute,
        ShaderStage::RayGeneration => rglsl_sema::Stage::RayGeneration,
        ShaderStage::Miss => rglsl_sema::Stage::Miss,
        ShaderStage::AnyHit => rglsl_sema::Stage::AnyHit,
        ShaderStage::ClosestHit => rglsl_sema::Stage::ClosestHit,
        ShaderStage::Intersection => rglsl_sema::Stage::Intersection,
        ShaderStage::Callable => rglsl_sema::Stage::Callable,
    }
}

pub(super) fn unsupported(what: impl Into<String>, span: Span) -> Error {
    Error {
        kind: ErrorKind::Unsupported(what.into()),
        meta: span,
    }
}

pub(super) fn semantic(message: impl Into<String>, span: Span) -> Error {
    Error {
        kind: ErrorKind::SemanticError(Cow::Owned(message.into())),
        meta: span,
    }
}

pub(super) const fn internal(span: Span) -> Error {
    Error {
        kind: ErrorKind::InternalError("the analysis does not describe this construct"),
        meta: span,
    }
}

#[derive(Clone, Copy, Debug)]
pub(super) enum GlobalRef {
    Variable(Handle<GlobalVariable>),
    Constant(Handle<crate::Constant>),
    Override(Handle<crate::Override>),
}

pub(super) use rglsl_sema::types::Packing;

pub(super) const fn relaxed(qualifiers: &rglsl_sema::scope::Qualifiers) -> bool {
    matches!(
        qualifiers.precision,
        Some(rglsl_ast::ast::PrecisionQualifier::Low | rglsl_ast::ast::PrecisionQualifier::Medium)
    )
}

#[derive(Clone, Copy, Debug, Default)]
pub(super) struct LayerLayout {
    pub viewport_relative: bool,
    pub secondary_view_offset: Option<i32>,
    pub redeclared: Option<SymbolId>,
}

#[derive(Clone, Copy, Debug, Default)]
pub(super) struct BlockDefaults {
    pub packing: Option<Packing>,
    pub row_major: Option<bool>,
}

#[derive(Debug)]
pub(super) struct Initialization<'a> {
    pub global: Handle<GlobalVariable>,
    pub symbol: SymbolId,
    pub initializer: &'a Spanned<Initializer>,
}

#[derive(Debug)]
pub(super) struct Lowerer<'a> {
    pub source_map: &'a rglsl_pp::SourceMap,
    pub unit: &'a TranslationUnit,
    pub analysis: &'a Analysis,
    pub options: &'a Options,
    probe: &'a StageProbe<ShaderStage>,
    stage_names: &'a RefCell<BTreeSet<String>>,
    pub module: Module,
    pub layouter: Layouter,
    pub errors: Vec<Error>,
    pub structs: BTreeMap<StructId, Handle<Type>>,
    pub array_types: BTreeMap<(SharedDimensions, Handle<Type>), Handle<Type>>,
    pub relayout: BTreeMap<Handle<Type>, Handle<Type>>,
    pub references: BTreeMap<(BlockId, crate::PointerQualifiers), Handle<Type>>,
    pub references_in_progress: BTreeSet<BlockId>,
    pub qualified_references: BTreeMap<Handle<Type>, Handle<Type>>,
    pub block_bools: BTreeSet<(BlockId, u32)>,
    pub globals: BTreeMap<SymbolId, GlobalRef>,
    pub functions: BTreeMap<FunctionId, Handle<crate::Function>>,
    pub parameters: BTreeMap<FunctionId, Vec<Option<SymbolId>>>,
    pub depth: BTreeSet<SymbolId>,
    pub comparison: BTreeSet<SymbolId>,
    pub interface: Vec<Handle<GlobalVariable>>,
    pub outputs: BTreeMap<String, Handle<GlobalVariable>>,
    pub inputs: BTreeSet<String>,
    pub builtins: BTreeMap<String, Handle<GlobalVariable>>,
    pub builtin_sizes: BTreeMap<String, u32>,
    pub implicit_sizes: BTreeMap<SymbolId, u32>,
    pub variably_indexed: BTreeSet<SymbolId>,
    pub member_sizes: BTreeMap<(BlockId, u32), u32>,
    pub member_dimension_sizes: BTreeMap<(BlockId, u32, usize), u32>,
    pub task_payload: Option<Handle<GlobalVariable>>,
    pub task_memory: Vec<Handle<GlobalVariable>>,
    pub member_indices: BTreeMap<(BlockId, u32), u32>,
    pub invariant_all: bool,
    pub invariant: Vec<(String, Span)>,
    pub unbound: Vec<(Handle<GlobalVariable>, Option<u32>)>,
    pub next_location: [u32; 2],
    pub explicit_locations: [Vec<(u32, u32)>; 2],
    pub initializers: Vec<Initialization<'a>>,
    pub uniform_defaults: BlockDefaults,
    pub buffer_defaults: BlockDefaults,
    pub early_fragment_tests: bool,
    pub quad_control: crate::QuadControl,
    pub tile_shading_rate: [Option<u32>; 3],
    pub non_coherent_tile_read: bool,
    pub conservative_depth: Option<ConservativeDepth>,
    pub layer_layout: LayerLayout,
    pub override_coverage: bool,
    pub per_vertex: Option<(Handle<GlobalVariable>, Vec<String>)>,
    pub per_vertex_used: BTreeSet<String>,
    pub per_vertex_first_use: Option<u32>,
    pub per_vertex_redeclared: bool,
    pub block_outputs: BTreeSet<String>,
    pub specialized_sizes: BTreeMap<rglsl_ast::ast::NodeId, Handle<crate::Override>>,
    pub size_expressions: BTreeMap<rglsl_ast::ast::NodeId, &'a rglsl_ast::ast::Expression>,
    pub local_size_ids: [Option<u32>; 3],
    pub local_size_overrides: [Option<Handle<crate::Override>>; 3],
    pub specialize_work_group_size: bool,
    pub work_group_size_placeholders: [Option<Handle<crate::Override>>; 3],
    pub work_group_size: Option<Handle<crate::Override>>,
    pub heap_structs: BTreeMap<StructId, Handle<Type>>,
    pub heap_runtime_offsets: BTreeMap<Handle<GlobalVariable>, &'a rglsl_ast::ast::Expression>,
    pub ray_data: BTreeMap<(usize, u32), Handle<GlobalVariable>>,
    pub incoming_ray_payload: Option<Handle<GlobalVariable>>,
    pub deferred_private: BTreeMap<SymbolId, (String, Span)>,
    xfb: xfb::Xfb,
    stage_layout: stage::StageLayout,
    pub object: bool,
    pub library: bool,
    pub deferred_bias: bool,
    pub automatic_locations: Vec<Handle<GlobalVariable>>,
    pub automatic_bindings: Vec<(Handle<GlobalVariable>, Option<u32>)>,
    pub declared_local_size: [Option<u32>; 3],
    pub debug: Option<DebugCollector>,
}

impl<'a> Lowerer<'a> {
    fn new(
        unit: &'a TranslationUnit,
        analysis: &'a Analysis,
        options: &'a Options,
        source_map: &'a rglsl_pp::SourceMap,
        mode: Mode,
        probe: &'a StageProbe<ShaderStage>,
        stage_names: &'a RefCell<BTreeSet<String>>,
    ) -> Self {
        Self {
            source_map,
            unit,
            analysis,
            options,
            module: Module {
                vulkan_memory_model: analysis.vulkan_memory_model,
                descriptor_heap: analysis.extensions.contains(heap::HEAP_EXTENSION),
                shader_64bit_indexing: analysis.shader_64bit_indexing,
                variable_pointers: analysis.variable_pointers,
                replicated_composites: analysis.replicated_composites,
                legacy_buffer_blocks: !analysis.storage_buffer_class,
                source_extensions: analysis.requested_extensions.clone(),
                ..Module::default()
            },
            layouter: Layouter::default(),
            errors: Vec::new(),
            structs: BTreeMap::new(),
            array_types: BTreeMap::new(),
            relayout: BTreeMap::new(),
            references: BTreeMap::new(),
            references_in_progress: BTreeSet::new(),
            qualified_references: BTreeMap::new(),
            block_bools: BTreeSet::new(),
            globals: BTreeMap::new(),
            functions: BTreeMap::new(),
            parameters: BTreeMap::new(),
            depth: BTreeSet::new(),
            comparison: BTreeSet::new(),
            interface: Vec::new(),
            outputs: BTreeMap::new(),
            inputs: BTreeSet::new(),
            builtins: BTreeMap::new(),
            builtin_sizes: BTreeMap::new(),
            implicit_sizes: BTreeMap::new(),
            variably_indexed: BTreeSet::new(),
            member_sizes: BTreeMap::new(),
            member_dimension_sizes: BTreeMap::new(),
            task_payload: None,
            task_memory: Vec::new(),
            member_indices: BTreeMap::new(),
            invariant_all: false,
            invariant: Vec::new(),
            unbound: Vec::new(),
            next_location: [0; 2],
            explicit_locations: [Vec::new(), Vec::new()],
            initializers: Vec::new(),
            uniform_defaults: BlockDefaults::default(),
            buffer_defaults: BlockDefaults::default(),
            early_fragment_tests: false,
            quad_control: crate::QuadControl::default(),
            tile_shading_rate: [None; 3],
            non_coherent_tile_read: false,
            conservative_depth: None,
            layer_layout: LayerLayout::default(),
            override_coverage: false,
            per_vertex: None,
            per_vertex_used: BTreeSet::new(),
            per_vertex_first_use: None,
            per_vertex_redeclared: false,
            block_outputs: BTreeSet::new(),
            specialized_sizes: BTreeMap::new(),
            size_expressions: BTreeMap::new(),
            local_size_ids: [None; 3],
            local_size_overrides: [None; 3],
            specialize_work_group_size: false,
            work_group_size_placeholders: [None; 3],
            work_group_size: None,
            heap_structs: BTreeMap::new(),
            heap_runtime_offsets: BTreeMap::new(),
            ray_data: BTreeMap::new(),
            incoming_ray_payload: None,
            deferred_private: BTreeMap::new(),
            xfb: xfb::Xfb::new(),
            stage_layout: stage::StageLayout::default(),
            probe,
            stage_names,
            object: mode != Mode::Program,
            library: mode == Mode::Library,
            deferred_bias: false,
            automatic_locations: Vec::new(),
            automatic_bindings: Vec::new(),
            declared_local_size: [None; 3],
            debug: options.debug_info.then(DebugCollector::default),
        }
    }

    pub(super) fn at(&self, span: rglsl_ast::Span) -> Span {
        if self.debug.is_some() {
            return Span::new(span.start, span.end);
        }
        original(self.source_map, span)
    }

    pub(super) fn debug_scope(&mut self, start: u32, end: u32, at: u32) {
        if self.debug.is_none() {
            return;
        }
        let position = self.debug_position(at);
        if let Some(ref mut debug) = self.debug {
            debug.scopes.push(crate::DebugScope {
                start,
                end,
                at: position,
            });
        }
    }

    pub(super) fn debug_function(&mut self, node: &Node<FunctionDefinition>, entry: bool) {
        if self.debug.is_none() {
            return;
        }
        let definition = &node.kind;
        let start = node.span.start;
        let at = self.debug_position(definition.prototype.span.end.saturating_sub(1));
        let end = (!definition.body.statements.is_empty())
            .then(|| self.debug_position(definition.body.span.end.saturating_sub(1)));
        if let Some(ref mut debug) = self.debug {
            debug.functions.push(crate::DebugFunction {
                start,
                stop: node.span.end,
                at,
                end,
            });
            if entry {
                debug.entry = Some(start);
            }
        }
    }

    fn debug_structs(&mut self) {
        if self.debug.is_none() {
            return;
        }
        let mut structs = Vec::new();
        for declaration in &self.unit.external_declarations {
            let ExternalDeclaration::Declaration(ref declaration) = *declaration else {
                continue;
            };
            let (name, members) = match declaration.kind {
                rglsl_ast::ast::DeclarationKind::InitDeclaratorList(ref list) => {
                    match list.ty.node.specifier.node.non_array {
                        rglsl_ast::ast::TypeSpecifierNonArray::Struct(ref specifier) => {
                            (specifier.name.as_ref(), specifier.declarations.as_slice())
                        }
                        _ => continue,
                    }
                }
                rglsl_ast::ast::DeclarationKind::Block { ref structure, .. } => {
                    (Some(&structure.name), structure.members.as_slice())
                }
                _ => continue,
            };
            let Some(name) = name else {
                continue;
            };
            let members = members
                .iter()
                .flat_map(|member| {
                    let boolean = matches!(
                        member.node.ty.node.specifier.node.non_array,
                        rglsl_ast::ast::TypeSpecifierNonArray::Basic(
                            rglsl_ast::ast::BasicType::Scalar(rglsl_ast::ast::ScalarType::Bool)
                                | rglsl_ast::ast::BasicType::Vector {
                                    scalar: rglsl_ast::ast::ScalarType::Bool,
                                    ..
                                }
                        )
                    );
                    member
                        .node
                        .declarators
                        .iter()
                        .map(move |declarator| (boolean, declarator))
                })
                .map(|(boolean, declarator)| crate::DebugMember {
                    name: declarator.node.name.node.clone(),
                    at: self.debug_position(declarator.node.name.span.start),
                    boolean,
                })
                .collect();
            structs.push(crate::DebugStruct {
                name: name.node.clone(),
                unit: 0,
                at: self.debug_position(name.span.start),
                members,
            });
        }
        if let Some(ref mut debug) = self.debug {
            debug.structs = structs;
        }
    }

    pub(super) fn debug_position(&self, offset: u32) -> crate::DebugPosition {
        let entry = self
            .source_map
            .position(usize::try_from(offset).unwrap_or(usize::MAX));
        crate::DebugPosition {
            source: entry.source,
            line: entry.line,
            column: entry.column.saturating_add(1),
        }
    }

    pub(super) fn symbol(&self, id: SymbolId) -> Option<&'a Symbol> {
        self.analysis.symbol(id)
    }

    pub(super) fn variable(&self, id: SymbolId) -> Option<&'a Variable> {
        match self.symbol(id)?.kind {
            SymbolKind::Variable(ref variable) => Some(variable),
            _ => None,
        }
    }

    fn report(&mut self, result: Result<()>) {
        if let Err(error) = result {
            self.errors.push(error);
        }
    }

    pub(super) fn stage(&self) -> ShaderStage {
        self.probe.exact()
    }

    pub(super) fn stage_is(&self, stage: ShaderStage) -> bool {
        self.probe.is(stage)
    }

    pub(super) fn stage_map<T: PartialEq>(&self, answer: impl Fn(ShaderStage) -> T) -> T {
        self.probe.map(answer)
    }

    pub(super) fn builtin_name(&self, name: &str) {
        match self.analysis.stage_tables {
            Some(ref tables) => self
                .probe
                .narrow(tables.same_stages(stage(self.probe.own()), name)),
            None => {
                self.stage_names.borrow_mut().insert(String::from(name));
            }
        }
    }

    fn run(mut self) -> core::result::Result<Lowered, ParseErrors> {
        let unit = self.unit;
        self.debug_structs();
        let mut definitions: Vec<&'a Node<FunctionDefinition>> = Vec::new();
        for declaration in &unit.external_declarations {
            match *declaration {
                ExternalDeclaration::Directive(ref directive) => self.directive(&directive.node),
                ExternalDeclaration::FunctionDefinition(ref definition) => {
                    self.register_parameters(definition);
                    definitions.push(definition);
                }
                ExternalDeclaration::Declaration(_) | ExternalDeclaration::Semicolon(_) => {}
            }
        }
        self.prepass(&definitions);
        if self.options.auto_map_locations {
            self.reserve_explicit_locations();
        }
        for declaration in &unit.external_declarations {
            if let ExternalDeclaration::Declaration(ref declaration) = *declaration {
                let result = self.global_declaration(declaration);
                self.report(result);
            }
        }
        let result = self.declare_per_vertex();
        self.report(result);
        self.spirv_requirements();
        let result = self.spirv_decorations();
        self.report(result);
        if let Some(layer) = self.layer_layout.redeclared {
            let result = self.global_ref(layer, Span::UNDEFINED).map(|_| ());
            self.report(result);
        }
        let layout_errors = self.errors.len();
        self.passthrough_defaults();
        if !self.object {
            self.check_stage_layout();
        }
        let missing_layouts: Vec<Error> = self.errors.drain(layout_errors..).collect();
        let order = match self.function_order(&definitions) {
            Ok(order) => order,
            Err(error) => return Err(vec![error].into()),
        };
        let main = self.main_function();
        if self.object {
            let result = self.declare_imports();
            self.report(result);
        }
        for &(id, definition) in &order {
            let result = self.declare_function(id, definition);
            self.report(result);
        }
        for &(id, definition) in &order {
            let result = self.define_function(id, definition);
            self.report(result);
        }
        let entry = definitions.iter().find(|definition| {
            self.analysis.function_declarations.get(&definition.id) == main.as_ref()
        });
        match entry {
            Some(definition) => {
                let result = self.entry_point(definition);
                self.report(result);
            }
            None if self.object => {}
            None => self.errors.push(semantic(
                "the shader has no `main` function",
                Span::UNDEFINED,
            )),
        }
        self.errors.extend(missing_layouts);
        if !self.errors.is_empty() {
            return Err(core::mem::take(&mut self.errors).into());
        }
        self.finish_interface();
        if !self.errors.is_empty() {
            return Err(core::mem::take(&mut self.errors).into());
        }
        self.module.ray_tracing = self.ray_tracing_features();
        self.relax_globals();
        let debug = self.debug.take().unwrap_or_default();
        Ok(Lowered {
            object: self.into_object(),
            debug,
        })
    }

    fn relax_globals(&mut self) {
        let analysis = self.analysis;
        for (&symbol, global) in &self.globals {
            let GlobalRef::Variable(handle) = *global else {
                continue;
            };
            let relaxed_symbol = analysis
                .symbol(symbol)
                .and_then(|symbol| symbol.variable())
                .is_some_and(|variable| relaxed(&variable.qualifiers));
            if relaxed_symbol {
                self.module.global_variables[handle].relaxed_precision = true;
            }
        }
        for (name, &handle) in &self.builtins {
            self.builtin_name(name);
            let relaxed_builtin = analysis.symbols.iter().any(|symbol| {
                symbol.name == *name
                    && symbol
                        .variable()
                        .is_some_and(|variable| relaxed(&variable.qualifiers))
            });
            if relaxed_builtin {
                self.module.global_variables[handle].relaxed_precision = true;
            }
        }
    }

    fn directive(&mut self, directive: &rglsl_ast::ast::Directive) {
        if let rglsl_ast::ast::DirectiveKind::Pragma { ref tokens } = directive.kind {
            let words: Vec<&str> = tokens.iter().map(String::as_str).collect();
            if words == ["STDGL", "invariant", "(", "all", ")"] {
                self.invariant_all = true;
            }
        }
    }

    fn register_parameters(&mut self, definition: &'a Node<FunctionDefinition>) {
        let Some(&id) = self.analysis.function_declarations.get(&definition.id) else {
            return;
        };
        let symbols = definition
            .prototype
            .parameters
            .iter()
            .map(|parameter| self.analysis.declarations.get(&parameter.id).copied())
            .collect();
        self.parameters.insert(id, symbols);
    }

    fn main_function(&self) -> Option<FunctionId> {
        self.analysis
            .functions
            .iter()
            .enumerate()
            .find(|&(_, function)| function.name == "main" && function.parameters.is_empty())
            .and_then(|(index, _)| {
                let index = u32::try_from(index).ok()?;
                self.analysis
                    .function_declarations
                    .values()
                    .copied()
                    .find(|id| id.index() == index)
            })
    }

    pub(super) fn function_name(&self, id: FunctionId) -> String {
        self.analysis
            .function(id)
            .map_or_else(|| format!("function{}", id.index()), |f| f.name.clone())
    }
}
