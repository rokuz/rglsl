use std::collections::{BTreeMap, BTreeSet};

use rglsl_ast::ast::{
    BasicType, DeclarationKind, ExpressionKind, ExternalDeclaration, NodeId, ScalarType, Statement,
    StatementKind, TranslationUnit,
};
use rglsl_sema::scope::SymbolId;
use rglsl_sema::Analysis;

use crate::basic;
use crate::build::Builder;
use crate::injection::{apply_edits, choose, BlockId, Edit, Location};
use crate::random::Random;
use crate::rewrite::{rewrite_expressions, statement_expression_ids, visit_statements};
use crate::transformation::PassInput;

pub const NAME: &str = "vectorize";
pub const MERGED_PREFIX: &str = "GLF_merged";
const MAX_WIDTH: u32 = 4;
const SWIZZLE: [char; 4] = ['x', 'y', 'z', 'w'];

#[derive(Debug, Clone)]
struct Entry {
    name: String,
    ty: BasicType,
    statement_index: usize,
    symbol: SymbolId,
    excluded: BTreeSet<NodeId>,
}

#[derive(Debug, Clone)]
struct MergeSet {
    element: ScalarType,
    entries: Vec<Entry>,
}

impl MergeSet {
    fn width(&self) -> u32 {
        self.entries
            .iter()
            .map(|entry| basic::num_elements(entry.ty))
            .sum()
    }

    fn can_accept(&self, entry: &Entry) -> bool {
        basic::element(entry.ty) == self.element
            && !self
                .entries
                .iter()
                .any(|existing| existing.statement_index == entry.statement_index)
            && self.width() + basic::num_elements(entry.ty) <= MAX_WIDTH
    }

    fn merged_name(&self) -> String {
        let mut offset = 0;
        let mut data = Vec::new();
        let mut names = String::new();
        for entry in &self.entries {
            let width = basic::num_elements(entry.ty);
            data.push(format!("{offset}_{width}_{}", entry.name.len()));
            names.push_str(&entry.name);
            offset += width;
        }
        format!(
            "{MERGED_PREFIX}{}_{}{}",
            self.entries.len(),
            data.join("_"),
            names
        )
    }

    fn swizzle(&self, name: &str) -> String {
        let mut offset = 0;
        for entry in &self.entries {
            let width = basic::num_elements(entry.ty);
            if entry.name == name {
                return (offset..offset + width)
                    .filter_map(|index| SWIZZLE.get(usize::try_from(index).unwrap_or(0)))
                    .collect();
            }
            offset += width;
        }
        String::new()
    }
}

#[derive(Debug, Clone)]
pub struct MergedComponent {
    pub offset: u32,
    pub width: u32,
    pub name: String,
}

pub fn component_data(name: &str) -> Option<Vec<MergedComponent>> {
    let rest = name.strip_prefix(MERGED_PREFIX)?;
    let count_text: String = rest.chars().take_while(char::is_ascii_digit).collect();
    let count: usize = count_text.parse().ok()?;
    let mut rest = rest.get(count_text.len()..)?;
    let mut numbers = Vec::new();
    for _ in 0..count * 3 {
        rest = rest.strip_prefix('_')?;
        let digits: String = rest.chars().take_while(char::is_ascii_digit).collect();
        numbers.push(digits.parse::<u32>().ok()?);
        rest = rest.get(digits.len()..)?;
    }
    let mut components = Vec::new();
    for chunk in numbers.chunks(3) {
        let [offset, width, length] = chunk else {
            return None;
        };
        let length = usize::try_from(*length).ok()?;
        let component = rest.get(..length)?;
        rest = rest.get(length..)?;
        components.push(MergedComponent {
            offset: *offset,
            width: *width,
            name: component.to_owned(),
        });
    }
    rest.is_empty().then_some(components)
}

fn block_entries(statements: &[Statement], analysis: &Analysis) -> Vec<Entry> {
    let mut entries = Vec::new();
    for (index, statement) in statements.iter().enumerate() {
        let StatementKind::Declaration(declaration) = &statement.kind else {
            continue;
        };
        let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
            continue;
        };
        if list.ty.qualifier.is_some() {
            continue;
        }
        let Some(ty) = basic::from_specifier(&list.ty.specifier) else {
            continue;
        };
        if basic::is_matrix(ty) || basic::is_boolean(ty) {
            continue;
        }
        let excluded: BTreeSet<NodeId> = statement_expression_ids(statement).into_iter().collect();
        for declarator in &list.declarators {
            if declarator.array.is_some() {
                continue;
            }
            let Some(symbol) = analysis.declarations.get(&declarator.id) else {
                continue;
            };
            entries.push(Entry {
                name: declarator.name.node.clone(),
                ty,
                statement_index: index,
                symbol: *symbol,
                excluded: excluded.clone(),
            });
        }
    }
    entries.sort_by(|a, b| a.name.cmp(&b.name));
    entries
}

fn declared_names(statements: &[Statement]) -> BTreeSet<String> {
    let mut names = BTreeSet::new();
    for statement in statements {
        if let StatementKind::Declaration(declaration) = &statement.kind {
            names.extend(crate::injection::declared_names(declaration));
        }
    }
    names
}

struct Opportunity {
    block: BlockId,
    set: MergeSet,
}

fn blocks(unit: &TranslationUnit) -> Vec<(BlockId, &[Statement])> {
    let mut result = Vec::new();
    for (index, external) in unit.external_declarations.iter().enumerate() {
        let ExternalDeclaration::FunctionDefinition(definition) = external else {
            continue;
        };
        result.push((
            BlockId::Function(index),
            definition.body.statements.as_slice(),
        ));
        for statement in &definition.body.statements {
            visit_statements(statement, &mut |inner| {
                if let StatementKind::Compound(compound) = &inner.kind {
                    result.push((BlockId::Statement(inner.id), compound.statements.as_slice()));
                }
            });
        }
    }
    result
}

pub fn apply(input: &PassInput<'_>, random: &mut Random) -> Option<TranslationUnit> {
    let mut opportunities = Vec::new();
    let mut existing: BTreeMap<BlockId, BTreeSet<String>> = BTreeMap::new();
    for (block, statements) in blocks(input.unit) {
        existing.insert(block, declared_names(statements));
        let mut sets: Vec<MergeSet> = Vec::new();
        for entry in block_entries(statements, input.analysis) {
            let with_space: Vec<usize> = sets
                .iter()
                .enumerate()
                .filter(|(_, set)| set.can_accept(&entry))
                .map(|(index, _)| index)
                .collect();
            let choice = random.next_index(with_space.len() + 1);
            match with_space
                .get(choice)
                .and_then(|index| sets.get_mut(*index))
            {
                Some(set) => set.entries.push(entry),
                None => sets.push(MergeSet {
                    element: basic::element(entry.ty),
                    entries: vec![entry],
                }),
            }
        }
        opportunities.extend(
            sets.into_iter()
                .filter(|set| set.entries.len() > 1)
                .map(|set| Opportunity { block, set }),
        );
    }
    let chosen = choose(
        opportunities,
        input.probabilities.vectorize_statements,
        random,
    );
    if chosen.is_empty() {
        return None;
    }
    let mut builder = Builder::new(input.unit.next_id());
    let mut edits = Vec::new();
    let mut accesses: BTreeMap<NodeId, (String, String)> = BTreeMap::new();
    for opportunity in chosen {
        let merged = opportunity.set.merged_name();
        let names = existing.entry(opportunity.block).or_default();
        if !names.insert(merged.clone()) {
            continue;
        }
        let ty = basic::vector(opportunity.set.element, opportunity.set.width());
        let declaration = builder.declare(basic::specifier(ty), &merged, None);
        edits.push((
            Location::Block {
                block: opportunity.block,
                index: 0,
            },
            Edit::Inject(declaration),
        ));
        for entry in &opportunity.set.entries {
            let swizzle = opportunity.set.swizzle(&entry.name);
            let base = builder.variable(&merged);
            let target = builder.field(base, &swizzle);
            let value = builder.variable(&entry.name);
            let copy = builder.assign(target, value);
            let copy = builder.expression_statement(copy);
            edits.push((
                Location::Block {
                    block: opportunity.block,
                    index: entry.statement_index + 1,
                },
                Edit::Inject(copy),
            ));
            for (expression, symbol) in &input.analysis.references {
                if *symbol == entry.symbol && !entry.excluded.contains(expression) {
                    accesses.insert(*expression, (merged.clone(), swizzle.clone()));
                }
            }
        }
    }
    if edits.is_empty() {
        return None;
    }
    let mut result = input.unit.clone();
    rewrite_expressions(&mut result, &mut |expression| {
        let Some((merged, swizzle)) = accesses.get(&expression.id) else {
            return;
        };
        if !matches!(expression.kind, ExpressionKind::Variable(_)) {
            return;
        }
        let base = builder.variable(merged);
        *expression = builder.field(base, swizzle);
    });
    apply_edits(&mut result, edits, &mut builder);
    Some(TranslationUnit::new(
        result.external_declarations,
        builder.next_id(),
    ))
}
