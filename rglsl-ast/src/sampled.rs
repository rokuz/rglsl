use alloc::collections::BTreeSet;
use alloc::vec::Vec;
use core::mem;

use crate::ast::{
    CaseLabel, Condition, DeclarationKind, Expression, ExpressionKind, ExternalDeclaration,
    FullySpecifiedType, FunctionCall, FunctionIdentifier, FunctionPrototype, Initializer,
    JumpStatement, NodeId, Statement, StatementKind, TranslationUnit, TypeSpecifierNonArray,
};
use crate::chain::placeholder;
use crate::opaque::{OpaqueKeyword, SampledFamily};
use crate::span::Span;
use crate::walk::visit_expressions;

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub struct Unsupported {
    pub span: Span,
    pub reason: &'static str,
}

const fn is_pure_sampler(specifier: &TypeSpecifierNonArray) -> bool {
    matches!(
        *specifier,
        TypeSpecifierNonArray::Opaque(OpaqueKeyword::Sampler | OpaqueKeyword::SamplerShadow)
    )
}

const fn pure_sampler(ty: &FullySpecifiedType) -> bool {
    is_pure_sampler(&ty.specifier.node.non_array)
}

fn upgrade_type(ty: &mut FullySpecifiedType) {
    if let TypeSpecifierNonArray::Opaque(OpaqueKeyword::Sampled { ref mut family, .. }) =
        ty.specifier.node.non_array
        && *family == SampledFamily::Texture
    {
        *family = SampledFamily::Sampler;
    }
}

const fn combines(specifier: &TypeSpecifierNonArray) -> bool {
    matches!(
        *specifier,
        TypeSpecifierNonArray::Opaque(OpaqueKeyword::Sampled {
            family: SampledFamily::Sampler,
            ..
        })
    )
}

const fn combines_shadow(specifier: &TypeSpecifierNonArray) -> bool {
    matches!(
        *specifier,
        TypeSpecifierNonArray::Opaque(OpaqueKeyword::Shadow(_))
    )
}

fn upgrade_prototype(prototype: &mut FunctionPrototype) {
    upgrade_type(&mut prototype.return_type.node);
    for parameter in &mut prototype.parameters {
        upgrade_type(&mut parameter.kind.ty.node);
    }
}

fn remove_sampler_parameters(prototype: &mut FunctionPrototype) {
    prototype
        .parameters
        .retain(|parameter| !pure_sampler(&parameter.kind.ty.node));
}

enum Work<'a> {
    Statement(&'a mut Statement),
    Expression(&'a mut Expression),
    Initializer(&'a mut Initializer),
}

fn condition_work<'a>(condition: &'a mut Condition, work: &mut Vec<Work<'a>>) {
    match *condition {
        Condition::Expression(ref mut expression) => work.push(Work::Expression(expression)),
        Condition::Declaration(ref mut declaration) => {
            upgrade_type(&mut declaration.kind.ty.node);
            work.push(Work::Initializer(&mut declaration.kind.initializer.node));
        }
    }
}

fn walk_body<E>(
    statements: &mut [Statement],
    on_call: &mut impl FnMut(&mut FunctionCall, Span) -> Result<Option<Expression>, E>,
) -> Result<(), E> {
    let mut work: Vec<Work<'_>> = statements.iter_mut().rev().map(Work::Statement).collect();
    while let Some(item) = work.pop() {
        match item {
            Work::Expression(expression) => {
                if let ExpressionKind::FunctionCall(ref mut function) = expression.kind
                    && let Some(replacement) = on_call(function, expression.span)?
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
    Ok(())
}

fn walk_unit<E>(
    unit: &mut TranslationUnit,
    on_prototype: &mut impl FnMut(&mut FunctionPrototype),
    on_global: &mut impl FnMut(&mut FullySpecifiedType),
    on_call: &mut impl FnMut(&mut FunctionCall, Span) -> Result<Option<Expression>, E>,
) -> Result<(), E> {
    for declaration in &mut unit.external_declarations {
        match *declaration {
            ExternalDeclaration::Declaration(ref mut declaration) => match declaration.kind {
                DeclarationKind::InitDeclaratorList(ref mut list) => {
                    on_global(&mut list.ty.node);
                }
                DeclarationKind::FunctionPrototype(ref mut declared) => {
                    on_prototype(&mut declared.node);
                }
                _ => {}
            },
            ExternalDeclaration::FunctionDefinition(ref mut definition) => {
                on_prototype(&mut definition.kind.prototype.node);
                walk_body(&mut definition.kind.body.node.statements, on_call)?;
            }
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
    Ok(())
}

pub fn upgrade_textures(unit: &mut TranslationUnit) -> Result<(), Unsupported> {
    walk_unit(
        unit,
        &mut upgrade_prototype,
        &mut upgrade_type,
        &mut |call: &mut FunctionCall, span| {
            let FunctionIdentifier::Constructor(ref specifier) = call.function.node else {
                return Ok(None);
            };
            if combines_shadow(&specifier.non_array) {
                return Err(Unsupported {
                    span,
                    reason: "a shadow sampler made from a texture and a sampler cannot keep its depth comparison when the texture becomes a sampled texture",
                });
            }
            if !combines(&specifier.non_array) || call.arguments.len() != 2 {
                return Ok(None);
            }
            Ok(call
                .arguments
                .first_mut()
                .map(|first| mem::replace(first, placeholder())))
        },
    )
}

pub fn call_arguments(unit: &TranslationUnit) -> Vec<&Expression> {
    let mut arguments = Vec::new();
    visit_expressions(unit, |expression| {
        if let ExpressionKind::FunctionCall(ref call) = expression.kind
            && matches!(call.function.node, FunctionIdentifier::Function(_))
        {
            arguments.extend(call.arguments.iter());
        }
    });
    arguments
}

pub fn remove_samplers(unit: &mut TranslationUnit, arguments: &BTreeSet<NodeId>) {
    unit.external_declarations.retain(|declaration| {
        let ExternalDeclaration::Declaration(ref declaration) = *declaration else {
            return true;
        };
        let DeclarationKind::InitDeclaratorList(ref list) = declaration.kind else {
            return true;
        };
        !pure_sampler(&list.ty.node)
    });
    let _: Result<(), core::convert::Infallible> = walk_unit(
        unit,
        &mut remove_sampler_parameters,
        &mut |_| {},
        &mut |call: &mut FunctionCall, _| {
            if matches!(call.function.node, FunctionIdentifier::Function(_)) {
                call.arguments
                    .retain(|argument| !arguments.contains(&argument.id));
            }
            Ok(None)
        },
    );
}
