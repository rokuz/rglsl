use rglsl_ast::ast::{
    Condition, Declaration, DeclarationKind, ExpressionKind, ExternalDeclaration,
    FullySpecifiedType, FunctionIdentifier, FunctionPrototype, Identifier, Statement,
    StatementKind, StructDeclaration, TranslationUnit, TypeSpecifier, TypeSpecifierNonArray,
};

use crate::rewrite::{rewrite_expressions, rewrite_statements};

#[derive(Debug, Clone, Copy, PartialEq, Eq, PartialOrd, Ord, Hash)]
pub enum NameKind {
    Variable,
    Function,
    Type,
}

pub trait Renamer {
    fn rename(&self, kind: NameKind, name: &str) -> Option<String>;
}

impl<F: Fn(NameKind, &str) -> Option<String>> Renamer for F {
    fn rename(&self, kind: NameKind, name: &str) -> Option<String> {
        self(kind, name)
    }
}

pub fn rename_all(unit: &mut TranslationUnit, renamer: &dyn Renamer) {
    rewrite_expressions(unit, &mut |expression| match &mut expression.kind {
        ExpressionKind::Variable(name) => {
            if let Some(new) = renamer.rename(NameKind::Variable, name) {
                *name = new;
            }
        }
        ExpressionKind::FunctionCall(call) => match &mut call.function.node {
            FunctionIdentifier::Function(name) => {
                if let Some(new) = renamer.rename(NameKind::Function, name) {
                    *name = new;
                }
            }
            FunctionIdentifier::Constructor(specifier) | FunctionIdentifier::Cast(specifier) => {
                specifier_names(specifier, renamer);
            }
            FunctionIdentifier::Expression(_) | FunctionIdentifier::Method { .. } => {}
        },
        _ => {}
    });
    for external in &mut unit.external_declarations {
        match external {
            ExternalDeclaration::FunctionDefinition(definition) => {
                prototype_names(&mut definition.prototype, renamer);
            }
            ExternalDeclaration::Declaration(declaration) => {
                declaration_names(declaration, renamer)
            }
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
    rewrite_statements(unit, &mut |statement| statement_names(statement, renamer));
}

fn identifier(identifier: &mut Identifier, kind: NameKind, renamer: &dyn Renamer) {
    if let Some(new) = renamer.rename(kind, &identifier.node) {
        identifier.node = new;
    }
}

fn statement_names(statement: &mut Statement, renamer: &dyn Renamer) {
    match &mut statement.kind {
        StatementKind::Declaration(declaration) => declaration_names(declaration, renamer),
        StatementKind::While {
            condition: Condition::Declaration(declaration),
            ..
        } => {
            fully_specified_names(&mut declaration.ty, renamer);
            identifier(&mut declaration.name, NameKind::Variable, renamer);
        }
        StatementKind::For(for_statement) => {
            if let Some(Condition::Declaration(declaration)) = &mut for_statement.condition {
                fully_specified_names(&mut declaration.ty, renamer);
                identifier(&mut declaration.name, NameKind::Variable, renamer);
            }
        }
        _ => {}
    }
}

pub fn specifier_names(specifier: &mut TypeSpecifier, renamer: &dyn Renamer) {
    let mut pending = vec![specifier];
    while let Some(specifier) = pending.pop() {
        let start = pending.len();
        match &mut specifier.non_array {
            TypeSpecifierNonArray::TypeName(name) => {
                if let Some(new) = renamer.rename(NameKind::Type, name) {
                    *name = new;
                }
            }
            TypeSpecifierNonArray::Struct(structure) => {
                if let Some(name) = &mut structure.name {
                    identifier(name, NameKind::Type, renamer);
                }
                pending.extend(member_specifiers(&mut structure.declarations));
            }
            TypeSpecifierNonArray::InlineBlock(declarations) => {
                pending.extend(member_specifiers(declarations));
            }
            _ => {}
        }
        if let Some(added) = pending.get_mut(start..) {
            added.reverse();
        }
    }
}

fn member_specifiers(
    members: &mut [rglsl_ast::ast::Spanned<StructDeclaration>],
) -> impl Iterator<Item = &mut TypeSpecifier> {
    members
        .iter_mut()
        .map(|member| &mut member.ty.specifier.node)
}

fn members(members: &mut [rglsl_ast::ast::Spanned<StructDeclaration>], renamer: &dyn Renamer) {
    for member in members {
        fully_specified_names(&mut member.ty, renamer);
    }
}

fn fully_specified_names(
    ty: &mut rglsl_ast::ast::Spanned<FullySpecifiedType>,
    renamer: &dyn Renamer,
) {
    specifier_names(&mut ty.specifier, renamer);
}

fn prototype_names(prototype: &mut FunctionPrototype, renamer: &dyn Renamer) {
    fully_specified_names(&mut prototype.return_type, renamer);
    identifier(&mut prototype.name, NameKind::Function, renamer);
    for parameter in &mut prototype.parameters {
        fully_specified_names(&mut parameter.ty, renamer);
        if let Some(name) = &mut parameter.name {
            identifier(name, NameKind::Variable, renamer);
        }
    }
}

fn declaration_names(declaration: &mut Declaration, renamer: &dyn Renamer) {
    match &mut declaration.kind {
        DeclarationKind::FunctionPrototype(prototype) => prototype_names(prototype, renamer),
        DeclarationKind::InitDeclaratorList(list) => {
            fully_specified_names(&mut list.ty, renamer);
            for declarator in &mut list.declarators {
                identifier(&mut declarator.name, NameKind::Variable, renamer);
            }
        }
        DeclarationKind::Block {
            structure,
            instance,
        } => {
            members(&mut structure.members, renamer);
            if instance.is_none() {
                for member in &mut structure.members {
                    for declarator in &mut member.declarators {
                        identifier(&mut declarator.name, NameKind::Variable, renamer);
                    }
                }
            }
            if let Some(instance) = instance {
                identifier(&mut instance.name, NameKind::Variable, renamer);
            }
        }
        DeclarationKind::Precision { .. }
        | DeclarationKind::Qualifier(_)
        | DeclarationKind::QualifiedIdentifiers { .. }
        | DeclarationKind::SpirvInstruction { .. }
        | DeclarationKind::SpirvExecutionMode(_) => {}
    }
}
