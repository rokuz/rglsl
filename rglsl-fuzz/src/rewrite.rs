use rglsl_ast::ast::{
    ArrayDimension, ArraySpecifier, CaseLabel, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FullySpecifiedType, FunctionIdentifier, FunctionPrototype,
    Initializer, JumpStatement, Node, SingleTypeQualifier, Spanned, Statement, StatementKind,
    StructSpecifier, TranslationUnit, TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
};
use rglsl_ast::Span;
use rglsl_types::stack::run;

use crate::stack::{
    child_statements, child_statements_mut, take_initializer, take_statement, take_type, Cx,
};
use std::cell::RefCell;

pub fn rewrite_expressions(unit: &mut TranslationUnit, visit: &mut dyn FnMut(&mut Expression)) {
    let state = RefCell::new(Rewriter { visit });
    let _ = run(|stack| Cx::new(&state, stack).unit(unit));
}

pub fn visit_statements<'a>(statement: &'a Statement, visit: &mut dyn FnMut(&'a Statement)) {
    let mut pending = vec![statement];
    while let Some(statement) = pending.pop() {
        visit(statement);
        pending.extend(child_statements(&statement.kind).into_iter().rev());
    }
}

pub fn function_statements(unit: &TranslationUnit) -> Vec<(usize, &Statement)> {
    let mut result = Vec::new();
    for (index, external) in unit.external_declarations.iter().enumerate() {
        if let ExternalDeclaration::FunctionDefinition(definition) = external {
            for statement in &definition.body.statements {
                visit_statements(statement, &mut |inner| result.push((index, inner)));
            }
        }
    }
    result
}

pub fn statement_expression_ids(statement: &Statement) -> Vec<rglsl_ast::ast::NodeId> {
    let mut probe = statement.clone();
    let mut ids = Vec::new();
    rewrite_statement_expressions(&mut probe, &mut |expression| ids.push(expression.id));
    ids
}

pub fn replace_statements(
    unit: &mut TranslationUnit,
    replacements: &mut std::collections::BTreeMap<rglsl_ast::ast::NodeId, Statement>,
) {
    rewrite_statements(unit, &mut |statement| {
        if let Some(replacement) = replacements.remove(&statement.id) {
            *statement = replacement;
        }
    });
}

pub fn rewrite_statement_expressions(
    statement: &mut Statement,
    visit: &mut dyn FnMut(&mut Expression),
) {
    let state = RefCell::new(Rewriter { visit });
    let original = take_statement(statement);
    if let Some(rewritten) = run(|stack| Cx::new(&state, stack).statement(original)) {
        *statement = rewritten;
    }
}

pub fn rewrite_statements(unit: &mut TranslationUnit, visit: &mut dyn FnMut(&mut Statement)) {
    for declaration in &mut unit.external_declarations {
        if let ExternalDeclaration::FunctionDefinition(definition) = declaration {
            for statement in &mut definition.body.statements {
                statement_post_order(statement, visit);
            }
        }
    }
}

enum PostOrder {
    Visit(Statement),
    Build(Statement, usize),
}

fn statement_post_order(statement: &mut Statement, visit: &mut dyn FnMut(&mut Statement)) {
    let mut tasks = vec![PostOrder::Visit(take_statement(statement))];
    let mut done: Vec<Statement> = Vec::new();
    while let Some(task) = tasks.pop() {
        match task {
            PostOrder::Visit(mut node) => {
                let children: Vec<Statement> = child_statements_mut(&mut node.kind)
                    .into_iter()
                    .map(take_statement)
                    .collect();
                tasks.push(PostOrder::Build(node, children.len()));
                tasks.extend(children.into_iter().rev().map(PostOrder::Visit));
            }
            PostOrder::Build(mut node, count) => {
                let start = done.len().saturating_sub(count);
                for (slot, child) in child_statements_mut(&mut node.kind)
                    .into_iter()
                    .zip(done.drain(start..))
                {
                    *slot = child;
                }
                visit(&mut node);
                done.push(node);
            }
        }
    }
    if let Some(result) = done.pop() {
        *statement = result;
    }
}

pub fn take_expression(slot: &mut Expression) -> Expression {
    core::mem::replace(
        slot,
        Node::new(slot.id, Span::new(0, 0), ExpressionKind::Bool(false)),
    )
}

struct Rewriter<'a> {
    visit: &'a mut dyn FnMut(&mut Expression),
}

impl<'b, 'v: 'b> Cx<'b, Rewriter<'v>> {
    async fn unit(self, unit: &'b mut TranslationUnit) {
        for declaration in &mut unit.external_declarations {
            match declaration {
                ExternalDeclaration::FunctionDefinition(definition) => {
                    self.clone().prototype(&mut definition.prototype).await;
                    for statement in &mut definition.body.statements {
                        self.statement_in(statement).await;
                    }
                }
                ExternalDeclaration::Declaration(declaration) => {
                    self.clone().declaration(declaration).await;
                }
                ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
            }
        }
    }

    async fn statement_in(&self, slot: &mut Statement) {
        let statement = take_statement(slot);
        *slot = self.call(self.clone().statement(statement)).await;
    }

    async fn expression_in(&self, slot: &mut Expression) {
        let expression = take_expression(slot);
        *slot = self.call(self.clone().expression(expression)).await;
    }

    async fn specifier_in(&self, slot: &mut TypeSpecifier) {
        let specifier = take_type(slot);
        *slot = self.call(self.clone().specifier(specifier)).await;
    }

    async fn initializer_in(&self, slot: &mut Initializer) {
        let initializer = take_initializer(slot);
        *slot = self.call(self.clone().initializer(initializer)).await;
    }

    async fn qualifier(self, qualifier: &mut Spanned<TypeQualifier>) {
        for single in &mut qualifier.qualifiers {
            if let SingleTypeQualifier::Layout(layout) = &mut single.node {
                for id in &mut layout.ids {
                    if let Some(value) = &mut id.value {
                        self.expression_in(value).await;
                    }
                }
            }
        }
    }

    async fn array(self, specifier: Option<&mut Spanned<ArraySpecifier>>) {
        let Some(specifier) = specifier else {
            return;
        };
        for dimension in &mut specifier.dimensions {
            if let ArrayDimension::Sized(size) = &mut dimension.node {
                self.expression_in(size).await;
            }
        }
    }

    async fn fully_specified(self, ty: &mut Spanned<FullySpecifiedType>) {
        if let Some(qualifier) = &mut ty.qualifier {
            self.clone().qualifier(qualifier).await;
        }
        self.specifier_in(&mut ty.specifier).await;
    }

    async fn specifier(self, mut specifier: TypeSpecifier) -> TypeSpecifier {
        if let TypeSpecifierNonArray::Struct(StructSpecifier {
            declarations: members,
            ..
        })
        | TypeSpecifierNonArray::InlineBlock(members) = &mut specifier.non_array
        {
            for member in members {
                self.clone().fully_specified(&mut member.ty).await;
                for declarator in &mut member.declarators {
                    self.clone().array(declarator.array.as_mut()).await;
                }
            }
        }
        self.clone().array(specifier.array.as_mut()).await;
        specifier
    }

    async fn prototype(self, prototype: &mut FunctionPrototype) {
        self.clone()
            .fully_specified(&mut prototype.return_type)
            .await;
        for parameter in &mut prototype.parameters {
            self.clone().fully_specified(&mut parameter.ty).await;
            self.clone().array(parameter.array.as_mut()).await;
        }
    }

    async fn initializer(self, mut initializer: Initializer) -> Initializer {
        match &mut initializer {
            Initializer::Expression(expression) => self.expression_in(expression).await,
            Initializer::List(items) => {
                for item in items {
                    self.initializer_in(item).await;
                }
            }
        }
        initializer
    }

    async fn declaration(self, declaration: &mut Declaration) {
        match &mut declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => {
                self.clone().prototype(prototype).await;
            }
            DeclarationKind::InitDeclaratorList(list) => {
                self.clone().fully_specified(&mut list.ty).await;
                for declarator in &mut list.declarators {
                    self.clone().array(declarator.array.as_mut()).await;
                    if let Some(initializer) = &mut declarator.initializer {
                        self.initializer_in(initializer).await;
                    }
                }
            }
            DeclarationKind::Precision { .. } => {}
            DeclarationKind::Block {
                structure,
                instance,
            } => {
                self.clone().qualifier(&mut structure.qualifier).await;
                for member in &mut structure.members {
                    self.clone().fully_specified(&mut member.ty).await;
                    for declarator in &mut member.declarators {
                        self.clone().array(declarator.array.as_mut()).await;
                    }
                }
                if let Some(instance) = instance {
                    self.clone().array(instance.array.as_mut()).await;
                }
            }
            DeclarationKind::Qualifier(qualifier)
            | DeclarationKind::QualifiedIdentifiers { qualifier, .. } => {
                self.clone().qualifier(qualifier).await;
            }
            DeclarationKind::SpirvInstruction { prototype, .. } => {
                self.clone().prototype(prototype).await;
            }
            DeclarationKind::SpirvExecutionMode(_) => {}
        }
    }

    async fn condition(self, condition: &mut Condition) {
        match condition {
            Condition::Expression(expression) => self.expression_in(expression).await,
            Condition::Declaration(declaration) => {
                self.clone().fully_specified(&mut declaration.ty).await;
                self.initializer_in(&mut declaration.initializer).await;
            }
        }
    }

    async fn statement(self, mut statement: Statement) -> Statement {
        match &mut statement.kind {
            StatementKind::Compound(compound) => {
                for statement in &mut compound.statements {
                    self.statement_in(statement).await;
                }
            }
            StatementKind::Declaration(declaration) => {
                self.clone().declaration(declaration).await;
            }
            StatementKind::Expression(expression) => {
                if let Some(expression) = expression {
                    self.expression_in(expression).await;
                }
            }
            StatementKind::Selection {
                condition,
                then_branch,
                else_branch,
            } => {
                self.expression_in(condition).await;
                self.statement_in(then_branch).await;
                if let Some(else_branch) = else_branch {
                    self.statement_in(else_branch).await;
                }
            }
            StatementKind::Switch {
                selector,
                statements,
            } => {
                self.expression_in(selector).await;
                for statement in statements {
                    self.statement_in(statement).await;
                }
            }
            StatementKind::CaseLabel(CaseLabel::Case(label)) => self.expression_in(label).await,
            StatementKind::CaseLabel(CaseLabel::Default) => {}
            StatementKind::While { condition, body } => {
                self.clone().condition(condition).await;
                self.statement_in(body).await;
            }
            StatementKind::DoWhile { body, condition } => {
                self.statement_in(body).await;
                self.expression_in(condition).await;
            }
            StatementKind::For(statement) => {
                self.statement_in(&mut statement.init).await;
                if let Some(condition) = &mut statement.condition {
                    self.clone().condition(condition).await;
                }
                if let Some(increment) = &mut statement.increment {
                    self.expression_in(increment).await;
                }
                self.statement_in(&mut statement.body).await;
            }
            StatementKind::Jump(JumpStatement::Return(Some(value))) => {
                self.expression_in(value).await;
            }
            StatementKind::Jump(_) => {}
            StatementKind::Attributed {
                attributes,
                statement,
            } => {
                for argument in attributes
                    .iter_mut()
                    .filter_map(|attribute| attribute.argument.as_mut())
                {
                    self.expression_in(argument).await;
                }
                self.statement_in(statement).await;
            }
        }
        statement
    }

    async fn expression(self, expression: Expression) -> Expression {
        let mut tasks = Vec::from([Rewrite::Visit(expression)]);
        let mut done: Vec<Expression> = Vec::new();
        while let Some(task) = tasks.pop() {
            match task {
                Rewrite::Visit(mut node) => {
                    if let ExpressionKind::FunctionCall(call) = &mut node.kind {
                        if let FunctionIdentifier::Constructor(specifier)
                        | FunctionIdentifier::Cast(specifier) = &mut call.function.node
                        {
                            self.specifier_in(specifier).await;
                        }
                    }
                    let children: Vec<Expression> = node
                        .kind
                        .children_mut()
                        .into_iter()
                        .map(take_expression)
                        .collect();
                    let count = children.len();
                    tasks.push(Rewrite::Build(node, count));
                    tasks.extend(children.into_iter().rev().map(Rewrite::Visit));
                }
                Rewrite::Build(mut node, count) => {
                    let start = done.len().saturating_sub(count);
                    for (slot, child) in node
                        .kind
                        .children_mut()
                        .into_iter()
                        .zip(done.drain(start..))
                    {
                        *slot = child;
                    }
                    self.with(|state| (state.visit)(&mut node));
                    done.push(node);
                }
            }
        }
        done.pop().unwrap_or_else(rglsl_ast::placeholder)
    }
}

enum Rewrite {
    Visit(Expression),
    Build(Expression, usize),
}
