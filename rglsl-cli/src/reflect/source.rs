use std::collections::BTreeMap;

use rglsl::front::glsl::Analyzed;
use rglsl_ast::ast::{
    DeclarationKind, ExpressionKind, ExternalDeclaration, SingleTypeQualifier, StorageQualifier,
};
use rglsl_sema::scope::{Storage, SymbolKind};
use rglsl_sema::{Analysis, SymbolId};

use super::types::{self, Pack};

pub(super) fn compute_layout(units: &[&Analyzed]) -> ([u32; 3], [i64; 3]) {
    let mut local_size = [1; 3];
    let mut rate = [0; 3];
    for unit in units {
        for declaration in &unit.unit.external_declarations {
            let ExternalDeclaration::Declaration(declaration) = declaration else {
                continue;
            };
            let DeclarationKind::Qualifier(ref qualifier) = declaration.kind else {
                continue;
            };
            let input = qualifier.node.qualifiers.iter().any(|single| {
                matches!(
                    single.node,
                    SingleTypeQualifier::Storage(StorageQualifier::In)
                )
            });
            if !input {
                continue;
            }
            for single in &qualifier.node.qualifiers {
                let SingleTypeQualifier::Layout(ref layout) = single.node else {
                    continue;
                };
                for id in &layout.ids {
                    let (tile, axis) = match id.node.name.node.to_ascii_lowercase().as_str() {
                        "local_size_x" => (false, 0),
                        "local_size_y" => (false, 1),
                        "local_size_z" => (false, 2),
                        "shading_rate_xqcom" => (true, 0),
                        "shading_rate_yqcom" => (true, 1),
                        "shading_rate_zqcom" => (true, 2),
                        _ => continue,
                    };
                    let value = id
                        .node
                        .value
                        .as_ref()
                        .and_then(|value| unit.analysis.expression(value.id))
                        .and_then(|info| info.value.as_ref())
                        .and_then(|value| value.values.first())
                        .and_then(|value| value.as_i64());
                    let Some(value) = value else {
                        continue;
                    };
                    if tile {
                        if let Some(slot) = rate.get_mut(axis) {
                            *slot = value;
                        }
                    } else if let (Some(slot), Ok(value)) =
                        (local_size.get_mut(axis), u32::try_from(value))
                    {
                        *slot = value;
                    }
                }
            }
        }
    }
    (local_size, rate)
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord)]
pub(super) enum SizeKey {
    Symbol(SymbolId),
    Member(types::Aggregate, usize),
}

pub(super) fn size_key(
    analysis: &Analysis,
    expression: &rglsl_ast::ast::Expression,
) -> Option<SizeKey> {
    let mut target = expression;
    while let ExpressionKind::Parenthesized(ref inner) = target.kind {
        target = inner;
    }
    match target.kind {
        ExpressionKind::Variable(_) => {
            let symbol = *analysis.references.get(&target.id)?;
            match analysis.symbol(symbol).map(|found| &found.kind)? {
                SymbolKind::Variable(_) => Some(SizeKey::Symbol(symbol)),
                &SymbolKind::BlockMember { instance, index } => {
                    let rglsl_sema::types::TypeKind::Block(id) =
                        analysis.symbol_type(instance)?.kind
                    else {
                        return None;
                    };
                    Some(SizeKey::Member(
                        types::Aggregate::Block(id),
                        usize::try_from(index).ok()?,
                    ))
                }
                _ => None,
            }
        }
        ExpressionKind::FieldSelection {
            base: ref owner,
            ref field,
        } => {
            let aggregate = match analysis.type_of(owner.id)?.kind {
                rglsl_sema::types::TypeKind::Struct(id) => types::Aggregate::Struct(id),
                rglsl_sema::types::TypeKind::Block(id)
                | rglsl_sema::types::TypeKind::Reference(id) => types::Aggregate::Block(id),
                _ => return None,
            };
            let members: &[rglsl_sema::types::Member] = match aggregate {
                types::Aggregate::Struct(id) => &analysis.types.structure(id)?.members,
                types::Aggregate::Block(id) => &analysis.types.block(id)?.members,
            };
            let position = members
                .iter()
                .position(|member| member.name == field.node)?;
            Some(SizeKey::Member(aggregate, position))
        }
        _ => None,
    }
}

pub(super) fn implicit_sizes(unit: &Analyzed) -> types::Implicit {
    let analysis = &unit.analysis;
    let mut implicit = types::Implicit::default();
    for expression in rglsl_ast::expressions(&unit.unit) {
        let ExpressionKind::Subscript {
            ref base,
            ref index,
        } = expression.kind
        else {
            continue;
        };
        let constant = analysis
            .expression(index.id)
            .filter(|info| !info.is_specialization)
            .and_then(|info| info.value.as_ref())
            .and_then(|value| value.values.first())
            .and_then(|value| value.as_i64());
        let dimensions = analysis
            .type_of(base.id)
            .map(|ty| ty.dimensions().to_vec())
            .unwrap_or_default();
        if matches!(
            dimensions.first(),
            Some(rglsl_sema::types::ArraySize::Unsized)
        ) {
            let sizing = match size_key(analysis, base) {
                Some(SizeKey::Symbol(symbol)) => Some(implicit.symbols.entry(symbol).or_default()),
                Some(SizeKey::Member(aggregate, position)) => {
                    Some(implicit.members.entry((aggregate, position)).or_default())
                }
                None => None,
            };
            if let Some(sizing) = sizing {
                match constant {
                    Some(value) => sizing.constant(value),
                    None => sizing.variably = true,
                }
            }
            let mut owner = &**base;
            while let ExpressionKind::Parenthesized(ref inner) = owner.kind {
                owner = inner;
            }
            if let (
                ExpressionKind::Subscript {
                    base: ref outer, ..
                },
                Some(value),
            ) = (&owner.kind, constant)
            {
                let nested = analysis
                    .type_of(outer.id)
                    .map(|ty| ty.dimensions().to_vec())
                    .unwrap_or_default();
                if matches!(nested.get(1), Some(rglsl_sema::types::ArraySize::Unsized)) {
                    let sizing = match size_key(analysis, outer) {
                        Some(SizeKey::Symbol(symbol)) => {
                            implicit.inner_symbols.entry(symbol).or_default()
                        }
                        Some(SizeKey::Member(aggregate, position)) => implicit
                            .inner_members
                            .entry((aggregate, position))
                            .or_default(),
                        None => continue,
                    };
                    sizing.constant(value);
                }
            }
        }
    }
    implicit
}

pub(super) fn io_name(name: &str) -> &str {
    match name {
        "gl_HitTNV" => "gl_RayTmaxNV",
        "gl_HitTEXT" => "gl_RayTmaxEXT",
        other => other,
    }
}

pub(super) fn declared_globals(source: &Analyzed) -> Vec<SymbolId> {
    let analysis = &source.analysis;
    let mut symbols = Vec::new();
    for declaration in &source.unit.external_declarations {
        let ExternalDeclaration::Declaration(declaration) = declaration else {
            continue;
        };
        match declaration.kind {
            DeclarationKind::InitDeclaratorList(ref list) => {
                for declarator in &list.declarators {
                    if let Some(&symbol) = analysis.declarations.get(&declarator.id) {
                        symbols.push(symbol);
                    }
                }
            }
            DeclarationKind::Block { .. } => {
                if let Some(&symbol) = analysis.declarations.get(&declaration.id) {
                    symbols.push(symbol);
                }
            }
            _ => {}
        }
    }
    symbols
}

#[derive(Debug, Clone, Copy, Default)]
pub(super) struct BlockDefaults {
    pub(super) packing: Option<Pack>,
    pub(super) row_major: Option<bool>,
}

pub(super) fn block_defaults(
    unit: &Analyzed,
) -> BTreeMap<rglsl_sema::types::BlockId, BlockDefaults> {
    let mut uniform = BlockDefaults::default();
    let mut buffer = BlockDefaults::default();
    let mut found = BTreeMap::new();
    for declaration in &unit.unit.external_declarations {
        let ExternalDeclaration::Declaration(declaration) = declaration else {
            continue;
        };
        match declaration.kind {
            DeclarationKind::Qualifier(ref qualifier) => {
                let mut storage = None;
                let mut names = Vec::new();
                for single in &qualifier.node.qualifiers {
                    match single.node {
                        SingleTypeQualifier::Storage(
                            kind @ (StorageQualifier::Uniform | StorageQualifier::Buffer),
                        ) => storage = Some(kind),
                        SingleTypeQualifier::Layout(ref layout) => {
                            names.extend(layout.ids.iter().map(|id| id.name.node.as_str()));
                        }
                        _ => {}
                    }
                }
                let defaults = match storage {
                    Some(StorageQualifier::Uniform) => &mut uniform,
                    Some(StorageQualifier::Buffer) => &mut buffer,
                    _ => continue,
                };
                for name in names {
                    match name {
                        "std140" => defaults.packing = Some(Pack::Std140),
                        "std430" => defaults.packing = Some(Pack::Std430),
                        "scalar" => defaults.packing = Some(Pack::Scalar),
                        "shared" | "packed" => defaults.packing = Some(Pack::Shared),
                        "row_major" => defaults.row_major = Some(true),
                        "column_major" => defaults.row_major = Some(false),
                        _ => {}
                    }
                }
            }
            DeclarationKind::Block { .. } => {
                let Some(&symbol) = unit.analysis.declarations.get(&declaration.id) else {
                    continue;
                };
                let Some(variable) = unit
                    .analysis
                    .symbol(symbol)
                    .and_then(|symbol| symbol.variable())
                else {
                    continue;
                };
                let rglsl_sema::types::TypeKind::Block(id) = variable.ty.kind else {
                    continue;
                };
                let defaults = match variable.qualifiers.storage {
                    Storage::Uniform => uniform,
                    Storage::Buffer => buffer,
                    _ => continue,
                };
                found.insert(id, defaults);
            }
            _ => {}
        }
    }
    found
}
