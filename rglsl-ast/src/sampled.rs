use alloc::collections::BTreeSet;
use alloc::string::String;
use alloc::vec::Vec;
use core::mem;

use crate::ast::{
    CaseLabel, Condition, DeclarationKind, Expression, ExpressionKind, ExternalDeclaration,
    FullySpecifiedType, FunctionCall, FunctionIdentifier, FunctionPrototype, Initializer,
    JumpStatement, Statement, StatementKind, TranslationUnit, TypeSpecifierNonArray,
};
use crate::chain::placeholder;
use crate::opaque::{OpaqueKeyword, SampledFamily};

const fn is_pure_sampler(specifier: &TypeSpecifierNonArray) -> bool {
    matches!(
        *specifier,
        TypeSpecifierNonArray::Opaque(OpaqueKeyword::Sampler | OpaqueKeyword::SamplerShadow)
    )
}

const fn pure_sampler(ty: &FullySpecifiedType) -> bool {
    is_pure_sampler(&ty.specifier.node.non_array)
}

fn upgrade(specifier: &mut TypeSpecifierNonArray) {
    if let TypeSpecifierNonArray::Opaque(OpaqueKeyword::Sampled { ref mut family, .. }) = *specifier
        && *family == SampledFamily::Texture
    {
        *family = SampledFamily::Sampler;
    }
}

fn upgrade_type(ty: &mut FullySpecifiedType) {
    upgrade(&mut ty.specifier.node.non_array);
}

const fn combines(specifier: &TypeSpecifierNonArray) -> bool {
    matches!(
        *specifier,
        TypeSpecifierNonArray::Opaque(
            OpaqueKeyword::Sampled {
                family: SampledFamily::Sampler,
                ..
            } | OpaqueKeyword::Shadow(_)
        )
    )
}

fn prototype(prototype: &mut FunctionPrototype, removed: &mut BTreeSet<String>) {
    upgrade_type(&mut prototype.return_type.node);
    prototype.parameters.retain(|parameter| {
        if !pure_sampler(&parameter.kind.ty.node) {
            return true;
        }
        if let Some(ref name) = parameter.kind.name {
            removed.insert(name.node.clone());
        }
        false
    });
    for parameter in &mut prototype.parameters {
        upgrade_type(&mut parameter.kind.ty.node);
    }
}

fn names_removed(expression: &Expression, removed: &BTreeSet<String>) -> bool {
    let mut current = expression;
    loop {
        match current.kind {
            ExpressionKind::Variable(ref name) => return removed.contains(name),
            ExpressionKind::Subscript { ref base, .. } => current = base,
            ExpressionKind::Parenthesized(ref inner) => current = inner,
            _ => return false,
        }
    }
}

fn call(call: &mut FunctionCall, removed: &BTreeSet<String>) -> Option<Expression> {
    if let FunctionIdentifier::Constructor(ref specifier) = call.function.node
        && combines(&specifier.non_array)
        && call.arguments.len() == 2
    {
        return call
            .arguments
            .first_mut()
            .map(|first| mem::replace(first, placeholder()));
    }
    if matches!(
        call.function.node,
        FunctionIdentifier::Function(_) | FunctionIdentifier::Method { .. }
    ) {
        call.arguments
            .retain(|argument| !names_removed(argument, removed));
    }
    None
}

enum Work<'a> {
    Statement(&'a mut Statement),
    Expression(&'a mut Expression),
    Initializer(&'a mut Initializer),
}

fn body(statements: &mut [Statement], removed: &BTreeSet<String>) {
    let mut work: Vec<Work<'_>> = statements.iter_mut().rev().map(Work::Statement).collect();
    while let Some(item) = work.pop() {
        match item {
            Work::Expression(expression) => {
                if let ExpressionKind::FunctionCall(ref mut function) = expression.kind
                    && let Some(replacement) = call(function, removed)
                {
                    *expression = replacement;
                    work.push(Work::Expression(expression));
                    continue;
                }
                expression
                    .kind
                    .for_each_child_mut(|child| work.push(Work::Expression(child)));
            }
            Work::Initializer(initializer) => match *initializer {
                Initializer::Expression(ref mut expression) => {
                    work.push(Work::Expression(expression));
                }
                Initializer::List(ref mut items) => {
                    work.extend(
                        items
                            .iter_mut()
                            .map(|item| Work::Initializer(&mut item.node)),
                    );
                }
            },
            Work::Statement(statement) => match statement.kind {
                StatementKind::Compound(ref mut compound) => {
                    work.extend(compound.statements.iter_mut().map(Work::Statement));
                }
                StatementKind::Declaration(ref mut declaration) => {
                    if let DeclarationKind::InitDeclaratorList(ref mut list) = declaration.kind {
                        upgrade_type(&mut list.ty.node);
                        for declarator in &mut list.declarators {
                            if let Some(ref mut initializer) = declarator.kind.initializer {
                                work.push(Work::Initializer(&mut initializer.node));
                            }
                        }
                    }
                }
                StatementKind::Expression(Some(ref mut expression))
                | StatementKind::CaseLabel(CaseLabel::Case(ref mut expression))
                | StatementKind::Jump(JumpStatement::Return(Some(ref mut expression))) => {
                    work.push(Work::Expression(expression));
                }
                StatementKind::Expression(None)
                | StatementKind::CaseLabel(CaseLabel::Default)
                | StatementKind::Jump(_) => {}
                StatementKind::Selection {
                    ref mut condition,
                    ref mut then_branch,
                    ref mut else_branch,
                } => {
                    work.push(Work::Expression(condition));
                    work.push(Work::Statement(then_branch));
                    if let Some(else_branch) = else_branch {
                        work.push(Work::Statement(else_branch));
                    }
                }
                StatementKind::Switch {
                    ref mut selector,
                    ref mut statements,
                } => {
                    work.push(Work::Expression(selector));
                    work.extend(statements.iter_mut().map(Work::Statement));
                }
                StatementKind::While {
                    ref mut condition,
                    ref mut body,
                } => {
                    condition_work(condition, &mut work);
                    work.push(Work::Statement(body));
                }
                StatementKind::DoWhile {
                    ref mut body,
                    ref mut condition,
                } => {
                    work.push(Work::Statement(body));
                    work.push(Work::Expression(condition));
                }
                StatementKind::For(ref mut statement) => {
                    let statement = &mut **statement;
                    work.push(Work::Statement(&mut statement.init));
                    if let Some(ref mut condition) = statement.condition {
                        condition_work(condition, &mut work);
                    }
                    if let Some(ref mut increment) = statement.increment {
                        work.push(Work::Expression(increment));
                    }
                    work.push(Work::Statement(&mut statement.body));
                }
                StatementKind::Attributed {
                    ref mut statement, ..
                } => work.push(Work::Statement(statement)),
            },
        }
    }
}

fn condition_work<'a>(condition: &'a mut Condition, work: &mut Vec<Work<'a>>) {
    match *condition {
        Condition::Expression(ref mut expression) => work.push(Work::Expression(expression)),
        Condition::Declaration(ref mut declaration) => {
            work.push(Work::Initializer(&mut declaration.kind.initializer.node));
        }
    }
}

pub fn auto_sampled_textures(unit: &mut TranslationUnit) {
    let mut removed = BTreeSet::new();
    unit.external_declarations.retain(|declaration| {
        let ExternalDeclaration::Declaration(ref declaration) = *declaration else {
            return true;
        };
        let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind else {
            return true;
        };
        if !pure_sampler(&list.ty.node) {
            return true;
        }
        removed.extend(
            list.declarators
                .iter()
                .map(|declarator| declarator.kind.name.node.clone()),
        );
        false
    });
    for declaration in &mut unit.external_declarations {
        match *declaration {
            ExternalDeclaration::Declaration(ref mut declaration) => match declaration.kind {
                DeclarationKind::InitDeclaratorList(ref mut list) => {
                    upgrade_type(&mut list.ty.node);
                }
                DeclarationKind::FunctionPrototype(ref mut declared) => {
                    prototype(&mut declared.node, &mut BTreeSet::new());
                }
                _ => {}
            },
            ExternalDeclaration::FunctionDefinition(ref mut definition) => {
                let mut scope = removed.clone();
                prototype(&mut definition.kind.prototype.node, &mut scope);
                body(&mut definition.kind.body.node.statements, &scope);
            }
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
}
