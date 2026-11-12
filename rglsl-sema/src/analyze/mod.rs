mod call;
mod cooperative;
mod cooperative_call;
mod cooperative_matrix2;
mod declaration;
mod expression;
mod extension;
mod fragment;
mod frames;
mod heap;
mod layout_qualifiers;
mod memory;
mod mesh;
mod precise;
mod precision;
mod qcom;
mod ray;
mod reference;
mod reference_expression;
mod spirv;
mod stage;
mod statement;
mod tensor;
mod texture;

use alloc::collections::{BTreeMap, BTreeSet};
use alloc::format;
use alloc::string::String;
use alloc::sync::Arc;
use alloc::vec::Vec;
use core::cell::RefCell;

use rglsl_types::probe::StageProbe;

use rglsl_ast::ast::{DirectiveKind, ExternalDeclaration, NodeId};
use rglsl_ast::extensions::ExtensionState;
use rglsl_ast::{Span, TranslationUnit};

pub use cooperative_call::CooperativeCall;
pub use cooperative_matrix2::{MatrixCall, TensorCall};
pub use precision::RelaxedPrecision;
pub use qcom::QcomConversion;
pub use tensor::TensorArmCall;

use crate::builtins::{
    BuiltinFunctionId, Builtins, ResourceLimits, Stage, StageTables, ALL_STAGE_BITS,
};
use crate::constant::Constant;
use crate::diagnostic::{Diagnostic, DiagnosticKind};
use crate::scope::{
    Function, FunctionId, Lookup, Origin, Qualifiers, Scopes, Storage, Symbol, SymbolId,
    SymbolKind, Variable,
};
use crate::spirv::{SpirvExecutionModes, SpirvRequirements};
use crate::types::{BlockStorage, Packing, Type, TypeKind, TypeRegistry};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Options {
    pub stage: Stage,
    pub relaxed_uniforms: bool,
    pub limits: ResourceLimits,
    pub spirv_version: Option<(u8, u8)>,
    pub end_of_input: Option<u32>,
    pub require_bindings: bool,
    pub specialize_work_group_size: bool,
}

impl Options {
    pub fn new(stage: Stage) -> Self {
        Self {
            stage,
            relaxed_uniforms: false,
            limits: ResourceLimits::default(),
            spirv_version: None,
            end_of_input: None,
            require_bindings: false,
            specialize_work_group_size: false,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Callee {
    Function(FunctionId),
    Builtin(BuiltinFunctionId),
    Constructor(Type),
    Length,
    NonUniform,
    DebugPrintf,
    Abort,
    Cooperative(CooperativeCall),
    Tensor(TensorCall),
    Matrix(MatrixCall),
    TensorArm(TensorArmCall),
}

#[derive(Debug, Clone, PartialEq)]
pub struct ExpressionInfo {
    pub ty: Type,
    pub is_lvalue: bool,
    pub is_constant: bool,
    pub is_specialization: bool,
    pub non_uniform: bool,
    pub value: Option<Constant>,
    pub conversion: Option<Type>,
    pub output_conversion: Option<Type>,
}

#[derive(Debug, Clone)]
pub struct Analysis {
    pub version: Option<u32>,
    pub stage: Stage,
    pub builtins: Arc<Builtins>,
    pub types: TypeRegistry,
    pub symbols: Vec<Symbol>,
    pub functions: Vec<Function>,
    pub expressions: BTreeMap<NodeId, ExpressionInfo>,
    pub references: BTreeMap<NodeId, SymbolId>,
    pub calls: BTreeMap<NodeId, Callee>,
    pub declarations: BTreeMap<NodeId, SymbolId>,
    pub function_declarations: BTreeMap<NodeId, FunctionId>,
    pub extensions: BTreeSet<String>,
    pub requested_extensions: Vec<String>,
    pub diagnostics: Vec<Diagnostic>,
    pub warnings: Vec<Diagnostic>,
    pub vulkan_memory_model: bool,
    pub storage_buffer_class: bool,
    pub shader_64bit_indexing: bool,
    pub promote_uint32_indices: bool,
    pub variable_pointers: bool,
    pub replicated_composites: bool,
    pub primitive_culling: bool,
    pub subgroup_uniform_control_flow: bool,
    pub maximally_reconverges: bool,
    pub derivative_group: Option<(DerivativeGroup, bool)>,
    pub fragment: FragmentLayout,
    pub spirv_requirements: SpirvRequirements,
    pub spirv_execution_modes: SpirvExecutionModes,
    pub no_contraction: BTreeSet<NodeId>,
    pub relaxed_precision: precision::RelaxedPrecision,
    pub work_group_size_read: bool,
    pub stages: u16,
    pub stage_names: BTreeSet<String>,
    pub stage_diagnostics: Vec<StageDiagnostic>,
    pub diagnostic_trust: Vec<u16>,
    pub stage_tables: Option<Arc<StageTables>>,
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct StageDiagnostic {
    pub index: usize,
    pub stage: Stage,
    pub diagnostic: Diagnostic,
    pub trusted: u16,
}

impl Analysis {
    pub fn type_of(&self, expression: NodeId) -> Option<&Type> {
        self.expressions.get(&expression).map(|info| &info.ty)
    }

    pub fn expression(&self, expression: NodeId) -> Option<&ExpressionInfo> {
        self.expressions.get(&expression)
    }

    pub fn symbol(&self, id: SymbolId) -> Option<&Symbol> {
        self.symbols.get(usize::try_from(id.index()).ok()?)
    }

    pub fn function(&self, id: FunctionId) -> Option<&Function> {
        self.functions.get(usize::try_from(id.index()).ok()?)
    }

    pub fn symbol_type(&self, id: SymbolId) -> Option<Type> {
        symbol_type(&self.symbols, &self.types, id)
    }

    pub const fn is_ok(&self) -> bool {
        self.diagnostics.is_empty()
    }
}

fn symbol_type(symbols: &[Symbol], types: &TypeRegistry, id: SymbolId) -> Option<Type> {
    let symbol = symbols.get(usize::try_from(id.index()).ok()?)?;
    match &symbol.kind {
        SymbolKind::Variable(variable) => Some(variable.ty.clone()),
        SymbolKind::Struct(structure) => Some(Type::structure(*structure)),
        SymbolKind::Reference(block) => Some(Type::reference(*block)),
        SymbolKind::BufferType(_) | SymbolKind::BlockName => None,
        SymbolKind::BlockMember { instance, index } => {
            let instance = symbols.get(usize::try_from(instance.index()).ok()?)?;
            let TypeKind::Block(block) = instance.variable()?.ty.kind else {
                return None;
            };
            let member = types
                .block(block)?
                .members
                .get(usize::try_from(*index).ok()?)?;
            Some(member.ty.clone())
        }
    }
}

pub use declaration::is_null_initializer;
pub use fragment::{FragmentLayout, Interlock};
pub use ray::is_shader_record;
pub use stage::layout_stages;

pub fn analyze(unit: &TranslationUnit, options: &Options) -> Analysis {
    run(unit, options, None)
}

pub fn analyze_library(
    unit: &TranslationUnit,
    options: &Options,
    tables: &Arc<StageTables>,
) -> Analysis {
    let mut diagnostics = Vec::new();
    let version = version_of(unit, &mut diagnostics);
    let builtins = Arc::new(tables.builtins(options.stage));
    let mut analyzer = Analyzer::new(options, builtins, diagnostics);
    analyzer.library = Some(Arc::clone(tables));
    analyzer.version = version;
    analyzer.unit(unit);
    let mut analysis = analyzer.finish();
    analysis.no_contraction = precise::no_contraction(unit, &analysis);
    analysis.relaxed_precision = precision::relaxed_precision(unit, &analysis);
    analysis
}

pub fn analyze_with_builtins(
    unit: &TranslationUnit,
    options: &Options,
    builtins: &Arc<Builtins>,
) -> Analysis {
    run(unit, options, Some(builtins))
}

fn run(unit: &TranslationUnit, options: &Options, cached: Option<&Arc<Builtins>>) -> Analysis {
    let mut diagnostics = Vec::new();
    let version = version_of(unit, &mut diagnostics);
    let effective = match version {
        Some(460) => 460,
        _ => 450,
    };
    let builtins = match cached {
        Some(builtins)
            if builtins.version() == effective
                && builtins.stage() == options.stage
                && *builtins.limits() == options.limits =>
        {
            Arc::clone(builtins)
        }
        _ => Arc::new(Builtins::new(effective, options.stage, &options.limits)),
    };
    let mut analyzer = Analyzer::new(options, builtins, diagnostics);
    analyzer.version = version;
    analyzer.unit(unit);
    let mut analysis = analyzer.finish();
    analysis.no_contraction = precise::no_contraction(unit, &analysis);
    analysis.relaxed_precision = precision::relaxed_precision(unit, &analysis);
    analysis
}

fn version_of(unit: &TranslationUnit, diagnostics: &mut Vec<Diagnostic>) -> Option<u32> {
    for declaration in &unit.external_declarations {
        let ExternalDeclaration::Directive(directive) = declaration else {
            continue;
        };
        let DirectiveKind::Version { number, profile } = &directive.kind else {
            continue;
        };
        if !matches!(number, 450 | 460) {
            diagnostics.push(Diagnostic {
                span: directive.span,
                kind: DiagnosticKind::UnsupportedVersion(*number),
            });
        }
        if let Some(profile) = profile {
            if profile != "core" {
                diagnostics.push(Diagnostic {
                    span: directive.span,
                    kind: DiagnosticKind::UnsupportedProfile(profile.clone()),
                });
            }
        }
        return Some(*number);
    }
    diagnostics.push(Diagnostic {
        span: Span::default(),
        kind: DiagnosticKind::MissingVersion,
    });
    None
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum Place {
    Temporary,
    Writable,
    ReadOnly(&'static str),
}

#[derive(Debug, Clone)]
pub(crate) struct Operand {
    pub ty: Type,
    pub constant: bool,
    pub value: Option<Constant>,
    pub place: Place,
    pub root: Option<SymbolId>,
    pub storage: Storage,
    pub specialization: bool,
    pub writeonly: bool,
    pub non_uniform: bool,
    pub through_reference: bool,
}

impl Operand {
    pub(crate) const fn error() -> Self {
        Self::temporary(Type::ERROR)
    }

    pub(crate) const fn temporary(ty: Type) -> Self {
        Self {
            ty,
            constant: false,
            value: None,
            place: Place::Temporary,
            root: None,
            storage: Storage::None,
            specialization: false,
            writeonly: false,
            non_uniform: false,
            through_reference: false,
        }
    }

    pub(crate) fn constant(ty: Type, value: Option<Constant>) -> Self {
        Self {
            constant: true,
            value,
            ..Self::temporary(ty)
        }
    }
}

pub(crate) struct FunctionContext {
    pub return_type: Type,
    pub returns_value: bool,
}

pub(crate) struct SwitchContext {
    pub labels: Vec<i64>,
    pub has_default: bool,
    pub nesting: u32,
}

pub(crate) struct Analyzer<'a> {
    probe: StageProbe<Stage>,
    stage_names: RefCell<BTreeSet<String>>,
    pub library: Option<Arc<StageTables>>,
    pub stage_diagnostics: Vec<StageDiagnostic>,
    pub trust: Vec<u16>,
    pub options: &'a Options,
    pub version: Option<u32>,
    pub builtins: Arc<Builtins>,
    pub types: TypeRegistry,
    pub symbols: Vec<Symbol>,
    pub functions: Vec<Function>,
    pub scopes: Scopes,
    pub expressions: BTreeMap<NodeId, ExpressionInfo>,
    pub references: BTreeMap<NodeId, SymbolId>,
    pub calls: BTreeMap<NodeId, Callee>,
    pub declarations: BTreeMap<NodeId, SymbolId>,
    pub function_declarations: BTreeMap<NodeId, FunctionId>,
    pub extensions: ExtensionState,
    pub diagnostics: Vec<Diagnostic>,
    pub warnings: Vec<Diagnostic>,
    pub function: Option<FunctionContext>,
    pub loop_depth: u32,
    pub switches: Vec<SwitchContext>,
    pub nesting: u32,
    pub main_defined: bool,
    pub work_group_size: Option<SymbolId>,
    pub work_group_size_read: bool,
    pub local_size_declared: bool,
    pub specialization_uses: u32,
    pub block_names: BTreeMap<String, Vec<BlockStorage>>,
    pub input_array_size: Option<u32>,
    pub output_array_size: Option<u32>,
    pub called: BTreeMap<Option<FunctionId>, BTreeSet<FunctionId>>,
    pub current_function: Option<FunctionId>,
    pub main: Option<FunctionId>,
    pub redeclared_blocks: Vec<BlockStorage>,
    pub recovered: BTreeSet<SymbolId>,
    pub derivative_group: Option<(DerivativeGroup, bool)>,
    pub khr_derivative_group: bool,
    pub local_size: [Option<u32>; 3],
    pub local_size_specialized: [bool; 3],
    pub local_size_ids: [Option<i64>; 3],
    pub buffer_packing: Packing,
    pub buffer_row_major: bool,
    pub vulkan_memory_model: bool,
    pub storage_buffer_class: bool,
    pub shader_64bit_indexing: bool,
    pub promote_uint32_indices: bool,
    pub variable_pointers: bool,
    pub replicated_composites: bool,
    pub ray_locations: [Vec<u32>; 3],
    pub primitive_culling: bool,
    pub subgroup_uniform_control_flow: bool,
    pub maximally_reconverges: bool,
    pub stage_layout: stage::StageLayout,
    pub fragment_layout: FragmentLayout,
    pub tile_image_locations: Vec<(u32, u32)>,
    pub spirv_requirements: SpirvRequirements,
    pub spirv_execution_modes: SpirvExecutionModes,
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub enum DerivativeGroup {
    Quads,
    Linear,
}

impl<'a> Analyzer<'a> {
    fn new(options: &'a Options, builtins: Arc<Builtins>, diagnostics: Vec<Diagnostic>) -> Self {
        let mut scopes = Scopes::new();
        scopes.push();
        let mut work_group_size = None;
        for (name, id) in builtins.variables() {
            if name == "gl_WorkGroupSize" {
                work_group_size = Some(id);
            }
            let _ = scopes.declare(name, id);
        }
        scopes.push();
        let probe = StageProbe::new(options.stage, &Stage::ALL);
        let trust = alloc::vec![ALL_STAGE_BITS; diagnostics.len()];
        Self {
            probe,
            stage_names: RefCell::new(BTreeSet::new()),
            library: None,
            stage_diagnostics: Vec::new(),
            trust,
            options,
            version: None,
            types: builtins.types().clone(),
            symbols: builtins.symbols().to_vec(),
            builtins,
            functions: Vec::new(),
            scopes,
            expressions: BTreeMap::new(),
            references: BTreeMap::new(),
            calls: BTreeMap::new(),
            declarations: BTreeMap::new(),
            function_declarations: BTreeMap::new(),
            extensions: ExtensionState::new(),
            diagnostics,
            warnings: Vec::new(),
            function: None,
            loop_depth: 0,
            switches: Vec::new(),
            nesting: 0,
            main_defined: false,
            work_group_size,
            work_group_size_read: false,
            local_size_declared: false,
            specialization_uses: 0,
            block_names: BTreeMap::new(),
            input_array_size: None,
            output_array_size: None,
            called: BTreeMap::new(),
            current_function: None,
            main: None,
            redeclared_blocks: Vec::new(),
            recovered: BTreeSet::new(),
            derivative_group: None,
            khr_derivative_group: false,
            local_size: [None; 3],
            local_size_specialized: [false; 3],
            local_size_ids: [None; 3],
            buffer_packing: Packing::Std430,
            buffer_row_major: false,
            vulkan_memory_model: false,
            storage_buffer_class: false,
            shader_64bit_indexing: false,
            promote_uint32_indices: false,
            variable_pointers: false,
            replicated_composites: false,
            ray_locations: [Vec::new(), Vec::new(), Vec::new()],
            primitive_culling: false,
            subgroup_uniform_control_flow: false,
            maximally_reconverges: false,
            stage_layout: stage::StageLayout::default(),
            fragment_layout: FragmentLayout::default(),
            tile_image_locations: Vec::new(),
            spirv_requirements: SpirvRequirements::default(),
            spirv_execution_modes: SpirvExecutionModes::new(),
        }
    }

    fn unit(&mut self, unit: &TranslationUnit) {
        for declaration in &unit.external_declarations {
            match declaration {
                ExternalDeclaration::Directive(directive) => match &directive.kind {
                    DirectiveKind::Extension { name, behavior } => {
                        self.extension_directive(directive.span, name, *behavior);
                    }
                    DirectiveKind::Pragma { tokens } => self.pragma(directive.span, tokens),
                    DirectiveKind::Version { .. } => {}
                },
                ExternalDeclaration::FunctionDefinition(definition) => {
                    self.function_definition(definition);
                }
                ExternalDeclaration::Declaration(declaration) => self.declaration(declaration),
                ExternalDeclaration::Semicolon(_) => {}
            }
        }
        let mut reachable: BTreeSet<FunctionId> = BTreeSet::new();
        let mut pending: Vec<FunctionId> = self
            .called
            .get(&None)
            .into_iter()
            .flatten()
            .copied()
            .chain(self.main)
            .collect();
        while let Some(id) = pending.pop() {
            if reachable.insert(id) {
                pending.extend(self.called.get(&Some(id)).into_iter().flatten().copied());
            }
        }
        let missing: Vec<(Span, String)> = reachable
            .iter()
            .filter_map(|id| self.function(*id))
            .filter(|function| !function.defined && function.spirv_instruction.is_none())
            .map(|function| (function.span, function.name.clone()))
            .collect();
        for (span, name) in missing {
            self.error(span, DiagnosticKind::MissingFunctionBody(name));
        }
        let end = unit
            .external_declarations
            .last()
            .map_or(0, |declaration| match declaration {
                ExternalDeclaration::Directive(directive) => directive.span.end,
                ExternalDeclaration::FunctionDefinition(definition) => definition.span.end,
                ExternalDeclaration::Declaration(declaration) => declaration.span.end,
                ExternalDeclaration::Semicolon(semicolon) => semicolon.span.end,
            });
        if !self.main_defined {
            self.error(Span::new(end, end), DiagnosticKind::MissingEntryPoint);
        }
        let end_of_input = self.options.end_of_input.unwrap_or(end);
        self.check_derivative_group(Span::new(end_of_input, end_of_input));
        self.mesh_output_reads(unit);
    }

    fn pragma(&mut self, span: Span, tokens: &[String]) {
        let words: Vec<&str> = tokens.iter().map(String::as_str).collect();
        if words.first() == Some(&"use_variable_pointers")
            && self
                .options
                .spirv_version
                .is_some_and(|version| version < (1, 3))
        {
            self.error(span, DiagnosticKind::InvalidPragma("requires SPIR-V 1.3"));
        }
        let flag = match words.first() {
            Some(&"use_vulkan_memory_model") => Some(&mut self.vulkan_memory_model),
            Some(&"use_storage_buffer") => Some(&mut self.storage_buffer_class),
            Some(&"shader_64bit_indexing") => Some(&mut self.shader_64bit_indexing),
            Some(&"promote_uint32_indices") => Some(&mut self.promote_uint32_indices),
            Some(&"use_variable_pointers") => Some(&mut self.variable_pointers),
            Some(&"use_replicated_composites") => Some(&mut self.replicated_composites),
            _ => None,
        };

        if let Some(flag) = flag {
            *flag = true;
            if words.len() != 1 {
                self.error(span, DiagnosticKind::InvalidPragma("extra tokens"));
            }
            return;
        }
        if words.first() != Some(&"STDGL") {
            return;
        }
        if words.len() > 5 {
            self.error(span, DiagnosticKind::InvalidPragma("extra tokens"));
        }
        let [_, kind, open, argument, close, ..] = words.as_slice() else {
            self.error(
                span,
                DiagnosticKind::InvalidPragma("truncated STDGL declaration"),
            );
            return;
        };
        if *open != "(" && *close != ")" {
            self.error(
                span,
                DiagnosticKind::InvalidPragma("invalid STDGL declaration"),
            );
        }
        if *kind != "invariant" {
            self.error(
                span,
                DiagnosticKind::InvalidPragma("unknown STDGL declaration"),
            );
        } else if *argument != "all" {
            self.error(
                span,
                DiagnosticKind::InvalidPragma(
                    "invalid STDGL invariant declaration: expected `all`",
                ),
            );
        }
    }

    fn check_derivative_group(&mut self, end: Span) {
        if self
            .extensions
            .is_requested("GL_KHR_compute_shader_derivatives")
            && !self.khr_derivative_group
        {
            self.error(
                end,
                DiagnosticKind::InvalidQualifier {
                    qualifier: "GL_KHR_compute_shader_derivatives",
                    reason: "requires one of derivative_group_quadsKHR or derivative_group_linearKHR layout qualifiers",
                },
            );
        }
        let size = |index: usize| -> Option<u32> {
            if self
                .local_size_specialized
                .get(index)
                .copied()
                .unwrap_or(true)
            {
                None
            } else {
                Some(self.local_size.get(index).copied().flatten().unwrap_or(1))
            }
        };
        match self.derivative_group {
            Some((DerivativeGroup::Quads, _)) => {
                if [size(0), size(1)]
                    .iter()
                    .flatten()
                    .any(|size| size % 2 != 0)
                {
                    self.error(
                        end,
                        DiagnosticKind::InvalidQualifier {
                            qualifier: "derivative_group_quads",
                            reason: "requires local_size_x and local_size_y to be multiple of two",
                        },
                    );
                }
            }
            Some((DerivativeGroup::Linear, _)) => {
                if let (Some(x), Some(y), Some(z)) = (size(0), size(1), size(2)) {
                    if x.wrapping_mul(y).wrapping_mul(z) % 4 != 0 {
                        self.error(
                            end,
                            DiagnosticKind::InvalidQualifier {
                                qualifier: "derivative_group_linear",
                                reason: "requires total group size to be multiple of four",
                            },
                        );
                    }
                }
            }
            None => {}
        }
    }

    pub(crate) fn stage(&self) -> Stage {
        self.probe.exact()
    }

    pub(crate) fn stage_is(&self, stage: Stage) -> bool {
        self.probe.is(stage)
    }

    pub(crate) fn stage_map<T: PartialEq>(&self, answer: impl Fn(Stage) -> T) -> T {
        self.probe.map(answer)
    }

    pub(crate) fn builtin_name(&self, name: &str) {
        match self.library {
            Some(ref tables) => self
                .probe
                .narrow(tables.same_stages(self.options.stage, name)),
            None => {
                self.stage_names.borrow_mut().insert(String::from(name));
            }
        }
    }

    pub(crate) const fn is_library(&self) -> bool {
        self.library.is_some()
    }

    pub(crate) fn stage_check(
        &mut self,
        span: Span,
        check: impl Fn(Stage) -> Option<DiagnosticKind>,
    ) -> bool {
        if self.library.is_none() {
            return match self.probe.map(&check) {
                Some(kind) => {
                    self.error(span, kind);
                    true
                }
                None => false,
            };
        }
        let results: Vec<(Stage, Option<DiagnosticKind>)> = Stage::ALL
            .into_iter()
            .map(|stage| (stage, check(stage)))
            .collect();
        let failing = results.iter().filter(|&(_, kind)| kind.is_some()).count();
        if failing == 0 {
            return false;
        }
        let first = results.iter().find_map(|(_, kind)| kind.clone());
        if failing == results.len()
            && results
                .iter()
                .all(|(_, kind)| kind.as_ref() == first.as_ref())
        {
            if let Some(kind) = first {
                self.error(span, kind);
            }
            return true;
        }
        for (stage, kind) in results {
            if let Some(kind) = kind {
                self.stage_error(stage, span, kind);
            }
        }
        failing == Stage::ALL.len()
    }

    pub(crate) fn require_stage_extensions(
        &mut self,
        span: Span,
        what: &str,
        required: impl Fn(Stage) -> Option<&'static [&'static str]>,
    ) -> bool {
        if !self.is_library() {
            return match self.probe.map(&required) {
                Some(names) => self.require_extensions(span, names, what),
                None => true,
            };
        }
        let missing: Vec<(Stage, Option<&'static [&'static str]>)> = Stage::ALL
            .into_iter()
            .map(|stage| {
                (
                    stage,
                    required(stage).filter(|names| {
                        matches!(
                            self.extensions.request(names),
                            rglsl_ast::extensions::Request::Missing
                        )
                    }),
                )
            })
            .collect();
        let failed = self.stage_check(span, |stage| {
            missing
                .iter()
                .find(|&&(known, _)| known == stage)
                .and_then(|&(_, names)| names)
                .map(|names| DiagnosticKind::ExtensionRequired {
                    feature: String::from(what),
                    extensions: names.join(", "),
                })
        });
        if let Some(names) = required(self.options.stage) {
            if let rglsl_ast::extensions::Request::Warned(extension) =
                self.extensions.request(names)
            {
                self.warnings.push(Diagnostic {
                    span,
                    kind: DiagnosticKind::ExtensionWarned {
                        extension,
                        feature: String::from(what),
                    },
                });
            }
        }
        !failed
    }

    pub(crate) fn stage_error(&mut self, stage: Stage, span: Span, kind: DiagnosticKind) {
        self.stage_diagnostics.push(StageDiagnostic {
            index: self.diagnostics.len(),
            stage,
            diagnostic: Diagnostic { span, kind },
            trusted: self.probe.compatible(),
        });
    }

    pub(crate) fn narrow(&self, stages: u16) {
        self.probe.narrow(stages);
    }

    pub(crate) fn tables(&self) -> Option<Arc<StageTables>> {
        self.library.clone()
    }

    fn finish(self) -> Analysis {
        Analysis {
            stages: self.probe.compatible(),
            stage_names: self.stage_names.into_inner(),
            stage_diagnostics: self.stage_diagnostics,
            diagnostic_trust: self.trust,
            stage_tables: self.library,
            version: self.version,
            stage: self.options.stage,
            builtins: self.builtins,
            types: self.types,
            symbols: self.symbols,
            functions: self.functions,
            expressions: self.expressions,
            references: self.references,
            calls: self.calls,
            declarations: self.declarations,
            function_declarations: self.function_declarations,
            extensions: self.extensions.enabled().map(String::from).collect(),
            requested_extensions: self.extensions.requested().map(String::from).collect(),
            diagnostics: self.diagnostics,
            warnings: self.warnings,
            vulkan_memory_model: self.vulkan_memory_model,
            storage_buffer_class: self.storage_buffer_class,
            shader_64bit_indexing: self.shader_64bit_indexing,
            promote_uint32_indices: self.promote_uint32_indices,
            variable_pointers: self.variable_pointers,
            replicated_composites: self.replicated_composites,
            primitive_culling: self.primitive_culling,
            subgroup_uniform_control_flow: self.subgroup_uniform_control_flow,
            maximally_reconverges: self.maximally_reconverges,
            derivative_group: self.derivative_group,
            fragment: self.fragment_layout,
            spirv_requirements: self.spirv_requirements,
            spirv_execution_modes: self.spirv_execution_modes,
            no_contraction: BTreeSet::new(),
            relaxed_precision: precision::RelaxedPrecision::default(),
            work_group_size_read: self.work_group_size_read,
        }
    }

    pub(crate) fn error(&mut self, span: Span, kind: DiagnosticKind) {
        self.diagnostics.push(Diagnostic { span, kind });
        self.trust.push(self.probe.compatible());
    }

    pub(crate) fn show(&self, ty: &Type) -> String {
        format!("{}", ty.display(&self.types))
    }

    pub(crate) fn add_symbol(&mut self, name: &str, span: Span, kind: SymbolKind) -> SymbolId {
        let id = SymbolId(u32::try_from(self.symbols.len()).unwrap_or(u32::MAX));
        self.symbols.push(Symbol {
            name: String::from(name),
            span,
            kind,
        });
        id
    }

    pub(crate) fn add_variable(
        &mut self,
        name: &str,
        span: Span,
        ty: Type,
        qualifiers: Qualifiers,
        origin: Origin,
        value: Option<Constant>,
    ) -> SymbolId {
        self.add_symbol(
            name,
            span,
            SymbolKind::Variable(Variable {
                ty,
                qualifiers,
                origin,
                value,
                declaration: None,
            }),
        )
    }

    pub(crate) fn symbol(&self, id: SymbolId) -> Option<&Symbol> {
        self.symbols.get(usize::try_from(id.index()).ok()?)
    }

    pub(crate) fn symbol_mut(&mut self, id: SymbolId) -> Option<&mut Symbol> {
        self.symbols.get_mut(usize::try_from(id.index()).ok()?)
    }

    pub(crate) fn symbol_type(&self, id: SymbolId) -> Type {
        symbol_type(&self.symbols, &self.types, id).unwrap_or(Type::ERROR)
    }

    pub(crate) fn function(&self, id: FunctionId) -> Option<&Function> {
        self.functions.get(usize::try_from(id.index()).ok()?)
    }

    pub(crate) fn lookup(&self, name: &str) -> Option<Lookup<'_>> {
        if self.library.is_some() {
            self.builtin_name(name);
        }
        self.scopes.lookup(name)
    }

    pub(crate) fn lookup_quiet(&self, name: &str) -> Option<Lookup<'_>> {
        self.scopes.lookup(name)
    }

    pub(crate) fn narrow_present(&self, name: &str) {
        if let Some(ref tables) = self.library {
            let own = self.options.stage;
            let stages = Stage::ALL
                .into_iter()
                .filter(|&stage| tables.same(own, stage, name) || !tables.declares(stage, name))
                .fold(0, |bits, stage| bits | stage.bit());
            self.probe.narrow(stages);
        }
    }

    pub(crate) fn builtin_variable_stages(&mut self, span: Span, name: &str, found: bool) -> bool {
        let Some(tables) = self.tables() else {
            return false;
        };
        let own = self.options.stage;
        let undeclared = || DiagnosticKind::UndeclaredIdentifier(String::from(name));
        if found {
            let described = tables.variable(own, name);
            let mut keep = ALL_STAGE_BITS;
            for stage in Stage::ALL {
                match tables.variable(stage, name) {
                    None => self.stage_error(stage, span, undeclared()),
                    Some(description) if Some(description) != described => keep &= !stage.bit(),
                    Some(_) => {}
                }
            }
            self.probe.narrow(keep);
            return false;
        }
        let having = Stage::ALL
            .into_iter()
            .filter(|&stage| tables.variable(stage, name).is_some())
            .fold(0, |bits, stage| bits | stage.bit());
        if having == 0 {
            return false;
        }
        for stage in Stage::ALL {
            if having & stage.bit() == 0 {
                self.stage_error(stage, span, undeclared());
            }
        }
        self.probe.narrow(!having);
        true
    }

    pub(crate) fn is_builtin_symbol(&self, id: SymbolId) -> bool {
        usize::try_from(id.index()).is_ok_and(|index| index < self.builtins.symbols().len())
    }

    pub(crate) fn extension_enabled(&self, name: &str) -> bool {
        self.extensions.is_on(name)
    }
}
