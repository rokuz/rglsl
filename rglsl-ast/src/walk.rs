use alloc::vec::Vec;

use crate::ast::{
    ArrayDimension, ArraySpecifier, CaseLabel, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FullySpecifiedType, FunctionIdentifier, FunctionPrototype,
    Initializer, JumpStatement, SingleTypeQualifier, Spanned, SpirvDecorateKind,
    SpirvExecutionModeKind, SpirvTypeParameter, Statement, StatementKind, StructDeclaration,
    TranslationUnit, TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
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
            match &single.node {
                SingleTypeQualifier::Layout(layout) => {
                    for id in &layout.ids {
                        if let Some(value) = &id.value {
                            self.expression(value);
                        }
                    }
                }
                SingleTypeQualifier::SpirvDecorate(decorate)
                    if decorate.kind == SpirvDecorateKind::Id =>
                {
                    for operand in &decorate.operands {
                        self.expression(operand);
                    }
                }
                _ => {}
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
        match &specifier.non_array {
            TypeSpecifierNonArray::Struct(structure) => self.members(&structure.declarations),
            TypeSpecifierNonArray::InlineBlock(declarations) => self.members(declarations),
            TypeSpecifierNonArray::Spirv(spirv) => {
                for parameter in &spirv.parameters {
                    match parameter {
                        SpirvTypeParameter::Constant(value) => self.expression(value),
                        SpirvTypeParameter::Type(ty) => self.specifier(ty),
                    }
                }
            }
            _ => {}
        }
        if let Some(parameters) = &specifier.parameters {
            if let Some(element) = &parameters.element {
                self.specifier(element);
            }
            for value in &parameters.values {
                self.expression(value);
            }
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
        for attribute in prototype
            .attributes
            .iter()
            .chain(&prototype.trailing_attributes)
        {
            if let Some(argument) = &attribute.argument {
                self.expression(argument);
            }
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
            DeclarationKind::SpirvInstruction { prototype, .. } => self.prototype(prototype),
            DeclarationKind::SpirvExecutionMode(mode) => {
                if mode.kind == SpirvExecutionModeKind::Id {
                    for operand in &mode.operands {
                        self.expression(operand);
                    }
                }
            }
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
            StatementKind::Attributed {
                attributes,
                statement,
            } => {
                for argument in attributes
                    .iter()
                    .filter_map(|attribute| attribute.argument.as_ref())
                {
                    self.expression(argument);
                }
                self.statement(statement);
            }
        }
    }

    fn expression(&mut self, expression: &'a Expression) {
        let mut pending = Vec::from([expression]);
        while let Some(expression) = pending.pop() {
            self.found.push(expression);
            if let ExpressionKind::FunctionCall(call) = &expression.kind {
                if let FunctionIdentifier::Constructor(specifier)
                | FunctionIdentifier::Cast(specifier) = &call.function.node
                {
                    self.specifier(specifier);
                }
            }
            pending.extend(expression.kind.children().into_iter().rev());
        }
    }
}
