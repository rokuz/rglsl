use std::collections::{BTreeMap, BTreeSet};

use rglsl_ast::ast::{
    BasicType, DeclarationKind, Expression, ExpressionKind, ExternalDeclaration, Initializer,
    NodeId, StatementKind, TranslationUnit,
};
use rglsl_sema::Analysis;

use crate::basic;
use crate::build::{named_type, Builder};
use crate::constants::{
    GLF_STRUCT_REPLACEMENT, STRUCTIFICATION_FIELD_PREFIX, STRUCTIFICATION_STRUCT_PREFIX,
};
use crate::fuzzer::{literal_zero_or_one, GenerationParams};
use crate::injection::choose;
use crate::job::parse_unit;
use crate::outline::next_id_with_prefix;
use crate::random::Random;
use crate::rewrite::{
    function_statements, replace_statements, rewrite_expressions, take_expression,
};
use crate::transformation::PassInput;

pub const NAME: &str = "structification";

#[derive(Debug, Clone, PartialEq, Eq)]
enum FieldType {
    Basic(BasicType),
    Struct(usize),
}

#[derive(Debug, Clone)]
struct GeneratedStruct {
    name: String,
    fields: Vec<(String, FieldType)>,
}

struct Candidate {
    statement: NodeId,
    name: String,
    ty: BasicType,
    initializer: Option<Expression>,
    references: BTreeSet<NodeId>,
}

fn candidates(unit: &TranslationUnit, analysis: &Analysis) -> Vec<Candidate> {
    let mut by_symbol = BTreeMap::new();
    let mut result = Vec::new();
    for (_, statement) in function_statements(unit) {
        let StatementKind::Declaration(declaration) = &statement.kind else {
            continue;
        };
        let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
            continue;
        };
        let [declarator] = list.declarators.as_slice() else {
            continue;
        };
        if declarator.array.is_some() || list.ty.qualifier.is_some() {
            continue;
        }
        let Some(ty) = basic::from_specifier(&list.ty.specifier) else {
            continue;
        };
        if declarator
            .name
            .node
            .starts_with(STRUCTIFICATION_FIELD_PREFIX)
        {
            continue;
        }
        let initializer = match declarator.initializer.as_ref().map(|i| &i.node) {
            Some(Initializer::Expression(expression)) => Some(expression.clone()),
            Some(Initializer::List(_)) => continue,
            None => None,
        };
        let Some(symbol) = analysis.declarations.get(&declarator.id) else {
            continue;
        };
        by_symbol.insert(*symbol, result.len());
        result.push(Candidate {
            statement: statement.id,
            name: declarator.name.node.clone(),
            ty,
            initializer,
            references: BTreeSet::new(),
        });
    }
    for (expression, symbol) in &analysis.references {
        if let Some(index) = by_symbol.get(symbol) {
            if let Some(candidate) = result.get_mut(*index) {
                candidate.references.insert(*expression);
            }
        }
    }
    result
}

fn random_struct(
    structs: &mut Vec<GeneratedStruct>,
    next_id: &mut u32,
    params: &GenerationParams,
    random: &mut Random,
    depth: u32,
) -> usize {
    let index = structs.len();
    structs.push(GeneratedStruct {
        name: format!("{STRUCTIFICATION_STRUCT_PREFIX}{next_id}"),
        fields: Vec::new(),
    });
    *next_id += 1;
    let count = random.next_positive_int(params.max_struct_fields.max(2));
    let all = basic::all_basic_types();
    let mut fields = Vec::new();
    for field in 0..count {
        let ty = if depth < params.max_struct_nesting_depth && random.next_int(4) == 0 {
            FieldType::Struct(random_struct(structs, next_id, params, random, depth + 1))
        } else {
            FieldType::Basic(
                all.get(random.next_index(all.len()))
                    .copied()
                    .unwrap_or(basic::FLOAT),
            )
        };
        fields.push((format!("{STRUCTIFICATION_FIELD_PREFIX}{field}"), ty));
    }
    if let Some(generated) = structs.get_mut(index) {
        generated.fields = fields;
    }
    index
}

fn struct_text(generated: &GeneratedStruct, structs: &[GeneratedStruct]) -> String {
    let fields: Vec<String> = generated
        .fields
        .iter()
        .map(|(name, ty)| match ty {
            FieldType::Basic(ty) => format!("{ty} {name};"),
            FieldType::Struct(index) => format!(
                "{} {name};",
                structs.get(*index).map_or("float", |s| s.name.as_str())
            ),
        })
        .collect();
    format!("struct {} {{ {} }};", generated.name, fields.join(" "))
}

fn constructor(
    index: usize,
    structs: &[GeneratedStruct],
    original: &str,
    value: &mut Option<Expression>,
    builder: &mut Builder,
) -> Expression {
    let Some(generated) = structs.get(index) else {
        return builder.boolean(false);
    };
    let mut arguments = Vec::new();
    for (name, ty) in &generated.fields {
        let argument = match ty {
            FieldType::Basic(ty) => {
                if name == original {
                    value
                        .take()
                        .unwrap_or_else(|| literal_zero_or_one(builder, false, *ty))
                } else {
                    literal_zero_or_one(builder, false, *ty)
                }
            }
            FieldType::Struct(inner) => constructor(*inner, structs, original, value, builder),
        };
        arguments.push(argument);
    }
    builder.construct_specifier(named_type(generated.name.clone()), arguments)
}

pub fn apply(input: &PassInput<'_>, random: &mut Random) -> Option<TranslationUnit> {
    let chosen = choose(
        candidates(input.unit, input.analysis),
        input.probabilities.structify,
        random,
    );
    if chosen.is_empty() {
        return None;
    }
    let mut next_id = next_id_with_prefix(input.unit, STRUCTIFICATION_STRUCT_PREFIX);
    let mut builder = Builder::new(input.unit.next_id());
    let mut definitions = Vec::new();
    let mut replacements = BTreeMap::new();
    let mut chains: BTreeMap<NodeId, Vec<String>> = BTreeMap::new();
    for candidate in chosen {
        let mut structs = Vec::new();
        let top = random_struct(&mut structs, &mut next_id, &input.params, random, 0);
        let mut path = Vec::new();
        let mut current = top;
        loop {
            let nested: Vec<(String, usize)> = structs
                .get(current)
                .map(|generated| {
                    generated
                        .fields
                        .iter()
                        .filter_map(|(name, ty)| match ty {
                            FieldType::Struct(index) => Some((name.clone(), *index)),
                            FieldType::Basic(_) => None,
                        })
                        .collect()
                })
                .unwrap_or_default();
            if nested.is_empty() || random.next_bool() {
                break;
            }
            let Some((field, index)) = nested.get(random.next_index(nested.len())).cloned() else {
                break;
            };
            path.push(field);
            current = index;
        }
        if let Some(generated) = structs.get_mut(current) {
            let position = random.next_index(generated.fields.len() + 1);
            generated.fields.insert(
                position,
                (candidate.name.clone(), FieldType::Basic(candidate.ty)),
            );
        }
        let Some(top_name) = structs.get(top).map(|s| s.name.clone()) else {
            continue;
        };
        let id = top_name
            .strip_prefix(STRUCTIFICATION_STRUCT_PREFIX)
            .unwrap_or_default()
            .to_owned();
        let variable = format!("{GLF_STRUCT_REPLACEMENT}{id}");
        for index in (0..structs.len()).rev() {
            if let Some(generated) = structs.get(index) {
                definitions.push(struct_text(generated, &structs));
            }
        }
        let mut value = candidate.initializer.clone();
        let initializer = constructor(top, &structs, &candidate.name, &mut value, &mut builder);
        let mut declaration = builder.declare(named_type(top_name), &variable, Some(initializer));
        declaration.id = candidate.statement;
        replacements.insert(candidate.statement, declaration);
        let mut chain = vec![variable];
        chain.extend(path);
        chain.push(candidate.name.clone());
        for reference in &candidate.references {
            chains.insert(*reference, chain.clone());
        }
    }
    let mut result = input.unit.clone();
    replace_statements(&mut result, &mut replacements);
    rewrite_expressions(&mut result, &mut |expression| {
        let Some(chain) = chains.get(&expression.id) else {
            return;
        };
        if !matches!(expression.kind, ExpressionKind::Variable(_)) {
            return;
        }
        let _ = take_expression(expression);
        let mut names = chain.iter();
        let Some(first) = names.next() else {
            return;
        };
        let mut access = builder.variable(first);
        for name in names {
            access = builder.field(access, name);
        }
        *expression = access;
    });
    let text = definitions.join("\n");
    let parsed = parse_unit("structification", &text).ok()?;
    let position = result
        .external_declarations
        .iter()
        .position(|external| match external {
            ExternalDeclaration::Directive(_) => false,
            ExternalDeclaration::Declaration(declaration) => {
                !matches!(declaration.kind, DeclarationKind::Precision { .. })
            }
            _ => true,
        })
        .unwrap_or(result.external_declarations.len());
    let tail = result.external_declarations.split_off(position);
    result
        .external_declarations
        .extend(parsed.external_declarations);
    result.external_declarations.extend(tail);
    Some(TranslationUnit::new(
        result.external_declarations,
        builder.next_id(),
    ))
}
