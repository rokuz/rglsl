use alloc::vec::Vec;
use core::convert::Infallible;

use rglsl_types::stack::Stalled;

use crate::ast::{
    ArrayDimension, ArraySpecifier, CaseLabel, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FullySpecifiedType, FunctionIdentifier, FunctionPrototype,
    Initializer, JumpStatement, SingleTypeQualifier, Spanned, SpirvDecorateKind,
    SpirvExecutionModeKind, SpirvTypeParameter, Statement, StatementKind, StructDeclaration,
    TranslationUnit, TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
};

enum Step<'a> {
    Expression(&'a Expression),
    Statement(&'a Statement),
    Declaration(&'a Declaration),
    Initializer(&'a Initializer),
    Condition(&'a Condition),
    Prototype(&'a FunctionPrototype),
    FullySpecified(&'a Spanned<FullySpecifiedType>),
    Specifier(&'a TypeSpecifier),
    Members(&'a [Spanned<StructDeclaration>]),
    Array(&'a Spanned<ArraySpecifier>),
    Qualifier(&'a Spanned<TypeQualifier>),
}

fn push_array<'a>(work: &mut Vec<Step<'a>>, specifier: Option<&'a Spanned<ArraySpecifier>>) {
    if let Some(specifier) = specifier {
        work.push(Step::Array(specifier));
    }
}

fn drain<'a, E>(
    work: &mut Vec<Step<'a>>,
    mut visit: impl FnMut(&'a Expression) -> Result<(), E>,
) -> Result<(), E> {
    while let Some(step) = work.pop() {
        match step {
            Step::Expression(expression) => {
                visit(expression)?;
                if expression.kind.is_leaf() {
                    continue;
                }
                let mark = work.len();
                expression
                    .kind
                    .for_each_child(|child| work.push(Step::Expression(child)));
                if let Some(added) = work.get_mut(mark..) {
                    added.reverse();
                }
                if let ExpressionKind::FunctionCall(call) = &expression.kind
                    && let FunctionIdentifier::Constructor(specifier)
                    | FunctionIdentifier::Cast(specifier) = &call.function.node
                {
                    work.push(Step::Specifier(specifier));
                }
            }
            Step::Statement(statement) => match &statement.kind {
                StatementKind::Compound(compound) => {
                    for child in compound.statements.iter().rev() {
                        work.push(Step::Statement(child));
                    }
                }
                StatementKind::Declaration(declaration) => {
                    work.push(Step::Declaration(declaration));
                }
                StatementKind::Expression(expression) => {
                    if let Some(expression) = expression {
                        work.push(Step::Expression(expression));
                    }
                }
                StatementKind::Selection {
                    condition,
                    then_branch,
                    else_branch,
                } => {
                    if let Some(else_branch) = else_branch {
                        work.push(Step::Statement(else_branch));
                    }
                    work.push(Step::Statement(then_branch));
                    work.push(Step::Expression(condition));
                }
                StatementKind::Switch {
                    selector,
                    statements,
                } => {
                    for child in statements.iter().rev() {
                        work.push(Step::Statement(child));
                    }
                    work.push(Step::Expression(selector));
                }
                StatementKind::CaseLabel(CaseLabel::Case(label)) => {
                    work.push(Step::Expression(label));
                }
                StatementKind::Jump(JumpStatement::Return(Some(value))) => {
                    work.push(Step::Expression(value));
                }
                StatementKind::CaseLabel(CaseLabel::Default) | StatementKind::Jump(_) => {}
                StatementKind::While { condition, body } => {
                    work.push(Step::Statement(body));
                    work.push(Step::Condition(condition));
                }
                StatementKind::DoWhile { body, condition } => {
                    work.push(Step::Expression(condition));
                    work.push(Step::Statement(body));
                }
                StatementKind::For(statement) => {
                    work.push(Step::Statement(&statement.body));
                    if let Some(increment) = &statement.increment {
                        work.push(Step::Expression(increment));
                    }
                    if let Some(condition) = &statement.condition {
                        work.push(Step::Condition(condition));
                    }
                    work.push(Step::Statement(&statement.init));
                }
                StatementKind::Attributed {
                    attributes,
                    statement,
                } => {
                    work.push(Step::Statement(statement));
                    for argument in attributes
                        .iter()
                        .rev()
                        .filter_map(|attribute| attribute.argument.as_ref())
                    {
                        work.push(Step::Expression(argument));
                    }
                }
            },
            Step::Declaration(declaration) => match &declaration.kind {
                DeclarationKind::FunctionPrototype(prototype)
                | DeclarationKind::SpirvInstruction { prototype, .. } => {
                    work.push(Step::Prototype(&prototype.node));
                }
                DeclarationKind::InitDeclaratorList(list) => {
                    for declarator in list.declarators.iter().rev() {
                        if let Some(initializer) = &declarator.kind.initializer {
                            work.push(Step::Initializer(&initializer.node));
                        }
                        push_array(work, declarator.kind.array.as_ref());
                    }
                    work.push(Step::FullySpecified(&list.ty));
                }
                DeclarationKind::Precision { .. } => {}
                DeclarationKind::Block {
                    structure,
                    instance,
                } => {
                    if let Some(instance) = instance {
                        push_array(work, instance.node.array.as_ref());
                    }
                    work.push(Step::Members(&structure.members));
                    work.push(Step::Qualifier(&structure.qualifier));
                }
                DeclarationKind::Qualifier(qualifier)
                | DeclarationKind::QualifiedIdentifiers { qualifier, .. } => {
                    work.push(Step::Qualifier(qualifier));
                }
                DeclarationKind::SpirvExecutionMode(mode) => {
                    if mode.node.kind == SpirvExecutionModeKind::Id {
                        for operand in mode.node.operands.iter().rev() {
                            work.push(Step::Expression(operand));
                        }
                    }
                }
            },
            Step::Initializer(initializer) => match initializer {
                Initializer::Expression(expression) => {
                    work.push(Step::Expression(expression));
                }
                Initializer::List(items) => {
                    for item in items.iter().rev() {
                        work.push(Step::Initializer(&item.node));
                    }
                }
            },
            Step::Condition(condition) => match condition {
                Condition::Expression(expression) => {
                    work.push(Step::Expression(expression));
                }
                Condition::Declaration(declaration) => {
                    work.push(Step::Initializer(&declaration.kind.initializer.node));
                    work.push(Step::FullySpecified(&declaration.kind.ty));
                }
            },
            Step::Prototype(prototype) => {
                for attribute in prototype
                    .trailing_attributes
                    .iter()
                    .rev()
                    .chain(prototype.attributes.iter().rev())
                {
                    if let Some(argument) = &attribute.argument {
                        work.push(Step::Expression(argument));
                    }
                }
                for parameter in prototype.parameters.iter().rev() {
                    push_array(work, parameter.kind.array.as_ref());
                    work.push(Step::FullySpecified(&parameter.kind.ty));
                }
                work.push(Step::FullySpecified(&prototype.return_type));
            }
            Step::FullySpecified(ty) => {
                work.push(Step::Specifier(&ty.node.specifier.node));
                if let Some(qualifier) = &ty.node.qualifier {
                    work.push(Step::Qualifier(qualifier));
                }
            }
            Step::Specifier(specifier) => {
                push_array(work, specifier.array.as_ref());
                if let Some(parameters) = &specifier.parameters {
                    for value in parameters.node.values.iter().rev() {
                        work.push(Step::Expression(value));
                    }
                    if let Some(element) = &parameters.node.element {
                        work.push(Step::Specifier(&element.node));
                    }
                }
                match &specifier.non_array {
                    TypeSpecifierNonArray::Struct(structure) => {
                        work.push(Step::Members(&structure.declarations));
                    }
                    TypeSpecifierNonArray::InlineBlock(declarations) => {
                        work.push(Step::Members(declarations));
                    }
                    TypeSpecifierNonArray::Spirv(spirv) => {
                        for parameter in spirv.parameters.iter().rev() {
                            match parameter {
                                SpirvTypeParameter::Constant(value) => {
                                    work.push(Step::Expression(value));
                                }
                                SpirvTypeParameter::Type(ty) => {
                                    work.push(Step::Specifier(&ty.node));
                                }
                            }
                        }
                    }
                    _ => {}
                }
            }
            Step::Members(members) => {
                for member in members.iter().rev() {
                    for declarator in member.node.declarators.iter().rev() {
                        push_array(work, declarator.node.array.as_ref());
                    }
                    work.push(Step::FullySpecified(&member.node.ty));
                }
            }
            Step::Array(specifier) => {
                for dimension in specifier.node.dimensions.iter().rev() {
                    if let ArrayDimension::Sized(size) = &dimension.node {
                        work.push(Step::Expression(size));
                    }
                }
            }
            Step::Qualifier(qualifier) => {
                for single in qualifier.node.qualifiers.iter().rev() {
                    match &single.node {
                        SingleTypeQualifier::Layout(layout) => {
                            for id in layout.ids.iter().rev() {
                                if let Some(value) = &id.node.value {
                                    work.push(Step::Expression(value));
                                }
                            }
                        }
                        SingleTypeQualifier::SpirvDecorate(decorate)
                            if decorate.kind == SpirvDecorateKind::Id =>
                        {
                            for operand in decorate.operands.iter().rev() {
                                work.push(Step::Expression(operand));
                            }
                        }
                        _ => {}
                    }
                }
            }
        }
    }
    Ok(())
}

pub fn try_visit_expressions<'a, E>(
    unit: &'a TranslationUnit,
    mut visit: impl FnMut(&'a Expression) -> Result<(), E>,
) -> Result<(), E> {
    let mut work = Vec::with_capacity(64);
    for declaration in &unit.external_declarations {
        match declaration {
            ExternalDeclaration::FunctionDefinition(definition) => {
                work.push(Step::Prototype(&definition.kind.prototype.node));
                drain(&mut work, &mut visit)?;
                for statement in &definition.kind.body.node.statements {
                    work.push(Step::Statement(statement));
                    drain(&mut work, &mut visit)?;
                }
            }
            ExternalDeclaration::Declaration(declaration) => {
                work.push(Step::Declaration(declaration));
                drain(&mut work, &mut visit)?;
            }
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
    Ok(())
}

pub fn visit_expressions<'a>(unit: &'a TranslationUnit, mut visit: impl FnMut(&'a Expression)) {
    let _: Result<(), Infallible> = try_visit_expressions(unit, |expression| {
        visit(expression);
        Ok(())
    });
}

pub fn expressions(unit: &TranslationUnit) -> Result<Vec<&Expression>, Stalled> {
    let capacity = usize::try_from(unit.next_id()).unwrap_or(0);
    let mut found = Vec::with_capacity(capacity);
    visit_expressions(unit, |expression| found.push(expression));
    Ok(found)
}

pub fn statement_expressions(statement: &Statement) -> Result<Vec<&Expression>, Stalled> {
    let mut found = Vec::new();
    let mut work = Vec::with_capacity(32);
    work.push(Step::Statement(statement));
    let _: Result<(), Infallible> = drain(&mut work, |expression| {
        found.push(expression);
        Ok(())
    });
    Ok(found)
}
