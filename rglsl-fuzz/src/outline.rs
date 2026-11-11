use std::collections::{BTreeMap, BTreeSet};

use rglsl_ast::ast::{
    AssignmentOperator, BasicType, CompoundStatement, Expression, ExpressionKind,
    ExternalDeclaration, FunctionDefinition, FunctionIdentifier, FunctionPrototype, JumpStatement,
    Node, NodeId, ParameterDeclaration, Spanned, Statement, StatementKind, TranslationUnit,
    TypeSpecifierNonArray,
};
use rglsl_ast::Span;
use rglsl_sema::scope::{Origin, SymbolKind};
use rglsl_sema::Analysis;

use crate::basic;
use crate::build::{unqualified, Builder};
use crate::constants::OUTLINED_FUNCTION_PREFIX;
use crate::injection::choose;
use crate::opaque::side_effect_free;
use crate::random::Random;
use crate::rewrite::{function_statements, replace_statements, rewrite_statement_expressions};
use crate::transformation::PassInput;

pub const NAME: &str = "outline_statement";

pub fn next_id_with_prefix(unit: &TranslationUnit, prefix: &str) -> u32 {
    let mut next = 0;
    for external in &unit.external_declarations {
        for name in crate::strip::referenced_names(external) {
            if let Some(rest) = name.strip_prefix(prefix) {
                let digits: String = rest.chars().take_while(char::is_ascii_digit).collect();
                if let Ok(id) = digits.parse::<u32>() {
                    next = next.max(id + 1);
                }
            }
        }
    }
    next
}

struct Candidate<'a> {
    function: usize,
    statement: &'a Statement,
    target: &'a Expression,
    value: &'a Expression,
    ty: BasicType,
    parameters: Vec<(String, BasicType)>,
}

fn variable_type(analysis: &Analysis, expression: &Expression) -> Option<Option<BasicType>> {
    let symbol = analysis
        .references
        .get(&expression.id)
        .and_then(|id| analysis.symbol(*id))?;
    match &symbol.kind {
        SymbolKind::Variable(variable) if variable.origin == Origin::BuiltIn => Some(None),
        SymbolKind::Variable(_) | SymbolKind::BlockMember { .. } => {
            let id = analysis.references.get(&expression.id)?;
            let ty = analysis.symbol_type(*id)?;
            basic::from_sema(&ty).map(Some)
        }
        _ => None,
    }
}

fn parameters(analysis: &Analysis, value: &Expression) -> Option<Vec<(String, BasicType)>> {
    let mut result: Vec<(String, BasicType)> = Vec::new();
    let mut ok = true;
    let mut seen = BTreeSet::new();
    let mut visit = |expression: &mut Expression| match &expression.kind {
        ExpressionKind::Variable(name) => match variable_type(analysis, expression) {
            Some(Some(ty)) => {
                if seen.insert(name.clone()) {
                    result.push((name.clone(), ty));
                }
            }
            Some(None) => {}
            None => ok = false,
        },
        ExpressionKind::FunctionCall(call) => {
            if let FunctionIdentifier::Constructor(specifier) = &call.function.node {
                if !matches!(specifier.non_array, TypeSpecifierNonArray::Basic(_)) {
                    ok = false;
                }
            }
        }
        _ => {}
    };
    let mut holder = Node::new(
        NodeId::new(0),
        Span::new(0, 0),
        StatementKind::Expression(Some(value.clone())),
    );
    rewrite_statement_expressions(&mut holder, &mut visit);
    ok.then_some(result)
}

fn candidates<'a>(unit: &'a TranslationUnit, analysis: &Analysis) -> Vec<Candidate<'a>> {
    let mut result = Vec::new();
    for (function, statement) in function_statements(unit) {
        let StatementKind::Expression(Some(expression)) = &statement.kind else {
            continue;
        };
        let ExpressionKind::Assignment {
            operator: AssignmentOperator::Assign,
            target,
            value,
        } = &expression.kind
        else {
            continue;
        };
        if !matches!(target.kind, ExpressionKind::Variable(_)) {
            continue;
        }
        let Some(ty) = analysis.type_of(target.id).and_then(basic::from_sema) else {
            continue;
        };
        if !side_effect_free(value, &analysis.builtins) {
            continue;
        }
        let Some(parameters) = parameters(analysis, value) else {
            continue;
        };
        result.push(Candidate {
            function,
            statement,
            target,
            value,
            ty,
            parameters,
        });
    }
    result
}

pub fn apply(input: &PassInput<'_>, random: &mut Random) -> Option<TranslationUnit> {
    let chosen = choose(
        candidates(input.unit, input.analysis),
        input.probabilities.outline,
        random,
    );
    if chosen.is_empty() {
        return None;
    }
    let mut next_id = next_id_with_prefix(input.unit, OUTLINED_FUNCTION_PREFIX);
    let mut builder = Builder::new(input.unit.next_id());
    let mut replacements = BTreeMap::new();
    let mut functions: BTreeMap<usize, Vec<ExternalDeclaration>> = BTreeMap::new();
    for candidate in chosen {
        let name = format!("{OUTLINED_FUNCTION_PREFIX}{next_id}");
        next_id += 1;
        let arguments = candidate
            .parameters
            .iter()
            .map(|(parameter, _)| builder.variable(parameter))
            .collect();
        let call = builder.call(&name, arguments);
        let target = candidate.target.clone();
        let assignment = builder.assign(target, call);
        let mut statement = builder.expression_statement(assignment);
        statement.id = candidate.statement.id;
        replacements.insert(candidate.statement.id, statement);
        let parameters = candidate
            .parameters
            .iter()
            .map(|(parameter, ty)| {
                Node::new(
                    builder.id(),
                    Span::new(0, 0),
                    ParameterDeclaration {
                        ty: Spanned::new(Span::new(0, 0), unqualified(basic::specifier(*ty))),
                        name: Some(Spanned::new(Span::new(0, 0), parameter.clone())),
                        array: None,
                    },
                )
            })
            .collect();
        let value = builder.argument(candidate.value.clone());
        let body = builder.jump(JumpStatement::Return(Some(value)));
        let definition = FunctionDefinition {
            prototype: Spanned::new(
                Span::new(0, 0),
                FunctionPrototype {
                    return_type: Spanned::new(
                        Span::new(0, 0),
                        unqualified(basic::specifier(candidate.ty)),
                    ),
                    name: Spanned::new(Span::new(0, 0), name),
                    parameters,
                    attributes: Vec::new(),
                    trailing_attributes: Vec::new(),
                },
            ),
            body: Spanned::new(
                Span::new(0, 0),
                CompoundStatement {
                    statements: vec![body],
                },
            ),
        };
        functions.entry(candidate.function).or_default().push(
            ExternalDeclaration::FunctionDefinition(Node::new(
                builder.id(),
                Span::new(0, 0),
                definition,
            )),
        );
    }
    let mut result = input.unit.clone();
    replace_statements(&mut result, &mut replacements);
    let mut externals = Vec::new();
    for (index, external) in result.external_declarations.into_iter().enumerate() {
        if let Some(outlined) = functions.remove(&index) {
            externals.extend(outlined);
        }
        externals.push(external);
    }
    Some(TranslationUnit::new(externals, builder.next_id()))
}
