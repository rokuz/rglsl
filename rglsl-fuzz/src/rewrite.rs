use rglsl_ast::Span;
use rglsl_ast::ast::{
    ArrayDimension, ArraySpecifier, CaseLabel, Condition, Declaration, DeclarationKind, Expression,
    ExpressionKind, ExternalDeclaration, FullySpecifiedType, FunctionIdentifier, FunctionPrototype,
    Initializer, JumpStatement, Node, SingleTypeQualifier, Spanned, Statement, StatementKind,
    StructSpecifier, TranslationUnit, TypeQualifier, TypeSpecifier, TypeSpecifierNonArray,
};
use rglsl_types::stack::recurse;

pub fn rewrite_expressions(unit: &mut TranslationUnit, visit: &mut dyn FnMut(&mut Expression)) {
    Rewriter { visit }.unit(unit);
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
            for statement in &definition.kind.body.node.statements {
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
    Rewriter { visit }.statement(statement);
}

pub fn rewrite_statements(unit: &mut TranslationUnit, visit: &mut dyn FnMut(&mut Statement)) {
    for declaration in &mut unit.external_declarations {
        if let ExternalDeclaration::FunctionDefinition(definition) = declaration {
            for statement in &mut definition.kind.body.node.statements {
                statement_post_order(statement, visit);
            }
        }
    }
}

fn statement_post_order(statement: &mut Statement, visit: &mut dyn FnMut(&mut Statement)) {
    recurse(|| {
        for child in child_statements_mut(&mut statement.kind) {
            statement_post_order(child, visit);
        }
        visit(statement);
    });
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
    fn unit(&mut self, unit: &mut TranslationUnit) {
        for declaration in &mut unit.external_declarations {
            match declaration {
                ExternalDeclaration::FunctionDefinition(definition) => {
                    self.prototype(&mut definition.kind.prototype.node);
                    for statement in &mut definition.kind.body.node.statements {
                        self.statement(statement);
                    }
                }
                ExternalDeclaration::Declaration(declaration) => self.declaration(declaration),
                ExternalDeclaration::Directive(_) | ExternalDeclaration::Semicolon(_) => {}
            }
        }
    }

    fn qualifier(&mut self, qualifier: &mut Spanned<TypeQualifier>) {
        for single in &mut qualifier.node.qualifiers {
            if let SingleTypeQualifier::Layout(layout) = &mut single.node {
                for id in &mut layout.ids {
                    if let Some(value) = &mut id.node.value {
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
        for dimension in &mut specifier.node.dimensions {
            if let ArrayDimension::Sized(size) = &mut dimension.node {
                self.expression(size);
            }
        }
    }

    fn fully_specified(&mut self, ty: &mut Spanned<FullySpecifiedType>) {
        if let Some(qualifier) = &mut ty.node.qualifier {
            self.qualifier(qualifier);
        }
        self.specifier(&mut ty.node.specifier.node);
    }

    fn specifier(&mut self, specifier: &mut TypeSpecifier) {
        recurse(|| {
            if let TypeSpecifierNonArray::Struct(StructSpecifier {
                declarations: members,
                ..
            })
            | TypeSpecifierNonArray::InlineBlock(members) = &mut specifier.non_array
            {
                for member in members {
                    self.fully_specified(&mut member.node.ty);
                    for declarator in &mut member.node.declarators {
                        self.array(declarator.node.array.as_mut());
                    }
                }
            }
            self.array(specifier.array.as_mut());
        });
    }

    fn prototype(&mut self, prototype: &mut FunctionPrototype) {
        self.fully_specified(&mut prototype.return_type);
        for parameter in &mut prototype.parameters {
            self.fully_specified(&mut parameter.kind.ty);
            self.array(parameter.kind.array.as_mut());
        }
    }

    fn initializer(&mut self, initializer: &mut Initializer) {
        recurse(|| match initializer {
            Initializer::Expression(expression) => self.expression(expression),
            Initializer::List(items) => {
                for item in items {
                    self.initializer(&mut item.node);
                }
            }
        });
    }

    fn declaration(&mut self, declaration: &mut Declaration) {
        match &mut declaration.kind {
            DeclarationKind::FunctionPrototype(prototype) => self.prototype(&mut prototype.node),
            DeclarationKind::InitDeclaratorList(list) => {
                self.fully_specified(&mut list.ty);
                for declarator in &mut list.declarators {
                    self.array(declarator.kind.array.as_mut());
                    if let Some(initializer) = &mut declarator.kind.initializer {
                        self.initializer(&mut initializer.node);
                    }
                }
            }
            DeclarationKind::Precision { .. } => {}
            DeclarationKind::Block {
                structure,
                instance,
            } => {
                self.qualifier(&mut structure.qualifier);
                for member in &mut structure.members {
                    self.fully_specified(&mut member.node.ty);
                    for declarator in &mut member.node.declarators {
                        self.array(declarator.node.array.as_mut());
                    }
                }
                if let Some(instance) = instance {
                    self.array(instance.node.array.as_mut());
                }
            }
            DeclarationKind::Qualifier(qualifier)
            | DeclarationKind::QualifiedIdentifiers { qualifier, .. } => self.qualifier(qualifier),
            DeclarationKind::SpirvInstruction { prototype, .. } => {
                self.prototype(&mut prototype.node);
            }
            DeclarationKind::SpirvExecutionMode(_) => {}
        }
    }

    fn condition(&mut self, condition: &mut Condition) {
        match condition {
            Condition::Expression(expression) => self.expression(expression),
            Condition::Declaration(declaration) => {
                self.fully_specified(&mut declaration.kind.ty);
                self.initializer(&mut declaration.kind.initializer.node);
            }
        }
    }

    fn statement(&mut self, statement: &mut Statement) {
        recurse(|| match &mut statement.kind {
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
        });
    }

    fn expression(&mut self, expression: &mut Expression) {
        recurse(|| {
            if let ExpressionKind::FunctionCall(call) = &mut expression.kind
                && let FunctionIdentifier::Constructor(specifier)
                | FunctionIdentifier::Cast(specifier) = &mut call.function.node
            {
                self.specifier(specifier);
            }
            expression
                .kind
                .for_each_child_mut(|child| self.expression(child));
            (self.visit)(expression);
        });
    }
}

pub fn child_statements(kind: &StatementKind) -> Vec<&Statement> {
    match kind {
        StatementKind::Compound(compound) => compound.statements.iter().collect(),
        StatementKind::Switch { statements, .. } => statements.iter().collect(),
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            let mut children = vec![&**then_branch];
            children.extend(else_branch.as_deref());
            children
        }
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => vec![&**body],
        StatementKind::For(statement) => vec![&statement.init, &statement.body],
        StatementKind::Attributed { statement, .. } => vec![&**statement],
        StatementKind::Declaration(_)
        | StatementKind::Expression(_)
        | StatementKind::CaseLabel(_)
        | StatementKind::Jump(_) => Vec::new(),
    }
}

pub fn child_statements_mut(kind: &mut StatementKind) -> Vec<&mut Statement> {
    match kind {
        StatementKind::Compound(compound) => compound.statements.iter_mut().collect(),
        StatementKind::Switch { statements, .. } => statements.iter_mut().collect(),
        StatementKind::Selection {
            then_branch,
            else_branch,
            ..
        } => {
            let mut children = vec![&mut **then_branch];
            children.extend(else_branch.as_deref_mut());
            children
        }
        StatementKind::While { body, .. } | StatementKind::DoWhile { body, .. } => {
            vec![&mut **body]
        }
        StatementKind::For(statement) => {
            let rglsl_ast::ast::ForStatement { init, body, .. } = &mut **statement;
            vec![init, body]
        }
        StatementKind::Attributed { statement, .. } => vec![&mut **statement],
        StatementKind::Declaration(_)
        | StatementKind::Expression(_)
        | StatementKind::CaseLabel(_)
        | StatementKind::Jump(_) => Vec::new(),
    }
}
