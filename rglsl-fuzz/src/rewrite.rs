use rglsl_ast::ast::{
    ArrayDimension, ArraySpecifier, CaseLabel, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FullySpecifiedType, FunctionIdentifier, FunctionPrototype,
    Initializer, JumpStatement, Node, SingleTypeQualifier, Spanned, Statement, StatementKind,
    StructDeclaration, TranslationUnit, TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
};
use rglsl_ast::Span;

pub fn rewrite_expressions(unit: &mut TranslationUnit, visit: &mut dyn FnMut(&mut Expression)) {
    let mut rewriter = Rewriter { visit };
    for declaration in &mut unit.external_declarations {
        match declaration {
            ExternalDeclaration::FunctionDefinition(definition) => {
                rewriter.prototype(&mut definition.prototype);
                for statement in &mut definition.body.statements {
                    rewriter.statement(statement);
                }
            }
            ExternalDeclaration::Declaration(declaration) => rewriter.declaration(declaration),
            ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
        }
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

fn statement_post_order(statement: &mut Statement, visit: &mut dyn FnMut(&mut Statement)) {
    match &mut statement.kind {
        StatementKind::Compound(compound) => {
            for inner in &mut compound.statements {
                statement_post_order(inner, visit);
            }
        }
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            statement_post_order(then_branch, visit);
            if let Some(else_branch) = else_branch {
                statement_post_order(else_branch, visit);
            }
        }
        StatementKind::Switch { statements, .. } => {
            for inner in statements {
                statement_post_order(inner, visit);
            }
        }
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
            statement_post_order(body, visit);
        }
        StatementKind::For(for_statement) => {
            statement_post_order(&mut for_statement.init, visit);
            statement_post_order(&mut for_statement.body, visit);
        }
        StatementKind::Attributed { statement, .. } => statement_post_order(statement, visit),
        StatementKind::Declaration(_)
        | StatementKind::Expression(_)
        | StatementKind::CaseLabel(_)
        | StatementKind::Jump(_) => {}
    }
    visit(statement);
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

impl Rewriter<'_> {
    fn qualifier(&mut self, qualifier: &mut Spanned<TypeQualifier>) {
        for single in &mut qualifier.qualifiers {
            if let SingleTypeQualifier::Layout(layout) = &mut single.node {
                for id in &mut layout.ids {
                    if let Some(value) = &mut id.value {
                        self.expression(value);
                    }
                }
            }
        }
    }

    fn array(&mut self, specifier: Option<&mut Spanned<ArraySpecifier>>) {
        let Some(specifier) = specifier else {
            return;
        };
        for dimension in &mut specifier.dimensions {
            if let ArrayDimension::Sized(size) = &mut dimension.node {
                self.expression(size);
            }
        }
    }

    fn members(&mut self, members: &mut [Spanned<StructDeclaration>]) {
        for member in members {
            self.fully_specified(&mut member.ty);
            for declarator in &mut member.declarators {
                self.array(declarator.array.as_mut());
            }
        }
    }

    fn specifier(&mut self, specifier: &mut TypeSpecifier) {
        match &mut specifier.non_array {
            TypeSpecifierNonArray::Struct(structure) => self.members(&mut structure.declarations),
            TypeSpecifierNonArray::InlineBlock(declarations) => self.members(declarations),
            _ => {}
        }
        self.array(specifier.array.as_mut());
    }

    fn fully_specified(&mut self, ty: &mut Spanned<FullySpecifiedType>) {
        if let Some(qualifier) = &mut ty.qualifier {
            self.qualifier(qualifier);
        }
        self.specifier(&mut ty.specifier);
    }

    fn prototype(&mut self, prototype: &mut FunctionPrototype) {
        self.fully_specified(&mut prototype.return_type);
        for parameter in &mut prototype.parameters {
            self.fully_specified(&mut parameter.ty);
            self.array(parameter.array.as_mut());
        }
    }

    fn initializer(&mut self, initializer: &mut Initializer) {
        match initializer {
            Initializer::Expression(expression) => self.expression(expression),
            Initializer::List(items) => {
                for item in items {
                    self.initializer(item);
                }
            }
        }
    }

    fn declaration(&mut self, declaration: &mut Declaration) {
        match &mut declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => self.prototype(prototype),
            DeclarationKind::InitDeclaratorList(list) => {
                self.fully_specified(&mut list.ty);
                for declarator in &mut list.declarators {
                    self.array(declarator.array.as_mut());
                    if let Some(initializer) = &mut declarator.initializer {
                        self.initializer(initializer);
                    }
                }
            }
            DeclarationKind::Precision { .. } => {}
            DeclarationKind::Block {
                structure,
                instance,
            } => {
                self.qualifier(&mut structure.qualifier);
                self.members(&mut structure.members);
                if let Some(instance) = instance {
                    self.array(instance.array.as_mut());
                }
            }
            DeclarationKind::Qualifier(qualifier)
            | DeclarationKind::QualifiedIdentifiers { qualifier, .. } => self.qualifier(qualifier),
            DeclarationKind::SpirvInstruction { prototype, .. } => self.prototype(prototype),
            DeclarationKind::SpirvExecutionMode(_) => {}
        }
    }

    fn condition(&mut self, condition: &mut Condition) {
        match condition {
            Condition::Expression(expression) => self.expression(expression),
            Condition::Declaration(declaration) => {
                self.fully_specified(&mut declaration.ty);
                self.initializer(&mut declaration.initializer);
            }
        }
    }

    fn statement(&mut self, statement: &mut Statement) {
        match &mut statement.kind {
            StatementKind::Compound(compound) => {
                for statement in &mut compound.statements {
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
                self.statement(&mut statement.init);
                if let Some(condition) = &mut statement.condition {
                    self.condition(condition);
                }
                if let Some(increment) = &mut statement.increment {
                    self.expression(increment);
                }
                self.statement(&mut statement.body);
            }
            StatementKind::Jump(JumpStatement::Return(Some(value))) => self.expression(value),
            StatementKind::Jump(_) => {}
            StatementKind::Attributed {
                attributes,
                statement,
            } => {
                for argument in attributes
                    .iter_mut()
                    .filter_map(|attribute| attribute.argument.as_mut())
                {
                    self.expression(argument);
                }
                self.statement(statement);
            }
        }
    }

    fn expression(&mut self, expression: &mut Expression) {
        match &mut expression.kind {
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
                match &mut call.function.node {
                    FunctionIdentifier::Constructor(specifier) => self.specifier(specifier),
                    FunctionIdentifier::Function(_) => {}
                    FunctionIdentifier::Expression(callee) => self.expression(callee),
                    FunctionIdentifier::Method { object, .. } => self.expression(object),
                }
                for argument in &mut call.arguments {
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
        (self.visit)(expression);
    }
}
