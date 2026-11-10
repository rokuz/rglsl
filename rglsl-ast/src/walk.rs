use alloc::vec::Vec;

use crate::ast::{
    ArrayDimension, ArraySpecifier, CaseLabel, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FullySpecifiedType, FunctionIdentifier, FunctionPrototype,
    Initializer, JumpStatement, SingleTypeQualifier, Spanned, Statement, StatementKind,
    StructDeclaration, TranslationUnit, TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
};

pub fn expressions(unit: &TranslationUnit) -> Vec<&Expression> {
    let mut walker = Walker { found: Vec::new() };
    for declaration in &unit.external_declarations {
        match declaration {
            ExternalDeclaration::FunctionDefinition(definition) => {
                walker.prototype(&definition.prototype);
                for statement in &definition.body.statements {
                    walker.statement(statement);
                }
            }
            ExternalDeclaration::Declaration(declaration) => walker.declaration(declaration),
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
    }
    walker.found
}

struct Walker<'a> {
    found: Vec<&'a Expression>,
}

impl<'a> Walker<'a> {
    fn qualifier(&mut self, qualifier: &'a Spanned<TypeQualifier>) {
        for single in &qualifier.qualifiers {
            if let SingleTypeQualifier::Layout(layout) = &single.node {
                for id in &layout.ids {
                    if let Some(value) = &id.value {
                        self.expression(value);
                    }
                }
            }
        }
    }

    fn array(&mut self, specifier: Option<&'a Spanned<ArraySpecifier>>) {
        let Some(specifier) = specifier else {
            return;
        };
        for dimension in &specifier.dimensions {
            if let ArrayDimension::Sized(size) = &dimension.node {
                self.expression(size);
            }
        }
    }

    fn members(&mut self, members: &'a [Spanned<StructDeclaration>]) {
        for member in members {
            self.fully_specified(&member.ty);
            for declarator in &member.declarators {
                self.array(declarator.array.as_ref());
            }
        }
    }

    fn specifier(&mut self, specifier: &'a TypeSpecifier) {
        if let TypeSpecifierNonArray::Struct(structure) = &specifier.non_array {
            self.members(&structure.declarations);
        }
        self.array(specifier.array.as_ref());
    }

    fn fully_specified(&mut self, ty: &'a Spanned<FullySpecifiedType>) {
        if let Some(qualifier) = &ty.qualifier {
            self.qualifier(qualifier);
        }
        self.specifier(&ty.specifier);
    }

    fn prototype(&mut self, prototype: &'a FunctionPrototype) {
        self.fully_specified(&prototype.return_type);
        for parameter in &prototype.parameters {
            self.fully_specified(&parameter.ty);
            self.array(parameter.array.as_ref());
        }
    }

    fn initializer(&mut self, initializer: &'a Initializer) {
        match initializer {
            Initializer::Expression(expression) => self.expression(expression),
            Initializer::List(items) => {
                for item in items {
                    self.initializer(item);
                }
            }
        }
    }

    fn declaration(&mut self, declaration: &'a Declaration) {
        match &declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => self.prototype(prototype),
            DeclarationKind::InitDeclaratorList(list) => {
                self.fully_specified(&list.ty);
                for declarator in &list.declarators {
                    self.array(declarator.array.as_ref());
                    if let Some(initializer) = &declarator.initializer {
                        self.initializer(initializer);
                    }
                }
            }
            DeclarationKind::Precision { .. } => {}
            DeclarationKind::Block {
                structure,
                instance,
            } => {
                self.qualifier(&structure.qualifier);
                self.members(&structure.members);
                if let Some(instance) = instance {
                    self.array(instance.array.as_ref());
                }
            }
            DeclarationKind::Qualifier(qualifier)
            | DeclarationKind::QualifiedIdentifiers { qualifier, .. } => self.qualifier(qualifier),
        }
    }

    fn condition(&mut self, condition: &'a Condition) {
        match condition {
            Condition::Expression(expression) => self.expression(expression),
            Condition::Declaration(declaration) => {
                self.fully_specified(&declaration.ty);
                self.initializer(&declaration.initializer);
            }
        }
    }

    fn statement(&mut self, statement: &'a Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => {
                for statement in &compound.statements {
                    self.statement(statement);
                }
            }
            StatementKind::Declaration(declaration) => self.declaration(declaration),
            StatementKind::Expression(expression) => {
                if let Some(expression) = expression {
                    self.expression(expression);
                }
            }
            StatementKind::Selection {
                condition,
                then_branch,
                else_branch,
            } => {
                self.expression(condition);
                self.statement(then_branch);
                if let Some(else_branch) = else_branch {
                    self.statement(else_branch);
                }
            }
            StatementKind::Switch {
                selector,
                statements,
            } => {
                self.expression(selector);
                for statement in statements {
                    self.statement(statement);
                }
            }
            StatementKind::CaseLabel(CaseLabel::Case(label)) => self.expression(label),
            StatementKind::CaseLabel(CaseLabel::Default) => {}
            StatementKind::While { condition, body } => {
                self.condition(condition);
                self.statement(body);
            }
            StatementKind::DoWhile { body, condition } => {
                self.statement(body);
                self.expression(condition);
            }
            StatementKind::For(statement) => {
                self.statement(&statement.init);
                if let Some(condition) = &statement.condition {
                    self.condition(condition);
                }
                if let Some(increment) = &statement.increment {
                    self.expression(increment);
                }
                self.statement(&statement.body);
            }
            StatementKind::Jump(JumpStatement::Return(Some(value))) => self.expression(value),
            StatementKind::Jump(_) => {}
        }
    }

    fn expression(&mut self, expression: &'a Expression) {
        self.found.push(expression);
        match &expression.kind {
            ExpressionKind::Variable(_)
            | ExpressionKind::Number(_)
            | ExpressionKind::Bool(_)
            | ExpressionKind::String(_) => {}
            ExpressionKind::Parenthesized(inner) => self.expression(inner),
            ExpressionKind::Subscript { base, index } => {
                self.expression(base);
                self.expression(index);
            }
            ExpressionKind::FunctionCall(call) => {
                match &call.function.node {
                    FunctionIdentifier::Constructor(specifier) => self.specifier(specifier),
                    FunctionIdentifier::Function(_) => {}
                    FunctionIdentifier::Expression(callee) => self.expression(callee),
                    FunctionIdentifier::Method { object, .. } => self.expression(object),
                }
                for argument in &call.arguments {
                    self.expression(argument);
                }
            }
            ExpressionKind::FieldSelection { base, .. } => self.expression(base),
            ExpressionKind::Postfix { operand, .. } | ExpressionKind::Unary { operand, .. } => {
                self.expression(operand);
            }
            ExpressionKind::Binary { left, right, .. } => {
                self.expression(left);
                self.expression(right);
            }
            ExpressionKind::Conditional {
                condition,
                then_expression,
                else_expression,
            } => {
                self.expression(condition);
                self.expression(then_expression);
                self.expression(else_expression);
            }
            ExpressionKind::Assignment { target, value, .. } => {
                self.expression(target);
                self.expression(value);
            }
            ExpressionKind::Sequence(expressions) => {
                for expression in expressions {
                    self.expression(expression);
                }
            }
        }
    }
}
