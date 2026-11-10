mod call;
mod declaration;
mod expression;
mod extension;
mod statement;

use alloc::collections::{BTreeMap, BTreeSet};
use alloc::format;
use alloc::string::String;
use alloc::sync::Arc;
use alloc::vec::Vec;

use rglsl_ast::ast::{DirectiveKind, ExternalDeclaration, NodeId};
use rglsl_ast::extensions::ExtensionState;
use rglsl_ast::{Span, TranslationUnit};

use crate::builtins::{BuiltinFunctionId, Builtins, ResourceLimits, Stage};
use crate::constant::Constant;
use crate::diagnostic::{Diagnostic, DiagnosticKind};
use crate::scope::{
    Function, FunctionId, Lookup, Origin, Qualifiers, Scopes, Storage, Symbol, SymbolId,
    SymbolKind, Variable,
};
use crate::types::{BlockStorage, Type, TypeKind, TypeRegistry};

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Options {
    pub stage: Stage,
    pub relaxed_uniforms: bool,
    pub limits: ResourceLimits,
    pub spirv_version: Option<(u8, u8)>,
}

impl Options {
    pub fn new(stage: Stage) -> Self {
        Self {
            stage,
            relaxed_uniforms: false,
            limits: ResourceLimits::default(),
            spirv_version: None,
        }
    }
}

#[derive(Debug, Clone, PartialEq, Eq)]
pub enum Callee {
    Function(FunctionId),
    Builtin(BuiltinFunctionId),
    Constructor(Type),
    Length,
}

#[derive(Debug, Clone, PartialEq)]
pub struct ExpressionInfo {
    pub ty: Type,
    pub is_lvalue: bool,
    pub is_constant: bool,
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
    pub diagnostics: Vec<Diagnostic>,
    pub warnings: Vec<Diagnostic>,
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
        SymbolKind::BlockName => None,
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

pub fn analyze(unit: &TranslationUnit, options: &Options) -> Analysis {
    run(unit, options, None)
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
    analyzer.finish()
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
    pub derivative_group: Option<DerivativeGroup>,
    pub khr_derivative_group: bool,
    pub local_size: [Option<u32>; 3],
    pub local_size_specialized: [bool; 3],
}

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) enum DerivativeGroup {
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
        let input_array_size = match options.stage {
            Stage::TessControl | Stage::TessEvaluation => {
                u32::try_from(options.limits.max_patch_vertices).ok()
            }
            _ => None,
        };
        Self {
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
            local_size_declared: false,
            specialization_uses: 0,
            block_names: BTreeMap::new(),
            input_array_size,
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
            .filter(|function| !function.defined)
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
        self.check_derivative_group(Span::new(end, end));
    }

    fn pragma(&mut self, span: Span, tokens: &[String]) {
        let words: Vec<&str> = tokens.iter().map(String::as_str).collect();
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
            Some(DerivativeGroup::Quads) => {
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
            Some(DerivativeGroup::Linear) => {
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

    fn finish(self) -> Analysis {
        Analysis {
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
            diagnostics: self.diagnostics,
            warnings: self.warnings,
        }
    }

    pub(crate) fn error(&mut self, span: Span, kind: DiagnosticKind) {
        self.diagnostics.push(Diagnostic { span, kind });
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
        self.scopes.lookup(name)
    }

    pub(crate) fn extension_enabled(&self, name: &str) -> bool {
        self.extensions.is_on(name)
    }

    pub(crate) fn scoped<T>(&mut self, body: impl FnOnce(&mut Self) -> T) -> T {
        self.scopes.push();
        let result = body(self);
        self.scopes.pop();
        result
    }
}
