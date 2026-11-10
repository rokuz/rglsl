mod atomic;
mod builtins;
mod call;
mod constant;
mod expression;
mod function;
mod globals;
mod message;
mod offset;
mod prepass;
mod reference;
mod specialization;
mod statement;
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

pub(super) fn parse(options: &Options, source: &str) -> core::result::Result<Module, ParseErrors> {
    let defines = options
        .defines
        .iter()
        .map(|(name, value)| rglsl_pp::Define::new(name.clone(), Some(value.as_str())))
        .collect();
    let preprocessor_options = rglsl_pp::Options {
        defines,
        vulkan_client_version: Some(100),
        stage: Some(preprocessor_stage(options.stage)),
        ..rglsl_pp::Options::default()
    };
    let preprocessed = rglsl_pp::preprocess(
        source,
        rglsl_pp::FileId(0),
        &preprocessor_options,
        &mut rglsl_pp::NoIncluder,
    );
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
        return Err(errors.into());
    }
    let text = preprocessed.text.as_str();
    let (unit, failure) = rglsl_ast::parse_prefix(text);
    let analysis = rglsl_sema::analyze(&unit, &rglsl_sema::Options::new(stage(options.stage)));
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
    if !analysis.diagnostics.is_empty() {
        let errors = analysis
            .diagnostics
            .iter()
            .map(|diagnostic| {
                let start = diagnostic.offset(text);
                Error {
                    kind: ErrorKind::SemanticError(Cow::Owned(diagnostic.kind.to_string())),
                    meta: original(
                        map,
                        rglsl_ast::Span::new(start, diagnostic.span.end.max(start)),
                    ),
                }
            })
            .collect::<Vec<_>>();
        return Err(errors.into());
    }
    Lowerer::new(&unit, &analysis, options, map).run()
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
        ShaderStage::Task => rglsl_pp::Stage::Task,
        ShaderStage::Mesh => rglsl_pp::Stage::Mesh,
        ShaderStage::Fragment => rglsl_pp::Stage::Fragment,
        ShaderStage::Compute => rglsl_pp::Stage::Compute,
        ShaderStage::RayGeneration => rglsl_pp::Stage::RayGeneration,
        ShaderStage::Miss => rglsl_pp::Stage::Miss,
        ShaderStage::AnyHit => rglsl_pp::Stage::AnyHit,
        ShaderStage::ClosestHit => rglsl_pp::Stage::ClosestHit,
    }
}

const fn stage(stage: ShaderStage) -> rglsl_sema::Stage {
    match stage {
        ShaderStage::Vertex => rglsl_sema::Stage::Vertex,
        ShaderStage::Task => rglsl_sema::Stage::Task,
        ShaderStage::Mesh => rglsl_sema::Stage::Mesh,
        ShaderStage::Fragment => rglsl_sema::Stage::Fragment,
        ShaderStage::Compute => rglsl_sema::Stage::Compute,
        ShaderStage::RayGeneration => rglsl_sema::Stage::RayGeneration,
        ShaderStage::Miss => rglsl_sema::Stage::Miss,
        ShaderStage::AnyHit => rglsl_sema::Stage::AnyHit,
        ShaderStage::ClosestHit => rglsl_sema::Stage::ClosestHit,
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
    pub invariant_all: bool,
    pub invariant: Vec<(String, Span)>,
    pub unbound: Vec<(Handle<GlobalVariable>, Option<u32>)>,
    pub next_location: [u32; 2],
    pub explicit_locations: [Vec<(u32, u32)>; 2],
    pub initializers: Vec<Initialization<'a>>,
    pub uniform_defaults: BlockDefaults,
    pub buffer_defaults: BlockDefaults,
    pub early_fragment_tests: bool,
    pub conservative_depth: Option<ConservativeDepth>,
    pub post_depth_coverage: Option<Span>,
    pub per_vertex: Option<(Handle<GlobalVariable>, Vec<String>)>,
    pub per_vertex_used: BTreeSet<String>,
    pub per_vertex_redeclared: bool,
    pub block_outputs: BTreeSet<String>,
    pub specialized_sizes: BTreeMap<rglsl_ast::ast::NodeId, Handle<crate::Override>>,
    pub size_expressions: BTreeMap<rglsl_ast::ast::NodeId, &'a rglsl_ast::ast::Expression>,
    pub local_size_ids: [Option<u32>; 3],
    pub local_size_overrides: [Option<Handle<crate::Override>>; 3],
    pub work_group_size: Option<Handle<crate::Override>>,
    xfb: xfb::Xfb,
}

impl<'a> Lowerer<'a> {
    fn new(
        unit: &'a TranslationUnit,
        analysis: &'a Analysis,
        options: &'a Options,
        source_map: &'a rglsl_pp::SourceMap,
    ) -> Self {
        Self {
            source_map,
            unit,
            analysis,
            options,
            module: Module {
                vulkan_memory_model: analysis.vulkan_memory_model,
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
            invariant_all: false,
            invariant: Vec::new(),
            unbound: Vec::new(),
            next_location: [0; 2],
            explicit_locations: [Vec::new(), Vec::new()],
            initializers: Vec::new(),
            uniform_defaults: BlockDefaults::default(),
            buffer_defaults: BlockDefaults::default(),
            early_fragment_tests: false,
            conservative_depth: None,
            post_depth_coverage: None,
            per_vertex: None,
            per_vertex_used: BTreeSet::new(),
            per_vertex_redeclared: false,
            block_outputs: BTreeSet::new(),
            specialized_sizes: BTreeMap::new(),
            size_expressions: BTreeMap::new(),
            local_size_ids: [None; 3],
            local_size_overrides: [None; 3],
            work_group_size: None,
            xfb: xfb::Xfb::new((options.stage == ShaderStage::Vertex).then_some(0)),
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

    fn run(mut self) -> core::result::Result<Module, ParseErrors> {
        if matches!(self.options.stage, ShaderStage::Task | ShaderStage::Mesh) {
            return Err(vec![unsupported("task and mesh shaders", Span::UNDEFINED)].into());
        }
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
        let order = match self.function_order(&definitions) {
            Ok(order) => order,
            Err(error) => return Err(vec![error].into()),
        };
        let main = self.main_function();
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
            None => self.errors.push(semantic(
                "the shader has no `main` function",
                Span::UNDEFINED,
            )),
        }
        if !self.errors.is_empty() {
            return Err(core::mem::take(&mut self.errors).into());
        }
        self.finish_interface();
        if !self.errors.is_empty() {
            return Err(core::mem::take(&mut self.errors).into());
        }
        Ok(self.module)
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
