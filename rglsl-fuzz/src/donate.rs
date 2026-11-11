use std::collections::btree_map::Entry;
use std::collections::{BTreeMap, BTreeSet};

use rglsl_ast::ast::{
    BasicType, CaseLabel, Declaration, DeclarationKind, Expression, ExpressionKind,
    ExternalDeclaration, FullySpecifiedType, Initializer, JumpStatement, NodeId,
    SingleTypeQualifier, Spanned, Statement, StatementKind, StorageQualifier, TranslationUnit,
    TypeSpecifierNonArray,
};
use rglsl_sema::scope::{Origin, SymbolKind};
use rglsl_sema::{Analysis, Stage};

use crate::basic::{self, INT};
use crate::build::{unqualified, Builder};
use crate::constants::{
    DEAD_PREFIX, GLF_FUZZED, GLF_MAKE_IN_BOUNDS_INT, GLF_MAKE_IN_BOUNDS_UINT, INJECTION_SWITCH,
    LIVE_PREFIX,
};
use crate::context::Context;
use crate::error::Error;
use crate::fuzzer::{random_constant, Fuzzer, GenerationParams, Templates};
use crate::generate::analyze_shader;
use crate::identity::hidden_names;
use crate::injection::{apply_edits, choose, injection_points, Edit, InjectionPoint};
use crate::job::parse_unit;
use crate::macros::emit;
use crate::random::Random;
use crate::rename::{rename_all, NameKind};
use crate::rewrite::{rewrite_expressions, rewrite_statements, take_expression};
use crate::scope::{has_storage, Variable};
use crate::transformation::PassInput;

pub const DEAD_NAME: &str = "donate_dead_code";
pub const LIVE_NAME: &str = "donate_live_code";
pub const DONOR_REPLACEMENT_PREFIX: &str = "donor_replacement";
pub const LOOP_LIMITER: &str = "looplimiter";
const UNSIZED_ARRAY_SIZE: u32 = 10;
const MAX_TRIES: u32 = 10;

#[derive(Debug, Clone, PartialEq, Eq)]
pub struct Donor {
    pub name: String,
    pub extension: String,
    pub unit: TranslationUnit,
}

impl Donor {
    pub fn parse(name: &str, extension: &str, source: &str) -> Result<Self, Error> {
        Ok(Self {
            name: name.to_owned(),
            extension: extension.to_owned(),
            unit: parse_unit(extension, source)?,
        })
    }

    pub fn stage(&self) -> Stage {
        Stage::from_extension(&self.extension).unwrap_or(Stage::Fragment)
    }
}

struct Prepared {
    prefix: String,
    unit: TranslationUnit,
    analysis: Analysis,
    fragments: Vec<(usize, NodeId)>,
}

fn extension_of(stage: Stage) -> &'static str {
    match stage {
        Stage::Vertex => "vert",
        Stage::Compute => "comp",
        _ => "frag",
    }
}

fn next_donor_index(unit: &TranslationUnit) -> u32 {
    let mut next = 0;
    let mut consider = |name: &str| {
        for prefix in [LIVE_PREFIX, DEAD_PREFIX] {
            if let Some(rest) = name.strip_prefix(prefix) {
                let digits: String = rest.chars().take_while(char::is_ascii_digit).collect();
                if let Ok(index) = digits.parse::<u32>() {
                    next = next.max(index + 1);
                }
            }
        }
    };
    for external in &unit.external_declarations {
        for name in crate::strip::referenced_names(external) {
            consider(&name);
        }
    }
    next
}

pub fn apply(input: &PassInput<'_>, random: &mut Random, live: bool) -> Option<TranslationUnit> {
    let extension = extension_of(input.params.stage);
    let donors: Vec<&Donor> = input
        .donors
        .iter()
        .filter(|donor| donor.extension == extension)
        .collect();
    if donors.is_empty() {
        return None;
    }
    let probability = if live {
        input.probabilities.donate_live_code_at_statement
    } else {
        input.probabilities.donate_dead_code_at_statement
    };
    let points = choose(
        injection_points(input.unit, input.analysis),
        probability,
        random,
    );
    if points.is_empty() {
        return None;
    }
    let mut context = Context::new(input.unit, input.analysis, input.params);
    let mut next_index = next_donor_index(input.unit);
    let mut prepared: BTreeMap<usize, Prepared> = BTreeMap::new();
    let mut used: BTreeSet<usize> = BTreeSet::new();
    let mut failed: BTreeSet<usize> = BTreeSet::new();
    let mut edits = Vec::new();
    for point in &points {
        for _ in 0..MAX_TRIES {
            let new_donors_allowed = u32::try_from(prepared.len())
                .is_ok_and(|count| count < input.params.max_donors_per_pass);
            let donor_index = if new_donors_allowed {
                random.next_index(donors.len())
            } else {
                let keys: Vec<usize> = prepared.keys().copied().collect();
                let Some(index) = keys.get(random.next_index(keys.len())).copied() else {
                    break;
                };
                index
            };
            if failed.contains(&donor_index) {
                continue;
            }
            if let Entry::Vacant(slot) = prepared.entry(donor_index) {
                let Some(donor) = donors.get(donor_index) else {
                    continue;
                };
                let prefix = format!(
                    "{}{next_index}",
                    if live { LIVE_PREFIX } else { DEAD_PREFIX }
                );
                next_index += 1;
                match prepare(donor, &prefix, live, input.params, random) {
                    Ok(ready) => {
                        slot.insert(ready);
                    }
                    Err(_) => {
                        failed.insert(donor_index);
                        continue;
                    }
                }
            }
            let Some(donor) = prepared.get(&donor_index) else {
                continue;
            };
            if donor.fragments.is_empty() {
                continue;
            }
            let Some((function, fragment_id)) = donor
                .fragments
                .get(random.next_index(donor.fragments.len()))
                .copied()
            else {
                continue;
            };
            let statement = if live {
                live_statement(&mut context, random, donor, function, fragment_id)
            } else {
                dead_statement(
                    &mut context,
                    random,
                    input,
                    point,
                    donor,
                    function,
                    fragment_id,
                )
            };
            if let Some(statement) = statement {
                used.insert(donor_index);
                edits.push((point.location, Edit::Inject(statement)));
                break;
            }
        }
    }
    if edits.is_empty() {
        return None;
    }
    let mut result = input.unit.clone();
    apply_edits(&mut result, edits, &mut context.builder);
    let mut donated = Vec::new();
    for index in &used {
        if let Some(donor) = prepared.get(index) {
            donated.extend(
                donor
                    .unit
                    .external_declarations
                    .iter()
                    .filter(|external| !matches!(external, ExternalDeclaration::Directive(_)))
                    .cloned(),
            );
        }
    }
    let position = donation_position(&result);
    let tail = result.external_declarations.split_off(position);
    result.external_declarations.extend(donated);
    result.external_declarations.extend(tail);
    Some(result)
}

fn donation_position(unit: &TranslationUnit) -> usize {
    unit.external_declarations
        .iter()
        .position(|external| match external {
            ExternalDeclaration::Directive(_) => false,
            ExternalDeclaration::Declaration(declaration) => match &declaration.kind {
                DeclarationKind::Precision { .. } => false,
                DeclarationKind::InitDeclaratorList(list) => !list
                    .declarators
                    .iter()
                    .any(|declarator| declarator.name.node == INJECTION_SWITCH),
                DeclarationKind::Block { structure, .. } => {
                    !structure.members.iter().any(|member| {
                        member
                            .declarators
                            .iter()
                            .any(|declarator| declarator.name.node == INJECTION_SWITCH)
                    })
                }
                _ => true,
            },
            _ => true,
        })
        .unwrap_or(unit.external_declarations.len())
}

struct Names {
    variables: BTreeSet<String>,
    functions: BTreeSet<String>,
    types: BTreeSet<String>,
}

fn collect_names(unit: &TranslationUnit, analysis: &Analysis) -> Names {
    let mut names = Names {
        variables: BTreeSet::new(),
        functions: BTreeSet::new(),
        types: BTreeSet::new(),
    };
    for symbol in &analysis.symbols {
        match &symbol.kind {
            SymbolKind::Variable(variable) if variable.origin != Origin::BuiltIn => {
                names.variables.insert(symbol.name.clone());
            }
            SymbolKind::BlockMember { .. } => {
                names.variables.insert(symbol.name.clone());
            }
            SymbolKind::Struct(_) => {
                names.types.insert(symbol.name.clone());
            }
            _ => {}
        }
    }
    names.functions = crate::scope::function_names(unit);
    names
}

fn builtin_variables(
    unit: &TranslationUnit,
    analysis: &Analysis,
) -> Option<BTreeMap<String, BasicType>> {
    let mut result = BTreeMap::new();
    for expression in rglsl_ast::expressions(unit) {
        let ExpressionKind::Variable(name) = &expression.kind else {
            continue;
        };
        let Some(symbol) = analysis
            .references
            .get(&expression.id)
            .and_then(|id| analysis.symbol(*id))
        else {
            continue;
        };
        if let SymbolKind::Variable(variable) = &symbol.kind {
            if variable.origin == Origin::BuiltIn {
                let ty = basic::from_sema(&variable.ty)?;
                result.insert(name.clone(), ty);
            }
        }
    }
    Some(result)
}

fn usable(unit: &TranslationUnit) -> bool {
    unit.external_declarations
        .iter()
        .all(|external| match external {
            ExternalDeclaration::Declaration(declaration) => match &declaration.kind {
                DeclarationKind::Block { instance, .. } => instance.is_none(),
                DeclarationKind::InitDeclaratorList(list) => {
                    let opaque = matches!(
                        list.ty.specifier.non_array,
                        TypeSpecifierNonArray::Opaque(_)
                    );
                    !(opaque && list.declarators.iter().any(|d| d.array.is_some()))
                        && list.ty.specifier.array.is_none()
                }
                _ => true,
            },
            ExternalDeclaration::Directive(directive) => !matches!(
                directive.kind,
                rglsl_ast::ast::DirectiveKind::Extension { .. }
            ),
            _ => true,
        })
}

fn prepare(
    donor: &Donor,
    prefix: &str,
    live: bool,
    params: GenerationParams,
    random: &mut Random,
) -> Result<Prepared, String> {
    if !usable(&donor.unit) {
        return Err(String::from("unsupported declarations"));
    }
    let stage = donor.stage();
    let analysis = analyze_shader(&donor.unit, stage, true, None);
    if let Some(diagnostic) = analysis.diagnostics.first() {
        return Err(format!("{diagnostic:?}"));
    }
    let names = collect_names(&donor.unit, &analysis);
    let builtins = builtin_variables(&donor.unit, &analysis)
        .ok_or_else(|| String::from("a built-in variable of a non-basic type"))?;
    let mut unit = in_bounds(&donor.unit, &analysis);
    let mut builder = Builder::new(unit.next_id());
    flatten_interface(&mut unit, &mut builder);
    for (name, ty) in &builtins {
        let declaration = builder.declaration_with(
            unqualified(basic::specifier(*ty)),
            vec![(name.clone(), None, None)],
        );
        let position = unit
            .external_declarations
            .iter()
            .position(|external| !matches!(external, ExternalDeclaration::Directive(_)))
            .unwrap_or(unit.external_declarations.len());
        unit.external_declarations
            .insert(position, ExternalDeclaration::Declaration(declaration));
    }
    let hidden = hidden_names(&donor.unit, &analysis);
    let templates = Templates::new(&analysis.builtins, &hidden);
    initialize_variables(&mut unit, &templates, params, random, &mut builder);
    let renamer = |kind: NameKind, name: &str| -> Option<String> {
        let rename = match kind {
            NameKind::Variable => names.variables.contains(name) || builtins.contains_key(name),
            NameKind::Function => names.functions.contains(name),
            NameKind::Type => names.types.contains(name),
        };
        rename.then(|| format!("{prefix}{name}"))
    };
    rename_all(&mut unit, &renamer);
    if live {
        let limit = 3 + random.next_int(5);
        truncate_loops(&mut unit, prefix, limit, &mut builder);
        remove_statements(&mut unit, &mut builder, &|statement| {
            matches!(statement.kind, StatementKind::Jump(JumpStatement::Discard))
        });
    }
    let unit = TranslationUnit::new(unit.external_declarations, builder.next_id());
    let text = emit(&unit);
    let unit = parse_unit("donor", &text).map_err(|error| format!("{error}\n{text}"))?;
    let analysis = analyze_shader(&unit, stage, true, None);
    if let Some(diagnostic) = analysis
        .diagnostics
        .iter()
        .find(|diagnostic| diagnostic.kind != rglsl_sema::DiagnosticKind::MissingEntryPoint)
    {
        return Err(format!("{diagnostic:?}\n{text}"));
    }
    let fragments = fragments(&unit);
    Ok(Prepared {
        prefix: prefix.to_owned(),
        unit,
        analysis,
        fragments,
    })
}

pub fn in_bounds(unit: &TranslationUnit, analysis: &Analysis) -> TranslationUnit {
    let mut result = unit.clone();
    let mut builder = Builder::new(unit.next_id());
    rewrite_expressions(&mut result, &mut |expression| {
        let ExpressionKind::Subscript { base, index } = &mut expression.kind else {
            return;
        };
        let Some(length) = analysis.type_of(base.id).and_then(rglsl_sema::Type::length) else {
            return;
        };
        if matches!(
            crate::macros::macro_name(index),
            Some(GLF_MAKE_IN_BOUNDS_INT | GLF_MAKE_IN_BOUNDS_UINT)
        ) {
            return;
        }
        if let ExpressionKind::Number(literal) = &index.kind {
            if literal
                .digits()
                .parse::<u32>()
                .is_ok_and(|value| value < length)
            {
                return;
            }
        }
        let unsigned = analysis
            .type_of(index.id)
            .is_some_and(|ty| *ty == rglsl_sema::Type::UINT);
        let size = if unsigned {
            builder.uint(u64::from(length))
        } else {
            builder.int(i64::from(length))
        };
        let original = take_expression(index);
        let name = if unsigned {
            GLF_MAKE_IN_BOUNDS_UINT
        } else {
            GLF_MAKE_IN_BOUNDS_INT
        };
        **index = builder.call(name, vec![original, size]);
    });
    TranslationUnit::new(result.external_declarations, builder.next_id())
}

fn strip_interface_qualifiers(ty: &mut Spanned<FullySpecifiedType>) -> bool {
    let Some(qualifier) = &mut ty.qualifier else {
        return false;
    };
    let uniform = qualifier
        .qualifiers
        .iter()
        .any(|single| single.node == SingleTypeQualifier::Storage(StorageQualifier::Uniform));
    qualifier.qualifiers.retain(|single| match &single.node {
        SingleTypeQualifier::Storage(storage) => {
            matches!(storage, StorageQualifier::Const | StorageQualifier::Uniform)
        }
        SingleTypeQualifier::Layout(_)
        | SingleTypeQualifier::Interpolation(_)
        | SingleTypeQualifier::Invariant
        | SingleTypeQualifier::Precise
        | SingleTypeQualifier::Precision(_) => false,
        _ => false,
    });
    if qualifier.qualifiers.is_empty() {
        ty.qualifier = None;
    }
    uniform
}

fn flatten_interface(unit: &mut TranslationUnit, builder: &mut Builder) {
    let mut result = Vec::new();
    for external in core::mem::take(&mut unit.external_declarations) {
        let ExternalDeclaration::Declaration(mut declaration) = external else {
            result.push(external);
            continue;
        };
        match &mut declaration.kind {
            DeclarationKind::InitDeclaratorList(list) => {
                let uniform = strip_interface_qualifiers(&mut list.ty);
                let basic_or_opaque = matches!(
                    list.ty.specifier.non_array,
                    TypeSpecifierNonArray::Basic(_) | TypeSpecifierNonArray::Opaque(_)
                );
                if uniform && !basic_or_opaque {
                    if let Some(qualifier) = &mut list.ty.qualifier {
                        qualifier.qualifiers.retain(|single| {
                            single.node != SingleTypeQualifier::Storage(StorageQualifier::Uniform)
                        });
                        if qualifier.qualifiers.is_empty() {
                            list.ty.qualifier = None;
                        }
                    }
                }
                let opaque = matches!(
                    list.ty.specifier.non_array,
                    TypeSpecifierNonArray::Opaque(_)
                );
                if opaque && !uniform {
                    continue;
                }
                result.push(ExternalDeclaration::Declaration(declaration));
            }
            DeclarationKind::Block { structure, .. } => {
                for member in &structure.members {
                    let mut ty = member.ty.clone();
                    ty.node.qualifier = None;
                    for declarator in &member.declarators {
                        let size = declarator.array.as_ref().map(|array| {
                            array
                                .dimensions
                                .first()
                                .and_then(|dimension| match &dimension.node {
                                    rglsl_ast::ast::ArrayDimension::Sized(size) => match &size.kind
                                    {
                                        ExpressionKind::Number(literal) => {
                                            literal.digits().parse().ok()
                                        }
                                        _ => None,
                                    },
                                    rglsl_ast::ast::ArrayDimension::Unsized => None,
                                })
                                .unwrap_or(UNSIZED_ARRAY_SIZE)
                        });
                        let declaration = builder.declaration_with(
                            ty.node.clone(),
                            vec![(declarator.name.node.clone(), size, None)],
                        );
                        result.push(ExternalDeclaration::Declaration(declaration));
                    }
                }
            }
            DeclarationKind::FunctionPrototype(_) => {
                result.push(ExternalDeclaration::Declaration(declaration));
            }
            DeclarationKind::Precision { .. }
            | DeclarationKind::Qualifier(_)
            | DeclarationKind::QualifiedIdentifiers { .. }
            | DeclarationKind::SpirvInstruction { .. }
            | DeclarationKind::SpirvExecutionMode(_) => {}
        }
    }
    unit.external_declarations = result;
}

fn fuzz_initializer(
    templates: &Templates,
    params: GenerationParams,
    random: &mut Random,
    builder: &mut Builder,
    ty: BasicType,
    constant: bool,
) -> Expression {
    let fuzzer = Fuzzer::new(templates, &[], params);
    let value = fuzzer
        .fuzz_expression(random, builder, ty, constant, 0)
        .unwrap_or_else(|| random_constant(random, builder, ty));
    builder.call(GLF_FUZZED, vec![value])
}

fn array_size(declarator: &rglsl_ast::ast::InitDeclarator) -> Option<Option<u32>> {
    let Some(array) = &declarator.array else {
        return Some(None);
    };
    let [dimension] = array.dimensions.as_slice() else {
        return None;
    };
    let rglsl_ast::ast::ArrayDimension::Sized(size) = &dimension.node else {
        return None;
    };
    let ExpressionKind::Number(literal) = &size.kind else {
        return None;
    };
    literal.digits().parse::<u32>().ok().map(Some)
}

fn initialize_declaration(
    declaration: &mut Declaration,
    global: bool,
    templates: &Templates,
    params: GenerationParams,
    random: &mut Random,
    builder: &mut Builder,
) {
    let DeclarationKind::InitDeclaratorList(list) = &mut declaration.kind else {
        return;
    };
    let qualifier = list.ty.qualifier.as_ref();
    if has_storage(qualifier, StorageQualifier::Uniform)
        || has_storage(qualifier, StorageQualifier::Shared)
    {
        return;
    }
    let constant = global || has_storage(qualifier, StorageQualifier::Const);
    let Some(ty) = basic::from_specifier(&list.ty.specifier) else {
        return;
    };
    for declarator in &mut list.declarators {
        if declarator.initializer.is_some() {
            continue;
        }
        let value = match array_size(declarator) {
            Some(None) => fuzz_initializer(templates, params, random, builder, ty, constant),
            Some(Some(size)) if size <= 64 => {
                let elements = (0..size)
                    .map(|_| fuzz_initializer(templates, params, random, builder, ty, constant))
                    .collect();
                let mut specifier = basic::specifier(ty);
                let length = builder.int(i64::from(size));
                specifier.array = Some(Spanned::new(
                    rglsl_ast::Span::new(0, 0),
                    rglsl_ast::ast::ArraySpecifier {
                        dimensions: vec![Spanned::new(
                            rglsl_ast::Span::new(0, 0),
                            rglsl_ast::ast::ArrayDimension::Sized(length),
                        )],
                    },
                ));
                builder.construct_specifier(specifier, elements)
            }
            _ => continue,
        };
        declarator.initializer = Some(Spanned::new(
            rglsl_ast::Span::new(0, 0),
            Initializer::Expression(value),
        ));
    }
}

fn initialize_variables(
    unit: &mut TranslationUnit,
    templates: &Templates,
    params: GenerationParams,
    random: &mut Random,
    builder: &mut Builder,
) {
    for external in &mut unit.external_declarations {
        if let ExternalDeclaration::Declaration(declaration) = external {
            initialize_declaration(declaration, true, templates, params, random, builder);
        }
    }
    rewrite_statements(unit, &mut |statement| {
        if let StatementKind::Declaration(declaration) = &mut statement.kind {
            initialize_declaration(declaration, false, templates, params, random, builder);
        }
    });
}

fn truncate_loops(unit: &mut TranslationUnit, prefix: &str, limit: u32, builder: &mut Builder) {
    let mut counter = 0;
    rewrite_statements(unit, &mut |statement| {
        let body = match &mut statement.kind {
            StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => &mut **body,
            StatementKind::For(for_statement) => &mut for_statement.body,
            _ => return,
        };
        let name = format!("{prefix}{LOOP_LIMITER}{counter}");
        counter += 1;
        let variable = builder.variable(&name);
        let bound = builder.int(i64::from(limit));
        let test = builder.binary(
            rglsl_ast::ast::BinaryOperator::GreaterEqual,
            variable,
            bound,
        );
        let exit = builder.jump(JumpStatement::Break);
        let exit = builder.block(vec![exit]);
        let check = builder.if_statement(test, exit, None);
        let variable = builder.variable(&name);
        let increment = builder.postfix(variable, rglsl_ast::ast::PostfixOperator::Increment);
        let increment = builder.expression_statement(increment);
        let placeholder = builder.null_statement();
        let original = core::mem::replace(body, placeholder);
        *body = builder.block(vec![check, increment, original]);
        let zero = builder.int(0);
        let declaration = builder.declare(basic::specifier(INT), &name, Some(zero));
        let placeholder = builder.null_statement();
        let looped = core::mem::replace(statement, placeholder);
        *statement = builder.block(vec![declaration, looped]);
    });
}

fn remove_statements(
    unit: &mut TranslationUnit,
    builder: &mut Builder,
    predicate: &dyn Fn(&Statement) -> bool,
) {
    rewrite_statements(unit, &mut |statement| {
        if predicate(statement) {
            *statement = builder.null_statement();
        }
    });
}

fn fragments(unit: &TranslationUnit) -> Vec<(usize, NodeId)> {
    let mut result = Vec::new();
    for (index, external) in unit.external_declarations.iter().enumerate() {
        let ExternalDeclaration::FunctionDefinition(definition) = external else {
            continue;
        };
        let mut local_struct = false;
        let mut found = Vec::new();
        for statement in &definition.body.statements {
            collect_fragments(statement, &mut found, &mut local_struct);
        }
        if !local_struct {
            result.extend(found.into_iter().map(|id| (index, id)));
        }
    }
    result
}

fn collect_fragments(statement: &Statement, found: &mut Vec<NodeId>, local_struct: &mut bool) {
    match &statement.kind {
        StatementKind::Compound(compound) => {
            found.push(statement.id);
            for inner in &compound.statements {
                collect_fragments(inner, found, local_struct);
            }
        }
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            found.push(statement.id);
            collect_fragments(then_branch, found, local_struct);
            if let Some(else_branch) = else_branch {
                collect_fragments(else_branch, found, local_struct);
            }
        }
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
            found.push(statement.id);
            collect_fragments(body, found, local_struct);
        }
        StatementKind::For(for_statement) => {
            found.push(statement.id);
            collect_fragments(&for_statement.body, found, local_struct);
        }
        StatementKind::Switch { statements, .. } => {
            for inner in statements {
                collect_fragments(inner, found, local_struct);
            }
        }
        StatementKind::Declaration(declaration) => {
            if let DeclarationKind::InitDeclaratorList(list) = &declaration.kind {
                if matches!(
                    list.ty.specifier.non_array,
                    TypeSpecifierNonArray::Struct(_)
                ) {
                    *local_struct = true;
                }
            }
        }
        StatementKind::Attributed { statement, .. } => {
            collect_fragments(statement, found, local_struct);
        }
        StatementKind::Expression(_) | StatementKind::CaseLabel(_) | StatementKind::Jump(_) => {}
    }
}

fn find_statement(
    unit: &TranslationUnit,
    function: usize,
    id: NodeId,
) -> Option<(
    &Statement,
    &rglsl_ast::ast::Node<rglsl_ast::ast::FunctionDefinition>,
)> {
    let ExternalDeclaration::FunctionDefinition(definition) =
        unit.external_declarations.get(function)?
    else {
        return None;
    };
    fn search(statement: &Statement, id: NodeId) -> Option<&Statement> {
        if statement.id == id {
            return Some(statement);
        }
        match &statement.kind {
            StatementKind::Compound(compound) => {
                compound.statements.iter().find_map(|s| search(s, id))
            }
            StatementKind::Selection {
                then_branch,
                else_branch,
                ..
            } => search(then_branch, id)
                .or_else(|| else_branch.as_deref().and_then(|s| search(s, id))),
            StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
                search(body, id)
            }
            StatementKind::For(for_statement) => {
                search(&for_statement.init, id).or_else(|| search(&for_statement.body, id))
            }
            StatementKind::Switch { statements, .. } => {
                statements.iter().find_map(|s| search(s, id))
            }
            StatementKind::Attributed { statement, .. } => search(statement, id),
            _ => None,
        }
    }
    definition
        .body
        .statements
        .iter()
        .find_map(|statement| search(statement, id))
        .map(|statement| (statement, definition))
}

#[derive(Debug, Clone)]
struct FreeVariable {
    name: String,
    ty: BasicType,
}

fn declared_inside(statement: &Statement) -> BTreeSet<NodeId> {
    let mut ids = BTreeSet::new();
    fn walk(statement: &Statement, ids: &mut BTreeSet<NodeId>) {
        match &statement.kind {
            StatementKind::Declaration(declaration) => {
                if let DeclarationKind::InitDeclaratorList(list) = &declaration.kind {
                    ids.extend(list.declarators.iter().map(|declarator| declarator.id));
                }
            }
            StatementKind::Compound(compound) => {
                for inner in &compound.statements {
                    walk(inner, ids);
                }
            }
            StatementKind::Selection {
                then_branch,
                else_branch,
                ..
            } => {
                walk(then_branch, ids);
                if let Some(else_branch) = else_branch {
                    walk(else_branch, ids);
                }
            }
            StatementKind::Switch { statements, .. } => {
                for inner in statements {
                    walk(inner, ids);
                }
            }
            StatementKind::While { condition, body } => {
                if let rglsl_ast::ast::Condition::Declaration(declaration) = condition {
                    ids.insert(declaration.id);
                }
                walk(body, ids);
            }
            StatementKind::DoWhile { body, .. } => walk(body, ids),
            StatementKind::For(for_statement) => {
                walk(&for_statement.init, ids);
                if let Some(rglsl_ast::ast::Condition::Declaration(declaration)) =
                    &for_statement.condition
                {
                    ids.insert(declaration.id);
                }
                walk(&for_statement.body, ids);
            }
            StatementKind::Attributed { statement, .. } => walk(statement, ids),
            StatementKind::Expression(_) | StatementKind::CaseLabel(_) | StatementKind::Jump(_) => {
            }
        }
    }
    walk(statement, &mut ids);
    ids
}

fn statement_expressions(statement: &Statement) -> Vec<Expression> {
    let mut collected = Vec::new();
    let mut probe = statement.clone();
    crate::rewrite::rewrite_statement_expressions(&mut probe, &mut |expression| {
        collected.push(expression.clone());
    });
    collected
}

fn free_variables(fragment: &Statement, analysis: &Analysis) -> Option<Vec<FreeVariable>> {
    let inside = declared_inside(fragment);
    let mut result: BTreeMap<String, BasicType> = BTreeMap::new();
    for expression in statement_expressions(fragment) {
        if !matches!(expression.kind, ExpressionKind::Variable(_)) {
            continue;
        }
        let Some(symbol) = analysis
            .references
            .get(&expression.id)
            .and_then(|id| analysis.symbol(*id))
        else {
            continue;
        };
        let SymbolKind::Variable(variable) = &symbol.kind else {
            continue;
        };
        if !matches!(variable.origin, Origin::Local | Origin::Parameter) {
            continue;
        }
        if variable.declaration.is_some_and(|id| inside.contains(&id)) {
            continue;
        }
        let ty = basic::from_sema(&variable.ty)?;
        result.insert(symbol.name.clone(), ty);
    }
    Some(
        result
            .into_iter()
            .map(|(name, ty)| FreeVariable { name, ty })
            .collect(),
    )
}

fn rename_in_statement(statement: &mut Statement, renames: &BTreeMap<String, String>) {
    crate::rewrite::rewrite_statement_expressions(statement, &mut |expression| {
        if let ExpressionKind::Variable(name) = &mut expression.kind {
            if let Some(new) = renames.get(name) {
                name.clone_from(new);
            }
        }
    });
}

#[derive(Debug, Clone, Copy)]
struct Removal {
    case_labels: bool,
    breaks: bool,
    continues: bool,
    discards: bool,
    returns: bool,
}

fn remove_jumps(
    statement: &mut Statement,
    removal: Removal,
    builder: &mut Builder,
    in_loop: bool,
    in_switch: bool,
) {
    let remove = match &statement.kind {
        StatementKind::CaseLabel(CaseLabel::Case(_) | CaseLabel::Default) => {
            removal.case_labels && !in_switch
        }
        StatementKind::Jump(JumpStatement::Break) => removal.breaks && !in_loop && !in_switch,
        StatementKind::Jump(JumpStatement::Continue) => removal.continues && !in_loop,
        StatementKind::Jump(JumpStatement::Discard) => removal.discards,
        StatementKind::Jump(JumpStatement::Return(_)) => removal.returns,
        _ => false,
    };
    if remove {
        *statement = builder.null_statement();
        return;
    }
    match &mut statement.kind {
        StatementKind::Compound(compound) => {
            for inner in &mut compound.statements {
                remove_jumps(inner, removal, builder, in_loop, in_switch);
            }
        }
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            remove_jumps(then_branch, removal, builder, in_loop, in_switch);
            if let Some(else_branch) = else_branch {
                remove_jumps(else_branch, removal, builder, in_loop, in_switch);
            }
        }
        StatementKind::Switch { statements, .. } => {
            for inner in statements {
                remove_jumps(inner, removal, builder, in_loop, true);
            }
        }
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
            remove_jumps(body, removal, builder, true, in_switch);
        }
        StatementKind::For(for_statement) => {
            remove_jumps(&mut for_statement.body, removal, builder, true, in_switch);
        }
        StatementKind::Attributed { statement, .. } => {
            remove_jumps(statement, removal, builder, in_loop, in_switch);
        }
        StatementKind::Declaration(_)
        | StatementKind::Expression(_)
        | StatementKind::CaseLabel(_)
        | StatementKind::Jump(_) => {}
    }
}

fn dead_statement(
    context: &mut Context<'_>,
    random: &mut Random,
    input: &PassInput<'_>,
    point: &InjectionPoint<'_>,
    donor: &Prepared,
    function: usize,
    fragment_id: NodeId,
) -> Option<Statement> {
    let (fragment, definition) = find_statement(&donor.unit, function, fragment_id)?;
    let free = free_variables(fragment, &donor.analysis)?;
    let mut fragment = fragment.clone();
    let mut renames = BTreeMap::new();
    let mut statements = Vec::new();
    for variable in &free {
        let candidates: Vec<&Variable> = point
            .scope
            .iter()
            .filter(|candidate| {
                candidate.ty == Some(variable.ty)
                    && candidate.assignable
                    && !candidate.name.starts_with(&donor.prefix)
            })
            .collect();
        let substitute = !candidates.is_empty()
            && random.next_int(100) < input.probabilities.substitute_free_variable;
        if substitute {
            if let Some(candidate) = candidates.get(random.next_index(candidates.len())) {
                renames.insert(variable.name.clone(), candidate.name.clone());
                continue;
            }
        }
        let replacement = format!("{DONOR_REPLACEMENT_PREFIX}{}", variable.name);
        let value = context
            .opaque(random, &point.scope)
            .fuzzed(variable.ty, false, 0);
        statements.push(context.builder.declare(
            basic::specifier(variable.ty),
            &replacement,
            Some(value),
        ));
        renames.insert(variable.name.clone(), replacement);
    }
    rename_in_statement(&mut fragment, &renames);
    let same_return = definition.prototype.return_type.specifier.node
        == point.function.prototype.return_type.specifier.node;
    let removal = Removal {
        case_labels: true,
        breaks: !(point.in_loop || point.in_switch),
        continues: !point.in_loop,
        discards: !input.params.fragment,
        returns: !same_return,
    };
    remove_jumps(&mut fragment, removal, &mut context.builder, false, false);
    statements.push(fragment);
    let body = context.builder.block(statements);
    let condition = context.opaque(random, &point.scope).make_dead_condition();
    Some(context.builder.if_statement(condition, body, None))
}

fn live_statement(
    context: &mut Context<'_>,
    random: &mut Random,
    donor: &Prepared,
    function: usize,
    fragment_id: NodeId,
) -> Option<Statement> {
    let (fragment, _) = find_statement(&donor.unit, function, fragment_id)?;
    let free = free_variables(fragment, &donor.analysis)?;
    let mut fragment = fragment.clone();
    let mut statements = Vec::new();
    for variable in &free {
        let value = if variable.ty == INT && variable.name.contains(LOOP_LIMITER) {
            context.builder.int(0)
        } else {
            context.opaque(random, &[]).fuzzed(variable.ty, true, 0)
        };
        statements.push(context.builder.declare(
            basic::specifier(variable.ty),
            &variable.name,
            Some(value),
        ));
    }
    let removal = Removal {
        case_labels: true,
        breaks: true,
        continues: true,
        discards: true,
        returns: true,
    };
    remove_jumps(&mut fragment, removal, &mut context.builder, false, false);
    statements.push(fragment);
    Some(context.builder.block(statements))
}
