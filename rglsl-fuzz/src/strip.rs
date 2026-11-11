use std::collections::BTreeSet;

use std::cell::RefCell;

use rglsl_ast::ast::{
    DeclarationKind, ExternalDeclaration, NodeId, TranslationUnit, TypeSpecifierNonArray,
};

use crate::constants::{is_donated_name, STRUCTIFICATION_STRUCT_PREFIX};
use crate::rename::{rename_all, NameKind};

pub fn referenced_names(external: &ExternalDeclaration) -> BTreeSet<String> {
    let names = RefCell::new(BTreeSet::new());
    let mut unit = TranslationUnit::new(vec![external.clone()], NodeId::new(0));
    let record = |_: NameKind, name: &str| {
        names.borrow_mut().insert(name.to_owned());
        None
    };
    rename_all(&mut unit, &record);
    names.into_inner()
}

fn defined_function(external: &ExternalDeclaration) -> Option<&str> {
    match external {
        ExternalDeclaration::FunctionDefinition(definition) => {
            Some(definition.prototype.name.node.as_str())
        }
        ExternalDeclaration::Declaration(declaration) => match &declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => Some(prototype.name.node.as_str()),
            _ => None,
        },
        _ => None,
    }
}

fn donated_globals(external: &ExternalDeclaration) -> Option<Vec<String>> {
    let ExternalDeclaration::Declaration(declaration) = external else {
        return None;
    };
    let names: Vec<String> = match &declaration.kind {
        DeclarationKind::InitDeclaratorList(list) => list
            .declarators
            .iter()
            .map(|declarator| declarator.name.node.clone())
            .collect(),
        DeclarationKind::Block {
            structure,
            instance: None,
        } => structure
            .members
            .iter()
            .flat_map(|member| member.declarators.iter())
            .map(|declarator| declarator.name.node.clone())
            .collect(),
        _ => return None,
    };
    if names.is_empty() {
        return None;
    }
    names
        .iter()
        .all(|name| is_donated_name(name))
        .then_some(names)
}

fn donated_struct(external: &ExternalDeclaration) -> Option<String> {
    let ExternalDeclaration::Declaration(declaration) = external else {
        return None;
    };
    let DeclarationKind::InitDeclaratorList(list) = &declaration.kind else {
        return None;
    };
    if !list.declarators.is_empty() {
        return None;
    }
    let TypeSpecifierNonArray::Struct(structure) = &list.ty.specifier.non_array else {
        return None;
    };
    let name = structure.name.as_ref()?;
    (is_donated_name(&name.node) || name.node.starts_with(STRUCTIFICATION_STRUCT_PREFIX))
        .then(|| name.node.clone())
}

pub fn strip_unused(unit: &TranslationUnit) -> Option<TranslationUnit> {
    let removed: BTreeSet<usize> = strip_unused_generated(unit)?.into_iter().collect();
    let external_declarations = unit
        .external_declarations
        .iter()
        .enumerate()
        .filter(|(index, _)| !removed.contains(index))
        .map(|(_, external)| external.clone())
        .collect();
    Some(TranslationUnit::new(external_declarations, unit.next_id()))
}

pub fn strip_unused_generated(unit: &TranslationUnit) -> Option<Vec<usize>> {
    let externals = &unit.external_declarations;
    let references: Vec<BTreeSet<String>> = externals.iter().map(referenced_names).collect();
    let mut kept = vec![false; externals.len()];
    let mut live: BTreeSet<String> = BTreeSet::new();
    live.insert(String::from("main"));
    let mut changed = true;
    while changed {
        changed = false;
        for (index, external) in externals.iter().enumerate() {
            if kept.get(index).copied().unwrap_or(true) {
                continue;
            }
            let keep = if let Some(name) = defined_function(external) {
                live.contains(name)
            } else if let Some(names) = donated_globals(external) {
                names.iter().any(|name| live.contains(name))
            } else if let Some(name) = donated_struct(external) {
                live.contains(&name)
            } else {
                true
            };
            if keep {
                if let Some(slot) = kept.get_mut(index) {
                    *slot = true;
                }
                if let Some(names) = references.get(index) {
                    live.extend(names.iter().cloned());
                }
                changed = true;
            }
        }
    }
    let removed: Vec<usize> = kept
        .iter()
        .enumerate()
        .filter(|(_, keep)| !**keep)
        .map(|(index, _)| index)
        .collect();
    (!removed.is_empty()).then_some(removed)
}
