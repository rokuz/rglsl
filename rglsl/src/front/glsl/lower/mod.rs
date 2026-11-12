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

use rglsl_ast::ast::{ExternalDeclaration, FunctionDefinition, Initializer, Node, Spanned};
use rglsl_ast::TranslationUnit;
use rglsl_sema::scope::{Symbol, SymbolKind, Variable};
use rglsl_sema::types::{BlockId, StructId};
use rglsl_sema::{Analysis, FunctionId, SymbolId};

use super::{Error, ErrorKind, Options, ParseErrors};
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
        &mut library::StageNames::default(),
    )
    .map(|object| object.module)
}

pub(super) fn compile(
    options: &Options,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> core::result::Result<crate::object::ObjectModule, ParseErrors> {
    let hint = (!options.library).then_some(options.stage);
    match defines_main(options, hint, source, root, includer) {
        Some(true) if options.library => Err(vec![semantic(
            "a module compiled as a library cannot define `main`: a module with `main` is a program and needs a shader stage",
            Span::UNDEFINED,
        )]
        .into()),
        Some(true) => lower(
            options,
            source,
            Mode::Object,
            root,
            includer,
            &mut library::StageNames::default(),
        ),
        Some(false) | None => library::compile(options, hint, source, root, includer),
    }
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

fn preprocess(
    options: &Options,
    stage: Option<ShaderStage>,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> rglsl_pp::Preprocessed {
    let defines = options
        .defines
        .iter()
        .map(|(name, value)| rglsl_pp::Define::new(name.clone(), Some(value.as_str())))
        .collect();
    let preprocessor_options = rglsl_pp::Options {
        defines,
        vulkan_client_version: Some(100),
        stage: stage.map(preprocessor_stage),
        ..rglsl_pp::Options::default()
    };
    rglsl_pp::preprocess(source, root, &preprocessor_options, includer)
}

fn defines_main(
    options: &Options,
    stage: Option<ShaderStage>,
    source: &str,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
) -> Option<bool> {
    let preprocessed = preprocess(options, stage, source, root, includer);
    if preprocessed.has_errors() {
        return None;
    }
    let (unit, _) = rglsl_ast::parse_prefix(preprocessed.text.as_str());
    Some(unit.external_declarations.iter().any(|declaration| {
        matches!(
            *declaration,
            ExternalDeclaration::FunctionDefinition(ref definition)
                if definition.prototype.name.node == "main"
        )
    }))
}

fn lower(
    options: &Options,
    source: &str,
    mode: Mode,
    root: rglsl_pp::FileId,
    includer: &mut dyn rglsl_pp::Includer,
    names: &mut library::StageNames,
) -> core::result::Result<crate::object::ObjectModule, ParseErrors> {
    let object = mode != Mode::Program;
    let preprocessed = preprocess(options, Some(options.stage), source, root, includer);
    let map = &preprocessed.source_map;
    if preprocessed.has_errors() {
        let errors = preprocessed
            .errors()
            .map(|diagnostic| {
                let offset = if diagnostic.location.file == map.root() {
                    diagnostic.location.offset
                } else {
                    0
                };
                Error {
                    kind: ErrorKind::Syntax(diagnostic.kind.to_string()),
                    meta: Span::new(offset, offset),
                }
            })
            .collect::<Vec<_>>();
        let first = errors
            .iter()
            .filter_map(|error| error.meta.to_range())
            .map(|range| range.start)
            .min();
        let mut earlier = first
            .map(|first| semantic_errors_before(options, &preprocessed, first))
            .unwrap_or_default();
        earlier.extend(errors);
        earlier.sort_by_key(|error| !error.meta.is_defined());
        return Err(earlier.into());
    }
    let text = preprocessed.text.as_str();
    let (unit, failure) = rglsl_ast::parse_prefix(text);
    let analysis = rglsl_sema::analyze(&unit, &sema_options(options, text));
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
        let mut errors: Vec<Error> = earlier
            .map(|diagnostic| semantic_error(map, text, diagnostic))
            .collect();
        errors.push(Error {
            kind: ErrorKind::Syntax(error.kind.to_string()),
            meta: original(map, error.span),
        });
        return Err(errors.into());
    }
    let errors = analysis
        .diagnostics
        .iter()
        .filter(|diagnostic| !(object && link_time(&diagnostic.kind)))
        .enumerate()
        .map(|(index, diagnostic)| {
            let start = diagnostic.offset(text);
            let message = (mode == Mode::Library && index == 0)
                .then(|| names.stage_diagnostic(&diagnostic.kind, analysis.version, options.stage))
                .flatten()
                .unwrap_or_else(|| diagnostic.kind.to_string());
            Error {
                kind: ErrorKind::SemanticError(Cow::Owned(message)),
                meta: if link_time(&diagnostic.kind) {
                    Span::UNDEFINED
                } else if usize::try_from(start).is_ok_and(|start| start >= text.len()) {
                    let end = u32::try_from(source.len()).unwrap_or(u32::MAX);
                    Span::new(end, end)
                } else {
                    original(
                        map,
                        rglsl_ast::Span::new(start, diagnostic.span.end.max(start)),
                    )
                },
            }
        })
        .collect::<Vec<_>>();
    if !errors.is_empty() {
        return Err(errors.into());
    }
    Lowerer::new(&unit, &analysis, options, map, mode).run()
}

fn sema_options(options: &Options, text: &str) -> rglsl_sema::Options {
    rglsl_sema::Options {
        spirv_version: options.spirv_version,
        end_of_input: u32::try_from(text.len()).ok(),
        require_bindings: !options.auto_map_bindings,
        ..rglsl_sema::Options::new(stage(options.stage))
    }
}

fn semantic_errors_before(
    options: &Options,
    preprocessed: &rglsl_pp::Preprocessed,
    end: usize,
) -> Vec<Error> {
    let map = &preprocessed.source_map;
    let text = preprocessed.text.as_str();
    let (unit, failure) = rglsl_ast::parse_prefix(text);
    let analysis = rglsl_sema::analyze(&unit, &sema_options(options, text));
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
    pub module: Module,
    pub layouter: Layouter,
    pub errors: Vec<Error>,
    pub structs: BTreeMap<StructId, Handle<Type>>,
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
    pub per_vertex_redeclared: bool,
    pub block_outputs: BTreeSet<String>,
    pub specialized_sizes: BTreeMap<rglsl_ast::ast::NodeId, Handle<crate::Override>>,
    pub size_expressions: BTreeMap<rglsl_ast::ast::NodeId, &'a rglsl_ast::ast::Expression>,
    pub local_size_ids: [Option<u32>; 3],
    pub local_size_overrides: [Option<Handle<crate::Override>>; 3],
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
    pub automatic_locations: Vec<Handle<GlobalVariable>>,
    pub automatic_bindings: Vec<(Handle<GlobalVariable>, Option<u32>)>,
    pub declared_local_size: [Option<u32>; 3],
}

impl<'a> Lowerer<'a> {
    fn new(
        unit: &'a TranslationUnit,
        analysis: &'a Analysis,
        options: &'a Options,
        source_map: &'a rglsl_pp::SourceMap,
        mode: Mode,
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
                ..Module::default()
            },
            layouter: Layouter::default(),
            errors: Vec::new(),
            structs: BTreeMap::new(),
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
            per_vertex_redeclared: false,
            block_outputs: BTreeSet::new(),
            specialized_sizes: BTreeMap::new(),
            size_expressions: BTreeMap::new(),
            local_size_ids: [None; 3],
            local_size_overrides: [None; 3],
            work_group_size: None,
            heap_structs: BTreeMap::new(),
            heap_runtime_offsets: BTreeMap::new(),
            ray_data: BTreeMap::new(),
            incoming_ray_payload: None,
            deferred_private: BTreeMap::new(),
            xfb: xfb::Xfb::new(
                matches!(
                    options.stage,
                    ShaderStage::Vertex | ShaderStage::TessEvaluation | ShaderStage::Geometry
                )
                .then_some(0),
            ),
            stage_layout: stage::StageLayout::default(),
            object: mode != Mode::Program,
            library: mode == Mode::Library,
            automatic_locations: Vec::new(),
            automatic_bindings: Vec::new(),
            declared_local_size: [None; 3],
        }
    }

    pub(super) fn at(&self, span: rglsl_ast::Span) -> Span {
        original(self.source_map, span)
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

    fn run(mut self) -> core::result::Result<crate::object::ObjectModule, ParseErrors> {
        let unit = self.unit;
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
        Ok(self.into_object())
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
