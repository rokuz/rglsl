use alloc::{collections::BTreeSet, format, string::String, vec::Vec};

use rglsl_ast::ast::{DeclarationKind, ExternalDeclaration, FunctionDefinition, Node};
use rglsl_sema::scope::{Origin, Storage};
use rglsl_sema::{BuiltinFunctionId, Builtins, Callee, ResourceLimits, Stage};

use super::{semantic, Lowerer};

struct Common {
    variables: BTreeSet<String>,
    stage_specific: BTreeSet<BuiltinFunctionId>,
}

fn common(carrier: &Builtins) -> Common {
    let limits = ResourceLimits::default();
    let others: Vec<Builtins> = Stage::ALL
        .iter()
        .filter(|&&stage| stage != carrier.stage())
        .map(|&stage| Builtins::new(carrier.version(), stage, &limits))
        .collect();
    let variables = carrier
        .variables()
        .filter(|&(name, _)| {
            others
                .iter()
                .all(|other| other.variables().any(|(candidate, _)| candidate == name))
        })
        .map(|(name, _)| String::from(name))
        .collect();
    let mut stage_specific = BTreeSet::new();
    for name in carrier.function_names() {
        for &id in carrier.overloads(name) {
            let Some(function) = carrier.function(id) else {
                continue;
            };
            let types: Vec<rglsl_sema::Type> = function
                .parameters
                .iter()
                .map(|parameter| parameter.ty.clone())
                .collect();
            let everywhere = others.iter().all(|other| {
                other.overloads(name).iter().any(|&candidate| {
                    other
                        .function(candidate)
                        .is_some_and(|candidate| candidate.same_parameter_types(&types))
                })
            });
            if !everywhere {
                stage_specific.insert(id);
            }
        }
    }
    Common {
        variables,
        stage_specific,
    }
}

const fn stage_storage(storage: Storage) -> bool {
    matches!(
        storage,
        Storage::In
            | Storage::Out
            | Storage::Inout
            | Storage::Shared
            | Storage::TaskPayloadShared
            | Storage::RayPayload
            | Storage::RayPayloadIn
            | Storage::HitAttribute
            | Storage::CallableData
            | Storage::CallableDataIn
    )
}

impl<'a> Lowerer<'a> {
    pub(super) fn check_library(&mut self, definitions: &[&'a Node<FunctionDefinition>]) {
        let analysis = self.analysis;
        if let Some(main) = definitions
            .iter()
            .find(|definition| definition.prototype.name.node == "main")
        {
            self.errors.push(semantic(
                "a library (a module compiled without a shader stage) cannot define `main`",
                self.at(main.span),
            ));
        }
        let common = common(&analysis.builtins);
        let mut reported: BTreeSet<String> = BTreeSet::new();
        for expression in rglsl_ast::expressions(self.unit) {
            let at = self.at(expression.span);
            if let Some(&symbol) = analysis.references.get(&expression.id) {
                let builtin = self
                    .variable(symbol)
                    .is_some_and(|variable| variable.origin == Origin::BuiltIn);
                let name = self.symbol(symbol).map(|record| record.name.clone());
                if let (true, Some(name)) = (builtin, name) {
                    if !common.variables.contains(&name) && reported.insert(name.clone()) {
                        self.errors.push(semantic(
                            format!(
                                "`{name}` belongs to a shader stage and cannot be used in a library"
                            ),
                            at,
                        ));
                    }
                }
            }
            if let Some(&Callee::Builtin(id)) = analysis.calls.get(&expression.id) {
                if common.stage_specific.contains(&id) {
                    let name = analysis
                        .builtins
                        .function(id)
                        .map_or_else(String::new, |function| function.name.clone());
                    if reported.insert(name.clone()) {
                        self.errors.push(semantic(
                            format!(
                                "`{name}` belongs to a shader stage and cannot be used in a library"
                            ),
                            at,
                        ));
                    }
                }
            }
        }
        for declaration in &self.unit.external_declarations {
            let ExternalDeclaration::Declaration(ref declaration) = *declaration else {
                continue;
            };
            let at = self.at(declaration.span);
            match declaration.kind {
                DeclarationKind::Qualifier(_) | DeclarationKind::QualifiedIdentifiers { .. } => {
                    if declares_stage_layout(declaration) {
                        self.errors.push(semantic(
                            "stage layout qualifiers cannot be used in a library",
                            at,
                        ));
                    }
                }
                DeclarationKind::InitDeclaratorList(ref list) => {
                    for declarator in &list.declarators {
                        let storage = analysis
                            .declarations
                            .get(&declarator.id)
                            .and_then(|&symbol| self.variable(symbol))
                            .filter(|variable| variable.origin != Origin::BuiltIn)
                            .map(|variable| variable.qualifiers.storage);
                        if storage.is_some_and(stage_storage) {
                            self.errors.push(semantic(
                                "stage inputs, outputs and `shared` variables cannot be declared in a library",
                                self.at(declarator.span),
                            ));
                        }
                    }
                }
                DeclarationKind::Block { .. } => {
                    let storage = analysis
                        .declarations
                        .get(&declaration.id)
                        .and_then(|&symbol| self.variable(symbol))
                        .map(|variable| variable.qualifiers.storage);
                    if storage.is_some_and(stage_storage) {
                        self.errors.push(semantic(
                            "stage interface blocks cannot be declared in a library",
                            at,
                        ));
                    }
                }
                DeclarationKind::FunctionPrototype(_) | DeclarationKind::Precision { .. } => {}
            }
        }
    }
}

fn declares_stage_layout(declaration: &rglsl_ast::ast::Declaration) -> bool {
    let qualifier = match declaration.kind {
        DeclarationKind::Qualifier(ref qualifier)
        | DeclarationKind::QualifiedIdentifiers { ref qualifier, .. } => qualifier,
        DeclarationKind::FunctionPrototype(_)
        | DeclarationKind::InitDeclaratorList(_)
        | DeclarationKind::Precision { .. }
        | DeclarationKind::Block { .. } => return false,
    };
    qualifier.qualifiers.iter().any(|single| {
        matches!(
            single.node,
            rglsl_ast::ast::SingleTypeQualifier::Storage(
                rglsl_ast::ast::StorageQualifier::In | rglsl_ast::ast::StorageQualifier::Out
            )
        )
    })
}

pub(super) fn library_diagnostic(
    kind: &rglsl_sema::DiagnosticKind,
    version: Option<u32>,
) -> Option<String> {
    use rglsl_sema::DiagnosticKind;
    let stage_specific = |name: &str| {
        let limits = ResourceLimits::default();
        let version = match version {
            Some(460) => 460,
            _ => 450,
        };
        let declares = |stage: Stage| {
            let builtins = Builtins::new(version, stage, &limits);
            !builtins.overloads(name).is_empty()
                || builtins.variables().any(|(variable, _)| variable == name)
        };
        !declares(Stage::Compute)
            && Stage::ALL
                .iter()
                .any(|&stage| stage != Stage::Compute && declares(stage))
    };
    let message =
        |name: &str| format!("`{name}` belongs to a shader stage and cannot be used in a library");
    match *kind {
        DiagnosticKind::UndeclaredIdentifier(ref name)
        | DiagnosticKind::NoMatchingFunction(ref name)
            if stage_specific(name) =>
        {
            Some(message(name))
        }
        DiagnosticKind::ExtensionRequired {
            ref feature,
            ref extensions,
        } if extensions.contains("compute_shader_derivatives") => Some(message(feature)),
        DiagnosticKind::InvalidQualifier {
            qualifier: "in" | "out",
            reason,
        } if reason.contains("compute shader") => Some(String::from(
            "stage inputs, outputs and `shared` variables cannot be declared in a library",
        )),
        _ => None,
    }
}
