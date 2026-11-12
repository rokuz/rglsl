use alloc::vec::Vec;
use core::cell::RefCell;
use core::future::Future;

use rglsl_types::stack::{run, Call, Stack};

use crate::ast::{
    ArrayDimension, ArraySpecifier, CaseLabel, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FullySpecifiedType, FunctionIdentifier, FunctionPrototype,
    Initializer, JumpStatement, SingleTypeQualifier, Spanned, SpirvDecorateKind,
    SpirvExecutionModeKind, SpirvTypeParameter, Statement, StatementKind, StructDeclaration,
    TranslationUnit, TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
};

pub fn expressions(unit: &TranslationUnit) -> Vec<&Expression> {
    let walker = Walker {
        found: RefCell::new(Vec::new()),
    };
    let finished = run(|stack| {
        Cx {
            walker: &walker,
            stack,
        }
        .unit(unit)
    });
    match finished {
        Some(()) => walker.found.into_inner(),
        None => Vec::new(),
    }
}

pub fn statement_expressions(statement: &Statement) -> Vec<&Expression> {
    let walker = Walker {
        found: RefCell::new(Vec::new()),
    };
    let finished = run(|stack| {
        Cx {
            walker: &walker,
            stack,
        }
        .statement(statement)
    });
    match finished {
        Some(()) => walker.found.into_inner(),
        None => Vec::new(),
    }
}

struct Walker<'a> {
    found: RefCell<Vec<&'a Expression>>,
}

#[derive(Clone)]
struct Cx<'b, 'a> {
    walker: &'b Walker<'a>,
    stack: Stack<'b>,
}

impl<'b> Cx<'b, '_> {
    fn call<T: 'b>(&self, frame: impl Future<Output = T> + 'b) -> Call<'b, T> {
        self.stack.call(frame)
    }
}

impl<'b, 'a: 'b> Cx<'b, 'a> {
    async fn unit(self, unit: &'a TranslationUnit) {
        for declaration in &unit.external_declarations {
            match declaration {
                ExternalDeclaration::FunctionDefinition(definition) => {
                    self.call(self.clone().prototype(&definition.prototype))
                        .await;
                    for statement in &definition.body.statements {
                        self.call(self.clone().statement(statement)).await;
                    }
                }
                ExternalDeclaration::Declaration(declaration) => {
                    self.call(self.clone().declaration(declaration)).await;
                }
                ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
            }
        }
    }

    async fn qualifier(self, qualifier: &'a Spanned<TypeQualifier>) {
        for single in &qualifier.qualifiers {
            match &single.node {
                SingleTypeQualifier::Layout(layout) => {
                    for id in &layout.ids {
                        if let Some(value) = &id.value {
                            self.call(self.clone().expression(value)).await;
                        }
                    }
                }
                SingleTypeQualifier::SpirvDecorate(decorate)
                    if decorate.kind == SpirvDecorateKind::Id =>
                {
                    for operand in &decorate.operands {
                        self.call(self.clone().expression(operand)).await;
                    }
                }
                _ => {}
            }
        }
    }

    async fn array(self, specifier: Option<&'a Spanned<ArraySpecifier>>) {
        let Some(specifier) = specifier else {
            return;
        };
        for dimension in &specifier.dimensions {
            if let ArrayDimension::Sized(size) = &dimension.node {
                self.call(self.clone().expression(size)).await;
            }
        }
    }

    async fn members(self, members: &'a [Spanned<StructDeclaration>]) {
        for member in members {
            self.call(self.clone().fully_specified(&member.ty)).await;
            for declarator in &member.declarators {
                self.call(self.clone().array(declarator.array.as_ref()))
                    .await;
            }
        }
    }

    async fn specifier(self, specifier: &'a TypeSpecifier) {
        match &specifier.non_array {
            TypeSpecifierNonArray::Struct(structure) => {
                self.call(self.clone().members(&structure.declarations))
                    .await
            }
            TypeSpecifierNonArray::InlineBlock(declarations) => {
                self.call(self.clone().members(declarations)).await
            }
            TypeSpecifierNonArray::Spirv(spirv) => {
                for parameter in &spirv.parameters {
                    match parameter {
                        SpirvTypeParameter::Constant(value) => {
                            self.call(self.clone().expression(value)).await
                        }
                        SpirvTypeParameter::Type(ty) => self.call(self.clone().specifier(ty)).await,
                    }
                }
            }
            _ => {}
        }
        if let Some(parameters) = &specifier.parameters {
            if let Some(element) = &parameters.element {
                self.call(self.clone().specifier(element)).await;
            }
            for value in &parameters.values {
                self.call(self.clone().expression(value)).await;
            }
        }
        self.call(self.clone().array(specifier.array.as_ref()))
            .await;
    }

    async fn fully_specified(self, ty: &'a Spanned<FullySpecifiedType>) {
        if let Some(qualifier) = &ty.qualifier {
            self.call(self.clone().qualifier(qualifier)).await;
        }
        self.call(self.clone().specifier(&ty.specifier)).await;
    }

    async fn prototype(self, prototype: &'a FunctionPrototype) {
        self.call(self.clone().fully_specified(&prototype.return_type))
            .await;
        for parameter in &prototype.parameters {
            self.call(self.clone().fully_specified(&parameter.ty)).await;
            self.call(self.clone().array(parameter.array.as_ref()))
                .await;
        }
        for attribute in prototype
            .attributes
            .iter()
            .chain(&prototype.trailing_attributes)
        {
            if let Some(argument) = &attribute.argument {
                self.call(self.clone().expression(argument)).await;
            }
        }
    }

    async fn initializer(self, initializer: &'a Initializer) {
        match initializer {
            Initializer::Expression(expression) => {
                self.call(self.clone().expression(expression)).await
            }
            Initializer::List(items) => {
                for item in items {
                    self.call(self.clone().initializer(item)).await;
                }
            }
        }
    }

    async fn declaration(self, declaration: &'a Declaration) {
        match &declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => {
                self.call(self.clone().prototype(prototype)).await
            }
            DeclarationKind::InitDeclaratorList(list) => {
                self.call(self.clone().fully_specified(&list.ty)).await;
                for declarator in &list.declarators {
                    self.call(self.clone().array(declarator.array.as_ref()))
                        .await;
                    if let Some(initializer) = &declarator.initializer {
                        self.call(self.clone().initializer(initializer)).await;
                    }
                }
            }
            DeclarationKind::Precision { .. } => {}
            DeclarationKind::Block {
                structure,
                instance,
            } => {
                self.call(self.clone().qualifier(&structure.qualifier))
                    .await;
                self.call(self.clone().members(&structure.members)).await;
                if let Some(instance) = instance {
                    self.call(self.clone().array(instance.array.as_ref())).await;
                }
            }
            DeclarationKind::Qualifier(qualifier)
            | DeclarationKind::QualifiedIdentifiers { qualifier, .. } => {
                self.call(self.clone().qualifier(qualifier)).await
            }
            DeclarationKind::SpirvInstruction { prototype, .. } => {
                self.call(self.clone().prototype(prototype)).await
            }
            DeclarationKind::SpirvExecutionMode(mode) => {
                if mode.kind == SpirvExecutionModeKind::Id {
                    for operand in &mode.operands {
                        self.call(self.clone().expression(operand)).await;
                    }
                }
            }
        }
    }

    async fn condition(self, condition: &'a Condition) {
        match condition {
            Condition::Expression(expression) => {
                self.call(self.clone().expression(expression)).await
            }
            Condition::Declaration(declaration) => {
                self.call(self.clone().fully_specified(&declaration.ty))
                    .await;
                self.call(self.clone().initializer(&declaration.initializer))
                    .await;
            }
        }
    }

    async fn statement(self, statement: &'a Statement) {
        match &statement.kind {
            StatementKind::Compound(compound) => {
                for statement in &compound.statements {
                    self.call(self.clone().statement(statement)).await;
                }
            }
            StatementKind::Declaration(declaration) => {
                self.call(self.clone().declaration(declaration)).await
            }
            StatementKind::Expression(expression) => {
                if let Some(expression) = expression {
                    self.call(self.clone().expression(expression)).await;
                }
            }
            StatementKind::Selection {
                condition,
                then_branch,
                else_branch,
            } => {
                self.call(self.clone().expression(condition)).await;
                self.call(self.clone().statement(then_branch)).await;
                if let Some(else_branch) = else_branch {
                    self.call(self.clone().statement(else_branch)).await;
                }
            }
            StatementKind::Switch {
                selector,
                statements,
            } => {
                self.call(self.clone().expression(selector)).await;
                for statement in statements {
                    self.call(self.clone().statement(statement)).await;
                }
            }
            StatementKind::CaseLabel(CaseLabel::Case(label)) => {
                self.call(self.clone().expression(label)).await
            }
            StatementKind::CaseLabel(CaseLabel::Default) => {}
            StatementKind::While { condition, body } => {
                self.call(self.clone().condition(condition)).await;
                self.call(self.clone().statement(body)).await;
            }
            StatementKind::DoWhile { body, condition } => {
                self.call(self.clone().statement(body)).await;
                self.call(self.clone().expression(condition)).await;
            }
            StatementKind::For(statement) => {
                self.call(self.clone().statement(&statement.init)).await;
                if let Some(condition) = &statement.condition {
                    self.call(self.clone().condition(condition)).await;
                }
                if let Some(increment) = &statement.increment {
                    self.call(self.clone().expression(increment)).await;
                }
                self.call(self.clone().statement(&statement.body)).await;
            }
            StatementKind::Jump(JumpStatement::Return(Some(value))) => {
                self.call(self.clone().expression(value)).await
            }
            StatementKind::Jump(_) => {}
            StatementKind::Attributed {
                attributes,
                statement,
            } => {
                for argument in attributes
                    .iter()
                    .filter_map(|attribute| attribute.argument.as_ref())
                {
                    self.call(self.clone().expression(argument)).await;
                }
                self.call(self.clone().statement(statement)).await;
            }
        }
    }

    async fn expression(self, expression: &'a Expression) {
        let mut pending = Vec::from([expression]);
        while let Some(expression) = pending.pop() {
            self.walker.found.borrow_mut().push(expression);
            if let ExpressionKind::FunctionCall(call) = &expression.kind {
                if let FunctionIdentifier::Constructor(specifier)
                | FunctionIdentifier::Cast(specifier) = &call.function.node
                {
                    self.call(self.clone().specifier(specifier)).await;
                }
            }
            pending.extend(expression.kind.children().into_iter().rev());
        }
    }
}
